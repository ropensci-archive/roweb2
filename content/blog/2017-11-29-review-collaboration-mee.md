---
slug: "review-collaboration-mee"
title: "Announcing a New rOpenSci Software Review Collaboration"
date: 2017-11-29
authors:
  - name: Maëlle Salmon
    url: https://masalmon.eu/
  - name: Noam Ross
    url: http://www.noamross.net/
  - name: Scott Chamberlain    
  - name: Karthik Ram
categories: blog
topicid: 982
tags:
- software
- review
- onboarding
- R
---


rOpenSci is pleased to announce a new collaboration with the [Methods in Ecology and Evolution (MEE)][meehome], a journal of the [British Ecological Society][bes], published by Wiley press [^1]. Publications destined for MEE that include the development of a scientific R package will now have the option of a joint review process whereby the R package is reviewed by rOpenSci, followed by fast-tracked review of the manuscript by MEE. Authors opting for this process will be recognized via a mark on both web and print versions of their paper. 

We are very excited for this partnership to improve the rigor of both scientific software and software publications and to provide greater recognition to developers in the fields of ecology and evolution.  It is a natural outgrowth of our interest in supporting scientists in developing and maintaining software, and of MEE's mission of vetting and disseminating tools and methods for the research community. The collaboration formalizes and eases a path already pursued by researchers: The [**rotl**][rotlmee], [**RNexML**][RNeXMLmee], and [**treebase**][treebasemee] packages were all developed or reviewed by rOpenSci and subsequently had associated manuscripts published in MEE.

### About rOpenSci software review

[rOpenSci][ro] is a diverse community of researchers from academia, non-profit, government, and industry who collaborate to develop and maintain tools and practices around open data and reproducible research. The rOpenSci suite of tools is made of core infrastructure software developed and maintained by the [project staff][roteam]. The suite also contains numerous packages that are contributed by members of the broader R community. The volume of community submissions has grown considerably over the years necessitating a formal system of review quite analogous to that of a peer reviewed academic journal. 

rOpenSci welcomes full software submissions that fit within our [aims and scope][fit], with the option of a pre-submission inquiry in cases when the scope of a submission is not immediately obvious. This software peer review framework, known as the rOpenSci Onboarding process, operates with three editors and one editor in chief who carefully vet all incoming submissions. After an editorial review, editors solicit detailed, public and signed reviews from two reviewers, and the path to acceptance from then on is similar to a standard journal review process. Details about the system are described in [various][post1] [blog][post2] [posts][post3] by the editorial team.

### Collaboration with journals 

This is our second collaboration with a journal. Since late 2015, rOpenSci has partnered with the [Journal of Open Source software (JOSS)][joss], an open access journal that publishes brief articles on research software. Packages accepted to rOpenSci can be submitted for fast-track publication at JOSS, in which JOSS editors may evaluate based on rOpenSci's reviews alone. As rOpenSci's review criteria is significantly more stringent and designed to be compatible with JOSS, these packages are generally accepted without additional review. We have had great success with this partnership providing rOpenSci authors with an additional venue to publicize and archive their work. Given this success, we are keen on expanding to other journals and fields where there is potential for software reviewed and created by rOpenSci to play a significant role in supporting scientific findings.

### The details

Our new partnership with MEE broadly resembles that with JOSS, with the major difference that MEE, rather than rOpenSci, leads review of the manuscript component.  Authors with R packages and associated manuscripts that fit the Aims and Scope for both [rOpenSci][fit] and [MEE][meeaimsscope] are encouraged to first submit to rOpenSci. The [**rotl**][rotlmee], [**RNexML**][RNeXMLmee], and [**treebase**][treebasemee] packages are all great examples of such packages. MEE editors may also refer authors to this option if authors submit an appropriate manuscript to MEE first. 

On submission to rOpenSci, authors can use our updated [submission template][subtemp] to choose MEE as a publication venue. Following acceptance by rOpenSci, the associated manuscript will be reviewed by an expedited process at MEE, with reviewers and editors having the knowledge that the software has already been reviewed and the public reviews available to them.  

Should the manuscript be accepted, a footnote will appear in the web version and the first page of the print version of the MEE article indicating that the software as well as the manuscript has been peer-reviewed, with a link to the rOpenSci open reviews.

As with any collaboration, there may be a few hiccups early on and we welcome ideas to make the process more streamlined and efficient. We look forward to the community's submissions and to your participation in this process.

Many thanks to MEE's Assistant Editor Chris Grieves and Senior Editor Bob O'Hara for working with us on this collaboration.

[^1]: See also MEE's post from today at <https://methodsblog.wordpress.com/2017/11/29/software-review/>

[onrepo]: https://github.com/ropensci/onboarding/
[ro]: https://ropensci.org/
[roteam]: https://ropensci.org/about#team
[joss]: http://joss.theoj.org/
[meehome]: http://besjournals.onlinelibrary.wiley.com/hub/journal/10.1111/(ISSN)2041-210X/
[subtemp]: https://github.com/ropensci/onboarding/blob/master/issue_template.md
[post1]: https://ropensci.org/blog/2016/03/28/software-review/
[post2]: https://ropensci.org/blog/2017/09/01/nf-softwarereview/
[post3]: https://ropensci.org/blog/2017/09/11/software-review-update/
[fit]: https://github.com/ropensci/onboarding/blob/master/policies.md#aims-and-scope
[policies]: https://github.com/ropensci/onboarding/blob/master/policies.md#ropensci-policies
[rotl]: https://github.com/ropensci/rotl
[rotlmee]: http://onlinelibrary.wiley.com/doi/10.1111/2041-210X.12593/abstract
[meeaimsscope]: http://www.methodsinecologyandevolution.org/view/0/aimsAndScope.html
[treebasemee]: http://onlinelibrary.wiley.com/doi/10.1111/j.2041-210X.2012.00247.x/abstract
[RNeXMLmee]: http://onlinelibrary.wiley.com/doi/10.1111/2041-210X.12469/abstract
[bes]: http://www.britishecologicalsociety.org/
