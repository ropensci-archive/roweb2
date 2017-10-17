---
title: traits tutorial
package_version: 0.3.0
---




### Installation

Install and load `traits` into the R session. Stable version from CRAN


```r
install.packages("traits")
```

Or development version from Github:


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropensci/traits")
```


```r
library("traits")
```


## Usage

### BetyDB

Get trait data for Willow (_Salix_ spp.)


```r
(salix <- betydb_search("Salix Vcmax"))
```

```
#> # A tibble: 14 x 36
#>    access_level       author checked citation_id citation_year  city
#>  *        <int>        <chr>   <int>       <int>         <int> <chr>
#>  1            4 Wullschleger       1          51          1993  <NA>
#>  2            4         Wang       1         381          2010  <NA>
#>  3            4       Merilo       1         430          2005 Saare
#>  4            4       Merilo       1         430          2005 Saare
#>  5            4       Merilo       1         430          2005 Saare
#>  6            4       Merilo       1         430          2005 Saare
#>  7            4       Merilo       1         430          2005 Saare
#>  8            4       Merilo       1         430          2005 Saare
#>  9            4       Merilo       1         430          2005 Saare
#> 10            4       Merilo       1         430          2005 Saare
#> 11            4       Merilo       1         430          2005 Saare
#> 12            4       Merilo       1         430          2005 Saare
#> 13            4       Merilo       1         430          2005 Saare
#> 14            4       Merilo       1         430          2005 Saare
#> # ... with 30 more variables: commonname <chr>, cultivar <chr>,
#> #   cultivar_id <int>, date <chr>, dateloc <chr>, entity <lgl>,
#> #   genus <chr>, id <int>, lat <dbl>, lon <dbl>, mean <dbl>,
#> #   method_name <lgl>, month <int>, n <int>, notes <chr>, raw_date <chr>,
#> #   result_type <chr>, scientificname <chr>, site_id <int>,
#> #   sitename <chr>, species_id <int>, stat <dbl>, statname <chr>,
#> #   time <chr>, trait <chr>, trait_description <chr>, treatment <chr>,
#> #   treatment_id <int>, units <chr>, year <int>
```

```r
# equivalent:
# (out <- betydb_search("willow"))
```

Summarise data from the output `data.frame`


```r
library("dplyr")
salix %>%
  group_by(scientificname, trait) %>%
  mutate(.mean = as.numeric(mean)) %>%
  summarise(mean = round(mean(.mean, na.rm = TRUE), 2),
            min = round(min(.mean, na.rm = TRUE), 2),
            max = round(max(.mean, na.rm = TRUE), 2),
            n = length(n))
```

```
#>    mean   min   max  n
#> 1 48.06 19.99 79.28 14
```

### NCBI sequence data

Get sequences by id


```r
ncbi_byid(ids = "360040093")
```

```
#>                  taxon
#> 1 Eristalis transversa
#>                                                                                                             gene_desc
#> 1 Eristalis transversa voucher CNC:Diptera:102013 cytochrome oxidase subunit 1 (COI) gene, partial cds; mitochondrial
#>       gi_no     acc_no length
#> 1 360040093 JN991986.1    658
#>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             sequence
#> 1 tactttatattttgtatttggaacatgagcgggtatagtaggaacttcattaagaattttaattcgagctgaattaggtcatccaggtgcattaattggtgatgatcaaatttataatgttattgtaacagctcatgcttttgttataattttttttatagtaatacctattataattggaggatttggaaattgattagtaccacttatattaggagctccagatatagcattccctcgaataaataatataagtttctgattattacctccttctttaactctattattagtaagaagtatagtagaaaatggggctggaacaggatgaacagtttatcctccattatcaagtaatattgcacatggaggagcctcagttgatttagcaattttttcacttcacttatcaggaatatcatctattttaggtgcagtaaattttattacaacagttattaatatacgatcaacaggaattacttatgatcgtatacctttatttgtttgatctgttgctattacagctttattattattattatcattaccagtactagcaggagctattacaatattattaactgatcgaaatttaaatacatcattctttgatccagcaggaggaggagaccctatcctgtaccaacacttattc
```

Get sequences searching by taxonomic name


```r
out <- ncbi_searcher(taxa = "Umbra limi", seqrange = "1:2000")
head(out)
```

```
#>        taxon length
#> 1 Umbra limi    761
#> 2 Umbra limi    765
#> 3 Umbra limi    764
#> 4 Umbra limi    743
#> 5 Umbra limi    758
#>                                                                                          gene_desc
#> 1                                  Umbra limi voucher NXG2012264 rhodopsin (Rho) gene, partial cds
#> 2                                   Umbra limi voucher NXG201250 rhodopsin (Rho) gene, partial cds
#> 3                                  Umbra limi voucher NXG2012183 rhodopsin (Rho) gene, partial cds
#> 4                                   Umbra limi voucher NXG201252 rhodopsin (Rho) gene, partial cds
#> 5                                  Umbra limi voucher NXG2012231 rhodopsin (Rho) gene, partial cds
#>     acc_no      gi_no
#> 1 KX146134 1049488959
#> 2 KX146015 1049488721
#> 3 KX145969 1049488629
#> 4 KX145777 1049488245
#> 5 KX145759 1049488209
#>  [ reached getOption("max.print") -- omitted 1 row ]
```

### EOL's Traitbank data

Note that EOL's Traitbank does not allow us to search by trait.
The only interface we have is to search by taxon page ID.

Searching for _Potus flavus_, page id `328574`


```r
res <- traitbank(pageid = 328574)
res$graph %>%
  select(dwc.measurementtype,
         dwc.measurementvalue) %>%
  filter(!is.na(dwc.measurementvalue))
