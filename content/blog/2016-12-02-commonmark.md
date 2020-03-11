---
slug: commonmark
title: High Performance CommonMark and Github Markdown Rendering in R
date: '2016-12-02'
author:
  - Jeroen Ooms
tags:
  - packages
  - commonmark
  - Markdown
  - R
---

This week the folks at Github have open sourced their [fork](https://github.com/github/cmark) of libcmark (based on the extensive [PR by Mathieu Duponchelle](https://github.com/jgm/cmark/pull/123)), which they use to render markdown text within documents, issues, comments and anything else on the Github website. The new release of the [commonmark](https://cran.r-project.org/web/packages/commonmark/index.html) R package incorporates this library so that we can take advantage of Github quality markdown rendering in R.

The most exciting change is that the library has gained an extension mechanism to provide optional rendering features which are missing from the commonmark spec. Most notably, Github has added extentions for rendering GFM style tables and autolinks, both very useful features for R users.

![consolemd](/assets/blog-images/consolemd.png)

## What is CommonMark

[CommonMark](https://spec.commonmark.org/) is an initiative by Professor John MacFarlane (author of Pandoc) to formally define markdown syntax specification and provide high quality reference implementations. His high performance [cmark](https://github.com/jgm/cmark) C library converts markdown text into xml, html, latex or groff man in the [blink of an eye](https://github.com/jgm/cmark#readme).

The [commonmark](https://cran.r-project.org/web/packages/commonmark/index.html) R package wraps libcmark and has been on CRAN for a while. It should replace the old [markdown](https://cran.r-project.org/web/packages/markdown/index.html) package which is based on the deprecated Sundown library (the [author](https://github.com/vmg/sundown) of Sundown now works for Github and is one of the contributors to libcmark).

## CommonMark Extensions

Commonmark is extremely reliable and optimized, but the disadvantage of the formal specification is that it can take a long time for new feature proposals to be adopted. For example a [proposal](https://talk.commonmark.org/t/tables-in-pure-markdown/81) for markdown tables has been open for over two years, but ironing out the syntax details has proven to be difficult.

For this reason many commonmark implementations include 'extensions' to enable features which are not (yet) part of the official specification. The current version of the commonmark R package offers 4 such extensions:


 - **table** support rendering of tables
 - **strikethough** via `~sometext~` syntax
 - **autolink** automatically turn URLs into hyperlinks
 - **tagfilter** blacklist html tags: `title` `textarea` `style` `xmp` `iframe`
  `noembed` `noframes` `script` `plaintext`.

These extensions were added by Github to support [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

![roxygenmd](/assets/blog-images/autolink.png)

Note that extensions are not enabled by default. For example to render tables, you need to set the `extensions` parameter to `TRUE` or `"table"`.

## Markdown and Roxygen

We also use commonmark in the upcoming version 6.0 of roxygen2 to support markdown within roxygen, which is super awesome.

![roxygenmd](/assets/blog-images/roxygenmd.png)

To give this a try you need the development version of roxygen2:

```r
devtools::install_github("klutometis/roxygen")
```

To enable markdown roxygen for a given package, all you need to do is add a line with `Roxygen: list(markdown = TRUE)` to the package DESCRIPTION file. For more details check out the [vignette](https://roxygen2.r-lib.org/articles/rd-formatting.html).
There is also package [roxygen2md](https://github.com/r-pkgs/roxygen2md) which will automatically convert existing roxygen code to markdown.
