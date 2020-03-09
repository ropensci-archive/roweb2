---
slug: spelling-release
title: 'Spelling 1.0: quick and effective spell checking in R'
date: '2017-09-07'
author:
  - Jeroen Ooms
topicid: 856
tags:
  - R
  - packages
  - software
  - spelling
  - text
---


The new rOpenSci [spelling](https://cran.r-project.org/web/packages/spelling/index.html) package provides utilities for spell checking common document formats including latex, markdown, manual pages, and DESCRIPTION files. It also includes tools especially for package authors to automate spell checking of R documentation and vignettes.

## Spell Checking Packages

The main purpose of this package is to quickly find spelling errors in R packages. The `spell_check_package()` function extracts all text from your package manual pages and vignettes, compares it against a language (e.g. en_US or en_GB), and lists potential errors in a nice tidy format:


```r
> spelling::spell_check_package("~/workspace/writexl")
  WORD       FOUND IN
booleans   write_xlsx.Rd:21
xlsx       write_xlsx.Rd:6,18
           title:1
           description:1
```

Results may contain false positives, i.e. names or technical jargon which does not appear in the English dictionary. Therefore you can create a WORDLIST file, which serves as a package-specific dictionary of allowed words:

```r
> spelling::update_wordlist("~/workspace/writexl")
The following words will be added to the wordlist:
 - booleans
 - xlsx
Are you sure you want to update the wordlist?
1: Yes
2: No
```

Words added to this file are ignored in the spell check, making it easier to catch actual spelling errors:

```r
> spell_check_package("~/workspace/writexl")
No spelling errors found.
```

The package also includes a cool function `spell_check_setup()` which adds a unit test to your package that automatically runs the spell check.

```r
> spelling::spell_check_setup("~/workspace/writexl")
No changes required to /Users/jeroen/workspace/writexl/inst/WORDLIST
Updated /Users/jeroen/workspace/writexl/tests/spelling.R
```

By default this unit test will never actually fail; it merely displays potential spelling errors at the end of a `R CMD check`. But you can configure it to fail if you'd like, which can be useful to automatically highlight spelling errors on e.g. Travis CI.


## Under the Hood

The spelling package builds on [hunspell](/technotes/2016/09/12/hunspell-release-20) which has a fully customizable spell checking engine. Most of the code in the spelling package is dedicated to parsing and extracting text from documents before feeding it to the spell checker.
For example, when spell checking an rmarkdown file, we first extract words from headers and paragraphs (but not urls or R syntax).

```r
# Spell check this post
> spelling::spell_check_files("~/workspace/roweb/_posts/2017-09-07-spelling-release.md", lang = 'en_US')
  WORD         FOUND IN
blog         2017-09-07-spelling-release.md:7
commonmark   2017-09-07-spelling-release.md:88
hunspell     2017-09-07-spelling-release.md:69
Jeroen       2017-09-07-spelling-release.md:7
knitr        2017-09-07-spelling-release.md:88
Ooms         2017-09-07-spelling-release.md:7
rmarkdown    2017-09-07-spelling-release.md:88
rOpenSci     2017-09-07-spelling-release.md:18
urls         2017-09-07-spelling-release.md:88
wordlist     2017-09-07-spelling-release.md:49
WORDLIST     2017-09-07-spelling-release.md:34
```

 To accomplish this, we use knitr to drop code chunks, and subsequently parse markdown using [commonmark](/blog/2016/12/02/commonmark) and xml2, which gives us the text nodes and approximate line numbers in the source document.
