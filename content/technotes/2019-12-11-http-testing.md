---
slug: "http-testing"
title: "HTTP testing in R: overview of tools and new features"
date: 2019-12-11
author:
  - Scott Chamberlain
topicid: 1900
tags:
- R
- API
- http
- testing
- vcr
- webmockr
- mocking
---



Testing is a crucial component to any software package. Testing makes sure
that your code does what you expect it to do; and importantly, makes it safer to make
changes moving forward because a good test suite will tell you if a change has broken
existing functionality. Our recent [community call on testing][call] is a nice
place to get started with testing.

One way to make testing even harder is through including HTTP requests. This adds
complexity for many reasons:

- Remote resources can change in a variety of ways, all leading to broken tests:
    - Response structure can change, potentially breaking downstream processing
    - Query parameter names can change, routes can be deprecated
    - Remote resources can be temporarily down
- If you're testing a function in your package that does an HTTP request, you're
testing the code, but also the remote resource. This may be what you want, but perhaps
its not. 
- Some remote resources require authentication. Good software development uses
continuous integration; testing in different computational environments means
you have to think about whether you can run a test that requires authentication.
    - In R, we are in the unusual situation relative to other programming languages
    (e.g., Ruby, Python, Node) where the distribution channel for our packages (CRAN)
    also checks the packages; yet another context in which you have to think about
    whether you can run a test or not
- Test suite runs are slower when HTTP requests are made (and variable depending
on server response times and internet speed)

To make testing easier for R packages that do HTTP requests we've been working on
two packages: [webmockr][] and [vcr][] (introduced on this blog in
[February 2018][webmockrblog] and [May 2018][vcrblog], respectively). There's been
a lot of changes since those two blog posts, making testing R packages with HTTP
requests easier than ever.

## Mocking with webmockr

webmockr is a general purpose library for mocking HTTP requests, built to work
with any HTTP client in R (exception: curl, [for good reason][reason]). Use cases
include:

- mocking requests in package test suites (i.e., it can be hard to re-create 
some scenarios, e.g., intermittent server errors, timeouts, etc.)
- you want to run code when you don't have access to the internet - webmockr
can help with that
- webmockr can allow you to run tests before the API you'll use even exists

Let's run through a simple example. First, load and enable webmockr:


```r
library(webmockr)
webmockr::enable()
```

Then create a stub with `stub_request()`. Here, we stub a request based on
HTTP method and URL only.


```r
stub_request("get", "https://httpbin.org/get")
```

Now make a "request". If the request matches the stub, a real HTTP request will NOT
be made, but instead webmockr returns the same object you' get with a real 
HTTP request, but with whatever you told webmockr to return (in this case nothing).


```r
library("crul")
x <- HttpClient$new(url = "https://httpbin.org")
x$get('get')
#> <crul response> 
#>   url: https://httpbin.org/get
#>   request_headers: 
#>     User-Agent: libcurl/7.54.0 r-curl/4.3 crul/0.9.0
#>     Accept-Encoding: gzip, deflate
#>     Accept: application/json, text/xml, application/xml, */*
#>   response_headers: 
#>   status: 200
```

### What's new in webmockr?

- If you were using webmockr with httr, you're in luck. The latest version of webmockr (`v0.5`)
fixed an issue where we weren't mocking httr simple authentication.
- A big new feature in `v0.5` is support for writing to disk. Both [crul][] and httr allow 
users to write to disk as part of the HTTP request. HTTP clients in some other languages
I'm familiar with (e.g., Ruby) don't do this; you'd have to write to disk yourself. Anyway,
the point is that supporting writing to disk (here and in vcr) was not super easy; it's
a complicated thing to support. There will probably be edge cases that will break;
[open an issue](https://github.com/ropensci/webmockr/issues) if you run into problems
mocking HTTP requests that write to disk.

Check out the [release notes](https://github.com/ropensci/webmockr/releases)
for all webmockr changes


## Record and replay requests with vcr

vcr leverages webmockr to handle matching requests, but instead of just mocking requests,
vcr records real requests and plays them back (hence the name).

Let's run through a simple example. First, load vcr:


```r
library(vcr)
library(crul)
```

The main interface in vcr is `vcr::use_cassette()`. Pass a code block to `use_cassette` 
as the second argument and vcr will allow a real HTTP request the first time the block
is run, and record the request and response to a file. Any subsequent running of the 
same code will use the cached data.

For example, here we make a request to <https://httpbin.org>


```r
use_cassette(name = "helloworld", {
  req1 = crul::HttpClient$new(url = "https://httpbin.org")$get("get")
})
```

Which makes a real HTTP request and records the request and response to a
file `helloworld.yml`. The second call to the same block


```r
use_cassette(name = "helloworld", {
  req2 = crul::HttpClient$new(url = "https://httpbin.org")$get("get")
})
```

uses the `helloworld.yml` file - a real HTTP request is not done on subsequent calls.

And we can test that the returned response is the same in both code blocks above


```r
testthat::compare(req1, req2)
#> Equal
```

### What's new in vcr?

- Just as webmockr now handles mocking writing to disk, vcr can now handle requests that
write to disk. See `?mocking-disk-writing` to get started.
- You can now easily turn off vcr completely, either through a function call or 
using an environment variable (e.g., ideal for those that work on the command line
or use in continuous integration scenarios). See `?lightswitch` to get started.
- Ignoring certain requests now works, only for `crul` for now. Ignoring means 
that the real HTTP request you want to ignore will be allowed, while all other requests
will be handled by vcr. You can right now ignore certain hosts (e.g., `google.com`) 
and all localhost requests; in the future we hope to support ignoring any specific
request via user defined functions. See the [vcr configuration vignette][ignore] for
discussion and examples.

[Open an issue](https://github.com/ropensci/vcr/issues) if you run
into problems with any of the above features.

Check out the [release notes](https://github.com/ropensci/vcr/releases)
for all vcr changes


## HTTP Testing Book

We've also been working on a book: [HTTP mocking and testing in R][book]. The book
is intended as a detailed guide for HTTP mocking and testing in R code
and packages. The book aims to introduce the reader to leveraging webmockr and
vcr in their test suites, going into detail with both packages. 

We've got some new content in the book and we have [more planned][bookiss]. 
We'd love any feedback on the book; let us know by [opening an issue][bookiss].


[call]: https://ropensci.org/commcalls/2019-12-05/
[webmockr]: https://github.com/ropensci/webmockr/
[vcr]: https://github.com/ropensci/vcr/
[webmockrblog]: https://ropensci.org/technotes/2018/02/20/webmockr-intro/
[vcrblog]: https://ropensci.org/technotes/2018/05/25/vcr-http-request-cacahing/
[book]: https://books.ropensci.org/http-testing/
[bookiss]: https://github.com/ropensci-books/http-testing/issues
[reason]: https://github.com/jeroen/curl/pull/174
[crul]: https://github.com/ropensci/crul/
[ignore]: https://docs.ropensci.org/vcr/articles/configuration.html#ignoring-some-requests
