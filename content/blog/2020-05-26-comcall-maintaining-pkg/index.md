---
title: Community Call - Maintaining R Packages Wrap Up
author:
  - Janani Ravi
  - Steffi LaZerte
date: '2020-05-26'
slug: comcall-maintaining-pkg
categories:
  - blog
tags:
  - r
  - community call
  - packages
  - maintenance
package_version: 0.1.0
description: Summary of questions addressed in the community call, maintaining R packages
---

Introductory blurb

In March we had an invigorating [Community Call](/commcalls/2020-03-18/) discussing the maintenance of R packages. 
This Community Call was slightly different from others in that it comprised of a [starting presentation](https://speakerdeck.com/juliasilge/maintaining-an-r-package) by [Julia Silge](/author/julia-silge/) followed by a panel discussion featuring panelists with a wide [variety of backgrounds](/blog/2020/03/04/commcall-mar2020/#speakers): [Elin Waring](/author/elin-waring), [Erin Grand](/author/erin-grand), [Leonardo Collado-Torres](/author/leonardo-collado-torres) and [Scott Chamberlain](/author/scott-chamberlain).  

Prior to the discussion, questions were submitted by the community. 
During the Community Call panelists answered questions and viewers added their own questions, answers and thoughts to the [collaborative document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/). 

Here, we've collated the questions and links to the various answers to facilitate look up. 

### Summarizing questions and answers

#### Moderator questions

**1. What does it mean to  "maintain an R package"?** 
- [Link to video](https://vimeo.com/399048757#t=17m01s)
- [Link to document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.w8lncwza4rft)


**2. How do you manage issues / feature requests? What workflows do you use to do this?**
- [Link to video](https://vimeo.com/399048757#t=22m04s)
- [Link to document: Encourage and manage feedback](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.89gqj51qdulg)
- [Link to document: Workflows to manage issues/feature requests](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.ccqqertq2gox)


**3. What is a path for new contributors to R packages? How can healthy norms be passed on?** 
(Related: What should someone do if they want to start helping maintain one of your packages? First step?)
- [Link to video](https://vimeo.com/399048757#t=30m25s)
- [Link to document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.iasdrvr3cnko)


**4. What considerations go into decisions around dependency management? APIs that change?**
- [Link to video: Dependencies](https://vimeo.com/399048757#t=33m37s)
- [Link to video: APIs](https://vimeo.com/399048757#t=35m45s)
- [Link to document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.g0dhr5i6flm3)

<!-- **5. What do you consider when other packages depend on your work?** -->
<!-- - [Link to video](https://vimeo.com/399048757#t=) -->
<!-- - [Link to document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.w8lncwza4rft) -->

**5. What does the process of changing maintainers look like? What sets up this transition for success?**
- [Link to video](https://vimeo.com/399048757#t=38m27s)
- [Link to document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.6624x8niikrz)

**6. We've talked about a lot of different facets of package management. Which are the same vs. different for internal packages?**
- [Link to video](https://vimeo.com/399048757#t=41m09s)

**7. How do you decide to submit to a centralized repository like CRAN or Bioconductor? Peer review like JOSS or rOpenSci? Stay only on GitHub?**
- [Link to video](https://vimeo.com/399048757#t=42m43s)
- [Link to document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.ebytpo161oow)

**8. What does someone need to know or skills they need to have to start maintaining a package?**
- [Link to video](https://vimeo.com/399048757#t=48m01s)
- [Link to document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.uao03hoinrd0)


#### Audience questions

**Daniel Sjoberg**  
What is the best practice for ensuring continued support for older R versions when dependencies of dependencies of dependencies keep upping the minimum version of R required?

- [Link to document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.u6de4rghsnnj)


**Athanasia Monika Mowinckel**  
Do any of you have a package that depends on software that is not from R, for instance another command line tool. 
I.e. your R package wraps system calls to the command line software and uses output from that in R. 
How do you improve user experience when the program needs environment variables R does not pick up with `Sys.getenv()`?

- [Link to document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.5mz42hvitrpf)

**Janani Ravi**  
I would also like to know how to incorporate a significant part of non-R scripts within the R package workflow -- functions that use system/system2 calls, for instance! 
Are there any systematic ways and good examples that could point to this?

- [Link to document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.zgb6oefaddub)


**Lennert Schepers**   
If I want to start with fixing an issue/contributing to a well-documented package, what are essential parts that I should know before fixing? 
Should I learn package documentation and testing/awcontinuous integration and all other aspects of R packages... or are there parts that are necessary and others that are less urgent? 
Are there things that should be absolutely avoided? (things that can break the whole package)?

- [Link to document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.t2hv36r5c6dz)


**Eric Scott**  
What are some best practices for making big changes to a package?
For example, changing the output of a function from a list to a tibble.
Should this be a new function? 
Should there be an argument to get the old behavior back?  
Warnings to users to update their code?

- [Link to document](https://docs.google.com/document/d/1KvuVNU4ICE_FHvJMAfKns_pZnOt_1cgJ4wokxGGuDaE/edit#heading=h.8mnxkd5s2m4e)



### Conclusion
