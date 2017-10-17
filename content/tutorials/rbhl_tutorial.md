---
title: rbhl tutorial
package_version: 0.8.0
---



`rbhl` is an R interface to the Biodiversity Heritage Library.


### Installation


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
#> [1] "{\"Status\":\"ok\",\"ErrorMessage\":null,\"Result\":[{\"CreatorID\":189035,\"Name\":\"Dimmock, Anna Katherina\",\"Role\":null,\"Numeration\":\"\",\"Unit\":\"\",\"Title\":\"\",\"Location\":\"\",\"FullerForm\":\"\",\"Relationship\":null,\"TitleOfWork\":null,\"Dates\":\"\",\"CreatorUrl\":\"https://www.biodiversitylibrary.org/creator/189035\"},{\"CreatorID\":59023,\"Name\":\"Dimmock, G\",\"Role\":null,\"Numeration\":\"\",\"Unit\":\"\",\"Title\":\"\",\"Location\":\"\",\"FullerForm\":\"\",\"Relationship\":null,\"TitleOfWork\":null,\"Dates\":\"\",\"CreatorUrl\":\"https://www.biodiversitylibrary.org/creator/59023\"},{\"CreatorID\":189042,\"Name\":\"Dimmock, Geo \",\"Role\":null,\"Numeration\":\"\",\"Unit\":\"\",\"Title\":\"\",\"Location\":\"\",\"FullerForm\":\"\",\"Relationship\":null,\"TitleOfWork\":null,\"Dates\":\"\",\"CreatorUrl\":\"https://www.biodiversitylibrary.org/creator/189042\"},{\"CreatorID\":189021,\"Name\":\"Dimmock, George\",\"Role\":null,\"Numeration\":\"\",\"Unit\":\"\",\"Title\":\"\",\"Location\":\"\",\"FullerForm\":\"\",\"Relationship\":null,\"TitleOfWork\":null,\"Dates\":\"\",\"CreatorUrl\":\"https://www.biodiversitylibrary.org/creator/189021\"},{\"CreatorID\":1970,\"Name\":\"Dimmock, George,\",\"Role\":null,\"Numeration\":\"\",\"Unit\":\"\",\"Title\":\"\",\"Location\":\"\",\"FullerForm\":\"\",\"Relationship\":null,\"TitleOfWork\":null,\"Dates\":\"1852-\",\"CreatorUrl\":\"https://www.biodiversitylibrary.org/creator/1970\"},{\"CreatorID\":8126,\"Name\":\"Dimmock, George,\",\"Role\":null,\"Numeration\":\"\",\"Unit\":\"\",\"Title\":\"\",\"Location\":\"\",\"FullerForm\":\"\",\"Relationship\":null,\"TitleOfWork\":null,\"Dates\":\"1852-1930\",\"CreatorUrl\":\"https://www.biodiversitylibrary.org/creator/8126\"}]}"
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
#> # A tibble: 6 x 12
#>   CreatorID                    Name  Role Numeration  Unit Title Location
#> *     <int>                   <chr> <lgl>      <chr> <chr> <chr>    <chr>
#> 1    189035 Dimmock, Anna Katherina    NA                                
#> 2     59023              Dimmock, G    NA                                
#> 3    189042           Dimmock, Geo     NA                                
#> 4    189021         Dimmock, George    NA                                
#> 5      1970        Dimmock, George,    NA                                
#> 6      8126        Dimmock, George,    NA                                
#> # ... with 5 more variables: FullerForm <chr>, Relationship <lgl>,
#> #   TitleOfWork <lgl>, Dates <chr>, CreatorUrl <chr>
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
#> # A tibble: 1 x 23
#>   TitleID BibliographicLevel MaterialType
#> *   <int>              <chr>        <chr>
#> 1   32868                                
#> # ... with 20 more variables: FullTitle <chr>, ShortTitle <lgl>,
#> #   SortTitle <lgl>, PartNumber <chr>, PartName <chr>, CallNumber <lgl>,
#> #   Edition <chr>, PublisherPlace <chr>, PublisherName <chr>,
#> #   PublicationDate <chr>, PublicationFrequency <lgl>, Doi <lgl>,
#> #   TitleUrl <chr>, Authors <list>, Subjects <lgl>, Identifiers <lgl>,
#> #   Collections <lgl>, Variants <lgl>, Items <list>, Notes <lgl>
```

#### Search titles


```r
bhl_titlesearchsimple('husbandry')
#> # A tibble: 155 x 23
#>    TitleID BibliographicLevel       MaterialType
#>  *   <int>              <chr>              <chr>
#>  1   25997     Monograph/Item Published material
#>  2   44403     Monograph/Item Published material
#>  3   27062     Monograph/Item Published material
#>  4   41956     Monograph/Item Published material
#>  5   44462     Monograph/Item Published material
#>  6   28081     Monograph/Item Published material
#>  7   56265     Monograph/Item Published material
#>  8   58205     Monograph/Item Published material
#>  9   51946     Monograph/Item Published material
#> 10   55665     Monograph/Item Published material
#> # ... with 145 more rows, and 20 more variables: FullTitle <chr>,
#> #   ShortTitle <chr>, SortTitle <chr>, PartNumber <chr>, PartName <chr>,
#> #   CallNumber <lgl>, Edition <chr>, PublisherPlace <chr>,
#> #   PublisherName <chr>, PublicationDate <chr>,
#> #   PublicationFrequency <chr>, Doi <lgl>, TitleUrl <lgl>, Authors <lgl>,
#> #   Subjects <lgl>, Identifiers <lgl>, Collections <lgl>, Variants <lgl>,
#> #   Items <lgl>, Notes <lgl>
```

#### Get languages

This function gets a list of languages in which materials in BHL have been written.


```r
bhl_getlanguages()
#> # A tibble: 70 x 2
#>    LanguageCode         LanguageName
#>  *        <chr>                <chr>
#>  1          AFR            Afrikaans
#>  2          ARA               Arabic
#>  3          ARC              Aramaic
#>  4          MAP Austronesian (Other)
#>  5          BUL            Bulgarian
#>  6          BUR              Burmese
#>  7          CAR                Carib
#>  8          CAT              Catalan
#>  9          CEL       Celtic (Other)
#> 10          CHI              Chinese
#> # ... with 60 more rows
```

### Citing

To cite `rbhl` in publications use:

<br>

> Scott Chamberlain (2017). rbhl: Interface to the 'Biodiversity'
  'Heritage' Library. R package version 0.8.0.
  https://CRAN.R-project.org/package=rbhl

### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rbhl](https://github.com/ropensci/rbhl/issues?state=open)

[Back to top](#top)
