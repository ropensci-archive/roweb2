---
slug: "hydroscoper"
title: ὕδωρ + σκοπῶ
package_version: 1.0.0
authors:
  - name: Konstantinos Vantas
    url: https://kvantas.github.io/
date: 2018-03-23
categories: blog
topicid: 666666666
tags:
  - r
  - community
  - software
  - review
  - package
  - data-access
  - hydrology
  - Greece
  - hydroscope
output:
  md_document:
    variant: markdown_github
    preserve_yaml: true
---

> Hydrology is a concept to unify statistics, data analysis and numerical models in order to understand and analyze the endless circulation of water between the earth and its atmosphere.

That's a lot alike Data Science, isn't it? Hydrologic Processes evolve in space and time, are extreme complex and we may never comprehend them. For this reason Hydrologists use models where their inputs and outputs are measurable variables: climatic and hydrologic data, land uses, vegetation coverage, soil type etc.  

Not so many years ago, I used to struggle for these data: travelling 500 km away searching in underground storages, requesting from peers and institutes or even use sophistries to get them. Nowadays, hydrologic data come from a variety of sources such as satellites, online weather stations, national climatic databases, etc. But problems never end: these data have a variety of types and formats, errors, noise and a big amount of missing values. 

In Greece, the Hydroscope (ὕδωρ + σκοπῶ) project started in the 1990s, aimed to organize data belonging to various institutions and to create a database of hydrometeorological information. Today this database, [Hydroscope](http://www.hydroscope.gr/), is available online. Unfortunately, all the data in Hydroscope are in Greek and there are no convenient look-up tables. 

## The hydroscoper package

`hydroscoper` is an R package designed to provide functionality for automatic retrieval and translation of Hydroscope's data to English.  Furthermore, the internal data sets can be used to run queries on the available weather stations, gauging stations and time series, reducing the time needed for downloading and data wrangling. 

### Installation

The package is available in [CRAN](https://cran.r-project.org/web/packages/hydroscoper/index.html) and can be installed with:

```r
install.packages("hydroscoper")
```

The development version from GitHub can be installed using [devtools](https://cran.r-project.org/web/packages/devtools/index.html):
```r
devtools::install_github("ropensci/hydroscoper")
```

### Using the package

The following code is a demonstration of how to download and plot the available data from a specific station. First of all, the package must be loaded:
```r
load(hydroscoper)
```
The time series that will be used come from the station `AG. BASILEIOS`, in the Greek water division `GR13`. The station `AG. BASILEIOS` appears to have two different IDs and two different owners (maybe is an inconsistency in Hydroscope's databases):

```r
stations[stations$name == "AG. BASILEIOS", ]

##     station_id          name      water_basin water_division
## 1       501032 AG. BASILEIOS KOURTALIOTES P.            GR13
## 358     200280 AG. BASILEIOS KOURTALIOTES P.            GR13
##                owner longitude latitude altitude subdomain
## 1       min_agricult        NA       NA       NA       kyy
## 358 min_envir_energy  24.45425 35.24414    298.6       kyy
```
The available time series from this station are:
```r
subset(timeseries, station_id %in% c(501032, 200280))

##     time_id station_id       variable timestep units
## 177     987     200280 wind_direction     <NA>     °
## 279    2224     501032           flow     <NA>   l/s
## 609     985     200280  precipitation    daily    mm
## 668     986     200280           snow    daily    mm
##                    start_date                  end_date subdomain
## 177 1955-02-04T08:00:00+02:00 1997-03-31T09:00:00+03:00       kyy
## 279 1970-09-01T00:00:00+02:00 2005-08-01T01:00:00+03:00       kyy
## 609 1954-01-01T08:00:00+02:00 2015-09-30T09:00:00+03:00       kyy
## 668 1954-01-01T08:00:00+02:00 1997-03-31T09:00:00+03:00       kyy
```
To download the daily precipitation time series run:
```r
prec <- get_data("kyy", 985)
prec

## # A tibble: 22,217 x 3
##    date                value comment
##    <dttm>              <dbl> <chr>  
##  1 1954-01-01 08:00:00 15.3  <NA>   
##  2 1954-01-02 08:00:00  5.60 <NA>   
##  3 1954-01-03 08:00:00 10.2  <NA>   
##  4 1954-01-04 08:00:00  0.   <NA>   
##  5 1954-01-05 08:00:00 10.8  <NA>   
## # ... with 22,212 more rows
```
Also, to download the flow time series run:
```r
flow <- get_data("kyy", 2224)
flow

## # A tibble: 324 x 3
##    date                 value comment
##    <dttm>               <dbl> <chr>  
##  1 1970-09-01 00:00:00   3.86 <NA>   
##  2 1970-10-01 00:00:00  10.1  <NA>   
##  3 1970-11-01 00:00:00  25.8  <NA>   
##  4 1970-12-01 00:00:00  32.1  <NA>   
##  5 1971-01-01 00:00:00 100.   <NA>   
## # ... with 319 more rows
```
Flow data seems to have a monthly time step. But, how someone can infer if these values are monthly averages or instantaneous? Let's create a plot!

 * Firstly, subset the data to a narrower time window:

```{r}
min_date <- "1990-01-01 UTC"
max_date <- "2000-01-01 UTC"
flow <- subset(flow, date >= min_date & date <= max_date)
prec <- subset(prec, date >= min_date & date <= max_date)
```
 * Finally, create the Precipitation Hyetograph and Stream-flow Hydrograph:
 
```{r}
library(gridExtra)
library(ggplot2)

g.top <- ggplot(prec, aes(x = date, y = value, ymin=0, ymax=value)) +
  geom_linerange(col = "light blue") +
  theme_minimal() +
  theme(axis.text.x=element_blank())+
  labs(y = "Prec. (mm)", x = "")

g.bottom <- ggplot(flow, aes(x = date, y = value)) +
  geom_line(color = "dark red") +
  theme_minimal() +
  labs(x = "Date", y = "Streamflow (l/s)")

grid.arrange(g.top,g.bottom, heights = c(1/3, 2/3))
```
<center>
<img src = "/img/blog-images/2018-03-23-hydroscope/hydrograph.png" style = "width:90%">
</center>
<p>

The spikes in the plot indicate that the stream-flow values are monthly instantaneous. If there were monthly averages, one would expect a  smoother sequence of values.

## Future developments

Please help us to develop `hydroscoper`. If you have suggestions or bug reports, please add them to the [issue tracker](https://github.com/ropensci/hydroscoper/issues) To submit a patch, please [fork](https://help.github.com/articles/fork-a-repo/) its repository and submit a [pull request](https://github.com/ropensci/hydroscoper/pulls).


## Acknowledgments
Thank you rOpenSci for this great experience! I am really grateful to rOpenSci Reviewers [Tim Trice](https://github.com/timtrice) and [Sharla Gelfand](https://github.com/sharlagelfand), and editor [Maëlle Salmon](https://github.com/maelle) for their helpful [comments and suggestions](https://github.com/ropensci/onboarding/issues/185) that improved my package and myself as an R programmer. I would like, also, to thank ... for providing invaluable advice when reviewing this post.
