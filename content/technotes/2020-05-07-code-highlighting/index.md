---
title: Highlights of Hugo Code Highlighting
author:
  - Maëlle Salmon
date: '2020-05-07'
slug: code-highlighting
categories: []
tags:
  - RMarkdown
  - hugo
package_version: 0.1.0
description: Explanations around code highlighting in Hugo websites, based on Markdown or R Markdown.
twitterImg: blog/2019/06/04/post-template/name-of-image.png
output:
  html_document:
    keep_md: yes
---



Thanks to a quite overdue update of Hugo on our build system[^netlify], our website can now harness the full power of Hugo code highlighting. 
What's code highlighting apart from the reason behind a tongue-twister in this post title?
In this post we shall explain how Hugo's code highlighter, Chroma, helps you prettify your code (i.e. _syntax highlighting_), and accentuate parts of your code (i.e. _line highlighting_).

### Make your code look pretty

If you notice and appreciate the difference between

```
a <- c(1:7, NA)
mean(a, na.rm = TRUE)
```

and 

```r
a <- c(1:7, NA)
mean(a, na.rm = TRUE)
```

you might agree with [Mara Averick's opinion](https://maraaverick.rbind.io/2017/11/r-blog-tips-from-an-inveterate-tweeter-thereof/),

>  Syntax highlighting! 🖍️ Just do it. Life is better when things are colourful.

### Emphasize parts of your code

[^netlify]: Our website is deployed via Netlify.
