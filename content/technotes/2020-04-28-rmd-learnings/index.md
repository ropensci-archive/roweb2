---
title: Miscellaneous wisdom about R Markdown & Hugo gained from work on our website
author:
  - Maëlle Salmon
date: '2020-04-28'
slug: rmd-learnings
categories: []
tags:
  - hugo
  - blogdown
  - R Markdown
  - Markdown
  - knitr
package_version: 0.1.0
description: A few things I learnt about R Markdown (knitr hooks!), Hugo (ignoreFiles, leaf bundles, archetypes), blogdown (New Post Addin)
output:
  html_document:
    keep_md: yes
---



Whilst working on the blog guidance, Stefanie Butland and I consolidated knowledge we had already gained, but it was also the opportunity to up our Rmd/Hugo technical game.
In this post I shall go through five things I learnt about Rmd/Hugo.

### knitr hooks

> Hugo has a nice [figure shortcode](https://gohugo.io/content-management/shortcodes/#figure) with options such as width. How do I make R Markdown output such a shortcode from a code chunk, instead of the usual figure syntax?

I asked this question in the friendly French-speaking R Slack workspace[^grrr] and got an answer from both [Romain Lesur](https://github.com/RLesur) and [Christophe Dervieux](https://github.com/cderv): I had to use a _knitr plot hook_!

In the setup chunk, there should be this code

```r
knitr::knit_hooks$set(
  plot = function(x, options) {
    hugoopts <- options$hugoopts
    paste0(
      "{", "{<figure src=", # the original code is simpler
      # but here I need to escape the shortcode!
      '"', x, '" ',
      if (!is.null(hugoopts)) {
        glue::glue_collapse(
          glue::glue('{names(hugoopts)}="{hugoopts}"'),
          sep = " "
        )
      },
      ">}}\n"
    )
  }
)
```

that reads options from the chunk, and uses options from the `hugoopts` named list if it exists. 

The chunk

````markdown
```{r chunkname, hugoopts=list(alt="alternative text please make it informative", title="title of the image", caption="this is what this image shows, write it here or in the paragraph after the image as you prefer", width=300)} 
plot(1:10)
```
````

gives

`{{` `<figure src="chunkname-1.png" alt="alternative text please make it informative" title="title of the image" caption="this is what this image shows, write it here or in the paragraph after the image as you prefer" width="300">}}`

[^grrr]: If you want to join us, follow [the invitation link](https://github.com/frrrenchies/frrrenchies#cat-chat-et-discussions-instantan%C3%A9es-cat). _À bientôt !_

https://alison.rbind.io/post/2019-02-19-hugo-archetypes/
