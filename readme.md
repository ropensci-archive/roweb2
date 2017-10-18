# Welcome to the new website for the rOpenSci project!

![logo](https://camo.githubusercontent.com/3e3b4c621878afddfe80f1e22d718ef947292f29/68747470733a2f2f7261776769742e636f6d2f726f70656e7363692f6c6f676f732f6d61737465722f69636f6e5f6c6574746572696e675f636f6c6f722e737667)


## How to contribute a blog post

_TBD_. Scott: Could you add this in?

## How to suggest updates and fixes to the website

_TBD_

## Key files for templating

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

## Updating the calendar of events

To add or remove calendar events, edit [`themes/ropensci/static/js/calendarJSON.js`](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/static/js/calendarJSON.js)

It should be straightforward to copy the existing JSON template. In the future we can automate writing out this file from the calendar API (failed to work this time around).

## Adding a community call



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
