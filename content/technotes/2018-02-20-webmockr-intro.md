---
slug: webmockr-intro
title: 'webmockr: mock HTTP requests'
date: '2018-02-20'
author:
  - Scott Chamberlain
topicid: 1073
tags:
  - R
  - ruby
  - http
  - mocking
  - request
  - crul
  - curl
  - webmockr
  - testing
---



## webmockr

`webmockr` is an R library for stubbing and setting expectations on HTTP requests.
It is a port of the Ruby gem [webmock][]. 

`webmockr` works by plugging in to another R package that does HTTP requests. It currently only works with [crul][] right now, but we plan to add support for [curl][] and [httr][] later.

`webmockr` has the following high level features:

* Stubbing HTTP requests at low http client level
* Setting expectations on HTTP requests
* Matching requests based any combination of HTTP method (e.g., GET/POST/PUT), URI (i.e., URL), request headers and body
* Will soon integrate with [vcr][] so that you can cache real HTTP responses - and easily integrate with `testthat` 

`webmockr` has been on CRAN for a little while now, but I've recently made some improvements and am nearing another
CRAN release, which is also preparation for a first release of the related [vcr][] package.  The following is a 
run down of major features and how to use the package, including a bit on testing at the end.



## Similar art in other languages

`webmockr` was most closely inspired by Ruby's [webmock][], but there are others out there, e.g,. [HTTPretty][] and [pook][] for Python, from which we'll steal ideas as time allows.




## Installation

`webmockr` is on CRAN, so you can install that version


```r
install.packages("webmockr")
```

But I've been making some improvements, so you'll probably want the dev version:

Install some dependencies


```r
if (!requireNamespace("remotes", quietly=TRUE)) install.packages("remotes")
remotes::install_github(c("ropensci/vcr@webmockit", "ropenscilabs/fauxpas"))
```

Install `webmockr`


```r
remotes::install_github("ropensci/webmockr")
```

Load `webmockr`


```r
library(webmockr)
```



## Using webmockr

After loading `webmockr`

```r
library(webmockr)
```

`webmockr` is loaded but not "turned on". At this point `webmockr` doesn't 
change anything about your HTTP requests.

Once you turn on `webmockr`: 

```r
webmockr::enable()
```

`webmockr` will now by default **NOT** allow real HTTP requests from the http 
libraries that adapters are loaded for (right now only `crul`).

Next, you'll want to think about stubbing requests

## Stubbing requests

Stubbing requests simply refers to the act of saying "I want all HTTP 
requests that match this pattern to return this thing". The "thing" 
can be made up of a lot of different things.

First, load `crul` and enable `webmockr`


```r
library(crul)
webmockr::enable()
```

You can stub requests based on HTTP method and uri


```r
stub_request("get", "https://httpbin.org/get")
#> <webmockr stub> 
#>   method: get
#>   uri: https://httpbin.org/get
#>   with: 
#>     query: 
#>     body: 
#>     request_headers: 
#>   to_return: 
#>     status: 
#>     body: 
#>     response_headers: 
#>   should_timeout: FALSE
#>   should_raise: FALSE
```

The returned object is of class `StubbedRequest`, with attributes and 
accessors - which you usually won't use yourself - although we use the 
object internally within `webmockr`. The object has a print method that
summarizes your stub, including the HTTP method, the URI, if you set 
any patterns for query parameters, the query body, or request headers, 
and whether you set any expectations on the response, including 
status code, body or response headers. Last, there's booleans for whether
you set a timeout or raise expectation (more on that below).

You can check the stub registry at any time to see what stubs
you have:


```r
stub_registry()
#> <webmockr stub registry> 
#>  Registered Stubs
#>    get: https://httpbin.org/get
```

> protip: you can clear all stubs at any time by running `stub_registry_clear()`

Once we have the stub, we can then do a request with `crul`


```r
x <- HttpClient$new(url = "https://httpbin.org")
x$get('get')
#> <crul response> 
#>   url: https://httpbin.org/get
#>   request_headers: 
#>     User-Agent: libcurl/7.54.0 r-curl/3.1 crul/0.5.1.9210
#>     Accept-Encoding: gzip, deflate
#>     Accept: application/json, text/xml, application/xml, */*
#>   response_headers: 
#>   status: 200
```

A response is returned that is of the same structure as a normal
`crul` response, but no actual HTTP request was performed. The 
response object is a bit different from a real HTTP response in that
we don't have response headers, but you can set an expectation of 
response headers, and even use real response headers you've 
retrieved in real HTTP requests if you like.

