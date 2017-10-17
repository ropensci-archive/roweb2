---
title: opencage tutorial
package_version: 0.1.2
---



This package is an interface to the OpenCage API that allows forward and reverse geocoding. To use the package, you will need an API key. To get an API key for OpenCage geocoding, register at https://geocoder.opencagedata.com/pricing. The free API key provides up to 2,500 calls a day. For ease of use, save your API key as an environment variable as described at http://stat545.com/bit003_api-key-env-var.html.

Both functions of the package will conveniently look for your API key using `Sys.getenv("OPENCAGE_KEY")` so if your API key is an environment variable called "OPENCAGE_KEY" you don't need to input it manually.

## Geocoding

The [OpenCage](https://geocoder.opencagedata.com/) API supports forward and reverse geocoding. Sources of OpenCage are open geospatial data including OpenStreetMap, Yahoo! GeoPlanet, Natural Earth Data, Thematic Mapping, Ordnance Survey OpenSpace, Statistics New Zealand, Zillow, MaxMind, GeoNames, the US Census Bureau and Flickr's shapefiles plus a whole lot more besides. See [this page](https://geocoder.opencagedata.com/credits) for the full list of credits.

Both forward and reverse geocoding typically return multiple results. Regarding these multiple results, the API doc states, "In cases where the geocoder is able to find multiple matches, the geocoder will return multiple results. The confidence or coordinates for each result should be examined to determine whether each result from an ambiguous query is sufficiently high to warrant using a result or not. A good strategy to reduce ambiguity is to use the optional `bounds` parameter described below to limit the area searched." Multiple results might mean you get a result for the airport and a road when querying a city name, or results for cities with the same name in different countries.


### Installation

Stable version from CRAN


```r
install.packages("opencage")
```

Development version from GitHub


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropenscilabs/opencage")
```


```r
library("opencage")
```


### Forward geocoding

Forward geocoding is from placename to latitude and longitude tuplet(s).


```r
output <- opencage_forward(placename = "Sarzeau")
library("dplyr")
output$rate_info
```

```
#> # A tibble: 1 x 3
#>   limit remaining               reset
#>   <int>     <int>              <dttm>
#> 1  2500      2499 2017-10-17 17:00:00
```

```r
output$results
```

```
#> # A tibble: 2 x 57
#>    annotations.DMS.lat annotations.DMS.lng annotations.MGRS
#>                  <chr>               <chr>            <chr>
#> 1 47° 31' 43.56984'' N 2° 45' 51.11856'' W  30TWT1774963954
#> 2 47° 31' 40.80828'' N  2° 46' 7.68144'' W  30TWT1740363867
#> # ... with 54 more variables: annotations.Maidenhead <chr>,
#> #   annotations.Mercator.x <chr>, annotations.Mercator.y <chr>,
#> #   annotations.OSM.edit_url <chr>, annotations.OSM.url <chr>,
#> #   annotations.callingcode <fctr>,
#> #   annotations.currency.decimal_mark <fctr>,
#> #   annotations.currency.html_entity <fctr>,
#> #   annotations.currency.iso_code <fctr>,
#> #   annotations.currency.iso_numeric <fctr>,
#> #   annotations.currency.name <fctr>,
#> #   annotations.currency.smallest_denomination <fctr>,
#> #   annotations.currency.subunit <fctr>,
#> #   annotations.currency.subunit_to_unit <fctr>,
#> #   annotations.currency.symbol <fctr>,
#> #   annotations.currency.symbol_first <fctr>,
#> #   annotations.currency.thousands_separator <fctr>,
#> #   annotations.geohash <chr>, annotations.qibla <fctr>,
#> #   annotations.sun.rise.apparent <fctr>,
#> #   annotations.sun.rise.astronomical <fctr>,
#> #   annotations.sun.rise.civil <fctr>,
#> #   annotations.sun.rise.nautical <fctr>,
#> #   annotations.sun.set.apparent <fctr>,
#> #   annotations.sun.set.astronomical <fctr>,
#> #   annotations.sun.set.civil <fctr>, annotations.sun.set.nautical <fctr>,
#> #   annotations.timezone.name <fctr>,
#> #   annotations.timezone.now_in_dst <fctr>,
#> #   annotations.timezone.offset_sec <fctr>,
#> #   annotations.timezone.offset_string <fctr>,
#> #   annotations.timezone.short_name <fctr>,
#> #   annotations.what3words.words <chr>, annotations.wikidata <fctr>,
#> #   bounds.northeast.lat <chr>, bounds.northeast.lng <chr>,
#> #   bounds.southwest.lat <chr>, bounds.southwest.lng <chr>,
#> #   `components.ISO_3166-1_alpha-2` <fctr>, components._type <chr>,
#> #   components.city <fctr>, components.country <fctr>,
#> #   components.country_code <fctr>, components.county <fctr>,
#> #   components.postcode <fctr>, components.state <fctr>, confidence <chr>,
#> #   formatted <chr>, geometry.lat <dbl>, geometry.lng <dbl>,
#> #   components.post_office <fctr>, components.road <fctr>,
#> #   components.suburb <fctr>, components.village <fctr>
```

### Reverse geocoding

Reverse geocoding is from latitude and longitude to placename(s).


```r
output2 <- opencage_reverse(latitude = 51.5034070,
                            longitude = -0.1275920)
output2$rate_info
```

```
#> # A tibble: 1 x 3
#>   limit remaining               reset
#>   <int>     <int>              <dttm>
#> 1  2500      2498 2017-10-17 17:00:00
```

```r
output2$results
```

```
#> # A tibble: 1 x 61
#>    annotations.DMS.lat annotations.DMS.lng annotations.MGRS
#>                 <fctr>              <fctr>           <fctr>
#> 1 51° 30' 12.38472'' N  0° 7' 39.74916'' E  30UXC9933909723
#> # ... with 58 more variables: annotations.Maidenhead <fctr>,
#> #   annotations.Mercator.x <fctr>, annotations.Mercator.y <fctr>,
#> #   annotations.OSGB.easting <fctr>, annotations.OSGB.gridref <fctr>,
#> #   annotations.OSGB.northing <fctr>, annotations.OSM.edit_url <fctr>,
#> #   annotations.OSM.url <fctr>, annotations.callingcode <fctr>,
#> #   annotations.currency.decimal_mark <fctr>,
#> #   annotations.currency.html_entity <fctr>,
#> #   annotations.currency.iso_code <fctr>,
#> #   annotations.currency.iso_numeric <fctr>,
#> #   annotations.currency.name <fctr>,
#> #   annotations.currency.smallest_denomination <fctr>,
#> #   annotations.currency.subunit <fctr>,
#> #   annotations.currency.subunit_to_unit <fctr>,
#> #   annotations.currency.symbol <fctr>,
#> #   annotations.currency.symbol_first <fctr>,
#> #   annotations.currency.thousands_separator <fctr>,
#> #   annotations.geohash <fctr>, annotations.qibla <fctr>,
#> #   annotations.sun.rise.apparent <fctr>,
#> #   annotations.sun.rise.astronomical <fctr>,
#> #   annotations.sun.rise.civil <fctr>,
#> #   annotations.sun.rise.nautical <fctr>,
#> #   annotations.sun.set.apparent <fctr>,
#> #   annotations.sun.set.astronomical <fctr>,
#> #   annotations.sun.set.civil <fctr>, annotations.sun.set.nautical <fctr>,
#> #   annotations.timezone.name <fctr>,
#> #   annotations.timezone.now_in_dst <fctr>,
#> #   annotations.timezone.offset_sec <fctr>,
#> #   annotations.timezone.offset_string <fctr>,
#> #   annotations.timezone.short_name <fctr>,
#> #   annotations.what3words.words <fctr>, annotations.wikidata <fctr>,
#> #   bounds.northeast.lat <fctr>, bounds.northeast.lng <fctr>,
#> #   bounds.southwest.lat <fctr>, bounds.southwest.lng <fctr>,
#> #   `components.ISO_3166-1_alpha-2` <fctr>, components._type <fctr>,
#> #   components.attraction <fctr>, components.city <fctr>,
#> #   components.country <fctr>, components.country_code <fctr>,
#> #   components.house_number <fctr>, components.neighbourhood <fctr>,
#> #   components.postcode <fctr>, components.road <fctr>,
#> #   components.state <fctr>, components.state_district <fctr>,
#> #   components.suburb <fctr>, confidence <fctr>, formatted <fctr>,
#> #   geometry.lat <dbl>, geometry.lng <dbl>
```

### Parameters

Optional parameters of both `opencage_forward` and `opencage_reverse` can make the query more precise:

* `bounds`: Provides the geocoder with a hint to the region that the query resides in. This value will restrict the possible results to the supplied region. The bounds parameter should be specified as 4 coordinate points forming the south-west and north-east corners of a bounding box. For example, `bounds = c(-0.563160, 51.280430, 0.278970, 51.683979)` (min long, min lat, max long, max lat).

Below is an example of the use of `bounds` where the rectangle given in the second call does not include Europe so that we don't get results for Berlin in Germany.


```r
results1 <- opencage_forward(placename = "Berlin")
results1$results
```

```
#> # A tibble: 9 x 57
#>    annotations.DMS.lat  annotations.DMS.lng annotations.MGRS
#>                  <chr>                <chr>            <chr>
#> 1  52° 31' 1.33140'' N 13° 23' 19.89564'' E  33UUU9067619766
#> 2  44° 28' 8.65560'' N  71° 11' 6.81324'' W  19TCK2618626296
#> 3 41° 37' 17.35680'' N 72° 44' 44.34648'' W  18TXM8780710206
#> 4 39° 47' 28.41432'' N 74° 55' 44.59260'' W  18SWK0607404588
#> 5 42° 22' 52.33440'' N 71° 38' 13.24320'' W  19TBG8291095470
#> 6 38° 19' 21.41544'' N  75° 13' 3.68076'' W  18SVH8097141633
#> 7  43° 58' 4.93140'' N 88° 56' 36.41136'' W  16TCP4410170158
#> 8 39° 55' 14.29068'' N 78° 57' 28.08756'' W  17SPE7452920945
#> 9  4° 48' 37.67328'' N 75° 40' 55.66260'' W  18NVL2435931751
#> # ... with 54 more variables: annotations.Maidenhead <chr>,
#> #   annotations.Mercator.x <chr>, annotations.Mercator.y <chr>,
#> #   annotations.OSM.edit_url <chr>, annotations.OSM.url <chr>,
#> #   annotations.callingcode <chr>,
#> #   annotations.currency.decimal_mark <chr>,
#> #   annotations.currency.html_entity <chr>,
#> #   annotations.currency.iso_code <chr>,
#> #   annotations.currency.iso_numeric <chr>,
#> #   annotations.currency.name <chr>,
#> #   annotations.currency.smallest_denomination <chr>,
#> #   annotations.currency.subunit <chr>,
#> #   annotations.currency.subunit_to_unit <fctr>,
#> #   annotations.currency.symbol <chr>,
#> #   annotations.currency.symbol_first <fctr>,
#> #   annotations.currency.thousands_separator <chr>,
#> #   annotations.geohash <chr>, annotations.qibla <chr>,
#> #   annotations.sun.rise.apparent <chr>,
#> #   annotations.sun.rise.astronomical <chr>,
#> #   annotations.sun.rise.civil <chr>, annotations.sun.rise.nautical <chr>,
#> #   annotations.sun.set.apparent <chr>,
#> #   annotations.sun.set.astronomical <chr>,
#> #   annotations.sun.set.civil <chr>, annotations.sun.set.nautical <chr>,
#> #   annotations.timezone.name <chr>,
#> #   annotations.timezone.now_in_dst <chr>,
#> #   annotations.timezone.offset_sec <chr>,
#> #   annotations.timezone.offset_string <chr>,
#> #   annotations.timezone.short_name <chr>,
#> #   annotations.what3words.words <chr>, annotations.wikidata <chr>,
#> #   bounds.northeast.lat <chr>, bounds.northeast.lng <chr>,
#> #   bounds.southwest.lat <chr>, bounds.southwest.lng <chr>,
#> #   `components.ISO_3166-1_alpha-2` <chr>, components._type <chr>,
#> #   components.city <chr>, components.country <chr>,
#> #   components.country_code <chr>, components.state <chr>,
#> #   confidence <chr>, formatted <chr>, geometry.lat <dbl>,
#> #   geometry.lng <dbl>, annotations.currency.alternate_symbols <chr>,
#> #   annotations.currency.disambiguate_symbol <chr>,
#> #   components.county <chr>, components.state_code <chr>,
#> #   components.town <fctr>, components.city_district <fctr>
```


```r
results2 <- opencage_forward(placename = "Berlin",
                             bounds = c(-90,38,0, 45))
results2$results
```

```
#> # A tibble: 10 x 57
#>     annotations.DMS.lat  annotations.DMS.lng annotations.MGRS
#>                   <chr>                <chr>            <chr>
#>  1  44° 28' 8.65560'' N  71° 11' 6.81324'' W  19TCK2618626296
#>  2 41° 37' 17.35680'' N 72° 44' 44.34648'' W  18TXM8780710206
#>  3 39° 47' 28.41432'' N 74° 55' 44.59260'' W  18SWK0607404588
#>  4 42° 22' 52.33440'' N 71° 38' 13.24320'' W  19TBG8291095470
#>  5 38° 19' 21.41544'' N  75° 13' 3.68076'' W  18SVH8097141633
#>  6  43° 58' 4.93140'' N 88° 56' 36.41136'' W  16TCP4410170158
#>  7 39° 55' 14.29068'' N 78° 57' 28.08756'' W  17SPE7452920945
#>  8 39° 45' 32.17932'' N 89° 54' 11.38824'' W  16SBK5129805033
#>  9 42° 41' 35.28636'' N 73° 22' 19.39728'' W  18TXN3335128023
#> 10 40° 33' 40.22424'' N 81° 47' 39.48144'' W  17TME3275690348
#> # ... with 54 more variables: annotations.Maidenhead <chr>,
#> #   annotations.Mercator.x <chr>, annotations.Mercator.y <chr>,
#> #   annotations.OSM.edit_url <chr>, annotations.OSM.url <chr>,
#> #   annotations.callingcode <fctr>,
#> #   annotations.currency.alternate_symbols <fctr>,
#> #   annotations.currency.decimal_mark <fctr>,
#> #   annotations.currency.disambiguate_symbol <fctr>,
#> #   annotations.currency.html_entity <fctr>,
#> #   annotations.currency.iso_code <fctr>,
#> #   annotations.currency.iso_numeric <fctr>,
#> #   annotations.currency.name <fctr>,
#> #   annotations.currency.smallest_denomination <fctr>,
#> #   annotations.currency.subunit <fctr>,
#> #   annotations.currency.subunit_to_unit <fctr>,
#> #   annotations.currency.symbol <fctr>,
#> #   annotations.currency.symbol_first <fctr>,
#> #   annotations.currency.thousands_separator <fctr>,
#> #   annotations.geohash <chr>, annotations.qibla <chr>,
#> #   annotations.sun.rise.apparent <chr>,
#> #   annotations.sun.rise.astronomical <chr>,
#> #   annotations.sun.rise.civil <chr>, annotations.sun.rise.nautical <chr>,
#> #   annotations.sun.set.apparent <chr>,
#> #   annotations.sun.set.astronomical <chr>,
#> #   annotations.sun.set.civil <chr>, annotations.sun.set.nautical <chr>,
#> #   annotations.timezone.name <chr>,
#> #   annotations.timezone.now_in_dst <fctr>,
#> #   annotations.timezone.offset_sec <chr>,
#> #   annotations.timezone.offset_string <chr>,
#> #   annotations.timezone.short_name <chr>,
#> #   annotations.what3words.words <chr>, annotations.wikidata <chr>,
#> #   bounds.northeast.lat <chr>, bounds.northeast.lng <chr>,
#> #   bounds.southwest.lat <chr>, bounds.southwest.lng <chr>,
#> #   `components.ISO_3166-1_alpha-2` <fctr>, components._type <chr>,
#> #   components.city <chr>, components.country <fctr>,
#> #   components.country_code <fctr>, components.county <chr>,
#> #   components.state <chr>, components.state_code <chr>, confidence <chr>,
#> #   formatted <chr>, geometry.lat <dbl>, geometry.lng <dbl>,
#> #   components.town <fctr>, components.village <fctr>
```

* `countrycode`: Restricts the results to the given country. The country code is a two letter code as defined by the ISO 3166-1 Alpha 2 standard. E.g. "GB" for the United Kingdom, "FR" for France, "US" for United States. See example below.


```r
results3 <- opencage_forward(placename = "Berlin", country = "DE")
results3$results
```

```
#> # A tibble: 9 x 65
#>    annotations.DMS.lat  annotations.DMS.lng annotations.MGRS
#>                  <chr>                <chr>            <chr>
#> 1  52° 31' 1.33140'' N 13° 23' 19.89564'' E  33UUU9067619766
#> 2 52° 27' 45.73296'' N 13° 24' 34.80876'' E  33UUU9195513692
#> 3  54° 2' 10.89780'' N 10° 26' 46.07268'' E  32UNE9470788534
#> 4 54° 24' 18.42840'' N  9° 25' 55.18776'' E  32UNF2804128682
#> 5 52° 22' 12.67680'' N  9° 45' 10.62252'' E  32UND5126202479
#> 6 52° 27' 24.31584'' N 13° 34' 45.17328'' E  33UVU0346012790
#> 7  52° 25' 7.43664'' N 13° 11' 47.05872'' E  33UUU7734509142
#> 8 52° 34' 59.62044'' N 13° 23' 56.74524'' E  33UUU9153427113
#> 9 53° 55' 45.85764'' N  9° 30' 50.81940'' E  32UNE3375675789
#> # ... with 62 more variables: annotations.Maidenhead <chr>,
#> #   annotations.Mercator.x <chr>, annotations.Mercator.y <chr>,
#> #   annotations.OSM.edit_url <chr>, annotations.OSM.url <chr>,
#> #   annotations.callingcode <fctr>,
#> #   annotations.currency.decimal_mark <fctr>,
#> #   annotations.currency.html_entity <fctr>,
#> #   annotations.currency.iso_code <fctr>,
#> #   annotations.currency.iso_numeric <fctr>,
#> #   annotations.currency.name <fctr>,
#> #   annotations.currency.smallest_denomination <fctr>,
#> #   annotations.currency.subunit <fctr>,
#> #   annotations.currency.subunit_to_unit <fctr>,
#> #   annotations.currency.symbol <fctr>,
#> #   annotations.currency.symbol_first <fctr>,
#> #   annotations.currency.thousands_separator <fctr>,
#> #   annotations.geohash <chr>, annotations.qibla <chr>,
#> #   annotations.sun.rise.apparent <chr>,
#> #   annotations.sun.rise.astronomical <chr>,
#> #   annotations.sun.rise.civil <chr>, annotations.sun.rise.nautical <chr>,
#> #   annotations.sun.set.apparent <chr>,
#> #   annotations.sun.set.astronomical <chr>,
#> #   annotations.sun.set.civil <chr>, annotations.sun.set.nautical <chr>,
#> #   annotations.timezone.name <fctr>,
#> #   annotations.timezone.now_in_dst <fctr>,
#> #   annotations.timezone.offset_sec <fctr>,
#> #   annotations.timezone.offset_string <fctr>,
#> #   annotations.timezone.short_name <fctr>,
#> #   annotations.what3words.words <chr>, annotations.wikidata <fctr>,
#> #   bounds.northeast.lat <chr>, bounds.northeast.lng <chr>,
#> #   bounds.southwest.lat <chr>, bounds.southwest.lng <chr>,
#> #   `components.ISO_3166-1_alpha-2` <fctr>, components._type <chr>,
#> #   components.city <chr>, components.country <fctr>,
#> #   components.country_code <fctr>, components.state <chr>,
#> #   confidence <chr>, formatted <chr>, geometry.lat <dbl>,
#> #   geometry.lng <dbl>, components.city_district <chr>,
#> #   components.house_number <chr>, components.industrial <fctr>,
#> #   components.postcode <chr>, components.suburb <chr>,
#> #   components.county <chr>, components.village <chr>,
#> #   components.road <chr>, components.unknown <fctr>,
#> #   components.building <fctr>, components.residential <fctr>,
#> #   components.artwork <fctr>, components.house <fctr>,
#> #   components.town <fctr>
```

* `language`: an IETF format language code (such as "es" for Spanish or "pt-BR" for Brazilian Portuguese). If no language is explicitly specified, we will look for an HTTP Accept-Language header like those sent by a brower and use the first language specified and if none are specified "en" (English) will be assumed. See example below.


```r
results4 <- opencage_forward(placename = "Berlin", country = "DE", language = "de")
results4$results
```

```
#> # A tibble: 9 x 65
#>    annotations.DMS.lat  annotations.DMS.lng annotations.MGRS
#>                  <chr>                <chr>            <chr>
#> 1  52° 31' 1.33140'' N 13° 23' 19.89564'' E  33UUU9067619766
#> 2 52° 27' 45.73296'' N 13° 24' 34.80876'' E  33UUU9195513692
#> 3  54° 2' 10.89780'' N 10° 26' 46.07268'' E  32UNE9470788534
#> 4 54° 24' 18.42840'' N  9° 25' 55.18776'' E  32UNF2804128682
#> 5 52° 22' 12.67680'' N  9° 45' 10.62252'' E  32UND5126202479
#> 6 52° 27' 24.31584'' N 13° 34' 45.17328'' E  33UVU0346012790
#> 7  52° 25' 7.43664'' N 13° 11' 47.05872'' E  33UUU7734509142
#> 8 52° 34' 59.62044'' N 13° 23' 56.74524'' E  33UUU9153427113
#> 9 53° 55' 45.85764'' N  9° 30' 50.81940'' E  32UNE3375675789
#> # ... with 62 more variables: annotations.Maidenhead <chr>,
#> #   annotations.Mercator.x <chr>, annotations.Mercator.y <chr>,
#> #   annotations.OSM.edit_url <chr>, annotations.OSM.url <chr>,
#> #   annotations.callingcode <fctr>,
#> #   annotations.currency.decimal_mark <fctr>,
#> #   annotations.currency.html_entity <fctr>,
#> #   annotations.currency.iso_code <fctr>,
#> #   annotations.currency.iso_numeric <fctr>,
#> #   annotations.currency.name <fctr>,
#> #   annotations.currency.smallest_denomination <fctr>,
#> #   annotations.currency.subunit <fctr>,
#> #   annotations.currency.subunit_to_unit <fctr>,
#> #   annotations.currency.symbol <fctr>,
#> #   annotations.currency.symbol_first <fctr>,
#> #   annotations.currency.thousands_separator <fctr>,
#> #   annotations.geohash <chr>, annotations.qibla <chr>,
#> #   annotations.sun.rise.apparent <chr>,
#> #   annotations.sun.rise.astronomical <chr>,
#> #   annotations.sun.rise.civil <chr>, annotations.sun.rise.nautical <chr>,
#> #   annotations.sun.set.apparent <chr>,
#> #   annotations.sun.set.astronomical <chr>,
#> #   annotations.sun.set.civil <chr>, annotations.sun.set.nautical <chr>,
#> #   annotations.timezone.name <fctr>,
#> #   annotations.timezone.now_in_dst <fctr>,
#> #   annotations.timezone.offset_sec <fctr>,
#> #   annotations.timezone.offset_string <fctr>,
#> #   annotations.timezone.short_name <fctr>,
#> #   annotations.what3words.words <chr>, annotations.wikidata <fctr>,
#> #   bounds.northeast.lat <chr>, bounds.northeast.lng <chr>,
#> #   bounds.southwest.lat <chr>, bounds.southwest.lng <chr>,
#> #   `components.ISO_3166-1_alpha-2` <fctr>, components._type <chr>,
#> #   components.city <chr>, components.country <fctr>,
#> #   components.country_code <fctr>, components.state <chr>,
#> #   confidence <chr>, formatted <chr>, geometry.lat <dbl>,
#> #   geometry.lng <dbl>, components.city_district <chr>,
#> #   components.house_number <chr>, components.industrial <fctr>,
#> #   components.postcode <chr>, components.suburb <chr>,
#> #   components.county <chr>, components.village <chr>,
#> #   components.road <chr>, components.unknown <fctr>,
#> #   components.building <fctr>, components.residential <fctr>,
#> #   components.artwork <fctr>, components.house <fctr>,
#> #   components.town <fctr>
```

* `limit`: How many results should be returned (1-100). Default is 10.

* `min_confidence`: an integer from 1-10. Only results with at least this confidence will be returned.

* `no_annotations`: Logical (default FALSE), when TRUE the output will not contain annotations.

* `no_dedupe`: Logical (default FALSE), when TRUE the output will not be deduplicated.

 For more information about the output and the query parameters, see the package documentation, the [API doc](https://geocoder.opencagedata.com/api) and [OpenCage FAQ](https://geocoder.opencagedata.com/faq).

### Caching

The underlying data at OpenCage is updated about once a day. Note that the package uses [memoise](https://github.com/hadley/memoise) with no timeout argument so that results are cached inside an active R session.


```r
system.time(opencage_reverse(latitude = 10, longitude = 10))
```

```
#>    user  system elapsed 
#>   0.043   0.001   0.326
```

```r
system.time(opencage_reverse(latitude = 10, longitude = 10))
```

```
#>    user  system elapsed 
#>   0.001   0.000   0.001
```

```r
memoise::forget(opencage_reverse)
```

```
#> [1] TRUE
```

```r
system.time(opencage_reverse(latitude = 10, longitude = 10))
```

```
#>    user  system elapsed 
#>   0.017   0.000   0.271
```

### Privacy

Both functions have a parameter `no_record`. It is `FALSE` by default.

* When `no_record` is `FALSE` a log of the query is made by OpenCage. The company uses them to better generally understand how people are using its service (forward or reverse geocoding, what parts of the world are people most interested in, etc) and for debugging. The overwhelming majority (99.9999+% of queries) are never specifically looked at (sheer volume prevents that) and are automatically deleted after a few days. More information about privacy can be found [here](https://geocoder.opencagedata.com/faq#legal).

* When `no_record` is `TRUE` the actual query is replaced with FILTERED in OpenCage logs, so that the company has no chance to see what your request was.



### Citing

> Maëlle Salmon (2017). opencage: Interface to the OpenCage API. R
  package version 0.1.2. https://CRAN.R-project.org/package=opencage



### License and bugs

* License: [GPL-2](https://opensource.org/licenses/GPL-2.0)
* Report bugs at [our GitHub repo for opencage](https://github.com/ropenscilabs/opencage/issues?state=open)


[Back to top](#top)
