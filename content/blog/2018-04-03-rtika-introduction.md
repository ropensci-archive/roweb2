---
slug: "rtika-introduction"
title: Lessons Learned from rtika, a Digital Babel Fish 
package_version: 0.1.7
authors:
  - name: Sasha Goodman
    url: https://github.com/ropensci/rtika
date: 2018-04-17
categories: blog
topicid: 
tags:
- r
- community
- software
- review
- package
- onboarding
- package
- text-mining
- data-extraction
- archiving
- metadata
- xml
- json
- tesseract
- text
- pdf
- word
- excel
---

The Apache Tika parser is like the Babel fish in Douglas Adam's book, "The Hitchhikers' Guide to the Galaxy" [^1]. The Babel fish translates any natural language to any other. Although Tika does not yet translate natural language, it starts to tame the tower of babel of digital document formats. As the Babel fish allowed a person to understand Vogon poetry, Tika allows an analyst to extract text and objects from Microsoft Word.

```  
                        .----.      
               ____    __\\\\\\__                 
               \___'--"          .-.          
               /___>------rtika  '0'          
              /____,--.        \----B      
                      "".____  ___-"    
                      //    / /                   
                            ]/               
```

Parsing files is a common concern for many communities, including journalism [^2], government, business, and academia. The complexity of parsing can vary a lot. Apache Tika is a common library to lower that complexity. The Tika auto-detect parser finds the content type of a file and parses it with an included parser. It currently handles text or metadata extraction from **over one thousand digital formats**:

-   Portable Document Format (`.pdf`)
-   Microsoft Office document formats (Word, PowerPoint, Excel, etc.)
-   Rich Text Format (`.rtf`)
-   Electronic Publication Format (`.epub`)
-   Image formats (`.jpeg`, `.png`, etc.)
-   Mail formats (`.mbox`, Outlook)
-   HyperText Markup Language (`.html`)
-   XML and derived formats (`.xml`, etc.)
-   Compression and packaging formats (`.gzip`, `.rar`, etc.)
-   OpenDocument Format
-   iWorks document formats
-   WordPerfect document formats
-   Text formats
-   Feed and Syndication formats
-   Help formats
-   Audio formats
-   Video formats
-   Java class files and archives
-   Source code
-   CAD formats
-   Font formats
-   Scientific formats
-   Executable programs and libraries
-   Crypto formats

I am blown away by the hours spent on the included parsers, such as Apache `PDFBox`, Apache `Poi`, and others [^3]. Tika began as a common back-end for search engines and to reduce duplicated effort. It first part of Nutch in 2005, and then became its own project in 2007 and a shared module in Lucene, Jackrabbit, Mahout, and Solr [^1]. Now, Tika is a back-end for R with the `rtika` package.

### Motivation: the .lob File Extension

This package came together when parsing a hundred thousand Word documents in a governmental archive. The files did not have a helpful file extension. They had been stored as 'large object data' in a database, and given the generic `.lob` extension.

``` r
# The older Word .doc versions are at the top, and newer .docx are at the end.
batch[1]
#> [1] "/Users/sasha/leginfo/2007/BILL_ANALYSIS_TBL_1.lob"
```

Some documents parsed with the `antiword` package.

``` r
library('antiword')

timing <- system.time(
  
  text <- 
    batch[1:2000] %>%
    lapply(antiword)
  
)

# average time elapsed *per document* for antiword:
timing[3]/2000
#>   elapsed 
#> 0.0098275
```

However, the files farther into the batch were in the new Word format, and `antiword` did not parse them. Unfortunately, the government had switched to the newer version, but left no obvious clues. Typically, modern Word documents use the `.docx` file extension and older ones use `.doc`. I only had `.lob`:

``` r
last_file <- length(batch)
tryCatch(antiword(batch[last_file]), error = function(x){x})
#> <simpleError: System call to 'antiword' failed (1): /Users/sasha/leginfo/2017/BILL_ANALYSIS_TBL_9999.lob is not a Word Document.
```

