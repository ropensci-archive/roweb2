---
slug: ropensci_text_tools
title: New rOpenSci Packages for Text Processing in R
date: '2017-06-13'
author:
  - Jeroen Ooms
topicid: 746
tags:
  - R
  - packages
  - software
  - open data
  - PDF
---

Textual data and natural language processing are still a niche domain within the R ecosytstem. The [NLP task view](https://cran.r-project.org/view=NaturalLanguageProcessing) gives an overview of existing work however a lot of basic infrastructure is still missing.
At the rOpenSci [text workshop](/blog/2017/05/03/textworkshop17) in April we discussed many ideas for improving text processing in R which revealed several core areas that need improvement:

 - Reading: better tools for extracing text and metadata from documents in various formats (doc, rtf, pdf, etc).
 - Encoding: many text packages work well for ascii text but rapidly break down when text contains Hungarian, Korean or emojis.
 - Interchange: packages don't work well together due to lack of data classes or conventions for textual data (see also [ropensci/tif](https://github.com/ropensci/tif))

Participants also had many good suggestions for C/C++ libraries that text researchers in R might benefit from. Over the past weeks I was able to look into these suggestions and work on a few packages for reading and analyzing text. Below is an update on new and improved rOpenSci tools for text processsing in R!

## Google language detector 2 and 3

New packages `cld2` and `cld3` are wrappers C++ libraries by Google for language identification. [CLD2](https://github.com/cld2owners/cld2#internals) is a Naïve Bayesian classifier, whereas [CLD3](https://github.com/google/cld3#model) uses a neural network model. I found `cld2` to give better results for short text.

```r
# Get the latest versions
install.packages(c("cld2", "cld3"))

# Vectorized function
text <- c("À chaque fou plaît sa marotte.", "猿も木から落ちる",
	"Алты́нного во́ра ве́шают, а полти́нного че́ствуют.", "Nou breekt mijn klomp!")

cld2::detect_language(text)
# [1] "fr" "ja" "ru" "nl"
```

[Maëlle](https://maelle.github.io) has written a [cool post](https://masalmon.eu/2017/06/10/rolandgarros/) comparing language classification methods using 18000 `"#RolandGarros2017"` tweets and [Thomas](https://www.stat.auckland.ac.nz/people/tlum005) [reminds us](https://notstatschat.tumblr.com/post/161449071226/stupid-word-games) that algorithms can easily be fooled. Still I found the accuracy on real text quite astonishing given the relatively small size of these libraries.

Note that the algorithm for CLD3 is still under development and the engineers at Google have recently [opened](https://github.com/google/cld3/issues) their Github issues page for feedback.


## (anti) word and (un)rtf

Many archived documents are only available in legacy formats such as `.doc` and `.rtf`. The only tools available for extracting text from these documents were difficult to install and could not be imported from packages and scripts.

To make this a little easier we have packaged up utilities [antiword](http://www.winfield.demon.nl/) and [UnRTF](https://www.gnu.org/software/unrtf/) to read MS `doc` and `rtf` files respectively.

```r
# Get the latest versions
install.packages(c("antiword", "unrtf"))

# Extract text from 'rtf' file
text <- unrtf::unrtf("https://jeroen.github.io/files/sample.rtf", format = "text")
cat(text)
### Lots of text...

# Extract text from 'doc' file
text <- antiword::antiword("https://jeroen.github.io/files/UDHR-english.doc")
cat(text)
### Lots of text...
```

Also have a look at meta packages `readtext` or `textreadr` which wrap these and other packages for automatically reading text in many different formats.

## pdf utilities

Our [pdftools](https://cran.r-project.org/web/packages/pdftools/index.html) package now supports reading pdf (extracting text or metadata) and rendering pdf to png, jpeg, tiff, or raw vectors on all platforms (incl. Windows).

```r
# Read some text
text <- pdftools::pdf_text('https://cran.r-project.org/doc/manuals/r-release/R-intro.pdf')
cat(text[1])
# An Introduction to R
#             Notes on R: A Programming Environment for Data Analysis and Graphics
#                                                        Version 3.4.0 (2017-04-21)
# W. N. Venables, D. M. Smith
# and the R Core Team

# Read meta data
pdftools::pdf_info('https://cran.r-project.org/doc/manuals/r-release/R-intro.pdf')
# $version
# [1] "1.5"
#
# $pages
# [1] 105
#
# .... much more :)
```

You can use either render a page into a raw bitmap array, or directly to an image format such as png, jpeg or tiff.

```r
files <- pdftools::pdf_convert('https://cran.r-project.org/doc/manuals/r-release/R-intro.pdf', format = "png", pages = 1:5)
# Converting page 1 to R-intro_1.png... done!
# Converting page 2 to R-intro_2.png... done!
# Converting page 3 to R-intro_3.png... done!
# Converting page 4 to R-intro_4.png... done!
# Converting page 5 to R-intro_5.png... done!
```

To extract text from scanned images, also check out our [tesseract](https://cran.r-project.org/web/packages/tesseract/index.html) package which wraps Google's powerful OCR engine.

## Stemming, tokenizing and spell checking

Our [hunspell](https://cran.r-project.org/web/packages/hunspell/index.html) package has had a few updates recently as well. The package is a wrapper for [libhunspell](https://hunspell.github.io/) which is a popular library for spell checking:

```r
# Extract incorrect from a piece of text
bad <- hunspell("spell checkers are not neccessairy for langauge ninja's")
print(bad[[1]])
# [1] "neccessairy" "langauge"
hunspell_suggest(bad[[1]])
# [[1]]
# [1] "necessary"    "necessarily"  "necessaries"  "recessionary" "accessory"    "incarcerate"
#
# [[2]]
# [1] "language"  "Langeland" "Lagrange"  "Lange"     "gaugeable" "linkage"   "Langland"
```


The package is also used by `devtools` to spell-check manual pages in R packages:

```r
devtools::spell_check()
#   WORD          FOUND IN
# alltogether   pdftools.Rd:36
# cairo         pdf_render_page.Rd:42
# jpeg          pdf_render_page.Rd:40
# libpoppler    pdf_render_page.Rd:42, pdftools.Rd:30, description:1
# png           pdf_render_page.Rd:40
# Poppler       pdftools.Rd:34
```

Finally hunspell also exposes the underlying methods needed for spell checking such as stemming words:

```r
# Find possible stems for each word
words <- c("loving", "loved", "lover", "lovely", "love")
hunspell_analyze(words)
# [[1]]
# [1] " st:loving"    " st:love fl:G"
#
# [[2]]
# [1] " st:loved"     " st:love fl:D"
#
# [[3]]
# [1] " st:lover"     " st:love fl:R"
#
# [[4]]
# [1] " st:lovely"    " st:love fl:Y"
#
# [[5]]
# [1] " st:love"
```


Hunspell also suppors tokenizing words from html, latex, man, or plain text. For more advanced word extraction, check out the rOpenSci [tokenizers](https://github.com/ropensci/tokenizers#readme) package.
