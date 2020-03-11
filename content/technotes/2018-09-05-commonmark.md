---
slug: commonmark
title: 'In praise of Commonmark: wrangle (R)Markdown files without regex'
date: '2018-09-05'
author:
  - Maëlle Salmon
topicid: 1319
tags:
  - Markdown
  - R Markdown
  - xml2
  - commonmark
output:
  md_document:
    variant: markdown_github
    preserve_yaml: yes
---

You might have read [my blog post analyzing the social weather of
rOpenSci
onboarding](/blog/2018/05/10/onboarding-social-weather/),
based on a text analysis of GitHub issues. I extracted text out of
Markdown-formatted threads with regular expressions. I basically
hammered away at the issues using tools I was familiar with until it
worked! Now I know there’s a much better and cleaner way, that I’ll
present in this note. Read on if you want to extract insights about
text, code, links, etc. from R Markdown reports, Hugo website sources,
GitHub issues… without writing messy and smelly code!

Introduction to Markdown rendering and parsing
----------------------------------------------

This note will appear to you, dear reader, as an html page, either here
on ropensci.org or on R-Bloggers, but I’m writing it as an R Markdown
document, using Markdown syntax. I’ll knit it to Markdown and then
Hugo’s Markdown processor,
[Blackfriday](https://github.com/russross/blackfriday), will transform
it to html. Elements such as `# blabla` thus get transformed to
`<h1 id="blabla">blabla</h1>`. Awesome!

The rendering of Markdown to html or XML can also be used as a way to
*parse* it, [which is what the `spelling` package does in order to
identify text
segments](https://github.com/ropensci/spelling/blob/622fc9cc200b69b3859f272c99c13c575dcb5105/R/parse-markdown.R#L12)
of R Markdown files, before spell checking them only, not code. I had an
aha moment when seeing this `spelling` strategy: why did I ever use
regex to parse Markdown for text analysis?! Transforming it to XML
first, and then using XPath, would be much cleaner!

As a side-note, realizing how to simplify my old code made me think of
[Jenny Bryan’s inspiring useR! keynote talk about code
smells](https://github.com/jennybc/code-smells-and-feels). I asked her
whether code full of regular expressions instead of dedicated parsing
tools was a code smell, sadly it doesn’t have a specific name, but she
confirmed my feeling that *not* using dedicated purpose-built tools
might mean you’ll end up “re-inventing all of that logic yourself, in
hacky way.”. If you have code falling under the definition below, maybe
try to re-factor and if needed [get
help](https://masalmon.eu/2018/07/22/wheretogethelp/).

{{< tweet 1035526182392000514 >}}

From Markdown to XML
--------------------

In this note I’ll use my local fork of rOpenSci’s website source, and
use all the Markdown sources of blog posts as example data. The chunk
below is therefore not portable, sorry about that.

``` r
roblog <- "C:\\Users\\Maelle\\Documents\\ropensci\\roweb2\\content\\blog"

all_posts <- fs::dir_ls(roblog, regexp = "*.md")
all_posts <- all_posts[all_posts != "_index.md"]
```

My fork master branch isn’t entirely synced. It has 202 posts.

The code below uses the [`commonmark`
package](https://github.com/jeroen/commonmark) to render Markdown to
XML. Commonmark is a standardized specification for Markdown syntax by
[John McFarlane](https://johnmacfarlane.net/tools). The `commonmark` R
package by Jeroen Ooms wraps the official
[cmark](https://github.com/commonmark/cmark) library and is used by
e.g. GitHub to render issues and readmes. Note that my function still
has a hacky element, it uses a `blogdown` unexported function to strip
the YAML header of posts! If you know a better way [feel free to answer
my question over at RStudio community discussion
forum](https://community.rstudio.com/t/does-blogdown-split-yaml-body-exist-as-an-exported-function-how-to-remove-the-yaml-of-a-markdown-r-markdown-document/13350/2).

``` r
library("magrittr")
get_one_xml <- function(md){
  md %>%
    readLines(encoding = "UTF-8") %>%
    blogdown:::split_yaml_body() %>%
    .$body %>%
    commonmark::markdown_xml(extensions = TRUE) %>%
    xml2::read_xml()
}
```

See what it gives me for one post.

``` r
get_one_xml(all_posts[42])
```

    ## {xml_document}
    ## <document xmlns="http://commonmark.org/xml/1.0">
    ##  [1] <paragraph>\n  <text>We just released a new version of </text>\n  < ...
    ##  [2] <heading level="2">\n  <text>First, install and load taxize</text>\ ...
    ##  [3] <code_block info="r">install.packages("rgbif")\n</code_block>
    ##  [4] <code_block info="r">library(taxize)\n</code_block>
    ##  [5] <heading level="2">\n  <text>New things</text>\n</heading>
    ##  [6] <heading level="3">\n  <text>New functions: class2tree</text>\n</he ...
    ##  [7] <paragraph>\n  <text>Sometimes you just want to have a visual of th ...
    ##  [8] <paragraph>\n  <text>Define a species list</text>\n</paragraph>
    ##  [9] <code_block info="r">spnames &lt;- c("Latania lontaroides", "Randia ...
    ## [10] <paragraph>\n  <text>Then collect taxonomic hierarchies for each ta ...
    ## [11] <code_block info="r">out &lt;- classification(spnames, db = "ncbi", ...
    ## [12] <paragraph>\n  <text>Use </text>\n  <code>class2tree</code>\n  <tex ...
    ## [13] <code_block info="r">tr &lt;- class2tree(out)\nplot(tr, no.margin = ...
    ## [14] <paragraph>\n  <image destination="/assets/blog-images/2014-02-19-t ...
    ## [15] <heading level="3">\n  <text>New functions: get_gbfid</text>\n</hea ...
    ## [16] <paragraph>\n  <text>The Global Biodiversity Information Facility ( ...
    ## [17] <paragraph>\n  <text>We added a similar function to our </text>\n   ...
    ## [18] <code_block info="r">get_gbifid(sciname = "Poa annua", verbose = FA ...
    ## [19] <code_block>##         1\n## "2704179"\n## attr(,"class")\n## [1] " ...
    ## [20] <code_block info="r">get_gbifid(sciname = "Pinus contorta", verbose ...
    ## ...

Headings, code blocks… all properly delimited and one XPath query away
from us! Let me convert all posts before diving into parsing examples.

``` r
all_posts %>%
  purrr::map(get_one_xml) -> blog_xml
```

Parsing the XML
---------------

### URLs parsing

Let’s say I want to find out which domains are the most often linked
from rOpenSci’s blog. No need for any regular expression thanks to
`commonmark`, [`xml2`](https://xml2.r-lib.org/) and `urltools`!

``` r
get_urls <- function(post_xml){
  post_xml %>%
    xml2::xml_find_all(xpath = './/d1:link', xml2::xml_ns(post_xml)) %>%
    xml2::xml_attr("destination") %>%
    urltools::url_parse()
}

# URLs
blog_xml %>%
  purrr::map_df(get_urls) %>%
  dplyr::count(domain, sort = TRUE) %>%
  head(n = 10) %>%
  knitr::kable()
```

| domain                |     n|
|:----------------------|-----:|
| github.com            |  1111|
| ropensci.org          |   272|
| twitter.com           |   167|
| cran.r-project.org    |   130|
| en.wikipedia.org      |    60|
| ropensci.github.io    |    29|
| doi.org               |    27|
| bioconductor.org      |    15|
| unconf17.ropensci.org |    15|
| www.gbif.org          |    15|

More Twitter than CRAN! We probably could do with less own-domain use
since `/` would get us here too.

### R code parsing

Remember [that cool post by Matt Dancho analyzing David Robinson’s
code](https://www.business-science.io/learning-r/2018/03/03/how_to_learn_R_pt1.html)?
In theory you could clone any of your favorite blogs ([David Robinson’s
blog](https://github.com/dgrtwo/dgrtwo.github.com), [Julia Silge’s
blog](https://github.com/juliasilge/blog_by_hugo), etc.) to analyze
them, no need to even webscrape first! Note [that you can git clone from
R using the `git2r` package](https://github.com/ropensci/git2r/).

``` r
get_functions <- function(post_xml){
  post_xml %>%
    # select all code chunks
    xml2::xml_find_all(xpath = './/d1:code_block', xml2::xml_ns(.)) %>%
    # select chunks with language info
    .[xml2::xml_has_attr(., "info")] %>%
    # select R chunks
    .[xml2::xml_attr(., "info") == "r"] %>%
    # get the content of these chunks
    xml2::xml_text() %>%
    glue::glue_collapse(sep = "\n") -> code_text
  
  # Base R code parsing tools
  parsed_code <- try(parse(text = code_text,
        keep.source = TRUE) %>%
    utils::getParseData(),
    silent = TRUE)
  
  if(is(parsed_code, "try-error")){
    # this happens because of output sometimes
    # stored in R chunks when not using R Markdown
    return(NULL)
  }
  
  if(is.null(parsed_code)){
    return(NULL)
  }
    
  dplyr::filter(parsed_code,
                grepl("FUNCTION", token))
    
}

blog_xml %>%
  purrr::map_df(get_functions) %>%
  dplyr::count(text, sort = TRUE) %>%
  head(n = 10) %>%
  knitr::kable()
```

| text             |    n|
|:-----------------|----:|
| library          |  263|
| c                |  210|
| aes              |  106|
| filter           |   71|
| mutate           |   64|
| ggplot           |   58|
| function         |   53|
| install.packages |   50|
| install\_github  |   38|
| select           |   38|

Function definititions (`function`), basic stuff (`c`, `library`) and
tidyverse functions seem to be the most popular on the blog!

### Text parsing

After complementing our `commonmark`-`xml2` combo with `urltools` and
with R base code parsing facilities… let’s pair it with
[`tidytext`](https://www.tidytextmining.com/)! What are the words most
commonly used in rOpenSci’s blog posts?

``` r
get_text <- function(post_xml){
  xml2::xml_find_all(post_xml,
                     xpath = './/d1:text', xml2::xml_ns(post_xml)) %>%
    xml2::xml_text(trim = TRUE) %>%
    glue::glue_collapse(sep = " ") %>%
    as.character() -> text
  
  tibble::tibble(text = text)
}

blog_xml %>%
  purrr::map_df(get_text) %>%
  tidytext::unnest_tokens(word, text, token = "words") %>%
  dplyr::filter(!word %in% tidytext::stop_words$word) %>%
  dplyr::count(word, sort = TRUE) %>%
  head(n = 10) %>%
  knitr::kable()
```

| word      |     n|
|:----------|-----:|
| data      |  1969|
| package   |  1097|
| ropensci  |   569|
| packages  |   486|
| time      |   412|
| community |   394|
| code      |   377|
| github    |   358|
| software  |   302|
| science   |   297|

This beats my old code! There’s really something to be said for
purpose-built tools.

Conclusion
----------

I hope this note will inspire you to use `commonmark` and `xml2` when
analyzing Markdown files. As mentioned earlier, Hugo or Jekyll website
sources are Markdown files and GitHub issue threads are too so it should
open up quite a lot of data! If you’re new to XPath, [I’d recommend
reading this
introduction](https://www.w3schools.com/xml/xpath_intro.asp). The
results of XML-parsing are also better parsed without (your writing)
regular expressions: I have shown `urltools` for URL parsing, that base
R has code parsing tools (`parse`, `getParsedData`), and I’ve used
`tidytext`.

Note that if you’re into blog analysis, don’t forget you can also get
information out of the YAML header using… [the `yaml`
package](https://github.com/viking/r-yaml), not regular expressions!

As a bonus, maybe seeing this wrangling inspired you to *modify*
Markdown files programmatically? E.g. what if I wanted to automatically
replace all level 1 headers with level 2 headers? We’re working on that,
stay tuned [and if you want follow this GitHub
thread](https://github.com/commonmark/cmark/issues/264#issuecomment-417960358)!

Thanks to [Jeroen Ooms](https://github.com/jeroen), [Jenny
Bryan](https://jennybryan.org/) and [Jim
Hester](https://www.jimhester.com/) for their answering my XML parsing
(meta) questions.
