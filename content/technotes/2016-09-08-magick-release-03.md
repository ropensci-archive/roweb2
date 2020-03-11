---
slug: magick-release-03
title: New in Magick 0.3
date: '2016-09-08'
author:
  - Jeroen Ooms
tags:
  - R
  - magick
---

A new version of the ropensci [magick](https://cran.r-project.org/package=magick) package has been released to CRAN. Magick is a package for Advanced Image-Processing in R. It wraps the ImageMagick STL which is perhaps the most comprehensive open-source image processing library available today. Our [original announcement](/blog/2016/08/23/z-magick-release) has more details.

## New features

This new version now includes a beautiful [vignette](https://cloud.r-project.org/web/packages/magick/vignettes/intro.html) which gives an overview of the main functionality to get you started! It lists the various formats, transformations, effects, operations and much more.

[![RStudio Screenshot](/assets/blog-images/magick-vignette.png)](https://cloud.r-project.org/web/packages/magick/vignettes/intro.html)

The vignette also explains how to use magick with [raster graphics](https://cloud.r-project.org/web/packages/magick/vignettes/intro.html#raster_graphics). This new functionality makes it possible to overlay images on R's graphics device.

## Installing and Updating

The package is most easily installed from CRAN:

```r
install.packages("magick")
```

When installing from source make sure the Magick++ library is available on your system.
