---
slug: a-drat-repository-for-ropensci
title: A drat repository for rOpenSci
author:
  - Carl Boettiger
date: '2015-08-04'
tags:
  - R
  - drat
  - CRAN
  - packages
---


We're happy to announce the launch of a CRAN-style repository for rOpenSci at [http://packages.ropensci.org](http://packages.ropensci.org)

This repository contains the latest nightly builds from the master branch of all rOpenSci packages currently on GitHub. This allows users to install development versions of our software without specialized functions such as `install_github()`, allows
dependencies not hosted on CRAN to still be resolved automatically, and permits the use of `update.packages()`.


## Using the repository

To use, simply add
`packages.ropensci.org` to your existing list of R repos, such as:

```r
options(repos = c("http://packages.ropensci.org", getOption("repos"))
```

(If you don't have any default CRAN mirrors selected yet by `getOption("repos")`, you may want to add one now). You can also include this line in specific `install.packages()` requests:

```r
install.packages("taxize", repos = c("http://packages.ropensci.org", "http://cran.rstudio.com"))
```

## Design

Our goal in creating a CRAN-style package repository (yes, it's confusing that we use the word "repository" to describe both an individual package source in a GitHub _repo_ as well as a collection of package binaries on a CRAN-like _repo_... sorry) was to provide users with a way to install the latest development versions of rOpenSci packages that offered an easier and more seamless alternative to the widely used method of `devtools::install_github()`.  This would be particularly useful for updating all packages at once, or installing development versions that depended on other versions of packages not yet released to CRAN. As an added benefit, we also wanted a system that would allow us to compute anonymized download statistics, analogous to what RStudio provides for it's CRAN mirror.  Getting this all to work required the introduction of a few additional technologies.


### `drat` and `drat.builder`

While the basic structure of a CRAN-like R repository is simple, and used by both platforms such as [RForge](https://r-forge.r-project.org/) and individual developers, kudos really goes to Dirk Eddelbuettel's [drat](https://github.com/eddelbuettel/drat) package for really making this automated, simple, and fun.  While `drat` makes it easy to toss individual packages into a CRAN-like repo (which we often refer to as a `drat` repo), we needed an easy & automatic way to add a whole list of packages, given their GitHub repos.  Rich FitzJohn's new [drat.builder](https://github.com/richfitz/drat.builder) package does precisely this; handling the downloading of packages with some clever record-keeping to avoid building and adding packages which have not changed since the last time the `drat` repo was built.  The sources for building the rOpenSci packages repository can be found in our "drat" GitHub repo: [https://github.com/ropensci/drat](https://github.com/ropensci/drat)


### Dynamic package lists: `ropkgs`

With rOpenSci, we wanted to take this one step further.  No one wants to have to maintain one more list that must be updated every time a package is successfully on-boarded to the project.  Scott Chamberlain's work with [ropkgs](https://github.com/ropensci/ropkgs) provides a convenient way to query the rOpenSci software suite, automatically generating a list of available rOpenSci packages, and filtering them on relevant metadata, such as those that are in good status and installable condition, like so:

```r
library("ropkgs")
out <- ro_pkgs()
good <- out$packages$status == "good"
installable <- out$packages$installable
pkgs <- out$packages$name[installable & good]
```



### The magic of continuous integration: CircleCI

With `ropkgs`, `drat` and `drat.builder`, we now have everything we need to automate the building of the CRAN-like package repository.  Now we just need some computing resource that can do the hard work of pulling down all the GitHub packages, building the repository, and securely sending off the binaries somewhere they can be downloaded.  Continuous Integration systems turn out to be perfect for this.  My favorite CI platform at the moment is [CircleCi](https://circleci.com), for several reasons particularly relevant here:


- it has a rich API which includes support for `POST` requests which can trigger a build without making commits to GitHub
- it supports custom Docker containers, allowing us to just download a container with most or all the dependencies we need to build packages, etc., without having to wait for them to install manually from source first.
- it has a convenient web interface for providing secure credentials we'll need to publish the binary repository to GitHub or Amazon.

Circle has other advantages too, like great live help and the ability to ssh into your CI run to troubleshoot when all else fails, but otherwise works like most other CI platforms.  More on that another day. The daily builds are triggered by a simple `POST` request running as a cron job.  The circle.yml configuration file appears in the project's drat repo -- check out how simple it is!

### Publishing to Amazon

The last step would be getting download logs; which is somewhat more complicated than it sounds.  `drat` conveniently already handles pushing packages to GitHub's gh-pages, a free and easy way to provide static hosting.  This is free and easy, but isn't ideal, particularly for large and frequently updated package collections.  Also, it is impossible to get download logs from this approach. To avoid these issues, we settled on pushing our package repository to a static site hosted through Amazon's S3 data storage "buckets."  It's not free, but for at most a few gigs of space we'll need it's still very cost effective.  In particular, S3 buckets can generate their own log files, which provides a way to count package downloads.

Secure communication with Amazon S3 system is accomplished using the very nascent / actively developing [aws.s3](https://github.com/cloudyr/aws.s3) R package from the awesome [cloudyr](https://cloudyr.github.io/) project.


### Parsing the download logs

Amazon's S3 logs are rather raw and require some good ol data tidying work to transform them into the conveniently parsed, tidied and IP-address-anonymized format used by RStudio's download logs.  Eventually this too can be accomplished by the CircleCI builds, but at the moment is too computationally intensive for them.  A script for this work-flow can be found in the project repo, [parse_s3_logs.R](https://github.com/ropensci/drat/blob/gh-pages/parse_s3_logs.R).  As the data accumulate we should be able to start publishing the tidy logs.

This project is still in it's early days, and as ever, we welcome feedback, problems or ideas on the [issues tracker](https://github.com/ropensci/drat/issues).

---

Now go ahead and install or update some packages from the shiny new [http://packages.ropensci.org](http://packages.ropensci.org)!

