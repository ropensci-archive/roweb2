---
name: software-review-update
layout: post_discourse
title: "rOpenSci Software Review: Always Improving"
date: 2017-09-11
authors:
  - name: Scott Chamberlain
  - name: Maëlle Salmon
    url: http://www.masalmon.eu/
  - name: Noam Ross
    url: http://www.noamross.net/
  - name: Karthik Ram
categories:
  - blog
topicid: 863
tags:
- software
- review
- onboarding
- R
---


The R package ecosystem now contains more than 10K packages, and several flagship packages belong under the rOpenSci suite. Some of these are: [magick][] for image manipulation, [plotly][] for interactive plots, and [git2r][] for interacting with `git`.

rOpenSci is a community of people making software to facilitate open and reproducible science/research. While the rOpenSci team continues to develop and maintain core infrastructure packages, an increasing number of packages in our suite are contributed by members of the extended R community.

In the early days we accepted contributions to our suite without any formal process for submission or acceptance. When someone wanted to contribute software to our collection, and we could envision scientific applications, we just moved it aboard. But as our community and codebase grew, we began formalizing standards and processes to control quality. This is what became our peer review process.  You can read more about it in our recent [blog post][nfpost].

As our submissions have grown over the past couple of years, our standards around peer review have also changed and continue to evolve in response to changing community needs and updates to the R development infrastructure.

Although a large number of packages submitted to CRAN could also be part of rOpenSci, our submissions are limited to packages that fit our mission and are able to pass a stringent and time intensive review process.

Here, we summarize some of the more important changes to peer review at rOpenSci over the past year.  The most recent information can always be found at <https://onboarding.ropensci.org/>.

### We've Expanded Our Scope

Our [Aims and Scope][aims] document what types of packages we accept from community contributors. The scope emerges from three main guidelines. First, we accept packages that fit our mission of enabling open and reproducible research. Second, we only accept packages that we feel our editors and community of reviewers are competent to review. Third, we accept packages for which we can reasonably endorse as improving on existing solutions.  In practice, we don't accept  general packages. That's why, for instance, our "data munging" category only applies to packages designed to work with specific scientific data types.

We've refined our focal areas from

* **data retrieval**
* **data visualization**
* **data deposition**
* **data munging**
* **reproducibility**

to

* **data retrieval** - packages for accessing and downloading data from online sources with scientific applications
* **data deposition** - packages that support deposition of data into research repositories, including data formatting and metadata generation
* **data munging** - packages for processing data from formats mentioned above
* **data extraction** - packages that aid in retrieving data from unstructured sources such as text, images and PDFs, as well as parsing scientific data types and outputs from scientific equipment
* **database access** - bindings and wrappers for generic database APIs
* **reproducibility** - tools that facilitate reproducible research
* **geospatial data** - accessing geospatial data, manipulating geospatial data, and converting between geospatial data formats
* **text analysis** (pilot) - we are piloting a sub-specialty area for text analysis which includes implementation of statistical/ML methods for analyzing or extracting text data

You will note that we've removed data visualization. We've had some truly excellent data visualization packages come aboard, starting with [plotly].  But since then we've found data visualization is too general a field for us to confidently evaluate, and at this point have dropped it from our main categories.

We've also added geospatial and text analysis as areas where we accept packages that might seem more general or methods-y than we would otherwise.  These are areas where we've built, among our staff and reviewers, topic-specific expertise.

Given that we accept packages that improve on existing solutions, in practice we generally avoid accepting more than one package of similar scope. We've also added [clarifying language][over] about what this entails and how we define overlap with other packages.

We now strongly encourage [pre-submission inquiries][presub] to quickly assess whether the package falls into scope. Some of these lead to suggesting the person submit their package, while others are determined out-of-scope. This reduces effort on all sides for packages that be out-of-scope. Many authors do this prior to completing their package so they can decide whether to tailor their development process to rOpenSci.

To see examples of what has recently been determined to be out-of-scope, see the [out-of-scope label][outofscope] in the onboarding repository.

As always, we'd like to emphasize that even when packages are out-of-scope, we're very grateful that authors consider an rOpenSci submission!

### Standards changes

Our [packaging guide][pg] contains both recommended and required best practices. They evolve continually as our community reaches consensus on best practices that we want to encourage and standardize. Here are some of the changes we've incorporated in the past year.


* We now encourage using a `object_verb()` function naming scheme to avoid namespace conflicts.
* We now encourage functions to facilitate piping workflows if possible. We don't have an official stance on using pipes in a package.
* We've clarified and filled out README recommendations
* Documentation: we now recommend inclusion of a package level manual file, and at least one vignette.
* Testing: we clarify that packages should pass `devtools::check()` on all major platforms, that each package should have a test suite that covers all major functionality.
* Continuous integration (CI): we now require that packages with compiled code need to run continuous integration on all major platforms; integrate reporting of test coverage; include README badges of CI and coverage.
* We've clarified our recommended scaffolding suggestions around XML to be more nuanced. Briefly, we recommend the `xml2` package in general, but `XML` package may be needed in some cases.
* We added a section on CRAN gotchas to help package maintainers avoid common pitfalls encountered during CRAN submission.

