---
title: Highlights of Hugo Code Highlighting
author:
  - Maëlle Salmon
date: '2020-05-07'
slug: code-highlighting
categories: []
tags:
  - RMarkdown
  - hugo
package_version: 0.1.0
description: Explanations around code highlighting in Hugo websites, based on Markdown or R Markdown.
twitterImg: blog/2019/06/04/post-template/name-of-image.png
output:
  html_document:
    keep_md: yes
---



Thanks to a quite overdue update of Hugo on our build system[^netlify], our website can now harness the full power of Hugo code highlighting for Markdown-based content. 
What's code highlighting apart from the reason behind a tongue-twister in this post title?
In this post we shall explain how Hugo's code highlighter, [Chroma](https://github.com/alecthomas/chroma), helps you prettify your code (i.e. _syntax highlighting_), and accentuate parts of your code (i.e. _line highlighting_).

### Make your code look pretty

If you notice and appreciate the difference between

```
a <- c(1:7, NA)
mean(a, na.rm = TRUE)
```

and 

```r
a <- c(1:7, NA)
mean(a, na.rm = TRUE)
```

you might agree with [Mara Averick's opinion](https://maraaverick.rbind.io/2017/11/r-blog-tips-from-an-inveterate-tweeter-thereof/),

>  Syntax highlighting! 🖍️ Just do it. Life is better when things are colourful.

Syntax highlighting means some elements of code blocks, like functions, operators, comments, etc. get styled differently: they could be colored or in italic.

Now, how does the colours of the second block appear? 

First of all, it's a code block with language information, 

````
```r
a <- c(1:7, NA)
mean(a, na.rm = TRUE)
```
````

as opposed to

````
```
a <- c(1:7, NA)
mean(a, na.rm = TRUE)
```
````

without language information, that won't get highlighted -- although some syntax highlighting tools, not Hugo Chroma, do some guessing.

There are in general two ways in which colors are added to code blocks, **client-side syntax highlighting** and **server-side syntax highlighting**. 
The latter is what Hugo supports nowadays but let's dive into both for the sake of completeness (~~or because I'm proud I now get it~~[^strike]).

#### Client-side syntax highlighting

In this sub-section I'll mostly refer to [highlight.js](https://highlightjs.org) but principles probably apply to other client-side syntax highlighting tools.
The "client-side" part of this phrase is that the html that is served by your website host does not have styling for the code.
In highlight.js case, styling appears after a JS script is loaded and applied. 

