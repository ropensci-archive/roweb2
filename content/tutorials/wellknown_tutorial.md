---
title: wellknown tutorial
package_version: 0.1.0
---



`wellknown` is an R client to convert WKT to GeoJSON, and GeoJSON to WKT. [Well-known text](http://en.wikipedia.org/wiki/Well-known_text) is perhaps not as widely known as GeoJSON, but is widely used when storing geosptial data in SQL databases. [Many RDBMS engines provide support](http://en.wikipedia.org/wiki/Well-known_text#RDBMS_Engines_that_provide_support for WKT). There is a binary equivalent, Well-known binary, that will hopefully come later in this package. WKT has similar spatial objects as GeoJSON, but the format is pretty different.

You can find the WKT specification in a PDF at [https://portal.opengeospatial.org/files/?artifact_id=25355](https://portal.opengeospatial.org/files/?artifact_id=25355).

#### WKT from R stuctures

There's a family of functions in `wellknown` that make it easy to go from familiar R objects like lists and data.frames to WKT, including:

* `point()` - make a point, e.g., `POINT (-116 45)`
* `multipoint()` - make a multipoint, e.g., `MULTIPOINT ((100 3), (101 2))`
* `linestring()` - make a linestring, e.g., `LINESTRING (100 0, 101 1)`
* `polygon()` - make a polygon, e.g., `POLYGON ((100 0), (101 0), (101 1), (100 0))`
* `multipolygon()` - make a multipolygon, e.g., `MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))`

The above currently accept (depending on the fxn) `numeric`, `list`, and `data.frame` (and `character` for special case of `EMPTY` WKT objects).

#### Geojson to WKT and vice versa

`geojson2wkt()` and `wkt2geojson()` cover a subset of the various formats available:

* `Point`
* `MultiPoint`
* `Polygon`
* `MultiPolygon`
* `LineString`
* `MultilineString`
* `Geometrycollection`

**Geojson to WKT**

`geojson2wkt()` converts any geojson as a list to a WKT string (the same format )

**WKT to Geojson**

`wkt2geojson()` converts any WKT string into geojson as a list. This list format for geojson can be used downstream e.g., in the `leaflet` package.


### Installation

Stable version from CRAN


```r
install.packages("wellknown")
```

Development version from GitHub


```r
devtools::install_github("ropensci/wellknown")
```


```r
library("wellknown")
```


## Usage

### GeoJSON to WKT

Point


```r
point <- list('type' = 'Point', 'coordinates' = c(116.4, 45.2, 11.1))
geojson2wkt(point)
#> [1] "POINT (116.4000000000000057  45.2000000000000028  11.0999999999999996)"
```

Multipoint


```r
mp <- list(type = 'MultiPoint',
           coordinates = list( c(100.0, 3.101), c(101.0, 2.1), c(3.14, 2.18)
))
geojson2wkt(mp)
#> [1] "MULTIPOINT ((100.0000000000000000 3.1010000000000000), (101.0000000000000000 2.1000000000000001), (3.1400000000000001 2.1800000000000002))"
```

LineString


```r
st <- list(type = 'LineString',
            coordinates = list(c(0.0, 0.0, 10.0), c(2.0, 1.0, 20.0),
                              c(4.0, 2.0, 30.0), c(5.0, 4.0, 40.0)))
geojson2wkt(st, fmt = 0)
#> [1] "LINESTRING (0 0 10, 2 1 20, 4 2 30, 5 4 40)"
```

Multilinestring


```r
multist <- list(type = 'MultiLineString',
      coordinates = list(
        list(c(0.0, -1.0), c(-2.0, -3.0), c(-4.0, -5.0)),
        list(c(1.66, -31023.5), c(10000.9999, 3.0), c(100.9, 1.1), c(0.0, 0.0))
      ))
geojson2wkt(multist)
#> [1] "MULTILINESTRING ((0.0000000000000000 -1.0000000000000000, -2.0000000000000000 -3.0000000000000000, -4.0000000000000000 -5.0000000000000000), (1.6599999999999999 -31023.5000000000000000, 10000.9999000000007072 3.0000000000000000, 100.9000000000000057 1.1000000000000001, 0.0000000000000000 0.0000000000000000))"
```

Polygon


```r
poly <- list(type = 'Polygon',
      coordinates = list(
        list(c(100.001, 0.001), c(101.12345, 0.001), c(101.001, 1.001), c(100.001, 0.001)),
        list(c(100.201, 0.201), c(100.801, 0.201), c(100.801, 0.801), c(100.201, 0.201))
))
geojson2wkt(poly)
#> [1] "POLYGON ((100.0010000000000048 0.0010000000000000, 101.1234500000000054 0.0010000000000000, 101.0010000000000048 1.0009999999999999, 100.0010000000000048 0.0010000000000000), (100.2009999999999934 0.2010000000000000, 100.8010000000000019 0.2010000000000000, 100.8010000000000019 0.8010000000000000, 100.2009999999999934 0.2010000000000000))"
```

Multipolygon


```r
mpoly <-
  list(type = "MultiPolygon",
    coordinates = list(list(list(c(30, 20), c(45, 40), c(10, 40), c(30, 20))),
        list(list(c(15, 5), c(40, 10), c(10, 20), c(5 ,10), c(15, 5))))
  )
geojson2wkt(mpoly, fmt = 1)
#> [1] "MULTIPOLYGON (((30.0 20.0, 45.0 40.0, 10.0 40.0, 30.0 20.0)), ((15.0 5.0, 40.0 10.0, 10.0 20.0, 5.0 10.0, 15.0 5.0)))"
```

GeometryCollection


```r
gmcoll <- list(type = 'GeometryCollection',
   geometries = list(
     list(type = "Point", coordinates = list(0.0, 1.0)),
     list(type = 'LineString', coordinates = list(c(-100.0, 0.0), c(-101.0, -1.0))),
     list(type = 'MultiPoint',
          'coordinates' = list(c(100.0, 3.101), c(101.0, 2.1), c(3.14, 2.18)))
  )
)
geojson2wkt(gmcoll, fmt = 0)
#> [1] "GEOMETRYCOLLECTION (POINT (0 1), LINESTRING (-100 0, -101 -1), MULTIPOINT ((100.000 3.101), (101.0 2.1), (3.14 2.18)))"
```

Convert json or character objects

You can convert directly from an object of class `json`, which is output from `jsonlite::toJSON()`.


```r
library("jsonlite")
(json <- toJSON(list(type = "Point", coordinates = c(-105, 39))))
#> {"type":["Point"],"coordinates":[-105,39]}
```


```r
geojson2wkt(json)
#> [1] "POINT (-105 39)"
```

And you can convert from a geojson character string:


```r
str <- '{"type":["LineString"],"coordinates":[[0,0,10],[2,1,20],[4,2,30],[5,4,40]]}'
geojson2wkt(str)
#> [1] "LINESTRING (0 0 10, 2 1 20, 4 2 30, 5 4 40)"
```

### WKT to GeoJSON

Point

As a `Feature`


```r
str <- "POINT (-116.4000000000000057 45.2000000000000028)"
wkt2geojson(str)
#> $type
#> [1] "Feature"
#> 
#> $geometry
#> $geometry$type
#> [1] "Point"
#> 
#> $geometry$coordinates
#> [1] -116.4   45.2
#> 
...
```

Not `Feature`


```r
wkt2geojson(str, feature = FALSE)
#> $type
#> [1] "Point"
#> 
#> $coordinates
#> [1] -116.4   45.2
#> 
#> attr(,"class")
#> [1] "geojson"
```

Multipoint


```r
str <- 'MULTIPOINT ((100.000 3.101), (101.000 2.100), (3.140 2.180))'
wkt2geojson(str, feature = FALSE)
#> $type
#> [1] "MultiPoint"
#> 
#> $coordinates
#> $coordinates[[1]]
#> [1] 100.000   3.101
#> 
#> $coordinates[[2]]
#> [1] 101.0   2.1
#> 
...
```

Polygon


```r
str <- "POLYGON ((100 0.1, 101.1 0.3, 101 0.5, 100 0.1), (103.2 0.2, 104.8 0.2, 100.8 0.8, 103.2 0.2))"
wkt2geojson(str, feature = FALSE)
#> $type
#> [1] "Polygon"
#> 
#> $coordinates
#> $coordinates[[1]]
#> $coordinates[[1]][[1]]
#> [1] 100.0   0.1
#> 
#> $coordinates[[1]][[2]]
#> [1] 101.1   0.3
...
```

MultiPolygon


```r
str <- "MULTIPOLYGON (((40 40, 20 45, 45 30, 40 40)),
    ((20 35, 45 20, 30 5, 10 10, 10 30, 20 35), (30 20, 20 25, 20 15, 30 20)))"
wkt2geojson(str, feature = FALSE)
#> $type
#> [1] "MultiPolygon"
#> 
#> $coordinates
#> $coordinates[[1]]
#> $coordinates[[1]][[1]]
#> $coordinates[[1]][[1]][[1]]
#> [1] 40 40
#> 
#> $coordinates[[1]][[1]][[2]]
...
```

Linestring


```r
wkt2geojson("LINESTRING (0 -1, -2 -3, -4 5)", feature = FALSE)
#> $type
#> [1] "LineString"
#> 
#> $coordinates
#> $coordinates[[1]]
#> [1]  0 -1
#> 
#> $coordinates[[2]]
#> [1] -2 -3
#> 
...
```

### lint WKT

The `lint()` function uses native R to check for correct stucture of WKT strings. That is, it works, but may be slow-ish for very large strings.


```r
lint("POINT (1 2)")
#> [1] TRUE
lint("LINESTRING EMPTY")
#> [1] TRUE
lint("MULTIPOINT ((1 2), (3 4), (-10 100))")
#> [1] TRUE
lint("POLYGON((20.3 28.6, 20.3 19.6, 8.5 19.6, 8.5 28.6, 20.3 28.6))")
#> [1] TRUE
lint("MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))")
#> [1] TRUE
lint("POINT (1 2 3 4 5)")
#> [1] FALSE
lint("LINESTRING (100)")
#> [1] FALSE
lint("MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)), ((15 5, a b, 10 20, 5 10, 15 5)))")
#> [1] FALSE
```


### Citing

To cite `wellknown` in publications use:


> Scott Chamberlain (2015). wellknown: Convert Between 'WKT' to 'GeoJSON'. R package
  version 0.1.0. https://github.com/ropensci/wellknown


### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for wellknown](https://github.com/ropensci/wellknown/issues?state=open)

[Back to top](#top)
