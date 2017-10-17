---
title: pangaear tutorial
package_version: 0.3.0
---



Tools to interact with the [Pangaea Database](https:// www.pangaea.de), including functions for searching for data, fetching datasets by dataset ID, and working with the Pangaea OAI-PMH service.


### Installation

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


### Search for data

This is a thin wrapper around the GUI search interface on the page [https://www.pangaea.de/](https://www.pangaea.de/). Everything you can do there, you can do here.


```r
pg_search(query = 'water', bbox = c(-124.2, 41.8, -116.8, 46.1), count = 3)
#> # A tibble: 3 x 6
#>      score                    doi  size size_measure
#>      <dbl>                  <chr> <dbl>        <chr>
#> 1 21.19016 10.1594/PANGAEA.812094     2     datasets
#> 2 11.05477 10.1594/PANGAEA.862525   372     datasets
#> 3 10.84113 10.1594/PANGAEA.736010     9     datasets
#> # ... with 2 more variables: citation <chr>, supplement_to <chr>
```

### Get data


```r
res <- pg_data(doi = '10.1594/PANGAEA.761032')
res[[1]]
#> <Pangaea data> 10.1594/PANGAEA.761002
#> # A tibble: 250,201 x 9
#>          Event      `Date/Time` Latitude Longitude `Elevation [m]`
#>          <chr>            <chr>    <dbl>     <dbl>           <int>
#>  1 NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915           -3090
#>  2 NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915           -3090
#>  3 NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915           -3090
#>  4 NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915           -3090
#>  5 NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915           -3090
#>  6 NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915           -3090
#>  7 NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915           -3090
#>  8 NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915           -3090
#>  9 NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915           -3090
#> 10 NBP97-05/01 1997-08-04T12:09 -57.5007  -44.9915           -3090
#> # ... with 250,191 more rows, and 4 more variables: `Depth water
#> #   [m]` <int>, `Temp [°C]` <dbl>, Sal <dbl>, `Tpot [°C]` <dbl>
```

Search for data then pass DOI to data function.


```r
res <- pg_search(query = 'water', bbox = c(-124.2, 41.8, -116.8, 46.1), count = 3)
pg_data(res$doi[1])
#> [[1]]
#> <Pangaea data> 10.1594/PANGAEA.812092
#> # A tibble: 12 x 18
#>         Event Latitude Longitude `Elevation [m]`       `Sample label`
#>         <chr>    <dbl>     <dbl>           <int>                <chr>
#>  1   169-856H   48.434  -128.681           -2423       169-856H-55R-1
#>  2   169-856H   48.434  -128.681           -2423 169-856H-57R-1,52-54
#>  3   169-856H   48.434  -128.681           -2423 169-856H-64R-2,93-95
#>  4   169-856H   48.434  -128.681           -2423 169-856H-65R-1,35-38
#>  5 SO145/2_20  -14.153  -112.514           -2650        20DS4-surface
#>  6 SO145/2_20  -14.153  -112.514           -2650           20DS4-core
#>  7 SO145/2_29  -14.825  -111.907           -3355        29DS2-surface
#>  8 SO145/2_29  -14.825  -111.907           -3355           29DS2-core
#>  9 SO145/2_36  -14.892  -109.187           -3503        36DS1-surface
#> 10 SO145/2_36  -14.892  -109.187           -3503           36DS1-core
#> 11 SO145/2_36  -14.892  -109.187           -3503     43DS9-oxid. halo
#> 12 SO145/2_36  -14.892  -109.187           -3503           43DS9-core
#> # ... with 13 more variables: `Sample comment` <chr>, `Depth [m]` <dbl>,
#> #   `Age [ka BP]` <int>, Rock <chr>, Alteration <chr>, `DBD
#> #   [g/cm**3]` <dbl>, `Poros frac (MIP)` <dbl>, `Pore radius mean
#> #   [mm]` <dbl>, `SSA [m**2/g]` <dbl>, `Poros frac (#1 NIR)` <dbl>, `Poros
#> #   frac (#2 NIR)` <dbl>, `Water dm [%]` <dbl>, Minerals <chr>
#> 
#> [[2]]
#> <Pangaea data> 10.1594/PANGAEA.812093
#> # A tibble: 36 x 18
#>       Event `Sample label`                              `Sample comment`
#>       <chr>          <chr>                                         <chr>
#>  1 169-856H 169-856H-55R-1 complete altered, thickness of basalt =200 µm
#>  2 169-856H 169-856H-55R-1 complete altered, thickness of basalt =200 µm
#>  3 169-856H 169-856H-55R-1 complete altered, thickness of basalt =200 µm
#>  4 169-856H 169-856H-55R-1 complete altered, thickness of basalt =200 µm
#>  5 169-856H 169-856H-55R-1 complete altered, thickness of basalt =200 µm
#>  6 169-856H 169-856H-55R-1 complete altered, thickness of basalt =200 µm
#>  7 169-856H 169-856H-55R-1 complete altered, thickness of basalt =200 µm
#>  8 169-856H 169-856H-55R-1 complete altered, thickness of basalt =200 µm
#>  9 169-856H 169-856H-55R-1 complete altered, thickness of basalt =200 µm
#> 10 169-856H 169-856H-55R-1 complete altered, thickness of basalt =200 µm
#> # ... with 26 more rows, and 15 more variables: `Depth [m]` <dbl>,
#> #   `Distance [µm]` <int>, `T tech [°C]` <dbl>, Run <chr>, `- (initial
#> #   concentration of diff...)` <dbl>, `- (initial concentration of
#> #   diff...)` <dbl>, `Poros frac (#1, from fit)` <dbl>, `Poros frac (#2,
#> #   from fit)` <dbl>, `Diff coeff [10**-6 cm**2/s]` <dbl>, `Diff coeff std
#> #   dev [±] (effective from fit)` <dbl>, `Diff coeff std dev [±]
#> #   (effective total)` <dbl>, X <dbl>, `X (average)` <int>, F <int>, `-
#> #   (m)` <dbl>
```

### OAI-PMH metadata

#### Identify the service


```r
pg_identify()
#> <Pangaea>
#>   repositoryName: PANGAEA - Data Publisher for Earth & Environmental Science
#>   baseURL: https://ws.pangaea.de/oai/provider
#>   protocolVersion: 2.0
#>   adminEmail: tech@pangaea.de
#>   adminEmail: tech@pangaea.de
#>   earliestDatestamp: 2015-01-01T00:00:00Z
#>   deletedRecord: transient
#>   granularity: YYYY-MM-DDThh:mm:ssZ
#>   compression: gzip
#>   description: oaipangaea.de:oai:pangaea.de:doi:10.1594/PANGAEA.999999
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
#> Error in handle_errors(parsed): OAI-PMH errors: noRecordsMatch:
```

#### List sets


```r
pg_list_sets()
#> # A tibble: 262 x 2
#>      setSpec                                        setName
#>        <chr>                                          <chr>
#>  1       ACD       PANGAEA tech-keyword 'ACD' (2 data sets)
#>  2      ASPS     PANGAEA tech-keyword 'ASPS' (59 data sets)
#>  3 AWIXRFraw PANGAEA tech-keyword 'AWIXRFraw' (1 data sets)
#>  4   BAH1960   PANGAEA tech-keyword 'BAH1960' (2 data sets)
#>  5   BAH1961   PANGAEA tech-keyword 'BAH1961' (2 data sets)
#>  6   BAH1962   PANGAEA tech-keyword 'BAH1962' (7 data sets)
#>  7   BAH1963   PANGAEA tech-keyword 'BAH1963' (7 data sets)
#>  8   BAH1964   PANGAEA tech-keyword 'BAH1964' (7 data sets)
#>  9   BAH1965   PANGAEA tech-keyword 'BAH1965' (7 data sets)
#> 10   BAH1966   PANGAEA tech-keyword 'BAH1966' (6 data sets)
#> # ... with 252 more rows
```

#### List records


```r
pg_list_records(from = '2015-09-01', until = '2015-09-10')
#> Error in handle_errors(parsed): OAI-PMH errors: noRecordsMatch:
```

#### Get a record


```r
pg_get_record(identifier = "oai:pangaea.de:doi:10.1594/PANGAEA.788382")
#> $`oai:pangaea.de:doi:10.1594/PANGAEA.788382`
#> $`oai:pangaea.de:doi:10.1594/PANGAEA.788382`$header
#> # A tibble: 1 x 3
#>                                  identifier            datestamp
#>                                       <chr>                <chr>
#> 1 oai:pangaea.de:doi:10.1594/PANGAEA.788382 2017-08-08T17:50:18Z
#> # ... with 1 more variables: setSpec <chr>
#> 
#> $`oai:pangaea.de:doi:10.1594/PANGAEA.788382`$metadata
#> # A tibble: 1 x 13
#>                                                                         title
#>                                                                         <chr>
#> 1 Trace metals in shells of mussels and clams from deep-sea hydrothermal vent
#> # ... with 12 more variables: creator <chr>, source <chr>,
#> #   publisher <chr>, date <chr>, type <chr>, format <chr>,
#> #   identifier <chr>, description <chr>, language <chr>, rights <chr>,
#> #   coverage <chr>, subject <chr>
```



### Citing

To cite `pangaear` in publications use:

<br>

> Scott Chamberlain, Kara Woo, Andrew MacDonald, Naupaka Zimmerman and
  Gavin Simpson (2017). pangaear: Client for the 'Pangaea' Database. R
  package version 0.3.0. https://CRAN.R-project.org/package=pangaear


### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for pangaear](https://github.com/ropensci/pangaear/issues?state=open)

[Back to top](#top)
