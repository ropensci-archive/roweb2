---
title: pangaear tutorial
package_version: 0.2.0
---



Tools to interact with the [Pangaea Database](https:// www.pangaea.de), including functions for searching for data, fetching datasets by dataset ID, and working with the Pangaea OAI-PMH service.

<section id="installation">

## Installation

Stable `pangaear` version from CRAN


```r
install.packages("pangaear")
```

Or, the development version from Github


```r
devtools::install_github("ropensci/pangaear")
```


```r
library("pangaear")
```

<section id="usage">

## Usage

### Search for data

This is a thin wrapper around the GUI search interface on the page [https://www.pangaea.de/](https://www.pangaea.de/). Everything you can do there, you can do here.


```r
pg_search(query = 'water', bbox = c(-124.2, 41.8, -116.8, 46.1), count = 3)
#> Source: local data frame [3 x 5]
#>
#>                      doi score size_datasets
#>                    <chr> <dbl>         <dbl>
#> 1 10.1594/PANGAEA.736010  2.38             9
#> 2 10.1594/PANGAEA.812094  2.24             2
#> 3 10.1594/PANGAEA.803591  2.02             2
#> Variables not shown: citation <chr>, supplement_to <chr>.
```

### Get data


```r
res <- pg_data(doi = '10.1594/PANGAEA.761032')
res[[1]]
#> <Pangaea data> 10.1594/PANGAEA.761002
#> Source: local data frame [250,201 x 9]
#>
#>          Event        Date/Time Latitude Longitude Elevation [m]
#>          <chr>            <chr>    <dbl>     <dbl>         <int>
#> 1  NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915         -3090
#> 2  NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915         -3090
#> 3  NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915         -3090
#> 4  NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915         -3090
#> 5  NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915         -3090
#> 6  NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915         -3090
#> 7  NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915         -3090
#> 8  NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915         -3090
#> 9  NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915         -3090
#> 10 NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915         -3090
#> ..         ...              ...      ...       ...           ...
#> Variables not shown: Depth water [m] <int>, Temp [°C] <dbl>, Sal <dbl>,
#>   Tpot [°C] <dbl>.
```

Search for data then pass DOI to data function.


```r
res <- pg_search(query = 'water', bbox = c(-124.2, 41.8, -116.8, 46.1), count = 3)
pg_data(res$doi[1])
#> [[1]]
#> <Pangaea data> 10.1594/PANGAEA.77406
#> Source: local data frame [1 x 4]
#>
#>   Depth [m] SOD [mmol/m**2/day] SOD [mmol/m**2/day] O2 [µmol/l]
#>       <int>               <dbl>               <dbl>       <dbl>
#> 1         0                1.51                0.74          25
#>
#> [[2]]
#> <Pangaea data> 10.1594/PANGAEA.77397
#> Source: local data frame [27 x 6]
#>
#>    Depth [m] O2 [µmol/l] Poros frac Mn [µmol/l] Fe [µmol/l] TOC [%]
#>        <dbl>       <dbl>      <dbl>       <dbl>       <dbl>   <dbl>
#> 1     -0.010        97.7        1.0          NA          NA      NA
#> 2     -0.005        96.2        1.0          NA          NA      NA
#> 3     -0.001        93.2        1.0          NA          NA      NA
#> 4      0.000        61.3        0.9          NA          NA      NA
#> 5      0.001        35.8        0.9          NA          NA      NA
#> 6      0.002        19.0        0.9         1.9          NA      NA
#> 7      0.003         5.4        0.9         4.0         2.2      NA
#> 8      0.004         0.1        0.8          NA          NA     1.6
#> 9      0.005         0.0        0.8          NA          NA      NA
#> 10     0.006         0.4        0.7          NA          NA      NA
#> ..       ...         ...        ...         ...         ...     ...
#>
#> [[3]]
#> <Pangaea data> 10.1594/PANGAEA.77398
#> Source: local data frame [27 x 6]
#>
#>    Depth [m] O2 [µmol/l] Poros frac Mn [µmol/l] Fe [µmol/l] TOC [%]
#>        <dbl>       <dbl>      <dbl>       <dbl>       <dbl>   <dbl>
#> 1    -0.0100        91.8        1.0          NA          NA      NA
#> 2    -0.0050        85.6        1.0          NA          NA      NA
#> 3    -0.0010        80.5        1.0          NA          NA      NA
#> 4     0.0000        45.2        1.0          NA          NA      NA
#> 5     0.0005        33.7         NA          NA          NA      NA
#> 6     0.0010        20.7        0.9          NA          NA      NA
#> 7     0.0015         6.6         NA          NA          NA      NA
#> 8     0.0020         2.4        0.8         0.5          NA      NA
#> 9     0.0030         1.8        0.7         3.8          NA      NA
#> 10    0.0040         1.7        0.7          NA         5.9     0.8
#> ..       ...         ...        ...         ...         ...     ...
#>
#> [[4]]
#> <Pangaea data> 10.1594/PANGAEA.77399
#> Source: local data frame [6 x 2]
#>
#>   Depth [m] TOC [%]
#>       <dbl>   <dbl>
#> 1     0.002    0.64
#> 2     0.005    0.64
#> 3     0.011    0.73
#> 4     0.015    0.68
#> 5     0.019    0.70
#> 6     0.039    0.68
#>
#> [[5]]
#> <Pangaea data> 10.1594/PANGAEA.77400
#> Source: local data frame [28 x 4]
#>
#>    Depth [m] O2 [µmol/l] Poros frac TOC [%]
#>        <dbl>       <dbl>      <dbl>   <dbl>
#> 1    -0.0100        39.9        1.0      NA
#> 2    -0.0050        45.8        1.0      NA
#> 3    -0.0010        48.6        1.0      NA
#> 4     0.0000        27.3        0.9      NA
#> 5     0.0005        19.4         NA      NA
#> 6     0.0010        13.5        0.9      NA
#> 7     0.0015         8.2         NA      NA
#> 8     0.0020         3.4        0.8      NA
#> 9     0.0030         0.1        0.8      NA
#> 10    0.0040         0.5        0.8      NA
#> ..       ...         ...        ...     ...
#>
#> [[6]]
#> <Pangaea data> 10.1594/PANGAEA.77401
#> Source: local data frame [28 x 5]
#>
#>    Depth [m] O2 [µmol/l] Poros frac Mn [µmol/l] Fe [µmol/l]
#>        <dbl>       <dbl>      <dbl>       <dbl>       <dbl>
#> 1    -0.0100        39.5        1.0          NA          NA
#> 2    -0.0050        38.9        1.0          NA          NA
#> 3    -0.0010        41.2        1.0          NA          NA
#> 4     0.0000        29.3        1.0          NA          NA
#> 5     0.0005        16.3         NA          NA          NA
#> 6     0.0010         8.9        0.9          NA          NA
#> 7     0.0015         2.1         NA          NA          NA
#> 8     0.0020         1.5        0.9          NA          NA
#> 9     0.0030         0.8        0.9          NA          NA
#> 10    0.0040         0.0        0.9          NA           7
#> ..       ...         ...        ...         ...         ...
#>
#> [[7]]
#> <Pangaea data> 10.1594/PANGAEA.77402
#> Source: local data frame [31 x 3]
#>
#>    Depth [m] O2 [µmol/l] Poros frac
#>        <dbl>       <dbl>      <dbl>
#> 1    -0.0100       126.9        1.0
#> 2    -0.0050       127.1        1.0
#> 3    -0.0021       128.7         NA
#> 4    -0.0016       129.7         NA
#> 5    -0.0011       128.7         NA
#> 6    -0.0010       124.2        1.0
#> 7    -0.0005        98.7         NA
#> 8     0.0000        74.7        1.0
#> 9     0.0005        57.5         NA
#> 10    0.0011        44.7        0.9
#> ..       ...         ...        ...
#>
#> [[8]]
#> <Pangaea data> 10.1594/PANGAEA.77403
#> Source: local data frame [30 x 4]
#>
#>    Depth [m] O2 [µmol/l] Poros frac TOC [%]
#>        <dbl>       <dbl>      <dbl>   <dbl>
#> 1    -0.0100       109.2        1.0      NA
#> 2    -0.0050       105.6        1.0      NA
#> 3    -0.0010        96.9        1.0      NA
#> 4     0.0000        60.9        1.0      NA
#> 5     0.0005        44.7         NA      NA
#> 6     0.0010        30.1        1.0      NA
#> 7     0.0015        23.8         NA      NA
#> 8     0.0020        17.5        0.8      NA
#> 9     0.0030         6.5        0.8     0.6
#> 10    0.0040         1.2        0.7      NA
#> ..       ...         ...        ...     ...
#>
#> [[9]]
#> <Pangaea data> 10.1594/PANGAEA.77404
#> Source: local data frame [25 x 3]
#>
#>    Depth [m] O2 [µmol/l] Poros frac
#>        <dbl>       <dbl>      <dbl>
#> 1     -0.010        89.9        1.0
#> 2     -0.005        90.0        1.0
#> 3     -0.001        85.0        1.0
#> 4      0.000        37.6        1.0
#> 5      0.001         1.7        1.0
#> 6      0.002         3.2        1.0
#> 7      0.003         2.6        0.9
#> 8      0.004         3.0        0.9
#> 9      0.005         2.4        0.9
#> 10     0.006         2.4        0.8
#> ..       ...         ...        ...
```

### OAI-PMH metadata

#### Identify the service


```r
pg_identify()
#> <Pangaea>
#>   repositoryName: PANGAEA - Data Publisher for Earth & Environmental Science
#>   baseURL: http://ws.pangaea.de/oai/provider
#>   protocolVersion: 2.0
#>   adminEmail: tech@pangaea.de
#>   adminEmail: tech@pangaea.de
#>   earliestDatestamp: 2015-01-01T00:00:00Z
#>   deletedRecord: transient
#>   granularity: YYYY-MM-DDThh:mm:ssZ
#>   compression: gzip
#>   description:
#>
#> oai
#> pangaea.de
#> :
#> oai:pangaea.de:doi:10.1594/PANGAEA.999999
```

#### List metadata formats


```r
pg_list_metadata_formats()
#>   metadataPrefix                                                 schema
#> 1         oai_dc         http://www.openarchives.org/OAI/2.0/oai_dc.xsd
#> 2         pan_md      http://ws.pangaea.de/schemas/pangaea/MetaData.xsd
#> 3            dif http://gcmd.gsfc.nasa.gov/Aboutus/xml/dif/dif_v9.4.xsd
#> 4       iso19139               http://www.isotc211.org/2005/gmd/gmd.xsd
#> 5  iso19139.iodp               http://www.isotc211.org/2005/gmd/gmd.xsd
#> 6      datacite3  http://schema.datacite.org/meta/kernel-3/metadata.xsd
#>                             metadataNamespace
#> 1 http://www.openarchives.org/OAI/2.0/oai_dc/
#> 2              http://www.pangaea.de/MetaData
#> 3  http://gcmd.gsfc.nasa.gov/Aboutus/xml/dif/
#> 4            http://www.isotc211.org/2005/gmd
#> 5            http://www.isotc211.org/2005/gmd
#> 6         http://datacite.org/schema/kernel-3
```

#### List identifiers


```r
pg_list_identifiers(from = '2015-09-01', until = '2015-09-05')
#> <ListRecords> 244 X 5
#>
#>                                   identifier            datestamp
#> 1  oai:pangaea.de:doi:10.1594/PANGAEA.131638 2015-09-01T20:36:34Z
#> 2  oai:pangaea.de:doi:10.1594/PANGAEA.183530 2015-09-01T20:37:49Z
#> 3  oai:pangaea.de:doi:10.1594/PANGAEA.138509 2015-09-01T20:37:42Z
#> 4  oai:pangaea.de:doi:10.1594/PANGAEA.354765 2015-09-01T20:35:30Z
#> 5  oai:pangaea.de:doi:10.1594/PANGAEA.763664 2015-09-01T20:49:23Z
#> 6   oai:pangaea.de:doi:10.1594/PANGAEA.66910 2015-09-01T20:37:00Z
#> 7  oai:pangaea.de:doi:10.1594/PANGAEA.759867 2015-09-01T20:48:55Z
#> 8  oai:pangaea.de:doi:10.1594/PANGAEA.183545 2015-09-01T20:37:51Z
#> 9  oai:pangaea.de:doi:10.1594/PANGAEA.712451 2015-09-01T20:45:25Z
#> 10 oai:pangaea.de:doi:10.1594/PANGAEA.788012 2015-09-01T08:22:36Z
#> ..                                       ...                  ...
#> Variables not shown: setSpec (chr), setSpec.1 (chr), setSpec.2 (chr)
```

#### List sets


```r
pg_list_sets()
#> <ListSets> 233 X 2
#>
#>         setSpec
#> 1    projectXXX
#> 2     authorXXX
#> 3         piXXX
#> 4    journalXXX
#> 5      basisXXX
#> 6   campaignXXX
#> 7     deviceXXX
#> 8    geocodeXXX
#> 9  query~BASE64
#> 10          ACD
#> ..          ...
#> Variables not shown: setName (chr)
```

#### List records


```r
pg_list_records(from = '2015-09-01', until = '2015-09-10')
#> <ListRecords> 274 X 36
#>
#>                                   identifier            datestamp
#> 1  oai:pangaea.de:doi:10.1594/PANGAEA.131638 2015-09-01T20:36:34Z
#> 2  oai:pangaea.de:doi:10.1594/PANGAEA.183530 2015-09-01T20:37:49Z
#> 3  oai:pangaea.de:doi:10.1594/PANGAEA.138509 2015-09-01T20:37:42Z
#> 4   oai:pangaea.de:doi:10.1594/PANGAEA.57294 2015-09-08T08:26:51Z
#> 5  oai:pangaea.de:doi:10.1594/PANGAEA.354765 2015-09-01T20:35:30Z
#> 6  oai:pangaea.de:doi:10.1594/PANGAEA.763664 2015-09-01T20:49:23Z
#> 7   oai:pangaea.de:doi:10.1594/PANGAEA.66910 2015-09-01T20:37:00Z
#> 8  oai:pangaea.de:doi:10.1594/PANGAEA.759867 2015-09-01T20:48:55Z
#> 9  oai:pangaea.de:doi:10.1594/PANGAEA.183545 2015-09-01T20:37:51Z
#> 10 oai:pangaea.de:doi:10.1594/PANGAEA.712451 2015-09-01T20:45:25Z
#> ..                                       ...                  ...
#> Variables not shown: title (chr), creator (chr), publisher (chr), date
#>      (chr), type (chr), format (chr), identifier.2 (chr), identifier.1
#>      (chr), language (chr), rights (chr), rights.1 (chr), relation (chr),
#>      coverage (chr), subject (chr), setSpec (chr), relation.1 (chr),
#>      creator.1 (chr), creator.2 (chr), source (chr), setSpec.1 (chr),
#>      setSpec.2 (chr), description (chr), creator.3 (chr), creator.4 (chr),
#>      creator.5 (chr), creator.6 (chr), creator.7 (chr), creator.8 (chr),
#>      creator.9 (chr), creator.10 (chr), source.1 (chr), relation.2 (chr),
#>      relation.3 (chr), relation.4 (chr)
```

#### Get a record


```r
pg_get_record(identifier = "oai:pangaea.de:doi:10.1594/PANGAEA.788382")
#> <GetRecord> 1 X 23
#>
#>                                  identifier            datestamp setSpec
#> 1 oai:pangaea.de:doi:10.1594/PANGAEA.788382 2015-04-12T02:47:43Z citable
#> Variables not shown: setSpec.1 (chr), setSpec.2 (chr), title (chr),
#>      creator (chr), creator.1 (chr), creator.2 (chr), source (chr),
#>      source.1 (chr), publisher (chr), date (chr), type (chr), format
#>      (chr), identifier.2 (chr), identifier.1 (chr), description (chr),
#>      language (chr), rights (chr), rights.1 (chr), coverage (chr), subject
#>      (chr)
```


<section id="citing">

## Citing

To cite `pangaear` in publications use:

<br>

> Scott Chamberlain, Kara Woo, Andrew MacDonald, Naupaka Zimmerman and Gavin Simpson (2016). pangaear:
  Client for the 'Pangaea' Database. R package version 0.2.0. https://github.com/ropensci/pangaear

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for pangaear](https://github.com/ropensci/pangaear/issues?state=open)

[Back to top](#top)
