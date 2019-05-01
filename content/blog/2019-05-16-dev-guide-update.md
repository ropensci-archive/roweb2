---
slug: dev-guide-update
title: 'rOpenSci Dev Guide 0.2.0: Updates Inside and Out'
date: 2019-05-16
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

As announced in [our recent post about updates to our Software Peer Review system](/blog/2019/02/01/software-review-news/), all our package development, review and maintenance is available as [an online book](https://ropensci.github.io/dev_guide/). Our goal is to update it approximately quarterly so it's already time to present its second official version! You can [read the changelog](https://ropensci.github.io/dev_guide/booknews.html) or this blog post to find out what's new in our dev guide 0.2.0!

### A more legit and accessible book

Let's start with very exciting news, the dev guide now has a cover, designed by Oz Locke from [Locke Creatives](https://www.lockecreatives.com/)!

{{< figure src="/img/blog-images/2019-05-16-dev-guide-update/cover.png" alt="cover of rOpenSci dev guide, showing a package production line with small humans discussing, examining and promoting packages" width="500" >}}

It shows a package production line with small humans discussing, examining and promoting packages, all of this in white on rOpenSci blue. Speaking of rOpenSci branding, thanks to [Will Landau](https://github.com/wlandau)'s [help](https://github.com/ropensci/dev_guide/issues/136), the online book now features the rOpenSci hex logo as favicon.

Two changes improved the _accessibility_ of the book, thanks to feedback from readers. First, the book became more legible by the use of a darker blue for links. Thanks a lot to [Kevin Wright](https://github.com/kwstat) for [telling us how hard it was to read the links in the former color](https://github.com/ropensci/dev_guide/issues/138)! Then, the README of the GitHub repository holding the source of our blog got more accessible thanks to a [contribution](https://github.com/ropensci/dev_guide/pull/137) by [Katrin Leinweber](https://github.com/katrinleinweber). In particular, Katrin made us aware of [guidance about why not to use "click here" for links](https://webaccess.berkeley.edu/ask-pecan/click-here).

One last outside change to the book is its [availability as PDF to download](https://ropensci.github.io/dev_guide/ropensci-dev-guide.pdf) (see PDF button in the navbar), after a [request](https://github.com/ropensci/dev_guide/issues/131) by [Indrajeet Patil](https://github.com/IndrajeetPatil).

### Updates to our policies and guidance

#### Continuous integration

We added a new [continuous integration *requirement*](https://ropensci.github.io/dev_guide/ci.html#ci): package maintainers must now use `devel` and `oldrel` R versions on Travis, not only R-release.

That same chapter was improved with more guidance, including links to examples, thanks to [a contribution](https://github.com/ropensci/dev_guide/pull/135) by [Mark Padgham](https://github.com/mpadge).

#### Preferred dependencies

In [the section about recommended scaffolding](https://ropensci.github.io/dev_guide/building.html#recommended-scaffolding) we already recommended xml2 over XML for most cases but now we've added a link to [Daniel Nüst's very neat notes about migration from XML to xml2](https://gist.github.com/nuest/3ed3b0057713eb4f4d75d11bb62f2d66).

#### After acceptance

Three changes relate to what happens after a package has been accepted.

* [Hadley Wickham](https://github.com/hadley) [helped us simplify code examples the Package Evolution section](https://github.com/ropensci/dev_guide/pull/129), see [the updated version of the section](https://ropensci.github.io/dev_guide/evolution.html).

* We now recommend [package maintainers direct users to the rOpenSci forum for feedback that's neither a bug report nor a feature request](https://ropensci.github.io/dev_guide/collaboration.html#contributing-guide).

* The [review template](https://ropensci.github.io/dev_guide/reviewtemplate.html) now includes a question asking the reviewer for consent to be added to DESCRIPTION in review template, should the author(s) deem it appropriate. For more context, refer to [our blog post "Thanking Your Reviewers: Gratitude through Semantic Metadata"]
(https://ropensci.org/blog/2018/03/16/thanking-reviewers-in-metadata/).


### Conclusion

In this post we summarized the changes incorporated into [our online book "rOpenSci Packages: Development, Maintenance, and Peer Review"](https://ropensci.github.io/dev_guide/) over the last three months. We are very grateful for all contributions that made this release possible. Now, if _you_ have any feedback about the book, you too can head to [the issue tracker](https://github.com/ropensci/dev_guide/issues/)!
