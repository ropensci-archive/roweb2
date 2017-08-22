---
title: ckanr tutorial
package_version: 0.1.0
---



ckanr is a general purpose R client for CKAN, the open source data portal platform
from the Open Knowledge Foundation.

It is meant to be as general as possible, allowing you to work with any CKAN instance.

<section id="installation">

## Installation

Install and load `ckanr` into the R session. Stable version from CRAN


```r
install.packages("ckanr")
```

Or development version from Github:


```r
install.packages("devtools")
devtools::install_github("ropensci/ckanr")
```


```r
library('ckanr')
```

<section id="usage">

## Usage

Note: the default base CKAN URL is set to [http://data.techno-science.ca/](http://data.techno-science.ca/). You can change this using `ckanr_setup()`, or change the URL using the `url`
parameter in each function call.

To set one or both, run:


```r
# restores default CKAN url to http://data.techno-science.ca/
ckanr_setup()
# Just set url
ckanr_setup(url = "http://data.techno-science.ca/")
# set url and key
ckanr_setup(url = "http://data.techno-science.ca/", key = "my-ckan-api-key")
```

### Changes


```r
changes(limit = 2, as = "table")[, 1:4]
#>                                user_id                  timestamp
#> 1 27778230-2e90-4818-9f00-bbf778c8fa09 2016-01-15T21:43:08.908094
#> 2 27778230-2e90-4818-9f00-bbf778c8fa09 2016-01-14T22:04:15.254975
#>                              object_id
#> 1 77e58769-2602-4841-b269-00ef35f889d2
#> 2 77e58769-2602-4841-b269-00ef35f889d2
#>                            revision_id
#> 1 3fb30473-88b7-40ac-8c2e-64520b6bf8b8
#> 2 2c831552-e87e-49bd-b52e-de9e07ae5262
```

### List datasets


```r
package_list(as = "table")
#>  [1] "artifact-data-agriculture"
#>  [2] "artifact-data-aviation"
#>  [3] "artifact-data-bookbinding"
#>  [4] "artifact-data-chemistry"
#>  [5] "artifact-data-communications"
#>  [6] "artifact-data-computing-technology"
#>  [7] "artifact-data-domestic-technology"
#>  [8] "artifact-data-energy-electric"
#>  [9] "artifact-data-exploration-and-survey"
#> [10] "artifact-data-fisheries"
...
```

### List tags


```r
tag_list('aviation', as = 'table')
#>   vocabulary_id                     display_name
#> 1            NA                         Aviation
#> 2            NA Canada Aviation and Space Museum
#>                                     id                             name
#> 1 cc1db2db-b08b-4888-897f-a17eade2461b                         Aviation
#> 2 8d05a650-bc7b-4b89-bcc8-c10177e60119 Canada Aviation and Space Museum
```

### Show tags

Subset for readme brevity


```r
tag_show('Aviation')
#> <CKAN Tag> cc1db2db-b08b-4888-897f-a17eade2461b
#>   Name: Aviation
#>   Display name: Aviation
#>   Vocabulary id:
#>   No. Packages: 2
#>   Packages (up to 5): artifact-data-aviation, cstmc-smstc-artifacts-artefact
```

### List groups


```r
group_list(as = 'table')[, 1:3]
#>                         display_name description
#> 1                     Communications
#> 2 Domestic and Industrial Technology
#> 3                         Everything
#> 4                           Location
#> 5                          Resources
#> 6         Scientific Instrumentation
#> 7                     Transportation
#>                                title
#> 1                     Communications
#> 2 Domestic and Industrial Technology
#> 3                         Everything
#> 4                           Location
#> 5                          Resources
#> 6         Scientific Instrumentation
#> 7                     Transportation
```

### Show groups

Subset for readme brevity


```r
group_show('communications', as = 'table')$users
#>   openid about capacity     name                    created
#> 1     NA  <NA>    admin     marc 2014-10-24T14:44:29.885262
#> 2     NA          admin sepandar 2014-10-23T19:40:42.056418
#>                         email_hash sysadmin
#> 1 a32002c960476614370a16e9fb81f436    FALSE
#> 2 10b930a228afd1da2647d62e70b71bf8     TRUE
#>   activity_streams_email_notifications  state number_of_edits
#> 1                                FALSE active             413
#> 2                                FALSE active              44
#>   number_administered_packages display_name fullname
#> 1                           39         marc     <NA>
#> 2                            1     sepandar
#>                                     id
#> 1 27778230-2e90-4818-9f00-bbf778c8fa09
#> 2 b50449ea-1dcc-4d52-b620-fc95bf56034b
```

### Show a package


```r
package_show('34d60b13-1fd5-430e-b0ec-c8bc7f4841cf', as = 'table')$resources[, 1:10]
#>                      resource_group_id cache_last_updated
#> 1 ea8533d9-cdc6-4e0e-97b9-894e06d50b92                 NA
#> 2 ea8533d9-cdc6-4e0e-97b9-894e06d50b92                 NA
#> 3 ea8533d9-cdc6-4e0e-97b9-894e06d50b92                 NA
#> 4 ea8533d9-cdc6-4e0e-97b9-894e06d50b92                 NA
#>           revision_timestamp webstore_last_updated
#> 1 2014-10-28T18:13:22.213530                    NA
#> 2 2014-11-04T02:59:50.567068                    NA
#> 3 2014-11-05T21:23:58.533397                    NA
#> 4 2014-11-05T21:25:16.848423                    NA
#>                                     id size  state hash
#> 1 be2b0af8-24a8-4a55-8b30-89f5459b713a   NA active
#> 2 7d65910e-4bdc-4f06-a213-e24e36762767   NA active
#> 3 97622ad7-1507-4f6a-8acb-14e826447389   NA active
#> 4 7a72498a-c49c-4e84-8b10-58991de10df6   NA active
#>                                    description format
#> 1                                  XML Dataset    XML
#> 2 Data dictionary for CSTMC artifact datasets.    XLS
#> 3       Tips for using the artifacts datasets.   .php
#> 4       Tips for using the artifacts datasets.   .php
```

### Search for packages


```r
out <- package_search(q = '*:*', rows = 2, as = "table")$results
out[, !names(out) %in% 'resources'][, 1:10]
#>                      license_title maintainer relationships_as_object
#> 1 Open Government Licence - Canada                               NULL
#> 2 Open Government Licence - Canada                               NULL
#>   private maintainer_email         revision_timestamp
#> 1   FALSE                  2014-10-28T21:05:20.157004
#> 2   FALSE                  2016-01-12T22:41:12.265259
#>                                     id           metadata_created
#> 1 77e58769-2602-4841-b269-00ef35f889d2 2014-10-27T17:26:44.189794
#> 2 0a801729-aa94-4d76-a5e0-7b487303f4e5 2014-10-24T19:16:59.160533
#>            metadata_modified author
#> 1 2016-01-15T21:43:08.645442
#> 2 2016-01-12T22:41:12.266205
```

### Search for resources


```r
resource_search(q = 'name:data', limit = 2, as = 'table')
#> $count
#> [1] 71
#>
#> $results
#>                      resource_group_id cache_last_updated
#> 1 01a82e52-01bf-4a9c-9b45-c4f9b92529fa                 NA
#> 2 01a82e52-01bf-4a9c-9b45-c4f9b92529fa                 NA
#>   webstore_last_updated                                   id size  state
#> 1                    NA e179e910-27fb-44f4-a627-99822af49ffa   NA active
#> 2                    NA ba84e8b7-b388-4d2a-873a-7b107eb7f135   NA active
#>   last_modified hash                                  description format
#> 1            NA                                       XML Dataset    XML
#> 2            NA      Data dictionary for CSTMC artifact datasets.    XLS
#>   mimetype_inner url_type mimetype cache_url
#> 1             NA       NA       NA        NA
#> 2             NA       NA       NA        NA
#>                                           name                    created
#> 1 Artifact Data - Exploration and Survey (XML) 2014-10-28T15:50:35.374303
#> 2                              Data Dictionary 2014-11-03T18:01:02.094210
#>                                                                                                                                                    url
#> 1              http://source.techno-science.ca/datasets-donn%C3%A9es/artifacts-artefacts/groups-groupes/exploration-and-survey-exploration-et-leve.xml
#> 2 http://source.techno-science.ca/datasets-donn%C3%A9es/artifacts-artefacts/cstmc-artifact-data-dictionary-dictionnaire-de-donnees-artefacts-smstc.xls
#>   webstore_url position                          revision_id resource_type
#> 1           NA        0 a22e6741-3e89-4db0-a802-ba594b1c1fad            NA
#> 2           NA        1 da1f8585-521d-47ef-8ead-7832474a3421            NA
```

### Example of using a different CKAN API

#### The UK Natural History Museum

Website: [http://data.nhm.ac.uk/](http://data.nhm.ac.uk/)

List datasets


```r
ckanr_setup(url = "http://data.nhm.ac.uk")
package_list(as = "table")
#>  [1] "abyssline"
#>  [2] "bibliography-scleractinia"
#>  [3] "bioacoustica"
#>  [4] "bioacoustica-talks-insect-natural-history"
#>  [5] "bioacoustica-talks-international-congress-entomology"
#>  [6] "biodiversity-heritage-library"
#>  [7] "bothriocephalidea-phylogeny"
#>  [8] "burrow-casts-of-the-mole-cricket-genus-gryllotalpa-latreille-1802"
#>  [9] "checklist-of-the-lepidoptera-of-the-british-isles-data"
#> [10] "chemistry-samples-central-system-carbonate-clays"
...
```

Tags

_list_


```r
head(tag_list(as = "table"))
#>   vocabulary_id display_name                                   id
#> 1            NA 3D modelling 119868d7-1753-4c35-8641-14681dc472a7
#> 2            NA      3D Scan d95f1342-574a-454b-9ada-533d417de418
#> 3            NA    acoustics b7a0c442-c5b2-408e-8c53-c4a8ee53770f
#> 4            NA       Africa 21bc2c80-ac2d-48c1-8252-eab071cef60a
#> 5            NA  agriculture 025ee4af-432e-4ab3-87d1-9316f36230cd
#> 6            NA Aleyrodoidea 4b98c497-28eb-4969-ba0c-c4431265e581
#>           name
#> 1 3D modelling
#> 2      3D Scan
#> 3    acoustics
#> 4       Africa
#> 5  agriculture
#> 6 Aleyrodoidea
```

_show_


```r
tag_show('arthropods', as = 'table')
#> $vocabulary_id
#> NULL
#>
#> $packages
#> list()
#>
#> $display_name
#> [1] "arthropods"
#>
#> $id
#> [1] "f9245868-f4cb-4c85-a59d-11692db19e86"
#>
#> $name
#> [1] "arthropods"
```

Packages

_search_


```r
out <- package_search(q = '*:*', rows = 2, as = 'table')
out$results[, 1:10]
#>              license_title maintainer relationships_as_object private
#> 1 Creative Commons CC0 1.0         NA                    NULL   FALSE
#> 2 Creative Commons CC0 1.0         NA                    NULL   FALSE
#>   maintainer_email num_tags update_frequency
#> 1               NA        1           weekly
#> 2               NA        1           weekly
#>                                     id           metadata_created
#> 1 56e711e6-c847-4f99-915a-6894bb5c5dea 2014-12-08T16:39:22.346941
#> 2 9dfb777e-2296-4800-a053-b1c80fd30bac 2014-12-15T13:20:25.858259
#>            metadata_modified
#> 1 2016-03-24T17:05:38.696417
#> 2 2016-03-24T17:07:56.547525
```

_show_


```r
package_show(id = "56e711e6-c847-4f99-915a-6894bb5c5dea", as = "table")
#> $domain
#> [1] "data.nhm.ac.uk"
#>
#> $license_title
#> [1] "Creative Commons CC0 1.0"
#>
#> $maintainer
#> NULL
#>
#> $relationships_as_object
...
```

## Citing

To cite `ckanr` in publications use:

<br>

> Scott Chamberlain, Imanuel Costigan, Wush Wu, Florian Mayer (2016). ckanr: Client for the Comprehensive Knowledge Archive Network ('CKAN') 'API'. R package version 0.1.0. https://github.com/ropensci/ckanr

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rnoaa](https://github.com/ropensci/ckanr/issues?state=open)

[Back to top](#top)
