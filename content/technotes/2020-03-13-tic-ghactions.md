---
slug: "tic-ghactions"
title: Supercharge your GitHub Actions Experience with tic
# Delete the package_version line below if your post is not about a package
package_version: 0.5.0
author:
  - Patrick Schratz
# Set the date below to the publication date of your post
date: 2020-03-13
# Set categories to technotes if this is a tech note
categories: technotes
# Leave topicid blank below; will be set by editor
topicid:
# Minimal tags for a post about a community-contributed package 
# that has passed software peer review are listed below
# Consult the Technical Guidelines for information on choosing other tags
tags:
  - R
  - GitHub
  - GitHub Actions
  - Continuous Integration
  - software-peer-review
  - tic
  - community
# The summary below will be used by e.g. Twitter cards
description: "tic simplifies CI tasks for R projects and now provides supercharged support for GitHub Actions. By enhancing the good work of [r-lib/actions](https://github.com/r-lib/actions) tic provides a DSL for R for CI tasks."
---

["Continuous Integration"](https://en.wikipedia.org/wiki/Continuous_integration) (CI) has become a standard for proper software development.
Checking the integrity of software after changes have been made is essential to ensure its proper functionality.
Also, CI helps catch problems introduced by dependencies early when executed on a regular basis (usually done via scheduled [CRON](https://tecadmin.net/crontab-in-linux-with-20-examples-of-cron-schedule/) runs).

Multiple professional providers exist ([Travis CI](https://travis-ci.com/), [AppVeyor CI](https://www.appveyor.com/), [Circle CI](https://circleci.com/), etc.) which offer CI services to the public.
Most services offer limited free build contingents for open-source projects.
However, it has not been easy for the R community to jump on the train right away as most providers did not support the R language natively on their side.
Therefore, the R community started to create their own configurations to quickly automate the checking of R packages on [Travis CI](https://travis-ci.com/).
In fact, the first commit of the official `r.rb` build script was made on [Feb 1st 2015 by Craig Citro](https://github.com/travis-ci/travis-build/commit/c697bb2240cfc1abb92a95f57d2e72c151104431).
Since then 21 unique contributors have maintained this configuration under the meta-lead of [Jim Hester](https://github.com/jimhester) and [Jeroen Ooms](https://github.com/jeroen) which allowed many thousands of R package maintainers to jump onto the train.

However, [Travis CI](https://travis-ci.com/) has its limits and therefore people started to try out other providers such as [Appveyor CI](https://www.appveyor.com/) or [Circle CI](https://circleci.com/).
Besides having to start from scratch, all providers come with their own YAML keys and ways to set up deployment permissions.

With the aim to simplify these processes for users, the [tic](https://github.com/ropensci/tic) package was created.
It aims (among others goals) to provide a CI-agnostic way to check R packages.
Besides packages tic also simplifies the creation of blogs, websites, [drat](https://github.com/eddelbuettel/drat) repositories and other things related to CI activities.
Overall tic provides a domain-specific language (DSL) for CI stages/steps.

By providing CI YAML templates which forward their actions to a centralized R script (`tic.R`), the same setup will trigger identical actions on different CI systems.
The user does not need to worry about setting up the YAML file for a specific provider but just get familiarized with the "macro" approach of tic.
[tic macros](https://docs.ropensci.org/tic/articles/tic.html#macros) are sequences of steps for popular actions often requested by people in the R community for R related projects.

Furthermore, tic aims to simplify the tedious process of setting up deployment permissions for a repo ("deployment" means that a CI run is allowed to perform a `git` push to the repository.)
This is achieved by its helper packages such as circle, ghactions or travis which perform API calls to the respective CI providers.

### GitHub Actions - the new kid on the block

GitHub Actions (beta) have been around for about one year.
The official release happened in [November 2019](https://siliconangle.com/2019/11/13/github-universe-announcements-bring-bevy-updates-developers/).
The hype after the launch was huge: People expect properly developed products from GitHub and having an integrated CI solution without the overhead of connecting to a third party provider sounded promising.

Indeed, GitHub Actions fulfilled this promise. It is way easier to get started with CI now: 

- No extra account needs to be created for a third-party service
- No restrictions on the available build platforms
- No issues related to webhooks of third-party providers
- CI settings configurable via the repository settings

However, R was again not among the languages with native support/examples, so it was not easy to get started.
After a first shot from [Max Held](https://github.com/maxheld83) via the [ghactions](https://github.com/maxheld83/ghactions) package, [Jim Hester](https://github.com/jimhester) sat down again and created the [setup-r](https://github.com/r-lib/actions/tree/master/setup-r) action which installs R on all available platforms with the option to specify different R versions.

While the setup-r GitHub action is already usable, it's still in its early days and will mature over time.
In tic we use [r-lib/setup-r](https://github.com/r-lib/actions/tree/master/setup-r) as the base combined with [r-lib/setup-pandoc](https://github.com/r-lib/actions/tree/master/setup-pandoc) and [r-lib/setup-tinytex](https://github.com/r-lib/actions/tree/master/setup-tinytex).
We apply some opinionated changes on top, which we think enhance the CI setup substantially.
In the following sections we explain these changes to be as transparent as possible.

#### Caching

When testing a package, by default [r-lib/actions](https://github.com/r-lib/actions) caches only **direct dependencies** and only on a **successful run**.
This is done via action [actions/cache](https://github.com/actions/cache) by hashing a list of all package dependencies:

```yaml
- name: Query dependencies
  run: |
    install.packages('remotes')
    saveRDS(remotes::dev_package_deps(dependencies = TRUE), "depends.Rds", version = 2)
  shell: Rscript {0}

- name: Cache R packages
  if: runner.os != 'Windows'
  uses: actions/cache@v1
  with:
    path: ${{ env.R_LIBS_USER }}
    key: ${{ runner.os }}-r-${{ matrix.config.r }}-${{ hashFiles('depends.Rds') }}
    restore-keys: ${{ runner.os }}-r-${{ matrix.config.r }}-
```

tic instead caches **the complete R library** of the run **on every run** by using a forked version of [actions/cache](https://github.com/actions/cache): [pat-s/always-upload-cache](https://github.com/pat-s/always-upload-cache).

These differences have the advantage that packages which are needed for side-effects (like building a pkgdown site or running codecov) are cached too.
Because caches are immutable, tic (needs to) rebuilds the cache **daily**.
If this didn't happen, every runner would otherwise always use the first cache forever.
When packages are updated on CRAN, tic would download the cache first but then update those before proceeding to the "script" stage.
After some time all packages from the cache would be outdated, making the cache useless.
Hence, tic rebuilds the cache daily.
Users can change this time frequency to their liking by altering the bash code that is used to generate the timestamps (within the `run` line of the following code block):

```yaml
- name: "[Cache] Prepare daily timestamp for cache"
  if: runner.os != 'Windows'
  id: date
  run: echo "::set-output name=date::$(date '+%d-%m')"

- name: "[Cache] Prepare weekly timestamp for cache"
  if: runner.os != 'Windows'
  id: datew
  run: echo "::set-output name=datew::$(date '+%Y-%V')"
```

The cache rebuilding happens in a scheduled CRON run daily at 3 am in the morning.
Because tic always uploads the cache even if the build failed ([r-lib/actions](https://github.com/r-lib/actions) only uploads on a successful build), there will always be a cache available for builds which start during the day[^1].
So even if the build of a repository takes several minutes to install all dependencies, the first commit being made every day will always make use of an existing cache.

#### Installation of dependencies

tic uses `ccache` on macOS and Linux to speed up R package installations.
This tool helps speeding up the installation of compiled packages by loading the C code parts from the cache.
tic rebuilds the `ccache` only **once a week** making it possible that the CRON builds in the morning can make use of the `ccache` builds when rebuilding the R package cache.

#### macOS compiler toolchain

macOS is a complicated platform for R.
CRAN does use a custom compiler for creating the binaries for this platform.
One reason is that the default `/usr/bin/clang` does not support `openMP`.
For the current R 3.6.x release a custom version of `clang7` is used while for R 4.x `clang8` will be used.
tic reflects exactly this setting on the macOS-release and macOS-devel runners, eliminating lots of issues when compiling packages from source and giving you the security to have the CRAN setup mirrored in your builds.

#### Additional tweaks

- tic always runs `R CMD javareconf` to ensure a working installation of rJava.
- tic uses four cores for installing dependencies instead of just running sequentially.
- tic sets the env var `RGL_USE_NULL` to make it possible to install the rgl package if needed.
- tic installs all packages from source on Linux instead of using the R package binaries provided by RStudio.
  This is to mimic the normal behavior on Linux and ensure a proper linking against system libraries.
    
### Getting started

If you are triggered now to try out tic and GitHub Actions, here is how to get started (alternatively you can also run `tic::use_tic()` to start an interactive wizard which will guide you through the setup process):


```r
library("tic")

use_ghactions_deploy() # (optional) setup deployment from builds
use_ghactions_yml() # use deploy = TRUE to deploy from builds
use_tic_r(repo_type = "package", deploy_on = "ghactions") # add tic.R
use_tic_badge("ghactions") # (optional) add a badge to README.md/README.Rmd
```

After that, commit `.github/workflows/main.yml` and `tic.R` and have a look at the "Actions" pane in the GitHub repository.
For a full example of the resulting YAML file you can have a look at our example repository for packages [tic.package](https://github.com/ropenscilabs/tic.package/blob/25fe68d3d874a671e8a1350dfd47789d7dd19105/.github/workflows/main.yml).

### Summary

tic aims to simplify CI related tasks for various R projects and now provides supercharged support for GitHub Actions.
By enhancing the good work of [r-lib/actions](https://github.com/r-lib/actions) tic provides a DSL for R for CI tasks.

tic currently differs to [r-lib/actions](https://github.com/r-lib/actions) in the way caching is done, which compiler toolchain is used for the macOS runners, how package/project dependencies are installed and how deployment is done.
Things might change in the future and possibly align more closely.
However, since both projects have different goals and are developed asynchronously, there is no guarantee for this.
You can see tic as a supercharged version of [r-lib/actions](https://github.com/r-lib/actions).

If you encounter problems, please have a look at the vignettes of tic, especially the ["FAQ"](https://docs.ropensci.org/tic/articles/faq.html).
You can also open an issue in the repo if something does not work as planned.
tic will keep improving the existing templates and its internal functionality[^2].

We have plans to add an update mechanism in the future to simplify staying up-to-date with the latest template changes upstream - stay tuned!

### Acknowledgments

We would like to thank the following people for their valuable input during the [review process](https://github.com/ropensci/software-review/issues/305):

- [Anna Krystalli](/author/anna-krystalli/) (editor)
- [Laura DeCicco](/author/laura-decicco/) (reviewer)
- [Max Held](https://www.maxheld.de/) (reviewer)

[^1]: At the time of writing this post, CRON events ("scheduled") are not supported by the caching actions. This means that R packages installed during the nightly CRON build will not be cached and need to be installed again during the first real push of the day. This is not an issue of tic and there is nothing we can do but wait until this is supported. We will inform you in the [tic changelog](https://docs.ropensci.org/tic/news/index.html#tic-0509001) once this feature is supported. See [this issue](https://github.com/actions/cache/issues/63) for more information.
[^2]: Since [tic](https://github.com/ropensci/tic) is not on CRAN yet, you have to watch the development on GitHub for now to stay up-to-date. All important changes can be found in the ["Changelog"](https://docs.ropensci.org/tic/news/index.html) section of the pkgdown site. Alternatively you can follow the [Github releases](https://github.com/ropensci/tic/releases).