Fortunately, I remembered Apache Tika. Five years earlier, Tika helped parse files from the Internet Archive, and handled whatever format I threw at it. Back then, I put together a R package for myself and a few colleagues. It was outdated.

I downloaded the latest Tika software and made a script. Tika did its magic. It scanned the headers for the so-called "Magic Bytes" [^4] and parsed the files appropriately :

``` r
library('rtika')

timing <- system.time(
  
  text <- 
    batch[1:2000] %>%
    tika_text(threads=1)
  
)

# average time elapsed *per document* parsed for rtika:
timing[3]/2000
#>  elapsed 
#> 0.006245
```

For the batch, the efficiency compared favorably to `antiword`, even with the overhead of loading Tika. I estimate that starting Tika, loading the Java parsers, loading the file list, and reading the files back into R took a few seconds. Fortunately, I saved minutes of time. The reduced effort led me to think about the broader applications. I wanted to create a package and share this with the R community.

### Lessons Learned

I never distributed a package on repositories such as CRAN or Github, and the rOpenSci group was the right place to start. The reviewers used a very transparent on-boarding process. Instead of seeing them as gatekeepers, they were volunteers helping create a maintainable package that followed certain standards. If I stopped maintaining `rtika`, others could take over, and I think the rOpenSci standards will help the package work consistently into the future. The vast majority of time was spent on documenting the code, the introductory vignette, and continuous testing of new code.

#### Connecting to Tika the Old Fashioned Way

Since the Tika software is already mature, my coding centered around connecting Tika and R. The `rtika` software is a message broker that handles inter-process communication, and there are several ways to do this: Tika server, `rJava`, or system calls. I discovered the Linux paradigm of using files and file-like paths for most messaging, paraphrased as "everything is a file" [^5]. I wanted a method that would work on all major operating systems and be easy to install, and chose to use system calls and the file system.

This worked. R sends Tika a signal to execute code using an old fashioned command line call, telling Tika to parse a particular batch of files. R waits. Eventually, Tika sends the signal of its completion, so R can return with the results as a character vector. Surprisingly, this process can be a good option for modern containerized applications running Docker. In the example later in this blog post, a similar technique is used to connect to a local Docker container in a few lines of code.

Communication with Tika went smoothly, after the issue with `base::system2()` was identified. That was terminating Tika's long running process. Switching to `sys::exec_wait()` or `processx::run()` solved the issue.

#### The R User Interface

Many in the R community make use of `magrittr` style pipelines, so those needed to work. The Tidy Tools Manifesto makes piping a central tenant [^6], and it makes code easier to read and maintain.

When writing `rtika`, I created two distinct styles of user interface. The first was a lightweight R wrapper around the Tika command line, which I called `tika()`. The parameters and abbreviations there mirrored the Apache Tika tool. The other functions are in the common R style found in tidy tools, and run `tika()` with common presets (e.g. `tika_html()` outputs to 'html' ). For R users, these should be more intuitive and self-documenting.

#### Responding to Reviewers

During the review process, I appreciated David Gohel's [^7] attention to technical details, and that Julia Silge [^8] and Noam Ross [^9] pushed me to make the documentation more focused. I ended up writing about each of the major functions in a vignette, one by one, in a methodical way. While writing and explaining, I learned to understand Tika better.

Noam Ross, the editor, helped deal with the large size of the Tika app, which was around 60MB. CRAN officially limited the size of packages to 5MB, therefore an additional post-install function `tika_install()` downloaded Tika to a user directory. This got me thinking about the importance of Github's larger file size limits, and also how containerized apps in Docker or Kubernetes might help distribute code for packages in the future.

### Tika in Context: Parsing the Internet Archive

