---
title: About citations in Rmd with and without pandoc
author:
  - Maëlle Salmon
date: '2020-04-30'
slug: rmd-citations
categories: []
tags:
  - citations
  - RMarkdown
description: Some tips around the use of citations/references in R Markdown, in particular with RefManageR
output:
  html_document:
    keep_md: yes
---



Our website is based on Markdown content rendered with Hugo.
Markdown content is in some cases knit from R Markdown, but with [less functionality as if one rendered R Markdown to html as in the blogdown default](https://bookdown.org/yihui/blogdown/output-format.html).
In particular, we cannot use the usual .bib + .csl + Pandoc-citeproc [dance](https://github.com/rstudio/distill/issues/45).
Thankfully, using the rOpenSci package RefManageR, we can still make our own bibliography building from a BibTeX file without formatting references by hand.

https://blogguide.ropensci.org/technical.html#addcitation

### Usual citation workflow in Rmd

To repeat information presented in [Nicholas Tierney's excellent online book "R Markdown for Scientists"](https://rmd4sci.njtierney.com/citing-articles-bibliography-styles.html), to get a bibliography one

* references a bibliography style in the document YAML metadata, with entries such as the one below for R,

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

* inserts citations using their key, e.g. `@my-citation-key-for-r` for the entry above,

* and optionally uses CSL to control the look of the references list; and a bookdown output format to have the bibliography placed somewhere else than the end.

Some R tools out there simplify part of the workflow, mimicking tools you could find in Microsoft Word:

* [citr](https://github.com/crsh/citr) provides an RStudio add-in to search for references in a .bib file, inserting the key in the document;

* [knitcitations](https://github.com/cboettig/knitcitations) allows you to not only use the keys, but also DOIs and URLs to cite a paper. E.g. `citet("10.1098/rspb.2013.1372")` will create a citation to `@Boettiger_2013` after querying the web; and `write.bibtex(file = "references.bib")` will allow you to cache entries in a bibliography file.

Both these packages imports [RefManageR](https://docs.ropensci.org/RefManageR/), a package that _provides tools for importing and working with bibliographic references_, and that has been [peer-reviewed by rOpenSci](https://github.com/ropensci/software-review/issues/119).

### Citation workflow without Pandoc

Now, for generating Markdown content like this post source, one cannot use the tools presented earlier.
In our blog guide, we explain that citations are footnotes [whose text is APA formatted](https://blogguide.ropensci.org/technical.html#addcitation) and we explain how to [find that citation text for a package or article](https://blogguide.ropensci.org/technical.html#how-to-find-citation-text-for-a-package-or-article).
In most cases, authors are only citing a few references, so that is fine.
However, sometimes authors would like to use an existing .bib file, that they might have e.g. exported from Zotero.

Thankfully, using RefManageR, we can provide a workflow for adding citations from a bib file, by creating functions similar to knitcitations' functions.

We are using the .bib file below,

```r 
glue::glue_collapse(
  c("```bibtex",
    readLines("refs.bib"),
    "```"),
  sep = "\n")
```

```
Warning in readLines("refs.bib"): incomplete final line found on 'refs.bib'
```

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

We'll start by creating a reference t

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

Then in another chunk, we'll create a function creating the citations in the format we need it to have it appear as a footnote: `[^key]`

```r 
cite <- function(key, bib = mybib) {
  # create a silent reference so RefManageR
  # knows we've used this entry
  RefManageR::NoCite(bib, key)
  # create the string we need in the Markdown document
  paste0("[^", key, "]")
}
```

Now from the three entries of the BibTeX file, let us cite two of them, what a nice package[^refmanager] built on top of R[^my-citation-key-for-r] (we wrote ` cite("refmanager")` and `cite("my-citation-key-for-r")` as inline code).

Now for the bibliography to appear, we need to add a call to `RefManageR::PrintBibliography()`, after defining our own bibstyle. 
We need each entry to appear in the Markdown file as

```
[^mykey]: <APA string>
```

To get the first part right, we use the `fmtPrefix` of `tools::bibstyle()`.
To get the second part right, after reading through some [R source code](https://github.com/wch/r-source/blob/28f8367a5514cc0d014cf2aa9e7ce909cd2050af/src/library/tools/R/bibstyle.R), we found how to correctly add DOI and URL when present.
Note that in our case the order of appearance of entries within the references list in the Markdown file is not important at all, since Hugo Markdown handler, Goldmark, will reorder them based on order of appearance in the text.

The chunk below was used at the very end of the R Markdown file producing this post.
It came before the definition of another, not citation, footnote.[^footnote]

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

We run it below without the `results="asis"` option to show what the output looks like.


```
[^refmanager]: McLean MW (2017). "RefManageR: Import and Manage BibTeX
and BibLaTeX References in R." _The Journal of Open Source Software_.
, https://doi.org/10.21105/joss.00338.

[^my-citation-key-for-r]: R Core Team (2020). _R: A Language and
Environment for Statistical Computing_. R Foundation for Statistical
Computing, Vienna, Austria. https://www.R-project.org/.
```

### Do even more with bib files

The workflow presented earlier was a cool example of using RefManageR to use a BibTeX file.
There are other two packages that are worth knowing about.

### Conclusion

In this tech note we have explained how to use a BibTeX file in a Markdown file generated from R Markdown without using pandoc-citeproc.
The star of this post was the [RefManageR](https://docs.ropensci.org/RefManageR/) package, that in turns depends on the [bibtex](https://github.com/romainfrancois/bibtex) package and base R functionalities to handle bibliographies.
If you're interested in learning about yet another workflow involving citations in R Markdown documents, have a look at the Distill web framework wrapped in the R package distill, where [citations handling currently happens via JavaScript](https://github.com/rstudio/distill/issues/45).

[^refmanager]: McLean MW (2017). "RefManageR: Import and Manage BibTeX
and BibLaTeX References in R." _The Journal of Open Source Software_.
, https://doi.org/10.21105/joss.00338.

[^my-citation-key-for-r]: R Core Team (2020). _R: A Language and
Environment for Statistical Computing_. R Foundation for Statistical
Computing, Vienna, Austria. https://www.R-project.org/.

[^footnote]: Hello I am the footnote example.
