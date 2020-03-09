---
slug: writexl-release
title: 'The writexl package: zero dependency xlsx writer for R'
date: '2017-09-08'
author:
  - Jeroen Ooms
topicid: 859
tags:
  - R
  - packages
  - software
  - excel
  - xlsx
---

We have started working on a new rOpenSci package called [writexl](https://github.com/ropensci/writexl#readme). This package wraps the very powerful [libxlsxwriter](https://libxlsxwriter.github.io/) library which allows for exporting data to Microsoft Excel format.

The major benefit of writexl over other packages is that it is completely written in C and has absolutely zero dependencies. No Java, Perl or Rtools are required.

## Getting Started

The `write_xlsx` function writes a data frame to an xlsx file. You can test that data roundtrips properly by reading it back using the readxl package. Columns containing dates and factors get automatically coerced to character strings.

```r
library(writexl)
library(readxl)
write_xlsx(iris, "iris.xlsx")

# read it back
out <- read_xlsx("iris.xlsx")
```

You can also give it a named list of data frames, in which case each data frame becomes a sheet in the xlsx file:

```r
write_xlsx(list(iris = iris, cars = cars, mtcars = mtcars), "mydata.xlsx")
```

Performance is good too; in our benchmarks writexl is about twice as fast as openxlsx:

```r
library(microbenchmark)
library(nycflights13)
microbenchmark(
  writexl = writexl::write_xlsx(flights, tempfile()),
  openxlsx = openxlsx::write.xlsx(flights, tempfile()),
  times = 5
)
### Unit: seconds
###      expr       min        lq      mean    median        uq       max neval
###   writexl  8.884712  8.904431  9.103419  8.965643  9.041565  9.720743     5
###  openxlsx 17.166818 18.072527 19.171003 18.669805 18.756661 23.189206     5
```


## Roadmap

The initial version of writexl implements the most important functionality for R users: exporting data frames. However the underlying [libxlsxwriter](https://libxlsxwriter.github.io/) library actually provides far more sophisticated functionality such as custom formatting, writing complex objects, formulas, etc.

Most of this probably won't be useful to R users. But if you have a well defined use case for exposing some specific features from the library in writexl, [open an issue](https://github.com/ropensci/writexl/issues) on Github and we'll look into it!

