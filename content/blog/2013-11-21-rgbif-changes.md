---
slug: rgbif-changes
title: rgbif changes in v0.4
date: '2013-11-21'
author:
  - Scott Chamberlain
tags:
  - R
  - taxonomy
  - API
---

The Global Biodiversity Information Facility (GBIF) is a warehouse of species occurrence data - collecting data from a lot of different sources. Our package `rgbif` allows you to interact with GBIF from R. We interact with GBIF via their Application Programming Interface, or API. Our last version on CRAN (v0.3) interacted with the older version of their API - this version interacts with the new version of their API. However, we also retained functions that interact with the old API.

We have strived to have meaningful error messages for various arguments that have been changed, and for functions that were in v0.3, but now work with the new API (e.g. `organizations`, `networks`).

GBIF did a large overhaul of the interface, so the possible arguments to use in each function are quite different. Don't hesitate to get in touch if you have a question! They have a set of methods to look up metadata about sources (under [Registry](https://www.gbif.org/developer/registry)), a set of methods for species names (under [Species](https://www.gbif.org/developer/species)), a set of methods for occurrences (under [Occurrences](https://www.gbif.org/developer/occurrence)), and a set of methods for requesting tile map layers (under [Maps](https://www.gbif.org/developer/maps)). In `rgbif` we provide functions for the first three, Registry, Species, and Occurrences. We don't provide R interfaces to their Maps service as it only makes sense to use in a web native workflow.

Tutorial for old GBIF API: [/tutorials/rgbif_tutorial.html](/tutorials/rgbif_tutorial/)

*Note: the Mac OSX binary is not available yet on CRAN...*

***************

## Install and load rgbif


```r
install.packages("rgbif")
```



```r
library(rgbif)
```


***************

## Registry

### Look up datasets

Look up specific datasets


```r
out <- datasets(data = "contact", uuid = "a6998220-7e3a-485d-9cd6-73076bd85657")
library(plyr)
ldply(out, data.frame)[, c(1:4)]  # just a few columns for brevity
```

```
##     key                            type primary firstName
## 1 22901 ADMINISTRATIVE_POINT_OF_CONTACT    TRUE       Ian
## 2 22900                          AUTHOR   FALSE    Graham
## 3 22899                 METADATA_AUTHOR    TRUE       Ian
## 4 22898                      ORIGINATOR    TRUE       Ian
```


Search datasets: Get all datasets tagged with keyword "france".


```r
out <- dataset_search(keyword = "france")
out$data
```

```
##                                                                                  title
## 1                                    Cartographie des Leguminosae (Fabaceae) en France
## 2                                                                      Carnet en Ligne
## 3                                            Phytochorologie des départements français
## 4 Actualisation de la cartographie des Ptéridophytes de France et d'Europe occidentale
##   hostingOrganization owningOrganization       type publishingCountry
## 1       Tela-Botanica      Tela-Botanica OCCURRENCE                FR
## 2       Tela-Botanica      Tela-Botanica OCCURRENCE                FR
## 3       Tela-Botanica      Tela-Botanica OCCURRENCE                FR
## 4       Tela-Botanica      Tela-Botanica OCCURRENCE                FR
##                                    key
## 1 cbd241aa-a115-4856-af66-fac5cb90f2cc
## 2 baa86fb2-7346-4507-a34f-44e4c1bd0d57
## 3 2d680d46-d783-4ea7-94b1-2556cd653e36
## 4 2aaf8ea9-0460-41d2-a651-3583479947c6
##                 hostingOrganizationKey
## 1 b2dbd210-90c2-11df-86a3-b8a03c50a862
## 2 b2dbd210-90c2-11df-86a3-b8a03c50a862
## 3 b2dbd210-90c2-11df-86a3-b8a03c50a862
## 4 b2dbd210-90c2-11df-86a3-b8a03c50a862
##                  owningOrganizationKey
## 1 b2dbd210-90c2-11df-86a3-b8a03c50a862
## 2 b2dbd210-90c2-11df-86a3-b8a03c50a862
## 3 b2dbd210-90c2-11df-86a3-b8a03c50a862
## 4 b2dbd210-90c2-11df-86a3-b8a03c50a862
```


Get dataset metrics


