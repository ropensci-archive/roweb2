---
title: originr tutorial
package_version: 0.1.0
---



Species Origin Data

Data sources:

* Encyclopedia of Life [http://eol.org](http://eol.org)
* Flora Europaea [http://rbg-web2.rbge.org.uk/FE/fe.html](http://rbg-web2.rbge.org.uk/FE/fe.html)
* Global Invasive Species Database [http://www.iucngisd.org/gisd](http://www.iucngisd.org/gisd)
* Native Species Resolver [http://bien.nceas.ucsb.edu/bien/tools/nsr/nsr-ws/](http://bien.nceas.ucsb.edu/bien/tools/nsr/nsr-ws/)
* Integrated Taxonomic Information Service [http://www.itis.gov/](http://www.itis.gov/)


<section id="installation">

## Installation

Stable version from CRAN


```r
install.packages("originr")
```

Development version from GitHub


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropenscilabs/originr")
```


```r
library("originr")
```

<section id="usage">

## Usage

### EOL invasive species datasets

Datasets included:

* `gisd100` - 100 of the World's Worst Invasive Alien Species
(Global Invasive Species Database) [http://eol.org/collections/54500](http://eol.org/collections/54500)
* `gisd` - Global Invasive Species Database 2013 [http://eol.org/collections/54983](http://eol.org/collections/54983)
* `isc` - Centre for Agriculture and Biosciences International Invasive Species
Compendium (ISC) [http://eol.org/collections/55180](http://eol.org/collections/55180)
* `daisie` - Delivering Alien Invasive Species Inventories for Europe (DAISIE) Species
List [http://eol.org/collections/55179](http://eol.org/collections/55179)
* `i3n` - IABIN Invasives Information Network (I3N) Species
http://eol.org/collections/55176
* `mineps` - Marine Invaders of the NE Pacific Species [http://eol.org/collections/55331](http://eol.org/collections/55331)

An example using `mineps`


```r
eol(name='Ciona intestinalis', dataset='mineps')
#>        searched_name                                name eol_object_id
#> 1 Ciona intestinalis Ciona intestinalis (Linnaeus, 1767)        512629
#>       db
#> 1 mineps
```

### Native Species Resolver


```r
nsr("Pinus ponderosa", "United States")
#>     family genus         species       country native_status
#> 1 Pinaceae Pinus Pinus ponderosa United States             P
#>                                                 native_status_reason
#> 1 Present in one or more checklists for region, status not indicated
#>   native_status_sources isIntroduced isCultivated
#> 1                  usda            0            0
```

### Global Invasive Species Database


```r
sp <- c("Carpobrotus edulis", "Rosmarinus officinalis")
gisd(sp)
#> $`Carpobrotus edulis`
#> $`Carpobrotus edulis`$species
#> [1] "Carpobrotus edulis"
#>
#> $`Carpobrotus edulis`$alien_range
#>  [1] "albania"          "argentina"        "australia"
#>  [4] "bermuda"          "chile"            "croatia"
#>  [7] "france"           "french polynesia" "germany"
#> [10] "gibraltar"        "greece"           "guernsey"
#> [13] "ireland"          "italy"            "malta"
#> [16] "mexico"           "new zealand"      "pitcairn"
#> [19] "portugal"         "saint helena"     "spain"
#> [22] "tunisia"          "united kingdom"   "united states"
#>
#> $`Carpobrotus edulis`$native_range
#> character(0)
#>
#>
#> $`Rosmarinus officinalis`
#> $`Rosmarinus officinalis`$species
#> [1] "Rosmarinus officinalis"
#>
#> $`Rosmarinus officinalis`$status
#> [1] "Not in GISD"
```

### Flora Europaea


```r
flora_europaea("Lavandula stoechas")
#> $native
#>  [1] "Islas_Baleares" "Corse"          "Kriti"          "France"
#>  [5] "Greece"         "Spain"          "Italy"          "Portugal"
#>  [9] "Sardegna"       "Sicilia"        "Turkey"
#>
#> $exotic
#> [1] NA
#>
#> $status_doubtful
#> [1] NA
#>
#> $occurrence_doubtful
#> [1] NA
#>
#> $extinct
#> [1] NA
```


<section id="citing">

## Citing

> Scott Chamberlain and Ignasi Bartomeus (2016). originr: Fetch Species
  Origin Data from the Web. R package version 0.1.0. https://cran.rstudio.com/package=originr


<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our GitHub repo for originr](https://github.com/ropenscilabs/originr/issues?state=open)


[Back to top](#top)

