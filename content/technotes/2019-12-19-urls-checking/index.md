---
slug: "urls-tidying"
title: "We cleaned our website URLs with R!"
date: 2019-12-19
authors:
  - Maëlle Salmon
  - Scott Chamberlain
  - Stefanie Butland
topicid: 1904
description: How we corrected URLs in our website source (broken internal and external URLs, shortlinks, http scheme, etc.) using R tools (crul::ok(), commonmark, etc.) and some manual work.
tags:
  - Markdown
  - RMarkdown
  - xml2
  - commonmark
  - crul
  - hugo
output: 
  md_document:
    variant: markdown_github
    preserve_yaml: true
---

Last year we reported on [the joy of using commonmark and xml2 to parse
Markdown content, like the source of this website built with
Hugo](/technotes/2018/09/05/commonmark/), in particular [to extract
links](https://ropensci.org/technotes/2018/09/05/commonmark/#urls-parsing),
at the time merely to count them. How about we go a bit further and use
the same approach to find links to be fixed? In this tech note we shall
report our experience using R to find broken/suboptimal links and fix
them.

What is a bad URL?
------------------

We tackled a few URL issues:

-   We had used [absolute links (using our domain name) instead of
    relative
    links](https://stackoverflow.com/questions/2005079/absolute-vs-relative-urls).
    `https://ropensci.org/blog/` should be `/blog/`.

-   Some internal and external links were broken, but we did not know
    which ones.

-   A few links were short links (`bit.ly/blabla`) whereas it’s best to
    store the actual link because the short link could break too.

-   Some links were http links, although the same https link might work
    and would be preferred over http for security.

-   There were links to ropensci.github.io documentation websites that
    can be replaced with links to [our brand-new docs
    server](/technotes/2019/06/07/ropensci-docs/).

Please read if you try this at “home/”
--------------------------------------

There are three main ingredients to our website spring/fall cleaning: R
tools, elbow grease and *version control*! Most changes happened in a
branch, and although one can’t possibly look in detail at a diff of more
than one hundred files, we tried to be as careful as possible.

From absolute to relative links
-------------------------------

To remove the absolute links, we resorted to using regular expressions.

``` r
library("magrittr")

# Identify the Markdown files to be examined
mds <- fs::dir_ls("content", recurse = TRUE, glob = "*.md")
mds <- mds[!grepl("\\/tutorials\\/", mds)]

# Function to fix each file if needed
fix_ropensci <- function(filepath){
  readLines(filepath) -> text
  
  # We only edit files that had the issue
  if (any(grepl("http(s)?\\:\\/\\/ropensci\\.org\\/", text))){
    text %>%
      stringr::str_replace_all("http(s)?\\:\\/\\/ropensci\\.org\\/", "/") %>%
      writeLines(filepath)
  }
}

purrr::walk(mds, fix_ropensci)
```

Voilà!

Broken URLs
-----------

Now, what about the links that do not link to anything? We started by
extracting all links together with the relevant file paths.

``` r
library("magrittr")

website_source <- "/home/maelle/Documents/ropensci/roweb2"

mds <- fs::dir_ls(website_source, recurse = TRUE, glob = "*.md")
mds <- mds[!grepl("\\/tutorials\\/", mds)]

get_links <- function(filepath){
  readLines(filepath) %>%
    glue::glue_collapse(sep = "\n") %>%
    commonmark::markdown_html(normalize = TRUE,
                              extensions = TRUE) %>%
    xml2::read_html() %>%
    xml2::xml_find_all("//a") %>%
    xml2::xml_attr("href") -> urls
  
  tibble::tibble(filepath = filepath,
                 url = urls)
}

all_urls <- purrr::map_df(mds, get_links)
all_urls <- all_urls  %>%
  dplyr::mutate(url = stringr::str_remove_all(url, "#.*"),
                url = stringr::str_remove(url, "\\/$"))

all_urls
```

    ## # A tibble: 14,234 x 2
    ##    filepath                                            url                      
    ##    <chr>                                               <chr>                    
    ##  1 /home/maelle/Documents/ropensci/roweb2/content/aut… https://adamhsparks.netl…
    ##  2 /home/maelle/Documents/ropensci/roweb2/content/aut… https://aldocompagnoni.w…
    ##  3 /home/maelle/Documents/ropensci/roweb2/content/aut… http://robitalec.ca      
    ##  4 /home/maelle/Documents/ropensci/roweb2/content/aut… https://alison.rbind.io  
    ##  5 /home/maelle/Documents/ropensci/roweb2/content/aut… https://dobb.ae          
    ##  6 /home/maelle/Documents/ropensci/roweb2/content/aut… https://thestudyofthehou…
    ##  7 /home/maelle/Documents/ropensci/roweb2/content/aut… https://annakrystalli.me 
    ##  8 /home/maelle/Documents/ropensci/roweb2/content/aut… https://paleantology.com…
    ##  9 /home/maelle/Documents/ropensci/roweb2/content/aut… https://aurielfournier.g…
    ## 10 /home/maelle/Documents/ropensci/roweb2/content/aut… https://faculty.washingt…
    ## # … with 14,224 more rows

We chose a different method to find those within and outside of our
website.

### Broken internal URLs

When building a Hugo website, one gets a sitemap, which is basically a
collection of links to all the pages of the website. [If an internal
link is not in the sitemap, it does not exist.](https://masalmon.eu/404)

We generated the sitemap from within the website folder to extract
links.

``` r
cwd <- getwd()
setwd(website_source)

p <- processx::process$new("hugo", args = "server", echo = TRUE)
```

    ## Running hugo server

``` r
Sys.sleep(120)

localhost <- "http://localhost:1313"
browseURL(localhost)
paste0(localhost, "/sitemap.xml") %>%
  xml2::read_xml() %>%
  xml2::xml_ns_strip() %>%
  xml2::xml_find_all("//loc") %>%
  xml2::xml_text() %>%
  stringr::str_remove_all(localhost) %>%
  stringr::str_remove("\\/$") -> links

p$kill()
```

    ## [1] TRUE

``` r
setwd(cwd)
head(links)
```

    ## [1] "/authors/scott-chamberlain"         "/tags/api"                         
    ## [3] "/authors"                           "/tags/http"                        
    ## [5] "/technotes/2019/12/11/http-testing" "/tags/mocking"

So these are the existing internal links. We could also have extracted
them using [the multi-request features of
curl](https://github.com/jeroen/curl/blob/master/examples/sitemap.R).

Let’s now extract the internal links we used in the content.

``` r
all_urls %>%
  dplyr::filter(!grepl("^http", url)) -> 
  internal_urls

head(internal_urls)
```

    ## # A tibble: 6 x 2
    ##   filepath                                             url                      
    ##   <chr>                                                <chr>                    
    ## 1 /home/maelle/Documents/ropensci/roweb2/content/blog… /community               
    ## 2 /home/maelle/Documents/ropensci/roweb2/content/blog… /community               
    ## 3 /home/maelle/Documents/ropensci/roweb2/content/blog… /blog/2013/05/10/introdu…
    ## 4 /home/maelle/Documents/ropensci/roweb2/content/blog… /about                   
    ## 5 /home/maelle/Documents/ropensci/roweb2/content/blog… /community               
    ## 6 /home/maelle/Documents/ropensci/roweb2/content/blog… /contact

So, what are the missing ones? We used the code below to identify them
and then we [manually fixed or removed
them](https://github.com/ropensci/roweb2/pull/534/commits/7715dc022141888b4f064cc44fe50b29b031c755).

``` r
 internal_urls %>%
   dplyr::filter(!url %in% links)
```

### Broken external URLs

To identify broken external URLs, we ran
[`crul::ok()`](https://docs.ropensci.org/crul/reference/ok.html) on all
of them and created a big spreadsheet of URLs to look at.

``` r
external_urls <- dplyr::anti_join(all_urls, internal_urls, 
                                  by = c("filepath", "url"))

unique_urls <- unique(external_urls[, "url"])

ok <- memoise::memoise(
  ratelimitr::limit_rate(crul::ok, 
                         ratelimitr::rate(1, 1)))

get_ok <- function(url){
  message(url)
  ok(url)
}

unique_urls <- unique_urls %>%
  dplyr::group_by(url) %>%
  dplyr::summarise(ok = get_ok(url))

external_urls <- dplyr::left_join(external_urls, unique_urls,
                                  by = "url")
external_urls <- dplyr::arrange(external_urls, url)


parse_one_post <- function(path){
  if (grepl("\\_index", path)){
    return(NULL)
  }
  lines <- suppressWarnings(readLines(path, encoding = "UTF-8"))
  yaml <- blogdown:::split_yaml_body(lines)$yaml
  yaml <- glue::glue_collapse(yaml, sep = "\n")
  yaml <- yaml::yaml.load(yaml)
  
  meta <- tibble::tibble(date = anytime::anydate(yaml$date),
                         author = yaml$authors,
                         title = yaml$title, 
                         software_peer_review = "Software Peer Review" %in% yaml$tags,
                         type = dplyr::if_else(grepl("\\/blog\\/", path),
                                               "blog post", "tech note"),
                         filepath = path)
  
  meta
}

info <- purrr::map_df(mds[grepl("blog", mds)|grepl("technotes",mds)], parse_one_post)

info <- dplyr::group_by(info, filepath) %>%
  dplyr::summarize(date = date[1],
                   author = toString(author),
                   title = title[1],
                   type = type[1])

bad_urls <- dplyr::filter(external_urls, !ok)
bad_urls <- dplyr::left_join(bad_urls, info, by = "filepath")

readr::write_csv(bad_urls, "urls.csv")
```

From that spreadsheet hundreds of links were examined **manually**! When
there was a replacement link, we used it thanks to a code looping over
all links. For the about 50 links without replacement, we amended the
posts by hand to make sure to take context into account (e.g. removing
the link vs. removing the whole sentence presenting it).

There were quite a few false positives i.e. actually valid URLs. This
lead to some edits in
[`crul::ok()`](https://docs.ropensci.org/crul/reference/ok.html) and the
following wisdom:

Sometimes you’ll get an error for the HEAD request but not the GET
request.

``` r
# use get verb instead of head
crul::ok("http://animalnexus.ca")
```

    ## [1] FALSE

``` r
crul::ok("http://animalnexus.ca", verb = "get")
```

    ## [1] TRUE

Sometimes you’ll need an user-agent whose name does not contain “curl”,
which the default user-agent of crul contains (`crul:::make_ua()` is
libcurl/7.58.0 r-curl/4.3 crul/0.9.1.9991).

``` r
# some urls will require a different useragent string
# they probably regex the useragent string
crul::ok("https://doi.org/10.1093/chemse/bjq042")
```

    ## GnuTLS recv error (-54): Error in the pull function.

    ## [1] FALSE

``` r
crul::ok("https://doi.org/10.1093/chemse/bjq042", verb = "get", useragent = "foobar")
```

    ## [1] TRUE

From short to long links
------------------------

We only identified short links using the bit.ly service. We found the
corresponding link by running the function below. There were actually
only 4 short links so that was quick.

``` r
get_long <- function(url){
  crul::HttpClient$new(url)$get()$url
}
get_long("http://bit.ly/2JfrzmE")
```

    ## [1] "https://www.timeanddate.com/worldclock/fixedtime.html?msg=rOpenSci+Community+Call+on+Reproducible+Research+with+R&iso=20190730T09&p1=791&ah=1"

http vs https
-------------

<!--html_preserve-->
{{% tweet 1159812119099060224 %}} <!--/html_preserve-->

We proceeded as previously when checking external links, except we used
better settings for `crul::ok()`.

``` r

http <- dplyr::filter(all_urls, grepl("http\\:", url))
http <- dplyr::mutate(http, https = sub("http\\:", "https:", url))
unique_urls <- unique(http[, "https"])

ok <- memoise::memoise(
  ratelimitr::limit_rate(crul::ok, 
                         ratelimitr::rate(1, 1)))

get_ok <- function(url){
  message(url)
  ok(url, verb = "get", useragent = "Maëlle Salmon checking links")
}

unique_urls <- unique_urls %>%
  dplyr::group_by(https) %>%
  dplyr::summarise(ok = get_ok(https))

http <- dplyr::left_join(http, unique_urls, by = "https")
httpsok <- dplyr::filter(http, ok)

modify_url <- function(index, df = httpsok) {
  row <- df[index,]
  readLines(row$filepath) %>%
    stringr::str_replace_all(row$url, row$https) %>%
    writeLines(row$filepath)
  
}

purrr::walk(seq_len(nrow(httpsok)), modify_url)
```

You can [browse the related
PR](https://github.com/ropensci/roweb2/pull/582/). Note that in the
above, we could have used
[`urltools`](https://github.com/Ironholds/urltools/) to parse URLs and
extract their scheme (http or https).

### docs.ropensci.org

To replace some ropensci.github.io links with docs.ropensci.org links,
we used the brute force approach below (there were only about 80 such
links).

``` r
dotgithub <- dplyr::filter(all_urls, urltools::domain(url) == "ropensci.github.io")


make_docs_url <- function(url, ropensci_pkgs = ropensci_pkgs) {
  message(url)
  newurl <- url
  urltools::domain(newurl) <- "docs.ropensci.org"
  
  if (crul::ok(newurl, verb = "get", useragent = "Maëlle Salmon checking links")) {
    return(newurl)
  } else {
    return(url)
  }
}

dotgithub <- dotgithub %>%
  dplyr::group_by(url) %>%
  dplyr::mutate(newurl = make_docs_url(url))


modify_url <- function(index, df = dotgithub) {
  row <- df[index,]
  readLines(row$filepath) %>%
    stringr::str_replace_all(row$url, row$newurl) %>%
    writeLines(row$filepath)
  
}

purrr::walk(seq_len(nrow(dotgithub)), modify_url)
```

Conclusion
----------

In this tech note we saw how to use a combination of regular
expressions, commonmark, xml2 and crul to identify links to be fixed in
Markdown content. For html content, check out [the experimental checker
package by François Michonneau](https://github.com/fmichonneau/checker).
For packages, have a look at [Bob Rudis’ RStudio
add-in](https://github.com/hrbrmstr/hrbraddins#whats-in-the-tin).

Some of the issues we fixed, like using relative rather than absolute
links, and not storing shortlinks, could be avoided in the future by
stricter URL guidelines for new content. We also plan to stop using
Click here links, refer to [this page about why Click here links are
bad](https://webaccess.berkeley.edu/ask-pecan/click-here).

Now, a remaining issue is the frequency at which URL cleaning should
occur. In [our dev guide](https://devguide.ropensci.org/), we clean
links [before each
release](https://devguide.ropensci.org/bookreleaseissue.html#bookreleaseissue),
but this website has no such schedule, so let’s hope we remember to
clean URLs once in a while. Maybe some old pages could also be ["archived" like this example](https://kb.iu.edu/d/abwp). When do *you* clean URLs in your content,
and how?
