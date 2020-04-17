---
slug: googlelanguager
title: googleLanguageR - Analysing language through the Google Cloud Machine Learning
  APIs
author:
  - Mark Edmondson
date: '2017-10-03'
topicid: 904
tags:
  - R
  - API
  - packages
  - textmining
  - text analysis
  - linguistics
  - data extraction
  - community
  - software
  - Software Peer Review
  - googleLanguageR
---

<!-- open source image taken from: https://upload.wikimedia.org/wikipedia/commons/2/21/Bell_System_switchboard.jpg -->

{{< figure class="center" link="https://upload.wikimedia.org/wikipedia/commons/2/21/Bell_System_switchboard.jpg" src="/assets/blog-images/2017-10-03-googlelanguager/switchboard.jpg" >}}
</span>

One of the greatest assets human beings possess is the power of speech and language, from which almost all our other accomplishments flow. To be able to analyse communication offers us a chance to gain a greater understanding of one another.

To help you with this, [`googleLanguageR`](https://code.markedmondson.me/googleLanguageR/) is an R package that allows you to perform speech-to-text transcription, neural net translation and natural language processing via the [Google Cloud machine learning services](https://cloud.google.com/products/machine-learning/).

An introduction to the package is below, but you can find out more details at the [`googleLanguageR` website](https://code.markedmondson.me/googleLanguageR/).

### Google's bet

Google predicts that machine learning is to be a fundamental feature of business, and so they are looking to become the infrastructure that makes machine learning possible. Metaphorically speaking: If machine learning is electricity, then Google wants to be the pylons carrying it around the country.

<!-- open source image taken from: https://pixabay.com/en/pylon-sky-electricity-tower-2515429/ -->
{{< figure class="center" link="https://pixabay.com/en/pylon-sky-electricity-tower-2515429/" src="/assets/blog-images/2017-10-03-googlelanguager/pylon.jpg" >}}

Google may not be the only company with such ambitions, but one advantage Google has is the amount of data it possesses. Twenty years of web crawling has given it an unprecedented corpus to train its models.  In addition, its recent moves into voice and video gives it one of the biggest audio and speech datasets, all of which have been used to help create machine learning applications within its products such as search and Gmail. Further investment in machine learning is shown by Google's purchase of [Deepmind](https://deepmind.com/), a UK based A.I. research firm that recently was in the news for defeating the top Go champion with its neural network trained Go bot.  Google has also taken an open-source route with the creation and publication of [Tensorflow](https://www.tensorflow.org/), a leading machine learning framework.

Whilst you can create your own machine learning models, for those users who haven't the expertise, data or time to do so, Google also offers an increasing range of machine learning APIs that are pre-trained, such as image and video recognition or job search.  `googleLanguageR` wraps the subset of those machine learning APIs that are language flavoured - Cloud Speech, Translation and Natural Language.

Since they carry complementary outputs that can be used in each other's input, all three of the APIs are included in one package. For example, you can transcribe a recording of someone speaking in Danish, translate that to English and then identify how positive or negative the writer felt about its content (sentiment analysis) then identify the most important concepts and objects within the content (entity analysis).


### Motivations

#### Fake news

One reason why I started looking at this area was the growth of 'fake news', and its effect on political discourse on social media. I wondered if there was some way to put metrics on how much a news story fuelled one's own bias within your own filter bubble.  The entity API provides a way to perform entity and sentiment analysis at scale on tweets, and by then comparing different users and news sources preferences the hope is to be able to judge how much they are in agreement with your own bias, views and trusted reputation sources.

#### Make your own Alexa

Another motivating application is the growth of voice commands that will become the primary way of user interface with technology.  Already, [Google reports up to 20% of search in its app](https://www.thinkwithgoogle.com/data-gallery/detail/google-app-voice-search/) is via voice search.  I'd like to be able to say "R, print me out that report for client X".  A Shiny app that records your voice, uploads to the API then parses the return text into actions gives you a chance to create your very own Alexa-like infrastructure.

{{< figure class="center" src="/assets/blog-images/2017-10-03-googlelanguager/alexa.jpg" caption="The voice activated internet connected speaker, Amazon's Alexa - image from www.amazon.co.uk" >}}

#### Translate everything

Finally, I live and work in Denmark.  As Danish is only spoken by less than 6 million people, applications that work in English may not be available in Danish very quickly, if at all.  The API's translation service is the one that made the news in 2016 for ["inventing its own language"](https://research.googleblog.com/2016/09/a-neural-network-for-machine.html), and offers much better English to Danish translations that the free web version and may make services available in Denmark sooner.

### Using the library

To use these APIs within R, you first need to do a one-time setup to create a Google Project, add a credit card and authenticate which is [detailed on the package website](https://code.markedmondson.me/googleLanguageR/#installation).

After that, you feed in the R objects you want to operate upon.  The [rOpenSci review](https://github.com/ropensci/software-review/issues/127) helped to ensure that this can scale up easily, so that you can feed in large character vectors which the library will parse and rate limit as required.  The functions also work within [tidyverse](https://www.tidyverse.org/) pipe syntax.

#### Speech-to-text

The [Cloud Speech API](https://code.markedmondson.me/googleLanguageR/articles/speech.html) is exposed via the [`gl_speech`](https://code.markedmondson.me/googleLanguageR/reference/gl_speech.html) function.

It supports multiple audio formats and languages, and you can either feed a sub-60 second audio file directly, or perform asynchrnous requests for longer audio files.

Example code:

```r
library(googleLanguageR)

my_audio <- "my_audio_file.wav"
gl_speech(my_audio)
#  A tibble: 1 x 3
#  transcript confidence                 words
#* <chr>      <dbl>                <list>
#1 Hello Mum  0.9227779 <data.frame [19 x 3]>
```

#### Translation

The [Cloud Translation API](https://code.markedmondson.me/googleLanguageR/articles/translation.html) lets you translate text via [`gl_translate`](https://code.markedmondson.me/googleLanguageR/reference/gl_translate.html)

As you are charged per character, one tip here if you are working with lots of different languages is to perform detection of language offline first using another rOpenSci package, [`cld2`](https://github.com/ropensci/cld2).  That way you can avoid charges for text that is already in your target language i.e. English.

```r
library(googleLanguageR)
library(cld2)
library(purrr)

my_text <- c("Katten sidder på måtten", "The cat sat on the mat")

## offline detect language via cld2
detected <- map_chr(my_text, detect_language)
# [1] "DANISH"  "ENGLISH"

## get non-English text
translate_me <- my_text[detected != "ENGLISH"]

## translate
gl_translate(translate_me)
## A tibble: 1 x 3
#                 translatedText detectedSourceLanguage                    text
#*                         <chr>                  <chr>                   <chr>
#1 The cat is sitting on the mat                     da Katten sidder på måtten
```

#### Natural Language Processing

The [Natural Language API](https://code.markedmondson.me/googleLanguageR/articles/nlp.html) reveals the structure and meaning of text, accessible via the [`gl_nlp`](https://code.markedmondson.me/googleLanguageR/reference/gl_nlp.html) function.

It returns several analysis:

* *Entity analysis* - finds named entities (currently proper names and common nouns) in the text along with entity types, salience, mentions for each entity, and other properties. If possible, will also return metadata about that entity such as a Wikipedia URL.
* *Syntax* - analyzes the syntax of the text and provides sentence boundaries and tokenization along with part of speech tags, dependency trees, and other properties.
* *Sentiment* - the overall sentiment of the text, represented by a magnitude [0, +inf] and score between -1.0 (negative sentiment) and 1.0 (positive sentiment)

These are all useful to get an understanding of the meaning of a sentence, and has potentially the greatest number of applications of the APIs featured.  With entity analysis, auto categorisation of text is possible; the syntax returns let you pull out nouns and verbs for parsing into other actions; and the sentiment analysis allows you to get a feeling for emotion within text.

A demonstration is below which gives an idea of what output you can generate:

```r
library(googleLanguageR)
quote <- "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe."
nlp <- gl_nlp(quote)

str(nlp)
#List of 6
# $ sentences        :List of 1
#  ..$ :'data.frame':	1 obs. of  4 variables:
#  .. ..$ content    : chr "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe."
#  .. ..$ beginOffset: int 0
#  .. ..$ magnitude  : num 0.6
#  .. ..$ score      : num -0.6
# $ tokens           :List of 1
#  ..$ :'data.frame':	20 obs. of  17 variables:
#  .. ..$ content       : chr [1:20] "Two" "things" "are" "infinite" ...
#  .. ..$ beginOffset   : int [1:20] 0 4 11 15 23 25 29 38 42 48 ...
#  .. ..$ tag           : chr [1:20] "NUM" "NOUN" "VERB" "ADJ" ...
#  .. ..$ aspect        : chr [1:20] "ASPECT_UNKNOWN" "ASPECT_UNKNOWN" "ASPECT_UNKNOWN" "ASPECT_UNKNOWN" ...
#  .. ..$ case          : chr [1:20] "CASE_UNKNOWN" "CASE_UNKNOWN" "CASE_UNKNOWN" "CASE_UNKNOWN" ...
#  .. ..$ form          : chr [1:20] "FORM_UNKNOWN" "FORM_UNKNOWN" "FORM_UNKNOWN" "FORM_UNKNOWN" ...
#  .. ..$ gender        : chr [1:20] "GENDER_UNKNOWN" "GENDER_UNKNOWN" "GENDER_UNKNOWN" "GENDER_UNKNOWN" ...
#  .. ..$ mood          : chr [1:20] "MOOD_UNKNOWN" "MOOD_UNKNOWN" "INDICATIVE" "MOOD_UNKNOWN" ...
#  .. ..$ number        : chr [1:20] "NUMBER_UNKNOWN" "PLURAL" "NUMBER_UNKNOWN" "NUMBER_UNKNOWN" ...
#  .. ..$ person        : chr [1:20] "PERSON_UNKNOWN" "PERSON_UNKNOWN" "PERSON_UNKNOWN" "PERSON_UNKNOWN" ...
#  .. ..$ proper        : chr [1:20] "PROPER_UNKNOWN" "PROPER_UNKNOWN" "PROPER_UNKNOWN" "PROPER_UNKNOWN" ...
#  .. ..$ reciprocity   : chr [1:20] "RECIPROCITY_UNKNOWN" "RECIPROCITY_UNKNOWN" "RECIPROCITY_UNKNOWN" "RECIPROCITY_UNKNOWN" ...
#  .. ..$ tense         : chr [1:20] "TENSE_UNKNOWN" "TENSE_UNKNOWN" "PRESENT" "TENSE_UNKNOWN" ...
#  .. ..$ voice         : chr [1:20] "VOICE_UNKNOWN" "VOICE_UNKNOWN" "VOICE_UNKNOWN" "VOICE_UNKNOWN" ...
#  .. ..$ headTokenIndex: int [1:20] 1 2 2 2 2 6 2 6 9 6 ...
#  .. ..$ label         : chr [1:20] "NUM" "NSUBJ" "ROOT" "ACOMP" ...
#  .. ..$ value         : chr [1:20] "Two" "thing" "be" "infinite" ...
# $ entities         :List of 1
#  ..$ :Classes ‘tbl_df’, ‘tbl’ and 'data.frame':	6 obs. of  9 variables:
#  .. ..$ name         : chr [1:6] "human stupidity" "things" "universe" "universe" ...
#  .. ..$ type         : chr [1:6] "OTHER" "OTHER" "OTHER" "OTHER" ...
#  .. ..$ salience     : num [1:6] 0.1662 0.4771 0.2652 0.2652 0.0915 ...
#  .. ..$ mid          : Factor w/ 0 levels: NA NA NA NA NA NA
#  .. ..$ wikipedia_url: Factor w/ 0 levels: NA NA NA NA NA NA
#  .. ..$ magnitude    : num [1:6] NA NA NA NA NA NA
#  .. ..$ score        : num [1:6] NA NA NA NA NA NA
#  .. ..$ beginOffset  : int [1:6] 42 4 29 86 29 86
#  .. ..$ mention_type : chr [1:6] "COMMON" "COMMON" "COMMON" "COMMON" ...
# $ language         : chr "en"
# $ text             : chr "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe."
# $ documentSentiment:Classes ‘tbl_df’, ‘tbl’ and 'data.frame':	1 obs. of  2 variables:
#  ..$ magnitude: num 0.6
#  ..$ score    : num -0.6
```

### Acknowledgements

This package is 10 times better due to the efforts of the rOpenSci reviewers [Neal Richardson](https://enpiar.com/) and [Julia Gustavsen](https://www.juliagustavsen.com/), who have whipped the documentation, outputs and test cases into the form they are today in `0.1.0`.  Many thanks to them.

Hopefully, this is just the beginning and the package can be further improved by its users - if you do give the package a try and find a potential improvement, [raise an issue on GitHub](https://github.com/ropensci/googleLanguageR/issues) and we can try to implement it.  I'm excited to see what users can do with these powerful tools.
