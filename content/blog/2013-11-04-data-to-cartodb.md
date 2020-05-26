---
slug: data-to-cartodb
title: Species occurrence data to CartoDB
date: '2013-11-04'
author:
  - Scott Chamberlain
tags:
  - R
  - rgbif
  - API
  - cartodb
  - maps
---

We have previously written about creating interactive maps on the web from R, with the interactive maps on Github. See [here](/blog/2013/10/23/style-geojson-polygon/), [here](/blog/2013/07/17/style-geojson/), [here](/blog/2013/07/04/rbison-geoson/), and [here](https://recology.info/2013/06/geojson/).

A different approach is to use [CartoDB](https://cartodb.com/), [a freemium service](https://cartodb.com/pricing/) with sql interface to your data tables that provides a map to visualize data in those tables. They released an R interace to their sql API [on Github here](https://github.com/Vizzuality/cartodb-r) - which we can use to make an interactive map from R.

We'll first get some data from GBIF, ~500 occurrences of *Puma concolor* in the US, then push that data to a CartoDB table. There are a couple more non-programmatic steps in this workflow than with pushing geojson file to Github as outlined in the previous linked above (i.e., going to the CartoDB site and making a visualization, and making it public).

***************

## Install packages


```r
install.packages("devtools")
library(devtools)
install_github("rgbif", "ropensci", ref = "newapi")
install_github("cartodb-r", "Vizzuality", subdir = "CartoDB")
```


## Load em


```r
library(rgbif)
library(CartoDB)
```


***************

## Get some data from GBIF

Here, we'll get data for Puma concolor, the *hello, world* for biodiversity data.


```r
key <- gbif_lookup(name = "Puma concolor", kingdom = "animals")$speciesKey
data <- occ_search(taxonKey = key, limit = 500, georeferenced = TRUE, country = "US",
    return = "data")
head(data)
```

```
##                             name longitude latitude
## 1 Puma concolor (Linnaeus, 1771)    -108.9    32.70
## 2 Puma concolor (Linnaeus, 1771)    -108.0    32.88
## 3 Puma concolor (Linnaeus, 1771)    -105.5    32.95
## 4 Puma concolor (Linnaeus, 1771)    -107.8    33.61
## 5 Puma concolor (Linnaeus, 1771)    -107.5    33.00
## 6 Puma concolor (Linnaeus, 1771)    -106.5    36.69
```

```r
str(data)
```

```
## 'data.frame':	500 obs. of  3 variables:
##  $ name     : Factor w/ 7 levels "Animalia","Carnivora",..: 7 7 7 7 7 7 7 7 7 7 ...
##  $ longitude: num  -109 -108 -105 -108 -107 ...
##  $ latitude : num  32.7 32.9 33 33.6 33 ...
```


Great, we have some data. Now let's make a map.

***************

## Push data up to CartoDB

I frist crated a table in my CartoDB account named `pumamap`. Then, I need to initialize the connection with CartoDB with my account name and API key. Note that I am pulling up my key from my .Rprofile file on my machine for ease and so it's not revealed to you :)


```r
key = getOption("mycartodbkey")
cartodb("recology", api.key = key)
```


Now we need to push data to our `pumamap` table using the function `cartodb.row.insert`. It accepts one row of data, so we'll pass each row of data with an `lapply` call.


```r
rows <- apply(data, 1, as.list)
lapply(rows, function(x) cartodb.row.insert(name = "pumamap", columns = list("name",
    "longitude", "latitude"), values = x))
```


After the upload is finished, I had to make sure the table was georeferenced, and played with settings to suit my style. And then I made a visualization from the `pumamap` dataset and made it public. And that's it!  You can [find the map](https://cdb.io/1fbvgCG), and it can be embedded:

<iframe width='100%' height='400' frameborder='0' src='https://recology.cartodb.com/viz/76a5598e-444b-11e3-8a8c-5404a6a69006/embed_map?title=false&description=false&search=false&shareable=false&cartodb_logo=true&layer_selector=false&legends=false&scrollwheel=true&sublayer_options=1&sql=&zoom=3&center_lat=37.61423141542417&center_lon=-100.72265625'></iframe>


And we can examine a row from the table in our CartoDB account with a single line of code


```r
cartodb.row.get(name = "pumamap", cartodb_id = 10)
```

```
##   cartodb_id                           name description
## 1          1 Puma concolor (Linnaeus, 1771)        NULL
##                 created_at               updated_at
## 1 2013-11-03T06:40:12+0100 2013-11-03T06:46:55+0100
##                                             the_geom the_geom_webmercator
## 1 0101000020E610000089247A19C5365BC08C15359886594040                 NULL
##   latitude longitude
## 1     32.7    -108.9
```
