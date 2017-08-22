---
title: rbhl tutorial
package_version: 0.2.0
---



`rbhl` is an R interface to the Biodiversity Heritage Library.


<section id="installation">

## Installation


```r
install.packages("rbhl")
```

Or development version from GitHub


```r
install.packages("devtools")
devtools::install_github("ropensci/rbhl")
```


```r
library("rbhl")
```

<section id="usage">

## Usage

### Output formats

You can output various formats using the `as` parameter, setting to 'json', 'xml', 'list', or 'table'. Note that not all options are available in all functions due to varying returned data objects.

Raw output, in xml format


```r
bhl_authorsearch(name='dimmock', as='xml')
```

json format


```r
bhl_authorsearch(name='dimmock', as='json')
#> [1] "{\"Status\":\"ok\",\"ErrorMessage\":null,\"Result\":[{\"CreatorID\":189035,\"Name\":\"Dimmock, Anna Katherina\",\"Role\":null,\"Numeration\":\"\",\"Unit\":\"\",\"Title\":\"\",\"Location\":\"\",\"FullerForm\":\"\",\"Relationship\":null,\"TitleOfWork\":null,\"Dates\":\"\",\"CreatorUrl\":\"http://www.biodiversitylibrary.org/creator/189035\"},{\"CreatorID\":59023,\"Name\":\"Dimmock, G\",\"Role\":null,\"Numeration\":\"\",\"Unit\":\"\",\"Title\":\"\",\"Location\":\"\",\"FullerForm\":\"\",\"Relationship\":null,\"TitleOfWork\":null,\"Dates\":\"\",\"CreatorUrl\":\"http://www.biodiversitylibrary.org/creator/59023\"},{\"CreatorID\":189042,\"Name\":\"Dimmock, Geo \",\"Role\":null,\"Numeration\":\"\",\"Unit\":\"\",\"Title\":\"\",\"Location\":\"\",\"FullerForm\":\"\",\"Relationship\":null,\"TitleOfWork\":null,\"Dates\":\"\",\"CreatorUrl\":\"http://www.biodiversitylibrary.org/creator/189042\"},{\"CreatorID\":189021,\"Name\":\"Dimmock, George\",\"Role\":null,\"Numeration\":\"\",\"Unit\":\"\",\"Title\":\"\",\"Location\":\"\",\"FullerForm\":\"\",\"Relationship\":null,\"TitleOfWork\":null,\"Dates\":\"\",\"CreatorUrl\":\"http://www.biodiversitylibrary.org/creator/189021\"},{\"CreatorID\":1970,\"Name\":\"Dimmock, George,\",\"Role\":null,\"Numeration\":\"\",\"Unit\":\"\",\"Title\":\"\",\"Location\":\"\",\"FullerForm\":\"\",\"Relationship\":null,\"TitleOfWork\":null,\"Dates\":\"1852-\",\"CreatorUrl\":\"http://www.biodiversitylibrary.org/creator/1970\"},{\"CreatorID\":8126,\"Name\":\"Dimmock, George,\",\"Role\":null,\"Numeration\":\"\",\"Unit\":\"\",\"Title\":\"\",\"Location\":\"\",\"FullerForm\":\"\",\"Relationship\":null,\"TitleOfWork\":null,\"Dates\":\"1852-1930\",\"CreatorUrl\":\"http://www.biodiversitylibrary.org/creator/8126\"}]}"
```

Or get a list


```r
bhl_authorsearch(name='dimmock', as='list')
#> $Status
#> [1] "ok"
#>
#> $ErrorMessage
#> NULL
#>
#> $Result
#> $Result[[1]]
#> $Result[[1]]$CreatorID
#> [1] 189035
...
```

The default option in most functions is to parse to a data.frame


```r
bhl_authorsearch(name='dimmock')
#> <bhl data> [6, 12]
#>   CreatorID                    Name Role Numeration Unit Title Location
#> 1    189035 Dimmock, Anna Katherina   NA
#> 2     59023              Dimmock, G   NA
#> 3    189042           Dimmock, Geo    NA
#> 4    189021         Dimmock, George   NA
#> 5      1970        Dimmock, George,   NA
#> 6      8126        Dimmock, George,   NA
#> Variables not shown: FullerForm (chr), Relationship (lgl), TitleOfWork
#>      (lgl), Dates (chr), CreatorUrl (chr)
```

### Some examples of function calls

#### Get title metadata


```r
bhl_gettitlemetadata(1726, items = TRUE)
#> $Status
#> [1] "ok"
#>
#> $ErrorMessage
#> NULL
#>
#> $Result
#> $Result$TitleID
#> [1] 1726
#>
...
```

