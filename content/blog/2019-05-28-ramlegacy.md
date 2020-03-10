---
slug: "ramlegacy"
title: "ramlegacy: a package for RAM Legacy Database"
package_version: 0.2.0
author:
  - Kshitiz Gupta
  - Carl Boettiger
date: '2019-05-28'
topicid: 1715
tags:
- Software Peer Review
- R
- community
- software
- packages
- ramlegacy
- marine biology
- fisheries
- stock assessment
- data access
- biodiversity
---

## Introduction

ramlegacy is a new R package to download, cache and read in all the different versions of the  [RAM Legacy Stock Assessment Database](https://www.ramlegacy.org/), a public database containing stock assessment results of commercially exploited marine populations from around the world. The package accomplishes all this by:

* Providing a function `download_ramlegacy()`, to download all the available versions of the RAM Database and cache them on the user’s computer in a location provided by the [rappdirs](https://cran.r-project.org/web/packages/rappdirs/index.html) package. This way once a version has been downloaded it doesn’t need to be re-downloaded for subsequent analysis.
* Supporting reading in specified tables or all tables from a cached version of the database through the function `load_ramlegacy()`
* Providing a function `ram_dir()` to view the path of the rappdirs location where the downloaded database was cached.

The primary motivation behind developing the caching behavior of the package was to save the user time and effort spent in re-downloading different versions of the database as part of any future analysis.

ramlegacy been tested and peer reviewed thanks to rOpenSci and is now released on CRAN, making this an ideal time to present the package to the world. For installation and the code, see its [home](https://github.com/ropensci/ramlegacy) in rOpenSci, and the package documentation at its [website](https://docs.ropensci.org/ramlegacy/).

In this post, we’ll talk a little bit about the package development process we went through for ramlegacy.

## Package Development Process

When we first started developing ramlegacy in September 2018, the different versions of the database were all hosted on a WordPress website created by the RAM maintainers. The package back then was using that WordPress website as download source for all those versions. However, shortly after v4.3 was released the older versions (v1.0, v2.0, v2.5, v3.0) became unavailable on the WordPress website. We believed it was important for the package to continue providing access to the aforementioned older versions because, among other reasons, it would enable the users to reproduce dozens of high profile papers based on those older versions; for example [this one](https://doi.org/10.1126/science.aau1758) recently appearing in Science uses the v3.0 data. Consequently, we decided to host the older versions of the database at a GitHub assets [repo](https://github.com/kshtzgupta1/ramlegacy-assets) making sure we appropriately acknowledged and licensed the data.

As we realized how important a stable data source was for the package’s robustness we began a dialogue with the RAM Maintainers about moving all the versions of the database to a more permanent DOI-backed repository. Soon after, the RAM Team released three new versions (v4.40, v4.41, v4.44) on Zenodo, a general-purpose open-access repository developed under the European OpenAIRE program and operated by CERN. Zenodo allows researchers to deposit data sets, research software, reports, and any other research related digital artifacts for free. Moreover, it supports [DOI versioning](https://blog.zenodo.org/2017/05/30/doi-versioning-launched/) which makes it perfect for a database like RAM Legacy which has multiple versions. Since any data you submit to Zenodo is stored in the CERN Data Center and in the highly unlikely event of its closing Zenodo guarantees that it will migrate all content to other suitable repositories, it is a very stable and reliable data source. The RAM maintainers’ decision to migrate to Zenodo was a great step in ensuring constant access to the RAM Legacy data. However the migration process is not all up to speed yet and all the versions older than v4.4 are not yet on Zenodo. Ideally, the older versions would also be on Zenodo so that the package has a direct official line to the data. Based on our discussions with them, we are hopeful the RAM Legacy team will eventually post those, but it is hard to know exactly when. In the meantime while  the package now downloads the newer versions from Zenodo DOIs it has to continue relying on the backup GitHub repository for the older versions.

After ensuring that ramlegacy had a stable data source that was not constantly moving we set out to optimize the process of reading in the data after it’s been downloaded and cached on user’s computer. `load_ramlegacy` is the package function that allows the user to load table(s) from any specified version of the database. In the beginning in order to make the loading efficient we designed `load_ramlegacy` so that calling for a specified version would use `delayed_assign` to make all the dataframes within that version available in the user’s global environment. Additionally, we edited zzz.R to overload `library(ramlegacy)` so that it not only loaded the package but also called `load_ramlegacy` directly to load all the tables of the desired version. Later, our discussion with the reviewers helped us realize that overloading the `library` call would constrain the future development of the package as future may entail functionality outside the database. Plus this loading behaviour was outside what a user would expect from a typical `library` call. Finally we thought it best to give the users the ultimate control over where and when the data actually gets loaded so now only `load_ramlegacy` does the loading of data by returning a list of requested tables instead of delayed assigning all of them to the user’s global environment.

## Related Works

Sean Anderson has a namesake package that downloads the Microsoft Access version and converts it to a local sqlite3 database. Similar to Sean Anderson’s package, Jamie Ashander’s R package seems to be an R interface for the Microsoft Access version of the RAM Database and provides a set of functions using RPostgreSQL to connect to the database. Unfortunately, their packages no longer work in their current state, as they still point to the WordPress URLs which are now defunct and would need to be replaced with the Zenodo DOIs. This again highlights the need for a transparent and relible data source for a data access package especially when that data has to reside outside of the package as is the case with ramlegacy.

## Conclusion

ramlegacy was developed to improve access to the RAM Legacy Stock Assessment Database by downloading, caching and loading the database according to user’s requirements. Hopefully, this post has been helpful in understanding how packages rely on data sources being stable and why it is important for package developers to establish a direct dialogue with the data providers if the data distribution method is unreliable and opqaue. Finally, thanks to rOpenSci’s [Brooke Anderson](/authors/brooke-anderson/), [Sam Albers](/authors/sam-albers/), and [Jamie Afflerbach](https://github.com/jafflerbach) for a great [review process](https://github.com/ropensci/software-review/issues/264)! We really appreciated the time and effort they put into suggesting all the important changes to the package.
