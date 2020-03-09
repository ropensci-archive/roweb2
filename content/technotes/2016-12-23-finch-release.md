---
slug: finch-release
title: finch - parse Darwin Core files
date: '2016-12-23'
author:
  - Scott Chamberlain
tags:
  - R
  - biodiversity
  - GBIF
---




`finch` has just been released to CRAN (binaries should be up soon).

`finch` is a package to parse Darwin Core files. [Darwin Core](http://rs.tdwg.org/dwc/) (`DwC`) is:

> a body of standards. It includes a glossary of terms (in other contexts these might be called properties, elements, fields, columns, attributes, or concepts) intended to facilitate the sharing of information about biological diversity by providing reference definitions, examples, and commentaries. The Darwin Core is primarily based on taxa, their occurrence in nature as documented by observations, specimens, samples, and related information. ... The Simple Darwin Core [SIMPLEDWC] is a specification for one particular way to use the terms - to share data about taxa and their occurrences in a simply structured way - and is probably what is meant if someone suggests to "format your data according to the Darwin Core".

GBIF (Global Biodiversity Information Facility) is the biggest holder of biodiversity data. When you request
data in bulk format from GBIF they call give it to you in what's called a Darwin Core Archive, or
`DwC-A`. GBIF has a validator for DwC-A files as well: <https://tools.gbif.org/dwca-validator/>

One of our most used packages is probably `rgbif`, a client to interact with GBIF's web services.
There's a series of functions in `rgbif` to request data in bulk format (see functions starting
with `occ_download`), and from this you get a DwC-A file. This is where `finch` comes in:
it can parse these DwC-A files into something useable inside R.

## Installation


```r
install.packages("finch")
# or from source if binary not available yet
install.packages("finch", type = "source")
```


```r
library("finch")
```

To parse a simple darwin core file like

```
<?xml version="1.0" encoding="UTF-8"?>
<SimpleDarwinRecordSet
 xmlns="http://rs.tdwg.org/dwc/xsd/simpledarwincore/"
 xmlns:dc="http://purl.org/dc/terms/"
 xmlns:dwc="http://rs.tdwg.org/dwc/terms/"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://rs.tdwg.org/dwc/xsd/simpledarwincore/ ../../xsd/tdwg_dwc_simple.xsd">
 <SimpleDarwinRecord>
  <dwc:occurrenceID>urn:catalog:YPM:VP.057488</dwc:occurrenceID>
  <dc:type>PhysicalObject</dc:type>
  <dc:modified>2009-02-12T12:43:31</dc:modified>
  <dc:language>en</dc:language>
  <dwc:basisOfRecord>FossilSpecimen</dwc:basisOfRecord>
  <dwc:institutionCode>YPM</dwc:institutionCode>
  <dwc:collectionCode>VP</dwc:collectionCode>
  <dwc:catalogNumber>VP.057488</dwc:catalogNumber>
  <dwc:individualCount>1</dwc:individualCount>
  <dwc:locationID xsi:nil="true"/>
  <dwc:continent>North America</dwc:continent>
  <dwc:country>United States</dwc:country>
  <dwc:countryCode>US</dwc:countryCode>
  <dwc:stateProvince>Montana</dwc:stateProvince>
  <dwc:county>Garfield</dwc:county>
  <dwc:scientificName>Tyrannosourus rex</dwc:scientificName>
  <dwc:genus>Tyrannosourus</dwc:genus>
  <dwc:specificEpithet>rex</dwc:specificEpithet>
  <dwc:earliestPeriodOrHighestSystem>Creataceous</dwc:earliestPeriodOrHighestSystem>
  <dwc:latestPeriodOrHighestSystem>Creataceous</dwc:latestPeriodOrHighestSystem>
  <dwc:earliestEonOrHighestEonothem>Late Cretaceous</dwc:earliestEonOrHighestEonothem>
  <dwc:latestEonOrHighestEonothem>Late Cretaceous</dwc:latestEonOrHighestEonothem>
 </SimpleDarwinRecord>
</SimpleDarwinRecordSet>
```

This file is in this package as an example file, get the file, then `simple()`


```r
file <- system.file("examples", "example_simple_fossil.xml", package = "finch")
out <- simple_read(file)
```

Index to `meta`, `dc` or `dwc`


