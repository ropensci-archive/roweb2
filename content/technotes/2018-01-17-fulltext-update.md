---
slug: fulltext-v1
title: 'fulltext v1: text-mining scholarly works'
date: '2018-01-17'
authors:
  - Scott Chamberlain
categories: technotes
topicid: 1032
tags:
  - text mining
  - fulltext
  - data
  - journals
  - R
  - open-access
---

## The problem

Text-mining - the art of answering questions by extracting patterns, data, etc. out of the published literature - is not easy. 

It's made incredibly difficult because of publishers. It is a fact that the vast majority of publicly funded research across the globe is published in paywall journals. That is, taxpayers pay twice for research: once for the grant to fund the work, then again to be able to read it. These paywalls mean that every potential person text-mining will have different access: some have access through their university, some may have access through their company, and others may only have access to whatever happens to be open access. On top of that, access for paywall journals often depends on your [IP address](https://en.wikipedia.org/wiki/IP_address) - something not generally on top of mind for most people.

Another hardship with text-mining is the huge number of publishers together with no standardized way to figure out the URL for full text versions of a scholarly work. There is the DOI (Digital Object Identifier) system used by Crossref, Datacite and others, but those generally help you sort out the location of the scholarly work on a web page - the html version. What one probably wants for text-mining is the PDF or XML version if available. Publishers can optionally choose to include URLs for full text (PDF and/or XML) with Crossref's metadata (e.g., see this [Crossref API call](http://api.crossref.org/works?filter=has-full-text:true&rows=3) and search for "link" on the page), but the problem is that it's **optional**. 

**`fulltext` is a package to help R users address the above problems, and get published literature from the web in it's many forms, and across all publishers.**

<br><br>

## the fulltext package

`fulltext` tries to make the following use cases as easy as possible:

* Search for articles
* Fetch abstracts
* Fetch full text articles 
* Get links for full text articles (xml, pdf)
* Extract text from articles
* Collect sections of articles that you actually need (e.g., titles)
* Download supplementary materials

`fulltext` organizes functions around the above use cases, then provides flexiblity to query many data sources within that use case (i.e. function). For example `fulltext::ft_search` searches for articles - you can choose among one or more of many data sources to search, passing options to each source as needed.

<br>

## What does a workflow with fulltext look like?

- Search for articles with `ft_search()`
- Fetch articles with `ft_get()` using the output of the previous step
- Collect the text into an object with `ft_collect()`
- Extract sections of articles needed with `ft_chunks()`, or 
- Combine texts into a data.frame ready for `quanteda` or similar text-mining packages 

<br>

## Package overhaul

`fulltext` has undergone a re-organization, which includes a bump in the major version to `v1` to reinforce the large changes the package has undergone. Changes include:

- Function name standardization with the `ft_` prefix. e,g, `chunks` is now `ft_chunks`
- `ft_get` has undergone major re-organization - biggest of which may be that all full text XML/plain text/PDF goes to disk to simplify the user interface. Along with this we've changed to using DOIs/IDs as the file names
- We no longer store files as rds - but as the format they are, pdf, txt or xml
- `storr` is now imported to manage mapping between real DOIs and file paths that include normalized DOIs - and aids in the function `ft_table()` for creating a data.frame of text results
- Note that with the `ft_get()` overhaul, the only option is to write to disk. Before we attempted to provide many different options for saving XML and PDF data, but it was too complicated. This has implications for using the output of `ft_get()` - the output includes the paths to the files - use `ft_collect()`  to collect the text if you want to use `ft_chunks()` or other `fulltext` functions downstream.
- A number of functions have been removed to further hone the scope of the package
- A function `ft_abstract` is introduced to fetch abstracts for when you just need abstracts
- A function `ft_table` has been introduced to gather all your documents into a data.frame to make it easy to do downstream analyses with other packages 
- Two new data sources have been added: Scopus and Microsoft Academic - both of which are available via `ft_search()` and `ft_abstract()`
- New functions have been added for the user to find out what plugins are available: `ft_get_ls()`, `ft_links_ls()`, and `ft_search_ls()`

We've battle tested `ft_get()` on a lot of DOIs - but there still may be errors - let us know if you have any problems.

<br>

## Documentation

