---
slug: "rplos-highlights"
title: Highlighting text in text mining
date: 2013-12-02
authors:
  - name: Scott Chamberlain
categories:
  - blog
tags:
- R
- textmining
- API
- PLOS
---

`rplos` is an R package to facilitate easy search and full-text retrieval from all Public Library of Science (PLOS) articles, and we have a little feature which aren't sure if is useful or not. I don't actually do any text-mining for my research, so perhaps text-mining folks can give some feedback.

You can quickly get a lot of results back using `rplos`, so perhaps it is useful to quickly browse what you got. What better tool than a browser to browse? Enter `highplos` and `highbrow`. `highplos` uses the [Solr](http://lucene.apache.org/solr/) capabilities of the PLOS search API, and lets you get back a string with the term you searched for highlighted (by default with `<em>` tag for italics).

## Installation

```r
install.packages("devtools")
library(devtools)
install_github("rplos", "ropensci")
```

```r
library(rplos)
```

## Search PLOS articles

```r
out <- highplos(q = "alcohol", hl.fl = "abstract", hl.snippets = 5, rows = 10)
out[[1]]
```

```
## $abstract
## [1] "Background: <em>Alcohol</em> consumption causes an estimated 4% of the global disease burden, prompting"
## [2] " goverments to impose regulations to mitigate the adverse effects of <em>alcohol</em>. To assist public health leaders"
## [3] " and policymakers, the authors developed a composite indicator—the <em>Alcohol</em> Policy Index—to gauge the strength"
## [4] " of a country's <em>alcohol</em> control policies. Methods and Findings: The Index generates a score based on policies"
## [5] " from five regulatory domains—physical availability of <em>alcohol</em>, drinking context, <em>alcohol</em> prices"
```

## Preview results in your browser

The new function `highbrow` (*snickers quietly*) automagically creates an easy to digest html page, and opens in your default browser.

```r
highbrow(out)
```

Here's a screenshot similar to what you should see after the last command

<img src="/assets/blog-images/rplos_highlights.png"></img>

`highbrow` uses the `whisker` package to fill in a template for a bootstrap html page to make a somewhat pleasing interface to look at your data. In addition, the DOIs are wrapped in a `<a>` tag with a [http://dx.doi.org/](http://doi.org/) prefix so that you can go directly to the paper if you are so inclined. Also note that the `<em>` tags (italicized) are replaced with `<strong>` tags (bold) to make the search term pop out from the screen more.

***

Let us know what you think.


