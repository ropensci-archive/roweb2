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
topicid: 1707
tags:
  - Software Peer Review
---

As announced in [our recent post about updates to our Software Peer Review system](/blog/2019/02/01/software-review-news/), all our package development, review and maintenance is available as [an online book](https://devguide.ropensci.org/). Our goal is to update it approximately quarterly so it's already time to present its second official version! You can [read the changelog](https://devguide.ropensci.org/booknews.html) or this blog post to find out what's new in our dev guide 0.2.0!

### A more legit and accessible book

Let's start with very exciting news, the dev guide now has a cover, designed by Oz Locke from [Locke Creatives](https://www.lockecreatives.com/)!

{{< figure src="/img/blog-images/2019-05-16-dev-guide-update/cover.png" alt="cover of rOpenSci dev guide, showing a package production line with small humans discussing, examining and promoting packages" width="500" >}}

It shows a package production line with small humans discussing, examining and promoting packages, all of this in white on rOpenSci blue. Speaking of rOpenSci branding, thanks to [Will Landau](https://github.com/wlandau)'s [help](https://github.com/ropensci/dev_guide/issues/136), the online book now features the rOpenSci hex logo as favicon.

Two changes improved the _accessibility_ of the book, thanks to feedback from readers. First, the book became more legible by the use of a darker blue for links. Thanks a lot to [Kevin Wright](https://github.com/kwstat) for [telling us how hard it was to read the links in the former color](https://github.com/ropensci/dev_guide/issues/138)! Then, the README of the GitHub repository holding the source of our blog got more accessible thanks to a [contribution](https://github.com/ropensci/dev_guide/pull/137) by [Katrin Leinweber](https://github.com/katrinleinweber). In particular, Katrin made us aware of [guidance about why not to use "click here" for links](https://webaccess.berkeley.edu/ask-pecan/click-here).

One last outside change to the book is its [availability as PDF to download](https://devguide.ropensci.org/ropensci-dev-guide.pdf) (see PDF button in the navbar), after a [request](https://github.com/ropensci/dev_guide/issues/131) by [Indrajeet Patil](https://github.com/IndrajeetPatil).

### Updates to our policies and guidance

#### Style: arrow vs. equal

Thanks to [a question by Robert M Flight](https://github.com/ropensci/software-review-meta/issues/71), our style guidance [now states that it is fine to use either an arrow or an equal sign for assignment **as long as the choice is consistent within the whole package**](https://devguide.ropensci.org/building.html#code-style). You can choose to use `=` over `<-` as long you are consistent with one choice within your package. We recommend avoiding the use of `->` for assignment within a package. If you do use `<-` throughout your package, and you also use `R6` in that package, you'll be forced to use `=` for assignment within your `R6Class` construction - this is not considered inconsistency beause you can't use `<-` in this case.

#### Continuous integration

We added a new [continuous integration *requirement*](https://devguide.ropensci.org/ci.html#ci): package maintainers must now use `devel` and `oldrel` R versions on Travis, not only R-release.

That same chapter was improved with more guidance, including links to examples, thanks to [a contribution](https://github.com/ropensci/dev_guide/pull/135) by [Mark Padgham](https://github.com/mpadge).

#### Preferred dependencies

In [the section about recommended scaffolding](https://devguide.ropensci.org/building.html#recommended-scaffolding) we already recommended xml2 over XML for most cases but now we've added a link to [Daniel Nüst's very neat notes about migration from XML to xml2](https://gist.github.com/nuest/3ed3b0057713eb4f4d75d11bb62f2d66).

#### After acceptance

Three changes relate to what happens after a package has been accepted.

* [Hadley Wickham](https://github.com/hadley) [helped us simplify code examples the Package Evolution section](https://github.com/ropensci/dev_guide/pull/129), see [the updated version of the section](https://devguide.ropensci.org/evolution.html).

* We now recommend [package maintainers direct users to the rOpenSci forum for feedback that's neither a bug report nor a feature request](https://devguide.ropensci.org/collaboration.html#contributing-guide).

* The [review template](https://devguide.ropensci.org/reviewtemplate.html) now includes a question asking the reviewer for consent to be added to DESCRIPTION in review template, should the author(s) deem it appropriate. For more context, refer to [our blog post "Thanking Your Reviewers: Gratitude through Semantic Metadata"]
(/blog/2018/03/16/thanking-reviewers-in-metadata/).

#### Spreading our guidelines

rOpenSci community manager Stefanie Butland and other authors [recently reported how our software review guidelines ended up being used "in the wild" for a scientific paper](/blog/2019/04/18/wild-standards/). Knowing about such use cases makes us happy and helps us assess the usefulness of our material beyond our own system, so we've now added the following wish to several places in our guide ([intro to our software review system](https://devguide.ropensci.org/softwarereviewintro.html), [reviewer guide](https://devguide.ropensci.org/reviewerguide.html), [chapter about contributing to rOpenSci](https://devguide.ropensci.org/contributingguide.html)):

_If you use our standards/checklists etc. when reviewing software elsewhere, do tell the recipients (e.g. journal editors, students, internal code review) that they came from rOpenSci, and tell us in [our public forum](https://discuss.ropensci.org/c/usecases), or [privately by email](/contact/)._

#### More information about contributing

The [contributing guide](https://devguide.ropensci.org/contributingguide.html) now contains more reasons to contribute, and [the approval template for editors](https://devguide.ropensci.org/approvaltemplate.html) now features more specific guidance about writing a blog post or tech note about an approved package.

### Conclusion

In this post we summarized the changes incorporated into [our online book "rOpenSci Packages: Development, Maintenance, and Peer Review"](https://devguide.ropensci.org/) over the last three months. We are very grateful for all contributions that made this release possible. Now, if _you_ have any feedback about the book, you too can head to [the issue tracker](https://github.com/ropensci/dev_guide/issues/)!
