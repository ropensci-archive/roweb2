---
title: fulltext vignette
package_version: 0.1.8
---




`fulltext` is a package to facilitate text mining. It focuses on open access journals. This package makes it easier to search for articles, download those articles in full text if available, convert pdf format to plain text, and extract text chunks for vizualization/analysis. We are planning to add bits for analysis in future versions. The steps in bullet form:

* Search - search for articles
* Retrieve - get full text
* Convert - convert from format X to Y
* Text - if needed, get text from pdfs/etc.
* Extract - pull out the bits of articles that you want

### Installation

You can install from CRAN


```r
install.packages("fulltext")
```

Or the development version from GitHub


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropensci/fulltext")
```

Load the package


```r
library("fulltext")
```



### Usage

#### Search for articles

Search for the term _ecology_ in PLOS journals.


```r
(res1 <- ft_search(query = 'ecology', from = 'plos'))
```

```
#> Query:
#>   [ecology] 
#> Found:
#>   [PLoS: 40269; BMC: 0; Crossref: 0; Entrez: 0; arxiv: 0; biorxiv: 0; Europe PMC: 0] 
#> Returned:
#>   [PLoS: 10; BMC: 0; Crossref: 0; Entrez: 0; arxiv: 0; biorxiv: 0; Europe PMC: 0]
```

Each publisher/search-engine has a slot with metadata and data


```r
res1$plos
```

```
#> Query: [ecology] 
#> Records found, returned: [40269, 10] 
#> License: [CC-BY] 
#>                              id
#> 1  10.1371/journal.pone.0001248
#> 2  10.1371/journal.pone.0059813
#> 3  10.1371/journal.pone.0155019
#> 4  10.1371/journal.pone.0080763
#> 5  10.1371/journal.pone.0150648
#> 6  10.1371/journal.pcbi.1003594
#> 7  10.1371/journal.pone.0102437
#> 8  10.1371/journal.pone.0175014
#> 9  10.1371/journal.pone.0166559
#> 10 10.1371/journal.pone.0054689
```

#### Get full text

Using the results from `ft_search()` we can grab full text of some articles


```r
(out <- ft_get(res1))
```

```
#> <fulltext text>
#> [Docs] 10 
#> [Source] R session  
#> [IDs] 10.1371/journal.pone.0001248 10.1371/journal.pone.0059813
#>      10.1371/journal.pone.0155019 10.1371/journal.pone.0080763
#>      10.1371/journal.pone.0150648 10.1371/journal.pcbi.1003594
#>      10.1371/journal.pone.0102437 10.1371/journal.pone.0175014
#>      10.1371/journal.pone.0166559 10.1371/journal.pone.0054689 ...
```

Dig in to the PLOS data


```r
out$plos
```

```
#> $found
#> [1] 10
#> 
#> $dois
#>  [1] "10.1371/journal.pone.0001248" "10.1371/journal.pone.0059813"
#>  [3] "10.1371/journal.pone.0155019" "10.1371/journal.pone.0080763"
#>  [5] "10.1371/journal.pone.0150648" "10.1371/journal.pcbi.1003594"
#>  [7] "10.1371/journal.pone.0102437" "10.1371/journal.pone.0175014"
#>  [9] "10.1371/journal.pone.0166559" "10.1371/journal.pone.0054689"
#> 
#> $data
#> $data$backend
#> NULL
#> 
#> $data$path
#> [1] "session"
#> 
#> $data$data
#> 10 full-text articles retrieved 
#> Min. Length: 47196 - Max. Length: 133746 
#> DOIs: 10.1371/journal.pone.0001248 10.1371/journal.pone.0059813
#>   10.1371/journal.pone.0155019 10.1371/journal.pone.0080763
#>   10.1371/journal.pone.0150648 10.1371/journal.pcbi.1003594
#>   10.1371/journal.pone.0102437 10.1371/journal.pone.0175014
#>   10.1371/journal.pone.0166559 10.1371/journal.pone.0054689 ... 
#> 
#> NOTE: extract xml strings like output['<doi>']
#> 
#> $opts
#> $opts$doi
#>  [1] "10.1371/journal.pone.0001248" "10.1371/journal.pone.0059813"
#>  [3] "10.1371/journal.pone.0155019" "10.1371/journal.pone.0080763"
#>  [5] "10.1371/journal.pone.0150648" "10.1371/journal.pcbi.1003594"
#>  [7] "10.1371/journal.pone.0102437" "10.1371/journal.pone.0175014"
#>  [9] "10.1371/journal.pone.0166559" "10.1371/journal.pone.0054689"
```

Dig in further to get to one of the articles in XML format


```r
library("xml2")
xml2::read_xml(out$plos$data$data$`10.1371/journal.pone.0059813`)
```

```
#> {xml_document}
#> <article article-type="research-article" dtd-version="3.0" lang="en" xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:xlink="http://www.w3.org/1999/xlink">
#> [1] <front>\n  <journal-meta>\n    <journal-id journal-id-type="nlm-ta"> ...
#> [2] <body>\n  <sec id="s1">\n    <title>Introduction</title>\n    <p>Eco ...
#> [3] <back>\n  <ack>\n    <p>Curtis Flather, Mark Burgman, Leon Blaustein ...
```

#### Extract text from pdfs

Ideally for text mining you have access to XML or other text based formats. However, sometimes you only have access to PDFs. In this case you want to extract text from PDFs. `fulltext` can help with that.

You can extract from any pdf from a file path, like:


```r
path <- system.file("examples", "example1.pdf", package = "fulltext")
ft_extract(path)
```

```
#> <document>/Library/Frameworks/R.framework/Versions/3.4/Resources/library/fulltext/examples/example1.pdf
#>   Pages: 18
#>   Title: Suffering and mental health among older people living in nursing homes---a mixed-methods study
#>   Producer: pdfTeX-1.40.10
#>   Creation date: 2015-07-17
```

Let's search for articles from arXiv, a preprint service. Here, get pdf from an article with ID `cond-mat/9309029`:


```r
res <- ft_get('cond-mat/9309029', from = "arxiv")
res2 <- ft_extract(res)
res2$arxiv$data
```

```
#> $backend
#> NULL
#> 
#> $path
#> $path$`cond-mat/9309029`
#> [1] "~/.fulltext/cond-mat_9309029.pdf"
#> 
#> attr(,"format")
#> [1] "xml"
#> 
#> $data
#> $data[[1]]
#> <document>/Users/sacmac/.fulltext/cond-mat_9309029.pdf
#>   Pages: 14
#>   Title: arXiv:cond-mat/9309029v8  26 Jan 1994
#>   Producer: GPL Ghostscript SVN PRE-RELEASE 8.62
#>   Creation date: 2008-02-06
```

And a short snippet of the full text


```r
res2$arxiv$data$data[[1]]$data
#> "arXiv:cond-mat/9309029v8 26 Jan 1994, , FERMILAB-PUB-93/15-T March 1993, Revised:
#> January 1994, The Thermodynamics and Economics of Waste, Dallas C. Kennedy, Research
#> Associate, Fermi National Accelerator Laboratory, P.O. Box 500 MS106, Batavia, Illinois
#> 60510 USA, Abstract, The increasingly relevant problem of natural resource use and
#> waste production, disposal, and reuse is examined from several viewpoints: economic,
#> technical, and thermodynamic. Alternative economies are studied, with emphasis on
#> recycling of waste to close the natural resource cycle. The physical nature of human
#> economies and constraints on recycling and energy efficiency are stated in terms
#> ..."
```

#### Extract text chunks

We have a few functions to help you pull out certain parts of an article. For example, perhaps you want to get just the authors from your articles, or just the abstracts.

Here, we'll search for some PLOS articles, then get their full text, then extract various parts of each article with `chunks()`.


```r
res <- ft_search(query = "ecology", from = "plos")
(x <- ft_get(res))
```

```
#> <fulltext text>
#> [Docs] 10 
#> [Source] R session  
#> [IDs] 10.1371/journal.pone.0001248 10.1371/journal.pone.0059813
#>      10.1371/journal.pone.0155019 10.1371/journal.pone.0080763
#>      10.1371/journal.pone.0150648 10.1371/journal.pcbi.1003594
#>      10.1371/journal.pone.0102437 10.1371/journal.pone.0175014
#>      10.1371/journal.pone.0166559 10.1371/journal.pone.0054689 ...
```

Extract DOIs


```r
x %>% chunks("doi")
```

```
#> $plos
#> $plos$`10.1371/journal.pone.0001248`
#> $plos$`10.1371/journal.pone.0001248`$doi
#> [1] "10.1371/journal.pone.0001248"
#> 
#> 
#> $plos$`10.1371/journal.pone.0059813`
#> $plos$`10.1371/journal.pone.0059813`$doi
#> [1] "10.1371/journal.pone.0059813"
#> 
#> 
#> $plos$`10.1371/journal.pone.0155019`
#> $plos$`10.1371/journal.pone.0155019`$doi
#> [1] "10.1371/journal.pone.0155019"
#> 
#> 
#> $plos$`10.1371/journal.pone.0080763`
#> $plos$`10.1371/journal.pone.0080763`$doi
#> [1] "10.1371/journal.pone.0080763"
#> 
#> 
#> $plos$`10.1371/journal.pone.0150648`
#> $plos$`10.1371/journal.pone.0150648`$doi
#> [1] "10.1371/journal.pone.0150648"
#> 
#> 
#> $plos$`10.1371/journal.pcbi.1003594`
#> $plos$`10.1371/journal.pcbi.1003594`$doi
#> [1] "10.1371/journal.pcbi.1003594"
#> 
#> 
#> $plos$`10.1371/journal.pone.0102437`
#> $plos$`10.1371/journal.pone.0102437`$doi
#> [1] "10.1371/journal.pone.0102437"
#> 
#> 
#> $plos$`10.1371/journal.pone.0175014`
#> $plos$`10.1371/journal.pone.0175014`$doi
#> [1] "10.1371/journal.pone.0175014"
#> 
#> 
#> $plos$`10.1371/journal.pone.0166559`
#> $plos$`10.1371/journal.pone.0166559`$doi
#> [1] "10.1371/journal.pone.0166559"
#> 
#> 
#> $plos$`10.1371/journal.pone.0054689`
#> $plos$`10.1371/journal.pone.0054689`$doi
#> [1] "10.1371/journal.pone.0054689"
```

Extract DOIs and categories


```r
x %>% chunks(c("doi","categories"))
```

```
#> $plos
#> $plos$`10.1371/journal.pone.0001248`
#> $plos$`10.1371/journal.pone.0001248`$doi
#> [1] "10.1371/journal.pone.0001248"
#> 
#> $plos$`10.1371/journal.pone.0001248`$categories
#> [1] "Research Article"             "Ecology"                     
#> [3] "Ecology/Ecosystem Ecology"    "Ecology/Evolutionary Ecology"
#> [5] "Ecology/Theoretical Ecology" 
#> 
#> 
#> $plos$`10.1371/journal.pone.0059813`
#> $plos$`10.1371/journal.pone.0059813`$doi
#> [1] "10.1371/journal.pone.0059813"
#> 
#> $plos$`10.1371/journal.pone.0059813`$categories
#>  [1] "Research Article"                 "Biology"                         
#>  [3] "Ecology"                          "Community ecology"               
#>  [5] "Species interactions"             "Science policy"                  
#>  [7] "Research assessment"              "Research monitoring"             
#>  [9] "Research funding"                 "Government funding of science"   
#> [11] "Research laboratories"            "Science policy and economics"    
#> [13] "Science and technology workforce" "Careers in research"             
#> [15] "Social and behavioral sciences"   "Sociology"                       
#> [17] "Sociology of knowledge"          
#> 
#> 
#> $plos$`10.1371/journal.pone.0155019`
#> $plos$`10.1371/journal.pone.0155019`$doi
#> [1] "10.1371/journal.pone.0155019"
#> 
#> $plos$`10.1371/journal.pone.0155019`$categories
#>  [1] "Research Article"                  
#>  [2] "Biology and life sciences"         
#>  [3] "Behavior"                          
#>  [4] "Recreation"                        
#>  [5] "Biology and life sciences"         
#>  [6] "Ecology"                           
#>  [7] "Ecosystems"                        
#>  [8] "Ecology and environmental sciences"
#>  [9] "Ecology"                           
#> [10] "Ecosystems"                        
#> [11] "Ecology and environmental sciences"
#> [12] "Conservation science"              
#> [13] "Earth sciences"                    
#> [14] "Geography"                         
#> [15] "Human geography"                   
#> [16] "Land use"                          
#> [17] "Social sciences"                   
#> [18] "Human geography"                   
#> [19] "Land use"                          
#> [20] "Biology and life sciences"         
#> [21] "Ecology"                           
#> [22] "Ecosystems"                        
#> [23] "Ecosystem functioning"             
#> [24] "Ecology and environmental sciences"
#> [25] "Ecology"                           
#> [26] "Ecosystems"                        
#> [27] "Ecosystem functioning"             
#> [28] "Biology and life sciences"         
#> [29] "Ecology"                           
#> [30] "Ecological metrics"                
#> [31] "Productivity (ecology)"            
#> [32] "Ecology and environmental sciences"
#> [33] "Ecology"                           
#> [34] "Ecological metrics"                
#> [35] "Productivity (ecology)"            
#> [36] "Biology and life sciences"         
#> [37] "Ecology"                           
#> [38] "Theoretical ecology"               
#> [39] "Ecology and environmental sciences"
#> [40] "Ecology"                           
#> [41] "Theoretical ecology"               
#> [42] "Social sciences"                   
#> [43] "Economics"                         
#> 
#> 
#> $plos$`10.1371/journal.pone.0080763`
#> $plos$`10.1371/journal.pone.0080763`$doi
#> [1] "10.1371/journal.pone.0080763"
#> 
#> $plos$`10.1371/journal.pone.0080763`$categories
#>  [1] "Research Article"     "Biology"              "Ecology"             
#>  [4] "Autecology"           "Behavioral ecology"   "Community ecology"   
#>  [7] "Evolutionary ecology" "Population ecology"   "Evolutionary biology"
#> [10] "Behavioral ecology"   "Evolutionary ecology" "Population biology"  
#> [13] "Population ecology"  
#> 
#> 
#> $plos$`10.1371/journal.pone.0150648`
#> $plos$`10.1371/journal.pone.0150648`$doi
#> [1] "10.1371/journal.pone.0150648"
#> 
#> $plos$`10.1371/journal.pone.0150648`$categories
#>  [1] "Research Article"                  
#>  [2] "Biology and life sciences"         
#>  [3] "Ecology"                           
#>  [4] "Community ecology"                 
#>  [5] "Ecology and environmental sciences"
#>  [6] "Ecology"                           
#>  [7] "Community ecology"                 
#>  [8] "Biology and life sciences"         
#>  [9] "Ecology"                           
#> [10] "Population ecology"                
#> [11] "Ecology and environmental sciences"
#> [12] "Ecology"                           
#> [13] "Population ecology"                
#> [14] "Biology and life sciences"         
#> [15] "Population biology"                
#> [16] "Population ecology"                
#> [17] "Biology and life sciences"         
#> [18] "Neuroscience"                      
#> [19] "Cognitive science"                 
#> [20] "Cognitive psychology"              
#> [21] "Academic skills"                   
#> [22] "Literacy"                          
#> [23] "Biology and life sciences"         
#> [24] "Psychology"                        
#> [25] "Cognitive psychology"              
#> [26] "Academic skills"                   
#> [27] "Literacy"                          
#> [28] "Social sciences"                   
#> [29] "Psychology"                        
#> [30] "Cognitive psychology"              
#> [31] "Academic skills"                   
#> [32] "Literacy"                          
#> [33] "Biology and life sciences"         
#> [34] "Ecology"                           
#> [35] "Ecology and environmental sciences"
#> [36] "Ecology"                           
#> [37] "Biology and life sciences"         
#> [38] "Ecology"                           
#> [39] "Ecosystems"                        
#> [40] "Ecology and environmental sciences"
#> [41] "Ecology"                           
#> [42] "Ecosystems"                        
#> [43] "People and places"                 
#> [44] "Population groupings"              
#> [45] "Age groups"                        
#> [46] "Adults"                            
#> [47] "Biology and life sciences"         
#> [48] "Ecology"                           
#> [49] "Industrial ecology"                
#> [50] "Ecology and environmental sciences"
#> [51] "Ecology"                           
#> [52] "Industrial ecology"                
#> [53] "Engineering and technology"        
#> [54] "Industrial engineering"            
#> [55] "Industrial ecology"                
#> [56] "Biology and life sciences"         
#> [57] "Ecology"                           
#> [58] "Ecological metrics"                
#> [59] "Ecology and environmental sciences"
#> [60] "Ecology"                           
#> [61] "Ecological metrics"                
#> 
#> 
#> $plos$`10.1371/journal.pcbi.1003594`
#> $plos$`10.1371/journal.pcbi.1003594`$doi
#> [1] "10.1371/journal.pcbi.1003594"
#> 
#> $plos$`10.1371/journal.pcbi.1003594`$categories
#> [1] "Research Article"          "Biology and life sciences"
#> [3] "Computational biology"     "Microbiology"             
#> [5] "Theoretical biology"      
#> 
#> 
#> $plos$`10.1371/journal.pone.0102437`
#> $plos$`10.1371/journal.pone.0102437`$doi
#> [1] "10.1371/journal.pone.0102437"
#> 
#> $plos$`10.1371/journal.pone.0102437`$categories
#>  [1] "Research Article"                  
#>  [2] "Biology and life sciences"         
#>  [3] "Biogeography"                      
#>  [4] "Ecology"                           
#>  [5] "Ecosystems"                        
#>  [6] "Ecosystem engineering"             
#>  [7] "Ecosystem functioning"             
#>  [8] "Industrial ecology"                
#>  [9] "Spatial and landscape ecology"     
#> [10] "Urban ecology"                     
#> [11] "Computer and information sciences" 
#> [12] "Geoinformatics"                    
#> [13] "Spatial analysis"                  
#> [14] "Earth sciences"                    
#> [15] "Geography"                         
#> [16] "Human geography"                   
#> [17] "Cultural geography"                
#> [18] "Social geography"                  
#> [19] "Ecology and environmental sciences"
#> [20] "Conservation science"              
#> [21] "Environmental protection"          
#> [22] "Nature-society interactions"       
#> 
#> 
#> $plos$`10.1371/journal.pone.0175014`
#> $plos$`10.1371/journal.pone.0175014`$doi
#> [1] "10.1371/journal.pone.0175014"
#> 
#> $plos$`10.1371/journal.pone.0175014`$categories
#>  [1] "Research Article"                  
#>  [2] "Biology and life sciences"         
#>  [3] "Ecology"                           
#>  [4] "Paleoecology"                      
#>  [5] "Ecology and environmental sciences"
#>  [6] "Ecology"                           
#>  [7] "Paleoecology"                      
#>  [8] "Biology and life sciences"         
#>  [9] "Paleontology"                      
#> [10] "Paleobiology"                      
#> [11] "Paleoecology"                      
#> [12] "Earth sciences"                    
#> [13] "Paleontology"                      
#> [14] "Paleobiology"                      
#> [15] "Paleoecology"                      
#> [16] "Biology and life sciences"         
#> [17] "Ecology"                           
#> [18] "Population ecology"                
#> [19] "Ecology and environmental sciences"
#> [20] "Ecology"                           
#> [21] "Population ecology"                
#> [22] "Biology and life sciences"         
#> [23] "Population biology"                
#> [24] "Population ecology"                
#> [25] "Biology and life sciences"         
#> [26] "Ecology"                           
#> [27] "Plant ecology"                     
#> [28] "Ecology and environmental sciences"
#> [29] "Ecology"                           
#> [30] "Plant ecology"                     
#> [31] "Biology and life sciences"         
#> [32] "Plant science"                     
#> [33] "Plant ecology"                     
#> [34] "Biology and life sciences"         
#> [35] "Ecology"                           
#> [36] "Spatial and landscape ecology"     
#> [37] "Ecology and environmental sciences"
#> [38] "Ecology"                           
#> [39] "Spatial and landscape ecology"     
#> [40] "Biology and life sciences"         
#> [41] "Agriculture"                       
#> [42] "Agroecology"                       
#> [43] "Biology and life sciences"         
#> [44] "Ecology"                           
#> [45] "Agroecology"                       
#> [46] "Ecology and environmental sciences"
#> [47] "Ecology"                           
#> [48] "Agroecology"                       
#> [49] "Biology and life sciences"         
#> [50] "Ecology"                           
#> [51] "Theoretical ecology"               
#> [52] "Ecology and environmental sciences"
#> [53] "Ecology"                           
#> [54] "Theoretical ecology"               
#> [55] "Ecology and environmental sciences"
#> [56] "Soil science"                      
#> [57] "Soil ecology"                      
#> [58] "Biology and life sciences"         
#> [59] "Organisms"                         
#> [60] "Animals"                           
#> [61] "Vertebrates"                       
#> [62] "Amniotes"                          
#> [63] "Mammals"                           
#> 
#> 
#> $plos$`10.1371/journal.pone.0166559`
#> $plos$`10.1371/journal.pone.0166559`$doi
#> [1] "10.1371/journal.pone.0166559"
#> 
#> $plos$`10.1371/journal.pone.0166559`$categories
#>  [1] "Research Article"                  
#>  [2] "Biology and life sciences"         
#>  [3] "Behavior"                          
#>  [4] "Animal behavior"                   
#>  [5] "Behavioral ecology"                
#>  [6] "Biology and life sciences"         
#>  [7] "Zoology"                           
#>  [8] "Animal behavior"                   
#>  [9] "Behavioral ecology"                
#> [10] "Biology and life sciences"         
#> [11] "Ecology"                           
#> [12] "Behavioral ecology"                
#> [13] "Ecology and environmental sciences"
#> [14] "Ecology"                           
#> [15] "Behavioral ecology"                
#> [16] "Biology and life sciences"         
#> [17] "Plant science"                     
#> [18] "Plant anatomy"                     
#> [19] "Pollen"                            
#> [20] "Biology and life sciences"         
#> [21] "Ecology"                           
#> [22] "Plant ecology"                     
#> [23] "Ecology and environmental sciences"
#> [24] "Ecology"                           
#> [25] "Plant ecology"                     
#> [26] "Biology and life sciences"         
#> [27] "Plant science"                     
#> [28] "Plant ecology"                     
#> [29] "Biology and life sciences"         
#> [30] "Plant science"                     
#> [31] "Plant anatomy"                     
#> [32] "Flowers"                           
#> [33] "Biology and life sciences"         
#> [34] "Ecology"                           
#> [35] "Theoretical ecology"               
#> [36] "Ecology and environmental sciences"
#> [37] "Ecology"                           
#> [38] "Theoretical ecology"               
#> [39] "Biology and life sciences"         
#> [40] "Behavior"                          
#> [41] "Animal behavior"                   
#> [42] "Biology and life sciences"         
#> [43] "Zoology"                           
#> [44] "Animal behavior"                   
#> [45] "Biology and life sciences"         
#> [46] "Organisms"                         
#> [47] "Plants"                            
#> [48] "Flowering plants"                  
#> [49] "Biology and life sciences"         
#> [50] "Species interactions"              
#> 
#> 
#> $plos$`10.1371/journal.pone.0054689`
#> $plos$`10.1371/journal.pone.0054689`$doi
#> [1] "10.1371/journal.pone.0054689"
#> 
#> $plos$`10.1371/journal.pone.0054689`$categories
#>  [1] "Research Article"              "Biology"                      
#>  [3] "Ecology"                       "Ecological environments"      
#>  [5] "Terrestrial environments"      "Ecosystems"                   
#>  [7] "Ecosystem modeling"            "Biodiversity"                 
#>  [9] "Community ecology"             "Conservation science"         
#> [11] "Global change ecology"         "Spatial and landscape ecology"
#> [13] "Theoretical ecology"           "Terrestrial ecology"
```

`tabularize` attempts to help you put the data that comes out of `chunks()` in to a `data.frame`, that we all know and love.


```r
x %>% chunks(c("doi", "history")) %>% tabularize()
```

```
#> $plos
#>                             doi history.received history.accepted
#> 1  10.1371/journal.pone.0001248       2007-07-02       2007-11-06
#> 2  10.1371/journal.pone.0059813       2012-09-16       2013-02-19
#> 3  10.1371/journal.pone.0155019       2015-09-22       2016-04-22
#> 4  10.1371/journal.pone.0080763       2013-08-15       2013-10-16
#> 5  10.1371/journal.pone.0150648       2015-09-19       2016-02-16
#> 6  10.1371/journal.pcbi.1003594       2014-01-09       2014-03-14
#> 7  10.1371/journal.pone.0102437       2013-11-27       2014-06-19
#> 8  10.1371/journal.pone.0175014       2016-09-23       2017-03-20
#> 9  10.1371/journal.pone.0166559       2016-06-05       2016-10-30
#> 10 10.1371/journal.pone.0054689       2012-03-22       2012-12-17
```



### Citing

> Chamberlain Scott (2016). fulltext: Full Text of Scholarly Articles Across Many Data Sources. R package version 0.1.8. https://github.com/ropensci/fulltext




### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our GitHub repo for fulltext](https://github.com/ropensci/fulltext/issues?state=open)


[Back to top](#top)
