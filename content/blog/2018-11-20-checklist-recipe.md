---
slug: "checklist-recipe"
title: How standardize thematic species checklist data using R
authors:
  - name: Peter Desmet
    url: https://twitter.com/peterdesmet
  - name: Damiano Oldoni
    url: https://twitter.com/damianozingaro
date: 2018-11-20
categories: blog
topicid: 
tags:
- r
- opensource
- openscience
- ecology
- GBIF
- rgbif
- community
- template
- data standardization
- Darwine Core
---

# Intro: the Ebbe Nielsen Challenge

The [GBIF Ebbe Nielsen Challenge](https://www.gbif.org/news/4TuHBNfycgO4GEMOKkMi4u/six-winners-top-the-2018-ebbe-nielsen-challenge) is an annual incentive prize that seeks to inspire innovative applications of open-access biodiversity data by scientists, informaticians, data modelers, cartographers and other experts. It happened that our _checklist recipe_ was worth of wo-winning the first prize. This blogpost will explain you how we standardize _checklist_ data using R and the open source tools we used to afford such result. 

# Background

## What is GBIF?

GBIF — the [Global Biodiversity Information Facility](https://www.gbif.org/what-is-gbif) — is an international network and research infrastructure funded by the world’s governments and aimed at providing anyone, anywhere, **open access** to data about all types of life on Earth.


## What are checklists?

Checklists are datasets providing a catalogue of named organisms, or **taxa**. They contain typically information along taxonomic, geographic, and thematic lines, or some combination of the three.  Checklists function as a rapid summary or baseline inventory of taxa in a given context. The _recipe_ has considerably streamlined our own work to publish [seven checklists](https://www.gbif.org/dataset/search?type=CHECKLIST&project_id=trias) on alien species for Belgium, which is one of the goals of the Tracksing Invasive Alien Species ([TrIAS](http://www.trias-project.be/)) project, an open data-driven framework to support Belgian federal policy on invasive species. We think it will be useful to provide a well-documented workflow for others who want to publish this type of data.

## What is Darwin Core?

[Darwin Core](http://rs.tdwg.org/dwc/) is a standard of the Biodiversity Information Standards ([TDWG](https://www.tdwg.org/)) including a glossary of terms intended to facilitate the sharing of information about biological diversity by providing identifiers, labels, and definitions. Darwin Core is primarily based on taxa, their occurrence in nature as documented by observations, specimens, samples, and related information.

## Mapping to Darwin Core: challenges

Publishing cheklist data means transforming existing collected data to Darwin Core standard. This mapping, also called _data standardization_, can be hard due to the complexity of Darwin Core standard (see [quick reference guide](http://rs.tdwg.org/dwc/terms/) of all terms a publisher can use) on the one hand and the complexity of original data on the other hand.

[Templates](https://www.gbif.org/dataset-classes) and the [GBIF Integrated Publishing Toolkit](https://www.gbif.org/ipt) facilitates standardization, but only caters for the most basic use cases. 

# Recipe

To solve this, we have developed a [**checklist recipe**](https://github.com/trias-project/checklist-recipe), a template Github repository for standardizing thematic species checklist data to Darwin Core using R. This checklist recipe contains all the ingredients to make data standardization open, repeatable, customizable and documented. 

If mapping needs documentation, the use of the recipe needs documentation as well. With this in mind, we attached a [wiki](https://github.com/trias-project/checklist-recipe/wiki) to document not only the mapping script, i.e. the _recipe_, but also the _ingredients_ (source data), the _instructions_ (R Markdown), the _utensils_ (tidyverse functions) and the _dinner_ (Darwin Core data).

# Open source software: tools behind the scene

The recipe relies on several open source tools. Some of them, _R Markdown_ and _tidyverse_, have just been mentioned. We would like to list them and explain their role in the recipe.

## GitHub

As many of you probably know, [GitHub](https://github.com/) is one of the most used web-based hosting service for version control. It is mostly used for computer code. The recipe is nothing more than one of the thousands Github repositories. 

To give an idea how GitHub is popular within open source community, it is sufficient to say that GBIF itself is, coding speaking, a GitHub account with 117 repositories responsible of all functionalities GBIF is capable of. A visit of the [GBIF account on GitHub](https://github.com/gbif) is surely worthwile. And this blog, actually, is nothing else than a GitHub repository called [roweb2](https://github.com/ropensci/roweb2) held by [rOpenSci](https://github.com/ropensci) GitHub account!

So, join the GitHub community first, by making your own GitHub account. You can then _fork_ the recipe: by forking you will create a copy of the repository on your account and you can start customizing it as needed. Go to our wiki [GitHub page](https://github.com/trias-project/checklist-recipe/wiki/GitHub) to set up the very first steps in the world of version control.

## Cookiecutter data science

The recipe shares the same repository structure we used to map all checklists we published. We didn't invent it because there is already an open source project intended to ease the work of every data scientist and it is called [Cookiecutter Data Science](http://drivendata.github.io/cookiecutter-data-science/). Here below the structure we adopeted: files and directories indicated with `GENERATED` should not be edited manually.

```
├── README.md              : Description of this repository
├── LICENSE                : Repository license
├── checklist-recipe.Rproj : RStudio project file
├── .gitignore             : Files and directories to be ignored by git
│
├── data
│   ├── raw                : Source data, input for mapping script
│   └── processed          : Darwin Core output of mapping script GENERATED
│
├── docs                   : Repository website GENERATED
│
└── src
    ├── dwc_mapping.Rmd    : Darwin Core mapping script, core functionality of this repository
    ├── _site.yml          : Settings to build website in /docs
    └── index.Rmd          : Template for website homepage
```

## R Markdown

Mapping your data means running some code, while documenting the mapping means writing an explanatory text about it. Combining both in a single document is what programmers call [literate programming](https://en.wikipedia.org/wiki/Literate_programming) and that's what we do by writing an [R Markdown](https://github.com/trias-project/checklist-recipe/wiki/R-Markdown) document: we combine R code and markdown syntax-based text in the same file. It is therefore not surprising that our mapping template is an R Markdown document: [dwc_mapping.Rmd](https://github.com/trias-project/checklist-recipe/blob/master/src/dwc_mapping.Rmd).

## here

[here](https://here.r-lib.org/) is an R package. Its authors describe it as:
> a simpler way to find your files.

It contains the function `here()`, which we used for specifying the path of data. For example:

```
path_file <- here("data", "raw", "checklist.xlsx")
```

It returns a string which can be used as path for reading files like shown here by providing the input `path_file` to the function `read_excel` from package `read_excel`:

```
input_data <- read_excel(path = path_file)
```

## tidyverse

[tidyverse](https://www.tidyverse.org/) is an opinionated collection of R packages designed for data science. The packages `here` and `readxl` we mentioned above are part of it! You can install all of them at once by:

```
install.packages("tidyverse")
```

while running

```
library(tidyverse)
```

will load the [core tidyverse](https://www.tidyverse.org/packages/).

In the recipe's wiki we dedicated a page to [tidyverse functions ](https://github.com/trias-project/checklist-recipe/wiki/Tidyverse-functions) where we described the three basic functions you need most while standardizing your data: `mutate()`, `recode()` and `case_when()`. A note about _piping_, i.e. using the _pipe operator_ `%>%` or _pipe_,  is also present.  

## rgbif

If you publish checklist data, you have to do with taxonomy. As we publish our checklists on GBIF, we have to do with the [GBIF Backbone Taxonomy](https://www.gbif.org/dataset/d7dddbf4-2cf0-4f39-9b2a-bb099caae36c), a single synthetic management classification with the goal of covering all names GBIF is dealing with. One of the main mapping steps is to _parse_ all input taxonomic names and get the right rank (is it a _species_? Or a _genus_? Or a _family_?) to them. To do it, GBIF developed the [name parser](https://www.gbif.org/tools/name-parser). Install the rOpenSci's package [rgbif](https://github.com/ropensci/rgbif) to use the name parser functionality without leaving your R session: rgbif interfaces you with GBIF API by using a collection of well named R functions. To parse names, you can just pass a vector of names to rgbif function `parsenames`. Here below we show you how we would do it if our names are in column `input_scientific_name` of data.frame `input_data`:

```r
parsed_names <- input_data %>%
  distinct(input_scientific_name) %>%
  pull() %>% # Create vector from dataframe
  parsenames() # An rgbif function
```

Note the use of pipes to concatenate functions in a very readable way.

The `nameparser()` provides also information about the rank of the taxon (in column `rankmarker`), a mandatory field for publishing checklists on GBIF, which sometimes misses in the original checklists. Checking the correctness of the parsing is part of the publisher's homework.

## R Markdown websites

You successfully mapped your checklist data, you documented all your steps by adapting the RMarkdown. How to publish the mapping in the most easy and at the same time visually appealing way? We came up to use R Markdown websites: https://rmarkdown.rstudio.com/rmarkdown_websites.htm. Check it out yourself by examining one of the [examples](https://github.com/trias-project/checklist-recipe/wiki/Examples) we provided in the wiki!

# Conclusion

We wrote this blogpost in order to share our experience in building a completely open, documented and working template for publishing biodiversity data. We are strongly convinced that the future of biodiversity is open. Co-winning the GBIF Ebbe-Nielsen Challenge gave us even more enthousiasm about. We think also that the time arrived to give back! We couldn't win anything without any of the open source tools we cited above (and many others: R is a free programming language after all!). For this reason we decided to devolve half of the price to [NumFocus](https://numfocus.org/), the organization sponsoring several open source projects sensibly improving the quality of science worldwide. Supporting open source research means supporting your own research after all!

You can contribute to open source in many other ways: based on your background and expertise you can report bugs, propose new functionalities or even being a contributor. The future you will be grateful for it!
