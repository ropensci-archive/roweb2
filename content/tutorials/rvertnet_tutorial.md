---
title: rvertnet tutorial
package_version: 0.4.4
---



`rvertnet` is a client for interacting with [VertNet.org](http://vertnet.org/). VertNet is a online database of vertebrate specimens/observations. They have a really nice web interface at [http://portal.vertnet.org/search](http://portal.vertnet.org/search), but of course to do reproducible research you may want to use this package.

This package retrieves data, makes maps, and summarizes data from VertNet, with functions for searching by many parameters, including taxonomic names, places, dates, and more. In addition, there is an interface for conducting spatially delimited searches, and another for requesting large datasets via email.

<section id="installation">

## Installation

You can install the stable version from CRAN:


```r
install.packages("rvertnet")
```

Or the development version from GitHub using the `devtools` package:


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropensci/rvertnet")
```


```r
library('rvertnet')
```

<section id="usage">

## Usage

### Search by term

Search for _Aves_ in the state of _California_, limit to 10 records


```r
res <- searchbyterm(class = "Aves", state = "California", limit = 10, verbose = FALSE)
```

All major functions (`searchbyterm()`, `spatialsearch()`, `vertsearch()`) give back a `meta` (for metadata, in a list) and `data` (for data, in a data.frame) slot. The metadata:


```r
res$meta
```

```
#> $request_date
#> [1] "2016-05-02T20:23:07.377420"
#>
#> $response_records
#> [1] 10
#>
#> $request_origin
#> [1] "45.523452,-122.676207"
#>
#> $last_cursor
#> [1] "False:CpoFCuYCCr4C9wAAABn_____jIGJmo2LkZqL0o-QjYuek96WkZuah9LNz87L0s_N0s7Onv8AAP90baCgmYuMoKD_AAD_XZ6Pj5qRmJaRmv8AAP9zdG2WkZuah_8AAP9dm4ic_wAA_3N0bZuQnKCWm_8AAP9dnIqSidCdlo2b0oyPmpyWkpqRjNDKz8zPx_8AAP9zf5yKkonQnZaNm9KMj5qclpKakYzQys_Mz8f_AAD__wD-__6MgYmajYuRmovSj5CNi56T3paRm5qH0s3PzsvSz83Szs6e_wB0baCgmYuMoKD_AF2ej4-akZiWkZr_AHN0bZaRm5qH_wBdm4ic_wBzdG2bkJyglpv_AF2cipKJ0J2WjZvSjI-anJaSmpGM0MrPzM_H_wBzf5yKkonQnZaNm9KMj5qclpKakYzQys_Mz8f_AP_-EAohBN0EkB08Gxk5AAAAAOb___9IClAAWgsJiHXojJoeokwQARINRG9jdW1lbnRJbmRleBr9AShBTkQgKElTICJjdXN0b21lcl9uYW1lIiAiYXBwZW5naW5lIikgKElTICJncm91cF9uYW1lIiAic352ZXJ0bmV0LXBvcnRhbCIpIChJUyAibmFtZXNwYWNlIiAiaW5kZXgtMjAxNC0wMi0xMWEiKSAoSVMgImluZGV4X25hbWUiICJkd2MiKSAoQU5EIChRVCAiQXZlcyIgInJ0ZXh0X2NsYXNzIikgKE9SIChJUyAicmF0b21fc3RhdGVwcm92aW5jZSIgImNhbGlmb3JuaWEiKSAoUVQgIkNhbGlmb3JuaWEiICJydGV4dF9zdGF0ZXByb3ZpbmNlIikpKSk6GQoMKE4gb3JkZXJfaWQpEAEZAAAAAAAA8P9KBQgAQOgH"
#>
#> $limit
#> [1] 10
#>
#> $query_version
#> [1] "search.py 2015-08-29T21:04:44+02:00"
#>
#> $matching_records
#> [1] ">10000"
#>
#> $api_version
#> [1] "api.py 2015-09-02T11:09:38+02:00"
```

The data


```r
res$data
```

```
#> Source: local data frame [10 x 68]
#>
#>                 modified language                            accessrights
#>                    (chr)    (chr)                                   (chr)
#> 1             2015-01-06       en                                      NA
#> 2             2015-01-06       en                                      NA
#> 3  2015-05-11 07:55:08.0       en http://vertnet.org/resources/norms.html
#> 4  2015-05-11 07:55:08.0       en http://vertnet.org/resources/norms.html
#> 5  2015-08-26 13:10:07.0       en http://vertnet.org/resources/norms.html
#> 6  2015-08-26 13:10:07.0       en http://vertnet.org/resources/norms.html
#> 7  2015-08-26 13:10:07.0       en http://vertnet.org/resources/norms.html
#> 8  2015-08-26 13:10:07.0       en http://vertnet.org/resources/norms.html
#> 9  2015-08-26 13:10:07.0       en http://vertnet.org/resources/norms.html
#> 10 2015-08-26 13:10:07.0       en http://vertnet.org/resources/norms.html
#> Variables not shown: references (chr), institutionid (chr),
#>   institutioncode (chr), collectioncode (chr), basisofrecord (chr),
#>   dynamicproperties (chr), occurrenceid (chr), catalognumber (chr),
#>   recordedby (chr), individualcount (chr), sex (chr), establishmentmeans
#>   (chr), occurrencestatus (chr), preparations (chr), associatedmedia
#>   (chr), othercatalognumbers (chr), occurrenceremarks (chr), organismid
#>   (chr), previousidentifications (chr), eventdate (chr), startdayofyear
#>   (chr), enddayofyear (chr), year (chr), month (chr), day (chr),
#>   verbatimeventdate (chr), samplingprotocol (chr), highergeography (chr),
#>   continent (chr), country (chr), countrycode (chr), stateprovince (chr),
#>   county (chr), locality (chr), verbatimlocality (chr),
#>   locationaccordingto (chr), decimallatitude (chr), decimallongitude
#>   (chr), geodeticdatum (chr), coordinateuncertaintyinmeters (chr),
#>   coordinateprecision (chr), verbatimcoordinates (chr),
#>   verbatimcoordinatesystem (chr), georeferencedby (chr), georeferenceddate
#>   (chr), georeferenceprotocol (chr), georeferencesources (chr),
#>   georeferenceverificationstatus (chr), identificationqualifier (chr),
#>   identifiedby (chr), dateidentified (chr),
#>   identificationverificationstatus (chr), scientificname (chr),
#>   higherclassification (chr), kingdom (chr), phylum (chr), class (chr),
#>   order (chr), family (chr), genus (chr), specificepithet (chr),
#>   infraspecificepithet (chr), taxonrank (chr), vernacularname (chr),
#>   nomenclaturalcode (chr)
```

Search for _Mustela nigripes_ in the states of _Wyoming_ or _South Dakota_, limit to 20 records


```r
res <- searchbyterm(specificepithet = "nigripes", genus = "Mustela", state = "(wyoming OR south dakota)", limit = 20, verbose = FALSE)
res$data
```

```
#> Source: local data frame [18 x 70]
#>
#>                 modified language
#>                    (chr)    (chr)
#> 1  2010-01-14 13:06:23.0       en
#> 2  2011-11-17 12:02:57.0       en
#> 3             2013-08-07       en
#> 4  2015-04-14 15:45:27.0       en
#> 5  2015-04-17 17:39:57.0       en
#> 6  2015-08-18 10:24:17.0       en
#> 7                     NA       NA
#> 8                     NA       NA
#> 9                     NA       NA
#> 10                    NA       NA
#> 11                    NA       NA
#> 12                    NA       NA
#> 13                    NA       NA
#> 14                    NA       NA
#> 15                    NA       NA
#> 16                    NA       NA
#> 17                    NA       NA
#> 18                    NA       NA
#> Variables not shown: accessrights (chr), references (chr), institutionid
#>   (chr), institutioncode (chr), collectioncode (chr), datasetname (chr),
#>   basisofrecord (chr), dynamicproperties (chr), occurrenceid (chr),
#>   catalognumber (chr), recordedby (chr), individualcount (chr), sex (chr),
#>   establishmentmeans (chr), occurrencestatus (chr), preparations (chr),
#>   othercatalognumbers (chr), occurrenceremarks (chr), organismid (chr),
#>   previousidentifications (chr), eventdate (chr), eventtime (chr),
#>   startdayofyear (chr), enddayofyear (chr), year (chr), month (chr), day
#>   (chr), verbatimeventdate (chr), samplingprotocol (chr), eventremarks
#>   (chr), highergeography (chr), continent (chr), country (chr),
#>   countrycode (chr), stateprovince (chr), county (chr), locality (chr),
#>   verbatimlocality (chr), minimumelevationinmeters (chr),
#>   maximumelevationinmeters (chr), locationaccordingto (chr),
#>   locationremarks (chr), decimallatitude (chr), decimallongitude (chr),
#>   geodeticdatum (chr), coordinateuncertaintyinmeters (chr),
#>   verbatimcoordinates (chr), verbatimcoordinatesystem (chr),
#>   georeferencedby (chr), georeferenceddate (chr), georeferenceprotocol
#>   (chr), georeferencesources (chr), georeferenceverificationstatus (chr),
#>   identificationqualifier (chr), identifiedby (chr), dateidentified (chr),
#>   identificationverificationstatus (chr), scientificname (chr),
#>   higherclassification (chr), kingdom (chr), phylum (chr), class (chr),
#>   order (chr), family (chr), genus (chr), specificepithet (chr), taxonrank
#>   (chr), nomenclaturalcode (chr)
```

Search for class _Aves_, in the state of _Nevada_, with a coordinate uncertainty range (in meters) of less than 25 meters


```r
res <- searchbyterm(class = "Aves", stateprovince = "Nevada", error = "<25", verbose = FALSE)
res$data
```

```
#> Source: local data frame [2 x 66]
#>
#>                modified language
#>                   (chr)    (chr)
#> 1 2013-01-05 17:46:29.0       en
#> 2 2015-06-22 12:58:04.0       en
#> Variables not shown: accessrights (chr), references (chr), institutionid
#>   (chr), collectionid (chr), institutioncode (chr), collectioncode (chr),
#>   basisofrecord (chr), dynamicproperties (chr), occurrenceid (chr),
#>   catalognumber (chr), recordnumber (chr), recordedby (chr),
#>   individualcount (chr), sex (chr), establishmentmeans (chr), preparations
#>   (chr), associatedmedia (chr), othercatalognumbers (chr),
#>   occurrenceremarks (chr), organismid (chr), previousidentifications
#>   (chr), eventdate (chr), enddayofyear (chr), year (chr), month (chr), day
#>   (chr), verbatimeventdate (chr), samplingprotocol (chr), highergeography
#>   (chr), continent (chr), country (chr), stateprovince (chr), county
#>   (chr), locality (chr), verbatimlocality (chr), minimumelevationinmeters
#>   (chr), maximumelevationinmeters (chr), locationaccordingto (chr),
#>   decimallatitude (chr), decimallongitude (chr), geodeticdatum (chr),
#>   coordinateuncertaintyinmeters (chr), verbatimcoordinates (chr),
#>   verbatimcoordinatesystem (chr), georeferencedby (chr), georeferenceddate
#>   (chr), georeferenceprotocol (chr), georeferencesources (chr),
#>   georeferenceverificationstatus (chr), identificationqualifier (chr),
#>   identifiedby (chr), dateidentified (chr),
#>   identificationverificationstatus (chr), scientificname (chr),
#>   higherclassification (chr), kingdom (chr), phylum (chr), class (chr),
#>   order (chr), family (chr), genus (chr), specificepithet (chr),
#>   infraspecificepithet (chr), nomenclaturalcode (chr)
```

### Spatial search

Spatial search service allows only to search on a point defined by latitude and longitude pair, with a radius (meters) from that point. All three parameters are required.


```r
res <- spatialsearch(lat = 33.529, lon = -105.694, radius = 2000, limit = 10, verbose = FALSE)
res$data
```

```
#> Source: local data frame [10 x 69]
#>
#>                 modified language
#>                    (chr)    (chr)
#> 1  2013-09-10 12:55:00.0       en
#> 2  2013-09-10 12:55:00.0       en
#> 3  2013-09-10 12:55:00.0       en
#> 4  2014-01-14 16:04:11.0       en
#> 5  2014-06-03 17:37:34.0       en
#> 6  2014-09-09 14:04:14.0       en
#> 7  2014-09-09 14:04:14.0       en
#> 8  2015-08-03 19:48:08.0       en
#> 9  2015-09-08 00:33:35.0       en
#> 10                    NA       en
#> Variables not shown: accessrights (chr), references (chr), institutionid
#>   (chr), collectionid (chr), institutioncode (chr), collectioncode (chr),
#>   datasetname (chr), basisofrecord (chr), dynamicproperties (chr),
#>   occurrenceid (chr), catalognumber (chr), recordnumber (chr), recordedby
#>   (chr), individualcount (chr), sex (chr), establishmentmeans (chr),
#>   occurrencestatus (chr), preparations (chr), othercatalognumbers (chr),
#>   occurrenceremarks (chr), organismid (chr), previousidentifications
#>   (chr), eventdate (chr), startdayofyear (chr), enddayofyear (chr), year
#>   (chr), month (chr), day (chr), verbatimeventdate (chr), highergeography
#>   (chr), continent (chr), country (chr), countrycode (chr), stateprovince
#>   (chr), county (chr), locality (chr), verbatimlocality (chr),
#>   minimumelevationinmeters (chr), maximumelevationinmeters (chr),
#>   locationaccordingto (chr), decimallatitude (chr), decimallongitude
#>   (chr), geodeticdatum (chr), coordinateuncertaintyinmeters (chr),
#>   verbatimcoordinates (chr), verbatimcoordinatesystem (chr),
#>   georeferencedby (chr), georeferenceddate (chr), georeferenceprotocol
#>   (chr), georeferencesources (chr), georeferenceverificationstatus (chr),
#>   identificationqualifier (chr), identifiedby (chr), dateidentified (chr),
#>   identificationverificationstatus (chr), scientificname (chr),
#>   higherclassification (chr), kingdom (chr), phylum (chr), class (chr),
#>   order (chr), family (chr), genus (chr), specificepithet (chr),
#>   infraspecificepithet (chr), taxonrank (chr), nomenclaturalcode (chr)
```

### Global full text search

`vertsearch()` provides a simple full text search against all fields. For more info see [the docs](https://github.com/VertNet/webapp/wiki/The-API-search-function#global-full-text-search). An example:


```r
res <- vertsearch(taxon = "aves", state = "california", limit = 10)
res$data
```

```
#> Source: local data frame [10 x 57]
#>
#>      modified language                            accessrights
#>         (chr)    (chr)                                   (chr)
#> 1  2015-01-06       en                                      NA
#> 2  2015-01-06       en                                      NA
#> 3  2015-10-13       en http://vertnet.org/resources/norms.html
#> 4  2015-10-13       en http://vertnet.org/resources/norms.html
#> 5  2015-10-13       en http://vertnet.org/resources/norms.html
#> 6  2015-10-13       en http://vertnet.org/resources/norms.html
#> 7  2015-10-13       en http://vertnet.org/resources/norms.html
#> 8  2015-10-13       en http://vertnet.org/resources/norms.html
#> 9  2015-10-13       en http://vertnet.org/resources/norms.html
#> 10 2015-10-13       en http://vertnet.org/resources/norms.html
#> Variables not shown: references (chr), institutionid (chr),
#>   institutioncode (chr), collectioncode (chr), basisofrecord (chr),
#>   dynamicproperties (chr), occurrenceid (chr), catalognumber (chr),
#>   recordedby (chr), sex (chr), establishmentmeans (chr), occurrencestatus
#>   (chr), preparations (chr), othercatalognumbers (chr), occurrenceremarks
#>   (chr), eventdate (chr), startdayofyear (chr), enddayofyear (chr), year
#>   (chr), month (chr), day (chr), verbatimeventdate (chr), highergeography
#>   (chr), continent (chr), country (chr), countrycode (chr), stateprovince
#>   (chr), county (chr), locality (chr), verbatimlocality (chr),
#>   decimallatitude (chr), decimallongitude (chr), geodeticdatum (chr),
#>   coordinateuncertaintyinmeters (chr), coordinateprecision (chr),
#>   georeferencedby (chr), georeferenceddate (chr), georeferenceprotocol
#>   (chr), georeferencesources (chr), georeferenceverificationstatus (chr),
#>   georeferenceremarks (chr), scientificname (chr), higherclassification
#>   (chr), kingdom (chr), phylum (chr), class (chr), order (chr), family
#>   (chr), genus (chr), specificepithet (chr), infraspecificepithet (chr),
#>   taxonrank (chr), vernacularname (chr), nomenclaturalcode (chr)
```

Limit the number of records returned (under 1000)


```r
res <- vertsearch("(kansas state OR KSU)", limit = 200)
res$data
```

```
#> Source: local data frame [200 x 76]
#>
#>              modified language
#>                 (chr)    (chr)
#> 1  2008-09-03 0:00:00       en
#> 2  2008-09-03 0:00:00       en
#> 3  2008-09-03 0:00:00       en
#> 4  2008-09-03 0:00:00       en
#> 5  2008-09-03 0:00:00       en
#> 6  2008-09-03 0:00:00       en
#> 7  2008-09-03 0:00:00       en
#> 8  2008-09-03 0:00:00       en
#> 9  2008-09-03 0:00:00       en
#> 10 2008-09-03 0:00:00       en
#> ..                ...      ...
#> Variables not shown: accessrights (chr), bibliographiccitation (chr),
#>   references (chr), institutionid (chr), collectionid (chr),
#>   institutioncode (chr), collectioncode (chr), datasetname (chr),
#>   basisofrecord (chr), dynamicproperties (chr), occurrenceid (chr),
#>   catalognumber (chr), recordnumber (chr), recordedby (chr),
#>   individualcount (chr), sex (chr), lifestage (chr), establishmentmeans
#>   (chr), occurrencestatus (chr), preparations (chr), othercatalognumbers
#>   (chr), occurrenceremarks (chr), organismid (chr),
#>   previousidentifications (chr), fieldnumber (chr), eventdate (chr),
#>   startdayofyear (chr), enddayofyear (chr), year (chr), month (chr), day
#>   (chr), verbatimeventdate (chr), samplingprotocol (chr), highergeography
#>   (chr), continent (chr), country (chr), countrycode (chr), stateprovince
#>   (chr), county (chr), locality (chr), verbatimlocality (chr),
#>   minimumelevationinmeters (chr), maximumelevationinmeters (chr),
#>   verbatimelevation (chr), locationaccordingto (chr), decimallatitude
#>   (chr), decimallongitude (chr), geodeticdatum (chr),
#>   coordinateuncertaintyinmeters (chr), verbatimcoordinates (chr),
#>   verbatimlatitude (chr), verbatimcoordinatesystem (chr), georeferencedby
#>   (chr), georeferenceddate (chr), georeferenceprotocol (chr),
#>   georeferencesources (chr), georeferenceverificationstatus (chr),
#>   georeferenceremarks (chr), identificationqualifier (chr), identifiedby
#>   (chr), dateidentified (chr), identificationverificationstatus (chr),
#>   scientificname (chr), higherclassification (chr), kingdom (chr), phylum
#>   (chr), class (chr), order (chr), family (chr), genus (chr),
#>   specificepithet (chr), infraspecificepithet (chr), taxonrank (chr),
#>   nomenclaturalcode (chr)
```

Pass output of `vertsearch()` to a map


```r
out <- vertsearch(tax = "(mustela nivalis OR mustela erminea)")
vertmap(out)
```

![plot of chunk unnamed-chunk-13](../assets/tutorial-images/rvertnet/unnamed-chunk-13-1.png)

### Lots of data

For `searchbyterm()`, `spatialsearch()`, and `vertsearch()`, you can request more than 1000 records. VertNet limits each request to 1000 records, but internally in this package, if you request more than 1000 records, we'll continue to send requests to get all the records you want. See the [VertNet docs](https://github.com/VertNet/webapp/wiki/The-API-search-function#retrieving-large-result-sets) for more information on this.

### Email dump of data

`bigsearch()` specifies a termwise search (like `searchbyterm()`), but requests that all available records be made available for download as a tab-delimited text file.


```r
bigsearch(genus = "ochotona", rfile = "mydata", email = "you@gmail.com")
#> Processing request...
#>
#> Download of records file 'mydata' requested for 'you@gmail.com'
#>
#> Query/URL: "http://api.vertnet-portal.appspot.com/api/download?q=%7B%22q%22:%22genus:ochotona%22,%22n%22:%22mydata%22,%22e%22:%22you@gmail.com%22%7D"
#>
#> Thank you! Download instructions will be sent by email.
```

### Messages

In the previous examples, we've suppressed messages for more concise output, but you can set `verbose=TRUE` to get helpful messages - `verbose=TRUE` is also the default setting so if you don't specify that parameter messages will be printed to the console.


```r
res <- searchbyterm(class = "Aves", state = "California", limit = 10, verbose = TRUE)
```

<section id="citing">

## Citing

To cite `rvertnet` in publications use:

<br>

>  Scott Chamberlain, Chris Ray and Vijay Barve (2016). rvertnet: Search
  VertNet, a Database of Vertebrate Specimen Records. R package version
  0.4.4. https://github.com/ropensci/rvertnet

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rvertnet](https://github.com/ropensci/rvertnet/issues?state=open)

[Back to top](#top)
