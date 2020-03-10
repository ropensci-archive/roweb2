---
slug: crul-release
title: crul - an HTTP client
date: '2016-11-09'
author:
  - Scott Chamberlain
tags:
  - R
  - API
---

A new package [crul](https://cran.rstudio.com/web/packages/crul) is
on CRAN. `crul` is another HTTP client for R, but is relatively simplified
compared to [httr](https://github.com/hadley/httr), and is being built
to link closely with [webmockr][webmockr] and [vcr][vcr]. `webmockr` and
`vcr` are packages ported from Ruby's [webmock](https://github.com/bblimke/webmock)
and [vcr](https://github.com/vcr/vcr), respectively.
They both make mocking HTTP requests really easy.

A major use case for mocking HTTP requests is for unit tests. Nearly all the
packages I work on personally make HTTP
requests in their test suites, so I wanted to make it really easy to
mock HTTP requests. You don't have to use mocking in test suites of course.

`crul` is not meant to replace other HTTP R libraries, but rather to make it
easy to integrate mocking.

## Installation


```r
install.packages("crul")
```

If binaries aren't available, try from source:
`install.packages("crul", type = "source")` or from GitHub:
`devtools::install_github("ropenscilabs/crul")`


```r
library(crul)
```

## The client

`HttpClient` is where to start


```r
(x <- HttpClient$new(
  url = "https://httpbin.org",
  opts = list(
    timeout = 1
  ),
  headers = list(
    a = "hello world"
  )
))
#> <crul connection>
#>   url: https://httpbin.org
#>   options:
#>     timeout: 1
#>   headers:
#>     a: hello world
```

Makes a R6 class, that has all the bits and bobs you'd expect for doing HTTP
requests. When it prints, it gives any defaults you've set. As you update
the object you can see what's been set


```r
x$opts
#> $timeout
#> [1] 1
```


```r
x$headers
#> $a
#> [1] "hello world"
```

## Make a request

The client object created above has http methods that you can call,
and pass paths to, as well as query parameters, body values, and any other
curl options.

Here, we'll do a __GET__ request on the route `/get` on our base url
`https://httpbin.org` (the full url is then `https://httpbin.org/get`)


```r
res <- x$get("get")
```

The response from a http request is another R6 class `HttpResponse`, which
has slots for the outputs of the request, and some functions to deal with
the response:

Status code


```r
res$status_code
#> [1] 200
```

Status code with the message and explanation


```r
res$status_http()
#> <Status code: 200>
#>   Message: OK
#>   Explanation: Request fulfilled, document follows
```

The content


```r
res$content
#>   [1] 7b 0a 20 20 22 61 72 67 73 22 3a 20 7b 7d 2c 20 0a 20 20 22 68 65 61
#>  [24] 64 65 72 73 22 3a 20 7b 0a 20 20 20 20 22 41 22 3a 20 22 68 65 6c 6c
#>  [47] 6f 20 77 6f 72 6c 64 22 2c 20 0a 20 20 20 20 22 41 63 63 65 70 74 22
#>  [70] 3a 20 22 2a 2f 2a 22 2c 20 0a 20 20 20 20 22 41 63 63 65 70 74 2d 45
#>  [93] 6e 63 6f 64 69 6e 67 22 3a 20 22 67 7a 69 70 2c 20 64 65 66 6c 61 74
#> [116] 65 22 2c 20 0a 20 20 20 20 22 48 6f 73 74 22 3a 20 22 68 74 74 70 62
#> [139] 69 6e 2e 6f 72 67 22 2c 20 0a 20 20 20 20 22 55 73 65 72 2d 41 67 65
#> [162] 6e 74 22 3a 20 22 6c 69 62 63 75 72 6c 2f 37 2e 34 39 2e 31 20 72 2d
#> [185] 63 75 72 6c 2f 32 2e 32 20 63 72 75 6c 2f 30 2e 31 2e 30 22 0a 20 20
#> [208] 7d 2c 20 0a 20 20 22 6f 72 69 67 69 6e 22 3a 20 22 31 35 37 2e 31 33
#> [231] 30 2e 31 37 39 2e 38 36 22 2c 20 0a 20 20 22 75 72 6c 22 3a 20 22 68
#> [254] 74 74 70 73 3a 2f 2f 68 74 74 70 62 69 6e 2e 6f 72 67 2f 67 65 74 22
#> [277] 0a 7d 0a
```

HTTP method


```r
res$method
#> [1] "get"
```

Request headers


```r
res$request_headers
#> $a
#> [1] "hello world"
```

Response headers


```r
res$response_headers
#> [1] "HTTP/1.1 200 OK"
#> [2] "Server: nginx"
#> [3] "Date: Wed, 09 Nov 2016 19:25:14 GMT"
#> [4] "Content-Type: application/json"
#> [5] "Content-Length: 279"
#> [6] "Connection: keep-alive"
#> [7] "Access-Control-Allow-Origin: *"
#> [8] "Access-Control-Allow-Credentials: true"
```

And you can parse the content with a provided function:


```r
res$parse()
#> [1] "{\n  \"args\": {}, \n  \"headers\": {\n    \"A\": \"hello world\", \n    \"Accept\": \"*/*\", \n    \"Accept-Encoding\": \"gzip, deflate\", \n    \"Host\": \"httpbin.org\", \n    \"User-Agent\": \"libcurl/7.49.1 r-curl/2.2 crul/0.1.0\"\n  }, \n  \"origin\": \"157.130.179.86\", \n  \"url\": \"https://httpbin.org/get\"\n}\n"
```

parse the JSON


```r
jsonlite::fromJSON(res$parse())
#> $args
#> named list()
#>
#> $headers
#> $headers$A
#> [1] "hello world"
#>
#> $headers$Accept
#> [1] "*/*"
#>
#> $headers$`Accept-Encoding`
#> [1] "gzip, deflate"
#>
#> $headers$Host
#> [1] "httpbin.org"
#>
#> $headers$`User-Agent`
#> [1] "libcurl/7.49.1 r-curl/2.2 crul/0.1.0"
#>
#>
#> $origin
#> [1] "157.130.179.86"
#>
#> $url
#> [1] "https://httpbin.org/get"
```

## Future work

### Mocking

`crul` doesn't currently have mocking ability, but I am working right now on
getting the first version of [webmockr][webmockr] on
CRAN. It will work together with `crul` so that when you use `crul` you can
choose to turn on mocking, specify which patterns to match for mocking,
and much more.  `webmockr` is built with plugin system in mind, so that we
could make a plugin for `httr`, `RCurl`, or any other http R library.

I actually started `vcr` first, but realized that I needed to go back and
build `webmockr` first. So once `webmockr` is up on CRAN, I'll work on getting
`vcr` on CRAN as well.

### Errors

Another package I've been working on, [fauxpas][fauxpas], is meant to be a
general purpose HTTP errors package, and work with any HTTP R library.
Other similar languages like Ruby and Python have a better error story,
and I thought I'd try it out for R.  I'll work on incorporating `fauxpas`
into `crul` as well, though probably in Suggests in case users don't want
to use it.


[webmockr]: https://github.com/ropenscilabs/webmockr
[vcr]: https://github.com/ropenscilabs/vcr
[fauxpas]: https://github.com/sckott/fauxpas
