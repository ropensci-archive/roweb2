---
title: rebird tutorial
package_version: 0.4.0
---



A programmatic interface to the eBird database. Find out more about eBird at [their website](http://ebird.org/content/ebird/).


### Installation


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


## Usage

### Sightings at location determined by latitude/longitude

Search for bird occurrences by latitude and longitude point


```r
ebirdgeo(species = 'spinus tristis', lat = 42, lng = -76)
#> # A tibble: 20 x 11
#>          lng
#>        <dbl>
#>  1 -76.05834
#>  2 -75.96821
#>  3 -75.83381
#>  4 -76.09052
#>  5 -75.98258
#>  6 -75.97672
#>  7 -75.95513
#>  8 -75.88343
#>  9 -75.99768
#> 10 -75.89515
#> 11 -75.95105
#> 12 -75.89231
#> 13 -76.01368
#> 14 -75.95690
#> 15 -75.96305
#> 16 -75.90261
#> 17 -75.91839
#> 18 -75.80182
#> 19 -75.86727
#> 20 -75.90484
#> # ... with 10 more variables: locName <chr>, howMany <int>, sciName <chr>,
#> #   obsValid <lgl>, locationPrivate <lgl>, obsDt <chr>, obsReviewed <lgl>,
#> #   comName <chr>, lat <dbl>, locID <chr>
```

Same, but with additional parameter settings, returning only 10 records, including provisional records, and hotspot records.


```r
ebirdgeo(lat = 42, lng = -76, max = 10, includeProvisional = TRUE, hotspot = TRUE)
#> # A tibble: 10 x 11
#>          lng                               locName howMany
#>        <dbl>                                 <chr>   <int>
#>  1 -75.88152                           Boland Pond       6
#>  2 -75.88152                           Boland Pond      80
#>  3 -75.88152                           Boland Pond      10
#>  4 -75.88152                           Boland Pond       7
#>  5 -75.88152                           Boland Pond      38
#>  6 -75.88152                           Boland Pond       1
#>  7 -75.88152                           Boland Pond       1
#>  8 -75.96821 Binghamton University Nature Preserve       1
#>  9 -75.96821 Binghamton University Nature Preserve       4
#> 10 -75.96821 Binghamton University Nature Preserve      20
#> # ... with 8 more variables: sciName <chr>, obsValid <lgl>,
#> #   locationPrivate <lgl>, obsDt <chr>, obsReviewed <lgl>, comName <chr>,
#> #   lat <dbl>, locID <chr>
```


### Recent sightings frm location IDs

Search for bird occurrences for two locations by their IDs


```r
ebirdloc(locID = c('L99381','L99382'))
#> # A tibble: 108 x 11
#>          lng      locName howMany                   sciName obsValid
#>        <dbl>        <chr>   <int>                     <chr>    <lgl>
#>  1 -76.50546 Stewart Park     200         Branta canadensis     TRUE
#>  2 -76.50546 Stewart Park       2        Anas platyrhynchos     TRUE
#>  3 -76.50546 Stewart Park       5   Melanitta perspicillata     TRUE
#>  4 -76.50546 Stewart Park       1        Oxyura jamaicensis     TRUE
#>  5 -76.50546 Stewart Park     100     Phalacrocorax auritus     TRUE
#>  6 -76.50546 Stewart Park     150        Larus delawarensis     TRUE
#>  7 -76.50546 Stewart Park       1          Larus argentatus     TRUE
#>  8 -76.50546 Stewart Park       2             Larus marinus     TRUE
#>  9 -76.50546 Stewart Park       2 Anser sp. (Domestic type)     TRUE
#> 10 -76.50546 Stewart Park       1             Aythya marila     TRUE
#> # ... with 98 more rows, and 6 more variables: locationPrivate <lgl>,
#> #   obsDt <chr>, obsReviewed <lgl>, comName <chr>, lat <dbl>, locID <chr>
```

Search by location ID and species name, as well as some additional parameter settings


```r
ebirdloc(locID = 'L99381', species = 'larus delawarensis', max = 10, provisional = TRUE, hotspot=TRUE)
#> # A tibble: 1 x 11
#>         lng      locName howMany            sciName obsValid
#>       <dbl>        <chr>   <int>              <chr>    <lgl>
#> 1 -76.50546 Stewart Park     150 Larus delawarensis     TRUE
#> # ... with 6 more variables: locationPrivate <lgl>, obsDt <chr>,
#> #   obsReviewed <lgl>, comName <chr>, lat <dbl>, locID <chr>
```


### Recent observations at a region

Search for bird occurrences by region and species name


```r
ebirdregion(region = 'US', species = 'Setophaga caerulescens')
#> # A tibble: 932 x 11
#>          lng                                               locName howMany
#>        <dbl>                                                 <chr>   <int>
#>  1 -83.02266                                           SW 153rd Ct       1
#>  2 -81.41950                     US-Florida-Longwood-W Hornbeam Dr       1
#>  3 -79.09746                                    Briar Chapel Trail       1
#>  4 -81.50596 543 Union Road, Naples, Florida, US (25.972, -81.506)       1
#>  5 -81.24840                                    Green Springs Park       1
#>  6 -74.96083                         Cape Island--Higbee Beach WMA       1
#>  7 -82.83691                 Clemson University/SCDNR--Cherry Farm       1
#>  8 -73.96957                              Central Park--The Ramble       1
#>  9 -74.87466                                              New Road       1
#> 10 -74.91712              Cape Island--Cape May--Convention Center       1
#> # ... with 922 more rows, and 8 more variables: sciName <chr>,
#> #   obsValid <lgl>, locationPrivate <lgl>, obsDt <chr>, obsReviewed <lgl>,
#> #   comName <chr>, lat <dbl>, locID <chr>
```

Search by location ID and species name, as well as some additional parameter settings. Note that we use `US-OH` to represent Ohio within the US. [See possible region values](https://confluence.cornell.edu/display/CLOISAPI/eBird-1.1-RegionCodeReference).


```r
ebirdregion(region = 'US-OH', max = 10, provisional = TRUE, hotspot = TRUE)
#> # A tibble: 10 x 11
#>          lng            locName howMany               sciName obsValid
#>        <dbl>              <chr>   <int>                 <chr>    <lgl>
#>  1 -81.58932 Lake View Cemetery      12    Turdus migratorius     TRUE
#>  2 -81.58932 Lake View Cemetery       1      Zenaida macroura     TRUE
#>  3 -81.58932 Lake View Cemetery      15    Anas platyrhynchos     TRUE
#>  4 -81.58932 Lake View Cemetery       1  Haemorhous mexicanus     TRUE
#>  5 -81.58932 Lake View Cemetery      10       Regulus satrapa     TRUE
#>  6 -81.58932 Lake View Cemetery       2           Anas crecca     TRUE
#>  7 -81.58932 Lake View Cemetery       1      Sturnus vulgaris     TRUE
#>  8 -81.58932 Lake View Cemetery       1 Phalacrocorax auritus     TRUE
#>  9 -81.58932 Lake View Cemetery      45     Branta canadensis     TRUE
#> 10 -81.58932 Lake View Cemetery       4   Cyanocitta cristata     TRUE
#> # ... with 6 more variables: locationPrivate <lgl>, obsDt <chr>,
#> #   obsReviewed <lgl>, comName <chr>, lat <dbl>, locID <chr>
```


### Recent observations at hotspots

Search for bird occurrences by region and species name


```r
ebirdhotspot(locID = c('L99381','L99382'), species = 'larus delawarensis')
#> # A tibble: 2 x 11
#>         lng                                      locName howMany
#>       <dbl>                                        <chr>   <int>
#> 1 -76.50546                                 Stewart Park     150
#> 2 -76.51902 Hog Hole (Allan H. Treman State Marine Park)      70
#> # ... with 8 more variables: sciName <chr>, obsValid <lgl>,
#> #   locationPrivate <lgl>, obsDt <chr>, obsReviewed <lgl>, comName <chr>,
#> #   lat <dbl>, locID <chr>
```


### Frequency of observations at hotspots or regions

Obtain historical frequencies of bird occurrences at a given hotspot


```r
ebirdfreq(loctype = 'hotspots', loc = 'L196159')
#> # A tibble: 8,880 x 4
#>                        comName   monthQt frequency sampleSize
#>                          <chr>     <chr>     <dbl>      <dbl>
#>  1                  Snow Goose January-1 0.0000000         26
#>  2 Greater White-fronted Goose January-1 0.0000000         26
#>  3              Cackling Goose January-1 0.0000000         26
#>  4                Canada Goose January-1 0.0000000         26
#>  5       Cackling/Canada Goose January-1 0.0000000         26
#>  6              Trumpeter Swan January-1 0.0000000         26
#>  7                   Wood Duck January-1 0.1538462         26
#>  8            Blue-winged Teal January-1 0.0000000         26
#>  9   Blue-winged/Cinnamon Teal January-1 0.0000000         26
#> 10           Northern Shoveler January-1 0.6923077         26
#> # ... with 8,870 more rows
```

Same, but in wide format (for making bar charts)


```r
ebirdfreq(loctype = 'hotspots', loc = 'L196159', long = FALSE)
#> # A tibble: 186 x 49
#>                        comName `January-1` `January-2` `January-3`
#>                          <chr>       <dbl>       <dbl>       <dbl>
#>  1                Sample Size:  26.0000000          25     35.0000
#>  2                  Snow Goose   0.0000000           0      0.0000
#>  3 Greater White-fronted Goose   0.0000000           0      0.0000
#>  4              Cackling Goose   0.0000000           0      0.0000
#>  5                Canada Goose   0.0000000           0      0.0015
#>  6       Cackling/Canada Goose   0.0000000           0      0.0000
#>  7              Trumpeter Swan   0.0000000           0      0.0000
#>  8                   Wood Duck   0.1538462           0      0.0000
#>  9            Blue-winged Teal   0.0000000           0      0.0000
#> 10   Blue-winged/Cinnamon Teal   0.0000000           0      0.0000
#> # ... with 176 more rows, and 45 more variables: `January-4` <dbl>,
#> #   `February-1` <dbl>, `February-2` <dbl>, `February-3` <dbl>,
#> #   `February-4` <dbl>, `March-1` <dbl>, `March-2` <dbl>, `March-3` <dbl>,
#> #   `March-4` <dbl>, `April-1` <dbl>, `April-2` <dbl>, `April-3` <dbl>,
#> #   `April-4` <dbl>, `May-1` <dbl>, `May-2` <dbl>, `May-3` <dbl>,
#> #   `May-4` <dbl>, `June-1` <dbl>, `June-2` <dbl>, `June-3` <dbl>,
#> #   `June-4` <dbl>, `July-1` <dbl>, `July-2` <dbl>, `July-3` <dbl>,
#> #   `July-4` <dbl>, `August-1` <dbl>, `August-2` <dbl>, `August-3` <dbl>,
#> #   `August-4` <dbl>, `September-1` <dbl>, `September-2` <dbl>,
#> #   `September-3` <dbl>, `September-4` <dbl>, `October-1` <dbl>,
#> #   `October-2` <dbl>, `October-3` <dbl>, `October-4` <dbl>,
#> #   `November-1` <dbl>, `November-2` <dbl>, `November-3` <dbl>,
#> #   `November-4` <dbl>, `December-1` <dbl>, `December-2` <dbl>,
#> #   `December-3` <dbl>, `December-4` <dbl>
```

Obtain frequency data for a given state


```r
ebirdfreq(loctype = 'states', loc = 'CA-BC')
#> # A tibble: 34,560 x 4
#>                                          comName   monthQt    frequency
#>                                            <chr>     <chr>        <dbl>
#>  1                        Fulvous Whistling-Duck January-1 0.0000000000
#>  2                                 Emperor Goose January-1 0.0000000000
#>  3                                    Snow Goose January-1 0.0279534963
#>  4                                  Ross's Goose January-1 0.0000000000
#>  5                  Snow x Ross's Goose (hybrid) January-1 0.0000000000
#>  6                             Snow/Ross's Goose January-1 0.0000000000
#>  7                    Swan Goose (Domestic type) January-1 0.0000854847
#>  8 Graylag x Swan Goose (Domestic type) (hybrid) January-1 0.0000000000
#>  9                   Greater White-fronted Goose January-1 0.0078645922
#> 10                             Pink-footed Goose January-1 0.0000000000
#> # ... with 34,550 more rows, and 1 more variables: sampleSize <dbl>
```

Or county


```r
ebirdfreq(loctype = 'counties', loc = 'CA-BC-GV')
#> # A tibble: 23,808 x 4
#>                               comName   monthQt   frequency sampleSize
#>                                 <chr>     <chr>       <dbl>      <dbl>
#>  1                      Emperor Goose January-1 0.000000000       3895
#>  2                         Snow Goose January-1 0.063414634       3895
#>  3                       Ross's Goose January-1 0.000000000       3895
#>  4                  Snow/Ross's Goose January-1 0.000000000       3895
#>  5        Greater White-fronted Goose January-1 0.005905006       3895
#>  6 Domestic goose sp. (Domestic type) January-1 0.000000000       3895
#>  7                              Brant January-1 0.023620026       3895
#>  8                     Cackling Goose January-1 0.012836970       3895
#>  9                       Canada Goose January-1 0.201026958       3895
#> 10    Graylag x Canada Goose (hybrid) January-1 0.000000000       3895
#> # ... with 23,798 more rows
```

Obtain frequency data within a range of years and months


```r
ebirdfreq(loctype = 'hotspots', loc = 'L196159', startyear = 2010,
          endyear = 2014, startmonth = 1, endmonth = 3)
#> # A tibble: 3,792 x 4
#>                                comName   monthQt frequency sampleSize
#>                                  <chr>     <chr>     <dbl>      <dbl>
#>  1                        Canada Goose January-1       0.0         10
#>  2                           Wood Duck January-1       0.4         10
#>  3                   Northern Shoveler January-1       0.8         10
#>  4                             Gadwall January-1       0.0         10
#>  5                     Eurasian Wigeon January-1       0.4         10
#>  6                     American Wigeon January-1       1.0         10
#>  7 Eurasian x American Wigeon (hybrid) January-1       0.0         10
#>  8                             Mallard January-1       1.0         10
#>  9                    Northern Pintail January-1       0.0         10
#> 10                   Green-winged Teal January-1       0.0         10
#> # ... with 3,782 more rows
```


### Recent notable sightings

Search for notable sightings at a given latitude and longitude


```r
ebirdnotable(lat = 42, lng = -70)
#> # A tibble: 1,059 x 11
#>          lng
#>        <dbl>
#>  1 -72.49699
#>  2 -72.49699
#>  3 -71.26230
#>  4 -70.98485
#>  5 -70.71425
#>  6 -70.71425
#>  7 -70.71425
#>  8 -71.25293
#>  9 -71.25293
#> 10 -72.55930
#> # ... with 1,049 more rows, and 10 more variables: locName <chr>,
#> #   howMany <int>, sciName <chr>, obsValid <lgl>, locationPrivate <lgl>,
#> #   obsDt <chr>, obsReviewed <lgl>, comName <chr>, lat <dbl>, locID <chr>
```


### eBird taxonomy

Returns a data.frame of all species in the eBird taxonomy for the given parameter inputs


```r
ebirdtaxonomy()
#> # A tibble: 10,550 x 9
#>    speciesCode comNameCodes bandingCodes                comName category
#>          <chr>        <chr>        <chr>                  <chr>    <chr>
#>  1     ostric2         COOS         <NA>         Common Ostrich  species
#>  2     ostric3         SOOS         <NA>         Somali Ostrich  species
#>  3     grerhe1         GRRH         <NA>           Greater Rhea  species
#>  4     lesrhe2         LERH         <NA>            Lesser Rhea  species
#>  5     tabtin1         TBTI         <NA> Tawny-breasted Tinamou  species
#>  6     higtin1         <NA>         HITI       Highland Tinamou  species
#>  7     hootin1         HOTI         <NA>         Hooded Tinamou  species
#>  8     grytin1         GRTI         <NA>           Gray Tinamou  species
#>  9     soltin1         SOTI         <NA>       Solitary Tinamou  species
#> 10     blatin1         BLTI         <NA>          Black Tinamou  species
#> # ... with 10,540 more rows, and 4 more variables: sciName <chr>,
#> #   sciNameCodes <chr>, taxonID <chr>, taxonOrder <dbl>
```

Search for hybrid species only


```r
ebirdtaxonomy(cat="hybrid")
#> # A tibble: 382 x 9
#>    speciesCode        comNameCodes bandingCodes
#>          <chr>               <chr>        <chr>
#>  1      x00721 WFDU,SWDU,WFWD,SPWD         <NA>
#>  2      x00775           BBWD,WIWD         <NA>
#>  3      x00875 BBWD,FUDU,FUWD,FWDU         <NA>
#>  4     sxrgoo1           ROGO,SNGO         SRGH
#>  5      x00776                GRGO         <NA>
#>  6      x00755           GWFG,BHGO         <NA>
#>  7      x00627           GWFG,SNGO         <NA>
#>  8      x00685      BRGO,SNGO,BRAN         <NA>
#>  9      x00756      BAGO,BARG,PFGO         <NA>
#> 10      x00757      BAGO,BARG,GWFG         <NA>
#> # ... with 372 more rows, and 6 more variables: comName <chr>,
#> #   category <chr>, sciName <chr>, sciNameCodes <chr>, taxonID <chr>,
#> #   taxonOrder <dbl>
```


### Check eBird region

Check if region is valid in eBird database


```r
ebirdregioncheck(loctype = 'counties', loc = 'CA-BC-GV')
#> [1] TRUE
```




### Citing

To cite `rebird` in publications use:

<br>

> Rafael Maia, Scott Chamberlain, Andy Teucher and Sebastian Pardo
  (2017). rebird: R Client for the eBird Database of Bird Observations.
  R package version 0.4.0. https://CRAN.R-project.org/package=rebird


### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rebird](https://github.com/ropensci/rebird/issues?state=open)

[Back to top](#top)