#### Book search


```r
bhl_booksearch(title='Selborne', lname='White', volume=2, edition='new', year=1825, collectionid=4, language='eng')
#> <bhl data> [1, 22]
#>   TitleID BibliographicLevel
#> 1   32868
#> Variables not shown: FullTitle (chr), ShortTitle (lgl), SortTitle (lgl),
#>      PartNumber (chr), PartName (chr), CallNumber (lgl), Edition (chr),
#>      PublisherPlace (chr), PublisherName (chr), PublicationDate (chr),
#>      PublicationFrequency (lgl), Doi (lgl), TitleUrl (chr), Authors
#>      (list), Subjects (lgl), Identifiers (lgl), Collections (lgl),
#>      Variants (lgl), Items (list), Notes (lgl)
```

#### Search titles


```r
bhl_titlesearchsimple('husbandry')
#> <bhl data> [152, 22]
#>    TitleID BibliographicLevel
#> 1    25997     Monograph/Item
#> 2    44403     Monograph/Item
#> 3    27062     Monograph/Item
#> 4    41956     Monograph/Item
#> 5    44462     Monograph/Item
#> 6    28081     Monograph/Item
#> 7    56265     Monograph/Item
#> 8    58205     Monograph/Item
#> 9    51946     Monograph/Item
#> 10   55665     Monograph/Item
#> ..     ...                ...
#> Variables not shown: FullTitle (chr), ShortTitle (chr), SortTitle (chr),
#>      PartNumber (chr), PartName (chr), CallNumber (lgl), Edition (chr),
#>      PublisherPlace (chr), PublisherName (chr), PublicationDate (chr),
#>      PublicationFrequency (chr), Doi (lgl), TitleUrl (lgl), Authors (lgl),
#>      Subjects (lgl), Identifiers (lgl), Collections (lgl), Variants (lgl),
#>      Items (lgl), Notes (lgl)
```

#### Get languages

This function gets a list of languages in which materials in BHL have been written.


```r
bhl_getlanguages()
#> <bhl data> [68, 2]
#>    LanguageCode   LanguageName
#> 1           AFR      Afrikaans
#> 2           ARA         Arabic
#> 3           ARC        Aramaic
#> 4           BUL      Bulgarian
#> 5           BUR        Burmese
#> 6           CAR          Carib
#> 7           CAT        Catalan
#> 8           CEL Celtic (Other)
#> 9           CHI        Chinese
#> 10          HRV       Croatian
#> ..          ...            ...
```

### Use case for BHL data

Here, we'll xxx, then plot the data using `ggplot2`


```r
res <- bhl_booksearch(title = 'Selborne', lname = 'White', volume = 2, edition = 'new', year = 1825, collectionid = 4, language = 'eng')
pages <- getpages(res$data$Items[[1]]$ItemID)
```

Remove `NULL`'s


```r
pages <- Filter(function(x) !is.null(x), pages)
```

Cleanup text


```r
pages_clean <- lapply(pages, function(x) gsub("\n", "", x))
```

Examine pages


```r
pages_clean[10:12]
#> [[1]]
#> [1] ""
#>
#> [[2]]
#> [1] "THE NATURAL HISTORY OF SELBORNE, BY THE LATE Rev. GILBERT WHITE, A. M. FELLOW OF ORIEL COLLEGE, OXFOKD,  TO WHICH ARE ADDED, THE NATURALIST'S CALENDAR, MISCELLANEOUS OBSERVATIONS,  AND POEMS. A NEW EDITION, WITH ENGRAVINGS,  IN TWO VOLUMES. VOL. IL LONDON: PRINTED FOR C. AND J. RIVINGTON ; J. AND A. ARCH; LONG-  MAN, nURST, REES, ORME, BROWN AND GREEN; HARDING,  TRIPHOOK AND LEPARD ; BALDWIN, CRADOCK AND JOY;  J. HATCHARD AND SON; S. BAGSTER; G. B. WIIITTAKER;  JAMES DUNCAN ; W. MASON ; SAUNDERS AND HODGSON ; AND  HURST, ROBINSON AND Co. 1825. "
#>
#> [[3]]
#> [1] "DEC - 4 1967 T. C. HANSARD, "
```

With this text data, you can do text mining of the content to answer cool questions you have.


<section id="citing">

## Citing

To cite `rbhl` in publications use:

<br>

> Scott Chamberlain (2015). rbhl: Interface to the 'Biodiversity' 'Heritage' Library. R package
  version 0.2.0. https://cran.rstudio.com/package=rbhl

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rbhl](https://github.com/ropensci/rbhl/issues?state=open)

[Back to top](#top)
