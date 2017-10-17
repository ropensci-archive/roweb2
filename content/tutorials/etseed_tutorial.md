---
title: etseed tutorial
package_version: 0.1.0
---



`etcd` is a key-value DB written in `Go`. It has an HTTP API, which this R package wraps.

[etcd API docs](https://github.com/coreos/etcd/blob/master/Documentation/v2/api.md)

**Installing etcd**

See the [etcd Github repo](https://github.com/coreos/etcd#etcd) for help on installing `etcd`.

There are various ways to install it, and they depend on your operating sytsem.

You can install via `homebrew`, install from source, and via Docker.

**Start etcd**

at the command line

```sh
etcd
```

> how to start etcd may differ depending on your setup


### Installation

Stable version from CRAN


```r
install.packages("etseed")
```

Development version from GitHub


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropensci/etseed")
```


```r
library("etseed")
```


### Usage

**Make a client**

First task when using this package is to initialize a client
with the `etcd()` function. it's a wrapper around an R6 class.


```r
(client <- etcd())
#> <etcd client>
#>   host: 127.0.0.1
#>   port: 2379
#>   api_version: v2
#>   scheme: http
#>   allow redirect: TRUE
```

Default settings in `etcd()` connect you to `localhost`, and port `2379`,
using etcd API version 2, with an `http` scheme.

**Get version**


```r
client$version()
#> $etcdserver
#> [1] "3.2.9"
#> 
#> $etcdcluster
#> [1] "3.2.0"
```

**Create a directory**




```r
client$create("/neighbor", dir = TRUE)
#> $action
#> [1] "set"
#> 
#> $node
#> $node$key
#> [1] "/neighbor"
#> 
#> $node$dir
#> [1] TRUE
#> 
#> $node$modifiedIndex
#> [1] 6480
#> 
#> $node$createdIndex
#> [1] 6480
```

**Create a key**




```r
client$create(key = "/mykey", value = "this is awesome")
#> $action
#> [1] "set"
#> 
#> $node
#> $node$key
#> [1] "/mykey"
#> 
#> $node$value
#> [1] "this is awesome"
#> 
#> $node$modifiedIndex
#> [1] 6482
#> 
#> $node$createdIndex
#> [1] 6482
```



Use `ttl` parameter to make it dissappear after `x` seconds


```r
client$create(key = "/stuff", value = "tables", ttl = 5)
#> $action
#> [1] "set"
#> 
#> $node
#> $node$key
#> [1] "/stuff"
#> 
#> $node$value
#> [1] "tables"
#> 
#> $node$expiration
#> [1] "2017-10-17T00:19:35.356961171Z"
#> 
#> $node$ttl
#> [1] 5
#> 
#> $node$modifiedIndex
#> [1] 6483
#> 
#> $node$createdIndex
#> [1] 6483
```

And the key will be gone after 5 seconds, see:


```r
client$key("/stuff")
#> Error in etcd_GET(sprintf("%s%s/%s/", etcdbase(), "keys", key), ...) :
#>   client error: (404) Not Found
```

**Update a key**



Create a key


```r
client$create(key = "/foo", value = "bar")
#> $action
#> [1] "set"
#> 
#> $node
#> $node$key
#> [1] "/foo"
#> 
#> $node$value
#> [1] "bar"
#> 
#> $node$modifiedIndex
#> [1] 6485
#> 
#> $node$createdIndex
#> [1] 6485
```

Then update the key


```r
client$update(key = "/foo", value = "bar stool")
#> $action
#> [1] "set"
#> 
#> $node
#> $node$key
#> [1] "/foo"
#> 
#> $node$value
#> [1] "bar stool"
#> 
#> $node$modifiedIndex
#> [1] 6486
#> 
#> $node$createdIndex
#> [1] 6486
#> 
#> 
#> $prevNode
#> $prevNode$key
#> [1] "/foo"
#> 
#> $prevNode$value
#> [1] "bar"
#> 
#> $prevNode$modifiedIndex
#> [1] 6485
#> 
#> $prevNode$createdIndex
#> [1] 6485
```

**Create in-order keys**


```r
client$create_inorder("/queue", "thing1")
#> $action
#> [1] "create"
#> 
#> $node
#> $node$key
#> [1] "/queue/00000000000000006487"
#> 
#> $node$value
#> [1] "thing1"
#> 
#> $node$modifiedIndex
#> [1] 6487
#> 
#> $node$createdIndex
#> [1] 6487
```


```r
client$create_inorder("/queue", "thing2")
#> $action
#> [1] "create"
#> 
#> $node
#> $node$key
#> [1] "/queue/00000000000000006488"
#> 
#> $node$value
#> [1] "thing2"
#> 
#> $node$modifiedIndex
#> [1] 6488
#> 
#> $node$createdIndex
#> [1] 6488
```


```r
client$create_inorder("/queue", "thing3")
#> $action
#> [1] "create"
#> 
#> $node
#> $node$key
#> [1] "/queue/00000000000000006489"
#> 
#> $node$value
#> [1] "thing3"
#> 
#> $node$modifiedIndex
#> [1] 6489
#> 
#> $node$createdIndex
#> [1] 6489
```

**List keys**


```r
client$keys()
#> $action
#> [1] "get"
#> 
#> $node
#> $node$dir
#> [1] TRUE
#> 
#> $node$nodes
#> $node$nodes[[1]]
#> $node$nodes[[1]]$key
#> [1] "/mykey"
#> 
#> $node$nodes[[1]]$value
#> [1] "this is awesome"
#> 
#> $node$nodes[[1]]$modifiedIndex
#> [1] 6482
#> 
#> $node$nodes[[1]]$createdIndex
#> [1] 6482
#> 
#> 
#> $node$nodes[[2]]
#> $node$nodes[[2]]$key
#> [1] "/foo"
#> 
#> $node$nodes[[2]]$value
#> [1] "bar stool"
#> 
#> $node$nodes[[2]]$modifiedIndex
#> [1] 6486
#> 
#> $node$nodes[[2]]$createdIndex
#> [1] 6486
#> 
#> 
#> $node$nodes[[3]]
#> $node$nodes[[3]]$key
#> [1] "/spnacziur"
#> 
#> $node$nodes[[3]]$value
#> [1] "saturn cow and moon cheese"
#> 
#> $node$nodes[[3]]$modifiedIndex
#> [1] 6452
#> 
#> $node$nodes[[3]]$createdIndex
#> [1] 6452
#> 
#> 
#> $node$nodes[[4]]
#> $node$nodes[[4]]$key
#> [1] "/neighbor"
#> 
#> $node$nodes[[4]]$dir
#> [1] TRUE
#> 
#> $node$nodes[[4]]$modifiedIndex
#> [1] 6480
#> 
#> $node$nodes[[4]]$createdIndex
#> [1] 6480
#> 
#> 
#> $node$nodes[[5]]
#> $node$nodes[[5]]$key
#> [1] "/bgkalixcd"
#> 
#> $node$nodes[[5]]$dir
#> [1] TRUE
#> 
#> $node$nodes[[5]]$modifiedIndex
#> [1] 6446
#> 
#> $node$nodes[[5]]$createdIndex
#> [1] 6446
#> 
#> 
#> $node$nodes[[6]]
#> $node$nodes[[6]]$key
#> [1] "/stuff"
#> 
#> $node$nodes[[6]]$value
#> [1] "tables"
#> 
#> $node$nodes[[6]]$expiration
#> [1] "2017-10-17T00:19:35.356961171Z"
#> 
#> $node$nodes[[6]]$ttl
#> [1] 5
#> 
#> $node$nodes[[6]]$modifiedIndex
#> [1] 6483
#> 
#> $node$nodes[[6]]$createdIndex
#> [1] 6483
#> 
#> 
#> $node$nodes[[7]]
#> $node$nodes[[7]]$key
#> [1] "/queue"
#> 
#> $node$nodes[[7]]$dir
#> [1] TRUE
#> 
#> $node$nodes[[7]]$modifiedIndex
#> [1] 6463
#> 
#> $node$nodes[[7]]$createdIndex
#> [1] 6463
```

**List a key**


```r
client$key("/mykey")
#> $action
#> [1] "get"
#> 
#> $node
#> $node$key
#> [1] "/mykey"
#> 
#> $node$value
#> [1] "this is awesome"
#> 
#> $node$modifiedIndex
#> [1] 6482
#> 
#> $node$createdIndex
#> [1] 6482
```



### Citing

> Scott Chamberlain (2016). etseed: Client for 'etcd', a 'Key-value' Database. R package version 0.1.0. https://cran.rstudio.com/package=etseed



### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our GitHub repo for etseed](https://github.com/ropensci/etseed/issues?state=open)


[Back to top](#top)