If we look at [a post of Mara Averick's](https://maraaverick.rbind.io/2018/07/palettes-archer-poster-edition/) at the time of writing, the html of a block is just

```html
<pre class="r"><code>pal_a &lt;- extract_colours(&quot;https://i.imgur.com/FyEALqr.jpg&quot;, num_col = 8)
par(mfrow = c(1,2))
pie(rep(1, 8), col = pal_a, main = &quot;Palette based on Archer Poster&quot;)
hist(Nile, breaks = 8, col = pal_a, main = &quot;Palette based on Archer Poster&quot;)</code></pre>
```

Now, using Firefox Developer Console, 

<!--html_preserve-->
{{< figure src="mara-blog.png" width=800 alt="Screenshot of blog post with Firefox Developer Console open" link="https://maraaverick.rbind.io/2018/07/palettes-archer-poster-edition/">}}
<!--/html_preserve-->

we see colours come from CSS classes starting with "hljs".

And in the head of that page (examined via "View source"), there's

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

which is the part loading and applying highlight.js to the page.
Now, how does it know what's for instance a string in R?
If we look at [highlight.js highlighter for the R language](https://github.com/highlightjs/highlight.js/blob/master/src/languages/r.js), authored by [Joe Cheng](https://twitter.com/jcheng) in 2012, it's a bunch of regular expressions, see for instance the [definition of a string](https://github.com/highlightjs/highlight.js/blob/512ae5f5dcdc6dd24185e6e08737c3679073a9b6/src/languages/r.js#L69-L74).

```js
        className: 'string',
        contains: [hljs.BACKSLASH_ESCAPE],
        variants: [
          {begin: '"', end: '"'},
          {begin: "'", end: "'"}
        ]
```

When using highlight.js on your website, you might need to specify R as a supplementary language in your config, since some languages are bundled by default whilst others are not.
You could also [whip up some code to conditionally load supplementary highlight.js languages](https://github.com/ropensci/roweb2/pull/637).

A big downside of client-side syntax highlighting is loading time: 
it appears quite fast if your internet connection isn't poor, but you might have noticed code blocks changing aspect when loading a web page (first unstyled, then styled).
Moreover, Hugo now supports, and uses by default, an alternative that we'll describe in the following subsection and take advantage of in this post's second section.

#### Server-side syntax highlighting

In server-side syntax highlighting, with say [Pygments](https://pygments.org/) or Chroma (Hugo default), your website html as served already has styling information.

With [Chroma](https://github.com/alecthomas/chroma), that styling information is either:

* hard-coded in html[^rss], as is since recently the case of [tidyverse.org](https://www.tidyverse.org/) and [blog.r-hub.io](https://blog.r-hub.io);

<!--html_preserve-->
{{< figure src="tidyverse.png" width=800 alt="Screenshot of blog post with Firefox Developer Console open" link="https://www.tidyverse.org/blog/2020/04/dplyr-1-0-0-colwise/">}}
<!--/html_preserve-->

The html source for one of the blocks of [the page screenshot above](https://www.tidyverse.org/blog/2020/04/dplyr-1-0-0-colwise/) is

```html
div class="highlight"><pre style=";-moz-tab-size:4;-o-tab-size:4;tab-size:4"><code class="language-r" data-lang="r">df <span style="color:#666">%&gt;%</span> 
  <span style="color:#00f">group_by</span>(g1, g2) <span style="color:#666">%&gt;%</span> 
  <span style="color:#00f">summarise</span>(a <span style="color:#666">=</span> <span style="color:#00f">mean</span>(a), b <span style="color:#666">=</span> <span style="color:#00f">mean</span>(b), c <span style="color:#666">=</span> <span style="color:#00f">mean</span>(c), d <span style="color:#666">=</span> <span style="color:#00f">mean</span>(c))
</code></pre></div>
```

The style used is [indicated in the website config](https://gohugo.io/getting-started/configuration-markup#highlight) and picked from [Chroma style gallery](https://xyproto.github.io/splash/docs/all.html).

* via the use of CSS classes also indicated in html, as is the case of this website where we wanted to keep using our own style.

<!--html_preserve-->
{{< figure src="ropensci.png" width=800 alt="Screenshot of blog post with Firefox Developer Console open" link="http://localhost:1313/technotes/2020/03/19/parzer/">}}
<!--/html_preserve-->

The html of the block seen above is

```html
<div class="highlight"><pre class="chroma"><code class="language-r" data-lang="r"><span class="nf">install.packages</span><span class="p">(</span><span class="s">&#34;parzer&#34;</span><span class="p">,</span> <span class="n">repos</span> <span class="o">=</span> <span class="s">&#34;https://dev.ropensci.org/&#34;</span><span class="p">)</span>
</code></pre></div>
```

and it goes hand in hand with having styling for different ".chroma" classes in our website CSS.

```css
.chroma .s { color: #a3be8c }
```

To have this behaviour, in our website config there's 

```toml
pygmentsUseClasses=true
```

which confusingly enough uses the name "Pygments", not Chroma, for historical reasons.
You'd use CSS like we do if none of [Chroma default styles](https://xyproto.github.io/splash/docs/all.html) suited you, or if, like we did, had some special highlighting that you'd like to keep.[^css]


How does Chroma know what parts of code is of the string class for instance?
Once again, regular expressions help, in this case in what is called a lexer. 
Chroma is inspired by Pygments, and in [Pygments docs](https://pygments.org/docs/quickstart/) it is explained that _"A lexer splits the source into tokens, fragments of the source that have a token type that determines what the text represents semantically (e.g., keyword, string, or comment)."_
In [R lexer](https://github.com/alecthomas/chroma/blob/master/lexers/r/r.go), ported from Pygments to Chroma by Chroma maintainer Alec Thomas, for strings we e.g. see

```go
			{`\'`, LiteralString, Push("string_squote")},
			{`\"`, LiteralString, Push("string_dquote")},
// ... code
		"string_squote": {
			{`([^\'\\]|\\.)*\'`, LiteralString, Pop(1)},
		},
		"string_dquote": {
			{`([^"\\]|\\.)*"`, LiteralString, Pop(1)},
		},
```

Chroma works on Markdown content, so if you use [blogdown to generate pages as html](https://bookdown.org/yihui/blogdown/output-format.html), you can only use client-side highlighting, like [this tidyverse.org page](https://www.tidyverse.org/blog/2017/09/erratum-tidyr-0.7.0/) whose [source is html](https://github.com/tidyverse/tidyverse.org/blob/7ceea9b9bd40207d25e75681041568d600c9d903/content/blog/2017-09-erratum-tidyr/index.html).
By default nowadays Hugo does server-side syntax highlighting but you could choose to turn it off via [`codeFences = false`](https://gohugo.io/getting-started/configuration-markup#highlight).

We have now seen how Hugo websites have [syntax highlighting, which for Yihui Xie _"is only for cosmetic purposes"_](https://yihui.org/en/2017/07/on-syntax-highlighting/).
Well, Chroma actually also offers one thing more: line numbering and line highlighting!

### Emphasize parts of your code

With Chroma, you can [apply special options to code blocks defined with fences](https://gohugo.io/content-management/syntax-highlighting/)[^fences].

#### On Chroma options for line highlighting

See how

````
```r {hl_lines=[1,"4-5"]}
library("dplyr")
df %>%
  mutate(date = lubridate::ymd(date_string)) %>%
  select(- date_string)
str(df)
nrow(df)
```
````

is rendered below: lines 1 and 4 to 5 are highlighted.

```r {hl_lines=[1,"4-5"],linenostart=3}
library("dplyr")
df %>%
  mutate(date = lubridate::ymd(date_string)) %>%
  select(- date_string)
str(df)
nrow(df)
```

There are also options related to line numbering.


````
```r {hl_lines=[1,"4-5"],linenos=table,linenostart=3}
library("dplyr")
df %>%
  mutate(date = lubridate::ymd(date_string)) %>%
  select(- date_string)
str(df)
nrow(df)
```
````

gives a code block with line numbered as table (easier for copy-pasting the code without line numbers), starting from number 3.

```r {hl_lines=[1,"4-5"],linenos=table,linenostart=3}
library("dplyr")
df %>%
  mutate(date = lubridate::ymd(date_string)) %>%
  select(- date_string)
str(df)
nrow(df)
```

You can also configure line numbering [for your whole website](https://gohugo.io/getting-started/configuration-markup#highlight).

The real magic to me is that if you write your code from R Markdown you can

* apply the options to the source chunk using a knitr hook like the one defined [in our archetype](https://github.com/ropensci/roweb2/blob/master/archetypes/Rmd/index.md);

* use R code to programmatically produce code block between fences, e.g. choosing which lines to highlight.

#### knitr hook to highlight lines of source code

Our hook is

```r
# knitr hook to use Hugo highlighting options
knitr::knit_hooks$set(
  source = function(x, options) {
  hlopts <- options$hlopts
    paste0(
      "```", "r ",
      if (!is.null(hlopts)) {
      paste0("{",
        glue::glue_collapse(
          glue::glue('{names(hlopts)}={hlopts}'),
          sep = ","
        ), "}"
        )
      },
      "\n", glue::glue_collapse(x, sep = "\n"), "\n```\n"
    )
  }
)
```

The chunk[^chunk]

````markdown
```{r name-your-chunks, hlopts=list(linenos="table")} 
a <- 1+1
b <- 1+2
c <- 1+3
a + b + c
```
````

is rendered as

```r {linenos=table}
a <- 1+1
b <- 1+2
c <- 1+3
a + b + c
```

```
[1] 9
```

> PSA! Note that if you're after line highlighting, or function highlighting, for R Markdown documents _in general_, you should check out [Kelly Bodwin's flair package](https://kbodwin.github.io/flair/index.html)!

#### Produce line-highlighted code blocks with glue/paste0

What Chroma highlights are code blocks with code fences, which you might as well generate from R Markdown. E.g.

```r 
script <- c(
  "a <- 1",
  "b <- 2",
  "c <- 3",
  "a + b + c")
cool_lines <- sample(1:4, 2)
cool_lines
```
[1] 2 3
```r 
cool_lines <- stringr::str_remove(toString(cool_lines), " ")
glue::glue_collapse(c(
    paste0('```r {hl_lines=[', cool_lines,']}'),
  script,
  "```"
),
sep = "\n")
```
```r {hl_lines=[2,3]}
a <- 1
b <- 2
c <- 3
a + b + c
```

### Conclusion

In this post we've explained some concepts around code highlighting: both client-side and server-side syntax highlighting; and line highlighting with Chroma.
Being able to properly decorate code might make your content more attractive to your readers, or motivate you to write more documentation, which is great.
Now, how much time fiddling with code appearance is probably a question of taste. 

[^netlify]: Our website is deployed via Netlify.
[^strike]: [Support for striking text, with `~~blablabla~~` is also quite new in Hugo](https://gohugo.io/news/0.60.0-relnotes/), thanks to its new Markdown renderer Goldmark!
[^css]: Translating CSS classes from what highlight.js does to what Chroma needs was not easy for me, but I'm a CSS n00b.
[^fences]: There is also a [highlight shortcode](https://gohugo.io/content-management/syntax-highlighting/#example-highlight-shortcode) which to me is less natural to use in R Markdown or in Markdown as someone used to Markdown.
[^rss]: In this case colors are also hard-coded in RSS feeds which means the posts will look better in feed readers... and maybe even on R-Bloggers?
[^chunk]: I never remember how to show code chunks without their being evaluated so I always need to look at [the source](https://github.com/gadenbuie/garrickadenbuie-com/blob/897d8cde5387a8237eb641490e69cabab39129c1/content/blog/2018/2018-03-05-dry-vignette-and-readme.Rmd) of [Garrick Aden-Buie's blog post about Rmd fragments](https://www.garrickadenbuie.com/blog/dry-vignette-and-readme/).