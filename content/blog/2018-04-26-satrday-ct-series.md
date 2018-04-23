---
slug: "satrday-ct-serie"
title: Our package reviews in review: Introducing a 3-post serie about rOpenSci onboarding data
authors:
  - name: Maëlle Salmon
    url: http://www.masalmon.eu/
date: 2018-04-26
categories: blog
topicid: 925
tags:
- r
- community
- software
- review
- onboarding
---

On March the 17th I had the honor to give a keynote talk about rOpenSci onboarding system of packages at the [satRday conference in Cape Town](https://capetown2018.satrdays.org/), entitled "Our package reviews in review: introducing and analyzing rOpenSci onboarding system". You can [watch its recording](https://www.youtube.com/watch?v=lZ3deq52qCk), [skim through the corresponding slides](http://www.masalmon.eu/satrday_keynote/slides) or... read my 3-post series! Well, 4-post series with that one setting the stage.

# What is rOpenSci onboarding?

rOpenSci [suite of packages](https://ropensci.org/packages/) is partly contributed by staff members and partly contributed by community members, which means a great diversity of skills and experience of developers. How to ensure quality for the whole set? That's where onboarding comes into play: packages contributed by the community undergo a transparent, constructive, non adversarial and open review process. For that process relying mostly on volunteer work, four editors manage the incoming flow and ensure progress of submissions; authors create, submit and improve their package; reviewers, two by submission, examinate the software code and interface. [This blog post](https://www.numfocus.org/blog/how-ropensci-uses-code-review-to-promote-reproducible-science/) published by NUMFOCUS is a pretty good introduction to rOpenSci onboarding. 

Technically, we make the most of [GitHub](https://github.com/) infrastructure: each package onboarding process is an issue in the [ropensci/onboarding GitHub repository](https://github.com/ropensci/onboarding/). For instance, click [here](https://github.com/ropensci/onboarding/issues/24) to read the onboarding thread of my `ropenaq` package: the process is an ongoing conversation until acceptance of the package, with two external reviews as important milestones. Furtheremore, we use GitHub features such as the use of issue templates (as submission templates), and such as labelling which we use to track progress of submissions (from editor checks to approval). 

# What is this series?

In my talk in Cape Town, I motivated and presented rOpenSci onboarding system (with the aid of screenshots made in R using the `webshot` and `magick` packages!). I also presented a data collection and analysis of onboarding, which I shall report in three posts. The [first post](https://ropensci.org/blog/2018/04/26/rectangling-onboarding/) in the series will explain how I _[rectangled](https://www.youtube.com/watch?v=GapSskrtUzU) onboarding_. The second post will give some clues as to how to quantify the work represented by rOpenSci onboarding. The third and last post will use tidy text analysis of onboarding threads to characterize the _social weather_ of onboarding. 