---
title: traits tutorial
package_version: 0.2.0
---



<section id="installation">

## Installation

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

<section id="usage">

## Usage

### BetyDB

Get trait data for Willow (_Salix_ spp.)


```r
(salix <- betydb_search("Salix Vcmax"))
```

```
#> Source: local data frame [14 x 31]
#>
#>    access_level       author checked citation_id citation_year  city
#>           (int)        (chr)   (int)       (int)         (int) (chr)
#> 1             4       Merilo       1         430          2005 Saare
#> 2             4       Merilo       1         430          2005 Saare
#> 3             4       Merilo       1         430          2005 Saare
#> 4             4       Merilo       1         430          2005 Saare
#> 5             4 Wullschleger       1          51          1993    NA
#> 6             4       Merilo       1         430          2005 Saare
#> 7             4       Merilo       1         430          2005 Saare
#> 8             4       Merilo       1         430          2005 Saare
#> 9             4       Merilo       1         430          2005 Saare
#> 10            4       Merilo       1         430          2005 Saare
#> 11            4       Merilo       1         430          2005 Saare
#> 12            4       Merilo       1         430          2005 Saare
#> 13            4       Merilo       1         430          2005 Saare
#> 14            4         Wang       1         381          2010    NA
#> Variables not shown: commonname (chr), cultivar_id (int), date (chr),
#>   dateloc (chr), genus (chr), id (int), lat (dbl), lon (dbl), mean (dbl),
#>   month (dbl), n (int), notes (chr), result_type (chr), scientificname
#>   (chr), site_id (int), sitename (chr), species_id (int), stat (dbl),
#>   statname (chr), trait (chr), trait_description (chr), treatment (chr),
#>   treatment_id (int), units (chr), year (dbl)
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
#> Source: local data frame [4 x 6]
#> Groups: scientificname [?]
#>
#>                    scientificname trait  mean   min   max     n
#>                             (chr) (chr) (dbl) (dbl) (dbl) (int)
#> 1                           Salix Vcmax 65.00 65.00 65.00     1
#> 2                Salix dasyclados Vcmax 46.08 34.30 56.68     4
#> 3 Salix sachalinensis × miyabeana Vcmax 79.28 79.28 79.28     1
#> 4                 Salix viminalis Vcmax 43.04 19.99 61.29     8
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
#> 1 Umbra limi    169
#> 2 Umbra limi    412
#> 3 Umbra limi    315
#> 4 Umbra limi    200
#> 5 Umbra limi    333
#> 6 Umbra limi    242
#>                                                                                              gene_desc
#> 1                                         Umbra limi mitochondrial gene for 12S rRNA, partial sequence
#> 2 Umbra limi tRNA-Glu gene, partial sequence; and cytochrome b (CYTB) gene, partial cds; mitochondrial
#> 3                                   Umbra limi 16S ribosomal RNA gene, partial sequence; mitochondrial
#> 4                                   Umbra limi 16S ribosomal RNA gene, partial sequence; mitochondrial
#> 5                                   Umbra limi 16S ribosomal RNA gene, partial sequence; mitochondrial
#> 6                                   Umbra limi 12S ribosomal RNA gene, partial sequence; mitochondrial
#>     acc_no     gi_no
#> 1 LC021016 985564997
#> 2 KM523322 725542537
#> 3 KM435059 725542420
#> 4 KM434991 725542361
#> 5 KM282516 725542294
#> 6 KM282453 725542240
```

### GISD invasive species data

> NOTE: we're moving all functions having to do with where species are native/invasive to a new package [https://github.com/ropenscilabs/originr](https://github.com/ropenscilabs/originr)


```r
sp <- c("Carpobrotus edulis", "Rosmarinus officinalis")
g_invasive(sp)
```

```
#>                  species status
#> 1     Carpobrotus edulis     ;
#> 2 Rosmarinus officinalis     ;
```

Or as simplified output


```r
g_invasive(sp, simplify = TRUE)
```

```
#>                  species   status
#> 1     Carpobrotus edulis Invasive
#> 2 Rosmarinus officinalis Invasive
```

### EOL invasive species data

