---
slug: thanking-reviewers-in-metadata
title: 'Thanking Your Reviewers: Gratitude through Semantic Metadata'
date: '2018-03-16'
author:
  - Noam Ross
  - Maëlle Salmon
  - Karthik Ram
  - Scott Chamberlain
topicid: 1101
tags:
  - community
  - Software Peer Review
  - metadata
---

At rOpenSci, our [R package peer review process] relies on the the hard work of many volunteer reviewers.  These community members donate their [time] and expertise to improving the quality of  rOpenSci packages and helping drive best practices into scientific software.  

Our _open_ review process, where reviews and reviewers are public, means that one benefit for reviewers is that they can get credit for their reviews.  We want reviewers to see as much benefit as possible, and for their contributions to be recorded as part of the intellectual trail of academic work, so we have been working at making reviews visible and discoverable.

That is why we are very excited about a tiny change in yesterday's release of R 3.4.4.

If your are running R 3.4.3, and type `utils:::MARC_relator_db_codes_used_with_R` into the console, you get this:

```r
> utils:::MARC_relator_db_codes_used_with_R
 [1] "aut" "com" "ctr" "ctb" "cph" "cre" "dtc" "fnd" "ths" "trl"
```

Under 3.4.4, you get this:

```r
> utils:::MARC_relator_db_codes_used_with_R
 [1] "aut" "com" "ctr" "ctb" "cph" "cre" "dtc" "fnd" "rev" "ths" "trl"
```

What's that little `"rev"` that shows up, third from right? It's the official inclusion of "Reviewer" as an R package author role! 🎉 

These three-letter codes come from the [MARC (Machine-Readable Cataloging) terms][marc] vocabulary, a standard set of authorship types originally created for some of the first computerized library systems. R uses these codes to distinguish between different types of package authors. You may be familiar with some of these terms that show up in `DESCRIPTION` files, like so:

```
Authors@R: person("Scott", "Chamberlain", role = c("aut", "cre"), 
       comment = c(ORCID = "0000-0003-1444-9135"))
```

Here `aut` and `cre` stand for "Author" and "Creator", indicating that Scott is the original and major creator of a package.  You may have also seen `ctb` (Contributor) or `cph` (Copyright Holder[^1]).

[^1]: I can't get through this post without mentioning that _Her Majesty the Queen in Right of Canada, as represented by the Minister of Natural Resources Canada_, is `cph` on [eight CRAN packages](https://github.com/search?utf8=%E2%9C%93&q=org%3Acran+Her+Majesty+the+Queen+in+Right+of+Canada%2C+as+represented+by+the+Minister+of+Natural+Resources+Canada+filename%3ADESCRIPTION&type=Code). 👑 

Standard descriptors like this are important because they allow for information about authorship to be machine-readable and credit for authors' work to be cataloged and transferred. When metadata about R packages is displayed in help files or on websites, it's clear the role everyone has played. Such metadata is also critical to [transitive credit], the important task of tracking contributions  through chains of dependencies so as to provide recognition to software developers and data providers that the traditional citation system often misses.

While there are many more[^2] MARC relator terms, R only allows the a small set that make sense in the context of software packages.  These are found in  `utils:::MARC_relator_db_codes_used_with_R`. Codes outside this set this set won't pass R CMD Check and are not allowed on CRAN.

[^2]: Found [here](https://www.loc.gov/marc/relators/relaterm.html) or as a handy data frame with descriptions in `utils:::MARC_relator_db`

We believe peer reviewers make an imporant contribution the quality of published software. That's why last year we requested R-Core add `"rev"` (Reviewer), to the list of allowed contributor types. And Lo and Behold, Kurt Hornik made the [change] on our behalf [^3]. It is now in the release version of R.

[^3]: R-core also added `"fnd"` (Funder) in R 3.4.3.

Since CRAN uses the development version of R to check and build packages, the option has actually been available on CRAN for a while. A trickle of authors have been already been awknowledging peer-reviewers in this way by in their [package DESCRIPTION files].

We hope to see adoption of reviewer acknowledgements in software metadata beyond rOpenSci.  It can be adopted by authors who submit to [JSS], [JOSS], or any journal or process where reviewers make significant comments on software code or documentation.  For non-R software, we're [working on] including reviewers in [codemeta], a cross-language software metadata standard.

A few notes about how this development relates specifically to rOpenSci's peer-review process:

-   First, it is 100% the choice of package authors to decide whether reviewers made a sufficient contribution to be included in `Authors` in this way.  While we promote this option _in general_, we'll never ask an author to specifically include a reviewer.  Like a manuscript's acknowledgements section, the `Author` section is under developer control. It is also up to reviewers whether they _want_ to be included, so package authors should ask reviewers first.

-   Second, rOpenSci editors should _not_ be listed under `Authors`. `"edt"` (Editor) is not a valid R authorship role, and we are a step too far removed to be included.  But we are flattered by those who have asked.

-   Finally, if you do include reviewers in this way, we think it's best practice to include information linking back to the review, like so:

    ```
    person("Bea", "Hernández", role = "rev",
           comment = "Bea reviewed the package for rOpenSci, see 
                      https://github.com/ropensci/onsoftware-reviewssues/116")
    ```

We are very excited about this development and how it can improve incentives for peer review. Thanks to R-core for getting aboard with this, and the early adopters who tested it!

Sincerely,

```
c(
    person("Noam", "Ross", role = c("aut", "cre", "lbt")),
    person("Maëlle", "Salmon", role = c("rev", "med"),
           comment = "Comments to improve structure of the introduction")
    person("Karthik", "Ram", role = c("rev", "elt"),
         comment = "Fixed a small typo"),
    person("Scott", "Chamberlain", role = c("rev", "sce"),
           comment = "Agrees with Maëlle about the intro.")
  )
```

[time]: /blog/2016/03/28/software-review/#review-takes-a-lot-of-time

[R package peer review process]: /blog/2017/09/01/nf-softwarereview/

[change]: https://github.com/wch/r-source/blame/cb9b0506cced030613e06fb92799a1d1807bc257/src/library/utils/R/sysdata.R#L37

[package DESCRIPTION files]: https://github.com/search?utf8=%E2%9C%93&q=user%3Acran+filename%3ADESCRIPTION+person+role+rev+ropensci&type=Code

[marc]: https://en.wikipedia.org/wiki/MARC_standards

[transitive credit]: https://openresearchsoftware.metajnl.com/articles/10.5334/jors.be/

[JSS]: https://www.jstatsoft.org/

[JOSS]: https://joss.theoj.org/

[working on]: https://github.com/codemeta/codemeta/issues/177

[codemeta]: https://codemeta.github.io/