```r
dataset_metrics(uuid = "3f8a1297-3259-4700-91fc-acc4170b27ce")$countByRank
```

```
##    SPECIES      GENUS    VARIETY SUBSPECIES    SECTION      TRIBE
##       5924       1223        854        748        324        323
##   SUBGENUS     FAMILY  SUBFAMILY SUBSECTION   SUBTRIBE      ORDER
##        194        171        147         59         57         55
##     SERIES SUPERORDER   SUBCLASS      CLASS
##         40         12          6          2
```


### Look up nodes


```r
nodes(data = "identifier", uuid = "1193638d-32d1-43f0-a855-8727c94299d8")
```

```
## [[1]]
## [[1]]$key
## [1] 13587
##
## [[1]]$type
## [1] "GBIF_PARTICIPANT"
##
## [[1]]$identifier
## [1] "57"
##
## [[1]]$createdBy
## [1] "registry-migration.gbif.org"
##
## [[1]]$created
## [1] "2013-10-24T09:06:08.312+0000"
```


### Look up organizations


```r
out <- organizations(data = "contact", uuid = "4b4b2111-ee51-45f5-bf5e-f535f4a1c9dc")
ldply(out, data.frame)[, c(1:4)]  # just a few columns for brevity
```

```
##     key                            type primary
## 1 20006 ADMINISTRATIVE_POINT_OF_CONTACT    TRUE
## 2 20007      TECHNICAL_POINT_OF_CONTACT    TRUE
## 3 20008      TECHNICAL_POINT_OF_CONTACT   FALSE
##                       firstName
## 1 Francisco Javier Bonet García
## 2     Antonio Jesús Pérez Luque
## 3             Ramon Perez Perez
```


***************

## Species

### Lookup names in GBIF taxonomy backbone


```r
out <- name_backbone(name = "Helianthus", rank = "genus", kingdom = "plants")
out$phylum
```

```
## [1] "Magnoliophyta"
```

```r
data.frame(out)  # as a data.frame
```

```
##   usageKey scientificName canonicalName  rank synonym confidence matchType
## 1  3119134  Helianthus L.    Helianthus GENUS   FALSE         97     EXACT
##   kingdom        phylum         clazz     order     family      genus
## 1 Plantae Magnoliophyta Magnoliopsida Asterales Asteraceae Helianthus
##   kingdomKey phylumKey classKey orderKey familyKey genusKey
## 1          6        49      220      414      3065  3119134
```


### Lookup names across all taxonomies in GBIF


```r
out <- name_lookup(query = "Cnaemidophor", rank = "genus")
head(out$data)
```

```
##         key  nubKey parentKey        parent  kingdom     phylum   clazz
## 1 116755723 1858636 110614854 Pterophoridae Animalia Arthropoda Insecta
## 2   1858636 1858636      8863 Pterophoridae Animalia Arthropoda Insecta
## 3 124531302 1858636        NA          <NA>     <NA>       <NA>    <NA>
## 4 101053441 1858636 100725398 Pterophoridae Animalia Arthropoda Insecta
## 5 126862804 1858636 126783981 Pterophoridae Animalia Arthropoda Insecta
## 6 107119486 1858636 107119872 Pterophoridae     <NA>       <NA>    <NA>
##         order        family          genus kingdomKey phylumKey  classKey
## 1 Lepidoptera Pterophoridae Cnaemidophorus  116630539 116762374 116686069
## 2 Lepidoptera Pterophoridae Cnaemidophorus          1        54       216
## 3        <NA>          <NA> Cnaemidophorus         NA        NA        NA
## 4 Lepidoptera Pterophoridae Cnaemidophorus  101719444 102545136 101674726
## 5 Lepidoptera Pterophoridae Cnaemidophorus  126774927 126774928 126775138
## 6        <NA> Pterophoridae Cnaemidophorus         NA        NA        NA
##    orderKey familyKey  genusKey  canonicalName       authorship   nameType
## 1 116843281 110614854 116755723 Cnaemidophorus Wallengren, 1862 WELLFORMED
## 2       797      8863   1858636 Cnaemidophorus Wallengren, 1862 WELLFORMED
## 3        NA        NA 124531302 Cnaemidophorus                  WELLFORMED
## 4 102306154 100725398 101053441 Cnaemidophorus Wallengren, 1860 WELLFORMED
## 5 126775421 126783981 126862804 Cnaemidophorus                  WELLFORMED
## 6        NA 107119872 107119486 Cnaemidophorus Wallengren, 1862 WELLFORMED
##    rank numOccurrences
## 1 GENUS              0
## 2 GENUS              0
## 3 GENUS              0
## 4 GENUS              0
## 5 GENUS              0
## 6 GENUS              0
```


