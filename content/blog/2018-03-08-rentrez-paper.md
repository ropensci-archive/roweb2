---
slug: "rentrez paper" 
title: A rentrez paper, and how to use the NCBI's new API keys 
package_version 1.2.1
authors:
    - name David Winter
    - url david-winter.info
date: 2018-03-08
catergories: blog
tags:
    - r 
    - community 
    - software
    - NCBI
    - genetics
    - scholarly-literature
    - data-access
---

I am happy to say that the latest issue of _The R Journal_ [includes a paper
describing rentrez](https://journal.r-project.org/archive/2017/RJ-2017-058/index.html), 
rOpenSci's package for NCBI data. The paper describes some of the design choices 
made in developing `rentrez`, and demonstrates how the package can be used to make 
the most of the huge datasets made available from the NCBI. 

It's now been more than six years since I [started cleaning up my research
code](https://github.com/ropensci/rentrez/commit/67c504b61534b77f5ecaad73761ada1435a9e211)
in the hope of developing a package that might be useful to others. So, it's nice to finally
be able to type `r citation(package="rentrez")` and see a formal citation for
the work that's gone into the project:

```r
To cite rentrez in publications use:

  Winter, D. J. (2017) rentrez: an R package for the NCBI eUtils API
  The R Journal 9(2):520-526

A BibTeX entry for LaTeX users is

  @Article{,
    title = {{rentrez}: an R package for the NCBI eUtils API},
    author = {David J. Winter},
    journal = {The R Journal},
    year = {2017},
    volume = {9},
    issue = {2},
    pages = {520--526},
  }

```

More importantly, the publication of this paper gives me a chance to thank the
many people that have helped make `rentrez` into a useful package. I was very
lucky to have this code included in rOpenSci at an early stage. Being part of
the wider project made sure `rentrez` kept pace with the best-practices for code 
and documentation developed by the R community and got the package out to a wider 
audience than would have otherwise been possible. I am thankful to everyone who has
filed an issue or contributed code to the `rentrez`. I also have to
single out Scott Chamberlain, who has done a great deal to make sure the code 
meets community standards and is useful to as many people as possible.

## API keys for eUtils

To celebrate the publication of this paper I am going to speed up `rentrez` by a
factor of three! 

Well, the timing is coincidental, but the latest release of does make it
possible to send and receive information from the NCBI at a greater rate than
was previously possible. The NCBI now gives users the opportunity to [register for an access
key](https://ncbiinsights.ncbi.nlm.nih.gov/2017/11/02/new-api-keys-for-the-e-utilities/)
that will allow them to make up to 10 requests per second (non-registered users are limited
to 3 requests per second per IP address). As of the latest release, `rentrez` 
supports the use of these access keys while enforcing the appropriate rate limits. 
For one-off cases, this is as simple as adding the `api_key` argument to given 
function call. 

```r
prot_links <- entrez_link(db="protein", dbfrom="gene", id=93100, api_key ="ABCD123")
```

It most cases you will want to use your API for each of several calls to the
NCBI. `rentrez` makes this easy by allowing you to set an environment variable
,`ENTREZ_KEY`. Once this value is set to your key `rentrez` will use it for all
requests to the NCBI. To set the value for a single R session you can use the
function `set_entrez_key()`. Here we set the value and confirm it is now
available as an environment variable.

```r
set_entrez_key("ABCD123")
Sys.getenv("ENTREZ_KEY")
```

```
## [1] "ABCD123"
```
If you use `rentrez` often you should edit your `.Renviron` file (see `r
help(Startup)` for a description of this file) to include your key. Doing so will
mean all requests you send will take advantage of your API key. Here's the line
to add:

```ini
ENTREZ_KEY=ABCD123
```

As long as an API key is set by one of these methods, `rentrez` will allow you
to make up to ten requests per second.

## Bugs and use-cases please!

The publication of the  _R Journal_ is not the end of development for `rentrez`.
Though the package is now feature-complete and stable, I am very keen to make sure
it keeps pace with the API it wraps and squash any bugs that might arise. I also 
appreciate use-cases that demonstrate how the package can take advantage of NCBI
data. So, please, [file issues at the projects repository if you have any
questions about it](https://github.com/ropensci/rentrez/issues)!
