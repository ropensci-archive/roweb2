---
slug: conduct
title: 'rOpenSci Software Peer Review: Still Improving'
date: 2019-02-01
authors:
  - Maëlle Salmon
  - Brooke Anderson
  - Scott Chamberlain
  - Anna Krystalli
  - Lincoln Mullen
  - Karthik Ram
  - Noam Ross
  - Melina Vidoni
categories: blog
topicid: 1547
tags:
  - Software Peer Review
---

rOpenSci's [suite of packages](/packages/) is comprised of contributions from staff engineers and the wider R community, bringing considerable diversity of skills, expertise and experience to bear on the suite. How do we ensure that every package is held to a high standard? That's where our software system comes into play: packages contributed by the community undergo a **transparent, constructive, non adversarial and open review process**. For that process relying mostly on **volunteer work**, _[associate editors](/about#team)_ manage the incoming flow and ensure progress of submissions; _authors_ create, submit and improve their package; *[reviewers](https://ropensci.github.io/dev_guide/#reviewers)*, two per submission, examine the software code and user experience.

We are quite proud of our Software Peer Review system and do our best improving it over time. In this post, we summarize some of the more important  recent changes to Software Peer Review at rOpenSci. The most recent information can always be found at https://ropensci.org/software-review/.

# The system changed names!

Up until December, our system was called _rOpenSci onboarding_ which was short but potentially misleading given the general acceptation of "onboarding" as adding new employees or volunteers to an organization. We switched to _rOpenSci Software Peer Review_ which shows the system draws elements from both _Peer Review_ as known in academia, and _Software Review_ as known in software development. The discussion about the name change started [in July 2017](https://github.com/ropensci/software-review-meta/issues/11), we're glad to have finally done it!

# The system got a landing page on our website

We used to refer to Software Peer Review's GitHub repository when mentioning the system, which was [not optimal](https://github.com/ropensci/software-review-meta/issues/16). There is now a [dedicated page on our website](/software-review/), at the moment explaining the motivation and principles of the system, and providing related links.

# The editorial team got bigger!

Since our [last post about updates in the system in September 2017](/blog/2017/09/11/software-review-update/), the editorial team has doubled in size to handle all incoming submissions without drowning editors! We are delighted to have welcomed Anna Krystalli, Lincoln Mullen, Brooke Anderson and Melina Vidoni. Thanks to them for joining us! Read more [about Anna and Lincoln](/blog/2018/06/22/new_editors/) and about Brooke and Melina (soonish?).

# We wrote a whole book/manual!

Our guidance for authors, reviewers and editors used to be stored in single Markdown file in the Software Peer Review GitHub repository, which was getting impractical as these files got bigger, and which was not giving a great reading experience to anyone. We have therefore consolidated all our guidance to a book created with `bookdown`! Its source is stored on GitHub. It is divided in three parts: 

* one about our guidelines and tips for package development, useful to read for any package developer.

* one about the Software Peer Review system itself, including guidance for the different actors of the system.

* one about package maintenance in general, including a chapter about changing stuff in your package, one about GitHub grooming... This section too can be useful for any package developer!