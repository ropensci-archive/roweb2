---
slug: rprofile-karthik-ram
title: '.rprofile: Karthik Ram'
date: '2018-01-12'
preface: In this occasional series, we interview someone using a loosely defined set
  of interview questions for the purpose of demystifying the creative and development
  processes of R community members. This interview was conducted and prepared by Kelly
  O'Briant as part of an rOpenSci unconf17 project.
author:
  - Kelly O'Briant
topicid: 1027
tags:
  - R
  - community
  - interviews
  - rprofile
---

{{< imgtxt src="/img/blog-images/2018-01-12-rprofile-karthik-ram/karthik-ram.png" alt="Karthik Ram" >}}

_Karthik Ram is a Data Scientist at the Berkeley Institute for Data Science and Berkeley Institute for Global Change Biology. He is a co-founder of rOpenSci, a collective to support the development of R-based tools which facilitate open science and access to open data. In this interview, Karthik and I discuss the birth of rOpenSci, tools and life hacks for staying sane while managing the constant stress of work fires and the importance of saying no._

{{< /imgtxt >}}

---


[This interview occurred at the 2017 rOpenSci unconference]

KO: What is your name, job title, and how long have you been using R?

KR: My name is Karthik Ram I’m a research scientist at the University of California, Berkeley. I'm an ecologist by training but have been working in the 'data science' space for 15 years. My real introduction to R was during my PhD when I was a teaching assistant for an engineering class on data analysis. The professor gave everyone the option to do their homework in SAS or R. But the catch was if they were going to do their homework in SAS, they had to come into the lab because that’s where the licenses were, and if they wanted to use R they could do their homework at home. All but one student did their homework in R! And so to grade the homework, I had to get up to speed with R. That was around the time I started switching my own from SAS to R.

KO: You were originally a SAS user?

KR: I was a SAS, S-PLUS (I remember paying a fortune for spatial tools) and R user for a period of time, before completely switching to R.

KO: Did you enjoy the transition to R?

KR: I enjoyed it, but I had a very nervous advisor who tried to steer me clear of open source as much as possible. My most enjoyable quote from him was, “Stop wasting your time on these hacker tools, I promise to buy you a SAS license for the rest of your life, if you just focus on your research and leave R alone.” Fast forward to now, he loves R and constantly reaches out to me about cool things that he’s seen in R.

> “Stop wasting your time on these hacker tools, I promise to buy you a SAS license for the rest of your life, if you just focus on your research and leave R alone.”

KO: That’s awesome. I still get that a lot - especially in DC, people will come up to me and say, why are you wasting your time with Apache projects, companies put hundreds of millions of dollars into developing these non-open source tools, why are Apache projects better?  

KR: Yeah, I think open source is great because it does come with built-in community. I’m not as active in other language communities at the moment, but I do see this quite a bit.

KO: How much of your work week now is spent actively using R?

KR: That’s kind of a tricky question because I'm the project lead for the [rOpenSci project](/) which means that I spend a lot of time just managing people and projects. I don’t get to just write a lot of R code, for me it comes in waves. I’m hoping that for the next few weeks I’ll be doing nothing but coding on my couch. But for the last month I’ve been teaching a lot of R. I spent an average of 4 hours a day on R before other distractions kicked in.

KO: You’re teaching it at the university, and you’re going into summer [This interview was conducted in May], how are you going to spend your summer?  

KR: I’m a non-traditional academic in that I don’t teach regular university classes. I teach a lot of workshops throughout the year and I'm just back from teaching a week long workshop at the Natural History Museum in London. So summer is no different from the rest of the year for me, but it is nicer in that I don’t have much conference travel. This is the first time that I’m not going to [useR!](https://user2017.brussels/) in a while. Conferences get old if you keep going to same meetings, and I’m trying to recharge by not going to any for a bit. I’ll probably spend a lot of time writing new talks and write quite a bit of code.

KO: Do you have any project ideas in mind?

KR: Yeah so, for me it’s the curse of always having too many things going on. I always have a backlog of projects that I want to work on. And many of these are things that require extended periods of concentration. I have a couple in mind that I would like to work through in the next few months.

KO: Awesome. In a typical work day, if you have one, do you do a lot of work from home, do you work from campus, all over the place? What does the first half hour of your work day look like and what are you doing every day?  

