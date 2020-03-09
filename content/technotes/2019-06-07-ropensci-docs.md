---
slug: ropensci-docs
title: 'Introducing the new rOpenSci docs server'
date: '2019-06-07'
author:
  - Jeroen Ooms
topicid: 1729
tags:
  - R
  - docs
  - packages
---

As part of our continuous effort to improve rOpenSci infrastructure, we are rolling out a new service to automatically build and host documentation for all rOpenSci packages. 

![drakedocs](https://i.imgur.com/r68Ukiw.png)

The webpages are generated using the popular [pkgdown](https://pkgdown.r-lib.org/) system with our [rOpenSci template](https://github.com/ropensci/rotemplate), and get automatically published on https://docs.ropensci.org/. Some examples:

 - https://docs.ropensci.org/drake/
 - https://docs.ropensci.org/magick/
 - https://docs.ropensci.org/writexl/
 - https://docs.ropensci.org/stplanr/
 - https://docs.ropensci.org/osmdata/
 - https://docs.ropensci.org/visdat/
 - https://docs.ropensci.org/tesseract/

We intend this to become the central place to find documentation for rOpenSci packages. We are still rolling this out so not all packages are there yet, but the majority is online now.


### Zero setup required

What do you need to do as an rOpenSci package maintainer to set this up? Nothing! Each commit to the master branch of your repository automatically triggers a build on our new development server. We do not generate documentation for feature branches and pull requests, only for master.

![commit](https://i.imgur.com/NP3gkhE.png)

To check your build logs, click the checkmark behind the commit in your Github repository. There will be a new build status `ropensci/pkgdown` that links to the build log for that commit. If the build is failing and you can't figure out the problem from the logs, please get in touch.

![dashboard](https://i.imgur.com/LrjUNCE.png)

You can also check out the dashboard at https://dev.ropensci.org/ to see status and build histories from all rOpenSci packages. 

### Testing and customizing your site

Our build server uses the standard pkgdown functions to generate the docs; we only override the URL and theming. To test your site locally, install our theme and then render your site with pkgdown:

```r
# Install the rOpenSci theme
remotes::install_github("ropensci/rotemplate")

# Run in your package directory to build the site:
template <- list(package = "rotemplate")
pkgdown::build_site(override = list(template = template))
``` 

To customize the site you can use any of the standard options in the `_pkgdown.yml` file as described in the pkgdown documentation. If you already had a pkgdown site, the system will automatically use your existing `_pkgdown.yml` file. You can also have a look at pkgdown configs from [other packages](https://github.com/search?q=org%3Aropensci+filename%3A_pkgdown.yml).

### In Conclusion

We hope that the documentation server will become a valuable resource to rOpenSci package users and maintainers. All rOpenSci packages get a canonical URL with a beautiful up-to-date homepage, vignettes, and manual pages, without the need for complicated travis hooks and deploy keys.

Moreover, documentation hosted on `docs.ropensci.org` will benefit from the joined pagerank for this domain which boosts the position on Google and other search engines. Hence by centralizing, we simultaneously increase the visibility and reduce maintenance work for rOpenSci packages.

If this works well, we plan to experiment with more new infrastructural services to support rOpenSci ecosystem, with the goal of making it easier to find, use, and maintain our software.
