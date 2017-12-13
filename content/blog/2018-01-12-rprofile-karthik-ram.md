---
slug: rprofile-karthik-ram
title: ".rprofile: Karthik Ram"
date: 2018-01-12
preface: "In this occasional series, we interview someone using a loosely defined set of interview questions for the purpose of demystifying the creative and development processes of R community members. This interview was conducted and prepared by Kelly O'Briant as part of an rOpenSci unconf17 project."
authors:
  - name: Kelly O'Briant
    url: https://kellobri.github.io/
categories: blog
topicid:
tags:
- R
- community
- interviews
- rprofile
---

Karthik Ram is a Data Scientist at the Berkeley Institute for Data Science and Berkeley Institute for Global Change Biology. He is a co-founder of rOpenSci, a collective to support the development of R-based tools which facilitate open science and access to open data. In this interview, Karthik and I discuss the birth of rOpenSci, tools and life hacks for staying sane while managing the constant stress of work fires and the importance of saying no.

---

<br>

KO: What is your name, job title, and how long have you been using R?

KR: My name is Karthik Ram I’m a data scientist at the University of CA Berkeley. I am an ecologist by training but I’ve been working with data for over fifteen years. My real introduction to R was as teaching assistant for an engineering class on data analysis when I was in grad school. The professor allowed everyone to do the homework in SAS or R. But the catch was if they were going to do their homework in SAS, they had to come into the lab because that’s where the licenses were, and if they wanted to use R they could do their homework at home. And so everybody used R. And so to grade the homework, I had to learn R. So that was around the time I started switching and for my PhD I switched everything from SAS to R.

KO: So you were an original SAS user?

KR: I was a SAS, S-PLUS user and R user for a period of time at the same time.

KO: Did you enjoy the transition to R?

> “Stop wasting your time on these hacker tools, I promise to buy you a SAS license for the rest of your life, if you just focus on your research and leave R alone.”

KR: I enjoyed it, but I had a very skittish advisor who tried to steer me clear of open source as much as possible. My most enjoyable quote from him was, “Stop wasting your time on these hacker tools, I promise to buy you a SAS license for the rest of your life, if you just focus on your research and leave R alone.” Fast forward to now, he loves R and constantly tweets at me about cool things that he’s seen in R.

KO: That’s awesome. I still get that a lot - especially in DC, people will come up to me and say, why are you wasting your time with Apache projects, people put hundreds of millions of dollars into developing these non-open source tools, why are Apache projects better?

KR: Yeah, I think open source is great because it does come with built-in community and I’m not as active in other language communities at the moment, but I do see this quite a bit.

KO: How much of your work week now is spent actively using R?

