---
slug: vcr-http-request-cacahing
title: 'vcr: record and replay HTTP requests'
date: '2018-05-25'
authors:
  - Scott Chamberlain
topicid: 1186
tags:
  - R
  - ruby
  - vcr
  - http
  - mocking
  - request
  - crul
  - curl
  - webmockr
  - testing
---

R package test suites that include HTTP requests are dependent on an internet connection being up, the internet connection speed, changing behavior of the remote server, as well as changing response formats/data from a remote server. We ideally want to test functionality of our package relative to some known data that isn't intermittently unavailable or changing. Caveat is that we do want to make sure the package fails well, including fails well in response to server failures, but these responses can be cached.

One way to deal with the problems above is to store responses from HTTP requests and use them in subsequent requests so that test suites are using a predictable set of data on each run of the test suite. We don't have to reinvent the wheel to look for a solution, and the solution has been around for a while. The programming language [Ruby](https://www.ruby-lang.org/en/)  has had [vcr][vcrruby] since [2010](https://rubygems.org/gems/vcr/versions) (and ported to 15 other languages). 

Ruby's [vcr][vcrruby] plugs in to many other HTTP gems via [webmock][], another Ruby gem. `webmock` does the actual matching of HTTP requests (but does not store any response), while `vcr` leverages `webmock` but then stores the HTTP response. 

