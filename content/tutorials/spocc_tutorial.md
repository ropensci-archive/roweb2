---
title: spocc tutorial
package_version: 0.5.0
---



The rOpenSci projects aims to provide programmatic access to scientific data repositories on the web. A vast majority of the packages in our current suite retrieve some form of biodiversity or taxonomic data. Since several of these datasets have been georeferenced, it provides numerous opportunities for visualizing species distributions, building species distribution maps, and for using it analyses such as species distribution models. In an effort to streamline access to these data, we have developed a package called `spocc`, which provides a unified API to all the biodiversity sources that we provide. The obvious advantage is that a user can interact with a common API and not worry about the nuances in syntax that differ between packages. As more data sources come online, users can access even more data without significant changes to their code. However, it is important to note that spocc will never replicate the full functionality that exists within specific packages. Therefore users with a strong interest in one of the specific data sources listed below would benefit from familiarising themselves with the inner working of the appropriate packages.

> `spocc` utilities for cleaning data and mapping have been moved to `spoccutils`

### Data Sources

`spocc` currently interfaces with eight major biodiversity repositories

1. [Global Biodiversity Information Facility (GBIF)](http://www.gbif.org/) (via `rgbif`)
GBIF is a government funded open data repository with several partner organizations with the express goal of providing access to data on Earth's biodiversity. The data are made available by a network of member nodes, coordinating information from various participant organizations and government agencies.

2. [Berkeley Ecoengine](http://ecoengine.berkeley.edu/) (via `ecoengine`)
The ecoengine is an open API built by the [Berkeley Initiative for Global Change Biology](http://globalchange.berkeley.edu/). The repository provides access to over 3 million specimens from various Berkeley natural history museums. These data span more than a century and provide access to georeferenced specimens, species checklists, photographs, vegetation surveys and resurveys and a variety of measurements from environmental sensors located at reserves across University of California's natural reserve system.

3. [iNaturalist](http://www.inaturalist.org/)
iNaturalist provides access to crowd sourced citizen science data on species observations.

4. [VertNet](http://vertnet.org/) (via `rvertnet`)
Similar to `rgbif`, ecoengine, and `rbison` (see below), VertNet provides access to more than 80 million vertebrate records spanning a large number of institutions and museums primarly covering four major disciplines (mammology, herpetology, ornithology, and icthyology). __Note that we don't currenlty support VertNet data in this package, but we should soon__

5. [Biodiversity Information Serving Our Nation](http://bison.usgs.ornl.gov/) (via `rbison`)
Built by the US Geological Survey's core science analytic team, BISON is a portal that provides access to species occurrence data from several participating institutions.

6. [eBird](http://ebird.org/content/ebird/) (via `rebird`)
ebird is a database developed and maintained by the Cornell Lab of Ornithology and the National Audubon Society. It provides real-time access to checklist data, data on bird abundance and distribution, and communtiy reports from birders.

7. [AntWeb](http://antweb.org) (via `AntWeb`)
AntWeb is the world's largest online database of images, specimen records, and natural history information on ants. It is community driven and open to contribution from anyone with specimen records, natural history comments, or images.

8. [iDigBio](https://www.idigbio.org/) (via `ridigbio`)
iDigBio facilitates the digitization of biological and paleobiological specimens and their associated data, and houses specimen data, as well as providing their specimen data via RESTful web services.

__Important Note:__ It's important to keep in mind that several data providers interface with many of the above mentioned repositories. This means that occurence data obtained from BISON may be duplicates of data that are also available through GBIF. We do not have a way to resolve these duplicates or overlaps at this time but it is an issue we are hoping to resolve in future versions of the package. See `?spocc_duplicates`, after installation, for more.

<section id="installation">

## Installation

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

<section id="usage">

## Usage

### Data retrieval

The most significant function in spocc is the `occ` (short for occurrence) function. `occ` takes a query, often a species name, and searches across all data sources specified in the `from` argument. For example, one can search for all occurrences of [Sharp-shinned Hawks](http://www.allaboutbirds.org/guide/sharp-shinned_hawk/id) (_Accipiter striatus_) from the GBIF database with the following R call.


```r
library('spocc')
(df <- occ(query = 'Accipiter striatus', from = 'gbif'))
```

```
#> Searched: gbif
#> Occurrences - Found: 529,471, Returned: 500
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
#> Source: local data frame [500 x 117]
#>
#>                  name  longitude latitude  prov                 issues
#>                 <chr>      <dbl>    <dbl> <chr>                  <chr>
#> 1  Accipiter striatus  -97.94314 30.04580  gbif         cdround,gass84
#> 2  Accipiter striatus -122.40089 37.49201  gbif         cdround,gass84
#> 3  Accipiter striatus  -97.63810 30.24674  gbif    cdround,cudc,gass84
#> 4  Accipiter striatus  -81.85267 28.81852  gbif                 gass84
#> 5  Accipiter striatus -106.31531 31.71593  gbif         cdround,gass84
#> 6  Accipiter striatus  -97.81493 26.03150  gbif cdround,cucdmis,gass84
#> 7  Accipiter striatus  -95.50117 29.76086  gbif         cdround,gass84
#> 8  Accipiter striatus -116.67145 32.94147  gbif         cdround,gass84
#> 9  Accipiter striatus  -96.91463 32.82949  gbif         cdround,gass84
#> 10 Accipiter striatus  -75.65139 45.44557  gbif         cdround,gass84
#> ..                ...        ...      ...   ...                    ...
#> Variables not shown: key <int>, datasetKey <chr>, publishingOrgKey <chr>,
#>   publishingCountry <chr>, protocol <chr>, lastCrawled <chr>, lastParsed
#>   <chr>, extensions <chr>, basisOfRecord <chr>, taxonKey <int>, kingdomKey
#>   <int>, phylumKey <int>, classKey <int>, orderKey <int>, familyKey <int>,
#>   genusKey <int>, speciesKey <int>, scientificName <chr>, kingdom <chr>,
#>   phylum <chr>, order <chr>, family <chr>, genus <chr>, species <chr>,
#>   genericName <chr>, specificEpithet <chr>, taxonRank <chr>,
#>   dateIdentified <chr>, coordinateUncertaintyInMeters <dbl>, year <int>,
#>   month <int>, day <int>, eventDate <date>, modified <chr>,
#>   lastInterpreted <chr>, references <chr>, identifiers <chr>, facts <chr>,
#>   relations <chr>, geodeticDatum <chr>, class <chr>, countryCode <chr>,
#>   country <chr>, rightsHolder <chr>, identifier <chr>, informationWithheld
#>   <chr>, verbatimEventDate <chr>, datasetName <chr>, verbatimLocality
#>   <chr>, collectionCode <chr>, gbifID <chr>, occurrenceID <chr>, taxonID
#>   <chr>, license <chr>, catalogNumber <chr>, recordedBy <chr>,
#>   http...unknown.org.occurrenceDetails <chr>, institutionCode <chr>,
#>   rights <chr>, eventTime <chr>, identificationID <chr>, occurrenceRemarks
#>   <chr>, individualCount <int>, elevation <dbl>, elevationAccuracy <dbl>,
#>   continent <chr>, stateProvince <chr>, institutionID <chr>, county <chr>,
#>   identificationVerificationStatus <chr>, language <chr>, type <chr>,
#>   locationAccordingTo <chr>, preparations <chr>, identifiedBy <chr>,
#>   georeferencedDate <chr>, higherGeography <chr>, nomenclaturalCode <chr>,
#>   georeferencedBy <chr>, georeferenceProtocol <chr>, endDayOfYear <chr>,
#>   georeferenceVerificationStatus <chr>, locality <chr>,
#>   verbatimCoordinateSystem <chr>, otherCatalogNumbers <chr>, organismID
#>   <chr>, previousIdentifications <chr>, identificationQualifier <chr>,
#>   samplingProtocol <chr>, accessRights <chr>, higherClassification <chr>,
#>   georeferenceSources <chr>, sex <chr>, establishmentMeans <chr>,
#>   occurrenceStatus <chr>, disposition <chr>, startDayOfYear <chr>,
#>   dynamicProperties <chr>, infraspecificEpithet <chr>, georeferenceRemarks
#>   <chr>, and 12 more <...>.
```

When you get data from multiple providers, the fields returned are slightly different, e.g.:


```r
df <- occ(query = 'Accipiter striatus', from = c('gbif', 'ecoengine'), limit = 25)
head(df$gbif$data$Accipiter_striatus)[1:6,1:10]
```

```
#> Source: local data frame [6 x 10]
#>
#>                 name  longitude latitude                 issues  prov
#>                <chr>      <dbl>    <dbl>                  <chr> <chr>
#> 1 Accipiter striatus  -97.94314 30.04580         cdround,gass84  gbif
#> 2 Accipiter striatus -122.40089 37.49201         cdround,gass84  gbif
#> 3 Accipiter striatus  -97.63810 30.24674    cdround,cudc,gass84  gbif
#> 4 Accipiter striatus  -81.85267 28.81852                 gass84  gbif
#> 5 Accipiter striatus -106.31531 31.71593         cdround,gass84  gbif
#> 6 Accipiter striatus  -97.81493 26.03150 cdround,cucdmis,gass84  gbif
#> Variables not shown: key <int>, datasetKey <chr>, publishingOrgKey <chr>,
#>   publishingCountry <chr>, protocol <chr>.
```

```r
head(df$ecoengine$data$Accipiter_striatus)
```

```
#> Source: local data frame [6 x 17]
#>
#>   longitude latitude
#>       <dbl>    <dbl>
#> 1 -122.1706  37.4289
#> 2 -122.2238  37.4698
#> 3 -122.2238  37.4698
#> 4 -122.2238  37.4698
#> 5 -122.2238  37.4698
#> 6 -122.2238  37.4698
#> Variables not shown: url <chr>, key <chr>, observation_type <chr>, name
#>   <chr>, country <chr>, state_province <chr>, begin_date <date>, end_date
#>   <chr>, source <chr>, remote_resource <chr>, locality <chr>,
#>   coordinate_uncertainty_in_meters <int>, recorded_by <chr>, last_modified
#>   <chr>, prov <chr>.
```

We provide a function `occ2df` that pulls out a few key columns needed for making maps:


```r
head(occ2df(df))
```

```
#> Source: local data frame [6 x 6]
#>
#>                 name  longitude latitude  prov       date        key
#>                <chr>      <dbl>    <dbl> <chr>     <date>      <chr>
#> 1 Accipiter striatus  -97.94314 30.04580  gbif 2016-01-24 1233600470
#> 2 Accipiter striatus -122.40089 37.49201  gbif 2016-01-09 1229610667
#> 3 Accipiter striatus  -97.63810 30.24674  gbif 2016-01-16 1229927481
#> 4 Accipiter striatus  -81.85267 28.81852  gbif 2016-01-17 1253301153
#> 5 Accipiter striatus -106.31531 31.71593  gbif 2016-01-19 1233597063
#> 6 Accipiter striatus  -97.81493 26.03150  gbif 2016-01-14 1229927719
```


### Fix names

One problem you often run in to is that there can be various names for the same taxon in any one source. For example:


```r
df <- occ(query = 'Pinus contorta', from = c('gbif', 'ecoengine'), limit = 50)
head(df$gbif$data$Pinus_contorta)[1:6, 1:5]
```

```
#> Source: local data frame [6 x 5]
#>
#>             name  longitude  latitude         issues  prov
#>            <chr>      <dbl>     <dbl>          <chr> <chr>
#> 1 Pinus contorta -120.33987  39.34308 cdround,gass84  gbif
#> 2 Pinus contorta  176.32093 -39.33307 cdround,gass84  gbif
#> 3 Pinus contorta -123.35278  48.90594 cdround,gass84  gbif
#> 4 Pinus contorta -123.98210  46.20296 cdround,gass84  gbif
#> 5 Pinus contorta  -79.39836  44.31028 cdround,gass84  gbif
#> 6 Pinus contorta         NA        NA                 gbif
```

```r
head(df$ecoengine$data$Pinus_contorta)[1:6, 1:5]
```

```
#> Source: local data frame [6 x 5]
#>
#>   longitude latitude
#>       <dbl>    <dbl>
#> 1 -119.4967  38.0990
#> 2 -117.7989  34.3485
#> 3 -117.8033  34.3531
#> 4 -119.6149  38.0754
#> 5 -119.6120  38.0923
#> 6 -120.6422  39.6801
#> Variables not shown: url <chr>, key <chr>, observation_type <chr>.
```

This is fine, but when trying to make a map in which points are colored for each taxon, you can have many colors for a single taxon, where instead one color per taxon is more appropriate. There is a function in `spocc` called `fixnames`, which has a few options in which you can take the shortest names (usually just the plain binomials like _Homo sapiens_), or the original name queried, or a vector of names supplied by the user.


```r
df <- fixnames(df, how = 'shortest')
head(df$gbif$data$Pinus_contorta[,1:2])
```

```
#> Source: local data frame [6 x 2]
#>
#>             name  longitude
#>            <chr>      <dbl>
#> 1 Pinus contorta -120.33987
#> 2 Pinus contorta  176.32093
#> 3 Pinus contorta -123.35278
#> 4 Pinus contorta -123.98210
#> 5 Pinus contorta  -79.39836
#> 6 Pinus contorta         NA
```

```r
head(df$ecoengine$data$Pinus_contorta[,1:2])
```

```
#> Source: local data frame [6 x 2]
#>
#>   longitude latitude
#>       <dbl>    <dbl>
#> 1 -119.4967  38.0990
#> 2 -117.7989  34.3485
#> 3 -117.8033  34.3531
#> 4 -119.6149  38.0754
#> 5 -119.6120  38.0923
#> 6 -120.6422  39.6801
```

```r
df_comb <- occ2df(df)
head(df_comb); tail(df_comb)
```

```
#> Source: local data frame [6 x 6]
#>
#>             name  longitude  latitude  prov       date        key
#>            <chr>      <dbl>     <dbl> <chr>     <date>      <chr>
#> 1 Pinus contorta -120.33987  39.34308  gbif 2016-01-03 1249276846
#> 2 Pinus contorta  176.32093 -39.33307  gbif 2016-02-15 1249301037
#> 3 Pinus contorta -123.35278  48.90594  gbif 2016-02-28 1253314823
#> 4 Pinus contorta -123.98210  46.20296  gbif 2016-02-07 1249288703
#> 5 Pinus contorta  -79.39836  44.31028  gbif 2016-02-06 1249290834
#> 6 Pinus contorta         NA        NA  gbif 2016-03-12 1265255743
```

```
#> Source: local data frame [6 x 6]
#>
#>             name longitude latitude      prov   date
#>            <chr>     <dbl>    <dbl>     <chr> <date>
#> 1 Pinus contorta -120.3358  39.1632 ecoengine   <NA>
#> 2 Pinus contorta -119.9564  38.7905 ecoengine   <NA>
#> 3 Pinus contorta -121.2308  40.3064 ecoengine   <NA>
#> 4 Pinus contorta -121.2308  40.3064 ecoengine   <NA>
#> 5 Pinus contorta -119.5066  37.6013 ecoengine   <NA>
#> 6 Pinus contorta -119.5158  37.6024 ecoengine   <NA>
#> Variables not shown: key <chr>.
```

### Clean data

All data cleaning functionality is in a new package [scrubr](https://github.com/ropenscilabs/scrubr). [On CRAN](https://cran.r-project.org/package=scrubr).

### Make maps

All mapping functionality is now in a separate package [mapr](https://github.com/ropensci/mapr) (formerly known as `spoccutils`), to make `spocc` easier to maintain. [On CRAN](https://cran.r-project.org/package=mapr).


<section id="citing">

## Citing

To cite `spocc` in publications use:

<br>

> Scott Chamberlain, Karthik Ram and Ted Hart (2016). spocc: R interface to many species occurrence data sources. R package version 0.5.0. https://github.com/ropensci/spocc

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for spocc](https://github.com/ropensci/spocc/issues?state=open)

[Back to top](#top)
