---
slug: scientific-package-ecosystem
title: rOpenSci Announces a New Award From The Gordon and Betty Moore Foundation to Improve the Scientific Package Ecosystem for R
date: '2019-11-06'
authors:
  - Karthik Ram
categories: blog
topicid: 
tags:
  - grant
  - infrastructure
  - metrics
  - funding
---

Today we are pleased to announce that we have received new funding from the [Gordon and Betty Moore Foundation](https://www.moore.org/initiative-strategy-detail?initiativeId=data-driven-discovery). The $894k grant will help us improve infrastructure for R packages and enable us to move towards a _science first_ package ecosystem for the R community. You may have already noticed some developments on this front when we announced [our automated documentation server](https://ropensci.org/technotes/2019/06/07/ropensci-docs/) back in June. Over the coming months we plan to roll out more tools and services to make it easier to maintain and distribute packages while capturing the impact of such work.


### **Uncovering the Impact of Research Software**

Software pervades all parts of modern scientific research, especially the central, vital activity of data analysis and statistical inference. A large majority of researchers (90–95%) rely on research software for their day to day work, and many (63-70%) say they could no longer continue if such tools were to stop functioning[^1]. Despite the critical role of software in enabling new scientific discoveries, it is still exceedingly difficult for researchers to get credit for such work. Part of this is the challenge of communicating scientific impact of software to academic promotion and tenure committees. We plan to develop a suite of transparent metrics to help researchers document and highlight the impact of their software contributions. Our work will build upon the prototype developed by the [Depsy project](http://depsy.org/). Our goal is to provide metrics that place software work in the appropriate context, uncover software mentions in articles _even when they are not formally cited_, and promote good citation practices. [James Howison](http://james.howison.name/) of UT Austin, who has spent several years developing novel methods to recognize mentions of software in article text, will join us as a key collaborator.  [CiteAs](http://citeas.org/about) will play a key role in serving package citations.

We plan to hire a data scientist to help us draw insights from these package-level metrics, increase the visibility of critical software infrastructure and also help researchers discover new packages and applications.


### **A Developer-Friendly Distribution System**

For nearly a decade, we have accumulated considerable expertise in managing the development of a suite of scientific software packages. We are now ready to extend and generalize various tools and services to make the development process easier for scientific software developers. An important piece will be building out a new package server: a system for hosting CRAN-like package repositories with a range of integrated services such as automated builds, extensive history, and API access to package statistics and metadata. Such as system will make it easy to continuously monitor and ship packages, helping organizations like rOpenSci sustain research software. It will also provide other communities that produce suites of research software the opportunity to experiment with governance and release rules, while making software directly accessible to end-users.

Computational reproducibility will be another vital feature of this infrastructure. By archiving all source and binary artifacts, historic versions of repositories can be automatically recreated. Once operational, a user will be able to quickly restore a workspace from a virtual snapshot of the repository and reproduce scientific results obtained with specific versions of packages.


### **Get involved**

If building any of this infrastructure sounds exciting to you, [we'd love to hear from you! ](https://ropensci.org/contact/)Over the coming weeks we plan to open up a few developer positions (full-time and contract) so stay tuned for those announcements.


## Notes

[^1]:
     [https://zenodo.org/record/843607](https://zenodo.org/record/843607)


