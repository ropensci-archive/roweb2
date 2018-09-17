---
slug: "style-geojson-polygon"
title: Interactive maps with polygons using R, Geojson, and Github
date: 2013-10-23
authors:
  - name: Scott Chamberlain
categories:
  - blog
tags:
- R
- rgbif
- API
- geojson
- json
- maps
---

Previously on this blog we have discussed making geojson maps and uploading to Github for interactive visualization [with USGS BISON data](http://ropensci.org/blog/2013/07/04/rbison-geoson/), and [with GBIF data](http://ropensci.org/blog/2013/07/17/style-geojson/), and on [my own personal blog](http://sckott.github.io/2013/06/geojson/). This is done using a file format called [*geojson*](http://en.wikipedia.org/wiki/GeoJSON), a file format based on JSON (JavaScript Object Notation) in which you can specify geographic data along with any other metadata.

In two the previous posts about *geojson*, I described how you could get data from the USGS BISON API using our [rbison package](https://github.com/ropensci/rbison), and from the GBIF API using the [rgbif package](https://github.com/ropensci/rgbif), then make a *geojson* file, and send to Github. In both examples, the data were points. What about polygons?  This is a relatively common use case in which an area is defined on a map instead of points - and polygons are supported in geojson.  How do we do this with the R to geojson to Github workflow?

Using our package rgbif you can get a interactive map with polygons up on Github in just four lines of code! Of course creating a .shp file will take more than four lines of code.

***

## Install rgbif

You'll need devtools packge to install rgbif from Github.

```r
install.packages("devtools")
library(devtools)
install_github("rgbif", "ropensci", ref="newapi")
```

## Load rgbif

```r
library(rgbif)
```

***

## Make the map

There are various ways of getting a .shp file. I won't go over those here, so we'll just use a .shp file from the web. I downloaded a zip file for *Abies magnifica* for its range map from the book *Atlas of United States Trees* from [this site](http://esp.cr.usgs.gov/data/little/) - here is the link for the zip file: [http://esp.cr.usgs.gov/data/little/abiemagn.zip](http://esp.cr.usgs.gov/data/little/abiemagn.zip). I unzipped the file locally on my machine, and here we just use the `abiemagn.shp` file within that zip file.

The first line of code in the next code block uses the function `togeojson` to make a geojson file, which is written locally on your machine (a message tells you where it is located, but you can specify where you want it to go with the `destpath` parameter). Note that the input argument to `togeojson` goes to the directory for `abiemagn/abiemagn.shp`, but for this to work you need the associated other two files, in this case: abiemagn.dbf and abiemagn.shx.

The second line of code uses the `gist` function to upload your .geojson file as a gist on Github.

```r
file <- "~/abiemagn/abiemagn.shp"
togeojson(input = file, method = "local", outfilename = "abiesmagmap")
```

```
## Success! File is at /Users/scottmac2/abiesmagmap.geojson
```

```r
gist("~/abiesmagmap.geojson", description = "Abies magnifica polygons")
```

```
## Your gist has been published
## View gist at https://gist.github.com/sckott/7121053
```

That's it! The map is immediately available on the web, see [here](https://gist.github.com/sckott/7121053) for the one we just created. And you can embed the map too, like here:

<!-- <iframe src="https://gist.github.com/sckott/7121053?scroll=false"></iframe> -->

<script src="https://gist.github.com/sckott/7121053.js"></script>

