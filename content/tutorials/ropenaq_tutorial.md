---
title: ropenaq tutorial
package_version: 0.1.1
---



This R package is aimed at accessing the openaq API. OpenAQ is a community of scientists, software developers, and lovers of open environmental data who are building an open, real-time database that provides programmatic and historical access to air quality data. See their website at <https://openaq.org/> and see the API documentation at <https://docs.openaq.org/>. The package contains 5 functions that correspond to the 5 different types of query offered by the openaq API: cities, countries, latest, locations and measurements. The package uses the `dplyr` package: all output tables are data.frame (dplyr "tbl_df") objects, that can be further processed and analysed.

<section id="installation">

## Installation

Stable version from CRAN


```r
install.packages("ropenaq")
```

Development version from GitHub


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropenscilabs/ropenaq")
```


```r
library("ropenaq")
```

<section id="usage">

## Usage

### Finding measurements availability

Three functions of the package allow to get lists of available information. Measurements are obtained from *locations* that are in *cities* that are in *countries*.

#### The `aq_countries` function

The `aq_countries` function allows to see for which countries information is available within the platform. It is the easiest function because it does not have any argument. The code for each country is its ISO 3166-1 alpha-2 code.


```r
countriesTable <- aq_countries()
library("knitr")
```


```r
countriesTable$results
#> # A tibble: 25 × 5
#>                      name  code cities locations   count
#> *                   <chr> <chr>  <int>     <int>   <int>
#> 1               Australia    AU     11        28  797474
#> 2  Bosnia and Herzegovina    BA      4        11  161215
#> 3              Bangladesh    BD      1         2    5679
#> 4                  Brazil    BR     73       113 1230472
#> 5                  Canada    CA     11       157  562575
#> 6                   Chile    CL     95       104 1811329
#> 7                   China    CN      5         6   49696
#> 8                Colombia    CO      1         1    4156
#> 9                Ethiopia    ET      1         1     453
#> 10         United Kingdom    GB    105       152 1598044
#> # ... with 15 more rows
```


```r
countriesTable$meta
#> # A tibble: 1 × 6
#>         name   license                  website  page limit found
#>       <fctr>    <fctr>                   <fctr> <int> <int> <int>
#> 1 openaq-api CC BY 4.0 https://docs.openaq.org/     1   100    25
```


```r
countriesTable$timestamp
#> # A tibble: 1 × 2
#>             lastModif           queriedAt
#>                <dttm>              <dttm>
#> 1 2016-09-06 19:22:27 2016-09-06 19:22:35
```

#### The `aq_cities` function

Using the `aq_cities` functions one can get all cities for which information is available within the platform. For each city, one gets the number of locations and the count of measures for the city, the URL encoded string, and the country it is in.


```r
citiesTable <- aq_cities()
citiesTable$results
#> # A tibble: 100 × 5
#>           city country locations count     cityURL
#>          <chr>   <chr>     <int> <int>       <chr>
#> 1          76t      TH         1     4         76t
#> 2    ABBEVILLE      US         1  2588   ABBEVILLE
#> 3     Aberdeen      GB         3 25639    Aberdeen
#> 4     Aberdeen      US         2  6192    Aberdeen
#> 5          ADA      US         1  7829         ADA
#> 6        ADAIR      US         1 11073       ADAIR
#> 7        ADAMS      US         2 10662       ADAMS
#> 8  Addis Ababa      ET         1   453 Addis+Ababa
#> 9       Adrian      US         1  7400      Adrian
#> 10        Agra      IN         1 20442        Agra
#> # ... with 90 more rows
```

The optional `country` argument allows to do this for a given country instead of the whole world.


```r
citiesTableIndia <- aq_cities(country="IN")
citiesTableIndia$results
#> # A tibble: 34 × 5
#>          city country locations  count    cityURL
#>         <chr>   <chr>     <int>  <int>      <chr>
#> 1        Agra      IN         1  20442       Agra
#> 2   Ahmedabad      IN         1  10490  Ahmedabad
#> 3  Aurangabad      IN         1   3370 Aurangabad
#> 4  Barddhaman      IN         1   1641 Barddhaman
#> 5   Bengaluru      IN         5  67936  Bengaluru
#> 6  Chandrapur      IN         2  29160 Chandrapur
#> 7     Chennai      IN         4  45069    Chennai
#> 8    Chittoor      IN         1   2013   Chittoor
#> 9       Delhi      IN        15 278695      Delhi
#> 10  Faridabad      IN         1  34020  Faridabad
#> # ... with 24 more rows
```

If one inputs a country that is not in the platform (or misspells a code), then an error message is thrown.


```r
#aq_cities(country="PANEM")
```

#### The `locations` function

The `aq_locations` function has far more arguments than the first two functions. On can filter locations in a given country, city, location, for a given parameter (valid values are "pm25", "pm10", "so2", "no2", "o3", "co" and "bc"), from a given date and/or up to a given date, for values between a minimum and a maximum, for a given circle outside a central point by the use of the `latitude`, `longitude` and `radius` arguments. In the output table one also gets URL encoded strings for the city and the location. Below are several examples.

Here we only look for locations with PM2.5 information in India.


```r
locationsIndia <- aq_locations(country="IN", parameter="pm25")
locationsIndia$results
#> # A tibble: 39 × 18
#>                              location        city country sourceName count
#>                                 <chr>       <chr>   <chr>      <chr> <int>
#> 1               AAQMS Karve Road Pune        Pune      IN       CPCB  6962
#> 2                         Anand Vihar       Delhi      IN       CPCB  8270
#> 3                         AP Tirumala    Chittoor      IN       CPCB   493
#> 4                       Ardhali Bazar    Varanasi      IN       CPCB 10073
#> 5                      Central School     Lucknow      IN       CPCB  4190
#> 6                          Chandrapur  Chandrapur      IN       CPCB  4148
#> 7                         Civil Lines       Delhi      IN       CPCB     1
#> 8         Collectorate - Gaya - BSPCB        Gaya      IN       CPCB  3157
#> 9        Collectorate Jodhpur - RSPCB     Jodhpur      IN       CPCB  6420
#> 10 Collectorate - Muzaffarpur - BSPCB Muzaffarpur      IN       CPCB  6415
#> # ... with 29 more rows, and 13 more variables: lastUpdated <dttm>,
#> #   firstUpdated <dttm>, latitude <dbl>, longitude <dbl>, pm25 <lgl>,
#> #   pm10 <lgl>, no2 <lgl>, so2 <lgl>, o3 <lgl>, co <lgl>, bc <lgl>,
#> #   cityURL <chr>, locationURL <chr>
```


### Getting measurements

Two functions allow to get data: `aq_measurement` and `aq_latest`. In both of them the arguments city and location needs to be given as URL encoded strings.

#### The `aq_measurements` function

The `aq_measurements` function has many arguments for getting a query specific to, say, a given parameter in a given location or for a given circle outside a central point by the use of the `latitude`, `longitude` and `radius` arguments. Below we get the PM2.5 measures for Anand Vihar in Delhi in India.


```r
tableResults <- aq_measurements(country="IN", city="Delhi", location="Anand+Vihar", parameter="pm25")
tableResults$results
#> # A tibble: 100 × 12
#>       location parameter value  unit country  city             dateUTC
#>          <chr>     <chr> <int> <chr>   <chr> <chr>              <dttm>
#> 1  Anand Vihar      pm25    67 µg/m³      IN Delhi 2016-09-06 18:05:00
#> 2  Anand Vihar      pm25    67 µg/m³      IN Delhi 2016-09-06 17:35:00
#> 3  Anand Vihar      pm25    82 µg/m³      IN Delhi 2016-09-06 17:05:00
#> 4  Anand Vihar      pm25    82 µg/m³      IN Delhi 2016-09-06 16:35:00
#> 5  Anand Vihar      pm25    97 µg/m³      IN Delhi 2016-09-06 16:05:00
#> 6  Anand Vihar      pm25    97 µg/m³      IN Delhi 2016-09-06 15:35:00
#> 7  Anand Vihar      pm25    63 µg/m³      IN Delhi 2016-09-06 15:05:00
#> 8  Anand Vihar      pm25    63 µg/m³      IN Delhi 2016-09-06 14:35:00
#> 9  Anand Vihar      pm25    70 µg/m³      IN Delhi 2016-09-06 14:05:00
#> 10 Anand Vihar      pm25    70 µg/m³      IN Delhi 2016-09-06 13:35:00
#> # ... with 90 more rows, and 5 more variables: dateLocal <dttm>,
#> #   latitude <dbl>, longitude <dbl>, cityURL <chr>, locationURL <chr>
```


```r
tableResults$timestamp
#> # A tibble: 1 × 2
#>             lastModif           queriedAt
#>                <dttm>              <dttm>
#> 1 2016-09-06 19:22:27 2016-09-06 19:25:11
```


```r
tableResults$meta
#> # A tibble: 1 × 6
#>         name   license                  website  page limit found
#>       <fctr>    <fctr>                   <fctr> <int> <int> <int>
#> 1 openaq-api CC BY 4.0 https://docs.openaq.org/     1   100  8270
```

One could also get all possible parameters in the same table.


#### The `aq_latest` function

This function gives a table with all newest measures for the locations that are chosen by the arguments. If all arguments are `NULL`, it gives all the newest measures for all locations.



```r
tableLatest <- aq_latest()
tableLatest$results
#> # A tibble: 213 × 11
#>             location                 city country longitude   latitude
#>                <chr>                <chr>   <chr>     <dbl>      <dbl>
#> 1            100 ail          Ulaanbaatar      MN  47.93291  106.92138
#> 2            100 ail          Ulaanbaatar      MN  47.93291  106.92138
#> 3            100 ail          Ulaanbaatar      MN  47.93291  106.92138
#> 4            100 ail          Ulaanbaatar      MN  47.93291  106.92138
#> 5            100 ail          Ulaanbaatar      MN  47.93291  106.92138
#> 6  16th and Whitmore Omaha-Council Bluffs      US  41.32247  -95.93799
#> 7  16th and Whitmore Omaha-Council Bluffs      US  41.32247  -95.93799
#> 8    1NL Navajo Lake           Farmington      US  36.80970 -107.65170
#> 9         21 de mayo          Los Angeles      CL -37.47118  -72.36146
#> 10        21 de mayo          Los Angeles      CL -37.47118  -72.36146
#> # ... with 203 more rows, and 6 more variables: parameter <chr>,
#> #   value <dbl>, lastUpdated <dttm>, unit <chr>, cityURL <chr>,
#> #   locationURL <chr>
```

Below are the latest values for Anand Vihar at the time this vignette was compiled (cache=FALSE).


```r
tableLatest <- aq_latest(country="IN", city="Delhi", location="Anand+Vihar")
tableLatest$results
#> # A tibble: 6 × 11
#>      location  city country longitude latitude parameter  value
#>         <chr> <chr>   <chr>     <dbl>    <dbl>     <chr>  <dbl>
#> 1 Anand Vihar Delhi      IN   28.6508  77.3152        co 1300.0
#> 2 Anand Vihar Delhi      IN   28.6508  77.3152       no2   43.4
#> 3 Anand Vihar Delhi      IN   28.6508  77.3152        o3   43.9
#> 4 Anand Vihar Delhi      IN   28.6508  77.3152      pm10  619.0
#> 5 Anand Vihar Delhi      IN   28.6508  77.3152      pm25   67.0
#> 6 Anand Vihar Delhi      IN   28.6508  77.3152       so2   18.0
#> # ... with 4 more variables: lastUpdated <dttm>, unit <chr>,
#> #   cityURL <chr>, locationURL <chr>
```

### Paging and limit

For all endpoints/functions, there a a `limit` and a `page` arguments, which indicate, respectively, how many results per page should be shown and which page should be queried. Based on this, how to get all results corresponding to a query? First, look at the number of results, e.g.


```r
how_many <- aq_measurements(city = "Delhi",
                            parameter = "pm25")$meta
how_many
#> # A tibble: 1 × 6
#>         name   license                  website  page limit found
#>       <fctr>    <fctr>                   <fctr> <int> <int> <int>
#> 1 openaq-api CC BY 4.0 https://docs.openaq.org/     1   100 51049
```


```r
how_many$found
#> [1] 51049
```

Then one can write a loop over pages. Note that the maximal value of `limit` is 1000.


```r
meas <- NULL
for (page in 1:(ceiling(how_many$found/1000))){
  meas <- dplyr::bind_rows(meas,
                aq_measurements(city = "Delhi",
                                parameter = "pm25",
                                page = page,
                                limit = 1000))
  }

```


<section id="citing">

## Citing

> Maëlle Salmon (2016). ropenaq: Accesses Air Quality Data from the Open Data Platform OpenAQ. R
  package version 0.1.1. https://cran.rstudio.com/package=ropenaq


<section id="license_bugs">

## License and bugs

* License: [GPL-2](https://opensource.org/licenses/GPL-2.0)
* Report bugs at [our GitHub repo for ropenaq](https://github.com/ropenscilabs/ropenaq/issues?state=open)


[Back to top](#top)
