---
date: 2019-06-12
slug: taking-over-maint
title: Taking over maintainence of a software package
authors:
  - Scott Chamberlain
  - Maëlle Salmon
  - Noam Ross
categories: blog
topicid: 
tags:
  - software
  - community
---

Software is maintained by people. While software can in theory live on indefinitely, the sustainability part of software is more about the people. People change jobs, move locations, retire, and unfortuntaley die sometimes. When a software maintainer can no longer maintain a package, what happens to the software?

Because of the fragility of people in software, in an ideal world a piece of software should have as many maintainers as possible. Increasing maintainers increases the so-called [bus factor][bus]. A piece of software wants a high a number as possible; lower means fewer people have to get hit by a bus to then have no maintainers. 

In theory, finding maintainers for software is easier as the pool of users gets larger. In rOpenSci, we do not have this situation for the most part. Most R packages within rOpenSci have a rather focused and small task, and the pool of users is relatively small. Thus, the average rOpenSci package is probably maintained by one person only, making that package sensitive to maintainers leaving.

### Small wins

Despite a small number of maintainers per package, the rOpenSci community is quite large. We've had success finding maintainers by reaching out to our community as maintainers have moved on. See our latest [rOpenSci News](https://news.ropensci.org/2019-05-13/) "Call For Contributors" section for recent examples.

### Taking over

Okay, so you've taken over maintainence of a software package. What next? We want to add a section to our [Software Development Guide][devg] about taking over maintainence; we're first reaching out here to the community to talk through what we're thinking and to get your feedback. This is what we're thinking so far:

#### Proposed material for dev guide

Admin stuff for rOpenSci:

* Current maintainer has not responded to issues/PR's in many months
    * Make contact and see what the situation is. They may say they'd like to step down as maintainer, in which case look for a new maintainer
* Current maintainer is completely missing/not responding
    * If this happens we will try to contact the maintainer for up to one month. However, if updating the package is urgent, we may use our admin access to make changes on their behalf.
* If current maintainer reaches out to rOpenSci about stopping maintainence, get a call out in the "Call for Contributors" section of the rOpenSci newsletter

Admin stuff for maintainers:

* Add yourself as the new maintainer, with `role = c("aut", "cre")`
* Make sure to change maintainer to your name anywhere else in the package
* Should we have any rules about new maintainers adding new contributors with admin access on the repository?
* If the package has been archived by CRAN and there is a maintainer change, have the old maintainer email CRAN and put in writing who the new maintainer is. Make sure to mention that email about the maintainer change when you submit the first new version to CRAN.
    * If the old maintainer is un-reachable, WHAT HAPPENS?

Code changes:

* Can the new maintainer rip everything out and start new? Or should we implore the new mtaintainer to keep some amount of consistency, at least the public API?
    * Keep the public API (exported functions) as is, unless very good reason to change them
* If the new maintainer has any questions about the code reach out to the rOpenSci community, including rOpenSci staff.
* other?

### Your thoughts?

We want to hear from you. What aspects of taking over maintainence of a software package have we left out?







[bus]: https://en.wikipedia.org/wiki/Bus_factor
[devg]: https://ropensci.github.io/dev_guide/
