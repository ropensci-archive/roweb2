---
slug: precompute-vignettes
title: 'How to precompute package vignettes or pkgdown articles'
date: '2019-12-08'
author:
  - Jeroen Ooms
categories: technotes
topicid: 1893
tags:
  - R
  - docs
  - packages
---

As of earlier this year, we are now [automatically building](/technotes/2019/06/07/ropensci-docs/) binaries and pkgdown documentation for [all rOpenSci packages](https://docs.ropensci.org). One issue we encountered is that some packages include vignettes that require some special tools/data/credentials, which are unavailable on generic build servers.

This post explains how to include such vignettes and articles in your package.

### On package vignettes

By default, R automatically recreates vignettes during `R CMD check` or when generating pkgdown sites by running all R code. This is useful because it provides some extra testing of your code and ensures that documentation is reproducible. However, sometimes it is not a good idea to run the code on every build server, every time. For example:

  - The vignette examples require some special local software or private data.
  - The code connects to a web service that requires authentication or has limits.
  - You don't want to hammer web services for every CMD check.
  - The vignette code takes very long to execute.

In such cases it is better to execute the rmarkdown code locally, and ship a vignette in the package which already contains the rendered R output. 

### The solution: locally knitting rmarkdown

Suppose you have a vignette called `longexample.Rmd`. To pre-compute the vignette, rename the input file to something that is not recognized by R as rmarkdown such as: `longexample.Rmd.orig`. Then run knitr in the package directory to execute and replace R code in the rmarkdown:

```r
# Execute the code from the vignette
knitr::knit("vignettes/longexample.Rmd.orig", output = "vignettes/longexample.Rmd")
```

The new output file `longexample.Rmd` now contains markdown with the already executed R output. So it can be treated as a regular vignette, but R can convert it to html instantaneously without having to re-run R code from the rmarkdown.

The [jsonlite package](https://github.com/jeroen/jsonlite/tree/v1.6/vignettes) shows a real world example. In this case I pre-computed vignettes that access web APIs to prevent services from getting hammered (and potentially banning the check servers).

### Saving vignette figures

One gotcha with this trick is that if the vignette output includes figures, you need to store the images in the vignettes folder. It is also a good idea to explicitly name your rmarkdown knitr chunks, so that the images have sensible filenames.

Our recently onboarded package [eia](https://github.com/ropensci/eia/tree/master/vignettes) by Matt Leonawicz is a good example. This package provides an R client for US Energy Information Administration Open Data API. The [eia documentation](https://docs.ropensci.org/eia/articles/) gets automatically generated for each commit on the [rOpenSci docs server](https://ropensci.org/technotes/2019/06/07/ropensci-docs/), even though the code in the vignettes actually requires an API key (which the docs server does not have).

[![screenshot](https://imgur.com/W5NDdOA.png)](https://docs.ropensci.org/eia)

The [eia vignettes directory](https://github.com/ropensci/eia/blob/master/vignettes/) contains the `Rmd.orig` input files and the `.Rmd` files as pre-computed by the package author. Also note the vignettes directory contains a handy script [precompile.R](https://github.com/ropensci/eia/blob/master/vignettes/precompile.R) that makes it easy for the package author to refresh the output vignettes locally.

### Don't forget to update

The drawback of this approach is that documents no longer automatically update when the package changes. Therefore you should only pre-compute the vignettes and articles that are problematic, and make a note for yourself to re-knit the vignette occasionally, e.g. before a package release. Adding a [script](https://github.com/ropensci/eia/blob/master/vignettes/precompile.R) to your vignette folders that does so can be a helpful reminder.

