---
slug: nceas-codefest-follow-up
title: NCEAS Codefest Follow-up
date: '2014-09-23'
author:
  - Scott Chamberlain
  - Ted Hart
tags:
  - R
  - conference
---

The week after labor day, we had the pleasure of attending the [NCEAS open science codefest](https://nceas.github.io/open-science-codefest/) event in Santa Barbara. It was great to meet folks like the new arrivals at the expanding [Mozilla Science Lab](https://mozillascience.org), [Bill Mills](https://twitter.com/billdoesphysics) and [Abby Cabunoc](https://twitter.com/abbycabs) (Bill even already has a great [post up about the codefest](https://mozillascience.org/worries-critical-mass/)), and see old friends from NCEAS and DataONE, among many more. This 2.5 day event ran smoothly thanks to the leadership of [Matt Jones](https://www.nceas.ucsb.edu/~jones/). The event was run in [unconference style](https://en.wikipedia.org/wiki/Unconference). Each idea was then posted up on a giant post it on the wall and people had  30 minutes to wander the room choosing projects. The approach allowed for a consensus based filtering of ideas. We had the opportunity to suggest some ideas, and a chance to help out with others. Here's an overview of the projects the rOpenSci team worked on and what we accomplished at the open science codefest.

1. [rdataone](https://github.com/dataoneorg/rdataone) - R client for the [DataONE](https://www.dataone.org/) [API](http://mule1.dataone.org/ArchitectureDocs-current/apis/) that is native to R and doesn't rely on Java libraries. We were able to implement some of the many API methods in the package which is still in active development.
2. open science in ecology manuscript - A publication on the state of open science in ecology, and a guide for ecologists wanting to practice open science.  We contributed to the text of the manuscipt and used some of the rOpenSci package suite to generate figures.
3. [coverage extraction](https://github.com/ropensci/mdextract) - A package to extract coverage (temporal, spatial, taxonomic) metadata from datasets.  This package will be integrated with a variety of other packages such as [EML](https://github.com/ropensci/EML) and [spocc](https://github.com/ropensci/spocc), facilitating the creation of metadata. We were able to implement many of the components, and just need to tie it all together in a consistent data model.
4. [pangear](https://github.com/ropensci/pangaear) - An R client to interact with the [Pangaea database](https://www.pangaea.de/)
5. [datapackage](https://github.com/ropensci/datapackage) - An R package to create and read data packages (similar to [OKFN's data packages](https://data.okfn.org/doc/data-package))

One great thing about this event was mixing more experienced programmers with less experienced ones. In addition to making software, there was a fair amount of training going on. For example, a few people were interested in how to make an R package, so we went through the whole process with [pangear](https://github.com/ropensci/pangaear), and now we have [5 awesome contributors on the package](https://github.com/ropensci/pangaear/graphs/contributors). Overall we had a great time, were able to begin some new projects, and contribute to some important existing ones. We hope to continue to build out what we started at codefest and integrate it into our existing tool set and workflows.
