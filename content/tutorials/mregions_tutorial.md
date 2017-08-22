---
title: mregions tutorial
package_version: 0.1.0
---



`mregions` is useful to a wide diversity of R users because you get access to all of the
data MarineRegions has, which can help in a variety of use cases:

* Visualize marine regions alone
* Visualize marine regions with associated data paired with analysis
* Use marine region geospatial boundaries to query data providers (e.g., OBIS (<http://www.iobis.org>))
* Geocode - get geolocation data from place names
* Reverse Geocode - get place names from geolocation data

<section id="installation">

## Installation

Stable version from CRAN


```r
install.packages("mregions")
```

Development version from GitHub


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropenscilabs/mregions")
```


```r
library("mregions")
```

<section id="usage">

## Usage

### Get list of place types


```r
res <- mr_place_types()
head(res$type)
#> [1] "Town"                      "Arrondissement"
#> [3] "Department"                "Province (administrative)"
#> [5] "Country"                   "Continent"
```

### Get Marineregions records by place type


```r
res1 <- mr_records_by_type(type = "EEZ")
head(res1)
#>   MRGID                                            gazetteerSource
#> 1  3293 Maritime Boundaries Geodatabase, Flanders Marine Institute
#> 2  5668 Maritime Boundaries Geodatabase, Flanders Marine Institute
#> 3  5669 Maritime Boundaries Geodatabase, Flanders Marine Institute
#> 4  5670 Maritime Boundaries Geodatabase, Flanders Marine Institute
#> 5  5672 Maritime Boundaries Geodatabase, Flanders Marine Institute
#> 6  5673 Maritime Boundaries Geodatabase, Flanders Marine Institute
#>   placeType latitude longitude minLatitude minLongitude maxLatitude
#> 1       EEZ 51.46483  2.704458    51.09111     2.238118    51.87000
#> 2       EEZ 53.61508  4.190675    51.26203     2.539443    55.76500
#> 3       EEZ 54.55970  8.389231    53.24281     3.349999    55.91928
#> 4       EEZ 40.87030 19.147094    39.63863    18.461940    41.86124
#> 5       EEZ 42.94272 29.219062    41.97820    27.449580    43.74779
#> 6       EEZ 43.42847 15.650844    41.62201    13.001390    45.59079
#>   maxLongitude precision            preferredGazetteerName
#> 1     3.364907  58302.49   Belgian Exclusive Economic Zone
#> 2     7.208364 294046.10     Dutch Exclusive Economic Zone
#> 3    14.750000 395845.50    German Exclusive Economic Zone
#> 4    20.010030 139751.70  Albanian Exclusive Economic Zone
#> 5    31.345280 186792.50 Bulgarian Exclusive Economic Zone
#> 6    18.552360 313990.30  Croatian Exclusive Economic Zone
#>   preferredGazetteerNameLang   status accepted
#> 1                    English standard     3293
#> 2                    English standard     5668
#> 3                    English standard     5669
#> 4                    English standard     5670
#> 5                    English standard     5672
#> 6                    English standard     5673
```

### Get a data.frame of region names


```r
rnames <- mr_names()
```

### Search region names

Either pass output of `mr_names()`


```r
mr_names_search(rnames, "IHO")
#> # A tibble: 5 × 4
#>                                   name
#>                                  <chr>
#> 1                    MarineRegions:iho
#> 2 MarineRegions:iho_quadrants_20150810
#> 3                     World:iosregions
#> 4       MarineRegions:eez_iho_union_v2
#> 5                   Belgium:vl_venivon
#> # ... with 3 more variables: title <chr>, name_first <chr>,
#> #   name_second <chr>
```

or don't (but then `mr_names_search()` call takes longer)


```r
mr_names_search("IHO")
#> # A tibble: 5 × 4
#>                                   name
#>                                  <chr>
#> 1                    MarineRegions:iho
#> 2 MarineRegions:iho_quadrants_20150810
#> 3                     World:iosregions
#> 4       MarineRegions:eez_iho_union_v2
#> 5                   Belgium:vl_venivon
#> # ... with 3 more variables: title <chr>, name_first <chr>,
#> #   name_second <chr>
```

### Get a region - geojson


```r
res3 <- mr_geojson(name = "Turkmen Exclusive Economic Zone")
class(res3)
#> [1] "mr_geojson"
names(res3)
#> [1] "type"          "totalFeatures" "features"      "crs"
#> [5] "bbox"
```

### Get a region - shp


```r
res4 <- mr_shp(name = "Belgian Exclusive Economic Zone")
class(res4)
#> [1] "SpatialPolygonsDataFrame"
#> attr(,"package")
#> [1] "sp"
```

### Get OBIS EEZ ID


```r
res6 <- rnames[grepl("eez", rnames$name, ignore.case = TRUE), ]
mr_obis_eez_id(res6$title)
#>   [1] 218   1   2   3   5   9  10  11  13  16  18  21  24  28  29  30  33
#>  [18]  34  35  36  37  41  42  43  46  51  56  64  67  68  69  70  71  74
#>  [35]  78  82  84  85  91  92  93  94  95  97  99 100 101 104 105 106 107
#>  [52] 108 112 113 114 115 118 120 124 130 134 137 141 147 149 151 153 154
#>  [69] 158 164 166 167 169 171 172 174 177 184 189 191 193 194 195 196 198
#>  [86] 200 201 203 204 205 206 209 210 211 212 213 217 223 226 145 143 179
#> [103]  39  38 181 133 110 216 231 180 183  31  32  44  47  48  53 102 202
#> [120]   7   8  12  17  19  40  86  88 222 178  73  72  75  76  61  63  66
#> [137]  96 103  89 146 155 150 152 156 161 173 111 116 117 129 139 168  14
#> [154]  20  22  23  25  27 207  49 190   6 119 126 122 127 227 228 214  15
#> [171] 123 182 136 132 131  77 121 165  52 188 199 208 238 239  59 185  45
#> [188]  54 192  65 237 197 135  50  79  60  62 162 159  98 220 221 219 176
#> [205] 175 163 138 224 187 241  81
```

### Convert to WKT

From geojson or shp. Here, geojson


```r
res7 <- mr_geojson(key = "MarineRegions:eez_33176")
mr_as_wkt(res7, fmt = 5)
#> [1] "MULTIPOLYGON (((41.573732 -1.659444, 45.891882 ... cutoff
```

### Get regions, then OBIS data

Using Well-Known Text. Both shp and geojson data returned from `region_shp()` and `region_geojson()`, respectively, can be passed to `as_wkt()` to get WKT.


```r
shp <- mr_shp(name = "Belgian Exclusive Economic Zone")
wkt <- mr_as_wkt(shp)
library('httr')
library('data.table')
args <- list(scientificname = "Abra alba", geometry = wkt, limit = 100)
res <- httr::GET('http://api.iobis.org/occurrence', query = args)
xx <- data.table::setDF(data.table::rbindlist(httr::content(res)$results, use.names = TRUE, fill = TRUE))
xx <- xx[, c('scientificName', 'decimalLongitude', 'decimalLatitude')]
names(xx)[2:3] <- c('longitude', 'latitude')
```

Plot


```r
library('leaflet')
leaflet() %>%
  addTiles() %>%
  addCircleMarkers(data = xx) %>%
  addPolygons(data = shp)
```

![map1](../assets/tutorial-images/mregions/map1.png)

### Dealing with bigger WKT

What if you're WKT string is super long?  It's often a problem because some online species occurrence databases that accept WKT to search by geometry bork due to
limitations on length of URLs if your WKT string is too long (about 8000 characters,
including remainder of URL). One way to deal with it is to reduce detail - simplify.


```r
install.packages("rmapshaper")
```

Using `rmapshaper` we can simplify a spatial object, then search with that.


```r
shp <- mr_shp(name = "Dutch Exclusive Economic Zone")
```

Visualize


```r
leaflet() %>%
  addTiles() %>%
  addPolygons(data = shp)
```

![map2](../assets/tutorial-images/mregions/complex.png)

Simplify


```r
library("rmapshaper")
shp <- ms_simplify(shp)
```

It's simplified:


```r
leaflet() %>%
  addTiles() %>%
  addPolygons(data = shp)
```

![map3](../assets/tutorial-images/mregions/simple.png)


<section id="citing">

## Citing

> Scott Chamberlain (2016). mregions: Marine Regions Data
  from 'Marineregions.org'. R package version 0.1.0.
  https://cran.rstudio.com/package=mregions


<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our GitHub repo for mregions](https://github.com/ropenscilabs/mregions/issues?state=open)


[Back to top](#top)

[mr]: https://github.com/ropenscilabs/mregions