```

### Coral

Get the species list and their ids


```r
coral_species()
```

```
#> # A tibble: 1,548 x 2
#>                          name    id
#>                         <chr> <chr>
#>  1        Acanthastrea brevis     3
#>  2      Acanthastrea echinata     4
#>  3     Acanthastrea hemprichi     6
#>  4 Acanthastrea ishigakiensis     8
#>  5     Acanthastrea regularis    12
#>  6  Acanthastrea rotundoflora    13
#>  7   Acanthastrea subechinata    14
#>  8     Acropora abrolhosensis    16
#>  9      Acropora abrotanoides    17
#> 10           Acropora aculeus    18
#> # ... with 1,538 more rows
```

Get data by taxon


```r
coral_taxa(80)
```

```
#> # A tibble: 3,540 x 25
#>    observation_id access user_id specie_id         specie_name location_id
#>             <int>  <int>   <int>     <int>               <chr>       <int>
#>  1         157133      1      10        80 Acropora hyacinthus           1
#>  2         156961      1      14        80 Acropora hyacinthus         409
#>  3           5781      1       1        80 Acropora hyacinthus           1
#>  4         156610      1       2        80 Acropora hyacinthus         500
#>  5         158118      1      10        80 Acropora hyacinthus         409
#>  6         119211      1      49        80 Acropora hyacinthus           1
#>  7         158211      1      10        80 Acropora hyacinthus         413
#>  8          90294      1      15        80 Acropora hyacinthus         341
#>  9          90294      1      15        80 Acropora hyacinthus         341
#> 10          90294      1      15        80 Acropora hyacinthus         341
#> # ... with 3,530 more rows, and 19 more variables: location_name <chr>,
#> #   latitude <dbl>, longitude <dbl>, resource_id <int>,
#> #   resource_secondary_id <int>, measurement_id <int>, trait_id <int>,
#> #   trait_name <chr>, standard_id <int>, standard_unit <chr>,
#> #   methodology_id <int>, methodology_name <chr>, value <chr>,
#> #   value_type <chr>, precision <dbl>, precision_type <chr>,
#> #   precision_upper <dbl>, replicates <int>, notes <chr>
```

Get data by trait


```r
coral_traits(105)
```

```
#> # A tibble: 0 x 25
#> # ... with 25 variables: observation_id <lgl>, access <lgl>,
#> #   user_id <lgl>, specie_id <lgl>, specie_name <lgl>, location_id <lgl>,
#> #   location_name <lgl>, latitude <lgl>, longitude <lgl>,
#> #   resource_id <lgl>, resource_secondary_id <lgl>, measurement_id <lgl>,
#> #   trait_id <lgl>, trait_name <lgl>, standard_id <lgl>,
#> #   standard_unit <lgl>, methodology_id <lgl>, methodology_name <lgl>,
#> #   value <lgl>, value_type <lgl>, precision <lgl>, precision_type <lgl>,
#> #   precision_upper <lgl>, replicates <lgl>, notes <lgl>
```

### Birdlife International

Habitat data


```r
birdlife_habitat(22721692)
```

```
#>         id Habitat (level 1)                  Habitat (level 2) Importance
#> 1 22721692            Forest           Subtropical/Tropical Dry   suitable
#> 2 22721692            Forest Subtropical/Tropical Moist Montane      major
#> 3 22721692            Forest                          Temperate   suitable
#> 4 22721692         Shrubland Subtropical/Tropical High Altitude   suitable
#>     Occurrence
#> 1     breeding
#> 2 non-breeding
#> 3     breeding
#> 4     breeding
```

Threats data


```r
birdlife_threats(22721692)
```

```
#>         id                                                  threat1
#> 1 22721692                                Agriculture & aquaculture
#> 2 22721692                                Agriculture & aquaculture
#> 3 22721692                                  Biological resource use
#>                               threat2
#> 1 Annual & perennial non-timber crops
#> 2 Annual & perennial non-timber crops
#> 3           Logging & wood harvesting
#>                                      stresses
#> 1 Ecosystem degradation, Ecosystem conversion
#> 2 Ecosystem degradation, Ecosystem conversion
#> 3                       Ecosystem degradation
#>                                                     timing
#> 1                                Agriculture & aquaculture
#> 2                                Agriculture & aquaculture
#> 3                                  Biological resource use
#>                                 scope severity  impact
#> 1 Annual & perennial non-timber crops  Ongoing Ongoing
#> 2 Annual & perennial non-timber crops  Ongoing Ongoing
#> 3           Logging & wood harvesting  Ongoing Ongoing
#>  [ reached getOption("max.print") -- omitted 3 rows ]
```


### Citing

To cite `traits` in publications use:

<br>

> Scott Chamberlain, Zachary Foster, Ignasi Bartomeus, David LeBauer
  and David Harris (2017). traits: Species Trait Data from Around the
  Web. R package version 0.3.0.
  https://CRAN.R-project.org/package=traits


### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for traits](https://github.com/ropensci/traits/issues?state=open)

[Back to top](#top)
