---
title: rsnps tutorial
package_version: 0.2.0
---




### Installation

Stable version from CRAN


```r
install.packages("rsnps")
```

Or get from Github


```r
install.packages("devtools")
devtools::install_github("ropensci/rsnps")
```


```r
library("rsnps")
```


### OpenSNP data

#### All Genotypes

Get genotype data for all users at a particular SNP


```r
allgensnp(snp='rs7412')[1:3]
```

```
#> https://opensnp.org/snps/rs7412.json
```

```
#> [[1]]
#> [[1]]$snp
#> [[1]]$snp$name
#> [1] "rs7412"
#>
#> [[1]]$snp$chromosome
#> [1] "19"
#>
#> [[1]]$snp$position
#> [1] "44908822"
#>
#>
#> [[1]]$user
#> [[1]]$user$name
#> [1] "Luke Reid"
#>
#> [[1]]$user$id
#> [1] 6621
#>
#> [[1]]$user$genotypes
#> [[1]]$user$genotypes[[1]]
#> [[1]]$user$genotypes[[1]]$genotype_id
#> [1] 5023
#>
#> [[1]]$user$genotypes[[1]]$local_genotype
#> [1] "CC"
#>
#>
#>
#>
#>
#> [[2]]
#> [[2]]$snp
#> [[2]]$snp$name
#> [1] "rs7412"
#>
#> [[2]]$snp$chromosome
#> [1] "19"
#>
#> [[2]]$snp$position
#> [1] "44908822"
#>
#>
#> [[2]]$user
#> [[2]]$user$name
#> [1] "Ganesha18"
#>
#> [[2]]$user$id
#> [1] 6598
#>
#> [[2]]$user$genotypes
#> [[2]]$user$genotypes[[1]]
#> [[2]]$user$genotypes[[1]]$genotype_id
#> [1] 5001
#>
#> [[2]]$user$genotypes[[1]]$local_genotype
#> [1] "CC"
#>
#>
#>
#>
#>
#> [[3]]
#> [[3]]$snp
#> [[3]]$snp$name
#> [1] "rs7412"
#>
#> [[3]]$snp$chromosome
#> [1] "19"
#>
#> [[3]]$snp$position
#> [1] "44908822"
#>
#>
#> [[3]]$user
#> [[3]]$user$name
#> [1] "mdmoore07"
#>
#> [[3]]$user$id
#> [1] 6597
#>
#> [[3]]$user$genotypes
#> [[3]]$user$genotypes[[1]]
#> [[3]]$user$genotypes[[1]]$genotype_id
#> [1] 5000
#>
#> [[3]]$user$genotypes[[1]]$local_genotype
#> [1] "--"
```


```r
allgensnp('rs7412', df=TRUE)[1:10,]
```

```
#> https://opensnp.org/snps/rs7412.json
```

```
#>    snp_name snp_chromosome snp_position      user_name user_id genotype_id
#> 1    rs7412             19     44908822      Luke Reid    6621        5023
#> 2    rs7412             19     44908822      Ganesha18    6598        5001
#> 3    rs7412             19     44908822      mdmoore07    6597        5000
#> 4    rs7412             19     44908822 KevinHendricks    6590        4988
#> 5    rs7412             19     44908822       jlafount    6589        4987
#> 6    rs7412             19     44908822          fawaz    6587        4985
#> 7    rs7412             19     44908822        tzankel    6582        4980
#> 8    rs7412             19     44908822        David53    3997        2691
#> 9    rs7412             19     44908822        marsha     6577        4974
#> 10   rs7412             19     44908822      wbworkman    6574        4973
#>    genotype
#> 1        CC
#> 2        CC
#> 3        --
#> 4        CC
#> 5        CC
#> 6        CC
#> 7        CT
#> 8        CT
#> 9        CC
#> 10       CC
```


#### All Phenotypes

Get all phenotypes, their variations, and how many users have data available for a given phenotype

Get all data


```r
allphenotypes(df = TRUE)[1:10,]
```

