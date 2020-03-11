---
slug: hunspell-release-20
title: 'Hunspell 2.0: High-Performance Stemmer, Tokenizer, and Spell Checker for R'
date: '2016-09-12'
author:
  - Jeroen Ooms
tags:
  - R
  - hunspell
---

A new version of the ropensci [hunspell](https://cran.r-project.org/package=hunspell) package has been released to CRAN. Hunspell is the spell checker library used by LibreOffice, OpenOffice, Mozilla Firefox, Google Chrome, Mac OS-X, InDesign, Opera, RStudio and many others. It provides a system for tokenizing, stemming and spelling in almost any language or alphabet. The R package exposes both the high-level spell-checker as well as low-level stemmers and tokenizers which analyze or extract individual words from various formats (text, html, xml, latex).

## New Vignette

This new version now includes a beautiful [vignette](https://cloud.r-project.org/web/packages/hunspell/vignettes/intro.html) which gives an overview of the main functionality to get you started! It demonstrates the tokenizer, stemmer and spell-checker and has an example how to use the stemmer and tokenizer to create a word cloud from a large body of text.

[![Hunspell vignette](/assets/blog-images/hunspell-vignette.png)](https://cloud.r-project.org/web/packages/hunspell/vignettes/intro.html)


## Installing and Updating

The package is most easily installed from CRAN:

```r
install.packages("hunspell")
```

Or to get the latest version from Github:

```r
devtools::install_github("ropensci/hunspell")
```

This package does not require any system dependencies (libhunspell is now bundled with the package).
