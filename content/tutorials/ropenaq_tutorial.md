---
title: ropenaq tutorial
package_version: 0.2.2
---



This R package is aimed at accessing the openaq API. OpenAQ is a community of scientists, software developers, and lovers of open environmental data who are building an open, real-time database that provides programmatic and historical access to air quality data. See their website at <https://openaq.org/> and see the API documentation at <https://docs.openaq.org/>. The package contains 5 functions that correspond to the 5 different types of query offered by the openaq API: cities, countries, latest, locations and measurements. The package uses the `dplyr` package: all output tables are data.frame (dplyr "tbl_df") objects, that can be further processed and analysed.


### Installation

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


## Usage

### Finding measurements availability

Three functions of the package allow to get lists of available information. Measurements are obtained from *locations* that are in *cities* that are in *countries*.

#### The `aq_countries` function

The `aq_countries` function allows to see for which countries information is available within the platform. It is the easiest function because it does not have any argument. The code for each country is its ISO 3166-1 alpha-2 code.


```r
(countriesTable <- aq_countries())
#> # A tibble: 62 x 5
#>                      name  code cities locations   count
#>                     <chr> <chr>  <int>     <int>   <int>
#>  1                Andorra    AD      2         3    4375
#>  2              Argentina    AR      1         4   14760
#>  3              Australia    AU     17        91 2619991
#>  4                Austria    AT     16       306 1521351
#>  5                Bahrain    BH      1         1   10963
#>  6             Bangladesh    BD      1         2   14710
#>  7                Belgium    BE     14       191 1048350
#>  8 Bosnia and Herzegovina    BA      8        17  568544
#>  9                 Brazil    BR     72       119 2773831
#> 10                 Canada    CA     11       165 2026256
#> # ... with 52 more rows
```

#### The `aq_cities` function

Using the `aq_cities` functions one can get all cities for which information is available within the platform. For each city, one gets the number of locations and the count of measures for the city, the URL encoded string, and the country it is in.


```r
(citiesTable <- aq_cities())
#> # A tibble: 1,929 x 5
#>                                              city country locations  count
#>                                             <chr>   <chr>     <int>  <int>
#>  1                             Escaldes-Engordany      AD         2   4061
#>  2                                         unused      AD         1    314
#>  3                                   Buenos Aires      AR         4  14760
#>  4               Gemeinde Wien, MA22 Umweltschutz      AT        21 130328
#>  5   Amt der Ober�sterreichischen Landesregierung      AT        16 154329
#>  6 Amt der Nieder�sterreichischen Landesregierung      AT        39 322499
#>  7           Umweltinstitut des Landes Vorarlberg      AT         9  36108
#>  8             Amt der Salzburger Landesregierung      AT        12  94197
#>  9       Amt der Steiermärkischen Landesregierung      AT         4   1891
#> 10                                        Austria      AT       174 121987
#> # ... with 1,919 more rows, and 1 more variables: cityURL <chr>
```

The optional `country` argument allows to do this for a given country instead of the whole world.


```r
(citiesTableIndia <- aq_cities(country="IN"))
#> # A tibble: 51 x 5
#>         city country locations  count   cityURL
#>        <chr>   <chr>     <int>  <int>     <chr>
#>  1   Lucknow      IN         4 209783   Lucknow
#>  2    Nagpur      IN         5  61709    Nagpur
#>  3     Delhi      IN        24 942302     Delhi
#>  4   Kolkata      IN         5 165606   Kolkata
#>  5   Jodhpur      IN         1 131476   Jodhpur
#>  6 Hyderabad      IN        15 372531 Hyderabad
#>  7  Amritsar      IN         1  56712  Amritsar
#>  8 Bengaluru      IN         5 316486 Bengaluru
#>  9    Howrah      IN         1  46252    Howrah
#> 10  Durgapur      IN         1  64301  Durgapur
#> # ... with 41 more rows
```

If one inputs a country that is not in the platform (or misspells a code), then an error message is thrown.


```r
aq_cities(country="PANEM")
#> Error: This country is not available within the platform. See ?countries
```

#### The `locations` function

The `aq_locations` function has far more arguments than the first two functions. On can filter locations in a given country, city, location, for a given parameter (valid values are "pm25", "pm10", "so2", "no2", "o3", "co" and "bc"), from a given date and/or up to a given date, for values between a minimum and a maximum, for a given circle outside a central point by the use of the `latitude`, `longitude` and `radius` arguments. In the output table one also gets URL encoded strings for the city and the location. Below are several examples.

