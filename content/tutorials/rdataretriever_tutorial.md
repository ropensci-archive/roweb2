---
title: rdataretriever tutorial
package_version: 1.0.0
---



<section id="installation">

## Installation

### Install DataRetriever software

To use the R package `rdataretriever` you first need to install `Retriever`. For installation instructions go to <http://www.data-retriever.org/#install>; you can install with `pip`, and there's installers available for all major operating systems, or it can be installed from source.

[Source code](https://github.com/weecology/retriever).

### Install R package

Install and load `rdataretriever` into the R session. Stable version from CRAN


```r
install.packages("rdataretriever")
```

Or development version from Github:


```r
install.packages("devtools")
devtools::install_github("ropensci/rdataretriever")
```


```r
library('rdataretriever')
```

<section id="usage">

## Usage

### List the datasets available via the Retriever


```r
rdataretriever::datasets()
#>  [1] "Available datasets : 47" ""
#>  [3] "Adler2007"               "AmnioteDB"
#>  [5] "Anderson2011"            "ArcticBreedBird"
#>  [7] "AvianBodySize"           "BAAD"
#>  [9] "BBS"                     "BBS50"
#> [11] "Bioclim"                 "CForBioData"
#> [13] "Clark2006"               "DelMoral2010"
#> [15] "eBirdOD"                 "EltonTraits"
#> [17] "FIA"                     "FishParasiteHosts"
#> [19] "FrayJorge"               "Gentry"
#> [21] "GWDD"                    "HomeRanges"
#> [23] "leaf_herbivory"          "leda"
#> [25] "MammalDIET"              "MammalLH"
#> [27] "MammalMR2010"            "mammsupertree"
#> [29] "MarineSize"              "Matter2014"
#> [31] "MCDB"                    "McGlinn2010"
#> [33] "MiscAbundanceDB"         "MoM2003"
#> [35] "NPN"                     "Palmer2007"
#> [37] "Pantheria"               "Petraitis2008"
#> [39] "PhytoplankonBiovolume"   "PlantTaxonomy"
#> [41] "PortalMammals"           "PRISM"
#> [43] "Ramesh2010"              "SonoranPerennials"
#> [45] "Steppe_plants_2013"      "TreeWesternGhats"
#> [47] "vertnet"                 "Woods2009"
#> [49] "Zachmann2010"
```

### Install into csv

Install the Gentry dataset into csv files in your working directory


```r
rdataretriever::install(dataset = 'AvianBodySize', connection = 'csv')
head(read.csv("AvianBodySize_species.csv")[,c(1:10)])
#>   family species_number             species_name        english_name
#> 1      1              1         Struthio camelus             Ostrich
#> 2      3              7 Dromaius novaehollandiae                 Emu
#> 3      4              8        Apteryx australis          Brown Kiwi
#> 4      4              9           Apteryx owenii Little Spotted Kiwi
#> 5      4             10          Apteryx haastii  Great Spotted Kiwi
#> 6      5             14            Tinamus major       Great Tinamou
#>   subspecies m_mass m_mass_n f_mass f_mass_n unsexed_mass
#> 1            115000       NA 100000       NA           NA
#> 2             32700       NA  38300       NA           NA
#> 3              2208       11   2535       26           NA
#> 4              1135       51   1351       41           NA
#> 5              2610       12   3270        7           NA
#> 6              1059       NA    991       NA         1059
```

### Read into R

Install and load a dataset as a list


```r
Gentry <- rdataretriever::fetch('Gentry')
```


```r
head(Gentry$sites)
#>   site_id                                site_name country
#> 1       1                                Kitlope 1  Canada
#> 2       2                                Kitlope 2  Canada
#> 3       3                          Mt. St. Hilaire  Canada
#> 4       4           Metthieson Hammock County Park   U.S.A
#> 5       5                      San Felasko Hammock   U.S.A
#> 6       6 University of Florida Horticulture Woods   U.S.A
#>     state_province     continent abbreviation   lat     lon min_elev
#> 1 British Columbia North America     KITLOPE1 53.07 -127.83       20
#> 2 British Columbia North America     KITLOPE2 52.21 -127.79       10
#> 3         Montreal North America     MTSTHILA 45.62  -73.58       NA
#> 4          Florida North America     MATTHIES 25.72  -80.27       15
#> 5          Florida North America     SANFELAS 29.68  -82.43       30
#> 6          Florida North America     UFHORTIC 29.67  -82.33       50
#>   max_elev precip
#> 1       20   2100
#> 2       10   2100
#> 3       NA    750
#> 4       15   1375
#> 5       30   1375
#> 6       50   1375
```

### Write data into a database

Install a dataset into a SQLite database


```r
rdataretriever::install(dataset = 'Gentry', connection = 'sqlite', db_file = "gentrysqlite.sqlite3")
rdataretriever::install(dataset = 'MCDB', connection = 'sqlite', db_file = "mcdbsqlite.sqlite3")
```

Load `RSQLite` and connect to the database


```r
library("RSQLite")
db <- dbConnect(SQLite(), "mcdbsqlite.sqlite3")
```

List tables in the database


```r
dbListTables(db)
#> [1] "MCDB_communities" "MCDB_references"  "MCDB_sites"
#> [4] "MCDB_species"     "MCDB_trapping"
```

List fields in the table


```r
dbListFields(db, "MCDB_species")
#> [1] "species_id"    "family"        "genus"         "species"
#> [5] "species_level"
```

Query and get data


```r
dbGetQuery(db, "SELECT * FROM MCDB_species LIMIT 10")
#>    species_id      family     genus       species species_level
#> 1        ABBE Abrocomidae  Abrocoma     bennettii             1
#> 2        ABLO  Cricetidae Abrothrix    longipilis             1
#> 3        ABOL  Cricetidae Abrothrix     olivaceus             1
#> 4        ACSP     Muridae    Acomys spinosissimus             1
#> 5        ACWI     Muridae    Acomys       wilsoni             1
#> 6        ACPY Acrobatidae Acrobates      pygmaeus             1
#> 7        AECH     Muridae  Aethomys  chrysophilus             1
#> 8        AEHI     Muridae  Aethomys        hindei             1
#> 9        AKAZ  Cricetidae    Akodon        azarae             1
#> 10       AKCU  Cricetidae    Akodon        cursor             1
```

<section id="citing">

## Citing

To cite `rdataretriever` in publications use:

Software:

> Daniel McGlinn, Henry Senyondo, Shawn Taylor and Ethan White (2017). rdataretriever: R Interface to the Data Retriever. R package version 1.0.0. https://github.com/ropensci/rdataretriever/

Publication:

> Morris, Benjamin D., and Ethan P. White. (2013). The EcoData Retriever: Improving Access to Existing Ecological Data. PLoS ONE 8 (6) (jun): 65848. doi:10.1371/journal.pone.0065848.

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rdataretriever](https://github.com/ropensci/rdataretriever/issues?state=open)

[Back to top](#top)
