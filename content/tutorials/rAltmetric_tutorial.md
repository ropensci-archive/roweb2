---
title: rAltmetric tutorial
package_version: 0.3
---



This package provides a way to programmatically retrieve altmetric data from [altmetric.com](http://altmetric.com) for any publication with the appropriate identifer. The package is really simple to use and only has two major functions: One (`altmetrics()`) to download metrics and another (`altmetric_data()`) to extract the data into a `data.frame`. It also includes generic S3 methods to plot/print metrics for any altmetric object.

Questions, features requests and issues should go [here](https://github.com/ropensci/rAltmetric/issues/). General comments to [karthik.ram@gmail.com](mailto:karthik.ram@gmail.com).

<section id="installation">

## Installation


A stable version is available from CRAN. To install


```r
install.packages('rAltmetric')
```

### Development version


```r
# If you don't already have the devtools library, first run
install.packages('devtools')
```

Then install the package


```r
library(devtools)
install_github('rAltmetric', 'ropensci')
```

<section id="usage">

## Usage


### Obtaining metrics

There was a recent paper by [Acuna et al](http://www.nature.com/news/2010/100616/full/465860a.html) that received a lot of attention on Twitter. What was the impact of that paper?


```r
library(rAltmetric)
```


```r
acuna <- altmetrics(doi="10.1038/489201a")
acuna
```

```
## Altmetrics on: "Future impact: Predicting scientific success" with altmetric_id: 958760 published in Nature.
##   provider count
## 1 Facebook     3
## 2    Feeds    18
## 3  Google+     5
## 4      MSM     1
## 5    Cited   235
## 6   Tweets   195
## 7 Accounts   222
```

### Data

To obtain the metrics in tabular form for further processing, run any object of class `altmetric` through `altmetric_data()` to get data that can easily be written to disk as a spreadsheet.


```r
altmetric_data(acuna)
```

```
##                                          title             doi     pmid
## 2 Future impact: Predicting scientific success 10.1038/489201a 22972278
##     nlmid              ads_id            altmetric_jid
## 2 0410462 2012natur.489..201a 4f6fa50a3cf058f610003160
##                  issns journal altmetric_id schema cited_by_gplus_count
## 2 0028-0836,1476-4687,  Nature       958760  1.5.4                    5
##   cited_by_fbwalls_count cited_by_posts_count cited_by_tweeters_count
## 2                      3                   NA                      NA
##   cited_by_accounts_count cited_by_feeds_count cited_by_rdts_count
## 2                      NA                   NA                  NA
##   cited_by_msm_count cited_by_delicious_count cited_by_forum_count
## 2                  1                       NA                   NA
##   cited_by_qs_count cited_by_rh_count X18_cited_by_feeds_count
## 2                NA                NA                       18
##   X195_cited_by_tweeters_count X222_cited_by_accounts_count
## 2                          195                          222
##   X235_cited_by_posts_count score mendeley connotea citeulike
## 2                       235 259.9      171        0        18
##                                 url  added_on published_on subjects
## 2 http://dx.doi.org/10.1038/489201a 1.348e+09    1.347e+09 science,
##   scopus_subjects last_updated readers_count
## 2       General,     1.405e+09           189
##                                               details_url
## 2 http://www.altmetric.com/details.php?citation_id=958760
```

You can save these data into a clean spreadsheet format:


```r
acuna_data <- altmetric_data(acuna)
write.csv(acuna_data, file = 'acuna_altmetrics.csv')
```

### Visualization

For any altmetric object you can quickly plot the stats with a generic `plot` function. The plot overlays the [altmetric badge and the score](http://api.altmetric.com/embeds.html) on the top right corner. If you prefer a customized plot, create your own with the raw data generated from `almetric_data()`


```r
plot(acuna)
```

![plot of chunk plot](../assets/tutorial-images/rAltmetric/plot.png)

### Gathering metrics for many DOIs

For a real world use-case, one might want to get metrics on multiple publications. If so, just read them from a spreadsheet and `llply` through them like the example below.

Install `rplos` (v0.3.6) if you don't have it. See [here](https://github.com/ropensci/rplos) for instructions.


```r
library(rplos)
dois <- searchplos(q = "*:*", fl = 'id', fq = 'doc_type:full', start = 0, limit = 75)$id
```

First, let's retrieve the metrics.


```r
library(plyr)
raw_metrics <- lapply(dois, function(x) altmetrics(doi = x))
```

Now let's pull the data together.


```r
metric_data <- ldply(raw_metrics, altmetric_data)
head(metric_data[,c(1:10)])
```

```
##                                                                                                                                                      title
## 1                                                                   ECO: A Generic Eutrophication Model Including Comprehensive Sediment-Water Interaction
## 2                                                     Complex Visual Search in Children and Adolescents: Effects of Age and Performance on fMRI Activation
## 3                                                                           Microsatellite Instability in Chicken Lymphoma Induced by Gallid Herpesvirus 2
## 4                                                                             Direct Ex-Vivo Evaluation of Pneumococcal Specific T-Cells in Healthy Adults
## 5 Alcohol-related dysfunction in working-age men in izhevsk, Russia: an application of structural equation models to study the association with education.
## 6                                                     Sex Promotes Spatial and Dietary Segregation in a Migratory Shorebird during the Non-Breeding Season
##                            doi     pmid     nlmid            altmetric_jid
## 1 10.1371/journal.pone.0068104 23844160 101285081 4f6fa5313cf058f6100043e3
## 2 10.1371/journal.pone.0085168 24376871 101285081 4f6fa5313cf058f6100043e3
## 3 10.1371/journal.pone.0068058 23844155 101285081 4f6fa5313cf058f6100043e3
## 4 10.1371/journal.pone.0025367 22039412 101285081 4f6fa5313cf058f6100043e3
## 5 10.1371/journal.pone.0063792 23667673 101285081 4f6fa5313cf058f6100043e3
## 6 10.1371/journal.pone.0033811 22479448 101285081 4f6fa5313cf058f6100043e3
##        issns  journal
## 1 1932-6203, PLOS ONE
## 2 1932-6203, PLOS ONE
## 3 1932-6203, PLOS ONE
## 4 1932-6203, PLoS ONE
## 5 1932-6203, PloS one
## 6 1932-6203, PLoS ONE
##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       abstract
## 1                                                                                                                                                                                                                                                                                                                           The content and calibration of the comprehensive generic 3D eutrophication model ECO for water and sediment quality is presented. Based on a computational grid for water and sediment, ECO is used as a tool for water quality management to simulate concentrations and mass fluxes of nutrients (N, P, Si), phytoplankton species, detrital organic matter, electron acceptors and related substances. ECO combines integral simulation of water and sediment quality with sediment diagenesis and closed mass balances. Its advanced process formulations for substances in the water column and the bed sediment were developed to allow for a much more dynamic calculation of the sediment-water exchange fluxes of nutrients as resulting from steep concentration gradients across the sediment-water interface than is possible with other eutrophication models. ECO is to more accurately calculate the accumulation of organic matter and nutrients in the sediment, and to allow for more accurate prediction of phytoplankton biomass and water quality in response to mitigative measures such as nutrient load reduction. ECO was calibrated for shallow Lake Veluwe (The Netherlands). Due to restoration measures this lake underwent a transition from hypertrophic conditions to moderately eutrophic conditions, leading to the extensive colonization by submerged macrophytes. ECO reproduces observed water quality well for the transition period of ten years. The values of its process coefficients are in line with ranges derived from literature. ECO's calculation results underline the importance of redox processes and phosphate speciation for the nutrient return fluxes. Among other things, the results suggest that authigenic formation of a stable apatite-like mineral in the sediment can contribute significantly to oligotrophication of a lake after a phosphorus load reduction.
## 2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Complex visuospatial processing relies on distributed neural networks involving occipital, parietal and frontal brain regions. Effects of physiological maturation (during normal brain development) and proficiency on tasks requiring complex visuospatial processing have not yet been studied extensively, as they are almost invariably interrelated. We therefore aimed at dissociating the effects of age and performance on functional MRI (fMRI) activation in a complex visual search task. In our cross-sectional study, healthy children and adolescents (n = 43, 19 females, 7-17 years) performed a complex visual search task during fMRI. Resulting activation was analysed with regard to the differential effects of age and performance. Our results are compatible with an increase in the neural network's efficacy with age: within occipital and parietal cortex, the core regions of the visual exploration network, activation increased with age, and more so in the right than in the left hemisphere. Further, activation outside the visual search network decreased with age, mainly in left inferior frontal, middle temporal, and inferior parietal cortex. High-performers had stronger activation in right superior parietal cortex, suggesting a more mature visual search network. We could not see effects of age or performance in frontal cortex. Our results show that effects of physiological maturation and effects of performance, while usually intertwined, can be successfully disentangled and investigated using fMRI in children and adolescents.
## 3                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Microsatellite instability (MSI) has been found in a range of human tumors, and little is known of the links between MSI and herpesvirus. In order to investigate the relationship between MSI and Gallid herpesvirus 2 (GaHV-2)-induced lymphoma, fifteen Marek's disease (MD) lymphomas were analyzed through using 46 microsatellite markers, which were amplified by PCR from DNA specimens of lymphoma and normal muscular tissues from the same chicken. PCR products were evaluated by denaturing polyacrylamide gel electrophoresis for MSI analysis. MSI was proved in all lymphomas, at least in one locus. Thirty of the 46 microsatellite markers had microsatellite alterations. These results suggested that GaHV-2-induced lymphoma in chickens is related to MSI, and this is the first report to demonstrate that MSI is associated with the GaHV-2 induced lymphoma in chicken.
## 4                                                                                                                                                                                                                                                                                                                                                                                                                           Streptococcus pneumoniae is an encapsulated bacterium that causes significant global morbidity and mortality. The nasopharynxes of children are believed to be the natural reservoir of pneumococcus and by adulthood nasopharyngeal carriage is infrequent; such infrequency may be due to demonstrable pneumococcal specific T and B-cell responses. HLA Class 2 tetrameric complexes have been used to characterise antigen specific T-cell responses in a variety of models of infection. We therefore sought to determine the frequency and phenotype of pneumococcal specific T-cells, using a novel HLA-DRB1*1501 tetramer complex incorporating a recently defined T-cell epitope derived from the conserved pneumococcal serine/threonine kinase (StkP). We were able to detect direct ex-vivo StkP(446-60)-tetramer binding in HLA-DRB1*1501 adults. These StkP(446-60)-tetramer binding T-cells had increased CD38 expression and were enriched in CCR7- CD45RA+ expression indicating recent and on-going activation and differentiation. Furthermore, these StkP(446-60)-tetramer binding T-cells demonstrated rapid effector function by secreting interferon-gamma on stimulation with recombinant StkP. This is the first study to directly enumerate and characterise pneumococcal specific T-cells using HLA class 2 tetrameric complexes. We found that ex-vivo pneumococcal-specific T cells were detectable in healthy adults and that they were enriched with cell surface markers associated with recent antigen exposure and later stages of antigen-driven differentiation. It is likely that these activated pneumococcal specific T-cells reflect recent immunostimulatory pneumococcal exposure in the nasopharynx and it is possible that they may be preventing subsequent colonisation and disease.
## 5                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Acute alcohol-related dysfunctional behaviours, such as hangover, are predictive of poor health and mortality. Although much is known about the association of education with alcohol consumption, little is known about its association with these dysfunctional behaviours.
## 6 Several expressions of sexual segregation have been described in animals, especially in those exhibiting conspicuous dimorphism. Outside the breeding season, segregation has been mostly attributed to size or age-mediated dominance or to trophic niche divergence. Regardless of the recognized implications for population dynamics, the ecological causes and consequences of sexual segregation are still poorly understood. We investigate the foraging habits of a shorebird showing reversed sexual dimorphism, the black-tailed godwit Limosa limosa, during the winter season, and found extensive segregation between sexes in spatial distribution, microhabitat use and dietary composition. Males and females exhibited high site-fidelity but differed in their distributions at estuary-scale. Male godwits (shorter-billed) foraged more frequently in exposed mudflats than in patches with higher water levels, and consumed more bivalves and gastropods and fewer polychaetes than females. Females tended to be more frequently involved and to win more aggressive interactions than males. However, the number of aggressions recorded was low, suggesting that sexual dominance plays a lesser role in segregation, although its importance cannot be ruled out. Dimorphism in the feeding apparatus has been used to explain sex differences in foraging ecology and behaviour of many avian species, but few studies confirmed that morphologic characteristics drive individual differences within each sex. We found a relationship between resource use and bill size when pooling data from males and females. However, this relationship did not hold for either sex separately, suggesting that differences in foraging habits of godwits are primarily a function of sex, rather than bill size. Hence, the exact mechanisms through which this segregation operates are still unknown. The recorded differences in spatial distribution and resource use might expose male and female to distinct threats, thus affecting population dynamics through differential mortality. Therefore, population models and effective conservation strategies should increasingly take sex-specific requirements into consideration.
##   abstract_source altmetric_id
## 1          pubmed      1720380
## 2          pubmed      2001416
## 3          pubmed      1641349
## 4          pubmed         <NA>
## 5          pubmed      1479160
## 6          pubmed         <NA>
```

Finally we save this to a spreadsheet for further analysis/vizualization.


```r
write.csv(metric_data, file = "metric_data.csv")
```

### Further reading
* [Metrics: Do metrics matter?](http://www.nature.com/news/2010/100616/full/465860a.html)
* [The altmetrics manifesto](http://altmetrics.org/manifesto/)


<section id="citing">

## Citing

To cite `rAltmetric` in publications use:

<br>

> Karthik Ram (2012). rAltmetric: Retrieves altmerics data for any published paper from altmetric.com. R package version 0.5. https://github.com/ropensci/rAltmetric

<section id="license_bugs">

## License and bugs

* License: [CC0](http://creativecommons.org/choose/zero/)
* Report bugs at [our Github repo for rAltmetric](https://github.com/ropensci/rAltmetric/issues?state=open)

[Back to top](#top)
