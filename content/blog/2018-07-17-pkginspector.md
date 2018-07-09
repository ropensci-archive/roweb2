---
slug: "pkginspector"
title: "What's inside? __pkginspector__ provides helpful tools for inspecting package contents"
preface: "This post describes a project from rOpenSci unconf18. In the spirit of exploration and experimentation at our unconferences, projects are not necessarily finished products or in scope for rOpenSci packages."
authors:
    
  - name: Sam Albers
    url: https://github.com/boshek
  - name: Leonardo Collado-Torres
    url: https://github.com/lcolladotor
  - name: Mauro Lepore
    url: https://github.com/maurolepore
  - name: Joyce Robbins
    url: https://github.com/jtr13
  - name: Noam Ross
    url: https://github.com/noamross
  - name: Omayma Said
    url: https://github.com/OmaymaS   
date: '2018-07-17'
categories: blog
topicid: ####
tags:
  - community
  - r
  - review
  - onboarding
output: 
  html_document: 
    keep_md: yes
---





# What's inside? __pkginspector__ provides helpful tools for inspecting package contents

[Sam Albers](https://github.com/boshek), [Leonardo Collado-Torres](https://github.com/lcolladotor), [Mauro Lepore](https://github.com/maurolepore), [Joyce Robbins](https://github.com/jtr13), [Noam Ross](https://github.com/noamross), [Omayma Said](https://github.com/OmaymaS)

<!--- Above is only for GitHub version, will be removed --->

R packages are widely used in science. Despite this broad usage, the code behind R packages is rarely part of the scientific peer-review process. In the R ecosystem, rOpenSci has been a pioneer in developing a peer-review process for R packages. The goal of __pkginspector__ is to help that process by providing a means to better understand the internal structure of R packages. It summarizes the relationship among functions within the package, and reports whether or not functions' interfaces are consistent. If you are reviewing an R package (maybe your own) __pkginspector__ is for you (or at least it will be!).

We begun building __pkginspector__ during [unconf18](), with support from [rOpenSci](http://unconf18.ropensci.org/) and guidance from [Noam Ross](https://github.com/noamross). The package focuses on facilitating a few of the many tasks involved in reviewing a package. (For more on rOpenSci's review process, see the blog post: ["Onboarding at rOpenSci: A Year in Reviews"](https://ropensci.org/blog/2016/03/28/software-review/) and the e-book [*rOpenSci Packages: Development, Maintenance, and Peer Review.*](https://ropensci.github.io/dev_guide/)) Specifically, we are building tools to analyze and visualize function dependencies, and to analyze function parameters within a package:

### Function calls

`rev_fn_summary()` helps you analyze function calls. It takes a package path and returns a table of information about its functions. Consider this example included in __pkginspector__:


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

### Visualization

`vis_package()` helps you visualize the network of functions' dependencies ([interactive example](http://rpubs.com/jtr13/vis_package)).


```r
vis_package(path, physics = FALSE)
```

<!--- this link will be changed for the final draft per instructions --->
![](../../themes/ropensci/static/img/blog-images/2018-07-17-pkginspector/viridisLite.png)

### Argument default usage

`rev_args()` identifies all the functions' arguments used in a given package. It returns a dataframe which main column, `detault_consistent` indicates whether or not the default value of the argument is consistent across the functions that use it. This helps to evaluate the complexity of the package and to identify potential sources of confusion, for example, if the meaning or default value of the same argument varies across functions.


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

The example shows that the parameter `n` is used inconsistently. [The documentation](https://github.com/sjmgarnier/viridisLite/blob/master/R/viridis.R) reveals that the default value of `n` is 256 in one function but missing in all others. This flags a potential issue that deserves further investigation.

### In sum

If you are building or reviewing an R package, __pkginspector__ can help you better understand its complex structure. This is an important step towards improving your code and research. While __pkginspector__ will expand in scope, the features built during and since unconf18 are already useful. We welcome comments and issues about what other elements of a package deserve to be reviewed and if that review process can be automated. Our broader vision for __pkginspector__ is a tool that guides both the development and review of R packages and provide automated checks on subtle differences in package functions that inevitably arise during the development process. The package will (hopefully) grow and exist as a living toolbox for development and review. 
