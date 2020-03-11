---
slug: travis-osx
title: Testing packages with R Travis for OS-X
date: '2016-07-12'
author:
  - Jeroen Ooms
tags:
  - travis
  - CRAN
  - OSX
---

Travis is a continuous integration service which allows for running automated testing code everytime you push to GitHub. Hadley's [book](http://r-pkgs.had.co.nz/check.html) about R packages explains how and why R package authors should take advantage of this in their development process.

## The build matrix

Travis is now providing support for [multiple operating systems](https://docs.travis-ci.com/user/multi-os/), including Ubuntu 14.04 (Trusty) and various flavors of Mac OS-X. Jim Hester has done a great job of [tweaking](https://github.com/travis-ci/travis-build/commits/master/lib/travis/build/script/r.rb) the travis [R-language build script](https://github.com/travis-ci/travis-build/blob/master/lib/travis/build/script/r.rb) to automate building and checking of R packages on the various platforms.

Cross system testing is mainly useful to check packages with compiled code (i.e. C or C++) against various combinations of compiler versions, external libraries or system services. However any R package can easily be configured to take advantage of these features immediately. It is free and easy to setup!

[![Travis Screenshot](/assets/blog-images/travis.png)](https://travis-ci.org/rstats-db/RMySQL)

The R travis options are pretty well [documented](https://docs.travis-ci.com/user/languages/r). The quickest way to get started is by borrowing a `.travis.yml` configuration from another package. Below a few example packages with a multi-OS build matrix which illustrate various options:

 - [jqr](https://travis-ci.org/ropensci/jqr): basic example with C code: [.travis.yml](https://github.com/ropensci/jqr/blob/master/.travis.yml)
 - [jsonlite](https://travis-ci.org/jeroen/jsonlite): also requires a custom Latex package (preprint): [.travis.yml](https://github.com/jeroen/jsonlite/blob/master/.travis.yml)
 - [pdftools](https://travis-ci.org/ropensci/pdftools): requires external library (libpoppler): [.travis.yml](https://github.com/ropensci/pdftools/blob/master/.travis.yml)
 - [curl](https://travis-ci.org/jeroen/curl): external library (libcurl) and custom options: [.travis.yml](https://github.com/jeroen/curl/blob/master/.travis.yml)
 - [sodium](https://travis-ci.org/jeroen/sodium): depends on an external library from a PPA. [.travis.yml](https://github.com/jeroen/sodium/blob/master/.travis.yml)
 - [RMySQL](https://travis-ci.org/rstats-db/RMySQL): package with unit-tests that require both mysql server and client library. Also checks alternative configurations with mariadb: [.travis.yml](https://github.com/rstats-db/RMySQL/blob/master/.travis.yml)

For extra credit also check out the [feather](https://github.com/wesm/feather/blob/master/.travis.yml) package which uses a single platform but has a very cool build matrix targeting multiple compilers with both the python and R interfaces.

## Systems and Libraries

Most configuration options can either be set within or outside the multi-system build matrix (the `include` field in the yaml). Options which are set outside the matrix apply to each of the systems. If an option is both set within and outside the matrix the former overrides the latter.

The default system on Travis is currently still Ubuntu 12.04 (Precise). To build on Ubuntu 14.04 (Trusty) set the `dist` and `sudo` fields:

```
os: linux
dist: trusty
sudo: required
```

The `sudo` field is required to disable the docker environment which currently [does not support](https://docs.travis-ci.com/user/trusty-ci-environment/) Trusty yet. This [blog post](https://blog.rstudio.org/2016/03/09/r-on-travis-ci/) by RStudio has some more information about docker on Travis.

To build on OS-X set the `os` and `osx_image` fields:

```
os: osx
osx_image: xcode8
```

The `osx_image` field specifies which version of OS-X and X-code this system has. The Travis [OS-X manual](https://docs.travis-ci.com/user/osx-ci-environment/) lists which combinations are currently available.


## Homebrew

By default all OS-X images include a copy of homebrew. The `brew_packages` field can be used to install brew packages before building and checking the R package, similar to `apt_packages` on Linux. See [pdftools](https://github.com/ropensci/pdftools/blob/master/.travis.yml) or [sodium](https://github.com/jeroen/sodium/blob/master/.travis.yml) for examples.


```
os: osx
osx_image: xcode8
brew_packages: poppler
```

Set the `disable_homebrew` option to specifically test on a system without brew. The following config simulates the CRAN mac-builder machine which runs OS-X Mavericks 10.9:

```
os: osx
osx_image: beta-xcode6.1
disable_homebrew: true
```

## Additional OS-X options

Besides the version of OS-X and brew packages there are some additional options to customize the config. For example we can customize if Latex should be installed (defaults to true). Latex is huge and annoying so R packages that do not include pdf vignettes can significantly speed up the build process by disabling this.

```
latex: false
```

When latex is disabled `R CMD check` automatically runs with `--no-manual` to prevent check from failing to build the PDF manual. And while we're add it, to set additional custom `R CMD build` and `R CMD check` parameters:

```
r_build_args: '--no-build-vignettes'
r_check_args: '--ignore-vignettes --no-examples'
```

The [curl](https://github.com/jeroen/curl/blob/master/.travis.yml) config has a real world example. Finally you can put almost anything in the before and after install scripts. Use the `TRAVIS_OS_NAME` environment variable to run something only on OSX or Linux. An example from [jsonlite](https://github.com/jeroen/jsonlite/blob/master/.travis.yml) which installs a custom Latex package:

```
before_install:
  - if [ "${TRAVIS_OS_NAME}" == "osx" ]; then sudo tlmgr install preprint; fi
```

Travis R [documentation](https://docs.travis-ci.com/user/languages/r) has some more options.

Big thanks to Jim Hester and Craig Citro who have done all this amazing work to get R to work on Travis!
