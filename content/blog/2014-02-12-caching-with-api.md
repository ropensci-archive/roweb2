---
slug: caching-with-api
title: Caching Encyclopedia of Life API calls
date: '2014-02-12'
author:
  - Scott Chamberlain
tags:
  - R
  - API
  - EOL
---

In [a recent blog post][cacheoff] we discussed caching calls to the web offline, on your own computer. Just like you can cache data on your own computer, a data provider can do the same thing. Most of the data providers we work with do not provide caching. However, at least one does: [EOL][eol], or Encyclopedia of Life. EOL allows you to set the amount of time (in seconds) that the call is cached, within which time you can make the same call and get the data back faster. We have a number of functions to interface with EOL in our `taxize` package.

Install and load `taxize` and `ggplot2`.


```r
install.packages(c("taxize", "ggplot2"))
```



```r
library(taxize)
library(ggplot2)
```


To easily visualize the benefit of using EOL's caching, let's define a function to:

* Make a call to the EOL API search service (via the `eol_search` function in `taxize`) with caching set to X seconds (which means the cached result will be available for X seconds). This first call caches the query on their servers. Note that in the `eol_search` function below, we are using the `cache_ttl` parameter to set the number of seconds to cache the request.
* The second call is done before X seconds pass, so should be faster as the first one was cached.
* Sleep for a period, a bit longer than the amount of time the call is cached.
* The third call occurs after the cached call should be gone on the EOL servers.
* Plot the times each request took.


```r
testcache <- function(terms, cache){
  first <- system.time( eol_search(terms=terms, cache_ttl = cache) )
  second <- system.time( eol_search(terms=terms, cache_ttl = cache) )
  Sys.sleep(cache+2)
  third <- system.time( eol_search(terms=terms, cache_ttl = cache) )

  df <- data.frame(labs=c('nocache','withcache','cachetimedout'),
                   vals=c(first[[3]], second[[3]], third[[3]]))
  df$labs <- factor(df$labs, levels = c('nocache','withcache','cachetimedout'))
  ggplot(df, aes(labs, vals)) +
    geom_bar(stat='identity') +
    theme_grey(base_size = 20) +
    ggtitle(sprintf("search term: '%s'\n", terms)) +
    labs(y='Time to get data\n', x='')
}
```


Search for the term _lion_


```r
testcache(terms = "lion", cache = 5)
```

![](/assets/blog-images/2014-02-12-caching-with-api/unnamed-chunk-4.png)


Search for the term _beetle_


```r
testcache(terms = "beetle", cache = 10)
```

![](/assets/blog-images/2014-02-12-caching-with-api/unnamed-chunk-5.png)


Caching works the same way with the `eol_pages` function. No other API services and associated functions in `taxize` support caching on the server side by the data provider. Of course you can do your own caching using `knitr` or other methods - some of which we discussed in [an earlier post][cacheoff].

[cacheoff]: /blog/2014/02/03/caching-offline/
[eol]: https://eol.org/
