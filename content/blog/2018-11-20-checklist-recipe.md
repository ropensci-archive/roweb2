---
slug: "checklist-recipe"
title: Checklist Recipe - How we created a template to standardize species data
authors:
  - name: Peter Desmet
    url: https://twitter.com/peterdesmet
  - name: Damiano Oldoni
    url: https://twitter.com/damianozingaro
  - name: Lien Reyserhove
    url: https://twitter.com/ReyserhoveLien
date: 2018-11-20
categories: blog
topicid: 
tags:
- r
- template
- species
- checklists
- gbif
- rgbif
- data-publication
- data-standardization
- Darwin Core
- reproducible-research
- TrIAS
- Ebbe-Nielsen-Challenge
---

Imagine you are a fish ecologist who compiled a list of fish species for your country. 🐟 A list that could be useful to others. You could publish it as a supplementary file to an article or in a research repository, but your list might be hard to discover and incompatible with other lists of species. Luckily there's a better way to publish species lists: as a standardized checklist that can be harvested and processed by the Global Biodiversity Information Facility (GBIF). We created a documented template to do that in R, which recently won the [GBIF Ebbe Nielsen Challenge](https://www.gbif.org/news/4TuHBNfycgO4GEMOKkMi4u/six-winners-top-the-2018-ebbe-nielsen-challenge). In this post we'd like to explain how we did that and highlight some of the neat tools we discovered along the way.

## What is GBIF?