The first archive I parsed with Tika was a website retrieved from the Wayback Machine [^10], a treasure trove of historical files. Maintained by the Internet Archive, their crawler downloads sites over decades. If crawled consistently, longitudinal analyses are possible. For example, federal agency websites often change when an administrations change, so the Internet Archive and academic partners have increased the consistency of crawling there. In 2016, they archived over 200 terabytes of documents and include, among other things, over 40 million `pdf` files [^11].

In the following example, the function `wayback_machine_downloader()` gets documents from '<http://www3.epa.gov/climatechange/Downloads>' between January 20th, 2016 and January 20th, 2017.

``` r
# Wayback downloader image: https://github.com/hartator/wayback-machine-downloader
wayback_machine_downloader <- function(input, 
    args = character(),
    download_dir = tempfile('wayback_machine_download_',getwd()) ) {
  
  download_dir <- normalizePath(download_dir, mustWork = FALSE)
  if(!dir.exists(download_dir)){
    dir.create(download_dir, recursive = TRUE)
  }
  # wait for wayback-machine-downloader in Docker
    processx::run('docker', c('run', '--rm',
     '-v', paste0(download_dir,':/websites'),
    'hartator/wayback-machine-downloader',
    input, args))
    
  # Retrieve the paths to results
  file.path(download_dir, list.files(path = download_dir, 
                                   recursive = TRUE))
}

# download over 200 MB of documents given --from and --to dates
batch <- wayback_machine_downloader(
  'http://www3.epa.gov/climatechange/Downloads', 
                    args = c('--from','20160120',
                             '--to','20170120'),
                    download_dir='~/wayback_machine_downloader')

# get more easily parsable XHTML objects
html <-
    batch %>% 
    tika_html() %>%
    lapply(xml2::read_html)
```

The Tika metadata fields are in the XHTML header.

``` r
content_type <-
    html %>%
    lapply(xml2::xml_find_first, '//meta[@name="Content-Type"]') %>%
    lapply(xml2::xml_attr, 'content') %>%
    unlist()

# some files are compressed .zip
content_type[1:10]
#>  [1] "application/pdf" "application/pdf" "application/pdf"
#>  [4] "application/pdf" "application/pdf" "application/pdf"
#>  [7] "application/pdf" "application/pdf" "application/pdf"
#> [10] "application/zip"

creation_date <- 
    html %>%
    lapply(xml2::xml_find_first, '//meta[@name="Creation-Date"]') %>%
    lapply(xml2::xml_attr, 'content') %>%
    unlist()

# Note that some files were created before the Wayback machine downloaded them from the site.
sample(creation_date,10)
#>  [1] "2014-06-26T22:02:28Z" "2013-06-12T15:25:11Z" "2016-06-14T18:22:00Z"
#>  [4] "2016-04-08T16:03:44Z" "2014-10-20T18:27:01Z" "2011-04-08T15:07:00Z"
#>  [7] "2015-04-27T15:28:22Z" NA                     "2016-05-11T17:11:26Z"
#> [10] "2013-05-07T18:53:31Z"

links <-
    html %>%
    lapply(xml2::xml_find_all, '//a') %>%
    lapply(xml2::xml_attr, 'href')

sample(links[[6]],5)
#>  [1] "www.epa.gov/climatechange/endangerment.html"                  
#>  [2] "https://www.uea.ac.uk/mac/comm/media/press/2009/nov/CRUupdate"
#>  [3] "mailto:ghgendangerment@epa.gov"                               
#>  [4] "https://www.uea.ac.uk/mac/comm/media/press/2009/nov/CRUupdate"
#>  [5] "http://www.epa.gov/climatechange/endangerment.html"           
```

Some files are compressed, and Tika automatically uncompressed and parsed them. For example, the file 'DataAnnex\_EPA\_NonCO2\_Projections\_2011\_draft.zip' contains an Excel spreadsheet that is unzipped and converted to HTML. Both Microsoft Excel and Word tables become HTML tables with Tika. 

For more fine grained access to file contents, see `tika_json()` that is discussed in the vignette [^12].

### Next Steps

