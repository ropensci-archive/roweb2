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

The .md we use is the by-product of the knitting an .Rmd to .html, and does not involve running Pandoc.
Therefore, the bibliography parameter from your header and the `@` will simply be ignored.
However, thanks to RefManageR, you can still use your .bib file!

### Conclusion

