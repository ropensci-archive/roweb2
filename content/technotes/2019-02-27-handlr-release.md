---
slug: "handlr-release"
title: "handlr: convert among citation formats"
date: 2019-02-27
author:
  - Scott Chamberlain
topicid: 1598
tags:
- R
- citation
- bibtex
- handlr
- codemeta
---



Citations are a crucial piece of scholarly work. They hold metadata on each scholarly work, including what people were involved, what year the work was published, where it was published, and more. The links between citations facilitate insight into many questions about scholarly work.

Citations come in [many different formats](https://github.com/datacite/bolognese#features) including BibTex, RIS, JATS, and many more. This is not to be confused with [citation styles](https://citationstyles.org/) such as APA vs. MLA and so on.

Those that deal with or do research on citations often get citations in one format (e.g., BibTex), but they would like them in a different format (e.g., RIS). One recent tool that does a very nice job of this is [bolognese](https://github.com/datacite/bolognese) from [Martin Fenner](https://github.com/mfenner) of [Datacite](https://datacite.org/). `bolognese` is written in [Ruby](https://www.ruby-lang.org/en/). I love the Ruby language, but it does not play nicely with R; thus it wasn't an option to wrap or call `bolognese` from R.

`handlr` is a new R package modeled after `bolognese`. 

The original motivation for starting handlr comes from [this thread](https://github.com/ropensci/rorcid/issues/51) in the [rorcid][] package, in which the citations retrieved from source A had mangled characters with accents, but source B gave un-mangled characters but in the wrong format. Thus the need for a citation format converter.

handlr converts citations from one format to another. It currently supports reading the following formats:

- [citeproc][]
- [ris][]
- [bibtex][]
- [codemeta][]

And the following writers are supported:

- [citeproc][]
- [ris][]
- [bibtex][]
- [schema.org][]
- [rdfxml][] (requires suggested package [jsonld][])
- [codemeta][]

`handlr` has not yet focused on performance, but we will do so in future versions.



Links:

* handlr source code: <https://github.com/ropensci/handlr>
* handlr on CRAN: <https://cran.rstudio.com/web/packages/handlr/>




## Installation

Install the lastest from CRAN


```r
install.packages("handlr")
```

Some binaries are not up yet on CRAN - you can also install from GitHub.
There's no compiled code though, so source install should work.
I somehow forgot to export the `print.handl()` function in the CRAN version, so 
if you try this with the CRAN version you won't get the compact output seen below.


```r
remotes::install_github("ropensci/handlr")
```

Load `handlr`


```r
library(handlr)
```



## The R6 approach

There's a single R6 interface to all readers and writers

grab an example file that comes with the package


```r
z <- system.file("extdata/citeproc.json", package = "handlr")
```

initialize the object


```r
x <- HandlrClient$new(x = z)
x
#> <handlr> 
#>   doi: 
#>   ext: json
#>   format (guessed): citeproc
#>   path: /Library/Frameworks/R.framework/Versions/3.5/Resources/library/handlr/extdata/citeproc.json
#>   string (abbrev.): none
```

read the file


```r
x$read(format = "citeproc")
x
#> <handlr> 
#>   doi: 
#>   ext: json
#>   format (guessed): citeproc
#>   path: /Library/Frameworks/R.framework/Versions/3.5/Resources/library/handlr/extdata/citeproc.json
#>   string (abbrev.): none
```

inspect the parsed content


```r
x$parsed
#> <handl> 
#>   from: citeproc
#>   many: FALSE
#>   count: 1
#>   first 10 
#>     id/doi: https://doi.org/10.5438/4k3m-nyvg
```

write out to bibtex. by default does not write to a file; you can 
also specify a file path.


```r
cat(x$write("bibtex"), sep = "\n")
#> @article{https://doi.org/10.5438/4k3m-nyvg,
#>   doi = {10.5438/4k3m-nyvg},
#>   author = {Martin Fenner},
#>   title = {Eating your own Dog Food},
#>   journal = {DataCite Blog},
#>   pages = {},
#>   publisher = {DataCite},
#>   year = {2016},
#> }
```

## Function approach

If you prefer not to use the above approach, you can use the various
functions that start with he format (e.g., `bibtex`) followed by 
`_reader` or `_writer`.

Here, we play with the bibtex format. 

Get a sample file and use `bibtex_reader()` to read it in.


```r
z <- system.file('extdata/bibtex.bib', package = "handlr")
bibtex_reader(x = z)
#> <handl> 
#>   from: bibtex
#>   many: FALSE
#>   count: 1
#>   first 10 
#>     id/doi: https://doi.org/10.1142%2fs1363919602000495
```

What this returns is a `handl` object, just a list with attributes.
The `handl` object is what we use as the internal representation that we 
convert citations to and from.

Each reader and writer supports handling many citations at once. For all
formats, this means many citations in the same file. 


```r
z <- system.file('extdata/bib-many.bib', package = "handlr")
bibtex_reader(x = z)
#> <handl> 
#>   from: bibtex
#>   many: TRUE
#>   count: 2
#>   first 10 
#>     id/doi: https://doi.org/10.1093%2fbiosci%2fbiw022
#>     id/doi: https://doi.org/10.1890%2f15-1397.1
```



## To do

- There's still definitely some improvements that need to be made to various parts of citations in some of the formats. Do open an issue/let me know if you find anything off. 
- Performance could be improved for sure
- Problems with very large files, e.g., [ropensci/handlr#9](https://github.com/ropensci/handlr/issues/9)
- Documentation, there is very little thus far



## Get in touch

Get in touch if you have any `handlr` questions in the 
[issue tracker](https://github.com/ropensci/handlr/issues) or the 
[rOpenSci discussion forum](https://discuss.ropensci.org/).


[handlr]: https://github.com/ropensci/handlr
[jsonld]: https://github.com/ropensci/jsonld/
[codemeta]: https://codemeta.github.io/
[citeproc]: https://en.wikipedia.org/wiki/CiteProc
[ris]: https://en.wikipedia.org/wiki/RIS_(file_format)
[bibtex]: http://www.bibtex.org/
[schema.org]: https://schema.org/
[rdfxml]: https://en.wikipedia.org/wiki/RDF/XML
[rorcid]: https://github.com/ropensci/rorcid
