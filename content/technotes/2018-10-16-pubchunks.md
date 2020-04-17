---
slug: pubchunks
title: 'pubchunks: extract parts of scholarly XML articles'
date: '2018-10-16'
author:
  - Scott Chamberlain
topicid: 1415
tags:
  - R
  - literature
  - XML
  - parsing
  - pubchunks
  - fulltext
---



[pubchunks][] is a package grown out of the [fulltext][] package. `fulltext`
provides a single interface to many sources of full text scholarly articles. As
part of the user flow in `fulltext` there is an extraction step where `fulltext::chunks()`
pulls parts of articles out of XML format article files. 

As part of making `fulltext` more maintainable and focused on simply fetching articles, 
and realizing that pulling out bits of structured XML files is a more general problem, 
we broke out `pubchunks` into a separate package. `fulltext::ft_chunks()` and 
`fulltext::ft_tabularize()`  will eventually be removed and we'll point users to 
`pubchunks`. 

The goal of `pubchunks` is to fetch sections out of XML format scholarly articles. 
Users do not need to know about XML and all of its warts. They only need to know 
where their files or XML strings are and what sections they want of 
each article. Then the user can combine these sections and do whatever they wish 
downstream; for example, analysis of the text structure or a meta-analysis combining
p-values or other data. 

The other major format, and more common format, that articles come in is PDF. However,
PDF has no structure other than perhaps separate pages, so it's not really possible
to easily extract specific sections of an article. Some publishers provide absolutely
no XML versions (cough, Wiley) while others that do a good job of this are almost 
entirely paywalled (cough, Elsevier). There are some open access publishers that 
do provide XML (PLOS, Pensoft, Hindawi) - so you have the best of both worlds with 
those publishers.

`pubchunks` is still in early days of development, so we'd love any feedback. 

* pubchunks on GitHub: <https://github.com/ropensci/pubchunks>
* pubchunks on CRAN: <https://cran.rstudio.com/web/packages/pubchunks/>

## Functions in pubchunks

All exported functions are prefixed with `pub` to help reduce namespace conflicts.

The two main functions are:

* `pub_chunks()`: fetch XML sections
* `pub_tabularize()`: coerce output of `pub_chunks()` into data.frame's

Other functions that you may run in to:

* `pub_guess_publisher()`: guess publisher from XML file or character string
* `pub_sections()`: sections `pubchunks` knows how to handle
* `pub_providers()`: providers (i.e., publishers) `pubchunks` knows how to handle explicitly



## How it works

When using `pub_chunks()` we first figure out what publisher the XML comes from. We do this
beacause journals from the same publisher often/usually follow the same format/structure, so 
we can be relatively confident of rules for pulling out certain sections. 

