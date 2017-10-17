---
title: riem tutorial
package_version: 0.1.1
---



This package allows to get weather data from ASOS stations (airports) via the awesome website of the [Iowa Environment Mesonet](https://mesonet.agron.iastate.edu/request/download.phtml?network=IN__ASOS).


### Installation

Stable version from CRAN


```r
install.packages("riem")
```

Development version from GitHub


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropenscilabs/riem")
```


```r
library("riem")
library("dplyr")
```


## Usage

### Get available networks


```r
riem_networks() %>% head()
#> # A tibble: 6 x 2
#>       code                      name
#>      <chr>                     <chr>
#> 1 AE__ASOS United Arab Emirates ASOS
#> 2 AF__ASOS          Afghanistan ASOS
#> 3 AG__ASOS  Antigua and Barbuda ASOS
#> 4 AI__ASOS             Anguilla ASOS
#> 5  AK_ASOS               Alaska ASOS
#> 6  AL_ASOS              Alabama ASOS
```

### Get available stations for one network


```r
riem_stations(network = "IN__ASOS") %>% head()
#> # A tibble: 6 x 4
#>      id             name      lon      lat
#>   <chr>            <chr>    <dbl>    <dbl>
#> 1  VEAT AGARTALA         91.24045 23.88698
#> 2  VIAG AGRA (IN-AFB)    77.96089 27.15583
#> 3  VAAH AHMADABAD        72.63465 23.07724
#> 4  VAAK AKOLA AIRPORT    77.05863 20.69901
#> 5  VIAH ALIGARH          78.06667 27.88333
#> 6  VIAL ALLAHABAD (IN-AF 81.73387 25.44006
```


### Get measures for one station

Possible variables are, according the [IEM website](https://mesonet.agron.iastate.edu/request/download.phtml?network=IN__ASOS) and the [ASOS user guide](http://www.nws.noaa.gov/asos/pdfs/aum-toc.pdf),

* station: three or four character site identifier

* valid: timestamp of the observation (UTC)

* tmpf: Air Temperature in Fahrenheit, typically @ 2 meters

* dwpf: Dew Point Temperature in Fahrenheit, typically @ 2 meters

* relh: Relative Humidity in \%

* drct: Wind Direction in degrees from north

* sknt: Wind Speed in knots

* p01i: One hour precipitation for the period from the observation time to the time of the previous hourly precipitation reset. This varies slightly by site. Values are in inches. This value may or may not contain frozen precipitation melted by some device on the sensor or estimated by some other means. Unfortunately, we do not know of an authoritative database denoting which station has which sensor.

* alti: Pressure altimeter in inches

* mslp: Sea Level Pressure in millibar

* vsby: Visibility in miles

* gust: Wind Gust in knots

* skyc1: Sky Level 1 Coverage

* skyc2: Sky Level 2 Coverage

* skyc3: Sky Level 3 Coverage

* skyc4: Sky Level 4 Coverage

* skyl1: Sky Level 1 Altitude in feet

* skyl2: Sky Level 2 Altitude in feet

* skyl3: Sky Level 3 Altitude in feet

* skyl4: Sky Level 4 Altitude in feet

* presentwx: Present Weather Codes (space seperated), see e.g. [this manual](http://www.ofcm.gov/fmh-1/pdf/H-CH8.pdf) for further explanations.

* metar: unprocessed reported observation in METAR format


```r
riem_measures(station = "VOHY", date_start = "2000-01-01", date_end = "2016-04-22") %>% head()
#> # A tibble: 6 x 24
#>   station               valid     lon     lat  tmpf  dwpf  relh  drct
#>     <chr>              <dttm>   <dbl>   <dbl> <dbl> <dbl> <dbl> <dbl>
#> 1    VOHY 2011-07-02 05:10:00 78.4676 17.4531  78.8  68.0 69.52   220
#> 2    VOHY 2011-07-02 05:40:00 78.4676 17.4531  78.8  68.0 69.52   210
#> 3    VOHY 2011-07-02 06:10:00 78.4676 17.4531  82.4  68.0 61.81   200
#> 4    VOHY 2011-07-02 06:40:00 78.4676 17.4531  82.4  66.2 58.08   200
#> 5    VOHY 2011-07-02 07:40:00 78.4676 17.4531  84.2  64.4 51.47   280
#> 6    VOHY 2011-07-02 08:10:00 78.4676 17.4531  84.2  64.4 51.47   280
#> # ... with 16 more variables: sknt <dbl>, p01i <dbl>, alti <dbl>,
#> #   mslp <lgl>, vsby <dbl>, gust <dbl>, skyc1 <chr>, skyc2 <chr>,
#> #   skyc3 <chr>, skyc4 <chr>, skyl1 <dbl>, skyl2 <dbl>, skyl3 <dbl>,
#> #   skyl4 <dbl>, presentwx <chr>, metar <chr>
```


For conversion of wind speed or temperature into other units, see [weathermetrics](https://github.com/geanders/weathermetrics/).



### Citing

> Maëlle Salmon (2016). riem: Accesses Weather Data from the Iowa
  Environment Mesonet. R package version 0.1.1.
  https://CRAN.R-project.org/package=riem



### License and bugs

* License: [GPL-2](https://opensource.org/licenses/GPL-2.0)
* Report bugs at [our GitHub repo for riem](https://github.com/ropenscilabs/riem/issues?state=open)


[Back to top](#top)
