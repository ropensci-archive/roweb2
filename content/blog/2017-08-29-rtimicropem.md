---
slug: rtimicropem
title: 'rtimicropem: Using an *R* package as platform for harmonized cleaning of data
  from RTI MicroPEM air quality sensors'
date: '2017-08-29'
authors:
  - Maëlle Salmon
categories: blog
tags:
  - R
  - community
  - software
  - Software Peer Review
  - hardware
  - ropenaq
  - data extraction
  - earth science
---

As you might remember from [my blog post about `ropenaq`](/blog/2017/02/21/ropenaq), I work as a data manager and statistician for an [epidemiology project called CHAI](http://www.chaiproject.org/) for Cardio-vascular health effects of air pollution in Telangana, India. One of our interests in CHAI is determining exposure, and sources of exposure, to PM2.5 which are very small particles in the air that have diverse adverse health effects. You can find more details about CHAI [in our recently published protocol paper](https://www.ncbi.nlm.nih.gov/pubmed/28606699). In this blog post that partly corresponds to the content of [my useR! 2017 lightning talk](http://sched.co/AxrS), I'll present a package we wrote for dealing with the output of a scientific device, which might remind you of similar issues in your experimental work.

### Why write the rtimicropem package?

![](/assets/blog-images/2017-08-29-rtimicropem/Allequipment_Frontview_cropped.jpg)

Part of the CHAI project is a panel study involving about 40 people wearing several devices, as you see above. The devices include a GPS, an accelerometer, a wearable camera, and a PM2.5 monitor outputting time-resolved data (the grey box on the left). Basically, with this device, the RTI MicroPEM, we get one PM2.5 exposure value every 10 seconds. This is quite exciting, right? Except that we have two main issues with it...

![](/assets/blog-images/2017-08-29-rtimicropem/screenshot_output2.png)

First of all, the output of the device, a file with a ".csv" extension corresponding to a session of measurements, in our case 24 hours of measurements, is not really a csv. The header contains information about settings of the device for that session, and then comes the actual table with measurements.

Second, since the RTI MicroPEMs are nice devices but also a work-in-progress, we had some problems with the data, such as negative relative humidity. Because of these issues, we decided to write an R package whose three goals were to:

* Transform the output of the device into something more usable.
* Allow the exploration of individual files after a day in the field.
* Document our data cleaning process.

We chose R because everything else in our project, well data processing, documentation and analysis, was to be implemented in R, and because we wanted other teams to be able to use our package.

### Features of `rtimicropem`: transform, explore and learn about data cleaning

First things first, our package lives [here](https://github.com/ropensci/rtimicropem) and is [on CRAN](https://cran.r-project.org/web/packages/rtimicropem/index.html). It has a [nice documentation website](https://docs.ropensci.org/rtimicropem/) thanks to [`pkgdown`](https://github.com/hadley/pkgdown).

### Transform and explore single files

In `rtimicropem` after the use of the `convert_output` function, one gets an object of the R6 class `micropem` class. Its fields include the settings and measurements as two `data.frames`, and it has methods such as `summary` and `plot` for which you see the static output below (no unit on this exploratory plot).

![](/assets/blog-images/2017-08-29-rtimicropem/plotexample.png)

The plot method can also outputs an interactive graph thanks to [`rbokeh`](http://hafen.github.io/rbokeh/).

While these methods can be quite helpful to explore single files as an R user, they don't help non R users a lot. Because we wanted members of our team working in the field to be able to explore and check files with no R knowledge, we created a Shiny app that allows to upload individual files and then look at different tabs, including one with a plot, one with the summary of measurements, etc. This way, it was easy to spot a device failure for instance, and to plan a new measurement session with the corresponding participant.

### Transform a bunch of files

At the end of the CHAI data collection, we had more than 250 MicroPEM files. In order to prepare them for further processing we wrote the `batch_convert` function that saves the content of any number of MicroPEM files as two (real!) csv, one with the measurements, one with the settings.

### Learn about data cleaning

As mentioned previously, we experienced issues with MicroPEM data quality. Although we had heard other teams complain of similar problems, in the literature there were very few details about data cleaning. We decided to gather information from other teams and the manufacturer and to document our own decisions, e.g. remove entire files based on some criteria, in a [vignette of the package](https://docs.ropensci.org/rtimicropem/articles/chai_data_cleaning.html). This is our transparent answer to the question "What was your experience with MicroPEMs?" which we get often enough from other scientists interested in PM2.5 exposure.

### Place of rtimicropem in the R package ecosystem

When preparing `rtimicropem` submission to rOpenSci, I started wondering whether one would like to have one R package for each scientific device out there. In our case, having the weird output to deal with, and the lack of a central data issues documentation place, were enough of a motivation. But maybe one could hope that manufacturers of scientific devices would focus a bit more on making the output format analysis-friendly, and that the open documentation of data issues would be language-agnostic and managed by the manufacturers themselves. In the meantime, we're quite proud to have taken the time to create and share our experience with `rtimicropem`, and have already heard back from a few users, including one who found the package via googling "RTI MicroPEM data"! Another argument I in particular have to write R packages for dealing with scientific data is that it might motivate people to learn R, but this is maybe a bit evil.

What about the place of `rtimicropem` in the rOpenSci package collection? After [very useful reviews](https://github.com/ropensci/software-review/issues/126) by [Lucy D'Agostino McGowan](https://github.com/LucyMcGowan) and [Kara Woo](https://github.com/karawoo) our package got onboarded which we were really thankful for and happy about. Another package I can think off the top of my head to deal with the output of a scientific tool is [`plater`](/blog/2017/02/06/plater-blog-post). Let me switch roles from CHAI team member to rOpenSci onboarding co-editor here and do some advertisement... Such packages are unlikely to become the new `ggplot2` but their specialization doesn't make them less useful and they fit very well in the "data extraction" of the [onboarding categories](https://devguide.ropensci.org/policies.html#package-categories). So if you have written such a package, please consider submitting it! It'll get better thanks to review and might get more publicity as part of a larger software ecosystem. For the `rtimicropem` submission we took advantage of the joint submission process of rOpenSci and the Journal of Open Source Software, JOSS, so now our piece of software has [its JOSS paper with a DOI](http://joss.theoj.org/papers/7ead5e9a445da3e885d99247c5d6e58e). And hopefully, having more submissions of packages for scientific hardware might inspire R users to package up the code they wrote to use the output of their scientific tools!



