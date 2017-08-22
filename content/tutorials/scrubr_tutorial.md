---
title: scrubr tutorial
package_version: 0.1.1
---



`scrubr` is a general purpose toolbox for cleaning biological occurrence records. Think
of it like `dplyr` but specifically for occurrence data. It includes functionality for
cleaning based on various aspects of spatial coordinates, unlikely values due to political
centroids, taxonomic names, and more.

<section id="installation">

## Installation

Stable `scrubr` version from CRAN


```r
install.packages("scrubr")
```

Or, the development version from Github


```r
devtools::install_github("ropenscilabs/scrubr")
```


```r
library("scrubr")
```

<section id="usage">

## Usage

We'll use sample datasets included with the package, they are lazy loaded,
and available via `sample_data_1` and `sample_data_2`

### data.frame's

All functions expect data.frame's as input, and output data.frame's

### Pipe vs. no pipe

We think that using a piping workflow with `%>%` makes code easier to
build up, and easier to understand. However, in some examples below we provide
commented out examples without the pipe to demonstrate traditional usage - which
you can use if you remove the comment `#` at beginning of the line.

### dframe

`dframe()` is a utility function to create a compact data.frame representation. You
don't have to use it. If you do, you can work with `scrubr` functions with a compact
data.frame, making it easier to see the data quickly. If you don't use `dframe()`
we just use your regular data.frame. Problem is with large data.frame's you deal with
lots of stuff printed to the screen, making it hard to quickly wrangle data.

### Coordinate based cleaning

Remove impossible coordinates (using sample data included in the pkg)


```r
# coord_impossible(dframe(sample_data_1)) # w/o pipe
dframe(sample_data_1) %>% coord_impossible()
#> <scrubr dframe>
#> Size: 1500 X 5
#> Lat/Lon vars: latitude/longitude
#>
#>                name  longitude latitude                date        key
#>               (chr)      (dbl)    (dbl)              (time)      (int)
#> 1  Ursus americanus  -79.68283 38.36662 2015-01-14 16:36:45 1065590124
#> 2  Ursus americanus  -82.42028 35.73304 2015-01-13 00:25:39 1065588899
#> 3  Ursus americanus  -99.09625 23.66893 2015-02-20 23:00:00 1098894889
#> 4  Ursus americanus  -72.77432 43.94883 2015-02-13 16:16:41 1065611122
#> 5  Ursus americanus  -72.34617 43.86464 2015-03-01 20:20:45 1088908315
#> 6  Ursus americanus -108.53674 32.65219 2015-03-29 17:06:54 1088932238
#> 7  Ursus americanus -108.53691 32.65237 2015-03-29 17:12:50 1088932273
#> 8  Ursus americanus -123.82900 40.13240 2015-03-28 23:00:00 1132403409
#> 9  Ursus americanus  -78.25027 36.93018 2015-03-20 21:11:24 1088923534
#> 10 Ursus americanus  -76.78671 35.53079 2015-04-05 23:00:00 1088954559
#> ..              ...        ...      ...                 ...        ...
```

Remove incomplete coordinates


```r
# coord_incomplete(dframe(sample_data_1)) # w/o pipe
dframe(sample_data_1) %>% coord_incomplete()
#> <scrubr dframe>
#> Size: 1306 X 5
#> Lat/Lon vars: latitude/longitude
#>
#>                name  longitude latitude                date        key
#>               (chr)      (dbl)    (dbl)              (time)      (int)
#> 1  Ursus americanus  -79.68283 38.36662 2015-01-14 16:36:45 1065590124
#> 2  Ursus americanus  -82.42028 35.73304 2015-01-13 00:25:39 1065588899
#> 3  Ursus americanus  -99.09625 23.66893 2015-02-20 23:00:00 1098894889
#> 4  Ursus americanus  -72.77432 43.94883 2015-02-13 16:16:41 1065611122
#> 5  Ursus americanus  -72.34617 43.86464 2015-03-01 20:20:45 1088908315
#> 6  Ursus americanus -108.53674 32.65219 2015-03-29 17:06:54 1088932238
#> 7  Ursus americanus -108.53691 32.65237 2015-03-29 17:12:50 1088932273
#> 8  Ursus americanus -123.82900 40.13240 2015-03-28 23:00:00 1132403409
#> 9  Ursus americanus  -78.25027 36.93018 2015-03-20 21:11:24 1088923534
#> 10 Ursus americanus  -76.78671 35.53079 2015-04-05 23:00:00 1088954559
#> ..              ...        ...      ...                 ...        ...
```

Remove unlikely coordinates (e.g., those at 0,0)