> NOTE: we're moving all functions having to do with where species are native/invasive to a new package [https://github.com/ropenscilabs/originr](https://github.com/ropenscilabs/originr)


```r
eol_invasive_('Brassica oleracea', dataset = 'gisd')
```

```
#>       searched_name              name eol_object_id   db
#> 1 Brassica oleracea Brassica oleracea           NaN gisd
```

Another example, with more species, and from


```r
eol_invasive_(c('Lymantria dispar','Cygnus olor',
                'Hydrilla verticillata','Pinus concolor'),
              dataset = 'i3n')
```

```
#>           searched_name                  name eol_object_id  db
#> 1      Lymantria dispar      Lymantria dispar           NaN i3n
#> 2           Cygnus olor           Cygnus olor           NaN i3n
#> 3 Hydrilla verticillata Hydrilla verticillata           NaN i3n
#> 4        Pinus concolor        Pinus concolor           NaN i3n
```

### EOL's Traitbank data

Note that EOL's Traitbank does not allow us to search by trait.
The only interface we have is to search by taxon page ID.

Searching for _Potus flavus_, page id `328067`


```r
res <- traitbank(pageid = 328067)
res$graph %>%
  select(dwc.measurementtype,
         dwc.measurementvalue) %>%
  filter(!is.na(dwc.measurementvalue))
```

```
#> Source: local data frame [77 x 2]
#>
#>                                         dwc.measurementtype
#>                                                       (chr)
#> 1  http://www.owl-ontologies.com/unnamed.owl#Metabolic_rate
#> 2                          http://iucn.org/population_trend
#> 3                      http://rs.tdwg.org/dwc/terms/habitat
#> 4                 http://purl.obolibrary.org/obo/VT_0001661
#> 5                http://eol.org/schema/terms/LittersPerYear
#> 6                 http://purl.obolibrary.org/obo/VT_0001933
#> 7            http://eol.org/schema/terms/InterBirthInterval
#> 8            http://semanticscience.org/resource/SIO_000319
#> 9            http://semanticscience.org/resource/SIO_000318
#> 10           http://semanticscience.org/resource/SIO_000318
#> ..                                                      ...
#> Variables not shown: dwc.measurementvalue (chr)
```

### Coral

Get the species list and their ids


```r
coral_species()
```

```
#> Source: local data frame [1,548 x 2]
#>
#>                          name    id
#>                         (chr) (chr)
#> 1         Acanthastrea brevis     3
#> 2       Acanthastrea echinata     4
#> 3      Acanthastrea hemprichi     6
#> 4  Acanthastrea ishigakiensis     8
#> 5      Acanthastrea regularis    12
#> 6   Acanthastrea rotundoflora    13
#> 7    Acanthastrea subechinata    14
#> 8      Acropora abrolhosensis    16
#> 9       Acropora abrotanoides    17
#> 10           Acropora aculeus    18
#> ..                        ...   ...
```

Get data by taxon


```r
coral_taxa(80)
```

```
#> Source: local data frame [3,540 x 25]
#>
#>    observation_id access user_id specie_id         specie_name location_id
#>             (int)  (int)   (int)     (int)               (chr)       (int)
#> 1          157133      1      10        80 Acropora hyacinthus           1
#> 2          156961      1      14        80 Acropora hyacinthus         409
#> 3            5781      1       1        80 Acropora hyacinthus           1
#> 4          156610      1       2        80 Acropora hyacinthus         500
#> 5          158118      1      10        80 Acropora hyacinthus         409
#> 6          119211      1      49        80 Acropora hyacinthus           1
#> 7          158211      1      10        80 Acropora hyacinthus         413
#> 8           90294      1      15        80 Acropora hyacinthus         341
#> 9           90294      1      15        80 Acropora hyacinthus         341
#> 10          90294      1      15        80 Acropora hyacinthus         341
#> ..            ...    ...     ...       ...                 ...         ...
#> Variables not shown: location_name (chr), latitude (dbl), longitude (dbl),
#>   resource_id (int), resource_secondary_id (int), measurement_id (int),
#>   trait_id (int), trait_name (chr), standard_id (int), standard_unit
#>   (chr), methodology_id (int), methodology_name (chr), value (chr),
#>   value_type (chr), precision (dbl), precision_type (chr), precision_upper
#>   (dbl), replicates (int), notes (chr)
```

