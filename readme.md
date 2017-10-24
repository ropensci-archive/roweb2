![logo](https://i.imgur.com/jNpQMPW.png)
# rOpenSci.org

Welcome to the new (October 2017) website for the rOpenSci project. Our old [website](https://github.com/ropensci/roweb) is now archived and all new content should be added to this repository. For any issues with the site including typos or rendering issues, please file an issue or send a pull-request. The site automatically deploys once pull requests are merged.

__TOC__

- How to contribute a blog post
- Previewing the site locally
- Rendering issues and non-content fixes
-Acknowledgements


### Contributing a blog post


To contribute a blog post (🙏):

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
- package
- bikedata
- data-acess
- geospatial
---
```

![](https://i.imgur.com/sJlnKwG.png)

Once you've drafted your blog post, you can preview locally using Hugo. See [technical notes](https://github.com/ropensci/roweb2#technical-stuff-) section for installation instructions. 

4. Send a pull request from your fork. Netlify will start building the new version of the site within seconds and you can preview you changes to make sure everything looks as intended. Otherwise push additional fixes till things look right.  
  
![](https://i.imgur.com/HYcQyB4.png)
![](https://i.imgur.com/0deI0d3.png)

5. Tag a rOpenSci staff member to review your PR (@stefaniebutland, @sckott, @jeroen, or @karthik)

### Installation requirements

There are no requirements to simply add a post/fix and push to GitHub for a render preview on a pull request. However, if you wish to preview the site locally, you must install Hugo.

#### Installing Hugo for local preview

The current version of `hugo` on the server uses is defined in [netlify.toml](netlify.toml). To install hugo locally:

```
brew install hugo
```

Then run `hugo serve` in the repo directory to start a local server on [http://localhost:1313](http://localhost:1313)


#### Updating page templates 

For other website issues and updates, see [advanced-theming](advanced-theming.md)

## Acknowledgements

The rOpenSci project is a fiscally sponsored project of [NumFocus Inc](https://www.numfocus.org/) and based at the University of California, Berkeley. The project is funded by various public and private grants.

![](https://i.imgur.com/zlWonsc.png)

Contents of this website are CC-BY unless otherwise noted. All fonts are licensed for use on this domain and may require a separate license to use elsewhere.

![](ccby.png)

