---
slug: "ropensci-changes"
title: "Changes: easy git-based version control from R"
date: 2017-11-16
authors:
  - name: Anikó B. Tóth
  - name: Nick Golding
categories: blog
topicid: ###
tags:
  - community
  - ropensci
  - meetings
  - unconf
  - australia
  - r
  - git
  - versioncontrol
---

Have you ever had trouble with git?  How about convincing others to use git? Yeah, we have too. Git is a tool designed for version control in development, and it is immensely powerful. It didn’t actually dawn on me quite how amazing git is until I spent a weekend in Melbourne with a group of git whizzes using git to write a package targeted toward git beginners. 

Unfortunately, just like many a programming framework, git can often be a teensy bit (read: extremely, prohibitively) intimidating, especially for beginners. It’s one of those platforms that makes your life a million times better once you know how to use it, but if you’re trying to teach yourself the basics using the internet, or—heaven forbid—trying to untangle yourself from some git-branch tangle that you’ve unwittingly become snarled in… (definitely done that one…) well, let’s just say using your knuckles to break a brick wall can sometimes seem preferable. Just ask the git whizzes. They laugh, because they’ve been there, done that. 

The funny thing is, there really aren’t that many commands or that much syntax that you have to learn to be reasonably proficient at git. After browsing through the available project ideas and settling into teams, a group of eight of us made a list of the commands that we use on a daily basis, and the list came to about a dozen. We looked up our git histories and compiled a git vocabulary, which came out to less than 50 commands, including combination commands. 

As [Nick Golding](https://github.com/goldingn) so shrewdly recognized in the lead up to this year’s unconference, the real obstacles for new git users are (a) the scary, scary terminal window and (b) the fact that git terminology was apparently chosen by randomly opening a verb dictionary and blindly pointing to a spot on the page. (Ok, I’m exaggerating, but the point is that the terminology is pretty confusing). We decided to address these two problems by making a package that uses the R console and reimagining the version control vocabulary. As a bonus, we decided to simplify the git workflow. Somewhat ironically, nine people worked for two days on a dozen branches, using github to seamlessly merge our workflows. It was wonderful to see how so many people’s various talents can be combined to make something that no group members could have done all on their own. 

Enter, `changes` ( [repo](https://github.com/ropenscilabs/ozrepro), [site](https://ropenscilabs.github.io/ozrepro/) – made using [pkgdown](https://github.com/hadley/pkgdown)), the new R package that implements version control with a few simple commands. It uses git and R packages [git2r](https://cran.r-project.org/web/packages/git2r/index.html) and [githug](https://github.com/jennybc/githug) under the hood, but new users don’t need to know any git to begin using version control with changes. Best of all, it works seamlessly with regular git if you think you’re ready to expand your horizons. Here is an overview of some of the ways we’ve made it easy to use:

1.	Easy terminology!  Git init has been replaced with `create_repo()`. 
`Changes()` handles diff and status. 
`Timeline()` replaces git log. 
All of the steps involved in git commit have been compressed into `record()`. 
`Go_to()` replaces git checkout.

2.	It’s visual: `timeline()` prints a lovely visual representation of your past commits without any scary jargon. We plan to implement a plotted [interactive??!] version of this function as well. 

3.	Automatic reminders encourage you to commit changes every hour, though you can always change the time interval to 30 minutes with `remind_me(30)`. 

4.	Easy to `ignore()` files and change your mind about ignoring files, `unignore()`. 

5.	No branches. After an involved debate, we decided to get rid of branches within or package. Instead, you can easily jump between past records using `go_to()`. If you want to work from a previous record (e.g. the way you would use a branch), changes simply appends a new copy of the chosen record at the top of your timeline, and…Voilà! Linear workflow. 

6.	Simplified collaboration with `sync()`, which handles git fetch, merge, and push. [not yet implemented??]

7.	Intuitive defaults. New repositories are created with a default .gitignore file that flags obvious things like data files in .csv format. `Changes()` and `record()` default to showing and committing all of your changes since the last commit, no arguments required!

Future developments that will make it even better:

1.	Automatic installation of git – no fiddling in the terminal
2.	Option to view git code that is being called by changes if you want to use changes to learn git. 
3.	Added flexibility – we are working on adding functionality to handle simple deviations from the defaults, such as recording changes to only one file, or all files except specified files.

I have only recently started using git and github, and this year’s [rOpenSci ozunconf](https://ozunconf17.ropensci.org/) was a big eye-opener for me, in several ways. Beyond finally understanding to power of proper version control, I met a group of wonderful people dedicated to participating in the R community. Now as it turns out, R users take the word “community” very seriously. Each and every person I met during the event was open and friendly. Each person had ideas for attracting new users to R, making it easier to learn, making methods and data more readily available, and creating innovative new functionality. Even before the workshop began, dozens of ideas for advancement circulated on [GitHub Issues](https://github.com/ropensci/ozunconf17/issues). Throughout the conference, it was a pleasure to be a part of the ongoing conversation and dialogue about growing and improving the R community. That’s right, you can delete any lingering ‘introverted computer geek’ stereotypes you might still be harbouring in a cobwebbed attic of your mind. In today’s day and age, programming is as much about helping each other, communicating, learning, and networking as it is about solving problems. And building the community is a group effort. 

R users come from all sorts of backgrounds, but I was gratified to see scientists and researchers well-represented at the unconference. Gone are the days when I need to feel like the ugly duckling for being the only R user in my biology lab!  If you still find yourself isolated, join the blooming online R users community, or any one of a number of meetups and clubs that are popping up everywhere. I have dipped my toe in those waters, and boy am I glad I did! 