KR: So that’s kind of a tricky question because I run the [rOpenSci project](https://ropensci.org/), but I’m also now spending a lot of time just managing people and things. So I don’t get to just write a lot of R code. So for me it comes in waves. I’m hoping that for the next few weeks I’ll be doing nothing but coding on my couch. But for the last month I’ve been teaching a lot of R. So I’ve been using R all day every day. But I’d say on average, 3-4 hours a day I’m doing something in R.

KO: So you’re teaching it at the university, and you’re going into summer, how are you going to spend your summer?

KR: I’m a non-traditional academic in that I don’t teach regular university classes, I teach a lot of workshops that are a week or two. So for the summer it makes no difference than the rest of the year for me, but summer is nicer in that I don’t have any conference travel. This is the first time that I’m not going to [useR!](https://user2017.brussels/) in a while. Conferences get old if you keep going to them, and I’m trying to get a nice refreshing break by not going. So I’ll probably spend a lot of time writing new talks and write quite a bit of code.

KO: Do you have any project ideas in mind?

KR: Yeah so, for me it’s the curse of always having too many things going on. I always have a backlog of projects that I want to work on. And many of these are things that require extended periods of concentration. So I do have a couple in mind that I would like to work through in the next few months.

KO: Awesome. So in a typical work day, If you have one, do you do a lot of work from home, do you work from campus, all over the place? What does the first half hour of your work day look like and what are you doing every day?

KR: I’m not a morning person, so I’ll get up, grab a cup of coffee, and then it varies a lot. My ideal work day is get up, grab a cup of coffee and then sit on the couch, go through my Github issues, go through email, and then jump on slack and catch up with the team and I’ll do that for about an hour or so before getting dressed, leaving the house. But quite often I have a call with someone in Europe so I’m literally getting up five minutes before the call, brushing my teeth, making a cup of coffee, grabbing my laptop. But I usually try to work from home in the mornings then go into work around 10:30 or so. Someone analyzed my Github commit logs and found out that I’m not a morning person and I’m not a night person, I’m just sort of a mid-day person. I commit code between 10:30 and 3:30. And then 3:30 is when I leave to go on a run and then I might come back and do some more coding around 6 or so, but typically I do a lot of it just during the day.

KO: Have you been a runner all your life?

KR: No, I’ve been a runner for the last 10 years. I used to run when I was younger, but yeah it’s sort of my go-to thing.

KO: Marathons, or shorter distance?

KR: I do half-marathons, I get bored of marathons, I just cannot run for that long. But I love trail running. And I live in the beautiful Berkeley Hills so I can walk out of my house and have beautiful trails. I can see the entire Bay from my run.

KO: How long has the rOpenSci project been going? How did it get started?

KR: We’re six years old this fall. It started in early 2011. I was a post-doc at the time, in a very frustrating post doc. And it wasn’t bringing me a lot of joy, it was bringing me a lot of misery. And open source was a community that I could sink my teeth into. I had just come out of running experiments for several months where I literally had to be indoors in a room that was 85 degrees - because we were running climate change experiments. And then after that I had a few months to process all the data and not just data that I had collected, it had to be extracted out of images. Writing image recognition algorithms, so it was going to take a while. Then I had a rest bit for a few months just to catch my breath and got caught up in writing tools to reproduce data off of APIs, to make it easier for people to write code. And then ended up convincing a few other folks on twitter that we should combine forces. I still remember the email where I said, “Should we call our project a name? If we do a website, I can just grab a domain name, we’re talking about open science and R, so how about rOpenSci?” and I got a sounds good from two people, I bought the domain name, and here we are.

KO: So how much of your time is spent devoted to rOpenSci vs. your day job?

KR: It’s very haphazard. This week I’m immersed in this [rOpenSci unconference](http://unconf17.ropensci.org/). Last week I was immersed in teaching a bunch of British scientists how to think about data and analyzing data. And then the next week I’ll be spending time thinking about climate change and how we can actually combine all the different ideas going on -- the land side of things, the ocean side of things, the human side, the whole ecosystem. I also have to switch gears a lot. I’m an editor on three different journals, so every Monday I spend just editing for a couple hours, and try to catch up again on Saturday. I’m woefully behind on all these things.

> Early on you have to fail, you have to over-commit. You have to feel it out, walk into the pool, find where the deep end is and decide where you want to be.

KO: So do you feel generally in control of everything? Or no?

KR: No, sometimes I feel like I’m free falling, but the funniest thing is that I’ll talk to somebody, and in fact this is a very common thing, They’ll go, “you look like a person who never gets stressed, you look very calm all the time.”

KO: Yes, you do!

KR: And you don’t understand - I’m like a raging disaster on the inside. I just had a deadline to deal with now, I was like, “I don’t have time to do this! I’m hosting an event right now.” and they’re like, “We need this by tomorrow morning.” So yeah, I don’t deal that well with stress. But my stress is better when I exercise. So I’ve not been on a run for two weeks.

KO: Are there any tools that you use to organize your travel and all of the things you’re part of?

KR: I have a [link that I could send you](http://inundata.org/about/setup/) that is a collection of all of my life hacks. But yeah, I use [TripIt](https://www.tripit.com/) to organize my travel, I use [Boomerang](https://www.boomeranggmail.com/) to organize my email. Boomerang is a tool that sits on top of any Gmail account and then if you send an email and don’t require a response for a couple of weeks I can ask Boomerang to have your email come back in two weeks. So it goes out of my inbox and goes out of my mind and comes back in two weeks. And then I use a thing called [Sanebox](https://www.sanebox.com/) which filters Gmail by some algorithm that learns noncritical vs. critical and then just shows me critical things in my inbox. So I do that. I have a ton of filters that I use to manage my Github issues. So I do the “Boxing my time” which [Hadley](http://hadley.nz/) taught me. If you maintain a lot of open source projects and people add issues, you don’t have to touch a project for six months or a year and then you can close all your issues when you’re done. So I just acknowledge that you have an issue but I’ll just tell you that I’m not going to fix it for another four months.

KO: How do you manage collaborating? You mentioned the Github issues but are there other ways that you manage collaboration? are there things that are easier or harder?

KR: Unfortunately, I have no good answer to this. For some of our collaborations we talk once a month. So it’s literally panic on everyone’s part because we have a call coming up on Tuesday, one person is having a child, one person just had a child, I’m on travel, but then we will have the call anyway. And then an hour before the call, we all bang out a draft of our section and then have the call. So there’s things like that and we try and I’m trying to say no to more things. If I could give anybody reading this some advice, it is “say no often”. It’s exciting to be invited to be a part of something, but choose wisely.

> If I could give anybody reading this some advice, it is “say no often”. It’s exciting to be invited to be a part of something, but choose wisely.

KO: What advice do you have for people who want to get involved in more things? There must have been a point in your life when you weren’t involved in all these things. How do you choose paths to go down?

KR: Early on you have to fail, you have to over-commit. There are people who thrive on this, I’m not one of those people. So you have to feel it out, walk into the pool and find where the deep end is, and decide where you want to be. That’s a good thing to figure out, but once you know yourself, hold yourself to that. You’re not suddenly going to find more time and more energy and it actually gets harder over time. The other bit of advice I have is that people are always open to talking to you. One of the things I love about [rOpenSci] unconf is that it demystifies [Hadley Wickham](http://hadley.nz/) and people of that caliber. He’s just a dude who likes cocktails and a very normal person altogether, once you meet him and talk to him, ask him questions, you realize, I can do this. And we want more people who can think they can do this.
