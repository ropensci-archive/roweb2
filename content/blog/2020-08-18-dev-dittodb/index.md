---
slug: "dev-dittodb"
title: Developing dittodb
package_version: 0.1.1
author:
  - Jonathan Keane
date: 2020-08-18
tags:
  - Software Peer Review
  - packages
  - R
  - community
  - testing
  - databases
  - SQL
  - dittodb
description: "A peak behind the scenes of making dittodb"
# twitterImg: blog/2019/06/04/post-template/name-of-image.png
---

This post describes a few different aspects behind the scenes of the development of [dittodb](https://dittodb.jonkeane.com) which [recently went through](https://github.com/ropensci/software-review/issues/366) the [rOpenSci peer review process](/software-review/) and was [released to CRAN on 24 July 2020](https://jonkeane.com/blog/introducing_dittodb/).
This isn't an introduction to the package itself (that's [available on dittodb's site](https://dittodb.jonkeane.com)), but rather a look behind the scenes of the conceiving of the idea, the inspiration for, some of the development of, and history behind dittodb.

### The idea

The idea for dittodb came as a very practical one: at my day job I was working on an R package that interacted with our databases.
Though we could test a lot of things, we were struggling with writing good tests for our database interactions.
We could technically connect to the actual production database, but that meant that the tests were slow and depended on data that was sometimes changing[^3].
Worst of all: it would mean having to store our database credentials in our [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration) infrastructure.

I had gotten used to using mocked HTTP interfaces with other testing packages (see the section below about how httptest inspired dittodb) and since a database connection is very similar (one sends queries and gets different responses based on those queries) I thought surely someone has already written up an R package for mocking database connections.[^4] There's even [a standard interface](https://CRAN.R-project.org/package=DBI) that most database packages use for these interactions!

After a lot of googling and finding nothing, I came to the rOpenSci slack and asked: has anyone seen anything like this? And to my shock, the answer was no.
That's when I started chatting with [Mauricio Vargas](https://pacha.dev) about what would become dittodb.

### How dittodb was inspired by httptest

At a previous job, I had the opportunity to work with [Neal Richardson](https://enpiar.com/), the author of [httptest](https://enpiar.com/r/httptest/) and we made extensive use of mocked HTTP interactions while developing the [Crunch.io R package](https://github.com/crunch-io/rcrunch).
So I had a lot of experience with the patterns of how httptest worked and I [even contributed a small pull request](https://github.com/nealrichardson/httptest/pull/25).
Knowing that the overall flow of the package would be similar gave me a really nice framework to build out dittodb[^5].

Like testing against a mocked HTTP interface, testing a database connection has two main parts: 

* there's the request for HTTP or the query for database connections — this specifies what is being requested of the external API or database.
For both, there are a number of different actions that return different results.
For example, a `GET` in HTTP land is designed for retrieving some information, an SQL statement that starts with `SELECT` in database land will return a result that has data of some sort in it.
* there's the response for HTTP or the result for database connections — this is the result of whatever the request/query was above.
For HTTP interfaces this is frequently a chunk of JSON (alongside some HTTP status codes and other information).
With databases the result is frequently a dataframe (especially for `SEELCT` queries), but can also be lists of information (e.g. `list(completed = 1L)` after checking the status of a query).

The database package (e.g. [RPostgres](https://rpostgres.r-dbi.org) or [RMariaDB](https://rmariadb.r-dbi.org)) is responsible for taking your query, and using a database driver (which almost always use C or C++ based libraries) send the query, get the response from the database, and then transforming that response into an R-native data type (e.g. a dataframe).
To be successful, when it is operating as a mock database, dittodb must be able to match a specific query to a result that is saved to disk (aka a fixture) and return that instead of executing against an actual database.
We do this by hashing the query that is sent with `dbSendQuery()` and then we use that hash to look for the fixture file and read that fixture in when there is a call `dbFetch()`.

To make this a concrete example, say you ran the following query while dittodb was mocking the connection[^7]:

```r
result <- dbSendQuery(
  con,
  "SELECT carrier, name FROM airlines LIMIT 1"
)
```

Under the hood, dittodb takes the select statement, and hashes the query (to `ef6317`) and returns a result object that will look for the file `SELECT-ef6317.R`.
Then when we fetch the result:

```r
result_df <- dbFetch(result)
```
dittodb looks for the file with the file name `SELECT-ef6317.R` in each of the [mock path directories that have been configured](https://dittodb.jonkeane.com/reference/mockPaths.html).
If it finds one, it will source that file and use that as the result of the fetch.
This process is very similar to how httptest works and is one of the main pieces of inspiration that httptest had in the creation of dittodb.

### Main technical challenges

The development process of dittodb had a number of interesting challenges.
Two that I will expand on here are our use of method dispatch and class inheritance to make dittodb work as well as use of the `trace` function for recording fixtures.

#### Using method dispatch for good

R is famous for having not [one](https://adv-r.hadley.nz/s3.html), not [two](https://adv-r.hadley.nz/s4.html), not [three](http://adv-r.had.co.nz/R5.html) but [four](https://adv-r.hadley.nz/r6.html) object orientation systems.[^10] The DBI package uses [S4](https://adv-r.hadley.nz/s4.html) classes extensively.
One thing that sets S4 apart from S3 is that S4 allows for formal class inheritance.
Though a full description of inheritance is out of scope for this post, the most important point for us is that S4 can inherit methods from their parent classes.
To borrow the inheritance metaphor from [Advanced R](https://adv-r.hadley.nz/s4.html#s4-dispatch):

Say we have a class 🙂 which inherits from class 😶.
If we write a method `mouth_shape()` for objects of theses classes, we could define one method for each class, so for the 🙂 class which returns the value "smiling" when we call `mouth_shape(🙂)` and then we could define the same method for class 😶 which returns the value `NULL` when we call `mouth_shape(😶)` (since there is no mouth).
But when we go to to define our method `eyes()` we don't actually have to define a method for both of the classes, since 🙂 inherits from 😶, we could define the method for 😶 only to return "open" when we call `eyes(😶)`.
And now, when we call `eyes(🙂)` we will get the value "open" even though we did not explicitly write an `eyes()` method for the 🙂 class.
Note that inheritance is directional and we couldn't do this the other way around: if we only defined an `eyes()` method for 🙂, we would not automatically get the same behavior for `eyes(😶)`.
And if we _did_ want slightly different behavior for these methods, we can always define an `eyes()` method for the 🙂 class later.

##### How this works in dittodb

dittodb makes extensive use of inheritance to serve a mocked database interface during testing: When dittodb is mocking a database connection in testing, instead of a pure connection class `DBIConnection`, we use a custom class `DBIMockConnection` which inherits from `DBIConnection`.
This means that we can define custom methods for our `DBIMockConnection` that don't actually connect to a database, but use our mocked functionality instead.
For example, we defined a `dbSendQuery` method for the class `DBIMockConnection` that instead of sending a query, it hashes the query so we know where to look it up when we call `dbFetch` and returns a result of class `DBIMockResult`[^6].
And then we defined a `dbFetch` method for the class `DBIMockResult` which takes the hash, looks for a file in a fixtures directory with that hash and loads it in, returning that as the fetched results.

Inheritance means that we only have to write custom methods for our `DBIMock*` classes if the underlying DBI methods call the database.
For example, DBI provides a very commonly used method `dbGetQuery()` which is used to send a query and then fetch the results all at once instead of forcing people to make two calls.
But, because the [DBI definition](https://github.com/r-dbi/DBI/blob/500edd33712f1e982b258fb1cba071f9473da12c/R/DBConnection.R#L279-L286) for `dbGetQuery()` calls `dbSendQuery()` and then `dbFetch()` we don't have to write a custom method for dittodb, we can rely on method dispatch and inheritance to do the right thing™️ for us.
Easy as 🎂.[^8]

#### Using trace in a relatively unorthodox way

Custom classes and inheritance is really great, but what about when we want to interact with a real database and save the results to disk to use later as fixtures? Though many fixtures (especially those that are replicating errant behavior) are best crafted (or edited) by hand so that they are targeted and exercise precise things during tests, it can be convenient to be able to record all of the interactions with a database (especially for hand editing).

We provide functionality to do this with the commands [`capture_db_requests({...})`](https://dittodb.jonkeane.com/reference/capture_requests.html) which captures the requests made from any expressions wrapped inside, or [`start_db_capturing()` and  `stop_db_capturing()`](https://dittodb.jonkeane.com/reference/capture_requests.html).
For these to work, we wanted to be able to call the standard, native database methods, but at the ends of some of them _also_ execute code to save the fixture objects to disk.
We could have used custom classes or mocking like we did above, but that would have required a considerable amount of copying code from other sources to replicate it (and keep it in sync as those packages changed!).
Instead, we used [`trace()` which is designed for interactive debugging of calls](https://stat.ethz.ch/R-manual/R-devel/library/base/html/trace.html), but critically for our purposes, it allows us to insert little bits of code to be executed when the function is called (typically at the beginning or at the end).

Here is a (simplified)[^9] example of what the tracing call looks like when you turn on capturing mode:

```r
  trace(
    "dbSendQuery",
    exit = quote({
      .dittodb_env$curr_file_path <- make_path(
        .dittodb_env$db_path,
        get_type(statement),
        hash(statement)
      )
    })
  )
```

What this does is it executes the code inside of the `quote({...})` wrapper whenever `dbSendQuery()` exits it's call.
But critically, with the same environment as inside of `dbSendQuery()`.
So we have access to the `statement` variable that `dbSendQuery()` did so that we can hash it.
We then save that file path (the statement type, the hash, as well as the current connection's own path within our mock directories) to a status placeholder (`.dittodb_env$curr_file_path`) so that we can use that when there is a call to `dbFetch()` to save the result to the right file.

Using `trace` in this way was also inspired by httptest which uses it in a similar way.
It is certainly a little bit unorthodox, but it works for what we needed to accomplish in dittodb.
It lets us capture fixtures with as little custom code as possible, while still working on any database connection that uses DBI.

### What's in a name?

As [the saying goes](https://martinfowler.com/bliki/TwoHardThings.html), naming things is one of the hardest parts of software development.
When we first started working on dittodb we called it dbtest.
This fit nicely because, as we talked about above, dittodb took a lot of inspiration from httptest, so why not just swap out the bit that was being tested `http` > `db`.
It was simple and descriptive.[^1] But there was just one problem, there was [already a package with the same name](https://github.com/rstudio/dbtest)[^2].
Though it wasn't on CRAN, we still didn't want to cause confusion.
So we set out to think up a different name.
[Mauricio Vargas](https://pacha.dev) had the great idea to name it dittodb.

{{< figure src = "132.png" width = "150" alt = "An illustration of the Pokemon Ditto" caption = "Ditto ©Pokémon" class = "pull-right" >}}

The name dittodb takes inspiration from a few sources: The first, and most obvious for developers of a certain age, is the [ditto pokemon](https://www.pokemon.com/us/pokedex/ditto) known for its ability to take on the form of, and impersonate, any other pokemon.
Following this, dittodb takes on the form and properties of a database backend, without actually being that database backend.
For a different set of (likely non-overlapping with the first) developers dittodb will recall the [spirit duplicators](https://en.wikipedia.org/wiki/Spirit_duplicator) used to make duplication of printed materials by making an artifact during the writing process that can be used to make further copies.
In some areas these machines were frequently called ditto-machines.
dittodb is similar when it is recording fixtures: during the process of interacting with a live database, it makes copies of the responses that can be used ~~to make further copies~~ while running tests as fixtures.

### Resources

* You can install dittodb with `install.packages("dittodb")` and for more information, see [the documentation for more information](https://dittodb.jonkeane.com).
* If you want to get started using dittodb, see the [getting started vignette](https://dittodb.jonkeane.com/articles/dittodb.html)
* We are very eager to receive [any bug reports, feature requests, or any other feedback](https://github.com/ropensci/dittodb/issues) on dittodb

### Acknowledgements

dittodb wouldn't have been possible without the help of a bunch of folks: 

* contributions from [Mauricio Vargas](https://pacha.dev)
* thoughtful reviews and comments from Helen Miller and Etienne B. Racine
* [Anna Krystalli](https://twitter.com/annakrystalli) for being our editor and [rOpenSci](https://ropensci.org) for facilitating the package review
* as well as [Neal Richardson’s httptest]{https://enpiar.com/r/httptest/index.html} for inspiration
* the [DBI](https://dbi.r-dbi.org) authors (Hadley Wickham, Kirill Müller, and the funding of the [R Consortium](https://www.r-consortium.org)) for providing a unified interface to database connections


[^1]: Though it should be pointed out, "dbtest" also had the unfortunate property that iOS and macOS auto-correctors would almost constantly "correct" it to "detest".
Though I will admit to being frustrated by bugs that my test suites reveal, _detest_ wasn't the first thing I wanted associated with this new package.
[^2]: Many thanks to [@ma_salmon](https://twitter.com/ma_salmon) for pointing this out to us!
[^3]: And these changes are sometimes for the good, in the case of [ETL](https://en.wikipedia.org/wiki/Extract,_transform,_load) bugs that we found that were later corrected.
[^4]: In fact, there are [multiple](https://docs.ropensci.org/vcr/) [packages](https://docs.ropensci.org/webmockr/) for [testing HTTP interfaces](https://enpiar.com/r/httptest/).
[^5]: With [proper attribution](https://dittodb.jonkeane.com/LICENSE.html), of course.
[^6]: Which, shockingly enough, inherits from `DBIResult`.
[^7]: For example, by wrapping the expression in `dittodb::with_mock_db({...})`
[^8]: The 🎂 is a lie.
_It turns out_ this works for **almost** all database packages, but some like RPostgreSQL [define their own method](https://github.com/tomoakin/RPostgreSQL/blob/ac45baf6166336ae9955104da2ee0cbb9b51bfdf/RPostgreSQL/R/PostgreSQL.R#L101-L104) for `dbGetQuery()` that doesn't use `dbSendQuery()` and `dbFetch()` internally.
To deal with this, we actually created another level of class hierarchy where each database driver has it's own custom class (e.g. `DBIMockRPostgreSQLConnection`) which inherits from *both* `DBIMockConnection` and `DBIRPostgreSQLConnection` so that we can define custom methods for DBI functions like `dbSendQuery()` for the specific drivers that need them.
[^9]: If you would like to see the full source, see [the trace call](https://github.com/ropensci/dittodb/blob/26237ede9769933eb442155de617339d2814e18a/R/capture-requests.R#L102-L105) as well as [the function that is called on exit](https://github.com/ropensci/dittodb/blob/26237ede9769933eb442155de617339d2814e18a/R/capture-requests.R#L185-L197).
[^10]: I may be missing some, but even if not now, surely a new one will be made soon enough!
