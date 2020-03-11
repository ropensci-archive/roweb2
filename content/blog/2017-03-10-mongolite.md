---
slug: mongolite
title: Release mongolite 1.0
author:
  - Jeroen Ooms
topicid: 626
date: '2017-03-10'
tags:
  - R
  - packages
  - databases
---


After 2.5 years of development, version 1.0 of the [mongolite](https://cran.r-project.org/web/packages/mongolite/index.html) package has been released to CRAN. The package is now stable, well documented, and will soon be submitted for peer review to be onboarded in the rOpenSci suite.

## MongoDB in R and mongolite

I started working on mongolite in September 2014, and it was first announced at the rOpenSci [unconf 2015](https://twitter.com/_inundata/status/581605601882480640/photo/1). At this time, there were already two Mongo clients on CRAN: [rmongodb](https://cran.r-project.org/web/packages/rmongodb/index.html) (no longer works) and [RMongo](https://cran.r-project.org/web/packages/RMongo/index.html) (depends on Java). However I found both of them pretty clunky, and the MongoDB folks had just released 1.0 of their new C driver, so I decided to write a new client from scratch.

Mongolite aims to provide a *simple* R client for MongoDB, based on the excellent [mongo-c-driver](https://github.com/mongodb/mongo-c-driver) combined with super-powers from the [jsonlite](https://cran.r-project.org/web/packages/jsonlite/index.html) package. Simple means insert and query data in R using data-frames with a single command:

```r
# Create a connection
con <- mongolite::mongo("diamonds",
  url = "mongodb://readwrite:test@ds043942.mongolab.com:43942/jeroen_test")

# Find diamonds with: cut == Premium & price < 500
mydata <- con$find('{"cut" : "Premium", "price" : { "$lt" : 500 } }')
print(mydata)
```

Running your own MongoDB server is easy. Either [download](https://www.mongodb.com/download-center) it from the website or install it with your favorite package manager. To start the server simply run the `mongod` command (d for daemon) in a shell:

```
# Install mongoDB server
brew install mongodb

# Run the server dameon
mongod
```

The `mongolite::mongo()` function wil default to the localhost server if no URI is specified. Try inserting and reading some data:

```r
# Create a connection
con <- mongolite::mongo("iris")

# Insert some data
con$insert(datasets::iris)

# Count how much data is in the DB
con$count()

# Read the data back
con$find('{}')

# Wipe the collection
con$drop()
```

In my experience, a simple interface is critical to get started. Obviously, advanced features are available in mongolite as well, but this will get you up to speed right way if you just need the data and get on with your job.

## Bookdown documentation

The 1.0 release has fresh documentation based on the awesome bookdown system. You can find documentation on the mongolite [github homepage](https://jeroen.github.io/mongolite/).

[![mongolite-docs](/assets/blog-images/mongolite-docs.png)](https://jeroen.github.io/mongolite/)

The bookdown is now the primary documentation source for mongolite.

## Why MongoDB

MongoDB is the [most popular](https://db-engines.com/en/ranking) nosql database (by market share), and the 5th most popular database allround. Mongo is relatively young in comparison with the traditional engines (Oracle, Microsoft, MySQL, Postgres), yet well established, fully open source, and backed by a professional company.

MongoDB provides a modern high-performance DB engine with cool features that cannot be found anywhere else. The high quality client drivers are a pleasure to work with, and actively maintained by professional engineers. Writing bindings, it quickly became obvious that Mongo does not suffer from the legacy bloat that I have come to associate with traditional DB engines.

At the same time the ecosystem is mature and offers reliability and continuity that makes it stand out from the proliferation of nosql systems. MongoDB has been widely adopted by users and distributions, so I am pretty confident it will still be around 5 or 10 years from now.


## Changes in 1.0

The [NEWS](https://github.com/jeroen/mongolite/blob/master/NEWS) file on Github lists what has changed in this release:

 - New mongo bookdown docs at https://jeroen.github.io/mongolite
 - Update mongo-c-driver to upstream 1.6.0
 - Add basic decimal 128 support (coerce to double)
 - Improve enterprise authentication for LDAP, X509 and Kerberos
 - Windows: build with SSPI instead of SASL
 - Added `allow_invalid_hostname` parameter to `ssl_options()`
 - Option `bigint_as_char` to parse int64 into string instead of double
 - New function `mongo_options()` to get/set global options
 - Function `mongo_log_level()` is removed (use `mongo_options()` instead)
 - `insert()` now substitutes dots in key (column) names with underscores
 - Various fixes in `update()`, support for upsert
 - Add unit tests from bson spec (some tests fail in mongo-c-driver)
 - Switch to new C driver API mongoc_collection_find_with_opts()
 - Add R_registerRoutines() call to please CMD check


## Tell us what you think

At rOpenSci we're interested to hear who is using R and how. If you decide to give mongolite a try, please share your experiences and suggestions. Open an [issue on github](https://github.com/jeroen/mongolite/issues) for specific problems and feature requests, or join the rOpenSci [slack](https://ropensci.slack.com) to talk about mongolite or other rOpenSci packages. Or just come say hi and hang out :)

We both love hearing from academic users, but also industry applications of R and synergy between the industry and open source scientific software.
