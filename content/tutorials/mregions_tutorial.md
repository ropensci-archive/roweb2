---
title: mregions tutorial
package_version: 0.1.6
---



`mregions` is useful to a wide diversity of R users because you get access to all of the
data MarineRegions has, which can help in a variety of use cases:

* Visualize marine regions alone
* Visualize marine regions with associated data paired with analysis
* Use marine region geospatial boundaries to query data providers (e.g., OBIS (<http://www.iobis.org>))
* Geocode - get geolocation data from place names
* Reverse Geocode - get place names from geolocation data


### Installation

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


### GeoJSON

Get region


```r
res1 <- mr_geojson(key = "Morocco:dam")
```

Get `leaflet` library


```r
install.packages("leaflet")
```

Plot data


```r
library('leaflet')
leaflet() %>%
  addProviderTiles(provider = 'OpenStreetMap') %>%
  addGeoJSON(geojson = res1$features) %>%
  setView(-3.9, 35, zoom = 10)
```

![map](/img/tutorial-images/mregions/leaf1.png)

### Shape

Get region


```r
res2 <- mr_shp(key = "MarineRegions:eez_iho_union_v2", maxFeatures = 5)
```

Get helper library


```r
install.packages("leaflet")
```

Plot data


```r
library('leaflet')
leaflet() %>%
  addProviderTiles(provider = 'OpenStreetMap') %>%
  addPolygons(data = res2)
```

![map2](/img/tutorial-images/mregions/leaf2.png)

### Convert to WKT

From geojson


```r
res3 <- mr_geojson(key = "Morocco:dam")
mr_as_wkt(res3, fmt = 5)

#> [1] "MULTIPOLYGON (((41.573732 -1.659444, 45.891882 ... cutoff
```

From shp object (`SpatialPolygonsDataFrame`) or file, both work


```r
mr_as_wkt(mr_shp(key = "MarineRegions:eez_iho_union_v2"))

#> [1] "GEOMETRYCOLLECTION (POLYGON ((-7.25 ... cutoff
```

### Get OBIS EEZ ID


```r
mr_obis_eez_id("bulgarian exclusive economic zone")
#> [1] 71
```


### Citing

> Scott Chamberlain (2017). mregions: Marine Regions Data from
  'Marineregions.org'. R package version 0.1.46.
  https://CRAN.R-project.org/package=mregions



### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our GitHub repo for mregions](https://github.com/ropenscilabs/mregions/issues?state=open)


[Back to top](#top)

[mr]: https://github.com/ropenscilabs/mregions
