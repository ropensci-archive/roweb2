---
title: Miscellaneous Wisdom about R Markdown & Hugo Gained from Work on our Website
author:
  - Maëlle Salmon
date: '2020-04-23'
slug: rmd-learnings
categories: []
tags:
  - hugo
  - blogdown
  - R Markdown
  - Markdown
  - knitr
package_version: 0.1.0
description: A few things I learned about R Markdown (knitr hooks), Hugo (ignoreFiles, leaf bundles, archetypes), blogdown (New Post Addin)
output:
  html_document:
    keep_md: yes
---



Whilst [working on the blog guide](/blog/2020/04/07/bookdown-learnings/), [Stefanie Butland](/authors/stefanie-butland/) and I consolidated knowledge we had already gained, but it was also the opportunity to up our Rmd/Hugo technical game.
Our website uses Hugo but not blogdown[^blogdown] to render posts: every post is based on an .md file that is either written directly or knit from an .Rmd file.
We wanted to provide clear guidance for both options, and to stick to the well-documented Hugo way of e.g. inserting figures.
We also wanted to provide post contributors with an as smooth as possible workflow to create a new post.
Working on this mission, unsurprisingly we learned a lot, and why not share our newly acquired technical know-how?
In this post I shall go through four things we learned about Rmd/Hugo, while trying to provide context about the _why_ of our using them.

### knitr hooks

