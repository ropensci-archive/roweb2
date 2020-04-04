---
title: Trying to Insert Citations
author:
  - Maëlle Salmon
date: '2020-04-04'
slug: trying-to-insert-citations
categories: []
tags:
  - citation
  - bibtex
package_version: 0.1.0
description: A very short summary of your post (~ 100 characters)
output:
  html_document:
    keep_md: yes
---






Through the helpful feedback from the ROpenSci community[^ropensci], the package
has recently passed software review and a supporting article was
recently published in the Journal of Open Source Software [^Lau2020],
in which you can find more details about the package. The package is
hosted through the ROpenSci organization on Github, and the package
can be installed using the [devtools](https://devtools.r-lib.org)
library [^R-devtools] directly from the repository
(https://github.com/ROpenSci/Rclean).

blabla [^R-CodeDepends]

more blabla [^Pasquier2017]

more more blabla [^R-reprex]

oh right cool [^R-drake] really [^Carata2014]

[^R-reprex]: Bryan J, Hester J, Robinson D, Wickham H (2019). _reprex:
Prepare Reproducible Example Code via the Clipboard_. R package version
0.3.0, <URL: https://CRAN.R-project.org/package=reprex>.

[^Carata2014]: Carata L, Akoush S, Balakrishnan N, Bytheway T, Sohan R,
Seltzer M, Hopper A (2014). "A Primer on Provenance." _Queue_, *12*(3),
10-23. ISSN 15427730,
\Sexpr[results=rd,stage=build]{tools:::Rd_expr_doi("10.1145/2602649.2602651")},
<URL: http://dl.acm.org/citation.cfm?doid=2602649.2602651>.

[^R-drake]: Landau WM (2020). _drake: A Pipeline Toolkit for
Reproducible Computation at Scale_. R package version 7.10.0, <URL:
https://CRAN.R-project.org/package=drake>.

[^Lau2020]: Lau M, Pasquier TFJ, Seltzer M (2020). "Rclean: A Tool for
Writing Cleaner, More Transparent Code." _Journal of Open Source
Software_, *5*(46), 1312.
\Sexpr[results=rd,stage=build]{tools:::Rd_expr_doi("10.21105/joss.01312")},
<URL: https://doi.org/10.21105/joss.01312>.

[^Pasquier2017]: Pasquier T, Lau MK, Trisovic A, Boose ER, Couturier B,
Crosas M, Ellison AM, Gibson V, Jones CR, Seltzer M (2017). "If these
data could talk." _Scientific Data_, *4*, 170114. ISSN 2052-4463,
\Sexpr[results=rd,stage=build]{tools:::Rd_expr_doi("10.1038/sdata.2017.114")},
<URL: http://www.nature.com/articles/sdata2017114>.

[^R-CodeDepends]: Temple Lang D, Peng R, Nolan D, Becker G (2020).
_CodeDepends: Analysis of R Code for Reproducible Research and Code
Comprehension_. R package version 0.6.5, <URL:
https://github.com/duncantl/CodeDepends>.

[^R-devtools]: Wickham H, Hester J, Chang W (2019). _devtools: Tools to
Make Developing R Packages Easier_. R package version 2.2.1, <URL:
https://CRAN.R-project.org/package=devtools>.

[^ropensci]: rOpenSci is cool, isn't it?
