---
slug: precalculate-vignettes
title: 'How to pre-calculate package vignettes or pkgdown articles'
date: '2019-12-08'
authors:
  - Jeroen Ooms
categories: technotes
tags:
  - R
  - docs
  - packages
---

By default, R runs all code from vignettes when running `R CMD check` or when generating pkgdown sites. This provides some extra testing of your code and ensures that documents are reproducible. However, sometimes this is not what you want because the vignette can only be rendered on your local machine. For example:

  - The vignette examples requires some special local software or data
  - The vignette accesses a web service that requires authentication
  - You don't want to hammer web services for every vignette run
  - The vignette code takes very long to run

In these cases you should execute the code from vignettes locally, and ship a vignette which already contains the rendered R output. 

## Locally knit markdown

Suppose you have a vignette called `longexample.Rmd`. To pre-calculate the vignette, rename the input file to something that is not recognized by R as a vignette such as: `longexample.Rmd.orig`. Then run knitr in the package directory to execute and replace R code in the vignette:

```r
# Execute the code from the vignette
knitr::knit("vignettes/longexample.Rmd", "vignettes/longexample.Rmd")
```

The new output file `longexample.Rmd` now contains markdown with the already executed R output. So it can be treated as a regular vignette, but R can convert it to html instantaneously without having to re-run R code from the vignette.

The [jsonlite package](https://github.com/jeroen/jsonlite/tree/v1.6/vignettes) shows a real world example. In this case I pre-calculated vignettes that access web APIs to prevent services from getting hammered, and eventually banning the check servers.

## Saving vignette figures

One gotcha with this trick is that if the vignette output includes figures, you need to store the output image files in the vignettes folder. It is also a good idea to explicitly name your knitr chunks, so that the stored images have sensible names.

Our recently onboarded package [eia](https://github.com/ropensci/eia/tree/master/vignettes) by Matt Leonawicz is a good example. This package provides an R client for US Energy Information Administration Open Data API. The [eia documentation](https://docs.ropensci.org/eia/articles/) gets automatically generated for each commit on the [rOpenSci docs server](https://ropensci.org/technotes/2019/06/07/ropensci-docs/), even though the code in the vignettes actually requires an API key (which the server does not have).

[![screenshot](https://imgur.com/W5NDdOA.png)](https://docs.ropensci.org/eia)

The [eia vignettes directory](https://github.com/ropensci/eia/blob/master/vignettes/) contains the `Rmd.orig` input files and the `.Rmd` files as pre-calculated by the package author. Also note the vignettes directory contains a handy script [precompile.R](https://github.com/ropensci/eia/blob/master/vignettes/precompile.R) that makes it easy for the package author to refresh the output vignettes locally.
