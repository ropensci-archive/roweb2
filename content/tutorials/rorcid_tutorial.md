---
title: rorcid tutorial
package_version: 0.3.0
---



`rorcid` is an R programmatic interface to the Orcid public API. `rorcid` is not a product developed or distributed by ORCID®.


### Installation

Stable `rorcid` version from CRAN


```r
install.packages("rorcid")
```

Or, the development version from Github


```r
devtools::install_github("ropensci/rorcid")
```


```r
library("rorcid")
```


## Usage

### The Orcid class

There's a function `as.orcid()` in this package to help coerce an Orcid ID to an object that holds details for that Orcid ID, prints a nice summary, and you can browse easily to that profile. E.g.


```r
as.orcid(x="0000-0002-1642-628X")
#> $`0000-0002-1642-628X`
#> <ORCID> 0000-0002-1642-628X
#>   Name: Boettiger, Carl
#>   URL (first): 
#>   Country: US
#>   Keywords: Ecology, Evolution, Regime Shifts, Stochastic Dynamics
#>   Submission date: 2012-11-01 17:57:23
```

You by default get the print method above, but you can use `summary()` as well to get more detailed information.


```r
summary( as.orcid(x="0000-0002-1642-628X") )
#>                     Length Class  Mode
#> 0000-0002-1642-628X 13     or_cid list
```

Or you can pass in many IDs


```r
lapply(c("0000-0003-1620-1408", "0000-0002-9341-7985"), as.orcid)
#> [[1]]
#> [[1]]$`0000-0003-1620-1408`
#> <ORCID> 0000-0003-1620-1408
#>   Name: Johnson, Thomas
#>   URL (first): 
#>   Country: US
#>   Keywords: 
#>   Submission date: 2012-10-27 10:33:31
#> 
#> 
#> [[2]]
#> [[2]]$`0000-0002-9341-7985`
#> <ORCID> 0000-0002-9341-7985
#>   Name: Binfield, Peter
#>   URL (first): 
#>   Country: US
#>   Keywords: 
#>   Submission date: 2012-10-16 04:39:18
```

The `browse()` function lets you browser to a profile easily with a single function call


```r
browse(as.orcid("0000-0002-1642-628X"))
```

