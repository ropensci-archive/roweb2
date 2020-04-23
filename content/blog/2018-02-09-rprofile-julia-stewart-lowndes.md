---
slug: rprofile-julia-stewart-lowndes
title: '.rprofile: Julia Stewart Lowndes'
date: '2018-02-09'
preface: In this occasional series, we interview someone using a loosely defined set
  of interview questions for the purpose of demystifying the creative and development
  processes of R community members. This interview was conducted by Sean Kross and
  prepared by Kelly O'Briant as part of an rOpenSci unconf17 project.
author:
  - Sean Kross
  - Kelly O'Briant
topicid: 1060
tags:
  - R
  - community
  - interviews
  - rprofile
---

{{< imgtxt src="/img/blog-images/2018-02-09-julia-stewart-lowndes/lowndes_profile.jpg" alt="Julia Stewart Lowndes" >}}

_Dr. Julia Stewart Lowndes [@juliesquid on Twitter] is the Science Program Lead for the Ocean Health Index and works at the National Center for Ecological Analysis and Synthesis. She and Sean Kross discussed how data science, open science, and community can help reproducibility in research._

{{< /imgtxt >}}

---


[This interview occurred at the 2017 rOpenSci unconference]

SK: I’m [Sean Kross](https://twitter.com/seankross), I’m the CTO of the [Johns Hopkins Data Science Lab](https://jhudatascience.org/). Today I’m interviewing Julia Stewart Lowndes. Julia, what is your current preferred job title?

JSL: I’m calling myself a marine data scientist - I’m the Science Program Lead for the [Ocean Health Index](http://www.ohi-science.org/).

SK: How many years have you been working with R?

JSL: I’ve been working for four years in R, so my experience has mostly been with the growing tidyverse.

SK: How many hours a week do you spend in R?

JSL: I probably spend 20 or 30 hours a week in RStudio, so not just coding in R but also using RMarkdown a lot.

SK: What other technologies are part of your workflow?

JSL: Right now my workflow is R, RStudio, git, GitHub for the most part.

SK: You work with a team, and I imagine that there are different technical challenges with that. Do you collaborate with your team in GitHub?

JSL: I work at NCEAS, which is the [National Center for Ecological Analysis and Synthesis](https://www.nceas.ucsb.edu/) at the University of California Santa Barbara. There are kind of concentric circles within our team but our core workflow is that everyone is working with RStudio and GitHub to some degree – even those who aren’t coding in R everyday.

SK: Do you use public or private GitHub repositories?

JSL: Most of our repositories are public. But we have one private repository just for Issues, and we use that as an email equivalent so that we can have discussions that are archivable.

SK: What kind of R or science related media do you like to peruse?

JSL: Twitter is my main source for finding R stuff. I listen to the RStudio webinars, which are amazing. I really enjoy watching and reading other people’s tutorials, and I listen to the [NotSoStandardDeviations Podcast](http://nssdeviations.com/). One of my favorite episodes was with Jenny Bryan about Excel spreadsheets [[Episode 9](http://nssdeviations.com/episode-9-spreadsheet-drama)]. I’d never heard anyone talk about Excel spreadsheets like that; I had never heard such a philosophy for working with data in spreadsheets.

SK: It’s very inspiring how she has this philosophy - and such an accepting and empathetic philosophy compared to what I think the common perception of Excel uses is among folks in the field of computing.

JSL: I love it! And I love the times where they talk about how businesses use R or databases. I have no formal training in coding, so I don’t have the framework to even get engaged in a topic like databases, but they’re able to engage me just with their conversation and the topics they choose.

SK: Do you have any go-to references?

JSL: Well, [R for Data Science by Hadley Wickham and Garrett Grolemund](https://r4ds.had.co.nz/) is my go-to for R. In grad school, [Practical Computing for Biologists by Steve Haddock and Casey Dunn](https://practicalcomputing.org/) was my book. Both authors are marine biologists, and the point of the book was to get people who had no experience with computing exposed to and confident with the tools already on their computers that could help their science. There is a touch of command line, a touch of python, regular expressions in a text file, a bit of graphics – this book changed my science and my life. Steve and I were colleagues and I was lucky enough that I got to read and give feedback as he was finalizing the book. It totally changed not only my skill set, but my confidence in this computing world. I can’t recommend that book enough. So R for Data Science and Practical Computing for Biologists are my bedside table books.

SK: Have you written any books?

JSL: I’m writing a bookdown right now. It’s for the Ocean Health Index, we essentially enable government and academic groups to measure how healthy their oceans are. We give them a GitHub repository populated with starter files and scripts and they tailor it with their own data and priorities using our R package. So my book is about how to use our software, but it’s also how to use R, RStudio and GitHub. (Editor’s Note: since the interview this has been split into two books: [Introduction to Open Data Science](https://ohi-science.org/data-science-training/) and [Ocean Health Index Toolbox Training](https://ohi-science.org/toolbox-training/).)

The [Nature paper I wrote](https://www.nature.com/articles/s41559-017-0160) was part of this realization that I’m putting a lot of effort into teaching people how to use our Ocean Health Index methods, but in that process I’m actually teaching them good data science practices. The stuff I’m teaching is not specific to the Ocean Health Index, so I wanted to try to hit a broader audience. (Editor’s Note: ["Our path to better science in less time using open data science tools"](https://www.nature.com/articles/s41559-017-0160) (Lowndes et al. 2017; Nature Ecology & Evolution) was published the week before the rOpenSci #unconf17)

SK: It’s so interesting that some people’s learning expectations are that maybe 80% of what I need to learn is specific to my field and 20% is computing/general/extra stuff that’s more widely applicable but doesn’t have to with the science. I feel like it might be the opposite - if you’re plugged into the the reproducible research techniques and all the good stuff coming out of the R community, that’s 80% of what you need to know - and you already have all the training and expertise in your field.

JSL: I totally agree. I think one of the biggest light bulbs for me was realizing that data science is a thing, and that it is separate from my domain specific research. I wish I had discovered that when I was a grad student. That’s what I want to tell every grad student now – data science and domain science are distinct, and there are distinct places to get help. I learned to code in a total panic because my data was too big to be opened in Excel. So because I was trying to figure out science and coding at the same time, I conflated research with data science. I was confusing my thesis questions that no one had ever asked before with data questions that many people had asked before and solved – like renaming or transposing columns. Since I didn’t know these were distinct, I didn’t expect there to be solutions. I had this mindset that there was no one to ask and no help to get, which was demoralizing and I wasted a lot of time.

> I was confusing my thesis questions that no one had ever asked before with data questions that many people had asked before and solved – like renaming or transposing columns... I had this mindset that there was no one to ask and no help to get, which was demoralizing and I wasted a lot of time.

Knowing that data science has concepts, theory, and tools is so powerful. When you’re learning to be a scientist, you have imposter syndrome all the time; there are so many things that you don’t know. I want to help scientists have the expectation that there’s a way to deal with the data challenges, so they can reach out beyond their own scientific community to look for help. If you think about data formatting - it doesn’t matter if you’re studying ocean science or archeology: data formatting is a data problem. And if you think about it as a data problem, you should expect that someone has encountered it before. It it doesn’t matter what field that someone is in; if they solved it, you can take the same solution to your data.

> When you’re learning to be a scientist, you have imposter syndrome all the time; there are so many things that you don’t know. I want to help scientists have the expectation that there’s a way to deal with the data challenges.

SK: I think this is a big challenge going forward for the data science field, like it’s been for other fields, convincing an ocean scientist or a geologist that this “other field” is something they need. I think that other fields have had opportunities like this and just haven’t taken advantage of their potential.

JSL: I think that the internet is changing the way that all this stuff can be incorporated into science. For most of the time I was in school, Google didn’t exist, so using the internet is not how I had been taught to learn. But now, Google is a go-to resource. I distinguish that my question is a data science question, I expect that someone has had my question before, I figure out how to articulate my question, I Google it, and I scan through the search results to see what could be a relevant answer, I learn what they did, and I incorporate the solution into my research.

> I have conversations with grad students today that break my heart. They’re like, _I know I need to learn R, and someday I will go to the library and check out a stats book._ I’m like, _I love libraries, but GOOGLE IT._

The internet makes this all easier, but learning to code from online resources and communities  is not yet the norm in science. I have conversations with grad students today that break my heart. They’re like, I know I need to learn R, and it’s this dread that is weighing on me, but someday I will go to the library and check out a stats book. I’m like, I love libraries, but GOOGLE IT. [Read Hadley’s books online](http://hadley.nz/), join the welcoming [#rstats community](https://twitter.com/hashtag/rstats) – I actually joined Twitter to learn R. The [tidyverse](https://www.tidyverse.org/) and the community and development around it have changed the game in three huge ways in my mind: The tools are more powerful, they meet and engage people where they are, and there is a huge emphasis on teaching and training. All the amazing media - online books, tutorials, videos, slide decks, podcasts, groups like [R-Ladies](https://rladies.org/) - all this stuff is there to help you learn more, no matter where you’re coming from. We need to help scientists expect that it’s there and that they are welcome too.