Out of the box, `rtika` uses the new Tika 'batch processor' module, and for most situations the settings work well. However, Tika's processor also has a new 'config file' format that gives fine grained control, and I'm eager to incorporate that once the format stabilizes. For example, it could instruct the batch processor to get a particular type of metadata only, like the Content-Type, and not parse the text.

My hope is that even if `rtika` does not have the required parser, it will still be useful for Content-Type detection and metadata. I noticed Tika does not yet have strong support for Latex or Markdown, which is unfortunate because those are actively used in the R community. Tika currently reads and writes Latex and Markdown files, captures metadata, and recognizes the MIME type when downloading with `tika_fetch()`. However, Tika does not have parsers to fully understand the document structure, render it to XHTML, and extract the plain text without markup. For these cases, Pandoc will be more useful (See: <https://pandoc.org/demos.html> ). However, Tika still helps identify them and get metadata.

Another step is to include an install script for the Tesseract OCR software [^13]. Out of the box, Tika will be enhanced by Tesseract for `pdf` files with document images, if Tesseract is available on the system. For installation tips, see <https://wiki.apache.org/tika/TikaOCR> and <https://github.com/tesseract-ocr/tesseract/wiki>.

It is possible to integrate the `rJava` package. Many in the R community know `rJava`. Some like its speed while others say it is difficult to install. I think `rJava` would be a nice enhancement, but want to make it optional feature instead of a dependency. If `rJava` were already installed on a system, `rtika` would detect that and reduce the start-up overhead for each call to `tika()`. Because the 2.0 version of Tika is planned to significantly reduce start-up time, I view this as a lower priority.

### Conclusion

For researchers who work with lots of text, this is a golden age. There is so much textual data, it is almost overwhelming. These data carry much meaning in the form of words, letters, emoji, metadata, and document structure. In my opinion, analyst should not have to spend too much time struggling to parse files. I hope the R community makes good use of `rtika`, the digital Babel fish.

<!-- references -->

[^1]: Mattmann, Chris, and Jukka Zitting. 2011. *Tika in Action*. Manning Publications Co. <https://www.manning.com/books/tika-in-action>.

[^2]: Wikipedia. 2018b. “Panama Papers.” Accessed March 14. <https://en.wikipedia.org/wiki/Panama_Papers>.

[^3]: Apache Foundation. 2018. “Apache Tika Supported Document Formats.” Accessed March 14. <https://tika.apache.org/1.17/formats.html>.

[^4]: Wikipedia. 2018a. “File Format: Magic Number.” Accessed March 14. <https://en.wikipedia.org/wiki/File_format#Magic_number>.

[^5]: Kerrisk, Michael. 2010. *The Linux Programming Interface: A Linux and Unix System Programming Handbook*. No Starch Press.

[^6]: Wickham, Hadley. 2016. “The Tidy Tools Manifesto.” <https://cran.r-project.org/web/packages/tidyverse/vignettes/manifesto.html>.

[^7]: Gohel, David. 2018. “ArData.” Accessed March 14. <http://www.ardata.fr/>.

[^8]: Silge, Julia. 2018. “Juliasilge.com.” Accessed March 14. <https://juliasilge.com/>.

[^9]: Ross, Noam. 2018. “Noamross.net.” Accessed March 14. <http://www.noamross.net/>.

[^10]: Internet Archive. 2018. “Wayback Machine.” Accessed March 14. <https://archive.org/>.

[^11]: Jefferson. 2017. “Over 200 Terabytes of the Government Web Archived!” <https://blog.archive.org/2017/05/09/over-200-terabytes-of-the-government-web-archived/>.

[^12]: Goodman, Sasha. 2018. “Introduction to Rtika Vignette.” Accessed March 14. <https://ropensci.github.io/rtika/articles/rtika_introduction.html>.

[^13]: Smith, Ray. 2007. “An Overview of the Tesseract Ocr Engine.” In *Document Analysis and Recognition, 2007. Icdar 2007. Ninth International Conference on*, 2:629–33. IEEE.
