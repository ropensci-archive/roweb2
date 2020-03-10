---
slug: governance
title: Community Call Follow-up - Governance of Open Source Research Software Organizations
author:
  - Dan Sholler
date: '2019-02-12'
topicid: 1578
tags:
  - governance
  - open science
  - open source
  - community call
---

We tend to know a good open source research software project when we see it: The code is well-documented, users contribute back to the project, the software is licensed and citable, and the community interacts and co-produces in a healthy, productive fashion. The academic literature [^2] and community discourse [^3] around research software development offer insight into how to promote the technical best-practices needed to produce some of these project attributes; however, the management of non-technical, social components of software projects are less visible and therefore less often discussed in best-practice pieces. In a [recent community call](/commcalls/2018-12-18/), I discussed some of these components through the lens of [my research](/blog/2017/10/06/sholler-plan/) on open source research software project governance.

The qualitative, ethnographic work informing the talk included qualitative data analysis of a total of 59 interviews with leaders and other members of open source research software projects. I also consulted primary source data, such as observation and documentation of hackweeks, workshops, and unconferences; online discussion forums (e.g., Slack groups), blog posts, website announcements, and community calls; policy papers; and social media threads.


### Governance: What is it, and Why Does it Matter?

Just as software development is an exercise in engineering, so too is the administrative and managerial work required for promoting sound research software development practices—after all, highly-trained professionals like scientists can be a difficult group to ask to alter their long-held, deeply-ingrained practices. Since social engineering is a problematic term, we can instead talk about how organizations get people to do things by talking in terms of governance. Governance is the process of structuring activities toward a particular goal through implementing policies and procedures, building communities, and setting up management frameworks. Barry Bader, who consults medical organizations on governance, puts it succinctly: Governing bodies have the “responsibility to see that the organization is acting in the best interests of the public, and more specifically the “stakeholders” who are served by the organization’s mission.” He goes on to define governance as the sets of tasks involving [^3]

1. Mission and strategic direction - *What do we want to build? (technically and socially)*
1. Finances and investments - *How will we sustain our efforts?*
1. Quality - *What constitutes impactful software? How do we formalize and evaluate “quality”?*
1. Community benefit - *How does the project promote better science?*
1. Compliance with laws and regulations - *How do we navigate institutional, journal, governmental, and other policy landscapes?*

In the context of research software, we can think of “best interests of the public” as “the best interests of science,” and stakeholders as the members of the scientific community.

### Governance throughout the Stages of Open Source Research Software Development

Although project leads should be thinking about the long-term governance strategies they’ll use for their projects, each stage of project growth brings its own unique challenges. In **early stages**, projects often focus on establishing the scientific and technical need for a new software project or package and developing solutions; in the **middle stages**, projects advertise their solutions and set directions for where they want the project to go; and in **late stages**, projects codify their expectations of contributors and users, norms of communication, and relationships to other organizations in their ecosystem.

In the **early stages** of projects, founders and leaders of the project focus their efforts on identifying and defining the problem space. What are the shortcomings of existing research software tools, and what would the project do to address them? For example, rOpenSci’s founders coalesced around the problem of retrieving and analyzing scientific data in reproducible ways. Once the problem space is defined, project leaders turn the focus of governance to setting a strategic direction to solve the problem, including advertising the project to potential contributors. One of the early forms of setting strategic direction involves finding an initial advisory board or steering committee. The leaders I spoke with discussed how early boards comprised groups of people who members of the project knew and/or worked with and who held expertise in some component of the project. In the **middle stages** of project development, the initial advisory board often changes to suit the challenges the project faces. For example, if a project has a difficult time securing funding in the early stages, it might consider finding advisors who have served as program officers at funding agencies who are well-versed in what it takes to get a project funded.