Get data by trait


```r
coral_traits(105)
```

```
#> Source: local data frame [0 x 25]
#>
#> Variables not shown: observation_id (lgl), access (lgl), user_id (lgl),
#>   specie_id (lgl), specie_name (lgl), location_id (lgl), location_name
#>   (lgl), latitude (lgl), longitude (lgl), resource_id (lgl),
#>   resource_secondary_id (lgl), measurement_id (lgl), trait_id (lgl),
#>   trait_name (lgl), standard_id (lgl), standard_unit (lgl), methodology_id
#>   (lgl), methodology_name (lgl), value (lgl), value_type (lgl), precision
#>   (lgl), precision_type (lgl), precision_upper (lgl), replicates (lgl),
#>   notes (lgl)
```

### Flora Europaea


```r
sp <- c("Lavandula stoechas", "Carpobrotus edulis",
        "Rhododendron ponticum", "Alkanna lutea", "Anchusa arvensis")
sapply(sp, fe_native, simplify = FALSE)
```

```
#> $`Lavandula stoechas`
#> $`Lavandula stoechas`$native
#>  [1] "Islas_Baleares" "Corse"          "Kriti"          "France"
#>  [5] "Greece"         "Spain"          "Italy"          "Portugal"
#>  [9] "Sardegna"       "Sicilia"        "Turkey"
#>
#> $`Lavandula stoechas`$exotic
#> [1] NA
#>
#> $`Lavandula stoechas`$status_doubtful
#> [1] NA
#>
#> $`Lavandula stoechas`$occurrence_doubtful
#> [1] NA
#>
#> $`Lavandula stoechas`$extinct
#> [1] NA
#>
#>
#> $`Carpobrotus edulis`
#> $`Carpobrotus edulis`$native
#> [1] NA
#>
#> $`Carpobrotus edulis`$exotic
#>  [1] "Albania"        "Azores"         "Belgium"        "Islas_Baleares"
#>  [5] "Britain"        "Corse"          "France"         "Greece"
#>  [9] "Ireland"        "Spain"          "Italy"          "Portugal"
#> [13] "Sicilia"
#>
#> $`Carpobrotus edulis`$status_doubtful
#> [1] NA
#>
#> $`Carpobrotus edulis`$occurrence_doubtful
#> [1] NA
#>
#> $`Carpobrotus edulis`$extinct
#> [1] NA
#>
#>
#> $`Rhododendron ponticum`
#> $`Rhododendron ponticum`$native
#> [1] "Bulgaria" "Spain"    "Portugal" "Turkey"
#>
#> $`Rhododendron ponticum`$exotic
#> [1] "Belgium" "Britain" "France"  "Ireland"
#>
#> $`Rhododendron ponticum`$status_doubtful
#> [1] NA
#>
#> $`Rhododendron ponticum`$occurrence_doubtful
#> [1] NA
#>
#> $`Rhododendron ponticum`$extinct
#> [1] NA
#>
#>
#> $`Alkanna lutea`
#> $`Alkanna lutea`$native
#> [1] "Islas_Baleares" "Corse"          "France"         "Spain"
#> [5] "Italy"          "Sardegna"
#>
#> $`Alkanna lutea`$exotic
#> [1] NA
#>
#> $`Alkanna lutea`$status_doubtful
#> [1] NA
#>
#> $`Alkanna lutea`$occurrence_doubtful
#> [1] "Portugal"
#>
#> $`Alkanna lutea`$extinct
#> [1] NA
#>
#>
#> $`Anchusa arvensis`
#> $`Anchusa arvensis`$native
#>  [1] "Albania"                    "Austria"
#>  [3] "Belgium"                    "Islas_Baleares"
#>  [5] "Britain"                    "Bulgaria"
#>  [7] "Corse"                      "Czechoslovakia"
#>  [9] "Denmark"                    "Finland"
#> [11] "France"                     "Germany"
#> [13] "Greece"                     "Switzerland"
#> [15] "Netherlands"                "Spain"
#> [17] "Hungary"                    "Italy"
#> [19] "Jugoslavia"                 "Portugal"
#> [21] "Norway"                     "Poland"
#> [23] "Romania"                    "USSR"
#> [25] "USSR_Northern_Division"     "USSR_Baltic_Division"
#> [27] "USSR_Central_Division"      "USSR_South_western"
#> [29] "USSR_Krym"                  "USSRSouth_eastern_Division"
#> [31] "Sicilia"                    "Sweden"
#>
#> $`Anchusa arvensis`$exotic
#> [1] "Faroer"
#>
#> $`Anchusa arvensis`$status_doubtful
#> [1] "Ireland"  "Sardegna"
#>
#> $`Anchusa arvensis`$occurrence_doubtful
#> [1] NA
#>
#> $`Anchusa arvensis`$extinct
#> [1] NA
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
#> 4 22721692                               Energy production & mining
#> 5 22721692 Invasive and other problematic species, genes & diseases
#> 6 22721692                     Residential & commercial development
#>                                                                                  threat2
#> 1                            Annual & perennial non-timber crops / Agro-industry farming
#> 2                             Annual & perennial non-timber crops / Small-holder farming
#> 3 Logging & wood harvesting / Unintentional effects: (subsistence/small scale) [harvest]
#> 4                                                                     Mining & quarrying
#> 5                                                    Problematic native species/diseases
#> 6                                                                  Housing & urban areas
#>                                      stresses  timing scope
#> 1 Ecosystem degradation, Ecosystem conversion Ongoing  <NA>
#> 2 Ecosystem degradation, Ecosystem conversion Ongoing  <NA>
#> 3                       Ecosystem degradation Ongoing  <NA>
#> 4 Ecosystem degradation, Ecosystem conversion Ongoing  <NA>
#> 5                           Species mortality Ongoing  <NA>
#> 6 Ecosystem degradation, Ecosystem conversion Ongoing  <NA>
#>            severity impact
#> 1 Majority (50-90%)     NA
#> 2 Majority (50-90%)     NA
#> 3 Majority (50-90%)     NA
#> 4 Majority (50-90%)     NA
#> 5        Minority (     NA
#> 6        Minority (     NA
```

