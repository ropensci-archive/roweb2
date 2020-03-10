---
slug: open-data-growth
title: Growth of open data in biology
date: '2014-11-10'
author:
  - Scott Chamberlain
tags:
  - R
  - data
---



## Why open data growth

At rOpenSci we try to make it easier for people to use open data and contribute open data to the community. The question often arises: How much open data do we have? Another angle on this topic is: How much is open data growing?

We provide access to dozens of data respositories through our various packages. We asked many of them to share numbers on the amount of data they have, and if possible, growth of their data holdings through time. Many of our partners came through with some data. Note that the below is biased towards those data sources we were able to get data from, and those that we were able to get growth through time data. In addition, note that much of the data we use below was from fall of 2013 (last year) - so the below is based on somewhat old data, but surely the trends are likely still the same now.

We collated data from the different sources, and made some pretty graphs using the data. Here's what we learned (see last section on how to reproduce this analysis):


## Size of open data

Of the data sources we have data for, how much data is there? The expression of size of data is somewhat different for different sources, so the below is a bit heterogeous, but nonetheless coveys that there is a lot of open data.






```r
rbind(df1, df2) %>%
  mutate(
    type = c('Phenology records','Phylogenetic trees','Taxonomic names','Checklist records','Observations','Taxonomic names','Source databases','Titles','Items','Names','Pages','Species occurrence records','Data publishers','Taxonomic names','Data records','Datasets','Articles','Data packages','SNPs','Users','Genotypes','Data records'),
    source = c('NPN','Treebase','ITIS','eBird','eBird','COL','COL','BHL','BHL','BHL','BHL','GBIF','GBIF','Neotoma','Neotoma','Neotoma','PLOS','Dryad','OpenSNP','OpenSNP','OpenSNP','DataCite')
  ) %>%
  arrange(type, desc(value)) %>%
  kable(format = "html")
```

<table class="table table-bordered table-striped">
 <thead>
  <tr>
   <th style="text-align:left;"> source </th>
   <th style="text-align:right;"> value </th>
   <th style="text-align:right;"> type </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> PLOS </td>
   <td style="text-align:right;"> 137358 </td>
   <td style="text-align:right;"> Articles </td>
  </tr>
  <tr>
   <td style="text-align:left;"> eBird </td>
   <td style="text-align:right;"> 205970 </td>
   <td style="text-align:right;"> Checklist records </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Dryad </td>
   <td style="text-align:right;"> 4186 </td>
   <td style="text-align:right;"> Data packages </td>
  </tr>
  <tr>
   <td style="text-align:left;"> GBIF </td>
   <td style="text-align:right;"> 578 </td>
   <td style="text-align:right;"> Data publishers </td>
  </tr>
  <tr>
   <td style="text-align:left;"> DataCite </td>
   <td style="text-align:right;"> 3618096 </td>
   <td style="text-align:right;"> Data records </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Neotoma </td>
   <td style="text-align:right;"> 2202656 </td>
   <td style="text-align:right;"> Data records </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Neotoma </td>
   <td style="text-align:right;"> 11617 </td>
   <td style="text-align:right;"> Datasets </td>
  </tr>
  <tr>
   <td style="text-align:left;"> OpenSNP </td>
   <td style="text-align:right;"> 589 </td>
   <td style="text-align:right;"> Genotypes </td>
  </tr>
  <tr>
   <td style="text-align:left;"> BHL </td>
   <td style="text-align:right;"> 139561 </td>
   <td style="text-align:right;"> Items </td>
  </tr>
  <tr>
   <td style="text-align:left;"> BHL </td>
   <td style="text-align:right;"> 155891133 </td>
   <td style="text-align:right;"> Names </td>
  </tr>
  <tr>
   <td style="text-align:left;"> eBird </td>
   <td style="text-align:right;"> 2923886 </td>
   <td style="text-align:right;"> Observations </td>
  </tr>
  <tr>
   <td style="text-align:left;"> BHL </td>
   <td style="text-align:right;"> 43968949 </td>
   <td style="text-align:right;"> Pages </td>
  </tr>
  <tr>
   <td style="text-align:left;"> NPN </td>
   <td style="text-align:right;"> 2537095 </td>
   <td style="text-align:right;"> Phenology records </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Treebase </td>
   <td style="text-align:right;"> 1515 </td>
   <td style="text-align:right;"> Phylogenetic trees </td>
  </tr>
  <tr>
   <td style="text-align:left;"> OpenSNP </td>
   <td style="text-align:right;"> 2140939 </td>
   <td style="text-align:right;"> SNPs </td>
  </tr>
  <tr>
   <td style="text-align:left;"> COL </td>
   <td style="text-align:right;"> 132 </td>
   <td style="text-align:right;"> Source databases </td>
  </tr>
  <tr>
   <td style="text-align:left;"> GBIF </td>
   <td style="text-align:right;"> 420222471 </td>
   <td style="text-align:right;"> Species occurrence records </td>
  </tr>
  <tr>
   <td style="text-align:left;"> COL </td>
   <td style="text-align:right;"> 1352112 </td>
   <td style="text-align:right;"> Taxonomic names </td>
  </tr>
  <tr>
   <td style="text-align:left;"> ITIS </td>
   <td style="text-align:right;"> 624282 </td>
   <td style="text-align:right;"> Taxonomic names </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Neotoma </td>
   <td style="text-align:right;"> 20152 </td>
   <td style="text-align:right;"> Taxonomic names </td>
  </tr>
  <tr>
   <td style="text-align:left;"> BHL </td>
   <td style="text-align:right;"> 77258 </td>
   <td style="text-align:right;"> Titles </td>
  </tr>
  <tr>
   <td style="text-align:left;"> OpenSNP </td>
   <td style="text-align:right;"> 1230 </td>
   <td style="text-align:right;"> Users </td>
  </tr>
