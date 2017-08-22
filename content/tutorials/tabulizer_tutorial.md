---
title: tabulizer tutorial
package_version: 0.1.22
---



**tabulizer** provides R bindings to the [Tabula java library](https://github.com/tabulapdf/tabula-java/), which can be used to computationaly extract tables from PDF documents.


<section id="installation">

## Installation

It's not yet on CRAN

Development version from GitHub


```r
if(!require("ghit")){
    install.packages("ghit")
}
# on 64-bit Windows
ghit::install_github(c("ropenscilabs/tabulizerjars", "ropenscilabs/tabulizer"), INSTALL_opts = "--no-multiarch")
# elsewhere
ghit::install_github(c("ropenscilabs/tabulizerjars", "ropenscilabs/tabulizer"))
```

See [the source](https://github.com/ropenscilabs/tabulizer#installation) for more details on installation.


```r
library("tabulizer")
```

<section id="usage">

## Usage

The main function `extract_tables()` mimics the command-line behavior of the Tabula, by extracting all tables from a PDF file and, by default, returns those tables as a list of character matrices in R.


```r
library("tabulizer")
f <- system.file("examples", "data.pdf", package = "tabulizer")

# extract table from first page of example PDF
tab <- extract_tables(f, pages = 1)
head(tab[[1]])
#>      [,1]   [,2]  [,3]    [,4]  [,5]   [,6]    [,7]    [,8] [,9] [,10]
#> [1,] "mpg"  "cyl" "disp"  "hp"  "drat" "wt"    "qsec"  "vs" "am" "gear"
#> [2,] "21.0" "6"   "160.0" "110" "3.90" "2.620" "16.46" "0"  "1"  "4"
#> [3,] "21.0" "6"   "160.0" "110" "3.90" "2.875" "17.02" "0"  "1"  "4"
#> [4,] "22.8" "4"   "108.0" "93"  "3.85" "2.320" "18.61" "1"  "1"  "4"
#> [5,] "21.4" "6"   "258.0" "110" "3.08" "3.215" "19.44" "1"  "0"  "3"
#> [6,] "18.7" "8"   "360.0" "175" "3.15" "3.440" "17.02" "0"  "0"  "3"
```

The `pages` argument allows you to select which pages to attempt to extract tables from. By default, Tabula (and thus tabulizer) checks every page for tables using a detection algorithm and returns all of them. `pages` can be an integer vector of any length; pages are indexed from 1.

It is possible to specify a remote file, which will be copied to R's temporary directory before processing:


```r
f2 <- "https://github.com/leeper/tabulizer/raw/master/inst/examples/data.pdf"
extract_tables(f2, pages = 2)
#> [[1]]
#>      [,1]            [,2]           [,3]            [,4]
#> [1,] "Sepal.Length " "Sepal.Width " "Petal.Length " "Petal.Width "
#> [2,] "5.1 "          "3.5 "         "1.4 "          "0.2 "
#> [3,] "4.9 "          "3.0 "         "1.4 "          "0.2 "
#> [4,] "4.7 "          "3.2 "         "1.3 "          "0.2 "
#> [5,] "4.6 "          "3.1 "         "1.5 "          "0.2 "
#> [6,] "5.0 "          "3.6 "         "1.4 "          "0.2 "
#> [7,] "5.4 "          "3.9 "         "1.7 "          "0.4 "
#>      [,5]
#> [1,] "Species"
#> [2,] "setosa"
#> [3,] "setosa"
#> [4,] "setosa"
#> [5,] "setosa"
#> [6,] "setosa"
#> [7,] "setosa"
#>
#> [[2]]
#>      [,1]   [,2]            [,3]           [,4]            [,5]
#> [1,] ""     "Sepal.Length " "Sepal.Width " "Petal.Length " "Petal.Width "
#> [2,] "145 " "6.7 "          "3.3 "         "5.7 "          "2.5 "
#> [3,] "146 " "6.7 "          "3.0 "         "5.2 "          "2.3 "
#> [4,] "147 " "6.3 "          "2.5 "         "5.0 "          "1.9 "
#> [5,] "148 " "6.5 "          "3.0 "         "5.2 "          "2.0 "
#> [6,] "149 " "6.2 "          "3.4 "         "5.4 "          "2.3 "
#> [7,] "150 " "5.9 "          "3.0 "         "5.1 "          "1.8 "
#>      [,6]
#> [1,] "Species"
#> [2,] "virginica"
#> [3,] "virginica"
#> [4,] "virginica"
#> [5,] "virginica"
#> [6,] "virginica"
#> [7,] "virginica"
```

### Modifying the Return Value

By default, `extract_tables()` returns a list of character matrices. This is because many tables might be malformed or irregular and thus not be easily coerced to an R data.frame. This can easily be changed by specifying the `method` argument:


```r
# attempt to coerce tables to data.frames
extract_tables(f, pages = 2, method = "data.frame")
#> [[1]]
#>   Sepal.Length Sepal.Width Petal.Length Petal.Width Species
#> 1          5.1         3.5          1.4         0.2  setosa
#> 2          4.9         3.0          1.4         0.2  setosa
#> 3          4.7         3.2          1.3         0.2  setosa
#> 4          4.6         3.1          1.5         0.2  setosa
#> 5          5.0         3.6          1.4         0.2  setosa
#> 6          5.4         3.9          1.7         0.4  setosa
#>
#> [[2]]
#>     X Sepal.Length Sepal.Width Petal.Length Petal.Width   Species
#> 1 145          6.7         3.3          5.7         2.5 virginica
#> 2 146          6.7         3.0          5.2         2.3 virginica
#> 3 147          6.3         2.5          5.0         1.9 virginica
#> 4 148          6.5         3.0          5.2         2.0 virginica
#> 5 149          6.2         3.4          5.4         2.3 virginica
#> 6 150          5.9         3.0          5.1         1.8 virginica
```

Tabula itself implements three "writer" methods that write extracted tables to disk as CSV, TSV, or JSON files. These can be specified by `method = "csv"`, `method = "tsv"`, and `method = "json"`, respectively. For CSV and TSV, one file is written to disk for each table, in the same directory as the original file (or the temporary directory if the file is a remote PDF). For JSON, one file is written containing information about all tables. For these methods, `extract_tables()` returns a path to the directory containing the output files.


```r
# extract tables to CSVs
extract_tables(f, method = "csv")
#> [1] "/Library/Frameworks/R.framework/Versions/3.3/Resources/library/tabulizer/examples"
```

If none of the standard methods works well, you can specify `method = "asis"` to return an rJava "jobjRef" object, which is a pointer to a Java ArrayList of Tabula Table objects. Working with that object might be quite awkward as it requires knowledge of Java and Tabula's internals, but might be useful to advanced users for debugging purposes.

### Extracting Areas

By default, tabulizer uses Tabula's table detection algorithms to automatically identify tables within each page of a PDF. This automatic detection can be toggled off by setting `guess = FALSE` and specifying an "area" within each PDF page to extract the table from. Here is a comparison of the default settings, versus extracting from two alternative areas within a page:


```r
str(extract_tables(f, pages = 2, guess = TRUE, method = "data.frame"))
#> List of 2
#>  $ :'data.frame':	6 obs. of  5 variables:
#>   ..$ Sepal.Length: num [1:6] 5.1 4.9 4.7 4.6 5 5.4
#>   ..$ Sepal.Width : num [1:6] 3.5 3 3.2 3.1 3.6 3.9
#>   ..$ Petal.Length: num [1:6] 1.4 1.4 1.3 1.5 1.4 1.7
#>   ..$ Petal.Width : num [1:6] 0.2 0.2 0.2 0.2 0.2 0.4
#>   ..$ Species     : chr [1:6] "setosa" "setosa" "setosa" "setosa" ...
#>  $ :'data.frame':	6 obs. of  6 variables:
#>   ..$ X           : num [1:6] 145 146 147 148 149 150
#>   ..$ Sepal.Length: num [1:6] 6.7 6.7 6.3 6.5 6.2 5.9
#>   ..$ Sepal.Width : num [1:6] 3.3 3 2.5 3 3.4 3
#>   ..$ Petal.Length: num [1:6] 5.7 5.2 5 5.2 5.4 5.1
#>   ..$ Petal.Width : num [1:6] 2.5 2.3 1.9 2 2.3 1.8
#>   ..$ Species     : chr [1:6] "virginica" "virginica" "virginica" "virginica" ...
str(extract_tables(f, pages = 2, area = list(c(126, 149, 212, 462)), guess = FALSE, method = "data.frame"))
#> List of 1
#>  $ :'data.frame':	6 obs. of  5 variables:
#>   ..$ Sepal.Length: num [1:6] 5.1 4.9 4.7 4.6 5 5.4
#>   ..$ Sepal.Width : num [1:6] 3.5 3 3.2 3.1 3.6 3.9
#>   ..$ Petal.Length: num [1:6] 1.4 1.4 1.3 1.5 1.4 1.7
#>   ..$ Petal.Width : num [1:6] 0.2 0.2 0.2 0.2 0.2 0.4
#>   ..$ Species     : chr [1:6] "setosa" "setosa" "setosa" "setosa" ...
str(extract_tables(f, pages = 2, area = list(c(126, 284, 174, 417)), guess = FALSE, method = "data.frame"))
#> List of 1
#>  $ :'data.frame':	3 obs. of  2 variables:
#>   ..$ Petal.Length: num [1:3] 1.4 1.4 1.3
#>   ..$ Petal.Width : num [1:3] 0.2 0.2 0.2
```

The `area` argument should be a list either of length 1 (to use the same area for each specified page) or equal to the number of pages specified. This also means that you can extract multiple areas from one page, but specifying the page twice and indicating the two areas separately:


```r
a2 <- list(c(126, 149, 212, 462), c(126, 284, 174, 417))
str(extract_tables(f, pages = c(2,2), area = a2, guess = FALSE, method = "data.frame"))
#> List of 2
#>  $ :'data.frame':	6 obs. of  5 variables:
#>   ..$ Sepal.Length: num [1:6] 5.1 4.9 4.7 4.6 5 5.4
#>   ..$ Sepal.Width : num [1:6] 3.5 3 3.2 3.1 3.6 3.9
#>   ..$ Petal.Length: num [1:6] 1.4 1.4 1.3 1.5 1.4 1.7
#>   ..$ Petal.Width : num [1:6] 0.2 0.2 0.2 0.2 0.2 0.4
#>   ..$ Species     : chr [1:6] "setosa" "setosa" "setosa" "setosa" ...
#>  $ :'data.frame':	3 obs. of  2 variables:
#>   ..$ Petal.Length: num [1:3] 1.4 1.4 1.3
#>   ..$ Petal.Width : num [1:3] 0.2 0.2 0.2
```

### Interactive Table Extraction

In addition to the programmatic extraction offered by `extract_tables()`, it is also possible to work interactively with PDFs via the `extract_areas()` function. This function triggers a process by which each (specified) page of a PDF is converted to a PNG image file and then loaded as an R graphic. From there, you can use your mouse to specify upper-left and lower-right bounds of an area on each page. Pages are cycled through automatically and, after selecting areas for each page, those areas are extracted auto-magically (and the return value is the same as for `extract_tables()`). Here's a shot of it in action:

[![extract_areas()](http://i.imgur.com/USTyQl7.gif)](http://i.imgur.com/USTyQl7.gif)

`locate_areas()` handles the area identification process without performing the extraction, which may be useful as a debugger, or simply to define areas to be used in a programmatic extraction.

### Miscellaneous Functionality

Tabula is built on top of the [Java PDFBox library](https://pdfbox.apache.org/)), which provides low-level functionality for working with PDFs. A few of these tools are exposed through tabulizer, as they might be useful for debugging or generally for working with PDFs. These functions include:


 - `extract_text()` converts the text of an entire file or specified pages into an R character vector.
 - `split_pdf()` and `merge_pdfs()` split and merge PDF documents, respectively.
 - `extract_metadata()` extracts PDF metadata as a list.
 - `get_n_pages()` determines the number of pages in a document.
 - `get_page_dims()` determines the width and height of each page in pt (the unit used by `area` and `columns` arguments).
 - `make_thumbnails()` converts specified pages of a PDF file to image files.





<section id="citing">

## Citing

> Thomas J. Leeper (2016). tabulizer: Bindings for Tabula PDF Table Extractor Library. R package
  version 0.1.21. https://github.com/ropenscilabs/tabulizer


<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our GitHub repo for tabulizer](https://github.com/ropenscilabs/tabulizer/issues?state=open)


[Back to top](#top)
