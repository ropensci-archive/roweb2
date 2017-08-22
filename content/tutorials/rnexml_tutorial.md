---
title: RNeXML tutorial
package_version: 2.0.4
---



An R package for reading, writing, integrating and publishing data using the Ecological Metadata Language (EML) format.

An extensive and rapidly growing collection of richly annotated phylogenetics data is now available in the NeXML format. NeXML relies on state-of-the-art data exchange technology to provide a format that can be both validated and extended, providing a data quality assurance and and adaptability to the future that is lacking in other formats [Vos et al 2012](http://doi.org/10.1093/sysbio/sys025 "NeXML: Rich, Extensible, and Verifiable Representation of Comparative Data and Metadata.").

<section id="installation">

## Installation

The stable version is on CRAN


```r
install.packages("RNeXML")
```

The development version of RNeXML is [available on Github](https://github.com/ropensci/RNeXML).  With the `devtools` package installed on your system, RNeXML can be installed using:


```r
install.packages("devtools")
devtools::install_github("ropensci/RNeXML")
```



<section id="usage">

## Usage

### Understanding the `nexml` S4 object

The `RNeXML` package provides many convenient functions to add and extract
information from `nexml` objects in the R environment without requiring
the reader to understand the details of the NeXML data structure and
making it less likely that a user will generate invalid NeXML syntax
that could not be read by other parsers. The `nexml` object we have been using
in all of the examples is built on R's S4 mechanism. Advanced users may
sometimes prefer to interact with the data structure more directly using
R's S4 class mechanism and subsetting methods. Many R users are more familiar
with the S3 class mechanism (such as in the `ape` package phylo objects)
rather than the S4 class mechanism used in phylogenetics packages such as
`ouch` and `phylobase`. The `phylobase` vignette provides an excellent introduction
to these data structures.  Users already familiar with subsetting lists and other
S3 objects in R are likely familar with the use of the `$` operator, such as
`phy$edge`. S4 objects simply use an `@` operator instead (but cannot be subset
using numeric arguments such as `phy[[1]]` or named arguments such as phy[["edge"]]).


The `nexml` object is an S4 object, as are all of its components (slots).  Its
hierarchical structure corresponds exactly with the XML tree of a NeXML file, with
the single exception that both XML attributes and children are represented as slots.
S4 objects have constructor functions to initialize them.  We create a new `nexml`
object with the command:


```r
nex <- new("nexml")
```

We can see a list of slots contained in this object with


```r
slotNames(nex)
```

```
 [1] "version"            "generator"          "xsi:schemaLocation"
 [4] "namespaces"         "otus"               "trees"
 [7] "characters"         "meta"               "about"
[10] "xsi:type"
```

Some of these slots have already been populated for us, for instance, the schema version and default namespaces:


```r
nex@version
```

```
[1] "0.9"
```

```r
nex@namespaces
```

```
                                             nex
                     "http://www.nexml.org/2009"
                                             xsi
     "http://www.w3.org/2001/XMLSchema-instance"
                                             xml
          "http://www.w3.org/XML/1998/namespace"
                                            cdao
       "http://purl.obolibrary.org/obo/cdao.owl"
                                             xsd
             "http://www.w3.org/2001/XMLSchema#"
                                              dc
              "http://purl.org/dc/elements/1.1/"
                                         dcterms
                     "http://purl.org/dc/terms/"
                                             ter
                     "http://purl.org/dc/terms/"
                                           prism
"http://prismstandard.org/namespaces/1.2/basic/"
                                              cc
                "http://creativecommons.org/ns#"
                                            ncbi
         "http://www.ncbi.nlm.nih.gov/taxonomy#"
                                              tc
 "http://rs.tdwg.org/ontology/voc/TaxonConcept#"

                     "http://www.nexml.org/2009"
```

Recognize that `nex@namespaces` serves the same role as `get_namespaces`
function, but provides direct access to the slot data.  For instance,
with this syntax we could also overwrite the existing namespaces with
`nex@namespaces <- NULL`.  Changing the namespace in this way is not
advised.

Some slots can contain multiple elements of the same type, such as
`trees`, `characters`, and `otus`.  For instance, we see that


```r
class(nex@characters)
```

```
[1] "ListOfcharacters"
attr(,"package")
[1] "RNeXML"
```

is an object of class `ListOfcharacters`, and is currently empty,


```r
length(nex@characters)
```

```
[1] 0
```

In order to assign an object to a slot, it must match the class definition
of the slot.  We can create a new element of any given class with the
`new` function,


```r
nex@characters <- new("ListOfcharacters", list(new("characters")))
```

and now we have a length-1 list of character matrices,


```r
length(nex@characters)
```

```
[1] 1
```

and we access the first character matrix using the list notation,
`[[1]]`. Here we check the class is a `characters` object.


```r
class(nex@characters[[1]])
```

```
[1] "characters"
attr(,"package")
[1] "RNeXML"
```

Direct subsetting has two primary use cases: (a) useful in looking up
(and possibly editing) a specific value of an element, or (b) when adding
metadata annotations to specific elements. Consider the example file



```r
f <- system.file("examples", "trees.xml", package="RNeXML")
nex <- nexml_read(f)
```

We can look up the species label of the first `otu` in the first `otus` block:


```r
nex@otus[[1]]@otu[[1]]@label
```

```
      label
"species 1"
```

We can add metadata to this particular OTU using this subsetting format


```r
nex@otus[[1]]@otu[[1]]@meta <-
  c(meta("skos:note",
          "This species was incorrectly identified"),
         nex@otus[[1]]@otu[[1]]@meta)
```

Here we use the `c` operator to append this element to any existing meta annotations to this otu.


### Writing NeXML metadata

The `add_basic_meta()` function takes as input an existing `nexml` object
(like the other `add_` functions, if none is provided it will create one), and at the time
of this writing any of the following
parameters: `title`, `description`, `creator`, `pubdate`, `rights`, `publisher`,
`citation`.  Other metadata elements and corresponding parameters may
be added in the future.

Load data:


```r
data(bird.orders)
```

Create an `nexml` object for the phylogeny `bird.orders` and add appropriate metadata:


```r
data("bird.orders")
birds <- add_trees(bird.orders)
birds <- add_basic_meta(
  title = "Phylogeny of the Orders of Birds From Sibley and Ahlquist",

  description = "This data set describes the phylogenetic relationships of the
     orders of birds as reported by Sibley and Ahlquist (1990). Sibley
     and Ahlquist inferred this phylogeny from an extensive number of
     DNA/DNA hybridization experiments. The ``tapestry'' reported by
     these two authors (more than 1000 species out of the ca. 9000
     extant bird species) generated a lot of debates.

     The present tree is based on the relationships among orders. The
     branch lengths were calculated from the values of Delta T50H as
     found in Sibley and Ahlquist (1990, fig. 353).",

  citation = "Sibley, C. G. and Ahlquist, J. E. (1990) Phylogeny and
     classification of birds: a study in molecular evolution. New
     Haven: Yale University Press.",

  creator = "Sibley, C. G. and Ahlquist, J. E.",
    nexml=birds)
```

Instead of a literal string, citations can also be provided in R's
`bibentry` type, which is the one in which R package citations are obtained:


```r
birds <- add_basic_meta(citation = citation("ape"), nexml = birds)
```

#### Taxonomic identifiers

The `taxize_nexml()` function uses the R package `taxize`
[@Chamberlain_2013] to check each taxon label against the NCBI database.
If a unique match is found, a metadata annotation is added to the taxon
providing the NCBI identification number to the taxonomic unit.



```r
birds <- taxize_nexml(birds, "NCBI")
```

If no match is found, the user is warned to check for possible typographic
errors in the taxonomic labels provided. If multiple matches are found,
the user will be prompted to choose between them.


#### Custom metadata extensions

We can get a list of namespaces along with their prefixes from the `nexml` object:


```r
prefixes <- get_namespaces(birds)
prefixes["dc"]
```

```
                                dc
"http://purl.org/dc/elements/1.1/"
```

We create a `meta` element containing this annotation using the `meta` function:


```r
modified <- meta(property = "prism:modificationDate", content = "2013-10-04")
```

We can add this annotation to our existing `birds` NeXML file using the
`add_meta()` function.  Because we do not specify a level, it is added to
the root node, referring to the NeXML file as a whole.


```r
birds <- add_meta(modified, birds)
```

The built-in vocabularies are just the tip of the iceberg of established
vocabularies. Here we add an annotation from the `skos` namespace which
describes the history of where the data comes from:


```r
history <- meta(property = "skos:historyNote",
  content = "Mapped from the bird.orders data in the ape package using RNeXML")
```

Because `skos` is not in the current namespace list, we add it with a
url when adding this meta element.  We also specify that this annotation
be placed at the level of the `trees` sub-node in the NeXML file.


```r
birds <- add_meta(history,
                birds,
                level = "trees",
                namespaces = c(skos = "http://www.w3.org/2004/02/skos/core#"))
```


For finer control of the level at which a `meta` element is added,
we will manipulate the `nexml` R object directly using S4 sub-setting,
as shown in the supplement.


Much richer metadata annotation is possible. Later we illustrate how
metadata annotation can be used to extend the base NeXML format to
represent new forms of data while maintaining compatibility with any
NeXML parser. The `RNeXML` package can be easily extended to support
helper functions such as `taxize_nexml` to add additional metadata
without imposing a large burden on the user.


#### Reading NeXML metadata

A call to the `nexml` object prints some metadata summarizing the data structure:


```r
birds
```

```
A nexml object representing:
 	 1 phylogenetic tree blocks, where:
 	 block 1 contains 1 phylogenetic trees
 	 46 meta elements
 	 0 character matrices
 	 23 taxonomic units
 Taxa: 	 Struthioniformes, Tinamiformes, Craciformes, Galliformes, Anseriformes, Turniciformes ...

 NeXML generated by RNeXML using schema version: 0.9
 size: 372.7 Kb
```

We can extract all metadata pertaining to the NeXML document as a whole
(annotations of the XML root node, `<nexml>`) with the command


```r
meta <- get_metadata(birds)
```

This returns a data.frame of available metadata. We can see the kinds
of metadata recorded from the names:


```r
meta
```

```
Source: local data frame [10 x 7]

    meta                      property   datatype
   (chr)                         (chr)      (chr)
1     m2                      dc:title xsd:string
2     m3                    dc:creator xsd:string
3     m4                dc:description xsd:string
4     m5                            NA         NA
5     m6 dcterms:bibliographicCitation xsd:string
6     m7                    dc:creator xsd:string
7     m8                    dc:pubdate xsd:string
8     m9                            NA         NA
9    m20 dcterms:bibliographicCitation xsd:string
10   m44        prism:modificationDate xsd:string
Variables not shown: content (chr), xsi.type (chr), rel (chr), href (chr)
```

We can also access a table of taxonomic metadata:



```r
get_taxa(birds)
```

```
Source: local data frame [23 x 5]

     otu            label about xsi.type  otus
   (chr)            (chr) (chr)    (lgl) (chr)
1    ou1 Struthioniformes  #ou1       NA   os1
2    ou2     Tinamiformes  #ou2       NA   os1
3    ou3      Craciformes  #ou3       NA   os1
4    ou4      Galliformes  #ou4       NA   os1
5    ou5     Anseriformes  #ou5       NA   os1
6    ou6    Turniciformes  #ou6       NA   os1
7    ou7       Piciformes  #ou7       NA   os1
8    ou8    Galbuliformes  #ou8       NA   os1
9    ou9   Bucerotiformes  #ou9       NA   os1
10  ou10      Upupiformes #ou10       NA   os1
..   ...              ...   ...      ...   ...
```

Which returns text from the otu element labels, typically used to define
taxonomic names, rather than text from explicit meta elements.

We can also access metadata at a specific level (or use `level=all`
to extract all meta elements in a list).  Here we show only the first
few results:


```r
otu_meta <- get_metadata(birds, level="otus/otu")
otu_meta
```

```
Source: local data frame [23 x 9]

    meta property datatype content     xsi.type        rel
   (chr)    (lgl)    (lgl)   (lgl)        (chr)      (chr)
1    m21       NA       NA      NA ResourceMeta tc:toTaxon
2    m22       NA       NA      NA ResourceMeta tc:toTaxon
3    m23       NA       NA      NA ResourceMeta tc:toTaxon
4    m24       NA       NA      NA ResourceMeta tc:toTaxon
5    m25       NA       NA      NA ResourceMeta tc:toTaxon
6    m26       NA       NA      NA ResourceMeta tc:toTaxon
7    m27       NA       NA      NA ResourceMeta tc:toTaxon
8    m28       NA       NA      NA ResourceMeta tc:toTaxon
9    m29       NA       NA      NA ResourceMeta tc:toTaxon
10   m30       NA       NA      NA ResourceMeta tc:toTaxon
..   ...      ...      ...     ...          ...        ...
Variables not shown: href (chr), otu (chr), otus (chr)
```


#### Merging metadata tables

We often want to combine metadata from multiple tables.  For instance, in this exercise we want to include the taxonomic identifier and id value for each species returned in the character table.  This helps us more precisely identify the species whose traits are described by the table.



```r
library("dplyr")
library("geiger")
```

To begin, let's generate a `NeXML` file using the tree and trait data from the `geiger` package's "primates" data:


```r
data("primates")
add_trees(primates$phy) %>%
  add_characters(primates$dat, ., append=TRUE) %>%
  taxize_nexml() -> nex
```

(Note that we've used `dplyr`'s cute pipe syntax, but unfortunately our `add_` methods take the `nexml` object as the _second_
argument instead of the first, so this isn't as elegant since we need the stupid `.` to show where the piped output should go...)

We now read in the three tables of interest.  Note that we tell `get_characters` to give us species labels as there own column, rather than as rownames.  The latter is the default only because this plays more nicely with the default format for character matrices that is expected by `geiger` and other phylogenetics packages, but is in general a silly choice for data manipulation.


```r
otu_meta <- get_metadata(nex, "otus/otu")
taxa <- get_taxa(nex)
char <- get_characters(nex, rownames_as_col = TRUE)
```


We can take a peek at what the tables look like, just to orient ourselves:


```r
otu_meta
```

```
Source: local data frame [216 x 9]

    meta property datatype content     xsi.type        rel
   (chr)    (lgl)    (lgl)   (lgl)        (chr)      (chr)
1    m49       NA       NA      NA ResourceMeta tc:toTaxon
2    m50       NA       NA      NA ResourceMeta tc:toTaxon
3    m51       NA       NA      NA ResourceMeta tc:toTaxon
4    m52       NA       NA      NA ResourceMeta tc:toTaxon
5    m53       NA       NA      NA ResourceMeta tc:toTaxon
6    m54       NA       NA      NA ResourceMeta tc:toTaxon
7    m55       NA       NA      NA ResourceMeta tc:toTaxon
8    m56       NA       NA      NA ResourceMeta tc:toTaxon
9    m57       NA       NA      NA ResourceMeta tc:toTaxon
10   m58       NA       NA      NA ResourceMeta tc:toTaxon
..   ...      ...      ...     ...          ...        ...
Variables not shown: href (chr), otu (chr), otus (chr)
```

```r
taxa
```

```
Source: local data frame [233 x 5]

     otu                       label about xsi.type  otus
   (chr)                       (chr) (chr)    (lgl) (chr)
1   ou24 Allenopithecus_nigroviridis #ou24       NA   os2
2   ou25         Allocebus_trichotis #ou25       NA   os2
3   ou26           Alouatta_belzebul #ou26       NA   os2
4   ou27             Alouatta_caraya #ou27       NA   os2
5   ou28          Alouatta_coibensis #ou28       NA   os2
6   ou29              Alouatta_fusca #ou29       NA   os2
7   ou30           Alouatta_palliata #ou30       NA   os2
8   ou31              Alouatta_pigra #ou31       NA   os2
9   ou32               Alouatta_sara #ou32       NA   os2
10  ou33          Alouatta_seniculus #ou33       NA   os2
..   ...                         ...   ...      ...   ...
```

```r
head(char)
```

```
Source: local data frame [6 x 2]

                         taxa        x
                        (chr)    (dbl)
1 Allenopithecus_nigroviridis 8.465900
2         Allocebus_trichotis 4.368181
3           Alouatta_belzebul 8.729074
4             Alouatta_caraya 8.628735
5          Alouatta_coibensis 8.764053
6              Alouatta_fusca 8.554489
```

Now that we have nice `data.frame` objects for all our data, it's easy to join them into the desired table with a few obvious `dplyr` commands:


```r
taxa %>%
  left_join(char, by = c("label" = "taxa")) %>%
  left_join(otu_meta, by = "otu") %>%
  select(otu, label, x, href)
```

```
Source: local data frame [233 x 4]

     otu                       label        x
   (chr)                       (chr)    (dbl)
1   ou24 Allenopithecus_nigroviridis 8.465900
2   ou25         Allocebus_trichotis 4.368181
3   ou26           Alouatta_belzebul 8.729074
4   ou27             Alouatta_caraya 8.628735
5   ou28          Alouatta_coibensis 8.764053
6   ou29              Alouatta_fusca 8.554489
7   ou30           Alouatta_palliata 8.791790
8   ou31              Alouatta_pigra 8.881836
9   ou32               Alouatta_sara 8.796339
10  ou33          Alouatta_seniculus 8.767173
..   ...                         ...      ...
Variables not shown: href (chr)
```

Because these are all from the same otus block anyway, we haven't selected that column, but were it of interest it is also available in the taxa table.


<section id="citing">

## Citing

To cite `RNeXML` in publications use:

<br>

> Carl Boettiger, Scott Chamberlain, Hilmar Lapp, Kseniia Shumelchyk and Rutger Vos (2015). RNeXML: Implement semantically rich I/O for NeXML format. R package version 2.0.4. http://CRAN.R-project.org/package=RNeXML

<section id="license_bugs">

## License and bugs

* License: BSD 3
* Report bugs at [our Github repo for alm](https://github.com/ropensci/RNeXML/issues?state=open)

[Back to top](#top)
