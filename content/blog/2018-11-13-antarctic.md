---
slug: antarctic
title: The Antarctic/Southern Ocean rOpenSci community
author:
  - Ben Raymond
  - Michael Sumner
preface: Ben Raymond and Michael Sumner wrote this post on behalf of the Antarctic/Southern
  Ocean rOpenSci community.
date: '2018-11-13'
topicid: 1451
twitterImg: img/blog-images/2018-11-13-antarctic/plotanim-1.gif
tags:
  - R
  - community
  - Antarctic
  - Southern Ocean
  - SCAR
  - software
  - packages
  - geospatial
  - maps
  - climate data
---

### Antarctic/Southern Ocean science and rOpenSci

Collaboration and reproducibility are [fundamental to Antarctic and Southern Ocean science](https://doi.org/10.1038/d41586-018-05369-6), and the value of data to Antarctic science has long been promoted. The [Antarctic Treaty](https://www.ats.aq/e/ats.htm) (which came into force in 1961) included the provision that scientific observations and results from Antarctica should be openly shared. The high cost and difficulty of acquisition means that data tend to be re-used for different studies once collected. Further, there are many common data requirement themes (e.g. sea ice information is useful to a wide range of activities, from voyage planning through to ecosystem modelling). Support for Antarctic data management is well established. The SCAR-COMNAP Joint Committee on Antarctic Data Management was established in 1997 and remains active [as a SCAR Standing Commitee](https://www.scar.org/data-products/scadm/) today.

Software development to support Antarctic data usage is growing, but still lags behind the available data, and some common tasks are still more difficult than we would like. Starting in late 2017, the [Scientific Committee on Antarctic Research](https://www.scar.org/) has been collaborating with rOpenSci to strengthen the Antarctic and Southern Ocean R/science communities. Our focus is on data and tasks that are common or even unique to Antarctic and Southern Ocean science, including supporting the development of R packages to meet Antarctic science needs, guides for R users and developers, active fora for open discussions, and strengthening connections with the broader science world.

### First steps in building the community

Our initial efforts have focused on two things:

1.  compiling a list of existing resources likely to be useful to the community: see the [task view](https://github.com/SCAR/ropensci/tree/master/task_view). This document outlines some relevant packages, including some that are under active development.
2.  improving core functionality centred around three key tasks that many researchers find problematic:
    -   getting hold of data. The physical environment is important to a large cross-section of Antarctic science, and environmental data often come from satellite, model, or similar sources,
    -   processing those data to suit particular study interests, such as subsetting or merging with field or other data,
    -   producing maps for exploratory analyses or publications.

A [couple](https://github.com/ropensci/antanym) of [packages](https://github.com/ropensci/bowerbird) have been formally peer-reviewed and onboarded into rOpenSci, with others in development. Example usage of a few of these packages is demonstrated below.

### Get involved

Please get involved!

-   contribute your Antarctic R knowledge, your Antarctic [use case](https://discuss.ropensci.org/c/usecases) for a package, or ask a question in the dedicated [Antarctic and Southern Ocean](https://discuss.ropensci.org/c/antarctic) category of rOpenSci's discussion forum,

-   make [a suggestion](https://discuss.ropensci.org/c/antarctic) — perhaps for Antarctic-related functionality that you feel is missing from the current R ecosystem?

-   contribute an Antarctic R package, or improve the documentation or code of an existing one. See the [task view](https://github.com/SCAR/ropensci/tree/master/task_view) as a starting point,

-   join the \#antarctic rOpenSci Slack channel for R users and developers — contact us at <antarctic@ropensci.org> for an invitation to join. Slack is a great space in which to have conversations with the rOpenSci community, or to give us feedback in a less-public manner,

-   participate in the [broader rOpenSci community](/community/). Follow on [Twitter](https://twitter.com/rOpenSci), read the [blog](/blog/), and check out the [ecosystem of R packages](/packages/).

The administrative contacts for this initiative are Ben Raymond, Sara Labrousse, Michael Sumner, and Jess Melbourne-Thomas. Contact us via <antarctic@ropensci.org>, or find us on Slack or Twitter.

------------------------------------------------------------------------

### Demo

A lightning trip through the land of `bowerbird`, `raadtools`, `SOmap`, and `antanym`. First install some packages, if needed.

``` r
## make sure we have the packages we need
req <- setdiff(c("dplyr", "ggplot2", "remotes"), installed.packages()[, 1])
if (length(req) > 0) install.packages(req)

## and some github packages
req <- c("ropensci/antanym", "AustralianAntarcticDivision/blueant",
         "AustralianAntarcticDivision/raadtools",
         "AustralianAntarcticDivision/SOmap")
req <- req[!basename(req) %in% installed.packages()[, 1]]
if (length(req) > 0) remotes::install_github(req)
```

Let's say that we have some points of interest in the Southern Ocean — perhaps a ship track, or some stations where we took marine samples, or as we'll use here, the [track of an elephant seal](http://www.meop.net/) as it moves from the Kerguelen Islands to Antarctica and back again (Data from IMOS 2018[^1], provided as part of the `SOmap` package).

``` r
library(dplyr)
library(ggplot2)

data("SOmap_data", package = "SOmap")
ele <- SOmap_data$mirounga_leonina %>% dplyr::filter(id == "ct96-05-13")
with(ele, plot(lon, lat))
```

{{< figure src="/img/blog-images/2018-11-13-antarctic/get_track_data-1.png" >}}

#### Fetching our environmental data

Very commonly, we want to know about the environmental conditions at our points of interest. For the remote and vast Southern Ocean these data typically come from satellite or model sources. Some data centres provide extraction tools that will pull out a subset of data to suit your requirements, but often it makes more sense to cache entire data collections locally first and then work with them from there.

[bowerbird](https://github.com/AustralianAntarcticDivision/bowerbird) provides a framework for downloading data files to a local collection, and keeping it up to date. The companion [blueant](https://github.com/AustralianAntarcticDivision/blueant) package provides a suite of definitions for Southern Ocean and Antarctic data sources that can be used with `bowerbird`. It encompasses data such as sea ice, bathymetry and land topography, oceanography, and atmospheric reanalysis and weather predictions, from providers such as NASA, NOAA, Copernicus, NSIDC, and Ifremer.

Why might you want to maintain local copies of entire data sets, instead of just fetching subsets of data from providers as needed?

-   many analyses make use of data from a variety of providers (in which case there may not be dynamic extraction tools for all of them),
-   analyses might need to crunch through a whole collection of data in order to calculate appropriate statistics (temperature anomalies with respect to a long-term mean, for example),
-   different parts of the same data set are used in different analyses, in which case making one copy of the whole thing may be easier to manage than having different subsets for different projects,
-   a common suite of data are routinely used by a local research community, in which case it makes more sense to keep a local copy for everyone to use, rather than multiple copies being downloaded by different individuals.

In these cases, maintaining local copies of a range of data from third-party providers can be extremely beneficial, especially if that collection is hosted with a fast connection to local compute resources (virtual machines or high-performance computational facilities).

Install the package if needed:

``` r
library(remotes)
install_github("AustralianAntarcticDivision/blueant")
```

To use `blueant`, we first choose a location to store our data. Normally this would be a persistent location (perhaps on shared storage if multiple users are to have access to it), but for the purposes of demonstration we'll just use a temporary directory here:

``` r
my_data_dir <- tempdir()
```

We'll focus on two sources of environmental data: sea ice and water depth. Note that water depth does not change with time but sea ice is highly dynamic, so we will want to know what the ice conditions are like on a day-to-day basis.

Download daily sea ice data (from 2013 only), and the ETOPO2 bathymetric data set. ETOPO2 is somewhat dated and low resolution compared to more recent data, but will do as a small dataset for demo purposes:

``` r
library(blueant)
src <- bind_rows(
    sources("NSIDC SMMR-SSM/I Nasateam sea ice concentration", hemisphere = "south",
            time_resolutions = "day", years = 2013),
    sources("ETOPO2 bathymetry"))
result <- bb_get(src, local_file_root = my_data_dir, clobber = 0, verbose = TRUE,
                 confirm = NULL)
```

    ##  
    ## Sat Nov 10 01:00:48 2018 
    ## Synchronizing dataset: NSIDC SMMR-SSM/I Nasateam sea ice concentration 
    ##  
    ##  [... output truncated]

Now we have local copies of those data files. The sync can be run daily so that the local collection is always up to date - it will only download new files, or files that have changed since the last download. For more information on `bowerbird`, see the [package vignette](https://ropensci.github.io/bowerbird/articles/bowerbird.html).

Details of the files can be found in the `result` object, and those files could now be read with packages such as `raster`. However, we are collecting data from a range of sources, and so they will be different in terms of their grids, resolutions, projections, and variable-naming conventions, which tends to complicate these operations. In the next section we'll look at the `raadtools` package, which provides a set of tools for doing common operations on these types of data.

#### Using those environmental data: raadtools

[`raadtools`](https://github.com/AustralianAntarcticDivision/raadtools) is suite of functions that provide consistent access to a range of environmental and similar data, and tools for working with them. It is designed to work data collections maintained by the `bowerbird`/`blueant` packages.

Load the package and tell it where our data collection has been stored:

``` r
library(raadtools)
set_data_roots(my_data_dir)
```

Define our spatial region of interest and extract the bathymetry data from this region, using the ETOPO2 files we just downloaded:

``` r
roi <- round(c(range(ele$lon), range(ele$lat)) + c(-2, 2, -2, 2))
bx <- readtopo("etopo2", xylim = roi)
```

And now we can make a simple plot of our our track superimposed on the bathymetry:

``` r
plot(bx)
lines(ele$lon, ele$lat)
```

{{< figure src="/img/blog-images/2018-11-13-antarctic/plotbathy-1.png" >}}

We can also extract the depth values along our track using the `extract()` function in `raadtools`:

``` r
ele$depth <- extract(readtopo, ele[, c("lon", "lat")], topo = "etopo2")
```

Plot the histogram of depth values, showing that most of the track points are located in relatively shallow waters:

``` r
ggplot(ele, aes(depth)) + geom_histogram(bins = 100) + theme_bw()
```

{{< figure src="/img/blog-images/2018-11-13-antarctic/histbathy-1.png" >}}

This type of extraction will also work with time-varying data — for example, we can extract the sea-ice conditions along our track, based on each track point's location and time:

``` r
ele$ice <- extract(readice, ele[, c("lon", "lat", "date")])
## points outside the ice grid will have missing ice values, so fill them with zeros
ele$ice[is.na(ele$ice)] <- 0
ggplot(ele, aes(date, ice, colour = lat)) + geom_path() + theme_bw()
```

{{< figure src="/img/blog-images/2018-11-13-antarctic/temp2-1.png" >}}

Or a fancy animated plot, using `gganimate` (code not shown for brevity, but you can find it in the [page source](https://raw.githubusercontent.com/ropensci/roweb2/master/content/blog/2018-11-13-antarctic.md)). The hypnotic blue line shows the edge of the sea ice as it grows over the winter season, and the orange is our elephant seal:

{{< figure src="/img/blog-images/2018-11-13-antarctic/plotanim-1.gif" >}}

<!--
## code for animation, not shown in rendered markdown

  library(SOmap)
  library(gganimate) ## remotes::install_github("thomasp85/gganimate")
  require(transformr) ## remotes::install_github("thomasp85/transformr")
  require(sf)
  require(rgdal)
  require(rgeos)
  
  ## use a rotated polar projection
  polar_proj_rot <- "+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=90 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +ellps=WGS84 +towgs84=0,0,0"
  ele[c("x", "y")] <- rgdal::project(as.matrix(ele[c("lon", "lat")]), polar_proj_rot)
  
  ## get sea ice data, one raster per day
  ice_raster <- readice(sort(unique(as.Date(ele$date))))
  
  ## rotate sea ice rasters
  tm <- getZ(ice_raster)
  ice_raster <- projectRaster(ice_raster, raster(extent(extent(ice_raster)[c(3, 4, 1, 2)]), nrows = ncol(ice_raster), ncols = nrow(ice_raster), crs = polar_proj_rot))
  ice_raster <- setZ(ice_raster, tm)
  
  ## convert each sea ice raster to lines representing the edges of the ice
  ## 15% is the standard "ice edge" threshold
  contour_raster_sf <- function(x, level = 15, date = as.POSIXct(NA, tz = "UTC")) {
    raster::rasterToContour(x, level = level, maxpixels = prod(dim(x[[1]]))) %>%
      sf::st_as_sf() %>% dplyr::mutate(date = date)
  }
  ice_edge <- vector("list", nlayers(ice_raster))
  for (i in seq_along(ice_edge)) {
    ice_edge[[i]] <- contour_raster_sf(ice_raster[[i]], date = getZ(ice_raster)[i])
  }
  ice_edge <- sf::st_cast(do.call(rbind, ice_edge), "MULTILINESTRING")
  
  ## use elevation data from ETOPO2 to show the land masses
  ## read it and reproject from long-lat to our polar projection
  cx <- projectRaster(readtopo("etopo2", xylim = c(-180, 180, -90, -40)),
                      raster(extent(c(-4e6, 4e6, -5e6, 5e6)), nrows = 400, ncols = 400, crs = polar_proj_rot))
  cx <- as.data.frame(cx, xy = TRUE)
  cx$z[cx$z <= 0] <- NA_real_
  
  ## create a lagged version of the track that we can use to show a trailing "worm"
  tail_length <- 8
  ele_lagged <- ele %>% mutate(lag_n = 0)
  for (li in seq_len(tail_length)) ele_lagged <- rbind(ele_lagged, ele %>% mutate(date = lead(date, li), lag_n = -li))
  ele_lagged <- ele_lagged %>% dplyr::filter(!is.na(date))
  
  g <- ggplot() + geom_raster(data = cx, aes(x, y, fill = z)) +
      scale_fill_distiller(palette = "Greys", guide = FALSE, na.value = "#FFFFFF00") +
      geom_sf(data = ice_edge, colour = "blue") +
      geom_path(data = ele_lagged, aes(x, y, alpha = lag_n), colour = "orange", size = 1) +
      scale_alpha_continuous(guide = FALSE) +
      geom_path(data = ele, aes(x, y), colour = "orange", size = 2) +
      theme_void() + xlim(c(-4e6, 4e6)) + ylim(c(-4.75e6, 4.75e6)) +
      transition_time(date)
  animate(g)

## end hidden code for animation
-->

#### Mapping

Creating maps is another very common requirement, and in the Southern Ocean this brings a few challenges (e.g. dealing with the dateline when using polar-stereographic or similar circumpolar projections). There are also spatial features that many users want to show (coastlines, oceanic fronts, extent of sea ice, place names, etc). The in-development [`SOmap`](https://github.com/AustralianAntarcticDivision/SOmap) package aims to help with this.

``` r
library(SOmap)
SOauto_map(ele$lon, ele$lat, mask = FALSE)
```

{{< figure src="/img/blog-images/2018-11-13-antarctic/somap1-1.png" >}}

Or a full-hemisphere map:

``` r
## first transform our track to polar-stereographic coordinates
library(sp)
library(raster)
ele_sp <- ele
coordinates(ele_sp) <- c("lon", "lat")
projection(ele_sp) <- "+proj=longlat +ellps=WGS84"
ele_sp <- spTransform(ele_sp,
            CRS("+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0 
            +datum=WGS84 +units=m +no_defs +ellps=WGS84 +towgs84=0,0,0"))

## plot the base map with ocean fronts shown
SOmap(fronts = TRUE)
## add current marine protected areas
SOmanagement(MPA = TRUE, mpacol = "darkblue")
## add our track
plot(ele_sp, col = "darkgreen", add = TRUE)
```

{{< figure src="/img/blog-images/2018-11-13-antarctic/somap2-1.png" >}}

#### Place names

SCAR maintains a gazetteer of place names in the Antarctic and surrounding Southern Ocean[^2], which is available to R users via the [`antanym` package](https://docs.ropensci.org/antanym/):

``` r
library(antanym)
```

    ## The Composite Gazetteer of Antarctica is made available under a CC-BY license.
    ## If you use it, please cite it:
    ## Composite Gazetteer of Antarctica, Scientific Committee on Antarctic Research.
    ##   GCMD Metadata (https://data.aad.gov.au/aadc/gaz/scar/)

``` r
xn <- an_read(cache = "session", sp = TRUE)
```

There is no single naming authority for place names in Antarctica, and so there can be multiple names for a single feature (where it has been given a name by more than one country). We can trim our names list down to one name per feature (here, preferentially choosing the UK name if there is one):

``` r
xn <- an_preferred(xn, origin = "United Kingdom")
```

How many place names do we have?

``` r
nrow(xn)
```

    ## [1] 19742

OK, we can't show all of these — which ones would be best to show on this map? Let's ask antanym for suggestions:

``` r
xns <- an_suggest(xn, map_scale = 20e6, map_extent = c(-180, 180, -90, -40))

## transform to our map projection and take the first 10 names
xns <- as_tibble(spTransform(xns, projection(Bathy))) %>% head(10)

## add them to the map
SOmap()
plot(ele_sp, col = "darkgreen", add = TRUE)
with(xns, points(x = longitude, y= latitude, pch = 16))
with(xns, text(x = longitude, y= latitude, labels = place_name,
               pos = 2 + 2*(longitude > 0)))
```

{{< figure src="/img/blog-images/2018-11-13-antarctic/antanym2-1.png" >}}

### Next steps

There is plenty more that these and other R packages can do for Antarctic and Southern Ocean science. See the package READMEs and vignettes for more examples, keep an eye out for future developments ... and get involved!

### References

[^1]: IMOS (2018) AATAMS Facility - Satellite Relay Tagging Program - Delayed mode data, <https://catalogue-imos.aodn.org.au/geonetwork/srv/en/metadata.show?uuid=06b09398-d3d0-47dc-a54a-a745319fbece>

[^2]: Composite Gazetteer of Antarctica, Scientific Committee on Antarctic Research. GCMD Metadata (<https://data.aad.gov.au/aadc/gaz/scar/>)
