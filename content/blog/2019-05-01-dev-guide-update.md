---
slug: dev-guide-update
title: 'rOpenSci Dev Guide: Updates Inside and Out'
date: 2019-05-01
authors:
  - Maëlle Salmon
  - Brooke Anderson
  - Scott Chamberlain
  - Anna Krystalli
  - Lincoln Mullen
  - Karthik Ram
  - Noam Ross
  - Melina Vidoni
categories: blog
topicid: 
tags:
  - Software Peer Review
---

As announced in [our recent post about updates to our Software Peer Review system](/blog/2019/02/01/software-review-news/), all our package development, review and maintenance is available as [an online book](https://ropensci.github.io/dev_guide/). Our goal is to update approximately quaterly so it's already time to present its second official version! What's new in our dev guide 0.2.0?

### A more legit and accessible book

Let's start with very exciting news, the dev guide now has a cover, designed by Oz Locke from [Locke Creatives](https://www.lockecreatives.com/)!

{{< figure src="/img/blog-images/2019-05-01-dev-guide-update/cover.png" alt="cover of rOpenSci dev guide, showing a package production line with small humans discussing, examining and promoting packages" width="500" >}}

It shows a package production line with small humans discussing, examining and promoting packages, all of this white on rOpenSci blue.

Two changes improved the accessibility of the book, thanks to feedback from readers. First, the book became more legible by the use of a darker blue for links. Thanks a lot to [Kevin Wright](https://github.com/kwstat) for [telling us how hard to read the links were in the former color](https://github.com/ropensci/dev_guide/issues/138)! Then, the README of the GitHub repository holding the source of our blog got more accessible thanks to a [contribution](https://github.com/ropensci/dev_guide/pull/137) by [Katrin Leinweber](https://github.com/katrinleinweber). In particular, Katrin made us aware of [guidance about how not to use "click here" for links](https://webaccess.berkeley.edu/ask-pecan/click-here).

By the way, if _you_ have any feedback about the book, also head to [the issue tracker](https://github.com/ropensci/dev_guide/issues/).

One last outside change to the book is its [availability as PDF to download](https://ropensci.github.io/dev_guide/ropensci-dev-guide.pdf) (see PDF button in the navbar), after a [request](https://github.com/ropensci/dev_guide/issues/131) by [`@IndrajeetPatil`](https://github.com/IndrajeetPatil).

 2019-04-29, add requirement and advice on testing packages using `devel` and `oldrel` R versions on Travis.

* 2019-04-23, add link to Daniel Nüst's notes about migration from XML to xml2.

* 2019-04-22, add use of rOpenSci forum to maintenance section.

* 2019-04-22, ask reviewer for consent to be added to DESCRIPTION in review template.


* 2019-04-08, improve formatting and link text in README (, #137)

* 2019-03-25, add favicon ([`@wlandau`](https://github.com/wlandau), #136).

* 2019-03-21, improve Travis CI guidance, including link to examples. ([`@mpadge`](https://github.com/mpadge), #135)

* 2019-02-07, simplify code examples in Package Evolution section (maintenance_evolution.Rmd file) ([`@hadley`](https://github.com/hadley), #129).

* 2019-02-07, added a PDF file to export (request by , #131).
