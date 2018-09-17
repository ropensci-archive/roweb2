---
slug: rgbif-genus
title: Use case - how to get species occurrence data from GBIF for a genus
date: '2013-04-12'
authors:
  - name: Scott Chamberlain
categories: blog
tags:
  - R
  - rOpenSci
  - rgbif
  - API
---

Real use cases from people using our software are awesome. They are important for many reasons: 1) They make the code more useable because we may change code to make the interace and output easier to understand; 2) They may highlight bugs in our code; and 3) They show us what functions users care the most about (if we can assume number of questions equates to use).

If someone has a question, others are likely to have the same, or a similar question. Thus, we are sharing use cases on our blog.

***

## The use case: How do I get GBIF occurrences for all species in a genus?

The best way to approach this right now is to use the `scientificname` argument in the `occurrencelist()` function. For example, use an asterisk "\*" after *Abies*, which will get you everything in the genus *Abies*.

***

## Install rgbif from Github

```r
# install_github('rgbif', 'ropensci') # uncomment if you don't have it
# installed yet
library(rgbif)
```

## Lets see how many records there are in the genus with lat/long data in Spain

There are only 2975, so we can just set maxresults below to this number

```r
occurrencecount("Abies*", coordinatestatus = TRUE, originisocountrycode = "ES")
```

```
## [1] 2975
```

***

## Lets get some data

```r
dataout <- occurrencelist(scientificname = "Abies*", coordinatestatus = TRUE,
    originisocountrycode = "ES", removeZeros = TRUE, maxresults = 3000)

# take a quick peek
head(dataout[, 1:4])
```

```
##          taxonName country decimalLatitude decimalLongitude
## 1 Abies alba Mill.      ES           37.84          -4.8200
## 2 Abies alba Mill.      ES           43.02          -1.3444
## 3 Abies alba Mill.      ES           42.93          -0.8569
## 4 Abies alba Mill.      ES           42.93          -0.8569
## 5 Abies alba Mill.      ES           42.93          -0.8569
## 6 Abies alba Mill.      ES           42.76          -0.8810
```

***

## In the dataout data.frame there are 31 unique names

```r
length(unique(dataout$taxonName))
```

```
## [1] 31
```

***

## But some are duplicates just spelled in different ways, or with whitespace

```r
unique(dataout$taxonName)
```

```
##  [1] "Abies alba Mill."
##  [2] "Abies alba L."
##  [3] "Abies sp."
##  [4] "Abies  alba"
##  [5] "Abies  alba                                                 M Miller"
##  [6] "Abies  alba Mill."
##  [7] "Abies"
##  [8] "Abies pinsapo Boiss."
##  [9] "Abies alba Miller"
## [10] "Abies pinsapo Boiss"
## [11] "Abies marocana Trab."
## [12] "Abies nordmanniana (Steven) Spach"
## [13] "Abies concolor (Gord.) Lindl. & Hildebr."
## [14] "Abies pinsapo"
## [15] "Abies koreana"
## [16] "Abies pinsapo var. \"Kelleris\""
## [17] "Abies  excelsa DC."
## [18] "Abies  nordmanniana"
## [19] "Abies  pinsapo Boiss."
## [20] "Abies  pinsapo"
## [21] "Abies  alba Miller"
## [22] "Abies  pectinata DC."
## [23] "Abies  pectinata"
## [24] "Abies pectinata DC."
## [25] "Abies excelsa Poir."
## [26] "Abies balsamea (L.) Mill."
## [27] "Abies concolor Hildebr."
## [28] "Abies numidica De Lannoy ex Carriere"
## [29] "Abies pinsapo Boiss. var. pinsapo"
## [30] "Abies concolor (Gord.) Lindl.ex Hildebr."
## [31] "Abies cephalonica Loudon"
```

***

## So you can exlude ones you don't want or change names using regex, for example (notice one name replaced)

```r
library(stringr)
unique(gsub("Abies pinsapo Boiss", "Abies pinsapo", dataout$taxonName, fixed = TRUE))
```

```
##  [1] "Abies alba Mill."
##  [2] "Abies alba L."
##  [3] "Abies sp."
##  [4] "Abies  alba"
##  [5] "Abies  alba                                                 M Miller"
##  [6] "Abies  alba Mill."
##  [7] "Abies"
##  [8] "Abies pinsapo."
##  [9] "Abies alba Miller"
## [10] "Abies pinsapo"
## [11] "Abies marocana Trab."
## [12] "Abies nordmanniana (Steven) Spach"
## [13] "Abies concolor (Gord.) Lindl. & Hildebr."
## [14] "Abies koreana"
## [15] "Abies pinsapo var. \"Kelleris\""
## [16] "Abies  excelsa DC."
## [17] "Abies  nordmanniana"
## [18] "Abies  pinsapo Boiss."
## [19] "Abies  pinsapo"
## [20] "Abies  alba Miller"
## [21] "Abies  pectinata DC."
## [22] "Abies  pectinata"
## [23] "Abies pectinata DC."
## [24] "Abies excelsa Poir."
## [25] "Abies balsamea (L.) Mill."
## [26] "Abies concolor Hildebr."
## [27] "Abies numidica De Lannoy ex Carriere"
## [28] "Abies pinsapo. var. pinsapo"
## [29] "Abies concolor (Gord.) Lindl.ex Hildebr."
## [30] "Abies cephalonica Loudon"
```

***

## That's it!

Let us know if you have any questions on this tutorial.

And keep those use cases/questions coming!


