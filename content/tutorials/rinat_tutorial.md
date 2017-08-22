---
title: rinat tutorial
package_version: 0.1.4
---



`rinat` is an R wrapper for iNaturalist APIs for accessing the observations. Detailed documentation of the API is available on [iNaturlaist website](http://www.inaturalist.org/pages/api+reference) and is part of our larger species occurence searching package [SPOCC](http://github.com/ropensci/spocc)

<section id="installation">

## Installation

Stable version from CRAN


```r
install.packages("rinat")
```

Or development version from CRAN


```r
install.packages("devtools")
devtools::install_github("rinat", "ropensci")
```

Load the package


```r
library("rinat")
```

<section id="usage">

## Usage


### Get observations

__Searching__

_Fuzzy search_

You can search for observations either by common or latin name.  It will search the entire iNaturalist entry, so the search below will return all entries that mention Monarch butterflies, not just entries for Monarchs.


```r
butterflies <- get_inat_obs(query = "Monarch Butterfly")
head(butterflies[,c(4:6)])
```




```r
library("ggplot2")
```


Another use for a fuzzy search is searching for a common name or habitat, e.g. searching for all observations that might occur in a vernal pool.  We can then see all the species names found.

```r
vp_obs <- get_inat_obs(query = "vernal pool")
head(vp_obs$species_guess)
```

```
#> [1] "Lasthenia glaberrima" "Mitrula elegans"      "green frog"
#> [4] "Pickerel Frog"        "Pickerel Frog"        "green frog"
```


_Taxon query_
To return only records for a specific species or taxonomic group, use the taxon option.


```r
## Return just observations in the family Plecoptera
stone_flies <- get_inat_obs(taxon = "Plecoptera")

## Return just Monarch Butterfly records
just_butterflies <- get_inat_obs(taxon = "Danaus plexippus")
```


_Bounding box search_

You can also search within a bounding box by giving a simple set of coordinates.

Search by area


```r
bounds <- c(38.44047,-125,40.86652, -121.837)
deer <- get_inat_obs(query = "Mule Deer", bounds = bounds)
```

__Other functions__



_Get information and observations by project_

You can get all the observations for a project if you know its ID or name as an intaturalist slug

Just get info about a project


```r
vt_crows <- get_inat_obs_project("crows-in-vermont", type = "info", raw = FALSE)
```

```
#> 25  Records
#> 0
```

Now get all the observations for that project


```r
vt_crows_obs <- get_inat_obs_project(vt_crows$id, type="observations")
```

```
#> 25  Records
#> 0-100
```

```r
head(vt_crows_obs[,c(1:4)])
```

```
#>       Id Species.guess       Scientific.name   Common.name
#> 1 192132 American Crow Corvus brachyrhynchos American Crow
#> 2 192169 American Crow Corvus brachyrhynchos American Crow
#> 3 192191 American Crow Corvus brachyrhynchos American Crow
#> 4 183154 American Crow Corvus brachyrhynchos American Crow
#> 5 183364 American Crow Corvus brachyrhynchos American Crow
#> 6 183130 American Crow Corvus brachyrhynchos American Crow
```



_Get observation details_

Detailed information about a specific observation can be retrieved by observation ID.  The easiest way to get the ID is from a more general search.


```r
m_obs <- get_inat_obs(query = "Monarch Butterfly")
head(get_inat_obs_id(m_obs$id[1]))
```

```
#> $id
#> [1] 1265521
#>
#> $taxon_id
#> [1] 48662
#>
#> $user_id
#> [1] 5327
#>
#> $observed_on
#> [1] "2007-09-03"
#>
#> $description
#> [1] ""
#>
#> $latitude
#> [1] "38.332463"
```

_Get all observations by user_

If you just want all the observations by a user you can download them with a user ID.  A word of warning though, this can be quite large (easily into the 1000s)


```r
m_obs <- get_inat_obs(query="Monarch Butterfly")
head(get_inat_obs_user(as.character(m_obs$user_login[1]),maxresults=20))[,1:5]
```

```
#>        scientific_name                  datetime          description
#> 1   Hericium erinaceus 2015-02-03 00:00:00 -0800
#> 2            Pleurotus 2015-01-22 00:00:00 -0800
#> 3 Sarcoscypha coccinea 2015-01-10 00:00:00 -0800
#> 4              Ramaria 2015-01-10 00:00:00 -0800
#> 5   Hygrocybe coccinea 2015-01-10 00:00:00 -0800
#> 6              Amanita 2015-01-10 00:00:00 -0800 Maybe yellow-veiled.
#>                     place_guess latitude
#> 1        Jack London State Park 38.34700
#> 2   Hood Mountain Regional Park 38.48759
#> 3 Point Reyes National Seashore 38.05419
#> 4         Salt Point State Park 38.58397
#> 5         Salt Point State Park 38.58397
#> 6         Salt Point State Park 38.58397
```

_Stats by taxa_

Basic statistics are available for taxa counts by date, date range, place ID (numeric ID), or user ID (string)

By date


```r
(counts <- get_inat_taxon_stats(date = "2010-06-14"))
```

```
#> $total
#> [1] 65
#>
#> $species_counts
#>   count taxon.id           taxon.name taxon.rank taxon.rank_level
#> 1     2    17008      Sayornis phoebe    species               10
#> 2     1    11935  Tachycineta bicolor    species               10
#> 3     1    51752     Brodiaea elegans    species               10
#> 4     1    52851     Arnica discoidea    species               10
#> 5     1    81746 Necrophila americana    species               10
#>   taxon.default_name.taxon_id taxon.default_name.lexicon
#> 1                       17008                    English
#> 2                       11935                    English
#> 3                       51752                    English
#> 4                       52851                    English
#> 5                       81746                    English
#>   taxon.default_name.is_valid taxon.default_name.id
#> 1                        TRUE                 20369
#> 2                        TRUE                 14831
#> 3                        TRUE                 82256
#> 4                        TRUE                148530
#> 5                        TRUE                211685
#>   taxon.default_name.position taxon.default_name.name
#> 1                           0          Eastern Phoebe
#> 2                           0            Tree Swallow
#> 3                           0        harvest brodiaea
#> 4                           0          rayless arnica
#> 5                           0 American Carrion Beetle
#>   taxon.default_name.created_at taxon.default_name.updated_at
#> 1 2008-03-12T20:33:20.000-07:00 2008-03-12T20:33:20.000-07:00
#> 2 2008-03-12T20:10:45.000-07:00 2008-03-12T20:10:45.000-07:00
#> 3 2009-06-08T00:00:11.000-07:00 2009-06-08T00:00:11.000-07:00
#> 4 2011-05-17T20:21:12.000-07:00 2011-05-17T20:21:12.000-07:00
#> 5 2011-10-22T04:37:44.842-07:00 2011-10-22T04:37:44.842-07:00
#>                                                  taxon.image_url
#> 1 http://farm6.staticflickr.com/5009/5346970195_d0eac9966b_s.jpg
#> 2   http://farm1.staticflickr.com/177/435466650_1ea6cb197e_s.jpg
#> 3 http://farm4.staticflickr.com/3269/2709963753_b800de8900_s.jpg
#> 4         http://static.inaturalist.org/photos/122558/square.jpg
#> 5 http://farm5.staticflickr.com/4013/4658689710_1a534b47ef_s.jpg
#>   taxon.iconic_taxon_name taxon.conservation_status_name
#> 1                    Aves                  least_concern
#> 2                    Aves                  least_concern
#> 3                 Plantae                           <NA>
#> 4                 Plantae                           <NA>
#> 5                 Insecta                           <NA>
#>
#> $rank_counts
#> $rank_counts$subspecies
#> [1] 2
#>
#> $rank_counts$variety
#> [1] 1
#>
#> $rank_counts$genus
#> [1] 4
#>
#> $rank_counts$species
#> [1] 58
```

By place_ID


```r
vt_crows <- get_inat_obs_project("crows-in-vermont", type="info", raw = FALSE)
```

```
#> 25  Records
#> 0
```

```r
place_counts <- get_inat_taxon_stats(place = vt_crows$place_id)
place_counts$total
```

```
#> [1] 4730
```

_Stats by user_

Similar statistics can be retrived for users.  The same input parameters can be used, but results returned are the top five users by species count and observation count.

By date


```r
counts <- get_inat_user_stats(date = "2010-06-14")
counts$most_observations$user[,c(1:3)]
```

```
#>       id                    login
#> 1   9706               greglasley
#> 2    357                annetanne
#> 3  10285                  finatic
#> 4  10946                cgcbosque
#> 5  64596 juancarlosgarciamorales1
#> 6  18056                 plantman
#> 7  38530              kevinhintsa
#> 8    382                  tsoleau
#> 9    873                 tapbirds
#> 10  3403                   davidr
#> 11 70352                wonder_al
#> 12  2619                 asnyder5
#> 13  1000                     muir
#> 14 12158            erikamitchell
#> 15 57533      banks_peninsula_tui
#> 16 31399               sacagewea2
#> 17  9560       dianaterryhibbitts
#> 18 11831                  halbyte
#> 19  5239                 marcellc
#> 20 10612                    zieak
#> 21 20727                ciovarnat
#> 22 16823                 jnstuart
#> 23   129               field_daze
#> 24 38442             robertgeorge
#> 25  2048                   josiah
#> 26    10                      jam
#> 27 48178                 asemerdj
#> 28  3926                pmikejack
#> 29  4857          c_michael_hogan
#> 30 65504                scottking
#> 31   206                lfelliott
#> 32 13467           paulalongshore
#> 33 10299               summermule
#> 34 13167                  arleigh
#> 35  2839                    hari2
#>                                                                     user_icon_url
#> 1    http://www.inaturalist.org/attachments/users/icons/9706-thumb.jpg?1412292583
#> 2     http://www.inaturalist.org/attachments/users/icons/357-thumb.jpg?1362061338
#> 3   http://www.inaturalist.org/attachments/users/icons/10285-thumb.jpg?1350000458
#> 4                                                                            <NA>
#> 5   http://www.inaturalist.org/attachments/users/icons/64596-thumb.jpg?1416786295
#> 6                                                                            <NA>
#> 7   http://www.inaturalist.org/attachments/users/icons/38530-thumb.jpg?1400990725
#> 8                http://www.inaturalist.org/attachments/users/icons/382-thumb.jpg
#> 9                http://www.inaturalist.org/attachments/users/icons/873-thumb.jpg
#> 10   http://www.inaturalist.org/attachments/users/icons/3403-thumb.jpg?1394954695
#> 11  http://www.inaturalist.org/attachments/users/icons/70352-thumb.jpg?1421399985
#> 12                                                                           <NA>
#> 13              http://www.inaturalist.org/attachments/users/icons/1000-thumb.jpg
#> 14 http://www.inaturalist.org/attachments/users/icons/12158-thumb.jpeg?1357418870
#> 15 http://www.inaturalist.org/attachments/users/icons/57533-thumb.jpeg?1413332307
#> 16  http://www.inaturalist.org/attachments/users/icons/31399-thumb.jpg?1398521627
#> 17  http://www.inaturalist.org/attachments/users/icons/9560-thumb.jpeg?1351261191
#> 18                                                                           <NA>
#> 19              http://www.inaturalist.org/attachments/users/icons/5239-thumb.jpg
#> 20  http://www.inaturalist.org/attachments/users/icons/10612-thumb.jpg?1375105310
#> 21  http://www.inaturalist.org/attachments/users/icons/20727-thumb.jpg?1398894069
#> 22  http://www.inaturalist.org/attachments/users/icons/16823-thumb.jpg?1383090510
#> 23               http://www.inaturalist.org/attachments/users/icons/129-thumb.jpg
#> 24  http://www.inaturalist.org/attachments/users/icons/38442-thumb.jpg?1400160213
#> 25              http://www.inaturalist.org/attachments/users/icons/2048-thumb.jpg
#> 26                                                                           <NA>
#> 27  http://www.inaturalist.org/attachments/users/icons/48178-thumb.jpg?1416364944
#> 28              http://www.inaturalist.org/attachments/users/icons/3926-thumb.jpg
#> 29              http://www.inaturalist.org/attachments/users/icons/4857-thumb.jpg
#> 30  http://www.inaturalist.org/attachments/users/icons/65504-thumb.jpg?1417720839
#> 31               http://www.inaturalist.org/attachments/users/icons/206-thumb.jpg
#> 32 http://www.inaturalist.org/attachments/users/icons/13467-thumb.jpeg?1361747141
#> 33  http://www.inaturalist.org/attachments/users/icons/10299-thumb.jpg?1350591832
#> 34  http://www.inaturalist.org/attachments/users/icons/13167-thumb.jpg?1361106538
#> 35   http://www.inaturalist.org/attachments/users/icons/2839-thumb.jpg?1398943785
```

By place_ID


```r
vt_crows <- get_inat_obs_project("crows-in-vermont", type = "info",raw = FALSE)
```

```
#> 25  Records
#> 0
```

```r
place_counts <- get_inat_user_stats(place = vt_crows$place_id)
head(place_counts$most_species$user[,c(1:3)])
```

```
#>      id         login
#> 1 12610  susanelliott
#> 2 11792     kylejones
#> 3 12158 erikamitchell
#> 4 12045      larry522
#> 5   317   kpmcfarland
#> 6  2179       charlie
#>                                                                    user_icon_url
#> 1  http://www.inaturalist.org/attachments/users/icons/12610-thumb.jpg?1390441055
#> 2  http://www.inaturalist.org/attachments/users/icons/11792-thumb.jpg?1394793142
#> 3 http://www.inaturalist.org/attachments/users/icons/12158-thumb.jpeg?1357418870
#> 4  http://www.inaturalist.org/attachments/users/icons/12045-thumb.jpg?1357252118
#> 5    http://www.inaturalist.org/attachments/users/icons/317-thumb.jpg?1373935791
#> 6   http://www.inaturalist.org/attachments/users/icons/2179-thumb.jpg?1416962625
```



<section id="citing">

## Citing

To cite `rinat` in publications use:

<br>

> Vijay Barve and Edmund Hart (2014). rinat: Access iNaturalist data through APIs. R package version 0.1.4.

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rinat](https://github.com/ropensci/rinat/issues?state=open)

[Back to top](#top)