```r
# coord_unlikely(dframe(sample_data_1)) # w/o pipe
dframe(sample_data_1) %>% coord_unlikely()
#> <scrubr dframe>
#> Size: 1488 X 5
#> Lat/Lon vars: latitude/longitude
#>
#>                name  longitude latitude                date        key
#>               (chr)      (dbl)    (dbl)              (time)      (int)
#> 1  Ursus americanus  -79.68283 38.36662 2015-01-14 16:36:45 1065590124
#> 2  Ursus americanus  -82.42028 35.73304 2015-01-13 00:25:39 1065588899
#> 3  Ursus americanus  -99.09625 23.66893 2015-02-20 23:00:00 1098894889
#> 4  Ursus americanus  -72.77432 43.94883 2015-02-13 16:16:41 1065611122
#> 5  Ursus americanus  -72.34617 43.86464 2015-03-01 20:20:45 1088908315
#> 6  Ursus americanus -108.53674 32.65219 2015-03-29 17:06:54 1088932238
#> 7  Ursus americanus -108.53691 32.65237 2015-03-29 17:12:50 1088932273
#> 8  Ursus americanus -123.82900 40.13240 2015-03-28 23:00:00 1132403409
#> 9  Ursus americanus  -78.25027 36.93018 2015-03-20 21:11:24 1088923534
#> 10 Ursus americanus  -76.78671 35.53079 2015-04-05 23:00:00 1088954559
#> ..              ...        ...      ...                 ...        ...
```

Do all three


```r
dframe(sample_data_1) %>%
  coord_impossible() %>%
  coord_incomplete() %>%
  coord_unlikely()
#> <scrubr dframe>
#> Size: 1294 X 5
#> Lat/Lon vars: latitude/longitude
#>
#>                name  longitude latitude                date        key
#>               (chr)      (dbl)    (dbl)              (time)      (int)
#> 1  Ursus americanus  -79.68283 38.36662 2015-01-14 16:36:45 1065590124
#> 2  Ursus americanus  -82.42028 35.73304 2015-01-13 00:25:39 1065588899
#> 3  Ursus americanus  -99.09625 23.66893 2015-02-20 23:00:00 1098894889
#> 4  Ursus americanus  -72.77432 43.94883 2015-02-13 16:16:41 1065611122
#> 5  Ursus americanus  -72.34617 43.86464 2015-03-01 20:20:45 1088908315
#> 6  Ursus americanus -108.53674 32.65219 2015-03-29 17:06:54 1088932238
#> 7  Ursus americanus -108.53691 32.65237 2015-03-29 17:12:50 1088932273
#> 8  Ursus americanus -123.82900 40.13240 2015-03-28 23:00:00 1132403409
#> 9  Ursus americanus  -78.25027 36.93018 2015-03-20 21:11:24 1088923534
#> 10 Ursus americanus  -76.78671 35.53079 2015-04-05 23:00:00 1088954559
#> ..              ...        ...      ...                 ...        ...
```

Don't drop bad data


```r
dframe(sample_data_1) %>% coord_incomplete(drop = TRUE) %>% NROW
#> [1] 1306
dframe(sample_data_1) %>% coord_incomplete(drop = FALSE) %>% NROW
#> [1] 1500
```

### Deduplicate


```r
smalldf <- sample_data_1[1:20, ]
# create a duplicate record
smalldf <- rbind(smalldf, smalldf[10,])
row.names(smalldf) <- NULL
# make it slightly different
smalldf[21, "key"] <- 1088954555
NROW(smalldf)
#> [1] 21
dp <- dframe(smalldf) %>% dedup()
NROW(dp)
#> [1] 20
attr(dp, "dups")
#> <scrubr dframe>
#> Size: 1 X 5
#>
#>
#>               name longitude latitude                date        key
#>              (chr)     (dbl)    (dbl)              (time)      (dbl)
#> 1 Ursus americanus -76.78671 35.53079 2015-04-05 23:00:00 1088954555
```

### Dates

Standardize/convert dates


```r
# date_standardize(dframe(df), "%d%b%Y") # w/o pipe
dframe(sample_data_1) %>% date_standardize("%d%b%Y")
#> <scrubr dframe>
#> Size: 1500 X 5
#>
#>
#>                name  longitude latitude      date        key
#>               (chr)      (dbl)    (dbl)     (chr)      (int)
#> 1  Ursus americanus  -79.68283 38.36662 14Jan2015 1065590124
#> 2  Ursus americanus  -82.42028 35.73304 13Jan2015 1065588899
#> 3  Ursus americanus  -99.09625 23.66893 20Feb2015 1098894889
#> 4  Ursus americanus  -72.77432 43.94883 13Feb2015 1065611122
#> 5  Ursus americanus  -72.34617 43.86464 01Mar2015 1088908315
#> 6  Ursus americanus -108.53674 32.65219 29Mar2015 1088932238
#> 7  Ursus americanus -108.53691 32.65237 29Mar2015 1088932273
#> 8  Ursus americanus -123.82900 40.13240 28Mar2015 1132403409
#> 9  Ursus americanus  -78.25027 36.93018 20Mar2015 1088923534
#> 10 Ursus americanus  -76.78671 35.53079 05Apr2015 1088954559
#> ..              ...        ...      ...       ...        ...
```

Drop records without dates


```r
NROW(sample_data_1)
#> [1] 1500
NROW(dframe(sample_data_1) %>% date_missing())
#> [1] 1498
```

Create date field from other fields


