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

_Note that our website uses Hugo but *not* blogdown to render posts. All posts are based on .md files that are either written directly or generated from .Rmd files._

### knitr hooks

> Hugo has a nice [figure shortcode](https://gohugo.io/content-management/shortcodes/#figure) with options such as width. How do I make R Markdown output such a shortcode from a code chunk, instead of the usual figure syntax?

I asked this question in the friendly French-speaking R Slack workspace[^grrr] and got an answer from both [Romain Lesur](https://github.com/RLesur) and [Christophe Dervieux](https://github.com/cderv): I had to use a [_knitr plot hook_](https://yihui.org/knitr/hooks/)!

In the setup chunk[^setup], there should be this code

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

gives `{{` `<figure src="chunkname-1.png" alt="alternative text please make it informative" title="title of the image" caption="this is what this image shows, write it here or in the paragraph after the image as you prefer" width="300">}}` in the Markdown post which is what we wanted.

Now, a bit later, I had a quite similar question...

> Hugo has nice [highlighting options for code fences](https://gohugo.io/content-management/syntax-highlighting/#highlighting-in-code-fences). How do I make R Markdown show R source code with such options?

This time I knew I was after a _knitr hook_ and used a search engine... I created a _[knitr source hook](https://bookdown.org/yihui/rmarkdown-cookbook/output-hooks.html)_

The code below also needs to be in the setup chunk.

ADD LINK AND EXAMPLE.

Note that when writing a `.md` post directly, authors can directly use Hugo syntax, the hooks are only useful for creating Hugo syntax from a code chunk.

### "One post = one folder": Hugo leaf bundles

> Our advice to contributors to add their post under content/ but its images under themes/ropensci/static/img/ is... not smooth. How do we change that?

Thanks to [Alison Hill's blog post about page bundles](https://alison.rbind.io/post/2019-02-21-hugo-page-bundles/) I learnt you can use a folder to add both a post and its related images to a Hugo website.
What an improvement over adding the post in one place, the images in another place like we used to!
It's much smoother to explain to new contributors.
In Hugo speak, each post source is a [_leaf bundle_](https://gohugo.io/content-management/page-bundles/).
We did not have to "convert" old posts since both systems can peacefully coexist.

Below is the directory tree of a recent blog post added as a leaf bundle.


```r
fs::dir_tree("/home/maelle/Documents/ropensci/roweb2/content/blog/2020-02-21-ropensci-leadership")
```

```
/home/maelle/Documents/ropensci/roweb2/content/blog/2020-02-21-ropensci-leadership
├── index.md
└── ropensci-butland-welcome.png
```

In R Markdown, in the setup chunk, the option `knitr::opts_chunk$set(fig.path = "")` needs to be set.

### archetypes including directory-based archetypes (Hugo)

> Now we want to use leaf bundles for both .md and .Rmd posts, an R Markdown file with custom hooks, a custom fig.path option... how do we best distribute a "template"?

Actually, in Hugo speak, such a template for Markdown content is called an _archetype_. 
A template refers to [html layout](https://gohugo.io/templates/).
Not confusing at all, right?

We have [stored](https://github.com/ropensci/roweb2/tree/master/archetypes) both the templates archetypes for Markdown and R Markdown posts as [directory based archetypes](https://gohugo.io/content-management/archetypes/).
The Rmd template is stored as `index.md`, otherwise Hugo doesn't recognize it.

### blogdown's New Post Addin (Hugo, blogdown)

> Ok cool but now, how do authors use these <check notes> "archetypes"? Copy-pasting?!

Outside of RStudio, in your usual workflow, unless you use `hugo new` yes you'd copy-paste from a file and create a correctly named folder yourself.

Now if you use RStudio, we [recommend using the blogdown's New Post Addin](https://blogguide.ropensci.org/technical.html#blogdownaddin)!

<!--html_preserve-->
{{< figure src = "blogdownaddin.png" alt = "blogdown's New Post Addin" >}}
<!--/html_preserve-->


### ignoreFiles field in website config (Hugo).
[^grrr]: If you want to join us, follow [the invitation link](https://github.com/frrrenchies/frrrenchies#cat-chat-et-discussions-instantan%C3%A9es-cat). _À bientôt !_
[^setup]: I recently asked and received [references to define the setup chunk](https://community.rstudio.com/t/what-defines-the-setup-chunk/27595).

https://alison.rbind.io/post/2019-02-19-hugo-archetypes/
