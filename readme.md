# New rOpenSci Website

Some notes on how this is set up.

## Compiling CSS

You need a specific postcss stack defined in [package.json](themes/ropensci/static/package.json).
If you don't have npm yet, run e.g. `brew install node`. Then run:

```sh
cd themes/ropensci/static/
npm install .
npm run css
```

