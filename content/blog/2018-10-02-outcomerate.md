---
slug: "outcomerate"
title: Honest Assessments of Survey Quality with AAPOR Outcome Rates
package_version: 1.0.1
authors:
  - name: Rafael Pilliard Hellwig
    url: https://github.com/rtaph
date: 2018-10-02
categories: blog
topicid: 
tags:
- r
- community
- software
- review
- onboarding
- package
- outcomerate
- reproducible-research
- survey
output: html_document
---

## Background

Surveys are ubiquitous in the social sciences, and the best of them are meticulously planned out. Statisticians often decide on a sample size based on a theoretical design, and then proceed to inflate this number to account for "sample losses". This ensures that the desired sample size is achieved, even in the presence of non-response. Factors that reduce the pool of interviews include participant refusals, inability to contact respondents, deaths, and frame inaccuracies. The more non-response, the more a study becomes open to criticism about its veracity.

![](/img/blog-images/2018-10-02-outcomerate/samples.jpg)

To simplify communication about non-response, a set of "outcome rates" have emerged over time. These rates are essentially quality declarations about the operational elements a survey. Broadly speaking, they relate how well an intended sample _s_ matches the actual respondent set _r_. 

Some of popular outcome rates include:

*	__Response Rate:__ The proportion of your sample that results in an interview.
*	__Cooperation Rate:__ The proportion of people contacted who participate in your survey.
*	__Refusal Rate:__ The proportion of your sample that refused to participate.
*	__Contact Rate:__ The proportion of sampled cases where you manage to reach the respondent.
*	__Location Rate:__ The proportion of cases (say, in an establishment survey) that you manage to locate.

For a long time, it was common to find very different definitions of these rates. This made it hard to compare one survey to another. 

## What Problem Does the Package Solve?

The package calculates standard outcome rates in R in order to encourage transparent research, open methods, and scientific comparability. It does so using the [_American Association of Public Opinion Research_](https://www.aapor.org)'s (AAPOR) [definitions](https://www.aapor.org/Standards-Ethics/Standard-Definitions-(1).aspx) of the rates, which are the industry standard.

Though no such R package existed previously, AAPOR does make available a [excel-based calculator](https://www.aapor.org/Education-Resources/For-Researchers/Poll-Survey-FAQ/Response-Rates-An-Overview.aspx). It is a wonderful free tool, but has some limitations. For one, the excel calculator is not designed to compute many rates by sub-domain; In my own work, I often try need rates in real time by day, by researcher/enumerator, and by geography. Doing each analysis in a separately excel workbook is impractical. Instead, [`outcomerate`](https://github.com/ropensci/outcomerate) makes it easy to achieve this with `dplyr`, `aggregate()`, or `data.table`. Second, Excel is  notorious for failing silently. It will give you a result even if the input contains errors or inconsistencies. This is dangerous because mistakes can creep into your work without your knowledge.

The philosophy of the package is simple: let users flexibly calculate as many rates as possible with minimal effort, and fail fast. Unless specifically requested, the function only returns the rates that are defined based on the input, and provides soft warnings when it suspects users may be making errors. My hope is that this will encourage the frequent use of standard definitions, and facilitate their correct application.

The package also implements weighted calculations of rates. Weighted figures further advance reproducible research because they (usually) estimate the outcome rate at the population level rather than for the sample at hand. This is useful information to share with the world, as it helps others plan for sample losses in future studies. Unless you plan to replicate the sampling design exactly, it is often more useful to know the (weighted) population rate.

## Future Development

In future releases of [`outcomerate`](https://github.com/ropensci/outcomerate), I may implement other sections from the AAPOR manual. Though arguably less popular than the “main” outcome rates, AAPOR has separate chapters for telephone surveys, online panels, and mixed-mode survey work. I chose not implement these initially, because some of the definitions differ despite using similar codes. It may also be worthwhile to add functions that make professional, publication-ready tables of the outcome rates. I am also considering functions that provide the standard error of the rates.

Future development may also see more vignettes. Some topics I wish to write more about include real-time monitoring of survey quality (using Empirical Bayes methods), and variance calculations of outcome rates in complex designs.

## Acknowledgements

My thanks goes to [Neil Richardson](https://github.com/nealrichardson), [Carl Ganz](https://github.com/carlganz), and [Karthik Ram](https://github.com/karthik) for their peer review and editorial support at [ROpenSci](https://ropensci.org/). [`outcomerate`](https://github.com/ropensci/outcomerate) is better for it my programming style and knowledge has improved. Naturally, I also wish to acknowledge AAPOR for advancing the practice of survey research— this package is built on the definitions they helped standardize.  
