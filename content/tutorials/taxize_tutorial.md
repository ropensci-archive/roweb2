---
title: taxize tutorial
package_version: 0.9.0
---



`taxize` is a taxonomic toolbelt for R. `taxize` wraps APIs for a large suite of taxonomic databases availab on the web.


### Installation

First, install and load `taxize` into the R session.


```r
install.packages("taxize")
```

Or, install development version from GitHub


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropensci/taxize")
```


```r
library("taxize")
```


## Usage

### Resolve taxonomic name

This is a common task in biology. We often have a list of species names and we want to know a) if we have the most up to date names, b) if our names are spelled correctly, and c) the scientific name for a common name. One way to resolve names is via the Global Names Resolver (GNR) service provided by the [Encyclopedia of Life][eol]. Here, we are searching for two misspelled names:


```r
temp <- gnr_resolve(names = c("Helianthos annus", "Homo saapiens"))
head(temp)
```

```
#>   user_supplied_name   submitted_name         matched_name
#> 1   Helianthos annus Helianthos annus     Helianthus annus
#> 2   Helianthos annus Helianthos annus  Helianthus annus L.
#> 3   Helianthos annus Helianthos annus     Helianthus annus
#> 4   Helianthos annus Helianthos annus     Helianthus annus
#> 5   Helianthos annus Helianthos annus Helianthus annuus L.
#> 6   Helianthos annus Helianthos annus Helianthus annuus L.
#>                      data_source_title score
#> 1                                  EOL  0.75
#> 2                                  EOL  0.75
#> 3                        uBio NameBank  0.75
#> 4 Open Tree of Life Reference Taxonomy  0.75
#> 5                    Catalogue of Life  0.75
#> 6                                 ITIS  0.75
```

The correct spellings are *Helianthus annuus* and *Homo sapiens*.

Another common use case is when there are many synonyms for a species. In this example, we have three synonyms of the currently accepted name for a species.


```r
mynames <- c("Helianthus annuus ssp. jaegeri", "Helianthus annuus ssp. lenticularis", "Helianthus annuus ssp. texanus")
(tsn <- get_tsn(mynames, accepted = FALSE))
```

```
[1] "525928" "525929" "525930"
attr(,"match")
[1] "found" "found" "found"
attr(,"multiple_matches")
[1] FALSE FALSE FALSE
attr(,"pattern_match")
[1] FALSE FALSE FALSE
attr(,"uri")
[1] "http://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value=525928"
[2] "http://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value=525929"
[3] "http://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value=525930"
attr(,"class")
[1] "tsn"
```

```r
lapply(tsn, itis_acceptname)
```

```
[[1]]
  submittedtsn      acceptedname acceptedtsn author
1       525928 Helianthus annuus       36616     L.

[[2]]
  submittedtsn      acceptedname acceptedtsn author
1       525929 Helianthus annuus       36616     L.

[[3]]
  submittedtsn      acceptedname acceptedtsn author
