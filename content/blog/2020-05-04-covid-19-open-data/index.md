---
slug: "covid-19-open-data"
title: rOpenSci tools to access a world of open data for your research project
author:
  - Maëlle Salmon
  - Stefanie Butland
  - Karthik Ram
  - Noam Ross
  - Mark Padgham
  - Jeroen Ooms
  - Carl Boettiger
  - Scott Chamberlain
date: 2020-05-04
tags:
  - packages
  - R
  - community
  - reproducibility
  - data
  - data-access
  - open-data
description: "Covid-19 and Open Data from rOpenSci."
# twitterImg: blog/2019/06/04/post-template/name-of-image.png
---

The Covid-19 pandemic has changed all of our lives. For many students, the lab or field research that they had planned for their dissertation may not be possible right now, stalling progress of their studies. However, if you have internet service, it may still be possible to conduct scientific research based on the massive amounts of open data that are available.

In this post we highlight the possibilities of open data for academic research, and illustrate with a few rOpenSci packages that access open data from R. We hope specifically to inspire students and their advisers to consider exploring what open data has to offer in their field, and if it could be an option to continue making progress on their research during these uncertain times.


### Exploring Open Data

Open data is becoming an important part of modern research. Many scientific fields have discovered the value of sharing data to better understand and reproduce results, build upon each other’s work, and get a bigger return on investment for collecting the data. Extensive tools and databases have become available to publish all sorts of scientific data, allowing for additional analysis or combining data from multiple sources, which leads to new insights and more reliable results.

Learning about the open data that is available in your field and how to take advantage of it can be a valuable research experience in itself. Sure it may not be the same as collecting your own data, but there are also major benefits to shared data: you can probably access much larger datasets than you would collect yourself, which allows for advanced analysis methods or test complex hypotheses. And perhaps you get end up connecting with colleagues from another institution who provide the data, or are working on the same topics and are interested in your findings.

So maybe there are opportunities to take advantage of readily available open data for your disseratation topic. But how do you get started? Where to look for data that may be interesting to your research? What format is it stored in? Which tools are needed to retrieve and open the data? How to evaluate if the data is trustworth, and how to give proper credit?

Perhaps you are the first in your research group to explore open data, and your adviser does not have the answer to these questions. But if you know a bit of R, rOpenSci is a good place to start. We have over 120 data-access packages for R, which are contributed by fellow researchers, and provide well tested tooling to access various kinds of public data repositories. Many of these packages are surrounded by a community of fellow users that may be able to answer your questions or at least point you in the right direction when you get stuck.



### A lot of data

<!-- Below we'll cover a variety of research areas (see _Thematic Areas_),  -->

rOpenSci packages give R users access to a whole lot of data. For illustrative purposes, here are a few of the packages we have covering a variety of different thematic areas:

Biology

* [rentrez][]/[phylotaR][]/[biomartr][]: very brief description of data size
* [rgbif][]: very brief description of data size
* [taxize][]: very brief description of data size

Social science

* [essurvey][]: very brief description of data size
* [comtradr][]: very brief description of data size

Climate/Spatial

* [MODIStsp][]: very brief description of data size
* [rnoaa][]: very brief description of data size

Chemistry

* [webchem][]: very brief description of data size

Economics

* [skynet][]: very brief description of data size


### Thematic Areas

We've invited some rOpenSci community members to summarize packages for accessing open data in each of a number of thematic areas. The thematic areas are: water, Antarctica, ecology, biodiversity, taxonomy, space and weather, and text-mining.

_for each thematic area:_

### Water

**Author**: Jane Doe

some text ... (max 1000 characters?)

## This is where you come in

We want graduate students, postdocs, and their advisors to see real life success stories where publications have come out of using open data (_as a chapter that's part of a lab or field research thesis? have to clearly frame the niche - what kinds of examples do we NOT want?_) 
**Are you an academic - advisor or advisee** - who has used one or more of these data sources in your research?
Comment on this post to share your story or add it to our [discussion forum use cases category][]. 

**Need help?** (_need to say what kind of help here?_)
Ask your question in our [discussion forum packages category][]. 
If your question is about a specific package, add the package name as a tag. 
(_need to clarify use of questions vs packages categories_)

**What’s missing?** Is there an data source you need to access programmatically but there’s no R package to do that? 
We want to build robust tools for things people actually need. Add your request to our wishlist. 
(_need to have wishlist ready for this. Stef to follow up_)

**Do you maintain one of these tools?** 
Comment on this post to tell people more, point to tutorials or a blog post about it, or let them know where they can ask you questions.

**Are you developing an R package to access an open data source** and you’d like people to know about it?
Post to our [discussion forum packages category][].
Consider submitting the package for [software peer review][].



[biomartr]: https://docs.ropensci.org/biomartr
[rentrez]: https://docs.ropensci.org/rentrez
[phylotaR]: https://docs.ropensci.org/phylotaR
[rgbif]: https://docs.ropensci.org/rgbif
[rebird]: https://docs.ropensci.org/rebird
[auk]: https://docs.ropensci.org/auk
[MODIStsp]: https://docs.ropensci.org/MODIStsp
[rnoaa]: https://docs.ropensci.org/rnoaa
[rcrossref]: https://docs.ropensci.org/rcrossref
[webchem]: https://docs.ropensci.org/webchem
[taxize]: https://docs.ropensci.org/taxize
[skynet]: https://docs.ropensci.org/skynet
[essurvey]: https://docs.ropensci.org/essurvey
[comtradr]: https://docs.ropensci.org/comtradr
[software peer review]: https://devguide.ropensci.org/
[discussion forum packages category]: https://discuss.ropensci.org/c/packages/
[discussion forum use cases category]:https://discuss.ropensci.org/c/usecases/
