---
title: "Easily make an interactive map on the web from R"
package: spocc
gh: ropensci/spocc
---

R is great, but not so great for interactive stuff. Github recently
announced support for interactive maps based on geojson format data.
geojson is basically just JSON data with additional metadata for mapping
purposes. We have discussed this before on our blog when we talked about
[making geojson based
maps](/blog/2013/07/04/rbison-geoson/) and about
[styling geojson
maps](/blog/2013/07/17/style-geojson/).

Here is a brief demo of a simple, but awesome, use case in which you
have a set of species and you want an interactive map. This is an easy
way to get there using our package spocc which gets GBIF occurrence data
from R.

### Install spocc from CRAN

```r
install.packages("spocc")
```

### Load spocc

```r
library("spocc")
```

### Define a species list

```r
splist <- c('Danaus plexippus','Accipiter striatus','Pinus contorta')
```

### Search for occurrence data for each species using `occ`

And fix names so that there is only one unique name string per taxon.

```r
dat <- occ(splist, from='gbif', gbifopts=list(hasCoordinate=TRUE))
dat <- fixnames(dat, "query")
```

### Make a Github gist from R

Simply use the `mapgist` function to send the geojson file to Github
gists, and you've got an ineractive map on the interwebs.

```r
mapgist(dat, color=c('#976AAE','#6B944D','#BD5945'), size=c('small','medium','large'))
```

And the gist function call tells you where to go find your map on your
github account. Done, that was easy, no? And we can even embed the map
here, like this:

{{< gist sckott 6572814 >}}
