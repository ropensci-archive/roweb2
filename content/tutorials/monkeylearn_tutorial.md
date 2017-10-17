---
title: monkeylearn tutorial
package_version: 0.1.3
---



This package is an interface to the [MonkeyLearn API](http://docs.monkeylearn.com/article/api-reference/). MonkeyLearn is a Machine Learning platform on the cloud that allows software companies and developers to easily extract actionable data from text.

The goal of the package is not to support machine learning algorithms development with R or the API, but only to *reap the benefits of the existing modules on Monkeylearn*. Therefore, there are only two functions, one for using *extractors*, and one for using *classifiers*. The difference between extractors and classifiers is that extractors output information about words, whereas classifiers output information about each text as a whole. Named entity recognition is an extraction task, whereas assigning a topic to a text is a classification task.

To get an API key for MonkeyLearn, register at http://monkeylearn.com/. Note that MonkeyLearn supports registration through GitHub, which makes the registration process really easy. The free API key provides up to 100,000 requests a month For ease of use, save your API key as an environment variable as described at http://stat545.com/bit003_api-key-env-var.html.

Both functions of the package will conveniently look for your API key using `Sys.getenv("MONKEYLEARN_KEY")` so if your API key is an environment variable called "MONKEYLEARN_KEY" you don't need to input it manually.


### Installation

CRAN version


```r
install.packages("monkeylearn")
```

Development version from GitHub


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropenscilabs/monkeylearn")
```


```r
library("monkeylearn")
```


### Extract

#### A first example


```r
text <- "In the 19th century, the major European powers had gone to great lengths to maintain a balance of power throughout Europe, resulting in the existence of a complex network of political and military alliances throughout the continent by 1900.[7] These had started in 1815, with the Holy Alliance between Prussia, Russia, and Austria. Then, in October 1873, German Chancellor Otto von Bismarck negotiated the League of the Three Emperors (German: Dreikaiserbund) between the monarchs of Austria-Hungary, Russia and Germany."
output <- monkeylearn_extract(request = text,
                              extractor_id = "ex_isnnZRbS")
output
```

```
#>   count      tag            entity                         text_md5
#> 1     1 LOCATION            Europe 95132b831aa7a4ba1a666b93490b3c9c
#> 2     1 LOCATION           Prussia 95132b831aa7a4ba1a666b93490b3c9c
#> 3     1 LOCATION   Austria-Hungary 95132b831aa7a4ba1a666b93490b3c9c
#> 4     1 LOCATION           Austria 95132b831aa7a4ba1a666b93490b3c9c
#> 5     1 LOCATION           Germany 95132b831aa7a4ba1a666b93490b3c9c
#> 6     1   PERSON Otto von Bismarck 95132b831aa7a4ba1a666b93490b3c9c
#> 7     2 LOCATION            Russia 95132b831aa7a4ba1a666b93490b3c9c
```

```r
attr(output, "headers")
```

```
#> # A tibble: 1 x 11
#>         server                          date     content.type
#>         <fctr>                        <fctr>           <fctr>
#> 1 nginx/1.11.5 Tue, 17 Oct 2017 16:38:10 GMT application/json
#> # ... with 8 more variables: transfer.encoding <fctr>, connection <fctr>,
#> #   x.query.limit.limit <fctr>, x.query.limit.remaining <fctr>,
#> #   x.query.limit.request.queries <fctr>, allow <fctr>,
#> #   content.encoding <fctr>, text_md5 <list>
```

### Parameters

If the documentation of the extractor you use states it has parameters, you can pass them as a named list, see below.


```r
text <- "A panel of Goldman Sachs employees spent a recent Tuesday night at the
Columbia University faculty club trying to convince a packed room of potential
recruits that Wall Street, not Silicon Valley, was the place to be for computer
scientists.\n\n The Goldman employees knew they had an uphill battle. They were
 fighting against perceptions of Wall Street as boring and regulation-bound and
 Silicon Valley as the promised land of flip-flops, beanbag chairs and million-dollar
  stock options.\n\n Their argument to the room of technologically inclined students
  was that Wall Street was where they could find far more challenging, diverse and,
   yes, lucrative jobs working on some of the worlds most difficult technical problems.\n\n
   Whereas in other opportunities you might be considering, it is working one type of data
   or one type of application, we deal in hundreds of products in hundreds of markets, with
    thousands or tens of thousands of clients, every day, millions of times of day worldwide,
     Afsheen Afshar, a managing director at Goldman Sachs, told the students."
output <- monkeylearn_extract(text,
                              extractor_id = "ex_y7BPYzNG",
                              params = list(max_keywords = 3))
output
```

```
#>   count relevance positions_in_text                      keyword
#> 1     3     0.978     164, 341, 568                  Wall Street
#> 2     2     0.652          181, 389               Silicon Valley
#> 3     0     0.543                   million-dollar stock options
#>                           text_md5
#> 1 c52e4d898bf4009ba347820c86275973
#> 2 c52e4d898bf4009ba347820c86275973
#> 3 c52e4d898bf4009ba347820c86275973
```

```r
output2 <- monkeylearn_extract(text,
                              extractor_id = "ex_y7BPYzNG",
                              params = list(max_keywords = 1))
output2
```

```
#>   count relevance positions_in_text     keyword
#> 1     3     0.978     164, 341, 568 Wall Street
#>                           text_md5
#> 1 c52e4d898bf4009ba347820c86275973
```

```r
attr(output2, "headers")
```

```
#> # A tibble: 1 x 11
#>         server                          date     content.type
#>         <fctr>                        <fctr>           <fctr>
#> 1 nginx/1.11.5 Tue, 17 Oct 2017 16:38:10 GMT application/json
#> # ... with 8 more variables: transfer.encoding <fctr>, connection <fctr>,
#> #   x.query.limit.limit <fctr>, x.query.limit.remaining <fctr>,
#> #   x.query.limit.request.queries <fctr>, allow <fctr>,
#> #   content.encoding <fctr>, text_md5 <list>
```

### How to find extractors?

You can find extractors and their IDs, including extractors for text in Spanish, at https://app.monkeylearn.com/main/explore

There is no endpoint for automatically finding all extractors, but if you find one in the website you particularly like and use a lot in your language and application, you could choose to save its id as an environment variable as explained [here]( http://stat545.com/bit003_api-key-env-var.html). Reading about extractors on the website will give you a good overview of their characteristics and original application.

Here are a few ones for text in English:

* [Entity extractor](https://app.monkeylearn.com/extraction/extractors/ex_isnnZRbS/tab/description-tab), `extractor_id = "ex_isnnZRbS"` (used in the first example). Extract Entities from text using Named Entity Recognition (NER). NER labels sequences of words in a text which are the names of things, such as person and company names. This implementation labels 3 classes: PERSON, ORGANIZATION and LOCATION. This NER tagger is implemented using Conditional Random Field (CRF) sequence models.

* [Keyword extractor](https://app.monkeylearn.com/extraction/extractors/ex_y7BPYzNG/tab/description-tab), `extractor_id = "ex_y7BPYzNG"`. Extract keywords from text in English. Keywords can be compounded by one or more words and are defined as the important topics in your content and can be used to index data, generate tag clouds or for searching. This keyword extraction algorithm employs statistical algorithms and natural language processing technology to analyze your content and identify the relevant keywords.


```r
text <- "A panel of Goldman Sachs employees spent a recent Tuesday night at the Columbia University faculty club trying to convince a packed room of potential recruits that Wall Street, not Silicon Valley, was the place to be for computer scientists.

The Goldman employees knew they had an uphill battle. They were fighting against perceptions of Wall Street as boring and regulation-bound and Silicon Valley as the promised land of flip-flops, beanbag chairs and million-dollar stock options.

Their argument to the room of technologically inclined students was that Wall Street was where they could find far more challenging, diverse and, yes, lucrative jobs working on some of the world’s most difficult technical problems.

“Whereas in other opportunities you might be considering, it is working one type of data or one type of application, we deal in hundreds of products in hundreds of markets, with thousands or tens of thousands of clients, every day, millions of times of day worldwide,” Afsheen Afshar, a managing director at Goldman Sachs, told the students."
output <- monkeylearn_extract(request = text,
                              extractor_id = "ex_y7BPYzNG")
output
```

```
#>    count relevance positions_in_text                      keyword
#> 1      3     0.978     164, 339, 560                  Wall Street
#> 2      2     0.652          181, 386               Silicon Valley
#> 3      1     0.543               456 million-dollar stock options
#> 4      1     0.543                11      Goldman Sachs employees
#> 5      1     0.543                80      University faculty club
#> 6      1     0.543                43         recent Tuesday night
#> 7      1     0.543               689 difficult technical problems
#> 8      2     0.435          898, 919                    thousands
#> 9      2     0.435          796, 816                         type
#> 10     2     0.435          848, 872                     hundreds
#>                            text_md5
#> 1  06674f3b0fc7a6135c0afb3e8b5f87f1
#> 2  06674f3b0fc7a6135c0afb3e8b5f87f1
#> 3  06674f3b0fc7a6135c0afb3e8b5f87f1
#> 4  06674f3b0fc7a6135c0afb3e8b5f87f1
#> 5  06674f3b0fc7a6135c0afb3e8b5f87f1
#> 6  06674f3b0fc7a6135c0afb3e8b5f87f1
#> 7  06674f3b0fc7a6135c0afb3e8b5f87f1
#> 8  06674f3b0fc7a6135c0afb3e8b5f87f1
#> 9  06674f3b0fc7a6135c0afb3e8b5f87f1
#> 10 06674f3b0fc7a6135c0afb3e8b5f87f1
```

* [Useful data extractor](https://app.monkeylearn.com/extraction/extractors/ex_dqRio5sG/tab/description-tab), `extractor_id = "ex_dqRio5sG"`. Extract useful data from text. This algorithm can be used to detect many different useful data: links, phones, ips, prices, times, emails, bitcoin addresses, dates, ipv6s, hex colors and credit cards.

When using this extractor, the format of the API output is a bit different than for other extractors, see below how the output looks like.


```r
text <- "Hi, my email is john@example.com and my credit card is 4242-4242-4242-4242 so you can charge me with $10. My phone number is 15555 9876. We can get in touch on April 16, at 10:00am"
text2 <- "Hi, my email is mary@example.com and my credit card is 4242-4232-4242-4242. My phone number is 16655 9876. We can get in touch on April 16, at 10:00am"
output <- monkeylearn_extract(request = c(text, text2),
                              extractor_id = "ex_dqRio5sG")
output
```

```
#>       dates       links     phones ipv6s hex_colors  ips
#> 1 April 16, example.com 15555 9876  NULL       NULL NULL
#> 2 April 16, example.com 16655 9876  NULL       NULL NULL
#>          credit_cards prices   times           emails bitcoin_addresses
#> 1 4242-4242-4242-4242    $10 10:00am john@example.com              NULL
#> 2 4242-4232-4242-4242        10:00am mary@example.com              NULL
#>                           text_md5
#> 1 8c2b65bfca064616356c6a2cae2f5519
#> 2 c97eba30f94868ba6b7c3d250f59133a
```


### Classify

#### A first example


```r
text1 <- "my dog is an avid rice eater"
text2 <- "i want to buy an iphone"
request <- c(text1, text2)
monkeylearn_classify(request,
                     classifier_id = "cl_oFKL5wft")
```

```
#> # A tibble: 6 x 4
#>   category_id probability              label
#>         <int>       <dbl>              <chr>
#> 1    18313097       0.130               Pets
#> 2    18313108       0.239               Dogs
#> 3    18313113       0.082           Dog Food
#> 4    18314739       0.113        Cell Phones
#> 5    18314740       0.186        Accessories
#> 6    18314741       0.094 Cases & Protectors
#> # ... with 1 more variables: text_md5 <chr>
```

#### How to find classifiers?

You can find classifiers and their IDs at https://app.monkeylearn.com/main/explore or you can use the `monkeylearn_classifiers` function, choosing to show all classifiers or only the private ones with `private = TRUE`. The first column of the resulting data.frame is the `classifier_id` to be used in `monkeylearn_classify`.


```r
monkeylearn_classifiers(private = FALSE)
```

```
#> # A tibble: 41 x 19
#>    classifier_id                                              name
#>            <chr>                                             <chr>
#>  1   cl_sGdE8hD9              NPS SaaS Product Feedback Classifier
#>  2   cl_T7XMb74S                           IAB Taxonomy Classifier
#>  3   cl_nLW3yR6m      Telcos -  Customer Support Ticket Classifier
#>  4   cl_4LqLD7cN  Telcos - Customer Complaint Classifier (Twitter)
#>  5   cl_rtdVEb8p            Telcos - Sentiment analysis (Facebook)
#>  6   cl_szya8upj Telcos - Customer Complaint Classifier (Facebook)
#>  7   cl_uEzzFRHh          Telcos - Needs Help Detection (Facebook)
#>  8   cl_zSDSt8QP                Outbound Sales Response Classifier
#>  9   cl_nuBGDNiN                Startup News - Industry Classifier
#> 10   cl_GhPhiVYE     E-commerce Customer Support Ticket Classifier
#> # ... with 31 more rows, and 17 more variables: description <chr>,
#> #   train_state <chr>, train_job_id <lgl>, language <chr>,
#> #   ngram_range <chr>, use_stemmer <lgl>, stop_words <chr>,
#> #   max_features <int>, strip_stopwords <lgl>, is_multilabel <lgl>,
#> #   is_twitter_data <lgl>, normalize_weights <lgl>, classifier <chr>,
#> #   industry <chr>, classifier_type <chr>, text_type <chr>,
#> #   permissions <chr>
```

For instance, for doing sentiment analysis in French, one could extract all classifiers and then look at classifiers containing the word "sentiment" in their name and "fr" as language.


```r
classifiers <- monkeylearn_classifiers(private = FALSE)
classifiers_sentiment_french <- dplyr::filter(classifiers,
                                              grepl("[Ss]entiment", name), language == "fr")
```

Here are a few other examples:

* [Language detection](https://app.monkeylearn.com/categorizer/projects/cl_oJNMkt2V/tab/main-tab), `classifier_id = "cl_oJNMkt2V"`. Detect language in text. New languages were added for a total of 48 different languages arranged in language families.


```r
text1 <- "Hauràs de dirigir-te al punt de trobada del grup al que et vulguis unir."
text2 <- "i want to buy an iphone"
text3 <- "Je déteste ne plus avoir de dentifrice."
request <- c(text1, text2, text3)
monkeylearn_classify(request,
                     classifier_id = "cl_oJNMkt2V")
```

```
#> # A tibble: 5 x 4
#>   category_id probability         label                         text_md5
#>         <int>       <dbl>         <chr>                            <chr>
#> 1     2324978       1.000        Italic e8d671fbd9d74e6fc58e6d5a34025534
#> 2     2324979       1.000    Catalan-ca e8d671fbd9d74e6fc58e6d5a34025534
#> 3     2325016       0.686 Vietnamese-vi af5c621a49a008f6e6a0d5ad47f2e1f4
#> 4     2324978       1.000        Italic d3b4ce291cfb147a8246f71e0534c7c8
#> 5     2324980       1.000     French-fr d3b4ce291cfb147a8246f71e0534c7c8
```

* [Profanity and abuse detection](https://app.monkeylearn.com/categorizer/projects/cl_KFXhoTdt/tab/main-tab), `classifier_id = "cl_KFXhoTdt"`.


```r
text1 <- "I think this is awesome."
text2 <- "Holy shit! You did great!"
request <- c(text1, text2)
monkeylearn_classify(request,
                     classifier_id = "cl_KFXhoTdt")
```

```
#> # A tibble: 2 x 4
#>   category_id probability     label                         text_md5
#>         <int>       <dbl>     <chr>                            <chr>
#> 1    22375077       0.803     clean 641e443d9485034d30fec6c36d67d4cd
#> 2    22375076       0.997 profanity 2b9e3eb08b256277e4c2b3dfcc8d5c75
```

* [General topic classifier](https://app.monkeylearn.com/categorizer/projects/cl_5icAVzKR/tab/), `classifier_id = "cl_5icAVzKR"`.


```r
text1 <- "Let me tell you about my dog and my cat. They are really friendly and like going on walks. They both like chasing mice."
text2 <- "My first R package was probably a disaster but I keep learning how to program."
request <- c(text1, text2)
monkeylearn_classify(request,
                     classifier_id = "cl_5icAVzKR")
```

```
#> # A tibble: 5 x 4
#>   category_id probability                label
#>         <int>       <dbl>                <chr>
#> 1       64600       0.894              Animals
#> 2       64608       0.649              Mammals
#> 3       64611       0.869         Land Mammals
#> 4       64638       0.240 Computers & Internet
#> 5       64640       0.252             Internet
#> # ... with 1 more variables: text_md5 <chr>
```

### Check the number of remaining calls

After each call to a function you can check how many calls to the API you can still make  using `attr(output, "headers")$x.query.limit.remaining` and `attr(output, "headers")$x.query.limit.limit`. The period after which `attr(output, "headers")$x.query.limit.remaining` depends on your subscription and is not included in the output.





### Citing

> Maëlle Salmon (2017). monkeylearn: Accesses the Monkeylearn API for
  Text Classifiers and Extractors. R package version 0.1.3.
  https://CRAN.R-project.org/package=monkeylearn



### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our GitHub repo for monkeylearn](https://github.com/ropenscilabs/monkeylearn/issues?state=open)


[Back to top](#top)