For those unfamiliar with the [Global Biodiversity Information Facility (GBIF)](https://www.gbif.org/), it is an international network and research infrastructure funded by the world’s governments, aimed at providing anyone, anywhere, open access to data about all types of life on Earth. GBIF is best known for the trove of species occurrences  ([over 1 billion](https://www.gbif.org/occurrence/search)!) it is making accessible from hundreds of publishing institutions, but it is doing the same for species information, such as names, classifications and known distributions.

Anyone can [publish species information](https://www.gbif.org/publishing-data) (called "checklist data"). When you do, GBIF will create a page for your dataset ([example](https://doi.org/10.15468/xvuzfh)), assign a DOI, and match[^1] your scientific names to its [backbone taxonomy](https://www.gbif.org/dataset/d7dddbf4-2cf0-4f39-9b2a-bb099caae36c), allowing your data to be linked, discoverable and integrated. Species pages on GBIF for example ([example](https://www.gbif.org/species/5851603)) are automatically build from the over [25.000](https://www.gbif.org/dataset/search?type=CHECKLIST) checklist datasets that have been published. All your checklist information also becomes available via the GBIF API ([example](https://api.gbif.org/v1/species/141117238)) and can be queried using the [rgbif](https://github.com/ropensci/rgbif) package.

[^1]: GBIF also provides this matching functionality via its [species lookup tool](https://www.gbif.org/tools/species-lookup), where you can check how names in your CSV file match the GBIF Backbone Taxonomy.

So, why isn't everyone publishing checklists? Because the data can only be reasonably integrated if they are published in a standardized way. All GBIF mediated-data (including occurrences) have to be published in the [Darwin Core](https://www.gbif.org/darwin-core) standard, fitting a standard structure (Darwin Core Archives), columns (Darwin Core terms) and sometimes values (controlled vocabularies), which can be challenging. [Templates](https://www.gbif.org/dataset-classes) and the [GBIF Integrated Publishing Toolkit](https://www.gbif.org/ipt) facilitates standardization or "mapping", but only caters for the most basic use cases. It also forces you to change the structure of your source data and involves many manual steps. To solve this, we created a recipe to facilitate and automate this process using R.

## The checklist recipe

Our **[Checklist recipe](https://github.com/trias-project/checklist-recipe/wiki)** is a **template GitHub repository for standardizing species checklist data to Darwin Core using R**. It contains all the ingredients to make your data standardization open, repeatable, customizable and documented. The recipe has considerably streamlined our own work to publish [seven checklists](https://www.gbif.org/dataset/search?type=CHECKLIST&project_id=trias) on alien species for Belgium, which is one of the goals of the Tracking Invasive Alien Species ([TrIAS](http://www.trias-project.be/)) project, an open data-driven framework to support Belgian federal policy on invasive species. We thought it would be useful to provide a well-documented workflow for others who want to publish this type of data.

The basic idea behind the Checklist recipe is:

> source data → Darwin Core mapping script → generated Darwin Core files

By changing the source data and/or the mapping script, you can alter the generated Darwin Core files. The main advantage is **repeatability**: once you have done the mapping, you don't have to start from scratch if your source data has been updated. You can just run the mapping script again (with a little tweak here and there) and upload the generated files to a GBIF Integrated Publishing Toolkit for publication. And by having a mapping script, your mapping is also **documented**.

Rather than explaining how you can use the Checklist recipe - [we've documented this in a wiki](https://github.com/trias-project/checklist-recipe/wiki/Getting-started) - we'd like to highlight some of the tools and techniques we discovered in developing it.

## Tools

### Cookiecutter data science

The recipe shares the **same repository structure** we use for all our data transformation repositories. We didn't invent one, but adopted [Cookiecutter Data Science](http://drivendata.github.io/cookiecutter-data-science/): a logical, reasonably standardized, but flexible project structure for doing and sharing data science work. The main advantage we think is that it allows anyone (and us) to easily find their way around a repository, making it easier to contribute. It also saves precious time setting up a repository, because there are less decisions (e.g. naming things) to be made.

Below is the directory structure we [adopted](https://github.com/trias-project/checklist-recipe) for checklist repositories: files and directories indicated with `GENERATED` should not be edited manually.

```
├── README.md              : Description of the repository
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
    ├── dwc_mapping.Rmd    : Darwin Core mapping script, core functionality of the repository
    ├── _site.yml          : Settings to build website in /docs
    └── index.Rmd          : Template for website homepage
```

### R Markdown

The core functionality of our recipe is an [R Markdown file](https://github.com/trias-project/checklist-recipe/wiki/R-Markdown) called [`dwc_mapping.Rmd`](https://github.com/trias-project/checklist-recipe/blob/master/src/dwc_mapping.Rmd) (i.e. the "mapping script"). If you are [not familiar with R Markdown](https://rmarkdown.rstudio.com/lesson-1.html), it is a file format that allows you to mix text (written in [Markdown](https://en.wikipedia.org/wiki/Markdown)) with executable code chunks (in R). It is comparable with an R script, in which the comments explaining the code are given as much value as the code itself. It has the advantage that you can describe _and_ then execute each step of your data processing in the same document, nudging you to better document what you are doing. This is called "[literate programming](https://en.wikipedia.org/wiki/Literate_programming)" and it is one of the steps to make research more reproducible.

You can simply run the code of an R Markdown file by opening it in R Studio and choosing `Run > Run all` (or code chunk by code chunk) or you can render as a report using `knit`. R Markdown supports a whole range of file formats for these reports (including `html` and `pdf`).

### R Markdown websites

If you are using R Markdown in a GitHub repository, you have all the ingredients to generate a small website showcasing your mapping steps in a visually pleasing way ([example](https://trias-project.github.io/alien-fishes-checklist/index.html)). And it can be hosted on GitHub for free! To learn more, read the [documentation on R Markdown websites](https://rmarkdown.rstudio.com/rmarkdown_websites.htm), but the setup is:

1. Create an [`index.Rmd`](https://github.com/trias-project/checklist-recipe/blob/master/src/index.Rmd) file at the same level as your other R Markdown files (in the `src` directory). That file will be the homepage of your website. Since we don't want to repeat ourselves, we [inject the content](https://github.com/trias-project/checklist-recipe/blob/master/src/index.Rmd#L7-L8) of the repository `README.md` in that homepage.
2. Create a [`_site.yml`](https://github.com/trias-project/checklist-recipe/blob/master/src/_site.yml) file at the same level as your `index.Rmd` file. It contains the settings for your website. Set at minimum a `name`, [`navbar`](https://github.com/trias-project/checklist-recipe/blob/master/src/_site.yml#L3-L7) and `output_dir: "../docs"` so the website is created in the `/docs` directory (which you need to create as well).
3. Go to `Build > Configure Build Tools…` in RStudio and set Project build tools as `Website` with Site directory as `src`. You will now have a build pane in R Studio where you can click `Build Website` to build your website.

This setup has already been done in our recipe.

To serve your website, commit and push your changes to GitHub, go to your repository settings and choose the `\docs ` directory to [build a GitHub pages site](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch). After a couple of seconds, your website should be available at `<username>.github.io/<reponame>/`. Don't forget to add it to your repo description so users can find it.

### here

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

### tidyverse

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

### rgbif

If you publish checklist data, you have to do with taxonomy. As we publish our checklists on GBIF, we have to do with the [GBIF Backbone Taxonomy](https://www.gbif.org/dataset/d7dddbf4-2cf0-4f39-9b2a-bb099caae36c), a single synthetic management classification with the goal of covering all names GBIF is dealing with. One of the main mapping steps is to _parse_ all input taxonomic names and get the right rank (is it a _species_? Or a _genus_? Or a _family_?) to them. To do it, GBIF developed the [name parser](https://www.gbif.org/tools/name-parser). Install the rOpenSci's package [rgbif](https://github.com/ropensci/rgbif) to use the name parser functionality without leaving your R session: rgbif interfaces you with GBIF API by using a collection of well named R functions. To parse names, you can just pass a vector of names to rgbif function `parsenames`. Here below we show you how we would do it if our names are in column `input_scientific_name` of data.frame `input_data`:

```r
parsed_names <- input_data %>%
  distinct(input_scientific_name) %>%
  pull() %>% # Create vector from dataframe
  parsenames() # An rgbif function
```

Note the use of pipes to concatenate functions in a very readable way.

The `nameparser()` provides also information about the rank of the taxon (in column `rankmarker`), a mandatory field for publishing checklists on GBIF, which sometimes misses in the original checklists. Checking the correctness of the parsing is part of the publisher's homework.

# Conclusion

We wrote this blogpost in order to share our experience in building a completely open, documented and working template for publishing biodiversity data. We are strongly convinced that the future of biodiversity is open. Co-winning the GBIF Ebbe-Nielsen Challenge gave us even more enthousiasm about. We think also that the time arrived to give back! We couldn't win anything without any of the open source tools we cited above (and many others: R is a free programming language after all!). For this reason we decided to devolve half of the price to [NumFocus](https://numfocus.org/), the organization sponsoring several open source projects sensibly improving the quality of science worldwide. Supporting open source research means supporting your own research after all!

You can contribute to open source in many other ways: based on your background and expertise you can report bugs, propose new functionalities or even being a contributor. The future you will be grateful for it!
