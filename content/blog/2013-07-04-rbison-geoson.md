---
slug: rbison-geoson
title: From occurrence data to interactive maps on the web
date: '2013-07-04'
author:
  - Scott Chamberlain
tags:
  - R
  - rbison
  - API
  - geojson
---

We have a number of packages for getting species occurrence data: [rgbif][rgbif] and [rbison][rbison]. The power of R is that you can pull down this occurrence data, manipulate the data, do some analyses, and visualize the data - all in one open source framework.

However, when dealing with occurrence data on maps, it is often useful to be able to interact with the visualization. [Github][github], a code hosting and collaboration site, now renders a particular type of map file format as an interactive map. This file format is called `.geojson`. Here is an example of an interactive map hosted on Github, embedded here:

<br>

<script src="https://embed.github.com/view/geojson/geobabbler/geodata/master/geojson/leonardtown_bldgs.geojson"></script>

<br>

Note that you can go full screen on these maps too. Check it out [here](https://render.github.com/view/geojson?url=https://raw.github.com/geobabbler/geodata/master/geojson/leonardtown_bldgs.geojson).

To demonstrate how easy it can be to do this on your own, the following is a small demo of searching for occurrence data, converting to geojson, and pushing up to Github.

<br>

### Install rbison from Github

```r
# install_github('rbison', 'ropensci') # uncomment if you haven't
# installed it
library(rbison)
```


***************

### Step 1: Seach for some occurrence data

Search for data on the bison.


```r
dat <- bison(species = "Bison bison", count = 500)
```


Take a peak at the data just to make sure we have some occurrence data


```r
head(bison_data(dat, "data_df"))
```



```
         id        name longitude latitude
1 686467428 Bison bison    -118.8    43.31
2 656975776 Bison bison    -118.8    43.31
3 785794942 Bison bison    -111.1    44.66
4 687029742 Bison bison    -110.7    44.46
5 687027385 Bison bison    -110.7    44.61
6 773434631 Bison bison    -110.6    44.83
                                      provider
1  University of Kansas Biodiversity Institute
2 Natural History Museum of Los Angeles County
3               Museum of Southwestern Biology
4                              iNaturalist.org
5                              iNaturalist.org
6                              iNaturalist.org
```


***************

### Step 2: Convert the data to geojson format

Before this step I made a folder called *mygeojson* to write data in to, which will also be a Github repository.

In this example, we are using the option method='web' in the `togeojson` function, but we could also use method='local' which wouldl use the `rgdal` package to convert to a geojson file format locally. Specifying method='web' uses the [Ogre web client](https://ogre.adc4gis.com/).


```r
dat_df <- bison_data(dat, "data_df")
write.csv(dat_df, "~/github/sac/mygeojson/bison_bison.csv")
file <- "~/github/sac/mygeojson/bison_bison.csv"
togeojson(file, method = "web", destpath = "~/github/sac/mygeojson/", outfilename = "bison_bison")
```


***************

### Step 3: Go to your terminal or git GUI and push up the new geojson file

```bash
cd ~/github/sac/mygeojson/
git init
git add .
git commit -a -m 'my first geojson file'
git remote add origin https://github.com/sckott/mygeojson.git
git push origin master
```

<br>

Then go to your new repo on Github and click on the `.geojson` file you created, and you'll get a map. You can share this with others, and even embed the interactive map in other web sites, as you can see below. Try clicking on the points - they give metadata associated with each point.

<br>

<script src="https://embed.github.com/view/geojson/sckott/mygeojson/master/bison_bison.geojson"></script>

<br>

Check out the full screen version [here](https://render.github.com/view/geojson?url=https://raw.github.com/sckott/mygeojson/master/bison_bison.geojson).

***************

It is as easy as that! We'll add this functionality into our `rgbif` package as well.

Further reading:

+ https://blog.geomusings.com/2013/06/18/geojson-on-github-now-what/
+ I wrote earlier about this topic on my own blog [here](https://sckott.github.io/2013/06/geojson/).
+ Github help for geojson file https://help.github.com/articles/mapping-geojson-files-on-github#embedding-your-map-elsewhere

[rgbif]: https://github.com/ropensci/rgbif
[rbison]: https://github.com/ropensci/rbison
[github]: https://github.com/
