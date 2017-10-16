---
name: first-package-review
layout: post_discourse
title: "So you (don't) think you can review a package"
date: 2017-08-22
authors:
  - name: Mara Averick
    url: http://maraaverick.rbind.io
categories:
  - blog
topicid: 838
tags:
- R
- review
- visdat
- community
- package
---

Contributing to an open-source community _without_ contributing code is an oft-vaunted idea that can seem nebulous. Luckily, putting vague ideas into action is one of the strengths of the [rOpenSci Community](https://ropensci.org/community/), and their package onboarding system offers a chance to do just that.

This was my first time reviewing a package, and, as with so many things in life, I went into it worried that I'd somehow ruin the package-reviewing process— not just the package itself, but the actual onboarding infrastructure...maybe even rOpenSci on the whole.

Barring the destruction of someone else's hard work and/or an entire organization, I was fairly confident that I'd have little to offer in the way of useful advice. _What if I have absolutely nothing to say other than, yes, this is, in fact, a package?!_

![rOpenSci package review: what I imagined](http://i.imgur.com/np59m8Z.png)

So, step one (for me) was: confess my inadequacies and seek advice. It turns out that much of the advice vis-à-vis _how to review a package_ is baked right into the documents. The [reviewer template](https://github.com/ropensci/onboarding/blob/master/reviewer_template.md) is a great trail map, the utility of which is fleshed out in the [rOpenSci Package Reviewing Guide](https://github.com/ropensci/onboarding/blob/master/reviewing_guide.md). Giving these a thorough read, and perusing a recommended review or two (links in the reviewing guide) will probably have you raring to go. But, if you're feeling particularly neurotic (as I almost always am), the rOpenSci [onboarding editors](https://github.com/ropensci/onboarding#-editors-and-reviewers) and larger community are endless founts of wisdom and resources.

## `visdat` 📦👀

I knew nothing about [Nicholas Tierney](https://github.com/njtierney)'s [`visdat`](http://visdat.njtierney.com/) package prior to receiving my [invitation to review](https://github.com/ropensci/onboarding/issues/87#issuecomment-270428584) it. So the first (coding-y) thing I did was play around with it in the same way I do for other cool R packages I encounter. This is a totally unstructured mish-mash of running examples, putting my own data in, and seeing what happens. In addition to being amusing, it's a good way to sort of "ground-truth" the package's mission, and make sure there isn't some super helpful feature that's going unsung.

If you're _not_ familiar with `visdat`, it "provides a quick way for the user to visually examine the structure of their data set, and, more specifically, where and what kinds of data are missing."[^1] With early-stage EDA (exploratory data analysis), you're really trying to get a _feel_ of your data. So, knowing that I couldn't be much help in the _"here's how you could make this faster with C++"_ department, I decided to fully embrace my role as _"naïve user"_.[^2]

#### Questions I kept in mind as <del>myself</del>  resident naïf:

* What did I think this thing would do? Did it do it?
* What are things that scare me off?

The latter question is key, and, while I don't have data to back this up, can be a sort of "silent" usability failure when left unexamined. Someone who tinkers with a package, but finds it confusing doesn't necessarily stop to give feedback. There's also a pseudo _curse-of-knowledge_ component. While messages and warnings are easily parsed, suppressed, dealt with, and/or dismissed by the veteran R user/programmer, unexpected, brightly-coloured text can easily scream _Oh my gosh you broke it all!!_ to those with less experience.

## Myriad lessons learned 💡

I can't speak for Nick per the utility or lack thereof of my review (you can see [his take here](https://ropensci.org/blog/blog/2017/08/22/visdat), but I _can_ vouch for the package-reviewing experience as a means of methodically inspecting the innards of an R package. Methodical is really the operative word here. Though _"read the docs,"_ or _"look at the code"_ sounds straight-forward enough, it's not always easy to coax oneself into going through the task piece-by-piece without an end goal in mind. While a desire to contribute to open-source software is noble enough (and is how I _personaly_ ended up involved in this process-- with some help/coaxing from [Noam Ross](https://twitter.com/noamross)), it's also an abstraction that can leave one feeling overwhelmed, and not knowing where to begin.[^3]

There are also [self-serving bonus points](https://github.com/ropensci/onboarding#why-review-packages-for-ropensci) that one simply can't avoid, should you go the rOpenSci-package-reviewing route-- especially if package development is new to you.[^4] Heck, the [package reviewing guide](https://github.com/ropensci/onboarding/blob/master/reviewing_guide.md) alone was illuminating.

Furthermore, the wise-sage 🦉 [rOpenSci onboarding editors](https://github.com/ropensci/onboarding#associate-editors)[^5] are excellent matchmakers, and ensure that you're actually reviewing a package authored by someone who _wants_ their package to be reviewed. This sounds simple enough, but it's a comforting thought to know that your feedback isn't totally unsolicited.

[^1]: Yes, I'm quoting my own review.

[^2]: So, basically just playing myself... Also I knew that, if nothing more, I can proofread and copy edit.

[^3]: There _are_ lots of good resources out there re. overcoming this obstacle, though (e.g. [First Timers Only](http://www.firsttimersonly.com/); or [Charlotte Wickham](https://twitter.com/cvwickham)'s [Collaborative Coding](http://cwick.co.nz/talks/collab-code-user17/#/) from useR!2017 is esp. 👍 for the R-user).

[^4]: OK, so I don't have a parallel world wherein a very experienced package-developer version of me is running around getting _less_ out of the process, _but_ if you already deeply understand package structure, you're unlikely to stumble upon quite so many basic "a-ha" moments.

[^5]: 👋 [Noam Ross](https://github.com/noamross), [Scott Chamberlain](https://github.com/sckott), [Karthik Ram](https://github.com/karthik), & [Maëlle Salmon](https://github.com/maelle)