![profile](http://f.cl.ly/items/3d1o0k1X3R1U110C0u1u/Screen%20Shot%202015-02-10%20at%207.21.57%20PM.png)

### Get works

The `works()` function helps get works data from an orcid data object. The output of `works()` uses a print method to just print citations for each work.


```r
out <- works(orcid_id("0000-0002-0233-1757"))
out
#> <WORKS> 0000-0002-0233-1757
#>   Count: 6 - First 10
#> - Individual heterogeneity in mortality mediates long-term persistence of a seasonal microparasite
#> - METAPOPULATION DYNAMICS OVERRIDE LOCAL LIMITS ON LONG-TERM PARASITE PERSISTENCE
#> - Soil mediates the interaction of coexisting entomopathogenic nematodes with an insect host
#> - Presubmission Inquiry for PLOS Biology article on rOpenSci (PBIOLOGY-S-12-05379)
#> - git can facilitate greater reproducibility and increased transparency in science
#> - git repository for paper on git and reproducible science
```

And you can easily get to the entire data.frame of works details


```r
head(out$data)
#> # A tibble: 6 x 30
#>   `put-code` `journal-title` `short-description`     `work-type`
#>        <chr>           <lgl>               <lgl>           <chr>
#> 1    5296064              NA                  NA JOURNAL_ARTICLE
#> 2    5296065              NA                  NA JOURNAL_ARTICLE
#> 3    5296066              NA                  NA JOURNAL_ARTICLE
#> 4    9012984              NA                  NA JOURNAL_ARTICLE
#> 5    9012985              NA                  NA JOURNAL_ARTICLE
#> 6    9012986              NA                  NA JOURNAL_ARTICLE
#> # ... with 26 more variables: `work-source` <lgl>, `language-code` <lgl>,
#> #   country <lgl>, visibility <chr>, `work-title.subtitle` <lgl>,
#> #   `work-title.translated-title` <lgl>, `work-title.title.value` <chr>,
#> #   `work-citation.work-citation-type` <chr>,
#> #   `work-citation.citation` <chr>, `publication-date.media-type` <lgl>,
#> #   `publication-date.year.value` <chr>,
#> #   `publication-date.month.value` <chr>,
#> #   `publication-date.day.value` <chr>,
#> #   `work-external-identifiers.work-external-identifier` <list>,
#> #   `work-external-identifiers.scope` <lgl>, url.value <chr>,
#> #   `work-contributors.contributor` <list>,
#> #   `source.source-client-id` <lgl>, `source.source-orcid.value` <lgl>,
#> #   `source.source-orcid.uri` <chr>, `source.source-orcid.path` <chr>,
#> #   `source.source-orcid.host` <chr>, `source.source-name.value` <chr>,
#> #   `source.source-date.value` <dbl>, `created-date.value` <dbl>,
#> #   `last-modified-date.value` <dbl>
```

### Search Orcid

Get a list of names and Orcid IDs matching a name query


```r
orcid(query="carl boettiger")
#> # A tibble: 10 x 36
#>    `relevancy-score.value` orcid `orcid-id` `orcid-deprecated`
#>  *                   <dbl> <lgl>      <lgl>              <lgl>
#>  1               0.8316167    NA         NA                 NA
#>  2               0.5108813    NA         NA                 NA
#>  3               0.4915957    NA         NA                 NA
#>  4               0.2884943    NA         NA                 NA
#>  5               0.2511020    NA         NA                 NA
#>  6               0.2460287    NA         NA                 NA
#>  7               0.2245925    NA         NA                 NA
#>  8               0.2245925    NA         NA                 NA
#>  9               0.2245925    NA         NA                 NA
#> 10               0.2245925    NA         NA                 NA
#> # ... with 32 more variables: `orcid-preferences` <lgl>,
#> #   `orcid-history` <lgl>, `orcid-activities` <lgl>,
#> #   `orcid-internal` <lgl>, type <lgl>, `group-type` <lgl>,
#> #   `client-type` <lgl>, `orcid-identifier.value` <lgl>,
#> #   `orcid-identifier.uri` <chr>, `orcid-identifier.path` <chr>,
#> #   `orcid-identifier.host` <chr>, delegation <lgl>, scope <lgl>,
#> #   `personal-details.given-names.value` <chr>,
#> #   `personal-details.given-names.visibility` <chr>,
#> #   `personal-details.family-name.value` <chr>,
#> #   `personal-details.family-name.visibility` <chr>,
#> #   `personal-details.credit-name.value` <chr>,
#> #   `personal-details.credit-name.visibility` <chr>,
#> #   `personal-details.other-names.other-name` <list>,
#> #   `personal-details.other-names.visibility` <chr>,
#> #   biography.value <chr>, biography.visibility <chr>,
#> #   `researcher-urls.researcher-url` <list>,
#> #   `researcher-urls.visibility` <chr>, `contact-details.email` <list>,
#> #   `contact-details.address.country.value` <chr>,
#> #   `contact-details.address.country.visibility` <chr>,
#> #   keywords.keyword <list>, keywords.visibility <chr>,
#> #   `external-identifiers.external-identifier` <list>,
#> #   `external-identifiers.visibility` <chr>
```

You can string together many search terms


```r
orcid(query="johnson cardiology houston")
#> # A tibble: 10 x 36
#>    `relevancy-score.value` orcid `orcid-id` `orcid-deprecated`
#>  *                   <dbl> <lgl>      <lgl>              <lgl>
#>  1               0.7051518    NA         NA                 NA
#>  2               0.4147219    NA         NA                 NA
#>  3               0.3976816    NA         NA                 NA
#>  4               0.3831851    NA         NA                 NA
#>  5               0.3793740    NA         NA                 NA
#>  6               0.3451782    NA         NA                 NA
#>  7               0.3420934    NA         NA                 NA
#>  8               0.3404950    NA         NA                 NA
#>  9               0.3210866    NA         NA                 NA
#> 10               0.3210866    NA         NA                 NA
#> # ... with 32 more variables: `orcid-preferences` <lgl>,
#> #   `orcid-history` <lgl>, `orcid-activities` <lgl>,
#> #   `orcid-internal` <lgl>, type <lgl>, `group-type` <lgl>,
#> #   `client-type` <lgl>, `orcid-identifier.value` <lgl>,
#> #   `orcid-identifier.uri` <chr>, `orcid-identifier.path` <chr>,
#> #   `orcid-identifier.host` <chr>, delegation <lgl>, scope <lgl>,
#> #   `personal-details.given-names.value` <chr>,
#> #   `personal-details.given-names.visibility` <chr>,
#> #   `personal-details.family-name.value` <chr>,
#> #   `personal-details.family-name.visibility` <chr>,
#> #   `personal-details.credit-name.value` <chr>,
#> #   `personal-details.credit-name.visibility` <chr>,
#> #   `personal-details.other-names.other-name` <list>,
#> #   `personal-details.other-names.visibility` <chr>,
#> #   biography.value <chr>, biography.visibility <chr>,
#> #   `researcher-urls.researcher-url` <list>,
#> #   `researcher-urls.visibility` <chr>, `contact-details.email` <list>,
#> #   `contact-details.address.country.value` <chr>,
#> #   `contact-details.address.country.visibility` <chr>,
#> #   keywords.keyword <list>, keywords.visibility <chr>,
#> #   `external-identifiers.external-identifier` <list>,
#> #   `external-identifiers.visibility` <chr>
```

And use boolean operators


```r
orcid("johnson AND(caltech OR 'California Institute of Technology')")
#> # A tibble: 10 x 36
#>    `relevancy-score.value` orcid `orcid-id` `orcid-deprecated`
#>  *                   <dbl> <lgl>      <lgl>              <lgl>
#>  1               0.6813623    NA         NA                 NA
#>  2               0.5188316    NA         NA                 NA
#>  3               0.5042954    NA         NA                 NA
#>  4               0.4962147    NA         NA                 NA
#>  5               0.4580824    NA         NA                 NA
#>  6               0.4461190    NA         NA                 NA
#>  7               0.4337358    NA         NA                 NA
#>  8               0.4334452    NA         NA                 NA
#>  9               0.4317114    NA         NA                 NA
#> 10               0.4297331    NA         NA                 NA
#> # ... with 32 more variables: `orcid-preferences` <lgl>,
#> #   `orcid-history` <lgl>, `orcid-activities` <lgl>,
#> #   `orcid-internal` <lgl>, type <lgl>, `group-type` <lgl>,
#> #   `client-type` <lgl>, `orcid-identifier.value` <lgl>,
#> #   `orcid-identifier.uri` <chr>, `orcid-identifier.path` <chr>,
#> #   `orcid-identifier.host` <chr>, delegation <lgl>, scope <lgl>,
#> #   `personal-details.given-names.value` <chr>,
#> #   `personal-details.given-names.visibility` <chr>,
#> #   `personal-details.family-name.value` <chr>,
#> #   `personal-details.family-name.visibility` <chr>,
#> #   `personal-details.credit-name.value` <chr>,
#> #   `personal-details.credit-name.visibility` <chr>,
#> #   `personal-details.other-names.other-name` <list>,
#> #   `personal-details.other-names.visibility` <chr>,
#> #   biography.value <chr>, biography.visibility <chr>,
#> #   `researcher-urls.researcher-url` <list>,
#> #   `researcher-urls.visibility` <chr>, `contact-details.email` <list>,
#> #   `contact-details.address.country.value` <chr>,
#> #   `contact-details.address.country.visibility` <chr>,
#> #   keywords.keyword <list>, keywords.visibility <chr>,
#> #   `external-identifiers.external-identifier` <list>,
#> #   `external-identifiers.visibility` <chr>
```

And you can use start and rows arguments to do pagination


```r
orcid("johnson cardiology houston", start = 2, rows = 3)
#> # A tibble: 3 x 29
#>   `relevancy-score.value` orcid `orcid-id` `orcid-deprecated`
#> *                   <dbl> <lgl>      <lgl>              <lgl>
#> 1               0.3976816    NA         NA                 NA
#> 2               0.3831851    NA         NA                 NA
#> 3               0.3793740    NA         NA                 NA
#> # ... with 25 more variables: `orcid-preferences` <lgl>,
#> #   `orcid-history` <lgl>, `orcid-activities` <lgl>,
#> #   `orcid-internal` <lgl>, type <lgl>, `group-type` <lgl>,
#> #   `client-type` <lgl>, `orcid-identifier.value` <lgl>,
#> #   `orcid-identifier.uri` <chr>, `orcid-identifier.path` <chr>,
#> #   `orcid-identifier.host` <chr>, `researcher-urls` <lgl>,
#> #   `contact-details` <lgl>, keywords <lgl>, `external-identifiers` <lgl>,
#> #   delegation <lgl>, scope <lgl>, `personal-details.credit-name` <lgl>,
#> #   `personal-details.other-names` <lgl>,
#> #   `personal-details.given-names.value` <chr>,
#> #   `personal-details.given-names.visibility` <chr>,
#> #   `personal-details.family-name.value` <chr>,
#> #   `personal-details.family-name.visibility` <chr>,
#> #   biography.value <chr>, biography.visibility <chr>
```

Search specific fields. here, by text type


```r
orcid("text:English")
#> # A tibble: 10 x 36
#>    `relevancy-score.value` orcid `orcid-id` `orcid-deprecated`
#>  *                   <dbl> <lgl>      <lgl>              <lgl>
#>  1               0.7776007    NA         NA                 NA
#>  2               0.7251164    NA         NA                 NA
#>  3               0.6948898    NA         NA                 NA
#>  4               0.6933439    NA         NA                 NA
#>  5               0.6551483    NA         NA                 NA
#>  6               0.6215283    NA         NA                 NA
#>  7               0.6145837    NA         NA                 NA
#>  8               0.6145837    NA         NA                 NA
#>  9               0.6145837    NA         NA                 NA
#> 10               0.6128352    NA         NA                 NA
#> # ... with 32 more variables: `orcid-preferences` <lgl>,
#> #   `orcid-history` <lgl>, `orcid-activities` <lgl>,
#> #   `orcid-internal` <lgl>, type <lgl>, `group-type` <lgl>,
#> #   `client-type` <lgl>, `orcid-identifier.value` <lgl>,
#> #   `orcid-identifier.uri` <chr>, `orcid-identifier.path` <chr>,
#> #   `orcid-identifier.host` <chr>, delegation <lgl>, scope <lgl>,
#> #   `personal-details.given-names.value` <chr>,
#> #   `personal-details.given-names.visibility` <chr>,
#> #   `personal-details.family-name.value` <chr>,
#> #   `personal-details.family-name.visibility` <chr>,
#> #   `personal-details.credit-name.value` <chr>,
#> #   `personal-details.credit-name.visibility` <chr>,
#> #   `personal-details.other-names.other-name` <list>,
#> #   `personal-details.other-names.visibility` <chr>,
#> #   biography.value <chr>, biography.visibility <chr>,
#> #   `researcher-urls.researcher-url` <list>,
#> #   `researcher-urls.visibility` <chr>, `contact-details.email` <list>,
#> #   `contact-details.address.country.value` <chr>,
#> #   `contact-details.address.country.visibility` <chr>,
#> #   keywords.keyword <list>, keywords.visibility <chr>,
#> #   `external-identifiers.external-identifier` <list>,
#> #   `external-identifiers.visibility` <chr>
```

### Search by Orcid ID


```r
out <- orcid_id(orcid = "0000-0002-9341-7985")
out$`0000-0002-9341-7985`$`orcid-identifier`
#> $value
#> NULL
#> 
#> $uri
#> [1] "http://orcid.org/0000-0002-9341-7985"
#> 
#> $path
#> [1] "0000-0002-9341-7985"
#> 
#> $host
#> [1] "orcid.org"
```

Get specific thing, either bibliographic ("bio"), biographical ("works"), profile ("profile"), or record ("record")


```r
out <- orcid_id(orcid = "0000-0002-9341-7985", profile="works")
out$`0000-0002-9341-7985`$`orcid-history`
#> $`creation-method`
#> [1] "WEBSITE"
#> 
#> $`completion-date`
#> $`completion-date`$value
#> [1] 1.350393e+12
#> 
#> 
#> $`submission-date`
#> $`submission-date`$value
#> [1] 1.350388e+12
#> 
#> 
#> $`last-modified-date`
#> $`last-modified-date`$value
#> [1] 1.465944e+12
#> 
#> 
#> $claimed
#> $claimed$value
#> [1] TRUE
#> 
#> 
#> $source
#> NULL
#> 
#> $`deactivation-date`
#> NULL
#> 
#> $`verified-email`
#> $`verified-email`$value
#> [1] TRUE
#> 
#> 
#> $`verified-primary-email`
#> $`verified-primary-email`$value
#> [1] TRUE
#> 
#> 
#> $visibility
#> NULL
```

The function is vectorized, so you can pass in many Orcids


```r
ids <- c("0000-0003-1620-1408", "0000-0002-9341-7985")
lapply(orcid_id(orcid = ids), "[[", "orcid-identifier")
#> $`0000-0003-1620-1408`
#> $`0000-0003-1620-1408`$value
#> NULL
#> 
#> $`0000-0003-1620-1408`$uri
#> [1] "http://orcid.org/0000-0003-1620-1408"
#> 
#> $`0000-0003-1620-1408`$path
#> [1] "0000-0003-1620-1408"
#> 
#> $`0000-0003-1620-1408`$host
#> [1] "orcid.org"
#> 
#> 
#> $`0000-0002-9341-7985`
#> $`0000-0002-9341-7985`$value
#> NULL
#> 
#> $`0000-0002-9341-7985`$uri
#> [1] "http://orcid.org/0000-0002-9341-7985"
#> 
#> $`0000-0002-9341-7985`$path
#> [1] "0000-0002-9341-7985"
#> 
#> $`0000-0002-9341-7985`$host
#> [1] "orcid.org"
```

### Search by DOIs

There is a helper function `check_dois()` that uses a regex checker to see if your DOIs are likely good or likely bad:

All good DOIs


```r
dois <- c("10.1371/journal.pone.0025995","10.1371/journal.pone.0053712",
       "10.1371/journal.pone.0054608","10.1371/journal.pone.0055937")
check_dois(dois)
#> $good
#> [1] "10.1371/journal.pone.0025995" "10.1371/journal.pone.0053712"
#> [3] "10.1371/journal.pone.0054608" "10.1371/journal.pone.0055937"
#> 
#> $bad
#> NULL
```

Some good, some bad


```r
dois <- c("10.1016/j.medpal.2008.12.005","10.1080/00933104.2000.10505926","10.1037/a0024480",
        "10.1002/anie.196603172","2344","asdf","232","asdf","23dd")
check_dois(dois)
#> $good
#> [1] "10.1016/j.medpal.2008.12.005"   "10.1080/00933104.2000.10505926"
#> [3] "10.1037/a0024480"               "10.1002/anie.196603172"        
#> 
#> $bad
#> [1] "2344" "asdf" "232"  "asdf" "23dd"
```

Basic search


```r
orcid_doi(dois="10.1087/20120404")
#> [[1]]
#> # A tibble: 7 x 36
#>   `relevancy-score.value` orcid `orcid-id` `orcid-deprecated`
#> *                   <dbl> <lgl>      <lgl>              <lgl>
#> 1               7.6033554    NA         NA                 NA
#> 2               6.0826845    NA         NA                 NA
#> 3               5.3223490    NA         NA                 NA
#> 4               2.6611745    NA         NA                 NA
#> 5               2.2810068    NA         NA                 NA
#> 6               1.1405034    NA         NA                 NA
#> 7               0.9504194    NA         NA                 NA
#> # ... with 32 more variables: `orcid-preferences` <lgl>,
#> #   `orcid-history` <lgl>, `orcid-activities` <lgl>,
#> #   `orcid-internal` <lgl>, type <lgl>, `group-type` <lgl>,
#> #   `client-type` <lgl>, `orcid-identifier.value` <lgl>,
#> #   `orcid-identifier.uri` <chr>, `orcid-identifier.path` <chr>,
#> #   `orcid-identifier.host` <chr>, delegation <lgl>, scope <lgl>,
#> #   `personal-details.given-names.value` <chr>,
#> #   `personal-details.given-names.visibility` <chr>,
#> #   `personal-details.family-name.value` <chr>,
#> #   `personal-details.family-name.visibility` <chr>,
#> #   `personal-details.credit-name.value` <chr>,
#> #   `personal-details.credit-name.visibility` <chr>,
#> #   `personal-details.other-names.other-name` <list>,
#> #   `personal-details.other-names.visibility` <chr>,
#> #   biography.value <chr>, biography.visibility <chr>,
#> #   `researcher-urls.researcher-url` <list>,
#> #   `researcher-urls.visibility` <chr>, `contact-details.email` <list>,
#> #   `contact-details.address.country.value` <chr>,
#> #   `contact-details.address.country.visibility` <chr>,
#> #   keywords.keyword <list>, keywords.visibility <chr>,
#> #   `external-identifiers.external-identifier` <list>,
#> #   `external-identifiers.visibility` <chr>
#> 
#> attr(,"class")
#> [1] "orcid_doi"
```

This DOI is not a real one, but a partial DOI, then we can fuzzy search


```r
orcid_doi(dois="10.1087/2", fuzzy=TRUE, rows=5)
#> [[1]]
#> # A tibble: 5 x 34
#>   `relevancy-score.value` orcid `orcid-id` `orcid-deprecated`
#> *                   <dbl> <lgl>      <lgl>              <lgl>
#> 1               0.7535577    NA         NA                 NA
#> 2               0.6295311    NA         NA                 NA
#> 3               0.6279647    NA         NA                 NA
#> 4               0.6123089    NA         NA                 NA
#> 5               0.6123089    NA         NA                 NA
#> # ... with 30 more variables: `orcid-preferences` <lgl>,
#> #   `orcid-history` <lgl>, `orcid-activities` <lgl>,
#> #   `orcid-internal` <lgl>, type <lgl>, `group-type` <lgl>,
#> #   `client-type` <lgl>, `orcid-identifier.value` <lgl>,
#> #   `orcid-identifier.uri` <chr>, `orcid-identifier.path` <chr>,
#> #   `orcid-identifier.host` <chr>, keywords <lgl>, delegation <lgl>,
#> #   scope <lgl>, `personal-details.other-names` <lgl>,
#> #   `personal-details.given-names.value` <chr>,
#> #   `personal-details.given-names.visibility` <chr>,
#> #   `personal-details.family-name.value` <chr>,
#> #   `personal-details.family-name.visibility` <chr>,
#> #   `personal-details.credit-name.value` <chr>,
#> #   `personal-details.credit-name.visibility` <chr>,
#> #   biography.value <chr>, biography.visibility <chr>,
#> #   `researcher-urls.researcher-url` <list>,
#> #   `researcher-urls.visibility` <chr>, `contact-details.email` <list>,
#> #   `contact-details.address.country.value` <chr>,
#> #   `contact-details.address.country.visibility` <chr>,
#> #   `external-identifiers.external-identifier` <list>,
#> #   `external-identifiers.visibility` <chr>
#> 
#> attr(,"class")
#> [1] "orcid_doi"
```

Function is vectorized, search for many DOIs


```r
dois <- c("10.1371/journal.pone.0025995","10.1371/journal.pone.0053712",
       "10.1371/journal.pone.0054608","10.1371/journal.pone.0055937")
orcid_doi(dois=dois, fuzzy = TRUE)
#> [[1]]
#> # A tibble: 10 x 29
#>    `relevancy-score.value` orcid `orcid-id` `orcid-deprecated`
#>  *                   <dbl> <lgl>      <lgl>              <lgl>
#>  1               0.3166133    NA         NA                 NA
#>  2               0.1935279    NA         NA                 NA
#>  3               0.1824598    NA         NA                 NA
#>  4               0.1824598    NA         NA                 NA
#>  5               0.1824598    NA         NA                 NA
#>  6               0.1824598    NA         NA                 NA
#>  7               0.1824598    NA         NA                 NA
#>  8               0.1824598    NA         NA                 NA
#>  9               0.1824598    NA         NA                 NA
#> 10               0.1824598    NA         NA                 NA
#> # ... with 25 more variables: `orcid-preferences` <lgl>,
#> #   `orcid-history` <lgl>, `orcid-activities` <lgl>,
#> #   `orcid-internal` <lgl>, type <lgl>, `group-type` <lgl>,
#> #   `client-type` <lgl>, `orcid-identifier.value` <lgl>,
#> #   `orcid-identifier.uri` <chr>, `orcid-identifier.path` <chr>,
#> #   `orcid-identifier.host` <chr>, biography <lgl>,
#> #   `researcher-urls` <lgl>, `contact-details` <lgl>, keywords <lgl>,
#> #   delegation <lgl>, scope <lgl>, `personal-details.credit-name` <lgl>,
#> #   `personal-details.other-names` <lgl>,
#> #   `personal-details.given-names.value` <chr>,
#> #   `personal-details.given-names.visibility` <chr>,
#> #   `personal-details.family-name.value` <chr>,
#> #   `personal-details.family-name.visibility` <chr>,
#> #   `external-identifiers.external-identifier` <list>,
#> #   `external-identifiers.visibility` <chr>
#> 
#> [[2]]
#> # A tibble: 10 x 30
#>    `relevancy-score.value` orcid `orcid-id` `orcid-deprecated`
#>  *                   <dbl> <lgl>      <lgl>              <lgl>
#>  1               0.4016760    NA         NA                 NA
#>  2               0.1935279    NA         NA                 NA
#>  3               0.1824598    NA         NA                 NA
#>  4               0.1824598    NA         NA                 NA
#>  5               0.1824598    NA         NA                 NA
#>  6               0.1824598    NA         NA                 NA
#>  7               0.1824598    NA         NA                 NA
#>  8               0.1824598    NA         NA                 NA
#>  9               0.1824598    NA         NA                 NA
#> 10               0.1824598    NA         NA                 NA
#> # ... with 26 more variables: `orcid-preferences` <lgl>,
#> #   `orcid-history` <lgl>, `orcid-activities` <lgl>,
#> #   `orcid-internal` <lgl>, type <lgl>, `group-type` <lgl>,
#> #   `client-type` <lgl>, `orcid-identifier.value` <lgl>,
#> #   `orcid-identifier.uri` <chr>, `orcid-identifier.path` <chr>,
#> #   `orcid-identifier.host` <chr>, biography <lgl>,
#> #   `contact-details` <lgl>, `external-identifiers` <lgl>,
#> #   delegation <lgl>, scope <lgl>, `personal-details.credit-name` <lgl>,
#> #   `personal-details.other-names` <lgl>,
#> #   `personal-details.given-names.value` <chr>,
#> #   `personal-details.given-names.visibility` <chr>,
#> #   `personal-details.family-name.value` <chr>,
#> #   `personal-details.family-name.visibility` <chr>,
#> #   `researcher-urls.researcher-url` <list>,
#> #   `researcher-urls.visibility` <chr>, keywords.keyword <list>,
#> #   keywords.visibility <chr>
#> 
#> [[3]]
#> # A tibble: 10 x 29
#>    `relevancy-score.value` orcid `orcid-id` `orcid-deprecated`
#>  *                   <dbl> <lgl>      <lgl>              <lgl>
#>  1               0.5080040    NA         NA                 NA
#>  2               0.1935279    NA         NA                 NA
#>  3               0.1824598    NA         NA                 NA
#>  4               0.1824598    NA         NA                 NA
#>  5               0.1824598    NA         NA                 NA
#>  6               0.1824598    NA         NA                 NA
#>  7               0.1824598    NA         NA                 NA
#>  8               0.1824598    NA         NA                 NA
#>  9               0.1824598    NA         NA                 NA
#> 10               0.1824598    NA         NA                 NA
#> # ... with 25 more variables: `orcid-preferences` <lgl>,
#> #   `orcid-history` <lgl>, `orcid-activities` <lgl>,
#> #   `orcid-internal` <lgl>, type <lgl>, `group-type` <lgl>,
#> #   `client-type` <lgl>, `orcid-identifier.value` <lgl>,
#> #   `orcid-identifier.uri` <chr>, `orcid-identifier.path` <chr>,
#> #   `orcid-identifier.host` <chr>, biography <lgl>,
#> #   `researcher-urls` <lgl>, `contact-details` <lgl>, keywords <lgl>,
#> #   delegation <lgl>, scope <lgl>, `personal-details.credit-name` <lgl>,
#> #   `personal-details.other-names` <lgl>,
#> #   `personal-details.given-names.value` <chr>,
#> #   `personal-details.given-names.visibility` <chr>,
#> #   `personal-details.family-name.value` <chr>,
#> #   `personal-details.family-name.visibility` <chr>,
#> #   `external-identifiers.external-identifier` <list>,
#> #   `external-identifiers.visibility` <chr>
#> 
#> [[4]]
#> # A tibble: 10 x 29
#>    `relevancy-score.value` orcid `orcid-id` `orcid-deprecated`
#>  *                   <dbl> <lgl>      <lgl>              <lgl>
#>  1               0.2137784    NA         NA                 NA
#>  2               0.2038749    NA         NA                 NA
#>  3               0.2035298    NA         NA                 NA
#>  4               0.1918897    NA         NA                 NA
#>  5               0.1918897    NA         NA                 NA
#>  6               0.1918897    NA         NA                 NA
#>  7               0.1918897    NA         NA                 NA
#>  8               0.1918897    NA         NA                 NA
#>  9               0.1918897    NA         NA                 NA
#> 10               0.1918897    NA         NA                 NA
#> # ... with 25 more variables: `orcid-preferences` <lgl>,
#> #   `orcid-history` <lgl>, `orcid-activities` <lgl>,
#> #   `orcid-internal` <lgl>, type <lgl>, `group-type` <lgl>,
#> #   `client-type` <lgl>, `orcid-identifier.value` <lgl>,
#> #   `orcid-identifier.uri` <chr>, `orcid-identifier.path` <chr>,
#> #   `orcid-identifier.host` <chr>, biography <lgl>,
#> #   `researcher-urls` <lgl>, `contact-details` <lgl>, keywords <lgl>,
#> #   delegation <lgl>, scope <lgl>, `personal-details.credit-name` <lgl>,
#> #   `personal-details.other-names` <lgl>,
#> #   `personal-details.given-names.value` <chr>,
#> #   `personal-details.given-names.visibility` <chr>,
#> #   `personal-details.family-name.value` <chr>,
#> #   `personal-details.family-name.visibility` <chr>,
#> #   `external-identifiers.external-identifier` <list>,
#> #   `external-identifiers.visibility` <chr>
#> 
#> attr(,"class")
#> [1] "orcid_doi"
```



### Citing

To cite `rorcid` in publications use:

<br>

> Scott Chamberlain (2016). rorcid: Interface to the 'Orcid.org' 'API'.
  R package version 0.3.0. https://CRAN.R-project.org/package=rorcid


### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rorcid](https://github.com/ropensci/rorcid/issues?state=open)

[Back to top](#top)
