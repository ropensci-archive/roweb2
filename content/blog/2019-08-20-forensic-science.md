---
slug: forensic-science
title: "Introducing Open Forensic Science in R"
#package_version: 0.1.0
author:
  - Sam Tyner
date: 2019-08-20
categories: blog
topicid: 1805
preface: This work was funded by a [2018 rOpenSci Research Fellowship](/blog/2018/02/14/announcing-2018-ropensci-fellows/) to Sam Tyner. See the [related post](https://forensicstats.org/news-posts/discover-forensic-applications-of-the-statistical-language-r-in-new-csafe-book) from the Center for Statistics and Applications in Forensic Evidence (CSAFE).
tags:
- R
- Open Science
- Fellowships
- Open Source
- Open Data
- Forensic Science
# delete the line below
# if you have no preferred image
# for Twitter cards
# bibliography: blog.bib
twitterImg: img/blog-images/2019-08-20-forensic-science/openforscir-hex.png
output: 
  html_document:
    keep_md: true
---
The free online book [*Open Forensic Science in R*](https://sctyner.github.io/OpenForSciR/) was created to foster open science practices in the forensic science community. It is comprised of eight chapters: an introduction and seven chapters covering different areas of forensic science: the validation of DNA interpretation systems, firearms analysis of bullets and casings, latent fingerprints, shoe outsole impressions, trace glass evidence, and decision-making in forensic identification tasks. The chapters of *Open Forensic Science in R* have the same five sections: Introduction, Data, R Package(s), Drawing Conclusions, and Case Study. There is R code throughout the chapter to guide the reader along in an analysis, and the case study walks the reader through solving a forensic science problem in R, from reading the data to answering a specific question such as, "Were these two bullets fired by the same gun?" 

### The Center for Statistics and Applications in Forensic Evidence (CSAFE)

To help more scholars access forensic science research, *Open Forensic Science in R* brings together many open resources created and/or used by the Center for Statistics and Applications in Forensic Evidence ([CSAFE](https://forensicstats.org/)) and the National Institute for Standards and Technology ([NIST](https://www.nist.gov/)). CSAFE was founded in 2015 with the mission of building up the statistical foundations in forensic science. CSAFE is an interdisciplinary NIST [Center of Excellence](https://www.nist.gov/coe) comprised of four institutions: Iowa State University (ISU), Carnegie Mellon University (CMU), University of California Irvine (UCI), and University of Virginia (UVA). The statistics faculty members, postdoctoral researchers, and graduate students working with CSAFE have written many R packages to complete a variety of forensic science tasks, from analyzing shoeprint impressions to comparing marking on bullets. *Open Forensic Science in R* brings many of these forensic science R packages together in one place.

CSAFE is [committed](https://forensicstats.org/blog/2017/11/29/open-source-software-applications-forensics-courtroom/) to open science, and many CSAFE researchers contributed to *Open Forensic Science in R*. As most CSAFE researchers are statisticians, much of CSAFE's research uses R in some capacity. Dedication to open source is vital for advancing the field of forensic science because the current barrier to entry into forensic science research is very high: equipment is very expensive and most software in the field is proprietary, so no one outside of the company selling the software knows exactly how it works. These barriers limit the number of researchers who have access to the field. There are also limited data available to researchers. In many cases, data are limited for practical reasons because they are from real, identifiable people and investigations. CSAFE is committed to releasing as much data as possible to help advance forensic science research, and hosts a large [Forensic Science Data Portal](https://forensicstats.org/data/) to make the data widely available. *Open Forensic Science in R* brings many of the open resources available to current and future forensic science researchers together in one place to encourage openness in the field. 

### Example: Comparing Bullets

<div class="figure" style="text-align: center">
<img src="/img/blog-images/2019-08-20-forensic-science/bullet1.png" alt="<strong>Figure 1:</strong> Two images of partial bullet scans. Were these two bullets fired by the same gun?" width="50%" /><img src="/img/blog-images/2019-08-20-forensic-science/bullet2.png" alt="<strong>Figure 1:</strong> Two images of partial bullet scans. Were these two bullets fired by the same gun?" width="50%" />
<p class="caption"><strong>Figure 1:</strong> Two images of partial bullet scans. Were these two bullets fired by the same gun?</p>
</div>

The chapter ["Firearms: bullets"](https://sctyner.github.io/OpenForSciR/bullets.html) begins by introducing the reader to the terminology of firearms and bullets, and describes the methods used in forensic science to compare bullets. Then, the chapter discusses the open source work by current and former CSAFE researchers. Three dimensional bullet scans, the data of interest, are stored in the [x3p](https://sourceforge.net/p/open-gps/mwiki/X3p/) standard format, and the R package [`x3ptools`](https://heike.github.io/x3ptools/) is used to read the bullet scans in R [^1]. Then, the bullet data are analyzed with the [`bulletxtrctr`](https://heike.github.io/bulletxtrctr/) package [^2]. Each bullet is comprised of many surface scans corresponding to the number of [lands](https://sctyner.github.io/OpenForSciR/glossary.html#def:gunbarrel) on the bullet which came in contact with the gun barrel when fired. The number of surface scans varies by type and manufacturer of the gun. For a comparison of two bullets, a representative cross-section of each 3D surface scan is selected, the curve is removed, some noise is removed, and only the smoothed *bullet signature* remains. (See Figure 2.) This procedure is repeated for all lands of the bullets of interest, and the signatures are compared to each other using a trained random forest available in the package, resulting in scores from zero to one indicating how similar the two signatures are [^3]. In this case, bullets 1 and 2 were fired from the same gun, which can be seen by comparing the bullet 1 lands 2, 3, 4, 5, 6, 1 to the bullet 2 lands 3, 4, 5, 6, 1, 2, respectively. For complete details, see the [Case Study](https://sctyner.github.io/OpenForSciR/bullets.html#case-study-1) section of the chapter. 

<div class="figure" style="text-align: center">
<img src="https://sctyner.github.io/OpenForSciR/open-forensic-science-in-r_files/figure-html/bullets-cscrosscut-1.png" alt="<strong>Figure 2:</strong> At left, the representative cross-sections from two bullets with 6 lands each. At right, the resulting smoothed bullet signatures (dark gray) and the raw signatures (light gray)." width="50%" /><img src="https://sctyner.github.io/OpenForSciR/open-forensic-science-in-r_files/figure-html/bullets-cssigs-1.png" alt="<strong>Figure 2:</strong> At left, the representative cross-sections from two bullets with 6 lands each. At right, the resulting smoothed bullet signatures (dark gray) and the raw signatures (light gray)." width="50%" />
<p class="caption"><strong>Figure 2:</strong> At left, the representative cross-sections from two bullets with 6 lands each. At right, the resulting smoothed bullet signatures (dark gray) and the raw signatures (light gray).</p>
</div>



### How to Contribute & Acknowledgements 

The book will continue to grow, and contributions are welcome via issues or pull requests on the [Github repo](https://github.com/sctyner/OpenForSciR). If you would like to contribute, please follow our [Contributor Code of Conduct](https://github.com/sctyner/OpenForSciR/blob/master/CODE_OF_CONDUCT.md). Thank you to the many CSAFE and NIST researchers who contributed to this project: [Dr. Heike Hofmann](https://hofmann.public.iastate.edu/) (ISU), Dr. Soyoung Park (ISU), [Xiao Hui Tai](http://www.stat.cmu.edu/~xtai/) (CMU), [Dr. Eric Hare](https://twitter.com/ericrhare) (Omni Analytics, formerly ISU), [Dr. Karen Kafadar](https://statistics.as.virginia.edu/faculty-staff/profile/kk3ab) (UVA), Karen Pan (UVA), [Dr. Amanda Luby](https://twitter.com/amandaluby) (CMU), and Dr. Sarah Riman (NIST). Finally, a big thank you goes to the [rOpenSci Fellowship program](/blog/2018/02/14/announcing-2018-ropensci-fellows/) for funding this project.  

[^1]: Heike Hofmann, Susan Vanderplas, Ganesh Krishnan and Eric Hare (2019). x3ptools: Tools for Working with 3D Surface Measurements. R package version 0.0.2.9000. https://github.com/heike/x3ptools
  
[^2]: Heike Hofmann, Susan Vanderplas and Ganesh Krishnan (2018). bulletxtrctr: Automatic Matching of Bullet Striae. R package version 0.2.0. https://heike.github.io/bulletxtrctr/
 
[^3]: Hare, Eric, Heike Hofmann, and Alicia Carriquiry. 2017. "Automatic Matching of Bullet Land Impressions." *The Annals of Applied Statistics* 11 (4): 2332–56.
