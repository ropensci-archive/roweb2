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
but *how much work*? Managing the effort involved in the peer-review process is a major part of ensuring its sustainability and quality.  In this post, we'll take a look the effort put in by participants in the review process, and also learn something about exploring GitHub data along the way.

### Work done by authors

#### During review

We can try to quantify the development work of authors by looking at the
number of lines deleted and added in the git repo of the package before,
during, and after review. To do so, we link information
from the package git repos (information about sizes and dates of commits) and information from the
onboarding issue threads (start and end dates of the review process, as measured by open/close dates). 

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

When looking at all onboarded repos, we don't see a general
pattern to commit histories. Commits have diffent sizes, and the activity frequency is
highly variable. While we see the updates to packages that occur during review, there is just as often change
again after onboarding, as packages continue to improve and be maintained.  This highlights an important aspect of our peer review, which is that _acceptance is not the end of the process_.  While we aim for the process to ensure high quality at acceptance, packages are not static moving forwards.  Not all deficiencies are detected by peer reviewers, and further improvements and maintanance will continue.  This is why many of our standards are about maintainability, and our process is in part an approach to onboard _authors_ into a community of dedicated and supportive package maintainers.

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

This shows *apparent* age because the first commit might happen a long
time after the package was created, although often one makes an initial
commit not long after having started to work. I needed to filter
positive age because in one case the GitHub repo of the onboarded
package was apparently deleted and re-created without history after
approval. Such things happen, thankfully the package wasn’t lost, just
its history!

Many packages are submitted quite rapidly which might indicate rapid
development, but also maybe onboarding as a part of development,
i.e. authors knew they intended to submit. For instance, Maëlle's developed `opencage` in just a few days, then submitted it to get it ready for wider use by the community.

#### Before review

The work done by an author can also be characterized by two proxies: the
number of lines of code, and the number of exported functions and
classes. Obviously, this is far from perfect, since very short code can
reflect a lot of work. That said, a lot of code will represent a lot of
work for reviewers who will have to read it.

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

How much effort is put in by reviewers in this process?  Reviewer time and effort is one of our most previous resources (you can read more about reviewer motivations and perspectives in other blog posts by [Mara Averick](https://ropensci.org/blog/2017/08/22/first-package-review/),
[Verena
Haunschmid](https://ropensci.org/blog/2017/09/08/first-review-experiences/),
[Charles T.
Gray](https://ropensci.org/blog/2018/03/13/ode-to-testing/) and [
Miles McBain](https://ropensci.org/blog/2018/04/06/peer-review-value/).  We this effort by asking reviewers to self-report the hours spent reviewing. We do so to understand the amount of effort we are asking reviewers for, so we can let new reviewers know what to expect, and so hopefully in the future we can measure the success of efforts to automate some reviewer tasks. 

``` r
# airtable data
# this is our private database of who's reviewed what
# and of reviewers' areas of expertise
airtable <- airtabler::airtable("appZIB8hgtvjoV99D", "Reviews")
airtable <- airtable$Reviews$select_all()
```

We have self-reported reviewing times for 136 of 184 reviews.

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

As we found before, it appears to take our reviewers a similar amount of time to review R packages as [scientists take to review a manuscript (5 hour median and 9 hour mean)](http://publishingresearchconsortium.com/index.php/112-prc-projects/research-reports/peer-review-in-scholarly-journals-research-report/142-peer-review-in-scholarly-journals-perspective-of-the-scholarly-community-an-international-study).  

One potential question is whether reviewer time is affected by the size of the package reviewed.  The previous figures of lines of code and NAMESPACE exports give a good idea of the size and complexity of the package authors have to review. Interestingly, we find no relationship between the two:

``` r
namespace_ro <- dplyr::left_join(namespace_ro, airtable, by = "package")
ggplot(namespace_ro) +
  geom_point(aes(exports, review_hours))
```

![](/img/blog-images/2018-05-02-onboarding-is-work/scatterplot-size-vs-reviewing-time-1.png)

There are a few potential explanations to this that might be fruitful to explore.  For instance, does this mean that there's only so much time, and so larger packages get less scrutiny per line of code?  Or does review time just depend more on the reviewer than the package?  

#### Work done by editors

Editors manage the review process, performing initial pacakge checks, identifying and contacting reviewers, and then
moderating the cajoling the process forward.  Our best measure for editor effort is the number of packages handled by an editor in a given time frame, which we can track from the assignments on GitHub issues since the start of onboarding.  Looking at this over time, we can see how editor workloads changed in response to growing number of assignments and how we have attempted to manage this by expanding our editorial board:

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
[Anna Krystalli](http://www.annakrystalli.com/).  We also are working on
automating most of checks that use `goodpractice::gp` so they are run on CI infrastructure automatically on submission, rather than requiring editors to do so locally.

If you liked this data exploration, stay tuned for the third and final
post of this series, about the social weather of onboarding as
characterized by a tidy text analysis of onboarding threads!
