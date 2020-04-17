---
date: '2018-01-29'
slug: rse-maëlle-salmon
title: Introducing Maëlle Salmon, rOpenSci’s new Research Software Engineer
author:
  - Stefanie Butland
  - Scott Chamberlain
  - Maëlle Salmon
topicid: 1044
tags:
  - community
  - interviews
  - staff
---
We’re very pleased to be introducing someone who needs no introduction in the R community. Join us in welcoming Maëlle Salmon to rOpenSci as a Research Software Engineer (part time, working from Nancy, France). We’d like to formally introduce her here and share a bit about the kinds of things she’ll be working on.

Maëlle did a B.Sc. in Biology with an emphasis on maths and quantitative work, two Masters degrees - one in Ecology and one in Public Health -  and a Ph.D. in epidemiological statistics at the Ludwig-Maximilian University in Germany. Her thesis dealt with statistical algorithms for aberration detection in time series of counts of reported cases of infectious diseases. Most recently, Maëlle worked as a data manager and statistician for the [CHAI project](http://www.chaiproject.org/). Maëlle has contributed [six packages](https://github.com/ropensci/onboarding/issues?q=is%3Aissue+author%3Amaelle+is%3Aclosed+label%3Apackage) to rOpenSci to date, and has written about two of them, [`ropenaq`](/blog/2017/02/21/ropenaq/) and [`rtimicropem`](/blog/2017/08/29/rtimicropem/) for our guest blog series about onboarded software.

You might know Maëlle from [her popular blog](https://masalmon.eu/) in which she identifies and tackles a data science question, writes about her approach and shares her solution. Or you might recognize her from [Twitter](https://twitter.com/ma_salmon) where she draws attention to interesting people and posts, and points people to R packages that address their needs. Maëlle co-founded the R-Ladies Barcelona chapter of [R-Ladies](https://rladies.org/), a world-wide organization to promote gender diversity in the R community, and she co-manages [R-ladies Global Twitter account](https://twitter.com/rladiesglobal) . She is a team member of [R Weekly](https://rweekly.org/), contributing to content curation of their newsletter and is also on the program committee of the [French R conference](https://r2018-rennes.sciencesconf.org/).

We talked with Maëlle to learn more about her, how she first encountered rOpenSci, her role on the editorial board and what her work with rOpenSci will entail.

{{< figure src="/img/blog-images/2018-01-29-rse-maelle-salmon/maelle-salmon.jpg" alt="Maëlle Salmon" width=250 class="pull-left" >}}

> Let my toolset change your mindset about your dataset

### Q: How did you first get into R/programming?

All my research internships included some kind of coding which I chose after realizing I don’t like lab work. I first started using R about ten years ago during my biology Bachelors degree where we were also taught about LaTeX and Linux, and I started contributing to a package as part of my Ph.D. I really liked R from the beginning. My ‘aha’ moment was realizing that if you wanted to do a 3-D plot, you could google that and do it in R based on documentation you’d find. I had had Matlab classes before, but at that time my other classes were intense and I had little time. I was more relaxed when I started learning R and thus had a lot of time to just explore.

### Q: What would you say is your R expertise?

I’m a statistician! And I’m really good at making the most of what already exists.

### Q: How did you hear about rOpenSci?

One weekend in 2016 I was googling ways to download scientific literature metadata in R and I discovered the rOpenSci website and thought it looked like an awesome project. I even saw there was an onboarding system where you could submit your package for review and make it part of the suite. So when I wrote the `ropenaq` package later that same year, I submitted it.

### Q: Can you describe your work as a volunteer Editor for rOpenSci software review?

I first contributed to onboarding by making a few pull requests, like [adding information](https://github.com/ropensci/onboarding/pull/59) to the [guidelines](https://github.com/ropensci/onboarding/blob/master/packaging_guide.md) based on my own experience as a newbie submitter/reviewer. In parallel, I’ve had several packages reviewed. In February 2017, Scott [Chamberlain] reached out to me and asked me if I was interested in becoming an [Editor](https://github.com/ropensci/onboarding#-editors-and-reviewers), which I accepted without any hesitation since I enjoyed and cared about onboarding so much.

As an Editor, once assigned to a submission, I install packages and test them locally, and then look for suitable reviewers with a focus on diversity of reviewers and reviewers skills, before making sure the review process progresses -- that includes nagging people sometimes. When inviting new reviewers sometimes I mentor them, pointing them at useful resources. We have a rolling editor-in-chief role (editors take turns quarterly) which consists of following [incoming issues in the repo](https://github.com/ropensci/onboarding/issues) and discussing fit when necessary. Furthermore, I sometimes see a package that looks suitable for onboarding, for instance on Twitter, in which case I reach out to the author to encourage them to submit.

*(Scott’s note: she’s a great editor in chief)*

### Q: Do you get anything out of all the work you do on your advocacy activities?

I enjoy it, the actual activity and the people I get to interact with, and that’s the main reason I do it. You get to engage with nice people all over the world. Interactions with other R-Ladies are fantastic. I also find it useful and meaningful. But if you really want me to mention other gains: through this, for example, I got invited to [SatRday in Cape Town](https://capetown2018.satrdays.org/), where I’ll give a workshop about R package development and a keynote about the rOpenSci onboarding system. 

### Q: Why do you blog?

I met Julia Silge, whose blog I knew and enjoyed a lot, at [unconf16](https://unconf16.ropensci.org/). I discussed blogging with her and it helped motivate me to start blogging as a way to open opportunities. I had produced and tweeted some fun visualizations so my first blog posts were directed to that, for instance [this one about place names in France](https://masalmon.eu/2017/01/24/kervillebourg/). I like playing with data and writing per se but it’s also incredibly satisfying to get it out there and see people starting conversations with you. For example when I did the [post about random seeds](https://www.masalmon.eu/2017/04/12/seeds/), people started telling me what [their random seeds](https://twitter.com/ma_salmon/status/852225247935946753) were.

### Q: What will you be working on as an rOpenSci research software engineer?

I’ll start by getting a better overview of all rOpenSci packages by looking at some metrics like code coverage over all of them, which will help set priorities for my working on test suites and tutorials and help inspire blog posts. I’m excited to start writing posts featuring rOpenSci packages to help people see the potential of all these tools. One area I’ll be particularly active in is our EML (Ecological Metadata Language) tooling which I’m excited to see expanding. I’ll also work on improving infrastructure and tools for the onboarding system. I’m definitely not going to get bored and am looking forward to start working!
