# Welcome to the new website for the rOpenSci project!

![logo](https://camo.githubusercontent.com/3e3b4c621878afddfe80f1e22d718ef947292f29/68747470733a2f2f7261776769742e636f6d2f726f70656e7363692f6c6f676f732f6d61737465722f69636f6e5f6c6574746572696e675f636f6c6f722e737667)


The old website has been archived over at [link]() and continues to maintain the full history of commits, contributors, and issues from the early days of the project. The history of this repo begins anew with this major update. Archiving the old copy allowed us to preserve the old website, while allowing this repo (`roweb`) to evolve without losing watchers/stars/history.

The website is setup to automatically deploy as soon as a PR is merged. Each PR also generates a preview of the website with changes (see deployment preview in the PR) so that any problems can be fixed before hitting the merge button. Once merged, the website is rendered live within minutes.

### How to contribute a blog post



### How to suggest updates and fixes to the website


### Key files for templating

- header
- footer
- blog
	- blog list template
	- single blog page template
- tutorials
	- tutorial list template
	- single tutorial page
- use cases
	- use case list page
	- single use case page
- tech notes
	- tech notes list
	- Single tech notes page

For non-blog changes, this is where most updates will occur.

### Updating the calendar of events

To add or remove calendar events, edit `themes/ropensci/static/js/calendarJSON.js`

It should be straightforward to copy the existing JSON template. In the future we can automate writing out this file from the calendar API (failed to work this time around).

### Adding a community call

