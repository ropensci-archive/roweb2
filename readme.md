![logo](https://i.imgur.com/jNpQMPW.png)
# rOpenSci website

Welcome to the new (October 2017) website for the rOpenSci project. Our old website ([repo](https://github.com/ropensci/roweb), [site](http://legacy.ropensci.org/)) is now archived and all new content should be added to this repository. For any issues with the site including typos or rendering issues, please file an [issue](https://github.com/ropensci/roweb2/issues) or send a pull-request. The site automatically deploys once pull requests are merged.

__TOC__

- [How to contribute a blog post](#contributing-a-blog-post)
- [Previewing the site locally](#installing-hugo-for-local-preview)
- [Rendering issues and non-content fixes](#updating-page-templates)
- [Acknowledgements](#acknowledgements)

### Contributing a blog post

To contribute a blog post (🙏), after getting the go-ahead and a tentative publication date from our community manager [Stefanie Butland](https://ropensci.org/authors/stefanie-butland/):

See [editorial suggestions](#blog-post-editorial-suggestions). Before that, technically,

1. [Fork the repo](https://happygitwithr.com/fork-and-clone.html)
2. Create a new file in `/content/blog/YEAR-MONTH-DAY-slug.md`.
    * [Markdown template](2019-06-04-post-template.md), 
    * [ Markdown template]: either [to be copy-pasted](https://github.com/ropenscilabs/rodev/blob/master/inst/rmarkdown/templates/ropensci-blog-post/skeleton/skeleton.Rmd) or install [`rodev`](https://docs.ropensci.org/rodev/) via `remotes::install_github("ropenscilabs/rodev")` after which in RStudio you can click on File > New File > R Markdown... > From Template > rOpenSci Blog Post to create the file.
3. Your post must include YAML in this format:

```yaml
---
slug: "treestartr"
title: Generating reasonable starting trees for complex phylogenetic analyses
package_version: 0.1.0
authors:
  - April Wright
date: 2018-12-11
categories: blog
topicid:
tags:
- Software Peer Review
- R
- community
- software
- packages
- treestartr
- phylogeny
- paleontology
- fossils
- divergence time
---
```

![](https://i.imgur.com/Ng9VE0J.png)

5. If your blog post has any images (or other assets), create a folder under `themes/ropensci/static/img/blog-images/` with the pattern `<DATE-SLUG>` (e.g. `2018-12-11-treestartr`) and place them there. To reference any of these objects in your post,  use `/img/blog-images/<DATE-SLUG>/name-of-image.png`. If the paths are correct, you should see the preview render correctly (see next step). For images, not generated by R Markdown use [Hugo's figure shortcode](https://gohugo.io/content-management/shortcodes/#figure), e.g.

```
{{< figure src="/img/blog-images/<DATE-SLUG>/name-of-image.png" alt="write an alternative text describing the information contained in the image" width="500" >}}
```

6. Once you've drafted your blog post, you can [preview locally using Hugo](#installing-hugo-for-local-preview) or skip to the next step to preview on the pull request. 

7. Send a pull request from your fork at least one week prior to the post date to allow time for review. Netlify will start building the new version of the site within seconds and you can preview you changes to make sure everything looks as intended. Otherwise push additional fixes till things look right.  

![](https://i.imgur.com/HYcQyB4.png)
![](https://i.imgur.com/0deI0d3.png)

8. Tag rOpenSci community manager to review your pull request (`@stefaniebutland`) unless you were assigned another reviewer.

#### Blog post editorial suggestions

##### General instructions

- Include tags in YAML. [Browse tags](https://ropensci.org/tags/), and re-use either the plural or singular form of an existing tag e.g. "packages" exists, so use that, rather than "package"
- For formatting of package names, functions, and code, follow the [tidyverse style guidance](https://style.tidyverse.org/documentation.html#r-code).
- If you would like a specific image from your post to be featured in tweets that include a link to your post, add to YAML `twitterImg: img/blog-images/<DATE-SLUG>/name-of-image.png`. Omit the leading `/`
- Use ### or #### to format headings in your post; larger sizes don't look good. Note long headings with #### don't wrap well.
- Spell 'rOpenSci', not 'ROpenSci'
- For references, put `[^1]` after the text you want to cite in body of the post, and put `[^1]: citation details` at the end of the post. They will link to each other. Example in this post [markdown](https://raw.githubusercontent.com/ropensci/roweb2/master/content/blog/2019-04-18-ropensci-mee.md) -> [rendered](https://ropensci.org/blog/2019/04/18/wild-standards/). 
- Check to see if you're listed on [our authors page](https://ropensci.org/authors/). If you are listed, consider updating the links to your online presence in the author's index file. If not, create an [author's index file for yourself](#author-file). 

##### Instructions for posts about peer-reviewed packages

For a post about your peer-reviewed package you should:
- Browse other posts about peer-reviewed packages with tag '[Software Peer Review](https://ropensci.org/tags/software-peer-review/)'
- Consider giving some narrative on motivation for creating the package, or something you learned in the process, and share an interesting use case
- Acknowledge reviewers by name with links to their GitHub or Twitter; no need to explicitly acknowledge the editor
- Acknowledge other contributors, if any
- Consider ending by pointing to open issues that readers might work on
- Include YAML tags 'Software Peer Review', 'R', the package name, and tags that were [topic labels in your package review](https://github.com/ropensci/software-review/labels)

##### Blog posts about your experience as a reviewer

For a post about your experience as a reviewer you can browse other posts with tag '[reviewer](https://ropensci.org/tags/reviewer/)'

#### Create an author's index file for yourself {#author-file}

If you don't already have one, create `_index.md` in `roweb2/content/authors/firstname-lastname/` with information about your online presence. Keep accents in your name. If you're not sure of how to slugify/urlize your name, look at other people's folder names for examples.

[Template for an author file](author-name.md), Example 

```yaml
---
name: Kelly O'Briant
link: https://kellobri.github.io/
twitter: kellrstats
github: kellobri
gitlab: yourgitlabusername
---
```

Example when rendered: [Kelly O'Briant's author page](https://ropensci.org/authors/kelly-obriant/)

At minimum, provide your name and at least one link or Twitter/GitHub/GitLab username. The `link` field is meant for your preferred online presence URL, to be filled only if you have one that's not your GitHub, GitLab or Twitter account. The `twitter`, `github` and `gitlab` fields are for your Twitter/GitHub/GitLab usernames (without "@").

Then when a reader clicks on your by-line in your blog post, tech note, or a community call you have presented in, they can see how to find you online, as well as seeing a list of all of those you have contributed. 

### Installation requirements

There are no requirements to simply add a post/fix and push to GitHub for a render preview on a pull request. However, if you wish to preview the site locally, you must install Hugo.

#### Installing Hugo for local preview

The current version of Hugo on the server uses is defined in [netlify.toml](netlify.toml). 

To install Hugo locally, refer to [Hugo docs](https://gohugo.io/getting-started/installing/) or run `blogdown::install_hugo()`.

Then run `hugo serve` in the repo directory to start a local server on [http://localhost:1313](http://localhost:1313). To view a future-dated blog post, use `hugo serve -F`.


#### Updating page templates

For other website issues and updates, see [developer-notes](developer-notes.md)
.
## Acknowledgements

The rOpenSci project is a fiscally sponsored project of [NumFOCUS](https://www.numfocus.org/) and based at the University of California, Berkeley. The project is funded by grants from various public and private institutions and from [donations](https://ropensci.org/donate/).

![](https://i.imgur.com/zlWonsc.png)

![](ccby.png) Contents of this website are licensed as CC-BY **unless otherwise noted**. All fonts are licensed for use on this domain and may require a separate license to use elsewhere.
