---
slug: text-commmunity
title: Community conversations and a new package for full text
date: '2014-08-08'
author:
  - Scott Chamberlain
  - Karthik Ram
tags:
  - R
  - community
---

__UPDATE:__ Use the new discussion forum at https://discuss.ropensci.org/

## Community

Community is at the heart of rOpenSci. We couldn't have accomplished most of our work without help from various [contributors and users](/community/#community).

Most of our discussions with the broader community over the past year have been through twitter or one-on-one conversations. However, we would like to foster more open ended and deeper discussions with our community. To this end, we are resurrecting our [public Google group list](https://groups.google.com/forum/#!forum/ropensci-discuss). We encourage you to sign up and post ideas for packages, solicit feedback on new ideas, and most importantly find other collaborators who share your domain interests. We also plan to use the list to solicit feedback on some of the bigger rOpenSci projects early on in the development phase allowing our community to shape future direction and also collaborate where appropriate.

The mailing list would be appropriate for a broad array of discussions, including:

* Questions about any of our R packages, including questions like "How do I make this function do XYZ..." to "I'm getting an error with this package or function...". However, we will likely direct more basic R questions back to StackOverflow.
* Announcements of what you've done with our software or any papers where you might have used them. Sharing your new use cases or publications (even pre publications) is a great way to get others involved.
* Questions or thoughts about the future of rOpenSci. Do you want to see a package do XYZ in the future? Do you want a new package to do ABC in the future?

Sign up for our mailing list, ask questions, and help make this a strong community. The mailing list: [https://groups.google.com/forum/#!forum/ropensci-discuss](https://groups.google.com/forum/#!forum/ropensci-discuss)

## Text

Through time we have been attempting to unify our R packages that interact with individual data sources into single packages that handle one use case. For example, [spocc](https://github.com/ropensci/spocc) aims to create a single entry point to many different sources (currently 6) of species occurrence data, including [GBIF](https://www.gbif.org/), [AntWeb](https://www.antweb.org/), and others.

Another area we hope to simplify is acquiring text data, specifically text from scholarly journal articles. We call this R package `fulltext`. The goal of `fulltext` is to allow a single user interface to searching for and retrieving full text data from scholarly journal articles. Rather than learning a different interface for each data source, you can learn one interface, making your work easier. `fulltext` will likely only get you data, and make it easy to browse that data, and use it downstream for manipulation, analysis, and vizualization.

We currently have R packages for a number of sources of scholarly article text, including for [Public Library of Science (PLOS)](https://github.com/ropensci/rplos), [Biomed Central (BMC)](https://github.com/ropensci/bmc), and [ eLife](https://github.com/ropensci/elife) - which could all be included in `fulltext`. We can add more sources as they become available.

Instead of us rOpenSci core members planning out the whole package, we'd love to get the community involved at the beginning.


* What _use cases_ should we include in this package?
* What data sources should/can be included?
* What are packages that you'd use after getting data with `fulltext`? We can try to make it easy to use data from `fulltext` in your favorite packages for analysis/visualization.
* Any other thoughts are welcome.

This is where we tie in the mailing list above: Please do use the mailing list to let us know what you think. We can then elevate items to the [issue tracker for the package](https://github.com/ropensci/fulltext/issues) on Github as needed.
