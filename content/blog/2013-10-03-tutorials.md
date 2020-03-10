---
slug: tutorials
title: A new tutorials setup
date: '2013-10-03'
author:
  - Scott Chamberlain
tags:
  - R
  - help
---

To help you use rOpenSci packages we put tutorials up on our site at [/tutorials](/tutorials). Up to now, we created them with combination of raw html + converting code blocks to html and inserting them, etc. -- it was a slow process to update them when changes happened in our packages.

So we thought of a better plan...

Recently CRAN started accepting R package vignettes (basically, tutorials built in to packages) in R Markdown format. This is great because executable Markdown with code plus text is easy to do with the help of [knitr](https://yihui.name/knitr/). And since our website is created using Jekyll, we can take our package vignettes with only text and code as a .Rmd file, convert to a .md file with text + code + the output of that code, insert some yaml metadata at the top, and have Jekyll automagically generate html pages. This may sound complicated, but once we have the vignette in a package, it's just a few lines of code away from generating the html page for this site.

This workflow allows us to easily keep our changes in the functions/etc. of our packages and associated vignettes in sync with tutorials on our website. In addition, the vignette and tutorials on our site should have the same content.

We do say at the top of every tutorial *This is the vignette in the XYZ package*. The CRAN versions of packages may not have the vignette yet, but should show up in the next update of the package on CRAN, and should be in the Github version of the package now.

As always, let us know if you have any questions on our packages, and if you think the tutorials could use any additional examples, etc.