Standards changes often take place because we find that both editors and reviewers are making the same recommendations on multiple packages.  Other requirements are added as good practices become accessible to the broader community. For instance, CI and code coverage reporting have gone from recommended to required as the tooling and documentation/tutorials for these have made them more accessible.

### Process changes

**Editors**

As the pace of package submissions increases, we've expanded our editorial team to keep up. [Maëlle Salmon][ms] joined us in February, bringing our [team to four](https://github.com/ropensci/onboarding#-editors-and-reviewers). With four, we need to be more coordinated, so we've moved to a system of a rotating editor-in-chief, who makes decisions about scope, assigns handling editors, and brings up edge cases for discussion with the whole team.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Welcome <a href="https://twitter.com/ma_salmon">@ma_salmon</a> to our editorial team for open peer review of <a href="https://twitter.com/hashtag/rstats?src=hash">#rstats</a> software <a href="https://t.co/KsL0SF1b6K">https://t.co/KsL0SF1b6K</a> 1/2</p>&mdash; rOpenSci (@rOpenSci) <a href="https://twitter.com/rOpenSci/status/832228045587099649">February 16, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

The process our editors follow is summarized in our [editors' guide][eg], which will help bring editors up to speed when we further expand our team.

**Automation**

As submissions increase, the entire process benefits more from automation. Right now most steps of the review system are manual - we aim to automate as much as possible. Here's a few things we're doing or planning on:

1. With every package submission, we run [goodpractice][gp] on the package to highlight common issues. We do this manually right now, but we're working on an automated system (aka, bot) for automatically running `goodpractice` on submissions and reporting back to the issue. Other rOpenSci specific checks, e.g., checking rOpenSci policies, are likely to be added in to this system.
2. Reminders: Some readers that have reviewed for rOpenSci may remember the bot that would remind you to get your review in. We've disabled it for now - but will likely bring it back online soon. Right now, editors do these reminders manually.
3. On approval, packages go through a number of housekeeping steps to ensure a smooth transfer. Eventually we'd like to automate this process.

**Other changes**

- [JOSS](http://joss.theoj.org/) harmonization/co-submission: For authors wishing to submit their software papers to the Journal of Open Source Software after acceptance, we have also begun streamlining the process. Editors check to make sure that the paper clearly states the scientific application, includes a separate `.bib` file and that the accepted version of the software is deposited at Zenodo or Figshare with a DOI. Having these steps completed allows for a fast track acceptance at JOSS.
- Reviewer template and guide: We now have a [reviewer template][revtemp] - making reviews more standardized, and helping reviewers know what to look for. In addition, we have an updated reviewer guide that gives high level guidance, as well as specific things to look for, tools to use, and examples of good reviews. In addition, the guide gives guidance on how to submit reviews.
- Badges: We now have badges for rOpenSci review. The badges show whether a package is under review or has been approved. Packages that are undergoing review or have been approved can put this badge in their README.

    [![](http://badges.ropensci.org/86_status.svg)](https://github.com/ropensci/onboarding/issues/86)
    [![](http://badges.ropensci.org/116_status.svg)](https://github.com/ropensci/onboarding/issues/116)


---



Get in touch with us on Twitter ([@ropensci](https://twitter.com/ropensci), or in the comments) if you have any questions or thoughts about our software review policies, scope, or processes.

To find out more about our software review process join us on the next [rOpenSci Community Call][cc]

We hope to see you soon in the onboarding repository as a [submitter](https://github.com/ropensci/onboarding/issues/new) or as a [reviewer](https://ropensci.org/onboarding/)!





[nfpost]: https://www.numfocus.org/blog/how-ropensci-uses-code-review-to-promote-reproducible-science/
[rostatspost]: https://ropensci.org/blog/blog/2016/03/28/software-review
[cc]: https://ropensci.org/blog/blog/2017/08/31/comm-call-v14
[ms]: http://www.masalmon.eu/
[pkgfit]: https://github.com/ropensci/onboarding/blob/d796e7d197ad6e632ca237cec931420c51766045/policies.md#package-fit
[aims]: https://github.com/ropensci/onboarding/blob/master/policies.md#aims-and-scope
[presub]: https://github.com/ropensci/onboarding/issues?q=is%3Aissue+label%3A0%2Fpresubmission
[pkgoverlap]: https://github.com/ropensci/onboarding/blob/master/policies.md#package-overlap
[outofscope]: https://github.com/ropensci/onboarding/issues?q=is%3Aissue+is%3Aclosed+label%3Aout-of-scope
[gp]: https://github.com/MangoTheCat/goodpractice
[or]: https://github.com/ropensci/onboarding
[magick]: https://github.com/ropensci/magick
[plotly]: https://github.com/ropensci/plotly
[git2r]: https://github.com/ropensci/git2r
[pg]: https://github.com/ropensci/onboarding/blob/master/packaging_guide.md
[eg]: https://github.com/ropensci/onboarding/blob/master/editors_guide.md
[tidyverse]: https://www.tidyverse.org/
[over]: https://github.com/ropensci/onboarding/blob/master/policies.md#package-overlap
[revtemp]: https://github.com/ropensci/onboarding/blob/master/reviewer_template.md
