---
slug: taxonomy-suite
title: The rOpenSci Taxonomy Suite
date: '2017-07-27'
authors:
  - name: Scott Chamberlain
    twitter: sckottie
categories: blog
topicid: 796
tags:
  - R
  - taxonomy
  - software
  - packages
  - taxize
  - taxa
  - taxizedb
  - wikitaxa
  - binomen
  - ritis
  - worrms
  - pegax
---




## What is Taxonomy?

Taxonomy in its most general sense is [the practice and science of classification](https://en.wikipedia.org/wiki/Taxonomy_(general)). It can refer to many things. You may have heard or used the word _taxonomy_ used to indicate any sort of classification of things, whether it be companies or widgets. Here, we're talking about [biological taxonomy](https://en.wikipedia.org/wiki/Taxonomy_(biology)), the science of defining and naming groups of biological organisms.

In case you aren't familiar with the terminology, here's a brief intro.

* `species` - the term you are likely most familiar with, usually defined as a group of individuals in which any 2 individuals can produce fertile offspring, although definitions can vary.
* `genus`/`family`/`order`/`class`/`phylum`/`kingdom` -  These are nested groupings of similar species. `genus` (e.g. _Homo_) is  restrictive grouping and `kingdom` (e.g. _Animalia_) is a much more inclusive grouping. There are genera in families, families in orders, etc.
* `taxon` - a species or grouping of species. e.g. _Homo sapiens_, _Primates_, and _Animalia_ are all taxa.
* `taxa` - the plural of `taxon`.
* `taxonomic hierarchy` or `taxonomic classification` - the list of groups a species (or other taxon) belongs to. For example the taxonomic classification of humans is: `Animalia;Chordata;Mammalia;Primates;Hominidae;Homo;sapiens`

## Ubiquity and Importance of Taxonomic Names

We put a lot of time into our suite of taxonomic software for a good reason - probably all naturalists/biologists/environmental consultants/etc. will be confronted with taxonomic names in their research/work/surveys/etc. at some point or all along the way. Some people study a single species their entire career, likely having little trouble with taxonomic names - while others study entire communities or ecosystems, dealing with thousands of taxonomic names.

Taxonomic names are not only ubiquitous but are incredibly important to get right. Just as the URL points to the correct page you want to view on the internet (an incorrect URL will not get you where you want to go), taxonomic names point to the right definition/description of a taxon, leading to lots of resources increasingly online including text, images, sounds, etc. If you get the taxonomic name wrong, all information downstream is likely to be wrong.

## Why R for taxonomic names?

R is gaining in popularity in general ([TIOBE index][tiobe], [Muenchen 2017][muenchen]), and in [academia][nature]. At least in my graduate school experience ('06 - '12), most graduate students used R - despite their bosses often using other things.

Given that R is widely used among biologists that have to deal with taxonomic names, it makes a lot of sense to build taxonomic tools in R.

## rOpenSci Taxonomy Suite

We have an ever-growing suite of packages that enable users to:

* Search for taxonomic names
* Correct taxonomic names
* Embed their taxonomic names in R classes that enable powerful downstream manipulations
* Leverage dozens of taxonomic data sources

The packages:

* `taxize` - taxonomic data from many sources
* `taxizedb` - work with taxonomic SQL databases locally
* `taxa` - taxonomic classes and manipulation functions
* `binomen` - taxonomic name classes and parsing methods (getting folded into `taxa`, will be archived on CRAN soon)
* `wikitaxa` - taxonomic data from Wikipedia/Wikidata/Wikispecies
* `ritis` - get ITIS (Integrated Taxonomic Information Service) taxonomic data
* `worrms` - get WORMS (World Register of Marine Species) taxonomic data
* `pegax` - taxonomy PEG (Parsing Expression Grammar)

<br><br>

For each package below, there are 2-3 badges. One for whether the package is on CRAN
<br>
<span class="label" style="background-color:#F1C312; color:white">cran</span>
<br>
a link to source on GitHub
<br>
<span class="label" style="background-color:#3598DB; color:white">github</span>
<br>
and another for when the package is community contributed:

<span class="label" style="background-color:#19B698; color:white">community</span>

For each package we show a very brief example - all packages have much more functionality - check them out on CRAN or GitHub.

## taxize

<div class="labels">
<a href="https://cran.rstudio.com/web/packages/taxize/"><span class="label" style="background-color:#F1C312">cran</span></a> <a href="https://github.com/ropensci/taxize"><span class="label" style="background-color:#3598DB">github</span></a>
</div>

This was our first package for taxonomy. It is a one stop shop for lots of different taxonomic data sources online, including NCBI, ITIS, GBIF, EOL, IUCN, and more - up to 22 data sources now.

The canonical reference for `taxize` is the paper we published in 2013:

> Chamberlain, S. A., & Szöcs, E. (2013). taxize: taxonomic search and retrieval in R. F1000Research.

Check it out at <https://doi.org/10.12688/f1000research.2-191.v1>

We released a new version (`v0.8.8`) about a month ago (a tiny bug fix was pushed more recently (`v0.8.9`)) with some new features requested by users:

- You can now get downstream taxa from NCBI, see `ncbi_downstream` and `downstream`
- Wikipedia/Wikidata/Wikispecies are now data sources! via the `wikitaxa` package
- Now you can get IUCN IDs for taxa, see `get_iucn`
- `tax_rank` now works with many more data sources: ncbi, itis, eol, col, tropicos, gbif, nbn,
worms, natserv, and bold
- Many improvements and bug fixes

### Example

A quick example of the power of `taxize`


```r
install.packages("taxize")
```


```r
library("taxize")
```

Get WORMS identifiers for three taxa:


```r
ids <- get_wormsid(c("Platanista gangetica", "Lichenopora neapolitana", 'Gadus morhua'))
```

Get classifications for each taxon


```r
clazz <- classification(ids, db = 'worms')
```

Combine all three into a single data.frame


```r
head(rbind(clazz))
#>            name       rank     id  query
#> 1      Animalia    Kingdom      2 254967
#> 2      Chordata     Phylum   1821 254967
#> 3    Vertebrata  Subphylum 146419 254967
#> 4 Gnathostomata Superclass   1828 254967
#> 5     Tetrapoda Superclass   1831 254967
#> 6      Mammalia      Class   1837 254967
```


## taxizedb

<div class="labels">
<a href="https://cran.rstudio.com/web/packages/taxizedb/"><span class="label" style="background-color:#F1C312">cran</span></a> <a href="https://github.com/ropensci/taxizedb"><span class="label" style="background-color:#3598DB">github</span></a>
</div>

`taxizedb` is a relatively new package. We just released a new version (`v0.1.4`) about one month ago, with fixes for the new `dplyr` version.

The sole purpose of `taxizedb` is to solve the use case where a user has a lot of taxonomic names, and thus using `taxize` is too slow. Although `taxize` is a powerful tool, every request is a transaction over the internet, and the speed of that transaction can vary from very fast to very slow, depending on three factors: data provider speed (including many things), your internet speed, and how much data you requested. `taxizedb` gets around this problem by using a local SQL database of the same stuff the data providers have, so you can get things done much faster.

The trade-off with `taxizedb` is that the interface is quite different from `taxize`.  So there is a learning curve. There are two options in `taxizedb`: you can use SQL syntax, or `dplyr` commands. I'm guessing people are more familiar with the latter.

### Example

Install `taxizedb`


```r
install.packages("taxizedb")
```


```r
library("taxizedb")
```

Here, we show working with the ITIS SQL database. Other sources work with the same workflow of function calls.

Download ITIS SQL database


```r
x <- db_download_itis()
#> downloading...
#> unzipping...
#> cleaning up...
#> [1] "/Users/sacmac/Library/Caches/R/taxizedb/ITIS.sql"
```

`db_load_tpl()` loads the SQL database into Postgres. Data sources vary in the SQL database used, see help for more.


```r
db_load_tpl(x, "<your Postgresql user name>", "your Postgresql password, if any")
```

Create a `src` object to connect to the SQL database.


```r
src <- src_itis("<your Postgresql user name>", "your Postgresql password, if any")
```

Query!


```r
library(dbplyr)
library(dplyr)
tbl(src, sql("select * from taxonomic_units limit 10"))
# Source:   SQL [?? x 26]
# Database: postgres 9.6.0 [sacmac@localhost:5432/ITIS]
     tsn unit_ind1                          unit_name1 unit_ind2 unit_name2 unit_ind3 unit_name3 unit_ind4 unit_name4
   <int>     <chr>                               <chr>     <chr>      <chr>     <chr>      <chr>     <chr>      <chr>
 1    50      <NA> Bacteria                                 <NA>       <NA>      <NA>       <NA>      <NA>       <NA>
 2    51      <NA> Schizomycetes                            <NA>       <NA>      <NA>       <NA>      <NA>       <NA>
 3    52      <NA> Archangiaceae                            <NA>       <NA>      <NA>       <NA>      <NA>       <NA>
 4    53      <NA> Pseudomonadales                          <NA>       <NA>      <NA>       <NA>      <NA>       <NA>
 5    54      <NA> Rhodobacteriineae                        <NA>       <NA>      <NA>       <NA>      <NA>       <NA>
 6    55      <NA> Pseudomonadineae                         <NA>       <NA>      <NA>       <NA>      <NA>       <NA>
 7    56      <NA> Nitrobacteraceae                         <NA>       <NA>      <NA>       <NA>      <NA>       <NA>
 8    57      <NA> Nitrobacter                              <NA>       <NA>      <NA>       <NA>      <NA>       <NA>
 9    58      <NA> Nitrobacter                              <NA>     agilis      <NA>       <NA>      <NA>       <NA>
10    59      <NA> Nitrobacter                              <NA>     flavus      <NA>       <NA>      <NA>       <NA>
# ... with more rows, and 17 more variables: unnamed_taxon_ind <chr>, name_usage <chr>, unaccept_reason <chr>,
#   credibility_rtng <chr>, completeness_rtng <chr>, currency_rating <chr>, phylo_sort_seq <int>, initial_time_stamp <dttm>,
#   parent_tsn <int>, taxon_author_id <int>, hybrid_author_id <int>, kingdom_id <int>, rank_id <int>, update_date <date>,
#   uncertain_prnt_ind <chr>, n_usage <chr>, complete_name <chr>
```


## taxa

<div class="labels">
<a href="https://cran.rstudio.com/web/packages/taxa/"><span class="label" style="background-color:#F1C312">cran</span></a> <a href="https://github.com/ropensci/taxa"><span class="label" style="background-color:#3598DB">github</span></a>
</div>

`taxa` is our newest entry (hit CRAN just a few weeks ago) into the taxonomic R package space. It defines taxonomic classes for R, and basic, but powerful manipulations on those classes.

It defines two broad types of classes: those with just taxonomic data, and a class with taxonomic data plus other associated data (such as traits, environmental data, etc.) called `taxmap`.

The `taxa` package includes functions to do various operations with these taxonomic classes. With the taxonomic classes, you can filter out or keep taxa based on various criteria. In the case of the `taxmap` class, when you filter on taxa, the associated data is filtered the same way so taxa and data are in sync.

A manuscript about `taxa` is being prepared at the moment - so look out for that.

Most of the hard work in `taxa` has been done by my co-maintainer [Zachary Foster](https://github.com/zachary-foster)!

### Example

A quick example of the power of `taxa`


```r
install.packages("taxa")
```


```r
library("taxa")
```

An example `Hierarchy` data object that comes with the package:


```r
ex_hierarchy1
#> <Hierarchy>
#>   no. taxon's:  3
#>   Poaceae / family / 4479
#>   Poa / genus / 4544
#>   Poa annua / species / 93036
```

We can remove taxa like the following, combining criteria targeting ranks, taxonomic names, or IDs:


```r
ex_hierarchy1 %>% pop(ranks("family"), ids(4544))
#> <Hierarchy>
#>   no. taxon's:  1
#>   Poa annua / species / 93036
```

An example `taxmap` class:


```r
ex_taxmap
#> <Taxmap>
#>   17 taxa: b. Mammalia ... q. lycopersicum, r. tuberosum
#>   17 edges: NA->b, NA->c, b->d ... j->o, k->p, l->q, l->r
#>   4 data sets:
#>     info:
#>       # A tibble: 6 x 4
#>           name n_legs dangerous taxon_id
#>         <fctr>  <dbl>     <lgl>    <chr>
#>       1  tiger      4      TRUE        m
#>       2    cat      4     FALSE        n
#>       3   mole      4     FALSE        o
#>       # ... with 3 more rows
#>     phylopic_ids:  e148eabb-f138-43c6-b1e4-5cda2180485a ... 63604565-0406-460b-8cb8-1abe954b3f3a
#>     foods: a list with 6 items
#>     And 1 more data sets: abund
#>   1 functions:
#>  reaction
```

Here, filter by taxonomic names to those starting with the letter `t` (notice the taxa, edgelist, and datasets have changed)


```r
filter_taxa(ex_taxmap, startsWith(taxon_names, "t"))
#> <Taxmap>
#>   3 taxa: m. tigris, o. typhlops, r. tuberosum
#>   3 edges: NA->m, NA->o, NA->r
#>   4 data sets:
#>     info:
#>       # A tibble: 3 x 4
#>           name n_legs dangerous taxon_id
#>         <fctr>  <dbl>     <lgl>    <chr>
#>       1  tiger      4      TRUE        m
#>       2   mole      4     FALSE        o
#>       3 potato      0     FALSE        r
#>     phylopic_ids:  e148eabb-f138-43c6-b1e4-5cda2180485a ... 63604565-0406-460b-8cb8-1abe954b3f3a
#>     foods: a list with 3 items
#>     And 1 more data sets: abund
#>   1 functions:
#>  reaction
```

## wikitaxa

<div class="labels">
<a href="https://cran.rstudio.com/web/packages/wikitaxa/"><span class="label" style="background-color:#F1C312">cran</span></a> <a href="https://github.com/ropensci/wikitaxa"><span class="label" style="background-color:#3598DB">github</span></a>
</div>

`wikitaxa` is a client that allows you to get taxonomic data from four different Wiki-* sites:

* Wikipedia
* Wikispecies
* Wikidata
* Wikicommons

Only Wikispecies is focused on taxonomy - for the others you could use `wikitaxa` to do any searches, but we look for and parse out taxonomic specific items in the wiki objects that are returned.

We released a new version (`v0.1.4`) earlier this year. Big thanks to [Ethan Welty](https://github.com/ezwelty) for help on this package.

`wikitaxa` is used in `taxize` to get Wiki* data.

### Example

A quick example of the power of `wikitaxa`


```r
install.packages("wikitaxa")
```


```r
library("wikitaxa")
```

Search for _Malus domestica_ (apple):


```r
res <- wt_wikispecies(name = "Malus domestica")
# links to language sites for the taxon
res$langlinks
#> # A tibble: 12 x 5
#>     lang                                                   url    langname
#>  * <chr>                                                 <chr>       <chr>
#>  1   ast        https://ast.wikipedia.org/wiki/Malus_domestica    Asturian
#>  2    es         https://es.wikipedia.org/wiki/Malus_domestica     Spanish
#>  3    hu              https://hu.wikipedia.org/wiki/Nemes_alma   Hungarian
#>  4    ia         https://ia.wikipedia.org/wiki/Malus_domestica Interlingua
#>  5    it         https://it.wikipedia.org/wiki/Malus_domestica     Italian
#>  6   nds              https://nds.wikipedia.org/wiki/Huusappel  Low German
#>  7    nl           https://nl.wikipedia.org/wiki/Appel_(plant)       Dutch
#>  8    pl https://pl.wikipedia.org/wiki/Jab%C5%82o%C5%84_domowa      Polish
#>  9   pms        https://pms.wikipedia.org/wiki/Malus_domestica Piedmontese
#> 10    pt         https://pt.wikipedia.org/wiki/Malus_domestica  Portuguese
#> 11    sk https://sk.wikipedia.org/wiki/Jablo%C5%88_dom%C3%A1ca      Slovak
#> 12    vi         https://vi.wikipedia.org/wiki/Malus_domestica  Vietnamese
#> # ... with 2 more variables: autonym <chr>, `*` <chr>
# any external links on the page
res$externallinks
#> [1] "https://web.archive.org/web/20090115062704/http://www.ars-grin.gov/cgi-bin/npgs/html/taxon.pl?104681"
# any common names, and the language they are from
res$common_names
#> # A tibble: 19 x 2
#>               name   language
#>              <chr>      <chr>
#>  1          Ябълка  български
#>  2    Poma, pomera     català
#>  3           Apfel    Deutsch
#>  4     Aed-õunapuu      eesti
#>  5           Μηλιά   Ελληνικά
#>  6           Apple    English
#>  7         Manzano    español
#>  8           Pomme   français
#>  9           Melâr     furlan
#> 10        사과나무     한국어
#> 11          ‘Āpala    Hawaiʻi
#> 12            Melo   italiano
#> 13           Aapel Nordfriisk
#> 14  Maçã, Macieira  português
#> 15 Яблоня домашняя    русский
#> 16   Tarhaomenapuu      suomi
#> 17            Elma     Türkçe
#> 18  Яблуня домашня українська
#> 19          Pomaro     vèneto
# the taxonomic hierarchy - or classification
res$classification
#> # A tibble: 8 x 2
#>          rank          name
#>         <chr>         <chr>
#> 1 Superregnum     Eukaryota
#> 2      Regnum       Plantae
#> 3      Cladus   Angiosperms
#> 4      Cladus      Eudicots
#> 5      Cladus Core eudicots
#> 6      Cladus        Rosids
#> 7      Cladus    Eurosids I
#> 8        Ordo       Rosales
```



## ritis

<div class="labels">
<a href="https://cran.rstudio.com/web/packages/ritis/"><span class="label" style="background-color:#F1C312">cran</span></a> <a href="https://github.com/ropensci/ritis"><span class="label" style="background-color:#3598DB">github</span></a>
</div>

`ritis` is a client for ITIS (Integrated Taxonomic Information Service), part of [USGS](https://www.usgs.gov/).

There's a number of different ways to get ITIS data, one of which (local SQL dump) is available in `taxizedb`, while the others are covered in `ritis`:

- SOLR web service <https://www.itis.gov/solr_documentation.html>
- RESTful web service <https://www.itis.gov/web_service.html>

The functions that use the SOLR service are: `itis_search`, `itis_facet`, `itis_group`, and `itis_highlight`.

All other functions interact with the RESTful web service.

We released a new version (`v0.5.4`) late last year.

`ritis` is used in `taxize` to get ITIS data.

### Example

A quick example of the power of `ritis`


```r
install.packages("ritis")
```


```r
library("ritis")
```

Search for blue oak ( _Quercus douglasii_ )


```r
search_scientific("Quercus douglasii")
#> # A tibble: 1 x 12
#>         author      combinedName kingdom   tsn unitInd1 unitInd2 unitInd3
#> *        <chr>             <chr>   <chr> <chr>    <lgl>    <lgl>    <lgl>
#> 1 Hook. & Arn. Quercus douglasii Plantae 19322       NA       NA       NA
#> # ... with 5 more variables: unitInd4 <lgl>, unitName1 <chr>,
#> #   unitName2 <chr>, unitName3 <lgl>, unitName4 <lgl>
```

Get taxonomic hierarchy down from the Oak genus - that is, since it's a genus, get all species in the Oak genus


```r
res <- search_scientific("Quercus")
hierarchy_down(res[1,]$tsn)
#> # A tibble: 207 x 5
#>    parentname parenttsn rankname          taxonname   tsn
#>  *      <chr>     <chr>    <chr>              <chr> <chr>
#>  1    Quercus     19276  Species    Quercus falcata 19277
#>  2    Quercus     19276  Species     Quercus lyrata 19278
#>  3    Quercus     19276  Species  Quercus michauxii 19279
#>  4    Quercus     19276  Species      Quercus nigra 19280
#>  5    Quercus     19276  Species  Quercus palustris 19281
#>  6    Quercus     19276  Species    Quercus phellos 19282
#>  7    Quercus     19276  Species Quercus virginiana 19283
#>  8    Quercus     19276  Species Quercus macrocarpa 19287
#>  9    Quercus     19276  Species   Quercus coccinea 19288
#> 10    Quercus     19276  Species  Quercus agrifolia 19289
#> # ... with 197 more rows
```



## worrms

<div class="labels">
<a href="https://cran.rstudio.com/web/packages/worrms/"><span class="label" style="background-color:#F1C312">cran</span></a> <a href="https://github.com/ropensci/worrms"><span class="label" style="background-color:#3598DB">github</span></a>
</div>

`worrms` is a client for working with data from World Register of Marine Species (WoRMS).

WoRMS is the most authoritative list of names of all marine species globally.

We released our first version (`v0.1.0`) earlier this year.

`worrms` is used in `taxize` to get WoRMS data.

### Example

A quick example of the power of `worrms`


```r
install.packages("worrms")
```


```r
library("worrms")
```

Get taxonomic name synonyms for salmon ( _Oncorhynchus_ )


```r
xx <- wm_records_name("Oncorhynchus", fuzzy = FALSE)
wm_synonyms(id = xx$AphiaID)
#> # A tibble: 4 x 25
#>   AphiaID                                                           url
#> *   <int>                                                         <chr>
#> 1  296858 http://www.marinespecies.org/aphia.php?p=taxdetails&id=296858
#> 2  397908 http://www.marinespecies.org/aphia.php?p=taxdetails&id=397908
#> 3  397909 http://www.marinespecies.org/aphia.php?p=taxdetails&id=397909
#> 4  297397 http://www.marinespecies.org/aphia.php?p=taxdetails&id=297397
#> # ... with 23 more variables: scientificname <chr>, authority <chr>,
#> #   status <chr>, unacceptreason <chr>, rank <chr>, valid_AphiaID <int>,
#> #   valid_name <chr>, valid_authority <chr>, kingdom <chr>, phylum <chr>,
#> #   class <chr>, order <chr>, family <chr>, genus <chr>, citation <chr>,
#> #   lsid <chr>, isMarine <int>, isBrackish <lgl>, isFreshwater <lgl>,
#> #   isTerrestrial <int>, isExtinct <lgl>, match_type <chr>, modified <chr>
```


## pegax

<div class="labels">
<a href="https://github.com/ropensci/pegax"><span class="label" style="background-color:#3598DB">github</span></a>
</div>

`pegax` aims to be a powerful taxonomic name parser for R. This package started at [#runconf17](http://unconf17.ropensci.org/) - was made possible because the talented [Oliver Keyes](https://github.com/Ironholds/) created a [Parsing Expression Grammar](https://en.wikipedia.org/wiki/Parsing_expression_grammar) package for R: [piton](https://github.com/Ironholds/piton)

From `piton` PEGs are:

> a way of defining formal grammars for formatted data that allow you to identify matched structures and then take actions on them

Some great taxonomic name parsing does exist already. [Global Names Parser, gnparser](https://github.com/GlobalNamesArchitecture/gnparser) is a great effort by [Dmitry Mozzherin](https://github.com/dimus) and others. The only problem is Java does not play nice with R - thus `pegax`, implementing in C++. We'll definitely try to learn alot from the work they have done on `gnparser`.

`pegax` is not on CRAN yet.  The package is in very very early days, so expect lots of changes.

### Example

A quick example of the power of `pegax`


```r
devtools::install_github("ropenscilabs/pegax")
```


```r
library("pegax")
```

Parse out authority name


```r
authority_names("Linnaeus, 1758")
#> [1] "Linnaeus"
```

Parse out authority year


```r
authority_years("Linnaeus, 1758")
#> [1] "1758"
```

## Taxonomic adjacent packages

These packages do not primarily deal with taxonomy, but do include taxonomic data. No examples are included below, but do check out their vignettes and other documentation to get started.

### rotl

<div class="labels">
<a href="https://cran.rstudio.com/web/packages/rotl/"><span class="label" style="background-color:#F1C312">cran</span></a> <a href="https://github.com/ropensci/rotl"><span class="label" style="background-color:#3598DB">github</span></a> <span class="label" style="background-color:#19B698">community</span>
</div>

`rotl` is maintained by [Francois Michonneau](https://github.com/fmichonneau), [Joseph Brown](https://github.com/josephwb), and [David Winter](https://github.com/dwinter), and is a package to interact with the [Open Tree of Life (OTL)](https://opentreeoflife.org/). OTL main purpose is perhaps about phylogeny data, but they do have a taxonomy they maintain, and `rotl` has functions that let you access that taxonomic data.

`rotl` is used in `taxize` to get OTL data.

### rredlist

<div class="labels">
<a href="https://cran.rstudio.com/web/packages/rredlist/"><span class="label" style="background-color:#F1C312">cran</span></a> <a href="https://github.com/ropensci/rredlist"><span class="label" style="background-color:#3598DB">github</span></a>
</div>

`rredlist` is an interface to the [IUCN Redlist of Threatened Species](http://www.iucnredlist.org/),

> which provides taxonomic, conservation status and distribution information on plants, fungi and animals that have been globally evaluated using the IUCN Red List Categories and Criteria.

`rredlist` is used in `taxize` to get IUCN Redlist Taxonomy data.


### bold

<div class="labels">
<a href="https://cran.rstudio.com/web/packages/bold/"><span class="label" style="background-color:#F1C312">cran</span></a> <a href="https://github.com/ropensci/bold"><span class="label" style="background-color:#3598DB">github</span></a>
</div>

`bold` is an interface to the [IUCN Redlist of Threatened Species](http://www.iucnredlist.org/),

> which provides taxonomic, conservation status and distribution information on plants, fungi and animals that have been globally evaluated using the IUCN Red List Categories and Criteria.

`bold` is used in `taxize` to get BOLD taxonomy data.


### rgbif

<div class="labels">
<a href="https://cran.rstudio.com/web/packages/rgbif/"><span class="label" style="background-color:#F1C312">cran</span></a> <a href="https://github.com/ropensci/rgbif"><span class="label" style="background-color:#3598DB">github</span></a>
</div>

`rgbif` is an interface to the [Global Biodiversity Information Facility](http://www.gbif.org/), the largest provider of free and open access biodiversity data.

`rgbif` is used in `taxize` to get GBIF taxonomy data.

-------

## Conclusion

Together, the rOpenSci taxonomy suite of packages make it much easier to work with taxonomy data in R. We hope you agree :)

Despite all of the above, we still have some things to work on:

* Use `taxa` taxonomy classes where appropriate. We plan to deploy `taxa` classes inside of the `taxize` package very soon, but they may be appropriate elsewhere as well. Using the same classes in many packages will make working with taxonomic data more consistent across packages.
* `taxizedb` needs to be more robust. Given that the package not only touches your file system, and for some databases depends on different SQL databases, we likely will run into many problems with various operating system + database combinations. Please do kick the tires and get back to us!
* Once `pegax` is ready for use, we'll be able to use it in many packages whenever we need to parse taxonomic names.
* They'll always be more data sources that we can potentially add to `taxize` - get in touch and let us know.


What do you think about the taxonomic suite of packages?  Anything we're missing? Anything we can be doing better with any of the packages?  Are you working on a taxonomic R package? Consider [submitting to rOpenSci](https://github.com/ropensci/software-review).




[tiobe]: https://www.tiobe.com/tiobe-index//
[nature]: http://www.nature.com/news/programming-tools-adventures-with-r-1.16609
[muenchen]: http://r4stats.com/articles/popularity/
