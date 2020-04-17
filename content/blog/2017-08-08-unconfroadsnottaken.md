---
slug: unconfroadsnottaken
author:
  - Noam Ross
topicid: 814
date: '2017-08-08'
tags:
  - community
  - meetings
  - R
  - software
  - unconf
  - unconf17
title: 'Unconf 2017: The Roads Not Taken'
---

Since June, we have been highlighting the [many projects] that emerged from this year's [rOpenSci Unconf]. These projects start many weeks before unconf participants gather in-person. Each year, we ask participants to propose and discuss project ideas ahead of time in a [GitHub repo]. This serves to get creative juices flowing as well as help people get to know each other a bit through discussion.

This year wasn't just our biggest unconf ever, it was the biggest in terms of proposed ideas! We had more proposals than participants, so we had a great pool to draw from when we got down to work in L.A. Yet many good ideas were left on the cutting room floor. Here we highlight some of those ideas we didn't quite get to. Many have lots of potential and we hope the R and rOpenSci communities take them up!

### API Interfaces

-   Many of our data access packages interface with web APIs, and our community has some ideas on how to [make these easier] and [improve testing] of these types of packages.
-   Both [Amazon Web Services] and [Google Cloud] APIs already have API wrappers, but in other languages (e.g., Java, Go), that could be wrapped to make R packages.

### Development tools

-   There were lots of ideas of how to extend package testing and test coverage, such as measuring [how much of package code is documented] in examples and vignettes, and unit testing for and test coverage [for imported functions], to make sure package dependencies are behaving as expected. Also, improving frameworks for [performance testing], so as to measure performance improvement or regression as an R package develops.
-   Documentation and discoverability are always close to our hearts, so it is no surprise we had proposals to [promote more linkages in package metadata], [more package-level man pages], [richer HTML help pages], and of course, [badges]!
-   The RStudio crowd has some ideas to [make autocompletion extensible]
-   A tool for [reminding people about deadlines].


### Data Access

-   We've got a lot of folks who are interested in lakes and two ideas for [accessing] [lake data].
-   Despite having five [NASA datanauts] at the unconf, we didn't get around to making [this package to access NASA data].
-   Utility rates are a messy kind of data that could use [open data standards].
-   [Historical correspondence data] would be really cool to have available through an R data package.


### Reproducibility
-   There are some thorny issues around [namespacing] and [provenance] that could use some attention.
-   Integrating testing into scripts is a topic of much interest to the community, with recent packages like [assertr] and [testrmd], but what about creating field-specific test standards, like [assertions for biological data]?

### Training

-   There are a lot of topics out there that could use good tutorials and training approaches, like [software licensing], getting involved in a [GitHub projects] (perhaps by addressing [first-timer issues]), or learning good coding [patterns] and [antipatterns]

### Publishing

-   How should R users handle [reviewing and commenting] R-Markdown documents.
-   What's the right [blend] of vignettes, R markdown templates, and parameterized reports for getting new learners up and running?
-   One of the things we hope to do more of is enable scientists to publish and get credit for their software and data. How about [automating software citation], or packages for auto-submission to [software] or [data] journals?

### It's Your Turn

Interested in pursuing one of these ideas? Pick up on the discussion in the project's [GitHub repo] and the friendly people there will welcome your contributions!

  [many projects]: /blog/2017/06/08/unconf_recap_4
  [rOpenSci Unconf]: /blog/2017/06/02/unconf2017
  [GitHub repo]: https://github.com/ropensci/unconf17/issues
  [Amazon Web Services]: https://github.com/ropensci/unconf17/issues/14
  [Google Cloud]: https://github.com/ropensci/unconf17/issues/70
  [how much of package code is documented]: https://github.com/ropensci/unconf17/issues/2
  [for imported functions]: https://github.com/ropensci/unconf17/issues/3
  [performance testing]: https://github.com/ropensci/unconf17/issues/90
  [Reviewing and commenting]: https://github.com/ropensci/unconf17/issues/86
  [lake data]: https://github.com/ropensci/unconf17/issues/21
  [NASA datanauts]: https://open.nasa.gov/explore/datanauts/
  [this package to access NASA data]: https://github.com/ropensci/unconf17/issues/67
  [open data standards]: https://github.com/ropensci/unconf17/issues/94
  [Historical correspondence data]: https://github.com/ropensci/unconf17/issues/79
  [namespacing]: https://github.com/ropensci/unconf17/issues/22
  [provenance]: https://github.com/ropensci/unconf17/issues/23
  [assertions for biological data]: https://github.com/ropensci/unconf17/issues/37
  [good R programming patterns]: https://github.com/ropensci/unconf17/issues/75
  [software licensing]: https://github.com/ropensci/unconf17/issues/32
  [GitHub projects]: https://github.com/ropensci/unconf17/issues/45
  [first-timer issues]: https://github.com/ropensci/unconf17/issues/47
  [patterns]: https://github.com/ropensci/unconf17/issues/75
  [antipatterns]: https://github.com/ropensci/unconf17/issues/26
  [automating software citation]: https://github.com/ropensci/unconf17/issues/24
  [software]: https://github.com/ropensci/unconf17/issues/46
  [data]: https://github.com/ropensci/unconf17/issues/87
  [promote more linkages in package metadata]: https://github.com/ropensci/unconf17/issues/41
  [more package-level man pages]: https://github.com/ropensci/unconf17/issues/44
  [richer HTML help pages]: https://github.com/ropensci/unconf17/issues/83
  [badges]: https://github.com/ropensci/unconf17/issues/58
  [blend]: https://github.com/ropensci/unconf17/issues/51
  [make autocompletion extensible]: https://github.com/ropensci/unconf17/issues/52
  [make these easier]: https://github.com/ropensci/unconf17/issues/85
  [improve testing]: https://github.com/ropensci/unconf17/issues/25
  [accessing]: https://github.com/ropensci/unconf17/issues/42
  [reminding people about deadlines]: https://github.com/ropensci/unconf17/issues/59
  [assertr]: /blog/2017/04/11/assertr
  [testrmd]: https://github.com/ropenscilabs/testrmd