Here we only look for locations with PM2.5 information in India.


```r
(locationsIndia <- aq_locations(country="IN", parameter="pm25"))
#> # A tibble: 99 x 19
#>                               location              city country count
#>                                  <chr>             <chr>   <chr> <int>
#>  1               AAQMS Karve Road Pune              Pune      IN 29703
#>  2                         AP Tirumala          Chittoor      IN   493
#>  3           APIIC Kancharapalem-APPCB     Visakhapatnam      IN  7072
#>  4         Adarsh Nagar, Jaipur- RSPCB            Jaipur      IN    31
#>  5                   Alandur Bus Depot           Chennai      IN  9298
#>  6 Anam Kala Kendram,Rajamahendravaram Rajamahendravaram      IN  1435
#>  7                         Anand Vihar             Delhi      IN 22388
#>  8                       Ardhali Bazar          Varanasi      IN 30675
#>  9              Aya Nagar, Delhi - IMD             Delhi      IN  1140
#> 10                          BTM Layout         Bengaluru      IN 12403
#> # ... with 89 more rows, and 15 more variables: sourceNames <list>,
#> #   lastUpdated <dttm>, firstUpdated <dttm>, sourceName <chr>,
#> #   latitude <dbl>, longitude <dbl>, pm25 <lgl>, pm10 <lgl>, no2 <lgl>,
#> #   so2 <lgl>, o3 <lgl>, co <lgl>, bc <lgl>, cityURL <chr>,
#> #   locationURL <chr>
```


### Getting measurements

Two functions allow to get data: `aq_measurement` and `aq_latest`. In both of them the arguments city and location needs to be given as URL encoded strings.

#### The `aq_measurements` function

The `aq_measurements` function has many arguments for getting a query specific to, say, a given parameter in a given location or for a given circle outside a central point by the use of the `latitude`, `longitude` and `radius` arguments. Below we get the PM2.5 measures for Anand Vihar in Delhi in India.


```r
(tableResults <- aq_measurements(country="IN", city="Delhi", location="Anand+Vihar", parameter="pm25"))
#> # A tibble: 23,229 x 12
#>       location parameter value  unit country  city latitude longitude
#>          <chr>     <chr> <int> <chr>   <chr> <chr>    <dbl>     <dbl>
#>  1 Anand Vihar      pm25   263 µg/m³      IN Delhi  28.6508   77.3152
#>  2 Anand Vihar      pm25   349 µg/m³      IN Delhi  28.6508   77.3152
#>  3 Anand Vihar      pm25   303 µg/m³      IN Delhi  28.6508   77.3152
#>  4 Anand Vihar      pm25   303 µg/m³      IN Delhi  28.6508   77.3152
#>  5 Anand Vihar      pm25   303 µg/m³      IN Delhi  28.6508   77.3152
#>  6 Anand Vihar      pm25     0 µg/m³      IN Delhi  28.6508   77.3152
#>  7 Anand Vihar      pm25   343 µg/m³      IN Delhi  28.6508   77.3152
#>  8 Anand Vihar      pm25   292 µg/m³      IN Delhi  28.6508   77.3152
#>  9 Anand Vihar      pm25   292 µg/m³      IN Delhi  28.6508   77.3152
#> 10 Anand Vihar      pm25   292 µg/m³      IN Delhi  28.6508   77.3152
#> # ... with 23,219 more rows, and 4 more variables: dateUTC <dttm>,
#> #   dateLocal <dttm>, cityURL <chr>, locationURL <chr>
```

One could also get all possible parameters in the same table.


#### The `aq_latest` function

This function gives a table with all newest measures for the locations that are chosen by the arguments. If all arguments are `NULL`, it gives all the newest measures for all locations.



```r
(tableLatest <- aq_latest())
```

Below are the latest values for Anand Vihar at the time this vignette was compiled (cache=FALSE).


```r
(tableLatest <- aq_latest(country="IN", city="Delhi", location="Anand+Vihar"))
```



### Citing

> Maëlle Salmon (2017). ropenaq: Accesses Air Quality Data from the
  Open Data Platform OpenAQ. R package version 0.2.2.
  https://CRAN.R-project.org/package=ropenaq



### License and bugs

* License: [GPL-2](https://opensource.org/licenses/GPL-2.0)
* Report bugs at [our GitHub repo for ropenaq](https://github.com/ropenscilabs/ropenaq/issues?state=open)


[Back to top](#top)