Once we've made a request we can take a peek into the request 
registry:


```r
request_registry()
#> <webmockr request registry> 
#>   Registered Requests
#>   GET https://httpbin.org/get   
#>      with headers {
#>        User-Agent: libcurl/7.54.0 r-curl/3.1 crul/0.5.0, 
#>        Accept-Encoding: gzip, deflate, 
#>        Accept: application/json, text/xml, application/xml, */*
#>      } was made 1 times
```

(the printing behavior above is manual - if you run this you'll see one 
line for each request - will make some prettier printing behavior later)

We can see that a request to `https://httpbin.org/get` was made with 
certain request headers and was made 1 time. If we make that request 
again the registry will then say 2 times. And so on.


You can also set the request headers that you want to match on. 
If you do this the request has to match the HTTP method, the URI, 
and the certain request headers you set.


```r
stub_request("get", "https://httpbin.org/get") %>%
  wi_th(headers = list('User-Agent' = 'libcurl/7.51.0 r-curl/2.6 crul/0.3.6', 
                       'Accept-Encoding' = "gzip, deflate"))
#> <webmockr stub> 
#>   method: get
#>   uri: https://httpbin.org/get
#>   with: 
#>     query: 
#>     body: 
#>     request_headers: User-Agent=libcurl/7.51.0 r-curl/2.6 crul/0.3.6, Accept-Encoding=gzip, deflate
#>   to_return: 
#>     status: 
#>     body: 
#>     response_headers: 
#>   should_timeout: FALSE
#>   should_raise: FALSE
```

You can set the query parameters in a stub as well:


```r
stub_request("get", "https://httpbin.org/get") %>%
  wi_th(
    query = list(hello = "world"))
#> <webmockr stub> 
#>   method: get
#>   uri: https://httpbin.org/get
#>   with: 
#>     query: hello=world
#>     body: 
#>     request_headers: 
#>   to_return: 
#>     status: 
#>     body: 
#>     response_headers: 
#>   should_timeout: FALSE
#>   should_raise: FALSE
```



### Stubbing responses

Up until now the stubs we've created have only set what to match on, but
have not set what to return. With `to_return` you can set response headers,
response body, and response HTTP status code. You don't match requests 
on these three things, but rather they determine what's returned in the 
response. 

Here, we'll state that we want an HTTP status of 418 returned:


```r
stub_request("get", "https://httpbin.org/get") %>%
    to_return(status = 418)
#> <webmockr stub> 
#>   method: get
#>   uri: https://httpbin.org/get
#>   with: 
#>     query: 
#>     body: 
#>     request_headers: 
#>   to_return: 
#>     status: 418
#>     body: 
#>     response_headers: 
#>   should_timeout: FALSE
#>   should_raise: FALSE
```



### Stubbing HTTP exceptions

Sometimes its useful in your stubs to say that you expect a particular HTTP
error/exception. 

`webmockr` has two functions for this:

* `to_raise`: raise any HTTP exception. pass in any http exception from the
[fauxpas][] package
* `to_timeout`: raise an HTTP timeout exception. this is it's own function
since timeout exceptions are rather common and one may want to use them often

Here, with `to_raise` we pass in an HTTP exception, in this case the `HTTPBadRequest`
exception:


```r
library(fauxpas)
stub_request("get", "https://httpbin.org/get?a=b") %>% 
    to_raise(fauxpas::HTTPBadRequest)
#> <webmockr stub> 
#>   method: get
#>   uri: https://httpbin.org/get?a=b
#>   with: 
#>     query: 
#>     body: 
#>     request_headers: 
#>   to_return: 
#>     status: 
#>     body: 
#>     response_headers: 
#>   should_timeout: FALSE
#>   should_raise: HTTPBadRequest
x <- HttpClient$new(url = "https://httpbin.org")
x$get('get', query = list(a = "b"))
#> Error: Bad Request (HTTP 400).
#>  - The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.
```

With `to_timeout` a matched request to our stub will then return a timeout error:


```r
stub_request("post", "https://httpbin.org/post") %>% 
    to_timeout()
#> <webmockr stub> 
#>   method: post
#>   uri: https://httpbin.org/post
#>   with: 
#>     query: 
#>     body: 
#>     request_headers: 
#>   to_return: 
#>     status: 
#>     body: 
#>     response_headers: 
#>   should_timeout: TRUE
#>   should_raise: FALSE
x <- HttpClient$new(url = "https://httpbin.org")
x$post('post')
#> Error: Request Timeout (HTTP 408).
#>  - The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time.
```

