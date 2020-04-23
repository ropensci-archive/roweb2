---
slug: announcing-2018-ropensci-fellows
title: Introducing the 2018 rOpenSci Research Fellows!
date: '2018-02-14'
author:
  - Karthik Ram
topicid: 1066
tags:
  - fellowships
  - funding
---

rOpenSci’s mission is to enable and support a thriving community of researchers who embrace open and reproducible research practices as part of their work. Since our inception, one of the mechanisms through which we have supported the community is by developing high-quality open source tools that lower barriers to working with scientific data. Equally important to our mission is to build capacity and promote researchers who are engaged in such practices within their disciplinary communities. This fellowship program is a unique opportunity for us to enable such individuals to have a bigger voice in their communities. 

This year, a diverse committee (comprised of [Di Cook,](https://research.monash.edu/en/persons/dianne-cook) [Mine Cetinkaya-Rundel](http://www2.stat.duke.edu/~mc301/), [Matt Jones](https://matt.magisa.org/), [Ken Benoit](https://kenbenoit.net/) and myself) reviewed 64 applications from researchers in various disciplines to select four winners. Emerging from this impressive pool of applicants are four outstanding researchers who constitute the 2018 Fellows. They are **Dr. Samantha Tyner** (Iowa State University), **Mr. Zachary Foster** (Oregon State University), **Ms. Kelly Hondula** (SeSync, University of Maryland) and **Dr. Jon Zelner** (University of Michigan). 

### Meet our 2018 Fellows

#### Sam Tyner

When you hear the term “forensic science” what comes to mind? If you’re like most Americans, you probably think of TV shows like “CSI” or “Criminal Minds”, where forensic science is used to solve crimes in incredibly fast, effective, and technologically sophisticated ways. In reality, however, most forensic science moves slowly, is very expensive, and relies on human judgement, not sophisticated technologies.  Where advanced machines and algorithms exist, such as in DNA analyses, the current best and most widely used tools are proprietary, siloed, and extremely expensive. At the [Center for Statistics and Applications in Forensic Evidence (CSAFE)](https://forensicstats.org/), our primary goal is to improve the foundation of forensic feature comparison techniques in a transparent way. It has been well-established that many of these forensic science disciplines lack the scientific foundation of single-source DNA comparison, which is considered the “gold standard” of forensic science. CSAFE is committed to establishing the scientific and statistical foundations of these evidence types using open source tools to increase the overall transparency of forensic science disciplines.

In the R community, where open source rules, users have developed some packages with forensic science applications, such as glass transfer and DNA comparisons, while additional R packages for other feature comparison methods, including bullet and cartridge case identification, shoe sole impressions, glass element analysis, and handwriting source analysis, are currently in development at CSAFE institutions.  In order to further establish the open-source foundation in forensic science, and with the award of the rOpenSci fellowship, Sam Tyner, a postdoc at CSAFE, and Heike Hofmann, professor of statistics at Iowa State University, will create an online book, “Open Forensic Science in R,”  which will be made freely available on CSAFE’s website. Each chapter of the book will walk the reader through a forensic analysis step-by-step using an R package uniquely designed for that forensic discipline. We also hope to contribute to many of these packages by authoring package vignettes and making significant additions to their documentation. Through writing this book, we want to set an example for current and future forensic statisticians by participating in cross-disciplinary and cross-institution collaboration, both within and outside of CSAFE. Our ultimate goal in authoring this book is to lower the financial barriers to entry when performing forensic science analyses, both for researchers in academia and for small-scale forensic laboratories. By improving access to some of the tools needed by practitioners and researchers, the field of forensic science can start to reap the benefits of open source technologies, just like data science has in the last decade.

#### About Sam

{{< figure width=150 src="/img/team/sam-tyner.jpg" alt="Sam Tyner" class="pull-left" >}}

Sam Tyner holds a PhD in Statistics from Iowa State University, where she is currently a postdoctoral research associate with CSAFE, focusing on education, outreach, and computing. Her other research interests outside of forensics include statistical graphics and social network analysis & visualization. She is also the co-founder and co-organizer of the Ames chapter of R-Ladies, and is a proud alumna of Augustana College. 

[Twitter](https://twitter.com/sctyner), [GitHub](https://github.com/sctyner), [Web page](https://sctyner.github.io/)

---

#### Zachary Foster

Affordable high-throughput DNA sequencing has led to a massive increase in ecological research that uses DNA sequences to record and classify organisms. DNA from a sample of water can reveal the species of fish living in a river. Every insect species can be identified from samples collected in a trap without any expertise in entomology. DNA from an animal’s droppings can tell us about its diet. This technique has resulted in the recent explosion of microbiome research. It has lead to the realization that every organism (plants, animals, and even us humans) is an ecosystem or “superorganism” reliant on a diverse community of microbes for essential functions; a sterile homo sapiens is a dead homo sapiens.

The R community has responded to this abundance of data by making numerous packages that work with the taxonomic makeup of communities (e.g. `phyloseq`) or query the ever-larger reference databases containing taxonomic information associated with sequences or occurrence data (e.g.` taxize`, `gbif`). However, taxonomic data is hierarchical, and hierarchical data is hard to deal with compared to tabular data, so each package typically has its own solution to the problems of parsing, encoding, and manipulating taxonomic data. This is also true for the reference databases and other tools outside of R. In many cases, the hierarchical nature of the data is simply ignored and only specific ranks in the taxonomy (e.g. genus) are considered. 
With this fellowship, we are attempting to address these issues by introducing a standard in R for parsing, encoding, manipulating, and visualizing taxonomic data and any application-specific information associated with it. We are developing the `taxa` package to provide an all-purpose set of taxonomic classes and functions to manipulate them. We are also  developing the `metacoder` package, which builds on taxa and adds graphing of taxonomic information and tools intended for metagenomics research. 

The impact of this work will ultimately rely on adoption by the research community as a standard, or at least a valid option, for working with taxonomic data in R. We are working to adapt parts of taxize, the primary package for querying online databases with taxonomic information, to use the classes in taxa. We hope that the generally useful functionality provided by the taxize and metacoder packages will jump-start the adoption of the taxa framework. 


#### About Zachary

{{< figure width=150 src="/img/team/zachary-foster.jpg" class="pull-left" >}}

Zachary Foster is an Oregon State University graduate student working with Niklaus Grunwald working on the communities of fungi and oomycetes inhabiting woody plants in natural and nursery settings. He uses R extensively for his research and develops code aimed at making visualization of taxonomic easier and more informative.

[Twitter](https://twitter.com/zacharyfoster19), [GitHub](https://github.com/zachary-foster)

---

#### Kelly Hondula

Ecologists, hydrologists, and soil scientists collaborating in watershed science use diverse methods to gather data about ecosystems. Each collaborator’s workflow involves a different set of disciplinary expertise to derive results, such as modifying lab procedures, developing calibration curves, or nuanced site-specific corrections. This results in many different strategies for organizing and managing data based on the relevant units and timescales of observations, and whether they are based on manually recorded observations, physical samples, or machine-generated data from sensors or lab equipment. These workflows present a challenge for reproducibility because they are necessarily idiosyncratic and highly contextualized. For example, sensor data often goes through multiple levels of interpretation for quality control to identify periods where data are compromised from maintenance, power failures, biofouling, or other malfunctions. Integrating these time series data with sample-based data has been a particular challenge in watershed science and is typically handed with time consuming, custom approaches that are difficult to document and reproduce. 

With the rOpenSci fellowship, I’ll be creating tools and training material to help manage these diverse types of data with workflows in R structured around an information model called ODM2 (the Observations Data Model Version 2). This data model was developed in the hydrology and geoscience community, and was specifically designed to make earth science data more interoperable across networks of research sites. My goal is to make it easy for ecologists to adopt ODM2’s concepts and vocabulary for projects that involve studying ecosystems through a combination of field monitoring, sample collection and analysis, laboratory studies, and computer modeling, even if that project is not part of a large network with cyberinfrastructure resources and dedicated data managers. Datasets using this common framework would have greater re-use potential, and could be shared with a wider community in existing long-term data repositories. 

I’ll be developing a set of modules based on common procedures in aquatic ecology, with examples and guidelines for how to structure a reproducible workflow and “translate” it into the ODM2 data model. Each module will have a set of R functions, template data sheets, and vignettes with conceptual diagrams describing how to use the workflow. To complement these modules, I’ll be using packages like `RShiny`, `leaflet`, and `dygraphs` to create visualization tools to help interpret biogeochemistry and hydrology datasets that use the ODM2 framework. My overall goal is to have these tools make it easier for ecologists, especially those comfortable using R for data analysis, to seamlessly integrate components of the ODM2 framework into the workflows they are already using. 

#### About Kelly

{{< figure class="pull-left" width=150 src="/img/team/kelly-hondula.jpg" >}}

Kelly is an aquatic ecologist working on her PhD in the MEES (Marine, Estuarine, and Environmental Sciences) Program at the University of Maryland. Her dissertation is on linking hydrology and methane in wetlands. She also works at the National Socio-Environmental Synthesis Center, where she provides data science support for SESYNC teams and fellows.

[Twitter](https://twitter.com/kellyproof), [GitHub](https://github.com/khondula), [Website](https://www.sesync.org/users/khondula)

---

#### Jon Zelner

Infectious disease models are increasingly able to incorporate fine-grained spatial, socio-demographic, and genetic information to reconstruct patterns of transmission.  However, this increased capability creates new difficulties for open-source epidemiology: Publicly releasing such detailed data in its raw form is clearly unethical because it compromises participant privacy. At the same time, keeping the code and data for such analyses proprietary also poses an ethical quandary, because sharing this information is critical to both verifying the accuracy of published research results and for allowing other researchers to either apply published methods to new data, or to innovate upon existing methods. These issues are particularly acute for global health researchers, such as myself, who work with partners in low-and-middle-income countries (LMICs), for whom closed-source solutions may be prohibitively expensive and open-source analyses are critical tools for education, policy, and practice.

Right now, there are two gaping holes in the set of tools necessary to create maximally reproducible spatial analyses in epidemiology:

1) Open-source tools for data obfuscation that de-identify individual-level case data while preserving important spatial motifs and descriptive metrics (e.g. clustering), as well as relationships between key individual and ecological variables.

2) A documented, open-source, turn-key software pipeline for such analyses.
  

As part of this fellowship, my team and I are working to create a R package (working title is `obfuscatr`)  that contains implementations of best-practice approaches to data obfuscation, such as Voronoi masking. I’m also hoping to explore other approaches based on Approximate Bayesian Inference (ABC) that can produce dummy datasets that recreate key spatial features and covariate relationships without conditioning directly on point locations. I will be documenting examples of the usage of these tools in the context of real-world analyses using sensitive epidemiological data, from my own research and in standalone pieces. I anticipate these tools will show up in both primary research manuscripts as well as blog posts/publications focusing in depth on the underlying data obfuscation tools. I am also hoping to use this fellowship as an opportunity to revive some earlier work I have done creating containerized environments, e.g. Docker containers, for reproducible Bayesian spatial analyses. Ideally, these updated containers would include the `obfuscatr` tools described above, and would focus on container implementations usable in HPC environments, such as Singularity. 

#### About Jon

{{< figure width=150 src="/img/team/jon-zelner.jpg" class="pull-left" >}}

Jon Zelner is a social epidemiologist focused on spatial and dynamic modeling of endemic and epidemic infectious disease transmission.  His research covers a variety of pathogens from tuberculosis, to drug-resistant Staph Aureus (i.e. MRSA), as well as influenza and the wide range of pathogens causing diarrheal disease. He is particularly interested in the ways domestic and global social inequality drive susceptibility to infection via their effects on the physical (households, water quality) and social environments (networks) that people inhabit. 

[Twitter](https://twitter.com/jzelner), [GitHub](https://github.com/jzelner), [Webpage](https://www.jonzelner.net/)
