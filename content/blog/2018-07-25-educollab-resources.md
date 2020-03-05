---
slug: educollab-resources
title: 'rOpenSci Educators Collaborative: What Educational Resources Work Well and
  Why?'
date: '2018-07-25'
preface: 'At the [5th annual rOpenSci unconference](https://unconf18.ropensci.org)
  in May 2018, a group of scientists and educators shared their experiences, frustrations,
  failures, and successes teaching science with R. What came out of this discussion
  was a framework for rOpenSci Educators’ Collaborative: a community of practice for
  people interested and engaged in science education using R. This blog post is the
  second of a three-post series about education and R, written by this group of unconf18
  participants. Read the first post about common pedagogical challenges [here](/blog/2018/07/24/educollab-challenges/),
  and how to get involved [here](https://github.com/ropenscilabs/rOpenSciEd).'
author:
  - Laura Ación
  - Mara Averick
  - Leonardo Collado Torres
  - Auriel Fournier
  - Alison Hill
  - Sean Kross
  - Lincoln Mullen
categories: blog
topicid: 1272
tags:
  - R
  - community
  - meetings
  - unconf
  - unconf18
  - educollab
---

In the first post of this series, we sketched out some of the common challenges faced by educators who teach with R across scientific domains. In this post, we delve into what makes a "good" educational resource for teaching science with R.

<center>
<img alt = 'educollab hashtags' src='/img/blog-images/2018-07-24-educollab-challenges/educollab-logo.png' />
</center>

For instructors teaching sciences with R, there are a number of open educational resources that they can reuse, tailor to their own teaching style, or use to inspire them in creating their own materials. Some examples:

- [Data wrangling, exploration, and analysis with R (a.k.a. STAT545)](https://stat545.com/), originally developed by Jenny Bryan
- [ModernDive: An Introduction to Statistical and Data Sciences via R](https://moderndive.com), by Chester Ismay and Albert Y. Kim
- [RStudio's Data Science "Course in a Box"](https://rstudio-education.github.io/datascience-box/), by Mine Çetinkaya-Rundel
- [Statistics and R](https://rafalab.github.io/pages/harvardx.html), by Rafael Irizarry and Michael Love
- The lessons offered by [The Carpentries](https://carpentries.org/), including [Software Carpentry](https://software-carpentry.org/lessons/) (which are domain agnostic) and [Data Carpentry](https://www.datacarpentry.org/lessons/) (which are domain specific) 

What makes these teaching materials appealing for educators?

<center>
<img alt = 'educators thinking how to make materials appealing' src='/img/blog-images/2018-07-25-educollab-resources/2018-05-21 08.25.15.jpg' />
</center>

_These curricular materials are open and discoverable by other educators._ A common belief is that educational resources that are closed are better than any open material can ever be. Otherwise, why would someone pay for educational materials? While there are surely cases of closed educational resources that are excellent, openness is one of the most appealing characteristics of high quality teaching resources for teaching sciences with R. Open materials have no cost for students, allow a community of educators and students to improve and update the materials, and make it possible to reuse and adapt resources. All this makes the whole teaching experience a lot more efficient for the education community at large. In the closed model, where educators do not share their materials openly, they are often working alone (or in small groups) without any feedback or contributions from the teaching community. 

One of the features all of the resources listed above share is that all of them have the source materials hosted in public [GitHub](https://github.com) repositories. The source materials are typically written in a shareable, editable format such as R Markdown using tools like [R Markdown websites](https://rmarkdown.rstudio.com/rmarkdown_websites.htm), [Blogdown](https://bookdown.org/yihui/blogdown/), or [Bookdown](https://bookdown.org/yihui/bookdown/). Keeping educational materials up-to-date is no small task! Having access to these kinds of open-source materials helps alleviate one of the biggest challenges for educators who use R in the classroom: the rapid pace at which packages are introduced and improved. Being able to access cutting-edge teaching materials that are kept current by R community members is far easier than relying on printed textbooks that include stale code and outdated package recommendations. 

_These materials are designed for putting into practice principles of how we learn._ Scholars have rigorous formal training in research, which is also peer reviewed. When it comes to teaching at a university, scholars have little to no formal training in educational practices and research. Also, formal mechanisms for peer review are almost nonexistant. In contrast, there have been real innovations in how to teach programming skills like R (e.g., [Greg Wilson’s "Teaching Tech Together"](https://teachtogether.tech)), and how to train instructors to teach these skills (e.g., see [The Carpentries Instructor Training](https://carpentries.github.io/instructor-training/)). Many of our examples above have been designed with modern pedagogical approaches in mind. For example, [ModernDive](https://moderndive.netlify.com/index.html#sec:connect-contribute) was reviewed by a [cognitive psychologist who specializes in the science of learning](https://www.learningscientists.org/ourteam/). All have been "battle-tested" in real classrooms first, and have been iterated on by the authors based on real student feedback.

Courses that are developed using examples based on real data from the domain of interest and that are meaningful to the learner tend to be more successful. They are more succesful when focusing on the actual practice of the concepts to be learned rather on focusing purely on the theory. One useful technique to transmit contents that are initially challenging is for instructors to assign students to practice in groups of three students, then in groups of two students, then finally to work on the materials individually. A parallel scheme is to introduce the new concepts using a spiral technique that repeats the new concepts over the course using an increased level of difficulty. 

_Good course materials teach people to be independent._ Courses that focus in step-by-step instructions are usually less helpful in real life than courses that teach concepts in a way generalizes to uses outside the classroom. In real life it is more important to know what questions to ask, how to find good answers to those questions, and how to keep the knowledge acquired up to date than to follow step-by-step tutorials for a procedure that may age.

How these learning aims are met, either as a part of a formal term-long course, or in a short burst, like a two day workshop, can impact what makes good course materials. For a term-long course, lessons that can be woven into existing courses may be more useful, whereas teaching a certain set of R skills in a short burst may benefit from a more formal set of lessons that have been tested in an intensive workshop experience. 

In the following and last post for this series, we will summarize some priority needs and call for action to advance these priorities to further resources teaching sciences with R.
