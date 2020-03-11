---
slug: unconf18_recap_2
title: 'Unconf18 projects 2: middlechild, defender, ropsec, keybase'
date: '2018-06-06'
author:
  - Karthik Ram
topicid: 1200
tags:
  - community
  - meetings
  - unconf
  - unconf18
  - security
---

As part of our series summarizing all projects from [this year's unconf](/blog/2018/06/05/unconf18/) I'm excited to dive into all the security related offerings from this year. (Full set of project recaps: [recap 1](/blog/2018/06/05/unconf_recap_1/), [recap 2](/blog/2018/06/06/unconf18_recap_2/), [recap 3](/blog/2018/06/07/unconf_recap_3/), [recap 4](/blog/2018/06/08/unconf_recap_4/).) In the spirit of exploration and experimentation at rOpenSci unconferences, these projects are not necessarily finished products or in scope for rOpenSci packages.

### `middlechild`

![middlechild logo](/img/blog-images/2018-06-06-unconf18_recap_2/middle_child_hex.png)

**Summary:** This package provides an R interface to the Man-in-the-middle (MITM) proxy and allows R users to intercept, modify, and introspect network traffic. The package provides functionality to download, install, configure and launch `mitmproxy`. In addition to helping test API packages and identify dangerous calls, R users can also route their browser traffic through a specific port and capture all network traffic in R.

**Team:** [Ildiko Czeller](https://github.com/czeildi), [Karthik Ram](https://github.com/karthik), [Bob Rudis](https://github.com/hrbrmstr), [Kara Woo](https://github.com/karawoo)   

**GitHub:** [https://github.com/ropenscilabs/middlechild](https://github.com/ropenscilabs/middlechild)

### `defender`

**Summary:** The `defender` package performs static analysis on R code and looks for potential security vulnerabilities. These can be done without installing the package and a more thorough (but somewhat dangerous) inspection is done inside of a docker container. The package doesn't necessarily tell users if a piece of code is harmful but flags anything that warrants closer examination.

**Team:** [Ildiko Czeller](https://github.com/czeildi), [Karthik Ram](https://github.com/karthik), [Bob Rudis](https://github.com/hrbrmstr), [Kara Woo](https://github.com/karawoo)


**GitHub:** https://github.com/ropenscilabs/defender

### `ropsec`

**Summary:** This package allows users to run a whole range of audit checks on their local system and generates a report on vulnerabilities and enabled protections.

**Team:** [Ildiko Czeller](https://github.com/czeildi), [Karthik Ram](https://github.com/karthik), [Bob Rudis](https://github.com/hrbrmstr), [Kara Woo](https://github.com/karawoo)

**GitHub:** https://github.com/ropenscilabs/ropsec


### `keybase`

**Summary:** This package provides a thin wrapper around the keybase API allowing users to call command line functions from R. In addition to allowing users to encrypt and decrypt files, the package allows new users to easily generate keys and sign their Github commits.

**Team:** [Ildiko Czeller](https://github.com/czeildi), [Karthik Ram](https://github.com/karthik), [Bob Rudis](https://github.com/hrbrmstr), [Kara Woo](https://github.com/karawoo)

**GitHub:**  https://github.com/ropenscilabs/keybase

Look for the next post featuring unconf18 projects tomorrow!
