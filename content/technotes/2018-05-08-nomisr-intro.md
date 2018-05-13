---
title: "Nomisr - Access 'Nomis' UK Labour Market Data"
slug: "nomisr"
date: 2018-05-08
package_version: 0.2.0
authors:
  - name: Evan Odell
    url: https://github.com/evanodell
categories:
  - technotes
topicid: 1163
tags:
- r
- community
- software
- review
- onboarding
- package
- data-access
- data-extraction
- geospatial
- uk
- census
- geography
---




I'm excited to announce a new package for accessing official statistics from the UK. [`nomisr`](https://github.com/ropensci/nomisr) is the R client for the [Nomis](https://www.nomisweb.co.uk/) database. Nomis is run by Durham University on behalf of the UK's Office for National Statistics (ONS), and contains over a thousand datasets, primarily on the UK labour market, census data, benefit spending and general economic activity. Registration is optional, although registration and the use of an API key allows for larger queries without the risk of being timed out or rate limited by the API.

Most data in Nomis is arranged in statistical geographies -- ranging from the whole of the UK to small output areas, making `nomisr` a useful tool for map-making and social geography. The example below shows how to retrieve the latest data on the number of Job Seekers Allowance claimants in each parliamentary constitutency, and maps them onto a cartogram from the [`parlitools`](https://cran.r-project.org/package=parlitools) package, using the [development version of `ggplot2`](http://github.com/tidyverse/ggplot2/)



```r
library(nomisr)
library(dplyr)
library(parlitools)
library(viridis)
#devtools::install_github("tidyverse/ggplot2/")
library(ggplot2)
library(sf)

jsa_constits <- nomis_get_data(id = "NM_1_1", time = "latest", 
                               measures = 20100, sex = 7,
                               geography = "TYPE460", 
                               additional_queries = "&item=1")

jsa_constits$GEOGRAPHY_NAME <- gsub("Na h-Eileanan An Iar", 
                                    "Na h-Eileanan an Iar", 
                                    jsa_constits$GEOGRAPHY_NAME)

jsa_constits$GEOGRAPHY_NAME <- gsub("St ", "St. ", jsa_constits$GEOGRAPHY_NAME)

west_hex_map <- parlitools::west_hex_map %>% 
  inner_join(jsa_constits, by = c("constituency_name" = "GEOGRAPHY_NAME"))

west_hex_map$OBS_VALUE <- as.numeric(west_hex_map$OBS_VALUE)

p1 <- ggplot(west_hex_map) + geom_sf(aes(geometry = geometry, 
                             fill = OBS_VALUE), color = "black") +
  coord_sf(datum = sf::st_crs(west_hex_map$geometry)) +
  scale_fill_viridis(option = "E") + 
  labs(title = "JSA Claimants per Constituency", fill = "JSA Claimants")

p1
```

![map-chunk-1](https://i.imgur.com/x0e4ZXf.png)

`nomisr` was developed to make using UK labour market statistics faster, easier and more replicable. I've used it to speed up research for policy and issue briefings in my day job 

## To do

The `nomisr` package covers most of the features available on Nomis, with the exception of a grouping function that can easily be replicated in R using tools like [`dplyr`](https://cran.r-project.org/package=dplyr) and that will likely be incorporated into a future release, as will an optional parameter to change variable names to snake_case instead of the API's default all caps response. Long term development is focused on making the package more user-friendly for people with less familiarity with Nomis data and the API structure.

### Package review

Thank you to reviewers [Paul Egeler](https://github.com/pegeler) and [Christophe Dervieux](https://github.com/cderv) for their incredibly helpful comments and suggestions, and for [Karthik Ram](https://github.com/karthik)'s editorial supervision. `nomisr` is a much better package than would otherwise have been the case as a result of their efforts.


