---
slug: altmetrics-conf
title: Altmetrics workshop recap
date: '2013-10-15'
author:
  - Scott Chamberlain
tags:
  - R
  - altmetrics
---

I attended the recent [ALM Workshop 2013][almworkshop] and [data challenge][datachal] hosted by Public Library of Science (PLOS) in San Francisco. The workshop covered various issues having to do with altmetrics, or article-level metrics (ALM). The same workshop last year definitely had a feeling of **we don't know x, y, and z**, while the workshop this year felt like we know a lot more. There were many great talks - you can see the list of speakers [here][talks]. I was there representing rOpenSci as altmetrics is one of the types of data for which we make R libraries ([rAltmetric][raltmetric] for Altmetric.com data, and [alm][alm] for the PLOS altmetrics data).

### Some sad and good news about open source

In a related meeting before the ALM Workshop, NISO held a 1 day meeting to talk about altmetrics standards - check out the talks and some video [here][niso]. One of the points Cameron Neylon made was a sad one => "...basic principle of scholarly publishing industry: no one will use anything built by another publisher" (quote around 2:04:45). PLOS makes great open source software for collecting and providing altmetrics via an API (see the output [here] and the feely available code [here][almcode]), but no other publishers will use it. During [my talk][talk] titled *Programmatic access for Altmetrics*, I suggested that we can learn something from the open source community in that you can create a lot of value off of a common set of open source tools. The Public Knowledge Project (PKP) is using the PLOS created ALM app for publishers they interact with, which is promising. However, other publishers could leverage this software as well, providing easy access to altmetrics data to the publisher, and the community if they expose their API.

### More uptake of our software

We have working on an R library (uncreatively named `alm`) to interact with the PLOS ALM API. Get it [at CRAN][almcran], or from Github [here][almgit]. The awesome thing about anyone that uses the ALM software made by PLOS is that our package works out of the box for the new data source. All you have to do is change the base url in a function call. The url for the PLOS ALM API is http://alm.plos.org/api/v3/articles - changing that url is all that's needed:

```r
alm(doi=<doi>, url=<theurl>)
```

Juan Alperin of PKP had installed the ALM software for a set of journals they work with, and during the data challenge on Saturday was able to interact with his altmetrics data using the alm package by simply changing the base url.

Hopefully more publishers will start using the PLOS ALM open source software - and they can use our software off the shelf.

### Reproducible altmetrics research

[My talk][talk] made the point that **programmatic access** to **OPEN** altmetrics data is important. Although most of the calls to get altmetrics data may come frome websites, it's important to provide programmatic access to altmetrics data for researchers, journalists, and anyone else that doesn't want to use the browser-excel-SAS-SigmaPlot-Word workflow. We don't want altmetrics to end up like text-mining data, do we?

[almworkshop]: https://www.lagotto.io/workshop_2013//
[datachal]: https://almdatachallenge.eventbrite.com/
[talks]: http://www.lagotto.io/workshop_2013/-preliminary-program/
[niso]: https://www.niso.org/topics/tl/altmetrics_initiative/
[talk]: https://scotttalks.info/plosalm13//#1
[almapp]: http://alm.plos.org/
[almcode]: https://github.com/articlemetrics/alm
[almcran]: https://cran.r-project.org/web/packages/alm/index.html
[almgit]: https://github.com/ropensci/alm
[raltmetric]: https://github.com/ropensci/raltmetric
[alm]: https://github.com/ropensci/alm
