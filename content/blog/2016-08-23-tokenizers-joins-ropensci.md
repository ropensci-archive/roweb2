---
slug: tokenizers-joins-ropensci
title: New package tokenizers joins rOpenSci
date: '2016-08-23'
author:
  - Lincoln Mullen
tags:
  - R
  - natural language
  - text analysis
  - packages
---

The R package ecosystem for natural language processing has been flourishing in recent days. R packages for text analysis have usually been based on the classes provided by the [NLP](https://cran.r-project.org/package=NLP/) or [tm](https://cran.r-project.org/package=tm/) packages. Many of them depend on Java. But recently there have been a number of new packages for text analysis in R, most notably [text2vec](https://github.com/dselivanov/text2vec), [quanteda](https://github.com/kbenoit/quanteda), and [tidytext](https://github.com/juliasilge/tidytext). These packages are built on top of [Rcpp](http://www.rcpp.org/) instead of [rJava](https://cran.r-project.org/package=rJava/), which makes them much more reliable and portable. And instead of the classes based on NLP, which I have never thought to be particularly idiomatic for R, they use standard R data structures. The text2vec and quanteda packages both rely on the sparse matrices provided by the rock solid [Matrix](https://cran.r-project.org/package=Matrix/) package. The tidytext package is idiosyncratic (in the best possible way!) for doing all of its work in data frames rather than matrices, but a data frame is about as standard as you can get. For a long time when I would recommend R to people, I had to add the caveat that they should use Python if they were primarily interested in text analysis. But now I no longer feel the need to hedge.

Still there is a lot of duplicated effort between these packages on the one hand and a lot of incompatibilities between the packages on the other. The R ecosystem for text analysis is not exactly coherent or consistent at the moment.

My small contribution to the new text analysis ecosystem is the tokenizers package, which was recently accepted into rOpenSci after a careful [peer review](https://github.com/ropensci/software-review/issues/33) by [Kevin Ushey](https://kevinushey.github.io/). A new version of the package is [on CRAN](https://cran.r-project.org/package=tokenizers/). (Also check out the
Jeroen Ooms's [hunspell](https://github.com/ropensci/hunspell) package, which is a part of rOpensci.)

One of the basic tasks in any NLP pipeline is turning texts (which humans can read) into tokens (which machines can compute with). For example, you might break a text into words or into [n-grams](https://en.wikipedia.org/wiki/N-gram). Here is an example using the [former slave interviews](https://memory.loc.gov/ammem/snhtml/snhome.html) from the Great Depression era Federal Writers' Project. (A data package with those interviews is in development [here](https://github.com/lmullen/WPAnarratives)).

    # devtools::install_github("lmullen/WPAnarratives")
    # install.packages("tokenizers")
    library(WPAnarratives)
    library(tokenizers)

    text <- head(wpa_narratives$text, 5)
    class(text)

    ## [1] "character"

    words <- tokenize_words(text, lowercase = TRUE)
    str(words)

    ## List of 5
    ##  $ : chr [1:1141] "_he" "loved" "young" "marster" ...
    ##  $ : chr [1:1034] "_old" "joe" "can" "keep" ...
    ##  $ : chr [1:824] "_jesus" "has" "my" "chillun" ...
    ##  $ : chr [1:779] "charity" "anderson" "who" "believes" ...
    ##  $ : chr [1:350] "dat" "was" "one" "time" ...

    ngrams <- tokenize_ngrams(text, n_min = 3, n = 5)
    str(ngrams)

    ## List of 5
    ##  $ : chr [1:3414] "_he loved young" "_he loved young marster" "_he loved young marster john_" "loved young marster" ...
    ##  $ : chr [1:3093] "_old joe can" "_old joe can keep" "_old joe can keep his" "joe can keep" ...
    ##  $ : chr [1:2463] "_jesus has my" "_jesus has my chillun" "_jesus has my chillun counted_" "has my chillun" ...
    ##  $ : chr [1:2328] "charity anderson who" "charity anderson who believes" "charity anderson who believes she" "anderson who believes" ...
    ##  $ : chr [1:1041] "dat was one" "dat was one time" "dat was one time when" "was one time" ...

Practically all text analysis packages provide their own functions for tokenizing text, so why do R users need this package?

First, these tokenizers are reasonably fast. The basic string operations are handled by the [stringi](https://cran.r-project.org/package=stringi/) package, which is quick while also doing the correct thing across encodings and locales. And [Dmitriy Selivanov](https://dsnotes.com/) (author of the text2vec package) has written the n-gram and skip n-gram tokenizers in C++ so that those are fast too. It is probably possible to write tokenizers with better performance, but these are fast enough for even large scale text mining efforts.

The second and more important reason is that these tokenizers are consistent. They all take either a character vector of any length, or a list where each element is a character vector of length one. The idea is that each element of the input comprises a text. Then each function returns a list with the same length as the input vector, where each element in the list contains the tokens generated by the function. If the input character vector or list is named, then the names are preserved, so that the names can serve as identifiers.

And third, the tokenizers are reasonably comprehensive, including functions for characters, lines, words, word stems, sentences, paragraphs, n-grams, skip n-grams, and regular expressions.

My hope is that developers of other text analysis packages for R will rely on this package to provide tokenizers. (So far only tidytext has taken me up on that, but I also have to re-write my own [textreuse](https://github.com/ropensci/textreuse) package now.) But even if natural language packages do not take the package as a formal dependency, most packages let you pass in your own tokenizing functions. So users can reap the benefits of a consistent set of tokenizers by using the functions in this package. The success of the "[tidyverse](https://twitter.com/hadleywickham/status/751805589425000450)" has shown the power of buying into a convention for the structure of data and the inputs and outputs of functions. My hope is that the tokenizers package is a step in that direction for text analysis in R.
