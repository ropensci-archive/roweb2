---
slug: codereview
title: Community Call Summary - Code Review in the Lab
author:
  - Hao Ye
  - Melanie Frazier
  - Julia Stewart Lowndes
  - Carl Boettiger
  - Noam Ross
date: '2018-11-29'
topicid: 1488
preface: This post is a summary of our Community Call on "Code Review in the Lab,
  or ... How do you review code that accompanies a research project or paper?" held
  October 16, 2018. [Resources associated with the Call](/commcalls/2018-10-16/),
  including the video recording, slides, notes and a discussion thread have been posted.
tags:
  - community
  - community call
  - events
  - R
---

Although there are increasing incentives and pressures for researchers to share code (even for projects that are not essentially computational), practices vary widely and standards are mostly non-existent. The practice of _reviewing_ code then falls to researchers and research groups before publication. With that in mind, rOpenSci hosted a [discussion thread](https://discuss.ropensci.org/t/how-do-you-review-code-that-accompanies-a-research-project-or-paper-help-ropensci-plan-a-community-call) and a [community call](/commcalls/2018-10-16/) to bring together different researchers for a conversation about current practices, and challenges in reviewing code in the lab.

On the call, we heard from Carl Boettiger (UC Berkeley/rOpenSci), Melanie Frazier & Julia Stewart Lowndes (National Center for Ecological Analysis and Synthesis), and Hao Ye (U. Florida/Weecology). Between the presentations discussion, and [active](https://docs.google.com/document/d/1LfyhgsbVgLWgWPhS0nbaBIZSFjireEBBSYL4PmhUJis/edit?usp=sharing) [commenting](https://discuss.ropensci.org/t/how-do-you-review-code-that-accompanies-a-research-project-or-paper-help-ropensci-plan-a-community-call/1321/29) by many in the community, we learned how different groups approached the problem.

What did we learn? A great deal! The community uses code in many different ways in research, and practices often differed accordingly.  

### Project Structure: A Minimum Prerequisite

The conversation around code review frequently diverted to discussion of _project structures_ and _coding practices_. This was related to a common theme we heard from participants:  **agreement around workflows and project organization is a minimum prerequisite for a review process**.  

While different research groups had different standards for what these practices are, according to different use-cases, all had **minimum project standards to make code _reviewable_**. These ranged from simply having an adequate README explaining the project structure and how to run it, to using R-markdown documents, to [research compendia](https://github.com/ropensci/rrrpkg) and [containerized](https://github.com/noamross/nyhackr-docker-talk#links-to-topics-and-resources-dicussed-in-the-talk-and-more) projects with [automated testing](http://r-pkgs.had.co.nz/tests.html) and [continuous integration](https://juliasilge.com/blog/beginners-guide-to-travis/).

A few themes held across project types. First, **documentation was the highest priority** - inadequately documented projects were much more difficult to review. Secondly, as **projects go more complex, it was helpful to break them up or modularize them**, spinning off re-usable code into standalone, reusable packages and separating data from analysis code. Thirdly, as projects became either more complex or became reusable tools rather than one-off analyses, the degree of stringency needed for documentation, automated testing, and automated tools like [linters](https://github.com/jimhester/lintr) increases. These latter two points are necessary as large, complex projects are challenging to review as a whole. Complex projects were also more reviewable when they produced and communicated outputs from the intermediate steps in pipelines, rather than run as a single black-box.

There was also considerable interest and hope in projects like [Binder](https://mybinder.org/) and [Code Ocean](https://codeocean.com/) (which we learned more about from [April Clyburne-Sherin](https://discuss.ropensci.org/t/how-do-you-review-code-that-accompanies-a-research-project-or-paper-help-ropensci-plan-a-community-call/1321/46)), which provide a shared environment for reviewers to review code and, simultaneously, minimum project structure to which projects must adhere. As these emerge as standards for code review structures _across_ labs, they influence practices within labs.

### Teams and Training: Necessary Conditions

Another area all our presenters emphasized was the need to create a _social environment_ conducive to code review, especially given the mixed backgrounds of most research teams. This involves agreeing on and **communicating standards**, **building a knowledge base**, and practicing a **culture of feedback**.

Standards, like the ones describing project structures, need to be set for the team and communicated. At NCEAS, the Ocean Health Index team has a [standard operating procedure](https://github.com/OHI-Science/ohiprep/blob/master/src/dataOrganization_SOP.md) document that describes file organization and naming conventions for the large shared code repositories. This document is maintained along with the repository and referenced in READMEs. Having written standards and [workflows](https://www.nature.com/articles/s41559-017-0160) are important for collaborating within the team, and also for onboarding new team members.

Most teams also had a mix of practices for building up a team knowledge base. This involved written resources like a team wiki, commonly shared practices from external resources like [Software Carpentry](https://carpentries.org/), and regular team time for things like formal group learning on topics like abstraction and [refactoring](https://en.wikipedia.org/wiki/Code_refactoring). Having the code from different projects open and shareable across the team is also important, so that there is a sufficient source of examples of previous practice.

Finally, participants emphasized the need for creating a culture where people know mistakes happen and they should expect them. When finding, reviewing, and fixing mistakes is _part of the workflow_, people are more comfortable discussing and learning from them.

### Review Itself: Few Common Practices

While the concept of standards and standardized workflows was common to most lab groups, and increasingly formalized, the review process was not.  Code review itself is frequently described as "more of a process than an event", "rarely explicit", "very ad hoc", and takes place in a variety of formats: one-on-one meetings, comments on committed code, pair programming sessions. In some cases, there were more formal processes for specific projects, such as updates to the shared codebase of a major project.

Many presenters and commenters described the importance of using a **checklist for review**. Many in the [discussion thread](https://discuss.ropensci.org/t/how-do-you-review-code-that-accompanies-a-research-project-or-paper-help-ropensci-plan-a-community-call/1321) offered their own checklists, both formal and informal. These checklists vary a great deal - in many cases they cover general areas such as "Can one run the code?", and "Is there documentation?" In cases where projects in a group run deal with similar challenges, they can be more specific, like, "Are NAs handled appropriately in joins?" or "Does the pipeline run on new and old versions of the data pulled from version control?"

Some areas cropped up as common challenges. For instance - to what extent should feedback on research code emphasize refactoring, or optimization?  While it was generally agreed that refactoring is more important for more general, highly reused code, it is by no means clear how much so. For rapidly developing research code, how much should testing be emphasized? Another area where the right approach to reviewing was unclear was in long-running, computationally-intense workflows. For such projects, can a reviewer or an automatic test suite be expected to reproduce the results?

Finally, one useful note was that review in in-person meetings can make it more challenging to maintain a written record of changes compared to interactions via systems like GitHub. The team from NCEAS noted that they use GitHub issues as a note-taking system so that discussions would be recorded in the same place as on-line discussion, and Weecology used co-authored commits to record changes from pair-programming sessions.

How does your group review code that accompanies a research project or manuscript? Have you tried to implement any of these approaches after hearing about them here? Share your experience in the comments below.
