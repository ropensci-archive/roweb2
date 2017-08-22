---
title: rebird tutorial
package_version: 0.3.0
---



A programmatic interface to the eBird database. Find out more about eBird at [their website](http://ebird.org/content/ebird/).

<section id="installation">

## Installation


You can install the stable version from CRAN


```r
install.packages("rebird")
```

Or the development version from Github


```r
install.packages("devtools")
devtools::install_github("ropensci/rebird")
```

Then load the package into the R sesssion


```r
library("rebird")
```

<section id="usage">

## Usage

### Sightings at location determined by latitude/longitude

Search for bird occurrences by latitude and longitude point


```r
ebirdgeo(species = 'spinus tristis', lat = 42, lng = -76)
#>               obsDt       lng
#> 1  2016-05-02 08:15 -76.03871
#> 2  2016-05-02 07:01 -75.88152
#> 3  2016-05-02 06:40 -75.93579
#> 4  2016-05-01 15:27 -75.90142
#> 5  2016-05-01 12:20 -75.83381
#> 6  2016-05-01 10:45 -76.00171
#> 7  2016-05-01 08:15 -75.90972
#> 8  2016-05-01 07:45 -75.92510
#> 9        2016-05-01 -75.96305
...
```

Same, but with additional parameter settings, returning only 10 records, including provisional records, and hotspot records.


```r
ebirdgeo(lat = 42, lng = -76, max = 10, includeProvisional = TRUE, hotspot = TRUE)
#>               obsDt       lng     locName obsValid              comName
#> 1  2016-05-02 07:01 -75.88152 Boland Pond     TRUE        American Coot
#> 2  2016-05-02 07:01 -75.88152 Boland Pond     TRUE                 Sora
#> 3  2016-05-02 07:01 -75.88152 Boland Pond     TRUE         Song Sparrow
#> 4  2016-05-02 07:01 -75.88152 Boland Pond     TRUE Red-winged Blackbird
#> 5  2016-05-02 07:01 -75.88152 Boland Pond     TRUE        Mourning Dove
#> 6  2016-05-02 07:01 -75.88152 Boland Pond     TRUE    European Starling
#> 7  2016-05-02 07:01 -75.88152 Boland Pond     TRUE       Eastern Towhee
#> 8  2016-05-02 07:01 -75.88152 Boland Pond     TRUE       Common Grackle
#> 9  2016-05-02 07:01 -75.88152 Boland Pond     TRUE         Canada Goose
...
```


### Recent sightings frm location IDs

Search for bird occurrences for two locations by their IDs


```r
ebirdloc(locID = c('L99381','L99382'))
#>                obsDt       lng      locName obsValid
#> 1   2016-05-02 13:18 -76.50546 Stewart Park     TRUE
#> 2   2016-05-02 13:18 -76.50546 Stewart Park     TRUE
#> 3   2016-05-02 13:18 -76.50546 Stewart Park     TRUE
#> 4   2016-05-02 13:18 -76.50546 Stewart Park     TRUE
#> 5   2016-05-02 13:18 -76.50546 Stewart Park     TRUE
#> 6   2016-05-02 13:18 -76.50546 Stewart Park     TRUE
#> 7   2016-05-02 13:18 -76.50546 Stewart Park     TRUE
#> 8   2016-05-02 13:18 -76.50546 Stewart Park     TRUE
#> 9   2016-05-02 13:18 -76.50546 Stewart Park     TRUE
...
```

Search by location ID and species name, as well as some additional parameter settings


```r
ebirdloc(locID = 'L99381', species = 'larus delawarensis', max = 10, provisional = TRUE, hotspot=TRUE)
#>              obsDt       lng      locName obsValid          comName
#> 1 2016-05-02 13:18 -76.50546 Stewart Park     TRUE Ring-billed Gull
#>   obsReviewed            sciName locationPrivate      lat  locID
#> 1       FALSE Larus delawarensis           FALSE 42.46134 L99381
```


### Recent observations at a region

Search for bird occurrences by region and species name


```r
ebirdregion(region = 'US', species = 'Setophaga caerulescens')
#>                 obsDt       lng
#> 1    2016-05-02 09:25 -77.05141
#> 2    2016-05-02 09:20 -78.69069
#> 3    2016-05-02 09:08 -77.49636
#> 4    2016-05-02 09:05 -74.94081
#> 5    2016-05-02 09:00 -76.50132
#> 6    2016-05-02 08:56 -76.96700
#> 7    2016-05-02 08:53 -77.59850
#> 8    2016-05-02 08:50 -77.43810
#> 9    2016-05-02 08:42 -74.50114
...
```

Search by location ID and species name, as well as some additional parameter settings. Note that we use `US-OH` to represent Ohio within the US. [See possible region values](https://confluence.cornell.edu/display/CLOISAPI/eBird-1.1-RegionCodeReference).


```r
ebirdregion(region = 'US-OH', max = 10, provisional = TRUE, hotspot = TRUE)
#>               obsDt       lng                                    locName
#> 1  2016-05-02 09:42 -83.18247 Magee Marsh--Causeway Marshes (Ottawa Co.)
#> 2  2016-05-02 09:42 -83.18247 Magee Marsh--Causeway Marshes (Ottawa Co.)
#> 3  2016-05-02 09:42 -83.18247 Magee Marsh--Causeway Marshes (Ottawa Co.)
#> 4  2016-05-02 09:42 -83.18247 Magee Marsh--Causeway Marshes (Ottawa Co.)
#> 5  2016-05-02 09:42 -83.18247 Magee Marsh--Causeway Marshes (Ottawa Co.)
#> 6  2016-05-02 09:42 -83.18247 Magee Marsh--Causeway Marshes (Ottawa Co.)
#> 7  2016-05-02 09:42 -83.18247 Magee Marsh--Causeway Marshes (Ottawa Co.)
#> 8  2016-05-02 09:42 -83.18247 Magee Marsh--Causeway Marshes (Ottawa Co.)
#> 9  2016-05-02 09:42 -83.18247 Magee Marsh--Causeway Marshes (Ottawa Co.)
...
```


### Recent observations at hotspots

Search for bird occurrences by region and species name


```r
ebirdhotspot(locID = c('L99381','L99382'), species = 'larus delawarensis')
#>              obsDt       lng      locName obsValid          comName
#> 1 2016-05-02 13:18 -76.50546 Stewart Park     TRUE Ring-billed Gull
#>   obsReviewed            sciName locationPrivate      lat  locID
#> 1       FALSE Larus delawarensis           FALSE 42.46134 L99381
NA
NA
NA
NA
NA
NA
```


### Frequency of observations at hotspots or regions

Obtain historical frequencies of bird occurrences at a given hotspot


```r
ebirdfreq(loctype = 'hotspots', loc = 'L196159')
#> Source: local data frame [8,352 x 4]
#>
#>                        comName   monthQt frequency sampleSize
#>                          <chr>     <chr>     <dbl>      <dbl>
#> 1  Greater White-fronted Goose January-1 0.0000000         22
#> 2                   Snow Goose January-1 0.0000000         22
#> 3               Cackling Goose January-1 0.0000000         22
#> 4                 Canada Goose January-1 0.0000000         22
#> 5        Cackling/Canada Goose January-1 0.0000000         22
#> 6               Trumpeter Swan January-1 0.0000000         22
...
```

Same, but in wide format (for making bar charts)


```r
ebirdfreq(loctype = 'hotspots', loc = 'L196159', long = FALSE)
#> Source: local data frame [175 x 49]
#>
#>                        comName  January-1  January-2  January-3
#>                          <chr>      <dbl>      <dbl>      <dbl>
#> 1                 Sample Size: 22.0000000 21.0000000 27.0000000
#> 2  Greater White-fronted Goose  0.0000000  0.0000000  0.0000000
#> 3                   Snow Goose  0.0000000  0.0000000  0.0000000
#> 4               Cackling Goose  0.0000000  0.0000000  0.0000000
#> 5                 Canada Goose  0.0000000  0.0000000  0.0000000
#> 6        Cackling/Canada Goose  0.0000000  0.0000000  0.0000000
...
```

Obtain frequency data for a given state


```r
ebirdfreq(loctype = 'states', loc = 'CA-BC')
#> Source: local data frame [32,640 x 4]
#>
#>                                          comName   monthQt   frequency
#>                                            <chr>     <chr>       <dbl>
#> 1                         Fulvous Whistling-Duck January-1 0.000000000
#> 2                    Greater White-fronted Goose January-1 0.008672087
#> 3  Swan x Graylag Goose (Domestic type) (hybrid) January-1 0.000000000
#> 4             Domestic goose sp. (Domestic type) January-1 0.000000000
#> 5                                  Emperor Goose January-1 0.000000000
#> 6                                     Snow Goose January-1 0.024390244
...
```

Or county


```r
ebirdfreq(loctype = 'counties', loc = 'CA-BC-GV')
#> Source: local data frame [22,656 x 4]
#>
#>                        comName   monthQt   frequency sampleSize
#>                          <chr>     <chr>       <dbl>      <dbl>
#> 1  Greater White-fronted Goose January-1 0.007092199       3243
#> 2                Emperor Goose January-1 0.000000000       3243
#> 3                   Snow Goose January-1 0.056429232       3243
#> 4                 Ross's Goose January-1 0.000000000       3243
#> 5            Snow/Ross's Goose January-1 0.000000000       3243
#> 6                        Brant January-1 0.021584952       3243
...
```

Obtain frequency data within a range of years and months


```r
ebirdfreq(loctype = 'hotspots', loc = 'L196159', startyear = 2010,
          endyear = 2014, startmonth = 1, endmonth = 3)
#> Source: local data frame [3,792 x 4]
#>
#>                                comName   monthQt frequency sampleSize
#>                                  <chr>     <chr>     <dbl>      <dbl>
#> 1                         Canada Goose January-1       0.0         10
#> 2                            Wood Duck January-1       0.4         10
#> 3                              Gadwall January-1       0.0         10
#> 4                      Eurasian Wigeon January-1       0.4         10
#> 5                      American Wigeon January-1       1.0         10
#> 6  Eurasian x American Wigeon (hybrid) January-1       0.0         10
...
```


### Recent notable sightings

Search for notable sightings at a given latitude and longitude


```r
ebirdnotable(lat = 42, lng = -70)
#>                obsDt       lng
#> 1   2016-05-02 13:43 -72.56238
#> 2   2016-05-02 11:48 -71.76948
#> 3   2016-05-02 11:39 -71.39980
#> 4   2016-05-02 11:00 -72.17408
#> 5   2016-05-02 10:17 -71.37212
#> 6   2016-05-02 09:50 -72.16669
#> 7   2016-05-02 09:05 -70.20693
#> 8   2016-05-02 09:05 -70.20693
#> 9   2016-05-02 09:05 -70.20693
...
```


### eBird taxonomy

Returns a data.frame of all species in the eBird taxonomy for the given parameter inputs


```r
ebirdtaxonomy()
#>       speciesCode category                           comName sciNameCodes
#> 1         ostric2  species                    Common Ostrich         STCA
#> 2         ostric3  species                    Somali Ostrich         STMO
#> 3         grerhe1  species                      Greater Rhea         RHAM
#> 4         lesrhe2  species                       Lesser Rhea         RHPE
#> 5         tabtin1  species            Tawny-breasted Tinamou         NOJU
#> 6         higtin1  species                  Highland Tinamou         NOBO
#> 7         hootin1  species                    Hooded Tinamou         NONI
#> 8         grytin1  species                      Gray Tinamou         TITA
#> 9         soltin1  species                  Solitary Tinamou         TISO
...
```

Search for hybrid species only


```r
ebirdtaxonomy(cat="hybrid")
#>     speciesCode category
#> 1        x00721   hybrid
#> 2        x00775   hybrid
#> 3        x00776   hybrid
#> 4        x00755   hybrid
#> 5        x00627   hybrid
#> 6       sxrgoo1   hybrid
#> 7        x00685   hybrid
#> 8        x00756   hybrid
#> 9        x00757   hybrid
...
```


### Check eBird region

Check if region is valid in eBird database


```r
ebirdregioncheck(loctype = 'counties', loc = 'CA-BC-GV')
#> [1] TRUE
```



<section id="citing">

## Citing

To cite `rebird` in publications use:

<br>

> Rafael Maia, Scott Chamberlain, Andy Teucher and Sebastian Pardo (2016). rebird: R Client for the eBird Database of Bird Observations. R package version 0.3.0. https://github.com/ropensci/rebird

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rebird](https://github.com/ropensci/rebird/issues?state=open)

[Back to top](#top)
