---
slug: rentrez-1_0-release
title: Rentrez 1_0 released
date: '2015-09-24'
author:
  - David Winter
tags:
  - R
  - CRAN
  - rentrez
  - packages
  - NCBI
---


A new version of `rentrez`, our package for the NCBI's EUtils API, is making
it's way around the CRAN mirrors. This release represents a substantial
improvement to `rentrez`, including a [new vignette](https://cran.r-project.org/web/packages/rentrez/vignettes/rentrez_tutorial.html)
that documents the whole package.

This posts describes some of the new things in `rentrez`, and gives us a chance
to thank some of the people that have contributed to this package's development.

## Thanks

Thanks to everyone who has filed and issue or written us an email about `rentrez`,
your contributions have been an important part of the package's development. In particular, we welcome
[Han Guangchun](http://ewrebio.me) as a new contributor to `rentrez` and thank
[Matthew O'Meara](http://docking.org/~momeara/) for posting
an issue that brought the `by_id` mode for `entrez_link`  (discussed below) to our
attention.

##The New Stuff

###Extract elements from the results of `entrez_summary()`

The NCBI's "summary records" are very useful -- they provide the most important
information about a given record in a relatively small and simple file. `rentrez`
provides the function `entrez_summary()` to retrieve these records. When more
than one unique ID is passed to `entrez_summary` the function returns a list of
esummary objects. For instance, you could find all the genetic variants associated
with asthma by finding links between the [OMIM record for asthma](https://www.omim.org/entry/600807) and records in the database dbSNP:


```r
snps <- entrez_link(dbfrom="omim", db="snp", id= 600807)
snp_summs <- entrez_summary(db="snp", id=snps$links$omim_snp)
```

A very common use-case for `entrez_summary()` is to extract a subset of the
elements from each record in that list. This release includes the function
`extract_from_esummary` to make this as straightforward as possible. It works with
a single element to extract:


```r
extract_from_esummary(snp_summs, "chr")
```

```
## 11079657  2786098  1031772  1031771   545659
##     "17"      "1"      "2"      "2"     "11"
```

Or with multiple elements

```r
summary_table <- extract_from_esummary(snp_summs, c("chr", "global_maf", "fxn_class"))
t(summary_table)
```

```
##          chr  global_maf      fxn_class
## 11079657 "17" "A=0.4295/2151" "intron-variant"
## 2786098  "1"  "T=0.1569/786"  "intron-variant"
## 1031772  "2"  "G=0.2131/1067" "downstream-variant-500B"
## 1031771  "2"  "T=0.2582/1293" ""
## 545659   "11" "C=0.3419/1712" "utr-variant-3-prime"
```

###`entrez_link` can find external links

In addition to discovering links between records in NCBI databases, the function
`entrez_link` now provides support for finding external links ('linkouts' in
NCBI terminology). Perhaps the most interesting example is finding links for the
full text of articles in PubMed.

Let's try and find the full text of the paper describing [taxize](https://github.com/ropensci/taxize) (using that article's PMID). To
override the functions default behaviour (finding links within NCBI databases)
we set the `cmd` argument to `llinks` (short for library links):


```r
taxize_links <- entrez_link(dbfrom="pubmed", id= 24555091, cmd="llinks")
taxize_links
```

```
## elink object with contents:
##  $linkouts: links to external websites
```

The print function for this object tells you were the links live.


```r
taxize_links$linkouts
```

```
## $ID_24555091
## $ID_24555091[[1]]
## Linkout from F1000 Research Ltd
##  $Url: http://f1000research.com/a ...
##
## $ID_24555091[[2]]
## Linkout from Europe PubMed Central
##  $Url: http://europepmc.org/abstr ...
##
## $ID_24555091[[3]]
## Linkout from PubMed Central
##  $Url: http://www.ncbi.nlm.nih.go ...
##
## $ID_24555091[[4]]
## Linkout from PubMed Central Canada
##  $Url: http://pubmedcentralcanada ...
```

Each of those elements has a lot of information, but the URLs for each object
are probably the most important. For this reason, `rentrez` provides a function
to get just the URLs:


```r
linkout_urls(taxize_links)
```

```
## $ID_24555091
## [1] "http://f1000research.com/articles/10.12688/f1000research.2-191.v2/doi"
## [2] "http://europepmc.org/abstract/MED/24555091"
## [3] "http://www.ncbi.nlm.nih.gov/pmc/articles/pmid/24555091/"
## [4] "http://pubmedcentralcanada.ca/pmcc/articles/pmid/24555091"
```

###Web History features are easier to use

The NCBI provides a "Web History" feature to let users store the results of their
searches on the NCBI's severs and refer to those results without having to
pass unique ID's back and forth between computers. These features have always been
supported by `rentrez` but this release makes them easier to use.

Specifically, when the new optional argument `use_history` is set to `TRUE`
functions will return a `web_history` object which can be used in the place of unique
IDs in calls to `entrez_fetch`, `entrez_summary` or `entrez_link`.

To demonstrate, let's search for PubMed articles about the ciliate genus
_Tetrahymena_:



```r
Tet_papers <- entrez_search(db="pubmed", term="Tetrahymena[ORGN]", use_history=TRUE)
Tet_papers
```

```
## Entrez search result with 6599 hits (object contains 20 IDs and a web_history object)
##  Search term (as translated):  "tetrahymena"[MeSH Terms] OR "tetrahymena"[All Fie ...
```
Now that we have a web_history object, we can use that to retrieve XML representations
of the first 10 records:


```r
recs <- entrez_fetch(db="pubmed",
                     web_history=Tet_papers$web_history,
                     retmax=10, rettype="xml")
```

###It's easier to keep track of which records are linked to other records

By default, when `entrez_link` gets a vector of more than one unique ID, it
returns sets of linked-IDs that match _any_ of the IDs in the original call.
That means the user loses track of the mapping between the original IDs and those
from the linked database.

As of this release, `rentrez` supports the NCBI's `by_id` mode, which solves this problem.
Setting the new argument `by_id` to `TRUE` returns a list, with each element of
that list containing links for only one ID. To demonstrate, let's find protein
sequences associated with specific genes in the NCBI `gene` database:



```r
all_links  <- entrez_link(db="protein",
                          dbfrom="gene",
                          id=c(93100, 223646),
                          by_id=TRUE)

all_links
```

```
## List of 2 elink objects,each containing
##   $links: IDs for linked records from NCBI
##
```

As you can see, printing the returned object let's you know what each element
contains, and you can extract the specific links you are looking for easily:


```r
lapply(all_links, function(x) x$links$gene_protein)
```

```
## [[1]]
##  [1] "768043930" "767953815" "558472750" "194394158" "166221824"
##  [6] "154936864" "119602646" "119602645" "119602644" "119602643"
## [11] "119602642" "37787309"  "37787307"  "37787305"  "33991172"
## [16] "21619615"  "10834676"
##
## [[2]]
##  [1] "148697547" "148697546" "81899807"  "74215266"  "74186774"
##  [6] "37787317"  "37589273"  "31982089"  "26339824"  "26329351"
```


## The rest

There are also numerous small changes that improve `rentrez`, fix bugs and
extend the package's documentation. We hope you find this new release helpful,
and as always we welcome bug reports via the [package's github repository](https://github.com/ropensci/rentrez/issues).
