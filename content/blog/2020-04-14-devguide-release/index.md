---
slug: "devguide-release"
title: 'rOpenSci Dev Guide 0.4.0: Updates'
author:
  - Maëlle Salmon
  - Brooke Anderson
  - Anna Krystalli
  - Lincoln Mullen
  - Karthik Ram
  - Noam Ross
  - Scott Chamberlain
  - Melina Vidoni
date: 2020-04-14
categories: blog
topicid:
tags:
  - Software Peer Review
  - dev guide
description: "Updates in version 0.4.0 of the online book 'rOpenSci Packages: Development, Maintenance, and Peer Review
rOpenSci Packages: Development, Maintenance, and Peer Review'"
twitterImg: img/blog-images/2019-05-16-dev-guide-update/cover.png
---

rOpenSci Software Peer Review's guidance has been compiled in [an online book](https://devguide.ropensci.org/) for more than one year now. We've just released its fourth version. 
To find out what's new in our dev guide 0.4.0, you can [read the changelog](https://devguide.ropensci.org/booknews.html), 
or this blog post for more digested information.

> Note that, as indicated in the [README of the software review repo](https://github.com/ropensci/software-review), in the interest of reducing load on reviewers and editors as we manage the COVID-19 crisis, rOpenSci is temporarily pausing new submissions for software peer review for 30 days (and possibly longer). Please check back [in the software review repository](https://github.com/ropensci/software-review) again after 17 April for updates. In this period new submissions will not be handled, nor new reviewers assigned. Reviews and responses to reviews will be handled on a ‘best effort’ basis, but no follow-up reminders will be sent.

### Policy and governance changes

Some aspects of the software review process changed.

#### Policy changes

We've added field and laboratory reproducibility tools as a category in [scope](https://devguide.ropensci.org/policies.html#aims-and-scope). 
_Packages that improve reproducibility of real-world workflows through standardization and automation of field and lab protocols, such as sample tracking and tagging, form and data sheet generation, interfacing with laboratory equipment or information systems, and executing experimental designs. (Example: [baRcodeR](https://docs.ropensci.org/baRcodeR/))_

{{< tweet 1183811515067043840 >}}

Our [reviewer guide](https://devguide.ropensci.org/reviewerguide.html) now includes guidance for off-thread interactions. We're glad for community building but don't want any important information to get lost.
_If you interact with the package authors and talked about the review outside a review thread (in chats, DMs, in-person, issues in the project repository), please make sure that your review captures and/or links to elements from these conversations that are relevant to the process._

Another change linked to policy is that we clarified our advice related to rOpenSci's Code of Conduct.
This Code of Conduct applies automatically to all rOpenSci repositories so maintainers should not include a Code of Conduct to avoid conflict. This way the [default `CODE_OF_CONDUCT.md` of the rOpenSci GitHub organization](https://github.com/ropensci/.github/blob/master/CODE_OF_CONDUCT.md) will be picked up by GitHub in e.g. new issues.
We recommend authors to add the following text to the package README:

```markdown
Please note that this package is released with a [Contributor Code of Conduct](https://ropensci.org/code-of-conduct/). 
By contributing to this project, you agree to abide by its terms.
```

#### New ethics guidance

Our polices now feature [our expectations regarding "Ethics, Data Privacy and Human Subjects Research"](https://devguide.ropensci.org/policies.html#ethics-data-privacy-and-human-subjects-research).

#### Submission form amendments

Our [issue template for submissions](https://github.com/ropensci/software-review/blob/master/.github/ISSUE_TEMPLATE/A-submit-software-for-review.md) now:

* explicitly mentions [roxygen2](https://roxygen2.r-lib.org/). Prospective submitters, note that if you used to write documentation the hard way, you can convert it using [rd2roxygen]( https://yihui.org/rd2roxygen/).

* explicitly mentions the packaging guide and guide for authors

* asks whether the submitted package is intended to go on Bioconductor, similar to what's asked for CRAN.

#### Editor guidance

We've updated the [Editor-in-chief role description](https://devguide.ropensci.org/editorguide.html#eicchecklist) to better describe current practice, and to add guidance for when inviting [guest editors](https://devguide.ropensci.org/softwarereviewintro.html#editors-and-reviewers). 
tl;dr: editors trust the EiC.
 
We've improved the [guidance for the editor in charge of a dev guide release](https://devguide.ropensci.org/editorguide.html#bookrelease). Quite meta indeed!
 
#### How (not) to acknowledge rOpenSci

Packages that have been reviewed can [include reviewers as authors](/blog/2018/03/16/thanking-reviewers-in-metadata/) and their README features a peer-review badge. 
We've removed the requirement to add the rOpenSci footer, especially as it's not used on [deployed documentation websites that automatically get the same footer as our website](/technotes/2019/06/07/ropensci-docs/).
We've also [removed the suggestion to add a mention of rOpenSci in the Description field of DESCRIPTION](https://github.com/ropensci/rodev/issues/39).

### New security guidance

Our dev guide always has had a chapter called ["Package Development Security Best Practices"](https://devguide.ropensci.org/package-development-security-best-practices.html) but it used to be quite empty. 
We've now added more guidance about secrets and package development, including links to useful resources.
 
For further discussion on the same topic, see [this vcr issue about making tests pass in PRs in the absence of necessary secrets](https://github.com/ropensci/vcr/issues/137).

### Package documentation

#### Documentation 

The ["Documentation" section of the packaging guide](https://devguide.ropensci.org/building.html#documentation) now references the new R6 support in roxygen2 and features slightly changed advice on documentation re-use: we added a con (_On the other hand, it means the docs are not readable "in-source" since they're in another file._); the guidance now mentions [`@includeRmd`](https://roxygen2.r-lib.org/articles/rd.html#including-external--rmd-md-files) and [`@example`](https://blog.r-hub.io/2020/01/27/examples/#how-to-write-examples); we've corrected the location of [Rmd fragments](https://www.garrickadenbuie.com/blog/dry-vignette-and-readme/).

#### Documentation website

All rOpenSci packages now have [a documentation website that's centrally built](/technotes/2019/06/07/ropensci-docs/).
We've added [some elements helping package maintainers](https://devdevguide.netlify.com/building.html#website):

* [improved guidance regarding the replacement of "older" pkgdown website links and source](https://devguide.ropensci.org/approvaltemplate.html).

* add package logo guidance. _To use your package logo in the pkgdown homepage, refer to [`usethis::use_logo()`](https://usethis.r-lib.org/reference/use_logo.html). If your package doesn't have any logo, the [rOpenSci docs builder](#docsropensci) will use rOpenSci logo instead._

* *If your package vignettes need credentials (API keys, tokens, etc.) to knit, you might want to [precompute them](/technotes/2019/12/08/precompute-vignettes/) since credentials cannot be used on the docs server.*

* How to use of [MathJax](https://www.mathjax.org/) with rotemplate, thanks to [Hugo Gruson](https://github.com/Bisaloo).

* A mention that all rOpenSci docs websites automatically have search enabled using [Algolia](https://www.algolia.com). See e.g. [`pdftools` website](https://docs.ropensci.org/pdftools/).

### Misc

#### CRAN gotchas

We've added two [CRAN gotchas](https://devguide.ropensci.org/building.html#crangotchas). It's especially nice that those were contributed by package authors to lessen the probability of other authors' missing details of the policies. The gotchas are:

* _In both the `Title` and `Description` fields, the names of packages or other external software must be quoted using single quotes (e.g., *'Rcpp' Integration for the 'Armadillo' Templated Linear Algebra Library*)._  Thanks [Aaron Wolen](https://github.com/aaronwolen).

* *Do not put 'in R' or 'with R' in your title as this is obvious from packages hosted on CRAN. If you would like this information to be displayed on your website nonetheless, check the [pkgdown documentation](https://pkgdown.r-lib.org/reference/build_home.html#yaml-config-home) to learn how to override this.* Thanks [Hugo Gruson](https://github.com/Bisaloo).

#### Forum guidance

We've clarified how to use rOpenSci forum in the [collaboration guide](https://devguide.ropensci.org/collaboration.html) and in the chapter about [marketing your package](https://devguide.ropensci.org/marketing.html).

#### Package dependencies

We've added advice on specifying dependency minimum versions and on Bioconductor dependencies in [the section about package dependencies](https://devguide.ropensci.org/building.html#package-dependencies).

### Meta: changes in deployment

#### GitHub actions

We've started using [GitHub Actions instead of Travis for deployment](https://help.github.com/en/actions).[^1] We've got three workflows:

* whenever there's a push to master, the book is built in a `_book` folder whose content is then pushed to the `gh-pages` branch that's the source for [our production book](https://devguide.ropensci.org).

* whenever there's a push to dev, the book is built in a `_book` folder whose content is then pushed to the `dev-site` branch that's the source for our [dev book](https://devdevguide.netlify.com).

* whenever there's a commit in a PR from the same repo i.e. not a fork, the book is built, deployed to Netlify, and the details page of a PR check run allows to find the preview URL. Getting the preview for any PR was the main motivation for our exploring a different deploy method. 

If you want to know more about GitHub Actions for R, we recommend [Jim Hester's RStudio conf talk](https://resources.rstudio.com/rstudio-conf-2020/azure-pipelines-and-github-actions-jim-hester) and [Emil Hvitfeldt's thorough walkthrough "Deploy your bookdown project to Netlify with Github Actions"](https://www.hvitfeldt.me/blog/bookdown-netlify-github-actions/). You can also explore [our (probably improvable) workflows](https://github.com/ropensci/dev_guide/tree/dev/.github/workflows).
 
#### URL checking

Our [script checking URLs](https://github.com/ropensci/dev_guide/blob/master/inst/book_grooming.R) now uses [commonmark](/technotes/2018/09/05/commonmark/) instead of regular expressions. If you're interesting in programmatic URL cleaning, you can also read [the recent rOpenSci tech note about cleaning a website URLs with R](/technotes/2019/12/19/urls-tidying/).

#### Conclusion

In this post we summarized the changes incorporated into our book ["rOpenSci Packages: Development, Maintenance, and Peer Review"](https://devguide.ropensci.org/) over the last six months. We are grateful for all contributions that made this release possible. 
Although our release frequency has now slowed down, we are already working on updates for our next version, such as [how to permit multiple documentation websites for development vs release versions of a package](https://github.com/ropensci/dev_guide/issues/200). 
Check out the [the issue tracker](https://github.com/ropensci/dev_guide/issues/) if you'd like to contribute.

[^1]: We first explored this for [our blog guide](/blog/2020/04/07/bookdown-learnings/#5-how-to-deploy-a-preview-of-the-book-for-pull-requests).
