---
title: rdatacite tutorial
package_version: 0.1.0
---



`rdatacite` provides programmatic accesses to [DataCite](http://datacite.org/) metadata

* OAI-PMH. Documentation for the DataCite OAI-PMH is available [here](http://oai.datacite.org/). [Documentation for OAI-PMH](http://www.openarchives.org/OAI/openarchivesprotocol.html)
* REST API. [Docs](http://search.datacite.org/help.html). [Metadata schema](http://schema.datacite.org/). [Solr config file](https://github.com/datacite/search/blob/master/src/main/resources/solrconfig.xml)


### Installation


```r
install.packages("rdatacite")
```

Or development version from GitHub


```r
install.packages("devtools")
devtools::install_github("ropensci/rdatacite")
```


```r
library("rdatacite")
```


## Usage


### OAI-PMH

#### Ping the service


```r
dc_oai_identify()
#>   repositoryName                     baseURL protocolVersion
#> 1   DataCite MDS http://oai.datacite.org/oai             2.0
#>           adminEmail    earliestDatestamp deletedRecord
#> 1 admin@datacite.org 2011-01-01T00:00:00Z    persistent
#>            granularity compression compression.1
#> 1 YYYY-MM-DDThh:mm:ssZ        gzip       deflate
#>                                      description
#> 1 oaioai.datacite.org:oai:oai.datacite.org:12425
```

#### List metadata formats


```r
dc_oai_listmetadataformats(id = "56225")
#> $`56225`
#> NULL
```

#### List identifiers


```r
dc_oai_listidentifiers(from = '2011-06-01T', until = '2011-07-01T')
#> # A tibble: 5 x 4
#>                   identifier            datestamp setSpec setSpec.1
#>                        <chr>                <chr>   <chr>     <chr>
#> 1 oai:oai.datacite.org:32153 2011-06-08T08:57:11Z     TIB  TIB.WDCC
#> 2 oai:oai.datacite.org:32200 2011-06-20T08:12:41Z     TIB TIB.DAGST
#> 3 oai:oai.datacite.org:32220 2011-06-28T14:11:08Z     TIB TIB.DAGST
#> 4 oai:oai.datacite.org:32241 2011-06-30T13:24:45Z     TIB TIB.DAGST
#> 5 oai:oai.datacite.org:32255 2011-07-01T12:09:24Z     TIB TIB.DAGST
```

#### Get records


```r
dc_oai_getrecord(id = "56225")
#> $`oai:oai.datacite.org:56225`
#> $`oai:oai.datacite.org:56225`$header
#> # A tibble: 1 x 3
#>                   identifier            datestamp   setSpec
#>                        <chr>                <chr>     <chr>
#> 1 oai:oai.datacite.org:56225 2014-06-03T12:03:28Z BL;BL.ADS
#> 
#> $`oai:oai.datacite.org:56225`$metadata
#> # A tibble: 1 x 12
#>                                                                         title
#>                                                                         <chr>
#> 1 Land at Hill Barton, Clyst St Mary, Devon (NGR SY 0002 9083) Hill Barton In
#> # ... with 11 more variables: creator <chr>, publisher <chr>, date <chr>,
#> #   identifier <chr>, relation <chr>, subject <chr>, language <chr>,
#> #   type <chr>, format <chr>, rights <chr>, coverage <chr>
```

You can pass in more than one identifier to `id` parameter.

### Search API

This is the API for the same query interface you'd use on the DataCite website.

#### Search

Search for the term _laser_


```r
dc_search(q = "laser", fl = c('doi','publicationYear'), rows = 5)
#> # A tibble: 5 x 2
#>                          doi publicationYear
#>                        <chr>           <chr>
#> 1             10.7283/R3ZW26            2016
#> 2 10.17035/D.2016.0008119129            2016
#> 3             10.7283/R3V30K            2016
#> 4      10.2314/GBV:667365621            2010
#> 5      10.2314/GBV:72192168X            2012
```

Another search: published between 2000 and 2005


```r
dc_search(q = "publicationYear:[2000 TO 2005]", fl = c('doi', 'publicationYear'), rows = 5)
#> # A tibble: 5 x 2
#>                   doi publicationYear
#>                 <chr>           <chr>
#> 1 10.17192/Z2003.0408            2003
#> 2        10.17617/1.5            2000
#> 3        10.17617/1.6            2004
#> 4  10.17617/2.2250118            2005
#> 5   10.17617/2.492916            2004
```

#### Facet


```r
dc_facet(q = "wind", facet.field = 'publisher_facet', facet.limit = 5)
#> $facet_queries
#> NULL
#> 
#> $facet_fields
#> $facet_fields$publisher_facet
#> # A tibble: 5 x 2
#>                                                         term value
#>                                                        <chr> <chr>
#> 1 PANGAEA - Data Publisher for Earth & Environmental Science 32377
#> 2                       Defense Technical Information Center  2382
#> 3                                                   Figshare  1533
#> 4                                                Unpublished  1186
#> 5                                                     Zenodo   594
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

#### Stats



```r
dc_stats(q = "ecology", stats.field = 'date')
#> $data
#>                          min                max  count missing
#> date 01-Jan-2007/29-Nov-2010 September 30, 2015 153476    5366
#> 
#> $facet
#> NULL
```

#### More-like-this


```r
dc_mlt(q = "ecology", mlt.fl = 'title', mlt.count = 2, fl = 'doi')
#> $docs
#> # A tibble: 10 x 1
#>                            doi
#>                          <chr>
#>  1         10.7892/BORIS.79067
#>  2         10.7892/BORIS.16589
#>  3         10.7892/BORIS.16333
#>  4      10.13140/2.1.3940.8968
#>  5      10.1594/PANGAEA.745038
#>  6      10.1594/PANGAEA.745039
#>  7      10.1594/PANGAEA.745049
#>  8 10.6084/M9.FIGSHARE.1540730
#>  9 10.6084/M9.FIGSHARE.1541138
#> 10 10.6084/M9.FIGSHARE.1178080
#> 
#> $mlt
#> $mlt$`8103779`
#> # A tibble: 1 x 2
#>   numFound start
#>      <int> <int>
#> 1        0     0
#> 
#> $mlt$`7245706`
#> # A tibble: 2 x 3
#>   numFound start                         doi
#>      <int> <int>                       <chr>
#> 1      591     0 10.7925/DRS1.DUCHAS_5141541
#> 2      591     0            10.7282/T3P55KJ4
#> 
#> $mlt$`5704684`
#> # A tibble: 1 x 2
#>   numFound start
#>      <int> <int>
#> 1        0     0
#> 
#> $mlt$`4647415`
#> # A tibble: 1 x 2
#>   numFound start
#>      <int> <int>
#> 1        0     0
#> 
#> $mlt$`536251`
#> # A tibble: 1 x 2
#>   numFound start
#>      <int> <int>
#> 1        0     0
#> 
#> $mlt$`536252`
#> # A tibble: 1 x 2
#>   numFound start
#>      <int> <int>
#> 1        0     0
#> 
#> $mlt$`536260`
#> # A tibble: 1 x 2
#>   numFound start
#>      <int> <int>
#> 1        0     0
#> 
#> $mlt$`6743504`
#> # A tibble: 1 x 2
#>   numFound start
#>      <int> <int>
#> 1        0     0
#> 
#> $mlt$`6746350`
#> # A tibble: 1 x 2
#>   numFound start
#>      <int> <int>
#> 1        0     0
#> 
#> $mlt$`4013379`
#> # A tibble: 1 x 2
#>   numFound start
#>      <int> <int>
#> 1        0     0
```



### Citing

To cite `rdatacite` in publications use:

<br>

> Scott Chamberlain (2016). rdatacite: 'DataCite' Client for 'OAI-PMH'
  Methods and their Search 'API'. R package version 0.1.0. https://cran.rstudio.com/package=rdatacite


### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rdatacite](https://github.com/ropensci/rdatacite/issues?state=open)

[Back to top](#top)