### Lookup details for specific names or IDs in all taxonomies in GBIF.


```r
ldply(name_usage(key = 3119195, data = "vernacular_names")$results, data.frame)
```

```
##       key  usageKey                           datasetKey   vernacularName
## 1  512055 117075019 244609a2-e92e-4465-bc9c-f3faa8ce0fcc Common sunflower
## 2  267381 117214133 134eca5f-65ab-49a2-a229-3d0d35fcbefe Common sunflower
## 3  786116 125790787 16c3f9cb-4b19-4553-ac8e-ebb90003aa02      Sonnenblume
## 4  496979 106239436 fab88965-e69d-4491-a04d-e3198b626e52 common sunflower
## 5  750838 124893865 705922f7-5ba5-49ab-a75d-722e3090e690 common sunflower
## 6   38463 100019171 3f8a1297-3259-4700-91fc-acc4170b27ce common sunflower
## 7   38464 100019171 3f8a1297-3259-4700-91fc-acc4170b27ce garden sunflower
## 8   38465 100019171 3f8a1297-3259-4700-91fc-acc4170b27ce     grand soleil
## 9   38466 100019171 3f8a1297-3259-4700-91fc-acc4170b27ce hélianthe annuel
## 10  38467 100019171 3f8a1297-3259-4700-91fc-acc4170b27ce           soleil
## 11 267382 117214133 134eca5f-65ab-49a2-a229-3d0d35fcbefe        sunflower
## 12 512056 117075019 244609a2-e92e-4465-bc9c-f3faa8ce0fcc        sunflower
## 13  38468 100019171 3f8a1297-3259-4700-91fc-acc4170b27ce        tournesol
## 14 291752 116845199 cbb6498e-8927-405a-916b-576d00a6289b     Подсолнечник
## 15 637567 110853779 1ec61203-14fa-4fbd-8ee5-a4a80257b45a           向日葵
##    language preferred
## 1   ENGLISH     FALSE
## 2   ENGLISH     FALSE
## 3    GERMAN     FALSE
## 4   UNKNOWN     FALSE
## 5   ENGLISH     FALSE
## 6   ENGLISH     FALSE
## 7   ENGLISH     FALSE
## 8    FRENCH     FALSE
## 9    FRENCH     FALSE
## 10   FRENCH     FALSE
## 11  ENGLISH     FALSE
## 12  ENGLISH     FALSE
## 13   FRENCH     FALSE
## 14  RUSSIAN     FALSE
## 15  CHINESE     FALSE
```


### Suggest names.

This is meant to be a quick name suggestion function that returns up to 20 names by doing prefix matching against the scientific name. Results are ordered by relevance.


```r
name_suggest(q = "Puma", fields = c("key", "canonicalName"))
```

```
##        key                canonicalName
## 1  2435098                         Puma
## 2  2435099                Puma concolor
## 3  2435146            Puma yagouaroundi
## 4  4969803               Puma lacustris
## 5  6164589       Puma concolor anthonyi
## 6  6164590        Puma concolor couguar
## 7  6164591    Puma concolor kaibabensis
## 8  6164592    Puma concolor oregonensis
## 9  6164594 Puma concolor vancouverensis
## 10 6164599         Puma concolor azteca
## 11 6164600          Puma concolor coryi
## 12 6164602      Puma concolor improcera
## 13 6164603   Puma concolor missoulensis
## 14 6164604     Puma concolor stanleyana
## 15 6164608    Puma concolor californica
## 16 6164610    Puma concolor hippolestes
## 17 6164611       Puma concolor mayensis
## 18 6164613      Puma concolor schorgeri
## 19 6164618         Puma concolor browni
## 20 6164620         Puma concolor cougar
```


***************

## Occurrences

### Get simple count of number of records given parameters


