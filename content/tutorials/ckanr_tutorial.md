---
title: ckanr tutorial
package_version: 0.1.0
---



ckanr is a general purpose R client for CKAN, the open source data portal platform
from the Open Knowledge Foundation.

It is meant to be as general as possible, allowing you to work with any CKAN instance.

### Installation

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

### Usage

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

#### Changes


```r
changes(limit = 2, as = "table")[, 1:4]
#>                                user_id                  timestamp
#> 1 27778230-2e90-4818-9f00-bbf778c8fa09 2016-06-14T21:31:28.306231
#> 2 27778230-2e90-4818-9f00-bbf778c8fa09 2016-06-14T21:30:26.594125
#>                              object_id
#> 1 99f457c9-ea24-48a1-87be-b52385825b6a
#> 2 99f457c9-ea24-48a1-87be-b52385825b6a
#>                            revision_id
#> 1 e2d9463d-e97c-48f5-a816-7fe26ee60dcd
#> 2 9d846213-1389-4dab-bfe5-77dd3256995a
```

#### List datasets


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

#### List tags


```r
tag_list('aviation', as = 'table')
#>   vocabulary_id                     display_name
#> 1            NA                         Aviation
#> 2            NA Canada Aviation and Space Museum
#>                                     id                             name
#> 1 cc1db2db-b08b-4888-897f-a17eade2461b                         Aviation
#> 2 8d05a650-bc7b-4b89-bcc8-c10177e60119 Canada Aviation and Space Museum
```

#### Show tags

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

#### List groups


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

#### Show groups

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
#> 1                                FALSE active             516
#> 2                                FALSE active              44
#>   number_administered_packages display_name fullname
#> 1                           40         marc     <NA>
#> 2                            1     sepandar         
#>                                     id
#> 1 27778230-2e90-4818-9f00-bbf778c8fa09
#> 2 b50449ea-1dcc-4d52-b620-fc95bf56034b
```

#### Show a package


```r
package_show('34d60b13-1fd5-430e-b0ec-c8bc7f4841cf', as = 'table')$resources[, 1:10]
#>                      resource_group_id cache_last_updated
#> 1 ea8533d9-cdc6-4e0e-97b9-894e06d50b92                 NA
#> 2 ea8533d9-cdc6-4e0e-97b9-894e06d50b92                 NA
#> 3 ea8533d9-cdc6-4e0e-97b9-894e06d50b92                 NA
#> 4 ea8533d9-cdc6-4e0e-97b9-894e06d50b92                 NA
#> 5 ea8533d9-cdc6-4e0e-97b9-894e06d50b92                 NA
#>           revision_timestamp webstore_last_updated
#> 1 2016-06-13T20:05:16.818800                    NA
#> 2 2014-11-04T02:59:50.567068                    NA
#> 3 2014-11-05T21:23:58.533397                    NA
#> 4 2014-11-05T21:25:16.848423                    NA
#> 5 2016-06-13T20:06:50.013746                    NA
#>                                     id size  state hash
#> 1 be2b0af8-24a8-4a55-8b30-89f5459b713a   NA active     
#> 2 7d65910e-4bdc-4f06-a213-e24e36762767   NA active     
#> 3 97622ad7-1507-4f6a-8acb-14e826447389   NA active     
#> 4 7a72498a-c49c-4e84-8b10-58991de10df6   NA active     
#> 5 7e2cb5de-550d-41a8-ab9d-b2ec35b6671a   NA active     
#>                                    description format
#> 1                                  XML Dataset    XML
#> 2 Data dictionary for CSTMC artifact datasets.    XLS
#> 3       Tips for using the artifacts datasets.   .php
#> 4       Tips for using the artifacts datasets.   .php
#> 5                          Jeux de données XML    XML
```

#### Search for packages


```r
out <- package_search(q = '*:*', rows = 2, as = "table")$results
out[, !names(out) %in% 'resources'][, 1:10]
#>                      license_title maintainer relationships_as_object
#> 1 Open Government Licence - Canada                               NULL
#> 2 Open Government Licence - Canada                               NULL
#>   private maintainer_email         revision_timestamp
#> 1   FALSE                  2014-10-28T21:27:57.475091
#> 2   FALSE                  2014-10-28T20:40:55.803602
#>                                     id           metadata_created
#> 1 99f457c9-ea24-48a1-87be-b52385825b6a 2014-10-24T17:39:06.411039
#> 2 443cb020-f2ae-48b1-be67-90df1abd298e 2014-10-28T20:39:23.561940
#>            metadata_modified author
#> 1 2016-06-14T21:31:27.983485       
#> 2 2016-06-14T18:59:17.786219
```

#### Search for resources


```r
resource_search(q = 'name:data', limit = 2, as = 'table')
#> $count
#> [1] 74
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

