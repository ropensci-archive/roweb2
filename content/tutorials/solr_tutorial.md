---
title: solr tutorial
package_version: 0.1.6
---



> This package has been rebooted as `solrium` - check out the tutorial at [https://ropensci.org/tutorials/solrium_tutorial.html](https://ropensci.org/tutorials/solrium_tutorial.html)

<section id="installation">

## Installation


More stable version from CRAN


```r
install.packages("solr")
```

Development version from Github


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropensci/solr")
```

Load


```r
library("solr")
```

<section id="usage">

## Usage

The `solr` package is a general purpose R interface to [Solr](http://lucene.apache.org/solr/)

This package only deals with exracting data from a Solr endpoint, not writing data (pull request or holla if you're interested in writing solr data).

### Solr info

+ [Solr home page](http://lucene.apache.org/solr/)
+ [Highlighting help](http://wiki.apache.org/solr/HighlightingParameters)
+ [Faceting help](http://wiki.apache.org/solr/SimpleFacetParameters)
+ [Installing Solr on Mac using homebrew](http://ramlev.dk/blog/2012/06/02/install-apache-solr-on-your-mac/)
+ [Install and Setup SOLR in OSX, including running Solr](http://risnandar.wordpress.com/2013/09/08/how-to-install-and-setup-apache-lucene-solr-in-osx/)

### Quick start

**Define stuff** Your base url and a key (if needed). This example should work. You do need to pass a key to the Public Library of Science search API, but it apparently doesn't need to be a real one.


```r
url <- 'http://api.plos.org/search'
key <- 'key'
```

**Search**


```r
solr_search(q='*:*', rows=2, fl='id', base=url, key=key)
```

```
#>                                   id
#> 1       10.1371/journal.pone.0107420
#> 2 10.1371/journal.pone.0107420/title
```

**Facet**


```r
solr_facet(q='*:*', facet.field='journal', facet.query=c('cell','bird'), base=url, key=key)
```

```
#> $facet_queries
#>   term  value
#> 1 cell 133052
#> 2 bird  13598
#>
#> $facet_fields
#> $facet_fields$journal
#>                                 X1      X2
#> 1                         plos one 1285831
#> 2                    plos genetics   50706
#> 3                   plos pathogens   44134
#> 4       plos computational biology   37646
#> 5 plos neglected tropical diseases   35979
#> 6                     plos biology   29392
#> 7                    plos medicine   20335
#> 8             plos clinical trials     521
#> 9                     plos medicin       9
#>
#>
#> $facet_dates
#> NULL
#>
#> $facet_ranges
#> NULL
```

**Highlight**


```r
solr_highlight(q='alcohol', hl.fl = 'abstract', rows=2, base = url, key=key)
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

**Stats**


```r
out <- solr_stats(q='ecology', stats.field=c('counter_total_all','alm_twitterCount'), stats.facet=c('journal','volume'), base=url, key=key)
```


```r
out$data
```

```
#>                   min    max count missing       sum sumOfSquares
#> counter_total_all   0 381005 32852       0 149031058 3.400519e+12
#> alm_twitterCount    0   1763 32852       0    185772 3.565201e+07
#>                          mean     stddev
#> counter_total_all 4536.437903 9106.78332
#> alm_twitterCount     5.654816   32.45437
```


```r
out$facet
```

```
#> $counter_total_all
#> $counter_total_all$volume
#>     min    max count missing      sum sumOfSquares      mean    stddev
#> 1     0 171524  2103       0  3835629  70357145667  1823.884  5490.299
#> 2     0 110768   167       0  1230491  27037286881  7368.210 10404.694
#> 3  2148  75942    72       0   772327  16099354117 10726.764 10491.301
#> 4  1054  17107    34       0   200231   1660929909  5889.147  3820.757
#> 5  1894 187549    81       0  1537428  91933035658 18980.593 28007.084
#> 6  1715 120974   482       0  5948960 169424242112 12342.241 14127.482
#> 7  1366 129059   741       0  7868119 195614871613 10618.244 12306.297
#> 8   704 366145  1010       0  9896935 353256010661  9798.946 15937.082
#> 9   103 120116  1539       0 12404305 231308647989  8059.977  9240.685
#> 10   72 253313  2948       0 18225649 347627981895  6182.378  8928.896
#> 11   51 184534  4825       0 25034662 405690249482  5188.531  7561.209
#> 12   17 381005  6360       0 27474658 569252540142  4319.915  8417.517
#> 13   42 308057  6620       0 22228580 679102577074  3357.792  9556.281
#> 14    0 190562  5870       0 12373084 242153753584  2107.851  6067.619
#>    facet_field
#> 1           11
#> 2           12
#> 3           13
#> 4           14
#> 5            1
#> 6            2
#> 7            3
#> 8            4
#> 9            5
#> 10           6
#> 11           7
#> 12           8
#> 13           9
#> 14          10
#>
#> $counter_total_all$journal
#>    min    max count missing       sum sumOfSquares      mean    stddev
#> 1  704 120974   246       0   4214716 1.564771e+11 17132.992 18545.739
#> 2 1054 276407   909       0  14517422 5.853448e+11 15970.761 19730.857
#> 3 8518  13973     2       0     22491 2.678011e+08 11245.500  3857.267
#> 4    0 381005 27131       0 101671435 2.102781e+12  3747.427  7966.421
#> 5 1219  65875   609       0   4973930 7.003314e+10  8167.373  6954.883
#> 6  475  80210   779       0   6583271 9.726579e+10  8450.926  7315.077
#> 7    0 216948  1318       0   6245038 1.075082e+11  4738.269  7691.744
#> 8    0 303724   607       0   4418575 1.542870e+11  7279.366 14195.857
#>                        facet_field
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
#>    min  max count missing   sum sumOfSquares       mean     stddev
#> 1    0 1763  2103       0 22076      4662064 10.4973847  45.909374
#> 2    0 1133   167       0  7738      2167192 46.3353293 104.381403
#> 3    0  360    72       0  3852       638160 53.5000000  78.010292
#> 4    0  368    34       0  3138       609804 92.2941176  98.501663
#> 5    0   42    81       0   177         5001  2.1851852   7.594589
#> 6    0  108   482       0   783        32997  1.6244813   8.121355
#> 7    0   49   741       0   714        12896  0.9635628   4.061689
#> 8    0  242  1010       0  1091        78313  1.0801980   8.743368
#> 9    0  129  1539       0  1985        96697  1.2897986   7.823506
#> 10   0  892  2948       0  4462      1290514  1.5135685  20.871417
#> 11   0  822  4825       0 19805      2066673  4.1046632  20.287017
#> 12   0 1561  6360       0 36483      6845473  5.7363208  32.304658
#> 13   0 1581  6620       0 50448     13527984  7.6205438  44.561524
#> 14   0  943  5870       0 33020      3618240  5.6252129  24.183710
#>    facet_field
#> 1           11
#> 2           12
#> 3           13
#> 4           14
#> 5            1
#> 6            2
#> 7            3
#> 8            4
#> 9            5
#> 10           6
#> 11           7
#> 12           8
#> 13           9
#> 14          10
#>
#> $alm_twitterCount$journal
#>   min  max count missing    sum sumOfSquares      mean   stddev
#> 1   0  784   246       0   4375      1044519 17.784553 62.81530
#> 2   0 1763   909       0  19658      7025376 21.625963 85.25844
#> 3   0    3     2       0      3            9  1.500000  2.12132
#> 4   0 1581 27131       0 135040     25380518  4.977332 30.17847
#> 5   0  133   609       0   4496       170710  7.382594 15.03930
#> 6   0  181   779       0   4835       181223  6.206675 13.94138
#> 7   0  892  1318       0   5848      1122858  4.437026 28.85976
#> 8   0  289   607       0   4643       296565  7.649094 20.75514
#>                        facet_field
#> 1                    plos medicine
#> 2                     plos biology
#> 3             plos clinical trials
#> 4                         plos one
#> 5                   plos pathogens
#> 6                    plos genetics
#> 7 plos neglected tropical diseases
#> 8       plos computational biology
```

**More like this**

`solr_mlt` is a function to return similar documents to the one


```r
out <- solr_mlt(q='title:"ecology" AND body:"cell"', mlt.fl='title', mlt.mindf=1, mlt.mintf=1, fl='counter_total_all', rows=5, base=url, key=key)
out$docs
```

```
#>                             id counter_total_all
#> 1 10.1371/journal.pbio.1001805             17665
#> 2 10.1371/journal.pbio.0020440             24041
#> 3 10.1371/journal.pone.0087217              6336
#> 4 10.1371/journal.pbio.1002191             14565
#> 5 10.1371/journal.pone.0040117              4613
```


```r
out$mlt
```

```
#> $`10.1371/journal.pbio.1001805`
#>                             id counter_total_all
#> 1 10.1371/journal.pone.0082578              2270
#> 2 10.1371/journal.pone.0098876              2603
#> 3 10.1371/journal.pone.0102159              1244
#> 4 10.1371/journal.pcbi.1003408              7336
#> 5 10.1371/journal.pone.0076063              2971
#>
#> $`10.1371/journal.pbio.0020440`
#>                             id counter_total_all
#> 1 10.1371/journal.pone.0035964              5920
#> 2 10.1371/journal.pone.0102679              3340
#> 3 10.1371/journal.pone.0003259              2882
#> 4 10.1371/journal.pone.0101568              2823
#> 5 10.1371/journal.pntd.0003377              3507
#>
#> $`10.1371/journal.pone.0087217`
#>                             id counter_total_all
#> 1 10.1371/journal.pone.0131665               522
#> 2 10.1371/journal.pcbi.0020092             20087
#> 3 10.1371/journal.pone.0133941               595
#> 4 10.1371/journal.pone.0123774              1095
#> 5 10.1371/journal.pone.0140306               370
#>
#> $`10.1371/journal.pbio.1002191`
#>                             id counter_total_all
#> 1 10.1371/journal.pbio.1002232              2148
#> 2 10.1371/journal.pone.0131700              1121
#> 3 10.1371/journal.pone.0070448              1669
#> 4 10.1371/journal.pone.0044766              2349
#> 5 10.1371/journal.pone.0062824              2732
#>
#> $`10.1371/journal.pone.0040117`
#>                             id counter_total_all
#> 1 10.1371/journal.pone.0069352              2940
#> 2 10.1371/journal.pone.0148280               710
#> 3 10.1371/journal.pone.0014065              5915
#> 4 10.1371/journal.pone.0035502              4139
#> 5 10.1371/journal.pone.0078369              3548
```

**Parsing**

`solr_parse` is a general purpose parser function with extension methods `solr_parse.sr_search`, `solr_parse.sr_facet`, and `solr_parse.sr_high`, for parsing `solr_search`, `solr_facet`, and `solr_highlight` function output, respectively. `solr_parse` is used internally within those three functions (`solr_search`, `solr_facet`, `solr_highlight`) to do parsing. You can optionally get back raw `json` or `xml` from `solr_search`, `solr_facet`, and `solr_highlight` setting parameter `raw=TRUE`, and then parsing after the fact with `solr_parse`. All you need to know is `solr_parse` can parse

For example:


```r
(out <- solr_highlight(q='alcohol', hl.fl = 'abstract', rows=2, base = url, key=key, raw=TRUE))
```

```
#> [1] "{\"response\":{\"numFound\":21115,\"start\":0,\"docs\":[{},{}]},\"highlighting\":{\"10.1371/journal.pmed.0040151\":{\"abstract\":[\"Background: <em>Alcohol</em> consumption causes an estimated 4% of the global disease burden, prompting\"]},\"10.1371/journal.pone.0027752\":{\"abstract\":[\"Background: The negative influences of <em>alcohol</em> on TB management with regard to delays in seeking\"]}}}\n"
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

**Using specific data sources**

*USGS BISON service*

The occurrences service


```r
url <- "http://bisonapi.usgs.ornl.gov/solr/occurrences/select"
solr_search(q='*:*', fl=c('decimalLatitude','decimalLongitude','scientificName'), base=url)
```

```
#>    decimalLongitude decimalLatitude        scientificName
#> 1          -98.2376         29.5502   Nyctanassa violacea
#> 2          -98.2376         29.5502 Myiarchus cinerascens
#> 3          -98.2376         29.5502  Melanerpes aurifrons
#> 4          -98.2376         29.5502  Melanerpes aurifrons
#> 5          -98.2376         29.5502     Mimus polyglottos
#> 6          -98.2376         29.5502        Molothrus ater
#> 7          -98.2376         29.5502     Mimus polyglottos
#> 8          -98.2376         29.5502    Oreothlypis celata
#> 9          -98.2376         29.5502     Megaceryle alcyon
#> 10         -98.2376         29.5502        Molothrus ater
```

The species names service


```r
url <- "http://bisonapi.usgs.ornl.gov/solr/scientificName/select"
out <- solr_search(q='*:*', base=url, raw=TRUE)
solr_parse(out, "list")$response$docs[1:3]
```

```
#> [[1]]
#> [[1]]$scientificName
#> [1] "Catocala editha"
#>
#> [[1]]$`_version_`
#> [1] 1.518645e+18
#>
#>
#> [[2]]
#> [[2]]$scientificName
#> [1] "Dictyopteris polypodioides"
#>
#> [[2]]$`_version_`
#> [1] 1.518645e+18
#>
#>
#> [[3]]
#> [[3]]$scientificName
#> [1] "Lonicera iberica"
#>
#> [[3]]$`_version_`
#> [1] 1.518645e+18
```


Sweet!  Love me some `solr`


<section id="citing">

## Citing

To cite `solr` in publications use:

<br>

> Scott Chamberlain (2016). solr: General purpose R interface to Solr. R package version 0.1.6. http://CRAN.R-project.org/package=solr

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for solr](https://github.com/solr/rgauges/issues?state=open)

[Back to top](#top)
