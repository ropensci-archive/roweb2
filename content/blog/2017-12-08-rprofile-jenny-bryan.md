---
slug: rprofile-jenny-bryan
title: '.rprofile: Jenny Bryan'
date: '2017-12-08'
preface: In this occasional series, we interview someone using a loosely defined set
  of interview questions for the purpose of demystifying the creative and development
  processes of R community members. This interview was conducted and prepared by Kelly
  O'Briant as part of an rOpenSci unconf17 project.
author:
  - Kelly O'Briant
topicid: 993
tags:
  - R
  - community
  - interviews
  - rprofile
---

{{< imgtxt src="/img/blog-images/2017-12-08-rprofile-jenny-bryan/jenny_bryan_lowres.jpg" alt="Jenny Bryan" >}}

_Jenny Bryan @JennyBryan is a Software Engineer at RStudio and is on leave from being an Associate Professor at the University of British Columbia. Jenny serves in leadership positions with rOpenSci and [Forwards](https://forwards.github.io/) and as an Ordinary member of [The R Foundation](https://www.r-project.org/foundation/)._

{{< /imgtxt >}}

---


KO: What is your name, your title, and how many years have you worked in R?

JB: I’m Jenny Bryan, I am a software engineer at RStudio (still getting used to that title)., And I am on leave from being an Associate Professor at the University of British Columbia. I’ve been working with R or it’s predecessors since 1996. I switched to R from S in the early 2000s.

KO: Why did you make the switch to R from S?

JB: It just seemed like the community was switching over to R and I didn’t have a specific reason to do otherwise, I was just following the communal path of least resistance.

KO: You have a huge following from all the stuff you post about your course. Did you always want to be a teacher? How did you get into teaching?

JB: No, I wouldn’t say that I always wanted to be a teacher, but I think I’ve enjoyed that above average compared to other professors. But it was more that I realized several years ago that I could have a bigger impact on what people did by improving data analysis workflows, thinking, and tooling instead of trying to make incremental progress on statistical methodology. It is a reflection of where I have a comparative advantage with respect to interest and aptitude, so it’s not really a knock on statistical methodology. But I feel we could use more people working on this side of the field -- working on knowledge translation.

I was also reacting to what I saw in my collaborative work. I would work with people in genomics and if I’m completely honest with myself, often my biggest contribution to the paper would be getting all the datasets and analyses organized. I didn’t necessarily do some highly sophisticated statistical analysis. It would often boil down to just doing millions of t-tests or something. But the reason I had an impact on the project would be that I got everything organized so that we could re-run it and have more confidence in our results. And I was like, I have a PhD in stats, why is this my main contribution? Why do the postdocs, grad students, and bioinformaticians not know how to do these things? So then I started to make that more and more the focus of my course, instead of squeezing in more statistical methods. Then the teaching sort of changed who I was and what I allowed myself to think about and spend time on. I used to not let myself spend time on those things. Or if I did, I would feel guilty about it because I thought, I can’t get any professional credit for this! It’s not statistically profound, but it seems to be what the world needs me to do, and needs other people to be doing.

> You don’t always have to be proving a theorem, you don’t always have to be writing a package, there’s still a lot of space for worthwhile activity in between all of those things.

KO: Do you feel proud of what you’ve accomplished?

JB: I finally in some sense gave myself permission to start teaching what I thought people actually needed to know. And then after spending lots of time on it in the classroom, you realize what gaps there are, you become increasingly familiar with the tooling that you’re teaching and you’re like, hey I could actually improve that. Or no one really talks about how you get the output of this step to flow nicely as the input into the following step, i.e. how to create workflows. It really helped open my mind to different forms of work that are still valuable. You don’t always have to be proving a theorem, you don’t always have to be writing a package, there’s still a lot of space for worthwhile activity in between all of those things. However because we don’t have names for all of it, it can be difficult from a career point of view. But so many people see it, use it, and are grateful for it.

KO: Can you talk about your transition into working for RStudio and what that will look like on a day-to-day basis?

JB: In many ways it looks a lot like my life already did because I had, especially in the last two to three years, decided if I want to work on R packages or on exposition, I’m going to do that. That’s what I think tenure is for! So I had decided to stop worrying about how to sell myself in a framework set up to reward traditional work in statistical methodology. That freed up a lot of mental energy, to pursue these other activities, unapologetically. Which lead to other opportunities, such as RStudio. I was already working mostly from home. The Statistics department is by no means a negative environment for me, but the internet helped me find virtual colleagues around the globe who really share my interests. The physical comfort of home is very appealing. RStudio is also very light on meetings, which is a beautiful thing.

KO: What is your team like at RStudio? How many projects are you juggling at any given time? Do you have an idea of what you want to accomplish while you’re there?

JB: The person I interact with most is [Hadley Wickham](http://hadley.nz/) and he now has a team of five. There’s a fair amount of back and forth with other team members. I might seek their advice on, e.g., development practices, or just put questions out there for everyone. This team is pretty new and the formalization of the [tidyverse](https://www.tidyverse.org/) is pretty new, so everyone has different packages that they’re working on, either from scratch or shifting some of the maintenance burden off of Hadley. There’s a concerted effort to figure out “what does it mean to be an ecosystem of packages that work together?".

KO: Do you have a well defined road map at this point on the team?

JB: I’ve been on that team since January and before that we had queued up [readxl](https://readxl.tidyverse.org/) as a good project for me. It was also overdue for maintenance! I was already a “Spreadsheet Lady”, very familiar with the underlying objects, and with the problem space. It was a good opportunity for me to write compiled code which I hadn’t done in a really long time. I had never written C++ so it was a way to kill at least three birds with one stone. So that was an easy selection for the first thing to work on. And even before that was done, it was clear that going back and doing another project in the Google arena made sense. We knew we would do some work with interns. Wrapping the Google Drive API was going to be useful (in general and for a future update of [googlesheets](https://github.com/jennybc/googlesheets)) and I knew our intern [Lucy McGowan](https://www.lucymcgowan.com/) would be a great person to work with on it.

So no, there’s not some detailed 18-month roadmap stretching ahead of me. I think it will cycle between doing something that’s mine or new and doing maintenance on something that already exists. I also continue to do a lot of exposition, training, and speaking.

> It actually pisses me off when people criticize “when” people work - like that’s a signifier of a poor work-life balance … their heart is in the right place to encourage balance, but I have a certain amount of work I want to get done.

KO: Day-to-day, do you have regular standups? How do you like your day to be structured?

JB: Oh there's how I wish my day was structured and how it's actually structured. I wish I could get up and just work because that’s when I feel by far my most productive. Unfortunately, this coincides with the morning chaos of a household with three kids, who, despite the fact that we’re trying to get them more independent with lunches and getting to school, you cannot completely tune out through this part of the day. So I do not really get up and just work, I sort of work until everyone gets out the door. Then I usually go exercise at that point, get that taken care of. I get more work done in the afternoon until the children all arrive home. I do a lot of work between 9 or 10 at night and 1 in the morning. Not because I love working at that time, but that’s just what I have.

Given that I have this platform, it actually pisses me off when people criticize “when” people work - like that’s a signifier of a poor work-life balance, though it is possible that I have a poor work-life balance, but I feel like it’s usually coming from people who don’t have the same constraints in their life. “You shouldn’t work on the weekends, You shouldn’t work in the evenings”. I’m like, when the heck else do you think I would work? I feel like sometimes people are - their heart is in the right place to encourage balance, but I have a certain amount of work I want to get done. And I have a family and it means that I work when my children are asleep.

> They’re happy years but the tension between all the things you want to do is unbelievable because you will not do all of them. You cannot do it all.

KO: This topic is very interesting and personal to me. As I get older I’ve been thinking (nebulously) about starting a family, and I don’t know what that looks like. It’s scary to me, to not want to give up this lifestyle and this career that I’ve started for myself.

JB: My pivoting of thinking about myself as an applied statistician to more of a data scientist, coincided with me reemerging from having little kids. I had all of them pre-tenure and at some point we had “three under three”. I was trying to get tenure, just barely getting it all done and I was kind of in my own little world, just surviving. Then the tenure process completed successfully, the kids got older, they were all in school, and eventually they didn’t need any out of school care. So me being able to string multiple abstract thoughts together and carve out hours at a time to do thought work coincided with me also freeing myself to work on stuff that I found more interesting.

I don’t know how this all would have worked out if the conventional academic statistical work had suited me better. The time where I was most conflicted between doing a decent job parenting and doing decent work was also when I was doing work I wasn’t passionate about. I can’t tell if having more enthusiasm about the work would have made that period harder or easier! I really thought about ditching it all more than a few times.  

The reinvigoration that coincided with switching emphasis also coincided with the reinvigoration that comes from the kids becoming more independent. It does eventually happen! There are some very tough years - they’re not dark years, they’re happy years but the tension between all the things you want to do is unbelievable because you will not do all of them. You cannot do it all.

KO: What are your favorite tools for managing your workflow?

JB: In terms of working with R I’ve completely standardized on working with RStudio. Before that I was an Emacs-ESS zealot and I still have more accumulated years in that sphere. But once RStudio really existed and was viable, I started teaching with it. I hate doing R one way when I’m in front of students and another when I’m alone. It got very confusing and mixing up the keyboard shortcuts would create chaos. So now I’ve fully embraced RStudio and have never looked back.

I’m also a [git evangelist](https://happygitwithr.com/). Everything I do is in git, everything is on [Github](https://github.com/jennybc) and at this point, almost everything is public because I’ve gotten unselfconscious enough to put it up there. Plus there’s enough volume now that no one could be looking at any particular one thing. It’s so much easier for me to find it again later. I just put everything in a public place rather than trying to have this granular access control; it simplifies things greatly. Working in the open has simplified a lot of decisions, that’s nice.

Otherwise I feel like my workflow is very primitive. I have thousands of email in my inbox. I’ve completely given up on managing email and I’m mostly okay with that. It’s out of my control and I can’t commit to a system where I’m forced to get to inbox zero. I’ve just given up on it. And twitter and slack are important ways to feel connected when I’m sitting at home on my sofa.

KO: Do you have any online blogs, personalities or podcasts that you particularly enjoy? It doesn’t have to be R related.   

JB: I do follow people on twitter and the [rstats hashtag](https://twitter.com/hashtag/rstats), so that often results in serendipitous one-off links that I enjoy. I don’t follow certain blogs regularly, but there are certain places that I end up at regularly. I like the Not So Standard Deviations podcast. In the end I always listen to every episode, but it’s what I do on an airplane or car drive.

KO: You build up a backlog?

JB: Exactly. Then the next time I need to drive to Seattle in traffic, I’ll power through four episodes.

KO: What are some of your favorite R packages - do you have some that you think are funny, or love?

JB: I live entirely in the tidyverse. I’m not doing primary data analysis on projects anymore. It’s weird that the more involved you become in honing the tools, the less time you spend wielding them. So I’m increasingly focused on the data prep, data wrangling, data input part of the cycle and not on modeling. I did a lot more of that when I was a statistician and now it’s not where my comparative interest and advantage seems to lie. There’s plenty to do on the other end. And also not that many people who like it. I actually do enjoy it. I don’t have to force myself to enjoy it - this is really important, and it pleases me. Given how important I think the work is, it’s a relatively uncrowded field. Whereas machine learning, it seems like everyone wants to make a contribution there. I’m like, you go for it - I’m going to be over here getting data out of Excel spreadsheets.
