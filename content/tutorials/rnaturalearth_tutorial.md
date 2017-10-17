---
title: rnaturalearth tutorial
package_version: 0.1.0
---



This vignette is an introduction to [rnaturalearth](https://github.com/ropenscilabs/rnaturalearth), an R package to hold and facilitate interaction with natural earth vector map data. `rnaturalearth` is a data package designed to provide map data that can be visualised using other R packages.

[Natural Earth](http://www.naturalearthdata.com/) is a public domain map dataset including vector country and other administrative boundaries.

[rnaturalearth](https://github.com/ropenscilabs/rnaturalearth) does two main things.

1. Contains pre-downloaded vector maps for :
    + countries `ne_countries()`
    + states `ne_states()`
    + coastline `ne_coastline()`

1. Has `ne_download()` function to facilitate download of other vector and raster maps.


This vignette uses `sp::plot` as a simple, quick way to show how different data can be accessed.`rnaturalearth` is designed to provide data allowing creation of more elaborate maps in other visualisation packages (e.g. `ggplot2`, `tmap` and `choroplethr`).



### Installation

CRAN version


```r
install.packages("rnaturalearth")
```

Development version from GitHub


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropenscilabs/rnaturalearth")
```


```r
library("rnaturalearth")
library("sp")
```


## Usage

### 1. Maps in the package.

Pre-downloaded maps can be accessed with :

1. `ne_countries()` for country (admin-0) boundaries
1. `ne_states()` for boundaries within countries (admin-1)
1. `ne_coastline()` for world coastline


World at small scale (low resolution)


```r
sp::plot(ne_countries(type = 'countries', scale = 'small'))
```

![plot of chunk unnamed-chunk-5](/img/tutorial-images/rnaturalearth/unnamed-chunk-5-1.png)

Countries, UK undivided


```r
sp::plot(ne_countries(country = 'united kingdom', type='countries'))
```

![plot of chunk unnamed-chunk-6](/img/tutorial-images/rnaturalearth/unnamed-chunk-6-1.png)

`map_units`, UK divided into England, Scotland, Wales and Northern Ireland


```r
sp::plot(ne_countries(country = 'united kingdom', type='map_units'))
```

![plot of chunk unnamed-chunk-7](/img/tutorial-images/rnaturalearth/unnamed-chunk-7-1.png)

Countries, small scale


```r
sp::plot(ne_countries(country = 'united kingdom', scale = 'small'))
```

![plot of chunk unnamed-chunk-8](/img/tutorial-images/rnaturalearth/unnamed-chunk-8-1.png)

Countries, medium scale


```r
sp::plot(ne_countries(country = 'united kingdom', scale = 'medium'))
```

![plot of chunk unnamed-chunk-9](/img/tutorial-images/rnaturalearth/unnamed-chunk-9-1.png)

Coastline of the world subsetting of coastline is not possible because the Natural Earth data are not attributed in that way


```r
sp::plot(ne_coastline())
```

![plot of chunk unnamed-chunk-10](/img/tutorial-images/rnaturalearth/unnamed-chunk-10-1.png)

### 2. Downloading other Natural Earth vectors with ne_download().

Each [Natural Earth](http://www.naturalearthdata.com/) dataset is characterised on the website according to `scale`, `type` and `category`. [rnaturalearth](https://github.com/ropenscilabs/rnaturalearth) allows you to specify `scale`, `type` and `category` and will construct the url and download the corresponding file.


```r

# lakes
lakes110 <- ne_download(scale = 110, type = 'lakes', category = 'physical')
sp::plot(lakes110, col = 'blue')

# rivers
rivers110 <- ne_download(scale = 110, type = 'rivers_lake_centerlines', category = 'physical')
sp::plot(rivers110, col = 'blue')
```


### Citing

> Andy South (2017). rnaturalearth: World Map Data from Natural Earth.
  R package version 0.1.0.
  https://CRAN.R-project.org/package=rnaturalearth



### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our GitHub repo for rnaturalearth](https://github.com/ropenscilabs/rnaturalearth/issues?state=open)


[Back to top](#top)
