![logo](https://i.imgur.com/jNpQMPW.png)
# rOpenSci website

Welcome to the new (October 2017) website for the rOpenSci project. Our old website ([repo](https://github.com/ropensci/roweb), [site](http://legacy.ropensci.org/)) is now archived and all new content should be added to this repository. For any issues with the site including typos or rendering issues, please file an [issue](https://github.com/ropensci/roweb2/issues) or send a pull-request. The site automatically deploys once pull requests are merged.

__TOC__

- [How to contribute a blog post](https://github.com/ropensci/roweb2#contributing-a-blog-post)
- [Previewing the site locally](https://github.com/ropensci/roweb2#installing-hugo-for-local-preview)
- [Rendering issues and non-content fixes](https://github.com/ropensci/roweb2#updating-page-templates) 
- [Acknowledgements](https://github.com/ropensci/roweb2#acknowledgements)

### Contributing a blog post


To contribute a blog post (🙏):

See [editorial suggestions](https://github.com/ropensci/roweb2#blog-post-editorial-suggestions) below

1. Fork the repo
2. Create a new file in `/content/blog/YEAR-MONTH-DAY-short-slug.md`
3. Your post must include YAML in this format:



```
---
slug: "bikedata"
title: Data from Public Bicycle Hire Systems
package_version: 0.0.1
authors:
  - name: Mark Padgham
    url: https://github.com/mpadge
date: 2017-10-17
categories: blog
topicid: 925
tags:
- r
- community
- software
- review
- onboarding
- packages
- bikedata
- data-acess
- geospatial
---
```

![](https://i.imgur.com/sJlnKwG.png)

5. If your blog post has any images (or other assets), create a folder under `themes/ropensci/static/img/blog-images/` with the pattern `<DATE-SLUG>` (e.g. `2017-10-10-bikedata`) and place them there. To reference any of these objects in your post,  use `/img/blog-images/<DATE-SLUG>/name-of-image.png`. If the paths are correct, you should see the preview render correctly (see next step).

6. Once you've drafted your blog post, you can preview locally using Hugo or skip to the next step to preview on the pull request. See [technical notes](https://github.com/ropensci/roweb2/blob/master/readme.md#installation-requirements) section for installation instructions if you wish to preview locally. 

7. Send a pull request from your fork one week prior to the post date to allow time for review. Netlify will start building the new version of the site within seconds and you can preview you changes to make sure everything looks as intended. Otherwise push additional fixes till things look right.  
  
![](https://i.imgur.com/HYcQyB4.png)
![](https://i.imgur.com/0deI0d3.png)

8. Tag a rOpenSci staff member to review your pull request (@stefaniebutland, @sckott, @jeroen, or @karthik)

#### Blog post editorial suggestions

For a post about your reviewed and onboarded package you should:
- give some narrative on motivation for creating the package
- acknowledge reviewers by name with links to their GitHub or Twitter
- acknowledge other contributors, if any
- consider ending by pointing to open issues that readers might work on
- browse other posts about onboarded packages with tag '[onboarding](https://ropensci.org/tags/onboarding/)'
- include YAML tags `onboarding`, `review` and tags that were topic labels in your package review
- browse [other tags](https://ropensci.org/tags/), and do not use the plural/singular form of an existing tag. E.g. "databases" exists so use that preferentially, not "database"
- add to YAML `twitter: <twitterhandle>` under `- name: <name>` and use a non-twitter link such as GitHub, website, or ORCID for `url: <link>` ([example](https://raw.githubusercontent.com/ropensci/roweb2/master/content/blog/2018-11-13-antarctic.md)) if you would like author's twitter account to be linked from a twitter icon
- add to YAML `twitterImg: img/blog-images/<DATE-SLUG>/name-of-image.png` if you want a specific image from your post to be featured in tweets that include a link to your post


For a post about your experience as a reviewer you can browse other posts with tag '[reviewer](https://ropensci.org/tags/reviewer/)'

### Installation requirements

There are no requirements to simply add a post/fix and push to GitHub for a render preview on a pull request. However, if you wish to preview the site locally, you must install Hugo.

#### Installing Hugo for local preview

The current version of `hugo` on the server uses is defined in [netlify.toml](netlify.toml). To install hugo locally:

```
brew install hugo
```

Then run `hugo serve` in the repo directory to start a local server on [http://localhost:1313](http://localhost:1313). To view a future-dated blog post, use `hugo serve -F`.


#### Updating page templates 

For other website issues and updates, see [developer-notes](developer-notes.md)
.
## Acknowledgements

The rOpenSci project is a fiscally sponsored project of [NumFOCUS](https://www.numfocus.org/) and based at the University of California, Berkeley. The project is funded by grants from various public and private institutions and from [donations](https://ropensci.org/donate/). 

![](https://i.imgur.com/zlWonsc.png)

![](ccby.png) Contents of this website are licensed as CC-BY **unless otherwise noted**. All fonts are licensed for use on this domain and may require a separate license to use elsewhere.



