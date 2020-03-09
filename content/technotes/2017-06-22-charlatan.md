---
slug: charlatan
title: All the fake data that's fit to print
date: '2017-06-22'
author:
  - Scott Chamberlain
topicid: 754
tags:
  - data
  - datasets
  - R
---

> **charlatan** makes fake data.

Excited to annonunce a new package called `charlatan`. While perusing
packages from other programming languages, I saw a neat Python library
called `faker`.

`charlatan` is inspired from and ports many things from Python's
<https://github.com/joke2k/faker> library. In turn, `faker` was inspired from
[PHP's faker](https://github.com/fzaninotto/Faker),
[Perl's Faker](https://search.cpan.org/~jasonk/Data-Faker-0.07/), and
[Ruby's faker](https://rubygems.org/gems/faker). It appears that the PHP
library was the original - nice work PHP.

## Use cases

What could you do with this package? Here's some use cases:

* Students in a classroom setting learning any task that needs a dataset.
* People doing simulations/modeling that need some fake data
* Generate fake dataset of users for a database before actual users exist
* Complete missing spots in a dataset
* Generate fake data to replace sensitive real data with before public release
* Create a random set of colors for visualization
* Generate random coordinates for a map
* Get a set of randomly generated DOIs (Digial Object Identifiers) to
assign to fake scholarly artifacts
* Generate fake taxonomic names for a biological dataset
* Get a set of fake sequences to use to test code/software that uses
sequence data


## Features

* Language support: A huge selling point of `charlatan` is language support.
Of course for some data types (numbers), languages don't come into play, but
for many they do. That means you can create fake datasets specific to a
language, or a dataset with a mix of languages, etc. For the variables
in this package, we have not yet ported over all languages for those
variables that Python's `faker` has.
* Lite weight: We've tried to make this package as lite as possible so
that it's just generally easy to install, but also can be used in
other packages or workflows while bringing along as little baggage
as possible.
* Reviewed: it's been reviewed! See reviews by [Brooke Anderson](https://github.com/ropensci/software-review/issues/94#issuecomment-284578088) and
[Tristan Mahr](https://github.com/ropensci/software-review/issues/94#issuecomment-283799109), and handling editor [Noam Ross](https://github.com/noamross)
* R specific features such as methods to create data.frame's (so the
user doesn’t have to do the extra step of putting vectors together)


## Status

We have not ported every variable, or every language yet in those variables.
We have added some variables to `charlatan` that are not in `faker` (e.g.,
taxonomy, gene sequences). Check out the [issues](https://github.com/ropensci/charlatan/issues)
to follow progress.


## Package API

* `ch_generate`: generate a data.frame with fake data
* `fraudster`: single interface to all fake data methods
* High level interfaces: There are high level functions prefixed with
`ch_` that wrap low level interfaces, and are meant to be easier
to use and provide easy way to make many instances of a thing.
* Low level interfaces: All of these are R6 objects that a user can
initialize and then call methods on the them.

## Other R work in this space:

* [generator](https://github.com/paulhendricks/generator)
* [fakeR](https://cran.rstudio.com/web/packages/fakeR/)
* [randNames](https://github.com/karthik/randNames)

## Vignette

Check out the [package vignette](https://cran.rstudio.com/web/packages/charlatan/vignettes/charlatan_vignette.html) to get started.


## setup

Install `charlatan`



```r
install.packages("charlatan")
```

Or get the development version:


```r
devtools::install_github("ropensci/charlatan")
```



```r
library(charlatan)
```

## Examples


### high level interface

`fraudster` is an interface for all fake data variables (and locales):


```r
x <- fraudster()
x$job()
#> [1] "Textile designer"
x$name()
#> [1] "Cris Johnston-Tremblay"
x$job()
#> [1] "Database administrator"
x$color_name()
#> [1] "SaddleBrown"
```

If you want to set locale, do so like `fraudster(locale = "{locale}")`

### locale support

The locales that are supported vary by data variable. We're adding more
locales through time, so do check in from time to time - or even better,
send a pull request adding support for the locale you want for the
variable(s) you want.

As an example, you can set locale for job data to any number of supported
locales.

For jobs:


```r
ch_job(locale = "en_US", n = 3)
#> [1] "Charity officer"   "Financial adviser" "Buyer, industrial"
ch_job(locale = "fr_FR", n = 3)
#> [1] "Illustrateur"                 "Guichetier"
#> [3] "Responsable d'ordonnancement"
ch_job(locale = "hr_HR", n = 3)
#> [1] "Pomoćnik strojovođe"
#> [2] "Pećar"
#> [3] "Konzervator – restaurator savjetnik"
ch_job(locale = "uk_UA", n = 3)
#> [1] "Фрілансер"  "Астрофізик" "Доцент"
ch_job(locale = "zh_TW", n = 3)
#> [1] "包裝設計"         "空調冷凍技術人員" "鍋爐操作技術人員"
```

For colors:


```r
ch_color_name(locale = "en_US", n = 3)
#> [1] "DarkMagenta" "Navy"        "LightGray"
ch_color_name(locale = "uk_UA", n = 3)
#> [1] "Синій ВПС"          "Темно-зелений хакі" "Берлінська лазур"
```

`charlatan` will tell you when a locale is not supported


```r
ch_job(locale = "cv_MN")
#> Error: cv_MN not in set of available locales
```


### generate a dataset

`ch_generate()` helps you create data.frame's with whatever variables
you want that `charlatan` supports. Then you're ready to use the
data.frame immediately in whatever your application is.

By default, you get back a certain set of variables. Right now, that is:
`name`, `job`, and `phone_number`.


```r
ch_generate()
#> # A tibble: 10 x 3
#>                          name                       job
#>                         <chr>                     <chr>
#>  1                  Coy Davis     Geneticist, molecular
#>  2               Artis Senger                 Press sub
#>  3                 Tal Rogahn              Town planner
#>  4             Nikolas Carter         Barrister's clerk
#>  5            Sharlene Kemmer Insurance account manager
#>  6            Babyboy Volkman           Quality manager
#>  7 Dr. Josephus Marquardt DVM                  Best boy
#>  8                Vernal Dare            Engineer, site
#>  9              Emilia Hessel       Administrator, arts
#> 10              Urijah Beatty     Editor, commissioning
#> # ... with 1 more variables: phone_number <chr>
```

You can select just the variables you want:


```r
ch_generate('job', 'phone_number', n = 30)
#> # A tibble: 30 x 2
#>                           job         phone_number
#>                         <chr>                <chr>
#>  1        Call centre manager  1-670-715-3079x9104
#>  2 Nurse, learning disability 1-502-781-3386x33524
#>  3           Network engineer       1-692-089-3060
#>  4           Industrial buyer       1-517-855-8517
#>  5     Database administrator  (999)474-9975x89650
#>  6       Operations geologist          06150655769
#>  7             Engineer, land     360-043-3630x592
#>  8     Pension scheme manager        (374)429-6821
#>  9          Personnel officer   1-189-574-3348x338
#> 10         Editor, film/video       1-698-135-1664
#> # ... with 20 more rows
```


### Data types

A sampling of the data types available in `charlatan`:

**person name**


```r
ch_name()
#> [1] "Jefferey West-O'Connell"
```


```r
ch_name(10)
#>  [1] "Dylon Hintz"          "Dr. Billy Willms DDS" "Captain Bednar III"
#>  [4] "Carli Torp"           "Price Strosin III"    "Grady Mayert"
#>  [7] "Nat Herman-Kuvalis"   "Noelle Funk"          "Dr. Jaycie Herzog MD"
#> [10] "Ms. Andrea Zemlak"
```

**phone number**


```r
ch_phone_number()
#> [1] "643.993.1958"
```


```r
ch_phone_number(10)
#>  [1] "+06(6)6080789632"    "05108334280"         "447-126-9775"
#>  [4] "+96(7)2112213020"    "495-425-1506"        "1-210-372-3188x514"
#>  [7] "(300)951-5115"       "680.567.5321"        "1-947-805-4758x8167"
#> [10] "888-998-5511x554"
```

**job**


```r
ch_job()
#> [1] "Scientist, water quality"
```


```r
ch_job(10)
#>  [1] "Engineer, production"
#>  [2] "Architect"
#>  [3] "Exhibitions officer, museum/gallery"
#>  [4] "Patent attorney"
#>  [5] "Surveyor, minerals"
#>  [6] "Electronics engineer"
#>  [7] "Secondary school teacher"
#>  [8] "Intelligence analyst"
#>  [9] "Nutritional therapist"
#> [10] "Information officer"
```

### Messy data

Real data is messy!  `charlatan` makes it easy to create
messy data. This is still in the early stages so is not available
across most data types and languages, but we're working on it.

For example, create messy names:


```r
ch_name(50, messy = TRUE)
#>  [1] "Mr. Vernell Hoppe Jr."     "Annika Considine d.d.s."
#>  [3] "Dr. Jose Kunde DDS"        "Karol Leuschke-Runte"
#>  [5] "Kayleen Kutch-Hintz"       "Jahir Green"
#>  [7] "Stuart Emmerich"           "Hillard Schaden"
#>  [9] "Mr. Caden Braun"           "Willie Ebert"
#> [11] "Meg Abbott PhD"            "Dr Rahn Huel"
#> [13] "Kristina Crooks d.d.s."    "Lizbeth Hansen"
#> [15] "Mrs. Peyton Kuhn"          "Hayley Bernier"
#> [17] "Dr. Lavon Schimmel d.d.s." "Iridian Murray"
#> [19] "Cary Romaguera"            "Tristan Windler"
#> [21] "Marlana Schroeder md"      "Mr. Treyton Nitzsche"
#> [23] "Hilmer Nitzsche-Glover"    "Marius Dietrich md"
#> [25] "Len Mertz"                 "Mrs Adyson Wunsch DVM"
#> [27] "Dr. Clytie Feest DDS"      "Mr. Wong Lebsack I"
#> [29] "Arland Kessler"            "Mrs Billy O'Connell m.d."
#> [31] "Stephen Gerlach"           "Jolette Lueilwitz"
#> [33] "Mrs Torie Green d.d.s."    "Mona Denesik"
#> [35] "Mitchell Auer"             "Miss. Fae Price m.d."
#> [37] "Todd Lehner"               "Elva Lesch"
#> [39] "Miss. Gustie Rempel DVM"   "Lexie Parisian-Stark"
#> [41] "Beaulah Cremin-Rice"       "Parrish Schinner"
#> [43] "Latrell Beier"             "Garry Wolff Sr"
#> [45] "Bernhard Vandervort"       "Stevie Johnston"
#> [47] "Dawson Gaylord"            "Ivie Labadie"
#> [49] "Ronal Parker"              "Mr Willy O'Conner Sr."
```

Right now only suffixes and prefixes for names in `en_US` locale
are supported. Notice above some variation in prefixes and suffixes.


### TO DO

We have lots ot do still. Some of those things include:

* Locales: For existing data variables in the package, we need to fill in
locales for which Python's `faker` has the data, but we need to port it over
still.
* Data variables: there's more we can port over from Python's `faker`.
In addition, we may find inspiration from faker libraries in other
programming languages.
* Messy data: we want to make messy data support more available throughout
the package. Watch [issue #41](https://github.com/ropensci/charlatan/issues/41).
* If you have ideas for potential data variables, [issue #11](https://github.com/ropensci/charlatan/issues/11) is a good place for those.
Or open a new issue, either way.
* One reviewer brought up whether data should be within bounds of reality (
see [issue #40](https://github.com/ropensci/charlatan/issues/40)). The first
question for me is should we do this - if the answer is yes or at least sometimes,
then we can explore how. It's not yet clear if it's the right thing to do.