```
#>    id characteristic    known_variations number_of_users
#> 1   1      Eye color               Brown            1168
#> 2   1      Eye color         Brown-green            1168
#> 3   1      Eye color          Blue-green            1168
#> 4   1      Eye color           Blue-grey            1168
#> 5   1      Eye color               Green            1168
#> 6   1      Eye color                Blue            1168
#> 7   1      Eye color Hazel (brown/green)            1168
#> 8   1      Eye color               Hazel            1168
#> 9   1      Eye color               Mixed            1168
#> 10  1      Eye color           Gray-blue            1168
```

Output a list, then call the characterisitc of interest by 'id' or 'characteristic'


```r
datalist <- allphenotypes()
```

Get a list of all characteristics you can call


```r
names(datalist)[1:10]
```

```
#>  [1] "Eye color"                        "Lactose intolerance"
#>  [3] "Handedness"                       "white skin"
#>  [5] "Ability to find a bug in openSNP" "Beard Color"
#>  [7] "Hair Color"                       "Ability to Tan"
#>  [9] "Height"                           "Hair Type"
```

Get data.frame for _ADHD_


```r
datalist[["ADHD"]]
```

```
#>    id characteristic                            known_variations
#> 1  29           ADHD                                       False
#> 2  29           ADHD                                        True
#> 3  29           ADHD              Undiagnosed, but probably true
#> 4  29           ADHD                                          No
#> 5  29           ADHD                                         Yes
#> 6  29           ADHD                               Not diagnosed
#> 7  29           ADHD Diagnosed as not having but with some signs
#> 8  29           ADHD                                 Mthfr c677t
#> 9  29           ADHD                                   Rs1801260
#> 10 29           ADHD                                 Adult onset
#>    number_of_users
#> 1              261
#> 2              261
#> 3              261
#> 4              261
#> 5              261
#> 6              261
#> 7              261
#> 8              261
#> 9              261
#> 10             261
```

Get data.frame for _mouth size_ and _SAT Writing_


```r
datalist[c("mouth size","SAT Writing")]
```

```
#> $`mouth size`
#>    id characteristic     known_variations number_of_users
#> 1 120     mouth size               Medium             173
#> 2 120     mouth size                Small             173
#> 3 120     mouth size                Large             173
#> 4 120     mouth size Slightly wide mouth              173
#>
#> $`SAT Writing`
#>    id characteristic
#> 1  41    SAT Writing
#> 2  41    SAT Writing
#> 3  41    SAT Writing
#> 4  41    SAT Writing
#> 5  41    SAT Writing
#> 6  41    SAT Writing
#> 7  41    SAT Writing
#> 8  41    SAT Writing
#> 9  41    SAT Writing
#> 10 41    SAT Writing
#> 11 41    SAT Writing
#> 12 41    SAT Writing
#> 13 41    SAT Writing
#> 14 41    SAT Writing
#> 15 41    SAT Writing
#>                                           known_variations number_of_users
#> 1                                                      750              92
#> 2                                       Tested before 2005              92
#> 3                                                      800              92
#> 4                                      Country with no sat              92
#> 5                                                      N/a              92
#> 6                                  Never & have ba & above              92
#> 7                                                      720              92
#> 8                          Did well - don't remember score              92
#> 9                                                      511              92
#> 10                                                     700              92
#> 11                                                     760              92
#> 12                                                     780              92
#> 13 Not part of sat when i took test in august 1967 at uiuc              92
#> 14                                 Not part of sat in 1961              92
#> 15                                                     620              92
```

#### Annotations

Get just the metadata


```r
annotations(snp = 'rs7903146', output = 'metadata')
```

```
#> https://opensnp.org/snps/json/annotation/rs7903146.json
```

```
#>          .id        V1
#> 1       name rs7903146
#> 2 chromosome        10
#> 3   position 112998590
```

Just from PLOS journals


```r
annotations(snp = 'rs7903146', output = 'plos')[c(1:2),]
```

```
#> https://opensnp.org/snps/json/annotation/rs7903146.json
```

