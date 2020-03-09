---
slug: introducing-wishlist
title: Introducing a Wishlist for Scientific R Packages
date: '2015-03-10'
author:
  - Os Keyes
tags:
  - R
  - GitHub
---

There are two things that make R such a wonderful programming environment - the vast number of packages to access, process and interpret
data, and the enthusiastic individuals and subcommunities (of which rOpenSci is a great example). One, of course, flows from the other:
R programmers write R packages to provide language users with more features, which makes everyone's jobs easier and (hopefully!)
attracts more users and more contributions.

But what if you have an idea, or a need, but not the time or confidence to write a package for it? I can't speak for this blog's
readers, but I've been writing R for about two years and it took a good long while before I felt comfortable contributing upstream
to CRAN. Or, what if you do have the time, and do have the confidence, but want to spend that time well, on things that you know
other people will find useful, and don't know what that is?

After a conversation on Twitter (where all the best R things happen) we've decided to create a dedicated repository to serve as
a wishlist of scientific R packages - appropriately named ["wishlist"](https://github.com/ropensci/wishlist). We're still getting the
"meta" documentation together, but it's open and accepting ideas!

## How to contribute
If you've got an idea for a package, but are looking for collaborators, [open an issue](https://github.com/ropensci/wishlist/issues)! Explain what the package does, what its necessary features are, and what the use cases are. What sort of help are you looking for - someone to write the entire thing? Someone to work on integrating a particularly thorny piece of C++? A statistics expert to check the
implementation of an algorithm? Are there any C or C++ libraries we could integrate? Are there libraries in other, less-easily-integrated
languages which we could use as a template for what the package should do?

Once an idea is accepted, [it lives on the wiki](https://github.com/ropensci/wishlist/wiki). If you've got the time to work on a project,
head over there and see if anything strikes your fancy. If it does, contact the original authors and the other volunteers, start a
repository somewhere, and have fun! Just make sure to note ''on'' the wiki that you're working on it, and where you're doing so,
for the sake of future readers :).

## What to contribute
The only criteria for an idea's inclusion is that the package serve a clear scientific use (as an example:
"wouldn't it be nice if we had an API client for this data repository?" qualifies. [rfoaas](https://cran.r-project.org/web/packages/rfoaas/index.html) probably wouldn't). A good heuristic would be: if you can explain how this package would benefit scientists or
researchers in a way that's convincing to you, propose it!
