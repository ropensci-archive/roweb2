--- 
slug: onboarding-is-work
title: 'How much work is onboarding?'
authors:
  - name: Maëlle Salmon
    url: http://www.masalmon.eu/
  - name: Noam Ross
    url: http://twitter.com/noamross
date: 2018-05-02
preface: "This blog post is the second of a 3-post series about a data-driven overview of rOpenSci onboarding. Read the intro to the series [here](https://ropensci.org/blog/2018/04/26/satrday-ct-serie/) and the first post about data collection [here](https://ropensci.org/blog/2018/04/26/rectangling-onboarding/)."
categories: blog
topicid: 925
tags:
- r
- community
- software
- review
- onboarding
- cloc
output: 
  md_document:
    variant: markdown_github
    preserve_yaml: true
---

Our [onboarding process](https://github.com/ropensci/onboarding/), that
ensures that packages contributed by the community undergo a
transparent, constructive, non adversarial and open review process,
involves a lot of work from many actors: authors, reviewers and editors;
but *how much work*? Here is a try at quantifying this.

### Work done by authors

#### During review

We can try to quantify the development work of authors by looking at the
number of lines deleted and added in the git repo of the package before,
during, and after review. Here we therefore have to cross information
from the git repos (information about commits) and information from the
onboarding threads (when did the onboarding process took place). Here we
assume that the onboarding process happened from issue opening to
closing and do not take the labelling history of the onboarding issue
into account.

``` r
library("ggplot2")
library("magrittr")

commits <- readr::read_csv("output/gitsum_reports.csv")
issues <- readr::read_csv("data/clean_data.csv")
issues <- dplyr::group_by(issues, package) %>%
  dplyr::summarise(opened = min(created_at),
                   closed = max(closed_at))
commits <- dplyr::left_join(commits, issues, by = "package")

custom_transf <- function(x){
  pof <- log(x)
  pof[x == 0] <- 0
  pof
}

custom_exp <- function(x){
  pof <- exp(x)
  pof[x < 0] <- - exp(-x)
  pof
}


plot_commits <- function(package_name, commits){
  message(package_name)
  example <- dplyr::filter(commits, package == package_name, !is_merge)

  p <- ggplot(example)   +
    geom_segment(aes(x = datetime, xend = datetime,
                     y = 0, yend = custom_transf(total_insertions)),
                 col = "salmon", size = 1) +
    geom_segment(aes(x = datetime, xend = datetime,
                     y = 0, yend = - custom_transf(total_deletions)), 
                 col = "blue", size = 1) +
    ylab("lines") +
    annotate("segment", 
             x = min(example$datetime),
             xend = max(example$datetime),
             y = 0, yend = 0,
             col = "grey50",
             size = 0.2) +
    scale_y_continuous(breaks= seq(min(-custom_transf(example$total_deletions)),
                                   to = max(custom_transf(example$total_insertions)),
                                   by = 5), 
                       labels= round(custom_exp(seq(min(-custom_transf(example$total_deletions)),
                                         to = max(custom_transf(example$total_insertions)),
                                         by = 5))))+
    annotate("rect",
             xmin = example$opened[1], xmax = example$closed[1],
             ymin = - custom_transf(max(example$total_deletions)), 
             ymax = custom_transf(max(example$total_insertions)),
             fill = "grey80", alpha = 0.6,
             col = "grey10",
             size = 0.2) +
    ggtitle(package_name) +
    hrbrthemes::theme_ipsum() 
  print(p)
}
```

Let’s have a look at a few packages.

``` r
plot_commits("opencage", commits = commits)
```

![commits plot of the opencage
package](/img/blog-images/2018-05-02-onboarding-is-work/unnamed-chunk-2-1.png)

``` r
plot_commits("charlatan", commits = commits)
```

![commits plot of the charlatan
package](/img/blog-images/2018-05-02-onboarding-is-work/unnamed-chunk-3-1.png)

When looking at all onboarded repos, one sees that there’s no general
pattern. Commits have diffent sizes, and the activity frequency is
highly variable. In general some things happen during review as
reviewers’ comments are taken into account. Packages sometimes change
again after onboarding, because they’re not frozen and can get improved,
or well repaired if there was a new or undiscovered bug. Our work is
also to ensure a good level of quality after onboarding, which we
achieve because authors are dedicated maintainers, and because we
provide help where and when needed.

We do try to onboard mature packages, i.e. that are not *drafts*.
Furthermore, the absence of general patterns in the previous figures
could be due to different age at submission. How old are packages at
submission?

``` r
age <- commits %>%
  dplyr::group_by(package) %>%
  dplyr::summarise(age = difftime(min(opened), min(datetime), units = "weeks")) %>%
  dplyr::filter(age > 0)

library(hrbrthemes)
ggplot(age) +
  geom_dotplot(aes(age), binwidth = 5) +
  xlab("Age (weeks)") +
  scale_y_continuous(NULL, breaks = NULL) +
  hrbrthemes::theme_ipsum(base_size = 16,
                          axis_title_size = 16)
```

![age of packages at
submission](/img/blog-images/2018-05-02-onboarding-is-work/unnamed-chunk-4-1.png)

Here I show *apparent* age because the first commit might happen a long
time after the package was created, although often one makes an initial
commit not long after having started to work. I needed to filter
positive age because in one case the GitHub repo of the onboarded
package was apparently deleted and re-created without history after
approval. Such things happen, thankfully the package wasn’t lost, just
its history!

Many packages are submitted quite rapidly which might indicate rapid
development, but also maybe onboarding as a part of development,
i.e. authors knew they intended to submit. I know this of a few of my
own packages: I did my best developping e.g. `opencage` in a few days,
and then submitted it to get it ready for wider use by the community.

#### Before review

The work done by an author can also be characterized by two proxies: the
number of lines of code, and the number of exported functions and
classes. Obviously, this is far from perfect, since very short code can
reflect a lot of work. That said, a lot of code will represent a lot of
work for reviewers who’ll have to read it.

The number of lines of code can be obtained by Bob Rudis’ [`cloc`
package](https://github.com/hrbrmstr/cloc/), wrapper of the Perl CLOC
script.

``` r
get_cloc <- function(package_name){
  message(package_name)
  local_path_archive <- paste0(getwd(), "/repos/", package_name)
  if(length(fs::dir_ls(local_path_archive)) != 0){
    report <- cloc::cloc_git(local_path_archive) 
    report <- dplyr::rename(report, package = source)
    return(report)
  }else{
    return(NULL)
  }
}

packages <- fs::dir_ls("repos_at_submission") 
packages <- stringr::str_replace_all(packages, "repos_at_submission\\/", "")
purrr::map_df(packages, get_cloc) %>%
  readr::write_csv("output/cloc.csv")
```

The equivalent data for all CRAN packages was generously provided by
[Bob Rudis](https://rud.is/).

For getting NAMESPACE info, the following scripts was used. Note that
for both CLOC and NAMESPACE, the data was collected from the
repositories as they were *at submission*.

``` r
get_namespace <- function(package_name){
  message(package_name)
  local_path_archive <- paste0(getwd(), "/repos_at_submission/", package_name)
  if(length(fs::dir_ls(local_path_archive)) != 0){
    ns <- devtools::parse_ns_file(local_path_archive)
    tibble::tibble(package = package_name, 
                   exports = length(ns$exports) +
                     length(ns$exportClasses))
  }else{
    return(NULL)
  }
}

packages <- fs::dir_ls("repos_at_submission") 
packages <- stringr::str_replace_all(packages, "repos_at_submission\\/", "")
purrr::map_df(packages, get_namespace) %>%
  readr::write_csv("output/namespace.csv")
```

Let’s look at the number of lines of R code. Some of the onboarded
packages have C++ code or other languages, and there’s a huge diversity
of languages in CRAN packages, but for the sake of simplicity we’ll
limit ourselves to R code.

``` r
cloc_ro <- readr::read_csv("output/cloc.csv")
cloc_ro <- dplyr::mutate(cloc_ro, origin = "rOpenSci")
cloc <- readr::read_csv("data/cloc_cran.csv")
cloc <- cloc  %>%
  dplyr::filter(!source %in% cloc_ro$package) %>%
  dplyr::mutate(origin = "CRAN") %>%
  dplyr::filter(language %in% cloc_ro$language)

cloc <- dplyr::bind_rows(cloc, cloc_ro) 
cloc <- dplyr::filter(cloc, language == "R")
ggplot(cloc) +
  geom_density(aes(loc, fill = origin), alpha = 0.5) +
  scale_x_log10() +
  hrbrthemes::theme_ipsum(base_size = 16,
                          axis_title_size = 16) +
  viridis::scale_fill_viridis(discrete = TRUE)
```

![number of lines of code of ropensci and cran
packages](/img/blog-images/2018-05-02-onboarding-is-work/unnamed-chunk-5-1.png)

With this crude visualization one sees that size of onboarded packages
are comparable to size of packages on CRAN, with a few outliers.
`charlatan` is a big package!

Here is how the number of exported classes and functions look like.

``` r
namespace_ro <- readr::read_csv("output/namespace.csv")
load("data/namespace_cran.RData")

namespace <- dplyr::filter(namespace, 
                           !pkg %in% namespace_ro$package,
                           is.na(export_patterns))
namespace <- dplyr::group_by(namespace, pkg) %>%
  dplyr::summarise(exports = length(exports[[1]]) + length(export_classes[[1]])) %>%
  dplyr::mutate(origin = "CRAN") 

namespace_ro <- dplyr::mutate(namespace_ro, origin = "rOpenSci")

dplyr::bind_rows(namespace, namespace_ro) %>%
ggplot() +
  geom_density(aes(exports, fill = origin), alpha = 0.5) +
  scale_x_log10() +
  viridis::scale_fill_viridis(discrete = TRUE) +
  hrbrthemes::theme_ipsum(base_size = 16,
                          axis_title_size = 16) +
  xlab("No. of exported functions/classes")
```

![number of lines of exports of ropensci and cran
packages](/img/blog-images/2018-05-02-onboarding-is-work/unnamed-chunk-6-1.png)

In the future we might want to provide such metrics to potential
reviewers when recruiting them, because some of them might have time to
review [an abnormally big
package](https://ropensci.org/blog/2018/04/06/peer-review-value/) and
some others not.

### Work done by reviewers

The previous figures of lines of code and NAMESPACE exports give a good
idea of the size and complexity of the package authors have to review:
Reviewers more or less get to review the package as it was at submission
(minus editor remarks, and well the review of the first reviewer if the
second one reviews much later). Now, we also ask reviewers to tell us
how much time they spent reviewing, not to judge anyone, but to get a
sense of the involvement we asked. We also use this information when
recruiting reviewers, generally saying that reviewing a package is “as
long as reviewing a scientific paper”, a couple of hours.

``` r
# airtable data
# this is our private database of who's reviewed what
# and of reviewers' areas of expertise
airtable <- airtabler::airtable("appZIB8hgtvjoV99D", "Reviews")
airtable <- airtable$Reviews$select_all()
```

Out of 184 we now have reviewing time for 136.

``` r
ggplot(airtable) +
  geom_boxplot(aes(y = review_hours, x = "")) +
  hrbrthemes::theme_ipsum(base_size = 16,
                          axis_title_size = 16) +
  theme(axis.title.x=element_blank()) +
  ylab("Reviewing time (hours)")
```

![hours spent
reviewing](/img/blog-images/2018-05-02-onboarding-is-work/unnamed-chunk-8-1.png)

In case you wonder, what’s in it for reviewers? They do it out of
personal interest for scientific software, to learn more about package
development, to discover a package, and maybe because they feel grateful
for reviews of their own software. You can read personal perspectives of
reviewers on our blog: [one by Mara
Averick](https://ropensci.org/blog/2017/08/22/first-package-review/),
[one by Verena
Haunschmid](https://ropensci.org/blog/2017/09/08/first-review-experiences/),
[one by Charles T.
Gray](https://ropensci.org/blog/2018/03/13/ode-to-testing/) and [one by
Miles McBain](https://ropensci.org/blog/2018/04/06/peer-review-value/).
Some reviewers end up being listed as reviewers in the package list of
authors as explained [in this insightful and entertaining post by editor
Noam
Ross](https://ropensci.org/blog/2018/03/16/thanking-reviewers-in-metadata/).

#### Is the size of the package related to its review time

``` r
namespace_ro <- dplyr::left_join(namespace_ro, airtable, by = "package")
ggplot(namespace_ro) +
  geom_point(aes(exports, review_hours))
```

![](/img/blog-images/2018-05-02-onboarding-is-work/scatterplot-size-vs-reviewing-time-1.png)

I’d have been surprised to see a link here anyway!

#### Work done by editors

Editors perform a few checks before seeking reviewers, and then
generally supervise the process. In [Tim Trice’s
words](https://ropensci.org/blog/2017/09/27/rrricanes/), we are “guiding
angels from start to finish during the entire onboarding and review
process”.

Noam Ross recently wrote this piece of code giving a more quantitative
insight into work done by editors.

``` r
library(tidyverse)
library(gh)
library(lubridate)

issues <- gh("/repos/ropensci/onboarding/issues?state=all&labels=package", .limit=1000)

edits = map_df(issues,
~data_frame(url = .$html_url,
editor = .$assignee$login %||% NA_character_,
opened = as.Date(.$created_at))) %>%
filter(!is.na(editor)) %>%
mutate(quarter = paste(year(opened), quarter(opened), sep="Q"),
half =  paste(year(opened), if_else(quarter(opened) <= 2, 1, 2), sep="H"),
year = year(opened))

edits %>%
group_by(editor, half) %>%
summarize(n_assigned = n()) %>%
{ full_join(., crossing(editor = unique(.$editor),  #can't get expand() to work.
half = unique(.$half))) } %>%
mutate(n_assigned = coalesce(n_assigned, 0L)) %>%
ggplot(aes(x=half, y=n_assigned, fill=editor)) +
geom_col(position="dodge") +
geom_hline(yintercept = c(3, 6)) +
xlab("Half / Year") + ylab("No. Issues Handled")+
    hrbrthemes::theme_ipsum() +
  theme(legend.position = "bottom") +
  viridis::scale_fill_viridis(discrete = TRUE)
```

![number of assignments per editor per half a
year](/img/blog-images/2018-05-02-onboarding-is-work/unnamed-chunk-9-1.png)

### Outlook: decreasing work by automation

As mentioned [in this blog post about the authors and reviewers
survey](https://ropensci.org/blog/2018/04/17/author-survey/), we’re in
the process of trying to maximize automation of all than can be
automated in order to reduce and simplify work for everyone involved.
This way, humans can focus on what they’re best at. Our current
automation efforts include two packages in development: one for package
authors, [`rodev`](https://github.com/ropenscilabs/rodev), and one for
package
reviewers,[`pkgreviewr`](https://github.com/ropenscilabs/pkgreviewr), by
[Anna Krystalli](http://www.annakrystalli.com/); efforts to run
`goodpractice::gp` automatically without local install. Exciting times!

If you liked this data exploration, stay tuned for the third and final
post of this series, about the social weather of onboarding as
characterized by a tidy text analysis of onboarding threads!
