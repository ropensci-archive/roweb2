---
title: gutenbergr tutorial
package_version: 0.1.3
---



The gutenbergr package helps you download and process public domain works from the [Project Gutenberg](https://www.gutenberg.org/) collection. This includes both tools for downloading books (and stripping header/footer information), and a complete dataset of Project Gutenberg metadata that can be used to find words of interest. Includes:

* A function `gutenberg_download()` that downloads one or more works from Project Gutenberg by ID: e.g., `gutenberg_download(84)` downloads the text of Frankenstein.
* Metadata for all Project Gutenberg works as R datasets, so that they can be searched and filtered:
  * `gutenberg_metadata` contains information about each work, pairing Gutenberg ID with title, author, language, etc
  * `gutenberg_authors` contains information about each author, such as aliases and birth/death year
  * `gutenberg_subjects` contains pairings of works with Library of Congress subjects and topics


### Installation

Stable version from CRAN


```r
install.packages("gutenbergr")
```

Development version from GitHub


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropenscilabs/gutenbergr")
```


```r
library("gutenbergr")
```


### Project Gutenberg Metadata

This package contains metadata for all Project Gutenberg works as R datasets, so that you can search and filter for particular works before downloading.

The dataset `gutenberg_metadata` contains information about each work, pairing Gutenberg ID with title, author, language, etc:


```r
library(gutenbergr)
gutenberg_metadata
#> # A tibble: 51,997 x 8
#>    gutenberg_id
#>           <int>
#>  1            0
#>  2            1
#>  3            2
#>  4            3
#>  5            4
#>  6            5
#>  7            6
#>  8            7
#>  9            8
#> 10            9
#> # ... with 51,987 more rows, and 7 more variables: title <chr>,
#> #   author <chr>, gutenberg_author_id <int>, language <chr>,
#> #   gutenberg_bookshelf <chr>, rights <chr>, has_text <lgl>
```

For example, you could find the Gutenberg ID of Wuthering Heights by doing:


```r
library(dplyr)

gutenberg_metadata %>%
  filter(title == "Wuthering Heights")
#> # A tibble: 1 x 8
#>   gutenberg_id             title        author gutenberg_author_id
#>          <int>             <chr>         <chr>               <int>
#> 1          768 Wuthering Heights Brontë, Emily                 405
#> # ... with 4 more variables: language <chr>, gutenberg_bookshelf <chr>,
#> #   rights <chr>, has_text <lgl>
```

In many analyses, you may want to filter just for English works, avoid duplicates, and include only books that have text that can be downloaded. The `gutenberg_works()` function does this pre-filtering:


```r
gutenberg_works()
#> # A tibble: 40,737 x 8
#>    gutenberg_id
#>           <int>
#>  1            0
#>  2            1
#>  3            2
#>  4            3
#>  5            4
#>  6            5
#>  7            6
#>  8            7
#>  9            8
#> 10            9
#> # ... with 40,727 more rows, and 7 more variables: title <chr>,
#> #   author <chr>, gutenberg_author_id <int>, language <chr>,
#> #   gutenberg_bookshelf <chr>, rights <chr>, has_text <lgl>
```

It also allows you to perform filtering as an argument:


```r
gutenberg_works(author == "Austen, Jane")
#> # A tibble: 10 x 8
#>    gutenberg_id
#>           <int>
#>  1          105
#>  2          121
#>  3          141
#>  4          158
#>  5          161
#>  6          946
#>  7         1212
#>  8         1342
#>  9        31100
#> 10        42078
#> # ... with 7 more variables: title <chr>, author <chr>,
#> #   gutenberg_author_id <int>, language <chr>, gutenberg_bookshelf <chr>,
#> #   rights <chr>, has_text <lgl>

# or with a regular expression

library(stringr)
gutenberg_works(str_detect(author, "Austen"))
#> # A tibble: 13 x 8
#>    gutenberg_id
#>           <int>
#>  1          105
#>  2          121
#>  3          141
#>  4          158
#>  5          161
#>  6          946
#>  7         1212
#>  8         1342
#>  9        17797
#> 10        31100
#> 11        33513
#> 12        39897
#> 13        42078
#> # ... with 7 more variables: title <chr>, author <chr>,
#> #   gutenberg_author_id <int>, language <chr>, gutenberg_bookshelf <chr>,
#> #   rights <chr>, has_text <lgl>
```

The meta-data currently in the package was last updated on **05 May 2016**.

### Downloading books by ID

The function `gutenberg_download()` downloads one or more works from Project Gutenberg based on their ID. For example, we earlier saw that "Wuthering Heights" has ID 768 (see [the URL here](https://www.gutenberg.org/ebooks/768)), so `gutenberg_download(768)` downloads this text.


```r
wuthering_heights <- gutenberg_download(768)

wuthering_heights
#> # A tibble: 12,085 x 2
#>    gutenberg_id
#>           <int>
#>  1          768
#>  2          768
#>  3          768
#>  4          768
#>  5          768
#>  6          768
#>  7          768
#>  8          768
#>  9          768
#> 10          768
#> # ... with 12,075 more rows, and 1 more variables: text <chr>
```

Notice it is returned as a tbl_df (a type of data frame) including two variables: `gutenberg_id` (useful if multiple books are returned), and a character vector of the text, one row per line. Notice that the header and footer added by Project Gutenberg (visible [here](http://www.gutenberg.org/files/768/768.txt)) have been stripped away.

Provide a vector of IDs to download multiple books. For example, to download Jane Eyre (book [1260](https://www.gutenberg.org/ebooks/1260)) along with Wuthering Heights, do:


```r
books <- gutenberg_download(c(768, 1260), meta_fields = "title")

books
#> # A tibble: 32,744 x 3
#>    gutenberg_id
#>           <int>
#>  1          768
#>  2          768
#>  3          768
#>  4          768
#>  5          768
#>  6          768
#>  7          768
#>  8          768
#>  9          768
#> 10          768
#> # ... with 32,734 more rows, and 2 more variables: text <chr>, title <chr>
```

Notice that the `meta_fields` argument allows us to add one or more additional fields from the `gutenberg_metadata` to the downloaded text, such as title or author.


```r
books %>%
  count(title)
#> # A tibble: 2 x 2
#>                         title     n
#>                         <chr> <int>
#> 1 Jane Eyre: An Autobiography 20659
#> 2           Wuthering Heights 12085
```

### Other meta-datasets

You may want to select books based on information other than their title or author, such as their genre or topic. `gutenberg_subjects` contains pairings of works with Library of Congress subjects and topics. "lcc" means [Library of Congress Classification](https://www.loc.gov/catdir/cpso/lcco/), while "lcsh" means [Library of Congress subject headings](http://id.loc.gov/authorities/subjects.html):


```r
gutenberg_subjects
#> # A tibble: 140,173 x 3
#>    gutenberg_id subject_type
#>           <int>        <chr>
#>  1            1          lcc
#>  2            1         lcsh
#>  3            1         lcsh
#>  4            1          lcc
#>  5            2          lcc
#>  6            2         lcsh
#>  7            2         lcsh
#>  8            2          lcc
#>  9            3         lcsh
#> 10            3         lcsh
#> # ... with 140,163 more rows, and 1 more variables: subject <chr>
```

This is useful for extracting texts from a particular topic or genre, such as detective stories, or a particular character, such as Sherlock Holmes. The `gutenberg_id` column can then be used to download these texts or to link with other metadata.


```r
gutenberg_subjects %>%
  filter(subject == "Detective and mystery stories")
#> # A tibble: 521 x 3
#>    gutenberg_id subject_type                       subject
#>           <int>        <chr>                         <chr>
#>  1          170         lcsh Detective and mystery stories
#>  2          173         lcsh Detective and mystery stories
#>  3          244         lcsh Detective and mystery stories
#>  4          305         lcsh Detective and mystery stories
#>  5          330         lcsh Detective and mystery stories
#>  6          481         lcsh Detective and mystery stories
#>  7          547         lcsh Detective and mystery stories
#>  8          863         lcsh Detective and mystery stories
#>  9          905         lcsh Detective and mystery stories
#> 10         1155         lcsh Detective and mystery stories
#> # ... with 511 more rows

gutenberg_subjects %>%
  filter(grepl("Holmes, Sherlock", subject))
#> # A tibble: 47 x 3
#>    gutenberg_id subject_type
#>           <int>        <chr>
#>  1          108         lcsh
#>  2          221         lcsh
#>  3          244         lcsh
#>  4          834         lcsh
#>  5         1661         lcsh
#>  6         2097         lcsh
#>  7         2343         lcsh
#>  8         2344         lcsh
#>  9         2345         lcsh
#> 10         2346         lcsh
#> # ... with 37 more rows, and 1 more variables: subject <chr>
```

`gutenberg_authors` contains information about each author, such as aliases and birth/death year:


```r
gutenberg_authors
#> # A tibble: 16,236 x 7
#>    gutenberg_author_id                                     author
#>                  <int>                                      <chr>
#>  1                   1                              United States
#>  2                   3                           Lincoln, Abraham
#>  3                   4                             Henry, Patrick
#>  4                   5                                 Adam, Paul
#>  5                   7                             Carroll, Lewis
#>  6                   8 United States. Central Intelligence Agency
#>  7                   9                           Melville, Herman
#>  8                  10              Barrie, J. M. (James Matthew)
#>  9                  12                         Smith, Joseph, Jr.
#> 10                  14                             Madison, James
#> # ... with 16,226 more rows, and 5 more variables: alias <chr>,
#> #   birthdate <int>, deathdate <int>, wikipedia <chr>, aliases <chr>
```

### Analysis

What's next after retrieving a book's text? Well, having the book as a data frame is especially useful for working with the [tidytext](https://github.com/juliasilge/tidytext) package for text analysis.


```r
library(tidytext)

words <- books %>%
  unnest_tokens(word, text)

words
#> # A tibble: 305,532 x 3
#>    gutenberg_id             title      word
#>           <int>             <chr>     <chr>
#>  1          768 Wuthering Heights wuthering
#>  2          768 Wuthering Heights   heights
#>  3          768 Wuthering Heights   chapter
#>  4          768 Wuthering Heights         i
#>  5          768 Wuthering Heights      1801
#>  6          768 Wuthering Heights         i
#>  7          768 Wuthering Heights      have
#>  8          768 Wuthering Heights      just
#>  9          768 Wuthering Heights  returned
#> 10          768 Wuthering Heights      from
#> # ... with 305,522 more rows

word_counts <- words %>%
  anti_join(stop_words, by = "word") %>%
  count(title, word, sort = TRUE)

word_counts
#> # A tibble: 21,201 x 3
#>                          title       word     n
#>                          <chr>      <chr> <int>
#>  1           Wuthering Heights heathcliff   421
#>  2           Wuthering Heights     linton   346
#>  3 Jane Eyre: An Autobiography       jane   342
#>  4           Wuthering Heights  catherine   336
#>  5 Jane Eyre: An Autobiography  rochester   317
#>  6 Jane Eyre: An Autobiography        sir   315
#>  7 Jane Eyre: An Autobiography       miss   310
#>  8 Jane Eyre: An Autobiography       time   244
#>  9 Jane Eyre: An Autobiography        day   232
#> 10 Jane Eyre: An Autobiography     looked   221
#> # ... with 21,191 more rows
```



### Citing

> David Robinson (2017). gutenbergr: Download and Process Public Domain Works
  from Project Gutenberg. R package version 0.1.3.
  https://cran.rstudio.com/package=gutenbergr



### License and bugs

* License: [GPL-2](https://opensource.org/licenses/GPL-2.0)
* Report bugs at [our GitHub repo for gutenbergr](https://github.com/ropenscilabs/gutenbergr/issues?state=open)


[Back to top](#top)
