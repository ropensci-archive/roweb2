---
title: rcrossref tutorial
package_version: 0.5.2
---




<section id="installation">

## Installation


```r
install.packages("rcrossref")
```

Or development version from GitHub


```r
devtools::install_github("ropensci/rcrossref")
```


```r
library("rcrossref")
```

<section id="usage">

## Usage

## Citation search

CrossRef's [DOI Content Negotiation](http://www.crosscite.org/cn/) service, where you can citations back in various formats, including `apa`


```r
cr_cn(dois = "10.1371/journal.pone.0112608", format = "text", style = "apa")
#> [1] "Wang, Q., & Taylor, J. E. (2014). Quantifying Human Mobility Perturbation and Resilience in Hurricane Sandy. PLoS ONE, 9(11), e112608. doi:10.1371/journal.pone.0112608"
```

There are a lot more styles. We include a dataset as a character vector within the package, accessible via the `get_styles()` function, e.g.,


```r
get_styles()[1:5]
#> [1] "academy-of-management-review"
#> [2] "acm-sig-proceedings-long-author-list"
#> [3] "acm-sig-proceedings"
#> [4] "acm-sigchi-proceedings-extended-abstract-format"
#> [5] "acm-sigchi-proceedings"
```

`bibtex`


```r
cat(cr_cn(dois = "10.1126/science.169.3946.635", format = "bibtex"))
#> @article{Frank_1970,
#> 	doi = {10.1126/science.169.3946.635},
#> 	url = {http://dx.doi.org/10.1126/science.169.3946.635},
#> 	year = 1970,
#> 	month = {aug},
#> 	publisher = {American Association for the Advancement of Science ({AAAS})},
#> 	volume = {169},
#> 	number = {3946},
#> 	pages = {635--641},
#> 	author = {H. S. Frank},
#> 	title = {The Structure of Ordinary Water: New data and interpretations are yielding new insights into this fascinating substance},
#> 	journal = {Science}
#> }
```

`bibentry`


```r
cr_cn(dois = "10.6084/m9.figshare.97218", format = "bibentry")
#> Boettiger; C (2012). "Regime shifts in ecology and evolution (PhD
#> Dissertation)." <URL: http://doi.org/10.6084/m9.figshare.97218>,
#> <URL: http://dx.doi.org/10.6084/m9.figshare.97218>.
```

## Citation count

Citation count, using OpenURL


```r
cr_citation_count(doi="10.1371/journal.pone.0042793")
#> [1] 8
```

## Search Crossref metadata API