#### Example of using a different CKAN API

**The UK Natural History Museum**

Website: [http://data.nhm.ac.uk/](http://data.nhm.ac.uk/)

List datasets


```r
ckanr_setup(url = "http://data.nhm.ac.uk")
package_list(as = "table")
#>  [1] "abyssline"                                                        
#>  [2] "african-spiny-solanum"                                            
#>  [3] "alignments-of-co1-nd1-and-16s-rrna-for-the-land-snail-corilla"    
#>  [4] "american-phlebotominae-nhm"                                       
#>  [5] "bibliography-scleractinia"                                        
#>  [6] "bioacoustica"                                                     
#>  [7] "bioacoustica-talks-insect-natural-history"                        
#>  [8] "bioacoustica-talks-international-congress-entomology"             
#>  [9] "biodiversity-heritage-library"                                    
#> [10] "biopearl"                                                         
...
```

Tags

_list_


```r
head(tag_list(as = "table"))
#>   vocabulary_id    display_name                                   id
#> 1            NA    3D modelling 119868d7-1753-4c35-8641-14681dc472a7
#> 2            NA         3D Scan d95f1342-574a-454b-9ada-533d417de418
#> 3            NA        3D scans 701e15ab-1d85-4935-ba82-a9926ef219df
#> 4            NA Acid alteration 63d78282-b851-4be5-b4ee-9c5dfd929f5e
#> 5            NA       acoustics b7a0c442-c5b2-408e-8c53-c4a8ee53770f
#> 6            NA          Africa 21bc2c80-ac2d-48c1-8252-eab071cef60a
#>              name
#> 1    3D modelling
#> 2         3D Scan
#> 3        3D scans
#> 4 Acid alteration
#> 5       acoustics
#> 6          Africa
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
#>           license_title maintainer relationships_as_object private
#> 1               CC0-1.0         NA                    NULL   FALSE
#> 2 License not specified         NA                    NULL   FALSE
#>   maintainer_email         revision_timestamp update_frequency
#> 1               NA 2015-05-27T15:24:07.501850           weekly
#> 2               NA 2016-11-24T15:21:05.247618                 
#>                                     id           metadata_created
#> 1 56e711e6-c847-4f99-915a-6894bb5c5dea 2014-12-08T16:39:22.346941
#> 2 dabf7089-7ff9-42bf-a1bf-a4d0c37d7b85 2016-11-24T15:20:46.742971
#>            metadata_modified
#> 1 2017-09-29T11:27:08.803607
#> 2 2017-10-16T16:42:59.700282
```

_show_


```r
package_show(id = "56e711e6-c847-4f99-915a-6894bb5c5dea", as = "table")
#> $domain
#> [1] "data.nhm.ac.uk"
#> 
#> $license_title
#> [1] "CC0-1.0"
#> 
#> $maintainer
#> NULL
#> 
#> $relationships_as_object
...
```

### Citing

To cite `ckanr` in publications use:

<br>

> Scott Chamberlain, Imanuel Costigan, Wush Wu, Florian Mayer (2016). ckanr: Client for the Comprehensive Knowledge Archive Network ('CKAN') 'API'. R package version 0.1.0. https://github.com/ropensci/ckanr

### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rnoaa](https://github.com/ropensci/ckanr/issues?state=open)

[Back to top](#top)
