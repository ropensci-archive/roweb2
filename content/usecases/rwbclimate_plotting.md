---
title: "Downloading World Bank climate data in R"
package: rWBclimate
gh: ropensci/rWBclimate
---

The package can download data for any of the 13 major climate models,
but it also offers provides access to ensemble data derived from all
models. We'll focus on this for our examples. Here we'll plot
temperature and precipiation data for Great Britain for the past and two
[climate
scenarios](http://climatesanity.wordpress.com/tag/global-depletion-of-groundwater-resources/),
A2 and B1.

Load the library

```r
library("rWBclimate")
library("ggplot2")
```

Grab temperature data

```r
dat <- get_ensemble_temp("GBR", "annualavg", 1900, 2100)
```

Subset to the median percentile

```r
dat <- subset(dat, dat$percentile == 50)
dat$data <- do.call(c, dat$data)
```

Plot and note the past is the same for each scenario

```r
ggplot(dat, aes(x=fromYear,y=data,group=scenario,colour=scenario)) +
    geom_point(size=4) +
    geom_path() +
    xlab("Year") +
    ylab("Annual Average Temperature in 20 year increments") +
    theme_grey(base_size = 16)
```

![plot of chunk rwb1](/img/usecases-images/rwb1.png)

As you can see the A2 scenario of unchecked growth predicts a higher
annual average temperature. We can look at the same kind of data except
this time examining changes in precipitation.

```r
dat2 <- get_ensemble_precip("GBR", "annualavg", 1900, 2100)
dat2 <- subset(dat2, dat2$percentile == 50)
dat2$data <- do.call(c, dat2$data)
ggplot(dat2, aes(x = fromYear, y = data, group = scenario, colour = scenario)) +
    geom_point(size=4) +
    geom_path() +
    xlab("Year") +
    ylab("Annual Average precipitation in mm") +
    theme_grey(base_size = 16)
```

![](/img/assets/usecases-images/rwb2.png)

Here the difference between predicted increases in precipitation are
less drastic when comparing the two different scenarios.
