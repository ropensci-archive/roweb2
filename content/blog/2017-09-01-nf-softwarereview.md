---
name: nf-softwarereview
layout: post_discourse_canonical
title: "How rOpenSci uses Code Review to Promote Reproducible Science"
date: 2017-09-01
authors:
  - name: Noam Ross
    url: https://twitter.com/noamross
  - name: Scott Chamberlain
  - name: Karthik Ram
  - name: Maëlle Salmon
    url: http://www.masalmon.eu/
categories:
  - blog
topicid: 850
tags:
- software
- review
- community
- onboarding
---

<div class="alert alert-info" role="alert">
This is cross-posted from the NumFOCUS blog. NumFOCUS is a nonprofit that supports and promotes world-class, innovative, open source scientific computing, including rOpenSci.
</div>

At rOpenSci, we create and curate software to help scientists with the data life cycle. These tools access, download, manage, and archive scientific data in open, reproducible ways. Early on, we realized this could only be a community effort. The variety of scientific data and workflows could only be tackled by drawing on contributions of scientists with field-specific expertise.

With the community approach came challenges. **How could we ensure the quality of code written by scientists without formal training in software development practices? How could we drive adoption of best practices among our contributors? How could we create a community that would support each other in this work?**

**We have had great success addressing these challenges via the _peer review_.** We draw elements from a process familiar to our target community – _academic peer review_ – and a practice from the software development world – _production code review_ – to create a system that fosters software quality, ongoing education, and community development.

## An Open Review Process
**Production software review** occurs within software development teams, open source or not. Contributions to a software project are reviewed by one or more other team members before incorporation into project source code. Contributions are typically small patches, and review serves as a check on quality, as well as an opportunity for training in team standards.

**In academic peer review**, external reviewers critique a complete product – usually a manuscript – with a very broad mandate to address any areas they see as deficient. Academic review is often anonymous and passing through it gives the product, and the author, a public mark of validation.

**We blend these approaches.** In our process, authors submit complete R packages to rOpenSci. Editors check that packages fit into our project’s scope, run a series of automated tests to ensure a baseline of code quality and completeness, and then assign two independent reviewers. Reviewers comment on usability, quality, and style of software code as well as documentation. Authors make changes in response, and once reviewers are satisfied with the updates, the package receives a badge of approval and joins our suite.

This process is quite iterative. After reviewers post a first round of extensive reviews, authors and reviewers chat in an informal back-and-forth, only lightly moderated by an editor. This lets both reviewers and authors pose questions of each other and explain differences of opinion. It can proceed at a much faster pace than typical academic review correspondence. We use the GitHub issues system for this conversation, and responses take minutes to days, rather than weeks to months.

**The exchange is also open and public**. Authors, reviewers, and editors all know each other’s identities. The broader community can view or even participate in the conversation as it happens. This provides an incentive to be thorough and provide non-adversarial, constructive reviews. Both authors and reviewers report that they enjoy and learn more from this open and direct exchange. It also has the benefit of building community. Participants have the opportunity to meaningfully network with new peers, and new collaborations have emerged via ideas spawned during the review process.

