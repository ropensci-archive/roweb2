---
title: textreuse tutorial
package_version: 0.1.4
---



Tools for measuring similarity among documents and detecting passages which have been reused. Implements shingled n-gram, skip n-gram, and other tokenizers; similarity/dissimilarity functions; pairwise comparisons; minhash and locality sensitive hashing algorithms; and a version of the Smith-Waterman local alignment algorithm suitable for natural language.


### Installation

Stable `textreuse` version from CRAN


```r
install.packages("textreuse")
```

Or, the development version from Github


```r
devtools::install_github("ropensci/textreuse")
```


```r
library("textreuse")
```


## Usage

The textreuse package provides classes and functions to detect document similarity and text reuse in text corpora. This introductory vignette provides details on the `TextReuseTextDocument` and `TextReuseCorpus` classes, as well as functions for tokenizing, hashing, and measuring similarity. See the pairwise, minhash/LSH, or alignment vignettes for details on solving text similarity problems.


```r
vignette("textreuse-pairwise", package = "textreuse")
vignette("textreuse-minhash", package = "textreuse")
vignette("textreuse-alignment", package = "textreuse")
```

For these vignette we will use a small corpus of eight documents published by the [American Tract Society](https://en.wikipedia.org/wiki/American_Tract_Society) and available from the Internet Archive. The [full corpus](http://lincolnmullen.com/blog/corpus-of-american-tract-society-publications/) is also available to be downloaded if you wish to test the package.

### TextReuse classes

#### TextReuseTextDocument

The most basic class provided by this package is the `TextReuseTextDocument` class. This class contains the text of a document and its metadata. When the document is loaded, the text is also tokenized. (See the section on tokenizers below.) Those tokens are then hashed using a hash function. By default the hashes are retained and the tokens are discarded, since using only hashes results in a significant memory savings.

Here we load a file into a `TextReuseTextDocument` and tokenize it into shingled n-grams, adding an option to retain the tokens.


```r
library(textreuse)
file <- system.file("extdata/ats/remember00palm.txt",
                    package = "textreuse")
doc <- TextReuseTextDocument(file = file, meta = list("publisher" = "ATS"),
                             tokenizer = tokenize_ngrams, n = 5,
                             keep_tokens = TRUE)
doc
#> TextReuseTextDocument
#> file : /Library/Frameworks/R.framework/Versions/3.4/Resources/library/textreuse/extdata/ats/remember00palm.txt 
#> hash_func : hash_string 
#> id : remember00palm 
#> publisher : ATS 
#> tokenizer : tokenize_ngrams 
#> content : Remember 
#> By 
#> Rat Palmer. 
#> Boston: 
#> 
#> THE AMERICAN TRACT SOCI] 
#> 
#> Depositories, 28 Cornhill, Boston ; and 13 Biblb House, 
#> Astor Place, New York. 
#> Entered, according to Act of Congress, in the year 1865
```

We can see details of the document with accessor functions. These are derived from the S3 virtual class `TextDocument ` in the [NLP](https://cran.r-project.org/package=NLP) package. Notice that an ID has been assigned to the document based on the filename (without the extension). The name of the tokenizer and hash functions are also saved in the metadata.


```r
meta(doc)
#> $file
#> [1] "/Library/Frameworks/R.framework/Versions/3.4/Resources/library/textreuse/extdata/ats/remember00palm.txt"
#> 
#> $hash_func
#> [1] "hash_string"
#> 
#> $id
#> [1] "remember00palm"
#> 
#> $publisher
#> [1] "ATS"
#> 
#> $tokenizer
#> [1] "tokenize_ngrams"
meta(doc, "id")
#> [1] "remember00palm"
meta(doc, "date") <- 1865
head(tokens(doc))
#> [1] "remember by rat palmer boston"       
#> [2] "by rat palmer boston the"            
#> [3] "rat palmer boston the american"      
#> [4] "palmer boston the american tract"    
#> [5] "boston the american tract soci"      
#> [6] "the american tract soci depositories"
head(hashes(doc))
#> [1]   -96275747 -1721204321   707361410  -626087009  -532862870   141807655
wordcount(doc)
#> [1] 11399
```

The `tokens()` and `hashes()` function return the tokens and hashes associated with the document. The `meta()` function returns a named list of all the metadata fields. If that function is called with a specific ID, as in `meta(doc, "myfield")`, then the value for only that field is returned. You can also assign to the metadata as a whole or a specific field, as in the example above.

In addition the `content()` function provides the unprocessed text of the document.

The assumption is that is that you want to tokenize and hash the tokens from the start. If, however, you wish to do any of those steps yourself, you can load a document with `tokenizer = NULL`, then use `tokenize()` or `rehash()` to recompute the tokens and hashes.

Note that a `TextReuseTextDocument` can actually contain two kinds of hashes. The `hashes()` accessor gives you integer representations of each of the tokens in the document: if there are 100,000 tokens in the document, there will be 100,000 hashes. The `minhashes()` accessor gives you a signature that represents the document as a whole but not the specific tokens within it. See the minhash vignette for details: `vignette("textreuse-minhash")`.

#### TextReuseCorpus

The class `TextReuseCorpus` provides a list of `TextReuseTextDocuments`. It derives from the S3 virtual class `Corpus` in the [tm](https://cran.r-project.org/package=tm) package. It can be created from a directory of files (or by providing a vector of paths to files).


```r
dir <- system.file("extdata/ats", package = "textreuse")
corpus <- TextReuseCorpus(dir = dir, tokenizer = tokenize_ngrams, n = 5,
                          progress = FALSE)
corpus
#> TextReuseCorpus
#> Number of documents: 8 
#> hash_func : hash_string 
#> tokenizer : tokenize_ngrams
```

The names of the items in a `TextReuseCorpus` are the IDs of the documents. You can use these IDs to subset the corpus or to retrieve specific documents.


```r
names(corpus)
#> [1] "calltounconv00baxt"        "gospeltruth00whit"        
#> [3] "lifeofrevrichard00baxt"    "memoirjamesbrai00ricegoog"
#> [5] "practicalthought00nev"     "remember00palm"           
#> [7] "remembermeorholy00palm"    "thoughtsonpopery00nevi"
corpus[["remember00palm"]]
#> TextReuseTextDocument
#> file : /Library/Frameworks/R.framework/Versions/3.4/Resources/library/textreuse/extdata/ats/remember00palm.txt 
#> hash_func : hash_string 
#> id : remember00palm 
#> minhash_func : 
#> tokenizer : tokenize_ngrams 
#> content : Remember 
#> By 
#> Rat Palmer. 
#> Boston: 
#> 
#> THE AMERICAN TRACT SOCI] 
#> 
#> Depositories, 28 Cornhill, Boston ; and 13 Biblb House, 
#> Astor Place, New York. 
#> Entered, according to Act of Congress, in the year 1865
corpus[c("calltounconv00baxt", "lifeofrevrichard00baxt")]
#> TextReuseCorpus
#> Number of documents: 2 
#> hash_func : hash_string 
#> tokenizer : tokenize_ngrams
```

Accessor functions such as `meta()`, `tokens()`, `hashes()`, and `wordcount()` have methods that work on corpora.


```r
wordcount(corpus)
#>        calltounconv00baxt         gospeltruth00whit 
#>                    134616                     16593 
#>    lifeofrevrichard00baxt memoirjamesbrai00ricegoog 
#>                     44283                    131939 
#>     practicalthought00nev            remember00palm 
#>                    124544                     11399 
#>    remembermeorholy00palm    thoughtsonpopery00nevi 
#>                     11532                     64758
```

Note that when creating a corpus, very short or empty documents will be skipped with a warning. A document must have enough words to create at least two n-grams. For example, if five-grams are desired, then the document must have at least six words.

### Tokenizers

One of the steps that is performed when loading a `TextReuseTextDocument`, either individual or in a corpus, is tokenization. Tokenization breaks up a text into pieces, often overlapping. These pieces are the features which are compared when measuring document similarity.

The textreuse package provides a number of tokenizers.


```r
text <- "How many roads must a man walk down\nBefore you'll call him a man?"

tokenize_words(text)
#>  [1] "how"    "many"   "roads"  "must"   "a"      "man"    "walk"  
#>  [8] "down"   "before" "you'll" "call"   "him"    "a"      "man"
tokenize_sentences(text)
#> [1] "how many roads must a man walk down"
#> [2] "before you ll call him a man"
tokenize_ngrams(text, n = 3)
#>  [1] "how many roads"     "many roads must"    "roads must a"      
#>  [4] "must a man"         "a man walk"         "man walk down"     
#>  [7] "walk down before"   "down before you'll" "before you'll call"
#> [10] "you'll call him"    "call him a"         "him a man"
tokenize_skip_ngrams(text, n = 3, k = 2)
#>  [1] "how must walk"      "many a down"        "roads man before"  
#>  [4] "must walk you'll"   "a down call"        "man before him"    
#>  [7] "walk you'll a"      "down call man"      "how roads a"       
#> [10] "many must man"      "roads a walk"       "must man down"     
#> [13] "a walk before"      "man down you'll"    "walk before call"  
#> [16] "down you'll him"    "before call a"      "you'll him man"    
#> [19] "how many roads"     "many roads must"    "roads must a"      
#> [22] "must a man"         "a man walk"         "man walk down"     
#> [25] "walk down before"   "down before you'll" "before you'll call"
#> [28] "you'll call him"    "call him a"         "him a man"
```

You can write your own tokenizers or use tokenizers from other packages. They should accept a character vector as their first argument.

As an example, we will write a tokenizer function using the \link[stringr]{stringr} package which splits a text on new lines, perhaps useful for poetry. Notice that the function takes a single string and returns a character vector with one element for each line. (A more robust tokenizer might strip blank lines and punction, include an option for lowercasing the text, and check for the validity of arguments.)


```r
poem <- "Roses are red\nViolets are blue\nI like using R\nAnd you should too"
cat(poem)
#> Roses are red
#> Violets are blue
#> I like using R
#> And you should too

tokenize_lines <- function(string) {
  stringr::str_split(string, "\n+")[[1]]
}

tokenize_lines(poem)
#> [1] "Roses are red"      "Violets are blue"   "I like using R"    
#> [4] "And you should too"
```

### Hash functions

This package provides one function to hash tokens to integers, `hash_string()`.

```r
hash_string(tokenize_words(text))
#>  [1]   -78131211  -909288800  -647481819  -909500956 -1640531430
#>  [6]   -78235283  -904724921  -889252160   317438038   937035765
#> [11]  -890718890   -78132909 -1640531430   -78235283
```

You can write your own hash functions, or use those provided by the [digest](https://cran.r-project.org/package=digest) package.

## Comparison functions

This package provides a number of comparison functions for measuring similarity. These functions take either a set (in which each token is counted one time) or a bag (in which each token is counted as many times as it appears) and compares it to another set or bag.


```r
a <- tokenize_words(paste("How does it feel, how does it feel?",
                          "To be without a home",
                          "Like a complete unknown, like a rolling stone"))
b <- tokenize_words(paste("How does it feel, how does it feel?",
                          "To be on your own, with no direction home",
                          "A complete unknown, like a rolling stone"))

jaccard_similarity(a, b)
#> [1] 0.65
jaccard_dissimilarity(a, b)
#> [1] 0.35
jaccard_bag_similarity(a, b)
#> [1] 0.4
ratio_of_matches(a, b)
#> [1] 0.75
```

See the documentation for `?similarity-functions` for details on what is measured with these functions.

You can write your own similarity functions, which should accept two sets or bags, `a` and `b`, should work on both character and numeric vectors, since they are used with either tokens or hashes of tokens, and should return a single numeric score for the comparison. You will need to implement a method for the `TextReuseTextDocument` class.



### Citing

To cite `textreuse` in publications use:

<br>

>  Lincoln Mullen (2016). textreuse: Detect Text Reuse and Document
  Similarity. R package version 0.1.4.
  https://CRAN.R-project.org/package=textreuse


### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for textreuse](https://github.com/ropensci/textreuse/issues?state=open)

[Back to top](#top)