Along with an overhual of the package we have made a new manual for `fulltext`. Check it out at <https://ropensci.github.io/fulltext-book/>

<br><br>

## Setup

Install `fulltext`

> at the time of writing binaries are not yet available on CRAN, so you'll have to install from source from CRAN (which shouldn't provide any problems since there's no compiled code in the package), or install from GitHub


```r
install.packages("fulltext")
```

Or get the development version:


```r
devtools::install_github("ropensci/fulltext")
```


```r
library(fulltext)
```

Below I'll discuss some of the new features of the package, and not do an exhaustive tutorial to the package. Check out the manual for more details: <https://ropensci.github.io/fulltext-book/>

<br>

## Fetch abstracts: ft_abstract

`ft_abstract()` is a new function in `fulltext`. It gives you access to absracts from the following data sources:

 - crossref
 - microsoft
 - plos
 - scopus

A quick example. Search for articles in PLOS.


```r
res <- ft_search(query = 'biology', from = 'plos', limit = 10, 
   plosopts = list(fq = list('doc_type:full', '-article_type:correction',
                  '-article_type:viewpoints')))
```

Now pass the DOIs to `ft_abstract()` to get abstracts:


```r
ft_abstract(x = res$plos$data$id, from = "plos")
```

```
## <fulltext abstracts>
## Found:
##   [PLOS: 90; Scopus: 0; Microsoft: 0; Crossref: 0]
```

<br>

## Fetch articles: ft_get

The function `ft_get` is the workhorse for getting full text articles.

Using this function can be tricky depending on where you want to 
get articles from. While searching (`ft_search`) usually doesn't present any 
barriers or stumbling blocks because search portals are generally open 
(except Web Of Science), `ft_get` can get frustrating because so many 
publishers paywall their articles. The combination of paywalls and their 
patchwork of who gets to get through them means that we can't easily predict 
who will run into problems with Elsevier, Wiley, Springer, etc. (well, mostly 
those big three because they publish such a large portion of the papers).

With this version we've tried to bulk up the documentation as much as possible 
(see [the manual][manual]) to make jumping over these barriers as painless as
possible.

Let's do an example to demonstrate how to use `ft_get()` and some of the new 
features.

Get DOIs from PLOS (excluding partial document types)


```r
library("rplos")
dois <- searchplos(q="*:*", fl='id',
   fq=list('doc_type:full',"article_type:\"research article\""),
     limit=5)$data$id
```

Once we have DOIs we can go to `ft_get()`:


```r
res <- ft_get(dois, from = "plos")
```

