---
title: Experimenting Around the Packages Table
author:
  - Maëlle Salmon
date: '2020-04-30'
slug: table
categories: []
tags: []
package_version: 0.1.0
description: A very short summary of your post (~ 100 characters)
twitterImg: blog/2019/06/04/post-template/name-of-image.png
output:
  html_document:
    keep_md: yes
---






### Table of 105 packages

> The table below of 105 packages uses JavaScript libraries including DataTable and jQuery. If you have disabled JavaScript from your browser or read from R-Bloggers or a feed reader rather than from <https://ropensci.org>, the table will be a vanilla html table of a random excerpt of 10 packages.[^solutions]

You can expand rows by clicking on the book emoji :closed_book:.
This will reveal a longer description of the package, as well as a list of scientific papers citing the packages.
Click on the book emoji :book: again to collapse the row.

<table class="display" style="width:100%;max-height: 3.5em;" id="packagestable">
 <thead>
  <tr>
   <th style="text-align:left;"> name </th>
   <th style="text-align:left;"> description </th>
   <th style="text-align:left;"> data_source </th>
   <th style="text-align:left;"> maintainer </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> phylotaR </td>
   <td style="text-align:left;"> Automated Phylogenetic Sequence Cluster Identification from GenBank </td>
   <td style="text-align:left;"> https://www.ncbi.nlm.nih.gov/genbank </td>
   <td style="text-align:left;"> Dom Bennett </td>
  </tr>
  <tr>
   <td style="text-align:left;"> treebase </td>
   <td style="text-align:left;"> Discovery, Access and Manipulation of TreeBASE Phylogenies </td>
   <td style="text-align:left;"> http://treebase.org </td>
   <td style="text-align:left;"> Carl Boettiger </td>
  </tr>
  <tr>
   <td style="text-align:left;"> rebird </td>
   <td style="text-align:left;"> R Client for the eBird Database of Bird Observations </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Sebastian Pardo </td>
  </tr>
  <tr>
   <td style="text-align:left;"> GSODR </td>
   <td style="text-align:left;"> Global Surface Summary of the Day (GSOD) Weather Data Client </td>
   <td style="text-align:left;"> http://www1.ncdc.noaa.gov/pub/data/gsod/readme.txt </td>
   <td style="text-align:left;"> Adam Sparks </td>
  </tr>
  <tr>
   <td style="text-align:left;"> rglobi </td>
   <td style="text-align:left;"> R Interface to Global Biotic Interactions </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Jorrit Poelen </td>
  </tr>
  <tr>
   <td style="text-align:left;"> traits </td>
   <td style="text-align:left;"> Species Trait Data from Around the Web </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
  </tr>
  <tr>
   <td style="text-align:left;"> ecoengine </td>
   <td style="text-align:left;"> Programmatic Interface to the Web Service Methods Provided by UC Berkeley's Natural History Data </td>
   <td style="text-align:left;"> https://ecoengine.berkeley.edu </td>
   <td style="text-align:left;"> Karthik Ram </td>
  </tr>
  <tr>
   <td style="text-align:left;"> webchem </td>
   <td style="text-align:left;"> Chemical Information from the Web </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Tamás Stirling </td>
  </tr>
  <tr>
   <td style="text-align:left;"> paleobioDB </td>
   <td style="text-align:left;"> Download and Process Data from the Paleobiology Database </td>
   <td style="text-align:left;"> http://paleobiodb.org/data1.1 </td>
   <td style="text-align:left;"> Sara Varela </td>
  </tr>
  <tr>
   <td style="text-align:left;"> getlandsat </td>
   <td style="text-align:left;"> Get Landsat 8 Data from Amazon Public Data Sets </td>
   <td style="text-align:left;"> https://registry.opendata.aws/landsat-8 </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
  </tr>
</tbody>
</table>

<!--html_preserve-->
<script src="https://code.jquery.com/jquery-3.5.0.min.js" integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.7/showdown.min.js" integrity="sha256-CKVcPmoyXVeFTOJvk7+k99gKxTMnKIGs9u8RKFQngVk=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.19/js/jquery.dataTables.min.js" integrity="sha256-t5ZQTZsbQi8NxszC10CseKjJ5QeMw5NINtOXQrESGSU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="table.js"></script>
<!-- https://datatables.net/forums/discussion/comment/151719/#Comment_151719 -->
<!--/html_preserve-->

[^solutions]: You can also explore [the JSON feeding the table](registry.json). For a full list of rOpenSci packages including their peer-review status, see our [Packages page](/packages) -- that uses a similar JS stack.