About 3.5 years ago I made my first commits on ports of Ruby's vcr to R called [vcr](https://github.com/ropensci/vcr/commit/6690a23), and one for Ruby's webmock, called [webmockr](https://github.com/ropensci/webmockr/commit/7fe4225). It took me a long time to get these out on CRAN, which I'll talk about below.

<br>

# vcr

Let's get right into it. How do we use `vcr`?

<br>

## Setup

The setup within your package goes like so. In the `tests/` folder, you'll end up with a new folder called `fixtures`. You can control what this is called by configuring vcr via `vcr::vcr_configuration()`. Let's assume we're working with a package called `foo`. 

```sh
foo/tests
├── fixtures/vcr_cassettes
├── test-all.R
└── testthat
```

Inside of `testthat/` we need to insert some configuration for `vcr`, which can go in a helper file like so:

```sh
foo/tests/testthat
├── helper-foo.R
```

Within the `helper-foo.R` file we need something like so to tell `vcr` where to store cached HTTP responses:

```r
library("vcr")
vcr_configure(dir = "../fixtures/vcr_cassettes")
```

`vcr` will set up the new folders given in the `dir` parameter of `vcr_configure` if they don't already exist.

You may have figured this out already, but to be sure: "cassette" means essentially a thing to which you are recording HTTP interactions. There's other terminology in `vcr` like "record" and "eject". See the [terminology book section](https://books.ropensci.org/http-testing//intro.html#terminology) for more.

<br>

## Basic usage

Load [vcr][], [crul][], and `testthat`

```r
library(vcr)
library(crul)
library(testthat)
```

Make a `crul` connection client. 

```r
cli <- crul::HttpClient$new(url = "https://api.crossref.org")
```

Then wrap the actual HTTP request call in a call to `vcr::use_cassette()`. 

```r
use_cassette(name = "helloworld", {
  res <- cli$get("works", query = list(rows = 3))
  expect_is(res, "HttpResponse")
})
#> CrulAdapter enabled!
#> net connect allowed
#> net connect disabled
#> ejecting cassette: helloworld
#> CrulAdapter disabled!
```

The first time the above code block is run real HTTP connections are allowed because it doesn't match any previous requests, and the response is cached. The second time the request is made, the cached response is used.

The cached response is a YAML file - an example is show below. The advantage of the format is that it's machine readable but humans can also read them so you can inspect your cached HTTP responses to better be able to construct/debug your test suite.

```
http_interactions:
- request:
    method: get
    uri: https://api.crossref.org/works?rows=3
    body:
      encoding: ''
      string: ''
    headers:
      User-Agent: libcurl/7.54.0 r-curl/3.2 crul/0.5.2
      Accept-Encoding: gzip, deflate
      Accept: application/json, text/xml, application/xml, */*
  response:
    status:
      status_code: '200'
      message: OK
      explanation: Request fulfilled, document follows
    headers:
      status: HTTP/1.1 200 OK
      content-type: application/json;charset=UTF-8
      vary: Accept
      access-control-allow-origin: '*'
      access-control-allow-headers: X-Requested-With
      content-length: '5360'
      server: http-kit
      date: Sat, 28 Apr 2018 15:12:29 GMT
      x-rate-limit-limit: '50'
      x-rate-limit-interval: 1s
      connection: close
    body:
      encoding: UTF-8
      string: '{"status":"ok","message-type":"work-list","message-version":"1.0.0","message":{"facets":{}},"items-per-page":3,"query":{"start-index":0,"search-terms":null}}'
  recorded_at: 2018-04-28 15:12:29 GMT
  recorded_with: vcr/0.1.0, webmockr/0.2.6, crul/0.5.2
```

<br>

## Why vcr and webmockr?

The power of both vcr and webmockr is they abstract away the gory details, and present a single user interface to (eventually) many different HTTP R libraries (only `crul` right now, but `curl` and `httr` are in development). In addition, though not available yet, vcr will have many different serialization formats; it has only YAML now, but could include JSON and other formats. Both packages will handle a relatively complex set of use cases that come from many years of input from lots of users.

<br>

## http testing book

To integrate documentation for `vcr` and `webmockr` and related tools we've started a new [bookdown](https://bookdown.org/home/) called the [HTTP Testing Book][httpbook]. 

The book will cover high level concepts of testing R packges that make HTTP requests, how to approach the general problem, how to use webmockr by itself, and how to use vcr. As we add more integrations with http R packages we'll add more content/chapters to document the new stuff.

Do let us know if you have any feedback on the book! You can send a PR if you want to suggest a change by clicking on the edit button.

<br>

## vcr in the wild

R's `webmockr` and `vcr` are on CRAN. In addition, there are two packages on CRAN using `vcr` for test caching. They are:

* [ritis](https://cran.rstudio.com/web/packages/ritis/)
* [worrms](https://cran.rstudio.com/web/packages/worrms/)

There are a number more on GitHub, soon to head to CRAN:

* [rredlist][]
* [bold][]
* [wikitaxa][]
* [microdemic][]
* [zbank][]
* [rplos][]

You can get a sense for how `vcr` is used in real packages by looking at the `tests` directory in any of the packages above.

<br>

## Security

Testing HTTP packages often involves using authentication to the web service. In addition, responses may contain sensitive data pertaining to users or other such things. If you push your stored HTTP responses onto the public web you most definitely DO NOT want your secure tokens/etc. to be included.

We have a way to deal with this already, where you can replace strings matching a pattern with a placeholder. The HTTP responses stored on disk will have the placeholder only. For example:

```r
vcr_configure(
  filter_sensitive_data = list("<<<my_api_key>>>" = Sys.getenv('API_KEY'))
)
```

Here, we're replacing any instance that matches the output of `Sys.getenv('API_KEY')` (let's say its `123abc`), with `"<<<my_api_key>>>"`. When you run tests, vcr swaps `"<<<my_api_key>>>"` for your actual API key of `123abc` so your tests run smoothly.

See the [Security chapter](https://books.ropensci.org/http-testing//security) in the HTTP Testing Book for more. Feedback on security in vcr much appreciated!

<br>

## Logging

You can use logging in `vcr` to set an IO-like object that vcr will log output to. This is a useful way to troubleshoot what vcr is doing. Beware that logging isn't completely built out yet.

To set up logging, set `log` and `log_opts` options in your `vcr_configure()` call:

```r
vcr_configure(
  log = TRUE, 
  log_opts = list(file = "vcr.log", log_prefix = "Cassette", date = TRUE)
)
```

Here, we set `log = TRUE`, then set a file to log to, a log prefix (so each line has prefix `[Cassette: <your cassette>]`), and use date (if `FALSE`, date not included in each log line).

See the [Logging chapter](https://books.ropensci.org/http-testing//logging) in the HTTP Testing Book for more. 

<br>
## Porting from other languages

I sometimes peruse [Rubygems](https://rubygems.org/) and [pypi](https://pypi.org/) looking for ideas in topic areas that I develop packages in. I noticed `vcr` and `webmockr` at some point in Ruby land, and over 3 years ago started in earnest porting them over to R. 

The process has taken much much longer than I had hoped, and let's just say I have notes. Attempting to port a library from one language to another in its entirety is tough. 

I do understand Ruby relatively well, but still I ran into a fair bit of code I had never seen before. This often meant running Ruby code from vcr/webmock and figuring out what they expect as output of a method call, then thinking about how to port that to R. 

Probably the biggest stumbling block was [monkey patching](https://en.wikipedia.org/wiki/Monkey_patch). Ruby's webmock works by replacing methods from various Ruby HTTP gems with their own to change their behavior when run. R doesn't seem to allow monkey patching. After fooling around trying the monkey patching approach, I gave that up and figured that I needed to make changes in the R HTTP libraries themselves to hook into webmockr (side note: since starting webmockr, now httr has added a callback mechanism, which I think I'll be able to leverage so no further changes will be needed in httr). Changing HTTP libraries was no problem in my own HTTP library [crul][], but not so easy in ones I don't maintain.

Last, if I could start over, I'd probably try to get to a MVP much faster, then add more features, instead of trying to port everything over before anything was put out. 

<br>

## Upcoming work
<br>

There's still a lot of work to do on vcr ant its companion webmockr. Please do get in touch with any feedback. Let us know if you have any problems using vcr in your package. Here's some highlights of upcoming work:

* You can use `vcr::insert_cassette` alone, and then `vcr::eject_cassette` when you're done, but that behavior isn't quite working yet. [(#24)](https://github.com/ropensci/vcr/issues/24)
* We will support more matchers in the future, including matching by URI path (`foo` in `https://bar.com/foo`), host (e.g. `bar.com` in `https://bar.com/foo`), and request body [(#70)](https://github.com/ropensci/vcr/issues/70)
* There's many features that Ruby vcr has that we don't have yet, too many to list here :)
* Performance work: e.g., loading time of cached HTTP responses can be slow, see [(#66)](https://github.com/ropensci/vcr/issues/66)
* Work on integrating `curl` lib going on in `webmockr` in a branch [adapter-curl](https://github.com/ropensci/webmockr/tree/adapter-curl)
* Work on integrating `httr` lib going on in `webmockr` in a branch [adapter-httr](https://github.com/ropensci/webmockr/tree/adapter-httr)

<br>

[webmock]: https://github.com/bblimke/webmock
[webmockr]: https://github.com/ropensci/webmockr
[vcrruby]: https://github.com/vcr/vcr
[vcr]: https://github.com/ropensci/vcr
[fauxpas]: https://github.com/ropenscilabs/fauxpas
[curl]: https://github.com/ropensci/curl
[httr]: https://github.com/r-lib/httr
[crul]: https://github.com/ropensci/crul
[HTTPretty]: https://github.com/gabrielfalcao/HTTPretty
[pook]: https://github.com/h2non/pook
[httpbook]: https://books.ropensci.org/http-testing//
[rredlist]: https://github.com/ropensci/rredlist/tree/vcr-integration
[bold]: https://github.com/ropensci/bold/tree/with-vcr
[wikitaxa]: https://github.com/ropensci/wikitaxa/tree/with-vcr
[worrms]: https://github.com/ropensci/worrms
[microdemic]: https://github.com/ropensci/microdemic/
[zbank]: https://github.com/ropenscilabs/zbank
[rplos]: https://github.com/ropensci/rplos
[ritis]: https://github.com/ropensci/ritis
