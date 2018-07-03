 ---
slug: "pkginspector"
title: "What's inside the package? Helpful tools for inspecting the contents"
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

Packages are the basic building blocks of the entire R ecosystem. They are the primary form in which we bundle up functions, data, help files, vignettes, and other pieces information that make it convenient to share code among users. While using a package is relatively straightforward, understanding what's going on under the hood may not be. Yet this understanding is crucial to a number of important tasks, such as contributing to the development of a package, or reviewing its quality. 

`pkginspector` is part of a larger effort by rOpenSci to develop tools to make it easier to comprehend as well as evaluate a package's contents. In fact, with guidance from Noam Ross, this project began during unconf18 as part of the `pkgreviewr` package, and was spun off after the conference since it contains a unique set of tools that are helpful not only for reviewers but for developers as well.

The package focuses on facilitating a few of the many tasks involved in reviewing a package. (For more on rOpenSci's review process, see the blog post: ["Onboarding at rOpenSci: A Year in Reviews"](https://ropensci.org/blog/2016/03/28/software-review/) and the e-book [*rOpenSci Packages: Development, Maintenance, and Peer Review.*](https://ropensci.github.io/dev_guide/)) Specifically, we build tools to analyze and visualize function dependencies, and to analyze function parameters within a package:

### Function calls

The workhorse function to analyze function calls is `rev_fn_summary()` which takes a package path and returns a table of information about its functions. We demonstrate here, with a simple package, `viridisLite`, which is included with `pkginspector` for demo purposes:


```r
#devtools::install_github("ropenscilabs/pkginspector")
library(pkginspector)
pkgdir <- system.file('viridisLite', package = 'pkginspector')
knitr::kable(rev_fn_summary(pkgdir))
```



f_name       f_args                                                                     calls   called_by   dependents
-----------  ------------------------------------------------------------------------  ------  ----------  -----------
cividis      cividis (n, alpha = 1, begin = 0, end = 1, direction = 1)                      1           0            0
inferno      inferno (n, alpha = 1, begin = 0, end = 1, direction = 1)                      1           0            0
magma        magma (n, alpha = 1, begin = 0, end = 1, direction = 1)                        1           0            0
plasma       plasma (n, alpha = 1, begin = 0, end = 1, direction = 1)                       1           0            0
viridis      viridis (n, alpha = 1, begin = 0, end = 1, direction = 1, option = "D")        0           4            4
viridisMap   viridisMap (n = 256, alpha = 1, begin = 0, end = 1, direction = 1,             0           0            0

We learn that the first four functions call one function a piece, and are not called by any other functions in the package. `viridis()`, in constrast, doesn't call any functions but is called by four other functions. In this case, the number of "dependents" is also four. Dependents are counted recursively and include any functions in the calling chain. For example, if A calls B and B calls C, we would say that C is called by 1 (B) but has 2 dependents (A & B). `rev_fn_summary()` also provides information about function parameters in the `f_args` column.

*What's not working:* We know that we miss function calls if they are passed as parameters to `purrr::map()` and `do.call()` functions. There may be other systematic misses as well.

### Visualization

We provide a means to visualize the function structure with `vis_package()`. We believe that presenting the same information in multiple ways gives the user options. Depending on the situation, a table or a network graph may be more useful.  


```r
vis_package(pkgdir, physics = FALSE)
```

<!--html_preserve--><div id="htmlwidget-091656d4367f0c9908bf" style="width:672px;height:480px;" class="visNetwork html-widget"></div>
<script type="application/json" data-for="htmlwidget-091656d4367f0c9908bf">{"x":{"nodes":{"id":["cividis","inferno","magma","plasma","viridis","viridisMap"],"file":["R/viridis.R","R/viridis.R","R/viridis.R","R/viridis.R","R/viridis.R","R/viridis.R"],"line":["187","175","169","181","98","137"],"col1":["12","12","10","11","12","15"],"col2":["19","19","17","18","19","22"],"own":[true,true,true,true,true,true],"exported":[true,true,true,true,true,false],"group":["exported","exported","exported","exported","exported","not\nexported"],"font":["24px arial","24px arial","24px arial","24px arial","24px arial","24px arial"],"label":["cividis","inferno","magma","plasma","viridis","viridisMap"],"x":[-1,-0.10369145673042,0.705001663944856,-0.342494476943274,-0.162912967271769,1],"y":[-0.147162682224389,-1,-0.329853615540176,0.666707464425406,-0.178931439453109,1]},"edges":{"from":["magma","inferno","plasma","cividis"],"to":["viridis","viridis","viridis","viridis"],"type":["call","call","call","call"],"line":[170,176,182,188],"col1":[3,3,3,3],"col2":[9,9,9,9],"file":["R/viridis.R","R/viridis.R","R/viridis.R","R/viridis.R"]},"nodesToDataframe":true,"edgesToDataframe":true,"options":{"width":"100%","height":"100%","nodes":{"shape":"dot","physics":false},"manipulation":{"enabled":false},"edges":{"smooth":false,"arrows":"to"},"physics":{"solver":"barnesHut","stabilization":false,"barnesHut":{"centralGravity":0.3}},"layout":{"randomSeed":2018},"interaction":{"hover":true},"groups":{"not\nexported":{"shape":"icon","icon":{"code":"f013","color":"#4995d0"}},"exported":{"shape":"icon","icon":{"code":"f072","color":"#ff7600"}},"useDefaultGroups":true,"external":{"shape":"icon","icon":{"code":"f090","color":"#2caa58"}}}},"groups":["exported","not\nexported"],"width":null,"height":null,"idselection":{"enabled":true,"style":"width: 150px; height: 26px","useLabels":true,"main":"Select by id"},"byselection":{"enabled":false,"style":"width: 150px; height: 26px","multiple":false,"hideColor":"rgba(200,200,200,0.5)"},"main":null,"submain":null,"footer":null,"background":"rgba(0, 0, 0, 0)","igraphlayout":{"type":"square"},"tooltipStay":300,"tooltipStyle":"position: fixed;visibility:hidden;padding: 5px;white-space: nowrap;font-family: verdana;font-size:14px;font-color:#000000;background-color: #f5f4ed;-moz-border-radius: 3px;-webkit-border-radius: 3px;border-radius: 3px;border: 1px solid #808074;box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);","highlight":{"enabled":true,"hoverNearest":true,"degree":{"from":10,"to":0},"algorithm":"hierarchical","hideColor":"rgba(200,200,200,0.5)","labelOnly":true},"collapse":{"enabled":false,"fit":false,"resetHighlight":true,"clusterOptions":null},"legend":{"width":0.1,"useGroups":true,"position":"right","ncol":1,"stepX":100,"stepY":100,"zoom":true},"iconsRedraw":true},"evals":[],"jsHooks":[]}</script><!--/html_preserve-->



