---
slug: introducing-befdata
title: Introducing the BEFData package
date: '2013-05-10'
author:
  - Karthik Ram
tags:
  - R
  - packages
  - biodiversity
---

*This is a guest post by Class-Thido Pfaff*

We here present the [BEFdata R package](https://github.com/befdata/rbefdata) as part of the rOpenSci project. It is an API package that combines the strengths of the BEFdata portal in handling small, complex datasets with the powerful statics package R. The portal itself is free software as well and can be found [here]( https://github.com/befdata/befdata).

The BEFdata platforms support interdisciplinary data sharing and harmonisation of distributed research projects collaborating with each other. They upload, validate and store data from a formatted Excel workbook. Metadata can be downloaded in Ecological Metadata Language (EML) format. BEFdata allows the harmonization of naming conventions by generating category lists from the primary data, which can be reviewed and managed via the Excel workbook or directly on the platform. BEFdata provides a secure environment during on-going analysis; project members can only access primary data from other researchers after the acceptance of a data request
The combination allows for efficient storage, description and access of research data. The package leverages the access to datasets as well as to workflows in form of R scripts stored on the portal for provenance tracking of computed results.
