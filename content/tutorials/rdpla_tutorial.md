---
title: rdpla tutorial
package_version: 0.1.0
---



`rdpla`: R client for Digital Public Library of America

[Digital Public Library of America][dpla] brings together metadata from libraries, archives,
and museums in the US, and makes it freely available via their web portal as well as
an API. DPLA's portal and API don't provide the items themselves from contributing
institutions, but they provide links to make it easy to find things. The kinds of
things DPLA holds metadata for include images of works held in museums, photographs
from various photographic collections, texts, sounds, and moving images.

DPLA has [a great API](https://github.com/dpla/platform) with good documentation -
a rare thing in this world. Further documentation on their API can be found on their [search fields](https://dp.la/info/developers/codex/responses/field-reference/) and [examples of queries](https://dp.la/info/developers/codex/requests/).  Metadata schema information [here](https://dp.la/info/wp-content/uploads/2013/04/DPLA-MAP-V3.1-2.pdf).

DPLA API has two main services (quoting from [their API docs](https://dp.la/info/developers/codex/requests/)):

* items: A reference to the digital representation of a single piece of content indexed by
the DPLA. The piece of content can be, for example, a book, a photograph, a video, etc. The
content is digitized from its original, physical source and uploaded to an online repository.
items are available in the `dpla_items()` function.
* collections: A collection is a little more abstract than an item. Where an item is a
reference to the digital representation of a physical object, a collection is a
representation of the grouping of a set of items. collections are available in the
`dpla_collections()` function.

Note that you can only run examples/vignette/tests if you have an API key. See below for an example of how
to get an API key.

<section id="installation">

## Installation

Stable version from CRAN


```r
install.packages("rdpla")
```

Development version from GitHub


```r
if (!require("devtools")) install.packages("devtools")
devtools::install_github("ropensci/rdpla")
```


```r
library("rdpla")
```

<section id="usage">

## Usage

### API key

If you already have a DPLA API key, make sure it's in your `.Renviron` or `.Rprofile` file.

If you don't have a DPLA API key, use the `dpla_get_key()` function to get a key.
You only need a valid email address to get a key, for example:


```r
dpla_get_key(email = "foo@bar.com")
#> API key created and sent via email. Be sure to check your Spam folder, too.
```

### Search - items

> Note: limiting fields returned for readme brevity.

Basic search


```r
dpla_items(q="fruit", page_size=5, fields=c("provider","creator"))
#> $meta
#> # A tibble: 1 × 3
#>   found start returned
#>   <int> <int>    <int>
#> 1 27437     0        5
#>
#> $data
#> # A tibble: 5 × 2
#>                        provider                         creator
#>                           <chr>                           <chr>
#> 1 Mountain West Digital Library                      no content
#> 2 Mountain West Digital Library                      no content
#> 3 Mountain West Digital Library                      no content
#> 4  Empire State Digital Network                  Preyer, Emilie
#> 5   The New York Public Library Anderson, Alexander (1775-1870)
#>
#> $facets
#> list()
```

Limit fields returned


```r
dpla_items(q="fruit", page_size = 10, fields=c("publisher","format"))
#> $meta
#> # A tibble: 1 × 3
#>   found start returned
#>   <int> <int>    <int>
#> 1 27437     0       10
#>
#> $data
#> # A tibble: 10 × 2
#>        format  publisher
#>         <chr>      <chr>
#> 1  no content no content
#> 2  no content no content
#> 3  no content no content
#> 4  no content no content
#> 5  no content no content
#> 6  no content no content
#> 7  no content no content
#> 8  no content no content
#> 9  no content no content
#> 10 no content no content
#>
#> $facets
#> list()
```

Limit records returned


```r
dpla_items(q="fruit", page_size=2, fields=c("provider","title"))
#> $meta
#> # A tibble: 1 × 3
#>   found start returned
#>   <int> <int>    <int>
#> 1 27413     0        2
#>
#> $data
#> # A tibble: 2 × 2
#>   title                      provider
#>   <chr>                         <chr>
#> 1 Fruit Mountain West Digital Library
#> 2 Fruit Mountain West Digital Library
#>
#> $facets
#> list()
```

Search by date


```r
dpla_items(q="science", date_before=1900, page_size=10, fields=c("id","date"))
#> $meta
#> # A tibble: 1 × 3
#>   found start returned
#>   <int> <int>    <int>
#> 1 51044     0       10
#>
#> $data
#> # A tibble: 10 × 2
#>                                  id      date
#>                               <chr>     <chr>
#> 1  8b2dba3d4947cc97de111425cd43d3e6     1883-
#> 2  7a8afa97e5805d66ab044e6a71d70b5f      1851
#> 3  e7c3b499f627d21910b4ebb4282f0bdc      1880
#> 4  afbea811bc274aac4a049828941c86e9      1880
#> 5  4786d787da0ac9f126e5daf9a32f16b7      1886
#> 6  9f79e6f53dfd2f31a17d756a90f22e0b      1883
#> 7  855407956475c37b086fa7603aa29038      1880
#> 8  bf656dc0ab243d29eba122387fbc0950 1881-1882
#> 9  3bc189a6c3061bd9c2005e67150d4b5a      1880
#> 10 2289f4cbee338d3ee22472084399d0c1     1880-
#>
#> $facets
#> list()
```

Search on specific fields


```r
dpla_items(description="obituaries", page_size=2, fields="description")
#> $meta
#> # A tibble: 1 × 3
#>   found start returned
#>   <int> <int>    <int>
#> 1 50678     0        2
#>
#> $data
#> # A tibble: 2 × 1
#>                          description
#>                                <chr>
#> 1              Obituaries of members
#> 2 Pages from the complied obituaries
#>
#> $facets
#> list()
```


```r
dpla_items(subject="yodeling", page_size=2, fields="subject")
#> $meta
#> # A tibble: 1 × 3
#>   found start returned
#>   <int> <int>    <int>
#> 1    53     0        2
#>
#> $data
#> # A tibble: 2 × 1
#>                                                     subject
#>                                                       <chr>
#> 1 Yodeling--Austria;Musicians--Austria;Restaurants--Austria
#> 2  Yodeling--Austria;Musicians--Austria;Gamehouses--Austria
#>
#> $facets
#> list()
```


```r
dpla_items(provider="HathiTrust", page_size=2, fields="provider")
#> $meta
#> # A tibble: 1 × 3
#>     found start returned
#>     <int> <int>    <int>
#> 1 2583580     0        2
#>
#> $data
#> # A tibble: 2 × 1
#>     provider
#>        <chr>
#> 1 HathiTrust
#> 2 HathiTrust
#>
#> $facets
#> list()
```

Spatial search, across all spatial fields


```r
dpla_items(sp='Boston', page_size=2, fields=c("id","provider"))
#> $meta
#> # A tibble: 1 × 3
#>   found start returned
#>   <int> <int>    <int>
#> 1 76380     0        2
#>
#> $data
#> # A tibble: 2 × 2
#>                                 id                provider
#>                              <chr>                   <chr>
#> 1 c6791046ceb3a0425f78a083a5370a13 Smithsonian Institution
#> 2 1542004b196587885a5150650a5451ec Smithsonian Institution
#>
#> $facets
#> list()
```

Spatial search, by states


```r
dpla_items(sp_state='Massachusetts OR Hawaii', page_size=2, fields=c("id","provider"))
#> $meta
#> # A tibble: 1 × 3
#>    found start returned
#>    <int> <int>    <int>
#> 1 182526     0        2
#>
#> $data
#> # A tibble: 2 × 2
#>                                 id
#>                              <chr>
#> 1 b6f7914260c69876dd81037d353cdcc2
#> 2 97feb7d7f98eb76c6713a6435ab9a0cd
#> # ... with 1 more variables: provider <chr>
#>
#> $facets
#> list()
```

Faceted search


```r
dpla_items(facets=c("sourceResource.spatial.state","sourceResource.spatial.country"),
      page_size=0, facet_size=5)
#> $meta
#> # A tibble: 1 × 3
#>      found start returned
#>      <int> <int>    <int>
#> 1 14295447     0        0
#>
#> $data
#> # A tibble: 0 × 0
#>
#> $facets
#> $facets$sourceResource.spatial.state
#> $facets$sourceResource.spatial.state$meta
#> # A tibble: 1 × 4
#>    type   total  missing   other
#>   <chr>   <int>    <int>   <int>
#> 1 terms 4121038 10639842 2258803
#>
#> $facets$sourceResource.spatial.state$data
#> # A tibble: 5 × 2
#>            term  count
#>           <chr>  <int>
#> 1         Texas 782164
#> 2       Georgia 405982
#> 3    California 266113
#> 4          Utah 231153
#> 5 Massachusetts 176823
#>
#>
#> $facets$sourceResource.spatial.country
#> $facets$sourceResource.spatial.country$meta
#> # A tibble: 1 × 4
#>    type   total missing  other
#>   <chr>   <int>   <int>  <int>
#> 1 terms 4708405 9824001 775417
#>
#> $facets$sourceResource.spatial.country$data
#> # A tibble: 5 × 2
#>             term   count
#>            <chr>   <int>
#> 1  United States 3626513
#> 2 United Kingdom   97938
#> 3         France   92119
#> 4         Canada   68004
#> 5         Mexico   48414
```

### Search - collections

Search for collections with the words _university of texas_


```r
dpla_collections(q="university of texas", page_size=2)
#> $meta
#> # A tibble: 1 × 2
#>   found returned
#>   <int>    <int>
#> 1    18        2
#>
#> $data
#> # A tibble: 2 × 14
#>                               `_rev`                  ingestDate
#>                                <chr>                       <chr>
#> 1 8-cc2336d5b5de70f8dc8755de6512885e 2016-09-07T19:29:23.186302Z
#> 2 9-84614c78c8cf6a37c74eba979a5eb3cf 2016-09-07T19:29:21.233010Z
#> # ... with 12 more variables: `@context` <chr>, id <chr>, title <chr>,
#> #   `_id` <chr>, description <chr>, `@type` <chr>, ingestType <chr>,
#> #   `@id` <chr>, ingestionSequence <int>, score <dbl>,
#> #   validation_message <lgl>, valid_after_enrich <lgl>
```

You can also search in the `title` and `description` fields


```r
dpla_collections(description="east")
#> $meta
#> # A tibble: 1 × 2
#>   found returned
#>   <int>    <int>
#> 1     3       10
#>
#> $data
#> # A tibble: 3 × 14
#>                                `_rev`                  ingestDate                           `@context`
#>                                 <chr>                       <chr>                                <chr>
#> 1  6-7283e1d42b01b1944637bec58a42b070 2016-09-22T05:27:22.447683Z http://dp.la/api/collections/context
#> 2 11-db94de89ceb4e5ffe12cd9f041709795 2016-09-13T16:14:45.744176Z http://dp.la/api/collections/context
#> 3  1-edfcbe6eb4befaeab389b4534046f3d6 2016-09-13T16:14:41.053522Z http://dp.la/api/collections/context
#> # ... with 11 more variables: id <chr>, title <chr>, `_id` <chr>, description <chr>, `@type` <chr>,
#> #   ingestType <chr>, `@id` <chr>, ingestionSequence <int>, score <dbl>, validation_message <lgl>,
#> #   valid_after_enrich <lgl>
```

### Visualize

Visualize metadata from the DPLA - histogram of number of records per state (includes __states__ outside the US)


```r
out <- dpla_items(facets="sourceResource.spatial.state", page_size=0, facet_size=25)
library("ggplot2")
library("scales")
ggplot(out$facets$sourceResource.spatial.state$data, aes(reorder(term, count), count)) +
  geom_bar(stat="identity") +
  coord_flip() +
  theme_grey(base_size = 16) +
  scale_y_continuous(labels = comma) +
  labs(x="State", y="Records")
```

![plot of chunk unnamed-chunk-18](../assets/tutorial-images/rdpla/unnamed-chunk-18-1.png)


<section id="citing">

## Citing

> Scott Chamberlain (2016). rdpla: Client for the Digital Public Library of America ('DPLA'). R package version 0.1.0. https://github.com/ropensci/rdpla


<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our GitHub repo for rdpla](https://github.com/ropensci/rdpla/issues?state=open)


[Back to top](#top)

[dpla]: https://dp.la
