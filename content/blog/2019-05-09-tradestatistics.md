---
slug: "tradestatistics"
title: Open Trade Statistics
package_version: 0.2.0
date: '2019-05-09'
authors:
  - Pachá (aka Mauricio Vargas Sepúlveda)
categories: blog
tags:
  - Software Peer Review
  - International Trade
  - tradestatistics
---

### Introduction

[Open Trade Statistics](https://tradestatistics.io) was created with the intention to lower the barrier to working with international economic trade data. It includes a public API, a dashboard, and an R package for data retrieval.

The project started when I found myself, like many people from Latin American Universities, with restricted access to the [United Nations Commodity Trade Statistics Database](https://comtrade.un.org/) (UN COMTRADE). That is the result of expensive subscriptions and a generalized lack of resources for universities in the region as a result of non-existing I+D policies for development.

There are alternatives to COMTRADE, for example the [Base Pour L'Analyse du Commerce International](http://www.cepii.fr/CEPII/en/bdd_modele/presentation.asp?id=1) (BACI) constitutes an improvement over COMTRADE as is constructed using the raw data and a method that reconciles the declarations of the exporter and the importer. This harmonization procedure enables to extend considerably the number of countries for which trade data are available, as compared to the original dataset. The main limitations behind BACI are three: (i) To access their data you need a COMTRADE account; (ii) their datasets are only available to be downloaded as zip files organized by year, with no plans to provide an API or database access; (iii) there is no access to their code, therefore full independent replication is not possible.

After contacting UN COMTRADE, and exposing them my idea of doing something similar to BACI but available to anyone for strictly non-commercial purposes and with open access to datasets and code, I got an authorization to share curated versions of their datasets.

Different projects such as [The Atlas of Economic complexity](http://atlas.cid.harvard.edu/) focus on visualization to answer questions like:

* What did Germany export in 2016?
* Which products are feasible for Australia?
* Who imported Electronics in 1980?
* Who exported Refined Copper in 1990?
* Where did Chile export Wine to in 2016?

Unlike existing visualization projects, I wanted to focus on data retrieval and reproducibility, and the starting point was to study the existing trade data APIs to create something more flexible and easier to use than those tools.

### Making the code (always) work

I started organizing code I wrote during the last four years at https://github.com/tradestatistics/. There was code there that I haven't touched in more than two years, and I wrote almost no comments indicating what do the parts of the code actually do, so it was not understandable for others.

Reproducibility can be explained as: *"Work in a smart way so that your future-self won't ask 'Why does the code return an error?', 'What does this code do?' or 'Why did the result change if I haven't touched the script?'"*. My data cleaning process was not reproducible, and it was tragic to discover! I decided to start using RStudio Server to test the code line by line, on a fresh environment, and then dividing the code into smaller pieces and commenting what do the different sections actually do.

Once I had reproducible results I took a [snapshot](https://github.com/tradestatistics/packrat-library) of my packages by using packat. To ensure reproducibility over time, I decided to build R from source, isolated from the system package manager and therefore avoiding accidental updates that might break the code.

Is it worth mentioning that I'm using [DigitalOcean](https://www.digitalocean.com/) virtual machines to store the datasets and run all the services required to run an API. Under their [Open Source Sponsorships](https://www.digitalocean.com/open-source/) the server cost is largely subsidized.

As a way to contribute back to the community, [here](https://marketplace.digitalocean.com/apps/rstudio) you can find a ready to use RStudio image to work with databases and build R packages.

### The power of Open Source

With a reproducible data pipeline I had the power to do more, and to do it in a sustainable way. Finally I was able to create the R package that I wanted to submit for rOpenSci software peer review, but that package was the final step.

The base for the project is [Ubuntu](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04), the database of choice is [PostgreSQL](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04), and R constitutes 95% of the project. 

The datasets were cleaned by using data.table, jsonlite, dplyr, tidyr, stringr and janitor. The database was created by using RPostgreSQL. The documentation is R markdown and bookdown. The dashboard was made with Shiny. To adhere to a coding style guide I used styler. In addition to all of that I used doParallel, purrr, Rcpp and Matrix packages in order to use the largest possible share of available resources in the server and in an efficient way, so there is a fraction of code involving sparse matrices and C++.

Even our [API](https://api.tradestatistics.io/) was made with R. I used the [Plumber](https://www.rplumber.io/) package, and I used it to combine RPostgreSQL, dplyr, glue and other R packages. With some input sanitization, and to avoid situations like [this XKCD vignette](https://www.xkcd.com/327/), I was ready to start working on a new R package for rOpenSci and a dashboard that I wanted to visualize the data.

The web service is [nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04) enhanced with a secured connection by using [Let's Encrypt](https://www.digitalocean.com/community/tutorials/how-to-use-certbot-standalone-mode-to-retrieve-let-s-encrypt-ssl-certificates-on-ubuntu-1804). The landing page is a modified [HTML5UP](https://html5up.net/) template, and [Atom](https://atom.io/) and [yui-compressor](https://yui.github.io/yuicompressor/) were the tools to personalize the CSS behind the landing, documentation and dashboard with [Fira Sans](https://www.fontsquirrel.com/fonts/fira-sans) as the typeface of choice.

### rOpenSci contributions

Thanks to [Maelle](https://github.com/maelle), [Amanda](https://github.com/aedobbyn), [Jorge](https://github.com/cimentadaj), [Emily](https://github.com/emilyriederer), [Mark](https://github.com/mpadge) and [Joshua](https://github.com/jbkunst/) the overall result can be said to be top quality!

After a long reviewing process (more than six month considering initial submission!), what started as an individual process mutated into something that I consider a collective result. Thanks to the amazing team behind rOpenSci, to their constructive feedback, exhaustive software reviewing and the confidence to propose ideas that that I had never gotten, what you have now is not just a solid R package.

The hours spent as a part of the reviewing process translated into changes to the database and the API. According to the reviewers comments, there are limited opportunities to implement server-side changes and then updating the R code. With the inclusion of different API parameters that I initially didn't consider, the current API/package state provides an efficient solution way better than post-filtering. You'll always extract exactly the data you require and no more than that.

One useful contributed idea was to create aliases for groups of countries. Both in the API and package, you can request an ISO code such as "usa" (United States) or an alias such as "c-am" (all countries in America) that returns condensed queries.

The only aspect we didn't totally agree was the dependency-heavy "tidy" code. I was asked for a lot of changes to the initial package draft, and one of the very few points that remained less changed was to use tidyverse functions, such as those provided by rlang package, instead of dependency-free base R alternatives. However, it's a matter of personal taste.

### Final result

Our project covers a large [documentation](https://docs.tradestatistics.io/datasets.html) with different examples for both API and R package.

As a simple example, let's compare three APIs by extracting what did Chile export to Argentina, Bolivia and Perú in 2016.

#### Packages

```r
# Open Trade Statistics
library(tradestatistics)

# The Atlas + The Observatory
library(jsonlite)
library(dplyr)
library(purrr)
```

#### Open Trade Statistics

This is straightforward:

```r
ots_create_tidy_data(years = 2016, reporters = "chile", partners = c("argentina", "bolivia", "peru"))
```

```
## # A tibble: 2,788 x 20
##     year reporter_iso partner_iso reporter_fullna… partner_fullnam…
##    <int> <chr>        <chr>       <chr>            <chr>           
##  1  2016 chl          arg         Chile            Argentina       
##  2  2016 chl          arg         Chile            Argentina       
##  3  2016 chl          arg         Chile            Argentina       
##  4  2016 chl          arg         Chile            Argentina       
##  5  2016 chl          arg         Chile            Argentina       
##  6  2016 chl          arg         Chile            Argentina       
##  7  2016 chl          arg         Chile            Argentina       
##  8  2016 chl          arg         Chile            Argentina       
##  9  2016 chl          arg         Chile            Argentina       
## 10  2016 chl          arg         Chile            Argentina       
## # … with 2,778 more rows, and 15 more variables: product_code <chr>,
## #   product_code_length <int>, product_fullname_english <chr>,
## #   group_code <chr>, group_name <chr>, export_value_usd <int>,
## #   import_value_usd <int>, export_value_usd_change_1_year <int>,
## #   export_value_usd_change_5_years <int>,
## #   export_value_usd_percentage_change_1_year <dbl>,
## #   export_value_usd_percentage_change_5_years <dbl>,
## #   import_value_usd_change_1_year <int>,
## #   import_value_usd_change_5_years <int>,
## #   import_value_usd_percentage_change_1_year <dbl>,
## #   import_value_usd_percentage_change_5_years <dbl>
```

#### The Observatory of Economic Complexity

Obtain the data:

```r
read_from_oec <- function(p) {
  fromJSON(sprintf("https://atlas.media.mit.edu/hs07/export/2017/chl/%s/show/", p))
}

# you need to know the ISO code to pass a valid destination/partner
# good point: it follows standards
destination <- c("arg", "bol", "per")

oec_data <- map(destination, read_from_oec)
oec_data <- bind_rows(flatten(oec_data))

as_tibble(oec_data)
```

```
## # A tibble: 9,929 x 15
##    dest_id export_val export_val_grow… export_val_grow… export_val_grow…
##    <chr>        <dbl>            <dbl>            <dbl>            <dbl>
##  1 saarg      558931.            0.223            0.277          101763.
##  2 saarg       14013.           -0.86            -0.178          -86169.
##  3 saarg      544918.            0.526            0.338          187931.
##  4 saarg          NA            NA               NA                  NA 
##  5 saarg          NA            NA               NA                  NA 
##  6 saarg          NA            NA               NA                  NA 
##  7 saarg          NA            NA               NA                  NA 
##  8 saarg          NA            NA               NA                  NA 
##  9 saarg          NA            NA               NA                  NA 
## 10 saarg          NA            NA               NA                  NA 
## # … with 9,919 more rows, and 10 more variables:
## #   export_val_growth_val_5 <dbl>, hs07_id <chr>, hs07_id_len <dbl>,
## #   import_val <dbl>, import_val_growth_pct <dbl>,
## #   import_val_growth_pct_5 <dbl>, import_val_growth_val <dbl>,
## #   import_val_growth_val_5 <dbl>, origin_id <chr>, year <dbl>
```

Post-filtering is required at product code depth as there are more observations than the result of Open Trade Statistics (which by default returns standard Harmonized System four digits codes).

One major drawback here is that OEC codes from here doesn't fully respect the Harmonized System. Six digits codes from the OEC are HS four digits code with added digits at the beginning to indicate the category of the product, and this is very confusing provided HS has a six digits list of codes that consists in a more detailed version of four digits codes (i.e. "laptops" versus "laptops, 14 inch screen").

Let's filter with this consideration in mind:

```r
as_tibble(oec_data) %>% 
  filter(hs07_id_len == 6)
```

```
## # A tibble: 2,558 x 15
##    dest_id export_val export_val_grow… export_val_grow… export_val_grow…
##    <chr>        <dbl>            <dbl>            <dbl>            <dbl>
##  1 saarg      558931.            0.223            0.277          101763.
##  2 saarg          NA            NA               NA                  NA 
##  3 saarg          NA            NA               NA                  NA 
##  4 saarg          NA            NA               NA                  NA 
##  5 saarg          NA            NA               NA                  NA 
##  6 saarg          NA            NA               NA                  NA 
##  7 saarg          NA            NA               NA                  NA 
##  8 saarg    41842074.            0.14             0.163         5146236.
##  9 saarg      621080.            1.93            -0.135          409185.
## 10 saarg    20324918.            0.287            0.231         4534606.
## # … with 2,548 more rows, and 10 more variables:
## #   export_val_growth_val_5 <dbl>, hs07_id <chr>, hs07_id_len <dbl>,
## #   import_val <dbl>, import_val_growth_pct <dbl>,
## #   import_val_growth_pct_5 <dbl>, import_val_growth_val <dbl>,
## #   import_val_growth_val_5 <dbl>, origin_id <chr>, year <dbl>
```

#### The Atlas of Economic Complexity

Obtain the data:

```r
read_from_atlas <- function(p) {
  fromJSON(sprintf("http://atlas.cid.harvard.edu/api/data/location/42/hs_products_by_partner/%s/?level=4digit", p))
}

# getting to know these codes required web scraping from http://atlas.cid.harvard.edu/explore
# bad point: it doesn't follow COMTRADE numeric codes (hard to memorize, btw)
destination <- c("8", "31", "173")

atlas_data <- map(destination, read_from_atlas)
atlas_data <- bind_rows(atlas_data[[1]]$data, atlas_data[[2]]$data, atlas_data[[3]]$data)

as_tibble(atlas_data)
```

```
## # A tibble: 59,518 x 6
##    export_value import_value location_id partner_id product_id  year
##           <int>        <int>       <int>      <int>      <int> <int>
##  1        23838       413061          42          8        650  1995
##  2       172477       368650          42          8        650  1996
##  3       146238       310383          42          8        650  1997
##  4        69139       141525          42          8        650  1998
##  5        79711        97951          42          8        650  1999
##  6        85042       392098          42          8        650  2000
##  7       463361       252611          42          8        650  2001
##  8       191069       186278          42          8        650  2002
##  9        88566       106782          42          8        650  2003
## 10       234638       113184          42          8        650  2004
## # … with 59,508 more rows
```

Post-filtering is required at year as there are more years than what was requested:

```r
as_tibble(atlas_data) %>% 
  filter(year == 2016)
```

```
## # A tibble: 2,718 x 6
##    export_value import_value location_id partner_id product_id  year
##           <int>        <int>       <int>      <int>      <int> <int>
##  1       463809      1074354          42          8        650  2016
##  2            0        17189          42          8        655  2016
##  3            0    139638464          42          8        656  2016
##  4            0       507301          42          8        657  2016
##  5            0       212049          42          8        659  2016
##  6            0       124921          42          8        661  2016
##  7            0     20601067          42          8        662  2016
##  8     34454500            0          42          8        667  2016
##  9       211614       724851          42          8        668  2016
## 10     14944704        25975          42          8        669  2016
## # … with 2,708 more rows
```

Now try to compare the three APIs shown above, but extracting data for two years, three reporters and four partners. See how one option remains equally simple while the other two become really complex. In our case it would be just this:

```r
ots_create_tidy_data(
  years = 2016:2017, 
  reporters = c("chl", "per", "arg"), 
  partners = c("bol", "bra", "col", "ury")
)
```

### Shameless pressure to improve highcharter

Joshua is not (yet) a member of rOpenSci, he contributed to cleaning the data back in 2017, but please help me pressing him to send highcharter for reviewing by giving RT to [this tweet](https://twitter.com/pachamaltese/status/1122972995138609158).