Internally, `ft_get()` attemps to write the file to disk if we can successfully 
access the file - if an error occurs for any reason (see [ft_get errors](https://ropensci.github.io/fulltext-book/fetch.html#fetch-errors) in the manual) we delete that file so you 
don't end up with partial/empty files. 

Since `ft_get()` writes files to your machine's disk, even if a function call 
to `ft_get()` fails at some point in the process, the articles that we've 
successfully retrieved aren't affected. 

In addition, we have fixed reusing cached files on disk. Thus, even if you get a failure
in a call to `ft_get()` you can rerun it again and those files already retrieved will 
make the function call faster. 

Having a look at the output of `ft_get()`, we can see that only 
one list element (`plos`) has data in it because we only searched for articles 
from one publisher. 


```r
vapply(res, function(x) is.null(x$data), logical(1))
```

```
##     plos   entrez    elife  pensoft    arxiv  biorxiv elsevier    wiley 
##    FALSE     TRUE     TRUE     TRUE     TRUE     TRUE     TRUE     TRUE
```

The output for elements searched for are the following in a list:

- found: number of works retrieved
- dois: character vector of DOIs
- data (a list)
  - backend: the backend
  - cache_path: the root cache path
  - path
      - DOI (a list named by a DOI is repeated for each DOI)
          - path: the complete path to the file on disk
          - id: the id (usually a DOI)
          - type: xml, plain or pdf
          - error: an error message, if any
  - data: this is NULL until you use `ft_collect()`
- opts: your options

The `backend` can only be one value - `ext`, representing `file extension`. 
We're retaining that information for now because we may decide to add 
additional backends in the future.

In the last version of `fulltext` you could get the extracted text from 
XML or PDF in the output of `ft_get()`. This is changed. You now only 
get metadata and the path to the file on disk. To get text into the object
is a separate function call to `ft_collect()`


```r
ft_collect(res)
```

Which returns the same class object as `ft_get()` returns, but the `data`
slot is now populated with the text. 

Remember that wit this change you now should use `ft_collect()` before passing
the output of `ft_get()` to `ft_chunks()`


```r
ft_get(dois, from = "plos") %>% 
  ft_collect() %>% 
  ft_chunks(c("doi","history")) %>% 
  ft_tabularize()
```

<br>

## Extract text: ft_extract

`ft_extract()` used to have options for extracting text from PDF's with different pieces of software. To simplify the function it only uses the [pdftools][] package.


```r
path <- system.file("examples", "example1.pdf", package = "fulltext")
ft_extract(path)
```

```
## <document>/Library/Frameworks/R.framework/Versions/3.4/Resources/library/fulltext/examples/example1.pdf
##   Title: Suffering and mental health among older people living in nursing homes---a mixed-methods study
##   Producer: pdfTeX-1.40.10
##   Creation date: 2015-07-17
```

<br><br>

## Gather text into a data.frame: ft_table

`ft_table()` is a new function to gather the text from all your 
articles into a data.frame. This should simplify analysis for most users.


```r
(x <- ft_table())
```

```
## # A tibble: 192 x 4
##    dois                       ids_norm                   text        paths
##  * <chr>                      <chr>                      <chr>       <chr>
##  1 10.1002/9783527696109.ch41 10_1002_9783527696109_ch41 "         … /Use…
##  2 10.1002/chin.199038056     10_1002_chin_199038056     "ChemInfor… /Use…
##  3 10.1002/cite.330221605     10_1002_cite_330221605     " Versamml… /Use…
##  4 10.1002/dvg.22402          10_1002_dvg_22402          "C 2013 Wi… /Use…
##  5 10.1002/jctb.5010090209    10_1002_jctb_5010090209    "         … /Use…
##  6 10.1002/qua.560200801      10_1002_qua_560200801      "Internati… /Use…
##  7 10.1002/risk.200590063     10_1002_risk_200590063     "         … /Use…
##  8 10.1002/scin.5591692420    10_1002_scin_5591692420    "Books\n  … /Use…
##  9 10.1006/bbrc.1994.2001     10_1006_bbrc_1994_2001     "http://ap… /Use…
## 10 10.1007/11946465_42        10_1007_11946465_42        " Hoon Cho… /Use…
## # ... with 182 more rows
```

(you can optionally only extract text from PDFs, or only from XMLs)

We give the the DOI, the normalized DOI that we used for the file path, 
the text, and the file path. You can then use this output in [quanteda][]
or other text-mining packages (the function `quanteda::kwic()` is for locating
keywords in context):


```r
library(quanteda)
z <- corpus(x, docid_field="dois", text_field="text")
head(quanteda::kwic(z, "cell"))
```

```
##                                                                           
##   [10.1002/9783527696109.ch41, 253] Basic Concepts A lithium-ion battery |
##   [10.1002/9783527696109.ch41, 397]     in a typical lithium-ion battery |
##   [10.1002/9783527696109.ch41, 461]     in a typical lithium-ion battery |
##   [10.1002/9783527696109.ch41, 764]        material 1 Lithium LCO LiCoO2 |
##  [10.1002/9783527696109.ch41, 2744]               of about 3.6-3.8 V per |
##  [10.1002/9783527696109.ch41, 6237]                 nate/ anode and hour |
##                                          
##  cell | consists of a positive electrode 
##  cell | . material. During discharging   
##  cell | . The main reactions occurring   
##  Cell | phones, High capacity cobalt     
##  cell | and highest energy densities with
##  cell | cathode 4. Electrovaya,
```

<br><br>

## Todo

We have lots of ideas to make `fulltext` even better. Check out what we'll be working on in the [issue tracker](https://github.com/ropensci/fulltext/issues).

<br><br>

### Feedback!

Please do upgrade/install `fulltext`  `v1.0.0` and let us know what you think.

<br>

[fulltext]: https://github.com/ropensci/fulltext
[pdftools]: https://github.com/ropensci/pdftools
[manual]: https://ropensci.github.io/fulltext-book/
[quanteda]: https://cran.rstudio.com/web/packages/quanteda/