```
#>                   author
#> 1        Maggie C. Y. Ng
#> 2 André Gustavo P. Sousa
#>                                                                                                                                      title
#> 1 Meta-Analysis of Genome-Wide Association Studies in African Americans Provides Insights into the Genetic Architecture of Type 2 Diabetes
#> 2                                  Genetic Variants of Diabetes Risk and Incident Cardiovascular Events in Chronic Coronary Artery Disease
#>           publication_date number_of_readers
#> 1 2014-08-07T00:00:00.000Z              7783
#> 2 2011-01-20T00:00:00.000Z              2080
#>                                              url
#> 1 https://doi.org/10.1371/journal.pgen.1004517
#> 2 https://doi.org/10.1371/journal.pone.0016341
#>                            doi
#> 1 10.1371/journal.pgen.1004517
#> 2 10.1371/journal.pone.0016341
```

Just from SNPedia


```r
annotations(snp = 'rs7903146', output = 'snpedia')
```

```
#> https://opensnp.org/snps/json/annotation/rs7903146.json
```

```
#>                                               url
#> 1 http://www.snpedia.com/index.php/Rs7903146(C;C)
#> 2 http://www.snpedia.com/index.php/Rs7903146(C;T)
#> 3 http://www.snpedia.com/index.php/Rs7903146(T;T)
#>                                                            summary
#> 1 Normal (lower) risk of Type 2 Diabetes and Gestational Diabetes.
#> 2     1.4x increased risk for diabetes (and perhaps colon cancer).
#> 3                            2x increased risk for Type-2 diabetes
```

Get all annotations


```r
annotations(snp = 'rs7903146', output = 'all')[1:5,]
```

```
#> https://opensnp.org/snps/json/annotation/rs7903146.json
```

```
#>        .id              author
#> 1 mendeley           T E Meyer
#> 2 mendeley      Camilla Cervin
#> 3 mendeley Nicholette D Palmer
#> 4 mendeley      Ashis K Mondal
#> 5 mendeley        Julian Munoz
#>                                                                                                                                title
#> 1                                                Diabetes genes and prostate cancer in the Atherosclerosis Risk in Communities study
#> 2                                                        Diabetes in Adults , Type 1 Diabetes , and Type 2 Diabetes GENETICS OF LADA
#> 3                                Association of TCF7L2 gene polymorphisms with reduced acute insulin response in Hispanic Americans.
#> 4                  Genotype and tissue-specific effects on alternative splicing of the transcription factor 7-like 2 gene in humans.
#> 5 Polymorphism in the transcription factor 7-like 2 (TCF7L2) gene is associated with reduced insulin secretion in nondiabetic women.
#>   publication_year number_of_readers open_access
#> 1             2010                 3        TRUE
#> 2             2008                 2       FALSE
#> 3             2008                 8       FALSE
#> 4             2010                13        TRUE
#> 5             2006                10        TRUE
#>                                                                                                                                      url
#> 1                              http://www.mendeley.com/research/diabetes-genes-prostate-cancer-atherosclerosis-risk-communities-study-4/
#> 2                                        http://www.mendeley.com/research/diabetes-adults-type-1-diabetes-type-2-diabetes-genetics-lada/
#> 3              http://www.mendeley.com/research/association-tcf7l2-gene-polymorphisms-reduced-acute-insulin-response-hispanic-americans/
#> 4        http://www.mendeley.com/research/genotype-tissuespecific-effects-alternative-splicing-transcription-factor-7like-2-gene-humans/
#> 5 http://www.mendeley.com/research/polymorphism-transcription-factor-7like-2-tcf7l2-gene-associated-reduced-insulin-secretion-nondiabet/
#>                                              doi publication_date summary
#> 1 19/2/558 [pii]\\r10.1158/1055-9965.EPI-09-0902             <NA>    <NA>
#> 2                         10.2337/db07-0299.Leif             <NA>    <NA>
#> 3                           10.1210/jc.2007-1225             <NA>    <NA>
#> 4                           10.1210/jc.2009-2064             <NA>    <NA>
#> 5                              10.2337/db06-0574             <NA>    <NA>
#>   first_author pubmed_link journal trait pvalue pvalue_description
#> 1         <NA>        <NA>    <NA>  <NA>     NA               <NA>
#> 2         <NA>        <NA>    <NA>  <NA>     NA               <NA>
#> 3         <NA>        <NA>    <NA>  <NA>     NA               <NA>
#> 4         <NA>        <NA>    <NA>  <NA>     NA               <NA>
#> 5         <NA>        <NA>    <NA>  <NA>     NA               <NA>
#>   confidence_interval
#> 1                <NA>
#> 2                <NA>
#> 3                <NA>
#> 4                <NA>
#> 5                <NA>
```

