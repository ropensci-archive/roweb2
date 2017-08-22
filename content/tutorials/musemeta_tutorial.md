---
title: musemeta tutorial
package_version: 0.0.5
---



Currently `musemeta` can get data from:

* [The Metropolitan Museum of Art](http://www.metmuseum.org/) via
    * scraping the MET website (see function `met()`)
    * http://scrapi.org/ (see functions `scrapi_()`)
* The [Canadian Science & Technology Museum Corporation](http://techno-science.ca/en/index.php) (CSTMC) (see functions `cstmc_()`)
* The [National Gallery of Art](http://www.nga.gov/content/ngaweb.html) (NGA) (see function `nga()`)
* The [Getty Museum](http://www.getty.edu/) (see function `getty()`)
* The [Art Institute of Chicago](http://www.artic.edu/) (see function `aic()`)
* The [Asian Art Museum of San Francisco](http://www.asianart.org/) (see function `aam()`)

Other sources of museum metadata will be added...check back later & see [issues](https://github.com/ropensci/musemeta/issues).

<section id="installation">

## Installation

Not on CRAN yet. Get `ckanr` first


```r
install.packages("devtools")
devtools::install_github("ropensci/ckanr")
```

Then install musemeta


```r
devtools::install_github("ropensci/musemeta")
```


<section id="usage">

## Usage


```r
library("musemeta")
```

### MET data

To get actual metadata for an object, you can use `met()` or `scrapi_get()` functions. The latter gets much more data, and uses a REST API, while the former scrapes the html directly, and can be more fragile with any changes in the html on the site.
<br>
#### Scraping site directly

Data for a single object


```r
met(559490)
```

```
#> <Museum metadata> Siphon nozzle
#>   Period: New Kingdom, Ramesside
#>   Dynasty: Dynasty 19 20
#>   Date: ca. 1295 1070 B.C.
#>   Geography: From Egypt, Memphite Region, Lisht North, Cemetery, MMA excavations, 1913 14
#>   Medium: Bronze
#>   Dimensions: l. 5.4 cm (2 1/8 in)
#>   Credit Line: Rogers Fund and Edward S. Harkness Gift, 1922
#>   Accession Number: 22.1.962
```

Or index to name of object, or values in the description


```r
met(559490)$name
```

```
#> [1] "Siphon nozzle"
```


```r
met(559490)$values[1:2]
```

```
#> [[1]]
#> [[1]]$name
#> [1] "Period"
#>
#> [[1]]$value
#> [1] "New Kingdom, Ramesside"
#>
#>
#> [[2]]
#> [[2]]$name
#> [1] "Dynasty"
#>
#> [[2]]$value
#> [1] "Dynasty 19 20"
```

A different object


```r
met(246562)
```

```
#> <Museum metadata> Terracotta guttus (flask with handle and spout)
#>   Period: Classical
#>   Date: 4th century B.C.
#>   Culture: Greek, South Italian, Campanian
#>   Medium: Terracotta; black-glaze
#>   Dimensions: 2 7/8in. (7.3cm)
#>   Classification: Vases
#>   Credit Line: Purchase by subscription, 1896
#>   Accession Number: 96.18.35
```

Get many objects


```r
lapply(c(479283, 228901, 436876), met)
```

```
#> [[1]]
#> <Museum metadata> Papyri Fragments
#>   Date: 7th century
#>   Geography: Made in Thebes, Byzantine Egypt
#>   Culture: Coptic
#>   Medium: Papyrus and ink
#>   Dimensions: Framed: 11 1/4 x 15 in. (28.5 x 38.1 cm)
#>   Classification: Papyrus
#>   Credit Line: Rogers Fund, 1914
#>   Accession Number: 14.1.616
#>
#> [[2]]
#> <Museum metadata> Piece
#>   Date: 19th century
#>   Culture: German
#>   Dimensions: 1 1/4 x 6 1/4in. (3.2 x 15.9cm)
#>   Classification: Textiles-Laces
#>   Credit Line: Gift of Helen E. Ionides, 1963
#>   Accession Number: 63.80.18
#>
#> [[3]]
#> <Museum metadata> Marion Lenbach (1892 1947), the Artist's Daughter
#>   Artist: Franz von Lenbach (German, Schrobenhausen 1836 1904 Munich)
#>   Date: 1900
#>   Medium: Oil on canvas
#>   Dimensions: 58 7/8 x 41 1/2 in. (149.5 x 105.4 cm)
#>   Classification: Paintings
#>   Credit Line: Bequest of Collis P. Huntington, 1900
#>   Accession Number: 25.110.46
```

#### Using the scrapi API

This is again, for The Metropolitan Museum of Art only

Get a specific object


```r
scrapi_info(123, fields=c('title','primaryArtistNameOnly','medium'))
```

```
#> $timelineList
#> $timelineList[[1]]
#> $timelineList[[1]]$name
#> [1] "The United States, 1600-1800 A.D."
#>
#> $timelineList[[1]]$count
#> [1] 0
#>
#> $timelineList[[1]]$orderId
#> [1] 0
...
```

Search for objects


```r
scrapi_search(query='mirror')
```

```
#> $links
#>  [1] "http://scrapi.org/object/207785" "http://scrapi.org/object/50444"
#>  [3] "http://scrapi.org/object/313256" "http://scrapi.org/object/467733"
#>  [5] "http://scrapi.org/object/49591"  "http://scrapi.org/object/267055"
#>  [7] "http://scrapi.org/object/156225" "http://scrapi.org/object/545128"
#>  [9] "http://scrapi.org/object/452364" "http://scrapi.org/object/460423"
#> [11] "http://scrapi.org/object/244558" "http://scrapi.org/object/436839"
#> [13] "http://scrapi.org/object/452852" "http://scrapi.org/object/248153"
#> [15] "http://scrapi.org/object/54118"  "http://scrapi.org/object/60142"
#> [17] "http://scrapi.org/object/3977"   "http://scrapi.org/object/255391"
...
```

Get an object, with a scrapi.org url


```r
out <- scrapi_get("http://scrapi.org/object/427581")
out$primaryArtist
```

```
#> $role
#> [1] "Artist"
#>
#> $name
#> [1] "Daniel Marot the Elder"
#>
#> $nationality
#> [1] "(French, Paris 1661–1752 The Hague)"
```

or an object id


```r
out <- scrapi_get(427581)
out$primaryArtist
```

```
#> $role
#> [1] "Artist"
#>
#> $name
#> [1] "Daniel Marot the Elder"
#>
#> $nationality
#> [1] "(French, Paris 1661–1752 The Hague)"
```

### CSTMC data

List changes


```r
cstmc_changes(limit = 1)
```

```
#> [[1]]
#> [[1]]$user_id
#> [1] "27778230-2e90-4818-9f00-bbf778c8fa09"
#>
#> [[1]]$timestamp
#> [1] "2015-03-30T15:06:55.500589"
#>
#> [[1]]$object_id
#> [1] "f4406699-3e11-4856-be48-b55da98b3c14"
#>
...
```

List datasets


```r
cstmc_datasets(as = "table")
```

```
#>  [1] "artifact-data-agriculture"
#>  [2] "artifact-data-aviation"
#>  [3] "artifact-data-bookbinding"
#>  [4] "artifact-data-chemistry"
#>  [5] "artifact-data-communications"
#>  [6] "artifact-data-computing-technology"
#>  [7] "artifact-data-domestic-technology"
#>  [8] "artifact-data-energy-electric"
#>  [9] "artifact-data-exploration-and-survey"
#> [10] "artifact-data-fisheries"
...
```

Search for packages


```r
out <- cstmc_package_search(q = '*:*', rows = 2, as='table')
lapply(out$results$resources, function(x) x[,1:3])
```

```
#> [[1]]
#>                      resource_group_id cache_last_updated
#> 1 4cff3cdf-7174-46f1-b2cf-da84a2478583                 NA
#> 2 4cff3cdf-7174-46f1-b2cf-da84a2478583                 NA
#> 3 4cff3cdf-7174-46f1-b2cf-da84a2478583                 NA
#> 4 4cff3cdf-7174-46f1-b2cf-da84a2478583                 NA
#>           revision_timestamp
#> 1 2015-03-30T15:06:55.217106
#> 2 2014-11-04T02:23:51.866763
#> 3 2014-11-05T19:05:31.328801
#> 4 2014-11-05T19:09:35.883635
#>
#> [[2]]
#>                      resource_group_id cache_last_updated
#> 1 9d1467e6-4e87-4ebf-bd73-35326fd46491                 NA
#> 2 9d1467e6-4e87-4ebf-bd73-35326fd46491                 NA
#> 3 9d1467e6-4e87-4ebf-bd73-35326fd46491                 NA
#> 4 9d1467e6-4e87-4ebf-bd73-35326fd46491                 NA
#>           revision_timestamp
#> 1 2015-01-09T23:33:13.972143
#> 2 2014-10-31T22:37:58.762911
#> 3 2014-11-05T18:23:00.789562
#> 4 2014-11-05T18:25:16.764967
```

### National Gallery of Art (NGA)

Get metadata for a single object


```r
nga(id=33267)
```

```
#> <NGA metadata> Paradise with Christ in the Lap of Abraham
#>   Artist: German 13th Century
#>   Inscription: on verso late thirteenth-century copy of a letter from Pope Gregory
#>           IX to Elizabeth of Thuringia
#>   Provenance: R. Forrer (Lugt Supp.941a)
#>   Description:
#>      created: c. 1239
#>      medium: tempera and gold leaf on vellum, NGA Miniatures 1975, no. 33
#>      dimensions: overall: 22.4 x 15.7 cm (8 13/16 x 6 3/16 in.)
#>      credit: Rosenwald Collection
#>      accession: 1946.21.11
#>   Exhibition history:
#>      2007: Fabulous Journeys and Faraway Places: Travels on Paper, 1450 - 1700,
#>           National Gallery of Art, Washington, D.C., 2007
#>      2009: Heaven on Earth: Manuscript Illuminations from the National Gallery
#>           of Art, NGA, 2009.
#>   Bibliography:
#>      1975: National Gallery of Art. Medieval and Renaissance Miniatures from the
#>           National Gallery of Art. Washington, 1975.
#>      1982: Fine 1982, 45.
#>      1984: Walker, John. National Gallery of Art, Washington. Rev. ed. New York,
#>           1984: 658, no. 1033, color repro.
#>      1990: Clayton, Virginia Tuttle. Gardens on Paper: Prints and Drawings,
#>           1200-1900. Exh. cat. National Gallery of Art, Washington,
#>           1990: 1.
```

Get metadata for many objects


```r
lapply(c(143679,27773,28487), nga)
```

```
#> [[1]]
#> <NGA metadata>  Barrington bore it all with exemplary patience
#>   Artist: Du Maurier, George
#>   Inscription: by artist, lower right in pen and brown ink: Barrington bore it all
#>           with exemplary patience / P.7 Par VI / Mlle de Mersac /
#>           [Not deciphered]; by later hand, upper right on flap in
#>           graphite: [Not deciphered] (cut off) / Reduce [to?] 6 1/4;
#>           by later hand, lower center verso in pen and blue ink: [Not
#>           deciphered] (effaced)
#>   Provenance: (Fry Gallery, London); Joseph F. McCrindle [1923-2008], New York,
#>           1968; Joseph F. McCrindle Foundation, 2008; gift to NGA,
#>           2009.
#>   Description:
#>      created: 1878/1879
#>      medium: pen and brown ink with graphite on heavy wove paper
#>      dimensions: , sheet: 22 x 30.2 cm (8 11/16 x 11 7/8 in.)  image (6.4 cm of sheet width is folded under): 22 x 23.8 cm (8 11/16 x 9 3/8 in.)
#>      credit: Joseph F. McCrindle Collection
#>      accession: 2009.70.110
#>   Exhibition history:
#>   Bibliography:
#>      2012: Grasselli, Margaret M., and Arthur K. Wheelock, Jr., eds. The
#>           McCrindle Gift: A Distinguished Collection of Drawings and
#>           Watercolors. Exh. cat. National Gallery of Art. Washington,
#>           2012: 169 (color).
#>
#> [[2]]
#> <NGA metadata>  Bell Hop  Marionette
#>   Artist: Cero, Emile
#>   Inscription: lower right in black ink: EMILE CERO
#>   Provenance: NA
#>   Description:
#>      created: c. 1938
#>      medium: watercolor, graphite, and pen and ink on paper
#>      dimensions: overall: 35.5 x 28 cm (14 x 11 in.)  Original IAD Object: 42" high
#>      credit: Index of American Design
#>      accession: 1943.8.15682
#>   Exhibition history:
#>   Bibliography:
#>
#> [[3]]
#> <NGA metadata>  Bell in Hand  Tavern Sign
#>   Artist: American 20th Century
#>   Inscription:
#>   Provenance: NA
#>   Description:
#>      created: 1935/1942
#>      medium: watercolor and graphite on paper
#>      dimensions: overall: 37.7 x 26.5 cm (14 13/16 x 10 7/16 in.)
#>      credit: Index of American Design
#>      accession: 1943.8.16396
#>   Exhibition history:
#>   Bibliography:
#>      1950: Christensen, Erwin O., The Index of American Design, New York: 1950,
#>           p. 67, no. 127.
#>      1970: Hornung, Clarence P., Treasury of American Design. New York, 1970:
#>           83, pl. 265.
```

### Getty Museum

Get metadata for a single object


```r
getty(id=140725)
```

```
#> <Getty metadata> A Young Herdsman Leaning on his "Houlette"
#>   Artist: Herman Saftleven the Younger [Dutch, 1609 - 1685]
#>   Provenance
#>      : Gustav Nebehay [Vienna, Austria]
#>      - 1941: Franz W. Koenigs [Haarlem, Netherlands], by inheritance to his heirs.
#>      - 2001: Private Collection (sold, Sotheby's New York, January 23, 2001, lot 20, to Bob Haboldt.)
#>      2001: Bob P. Haboldt, sold to the J. Paul Getty Museum, 2001.
#>   Description:
#>      Artist/Maker(s): Herman Saftleven the Younger [Dutch, 1609 - 1685]
#>      Date: about 1650
#>      Medium: Black chalk and brown wash
#>      Dimensions: 27.5 x 18.6 cm (10 13/16 x 7 5/16 in.)
#>      Object Number: 2001.40
#>      Department: Drawings
#>      Culture: Dutch
#>      Previous number: L.2001.12
#>      Classification/Object Type: Drawings / Drawing
#>   Exhibition history:
#>      Dutch Drawings of the Golden Age (May 28 to August 25, 2002): The J. Paul Getty Museum at the Getty Center (Los Angeles), May 28,
#>           2002 - August 25, 2002
#>      Visions of Grandeur: Drawing in the Baroque Age (June 1 to September 12, 2004): The J. Paul Getty Museum at the Getty Center (Los Angeles), June 1,
#>           2004 - September 12, 2004
#>      Paper Art: Finished Drawings in Holland 1590-1800 (September 6 to November 20, 2005): The J. Paul Getty Museum at the Getty Center (Los Angeles), September
#>           6, 2005 - November 20, 2005
#>      Drawing Life: The Dutch Visual Tradition (November 24, 2009 to February 28, 2010): The J. Paul Getty Museum at the Getty Center (Los Angeles), November
#>           24, 2009 - February 28, 2010
```

Get metadata for many objects


```r
lapply(c(140725,8197), getty)
```

```
#> [[1]]
#> <Getty metadata> A Young Herdsman Leaning on his "Houlette"
#>   Artist: Herman Saftleven the Younger [Dutch, 1609 - 1685]
#>   Provenance
#>      : Gustav Nebehay [Vienna, Austria]
#>      - 1941: Franz W. Koenigs [Haarlem, Netherlands], by inheritance to his heirs.
#>      - 2001: Private Collection (sold, Sotheby's New York, January 23, 2001, lot 20, to Bob Haboldt.)
#>      2001: Bob P. Haboldt, sold to the J. Paul Getty Museum, 2001.
#>   Description:
#>      Artist/Maker(s): Herman Saftleven the Younger [Dutch, 1609 - 1685]
#>      Date: about 1650
#>      Medium: Black chalk and brown wash
#>      Dimensions: 27.5 x 18.6 cm (10 13/16 x 7 5/16 in.)
#>      Object Number: 2001.40
#>      Department: Drawings
#>      Culture: Dutch
#>      Previous number: L.2001.12
#>      Classification/Object Type: Drawings / Drawing
#>   Exhibition history:
#>      Dutch Drawings of the Golden Age (May 28 to August 25, 2002): The J. Paul Getty Museum at the Getty Center (Los Angeles), May 28,
#>           2002 - August 25, 2002
#>      Visions of Grandeur: Drawing in the Baroque Age (June 1 to September 12, 2004): The J. Paul Getty Museum at the Getty Center (Los Angeles), June 1,
#>           2004 - September 12, 2004
#>      Paper Art: Finished Drawings in Holland 1590-1800 (September 6 to November 20, 2005): The J. Paul Getty Museum at the Getty Center (Los Angeles), September
#>           6, 2005 - November 20, 2005
#>      Drawing Life: The Dutch Visual Tradition (November 24, 2009 to February 28, 2010): The J. Paul Getty Museum at the Getty Center (Los Angeles), November
#>           24, 2009 - February 28, 2010
#>
#> [[2]]
#> <Getty metadata> Grave Stele of a Boy
#>   Artist: Unknown
#>   Provenance
#>      - 1973: Nicolas Koutoulakis [Geneva, Switzerland], sold to the J. Paul Getty Museum, 1973.
#>   Description:
#>      Artist/Maker(s): Unknown
#>      Date: 1 - 50
#>      Medium: Marble
#>      Dimensions: Object: H: 87 x W: 39.1 x D: 7 cm (34 1/4 x 15 3/8 x 2 3/4 in.)
#>      Object Number: 73.AA.114
#>      Department: Antiquities
#>      Display Title: Gravestone of a Boy
#>      Culture: Roman
#>      Place Created: Roman Empire
#>      Classification/Object Type: Sculpture / Relief
#>   Exhibition history:
```

## Art Institute of Chicago

Get metadata for a single object


```r
aic(41033)
```

```
#> <AIC metadata> 41033
#>    Artist:
#>       Name: Charles Edmund Brock English
#>       Years: 1870-1938
#>    Link: http://www.artic.edu/aic/collections/artwork/41033
#>    Title: "'The unwelcome hints of Mr. Shepherd, his Agent,' Chapter I"
#>       frontispiece for Jane Austen's Persuasion, 1898
#>    Description: Pen and black ink with brush and watercolor, on ivory wove card 298 x
#>       222 mm Signed lower right, in pen and black ink: "C.E.Brock .
#>       1898"; inscribed, lower center: "'The unwelcome hints of Mr.
#>       Shepherd, his agent' / Chapter I"; further ink and graphite
#>       inscriptions in marginsGift of James Deering, 1927.1623
#>    Description-2: Prints and Drawings Not on Display
#>    Artwork body:
#>    Exhibition history:
#>    Publication history:
#>      - : Jane Austen, edited by Gerald Brimley Johnson, Persuasion, in Jane
#>           Austen's Novels, Volume X, (London: Dent, 1898), p. 8
#>           (ill).
#>    Ownership history:
```

Get metadata for many objects


```r
lapply(c(41033,210804), aic)
```

```
#> [[1]]
#> <AIC metadata> 41033
#>    Artist:
#>       Name: Charles Edmund Brock English
#>       Years: 1870-1938
#>    Link: http://www.artic.edu/aic/collections/artwork/41033
#>    Title: "'The unwelcome hints of Mr. Shepherd, his Agent,' Chapter I"
#>       frontispiece for Jane Austen's Persuasion, 1898
#>    Description: Pen and black ink with brush and watercolor, on ivory wove card 298 x
#>       222 mm Signed lower right, in pen and black ink: "C.E.Brock .
#>       1898"; inscribed, lower center: "'The unwelcome hints of Mr.
#>       Shepherd, his agent' / Chapter I"; further ink and graphite
#>       inscriptions in marginsGift of James Deering, 1927.1623
#>    Description-2: Prints and Drawings Not on Display
#>    Artwork body:
#>    Exhibition history:
#>    Publication history:
#>      - : Jane Austen, edited by Gerald Brimley Johnson, Persuasion, in Jane
#>           Austen's Novels, Volume X, (London: Dent, 1898), p. 8
#>           (ill).
#>    Ownership history:
#>
#> [[2]]
#> <AIC metadata> 210804
#>    Artist:
#>       Name: William H. Bell , American
#>       Years: 1830 1910
#>    Link: http://www.artic.edu/aic/collections/artwork/210804
#>    Title: The "Vermillion Cliff," a typical plateau edge, as seen from Jacobs
#>       Pool, Arizona. From its top a plateau stretches to the right,
#>       and from its base another to the left. Their difference of
#>       level is 1.500 feet, and the step is too steep for scaling.,
#>       1872
#>    Description: Albumen print, stereo, No. 15 from the series "Geographical
#>       Explorations and Surveys West of the 100th Meridian" 9.3 x 7.5
#>       cm (each image); 10 x 17.7 cm (card)Photography Gallery Fund,
#>       1959.616.13
#>    Description-2: Photography Not on Display
#>    Artwork body:
#>    Exhibition history:
#>    Publication history:
#>    Ownership history:
```



<section id="citing">

## Citing

To cite `musemeta` in publications use:

<br>

>  Scott Chamberlain (2015). musemeta: R Client for Scraping Museum Metadata. R
  package version 0.0.5. https://github.com/ropensci/musemeta

<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our Github repo for musemeta](https://github.com/ropensci/musemeta/issues?state=open)

[Back to top](#top)
