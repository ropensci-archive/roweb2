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
  - Louise Slater
  - Robin Lovelace
  - Ben Marwick
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


### Exploring open data

Open data is becoming an important part of modern research. Many scientific fields have discovered the value of sharing data to better understand and reproduce results, build upon each other’s work, and get a bigger return on investment for collecting the data. Extensive tools and databases have become available to publish all sorts of scientific data, allowing for additional analysis or combining data from multiple sources, which leads to new insights and more reliable results.

Learning about the open data that is available in your field and how to take advantage of it can be a valuable research experience in itself. Sure it may not be the same as collecting your own data, but there are also major benefits to shared data: you can probably access much larger datasets than you would collect yourself, which allows for advanced analysis methods or test complex hypotheses. And perhaps you get end up connecting with colleagues from another institution who provide the data, or are working on the same topics and are interested in your findings.

So maybe there are opportunities to take advantage of readily available open data for your disseratation topic. But how do you get started? Where to look for data that may be interesting to your research? What format is it stored in? Which tools are needed to retrieve and open the data? How to evaluate if the data is trustworthy, and how to give proper credit?

Perhaps you are the first in your research group to explore open data, and your adviser does not have the answer to these questions. But if you know a bit of R, rOpenSci is a good place to start. We have over 120 data-access packages for R, which are contributed by fellow researchers, and provide well tested tooling to access various kinds of public data repositories. Many of these packages are surrounded by a community of fellow users that may be able to answer your questions or at least point you in the right direction when you get stuck.


### Data sources for your research

We've invited a few university faculty members to highlight some sources of open data for research in their fields. 

#### Water

_from Louise Slater, Sam Zipper, Ilaria Prosdocimi, Sam Albers, Claudia Vitolo_ 

