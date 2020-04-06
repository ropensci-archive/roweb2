---
title: Extracting eBird Data from a Polygon
author:
  - Matthew Strimas-Mackey
date: '2020-04-16'
slug: ebird-polygon
categories: []
tags:
  - auk
  - ebird
  - spatial
  - geospatial
  - ornithology
description: A short post demonstrating how to use the R package auk to extract eBird data from within a study area defined by a polyon or Shapefile.
preface: This tech note about the [peer-reviewed auk package](https://docs.ropensci.org/auk/) was first posted on [Matthew Strimas-Mackey's website](https://strimas.com/post/extracting-ebird-data-polygon/) and kindly contributed to this blog. A [first longer blog post from 2018](/blog/2018/08/07/auk/) provides more context about the package.
twitterImg: technotes/2020/04/16/ebird-polygon/plot-1.png
output:
  html_document:
    keep_md: yes
---




One of the first things I took on when I started at the Cornell Lab of Ornithology was creating the [auk R package](https://cornelllabofornithology.github.io/auk/) for accessing eBird data. The entire eBird dataset can be downloaded as a massive text file, called the eBird Basic Dataset (EBD), and auk pulls out manageable chunks of the dataset based on various spatial, temporal, or taxonomic filters. I'm often asked "how do I extract data from within a polygon?" (usually "polygon" is replaced by "shapefile", but I try to avoid that word since there's [good reasons to stop using shapefiles](http://switchfromshapefile.org/)). Rather than answer these questions individually, I thought I'd do a quick post about how to do this with auk. Note that, at the time of posting, this requires auk version 	0.4.1 or higher, which can be installed with:


```r
install.packages("auk")
```

For more details on auk and eBird data in general, including how to get access to the EBD, it's worth reading the first two chapters of the [eBird Best Practices book](https://cornelllabofornithology.github.io/ebird-best-practices/). For the sake of speed and smaller file size, I'll be working on a subset of the EBD containing all Northern Bobwhite records from 2019, which I obtained using the [EBD custom download form](https://cornelllabofornithology.github.io/ebird-best-practices/ebird.html#ebird-size-custom), and you can [access here](https://github.com/mstrimas/strimasdotcom/raw/master/content/post/2020-04-02-extracting-ebird-data-polygon/ebd_norbob_201901_201912_relFeb-2020.zip). However, everything I'll show in this post works equally as well (just a lot slower!) on the full EBD. For this example, let's say we want to extract all records from within a polygon defining [Bird Conservation Region](https://nabci-us.org/resources/bird-conservation-regions/) 27 ([Southeastern Coastal Plains](https://nabci-us.org/resources/bird-conservation-regions-map/#bcr27)). A GeoPackage of this region is available on the GitHub repository for the eBird Best Practices book, [download it](https://github.com/CornellLabofOrnithology/ebird-best-practices/raw/master/data/gis-data.gpkg), place it in the `data/` subdirectory of your RStudio project, then load it into R with:


```r
library(sf)
library(auk)
library(dplyr)

poly <- read_sf("data/gis-data.gpkg", layer = "bcr")
```

If you have a shapefile, replace `"data/gis-data.gpkg"` with the path to your shapefile and omit `layer = "bcr"`. Now that we have a polygon, extracting eBird data is a two step process:

1. Extract data from the EBD that's within a bounding box containing the polygons using the function `auk_bbox()`. This is necessary because due to the way auk works under the hood, it can only filter to ranges of latitudes and longitudes.
2. Import the resulting data into R and further subset it to just the observations that fall within the polygon.

Fortunately, step 1 is made easier by `auk_bbox()` accepting spatial `sf` or `raster` objects and automatically calculating the bounding box for you. For example, 


```r
auk_ebd("data/ebd_norbob_201901_201912_relFeb-2020.txt") %>% 
  auk_bbox(poly)
```

```
Input 
  EBD: /home/maelle/Documents/ropensci/roweb2/content/technotes/2020-04-16-extracting-ebird-data-from-a-polygon/data/ebd_norbob_201901_201912_relFeb-2020.txt 

Output 
  Filters not executed

Filters 
  Species: all
  Countries: all
  States: all
  BCRs: all
  Bounding box: Lon -91.6 - -75.5; Lat 29.3 - 37.3
  Date: all
  Start time: all
  Last edited date: all
  Protocol: all
  Project code: all
  Duration: all
  Distance travelled: all
  Records with breeding codes only: no
  Complete checklists only: no
```

Notice that the output of the above command says `Bounding box: Lon -91.6 - -75.5; Lat 29.3 - 37.3`, which are the bounds of the smallest square that contains the polygon. Let's follow the method [outlined in the Best Practices book](https://cornelllabofornithology.github.io/ebird-best-practices/ebird.html#ebird-extract) to extract some data! We'll get all observations on complete checklists from May to August inside the bounding box of the polygon:


```r
f_out <- "data/ebd_norbob_poly.txt"
auk_ebd("data/ebd_norbob_201901_201912_relFeb-2020.txt") %>% 
  # define filters
  auk_bbox(poly) %>% 
  auk_date(c("*-05-01", "*-08-31")) %>% 
  auk_complete() %>% 
  # compile and run filters
  auk_filter(f_out)
```

The results were output to a file, which you can read in with `read_ebd()`.


```r
ebd <- read_ebd("data/ebd_norbob_poly.txt")
```

The data are now in a data frame and it's time to proceed to step 2: further subset the data to only keep points within the polygon. First we'll convert this data frame to a spatial `sf` object using the `latitude` and `longitude` columns, then well use `st_within()` to identify the points within the polygon, and use this to subset the data frame. Note that we have to be careful with our coordinate reference system here: `crs = 4326` specifies that the EBD data are in unprojected, lat-long coordinates and we use `st_transform()` to ensure the polygons and points are in the coordinate reference system.


```r
# convert to sf object
ebd_sf <- ebd %>% 
  select(longitude, latitude) %>% 
  st_as_sf( coords = c("longitude", "latitude"), crs = 4326)

# put polygons in same crs
poly_ll <- st_transform(poly, crs = st_crs(ebd_sf))

# identify points in polygon
in_poly <- st_within(ebd_sf, poly_ll, sparse = FALSE)
```

```
although coordinates are longitude/latitude, st_within assumes that they are planar
```

```r
# subset data frame
ebd_in_poly <- ebd[in_poly[, 1], ]
```

Finally, let's create a simple map showing the EBD observations before (in black) and after (in green) subsetting the data to be within the polygon.


```r
par(mar = c(0, 0, 0, 0))
plot(poly %>% st_geometry(), col = "grey40", border = NA)
plot(ebd_sf, col = "black", pch = 19, cex = 0.5, add = TRUE)
plot(ebd_sf[in_poly[, 1], ], 
     col = "forestgreen", pch = 19, cex = 0.5, 
     add = TRUE)
legend("top", 
       legend = c("All observations", "After spatial subsetting"), 
       col = c("grey40", "forestgreen"), 
       pch = 19,
       bty = "n",
       ncol = 2)
```

{{<figure src="plot-1.png" alt="map of all occurrences, with the polygon in grey, and the points kept after spatial subsetting in green">}}

Looks like it worked! We got just the points within the polygon as intended. Two final notes:

1. If you're working with the full EBD (a 200+ GB file), you'll need to follow step 1 and subset the data using auk prior to importing into R. However, if you've used the custom download form to get an EBD subset, your file is likely small enough that you can read the data directly into R with `read_ebd()` and skip straight to step 2.
2. If your intention is to eventually [zero-fill the EBD](https://cornelllabofornithology.github.io/ebird-best-practices/ebird.html#ebird-zf) to produce presence-absence data you'll need to include the sampling event data file in the `auk_ebd()`, subset both the EBD and sampling event data files separately to points within the polygon, the combine them together and zero-fill with `auk_zerofill()`.

 auk users are welcome to submit issues on GitHub with bug reports or feature requests, or to [email me directly](https://github.com/CornellLabofOrnithology/auk/blob/88cf9a370adb8d7a106f07cd45003033c73edc8e/DESCRIPTION#L8). Should you be interested in contributing to auk, there is also a [vignette specifically for adding functionality to the package](https://docs.ropensci.org/auk/articles/development.html).


