---
slug: "covid-19-open-data"
title: Levaraging open data for research
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
The Covid-19 pandemic has changed all of our lives. For students in particular, field and lab observation may not be possible right now, making it impossible to collect the data you were planning to use for your thesis. However, if you have internet service, it may still be possible to conduct scientific research based on the massive amounts of open data that are available.

Open data is becoming an important part of modern research. Many scientific fields have discovered the value of sharing data to better understand and reproduce results, build upon each other’s work, and get a higher return on investment for data collection efforts. Extensive tools and databases have become available to publish and retrieve all sorts of scientific data, which allow for performing additional analyses or combining data from multiple sources, leading to new insights or better results.

Learning about what open data is available in your field and how to take advantage of it can be a valuable research experience. It may not be the same as collecting your own data, but there are also benefits. Maybe you could access much more data than you would otherwise, allowing for advanced analysis methods to test a complex hypothesis. Or perhaps you get involved with colleagues from another institution who have provided the data, or are researching the same topic and are interested in your findings. But how do you get started? Where to look for data that may be interesting to your research? How to access it, and give proper credit?

### Open Data at rOpenSci

rOpenSci packages make open data easy to incorporate into your reproducibile R workflow. What R packages do we have and how much and what data do they provide? We'll answer these questions below.

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
