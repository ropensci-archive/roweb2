---
title: rdpla tutorial
package_version: 0.2.0
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


### Installation

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
#> # A tibble: 1 x 3
#>   found start returned
#>   <int> <int>    <int>
#> 1 42020     0        5
#>
#> $data
#> # A tibble: 5 x 2
#>                        provider    creator
#>                           <chr>      <chr>
#> 1 Mountain West Digital Library no content
#> 2 Mountain West Digital Library no content
#> 3 Mountain West Digital Library no content
#> 4 Mountain West Digital Library no content
#> 5 Mountain West Digital Library no content
#>
#> $facets
#> list()
```

Limit fields returned


```r
dpla_items(q="fruit", page_size = 10, fields=c("publisher","format"))
#> $meta
#> # A tibble: 1 x 3
#>   found start returned
#>   <int> <int>    <int>
#> 1 42020     0       10
#>
#> $data
#> # A tibble: 10 x 2
#>        format  publisher
#>         <chr>      <chr>
#>  1 no content no content
#>  2 no content no content
#>  3 no content no content
#>  4 no content no content
#>  5 no content no content
#>  6 no content no content
#>  7 no content no content
#>  8 no content no content
#>  9 no content no content
#> 10 no content no content
#>
#> $facets
#> list()
```

Limit records returned


```r
dpla_items(q="fruit", page_size=2, fields=c("provider","title"))
#> $meta
#> # A tibble: 1 x 3
#>   found start returned
#>   <int> <int>    <int>
#> 1 42020     0        2
#>
#> $data
#> # A tibble: 2 x 2
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
#> # A tibble: 1 x 3
#>   found start returned
#>   <int> <int>    <int>
#> 1 57981     0       10
#>
#> $data
#> # A tibble: 10 x 2
#>                                  id  date
#>                               <chr> <chr>
#>  1 e0f460c6d710c125c7ba6d5186b076e4  1896
#>  2 fd0710105d8a7a49b87d956364289d7d  1891
#>  3 e3f11047a57f18f8a21baf5d6ff3c4dd  1886
#>  4 cf718498ee3b9886da35a43566a6a121  1887
#>  5 e8f0ed10dbdcd0ffd6f504e1892515da  1885
#>  6 db59f79180d11c22117cd49f728a1f19  1880
#>  7 d8421296829e9e8e041e2841118a4651  1890
#>  8 1ddac8df735b31b13f0032a7b8293abf  1890
#>  9 dd7e219e625ba0609d9062182029a78c  1880
#> 10 8177b82cc0542e1895fe92718e6c93da  1892
#>
#> $facets
#> list()
```

Search on specific fields


```r
dpla_items(description="obituaries", page_size=2, fields="description")
#> $meta
#> # A tibble: 1 x 3
#>   found start returned
#>   <int> <int>    <int>
#> 1 51276     0        2
#>
#> $data
#> # A tibble: 2 x 1
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
#> # A tibble: 1 x 3
#>   found start returned
#>   <int> <int>    <int>
#> 1    54     0        2
#>
#> $data
#> # A tibble: 2 x 1
#>                                                    subject
#>                                                      <chr>
#> 1 Yodeling--Austria;Musicians--Austria;Gamehouses--Austria
#> 2 Yodeling--Austria;Musicians--Austria;Gamehouses--Austria
#>
#> $facets
#> list()
```


```r
dpla_items(provider="HathiTrust", page_size=2, fields="provider")
#> $meta
#> # A tibble: 1 x 3
#>     found start returned
#>     <int> <int>    <int>
#> 1 2673588     0        2
#>
#> $data
#> # A tibble: 2 x 1
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
#> # A tibble: 1 x 3
#>   found start returned
#>   <int> <int>    <int>
#> 1 64121     0        2
#>
#> $data
#> # A tibble: 2 x 2
#>                                 id                provider
#>                              <chr>                   <chr>
#> 1 41aa36a38d69f5247529505a55528b5d Smithsonian Institution
#> 2 337556aaa3096bd77e462d898b70c9d7 Smithsonian Institution
#>
#> $facets
#> list()
```

Spatial search, by states


```r
dpla_items(sp_state='Massachusetts OR Hawaii', page_size=2, fields=c("id","provider"))
#> $meta
#> # A tibble: 1 x 3
#>    found start returned
#>    <int> <int>    <int>
#> 1 203299     0        2
#>
#> $data
#> # A tibble: 2 x 2
#>                                 id
#>                              <chr>
#> 1 3d3fba16636ab5211a10ff0b0bf44ae6
#> 2 8e2e5f685b4dd0af109fb32fb3db7f1c
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
#> # A tibble: 1 x 3
#>      found start returned
#>      <int> <int>    <int>
#> 1 17857065     0        0
#>
#> $data
#> # A tibble: 0 x 0
#>
#> $facets
#> $facets$sourceResource.spatial.state
#> $facets$sourceResource.spatial.state$meta
#> # A tibble: 1 x 4
#>    type   total  missing   other
#>   <chr>   <int>    <int>   <int>
#> 1 terms 6586777 12065850 3837491
#>
#> $facets$sourceResource.spatial.state$data
#> # A tibble: 5 x 2
#>         term  count
#>        <chr>  <int>
#> 1      Texas 900822
#> 2 California 652773
#> 3    Georgia 508989
#> 4   New York 486016
#> 5       Utah 200686
#>
#>
#> $facets$sourceResource.spatial.country
#> $facets$sourceResource.spatial.country$meta
#> # A tibble: 1 x 4
#>    type   total  missing   other
#>   <chr>   <int>    <int>   <int>
#> 1 terms 8248758 10554280 2095768
#>
#> $facets$sourceResource.spatial.country$data
#> # A tibble: 5 x 2
#>            term   count
#>           <chr>   <int>
#> 1 United States 5512055
#> 2        Russia  178623
#> 3        Mexico  171047
#> 4        France  147943
#> 5        Poland  143322
```

### Search - collections

Search for collections with the words _university of texas_


```r
dpla_collections(q="university of texas", page_size=2)
#> $meta
#> # A tibble: 1 x 2
#>   found returned
#>   <int>    <int>
#> 1    18        2
#>
#> $data
#> # A tibble: 2 x 14
#>                                `_rev`                  ingestDate
#>                                 <chr>                       <chr>
#> 1 14-bb5f3466c0a1e579974ef94d49a5cc85 2017-10-04T02:42:01.229088Z
#> 2 15-339f2d764716ad98af19a1f4e975e597 2017-10-04T02:41:52.940499Z
#> # ... with 12 more variables: `@context` <chr>, id <chr>, title <chr>,
#> #   `_id` <chr>, description <chr>, `@type` <chr>, ingestType <chr>,
#> #   `@id` <chr>, ingestionSequence <int>, score <dbl>,
#> #   validation_message <lgl>, valid_after_enrich <lgl>
```

You can also search in the `title` and `description` fields


```r
dpla_collections(description="east")
#> $meta
#> # A tibble: 1 x 2
#>   found returned
#>   <int>    <int>
#> 1     3       10
#>
#> $data
#> # A tibble: 3 x 14
#>                                `_rev`                  ingestDate
#>                                 <chr>                       <chr>
#> 1 10-3902841b19a1e2ff9f7d0f50e341b084 2017-08-22T23:08:25.766144Z
#> 2  5-9ca83dafb7bcf7087fd561c754e0a509 2017-10-06T20:16:03.681488Z
#> 3  5-48301bd7615558ed90013b3765ead2e5 2017-10-06T20:15:56.314996Z
#> # ... with 12 more variables: `@context` <chr>, id <chr>, title <chr>,
#> #   `_id` <chr>, description <chr>, `@type` <chr>, ingestType <chr>,
#> #   `@id` <chr>, ingestionSequence <int>, score <dbl>,
#> #   validation_message <lgl>, valid_after_enrich <lgl>
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

![plot of chunk unnamed-chunk-18](/img/tutorial-images/rdpla/unnamed-chunk-18-1.png)



### Citing

> Scott Chamberlain (2017). rdpla: Client for the Digital Public
  Library of America ('DPLA'). R package version 0.2.0.
  https://CRAN.R-project.org/package=rdpla



### License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our GitHub repo for rdpla](https://github.com/ropensci/rdpla/issues?state=open)


[Back to top](#top)

[dpla]: https://dp.la