```r
out$dc
#> [[1]]
#> [[1]]$type
#> [1] "PhysicalObject"
#> 
#> 
#> [[2]]
#> [[2]]$modified
#> [1] "2009-02-12T12:43:31"
#> 
#> 
#> [[3]]
#> [[3]]$language
#> [1] "en"
```

## Parse Darwin Core Archive

To parse a Darwin Core Archive like can be gotten from GBIF use `dwca_read()`

`dwca_read()` can parse a DwC-A file as a directory, zipped file, or from a URL.

There's an example Darwin Core Archive:


```r
file <- system.file("examples", "0000154-150116162929234.zip", package = "finch")
(out <- dwca_read(file, read = TRUE))
#> <gbif dwca>
#>   Package ID: 6cfaaf9c-d518-4ca3-8dc5-f5aadddc0390
#>   No. data sources: 10
#>   No. datasets: 3
#>   Dataset occurrence.txt: [225 X 443]
#>   Dataset multimedia.txt: [15 X 1]
#>   Dataset verbatim.txt: [209 X 443]
```

List files in the archive


```r
out$files
#> $xml_files
#> [1] "/Library/Frameworks/R.framework/Versions/3.3/Resources/library/finch/examples/0000154-150116162929234/meta.xml"    
#> [2] "/Library/Frameworks/R.framework/Versions/3.3/Resources/library/finch/examples/0000154-150116162929234/metadata.xml"
#> 
#> $txt_files
#> [1] "/Library/Frameworks/R.framework/Versions/3.3/Resources/library/finch/examples/0000154-150116162929234/citations.txt" 
#> [2] "/Library/Frameworks/R.framework/Versions/3.3/Resources/library/finch/examples/0000154-150116162929234/multimedia.txt"
#> [3] "/Library/Frameworks/R.framework/Versions/3.3/Resources/library/finch/examples/0000154-150116162929234/occurrence.txt"
#> [4] "/Library/Frameworks/R.framework/Versions/3.3/Resources/library/finch/examples/0000154-150116162929234/rights.txt"    
#> [5] "/Library/Frameworks/R.framework/Versions/3.3/Resources/library/finch/examples/0000154-150116162929234/verbatim.txt"  
...
```

High level metadata for the whole archive (printing a subset for brevity)


```r
out$emlmeta
#> <eml packageId="6cfaaf9c-d518-4ca3-8dc5-f5aadddc0390" system="http://gbif.org" scope="system" xml:lang="en" xsi:schemaLocation="eml://ecoinformatics.org/eml-2.1.1 http://rs.gbif.org/schema/eml-gbif-profile/1.0.2/eml.xsd">
#>   <dataset>
#>     <title>GBIF Occurrence Download 0000154-150116162929234</title>
#>     <creator>
#>       <individualName>
#>         <surName>GBIF Download Service</surName>
#>       </individualName>
#>     </creator>
#>     <metadataProvider>
#>       <individualName>
#>         <surName>GBIF Download Service</surName>
#>       </individualName>
#>     </metadataProvider>
#>     <associatedParty>
#>       <organizationName>OZCAM (Online Zoological Collections of Australian Museums) Provider</organizationName>
#>       <onlineUrl>http://www.ozcam.org.au/</onlineUrl>
#>       <role>CONTENT_PROVIDER</role>
#>     </associatedParty>
#>     <associatedParty>
#>       <individualName>
...
```

High level metadata for each data file, there's many files, but we'll just look at one


```r
hm <- out$highmeta
head( hm$occurrence.txt )
#>   index                                        term delimitedBy
#> 1     0         http://rs.gbif.org/terms/1.0/gbifID        <NA>
#> 2     1           http://purl.org/dc/terms/abstract        <NA>
#> 3     2       http://purl.org/dc/terms/accessRights        <NA>
#> 4     3      http://purl.org/dc/terms/accrualMethod        <NA>
#> 5     4 http://purl.org/dc/terms/accrualPeriodicity        <NA>
#> 6     5      http://purl.org/dc/terms/accrualPolicy        <NA>
```

You can get the same metadata as above for each dataset that went into the tabular dataset downloaded


```r
out$dataset_meta[[1]]
```

View one of the datasets, brief overview.


