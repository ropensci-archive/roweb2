---
slug: pyopensci
title: Facilitating Open Science with Python
date: '2013-05-16'
author:
  - Steve Moss
tags:
  - Python
  - pyOpenSci
  - API
---
*A guest blog post by Steve Moss*

![Steve Moss](/assets/blog-images/steve_moss.png)

# Why Python? A little background!

I started using [Python][python] in the summer of 2010. I had applied for the Master of Research postgraduate degree in Computational Biology at the [University of York][yorkuni]. They teach the programming portion of their course using Python. I thought it might be useful to learn it, before starting, to give me a bit of a head start.

From the beginning, it was clear to me, that Python was something different, in relation to all the other languages I had previously used. It had a beautiful, simple, clean syntax; and made producing code more about implementing the concept, or being creative with an idea, than about hacking away with an unintuitive and unnecessarily complicated syntax.

I'm now around my 3 year anniversary of Python usage, and haven't looked back. I wrote a blog post in 2010, after I had started using Python as my primary development language, to outline how I saw it as a formidable force in moving bioinformatics development forward. With every day that I use Python, my view is only reinforced. The only change I would make, is in expanding my prediction of Python's dominance, to be multidisciplinary. I believe the power of Python can be used in everything from Computer Science, through Biology, to the Social Sciences, and even the Arts. In short, I don't think there is **anything** that Python cannot do (with a little imagination).

# Why pyOpenSci? Enabling transparency!

To reinforce my support of, and belief in, Python, I decided to found [pyOpenSci][pyopensci]. My first post on Twitter announcing it outlined it as a blatant rip-off of rOpenSci, which of course it is, but, for the Python programming language, instead of for [R][rstats].

In the same manner as rOpenSci, I wanted, first and foremost, to facilitate the improvement of the scientific field, by enabling and promoting openness and sharing within and between scientific communities. I believe it is only possible for science to progress by making it completely transparent. Science shouldn't be about PIs clocking up papers and expanding their careers and egos through pay-walled research; it should be about sharing the wonder and beauty of the natural world with everybody, whatever their field. By sharing scientific research, openly and freely, it also allows for reproducibility, easier peer-review, and increased propagation of ideas, so that future research may be enabled and developed more swiftly.

The rOpenSci project has already created [a number of wrappers][ropensciwrappers] around various science related APIs. This is to be the first task of pyOpenSci, enabling their utilisation via the Python programming language. The first wrapper, [pyEnsemblRest][pyensemblrest], has already been released in it's beta testing form, and is ready for utilisation by those that want to work with [EnsEMBL][ensembl] data, via it's [REST API][restapi].

# Open Hardware

As well as facilitating open science, and open data, however, I should also like to support and encourage the use of open hardware. Platforms such as the [RaspberryPi][raspberrypi] and [Arduino][arduino] create some amazing opportunities for people to develop some fantastic, and extremely creative, hardware projects. Python, because of it's simplicity, and power, is the primary language promoted for development on the RaspberryPi. As well as being able to develop in Python within a responsive, and powerful, Linux environment, one can also expand the RaspberryPi's intended functionality via it's on board GPIO connectors (see [here][gpio] for a list of cool projects and more information on RaspberryPi's GPIO).

At first glance, one might not see how open hardware is compatible with open science, but I believe, it is as important as, if not more so, than open source. It is certainly necessary to consider all elements of a system, when provisioning for openness and the hardware is an integral part of that model. By allowing us to develop on platforms that we can enhance and control, in more intricate ways, via simple APIs, we can have greater control over our projects in their entirety. For example, I was recently involved in a project with an ecologist at our university. They were using data loggers and specialist equipment to monitor and maintain temperature differences between different plots of land. The equipment cost thousands of pounds, used a custom programming language; based on BASIC (which is horrendously unintuitive), that required additional cost to develop the software for their needs, and in general was unnecessarily complicated to install and maintain. In fact, it took a good few months to get it working properly in the first place, hence my involvement in trying to debug the system. I believe the whole project could have been setup using a platform such as the RaspberryPi, and utilising the Python programming language, for a fraction of the cost, in a fraction of the time, allowing for valuable research money and effort to be utilised elsewhere.

I believe all this and more is capable by utilising the Python programming language.

# Future

In the future I can only see Python going from strength to strength. By developing additional wrappers, scientific software packages, data mining applications, and open hardware libraries, pyOpenSci aims to improve and facilitate what should be an inherent property of scientific research - it's openness.

It is my hope that I can encourage researchers to utilise Python to develop, share and engage their strategies for enabling open science. I would hope that I can provide workshops, training sessions, consultancy and support for doing so.

As well as enabling researchers, I should hope that pyOpenSci can also engage in outreach activities within local communities. Python has already established itself as a simple, yet powerful language, and along with the RaspberryPi is being pushed as a learning tool for Computer Science and Electrical Engineering within schools. Being able to further enhance the education of the next generation of scientists and engineers is an extremely rewarding prospect, and extremely important. By engaging and enabling youngsters to work within an open framework, one would hope that this will improve the prospects for open science and open research in the future.

Lastly, pyOpenSci is, at present, just [me][aboutme]. My time is currently limited as I attempt to focus on finishing my PhD. Hopefully as time progress I can encourage other scientists, researchers, engineers, artists, and more, to join pyOpenSci, and progress the open science vision. In addition to a love for Python, one should have a love for being open and transparent about the topics they are passionate for. These are the only prerequisites, and yet are important traits, that we need to propagate through the research community as a whole.

**Steve Moss**
Pythonista

Founder of pyOpenSci

Doctoral Research Student

[https://about.me/gawbul][aboutme]

[python]: https://www.python.org/
[mrescompbiol]: https://www.york.ac.uk/biology/postgraduate/masters/mres-computational-biology/
[yorkuni]: https://www.york.ac.uk/
[myblogpost]: https://medium.com/@gawbul/perl-python-or-ruby-543054dd3bd5
[pyopensci]: https://github.com/pyOpenSci/
[rstats]: https://www.r-project.org/
[ropensciwrappers]: https://github.com/rOpenSci/
[pyensemblrest]: https://github.com/pyOpenSci/pyEnsemblRest/
[ensembl]: https://www.ensembl.org/
[restapi]: https://rest.ensembl.org
[raspberrypi]: https://www.raspberrypi.org
[arduino]: https://www.arduino.cc
[gpio]: https://www.raspberrypi.org/search/gpio
[aboutme]: https://about.me/gawbul
