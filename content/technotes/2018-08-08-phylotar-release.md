---
slug: "phylotar"
title: "phylotaR: Retrieve Orthologous Sequences from GenBank"
package_version: 1.0.0
authors:
  - name: Dom Bennett
    url: https://github.com/dombennett
date: 2018-08-08
categories: technote
topicid:
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
- data-access
- taxonomy
---

## What is phylotaR?

In any phylogenetic analysis it is important to identify sequences that share the same orthology. This is often performed by searching an online sequence repository, such as GenBank, using a gene/region name and the taxa of interest, e.g. 'Aotus' and 'cytochrome oxidase'. Relying solely on sequence labels, however, can miss sequences that have either not been labelled, have unanticipated names or have been mislabelled.

The phylotaR R package, like its earlier inspiration [PhyLoTa](http://phylota.net/), identifies sequences of shared orthology not by naming matching but instead through the use of an alignment search tool, [BLAST](https://en.wikipedia.org/wiki/BLAST). As a result, a user of phylotaR will able to download more relevant sequence data for their phylogenetic analysis than they otherwise would.

The entire phylotaR pipeline is automated and all a user needs to supply is a taxonomic group of interest for which the user would like to identify ortholgous sequences. The pipeline is broken down into four stages: retrieve taxonomic information, download sequences, identify clusters, identify clusters among the clusters.

![phylotaR pipeline stages](/img/blog-images/2018-08-08-phylotar/stages.png)

*The stages of phylotaR pipeline: taxise, download, cluster and cluster^2. Note, 'taxise' is the name of a stage and does not relate to the package `taxize`.*

For more information on how the pipeline works, please see the open-access scientific article: [phylotaR: An Automated Pipeline for Retrieving Orthologous DNA Sequences from GenBank in R](https://doi.org/10.3390/life8020020)


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

In addition to the R package you will also need to have installed BLAST+ -- a local copy of the well-known [BLAST software](https://en.wikipedia.org/wiki/BLAST) on your machine. Unfortunately this can be a little complex as its installation depends on your operating system (Windows, Mac or Linux). Fortunately, NCBI provides detailed installation instructions for each flavour of operating system: [NCBI installation instructions](https://www.ncbi.nlm.nih.gov/books/NBK279671/).

Once BLAST+ is intalled you will need to record the location of the BLAST+ file system path where the exectuable programs are located. This should be something like `C:\users\tao\desktop\blast-2.2.29+\bin\` on a Windows machine or `/usr/local/ncbi/blast/bin/` on a Unix.

## Quick guide

### Taxonomic ID

After installation, a phylotaR pipeline can be launched with the `setup()` and `run()` functions. Before launching a run, a user must first look up the NCBI taxonomic ID for their chosen taxonomic group. To find the ID of your taxon, search [NCBI taxonomy](https://www.ncbi.nlm.nih.gov/taxonomy) using the scientific name or an English common name. For example, upon searching for the primate genus 'Aotus' we should come across this [page](https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=9504) which states the taxonomic ID as `9504`.

Because names are not unique phylotaR does not allow names to be used instead of taxonomic IDs. Aotus is a good example as there is also a plant genus of the same name. If we were to search NCBI with just the name then we would be downloading a mixture of primate and plant DNA. Such is the importance of IDs. (Alternatively, you could automate this step yourself using the [taxize](https://github.com/ropensci/taxize) package.)

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
# ^^ running should take about 5 minutes to complete
```

For more details on running the pipeline, such as changing the parameters or understanding the results, see the vignette, `vignette('phylotaR')` or visit the [website](https://ropensci.github.io/phylotaR/).

### Timings

The time it takes for a pipeline to complete depends on the number of taxonomic groups a taxon contains and the number of sequences it represents. Below are some examples of the time taken for various taxonomic groups.

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

### Reviewing the results

After a pipeline has completed, the `wd` will contain all the results files. The information contained within these files can be read into the R environment using the `read_phylota()` function. It will generate a `Phylota` object that contains information on all the identified 'clusters' -- i.e. groups of ortholgous sequences. A user can interact with the object to filter out unwanted sequences, clusters or taxonomic groups. The package comes with completed results for playing with. In the example below, we demonstrate how to generate a presence/absence matrix of all the genera in the top 10 clusters identifed for cycads.

```r
library(phylotaR)
data(cycads)
# drop all but first ten
cycads <- drop_clstrs(cycads, cycads@cids[1:10])
# get genus-level taxonomic names
genus_txids <- get_txids(cycads, txids = cycads@txids, rnk = 'genus')
genus_txids <- unique(genus_txids)
# dropping missing
genus_txids <- genus_txids[genus_txids !=  '']
genus_nms <- get_tx_slot(cycads, genus_txids, slt_nm = 'scnm')
# make alphabetical for plotting
genus_nms <- sort(genus_nms, decreasing = TRUE)
# generate geom_object
p <- plot_phylota_pa(phylota = cycads, cids = cycads@cids, txids = genus_txids,
                     txnms = genus_nms)
# plot
print(p)
```

![presenceabsence of cycad genera](/img/blog-images/2018-08-08-phylotar/pa.png)

In this next example, we create a treemap showing the differences in the number of sequences and clusters identifed between genera in tinamous, [8802](https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=8802). (For the unintiated, [tinamous](https://en.wikipedia.org/wiki/Tinamou) are semi-flightless birds found in South America and members of the ratities, the same group comprising of ostrichs and kiwis.)

```r
library(phylotaR)
data(tinamous)
# Plot taxa, size by n. sq, fill by ncl
txids <- get_txids(tinamous, txids = tinamous@txids, rnk = 'genus')
txids <- txids[txids !=  '']
txids <- unique(txids)
txnms <- get_tx_slot(tinamous, txids, slt_nm = 'scnm')
p <- plot_phylota_treemap(phylota = tinamous, txids = txids, txnms = txnms,
                          area = 'nsq', fill = 'ncl')
print(p)
```

![treemap of tinmous genera](/img/blog-images/2018-08-08-phylotar/treemap.png)

For more information on manipulating the Phylota object, see the [phylotaR website](https://ropensci.github.io/phylotaR/).

## Future

We have many ideas on improving phylotaR, such as making use of the BLAST API -- instead of relying on users installing BLAST+ on their machine -- and allowing users to introduce their own non-GenBank sequences. Please see the [contributing page](https://github.com/ropensci/phylotaR/blob/master/CONTRIBUTING.md) for a complete and current list of development options. Fork requests are welcome!

Alternatively, if you have any ideas of your own for new features than please open a [new issue](https://github.com/ropensci/phylotaR/issues).

## Acknowledgements

Big thanks to [Zebulun Arendsee](https://github.com/arendsee), [Naupaka Zimmerman](https://github.com/naupaka) and [Scott Chamberlain](https://github.com/sckott) for reviewing/editing the package for ROpenSci.

## Useful Links

* [The phylotaR wesbite](https://ropensci.github.io/phylotaR/)
* [The original PhyLoTa website](http://phylota.net/)
* [BLAST+ installation and usage instructions](https://www.ncbi.nlm.nih.gov/books/NBK279671/)
* [GenBank](https://www.ncbi.nlm.nih.gov/genbank/)
* [phylotaR on GitHub](https://github.com/ropensci/phylotaR)

## References

Bennett, D., Hettling, H., Silvestro, D., Zizka, A., Bacon, C., Faurby, S., … Antonelli, A. (2018). phylotaR: An Automated Pipeline for Retrieving Orthologous DNA Sequences from GenBank in R. *Life*, **8**(2), 20. [DOI:10.3390/life8020020](https://doi.org/10.3390/life8020020)

Sanderson, M. J., Boss, D., Chen, D., Cranston, K. A., & Wehe, A. (2008). The PhyLoTA Browser: Processing GenBank for molecular phylogenetics research. *Systematic Biology*, **57**(3), 335–346. [DOI:10.1080/10635150802158688](https://doi.org/10.1080/10635150802158688)
