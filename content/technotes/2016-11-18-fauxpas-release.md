---
slug: fauxpas-release
title: fauxpas - HTTP conditions package
date: '2016-11-18'
author:
  - Scott Chamberlain
tags:
  - R
  - http
---



HTTP, or [Hypertext Transfer Protocol][httpwiki] is a protocol by which most 
of us interact with the web. When we do requests to a website in a browser 
on desktop or mobile, or get some data from a server in R, all of that is 
using HTTP. 

HTTP has a rich suite of [status codes][codes] describing different HTTP 
conditions, ranging from `Success` to various client errors, to server errors.
R has a few HTTP client libraries - [crul][crul], [curl][curl], [httr][httr], 
and [RCurl][RCurl] - each of which is slightly different. I thought it would 
be nice if there was a single way to do HTTP exception handling across these
libraries.

`fauxpas` is a package to handle HTTP conditions. Methods are included for 
general purpose HTTP error handling, as well as individual methods for every 
HTTP status code, both via status code numbers as well as their descriptive 
names. `fauxpas` allows flexibility to have stop, message or warning behavior.

In addition, you can use custom [whisker][whisker] template to have any 
configuration of status code, short description, and verbose message. 

`fauxpas` currently supports integration with `crul`, `curl`, and `httr`.

It will be interesting to see how people use `fauxpas`. It may be that 
users really like being able to handle individual HTTP conditions separately,
or it may be that most users simply want a general purpose handler.

## Installation


```r
install.packages("fauxpas")
```


```r
library("fauxpas")
```

## Generic http condition handler

`Error()` is the most generic handler in `fuaxpas`

First, let's make an HTTP request, here with `crul`, using the wonderful
<https://httpbin.org> site.


```r
library("crul")
res <- HttpClient$new("https://httpbin.org/status/418")$get()
```

Next, we'll constrct an error object


```r
(x <- Error$new(behavior = "stop"))
#> <HTTP Error>
#>   behavior: stop
#>   message_template: {{reason}} (HTTP {{status}}).
```

The default behavior is `stop` - you can also choose `warning` or `message`.

The object is of class `Error` and is an `R6` object. You can inspect parts
of the object


```r
x$behavior
#> [1] "stop"
x$behavior_type
#> [1] "error"
x$call.
#> [1] FALSE
x$message_template
#> [1] "{{reason}} (HTTP {{status}})."
```

Check the response


```r
x$do(res)
#> Error: I'm a teapot (HTTP 418).
```


## HTTP* R6 methods

In addition to `Error()`, there's a method for every HTTP code - they start with 
`HTTP`, followed by the http code name. For example, `HTTPBadGateway` for 
the 502 code.

These are R6 methods as well, but inherit from the `Error` class. So they implement
`do()`, but also `do_verbose()` to include a verbose explanation of the http 
condition.

Make an HTTP request:


```r
res <- HttpClient$new("https://httpbin.org/status/414")$get()
```


```r
x <- HTTPRequestURITooLong$new()
```


```r
x$do(res)
#> Error: Request-URI Too Long (HTTP 414).
```


```r
x$do_verbose(res)
#> Error: Request-URI Too Long (HTTP 414).
#>  - The server is refusing to service the request because the Request-URI is longer 
#> than the server is willing to interpret. This rare condition is only likely to occur 
#> when a client has improperly converted a POST request to a GET request with long 
#> query information, when the client has descended into a URI 'black hole' of 
#> redirection (e.g., a redirected URI prefix that points to a suffix of itself), or 
#> when the server is under attack by a client attempting to exploit security holes 
#> present in some servers using fixed-length buffers for reading or manipulating
#> the Request-URI.
```


## http* methods

There's a series of simpler to use functions for every http condition that wrap
the above `HTTP*` methods that follow the form `http*`, where the `*` is the 
status code number. For example, `http404` for the 404 code.

Make an HTTP request:


```r
library("crul")
res <- HttpClient$new("https://httpbin.org/status/418")$get()
```

Default behavior is to `stop()`


```r
http(res)
#> Error: I'm a teapot (HTTP 418).
```

But you can easily do `warning()`


```r
http(res, behavior = "warning")
#> Warning message:
#> I'm a teapot (HTTP 418). 
```

Or `message()`


```r
http(res, behavior = "message")
#> I'm a teapot (HTTP 418).
```


## Custom templates

The default way that conditions are handled is with the template:

`"{{reason}} (HTTP {{status}})."`

Named elements that are used for `do()` are:

* `reason`
* `status`

Named elements that are used for `do_verbose()` are:

* `reason`
* `status`
* `message`

All other named elements are ignored.


First, make an HTTP request:


```r
library("crul")
res <- HttpClient$new("https://httpbin.org/status/418")$get()
```

Then, run a handler with a custom template:


```r
http418(res, message_template = "{{status}}\n  --> {{reason}}")
#> Error: 418
#>   --> I'm a teapot
```



## Future work

### Even more customizeable messages

Right now, you can use a hack to customize the `do_verbose()` method to replace
the `mssg` string (which holds the verbose explanation of the HTTP condition 
from the HTTP spec) with your own message. For example, servers often return custom
messages explaining why a request failed (e.g., _page must be a number_). Ideally, 
you'd want to return that message along with the HTTP code (presumably `400` or 
similar) and the HTTP name (`Bad Request`). 

I'm going to make this easier, so you don't have to replace the verbose HTTP
condition explanation, so you can still expose that if you want.

### Support RCurl

I hope to support `RCurl` at some point.

## Feedback?

I'd love to know what people think about this package. 

* Does the package API make sense?  
* Any additional exported methods you'd like?

I know documentation can be better, e.g., there's no vignette yet (but adding 
that soon).


[httpwiki]: https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
[codes]: https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
[whisker]: https://cran.rstudio.com/web/packages/whisker
[crul]: https://cran.rstudio.com/web/packages/crul
[curl]: https://cran.rstudio.com/web/packages/curl
[httr]: https://cran.rstudio.com/web/packages/httr
[RCurl]: https://cran.rstudio.com/web/packages/RCurl
