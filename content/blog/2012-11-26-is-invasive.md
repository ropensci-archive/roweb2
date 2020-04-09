---
slug: is-invasive
title: is.invasive()
date: '2012-11-26'
author: Ignasi Bartomeus
tags:
  - R
  - taxize
  - ecology
---

The following was a guest post from [Ignasi Bartomeus](http://www.bartomeus.cat/es/ignasi/), originally [posted](https://ibartomeus.wordpress.com/2012/11/26/is-invasive/) on [his blog](https://ibartomeus.wordpress.com/) on 26 Nov, 2012. Check out a related blog post [here](https://sckott.github.com/2012/12/is-invasive/). Note the functionality discussed in this post is now in our [taxize](https://github.com/ropensci/taxize_) package under the function [`gisd_isinvasive`](https://github.com/ropensci/taxize_/blob/master/R/gisd_isinvasive.R). We hacked out a quick [Shiny](https://www.rstudio.com/shiny/) app so you can play around with the below function in taxize on the web to get invasive status and plot it on a phylogeny. Check it out [here](http://glimmer.rstudio.com/ropensci/taxize_invasive/).

_____________

## Ignasi Bartomeus

![ignasi](/assets/blog-images/ignasi_bartomeus.png)


Celebrating that I am contributing to the R-bloggers.com blog aggregator I am going to post a very simple function to check which species (both plants and animals) are considered “invaders” somewhere in the world. Basically the function asks that to the [Global Invasive Species Database (GISD)](http://www.issg.org/database/welcome/).

I coded this because a friend of mine aks me precisely that question [Yes, friends assumes you should know this kind of stuff (and also why the plants of their balcony are dying) off the top of your head just because you are a biologist]. However, I do not know much things and I am too lazy to check all 250 species one by one on the GISD webpage. Also is a good R practice, and I am ok investing some work time on personal projects. Google (and other big companies) encourage it’s employees to spend 20% of the time working on projects that aren’t necessarily in their job descriptions in order to bust its innovation power, so that should be even more important in science!

Hope it can be useful to more people, I uploaded the code as a Gist:

{{< gist ibartomeus 4136068 >}}


UPDATE: The function is now available on [taxize R package](https://github.com/ropensci/taxize/) developed by the rOpenSci people!

___________
