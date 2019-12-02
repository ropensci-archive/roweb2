---
date: '2019-12-03'
slug: mark-padgham
title: Introducing Mark Padgham, rOpenSci’s new Software Research Scientist
authors:
  - Stefanie Butland
  - Mark Padgham
  - Karthik Ram
  - Noam Ross
categories: blog
topicid:
tags:
  - community
  - interviews
  - staff
---
We’re thrilled to be introducing a new member of our team. Mark Padgham has joined rOpenSci as a Software Research Scientist working full-time from Münster, Germany. Mark will play a key role in research and development of statistical software standards and expanding our efforts in software peer review, enabled by [new funding](/blog/2019/07/15/expanding-software-review/) from the Sloan Foundation. He will work closely with [Noam Ross](/authors/noam-ross/), rOpenSci Leadership team member, and Scientist at EcoHealth Alliance and [Karthik Ram](/authors/karthik-ram/), rOpenSci Project Lead.

Mark has made many contributions to rOpenSci prior to joining the team. He has developed four peer-reviewed packages: [osmdata](https://docs.ropensci.org/osmdata/) to import Open Street Map data[^1]; [osmplotr](https://docs.ropensci.org/osmplotr/) to make bespoke plots with that data; [bikedata](https://docs.ropensci.org/bikedata/) to access historical trip data from public bicycle-hire systems [^2], and most recently, [mapscanner](https://github.com/ropensci/software-review/issues/330) to print maps, draw on them, and scan them back in. Mark also contributed to the development of [stats19](https://docs.ropensci.org/stats19/)[^3]. He has reviewed three packages: [piggyback](https://github.com/ropensci/software-review/issues/220), [tradestatistics](https://github.com/ropensci/software-review/issues/274), and [bomrang](https://github.com/ropensci/software-review/issues/121)[^4], authored [two blog posts](/authors/mark-padgham/), and participated in rOpenSci [unconf18](/blog/2018/06/05/unconf18/).

_Note from Stefanie:_ When I met Mark in Seattle at rOpenSci’s unconf18, I was struck by his personal commitment to “walking the talk” of getting around by bicycle. I knew him only from his blog post on [getting data from public bicycle rental systems](/blog/2017/10/17/bikedata/), and there he was with colleagues, walking down the street with a brightly-colored rental bike. He said he made a point of using such clearly marked rental bikes when visiting other cities since they’re great conversation-starters about sustainable cities.

{{< figure src = "/img/team/mark-padgham.jpg" width = "250" alt = "Headshot of Mark Padgham" >}}

> I’ve got a lot of concrete visions for extending testing well beyond anything that’s been done in a computational or quantitative way. Convincing leaders in statistics and statistical software that’s a good idea is certainly going to be challenging and very rewarding.

We talked with Mark to learn more about him, and his work.


### What do you want people to know about your background?

I live in Germany, but grew up in Australia. I have an undergraduate degree in physics and maths, a PhD in ecology, qualifications in climatology and meteorology, as well as official teaching qualifications. All of these were obtained from universities in Melbourne, Australia - each one from a different university. Following my PhD, I worked in post-doctoral academic positions at the interface of ecology and climatology, before changing country and continent to Germany, and changing academic direction to the study of urban systems.

I have always said I’m dedicated to changing the world one walking trip or one bike trip at a time to change the way people live life in cities, but now I have a much more “meta” personal motivation. I develop software in the hope that it will make the world a better place. It’s focussed on a particular kind of change. My software is primarily motivated by a desire to make the understanding of cities easier and more accessible - from accessing the raw data of street networks (osmdata), to fine-scaled data on mobility (bikedata), to understanding and mapping how, where, and when people move through cities (through the [dodgr](https://github.com/ATFutures/dodgr) package).


### What is your favorite thing about R?

I like to use R (rather than another mainstream language) because R is the best language around to develop master control systems from your raw data input through to documentation outputs, as websites, published reports, dashboards and every step in between. They can all be controlled from the one language. There’s no other language that reaches that level of master control system. It is an accolade of what RStudio has done to transform the utility of the language.

When I sit down with R, the first question I ask myself is, how do I get into C++ from here?


### What’s an R thing you’d like to learn?

Yeah…lots of things [_long pause while Mark tries to choose one thing_]. To really understand how the C-level language of R interfaces with objects compile from other languages and environments - that would be really cool. And at the level of C code, how lazy-evaluation works. Everyone’s gotten so used to that but you don’t even have to think about it. That’s a piece of amazing magic under the hood that I don’t understand.


### You’ve made so many concrete contributions to rOpenSci, as well as less-visible community contributions. What made you keep coming back to give more?

It comes back to my belief in software as a tool to make the world a better place. Part of that is an active effort on the part of myself and the others with whom I work and develop packages to develop a comprehensive ecosystem. I make an active personal effort to develop a comprehensive ecosystem of packages that presents an open source alternative to closed source commercial environments. And that open source alternative will hopefully help to openly transform the world.

It’s in my own interest to continue to contribute to the community because it’s only in that way that what I have contributed continues to maintain its value. Without ongoing contributions to rOpenSci that whole thing stops at the point at which I left it and all I’ve got is to sit back and hope something happens. That’s worth nothing in comparison to me continuing to actively strive to foster, cultivate, grow, expand and enrich this ecosystem of tools in our little niche.


### What will you be working on and what do you think are some of the key challenges?

I’ll be working on developing robust tools to assess packages. As an inveterate coder, I love nothing more than to get up in the morning and find myself still sitting there at 4:00 in the afternoon in my “coding-hole”. But a big part of the initial stuff, which I’m really excited about, is about connecting various people who will ultimately be involved in guiding the expansion of rOpenSci into the statistical methods side of things. So it’s much more people-centered than the typical life of a 100% coder. Like so many rOpenSci projects, this aims to be very community-driven.

I’ll really enjoy being between two worlds trying to think in general terms about developing this whole new endeavour [statistical software peer review] and ensuring the development is as general and generalizable as possible. While on the other side, having to be involved with profoundly important brilliant academic experts in various aspects of statistics & statistical software so it will be both very niche and very general at the same time. One of the key challenges will be working with experts in the statistical and software communities and having to foster consensus of opinion on their part in realms that have basically never been tried before. And on the other side, I’ve got a lot of concrete visions for extending testing well beyond anything that’s been done in a computational or quantitative way. Convincing leaders in statistics and statistical software that’s a good idea is certainly going to be challenging and very rewarding.


### What would you like to see in the statistical software standards or package review landscape in two years?

Actual testing of the statistical routines themselves. To date, all systems for evaluating software rely on signature keys of what reliable software might look like externally. It’s like it’s packaged up in a box and you’re evaluated by examining all the things on the outside of the box because getting inside the box is almost impossible. But R is also quite unique in that way, that it allows you to standardize things enough that you know what to look for and then pry into that.

I’m excited about the opportunity to develop new packages in a new field for me. All the packages I’ve made, I’ve done because I’ve had this vision of what I can do and where the packages are going. I’m aware of a difference in my mindset - a package that is not critically necessary but get to think about the language as a whole and what people want to use in a package. I’m excited to be thinking about the language itself more deeply and the structure of the way R works.

Also, the generalizability of everything. At the end I imagine there is this document that says “This is how you construct a new community of software peer review”, regardless of the academic field. That’s incredibly exciting.

Find Mark on [GitHub](https://github.com/mpadge), [Twitter](https://twitter.com/bikesRdata), [Website](https://mpadge.github.io/), [rOpenSci](/authors/mark-padgham/)

[^1]: osmdata Padgham M, Rudis B, Lovelace R, Salmon M (2017). “osmdata.” The Journal of Open Source Software, 2(14), https://doi.org/10.21105/joss.00305.
[^2]: bikedata Padgham M, Ellison R (2017). “bikedata.” The Journal of Open Source Software, 2(20), https://doi.org/10.21105/joss.00471.
[^3]: stats19 Lovelace R, Morgan M, Hama L, Padgham M, Ranzolin D, Sparks A (2019). “stats 19: A package for working with open road crash data.” The Journal of Open Source Software, 4(33), 1181, https://doi.org/10.21105/joss.01181.
[^4]: bomrang Sparks AH, Padgham M, Parsonage H, Pembleton K (2017). “bomrang: Fetch Australian Government Bureau of Meteorology Weather Data.” The Journal of Open Source Software, 2(17), https://doi.org/10.21105/joss.00411.
