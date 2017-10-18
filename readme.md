# Welcome to the new website for the rOpenSci project!

![logo](https://camo.githubusercontent.com/3e3b4c621878afddfe80f1e22d718ef947292f29/68747470733a2f2f7261776769742e636f6d2f726f70656e7363692f6c6f676f732f6d61737465722f69636f6e5f6c6574746572696e675f636f6c6f722e737667)


## How To Contribute A Blog Post

To contribute a blog post (🙏):

1. Fork the repo
2. Create a new file in `/content/blog/YEAR-MONTH-DAY-short-slug.md`
3. Your post must include YAML in this format:


![](https://i.imgur.com/FJmNCVf.png)

Once you've finished your blog post, you can preview locally using Hugo. See the [technical notes](https://github.com/ropensci/roweb2#technical-stuff-) section for installation instructions. 

4. Send a pull request from your fork. Netlify will start building the new version of the site within seconds and you can preview you changes to make sure everything looks as intended. Otherwise push additional fixes till things look right.  
  
![](https://i.imgur.com/HYcQyB4.png)
![](https://i.imgur.com/0deI0d3.png)

5. Tag a rOpenSci staff member to review your PR (@stefaniebutland, @sckott, or @karthik)


## How To Suggest Updates And Fixes To The Website

_TBD_

## Key Files For Templating

- [header navbar](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/partials/navbar.html)
- [footer](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/partials/footer.html)
- **blog**
	- [blog list template](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/_default/list.html)
	- single blog page template
- **tutorials**
	- [tutorial list template](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/tutorials/list.html)
	- [single tutorial page](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/tutorials/single.html)
- **use cases**
	- [use case list page](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/usecases/list.html)
	- [single use case page](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/usecases/single.html)
- **tech notes**
	- [tech notes list](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/technotes/list.html)
	- Single tech notes page

For non-blog changes, this is where most updates will occur.

## Updating The Calendar Of Events

To add or remove calendar events, edit [`themes/ropensci/static/js/calendarJSON.js`](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/static/js/calendarJSON.js)

It should be straightforward to copy the existing JSON template. In the future we can automate writing out this file from the calendar API (failed to work this time around).

## Adding A Community Call

1. Edit [`themes/ropensci/static/js/calendarJSON.js`](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/static/js/calendarJSON.js) and add the event
2. Update the comm calls repo.
3. Add the appropriate css [here](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/static/css/slider.pcss#L75-L96) as the first item of the carousel.
4. Link the events table to the appropriate issue on the `commcalls` repo.


## Technical Stuff 🤓

### Run locally

The current version of `hugo` on the server uses is defined in [netlify.toml](netlify.toml). To install hugo locally:

```
brew install hugo
```

Then run `hugo serve` in the repo directory to start a local server on [http://localhost:1313](http://localhost:1313)

### Compiling CSS

CSS is defined in a series of `pcss` files that you need to compile into CSS when modified.
You need a specific postcss stack defined in [package.json](themes/ropensci/static/package.json).
If you don't have npm yet, run e.g. `brew install node`. 

```sh
cd themes/ropensci/static/
npm install .
npm run css
```

Don't modify the CSS file directly because the changes will get overwritten on the next run.

### Legacy redirects

The [\_redirects](public/_redirects) file is used to proxy or redirect content from the old website. Try to make sure existing hyperlinks to `ropensci.org` will keep working. Currently we have:

 - `/blog/blog/...` redirects to `/blog/...`
 - `/blog/technotes/...` redirects to `/technotes/...`
 - `/assets/...` is proxied by the server to github pages branch of the [old website](https://github.com/ropensci/roweb/tree/gh-pages/assets)
 - The RSS feeds `/feed.xml` redirect to the new location `/index.xml`.


**Legacy website**  
The old website has been archived over at [link]() and continues to maintain the full history of commits, contributors, and issues from the early days of the project. The history of this repo begins anew with this major update. Archiving the old copy allowed us to preserve the old website, while allowing this repo (`roweb`) to evolve without losing watchers/stars/history.

The website is setup to automatically deploy as soon as a PR is merged. Each PR also generates a preview of the website with changes (see deployment preview in the PR) so that any problems can be fixed before hitting the merge button. Once merged, the website is rendered live within minutes.

## Acknowledgements

The rOpenSci project is a fiscally sponsored project of NumFocus Inc and based at the University of California, Berkeley. The project is funded by various public and private grants.

Contents of this website are CC-BY unless otherwise noted. All fonts are licensed for use on this domain and may require a separate license to use elsewhere.

![](ccby.png)

