---
slug: topic-modeling-in-R
title: Topic modeling in R
author:
  - Carson Sievert
date: '2014-04-16'
tags:
  - R
  - topic modeling
  - textmining
  - elife
  - unconf
  - unconf14
  - ropenhack
---


_Editor's note: This is the first in a series of posts from rOpenSci's [recent hackathon](https://ropensci.org/blog/2014/05/14/ropenhack//)._

I recently had the pleasure of participating in [rOpenSci's hackathon](https://github.com/ropensci/hackathon/). To be honest, I was quite nervous to work among such notables, but I immediately felt welcome thanks to a warm and personable group. [Alyssa Frazee](http://alyssafrazee.com/) has a [great post summarizing the event](https://simplystatistics.org/2014/04/10/the-ropensci-hackathon-ropenhack/), so check that out if you haven't already. Once again, many thanks to rOpenSci for making it possible!

In addition to learning and socializing at the hackathon, I wanted to ensure my time was productive, so I worked on a mini-project related to my research in text mining. rOpenSci has plethora of [R packages](/packages/) for extracting literary content off the web, including [elife](https://github.com/ropensci/elife), which is a lightweight interface to the [elife API](https://api.elifesciences.org//). This package is not yet available on CRAN, but we can easily install from GitHub thanks to devtools.

#### Installing the package

```
library(devtools)
install_github("ropensci/elife")
library(elife)
```

#### Brief Overview of Topic Models

My research in text mining is focused on a particular type of [topic model](https://en.wikipedia.org/wiki/Topic_model) known as [Latent Dirichlet Allocation](https://en.wikipedia.org/wiki/Latent_Dirichlet_allocation) (LDA). In general, a topic model discovers topics (e.g., hidden themes) within a collection of documents. For example, if a given document is generated from a hypothetical "statistics topic", there might be a 10% chance a given word in that document is "model", a 5% chance that word is "probability", a 1% that word is "algorithm", etc. Whereas, if a document is generated from a hypothetical "computer science topic", there might be a 4% chance a given word in that document is "model", a 2% chance that word is "probability", a 16% that word is "algorithm", etc. In other words, each topic is defined by a probability mass function over each possible word.

LDA takes this example one step further and allows for each document to be generated from a mixture of topics. For example, a particular document could be 60% statistics, 10% computer science, 20% mathematics, etc. Whereas, a different document could be 30% statistics, 30% computer science, 15% mathematics, etc. Within the LDA literature, fitting models to abstracts of academic articles is quite common, so I thought it would be neat to do the same with abstracts from elife articles.

#### Get all the elife abstracts!

In order to grab all the abstracts, first we'll grab all the [DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier) that point to currently available articles. Note that we can do more complicated queries of specific articles with `searchelife` (the `help(searchelife)` page has some nice examples).

```
dois <- searchelife(terms = "*", searchin = "article_title", boolean = "matches")
```

The `dois` can now be used to obtain all sorts of meta data associated with these articles using `elife_doi`. In this case, I just want the abstracts.

```
abs <- sapply(dois, function(x) elife_doi(x, ret = "abstract"))
```

From here, we have what we need to fit the topic model. I don't want to focus on technical details here, but if you are interested in the statistics involved, I recommend reading [my post on xkcd comics](https://cpsievert.github.io/xkcd/). This post also covers the method I use to determine an optimal number of topics. Let's skip to the fun part and jump right into exploring the model output.

The window below is an interactive visualization of the LDA output derived from elife abstracts. The aim of this visualization is to aid interpretation of topics. Topic interpretation tends to be difficult since each topic is defined by a probability distribution with support over many of words. With this interactive visualization, one can focus on the most "relevant" words for any topic by hovering/clicking over the appropriate circle. We will define "relevance" shortly, but for now, go ahead and click on the circle towards the bottom labeled "11".

<a href="https://gallery.shinyapps.io/LDAelife/" target="_blank">Go To Application</a>

</div><div class="col-sm-10 col-lg-10">
<iframe src="https://gallery.shinyapps.io/LDAelife/" width="1200" height = "800"></iframe></div><div class="col-sm-8 col-sm-offset-2">

Now that topic 11 is selected, in the bar chart to the right, we see "relat", "evolut", and "similar" are the top 3 most relevant words. Towards the bottom of the bar chart, we see "resid" which is the 30th most relevant. Note that before the model was fit [stemming](https://en.wikipedia.org/wiki/Stemming) was performed. Thus, a word like "relat" could stand for "relation", "relations", "relationship", etc. You might now be thinking: "That's great, I can see this topic is related to evolutionary biology, but why are these words ranked in this order?"

The topic specific word rankings are determined by a measure known as *relevance*. Relevance is a compromise between the probability of a word given the topic (the width of the red bars) and the probability within topic divided by the overall frequency of the word (the ratio of red to gray). Note the "Value of lambda" slider which controls this compromise. A value of 1 for lambda will rank words solely on the width of the red bars (which tends to over-rank common words). A value of 0 for lambda will rank words solely on the ratio of red to gray (which tends to over-rank rare words). A recent study has shown evidence for an optimal value of lambda around 0.6 which is the default value.

The "topic landscape" on the left-hand side provides a sense of topic similarity by approximating distances between topics. To produce the point locations, pairwise distances between topic specific word distributions are computed according to the currently selected measure in the "Topical Distance Calculation" menu. Those distances are next scaled down to two dimensions using the currently select algorithm in the "Multidimensional Scaling Method" menu. By default, the circle sizes are proportional to the prevalence of each topic in the collection of text.

Hovering over labels on the bar chart allows us to explore different contexts for the same word. Upon hovering over a word, circles in the topic landscape will change according to the distribution over topics for that given word. For example, if we hover over "evolut" (the 2nd most relevant word for topic 11 when lambda is 0.6), we see that it has large mass under topic 11 and 20. If we now click on topic 20, the most relevant words suggest this is a "population genetics" topic. Interestingly, if we hover over "adapt" (the 29th most relevant word for topic 20 when lambda is 0.6), we see that it has large mass under topic 1 and 20. Now, if we hover over topic 1, we see a "general life science" topic.

There are certainly many other things to discover using this interactive visualization. I hope you take the time to explore and leave a comment with findings or questions below. If you are interested in text mining, or open science in general, definitely check out [rOpenSci's R packages](/packages/). If you'd like to make a similar interactive visualization, check out the [LDAvis](https://github.com/cpsievert/LDAvis/) package.
