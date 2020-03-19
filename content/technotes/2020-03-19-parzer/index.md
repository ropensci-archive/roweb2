---
slug: "parzer"
title: "parzer: parse messy geographic coordinates"
date: 2020-03-19
author:
  - Scott Chamberlain
description: xxxx.
tags:
  - geospatial
  - parzer
output: 
  md_document:
    variant: gfm
    preserve_yaml: true
---

[parzer](https://github.com/ropensci/parzer) is a new package for
handling messy geographic coordinates. The first version is now on CRAN,
with binaries coming soon hopefully (see note about installation below).
The package recently [completed rOpenSci
review](https://github.com/ropensci/onboarding/issues/341).

## parzer motivation

The idea for this package started with a tweet from [Noam
Ross](https://ropensci.org/author/noam-ross/)
(<https://twitter.com/noamross/status/1070733367522590721>) about 15
months ago.

The idea being that sometimes you have geographic coordinates in a messy
format, or in many different formats, etc. You can think of it as being
the package for geographic coordinates that
[lubridate](https://cloud.r-project.org/web/packages/lubridate/) is for
dates.

I started off thinking about wrapping a Javascript library with
[Jeroen’s](https://ropensci.org/author/jeroen-ooms/)
[V8](https://cloud.r-project.org/web/packages/V8/) R package, but then
someone showed me or I found (can’t remember) [some C++
code](https://www.codeproject.com/Articles/15659/Longitude-Latitude-String-Parser-and-Formatter)
from back in 2006 that seemed appropriate. I figured I’d go down the C++
track instead of the Javascript track because I figured I could likely
get better performance out of C++ and have slightly less install
headaches for users.

## Package installation

The package is on CRAN so you can use `install.packages`

``` r
install.packages("parzer")
```

However, since this package requires compilation you probably want a
binary. Binaries are not available on CRAN yet. You can install a binary
like

``` r
install.packages("parzer", repos = "https://dev.ropensci.org/")
```

``` r
library(parzer)
```

Check out the package documentation to get started:
<https://docs.ropensci.org/parzer/>

<br><br>

## Package basics

The following is a summary of the functions in the package and what they
do:

Parse latitude or longitude separately

  - parse\_lat
  - parse\_lon

Parse latitudes and longitudes at the same time

  - parse\_lon\_lat

Parse into separate parts of degrees, minutes, seconds

  - parse\_parts\_lat
  - parse\_parts\_lon

Pull out separately degrees, minutes, seconds, or hemisphere

  - pz\_degree
  - pz\_minute
  - pz\_second
  - parse\_hemisphere

Add/subtract degrees, minutes, seconds

  - pz\_d
  - pz\_m
  - pz\_s

Some examples:

parse latitudes and longitudes

``` r
lats <- c("40.123°", "40.123N74.123W", "191.89", 12, "N45 04.25764")
parse_lat(lats)
```

    #> Warning in pz_parse_lat(lat): invalid characters, got: 40.123n74.123w

    #> Warning in pz_parse_lat(lat): not within -90/90 range, got: 191.89
    #>   check that you did not invert lon and lat

    #> [1] 40.12300      NaN      NaN 12.00000 45.07096

``` r
longs <- c("45W54.2356", "181", 45, 45.234234, "-45.98739874N")
parse_lon(longs)
```

    #> Warning in pz_parse_lon(lon): invalid characters, got: -45.98739874n

    #> [1] -45.90393 181.00000  45.00000  45.23423       NaN

In the above examples you can see there’s a mix of valid coordinate
values as well as invalid values. There’s a mix of types supported as
well.

Sometimes you may want to parse a geographic coordinate into its
component parts; `parse_parts_lat` and `parse_parts_lon` are what you
need:

``` r
x <- c("191.89", 12, "N45 04.25764")
parse_parts_lon(x)
```

    #> Warning in pz_parse_parts_lon(scrub(str)): invalid characters, got: n45 04.25764

    #>   deg min      sec
    #> 1 191  53 23.99783
    #> 2  12   0  0.00000
    #> 3  NA  NA      NaN

Taking a cue from lubridate, we thought it would be useful to make it
easier to add or subtract numbers for coordinates. Three functions help
with this:

``` r
pz_d(31)
#> 31
pz_d(31) + pz_m(44)
#> 31.73333
pz_d(31) - pz_m(44)
#> 30.26667
pz_d(31) + pz_m(44) + pz_s(59)
#> 31.74972
pz_d(-121) + pz_m(1) + pz_s(33)
#> -120.9742
```

<br><br>

## Use cases

Check out the [parzer use
cases](https://docs.ropensci.org/parzer/articles/use_cases.html)
vignette on the docs site. Get in touch if you have a use case that
might be good to add to that vignette.

## To Do

There’s more to do. We are thinking about [dropping the Rcpp
dependency](https://github.com/ropensci/parzer/issues/17), support
[parsing strings that have both latitude and longitude
together](https://github.com/ropensci/parzer/issues/3), [making error
messages better](https://github.com/ropensci/parzer/issues/5), and more.
