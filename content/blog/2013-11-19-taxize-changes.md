---
slug: taxize-changes
title: taxize changes
date: '2013-11-19'
author:
  - Scott Chamberlain
tags:
  - R
  - taxonomy
  - API
---

We are building a taxonomic toolbelt for R called taxize - which gives you programmatic access to many sources of taxonomic data on the web. We just pushed a new version to [CRAN (v0.1.5)](https://cran.r-project.org/web/packages/taxize/index.html) with a lot of changes (see [here](https://github.com/ropensci/taxize#notes-on-the-itis-api) for a rundown). Here are a few highlights of the changes.

*Note: the windows binary may not be available yet...*

***************

## Install and load taxize


```r
install.packages("taxize")
library(taxize)
```


***************

## Taxonomic identifiers

Each taxonomic service has their own unique ID for a taxon. We had a way to get ITIS and NCBI identifiers before - we now have functions for Tropicos, EOL, and the Catalogue of Life.


```r
get_tpsid(sciname = "Helianthus petiolaris patens")
```



```
##        1
## 50140022
## attr(,"class")
## [1] "tpsid"
```



```r
get_colid(sciname = "Pinus contorta")
```



```
##          1
## "14376216"
## attr(,"class")
## [1] "colid"
```


And we have a new function to get identifiers across all sources. And it's vectorized so you can pass in many names.


```r
get_ids(names = c("Chironomus riparius", "Poa annua"), db = c("ncbi", "itis"))
```



```
## $ncbi
## Chironomus riparius           Poa annua
##            "315576"             "93036"
## attr(,"match")
## [1] "found" "found"
## attr(,"class")
## [1] "uid"
##
## $itis
## Chironomus riparius           Poa annua
##            "129313"             "41107"
## attr(,"match")
## [1] "found" "found"
## attr(,"class")
## [1] "tsn"
##
## attr(,"class")
## [1] "ids"
```


***************

## Taxonomic classifications

We had a function called `classification` to get a taxonomic hierarchy from a particular source, ITIS or NCBI. We now have functions for Tropicos, EOL, and the Catalogue of Life. In addition, we have a function to get classifications across sources.


```r
out <- get_ids(names = "Poa annua", db = c("ncbi", "itis"))
classification(out)
```



```
## $ncbi
## $ncbi$`Poa annua`
##        ScientificName         Rank    UID
## 1  cellular organisms      no rank 131567
## 2           Eukaryota superkingdom   2759
## 3       Viridiplantae      kingdom  33090
## 4        Streptophyta       phylum  35493
## 5      Streptophytina      no rank 131221
## 6         Embryophyta      no rank   3193
## 7        Tracheophyta      no rank  58023
## 8       Euphyllophyta      no rank  78536
## 9       Spermatophyta      no rank  58024
## 10      Magnoliophyta      no rank   3398
## 11         Liliopsida        class   4447
## 12        commelinids     subclass   4734
## 13             Poales        order  38820
## 14            Poaceae       family   4479
## 15          BEP clade      no rank 359160
## 16           Pooideae    subfamily 147368
## 17              Poeae        tribe 147387
## 18             Poinae     subtribe 640628
## 19                Poa        genus   4544
## 20          Poa annua      species  93036
##
##
## $itis
## $itis$`Poa annua`
##         rankName       taxonName    tsn
## 1        Kingdom         Plantae 202422
## 2     Subkingdom  Viridaeplantae 846492
## 3   Infrakingdom    Streptophyta 846494
## 4       Division    Tracheophyta 846496
## 5    Subdivision Spermatophytina 846504
## 6  Infradivision    Angiospermae 846505
## 7          Class   Magnoliopsida  18063
## 8     Superorder        Lilianae 846542
## 9          Order          Poales 846620
## 10        Family         Poaceae  40351
## 11         Genus             Poa  41074
## 12       Species       Poa annua  41107
```


***************

## Synonyms

Just like the `classification` function, synonyms now searches across sources for synonym names. However, this function only has methods for ITIS and Tropicos.


```r
synonyms(c("Poa annua", "Pinus contorta", "Puma concolor"), db = "itis")
```



```
## $`Poa annua`
##                           name    tsn
## 1      Poa annua var. aquatica 538978
## 2       Poa annua var. reptans 538979
## 3                  Aira pumila 785854
## 4             Catabrosa pumila 787993
## 5               Ochlopoa annua 791574
## 6               Poa aestivalis 793946
## 7                   Poa algida 793954
## 8         Poa annua var. annua 802116
## 9     Poa annua var. eriolepis 802117
## 10 Poa annua var. rigidiuscula 802119
## 11        Poa annua f. reptans 803667
##
## $`Pinus contorta`
##      name    tsn
## 1 nomatch 183327
##
## $`Puma concolor`
##             name    tsn
## 1 Felis concolor 180587
```


***************

## Common names from scientific names and vice versa

We have a variety of ways to get common names from scientific names for different sources. To simply things, there are two new functions to work across sources.


```r
sci2comm(scinames = "Helianthus annuus", db = "itis")
```



```
## $`Helianthus annuus`
##            comname    lang   tsn
## 1 common sunflower English 36616
## 2        sunflower English 36616
## 3   wild sunflower English 36616
## 4 annual sunflower English 36616
```


And vice versa


```r
comm2sci(commnames = "annual blue grass", db = "tropicos")
```



```
## $`annual blue grass`
##     NameId ScientificName ScientificNameWithAuthors  Family
## 1 25509881      Poa annua              Poa annua L. Poaceae
##   RankAbbreviation NomenclatureStatusID NomenclatureStatusName Symbol
## 1              sp.                    1             Legitimate      !
##   Author DisplayReference DisplayDate TotalRows
## 1     L.    Sp. Pl. 1: 68        1753         1
```


***************

## ITIS functions

We reworked the functions that interact with the ITIS service. We still have all the same functions, but there are now a number of higher level functions that make the interface to ITIS simpler. Here are some examples:

Get references associated with names.


```r
itis_refs(c(202385, 70340))
```



```
## [[1]]
##   actualPubDate          isbn issn listedPubDate        pages
## 1    2005-10-01 0-8018-8221-4         2005-10-01         2142
## 2    1993-01-01 1-56098-217-9         1992-01-01 xviii + 1207
## 3    1981-04-03                       1981-04-03         1181
##                                      pubComment
## 1
## 2 Corrections were made to text at 3rd printing
## 3
##                                                                                    pubName
## 1  Mammal Species of the World: A Taxonomic and Geographic Reference, 3rd ed., vols. 1 & 2
## 2 Mammal Species of the World: A Taxonomic and Geographic Reference, 2nd ed., 3rd printing
## 3                                    The Mammals of North America, vols. I and II, 2nd ed.
##                   pubPlace                      publisher
## 1 Baltimore, Maryland, USA Johns Hopkins University Press
## 2      Washington, DC, USA  Smithsonian Institution Press
## 3  New York, New York, USA      John Wiley and Sons, Inc.
##                              referenceAuthor                    name
## 1 Wilson, Don E., and DeeAnn M. Reeder, eds. Ursus arctos horribilis
## 2 Wilson, Don E., and DeeAnn M. Reeder, eds. Ursus arctos horribilis
## 3                           Hall, E. Raymond Ursus arctos horribilis
##   refLanguage referredTsn title updateDate
## 1                  202385       2013-11-04
## 2                  202385       2013-11-04
## 3                  202385       2013-11-04
##
## [[2]]
##   actualPubDate          isbn      issn listedPubDate     pages pubComment
## 1    1988-01-01 0-913235-47-4 0097-0638    1988-01-01 vii + 277
## 2    1998-01-01 1-888569-01-8 0097-0638    1998-01-01       526
##                                             pubName
## 1 American Fisheries Society Special Publication 16
## 2 American Fisheries Society Special Publication 26
##                  pubPlace                  publisher
## 1 Bethesda, Maryland, USA American Fisheries Society
## 2 Bethesda, Maryland, USA American Fisheries Society
##                                                                                  referenceAuthor
## 1          Turgeon, D. D., A. E. Bogan, E. V. Coan, W. K. Emerson, W. G. Lyons, W. Pratt, et al.
## 2 Turgeon, D. D., J. F. Quinn, Jr., A. E. Bogan, E. V. Coan, F. G. Hochberg, W. G. Lyons, et al.
##                 name refLanguage referredTsn
## 1 Tulotoma magnifica                   70340
## 2 Tulotoma magnifica                   70340
##                                                                                                       title
## 1          Common and scientific names of aquatic invertebrates from the United States and Canada: mollusks
## 2 Common and scientific names of aquatic invertebrates from the United States and Canada: Mollusks, 2nd ed.
##   updateDate
## 1 2013-04-26
## 2 2013-11-04
```


Get hierarchy: full, up (immediate), and down (immediate)


```r
itis_hierarchy(tsn = 180543)
```



```
##       parentName parentTsn     rankName                 taxonName    tsn
## 1                               Kingdom                  Animalia 202423
## 2       Animalia    202423   Subkingdom                 Bilateria 914154
## 3      Bilateria    914154 Infrakingdom             Deuterostomia 914156
## 4  Deuterostomia    914156       Phylum                  Chordata 158852
## 5       Chordata    158852    Subphylum                Vertebrata 331030
## 6     Vertebrata    331030  Infraphylum             Gnathostomata 914179
## 7  Gnathostomata    914179   Superclass                 Tetrapoda 914181
## 8      Tetrapoda    914181        Class                  Mammalia 179913
## 9       Mammalia    179913     Subclass                    Theria 179916
## 10        Theria    179916   Infraclass                  Eutheria 179925
## 11      Eutheria    179925        Order                 Carnivora 180539
## 12     Carnivora    180539     Suborder                Caniformia 552303
## 13    Caniformia    552303       Family                   Ursidae 180540
## 14       Ursidae    180540        Genus                     Ursus 180541
## 15         Ursus    180541      Species              Ursus arctos 180543
## 16  Ursus arctos    180543   Subspecies   Ursus arctos alascensis 726985
## 17  Ursus arctos    180543   Subspecies       Ursus arctos arctos 202383
## 18  Ursus arctos    180543   Subspecies  Ursus arctos beringianus 726986
## 19  Ursus arctos    180543   Subspecies Ursus arctos californicus 726987
## 20  Ursus arctos    180543   Subspecies     Ursus arctos collaris 726988
## 21  Ursus arctos    180543   Subspecies    Ursus arctos crowtheri 726989
## 22  Ursus arctos    180543   Subspecies        Ursus arctos dalli 726990
## 23  Ursus arctos    180543   Subspecies         Ursus arctos gyas 726991
## 24  Ursus arctos    180543   Subspecies   Ursus arctos horribilis 202385
## 25  Ursus arctos    180543   Subspecies  Ursus arctos isabellinus 622068
## 26  Ursus arctos    180543   Subspecies     Ursus arctos lasiotus 726992
## 27  Ursus arctos    180543   Subspecies Ursus arctos middendorffi 726993
## 28  Ursus arctos    180543   Subspecies    Ursus arctos pruinosus 202386
## 29  Ursus arctos    180543   Subspecies    Ursus arctos sitkensis 726994
## 30  Ursus arctos    180543   Subspecies Ursus arctos stikeenensis 726995
## 31  Ursus arctos    180543   Subspecies     Ursus arctos syriacus 726996
```



```r
itis_hierarchy(tsn = 180543, what = "up")
```



```
##   parentName parentTsn rankName    taxonName    tsn
## 1      Ursus    180541  Species Ursus arctos 180543
```



```r
itis_hierarchy(tsn = 180543, what = "down")
```



```
##      parentName parentTsn   rankName                 taxonName    tsn
## 1  Ursus arctos    180543 Subspecies       Ursus arctos arctos 202383
## 2  Ursus arctos    180543 Subspecies   Ursus arctos horribilis 202385
## 3  Ursus arctos    180543 Subspecies    Ursus arctos pruinosus 202386
## 4  Ursus arctos    180543 Subspecies  Ursus arctos isabellinus 622068
## 5  Ursus arctos    180543 Subspecies   Ursus arctos alascensis 726985
## 6  Ursus arctos    180543 Subspecies  Ursus arctos beringianus 726986
## 7  Ursus arctos    180543 Subspecies Ursus arctos californicus 726987
## 8  Ursus arctos    180543 Subspecies     Ursus arctos collaris 726988
## 9  Ursus arctos    180543 Subspecies    Ursus arctos crowtheri 726989
## 10 Ursus arctos    180543 Subspecies        Ursus arctos dalli 726990
## 11 Ursus arctos    180543 Subspecies         Ursus arctos gyas 726991
## 12 Ursus arctos    180543 Subspecies     Ursus arctos lasiotus 726992
## 13 Ursus arctos    180543 Subspecies Ursus arctos middendorffi 726993
## 14 Ursus arctos    180543 Subspecies    Ursus arctos sitkensis 726994
## 15 Ursus arctos    180543 Subspecies Ursus arctos stikeenensis 726995
## 16 Ursus arctos    180543 Subspecies     Ursus arctos syriacus 726996
```