1       525930 Helianthus annuus       36616     L.
```

### Retrieve higher taxonomic names

Another task biologists often face is getting higher taxonomic names for a taxa list. Having the higher taxonomy allows you to put into context the relationships of your species list. For example, you may find out that species A and species B are in Family C, which may lead to some interesting insight, as opposed to not knowing that Species A and B are closely related. This also makes it easy to aggregate/standardize data to a specific taxonomic level (e.g., family level) or to match data to other databases with different taxonomic resolution (e.g., trait databases).

A number of data sources in taxize provide the capability to retrieve higher taxonomic names, but we will highlight two of the more useful ones: [Integrated Taxonomic Information System (ITIS)][itis] and [National Center for Biotechnology Information (NCBI)][ncbi]. First, we'll search for two species, *Abies procera} and *Pinus contorta* within ITIS.


```r
specieslist <- c("Abies procera","Pinus contorta")
classification(specieslist, db = 'itis')
```

```
#>      tsn                        target
#> 1 183327                Pinus contorta
#> 2 183332 Pinus contorta ssp. bolanderi
#> 3 822698  Pinus contorta ssp. contorta
#> 4 183329 Pinus contorta ssp. latifolia
#> 5 183330 Pinus contorta ssp. murrayana
#> 6 529672 Pinus contorta var. bolanderi
#> 7 183328  Pinus contorta var. contorta
#> 8 529673 Pinus contorta var. latifolia
#> 9 529674 Pinus contorta var. murrayana
#>                                                        commonNames
#> 1               scrub pine,shore pine,tamarack pine,lodgepole pine
#> 2                                            Bolander's beach pine
#> 3                                                               NA
#> 4                         black pine,Rocky Mountain lodgepole pine
#> 5                              tamarack pine,Sierra lodgepole pine
#> 6                                              Bolander beach pine
#> 7                  coast pine,lodgepole pine,beach pine,shore pine
#> 8 tall lodgepole pine,lodgepole pine,Rocky Mountain lodgepole pine
#> 9      Murray's lodgepole pine,Sierra lodgepole pine,tamarack pine
#>      nameUsage
#> 1     accepted
#> 2 not accepted
#> 3 not accepted
#> 4 not accepted
#> 5 not accepted
#> 6     accepted
#> 7     accepted
#> 8     accepted
#> 9     accepted
```

```
#> $`Abies procera`
#>               name          rank     id
#> 1          Plantae       kingdom 202422
#> 2    Viridiplantae    subkingdom 954898
#> 3     Streptophyta  infrakingdom 846494
#> 4      Embryophyta superdivision 954900
#> 5     Tracheophyta      division 846496
#> 6  Spermatophytina   subdivision 846504
#> 7        Pinopsida         class 500009
#> 8          Pinidae      subclass 954916
#> 9          Pinales         order 500028
#> 10        Pinaceae        family  18030
#> 11           Abies         genus  18031
#> 12   Abies procera       species 181835
#>
#> $`Pinus contorta`
#>               name          rank     id
#> 1          Plantae       kingdom 202422
#> 2    Viridiplantae    subkingdom 954898
#> 3     Streptophyta  infrakingdom 846494
#> 4      Embryophyta superdivision 954900
#> 5     Tracheophyta      division 846496
#> 6  Spermatophytina   subdivision 846504
#> 7        Pinopsida         class 500009
#> 8          Pinidae      subclass 954916
#> 9          Pinales         order 500028
#> 10        Pinaceae        family  18030
#> 11           Pinus         genus  18035
#> 12  Pinus contorta       species 183327
#>
#> attr(,"class")
#> [1] "classification"
#> attr(,"db")
#> [1] "itis"
```

It turns out both species are in the family Pinaceae. You can also get this type of information from the NCBI by doing `classification(specieslist, db = 'ncbi')`.

Instead of a full classification, you may only want a single name, say a family name for your species of interest. The function *tax_name} is built just for this purpose. As with the `classification` function you can specify the data source with the `db` argument, either ITIS or NCBI.


```r
tax_name(query = "Helianthus annuus", get = "family", db = "ncbi")
```

```
#>     db             query     family
#> 1 ncbi Helianthus annuus Asteraceae
```

I may happen that a data source does not provide information on the queried species, than one could take the result from another source and union the results from the different sources.

### Interactive name selection

As mentioned most databases use a numeric code to reference a species. A general workflow in taxize is: Retrieve Code for the queried species and then use this code to query more data/information.

Below are a few examples. When you run these examples in R, you are presented with a command prompt asking for the row that contains the name you would like back; that output is not printed below for brevity. In this example, the search term has many matches. The function returns a data frame of the matches, and asks for the user to input what row number to accept.


```r
get_uid(sciname = "Pinus")
```

```
#>   status     rank    division scientificname commonname    uid genus
#> 1 active subgenus seed plants          Pinus hard pines 139271
#> 2 active    genus seed plants          Pinus              3337
#>   species subsp modificationdate
#> 1               2015/09/16 00:00
#> 2               2004/09/10 00:00
```

```
#> [1] "139271"
#> attr(,"class")
#> [1] "uid"
#> attr(,"match")
#> [1] "found"
#> attr(,"multiple_matches")
#> [1] TRUE
#> attr(,"pattern_match")
#> [1] FALSE
#> attr(,"uri")
#> [1] "https://www.ncbi.nlm.nih.gov/taxonomy/139271"
```

In another example, you can pass in a long character vector of taxonomic names (although this one is rather short for demo purposes):


```r
splist <- c("annona cherimola", 'annona muricata', "quercus robur")
get_tsn(searchterm = splist, searchtype = "scientific")
```

```
#>      tsn                      target commonNames    nameUsage
#> 1  19405               Quercus robur English oak     accepted
#> 2 845209 Quercus robur f. fastigiata          NA not accepted
```

```
#> [1] "506198" "18098"  "19405"
#> attr(,"match")
#> [1] "found" "found" "found"
#> attr(,"multiple_matches")
#> [1] FALSE FALSE  TRUE
#> attr(,"pattern_match")
#> [1] FALSE FALSE FALSE
#> attr(,"uri")
#> [1] "http://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value=506198"
#> [2] "http://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value=18098"
#> [3] "http://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value=19405"
#> attr(,"class")
#> [1] "tsn"
```

There are functions for many other sources

* `get_boldid()`
* `get_colid()`
* `get_eolid()`
* `get_gbifid()`
* `get_nbnid()`
* `get_tpsid()`

Sometimes with these functions you get a lot of data back. In these cases you may want to limit your choices. Soon we will incorporate the ability to filter using `regex` to limit matches, but for now, we have a new parameter, `rows`, which lets you select certain rows. For example, you can select the first row of each given name, which means there is no interactive component:


```r
get_nbnid(c("Zootoca vivipara","Pinus contorta"), rows = 1)
```

```
#> [1] "NHMSYS0001706186" "NBNSYS0000004786"
#> attr(,"class")
#> [1] "nbnid"
#> attr(,"match")
#> [1] "found" "found"
#> attr(,"multiple_matches")
#> [1] TRUE TRUE
#> attr(,"pattern_match")
#> [1] FALSE FALSE
#> attr(,"uri")
#> [1] "https://species.nbnatlas.org/species/NHMSYS0001706186"
#> [2] "https://species.nbnatlas.org/species/NBNSYS0000004786"
```

Or you can select a range of rows


```r
get_nbnid(c("Zootoca vivipara","Pinus contorta"), rows = 1:3)
```

```
#>              nbnid                    scientificName       rank
#> 1 NHMSYS0001706186                  Zootoca vivipara    species
#> 2 NHMSYS0020784960 Zootoca vivipara subsp. pannonica subspecies
#> 3 NHMSYS0020233881               Chaetozone vivipara    species
#>   taxonomicStatus
#> 1        accepted
#> 2        accepted
#> 3        accepted
#>              nbnid                scientificName    rank taxonomicStatus
#> 1 NBNSYS0000004786                Pinus contorta species        accepted
#> 2 NHMSYS0000494858 Pinus contorta var. murrayana variety        accepted
#> 3 NHMSYS0000494848  Pinus contorta var. contorta variety        accepted
```

```
#> [1] "NHMSYS0001706186" "NBNSYS0000004786"
#> attr(,"class")
#> [1] "nbnid"
#> attr(,"match")
#> [1] "found" "found"
#> attr(,"multiple_matches")
#> [1] TRUE TRUE
#> attr(,"pattern_match")
#> [1] FALSE FALSE
#> attr(,"uri")
#> [1] "https://species.nbnatlas.org/species/NHMSYS0001706186"
#> [2] "https://species.nbnatlas.org/species/NBNSYS0000004786"
```

In addition, in case you don't want to do interactive name selection in the case where there are a lot of names, you can get all data back with functions of the form, e.g., `get_tsn_()`, and likewise for other data sources. For example:


```r
out <- get_nbnid_("Poa annua")
NROW(out$`Poa annua`)
```

```
#> [1] 25
```

That's a lot of data, so we can get only certain rows back


```r
get_nbnid_("Poa annua", rows = 1:10)
```

```
#> $`Poa annua`
#>                guid    scientificName    rank taxonomicStatus
#> 1  NBNSYS0000002544         Poa annua species        accepted
#> 2  NBNSYS0200003392  Triumfetta annua species        accepted
#> 3  NBNSYS0000002918     Lunaria annua species        accepted
#> 4  NBNSYS0200001901      Bellis annua species        accepted
#> 5  NBNSYS0000033325   Artemisia annua species        accepted
#> 6  NHMSYS0000456951 Carrichtera annua species        accepted
#> 7  NBNSYS0200002555       Lonas annua species        accepted
#> 8  NBNSYS0200002917         Poa ampla species        accepted
#> 9  NBNSYS0200002926  Poa schimperiana species        accepted
#> 10 NBNSYS0200002923    Poa leptoclada species        accepted
```

### Coerce numerics/alphanumerics to taxon IDs

We've also introduced in `v0.5` the ability to coerce numerics and alphanumerics to taxonomic ID classes that are usually only retrieved via `get_*()` functions.

For example, adfafd


```r
as.gbifid(get_gbifid("Poa annua")) # already a uid, returns the same
```

```
#>    gbifid             scientificname    rank   status matchtype
#> 1 2704179               Poa annua L. species ACCEPTED     EXACT
#> 2 8422205 Poa annua Cham. & Schltdl. species  SYNONYM     EXACT
#> 3 7730008           Poa annua Steud. species DOUBTFUL     EXACT
```

```
#> [1] "2704179"
#> attr(,"class")
#> [1] "gbifid"
#> attr(,"match")
#> [1] "found"
#> attr(,"multiple_matches")
#> [1] TRUE
#> attr(,"pattern_match")
#> [1] FALSE
#> attr(,"uri")
#> [1] "http://www.gbif.org/species/2704179"
```

```r
as.gbifid(2704179) # numeric
```

```
#> [1] "2704179"
#> attr(,"class")
#> [1] "gbifid"
#> attr(,"match")
#> [1] "found"
#> attr(,"multiple_matches")
#> [1] FALSE
#> attr(,"pattern_match")
#> [1] FALSE
#> attr(,"uri")
#> [1] "http://www.gbif.org/species/2704179"
```

```r
as.gbifid("2704179") # character
```

```
#> [1] "2704179"
#> attr(,"class")
#> [1] "gbifid"
#> attr(,"match")
#> [1] "found"
#> attr(,"multiple_matches")
#> [1] FALSE
#> attr(,"pattern_match")
#> [1] FALSE
#> attr(,"uri")
#> [1] "http://www.gbif.org/species/2704179"
```

```r
as.gbifid(list("2704179","2435099","3171445")) # list, either numeric or character
```

```
#> [1] "2704179" "2435099" "3171445"
#> attr(,"class")
#> [1] "gbifid"
#> attr(,"match")
#> [1] "found" "found" "found"
#> attr(,"multiple_matches")
#> [1] FALSE FALSE FALSE
#> attr(,"pattern_match")
#> [1] FALSE FALSE FALSE
#> attr(,"uri")
#> [1] "http://www.gbif.org/species/2704179"
#> [2] "http://www.gbif.org/species/2435099"
#> [3] "http://www.gbif.org/species/3171445"
```

These `as.*()` functions do a quick check of the web resource to make sure it's a real ID. However, you can turn this check off, making this coercion much faster:


```r
system.time( replicate(3, as.gbifid(c("2704179","2435099","3171445"), check=TRUE)) )
```

```
#>    user  system elapsed
#>   0.081   0.002   1.776
```

```r
system.time( replicate(3, as.gbifid(c("2704179","2435099","3171445"), check=FALSE)) )
```

```
#>    user  system elapsed
#>   0.004   0.000   0.003
```

### What taxa are downstream of my taxon of interest?

If someone is not a taxonomic specialist on a particular taxon he likely does not know what children taxa are within a family, or within a genus. This task becomes especially unwieldy when there are a large number of taxa downstream. You can of course go to a website like [Wikispecies][wikispecies] or [Encyclopedia of Life][eol] to get downstream names. However, taxize provides an easy way to programatically search for downstream taxa, both for the [Catalogue of Life (CoL)][col] and the [Integrated Taxonomic Information System][itis]. Here is a short example using the CoL in which we want to find all the species within the genus *Apis* (honey bees).


```r
downstream("Apis", downto = "Species", db = "col")
```

```
#>                     name    rank                            colid
#> 1                   Apis   genus 015be25f6b061ba517f495394b80f108
#> 2      Actinomadura apis species 1182a102a18b40aa19385bf5f1f53367
#> 3    Anisocentropus apis species 8891d18874dde14e44df52e931c44206
#> 4     Apis andreniformis species 7a4a38c5095963949d6d6ec917d471de
#> 5            Apis cerana species 39610a4ceff7e5244e334a3fbc5e47e5
#> 6           Apis dorsata species e1d4cbf3872c6c310b7a1c17ddd00ebc
#> 7            Apis florea species 92dca82a063fedd1da94b3f3972d7b22
#> 8     Apis koschevnikovi species 4bbc06b9dfbde0b72c619810b564c6e6
#> 9         Apis mellifera species 67cbbcf92cd60748759e58e802d98518
#> 10      Apis nigrocincta species 213668a26ba6d2aad9575218f10d422f
#>          name_status  kingdom              family              acc_name
#> 1      accepted name Animalia              Apidae                  <NA>
#> 2      accepted name Bacteria Thermomonosporaceae                  <NA>
#> 3      accepted name Animalia     Calamoceratidae                  <NA>
#> 4      accepted name Animalia              Apidae                  <NA>
#> 5      accepted name Animalia              Apidae                  <NA>
#> 6      accepted name Animalia              Apidae                  <NA>
#> 7      accepted name Animalia              Apidae                  <NA>
#> 8      accepted name Animalia              Apidae                  <NA>
#> 9      accepted name Animalia              Apidae                  <NA>
#> 10     accepted name Animalia              Apidae                  <NA>
...
```

```
#> $Apis
#>                       childtaxa_id     childtaxa_name childtaxa_rank
#> 1 7a4a38c5095963949d6d6ec917d471de Apis andreniformis        species
#> 2 39610a4ceff7e5244e334a3fbc5e47e5        Apis cerana        species
#> 3 e1d4cbf3872c6c310b7a1c17ddd00ebc       Apis dorsata        species
#> 4 92dca82a063fedd1da94b3f3972d7b22        Apis florea        species
#> 5 4bbc06b9dfbde0b72c619810b564c6e6 Apis koschevnikovi        species
#> 6 67cbbcf92cd60748759e58e802d98518     Apis mellifera        species
#> 7 213668a26ba6d2aad9575218f10d422f   Apis nigrocincta        species
#>
#> attr(,"class")
#> [1] "downstream"
#> attr(,"db")
#> [1] "col"
```

We can also request data from ITIS


```r
downstream("Apis", downto = "Species", db = "itis")
```

```
#>         tsn                                    target
#> 1    592329                 Acanthagrion latapistylum
#> 2    606339                      Acritoptila capistra
#> 3    958884                         Actinomadura apis
#> 4    633997                                 Aglaoapis
#> 5    756292                           Aglaoapis alata
#> 6    756293                     Aglaoapis brevipennis
#> 7    756294                      Aglaoapis tridentata
#> 8    166914                              Amblyapistus
#> 9    166915                     Amblyapistus binotata
#> 10   166916                 Amblyapistus macracanthus
#>                                                          commonNames
#> 1                                                                 NA
#> 2                                                                 NA
#> 3                                                                 NA
#> 4                                                                 NA
#> 5                                                                 NA
#> 6                                                                 NA
#> 7                                                                 NA
#> 8                                                                 NA
#> 9                                                       redskin fish
#> 10                                                    cockscomb fish
#>        nameUsage
#> 1          valid
#> 2          valid
#> 3          valid
#> 4          valid
#> 5          valid
#> 6          valid
#> 7          valid
#> 8        invalid
#> 9        invalid
#> 10       invalid
```

```
#> $Apis
#>       tsn parentname parenttsn taxonname  rankid rankname
#> 1 No data    No data   No data   No data No data  no data
#>
#> attr(,"class")
#> [1] "downstream"
#> attr(,"db")
#> [1] "itis"
```

### Direct children

You may sometimes only want the direct children. We got you covered on that front, with methods for ITIS, NCBI, and Catalogue of Life. For example, let's get direct children (species in this case) of the bee genus _Apis_ using COL data:


```r
children(get_colid("Apis"))
```

```
#>                     name    rank                            colid
#> 1                   Apis   genus 015be25f6b061ba517f495394b80f108
#> 2      Actinomadura apis species 1182a102a18b40aa19385bf5f1f53367
#> 3    Anisocentropus apis species 8891d18874dde14e44df52e931c44206
#> 4     Apis andreniformis species 7a4a38c5095963949d6d6ec917d471de
#> 5            Apis cerana species 39610a4ceff7e5244e334a3fbc5e47e5
#> 6           Apis dorsata species e1d4cbf3872c6c310b7a1c17ddd00ebc
#> 7            Apis florea species 92dca82a063fedd1da94b3f3972d7b22
#> 8     Apis koschevnikovi species 4bbc06b9dfbde0b72c619810b564c6e6
#> 9         Apis mellifera species 67cbbcf92cd60748759e58e802d98518
#> 10      Apis nigrocincta species 213668a26ba6d2aad9575218f10d422f
#> 11      Ascosphaera apis species 088549f2fb602367e84d5ffdb8c1d4fc
#> 12          Candida apis species 3219a9635d3438e8b76a645cecf87287
#> 13        Eristalis apis species 16d7c8023308d38f6bb831ed5fa82002
#> 14           Hister apis species d2d7483acf488b5ed932f49b0aa51d19
#> 15        Ifephylus apis species 9b4d00e009b58bbfc003b51bd3d0c6f0
#> 16  Impatiens nidus-apis species 6aecf448e6aa0cb46387066db94426d1
#> 17      Kirkaldykra apis species 70a68f13454abd937aabf56746f4a6ad
#> 18          Mallota apis species 10c3c3921d2ea9f9425ef9fd41914520
#> 19 Melanosella mors-apis species 4ac238f1597847dbc7998d97b8d45a0e
#> 20         Microdon apis species 9be92242562eb923e711dc24b7bbab9a
#> 21           Nosema apis species 5b2838dfd0ec15844fc6f659f7580322
#> 22       Scutirodes apis species 164ab3ac910547bc945cdbb994be1ee5
#> 23      Spiroplasma apis species 789f91571ce55de4df9821f2d05efab0
#> 24   Trichomonascus apis species 17dc4d840323e2c5b87e67a952f6dff3
#> 25       Pericystis apis species 088549f2fb602367e84d5ffdb8c1d4fc
#> 26       Pericystis apis species 088549f2fb602367e84d5ffdb8c1d4fc
#> 27       Torulopsis apis species 3219a9635d3438e8b76a645cecf87287
#> 28       Torulopsis apis species 3219a9635d3438e8b76a645cecf87287
#> 29         Apis aestuans species a517bc572c3c2697fe3bbfabc46a1493
#> 30           Apis alpina species f2781627115e4212ddab5979cdd425d2
#> 31         Apis bicornis species e67e82d00faae69da173bb31f9914056
#> 32        Apis canescens species d6b8850db971d65d6079e3a22f35e10e
#> 33         Apis clypeata species 706060924801130f6c3abf454087c100
#> 34      Apis cunicularia species ebc3c5166ce2cabf419c4c6dc332cf3b
#> 35          Apis etrusca species 6d27fd39a1d8b10050ba4e331987f3c9
#> 36          Apis globosa species 254c8e847ca4ff128bba57fe94deb98d
#> 37        Apis hispanica species e8d2057a3efeb2cfdaebe27ea8191cd5
#> 38         Apis hypnorum species dfb743f54f50b9b9dbee378473542821
#> 39      Apis ichneumonea species 13c35287e20ab9373fa445dbc44981ea
#> 40        Apis lapidaria species f8da5667af3562ebc0f6a83e1ec408f0
#> 41         Apis muscorum species 5bbfe59da5ce7fe59eb9ca3a7a45916c
#> 42         Apis mystacea species fba8e4752a7fa5939a7eae293ba633ec
#> 43         Apis obsoleta species da42bcb6cc0267903fb175f8a215aecb
#> 44         Apis rostrata species e155a4277b66d1114182cafd875afbe3
#> 45         Apis rostrata species e155a4277b66d1114182cafd875afbe3
#> 46             Apis rufa species e67e82d00faae69da173bb31f9914056
#> 47          Apis signata species 551f101ad3b9bc17b24575585b2500c1
#> 48       Apis smaragdula species 4bc5c886b061e17e9aecb537a04c616d
#> 49        Apis spinulosa species 56e7e9f854c9ed31ea6d0a06567607d0
#> 50      Apis subterranea species 3d2adff364a87bf7dd30524aa8071807
#>          name_status  kingdom              family              acc_name
#> 1      accepted name Animalia              Apidae                  <NA>
#> 2      accepted name Bacteria Thermomonosporaceae                  <NA>
#> 3      accepted name Animalia     Calamoceratidae                  <NA>
#> 4      accepted name Animalia              Apidae                  <NA>
#> 5      accepted name Animalia              Apidae                  <NA>
#> 6      accepted name Animalia              Apidae                  <NA>
#> 7      accepted name Animalia              Apidae                  <NA>
#> 8      accepted name Animalia              Apidae                  <NA>
#> 9      accepted name Animalia              Apidae                  <NA>
#> 10     accepted name Animalia              Apidae                  <NA>
#> 11     accepted name    Fungi     Ascosphaeraceae                  <NA>
#> 12     accepted name    Fungi        Not assigned                  <NA>
#> 13     accepted name Animalia           Syrphidae                  <NA>
#> 14     accepted name Animalia          Histeridae                  <NA>
#> 15     accepted name Animalia             Miridae                  <NA>
#> 16     accepted name  Plantae       Balsaminaceae                  <NA>
#> 17     accepted name Animalia        Cicadellidae                  <NA>
#> 18     accepted name Animalia           Syrphidae                  <NA>
#> 19     accepted name    Fungi        Not assigned                  <NA>
#> 20     accepted name Animalia           Syrphidae                  <NA>
#> 21     accepted name Protozoa         Nosematidae                  <NA>
#> 22     accepted name Animalia           Noctuidae                  <NA>
#> 23     accepted name Bacteria   Spiroplasmataceae                  <NA>
#> 24     accepted name    Fungi   Trichomonascaceae                  <NA>
#> 25 ambiguous synonym     <NA>                <NA>      Ascosphaera apis
#> 26 ambiguous synonym     <NA>                <NA>      Ascosphaera apis
#> 27 ambiguous synonym     <NA>                <NA>          Candida apis
#> 28 ambiguous synonym     <NA>                <NA>          Candida apis
#> 29           synonym     <NA>                <NA>     Xylocopa aestuans
#> 30           synonym     <NA>                <NA>        Bombus alpinus
#> 31           synonym     <NA>                <NA>            Osmia rufa
#> 32           synonym     <NA>                <NA>      Bembix canescens
#> 33           synonym     <NA>                <NA>      Lestica clypeata
#> 34           synonym     <NA>                <NA> Colletes cunicularius
#> 35           synonym     <NA>                <NA>     Tachytes etruscus
#> 36           synonym     <NA>                <NA>   Exomalopsis similis
#> 37           synonym     <NA>                <NA> Tachytes freygessneri
#> 38           synonym     <NA>                <NA>       Bombus hypnorum
#> 39           synonym     <NA>                <NA>    Sphex ichneumoneus
#> 40           synonym     <NA>                <NA>     Bombus lapidarius
#> 41           synonym     <NA>                <NA>       Bombus muscorum
#> 42           synonym     <NA>                <NA> Argogorytes mystaceus
#> 43           synonym     <NA>                <NA>    Tachytes obsoletus
#> 44           synonym     <NA>                <NA>       Bembix rostrata
#> 45           synonym     <NA>                <NA>       Bembix rostrata
#> 46           synonym     <NA>                <NA>            Osmia rufa
#> 47           synonym     <NA>                <NA>       Stictia signata
#> 48           synonym     <NA>                <NA>   Ceratina smaragdula
#> 49           synonym     <NA>                <NA>   Hoplosmia spinulosa
#> 50           synonym     <NA>                <NA>   Bombus subterraneus
```

```
#> $`015be25f6b061ba517f495394b80f108`
#>                       childtaxa_id     childtaxa_name childtaxa_rank
#> 1 7a4a38c5095963949d6d6ec917d471de Apis andreniformis        species
#> 2 39610a4ceff7e5244e334a3fbc5e47e5        Apis cerana        species
#> 3 e1d4cbf3872c6c310b7a1c17ddd00ebc       Apis dorsata        species
#> 4 92dca82a063fedd1da94b3f3972d7b22        Apis florea        species
#> 5 4bbc06b9dfbde0b72c619810b564c6e6 Apis koschevnikovi        species
#> 6 67cbbcf92cd60748759e58e802d98518     Apis mellifera        species
#> 7 213668a26ba6d2aad9575218f10d422f   Apis nigrocincta        species
#>
#> attr(,"class")
#> [1] "children"
#> attr(,"db")
#> [1] "col"
```

The direct children (genera in this case) of _Pinaceae_ using NCBI data:


```r
children("Pinaceae", db = "ncbi")
```

```
#> $Pinaceae
#>    childtaxa_id childtaxa_name childtaxa_rank
#> 1        123600     Nothotsuga          genus
#> 2         64685        Cathaya          genus
#> 3          3358          Tsuga          genus
#> 4          3356    Pseudotsuga          genus
#> 5          3354    Pseudolarix          genus
#> 6          3337          Pinus          genus
#> 7          3328          Picea          genus
#> 8          3325          Larix          genus
#> 9          3323     Keteleeria          genus
#> 10         3321         Cedrus          genus
#> 11         3319          Abies          genus
#>
#> attr(,"class")
#> [1] "children"
#> attr(,"db")
#> [1] "ncbi"
```

### Get NCBI ID from GenBank Ids

With accession numbers


```r
genbank2uid(id = 'AJ748748')
```

```
#> [1] "282199"
#> attr(,"class")
#> [1] "uid"
#> attr(,"match")
#> [1] "found"
#> attr(,"multiple_matches")
#> [1] FALSE
#> attr(,"pattern_match")
#> [1] FALSE
#> attr(,"uri")
#> [1] "http://www.ncbi.nlm.nih.gov/taxonomy/282199"
```

With gi numbers


```r
genbank2uid(id = 62689767)
```

```
#> [1] "282199"
#> attr(,"class")
#> [1] "uid"
#> attr(,"match")
#> [1] "found"
#> attr(,"multiple_matches")
#> [1] FALSE
#> attr(,"pattern_match")
#> [1] FALSE
#> attr(,"uri")
#> [1] "http://www.ncbi.nlm.nih.gov/taxonomy/282199"
```


### Citing

To cite `taxize` in publications use:

<br>

> Scott Chamberlain and Eduard Szocs (2013). taxize - taxonomic search and retrieval in R. F1000Research, 2:191. URL: http://f1000research.com/articles/2-191/v2.

> Scott Chamberlain, Eduard Szocs, Carl Boettiger, Karthik Ram, Ignasi
  Bartomeus, John Baumgartner, Zachary Foster, James O'Donnell, and
  Jari Oksanen (2017). taxize: Taxonomic information from around the web. R package
  version 0.9.0. https://github.com/ropensci/taxize


### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for taxize](https://github.com/ropensci/taxize/issues?state=open)

[Back to top](#top)

[eol]: http://eol.org/
[gnr]: http://resolver.globalnames.org/
[taxosaurus]: http://api.phylotastic.org/tnrs
[ncbi]: http://www.ncbi.nlm.nih.gov/
[itis]: http://www.itis.gov/
[phylomatic]: http://phylodiversity.net/phylomatic/
[opentree]: http://blog.opentreeoflife.org/
[wikispecies]: http://species.wikimedia.org/wiki/Main_Page
[col]: http://www.catalogueoflife.org/
[iucn]: http://www.iucnredlist.org/
