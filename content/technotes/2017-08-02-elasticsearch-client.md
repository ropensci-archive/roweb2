---
slug: elasticsearch-client
title: elastic - Elasticsearch for R
date: '2017-08-02'
authors:
  - Scott Chamberlain
categories: technotes
topicid: 803
tags:
  - data
  - elastic
  - elasticsearch
  - databases
  - R
---




**elastic** is an R client for [Elasticsearch][es]

`elastic` has been around since 2013, with the first commit in [November, 2013](https://github.com/ropensci/elastic/commit/f7b04589b2cb711a21223bb4f20b34bc9330ef8d).

> sidebar - 'elastic' was picked as a package named before the company now known as Elastic
changed their name to Elastic.

### What is Elasticsearch?

If you aren't familiar with Elasticsearch, it is a distributed, RESTful search and analytics engine.
It's similar to [Solr](https://lucene.apache.org/solr//). It falls in the NoSQL bin of databases, holding data in JSON documents, instead
of rows and columns. Elasticsearch has a concept of __index__, similar to a database in SQL-land.
You can hold many documents of similar type within a single index. There is powerful search
capabilities, including lots of different types of queries that can be done separately
or combined. And best of all it's super fast.

### Other clients

The Elastic company maintains some official clients, including the Python client
[elasticsearch-py](https://elasticsearch-py.readthedocs.io/en/master/), and it's higher
level DSL client [elasticsearch-dsl](https://elasticsearch-dsl.readthedocs.io/en/latest/).

I won't talk much about it, but we have slowly been working on an R equivalent of the
Python DSL client, called [elasticdsl](https://github.com/ropensci/elasticdsl), for
a human friendly way to compose Elasticsearch queries.


### Vignettes

Check out the [elastic introduction vignette](https://cran.rstudio.com/web/packages/elastic/vignettes/elastic.html)
and the [search vignette](https://cran.rstudio.com/web/packages/elastic/vignettes/search.html) to get started.

### Noteable features

* `elastic` has nearly complete coverage of the Elasticsearch HTTP API. If there's
anything missing you need in this client, let us know! Check out the
[features label](https://github.com/ropensci/elastic/issues?q=is%3Aissue+is%3Aopen+label%3Afeatures)
for features we plan to add to the package.
* We fail well. This is important to us. We allow the user to choose simple errors
to just give e.g., 404 HTTP error, or complex errors, including full stack trace
from Elasticsearch in addition to the HTTP errror. We strive to fail well when
users give the wrong type of input, etc. as well. Let us know if `elastic` is not
failing well!
* We strive to allow R centric ways of interacting with Elasticsearch. For example,
in the function `docs_bulk`, our interface to the Elasticsearch [bulk API][bulk]
we make it easy to create documents in your Elasticsearch instance from R lists,
data.frame's and from bulk format files on disk.
* `elastic` works with most versions of Elasticsearch. We run the test suite on 11
versions of Elasticsearch, from `v1.0.0` up to `v5.5.0`. We strive to fail well
with useful messages when there is a feature no longer available or one that is
a new feature and not available in previous Elasticsearch versions.
* Search inputs are flexible: lists and JSON strings both work.
* Arguably, a noteable feature is that this client has been around nearly 4 years,
so we've surfaced and squashed many bugs.

### Getting help

* If you have a bug or a feature request, post it in the repo at <https://github.com/ropensci/elastic/issues>
* Stackoverflow: Check out combination of the tags `[elasticsearch]` and `[r]` <https://stackoverflow.com/questions/tagged/elasticsearch+r>
* Reach out to me on Twitter at [@sckottie](https://twitter.com/sckottie)
* Post question/problem in the [rOpenSci discussion forum](https://discuss.ropensci.org/)
* Email me [directly](mailto:myrmecocystus@gmail.com)

### Setup

Install `elastic`



```r
install.packages("elastic")
```

Or get the development version:


```r
devtools::install_github("ropensci/elastic")
```



```r
library(elastic)
```

I'm running Elasticsearch version:


```r
ping()$version$number
#> [1] "5.4.0"
```


### Examples


#### Initialize a client

Using `connect()`


```r
elastic::connect()
#> transport:  http
#> host:       127.0.0.1
#> port:       9200
#> path:       NULL
#> username:   NULL
#> password:   <secret>
#> errors:     simple
#> headers (names):  NULL
```

By default, you connect to `localhost` and port `9200`. There's paramaters
for setting transport schema, username, password, and base search path (e.g.,
`_search` or something else).

> See bottom of post about possible changes in connections.

#### Get some data

Elasticsearch has a bulk load API to load data in fast. The format is pretty weird
though. It's sort of JSON, but would pass no JSON linter. I include a few data
sets in `elastic` so it's easy to get up and running, and so when you run examples
in this package they'll actually run the same way (hopefully).

#### Public Library of Science (PLOS) data

A dataset inluded in the `elastic` package is metadata for PLOS scholarly articles.
Get the file path, then load:


```r
plosdat <- system.file("examples", "plos_data.json", package = "elastic")
invisible(docs_bulk(plosdat))
```

#### Search

The main search function is `Search()`. Running it without any inputs searches
across all indices - in this case only the `plos` index.


```r
Search()
```


```
#> $took
#> [1] 1
#>
#> $timed_out
#> [1] FALSE
#>
#> $`_shards`
#> $`_shards`$total
#> [1] 5
#>
#> $`_shards`$successful
#> [1] 5
#>
#> $`_shards`$failed
#> [1] 0
...
```

Search just the `plos` index and only return 1 result


```r
Search(index = "plos", size = 1)$hits$hits
#> [[1]]
#> [[1]]$`_index`
#> [1] "plos"
#>
#> [[1]]$`_type`
#> [1] "article"
#>
#> [[1]]$`_id`
#> [1] "0"
#>
#> [[1]]$`_score`
#> [1] 1
#>
#> [[1]]$`_source`
#> [[1]]$`_source`$id
#> [1] "10.1371/journal.pone.0007737"
#>
#> [[1]]$`_source`$title
#> [1] "Phospholipase C-β4 Is Essential for the Progression of the Normal Sleep Sequence and Ultradian Body Temperature Rhythms in Mice"
```

Search the `plos` index, and the `article` document type, sort by title, and query for _antibody_, limit to 1 result.

First, with Elasticsearch `v5` and greater, we need to set `fielddata = true` if we want to search on or sort on a text field.


```r
mapping_create("plos", "article", update_all_types = TRUE, body = '{
   "properties": {
     "title": {
     "type":     "text",
     "fielddata": true
   }
 }
}')
#> $acknowledged
#> [1] TRUE
Search(index = "plos", type = "article", sort = "title", q = "antibody", size = 1)$hits$hits
#> [[1]]
#> [[1]]$`_index`
#> [1] "plos"
#>
#> [[1]]$`_type`
#> [1] "article"
#>
#> [[1]]$`_id`
#> [1] "568"
#>
#> [[1]]$`_score`
#> NULL
#>
#> [[1]]$`_source`
#> [[1]]$`_source`$id
#> [1] "10.1371/journal.pone.0085002"
#>
#> [[1]]$`_source`$title
#> [1] "Evaluation of 131I-Anti-Angiotensin II Type 1 Receptor Monoclonal Antibody as a Reporter for Hepatocellular Carcinoma"
#>
#>
#> [[1]]$sort
#> [[1]]$sort[[1]]
#> [1] "1"
```

#### Get documents

Get document with `id=1`


```r
docs_get(index = 'plos', type = 'article', id = 1)
#> $`_index`
#> [1] "plos"
#>
#> $`_type`
#> [1] "article"
#>
#> $`_id`
#> [1] "1"
#>
#> $`_version`
#> [1] 1
#>
#> $found
#> [1] TRUE
#>
#> $`_source`
#> $`_source`$id
#> [1] "10.1371/journal.pone.0098602"
#>
#> $`_source`$title
#> [1] "Population Genetic Structure of a Sandstone Specialist and a Generalist Heath Species at Two Levels of Sandstone Patchiness across the Strait of Gibraltar"
```

Get certain fields


```r
docs_get(index = 'plos', type = 'article', id = 1, fields = 'id')
#> $`_index`
#> [1] "plos"
#>
#> $`_type`
#> [1] "article"
#>
#> $`_id`
#> [1] "1"
#>
#> $`_version`
#> [1] 1
#>
#> $found
#> [1] TRUE
```


#### Raw JSON data

You can optionally get back raw JSON from many functions by setting parameter `raw=TRUE`.

For example, get raw JSON, then parse with `jsonlite`


```r
(out <- docs_mget(index = "plos", type = "article", id = 5:6, raw = TRUE))
#> [1] "{\"docs\":[{\"_index\":\"plos\",\"_type\":\"article\",\"_id\":\"5\",\"_version\":1,\"found\":true,\"_source\":{\"id\":\"10.1371/journal.pone.0085123\",\"title\":\"MiR-21 Is under Control of STAT5 but Is Dispensable for Mammary Development and Lactation\"}},{\"_index\":\"plos\",\"_type\":\"article\",\"_id\":\"6\",\"_version\":1,\"found\":true,\"_source\":{\"id\":\"10.1371/journal.pone.0098600\",\"title\":\"Correction: Designing Mixed Species Tree Plantations for the Tropics: Balancing Ecological Attributes of Species with Landholder Preferences in the Philippines\"}}]}"
#> attr(,"class")
#> [1] "elastic_mget"
jsonlite::fromJSON(out)
#> $docs
#>   _index   _type _id _version found                   _source.id
#> 1   plos article   5        1  TRUE 10.1371/journal.pone.0085123
#> 2   plos article   6        1  TRUE 10.1371/journal.pone.0098600
#>                                                                                                                                                     _source.title
#> 1                                                                       MiR-21 Is under Control of STAT5 but Is Dispensable for Mammary Development and Lactation
#> 2 Correction: Designing Mixed Species Tree Plantations for the Tropics: Balancing Ecological Attributes of Species with Landholder Preferences in the Philippines
```

#### Aggregation search

Here, we'll use another dataset that comes with the package on Shakespeare plays.


```r
gbifdat <- system.file("examples", "gbif_data.json", package = "elastic")
invisible(docs_bulk(gbifdat))
```

Define an aggregation query:


```r
aggs <- '{
    "aggs": {
        "latbuckets" : {
           "histogram" : {
               "field" : "decimalLatitude",
               "interval" : 5
           }
        }
    }
}'
```

Search the `gbif` index


```r
res <- Search(index = "gbif", body = aggs, size = 0)$aggregations$latbuckets$buckets
do.call("rbind.data.frame", res)
#>    key doc_count
#> 2  -35         1
#> 22 -30         0
#> 3  -25         0
#> 4  -20         0
#> 5  -15         0
#> 6  -10         0
#> 7   -5         1
#> 8    0         0
#> 9    5         0
#> 10  10         0
#> 11  15         0
#> 12  20         0
#> 13  25         4
#> 14  30         2
#> 15  35         3
#> 16  40         2
#> 17  45        66
#> 18  50       183
#> 19  55       487
#> 20  60       130
#> 21  65        20
```

#### Scrolling search - instead of paging

When you want all the documents, your best bet is likely to be [scrolling search](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html).

Here's an example. First, use `Search()`, setting a value for the `scroll` parameter.


```r
res1 <- Search(index = 'shakespeare', scroll = "1m")
```

You get a scroll ID back when setting the `scroll` parameter


```r
res1$`_scroll_id`
#> [1] "DnF1ZXJ5VGhlbkZldGNoBQAAAAAAAAElFnZ2X3FJVWEyUU1HQjl2cFpWUFl0cXcAAAAAAAABJBZ2dl9xSVVhMlFNR0I5dnBaVlBZdHF3AAAAAAAAAScWdnZfcUlVYTJRTUdCOXZwWlZQWXRxdwAAAAAAAAEmFnZ2X3FJVWEyUU1HQjl2cFpWUFl0cXcAAAAAAAABIxZ2dl9xSVVhMlFNR0I5dnBaVlBZdHF3"
```

Use a while loop to get all results


```r
out1 <- list()
hits <- 1
while (hits != 0) {
  tmp1 <- scroll(scroll_id = res1$`_scroll_id`)
  hits <- length(tmp1$hits$hits)
  if (hits > 0) {
   out1 <- c(out1, tmp1$hits$hits)
  }
}
```

Woohoo! Collected all 1 documents in very little time.

Now, get `_source` from each document:


```r
docs <- lapply(out1, "[[", "_source")
length(docs)
#> [1] 4988
vapply(docs[1:10], "[[", "", "text_entry")
#>  [1] "Without much shame retold or spoken of."
#>  [2] "For more uneven and unwelcome news"
#>  [3] "And shape of likelihood, the news was told;"
#>  [4] "Mordake the Earl of Fife, and eldest son"
#>  [5] "It is a conquest for a prince to boast of."
#>  [6] "Amongst a grove, the very straightest plant;"
#>  [7] "That some night-tripping fairy had exchanged"
#>  [8] "Then would I have his Harry, and he mine."
#>  [9] "This is his uncles teaching; this is Worcester,"
#> [10] "Malevolent to you in all aspects;"
```


#### Bulk documents

You've already seen the bulk docs API in action above. Above though, we were
using `docs_bulk.character` - where the input is a character string that's a
file path.

Here, I'll describe briefly how you can insert any data.frame as documents in your
Elasticsearch instance. We'll use the diamonds dataset from the ~54K row `ggplot2`
package.


```
#> $acknowledged
#> [1] TRUE
```


```r
library(ggplot2)
invisible(docs_bulk(diamonds, "diam"))
#> |==================================| 100%
```


```r
Search("diam")$hits$total
#> [1] 47375
```

That's pretty easy! This function is used a lot, particularly with data.frame's - so
we get many questions/feedback on this so it will just keep getting better/faster.

### TO DO

#### Connections

We're planning to roll out changes in how you connect to Elasticsearch from `elastic`.
Right now, you can only connect to one Elasticsearch instance per R session -
your details are set and then recalled internally in each function. We plan to change
this to instantiate a client and then you either call functions on the client
(e.g., using `R6`) or pass the client object onto functions.

Checkout [issue #87](https://github.com/ropensci/elastic/issues/87) to follow
progress or discuss.

<br>

#### Move to using crul for http

`crul` is a relatively new R http client - and has async baked in - as well as mocking.
Development should be easier with it as I can mock requests for test suites, and
allow users to toggle async more easily.

### Call to action

We can use your help! Elasticsearch development moves pretty fast - we'd love this client to
work with every single Elasticsearch version to the extent possible - and we'd love to
squash every bug and solve every feature request fast.

If you need to use Elasticsearch from R, please try out `elastic`!

- Report bugs!
- File feature requests!
- Send PR's!


[es]: https://www.elastic.co/products/elasticsearch
[bulk]: https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html
