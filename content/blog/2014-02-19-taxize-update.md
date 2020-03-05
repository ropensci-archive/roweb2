---
slug: taxize-update
title: New features in the most recent taxize update, v0.2
date: '2014-02-19'
author:
  - Scott Chamberlain
categories: blog
tags:
  - R
  - API
  - taxize
  - taxonomy
---

We just released a new version of `taxize` - version 0.2.0. This release contains a number of new features, and bug fixes. Here is a run down of some of the changes:

## First, install and load taxize


```r
install.packages("rgbif")
```



```r
library(taxize)
```


## New things

### New functions: class2tree

Sometimes you just want to have a visual of the taxonomic relationships among taxa. If you don't know how to build a molecular phylogeny, don't have time, or there just isn't molecular data, you can sorta build one using taxonomy. Building on our `classification` function, you can get a bunch of taxonomic hierarchies from the `classification` function, then pass them to the new function `class2tree`. Like so:

Define a species list


```r
spnames <- c("Latania lontaroides", "Randia cubana", "Blumea brevipes", "Commelina erecta",
    "Miconia pyramidalis", "Aquilegia moorcroftiana", "Acridocarpus austrocaledonicus",
    "Vaccinium wrightii", "Riocreuxia flanaganii", "Macroditassa adnata", "Acianthera ochreata",
    "Spathodea campanulata", "Leucadendron salicifolium", "Habenaria fluminensis",
    "Platostoma siamense", "Bulbophyllum hoehnei", "Aspidosperma polyneuron",
    "Rhynchospora fascicularis", "Sida lonchitis", "Ardisia cymosa", "Morinda brachycalyx",
    "Tetrastigma hypoglaucum", "Paphiopedilum vietnamense", "Goodenia glabra")
```


