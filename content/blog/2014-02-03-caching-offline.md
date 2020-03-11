---
slug: caching-offline
title: Caching API calls offline
date: '2014-02-03'
author:
  - Scott Chamberlain
tags:
  - R
  - API
---

I've recently heard the idea of "offline first" via especially [Hood.ie](http://hood.ie/). We of course don't do web development, but primarily build R interfaces to data on the web. Internet availablility is increasinghly ubiqutous, but there still are times and places where you don't have internet, but need to get work done.

In the R packages we write there are generally two steps to every workflow:

1. Make a call to the web to request data and collect data
2. Rearrange the result as some sort of R object (e.g., an R `data.frame`), then visualize, analyze, etc.

The first process is not possible if you don't have an internet connection - making the second step fail as a result.

We often run our code many many times over. Given that rule, when we use packages that make calls to the web in our workflows, wouldn't it be nice if those calls were cached locally so that if you are offline, and you have run the code previously while online, you can still run the code?

This is possible if we use caching which isn't a new concept. In fact, if you use `knitr`, you can optionally cache each code chunk so that you could still run code offline if the code has been run previously while online.

However, I personally don't start out every analysis in a `.Rmd` or `.Rnw` document with caching turned on, so what is an alternate solution?

Enter `mocker`. `mocker` is an R package that attemps to abstract away the details of caching calls to the web, while allowing those interested fine grained control. In plain english, this means, it tries to make caching super easy, but let more technical people do more sophisticated caching.

There is a tradeoff between speed and utility in caching. There is straightup caching (using e.g., `saveRDS` or `R.cache`) to a file on your machine, which is fast, but of course then you simply have a bunch of files. If you use a key-value store (Redis via `rredis`), the act of caching is a bit slower, but you gain the ability to do more things with your key-value store than just retrieving your object. Last, you can use a NoSQL document database like CouchDB (via my own `sofa` or `R4CouchDB`), which offers even more flexibility, but is even slower than the first two options.

The goal of `mocker` is to make this all easy. Beginners can get the benefits of offline data availability by using default options, which writes to a local file (e.g., using `R.cache`), but advanced users can use the Redis option (via `rredis`) to then later access their data for another context if they so choose.

To demonstrate, I'll use the PLOS search API. I wrote a little function that mimics what an actual function may be. The function takes in a query term, and asks for id, author, and abstract fields back (with the `fl` parameter), only full articles (with the `fq` parameter), data type json (with the `wt` parameter), and limits to 100 results.

```r
cachefxn <- function(q="*:*", db=NULL, cache=FALSE, backend='local', path)
{
  # get api query ready
  url = "http://api.plos.org/search"
  args <- list(q=q, fl='id,author,abstract', fq='doc_type:full', wt='json', limit=100)

  # create a key
  cachekey <- make_key(url, args)

  # if cache=TRUE, check for data in backend using key, if cache=FALSE, returns NULL
  out <- cache_get(cache, cachekey, backend, path, db=db)

  # if out=NULL, proceed to make call to web
  if(!is.null(out)){ out } else
  {
    tt <- GET(url, query = args)
    stop_for_status(tt)
    temp <- content(tt, as = "text")
    # If cache=TRUE, cache key and value in chosen backend
    cache_save(cache, cachekey, temp, backend, path, db = db)
    return( temp )
  }
}
```

I'll define a query term `q` that we'll pass in to the `cachefxn` function each time.


```r
library(mocker)
q <- "cell biology"
```


The first and fastest option (at least in my testing) is local storage via `saveRDS`. This is the default option. The 1st run with `cache=TRUE` is the same speed as `cache=FALSE`. Then, then 2nd time the function is called with `cache=TRUE`, the call is much, much faster as your simply calling the data from local storage. Internally, the url constructed for the particular base URL and query terms is used as a key to store the data with, or converted to a hash and then stored, and then searched for in your chosen `backend`. If it is found then the value is returned. If it is not found, then the function proceeeds to send the query to the web.

Here, local storage is much faster than calling from the web. The first call goes to the web, while the second returns data via `readRDS`.


```r
system.time(cachefxn(q = q, cache = TRUE, path = "~/scottscache/", backend = "local"))
```

```
##    user  system elapsed
##   0.020   0.001   1.609
```



```r
system.time(cachefxn(q = q, cache = TRUE, path = "~/scottscache/", backend = "local"))
```

```
##    user  system elapsed
##   0.003   0.001   0.003
```


`R.cache` works about the same way, so I won't go over that.

Redis is an interesting option as it is not much slower than local storage, but offers more flexibility. For example, your data stored in Redis can be pushed up to a cloud backed instance of Redis, and you're probably less likley to delete your data in Redis relative to local files stored in the above method. First, startup Redis in your shell

```
redis-server
```

Then choose `backend='redis'`:


```r
system.time(cachefxn(q = q, cache = TRUE, backend = "redis"))
```

```
##    user  system elapsed
##   0.023   0.002   1.973
```



```r
system.time(cachefxn(q = q, cache = TRUE, backend = "redis"))
```

```
##    user  system elapsed
##   0.004   0.001   0.004
```


Here's some benchmarking to show all methods together:

```r
library(microbenchmark)
microbenchmark(
 saveRDS=cachefxn(q=q, cache=TRUE, path="~/scottscache/"),
 R.cache=cachefxn(q=q, cache=TRUE, backend="rcache"),
 Redis=cachefxn(q=q, cache=TRUE, backend="redis"),
 SQLite=cachefxn(q=q, cache=TRUE, backend="sqlite", db=sqldb),
 CouchDB=cachefxn(q=q, cache=TRUE, backend="couchdb", db=cdb),
 times=50
)
```

```r
Unit: milliseconds
    expr       min        lq    median        uq       max neval
   local  4.007978  4.278275  4.362870  4.816612  6.675667    50
  R.cache  4.461892  4.824427  5.038775  5.801503  8.543470    50
   redis  5.624845  6.146504  6.401435  7.075442  9.408585    50
  sqlite 10.074079 10.652784 11.210765 12.425844 18.450480    50
 couchdb 25.964903 27.661443 29.219574 32.668773 36.355845    50
```

This is all moot if you do all your coding within a `knitr` context (latex or markdown), and can easily then cache everything. However, I think this approach may be useful in that it can make it seem as though you have a live internet connection when in fact there isn't one. Let's say you're on a flight where internet costs $10 for 2 hours. You're a grad student so of course you don't pay for it. But not to worry! If you've executed the code previously with caching on, then the data acquisition step is okay, and you can continue to work on any downstream data manipulation and analyses steps.