```r
head(out$data[[1]][,c(1:5)])
#>      gbifID abstract accessRights accrualMethod accrualPeriodicity
#> 1  50280003       NA                         NA                 NA
#> 2 477550574       NA                         NA                 NA
#> 3 239703844       NA                         NA                 NA
#> 4 239703843       NA                         NA                 NA
#> 5 239703833       NA                         NA                 NA
#> 6 477550692       NA                         NA                 NA
```


```r
names(out$data[[1]])[1:20]
#>  [1] "gbifID"                "abstract"             
#>  [3] "accessRights"          "accrualMethod"        
#>  [5] "accrualPeriodicity"    "accrualPolicy"        
#>  [7] "alternative"           "audience"             
#>  [9] "available"             "bibliographicCitation"
#> [11] "conformsTo"            "contributor"          
#> [13] "coverage"              "created"              
#> [15] "creator"               "date"                 
#> [17] "dateAccepted"          "dateCopyrighted"      
#> [19] "dateSubmitted"         "description"
```

## Using with rgbif

Now that we have `finch` we can make working with GBIF bulk downloads from R a
richer experience.

Right now, we make it easy to import just the occurrence data from DwC-A files
via `occ_download_import()`, e.g.,


```r
library(rgbif)
res <- occ_download('taxonKey = 7264332', 'hasCoordinate = TRUE')
dat <- occ_download_get(res)
occ_download_import(dat)
#> Download file size: 0.26 MB
#>
#>        gbifID abstract accessRights accrualMethod accrualPeriodicity accrualPolicy
#> 1  1269880600       NA                         NA                 NA            NA
#> 2  1269861719       NA                         NA                 NA            NA
#> 3  1269850111       NA                         NA                 NA            NA
#> 4  1265524086       NA                         NA                 NA            NA
#> 5  1257400209       NA                         NA                 NA            NA
#> 6  1257396860       NA                         NA                 NA            NA
#> 7  1257391874       NA                         NA                 NA            NA
#> 8  1257390731       NA                         NA                 NA            NA
#> 9  1257383844       NA                         NA                 NA            NA
#> 10 1257375500       NA                         NA                 NA            NA
#> ..        ...      ...          ...           ...                ...           ...
#> Variables not shown: accrualPolicy (lgl), alternative (lgl), audience (lgl),
#>      available (lgl), bibliographicCitation (lgl), conformsTo (lgl),
#>      contributor (lgl), coverage (lgl), created (lgl), creator (lgl), date
#>      (lgl), dateAccepted (lgl), dateCopyrighted (lgl), dateSubmitted (lgl),
#>      description (lgl), educationLevel (lgl), extent (lgl), format (lgl),
#>      hasFormat (lgl), hasPart (lgl), hasVersion (lgl), identifier (chr),
#>      instructionalMethod (lgl), isFormatOf (lgl), isPartOf (lgl),
#>      isReferencedBy (lgl), isReplacedBy (lgl), isRequiredBy (lgl), ...
```

With `finch`, you can access all the data in the DwC-A file. `finch` is not integrated
into `rgbif`, though we may in the future.

The object returned from `occ_download_get` is just a path, so we can use that
with `finch`


```r
library(finch)
(out <- dwca_read(dat[1], read = TRUE))
#> <gbif dwca>
#>   Package ID: 10.15468/dl.mmecqc
#>   No. data sources: 8
#>   No. datasets: 3
#>   Dataset occurrence.txt: [235 X 1371]
#>   Dataset multimedia.txt: [15 X 0]
#>   Dataset verbatim.txt: [217 X 1371]
```

Now we have access to not just the occurrence data


```r
head(out$data$occurrence.txt)[,1:5]
#>       gbifID abstract accessRights accrualMethod accrualPeriodicity
#> 1 1269880600       NA                         NA                 NA
#> 2 1269861719       NA                         NA                 NA
#> 3 1269850111       NA                         NA                 NA
#> 4 1265524086       NA                         NA                 NA
#> 5 1257400209       NA                         NA                 NA
#> 6 1257396860       NA                         NA                 NA
```

But all the rich metadata in the other files. Yay!


## Future work

DwC-A files can be very large - This is for sure going to be a pain point for some.
We'll continue to test and refine on big data files.

## Feedback?

We'd love to know what people think about this package.

Documentation can be better, e.g., there's no vignette yet (but adding
that soon).