Check out [fauxpas][] for more information about HTTP exceptions.




## Allowing real requests

You can always disable `webmockr` by using `webmockr::disable()`, which completely
disables mocking. 

You can also allow some real requests while still using `webmockr`. 

One way to allow some requests is to execute `webmockr_allow_net_connect()`, which 
doesn't disable `webmockr` completely - it allows real HTTP requests to be
made that have no stubs associated.

Another way is to disallow all requests except for certain URIs using 
`webmockr_disable_net_connect()`. For example, if we run 
`webmockr_disable_net_connect("google.com")` no real HTTP requests are allowed
other than those that match `"google.com"`. 

You can also allow only localhost HTTP requests with the `allow_localhost` parameter
in the `webmockr_configure()` function. Run `webmockr_configure(allow_localhost = TRUE)`,
and then all localhost requests will be allowed while all non-locahost 
requests will not be allowed. `allow_localhost` works for all the localhost variants: 
`localhost`, `127.0.0.1`, and `0.0.0.0`.

You can check whether you are allowing real requests with 
`webmockr_net_connect_allowed()`, and you can see your `webmockr` configuration with 
`webmockr_configuration()`. 



## Storing actual HTTP responses

`webmockr` doesn't do that. Check out [vcr][] for that.

Some have [noted](https://quickleft.com/blog/decreasing-vcr-dependency-webmock/) that in some cases storing actual http responses can get to be too cumbersome (maybe too much disk space, or other reasons) - and have reverted from using a tool like `vcr` that caches real responses to using something like `webmockr` that only "stubs" fake responses. 

There's many options for testing a library that does HTTP requests:

1. Do actual HTTP requests
2. Stub HTTP requests with a tool like `webmockr`
3. Cache real HTTP responses with a too like `vcr`

## webmockr for your test suite

You can use `webmockr` for your test suite right now. Here's a quick example of using
`webmockr` with `testthat`




```r
library(crul)
library(testthat)
```

Make a stub


```r
stub_request("get", "https://httpbin.org/get") %>%
   to_return(body = "success!", status = 200)
#> <webmockr stub> 
#>   method: get
#>   uri: https://httpbin.org/get
#>   with: 
#>     query: 
#>     body: 
#>     request_headers: 
#>   to_return: 
#>     status: 200
#>     body: success!
#>     response_headers: 
#>   should_timeout: FALSE
#>   should_raise: FALSE
```

Check that it's in the stub registry



```r
stub_registry()
#> <webmockr stub registry> 
#>  Registered Stubs
#>    get: https://httpbin.org/get   | to_return:  with body "success!"  with status 200
```

Make the request


```r
z <- crul::HttpClient$new(url = "https://httpbin.org")$get("get")
```

Run tests (nothing returned means it passed)


```r
expect_is(z, "HttpResponse")
expect_equal(z$status_code, 200)
expect_equal(z$parse("UTF-8"), "success!")
```

## Todo

There are a number of things to still get done with `webmockr`

* Integrating into `curl` and `httr` for mocking requests with those libraries. 
* Support [multiple responses for repeated requests](https://github.com/bblimke/webmock#multiple-responses-for-repeated-requests)
* Allow to [specify number of times a given response should be returned](https://github.com/ropensci/webmockr/issues/10), [see also](https://github.com/bblimke/webmock#specifying-number-of-times-given-response-should-be-returned) 
* Support regex patterns for URI's and [URI templates](https://github.com/ropensci/webmockr/issues/20)
* and probably lots more ...



## Feedback!

We'd love to get some eyes on this; to sort out problems that will no doubt arise from real world scenarios; to flesh out new use cases we hadn't thought of, etc. 

Open an issue: <https://github.com/ropensci/webmockr/issues/new>



[webmock]: https://github.com/bblimke/webmock
[vcr]: https://github.com/ropensci/vcr
[fauxpas]: https://github.com/ropenscilabs/fauxpas
[curl]: https://github.com/jeroen/curl
[httr]: https://github.com/r-lib/httr
[crul]: https://github.com/ropensci/crul
[HTTPretty]: https://github.com/gabrielfalcao/HTTPretty
[pook]: https://github.com/h2non/pook
