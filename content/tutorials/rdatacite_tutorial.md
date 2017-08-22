---
title: rdatacite tutorial
package_version: 0.1.0
---



`rdatacite` provides programmatic accesses to [DataCite](http://datacite.org/) metadata

* OAI-PMH. Documentation for the DataCite OAI-PMH is available [here](http://oai.datacite.org/). [Documentation for OAI-PMH](http://www.openarchives.org/OAI/openarchivesprotocol.html)
* REST API. [Docs](http://search.datacite.org/help.html). [Metadata schema](http://schema.datacite.org/). [Solr config file](https://github.com/datacite/search/blob/master/src/main/resources/solrconfig.xml)

<section id="installation">

## Installation


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

<section id="usage">

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
#> <ListRecords> 5 X 4
#>
#>                   identifier            datestamp setSpec setSpec.1
#> 1 oai:oai.datacite.org:32153 2011-06-08T08:57:11Z     TIB  TIB.WDCC
#> 2 oai:oai.datacite.org:32200 2011-06-20T08:12:41Z     TIB TIB.DAGST
#> 3 oai:oai.datacite.org:32220 2011-06-28T14:11:08Z     TIB TIB.DAGST
#> 4 oai:oai.datacite.org:32241 2011-06-30T13:24:45Z     TIB TIB.DAGST
#> 5 oai:oai.datacite.org:32255 2011-07-01T12:09:24Z     TIB TIB.DAGST
```

#### Get records


```r
dc_oai_getrecord(id = "56225")
#> <GetRecord> 1 X 23
#>
#>                   identifier            datestamp setSpec setSpec.1
#> 1 oai:oai.datacite.org:56225 2014-06-03T12:03:28Z      BL    BL.ADS
#> Variables not shown: title (chr), creator (chr), publisher (chr), date
#>      (chr), identifier.3 (chr), identifier.1 (chr), identifier.2 (chr),
#>      relation (chr), subject (chr), subject.1 (chr), language (chr), type
#>      (chr), type.1 (chr), format (chr), format.1 (chr), rights (chr),
#>      rights.1 (chr), coverage (chr), coverage.1 (chr)
```

You can pass in more than one identifier to `id` parameter.

### Search API

This is the API for the same query interface you'd use on the DataCite website.

#### Search

Search for the term _laser_


```r
dc_search(q = "laser", fl = c('doi','publicationYear'), rows = 5)
#> # A tibble: 5 × 2
#>                          doi publicationYear
#>                        <chr>           <chr>
#> 1 10.17035/D.2016.0008119129            2016
#> 2      10.2314/GBV:377452467            2002
#> 3      10.2314/GBV:72192168X            2012
#> 4      10.2314/GBV:772538778            2012
#> 5      10.2314/GBV:574957529            2007
```

Another search: published between 2000 and 2005


```r
dc_search(q = "publicationYear:[2000 TO 2005]", fl = c('doi', 'publicationYear'), rows = 5)
#> # A tibble: 5 × 2
#>                      doi publicationYear
#>                    <chr>           <chr>
#> 1    10.16910/JEMR.4.3.1            2001
#> 2    10.16910/JEMR.1.4.2            2005
#> 3    10.16910/JEMR.1.4.1            2005
#> 4    10.16910/JEMR.4.3.2            2001
#> 5 10.17026/DANS-XHT-QKVU            2005
```

#### Facet


```r
dc_facet(q = "wind", facet.field = 'publisher_facet', facet.limit = 5)
#> $facet_queries
#> NULL
#>
#> $facet_fields
#> $facet_fields$publisher_facet
#>                                                                     X1
#> 1           PANGAEA - Data Publisher for Earth & Environmental Science
#> 2   Data-Planet™ Statistical Ready Reference by Conquest Systems, Inc.
#> 3                                                          Unpublished
#> 4                                                             Figshare
#> 5 ICPSR - Interuniversity Consortium for Political and Social Research
#>      X2
#> 1 31204
#> 2  1126
#> 3   888
#> 4   663
#> 5   493
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
#>                          min                max count missing
#> date 01-Jan-2007/29-Nov-2010 September 30, 2015 63496    4474
#>
#> $facet
#> NULL
```

#### More-like-this


```r
dc_mlt(q = "ecology", mlt.fl = 'title', mlt.count = 2, fl = 'doi')
#> $docs
#> # A tibble: 10 × 1
#>                               doi
#>                             <chr>
#> 1             10.7892/BORIS.16333
#> 2             10.7892/BORIS.79067
#> 3             10.7892/BORIS.16589
#> 4          10.13140/2.1.3940.8968
#> 5  10.6084/M9.FIGSHARE.1178080.V1
#> 6  10.6084/M9.FIGSHARE.1540730.V1
#> 7  10.6084/M9.FIGSHARE.1541138.V1
#> 8     10.6084/M9.FIGSHARE.1540730
#> 9     10.6084/M9.FIGSHARE.1541138
#> 10    10.6084/M9.FIGSHARE.1178080
#>
#> $mlt
#> $mlt$`7245706`
#>                doi
#> 1 10.7282/T3HM5BKM
#> 2 10.7282/T3P55KJ4
```


<section id="citing">

## Citing

To cite `rdatacite` in publications use:

<br>

> Scott Chamberlain (2016). rdatacite: 'DataCite' Client for 'OAI-PMH'
  Methods and their Search 'API'. R package version 0.1.0. https://cran.rstudio.com/package=rdatacite

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rdatacite](https://github.com/ropensci/rdatacite/issues?state=open)

[Back to top](#top)
