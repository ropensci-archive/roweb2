---
date: 2017-06-27
slug: packagemetrics
title: packagemetrics - Helping you choose a package since runconf17
authors:
  - name: Becca Krouse
    url: http://twitter.com/bzkrouse
  - name: Erin Grand
    url: http://twitter.com/astroeringrand
  - name: Hannah Frick
    url: http://twitter.com/hfcfrick
  - name: Lori Shepherd
    url: http://twitter.com/lshep712
  - name: Sam Firke
    url: http://twitter.com/samfirke
  - name: William Ampeh
categories:
  - blog
topicid: 759
topics:
  - community
  - software
  - unconf
  - meetings
  - R
---


Before everybody made their way to the unconf via [LAX](https://twitter.com/sckottie/status/867211430914736128) and [Lyft](https://twitter.com/sctyner/status/867505241234604033), attendees [discussed](https://github.com/ropensci/unconf17/issues) potential project ideas online. The **packagemetrics** package was our answer to two related issues.

The first [proposal](https://github.com/ropensci/unconf17/issues/69) centered on creating and formatting tables in a reproducible workflow. After many different package suggestions started pouring in, we were left with a classic R user conundrum: "Which package do I choose?"

With over 10,000 packages on CRAN - and thousands more on GitHub and Bioconductor - a useR needs a way to navigate this wealth of options. There are many existing tools to categorize and facilitate searching of R packages such as [CRAN TaskViews](https://cran.r-project.org/web/views/), [RSeek](http://rseek.org/), [Rdocumentation](https://www.rdocumentation.org/), [Crantastic!](http://crantastic.org/), [METACRAN](http://www.r-pkg.org/) and [CRANberries](http://dirk.eddelbuettel.com/cranberries/). GitHub also provides lots of great metrics for individual packages developed there.

However, these resources mostly aggregate information at the individual-package level, or compare static sets of packages that may not reflect recent breakthroughs.  To find a suitable option, users must sift through and compare individual packages, which can be a tedious and time-intensive process - particularly for someone new to R.

The plethora of packages to create reproducible tables was an example of a second, broader issue: ["Avoiding redundant / overlapping packages"](https://github.com/ropensci/unconf17/issues/78).  That conversation turned to the process of reviewing packages. Combining the two issues, we set out to to create a guide that could help users navigate package selection, using the case of reproducible tables as a case study.


## Brainstorming

Making use of the unique opportunity of the unconf, we asked other participants -- all experienced R users/developers -- how they discover and choose the packages they use. Some questions we pondered included:

- How do you find packages relevant for a task at hand?
- What do you look for in R packages?
- How do you determine a package's quality?
- How could we deal with a set of related and potentially-overlapping packages covering the same topic?
- How could we identify gaps in existing packages?
- How can we leverage the R community to capture user experience?
- What is the etiquette for creating a new package that potentially overlaps with another existing one?

In addition to the package catalog resources listed above, unconf participants also rely on personal networks or social media such as Twitter to learn about new packages. A typical workflow for choosing a package looks like:

1. Gathering a list of packages which seem to offer suitable functionality,
2. narrowing down that list to a handful of packages, and then
3. trying those out to select the best one.

While there was wide variation in how users gathered their initial lists of packages, they relied on common indicators to narrow their lists, including, "Is the package actively maintained?" and "Is it being tested? If so, how?". The last step often brought out personal preferences ("I pick the one whose API I like best").

Through these discussions, it became evident that while there are resources for _finding_ packages, tools for _comparing_ packages would be helpful additions. Two possible approaches to comparing packages are:

- **Standardized data collection:** Collecting metrics on criteria that unconf participants use to appraise packages. This can be applied uniformly across packages and hence is closer to an objective comparison. Additionally, metric collection can be wrapped in a package itself which makes it easier to collect these metrics at scale.
- **Expert user review:** In-depth exploration and review of similar packages - think ["The Wirecutter"](http://thewirecutter.com/) but for R tasks. Reviews and recommendations are more subjective and require time and expertise - but user experience and feedback are important measures of the quality and potential of an R package. There is much insight that can be gained by installing a package and exploring it yourself.

As the workflow indicates, these two approaches are best used together, rather than relying on a single one.


## Goals for unconf

At the unconf, we focused solely on the task of package assessment, leaving aside ideas for community involvement, discussion on how to identify gaps in existing packages and, related, when to create your own package.  It was already a big problem to tackle in just two days!

Acknowledging the importance of both types of assessment -- metric comparison and human exploration -- we set out to create a package which could a) be used to collect data about R packages and b) contain an example for a more in-depth exploration of a set of packages (for creating reproducible tables) in form of a vignette.

### Metrics

By making use of information from CRAN, GitHub, and StackOverflow, we collected metrics to answer some of the following questions:

- Does the package have a public repository?
- Does it have an issue tracker?
- What are the package’s dependencies? Is it build on a solid stack?
- Does it have reverse dependencies?  *i.e., do others trust it enough to build on it?*
- Is the package  actively maintained?
    - How many people contribute to the package?
    - Are there regular updates?
    - Are there regular releases?
    - What is happening in the issue tracker, e.g., when was the most recent issue closed?
- Does the package have unit tests?  What kind?
- Does it use continuous integration (CI)?
- Does it have a vignette?
- Does the documentation include examples?
- Is the package discussed on StackOverflow?
    - How often is it mentioned in questions?
    - In answers?
    - What packages are commonly co-mentioned with it?

### User package review

Our discussions informed a list of things people commonly look for when they install a package and explore it manually:

- Is it easy to use?
- Is it modular?
- Is it “tidy”?
- Does it have clean syntax?
- Does it have a coherent theory?
- Is it not trying to do too much - but doing its small thing well?
- Does it have clear, concise documentation?

 With that, we got to work!

 ![](https://pbs.twimg.com/media/DA7g9BZVwAAsPL2.jpg)

## Introducing: packagemetrics

With Erin collecting information from CRAN, Becca and Sam from GitHub, Lori and Hannah from StackOverflow and William diving into table-making packages, we managed to produce an R package. Working title: [**packagemetrics**](https://github.com/ropenscilabs/packagemetrics).

Our package can be installed from GitHub:

```
devtools::install_github("ropenscilabs/packagemetrics")
```

Since our case study is table-making packages, we provide a collection of those package names in a vector named `table_packages`. With that we can collect metrics for each package using `package_list_metrics()`:

```
library(packagemetrics)
pkg_df <- package_list_metrics(table_packages)
str(pkg_df)
```

This yields a data.frame with all the metrics:

```
'data.frame':	27 obs. of  18 variables:
 $ package           : chr  "arsenal" "ascii" "compareGroups" "condformat" ...
 $ published         : chr  "2017-03-10" "2011-09-29" "2017-03-14" "2017-05-18" ...
 $ title             : chr  "An Arsenal of 'R' Functions for Large-Scale Statistical\nSummaries" "Export R objects to several markup languages" "Descriptive Analysis by Groups" "Conditional Formatting in Data Frames" ...
 $ depends_count     : int  2 3 5 NA 1 NA 3 1 1 1 ...
 $ suggests_count    : int  10 6 7 4 3 4 1 3 4 5 ...
 $ tidyverse_happy   : logi  TRUE NA FALSE TRUE TRUE TRUE ...
 $ has_vignette_build: logi  FALSE TRUE FALSE FALSE FALSE FALSE ...
 $ has_tests         : logi  TRUE FALSE FALSE TRUE FALSE FALSE ...
 $ reverse_count     : num  0 1 0 0 0 31 0 0 2 7 ...
 $ dl_last_month     : num  236 1806 929 1252 494 ...
 $ ci                : chr  "Not on GitHub" "NONE" "Not on GitHub" "Travis" ...
 $ test_coverage     : chr  "Not on GitHub" "NONE" "Not on GitHub" "CodeCov" ...
 $ forks             : num  NA 4 NA 2 2 74 1 6 41 NA ...
 $ stars             : num  NA 19 NA 4 26 206 7 30 299 NA ...
 $ watchers          : num  NA 3 NA 4 4 45 2 2 37 NA ...
 $ last_commit       : num  NA NA NA 0.567 0.767 ...
 $ last_issue_closed : num  NA 64.8 NA 0.567 0.767 ...
 $ contributors      : num  NA 0 NA 1 2 6 3 0 6 NA ...
```

This data about table-related packages can be turned tranformed with the **formattable** package (*so meta!*) into a beautiful table of package metrics:

![](https://i.imgur.com/reQfEOo.png)


As to the case study in expert user review: the start of a review of a selection of table-making packages can be found [here](http://htmlpreview.github.io/?https://github.com/ropenscilabs/packagemetrics/blob/master/inst/doc/tableGallery.html).


## A small step on a long journey

At this stage of a project, there's always a list of fixes and enhancements to make.  This project is no different, especially given that this is such a broad topic!

The metrics currently reflect a first stab at priorities for us and other unconf participants - there is room for improvement. For instance, we'd like to gather more metrics to shape a comprehensive snapshot of various categories (e.g., level of engagement, newness, influence, ...). Another idea discussed prior to the unconf was that of attempting to capture (*an indication of*) the functionality offered by a package via keyword search through the package's DESCRIPTION, vignettes and help pages.

We welcome suggestions and inputs via the [issue tracker](https://github.com/ropenscilabs/packagemetrics/issues)! This goes both for the calculated metrics and the package review process illustrated in the vignette.

Based on ideas generated at the unconf, the packagemetrics approach may have the potential to be useful in various places:

- Noam Ross [suggested](https://github.com/ropenscilabs/packagemetrics/issues/18) using packagemetrics as part of the required review of related packages during [rOpenSci's onboarding process](https://github.com/ropensci/onboarding) for new packages.
- CRAN's TaskViews are currently very broad.  E.g., there are dozens of packages for working on tables in R, but table creation constitutes only a small aspect of the [Reproducible Research Task View](https://cran.r-project.org/web/views/ReproducibleResearch.html) on CRAN. Guidance on how to do package reviews might be useful in this context.

As to the broader problem of deciding what package to use: it remains both unsolved and worthy of future attention.  Those interested in this challenge should follow along at useR! 2017 in Brussels later this summer, where the session ["Navigating the R Package Universe"](https://user2017.brussels/news/2017/navigating-the-r-package-universe) looks particularly relevant.

We look forward to community discussion on this, be it at useR! or elsewhere.  Thank you to rOpenSci and everyone involved for making #runconf17 such a wonderful event!
