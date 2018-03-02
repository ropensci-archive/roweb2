---
slug: "weathercan"
title: Integrating data from weathercan
package_version: 0.2.5
authors:
  - name: Steffi LaZerte
    url: http://steffilazerte.ca
date: 2018-03-02
categories: blog
topicid: 000
tags:
  - r
  - community
  - software
  - review
  - package
  - data-access
  - weather
  - Canada
  - meteorology
  - tutorial
output:
  md_document:
    variant: markdown_github
    preserve_yaml: true
---

I love working with R and have been sharing the love with my friends and colleagues for almost seven years now. I'm one of those really annoying people whose response to most analysis-related questions is "You can do that in R! Five minutes, tops!" or "Three lines of code, I swear!" The problem was that I invariably spent an hour or more showing people how to get the data, load the data, clean the data, transform the data, and join the data, before we could even start the "five minute analysis". With the advent of [`tidyverse`](https://www.tidyverse.org) data manipulation has gotten much, much easier, but I still find that data manipulation is where most new users get stuck.

This is one of the reasons why, when I designed [`weathercan`](http://github.com/ropensci/weathercan), I tried as hard as possible to make it simple and straightforward. `weathercan` is an R package designed to make it easy to access historical weather data from [Environment and Climate Change Canada (ECCC)](http://climate.weather.gc.ca/historical_data/search_historic_data_e.html). It downloads, combines, cleans, and transforms the data from multiple stations and across long time frames. So when you access ECCC data, you get everything in one dataset. Nifty, eh?

However, there is a certain point at which the user has to take matters into their own hands. Although downloading data with `weathercan` is fairly straight forward, weather data often needs to be integrated into other data sets. Depending on the other data this can be a tricky step. You may want to combine `weathercan` data with other types of measurements (e.g., river water samples on a specific day), or summarize and join it with data on other scales (e.g. temporal or spatial).

Integrating `weathercan` data can be straightforward, but often it's a bit convoluted. That's why I'm going to walk you through some different ways of integrating weather data from `weathercan` with other data sets.

We'll also be using several other R packages to do this, so why don't we load them right now:

``` r
# Data manipulation and plotting
library(dplyr)
library(ggplot2)

# Checking data completeness
library(naniar)

# Access to data containing feeder visits by birds
library(feedr)

# Spatial analyses
library(sf)
library(mapview)
```

Well, I've told you it's easy to get data from `weathercan`, so let's start by doing so. For example, if you wanted to download weather data for all of Manitoba, Canada since the New Year, you have only three steps:

1.  Load the package:

    ``` r
    library(weathercan)
    ```

2.  Look at the built in `stations` data set to find the specific stations you're interested in (you can also use the `stations_search()` function). Here, we'll use the [`dplyr`](http://dplyr.tidyverse.org/) package (part of [`tidyverse`](https://www.tidyverse.org)) to `filter()` stations to only those in the province of Manitoba, at daily intervals, and which have an end date of at least 2018 (which likely means it's still operational). Note that we'll also be removing some columns (`prov`, `climate_id`, `WMO_id`, `TC_id`) just for clarity.

    ``` r
    mb <- filter(stations, 
                 prov == "MB",
                 interval == "day",
                 end >= 2018) %>%
      select(-prov, -climate_id, -WMO_id, -TC_id)
    mb
    ```

        ## # A tibble: 70 x 8
        ##    station_name         station_id   lat    lon  elev interval start   end
        ##    <chr>                <fct>      <dbl>  <dbl> <dbl> <chr>    <int> <int>
        ##  1 BALDUR               3463        49.3 - 99.3   450 day       1962  2018
        ##  2 BRANDON A            50821       49.9 -100.0   409 day       2012  2018
        ##  3 BRANDON RCS          49909       49.9 -100.0   409 day       2012  2018
        ##  4 CARBERRY CS          27741       49.9 - 99.4   384 day       1994  2018
        ##  5 CYPRESS RIVER RCS    48128       49.6 - 99.1   374 day       2009  2018
        ##  6 ELKHORN 2 EAST       3460        49.9 -101     498 day       1987  2018
        ##  7 PORTAGE ROMANCE      45987       50.0 - 98.3   262 day       2007  2018
        ##  8 PORTAGE LA PRAIRIE … 3519        50.0 - 98.3   259 day       1970  2018
        ##  9 PORTAGE SOUTHPORT    10884       49.9 - 98.3   273 day       1992  2018
        ## 10 ROBLIN               27119       51.2 -101     540 day       1996  2018
        ## # ... with 60 more rows

3.  Download all the data from the start of the year for these stations

    ``` r
    mb_weather_all <- weather_dl(station_ids = mb$station_id, 
                                 start = "2018-01-01", 
                                 interval = "day", quiet = TRUE)
    ```

A simple example
----------------

Where things get tricky are in the specific use cases. For example, what if you have multiple sites and multiple days for which you want a measure of temperature and precipitation?

We'll be using pipes (`%>%`) throughout our examples, so checkout the [chapter on Pipes in R for Data Science](http://r4ds.had.co.nz/pipes.html) if you need a refresher or introduction.

The first step is to figure out which weather stations you want to use. These will probably be the ones closest to your sites and which have the appropriate data.

Let's assume you have two sites and the following measurements made on specific dates:

``` r
stream <- tribble(~ site,     ~ lat,      ~ lon,       ~ date, ~ water_temp,
                     "A", 49.688211, -97.116088, "2018-01-12",          4.5,
                     "A", 49.688211, -97.116088, "2018-01-20",          4.7,
                     "A", 49.688211, -97.116088, "2018-01-21",          4.9,
                     "A", 49.688211, -97.116088, "2018-01-30",          5.0,
                     "A", 49.688211, -97.116088, "2018-02-17",          3.8,
                     "B", 49.267330, -97.327142, "2018-01-13",          2.1,
                     "B", 49.267330, -97.327142, "2018-01-22",          4.1,
                     "B", 49.267330, -97.327142, "2018-01-23",          3.7,
                     "B", 49.267330, -97.327142, "2018-01-31",          2.3,
                     "B", 49.267330, -97.327142, "2018-02-18",          4.1,
                     "B", 49.267330, -97.327142, "2018-02-20",          4.6) %>%
  mutate(date = as.Date(date))
stream
```

    ## # A tibble: 11 x 5
    ##    site    lat   lon date       water_temp
    ##    <chr> <dbl> <dbl> <date>          <dbl>
    ##  1 A      49.7 -97.1 2018-01-12       4.50
    ##  2 A      49.7 -97.1 2018-01-20       4.70
    ##  3 A      49.7 -97.1 2018-01-21       4.90
    ##  4 A      49.7 -97.1 2018-01-30       5.00
    ##  5 A      49.7 -97.1 2018-02-17       3.80
    ##  6 B      49.3 -97.3 2018-01-13       2.10
    ##  7 B      49.3 -97.3 2018-01-22       4.10
    ##  8 B      49.3 -97.3 2018-01-23       3.70
    ##  9 B      49.3 -97.3 2018-01-31       2.30
    ## 10 B      49.3 -97.3 2018-02-18       4.10
    ## 11 B      49.3 -97.3 2018-02-20       4.60

We can use the `stations_search()` function with the `coords` argument to find the closest ECCC climate station to these sites

First, site A:

``` r
siteA <- stations_search(coords = c(49.688211, -97.116088), 
                         interval = "day", dist = 25) %>%
  select(-prov, -climate_id, -WMO_id, -TC_id) %>%
  filter(end >= 2018)
siteA
```

    ## # A tibble: 3 x 9
    ##   station_name  station_id   lat   lon  elev interval start   end distance
    ##   <chr>         <fct>      <dbl> <dbl> <dbl> <chr>    <int> <int>    <dbl>
    ## 1 WINNIPEG CHA… 43185       49.8 -97.3   238 day       2004  2018     21.1
    ## 2 WINNIPEG THE… 28051       49.9 -97.1   230 day       1999  2018     22.5
    ## 3 KLEEFELD (MA… 50897       49.5 -96.9   246 day       2014  2018     24.4

Now, site B:

``` r
siteB <- 
  stations_search(coords = c(49.267330, -97.327142), 
                  interval = "day", dist = 35) %>%
  select(-prov, -climate_id, -WMO_id, -TC_id) %>%
  filter(end >= 2018)
siteB
```

    ## # A tibble: 2 x 9
    ##   station_name station_id   lat   lon  elev interval start   end distance
    ##   <chr>        <fct>      <dbl> <dbl> <dbl> <chr>    <int> <int>    <dbl>
    ## 1 EMERSON AUTO 48068       49.0 -97.2   242 day       2009  2018     30.4
    ## 2 GRETNA (AUT) 3605        49.0 -97.6   253 day       1885  2018     31.4

We have a selection of stations for each site that are all about the same distance away. Before we chose any we should make sure they have the data we're interested in.

Above, we already downloaded all the data for Manitoba in this date range (`mb_weather`), so we can `select()` the types of data we want and then `filter()` to the specific `station_id`s we're interested in. We can then use the `naniar` package to easily visualize any missing data from these stations:

``` r
# Limit ourselves to temperature and precipitation
mb_weather <- select(mb_weather_all,
                     station_id, lat, lon,
                     date, min_temp, mean_temp, max_temp,
                     total_precip, total_snow)
```

``` r
# Stations near site A (< 25 km)
mb_weather %>%
  filter(station_id %in% siteA$station_id) %>%
  gg_miss_var(show_pct = TRUE, facet = station_id) + 
  labs(title = "Site A: Stations < 25 km")
```

<center>
<img src = "/img/blog-images/2018-03-13-weathercan/naniarA-1.png" style = "width: 80%">
</center>
<p>
``` r
# Stations near site B (< 35 km)
mb_weather %>%
  filter(station_id %in% siteB$station_id) %>%
  gg_miss_var(show_pct = TRUE, facet = station_id) + 
  labs(title = "Site B: Stations < 35 km")
```

<center>
<img src = "/img/blog-images/2018-03-13-weathercan/naniarB-1.png" style = "width: 80%">
</center>
<p>
No station has much snow data, unles we're willing to lose all temperature data. For site A, it definitely looks like station id 28051 has the most complete data (temperature and precipitation, at least). Site B we can use either station.

**Note:** Factors other than distance may also play a role in deciding on a station, such as habitat type, elevation, etc. Depending on what you hope to achieve, you may want to consider these when choosing a station.

Now that we've decided on the appropriate stations, we need to merge `weathercan` data from these stations into our `stream` data.

We'll start by creating an index data frame. This will hold the information of which site corresponds to which station:

``` r
index <- tribble(~ station_id, ~ site,
                      "28051",    "A",
                      "48068",    "B")
index
```

    ## # A tibble: 2 x 2
    ##   station_id site 
    ##   <chr>      <chr>
    ## 1 28051      A    
    ## 2 48068      B

Now we can join our `stream` data to the index (by `site`) which adds the column `station_id` to our data frame.

``` r
stream <- left_join(stream, index, by = "site")
```

Now we add the `weathercan` data (by `station_id` AND `date` to match the weather from the correct station and on the correct day). Note that I specify the `suffix` argument. This is because both `weathercan` data and `stream` data have `lat` and `lon` columns. By specifying a suffix, these columns will be renamed with this suffix. That way I can remind myself of which one is which.

``` r
stream <- left_join(stream, mb_weather, by = c("station_id", "date"), 
                    suffix = c("_stream", "_station"))

glimpse(stream) # Alternative way of looking at data with many columns
```

    ## Observations: 11
    ## Variables: 13
    ## $ site         <chr> "A", "A", "A", "A", "A", "B", "B", "B", "B", "B",...
    ## $ lat_stream   <dbl> 49.68821, 49.68821, 49.68821, 49.68821, 49.68821,...
    ## $ lon_stream   <dbl> -97.11609, -97.11609, -97.11609, -97.11609, -97.1...
    ## $ date         <date> 2018-01-12, 2018-01-20, 2018-01-21, 2018-01-30, ...
    ## $ water_temp   <dbl> 4.5, 4.7, 4.9, 5.0, 3.8, 2.1, 4.1, 3.7, 2.3, 4.1,...
    ## $ station_id   <chr> "28051", "28051", "28051", "28051", "28051", "480...
    ## $ lat_station  <dbl> 49.89, 49.89, 49.89, 49.89, 49.89, 49.00, 49.00, ...
    ## $ lon_station  <dbl> -97.13, -97.13, -97.13, -97.13, -97.13, -97.24, -...
    ## $ min_temp     <dbl> -26.2, -7.8, -8.6, -21.7, -14.7, -29.8, -6.6, -7....
    ## $ mean_temp    <dbl> -22.9, -3.5, -7.6, -12.2, -11.7, -25.0, -5.2, -6....
    ## $ max_temp     <dbl> -19.5, 0.9, -6.6, -2.7, -8.6, -20.1, -3.8, -5.2, ...
    ## $ total_precip <dbl> 0.0, 0.0, 0.0, 2.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5,...
    ## $ total_snow   <dbl> NA, NA, NA, NA, NA, NA, NA, NA, NA, NA, NA

And there you have it! We have neatly combined `weathercan` data from the nearest, most complete stations, with our `stream` data. If you'd like to learn more about joining data, check out the [R for Data Science chapter on Relational Data](http://r4ds.had.co.nz/relational-data.html).

Linear interpolation
--------------------

Sometimes you have data at the same scale as the `weathercan` data, but inbetween the sampling points. An example of this is data documenting visits to bird feeders by birds outfitted with RFID tags (radio-frequency identification). When a bird with a tag sits on the perch of a feeder, their presence is recorded. We can access this data from [Thompson Rivers University](https://www.tru.ca/) using the [`feedr`](http://github.com/animalnexus/feedr) package:

``` r
f <- dl_data(start = "2017-01-06", end = "2017-01-10")
head(f)
```

    ##    animal_id       date                time logger_id            species
    ## 1 062000042E 2017-01-06 2017-01-06 11:12:49      1500 Mountain Chickadee
    ## 2 062000042E 2017-01-06 2017-01-06 11:14:09      1500 Mountain Chickadee
    ## 3 062000042E 2017-01-06 2017-01-06 11:14:57      1500 Mountain Chickadee
    ## 4 062000042E 2017-01-06 2017-01-06 11:16:44      1500 Mountain Chickadee
    ## 5 062000042E 2017-01-06 2017-01-06 11:18:35      1500 Mountain Chickadee
    ## 6 062000042E 2017-01-06 2017-01-06 11:18:38      1500 Mountain Chickadee
    ##   age sex    site_name       lon      lat
    ## 1 AHY   U Kamloops, BC -120.3658 50.67057
    ## 2 AHY   U Kamloops, BC -120.3658 50.67057
    ## 3 AHY   U Kamloops, BC -120.3658 50.67057
    ## 4 AHY   U Kamloops, BC -120.3658 50.67057
    ## 5 AHY   U Kamloops, BC -120.3658 50.67057
    ## 6 AHY   U Kamloops, BC -120.3658 50.67057

Each observation reflects a moment when the bird in question was detected by an RFID-enabled feeder. These observations are on the scale of seconds to minutes, but our temperature data is hourly.

We can use linear interpolation on our temperature data to line up temperature with these observations.

First let's find the nearest weather station for the same date range:

``` r
stations_search(coords = f[1, c("lat", "lon")], interval = "hour") %>%
  select(-prov, -climate_id, -WMO_id, -TC_id) %>%
  filter(end >= 2017)
```

    ## # A tibble: 2 x 9
    ##   station_name station_id   lat   lon  elev interval start   end distance
    ##   <chr>        <fct>      <dbl> <dbl> <dbl> <chr>    <int> <int>    <dbl>
    ## 1 KAMLOOPS AUT 42203       50.7  -120   345 hour      2006  2018     6.18
    ## 2 KAMLOOPS A   51423       50.7  -120   345 hour      2013  2018     6.79

Next, download the weather data:

``` r
kam <- weather_dl(station_ids = "42203", start = min(f$date), end = max(f$date)) %>%
  select(time, temp)
kam
```

    ## # A tibble: 120 x 2
    ##    time                 temp
    ##  * <dttm>              <dbl>
    ##  1 2017-01-06 00:00:00 -11.2
    ##  2 2017-01-06 01:00:00 -10.7
    ##  3 2017-01-06 02:00:00 -10.8
    ##  4 2017-01-06 03:00:00 -10.4
    ##  5 2017-01-06 04:00:00 -14.0
    ##  6 2017-01-06 05:00:00 -14.5
    ##  7 2017-01-06 06:00:00 -11.1
    ##  8 2017-01-06 07:00:00 -10.9
    ##  9 2017-01-06 08:00:00 -11.7
    ## 10 2017-01-06 09:00:00 -12.7
    ## # ... with 110 more rows

Finally, we use the `weather_interp` function from `weathercan` to perform a linear interpolation and add this temperature data to our feeder observations:

``` r
f_temp <- weather_interp(f, kam, cols = "temp")
glimpse(f_temp)
```

    ## Observations: 2,273
    ## Variables: 11
    ## $ animal_id <fct> 062000042E, 062000042E, 062000042E, 062000042E, 0620...
    ## $ date      <date> 2017-01-06, 2017-01-06, 2017-01-06, 2017-01-06, 201...
    ## $ time      <dttm> 2017-01-06 11:12:49, 2017-01-06 11:14:09, 2017-01-0...
    ## $ logger_id <fct> 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500...
    ## $ species   <chr> "Mountain Chickadee", "Mountain Chickadee", "Mountai...
    ## $ age       <chr> "AHY", "AHY", "AHY", "AHY", "AHY", "AHY", "AHY", "AH...
    ## $ sex       <chr> "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U...
    ## $ site_name <chr> "Kamloops, BC", "Kamloops, BC", "Kamloops, BC", "Kam...
    ## $ lon       <dbl> -120.3658, -120.3658, -120.3658, -120.3658, -120.365...
    ## $ lat       <dbl> 50.67057, 50.67057, 50.67057, 50.67057, 50.67057, 50...
    ## $ temp      <dbl> -9.793194, -9.782083, -9.775417, -9.760556, -9.74513...

To illustrate how this works, let's take a look at the temperature measures downloaded with `weathercan` (large black dots), vs. the interpolated values now stored with the feeder data (small red dots).

``` r
ggplot(data = f_temp[1:25,], aes(x = time, y = temp)) +
  theme_bw() + 
  theme(legend.position = c(0.2, 0.8)) +
  geom_point(data = kam[12:17,], aes(colour = "weathercan temperature"), size = 4) +
  geom_point(aes(colour = "Interpolated temperature"), size = 1) +
  scale_colour_manual(name = "", values = c("red", "black")) +
  labs(x = "Time", y = "Temperature (C)")
```

<center>
<img src = "/img/blog-images/2018-03-13-weathercan/interpolate-1.png" style = "width: 100%">
</center>
<p>
`weather_interp` simply draws a line between the two temperature points and figures out the corresponding intermediate temperature based on the linear function.

Different spatial scales
------------------------

The final example we'll go over concerns spatial data. While the `weathercan` data is spatial, it only reflects spatial *points*. You may wish to average over regions or plot these points on a map.

Using the [`sf`](http://r-spatial.github.io/sf/) and [`mapview`](https://r-spatial.github.io/mapview/) packages, we can look at average station temperature across different ecological regions in Manitoba on New Year's Day, 2018.

First, we'll need to download and unzip the ecological area shape file from the [Province of Manitoba website](http://mli2.gov.mb.ca/environment/shp_zip_files/env_ecological_areas_py_shp.zip).

``` r
download.file("http://mli2.gov.mb.ca/environment/shp_zip_files/env_ecological_areas_py_shp.zip",
              destfile = "ecological_shp.zip")
unzip("ecological_shp.zip")
```

Then read and filter the map to include only the region of Manitoba (no spill over).

``` r
eco <- st_read("env_ecological_areas.shp") %>%
  filter(MANITOBA == "yes")
```

    ## Reading layer `env_ecological_areas' from data source `/home/steffi/Projects/roweb2/content/blog/env_ecological_areas.shp' using driver `ESRI Shapefile'
    ## Simple feature collection with 279 features and 15 fields
    ## geometry type:  POLYGON
    ## dimension:      XY
    ## bbox:           xmin: -621621.3 ymin: 5386414 xmax: 1868189 ymax: 7166472
    ## epsg (SRID):    26914
    ## proj4string:    +proj=utm +zone=14 +datum=NAD83 +units=m +no_defs

``` r
glimpse(eco)
```

    ## Observations: 98
    ## Variables: 16
    ## $ AREA       <dbl> 1454575590, 8687411627, 14749537700, 16672201610, 3...
    ## $ PERIMETER  <dbl> 406438.58, 537012.99, 763431.49, 723134.80, 310948....
    ## $ E104_MB_   <int> 23, 24, 25, 26, 27, 28, 34, 35, 38, 39, 46, 47, 48,...
    ## $ E104_MB_ID <int> 22, 23, 24, 25, 26, 27, 33, 34, 37, 38, 45, 46, 47,...
    ## $ ECODISTRIC <int> 183, 270, 276, 272, 271, 279, 1020, 1021, 280, 281,...
    ## $ ECOREGION  <int> 45, 70, 71, 70, 70, 71, 215, 215, 71, 71, 88, 88, 7...
    ## $ REGION_NAM <fct> Maguse River Upland, Kazan River Upland, Selwyn Lak...
    ## $ REGION_NOM <fct> Hautes terres de la rivière Maguse, Hautes terres d...
    ## $ ECOPROVINC <fct> 3.2, 5.1, 5.1, 5.1, 5.1, 5.1, 15.1, 15.1, 5.1, 5.1,...
    ## $ PROV_NAME  <fct> Keewatin Lowlands, Western Taiga Shield, Western Ta...
    ## $ PROV_NOM   <fct> Basses Terres du Keewatin, Bouclier Taïga Occidenta...
    ## $ ECOZONE    <int> 3, 5, 5, 5, 5, 5, 15, 15, 5, 5, 6, 6, 5, 15, 5, 6, ...
    ## $ ZONE_NAME  <fct> Southern Arctic, Taiga Shield, Taiga Shield, Taiga ...
    ## $ ZONE_NOM   <fct> Bas-Arctique, Taïga du Bouclier, Taïga du Bouclier,...
    ## $ MANITOBA   <fct> yes, yes, yes, yes, yes, yes, yes, yes, yes, yes, y...
    ## $ geometry   <simple_feature> POLYGON ((736400 6616325, 7..., POLYGON ...

Next, we'll want to make our `weathercan` data compatible with the ecological data.

-   First filter to only include Jan 1st 2018
-   Convert to spatial data using the lat/lon for each station
-   Finally convert to the same CRS as the ecological data

``` r
mb_spatial <- mb_weather %>%
  filter(date == as.Date("2018-01-01")) %>%
  st_as_sf(coords = c("lon", "lat"), crs = "+proj=longlat") %>%
  st_transform(crs = st_crs(eco))
```

Now we're ready to join the spatial `weathercan` data with the ecological areas. We'll then group the data by all the relevant columns in the `eco` data we want to summarize over. Then we'll calculate the mean temperature across all stations in each region.

``` r
MB <- eco %>%
  st_join(., mb_spatial) %>%
  group_by(ECODISTRIC, ECOREGION, AREA, 
           REGION_NAM, REGION_NOM, PROV_NAME, PROV_NOM, 
           ECOZONE, ZONE_NAME) %>%
  summarize(n_stations = length(unique(station_id)),
            mean_temp = mean(mean_temp, na.rm = TRUE)) %>%
  ungroup()
```

Finally, we can plot this as a map using `mapview`. In this manner all the data associated with each ecological region has been preserved. The image in this article is static, but if you run this yourself you'll get an interactive map and you can click on any of the regions below to get more information. Note also that the number of stations (`n_stations`) is also available.

``` r
mapview(MB, zcol = "mean_temp", legend = TRUE)
```

![](../../themes/ropensci/static/img/blog-images/2018-03-13-weathercan/mapview-1.png)

<center>
<img src = "/img/blog-images/2018-03-13-weathercan/mapview-1.png" style = "width:80%">
</center>
<p>
Surprisingly Churchill, MB (the north-eastern, green area) was almost balmy compared to south-western Manitoba!

Combining data in general
-------------------------

I hope these examples will help guide you in the many ways in which you can integrate `weathercan` data into other data sets. There are many different types of data to integrate, but generally, the same principals apply to merging `weathercan` data as to merging all data:

-   Make sure your data is summarized to the appropriate level first (i.e. don't try to merge hourly data with yearly data)
-   Make sure you join data by the correct columns (i.e. include your index columns as well as the appropriate time/date column)
-   Often, you'll need to make an intermediate, `index`, data frame in which you link sites or observations to a `station_id`, this can then be used to link specific weather observations to your other measurements
-   For spatial data, make sure your two data sets have the same CRS, and consider the `st_join()` function from the [`sf` package](http://r-spatial.github.io/sf/) to join them
-   Make it easier on yourself by using [`tidyverse`](https://tidyverse.org), specifically the packages `dplyr` and `tidyr` ([R for Data Science](http://r4ds.had.co.nz) is a great reference)

### A note about reproducibility

I would also highly recommend documenting the process by which you join your data. This makes it easy for you to keep track of what you've done and makes your work reproducible.

You can easily document this process by keeping an R script with all the coding steps and then using the "Knit" button in RStudio (or use [`Rmarkdown`](https://rmarkdown.rstudio.com) directly). If you like a more polished document, consider using `roxygen` comments `#'` rather than regular R comments `#` directly in your R script. `roxygen` comments allow you to write your comments in Markdown which is then converted to regular or marked up text in the html/pdf file. Your .R script would look something like this:

    #' # Setup
    library(weathercan)
    library(dplyr)
    library(ggplot2)

    #' # Data
    w <- weather_dl(station_ids = "42203", start = "2018-01-01")

    #' # Figures
    #+ fig.width = 10, dpi = 200
    ggplot(data = w, aes(x = time, y = temp)) +
      geom_point() +
      geom_line()

Acknowledgements
----------------

Over the course of this `weathercan` journey I've had some valuable assistance. In particular, [Sam Albers](https://github.com/boshek) has been a wonderful contributor to `weathercan` on code as well as with advice and suggestions for how to take the package to the next level. rOpenSci Reviewers [Joe Thorley](https://github.com/joethorley) and [Charles T. Gray](https://github.com/softloud), and editor [Scott Chamberlain](https://github.com/sckott) supplied wonderful comments and suggestions that were greatly appreciated.
