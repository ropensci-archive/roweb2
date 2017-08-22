---
title: binomen tutorial
package_version: 0.1.0
---



`binomen` provides various taxonomic classes for defining a single taxon, multiple taxa, and a taxonomic data.frame

It is sort of a companion to [taxize](https://github.com/ropensci/taxize), where you can get taxonomic data on taxonomic names from the web.

The classes (S3):

* `taxon`
* `taxonref`
* `taxonrefs`
* `binomial`
* `grouping` (i.e., classification)

The verbs:

* `gethier()` - get hierarchy from a `taxon` class
* `scatter()` - make each row in taxonomic data.frame (`taxondf`) a separate `taxon` object within a single `taxa` object
* `assemble()` - make a `taxa` object into a `taxondf` data.frame
* `pick()` - pick out one or more taxonomic groups
* `pop()` - pop out (drop) one or more taxonomic groups
* `span()` - pick a range between two taxonomic groups (inclusive)
* `strain()` - filter by taxonomic groups, like dplyr's filter
* `name()` - get the taxon name for each `taxonref` object
* `uri()` - get the reference uri for each `taxonref` object
* `rank()` - get the taxonomic rank for each `taxonref` object
* `id()` - get the reference uri for each `taxonref` object


<section id="installation">

## Installation

Install and load `binomen` into the R session. Stable version from CRAN


```r
install.packages("binomen")
```

Or development version from Github:


```r
install.packages("devtools")
devtools::install_github("ropensci/binomen")
```


```r
library('binomen')
```

<section id="usage">

## Usage

### Make a taxon

Make a taxon object


```r
(obj <- make_taxon(genus="Poa", epithet="annua", authority="L.",
  family='Poaceae', clazz='Poales', kingdom='Plantae', variety='annua'))
#> <taxon>
#>   binomial: Poa annua
#>   grouping:
#>     kingdom: Plantae
#>     clazz: Poales
#>     family: Poaceae
#>     genus: Poa
#>     species: Poa annua
#>     variety: annua
```

Index to various parts of the object

The binomial


```r
obj$binomial
#> <binomial>
#>   genus: Poa
#>   epithet: annua
#>   canonical: Poa annua
#>   species: Poa annua L.
#>   authority: L.
```

The authority


```r
obj$binomial$authority
#> [1] "L."
```

The classification


```r
obj$grouping
#> <grouping>
#>   kingdom: Plantae
#>   clazz: Poales
#>   family: Poaceae
#>   genus: Poa
#>   species: Poa annua
#>   variety: annua
```

The family


```r
obj$grouping$family
#> <taxonref>
#>   rank: family
#>   name: Poaceae
#>   id: none
#>   uri: none
```

### Subset taxon objects

Get one or more ranks via `pick()`


```r
obj %>% pick(family)
#> <taxon>
#>   binomial: Poa annua
#>   grouping:
#>     family: Poaceae
obj %>% pick(family, genus)
#> <taxon>
#>   binomial: Poa annua
#>   grouping:
#>     family: Poaceae
#>     genus: Poa
```

Drop one or more ranks via `pop()`


```r
obj %>% pop(family)
#> <taxon>
#>   binomial: Poa annua
#>   grouping:
#>     kingdom: Plantae
#>     clazz: Poales
#>     genus: Poa
#>     species: Poa annua
#>     variety: annua
obj %>% pop(family, genus)
#> <taxon>
#>   binomial: Poa annua
#>   grouping:
#>     kingdom: Plantae
#>     clazz: Poales
#>     species: Poa annua
#>     variety: annua
```

Get a range of ranks via `span()`


```r
obj %>% span(kingdom, family)
#> <taxon>
#>   binomial: Poa annua
#>   grouping:
#>     kingdom: Plantae
#>     clazz: Poales
#>     family: Poaceae
```

Extract classification as a `data.frame`


```r
gethier(obj)
#>      rank      name
#> 1 kingdom   Plantae
#> 2   clazz    Poales
#> 3  family   Poaceae
#> 4   genus       Poa
#> 5 species Poa annua
#> 6 variety     annua
```

### Taxonomic data.frame's

Make one


```r
df <- data.frame(order = c('Asterales','Asterales','Fagales','Poales','Poales','Poales'),
  family = c('Asteraceae','Asteraceae','Fagaceae','Poaceae','Poaceae','Poaceae'),
  genus = c('Helianthus','Helianthus','Quercus','Poa','Festuca','Holodiscus'),
  stringsAsFactors = FALSE)
(df2 <- taxon_df(df))
#>       order     family      genus
#> 1 Asterales Asteraceae Helianthus
#> 2 Asterales Asteraceae Helianthus
#> 3   Fagales   Fagaceae    Quercus
#> 4    Poales    Poaceae        Poa
#> 5    Poales    Poaceae    Festuca
#> 6    Poales    Poaceae Holodiscus
```

Parse - get rank order via `pick()`


```r
df2 %>% pick(order)
#>       order
#> 1 Asterales
#> 2 Asterales
#> 3   Fagales
#> 4    Poales
#> 5    Poales
#> 6    Poales
```

get ranks order, family, and genus via `pick()`


```r
df2 %>% pick(order, family, genus)
#>       order     family      genus
#> 1 Asterales Asteraceae Helianthus
#> 2 Asterales Asteraceae Helianthus
#> 3   Fagales   Fagaceae    Quercus
#> 4    Poales    Poaceae        Poa
#> 5    Poales    Poaceae    Festuca
#> 6    Poales    Poaceae Holodiscus
```

get range of names via `span()`, from rank `X` to rank `Y`


```r
df2 %>% span(family, genus)
#>       family      genus
#> 1 Asteraceae Helianthus
#> 2 Asteraceae Helianthus
#> 3   Fagaceae    Quercus
#> 4    Poaceae        Poa
#> 5    Poaceae    Festuca
#> 6    Poaceae Holodiscus
```

Separate each row into a `taxon` class (many `taxon` objects are a `taxa` class)


```r
scatter(df2)
#> [[1]]
#> <taxon>
#>   binomial: Helianthus none
#>   grouping:
#>     order: Asterales
#>     family: Asteraceae
#>     genus: Helianthus
#>     species: Helianthus none
#>
#> [[2]]
#> <taxon>
#>   binomial: Helianthus none
#>   grouping:
#>     order: Asterales
#>     family: Asteraceae
#>     genus: Helianthus
#>     species: Helianthus none
#>
#> [[3]]
#> <taxon>
...
```

And you can re-assemble a data.frame from the output of `scatter()` with `assemble()`


```r
out <- scatter(df2)
assemble(out)
#>       order     family      genus         species
#> 1 Asterales Asteraceae Helianthus Helianthus none
#> 2 Asterales Asteraceae Helianthus Helianthus none
#> 3   Fagales   Fagaceae    Quercus    Quercus none
#> 4    Poales    Poaceae        Poa        Poa none
#> 5    Poales    Poaceae    Festuca    Festuca none
#> 6    Poales    Poaceae Holodiscus Holodiscus none
```

## Citing

To cite `binomen` in publications use:

<br>

> Scott Chamberlain (2016). binomen: 'Taxonomic' Specification and Parsing Methods. https://github.com/ropensci/binomen

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rnoaa](https://github.com/ropensci/binomen/issues?state=open)

[Back to top](#top)