#### Download

Download genotype data for a user from 23andme or other repo. (not evaluated in this example)


```r
data <- users(df=TRUE)
head( data[[1]] )
fetch_genotypes(url = data[[1]][1,"genotypes.download_url"], rows=15)
```

#### Genotype user data

Genotype data for one or multiple users


```r
genotypes(snp='rs9939609', userid=1)
```

```
#> https://opensnp.org/snps/json/rs9939609/1.json
```

```
#> $snp
#> $snp$name
#> [1] "rs9939609"
#>
#> $snp$chromosome
#> [1] "16"
#>
#> $snp$position
#> [1] "53786615"
#>
#>
#> $user
#> $user$name
#> [1] "Bastian Greshake Tzovaras"
#>
#> $user$id
#> [1] 1
#>
#> $user$genotypes
#> $user$genotypes[[1]]
#> $user$genotypes[[1]]$genotype_id
#> [1] 9
#>
#> $user$genotypes[[1]]$local_genotype
#> [1] "AT"
```


```r
genotypes('rs9939609', userid='1,6,8', df=TRUE)
```

```
#> https://opensnp.org/snps/json/rs9939609/1,6,8.json
```

```
#>    snp_name snp_chromosome snp_position                 user_name user_id
#> 1 rs9939609             16     53786615 Bastian Greshake Tzovaras       1
#> 2 rs9939609             16     53786615              Nash Parovoz       6
#> 3 rs9939609             16     53786615         Samantha B. Clark       8
#>   genotype_id genotype
#> 1           9       AT
#> 2           5       AT
#> 3           2       TT
```


```r
genotypes('rs9939609', userid='1-2', df=FALSE)
```

```
#> https://opensnp.org/snps/json/rs9939609/1-2.json
```

```
#> [[1]]
#> [[1]]$snp
#> [[1]]$snp$name
#> [1] "rs9939609"
#>
#> [[1]]$snp$chromosome
#> [1] "16"
#>
#> [[1]]$snp$position
#> [1] "53786615"
#>
#>
#> [[1]]$user
#> [[1]]$user$name
#> [1] "Bastian Greshake Tzovaras"
#>
#> [[1]]$user$id
#> [1] 1
#>
#> [[1]]$user$genotypes
#> [[1]]$user$genotypes[[1]]
#> [[1]]$user$genotypes[[1]]$genotype_id
#> [1] 9
#>
#> [[1]]$user$genotypes[[1]]$local_genotype
#> [1] "AT"
#>
#>
#>
#>
#>
#> [[2]]
#> [[2]]$snp
#> [[2]]$snp$name
#> [1] "rs9939609"
#>
#> [[2]]$snp$chromosome
#> [1] "16"
#>
#> [[2]]$snp$position
#> [1] "53786615"
#>
#>
#> [[2]]$user
#> [[2]]$user$name
#> [1] "Senficon"
#>
#> [[2]]$user$id
#> [1] 2
#>
#> [[2]]$user$genotypes
#> list()
```

#### Phenotype user data

Get phenotype data for one or multiple users


```r
phenotypes(userid=1)$phenotypes[1:3]
```

```
#> https://opensnp.org/phenotypes/json/1.json
```

```
#> $syndactyly
#> $syndactyly$phenotype_id
#> [1] 372
#>
#> $syndactyly$variation
#> [1] "None"
#>
#>
#> $`Allergy to Hair Dye`
#> $`Allergy to Hair Dye`$phenotype_id
#> [1] 370
#>
#> $`Allergy to Hair Dye`$variation
#> [1] "None"
#>
#>
#> $`Do You Have Lucid Dreams?`
#> $`Do You Have Lucid Dreams?`$phenotype_id
#> [1] 328
#>
#> $`Do You Have Lucid Dreams?`$variation
#> [1] "No"
```



```r
phenotypes(userid='1,6,8', df=TRUE)[[1]][1:10,]
```

```
#> https://opensnp.org/phenotypes/json/1,6,8.json
```

