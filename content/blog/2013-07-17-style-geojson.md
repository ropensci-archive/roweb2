---
slug: "style-geojson"
title: Style GeoJSON
date: 2013-07-17
authors:
  - name: Scott Chamberlain
categories:
  - blog
topics:
- R
- API
- geojson
- json
- maps
---

[Previously on this blog][ropost] and on [my own personal blog][scottpost], I have discussed how easy it is to create interactive maps on Github using a combination of R, git and Github. This is done using a file format called [*geojson*](http://en.wikipedia.org/wiki/GeoJSON), a file format based on JSON (JavaScript Object Notation) in which you can specify geographic data along with any other metadata.

In my [previous post on this blog][ropost] about *geojson*, I described how you could get data from the USGS BISON API using our [rbison package][rbison], then make a *geojson* file, then push to Github. Here, I describe briefly how you can style your map. This time, we'll get data from [GBIF][gbif] using the [rgbif package][rgbif].

***************

## Load package


```r
# install_github('rgbif', 'ropensci')
library(rgbif)
```


***************

## Get data from GBIF


```r
splist <- c("Accipiter erythronemius", "Junco hyemalis", "Aix sponsa")
out <- occurrencelist_many(splist, coordinatestatus = TRUE, maxresults = 100)
dat <- gbifdata(out)
head(dat)
```



```
                taxonName decimalLatitude decimalLongitude
1 Accipiter erythronemius          -25.91           -54.36
2 Accipiter erythronemius          -25.86           -54.52
3 Accipiter erythronemius          -25.86           -54.52
4 Accipiter erythronemius          -27.35           -65.60
5 Accipiter erythronemius          -27.35           -65.60
6 Accipiter erythronemius          -27.35           -65.60
```


***************

## Style

We first need to convert column names to be *latitude* and *longitude*


```r
names(dat)[names(dat) %in% c("decimalLatitude", "decimalLongitude")] <- c("latitude",
    "longitude")
```


Then use a new function `stylegeojson` to simply add new columns to the data.frame. With `stylegeojson` you can add marker colors, symbols, and size. Note that this only works for point/marker maps (not polygon/line) for now. You could also simply edit the geojson file, but that can get very tedious with large files. You can specify color, symbol type, and symbol size all for the same variable, or each of those for different variables - where the ordering of the vector of colors, symbol types and sizes follows the ordering of the unique variable levels. Here we specify a separate color and size for each of the three species within the *taxonName* variable.


```r
dat <- stylegeojson(input = dat, var = "taxonName", color = c("#976AAE", "#6B944D",
    "#BD5945"), size = "small")
head(dat)
```



```
                taxonName latitude longitude marker-color marker-size
1 Accipiter erythronemius   -25.91    -54.36      #976AAE       small
2 Accipiter erythronemius   -25.86    -54.52      #976AAE       small
3 Accipiter erythronemius   -25.86    -54.52      #976AAE       small
4 Accipiter erythronemius   -27.35    -65.60      #976AAE       small
5 Accipiter erythronemius   -27.35    -65.60      #976AAE       small
6 Accipiter erythronemius   -27.35    -65.60      #976AAE       small
```


Here, specify one color for all three species, and make them all size medium.


```r
dat <- stylegeojson(input = dat, var = "taxonName", color = "#6B944D", size = "medium")
```


Then write the data.frame to disk, and convert to a *geojson* file using the function `togeojson`.


```r
write.csv(dat, "~/github/sac/mygeojson/rgbif_data.csv")
file <- "~/github/sac/mygeojson/rgbif_data.csv"
togeojson(file, method = "web", destpath = "~/github/sac/mygeojson/", outfilename = "rgbif_data")
```


***************

## Git 'er done

All we need to do now is go to the command line or your git GUI client and push the changes to Github. If you need help with that see Step 3 in the [previous geojson post][ropost].

Go <a href="https://render.github.com/view/geojson?url=https://raw.github.com/sckott/mygeojson/master/rgbif_data.geojson" target="_blank">here</a> to see the map.

That's it. have a look at your map, have fun, and let us know if you have any feature requests or bug reports at our Github issues tracker for rgbif [here][rgbifissues].


[ropost]: http://ropensci.org/blog/2013/07/04/rbison-geoson/
[scottpost]: http://sckott.github.io/2013/06/geojson/
[rgbif]: https://github.com/ropensci/rgbif
[rgbifissues]: https://github.com/ropensci/rgbif/issues
[rbison]: https://github.com/ropensci/rbison
[gbif]: http://www.gbif.org/
