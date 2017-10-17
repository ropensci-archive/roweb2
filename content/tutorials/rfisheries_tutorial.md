---
title: rfisheries tutorial
package_version: 0.2
---



This package provides programmatic access to the [openfisheries](http://openfisheries.org/) [API](http://openfisheries.org/api-info).

Open Fisheries is a platform that aggregates global fishery data and currently offers global fish capture landings from 1950 onwards (more data coming soon). Read more about that effort [here](http://openfisheries.org/about).


### Installation



```r
install.packages("rfisheries")
```

Development version


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropensci/rfisheries")
```


### Usage

Package currently provides three basic functions. Landings data can be obtained by calling `landings()`


```r
library(rfisheries)
head( of_landings() )
#>   year    catch
#> 1 1950 19338720
#> 2 1951 21916019
#> 3 1952 23493159
#> 4 1953 23785210
#> 5 1954 25539010
#> 6 1955 27073942
```

To get country specific data, provide a iso3c country code


```r
head( of_landings(country = "USA") )
#>   year  catch country
#> 1 1950 636713     USA
#> 2 1951 745288     USA
#> 3 1952 827424     USA
#> 4 1953 788206     USA
#> 5 1954 861787     USA
#> 6 1955 852199     USA
```

To get species specific landings, provide the correct a3 code for the required species.


```r
head( of_landings(species = "SKJ") )
#>   year  catch species
#> 1 1950 362912     SKJ
#> 2 1951 335962     SKJ
#> 3 1952 382990     SKJ
#> 4 1953 370873     SKJ
#> 5 1954 402979     SKJ
#> 6 1955 439842     SKJ
```

If you don't have know the correct species or country codes, you can get a complete list with the following two functions.

```r
head( species_codes() )

         scientific_name   taxocode a3_code isscaap
1     Petromyzon marinus 1020100101     LAU      25
2   Lampetra fluviatilis 1020100201     LAR      25
3    Lampetra tridentata 1020100202     LAO      25
4 Ichthyomyzon unicuspis 1020100401     LAY      25
5    Eudontomyzon mariae 1020100501     LAF      25
6      Geotria australis 1020100701     LAE      25
             english_name
1             Sea lamprey
2           River lamprey
3         Pacific lamprey
4          Silver lamprey
5 Ukrainian brook lamprey
6         Pouched lamprey
```

Similarly you can get a full list of country codes


```r
head( of_country_codes() )
#>          country iso3c
#> 1    Afghanistan   AFG
#> 2        Albania   ALB
#> 3        Algeria   DZA
#> 4 American Samoa   ASM
#> 5        Andorra   AND
#> 6         Angola   AGO
```

Example: Compare landings from multiple countries


```r
library(plyr)
countries <- of_country_codes()
# let's take a small subset, say 5 random countries
c_list <- countries[sample(nrow(countries), 5),]$iso3c
# and grab landings data for these countries
results <- ldply(c_list, function(x) {
    df <- of_landings(country = x)
    df$country  <-  x
    df
})
```

You can easily compare these results


```r
library(ggplot2)
ggplot(results, aes(year, catch, group = country, color = country)) +
  geom_line()
```

![plot of chunk unnamed-chunk-9](/img/tutorial-images/rfisheries/unnamed-chunk-9-1.png)

Similarly you can get landings data for multiple species. As the API evolves, we'll update the package.



### Citing

To cite `rfisheries` in publications use:

<br>

> Karthik Ram, Carl Boettiger and Andrew Dyck (2016). rfisheries: 'Programmatic Interface to the 'openfisheries.org' API'. R package version 0.2. https://github.com/ropensci/rfisheries


### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for rfisheries](https://github.com/ropensci/rfisheries/issues?state=open)

[Back to top](#top)
