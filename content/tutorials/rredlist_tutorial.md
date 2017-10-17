---
title: rredlist tutorial
package_version: 0.4.0
---



`rredlist` is a [IUCN Red List](http://apiv3.iucnredlist.org/api/v3/docs) R client. The IUCN Red List is a global list of threatened and endangered species.

## Authentication

IUCN requires you to get your own API key, an alphanumeric string that you
need to send in every request. Get it at
[http://apiv3.iucnredlist.org/api/v3/token](http://apiv3.iucnredlist.org/api/v3/token).
Keep this key private. You can pass the key in to each function via the
`key` parameter, but it's better to store the key either as a environment
variable (`IUCN_REDLIST_KEY`) or an R option (`iucn_redlist_key`) - we
suggest using the former option.

## High vs. Low level package APIs

__High level API__

High level functions do the HTTP request and parse data to a data.frame for
ease of downstream use. The high level functions have no underscore on the end
of the function name, e.g., `rl_search`

__Low level API__

The parsing to data.frame in the high level API does take extra time. The low
level API only does the HTTP request, and gives back JSON without doing any
more parsing. The low level functions DO have an underscore on the end
of the function name, e.g., `rl_search_`


### Installation

Stable `rredlist` version from CRAN


```r
install.packages("rredlist")
```

Or, the development version from Github


```r
devtools::install_github("ropenscilabs/rredlist")
```


```r
library("rredlist")
```


## Usage


### Citing IUCN API

use the function `rl_citation()`


```r
rl_citation()
#> [1] "IUCN 2015. IUCN Red List of Threatened Species. Version 2017-2 <www.iucnredlist.org>"
```

### High level API

High level functions do the HTTP request and parse to data to a data.frame for ease
of downstream use.


```r
rl_search('Fratercula arctica')
#> $name
#> [1] "Fratercula arctica"
#> 
#> $result
#>    taxonid    scientific_name  kingdom   phylum class           order
#> 1 22694927 Fratercula arctica ANIMALIA CHORDATA  AVES CHARADRIIFORMES
#>    family      genus main_common_name        authority published_year
#> 1 ALCIDAE Fratercula  Atlantic Puffin (Linnaeus, 1758)           2017
#>   category criteria marine_system freshwater_system terrestrial_system
#> 1       VU  A4abcde          TRUE             FALSE               TRUE
#>                 assessor                 reviewer aoo_km2  eoo_km2
#> 1 BirdLife International Butchart, S. & Symes, A.      NA 20800000
#>   elevation_upper elevation_lower depth_upper depth_lower errata_flag
#> 1              NA              NA          NA          NA          NA
#>   errata_reason amended_flag amended_reason
#> 1            NA         TRUE   Map revised.
```

Likely a bit faster is to parse to a list only, and not take the extra data.frame parsing time


```r
rl_search('Fratercula arctica', parse = FALSE)
#> $name
#> [1] "Fratercula arctica"
#> 
#> $result
#> $result[[1]]
#> $result[[1]]$taxonid
#> [1] 22694927
#> 
#> $result[[1]]$scientific_name
#> [1] "Fratercula arctica"
#> 
#> $result[[1]]$kingdom
#> [1] "ANIMALIA"
#> 
#> $result[[1]]$phylum
#> [1] "CHORDATA"
#> 
#> $result[[1]]$class
#> [1] "AVES"
#> 
#> $result[[1]]$order
#> [1] "CHARADRIIFORMES"
#> 
#> $result[[1]]$family
#> [1] "ALCIDAE"
#> 
#> $result[[1]]$genus
#> [1] "Fratercula"
#> 
#> $result[[1]]$main_common_name
#> [1] "Atlantic Puffin"
#> 
#> $result[[1]]$authority
#> [1] "(Linnaeus, 1758)"
#> 
#> $result[[1]]$published_year
#> [1] 2017
#> 
#> $result[[1]]$category
#> [1] "VU"
#> 
#> $result[[1]]$criteria
#> [1] "A4abcde"
#> 
#> $result[[1]]$marine_system
#> [1] TRUE
#> 
#> $result[[1]]$freshwater_system
#> [1] FALSE
#> 
#> $result[[1]]$terrestrial_system
#> [1] TRUE
#> 
#> $result[[1]]$assessor
#> [1] "BirdLife International"
#> 
#> $result[[1]]$reviewer
#> [1] "Butchart, S. & Symes, A."
#> 
#> $result[[1]]$aoo_km2
#> NULL
#> 
#> $result[[1]]$eoo_km2
#> [1] "20800000"
#> 
#> $result[[1]]$elevation_upper
#> NULL
#> 
#> $result[[1]]$elevation_lower
#> NULL
#> 
#> $result[[1]]$depth_upper
#> NULL
#> 
#> $result[[1]]$depth_lower
#> NULL
#> 
#> $result[[1]]$errata_flag
#> NULL
#> 
#> $result[[1]]$errata_reason
#> NULL
#> 
#> $result[[1]]$amended_flag
#> [1] TRUE
#> 
#> $result[[1]]$amended_reason
#> [1] "Map revised."
```

### Low level API

The parsing to data.frame in the high level API does take extra time. The low level API
only does the HTTP request, and gives back JSON without doing any more parsing


```r
rl_search_('Fratercula arctica')
#> [1] "{\"name\":\"Fratercula arctica\",\"result\":[{\"taxonid\":22694927,\"scientific_name\":\"Fratercula arctica\",\"kingdom\":\"ANIMALIA\",\"phylum\":\"CHORDATA\",\"class\":\"AVES\",\"order\":\"CHARADRIIFORMES\",\"family\":\"ALCIDAE\",\"genus\":\"Fratercula\",\"main_common_name\":\"Atlantic Puffin\",\"authority\":\"(Linnaeus, 1758)\",\"published_year\":2017,\"category\":\"VU\",\"criteria\":\"A4abcde\",\"marine_system\":true,\"freshwater_system\":false,\"terrestrial_system\":true,\"assessor\":\"BirdLife International\",\"reviewer\":\"Butchart, S. & Symes, A.\",\"aoo_km2\":null,\"eoo_km2\":\"20800000\",\"elevation_upper\":null,\"elevation_lower\":null,\"depth_upper\":null,\"depth_lower\":null,\"errata_flag\":null,\"errata_reason\":null,\"amended_flag\":true,\"amended_reason\":\"Map revised.\"}]}"
```

To consume this JSON, you can use `jsonlite`


```r
library("jsonlite")
jsonlite::fromJSON(rl_search_('Fratercula arctica'))
#> $name
#> [1] "Fratercula arctica"
#> 
#> $result
#>    taxonid    scientific_name  kingdom   phylum class           order
#> 1 22694927 Fratercula arctica ANIMALIA CHORDATA  AVES CHARADRIIFORMES
#>    family      genus main_common_name        authority published_year
#> 1 ALCIDAE Fratercula  Atlantic Puffin (Linnaeus, 1758)           2017
#>   category criteria marine_system freshwater_system terrestrial_system
#> 1       VU  A4abcde          TRUE             FALSE               TRUE
#>                 assessor                 reviewer aoo_km2  eoo_km2
#> 1 BirdLife International Butchart, S. & Symes, A.      NA 20800000
#>   elevation_upper elevation_lower depth_upper depth_lower errata_flag
#> 1              NA              NA          NA          NA          NA
#>   errata_reason amended_flag amended_reason
#> 1            NA         TRUE   Map revised.
```

Or other tools, e.g., `jq` via the `jqr` R client


```r
# devtools::install_github("ropensci/jqr")
library("jqr")
rl_search_('Fratercula arctica') %>% dot()
#> {
#>     "name": "Fratercula arctica",
#>     "result": [
#>         {
#>             "taxonid": 22694927,
#>             "scientific_name": "Fratercula arctica",
#>             "kingdom": "ANIMALIA",
#>             "phylum": "CHORDATA",
#>             "class": "AVES",
#>             "order": "CHARADRIIFORMES",
#>             "family": "ALCIDAE",
#>             "genus": "Fratercula",
#>             "main_common_name": "Atlantic Puffin",
#>             "authority": "(Linnaeus, 1758)",
#>             "published_year": 2017,
#>             "category": "VU",
#>             "criteria": "A4abcde",
#>             "marine_system": true,
#>             "freshwater_system": false,
#>             "terrestrial_system": true,
#>             "assessor": "BirdLife International",
#>             "reviewer": "Butchart, S. & Symes, A.",
#>             "aoo_km2": null,
#>             "eoo_km2": "20800000",
#>             "elevation_upper": null,
#>             "elevation_lower": null,
#>             "depth_upper": null,
#>             "depth_lower": null,
#>             "errata_flag": null,
#>             "errata_reason": null,
#>             "amended_flag": true,
#>             "amended_reason": "Map revised."
#>         }
#>     ]
#> }
```


### Citing

To cite `rredlist` in publications use:

<br>

> Scott Chamberlain (2017). rredlist: 'IUCN' Red List Client. R package
  version 0.4.0. https://CRAN.R-project.org/package=rredlist


### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rredlist](https://github.com/ropenscilabs/rredlist/issues?state=open)

[Back to top](#top)