As a project grows, communication within the project’s community becomes more challenging than when a handful of people are working together. Several governance strategies can be deployed in the **mid- to- late stages** to streamline and bridle communication between community members. One such strategy—implementing a code of conduct—can help to ensure that communication within the community is healthy, welcoming, and productive. While having a code of conduct is a positive step, organizations should take steps to ensure that violations are reported without hesitation. For example, at least one of the individuals receiving reports of violations should be an independent party (i.e., not employed by the project) so as to protect those who file reports from fear of retribution or other negative consequences. Examples of codes of conduct and their reporting mechanisms can be found online for [rOpenSci](/code-of-conduct/), [Project Jupyter](https://github.com/jupyter/governance/blob/master/conduct/code_of_conduct.md), and [The Apache Software Foundation](https://www.apache.org/foundation/policies/conduct.html).

Implementation of a code of conduct is perhaps an indicator that a project is **reaching maturity** in terms of size and participation. (Note that this is not meant to convey a stepwise approach to governance, but rather illustrate shifts in the needs a project might have as it evolves.) Leaders of open source research software projects can, at this stage, strategically codify the organization's position in the broader ecosystem of organizations by engaging in partnerships and collaborations. Partnerships are particularly impactful when they include long-standing institutions of research, such as [providing software review for academic journals](/blog/2017/11/29/review-collaboration-mee/) or teaching workshops at a discipline's major conference.

### Governance Examples

Once a project has begun to display the signs of formalized governance--e.g., it has gained users and contributors, implemented a code of conduct, and partnered with other organizations--its governance strategies can develop into codified frameworks or models. In addition to stating the project’s mission and direction, governance frameworks and models outline the structure of the project, how decisions are made, and where and how community members can respond to decisions. Making governance models explicit—whether on a website or GitHub repository—can add transparency and foster a sense of inclusion among community members. Some good examples of codified governance models include:

- [The Carpentries](https://docs.carpentries.org/topic_folders/governance/index.html)
- [The NumPy Project](https://docs.scipy.org/doc/numpy-1.15.0/dev/governance/governance.html)
- [The Node.js Project](https://github.com/nodejs/node/blob/master/GOVERNANCE.md)

### Questions and Attempts at Answers

The value of a community call--as opposed to a blog post like this one--is the ability to synchronously interact with the audience. Below, I paraphrased some of the questions I received and my attempts to answer them.

**KJ asked:**

> I’m very interested in replicating this study within our community, The Carpentries, with interviews and everything you’ve done here. I’m wondering where I can find the protocol.

I think it would be great to see how these same interviews go within different communities. The [protocols are now public](https://github.com/dsholler/ropensci_postdoc/blob/master/interview_protocols_osrs_lm.pdf) and are free to use without restriction.

**LW asked:**

> How do you handle those “dominant” voices in a project while still encouraging broad participation?

My immediate internal reaction to this question was, “Hire a community manager!” I realize, though, that the vast majority of emergent projects do not have the resources to devote to a paid community management position. However, there are strategies that can be gleaned from what community managers do (and what theories about community-building explain), and they can be implemented by leaders and community members alike. For example, channeling discussions into somewhat siloed outlets can ensure that interested parties can find and participate in discussions where they feel welcomed and appreciated. This strategy is perhaps most applicable in instant messaging and discussion forum services where topics and designated channels are explicit. Dominant voices can express their expertise to others who wish to hear it, while others can find what they are looking for in alternative places.

The limitation to this approach is that dominant voices control the discussion on a given topic that might benefit from a variety of new perspectives. In these scenarios, a code of conduct can go a long way (particularly when paired with gentle or not-so-gentle reminders of the code of conduct’s content). In other words, controlling the tone can aid in controlling the perception of a voice as overpowering. Here, the details of the code of conduct matter: In addition to prohibiting general disparaging language or tone, consider adding specific elements prohibiting negative comments about technology choices, disciplinary background or level of education, and favorite color themes.

**JB asked:**

> What factors go into deciding whether a decision should be made publicly or privately?

My analysis of this topic is still very much in development, but some common characteristics have emerged. Private, closed decisions often involve decisions about people rather than the software itself. For example, personnel decisions, decisions about the tone and content of discussions on public forums, and decisions about forging strategic partnerships with other organizations tend to be closed. When deciding on whether to make decision-making processes public or private, project leaders can ask themselves: Is someone going to be negatively affected if the decision is made publicly?

Even if a decision is made privately, the processes influencing the decision can be open and transparent. A good example of this is decisions about who to accept to unconferences and hackweeks. Some of the factors going into these decisions can be made public. For example, announcements about event acceptances might include statements like “We decided to accept an equal number of people from R1 universities and smaller schools, from the early career pool of applicants and the senior pool.” AstroHackWeek is a unique example in which the decision-makers used a publicly-available algorithm to make acceptance decisions. These examples highlight the ability to make decision processes transparent, even if all of the details and internal discussions are not posted for all to see.

**NR asked:**

> What do leaders of mature projects know now that they wish they’d known in the past?

The issues projects face in late stages of development are often unforeseen, but project leaders did report some common ideas about unanticipated challenges. For example, leaders did not always anticipate becoming leaders. Although it seems intuitive, the roles people take on as the project matures can come to include tasks that differ from anticipated software development tasks. Project leaders spend lots of time writing and managing grants, organizing events, creating ways to engage a larger or more diverse set of users and contributors, and other administrative and managerial types of tasks. In some cases, leaders expressed a bit of reluctance toward their evolved role; more often, they wished they had been better prepared with skills for management and human resource decisions. Across the projects I’ve studied, no leaders or senior members had received formal management training you might find in business administration programs or professional development courses. Instead, they taught themselves these skills by reading, learning from others, and improvising as challenges arose.

Some of the project leaders and members I interviewed also noted that the formalization of contribution guidelines perhaps could have happened sooner. But they also expressed an appreciation for the delicate balance required for setting expectations of contributors – formalizing too quickly could exclude contributors who provide innovative ideas and code contributions, and failing to set any guidelines would damage project cohesiveness and progress toward a well-defined mission. In any case, leaders of emergent projects can keep their finger on the pulse of the contributing guidelines and frameworks set by more mature projects so as to scale innovation and growth earlier and faster.

As a final note on this point, both the themes from my interviews and comments from the community call emphasized the importance of ensuring that a variety of voices are recognized early and often in governance discussions. No one or two voices should have disproportionate power in setting the direction and making decisions for a project, with the exception of the voices who devote a disproportionate amount of work to advancing the project. Weighting decisions appropriately is good, but too much gatekeeping is bad and can reproduce the problems found in closed, proprietary software projects.

**CD asked in the rOpenSci discussion [forum](https://discuss.ropensci.org/t/what-would-you-like-to-know-about-governance-strategies-for-open-source-research-software-projects/1500/2):**

> What options do established projects have in promoting and rewarding contributions from PhD students and postdocs to contribute?

I didn’t quite cover this in the call, but it played heavily in the interviews I conducted. Across all the types of people I interviewed, events I attended, and other observations, a consensus opinion was that elevating the role of software in academic culture is necessary if we wish to continue attracting early career scientists to software development. In other words, if academic institutions—universities, professional societies, journals, and the like—begin to value software contributions in the way they value manuscripts, the attraction will be natural. Organizations such as [FORCE11](https://www.force11.org/), the UK’s [Software Sustainability Institute]( https://www.software.ac.uk/), and the newly-formed [Research Software Alliance (ReSA)](https://researchsoftwarealliance.org/), among others, are making headway in this effort.

One aspect of this that I did discuss in the call could also factor into making software development more attractive to PhD students and postdocs to move a codebase forward: Partnerships between open source research software organizations and journals. These partnerships (some examples via the links in the text above) provide a way to turn code or software used in conducting a study into a peer-reviewed, technically-sound package that can then be promoted and used by other members of the scientific community. Aside from the internal rewards and sense of accomplishment they offer, such products can then be demonstrated and promoted at major conferences. Early career folks can benefit from that type of exposure.

The final point I’ll make on this is based on what I’ve seen in interview responses from the PhD students and postdocs themselves: Whether their software development work provides innovation in science or not, early career researchers discussed the value of belonging to a community of like-minded people who care about scientific software. They noted the collaboration opportunities software work opened up for them and the gratification of feeling like an expert in a particular domain, which isn’t always as accessible in terms of notoriety for scientific findings.

**ET asked in the rOpenSci discussion [forum](https://discuss.ropensci.org/t/what-would-you-like-to-know-about-governance-strategies-for-open-source-research-software-projects/1500/3):**

> How can a generally “loose” governance model be integrated with team members who are more used to (or have to follow) a “tight” model?

The answer to this question likely depends on to what extent the “tight” model aligns with the defined best-practices of the “loose” model project. For example, if the project wishes to move more of its contributors towards the practices used by developers who are used to operating under a “tight” model, it could serve as an opportunity for intra-team learning and, as a result, relationship building. Developers who have been trained in best-practices can, for example, offer tutorials or otherwise teach those practices to their peers (e.g., a Carpentries-type model). As learning goes, the learners often teach the teachers, too: about what is simply not practical under the constraints of doing the messy thing called “research,” about participating in a largely community-led effort rather than within an organization with set deliverables, or about the discipline-specific problems for which the project is seeking answers.

**JS asked:**

> You mentioned tools like Slack and GitHub, and I wondered more generally about what tools are typical that are either visible or invisible to the public, and whether you noticed any succession of tool adoption over time.

Unfortunately, I have not studied in this space long enough to see a large amount of change in the tools used. However, I have certainly been following the public and private debates around the adoption of tools like Jupyter Notebooks. On one hand, the debate around the adoption of these tools isn’t surprising: It’s almost always problematic when new tools gain popularity and are rapidly adopted, especially when those tools alter existing workflows. These debates are amplified when a number of people working on a project want to continue using particular tools and the broader community yearns for a new, perhaps more innovative tool.

I have seen in all of my work—not only in open source research software, but also in healthcare and international development—that these debates and conflicts are not necessarily a bad thing. The introduction of a new tool can be a good place to reflect upon what your project or organization has done in the past and what you might do the same or differently now, what tools and processes to keep, and what vestiges of the past to discard. In other words, the broader external debate can influence healthy internal debate about the direction, narrowly or broadly defined, of the project or organization.

One aspect of tool succession that I have noticed in studying open source research software organizations is that the configuration and integration of tools gets more complex as the number of tools grows. That’s probably obvious, but fascinating from a historical and social perspective. Particularly interesting is JS’s point about visible and invisible tools, as I’m currently trying to think through how things like whiteboards and hand-written notes operate within “open” organizations. How are those things made available, if at all, for the public to view? Lots of decisions in collocated teams are made through collaborative work on physical objects like whiteboards or via face-to-face interactions, and representations of these objects and conversations often don’t make it into a GitHub repo for the public to see. Moving forward, I think it will be important for projects—particularly those which identify as “open” projects—to find ways to capture that information exchange.

**ET also asked in the rOpenSci discussion [forum](https://discuss.ropensci.org/t/what-would-you-like-to-know-about-governance-strategies-for-open-source-research-software-projects/1500/3):**

> Are there any suggestions/guidelines for how to build a formal governance model (i.e. for reporting to funding agencies easily), but without losing the “anyone can join in”/“we’re all in this together” spirit that is characteristic of a “loose” governance approach to open development?

This is where I think roadmaps can be useful. By specifying some short and long-term goals and making them public, projects can direct the community’s attention to the problems it wants to solve without requiring that participation depends on making those particular contributions. Smaller projects might have very specific roadmaps as opposed to larger projects, so mileage may vary on this. Funders are likely to want to see something in the middle: Not the nitty-gritty details of development nor lofty visions, but rather where the project has been and where it sees itself going in relation to the general research questions being asked by the field as a whole.

**LW asked:**

> How does a new organization handle growth, and how do we grow efficiently?

I may have overstated the point about project leaders saying that growth was never their goal, but they certainly agreed with LW on the point that growth comes with a host of challenges. In their responses about growth, there was a clear distinction that arose in all of the interviews: Growth in use cases is different from growth in number of users, so the governance strategies used to achieve growth vary. Growth in use cases necessitates seeking out a wider variety of scenarios in which the software could be used; growth in the number of users depends on, well, gaining users. The most poignant theme regarding strategies used for both types of growth was “choices about where the project is advertised.” In stages where leaders sought more use cases, they advertised projects at places like open science meetings (e.g., OpenCon). When trying to grow the number of users, the quickest and most direct hits, in leaders’ opinions, came from advertising at discipline-specific conferences and meetings (e.g., large professional association conferences).

**TT asked:**

> How can we disseminate the lessons learned from this project, and how can we connect project leaders as they go through these stages?

Open source research software projects benefit immensely from, at the current moment, operating within a small world. Leaders of projects often know each other, even across disciplinary boundaries. Organizations such as NumFOCUS, FORCE11, the UK SSI, and other scientific software groups bring people together multiple times a year to share experiences and strategize, which is a positive thing (and a beautiful thing to observe). In terms of disseminating the work from this project, please stay tuned, as I’ll be attempting to publish papers in organization science, information science, and social studies of science and technology outlets.

### What questions do you have?
What else would you like to know about project governance? Do you have some resources to share that would benefit the community? Post any questions, comments, citations, or links below. Thanks for reading!

[^1]: Wilson, G., Aruliah, D. A., Brown, C. T., Hong, N. P. C., Davis, M., Guy, R. T., ... & Waugh, B. (2014). Best practices for scientific computing. *PLoS Biology*, 12(1), e1001745. https://doi.org/10.1371/journal.pbio.1001745

[^2]: Working Towards Sustainable Software for Science: Practices and Experiences forum. Proceedings of meetings available from: http://wssspe.researchcomputing.org.uk/proceedings/

[^3]: Bader, B. S. (2008). Distinguishing governance from management. *Great Boards*, 8(3), 1-5. Bader & Associates: Potomac, MD. Available from: https://cacnc.org/wp-content/uploads/2016/06/Great-Boards-distinguishing-governance-and-management.pdf
