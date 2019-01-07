---
slug: author-survey
title: The 2018 author and reviewer survey
date: '2018-04-17'
authors:
  - Karthik Ram
  - Noam Ross
  - Scott Chamberlain
  - Maëlle Salmon
categories: blog
topicid: 1142
tags:
  - community
  - software-peer-review
  - reviewer
  - survey
---

rOpenSci's package review system (aka
[onboarding](https://github.com/ropensci/software-review/)) is one of our key
activities to [improve quality and sustainability of scientific R
packages](https://ropensci.org/blog/2017/09/01/nf-softwarereview/). The
editorial team are constantly working towards improving the experience
for both authors and reviewers. After our first year, we [surveyed
authors and
reviewers](https://ropensci.org/blog/2016/03/28/software-review/) who
participated in our onboarding process to help us better understand
what's working well and where there is room for improvement. At the end
of last year, we did so again, re-designing our survey so as to better
track participant opinions year-to-year. In this post we summarize the
45 responses that we received and what we're doing to address your
feedback.

### Section 1: Satisfaction with the review and onboarding process

![](https://i.imgur.com/x4ICORq.png)![](https://i.imgur.com/pUF0kS0.png)

We're glad to see high levels of overall satisfaction with the
onboarding process. We primarily ask this question to establish a
baseline to compare year-to-year, and hope that we can maintain high
satisfaction as we continue to grow.

###  Section 2: Guidelines for authors and reviewers

![](https://i.imgur.com/Vx0HtQ9.png)![](https://i.imgur.com/N6rYblm.png)

We provide
[packaging](https://ropensci.github.io/dev_guide/building.html)
and
[reviewing](https://ropensci.github.io/dev_guide/reviewerguide.html)
guides for our authors and reviewers to consult before and during the
peer-review process. While both were highly rated, enthusiasm was
greater for the packaging guide than the reviewing guide.

For the packaging guide, authors gave feedback that they could be better
organized, including a suggestion that the collection of markdown files
be converted to a bookdown website for easier navigation. We thought
this was a great suggestion, and have begun the process of porting all
our documentation for packaging and reviewing, into a common bookdown
book. Editor Maëlle Salmon is leading this work, and you can find the
in-progress book, *rOpenSci Packages: Development, Maintenance, and Peer
Review*, [here](https://ropensci.github.io/dev_guide/).

We also got feedback from authors that they wanted guidance on how best
to acknowledge the efforts of reviewers. This was one of our drivers to
get reviewers recognized as MARC author type in package DESCRIPTION
files, which you can read more about in [in this previous blog
post](https://ropensci.org/blog/2018/03/16/thanking-reviewers-in-metadata/).

For the reviewing guide, reviewers suggested greater structure,
including separation between code and UI reviewing, more advice and
examples on how to approach review, better guidance on expectations for
timelines and collaboration between multiple reviewers. We aim to fold
all these suggestions into the book. There are [great posts about how to
tackle a peer review on our blog](https://ropensci.org/tags/reviewer/)
that we will incorporate.

### Section 3: The review process


![](https://i.imgur.com/zNSsW2V.png)![](https://i.imgur.com/noxbYih.png)

This was perhaps the most controversial topic in the responses. Both
authors and reviewers were conflicted about the best time to submit for
review. Submitting early in development could allow reviewers to provide
concrete feedback on software design and usability, but it is generally
hard to review incomplete software. On the other extreme, software that
is mature and already on CRAN may not be able to implement reviewer
suggestions, especially if it would result in breaking changes for
users. One suggestion was to consider packages in both stages and
provide short (less than one hour of review) for early stage packages
and reserve the more detailed reviews for the mature packages.

This has been a perennial tension in the review process. A similar split
came up in our previous survey, and Miles McBain recently wrote about it
in his [blog post about reviewing
**bowerbird**](https://milesmcbain.xyz/ropensci-onboarding2/). As we
don't see a strong net pull in either direction, we don't plan to change
submission requirements, and we're worried that a multi-step process
would make too much work for reviewers. One useful suggestion, though,
is for authors of early-development packages to open discussions on our
[forum](http://discuss.ropensci.org/) to solicit early input.

Some respondents noted the challenge of providing an objective review
under a fully open system, and one suggestion was to consider a single
blinded system in order to allow reviewers (especially more early career
folks) to provide critical comments without fear of retaliation.

#### Automated checking

![](https://i.imgur.com/boRl02k.png)![](https://i.imgur.com/NGtsJpX.png)

We received specific feedback about our use of the **goodpractice**
package to provide automated checks of some package quality issues.
Respondents suggested that authors should pre-run these checks before
submitting, and also to provide better guidance as to which outputs can
be ignored. We're adding
[both](https://github.com/ropenscilabs/dev_guide/issues/12)
[suggestions](https://github.com/ropenscilabs/dev_guide/issues/11) to
the new bookdown book.

There were also suggestions for improvement of **goodpractice** itself.
**goodpractice** was created by [Gábor Csárdi](http://gaborcsardi.org/)
and is maintained by [Mango
Solutions](https://www.mango-solutions.com/). Thankfully Mango data
scientist [Hannah
Frick](https://rladies.org/united-kingdom-rladies/name/hannah-frick/)
has undertaken a project to [improve the package and its
documentation](https://github.com/MangoTheCat/goodpractice/commits/master)
in recent weeks, and is incorporating suggestions we've passed on from
the rOpenSci survey.

As **goodpractice** allows users to ignore some checks and add custom
checks, we also aim this year to have a specialized set of rOpenSci
checks that will align better align with our packaging guide. Finally,
we hope to have these checks run automatically upon submission, reducing
effort for both authors and editors.

### Section 4: Value of software review


![](https://i.imgur.com/TFSA7RZ.png)![](https://i.imgur.com/GME7Kny.png)![](https://i.imgur.com/WPNhiLS.png)![](https://i.imgur.com/plB1hoL.png)

Package authors are given the option to submit directly to the Journal
of Open Source Software (JOSS) for publication.

![](https://i.imgur.com/gE6PNRf.png)

#### The good and the bad with onboarding

We asked authors to tell us some of the best and worst attributes of
participating in onboarding.

*Aspects of onboarding that were challenging?*

-   Deciding when to submit (see above)
-   Package review is quite time consuming.
-   Keeping up with ongoing revisions to the package during submission.
-   Long time lag between review and revision.

*Aspects of onboarding that were great*

-   The opportunity to network and share ideas.
-   The openness and transparency of the entire review process.
-   Learning about software design, package development, and improving
    one's own coding skills.
-   The opportunity to have two thorough code reviews which are quite
    difficult to get elsewhere.
-   The collegial and non-adversarial nature of the process.

![](https://i.imgur.com/YtgnBO0.png)![](https://i.imgur.com/2cBNR2z.png)

#### Did blogging post-acceptance have any impact?

At the completion of each review, the editors invite package authors to
submit either a long-form blog post aimed at a general reader, or a
shorter technical note. Most authors who wrote posts reported greater
visibility for their package and some also enjoyed reflecting on the
development process.

#### Upcoming improvements to onboarding

We're grateful to all the authors and reviewers that took this survey.
The responses have helped us improve our workflow quite a bit and we are
excited to roll out several improvements in the coming weeks to months.
Here are a few things to look forward to:

-   A [much improved (bookdown)
    guide](https://github.com/ropenscilabs/dev_guide) for both package
    development and package reviewing.
-   Improvements to `goodpractice` thanks to Mango The Cat's [Hannah
    Frick](https://rladies.org/united-kingdom-rladies/name/hannah-frick/)
    and also a `goodpractice` API down the line.
-   A new and improved reviewer sign up form that will make it much
    easier for editors to match reviewers to submissions.
-   Suggestions are always welcome even if you missed this round of the
    survey. Chime in in the [issue tracker of our in-progress
    guide](https://github.com/ropenscilabs/dev_guide/issues) or in [this
    other issue
    tracker](https://github.com/ropensci/software-review-meta/issues) where
    we keep track of more general questions & suggestions about
    onboarding.

We hope to see your package or review expertise on the onboarding repo
soon!
