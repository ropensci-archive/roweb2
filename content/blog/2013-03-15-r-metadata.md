---
slug: r-metadata
title: Scholarly metadata in R
date: '2013-03-15'
authors:
  - name: Scott Chamberlain
    twitter: sckottie
categories: blog
tags:
  - R
  - metadata
  - API
---

Scholarly metadata - the meta-information surrounding articles - can be super useful.  Although metadata does not contain the full content of articles, it contains a lot of useful information, including title, authors, abstract, URL to the article, etc.

One of the largest sources of metadata is provided via the Open Archives Initiative Protocol for Metadata Harvesting or [OAI-PMH](http://www.openarchives.org/OAI/openarchivesprotocol.html). Many publishers, provide their metadata through their own endpoint, and implement the standard OAI-PMH methods: [GetRecord](http://www.openarchives.org/OAI/openarchivesprotocol.html#GetRecord), [Identify](http://www.openarchives.org/OAI/openarchivesprotocol.html#Identify), [ListIdentifiers](http://www.openarchives.org/OAI/openarchivesprotocol.html#ListIdentifiers), [ListMetadataFormats](http://www.openarchives.org/OAI/openarchivesprotocol.html#ListMetadataFormats), [ListRecords](http://www.openarchives.org/OAI/openarchivesprotocol.html#ListRecords), and [ListSets](http://www.openarchives.org/OAI/openarchivesprotocol.html#ListSets). Many providers use OAI-PMH, including [DataCite](http://oai.datacite.org/), [Dryad](http://wiki.datadryad.org/Data_Access#OAI-PMH), and [PubMed](http://www.ncbi.nlm.nih.gov/pmc/tools/oai/).

Some data-/article-providers provide their metadata via their own APIs. For example, Nature Publishing Group provides their own metadata API [here](http://developers.nature.com/docs) in non OAI-PMH format; you can get PLoS metadata through their [search API](http://api.plos.org/), and the BHL (see below) provides their own custom metadata service.

In addition, CrossRef provides a number of metadata search services: [metadata search](http://search.labs.crossref.org/help/api) and [openurl](http://labs.crossref.org/openurl/).

What about the other publishers? (please tell me if I'm wrong about these three)

+ Springer has [a metadata API](http://dev.springer.com/docs), but it is terrible, soooo...
+ Elsevier, are you kidding? Well, they do have some sort of API service, but its a pain in the ass.
+ Wiley, no better than Elsevier.

Note that metadata can live in other places:

+ Another package being developed by David Springate, [rpubmed](https://github.com/ropensci/rpubmed) can get PubMed metadata.
+ Our wrapper to the Mendeley API, [RMendeley](https://github.com/ropensci/rmendeley), gets article metadata via Mendeley's database.
+ Our wrapper to the Biodiversity Heritage Library API [here](http://www.biodiversitylibrary.org/api2/docs/docs.html) gets their metadata.

No, you can't get metadata via Google Scholar - the don't allow scraping, and don't have expose their data via an API.

I have discussed this package [in a previous blog post](http://sckott.github.com/2012/09/rmetadata/), but have since worked on the code a bit, and thought it deserved a new post.

You can see a tutorial for this package [here](http://ropensci.github.com/rmetadata/), and contribute to the code [here](https://github.com/ropensci/rmetadata).

***************

### Install rmetadata

```r
# install_github('rmetadata', 'ropensci') # uncomment to install
library(rmetadata)
```


***************

### Count OAI-PMH identifiers for a data provider.


```r
# For DataCite.
count_identifiers("datacite")

  provider   count
1 datacite 1216193
```


*********

### Lookup article info via CrossRef with DOI and get a citation.

#### As Bibtex


```r
print(crossref_citation("10.3998/3336451.0009.101"), style = "Bibtex")

@Article{,
  title = {In Google We Trust?},
  author = {Geoffrey Bilder},
  journal = {The Journal of Electronic Publishing},
  year = {2006},
  month = {01},
  volume = {9},
  doi = {10.3998/3336451.0009.101},
}
```


#### As regular text


```r
print(crossref_citation("10.3998/3336451.0009.101"), style = "text")

Bilder G (2006). "In Google We Trust?" _The Journal of Electronic
Publishing_, *9*. <URL:
http://dx.doi.org/10.3998/3336451.0009.101>.
```


*********

### Search the CrossRef Metatdata for DOIs using free form references.

#### Search with title, author, year, and journal


```r
crossref_search_free(query = "Piwowar Sharing Detailed Research Data Is Associated with Increased Citation Rate PLOS one 2007")

                                                                                             text
1 Piwowar Sharing Detailed Research Data Is Associated with Increased Citation Rate PLOS one 2007
  match                   doi score
1  TRUE 10.1038/npre.2007.361 4.905
```


#### Get a DOI and get the citation using \code{crossref_search}


```r
# Get a DOI for a paper
doi <- crossref_search_free(query = "Piwowar sharing data PLOS one")$doi

# Get the metadata
crossref_search(doi = doi)[, 1:3]

                           doi score normalizedScore
1 10.1371/journal.pone.0000308 18.19             100
```


*********

### Get a random set of DOI's through CrossRef.


```r
# Default search gets 20 random DOIs
crossref_r()

 [1] "10.4028/www.scientific.net/MSF.126-128.467"
 [2] "10.2139/ssrn.548523"
 [3] "10.1016/S0012-821X(02)00562-9"
 [4] "10.1093/rsq/13.2-3.167"
 [5] "10.5772/55055"
 [6] "10.1515/BC.1999.050"
 [7] "10.1016/S0020-7292(98)90160-6"
 [8] "10.1111/j.1439-0418.1985.tb02788.x"
 [9] "10.1089/aid.2012.0115"
[10] "10.1016/0002-9378(95)90155-8"
[11] "10.1001/jama.1949.02900490055028"
[12] "10.1051/jphyscol:1989172"
[13] "10.1016/s0301-2115(03)00298-7"
[14] "10.1007/BF02735292"
[15] "10.1016/0003-4916(65)90026-6"
[16] "10.4156/jdcta.vol5.issue5.12"
[17] "10.1007/s10904-009-9316-2"
[18] "10.1023/A:1021690001832"
[19] "10.1007/s12262-012-0724-0"
[20] "10.1007/bf02192860"
```



```r

# Specify you want journal articles only
crossref_r(type = "journal_article")

 [1] "10.1016/j.jacc.2011.09.055"
 [2] "10.1002/dev.420170603"
 [3] "10.4315/0362-028X.JFP-10-403"
 [4] "10.1016/S0925-4927(98)00016-X"
 [5] "10.1111/j.1933-1592.2002.tb00141.x"
 [6] "10.1541/ieejfms.127.629"
 [7] "10.5539/enrr.v3n1p62"
 [8] "10.1016/S0960-9776(96)90038-7"
 [9] "10.1016/0925-9635(94)05240-9"
[10] "10.1016/s0929-693x(97)86846-7"
[11] "10.1002/(SICI)1096-9071(199601)48:1<53::AID-JMV9>3.0.CO;2-K"
[12] "10.1016/s0267-7261(01)00016-1"
[13] "10.1111/j.1748-0361.2003.tb00575.x"
[14] "10.1097/00005721-197701000-00011"
[15] "10.1007/s00894-009-0593-z"
[16] "10.1071/AR9830063"
[17] "10.1186/gb-2009-10-4-r39"
[18] "10.2165/00128415-201113540-00038"
[19] "10.1007/BF00522986"
[20] "10.1080/19407963.2011.539385"
```


*********

### Search the CrossRef Metatdata API.


```r
# Search for two different query terms
crossref_search(query = c("renear", "palmer"), rows = 4)[, 1:3]

                            doi score normalizedScore
1       10.1126/science.1157784 3.253             100
2  10.1002/meet.2009.1450460141 2.169              66
3 10.4242/BalisageVol3.Renear01 2.102              64
4 10.4242/BalisageVol5.Renear01 2.102              64
```



```r

# Get results for a certain year
crossref_search(query = c("renear", "palmer"), year = 2010)[, 1:3]

                                  doi  score normalizedScore
1            10.1002/meet.14504701218 1.0509             100
2            10.1002/meet.14504701240 1.0509             100
3           10.5270/OceanObs09.cwp.68 1.0442              99
4               10.1353/mpq.2010.0003 0.6890              65
5                  10.1353/mpq.0.0041 0.6890              65
6                  10.1353/mpq.0.0044 0.6890              65
7                  10.1353/mpq.0.0057 0.6890              65
8                    10.1386/fm.1.1.2 0.6890              65
9                    10.1386/fm.1.2.2 0.6890              65
10                   10.1386/fm.1.3.2 0.6890              65
11       10.1097/ALN.0b013e3181f09404 0.6090              57
12      10.1016/j.urology.2010.02.033 0.6090              57
13              10.1353/ect.2010.0025 0.6090              57
14               10.1117/2.4201001.04 0.6090              57
15 10.1111/j.1835-9310.1977.tb01159.x 0.6090              57
16    10.4067/S0717-69962010000100001 0.6090              57
17    10.4067/S0717-69962010000200001 0.6090              57
18           10.2105/AJPH.2009.191098 0.6029              57
19              10.1353/mpq.2010.0004 0.5167              49
20                 10.1353/mpq.0.0048 0.5167              49
```


*********

### Get a short DOI from shortdoi.org.


```r
# Geta a short DOI, just the short DOI returned
short_doi(doi = "10.1371/journal.pone.0042793")

[1] "10/f2bfz9"
```



```r

# Geta a short DOI, all data returned
short_doi(doi = "10.1371/journal.pone.0042793", justshort = FALSE)

$DOI
[1] "10.1371/journal.pone.0042793"

$ShortDOI
[1] "10/f2bfz9"

$IsNew
[1] FALSE
```


*********

### Get a record from a OAI-PMH data provider.


```r
# Single provider, one identifier
md_getrecord(provider = "pensoft", identifier = "10.3897/zookeys.1.10")

                                                                                                title
1 A new candidate for a Gondwanaland distribution in the Zodariidae (Araneae): Australutica in Africa
      creator date             type
1 Jocqué,Rudy 2008 Research Article
```



```r

# Single provider, multiple identifiers
md_getrecord(provider = "pensoft", identifier = c("10.3897/zookeys.1.10", "10.3897/zookeys.4.57"))

                                                                                                   title
1    A new candidate for a Gondwanaland distribution in the Zodariidae (Araneae): Australutica in Africa
2 Studies of Tiger Beetles. CLXXVIII. A new Lophyra (Lophyra) from Somaliland (Coleoptera, Cicindelidae)
        creator date             type
1   Jocqué,Rudy 2008 Research Article
2 Cassola,Fabio 2008 Research Article
```


*********

### List available metadata formats from various providers.


```r
# List metadata formats for a provider
md_listmetadataformats(provider = "dryad")

  metadataPrefix
1         oai_dc
2            rdf
3            ore
4           mets
                                                       schema
1              http://www.openarchives.org/OAI/2.0/oai_dc.xsd
2                 http://www.openarchives.org/OAI/2.0/rdf.xsd
3 http://tweety.lanl.gov/public/schemas/2008-06/atom-tron.sch
4                  http://www.loc.gov/standards/mets/mets.xsd
                            metadataNamespace
1 http://www.openarchives.org/OAI/2.0/oai_dc/
2    http://www.openarchives.org/OAI/2.0/rdf/
3                 http://www.w3.org/2005/Atom
4                    http://www.loc.gov/METS/
```



```r

# List metadata formats for a specific identifier for a provider
md_listmetadataformats(provider = "pensoft", identifier = "10.3897/zookeys.1.10")

            identifier metadataPrefix
1 10.3897/zookeys.1.10         oai_dc
2 10.3897/zookeys.1.10           mods
                                             schema
1    http://www.openarchives.org/OAI/2.0/oai_dc.xsd
2 http://www.loc.gov/standards/mods/v3/mods-3-1.xsd
                            metadataNamespace
1 http://www.openarchives.org/OAI/2.0/oai_dc/
2                  http://www.loc.gov/mods/v3
```


*********

### Some plotting - mean number of authors per paper

Okay, so this isn't a super useful visualization, but you can surely think of something better.


```r
library(ggplot2)
library(ggthemes)
library(reshape)


temp <- md_listrecords(provider = "pensoft", from = "2011-10-01", until = "2012-01-01")
temp2 <- ldply(temp)[, -1]
auths <- sapply(temp2$creator, function(x) length(strsplit(as.character(x),
    ";")[[1]]))
toplot <- data.frame(authors = auths, articletype = temp2$type)
toplot_ <- ddply(toplot, .(articletype), summarise, authors = mean(authors))
toplot_$articletype <- reorder(toplot_$articletype, toplot_$authors)

ggplot(toplot_, aes(articletype, authors)) + theme_tufte(base_size = 16) + geom_bar(stat = "identity") +
    coord_flip()
```

![center](/assets/blog-images/someplotting.png)