We are aware that open systems can have drawbacks. For instance, in traditional academic review, double-blind peer review [can increase representation of female authors](http://www.sciencedirect.com/science/article/pii/S0169534707002704), suggesting bias in non-blind reviews. It is also possible reviewers are less critical in open review. However, we posit that the openness of the review conversation provides a check on review quality and bias; it’s harder to inject unsupported or subjective comments in public and without the cover of anonymity. Ultimately, we believe the ability of authors and reviewers to have direct but public communication improves quality and fairness.

## Guidance and Standards
**rOpenSci provides guidance on reviewing.** This falls into two main categories: **high-level best practices** and **low-level standards**. High-level best practices are general and broadly applicable across languages and applications. These are practices such as “Write re-usable functions rather than repeating the same code,” “Test edge cases,” or “Write documentation for all of your functions.” Because of their general nature, these can be drawn from other sources and not developed from scratch. Our best practices are based on guidance originally developed by [Mozilla Science Lab](https://mozillascience.github.io/codeReview/intro.html).

Low-level standards are specific to a language (in our case, R), applications (data interfaces) and user base (researchers). These include specific items such as naming conventions for functions, best choices of dependencies for certain tasks, and adherence to a code style guide. We have an extensive set of standards for our reviewers to check. These change over time as the R software ecosystem evolves, best practices change, and tooling and educational resources make new methods available to developers.

**Our standards also change based on feedback from reviewers.** We adopt into our standards suggestions that emerge in multiple reviewers across different packages. Many of these, we’ve found, have to do with with the ease-of-use and consistency of software APIs, and the type and location of information in documentation that make it easiest to find. This highlights one of the advantages of external reviewers – they can provide a fresh perspective on usability, as well as test software under different use-cases than imagined by the author.

**As our standards have become more extensive, we have come to rely more on automated tools.** The R ecosystem, like most languages, has a suite of tools for code linting, function testing, static code analysis and continuous integration. We require authors to use these, and editors run submissions through a suite of tests prior to sending them for review. This frees reviewers from the burden of low-level tasks to focus on high-level critiques where they can add the most value.

## The Reviewer Community
One of the core challenges and rewards of our work has been developing a community of reviewers.

**Reviewing is a high-skill activity.** Reviewers need expertise in the programming methods used in a software package and also the scientific field of its application. (“Find me someone who knows sensory ecology and sparse data structures!”) They need good communications skills and the time and willingness to volunteer. Thankfully, the open-science and open-source worlds are filled with generous, expert people. We have been able to expand our reviewer pool as the pace of submissions and the domains of their applications have grown.

Developing the reviewer pool requires constant recruitment. Our editors actively and broadly engage with developer and research communities to find new reviewers. We recruit from authors of previous submissions, co-workers and colleagues, at conferences, through our other collaborative work and on social media. In the open-source software ecosystem, one can often identify people with particular expertise by looking at their published software or contribution to other projects, and we often will cold-email potential reviewers whose published work suggests they would be a good match for a submission.

We cultivate our reviewer pool as well as expand it. We bring back reviewers so that they may develop reviewing as a skill, but not so often as to overburden them. We provide guidance and feedback to new recruits. When assigning reviewers to a submission, we aim to pair experienced reviewers with new ones, or reviewers with expertise on a package’s programming methods with those experienced in its field of application. **These reviewers learn from each other, and diversity in perspectives is an advantage**; less experienced developers often provide insight that more experienced ones do not on software usability, API design, and documentation. More experienced developers will more often identify inefficiencies in code, pitfalls due to edge-cases, or suggest alternate implementation approaches.

## Expanding Peer Review for Code
Code review has been one of rOpenSci’s best initiatives. We build software, build skills, and build community, and the peer review process has been a major catalyst for all three. It has made both the software we develop internally and that we accept from outside contributors more reliable, usable, and maintainable. So **we are working to promote open peer review of code by more organizations** working with scientific software. We helped launch [The Journal of Open Source Software](http://joss.theoj.org/), which uses a version of our review process to provide a developer-friendly publication venue. JOSS’s success has led to a spin-off, the [Journal of Open Source Education](http://jose.theoj.org/), which uses an open, code-review-like processes to provide feedback on curricula and educational materials. We are also developing a pilot program where software papers submitted to a partner academic journal receive a badge for going through rOpenSci review. We are encouraged by other review initiatives like [ReScience](https://rescience.github.io/) and [The Programming Historian](https://programminghistorian.org/). [BioConductor](https://www.bioconductor.org/)’s code reviews, which predate ours by several years, recently switched to an open model.

**If your organization is developing or curating scientific code**, we believe code review, implemented well, can be a great benefit. It can take considerable effort to begin, but **here are some of the key lessons we’ve learned that can help:**

- **Develop standards and guidelines** for your authors and reviewers to use. Borrow these freely from other projects (feel free to use ours), and modify them iteratively as you go.
- **Use automated tools** such as code linters, test suites, and test coverage measures to reduce burden on authors, reviewers, and editors as much as possible.
- **Have a clear scope.** Spell out to yourselves and potential contributors what your project will accept, and why. This will save a lot of confusion and effort in the future.
- **Build a community** through incentives of networking, opportunities to learn, and kindness.

**rOpenSci is eager to work with other groups interested in developing similar review processes**, especially if you are interested in reviewing and curating scientific software in languages other than R or beyond our scope of supporting the data life cycle. Software that implements statistical algorithms, for instance, is an area ripe for open peer review of code. Please [get in touch](https://ropensci.org/contact.html) if you have questions or wish to co-pilot a review system for your project.

And of course, if you want to review, we’re always looking for volunteers. Sign up at https://ropensci.org/onboarding.

---
You can support rOpenSci by [becoming a NumFOCUS member](https://www.numfocus.org/community/donate/) or making a [donation to the project](https://www.numfocus.org/open-source-projects/).
