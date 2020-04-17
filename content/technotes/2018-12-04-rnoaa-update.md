---
slug: rnoaa-update
title: 'rnoaa: new data sources and NCDC units'
date: '2018-12-04'
author:
  - Scott Chamberlain
topicid: 1497
tags:
  - R
  - data
  - NOAA
  - rnoaa
  - climate
---



We've just released a new version of [rnoaa][] with A LOT of changes. Check out 
the [release notes](https://github.com/ropensci/rnoaa/releases/tag/v0.8.0) 
for a complete list of changes. 

We'll highlight a few things in this post:

- New data sources in the package
- NCDC units added to the output of `ncdc()`

Links:

* rnoaa source code: <https://github.com/ropensci/rnoaa>
* rnoaa on CRAN: <https://cran.rstudio.com/web/packages/rnoaa/>



## Installation

Install the lastest from CRAN


```r
install.packages("rnoaa")
```

Some binaries are not up yet on CRAN - you can also install from GitHub:


```r
remotes::install_github("ropensci/rnoaa@v0.8.0")
```

Load `rnoaa`


```r
library(rnoaa)
```



## New data sources

There are three new data sources in the package. There's more in the works. You 
can keep track of new data sources in the package via the `newdatasource`
label in the [issue tracker](https://github.com/ropensci/rnoaa/issues?q=is%3Aissue+is%3Aopen+label%3Anewdatasource). 

### Blended Sea Winds

[Blended Sea Winds][bsw] contains 

> globally gridded, high-resolution ocean surface vector winds and wind stresses on a 
> global 0.25° grid, and multiple time resolutions of six-hourly, daily, monthly, 
> and 11-year (1995-2005) climatological monthlies.

Data is available from July 9, 1987 to present. 

Check out the link above for more information on the data. 

In a brief example of getting the data in `rnoaa`, we get data for the date 
October 1st, 2017, and we get daily resolution. The data is provided in 
netcdf format.


```r
bsw(date = "2017-10-01", resolution = "daily")
#> File /Users/sckott/Library/Caches/R/noaa_bsw/uv/daily/uv20171001rt.nc (NC_FORMAT_CLASSIC):
#> 
#>      3 variables (excluding dimension variables):
#>         float u[lon,lat,zlev,time]   
#>             long_name: Sea Surface Wind: x-component
#>             units: m/s
#>             _FillValue: -9999
#>         float v[lon,lat,zlev,time]   
#>             long_name: Sea Surface Wind: y-component
#>             units: m/s
#>             _FillValue: -9999
#>         float w[lon,lat,zlev,time]   
#>             long_name: Sea Surface Wind: speed as scalar means
#>             units: m/s
#>             _FillValue: -9999
#> 
#>      4 dimensions:
#>         zlev  Size:1
#>             long_name: height above sea level
#>             units: meters
#>         time  Size:1
#>             long_name: Center Time of the Data
#>             units: hours since 1978-01-01 00:00:00
#>         lat  Size:719
#>             long_name: latitude
#>             units: degrees_north
#>             grids: uniform grids from -89.75 to 89.75 by 0.25
#>         lon  Size:1440
#>             long_name: longitude
#>             units: degrees_east
#>             grids: uniform grids from 0.00 to 359.75 by 0.25
#> 
#>     11 global attributes:
#>         Conventions: COARDS, CF-1.0, Unidata Dataset Discovery v1.0
#>         title: NOAA/NCDC Blended daily 0.25-degree Sea Surface Winds
#>         source: Multiple satellite observations: DMSP SSMI F08, F10, F11, F13,F14 F15; TMI; QuikSCAT; AMSR-E; Direction from NCEP Reanalysis-2
#>         summary: Gridded and blended sea surface vector winds from multiple satellites with direction from NCEP Reanalysis-2; Global ocean coverage with a 0.25-degree resolution; The whole datasets covers from July 1987 to present, daily resolution in this dataset; 6-hourly and monthly are also available in other directories; See http://www.ncdc.noaa.gov/oa/rsad/blendedseawinds.html and links within for details. Include (u,v) means and scalar mean speed w for comparison
#>         Keywords: sea winds, ocean winds, sea surface winds, air-sea interaction, air-sea flux, wind-driven circulation, Ekman pumping, Ekman transport, ocean upwelling, wind stress, windstress
#>         references: links at http://www.ncdc.noaa.gov/oa/rsad/blendedseawinds.html
#>         History: Simple spatiotemporally weighted Interpolation (SI), V.1.2. Version 1.2 uses updated satellite retrievals by Remote Sensing System, released in September 2006: SSMI V06, TMI V04, QSCAT V03a. AMSRE V05 was also updated using the new SSMI rain rate
#>         institution: NOAA NESDIS National Climatic Data Center
#>         Contact: Huai-Min.Zhang AT noaa.gov or satorder AT noaa.gov;         ph:1+828-271-4090
#>         Acknowledgment: The gridded data were generated from the multiple satellite observations of DOD, NOAA and NASA (and future others) and wind retrievals of the Remote Sensing Systems, Inc. (http://www.remss.com), using scientific methods such as objective analysis (OA). The OA is only truly objective when the needed statistics are completely known, which may not be always the case.
#>         Data_Calendar_Date: 2017-10-01
```



### Local Climatological Data

[Local Climatological Data][lcd] consists of

> hourly, daily, and monthly summaries for approximately 1,600 U.S. locations.

In some examples, we get data for a single station for two different years.
The data is returned in data.frame format


```r
lcd(station = "01338099999", year = "2017")
#> # A tibble: 8,677 x 36
#>    station date  source latitude longitude elevation name  report_type
#>      <int> <chr>  <int>    <dbl>     <dbl>     <dbl> <chr> <chr>      
#>  1  1.34e9 2017…      4     61.2      6.65        51 VANG… FM-12      
#>  2  1.34e9 2017…      4     61.2      6.65        51 VANG… FM-12      
#>  3  1.34e9 2017…      4     61.2      6.65        51 VANG… FM-12      
#>  4  1.34e9 2017…      4     61.2      6.65        51 VANG… FM-12      
#>  5  1.34e9 2017…      4     61.2      6.65        51 VANG… FM-12      
#>  6  1.34e9 2017…      4     61.2      6.65        51 VANG… FM-12      
#>  7  1.34e9 2017…      4     61.2      6.65        51 VANG… FM-12      
#>  8  1.34e9 2017…      4     61.2      6.65        51 VANG… FM-12      
#>  9  1.34e9 2017…      4     61.2      6.65        51 VANG… FM-12      
#> 10  1.34e9 2017…      4     61.2      6.65        51 VANG… FM-12      
#> # … with 8,667 more rows, and 28 more variables: call_sign <int>,
#> #   quality_control <chr>, wnd <chr>, cig <chr>, vis <chr>, tmp <chr>,
#> #   dew <chr>, slp <chr>, aa1 <chr>, aa2 <chr>, aj1 <chr>, ay1 <chr>,
#> #   ay2 <chr>, ga1 <chr>, ga2 <chr>, ga3 <chr>, ge1 <chr>, gf1 <chr>,
#> #   ia1 <chr>, ka1 <chr>, ka2 <chr>, ma1 <chr>, md1 <chr>, mw1 <chr>,
#> #   oc1 <chr>, od1 <chr>, rem <chr>, eqd <chr>
lcd(station = "01338099999", year = "2015")
#> # A tibble: 8,097 x 36
#>    station date  source latitude longitude elevation name  report_type
#>      <int> <chr>  <int>    <dbl>     <dbl>     <dbl> <chr> <chr>      
#>  1  1.34e9 2015…      4     61.2      6.65        51 VANG… FM-12      
#>  2  1.34e9 2015…      4     61.2      6.65        51 VANG… FM-12      
#>  3  1.34e9 2015…      4     61.2      6.65        51 VANG… FM-12      
#>  4  1.34e9 2015…      4     61.2      6.65        51 VANG… FM-12      
#>  5  1.34e9 2015…      4     61.2      6.65        51 VANG… FM-12      
#>  6  1.34e9 2015…      4     61.2      6.65        51 VANG… FM-12      
#>  7  1.34e9 2015…      4     61.2      6.65        51 VANG… FM-12      
#>  8  1.34e9 2015…      4     61.2      6.65        51 VANG… FM-12      
#>  9  1.34e9 2015…      4     61.2      6.65        51 VANG… FM-12      
#> 10  1.34e9 2015…      4     61.2      6.65        51 VANG… FM-12      
#> # … with 8,087 more rows, and 28 more variables: call_sign <int>,
#> #   quality_control <chr>, wnd <chr>, cig <chr>, vis <chr>, tmp <chr>,
#> #   dew <chr>, slp <chr>, aa1 <chr>, aa2 <chr>, aj1 <chr>, ay1 <chr>,
#> #   ay2 <chr>, ga1 <chr>, ga2 <chr>, ga3 <chr>, ge1 <chr>, gf1 <chr>,
#> #   ia1 <chr>, ka1 <chr>, ka2 <chr>, ma1 <chr>, md1 <chr>, mw1 <chr>,
#> #   oc1 <chr>, od1 <chr>, rem <chr>, eqd <chr>
```



### Storm Events Database

The [Storm Events Database][sed] contains records used to create the 
official [NOAA Storm Data publication](https://www.ncdc.noaa.gov/IPS/sd/sd.html).

Data contains:

* occurrence of storms, and other phenomena of sufficient intensity to cause loss of life, 
injuries, etc.
* rare, unusual weather phenomena that generate media attention, such as snow flurries in 
South Florida or the San Diego coastal area
* other significant meteorological events, such as record max. or min. temperatures or 
precipitation that occur in connection with another event

Data is available from January 1950 to August 2018.

There are two functions associated with this data: `se_files()` and `se_data()`.

`se_files()` gives a data.frame of the details of each storm file, and 
`se_data()` gets the data for a particular year and data type. 

In a brief example, here we get data for year of 1988 and type "fatalities"


```r
se_data(year = 1988, type = "fatalities")
#> # A tibble: 39 x 11
#>    fat_yearmonth fat_day fat_time fatality_id event_id fatality_type
#>            <int>   <int>    <int>       <int>    <int> <chr>        
#>  1        198801      19     1130     1006297 10121593 D            
#>  2        198801      19     1152     1006298 10121594 D            
#>  3        198801      19     1158     1006299 10121595 D            
#>  4        198803      29     1445     1006300 10044375 D            
#>  5        198803      28     1805     1006301 10105510 D            
#>  6        198803      17     1045     1006302 10139634 D            
#>  7        198804      16     1430     1006303 10076954 D            
#>  8        198804      19      230     1006304 10001120 D            
#>  9        198805       7     2139     1006305 10082037 D            
#> 10        198805       8     1500     1006306 10002626 D            
#> # … with 29 more rows, and 5 more variables: fatality_date <chr>,
#> #   fatality_age <lgl>, fatality_sex <lgl>, fatality_location <lgl>,
#> #   event_yearmonth <int>
```



## NCDC data gets units

The main function for getting NCDC data via their API - `ncdc()` - gains the `add_units` parameter 
(boolean) to toggle adding units to the output data.frame. 

The default is `add_units=FALSE` - meaning that by default the results from the function 
DO NOT CHANGE. 

However, if `add_units=TRUE` we match by dataset id and data type id and return units if 
we have them. The way we do this is by manually curating lists of metadata inside the package.
See any of the files in [the source code](https://github.com/ropensci/rnoaa/tree/master/R) 
that start with `units-`. 

Do be in touch if you see a problem with these units! 

Note that we haven't filled out all units for all datasets. If you'd like to help it would 
be much appreciated.

We should also note that `ncdc()` now returns tibbles in the data slot. This way if you 
get back a huge number of rows it won't print to console for a long time. You can revert 
the tibbles back to data.frames just by using `as.data.frame` or similar.



## Bug fixes!

There's a huge list of bug fixes (and fixes listed in Minor Improvements ) in this version, 
and many people to thank for reporting them: 

* [@andypicke](https://github.com/andypicke)
* [@ghaines3](https://github.com/ghaines3)
* [@joeroe](https://github.com/joeroe)
* [@johnharley](https://github.com/johnharley)
* [@jonmcalder](https://github.com/jonmcalder)
* [@mondorescue](https://github.com/mondorescue)
* [@OrionDarley](https://github.com/OrionDarley)
* [@potterzot](https://github.com/potterzot)
* [@jsta](https://github.com/jsta)
* [@asrivas3](https://github.com/asrivas3)
* [@kevin-ht-ho](https://github.com/kev-ho)



## Get in touch

Get in touch if you have any `rnoaa` questions in the 
[issue tracker](https://github.com/ropensci/rnoaa/issues) or the 
[rOpenSci discussion forum](https://discuss.ropensci.org/).


[rnoaa]: https://github.com/ropensci/rnoaa
[bsw]: https://www.ncdc.noaa.gov/data-access/marineocean-data/blended-global/blended-sea-winds
[lcd]: https://www.ncdc.noaa.gov/data-access/land-based-station-data/land-based-datasets/quality-controlled-local-climatological-data-qclcd
[sed]: https://www.ncdc.noaa.gov/stormevents/