</tbody>
</table>

## Growth in open data

First, we have to convert all the date-like fields to proper date classes. The work is not shown - look at [the code][thecode] if you want the details.






## Run down of each data source

### Dryad

* Website: https://datadryad.org/
* R package: `rdryad`

Dryad is a repository of datasets associated with published papers. We do have an R package on CRAN (`rdryad`), but it is waiting on an update for the new API services being built by the Dryad folks. We did recently add in access to their Solr endpoint - [check it out](https://github.com/ropensci/rdryad/blob/master/R/dryad_solr.r#L8-L41).


```r
dryad %>% sort_count %>% gp
```

![plot of chunk unnamed-chunk-7](/assets/blog-images/2014-11-10-open-data-growth/unnamed-chunk-7-1.png)

### OpenSNP

* Website: https://opensnp.org//
* R package: `rsnps`

OpenSNP is a collator of SNP datasets that individuals donate to the site/database. They're an awesome group, and they even won the PLOS/Mendeley code contest a few years back.


```r
opensnp_genotypes <- opensnp_genotypes %>% mutate(type = "genotyptes") %>% sort_count
opensnp_phenotypes <- opensnp_phenotypes %>% mutate(type = "phenotyptes") %>% sort_count
opensnp_snps <- opensnp_snps %>% mutate(type = "snps") %>% sort_count
opensnp_users <- opensnp_users %>% mutate(type = "users") %>% sort_count
os_all <- rbind(opensnp_genotypes, opensnp_phenotypes, opensnp_snps, opensnp_users)
os_all %>%
  ggplot(aes(date, log10(count), color=type)) +
    geom_line() +
    theme_grey(base_size = 18) +
    theme(legend.position = "top")
```

![plot of chunk unnamed-chunk-8](/assets/blog-images/2014-11-10-open-data-growth/unnamed-chunk-8-1.png)

### Datacite

* Website: https://www.datacite.org/
* R package: `rdatacite`

DataCite mints DOIs for datasets, and holds metadata for those datasets provided by data publishers. They have


```r
dcite %>% sort_count %>% gp
```

![plot of chunk unnamed-chunk-9](/assets/blog-images/2014-11-10-open-data-growth/unnamed-chunk-9-1.png)

### US National Phenology Network (USNPN or NPN)

* Website: https://www.usanpn.org/
* R package: `rnpn`

The US National Phenology Network is a project under the USGS. They collect phenology observations across both plants and animals.


```r
npn %>% arrange(date) %>% mutate(count = cumsum(Number_Records)) %>% gp
```

![plot of chunk unnamed-chunk-10](/assets/blog-images/2014-11-10-open-data-growth/unnamed-chunk-10-1.png)

### TreeBASE

* Website: https://treebase.org/
* R package: `treebase`

TreeBASE is a database of phylogenetic trees, had a total of 1515 new trees added in 2013, and has been growing at a good pace. Note that these aren't numbers of total phylogenetic trees, but _new trees added each year_ - we couldn't get our hands on total number of trees by year. The current number of total trees as of 2015-03-10 is 12,817.


```r
treebase %>% arrange(date) %>% rename(count = New.Trees.Added) %>% gp
```

![plot of chunk unnamed-chunk-11](/assets/blog-images/2014-11-10-open-data-growth/unnamed-chunk-11-1.png)

### Integrated Taxonomic Information Service (ITIS)

* Website: https://www.itis.gov/
* R package: `taxize`

The ITIS database is under the USGS, and holds taxonomic names for mostly North American species. This dataset is interesting, because data goes back to 1977, when they had 16000 names. As of Aug 2013 they had 624282 names.


```r
itis %>% arrange(date) %>% rename(count = total_names) %>% gp
```

![plot of chunk unnamed-chunk-12](/assets/blog-images/2014-11-10-open-data-growth/unnamed-chunk-12-1.png)

### eBird

* Website: https://www.catalogueoflife.org/
* R package: `taxize`

eBird is a database of bird occurence records. They don't give access to all the data they have, but some recent data. Data growth goes up and down through time because we don't have access to all data on each data request, but the overall trend is increasing.


```r
ebird_observations %>% arrange(date) %>% mutate(count = cumsum(COUNT.OBS_ID.)) %>% gp
```

![plot of chunk unnamed-chunk-13](/assets/blog-images/2014-11-10-open-data-growth/unnamed-chunk-13-1.png)

### Catalogue of Life (COL)

* Website: https://www.datacite.org/
* R package: `rdatacite`

COL is a database of taxonomic names, similar to ITIS, uBio, or Tropicos. The number of species (1352112) has continually increased (the slight level off is because we got data in Oct last year before the year was over), but number of data sources (1352112) was still growing as of 2013.

__Number of species__


```r
col %>% arrange(date) %>% rename(count = species) %>% gp
```

![plot of chunk unnamed-chunk-14](/assets/blog-images/2014-11-10-open-data-growth/unnamed-chunk-14-1.png)

__Number of data sources__


```r
col %>% arrange(date) %>% rename(count = source_databases) %>% gp
```

![plot of chunk unnamed-chunk-15](/assets/blog-images/2014-11-10-open-data-growth/unnamed-chunk-15-1.png)

### Public Library of Science (PLOS)

* Website: https://www.plos.org/
* R package: `rplos`, `fulltext`

PLOS has had tremendous growth, with a very steep hockey stick growth curve. This year (2014) is left out because the year is not over yet.


```r
plos_years %>%
  arrange(date) %>%
  filter(date < as.Date("2014-01-01")) %>%
  mutate(count = cumsum(articles)) %>%
  gp
```

![plot of chunk unnamed-chunk-16](/assets/blog-images/2014-11-10-open-data-growth/unnamed-chunk-16-1.png)

### Biodiversity Heritage Library (BHL)

* Website: https://www.biodiversitylibrary.org/
* R package: `rbhl`

BHL has grown tremendously, with 155891133 names, 43650663 pages, 139003 items, and 77169 titles.


```r
bhl_titles <- bhl_titles %>% mutate(type = "titles") %>% arrange(date) %>% mutate(count = cumsum(Titles))
bhl_items <- bhl_items %>% mutate(type = "items") %>% arrange(date) %>%  mutate(count = cumsum(Items))
bhl_pages <- bhl_pages %>% mutate(type = "pages") %>% arrange(date) %>%  mutate(count = cumsum(Pages))
bhl_names <- bhl_names %>% mutate(type = "names") %>% arrange(date) %>%  mutate(count = cumsum(Names))
bhl_all <- rbind(bhl_titles[,-c(1:4)], bhl_items[,-c(1:4)], bhl_pages[,-c(1:4)], bhl_names[,-c(1:4)])
bhl_all %>%
  ggplot(aes(date, count)) +
    geom_line(size=2.1) +
    theme_grey(base_size = 18) +
    facet_wrap(~ type, scales = "free")
```

![plot of chunk unnamed-chunk-17](/assets/blog-images/2014-11-10-open-data-growth/unnamed-chunk-17-1.png)

### Global Biodiversity Information Facility (GBIF)

* Website: https://www.gbif.org/
* R package: `rgbif`, `spocc`

GBIF is the largest warehouse of biodiversity occurrence records, pulling in data from 578, and 420 million occurrence records as of Oct. 2013. Growth through time has been dramatic.

__Number of records__


```r
gbif_data %>%
  arrange(date) %>%
  rename(count = V2) %>%
  gp + labs(y="Millions of biodiversity records in GBIF")
```

![plot of chunk unnamed-chunk-18](/assets/blog-images/2014-11-10-open-data-growth/unnamed-chunk-18-1.png)

__Number of data publishers__


```r
gbif_publishers %>%
  arrange(date) %>%
  rename(count = V2) %>%
  gp + labs(y="Number of GBIF data publishers")
```

![plot of chunk unnamed-chunk-19](/assets/blog-images/2014-11-10-open-data-growth/unnamed-chunk-19-1.png)

### Neotoma

* Website: https://www.neotomadb.org/
* R package: `neotoma`

The Neotoma database holds paleoecology records of various kinds, including pollen and fossil records. The R package `neotoma` allows access to data from Neotoma.  Data and datasets have grown rather dramatically, while number of taxa has flattened off recently.


```r
rbind(neotoma_data %>% mutate(type = "data") %>% arrange(date),
      neotoma_datasets %>% mutate(type = "datasets") %>% arrange(date),
      neotoma_taxa %>% mutate(type = "taxa") %>% arrange(date)) %>%
  rename(count = RunningCount) %>%
  gp + facet_grid(type ~ ., scales="free")
```

![plot of chunk unnamed-chunk-20](/assets/blog-images/2014-11-10-open-data-growth/unnamed-chunk-20-1.png)

## So what?

Okay, so a lot of data isn't that meaningful in itself. But, this is open data that can be used to do science, which means there is an increasingly vast amount of open data as the basis for new research, to supplement field based research, etc. The killer feature of all this open data is that it's all available programatically through R packages produced in the rOpenSci community, meaning you can easily and quickly do reproducible science with this data.

## Reproduce this analysis

* Option 1: If you are comfortable with git, simply clone the [dbgrowth repository][thecode] to your machine, uncompress the compressed file, `cd` to the directory, and run `R`. Running R should enter _packrat mode_, which will install packages from within the directory, after which point you can reproduce what we have done above.
* Option 2: Install the `packrat` R package if you don't have it already. Download [this compressed file][bundle] (a _packrat bundle_), then in R, run `packrat::unbundle("<path to tar.gz>", "<path to put the contents>")`, which will uncompress the file, and install packages, and you're ready to go.

Once you have the files, you should be able to run `knitr::knit("dbgrowth.Rmd")` to reproduce this post.

[thecode]: https://github.com/ropensci/dbgrowth
[bundle]: https://www.dropbox.com/s/226onvf8zw06r0f/dbgrowth-2014-11-10.tar.gz?dl=0
