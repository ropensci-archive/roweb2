---
slug: ode-to-testing
title: An Ode to Testing, my first review
authors:
  - name: Charles T. Gray
    url: https://github.com/softloud
date: '2018-03-13'
categories: blog
topicid: 1093
tags:
  - R
  - beginner
  - community
  - software
  - software-peer-review
  - reviewer
  - packages
  - data-access
  - weathercan
---


To give you an idea of where I am in my `R` developer germination, I'd just started reading about [testing](http://r-pkgs.had.co.nz/tests.html) when I received an email from [@rOpenSci](https://ropensci.org/) inviting me to review the [`weathercan`](https://github.com/ropensci/weathercan) package. Many of us in the `R` community feel like [imposters](https://en.wikipedia.org/wiki/Impostor_syndrome) when it comes to software development. In fact, as a statistician, it was a surprise to me when I was recently called a developer. 

In terms of  formal computer science training, I took one subject in first year, with the appropriate [initialism](https://www.quickanddirtytips.com/education/grammar/abbreviations-acronyms-and-initialisms) *OOF*. Ostensibly, this was to school me in Object Oriented Fundamentals, but mostly educated me in just how much one person can pontificate about doubles and floats. I am almost always befuddled by regexes on the rare occasions I come across them.

However, through undertaking this review, which began with the revelation that I'm not alone in thinking, ["What if I have absolutely nothing to say other than, yes, this is, in fact a package?!"](https://ropensci.org/blog/2017/08/22/first-package-review/), I have come to see that all `R` users are `R` family (aw). No doubt these are well worn cobblestones that I judder my bicycle along. Despite this, it felt like a unique journey given my current fascination with testing. 

Now I think any `R` user can be a `R`eviewer. That is, surely there's something to be said for having someone who's relatively uninitiated take your package for a whirl, at the very least. We all want our packages to be usable by all data science folk, not just advanced programmers. 

I was delighted that the [`testthat`](https://cran.r-project.org/web/packages/testthat/README.html) package was part of the recommended reviewer workflow, as well as novel [`devtools`](https://github.com/hadley/devtools) functions. Reading the [rOpenSci package guide](https://ropensci.github.io/dev_guide/building.html) was a veritable font of good tips for someone who has only just begun building their first packages. 

In this context, *testing* refers to a reproducible and more systematic approach to the kind of ad hoc console testing we `R` peeps do when writing functions. Does it output expected results? For a variety of inputs? Does it fail as it should when passed something it shouldn't be?       

It all seemed straightforward when I was reading about it, but sitting down to write tests for functions I hadn't looked at in a while was a daunting proposition. In a review, however, you're considering other people's functions and the questions that spring to mind are so much more obvious in an objective setting. For starters, do the tests cover all functions?  

I must admit to holding out actually looking at the test code, I wanted to get a feel for the syntax first and have a try myself. So, when I did pop the hood on the tests directory, I appreciated it more. Looking at the tests written for `weathercan`, it is clear [@steffilazerte](https://github.com/steffilazerte) is a good ways past reading the testing chapter for the first time. 

In a previous existence, I worked as a [musician](http://choosemaths.org.au/charles-gray/) for almost two decades. Everything in my life has a soundtrack, and code is no exception. Looking through @steffilazerte's tests, I heard this. My counterpoint lecturer said this is the single greatest piece of [polyphony](https://en.wikipedia.org/wiki/Polyphony) (more than one melody at the same time).

<center>
<iframe src="https://open.spotify.com/embed/track/0kPhDUZe8IdoFVC6e24CnC" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
</center>

So, I dragged my feet a bit on the review, largely because the more I read the more I had to revisit testing on my own packages. Thinking about someone else's tests made me want to explore what it was like to write a function along with its associated tests, *at the same time*. 

I'm half-way through my doctorate in statistics, coming through from a maths background. So, up until now, my analyses have been horrible [towering pillars](https://wiki.teamfortress.com/wiki/Towering_Pillar_of_Hats) of  `R` script files which sourced functions from each other. 

<center>
<img src= "/img/blog-images/2018-03-13-ode-to-testing/Towering_Pillar_of_Hats.png" style = "width: 400px"
alt = "A Towering Pillar of Hats. https://wiki.teamfortress.com/w/images/f/f5/Towering_Pillar_of_Hats.png" >
<br>
<div style="font-size: 1em"> [A Towering Pillar of Hats](https://wiki.teamfortress.com/wiki/Towering_Pillar_of_Hats")</div>
</center>

Sometimes I'd source functions from other files but then worry they were broken. I heard this.

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/sOUsbtUrXHk" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
</center>


A wise man ([@njtierney](https://github.com/njtierney)) recently said to me that statisticians can learn a lot from the development community, and he was not wrong.

In the past, if I came back to code after a couple of months I'd be plagued by anxiety when using a function. Is this the latest iteration? In which script file did I leave the latest iteration lying around? Does every other script file call the latest version?

Writing functions with documentation and tests *at the same time* feels like this.

<center>
<iframe src="https://open.spotify.com/embed/track/1Wd7EwZcoAfCAEi9FF6G6b" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
</center>

Now, not only do I know where everything is, but I can also trust that the functions work the way I intended in the documentation using testing. No longer will Current Charles be cursing Past Charles for her inscrutable code!  

<center>
<img src= "https://upload.wikimedia.org/wikipedia/en/5/55/D.Va_Overwatch.png" style = "width: 400px"
alt = "D.Va portrait. https://upload.wikimedia.org/wikipedia/en/5/55/D.Va_Overwatch.png" >
<br>
<div style="font-size: 1em"> [Writing GitHub-integrated packaged analyses makes me feel like this. And, **yes**, I really do main D.Va.](https://en.wikipedia.org/wiki/D.Va)</div>
</center>
