---
slug: qualtrics-relaunch
title: Relaunching the qualtRics package
package_version: 3.1.0
date: '2019-04-30'
authors:
  - Julia Silge
topicid: 1682
tags:
  - Software Peer Review
  - software
  - packages
  - R
  - qualtRics
  - data access
  - API
  - survey data
---

rOpenSci is one of the first organizations in the R community I ever interacted with, when I participated in the [2016 rOpenSci unconf](https://juliasilge.com/blog/i-went-to-ropensci/). I have since [reviewed several rOpenSci packages](/software-review/) and been so happy to be connected to this community, but I have never submitted or maintained a package myself. All that changed when I heard the call for a new maintainer for the [qualtRics](https://github.com/ropensci/qualtRics) package. "IT'S GO TIME," I thought. 😎

[Qualtrics](https://www.qualtrics.com/) is an online survey and data collection software platform. Qualtrics is used across many domains in both academia and industry for online surveys and research, including by me at my day job as a data scientist at [Stack Overflow](https://stackoverflow.com/). While users can manually download survey responses from Qualtrics through a browser, importing this data into R is then cumbersome. The qualtRics R package implements the retrieval of survey data using the Qualtrics API and aims to reduce the pre-processing steps needed in analyzing such surveys. This package has been a huge help to me in my real day-to-day work, and I have been so grateful for the excellent work of the package's original authors, including the previous maintainer [Jasper Ginn](https://jasperginn.io/). This package is currently the only package on CRAN that offers functionality like this for Qualtrics' API, and is included in the official Qualtrics API documentation. 

The previous maintainer of this package was no longer using Qualtrics in his work life and needed to step away from maintaining qualtRics. Also, early in 2018, the package had been archived on CRAN for a fairly minor issue: using [testthat](https://testthat.r-lib.org/) for tests but [not having it included in `Suggests`](http://r-pkgs.had.co.nz/tests.html). So for me, that meant this project would involve several steps: making improvements I wanted to the package for usability (especially with regards to authentication credentials), bringing the package in line with CRAN policies, and getting the package back on CRAN but as a new maintainer of an archived package.

### Qualtrics and the Stack Overflow Developer Survey

The timing of when I did the usability work for this package was either wonderful or terrible, depending on your perspective. I did that work concurrently with the analysis for the [2019 Stack Overflow Developer Survey](https://insights.stackoverflow.com/survey/2019). This survey is the largest and most comprehensive survey of people who code around the world each year, and this year we had almost 90,000 respondents who answered questions covering everything from their favorite technologies to what music they listen to while coding. 

The survey is fielded using Qualtrics and I've used the qualtRics package for the past several years as part of my workflow. This year, I made changes to the package while I was working with the Developer Survey data. I'll be honest; it was... A LOT to juggle at one time. 😳 However, it did allow me to test out improvements and changes iteratively with the real world data I had at hand, and I think I ended up with a better result than I would have otherwise. We use Qualtrics for other surveys at Stack Overflow throughout the year, so I am not just a package maintainer but also a year-round, real-life user of this package.

After the bulk of my analysis work was done for the survey, I turned to [getting qualtRics back on CRAN](https://cran.r-project.org/web/packages/policies.html). The previous maintainer, who has been unfailingly helpful throughout this process, sent an email to CRAN with the details involved (his name, my name, the fact of the package's archiving). Then I submitted the package to CRAN, basically as if it were a new package. I got some feedback back from CRAN initially, to use more single quotes in `Description` around the word "Qualtrics" and also some remarks about how my examples were surrounded by `\dontrun{}` as well as a reminder not to have my package write to the user's home filespace. I was somewhat puzzled by the last items, because nothing in this package does write to the user's home filespace and the examples all are calling the API and thus need authentication (which is clearly explained in the documentation/examples). I was somewhat worried 😩 but I ended up responding via email and submitting again with the same text in CRAN comments, explaining those points. Fortunately, the package was accepted to CRAN that time!

### GOOD IDEA/BAD IDEA

Changing the names of all the functions in a package already being used in the real world is, generally, a bad idea. **I did it anyway, everybody.** Let me try to convince you that this was the right call. 

- When I took over as package maintainer, the qualtRics package had been off CRAN for about nine months. If ever there is an appropriate time for a revamp in user-facing function names, it's a time like this, when there is a long absence from a centralized repository.
- The most important user-facing functions in this package previously had names like `getSurvey()` and `getSurveys()`, which users (including me) found difficult to distinguish between. These functions called the Qualtrics API, but **not** the part of the API that Qualtrics has named `getSurvey`. It was a confusing situation.
- When this package was [first reviewed by rOpenSci](https://github.com/ropensci/software-review/issues/192), the original maintainer noted that the function names did not conform to rOpenSci standards but he preferred to keep them as is since the package was already on CRAN. Opening up the possibility of this kind of more drastic change now allowed me to bring the function and argument names within [rOpenSci standards](https://devguide.ropensci.org/building.html#function-and-argument-naming).

The old versions of the functions currently still work but give a warning, suggesting that the user try out the new versions. If this change causes more than a passing inconvenience to you as a user, I AM SO SORRY. I believe this decision will set up the qualtRics package for improved usability in the long term.

### Explore the new qualtRics!

Another change with this release is a [pkgdown site for qualtRics](https://ropensci.github.io/qualtRics/). I used the custom pkgdown template [rotemplate](https://docs.ropensci.org/rotemplate/) created for rOpenSci packages to style the site, and I am so pleased with the results! If you are a new user for the qualtRics package, or someone who wants to poke around and see what's changed and how to get up to speed with the update, I recommend checking out this [spiffy new site](https://ropensci.github.io/qualtRics/) for all the details. 🚀