Once we have the publisher, we go through each section of the article the user reqeusts, and
use the publisher specific [XPATH](https://en.wikipedia.org/wiki/XPath) (an XML query language) 
that we've written to extract that section from the XML. 

The ouput is a named list, where names are the sections; and the output is an S3 class with 
a print method to make it more easily digestable. 



## Installation

The first version of the package has just hit CRAN, so not all binaries are available as of this
date.


```r
install.packages("pubchunks")
```

You may have to install the dev version


```r
remotes::install_github("ropensci/pubchunks")
```

After sending to CRAN a few days back I noticed a number of things that needed fixing/improving,
so you can also try out those fixes: 


```r
remotes::install_github("ropensci/pubchunks@fix-pub_chunks")
```

Load the package


```r
library(pubchunks)
```



## Pub chunks

`pub_chunks` accepts a file path, XML as character string, `xml_document` object, or a list of 
those three things.

We currently support the following publishers, though not all sections below are allowed 
in every publisher:

* elife
* plos
* elsevier
* hindawi
* pensoft
* peerj
* copernicus
* frontiers
* f1000research

We currently support the following sections, not all of which are supported, or make sense, for 
each publisher:

* front - Publisher, journal and article metadata elements
* body - Body of the article
* back - Back of the article, acknowledgments, author contributions, references
* title - Article title
* doi - Article DOI
* categories - Publisher's categories, if any
* authors - Authors
* aff - Affiliation (includes author names)
* keywords - Keywords
* abstract - Article abstract
* executive_summary - Article executive summary
* refs - References
* refs_dois - References DOIs - if available
* publisher - Publisher name
* journal_meta - Journal metadata
* article_meta - Article metadata
* acknowledgments - Acknowledgments
* permissions - Article permissions
* history - Dates, recieved, published, accepted, etc.

Get an example XML file from the package


```r
x <- system.file("examples/pensoft_1.xml", package = "pubchunks")
```

Pass to `pub_chunks` and state which section(s) you want


```r
pub_chunks(x, sections = "abstract")
#> <pub chunks>
#>   from: character
#>   sections: abstract
#>    abstract (n=1): AbstractNineteen species of seed-beetles belonging ...
pub_chunks(x, sections = "aff")
#> <pub chunks>
#>   from: character
#>   sections: aff
#>    aff (n=7): nested list
pub_chunks(x, sections = "title")
#> <pub chunks>
#>   from: character
#>   sections: title
#>    title (n=1): Contribution to the knowledge of seed-beetles (Col ...
pub_chunks(x, sections = c("abstract", "title", "authors", "refs"))
#> <pub chunks>
#>   from: character
#>   sections: abstract, title, authors, refs
#>    abstract (n=1): AbstractNineteen species of seed-beetles belonging ...
#>    title (n=1): Contribution to the knowledge of seed-beetles (Col ...
#>    authors (n=7): nested list
#>    refs (n=13): AntonKW (2010) Catalogue of Palaearctic Coleoptera
```

You can also pass in a character string of XML, e.g.,


```r
xml_str <- paste0(readLines(x), collapse = "\n")
class(xml_str)
#> [1] "character"
pub_chunks(xml_str, sections = "title")
#> <pub chunks>
#>   from: character
#>   sections: title
#>    title (n=1): Contribution to the knowledge of seed-beetles (Col ...
```

Or an `xml_document` object from `xml2::read_xml`


```r
xml_doc <- xml2::read_xml(x)
class(xml_doc)
#> [1] "xml_document" "xml_node"
pub_chunks(xml_doc, sections = "title")
#> <pub chunks>
#>   from: xml_document
#>   sections: title
#>    title (n=1): Contribution to the knowledge of seed-beetles (Col ...
```

Or pass in a list of the above objects, e.g., here a list of file paths



```r
pensoft_xml <- system.file("examples/pensoft_1.xml", package = "pubchunks")
peerj_xml <- system.file("examples/peerj_1.xml", package = "pubchunks")
copernicus_xml <- system.file("examples/copernicus_1.xml", package = "pubchunks")
frontiers_xml <- system.file("examples/frontiers_1.xml", package = "pubchunks")
pub_chunks(
  list(pensoft_xml, peerj_xml, copernicus_xml, frontiers_xml),
  sections = c("abstract", "title", "authors", "refs")
)
#> [[1]]
#> <pub chunks>
#>   from: character
#>   sections: abstract, title, authors, refs
#>    abstract (n=1): AbstractNineteen species of seed-beetles belonging ...
#>    title (n=1): Contribution to the knowledge of seed-beetles (Col ...
#>    authors (n=7): nested list
#>    refs (n=13): AntonKW (2010) Catalogue of Palaearctic Coleoptera
#> 
#> [[2]]
#> <pub chunks>
#>   from: character
#>   sections: abstract, title, authors, refs
#>    abstract (n=1): Climate change is predicted to lead to more extrem ...
#>    title (n=1): Storm effects on intertidal invertebrates: increas ...
#>    authors (n=7): nested list
#>    refs (n=60): Alcántara-Carrió et al. (2017)Alcántara-CarrióJSas
#> 
#> [[3]]
#> <pub chunks>
#>   from: character
#>   sections: abstract, title, authors, refs
#>    abstract (n=1): Soil temperatures at various depths are unique par ...
#>    title (n=1): Quality control of 10-min soil temperatures data a ...
#>    authors (n=3): nested list
#>    refs (n=9): 1Bertrand, C., Gonzalez Sotelino, L., and Journée,
#> 
#> [[4]]
#> <pub chunks>
#>   from: character
#>   sections: abstract, title, authors, refs
#>    abstract (n=1): Our current understanding of Antarctic soils is de ...
#>    title (n=1): Metagenomic Analysis of a Southern Maritime Antarc ...
#>    authors (n=8): nested list
#>    refs (n=56): AislabieJ.BroadyP.SaulD. (2006). Culturable hetero
#> 
#> attr(,"ft_data")
#> [1] FALSE
```

Last, since we broke `pubchunks` out of `fulltext` package we support `fulltext`
here as well. 


```r
library("fulltext")
dois <- c('10.1371/journal.pone.0086169', '10.1371/journal.pone.0155491', 
  '10.7554/eLife.03032')
x <- fulltext::ft_get(dois)
pub_chunks(fulltext::ft_collect(x), sections="authors")
#> $plos
#> $plos$`10.1371/journal.pone.0086169`
#> <pub chunks>
#>   from: xml_document
#>   sections: authors
#>    authors (n=4): nested list
#> 
#> $plos$`10.1371/journal.pone.0155491`
#> <pub chunks>
#>   from: xml_document
#>   sections: authors
#>    authors (n=9): nested list
#> 
#> 
#> $elife
#> $elife$`10.7554/eLife.03032`
#> <pub chunks>
#>   from: xml_document
#>   sections: authors
#>    authors (n=6): nested list
#> 
#> 
#> attr(,"ft_data")
#> [1] TRUE
```



## Tabularize

It's great to pull out the sections you want, but most people will likely want to 
work with data.frame's instead of lists. `pub_tabularize` is the answer:


```r
x <- system.file("examples/elife_1.xml", package = "pubchunks")
res <- pub_chunks(x, c("doi", "title", "keywords"))
pub_tabularize(res)
#>                   doi                                          title
#> 1 10.7554/eLife.03032 MicroRNA-mediated repression of nonsense mRNAs
#> 2 10.7554/eLife.03032 MicroRNA-mediated repression of nonsense mRNAs
#> 3 10.7554/eLife.03032 MicroRNA-mediated repression of nonsense mRNAs
#> 4 10.7554/eLife.03032 MicroRNA-mediated repression of nonsense mRNAs
#> 5 10.7554/eLife.03032 MicroRNA-mediated repression of nonsense mRNAs
#> 6 10.7554/eLife.03032 MicroRNA-mediated repression of nonsense mRNAs
#>                       keywords .publisher
#> 1                     microRNA      elife
#> 2            nonsense mutation      elife
#> 3 nonsense-mediated mRNA decay      elife
#> 4                          APC      elife
#> 5             intron retention      elife
#> 6  premature termination codon      elife
```

It handles many inputs as well:


```r
out <- pub_chunks(
  list(pensoft_xml, peerj_xml, copernicus_xml, frontiers_xml),
  sections = c("doi", "title", "keywords")
)
pub_tabularize(out)
#> [[1]]
#>                                                                                                     title
#> 1 Contribution to the knowledge of seed-beetles (Coleoptera, Chrysomelidae, Bruchinae) in Xinjiang, China
#>   .publisher
#> 1    pensoft
#> 
#> [[2]]
#>                                                                                                title
#> 1 Storm effects on intertidal invertebrates: increased beta diversity of few individuals and species
#>   .publisher
#> 1      peerj
#> 
#> [[3]]
#>                      doi
#> 1 10.5194/asr-12-23-2015
#>                                                     title .publisher
#> 1 Quality control of 10-min soil temperatures data at RMI copernicus
#> 
#> [[4]]
#>                        doi
#> 1 10.3389/fmicb.2012.00403
#>                                                        title .publisher
#> 1 Metagenomic Analysis of a Southern Maritime Antarctic Soil  frontiers
```

The output of `pub_tabularize` is a list of data.frame's. You can easily combine the output
with e.g. `rbind` or `data.table::rbindlist` or `dplyr::bind_rows`. Here's an example with 
`data.table::rbindlist`:


```r
data.table::rbindlist(pub_tabularize(out), fill = TRUE)
#>                                                                                                      title
#> 1: Contribution to the knowledge of seed-beetles (Coleoptera, Chrysomelidae, Bruchinae) in Xinjiang, China
#> 2:      Storm effects on intertidal invertebrates: increased beta diversity of few individuals and species
#> 3:                                                 Quality control of 10-min soil temperatures data at RMI
#> 4:                                              Metagenomic Analysis of a Southern Maritime Antarctic Soil
#>    .publisher                      doi
#> 1:    pensoft                     <NA>
#> 2:      peerj                     <NA>
#> 3: copernicus   10.5194/asr-12-23-2015
#> 4:  frontiers 10.3389/fmicb.2012.00403
```




## TO DO

We'll be adding support for more publishers (including right now working on Pubmed XML format
articles), more article sections, making sure default section extraction is smart as possible, 
and more.

Of course, if you know XPATH and don't mind doing it, you can do what this package does yourself. 
However, you will have to write different XPATH for different publishers/journals, so leveraging 
this approach still may save some time.  


[pubchunks]: https://github.com/ropensci/pubchunks
[fulltext]: https://github.com/ropensci/fulltext