KR: I’m not a morning person at all. My ideal work day is get up, grab a cup of coffee and then sit on the couch, go through my Github issues/email, then jump on slack and catch up with people. I’ll do that for about an hour or so before leaving the house. But quite often I have a call with someone in Europe so I’m literally getting up five minutes before the call, brushing my teeth and making a cup of coffee. I usually try to work from home in the mornings then go into work around 10:30 or so. Someone analyzed my Github commit logs and found out that I’m not a morning person or a night owl, I’m just sort of a mid-day person. I commit code between 10:30 and 3:30. And then 3:30 is when I leave to go on a run and then I might come back and do some more coding around 6 or so, but typically most of the coding I do is just during the day.

KO: Have you been a runner all your life?

KR: Not really. I’ve been a consistent runner for the past 10 years. I used to run when I was younger, but glad that it is again my go-to exercise.

KO: Marathons, or shorter distance?

KR: I do half-marathons, I get tired of training for marathons. But I love trail running. And I live in the beautiful Berkeley Hills so I can walk out of my house and be on a trail. I can see the entire Bay for much of my run.

KO: How long has the rOpenSci project been going? How did it get started?

KR: We're six years old this fall. rOpenSci started in summer 2011 when I was still a postdoc. I had just spent several months of 14 hour days running experiments on mites and finally had a break to process data. I was using this time to package some scripts I had written to streamline my work. This was around the time that Scott [Chamberlain], Carl [Boettiger] and I were talking about scientific APIs on Twitter. Before long we decided to combine forces, named the project and here we are.

KO: How much of your time is spent devoted to rOpenSci vs. your day job?

KR: It’s very haphazard. This week I’m immersed in this [rOpenSci unconference](https://unconf17.ropensci.org/). Last week I was busy teaching a bunch of British scientists how to analyze data. And then the next week I’ll be working with a on a proposal to understand the long-term effects of climate change on southern ocean ecosystems. I have to switch gears a lot. I’m an editor on three different journals. Every Monday I spend just editing for a couple hours, and try to catch up again on Saturday. I’m woefully behind on everything.  

> You have to feel it out, walk into the pool, find where the deep end is and decide where you want to be.

KO: Do you feel generally in control of everything? Or no?

KR: Absolutely not! I'm often putting out the largest fire and other people tell me that they handle things similarly. People say, “you look like a person who never gets stressed, you look very calm all the time.”

KO: Yes, you do!

KR: And you don’t understand - I’m like a raging disaster on the inside. I just had a deadline to deal with now, I was like, “I don’t have time to do this! I’m hosting an event right now.” and they’re like, “We need this by tomorrow morning.” So yeah, it's quite stressful. But my stress is better when I exercise. I haven't been on a run in a couple of weeks. 😢

KO: Are there any tools that you use to organize your travel and all of the things you’re part of?

KR: I have a [link that I could send you](https://inundata.org/about/setup/) that is a collection of all of my life hacks. But yeah, I use [TripIt](https://www.tripit.com/) to organize my travel, I use [Boomerang](https://www.boomeranggmail.com/) to keep my inbox under some control. I also use a service called [Sanebox](https://www.sanebox.com/) which filters Gmail algorithmically and shows me critical things in my inbox. I have a ton of filters that I use to manage my Github issues. I do the “Boxing my time” which [Hadley](http://hadley.nz/) taught me. If you maintain a lot of open source projects and people add issues, you don’t have to touch a project for six months or a year and then you can close all your issues when you’re done. I acknowledge that you have an issue but I’ll just tell you that I’m not going to fix it for another four months.

KO: How do you manage collaborating? You mentioned the Github issues but are there other ways that you manage collaboration? Are there things that are easier or harder?  

KR: Unfortunately, I have no good answer to this. It's very project specific and everything depends on the group dynamics. I’m trying to say no to more things. If I could give anybody reading this some advice, it is “say no often”. It’s exciting to be invited to be a part of something, but choose wisely.  

> If I could give anybody reading this some advice, it is “say no often”. It’s exciting to be invited to be a part of something, but choose wisely.

KO: What advice do you have for people who want to get involved in more things? There must have been a point in your life when you weren’t involved in all these things. How do you choose paths to go down?  

KR: Early on I said yes to everything and ended up terribly over committed. There are people who thrive on heavy context switching and I am definitely not one of them. You have to feel it out, walk into the pool and find where the deep end is, and decide where you want to be. That’s a hard thing to figure out, but once you know yourself, hold yourself to that.   

The other bit of advice I have is that people are generally open to talking to you. So don't be shy about reaching out to people you want advice from. One of the things I love about [rOpenSci] unconf is that it demystifies folks like [Hadley Wickham](http://hadley.nz/) and others of that caliber. He’s just a dude who likes cocktails and coding and is very friendly and approachable. Once you chat with people here about your work, you realize that you belong and that you can do this. I want more people to feel part of the community.
