---
slug: rdefra-release-033
title: Get air quality data for the United Kingdom using the rdefra package
date: '2016-10-06'
author:
  - Claudia Vitolo
tags:
  - R
  - rdefra
  - data access
  - earth science
  - Software Peer Review
---

Whether you are an environmental scientist, a pollution expert or just concerned about the air you breathe when cycling in the United Kingdom, the ropensci [rdefra](https://cran.r-project.org/package=rdefra) package can help find the information you need. This package gives you access to the UK-AIR database, hosted by the Department for Environment, Food & Rural Affairs in the United Kingdom, directly from R. The database comprises hundreds of air quality monitoring sites and each provides time series of concentration for different pollutants such as ozone, carbon dioxide and nitrogen oxides amongst others. It allows you to efficiently download, plot and compare data for multiple years/stations so that you can easily carry out spatio-temporal analysis or simply plan an healthier route for you bike ride. The package is fully documented and the [vignette](https://github.com/ropenscilabs/rdefra) contains examples for a number of applications, such as how to generate the interactive map of the monitoring stations (see screenshot below).

[![UK-AIR monitoring stations](/assets/blog-images/rdefra-stations.png)](https://github.com/ropenscilabs/rdefra)

## Installation

The stable version of the package is available from CRAN:

```r
install.packages("rdefra")
```

While the development version can be installed from github using [devtools](https://github.com/hadley/devtools):

```r
devtools::install_github("ropensci/rdefra")
```

This package depends on the Geospatial Data Abstraction Library (GDAL) library, which should be previously installed on your machine.
