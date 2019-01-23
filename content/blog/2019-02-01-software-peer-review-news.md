---
slug: software-review-news
title: 'rOpenSci Software Peer Review: Still Improving'
date: 2019-02-01
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

rOpenSci's [suite of packages](/packages/) is comprised of contributions from staff engineers and the wider R community, bringing considerable diversity of skills, expertise and experience to bear on the suite. How do we ensure that every package is held to a high standard? That's where our software review system comes into play: packages contributed by the community undergo a **transparent, constructive, non adversarial and open review process**. For that process relying mostly on **volunteer work**, _[associate editors](/about#team)_ manage the incoming flow and ensure progress of submissions; _authors_ create, submit and improve their package; *[reviewers](https://ropensci.github.io/dev_guide/#reviewers)*, two per submission, examine the software code and user experience.

We are quite proud of our Software Peer Review system and do our best improving it over time. In this post, we summarize some of the more important  recent changes to Software Peer Review at rOpenSci. The most recent information can always be found at https://ropensci.org/software-review/.

### A new and clearer name

Up until December, our system was called _rOpenSci onboarding_ which was short but potentially misleading given the general understanding of "onboarding" as adding new employees or volunteers to an organization. We switched to _rOpenSci Software Peer Review_ which shows the system draws elements from both _Peer Review_ as known in academia, and _Software Review_ as known in software development. The discussion about the name change started [in July 2017](https://github.com/ropensci/software-review-meta/issues/11); we're glad to have finally done it!

### A landing page on our website

We used to refer to Software Peer Review's GitHub repository when mentioning the system, which was [not optimal](https://github.com/ropensci/software-review-meta/issues/16). There is now a [dedicated page on our website](/software-review/), at the moment explaining the motivation and principles of the system, and providing related links.

### Four new editors

{{< figure src="/img/blog-images/2019-02-01-software-review-news/team.png" caption="Editorial team. From left to right and top to bottom: Brooke Anderson, Scott Chamberlain, Anna Krystalli, Lincoln Mullen, Karthik Ram, Noam Ross, Maëlle Salmon, Melina Vidoni." alt="Editorial team. From left to right and top to bottom: Brooke Anderson, Scott Chamberlain, Anna Krystalli, Lincoln Mullen, Karthik Ram, Noam Ross, Maëlle Salmon, Melina Vidoni." >}}

Since our [last post about updates in the system in September 2017](/blog/2017/09/11/software-review-update/), the editorial team has doubled in size to handle all incoming submissions whilst not over-assigning editors. We are delighted to have welcomed Anna Krystalli, Lincoln Mullen, Brooke Anderson and Melina Vidoni. Thanks to them for joining us! Read more [about Anna and Lincoln](/blog/2018/06/22/new_editors/) and about Brooke and Melina (soonish?).

### We wrote a book

{{< figure src="/img/blog-images/2019-02-01-software-review-news/guide.png" alt="Screenshot from our online book" width="700" >}}

Our guidance for authors, reviewers and editors used to be scattered over single Markdown files in the Software Peer Review GitHub repository, which was getting impractical as these files got bigger, and which was not giving a great reading experience to anyone. We have therefore consolidated all our guidance to [a book](https://ropensci.github.io/dev_guide/) created with `bookdown`. Its source is [stored on GitHub](https://github.com/ropensci/dev_guide). It is divided in three sections: 

* [One about our guidelines and tips for package development](https://ropensci.github.io/dev_guide/building.html), useful to read for any package developer.

* [One about the Software Peer Review system itself](https://ropensci.github.io/dev_guide/softwarereviewintro.html), including guidance for the different actors of the system.

* [One about package maintenance](https://ropensci.github.io/dev_guide/collaboration.html), including a chapter about changing stuff in your package, one about GitHub grooming, etc. This section, too, may be useful for any package developer.

This blog post marks the official release of our guide, whose updates are tracked [via a NEWS appendix](https://ropensci.github.io/dev_guide/booknews.html). The next big update won't be about packaging guidelines though: we're working on adding a cover to the online book with Locke Creatives.

### Recent changes in our standards

We have completed and improved our standards for package development.

As regards testing,

* Our guide now clearly states [conditions in which to add continuous integration for Windows CI](https://ropensci.github.io/dev_guide/ci.html#whichci)
* We now do not only recommend `httr` but also `crul` and `curl` over `RCurl` for [HTTP requests](https://ropensci.github.io/dev_guide/building.html#recommended-scaffolding) and suggest using the rOpenSci packages `vcr` and `webmockr` for testing.
* We have added a rule of thumb for package coverage: "Test coverage below 75% will likely require additional tests or explanation before being sent for review." on top of stating that it is best practice when all key functionalities are tested.
* We now require that packages with Shiny apps use a unit-testing framework such as [`shinytest`](https://github.com/rstudio/shinytest) to test that interactive interfaces behave as expected.

As regards documentation,

* We now demand the [use of `codemetar` to create a codemeta.json file of package metadata at the root of the package repository](https://ropensci.github.io/dev_guide/building.html#creating-metadata-for-your-package). 
* We now recommend [using a structure for the release notes, and recommend to call it NEWS.md rather than NEWS](https://ropensci.github.io/dev_guide/releasing.html#news)
* We [encourage the use of repostatus.org badges](https://ropensci.github.io/dev_guide/building.html#readme).
* [Using `roxygen2` for documenting packages is now an explicit requirement](https://ropensci.github.io/dev_guide/building.html#documentation), as is documenting the returning type of a function. 

We have also made these updates about package building.

* We have made it explicit that packages should run on all major platforms: Windows, macOS, Linux. Exceptions may be granted packages that interact with system-specific functions, or wrappers for utilities that only operate on limited platforms, but authors should make every effort for cross-platform compatibility, including system-specific compilation, or containerization of external utilities.
* Our guidance now states that argument naming and order should be consistent across functions that use similar inputs.

Of particular interest are also these changes to our policies and process.

* We have added an [explicity policy about conflict of interests for reviewers and editors](https://ropensci.github.io/dev_guide/policies.html#coi).
* We have added expected timelines to the reviewer, author and editor guides, for instance editors are expected to perform editor checks within 5 working days.
* We've extended [our scope](https://ropensci.github.io/dev_guide/policies.html#aims-and-scope) to include packages that wrap utility programs used for scientific research.

Our policies and guidance have always been fluid, but as a result, keeping track of changing policy and package-building guidance has been challenging for authors and reviewers. With the release of developers guide, changes to requirements will be tracked in our [`NEWS`](https://ropensci.github.io/dev_guide/booknews.html) chapter, and we will be moving to quarterly releases of updates.

### Other smaller updates

#### Issue templates

{{< figure src="/img/blog-images/2019-02-01-software-review-news/issue_templates.png" alt="Screenshot of issue template selection" width="700" >}}

When [clicking on "new issue" in the Software Peer Review Github repository](https://github.com/ropensci/software-review/issues/new/choose), one gets to choose between submission, pre-submission and feature request/bug report.

{{< figure src="/img/blog-images/2019-02-01-software-review-news/submission.png" alt="Screenshot of submission issue template" width="700" >}}

The first two reasons for opening an issue have their own issue template, and the last one guides people towards [our repository aimed at discussion of the system](https://github.com/ropensci/software-review-meta/). We hope it makes it easier to participate.

#### Badge versioning

If ready soon https://github.com/ropensci/software-review-meta/issues/61

## Conclusion

A new name, a bigger team, its own online book... rOpenSci  Software Peer Review had an eventful year and a half! We thank all package authors and reviewers for their hard work and [welcome suggestions and questions about the system](https://github.com/ropensci/software-review-meta/issues).
