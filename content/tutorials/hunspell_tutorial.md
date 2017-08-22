---
title: hunspell tutorial
package_version: 1.4.3
---



A spell checker and morphological analyzer library designed for
languages with rich morphology and complex word compounding or character
encoding. The package can check and analyze individual words as well as
search for incorrect words within a text, latex or manual document.


See also these blog posts about `hunspell`:

- [Hunspell: Spell Checker and Text Parser for R](https://www.opencpu.org/posts/hunspell-release/)
- [Stemming and Spell Checking in R](https://www.opencpu.org/posts/hunspell-1-2/)

<section id="installation">

## Installation


```r
install.packages("hunspell")
```

Or development version from GitHub


```r
install.packages("devtools")
devtools::install_github("ropensci/hunspell")
```


```r
library("hunspell")
```

<section id="usage">

## Usage

### Check individual words


```r
words <- c("beer", "wiskey", "wine")
correct <- hunspell_check(words)
print(correct)
#> [1]  TRUE FALSE  TRUE
```

### Find suggestions for incorrect words


```r
hunspell_suggest(words[!correct])
#> [[1]]
#> [1] "whiskey"  "whiskery" "whisker"  "wiseacre"
```

### Extract incorrect from a piece of text


```r
bad <- hunspell("spell checkers are not neccessairy for langauge ninja's")
print(bad[[1]])
#> [1] "neccessairy" "langauge"
hunspell_suggest(bad[[1]])
#> [[1]]
#> [1] "necessary"    "necessarily"  "necessaries"  "recessionary"
#> [5] "accessory"    "incarcerate"
#>
#> [[2]]
#> [1] "language"  "Langeland" "Lagrange"  "Lange"     "gaugeable" "linkage"
#> [7] "Langland"
```

### Stemming


```r
words <- c("love", "loving", "lovingly", "loved", "lover", "lovely", "love")
hunspell_stem(words)
#> [[1]]
#> [1] "love"
#>
#> [[2]]
#> [1] "loving" "love"
#>
#> [[3]]
#> [1] "lovingly"
#>
#> [[4]]
#> [1] "loved" "love"
#>
#> [[5]]
#> [1] "lover" "love"
#>
#> [[6]]
#> [1] "lovely" "love"
#>
#> [[7]]
#> [1] "love"
hunspell_analyze(words)
#> [[1]]
#> [1] " st:love"
#>
#> [[2]]
#> [1] " st:loving"    " st:love fl:G"
#>
#> [[3]]
#> [1] " st:lovingly"
#>
#> [[4]]
#> [1] " st:loved"     " st:love fl:D"
#>
#> [[5]]
#> [1] " st:lover"     " st:love fl:R"
#>
#> [[6]]
#> [1] " st:lovely"    " st:love fl:Y"
#>
#> [[7]]
#> [1] " st:love"
```

<section id="citing">

## Citing

To cite `hunspell` in publications use:

<br>

> Jeroen Ooms (2016). hunspell: Morphological Analysis and Spell Checker
  for R. R package version 1.4.3. https://cran.rstudio.com/package=hunspell

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for hunspell](https://github.com/ropensci/hunspell/issues?state=open)

[Back to top](#top)