Then collect taxonomic hierarchies for each taxon, and remove those with no results (those with no results are just `NA`) (I'm setting `verbose=TRUE` to suppress messages for this example)


```r
out <- classification(spnames, db = "ncbi", verbose = FALSE)
out <- out[!is.na(out)]
```


Use `class2tree` to automagically convert the list of hierarchies to a ape `phylo` object, then plot


```r
tr <- class2tree(out)
plot(tr, no.margin = TRUE)
```

![](/assets/blog-images/2014-02-19-taxize-update/unnamed-chunk-5.png)


### New functions: get_gbfid

The Global Biodiversity Information Facility (GBIF) has their own taxonomy. They allow programmatic access to their taxonomy, see [here](https://www.gbif.org/developer/summary) for details. Also see our [`rgbif` package](https://github.com/ropensci/rgbif) that wraps all their API services.

We added a similar function to our `get_tsn`, `get_uid`, etc. functions for various taxonomies, but for the GBIF taxonomy. Here are some example calls:


```r
get_gbifid(sciname = "Poa annua", verbose = FALSE)
```

```
##         1
## "2704179"
## attr(,"class")
## [1] "gbifid"
```

```r
get_gbifid(sciname = "Pinus contorta", verbose = FALSE)
```

```
##         1
## "5285750"
## attr(,"class")
## [1] "gbifid"
```

```r
get_gbifid(sciname = "Puma concolor", verbose = FALSE)
```

```
##         1
## "2435099"
## attr(,"class")
## [1] "gbifid"
```

```r
get_gbifid(c("Poa annua", "Pinus contorta"), verbose = FALSE)
```

```
## [1] "2704179" "5285750"
## attr(,"class")
## [1] "gbifid"
```


This could be useful if you for example, want to have the exact IDs GBIF uses for your set of species to use at some later point - and at that later point you could use our `rgbif` package and search for biodiversity occurrence data with the IDs you collected. For example:


```r
library(rgbif)
(id <- get_gbifid(sciname = "Puma concolor", verbose = FALSE))
```

```
##         1
## "2435099"
## attr(,"class")
## [1] "gbifid"
```

```r
occ_search(id)
```

```
## $meta
## $meta$offset
## [1] 0
##
## $meta$limit
## [1] 20
##
## $meta$endOfRecords
## [1] FALSE
##
## $meta$count
## [1] 8392
##
##
## $hierarchy
## $hierarchy[[1]]
##            name     key    rank
## 1      Animalia       1 kingdom
## 2      Chordata      44  phylum
## 3      Mammalia     359   clazz
## 4     Carnivora     732   order
## 5       Felidae    9703  family
## 6          Puma 2435098   genus
## 7 Puma concolor 2435099 species
##
##
## $data
##             name       key longitude latitude
## 1  Puma concolor 866527350   -110.58    31.85
## 2  Puma concolor 866545169   -103.60    29.16
## 3  Puma concolor 866495627   -106.39    35.13
## 4  Puma concolor 866498665    -89.43    20.31
## 5  Puma concolor 866508658   -105.04    19.47
## 6  Puma concolor 866523280   -118.24    34.06
## 7  Puma concolor 866526517   -104.45    29.92
## 8  Puma concolor 866530535   -118.30    34.07
## 9  Puma concolor 860790696    -77.35     2.77
## 10 Puma concolor        NA        NA       NA
## 11 Puma concolor        NA        NA       NA
## 12 Puma concolor        NA        NA       NA
## 13 Puma concolor 866525528   -123.83    40.13
## 14 Puma concolor 866531329   -123.83    40.13
## 15 Puma concolor 866519497   -118.90    34.54
## 16 Puma concolor 866601452   -122.52    38.45
## 17 Puma concolor 866547065   -110.30    41.88
## 18 Puma concolor 866562541   -123.83    40.13
## 19 Puma concolor 866562081   -123.82    40.13
## 20 Puma concolor 866558112   -103.13    29.65
```


In addition, `get_ids` now accepts 'gbif' as an option for the `db` parameter - `get_ids` is our omnibus function to search for taxon ids across all sources available in `taxize`.

### New functions: rbind and cbind for classification

The `classification` function gives back taxonomic hierarchies from a variety of sources, including NCBI, ITIS, Catalogue of Life, Tropicos, EOL, and now GBIF. If you pass in many taxonomic IDs or taxon names, you get back a list of hierarchies. We added two functions to make it convenient to mash these outputs together, `rbind` for basically stacking hierarchies on top of one another, and `cbind` for making a width-wise combination of hierarchies. Our `cbind` doesn't do exactly what your used to cbind doing for data.frame's. The examples below are based on some changed code since the newest CRAN version, but you can install the development version with the changes from Github (see [here](https://github.com/ropensci/taxize#install-taxize) for instructions).

From a call to `get_ids`, then passed on to `classification`, we get a object of class `classification_ids`


```r
(out <- get_ids(names = "Puma concolor", db = c("ncbi", "gbif"), verbose = FALSE))
```

```
## $ncbi
## Puma concolor
##        "9696"
## attr(,"match")
## [1] "found"
## attr(,"class")
## [1] "uid"
##
## $gbif
## Puma concolor
##     "2435099"
## attr(,"class")
## [1] "gbifid"
##
## attr(,"class")
## [1] "ids"
```

```r
(cl <- classification(out, verbose = FALSE))
```

```
## $ncbi
## $`9696`
##                    name         rank
## 1    cellular organisms      no rank
## 2             Eukaryota superkingdom
## 3          Opisthokonta      no rank
## 4               Metazoa      kingdom
## 5             Eumetazoa      no rank
## 6             Bilateria      no rank
## 7         Deuterostomia      no rank
## 8              Chordata       phylum
## 9              Craniata    subphylum
## 10           Vertebrata      no rank
## 11        Gnathostomata   superclass
## 12           Teleostomi      no rank
## 13         Euteleostomi      no rank
## 14        Sarcopterygii      no rank
## 15 Dipnotetrapodomorpha      no rank
## 16            Tetrapoda      no rank
## 17              Amniota      no rank
## 18             Mammalia        class
## 19               Theria      no rank
## 20             Eutheria      no rank
## 21        Boreoeutheria      no rank
## 22       Laurasiatheria   superorder
## 23            Carnivora        order
## 24           Feliformia     suborder
## 25              Felidae       family
## 26              Felinae    subfamily
## 27                 Puma        genus
## 28        Puma concolor      species
##
## attr(,"class")
## [1] "classification"
## attr(,"db")
## [1] "ncbi"
##
## $gbif
## $`2435099`
##            name    rank
## 1      Animalia kingdom
## 2      Chordata  phylum
## 3      Mammalia   clazz
## 4     Carnivora   order
## 5       Felidae  family
## 6          Puma   genus
## 7 Puma concolor species
##
## attr(,"class")
## [1] "classification"
##
## attr(,"class")
## [1] "classification_ids"
```


We can bind width-wise


```r
cbind(cl)
```

```
##              no rank superkingdom  kingdom   phylum subphylum
## 1 cellular organisms    Eukaryota  Metazoa Chordata  Craniata
## 2               <NA>         <NA> Animalia Chordata      <NA>
##      superclass    class     superorder     order   suborder  family
## 1 Gnathostomata Mammalia Laurasiatheria Carnivora Feliformia Felidae
## 2          <NA>     <NA>           <NA> Carnivora       <NA> Felidae
##   subfamily genus       species    clazz
## 1   Felinae  Puma Puma concolor     <NA>
## 2      <NA>  Puma Puma concolor Mammalia
```


Or bind length-wise


```r
rbind(cl)
```

```
##    source taxonid                 name         rank
## 1    ncbi    9696   cellular organisms      no rank
## 2    ncbi    9696            Eukaryota superkingdom
## 3    ncbi    9696         Opisthokonta      no rank
## 4    ncbi    9696              Metazoa      kingdom
## 5    ncbi    9696            Eumetazoa      no rank
## 6    ncbi    9696            Bilateria      no rank
## 7    ncbi    9696        Deuterostomia      no rank
## 8    ncbi    9696             Chordata       phylum
## 9    ncbi    9696             Craniata    subphylum
## 10   ncbi    9696           Vertebrata      no rank
## 11   ncbi    9696        Gnathostomata   superclass
## 12   ncbi    9696           Teleostomi      no rank
## 13   ncbi    9696         Euteleostomi      no rank
## 14   ncbi    9696        Sarcopterygii      no rank
## 15   ncbi    9696 Dipnotetrapodomorpha      no rank
## 16   ncbi    9696            Tetrapoda      no rank
## 17   ncbi    9696              Amniota      no rank
## 18   ncbi    9696             Mammalia        class
## 19   ncbi    9696               Theria      no rank
## 20   ncbi    9696             Eutheria      no rank
## 21   ncbi    9696        Boreoeutheria      no rank
## 22   ncbi    9696       Laurasiatheria   superorder
## 23   ncbi    9696            Carnivora        order
## 24   ncbi    9696           Feliformia     suborder
## 25   ncbi    9696              Felidae       family
## 26   ncbi    9696              Felinae    subfamily
## 27   ncbi    9696                 Puma        genus
## 28   ncbi    9696        Puma concolor      species
## 29   gbif 2435099             Animalia      kingdom
## 30   gbif 2435099             Chordata       phylum
## 31   gbif 2435099             Mammalia        clazz
## 32   gbif 2435099            Carnivora        order
## 33   gbif 2435099              Felidae       family
## 34   gbif 2435099                 Puma        genus
## 35   gbif 2435099        Puma concolor      species
```


Or we can do the same thing on the class `classification` that we get back from a call to one of `get_colid`, `get_tsn`, `get_eolid`, `get_tpsid`, `get_gbifid`, or `get_uid`, that's then passed on to `classification`


```r
cl_col <- classification(get_colid(c("Puma concolor", "Accipiter striatus"),
    verbose = FALSE))
rbind(cl_col)
```

```
##    source  taxonid            name    rank
## 1     col  6862841        Animalia Kingdom
## 2     col  6862841        Chordata  Phylum
## 3     col  6862841        Mammalia   Class
## 4     col  6862841       Carnivora   Order
## 5     col  6862841         Felidae  Family
## 6     col  6862841            Puma   Genus
## 7     col 11909487        Animalia Kingdom
## 8     col 11909487        Chordata  Phylum
## 9     col 11909487            Aves   Class
## 10    col 11909487 Accipitriformes   Order
## 11    col 11909487    Accipitridae  Family
## 12    col 11909487       Accipiter   Genus
```

```r
cbind(cl_col)
```

```
##    kingdom   phylum    class           order       family     genus
## 1 Animalia Chordata Mammalia       Carnivora      Felidae      Puma
## 2 Animalia Chordata     Aves Accipitriformes Accipitridae Accipiter
```


Read more about changes in v0.2 [at Github](https://github.com/ropensci/taxize/releases/tag/v0.2.0).
