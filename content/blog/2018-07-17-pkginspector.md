---
slug: pkginspector
title: What's inside? pkginspector provides helpful tools for inspecting package contents
preface: This post describes a project from rOpenSci unconf18. In the spirit of exploration
  and experimentation at our unconferences, projects are not necessarily finished
  products or in scope for rOpenSci packages.
author:
  - Sam Albers
  - Leonardo Collado-Torres
  - Mauro Lepore
  - Joyce Robbins
  - Noam Ross
  - Omayma Said
date: '2018-07-17'
topicid: 1262
tags:
  - community
  - R
  - Software Peer Review
  - packages
  - unconf
  - unconf18
---

{{< figure class="center" src="img/blog-images/2018-07-17-pkginspector/pkginspector_hex_sticker.png" alt="pkginspector hex sticker" width=300 >}}

R packages are widely used in science, yet the code behind them often does not come under scrutiny. To address this lack, rOpenSci has been a pioneer in developing a peer review process for R packages. The goal of [`pkginspector`](https://github.com/ropenscilabs/pkginspector/) is to help that process by providing a means to better understand the internal structure of R packages. It offers tools to analyze and visualize the relationship among functions within a package, and to report whether or not functions' interfaces are consistent. If you are reviewing an R package (maybe your own!), [`pkginspector`](https://github.com/ropenscilabs/pkginspector/) is for you.

We began building [`pkginspector`](https://github.com/ropenscilabs/pkginspector/) during [unconf18](https://unconf18.ropensci.org/), with support from [rOpenSci](/) and guidance from [Noam Ross](https://github.com/noamross). The package focuses on facilitating a few of the many tasks involved in reviewing a package; it is one of a collection of packages, including [`pkgreviewr`](https://github.com/ropenscilabs/pkgreviewr) (rOpenSci) and [`goodpractice`](https://github.com/MangoTheCat/goodpractice), among others, that are devoted to this project. (The division of labor among these packages is [under discussion](https://github.com/ropenscilabs/pkginspector/issues/18)). If you're not familiar with rOpenSci's package review process, ["How rOpenSci uses Code Review to Promote Reproducible Science"](/blog/2017/09/01/nf-softwarereview/) provides context. 

&nbsp;

### Function calls

`rev_fn_summary()` helps you analyze function calls. It takes a package path and returns a table of information about its functions. Consider this example included in [`pkginspector`](https://github.com/ropenscilabs/pkginspector/):


```r
# devtools::install_github("ropenscilabs/pkginspector")
library(pkginspector)
path <- pkginspector_example("viridisLite")
rev_fn_summary(path)
```

```
##       f_name
## 1    cividis
## 2    inferno
## 3      magma
## 4     plasma
## 5    viridis
## 6 viridisMap
##                                                                     f_args
## 1               cividis (n, alpha = 1, begin = 0, end = 1, direction = 1) 
## 2               inferno (n, alpha = 1, begin = 0, end = 1, direction = 1) 
## 3                 magma (n, alpha = 1, begin = 0, end = 1, direction = 1) 
## 4                plasma (n, alpha = 1, begin = 0, end = 1, direction = 1) 
## 5 viridis (n, alpha = 1, begin = 0, end = 1, direction = 1, option = "D") 
## 6      viridisMap (n = 256, alpha = 1, begin = 0, end = 1, direction = 1, 
##   calls called_by dependents
## 1     1         0          0
## 2     1         0          0
## 3     1         0          0
## 4     1         0          0
## 5     0         4          4
## 6     0         0          0
```



The example shows that the number of functions called by `cividis()`, `inferno()`, `magma()` and `plasma()` is 1, 1, 1 and 1, and that these functions are called by 0, 0, 0 and 0 functions. `viridis()`, in contrast, calls 0 functions but is called by 4 functions. In this case, the number of `dependents` is 4. Dependents are counted recursively and include any functions in the calling chain. For example, if A calls B and B calls C, we would say that C is called by 1 (B) but has 2 dependents (A & B). `rev_fn_summary()` also provides information about function parameters in the `f_args` column.

*What's not working:* We know that we miss function calls if they are passed as parameters to `purrr::map()` and `do.call()` functions. There may be other systematic misses as well.

&nbsp;

### Visualization

`vis_package()` helps you visualize the network of functions' dependencies ([interactive example](https://rpubs.com/jtr13/vis_package)).


```r
vis_package(path, physics = FALSE)
```

![vis_package screenshot](img/blog-images/2018-07-17-pkginspector/viridisLite.png)
  
  

### Argument default usage

`rev_args()` identifies all the functions' arguments used in a given package. It returns a dataframe whose main column, `default_consistent`, indicates whether or not the default value of the argument is consistent across the functions that use it. This helps to evaluate the complexity of the package and to identify potential sources of confusion, for example, if the meaning or default value of the same argument varies across functions.


```r
rev_args(path)$arg_df
```

```
##    arg_name n_functions default_consistent default_consistent_percent
## 1         n           6              FALSE                   83.33333
## 2     alpha           6               TRUE                  100.00000
## 3     begin           6               TRUE                  100.00000
## 4       end           6               TRUE                  100.00000
## 5 direction           6               TRUE                  100.00000
## 6    option           2               TRUE                  100.00000
```

The example shows that the parameter `n` is used inconsistently. A look at the [`viridisLite` code](https://github.com/sjmgarnier/viridisLite/blob/master/R/viridis.R) reveals that the default value of `n` is 256 in one function but missing in all others. This flags a potential issue that deserves further investigation. In this case, the odd function out - `viridisMap()` - has a clear use case that is different from the others.  
  
  
&nbsp;     

### In sum

If you are building or reviewing an R package, [`pkginspector`](https://github.com/ropenscilabs/pkginspector/) can help you better understand its complex structure. This is an important step towards improving your code and research. While [`pkginspector`](https://github.com/ropenscilabs/pkginspector/) will expand in scope, the features built during and since unconf18 are already useful. For example, if you've tried sketching out the relationship among functions in a package with pencil and paper, you will appreciate the ability to call `vis_package()` to create a network diagram.

Our broader vision for [`pkginspector`](https://github.com/ropenscilabs/pkginspector/) is a tool that guides both the development and review of R packages and provides automated checks on subtle differences in package functions that inevitably arise during the development process. The package will (hopefully) grow and exist as a living toolbox for development and review. If you have ideas for tools that could be added to [`pkginspector`](https://github.com/ropenscilabs/pkginspector/) to facilitate the process of reviewing a package, we encourage you to open an [issue](https://github.com/ropenscilabs/pkginspector/issues). 
