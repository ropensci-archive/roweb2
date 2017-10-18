# New rOpenSci Website

Some notes on how this is set up.

## Run locally

The current version of `hugo` on the server uses is defined in [netlify.toml](netlify.toml). To install hugo locally:

```
brew install hugo
```

Then run `hugo serve` in the repo directory to start a local server on [http://localhost:1313](http://localhost:1313)

## Compiling CSS

CSS is defined in a series of `pcss` files that you need to compile into CSS when modified.
You need a specific postcss stack defined in [package.json](themes/ropensci/static/package.json).
If you don't have npm yet, run e.g. `brew install node`. 

```sh
cd themes/ropensci/static/
npm install .
npm run css
```

Don't modify the CSS file directly because the changes will get overwritten on the next run.

## Legacy redirects

The [\_redirects](public/_redirects) file is used to proxy or redirect content from the old website. Try to make sure existing hyperlinks to `ropensci.org` will keep working. Currently we have:

 - `/blog/blog/...` redirects to `/blog/...`
 - `/blog/technotes/...` redirects to `/technotes/...`
 - `/assets/...` is proxied by the server to github pages branch of the [old website](https://github.com/ropensci/roweb/tree/gh-pages/assets)
 - The RSS feeds `/feed.xml` redirect to the new location `/index.xml`.