```
#>                       phenotype phenotypeID  variation
#> 1                    syndactyly         372       None
#> 2           Allergy to Hair Dye         370       None
#> 3     Do You Have Lucid Dreams?         328         No
#> 4            Multiple Sclerosis         215       None
#> 5      Can you smell cut-grass?         168        Yes
#> 6  Daily Sleep Duration (hours)         269        4-6
#> 7                    blood type         290         A+
#> 8             Cocaine addiction         486         No
#> 9          macular degeneration         542         No
#> 10                         Diet         533 Vegetarian
```


```r
out <- phenotypes(userid='1-8', df=TRUE)
```

```
#> https://opensnp.org/phenotypes/json/1-8.json
```

```r
lapply(out, head)
```

```
#> $`Bastian Greshake Tzovaras`
#>                      phenotype phenotypeID variation
#> 1                   syndactyly         372      None
#> 2          Allergy to Hair Dye         370      None
#> 3    Do You Have Lucid Dreams?         328        No
#> 4           Multiple Sclerosis         215      None
#> 5     Can you smell cut-grass?         168       Yes
#> 6 Daily Sleep Duration (hours)         269       4-6
#>
#> $Senficon
#>   phenotype phenotypeID variation
#> 1   no data     no data   no data
#>
#> $`no info on user_3`
#>   phenotype phenotypeID variation
#> 1   no data     no data   no data
#>
#> $`no info on user_4`
#>   phenotype phenotypeID variation
#> 1   no data     no data   no data
#>
#> $`no info on user_5`
#>   phenotype phenotypeID variation
#> 1   no data     no data   no data
#>
#> $`Nash Parovoz`
#>                          phenotype phenotypeID        variation
#> 1                       Handedness           3     right-handed
#> 2                        Eye color           1            brown
#> 3                       white skin           4        Caucasian
#> 4              Lactose intolerance           2 lactose-tolerant
#> 5 Ability to find a bug in openSNP           5   extremely high
#> 6           Number of wisdom teeth          57                4
#>
#> $`no info on user_7`
#>   phenotype phenotypeID variation
#> 1   no data     no data   no data
#>
#> $`Samantha B. Clark`
#>                             phenotype phenotypeID           variation
#> 1                            Gambling         539                  No
#> 2                 Caffeine dependence         538                  No
#> 3            Dietary supplements used         534                 b12
#> 4                                Diet         533 Vegan / plant-based
#> 5                   Tooth sensitivity         532         Sweet, cold
#> 6 OCD - Obsessive-Compulsive Disorder         555                  No
```

#### All known variations

Get all known variations and all users sharing that phenotype for one phenotype(-ID).


```r
phenotypes_byid(phenotypeid=12, return_ = 'desc')
```

```
#> https://opensnp.org/phenotypes/json/variations/12.json
```

```
#> $id
#> [1] 12
#>
#> $characteristic
#> [1] "Beard Color"
#>
#> $description
#> [1] "coloration of facial hair"
```


```r
phenotypes_byid(phenotypeid=12, return_ = 'knownvars')
```

```
#> https://opensnp.org/phenotypes/json/variations/12.json
```

```
#> $known_variations
#> $known_variations[[1]]
#> [1] "Red"
#>
#> $known_variations[[2]]
#> [1] "Blonde"
#>
#> $known_variations[[3]]
#> [1] "Red-brown"
#>
#> $known_variations[[4]]
#> [1] "Red-blonde-brown-black(in diferent parts i have different color,for example near the lips blond-red"
#>
#> $known_variations[[5]]
#> [1] "No beard-female"
#>
#> $known_variations[[6]]
#> [1] "Brown-black"
#>
#> $known_variations[[7]]
#> [1] "Blonde-brown"
#>
#> $known_variations[[8]]
#> [1] "Black"
#>
#> $known_variations[[9]]
#> [1] "Dark brown with minor blondish-red"
#>
#> $known_variations[[10]]
#> [1] "Brown-grey"
#>
#> $known_variations[[11]]
#> [1] "Red-blonde-brown-black"
#>
#> $known_variations[[12]]
#> [1] "Blond-brown"
#>
#> $known_variations[[13]]
#> [1] "Brown, some red"
#>
#> $known_variations[[14]]
#> [1] "Brown"
#>
#> $known_variations[[15]]
#> [1] "Brown-gray"
#>
#> $known_variations[[16]]
#> [1] "Never had a beard"
#>
#> $known_variations[[17]]
#> [1] "I'm a woman"
#>
#> $known_variations[[18]]
#> [1] "Black-brown-blonde"
#>
#> $known_variations[[19]]
#> [1] "Was red-brown now mixed with gray,"
#>
#> $known_variations[[20]]
#> [1] "Red-blonde-brown"
#>
#> $known_variations[[21]]
#> [1] "Dark brown w/few blonde & red hairs"
#>
#> $known_variations[[22]]
#> [1] "Dark blonde with red and light blonde on goatee area."
#>
#> $known_variations[[23]]
#> [1] "Black with few red hairs"
#>
#> $known_variations[[24]]
#> [1] "Black, graying"
#>
#> $known_variations[[25]]
#> [1] "Red, moustache still is, beard mostly white"
#>
#> $known_variations[[26]]
#> [1] "Blonde/brown-some black-and red on chin-all starting to gray"
#>
#> $known_variations[[27]]
#> [1] "Dark brown"
#>
#> $known_variations[[28]]
#> [1] "Every possible color, most hair shafts have more than one color at different points along the shaft"
```


