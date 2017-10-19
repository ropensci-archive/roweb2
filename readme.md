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

## Technical Stuff 🤓

### Run locally

The current version of `hugo` on the server uses is defined in [netlify.toml](netlify.toml). To install hugo locally:

```
brew install hugo
```

Then run `hugo serve` in the repo directory to start a local server on [http://localhost:1313](http://localhost:1313)


For other website issues and updates, see [advanced-theming](advanced-theming.md)

## Acknowledgements

The rOpenSci project is a fiscally sponsored project of NumFocus Inc and based at the University of California, Berkeley. The project is funded by various public and private grants.

Contents of this website are CC-BY unless otherwise noted. All fonts are licensed for use on this domain and may require a separate license to use elsewhere.

![](ccby.png)

