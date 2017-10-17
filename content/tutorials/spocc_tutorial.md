---
title: spocc tutorial
package_version: 0.7.0
---




### Installation

Stable version from CRAN


```r
install.packages("spocc")
```

Or dev version from GitHub


```r
if (!require("devtools")) install.packages("devtools")
install_github("ropensci/spocc")
```


```r
library('spocc')
```



## Usage

### Data retrieval

The most significant function in spocc is the `occ` (short for occurrence) function. `occ` takes a query, often a species name, and searches across all data sources specified in the `from` argument. For example, one can search for all occurrences of [Sharp-shinned Hawks](http://www.allaboutbirds.org/guide/sharp-shinned_hawk/id) (_Accipiter striatus_) from the GBIF database with the following R call.


```r
library('spocc')
(df <- occ(query = 'Accipiter striatus', from = 'gbif'))
```

```
#> Searched: gbif
#> Occurrences - Found: 618,207, Returned: 500
#> Search type: Scientific
#>   gbif: Accipiter striatus (500)
```

The data returned are part of a `S3` class called `occdat`. This class has slots for each of the data sources described above. One can easily switch the source by changing the `from` parameter in the function call above.

Within each data source is the set of species queried. In the above example, we only asked for occurrence data for one species, but we could have asked for any number. Let's say we asked for data for two species: _Accipiter striatus_, and _Pinus contorta_. Then the structure of the response would be

```
response -- |
            | -- gbif ------- |
                              | -- Accipiter_striatus
                              | -- Pinus_contorta

            | -- ecoengine -- |
                              | -- Accipiter_striatus
                              | -- Pinus_contorta

            ... and so on for each data source

```

If you only request data from gbif, like `from = 'gbif'`, then the other four source slots are present in the response object, but have no data.

You can quickly get just the GBIF data by indexing to it, like


```r
df$gbif
```

```
#> Species [Accipiter striatus (500)] 
#> First 10 rows of [Accipiter_striatus]
#> 
#> # A tibble: 500 x 106
#>                  name  longitude latitude  prov         issues        key
#>                 <chr>      <dbl>    <dbl> <chr>          <chr>      <int>
#>  1 Accipiter striatus -105.14459 39.91499  gbif cdround,gass84 1572375879
#>  2 Accipiter striatus  -77.41813 39.49461  gbif cdround,gass84 1453332084
#>  3 Accipiter striatus -122.05344 36.95316  gbif cdround,gass84 1453346783
#>  4 Accipiter striatus  -96.84084 33.13948  gbif cdround,gass84 1562918951
#>  5 Accipiter striatus  -83.06435 42.27640  gbif cdround,gass84 1453374806
#>  6 Accipiter striatus  -93.60027 42.13699  gbif cdround,gass84 1453347396
#>  7 Accipiter striatus  -96.94657 32.83480  gbif cdround,gass84 1453372191
#>  8 Accipiter striatus  -99.14944 19.34328  gbif cdround,gass84 1453336277
#>  9 Accipiter striatus         NA       NA  gbif                1453348280
#> 10 Accipiter striatus  -79.33628 43.60350  gbif cdround,gass84 1453387327
#> # ... with 490 more rows, and 100 more variables: datasetKey <chr>,
#> #   publishingOrgKey <chr>, publishingCountry <chr>, protocol <chr>,
#> #   lastCrawled <chr>, lastParsed <chr>, crawlId <int>,
#> #   basisOfRecord <chr>, taxonKey <int>, kingdomKey <int>,
#> #   phylumKey <int>, classKey <int>, orderKey <int>, familyKey <int>,
#> #   genusKey <int>, scientificName <chr>, kingdom <chr>, phylum <chr>,
#> #   order <chr>, family <chr>, genus <chr>, genericName <chr>,
#> #   specificEpithet <chr>, taxonRank <chr>, dateIdentified <chr>,
#> #   coordinateUncertaintyInMeters <dbl>, year <int>, month <int>,
#> #   day <int>, eventDate <date>, modified <chr>, lastInterpreted <chr>,
#> #   references <chr>, license <chr>, geodeticDatum <chr>, class <chr>,
#> #   countryCode <chr>, country <chr>, rightsHolder <chr>,
#> #   identifier <chr>, informationWithheld <chr>, verbatimEventDate <chr>,
#> #   datasetName <chr>, verbatimLocality <chr>, gbifID <chr>,
#> #   collectionCode <chr>, occurrenceID <chr>, taxonID <chr>,
#> #   catalogNumber <chr>, recordedBy <chr>,
#> #   `http://unknown.org/occurrenceDetails` <chr>, institutionCode <chr>,
#> #   rights <chr>, eventTime <chr>, occurrenceRemarks <chr>,
#> #   identificationID <chr>, identificationRemarks <chr>, locality <chr>,
#> #   individualCount <int>, elevation <dbl>, elevationAccuracy <dbl>,
#> #   continent <chr>, stateProvince <chr>, institutionID <chr>,
#> #   county <chr>, identificationVerificationStatus <chr>, language <chr>,
#> #   type <chr>, locationAccordingTo <chr>, preparations <chr>,
#> #   identifiedBy <chr>, georeferencedDate <chr>, nomenclaturalCode <chr>,
#> #   higherGeography <chr>, georeferencedBy <chr>,
#> #   georeferenceProtocol <chr>, georeferenceVerificationStatus <chr>,
#> #   endDayOfYear <chr>, verbatimCoordinateSystem <chr>,
#> #   otherCatalogNumbers <chr>, organismID <chr>,
#> #   previousIdentifications <chr>, identificationQualifier <chr>,
#> #   samplingProtocol <chr>, accessRights <chr>,
#> #   higherClassification <chr>, georeferenceSources <chr>,
#> #   infraspecificEpithet <chr>, recordNumber <chr>,
#> #   ownerInstitutionCode <chr>, startDayOfYear <chr>, datasetID <chr>,
#> #   verbatimElevation <chr>, collectionID <chr>, sex <chr>,
#> #   dynamicProperties <chr>, lifeStage <chr>, vernacularName <chr>,
#> #   reproductiveCondition <chr>, locationRemarks <chr>
```

When you get data from multiple providers, the fields returned are slightly different, e.g.:


```r
df <- occ(query = 'Accipiter striatus', from = c('gbif', 'ecoengine'), limit = 25)
head(df$gbif$data$Accipiter_striatus)[1:6,1:10]
```

```
#> # A tibble: 6 x 10
#>                 name  longitude latitude         issues  prov        key
#>                <chr>      <dbl>    <dbl>          <chr> <chr>      <int>
#> 1 Accipiter striatus -105.14459 39.91499 cdround,gass84  gbif 1572375879
#> 2 Accipiter striatus  -77.41813 39.49461 cdround,gass84  gbif 1453332084
#> 3 Accipiter striatus -122.05344 36.95316 cdround,gass84  gbif 1453346783
#> 4 Accipiter striatus  -96.84084 33.13948 cdround,gass84  gbif 1562918951
#> 5 Accipiter striatus  -83.06435 42.27640 cdround,gass84  gbif 1453374806
#> 6 Accipiter striatus  -93.60027 42.13699 cdround,gass84  gbif 1453347396
#> # ... with 4 more variables: datasetKey <chr>, publishingOrgKey <chr>,
#> #   publishingCountry <chr>, protocol <chr>
```

```r
head(df$ecoengine$data$Accipiter_striatus)
```

```
#> # A tibble: 6 x 17
#>   longitude latitude
#>       <dbl>    <dbl>
#> 1 -118.8567  39.4120
#> 2 -115.7112  40.1013
#> 3 -115.7112  40.1013
#> 4 -114.4585  32.8861
#> 5 -114.8859  39.9005
#> 6 -115.0657  36.1750
#> # ... with 15 more variables: url <chr>, key <chr>,
#> #   observation_type <chr>, name <chr>, country <chr>,
#> #   state_province <chr>, begin_date <date>, end_date <chr>, source <chr>,
#> #   remote_resource <chr>, locality <chr>,
#> #   coordinate_uncertainty_in_meters <int>, recorded_by <chr>,
#> #   last_modified <chr>, prov <chr>
```

We provide a function `occ2df` that pulls out a few key columns needed for making maps:


```r
head(occ2df(df))
```

```
#> # A tibble: 6 x 6
#>                 name  longitude latitude  prov       date        key
#>                <chr>      <dbl>    <dbl> <chr>     <date>      <chr>
#> 1 Accipiter striatus -105.14459 39.91499  gbif 2017-01-04 1572375879
#> 2 Accipiter striatus  -77.41813 39.49461  gbif 2017-01-05 1453332084
#> 3 Accipiter striatus -122.05344 36.95316  gbif 2017-01-11 1453346783
#> 4 Accipiter striatus  -96.84084 33.13948  gbif 2017-01-26 1562918951
#> 5 Accipiter striatus  -83.06435 42.27640  gbif 2017-01-23 1453374806
#> 6 Accipiter striatus  -93.60027 42.13699  gbif 2017-01-11 1453347396
```


### Fix names

One problem you often run in to is that there can be various names for the same taxon in any one source. For example:


```r
df <- occ(query = 'Pinus contorta', from = c('gbif', 'ecoengine'), limit = 50)
head(df$gbif$data$Pinus_contorta)[1:6, 1:5]
```

```
#> # A tibble: 6 x 5
#>             name  longitude latitude               issues  prov
#>            <chr>      <dbl>    <dbl>                <chr> <chr>
#> 1 Pinus contorta -135.34804 57.05074       cdround,gass84  gbif
#> 2 Pinus contorta   17.56537 59.84456 cdround,gass84,rdatm  gbif
#> 3 Pinus contorta   17.56467 59.84493 cdround,gass84,rdatm  gbif
#> 4 Pinus contorta   12.39827 59.59845         gass84,rdatm  gbif
#> 5 Pinus contorta -123.99101 46.22554       cdround,gass84  gbif
#> 6 Pinus contorta   17.56458 59.84525 cdround,gass84,rdatm  gbif
```

```r
head(df$ecoengine$data$Pinus_contorta)[1:6, 1:5]
```

```
#> # A tibble: 6 x 5
#>   longitude latitude
#>       <dbl>    <dbl>
#> 1 -119.7976  38.5184
#> 2 -120.2007  38.8368
#> 3 -119.4928  38.1013
#> 4 -119.4500  38.0337
#> 5 -118.7309  36.6564
#> 6 -122.4149  37.5497
#> # ... with 3 more variables: url <chr>, key <chr>, observation_type <chr>
```

This is fine, but when trying to make a map in which points are colored for each taxon, you can have many colors for a single taxon, where instead one color per taxon is more appropriate. There is a function in `spocc` called `fixnames`, which has a few options in which you can take the shortest names (usually just the plain binomials like _Homo sapiens_), or the original name queried, or a vector of names supplied by the user.


```r
df <- fixnames(df, how = 'shortest')
head(df$gbif$data$Pinus_contorta[,1:2])
```

```
#> # A tibble: 6 x 2
#>             name  longitude
#>            <chr>      <dbl>
#> 1 Pinus contorta -135.34804
#> 2 Pinus contorta   17.56537
#> 3 Pinus contorta   17.56467
#> 4 Pinus contorta   12.39827
#> 5 Pinus contorta -123.99101
#> 6 Pinus contorta   17.56458
```

```r
head(df$ecoengine$data$Pinus_contorta[,1:2])
```

```
#> # A tibble: 6 x 2
#>   longitude latitude
#>       <dbl>    <dbl>
#> 1 -119.7976  38.5184
#> 2 -120.2007  38.8368
#> 3 -119.4928  38.1013
#> 4 -119.4500  38.0337
#> 5 -118.7309  36.6564
#> 6 -122.4149  37.5497
```

```r
df_comb <- occ2df(df)
head(df_comb); tail(df_comb)
```

```
#> # A tibble: 6 x 6
#>             name  longitude latitude  prov       date        key
#>            <chr>      <dbl>    <dbl> <chr>     <date>      <chr>
#> 1 Pinus contorta -135.34804 57.05074  gbif 2017-01-12 1453348580
#> 2 Pinus contorta   17.56537 59.84456  gbif 2017-01-04 1433800465
#> 3 Pinus contorta   17.56467 59.84493  gbif 2017-01-25 1434022908
#> 4 Pinus contorta   12.39827 59.59845  gbif 2017-01-03 1433805430
#> 5 Pinus contorta -123.99101 46.22554  gbif 2017-01-16 1453371064
#> 6 Pinus contorta   17.56458 59.84525  gbif 2017-01-07 1433834252
```

```
#> # A tibble: 6 x 6
#>             name longitude latitude      prov   date               key
#>            <chr>     <dbl>    <dbl>     <chr> <date>             <chr>
#> 1 Pinus contorta -119.4928  38.1013 ecoengine     NA  vtm:plot:71E15:7
#> 2 Pinus contorta -119.4246  37.8488 ecoengine     NA vtm:plot:76B115:3
#> 3 Pinus contorta -119.3799  37.8051 ecoengine     NA  vtm:plot:76C24:3
#> 4 Pinus contorta -119.3634  37.7275 ecoengine     NA  vtm:plot:76D27:4
#> 5 Pinus contorta -123.7772  39.4155 ecoengine     NA         POM213040
#> 6 Pinus contorta -121.4035  40.4450 ecoengine     NA      CAS:DS:40775
```

### Clean data

All data cleaning functionality is in a new package [scrubr](https://github.com/ropenscilabs/scrubr). [On CRAN](https://cran.r-project.org/package=scrubr).

### Make maps

All mapping functionality is now in a separate package [mapr](https://github.com/ropensci/mapr) (formerly known as `spoccutils`), to make `spocc` easier to maintain. [On CRAN](https://cran.r-project.org/package=mapr).




### Citing

To cite `spocc` in publications use:

<br>

> Scott Chamberlain (2017). spocc: Interface to Species Occurrence Data
  Sources. R package version 0.7.0.
  https://CRAN.R-project.org/package=spocc



### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for spocc](https://github.com/ropensci/spocc/issues?state=open)

[Back to top](#top)
