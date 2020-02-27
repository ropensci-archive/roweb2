---
slug: "weathercan-dummy"
title: A Dummy Post to Test Editing
# Delete the package_version line below if your post is not about a package
package_version: 0.3.0
authors:
  - Steffi LaZerte
# Set the date below to the publication date of your post
date: 2020-02-28
# Set categories to technotes if this is a tech note
categories: blog
# Leave topicid blank below; will be set by editor
topicid:
# Minimal tags for a post about a community-contributed package 
# that has passed software peer review are listed below
# Consult the Technical Guidelines for information on choosing tags
tags:
  - Software Peer Review
  - packages
  - R
  - community
  - data-access
  - weather
  - Canada
# the summary below will be used by e.g. Twitter cards
description: "Integrating data from weathercan with different types of data"
# If you have no preferred image for Twitter cards,
# delete the twitterImg line below 
# Note there is no '/' symbol before 'img' here
# if needed replace blog with technotes
twitterImg: blog/2020-02-28-weathercan-dummy/weathercan.png
# 'output' is necessary to obtain index.md
# Do not commit index.html
output: 
  html_document:
    keep_md: true
---



I love working with R and have been sharing the love with my friends and colleagues for almost seven years now. I'm one of those really annoying people whose response to most analysis-related questions is "You can do that in R! Five minutes, tops!" or "Three lines of code, I swear!" The problem was that I invariably spent an hour or more showing people how to get the data, load the data, clean the data, transform the data, and join the data, before we could even start the "five minute analysis". With the advent of [`tidyverse`](https://www.tidyverse.org), data manipulation has gotten much, much easier, but I still find that data manipulation is where most new users get stuck. This is one of the reasons why, when I designed [`weathercan`](http://github.com/ropensci/weathercan), I tried as hard as possible to make it simple and straightforward.

`weathercan` is an R package designed to make it easy to access historical weather data from [Environment and Climate Change Canada (ECCC)](http://climate.weather.gc.ca/historical_data/search_historic_data_e.html). It downloads, combines, cleans, and transforms the data from multiple weather stations and across long time frames. So when you access ECCC data, you get everything in one dataset. Nifty, eh?

Although downloading data with `weathercan` is fairly straight forward, weather data often needs to be integrated into other data sets. You may want to combine `weathercan` data with other types of measurements (e.g., river water samples on a specific day), or summarize and join it with data on other scales (e.g. temporal or spatial). Depending on the other data this can be a tricky step. That's why I'm going to walk you through some different ways of integrating weather data from `weathercan` with other data sets.

We'll also be using several other R packages to do this, so why don't we load them right now:


```r
# Data manipulation and plotting
library(dplyr)
```

```

Attaching package: 'dplyr'
```

```
The following objects are masked from 'package:stats':

    filter, lag
```

```
The following objects are masked from 'package:base':

    intersect, setdiff, setequal, union
```

```r
library(ggplot2)

# Checking data completeness
library(naniar)

# Access to data containing feeder visits by birds
library(feedr)

# Spatial analyses
library(sf)
```

```
Linking to GEOS 3.6.2, GDAL 2.2.3, PROJ 4.9.3
```

```r
library(mapview)
```

Well, I've told you it's easy to get data from weathercan, so let's start by doing so. For example, if you wanted to download weather data for all of Manitoba, Canada since the New Year, you have only three steps:

1) Load the package:


```r
library(weathercan)
```

```

Attaching package: 'weathercan'
```

```
The following object is masked from 'package:feedr':

    finches
```

2) Look at the built in `stations` data set to find the specific stations you're interested in (you can also use the `stations_search()` function). Here, we'll use the [`dplyr`](http://dplyr.tidyverse.org/) package (part of [`tidyverse`](https://www.tidyverse.org)) to `filter()` stations to only those in the province of Manitoba, which record data at daily intervals, and which have an end date of 2018 or later (which likely means it's still operational at the date of writing this post). Note that we'll also be removing some columns (`prov`, `climate_id`, `WMO_id`, `TC_id`) just for clarity.


```r
mb <- filter(stations, 
             prov == "MB",
             interval == "day",
             end >= 2018) %>%
  select(-prov, -climate_id, -WMO_id, -TC_id)
mb
```

```
# A tibble: 81 x 10
   station_name station_id   lat    lon  elev tz    interval start   end normals
   <chr>             <int> <dbl>  <dbl> <dbl> <chr> <chr>    <int> <int> <lgl>  
 1 RIVERS PETT…       3457  50.1 -100.   488. Etc/… day       1987  2020 FALSE  
 2 ROSSBURN 4 …       3458  50.8 -101.   610. Etc/… day       1986  2020 FALSE  
 3 ELKHORN 2 E…       3460  49.9 -101.   498. Etc/… day       1987  2020 FALSE  
 4 BALDUR             3463  49.3  -99.3  450. Etc/… day       1962  2020 TRUE   
 5 PORTAGE LA …       3519  50.0  -98.3  259. Etc/… day       1970  2020 TRUE   
 6 WASAGAMING         3562  50.7  -99.9  627. Etc/… day       1966  2020 TRUE   
 7 GRETNA (AUT)       3605  49.0  -97.6  253. Etc/… day       1885  2020 TRUE   
 8 HOLLAND            3609  49.6  -98.9  375. Etc/… day       1984  2020 FALSE  
 9 MARQUETTE          3619  50.0  -97.8  244. Etc/… day       1969  2020 TRUE   
10 OAKBANK            3641  49.9  -96.8  246. Etc/… day       1885  2020 FALSE  
# … with 71 more rows
```

3) Download all the data from the start of the year for these stations


```r
mb_weather_all <- weather_dl(station_ids = mb$station_id[1], 
                             start = "2020-01-01", 
                             interval = "day", quiet = TRUE)
```



```r
ggplot(data = mb_weather_all, aes(x = date, y = mean_temp, colour = station_name)) +
  geom_point() +
  geom_line() +
  scale_color_viridis_d() +
  theme(legend.position = "none")
```

```
Warning: Removed 55 rows containing missing values (geom_point).
```

```
Warning: Removed 55 rows containing missing values (geom_path).
```

{{<figure src="temperature_fig-1.png" alt="figure of average daily temperature by date for January and February 2020 for different weather stations in Manitoba. Shows two cold spells, one in January, one in February." title="Average daily temperature in Manitoba" caption="Two cold spells" width="300">}}
