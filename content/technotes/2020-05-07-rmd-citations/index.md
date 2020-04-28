---
title: A Roundup of R Tools for Handling BibTeX
author:
  - Maëlle Salmon
date: '2020-05-07'
slug: rmd-citations
categories: []
tags:
  - citations
  - RMarkdown
  - BibTeX
  - RefManageR
  - citr
  - knitcitations
  - bib2df
  - handlr
description: Some tips around the use of citations/references in R Markdown, in particular with RefManageR
output:
  html_document:
    keep_md: yes
---



Our website is based on Markdown content rendered with Hugo.
Markdown content is in some cases knit from R Markdown, but with [less functionality than if one rendered R Markdown to html as in the blogdown default](https://bookdown.org/yihui/blogdown/output-format.html).
In particular, we cannot use the usual BibTex + CSL + Pandoc-citeproc [dance](https://github.com/rstudio/distill/issues/45) to handle a bibliography.
Thankfully, using the rOpenSci package RefManageR, we can still make our own bibliography from a BibTeX file without formatting references by hand.
In this post we shall present our custom workflow for inserting citations, as well as more mainstream tools.

### Usual citation workflow in Rmd

To repeat information presented in [Nicholas Tierney's excellent online book "R Markdown for Scientists"](https://rmd4sci.njtierney.com/citing-articles-bibliography-styles.html), to get a bibliography we have to perform several steps. We must...

* reference a bibliography style in the document YAML metadata, with entries such as the one below for R,

```bibtex
  @Manual{my-citation-key-for-r,
    title = {R: A Language and Environment for Statistical Computing},
    author = {{R Core Team}},
    organization = {R Foundation for Statistical Computing},
    address = {Vienna, Austria},
    year = {2020},
    url = {https://www.R-project.org/},
  }
```

* insert citations using their key, e.g. `@my-citation-key-for-r` for the entry above,

* and, optionally, use CSL to control the look of the references list; and a bookdown output format to have the bibliography placed somewhere else than the end.

#### Handy R packages for references: citr and knitcitations

Some R tools out there simplify part of the workflow:

* [citr](https://github.com/crsh/citr) by [Frederik Aust](https://github.com/crsh) provides an RStudio add-in to search for references in a .bib file, inserting the key in the document (mimicking tools you could find in Microsoft Word);

* [knitcitations](https://github.com/cboettig/knitcitations) by [Carl Boettiger](/author/carl-boettiger) allows you to not only use the keys, but also DOIs and URLs to cite a paper. E.g. `citet("10.1098/rspb.2013.1372")` will create a citation to `@Boettiger_2013` after querying the web; and `write.bibtex(file = "references.bib")` will allow you to cache entries in a bibliography file.

Both these packages import [RefManageR](https://docs.ropensci.org/RefManageR/) by [Mathew W. McLean](http://mwmclean.github.io/), a package that _provides tools for importing and working with bibliographic references_, and that has been [peer-reviewed by rOpenSci](https://github.com/ropensci/software-review/issues/119).

### Citation workflow without Pandoc, with RefManageR

Now, for generating Markdown content like this post source, one cannot use the tools presented earlier.
In our blog guide, we explain that citations are footnotes [whose text is APA formatted](https://blogguide.ropensci.org/technical.html#addcitation) and we explain how to [find that citation text for a package or article](https://blogguide.ropensci.org/technical.html#how-to-find-citation-text-for-a-package-or-article).
In most cases, authors are only citing a few references, so that is fine.
However, sometimes authors would like to use an existing .bib file, that they might have e.g. exported from [Zotero](https://www.zotero.org/).

Thankfully, using RefManageR, we can provide a workflow for adding citations from a bib file, by creating functions similar to knitcitations' functions.

In the following examples, we'll use the .bib file below,

```bibtex
@Manual{my-citation-key-for-r,
  title = {R: A Language and Environment for Statistical Computing},
  author = {{R Core Team}},
  organization = {R Foundation for Statistical Computing},
  address = {Vienna, Austria},
  year = {2020},
  url = {https://www.R-project.org/},
}

@Article{refmanager,
    author = {Mathew William McLean},
    title = {RefManageR: Import and Manage BibTeX and BibLaTeX References in R},
    journal = {The Journal of Open Source Software},
    year = {2017},
    doi = {10.21105/joss.00338},
  }
  
@Manual{jqr,
    title = {jqr: Client for 'jq', a 'JSON' Processor},
    author = {Rich FitzJohn and Jeroen Ooms and Scott Chamberlain and {Stefan Milton Bache}},
    year = {2018},
    note = {R package version 1.1.0},
    url = {https://CRAN.R-project.org/package=jqr},
  }

```

#### Create a bibliography object

We'll start by creating a `BibEntry` object by calling `RefManageR::ReadBib()`: 

```r 
mybib <- RefManageR::ReadBib("refs.bib", check = FALSE) 
mybib
```

```
[1] R. FitzJohn, J. Ooms, S. Chamberlain, et al. _jqr: Client for 'jq',
a 'JSON' Processor_. R package version 1.1.0. 2018. <URL:
https://CRAN.R-project.org/package=jqr>.

[2] M. W. McLean. "RefManageR: Import and Manage BibTeX and BibLaTeX
References in R". In: _The Journal of Open Source Software_ (2017).
DOI: 10.21105/joss.00338.

[3] R Core Team. _R: A Language and Environment for Statistical
Computing_. R Foundation for Statistical Computing. Vienna, Austria,
2020. <URL: https://www.R-project.org/>.
```

```r 
class(mybib)
```

```
[1] "BibEntry" "bibentry"
```

#### Create and use a cite function

Then in another R code chunk, we'll create a function which writes the citations in the format we want. Our citation format is a footnote: `[^key]`.

```r 
cite <- function(key, bib = mybib) {
  # create a silent reference so RefManageR
  # knows we've used this entry
  RefManageR::NoCite(bib, key)
  # create the string we need in the Markdown document
  paste0("[^", key, "]")
}
```

From the three entries in the BibTeX file, let us cite two of them:

"what a nice package&#96;r cite("refmanager")&#96; built on top of R&#96;r cite("my-citation-key-for-r")&#96;"

when rendered becomes: 

"what a nice package[^refmanager] built on top of R[^my-citation-key-for-r]".


#### Print the references list

Finally, for the bibliography to appear, we need to add a call to `RefManageR::PrintBibliography()`, after defining our own bibstyle. 
This way, each entry will appear in the Markdown file as

```
[^mykey]: <APA string>
```

To get the first part (`[^mykey]`), we use the `fmtPrefix` of `tools::bibstyle()`.
To get the second part (`<APA string>`), we read through some [R source code](https://github.com/wch/r-source/blob/28f8367a5514cc0d014cf2aa9e7ce909cd2050af/src/library/tools/R/bibstyle.R), in which we found how to create a function that correctly adds DOIs and URLs.
Note that in our case the order of appearance of entries within the references list in the Markdown file is not important at all, since the Hugo Markdown handler, Goldmark, will reorder them based on order of appearance in the text.

To produce the bibliography, we combined everything together in an R code chunk. For example, the chunk below was used at the very end of the R Markdown file producing this post.
It came before the definition of another, non-citation, footnote.[^footnote]

````markdown
```{r bib, echo = FALSE, results = "asis"} 
get_doi <- function(paper) {
  if (is.null(paper$doi)) {
    ""
  } else{
    paste0(" , https://doi.org/", paper$doi)
  }
}
apa_style <- tools::bibstyle("apa", sortKeys = function(refs) seq_along(refs),
    fmtPrefix = function(paper) paste0("[^", attr(paper,"key"), "]:"),
    extraInfo = function(paper) paste0(paper$url, get_doi(paper)),
    .init = TRUE)
RefManageR::PrintBibliography(mybib, .opts = list(bib.style = "apa", sorting = ""))
```
````

This produces the following in markdown, which is then used by Hugo to produce the citations for this post.


```
[^refmanager]: McLean MW (2017). "RefManageR: Import and Manage BibTeX
and BibLaTeX References in R." _The Journal of Open Source Software_.
, https://doi.org/10.21105/joss.00338.

[^my-citation-key-for-r]: R Core Team (2020). _R: A Language and
Environment for Statistical Computing_. R Foundation for Statistical
Computing, Vienna, Austria. https://www.R-project.org/.
```

#### Workflow summary

To summarize our workflow

* Instead of referencing the bibliography file in the Document metadata we create an object referring to it in an R code chunk by calling `RefManageR::ReadBib()`;

* We use a custom-made `cite()` function using `RefManageR::NoCite()` to signal the use of the reference, and string manipulation to add it in the correct format;

* We make the bibliography appear using `RefManageR::PrintBibliography` and `tools::bibstyle()` in a chunk with the `results="asis"` option. We put that chunk exactly where we want the bibliography to appear.

### Do even more with BibTeX files

The workflow presented earlier was a cool example of using RefManageR to use a BibTeX file.
There are two other packages that are worth knowing about for more .bib gymnastics: bib2df and handlr.

#### bib2df: from BibTeX to tibble

[bib2df](https://docs.ropensci.org/bib2df/) by [Philipp Ottolinger](http://www.ottlngr.de/)[^social] is a package that converts bibliography data from .bib to `tibble` and vice versa. 
Like RefManageR, it has been [peer-reviewed by rOpenSci](https://github.com/ropensci/software-review/issues/124).
In the [words of one the reviewers, Adam Sparks](https://github.com/ropensci/software-review/issues/124#issuecomment-308617830), bib2df is _"something that is simple and does one job and does it well."_.

Let's try it on our .bib file.

```r 
df <- bib2df::bib2df("refs.bib")
df
```

```
# A tibble: 3 x 28
  CATEGORY BIBTEXKEY ADDRESS ANNOTE AUTHOR BOOKTITLE CHAPTER CROSSREF EDITION
  <chr>    <chr>     <chr>   <chr>  <list> <chr>     <chr>   <chr>    <chr>  
1 MANUAL   my-citat… Vienna… <NA>   <chr … <NA>      <NA>    <NA>     <NA>   
2 ARTICLE  refmanag… <NA>    <NA>   <chr … <NA>      <NA>    <NA>     <NA>   
3 MANUAL   jqr       <NA>    <NA>   <chr … <NA>      <NA>    <NA>     <NA>   
# … with 19 more variables: EDITOR <list>, HOWPUBLISHED <chr>,
#   INSTITUTION <chr>, JOURNAL <chr>, KEY <chr>, MONTH <chr>, NOTE <chr>,
#   NUMBER <chr>, ORGANIZATION <chr>, PAGES <chr>, PUBLISHER <chr>,
#   SCHOOL <chr>, SERIES <chr>, TITLE <chr>, TYPE <chr>, VOLUME <chr>,
#   YEAR <dbl>, URL <chr>, DOI <chr>
```

```r 
bib2df::df2bib(df)
```

```
@Manual{my-citation-key-for-r,
  Address = {Vienna, Austria},
  Author = {R Core Team},
  Organization = {R Foundation for Statistical Computing},
  Title = {R: A Language and Environment for Statistical Computing},
  Year = {2020},
  Url = {https://www.R-project.org/}
}


@Article{refmanager,
  Author = {Mathew William McLean},
  Journal = {The Journal of Open Source Software},
  Title = {RefManageR: Import and Manage BibTeX and BibLaTeX References in R},
  Year = {2017},
  Doi = {10.21105/joss.00338}
}


@Manual{jqr,
  Author = {Rich FitzJohn and Jeroen Ooms and Scott Chamberlain and {Stefan Milton Bache},
  Note = {R package version 1.1.0},
  Title = {jqr: Client for 'jq', a 'JSON' Processor},
  Year = {2018},
  Url = {https://CRAN.R-project.org/package=jqr}
}
```

Note that RefManageR has a similar export function.


```r 
library("magrittr")
df2 <- "refs.bib" %>%
  RefManageR::ReadBib() %>%
  as.data.frame()
df2
```

```
                      bibtype
my-citation-key-for-r  Manual
refmanager            Article
jqr                    Manual
                                                                                  title
my-citation-key-for-r           R: A Language and Environment for Statistical Computing
refmanager            RefManageR: Import and Manage BibTeX and BibLaTeX References in R
jqr                                            jqr: Client for 'jq', a 'JSON' Processor
                                                                                             author
my-citation-key-for-r                                                                 {R Core Team}
refmanager                                                                    Mathew William McLean
jqr                   Rich FitzJohn and Jeroen Ooms and Scott Chamberlain and {Stefan Milton Bache}
                                                organization         address
my-citation-key-for-r R Foundation for Statistical Computing Vienna, Austria
refmanager                                              <NA>            <NA>
jqr                                                     <NA>            <NA>
                      year                                    url
my-citation-key-for-r 2020             https://www.R-project.org/
refmanager            2017                                   <NA>
jqr                   2018 https://CRAN.R-project.org/package=jqr
                                                  journal                 doi
my-citation-key-for-r                                <NA>                <NA>
refmanager            The Journal of Open Source Software 10.21105/joss.00338
jqr                                                  <NA>                <NA>
                                         note
my-citation-key-for-r                    <NA>
refmanager                               <NA>
jqr                   R package version 1.1.0
```

A difference in the formats is for instance the way authors are parsed.

```r 
df$AUTHOR
```

```
[[1]]
[1] "R Core Team"

[[2]]
[1] "Mathew William McLean"

[[3]]
[1] "Rich FitzJohn"        "Jeroen Ooms"          "Scott Chamberlain"   
[4] "{Stefan Milton Bache"
```

```r 
df2$author
```

```
[1] "{R Core Team}"                                                                
[2] "Mathew William McLean"                                                        
[3] "Rich FitzJohn and Jeroen Ooms and Scott Chamberlain and {Stefan Milton Bache}"
```

`bib2df` even supports separating names, using [`humaniformat`](https://github.com/ironholds/humaniformat/)

```r 
bib2df::bib2df("refs.bib", separate_names = TRUE)$AUTHOR
```

```
[[1]]
  salutation first_name middle_name last_name suffix   full_name
1       <NA>          R        Core      Team   <NA> R Core Team

[[2]]
  salutation first_name middle_name last_name suffix             full_name
1       <NA>     Mathew     William    McLean   <NA> Mathew William McLean

[[3]]
  salutation first_name middle_name   last_name suffix            full_name
1       <NA>       Rich        <NA>    FitzJohn   <NA>        Rich FitzJohn
2       <NA>     Jeroen        <NA>        Ooms   <NA>          Jeroen Ooms
3       <NA>      Scott        <NA> Chamberlain   <NA>    Scott Chamberlain
4       <NA>    {Stefan      Milton       Bache   <NA> {Stefan Milton Bache
```

bib2df helps doing fun or serious analyses of reference databases.

<!--html_preserve-->
{{< tweet 887962776806842369 >}}
<!--/html_preserve-->

#### handlr: from BibTeX to RIS, schema.org, etc.

[handlr](https://docs.ropensci.org/handlr/) by [Scott Chamberlain](/author/scott-chamberlain) is less mature but not less useful.
It's _a tool for converting among citation formats_, inspired by Ruby [bolognese library](https://github.com/datacite/bolognese).
It defines an R6 class so it has all-in-one objects, but you could also use [individual functions to read and write different formats](https://docs.ropensci.org/handlr/reference/index.html).

```r 
citation <- handlr::HandlrClient$new(x = "refs.bib")
citation
```

```
<handlr> 
  doi: 
  ext: bib
  format (guessed): bibtex
  path: refs.bib
  string (abbrev.): none
```

```r 
citation$write(format = "ris")
```

```
[1] "TY  - GEN\r\nT1  - R: A Language and Environment for Statistical Computing\r\nAU  - R Core Team\r\nUR  - https://www.R-project.org/\r\nER  - "                                                                         
[2] "TY  - JOUR\r\nT1  - RefManageR: Import and Manage BibTeX and BibLaTeX References in R\r\nAU  - McLeanMathew William\r\nDO  - 10.21105/joss.00338\r\nER  - "                                                            
[3] "TY  - GEN\r\nT1  - jqr: Client for 'jq', a 'JSON' Processor\r\nAU  - FitzJohnRich\r\nAU  - OomsJeroen\r\nAU  - ChamberlainScott\r\nAU  - Stefan Milton Bache\r\nUR  - https://CRAN.R-project.org/package=jqr\r\nER  - "
```

At the moment, there are supported readers for CiteProc, RIS, BibTeX, CodeMeta and supported writers for CiteProc, RIS, BibTeX, schema.org, RDF/XML, CodeMeta.
Quite an arsenal for your bibliography conversion needs!

### Conclusion

In this tech note we have explained how to use a BibTeX file in a Markdown file generated from R Markdown without using pandoc-citeproc.
The star of this post was the [RefManageR](https://docs.ropensci.org/RefManageR/) package, that in turns depends on the [bibtex](https://github.com/romainfrancois/bibtex) package and base R functionality to handle bibliographies.
You can learn more about RefManageR functions [on its documentation website](https://docs.ropensci.org/RefManageR/).
We have also mentioned other R packages offering functionality around BibTeX files: [citr](https://github.com/crsh/citr) and [knitcitations](https://github.com/cboettig/knitcitations) for more easily adding references in standard R Markdown documents, [bib2df](https://docs.ropensci.org/bib2df/) and [handlr](https://docs.ropensci.org/handlr/) for converting BibTeX files to other formats.
If you're interested in learning about yet another workflow involving citations in R Markdown documents, have a look at the Distill web framework wrapped in the R package distill, where [citations handling currently happens via JavaScript](https://github.com/rstudio/distill/issues/45).

[^refmanager]: McLean MW (2017). "RefManageR: Import and Manage BibTeX
and BibLaTeX References in R." _The Journal of Open Source Software_.
, https://doi.org/10.21105/joss.00338.

[^my-citation-key-for-r]: R Core Team (2020). _R: A Language and
Environment for Statistical Computing_. R Foundation for Statistical
Computing, Vienna, Austria. https://www.R-project.org/.

[^footnote]: Hello I am the footnote example.
[^social]: Last year Philipp Ottolinger wrote a nice post ["Being a package maintainer or: The social contract"](https://www.ottlngr.de/post/being-a-package-maintainer/) on his personal website.
