---
title: rAltmetric tutorial
package_version: 0.7.0
---



This package provides a way to programmatically retrieve altmetric data from [altmetric.com](http://altmetric.com) for any publication with the appropriate identifer. The package is really simple to use and only has two major functions: One (`altmetrics()`) to download metrics and another (`altmetric_data()`) to extract the data into a `data.frame`. It also includes generic S3 methods to plot/print metrics for any altmetric object.

Questions, features requests and issues should go [here](https://github.com/ropensci/rAltmetric/issues/). General comments to [karthik.ram@gmail.com](mailto:karthik.ram@gmail.com).


### Installation


A stable version is available from CRAN. To install


```r
install.packages('rAltmetric')
```


```r
install.packages('devtools')
devtools::install_github('ropensci/rAltmetric')
```

### Usage


```r
library(rAltmetric)
library(magrittr)
library(purrr)

ids <- list(
  "10.1038/nature09210",
  "10.1126/science.1187820",
  "10.1016/j.tree.2011.01.009",
  "10.1086/664183"
)

alm <- function(x)  altmetrics(doi = x) %>% altmetric_data()

results <- map_df(ids, alm)
# This results in a data.frame with one row per identifier.
```

You can now see some citation data for these papers.


```r
library(dplyr)
results %>% select(title, doi,  starts_with("cited"))
#>                                                                                      title
#> 1  Coupled dynamics of body mass and population growth in response to environmental change
#> 2 Stochastic Community Assembly Causes Higher Biodiversity in More Productive Environments
#> 3                          Why intraspecific trait variation matters in community ecology 
#> 4                                           Enemies Maintain Hyperdiverse Tropical Forests
#>                          doi cited_by_fbwalls_count cited_by_feeds_count
#> 1        10.1038/nature09210                      1                    7
#> 2    10.1126/science.1187820                   <NA>                    1
#> 3 10.1016/j.tree.2011.01.009                   <NA>                    2
#> 4             10.1086/664183                   <NA>                 <NA>
#>   cited_by_msm_count cited_by_policies_count cited_by_posts_count
#> 1                  1                       1                   13
#> 2               <NA>                    <NA>                    3
#> 3               <NA>                    <NA>                   11
#> 4               <NA>                    <NA>                    3
#>   cited_by_tweeters_count cited_by_accounts_count cited_by_rh_count
#> 1                       3                      13              <NA>
#> 2                       1                       3                 1
#> 3                       7                       9              <NA>
#> 4                       2                       3                 1
```


### Citing

To cite `rAltmetric` in publications use:

<br>

> Karthik Ram (2017). rAltmetric: Retrieves Altmerics Data for Any
  Published Paper from 'Altmetric.com'. R package version 0.7.0.
  https://CRAN.R-project.org/package=rAltmetric


### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rAltmetric](https://github.com/ropensci/rAltmetric/issues?state=open)

[Back to top](#top)
