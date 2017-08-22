---
title: europepmc tutorial
package_version: 0.1.0
---



[Europe PMC](http://europepmc.org/) covers life science literature and
gives access to open access full texts. Europe
PMC ingests all PubMed content and extends its index with other sources,
including Agricola, a bibliographic database of citations to the agricultural
literature, or Biological Patents.

![Index coverage](https://europepmc.org/wicket/resource/uk.bl.ukpmc.web.pages.faq.Help/images/EuropePMCContent-ver-4BB17F003F8F38DF2D3BBE48AB5896C6.png)

For more background, see <https://europepmc.org/About>

<section id="installation">

## Installation


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

<section id="usage">

## Usage

### Search Europe PMC

The search covers both metadata (e.g. abstracts or title) and full texts. To
build your query, please refer to the comprehensive guidance on how to search
Europe PMC: <http://europepmc.org/help>. Simply provide your query in the Europe
PMC search syntax to `epmc_search()`.

The search function helps to get a general overview about additional
information types that are offered by Europe PMC and which can be retrieved
through other `europepmc`-functions. Columns inform whether open access full texts
(`isOpenAccess`), cross-links to other EBI databases (`hasDbCrossReferences`),
text-mined terms (`hasTextMinedTerms`) or references (`hasReferences`) are
available.

By default, `epmc_search` returns 25 records. To adjust the limit, simply use
the `limit` parameter.

Either list of publication ids (`id_list = TRUE`) or key metadata
information  (`id_list = FALSE`, default option) are returned.

For instance, search for abstracts and full texts that mention `Gabi-Kat`:


```r
library(europepmc)
my_data <- epmc_search(query = 'Gabi-Kat')
```

first six records


```r
head(my_data)
```

```
#>         id source     pmid      pmcid                          doi
#> 1 27117628    MED 27117628 PMC4846993            10.1038/srep24971
#> 2 26842807    MED 26842807 PMC4740857            10.1038/srep20309
#> 3 26930070    MED 26930070 PMC4773003 10.1371/journal.pone.0150254
#> 4 26957563    MED 26957563 PMC4861014           10.1093/jxb/erw096
#> 5 27064270    MED 27064270 PMC4814454      10.3389/fpls.2016.00405
#> 6 26824478    MED 26824478 PMC4733102 10.1371/journal.pone.0148335
#>                                                                                                                                                                                                                  title
#> 1                                                                                                                         Cancer-specific binary expression system activated in mice by bacteriophage HK022 Integrase.
#> 2                                                                                  Precocious leaf senescence by functional loss of PROTEIN S-ACYL TRANSFERASE14 involves the NPR1-dependent salicylic acid signaling.
#> 3 The Arabidopsis Domain of Unknown Function 1218 (DUF1218) Containing Proteins, MODIFYING WALL LIGNIN-1 and 2 (At1g31720/MWL-1 and At4g19370/MWL-2) Function Redundantly to Alter Secondary Cell Wall Lignin Content.
#> 4                                                                                                                                                                  SLTAB2 is the paramutated SULFUREA locus in tomato.
#> 5                                                                                          Photosystem II Repair and Plant Immunity: Lessons Learned from Arabidopsis Mutant Lacking the THYLAKOID LUMEN PROTEIN 18.3.
#> 6                                                                                            The Early-Acting Peroxin PEX19 Is Redundantly Encoded, Farnesylated, and Essential for Viability in Arabidopsis thaliana.
#>                                                                                               authorString
#> 1 Elias A, Spector I, Sogolovsky-Bard I, Gritsenko N, Rask L, Mainbakh Y, Zilberstein Y, Yagil E, Kolot M.
#> 2                                                Zhao XY, Wang JG, Song SJ, Wang Q, Kang H, Zhang Y, Li S.
#> 3                                               Mewalal R, Mizrachi E, Coetzee B, Mansfield SD, Myburg AA.
#> 4                                                                          Gouil Q, Novák O, Baulcombe DC.
#> 5                            Järvi S, Isojärvi J, Kangasjärvi S, Salojärvi J, Mamedov F, Suorsa M, Aro EM.
...
```

Get PLOS Genetics (ISSN:1553-7404) articles that cross-reference EMBL:


```r
my_data <- epmc_search(query = 'ISSN:1553-7404 HAS_EMBL:y')
head(my_data)
```

```
#>         id source     pmid      pmcid                          doi
#> 1 26982327    MED 26982327 PMC4794157 10.1371/journal.pgen.1005920
#> 2 27082250    MED 27082250 PMC4833346 10.1371/journal.pgen.1005954
#> 3 27149082    MED 27149082 PMC4858218 10.1371/journal.pgen.1006030
#> 4 27327578    MED 27327578 PMC4915694 10.1371/journal.pgen.1006110
#> 5 27120580    MED 27120580 PMC4847869 10.1371/journal.pgen.1005987
#> 6 27203426    MED 27203426 PMC4874600 10.1371/journal.pgen.1006063
#>                                                                                                                                                                                                    title
#> 1                                                                                                            Hybrid Dysgenesis in Drosophila simulans Associated with a Rapid Invasion of the P-Element.
#> 2                                                                                        Chromosomal-Level Assembly of the Asian Seabass Genome Using Long Sequence Reads and Multi-layered Scaffolding.
#> 3 Germline Defects Caused by Smed-boule RNA-Interference Reveal That Egg Capsule Deposition Occurs Independently of Fertilization, Ovulation, Mating, or the Presence of Gametes in Planarian Flatworms.
#> 4                                                                                                                      Genetic Dissection of Sexual Reproduction in a Primary Homothallic Basidiomycete.
#> 5                                                 An Indel Polymorphism in the MtnA 3' Untranslated Region Is Associated with Gene Expression Variation and Local Adaptation in Drosophila melanogaster.
#> 6                                                                                                Antimicrobial Functions of Lactoferrin Promote Genetic Conflicts in Ancient Primates and Modern Humans.
#>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             authorString
#> 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Hill T, Schlötterer C, Betancourt AJ.
#> 2 Vij S, Kuhl H, Kuznetsova IS, Komissarov A, Yurchenko AA, Van Heusden P, Singh S, Thevasagayam NM, Prakki SR, Purushothaman K, Saju JM, Jiang J, Mbandi SK, Jonas M, Hin Yan Tong A, Mwangi S, Lau D, Ngoh SY, Liew WC, Shen X, Hon LS, Drake JP, Boitano M, Hall R, Chin CS, Lachumanan R, Korlach J, Trifonov V, Kabilov M, Tupikin A, Green D, Moxon S, Garvin T, Sedlazeck FJ, Vurture GW, Gopalapillai G, Kumar Katneni V, Noble TH, Scaria V, Sivasubbu S, Jerry DR, O'Brien SJ, Schatz MC, Dalmay T, Turner SW, Lok S, Christoffels A, Orbán L.
#> 3                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Steiner JK, Tasaki J, Rouhana L.
#> 4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                David-Palma M, Sampaio JP, Gonçalves P.
#> 5                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Catalán A, Glaser-Schmitt A, Argyridou E, Duchen P, Parsch J.
...
```

### Get results number

Count hits before with `epmc_hits` to define limit. For example, get list of ids
that represent articles referencing DataCite DOIs:


```r
query <- "ACCESSION_TYPE:doi"
epmc_hits(query)
```

```
#> [1] 5687
```

```r
# set limit to 10 records
my_data <- epmc_search(query = "ACCESSION_TYPE:doi", limit = 10,
                       id_list = TRUE)
head(my_data)
```

```
#>         id source     pmid      pmcid
#> 1 26955653    MED 26955653 PMC4761700
#> 2 27064844    MED 27064844 PMC4814564
#> 3 26977150    MED 26977150 PMC4762996
#> 4 26989573    MED 26989573 PMC4790197
#> 5 27081240    MED 27081240 PMC4813066
#> 6 26952022    MED 26952022 PMC4761652
```

```r
attr(my_data, "hit_count")
```

```
#> [1] 5687
```

### Search with ORCID

Use [ORCID](http://orcid.org/) to search for personal publications:


```r
my_data <- epmc_search(query = 'AUTHORID:"0000-0002-7635-3473"')
attr(my_data, "hit_count")
```

```
#> [1] 127
```

### Include MeSH and UniProt synonyms

You may also want to include synonyms when searching Europe PMC. If
`synonym = TRUE` MeSH and UniProt synonyms are searched as well.


```r
my_data <- epmc_search("aspirin", synonym = TRUE)
attr(my_data, "hit_count")
```

```
#> [1] 113787
```

```r
my_data <- epmc_search("aspirin", synonym = FALSE)
attr(my_data, "hit_count")
```

```
#> [1] 106435
```

### Get article details

In addition to key metadata, `epmc_details` also returns full metadata
providing more comprehensive information on the article-level. By default,
PubMed / Medline index is searched.



```r
epmc_details(ext_id = "24270414")
```

```
#> $basic
#>         id source     pmid      pmcid              doi
#> 1 24270414    MED 24270414 PMC3859427 10.1172/jci73168
#>                                     title                 authorString
#> 1 ADCK4 "reenergizes" nephrotic syndrome. Malaga-Dieguez L, Susztak K.
#>   pubYear  pageInfo
#> 1    2013 4996-4999
#>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         abstractText
#> 1 Steroid-resistant nephrotic syndrome has a poor prognosis and often leads to end-stage renal disease development. In this issue of the JCI, Ashraf and colleagues used exome sequencing to identify mutations in the aarF domain containing kinase 4 (ADCK4) gene that cause steroid-resistant nephrotic syndrome. Patients with ADCK4 mutations had lower coenzyme Q10 levels, and coenzyme Q10 supplementation ameliorated renal disease in a patient with this particular mutation, suggesting a potential therapy for patients with steroid-resistant nephrotic syndrome with ADCK4 mutations.
#>   language         pubModel isOpenAccess inEPMC inPMC hasPDF hasBook
#> 1      eng Print-Electronic            N      Y     Y      Y       N
#>   hasSuppl citedByCount hasReferences hasTextMinedTerms
#> 1        N            1             Y                 Y
#>   hasDbCrossReferences hasLabsLinks epmcAuthMan hasTMAccessionNumbers
#> 1                    N            Y           N                     N
#>   dateOfCompletion dateOfCreation dateOfRevision electronicPublicationDate
#> 1       2014-02-04     2013-12-02     2015-07-10                2013-11-25
#>   firstPublicationDate luceneScore
#> 1           2013-11-25         NaN
#>
...
```

Show author details including ORCID:


```r
my_data <- epmc_details(ext_id = "14756321")
my_data$author_details
```

```
#>      fullName firstName  lastName initials authorId.type
#> 1    Rosso MG   Mario G     Rosso       MG          <NA>
#> 2        Li Y      Yong        Li        Y          <NA>
#> 3  Strizhov N   Nicolai  Strizhov        N          <NA>
#> 4     Reiss B     Bernd     Reiss        B         ORCID
#> 5    Dekker K      Koen    Dekker        K          <NA>
#> 6 Weisshaar B     Bernd Weisshaar        B         ORCID
#>        authorId.value
#> 1                <NA>
#> 2                <NA>
#> 3                <NA>
#> 4 0000-0002-2521-4000
#> 5                <NA>
#> 6 0000-0002-7635-3473
```

### Get citation counts and citing publications

Citing publications from the Europe PMC index can be retrieved like this:


```r
my_cites <- epmc_citations("9338777")
head(my_cites)
```

```
#>         id source
#> 1  9811736    MED
#> 2  9525633    MED
#> 3  9728986    MED
#> 4  9728985    MED
#> 5  9728987    MED
#> 6 10590090    MED
#>                                                                              citationType
#> 1                                       Journal Article; Research Support, Non-U.S. Gov't
#> 2                                                                         Journal Article
#> 3 Journal Article; Research Support, Non-U.S. Gov't; Research Support, U.S. Gov't, P.H.S.
#> 4                                       Journal Article; Research Support, Non-U.S. Gov't
#> 5                         Case Reports; Journal Article; Research Support, Non-U.S. Gov't
#> 6                                       Journal Article; Research Support, Non-U.S. Gov't
#>                                                                                                                  title
#> 1                                   Host range and interference studies of three classes of pig endogenous retrovirus.
#> 2              Type C retrovirus released from porcine primary peripheral blood mononuclear cells infects human cells.
#> 3          No evidence of infection with porcine endogenous retrovirus in recipients of porcine islet-cell xenografts.
#> 4           Expression of pig endogenous retrovirus by primary porcine endothelial cells and infection of human cells.
#> 5 No evidence of pig DNA or retroviral infection in patients with short-term extracorporeal connection to pig kidneys.
#> 6                                          Extended analysis of the in vitro tropism of porcine endogenous retrovirus.
#>                                                                                                       authorString
#> 1                                  Takeuchi Y, Patience C, Magre S, Weiss RA, Banerjee PT, Le Tissier P, Stoye JP.
#> 2                                                       Wilson CA, Wong S, Muller J, Davidson CE, Rose TM, Burd P.
#> 3 Heneine W, Tibell A, Switzer WM, Sandstrom P, Rosales GV, Mathews A, Korsgren O, Chapman LE, Folks TM, Groth CG.
#> 4                               Martin U, Kiessig V, Blusch JH, Haverich A, von der Helm K, Herden T, Steinhoff G.
#> 5                                  Patience C, Patton GS, Takeuchi Y, Weiss RA, McClure MO, Rydberg L, Breimer ME.
#> 6                                                                 Wilson CA, Wong S, VanBrocklin M, Federspiel MJ.
#>   journalAbbreviation pubYear volume issue  pageInfo citedByCount
#> 1           J. Virol.    1998     72    12 9986-9991          194
#> 2           J. Virol.    1998     72     4 3082-3087          194
#> 3              Lancet    1998    352  9129   695-699          172
#> 4              Lancet    1998    352  9129   692-694          156
#> 5              Lancet    1998    352  9129   699-701          146
#> 6           J. Virol.    2000     74     1     49-56          111
```

```r
attr(my_cites, "hit_count")
```

```
#> [1] 195
```

Please note, that citation counts are often smaller than those held by toll-
access services such as Web of Science or Scopus because the number of
reference sections indexed for Europe PMC considerably differs due to the
lack of full text accessibility.

### Get reference section

Europe PMC indexes more than 5 million reference sections.


```r
epmc_refs("PMC3166943", data_src = "pmc")
```

```
#>          id source    citationType
#> 1  10802651    MED JOURNAL ARTICLE
#> 2      <NA>   <NA>            <NA>
#> 3  18077472    MED JOURNAL ARTICLE
#> 4  15642104    MED JOURNAL ARTICLE
#> 5  18460184    MED JOURNAL ARTICLE
#> 6  17989687    MED JOURNAL ARTICLE
#> 7  20848809    MED JOURNAL ARTICLE
#> 8  20139945    MED JOURNAL ARTICLE
#> 9      <NA>   <NA>            <NA>
#> 10 17267433    MED JOURNAL ARTICLE
#> 11 15199967    MED JOURNAL ARTICLE
#> 12 14681407    MED JOURNAL ARTICLE
#> 13 16756499    MED JOURNAL ARTICLE
#> 14 16959967    MED JOURNAL ARTICLE
#> 15 16518471    MED JOURNAL ARTICLE
#> 16 11901169    MED JOURNAL ARTICLE
#> 17 15892874    MED JOURNAL ARTICLE
#> 18     <NA>   <NA>            <NA>
#>                                                                                              title
...
```

Tip: add `has_reflist:y` to your search string in `epmc_search` to make sure
you only get publications whose reference sections are accessible through
Europe PMC.

### Retrieve links to other EBI databases

Cross-links to EBI databases are either manually curated (ENA, InterPro, PDB,
IntAct, ChEMBL, ChEBI and ArrayExpress) or automatically gathered through
text-mining (European Nucleotide Archive, UniProt, PDB, OMIM, RefSNP, RefSeq,
Pfam, InterPro, Ensembl, ArrayExpress and data DOIs).

Before retrieving the links, please check availability and sources first:


```r
epmc_db_count("12368864")
```

```
#>     dbName count
#> 1     EMBL    10
#> 2 INTERPRO     1
#> 3  UNIPROT  5588
```

Add `has_xrefs:y` or to your search string in `epmc_search` to make sure
you only get publications with cross-references to EBI databases.

Select database and get links:


```r
epmc_db("12368864", db = "embl")
```

```
#>       info1                                                       info2
#> 1  AE014187 Plasmodium falciparum 3D7 chromosome 14, complete sequence.
#> 2  AE014186 Plasmodium falciparum 3D7 chromosome 11, complete sequence.
#> 3  LN999943  Plasmodium falciparum 3D7 chromosome 2, complete sequence.
#> 4  AE001362  Plasmodium falciparum 3D7 chromosome 2, complete sequence.
#> 5  LN999947 Plasmodium falciparum 3D7 chromosome 12, complete sequence.
#> 6  AE014185 Plasmodium falciparum 3D7 chromosome 10, complete sequence.
#> 7  LN999944 Plasmodium falciparum 3D7 chromosome 10, complete sequence.
#> 8  LN999945 Plasmodium falciparum 3D7 chromosome 11, complete sequence.
#> 9  LN999946 Plasmodium falciparum 3D7 chromosome 14, complete sequence.
#> 10 AE014188 Plasmodium falciparum 3D7 chromosome 12, complete sequence.
#>      info3 info4
#> 1  3291871    10
#> 2  2038337    10
#> 3   947102    10
#> 4   947102    10
#> 5  2271494    10
#> 6  1687655    10
#> 7  1687656    10
#> 8  2038340    10
#> 9  3291936    10
#> 10 2271478    10
```

### Get text-mined terms

Text-mined terms that can be accessed via Europe PMC are mapped against
controlled vocabularies such as [Gene
Ontology](http://www.ebi.ac.uk/QuickGO/).

Before retrieving these terms, please check availability and vocabularies
first:


```r
epmc_tm_count("25249410")
```

```
#>           name count
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
epmc_tm("25249410", semantic_type = "GO_TERM")
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

### Links to external sources

With the External Link services, Europe PMC allows third parties to publish
links from Europe PMC to other webpages. Current External Link providers,
whose id can be found through Europe PMC's Advanced Search interface, include
Wikipedia, Dryad Digital Repository or the institutional repo of Bielefeld
University. For more information, see <http://europepmc.org/labslink>.

Check availability and number of links:


```r
epmc_lablinks_count("PMC3986813", data_src = "pmc")
```

```
#>       providerName linksCount
#> 1 EBI Train Online          1
#> 2        Wikipedia          1
#> 3          Publons          1
#> 4        Altmetric          1
```

Get links to PANGEA (`lab_id = "1342"`)


```r
epmc_lablinks("24023770", lab_id = "1342")
```

```
#>                                                                                                                                                                                                title
#> 1  Related to: Schewe, I (2010). Biochemical investigation of multicorer sediment profile PS74/106-3. Alfred Wegener Institute, Helmholtz Center for Polar and Marine Research, Bremerhaven, PANGAEA
#> 2  Related to: Schewe, I (2010). Biochemical investigation of multicorer sediment profile PS74/107-2. Alfred Wegener Institute, Helmholtz Center for Polar and Marine Research, Bremerhaven, PANGAEA
#> 3  Related to: Schewe, I (2010). Biochemical investigation of multicorer sediment profile PS74/108-2. Alfred Wegener Institute, Helmholtz Center for Polar and Marine Research, Bremerhaven, PANGAEA
#> 4  Related to: Schewe, I (2010). Biochemical investigation of multicorer sediment profile PS74/109-2. Alfred Wegener Institute, Helmholtz Center for Polar and Marine Research, Bremerhaven, PANGAEA
#> 5  Related to: Schewe, I (2010). Biochemical investigation of multicorer sediment profile PS74/113-2. Alfred Wegener Institute, Helmholtz Center for Polar and Marine Research, Bremerhaven, PANGAEA
#> 6  Related to: Schewe, I (2010). Biochemical investigation of multicorer sediment profile PS74/116-2. Alfred Wegener Institute, Helmholtz Center for Polar and Marine Research, Bremerhaven, PANGAEA
#> 7  Related to: Schewe, I (2010). Biochemical investigation of multicorer sediment profile PS74/118-2. Alfred Wegener Institute, Helmholtz Center for Polar and Marine Research, Bremerhaven, PANGAEA
#> 8  Related to: Schewe, I (2010). Biochemical investigation of multicorer sediment profile PS74/119-2. Alfred Wegener Institute, Helmholtz Center for Polar and Marine Research, Bremerhaven, PANGAEA
#> 9  Related to: Schewe, I (2010). Biochemical investigation of multicorer sediment profile PS74/120-2. Alfred Wegener Institute, Helmholtz Center for Polar and Marine Research, Bremerhaven, PANGAEA
#> 10 Related to: Schewe, I (2010). Biochemical investigation of multicorer sediment profile PS74/121-1. Alfred Wegener Institute, Helmholtz Center for Polar and Marine Research, Bremerhaven, PANGAEA
#> 11 Related to: Schewe, I (2010). Biochemical investigation of multicorer sediment profile PS74/127-2. Alfred Wegener Institute, Helmholtz Center for Polar and Marine Research, Bremerhaven, PANGAEA
#> 12 Related to: Schewe, I (2010). Biochemical investigation of multicorer sediment profile PS74/128-2. Alfred Wegener Institute, Helmholtz Center for Polar and Marine Research, Bremerhaven, PANGAEA
#> 13 Related to: Schewe, I (2010). Biochemical investigation of multicorer sediment profile PS74/129-3. Alfred Wegener Institute, Helmholtz Center for Polar and Marine Research, Bremerhaven, PANGAEA
#>                                         url imgUrl lab_id lab_name
#> 1  http://dx.doi.org/10.1594/PANGAEA.744673     NA   1342  PANGAEA
#> 2  http://dx.doi.org/10.1594/PANGAEA.744674     NA   1342  PANGAEA
#> 3  http://dx.doi.org/10.1594/PANGAEA.744675     NA   1342  PANGAEA
#> 4  http://dx.doi.org/10.1594/PANGAEA.744676     NA   1342  PANGAEA
#> 5  http://dx.doi.org/10.1594/PANGAEA.744677     NA   1342  PANGAEA
...
```

### Full text access

Full texts are in XML format and are only provided for the Open Access subset
of Europe PMC. They can be retrieved by the PMCID.


```r
epmc_ftxt("PMC3257301")
```

```
#> {xml_document}
#> <article article-type="research-article" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:mml="http://www.w3.org/1998/Math/MathML">
#> [1] <front>\n  <journal-meta>\n    <journal-id journal-id-type="nlm-ta"> ...
#> [2] <body>\n  <sec id="s1">\n    <title>Introduction</title>\n    <p>Atm ...
#> [3] <back>\n  <ack>\n    <p>We would like to thank Dr. C. Gourlay and Dr ...
```

Books, fetched through the PMID or the 'NBK' book number, can be loaded
as XML into R with the `epmc_ftxt_book()` function.

Please check full-text availability before.


<section id="citing">

## Citing

To cite `europepmc` in publications use:

<br>

> Najko Jahn (2016). europepmc: R Interface to the Europe PubMed Central RESTful Web Service. R
  package version 0.1.0. https://cran.rstudio.com/package=europepmc

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for europepmc](https://github.com/ropensci/europepmc/issues?state=open)

[Back to top](#top)
