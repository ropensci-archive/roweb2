---
slug: "taxize-seven-years"
title: "taxize: seven years of taxonomy in R"
date: 2018-05-23
authors:
  - name: Scott Chamberlain
categories:
  - technotes
topicid: 1181
tags:
- R
- taxonomy
- taxize
- taxizedb
- taxa
---



[taxize][] was seven years old this last Saturday! 

<br><br>

## What is taxize?

`taxize` is designed around making working with taxonomic names easier - abstracting away the details of what each of 20 or so taxonomic data sources require for a given use case. 

A samping of use cases covered in `taxize` (all of these across many different data sources):

* Taxonomic identifier from a taxonomic name and vice versa
* Taxonomic name from a vernacular (common) name and vice versa
* Taxonomic hierarchy/classification from identifier or name
* Taxonomic children of an identifier or name
* All taxa downstream to a certain rank from identifier or name
* Taxonomic name synonyms from identifier or name
* Lowest common taxon and rank for an identifier or name
* Resolve taxonomic names, i.e., fix spelling errors

<br>

## History

`taxize` was one of our first packages. Our first commit was on [2011-05-19](#link-to-first-commit), uneventfully adding an empty README:

[![first_commit](/img/blog-images/2018-05-23-taxize-seven-years/taxize-first-commit.png)](https://github.com/ropensci/taxize/commit/667004eac329869099fdccb481138f572576cb69)

We've come a long way since May 2011. We've added a lot of new functionality and many new contributors.

<br>

### Commit history

Get git commits for `taxize` using a few tidyverse packages as well as [git2r](https://github.com/ropensci/git2r), our R package for working with git repositories:


```r
library(git2r)
library(ggplot2)
library(dplyr)

repo <- git2r::repository("~/github/ropensci/taxize")
res <- commits(repo)
```

A graph of commit history


```r
dates <- vapply(res, function(z) {
    as.character(as.POSIXct(z@author@when@time, origin = "1970-01-01"))
}, character(1))
df <- tbl_df(data.frame(date = dates, stringsAsFactors = FALSE)) %>% 
    group_by(date) %>%
    summarise(count = n()) %>%
    mutate(cumsum = cumsum(count)) %>%
    ungroup()
ggplot(df, aes(x = as.Date(date), y = cumsum)) +
    geom_line(size = 2) +
    theme_grey(base_size = 16) +
    scale_x_date(labels = scales::date_format("%Y/%m")) +
    labs(x = 'May 2011 to May 2018', y = 'Cumulative Git Commits')
```

![plot of chunk unnamed-chunk-3](/img/blog-images/2018-05-23-taxize-seven-years/unnamed-chunk-3-1.png)

### Contributors

A graph of new contributors through time


```r
date_name <- lapply(res, function(z) {
    data_frame(
        date = as.character(as.POSIXct(z@author@when@time, origin = "1970-01-01")),
        name = z@author@name
    )
})
date_name <- bind_rows(date_name)

firstdates <- date_name %>%
    group_by(name) %>%
    arrange(date) %>%
    filter(rank(date, ties.method = "first") == 1) %>%
    ungroup() %>%
    mutate(count = 1) %>%
    arrange(date) %>%
    mutate(cumsum = cumsum(count))

## plot
ggplot(firstdates, aes(as.Date(date), cumsum)) +
  geom_line(size = 2) +
  theme_grey(base_size = 18) +
  scale_x_date(labels = scales::date_format("%Y/%m")) +
  labs(x = 'May 2011 to May 2018', y = 'Cumulative New Contributors')
```

![plot of chunk unnamed-chunk-4](/img/blog-images/2018-05-23-taxize-seven-years/unnamed-chunk-4-1.png)

`taxize` contributors, including those that have opened issues (click to go to their GitHub profile):

[afkoeppel](https://github.com/afkoeppel) - [ahhurlbert](https://github.com/ahhurlbert) - [albnd](https://github.com/albnd) - [Alectoria](https://github.com/Alectoria) - [andzandz11](https://github.com/andzandz11) - [antagomir](https://github.com/antagomir) - [arendsee](https://github.com/arendsee) - [ashenkin](https://github.com/ashenkin) - [ashiklom](https://github.com/ashiklom) - [bomeara](https://github.com/bomeara) - [bw4sz](https://github.com/bw4sz) - [cboettig](https://github.com/cboettig) - [cdeterman](https://github.com/cdeterman) - [ChrKoenig](https://github.com/ChrKoenig) - [chuckrp](https://github.com/chuckrp) - [clarson2191](https://github.com/clarson2191) - [claudenozeres](https://github.com/claudenozeres) - [cmzambranat](https://github.com/cmzambranat) - [daattali](https://github.com/daattali) - [DanielGMead](https://github.com/DanielGMead) - [davharris](https://github.com/davharris) - [davidvilanova](https://github.com/davidvilanova) - [diogoprov](https://github.com/diogoprov) - [dlebauer](https://github.com/dlebauer) - [dlenz1](https://github.com/dlenz1) - [dschlaep](https://github.com/dschlaep) - [EDiLD](https://github.com/EDiLD) - [emhart](https://github.com/emhart) - [fdschneider](https://github.com/fdschneider) - [fgabriel1891](https://github.com/fgabriel1891) - [fmichonneau](https://github.com/fmichonneau) - [gedankenstuecke](https://github.com/gedankenstuecke) - [gimoya](https://github.com/gimoya) - [GISKid](https://github.com/GISKid) - [git-og](https://github.com/git-og) - [glaroc](https://github.com/glaroc) - [gustavobio](https://github.com/gustavobio) - [ibartomeus](https://github.com/ibartomeus) - [jangorecki](https://github.com/jangorecki) - [jarioksa](https://github.com/jarioksa) - [jebyrnes](https://github.com/jebyrnes) - [johnbaums](https://github.com/johnbaums) - [jonmcalder](https://github.com/jonmcalder) - [JoStaerk](https://github.com/JoStaerk) - [jsgosnell](https://github.com/jsgosnell) - [kamapu](https://github.com/kamapu) - [karthik](https://github.com/karthik) - [KevCaz](https://github.com/KevCaz) - [kgturner](https://github.com/kgturner) - [kmeverson](https://github.com/kmeverson) - [Koalha](https://github.com/Koalha) - [ljvillanueva](https://github.com/ljvillanueva) - [Markus2015](https://github.com/Markus2015) - [mcsiple](https://github.com/mcsiple) - [MikkoVihtakari](https://github.com/MikkoVihtakari) - [millerjef](https://github.com/millerjef) - [miriamgrace](https://github.com/miriamgrace) - [mpnelsen](https://github.com/mpnelsen) - [MUSEZOOLVERT](https://github.com/MUSEZOOLVERT) - [nate-d-olson](https://github.com/nate-d-olson) - [nmatzke](https://github.com/nmatzke) - [npch](https://github.com/npch) - [paternogbc](https://github.com/paternogbc) - [philippi](https://github.com/philippi) - [pmarchand1](https://github.com/pmarchand1) - [pssguy](https://github.com/pssguy) - [RodgerG](https://github.com/RodgerG) - [rossmounce](https://github.com/rossmounce) - [sariya](https://github.com/sariya) - [scelmendorf](https://github.com/scelmendorf) - [sckott](https://github.com/sckott) - [SimonGoring](https://github.com/SimonGoring) - [snsheth](https://github.com/snsheth) - [snubian](https://github.com/snubian) - [Squiercg](https://github.com/Squiercg) - [tdjames1](https://github.com/tdjames1) - [tmkurobe](https://github.com/tmkurobe) - [tpaulson1](https://github.com/tpaulson1) - [tpoisot](https://github.com/tpoisot) - [vijaybarve](https://github.com/vijaybarve) - [wcornwell](https://github.com/wcornwell) - [willpearse](https://github.com/willpearse) - [wpetry](https://github.com/wpetry) - [zachary-foster](https://github.com/zachary-foster)

<br>

## taxize usage

Eduard Szöcs and I wrote a paper describing `taxize` back in 2013, published in F1000Research.

> Scott Chamberlain and Eduard Szöcs (2013). taxize - taxonomic search and retrieval in R. F1000Research 2:191. <https://doi.org/10.12688/f1000research.2-191.v1>

The paper has probably made `taxize` users more likely to cite the package, though we have no direct proof of that.

The paper above and/or the package have been cited **69** times over the past 7 years.

The way `taxize` is used in research is often in "cleaning" taxonomic names in one way or another. In addition, many users use `taxize` to get taxonomic names for certain groups of interest.

One example comes from the paper 

> Weber, M. G., Porturas, L. D., & Taylor, S. A. (2016). Foliar nectar enhances plant–mite mutualisms: the effect of leaf sugar on the control of powdery mildew by domatia-inhabiting mites. Annals of Botany, 118(3), 459–466. doi:10.1093/aob/mcw118

<div style="width:100%; text-align:center">
<a href="https://doi.org/10.1093/aob/mcw118" target="_blank"><img src="/img/blog-images/2018-05-23-taxize-seven-years/taxize-methods.png" title="taxize methods example" ></a>
</div>

<br>

## Features coming down the road

* Integration with [taxa][] package (maintained by one of our rOpenSci fellows [Zachary Foster](https://github.com/zachary-foster)) in all `get_*()` functions. This will make the outputs of all `get_*()` more consistent and easier to integrate into your downstream workflows.
* not taxize per se, but [taxizedb][] is starting to really take shape due to help from [Zebulun Arendsee][zeb]. `taxizedb` will make taxonomic name work much faster for large datasets. It's worth checking out.

<br>

## Thanks!

A hug thanks goes to all `taxize` users and contributors. It's awesome to see how useful `taxize` has been through the years, and we look forward to making it even better moving forward.


[taxize]: https://github.com/ropensci/taxize
[taxizedb]: https://github.com/ropensci/taxizedb
[taxa]: https://github.com/ropensci/taxa
[pegax]: https://github.com/ropenscilabs/pegax
[zeb]: https://github.com/arendsee
[gn]: LINK