```r
occ_count(nubKey = 2435099, georeferenced = TRUE)
```

```
## [1] 2541
```


### Get specific occurrence records with know keys


```r
occ_get(key = c(773433533, 101010, 240713150, 855998194, 49819470), return = "data")
```

```
##                                    name       key longitude latitude
## 1                  Helianthus annuus L. 773433533   -117.00    32.85
## 2  Platydoras costatus (Linnaeus, 1758)    101010    -70.07    -4.35
## 3                              Pelosina 240713150    163.58   -77.57
## 4       Sciurus vulgaris Linnaeus, 1758 855998194     12.04    58.41
## 5 Phlogophora meticulosa Linnaeus, 1758  49819470     13.28    55.72
```


### Get occurrence records

This is the most common function you may use in `rgbif`.


```r
key <- name_backbone(name = "Helianthus annuus", kingdom = "plants")$speciesKey
occ_search(taxonKey = key, limit = 2)
```

```
## $meta
## $meta$offset
## [1] 0
##
## $meta$limit
## [1] 2
##
## $meta$endOfRecords
## [1] FALSE
##
## $meta$count
## [1] 18190
##
##
## $hierarchy
## $hierarchy[[1]]
##                   name     key    rank
## 1              Plantae       6 kingdom
## 2        Magnoliophyta      49  phylum
## 3        Magnoliopsida     220   clazz
## 4            Asterales     414   order
## 5           Asteraceae    3065  family
## 6           Helianthus 3119134   genus
## 7 Helianthus annuus L. 3119195 species
##
##
## $data
##                   name       key longitude latitude
## 1 Helianthus annuus L. 773433533   -117.00    32.85
## 2 Helianthus annuus L. 855868468     16.42    56.58
```


Another example, using Well Known Text Area as a bounding polygon to search on


```r
occ_search(geometry = "POLYGON((30.1 10.1, 10 20, 20 40, 40 40, 30.1 10.1))")$data
```

```
##                                                   name      key longitude
## 1          Carcharhinus albimarginatus (Ruppell, 1837) 8.57e+08     34.86
## 2  Goniobranchus tinctorius (Rüppell & Leuckart, 1828) 8.57e+08     33.92
## 3                Megalomma vesiculosum (Montagu, 1815) 8.57e+08     23.98
## 4                   Thalassoma lunare (Linnaeus, 1758) 8.57e+08     33.92
## 5                 Hermodice carunculata (Pallas, 1766) 8.57e+08     23.98
## 6                    Pterois volitans (Linnaeus, 1758) 8.57e+08     33.92
## 7             Marthasterias glacialis (Linnaeus, 1758) 8.57e+08     23.98
## 8                  Epinephelus marginatus (Lowe, 1834) 8.57e+08     23.98
## 9                Scorpaenopsis diabolus (Cuvier, 1829) 8.57e+08     33.92
## 10                       Muraena helena Linnaeus, 1758 8.57e+08     23.98
## 11                 Gobius bucchichi Steindachner, 1870 8.57e+08     23.98
## 12               Thalassoma purpureum (Forsskål, 1775) 8.57e+08     33.92
## 13                      Bothus podas (Delaroche, 1809) 8.57e+08     23.98
## 14                    Symphodus tinca (Linnaeus, 1758) 8.57e+08     34.07
## 15                      Pagrus pagrus (Linnaeus, 1758) 8.57e+08     34.07
## 16                Sargocentron rubrum (Forsskål, 1775) 8.57e+08     34.07
## 17            Marthasterias glacialis (Linnaeus, 1758) 8.57e+08     23.98
## 18                  Spongia officinalis Linnaeus, 1759 8.57e+08     23.98
## 19                Hermodice carunculata (Pallas, 1766) 8.57e+08     23.98
## 20                       Octopus hubbsorum Berry, 1953 8.57e+08     23.98
##    latitude
## 1     25.31
## 2     27.36
## 3     37.66
## 4     27.36
## 5     37.66
## 6     27.36
## 7     37.66
## 8     37.66
## 9     27.36
## 10    37.66
## 11    37.66
## 12    27.36
## 13    37.66
## 14    35.00
## 15    35.00
## 16    35.00
## 17    37.66
## 18    37.66
## 19    37.66
## 20    37.66
```
