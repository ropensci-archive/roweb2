---
title: europepmc tutorial
package_version: 0.1.4
---



[Europe PMC](http://europepmc.org/) covers life science literature and
gives access to open access full texts. Europe
PMC ingests all PubMed content and extends its index with other sources,
including Agricola, a bibliographic database of citations to the agricultural
literature, or Biological Patents.

![Index coverage](https://europepmc.org/wicket/resource/uk.bl.ukpmc.web.pages.faq.Help/images/EuropePMCContent-ver-4BB17F003F8F38DF2D3BBE48AB5896C6.png)

For more background on Europe PMC, see:

<https://europepmc.org/About>

Europe PMC: a full-text literature database for the life sciences and platform
for innovation. (2014). Nucleic Acids Research, 43(D1), D1042–D1048. <http://doi.org/10.1093/nar/gku1061>



### Installation


```r
install.packages("europepmc")
```

Or development version from GitHub


```r
install.packages("devtools")
devtools::install_github("ropensci/europepmc")
```


```r
library("europepmc")
```


### Implemented API methods

This client supports the following API methods:

|API-Method     |Description                                                                                  |R functions                                |
|:--------------|:--------------------------------------------------------------------------------------------|:------------------------------------------|
|search         |Search Europe PMC and get detailed metadata                                                  |`epmc_search()`, `epmc_details()`          |
|profile        |Obtain a summary of hit counts for several Europe PMC databases                              |`epmc_profile()`                           |
|citations      |Load metadata representing citing articles for a given publication                           |`epmc_citations()`                         |
|references     |Retrieve the reference section of a pubication                                               |`epmc_refs()`                              |
|databaseLinks  |Get links to biological databases such as UniProt or ENA                                     |`epmc_db()`, `epmc_db_count()`             |
|labslinks      |Access links to Europe PMC provided by third parties                                         |`epmc_lablinks()`, `epmc_lablinks_count()` |
|textMinedTerms |Retrieve text-mined terms                                                                    |`epmc_tm()`, `epmc_tm_count()`             |
|fullTextXML    |Fetch full-texts deposited in PMC                                                            |`epmc_ftxt()`                              |
|bookXML        |retrieve book XML formatted full text for the Open Access subset of the Europe PMC bookshelf |`epmc_ftxt_book()`                         |


### Search Europe PMC

The search covers both metadata (e.g. abstracts or title) and full texts. To
build your query, please refer to the comprehensive guidance on how to search
Europe PMC: <http://europepmc.org/help>. Simply provide your query in the Europe
PMC search syntax to `epmc_search()`.

By default, `epmc_search` returns 100 records. To adjust the limit, simply use
the `limit` parameter.

### Examples

For instance, search for abstracts and full texts that mention
[`Gabi-Kat`](https://www.gabi-kat.de/),  a Flanking Sequence Tag
(FST)-based database for T-DNA insertion mutants:


```r
epmc_search(query = 'Gabi-Kat')
```

```
#> # A tibble: 100 x 27
#>          id source     pmid      pmcid                                doi
#>       <chr>  <chr>    <chr>      <chr>                              <chr>
#>  1 28013277    MED 28013277 PMC5444572                 10.1093/pcp/pcw205
#>  2 22080561    MED 22080561 PMC3245140                10.1093/nar/gkr1047
#>  3 17062622    MED 17062622 PMC1781121                 10.1093/nar/gkl753
#>  4 14756321    MED 14756321       <NA> 10.1023/b:plan.0000009297.37235.4a
#>  5 12874060    MED 12874060       <NA>      10.1093/bioinformatics/btg170
#>  6 25324895    MED 25324895 PMC4169229            10.1186/1746-4811-10-28
#>  7 26343971    MED 26343971       <NA>         10.1016/j.molp.2015.08.011
#>  8 27117628    MED 27117628 PMC4846993                  10.1038/srep24971
#>  9 28636198    MED 28636198 PMC5519931                  10.1111/nph.14655
#> 10 26493293    MED 26493293 PMC4737287                  10.1111/tpj.13062
#> # ... with 90 more rows, and 22 more variables: title <chr>,
#> #   authorString <chr>, journalTitle <chr>, issue <chr>,
#> #   journalVolume <chr>, pubYear <chr>, journalIssn <chr>, pageInfo <chr>,
#> #   pubType <chr>, isOpenAccess <chr>, inEPMC <chr>, inPMC <chr>,
#> #   hasPDF <chr>, hasBook <chr>, hasSuppl <chr>, citedByCount <int>,
#> #   hasReferences <chr>, hasTextMinedTerms <chr>,
#> #   hasDbCrossReferences <chr>, hasLabsLinks <chr>,
#> #   hasTMAccessionNumbers <chr>, firstPublicationDate <chr>
```

Get PLOS Genetics (ISSN:1553-7404) articles that cross-reference EMBL:


```r
epmc_search(query = 'ISSN:1553-7404 HAS_EMBL:y')
```

```
#> # A tibble: 100 x 27
#>          id source     pmid      pmcid                          doi
#>       <chr>  <chr>    <chr>      <chr>                        <chr>
#>  1 28628615    MED 28628615 PMC5495485 10.1371/journal.pgen.1006847
#>  2 28594826    MED 28594826 PMC5481146 10.1371/journal.pgen.1006838
#>  3 28222092    MED 28222092 PMC5340410 10.1371/journal.pgen.1006596
#>  4 27780204    MED 27780204 PMC5079590 10.1371/journal.pgen.1006397
#>  5 27541862    MED 27541862 PMC4991801 10.1371/journal.pgen.1006270
#>  6 27385107    MED 27385107 PMC4934787 10.1371/journal.pgen.1006155
#>  7 27149082    MED 27149082 PMC4858218 10.1371/journal.pgen.1006030
#>  8 27327578    MED 27327578 PMC4915694 10.1371/journal.pgen.1006110
#>  9 27203426    MED 27203426 PMC4874600 10.1371/journal.pgen.1006063
#> 10 27120580    MED 27120580 PMC4847869 10.1371/journal.pgen.1005987
#> # ... with 90 more rows, and 22 more variables: title <chr>,
#> #   authorString <chr>, journalTitle <chr>, issue <chr>,
#> #   journalVolume <chr>, pubYear <chr>, journalIssn <chr>, pageInfo <chr>,
#> #   pubType <chr>, isOpenAccess <chr>, inEPMC <chr>, inPMC <chr>,
#> #   hasPDF <chr>, hasBook <chr>, hasSuppl <chr>, citedByCount <int>,
#> #   hasReferences <chr>, hasTextMinedTerms <chr>,
#> #   hasDbCrossReferences <chr>, hasLabsLinks <chr>,
#> #   hasTMAccessionNumbers <chr>, firstPublicationDate <chr>
```

Use [ORCID](https://orcid.org/) to search for personal publications:


```r
epmc_search(query = 'AUTHORID:"0000-0002-7635-3473"', limit = 1000)
```

```
#> # A tibble: 134 x 27
#>          id source     pmid      pmcid                         doi
#>       <chr>  <chr>    <chr>      <chr>                       <chr>
#>  1 28585529    MED 28585529 PMC5467160         10.1038/ncomms15708
#>  2 28284041    MED 28284041       <NA>       10.1515/znc-2016-0221
#>  3 28013277    MED 28013277 PMC5444572          10.1093/pcp/pcw205
#>  4 27230558    MED 27230558 PMC4881148   10.1186/s12870-016-0805-5
#>  5 26980001    MED 26980001 PMC4791833   10.1186/s12864-016-2566-9
#>  6 26676716    MED 26676716       <NA>           10.1111/tpj.13103
#>  7 27557761    MED 27557761       <NA> 10.1007/978-1-4939-6396-6_5
#>  8 26343971    MED 26343971       <NA>  10.1016/j.molp.2015.08.011
#>  9 26328666    MED 26328666 PMC4556409   10.1186/s13059-015-0729-7
#> 10 25891958    MED 25891958       <NA>           10.1111/tpj.12854
#> # ... with 124 more rows, and 22 more variables: title <chr>,
#> #   authorString <chr>, journalTitle <chr>, journalVolume <chr>,
#> #   pubYear <chr>, journalIssn <chr>, pageInfo <chr>, pubType <chr>,
#> #   isOpenAccess <chr>, inEPMC <chr>, inPMC <chr>, hasPDF <chr>,
#> #   hasBook <chr>, hasSuppl <chr>, citedByCount <int>,
#> #   hasReferences <chr>, hasTextMinedTerms <chr>,
#> #   hasDbCrossReferences <chr>, hasLabsLinks <chr>,
#> #   hasTMAccessionNumbers <chr>, firstPublicationDate <chr>, issue <chr>
```

**Include MeSH and UniProt synonyms**

You may also want to include synonyms when searching Europe PMC. If
`synonym = TRUE` MeSH and UniProt synonyms are searched as well.


```r
# with snyonyms
epmc_search('aspirin', synonym = TRUE)
```

```
#> # A tibble: 100 x 27
#>          id source     pmid                               doi
#>       <chr>  <chr>    <chr>                             <chr>
#>  1 28942878    MED 28942878      10.1016/j.ijcard.2017.06.052
#>  2 28942879    MED 28942879      10.1016/j.ijcard.2017.08.013
#>  3 28990263    MED 28990263                 10.1111/ctr.13133
#>  4 28937039    MED 28937039          10.4103/0366-6999.215330
#>  5 29024912    MED 29024912      10.1016/j.ejogrb.2017.10.004
#>  6 29026148    MED 29026148        10.1038/s41598-017-13430-z
#>  7 28993349    MED 28993349           10.1136/bcr-2017-220483
#>  8 28969559    MED 28969559 10.2174/1871527316666171002115633
#>  9 28965180    MED 28965180         10.1007/s10565-017-9412-y
#> 10 28974502    MED 28974502           10.1161/jaha.117.006328
#> # ... with 90 more rows, and 23 more variables: title <chr>,
#> #   authorString <chr>, journalTitle <chr>, journalVolume <chr>,
#> #   pubYear <chr>, journalIssn <chr>, pageInfo <chr>, pubType <chr>,
#> #   isOpenAccess <chr>, inEPMC <chr>, inPMC <chr>, hasPDF <chr>,
#> #   hasBook <chr>, citedByCount <int>, hasReferences <chr>,
#> #   hasTextMinedTerms <chr>, hasDbCrossReferences <chr>,
#> #   hasLabsLinks <chr>, hasTMAccessionNumbers <chr>,
#> #   firstPublicationDate <chr>, pmcid <chr>, issue <chr>, hasSuppl <chr>
```

```r
# without synonyms
epmc_search('aspirin', synonym = FALSE)
```

```
#> # A tibble: 100 x 27
#>          id source     pmid                               doi
#>       <chr>  <chr>    <chr>                             <chr>
#>  1 28942878    MED 28942878      10.1016/j.ijcard.2017.06.052
#>  2 28937039    MED 28937039          10.4103/0366-6999.215330
#>  3 28969559    MED 28969559 10.2174/1871527316666171002115633
#>  4 28910305    MED 28910305      10.1371/journal.pone.0184027
#>  5 28965180    MED 28965180         10.1007/s10565-017-9412-y
#>  6 29024912    MED 29024912      10.1016/j.ejogrb.2017.10.004
#>  7 28993349    MED 28993349           10.1136/bcr-2017-220483
#>  8 28974502    MED 28974502           10.1161/jaha.117.006328
#>  9 28968454    MED 28968454      10.1371/journal.pone.0185847
#> 10 28900541    MED 28900541       10.1038/cddiscovery.2017.58
#> # ... with 90 more rows, and 23 more variables: title <chr>,
#> #   authorString <chr>, journalTitle <chr>, journalVolume <chr>,
#> #   pubYear <chr>, journalIssn <chr>, pageInfo <chr>, pubType <chr>,
#> #   isOpenAccess <chr>, inEPMC <chr>, inPMC <chr>, hasPDF <chr>,
#> #   hasBook <chr>, citedByCount <int>, hasReferences <chr>,
#> #   hasTextMinedTerms <chr>, hasDbCrossReferences <chr>,
#> #   hasLabsLinks <chr>, hasTMAccessionNumbers <chr>,
#> #   firstPublicationDate <chr>, pmcid <chr>, issue <chr>, hasSuppl <chr>
```

**Output types**

`epmc_search()` supports the following output types :

**Parsed key metadata (default)**

Key metadata parsed as non-nested tibble:


```r
epmc_search('Gabi-Kat', output = 'parsed')
```

```
#> # A tibble: 100 x 27
#>          id source     pmid      pmcid                                doi
#>       <chr>  <chr>    <chr>      <chr>                              <chr>
#>  1 28013277    MED 28013277 PMC5444572                 10.1093/pcp/pcw205
#>  2 22080561    MED 22080561 PMC3245140                10.1093/nar/gkr1047
#>  3 17062622    MED 17062622 PMC1781121                 10.1093/nar/gkl753
#>  4 14756321    MED 14756321       <NA> 10.1023/b:plan.0000009297.37235.4a
#>  5 12874060    MED 12874060       <NA>      10.1093/bioinformatics/btg170
#>  6 25324895    MED 25324895 PMC4169229            10.1186/1746-4811-10-28
#>  7 26343971    MED 26343971       <NA>         10.1016/j.molp.2015.08.011
#>  8 27117628    MED 27117628 PMC4846993                  10.1038/srep24971
#>  9 28636198    MED 28636198 PMC5519931                  10.1111/nph.14655
#> 10 26493293    MED 26493293 PMC4737287                  10.1111/tpj.13062
#> # ... with 90 more rows, and 22 more variables: title <chr>,
#> #   authorString <chr>, journalTitle <chr>, issue <chr>,
#> #   journalVolume <chr>, pubYear <chr>, journalIssn <chr>, pageInfo <chr>,
#> #   pubType <chr>, isOpenAccess <chr>, inEPMC <chr>, inPMC <chr>,
#> #   hasPDF <chr>, hasBook <chr>, hasSuppl <chr>, citedByCount <int>,
#> #   hasReferences <chr>, hasTextMinedTerms <chr>,
#> #   hasDbCrossReferences <chr>, hasLabsLinks <chr>,
#> #   hasTMAccessionNumbers <chr>, firstPublicationDate <chr>
```

In addition to fetch bibliographic metadata, the parsed output also helps you
to get a general overview about additional information types that are offered by
Europe PMC and which can be retrieved through other `europepmc`-functions.
Columns inform whether open access full texts (`isOpenAccess`), cross-links to
other EBI databases (`hasDbCrossReferences`), text-mined terms (`hasTextMinedTerms`)
or references (`hasReferences`) are available.

**IDs**

List of literature database identifier including PMID:


```r
epmc_search('Gabi-Kat', output = 'id_list')
```

```
#> # A tibble: 100 x 4
#>          id source     pmid      pmcid
#>       <chr>  <chr>    <chr>      <chr>
#>  1 28013277    MED 28013277 PMC5444572
#>  2 22080561    MED 22080561 PMC3245140
#>  3 17062622    MED 17062622 PMC1781121
#>  4 14756321    MED 14756321       <NA>
#>  5 12874060    MED 12874060       <NA>
#>  6 25324895    MED 25324895 PMC4169229
#>  7 26343971    MED 26343971       <NA>
#>  8 27117628    MED 27117628 PMC4846993
#>  9 28636198    MED 28636198 PMC5519931
#> 10 26493293    MED 26493293 PMC4737287
#> # ... with 90 more rows
```

**Record details**

Full metadata as list. Please be aware that these lists can become very large, and fetching these data from Europe PMC therefore takes some time.


```r
my_list <- epmc_search('Gabi-Kat', output = 'raw', limit = 10)
# display the structure for one list element
str(my_list[[10]])
```

```
#> List of 43
#>  $ id                   : chr "26493293"
#>  $ source               : chr "MED"
#>  $ pmid                 : chr "26493293"
#>  $ pmcid                : chr "PMC4737287"
#>  $ doi                  : chr "10.1111/tpj.13062"
#>  $ title                : chr "The RNA helicase, eIF4A-1, is required for ovule development and cell size homeostasis in Arabidopsis."
#>  $ authorString         : chr "Bush MS, Crowe N, Zheng T, Doonan JH."
#>  $ authorList           :List of 1
#>   ..$ author:List of 4
#>   .. ..$ :List of 5
#>   .. .. ..$ fullName   : chr "Bush MS"
#>   .. .. ..$ firstName  : chr "Maxwell S"
#>   .. .. ..$ lastName   : chr "Bush"
#>   .. .. ..$ initials   : chr "MS"
#>   .. .. ..$ affiliation: chr "Department of Cell and Developmental Biology, John Innes Centre, Colney Lane, Norwich, NR4 7UH, UK."
#>   .. ..$ :List of 5
#>   .. .. ..$ fullName   : chr "Crowe N"
#>   .. .. ..$ firstName  : chr "Natalie"
#>   .. .. ..$ lastName   : chr "Crowe"
#>   .. .. ..$ initials   : chr "N"
#>   .. .. ..$ affiliation: chr "Department of Cell and Developmental Biology, John Innes Centre, Colney Lane, Norwich, NR4 7UH, UK."
#>   .. ..$ :List of 5
#>   .. .. ..$ fullName   : chr "Zheng T"
#>   .. .. ..$ firstName  : chr "Tao"
#>   .. .. ..$ lastName   : chr "Zheng"
#>   .. .. ..$ initials   : chr "T"
#>   .. .. ..$ affiliation: chr "Department of Cell and Developmental Biology, John Innes Centre, Colney Lane, Norwich, NR4 7UH, UK."
#>   .. ..$ :List of 6
#>   .. .. ..$ fullName   : chr "Doonan JH"
#>   .. .. ..$ firstName  : chr "John H"
#>   .. .. ..$ lastName   : chr "Doonan"
#>   .. .. ..$ initials   : chr "JH"
#>   .. .. ..$ authorId   :List of 2
#>   .. .. .. ..$ type : chr "ORCID"
#>   .. .. .. ..$ value: chr "0000-0001-6027-1919"
#>   .. .. ..$ affiliation: chr "Institute of Biological, Environmental & Rural Sciences, Aberystwyth University, Gogerddan Campus, Aberystwyth, SY23 3EE, UK."
#>  $ authorIdList         :List of 1
#>   ..$ authorId:List of 1
#>   .. ..$ :List of 2
#>   .. .. ..$ type : chr "ORCID"
#>   .. .. ..$ value: chr "0000-0001-6027-1919"
#>  $ journalInfo          :List of 8
#>   ..$ issue               : chr "5"
#>   ..$ volume              : chr "84"
#>   ..$ journalIssueId      : int 2363412
#>   ..$ dateOfPublication   : chr "2015 Dec"
#>   ..$ monthOfPublication  : int 12
#>   ..$ yearOfPublication   : int 2015
#>   ..$ printPublicationDate: chr "2015-12-01"
#>   ..$ journal             :List of 6
#>   .. ..$ title              : chr "The Plant journal : for cell and molecular biology"
#>   .. ..$ medlineAbbreviation: chr "Plant J"
#>   .. ..$ essn               : chr "1365-313X"
#>   .. ..$ issn               : chr "0960-7412"
#>   .. ..$ isoabbreviation    : chr "Plant J."
#>   .. ..$ nlmid              : chr "9207397"
#>  $ pubYear              : chr "2015"
#>  $ pageInfo             : chr "989-1004"
#>  $ abstractText         : chr "eIF4A is a highly conserved RNA-stimulated ATPase and helicase involved in the initiation of mRNA translation. "| __truncated__
#>  $ affiliation          : chr "Department of Cell and Developmental Biology, John Innes Centre, Colney Lane, Norwich, NR4 7UH, UK."
#>  $ language             : chr "eng"
#>  $ pubModel             : chr "Print"
#>  $ pubTypeList          :List of 1
#>   ..$ pubType: chr [1:3] "Research Support, Non-U.S. Gov't" "research-article" "Journal Article"
#>  $ grantsList           :List of 1
#>   ..$ grant:List of 1
#>   .. ..$ :List of 3
#>   .. .. ..$ grantId: chr "BB/C507988/1"
#>   .. .. ..$ agency : chr "Biotechnology and Biological Sciences Research Council"
#>   .. .. ..$ orderIn: int 0
#>  $ meshHeadingList      :List of 1
#>   ..$ meshHeading:List of 14
#>   .. ..$ :List of 3
#>   .. .. ..$ majorTopic_YN    : chr "N"
#>   .. .. ..$ descriptorName   : chr "Arabidopsis"
#>   .. .. ..$ meshQualifierList:List of 1
#>   .. .. .. ..$ meshQualifier:List of 3
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "CY"
#>   .. .. .. .. .. ..$ qualifierName: chr "cytology"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "GE"
#>   .. .. .. .. .. ..$ qualifierName: chr "genetics"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "PH"
#>   .. .. .. .. .. ..$ qualifierName: chr "physiology"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "Y"
#>   .. ..$ :List of 3
#>   .. .. ..$ majorTopic_YN    : chr "N"
#>   .. .. ..$ descriptorName   : chr "Flowers"
#>   .. .. ..$ meshQualifierList:List of 1
#>   .. .. .. ..$ meshQualifier:List of 3
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "CY"
#>   .. .. .. .. .. ..$ qualifierName: chr "cytology"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "GE"
#>   .. .. .. .. .. ..$ qualifierName: chr "genetics"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "PH"
#>   .. .. .. .. .. ..$ qualifierName: chr "physiology"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. ..$ :List of 3
#>   .. .. ..$ majorTopic_YN    : chr "N"
#>   .. .. ..$ descriptorName   : chr "Meristem"
#>   .. .. ..$ meshQualifierList:List of 1
#>   .. .. .. ..$ meshQualifier:List of 3
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "CY"
#>   .. .. .. .. .. ..$ qualifierName: chr "cytology"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "GE"
#>   .. .. .. .. .. ..$ qualifierName: chr "genetics"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "PH"
#>   .. .. .. .. .. ..$ qualifierName: chr "physiology"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. ..$ :List of 3
#>   .. .. ..$ majorTopic_YN    : chr "N"
#>   .. .. ..$ descriptorName   : chr "Plant Roots"
#>   .. .. ..$ meshQualifierList:List of 1
#>   .. .. .. ..$ meshQualifier:List of 3
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "CY"
#>   .. .. .. .. .. ..$ qualifierName: chr "cytology"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "ME"
#>   .. .. .. .. .. ..$ qualifierName: chr "metabolism"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "PH"
#>   .. .. .. .. .. ..$ qualifierName: chr "physiology"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. ..$ :List of 3
#>   .. .. ..$ majorTopic_YN    : chr "N"
#>   .. .. ..$ descriptorName   : chr "Eukaryotic Initiation Factor-4A"
#>   .. .. ..$ meshQualifierList:List of 1
#>   .. .. .. ..$ meshQualifier:List of 3
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "GE"
#>   .. .. .. .. .. ..$ qualifierName: chr "genetics"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "ME"
#>   .. .. .. .. .. ..$ qualifierName: chr "metabolism"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "PH"
#>   .. .. .. .. .. ..$ qualifierName: chr "physiology"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "Y"
#>   .. ..$ :List of 3
#>   .. .. ..$ majorTopic_YN    : chr "N"
#>   .. .. ..$ descriptorName   : chr "Arabidopsis Proteins"
#>   .. .. ..$ meshQualifierList:List of 1
#>   .. .. .. ..$ meshQualifier:List of 2
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "GE"
#>   .. .. .. .. .. ..$ qualifierName: chr "genetics"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "PH"
#>   .. .. .. .. .. ..$ qualifierName: chr "physiology"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "Y"
#>   .. ..$ :List of 3
#>   .. .. ..$ majorTopic_YN    : chr "N"
#>   .. .. ..$ descriptorName   : chr "Protein Isoforms"
#>   .. .. ..$ meshQualifierList:List of 1
#>   .. .. .. ..$ meshQualifier:List of 3
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "GE"
#>   .. .. .. .. .. ..$ qualifierName: chr "genetics"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "ME"
#>   .. .. .. .. .. ..$ qualifierName: chr "metabolism"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "PH"
#>   .. .. .. .. .. ..$ qualifierName: chr "physiology"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. ..$ :List of 3
#>   .. .. ..$ majorTopic_YN    : chr "N"
#>   .. .. ..$ descriptorName   : chr "Cell Cycle"
#>   .. .. ..$ meshQualifierList:List of 1
#>   .. .. .. ..$ meshQualifier:List of 1
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "GE"
#>   .. .. .. .. .. ..$ qualifierName: chr "genetics"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. ..$ :List of 3
#>   .. .. ..$ majorTopic_YN    : chr "N"
#>   .. .. ..$ descriptorName   : chr "Mitosis"
#>   .. .. ..$ meshQualifierList:List of 1
#>   .. .. .. ..$ meshQualifier:List of 1
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "GE"
#>   .. .. .. .. .. ..$ qualifierName: chr "genetics"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>   .. ..$ :List of 2
#>   .. .. ..$ majorTopic_YN : chr "Y"
#>   .. .. ..$ descriptorName: chr "Cell Size"
#>   .. ..$ :List of 2
#>   .. .. ..$ majorTopic_YN : chr "N"
#>   .. .. ..$ descriptorName: chr "Homeostasis"
#>   .. ..$ :List of 2
#>   .. .. ..$ majorTopic_YN : chr "N"
#>   .. .. ..$ descriptorName: chr "Mutation"
#>   .. ..$ :List of 2
#>   .. .. ..$ majorTopic_YN : chr "N"
#>   .. .. ..$ descriptorName: chr "Genome, Plant"
#>   .. ..$ :List of 3
#>   .. .. ..$ majorTopic_YN    : chr "N"
#>   .. .. ..$ descriptorName   : chr "Ovule"
#>   .. .. ..$ meshQualifierList:List of 1
#>   .. .. .. ..$ meshQualifier:List of 2
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "GD"
#>   .. .. .. .. .. ..$ qualifierName: chr "growth & development"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "Y"
#>   .. .. .. .. ..$ :List of 3
#>   .. .. .. .. .. ..$ abbreviation : chr "ME"
#>   .. .. .. .. .. ..$ qualifierName: chr "metabolism"
#>   .. .. .. .. .. ..$ majorTopic_YN: chr "N"
#>  $ keywordList          :List of 1
#>   ..$ keyword: chr [1:7] "Arabidopsis thaliana" "Cell cycle" "Plant growth" "RNA helicase" ...
#>  $ chemicalList         :List of 1
#>   ..$ chemical:List of 3
#>   .. ..$ :List of 2
#>   .. .. ..$ name          : chr "Protein Isoforms"
#>   .. .. ..$ registryNumber: chr "0"
#>   .. ..$ :List of 2
#>   .. .. ..$ name          : chr "Eukaryotic Initiation Factor-4A"
#>   .. .. ..$ registryNumber: chr "EC 2.7.7.-"
#>   .. ..$ :List of 2
#>   .. .. ..$ name          : chr "Arabidopsis Proteins"
#>   .. .. ..$ registryNumber: chr "0"
#>  $ subsetList           :List of 1
#>   ..$ subset:List of 1
#>   .. ..$ :List of 2
#>   .. .. ..$ code: chr "IM"
#>   .. .. ..$ name: chr "Index Medicus"
#>  $ fullTextUrlList      :List of 1
#>   ..$ fullTextUrl:List of 3
#>   .. ..$ :List of 5
#>   .. .. ..$ availability    : chr "Open access"
#>   .. .. ..$ availabilityCode: chr "OA"
#>   .. .. ..$ documentStyle   : chr "pdf"
#>   .. .. ..$ site            : chr "Europe_PMC"
#>   .. .. ..$ url             : chr "http://europepmc.org/articles/PMC4737287?pdf=render"
#>   .. ..$ :List of 5
#>   .. .. ..$ availability    : chr "Open access"
#>   .. .. ..$ availabilityCode: chr "OA"
#>   .. .. ..$ documentStyle   : chr "html"
#>   .. .. ..$ site            : chr "Europe_PMC"
#>   .. .. ..$ url             : chr "http://europepmc.org/articles/PMC4737287"
#>   .. ..$ :List of 5
#>   .. .. ..$ availability    : chr "Subscription required"
#>   .. .. ..$ availabilityCode: chr "S"
#>   .. .. ..$ documentStyle   : chr "doi"
#>   .. .. ..$ site            : chr "DOI"
#>   .. .. ..$ url             : chr "https://doi.org/10.1111/tpj.13062"
#>  $ isOpenAccess         : chr "Y"
#>  $ inEPMC               : chr "Y"
#>  $ inPMC                : chr "N"
#>  $ hasPDF               : chr "Y"
#>  $ hasBook              : chr "N"
#>  $ hasSuppl             : chr "Y"
#>  $ citedByCount         : int 0
#>  $ hasReferences        : chr "Y"
#>  $ hasTextMinedTerms    : chr "Y"
#>  $ hasDbCrossReferences : chr "N"
#>  $ hasLabsLinks         : chr "Y"
#>  $ license              : chr "cc by"
#>  $ authMan              : chr "N"
#>  $ epmcAuthMan          : chr "N"
#>  $ nihAuthMan           : chr "N"
#>  $ hasTMAccessionNumbers: chr "N"
#>  $ dateOfCompletion     : chr "2016-12-13"
#>  $ dateOfCreation       : chr "2016-01-16"
#>  $ dateOfRevision       : chr "2016-12-30"
#>  $ firstPublicationDate : chr "2015-10-23"
```

**Get results number**

Count hits before with `epmc_hits` to define limit. For example, get list of ids
that represent articles referencing DataCite DOIs:


```r
query <- "ACCESSION_TYPE:doi"
epmc_hits(query)
```

```
#> [1] 9054
```

```r
# set limit to 10 records
my_data <- epmc_search(query = query, limit = 10)
head(my_data)
```

```
#> # A tibble: 6 x 27
#>         id source     pmid      pmcid                        doi
#>      <chr>  <chr>    <chr>      <chr>                      <chr>
#> 1 28994823    MED 28994823 PMC5634324     10.1038/sdata.2017.144
#> 2 28993608    MED 28993608 PMC5634421 10.1038/s41467-017-00565-w
#> 3 28972575    MED 28972575 PMC5625552     10.1038/sdata.2017.141
#> 4 28972570    MED 28972570 PMC5625556     10.1038/sdata.2017.139
#> 5 28970545    MED 28970545 PMC5624899 10.1038/s41598-017-12757-x
#> 6 28983202    MED 28983202 PMC5624428      10.5195/jmla.2017.176
#> # ... with 22 more variables: title <chr>, authorString <chr>,
#> #   journalTitle <chr>, journalVolume <chr>, pubYear <chr>,
#> #   journalIssn <chr>, pageInfo <chr>, pubType <chr>, isOpenAccess <chr>,
#> #   inEPMC <chr>, inPMC <chr>, hasPDF <chr>, hasBook <chr>,
#> #   hasSuppl <chr>, citedByCount <int>, hasReferences <chr>,
#> #   hasTextMinedTerms <chr>, hasDbCrossReferences <chr>,
#> #   hasLabsLinks <chr>, hasTMAccessionNumbers <chr>,
#> #   firstPublicationDate <chr>, issue <chr>
```

```r
attr(my_data, "hit_count")
```

```
#> [1] 9054
```

You may also use `epmc_profile` to retrieve a summary of hit counts.


```r
epmc_profile(query = 'malaria')
```

```
#> $source
#> # A tibble: 10 x 2
#>     name  count
#>  * <chr>  <int>
#>  1   AGR    121
#>  2   CBA    113
#>  3   CTX      7
#>  4   ETH    179
#>  5   HIR      4
#>  6   MED 122218
#>  7   PAT   2252
#>  8   CIT      0
#>  9   PMC  13740
#> 10   PPR      3
#> 
#> $pubType
#> # A tibble: 5 x 2
#>                  name  count
#> *               <chr>  <int>
#> 1                 ALL 138637
#> 2           FULL TEXT  88064
#> 3         OPEN ACCESS  42550
#> 4              REVIEW  16950
#> 5 BOOKS AND DOCUMENTS    117
#> 
#> $subset
#> # A tibble: 1 x 2
#>    name count
#> * <chr> <int>
#> 1    BL     3
```

**Get article details**

In addition to key metadata, `epmc_details` also returns full metadata
providing more comprehensive information on the article-level. By default,
PubMed / Medline index is searched.



```r
epmc_details(ext_id = '24270414')
```

```
#> $basic
#> # A tibble: 1 x 32
#>         id source     pmid      pmcid              doi
#> *    <chr>  <chr>    <chr>      <chr>            <chr>
#> 1 24270414    MED 24270414 PMC3859427 10.1172/jci73168
#> # ... with 27 more variables: title <chr>, authorString <chr>,
#> #   pubYear <chr>, pageInfo <chr>, abstractText <chr>, language <chr>,
#> #   pubModel <chr>, isOpenAccess <chr>, inEPMC <chr>, inPMC <chr>,
#> #   hasPDF <chr>, hasBook <chr>, hasSuppl <chr>, citedByCount <int>,
#> #   hasReferences <chr>, hasTextMinedTerms <chr>,
#> #   hasDbCrossReferences <chr>, hasLabsLinks <chr>, authMan <chr>,
#> #   epmcAuthMan <chr>, nihAuthMan <chr>, hasTMAccessionNumbers <chr>,
#> #   dateOfCompletion <chr>, dateOfCreation <chr>, dateOfRevision <chr>,
#> #   electronicPublicationDate <chr>, firstPublicationDate <chr>
#> 
#> $author_details
#> # A tibble: 2 x 6
#>           fullName firstName       lastName initials authorId.type
#> *            <chr>     <chr>          <chr>    <chr>         <chr>
#> 1 Malaga-Dieguez L     Laura Malaga-Dieguez        L         ORCID
#> 2        Susztak K   Katalin        Susztak        K          <NA>
#> # ... with 1 more variables: authorId.value <chr>
#> 
#> $journal_info
#> # A tibble: 1 x 13
#>   issue volume journalIssueId dateOfPublication monthOfPublication
#> * <chr>  <chr>          <int>             <chr>              <int>
#> 1    12    123        2099360          2013 Dec                 12
#> # ... with 8 more variables: yearOfPublication <int>,
#> #   printPublicationDate <chr>, journal.title <chr>,
#> #   journal.medlineAbbreviation <chr>, journal.essn <chr>,
#> #   journal.issn <chr>, journal.isoabbreviation <chr>, journal.nlmid <chr>
#> 
#> $ftx
#> # A tibble: 5 x 5
#>            availability availabilityCode documentStyle          site
#> *                 <chr>            <chr>         <chr>         <chr>
#> 1                  Free                F           pdf    Europe_PMC
#> 2                  Free                F          html    Europe_PMC
#> 3                  Free                F           pdf PubMedCentral
#> 4                  Free                F          html PubMedCentral
#> 5 Subscription required                S           doi           DOI
#> # ... with 1 more variables: url <chr>
#> 
#> $chemical
#> # A tibble: 4 x 2
#>                                     name registryNumber
#> *                                  <chr>          <chr>
#> 1                             Ubiquinone      1339-63-5
#> 2                        Protein Kinases       EC 2.7.-
#> 3 aarF domain containing kinase 4, human       EC 2.7.-
#> 4                           coenzyme Q10     EJ27X76M46
#> 
#> $mesh_topic
#> # A tibble: 5 x 2
#>   majorTopic_YN     descriptorName
#> *         <chr>              <chr>
#> 1             N            Animals
#> 2             N             Humans
#> 3             N Nephrotic Syndrome
#> 4             N         Ubiquinone
#> 5             N    Protein Kinases
#> 
#> $mesh_qualifiers
#> # A tibble: 4 x 4
#>       descriptorName abbreviation         qualifierName majorTopic_YN
#>                <chr>        <chr>                 <chr>         <chr>
#> 1 Nephrotic Syndrome           GE              genetics             Y
#> 2         Ubiquinone           AA analogs & derivatives             Y
#> 3         Ubiquinone           BI          biosynthesis             N
#> 4    Protein Kinases           PH            physiology             Y
#> 
#> $comments
#> # A tibble: 1 x 5
#>         id source                               reference       type
#> *    <chr>  <chr>                                   <chr>      <chr>
#> 1 24270420    MED J Clin Invest. 2013 Dec;123(12):5179-89 Comment on
#> # ... with 1 more variables: orderIn <int>
#> 
#> $grants
#> # A tibble: 3 x 4
#>        grantId        agency acronym orderIn
#> *        <chr>         <chr>   <chr>   <int>
#> 1 R01 DK076077 NIDDK NIH HHS      DK       0
#> 2  R01DK076077 NIDDK NIH HHS      DK       0
#> 3 R01 DK087635 NIDDK NIH HHS      DK       0
```

Show author details including ORCID:


```r
epmc_details(ext_id = '14756321')$author_details
```

```
#> # A tibble: 6 x 6
#>      fullName firstName  lastName initials authorId.type
#> *       <chr>     <chr>     <chr>    <chr>         <chr>
#> 1    Rosso MG   Mario G     Rosso       MG          <NA>
#> 2        Li Y      Yong        Li        Y          <NA>
#> 3  Strizhov N   Nicolai  Strizhov        N          <NA>
#> 4     Reiss B     Bernd     Reiss        B         ORCID
#> 5    Dekker K      Koen    Dekker        K          <NA>
#> 6 Weisshaar B     Bernd Weisshaar        B         ORCID
#> # ... with 1 more variables: authorId.value <chr>
```

**Get citation counts and citing publications**

Citing publications from the Europe PMC index can be retrieved like this:


```r
my_cites <- epmc_citations('9338777')
my_cites
```

```
#> # A tibble: 100 x 12
#>          id source
#>       <chr>  <chr>
#>  1 10221475    MED
#>  2 10342317    MED
#>  3 10440384    MED
#>  4  9696842    MED
#>  5  9703304    MED
#>  6  9728974    MED
#>  7  9728985    MED
#>  8  9728986    MED
#>  9  9728987    MED
#> 10 11134319    MED
#> # ... with 90 more rows, and 10 more variables: citationType <chr>,
#> #   title <chr>, authorString <chr>, journalAbbreviation <chr>,
#> #   pubYear <int>, volume <chr>, issue <chr>, pageInfo <chr>,
#> #   citedByCount <int>, text <chr>
```

```r
# hits:
attr(my_cites, 'hit_count')
```

```
#> [1] 208
```

Please note, that citation counts are often smaller than those held by toll-
access services such as Web of Science or Scopus because the number of
reference sections indexed for Europe PMC considerably differs due to the
lack of full text accessibility.

**Get reference section**

Europe PMC indexes more than 5 million reference sections.


```r
epmc_refs('PMC3166943', data_src = 'pmc')
```

```
#> # A tibble: 18 x 16
#>          id source    citationType
#>       <chr>  <chr>           <chr>
#>  1 10802651    MED JOURNAL ARTICLE
#>  2     <NA>   <NA>            <NA>
#>  3 18077472    MED JOURNAL ARTICLE
#>  4 15642104    MED JOURNAL ARTICLE
#>  5 18460184    MED JOURNAL ARTICLE
#>  6 17989687    MED JOURNAL ARTICLE
#>  7 20848809    MED JOURNAL ARTICLE
#>  8 20139945    MED JOURNAL ARTICLE
#>  9     <NA>   <NA>            <NA>
#> 10 17267433    MED JOURNAL ARTICLE
#> 11 15199967    MED JOURNAL ARTICLE
#> 12 14681407    MED JOURNAL ARTICLE
#> 13 16756499    MED JOURNAL ARTICLE
#> 14 16959967    MED JOURNAL ARTICLE
#> 15 16518471    MED JOURNAL ARTICLE
#> 16 11901169    MED JOURNAL ARTICLE
#> 17 15892874    MED JOURNAL ARTICLE
#> 18     <NA>   <NA>            <NA>
#> # ... with 13 more variables: title <chr>, authorString <chr>,
#> #   journalAbbreviation <chr>, issue <chr>, pubYear <int>, volume <chr>,
#> #   pageInfo <chr>, citedOrder <int>, match <chr>, essn <chr>, issn <chr>,
#> #   publicationTitle <chr>, externalLink <chr>
```

Tip: add `has_reflist:y` to your search string in `epmc_search` to make sure
you only get publications whose reference sections are accessible through
Europe PMC.

**Retrieve links to other EBI databases**

Cross-links to EBI databases are either manually curated (ENA, InterPro, PDB,
IntAct, ChEMBL, ChEBI and ArrayExpress) or automatically gathered through
text-mining (European Nucleotide Archive, UniProt, PDB, OMIM, RefSNP, RefSeq,
Pfam, InterPro, Ensembl, ArrayExpress and data DOIs).

Before retrieving the links, please check availability and sources first:


```r
epmc_db_count('12368864')
```

```
#> # A tibble: 3 x 2
#>     dbName count
#> *    <chr> <int>
#> 1     EMBL    10
#> 2 INTERPRO     1
#> 3  UNIPROT  5588
```

Add `has_xrefs:y` or to your search string in `epmc_search` to make sure
you only get publications with cross-references to EBI databases.

Select database and get links:


```r
epmc_db('12368864', db = 'embl')
```

```
#> # A tibble: 10 x 4
#>       info1                                                       info2
#>       <chr>                                                       <chr>
#>  1 AE014187 Plasmodium falciparum 3D7 chromosome 14, complete sequence.
#>  2 AE014186 Plasmodium falciparum 3D7 chromosome 11, complete sequence.
#>  3 LN999943  Plasmodium falciparum 3D7 chromosome 2, complete sequence.
#>  4 AE001362  Plasmodium falciparum 3D7 chromosome 2, complete sequence.
#>  5 LN999947 Plasmodium falciparum 3D7 chromosome 12, complete sequence.
#>  6 AE014185 Plasmodium falciparum 3D7 chromosome 10, complete sequence.
#>  7 LN999944 Plasmodium falciparum 3D7 chromosome 10, complete sequence.
#>  8 LN999945 Plasmodium falciparum 3D7 chromosome 11, complete sequence.
#>  9 LN999946 Plasmodium falciparum 3D7 chromosome 14, complete sequence.
#> 10 AE014188 Plasmodium falciparum 3D7 chromosome 12, complete sequence.
#> # ... with 2 more variables: info3 <chr>, info4 <chr>
```

**Get text-mined terms**

Text-mined terms that can be accessed via Europe PMC are mapped against
controlled vocabularies like [Gene Ontology](http://www.geneontology.org/).

Before retrieving these terms, please check availability and vocabularies
first:


```r
epmc_tm_count('25249410')
```

```
#> # A tibble: 7 x 2
#>           name count
#> *        <chr> <int>
#> 1    accession     1
#> 2     chemical    25
#> 3      disease     1
#> 4          efo    28
#> 5 gene_protein    51
#> 6      go_term    17
#> 7     organism    27
```

Select vocabulary to retrieve the terms:


```r
epmc_tm('25249410', semantic_type = 'GO_TERM')
```

```
#>                             term count              altName dbName    dbId
#> 1                     chromosome    25          chromosomes     GO 0005694
#> 2                   biosynthesis    16 formation, synthesis     GO 0009058
#> 3                        binding     9                          GO 0005488
#> 4                          cells     5                 cell     GO 0005623
#> 5                         growth     4               Growth     GO 0040007
#> 6         flavonoid biosynthesis     3                          GO 0009813
#> 7                gene expression     2                          GO 0010467
#> 8           secondary metabolism     2                          GO 0019748
#> 9                     metabolism     2                          GO 0008152
#> 10             defense responses     1                          GO 0006952
#> 11            cell cycle control     1                          GO 1901987
#> 12 regulation of gene expression     1                          GO 0010468
#> 13    glucosinolate biosynthesis     1                          GO 0019761
#> 14              cell development     1                          GO 0048468
#> 15                    root hairs     1                          GO 0035618
#> 16      anthocyanin biosynthesis     1                          GO 0009718
#> 17             enzyme activities     1                          GO 0003824
```

**Links to external sources**

With the External Link services, Europe PMC allows third parties to publish
links from Europe PMC to other webpages. Current External Link providers,
whose id can be found through Europe PMC's Advanced Search interface, include
Wikipedia, Dryad Digital Repository or the institutional repo of Bielefeld
University. For more information, see <http://europepmc.org/labslink>.

Check availability and number of links:


```r
epmc_lablinks_count('PMC3986813', data_src = 'pmc')
```

```
#> # A tibble: 5 x 2
#>       providerName linksCount
#> *            <chr>      <int>
#> 1 EBI Train Online          1
#> 2        Wikipedia          1
#> 3       BioStudies          1
#> 4          Publons          1
#> 5        Altmetric          1
```

Get links from Wikipedia (`lab_id = '1507'`)


```r
epmc_lablinks('20301687', lab_id = '1507')
```

```
#> # A tibble: 2 x 6
#>                                    title
#>                                    <chr>
#> 1                        Werner_syndrome
#> 2 Werner_syndrome_ATP-dependent_helicase
#> # ... with 5 more variables: url <chr>, imgUrl <lgl>, lab_id <int>,
#> #   lab_name <fctr>, lab_description <fctr>
```

**Full text access**

Full texts are in XML format and are only provided for the Open Access subset
of Europe PMC. They can be retrieved by the PMCID.


```r
epmc_ftxt('PMC3257301')
```

```
#> {xml_document}
#> <article article-type="research-article" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:mml="http://www.w3.org/1998/Math/MathML">
#> [1] <front>\n  <journal-meta>\n    <journal-id journal-id-type="nlm-ta"> ...
#> [2] <body>\n  <sec id="s1">\n    <title>Introduction</title>\n    <p>Atm ...
#> [3] <back>\n  <ack>\n    <p>We would like to thank Dr. C. Gourlay and Dr ...
```

Books, fetched through the PMID or the 'NBK' book number, can also be loaded
as XML into R for further text-mining activities using `epmc_ftxt_book()`.


Please check full-text availability before calling this method either with `epmc_search()` or `epmc_details()`.



### Citing

To cite `europepmc` in publications use:

> Najko Jahn (2017). europepmc: R Interface to the Europe PubMed Central RESTful Web Service. R
  package version 0.1.4. https://cran.rstudio.com/package=europepmc


### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for europepmc](https://github.com/ropensci/europepmc/issues?state=open)

[Back to top](#top)
