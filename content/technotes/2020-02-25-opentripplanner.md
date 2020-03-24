---
slug: "opentripplanner"
title: "opentripplanner: Fast and Easy Multimodal Trip Planning in R with OpenTripPlanner"
package_version: 0.2.0
date: 2020-02-25
author:
  - Malcolm Morgan
topicid: 1966
tags:
- R
- packages
- transport
- spatial
- geospatial
- routing
- community
- opentripplanner
- Software Peer Review
output: 
  html_document:
    keep_md: true
---




With services like Google Maps, finding the fastest route from A to B has become quick, cheap, and easy. Not just for driving but walking, cycling and public transport too. But in the field of transport studies, we often want not only a single route, but thousands or millions of routes. This is where we hit a problem for services such as Google or the [Open Route Service](https://openrouteservice.org/), that usually only allow a limited number of free routes per day (typically around 1000). So routing is either very time consuming or expensive. Another problem is that we may not be interested in the current travel options, but how those options may change in the future. Such as, after a new bridge has been built or a new bus timetable has been introduced. Therefore, researchers can find it useful to run their own routing services where they have more control and can produce as many routes as necessary. 

The aim of the OpenTripPlanner for R package[^1] to make it easy to set up and use a multimodal trip planner in R. [OpenTripPlanner](https://www.opentripplanner.org/) (OTP) is an open-source multimodal trip planner written in Java. It uses OpenStreetMap for walking, cycling, and driving directions and uses [GTFS](https://developers.google.com/transit/gtfs) files for public timetables. The R package makes it easy to set up and use OpenTripPlanner on your local computer or connect to a server running OpenTripPlanner.

## Prerequisites and Installation 

A full list of the prerequisites and instructions is available in the  [vignettes](https://docs.ropensci.org/opentripplanner/articles/opentripplanner.html), but the key one is that OTP requires Java 8 specifically, not any earlier or later versions. Once you have Java installed,  install the package in the normal way.


```r
install.packages("opentripplanner") 
library(opentripplanner) 
```

## Building your first trip planner

The package comes with demo data for the Isle of Wight, which can be downloaded and built using a few simple commands. For a full explanation, including how to customize your setup and build OTP for other places, see the [vignettes](https://docs.ropensci.org/opentripplanner/articles/opentripplanner.html). 


```r
path_data <- file.path(tempdir(), "OTP") # Make a folder to store the data 
dir.create(path_data)  
path_otp <- otp_dl_jar(path_data)        # Download the OTP 
otp_dl_demo(path_data)                   # Download the demo data 
log1 <- otp_build_graph(otp = path_otp, 
                        dir = path_data) # Built the demo data into a graph 
log2 <- otp_setup(otp = path_otp, 
                  dir = path_data)       # Start OTP 
```

The whole process should only take a few minutes to run, and then the OTP web interface will launch in your browser. You can use the web interface just like any other journey planner, but to get the results into R you need to connect R to the OTP and then make your requests through R.


```r
otpcon <- otp_connect()                 # Connect R to OTP 
route <- otp_plan(otpcon,               # Route between two lon/lat coordinates 
                  fromPlace = c(-1.17502, 50.64590),  
                  toPlace = c(-1.15339, 50.72266),
                  mode = c("WALK","TRANSIT")) 
```

If you have the `tmap` package installed, you can view the route within RStudio. Notice the use of `sf::st_zm(route)`. This is because `tmap` does not currently support XYZ coordinates. 


```r
library(tmap)                           # Load the tmap package 
tmap_mode("view")                       # Set tmap to interactive viewing 
qtm(sf::st_zm(route), lines.lwd = 3, 
    lines.col = "mode")                 # Plot the route on a map 
```


The package supports many more features such as batch routing, isochrones, and geocoding, that are described in the [vignettes](https://docs.ropensci.org/opentripplanner/). There are also instructions on how to set up OTP for any area of the world.

The package has recently passed [peer review](https://github.com/ropensci/software-review/issues/295), so a big thank you to rOpenSci and our reviewers [Brooke Anderson](/authors/brooke-anderson/) and [Kim Fitter](https://github.com/kimnewzealand) for all their help. We are also keen to hear from users about new features that would be useful; please post your ideas to the [issues](https://github.com/ropensci/opentripplanner/issues) page. 

## References

[^1]: Morgan et al., (2019). OpenTripPlanner for R. Journal of Open Source Software, 4(44), 1926, https://doi.org/10.21105/joss.01926
