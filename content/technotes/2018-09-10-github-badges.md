---
slug: "github-badges"
title: "All the Badges One Can Earn: Parse Badges of CRAN Packages READMEs"
date: 2018-09-10
authors:
  - name: Maëlle Salmon
    url: https://masalmon.eu/
categories:
  - technotes
topicid: 
tags:
- Codemeta
- codemetar
- Markdown
- xml2
- commonmark
output: 
  md_document:
    variant: markdown_github
    preserve_yaml: true
---

A while ago we
[onboarded](https://github.com/ropensci/onboarding/issues/130) an
exciting package, [`codemetar`](https://github.com/ropensci/codemetar/)
by [Carl Boettiger](https://ropensci.org/about/#team). `codemetar` is an
R specific information collector and parser for the [CodeMeta
project](https://github.com/codemeta). In particular, `codemetar` can
digest metadata about an R package in order to fill [the terms
recognized by CodeMeta](https://codemeta.github.io/terms/). This means
extracting information from DESCRIPTION but also from e.g. continuous
integration[1] badges in the README! In this note, we’ll take advantage
of `codemetar::extract_badges` function to explore the diversity of
badges worn by the READMEs of CRAN packages.

Why `codemetar::extract_badges`, and how
----------------------------------------

CodeMeta recognized terms include information we’ve been getting from
badges:

-   “contIntegration”, URLs to continuous integration services such as
    Travis, Appveyor, Codecov;

-   “review”, information about review of the software if there was one.
    `codemetar` recognizes information from the peer-review badge we add
    to the README of onboarded packages thanks to work by [Karthik
    Ram](https://ropensci.org/about/#team).

The list might get longer, so instead of using regular expressions on
the README text, we extract and memoize[2] all badges at once to a
data.frame that we then query, using (in the dev branch of `codemetar`):

-   conversion to XML using `commonmark` (see [my recent tech
    note](https://ropensci.org/technotes/2018/09/05/commonmark/)) which
    works well for the Markdown badges e.g.
    `[![Travis-CI Build Status](https://travis-ci.org/ropensci/codemetar.svg?branch=master)](https://travis-ci.org/ropensci/codemetar)`.

-   extraction and parsing on the first HTML table there is if there’s
    any, which is necessary for [badges in table, which we’ve been
    discussing for our
    guidelines](https://github.com/ropensci/onboarding-meta/issues/56).

Note that the CRAN version of `codemetar` already features
`extract_badges`, but with a badges table creation based on regular
expressions only. Here is `codemetar::extract_badges` in action below:

``` r
library("magrittr")
codemetar::extract_badges("https://raw.githubusercontent.com/ropensci/drake/master/README.md") %>%
  knitr::kable()
```

| text                                                                                                       | link                                                     | image\_link                                                                           |
|:-----------------------------------------------------------------------------------------------------------|:---------------------------------------------------------|:--------------------------------------------------------------------------------------|
| ropensci\_footer                                                                                           | <https://ropensci.org>                                   | <http://ropensci.org/public_images/github_footer.png>                                 |
| JOSS                                                                                                       | <https://doi.org/10.21105/joss.00550>                    | <http://joss.theoj.org/papers/10.21105/joss.00550/status.svg>                         |
| Licence                                                                                                    | <https://www.gnu.org/licenses/gpl-3.0.en.html>           | <https://img.shields.io/badge/licence-GPL--3-blue.svg>                                |
| AppVeyor                                                                                                   | <https://ci.appveyor.com/project/ropensci/drake>         | <https://ci.appveyor.com/api/projects/status/4ypc9xnmqt70j94e?svg=true&branch=master> |
| rOpenSci                                                                                                   | <https://github.com/ropensci/onboarding/issues/156>      | <https://badges.ropensci.org/156_status.svg>                                          |
| minimal R version                                                                                          | <https://cran.r-project.org/>                            | <https://img.shields.io/badge/R%3E%3D-3.3.0-blue.svg>                                 |
| Travis                                                                                                     | <https://travis-ci.org/ropensci/drake>                   | <https://travis-ci.org/ropensci/drake.svg?branch=master>                              |
| CRAN                                                                                                       | <http://cran.r-project.org/package=drake>                | <http://www.r-pkg.org/badges/version/drake>                                           |
| downloads                                                                                                  | <http://cran.rstudio.com/package=drake>                  | <http://cranlogs.r-pkg.org/badges/drake>                                              |
| Codecov                                                                                                    | <https://codecov.io/github/ropensci/drake?branch=master> | <https://codecov.io/github/ropensci/drake/coverage.svg?branch=master>                 |
| Zenodo                                                                                                     | <https://zenodo.org/badge/latestdoi/82609103>            | <https://zenodo.org/badge/82609103.svg>                                               |
| Project Status: Active â€“ The project has reached a stable, usable state and is being actively developed. | <http://www.repostatus.org/#active>                      | <http://www.repostatus.org/badges/latest/active.svg>                                  |

Quite handy for our metadata collection!

Read the source for `extract_badges`
[here](https://github.com/ropensci/codemetar/blob/dev/R/extract_badges.R)
and see how it’s used in [this
script](https://github.com/ropensci/codemetar/blob/dev/R/guess_metadata.R).
You can also compare [`codemetar`’s
README](https://github.com/ropensci/codemetar/blob/master/README.md)
with its
[codemeta.json](https://github.com/ropensci/codemetar/blob/master/codemeta.json)
e.g. [the lines for
“contIntegration”](https://github.com/ropensci/codemetar/blob/master/codemeta.json#L445).

Now since, `codemetar::extract_badges` exports a nice data.frame for any
README with badges, and is exported, it’d be too bad not to use it to
gain insights from many, many READMEs!

Extract badges from CRAN packages
---------------------------------

In this exploration we shall concentrate on CRAN packages that indicate
a GitHub repo link under the URL field of DESCRIPTION. By the way, if
you don’t indicate such links in DESCRIPTION of your package yet, you
can (and should) run
[`usethis::use_github_links`](http://usethis.r-lib.org/reference/use_github_links.html).

### Get links to GitHub repos from CRAN information

I reckon that I could have also used BugReports like Steven M Mortimer
did [in his great analysis of CRAN downloads and GitHub
stars](https://stevenmortimer.com/most-starred-r-packages-on-github/). I
am unsure of how one can get the link to and the content of the README
of packages that don’t Rbuildignore their README, such as
[`codemetar`](https://cran.r-project.org/web/packages/codemetar/index.html)
(see under Material). The imperfect sample I collected will do for this
note.

Here’s how I got all the repo owners and names:

``` r
cran_db <- tools::CRAN_package_db()

# only packages that have a GitHub repo
github_cran <- dplyr::filter(cran_db[, c("Package", "URL")],
                             stringr::str_detect(URL, "github\\.com"))

# will need to keep only the URL to the repo
select_github_repo <- function(URL){
  URLs <- stringr::str_split(URL, pattern = ",", simplify = TRUE)
  github_repo <- URLs[stringr::str_detect(URLs, "github\\.com")][1]
  github_repo <- stringr::str_remove(github_repo, "\\#.*$")
  github_repo <- stringr::str_remove(github_repo, "\\#.*[ \\(.*\\)]")
  github_repo <- stringr::str_remove(github_repo, "/$")
  stringr::str_replace(github_repo,".*\\.com\\/", "")
}


github_cran <- dplyr::group_by(github_cran, Package)
github_cran <- dplyr::mutate(github_cran, github = select_github_repo(URL))
github_cran <- tidyr::separate(github_cran, github, "\\/", 
                               into = c("owner", "repo"))
github_cran <- dplyr::ungroup(github_cran)

# Not very general
github_cran$repo[which(github_cran$Package == "webp")] <- "webp"
```

I needed a bit of string cleaning mostly to deal with the URLs of
[Jeroen Ooms](https://ropensci.org/about/#team)’ packages, see e.g.
[this one](https://cran.r-project.org/web/packages/antiword/index.html).
I guess I could have cleaned even more, but it was good enough for this
exploration.

### Get all badges

Then for each repo I queried the download URL of the [preferred
README](https://developer.github.com/v3/repos/contents/#get-the-readme)
via GitHub’s V3 API, using [the `gh`
package](https://github.com/r-lib/gh). The preferred README is the one
GitHub displays on the repo landing page. I used
`codemetar::extract_badges`, of course. I rate-limited the basic
function using [`ratelimitr`](https://github.com/tarakc02/ratelimitr).

``` r
library("magrittr")

github_cran <- readr::read_csv("data/github_cran_links.csv")

.get_badges <- function(owner, repo){
  message(paste(owner, repo, sep = "/"))
  readme <- try(gh::gh("GET /repos/:owner/:repo/readme",
                       owner = owner, repo = repo),
                silent = TRUE)
  if(inherits(readme, "try-error")){
    return(NULL)
  }else{
    
    badges <- codemetar::extract_badges(readme$download_url)
    
    if(nrow(badges)>0){
      badges$owner <- owner
      badges$repo <- repo
    }
    
    return(badges)
  }
  
  
}

.get_badges %>%
  ratelimitr::limit_rate(ratelimitr::rate(1, 1)) -> get_badges

purrr::map2_df(github_cran$owner, 
               github_cran$repo,
              get_badges) -> badges
```

### Remove non badges from the sample

The way badges are recognized by `codemetar::extract_badges` is based on
their Markdown or html nature: an image that contains a link to another
webpage (e.g. the Travis build). In some cases, READMEs feature such
images… that aren’t badges. They can e.g. be local images, or images
whose credits are stored as URL. To remove them from the sample, I used
a strategy in two steps:

-   I first had a look at the most common domains. For the 17 most
    common of them, I accepted the images. These 17 domains included
    ropensci.org because the *footer* our packages get is formatted as a
    Markdown badge.

-   For the remaining images, a bit more than 200, I used `magick` to
    obtain their width and height, and filtered actual badges based on
    their width/height ratio.

``` r
# extract and parse URLs
badges %>%
  dplyr::pull(image_link) %>%
  purrr::map_df(urltools::url_parse) -> parsed_image_links

# count hits by domain

parsed_image_links %>%
  dplyr::count(domain, sort = TRUE) -> domain_count

# these were manually inspected
# as legit badge providers
ok_domain <- domain_count$domain[1:17]

# keep the badges needing a check
tbd <- dplyr::filter(parsed_image_links,
                     ! domain %in% ok_domain)
                     
# get their size ratio
get_size <- function(url){
  img <- try(magick::image_read(url),
             silent = TRUE)
  
  if(inherits(img, "try-error")){
    tibble::tibble(error = TRUE,
                   image_link = url)
  }else{
    info <- magick::image_info(img)
    info$error <- FALSE
    info$image_link <- url
    info
  }
  
  
}

img_info <- purrr::map_df(urltools::url_compose(tbd),
                          get_size)

img_info <- dplyr::mutate(img_info, ratio = width/height)

# filter badges from images
img_info <- dplyr::filter(img_info, ratio < 3)
badges <- dplyr::filter(badges,
                        !image_link %in% img_info$image_link)
readr::write_csv(badges, "data/aaall_badges.csv")
```

Note that at this stage we actually eliminated very few images, about
twenty, so using badge syntax for images seem quite rare. Don’t judge me
by my filenaming skills. I was *maybe* a bit too enthusiastic!

Analyze badges from CRAN packages
---------------------------------

I wanted to answer several questions about the badges of CRAN packages,
beyond being just happy to have been able to collect so many of them.

### How many repos have at least one badge?

``` r
github_cran <- readr::read_csv("data/github_cran_links.csv")
# the same repo can have been used by several packages!
badges <- readr::read_csv("data/aaall_badges.csv")
badges <- dplyr::distinct(badges)

nobadges <- dplyr::anti_join(github_cran, badges,
                             by = c("owner", "repo"))
```

There are 1239 packages without any badge (or rather said, without any
badge that we identified) out of a sample of 3542 packages. That means
3.5416510^{5}% have at least one badge.

### Among the repos with badges, how many badges?

``` r
library("magrittr")
badges %>%
  dplyr::count(repo, owner,
               sort = TRUE) -> badges_count

badges_count %>%
  dplyr::summarise(median = median(n))
```

    ## # A tibble: 1 x 1
    ##   median
    ##    <int>
    ## 1      4

``` r
library("ggplot2")
badges_count %>%
  ggplot() +
  geom_histogram(aes(n))+
  hrbrthemes::theme_ipsum(base_size = 12, 
                          axis_title_size = 12, 
                          axis_text_size = 12) +
  ggtitle("Number of badges per repo",
          subtitle = "Among repos with at least one badge")
```

![](/img/blog-images/2018-09-10-github-badges/unnamed-chunk-2-1.png)

The median number of badges is 4, which corresponds to my gut feeling
that the answer would be “a few”. I have a new question, what’s the repo
with the most badges?

``` r
badges_count[1,]
```

    ## # A tibble: 1 x 3
    ##   repo     owner               n
    ##   <chr>    <chr>           <int>
    ## 1 psycho.R neuropsychology    14

You can browse it at <https://github.com/neuropsychology/psycho.R>.
Quite a colourful README!

### How many unique badges are there?

For counting types of badges, I’ll use the domain of `image_link`. This
is an approximation, since e.g. www.r-pkg.org offers several badges.

``` r
badges %>%
  dplyr::pull(image_link) %>%
  purrr::map_df(urltools::url_parse) -> parsed_image_links

parsed_image_links %>%
  dplyr::pull(domain) %>%
  unique() %>%
  sort() -> unique_domains

length(unique_domains)
```

    ## [1] 74

Not *that* many after all, so I’ll print all of them! A special mention
to <https://github.com/ropensci/cchecksapi#badges> maintained under our
GitHub organization by [Scott
Chamberlain](https://ropensci.org/about/#team), to show the CRAN check
status of your package!
`glue::glue_collapse(unique_domains, sep = ", ", last = " and ")` .,
\[pics, anaconda.org, api.codacy.com, api.travis-ci.org,
app.wercker.com, assets.bcdevexchange.org, awesome.re, badge.fury.io,
badge.waffle.io, badges.frapsoft.com, badges.gitter.im,
badges.herokuapp.com, badges.ropensci.org, beerpay.io,
bestpractices.coreinfrastructure.org, ci.appveyor.com, circleci.com,
codeclimate.com, codecov.io, coveralls.io, cranchecks.info,
cranlogs.r-pkg.org, d2weczhvl823v0.cloudfront.net, dependencyci.com,
depsy.org, dl.dropboxusercontent.com, dmlc.github.io, docs,
eddelbuettel.github.io, github.com, githubbadges.com,
githubbadges.herokuapp.com, gitlab.com, hits.dwyl.io, i.imgur.com,
img.shields.io, inst, jhudatascience.org, joss.theoj.org, man,
mybinder.org, pics, popmodels.cancercontrol.cancer.gov,
pro-pulsar-193905.appspot.com, r-pkg.org, raw.githubusercontent.com,
rclean\_demo.png, readme-example-1.png, readme-example-2.png,
readme-example-3.png, readme-example-4.png, readme-example-5.png,
readthedocs.org, ropensci.org, saucelabs.com, scan.coverity.com,
semaphoreci.com, tools, travis-ci.com, travis-ci.org,
user-images.githubusercontent.com, usgs-r.github.io, vignettes,
www.nceas.ucsb.edu, www.ohloh.net, www.openhub.net, www.paypal.com,
www.r-pkg.org, www.rdocumentation.org, www.repostatus.org,
www.ropensci.org, www.rpackages.io and zenodo.org

### What are the most common badges?

``` r
parsed_image_links %>%
  dplyr::count(domain, sort = TRUE) %>%
  head(n = 10) %>%
  knitr::kable()
```

| domain             |     n|
|:-------------------|-----:|
| travis-ci.org      |  1914|
| www.r-pkg.org      |  1831|
| cranlogs.r-pkg.org |  1306|
| img.shields.io     |   889|
| ci.appveyor.com    |   713|
| codecov.io         |   672|
| www.repostatus.org |   243|
| zenodo.org         |   201|
| coveralls.io       |   156|
| ropensci.org       |   135|

Travis CI is the clear winner! Now, “img.shields.io” is a service for
badges of other things… which?

``` r
badges %>%
  dplyr::filter(stringr::str_detect(image_link, "img\\.shields\\.io")) %>%
  dplyr::count(text, sort = TRUE)
```

    ## # A tibble: 134 x 2
    ##    text                  n
    ##    <chr>             <int>
    ##  1 Coverage Status     198
    ##  2 License              92
    ##  3 lifecycle            63
    ##  4 CoverageStatus       54
    ##  5 <NA>                 38
    ##  6 packageversion       37
    ##  7 Last-changedate      32
    ##  8 Licence              29
    ##  9 minimal R version    28
    ## 10 Github Stars         19
    ## # ... with 124 more rows

Diverse things, in particular the [Tidyverse lifecycle
badges](https://www.tidyverse.org/lifecycle/). After some discussion, we
at rOpenSci have adopted the repostatus.org status badges in our
guidelines… but are actually open to repos using both types of badges
since their nomenclature can complement each other!

Conclusion
----------

In this tech note I presented and used one of `codemetar`’s tools for R
package metadata munging, `extract_badges`. I extracted and analyzed
badges information from the READMEs of all CRAN packages that indicate a
GitHub repo in the URL field of DESCRIPTION. README badges are a way to
show development status, test results, code coverage, peer-review merit,
etc.; but can also be used as a machine-readable source of information
about these same things.

Explore more of `codemetar` [in its GitHub
repo](https://github.com/ropensci/codemetar/), and check out the
[CodeMeta project itself](https://github.com/codemeta). Read our
guidelines for package development and maintenance [in this
gitbook](https://ropensci.github.io/dev_guide/). And have fun ~~adding
pretty badges to your own package repos~~ upping your package
development & maintenance game!

[1] If you’re new to continuous integration I’d recommend reading [this
great post of Julia
Silge’s](https://juliasilge.com/blog/beginners-guide-to-travis/), and
[this chapter of our guide for package
development](https://ropensci.github.io/dev_guide/ci.html).

[2] Memoizing a function means that when called again during the same R
session with the same parameters, a cached answer is used. See [the
vignette of the `memoise`
package](https://cran.r-project.org/web/packages/memoise/README.html).
