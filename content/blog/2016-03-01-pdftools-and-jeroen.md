---
slug: pdftools-and-jeroen
title: Introducing pdftools - A fast and portable PDF extractor
date: '2016-03-01'
author:
  - Jeroen Ooms
tags:
  - R
  - PDF
  - CRAN
  - pdftools
---

Scientific articles are typically locked away in PDF format, a format designed primarily for printing but not so great for searching or indexing. The new [pdftools](https://cran.r-project.org/package=pdftools) package allows for extracting text and metadata from pdf files in R. From the extracted plain-text one could find articles discussing a particular drug or species name, without having to rely on publishers providing metadata, or pay-walled search engines.

The pdftools slightly overlaps with the [Rpoppler](https://cran.r-project.org/web/packages/Rpoppler/index.html) package by Kurt Hornik. The main motivation behind developing pdftools was that Rpoppler depends on glib, which does not work well on Mac and Windows. The pdftools package uses the poppler c++ interface together with Rcpp, which results in a lighter and more portable implementation.

## Installing pdftools

<a href="https://cran.rstudio.com/web/packages/pdftools/"><span class="label label-warning">cran</span></a> <a href="https://github.com/ropensci/pdftools"><span class="label label-info">github</span></a>

On Windows and Mac the binary packages can be installed directly from CRAN:


```r
install.packages("pdftools")
```

Installation on Linux requires the poppler development library. On Debian/Ubuntu:

```
sudo apt-get install libpoppler-cpp-dev
```

On Fedora or CentOS:

```
sudo yum install poppler-cpp-devel
```

If you want to install the package from source on Mac OS-X you need brew:

```
brew install poppler
```

That's it.


## Getting started

The `?pdftools` manual page shows a brief overview of the main utilities. The most important function is `pdf_text` which returns a character vector of length equal to the number of pages in the pdf. Each string in the vector contains a plain text version of the text on that page.

```r
library(pdftools)
download.file("http://arxiv.org/pdf/1403.2805.pdf", "1403.2805.pdf", mode = "wb")
txt <- pdf_text("1403.2805.pdf")

# first page text
cat(txt[1])

# second page text
cat(txt[2])
```

In addition, the package has some utilities to extract other data from the PDF file. The `pdf_toc` function shows the table of contents, i.e. the section headers which pdf readers usually display in a menu on the left. It looks pretty in JSON:

```r
# Table of contents
toc <- pdf_toc("1403.2805.pdf")

# Show as JSON
jsonlite::toJSON(toc, auto_unbox = TRUE, pretty = TRUE)
```

Other functions provide information about fonts, attachments and metadata such as the author, creation date or tags.


```r
# Author, version, etc
info <- pdf_info("1403.2805.pdf")

# Table with fonts
fonts <- pdf_fonts("1403.2805.pdf")
```

## Bonus feature: rendering pdf

A bonus feature on most platforms is rendering of PDF files to bitmap arrays. The poppler library provides all functionality to implement a complete PDF reader, including graphical display of the content. In R we can use pdf_render_page to render a page of the PDF into a bitmap, which can be stored as e.g. png or jpeg.

```r
# renders pdf to bitmap array
bitmap <- pdf_render_page("1403.2805.pdf", page = 1)

# save bitmap image
png::writePNG(bitmap, "page.png")
jpeg::writeJPEG(bitmap, "page.jpeg")
webp::write_webp(bitmap, "page.webp")
```

This feature now works on all platforms.

## Limitations

Data scientists are often interested in data from tables. Unfortunately the pdf format is pretty dumb and does not have notion of a table (unlike for example HTML). Tabular data in a pdf file is nothing more than strategically positioned lines and text, which makes it difficult to extract the raw data.

```r
txt <- pdf_text("http://arxiv.org/pdf/1406.4806.pdf")

# some tables
cat(txt[18])
cat(txt[19])
```

Pdftools usually does a decent job in retaining the positioning of table elements when converting from pdf to text. But the output is still very dependent on the formatting of the original pdf table, which makes it very difficult to write a generic table extractor. But with a little creativity you might be able to parse the table data from the text output of a given paper.

## Jeroen Ooms joins team rOpenSci!

A message from the team: We are happy to announce that [Jeroen Ooms](https://jeroen.github.io/) has joined the rOpenSci crew! Jeroen is a prolific programmer and author of numerous [widely used packages](https://cran.r-project.org/web/checks/check_results_jeroen.ooms_at_stat.ucla.edu.html). At rOpenSci, he will continue to work on developing awesome packages and infrastructural software for improving the scientific tool chain.