There are two functions that use an older Crossre API: `cr_search()` and `cr_search_free()`. You can of course use them, but the newer Crossref API available through various functions (`cr_agency()`, `cr_fundref()`, `cr_journals()`, `cr_licenses()`, `cr_members()`, `cr_prefixes()`, and `cr_works()`) is more powerful and will recieve more support going forward. The following functions (of the newer set just mentioend) all use the [CrossRef API](https://github.com/CrossRef/rest-api-doc/blob/master/rest_api.md).

### Look up funder information


```r
cr_fundref(query="NSF")
#> $meta
#>   total_results search_terms start_index items_per_page
#> 1             8          NSF           0             20
#>
#> $data
#>             id      location
#> 1    100003187 United States
#> 2    100008367       Denmark
#> 3 501100004190        Norway
#> 4    100000179 United States
#> 5    100006445 United States
#> 6 501100000930     Australia
#> 7    100000001 United States
#> 8 501100001809         China
#>                                                                 name
#> 1                                          National Sleep Foundation
#> 2                          Statens Naturvidenskabelige Forskningsrad
#> 3                                            Norsk Sykepleierforbund
#> 4                                         NSF Office of the Director
#> 5 Center for Hierarchical Manufacturing, National Science Foundation
#> 6                                         National Stroke Foundation
#> 7                                        National Science Foundation
#> 8                       National Natural Science Foundation of China
#>                                                                                                                alt.names
#> 1                                                                                                                    NSF
#> 2                                                                    SNF, Danish National Science Foundation, Danish NSF
#> 3                                                                                     NSF, Norwegian Nurses Organisation
#> 4                                                                                                                     OD
#> 5 CHM, NSF, University of Massachusetts NSF Center for Hierarchical Manufacturing, Center for Hierarchical Manufacturing
#> 6                                                                                                                    NSF
#> 7                                                                                                                    NSF
#> 8                                        Natural Science Foundation of China, National Science Foundation of China, NSFC
#>                                       uri
#> 1    http://dx.doi.org/10.13039/100003187
#> 2    http://dx.doi.org/10.13039/100008367
#> 3 http://dx.doi.org/10.13039/501100004190
#> 4    http://dx.doi.org/10.13039/100000179
#> 5    http://dx.doi.org/10.13039/100006445
#> 6 http://dx.doi.org/10.13039/501100000930
#> 7    http://dx.doi.org/10.13039/100000001
#> 8 http://dx.doi.org/10.13039/501100001809
#>                                                                                                                                                                                                      tokens
#> 1                                                                                                                                                                          national, sleep, foundation, nsf
#> 2                                                                                                      statens, naturvidenskabelige, forskningsrad, snf, danish, national, science, foundation, danish, nsf
#> 3                                                                                                                                            norsk, sykepleierforbund, nsf, norwegian, nurses, organisation
#> 4                                                                                                                                                                        nsf, office, of, the, director, od
#> 5 center, for, hierarchical, manufacturing, national, science, foundation, chm, nsf, university, of, massachusetts, nsf, center, for, hierarchical, manufacturing, center, for, hierarchical, manufacturing
#> 6                                                                                                                                                                         national, stroke, foundation, nsf
#> 7                                                                                                                                                                        national, science, foundation, nsf
#> 8                                                                national, natural, science, foundation, of, china, natural, science, foundation, of, china, national, science, foundation, of, china, nsfc
```

### Check the DOI minting agency


```r
cr_agency(dois = '10.13039/100000001')
#> $DOI
#> [1] "10.13039/100000001"
#>
#> $agency
#> $agency$id
#> [1] "crossref"
#>
#> $agency$label
#> [1] "CrossRef"
```

### Search works (i.e., articles, books, etc.)


```r
cr_works(filter=c(has_orcid=TRUE, from_pub_date='2004-04-04'), limit=1)
#> $meta
#>   total_results search_terms start_index items_per_page
#> 1        296797           NA           0              1
#>
#> $data
#>   alternative.id container.title    created  deposited
#> 1                                2015-11-11 2015-11-11
#>                    DOI funder    indexed ISBN ISSN     issued link
#> 1 10.19138/ejaz.1437.1   NULL 2015-11-14           2012-07-13 NULL
#>                               member
#> 1 http://id.crossref.org/member/8212
#>                                   prefix
#> 1 http://id.crossref.org/prefix/10.19138
#>                               publisher reference.count score   source
#> 1 Academic Journal, Al-Azhar University               0     1 CrossRef
#>   subject                                  title   type
#> 1         الإعجاز في قوله تعالى "والمرسلات عرفا" report
#>                                      URL assertion
#> 1 http://dx.doi.org/10.19138/ejaz.1437.1      NULL
#>                                             author
#> 1 معوض, رامي, http://orcid.org/0000-0003-4211-3903
#>
#> $facets
#> NULL
```

### Search journals


```r
cr_journals(issn=c('1803-2427','2326-4225'))
#>   alternative.id container.title created deposited funder indexed ISBN
#> 1                                                    NULL
#> 2                                                    NULL
#>        ISSN issued link                      publisher subject
#> 1 1803-2427        NULL    De Gruyter Open Sp. z o.o.
#> 2 2326-4225        NULL American Scientific Publishers
#>                                              title assertion author
#> 1                     Journal of Landscape Ecology      NULL   NULL
#> 2 Journal of Nutritional Ecology and Food Research      NULL   NULL
```

### Search license information


```r
cr_licenses(query = 'elsevier')
#> $meta
#>   total_results search_terms start_index items_per_page
#> 1            12     elsevier           0             20
#>
#> $data
#>                                                                                                                                                                                         URL
#> 1                                                                                                                                         http://creativecommons.org/licenses/by-nc-nd/3.0/
#> 2                                                                                                                                         http://creativecommons.org/licenses/by-nc-nd/4.0/
#> 3                                                                                                                                               http://creativecommons.org/licenses/by/3.0/
#> 4                                                                                                                                               http://creativecommons.org/licenses/by/4.0/
#> 5                                                                                                                                                http://doi.wiley.com/10.1002/tdm_license_1
#> 6                                                                                                                                         http://onlinelibrary.wiley.com/termsAndConditions
#> 7                                                                                                                      http://www.acm.org/publications/policies/copyright_policy#Background
#> 8                                                                                                                                      http://www.elsevier.com/open-access/userlicense/1.0/
#> 9                                                                                                                                              http://www.elsevier.com/tdm/userlicense/1.0/
#> 10                                                                                                                                                              http://www.springer.com/tdm
#> 11 © 2007 Elsevier Masson SAS. All rights reserved. The patient figure in Figure 6, part A is reproduced from Ferrero et al., (2007), European Journal of Medical Genetics with permission.
#> 12 © 2012, Elsevier Inc., All Rights Reserved. Figure 8, part (B) (images of HVCX dendrites from LMAN intact bird) is reprinted with permission from Figure 1B in Tschida and Mooney, 2012.
#>    work.count
#> 1          12
#> 2           3
#> 3           2
#> 4           1
#> 5        2266
#> 6         214
#> 7           3
#> 8           3
#> 9        1198
#> 10          9
#> 11          1
#> 12          1
```

### Search based on DOI prefixes


```r
cr_prefixes(prefixes=c('10.1016','10.1371','10.1023','10.4176','10.1093'))
#> $meta
#> NULL
#>
#> $data
#>                               member                              name
#> 1   http://id.crossref.org/member/78                       Elsevier BV
#> 2  http://id.crossref.org/member/340  Public Library of Science (PLoS)
#> 3  http://id.crossref.org/member/297 Springer Science + Business Media
#> 4 http://id.crossref.org/member/1989              Co-Action Publishing
#> 5  http://id.crossref.org/member/286     Oxford University Press (OUP)
#>                                  prefix
#> 1 http://id.crossref.org/prefix/10.1016
#> 2 http://id.crossref.org/prefix/10.1371
#> 3 http://id.crossref.org/prefix/10.1023
#> 4 http://id.crossref.org/prefix/10.4176
#> 5 http://id.crossref.org/prefix/10.1093
#>
#> $facets
#> list()
```

### Search CrossRef members


```r
cr_members(query='ecology', limit = 5)
#> $meta
#>   total_results search_terms start_index items_per_page
#> 1            17      ecology           0              5
#>
#> $data
#>     id                                             primary_name
#> 1 7052                         Chinese Journal of Plant Ecology
#> 2 6933                          Knowledge Ecology International
#> 3 7278 Korean Society of Ecology and Infrastructure Engineering
#> 4 7745                             Institute of Applied Ecology
#> 5  336                    Japanese Society of Microbial Ecology
#>                                                                 location
#> 1                           Room 216 15 Fuxing Road Beijing 100038 China
#> 2 1621 Connecticut Avenue NW Suite 500 Washington DC 20009 United States
#> 3                245 Daehangno Yusong Yusong Daejeon 305-806 South Korea
#> 4          Bld. 1, 46 Myasnitskaya Str. Moscow 101000 Russian Federation
#> 5                          5-3 Yonbancho Chiyoda-ku Tokyo 102-0081 Japan
#>   last_status_check_time backfile.dois current.dois total.dois prefixes
#> 1             2016-05-02           644          141        785 10.17521
#> 2             2016-05-02             0            0          0 10.17534
#> 3             2016-05-02             6           56         62 10.17820
#> 4             2016-05-02             0          527        527 10.18470
#> 5             2016-05-02           889           66        955  10.1264
#>   coverge.funders.backfile coverge.licenses.backfile
#> 1                        0                         0
#> 2                        0                         0
#> 3                        0                         0
#> 4                        0                         0
#> 5                        0                         0
#>   coverge.funders.current coverge.resource.links.backfile
#> 1                       0                               0
#> 2                       0                               0
#> 3                       0                               0
#> 4                       0                               0
#> 5                       0                               0
#>   coverge.orcids.backfile coverge.update.policies.current
#> 1                       0                               0
#> 2                       0                               0
#> 3                       0                               0
#> 4                       0                               0
#> 5                       0                               0
#>   coverge.orcids.current coverge.references.backfile
#> 1                      0         0.00155279505997896
#> 2                      0                           0
#> 3                      0                           1
#> 4                      0                           0
#> 5                      0           0.676040470600128
#>   coverge.award.numbers.backfile coverge.update.policies.backfile
#> 1                              0                                0
#> 2                              0                                0
#> 3                              0                                0
#> 4                              0                                0
#> 5                              0                                0
#>   coverge.licenses.current coverge.award.numbers.current
#> 1                        0                             0
#> 2                        0                             0
#> 3                        0                             0
#> 4                        0                             0
#> 5                        0                             0
#>   coverge.resource.links.current coverge.references.current
#> 1                              0                          0
#> 2                              0                          0
#> 3                              0          0.839285731315613
#> 4              0.905123353004456                          0
#> 5                              0          0.727272748947144
#>   flags.deposits.orcids.current flags.deposits
#> 1                         FALSE           TRUE
#> 2                         FALSE          FALSE
#> 3                         FALSE           TRUE
#> 4                         FALSE           TRUE
#> 5                         FALSE           TRUE
#>   flags.deposits.update.policies.backfile
#> 1                                   FALSE
#> 2                                   FALSE
#> 3                                   FALSE
#> 4                                   FALSE
#> 5                                   FALSE
#>   flags.deposits.award.numbers.current
#> 1                                FALSE
#> 2                                FALSE
#> 3                                FALSE
#> 4                                FALSE
#> 5                                FALSE
#>   flags.deposits.resource.links.current flags.deposits.articles
#> 1                                 FALSE                    TRUE
#> 2                                 FALSE                   FALSE
#> 3                                 FALSE                    TRUE
#> 4                                  TRUE                    TRUE
#> 5                                 FALSE                    TRUE
#>   flags.deposits.funders.current flags.deposits.references.backfile
#> 1                          FALSE                               TRUE
#> 2                          FALSE                              FALSE
#> 3                          FALSE                               TRUE
#> 4                          FALSE                              FALSE
#> 5                          FALSE                               TRUE
#>   flags.deposits.licenses.backfile flags.deposits.award.numbers.backfile
#> 1                            FALSE                                 FALSE
#> 2                            FALSE                                 FALSE
#> 3                            FALSE                                 FALSE
#> 4                            FALSE                                 FALSE
#> 5                            FALSE                                 FALSE
#>   flags.deposits.references.current flags.deposits.resource.links.backfile
#> 1                             FALSE                                  FALSE
#> 2                             FALSE                                  FALSE
#> 3                              TRUE                                  FALSE
#> 4                             FALSE                                  FALSE
#> 5                              TRUE                                  FALSE
#>   flags.deposits.orcids.backfile flags.deposits.funders.backfile
#> 1                          FALSE                           FALSE
#> 2                          FALSE                           FALSE
#> 3                          FALSE                           FALSE
#> 4                          FALSE                           FALSE
#> 5                          FALSE                           FALSE
#>   flags.deposits.update.policies.current flags.deposits.licenses.current
#> 1                                  FALSE                           FALSE
#> 2                                  FALSE                           FALSE
#> 3                                  FALSE                           FALSE
#> 4                                  FALSE                           FALSE
#> 5                                  FALSE                           FALSE
#>                                                      names
#> 1                         Chinese Journal of Plant Ecology
#> 2                          Knowledge Ecology International
#> 3 Korean Society of Ecology and Infrastructure Engineering
#> 4                             Institute of Applied Ecology
#> 5                    Japanese Society of Microbial Ecology
#>                                                           tokens
#> 1                           chinese, journal, of, plant, ecology
#> 2                              knowledge, ecology, international
#> 3 korean, society, of, ecology, and, infrastructure, engineering
#> 4                                institute, of, applied, ecology
#> 5                      japanese, society, of, microbial, ecology
#>
#> $facets
#> NULL
```

### Get N random DOIs

`cr_r()` uses the function `cr_works()` internally.


```r
cr_r()
#>  [1] "10.1103/physrevb.59.3086"         "10.3807/josk.2015.19.1.095"
#>  [3] "10.1159/000406186"                "10.3775/jie.18.797"
#>  [5] "10.1109/pgec.1967.264707"         "10.1177/1354068806064733"
#>  [7] "10.1007/s10862-007-9070-0"        "10.1016/0893-6080(94)90013-2"
#>  [9] "10.1787/9789264007550-sum-sv"     "10.1111/j.1399-302x.2007.00354.x"
```

You can pass in the number of DOIs you want back (default is 10)


```r
cr_r(2)
#> [1] "10.2134/jeq2007.0203" "10.1007/bf00404592"
```

### The older functions and API

Search by author


```r
cr_search(query = c("renear", "palmer"), rows = 3, sort = "year")[1:2,-6]
#>                                                   doi     score
#> 1         http://dx.doi.org/10.1007/978-3-658-12433-5 0.7289054
#> 2 http://dx.doi.org/10.13110/merrpalmquar1982.62.1.fm 0.6872187
#>   normalizedScore                                 title
#> 1              22 Berufsbezogene Kreativitätsdiagnostik
#> 2              20                          Front Matter
#>                                                                  fullCitation
#> 1               Carolin Palmer, 2016, 'Berufsbezogene Kreativitätsdiagnostik'
#> 2 2016, 'Front Matter', <i>Merrill-Palmer Quarterly</i>, vol. 62, no. 1, p. i
#>   year
#> 1 2016
#> 2 2016
```

Search by DOI


```r
cr_search(doi = "10.1890/10-0340.1")[,-6]
#>                                   doi    score normalizedScore
#> 1 http://dx.doi.org/10.1890/10-0340.1 17.97163             100
#>                                                            title
#> 1 The arcsine is asinine: the analysis of proportions in ecology
#>                                                                                                                                           fullCitation
#> 1 David I. Warton, Francis K. C. Hui, 2011, 'The arcsine is asinine: the analysis of proportions in ecology', <i>Ecology</i>, vol. 92, no. 1, pp. 3-10
#>   year
#> 1 2011
```

Free search


```r
queries <- c("Piwowar sharing data PLOS one", "Priem Scientometrics 2.0 social web",
  "William Gunn A Crosstalk Between Myeloma Cells",
 "karthik ram Metapopulation dynamics override local limits")
cr_search_free(queries)[,-4]
#>                                                        text match
#> 1                             Piwowar sharing data PLOS one  TRUE
#> 2                       Priem Scientometrics 2.0 social web  TRUE
#> 3            William Gunn A Crosstalk Between Myeloma Cells  TRUE
#> 4 karthik ram Metapopulation dynamics override local limits  TRUE
#>                                              doi    score
#> 1 http://dx.doi.org/10.1371/journal.pone.0000308 3.247673
#> 2        http://dx.doi.org/10.5210/fm.v15i7.2874 3.595765
#> 3  http://dx.doi.org/10.1634/stemcells.2005-0220 2.813690
#> 4            http://dx.doi.org/10.1890/08-0228.1 3.950688
```

<section id="citing">

## Citing

To cite `rcrossref` in publications use:

<br>

> Scott Chamberlain, Carl Boettiger, Ted Hart, and Karthik Ram (2014). rcrossref:
  R Client for Various CrossRef APIs. R package version 0.3.0
  https://github.com/ropensci/rcrossref

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rcrossref](https://github.com/ropensci/rcrossref/issues?state=open)

[Back to top](#top)
