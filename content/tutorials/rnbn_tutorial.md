---
title: rnbn tutorial
package_version: 1.0.3
---



The National Biodiversity Network (NBN) is an on-line repository for biodiversity data from the UK. At the time of writing, it contains over 100 million species records in over 900 datasets. Data can be accessed via web-services provided by the Gateway web-site (see [documentation](https://data.nbn.org.uk/Documentation/Web_Services/Web_Services-REST/resources/restapi/index.html))

This package provides methods to interact with the NBN's web services and get species
records and other supporting information.

## Registering with the NBN gateway and logging in


To use data from the NBN gateway you must first register. This is an easy process and
can be done by visiting https://data.nbn.org.uk/User/Register. Once registered
you will be sent an email to verify your address, once verified you are ready to use
`rnbn`.

When using `rnbn` you will be asked to login the first time you attempt to access
occurrence data. Once logged in you will stay logged in for the remainder of your R session.

<section id="installation">

## Installation


```r
install.packages("rnbn")
```

Or development version from GitHub


```r
install.packages("devtools")
devtools::install_github("ropensci/rnbn")
```


```r
library("rnbn")
```

<section id="usage">

## Usage


### Getting species occurrence records

The `getOccurrences` function gets a data.frame of species occurrence records from
the NBN Gateway. Columns include name, TVK, date and location of the observation as a
minimum, and may include other columns depending what has been submitted by the data
providers and what access they allow. The first time this function is used in an R session you will be asked to enter your username and password at the console. An alternative method for logging in is to use the nbnLogin function (see below)

The minimum information required to request species occurrences from the NBN
Gateway is one of the following: a Taxon Version Key (TVK), a grid reference or the name
of a species group.

Independent of which method you use there are three messages that will appear in
your console:




```r
# I could log in like this...
# nbnLogin(username = 'myUsername', password = 'myPassword')
# ...or let getOccurrences prompt me. The latter is more
# secure as I dont have to include my password in my scripts
```



Request occurrence data using taxon version key


```r
occ <- getOccurrences(tvks = 'NBNSYS0000002010', acceptTandC = TRUE)
#> Requesting batch 1 of 1
#> Requesting data providers' information
```

The first message returned to console details the batch number being processed. `rnbn` breaks down a data request into batches so that it does not overload the system. This is also useful for monitoring progress. The second message tells us that the function is retrieving the data providers for the data it just collected. These can be silenced by setting `silent = TRUE`. The third message is a warning that highlights the terms and conditions associated with using data from the NBN gateway. It is important that you read these terms and conditions since by using the `rnbn` package you are accepting them. This warning can be silenced by setting `acceptTandC = TRUE`.


#### Using Taxon Version Keys (TVKs)

TVKs are 16-character strings of (usually, upper-case) letters and numbers. For example, "NBNSYS0000007111".

TVKs can be found using the function `getTVKquery`. This function will take the name of a species and attempt to match it to a TVK using the NBN's search feature. For example if we wanted the TVK for "badger" (*Meles meles*):

Search for taxon information using the query 'badger'


```r
dt <- getTVKQuery(query = "badger")
```

Display two columns of the data 'ptaxonVersionKey' and 'name'


```r
dt[,c('ptaxonVersionKey','name')]
#>   ptaxonVersionKey            name
#> 1 NHMSYS0000080191          Badger
#> 2 NBNSYS0000013055     Badger Flea
#> 3 NHMSYS0000545919   a Badger flea
#> 4 NHMSYS0000080191 Eurasian Badger
```

You will notice that "Badger" and "Eurasian Badger" have the same "ptaxonVersionKey" (the 'p' stands for preferred). This is because the terms are synonyms, both referring to *Meles meles* (which would also share the same ptaxonVersionKey). By using this TVK in the `getOccurrence` function it ensures that you get data for all synonyms. If you don't wish to include synonyms you can instead use the TVK given in the column "taxonVersionKey".

The following example will get all publicly available observations
of *Tropidia scita* from all datasets and for any date:

Get species TVK, using 'top = TRUE' returns only the best match


```r
dt <- getTVKQuery(query = "Tropidia scita",
                  top = TRUE)
```

Retrieve data from NBN using a TVK


```r
occ <- getOccurrences(tvks = dt$ptaxonVersionKey,
                      silent = TRUE,
                      acceptTandC = TRUE)
```

Print the first few rows and a selection of columns


```r
occ[1:10,c("pTaxonName", "startDate",
           "latitude", "longitude")]
#>        pTaxonName  startDate latitude longitude
#> 1  Tropidia scita 1985-01-01 51.38139 -1.211093
#> 2  Tropidia scita 2005-06-28 52.72542  1.621644
#> 3  Tropidia scita 2005-06-27 52.72740  1.615881
#> 4  Tropidia scita 2005-06-28 52.72098  1.619794
#> 5  Tropidia scita 2005-06-27 52.72663  1.611374
#> 6  Tropidia scita 1985-07-01 51.14454 -1.465307
#> 7  Tropidia scita 1987-07-09 53.23143 -4.076401
#> 8  Tropidia scita 1983-06-04 52.56806 -1.189979
#> 9  Tropidia scita 1976-07-20 52.56806 -1.189979
#> 10 Tropidia scita 1975-06-20 52.56806 -1.189979
```

TVKs can also be found on the NBN gateway at https://data.nbn.org.uk/Taxa. Navigating to a species reveals additional information including the "Taxon Version Key"

Occurrences for more than one species can be obtained by passing a list of TVKs. Such lists can be created in two ways:

List TVKs manually


```r
(tvks <- c("NHMSYS0000530420","NHMSYS0000530658"))
#> [1] "NHMSYS0000530420" "NHMSYS0000530658"
```

Retrieve a list of TVKs using the NBN search


```r
species <- getTVKQuery('grouse')
(tvks <- unique(species$ptaxonVersionKey))
#> [1] "NHMSYS0000530420" "NHMSYS0000530658"
```

#### Using species group


Data can be retrieved by specifying a species group. Species groups are taxonomic groups that are predefined by the NBN. A list of available groups can be found using the `listGroups` function.

View some of the groups available


```r
groups <- listGroups()
head(groups)
#>                        name              key
#> 1           acarine (Acari) NHMSYS0000629148
#> 2 acorn worm (Hemichordata) NHMSYS0000080031
#> 3                      alga NHMSYS0000080032
#> 4                 amphibian NHMSYS0000080033
#> 5                   annelid NHMSYS0000080034
#> 6                  archaean NHMSYS0000629143
```

Once you have decided which group you require the name is passed to getOccurrences in the following manner.

Retrieve data from NBN using a species group. Note this can take some time depending on the size of the species group


```r
occ <- getOccurrences(group = 'quillwort',
                      acceptTandC = TRUE)
```


### Filtering results


### By Year


The range of years for which you want to extract data can be specified using the `startYear` and/or `endYear` parameters:

Get data for a specified species, from a specified dataset over a specified time period


```r
head(getOccurrences(tvks = "NBNSYS0000007111",
               datasets = "SGB00001",
               startYear = 1990,
               endYear = 2006,
               silent = TRUE,
               acceptTandC = TRUE))
#>   observationID fullVersion datasetKey        surveyKey
#> 1     238422351       FALSE   SGB00001 ADS0000100000002
#> 2     238422399       FALSE   SGB00001 ADS0000100000002
#> 3     238422468       FALSE   SGB00001 ADS0000100000002
#> 4     238422577       FALSE   SGB00001 ADS0000100000002
#> 5     238423432       FALSE   SGB00001 DIPFOR0200000003
#> 6     238423523       FALSE   SGB00001 DIPFOR0200000003
#>                 sampleKey   observationKey featureID location resolution
#> 1 ADS0000100000002-SAMPLE ADS00001000005PJ    206735   SD5152        1km
#> 2 ADS0000100000002-SAMPLE ADS000010000043G    137826   SD4875        1km
#> 3 ADS0000100000002-SAMPLE ADS00001000006AH    371275   SD5151        1km
#> 4 ADS0000100000002-SAMPLE ADS00001000007AC    137824   SD4869        1km
#> 5 DIPFOR0200000003-SAMPLE DIPFOR0200000A9F    320779   TM4667        1km
#> 6 DIPFOR0200000003-SAMPLE DIPFOR02000001K5    230293   TM4974        1km
#>    taxonVersionKey pTaxonVersionKey     pTaxonName  pTaxonAuthority
#> 1 NBNSYS0000007111 NBNSYS0000007111 Tropidia scita (Harris, [1780])
#> 2 NBNSYS0000007111 NBNSYS0000007111 Tropidia scita (Harris, [1780])
#> 3 NBNSYS0000007111 NBNSYS0000007111 Tropidia scita (Harris, [1780])
#> 4 NBNSYS0000007111 NBNSYS0000007111 Tropidia scita (Harris, [1780])
#> 5 NBNSYS0000007111 NBNSYS0000007111 Tropidia scita (Harris, [1780])
#> 6 NBNSYS0000007111 NBNSYS0000007111 Tropidia scita (Harris, [1780])
#>    startDate    endDate sensitive absence publicAttribute dateTypekey
#> 1 1999-06-16 1999-06-16     FALSE   FALSE           FALSE          D
#> 2 1999-06-13 1999-06-13     FALSE   FALSE           FALSE          D
#> 3 1999-06-16 1999-06-16     FALSE   FALSE           FALSE          D
#> 4 1999-06-18 1999-06-18     FALSE   FALSE           FALSE          D
#> 5 2003-07-19 2003-07-19     FALSE   FALSE           FALSE          D
#> 6 2003-07-15 2003-07-15     FALSE   FALSE           FALSE          D
#>                     siteKey         siteName latitude longitude
#> 1                      <NA>             <NA> 53.96629 -2.740774
#> 2                      <NA>             <NA> 54.17269 -2.790416
#> 3 NBN-SITE-SGB00001-4295447 A West Lancaster 53.95730 -2.740614
#> 4                      <NA>             <NA> 54.11877 -2.789389
#> 5                      <NA>             <NA> 52.25042  1.609902
#> 6 NBN-SITE-SGB00001-4287099  Walberswick NNR 52.31187  1.658932
```


#### By Vice-county


If data from a specific vice-county is required then the `VC` argument can be used. This takes the name of a vicecounty, a list of which can be found using `listVCs`:

View some of the vice-counties available


```r
VCs <- listVCs()
head(VCs)
#>             name identifier featureID
#> 1       Anglesey GA00034452   2583220
#> 2 Angus (Forfar) GA00034490   2583258
#> 3       Ayrshire GA00034475   2583243
#> 4     Banffshire GA00034494   2583262
#> 5   Bedfordshire GA00034430   2583198
#> 6      Berkshire GA00034422   2583190
```

Once you have decided the vice-county you wish to search within you can use the getOccurrence function like this:


Request data for one species from East Suffolk


```r
occ <- getOccurrences(tvk = 'NBNSYS0000007111',
                      VC = 'East Suffolk',
                      silent = TRUE,
                      acceptTandC = TRUE)
```


#### Taxa list


It can sometimes be helpful to have a list of taxa that are recorded in a given dataset here is an example of how this can be done:

Get taxa list for the ladybird survey


```r
taxalist <- datasetTaxa('GA000312')
```

A range of details are provided


```r
names(taxalist)
#>  [1] "taxonVersionKey"      "name"                 "authority"
#>  [4] "languageKey"          "taxonOutputGroupKey"  "taxonOutputGroupName"
#>  [7] "commonName"           "gatewayRecordCount"   "href"
#> [10] "observationCount"     "datasetKey"           "ptaxonVersionKey"
```

Here are some of those species


```r
head(taxalist$commonName)
#> [1] "2-spot Ladybird"     "10-spot Ladybird"    "Eyed Ladybird"
#> [4] "Water Ladybird"      "Larch Ladybird"      "Cream-spot Ladybird"
```



<section id="citing">

## Citing

To cite `rnbn` in publications use:

<br>

> Stuart Ball & Tom August (2014). rnbn: Access NBN Data. R package version 1.0.3.
  https://cran.rstudio.com/package=rnbn

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rnbn](https://github.com/ropensci/rnbn/issues?state=open)

[Back to top](#top)