_(this clan collab'd on the paragraph. all are listed as authors of this post. Louise is faculty member, too long to list affils of all here as I do below?)_

In hydrology, there has been a rapid growth in the number of streamflow data archives made publicly available online by countries such as the UK, USA, Greece, and Canada (although most countries sadly do not yet apply an open policy to their hydrological data). The [Task View on Hydrological Data and Modelling][] provides an exciting overview of the most up-to-date R packages that are available for downloading, analysing, and modelling these data. For an overview of the many advantages of using R for hydrological research, see the paper “Using R in Hydrology” [^1]. 

#### Transport

_from Robin Lovelace, University of Leeds_

There has never been a better time for data driven and reproducible transport research. 
The Covid-19 pandemic has disrupted transport patterns worldwide and is leading to major changes that would have impossible just months ago, as outlined in a recent news article titled "World cities turn their streets over to walkers and cyclists". 
There is a wealth of data out there that can be found with careful search queries and many new datasets (like [Uber's micromobility datasets][], released on May 6th) but my starter 5 would be:

- For downloading data representing transport networks, I recommend heading to the [overpass website][] and for R users checking out [osmdata][] and the in-development geofabric (to be renamed) R packages.

- For open origin-destination data there are many resources but the PCT package provides a way to access national-scale datasets quickly from the R command line, as outlined stplanr's [Origin-destination vignette][].

- For road safety data there is a lack of open data in many countries but you can access national road casualty data, with 60+ variables and 100,000+ records each year with the [stats19][] package.

- For links to additional resources I recommend Chapter [12][] of Geocomputation with R and Chapter [11][] on QGIS for tansport researchers

- For inspiration, I recommend checking out the Propensity to Cycle Tool, an interactive free and open web app that is being used to inform active transport investment plans in dozens of cities across the UK (it also has many data download options at zone, route and route network levels): https://www.pct.bike/

#### Antarctic and Southern Ocean

_from Ben Raymond, Australian Antarctic Division and Anton Van de Putte, KU Leuven_

Antarctic science has a strong culture of open data - the Antarctic treaty itself states that scientific observations and results from Antarctica should be openly shared, and the Scientific Committee on Antarctic Research has had an active data management group since the late 1980s. To find Antarctic and Southern Ocean data, search the [Antarctic master directory (metadata catalogue)][] or portals such as [biodiversity.aq][] or the [Southern Ocean Observing System][].


#### Archaeology

_from Ben Marwick, University of Washington_

Research shuddered to a stop in the Geoarchaeology Lab in early March, with UW being one of the first US campuses to switch to remote work. No longer able to go to campus, we turned our attention to more closely study some of the recent publications that have inspired us. Many of our favourite archaeologists openly archive their research datasets on the Open Science Framework data repository, and we have enjoyed using rOpenSci's osfr package to quickly and reproducibly access these materials for in-depth exploration. This enabled us to obtain data rapidly, giving us more time for exploring and testing hypotheses, and ensuring our students could get to the end of the term ready to share some really interesting results.

_More data-oriented stuff from Ben M in case we want different focus from above_

 >good data sources specific to archaeology include tdar.org and opencontext.org. 

> There is an R pkg for tdar here https://github.com/bocinsky/tdar/ but the number of people using both R and tdar is probably in the single digits (hence the abandoned repo here: https://github.com/ropensci/rtdar) 

> Most archaeologists are using generic repositories such as zenodo, osf, dataverse, etc., because these are free to deposit and the specific archaeology ones are not. 

> I have been using the c14bazAAR package to work with the Australian dataset, if that's useful to know?


#### Ecology

pending


#### Climate and Weather

pending


### A lot of data

<!-- Below we'll cover a variety of research areas (see _Thematic Areas_),  -->

_(do we convert this section to a preface to the table stating estimate of total amount of data accessed by all rOpenSci packages? 1-2 sentences to note some impt thematic areas not addressed by experts above, but not noting the packages since they're in the table?)_

rOpenSci packages give R users access to a whole lot of data. 
For illustrative purposes, here are a few of the packages we have covering a variety of different thematic areas:

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


### This is where you come in

**Are you an academic** - advisor or advisee - who has used one or more of these data sources in your research?
We want others to imagine what's possible by seeing success stories.
Comment on this post to share your story and cite your paper if the work is published.

_(clearly frame the niche - what kinds of examples do we NOT want? open data use as a chapter that's part of a lab or field research thesis?)_ 

**Need help?**
You can find examples of how rOpenSci tools have been used in our [discussion forum use cases category][]. 

Ask questions in our [discussion forum packages category][]. 

_(Stef and Scott to clarify use of questions vs packages categories)_

**What’s missing?** Is there a data source you need to access programmatically but there’s no R package to do that? 
We want to build robust tools for things people actually need. Add your request to our wishlist. 

_(need to have wishlist ready for this. Stef to follow up)_

<!-- **Do you maintain one of these tools?** 
Comment on this post to tell people more, point to tutorials or a blog post about it, or let them know where they can ask you questions. -->

**Are you developing an R package to access an open data source** and you’d like people to know about it?
Post to our [discussion forum packages category][].
Consider submitting the package for [software peer review][].

[^1]: Louise Slater, Guillaume Thirel, Shaun Harrigan, Olivier Delaigue, Alexander Hurley, Abdou Khouakhi, Ilaria Prosdocimi, Claudia Vitolo, and Katie Smith. "Using R in hydrology: a review of recent developments and future directions." Hydrology and Earth System Sciences 23, no. 7 (2019): 2939-2963. https://www.hydrol-earth-syst-sci.net/23/2939/2019/

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
[Task View on Hydrological Data and Modelling]: https://cran.r-project.org/web/views/Hydrology.html
[Uber's micromobility datasets]: https://medium.com/uber-movement/visualizing-micromobility-patterns-across-cities-with-movements-new-mobility-heatmap-16d2960144c0
[overpass website]: https://overpass-turbo.eu/
[osmdata]: https://docs.ropensci.org/osmdata/
[Origin-destination vignette]: https://docs.ropensci.org/stplanr/articles/stplanr-od.html
[stats19]: https://docs.ropensci.org/stats19/
[12]: https://geocompr.robinlovelace.net/transport.html
[11]: https://itsleeds.github.io/QGIS-intro/data-sources-for-transport-data.html
[Antarctic master directory (metadata catalogue)]: https://www.scar.org/data-products/antarctic-master-directory/ 
[biodiversity.aq]: https://data.biodiversity.aq/
[Southern Ocean Observing System]: http://soos.aq/
