---
slug: "phylotar"
title: "phylotaR: Retrieve Orthologous Sequences from GenBank"
package_version: 1.0.0
authors:
  - name: Dom Bennett
    url: https://github.com/dombennett
date: 2018-07-30
categories: technote
topicid: 1256
tags:
- r
- ropensci
- community
- software
- review
- onboarding
- package
- evolution
- bioinformatics
- phylogenetics
- genbank
- dna
- sequences
---

## What is phylotaR?



## Installation

phylotaR is available from CRAN.

```r
install.packages('phylotaR')
```

Alternatively, the latest development version can be downloaded from phylotaR's [GitHub page](https://github.com/ropensci/phylotaR).

```r
devtools::install_github(repo = 'ropensci/phylotaR', build_vignettes = TRUE)
```

### BLAST+

In addition to the R package a user will also need to have installed BLAST+ -- a local copy of the well-known [BLAST software](https://en.wikipedia.org/wiki/BLAST) on your machine. Unfortnately this can be a little complex as its installation depends on your operating system (Windows, Mac or Linux). Fortunately, NCBI provides detailed installation instructions for each flavour of operating system.

**To install BLAST+ on your local machine follow the [NCBI installation instructions](https://www.ncbi.nlm.nih.gov/books/NBK279671/).**

Once BLAST+ is intalled you will need to record the location of the BLAST+ file system path where the exectuable programs are located. This should be something like `C:\users\tao\desktop\blast-2.2.29+\bin\` on a Windows machine or `/usr/local/ncbi/blast/bin/` on a Unix.

## Quick guide

### Taxonomic ID

After installation, a phylotaR pipeline can be launched with the `setup()` and `run()` functions. Before launching a run, a user must first look up the NCBI taxonomic ID for their chosen taxonomic group. To find the ID of your taxon, search [NCBI taxonomy](https://www.ncbi.nlm.nih.gov/taxonomy) using the scientific name or an English common name. For example, upon searching for the primate genus 'Aotus' we should come across this [page](https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=9504) which states the taxonomic ID as `9504`.

Because names are not unique phylotaR does not allow names to be used instead of taxonomic IDs. Aotus is a good example as there is also a plant genus of the same name. If we were to search NCBI with just the name then we would be downloading a mixture of primate and plant DNA. Such is the importance of IDs. (You could automate this step yourself using the [taxize](https://github.com/ropensci/taxize) package.)

### Running

With the package installed, BLAST+ available and ID to hand, we can run our pipeline.

```r
# load phylotaR
library(phylotaR)
# create a folder to hold the cached data and results
dir.create('aotus')
# setup the folder and check that BLAST is available
setup(wd = wd, txid = 9504, ncbi_dr = '/usr/local/ncbi/blast/bin/')
# run the pipeline
run(wd = wd)
```

For more details on running the pipeline, such as changing the parameters or understanding the results, see the vignette, `vignette('phylotaR)'` or visit the [website](https://ropensci.github.io/phylotaR/).

### Timings

The time it takes for a pipeline to complete depends on the number of taxonomic groups a taxon contains and the number of sequences it represents. The genus Aotus has more species than the great apes but the latter will take far long because it represents highly well-sequenced species.


Taxon|N. taxa|N. sequences|Time taken (mins.)|
|:--|--:|--:|--:|
Anisoptera|1175|11432|72|
Acipenseridae|51|2407|13|
Tinamiformes|25|251|2.7|
Aotus|13|1499|3.9|
Bromeliaceae|1171|9833|66|
Cycadidae|353|8331|37|
Eutardigrada|261|960|14|
Kazachstania|40|623|23|
Platyrrhini|212|12731|60|

### Visualising the output



## Future

## Useful Links

* [The phylotaR wesbite](https://ropensci.github.io/phylotaR/)
* [The original PhyLoTa website](http://phylota.net/)
* [BLAST+ installation and usage instructions](https://www.ncbi.nlm.nih.gov/books/NBK279671/)
* [GenBank](https://www.ncbi.nlm.nih.gov/genbank/)
* [phylotaR on GitHub](https://github.com/ropensci/phylotaR)

## References

Bennett, D., Hettling, H., Silvestro, D., Zizka, A., Bacon, C., Faurby, S., … Antonelli, A. (2018). phylotaR: An Automated Pipeline for Retrieving Orthologous DNA Sequences from GenBank in R. *Life*, **8**(2), 20. [DOI:10.3390/life8020020](https://doi.org/10.3390/life8020020)

Sanderson, M. J., Boss, D., Chen, D., Cranston, K. A., & Wehe, A. (2008). The PhyLoTA Browser: Processing GenBank for molecular phylogenetics research. *Systematic Biology*, **57**(3), 335–346. [DOI:10.1080/10635150802158688](https://doi.org/10.1080/10635150802158688)
