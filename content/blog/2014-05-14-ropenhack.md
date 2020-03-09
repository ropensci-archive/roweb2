---
slug: ropenhack
title: rOpenHack report
date: '2014-05-14'
author:
  - Karthik Ram
tags:
  - community
  - events
  - hackathon
  - R
  - ropenhack
  - unconf
  - unconf14
---

The rOpenSci project is a poster child for the fluid collaboration that has become increasingly common these days thanks to platforms like Twitter and GitHub. It has been really inspring to see open discussions take shape as rough ideas, which rapidly turn into prototype research software, all of which are now happening in the order of few days to weeks rather than months to years. The origins of this project itself lead back to a series of serendipitous conversations that occurred over Twitter three years ago. Today we are a rapidly growing community of scientists, students, software developers, and information researchers.

When we wrote our proposal to the Sloan foundation last year, we budgeted a small meeting (hackathon) for the four core developers and a few members of the advisory board members. But pretty early on into our funding cycle, we realized that such a meeting could be far more impactful, both in terms of building community and prototyping software, if we were a lot more inclusive. Thanks to a series of fortuitous circumstances we were able to hold exactly such an event last month.

We held [rOpenHack](https://ropensci.github.io/unconf14/), a coding un-conference at [GitHub's HQ](https://foursquare.com/v/github-hq-30/50f75cc0e4b07201af25590d) in San Francisco from March 30th to April 1st. In addition to the core members, we invited several valuable contributors from the R community and put out an [open call for other to join](/blog/2014/02/10/ropensci-hackathon/). All in all, we had ~ 30 people attend in person with a handful of folks contributing remotely. The attendees were a mix of academics, developers (both industry and non-profit) and several independent scientists, with ~ 40% of the participants being women.

Since this was our first time planning an event like this, we loosely followed an unconference model (similar to Science Online) and asked participants to propose projects on the [hackathon repo](https://github.com/ropensci/hackathon/issues) in advance of the event. This approach was a really great opportunity for folks to identify projects and fellow participants, and allowed us to quickly gauge where there was the most interest. While we didn't work on every single idea over those two days, we did manage to get quite a bit done. Here are some projects where we made a lot of headway:


# What we hacked on

* Gavin Simpson wrote a package called [`Dependencies`](https://github.com/ropensci/dependencies) to track package dependencies (which is still a challenge in R).

* Ciera Martinez, Ben Marwick, Ed Szocs, Juan Batiz-Benet and Jeff Hollister worked on a  comprehensive [reproducibility guide](https://github.com/ropensci/reproducibility-guide).

* Thomas Kluyver from the IPython project (with help from Jeroen Ooms and Ramnath Vaidyanathan) made great headway in finishing up a full iteration of the R kernel (which works great at this writing)

* Martin Fenner, Gavin Simpson and Carl Boettiger built an rOpenSci cookbook of software recipes but this project has much wider applications. Once a few remaining bugs are ironed out, it will be an amazingly cool new knitr plugin for [Jekyll along with a Ruby gem wrapping the knitr R package](https://github.com/ropensci/docs).

* [`testdat`](https://github.com/ropensci/testdat) - An R package to run unit tests (check for missing data, missing dates, bad formatting, outliers, non-ascii characters etc) on tabular data (Karthik Ram, Hilary Parker, Aylssa Frazee, Anya Bida, Dave Harris and Winston Chang)

* A [best practices guide](https://github.com/hadley/httr/blob/master/vignettes/api-packages.Rmd) for working with APIs in R ([Hadley Wickham](http://had.co.nz/)

* [Jure Triglav](https://www.juretriglav.si/) was an awesome remote contributor and built a Ruby gem to [search for citations to R packages](https://github.com/ScienceToolbox/code_citations).

{{< youtube "iUcm5COsKJo" >}}

There were several other really cool projects like a new Git binding for R (by our Swedish collaborator [Stefan Widgren](https://github.com/stewid)), spatial tools (Ramnath Vaidyanathan, Scott Chamberlain, Amelia McNamara, Ian A. Muñoz, and Ted Hart), a text-mining applications from [Carson Sievert](https://cpsievert.github.io/) (see [blog post](/blog/2014/04/16/topic-modeling-in-r/)).

Hosting an event like this in the Bay Area did have other advantages. Given that many of our fantastic colleagues in the larger data science realm were local, we couldn't pass up the opportunity to bring the community together during the event. Thanks to sponsorship from [F100 Research](https://f1000research.com/) and [GitHub](https://github.com/), we invited developers from related projects like IPython and Julia, our friends at various tech companies, data non-profits, and also several PIs from the newly created [Berkeley Institute of Data Science](https://vcresearch.berkeley.edu/datascience/bids-launch-dec-12). The social and dinner was a great opportunity for many of the newer folks to connect but also just another occasion for the community to grow stronger.

It would have been impossible to put together an event like this without the cooperation of several people and organizations. Our funding from the [Sloan Foundation](https://www.sloan.org/) made it possible to fly in several participants and cover most of the event expenses, GitHub ([Arfon](https://github.com/arfon) and [Kelsey](https://github.com/Kelseyschimm)) were fantastic hosts providing us with great space to hack in (and drinks!), and F1000 Research helped us throw together the hugely successful data science social.

Alyssa Frazee wrote a great summary of the event on the [Simply Statistics blog](https://simplystatistics.org/2014/04/10/the-ropensci-hackathon-ropenhack/), and the fine folks at GitHub ([Peter](https://github.com/furyus) and Kevin) with awesome direction from [Dani Traphagen](http://www.dtrapezoid.com/) made a fantastic video of the event. [Check out the video along with a blog post](https://github.com/blog/1840-improving-github-for-science) by GitHub's chief scientist, Arfon Smith.

<!-- Video embed code -->

## What's next on our event calendar?

We're already looking forward to hosting the event again next year (late March 2015) at GitHub, in the very early stages of organizing something similar in London this fall (right around [Mozfest](https://2014.mozillafestival.org/)) and possibly one in Australia in February 2015. So if you live near one of these places and can help organize or sponsor any part of the event, please drop us a note. We would love to hear from you soon. Once we get the logistics and funding sorted out, we'll post a general call for participation with more lead time this year. If you're not already subscribed to our mailing list, this would be the perfect time to do it since we are gearing up for several more events this summer and fall.
