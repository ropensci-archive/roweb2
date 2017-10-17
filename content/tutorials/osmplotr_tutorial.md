---
title: osmplotr tutorial
package_version: 0.3.0
---





### Installation

Stable version from CRAN


```r
install.packages("osmplotr")
```


Development version from GitHub


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropenscilabs/osmplotr")
```


```r
library("osmplotr")
library("maptools")
```


## Usage


### Introduction

A map can be generated using the following simple steps:



1. Specify the bounding box for the desired region


```r
bbox <- get_bbox(c (-0.13, 51.51, -0.11, 51.52))
```

2. Download the desired data---in this case, all building perimeters.


```r
dat_B <- extract_osm_objects(key='building', bbox=bbox)
```

3. Initiate an `osm_basemap` with desired background (`bg`) colour


```r
map <- osm_basemap(bbox = bbox, bg = 'gray20')
```

4. Add desired plotting objects in the desired colour.


```r
map <- add_osm_objects(map, dat_B, col = 'gray40')
```

5. Print the map


```r
print_osm_map(map)
```

![](/img/tutorial-images/osmplotr/map1.png)

The function `print_osm_map` creates a graphics device that is scaled to the
bounding box of the map.  Note also that `osmplotr` maps contain no margins and
fill the entire plot area.  Additional capabilities of `osmplotr` are described
in the following sections, beginning with downloading and extraction of data.

### Downloading Data

The main function for downloading OSM data from the
[overpass API](https://overpass-api.de) is `extract_osm_objects`. Data of a
particular type can be extracted by passing the appropriate OSM `key`, as in the
above example:


```r
bbox <- get_bbox(c(-0.13, 51.51, -0.11, 51.52))
dat_B <- extract_osm_objects(key = 'building', bbox = bbox)
dat_H <- extract_osm_objects(key = 'highway', bbox = bbox)
```

These objects are of appropriate `Spatial` classes:


```r
class(dat_B); class(dat_H)
```

```
#> [1] "sf"         "data.frame"
```

```
#> [1] "sf"         "data.frame"
```

```r
class(dat_B$geometry); class(dat_H$geometry)
```

```
#> [1] "sfc_POLYGON" "sfc"
```

```
#> [1] "sfc_LINESTRING" "sfc"
```

`Spatial` ([`sp`](https://cran.r-project.org/package=sf)) objects may be
returned with,


```r
dat_B <- extract_osm_objects(key = 'building', bbox = bbox, sf = FALSE)
```

otherwise `sf` is used as the default format.  The Simple Features (`sf`)
objects with polygons of London buildings and linestrings of highways
respectively contain

```r
nrow(dat_B); nrow(dat_H)
```

```
#> [1] 1759
```

```
#> [1] 1133
```

... 1,759 building polygons and 1,133 highway lines.  `extract_osm_objects` also
accepts `key-value` pairs which are passed to the
[overpass API](https://overpass-api.de) :


```r
dat_T <- extract_osm_objects(key = 'natural', value = 'tree', bbox = bbox)
```

Trees are located by single coordinates and are thus point objects:


```r
class(dat_T$geometry); nrow(dat_T)
```

```
#> [1] "sfc_POINT" "sfc"
```

```
#> [1] 688
```


### Citing

> Mark Padgham (2017). osmplotr: Bespoke Images of 'OpenStreetMap'
  Data. R package version 0.3.0.
  https://CRAN.R-project.org/package=osmplotr



### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our GitHub repo for osmplotr](https://github.com/ropenscilabs/osmplotr/issues?state=open)


[Back to top](#top)
