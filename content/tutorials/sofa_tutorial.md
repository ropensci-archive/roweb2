---
title: sofa tutorial
package_version: 0.2.0
---



`sofa` provides an interface to the 'NoSQL' database 'CouchDB' (<http://couchdb.apache.org>).

CouchDB links

+ [Apache CouchDB](http://couchdb.apache.org/).
+ [CouchDB guide - online book and hard copy](http://guide.couchdb.org/).

## Install CouchDB

Go to <http://docs.couchdb.org/en/2.0.0/install/index.html> for instructions.

## Connect to CouchDB

This may be starting it on your terminal/shell

```sh
couchdb
```

Or opening the CouchDB app on your machine, or running it in docker. Whatever it
is, start it up.

You can interact with your CouchDB databases as well in your browser. Navigate to http://localhost:5984/_utils



### Installation

Stable version from CRAN


```r
install.packages("sofa")
```

Development version from GitHub


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropensci/sofa")
```


```r
library("sofa")
```


## Usage

### Create a connection client


```r
(x <- Cushion$new())
#> <sofa - cushion> 
#>   transport: http
#>   host: 127.0.0.1
#>   port: 5984
#>   path: 
#>   type: 
#>   user: 
#>   pwd:
```

### Ping your server


```r
ping(x)
#> $couchdb
#> [1] "Welcome"
#> 
#> $version
#> [1] "2.1.0"
#> 
#> $features
#> $features[[1]]
#> [1] "scheduler"
#> 
#> 
#> $vendor
#> $vendor$name
#> [1] "The Apache Software Foundation"
```

### Create a new database




```r
db_create(x, 'cats')
#> $ok
#> [1] TRUE
```

### List databases


```r
db_list(x)
#>  [1] "bulkfromchr" "bulktest2"   "bulktest3"   "cats"        "cchecksdb"  
#>  [6] "drinksdb"    "iris190"     "iris984"     "irisrows"    "testing123"
```

### Create a document


```r
doc1 <- '{"name": "leo", "color": "blue", "furry": true, "size": 1}'
doc_create(x, dbname = "cats", doc1, docid = "bluecat")
#> $ok
#> [1] TRUE
#> 
#> $id
#> [1] "bluecat"
#> 
#> $rev
#> [1] "1-41784f190c466d990684003a958c9f39"
```

and another!


```r
doc2 <- '{"name": "samson", "color": "red", "furry": false, "size": 3}'
doc_create(x, dbname = "cats", doc2)
#> $ok
#> [1] TRUE
#> 
#> $id
#> [1] "faa356c2302d8c8ac5800effc3000f83"
#> 
#> $rev
#> [1] "1-08aef850a23f5ff95869c9cf5d9604dc"
```

and one more, cause 3's company


```r
doc3 <- '{"name": "matilda", "color": "green", "furry": false, "size": 5}'
doc_create(x, dbname = "cats", doc3)
#> $ok
#> [1] TRUE
#> 
#> $id
#> [1] "faa356c2302d8c8ac5800effc300131a"
#> 
#> $rev
#> [1] "1-73443af61b0149e4c3e138b870e72602"
```

Note how we used a document id in the first document creation, but
not in the second. Using a document id is optional.

### Changes feed


```r
db_changes(x, "cats")
#> $results
#> $results[[1]]
#> $results[[1]]$seq
#> [1] "1-g1AAAAB5eJzLYWBgYMpgTmEQTM4vTc5ISXLIyU9OzMnILy7JAUklMiTV____PyuDOZExFyjAbm5pmmRsaoxNAx5j8liAJEMDkPoPMi2RIQsAr18mRA"
#> 
#> $results[[1]]$id
#> [1] "faa356c2302d8c8ac5800effc300131a"
#> 
#> $results[[1]]$changes
#> $results[[1]]$changes[[1]]
#> $results[[1]]$changes[[1]]$rev
#> [1] "1-73443af61b0149e4c3e138b870e72602"
#> 
#> 
#> 
#> 
#> $results[[2]]
#> $results[[2]]$seq
#> [1] "2-g1AAAACbeJzLYWBgYMpgTmEQTM4vTc5ISXLIyU9OzMnILy7JAUklMiTV____PyuDOZExFyjAbm5pmmRsaoxNAx5j8liAJEMDkPqPYlqKhYl5moUhNn1ZAFAWMFA"
#> 
#> $results[[2]]$id
#> [1] "bluecat"
#> 
#> $results[[2]]$changes
#> $results[[2]]$changes[[1]]
#> $results[[2]]$changes[[1]]$rev
#> [1] "1-41784f190c466d990684003a958c9f39"
#> 
#> 
#> 
#> 
#> $results[[3]]
#> $results[[3]]$seq
#> [1] "3-g1AAAACbeJzLYWBgYMpgTmEQTM4vTc5ISXLIyU9OzMnILy7JAUklMiTV____PyuDOZExFyjAbm5pmmRsaoxNAx5j8liAJEMDkPoPNY0JbFqKhYl5moUhNn1ZAFA4MFE"
#> 
#> $results[[3]]$id
#> [1] "faa356c2302d8c8ac5800effc3000f83"
#> 
#> $results[[3]]$changes
#> $results[[3]]$changes[[1]]
#> $results[[3]]$changes[[1]]$rev
#> [1] "1-08aef850a23f5ff95869c9cf5d9604dc"
#> 
#> 
#> 
#> 
#> 
#> $last_seq
#> [1] "3-g1AAAACbeJzLYWBgYMpgTmEQTM4vTc5ISXLIyU9OzMnILy7JAUklMiTV____PyuDOZExFyjAbm5pmmRsaoxNAx5j8liAJEMDkPoPNY0JbFqKhYl5moUhNn1ZAFA4MFE"
#> 
#> $pending
#> [1] 0
```

### Search

The simplest search just returns the documents.


```r
db_query(x, dbname = "cats", selector = list(`_id` = list(`$gt` = NULL)))$docs
#> [[1]]
#> [[1]]$`_id`
#> [1] "bluecat"
#> 
#> [[1]]$`_rev`
#> [1] "1-41784f190c466d990684003a958c9f39"
#> 
#> [[1]]$name
#> [1] "leo"
#> 
#> [[1]]$color
#> [1] "blue"
#> 
#> [[1]]$furry
#> [1] TRUE
#> 
#> [[1]]$size
#> [1] 1
#> 
#> 
#> [[2]]
#> [[2]]$`_id`
#> [1] "faa356c2302d8c8ac5800effc3000f83"
#> 
#> [[2]]$`_rev`
#> [1] "1-08aef850a23f5ff95869c9cf5d9604dc"
#> 
#> [[2]]$name
#> [1] "samson"
#> 
#> [[2]]$color
#> [1] "red"
#> 
#> [[2]]$furry
#> [1] FALSE
#> 
#> [[2]]$size
#> [1] 3
#> 
#> 
#> [[3]]
#> [[3]]$`_id`
#> [1] "faa356c2302d8c8ac5800effc300131a"
#> 
#> [[3]]$`_rev`
#> [1] "1-73443af61b0149e4c3e138b870e72602"
#> 
#> [[3]]$name
#> [1] "matilda"
#> 
#> [[3]]$color
#> [1] "green"
#> 
#> [[3]]$furry
#> [1] FALSE
#> 
#> [[3]]$size
#> [1] 5
```

Search for cats that are red


```r
db_query(x, dbname = "cats", selector = list(color = "red"))$docs
#> [[1]]
#> [[1]]$`_id`
#> [1] "faa356c2302d8c8ac5800effc3000f83"
#> 
#> [[1]]$`_rev`
#> [1] "1-08aef850a23f5ff95869c9cf5d9604dc"
#> 
#> [[1]]$name
#> [1] "samson"
#> 
#> [[1]]$color
#> [1] "red"
#> 
#> [[1]]$furry
#> [1] FALSE
#> 
#> [[1]]$size
#> [1] 3
```

Search for cats that are furry


```r
db_query(x, dbname = "cats", selector = list(size = list(`$gt` = 2)))$docs
#> [[1]]
#> [[1]]$`_id`
#> [1] "faa356c2302d8c8ac5800effc3000f83"
#> 
#> [[1]]$`_rev`
#> [1] "1-08aef850a23f5ff95869c9cf5d9604dc"
#> 
#> [[1]]$name
#> [1] "samson"
#> 
#> [[1]]$color
#> [1] "red"
#> 
#> [[1]]$furry
#> [1] FALSE
#> 
#> [[1]]$size
#> [1] 3
#> 
#> 
#> [[2]]
#> [[2]]$`_id`
#> [1] "faa356c2302d8c8ac5800effc300131a"
#> 
#> [[2]]$`_rev`
#> [1] "1-73443af61b0149e4c3e138b870e72602"
#> 
#> [[2]]$name
#> [1] "matilda"
#> 
#> [[2]]$color
#> [1] "green"
#> 
#> [[2]]$furry
#> [1] FALSE
#> 
#> [[2]]$size
#> [1] 5
```

Return only certain fields


```r
db_query(x, dbname = "cats",
         selector = list(size = list(`$gt` = 2)),
         fields = c("name", "color"))$docs
#> [[1]]
#> [[1]]$name
#> [1] "samson"
#> 
#> [[1]]$color
#> [1] "red"
#> 
#> 
#> [[2]]
#> [[2]]$name
#> [1] "matilda"
#> 
#> [[2]]$color
#> [1] "green"
```



### Citing

> Scott Chamberlain (2016). sofa: Connector to 'CouchDB'. R package version 0.2.0. https://github.com/ropensci/sofa



### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our GitHub repo for sofa](https://github.com/ropensci/sofa/issues?state=open)


[Back to top](#top)
