---
slug: solrium-solr-r
title: 'solrium 1.0: Working with Solr from R'
date: '2017-11-08'
author:
  - Scott Chamberlain
topicid: 953
tags:
  - data
  - solr
  - solrium
  - databases
  - R
---



Nearly 4 years ago I wrote on this blog about an R package [solr][solrpkg] for working with the database [Solr][solr]. Since then we've created a refresh of that package in the [solrium][] package. Since `solrium` first hit CRAN about two years ago, users have raised a number of issues that required breaking changes. Thus, this blog post is about a major version bump in `solrium`.



## What is Solr?

Solr is a "search platform" - a NoSQL database - data is organized by so called documents that are xml/json/etc blobs of text. Documents are nested within either collections or cores (depending on the mode you start Solr in). Solr makes it easy to search for documents, with a huge variety of parameters, and a number of different data formats (json/xml/csv). Solr is similar to [Elasticsearch][es] (see our Elasticsearch client [elastic][]) - and was around before it. Solr in my opinion is harder to setup than Elasticsearch, but I don't claim to be an expert on either.



## Vignettes


* [Solr Search with solrium](https://cran.rstudio.com/web/packages/solrium/vignettes/search.html)
* [Local Solr setup](https://cran.rstudio.com/web/packages/solrium/vignettes/local_setup.html)
* [Document management](https://cran.rstudio.com/web/packages/solrium/vignettes/document_management.html)
* [Cores/collections management](https://cran.rstudio.com/web/packages/solrium/vignettes/cores_collections.html)

## Noteable features

* Added in v1, you can now work with many connection objects to different Solr instances.
* Methods for the major search functionalities: search, highlight, stats, mlt, group, and facet. In addition, a catch all function `all` to combine all of those.
* Comprehensive coverage of the Solr HTTP API
* Can coerce data from Solr API into data.frame's when possible

## Setup

Install `solrium`



```r
install.packages("solrium")
```

Or get the development version:


```r
devtools::install_github("ropensci/solrium")
```



```r
library(solrium)
```



## Initialize a client

A big change in `v1` of `solrium` is `solr_connect` has been replaced by `SolrClient`. Now you create an `R6` connection object with `SolrClient`, then you can call methods on that `R6` object, **OR** you can pass the connection object to functions.

By default, `SolrClient$new()` sets connections details for a Solr instance that's running on `localhost`, and on port `8983`.


```r
(conn <- SolrClient$new())
```

```
#> <Solr Client>
#>   host: 127.0.0.1
#>   path: 
#>   port: 8983
#>   scheme: http
#>   errors: simple
#>   proxy:
```

On instantiation, it does not check that the Solr instance is up, but merely sets connection details. You can check if the instance is up by doing for example (assuming you have a collection named `gettingstarted`):


```r
conn$ping("gettingstarted")
```

```
#> $responseHeader
#> $responseHeader$zkConnected
#> [1] TRUE
#> 
#> $responseHeader$status
#> [1] 0
#> 
#> $responseHeader$QTime
#> [1] 163
#> 
#> $responseHeader$params
#> $responseHeader$params$q
#> [1] "{!lucene}*:*"
#> 
#> $responseHeader$params$distrib
#> [1] "false"
#> 
#> $responseHeader$params$df
#> [1] "_text_"
#> 
#> $responseHeader$params$rows
#> [1] "10"
#> 
#> $responseHeader$params$wt
#> [1] "json"
#> 
#> $responseHeader$params$echoParams
#> [1] "all"
#> 
#> 
#> 
#> $status
#> [1] "OK"
```

A good hint when connecting to a publicly exposed Solr instance is that you likely don't need to specify a port, so a pattern like this should work to connect to a URL like `http://foobar.com/search`:

```r
SolrClient$new(host = "foobar.com", path = "search", port = NULL)
```

If the instance uses SSL, simply specify that like:

```r
SolrClient$new(host = "foobar.com", path = "search", port = NULL, scheme = "https")
```



## Query and body parameters

Another big change in the package is that we wanted to make it easy to determine whether your Solr query gets passed as query parameters in a `GET` request or as body in a `POST` request. Solr clients in some other languages do this, and it made sense to port over that idea here. Now you pass your key-value pairs to either `params` or `body`. If nothing is passed to `body`, we do a `GET` request. If something is passed to `body` we do a `POST` request, even if there's also key-value pairs passed to `params`.

This change does break the interface we had in the old version, but we think it's worth it.

For example, to do a search you have to pass the collection name and a list of named parameters:


```r
conn$search(name = "gettingstarted", params = list(q = "*:*"))
```

```
#> # A tibble: 5 x 5
#>      id   title title_str  `_version_` price
#>   <chr>   <chr>     <chr>        <dbl> <int>
#> 1    10 adfadsf   adfadsf 1.582913e+18    NA
#> 2    12  though    though 1.582913e+18    NA
#> 3    14 animals   animals 1.582913e+18    NA
#> 4     1    <NA>      <NA> 1.582913e+18   100
#> 5     2    <NA>      <NA> 1.582913e+18   500
```

You can instead pass the connection object to `solr_search`:


```r
solr_search(conn, name = "gettingstarted", params = list(q = "*:*"))
```

```
#> # A tibble: 5 x 5
#>      id   title title_str  `_version_` price
#>   <chr>   <chr>     <chr>        <dbl> <int>
#> 1    10 adfadsf   adfadsf 1.582913e+18    NA
#> 2    12  though    though 1.582913e+18    NA
#> 3    14 animals   animals 1.582913e+18    NA
#> 4     1    <NA>      <NA> 1.582913e+18   100
#> 5     2    <NA>      <NA> 1.582913e+18   500
```

And the same pattern applies for the other functions:

- `solr_facet`
- `solr_group`
- `solr_mlt`
- `solr_highlight`
- `solr_stats`
- `solr_all`



## New functions for atomic updates

[A user requested](https://github.com/ropensci/solrium/issues/97) the ability to do [atomic updates](https://lucene.apache.org/solr//guide/7_0/updating-parts-of-documents.html) - partial updates to documents without having to re-index the entire document.

Two functions were added: `update_atomic_json` and `update_atomic_xml` for JSON and XML based updates. Check out their help pages for usage.



## Search results as attributes

`solr_search` and `solr_all` in `v1` gain attributes that include `numFound`, `start`, and `maxScore`. That is, you can get to these three values after data is returned. Note that some Solr instances may not return all three values.

For example, let's use the Public Library of Science Solr search instance at <https://api.plos.org/search>:


```r
plos <- SolrClient$new(host = "api.plos.org", path = "search", port = NULL)
```

Search


```r
res <- plos$search(params = list(q = "*:*"))
```

Get attributes


```r
attr(res, "numFound")
#> [1] 1902279
attr(res, "start")
#> [1] 0
attr(res, "maxScore")
#> [1] 1
```



## Automatically adjust rows parameter

[A user higlighted](https://github.com/ropensci/solrium/pull/102) that [there's a performance penalty when asking for too many rows](https://wiki.apache.org/solr/SolrPerformanceProblems#Asking_for_too_many_rows). The resulting change in `solrium` is that in some search functions we automatically adjust the `rows` parameter to avoid the performance penalty.



## Usage in other packages

I maintain 4 other packages that use `solrium`: [rplos][], [ritis][], [rdatacite][], and [rdryad][]. If you are interested in using `solrium` in your package, looking at any of those four packages will give a good sense of how to do it.



## Notes

### solr pkg

The `solr` package will soon be archived on CRAN. We've moved all packages depending on it to `solrium`. Let me know ASAP if you have any complaints about archiving it on CRAN.

### Feedback!

Please do upgrade/install `solrium`  `v1` and let us know what you think.




[solr]: https://lucene.apache.org/solr//
[solrpkg]: https://github.com/ropensci/solr
[solrium]: https://github.com/ropensci/solrium
[es]: https://www.elastic.co/products/elasticsearch
[elastic]: https://github.com/ropensci/elastic
[rplos]: https://github.com/ropensci/rplos
[ritis]: https://github.com/ropensci/ritis
[rdatacite]: https://github.com/ropensci/rdatacite
[rdryad]: https://github.com/ropensci/rdryad
