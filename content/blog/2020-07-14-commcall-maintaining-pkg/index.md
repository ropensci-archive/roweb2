---
title: Community Call - Maintaining R Packages Wrap Up
author:
  - Janani Ravi
  - Steffi LaZerte
date: '2020-07-14'
slug: commcall-maintaining-pkg
tags:
  - r
  - community call
  - packages
  - maintenance
description: Summary of questions addressed in the community call, maintaining R packages
---

In March we held a [Community Call](/commcalls/2020-03-18/) discussing the maintenance of R packages. 
This call included a [starting presentation](https://speakerdeck.com/juliasilge/maintaining-an-r-package) by [Julia Silge](/author/julia-silge/) followed by a discussion featuring panelists with a wide [variety of backgrounds](/blog/2020/03/04/commcall-mar2020/#speakers): [Elin Waring](/author/elin-waring), [Erin Grand](/author/erin-grand), [Leonardo Collado-Torres](/author/leonardo-collado-torres) and [Scott Chamberlain](/author/scott-chamberlain).  

{{< figure src = "speakers.png" class = "center" width = "800" alt = "Headshots of the moderator and four panelists" >}}

The rOpenSci Package Maintenance Community Call was my (Janani's) first Community Call and I loved it. 
For R/software-dev newbies, learning the right terminology/lingo/vocabulary is everything. 
It can take a few dozen blog posts and many hours of reading before beginners get to the 'aha' moment of 'oh, these are the terms I need to use to search for what I'm thinking!'. 
As there are many online resources out there, the default expectation is that one can search for and learn almost everything provided one knows the right keywords. 
There's nothing like hearing a lively technical banter of experts to pick up the vernacular that one can easily build upon. 
The first-hand tips and tricks, do's and don'ts, personal anecdotes of what worked beautifully and what crashed terribly, offered by years of experience are yet unmatched in bringing newbies into speaking the community's language. 
That is the precise gap filled in by the timely and helpful rOpenSci Package Maintenance Community Call!

During rOpenSci Community Calls, there is a [shared document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/) that allows anyone to add notes or questions during the discussion. 
I always take notes for my own use but quickly realized the benefit for all by taking collaborative notes.
This live shared document helps everyone, including newbies, think through and formulate what they would like to say. 
It also gives people the option to participate without having to interrupt and speak up on the call (thus reducing the barrier for people, especially newcomers, to ask questions). 
The document also gives an opportunity for anyone in the community to share their expertise and add their perspective. 

We felt that the rich content in the video and collaborative notes from this call warranted a post that points readers to the material to ensure more people benefit from it. Here we’ve collated the questions and links to the various answers to facilitate look up.

### Summarizing questions and answers

#### Moderator questions

**1. What does it mean to  "maintain an R package"?**
([video](https://vimeo.com/399048757#t=17m01s) | [document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.w8lncwza4rft))

**2. How do you manage issues / feature requests?** ([document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.89gqj51qdulg))  
**What workflows do you use to do this?** ([document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.ccqqertq2gox))  
([video - All](https://vimeo.com/399048757#t=22m04s))

**3. What is a path for new contributors to R packages? How can healthy norms be passed on?**
([video](https://vimeo.com/399048757#t=30m25s) | [document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.iasdrvr3cnko))

(Related: What should someone do if they want to start helping maintain one of your packages? First step?)


**4. What considerations go into decisions around dependency management?** ([video](https://vimeo.com/399048757#t=33m37s))  
**APIs that change?** ([video](https://vimeo.com/399048757#t=35m45s))    
([document - All](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.g0dhr5i6flm3))

<!-- **5. What do you consider when other packages depend on your work?** -->
<!-- - [Link to video](https://vimeo.com/399048757#t=) -->
<!-- - [Link to document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.w8lncwza4rft) -->

**5. What does the process of changing maintainers look like? What sets up this transition for success?**
([video](https://vimeo.com/399048757#t=38m27s) | [document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.6624x8niikrz))

**6. We've talked about a lot of different facets of package management. Which are the same vs. different for internal packages?** 
([video](https://vimeo.com/399048757#t=41m09s))

**7. How do you decide to submit to a centralized repository like CRAN or Bioconductor? Peer review like JOSS or rOpenSci? Stay only on GitHub?** 
([video](https://vimeo.com/399048757#t=42m43s) | [document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.ebytpo161oow))

**8. What does someone need to know or skills they need to have to start maintaining a package?**
([video](https://vimeo.com/399048757#t=48m01s) | [document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.uao03hoinrd0))


#### Audience questions

**Daniel Sjoberg**  
What is the best practice for ensuring continued support for older R versions when dependencies of dependencies of dependencies keep upping the minimum version of R required?
([document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.u6de4rghsnnj))


**Athanasia Monika Mowinckel**  
Do any of you have a package that depends on software that is not from R, for instance another command line tool. 
I.e. your R package wraps system calls to the command line software and uses output from that in R. 
How do you improve user experience when the program needs environment variables R does not pick up with `Sys.getenv()`?
([document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.5mz42hvitrpf))

**Janani Ravi**  
I would also like to know how to incorporate a significant part of non-R scripts within the R package workflow -- functions that use system/system2 calls, for instance! 
Are there any systematic ways and good examples that could point to this?
([document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.zgb6oefaddub))


**Lennert Schepers**   
If I want to start with fixing an issue/contributing to a well-documented package, what are essential parts that I should know before fixing? 
Should I learn package documentation and testing/awcontinuous integration and all other aspects of R packages... or are there parts that are necessary and others that are less urgent? 
Are there things that should be absolutely avoided? (things that can break the whole package)?
([document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.t2hv36r5c6dz))


**Eric Scott**  
What are some best practices for making big changes to a package?
For example, changing the output of a function from a list to a tibble.
Should this be a new function? 
Should there be an argument to get the old behavior back?  
Warnings to users to update their code? 
([document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.8mnxkd5s2m4e))

### Resources
You can also check out the [list of resources](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.d6sc6cmn6n4) related to this community call.


### Excited for more?
We hope this has inspired you to join in with future community calls!
What would YOU like to hear about on a future rOpenSci Community Call? 
Add your votes and ideas for topics and speakers by 1) browsing the [issues in this public repository](https://github.com/ropensci-org/community-calls); 2) giving a 👍 or commenting on an issue; 3) opening a new issue if your idea doesn't fit in any others.
