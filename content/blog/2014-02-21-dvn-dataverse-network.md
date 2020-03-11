---
slug: dvn-dataverse-network
title: dvn - Sharing Reproducible Research from R
date: '2014-02-20'
author:
  - Thomas J. Leeper
tags:
  - R
  - API
  - reproducible research
  - data
  - archiving
---


Reproducible research involves the careful, annotated preservation of data, analysis code, and associated files, such that statistical procedures, output, and published results can be directly and fully replicated. As the push for reproducible research has grown, the R community has responded with an increasingly large set of tools for engaging in reproducible research practices (see, for example, the [ReproducibleResearch Task View](https://cran.r-project.org/web/views/ReproducibleResearch.html) on CRAN). Most of these tools focus on improving one's own workflow through closer integration of data analysis and report generation. But reproducible research also requires the persistent - and perhaps indefinite - storage of research files so that they can be used to recreate or modify future analyses and reports.

It is therefore critical that R include functionality for the persistent storage of reproducible research files. And I'm pleased to announce here that the **dvn** package ([CRAN](https://cran.r-project.org/web/packages/dvn/index.html), [GitHub](https://github.com/ropensci/dvn)) has now been integrated into the rOpenSci project. **dvn** provides simple, programmatic access to [The Dataverse Network Project](http://thedata.org/), an open-source data archive project created by Harvard University's [Institute for Quantitative Social Science](https://www.iq.harvard.edu/). Full details about **dvn** are forthcoming in [The R Journal](https://journal.r-project.org/), and this post provides a basic overview of the package's core functionality.

Note that rOpenSci has already created the rFigShare package ([CRAN](https://cran.r-project.org/web/packages/rfigshare/index.html), [GitHub](https://docs.ropensci.org/rfigshare/)), which allows users to upload files to [fishare](https://figshare.com/). Together, these packages give R users an array of tools to enhance the reproducible research workflow and extend it publicly and permanently for the benefit of future scientists.

## Installing the package

A stable version of the package (0.3.3) is now available on CRAN.

```
install.packages("dvn")
```

or you can install the latest development version from GitHub:

```r
library("devtools")
install_github("ropensci/dvn")
```

## Creating a dataverse and archiving files

Creating a Dataverse Network account is simple. Just visit a Dataverse Network, such as [The Harvard Dataverse Network](https://thedata.harvard.edu/dvn/), click "Create Account," and open a personal dataverse. From there, one can easily create studies, populate them with metadata and files, and release them to the public.

To get started, simply load **dvn**, pick a Dataverse Network (the one you created an account through), and load your username and password.

```r
library("dvn")
options(dvn = 'https://thedata.harvard.edu/dvn/')
options(dvn.user = "username")
options(dvn.pwd = "password")
```

Creating a study requires supplying basic metadata that will allow users to find the study. At a minimum, this includes the title for the study, but many other fields are allowed (see `? dvBuildMetadata`). The metadata need to be written in Dublin Core XML, so a helper function `dvBuildMetadata` can be used to easily write metadata fields to an appropriate format:

```r
m <- dvBuildMetadata(title = "My Study")
```

This metadata can then be used to create a new study within a named dataverse. When you initially create an account, you only have a personal dataverse but you can also create additional dataverses (through the web interface) for specific projects or institutions. Thus `dvCreateStudy` requires you to supply the name of the dataverse where you want to create a study:

```r
s <- dvCreateStudy("mydataverse", m)
```

Once a study is created, you simply need to add files, such as code, data, etc. using `dvAddFile`. This can be done in a number of ways, including uploading all files in a .zip directory, uploading a vector of named files, or even uploading a dataframe that is currently open in R. An optional `category` argument can be used to organize the uploaded files into categories.

```r
# add files and release study using `objectid`
dvAddFile(s, "mydata.zip", category="Data")

# or add multiple files:
dvAddFile(s, c("analysis1.R", "analysis2.R"), category="Code")

# or add R dataframes as files:
mydf <- data.frame(x = 1:10, y = 11:20)
dvAddFile(s, dataframe = "mydf")
```

With files uploaded, making the study publicly available is as easy as:

```r
dvReleaseStudy(s)
```

Before releasing a study, it is possible to add (`dvAddFile`) or delete files (`dvDeleteFile`) or change the metadata associated with the file using `dvEditStudy`. You can also delete the entire study using `dvDeleteStudy`. Once released, the study is version-controlled. Any changes made after a release put the study in "DRAFT" mode and the study needs to be released again for those changes to be publicly visible. A released study cannot be deleted but public access to its contents can be revoked using `dvDeleteStudy` (its DOI will point to a page noting the study was deaccessioned).

At any point in the process, `dvStudyStatement` can be used to retrieve a quick overview of the study's status, metadata, and contents:

```r
dvStudyStatement('hdl:1902.1/17864')
Study author:  James Druckman (Northwestern University); Jordan Fein (Northwestern University); Thomas Leeper (Northwestern University)
Study title:   Replication data for: A Source of Bias in Public Opinion Stability
ObjectId:      hdl:1902.1/17864
Study URI:     https://thedata.harvard.edu/dvn/api/data-deposit/v1/swordv2/edit/study/hdl:1902.1/17864
Last updated:  2013-07-27T10:54:30.200Z
Status:        RELEASED
Locked?        false
Files:
  src
1 https://thedata.harvard.edu/dvn/api/data-deposit/v1/swordv2/edit-media/file/2340116/Codebook2011-05-04.doc
2 https://thedata.harvard.edu/dvn/api/data-deposit/v1/swordv2/edit-media/file/2309028/Data.tab
3 https://thedata.harvard.edu/dvn/api/data-deposit/v1/swordv2/edit-media/file/2341890/Articles.doc
4 https://thedata.harvard.edu/dvn/api/data-deposit/v1/swordv2/edit-media/file/2341891/Questionnaire.doc
  type                      updated                  fileId
1 application/msword        2014-02-19T10:18:53.486Z 2340116
2 text/tab-separated-values 2014-02-19T10:18:53.487Z 2309028
3 application/msword        2014-02-19T10:18:53.488Z 2341890
4 application/msword        2014-02-19T10:18:53.489Z 2341891
```


And `dvUserStudies` can retrieve a listing of all studies in one's dataverse:

```r
dvUserStudies('leeper')
DV Title:      Thomas J. Leeper
DV name:       leeper
Released?      true
Generated by:  http://www.swordapp.org/ 2.0
Studies:
  title
1 Possible R ingest bug
2 Replication data for: A Source of Bias in Public Opinion Stability
3 Replication data for: The Informational Basis for Mass Polarization
4 Replication data for: Self-Interest and Attention to News among Issue Publics
5 Replication data for: Learning More from Political Communication Experiments: The Importance of Pretreatment Effects
6 Replication data for: Doing What Others Do:  Norms, Science, and Collective Action on Global Warming
7 Consequences of Selective Exposure for Political Engagement
  objectId
1 hdl:1902.1/LNEOX
2 hdl:1902.1/17864
3 hdl:1902.1/21964
4 hdl:1902.1/17863
5 hdl:1902.1/17218
6 hdl:1902.1/18249
7 hdl:1902.1/17865
```

## Search for archived studies

In addition to creating and managing dataverse studies, **dvn** also allows users to search a Dataverse Network for existing studies and download metadata. We can search by a number of metadata fields (the allowed fields are retrievable via `dvSearchField`):

```r
# specify a Dataverse Network
options(dvn = 'https://thedata.harvard.edu/dvn/')

# search by author name
dvSearch(list(authorName = "leeper"))

# search by title using a boolean OR logic
dvSearch(list(title = "Denmark", title = "Sweden"), boolean = "OR")

# search all fields
dvSearch("Tobacco")
```

A search returns a list of `objectId` values, handles or DOIs that provide a global pointer to a particular study. Using an `objectId` one can gather detailed study metadata in Data Documentation Initiative format (the default), Dublin Core, or possibly other formats (the list is exanding). Here's an example:

```r
# return DDI (by default)
dvMetadata("hdl:1902.1/21964")

# return Dublic Core
dvMetadata("hdl:1902.1/21964", format.type="oai_dc")
```

In either case the result is an XML file, as a single character string. The metadata can be extensive, and are therefore better viewed outside of R. But a few wrapper functions allow one to view critical parts of the metadata, such the listing of files stored in a study:

```r
files <- dvExtractFileIds(dvMetadata("hdl:1902.1/21964"))
files[, c('fileName', 'fileId')]
                          fileName  fileId
1    study2-replication-analysis.r 2341713
2    study1-replication-analysis.r 2341709
3                      coefpaste.r 2341888
4                     expResults.r 2341889
5            Study 2 Codebook.docx 2341712
6 study2-data-final-2012-06-08.csv 2341711
7 study1-data-final-2012-06-08.csv 2341710
8             Study 2 Webpages.zip 2341714
9             Study 1 Webpages.zip 2341715
```

Generally, files cannot be directly downloaded into R because of Terms of Use restrictions currently placed on studies. In the future this may change, so **dvn** provides forward-compatible functions `dvDownloadInfo` and `dvDownload` to check whether files can be downloaded and to perform the download if allowed, respectively.
