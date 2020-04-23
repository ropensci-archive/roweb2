---
slug: rprofile-noam-ross
title: '.rprofile: Noam Ross'
date: '2018-04-13'
preface: In this occasional series, we interview someone using a loosely defined set
  of interview questions for the purpose of demystifying the creative and development
  processes of R community members. This interview was conducted and prepared by Kelly
  O'Briant as part of an rOpenSci unconf17 project.
author:
  - Kelly O'Briant
topicid: 1139
tags:
  - R
  - community
  - interviews
  - rprofile
---

{{< imgtxt src="/img/blog-images/2018-04-13-rprofile-noam-ross/noam-ross.jpg" alt="Noam Ross" >}}

_Dr. Noam Ross [@noamross on Twitter] is a disease ecologist at [EcoHealth Alliance](https://www.ecohealthalliance.org/) in NYC, as well as an editor for rOpenSci. Topics of discussion included Noam's history with R and rOpenSci, working in a team-driven research environment, and inspirations for pushing research processes and rOpenSci projects in exciting new directions._

{{< /imgtxt >}}

---

KO: What is your name, job title, and how long have you been using R?

NR: I'm Noam Ross, I'm a Senior Research Scientist at [EcoHealth Alliance](https://www.ecohealthalliance.org/), a non-profit that works at the intersection of conservation and health. I've done work in R for about 8 years, which is essentially from the start of graduate school (five years) and three years of work.

KO: Did you love it [R] immediately?

NR: No! And I'm mixed on whether I love it now. Ultimately it's using R in the service of the work that I do that I love. It was very frustrating learning R at first. Even eight years ago, the tooling was much much rougher to work with, and R was the first programming language that I used to any significant extent. It took a long time before I was able to express my ideas through code and accomplish the things I do as opposed to fighting with it all the time.

KO: How did you get started with rOpenSci?

NR: [Carl Boettiger](https://twitter.com/cboettig) [one of the rOpenSci co-founders] was my lab mate and he was in his third or fourth year in grad school when I started. He was my example of how to be a grad student. I didn't realize until later that Carl was, as someone once put it, "someone who had drunk all of the kool-aid" in terms of R and also reproducible research, and thus not a typical example! But he was a very good role model and he provided a lot of guidance for my work, and introduced me into the open-source science ecosystem and community. I guess my first real interaction [with rOpenSci] was when he asked me to review an R package. That's when I started really being involved.

KO: Do you have a favorite rOpenSci project you've worked on?

NR: My favorite thing is the onboarding process and peer-review. Most of what I do with rOpenSci is editorial work for that. I've [written](https://www.numfocus.org/blog/how-ropensci-uses-code-review-to-promote-reproducible-science/) and [spoken about it](https://youtu.be/Dc6qnwbJbTU) in a few places. I think it has worked out really well. My hope for it isn't just that it grows, but that we can spin it out and support more groups adopting the process.

KO: What would that look like?

NR: We [rOpenSci] have a limited scope. There are areas of expertise that we, and our network of reviewers have, so we focus on those to have coherent offering and ensure quality. But we don't cover a lot of other areas, such as statistical methods. If someone has a package that implements a new statistical method, we don't review it because our pool of reviewers aren't primarily statisticians. We would love to have a group in a statistical sub-field or other computational sub-fields adopt our process. rOpenSci could support them in setting up a reviewer network and with some of our experience and tooling for managing the process.

KO: Do you have any groups you're currently targeting?

NR: We've started what we're calling a "Special Interest Group" focused on natural language processing and text analysis as an initial test. [Lincoln Mullen](https://lincolnmullen.com/) is our guest editor for that group. If we get a package for that subject area, Lincoln helps us find people who are experts and can review the analysis methods. Plenty of people can handle text data, but in terms of having robust knowledge of the literature for statistics within that, we'd like the right experts to do it.

KO: How long have you been out of grad school now?

NR: Not that long! 18 months? 20 months? Something like that? [Ed: It has now been 32 months. How time flies!]

KO: Oh wow, congratulations! And now that you're out, has your work changed? Do you go to an office, are you working from home?

NR: I went to an office then, I go to an office now. I just go to an office in a different place. I work at a non-profit, EcoHealth Alliance (EHA). It's a much more team-driven environment than academia, but it is still a research-focused organization.  The projects I work on can be data-driven or theory driven, all within the broader span of EHA's work, which includes field ecology, epidemiology and virology. The range of topics is one of the big differences. I used to work on all- theoretical problems; my dissertation had zero data in it. Now I do a lot more statistical modeling. I also work on training and building internal tools.

KO: Are lots of other people on your team using R, or are there other programming languages represented?

NR: We are primarily an R shop on the research side. Our ecologists, phylogeneticists, genomics people and spatial experts all use R. We also have a software and tool development group that builds apps and tools, and they use more python and javascript. They do some machine-learning work, too, and that's where our worlds overlap so there's sharing of tools and methods.

KO: What does your work day look like (or even your ideal work day)? What does the first half hour look like, what does the last half hour look like?

NR: On a day where I'm doing well, I have a task that I've set up the day before. I'll have set up so that I have everything I need to write a function, debug a problem, or do an analysis on data, and I'll try to do that first thing. More often, reading the whole internet and catching up on messages bleeds into that first half hour, but it's what I strive for. I try to do more things that involve writing in the morning, and put meetings, training, and back-and-forth stuff in the afternoon as I get more scatterbrained. It's nice to let tasking be driven by other people rather than myself as the day goes on.

KO: Do you mostly have control over your schedule like that?

NR: Yeah, I mostly do. We have organization-wide and team-wide meetings multiple times a week, but for for the most part I have a lot of control over my schedule on a day-to-day basis.

KO: How does your organization work within the team. Do you have sort of a sprint cycle? Do you get together as a whole organization and plan a trajectory?

NR: We tend to have longer-scale planning and don't really do sprint cycle stuff. Our software development team has more of a distinct Agile setup. Our research team does not. The data collection process tends to take longer, and the analytical stuff tends to have a longer cycle as well. Everyone has 3-4 projects going on at the same time, which have deadlines on the order of months. The flexibility is nice because if you're pushing on research on one project and you hit a wall, you can focus your mind on something else for a while.
When we're doing tasks like internal tool development, then we're able to schedule more rigidly, but the academic research side tends to be much fuzzier. I'd like to do more sprint-cycle driven work and try to push some things that we traditionally think of as unpredictable into that structure to see how well we do. My inspiration for this is [Sandy Griffith's talk from last year's New York R conference](https://youtu.be/5JYiNeWOtuw) - they did the analysis and wrote a paper in two days! That's not going to work for everything; a lot of our challenges are in data acquisition in the field. But I'm hoping we can get more of that style of process into play.

KO: Changing subjects now - are most of your personal projects rOpenSci related? Do you have time for personal projects at all?

NR: I have volunteer projects. I don't really use R for personal stuff. I volunteer for rOpenSci; I'm an editor for packages that come up there. I don't do a lot of package development, [Scott Chamberlain](https://twitter.com/sckottie?lang=en) and [Jeroen Ooms](https://twitter.com/opencpu) churn out most of our internal packages, but sometimes I participate in some of that.
I also volunteer for a voting rights project based in North Carolina called [insightus](https://insight-us.org/) which I actually got introduced to at the last rOpenSci conference by [Elaine McVey](https://twitter.com/eamcvey) who volunteers there as well. It's a neat little group of data-driven activists. So I participate in that and provide jack-of-all-trades support: things like geospatial analysis, voter file analysis, and text processing.
Then there is a grey area of work I do that is useful for my job but could also be potentially useful to the community. I can sometimes take a project developed at work and push it to become an open source, more broadly useful thing. I have a package called [fasterize](https://github.com/ecohealthalliance/fasterize) that accelerates geospatial transformation. It started as something we needed internally, but I wanted to make it a more broadly useful tool that could be plugged into other packages. Going that extra mile to publishing is volunteer time.

KO: Final question, do you have any favorite tools for work or life hacks / life management?

NR: I really like the 'review' tool in GitHub. It's not quite what we use in rOpenSci for package-level review, but I find the way you're able to assemble code review comments into a  very helpful report and I use it a lot for feedback within my team. One of the things I like a lot on the package development side, is Gábor Csárdi's [goodpractice package](https://github.com/MangoTheCat/goodpractice) for running all of these package checks that go beyond R CMD check.  We use it all the time in the package peer-review process. Finally, I do a lot of intensive simulations so I use a lot of C++ and Rcpp, but my best hack is to have a big enough multi-core box to make up for my programming deficiencies.

_This interview occurred at the 2017 rOpenSci unconference. Special thanks to [Noam Ross](https://twitter.com/noamross) for participating in the project!_
