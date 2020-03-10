---
slug: ropensci-changes
title: 'changes: easy Git-based version control from R'
date: '2017-11-28'
author:
  - Anikó B. Tóth
  - Nick Golding
topicid: 980
tags:
  - Australia
  - community
  - Git
  - meetings
  - ozunconf
  - ozunconf17
  - R
  - unconf
  - versioncontrol
---

Are you new to version control and always running into trouble with Git?
Or are you a seasoned user, haunted by the traumas of learning Git and reliving them whilst trying to teach it to others?
Yeah, us too.

![](/img/blog-images/2017-11-28-ropensci-changes/monkeys.jpg)

Git is a version control tool designed for software development, and it is extraordinarily powerful. It didn’t actually dawn on me quite how amazing Git is until I spent a weekend in Melbourne with a group of Git whizzes using Git to write a package targeted toward Git beginners. Whew, talk about total Git immersion! I was taking part in the 2017 [rOpenSci ozunconf](https://ozunconf17.ropensci.org/), in which forty-odd  developers, scientists, researchers, nerds, teachers, starving students, cat ladies, and R users of all descriptions form teams to create new R packages fulfilling some new and useful function. Many of the groups used Git for their collaborative workflows all weekend.

Unfortunately, just like many a programming framework, Git can often be a teensy bit (read: extremely, prohibitively) intimidating, especially for beginners who don't need all of Git's numerous and baffling features.
It’s one of those platforms that makes your life a million times better once you know how to use it, but if you’re trying to teach yourself the basics using the internet, or—heaven forbid—trying to untangle yourself from some Git-branch tangle that you’ve unwittingly become snarled in… (definitely done that one…) well, let’s just say using your knuckles to break a brick wall can sometimes seem preferable.
Just ask the Git whizzes.
They laugh, because they’ve been there, done that. 

The funny thing is, doing basic version control in Git only requires a few commands.
After browsing through the available project ideas and settling into teams, a group of eight of us made a list of the commands that we use on a daily basis, and the list came to about a dozen.
We looked up our Git histories and compiled a Git vocabulary, which came out to less than 50 commands, including combination commands. 

As [Nick Golding](https://github.com/goldingn) so shrewdly recognized in the lead up to this year’s unconference, the real obstacle for new Git users is not the syntax, it's actually (a) the scary, scary terminal window and (b) the fact that Git terminology was apparently chosen by randomly opening a verb dictionary and blindly pointing to a spot on the page.
(Ok, I’m exaggerating, but the point is that the terminology is pretty confusing).
We decided to address these two problems by making a package that uses the R console and reimagining the version control vocabulary and workflow for people who are new to version control and only need some of its many features.

Somewhat ironically, nine people worked for two days on a dozen branches, using Git and GitHub to seamlessly merge our workflows.
It was wonderful to see how so many people’s various talents can be combined to make something that no group members could have done all on their own. 

Enter, `changes` ( [repo](https://github.com/ropenscilabs/ozrepro), [website](https://ropenscilabs.github.io/changes/) – made using [pkgdown](https://github.com/hadley/pkgdown)), our new R package to do version control with a few simple commands.
It uses Git and [Git2r](https://cran.r-project.org/web/packages/git2r/index.html) under the hood, but new users don’t need to know any Git to begin using version control with `changes`.
Best of all, it works seamlessly with regular Git. So if a user thinks they're ready to expand their horizons they can start using git commands via the [Githug](https://GitHub.com/jennybc/Githug) package, RStudio's git interface, or on the command line.

Here is an overview of some of the ways we’ve made simple version control easy with `changes`:

#### Simple terminology
It uses simple and deliberately un-git-like terminology:

  * You start a new version control project with `create_repo()`, which is like `git init` but it can set up a nice project directory structure for you, automatically ignoring things like output folders.
  * All of the steps involved in commiting edits have been compressed into one function: `record()`. All files that aren't ignored will be committed, so users don't need to know the difference between tracking, staging and committing files. 
  * It's easy to set which files to omit from version control with `ignore()`, and to change your mind with `unignore()`. 
  * `changes()` lets you know which files have changed since the last record, like a hybrid of `git status` and `git diff`.
  * You can look back in history with `timeline()` (a simplified version of `git log`), `go_to()` a previous record (like `git checkout`), and `scrub()` any unwanted changes since the last record (like `git reset --hard`).

#### It's linear
After a long discussion, we decided that changes won't provide an interface to Git branches (at least not yet), as the merge conflicts it leads to are one of the scariest things about version control for beginners.
With linear version control, users can can easily `go_to()` a past record with a version number, rather than unfamiliar [SHA's](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects). These numbers appear in the a lovely visual representation of their `timeline()`:

          (1) initial commit
           |  2017-11-18 02:55
           |
          (2) set up project structure
           |  2017-11-18 02:55
           |
          (3) added stuff to readme
              2017-11-18 02:55

If you want to roll your project back to a previous record, you can `retrieve()` it, and changes will simply append that record at the top of your timeline (storing all the later records, just in case).

#### Readable messages and automatic reminders
Some of Git's messages and helpfiles are totally cryptic to all but the most hardened computer scientists.
Having been confronted with our fair share of [`detached HEAD`](https://www.git-tower.com/learn/git/faq/detached-head-when-checkout-commit)s and offers to [`update remote refs along with associated objects`](https://git-scm.com/docs/git-push), we were keen to make sure all the error messages and helpfiles in changes are as intuitive and understandable as possible.

It can also be hard to get into the swing of recording edits, so changes will give you reminders to encourage you to use `record()` regularly. You can change the time interval for reminders, or switch them off, using `remind_me()`. 

#### Coming soon
We made a lot of progress in two days, but there's plenty more we're planning to add soon:

1. Simplified access to GitHub with a `sync()` command to automagically handle most uses of `git fetch`, `git merge`, and `git push`.
2. A Git training-wheels mode, so that people who want to move use Git can view the Git commands `changes` is using under the hood. 
3. Added flexibility – we are working on adding functionality to handle simple deviations from the defaults, such as recording changes only to named files, or to all except some excluded files.

We'd be really keen to hear your suggestions too, so please let us know your ideas via the [changes issue tracker](https://github.com/ropenscilabs/changes/issues)!



I have only recently started using Git and GitHub, and this year’s [rOpenSci ozunconf](https://ozunconf17.ropensci.org/) was a big eye-opener for me, in several ways.
Beyond finally understanding to power of proper version control, I met a group of wonderful people dedicated to participating in the R community.
Now as it turns out, R users take the word “community” very seriously.
Each and every person I met during the event was open and friendly.
Each person had ideas for attracting new users to R, making it easier to learn, making methods and data more readily available, and creating innovative new functionality.
Even before the workshop began, dozens of ideas for advancement circulated on [GitHub Issues](https://github.com/ropensci/ozunconf17/issues).
Throughout the conference, it was a pleasure to be a part of the ongoing conversation and dialogue about growing and improving the R community.
That’s right, you can delete any lingering ‘introverted computer geek’ stereotypes you might still be harbouring in a cobwebbed attic of your mind.
In today’s day and age, programming is as much about helping each other, communicating, learning, and networking as it is about solving problems.
And building the community is a group effort. 

R users come from all sorts of backgrounds, but I was gratified to see scientists and researchers well-represented at the unconference.
Gone are the days when I need to feel like the ugly duckling for being the only R user in my biology lab!
If you still find yourself isolated, join the blooming online R users community, or any one of a number of meetups and clubs that are popping up everywhere.
I have dipped my toe in those waters, and boy am I glad I did! 
