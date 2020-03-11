---
slug: "post-template"
title: Post Title in Title Case
# Delete the package_version line below if your post is not about a package
package_version: 0.1.0
author:
  - Author Name1
  - Author Name2
# Set the date below to the publication date of your post
date: 2020-03-10
# Minimal tags for a post about a community-contributed package 
# that has passed software peer review are listed below
# Consult the Technical Guidelines for information on choosing other tags
tags:
  - Software Peer Review
  - packages
  - R
  - community
# The summary below will be used by e.g. Twitter cards
description: "A very short summary of your post (~ 100 characters)"
# If you have no preferred image for Twitter cards, 
# delete the twitterImg line below
# Note there is no '/' symbol before 'img' here
# if needed replace blog with technotes
twitterImg: blog/2019/06/04/post-template/name-of-image.png
---

This is the Markdown (.md) template for a blog post or tech note. 
To generate your post with R Markdown (.Rmd), use that template instead.

Throughout this template, including the YAML, 
you should change "post-template" to the slug of your post, 
and "2019-06-04" to your publication date.

Save this file under /content/blog/YYYY-MM-DD-slug/index.md in the local copy of your roweb2 fork.

### Section heading in sentence case

Citation of the primary literature[^1]. 

Citation of a website[^2]. 

Citation of an R package[^3].

#### Subsection heading

We recommend the use of [Hugo shortcodes](https://gohugo.io/content-management/shortcodes/) to include images, tweets, videos, gists, etc.

**Add an image** by using a Hugo shortcode. The image is saved under `/content/blog/YYYY-MM-DD-slug/name-of-image.png`.

{{< figure src = "name-of-image.png" width = "400" alt = "this is the alternative text" >}}

Consult the Technical Guidelines for tips on changing image size, alignment, and for advice on alternative text.

**Embed a tweet** by using a Hugo shortcode. 

{{< tweet 1138216112808529920 >}}


**Add citation or footnote** text by using the format below 

[^1]: Sciaini, M., Fritsch, M., Scherer, C., & Simpkins, C. E. (2018). NLMR and landscapetools: An integrated environment for simulating and modifying neutral landscape models in R. Methods in Ecology and Evolution, 9(11), 2240-2248. <https://doi.org/10.1111/2041-210X.13076>
[^2]: Elin Waring, Michael Quinn, Amelia McNamara, Eduardo Arino de la Rubia, Hao Zhu and Shannon Ellis (2019). skimr: Compact and Flexible Summaries of Data. R package version 1.0.7. https://CRAN.R-project.org/package=skimr
[^3]: Hugo static site generator. https://gohugo.io/
