---
slug: "dataspice"
title: Title to be decided
package_version: 0.0.0.9000
authors:
  - name: Carl Boettiger
    url: https://github.com/cboettig
  - name: Auriel Fournier
    url: https://github.com/aurielfournier
  - name: Kelly Hondula
    url: https://github.com/khondula
  - name: Anna Krystalli
    url: https://github.com/annakrystalli
  - name: Bryce Mecum
    url: https://github.com/amoeba
  - name: Maëlle Salmon
    url: https://github.com/maelle
  - name: Kate Webbink
    url: https://github.com/magpiedin
  - name: Kara Woo
    url: https://github.com/karawoo
date: 2018-06-27
categories: blog
topicid: 9999
tags:
- r
- software
- metadata
- eml
- schema-org
- jsonld
- xml
- github-pagesw
---

Content TBD.

potential title: Making minimum viable metadata

What does dataspice do? 

Why use Google's standard? 

How is this different than `emldown`?

How can you contribute?


From Auriel:

`dataspice` takes your raw data, and creates the spice on top of it, the metadata, which is so important for communicating with yourself in the future, as well as any others who may want to use your data. Creating metadata is often a hurdle to many data users/creators, and `dataspice` creates template metadata files based on a datafile input, and also has several shiny apps to help the user in populating those templates, which the package then turns into JSON, and if the user desires a simple website about the dataset. Our hope is to make creating metadata more accessible to everyone! 

From Kelly:

This was based on [Anna Krystalli's suggestion](https://github.com/ropensci/unconf18/issues/72) that there should be a way to create a minimal amount of useful metadata that both adheres to standards but is intuitively easy to use and widely applicable. Although creating metadata based on domain standards like [Ecological Metadata Language](https://knb.ecoinformatics.org/#external//emlparser/docs/index.html) undoubtedly adds a lot of value to datasets, such as supporting the search functionality of curated repositories, it requires some time investment to get familiar with the language and implement it successfully. 

We started looking into Google's specification of a [Dataset](https://developers.google.com/search/docs/data-types/dataset), which would be a lowest common denominator of metadata that could support search and discovery of datasets regardless of what they are about or what repository they end up in (if any!). Google adopts their definition from [schema.org](http://schema.org/Dataset) and recommends a minimal number of those properties that should describe a dataset, such as a title, description, keywords, variable measured, and spatial and temporal coverage. But because even Google doesn't have a bounded definition of what a dataset is, it seems like the only required detail is identifying the "@type" property as a dataset, and providing a name. So, at the minimum, our package would need to produce a [json-ld](https://json-ld.org/) file that looks something like this:

```
<script type="application/ld+json">
{
  "@context":"http://schema.org/",
  "@type":"Dataset",
  "name":"My dataset"
}
</script>
```

For a tabular dataset (e.g. `csv` or `tsv` files), some key elements of the metadata are human readable descriptions of what is in each column, and what units numeric data are in. For our framework, these translate to the dataset's [measured variable](http://pending.webschemas.org/variableMeasured) properties, which themselves can have properties of type (such as text or number), unit, and description.  

Although we couldn't automate the whole process, we wrote functions that create the metadata structure for a given set of data files. These templates are a few spreadsheets that can be filled in manually or with some helper functions or a Shiny app. 

Once the information is filled in, `dataspice` will slot it into a properly formatted json file, and then create a summary [webpage](https://amoeba.github.io/dataspice-example/) or [card](https://cboettig.github.io/dataspice-web/) about the "spiced" dataset. This information could also later be used to help automate the creation of more in-depth metadata like EML. 

Head over to our [GitHub repo](https://github.com/ropenscilabs/dataspice) for more details and to try it out! 

