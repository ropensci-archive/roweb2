---
slug: rgbif-update
title: Changed and new things in the new version of rgbif, v0.5
date: '2014-02-17'
author:
  - Scott Chamberlain
tags:
  - R
  - API
  - GBIF
---

`rgbif` is an R package to search and retrieve data from the Global Biodiverity Information Facilty (GBIF). `rgbif` wraps R code around the [GBIF API][gbifapi] to allow you to talk to GBIF from R.

We just pushed a new verion of `rgbif` to cran - v0.5.0.  Source and binary files are now available on CRAN.

There are a few new functions: `count_facet`, `elevation`, and `installations`.  These are described, with examples, below.

Functions to work with the old GBIF API remain in the package, but will be removed as soon as the old API is no longer supported by GBIF. See `rgbif-deprecated` in the help for the package.

Note: you can see a detailed list of all changes in new versions on the releases page for `rgbif` on Githb here: [https://github.com/ropensci/rgbif/releases](https://github.com/ropensci/rgbif/releases)

********************

## Install rgbif and dependencies


```r
install.packages("rgbif")
```


## Load rgbif and dependencies


```r
library(rgbif)
```



## New functions
### New function: count_facet

Does facetted count searches, as GBIF doesn't allow faceted searches against the count API. In this example, we have a set of species names, and we want counts by each of a set of 20 countries for each species. This function wraps up some code to essentially give you faceted search capability for the count service - of course this is much slower than if it was done server side.


```r
spplist <- c("Geothlypis trichas", "Tiaris olivacea", "Pterodroma axillaris",
    "Calidris ferruginea", "Pterodroma macroptera", "Gallirallus australis",
    "Falco cenchroides", "Telespiza cantans", "Oreomystis bairdi", "Cistothorus palustris")
keys <- sapply(spplist, function(x) name_backbone(x, rank = "species")$usageKey)
library(plyr)
keys <- compact(keys)
count_facet(by = "country", countries = 20, removezeros = TRUE)
```

```
##                 country       V1
## 1               ANDORRA    96379
## 2  UNITED_ARAB_EMIRATES   273098
## 3           AFGHANISTAN    64020
## 4       ANTIGUA_BARBUDA    12090
## 5              ANGUILLA    13188
## 6               ALBANIA     8202
## 7               ARMENIA    26253
## 8                ANGOLA   168412
## 9            ANTARCTICA  1068590
## 10            ARGENTINA  1155372
## 11       AMERICAN_SAMOA    12248
## 12              AUSTRIA  2702533
## 13            AUSTRALIA 38729449
## 14                ARUBA     8178
## 15        ALAND_ISLANDS      566
## 16           AZERBAIJAN    17622
## 17   BOSNIA_HERZEGOVINA    10050
## 18             BARBADOS    21683
## 19           BANGLADESH    24255
## 20              BELGIUM  5167393
```


### New function: elevation

Gets elevation data for a `data.frame` of lat/long points, or a list of lat/long points. This function uses the Google Elevation API.

You can get elevation/altitude data back from the GBIF API, but that data is often missing. See the `altitude` column in data output from `occ_search` - you need to set the fields parameter to _all_ or ask for _altitude_ explicitly.


```r
key <- name_backbone(name = "Puma concolor", kingdom = "plants")$speciesKey
dat <- occ_search(taxonKey = key, return = "data", limit = 10, georeferenced = TRUE)
head(dat)
```

```
##            name       key longitude latitude
## 1 Puma concolor 866527350   -110.58    31.85
## 2 Puma concolor 866545169   -103.60    29.16
## 3 Puma concolor 866495627   -106.39    35.13
## 4 Puma concolor 866498665    -89.43    20.31
## 5 Puma concolor 866508658   -105.04    19.47
## 6 Puma concolor 866523280   -118.24    34.06
```


Attach elevation data to the `data.frame`


```r
head(elevation(dat))
```

```
##            name       key longitude latitude elevation
## 1 Puma concolor 866527350   -110.58    31.85   1294.62
## 2 Puma concolor 866545169   -103.60    29.16    665.03
## 3 Puma concolor 866495627   -106.39    35.13   2250.25
## 4 Puma concolor 866498665    -89.43    20.31     29.05
## 5 Puma concolor 866508658   -105.04    19.47     69.82
## 6 Puma concolor 866523280   -118.24    34.06     93.25
```


### New function: installations

Gets metdata on installations via the [installations API](https://www.gbif.org/developer/registry#installations).

This example requests data for installations with the query terms 'france' in the metadata. We'll just look at the first result, and just the description and its first contact.


```r
df <- installations(query = "france")
df$results[[1]]$description
```

```
## [1] "Natural Science Collections from the University of Alberta"
```

```r
df$results[[1]]$contacts[[1]]
```

```
## $key
## [1] 18037
##
## $type
## [1] "TECHNICAL_POINT_OF_CONTACT"
##
## $primary
## [1] TRUE
##
## $firstName
## [1] "Jim Whittome"
##
## $email
## [1] "jim.whittome@ualberta.ca"
##
## $createdBy
## [1] "registry-migration.gbif.org"
##
## $modifiedBy
## [1] "registry-migration.gbif.org"
##
## $created
## [1] "2013-02-26T22:15:50.000+0000"
##
## $modified
## [1] "2013-03-18T16:17:46.000+0000"
```


Another example, just requesting contact data for an installation identifier (i.e. uuid).


```r
installations(data = "contact", uuid = "2e029a0c-87af-42e6-87d7-f38a50b78201")
```

```
## [[1]]
## [[1]]$key
## [1] 19952
##
## [[1]]$type
## [1] "TECHNICAL_POINT_OF_CONTACT"
##
## [[1]]$primary
## [1] TRUE
##
## [[1]]$firstName
## [1] "Biodiversity Informatics Manager"
##
## [[1]]$email
## [1] "bdim@ansp.org"
##
## [[1]]$createdBy
## [1] "registry-migration.gbif.org"
##
## [[1]]$modifiedBy
## [1] "2e029a0c-87af-42e6-87d7-f38a50b78201"
##
## [[1]]$created
## [1] "2013-07-22T18:17:06.000+0000"
##
## [[1]]$modified
## [1] "2014-01-10T20:03:03.867+0000"
```


## Minor changes
### sapply -> vapply

We replaced `sapply` with `vapply` as `vapply` can be faster than `sapply`, and with `vapply` you can include a check in the function call to make sure that the returned data elements are of the correct type.

### Other minor changes

* Changed name of `country_codes` function to `gbif_country_codes` to avoid conflicts with other packages.
* `gbifmap` now plots a map with `ggplot2::coord_fixed(ratio=1)` so that you don't get wonky maps.
* `occ_count` now accepts a call to query publishingCountry with a single parameter (country), to list occurrence counts by publishing country.
* `occ_get` and `occ_search` lose parameter minimal, and in its place gains parameter fields, in which you can request fields='minimal' to get just name, taxon key, lat and long. Or set to 'all' to get all fields, or selection the fields you want by passing in a vector of field names.
* Updated base url for the GIBF parser function `parsenames`
* isocodes dataset now with documentation.
