---
slug: mchtoolbox
title: Exploring ways to address gaps in maternal-child health research
author:
  - Monica Gerber
  - Jennifer Thompson
  - Jenny Draper
  - Kyle Hamilton
  - Charles T. Gray
date: '2018-07-05'
topicid: 1249
tags:
  - R
  - packages
  - community
  - unconf
  - unconf18
---

It’s easy to come to a conference and feel intimidated by the wealth of knowledge and expertise of other attendees. As Ellen Ullman, a software engineer and writer describes,[^1] 

> I was aware at all times that I had only islands of knowledge separated by darkness; that I was surrounded by chasms of not-knowing, into one of which I was certain to fall.

One of the best ways to start feeling less intimidated is to start talking to others. Ullman continues,

> I learned I was not alone. I met a postdoctoral student in computer science at Berkeley. I talked with him about my islands, the darkness, the fear. He answered without hesitations: ‘Oh, I feel that way all the time.’

At rOpenSci unconf18, we learned that it’s ok to feel like you don’t know everything -- indeed, that’s how just about everyone feels! In fact, being willing to share your expertise from your island of knowledge and communicating with other people who have their own islands of expertise is one part of what makes a [community](/blog/2017/06/23/community/). 

Here’s a short story of about what we learned about sharing knowledge and building community at #runconf18.

### Look for the gaps

The first step to bridging your island is figuring out what problems exist. They probably exist on other islands too. And a good project doesn’t have to connect all the islands - building one bridge can have a big impact. What is the one little thing in your workflow that annoys you? What’s preventing you from doing reproducible research? Is there something that will [make your life easier in the long run](/blog/2018/04/12/ijtiff/) but you’ve been putting it off?

### Our motivation

We aimed to build a package that addresses a gap in the workflow of researchers working in maternal and child health: Reference data from representative populations is used in maternal and child health research and public health surveillance to calculate percentiles, z-scores, and related values. This is important for measures that naturally change over the lifespan, such as body mass index and blood pressure. Because code to calculate these quantities - if it exists! - may be only available in SAS (which is not freely available to all researchers), or is scattered among a few disconnected R packages, it can be difficult to calculate these variables and incorporate them into an R-centric workflow. We wanted to create something that would close this gap. As we formed project teams for the unconf, we were convinced that this project would be something we could create within the scope of the unconf that would tangibly benefit others.

{{< tweet 999274443707891719 >}}


### Using runconf to learn how to collaborate

If you’re an [isolated data scientist](https://peerj.com/preprints/3160/) or if you tend to develop analyses on your own, collaboration usually consists of documenting your code and using Git/GitHub so future you knows what past you was up to. Using version control on your own is a great place to begin if you haven’t tried it before, and is fairly straightforward. However, we rapidly discovered that working collaboratively on GitHub  can get quite complicated when you have 5 people sitting around a table contributing to a code base in real time, and some changes in git workflow habits may be required! Thanks to the community and environment rOpenSci intentionally creates at the unconf, we had a short crash course from Jenny Bryan in [happy git with R](https://happygitwithr.com/) and the `usethis` package, and help from Maëlle Salmon on setting up continuous integration, giving us a solid workflow for software development as we move forward. It can be a pretty big leap stepping into a highly collaborative project for the first time -- expect there to be challenges and absolutely don’t be afraid to ask for help! 

### Rapid prototypes / explorations

Contributing to open source can be intimidating if you feel like you need to build a perfect package that will solve a problem immediately, but it’s equally valuable to build a rapid prototype or exploration of how you want to go about solving the problem that you identified. Sharing a prototype allows you to  start a conversation with others facing the same challenges, and build connections that can lead to more ideas. Our project prototype at the unconf quickly led to feature requests via Twitter, GitHub comments from researchers who were working in a similar space, and involvement from others who found our project and offered to help. This allowed us to learn more about other efforts to solve the same or similar problems and start to think about how to bridge these efforts.

### Next steps

After the unconf, we were able to write a [round-up of existing packages and resources](http://www.monicagerber.com/2018/07/roundup-of-growth-chart-packages/). We plan to continue working on this problem, in collaboration with several folks who are interested in this space. Our next steps include looking for places where goals and strategies overlap and streamlining our approach to create a useful product for public health researchers. We’d love to have you [join the conversation](https://github.com/ropenscilabs/mchtoolbox/issues).

{{< tweet 998773541242683393 >}}

[^1]: Ullman, Ellen. "Life in Code: A Personal History of Technology." (2017).
