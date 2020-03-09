---
slug: peer-review-value
title: Where is the value in package peer review?
author:
  - Miles McBain
date: '2018-04-06'
preface: This reflection on the value of package peer review is a cross-post of the
  original that appeared on Miles McBain's [personal blog](https://milesmcbain.xyz)
  on 2018-03-26.
topicid: 1132
tags:
  - R
  - community
  - software
  - Software Peer Review
  - reviewer
---

If you read my [reflection #1 on rOpenSci Onboarding](https://milesmcbain.xyz/ropensci-onboarding1/), then you know I see value in the Onboarding process. A LOT of value even. This post is about where that value lies. 

This question has important corollaries which I will explore here based on my experience as a reviewer of [`bowerbird`](https://docs.ropensci.org/bowerbird/index.html):

1. How is a package peer reviewer's time best spent?
2. When is the best time in a software package's life cycle to undertake peer review?


### Doing a good job
As I've read the growing number of reflective posts by other Onboarding reviewers, I'm struck similarities in our experiences. [Mara Averick](/blog/2017/08/22/first-package-review/), [Verena Haunschmid](/blog/2017/09/08/first-review-experiences/), and [Charles Gray](/blog/2018/03/13/ode-to-testing/) all place emphasis on reviewing from a "user's" perspective. For Mara and Charles, this perspective was used to gain traction after initial nervousness about their ability to do a good job.

I shared these initial butterflies. `bowerbird`'s code base was quite large on the first submission. The code embedded a lot of domain specific API knowledge. It was disorientating and I felt like I was thrashing around stumbling onto issues without undertaking a systematic survey.

Probably recalling Mara's experience, I eventually honed in on the idea that to do a good job, all I had to do was identify things that would hold bowerbird back from being a widely-used and popular package. And the best way to identify these was from the "user's" perspective.

That perspective implied the systematic process that I was seeking. So I started from the typical user entry points - README, vignettes, examples in help files. I went through them and tried to use the functions as suggested to download bulk repository data (`bowerbird`'s usecase). I had success! I uncovered quite a few idiosyncrasies in its API and documentation that created a bumpy ride for a new user. The authors were very good about acknowledging and fixing these.

I did review code as well. But it was a natural part of exploring the behaviour as I followed the documented workflow thread. And If I think about the impact the more technical issues I found had on the package as a whole? It's probably negligible. Sure you can argue the code is a bit more robust, a bit easier to maintain. But it would be hard to justify maintaining code that isn't seeing any use!

I wasn't lucky enough to see Onboarding editor [Maëlle Salmon's](https://twitter.com/ma_salmon) recent hatted [SatRday talk](https://www.youtube.com/watch?v=v7yZ8SvKCwU), but I had to smile when I spotted [this slide in her deck](https://maelle.github.io/satrday_keynote/slides#21):

![Yes indeed!](/img/blog-images/2018-04-06-peer-review-value/what_to_review_for.png)

It seems we agree on the priorities. Maëlle gives technical considerations the lowest value. 

The R community has repeatedly heard [Hadley Wickham](https://twitter.com/hadleywickham) argue that reducing cognitive load is more important than cpu load in *most* analysis scenarios. Following that school of thinking, in a talk called ["If You Build it They Won't Come"](https://twitter.com/jennybryan/status/940701899249954816), Hadley seems to be pushing package developers to focus on making  their packages marketable. The user is very much at the forefront of his development ideology.

It is interesting that Onboarding reviewers like Mara, Charles, and myself all initially assumed a more technical code-driven approach was where the value in peer review came from. Should we be surprised such value arose from the user-driven approach? A user-driven review school seems a logical counterpart to the user-driven development school that has gained popularity in the R community. 

To a software developer, detailed user feedback is an extremely rare and valuable commodity. It's quite amazing to receive it from multiple sources for free. The realisation that this is where the bulk of the value lies has important implications for the scaling of package peer review processes: Veteran UseRs are in much more plentiful supply than veteran package developers.

### Timing it right 
Armed with my user-driven heuristic, it didn't take me long pick up on some of editor [Noam Ross](https://twitter.com/noamross) initial queries and determine  `bowerbird` needed to be split into two packages. The documentation and API struggled to paint separate coherent workflows for two very different classes of user.

Following the split I think the authors began to feel some concern at the scale of the issues emerging in review. They worried aloud they were wasting our time and sought to engage reviewers and editors in a conversation about whether `bowerbird` had been submitted too early in its life cycle. Opinions were split on whether early or late stage review is better. I was very much in favour of early and did not see an issue with `bowerbird` being submitted as it was.

I would argue that under the user-driven school, early has to be better. There is more opportunity to use feedback to inform the package API and workflow. Or stated another way: the value obtained from the peer review is maximised. The maximisation comes at the cost of editor/reviewer time, but so long as expectations and timelines are set appropriately I don't see this as an obstacle. 

Leaving review until late stage allows for the possibility that work done in the name of open source and open science might be wasted to some degree. I see that as tragedy worth avoiding at significant cost.

### Conclusion
A reviewer's time is best spent on the things most impactful on a software package's success. This is an uncontroversial statement. However, the user-driven school of package development & review suggests the things that most impact package success are those that affect the end user - documentation, API, and workflow. It is therefore in improving these things that the bulk of the value in package peer review lies.

Falling out of this discussion are two important take aways from the user-driven school of package peer review:

> 1. As a useR, you are qualified as a potential package reviewer if you have some appreciation for what makes your favourite packages useful.
> 2. As a package author, engage early with a package peer review process if you see value in it, to get the most out of it. This is BEFORE things are 'perfect'.

### Epilogue
[`bowerbird`](https://github.com/ropensci/bowerbird) recently cleared the [review process](https://github.com/ropensci/software-review/issues/139) and obtained Peer Reviewed status. In my biased opinion, the [main vignette](https://ropensci.github.io/bowerbird/articles/bowerbird.html) is one of the best I have read, and a fine example product of the user-driven school I have discussed here. 

Congratulations to the authors [Ben Raymond](https://github.com/raymondben) and [Michael Sumner](https://github.com/mdsumner)!
