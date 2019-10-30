---
slug: dev-guide-update-fall19
title: 'rOpenSci Dev Guide 0.3.0: Updates'
date: 2019-10-08
authors:
  - Scott Chamberlain
  - Brooke Anderson
  - Anna Krystalli
  - Lincoln Mullen
  - Karthik Ram
  - Noam Ross
  - Maëlle Salmon
  - Melina Vidoni
categories: blog
topicid: 1848
tags:
  - Software Peer Review
---

As [announced in February](/blog/2019/02/01/software-review-news/), we now have [an online book](https://devguide.ropensci.org/) containing all things related to rOpenSci software review. Our goal is to update it approximately quarterly - it's time to present the third version. You can [read the changelog](https://devguide.ropensci.org/booknews.html) or this blog post to find out what's new in our dev guide 0.3.0!


### Updates to our policies and guidance

#### Scope

We've introduced an important change for anyone thinking of submitting a package. We ask authors to select a category in our [Aims and Scope](https://devguide.ropensci.org/policies.html#aims-and-scope) under which to submit.  We found that the "reproducibility" category was confusing, as almost any R package can be related to reproducibility.  We split "reproducibility" into four new categories that fit the narrower topics it previously included. They are:

- data validation and testing: Tools that enable automated validation and checking of data quality and completeness as part of scientific workflows.

- workflow automation: Tools that automate and link together workflows, such as build systems and tools to manage continuous integration.

- version control: Tools that facilitate the use of version control in scientific workflows.

- citation management and bibliometrics: Tools that facilitate managing references, such as for writing manuscripts, creating CVs or otherwise attributing scientific contributions.

For discussion and changes see [ropensci/software-review-meta#81](https://github.com/ropensci/software-review-meta/issues/81) and [ropensci/dev_guide#184](https://github.com/ropensci/dev_guide/pull/184).

#### Documentation

rOpenSci's [Jeroen Ooms](/authors/jeroen-ooms/) has built out a new way for rOpenSci packages to improve documentation for their packages. Many of you have likely been building package documentation websites with [pkgdown][]. There were ways to automate the building of these documentation pages - but nothing as easy as we have now. Docs for each rOpenSci package are now built automatically and can be found at `https://docs.ropensci.org/{package}`, where `{package}` is the package name, e.g., the page for the [bowerbird][] package is <https://docs.ropensci.org/bowerbird/>. Read Jeroen's post for more details [Introducing the new rOpenSci docs server](/technotes/2019/06/07/ropensci-docs/) and see the developer guide section [Automatic deployment of the documentation website](https://devguide.ropensci.org/building.html#automatic-deployment-of-the-documentation-website-docsropensci).

We've changed our guidelines regarding README's and vignettes. If you have chunks shared between the README and any vignettes, then [we suggest using Rmarkdown chunks](https://devguide.ropensci.org/building.html#documentation). Related issues: [ropensci/dev_guide#159](https://github.com/ropensci/dev_guide/issues/159) and [ropensci/dev_guide#161](https://github.com/ropensci/dev_guide/issues/161).

Last, we've removed our recommendation about using the `roxygen2` development version because the latest stable version has what is needed regarding tags and the `rev` contributor role. (thanks again [Hugo Gruson][hugog] - [ropensci/dev_guide#165](https://github.com/ropensci/dev_guide/issues/165))

#### CRAN checks

We've added [explanations of CRAN checks](https://devguide.ropensci.org/building.html#cranchecks) to the packaging section, including that they can use the CRAN checks API, in particular see `rodev::use_cchecks_badge()` for adding a badge to your README to let users know the status of your CRAN checks.

#### R helpers

[usethis][] is a helper package for R package maintainers. We've added to the guide recommendations for usethis functions to use for adding testing or vignette infrastructure.

Built on usethis, the [rodev][] package is a new helper package, maintained by Maëlle. The goal of rodev is to help rOpenSci package developers with common tasks, and to promote best practices. We've added mentions of rodev functions throughout the guide where appropriate.

#### New section: Changing package maintainers

We've added a new section to the book on dealing with [changing package maintainers](https://devguide.ropensci.org/changing-maintainers.html). Part of the reason for rOpenSci to exist is sustainability of important R packages. Where possible, we strive to find new maintainers for packages when the current maintainers need to walk away. To help the rOpenSci community (including rOpenSci staff), we've added this section with tips and guidance for people wanting to give up the maintainer role, take over that role, and for staff that are involved in helping.

#### JOSS

We've updated JOSS submission instructions at <https://devguide.ropensci.org/approvaltemplate.html> (see [ropensci/dev_guide#187](https://github.com/ropensci/dev_guide/pull/187)). Instead of submitting with your Zenodo DOI, submit to JOSS with your rOpenSci Github repo URL. In addition, add a comment that the package has been reviewed by rOpenSci.

#### Security

We'd like to have fleshed out the security chapter more, but in the meantime, we've added a link to an rOpenSci community call on [Security for R](/commcalls/2019-05-07/), where you can find lots of resources and discussion on security in R packages.

#### Other changes

* [Matt Fidler](https://github.com/mattfidler/) amended our section on Console messages [ropensci/dev_guide#178](https://github.com/ropensci/dev_guide/pull/178). We previously said to only use `print()` and/or `cat()` in your `print.*` methods; now the language suggests to use those two functions in either `print.*` or `str.*` methods.

* We previously briefly mentioned "git flow". We [now](https://github.com/ropensci/dev_guide/commit/e34b5f2bb171cb10d1468807f529b0a2ec19ab9e) expand that a bit to discuss two aspects of "git flow": keep master shippable, and use branches because they're cheap.

### For editors

We've added a [book release guide](https://github.com/ropensci/dev_guide/issues/152) - a guide for shepherding a new version of the developer guide - which culminates in this blog post!

### Guide tweaks

The developer guide now lives at <https://devguide.ropensci.org/>, its very own subdomain!

We fixed formatting of Appendices B-D in the PDF version of the book (see PDF button in the navbar) with [an issue](https://github.com/ropensci/dev_guide/issues/179) by [Indrajeet Patil](https://github.com/IndrajeetPatil).

For book contributors, we've update [instructions in the README](https://github.com/ropensci/dev_guide#notes-for-associate-editors) for rendering the developer guide locally (<https://github.com/ropensci/dev_guide/issues/192>).

[Hugo Gruson][hugog] helped us with a number of things: added a note for package maintainers about the [importance of GitHub recognizing your repository as the language R](https://github.com/ropensci/dev_guide/pull/172), and helped us [update links to `https` from `http`](https://github.com/ropensci/dev_guide/pull/167).

### Conclusion

In this post we summarized the changes incorporated into our book ["rOpenSci Packages: Development, Maintenance, and Peer Review"](https://devguide.ropensci.org/) over the last four months. We are grateful for all contributions that made this release possible. If _you_ have any feedback about the book, head to [the issue tracker](https://github.com/ropensci/dev_guide/issues/)!  We are already working on updates for our next version, such as [documenting R6 objects](https://github.com/ropensci/dev_guide/issues/189), [guidance on package citations](https://github.com/ropensci/dev_guide/issues/115), and [adding more content for the security chapter](https://github.com/ropensci/dev_guide/issues/154). Check out the [the issue tracker](https://github.com/ropensci/dev_guide/issues/) if you'd like to contribute.

[pkgdown]: https://github.com/r-lib/pkgdown
[bowerbird]: https://github.com/ropensci/bowerbird
[rodev]: https://github.com/ropensci/rodev
[usethis]: https://github.com/r-lib/usethis
[hugog]: /authors/hugo-gruson/
