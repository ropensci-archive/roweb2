---
slug: graphql-release-10
title: 'New package graphql: A GraphQL Query Parser'
date: '2016-10-05'
author:
  - Jeroen Ooms
tags:
  - R
  - graphql
---

The new ropensci [graphql](https://cran.r-project.org/web/packages/graphql/) package is now on CRAN. It implements R bindings to the [libgraphqlparser C++ library](https://github.com/graphql/libgraphqlparser) to parse GraphQL syntax and export the syntax tree in JSON format:

```r
graphql2json("{ field(complex: { a: { b: [ $var ] } }) }")
```

A syntax parser is perhaps not super useful to most end-users, but can be used to validate graphql queries or implement a GraphQL API in R. We hope to add more related functionality later on.

## What is GraphQL

From the [GraphQL website](https://graphql.org):

> GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

GraphQL is a new approach and syntax to structuring API queries. It provides a modern, and perhaps more natural alternative to e.g. REST or SQL (which were designed for hypertext and relational data, respectively). A GraphQL query on the other hand resembles the structure of the data. For example the query:


```
{
  me {
    name
  }
}
```

Could produce the JSON result:

```json
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

The Github API [supports GraphQL](https://developer.github.com/v4//) and illustrates how GraphQL reduces the number of requests and data in comparison with traditional REST queries.

