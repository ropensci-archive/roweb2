---
slug: "dev-dittodb"
title: Developing {dittodb}
author:
  - Jonathan Keane
# Set the date below to the publication date of your post
date: 2020-08-18
# Minimal tags for a post about a community-contributed package
# that has passed software peer review are listed below
# Consult the Technical Guidelines for information on choosing other tags
tags:
- Software Peer Review
  - packages
  - R
  - community
  - testing
  - databases
  - SQL
  - dittodb
# The summary below will be used by e.g. Twitter cards
description: "A peak behind the scenes of making {dittodb}"
# If you have no preferred image for Twitter cards,
# delete the twitterImg line below
# Note there is no '/' symbol before 'img' here
# if needed replace blog with technotes
# twitterImg: blog/2019/06/04/post-template/name-of-image.png
---

This post is a few different

### The idea

The idea for {dittodb} came as a very practical one: at my day job I was working on an R package that interacted with our databases. Though we could test a lot of things, we were struggling with writing good tests for our database interactions. We could connect technically to the actual production database, but that meant that the tests were slow and depended on data that was sometimes change[^3]. Worst of all: it would mean having to store our database credentials in our [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration) infrastructure. 

I had gotten used to using mocked HTTP interfaces with other testing packages (see the section below about how {httptest} inspired {dittodb}) and since a database connection is very similar (one sends queries and gets different responses based on those queries) I thought surely someone has already written up an R package for mocking database connects.[^4] There's even [a standard interface](https://CRAN.R-project.org/package=DBI) that most database packages use for these interactions!

After a lot of googling and finding nothing, I came to the rOpenSci slack and asked: has anyone seen anything like this? And to my shock, the answer was no. That's when I started chatting with [Mauricio Vargas](https://pacha.dev) about what would become {dittodb}.

### How was {dittodb} inspired by {httptest}

At a previous job, I had the opportunity to work with [Neal Richardson](https://enpiar.com/), the author of [{httptest}](https://enpiar.com/r/httptest/) and we made extensive use of mocked HTTP interactions while developing the [Crunch.io R package](https://github.com/crunch-io/rcrunch). So I had a lot of experience with the patterns of how {httptest} worked, and I [even contributed a small pull request](https://github.com/nealrichardson/httptest/pull/25). Knowing that the overall flow of the package would be similar gave me a really nice framework to build out {dittodb}[^5].

### Main technical challenges

#### Using method dispatch for good

#### Using `trace` in a relatively unorthodox way


### What's in a name?

As [the saying goes](https://martinfowler.com/bliki/TwoHardThings.html), naming things is one of the hardest parts of software development. When we first started working on {dittodb} we called it {dbtest}. This fit nicely because, as we talked about above, {dittodb} took a lot of inspiration from {httptest}, so why not just swap out the bit that was being tested `http` > `db`. It was simple and descriptive.[^1] But there was just one problem, there was [already a package with the same name](https://github.com/rstudio/dbtest)[^2]. Though it wasn't on CRAN, we still didn't want to cause confusion. So we set out to think up a different name. [Mauricio Vargas](https://pacha.dev) had the great idea to name it {dittodb}.



{{< figure src = "132.png" width = "150" alt = "An illustration of the Pokemon Ditto" caption = "Ditto ©Pokémon" class = "floatLeft" >}}

The name {dittodb} takes inspiration from a few sources: The first, and most obvious for developers of a certain age, is the [ditto pokemon](https://www.pokemon.com/us/pokedex/ditto) known for its ability to take on the form of, and impersonate, any other pokemon. Following this, {dittodb} takes on the form and properties of a database backend, without actually being that database backend. For different set of (likely non-overlapping with the first) developers {dittodb} will recall the [spirit duplicators](https://en.wikipedia.org/wiki/Spirit_duplicator) used to make duplication of printed materials by making an artifact during the writing process that can be used to make further copies which were frequently called ditto-machines. {dittodb} is similar when it is recording fixtures: during the process of interacting with a live backend, it makes copies of the responses that can be used ~~to make further copies~~ while running tests as fixtures.


### Resources

When working on the subtitles we stumbled upon many useful resources ranging from quick tips and best practices to full guide describing the process of same-language subtitling for videos. They helped us ease our process and hope they will help you as well if you want to join the subtitling adventure:

* A blog post on Amara's blog with [7 tips for subtitling videos](https://blog.amara.org/2011/08/09/best-practices-for-subtitling-videos/),
* A very short summary of [standard closed captioning guidelines](https://www.capitalcaptions.com/services/closed-captioning-services/closed-captioning-guidelines/) by Capital Captions,
* The longer [Transcription Guidelines for Captioning](https://support.automaticsync.com/hc/en-us/articles/202355665-Transcription-Guidelines-for-Captioning) by CaptionSync, but they mostly referred to movie captioning,
* The exhaustive [BBC Subtitle Guidelines](https://bbc.github.io/subtitle-guidelines/) which describe the process and rules to best subtitle videos, it's freely available on GitHub.


[^1]: Though it should be pointed, dbtest also had the unfortunate property that iOS and macOS auto-correctors would almost constantly "correct" it to detest. Though I will admit to being frustrated by bugs that my test suites reveal, detest wasn't the first thing I wanted associated with this new package.
[^2]: Many thanks to [@ma_salmon](https://twitter.com/ma_salmon) for pointing this out to us!
[^3]: And these changes are sometimes for the good, in the case of [ETL](https://en.wikipedia.org/wiki/Extract,_transform,_load) bugs that we found that were later corrected. 
[^4]: In fact, there are [multiple](https://docs.ropensci.org/vcr/) [packages](https://docs.ropensci.org/webmockr/) for [testing HTTP interfaces](https://enpiar.com/r/httptest/).
[^5]: With proper attribution, of course.