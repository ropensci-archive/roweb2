---
title: rcrossref tutorial
package_version: 0.7.0
---





### Installation


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


## Usage

### Citation search

CrossRef's [DOI Content Negotiation](http://www.crosscite.org/cn/) service, where you can citations back in various formats, including `apa`


```r
cr_cn(dois = "10.1371/journal.pone.0112608", format = "text", style = "apa")
#> [1] "Wang, Q., & Taylor, J. E. (2014). Quantifying Human Mobility Perturbation and Resilience in Hurricane Sandy. PLoS ONE, 9(11), e112608. doi:10.1371/journal.pone.0112608"
```

There are a lot more styles. We include a dataset as a character vector within the package, accessible via the `get_styles()` function, e.g.,


```r
get_styles()[1:5]
#> [1] "academy-of-management-review"                   
#> [2] "accident-analysis-and-prevention"               
#> [3] "acm-sig-proceedings-long-author-list"           
#> [4] "acm-sig-proceedings"                            
#> [5] "acm-sigchi-proceedings-extended-abstract-format"
```

`bibtex`


```r
cat(cr_cn(dois = "10.1126/science.169.3946.635", format = "bibtex"))
#> @article{Frank_1970,
#> 	doi = {10.1126/science.169.3946.635},
#> 	url = {https://doi.org/10.1126%2Fscience.169.3946.635},
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
```

### Citation count

Citation count, using OpenURL


```r
cr_citation_count(doi="10.1371/journal.pone.0042793")
#> [1] 16
```

### Search Crossref metadata API

