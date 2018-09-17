---
slug: unconfroadsnottaken
authors:
  - name: Noam Ross
    url: https://twitter.com/noamross
categories: blog
topicid: 814
date: '2017-08-08'
tags:
  - community
  - meetings
  - R
  - rOpenSci
  - software
  - unconf
  - unconf17
title: 'Unconf 2017: The Roads Not Taken'
---

Since June, we have been highlighting the [many projects](https://ropensci.org/blog/blog/2017/06/08/unconf_recap_4) that emerged from this year's [rOpenSci Unconf](https://ropensci.org/blog/blog/2017/06/02/unconf2017). These projects start many weeks before unconf participants gather in-person. Each year, we ask participants to propose and discuss project ideas ahead of time in a [GitHub repo](https://github.com/ropensci/unconf17/issues). This serves to get creative juices flowing as well as help people get to know each other a bit through discussion.

This year wasn't just our biggest unconf ever, it was the biggest in terms of proposed ideas! We had more proposals than participants, so we had a great pool to draw from when we got down to work in L.A. Yet many good ideas were left on the cutting room floor. Here we highlight some of those ideas we didn't quite get to. Many have lots of potential and we hope the R and rOpenSci communities take them up!

## API Interfaces

- Many of our data access packages interface with web APIs, and our community has some ideas on how to [make these easier](https://github.com/ropensci/unconf17/issues/85) and [improve testing](https://github.com/ropensci/unconf17/issues/25) of these types of packages.
- Both [Amazon Web Services](https://github.com/ropensci/unconf17/issues/14) and [Google Cloud](https://github.com/ropensci/unconf17/issues/70) APIs already have API wrappers, but in other languages (e.g., Java, Go), that could be wrapped to make R packages.

## Development tools

- There were lots of ideas of how to extend package testing and test coverage, such as measuring [how much of package code is documented](https://github.com/ropensci/unconf17/issues/2) in examples and vignettes, and unit testing for and test coverage [for imported functions](https://github.com/ropensci/unconf17/issues/3), to make sure package dependencies are behaving as expected. Also, improving frameworks for [performance testing](https://github.com/ropensci/unconf17/issues/90), so as to measure performance improvement or regression as an R package develops.
- Documentation and discoverability are always close to our hearts, so it is no surprise we had proposals to [promote more linkages in package metadata](https://github.com/ropensci/unconf17/issues/41), [more package-level man pages](https://github.com/ropensci/unconf17/issues/44), [richer HTML help pages](https://github.com/ropensci/unconf17/issues/83), and of course, [badges](https://github.com/ropensci/unconf17/issues/58)!
- The RStudio crowd has some ideas to [make autocompletion extensible](https://github.com/ropensci/unconf17/issues/52)
- A tool for [reminding people about deadlines](https://github.com/ropensci/unconf17/issues/59).

## Data Access

- We've got a lot of folks who are interested in lakes and two ideas for [accessing](https://github.com/ropensci/unconf17/issues/42) [lake data](https://github.com/ropensci/unconf17/issues/21).
- Despite having five [NASA datanauts](https://open.nasa.gov/explore/datanauts/) at the unconf, we didn't get around to making [this package to access NASA data](https://github.com/ropensci/unconf17/issues/67).
- Utility rates are a messy kind of data that could use [open data standards](https://github.com/ropensci/unconf17/issues/94).
- [Historical correspondence data](https://github.com/ropensci/unconf17/issues/79) would be really cool to have available through an R data package.

## Reproducibility

- There are some thorny issues around [namespacing](https://github.com/ropensci/unconf17/issues/22) and [provenance](https://github.com/ropensci/unconf17/issues/23) that could use some attention.
- Integrating testing into scripts is a topic of much interest to the community, with recent packages like [assertr](https://ropensci.org/blog/blog/2017/04/11/assertr) and [testrmd](https://github.com/ropenscilabs/testrmd), but what about creating field-specific test standards, like [assertions for biological data](https://github.com/ropensci/unconf17/issues/37)?

## Training

- There are a lot of topics out there that could use good tutorials and training approaches, like [software licensing](https://github.com/ropensci/unconf17/issues/32), getting involved in a [GitHub projects](https://github.com/ropensci/unconf17/issues/45) (perhaps by addressing [first-timer issues](https://github.com/ropensci/unconf17/issues/47)), or learning good coding [patterns](https://github.com/ropensci/unconf17/issues/75) and [antipatterns](https://github.com/ropensci/unconf17/issues/26)

## Publishing

- How should R users handle [reviewing and commenting](https://github.com/ropensci/unconf17/issues/86) R-Markdown documents.
- What's the right [blend](https://github.com/ropensci/unconf17/issues/51) of vignettes, R markdown templates, and parameterized reports for getting new learners up and running?
- One of the things we hope to do more of is enable scientists to publish and get credit for their software and data. How about [automating software citation](https://github.com/ropensci/unconf17/issues/24), or packages for auto-submission to [software](https://github.com/ropensci/unconf17/issues/46) or [data](https://github.com/ropensci/unconf17/issues/87) journals?

<br><br>

## It's Your Turn

Interested in pursuing one of these ideas? Pick up on the discussion in the project's [GitHub repo](https://github.com/ropensci/unconf17/issues) and the friendly people there will welcome your contributions!

