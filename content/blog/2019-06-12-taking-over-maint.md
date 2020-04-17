---
date: 2019-06-12
slug: taking-over-maint
title: Taking over maintenance of a software package
author:
  - Scott Chamberlain
  - Maëlle Salmon
  - Noam Ross
topicid: 1738
tags:
  - software
  - community
---

Software is maintained by people. While software can in theory live on indefinitely, to do so requires people. People change jobs, move locations, retire, and unfortunately die sometimes. When a software maintainer can no longer maintain a package, what happens to the software?

Because of the fragility of people in software, in an ideal world a piece of software should have as many maintainers as possible. Increasing maintainers increases the so-called [bus factor][bus]. A lower number of maintainers means fewer people have to get hit by a bus to then have no maintainers. 

In theory, finding maintainers for software is easier as the pool of users gets larger. However, at rOpenSci, we generally do not have this luxury. Most rOpenSci packages have a rather focused and small task, and the pool of users is likely to be relatively small. The average rOpenSci package has 3 authors listed, while a significant proportion of packages have only one person listed (36%). Authors listed in R packages may or may not be capable of taking over if the maintainer leaves, but more authors increases the chance that at least one of them can take over (caveat: new maintainers may come from outside the current author pool).

{{< figure src="/img/blog-images/2019-06-12-taking-over-maint/ropensci_authors.png" alt="ropensci_authors" width=500 class="center" caption="_data from the [crandb API](https://crandb.r-pkg.org/); 235 rOpenSci packages, only those on CRAN_" >}}

### Small wins

Even though many rOpenSci packages have a small number of authors per package, the rOpenSci community of users and developers is quite large. Even if an individual R package within rOpenSci doesn't have a large community on their own, individual packages within rOpenSci can benefit from the large community we've cultivated. 

We've had success finding maintainers by reaching out to our community as maintainers have moved on - we've found new maintainers for all six packages that have needed new maintainers. See our latest [rOpenSci News](https://news.ropensci.org/2019-06-10/) "Call For Contributors" section for recent examples. One of these new maintainers, [Julia Silge](/authors/julia-silge/), wrote about the experience in her post [Relaunching the qualtRics package](/blog/2019/04/30/qualtrics-relaunch/).

### Taking over

Okay, so you've taken over maintenance of a software package. What next?

We want to add a section to our [Software Development Guide][devg] to address this exact question; we're first reaching out here to the community to talk through what we're thinking and to get your feedback. This is what we're thinking thus far:

#### Proposed material for dev guide

rOpenSci staff tasks:

* If a repository hasn't seen any action in quite a long time it may simply be a mature package with little need for changes/etc., so take this into account.

* Current maintainer has not responded to issues/PR's in many months, via any of emails, Github issues, or Slack messages:
    
    * Make contact and see what the situation is. They may say they'd like to step down as maintainer, in which case look for a new maintainer

* Current maintainer is completely missing/not responding
    
    * If this happens we will try to contact the maintainer for up to one month. However, if updating the package is urgent, we may use our admin access to make changes on their behalf.

* Put a call out in the "Call for Contributors" section of the rOpenSci newsletter for a new maintainer

Package maintainer tasks:

* Add yourself as the new maintainer in the DESCRIPTION file, with `role = c("aut", "cre")`, and make the former maintainer `aut` only.

* Make sure to change maintainer to your name anywhere else in the package, while retaining the former maintainer as an author (e.g, package level manual file, CONTRIBUTING.md, CITATION, etc.)

* The rOpenSci Development Guide has guidance about adding new maintainers and collaborators at <https://ropensci.github.io/dev_guide/collaboration.html#onboarding-collaborators> and <https://ropensci.github.io/dev_guide/collaboration.html#welcoming-collaborators-to-ropensci>

* If the package has been archived by CRAN and there is a maintainer change, have the old maintainer email CRAN and put in writing who the new maintainer is. Make sure to mention that email about the maintainer change when you submit the first new version to CRAN. If the old maintainer is unreachable or will not send this email get in touch with rOpenSci staff.

* If the old maintainer is un-reachable ... we haven't landed on a solution here yet; we're open to ideas.

Code changes:

* The _Package Evolution_ section of the dev guide <https://ropensci.github.io/dev_guide/evolution.html> has guidance on how to think about code changes, and applies when taking over a package.

* If the new maintainer has any questions about the code reach out to the rOpenSci community, including rOpenSci staff.


### Your thoughts?

We want to hear from you. What aspects of taking over maintenance of a software package have we left out? Why or why wouldn't you consider taking over maintainance of a package?







[bus]: https://en.wikipedia.org/wiki/Bus_factor
[devg]: https://ropensci.github.io/dev_guide/
