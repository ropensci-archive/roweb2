---
slug: first-review-experiences
title: Experiences as a first time rOpenSci package reviewer
date: '2017-09-08'
author:
  - Verena Haunschmid
topicid: 861
tags:
  - R
  - software
  - Software Peer Review
  - reviewer
---

It all started January 26<sup>th</sup> this year when I signed up to volunteer as
a reviewer for R packages submitted to rOpenSci. My main motivation for
wanting to volunteer was to learn something new and to
contribute to the R open source community. If you are wondering why the
people behind rOpenSci are doing this, you can read [How rOpenSci uses Code Review to Promote Reproducible Science](https://www.numfocus.org/blog/how-ropensci-uses-code-review-to-promote-reproducible-science/).

Three months later I was contacted by [Maëlle Salmon](https://twitter.com/masalmon) asking whether I was interested in
reviewing the R package [`patentsview`](https://github.com/ropensci/patentsview) for rOpenSci. And yes, I
was! To be honest I was a little bit thrilled.

The packages are submitted for review to rOpenSci via an issue to their
GitHub repository and also the reviews happen there. So you can check out
[all previous package submissions and reviews](https://github.com/ropensci/software-review/issues).
With all the information you
get from rOpenSci and also the help from the editor it is straightforward
to do the package review. Before I started I read the
reviewer guides (links below) and checked out a few of the existing
reviews. I installed the package `patentsview` from GitHub and also
downloaded the source code so I could check out how it was implemented.

I started by testing core functionality of the package by
running the examples that were mentioned in the README of the
package. I think this is a good
starting point because you get a feeling of what the author wants to
achieve with the package. Later on I came up with my
own queries (side note: this R package interacts with an API from which
you can query patents). During the process I used to switch between
writing queries like a normal user of the package
would do and checking the code. When I saw something in the code that
wasn't quite clear to me or looked wrong I went back to writing new
queries to check whether the behavior of the methods was as expected.

With this approach I was able to give feedback to the package author
which led to the inclusion of an additional unit test, a helper function
that makes the package easier to use, clarification of an error message
and an improved documentation. You can find the review I did [here](https://github.com/ropensci/software-review/issues/112#issuecomment-303462505).

There are several R packages that helped me get started with my review,
e.g. [`devtools`](https://github.com/hadley/devtools) and
[`goodpractice`](https://github.com/MangoTheCat/goodpractice). These
packages can also help you when you start writing your own packages. An
example for a very useful method is `devtools::spell_check()`, which
performs a spell check on the package description and on manual pages.
At the beginning I had an issue with `goodpractice::gp()` but Maelle Salmon
(the editor) helped me resolve it.

In the rest of this article you can read what I gained personally from doing a
review.

### Contributing to the open source community

When people think about contributing to the open source community, the
first thought is about creating a new R package or contributing to one
of the major packages out there. But not everyone has the resources
(e.g. time) to do so. You also don't have awesome ideas every other day
which can immediately be implemented into new R packages to be used by
the community. Besides contributing with code there are also lots of
other things than can be useful for other R users, for example writing
blog posts about problems you solved, speaking at meetups or reviewing
code to help improve it. What I like much about reviewing code is that
people see things differently and have other experiences. As a reviewer,
you see a new package from the user's perspective which can be hard for
the programmer themselves. Having someone else
review your code helps finding things that are missing because they seem
obvious to the package author or detect code pieces that require more
testing. I had a great feeling when I finished the review, since I had
helped improve an already amazing R package a little bit more.


### Reviewing helps improve your own coding style

When I write R code I usually try to do it in the best way possible.
[Google's R Style Guide](https://google.github.io/styleguide/Rguide.xml)
is a good start to get used to coding best practice in R and I also
enjoyed reading [Programming Best Practices
Tidbits](https://github.com/timoxley/best-practices). So normally
when I think some piece of code can be improved (with respect to speed,
readability or memory usage) I check online whether I can find a
better solution. Often you just don't think something can be
improved because you always did it in a certain way or the last time you
checked there was no better solution. This is when it helps to follow
other people's code. I do this by reading their blogs, following many R
users on Twitter and checking their GitHub account. Reviewing an R
package also helped me a great deal with getting new ideas because I
checked each function a lot more carefully than when I read blog posts.
In my opinion, good code does not only use the best package for each
problem but also the small details are well implemented. One thing I
used to do wrong for a long time was filling of data.frames until I
found a better (much faster)
[solution on stackoverflow](https://stackoverflow.com/a/29419402).
And with respect to this you
can learn a lot from someone else's code. What I found really cool in
the package I reviewed was the usage of small helper functions (see
[utils.R](
https://github.com/ropensci/patentsview/blob/c03e1ab2537873d7a9b76025b0072953efb475c1/R/utils.R)).
Functions like `paste0_stop` and `paste0_message` make the rest of the
code a lot easier to read.

### Good start for writing your own packages

When reviewing an R package, you check the code like a really observant
user. I noticed many things that you usually don't care about when using
an R package, like comments, how helpful the documentation and the
examples are, and also how well unit tests cover the code. I think that
reviewing a few good packages can prepare you very well for writing your
own packages.

### Do you want to contribute to rOpenSci yourself?

If I motivated you to become an rOpenSci reviewer, please sign up! Here
is a list of useful things if you want to become an rOpenSci reviewer
like me.

-   [Form to sign up (just takes a minute)](/onboarding/)

-   [Information for reviewers](https://devguide.ropensci.org/reviewerguide.html)

-   [Mozilla reviewing guide](https://mozillascience.github.io/codeReview/review.html)

- While writing this blog post I found a nice article about [contributing
to the tidyverse](https://www.tidyverse.org/articles/2017/08/contributing/) which is
mostly also applicable to other R packages in my opinion.

If you are generally interested in either submitting or reviewing an R package, I would like to invite you to the [ Community Call on rOpenSci software review and onboarding](/blog/2017/08/31/comm-call-v14).
