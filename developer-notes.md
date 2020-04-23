## Deployment

The website is setup to automatically deploy via Netlify as soon as a PR is merged. Each PR also generates a preview of the website with changes (see deployment preview in the PR) so that any problems can be fixed before hitting the merge button. Once merged, the website is rendered live within minutes.

## Key Files For Templating

Apart from the [homepage](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/index.html) all content is built from Markdown files stored under content/, templated as explained below, and with the inclusion of html partials.

### Templates

They use partials, e.g. all templates use the same header, head and footer. Partials are presented in the next subsection.

- **default pages** e.g. about, donate
  - [single page template](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/_default/list.html) -- it includes  a loop to include all partials mentioned in the frontmatter, e.g. in the community.md you see `partials=["community.html","mailkimp.html"]` that will include the team, collaborators, and form to subscribe to the newsletter.
- **blog**
	- [blog list template](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/blog/list.html)
	- [single blog page template](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/blog/single.html)
- **tutorials**
	- [tutorial list template](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/tutorials/list.html)
	- [single tutorial page](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/tutorials/single.html)
- **tags page**
  - [taxonomy list template](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/_default/terms.html)
  - [template for each tag page](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/taxonomy/tag.html)
- **use cases**
	- [use case list page](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/usecases/list.html)
	- [single use case page](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/usecases/single.html)
- **tech notes**
	- [tech notes list](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/technotes/list.html)
	- [Single tech notes page]((https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/technotes/single.html))

### Partials

All under https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/partials/

- [header](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/partials/header.html)
- [navbar](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/partials/navbar.html)
- [head](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/partials/head.html)
- [footer](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/layouts/partials/footer.html)

## Updating The Calendar Of Events

To add or remove calendar events, edit [`themes/ropensci/static/js/calendarJSON.js`](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/static/js/calendarJSON.js)

It should be straightforward to copy the existing JSON template. In the future we can automate writing out this file from the calendar API (failed to work this time around).

## Adding A Community Call

1. Edit [`themes/ropensci/static/js/calendarJSON.js`](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/static/js/calendarJSON.js) and add the event
2. Update the comm calls repo.
3. Add the appropriate css [here](https://github.com/ropensci/roweb2/blob/master/themes/ropensci/static/css/slider.pcss#L75-L96) as the first item of the carousel.
4. Link the events table to the appropriate issue on the `commcalls` repo.

### Compiling CSS

CSS is defined in a series of `pcss` files that you need to compile into CSS when modified.
You need a specific postcss stack defined in [package.json](themes/ropensci/static/package.json).
If you don't have npm yet, run e.g. `brew install node`. 

```sh
cd themes/ropensci/static/
npm install . --no-optional
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
The old website has been archived over at [`ropensci/roweb`](https://github.com/ropensci/roweb) and continues to maintain the full history of commits, contributors, and issues from the early days of the project. 
