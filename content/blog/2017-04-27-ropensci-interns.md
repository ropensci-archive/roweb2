---
slug: ropensci-interns
title: Welcome to our rOpenSci Interns
date: '2017-04-27'
authors:
  - Scott Chamberlain
  - Stefanie Butland
categories: blog
topicid: 674
tags:
  - community
---

There's a lot of work that goes in to making software: the code that does the thing itself, unit testing, examples, tutorials, documentation, and support. rOpenSci software is created and maintained both by our [staff](/about/#staff) and by our (awesome) community. In keeping with our aim to build capacity of software users and developers, three interns from our academic home at [UC Berkeley](https://bids.berkeley.edu/research) are now working with us as well. Our interns are mentored by [Carl Boettiger](/about/#team), [Scott Chamberlain](/about/#team), and [Karthik Ram](/about/#team) and they will receive academic credit and/or pay for their work.

## The interns

- Katie Rice:
    - Is a third-year undergraduate student doing a major in Environmental Sciences and a minor in Sustainable Design
    - [Katie on GitHub](https://github.com/katieroserice)
- Diana Ly:
    - Is a third-year undergraduate student doing a major in Mathematics.
	- [Diana on GitHub](https://github.com/diana-ly)
- Siwei (Steven) Ye:
    - Is a second-year undergraduate student doing a double major in Mathematics and Statistics

## What they're working on

### Katie

<img src="/assets/blog-images/2017-04-27-ropensci-interns/katie.jpg" width="250">

README's are the first thing someone reads when landing on a GitHub repository. Thus, it's important that the README has sufficient information to tell the reader what the software is for, who it's meant for, what it does, how to install and how to give feedback.

Most software maintainers do a good job with how to install and how to give feedback (link to issues tab usually), but we often fall short on describing at a high level what the piece of software is about.

This is where Katie comes in! She's been going through [rOpenSci repositories](https://github.com/ropensci) on GitHub, improving the high level description of the software and then sending pull requests with changes to the README's.

Check out Katie's [GitHub activity for rOpenSci related work](https://github.com/search?p=1&q=is%3Apr+involves%3Akatieroserice+user%3Aropensci&type=Issues)


### Diana

<img src="/assets/blog-images/2017-04-27-ropensci-interns/diana.jpg" width="350">

Diana is just getting started. She'll be working on documentation and maintenance.

In addition, she'll be working on an R package that will make it easy to make [cheatsheets](https://github.com/ropensci/cheatsheets) for packages from simple markdown templates - no editing powerpoint or keynote files needed!

<br>

### Steven

<img src="/assets/blog-images/2017-04-27-ropensci-interns/steven.JPG" width="250">

[Software unit tests](https://en.wikipedia.org/wiki/Unit_testing) (method to determine whether software components perform as designed) are very important. We have it as [policy that packages submitted to our onboarding repository have tests](https://devguide.ropensci.org/building.html#testing).

In addition, we build and check our software on each change (includes running tests). However, since rOpenSci has been around for a while, there are still some packages that don't have tests, or enough of them. In addition, when you have tests, you can calculate test coverage using, for example with [Codecov](https://codecov.io/) - a good way to target what tests to write.

Lastly, it's ideal to signal to potential users that you have continuous integration and test coverage through badges, like this one:

[![codecov.io](https://codecov.io/github/ropensci/rredlist/coverage.svg?branch=master)](https://codecov.io/github/ropensci/rredlist?branch=master)

This is where Steven comes in! When a package has tests already, he adds integration for Codecov and a badge for it (like the one above) when it's missing. When packages don't have tests, he writes them, including integrating Codecov.

Check out Steven's [GitHub activity for rOpenSci related work](https://github.com/search?p=1&q=is%3Apr+involves%3Asteven2249+user%3Aropensci&type=Issues).

<br><br>

## Want to be an rOpenSci intern?

We'll be looking for new interns from time to time. Contact us at [info@ropensci.org](mailto:info@ropensci.org) with any questions.