```r
phenotypes_byid(phenotypeid=12, return_ = 'users')[1:10,]
```

```
#> https://opensnp.org/phenotypes/json/variations/12.json
```

```
#>    user_id
#> 1       22
#> 2        1
#> 3       26
#> 4       10
#> 5       14
#> 6       42
#> 7       45
#> 8       16
#> 9        8
#> 10     661
#>                                                                                              variation
#> 1                                                                                                  Red
#> 2                                                                                               Blonde
#> 3                                                                                            red-brown
#> 4  Red-Blonde-Brown-Black(in diferent parts i have different color,for example near the lips blond-red
#> 5                                                                                      No beard-female
#> 6                                                                                          Brown-black
#> 7  Red-Blonde-Brown-Black(in diferent parts i have different color,for example near the lips blond-red
#> 8                                                                                         blonde-brown
#> 9                                                                                      No beard-female
#> 10                                                                                         Brown-black
```

#### OpenSNP users


```r
data <- users(df=FALSE)
data[1:2]
```

```
#> [[1]]
#> [[1]]$name
#> [1] "gigatwo"
#>
#> [[1]]$id
#> [1] 31
#>
#> [[1]]$genotypes
#> list()
#>
#>
#> [[2]]
#> [[2]]$name
#> [1] "Anu Acharya"
#>
#> [[2]]$id
#> [1] 385
#>
#> [[2]]$genotypes
#> list()
```

### NCBI SNP data


#### dbSNP

Query NCBI's dbSNP for information on a set of SNPs

An example with both merged SNPs, non-SNV SNPs, regular SNPs, SNPs not found, microsatellite


```r
snps <- c("rs332", "rs420358", "rs1837253", "rs1209415715", "rs111068718")
NCBI_snp_query(snps)
```

```
#> Warning: use ncbi_snp_query instead - NCBI_snp_query removed in next
#> version
```

```
#> Warning: The following rsIds had no information available on NCBI:
#>   rs1209415715, rs111068718
```

```
#> Warning: rs332 has been merged into rs121909001
```

```
#>       Query Chromosome      Marker  Class Gene Alleles Major Minor    MAF
#> 1     rs332          7 rs121909001 in-del CFTR   -/TTT  <NA>  <NA>     NA
#> 2  rs420358          1    rs420358    snp <NA>     G,T     G     T     NA
#> 3 rs1837253          5   rs1837253    snp <NA>     C/T     C     T 0.3822
#>          BP AncestralAllele
#> 1 117559593            <NA>
#> 2  40341239     T,T,T,T,T,T
#> 3 111066174     T,T,T,T,T,T
```


### Citing

To cite `rsnps` in publications use:

<br>

> Scott Chamberlain, Kevin Ushey and Hao Zhu (2016). rsnps: Get 'SNP'
  ('Single-Nucleotide' 'Polymorphism') Data on the Web. R package
  version 0.2.0. https://CRAN.R-project.org/package=rsnps


### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rsnps](https://github.com/ropensci/rsnps/issues?state=open)

[Back to top](#top)
