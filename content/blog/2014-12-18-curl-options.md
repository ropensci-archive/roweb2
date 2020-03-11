---
slug: curl-options
title: Curling - exploring web request options
date: '2014-12-18'
author:
  - Scott Chamberlain
tags:
  - R
  - API
  - curl
---



rOpenSci specializes in creating R libraries for accessing data resources on the web from R. Most times you request data from the web in R with our packages, you should have no problem. However, you evenutally will run into problems. In addition, there are advanced things you can do modifying requests to web resources that fall in the _advanced stuff_ category.

Underlying almost all of our packages are requests to web resources served over the `http` protocol via [curl][curl]. `curl` _is a command line tool and library for transferring data with URL syntax, supporting (lots of protocols)_ . `curl` has many options that you may not know about.

I'll go over some of the common and less commonly used curl options, and try to explain why you may want to use some of them.

## Discover curl options

You can go to the source, that is the curl manual page at [https://curl.haxx.se/docs/manpage.html](https://curl.haxx.se/docs/manpage.html). In R: `RCurl::listCurlOptions()` for finding curl options, give website for more info and equivalent call in `httr` is `httr::httr_options()`. `httr::httr_options()` gives more information for each curl option, including the libcurl variable name (e.g., `CURLOPT_CERTINFO`) and the type of variable (e.g., logical).

## Other ways to use curl besides R

Perhaps the canonical way to use curl is on the command line. You can get curl for your operating system at [https://curl.haxx.se/download.html](https://curl.haxx.se/download.html), though hopefully you already have curl. Once you have curl, you can have lots of fun. For example, get the contents of the Google landing page:

```sh
curl https://www.google.com
```

* If you like that you may also like [httpie][httpie], a Python command line tool that is a little more convenient than curl (e.g., JSON output is automatically parsed and colorized).
* Alot of data from the web is in JSON format. A great command line tool to pair with `curl` is [jq][jq].

> Note: if you are on windows you may require extra setup if you want to play with curl on the command line. OSX and linux have it by default. On Windows 8, installing the latest version from here https://curl.haxx.se/download.html#Win64 worked for me.

## Install httr

> Note: `RCurl` is a dependency, so you'll get it when you install `httr`


```r
install.packages("httr")
```

There are some new features in `httr` dev version you may want. If so, do:


```r
install.packages("devtools")
devtools::install_github("hadley/httr")
```

Load `httr`


```r
library("httr")
```

## general option setting

With `httr` you can either set globally for an R session like


```r
set_config(timeout(seconds = 2))
```

Or use `with_config()`


```r
with_config(verbose(), {
  GET("http://www.google.com/search")
})
```

Or extensions to `with_*`, like for `verbose` output


```r
with_verbose(
  GET("http://www.google.com/search")
)
#> Response [http://www.google.com/webhp]
#>   Date: 2014-12-17 07:54
#>   Status: 200
#>   Content-Type: text/html; charset=ISO-8859-1
#>   Size: 19.3 kB
#> <!doctype html><html itemscope="" itemtype="http://schema.org/WebPage" l...
#> function _gjh(){!_gjuc()&&window.google&&google.x&&google.x({id:"GJH"},f...
#> if (!iesg){document.f&&document.f.q.focus();document.gbqf&&document.gbqf...
#> }
#> })();</script><div id="mngb">   <div id=gbar><nobr><b class=gb1>Search</...
#> a.i.Z,window.gbar.elr&&a.i.$(window.gbar.elr()),window.gbar.elc&&window....
#> });})();</script> </div> </span><br clear="all" id="lgpd"><div id="lga">...
#> });})();</script></div></div><span id="footer"><div style="font-size:10p...
```

Or pass into each function call


```r
GET("http://www.google.com/search", query=list(q="httr"), timeout(seconds = 0.5))
```

With `RCurl` you can set options for a function call by passing curl options to the `.opts` parameter


```r
getForm("http://www.google.com/search?q=RCurl", btnG="Search", .opts = list(timeout.ms = 20))
```

For all examples below I'll use `httr`, and pass in config options to function calls.

## curl options in rOpenSci packages

In most of our packages we allow you to pass in any curl options, either via `...` or a named parameter. We are increasingly making our packages consistent, but they may not all have this ability yet. For example, using the `rgbif` package, an R client for [GBIF][gbif]:


```r
install.packages("rgbif")
```

verbose output


```r
library("rgbif")
res <- occ_search(geometry=c(-125.0,38.4,-121.8,40.9), limit=20, config=verbose())
#> -> GET /v1/occurrence/search?geometry=POLYGON%28%28-125%2038.4%2C%20-121.8%2038.4%2C%20-121.8%2040.9%2C%20-125%2040.9%2C%20-125%2038.4%29%29&limit=20&offset=0 HTTP/1.1
#> -> User-Agent: curl/7.37.1 Rcurl/1.95.4.5 httr/0.6.0
#> -> Host: api.gbif.org
#> -> Accept-Encoding: gzip
#> -> Accept: application/json, text/xml, application/xml, */*
#> ->
#> <- HTTP/1.1 200 OK
#> <- Content-Type: application/json
#> <- Access-Control-Allow-Origin: *
#> <- Server: Jetty(9.1.z-SNAPSHOT)
#> <- x-api-url: /v1/occurrence/search?geometry=POLYGON%28%28-125%2038.4%2C%20-121.8%2038.4%2C%20-121.8%2040.9%2C%20-125%2040.9%2C%20-125%2038.4%29%29&limit=20&offset=0
#> <- Content-Length: 48698
#> <- Accept-Ranges: bytes
#> <- Date: Tue, 16 Dec 2014 23:35:52 GMT
#> <- X-Varnish: 1067986052 1067940827
#> <- Age: 209
#> <- Via: 1.1 varnish
#> <- Connection: keep-alive
#> <-
```

Print progress


```r
res <- occ_search(geometry=c(-125.0,38.4,-121.8,40.9), limit=20, config=progress())
#> |===================================================================| 100%
```

You can also combine curl options - use `c()` in this case to combine them


```r
c(verbose(), progress())
#> Config:
#> List of 4
#>  $ debugfunction   :function (...)
#>  $ verbose         :TRUE
#>  $ noprogress      :FALSE
#>  $ progressfunction:function (...)
```


```r
res <- occ_search(geometry=c(-125.0,38.4,-121.8,40.9), limit=20, config=c(verbose(), progress()))
#> -> GET /v1/occurrence/search?geometry=POLYGON%28%28-125%2038.4%2C%20-121.8%2038.4%2C%20-121.8%2040.9%2C%20-125%2040.9%2C%20-125%2038.4%29%29&limit=20&offset=0 HTTP/1.1
#> -> User-Agent: curl/7.37.1 Rcurl/1.95.4.5 httr/0.6.0
#> -> Host: api.gbif.org
#> -> Accept-Encoding: gzip
#> -> Accept: application/json, text/xml, application/xml, */*
#> ->
#> <- HTTP/1.1 200 OK
#> <- Content-Type: application/json
#> <- Access-Control-Allow-Origin: *
#> <- Server: Jetty(9.1.z-SNAPSHOT)
#> <- x-api-url: /v1/occurrence/search?geometry=POLYGON%28%28-125%2038.4%2C%20-121.8%2038.4%2C%20-121.8%2040.9%2C%20-125%2040.9%2C%20-125%2038.4%29%29&limit=20&offset=0
#> <- Content-Length: 48698
#> <- Accept-Ranges: bytes
#> <- Date: Tue, 16 Dec 2014 23:35:52 GMT
#> <- X-Varnish: 1067986052 1067940827
#> <- Age: 209
#> <- Via: 1.1 varnish
#> <- Connection: keep-alive
#> <-
#>   |======================================================================| 100%
```

## timeout

> Set a timeout for a request. If request exceeds timeout, request stops.

* `httr`: `timeout(seconds=2)` Here, the value is in seconds - converted to ms internally
* `RCurl`: `timeout.ms=2000` Here, the value is in ms

> Note: For this section and those following, I'll mention an `RCurl` equivalent if there is one.


```r
GET("http://www.google.com/search", timeout(0.01))
#> Error in function (type, msg, asError = TRUE)  :
#>   Connection timed out after 16 milliseconds
```

* _Why use this?_ You sometimes are working with a web resource that is somewhat unreliable. For example, if you want to run a script on a server that may take many hours, and the web resource could be down at some point during that time, you could set the timeout and error catch the response so that the script doesn't hang on a server that's not responding. Another example could be if you call a web resource in an R package. In your test suite, you may want to test that a web resource is responding quickly, so you could set a timeout, and not test if that fails.

## verbose

> Print detailed info on a curl call

* `httr`: `verbose()`
* `RCurl`: `verbose=TRUE`

Just do a `HEAD` request so we don't have to deal with big output


```r
HEAD("http://www.google.com/search", verbose())
#> -> HEAD / HTTP/1.1
#> -> User-Agent: curl/7.37.1 Rcurl/1.95.4.5 httr/0.6.0
#> -> Host: had.co.nz
#> -> Accept-Encoding: gzip
#> -> Accept: application/json, text/xml, application/xml, */*
#> ->
#> <- HTTP/1.1 200 OK
#> <- X-Powered-By: PHP/4.4.6
#> <- Content-type: text/html
#> <- Date: Tue, 16 Dec 2014 21:03:21 GMT
#> <- Server: LiteSpeed
#> <- Connection: Keep-Alive
#> <- Keep-Alive: timeout=5, max=100
#> <-
#> Response [http://had.co.nz/]
#>   Date: 2014-12-16 12:29
#>   Status: 200
#>   Content-Type: text/html
#> <EMPTY BODY>
```

* _Why use this?_ As you can see verbose output gives you lots of information that may be useful for debugging a request. You typically don't need verbose output unless you want to inspect a request.

## headers

> Add headers to modify requests, including authentication, setting content-type, accept type, etc.

* `httr`: `add_headers()`
* `RCurl`: `httpheader`


```r
res <- HEAD("http://www.google.com/search", add_headers(Accept = "application/json"))
res$request$opts$httpheader
#>             Accept
#> "application/json"
```

> Note: there are shortcuts for `add_headers(Accept = "application/json")` and add_headers(Accept = "application/xml"): `accept_json()`, and `accept_xml()`

* _Why use this?_ For some web resources, using headers is mandatory, and `httr` makes including them quite easy. Headers are nice too because e.g., passing authentication in the header instead of the URL string means your private data is not as exposed to prying eyes.

## authenticate

> Set authentication details for a resource

* `httr`: `authenticate()`, `oauth2.0_token()`, `oauth_app()`, `oauth_endpoint()`, etc.
* `RCurl`: various

`authenticate()` for basic username/password authentication


```r
authenticate(user = "foo", password = "bar")
#> Config:
#> List of 2
#>  $ httpauth:1
#>   ..- attr(*, "names")="basic"
#>  $ userpwd :"foo:bar"
```

To use an API key, this depends on the data provider. They may request it one or either of the header (in multiple different ways)


```r
HEAD("http://www.google.com/search", add_headers(Authorization = "Bearer 234kqhrlj2342"))
# or
HEAD("http://www.google.com/search", add_headers("token" = "234kqhrlj2342"))
```

or as a query parameter (which is passed in the URL string)


```r
HEAD("http://www.google.com/search", query = list(api_key = "<your key>"))
```

Another authentication options is OAuth workflows. `OAuth2` is probably more commonly used than `OAuth1`.

* Find OAuth settings for github https://developer.github.com/v3/oauth/


```r
endpts <- oauth_endpoint(authorize = "authorize", access = "access_token", base_url = "https://github.com/login/oauth")
```

* Register an application at https://github.com/settings/applications. Use any URL you would like for the homepage URL (https://github.com is fine) and http://localhost:1410 as the callback url. Insert your client ID and secret below - if secret is omitted, it will look it up in the GITHUB_CONSUMER_SECRET environmental variable.


```r
myapp <- oauth_app(appname = "github", key = "<key>", secret = "<secret>")
```

* Get OAuth credentials


```r
github_token <- oauth2.0_token(endpts, myapp)
```

* Use API


```r
gtoken <- config(token = github_token)
req <- GET("https://api.github.com/rate_limit", gtoken)
content(req)
```

## cookies

> Set or get cookies.

* `httr`: `set_cookies()`, `cookies()`
* `RCurl`: `cookie`

Set cookies


```r
GET("http://httpbin.org/cookies", set_cookies(a = 1, b = 2))
#> Response [http://httpbin.org/cookies]
#>   Date: 2014-12-17 07:54
#>   Status: 200
#>   Content-Type: application/json
#>   Size: 50 B
#> {
#>   "cookies": {
#>     "a": "1",
#>     "b": "2"
#>   }
```

If there are cookies in a response, you can access them easily with `cookies()`


```r
res <- GET("http://httpbin.org/cookies/set", query = list(a = 1, b = 2))
cookies(res)
#> $b
#> [1] 2
#>
#> $a
#> [1] 1
```

## progress

> Print curl progress

* `httr`: `progress()`
* `RCurl`: `progressfunction`


```r
res <- GET("http://httpbin.org", progress())
#> |==================================| 100%
```

* _Why use this?_ As you could imagine, this is increasingly useful as a request for a web resource takes longer and longer. For very long requests, this will help you know approximately when a request will finish.

## proxies

> When behind a proxy, give authentiction details for your proxy.

* `httr`: `use_proxy()`
* `RCurl`: See various curl options that start with `proxy`


```r
GET("http://www.google.com/search", use_proxy(url = "125.39.66.66", port = 80, username = "username", password = "password"))
```

* _Why use this?_ Most of us likely don't need to worry about this. However, if you are in a work place, or maybe in certain geographic locations, you may have to use a proxy. I haven't personally used a proxy in R, so any feedback on this is great.

## user agent

> Some resources require a user-agent string.

* `httr`: `user_agent()`
* `RCurl`: `useragent`

Get the default user agent set if using `httr`


```r
GET("http://httpbin.org/user-agent")
#> Response [http://httpbin.org/user-agent]
#>   Date: 2014-12-17 07:54
#>   Status: 200
#>   Content-Type: application/json
#>   Size: 59 B
#> {
#>   "user-agent": "curl/7.37.1 Rcurl/1.95.4.5 httr/0.6.0"
```

Set a user agent string


```r
GET("http://httpbin.org/user-agent", user_agent("its me!"))
#> Response [http://httpbin.org/user-agent]
#>   Date: 2014-12-17 07:54
#>   Status: 200
#>   Content-Type: application/json
#>   Size: 29 B
#> {
#>   "user-agent": "its me!"
```

* _Why use this?_ This is set by default in a http request, as you can see in the first example above for user agent. Some web APIs require that you set a specific user agent. For example, the [GitHub API](https://developer.github.com/v3/#user-agent-required) requires that you include a user agent string in the header of each request that is your username or the name of your application so they can contact you if there is a problem.

## Questions?

Let us know if you have any questions. To a `curl` newbie, it may seem a bit overwhelming, but we're here to help.

[curl]: https://curl.haxx.se/
[jq]: https://stedolan.github.io/jq/
[httpie]: https://github.com/jakubroztocil/httpie
[gbif]: https://www.gbif.org/