**Problem:** Hugo has a nice [figure shortcode](https://gohugo.io/content-management/shortcodes/#figure) with options such as width. How do we make R Markdown output these shortcodes from a code chunk, instead of the usual figure syntax? I.e. how to get[^esc]

```html
{{</* figure src="chunkname-1.png" alt="alternative text please make it informative" title="title of the image" caption="this is what this image shows, write it here or in the paragraph after the image as you prefer" width="300" */>}}
```

not 

`![alternative text please make it informative](chunkname-1.png)` 

to appear -- as the result of a chunk producing a figure -- in the `.md` after knitting the `.Rmd`?

I asked this question in the friendly French-speaking R Slack workspace[^grrr] and got an answer from both [Romain Lesur](https://github.com/RLesur) and [Christophe Dervieux](https://github.com/cderv): the solution was to use a [knitr plot hook](https://yihui.org/knitr/hooks/)!

<!--html_preserve-->
{{< figure src ="person-holding-purple-crochet-hook-and-white-yarn-3945638.jpg" alt = "Person holding a purple crochet hook and white yarn" link = "https://www.pexels.com/photo/person-holding-purple-crochet-hook-and-white-yarn-3945638/" caption = "Another type of hook. [Castorly Stock on Pexels](https://www.pexels.com/photo/person-holding-purple-crochet-hook-and-white-yarn-3945638/)." width = "300" class = "center" >}}
<!--/html_preserve-->

[knitr hooks](https://yihui.org/knitr/hooks/) are _"Customizable functions to run before / after a code chunk, tweak the output, and manipulate chunk options"_.

In the setup chunk[^setup] of the `.Rmd` file, there should be this code

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

produces

<!--html_preserve-->
{{</* figure src="chunkname-1.png" alt="alternative text please make it informative" title="title of the image" caption="this is what this image shows, write it here or in the paragraph after the image as you prefer" width="300" */>}}
<!--/html_preserve-->

in the `.md` file which is what we wanted.

Now, a bit later in our website journey, I had a quite similar question: Hugo has nice [highlighting options for code fences](https://gohugo.io/content-management/syntax-highlighting/#highlighting-in-code-fences). How to make R Markdown show R source code with such options? This time there was no need to ask anyone, searching the internet for the _name_ of the right knitr hook was enough: our `.Rmd` has to feature a [knitr source hook](https://bookdown.org/yihui/rmarkdown-cookbook/output-hooks.html). More on that highlighting chapter another time, but in the meantime refer to [our standard `.Rmd`](https://github.com/ropensci/roweb2/blob/master/archetypes/Rmd/index.md).

Note that when writing a `.md` post instead of knitting an `.Rmd` file, authors can use Hugo syntax directly. And when adding figures in an `.Rmd` file that come from say a stock photos website rather than a code chunk, authors can also use Hugo syntax, granted they write the shortcode between `html_preserve` markers, see below the lines I used to add the crochet hook picture in the `.Rmd` producing this post.

`<!--html_preserve-->`
<!--html_preserve-->
{{</* figure src ="person-holding-purple-crochet-hook-and-white-yarn-3945638.jpg" alt = "Person holding a purple crochet hook and white yarn" link = "https://www.pexels.com/photo/person-holding-purple-crochet-hook-and-white-yarn-3945638/" caption = "Another type of hook. [Castorly Stock on Pexels](https://www.pexels.com/photo/person-holding-purple-crochet-hook-and-white-yarn-3945638/)" width = "300" class = "center" */>}}
<!--/html_preserve-->
`<!--/html_preserve-->`

### "One post = one folder": Hugo leaf bundles

**Problem:** Our advice to contributors including ourselves was to add their post under content/ but its images under themes/ropensci/static/img/ which is... not smooth. How do we change that?

Thanks to [Alison Hill's blog post about page bundles](https://alison.rbind.io/post/2019-02-21-hugo-page-bundles/) I learned you can use a folder to add both a post and its related images to a Hugo website.
What an improvement over adding the post in one place, the images in another place like we used to!
It's much smoother to explain to new contributors[^smoother].
In Hugo speak, each post source is a [leaf bundle](https://gohugo.io/content-management/page-bundles/).

<!--html_preserve-->
{{< figure src="orange-mug-near-macbook-3219546.jpg" width="300" link="https://www.pexels.com/photo/orange-mug-near-macbook-3219546/" alt="Laptop keyboard with a tree leaf beside it" class="center" caption="Another type of leaf. [Engin Akyurt on Pexels](https://www.pexels.com/photo/orange-mug-near-macbook-3219546/)." >}}
<!--/html_preserve-->

We did not have to "convert" old posts since both systems can peacefully coexist.

Below is the directory tree of a recent blog post added as a leaf bundle.


```
/home/maelle/Documents/ropensci/roweb2/content/blog/2020-02-21-ropensci-leadership
├── index.md
└── ropensci-butland-welcome.png
```

In R Markdown, in the setup chunk, the option `fig.path` needs to be set to `""` via `knitr::opts_chunk$set(fig.path = "")`.

### Hugo archetypes and blogdown New Post Addin

**Problem:** We link to our two templates from the blog guide, and explain where under content the folder corresponding to a post should be created, but that leaves a lot of work to contributors.
How do we distribute our `.Rmd` and `.md` templates? 
How do we help authors create a new post without too much clicking around and copy-pasting?[^thxsteffi]

After a bit of digging in Hugo docs and blogdown GitHub, reading [a blog post of Alison Hill's](https://alison.rbind.io/post/2019-02-19-hugo-archetypes/), contributing to blogdown [in spontaneous collaboration with Garrick Aden-Buie](https://github.com/rstudio/blogdown/pull/432), getting [useful feedback from blogdown maintainer Yihui Xie](https://github.com/rstudio/blogdown/pull/435#pullrequestreview-369664310)... here's the place I got to: storing templates as Hugo directory-based archetypes, and recommending the use of a handy blogdown RStudio addin to create new posts. 

* First of all, an important clarification: in Hugo speak, a template for Markdown content is called an _archetype_.  A template refers to [html layout](https://gohugo.io/templates/). Not confusing at all, right?

* We have [stored](https://github.com/ropensci/roweb2/tree/master/archetypes) both the templates archetypes for Markdown and R Markdown posts as [directory based archetypes](https://gohugo.io/content-management/archetypes/). The Rmd template is stored as `index.md`, otherwise Hugo doesn't recognize it (thanks [Leonardo Collado-Torres](https://github.com/rstudio/blogdown/pull/263)). Posts created using the template should however be saved with the usual .Rmd extension.

* After reading the [explanations around options in the blogdown book](https://bookdown.org/yihui/blogdown/global-options.html), I added an .Rprofile to our website repository.

```r
if (file.exists('~/.Rprofile')) {
  base::sys.source('~/.Rprofile', envir = environment())
}

# All options below apply to posts created via the New Post Addin.

# to enforce leaf bundles:
options(blogdown.new_bundle = TRUE) 
# to make blog the subdirectory for new posts by default:
options(blogdown.subdir = "blog")
# to help enforce our strict & pedantic style guide ;-)
options(blogdown.title_case = TRUE)
```

* The blogdown New Post Addin assumes the author name can be stored in the "author" field of the post YAML metadata, whereas our website used to call that field "authors"... that called for a [massive pull request](https://github.com/ropensci/roweb2/pull/635), editing previous posts, and making our templating more resilient to having a single author as a string rather than a list. When [editing the metadata of previous posts I like to use the yaml package](/technotes/2019/01/09/hugo/). I made a few mistakes that were thankfully [spotted and fixed by Steffi LaZerte](https://github.com/ropensci/roweb2/pull/644).

* Now from RStudio or elsewhere after installing blogdown above version 1.18.1[^blogdownv], we [recommend using the blogdown's New Post Addin](https://blogguide.ropensci.org/technical.html#blogdownaddin)!

<!--html_preserve-->
{{< figure src="blogdownaddin.png" alt="blogdown New Post Addin" class="center" caption="Screenshot of the blogdown New Post Addin" >}}
<!--/html_preserve-->

The todo list for a contributor is long but less tedious than creating folders by hand:

* Enter a title, no need to worry about title case at this stage.

* Enter your name if whoami wasn't able to guess it.

* Choose the correct date.

* Enter a new slug if the default one is too long.

* Choose "blog" or "technotes" as a Subdirectory from the drop-down menu.

* Choose an Archetype, Rmd or md, from the drop-down menu.

* Also choose the correct Format: .Rmd if Rmd, Markdown (.md) if md. Never choose .RMarkdown.

* Ignore Categories.

* Select any relevant tag and/or create new ones.

* Click on “Done”, your post draft will have been created and opened.

The addin can also be used outside of RStudio. 
If you don't use that nice little tool, unless you use [`hugo new`](https://gohugo.io/commands/hugo_new/) yes you'd copy-paste from a file and create a correctly named folder yourself.

### ignoreFiles field in the Hugo config

**Problem:** How do we make Hugo ignore useless html from our knitting process without deleting said html by hand?

At the moment the output type in our `.Rmd` ~~template~~ archetype is 

```
output:
  html_document:
    keep_md: yes
```

that produces a `.md` like we need. 
I hope we'll find a better way one day, and welcome any cleaner suggestion for the output field (I tested a few [Markdown variants](https://bookdown.org/yihui/rmarkdown/markdown-document.html) without success!).
I have the perhaps naive impression that [blogdown actually follows a similar process when knitting `.RMarkdown` to `.markdown`](https://github.com/rstudio/blogdown/blob/ea5c1ae6ed18141e0b1f166552e35969bfb87f0d/inst/scripts/render_page.R#L17)?

So anyway, we currently have an useless html produced when knitting a post from an `.rmd` file, how do we make Hugo ignore it?

I knew about `.gitignore` where we have the lines

```
content/blog/*/index.html
content/technotes/*/index.html
```

so that such garbage index.html doesn't get added to pull requests, but it still made Hugo error locally.

<!--html_preserve-->
{{< figure src="richard-dykes-SPuHHjbSso8-unsplash.jpg" class="center" width="300" link="https://unsplash.com/photos/SPuHHjbSso8" alt="Paper thrown on the ground" caption="Paper thrown on the ground. [Richard Dykes on Unspash](https://unsplash.com/photos/SPuHHjbSso8)." >}}
<!--/html_preserve-->

Luckily Hugo recognizes a [config field called `ignoreFiles`](https://gohugo.io/getting-started/configuration/#ignore-content-files-when-rendering).
Ours now mentions index.html.

```
ignoreFiles = ["\\.Rmd$", "_files$", "_cache$", "index\\.html"]
```

### Conclusion

In this post I reported on a few things our website work taught us about R Markdown (knitr hooks), Hugo (ignoreFiles, leaf bundles, archetypes) and blogdown (New Post Addin).
Still we're still learning important concepts and tricks thanks to new questions by blog authors and to updates in the ecosystem[^adopt], we shall keep publishing such posts, stay tuned if that's your jam!


[^blogdown]: But as you'll see later we actually take advantage of that cool package: we recommend using blogdown's New Post Addin; and we also mention `blogdown::install_hugo()` in the blog guide.
[^esc]: Yes you can escape [Hugo shortcodes in your site content](https://discourse.gohugo.io/t/how-is-the-hugo-doc-site-showing-shortcodes-in-code-blocks/9074)!
[^grrr]: If you want to join us, follow [the invitation link](https://github.com/frrrenchies/frrrenchies#cat-chat-et-discussions-instantan%C3%A9es-cat). _À bientôt !_
[^setup]: I recently asked and received [references to define the setup chunk](https://community.rstudio.com/t/what-defines-the-setup-chunk/27595).
[^smoother]: I can also credit this smoother workflow for making _me_ like adding more images, hence the stock pictures in this post!
[^blogdownv]: At the time of writing blogdown 1.18.1 has to be installed from GitHub via `remotes::install_github("rstudio/blogdown")`.
[^thxsteffi]: Thanks to [Steffi LaZerte for encouraging work in this direction](https://github.com/ropenscilabs/roblog/issues/37)!
[^adopt]: I actually wrote a post around [maintaining Hugo websites](https://masalmon.eu/2020/02/29/hugo-maintenance/) in my personal blog.