There are two functions that use an older Crossre API: `cr_search()` and `cr_search_free()`. You can of course use them, but the newer Crossref API available through various functions (`cr_agency()`, `cr_fundref()`, `cr_journals()`, `cr_licenses()`, `cr_members()`, `cr_prefixes()`, and `cr_works()`) is more powerful and will recieve more support going forward. The following functions (of the newer set just mentioend) all use the [CrossRef API](https://github.com/CrossRef/rest-api-doc/blob/master/rest_api.md).

#### Funders


```r
cr_funders(query="NSF")
#> $meta
#>   total_results search_terms start_index items_per_page
#> 1             9          NSF           0             20
#> 
#> $data
#> # A tibble: 9 x 6
#>             id      location
#>          <chr>         <chr>
#> 1    100006445 United States
#> 2    100003187 United States
#> 3 501100008982     Sri Lanka
#> 4    100008367       Denmark
#> 5 501100004190        Norway
#> 6    100000179 United States
#> 7 501100000930     Australia
#> 8    100000001 United States
#> 9 501100001809         China
#> # ... with 4 more variables: name <chr>, alt.names <chr>, uri <chr>,
#> #   tokens <chr>
#> 
#> $facets
#> NULL
```

#### Check the DOI minting agency


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
#> [1] "Crossref"
```

#### Search works


```r
cr_works(filter=c(has_orcid=TRUE, from_pub_date='2004-04-04'), limit=1)
#> $meta
#>   total_results search_terms start_index items_per_page
#> 1        984501           NA           0              1
#> 
#> $data
#> # A tibble: 1 x 32
#>   alternative.id                       container.title    created
#>            <chr>                                 <chr>      <chr>
#> 1                Tuberculosis and Respiratory Diseases 2009-04-09
#> # ... with 29 more variables: deposited <chr>, DOI <chr>, funder <list>,
#> #   indexed <chr>, ISBN <chr>, ISSN <chr>, issue <chr>, issued <chr>,
#> #   license_date <chr>, license_URL <chr>, license_delay.in.days <chr>,
#> #   license_content.version <chr>, link <list>, member <chr>, page <chr>,
#> #   prefix <chr>, publisher <chr>, reference.count <chr>, score <chr>,
#> #   source <chr>, subject <chr>, title <chr>, type <chr>,
#> #   update.policy <chr>, URL <chr>, volume <chr>, assertion <list>,
#> #   author <list>, `clinical-trial-number` <list>
#> 
#> $facets
#> NULL
```

#### Search journals


```r
cr_journals(issn=c('1803-2427','2326-4225'))
#> $data
#> # A tibble: 2 x 16
#>   alternative.id container.title created deposited funder indexed  ISBN
#>            <chr>           <chr>   <chr>     <chr> <list>   <chr> <chr>
#> 1                                                  <NULL>              
#> 2                                                  <NULL>              
#> # ... with 9 more variables: ISSN <chr>, issued <chr>, link <list>,
#> #   publisher <chr>, subject <chr>, title <chr>, assertion <list>,
#> #   author <list>, `clinical-trial-number` <list>
#> 
#> $facets
#> NULL
```

#### Search license information


```r
cr_licenses(query = 'elsevier')
#> $meta
#>   total_results search_terms start_index items_per_page
#> 1            22     elsevier           0             20
#> 
#> $data
#> # A tibble: 22 x 2
#>                                                         URL work.count
#>                                                       <chr>      <int>
#>  1 http://aspb.org/publications/aspb-journals/open-articles          1
#>  2        http://creativecommons.org/licenses/by-nc-nd/3.0/         12
#>  3        http://creativecommons.org/licenses/by-nc-nd/4.0/          6
#>  4           http://creativecommons.org/licenses/by-nc/4.0/          1
#>  5              http://creativecommons.org/licenses/by/3.0/          1
#>  6               http://creativecommons.org/licenses/by/4.0          1
#>  7              http://creativecommons.org/licenses/by/4.0/          1
#>  8               http://doi.wiley.com/10.1002/tdm_license_1        157
#>  9             http://doi.wiley.com/10.1002/tdm_license_1.1       2163
#> 10   http://journals.iucr.org/services/copyrightpolicy.html         10
#> # ... with 12 more rows
```

#### Search based on DOI prefixes


```r
cr_prefixes(prefixes=c('10.1016','10.1371','10.1023','10.4176','10.1093'))
#> $meta
#> NULL
#> 
#> $data
#>                               member                             name
#> 1   http://id.crossref.org/member/78                      Elsevier BV
#> 2  http://id.crossref.org/member/340 Public Library of Science (PLoS)
#> 3  http://id.crossref.org/member/297                  Springer Nature
#> 4 http://id.crossref.org/member/1989             Co-Action Publishing
#> 5  http://id.crossref.org/member/286    Oxford University Press (OUP)
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

#### Search CrossRef members


```r
cr_members(query='ecology', limit = 5)
#> $meta
#>   total_results search_terms start_index items_per_page
#> 1            18      ecology           0              5
#> 
#> $data
#> # A tibble: 5 x 48
#>      id                            primary_name
#>   <int>                                   <chr>
#> 1   336   Japanese Society of Microbial Ecology
#> 2  1950               Journal of Vector Ecology
#> 3  2080   The Japan Society of Tropical Ecology
#> 4  2467          Ideas in Ecology and Evolution
#> 5  3732 Japan Association for Landscape Ecology
#> # ... with 46 more variables: location <chr>,
#> #   last_status_check_time <date>, total.dois <chr>, current.dois <chr>,
#> #   backfile.dois <chr>, prefixes <chr>,
#> #   coverge.affiliations.current <chr>, coverge.funders.backfile <chr>,
#> #   coverge.licenses.backfile <chr>, coverge.funders.current <chr>,
#> #   coverge.affiliations.backfile <chr>,
#> #   coverge.resource.links.backfile <chr>, coverge.orcids.backfile <chr>,
#> #   coverge.update.policies.current <chr>, coverge.orcids.current <chr>,
#> #   coverge.references.backfile <chr>,
#> #   coverge.award.numbers.backfile <chr>,
#> #   coverge.update.policies.backfile <chr>,
#> #   coverge.licenses.current <chr>, coverge.award.numbers.current <chr>,
#> #   coverge.abstracts.backfile <chr>,
#> #   coverge.resource.links.current <chr>, coverge.abstracts.current <chr>,
#> #   coverge.references.current <chr>,
#> #   flags.deposits.abstracts.current <chr>,
#> #   flags.deposits.orcids.current <chr>, flags.deposits <chr>,
#> #   flags.deposits.affiliations.backfile <chr>,
#> #   flags.deposits.update.policies.backfile <chr>,
#> #   flags.deposits.award.numbers.current <chr>,
#> #   flags.deposits.resource.links.current <chr>,
#> #   flags.deposits.articles <chr>,
#> #   flags.deposits.affiliations.current <chr>,
#> #   flags.deposits.funders.current <chr>,
#> #   flags.deposits.references.backfile <chr>,
#> #   flags.deposits.abstracts.backfile <chr>,
#> #   flags.deposits.licenses.backfile <chr>,
#> #   flags.deposits.award.numbers.backfile <chr>,
#> #   flags.deposits.references.current <chr>,
#> #   flags.deposits.resource.links.backfile <chr>,
#> #   flags.deposits.orcids.backfile <chr>,
#> #   flags.deposits.funders.backfile <chr>,
#> #   flags.deposits.update.policies.current <chr>,
#> #   flags.deposits.licenses.current <chr>, names <chr>, tokens <chr>
#> 
#> $facets
#> NULL
```

#### Get N random DOIs

`cr_r()` uses the function `cr_works()` internally.


```r
cr_r()
#>  [1] "10.1371/journal.pone.0065390.t001"
#>  [2] "10.5035/nishiseisai.53.101"       
#>  [3] "10.1136/ard.2010.149013.23"       
#>  [4] "10.1017/s0953756201219893"        
#>  [5] "10.4000/ccrh.2904"                
#>  [6] "10.1017/s0022046900029626"        
#>  [7] "10.1115/gt2015-42986"             
#>  [8] "10.1055/b-0034-100334"            
#>  [9] "10.2307/309547"                   
#> [10] "10.1016/0043-1354(94)90058-2"
```

You can pass in the number of DOIs you want back (default is 10)


```r
cr_r(2)
#> [1] "10.1163/2214-8264_dutchpamphlets-kb1-kb13238"
#> [2] "10.1051/0004-6361/200913389"
```

### Citing

To cite `rcrossref` in publications use:

<br>

> Scott Chamberlain, Carl Boettiger, Ted Hart and Karthik Ram (2017).
  rcrossref: Client for Various 'CrossRef' 'APIs'. R package version
  0.7.0. https://CRAN.R-project.org/package=rcrossref


### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rcrossref](https://github.com/ropensci/rcrossref/issues?state=open)

[Back to top](#top)