### Nativity

> NOTE: we're moving all functions having to do with where species are native/invasive to a new package [https://github.com/ropenscilabs/originr](https://github.com/ropenscilabs/originr)


```r
sp <- c("Lavandula stoechas", "Carpobrotus edulis", "Rhododendron ponticum",
      "Alkanna lutea", "Anchusa arvensis")
```

Native in the continental USA?


```r
sapply(sp, is_native, where = "Continental US", region = "america")
```

```
#>        Lavandula stoechas   Carpobrotus edulis   Rhododendron ponticum
#> name   "Lavandula stoechas" "Carpobrotus edulis" "Rhododendron ponticum"
#> origin "Introduced"         "Introduced"         "species not in itis"
#>        Alkanna lutea         Anchusa arvensis
#> name   "Alkanna lutea"       "Anchusa arvensis"
#> origin "species not in itis" "Introduced"
```

Native on Islas Baleares?


```r
sapply(sp, is_native, where = "Islas_Baleares", region = "europe")
```

```
#>        Lavandula stoechas   Carpobrotus edulis
#> name   "Lavandula stoechas" "Carpobrotus edulis"
#> origin "Native"             "Introduced"
#>        Rhododendron ponticum                         Alkanna lutea
#> name   "Rhododendron ponticum"                       "Alkanna lutea"
#> origin "Species not present in your selected region" "Native"
#>        Anchusa arvensis
#> name   "Anchusa arvensis"
#> origin "Native"
```

<section id="citing">

## Citing

To cite `traits` in publications use:

<br>

> Scott Chamberlain, Zachary Foster, Ignasi Bartomeus, David LeBauer, and David Harris (2015). traits: Species Trait Data from Around the Web. R package version 0.2.0. https://github.com/ropensci/traits

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for traits](https://github.com/ropensci/traits/issues?state=open)

[Back to top](#top)
