---
title: solrium tutorial
package_version: 0.3.0
---



`solrium` is a general purpose R interface to [Apache Solr](http://lucene.apache.org/solr/)

<section id="installation">

## Installation

Stable version from CRAN


```r
install.packages("solrium")
```

Or the development version from GitHub


```r
install.packages("devtools")
devtools::install_github("ropensci/solrium")
```

Load


```r
library("solrium")
```

<section id="usage">

## Usage

### Solr search

#### Setup connection

You can setup for a remote Solr instance or on your local machine.


```r
solr_connect('http://api.plos.org/search')
```

```
#> <solr_connection>
#>   url:    http://api.plos.org/search
#>   errors: simple
#>   verbose: TRUE
#>   proxy:
```

#### Rundown

`solr_search()` only returns the `docs` element of a Solr response body. If `docs` is
all you need, then this function will do the job. If you need facet data only, or mlt
data only, see the appropriate functions for each of those below. Another function,
`solr_all()` has a similar interface in terms of parameter as `solr_search()`, but
returns all parts of the response body, including, facets, mlt, groups, stats, etc.
as long as you request those.

#### Search docs

`solr_search()` returns only docs. A basic search:


```r
solr_search(q = '*:*', rows = 2, fl = 'id')
```

```
#> Source: local data frame [2 x 1]
#>
#>                                   id
#>                                (chr)
#> 1       10.1371/journal.pone.0142241
#> 2 10.1371/journal.pone.0142241/title
```

__Search in specific fields with `:`__

Search for word ecology in title and cell in the body


```r
solr_search(q = 'title:"ecology" AND body:"cell"', fl = 'title', rows = 5)
```

```
#> Source: local data frame [5 x 1]
#>
#>                                                       title
#>                                                       (chr)
#> 1                        The Ecology of Collective Behavior
#> 2                                   Ecology's Big, Hot Idea
#> 3     Spatial Ecology of Bacteria at the Microscale in Soil
#> 4 Biofilm Formation As a Response to Ecological Competition
#> 5    Ecology of Root Colonizing Massilia (Oxalobacteraceae)
```

__Wildcards__

Search for word that starts with "cell" in the title field


```r
solr_search(q = 'title:"cell*"', fl = 'title', rows = 5)
```

```
#> Source: local data frame [5 x 1]
#>
#>                                                                         title
#>                                                                         (chr)
#> 1                                Tumor Cell Recognition Efficiency by T Cells
#> 2 Cancer Stem Cell-Like Side Population Cells in Clear Cell Renal Cell Carcin
#> 3 Dcas Supports Cell Polarization and Cell-Cell Adhesion Complexes in Develop
#> 4 MS4a4B, a CD20 Homologue in T Cells, Inhibits T Cell Propagation by Modulat
#> 5                  Cell-Cell Contact Preserves Cell Viability via Plakoglobin
```

__Proximity search__

Search for words "sports" and "alcohol" within four words of each other


```r
solr_search(q = 'everything:"stem cell"~7', fl = 'title', rows = 3)
```

```
#> Source: local data frame [3 x 1]
#>
#>                                                                         title
#>                                                                         (chr)
#> 1 Correction: Reduced Intensity Conditioning, Combined Transplantation of Hap
#> 2                                            A Recipe for Self-Renewing Brain
#> 3  Gene Expression Profile Created for Mouse Stem Cells and Developing Embryo
```

__Range searches__

Search for articles with Twitter count between 5 and 10


```r
solr_search(q = '*:*', fl = c('alm_twitterCount', 'id'), fq = 'alm_twitterCount:[5 TO 50]',
rows = 10)
```

```
#> Source: local data frame [10 x 2]
#>
#>                                                     id alm_twitterCount
#>                                                  (chr)            (int)
#> 1                         10.1371/journal.pone.0085872                9
#> 2                    10.1371/journal.pone.0085872/body                9
#> 3            10.1371/journal.pone.0085872/introduction                9
#> 4  10.1371/journal.pone.0085872/results_and_discussion                9
#> 5   10.1371/journal.pone.0085872/materials_and_methods                9
#> 6                         10.1371/journal.pone.0108178                7
#> 7                   10.1371/journal.pone.0108178/title                7
#> 8                10.1371/journal.pone.0108178/abstract                7
#> 9              10.1371/journal.pone.0108178/references                7
#> 10                   10.1371/journal.pone.0108178/body                7
```

__Boosts__

Assign higher boost to title matches than to body matches (compare the two calls)


```r
solr_search(q = 'title:"cell" abstract:"science"', fl = 'title', rows = 3)
```

```
#> Source: local data frame [3 x 1]
#>
#>                                                                         title
#>                                                                         (chr)
#> 1 I Want More and Better Cells! – An Outreach Project about Stem Cells and It
#> 2                                   Centre of the Cell: Science Comes to Life
#> 3 Globalization of Stem Cell Science: An Examination of Current and Past Coll
```


```r
solr_search(q = 'title:"cell"^1.5 AND abstract:"science"', fl = 'title', rows = 3)
```

```
#> Source: local data frame [3 x 1]
#>
#>                                                                         title
#>                                                                         (chr)
#> 1                                   Centre of the Cell: Science Comes to Life
#> 2 I Want More and Better Cells! – An Outreach Project about Stem Cells and It
#> 3          Derivation of Hair-Inducing Cell from Human Pluripotent Stem Cells
```

#### Search all

`solr_all()` differs from `solr_search()` in that it allows specifying facets, mlt, groups,
stats, etc, and returns all of those. It defaults to `parsetype = "list"` and `wt="json"`,
whereas `solr_search()` defaults to `parsetype = "df"` and `wt="csv"`. `solr_all()` returns
by default a list, whereas `solr_search()` by default returns a data.frame.

A basic search, just docs output


```r
solr_all(q = '*:*', rows = 2, fl = 'id')
```

```
#> $response
#> $response$numFound
#> [1] 1505603
#>
#> $response$start
#> [1] 0
#>
#> $response$docs
#> $response$docs[[1]]
#> $response$docs[[1]]$id
#> [1] "10.1371/journal.pone.0142241"
#>
#>
#> $response$docs[[2]]
#> $response$docs[[2]]$id
#> [1] "10.1371/journal.pone.0142241/title"
```

Get docs, mlt, and stats output


```r
solr_all(q = 'ecology', rows = 2, fl = 'id', mlt = 'true', mlt.count = 2, mlt.fl = 'abstract', stats = 'true', stats.field = 'counter_total_all')
```

```
#> $response
#> $response$numFound
#> [1] 31523
#>
#> $response$start
#> [1] 0
#>
#> $response$docs
#> $response$docs[[1]]
#> $response$docs[[1]]$id
#> [1] "10.1371/journal.pone.0059813"
#>
#>
#> $response$docs[[2]]
#> $response$docs[[2]]$id
#> [1] "10.1371/journal.pone.0001248"
#>
#>
#>
#>
#> $moreLikeThis
#> $moreLikeThis$`10.1371/journal.pone.0059813`
#> $moreLikeThis$`10.1371/journal.pone.0059813`$numFound
#> [1] 152983
#>
#> $moreLikeThis$`10.1371/journal.pone.0059813`$start
#> [1] 0
#>
#> $moreLikeThis$`10.1371/journal.pone.0059813`$docs
#> $moreLikeThis$`10.1371/journal.pone.0059813`$docs[[1]]
#> $moreLikeThis$`10.1371/journal.pone.0059813`$docs[[1]]$id
#> [1] "10.1371/journal.pone.0111996"
#>
#>
#> $moreLikeThis$`10.1371/journal.pone.0059813`$docs[[2]]
#> $moreLikeThis$`10.1371/journal.pone.0059813`$docs[[2]]$id
#> [1] "10.1371/journal.pone.0143687"
#>
#>
#>
#>
#> $moreLikeThis$`10.1371/journal.pone.0001248`
#> $moreLikeThis$`10.1371/journal.pone.0001248`$numFound
#> [1] 159342
#>
#> $moreLikeThis$`10.1371/journal.pone.0001248`$start
#> [1] 0
#>
#> $moreLikeThis$`10.1371/journal.pone.0001248`$docs
#> $moreLikeThis$`10.1371/journal.pone.0001248`$docs[[1]]
#> $moreLikeThis$`10.1371/journal.pone.0001248`$docs[[1]]$id
#> [1] "10.1371/journal.pone.0001275"
#>
#>
#> $moreLikeThis$`10.1371/journal.pone.0001248`$docs[[2]]
#> $moreLikeThis$`10.1371/journal.pone.0001248`$docs[[2]]$id
#> [1] "10.1371/journal.pone.0024192"
#>
#>
#>
#>
#>
#> $stats
#> $stats$stats_fields
#> $stats$stats_fields$counter_total_all
#> $stats$stats_fields$counter_total_all$min
#> [1] 0
#>
#> $stats$stats_fields$counter_total_all$max
#> [1] 368015
#>
#> $stats$stats_fields$counter_total_all$count
#> [1] 31523
#>
#> $stats$stats_fields$counter_total_all$missing
#> [1] 0
#>
#> $stats$stats_fields$counter_total_all$sum
#> [1] 141705919
#>
#> $stats$stats_fields$counter_total_all$sumOfSquares
#> [1] 3.169268e+12
#>
#> $stats$stats_fields$counter_total_all$mean
#> [1] 4495.318
#>
#> $stats$stats_fields$counter_total_all$stddev
#> [1] 8962.864
#>
#> $stats$stats_fields$counter_total_all$facets
#> named list()
```


#### Facet


```r
solr_facet(q = '*:*', facet.field = 'journal', facet.query = c('cell', 'bird'))
```

```
#> $facet_queries
#>   term  value
#> 1 cell 128838
#> 2 bird  13095
#>
#> $facet_fields
#> $facet_fields$journal
#>                                 X1      X2
#> 1                         plos one 1236240
#> 2                    plos genetics   49331
#> 3                   plos pathogens   42853
#> 4       plos computational biology   36391
#> 5 plos neglected tropical diseases   33991
#> 6                     plos biology   28753
#> 7                    plos medicine   19957
#> 8             plos clinical trials     521
#> 9                     plos medicin       9
#>
#>
#> $facet_pivot
#> NULL
#>
#> $facet_dates
#> NULL
#>
#> $facet_ranges
#> NULL
```

#### Highlight


```r
solr_highlight(q = 'alcohol', hl.fl = 'abstract', rows = 2)
```

```
#> $`10.1371/journal.pmed.0040151`
#> $`10.1371/journal.pmed.0040151`$abstract
#> [1] "Background: <em>Alcohol</em> consumption causes an estimated 4% of the global disease burden, prompting"
#>
#>
#> $`10.1371/journal.pone.0027752`
#> $`10.1371/journal.pone.0027752`$abstract
#> [1] "Background: The negative influences of <em>alcohol</em> on TB management with regard to delays in seeking"
```

#### Stats


```r
out <- solr_stats(q = 'ecology', stats.field = c('counter_total_all', 'alm_twitterCount'), stats.facet = c('journal', 'volume'))
```


```r
out$data
```

```
#>                   min    max count missing       sum sumOfSquares
#> counter_total_all   0 368015 31523       0 141705919 3.169268e+12
#> alm_twitterCount    0   1756 31523       0    168996 3.277982e+07
#>                          mean     stddev
#> counter_total_all 4495.318307 8962.86436
#> alm_twitterCount     5.361038   31.79876
```


```r
out$facet
```

```
#> $counter_total_all
#> $counter_total_all$volume
#>     min    max count missing      sum sumOfSquares      mean    stddev
#> 1     0 166346   941       0  2666674  64059423768  2833.872  7752.996
#> 2   740 103659   105       0  1024186  23772918060  9754.152 11512.055
#> 3  1952  69750    69       0   706027  13818140343 10232.275  9847.273
#> 4  1001  14423     9       0    50561    406580461  5617.889  3913.668
#> 5  1871 182659    81       0  1510206  87348144472 18644.519 27200.892
#> 6  1668 117987   482       0  5838545 162659609485 12113.164 13825.190
#> 7  1340 128119   741       0  7717886 188793785566 10415.501 12103.615
#> 8   667 362492  1010       0  9697699 340690657979  9601.682 15664.231
#> 9   103 113281  1539       0 12101852 219212200772  7863.452  8980.903
#> 10   72 244134  2948       0 17709895 327671234859  6007.427  8665.255
#> 11   51 184267  4825       0 24213725 383352120687  5018.389  7367.377
#> 12   16 368015  6360       0 26395482 534025707012  4150.233  8170.212
#> 13   42 288338  6620       0 21032561 615479463617  3177.124  9104.457
#> 14    0 161868  5793       0 11040620 207978083278  1905.855  5681.101
#>    volume
#> 1      11
#> 2      12
#> 3      13
#> 4      14
#> 5       1
#> 6       2
#> 7       3
#> 8       4
#> 9       5
#> 10      6
#> 11      7
#> 12      8
#> 13      9
#> 14     10
#>
#> $counter_total_all$journal
#>    min    max count missing      sum sumOfSquares      mean    stddev
#> 1  667 117987   243       0  4077530 1.462728e+11 16779.959 17936.069
#> 2 1001 265845   884       0 14019239 5.517226e+11 15858.868 19314.215
#> 3 8463  13799     2       0    22262 2.620348e+08 11131.000  3773.122
#> 4    0 368015 25969       0 96176268 1.948962e+12  3703.503  7831.729
#> 5  922  61985   595       0  4794131 6.591271e+10  8057.363  6777.446
#> 6  815  76376   758       0  6332922 9.182935e+10  8354.778  7170.244
#> 7    0 212159  1241       0  5885535 1.011674e+11  4742.575  7686.121
#> 8  740 288338   580       0  4216858 1.415464e+11  7270.445 13838.941
#>                            journal
#> 1                    plos medicine
#> 2                     plos biology
#> 3             plos clinical trials
#> 4                         plos one
#> 5                   plos pathogens
#> 6                    plos genetics
#> 7 plos neglected tropical diseases
#> 8       plos computational biology
#>
#>
#> $alm_twitterCount
#> $alm_twitterCount$volume
#>    min  max count missing   sum sumOfSquares      mean     stddev volume
#> 1    0 1756   941       0 12434      4046744 13.213603  64.267113     11
#> 2    0 1061   105       0  6519      1921409 62.085714 120.761694     12
#> 3    0  283    69       0  3487       509935 50.536232  70.054092     13
#> 4    8  338     9       0   721       142819 80.111111 103.113341     14
#> 5    0   42    81       0   177         5001  2.185185   7.594589      1
#> 6    0   87   482       0   696        22972  1.443983   6.757915      2
#> 7    0   48   741       0   652        11036  0.879892   3.760087      3
#> 8    0  239  1010       0  1042        75008  1.031683   8.559996      4
#> 9    0  126  1539       0  1906        90496  1.238467   7.570023      5
#> 10   0  887  2948       0  4363      1247307  1.479986  20.519631      6
#> 11   0  822  4825       0 19648      2037668  4.072124  20.144888      7
#> 12   0 1503  6360       0 35945      6507435  5.651730  31.486433      8
#> 13   0 1539  6620       0 49857     12852975  7.531269  43.417759      9
#> 14   0  863  5793       0 31549      3309017  5.446056  23.273237     10
#>
#> $alm_twitterCount$journal
#>   min  max count missing    sum sumOfSquares      mean   stddev
#> 1   0  777   243       0   4262      1028972 17.539095 62.79378
#> 2   0 1756   884       0  16570      6170914 18.744344 81.46674
#> 3   0    3     2       0      3            9  1.500000  2.12132
#> 4   0 1539 25969       0 123579     23533715  4.758712 29.72561
#> 5   0  122   595       0   4267       160645  7.171429 14.79629
#> 6   0  179   758       0   4304       149338  5.678100 12.84495
#> 7   0  887  1241       0   4992      1052826  4.022562 28.85930
#> 8   0  285   580       0   4181       267459  7.208621 20.24546
#>                            journal
#> 1                    plos medicine
#> 2                     plos biology
#> 3             plos clinical trials
#> 4                         plos one
#> 5                   plos pathogens
#> 6                    plos genetics
#> 7 plos neglected tropical diseases
#> 8       plos computational biology
```

#### More like this

`solr_mlt` is a function to return similar documents to the one


```r
out <- solr_mlt(q = 'title:"ecology" AND body:"cell"', mlt.fl = 'title', mlt.mindf = 1, mlt.mintf = 1, fl = 'counter_total_all', rows = 5)
out$docs
```

```
#> Source: local data frame [5 x 2]
#>
#>                             id counter_total_all
#>                          (chr)             (int)
#> 1 10.1371/journal.pbio.1001805             17135
#> 2 10.1371/journal.pbio.0020440             23883
#> 3 10.1371/journal.pone.0087217              5941
#> 4 10.1371/journal.pbio.1002191             13086
#> 5 10.1371/journal.pone.0040117              4327
```


```r
out$mlt
```

```
#> $`10.1371/journal.pbio.1001805`
#>                             id counter_total_all
#> 1 10.1371/journal.pone.0082578              2196
#> 2 10.1371/journal.pone.0098876              2453
#> 3 10.1371/journal.pone.0102159              1181
#> 4 10.1371/journal.pcbi.1002652              3103
#> 5 10.1371/journal.pone.0087380              1895
#>
#> $`10.1371/journal.pbio.0020440`
#>                             id counter_total_all
#> 1 10.1371/journal.pone.0102679              3113
#> 2 10.1371/journal.pone.0035964              5573
#> 3 10.1371/journal.pone.0003259              2800
#> 4 10.1371/journal.pone.0101568              2673
#> 5 10.1371/journal.pntd.0003377              3392
#>
#> $`10.1371/journal.pone.0087217`
#>                             id counter_total_all
#> 1 10.1371/journal.pone.0131665               412
#> 2 10.1371/journal.pcbi.0020092             19615
#> 3 10.1371/journal.pone.0133941               475
#> 4 10.1371/journal.pone.0123774               998
#> 5 10.1371/journal.pone.0140306               322
#>
#> $`10.1371/journal.pbio.1002191`
#>                             id counter_total_all
#> 1 10.1371/journal.pbio.1002232              1952
#> 2 10.1371/journal.pone.0131700               979
#> 3 10.1371/journal.pone.0070448              1615
#> 4 10.1371/journal.pone.0044766              2271
#> 5 10.1371/journal.pone.0144763               512
#>
#> $`10.1371/journal.pone.0040117`
#>                             id counter_total_all
#> 1 10.1371/journal.pone.0069352              2765
#> 2 10.1371/journal.pone.0148280               472
#> 3 10.1371/journal.pone.0035502              4034
#> 4 10.1371/journal.pone.0014065              5766
#> 5 10.1371/journal.pone.0113280              1984
```

#### Groups

`solr_groups()` is a function to return similar documents to the one


```r
solr_group(q = 'ecology', group.field = 'journal', group.limit = 1, fl = c('id', 'alm_twitterCount'))
```

```
#>                         groupValue numFound start
#> 1                         plos one    25969     0
#> 2       plos computational biology      580     0
#> 3                     plos biology      884     0
#> 4                             none     1251     0
#> 5                    plos medicine      243     0
#> 6 plos neglected tropical diseases     1241     0
#> 7                   plos pathogens      595     0
#> 8                    plos genetics      758     0
#> 9             plos clinical trials        2     0
#>                             id alm_twitterCount
#> 1 10.1371/journal.pone.0059813               56
#> 2 10.1371/journal.pcbi.1003594               21
#> 3 10.1371/journal.pbio.1002358               16
#> 4 10.1371/journal.pone.0046671                2
#> 5 10.1371/journal.pmed.1000303                0
#> 6 10.1371/journal.pntd.0002577                2
#> 7 10.1371/journal.ppat.1003372                2
#> 8 10.1371/journal.pgen.1001197                0
#> 9 10.1371/journal.pctr.0020010                0
```

#### Parsing

`solr_parse()` is a general purpose parser function with extension methods for parsing outputs from functions in `solr`. `solr_parse()` is used internally within functions to do parsing after retrieving data from the server. You can optionally get back raw `json`, `xml`, or `csv` with the `raw=TRUE`, and then parse afterwards with `solr_parse()`.

For example:


```r
(out <- solr_highlight(q = 'alcohol', hl.fl = 'abstract', rows = 2, raw = TRUE))
```

```
#> [1] "{\"response\":{\"numFound\":20309,\"start\":0,\"docs\":[{},{}]},\"highlighting\":{\"10.1371/journal.pmed.0040151\":{\"abstract\":[\"Background: <em>Alcohol</em> consumption causes an estimated 4% of the global disease burden, prompting\"]},\"10.1371/journal.pone.0027752\":{\"abstract\":[\"Background: The negative influences of <em>alcohol</em> on TB management with regard to delays in seeking\"]}}}\n"
#> attr(,"class")
#> [1] "sr_high"
#> attr(,"wt")
#> [1] "json"
```

Then parse


```r
solr_parse(out, 'df')
```

```
#>                          names
#> 1 10.1371/journal.pmed.0040151
#> 2 10.1371/journal.pone.0027752
#>                                                                                                    abstract
#> 1   Background: <em>Alcohol</em> consumption causes an estimated 4% of the global disease burden, prompting
#> 2 Background: The negative influences of <em>alcohol</em> on TB management with regard to delays in seeking
```




### Document management

Initialize connection. By default, you connect to `http://localhost:8983`


```r
solr_connect()
```

```
#> <solr_connection>
#>   url:    http://localhost:8983
#>   errors: simple
#>   verbose: TRUE
#>   proxy:
```

#### Create documents from R objects

For now, only lists and data.frame's supported.

#### data.frame


```r
df <- data.frame(id = c(67, 68), price = c(1000, 500000000))
add(df, "books")
```

#### list


```r
delete_by_id(1:2, "books")
```


```r
ss <- list(list(id = 1, price = 100), list(id = 2, price = 500))
add(ss, "books")
```

#### Delete documents

##### By id

Add some documents first


```r
delete_by_id(1:3, "gettingstarted")
```


```r
docs <- list(list(id = 1, price = 100, name = "brown"),
             list(id = 2, price = 500, name = "blue"),
             list(id = 3, price = 2000L, name = "pink"))
add(docs, "gettingstarted")
```

And the documents are now in your Solr database


```r
tail(solr_search(name = "gettingstarted", "*:*", base = "http://localhost:8983/solr/select", rows = 100))
```

Now delete those documents just added


```r
delete_by_id(ids = c(1, 2, 3), "gettingstarted")
```

And now they are gone


```r
tail(solr_search("gettingstarted", "*:*", base = "http://localhost:8983/solr/select", rows = 100))
```

##### By query

Add some documents first


```r
add(docs, "gettingstarted")
```

And the documents are now in your Solr database


```r
tail(solr_search("gettingstarted", "*:*", base = "http://localhost:8983/solr/select", rows = 100))
```

Now delete those documents just added


```r
delete_by_query(query = "(name:blue OR name:pink)", "gettingstarted")
```

And now they are gone


```r
tail(solr_search("gettingstarted", "*:*", base = "http://localhost:8983/solr/select", rows = 100))
```

#### Update documents from files

This approach is best if you have many different things you want to do at once, e.g., delete and add files and set any additional options. The functions are:

* `update_xml()`
* `update_json()`
* `update_csv()`

There are separate functions for each of the data types as they take slightly different parameters - and to make it more clear that those are the three input options for data types.

##### JSON


```r
file <- system.file("examples", "books.json", package = "solrium")
update_json(file, "books")
```

##### Add and delete in the same file

Add a document first, that we can later delete


```r
ss <- list(list(id = 456, name = "cat"))
add(ss, "books")
```

Now add a new document, and delete the one we just made


```r
file <- system.file("examples", "add_delete.xml", package = "solrium")
cat(readLines(file), sep = "\n")
update_xml(file, "books")
```

##### Notes

Note that `update_xml()` and `update_json()` have exactly the same parameters, but simply use different data input formats. `update_csv()` is different in that you can't provide document or field level boosts or other modifications. In addition `update_csv()` can accept not just csv, but tsv and other types of separators.




### Cores/collections management

Initialize connection


```r
solr_connect()
```

```
#> <solr_connection>
#>   url:    http://localhost:8983
#>   errors: simple
#>   verbose: TRUE
#>   proxy:
```

#### Cores

There are many operations you can do on cores, including:

* `core_create()` - create a core
* `core_exists()` - check if a core exists
* `core_mergeindexes()` - merge indexes
* `core_reload()` - reload a core
* `core_rename()` - rename a core
* `core_requeststatus()` - check request status
* `core_split()` - split a core
* `core_status()` - check core status
* `core_swap()` - core swap
* `core_unload()` - delete a core

##### Create a core


```r
core_create()
```

##### Delete a core


```r
core_unload()
```

#### Collections

There are many operations you can do on collections, including:

* `collection_addreplica()`
* `collection_addreplicaprop()`
* `collection_addrole()`
* `collection_balanceshardunique()`
* `collection_clusterprop()`
* `collection_clusterstatus()`
* `collection_create()`
* `collection_createalias()`
* `collection_createshard()`
* `collection_delete()`
* `collection_deletealias()`
* `collection_deletereplica()`
* `collection_deletereplicaprop()`
* `collection_deleteshard()`
* `collection_list()`
* `collection_migrate()`
* `collection_overseerstatus()`
* `collection_rebalanceleaders()`
* `collection_reload()`
* `collection_removerole()`
* `collection_requeststatus()`
* `collection_splitshard()`

##### Create a collection


```r
collection_create()
```

##### Delete a collection


```r
collection_delete()
```

<section id="citing">

## Citing

To cite `solrium` in publications use:

<br>

> Scott Chamberlain (2016). solrium: General Purpose R Interface to 'Solr'. R
package version 0.3.0. https://github.com/ropensci/solrium

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for solrium](https://github.com/ropensci/solrium/issues?state=open)

[Back to top](#top)