```r
dframe(sample_data_2) %>% date_create(year, month, day)
#> <scrubr dframe>
#> Size: 1500 X 8
#>
#>
#>                name  longitude latitude        key  year month   day
#>               (chr)      (dbl)    (dbl)      (int) (chr) (chr) (chr)
#> 1  Ursus americanus  -79.68283 38.36662 1065590124  2015    01    14
#> 2  Ursus americanus  -82.42028 35.73304 1065588899  2015    01    13
#> 3  Ursus americanus  -99.09625 23.66893 1098894889  2015    02    20
#> 4  Ursus americanus  -72.77432 43.94883 1065611122  2015    02    13
#> 5  Ursus americanus  -72.34617 43.86464 1088908315  2015    03    01
#> 6  Ursus americanus -108.53674 32.65219 1088932238  2015    03    29
#> 7  Ursus americanus -108.53691 32.65237 1088932273  2015    03    29
#> 8  Ursus americanus -123.82900 40.13240 1132403409  2015    03    28
#> 9  Ursus americanus  -78.25027 36.93018 1088923534  2015    03    20
#> 10 Ursus americanus  -76.78671 35.53079 1088954559  2015    04    05
#> ..              ...        ...      ...        ...   ...   ...   ...
#> Variables not shown: date (chr).
```

### Taxonomy

Only one function exists for taxonomy cleaning, it removes rows where taxonomic names are
either missing an epithet, or are missing altogether  (`NA` or `NULL`).

Get some data from GBIF, via `rgbif`


```r
if (requireNamespace("rgbif", quietly = TRUE)) {
  library("rgbif")
  res <- occ_data(limit = 500)$data
} else {
  res <- sample_data_3
}
```

Clean names


```r
NROW(res)
#> [1] 500
df <- dframe(res) %>% tax_no_epithet(name = "name")
NROW(df)
#> [1] 491
attr(df, "name_var")
#> [1] "name"
attr(df, "tax_no_epithet")
#> <scrubr dframe>
#> Size: 9 X 84
#>
#> Name var: name
#>
#>    name        key decimalLatitude decimalLongitude                 issues
#>   (chr)      (int)           (dbl)            (dbl)                  (chr)
#> 1    NA 1229610708        37.47745       -122.44916 cdround,gass84,txmathi
#> 2    NA 1229923713        18.05448        -94.56778 cdround,gass84,txmathi
#> 3    NA 1229924474        20.37596        -87.02133 cdround,gass84,txmathi
#> 4    NA 1229958769        36.56859          4.65108         gass84,txmathi
#> 5    NA 1233341625        49.62000          6.17000    cudc,gass84,txmathi
#> 6    NA 1233596791        37.44656       -121.84897         cdround,gass84
#> 7    NA 1233600219       -39.09949        176.82023         cdround,gass84
#> 8    NA 1233601883        41.83392        -87.82779 cdround,gass84,txmathi
#> 9    NA 1227767809        35.10459        -85.33387 cdround,gass84,txmathi
#> Variables not shown: datasetKey (chr), publishingOrgKey (chr),
#>   publishingCountry (chr), protocol (chr), lastCrawled (chr), lastParsed
#>   (chr), basisOfRecord (chr), individualCount (int), sex (chr), taxonKey
#>   (int), kingdomKey (int), phylumKey (int), classKey (int), orderKey
#>   (int), familyKey (int), genusKey (int), scientificName (chr), kingdom
#>   (chr), phylum (chr), order (chr), family (chr), genus (chr), genericName
#>   (chr), specificEpithet (chr), taxonRank (chr), continent (chr),
#>   stateProvince (chr), year (int), month (int), day (int), eventDate
#>   (chr), modified (chr), lastInterpreted (chr), references (chr),
#>   geodeticDatum (chr), class (chr), countryCode (chr), country (chr),
#>   rightsHolder (chr), identifier (chr), institutionID (chr), datasetName
#>   (chr), locality (chr), county (chr), fieldNumber (chr), collectionCode
#>   (chr), gbifID (chr), language (chr), occurrenceID (chr), type (chr),
#>   catalogNumber (chr), disposition (chr), institutionCode (chr), rights
#>   (chr), ownerInstitutionCode (chr), datasetID (chr), occurrenceRemarks
#>   (chr), bibliographicCitation (chr), georeferenceSources (chr),
#>   dateIdentified (chr), coordinateUncertaintyInMeters (dbl),
#>   verbatimEventDate (chr), taxonID (chr), license (chr), recordedBy (chr),
#>   http://unknown.org/occurrenceDetails (chr), eventTime (chr),
#>   identificationID (chr), verbatimLocality (chr), informationWithheld
#>   (chr), infraspecificEpithet (chr), elevation (dbl), elevationAccuracy
#>   (dbl), depth (dbl), depthAccuracy (dbl), waterBody (chr),
#>   samplingProtocol (chr), nameAccordingTo (chr), identifiedBy (chr).
```


<section id="citing">

## Citing

To cite `scrubr` in publications use:

<br>

> Scott Chamberlain (2016). scrubr: Clean Biological Occurrence Records. R package version 0.1.1.
https://github.com/ropenscilabs/scrubr

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for scrubr](https://github.com/ropenscilabs/scrubr/issues?state=open)

[Back to top](#top)
