---
slug: "software-peer-review-guidelines-for-teaching"
title: Using rOpenSci Software Peer Review Guidelines for Teaching
author:
  - Tiffany Timbers
date: 2019-08-27
topicid: 1813
tags:
- Software Peer Review
- R
- software
- teaching
- education
---

### Teaching collaborative software development
In the [University of British Columbia's Master of Data Science program](https://ubc-mds.github.io/about/) one of the courses we teach is called [Collaborative Software Development, DSCI 524](https://github.com/UBC-MDS/DSCI_524_collab-sw-dev). In this course we focus on teaching how to exploit practices from collaborative software development techniques in data scientific workflows. This includes appropriate use of the software life cycle, unit testing and continuous integration, as well as packaging code for use by others. 

Our Master of Data Science program is an intensive, 10-month-long program whose vision is to teach the creative, responsible, and reproducible practice of Data Science. The program consists of 8 months of 24 short, 1-credit courses (4 taken concurrently in 4 weeks blocks) and a final two-month-long capstone project course. About half of our students take this program directly after completing an undergraduate degree, and the other half of our students are typically more mature learners who have some work experience and/or hold another advanced degree. For more information on the UBC Master of Data Science program, please see the following relevant links:

- [a more detailed description of our program](https://ubc-mds.github.io/about/), 
- [all our open course syllabi and readings/resources, and select course materials](https://ubc-mds.github.io/public/), 
- and [background information on our program's design and history](https://ubc-mds.github.io/2019-02-19-designing-mds/).

The course of focus in this post, Collaborative Software Development (see [here](https://github.com/UBC-MDS/DSCI_524_collab-sw-dev) for our open syllabus and resources for this course), is a project-based course where students are required to work together in teams of three or four. Here the project involves developing a Python and an R software package. The two packages are expected to do essentially the same thing. They are asked to make one in each language so that they can learn how to do both, and learn to generalize about software pacakges. For the project, the students are guided to choose the package topic from one of the following themes: 1) functions that are entirely new to the R or Python ecosystem, 2) improve upon pre-existing functions in either language or 3) re-implement existing code/functions that they wish to deepen their understanding of (*e.g.,* write a linear regression package from scratch). Students are asked to place emphasis in their work on robust software engineering (*e.g.,* continuous integration, testing, documentation, licensing) and collaboration (*e.g.,* advanced version control control). This course exists in our program because we believe that Data Science is in part defined by reproducible and auditable practices, and knowing how to (and having the expectation that one should) write robust and sharable code helps our students work under this ideal. 

### Using rOpenSci review guidelines in teaching
For courses in the Master of Data Science program we work hard to find and curate high quality and current resources for our students to help them in their coursework. For this collaborative software development course, one of the best resources we recommend for the R packages is the [rOpenSci Packages: Development, Maintenance, and Peer Review](https://devguide.ropensci.org/) guide. In particular, we encourage the students to go through the [Review template](https://devguide.ropensci.org/reviewtemplate.html) in the appendix of that guide before they hand in their R package for final grading. We recommend this, as by its design and use in the wild, it is a comprehensive checklist to review if an R package is of high quality and complete (in regards to software development). Instructors and Teaching Assistants for this course also use this [Review template](https://devguide.ropensci.org/reviewtemplate.html) to help give both formative feedback and guide summative assessment. We also use the rOpenSci guide to develop formative feedback and summative assessment for the Python packages, though the [in-development guide from pyOpenSci](https://www.pyopensci.org/dev_guide) may play this role. 

We think that by using the [rOpenSci Packages: Development, Maintenance, and Peer Review](https://devguide.ropensci.org/) guide in our [Collaborative Software Development](https://github.com/UBC-MDS/DSCI_524_collab-sw-dev) course in the [University of British Columbia's Master of Data Science program](https://ubc-mds.github.io/about/) we can better teach our students how to create high quality software packages, and expose them to the idea of package review in hopes that they will embrace this culture when they create their own Data Science software packages out in the wild in their future careers. We are grateful to rOpenSci for making this guide open. Although this guide was not intended/built for an educational use case, we have found it is very useful for our Collaborative Software Development course. We hope this story of our use case of this guide can show (or remind) others that open resources can become more valuable for the broader community as they find new uses. 




