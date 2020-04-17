---
slug: "conditionz"
title: "conditionz: control how many times conditions are thrown"
date: 2019-04-24
author:
  - Scott Chamberlain
topicid: 1680
tags:
- R
- conditions
- conditionz
---



conditionz is a new (just on CRAN today) R package for controlling how many times conditions are thrown.

This package arises from an annoyance in another set of packages I maintain: The [brranching][] package uses
the [taxize][] package internally, calling it’s function `taxize::tax_name()`. The `taxize::tax_name()` function
throws useful messages to the user if their API key is not found, and gives them instructions
on how to find it. However, the user does not have to get an API key. If they don’t they then get subjected to
lots of repeats of the same message.

I wondered if there’s anything that could be done about this. That is, if the same message is going to be
thrown that was already thrown within a function call, just skip additional messages that are the same.
(The tibble package has something like this, but as part of the package itself AFAICT)

The package has the following API:

- `ConditionKeeper`
- `handle_conditions()`
- `handle_messages()`
- `handle_warnings()`

Exported but mostly meant for internal use:

- `capture_message()`
- `capture_warning()`



Links:

* conditionz source code: <https://github.com/ropenscilabs/conditionz>
* conditionz on CRAN: <https://cran.rstudio.com/web/packages/conditionz/>
* blog post on the braintstorming period of this package: <https://recology.info/2018/12/condition-control/>




## Installation

Install from CRAN


```r
install.packages("conditionz")
```

Development version


```r
remotes::install_github("ropenscilabs/conditionz")
```

Load conditionz


```r
library(conditionz)
```



## ConditionKeeper

`ConditionKeeper` is an R6 class that keeps track of conditions and lets
us determine if conditions have been encountered, how many times they've 
been encountered, etc.


```r
x <- ConditionKeeper$new(times = 4)
x
#> ConditionKeeper
#>  id: ea812b48-5137-4d1b-827a-ae79f59f0ad2
#>  times: 4
#>  messages: 0
x$get_id()
#> [1] "ea812b48-5137-4d1b-827a-ae79f59f0ad2"
x$add("one")
x$add("two")
x
#> ConditionKeeper
#>  id: ea812b48-5137-4d1b-827a-ae79f59f0ad2
#>  times: 4
#>  messages: 2
#>   one  two
x$thrown_already("one")
#> [1] TRUE
x$thrown_already("bears")
#> [1] FALSE
x$not_thrown_yet("bears")
#> [1] TRUE

x$add("two")
x$add("two")
x$add("two")
x$thrown_times("two")
#> [1] 4
x$thrown_enough("two")
#> [1] TRUE
x$thrown_enough("one")
#> [1] FALSE
```

### ConditionKeeper Usage

A simple function that throws messages


```r
squared <- function(x) {
  stopifnot(is.numeric(x))
  y <- x^2
  if (y > 20) message("woops, > than 20! check your numbers")
  return(y)
}
foo <- function(x) {
  vapply(x, function(z) squared(z), numeric(1))
}
bar <- function(x, times = 1) {
  y <- ConditionKeeper$new(times = times)
  on.exit(y$purge())
  vapply(x, function(z) y$handle_conditions(squared(z)), numeric(1))
}
```

Running the function normally throws many messages


```r
foo(1:10)
#> woops, > than 20! check your numbers
#> woops, > than 20! check your numbers
#> woops, > than 20! check your numbers
#> woops, > than 20! check your numbers
#> woops, > than 20! check your numbers
#> woops, > than 20! check your numbers
#>  [1]   1   4   9  16  25  36  49  64  81 100
```

Using in `ConditionKeeper` allows you to control how many messages
are thrown


```r
bar(x = 1:10)
#> woops, > than 20! check your numbers
#>  [1]   1   4   9  16  25  36  49  64  81 100
```


```r
bar(1:10, times = 3)
#> woops, > than 20! check your numbers
#> 
#> woops, > than 20! check your numbers
#> 
#> woops, > than 20! check your numbers
#>  [1]   1   4   9  16  25  36  49  64  81 100
```



## handle_conditions

The function `handle_conditions`/`handle_warnings`/`handle_messages` use 
`ConditionKeeper` internally, and are meant as a simpler, but less flexible
alternative.

For now, `handle_conditions`/`handle_warnings`/`handle_messages` only allow 
throwing the condition 1 time with the `times` parameter. I hope to fix this 
so you can choose any number you like. 

A small example. Here a function that prints a message with every part of the
input vector.


```r
foo <- function(x) {
  for (i in x) message("you gave: ", i)
  return(x)
}
```

If we call that function with the vector `1:5` we get five messages


```r
foo(1:5)
#> you gave: 1
#> you gave: 2
#> you gave: 3
#> you gave: 4
#> you gave: 5
#> [1] 1 2 3 4 5
```

If we wrap the `foo()` function call in handle_conditions we get only 
one message thrown


```r
handle_conditions(foo(1:5))
#> you gave: 1
#> [1] 1 2 3 4 5
```

The default for the `condition` parameter is "message", and calling `handle_messages`
does the same thing


```r
handle_messages(foo(1:5))
#> you gave: 1
#> [1] 1 2 3 4 5
```

For warnings, call `handle_warnings()` or set `handle_conditions(..., condition = "warning")`




## To do

- I'm expecting use cases that I haven't accounted for, the so-called unknown unknowns
- The `handle_conditions`/`handle_warnings`/`handle_messages` need some work to be able
to actually have `times` parameter work as advertised
- I'll use this package in the [brranching][] package soon, so it will get a real world
test



## Get in touch

Get in touch if you have any conditionz questions in the 
[issue tracker](https://github.com/ropenscilabs/conditionz/issues) or the 
[rOpenSci discussion forum](https://discuss.ropensci.org/).


[conditionz]: https://github.com/ropenscilabs/conditionz
[taxize]: https://github.com/ropensci/taxize
[brranching]: https://github.com/ropensci/brranching
