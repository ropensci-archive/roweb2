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

The table below uses JS libraries including DataTable and jQuery.
If you have disabled JS from your browser, the table will be a vanilla html table. 
You can also explore [the JSON feeding the table](registry.json).
For a full list of rOpenSci packages including their peer-review status, see our [Packages page](/packages) -- that uses a similar JS stack.

You can expand rows by clicking on the book emoji :closed_book:.
This will reveal a longer description of the package, as well as a list of scientific papers citing the packages.
Click on the book emoji :book: again to collapse the row.

There are 105 packages in the table below.



<table class="display" style="width:100%" id="packagestable">
 <thead>
  <tr>
   <th style="text-align:left;"> book </th>
   <th style="text-align:left;"> name </th>
   <th style="text-align:left;"> description </th>
   <th style="text-align:left;"> data_source </th>
   <th style="text-align:left;"> maintainer </th>
   <th style="text-align:left;"> details </th>
   <th style="text-align:left;"> keywords </th>
   <th style="text-align:left;"> onboarding </th>
   <th style="text-align:left;"> citations </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> auk </td>
   <td style="text-align:left;"> eBird Data Extraction and Processing in R </td>
   <td style="text-align:left;"> http://ebird.org </td>
   <td style="text-align:left;"> Matthew Strimas-Mackey </td>
   <td style="text-align:left;"> Extract and process bird sightings records from    eBird (<http://ebird.org>), an online tool for recording bird    observations.  Public access to the full eBird database is via the    eBird Basic Dataset (EBD; see <http://ebird.org/ebird/data/download>    for access), a downloadable text file. This package is an interface to    AWK for extracting data from the EBD based on taxonomic, spatial, or    temporal filters, to produce a manageable file size that can be    imported into R. </td>
   <td style="text-align:left;"> dataset, ebird </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/136 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> antanym </td>
   <td style="text-align:left;"> Antarctic Geographic Place Names </td>
   <td style="text-align:left;"> Composite Gazetteer of Antarctica </td>
   <td style="text-align:left;"> Ben Raymond </td>
   <td style="text-align:left;"> Antarctic geographic names from the Composite Gazetteer of Antarctica, and functions for working with those place names. </td>
   <td style="text-align:left;"> Antarctic, gazetteer, placenames, SouthernOcean </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/198 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> AntWeb </td>
   <td style="text-align:left;"> programmatic interface to the AntWeb </td>
   <td style="text-align:left;"> AntWeb database from the California Academy of Sciences </td>
   <td style="text-align:left;"> Karthik Ram </td>
   <td style="text-align:left;"> A complete programmatic interface to the AntWeb database from the    California Academy of Sciences. </td>
   <td style="text-align:left;"> antweb, antweb-api, specimen-records, spocc </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 PIE, M. R. (2016). The macroevolution of climatic niches and its role in ant diversification. Ecological Entomology, 41(3), 301–307. <a href="https://doi.org/10.1111/een.12306" target="_blank">https://doi.org/10.1111/een.12306</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> bikedata </td>
   <td style="text-align:left;"> Download and Aggregate Data from Public Hire Bicycle Systems </td>
   <td style="text-align:left;"> London, U.K., from the U.S.A., San Francisco CA, New York City NY, Chicago IL, Washington DC, Boston MA,  Los Angeles LA,  Philadelphia PA, Minnesota, Montreal, Canada, and Guadalajara, Mexico. </td>
   <td style="text-align:left;"> Mark Padgham </td>
   <td style="text-align:left;"> Download and aggregate data from all public hire bicycle systems    which provide open data, currently including 'Santander' Cycles in London,    U.K.; from the U.S.A., 'Ford GoBike' in San Francisco CA, 'citibike' in New    York City NY, 'Divvy' in Chicago IL, 'Capital Bikeshare' in Washington DC,    'Hubway' in Boston MA, 'Metro' in Los Angeles LA, 'Indego' in Philadelphia    PA, and 'Nice Ride' in Minnesota; 'Bixi' from Montreal, Canada; and 'mibici'    from Guadalajara, Mexico. </td>
   <td style="text-align:left;"> bicycle-hire, bicycle-hire-systems, bike-data, bike-hire, bike-hire-systems, database </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/116 </td>
   <td style="text-align:left;"> 📃 Hosford, K., & Winters, M. 2019. Quantifying the Bicycle Share Gender Gap. Transport Findings, November. <a href="https://doi.org/10.32866/10802" target="_blank">https://doi.org/10.32866/10802</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> biomartr </td>
   <td style="text-align:left;"> Genomic Data Retrieval </td>
   <td style="text-align:left;"> NCBI RefSeq, NCBI Genbank, ENSEMBL, and UniProt databases, plus interface to BioMart database </td>
   <td style="text-align:left;"> Hajk-Georg Drost </td>
   <td style="text-align:left;"> Perform large scale genomic data retrieval and functional annotation retrieval. This package aims to provide users with a standardized                way to automate genome, proteome, 'RNA', coding sequence ('CDS'), 'GFF', and metagenome                retrieval from 'NCBI RefSeq', 'NCBI Genbank', 'ENSEMBL',                 and 'UniProt' databases. Furthermore, an interface to the 'BioMart' database                (Smedley et al. (2009) <doi:10.1186/1471-2164-10-22>) allows users to retrieve                functional annotation for genomic loci. In addition, users can download entire databases such                as 'NCBI RefSeq' (Pruitt et al. (2007) <doi:10.1093/nar/gkl842>), 'NCBI nr',                'NCBI nt', 'NCBI Genbank' (Benson et al. (2013) <doi:10.1093/nar/gks1195>), etc. with only one command. </td>
   <td style="text-align:left;"> annotation-retrieval, biological-data-retrieval, BioMart, database-retrieval, ENSEMBL, genomic-data-retrieval, NCBI </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/93 </td>
   <td style="text-align:left;"> 📃 Drost, H.-G., Gabel, A., Liu, J., Quint, M., & Grosse, I. (2017). myTAI: evolutionary transcriptomics with R. Bioinformatics. <a href="https://doi.org/10.1093/bioinformatics/btx835" target="_blank">https://doi.org/10.1093/bioinformatics/btx835</a><br>📃 Gogleva, A., Drost, H.-G., & Schornack, S. (2018). SecretSanta: flexible pipelines for functional secretome prediction. Bioinformatics. <a href="https://doi.org/10.1093/bioinformatics/bty088" target="_blank">https://doi.org/10.1093/bioinformatics/bty088</a><br>📃 Ng, P. K.-S., Li, J., Jeong, K. J., Shao, S., Chen, H., Tsang, Y. H., … Mills, G. B. (2018). Systematic Functional Annotation of Somatic Mutations in Cancer. Cancer Cell, 33(3), 450–462.e10. <a href="https://doi.org/10.1016/j.ccell.2018.01.021" target="_blank">https://doi.org/10.1016/j.ccell.2018.01.021</a><br>📃 Schwalie, P. C., Dong, H., Zachara, M., Russeil, J., Alpern, D., Akchiche, N., … Deplancke, B. (2018). A stromal cell population that inhibits adipogenesis in mammalian fat depots. Nature. <a href="https://doi.org/10.1038/s41586-018-0226-8" target="_blank">https://doi.org/10.1038/s41586-018-0226-8</a><br>📃 Wegrzyn, J. L., Falk, T., Grau, E., Buehler, S., Ramnath, R., & Herndon, N. (2019). Cyberinfrastructure and resources to enable an integrative approach to studying forest trees. Evolutionary Applications. <a href="https://doi.org/10.1111/eva.12860" target="_blank">https://doi.org/10.1111/eva.12860</a><br>📃 Karakülah, G., Arslan, N., Yandım, C., & Suner, A. (2019). TEffectR: an R package for studying the potential effects of transposable elements on gene expression with linear regression model. PeerJ, 7, e8192. <a href="https://doi.org/10.7717/peerj.8192" target="_blank">https://doi.org/10.7717/peerj.8192</a><br>📃 Noecker, C., Chiu, H. C., McNally, C. P., & Borenstein, E. (2019). Defining and evaluating microbial contributions to metabolite variation in microbiome-metabolome association studies. mSystems, 4(6). <a href="https://doi.org/10.1128/mSystems.00579-19" target="_blank">https://doi.org/10.1128/mSystems.00579-19</a><br>📃 Kim, J., Yoon, S., & Nam, D. (2020). netGO: R-Shiny package for network-integrated pathway enrichment analysis. Bioinformatics. <a href="https://doi.org/10.1093/bioinformatics/btaa077" target="_blank">https://doi.org/10.1093/bioinformatics/btaa077</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> bittrex </td>
   <td style="text-align:left;"> Client for the Bittrex Exchange </td>
   <td style="text-align:left;"> https://bittrex.com </td>
   <td style="text-align:left;"> Michael Kane </td>
   <td style="text-align:left;"> A client for the Bittrex crypto-currency exchange https://bittrex.com including the ability to query trade data, manage account balances, and place orders. </td>
   <td style="text-align:left;"> cryptocurency-exchange, cryptocurrency, finance </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/120 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> bold </td>
   <td style="text-align:left;"> Interface to Bold Systems API </td>
   <td style="text-align:left;"> http://www.boldsystems.org </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> A programmatic interface to the Web Service methods provided by    Bold Systems (<http://www.boldsystems.org/>) for genetic 'barcode' data.    Functions include methods for searching by sequences by taxonomic names,    ids, collectors, and institutions; as well as a function for searching    for specimens, and downloading trace files. </td>
   <td style="text-align:left;"> barcode, biodiversity, DNA, fasta, sequences </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Hassall, C., Owen, J., & Gilbert, F. (2016). Phenological shifts in hoverflies (Diptera: Syrphidae): linking measurement and mechanism. Ecography. <a href="https://doi.org/10.1111/ecog.02623" target="_blank">https://doi.org/10.1111/ecog.02623</a><br>📃 Bowser, M., Morton, J., Hanson, J., Magness, D., & Okuly, M. (2017). Arthropod and oligochaete assemblages from grasslands of the southern Kenai Peninsula, Alaska. Biodiversity Data Journal, 5, e10792. <a href="https://doi.org/10.3897/bdj.5.e10792" target="_blank">https://doi.org/10.3897/bdj.5.e10792</a><br>📃 Divoll, T. J., Brown, V. A., Kinne, J., McCracken, G. F., & O’Keefe, J. M. (2018). Disparities in second-generation DNA metabarcoding results exposed with accessible and repeatable workflows. Molecular Ecology Resources. <a href="https://doi.org/10.1111/1755-0998.12770" target="_blank">https://doi.org/10.1111/1755-0998.12770</a><br>📃 Cravens, Z. M., Brown, V. A., Divoll, T. J., & Boyles, J. G. (2017). Illuminating prey selection in an insectivorous bat community exposed to artificial light at night. Journal of Applied Ecology, 55(2), 705–713. <a href="https://doi.org/10.1111/1365-2664.13036" target="_blank">https://doi.org/10.1111/1365-2664.13036</a><br>📃 Collins, R. A., Bakker, J., Wangensteen, O. S., Soto, A. Z., Corrigan, L., Sims, D. W., … Mariani, S. (2019). Non‐specific amplification compromises environmental DNA metabarcoding with COI. Methods in Ecology and Evolution. <a href="https://doi.org/10.1111/2041-210x.13276" target="_blank">https://doi.org/10.1111/2041-210x.13276</a><br>📃 Piper, A. M., Batovska, J., Cogan, N. O. I., Weiss, J., Cunningham, J. P., Rodoni, B. C., & Blacket, M. J. (2019). Prospects and challenges of implementing DNA metabarcoding for high-throughput insect surveillance. GigaScience, 8(8). <a href="https://doi.org/10.1093/gigascience/giz092" target="_blank">https://doi.org/10.1093/gigascience/giz092</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> brranching </td>
   <td style="text-align:left;"> Fetch 'Phylogenies' from Many Sources </td>
   <td style="text-align:left;"> Phylomatic http://phylodiversity.net/phylomatic, and Phylocom https://github.com/phylocom/phylocom </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Includes methods for fetching 'phylogenies' from a variety    of sources, including the 'Phylomatic' web service     (<http://phylodiversity.net/phylomatic>), and 'Phylocom'     (<https://github.com/phylocom/phylocom/>). </td>
   <td style="text-align:left;"> molecular, phylogeny, phylomatic, plants, tree </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Mayor, J. R., Sanders, N. J., Classen, A. T., Bardgett, R. D., Clément, J.-C., Fajardo, A., et al. (2017). Elevation alters ecosystem properties across temperate treelines globally. Nature, 542(7639), 91–95. <a href="https://doi.org/10.1038/nature21027" target="_blank">https://doi.org/10.1038/nature21027</a><br>📃 Giroldo, A. B., Scariot, A., & Hoffmann, W. A. (2017). Trait shifts associated with the subshrub life-history strategy in a tropical savanna. Oecologia. <a href="https://doi.org/10.1007/s00442-017-3930-4" target="_blank">https://doi.org/10.1007/s00442-017-3930-4</a><br>📃 Van de Peer, T., Mereu, S., Verheyen, K., María Costa Saura, J., Morillas, L., Roales, J., … Muys, B. (2018). Tree seedling vitality improves with functional diversity in a Mediterranean common garden experiment. Forest Ecology and Management, 409, 614–633. <a href="https://doi.org/10.1016/j.foreco.2017.12.001" target="_blank">https://doi.org/10.1016/j.foreco.2017.12.001</a><br>📃 Bemmels, J. B., Wright, S. J., Garwood, N. C., Queenborough, S. A., Valencia, R., & Dick, C. W. (2018). Filter-dispersal assembly of lowland Neotropical rainforests across the Andes. Ecography. <a href="https://doi.org/10.1111/ecog.03473" target="_blank">https://doi.org/10.1111/ecog.03473</a><br>📃 Gastauer, M., Caldeira, C. F., Trotter, I., Ramos, S. J., & Neto, J. A. A. M. (2018). Optimizing community trees using the open tree of life increases the reliability of phylogenetic diversity and dispersion indices. Ecological Informatics. <a href="https://doi.org/10.1016/j.ecoinf.2018.06.008" target="_blank">https://doi.org/10.1016/j.ecoinf.2018.06.008</a><br>📃 Albert, S., Flores, O., Rouget, M., Wilding, N., & Strasberg, D. (2018). Why are woody plants fleshy-fruited at low elevations? Evidence from a high-elevation oceanic island. Journal of Vegetation Science. <a href="https://doi.org/10.1111/jvs.12676" target="_blank">https://doi.org/10.1111/jvs.12676</a><br>📃 Gill, B. A., Musili, P. M., Kurukura, S., Hassan, A. A., Goheen, J. R., Kress, W. J., … Kartzinel, T. R. (2019). Plant DNA-barcode library and community phylogeny for a semi-arid East African savanna. Molecular Ecology Resources. <a href="https://doi.org/10.1111/1755-0998.13001" target="_blank">https://doi.org/10.1111/1755-0998.13001</a><br>📃 Redmond, M. D., Morris, T. L., & Cramer, M. C. (2019). The cost of standing tall: wood nutrients associated with tree invasions in nutrient‐poor fynbos soils of South Africa. Ecosphere, 10(9). <a href="https://doi.org/10.1002/ecs2.2831" target="_blank">https://doi.org/10.1002/ecs2.2831</a><br>📃 Vidal, M. C., Quinn, T. W., Stireman, J. O., Tinghitella, R. M., & Murphy, S. M. (2019). Geography is more important than host plant use for the population genetic structure of a generalist insect herbivore. Molecular Ecology. <a href="https://doi.org/10.1111/mec.15218" target="_blank">https://doi.org/10.1111/mec.15218</a><br>📃 Bohner, T., & Diez, J. (2019). Extensive mismatches between species distributions and performance and their relationship to functional traits. Ecology Letters. <a href="https://doi.org/10.1111/ele.13396" target="_blank">https://doi.org/10.1111/ele.13396</a><br>📃 Roddy, A. B., Théroux-Rancourt, G., Abbo, T., Benedetti, J. W., Brodersen, C. R., Castro, M., … Simonin, K. A. (2019). The Scaling of Genome Size and Cell Size Limits Maximum Rates of Photosynthesis with Implications for Ecological Strategies. International Journal of Plant Sciences. <a href="https://doi.org/10.1086/706186" target="_blank">https://doi.org/10.1086/706186</a><br>📃 Herrera, C. M. (2020). Flower traits, habitat, and phylogeny as predictors of pollinator service: a plant community perspective. Ecological Monographs. <a href="https://doi.org/10.1002/ecm.1402" target="_blank">https://doi.org/10.1002/ecm.1402</a><br>📃 Théroux-Rancourt, G., Roddy, A. B., Earles, J. M., Gilbert, M. E., Zwieniecki, M. A., Boyce, C. K., … Brodersen, C. R. (2020). Maximum CO2 diffusion inside leaves is limited by the scaling of cell size and genome size. <a href="https://doi.org/10.1101/2020.01.16.904458" target="_blank">https://doi.org/10.1101/2020.01.16.904458</a><br>📃 Larson, J. E., Anacker, B. L., Wanous, S., & Funk, J. L. (2020). Ecological strategies begin at germination: Traits, plasticity and survival in the first 4 days of plant life. Functional Ecology. <a href="https://doi.org/10.1111/1365-2435.13543" target="_blank">https://doi.org/10.1111/1365-2435.13543</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> camsRad </td>
   <td style="text-align:left;"> Client for CAMS Radiation Service </td>
   <td style="text-align:left;"> Copernicus Atmosphere Monitoring Service (CAMS) </td>
   <td style="text-align:left;"> Lukas Lundstrom </td>
   <td style="text-align:left;"> Copernicus Atmosphere Monitoring Service (CAMS) Radiation Service     provides time series of global, direct, and diffuse irradiations on horizontal    surface, and direct irradiation on normal plane for the actual weather     conditions as well as for clear-sky conditions.    The geographical coverage is the field-of-view of the Meteosat satellite,    roughly speaking Europe, Africa, Atlantic Ocean, Middle East. The time coverage    of data is from 2004-02-01 up to 2 days ago. Data are available with a time step    ranging from 15 min to 1 month. For license terms and to create an account,    please see <http://www.soda-pro.com/web-services/radiation/cams-radiation-service>. </td>
   <td style="text-align:left;"> peer-reviewed </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/72 </td>
   <td style="text-align:left;"> 📃 Yang, D. (2019). Making reference solar forecasts with climatology, persistence, and their optimal convex combination. Solar Energy, 193, 981–985. <a href="https://doi.org/10.1016/j.solener.2019.10.006" target="_blank">https://doi.org/10.1016/j.solener.2019.10.006</a><br>📃 Yagli, G. M., Yang, D., Gandhi, O., & Srinivasan, D. (2019). Can we justify producing univariate machine-learning forecasts with satellite-derived solar irradiance? Applied Energy, 114122. <a href="https://doi.org/10.1016/j.apenergy.2019.114122" target="_blank">https://doi.org/10.1016/j.apenergy.2019.114122</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> ccafs </td>
   <td style="text-align:left;"> Client for 'CCAFS' 'GCM' Data </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Client for Climate Change, Agriculture, and Food Security ('CCAFS')    General Circulation Models ('GCM') data. Data is stored in Amazon 'S3', from    which we provide functions to fetch data. </td>
   <td style="text-align:left;"> agriculture, ccafs, climatechange, data, gcm, generalcirculationmodel </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/82 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> chromer </td>
   <td style="text-align:left;"> Interface to Chromosome Counts Database API </td>
   <td style="text-align:left;"> http://ccdb.tau.ac.il </td>
   <td style="text-align:left;"> Paula Andrea Martinez </td>
   <td style="text-align:left;"> A programmatic interface to the Chromosome Counts Database    (<http://ccdb.tau.ac.il/>). This package is part of the rOpenSci suite    (<https://ropensci.org>). </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Sessa, E. B., & Der, J. P. (2016). Evolutionary Genomics of Ferns and Lycophytes. Genomes and Evolution of Charophytes, Bryophytes, Lycophytes and Ferns, 215–254. <a href="https://doi.org/10.1016/bs.abr.2016.02.001" target="_blank">https://doi.org/10.1016/bs.abr.2016.02.001</a><br>📃 Zenil-Ferguson, R., Ponciano, J. M., & Burleigh, J. G. (2017). Testing the association of phenotypes with polyploidy: An example using herbaceous and woody eudicots. Evolution. <a href="https://doi.org/10.1111/evo.13226" target="_blank">https://doi.org/10.1111/evo.13226</a><br>📃 Rivero, R., Sessa, E. B., & Zenil-Ferguson, R. (2019). EyeChrom and CCDBcurator: Visualizing chromosome count data from plants. Applications in Plant Sciences, e01207. <a href="https://doi.org/10.1002/aps3.1207" target="_blank">https://doi.org/10.1002/aps3.1207</a><br>📃 Han, T., Zheng, Q., Onstein, R. E., Rojas‐Andrés, B. M., Hauenschild, F., Muellner‐Riehl, A. N., & Xing, Y. (2019). Polyploidy promotes species diversification of Allium through ecological shifts. New Phytologist. <a href="https://doi.org/10.1111/nph.16098" target="_blank">https://doi.org/10.1111/nph.16098</a><br>📃 Carta, A., Bedini, G., & Peruzzi, L. (2020). A deep dive into the ancestral chromosome number of flowering plants. bioRxiv preprint. <a href="https://doi.org/10.1101/2020.01.05.893859" target="_blank">https://doi.org/10.1101/2020.01.05.893859</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> clifro </td>
   <td style="text-align:left;"> Easily Download and Visualise Climate Data from CliFlo </td>
   <td style="text-align:left;"> https://cliflo.niwa.co.nz </td>
   <td style="text-align:left;"> Blake Seers </td>
   <td style="text-align:left;"> CliFlo is a web portal to the New Zealand National Climate    Database and provides public access (via subscription) to around 6,500    various climate stations (see <https://cliflo.niwa.co.nz/> for more    information). Collating and manipulating data from CliFlo    (hence clifro) and importing into R for further analysis, exploration and    visualisation is now straightforward and coherent. The user is required to    have an internet connection, and a current CliFlo subscription (free) if    data from stations, other than the public Reefton electronic weather    station, is sought. </td>
   <td style="text-align:left;"> api, cliflo, climate, data, opensci, rain, temperature, weather, wind, windrose, zealand </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Chambault, P., Baudena, A., Bjorndal, K. A., AR Santos, M., Bolten, A. B., & Vandeperre, F. (2019). Swirling in the ocean: immature loggerhead turtles seasonally target old anticyclonic eddies at the fringe of the North Atlantic gyre. Progress in Oceanography. <a href="https://doi.org/10.1016/j.pocean.2019.05.005" target="_blank">https://doi.org/10.1016/j.pocean.2019.05.005</a><br>📃 Atalah, J., & Forrest, B. (2019). Forecasting mussel settlement using historical data and boosted regression trees. Aquaculture Environment Interactions, 11, 625–638. <a href="https://doi.org/10.3354/aei00337" target="_blank">https://doi.org/10.3354/aei00337</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> comtradr </td>
   <td style="text-align:left;"> Interface with the United Nations Comtrade API </td>
   <td style="text-align:left;"> https://comtrade.un.org/data </td>
   <td style="text-align:left;"> Chris Muir </td>
   <td style="text-align:left;"> Interface with and extract data from the United Nations Comtrade   API <https://comtrade.un.org/data/>. Comtrade provides country level shipping   data for a variety of commodities, these functions allow for easy API query   and data returned as a tidy data frame. </td>
   <td style="text-align:left;"> api, comtrade, peer-reviewed, supply-chain </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/141 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> cRegulome </td>
   <td style="text-align:left;"> Obtain and Visualize Regulome-Gene Expression Correlations in Cancer </td>
   <td style="text-align:left;"> Cistrome Cancer Liu et al. (2011) <doi:10.1186/gb-2011-12-8-r83> and miRCancerdb databases (in press). </td>
   <td style="text-align:left;"> Mahmoud Ahmed </td>
   <td style="text-align:left;"> Builds a 'SQLite' database file of pre-calculated transcription     factor/microRNA-gene correlations (co-expression) in cancer from the     Cistrome Cancer Liu et al. (2011) <doi:10.1186/gb-2011-12-8-r83> and     'miRCancerdb' databases (in press). Provides custom classes and functions     to query, tidy and plot the correlation data. </td>
   <td style="text-align:left;"> cancer-genomics, database, datascience, microrna, peer-reviewed, tcga-data, transcription-factors </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/149 </td>
   <td style="text-align:left;"> 📃 Ahmed, M., Nguyen, H., Lai, T., & Kim, D. R. (2018). miRCancerdb: a database for correlation analysis between microRNA and gene expression in cancer. BMC Research Notes, 11(1). <a href="https://doi.org/10.1186/s13104-018-3160-9" target="_blank">https://doi.org/10.1186/s13104-018-3160-9</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> dappr </td>
   <td style="text-align:left;"> General Purpose Client for 'OPeNDAP' Servers </td>
   <td style="text-align:left;"> https://www.opendap.org </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Client for 'OPeNDAP' servers. Includes    functions to search for 'datasets', get summary information on    'datasets', and fetch 'datasets', in either 'csv' or 'netCDF' format.    'OPeNDAP' information: <https://www.opendap.org/>. </td>
   <td style="text-align:left;"> api, api-client, opendap, opendata </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> dbhydroR </td>
   <td style="text-align:left;"> 'DBHYDRO' Hydrologic and Water Quality Data </td>
   <td style="text-align:left;"> https://www.sfwmd.gov/science-data/dbhydro </td>
   <td style="text-align:left;"> Joseph Stachelek </td>
   <td style="text-align:left;"> Client for programmatic access to the South Florida Water  Management District's 'DBHYDRO' database at   <https://www.sfwmd.gov/science-data/dbhydro>, with functions  for accessing hydrologic and water quality data. </td>
   <td style="text-align:left;"> ecology, geoscience, government-data, groundwater, peer-reviewed, water-quality, water-resources </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/61 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> DoOR.data </td>
   <td style="text-align:left;"> A DoOR to the Complete Olfactome </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Daniel Münch </td>
   <td style="text-align:left;"> This is a data package providing Drosophila odorant response data for    DoOR.functions. See URLs for the original and the DoOR 2.0 publications. </td>
   <td style="text-align:left;"> peer-reviewed </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/35 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> ecoengine </td>
   <td style="text-align:left;"> Programmatic Interface to the Web Service Methods Provided by UC Berkeley's Natural History Data </td>
   <td style="text-align:left;"> https://ecoengine.berkeley.edu </td>
   <td style="text-align:left;"> Karthik Ram </td>
   <td style="text-align:left;"> The ecoengine ('ecoengine';    <https://ecoengine.berkeley.edu/>). provides access to more than 5 million georeferenced    specimen records from the University of California, Berkeley's Natural History    Museums. </td>
   <td style="text-align:left;"> berkeley-ecoinformatics-engine, ecoengine, spocc </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> epubr </td>
   <td style="text-align:left;"> Read EPUB File Metadata and Text </td>
   <td style="text-align:left;"> EPUB e-books. </td>
   <td style="text-align:left;"> Matthew Leonawicz </td>
   <td style="text-align:left;"> Provides functions supporting the reading and parsing of internal e-book content from EPUB files.     The 'epubr' package provides functions supporting the reading and parsing of internal e-book content from EPUB files.     E-book metadata and text content are parsed separately and joined together in a tidy, nested tibble data frame.     E-book formatting is not completely standardized across all literature.     It can be challenging to curate parsed e-book content across an arbitrary collection of e-books     perfectly and in completely general form, to yield a singular, consistently formatted output.     Many EPUB files do not even contain all the same pieces of information in their respective metadata.     EPUB file parsing functionality in this package is intended for relatively general application to arbitrary EPUB e-books.     However, poorly formatted e-books or e-books with highly uncommon formatting may not work with this package.     There may even be cases where an EPUB file has DRM or some other property that makes it impossible to read with 'epubr'.     Text is read 'as is' for the most part. The only nominal changes are minor substitutions, for example curly quotes changed to straight quotes.     Substantive changes are expected to be performed subsequently by the user as part of their text analysis.     Additional text cleaning can be performed at the user's discretion, such as with functions from packages like 'tm' or 'qdap'. </td>
   <td style="text-align:left;"> epub, epub-files, epub-format, peer-reviewed </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/222 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> essurvey </td>
   <td style="text-align:left;"> Download Data from the European Social Survey on the Fly </td>
   <td style="text-align:left;"> http://www.europeansocialsurvey.org </td>
   <td style="text-align:left;"> Jorge Cimentada </td>
   <td style="text-align:left;"> Download data from the European Social Survey directly from their website <http://www.europeansocialsurvey.org/>. There are two families of functions that allow you to download and interactively check all countries and rounds available. </td>
   <td style="text-align:left;"> ess </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> FedData </td>
   <td style="text-align:left;"> Functions to Automate Downloading Geospatial Data
    Available from Several Federated Data Sources </td>
   <td style="text-align:left;"> National Elevation Dataset National Hydrography Dataset (USGS), The Soil Survey Geographic (SSURGO) database, the Global Historical Climatology Network (GHCN), the Daymet gridded estimates of daily weather parameters, the International Tree Ring Data Bank, and the National Land Cover Database (NLCD). </td>
   <td style="text-align:left;"> R. Kyle Bocinsky </td>
   <td style="text-align:left;"> Functions to automate downloading geospatial data    available from several federated data sources (mainly sources    maintained by the US Federal government). Currently, the package    enables extraction from seven datasets: The National Elevation Dataset    digital elevation models (1 and 1/3 arc-second; USGS); The National    Hydrography Dataset (USGS); The Soil Survey Geographic (SSURGO)    database from the National Cooperative Soil Survey (NCSS), which is    led by the Natural Resources Conservation Service (NRCS) under the    USDA; the Global Historical Climatology Network (GHCN), coordinated by    National Climatic Data Center at NOAA; the Daymet gridded estimates of    daily weather parameters for North America, version 3, available from    the Oak Ridge National Laboratory's Distributed Active Archive Center    (DAAC); the International Tree Ring Data Bank; and the National Land    Cover Database (NLCD). </td>
   <td style="text-align:left;"> peer-reviewed </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/13 </td>
   <td style="text-align:left;"> 📃 McAfee, S. A., McCabe, G. J., Gray, S. T., & Pederson, G. T. (2018). Changing station coverage impacts temperature trends in the Upper Colorado River Basin. International Journal of Climatology. <a href="https://doi.org/10.1002/joc.5898" target="_blank">https://doi.org/10.1002/joc.5898</a><br>📃 Medury, A., Griswold, J. B., Huang, L., & Grembek, O. (2019). Pedestrian Count Expansion Methods: Bridging the Gap between Land Use Groups and Empirical Clusters. Transportation Research Record: Journal of the Transportation Research Board, 036119811983826. <a href="https://doi.org/10.1177/0361198119838266" target="_blank">https://doi.org/10.1177/0361198119838266</a><br>📃 Meisner, J., Clifford, W. R., Wohrle, R. D., Kangiser, D., & Rabinowitz, P. (2019). Soil and climactic predictors of canine coccidioidomycosis seroprevalence in Washington State: an ecological cross‐sectional study. Transboundary and Emerging Diseases. <a href="https://doi.org/10.1111/tbed.13265" target="_blank">https://doi.org/10.1111/tbed.13265</a><br>📃 Saadi, M., Oudin, L., & Ribstein, P. (2019). Random Forest Ability in Regionalizing Hourly Hydrological Model Parameters. Water, 11(8), 1540. <a href="https://doi.org/10.3390/w11081540" target="_blank">https://doi.org/10.3390/w11081540</a><br>📃 Hong, T., Xu, Y., Sun, K., Zhang, W., & Luo, X. (2019). Visualizing Urban Microclimate and Quantifying its Impact on Building Energy Use in San Francisco. Proceedings of the 1st ACM International Workshop on Urban Building Energy Sensing, Controls, Big Data Analysis, and Visualization  - UrbSys’19. <a href="https://doi.org/10.1145/3363459.3363536" target="_blank">https://doi.org/10.1145/3363459.3363536</a><br>📃 Martinez-Feria, R. A., & Basso, B. (2020). Unstable crop yields reveal opportunities for site-specific adaptations to climate variability. Scientific Reports, 10(1). <a href="https://doi.org/10.1038/s41598-020-59494-2" target="_blank">https://doi.org/10.1038/s41598-020-59494-2</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> fingertipsR </td>
   <td style="text-align:left;"> Fingertips Data for Public Health </td>
   <td style="text-align:left;"> http://fingertips.phe.org.uk </td>
   <td style="text-align:left;"> Sebastian Fox </td>
   <td style="text-align:left;"> Fingertips (<http://fingertips.phe.org.uk/>) contains data for many indicators of public health in England. The underlying data is now more easily accessible by making use of the API. </td>
   <td style="text-align:left;"> api-wrapper, cran, fingertips, health, open-data, peer-reviewed, public-health, public-health-england </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/168 </td>
   <td style="text-align:left;"> 📃 Fox, S., Flowers, J., Thelwall, S., Flint, D., & Hain, D. (2017). fingertipsR: an R package for accessing population health information in England. <a href="https://doi.org/10.1101/189167" target="_blank">https://doi.org/10.1101/189167</a><br>📃 Senior, S. (2020, February 4). Does Sure Start spending improve school readiness? An ecological longitudinal study. <a href="https://doi.org/10.31235/osf.io/rbcz5" target="_blank">https://doi.org/10.31235/osf.io/rbcz5</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> genderdata </td>
   <td style="text-align:left;"> Historical Datasets for Predicting Gender from Names </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Lincoln Mullen </td>
   <td style="text-align:left;"> The historical datasets in this package are used in the 'gender'    package to predict gender from first names and birth years. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> getCRUCLdata </td>
   <td style="text-align:left;"> 'CRU' 'CL' v. 2.0 Climatology Client </td>
   <td style="text-align:left;"> https://crudata.uea.ac.uk/cru/data/hrg/tmc/readme.txt </td>
   <td style="text-align:left;"> Adam Sparks </td>
   <td style="text-align:left;"> Provides functions that automate downloading and importing    University of East Anglia Climate Research Unit ('CRU') 'CL' v. 2.0    climatology data, facilitates the calculation of minimum temperature and    maximum temperature and formats the data into a tidy data frame as a    'tibble' or a list of 'raster' 'stack' objects for use.  'CRU' 'CL' v. 2.0    data are a gridded climatology of 1961-1990 monthly means released in 2002    and cover all land areas (excluding Antarctica) at 10 arcminutes    (0.1666667 degree) resolution.  For more information see the description of    the data provided by the University of East Anglia Climate Research Unit,    <https://crudata.uea.ac.uk/cru/data/hrg/tmc/readme.txt>. </td>
   <td style="text-align:left;"> anglia-cru, climate-data, cru-cl2, data-access, diurnal-temperature, elevation, frost, rainfall, relative-humidity, solar-radiation, temperature, wind </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/96 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> getlandsat </td>
   <td style="text-align:left;"> Get Landsat 8 Data from Amazon Public Data Sets </td>
   <td style="text-align:left;"> https://registry.opendata.aws/landsat-8 </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Get Landsat 8 Data from Amazon Web Services ('AWS')    public data sets (<https://registry.opendata.aws/landsat-8/>).    Includes functions for listing images and fetching them, and handles    caching to prevent unnecessary additional requests. </td>
   <td style="text-align:left;"> aws, earth, image, imaging, landsat, nasa, usgs </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/58 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> GSODR </td>
   <td style="text-align:left;"> Global Surface Summary of the Day ('GSOD') Weather Data Client </td>
   <td style="text-align:left;"> http://www1.ncdc.noaa.gov/pub/data/gsod/readme.txt </td>
   <td style="text-align:left;"> Adam Sparks </td>
   <td style="text-align:left;"> Provides automated downloading, parsing, cleaning, unit conversion    and formatting of Global Surface Summary of the Day ('GSOD') weather data    from the from the USA National Centers for Environmental Information    ('NCEI').  Units are converted from from United States Customary System    ('USCS') units to International System of Units ('SI').  Stations may be    individually checked for number of missing days defined by the user, where    stations with too many missing observations are omitted.  Only stations with    valid reported latitude and longitude values are permitted in the final    data.  Additional useful elements, saturation vapour pressure ('es'), actual    vapour pressure ('ea') and relative humidity ('RH') are calculated from the    original data using the improved August-Roche-Magnus approximation (Alduchov    & Eskridge 1996) and included in the final data set.  The resulting metadata    include station identification information, country, state, latitude,    longitude, elevation, weather observations and associated flags.  For    information on the 'GSOD' data from 'NCEI', please see the 'GSOD'    'readme.txt' file available from,    <http://www1.ncdc.noaa.gov/pub/data/gsod/readme.txt>. </td>
   <td style="text-align:left;"> data-access, global-weather, meteorological-data, meteorology, station-data, surface-weather, US-NCDC, US-NCEI, weather, weather-data </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/79 </td>
   <td style="text-align:left;"> 📃 H Sparks, A., Hengl, T., & Nelson, A. (2017). GSODR: Global Summary Daily Weather Data in R. The Journal of Open Source Software, 2(10). <a href="https://doi.org/10.21105/joss.00177" target="_blank">https://doi.org/10.21105/joss.00177</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> gtfsr </td>
   <td style="text-align:left;"> Working with GTFS (General Transit Feed Specification) feeds in R </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Danton Noriega-Goodwin </td>
   <td style="text-align:left;"> Provides API wrappers for popular public GTFS feed sharing sites, reads feed data into a gtfs data object, validates data quality, provides convenience functions for common tasks. </td>
   <td style="text-align:left;"> peer-reviewed </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/55 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> gutenbergr </td>
   <td style="text-align:left;"> Download and Process Public Domain Works from Project Gutenberg </td>
   <td style="text-align:left;"> http://www.gutenberg.org </td>
   <td style="text-align:left;"> David Robinson </td>
   <td style="text-align:left;"> Download and process public domain works in the Project    Gutenberg collection <http://www.gutenberg.org/>. Includes metadata for    all Project Gutenberg works, so that they can be searched and retrieved. </td>
   <td style="text-align:left;"> peer-reviewed </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> hathi </td>
   <td style="text-align:left;"> An R client for 'HathiTrust' API </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> An R client for 'HathiTrust' API. Only for the bibliographic     API for now. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> hddtools </td>
   <td style="text-align:left;"> Hydrological Data Discovery Tools </td>
   <td style="text-align:left;"> various data providers </td>
   <td style="text-align:left;"> Claudia Vitolo </td>
   <td style="text-align:left;"> Tools to discover hydrological data, accessing catalogues and databases from various data providers. </td>
   <td style="text-align:left;"> data60uk, grdc, hydrology, kgclimateclass, mopex, peer-reviewed, precipitation, sepa </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/73 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> helminthR </td>
   <td style="text-align:left;"> Access London Natural History Museum Host-Helminth Record Database </td>
   <td style="text-align:left;"> http://www.nhm.ac.uk/research-curation/scientific-resources/taxonomy-systematics/host-parasites </td>
   <td style="text-align:left;"> Tad Dallas </td>
   <td style="text-align:left;"> Access to large host-parasite data is often hampered by the   availability of data and difficulty in obtaining it in a programmatic way  to encourage analyses. 'helminthR' provides a programmatic interface to the   London Natural History Museum's host-parasite database, one of the largest   host-parasite databases existing currently <http://www.nhm.ac.uk/research-curation/scientific-resources/taxonomy-systematics/host-parasites/>. The package allows the user  to query by host species, parasite species, and geographic location. </td>
   <td style="text-align:left;"> disease-networks, helminth, open-data, parasites </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Dallas, T., & Cornelius, E. (2015). Co-extinction in a host-parasite network: identifying key hosts for network stability. Scientific Reports, 5, 13185. <a href="https://doi.org/10.1038/srep13185" target="_blank">https://doi.org/10.1038/srep13185</a><br>📃 Singh, S. K. (2017). Evaluating two freely available geocoding tools for geographical inconsistencies and geocoding errors. Open Geospatial Data, Software and Standards, 2(1). <a href="https://doi.org/10.1186/s40965-017-0026-3" target="_blank">https://doi.org/10.1186/s40965-017-0026-3</a><br>📃 Mulder, C. (2017). Pathogenic helminths in the past: Much ado about nothing. F1000Research, 6, 852. <a href="https://doi.org/10.12688/f1000research.11752.1" target="_blank">https://doi.org/10.12688/f1000research.11752.1</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> historydata </td>
   <td style="text-align:left;"> Datasets for Historians </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Lincoln Mullen </td>
   <td style="text-align:left;"> These sample data sets are intended for historians    learning R. They include population, institutional, religious,    military, and prosopographical data suitable for mapping,    quantitative analysis, and network analysis. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> hydroscoper </td>
   <td style="text-align:left;"> Interface to the Greek National Data Bank for Hydrometeorological Information </td>
   <td style="text-align:left;"> http://www.hydroscope.gr </td>
   <td style="text-align:left;"> Konstantinos Vantas </td>
   <td style="text-align:left;"> R interface to the Greek National Data Bank for Hydrological and     Meteorological Information <http://www.hydroscope.gr/>. It covers     Hydroscope's data sources and provides functions to transliterate,     translate and download them into tidy dataframes. </td>
   <td style="text-align:left;"> climate, greece, hydrology, hydrometeorology, hydroscope, meteorological-data, meteorological-stations, peer-reviewed, tidy-data, time-series, water-resources </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/185 </td>
   <td style="text-align:left;"> 📃 Vantas, K. (2018). hydroscoper: R interface to the Greek National Data Bank for Hydrological and Meteorological Information. Journal of Open Source Software, 3(23), 625. <a href="https://doi.org/10.21105/joss.00625" target="_blank">https://doi.org/10.21105/joss.00625</a><br>📃 Vantas, K., Sidiropoulos, E., & Loukas, A. (2019). Robustness Spatiotemporal Clustering and Trend Detection of Rainfall Erosivity Density in Greece. Water, 11(5), 1050. <a href="https://doi.org/10.3390/w11051050" target="_blank">https://doi.org/10.3390/w11051050</a><br>📃 Vantas, K., Sidiropoulos, E., & Loukas, A. (2020). Estimating Current and Future Rainfall Erosivity in Greece Using Regional Climate Models and Spatial Quantile Regression Forests. Water, 12(3), 687. <a href="https://doi.org/10.3390/w12030687" target="_blank">https://doi.org/10.3390/w12030687</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> internetarchive </td>
   <td style="text-align:left;"> An API Client for the Internet Archive </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Lincoln Mullen </td>
   <td style="text-align:left;"> Search the Internet Archive, retrieve metadata, and download    files. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> isdparser </td>
   <td style="text-align:left;"> Parse 'NOAA' Integrated Surface Data Files </td>
   <td style="text-align:left;"> https://www.ncdc.noaa.gov/isd </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Tools for parsing 'NOAA' Integrated Surface Data ('ISD') files,    described at <https://www.ncdc.noaa.gov/isd>. Data includes for example,    wind speed and direction, temperature, cloud data, sea level pressure,    and more. Includes data from approximately 35,000 stations worldwide,    though best coverage is in North America/Europe/Australia. Data is stored    as variable length ASCII character strings, with most fields optional.    Included are tools for parsing entire files, or individual lines of data. </td>
   <td style="text-align:left;"> climate, data, ISD, NOAA, stations </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> jaod </td>
   <td style="text-align:left;"> Directory of Open Access Journals Client </td>
   <td style="text-align:left;"> https://doaj.org </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Client for the Directory of Open Access Journals ('DOAJ')    (<https://doaj.org/>). API documentation at    <https://doaj.org/api/v1/docs>. Methods included for working with    all 'DOAJ' API routes: fetch article information by identifier,    search for articles, fetch journal information by identifier,    and search for journals. </td>
   <td style="text-align:left;"> citations, full-text, literature, metadata, pdf, publications, text-ming, xml </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> MODIStsp </td>
   <td style="text-align:left;"> A Tool for Automating Download and Preprocessing of MODIS Land Products
    Data </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Lorenzo Busetto </td>
   <td style="text-align:left;"> Allows automating the creation of time series of rasters derived    from MODIS Satellite Land Products data. It performs several typical    preprocessing steps such as download, mosaicking, reprojection and resize    of data acquired on a specified time period. All processing parameters    can be set using a user-friendly GUI. Users can select which layers of    the original MODIS HDF files they want to process, which additional    Quality Indicators should be extracted from aggregated MODIS Quality    Assurance layers and, in the case of Surface Reflectance products    , which Spectral Indexes should be computed from the original reflectance    bands. For each output layer, outputs are saved as single-band raster    files corresponding to each available acquisition date. Virtual files    allowing access to the entire time series as a single file are also created.    Command-line execution exploiting a previously saved processing options    file is also possible, allowing to automatically update time series    related to a MODIS product whenever a new image is available. </td>
   <td style="text-align:left;"> gdal, modis, modis-data, modis-land-products, peer-reviewed, preprocessing, remote-sensing, satellite-imagery, time-series </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/184 </td>
   <td style="text-align:left;"> 📃 Busetto, L., & Ranghetti, L. (2016). MODIStsp : An  R  package for automatic preprocessing of MODIS Land Products time series. Computers & Geosciences, 97, 40–48. <a href="https://doi.org/10.1016/j.cageo.2016.08.020" target="_blank">https://doi.org/10.1016/j.cageo.2016.08.020</a><br>📃 Bellón, B., Bégué, A., Lo Seen, D., de Almeida, C., & Simões, M. (2017). A Remote Sensing Approach for Regional-Scale Mapping of Agricultural Land-Use Systems Based on NDVI Time Series. Remote Sensing, 9(6), 600. <a href="https://doi.org/10.3390/rs9060600" target="_blank">https://doi.org/10.3390/rs9060600</a><br>📃 Hurtado, L. A., Calzada, J. E., Rigg, C. A., Castillo, M., & Chaves, L. F. (2018). Climatic fluctuations and malaria transmission dynamics, prior to elimination, in Guna Yala, República de Panamá. Malaria Journal, 17(1). <a href="https://doi.org/10.1186/s12936-018-2235-3" target="_blank">https://doi.org/10.1186/s12936-018-2235-3</a><br>📃 Ranghetti, L., Cardarelli, E., Boschetti, M., Busetto, L., & Fasola, M. (2018). Assessment of Water Management Changes in the Italian Rice Paddies from 2000 to 2016 Using Satellite Data: A Contribution to Agro-Ecological Studies. Remote Sensing, 10(3), 416. <a href="https://doi.org/10.3390/rs10030416" target="_blank">https://doi.org/10.3390/rs10030416</a><br>📃 Bellón, B., Bégué, A., Lo Seen, D., Lebourgeois, V., Evangelista, B. A., Simões, M., & Demonte Ferraz, R. P. (2018). Improved regional-scale Brazilian cropping systems’ mapping based on a semi-automatic object-based clustering approach. International Journal of Applied Earth Observation and Geoinformation, 68, 127–138. <a href="https://doi.org/10.1016/j.jag.2018.01.019" target="_blank">https://doi.org/10.1016/j.jag.2018.01.019</a><br>📃 Manfron, G., Delmotte, S., Busetto, L., Hossard, L., Ranghetti, L., Brivio, P. A., & Boschetti, M. (2017). Estimating inter-annual variability in winter wheat sowing dates from satellite time series in Camargue, France. International Journal of Applied Earth Observation and Geoinformation, 57, 190–201. <a href="https://doi.org/10.1016/j.jag.2017.01.001" target="_blank">https://doi.org/10.1016/j.jag.2017.01.001</a><br>📃 Araya, S., Ostendorf, B., Lyle, G., & Lewis, M. (2018). CropPhenology: An R package for extracting crop phenology from time series remotely sensed vegetation index imagery. Ecological Informatics, 46, 45–56. <a href="https://doi.org/10.1016/j.ecoinf.2018.05.006" target="_blank">https://doi.org/10.1016/j.ecoinf.2018.05.006</a><br>📃 Adisa, O., Botai, J., Hassen, A., Darkey, D., Adeola, A., Tesfamariam, E., … Adisa, A. (2018). Variability of Satellite Derived Phenological Parameters across Maize Producing Areas of South Africa. Sustainability, 10(9), 3033. <a href="https://doi.org/10.3390/su10093033" target="_blank">https://doi.org/10.3390/su10093033</a><br>📃 Granell, C., Miralles, I., Rodríguez-Pupo, L., González-Pérez, A., Casteleyn, S., Busetto, L., … Huerta, J. (2017). Conceptual Architecture and Service-Oriented Implementation of a Regional Geoportal for Rice Monitoring. ISPRS International Journal of Geo-Information, 6(7), 191. <a href="https://doi.org/10.3390/ijgi6070191" target="_blank">https://doi.org/10.3390/ijgi6070191</a><br>📃 Boschetti, M., Busetto, L., Manfron, G., Laborte, A., Asilo, S., Pazhanivelan, S., & Nelson, A. (2017). PhenoRice: A method for automatic extraction of spatio-temporal information on rice crops using satellite data time series. Remote Sensing of Environment, 194, 347–365. <a href="https://doi.org/10.1016/j.rse.2017.03.029" target="_blank">https://doi.org/10.1016/j.rse.2017.03.029</a><br>📃 Nutini, F., Stroppiana, D., Busetto, L., Bellingeri, D., Corbari, C., Mancini, M., … Boschetti, M. (2017). A Weekly Indicator of Surface Moisture Status from Satellite Data for Operational Monitoring of Crop Conditions. Sensors, 17(6), 1338. <a href="https://doi.org/10.3390/s17061338" target="_blank">https://doi.org/10.3390/s17061338</a><br>📃 Moura, M. M., dos Santos, A. R., Pezzopane, J. E. M., Alexandre, R. S., da Silva, S. F., Pimentel, S. M., … de Carvalho, J. R. (2019). Relation of El Niño and La Niña phenomena to precipitation, evapotranspiration and temperature in the Amazon basin. Science of The Total Environment, 651, 1639–1651. <a href="https://doi.org/10.1016/j.scitotenv.2018.09.242" target="_blank">https://doi.org/10.1016/j.scitotenv.2018.09.242</a><br>📃 Hurtado, L., Rigg, C., Calzada, J., Dutary, S., Bernal, D., Koo, S., & Chaves, L. (2018). Population Dynamics of Anopheles albimanus (Diptera: Culicidae) at Ipetí-Guna, a Village in a Region Targeted for Malaria Elimination in Panamá. Insects, 9(4), 164. <a href="https://doi.org/10.3390/insects9040164" target="_blank">https://doi.org/10.3390/insects9040164</a><br>📃 Sodnomov, B. V., Ayurzhanaev, A. A., Tsydypov, B. Z., Garmaev, E. Z., & Tulokhonov, A. K. (2018). Software for analysis of vegetation indices dynamics. IOP Conference Series: Earth and Environmental Science, 211, 012083. <a href="https://doi.org/10.1088/1755-1315/211/1/012083" target="_blank">https://doi.org/10.1088/1755-1315/211/1/012083</a><br>📃 Marcos, B., Gonçalves, J., Alcaraz-Segura, D., Cunha, M., & Honrado, J. P. (2019). Improving the detection of wildfire disturbances in space and time based on indicators extracted from MODIS data: a case study in northern Portugal. International Journal of Applied Earth Observation and Geoinformation, 78, 77–85. <a href="https://doi.org/10.1016/j.jag.2018.12.003" target="_blank">https://doi.org/10.1016/j.jag.2018.12.003</a><br>📃 Rigg, C. A., Hurtado, L. A., Calzada, J. E., & Chaves, L. F. (2019). Malaria infection rates in Anopheles albimanus (Diptera: Culicidae) at Ipetí-Guna, a village within a region targeted for malaria elimination in Panamá. Infection, Genetics and Evolution, 69, 216–223. <a href="https://doi.org/10.1016/j.meegid.2019.02.003" target="_blank">https://doi.org/10.1016/j.meegid.2019.02.003</a><br>📃 Nghiem, J., Potter, C., & Baiman, R. (2019). Detection of Vegetation Cover Change in Renewable Energy Development Zones of Southern California Using MODIS NDVI Time Series Analysis, 2000 to 2018. Environments, 6(4), 40. <a href="https://doi.org/10.3390/environments6040040" target="_blank">https://doi.org/10.3390/environments6040040</a><br>📃 Marcos, B., Gonçalves, J., Alcaraz-Segura, D., Cunha, M., & Honrado, J. P. (2019). Improving the detection of wildfire disturbances in space and time based on indicators extracted from MODIS data: a case study in northern Portugal. International Journal of Applied Earth Observation and Geoinformation, 78, 77-85. <a href="https://doi.org/10.1016/j.jag.2018.12.003" target="_blank">https://doi.org/10.1016/j.jag.2018.12.003</a><br>📃 Bhattarai, N., Mallick, K., Stuart, J., Vishwakarma, B. D., Niraula, R., Sen, S., & Jain, M. (2019). An automated multi-model evapotranspiration mapping framework using remotely sensed and reanalysis data. Remote Sensing of Environment, 229, 69–92. <a href="https://doi.org/10.1016/j.rse.2019.04.026" target="_blank">https://doi.org/10.1016/j.rse.2019.04.026</a><br>📃 Adeola, A. M., Botai, J. O., Mukarugwiza Olwoch, J., DeW. Rautenbach, H. C. J., Adisa, O. M., De Jager, C., … Aaron, M. (2019). Predicting malaria cases using remotely sensed environmental variables in Nkomazi, South Africa. Geospatial Health, 14(1). <a href="https://doi.org/10.4081/gh.2019.676" target="_blank">https://doi.org/10.4081/gh.2019.676</a><br>📃 Nelli, L., Ferguson, H. M., & Matthiopoulos, J. (2019). Achieving explanatory depth and spatial breadth in infectious disease modelling: Integrating active and passive case surveillance. Statistical Methods in Medical Research, 096228021985638. <a href="https://doi.org/10.1177/0962280219856380" target="_blank">https://doi.org/10.1177/0962280219856380</a><br>📃 Pilogallo, A., Saganeiti, L., Scorza, F., & Murgante, B. (2019). Investigating Urban Growth Dynamic – Land Surface Temperature Relationship. Lecture Notes in Computer Science, 701–710. <a href="https://doi.org/10.1007/978-3-030-24302-9_51" target="_blank">https://doi.org/10.1007/978-3-030-24302-9_51</a><br>📃 Verstraeten, W. W., Dujardin, S., Hoebeke, L., Bruffaerts, N., Kouznetsov, R., Dendoncker, N., … Delcloo, A. W. (2019). Spatio-temporal monitoring and modelling of birch pollen levels in Belgium. Aerobiologia. <a href="https://doi.org/10.1007/s10453-019-09607-w" target="_blank">https://doi.org/10.1007/s10453-019-09607-w</a><br>📃 Yoo, B. H., Kim, K. S., & Lee, J. (2019). MODIS 대기자료를 활용한 남북한 기상관측소에서의 냉방도일 추정. 한국농림기상학회지, 21(2), 97–109. <a href="https://doi.org/10.5532/KJAFM.2019.21.2.97" target="_blank">https://doi.org/10.5532/KJAFM.2019.21.2.97</a><br>📃 Mpandeli, S., Nhamo, L., Moeletsi, M., Masupha, T., Magidi, J., Tshikolomo, K., … Mabhaudhi, T. (2019). Assessing climate change and adaptive capacity at local scale using observed and remotely sensed data. Weather and Climate Extremes, 26, 100240. <a href="https://doi.org/10.1016/j.wace.2019.100240" target="_blank">https://doi.org/10.1016/j.wace.2019.100240</a><br>📃 Badreldin, N., Abu Hatab, A., & Lagerkvist, C.-J. (2019). Spatiotemporal dynamics of urbanization and cropland in the Nile Delta of Egypt using machine learning and satellite big data: implications for sustainable development. Environmental Monitoring and Assessment, 191(12). <a href="https://doi.org/10.1007/s10661-019-7934-x" target="_blank">https://doi.org/10.1007/s10661-019-7934-x</a><br>📃 Estrada-Peña, A., Nava, S., Tarragona, E., Bermúdez, S., de la Fuente, J., Domingos, A., … Guglielmone, A. A. (2019). Species occurrence of ticks in South America, and interactions with biotic and abiotic traits. Scientific Data, 6(1). <a href="https://doi.org/10.1038/s41597-019-0314-0" target="_blank">https://doi.org/10.1038/s41597-019-0314-0</a><br>📃 Fatikhunnada, A., Liyantono, Solahudin, M., Buono, A., Kato, T., & Seminar, K. B. (2020). Assessment of pre-treatment and classification methods for Java paddy field cropping pattern detection on MODIS images. Remote Sensing Applications: Society and Environment, 17, 100281. <a href="https://doi.org/10.1016/j.rsase.2019.100281" target="_blank">https://doi.org/10.1016/j.rsase.2019.100281</a><br>📃 Akpoti, K., Kabo-bah, A. T., Dossou-Yovo, E. R., Groen, T. A., & Zwart, S. J. (2020). Mapping suitability for rice production in inland valley landscapes in Benin and Togo using environmental niche modeling. Science of The Total Environment, 709, 136165. <a href="https://doi.org/10.1016/j.scitotenv.2019.136165" target="_blank">https://doi.org/10.1016/j.scitotenv.2019.136165</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> musemeta </td>
   <td style="text-align:left;"> Client for Scraping Museum Metadata </td>
   <td style="text-align:left;"> Many different museums, including the MET, Getty Museum, and more </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Scrape museum metadata. Includes many    different museums, including the MET, Getty Museum, and    more. New museums are added occassionally. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> nasapower </td>
   <td style="text-align:left;"> NASA POWER API Client </td>
   <td style="text-align:left;"> https://power.larc.nasa.gov </td>
   <td style="text-align:left;"> Adam H. Sparks </td>
   <td style="text-align:left;"> Client for 'NASA' 'POWER' global meteorology, surface solar    energy and climatology data 'API'.  'POWER' (Prediction Of Worldwide Energy    Resource) data are freely available global meteorology and surface solar    energy climatology data for download with a resolution of 1/2 by 1/2 arc    degree longitude and latitude and are funded through the 'NASA' Earth    Science Directorate Applied Science Program.  For more on the data    themselves, a web-based data viewer and web access, please see    <https://power.larc.nasa.gov/>. </td>
   <td style="text-align:left;"> agroclimatology, climate-data, data-access, earth-science, global, meteorological-data, meteorology, NASA, NASA-POWER, weather, weather, weather-data </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/155 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> natserv </td>
   <td style="text-align:left;"> 'NatureServe' Interface </td>
   <td style="text-align:left;"> https://www.natureserve.org </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Interface to 'NatureServe' (<https://www.natureserve.org>).    Includes methods to get data, image metadata, search taxonomic names,    and make maps. </td>
   <td style="text-align:left;"> API, maps, metadata, NatureServe, species, taxonomy, web-services </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> neotoma </td>
   <td style="text-align:left;"> Access to the Neotoma Paleoecological Database Through R </td>
   <td style="text-align:left;"> http://api.neotomadb.org </td>
   <td style="text-align:left;"> Simon J. Goring </td>
   <td style="text-align:left;"> Access paleoecological datasets from the Neotoma Paleoecological    Database using the published API (<http://api.neotomadb.org/>).  The functions    in this package access various pre-built API functions and attempt to return    the results from Neotoma in a usable format for researchers and the public. </td>
   <td style="text-align:left;"> cran, neotoma, neotoma-apis, neotoma-database, nsf, paleoecology </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Nanavati, W. P., Whitlock, C., Iglesias, V., & de Porras, M. E. (2019). Postglacial vegetation, fire, and climate history along the eastern Andes, Argentina and Chile (lat. 41–55°S). Quaternary Science Reviews, 207, 145–160. <a href="https://doi.org/10.1016/j.quascirev.2019.01.014" target="_blank">https://doi.org/10.1016/j.quascirev.2019.01.014</a><br>📃 Wang, Y., Goring, S. J., & McGuire, J. L. (2019). Bayesian ages for pollen records since the last glaciation in North America. Scientific Data, 6(1). <a href="https://doi.org/10.1038/s41597-019-0182-7" target="_blank">https://doi.org/10.1038/s41597-019-0182-7</a><br>📃 Elmslie, B. G., Gushulak, C. A., Boreux, M. P., Lamoureux, S. F., Leavitt, P. R., & Cumming, B. F. (2019). Complex responses of phototrophic communities to climate warming during the Holocene of northeastern Ontario, Canada. The Holocene, 095968361988301. <a href="https://doi.org/10.1177/0959683619883014" target="_blank">https://doi.org/10.1177/0959683619883014</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> nomisr </td>
   <td style="text-align:left;"> Access 'Nomis' UK Labour Market Data </td>
   <td style="text-align:left;"> https://www.nomisweb.co.uk/api/v01/help </td>
   <td style="text-align:left;"> Evan Odell </td>
   <td style="text-align:left;"> Access UK official statistics from the 'Nomis' database.     'Nomis' includes data from the Census, the Labour Force Survey, DWP benefit     statistics and other economic and demographic data from the Office for     National Statistics, based around statistical geographies. See     <https://www.nomisweb.co.uk/api/v01/help> for full API documentation. </td>
   <td style="text-align:left;"> api-client, census-data, demography, geographic-data, national-statistics, official-statistics, officialstatistics, peer-reviewed, uk </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/190 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> onekp </td>
   <td style="text-align:left;"> Retrieve Data from the 1000 Plants Initiative (1KP) </td>
   <td style="text-align:left;"> The 1000 Plants Initiative (www.onekp.com) </td>
   <td style="text-align:left;"> Zebulun Arendsee </td>
   <td style="text-align:left;"> The 1000 Plants Initiative (www.onekp.com) has sequenced the transcriptomes    of over 1000 plant species. This package allows these sequences and    metadata to be retrieved and filtered by code, species or recursively by    clade.  Scientific names and NCBI taxonomy IDs are both supported. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> opencontext </td>
   <td style="text-align:left;"> API Client for the Open Context Archeological Database </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Ben Marwick </td>
   <td style="text-align:left;"> Search, browse, and download data from Open Context </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> originr </td>
   <td style="text-align:left;"> Fetch Species Origin Data from the Web </td>
   <td style="text-align:left;"> Encyclopedia of Life (<http://eol.org>), Flora Europaea (<http://rbg-web2.rbge.org.uk/FE/fe.html>), Global Invasive Species Database (<http://www.iucngisd.org/gisd>), the Native Species Resolver (<http://bien.nceas.ucsb.edu/bien/tools/nsr/nsr-ws/>), Integrated Taxonomic Information Service (<http://www.itis.gov/>), and Global Register of Introduced and Invasive Species (<http://www.griis.org/>). </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Get species origin data (whether species is native/invasive) from the    following sources on the web: Encyclopedia of Life (<http://eol.org>), Flora    'Europaea' (<http://rbg-web2.rbge.org.uk/FE/fe.html>), Global Invasive Species    Database (<http://www.iucngisd.org/gisd>), the Native Species Resolver    (<http://bien.nceas.ucsb.edu/bien/tools/nsr/nsr-ws/>), Integrated Taxonomic    Information Service (<http://www.itis.gov/>), and Global Register of    Introduced and Invasive Species (<http://www.griis.org/>). </td>
   <td style="text-align:left;"> API, eol, gisd, griis, invasive, itis, native, nsr, origin, species, web </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> osmdata </td>
   <td style="text-align:left;"> Import 'OpenStreetMap' Data as Simple Features or Spatial Objects </td>
   <td style="text-align:left;"> https://openstreetmap.org </td>
   <td style="text-align:left;"> Mark Padgham </td>
   <td style="text-align:left;"> Download and import of 'OpenStreetMap' ('OSM') data as 'sf' or 'sp'    objects.  'OSM' data are extracted from the 'Overpass' web server and    processed with very fast 'C++' routines for return to 'R'. </td>
   <td style="text-align:left;"> open0street0map, openstreetmap, OSM, overpass0API </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/103 </td>
   <td style="text-align:left;"> 📃 Hawker, L., Rougier, J., Neal, J., Bates, P., Archer, L., & Yamazaki, D. (2018). Implications of Simulating Global Digital Elevation Models for Flood Inundation Studies. Water Resources Research. <a href="https://doi.org/10.1029/2018wr023279" target="_blank">https://doi.org/10.1029/2018wr023279</a><br>📃 Briz-Redón, Á. (2019). SpNetPrep: An R package using Shiny to facilitate spatial statistics on road networks. Research Ideas and Outcomes, 5. <a href="https://doi.org/10.3897/rio.5.e33521" target="_blank">https://doi.org/10.3897/rio.5.e33521</a><br>📃 Castro, R., Tierra, A., & Luna, M. (2019). Assessing the Horizontal Positional Accuracy in OpenStreetMap: A Big Data Approach. Lecture Notes in Control and Information Sciences, 513–523. <a href="https://doi.org/10.1007/978-3-030-16184-2_49" target="_blank">https://doi.org/10.1007/978-3-030-16184-2_49</a><br>📃 Morelle, K., Jezek, M., Licoppe, A., & Podgorski, T. (2019). Deathbed choice by ASF‐infected wild boar can help find carcasses. Transboundary and Emerging Diseases. <a href="https://doi.org/10.1111/tbed.13267" target="_blank">https://doi.org/10.1111/tbed.13267</a><br>📃 Lara-Lizardi, F., Hoyos-Padilla, M., Hearn, A., Klimley, A. P., Galván-Magaña, F., Arauz, R., … Ketchum, J. T. (2020). Shark movements in the Revillagigedo Archipelago and connectivity with the Eastern Tropical Pacific. <a href="https://doi.org/10.1101/2020.03.02.972844" target="_blank">https://doi.org/10.1101/2020.03.02.972844</a><br>📃 Borgoni, R., Gilardi, A., & Zappa, D. (2020). Assessing the Risk of Car Crashes in Road Networks. Social Indicators Research. <a href="https://doi.org/10.1007/s11205-020-02295-x" target="_blank">https://doi.org/10.1007/s11205-020-02295-x</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> ots </td>
   <td style="text-align:left;"> Client for Various Ocean Time Series 'Datasets' </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Interact with various ocean time series 'datasets', including    BATS, HOT, and more. Package focuses on data retrieval only. All functions    return a data.frame for easy downstream use for plots, vizualization,    analysis. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> paleobioDB </td>
   <td style="text-align:left;"> Download and Process Data from the Paleobiology Database </td>
   <td style="text-align:left;"> http://paleobiodb.org/data1.1 </td>
   <td style="text-align:left;"> Sara Varela </td>
   <td style="text-align:left;"> Includes 19 functions to wrap each endpoint of    the PaleobioDB API, plus 8 functions to visualize and process the fossil    data. The API documentation for the Paleobiology Database can be found in    <http://paleobiodb.org/data1.1/>. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Varela, S., González-Hernández, J., Sgarbi, L. F., Marshall, C., Uhen, M. D., Peters, S., & McClennen, M. (2014). paleobioDB: an R package for downloading, visualizing and processing data from the Paleobiology Database. Ecography, 38(4), 419–425. <a href="https://doi.org/10.1111/ecog.01154" target="_blank">https://doi.org/10.1111/ecog.01154</a><br>📃 Read, J. S., Walker, J. I., Appling, A. P., Blodgett, D. L., Read, E. K., & Winslow, L. A. (2015). geoknife: reproducible web-processing of large gridded datasets. Ecography, 39(4), 354–360. <a href="https://doi.org/10.1111/ecog.01880" target="_blank">https://doi.org/10.1111/ecog.01880</a><br>📃 Springer, M. S., Emerling, C. A., Meredith, R. W., Janečka, J. E., Eizirik, E., & Murphy, W. J. (2016). Waking the undead: implications of a soft explosive model for the timing of placental mammal diversification. Molecular Phylogenetics and Evolution. <a href="https://doi.org/10.1016/j.ympev.2016.09.017" target="_blank">https://doi.org/10.1016/j.ympev.2016.09.017</a><br>📃 Pimiento, C., & Benton, M. J. (2020). The impact of the Pull of the Recent on extant elasmobranchs. Palaeontology. <a href="https://doi.org/10.1111/pala.12478" target="_blank">https://doi.org/10.1111/pala.12478</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> pangaear </td>
   <td style="text-align:left;"> Client for the 'Pangaea' Database </td>
   <td style="text-align:left;"> https://www.pangaea.de </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Tools to interact with the 'Pangaea' Database    (<https://www.pangaea.de>), including functions for searching for data,    fetching 'datasets' by 'dataset' 'ID', and working with the 'Pangaea'    'OAI-PMH' service. </td>
   <td style="text-align:left;"> archive, atmosphere, chemistry, earthscience, ecology, environmentalscience, paleontology, Pangaea </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Greco, M., Jonkers, L., Kretschmer, K., Bijma, J., & Kucera, M. (2019). Depth habitat of the planktonic foraminifera Neogloboquadrina pachyderma in the northern high latitudes explained by sea-ice and chlorophyll concentrations. Biogeosciences, 16(17), 3425–3437. <a href="https://doi.org/10.5194/bg-16-3425-2019" target="_blank">https://doi.org/10.5194/bg-16-3425-2019</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> phylotaR </td>
   <td style="text-align:left;"> Automated Phylogenetic Sequence Cluster Identification from 'GenBank' </td>
   <td style="text-align:left;"> https://www.ncbi.nlm.nih.gov/genbank </td>
   <td style="text-align:left;"> Dom Bennett </td>
   <td style="text-align:left;"> A pipeline for the identification, within taxonomic groups, of    orthologous sequence clusters from    'GenBank' <https://www.ncbi.nlm.nih.gov/genbank/> as the first step in a    phylogenetic analysis. The pipeline depends on a local alignment search tool    and is, therefore, not dependent on differences in gene naming conventions    and naming errors. </td>
   <td style="text-align:left;"> blastn, genbank, peer-reviewed, phylogenetics, sequence-alignment </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/187 </td>
   <td style="text-align:left;"> 📃 Bennett, D.J., Hettling, H., Silvestro, D., Zizka, A., Bacon, C.D., Faurby, S., Vos, R.A., Antonelli, A. phylotaR: An automated pipeline for retrieving orthologous DNA sequences from GenBank in R. Preprints 2018, 2018040047 <a href="https://doi.org/10.20944/preprints201804.0047.v1" target="_blank">https://doi.org/10.20944/preprints201804.0047.v1</a><br>📃 Evans, K. M., Vidal-García, M., Tagliacollo, V. A., Taylor, S. J., & Fenolio, D. B. (2019). Bony Patchwork: Mosaic Patterns of Evolution in the Skull of Electric Fishes (Apteronotidae: Gymnotiformes). Integrative and Comparative Biology. <a href="https://doi.org/10.1093/icb/icz026" target="_blank">https://doi.org/10.1093/icb/icz026</a><br>📃 Ruiz-Sanchez, E., Maya-Lastra, C. A., Steinmann, V. W., Zamudio, S., Carranza, E., Murillo, R. M., & Rzedowski, J. (2019). Datataxa: a new script to extract metadata sequence information from GenBank, the Flora of Bajío as a case study. Botanical Sciences, 97(4), 754–760. <a href="https://doi.org/10.17129/botsci.2226" target="_blank">https://doi.org/10.17129/botsci.2226</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> pleiades </td>
   <td style="text-align:left;"> Interface to the 'Pleiades' 'Archeological' Database </td>
   <td style="text-align:left;"> https://pleiades.stoa.org </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Provides a set of functions for interacting with the    'Pleiades' (<https://pleiades.stoa.org/>) 'API', including     getting status data, places data, and creating a 'GeoJSON'     based map on 'GitHub' 'gists'. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> prism </td>
   <td style="text-align:left;"> Access Data from the Oregon State Prism Climate Project </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Alan Butler </td>
   <td style="text-align:left;"> Allows users to access the Oregon State Prism climate data. Using    the web service API data can easily downloaded in bulk and loaded into R for    spatial analysis. Some user friendly visualizations are also provided. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> qualtRics </td>
   <td style="text-align:left;"> Download 'Qualtrics' Survey Data </td>
   <td style="text-align:left;"> https://www.qualtrics.com/about </td>
   <td style="text-align:left;"> Julia Silge </td>
   <td style="text-align:left;"> Provides functions to access survey results directly into R using     the 'Qualtrics' API. 'Qualtrics' <https://www.qualtrics.com/about/> is an     online survey and data collection software platform. See     <https://api.qualtrics.com/> for more information about the 'Qualtrics' API.     This package is community-maintained and is not officially supported by     'Qualtrics'. </td>
   <td style="text-align:left;"> api, qualtrics, qualtrics-api, survey, survey-data </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/192 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rAvis </td>
   <td style="text-align:left;"> Interface to the Bird-Watching Dataset Proyecto AVIS </td>
   <td style="text-align:left;"> http://proyectoavis.com </td>
   <td style="text-align:left;"> Sara Varela </td>
   <td style="text-align:left;"> Interface to <http://proyectoavis.com> database.     It provides means to download data filtered by species, order,    family, and several other criteria. Provides also basic functionality to    plot exploratory maps of the datasets. </td>
   <td style="text-align:left;"> avis, bird, birds, citizen-science, proyectoavis </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rbace </td>
   <td style="text-align:left;"> 'Bielefeld' Academic Search Engine ('BASE') Client </td>
   <td style="text-align:left;"> https://www.base-search.net </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Interface to the API for the 'Bielefeld' Academic Search    Engine ('BASE') (<https://www.base-search.net/>). 'BASE' is a    search engine for more than 150 million scholarly documents from more    than 7000 sources. Methods are provided for searching for documents,    as well as getting information on higher level groupings of documents:    collections and repositories within collections. Search includes    faceting, so you can get a high level overview of number of documents    across a given variable (e.g., year). 'BASE' asks users to respect a    rate limit, but does not enforce it themselves; we enforce that    rate limit. </td>
   <td style="text-align:left;"> citations, literature, scholarly, search, text-ming </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rbhl </td>
   <td style="text-align:left;"> Interface to the 'Biodiversity' 'Heritage' Library </td>
   <td style="text-align:left;"> https://www.biodiversitylibrary.org </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Interface to 'Biodiversity' 'Heritage' Library ('BHL')    (<https://www.biodiversitylibrary.org/>) API    (<https://www.biodiversitylibrary.org/docs/api3.html>). 'BHL' is a    repository of 'digitized' literature on 'biodiversity'    studies, including 'floras', research papers, and more. </td>
   <td style="text-align:left;"> API, BHL, conservation, library, OCR, species, taxonomy, text-mining, web-services </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Jaspers, S., De Troyer, E., & Aerts, M. (2018). Machine learning techniques for the automation of literature reviews and systematic reviews in EFSA. EFSA Supporting Publications, 15(6), 1427E. <a href="https://doi.org/10.2903/sp.efsa.2018.EN-1427" target="_blank">https://doi.org/10.2903/sp.efsa.2018.EN-1427</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rbison </td>
   <td style="text-align:left;"> Interface to the 'USGS' 'BISON' API </td>
   <td style="text-align:left;"> https://bison.usgs.gov </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Interface to the 'USGS' 'BISON' (<https://bison.usgs.gov/>)    API, a 'database' for species occurrence data. Data comes from    species in the United States from participating data providers. You can get    data via 'taxonomic' and location based queries. A simple function    is provided to help visualize data. </td>
   <td style="text-align:left;"> biodiversity, BISON, maps, occurrences, species, USGS </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Young, N. E., Jarnevich, C. S., Sofaer, H. R., Pearse, I., Sullivan, J., Engelstad, P., & Stohlgren, T. J. (2020). A modeling workflow that balances automation and human intervention to inform invasive plant management decisions at multiple spatial scales. PLOS ONE, 15(3), e0229253. <a href="https://doi.org/10.1371/journal.pone.0229253" target="_blank">https://doi.org/10.1371/journal.pone.0229253</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rbraries </td>
   <td style="text-align:left;"> Interface to the 'Libraries.io' API </td>
   <td style="text-align:left;"> https://libraries.io/api </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Interface to the 'Libraries.io' API (<https://libraries.io/api>).    'Libraries.io' indexes data from 36 different package managers for     programming languages. </td>
   <td style="text-align:left;"> API, http, metadata, package, software, web-services </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rcoreoa </td>
   <td style="text-align:left;"> Client for the CORE API </td>
   <td style="text-align:left;"> https://core.ac.uk/docs </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Client for the CORE API (<https://core.ac.uk/docs/>).    CORE (<https://core.ac.uk>) aggregates open access research    outputs from repositories and journals worldwide and make them    available to the public. </td>
   <td style="text-align:left;"> citations, full-text, literature, metadata, pdf, publications, text-ming </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rdatacite </td>
   <td style="text-align:left;"> Client for the 'DataCite' API </td>
   <td style="text-align:left;"> https://www.datacite.org </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Client for the web service methods provided    by 'DataCite' (<https://www.datacite.org/>), including functions to interface with    their 'RESTful' search API. The API is backed by 'Elasticsearch', allowing    expressive queries, including faceting. </td>
   <td style="text-align:left;"> API, data, dataset, https, scholarly, web-services </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Jaspers, S., De Troyer, E., & Aerts, M. (2018). Machine learning techniques for the automation of literature reviews and systematic reviews in EFSA. EFSA Supporting Publications, 15(6), 1427E. <a href="https://doi.org/10.2903/sp.efsa.2018.EN-1427" target="_blank">https://doi.org/10.2903/sp.efsa.2018.EN-1427</a><br>📃 White, L., & Santy, S. (2018). DataDepsGenerators.jl: making reusing data easy by automatically generating DataDeps.jl registration code. Journal of Open Source Software, 3(31), 921. <a href="https://doi.org/10.21105/joss.00921" target="_blank">https://doi.org/10.21105/joss.00921</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rdataretriever </td>
   <td style="text-align:left;"> R Interface to the Data Retriever </td>
   <td style="text-align:left;"> http://data-retriever.org </td>
   <td style="text-align:left;"> Henry Senyondo </td>
   <td style="text-align:left;"> Provides an R interface to the Data Retriever    <http://data-retriever.org/> via the Data Retriever's    command line interface. The Data Retriever automates the    tasks of finding, downloading, and cleaning public datasets,    and then stores them in a local database. </td>
   <td style="text-align:left;"> data, data-science, database, datasets, science </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rdefra </td>
   <td style="text-align:left;"> Interact with the UK AIR Pollution Database from DEFRA </td>
   <td style="text-align:left;"> https://uk-air.defra.gov.uk </td>
   <td style="text-align:left;"> Claudia Vitolo </td>
   <td style="text-align:left;"> Get data from DEFRA's UK-AIR website <https://uk-air.defra.gov.uk/>. It basically scrapes the HTML content. </td>
   <td style="text-align:left;"> air-pollution, air-pollution-levels, air-quality, defra, peer-reviewed, uk </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/68 </td>
   <td style="text-align:left;"> 📃 Vitolo, C., Scutari, M., Ghalaieny, M., Tucker, A., & Russell, A. (2018). Modelling air pollution, climate and health data using Bayesian Networks: a case study of the English regions. Earth and Space Science. <a href="https://doi.org/10.1002/2017ea000326" target="_blank">https://doi.org/10.1002/2017ea000326</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rdopa </td>
   <td style="text-align:left;"> R client to Joint Research Centre's DOPA REST API </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Joona Lehtomaki </td>
   <td style="text-align:left;"> R client for REST web services of DOPA (Digital Observatory for    protected Areas) by the European Union Joint Research Centre. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rdpla </td>
   <td style="text-align:left;"> Client for the Digital Public Library of America ('DPLA') </td>
   <td style="text-align:left;"> https://dp.la </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Interact with the Digital Public Library of America    <https://dp.la> ('DPLA') 'REST' 'API'    <https://dp.la/info/developers/codex/> from R, including search    and more. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/71 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rdryad </td>
   <td style="text-align:left;"> Access for Dryad Web Services </td>
   <td style="text-align:left;"> https://datadryad.org </td>
   <td style="text-align:left;"> Karthik Ram </td>
   <td style="text-align:left;"> Interface to the Dryad "Solr" API, their "OAI-PMH" service, and    fetch datasets. Dryad (<https://datadryad.org/>) is a curated host of    data underlying scientific publications. </td>
   <td style="text-align:left;"> data, doi, dryad, dryad-api, oai-pmh </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Drozd, P., & Šipoš, J. (2013). R for all (I): Introduction to the new age of biological analyses. Casopis Slezskeho Zemskeho Muzea (A), 62(1). <a href="https://doi.org/10.2478/cszma-2013-0004" target="_blank">https://doi.org/10.2478/cszma-2013-0004</a><br>📃 White, L., & Santy, S. (2018). DataDepsGenerators.jl: making reusing data easy by automatically generating DataDeps.jl registration code. Journal of Open Source Software, 3(31), 921. <a href="https://doi.org/10.21105/joss.00921" target="_blank">https://doi.org/10.21105/joss.00921</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rebird </td>
   <td style="text-align:left;"> R Client for the eBird Database of Bird Observations </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Sebastian Pardo </td>
   <td style="text-align:left;"> A programmatic client for the eBird database, including functions    for searching for bird observations by geographic location (latitude,    longitude), eBird hotspots, location identifiers, by notable sightings, by    region, and by taxonomic name. </td>
   <td style="text-align:left;"> biology, birding, birds, data, database, ebird, observations, ornithology, sightings </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rentrez </td>
   <td style="text-align:left;"> 'Entrez' in R </td>
   <td style="text-align:left;"> https://www.ncbi.nlm.nih.gov/genbank https://www.ncbi.nlm.nih.gov/pubmed </td>
   <td style="text-align:left;"> David Winter </td>
   <td style="text-align:left;"> Provides an R interface to the NCBI's 'EUtils' API,     allowing users to search databases like 'GenBank'     <https://www.ncbi.nlm.nih.gov/genbank/> and 'PubMed'     <https://www.ncbi.nlm.nih.gov/pubmed/>, process the     results of those searches and pull data into their R sessions. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Drozd, P., & Šipoš, J. (2013). R for all (I): Introduction to the new age of biological analyses. Casopis Slezskeho Zemskeho Muzea (A), 62(1). <a href="https://doi.org/10.2478/cszma-2013-0004" target="_blank">https://doi.org/10.2478/cszma-2013-0004</a><br>📃 Hampton, S. E., Anderson, S. S., Bagby, S. C., Gries, C., Han, X., Hart, E. M., et al. (2015). The Tao of open science for ecology. Ecosphere, 6(7), art120. <a href="https://doi.org/10.1890/es14-00402.1" target="_blank">https://doi.org/10.1890/es14-00402.1</a><br>📃 Nguyen, N. T., Zhang, X., Wu, C., Lange, R. A., Chilton, R. J., Lindsey, M. L., & Jin, Y.-F. (2014). Integrative Computational and Experimental Approaches to Establish a Post-Myocardial Infarction Knowledge Map. PLoS Computational Biology, 10(3), e1003472. <a href="https://doi.org/10.1371/journal.pcbi.1003472" target="_blank">https://doi.org/10.1371/journal.pcbi.1003472</a><br>📃 Winter, D. J. (2017). rentrez: An R package for the NCBI eUtils API (Version 1). PeerJ Preprints. <a href="https://doi.org/10.7287/peerj.preprints.3179v1" target="_blank">https://doi.org/10.7287/peerj.preprints.3179v1</a><br>📃 Krawczyk, P. S., Lipinski, L., & Dziembowski, A. (2018). PlasFlow: predicting plasmid sequences in metagenomic data using genome signatures. Nucleic Acids Research. <a href="https://doi.org/10.1093/nar/gkx1321" target="_blank">https://doi.org/10.1093/nar/gkx1321</a><br>📃 Claypool, K., & Patel, C. J. (2018). A transcript-wide association study in physical activity intervention implicates molecular pathways in chronic disease. <a href="https://doi.org/10.1101/260398" target="_blank">https://doi.org/10.1101/260398</a><br>📃 Chen, L., Heikkinen, L., Wang, C., Yang, Y., Knott, K. E., & Wong, G. (2018). miRToolsGallery: a tag-based and rankable microRNA bioinformatics resources database portal. Database, 2018. <a href="https://doi.org/10.1093/database/bay004" target="_blank">https://doi.org/10.1093/database/bay004</a><br>📃 Lakiotaki, K., Vorniotakis, N., Tsagris, M., Georgakopoulos, G., & Tsamardinos, I. (2018). BioDataome: a collection of uniformly preprocessed and automatically annotated datasets for data-driven biology. Database, 2018. <a href="https://doi.org/10.1093/database/bay011" target="_blank">https://doi.org/10.1093/database/bay011</a><br>📃 Reibe, S., Hjorth, M., Febbraio, M. A., & Whitham, M. (2018). GeneXX: An online tool for the exploration of transcript changes in skeletal muscle associated with exercise. Physiological genomics. <a href="https://doi.org/10.1152/physiolgenomics.00127.2017" target="_blank">https://doi.org/10.1152/physiolgenomics.00127.2017</a><br>📃 Barnett, A. (2018). Missing the point: are journals using the ideal number of decimal places? F1000Research, 7, 450. <a href="https://doi.org/10.12688/f1000research.14488.1" target="_blank">https://doi.org/10.12688/f1000research.14488.1</a><br>📃 Spalink, D., Stoffel, K., Walden, G. K., Hulse-Kemp, A. M., Hill, T. A., Van Deynze, A., & Bohs, L. (2018). Comparative transcriptomics and genomic patterns of discordance in Capsiceae (Solanaceae). Molecular Phylogenetics and Evolution, 126, 293–302. <a href="https://doi.org/10.1016/j.ympev.2018.04.030" target="_blank">https://doi.org/10.1016/j.ympev.2018.04.030</a><br>📃 Han, X., Williams, S. R., & Zuckerman, B. L. (2018). A snapshot of translational research funded by the National Institutes of Health (NIH): A case study using behavioral and social science research awards and Clinical and Translational Science Awards funded publications. PLOS ONE, 13(5), e0196545. <a href="https://doi.org/10.1371/journal.pone.0196545" target="_blank">https://doi.org/10.1371/journal.pone.0196545</a><br>📃 Machado, V. N., Collins, R. A., Ota, R. P., Andrade, M. C., Farias, I. P., & Hrbek, T. (2018). One thousand DNA barcodes of piranhas and pacus reveal geographic structure and unrecognised diversity in the Amazon. Scientific Reports, 8(1). <a href="https://doi.org/10.1038/s41598-018-26550-x" target="_blank">https://doi.org/10.1038/s41598-018-26550-x</a><br>📃 Sun, B. B., Maranville, J. C., Peters, J. E., Stacey, D., Staley, J. R., Blackshaw, J., … Butterworth, A. S. (2018). Genomic atlas of the human plasma proteome. Nature, 558(7708), 73–79. <a href="https://doi.org/10.1038/s41586-018-0175-2" target="_blank">https://doi.org/10.1038/s41586-018-0175-2</a><br>📃 Mioduchowska, M., Czyż, M. J., Gołdyn, B., Kur, J., & Sell, J. (2018). Instances of erroneous DNA barcoding of metazoan invertebrates: Are universal cox1 gene primers too “universal”? PLOS ONE, 13(6), e0199609. <a href="https://doi.org/10.1371/journal.pone.0199609" target="_blank">https://doi.org/10.1371/journal.pone.0199609</a><br>📃 Magoga, G., Sahin, D. C., Fontaneto, D., & Montagna, M. (2018). Barcoding of Chrysomelidae of Euro-Mediterranean area: efficiency and problematic species. Scientific Reports, 8(1). <a href="https://doi.org/10.1038/s41598-018-31545-9" target="_blank">https://doi.org/10.1038/s41598-018-31545-9</a><br>📃 Otten, C., Knox, J., Boulday, G., Eymery, M., Haniszewski, M., Neuenschwander, M., … Abdelilah‐Seyfried, S. (2018). Systematic pharmacological screens uncover novel pathways involved in cerebral cavernous malformations. EMBO Molecular Medicine, e9155. <a href="https://doi.org/10.15252/emmm.201809155" target="_blank">https://doi.org/10.15252/emmm.201809155</a><br>📃 Yángüez, E., Hunziker, A., Dobay, M. P., Yildiz, S., Schading, S., Elshina, E., … Stertz, S. (2018). Phosphoproteomic-based kinase profiling early in influenza virus infection identifies GRK2 as antiviral drug target. Nature Communications, 9(1). <a href="https://doi.org/10.1038/s41467-018-06119-y" target="_blank">https://doi.org/10.1038/s41467-018-06119-y</a><br>📃 Collins, R. A., Wangensteen, O. S., O’Gorman, E. J., Mariani, S., Sims, D. W., & Genner, M. J. (2018). Persistence of environmental DNA in marine systems. Communications Biology, 1(1). <a href="https://doi.org/10.1038/s42003-018-0192-6" target="_blank">https://doi.org/10.1038/s42003-018-0192-6</a><br>📃 Cholet, F., Ijaz, U. Z., & Smith, C. J. (2018). Differential ratio amplicons (Ramp) for the evaluation of RNA integrity extracted from complex environmental samples. Environmental Microbiology. <a href="https://doi.org/10.1111/1462-2920.14516" target="_blank">https://doi.org/10.1111/1462-2920.14516</a><br>📃 Die, J. V., Elmassry, M. M., Leblanc, K. H., Awe, O. I., Dillman, A., & Busby, B. (2018). GeneHummus: A pipeline to define gene families and their expression in legumes and beyond. <a href="https://doi.org/10.1101/436659" target="_blank">https://doi.org/10.1101/436659</a><br>📃 Mioduchowska, M., Czyż, M. J., Gołdyn, B., Kilikowska, A., Namiotko, T., Pinceel, T., … Sell, J. (2018). Detection of bacterial endosymbionts in freshwater crustaceans: the applicability of non-degenerate primers to amplify the bacterial 16S rRNA gene. PeerJ, 6, e6039. <a href="https://doi.org/10.7717/peerj.603" target="_blank">https://doi.org/10.7717/peerj.603</a><br>📃 Bennett, D., Hettling, H., Silvestro, D., Vos, R., & Antonelli, A. (2018). restez: Create and Query a Local Copy of GenBank in R. Journal of Open Source Software, 3(31), 1102. <a href="https://doi.org/10.21105/joss.01102" target="_blank">https://doi.org/10.21105/joss.01102</a><br>📃 Brooks, L., Kaze, M., & Sistrom, M. (2019). A Curated, Comprehensive Database of Plasmid Sequences. Microbiology Resource Announcements, 8(1). <a href="https://doi.org/10.1128/mra.01325-18" target="_blank">https://doi.org/10.1128/mra.01325-18</a><br>📃 Poulin, R., Hay, E., & Jorge, F. (2019). Taxonomic and geographic bias in the genetic study of helminth parasites. International Journal for Parasitology. <a href="https://doi.org/10.1016/j.ijpara.2018.12.005" target="_blank">https://doi.org/10.1016/j.ijpara.2018.12.005</a><br>📃 Phelps, K., Hamel, L., Alhmoud, N., Ali, S., Bilgin, R., Sidamonidze, K., … Olival, K. (2019). Bat Research Networks and Viral Surveillance: Gaps and Opportunities in Western Asia. Viruses, 11(3), 240. <a href="https://doi.org/10.3390/v11030240" target="_blank">https://doi.org/10.3390/v11030240</a><br>📃 Barnett, A. G., & Moher, D. (2019). Turning the tables: A university league-table based on quality not quantity. F1000Research, 8, 583. <a href="https://doi.org/10.12688/f1000research.18453.1" target="_blank">https://doi.org/10.12688/f1000research.18453.1</a><br>📃 Mann, C. M., Martínez-Gálvez, G., Welker, J. M., Wierson, W. A., Ata, H., Almeida, M. P., … Dobbs, D. (2019). The Gene Sculpt Suite: a set of tools for genome editing. Nucleic Acids Research. <a href="https://doi.org/10.1093/nar/gkz405" target="_blank">https://doi.org/10.1093/nar/gkz405</a><br>📃 Shackleton, M. E., Rees, G. N., Watson, G., Campbell, C., & Nielsen, D. (2019). Environmental DNA reveals landscape mosaic of wetland plant communities. Global Ecology and Conservation, 19, e00689. <a href="https://doi.org/10.1016/j.gecco.2019.e00689" target="_blank">https://doi.org/10.1016/j.gecco.2019.e00689</a><br>📃 Koppelstaetter, C., Leierer, J., Rudnicki, M., Kerschbaum, J., Kronbichler, A., Melk, A., … Perco, P. (2019). Computational Drug Screening Identifies Compounds Targeting Renal Age-associated Molecular Profiles. Computational and Structural Biotechnology Journal, 17, 843–853. <a href="https://doi.org/10.1016/j.csbj.2019.06.019" target="_blank">https://doi.org/10.1016/j.csbj.2019.06.019</a><br>📃 Ferraz, M. de A. M. M., Carothers, A., Dahal, R., Noonan, M. J., & Songsasen, N. (2019). Oviductal extracellular vesicles interact with the spermatozoon’s head and mid-piece and improves its motility and fertilizing ability in the domestic cat. Scientific Reports, 9(1). <a href="https://doi.org/10.1038/s41598-019-45857-x" target="_blank">https://doi.org/10.1038/s41598-019-45857-x</a><br>📃 Collins, R. A., Bakker, J., Wangensteen, O. S., Soto, A. Z., Corrigan, L., Sims, D. W., … Mariani, S. (2019). Non‐specific amplification compromises environmental DNA metabarcoding with COI. Methods in Ecology and Evolution. <a href="https://doi.org/10.1111/2041-210x.13276" target="_blank">https://doi.org/10.1111/2041-210x.13276</a><br>📃 Die, J. V., Elmassry, M. M., LeBlanc, K. H., Awe, O. I., Dillman, A., & Busby, B. (2019). geneHummus: an R package to define gene families and their expression in legumes and beyond. BMC Genomics, 20(1). <a href="https://doi.org/10.1186/s12864-019-5952-2" target="_blank">https://doi.org/10.1186/s12864-019-5952-2</a><br>📃 Piper, A. M., Batovska, J., Cogan, N. O. I., Weiss, J., Cunningham, J. P., Rodoni, B. C., & Blacket, M. J. (2019). Prospects and challenges of implementing DNA metabarcoding for high-throughput insect surveillance. GigaScience, 8(8). <a href="https://doi.org/10.1093/gigascience/giz092" target="_blank">https://doi.org/10.1093/gigascience/giz092</a><br>📃 Neugebauer, K., El‐Serehy, H. A., George, T. S., McNicol, J. W., Moraes, M. F., Sorreano, M. C. M., & White, P. J. (2019). The influence of phylogeny and ecology on root, shoot and plant ionomes of fourteen native Brazilian species. Physiologia Plantarum. <a href="https://doi.org/10.1111/ppl.13018" target="_blank">https://doi.org/10.1111/ppl.13018</a><br>📃 Wittouck, S., Wuyts, S., Meehan, C. J., van Noort, V., & Lebeer, S. (2019). A Genome-Based Species Taxonomy of the Lactobacillus Genus Complex. mSystems, 4(5). <a href="https://doi.org/10.1128/msystems.00264-19" target="_blank">https://doi.org/10.1128/msystems.00264-19</a><br>📃 Alex Dornburg, Dustin J. Wcisel, J. Thomas Howard et al. Transcriptome Ortholog Alignment Sequence Tools (TOAST) for Phylogenomic Dataset Assembly, 21 October 2019, PREPRINT (Version 1) available at Research Square <a href="https://doi.org/10.21203/rs.2.16269/v1" target="_blank">https://doi.org/10.21203/rs.2.16269/v1</a><br>📃 Fu, D. Y., & Hughey, J. J. (2019). Releasing a preprint is associated with more attention and citations for the peer-reviewed article. eLife, 8. <a href="https://doi.org/10.7554/elife.52646" target="_blank">https://doi.org/10.7554/elife.52646</a><br>📃 Vitale, O., Preste, R., Palmisano, D., & Attimonelli, M. (2019). A data and text mining pipeline to annotate human mitochondrial variants with functional and clinical information. Molecular Genetics & Genomic Medicine, 8(2). <a href="https://doi.org/10.1002/mgg3.1085" target="_blank">https://doi.org/10.1002/mgg3.1085</a><br>📃 Wcisel, D. J., III, J. T. H., Yoder, J. A., & Dornburg, A. (preprint) Transcriptome Ortholog Alignment Sequence Tools (TOAST) for Phylogenomic Dataset Assembly. <a href="https://doi.org/10.21203/rs.2.16269/v3" target="_blank">https://doi.org/10.21203/rs.2.16269/v3</a><br>📃 Die, J. V., Elmassry, M. M., LeBlanc, K. H., Awe, O. I., Dillman, A., & Busby, B. (2018). GeneHummus: A pipeline to define gene families and their expression in legumes and beyond. <a href="https://doi.org/10.1101/436659" target="_blank">https://doi.org/10.1101/436659</a><br>📃 Santos, J. C. (2020). Phylogenetic Analyses of Chemokine Receptors from Sequence Retrieval to Phylogenetic Trees. In Immune Mediators in Cancer (pp. 313-343). Humana, New York, NY. <https://link.springer.com/protocol/10.1007/978-1-0716-0247-8_27> <a href="https://doi.org/10.1007/978-1-0716-0247-8_27" target="_blank">https://doi.org/10.1007/978-1-0716-0247-8_27</a><br>📃 Oliphant, K., Cochrane, K., Schroeter, K., Daigneault, M. C., Yen, S., Verdu, E. F., & Allen-Vercoe, E. (2020). Effects of Antibiotic Pretreatment of an Ulcerative Colitis-Derived Fecal Microbial Community on the Integration of Therapeutic Bacteria In Vitro. mSystems, 5(1). <a href="https://doi.org/10.1128/msystems.00404-19" target="_blank">https://doi.org/10.1128/msystems.00404-19</a><br>📃 Pavlovich, S. S., Darling, T., Hume, A. J., Davey, R. A., Feng, F., Mühlberger, E., & Kepler, T. B. (2020). Egyptian Rousette IFN-ω Subtypes Elicit Distinct Antiviral Effects and Transcriptional Responses in Conspecific Cells. Frontiers in Immunology, 11. <a href="https://doi.org/10.3389/fimmu.2020.00435" target="_blank">https://doi.org/10.3389/fimmu.2020.00435</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rerddap </td>
   <td style="text-align:left;"> General Purpose Client for 'ERDDAP' Servers </td>
   <td style="text-align:left;"> https://upwell.pfeg.noaa.gov/erddap/information.html </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> General purpose R client for 'ERDDAP' servers. Includes    functions to search for 'datasets', get summary information on    'datasets', and fetch 'datasets', in either 'csv' or 'netCDF' format.    'ERDDAP' information:     <https://upwell.pfeg.noaa.gov/erddap/information.html>. </td>
   <td style="text-align:left;"> buoy, climate, earth, NOAA, precipitation, science, storm, temperature </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Shabangu, F. W., Yemane, D., Stafford, K. M., Ensor, P., & Findlay, K. P. (2017). Modelling the effects of environmental conditions on the acoustic occurrence and behaviour of Antarctic blue whales. PLOS ONE, 12(2), e0172705. <a href="https://doi.org/10.1371/journal.pone.0172705" target="_blank">https://doi.org/10.1371/journal.pone.0172705</a><br>📃 Mendez, L., Borsa, P., Cruz, S., de Grissac, S., Hennicke, J., Lallemand, J., … Weimerskirch, H. (2017). Geographical variation in the foraging behaviour of the pantropical red-footed booby. Marine Ecology Progress Series, 568, 217–230. <a href="https://doi.org/10.3354/meps12052" target="_blank">https://doi.org/10.3354/meps12052</a><br>📃 Abolaffio, M., Reynolds, A. M., Cecere, J. G., Paiva, V. H., & Focardi, S. (2018). Olfactory-cued navigation in shearwaters: linking movement patterns to mechanisms. Scientific Reports, 8(1). <a href="https://doi.org/10.1038/s41598-018-29919-0" target="_blank">https://doi.org/10.1038/s41598-018-29919-0</a><br>📃 Baylis, A. M. M., Tierney, M., Orben, R. A., Warwick-Evans, V., Wakefield, E., Grecian, W. J., … Brickle, P. (2019). Important At-Sea Areas of Colonial Breeding Marine Predators on the Southern Patagonian Shelf. Scientific Reports, 9(1). <a href="https://doi.org/10.1038/s41598-019-44695-1" target="_blank">https://doi.org/10.1038/s41598-019-44695-1</a><br>📃 O’Farrell, S., Chollett, I., Sanchirico, J. N., & Perruso, L. (2019). Classifying fishing behavioral diversity using high-frequency movement data. Proceedings of the National Academy of Sciences, 201906766. <a href="https://doi.org/10.1073/pnas.1906766116" target="_blank">https://doi.org/10.1073/pnas.1906766116</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> reuropeana </td>
   <td style="text-align:left;"> Interface to 'Europeana' 'APIs' </td>
   <td style="text-align:left;"> http://labs.europeana.eu/api </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Interact with 'Europeana' web services (<http://labs.europeana.eu/api>),    including search, etc. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rfishbase </td>
   <td style="text-align:left;"> R Interface to 'FishBase' </td>
   <td style="text-align:left;"> http://www.fishbase.org http://www.sealifebase.org </td>
   <td style="text-align:left;"> Carl Boettiger </td>
   <td style="text-align:left;"> A programmatic interface to <http://www.fishbase.org>, re-written    based on an accompanying 'RESTful' API. Access tables describing over 30,000    species of fish, their biology, ecology, morphology, and more. This package also    supports experimental access to <http://www.sealifebase.org> data, which contains    nearly 200,000 species records for all types of aquatic life not covered by    'FishBase.' </td>
   <td style="text-align:left;"> fish, fishbase, taxonomy </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/137 </td>
   <td style="text-align:left;"> 📃 Drozd, P., & Šipoš, J. (2013). R for all (I): Introduction to the new age of biological analyses. Casopis Slezskeho Zemskeho Muzea (A), 62(1). <a href="https://doi.org/10.2478/cszma-2013-0004" target="_blank">https://doi.org/10.2478/cszma-2013-0004</a><br>📃 Froehlich, H. E., Gentry, R. R., & Halpern, B. S. (2016). Synthesis and comparative analysis of physiological tolerance and life-history growth traits of marine aquaculture species. Aquaculture, 460, 75–82. <a href="https://doi.org/10.1016/j.aquaculture.2016.04.018" target="_blank">https://doi.org/10.1016/j.aquaculture.2016.04.018</a><br>📃 McGee, M. D., Borstein, S. R., Neches, R. Y., Buescher, H. H., Seehausen, O., & Wainwright, P. C. (2015). A pharyngeal jaw evolutionary innovation facilitated extinction in Lake Victoria cichlids. Science, 350(6264), 1077–1079. <a href="https://doi.org/10.1126/science.aab0800" target="_blank">https://doi.org/10.1126/science.aab0800</a><br>📃 Plank, M. J., Pitchford, J. W., & James, A. (2016). Evolutionarily Stable Strategies for Fecundity and Swimming Speed of Fish. Bull Math Biol, 78(2), 280–292. <a href="https://doi.org/10.1007/s11538-016-0143-7" target="_blank">https://doi.org/10.1007/s11538-016-0143-7</a><br>📃 Price, S. A., Friedman, S. T., & Wainwright, P. C. (2015). How predation shaped fish: the impact of fin spines on body form evolution across teleosts. Proc. R. Soc. B, 282(1819), 20151428. <a href="https://doi.org/10.1098/rspb.2015.1428" target="_blank">https://doi.org/10.1098/rspb.2015.1428</a><br>📃 Sagouis, A., Cucherousset, J., Villéger, S., Santoul, F., & Boulêtreau, S. (2015). Non-native species modify the isotopic structure of freshwater fish communities across the globe. Ecography, 38(10), 979–985. <a href="https://doi.org/10.1111/ecog.01348" target="_blank">https://doi.org/10.1111/ecog.01348</a><br>📃 Boeger, W. A., Marteleto, F. M., Zagonel, L., & Braga, M. P. (2014). Tracking the history of an invasion: the freshwater croakers (Teleostei: Sciaenidae) in South America. Zool Scr, 44(3), 250–262. <a href="https://doi.org/10.1111/zsc.12098" target="_blank">https://doi.org/10.1111/zsc.12098</a><br>📃 Mindel, B. L., Webb, T. J., Neat, F. C., & Blanchard, J. L. (2016). A trait-based metric sheds new light on the nature of the body size-depth relationship in the deep sea. J Anim Ecol, 85(2), 427–436. <a href="https://doi.org/10.1111/1365-2656.12471" target="_blank">https://doi.org/10.1111/1365-2656.12471</a><br>📃 Miya, M., Friedman, M., Satoh, T. P., Takeshima, H., Sado, T., Iwasaki, W., … Nishida, M. (2013). Evolutionary Origin of the Scombridae (Tunas and Mackerels): Members of a Paleogene Adaptive Radiation with 14 Other Pelagic Fish Families. PLoS ONE, 8(9), e73535. <a href="https://doi.org/10.1371/journal.pone.0073535" target="_blank">https://doi.org/10.1371/journal.pone.0073535</a><br>📃 Price, S. A., Claverie, T., Near, T. J., & Wainwright, P. C. (2015). Phylogenetic insights into the history and diversification of fishes on reefs. Coral Reefs, 34(4), 997–1009. <a href="https://doi.org/10.1007/s00338-015-1326-7" target="_blank">https://doi.org/10.1007/s00338-015-1326-7</a><br>📃 Collins, R. A., Britz, R., & Rüber, L. (2015). Phylogenetic systematics of leaffishes (Teleostei: Polycentridae, Nandidae). Journal of Zoological Systematics and Evolutionary Research, 53(4), 259–272. <a href="https://doi.org/10.1111/jzs.12103" target="_blank">https://doi.org/10.1111/jzs.12103</a><br>📃 Schaefer, J., Frazier, N., & Barr, J. (2015). Dynamics of Near-Coastal Fish Assemblages following the Deepwater Horizon Oil Spill in the Northern Gulf of Mexico. Transactions of the American Fisheries Society, 145(1), 108–119. <a href="https://doi.org/10.1080/00028487.2015.1111253" target="_blank">https://doi.org/10.1080/00028487.2015.1111253</a><br>📃 Bezerra, L. A. V., Padial, A. A., Mariano, F. B., Garcez, D. S., & Sánchez-Botero, J. I. (2017). Fish diversity in tidepools: assembling effects of environmental heterogeneity. Environmental Biology of Fishes. <a href="https://doi.org/10.1007/s10641-017-0584-3" target="_blank">https://doi.org/10.1007/s10641-017-0584-3</a><br>📃 Tedesco, P. A., Beauchard, O., Bigorne, R., Blanchet, S., Buisson, L., Conti, L., … Oberdorff, T. (2017). A global database on freshwater fish species occurrence in drainage basins. Scientific Data, 4, 170141. <a href="https://doi.org/10.1038/sdata.2017.141" target="_blank">https://doi.org/10.1038/sdata.2017.141</a><br>📃 Dulvy, N. K., & Kindsvater, H. K. (2017). The Future Species of Anthropocene Seas. Conservation for the Anthropocene Ocean, 39–64. <a href="https://doi.org/10.1016/b978-0-12-805375-1.00003-9" target="_blank">https://doi.org/10.1016/b978-0-12-805375-1.00003-9</a><br>📃 Pedersen, E. J., Thompson, P. L., Ball, R. A., Fortin, M.-J., Gouhier, T. C., Link, H., … Pepin, P. (2017). Signatures of the collapse and incipient recovery of an overexploited marine ecosystem. Royal Society Open Science, 4(7), 170215. <a href="https://doi.org/10.1098/rsos.170215" target="_blank">https://doi.org/10.1098/rsos.170215</a><br>📃 Martin, B. T., Heintz, R., Danner, E. M., & Nisbet, R. M. (2017). Integrating lipid storage into general representations of fish energetics. Journal of Animal Ecology. <a href="https://doi.org/10.1111/1365-2656.12667" target="_blank">https://doi.org/10.1111/1365-2656.12667</a><br>📃 McCurry, M. R., Fitzgerald, E. M. G., Evans, A. R., Adams, J. W., & Mchenry, C. R. (2017). Skull shape reflects prey size niche in toothed whales. Biological Journal of the Linnean Society. <a href="https://doi.org/10.1093/biolinnean/blx032" target="_blank">https://doi.org/10.1093/biolinnean/blx032</a><br>📃 Landis, M. J., & Schraiber, J. G. (2017). Pulsed evolution shaped modern vertebrate body sizes. Proceedings of the National Academy of Sciences, 201710920. <a href="https://doi.org/10.1073/pnas.1710920114" target="_blank">https://doi.org/10.1073/pnas.1710920114</a><br>📃 Neubauer, P., Thorson, J. T., Melnychuk, M. C., Methot, R., & Blackhart, K. (2018). Drivers and rates of stock assessments in the United States. PLOS ONE, 13(5), e0196483. <a href="https://doi.org/10.1371/journal.pone.0196483" target="_blank">https://doi.org/10.1371/journal.pone.0196483</a><br>📃 Babcock, E. A., Tewfik, A., & Burns-Perez, V. (2018). Fish community and single-species indicators provide evidence of unsustainable practices in a multi-gear reef fishery. Fisheries Research, 208, 70–85. <a href="https://doi.org/10.1016/j.fishres.2018.07.003" target="_blank">https://doi.org/10.1016/j.fishres.2018.07.003</a><br>📃 Van Gemert, R., & Andersen, K. H. (2018). Challenges to fisheries advice and management due to stock recovery. ICES Journal of Marine Science. <a href="https://doi.org/10.1093/icesjms/fsy084" target="_blank">https://doi.org/10.1093/icesjms/fsy084</a><br>📃 Sánchez-Hernández, J., & Amundsen, P.-A. (2018). Ecosystem type shapes trophic position and omnivory in fishes. Fish and Fisheries. <a href="https://doi.org/10.1111/faf.12308" target="_blank">https://doi.org/10.1111/faf.12308</a><br>📃 Degen, R., & Faulwetter, S. (2018). The Arctic Traits Database: A repository of arctic benthic invertebrate traits. Earth System Science Data Discussions, 1–25. <a href="https://doi.org/10.5194/essd-2018-97" target="_blank">https://doi.org/10.5194/essd-2018-97</a><br>📃 Jarić, I., Lennox, R. J., Kalinkat, G., Cvijanović, G., & Radinger, J. (2018). Susceptibility of European freshwater fish to climate change: species profiling based on life-history and environmental characteristics. Global Change Biology. <a href="https://doi.org/10.1111/gcb.14518" target="_blank">https://doi.org/10.1111/gcb.14518</a><br>📃 Borstein, S. R., Fordyce, J. A., O’Meara, B. C., Wainwright, P. C., & McGee, M. D. (2018). Reef fish functional traits evolve fastest at trophic extremes. Nature Ecology & Evolution. <a href="https://doi.org/10.1038/s41559-018-0725-x" target="_blank">https://doi.org/10.1038/s41559-018-0725-x</a><br>📃 West, C. D., Hobbs, E., Croft, S. A., Green, J. M. H., Schmidt, S. Y., & Wood, R. (2018). Improving consumption based accounting for global capture fisheries. Journal of Cleaner Production. <a href="https://doi.org/10.1016/j.jclepro.2018.11.298" target="_blank">https://doi.org/10.1016/j.jclepro.2018.11.298</a><br>📃 Leaf, R. T., & Oshima, M. C. (2019). Construction and evaluation of a robust trophic network model for the northern Gulf of Mexico ecosystem. Ecological Informatics, 50, 13–23. <a href="https://doi.org/10.1016/j.ecoinf.2018.12.005" target="_blank">https://doi.org/10.1016/j.ecoinf.2018.12.005</a><br>📃 Pimiento, C., Cantalapiedra, J. L., Shimada, K., Field, D. J., & Smaers, J. B. (2019). Evolutionary pathways toward gigantism in sharks and rays. Evolution. <a href="https://doi.org/10.1111/evo.13680" target="_blank">https://doi.org/10.1111/evo.13680</a><br>📃 Free, C. M., Thorson, J. T., Pinsky, M. L., Oken, K. L., Wiedenmann, J., & Jensen, O. P. (2019). Impacts of historical warming on marine fisheries production. Science, 363(6430), 979–983. <a href="https://doi.org/10.1126/science.aau1758" target="_blank">https://doi.org/10.1126/science.aau1758</a><br>📃 Pinsky, M. L., Eikeset, A. M., McCauley, D. J., Payne, J. L., & Sunday, J. M. (2019). Greater vulnerability to warming of marine versus terrestrial ectotherms. Nature, 569(7754), 108–111. <a href="https://doi.org/10.1038/s41586-019-1132-4" target="_blank">https://doi.org/10.1038/s41586-019-1132-4</a><br>📃 Goodman, M. C., Hannah, S. M., & Ruttenberg, B. I. (2019). The relationship between geographic range extent, sea surface temperature and adult traits in coastal temperate fishes. Journal of Biogeography. <a href="https://doi.org/10.1111/jbi.13595" target="_blank">https://doi.org/10.1111/jbi.13595</a><br>📃 Van Denderen, D., Gislason, H., & Andersen, K. H. (2019). Little difference in average fish growth and maximum size across temperatures. EcoEvoRxiv. <a href="https://doi.org/10.32942/osf.io/8cu4y" target="_blank">https://doi.org/10.32942/osf.io/8cu4y</a><br>📃 Nyboer, E. A., Liang, C., & Chapman, L. J. (2019). Assessing the vulnerability of Africa’s freshwater fishes to climate change: A continent-wide trait-based analysis. Biological Conservation, 236, 505–520. <a href="https://doi.org/10.1016/j.biocon.2019.05.003" target="_blank">https://doi.org/10.1016/j.biocon.2019.05.003</a><br>📃 Petrik, C. M., Stock, C. A., Andersen, K. H., van Denderen, P. D., & Watson, J. R. (2019). Bottom-up drivers of global patterns of demersal, forage, and pelagic fishes. Progress in Oceanography, 176, 102124. <a href="https://doi.org/10.1016/j.pocean.2019.102124" target="_blank">https://doi.org/10.1016/j.pocean.2019.102124</a><br>📃 Kovalenko, K. E., Johnson, L. B., Brady, V. J., Ciborowski, J. J. H., Cooper, M. J., Gathman, J. P., … Uzarski, D. G. (2019). Hotspots and bright spots in functional and taxonomic fish diversity. Freshwater Science, 000–000. <a href="https://doi.org/10.1086/704713" target="_blank">https://doi.org/10.1086/704713</a><br>📃 Valdez, J. W., & Mandrekar, K. (2019). Assessing the Species in the CARES Preservation Program and the Role of Aquarium Hobbyists in Freshwater Fish Conservation. <a href="https://doi.org/10.20944/preprints201907.0030.v1" target="_blank">https://doi.org/10.20944/preprints201907.0030.v1</a><br>📃 Collins, R. A., Bakker, J., Wangensteen, O. S., Soto, A. Z., Corrigan, L., Sims, D. W., … Mariani, S. (2019). Non‐specific amplification compromises environmental DNA metabarcoding with COI. Methods in Ecology and Evolution. <a href="https://doi.org/10.1111/2041-210x.13276" target="_blank">https://doi.org/10.1111/2041-210x.13276</a><br>📃 Hayden, B., Palomares, M. L. D., Smith, B. E., & Poelen, J. H. (2019). Biological and environmental drivers of trophic ecology in marine fishes - a global perspective. Scientific Reports, 9(1). <a href="https://doi.org/10.1038/s41598-019-47618-2" target="_blank">https://doi.org/10.1038/s41598-019-47618-2</a><br>📃 Lacy, S. N., Corcoran, D., Alò, D., Lessmann, J., Meza, F., & Marquet, P. A. (2019). Main drivers of freshwater fish diversity across extra-tropical Southern Hemisphere rivers. Hydrobiologia. <a href="https://doi.org/10.1007/s10750-019-04044-9" target="_blank">https://doi.org/10.1007/s10750-019-04044-9</a><br>📃 Bayley, D. T. I., Mogg, A. O. M., Purvis, A., & Koldewey, H. J. (2019). Evaluating the efficacy of small‐scale marine protected areas for preserving reef health: A case study applying emerging monitoring technology. Aquatic Conservation: Marine and Freshwater Ecosystems. <a href="https://doi.org/10.1002/aqc.3215" target="_blank">https://doi.org/10.1002/aqc.3215</a><br>📃 Friedman, M., Feilich, K. L., Beckett, H. T., Alfaro, M. E., Faircloth, B. C., Černý, D., … Harrington, R. C. (2019). A phylogenomic framework for pelagiarian fishes (Acanthomorpha: Percomorpha) highlights mosaic radiation in the open ocean. Proceedings of the Royal Society B: Biological Sciences, 286(1910), 20191502. <a href="https://doi.org/10.1098/rspb.2019.1502" target="_blank">https://doi.org/10.1098/rspb.2019.1502</a><br>📃 Cazelles, K., Bartley, T., Guzzo, M. M., Brice, M., MacDougall, A. S., Bennett, J. R., … McCann, K. S. (2019). Homogenization of freshwater lakes: recent compositional shifts in fish communities are explained by gamefish movement and not climate change. Global Change Biology. <a href="https://doi.org/10.1111/gcb.14829" target="_blank">https://doi.org/10.1111/gcb.14829</a><br>📃 Benun Sutton, F., & Wilson, A. B. (2019). Where are all the moms? External fertilization predicts the rise of male parental care in bony fishes. Evolution. <a href="https://doi.org/10.1111/evo.13846" target="_blank">https://doi.org/10.1111/evo.13846</a><br>📃 Thorson, J. T. (2019). Predicting recruitment density dependence and intrinsic growth rate for all fishes worldwide using a data‐integrated life‐history model. Fish and Fisheries. <a href="https://doi.org/10.1111/faf.12427" target="_blank">https://doi.org/10.1111/faf.12427</a><br>📃 Lecocq, T., Benard, A., Pasquet, A., Nahon, S., Ducret, A., Dupont-Marin, K., … Thomas, M. (2019). TOFF, a database of traits of fish to promote advances in fish aquaculture. Scientific Data, 6(1). <a href="https://doi.org/10.1038/s41597-019-0307-z" target="_blank">https://doi.org/10.1038/s41597-019-0307-z</a><br>📃 Blowes, S. A., Chase, J. M., Di Franco, A., Frid, O., Gotelli, N. J., Guidetti, P., … Belmaker, J. (2020). Mediterranean marine protected areas have higher biodiversity via increased evenness, not abundance. Journal of Applied Ecology, 57(3), 578–589. <a href="https://doi.org/10.1111/1365-2664.13549" target="_blank">https://doi.org/10.1111/1365-2664.13549</a><br>📃 Burns, M. D., & Bloom, D. D. (2020). Migratory lineages rapidly evolve larger body sizes than non-migratory relatives in ray-finned fishes. Proceedings of the Royal Society B: Biological Sciences, 287(1918), 20192615. <a href="https://doi.org/10.1098/rspb.2019.2615" target="_blank">https://doi.org/10.1098/rspb.2019.2615</a><br>📃 Pimiento, C., & Benton, M. J. (2020). The impact of the Pull of the Recent on extant elasmobranchs. Palaeontology. <a href="https://doi.org/10.1111/pala.12478" target="_blank">https://doi.org/10.1111/pala.12478</a><br>📃 Manel, S., Guerin, P.-E., Mouillot, D., Blanchet, S., Velez, L., Albouy, C., & Pellissier, L. (2020). Global determinants of freshwater and marine fish genetic diversity. Nature Communications, 11(1). <a href="https://doi.org/10.1038/s41467-020-14409-7" target="_blank">https://doi.org/10.1038/s41467-020-14409-7</a><br>📃 Parravicini, V., Casey, J. M., Schiettekatte, N. M. D., Brandl, S. J., Pozas-Schacre, C., Carlot, J., … Vii, J. (2020). Global gut content data synthesis and phylogeny delineate reef fish trophic guilds. <a href="https://doi.org/10.1101/2020.03.04.977116" target="_blank">https://doi.org/10.1101/2020.03.04.977116</a><br>📃 Jézéquel, C., Tedesco, P. A., Bigorne, R., Maldonado-Ocampo, J. A., Ortega, H., Hidalgo, M., … Oberdorff, T. (2020). A database of freshwater fish species of the Amazon Basin. Scientific Data, 7(1). <a href="https://doi.org/10.1038/s41597-020-0436-4" target="_blank">https://doi.org/10.1038/s41597-020-0436-4</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rfisheries </td>
   <td style="text-align:left;"> Programmatic Interface to the 'openfisheries.org' API </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Karthik Ram </td>
   <td style="text-align:left;"> A programmatic interface to 'openfisheries.org'. This package is    part of the 'rOpenSci' suite (https://ropensci.org). </td>
   <td style="text-align:left;"> fisheries, open-data, openfisheries </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Drozd, P., & Šipoš, J. (2013). R for all (I): Introduction to the new age of biological analyses. Casopis Slezskeho Zemskeho Muzea (A), 62(1). <a href="https://doi.org/10.2478/cszma-2013-0004" target="_blank">https://doi.org/10.2478/cszma-2013-0004</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rflybase </td>
   <td style="text-align:left;"> Interface to 'FlyBase' </td>
   <td style="text-align:left;"> http://flybase.org </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> An interface to the 'FlyBase' (<http://flybase.org>). </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rfna </td>
   <td style="text-align:left;"> Web scraper for the Flora of North America </td>
   <td style="text-align:left;"> http://www.efloras.org </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Functions to do web scraping on    the Flora of North America website <http://www.efloras.org>. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rgbif </td>
   <td style="text-align:left;"> Interface to the Global 'Biodiversity' Information Facility API </td>
   <td style="text-align:left;"> https://www.gbif.org/developer/summary </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> A programmatic interface to the Web Service methods    provided by the Global Biodiversity Information Facility ('GBIF';    <https://www.gbif.org/developer/summary>). 'GBIF' is a database    of species occurrence records from sources all over the globe.    'rgbif' includes functions for searching for taxonomic names,    retrieving information on data providers, getting species occurrence    records, getting counts of occurrence records, and using the 'GBIF'    tile map service to make 'rasters' summarizing huge amounts of data. </td>
   <td style="text-align:left;"> API, GBIF, occurrences, species, specimens, taxonomy, web-services </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Amano, T., Lamming, J. D. L., & Sutherland, W. J. (2016). Spatial Gaps in Global Biodiversity Information and the Role of Citizen Science. BioScience, 66(5), 393–400. <a href="https://doi.org/10.1093/biosci/biw022" target="_blank">https://doi.org/10.1093/biosci/biw022</a><br>📃 Bartomeus, I., Park, M. G., Gibbs, J., Danforth, B. N., Lakso, A. N., & Winfree, R. (2013). Biodiversity ensures plant-pollinator phenological synchrony against climate change. Ecol Lett, 16(11), 1331–1338. <a href="https://doi.org/10.1111/ele.12170" target="_blank">https://doi.org/10.1111/ele.12170</a><br>📃 Barve, V. (2014). Discovering and developing primary biodiversity data from social networking sites: A novel approach. Ecological Informatics, 24, 194–199. <a href="https://doi.org/10.1016/j.ecoinf.2014.08.008" target="_blank">https://doi.org/10.1016/j.ecoinf.2014.08.008</a><br>📃 Bone, R. E., Smith, J. A. C., Arrigo, N., & Buerki, S. (2015). A macro-ecological perspective on crassulacean acid metabolism (CAM) photosynthesis evolution in Afro-Madagascan drylands: Eulophiinae orchids as a case study. New Phytol, 208(2), 469–481. <a href="https://doi.org/10.1111/nph.13572" target="_blank">https://doi.org/10.1111/nph.13572</a><br>📃 Collins, R., Duarte Ribeiro, E., Nogueira Machado, V., Hrbek, T., & Farias, I. (2015). A preliminary inventory of the catfishes of the lower Rio Nhamundá, Brazil (Ostariophysi, Siluriformes). Biodiversity Data Journal, 3, e4162. <a href="https://doi.org/10.3897/bdj.3.e4162" target="_blank">https://doi.org/10.3897/bdj.3.e4162</a><br>📃 Drozd, P., & Šipoš, J. (2013). R for all (I): Introduction to the new age of biological analyses. Casopis Slezskeho Zemskeho Muzea (A), 62(1). <a href="https://doi.org/10.2478/cszma-2013-0004" target="_blank">https://doi.org/10.2478/cszma-2013-0004</a><br>📃 Kong, X., Huang, M., & Duan, R. (2015). SDMdata: A Web-Based Software Tool for Collecting Species Occurrence Records. PLoS ONE, 10(6), e0128295. <a href="https://doi.org/10.1371/journal.pone.0128295" target="_blank">https://doi.org/10.1371/journal.pone.0128295</a><br>📃 Richardson, D. M., Le Roux, J. J., & Wilson, J. R. (2015). Australian acacias as invasive species: lessons to be learnt from regions with long planting histories. Southern Forests: a Journal of Forest Science, 77(1), 31–39. <a href="https://doi.org/10.2989/20702620.2014.999305" target="_blank">https://doi.org/10.2989/20702620.2014.999305</a><br>📃 Turner, K. G., Fréville, H., & Rieseberg, L. H. (2015). Adaptive plasticity and niche expansion in an invasive thistle. Ecology and Evolution, 5(15), 3183–3197. <a href="https://doi.org/10.1002/ece3.1599" target="_blank">https://doi.org/10.1002/ece3.1599</a><br>📃 Verheijen, L. M., Aerts, R., Bönisch, G., Kattge, J., & Van Bodegom, P. M. (2015). Variation in trait trade-offs allows differentiation among predefined plant functional types: implications for predictive ecology. New Phytol, 209(2), 563–575. <a href="https://doi.org/10.1111/nph.13623" target="_blank">https://doi.org/10.1111/nph.13623</a><br>📃 Zizka, A., & Antonelli, A. (2015). speciesgeocodeR: An R package for linking species occurrences, user-defined regions and phylogenetic trees for biogeography, ecology and evolution. <a href="https://doi.org/10.1101/032755" target="_blank">https://doi.org/10.1101/032755</a><br>📃 Butterfield, B. J., Copeland, S. M., Munson, S. M., Roybal, C. M., & Wood, T. E. (2016). Prestoration: using species in restoration that will persist now and into the future. Restoration Ecology. <a href="https://doi.org/10.1111/rec.12381" target="_blank">https://doi.org/10.1111/rec.12381</a><br>📃 Dellinger, A. S., Essl, F., Hojsgaard, D., Kirchheimer, B., Klatt, S., Dawson, W., … Dullinger, S. (2015). Niche dynamics of alien species do not differ among sexual and apomictic flowering plants. New Phytol, 209(3), 1313–1323. <a href="https://doi.org/10.1111/nph.13694" target="_blank">https://doi.org/10.1111/nph.13694</a><br>📃 Feitosa, Y. O., Absy, M. L., Latrubesse, E. M., & Stevaux, J. C. (2015). Late Quaternary vegetation dynamics from central parts of the Madeira River in Brazil. Acta Botanica Brasilica, 29(1), 120–128. <a href="https://doi.org/10.1590/0102-33062014abb3711" target="_blank">https://doi.org/10.1590/0102-33062014abb3711</a><br>📃 Malhado, A. C. M., Oliveira-Neto, J. A., Stropp, J., Strona, G., Dias, L. C. P., Pinto, L. B., & Ladle, R. J. (2015). Climatological correlates of seed size in Amazonian forest trees. Journal of Vegetation Science, 26(5), 956–963. <a href="https://doi.org/10.1111/jvs.12301" target="_blank">https://doi.org/10.1111/jvs.12301</a><br>📃 Werner, G. D. A., Cornwell, W. K., Cornelissen, J. H. C., & Kiers, E. T. (2015). Evolutionary signals of symbiotic persistence in the legume–rhizobia mutualism. Proc Natl Acad Sci USA, 112(33), 10262–10269. <a href="https://doi.org/10.1073/pnas.1424030112" target="_blank">https://doi.org/10.1073/pnas.1424030112</a><br>📃 Robertson, M. P., Visser, V., & Hui, C. (2016). Biogeo: an R package for assessing and improving data quality of occurrence record datasets. Ecography, 39(4), 394–401. <a href="https://doi.org/10.1111/ecog.02118" target="_blank">https://doi.org/10.1111/ecog.02118</a><br>📃 Davison, J., Moora, M., Opik, M., Adholeya, A., Ainsaar, L., Ba, A., … Zobel, M. (2015). Global assessment of arbuscular mycorrhizal fungus diversity reveals very low endemism. Science, 349(6251), 970–973. <a href="https://doi.org/10.1126/science.aab1161" target="_blank">https://doi.org/10.1126/science.aab1161</a><br>📃 Curtis, C. A., & Bradley, B. A. (2016). Plant Distribution Data Show Broader Climatic Limits than Expert-Based Climatic Tolerance Estimates. PLOS ONE, 11(11), e0166407. <a href="https://doi.org/10.1371/journal.pone.0166407" target="_blank">https://doi.org/10.1371/journal.pone.0166407</a><br>📃 Dullinger, I., Wessely, J., Bossdorf, O., Dawson, W., Essl, F., Gattringer, A., … Dullinger, S. (2016). Climate change will increase the naturalization risk from garden plants in Europe. Global Ecol. Biogeogr. <a href="https://doi.org/10.1111/geb.12512" target="_blank">https://doi.org/10.1111/geb.12512</a><br>📃 Groom, Q., Weatherdon, L., & Geijzendorffer, I. R. (2016). Is citizen science an open science in the case of biodiversity observations? Journal of Applied Ecology. <a href="https://doi.org/10.1111/1365-2664.12767" target="_blank">https://doi.org/10.1111/1365-2664.12767</a><br>📃 Janssens, S. B., Vandelook, F., De Langhe, E., Verstraete, B., Smets, E., Vandenhouwe, I., & Swennen, R. (2016). Evolutionary dynamics and biogeography of Musaceae reveal a correlation between the diversification of the banana family and the geological and climatic history of Southeast Asia. New Phytol, 210(4), 1453–1465. <a href="https://doi.org/10.1111/nph.13856" target="_blank">https://doi.org/10.1111/nph.13856</a><br>📃 Sanyal, A., & Decocq, G. (2016). Adaptive evolution of seed oil content in angiosperms: accounting for the global patterns of seed oils. BMC Evolutionary Biology, 16(1). <a href="https://doi.org/10.1186/s12862-016-0752-7" target="_blank">https://doi.org/10.1186/s12862-016-0752-7</a><br>📃 Gilles, D., Zaiss, R., Blach-Overgaard, A., Catarino, L., Damen, T., Deblauwe, V., et al. (2016). RAINBIO: a mega-database of tropical African vascular plants distributions. PhytoKeys, 74, 1–18. <a href="https://doi.org/10.3897/phytokeys.74.9723" target="_blank">https://doi.org/10.3897/phytokeys.74.9723</a><br>📃 Lundgren, M. R., & Christin, P.-A. (2016). Despite phylogenetic effects, C3-C4 lineages bridge the ecological gap to C4 photosynthesis. Journal of Experimental Botany, erw451. <a href="https://doi.org/10.1093/jxb/erw451" target="_blank">https://doi.org/10.1093/jxb/erw451</a><br>📃 Rai, K., Bhattarai, N. R., Vanaerschot, M., Imamura, H., Gebru, G., Khanal, B., … Van der Auwera, G. (2017). Single locus genotyping to track Leishmania donovani in the Indian subcontinent: Application in Nepal. PLOS Neglected Tropical Diseases, 11(3), e0005420. <a href="https://doi.org/10.1371/journal.pntd.0005420" target="_blank">https://doi.org/10.1371/journal.pntd.0005420</a><br>📃 Balao, F., Trucchi, E., Wolfe, T., Hao, B.-H., Lorenzo, M. T., Baar, J., … Paun, O. (2017). Adaptive sequence evolution is driven by biotic stress in a pair of orchid species (Dactylorhiza) with distinct ecological optima. Molecular Ecology. <a href="https://doi.org/10.1111/mec.14123" target="_blank">https://doi.org/10.1111/mec.14123</a><br>📃 Carvajal-Endara, S., Hendry, A. P., Emery, N. C., & Davies, T. J. (2017). Habitat filtering not dispersal limitation shapes oceanic island floras: species assembly of the Galápagos archipelago. Ecology Letters, 20(4), 495–504. <a href="https://doi.org/10.1111/ele.12753" target="_blank">https://doi.org/10.1111/ele.12753</a><br>📃 Mounce, R., Smith, P., & Brockington, S. (2017). Ex situ conservation of plant diversity in the world’s botanic gardens. Nature Plants, 3(10), 795–802. <a href="https://doi.org/10.1038/s41477-017-0019-3" target="_blank">https://doi.org/10.1038/s41477-017-0019-3</a><br>📃 Alfsnes, K., Leinaas, H. P., & Hessen, D. O. (2017). Genome size in arthropods: different roles of phylogeny, habitat and life history in insects and crustaceans. Ecology and Evolution. <a href="https://doi.org/10.1002/ece3.3163" target="_blank">https://doi.org/10.1002/ece3.3163</a><br>📃 Chamberlain SA, Boettiger C. (2017) R Python, and Ruby clients for GBIF species occurrence data. PeerJ Preprints 5:e3304v1 <a href="https://doi.org/10.7287/peerj.preprints.3304v1" target="_blank">https://doi.org/10.7287/peerj.preprints.3304v1</a><br>📃 Ludt, W. B., Morgan, L., Bishop, J., & Chakrabarty, P. (2017). A quantitative and statistical biological comparison of three semi-enclosed seas: the Red Sea, the Persian (Arabian) Gulf, and the Gulf of California. Marine Biodiversity. <a href="https://doi.org/10.1007/s12526-017-0740-1" target="_blank">https://doi.org/10.1007/s12526-017-0740-1</a><br>📃 Vanderhoeven, S., Adriaens, T., Desmet, P., Strubbe, D., Backeljau, T., Barbier, Y., … Groom, Q. (2017). Tracking Invasive Alien Species (TrIAS): Building a data-driven framework to inform policy. Research Ideas and Outcomes, 3, e13414. <a href="https://doi.org/10.3897/rio.3.e13414" target="_blank">https://doi.org/10.3897/rio.3.e13414</a><br>📃 Aedo, C., & Pando, F. (2017). A distribution and taxonomic reference dataset of Geranium in the New World. Scientific Data, 4, 170049. <a href="https://doi.org/10.1038/sdata.2017.49" target="_blank">https://doi.org/10.1038/sdata.2017.49</a><br>📃 Cardoso, D., Särkinen, T., Alexander, S., Amorim, A. M., Bittrich, V., Celis, M., … Forzza, R. C. (2017). Amazon plant diversity revealed by a taxonomically verified species list. Proceedings of the National Academy of Sciences, 201706756. <a href="https://doi.org/10.1073/pnas.1706756114" target="_blank">https://doi.org/10.1073/pnas.1706756114</a><br>📃 Duffy, G. A., Coetzee, B. W. T., Latombe, G., Akerman, A. H., McGeoch, M. A., & Chown, S. L. (2017). Barriers to globally invasive species are weakening across the Antarctic. Diversity and Distributions. <a href="https://doi.org/10.1111/ddi.12593" target="_blank">https://doi.org/10.1111/ddi.12593</a><br>📃 Pereira, A. G., Sterli, J., Moreira, F. R. R., & Schrago, C. G. (2017). Multilocus phylogeny and statistical biogeography clarify the evolutionary history of major lineages of turtles. Molecular Phylogenetics and Evolution. <a href="https://doi.org/10.1016/j.ympev.2017.05.008" target="_blank">https://doi.org/10.1016/j.ympev.2017.05.008</a><br>📃 Mayer, K., Haeuser, E., Dawson, W., Essl, F., Kreft, H., Pergl, J., … van Kleunen, M. (2017). Naturalization of ornamental plant species in public green spaces and private gardens. Biological Invasions. <a href="https://doi.org/10.1007/s10530-017-1594-y" target="_blank">https://doi.org/10.1007/s10530-017-1594-y</a><br>📃 Chalmandrier, L., Albouy, C., & Pellissier, L. (2017). Species pool distributions along functional trade-offs shape plant productivity–diversity relationships. Scientific Reports, 7(1). <a href="https://doi.org/10.1038/s41598-017-15334-4" target="_blank">https://doi.org/10.1038/s41598-017-15334-4</a><br>📃 Serra-Diaz, J. M., Enquist, B. J., Maitner, B., Merow, C., & Svenning, J.-C. (2017). Big data of tree species distributions: how big and how good? Forest Ecosystems, 4(1). <a href="https://doi.org/10.1186/s40663-017-0120-0" target="_blank">https://doi.org/10.1186/s40663-017-0120-0</a><br>📃 Sanyal, A., Lenoir, J., O’Neill, C., Dubois, F., & Decocq, G. (2018). Intraspecific and interspecific adaptive latitudinal cline in Brassicaceae seed oil traits. American Journal of Botany, 105(1), 85–94. <a href="https://doi.org/10.1002/ajb2.1014" target="_blank">https://doi.org/10.1002/ajb2.1014</a><br>📃 Bemmels, J. B., Wright, S. J., Garwood, N. C., Queenborough, S. A., Valencia, R., & Dick, C. W. (2018). Filter-dispersal assembly of lowland Neotropical rainforests across the Andes. Ecography. <a href="https://doi.org/10.1111/ecog.03473" target="_blank">https://doi.org/10.1111/ecog.03473</a><br>📃 Gearty, W., McClain, C. R., & Payne, J. L. (2018). Energetic tradeoffs control the size distribution of aquatic mammals. Proceedings of the National Academy of Sciences, 201712629. <a href="https://doi.org/10.1073/pnas.1712629115" target="_blank">https://doi.org/10.1073/pnas.1712629115</a><br>📃 Schweiger, A. H., & Svenning, J.-C. (2018). Down-sizing of dung beetle assemblages over the last 53 000 years is consistent with a dominant effect of megafauna losses. Oikos. <a href="https://doi.org/10.1111/oik.04995" target="_blank">https://doi.org/10.1111/oik.04995</a><br>📃 Saad, N. J., Lynch, V. D., Antillón, M., Yang, C., Crump, J. A., & Pitzer, V. E. (2018). Seasonal dynamics of typhoid and paratyphoid fever. Scientific Reports, 8(1). <a href="https://doi.org/10.1038/s41598-018-25234-w" target="_blank">https://doi.org/10.1038/s41598-018-25234-w</a><br>📃 Wiltshire, K., Tanner, J. E., Althaus, F., Sorokin, S., & Williams, A. (2018). Predicting environmental suitability for key benthic species in an ecologically and economically important deep-sea environment. Deep Sea Research Part II: Topical Studies in Oceanography. <a href="https://doi.org/10.1016/j.dsr2.2018.06.011" target="_blank">https://doi.org/10.1016/j.dsr2.2018.06.011</a><br>📃 De Oliveira, H., Oprea, M., & Dias, R. (2018). Distributional Patterns and Ecological Determinants of Bat Occurrence Inside Caves: A Broad Scale Meta-Analysis. Diversity, 10(3), 49. <a href="https://doi.org/10.3390/d10030049" target="_blank">https://doi.org/10.3390/d10030049</a><br>📃 Andrea Sánchez-Tapia, Mário L Garbin, Marinez F Siqueira, Karlo G Guidoni-Martins, Fabio R Scarano, Tatiana T Carrijo. Environmental and geographical space partitioning between core and peripheral Myrsine species (Primulaceae) of the Brazilian Atlantic Forest, Botanical Journal of the Linnean Society <a href="https://doi.org/10.1093/botlinnean/boy034" target="_blank">https://doi.org/10.1093/botlinnean/boy034</a><br>📃 Lortie, C. J., Filazzola, A., Kelsey, R., Hart, A. K., & Butterfield, H. S. (2018). Better late than never: a synthesis of strategic land retirement and restoration in California. Ecosphere, 9(8), e02367. <a href="https://doi.org/10.1002/ecs2.2367" target="_blank">https://doi.org/10.1002/ecs2.2367</a><br>📃 Boria, R. A., & Blois, J. L. (2018). The effect of large sample sizes on ecological niche models: Analysis using a North American rodent, Peromyscus maniculatus. Ecological Modelling, 386, 83–88. <a href="https://doi.org/10.1016/j.ecolmodel.2018.08.013" target="_blank">https://doi.org/10.1016/j.ecolmodel.2018.08.013</a><br>📃 Dallas, T. A., & Hastings, A. (2018). Habitat suitability estimated by niche models is largely unrelated to species abundance. Global Ecology and Biogeography. <a href="https://doi.org/10.1111/geb.12820" target="_blank">https://doi.org/10.1111/geb.12820</a><br>📃 Testo, W. L., Sessa, E., & Barrington, D. S. (2018). The rise of the Andes promoted rapid diversification in Neotropical Phlegmariurus (Lycopodiaceae). New Phytologist. <a href="https://doi.org/10.1111/nph.15544" target="_blank">https://doi.org/10.1111/nph.15544</a><br>📃 Smith, J. R., Letten, A. D., Ke, P.-J., Anderson, C. B., Hendershot, J. N., Dhami, M. K., … Daily, G. C. (2018). A global test of ecoregions. Nature Ecology & Evolution. <a href="https://doi.org/10.1038/s41559-018-0709-x" target="_blank">https://doi.org/10.1038/s41559-018-0709-x</a><br>📃 Collins, R. A., Wangensteen, O. S., O’Gorman, E. J., Mariani, S., Sims, D. W., & Genner, M. J. (2018). Persistence of environmental DNA in marine systems. Communications Biology, 1(1). <a href="https://doi.org/10.1038/s42003-018-0192-6" target="_blank">https://doi.org/10.1038/s42003-018-0192-6</a><br>📃 Bentz, C., Dediu, D., Verkerk, A., & Jäger, G. (2018). The evolution of language families is shaped by the environment beyond neutral drift. Nature Human Behaviour, 2(11), 816–821. <a href="https://doi.org/10.1038/s41562-018-0457-6" target="_blank">https://doi.org/10.1038/s41562-018-0457-6</a><br>📃 Menegotto, A., & Rangel, T. F. (2018). Mapping knowledge gaps in marine diversity reveals a latitudinal gradient of missing species richness. Nature Communications, 9(1). <a href="https://doi.org/10.1038/s41467-018-07217-7" target="_blank">https://doi.org/10.1038/s41467-018-07217-7</a><br>📃 Bartomeus, I., Stavert, J. R., Ward, D., & Aguado, O. (2018). Historical collections as a tool for assessing the global pollination crisis. Philosophical Transactions of the Royal Society B: Biological Sciences, 374(1763), 20170389. <a href="https://doi.org/10.1098/rstb.2017.0389" target="_blank">https://doi.org/10.1098/rstb.2017.0389</a><br>📃 Hanson, J. O., Fuller, R. A., & Rhodes, J. R. (2018). Conventional methods for enhancing connectivity in conservation planning do not always maintain gene flow. Journal of Applied Ecology. <a href="https://doi.org/10.1111/1365-2664.13315" target="_blank">https://doi.org/10.1111/1365-2664.13315</a><br>📃 Vidal, J. de D., de Souza, A. P., & Koch, I. (2018). Impacts of landscape composition, marginality of distribution, soil fertility, and climatic stability on the patterns of woody plant endemism in the Cerrado. <a href="https://doi.org/10.1101/362475" target="_blank">https://doi.org/10.1101/362475</a><br>📃 López-Jurado, J., Mateos-Naranjo, E., & Balao, F. (2018). Niche divergence and limits to expansion in the high polyploid Dianthus broteri complex. New Phytologist. <a href="https://doi.org/10.1111/nph.15663" target="_blank">https://doi.org/10.1111/nph.15663</a><br>📃 Spalink, D., MacKay, R., & Sytsma, K. J. (2019). Phylogeography, population genetics, and distribution modeling reveal vulnerability of Scirpus longii (Cyperaceae) and the Atlantic Coastal Plain Flora to climate change. Molecular Ecology. <a href="https://doi.org/10.1111/mec.15006" target="_blank">https://doi.org/10.1111/mec.15006</a><br>📃 Lee, C. K. F., Keith, D. A., Nicholson, E., & Murray, N. J. (2019). REDLISTR: Tools for the IUCN Red Lists of Ecosystems and Threatened Species in R. Ecography. <a href="https://doi.org/10.1111/ecog.04143" target="_blank">https://doi.org/10.1111/ecog.04143</a><br>📃 Ladwig, L. M., Chandler, J. L., Guiden, P. W., & Henn, J. J. (2019). Extreme winter warm event causes exceptionally early bud break for many woody species. Ecosphere, 10(1), e02542. <a href="https://doi.org/10.1002/ecs2.2542" target="_blank">https://doi.org/10.1002/ecs2.2542</a><br>📃 Lu, M., & Hedin, L. O. (2019). Global plant–symbiont organization and emergence of biogeochemical cycles resolved by evolution-based trait modelling. Nature Ecology & Evolution, 3(2), 239–250. <a href="https://doi.org/10.1038/s41559-018-0759-0" target="_blank">https://doi.org/10.1038/s41559-018-0759-0</a><br>📃 Zizka, A., Silvestro, D., Andermann, T., Azevedo, J., Duarte Ritter, C., Edler, D., … Antonelli, A. (2019). CoordinateCleaner: standardized cleaning of occurrence records from biological collection databases. Methods in Ecology and Evolution. <a href="https://doi.org/10.1111/2041-210x.13152" target="_blank">https://doi.org/10.1111/2041-210x.13152</a><br>📃 Rice, A., Šmarda, P., Novosolov, M., Drori, M., Glick, L., Sabath, N., … Mayrose, I. (2019). The global biogeography of polyploid plants. Nature Ecology & Evolution, 3(2), 265–273. <a href="https://doi.org/10.1038/s41559-018-0787-9" target="_blank">https://doi.org/10.1038/s41559-018-0787-9</a><br>📃 Daru, B. H., le Roux, P. C., Gopalraj, J., Park, D. S., Holt, B. G., & Greve, M. (2019). Spatial overlaps between the global protected areas network and terrestrial hotspots of evolutionary diversity. Global Ecology and Biogeography. <a href="https://doi.org/10.1111/geb.12888" target="_blank">https://doi.org/10.1111/geb.12888</a><br>📃 Dillen, M., Groom, Q., Chagnoux, S., Güntsch, A., Hardisty, A., Haston, E., … Phillips, S. (2019). A benchmark dataset of herbarium specimen images with label data. Biodiversity Data Journal, 7. <https://10.3897/bdj.7.e31817> <a href="https://doi.org/10.3897/bdj.7.e31817" target="_blank">https://doi.org/10.3897/bdj.7.e31817</a><br>📃 Piñar, G., Poyntner, C., Tafer, H., & Sterflinger, K. (2019). A time travel story: metagenomic analyses decipher the unknown geographical shift and the storage history of possibly smuggled antique marble statues. Annals of Microbiology. <a href="https://doi.org/10.1007/s13213-019-1446-3" target="_blank">https://doi.org/10.1007/s13213-019-1446-3</a><br>📃 Dreyer, J. B. B., Higuchi, P., & Silva, A. C. (2019). Ligustrum lucidum W. T. Aiton (broad-leaf privet) demonstrates climatic niche shifts during global-scale invasion. Scientific Reports, 9(1). <a href="https://doi.org/10.1038/s41598-019-40531-8" target="_blank">https://doi.org/10.1038/s41598-019-40531-8</a><br>📃 Ludt, W. B., Bernal, M. A., Kenworthy, E., Salas, E., & Chakrabarty, P. (2019). Genomic, ecological, and morphological approaches to investigating species limits: A case study in modern taxonomy from Tropical Eastern Pacific surgeonfishes. Ecology and Evolution. <a href="https://doi.org/10.1002/ece3.5029" target="_blank">https://doi.org/10.1002/ece3.5029</a><br>📃 Medina, I. (2019). The role of the environment in the evolution of nest shape in Australian passerines. Scientific Reports, 9(1). <a href="https://doi.org/10.1038/s41598-019-41948-x" target="_blank">https://doi.org/10.1038/s41598-019-41948-x</a><br>📃 Maarten van Zonneveld, Mohamed Rakha, Shin-yee Tan, Yu-yu Chou, Ching-huan Chang, Joyce Yen, Roland Schafleitner, Ramakrishnan Nair, Ken Naito, Svein Ø. Solberg. bioRxiv 596072; <a href="https://doi.org/10.1101/596072" target="_blank">https://doi.org/10.1101/596072</a><br>📃 Miranda, L. S., Imperatriz-Fonseca, V. L., & Giannini, T. C. (2019). Climate change impact on ecosystem functions provided by birds in southeastern Amazonia. PLOS ONE, 14(4), e0215229. <a href="https://doi.org/10.1371/journal.pone.0215229" target="_blank">https://doi.org/10.1371/journal.pone.0215229</a><br>📃 Van de Perre, F., Leirs, H., & Verheyen, E. (2019). Paleoclimate, ecoregion size, and degree of isolation explain regional biodiversity differences among terrestrial vertebrates within the Congo Basin. Belgian Journal of Zoology, 149(1). <a href="https://doi.org/10.26496/bjz.2019.28" target="_blank">https://doi.org/10.26496/bjz.2019.28</a><br>📃 Hoban, S., Dawson, A., Robinson, J. D., Smith, A. B., & Strand, A. E. (2019). Inference of biogeographic history by formally integrating distinct lines of evidence: genetic, environmental niche, and fossil. Ecography. <a href="https://doi.org/10.1111/ecog.04327" target="_blank">https://doi.org/10.1111/ecog.04327</a><br>📃 Bacci, L. F., Michelangeli, F. A., & Goldenberg, R. (2019). Revisiting the classification of Melastomataceae: implications for habit and fruit evolution. Botanical Journal of the Linnean Society, 190(1), 1–24. <a href="https://doi.org/10.1093/botlinnean/boz006" target="_blank">https://doi.org/10.1093/botlinnean/boz006</a><br>📃 Baliga, V. B., & Mehta, R. S. (2019). Morphology, ecology, and biogeography of independent origins of cleaning behavior around the world. Integrative and comparative biology. <a href="https://doi.org/10.1093/icb/icz030" target="_blank">https://doi.org/10.1093/icb/icz030</a><br>📃 Kadereit, J. W., Lauterbach, M., Kandziora, M., Spillmann, J., & Nyffeler, R. (2019). Dual colonization of European high-altitude areas from Asia by Callianthemum (Ranunculaceae). Plant Systematics and Evolution. <a href="https://doi.org/10.1007/s00606-019-01583-5" target="_blank">https://doi.org/10.1007/s00606-019-01583-5</a><br>📃 Schubert, M., Marcussen, T., Meseguer, A. S., & Fjellheim, S. (2019). The grass subfamily Pooideae: Cretaceous–Palaeocene origin and climate‐driven Cenozoic diversification. Global Ecology and Biogeography. <a href="https://doi.org/10.1111/geb.12923" target="_blank">https://doi.org/10.1111/geb.12923</a><br>📃 Westmeijer, G., Everaert, G., Pirlet, H., De Clerck, O., & Vandegehuchte, M. B. (2019). Mechanistic niche modelling to identify favorable growth sites of temperate macroalgae. Algal Research, 41, 101529. <a href="https://doi.org/10.1016/j.algal.2019.101529" target="_blank">https://doi.org/10.1016/j.algal.2019.101529</a><br>📃 Alhajeri, B. H., & Fourcade, Y. (2019). High correlation between species‐level environmental data estimates extracted from IUCN expert range maps and from GBIF occurrence data. Journal of Biogeography. <a href="https://doi.org/10.1111/jbi.13619" target="_blank">https://doi.org/10.1111/jbi.13619</a><br>📃 Ros-Candeira, A., Pérez-Luque, A. J., Suárez-Muñoz, M., Bonet-García, F. J., Hódar, J. A., Giménez de Azcárate, F., & Ortega-Díaz, E. (2019). Dataset of occurrence and incidence of pine processionary moth in Andalusia, south Spain. ZooKeys, 852, 125–136. <a href="https://doi.org/10.3897/zookeys.852.28567" target="_blank">https://doi.org/10.3897/zookeys.852.28567</a><br>📃 McTavish, E. J. (2019). Linking Biodiversity Data Using Evolutionary History. Bio/diversity Information Science and Standards, 3. <a href="https://doi.org/10.3897/biss.3.36207" target="_blank">https://doi.org/10.3897/biss.3.36207</a><br>📃 Uzma, Jiménez-Mejías, P., Amir, R., Hayat, M. Q., & Hipp, A. L. (2019). Timing and ecological priority shaped the diversification of sedges in the Himalayas. PeerJ, 7, e6792. <a href="https://doi.org/10.7717/peerj.6792" target="_blank">https://doi.org/10.7717/peerj.6792</a><br>📃 Butterfield, B. J., Holmgren, C. A., Anderson, R. S., & Betancourt, J. L. (2019). Life history traits predict colonization and extinction lags of desert plant species since the Last Glacial Maximum. Ecology. <a href="https://doi.org/10.1002/ecy.2817" target="_blank">https://doi.org/10.1002/ecy.2817</a><br>📃 Correia, R. A., Ruete, A., Stropp, J., Malhado, A. C. M., dos Santos, J. W., Lessa, T., … Ladle, R. J. (2019). Using ignorance scores to explore biodiversity recording effort for multiple taxa in the Caatinga. Ecological Indicators, 106, 105539. <a href="https://doi.org/10.1016/j.ecolind.2019.105539" target="_blank">https://doi.org/10.1016/j.ecolind.2019.105539</a><br>📃 Jaganathan, G. K., & Dalrymple, S. E. (2019). Internal Seed Structure of Alpine Plants and Extreme Cold Exposure. Data, 4(3), 107. <a href="https://doi.org/10.3390/data4030107" target="_blank">https://doi.org/10.3390/data4030107</a><br>📃 Collins, R. A., Bakker, J., Wangensteen, O. S., Soto, A. Z., Corrigan, L., Sims, D. W., … Mariani, S. (2019). Non‐specific amplification compromises environmental DNA metabarcoding with COI. Methods in Ecology and Evolution. <a href="https://doi.org/10.1111/2041-210x.13276" target="_blank">https://doi.org/10.1111/2041-210x.13276</a><br>📃 Hayden, B., Palomares, M. L. D., Smith, B. E., & Poelen, J. H. (2019). Biological and environmental drivers of trophic ecology in marine fishes - a global perspective. Scientific Reports, 9(1). <a href="https://doi.org/10.1038/s41598-019-47618-2" target="_blank">https://doi.org/10.1038/s41598-019-47618-2</a><br>📃 Pender, J. E., Hipp, A. L., Hahn, M., Kartesz, J., Nishino, M., & Starr, J. R. (2019). How sensitive are climatic niche inferences to distribution data sampling? A comparison of Biota of North America Program (BONAP) and Global Biodiversity Information Facility (GBIF) datasets. Ecological Informatics, 100991. <a href="https://doi.org/10.1016/j.ecoinf.2019.100991" target="_blank">https://doi.org/10.1016/j.ecoinf.2019.100991</a><br>📃 Esperon‐Rodriguez, M., Power, S. A., Tjoelker, M. G., Beaumont, L. J., Burley, H., Caballero‐Rodriguez, D., & Rymer, P. D. (2019). Assessing the vulnerability of Australia’s urban forests to climate extremes. Plants, People, Planet. <a href="https://doi.org/10.1002/ppp3.10064" target="_blank">https://doi.org/10.1002/ppp3.10064</a><br>📃 De Luca, D., Kooistra, W. H. C. F., Sarno, D., Gaonkar, C. C., & Piredda, R. (2019). Global distribution and diversity of Chaetoceros (Bacillariophyta, Mediophyceae): integration of classical and novel strategies. PeerJ, 7, e7410. <a href="https://doi.org/10.7717/peerj.7410" target="_blank">https://doi.org/10.7717/peerj.7410</a><br>📃 Havinga, I., Hein, L., Vega-Araya, M., & Languillaume, A. (2020). Spatial quantification to examine the effectiveness of payments for ecosystem services: A case study of Costa Rica’s Pago de Servicios Ambientales. Ecological Indicators, 108, 105766. <a href="https://doi.org/10.1016/j.ecolind.2019.105766" target="_blank">https://doi.org/10.1016/j.ecolind.2019.105766</a><br>📃 Ahmad, S., Yang, L., Khan, T. U., Wanghe, K., Li, M., & Luan, X. (2020). Using an ensemble modelling approach to predict the potential distribution of Himalayan gray goral (Naemorhedus goral bedfordi) in Pakistan. Global Ecology and Conservation, 21, e00845. <a href="https://doi.org/10.1016/j.gecco.2019.e00845" target="_blank">https://doi.org/10.1016/j.gecco.2019.e00845</a><br>📃 Faltýnek Fric, Z., Rindoš, M., & Konvička, M. (2019). Phenology responses of temperate butterflies to latitude depend on ecological traits. Ecology Letters, 23(1), 172–180. <a href="https://doi.org/10.1111/ele.13419" target="_blank">https://doi.org/10.1111/ele.13419</a><br>📃 Stévart, T., Dauby, G., Lowry, P. P., Blach-Overgaard, A., Droissart, V., Harris, D. J., … Couvreur, T. L. P. (2019). A third of the tropical African flora is potentially threatened with extinction. Science Advances, 5(11), eaax9444. <a href="https://doi.org/10.1126/sciadv.aax9444" target="_blank">https://doi.org/10.1126/sciadv.aax9444</a><br>📃 D’Amen, M., & Azzurro, E. (2019). Lessepsian fish invasion in Mediterranean marine protected areas: a risk assessment under climate change scenarios. ICES Journal of Marine Science, 77(1), 388–397. <a href="https://doi.org/10.1093/icesjms/fsz207" target="_blank">https://doi.org/10.1093/icesjms/fsz207</a><br>📃 Yusri, S., Siregar, V. P., & Suharsono. (2019). Distribution Modelling of Porites (Poritidae) in Indonesia. IOP Conference Series: Earth and Environmental Science, 363, 012025. <a href="https://doi.org/10.1088/1755-1315/363/1/012025" target="_blank">https://doi.org/10.1088/1755-1315/363/1/012025</a><br>📃 Ekroos, J., Kleijn, D., Batáry, P., Albrecht, M., Báldi, A., Blüthgen, N., … Smith, H. G. (2020). High land-use intensity in grasslands constrains wild bee species richness in Europe. Biological Conservation, 241, 108255. <a href="https://doi.org/10.1016/j.biocon.2019.108255" target="_blank">https://doi.org/10.1016/j.biocon.2019.108255</a><br>📃 Marshall, B. M., & Strine, C. T. (2019). Exploring snake occurrence records: Spatial biases and marginal gains from accessible social media. PeerJ, 7, e8059. <a href="https://doi.org/10.7717/peerj.8059" target="_blank">https://doi.org/10.7717/peerj.8059</a><br>📃 Mienna, I. M., Speed, J. D. M., Bendiksby, M., Thornhill, A. H., Mishler, B. D., & Martin, M. D. (2019). Differential patterns of floristic phylogenetic diversity across a post‐glacial landscape. Journal of Biogeography. <a href="https://doi.org/10.1111/jbi.13789" target="_blank">https://doi.org/10.1111/jbi.13789</a><br>📃 D’Amen, M., & Azzurro, E. (2019). Integrating univariate niche dynamics in species distribution models: A step forward for marine research on biological invasions. Journal of Biogeography, 47(3), 686–697. <a href="https://doi.org/10.1111/jbi.13761" target="_blank">https://doi.org/10.1111/jbi.13761</a><br>📃 Alves, D. M. C. C., Eduardo, A. A., da Silva Oliveira, E. V., Villalobos, F., Dobrovolski, R., Pereira, T. C., … Gouveia, S. F. (2020). Unveiling geographical gradients of species richness from scant occurrence data. Global Ecology and Biogeography, 29(4), 748–759. <a href="https://doi.org/10.1111/geb.13055" target="_blank">https://doi.org/10.1111/geb.13055</a><br>📃 Léveillé-Bourret, É., Chen, B.-H., Garon-Labrecque, M.-È., Ford, B. A., & Starr, J. R. (2020). RAD sequencing resolves the phylogeny, taxonomy and biogeography of Trichophoreae despite a recent rapid radiation (Cyperaceae). Molecular Phylogenetics and Evolution, 145, 106727. <a href="https://doi.org/10.1016/j.ympev.2019.106727" target="_blank">https://doi.org/10.1016/j.ympev.2019.106727</a><br>📃 Milla, R., Bastida, J. M., Turcotte, M. M., Jones, G., Violle, C., Osborne, C. P., … Byun, C. (2018). Phylogenetic patterns and phenotypic profiles of the species of plants and mammals farmed for food. Nature Ecology & Evolution, 2(11), 1808–1817. <a href="https://doi.org/10.1038/s41559-018-0690-4" target="_blank">https://doi.org/10.1038/s41559-018-0690-4</a><br>📃 Lakicevic M., Povak N., Reynolds K.M. (2020) Creating Maps. In: Introduction to R for Terrestrial Ecology. Springer, Cham <https://link.springer.com/chapter/10.1007/978-3-030-27603-4_3> <a href="https://doi.org/10.1007/978-3-030-27603-4_3" target="_blank">https://doi.org/10.1007/978-3-030-27603-4_3</a><br>📃 Wraith, J., Norman, P., & Pickering, C. (2020). Orchid conservation and research: An analysis of gaps and priorities for globally Red Listed species. Ambio. <a href="https://doi.org/10.1007/s13280-019-01306-7" target="_blank">https://doi.org/10.1007/s13280-019-01306-7</a><br>📃 Bachman, S., Walker, B., Barrios, S., Copeland, A., & Moat, J. (2020). Rapid Least Concern: towards automating Red List assessments. Biodiversity Data Journal, 8. <a href="https://doi.org/10.3897/bdj.8.e47018" target="_blank">https://doi.org/10.3897/bdj.8.e47018</a><br>📃 Ceschin, D. G., Pires, N. S., Mardirosian, M. N., Lascano, C. I., & Venturino, A. (2020). The Rhinella arenarum transcriptome: de novo assembly, annotation and gene prediction. Scientific Reports, 10(1). <a href="https://doi.org/10.1038/s41598-020-57961-4" target="_blank">https://doi.org/10.1038/s41598-020-57961-4</a><br>📃 Van Zonneveld, M., Rakha, M., Tan, S. yee, Chou, Y.-Y., Chang, C.-H., Yen, J.-Y., … Solberg, S. Ø. (2020). Mapping patterns of abiotic and biotic stress resilience uncovers conservation gaps and breeding potential of Vigna wild relatives. Scientific Reports, 10(1). <a href="https://doi.org/10.1038/s41598-020-58646-8" target="_blank">https://doi.org/10.1038/s41598-020-58646-8</a><br>📃 Benhadi‐Marín, J., Santos, S. A. P., Baptista, P., & Pereira, J. A. (2020). Distribution of Bactrocera oleae (Rossi, 1790) throughout the Iberian Peninsula based on a maximum entropy modeling approach. Annals of Applied Biology. <a href="https://doi.org/10.1111/aab.12584" target="_blank">https://doi.org/10.1111/aab.12584</a><br>📃 Shivambu, T. C., Shivambu, N., & Downs, C. T. (2020). Impact assessment of seven alien invasive bird species already introduced to South Africa. Biological Invasions. <a href="https://doi.org/10.1007/s10530-020-02221-9" target="_blank">https://doi.org/10.1007/s10530-020-02221-9</a><br>📃 Li, X., & Guo, B. (2020). Substantially adaptive potential in polyploid cyprinid fishes: evidence from biogeographic, phylogenetic and genomic studies. Proceedings of the Royal Society B: Biological Sciences, 287(1920), 20193008. <a href="https://doi.org/10.1098/rspb.2019.3008" target="_blank">https://doi.org/10.1098/rspb.2019.3008</a><br>📃 Hannah, L., Roehrdanz, P. R., Marquet, P. A., Enquist, B. J., Midgley, G., Foden, W., … Svenning, J. (2020). 30% land conservation and climate action reduces tropical extinction risk by more than 50%. Ecography. <a href="https://doi.org/10.1111/ecog.05166" target="_blank">https://doi.org/10.1111/ecog.05166</a><br>📃 Zizka, A., Carvalho‐Sobrinho, J. G., Pennington, R. T., Queiroz, L. P., Alcantara, S., Baum, D. A., … Antonelli, A. (2020). Transitions between biomes are common and directional in Bombacoideae (Malvaceae). Journal of Biogeography. <a href="https://doi.org/10.1111/jbi.13815" target="_blank">https://doi.org/10.1111/jbi.13815</a><br>📃 Jung, E.-Y., Gaviria, J., Sun, S., & Engelbrecht, B. M. J. (2020). Comparative drought resistance of temperate grassland species: testing performance trade-offs and the relation to distribution. Oecologia, 192(4), 1023–1036. <a href="https://doi.org/10.1007/s00442-020-04625-9" target="_blank">https://doi.org/10.1007/s00442-020-04625-9</a><br>📃 Howard, C. C., & Cellinese, N. (2020). Tunicate bulb size variation in monocots explained by temperature and phenology. Ecology and Evolution, 10(5), 2299–2309. <a href="https://doi.org/10.1002/ece3.5996" target="_blank">https://doi.org/10.1002/ece3.5996</a><br>📃 Du, C., Chen, J., Jiang, L., & Qiao, G. (2020). High correlation of species diversity patterns between specialist herbivorous insects and their specific hosts. Journal of Biogeography. <a href="https://doi.org/10.1111/jbi.13816" target="_blank">https://doi.org/10.1111/jbi.13816</a><br>📃 Kusumoto, B., Costello, M. J., Kubota, Y., Shiono, T., Wei, C., Yasuhara, M., & Chao, A. (2020). Global distribution of coral diversity: Biodiversity knowledge gradients related to spatial resolution. Ecological Research, 35(2), 315–326. <a href="https://doi.org/10.1111/1440-1703.12096" target="_blank">https://doi.org/10.1111/1440-1703.12096</a><br>📃 Young, N. E., Jarnevich, C. S., Sofaer, H. R., Pearse, I., Sullivan, J., Engelstad, P., & Stohlgren, T. J. (2020). A modeling workflow that balances automation and human intervention to inform invasive plant management decisions at multiple spatial scales. PLOS ONE, 15(3), e0229253. <a href="https://doi.org/10.1371/journal.pone.0229253" target="_blank">https://doi.org/10.1371/journal.pone.0229253</a><br>📃 Chapman, A., Belbin, L., Zermoglio, P., Wieczorek, J., Morris, P., Nicholls, M., … Schigel, D. (2020). Developing Standards for Improved Data Quality and for Selecting Fit for Use Biodiversity Data. Biodiversity Information Science and Standards, 4. <a href="https://doi.org/10.3897/biss.4.50889" target="_blank">https://doi.org/10.3897/biss.4.50889</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rglobi </td>
   <td style="text-align:left;"> R Interface to Global Biotic Interactions </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Jorrit Poelen </td>
   <td style="text-align:left;"> A programmatic interface to the web service methods    provided by Global Biotic Interactions (GloBI). GloBI provides     access to spatial-temporal species interaction records from     sources all over the world. rglobi provides methods to search     species interactions by location, interaction type, and     taxonomic name. In addition, it supports Cypher, a graph query    language, to allow for executing custom queries on the GloBI     aggregate species interaction data set. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Vincent, F., & Bowler, C. (2020). Diatoms Are Selective Segregators in Global Ocean Planktonic Communities. mSystems, 5(1). <a href="https://doi.org/10.1128/mSystems.00444-19" target="_blank">https://doi.org/10.1128/mSystems.00444-19</a><br>📃 Wiscovitch-Russo, R., Rivera-Perez, J., Narganes-Storde, Y. M., García-Roldán, E., Bunkley-Williams, L., Cano, R., & Toranzos, G. A. (2020). Pre-Columbian zoonotic enteric parasites: An insight into Puerto Rican indigenous culture diets and life styles. PLOS ONE, 15(1), e0227810. <a href="https://doi.org/10.1371/journal.pone.0227810" target="_blank">https://doi.org/10.1371/journal.pone.0227810</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rgpdd </td>
   <td style="text-align:left;"> R Interface to the Global Population Dynamics Database </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Carl Boettiger </td>
   <td style="text-align:left;"> R Interface to the Global Population Dynamics Database </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> riem </td>
   <td style="text-align:left;"> Accesses Weather Data from the Iowa Environment Mesonet </td>
   <td style="text-align:left;"> Iowa Environment Mesonet website. </td>
   <td style="text-align:left;"> Maëlle Salmon </td>
   <td style="text-align:left;"> Allows to get weather data from Automated Surface Observing System (ASOS) stations (airports) in the    whole world thanks to the Iowa Environment Mesonet website. </td>
   <td style="text-align:left;"> airports, asos, metar, temperature, weather, weather-api </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/39 </td>
   <td style="text-align:left;"> 📃 Hagerman, A. D., South, D. D., Sondgerath, T. C., Patyk, K. A., Sanson, R. L., Schumacher, R. S., … Magzamen, S. (2018). Temporal and geographic distribution of weather conditions favorable to airborne spread of foot-and-mouth disease in the coterminous United States. Preventive Veterinary Medicine, 161, 41–49. <a href="https://doi.org/10.1016/j.prevetmed.2018.10.016" target="_blank">https://doi.org/10.1016/j.prevetmed.2018.10.016</a><br>📃 Milà, C., Curto, A., Dimitrova, A., Sreekanth, V., Kinra, S., Marshall, J. D., & Tonne, C. (2020). Identifying predictors of personal exposure to air temperature in peri-urban India. Science of The Total Environment, 707, 136114. <a href="https://doi.org/10.1016/j.scitotenv.2019.136114" target="_blank">https://doi.org/10.1016/j.scitotenv.2019.136114</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rif </td>
   <td style="text-align:left;"> Client for 'Neuroscience' Information Framework 'APIs' </td>
   <td style="text-align:left;"> https://neuinfo.org </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Client for 'Neuroscience' Information Framework ('NIF') 'APIs'    (<https://neuinfo.org/>; <https://neuinfo.org/about/webservices>).    Package includes functions for each 'API' route, and gives back data    in tidy data.frame format. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rinat </td>
   <td style="text-align:left;"> Access iNaturalist Data Through APIs </td>
   <td style="text-align:left;"> http://inaturalist.org </td>
   <td style="text-align:left;"> Edmund Hart </td>
   <td style="text-align:left;"> A programmatic interface to the API provided by the iNaturalist website <http://inaturalist.org> to download species occurrence data submitted by citizen scientists. </td>
   <td style="text-align:left;"> inaturalist, spocc </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rnaturalearthdata </td>
   <td style="text-align:left;"> World Vector Map Data from Natural Earth Used in 'rnaturalearth' </td>
   <td style="text-align:left;"> http://www.naturalearthdata.com </td>
   <td style="text-align:left;"> Andy South </td>
   <td style="text-align:left;"> Vector map data from <http://www.naturalearthdata.com/>. Access functions are provided in the accompanying package 'rnaturalearth'. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Rice, A., Šmarda, P., Novosolov, M., Drori, M., Glick, L., Sabath, N., … Mayrose, I. (2019). The global biogeography of polyploid plants. Nature Ecology & Evolution, 3(2), 265–273. <a href="https://doi.org/10.1038/s41559-018-0787-9" target="_blank">https://doi.org/10.1038/s41559-018-0787-9</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rnoaa </td>
   <td style="text-align:left;"> 'NOAA' Weather Data from R </td>
   <td style="text-align:left;"> https://www.ncdc.noaa.gov/cdo-web/webservices/v2 </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Client for many 'NOAA' data sources including the 'NCDC' climate    'API' at <https://www.ncdc.noaa.gov/cdo-web/webservices/v2>, with functions for    each of the 'API' 'endpoints': data, data categories, data sets, data types,    locations, location categories, and stations. In addition, we have an interface    for 'NOAA' sea ice data, the 'NOAA' severe weather inventory, 'NOAA' Historical    Observing 'Metadata' Repository ('HOMR') data, 'NOAA' storm data via 'IBTrACS',    tornado data via the 'NOAA' storm prediction center, and more. </td>
   <td style="text-align:left;"> buoy, climate, earth, ISD, NCDC, NOAA, precipitation, science, seaice, storm, temperature, tornadoe </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Bowman, D. C., & Lees, J. M. (2015). Near real time weather and ocean model data access with rNOMADS. Computers & Geosciences, 78, 88–95. <a href="https://doi.org/10.1016/j.cageo.2015.02.013" target="_blank">https://doi.org/10.1016/j.cageo.2015.02.013</a><br>📃 Grosser, S., Scofield, R. P., & Waters, J. M. (2017). Multivariate skeletal analyses support a taxonomic distinction between New Zealand and Australian Eudyptula penguins (Sphenisciformes: Spheniscidae). Emu - Austral Ornithology, 117(3), 276–283. <a href="https://doi.org/10.1080/01584197.2017.1315310" target="_blank">https://doi.org/10.1080/01584197.2017.1315310</a><br>📃 Zhu, G., Matthews, C., Wei, P., Lorch, M., & Chakravarty, S. (2018). En Route Flight Time Prediction Under Convective Weather Events. 2018 Aviation Technology, Integration, and Operations Conference. <a href="https://doi.org/10.2514/6.2018-3670" target="_blank">https://doi.org/10.2514/6.2018-3670</a><br>📃 Fitzpatrick, M. C., & Dunn, R. R. (2019). Contemporary climatic analogs for 540 North American urban areas in the late 21st century. Nature Communications, 10(1). <a href="https://doi.org/10.1038/s41467-019-08540-3" target="_blank">https://doi.org/10.1038/s41467-019-08540-3</a><br>📃 Blakey, R. V., Webb, E. B., Kesler, D. C., Siegel, R. B., Corcoran, D., & Johnson, M. (2019). Bats in a changing landscape: Linking occupancy and traits of a diverse montane bat community to fire regime. Ecology and Evolution. <a href="https://doi.org/10.1002/ece3.5121" target="_blank">https://doi.org/10.1002/ece3.5121</a><br>📃 Pinsky, M. L., Eikeset, A. M., McCauley, D. J., Payne, J. L., & Sunday, J. M. (2019). Greater vulnerability to warming of marine versus terrestrial ectotherms. Nature, 569(7754), 108–111. <a href="https://doi.org/10.1038/s41586-019-1132-4" target="_blank">https://doi.org/10.1038/s41586-019-1132-4</a><br>📃 Dumitrescu, A., Cheval, S., & Guijarro, J. A. (2019). Homogenization of a combined hourly air temperature dataset over Romania. International Journal of Climatology. <a href="https://doi.org/10.1002/joc.6353" target="_blank">https://doi.org/10.1002/joc.6353</a><br>📃 Zhong, B. H. W., Wiersma, J. J., Sheaffer, C. C., Steffenson, B. J., & Smith, K. P. (2019). Assessment of Winter Barley in Minnesota: Relationships among Cultivar, Fall Seeding Date, Winter Survival, and Grain Yield. Cftm, 5(1), 0. <a href="https://doi.org/10.2134/cftm2019.07.0055" target="_blank">https://doi.org/10.2134/cftm2019.07.0055</a><br>📃 Kearney, M. R., Gillingham, P. K., Bramer, I., Duffy, J. P., & Maclean, I. M. D. (2019). A method for computing hourly, historical, terrain‐corrected microclimate anywhere on earth. Methods in Ecology and Evolution. <a href="https://doi.org/10.1111/2041-210x.13330" target="_blank">https://doi.org/10.1111/2041-210x.13330</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rnpn </td>
   <td style="text-align:left;"> Interface to the National 'Phenology' Network 'API' </td>
   <td style="text-align:left;"> https://usanpn.org </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Programmatic interface to the    Web Service methods provided by the National 'Phenology' Network    (<https://usanpn.org/>), which includes data on various life history    events that occur at specific times. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> ropenaq </td>
   <td style="text-align:left;"> Accesses Air Quality Data from the Open Data Platform
    OpenAQ </td>
   <td style="text-align:left;"> https://docs.openaq.org </td>
   <td style="text-align:left;"> Maëlle Salmon </td>
   <td style="text-align:left;"> Allows access to air quality data from the API of    the OpenAQ platform <https://docs.openaq.org/>, with the different    services the API offers (getting measurements for a given query,    getting latest measurements, getting lists of available    countries/cities/locations). </td>
   <td style="text-align:left;"> air, air-pollution, air-pollution-levels, air-quality, openaq, openaq-api, openaq-data, peer-reviewed </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Selvi, S., & Chandrasekaran, M. (2018). Performance evaluation of mathematical predictive modeling for air quality forecasting. Cluster Computing. <a href="https://doi.org/10.1007/s10586-017-1667-9" target="_blank">https://doi.org/10.1007/s10586-017-1667-9</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rotl </td>
   <td style="text-align:left;"> Interface to the 'Open Tree of Life' API </td>
   <td style="text-align:left;"> Open Tree of Life </td>
   <td style="text-align:left;"> Francois Michonneau </td>
   <td style="text-align:left;"> An interface to the 'Open Tree of Life' API to retrieve    phylogenetic trees, information about studies used to assemble the    synthetic tree, and utilities to match taxonomic names to 'Open Tree    identifiers'. The 'Open Tree of Life' aims at assembling a    comprehensive phylogenetic tree for all named species. </td>
   <td style="text-align:left;"> biodiversity, independant-contrasts, metadata, phylogenetics, ropensci </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/17 </td>
   <td style="text-align:left;"> 📃 Michonneau, F., Brown, J. W., & Winter, D. J. (2016). rotl: an R package to interact with the Open Tree of Life data. Methods in Ecology and Evolution. <a href="https://doi.org/10.1111/2041-210x.12593" target="_blank">https://doi.org/10.1111/2041-210x.12593</a><br>📃 Killen, S. S., Norin, T., & Halsey, L. G. (2016). Do method and species lifestyle affect measures of maximum metabolic rate in fishes? Journal of Fish Biology. <a href="https://doi.org/10.1111/jfb.13195" target="_blank">https://doi.org/10.1111/jfb.13195</a><br>📃 Estrada-Peña, A., & de la Fuente, J. (2016). Species interactions in occurrence data for a community of tick-transmitted pathogens. Scientific Data, 3, 160056. <a href="https://doi.org/10.1038/sdata.2016.56" target="_blank">https://doi.org/10.1038/sdata.2016.56</a><br>📃 Matthews, A. E., Klimov, P. B., Proctor, H. C., Dowling, A. P. G., Diener, L., Hager, S. B., … Boves, T. J. (2017). Cophylogenetic assessment of New World warblers (Parulidae) and their symbiotic feather mites (Proctophyllodidae). Journal of Avian Biology. <a href="https://doi.org/10.1111/jav.01580" target="_blank">https://doi.org/10.1111/jav.01580</a><br>📃 Santorelli, S., Magnusson, W. E., & Deus, C. P. (2018). Most species are not limited by an Amazonian river postulated to be a border between endemism areas. Scientific Reports, 8(1). <a href="https://doi.org/10.1038/s41598-018-20596-7" target="_blank">https://doi.org/10.1038/s41598-018-20596-7</a><br>📃 Farquharson, K. A., Hogg, C. J., & Grueber, C. E. (2018). A meta-analysis of birth-origin effects on reproduction in diverse captive environments. Nature Communications, 9(1). <a href="https://doi.org/10.1038/s41467-018-03500-9" target="_blank">https://doi.org/10.1038/s41467-018-03500-9</a><br>📃 Portugal, S. J., & White, C. R. (2018). Miniaturisation of biologgers is not alleviating the 5% rule. Methods in Ecology and Evolution. <a href="https://doi.org/10.1111/2041-210x.13013" target="_blank">https://doi.org/10.1111/2041-210x.13013</a><br>📃 Barneche, D. R., Robertson, D. R., White, C. R., & Marshall, D. J. (2018). Fish reproductive-energy output increases disproportionately with body size. Science, 360(6389), 642–645. <a href="https://doi.org/10.1126/science.aao6868" target="_blank">https://doi.org/10.1126/science.aao6868</a><br>📃 Morais, R. A., & Bellwood, D. R. (2018). Global drivers of reef fish growth. Fish and Fisheries. <a href="https://doi.org/10.1111/faf.12297" target="_blank">https://doi.org/10.1111/faf.12297</a><br>📃 Gastauer, M., Caldeira, C. F., Trotter, I., Ramos, S. J., & Neto, J. A. A. M. (2018). Optimizing community trees using the open tree of life increases the reliability of phylogenetic diversity and dispersion indices. Ecological Informatics. <a href="https://doi.org/10.1016/j.ecoinf.2018.06.008" target="_blank">https://doi.org/10.1016/j.ecoinf.2018.06.008</a><br>📃 Paseka, R. E., & Grunberg, R. L. (2018). Allometric and trait-based patterns in parasite stoichiometry. Oikos. <a href="https://doi.org/10.1111/oik.05339" target="_blank">https://doi.org/10.1111/oik.05339</a><br>📃 Barneche, D. R., Burgess, S. C., & Marshall, D. J. (2018). Global environmental drivers of marine fish egg size. Global Ecology and Biogeography, 27(8), 890–898. <a href="https://doi.org/10.1111/geb.12748" target="_blank">https://doi.org/10.1111/geb.12748</a><br>📃 Merkling, T., Nakagawa, S., Lagisz, M., & Schwanz, L. E. (2017). Maternal Testosterone and Offspring Sex-Ratio in Birds and Mammals: A Meta-Analysis. Evolutionary Biology, 45(1), 96–104. <a href="https://doi.org/10.1007/s11692-017-9432-9" target="_blank">https://doi.org/10.1007/s11692-017-9432-9</a><br>📃 Becker, D., Czirják, G., Rynda-Apple, A., & Plowright, R. (2018). Handling stress and sample storage are associated with weaker complement-mediated bactericidal ability in birds but not bats. Physiological and Biochemical Zoology. <a href="https://doi.org/10.1086/701069" target="_blank">https://doi.org/10.1086/701069</a><br>📃 O’Dea, R. E., Lagisz, M., Hendry, A. P., & Nakagawa, S. (2018). Developmental temperature affects phenotypic means and variability: a meta-analysis of fish data. <a href="https://doi.org/10.32942/osf.io/ge7f8" target="_blank">https://doi.org/10.32942/osf.io/ge7f8</a><br>📃 Tresch, S., Frey, D., Le Bayon, R.-C., Zanetta, A., Rasche, F., Fliessbach, A., & Moretti, M. (2018). Litter decomposition driven by soil fauna, plant diversity and soil management in urban gardens. Science of The Total Environment. <a href="https://doi.org/10.1016/j.scitotenv.2018.12.235" target="_blank">https://doi.org/10.1016/j.scitotenv.2018.12.235</a><br>📃 Mathot, K. J., Dingemanse, N. J., & Nakagawa, S. (2018). The covariance between metabolic rate and behaviour varies across behaviours and thermal types: meta-analytic insights. Biological Reviews. <a href="https://doi.org/10.1111/brv.12491" target="_blank">https://doi.org/10.1111/brv.12491</a><br>📃 Pettersen, A. K., White, C. R., Bryson-Richardson, R. J., & Marshall, D. J. (2019). Linking life-history theory and metabolic theory explains the offspring size-temperature relationship. Ecology Letters. <a href="https://doi.org/10.1111/ele.13213" target="_blank">https://doi.org/10.1111/ele.13213</a><br>📃 Halsey, L. G., & White, C. R. (2019). Terrestrial locomotion energy costs vary considerably between species: no evidence that this is explained by rate of leg force production or ecology. Scientific Reports, 9(1). <a href="https://doi.org/10.1038/s41598-018-36565-z" target="_blank">https://doi.org/10.1038/s41598-018-36565-z</a><br>📃 Ohmer, M. E. B., Cramp, R. L., White, C. R., Harlow, P. S., McFadden, M. S., Merino-Viteri, A., … Franklin, C. E. (2019). Phylogenetic investigation of skin sloughing rates in frogs: relationships with skin characteristics and disease-driven declines. Proceedings of the Royal Society B: Biological Sciences, 286(1896), 20182378. <a href="https://doi.org/10.1098/rspb.2018.2378" target="_blank">https://doi.org/10.1098/rspb.2018.2378</a><br>📃 Shefferson, R. P., Bunch, W., Cowden, C. C., Lee, Y., Kartzinel, T. R., Yukawa, T., … Jiang, H. (2019). Does evolutionary history determine specificity in broad ecological interactions? Journal of Ecology. <a href="https://doi.org/10.1111/1365-2745.13170" target="_blank">https://doi.org/10.1111/1365-2745.13170</a><br>📃 Pinto, N. S., Palaoro, A. V., & Peixoto, P. E. C. (2019). All by myself? Meta‐analysis of animal contests shows stronger support for self than for mutual assessment models. Biological Reviews. <a href="https://doi.org/10.1111/brv.12509" target="_blank">https://doi.org/10.1111/brv.12509</a><br>📃 Kovacevic, A., Latombe, G., & Chown, S. L. (2019). Rate dynamics of ectotherm responses to thermal stress. Proceedings of the Royal Society B: Biological Sciences, 286(1902), 20190174. <a href="https://doi.org/10.1098/rspb.2019.0174" target="_blank">https://doi.org/10.1098/rspb.2019.0174</a><br>📃 Mihalitsis, M., & Bellwood, D. R. (2019). Morphological and functional diversity of piscivorous fishes on coral reefs. Coral Reefs. <a href="https://doi.org/10.1007/s00338-019-01820-w" target="_blank">https://doi.org/10.1007/s00338-019-01820-w</a><br>📃 Tetzlaff, S. J., Sperry, J. H., & DeGregorio, B. A. (2019). Effects of antipredator training, environmental enrichment, and soft release on wildlife translocations: A review and meta-analysis. Biological Conservation, 236, 324–331. <a href="https://doi.org/10.1016/j.biocon.2019.05.054" target="_blank">https://doi.org/10.1016/j.biocon.2019.05.054</a><br>📃 McTavish, E. J. (2019). Linking Biodiversity Data Using Evolutionary History. Biodiversity Information Science and Standards, 3. <a href="https://doi.org/10.3897/biss.3.36207" target="_blank">https://doi.org/10.3897/biss.3.36207</a><br>📃 Kravchuk, O. I., Lyupina, Y. V., Erokhov, P. A., Finoshin, A. D., Adameyko, K. I., Mishyna, M. Y., … Mikhailov, V. S. (2019). Characterization of the 20S proteasome of the lepidopteran, Spodoptera frugiperda. Biochimica et Biophysica Acta (BBA) - Proteins and Proteomics. <a href="https://doi.org/10.1016/j.bbapap.2019.06.010" target="_blank">https://doi.org/10.1016/j.bbapap.2019.06.010</a><br>📃 Peters, A., Delhey, K., Nakagawa, S., Aulsebrook, A., & Verhulst, S. (2019). Immunosenescence in wild animals: meta‐analysis and outlook. Ecology Letters. <a href="https://doi.org/10.1111/ele.13343" target="_blank">https://doi.org/10.1111/ele.13343</a><br>📃 Park, A. W. (2019). Food web structure selects for parasite host range. Proceedings of the Royal Society B: Biological Sciences, 286(1908), 20191277. <a href="https://doi.org/10.1098/rspb.2019.1277" target="_blank">https://doi.org/10.1098/rspb.2019.1277</a><br>📃 Mihalitsis, M., & Bellwood, D. (2019). Functional implications of dentition-based morphotypes in piscivorous fishes. Royal Society Open Science, 6(9), 190040. <a href="https://doi.org/10.1098/rsos.190040" target="_blank">https://doi.org/10.1098/rsos.190040</a><br>📃 Sánchez-Tójar, A., Moran, N. P., O’Dea, R. E., Reinhold, K., & Nakagawa, S. (2019). Illustrating the importance of meta-analysing variances alongside means in ecology and evolution. <a href="https://doi.org/10.32942/osf.io/yhfvk" target="_blank">https://doi.org/10.32942/osf.io/yhfvk</a><br>📃 Li, X., Zhu, H., Geisen, S., Bellard, C., Hu, F., Li, H., … Liu, M. (2019). Agriculture erases climate constraints on soil nematode communities across large spatial scales. Global Change Biology. <a href="https://doi.org/10.1111/gcb.14821" target="_blank">https://doi.org/10.1111/gcb.14821</a><br>📃 Maherali, H. (2019). Mutualism as a plant functional trait: linking variation in the mycorrhizal symbiosis to climatic tolerance, geographic range and population dynamics. International Journal of Plant Sciences. <a href="https://doi.org/10.1086/706187" target="_blank">https://doi.org/10.1086/706187</a><br>📃 Defolie, C., Merkling, T., & Fichtel, C. (2019). Patterns and variation in the mammal parasite–glucorticoid relationship. Biological Reviews. <a href="https://doi.org/10.1111/brv.12555" target="_blank">https://doi.org/10.1111/brv.12555</a><br>📃 Estrada-Peña, A., Nava, S., Tarragona, E., Bermúdez, S., de la Fuente, J., Domingos, A., … Guglielmone, A. A. (2019). Species occurrence of ticks in South America, and interactions with biotic and abiotic traits. Scientific Data, 6(1). <a href="https://doi.org/10.1038/s41597-019-0314-0" target="_blank">https://doi.org/10.1038/s41597-019-0314-0</a><br>📃 Godfrey, J. M., Riggio, J., Orozco, J., Guzmán‐Delgado, P., Chin, A. R. O., & Zwieniecki, M. A. (2020). Ray fractions and carbohydrate dynamics of tree species along a 2750 m elevation gradient indicate climate response, not spatial storage limitation. New Phytologist, 225(6), 2314–2330. <a href="https://doi.org/10.1111/nph.16361" target="_blank">https://doi.org/10.1111/nph.16361</a><br>📃 Clark, T. J., & Luis, A. D. (2019). Nonlinear population dynamics are ubiquitous in animals. Nature Ecology & Evolution, 4(1), 75–81. <a href="https://doi.org/10.1038/s41559-019-1052-6" target="_blank">https://doi.org/10.1038/s41559-019-1052-6</a><br>📃 Shan, S., Soltis, P. S., Soltis, D. E., & Yang, B. (2020). Considerations in adapting CRISPR/Cas9 in nongenetic model plant systems. Applications in Plant Sciences, 8(1). <a href="https://doi.org/10.1002/aps3.11314" target="_blank">https://doi.org/10.1002/aps3.11314</a><br>📃 Horne, C. R., Hirst, A. G., & Atkinson, D. (2020). Selection for increased male size predicts variation in sexual size dimorphism among fish species. Proceedings of the Royal Society B: Biological Sciences, 287(1918), 20192640. <a href="https://doi.org/10.1098/rspb.2019.2640" target="_blank">https://doi.org/10.1098/rspb.2019.2640</a><br>📃 Walczyńska, A., Gudowska, A., & Sobczyk, Ł. (2020). Should I shrink or should I flow? – body size adjustment to thermo-oxygenic niche. <a href="https://doi.org/10.1101/2020.01.14.905901" target="_blank">https://doi.org/10.1101/2020.01.14.905901</a><br>📃 Gomez Isaza, D. F., Cramp, R. L., & Franklin, C. E. (2020). Living in polluted waters: A meta-analysis of the effects of nitrate and interactions with other environmental stressors on freshwater taxa. Environmental Pollution, 114091. <a href="https://doi.org/10.1016/j.envpol.2020.114091" target="_blank">https://doi.org/10.1016/j.envpol.2020.114091</a><br>📃 Finoshin, A. D., Adameyko, K. I., Mikhailov, K. V., Kravchuk, O. I., Georgiev, A. A., Gornostaev, N. G., … Lyupina, Y. V. (2020). Iron metabolic pathways in the processes of sponge plasticity. PLOS ONE, 15(2), e0228722. <a href="https://doi.org/10.1371/journal.pone.0228722" target="_blank">https://doi.org/10.1371/journal.pone.0228722</a><br>📃 Jhwueng, D.-C., & O’Meara, B. C. (2020). On the Matrix Condition of Phylogenetic Tree. Evolutionary Bioinformatics, 16, 117693432090172. <a href="https://doi.org/10.1177/1176934320901721" target="_blank">https://doi.org/10.1177/1176934320901721</a><br>📃 Perez‐Lamarque, B., Selosse, M., Öpik, M., Morlon, H., & Martos, F. (2020). Cheating in arbuscular mycorrhizal mutualism: a network and phylogenetic analysis of mycoheterotrophy. New Phytologist. <a href="https://doi.org/10.1111/nph.16474" target="_blank">https://doi.org/10.1111/nph.16474</a><br>📃 Marshall, D. J., Pettersen, A. K., Bode, M., & White, C. R. (2020). Developmental cost theory predicts thermal environment and vulnerability to global warming. Nature Ecology & Evolution, 4(3), 406–411. <a href="https://doi.org/10.1038/s41559-020-1114-9" target="_blank">https://doi.org/10.1038/s41559-020-1114-9</a><br>📃 Wei, N., Kaczorowski, R. L., Arceo-Gómez, G., O’Neill, E. M., Hayes, R. A., & Ashman, T.-L. (2020). Pollinator niche partitioning and asymmetric facilitation contribute to the maintenance of diversity. <a href="https://doi.org/10.1101/2020.03.02.974022" target="_blank">https://doi.org/10.1101/2020.03.02.974022</a><br>📃 Allen, D., & Kim, A. Y. (2020). A permutation test and spatial cross-validation approach to assess models of interspecific competition between trees. PLOS ONE, 15(3), e0229930. <a href="https://doi.org/10.1371/journal.pone.0229930" target="_blank">https://doi.org/10.1371/journal.pone.0229930</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rperseus </td>
   <td style="text-align:left;"> Get Texts from the Perseus Digital Library </td>
   <td style="text-align:left;"> http://cts.perseids.org </td>
   <td style="text-align:left;"> David Ranzolin </td>
   <td style="text-align:left;"> The Perseus Digital Library is a collection of classical texts. This package helps    you get them. The available works can also be viewed here: <http://cts.perseids.org/>. </td>
   <td style="text-align:left;"> classics, greek, greek-bible, greek-new-testament, latin, peer-reviewed, perseus, perseus-digital-library, translation </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/145 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rppo </td>
   <td style="text-align:left;"> Access the Global Plant Phenology Data Portal </td>
   <td style="text-align:left;"> https://www.plantphenology.org </td>
   <td style="text-align:left;"> John Deck </td>
   <td style="text-align:left;"> An R interface to the Global Plant Phenology Data Portal,    which is accessible online at <https://www.plantphenology.org/>. </td>
   <td style="text-align:left;"> peer-reviewed </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/207 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rredlist </td>
   <td style="text-align:left;"> 'IUCN' Red List Client </td>
   <td style="text-align:left;"> http://apiv3.iucnredlist.org/api/v3/docs </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> 'IUCN' Red List (<http://apiv3.iucnredlist.org/api/v3/docs>) client.    The 'IUCN' Red List is a global list of threatened and endangered species.    Functions cover all of the Red List 'API' routes. An 'API' key is required. </td>
   <td style="text-align:left;"> API, biodiversity, conservation, habitat, IUCN, species, traits, web-services </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Cardoso P (2017) red - an R package to facilitate species red list assessments according to the IUCN criteria. Biodiversity Data Journal 5: e20530. <a href="https://doi.org/10.3897/BDJ.5.e20530" target="_blank">https://doi.org/10.3897/BDJ.5.e20530</a><br>📃 Moat, J., Bachman, S. P., Field, R., & Boyd, D. S. (2018). Refining area of occupancy to address the modifiable areal unit problem in ecology and conservation. Conservation Biology. <a href="https://doi.org/10.1111/cobi.13139" target="_blank">https://doi.org/10.1111/cobi.13139</a><br>📃 Van de Perre, F., Leirs, H., & Verheyen, E. (2019). Paleoclimate, ecoregion size, and degree of isolation explain regional biodiversity differences among terrestrial vertebrates within the Congo Basin. Belgian Journal of Zoology, 149(1). <a href="https://doi.org/10.26496/bjz.2019.28" target="_blank">https://doi.org/10.26496/bjz.2019.28</a><br>📃 Alhajeri, B. H., & Fourcade, Y. (2019). High correlation between species‐level environmental data estimates extracted from IUCN expert range maps and from GBIF occurrence data. Journal of Biogeography. <a href="https://doi.org/10.1111/jbi.13619" target="_blank">https://doi.org/10.1111/jbi.13619</a><br>📃 Nyboer, E. A., Liang, C., & Chapman, L. J. (2019). Assessing the vulnerability of Africa’s freshwater fishes to climate change: A continent-wide trait-based analysis. Biological Conservation, 236, 505–520. <a href="https://doi.org/10.1016/j.biocon.2019.05.003" target="_blank">https://doi.org/10.1016/j.biocon.2019.05.003</a><br>📃 Grattarola, F., Botto, G., da Rosa, I., Gobel, N., González, E., González, J., … Pincheira-Donoso, D. (2019). Biodiversidata: An Open-Access Biodiversity Database for Uruguay. Biodiversity Data Journal, 7. <a href="https://doi.org/10.3897/bdj.7.e36226" target="_blank">https://doi.org/10.3897/bdj.7.e36226</a><br>📃 Lennox, R. J., Veríssimo, D., Twardek, W. M., Davis, C. R., & Jarić, I. (2019). Sentiment analysis as a measure of conservation culture in scientific literature. Conservation Biology. <a href="https://doi.org/10.1111/cobi.13404" target="_blank">https://doi.org/10.1111/cobi.13404</a><br>📃 Dawson, A., Paciorek, C. J., Goring, S. J., Jackson, S. T., McLachlan, J. S., & Williams, J. W. (2019). Quantifying trends and uncertainty in prehistoric forest composition in the upper Midwestern United States. Ecology. <a href="https://doi.org/10.1002/ecy.2856" target="_blank">https://doi.org/10.1002/ecy.2856</a><br>📃 Bager Olsen, M. T., Geldmann, J., Harfoot, M., Tittensor, D. P., Price, B., Sinovas, P., … Burgess, N. D. (2019). Thirty-six years of legal and illegal wildlife trade entering the USA. Oryx, 1–10. <a href="https://doi.org/10.1017/s0030605319000541" target="_blank">https://doi.org/10.1017/s0030605319000541</a><br>📃 Scheffers, B. R., Oliveira, B. F., Lamb, I., & Edwards, D. P. (2019). Global wildlife trade across the tree of life. Science, 366(6461), 71–76. <a href="https://doi.org/10.1126/science.aav5327" target="_blank">https://doi.org/10.1126/science.aav5327</a><br>📃 Stévart, T., Dauby, G., Lowry, P. P., Blach-Overgaard, A., Droissart, V., Harris, D. J., … Couvreur, T. L. P. (2019). A third of the tropical African flora is potentially threatened with extinction. Science Advances, 5(11), eaax9444. <a href="https://doi.org/10.1126/sciadv.aax9444" target="_blank">https://doi.org/10.1126/sciadv.aax9444</a><br>📃 Cooke, R. S. C., Eigenbrod, F., & Bates, A. E. (2020). Ecological distinctiveness of birds and mammals at the global scale. Global Ecology and Conservation, 22, e00970. <a href="https://doi.org/10.1016/j.gecco.2020.e00970" target="_blank">https://doi.org/10.1016/j.gecco.2020.e00970</a><br>📃 Ji, Y., Baker, C. C., Li, Y., Popescu, V. D., Wang, Z., Wang, J., … Yu, D. W. (2020). Large-scale Quantification of Vertebrate Biodiversity in Ailaoshan Nature Reserve from Leech iDNA. <a href="https://doi.org/10.1101/2020.02.10.941336" target="_blank">https://doi.org/10.1101/2020.02.10.941336</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rrricanes </td>
   <td style="text-align:left;"> Web scraper for Atlantic and east Pacific hurricanes and tropical storms </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Tim Trice </td>
   <td style="text-align:left;"> Get archived data of past and current hurricanes and tropical   storms for the Atlantic and eastern Pacific oceans. Data is available for   storms since 1998. Datasets are updated via the rrricanesdata package.   Currently, this package is about 6MB of datasets. See the README or view   `vignette("drat")` for more information. </td>
   <td style="text-align:left;"> hurricane, peer-reviewed, weather </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/118 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rrricanesdata </td>
   <td style="text-align:left;"> Data for Atlantic and east Pacific tropical cyclones since 1998 </td>
   <td style="text-align:left;"> National Hurricane Center </td>
   <td style="text-align:left;"> Tim Trice </td>
   <td style="text-align:left;"> Includes storm discussions, forecast/advisories, public advisories,   wind speed probabilities, strike probabilities and more. This package can be   used along with rrricanes (>= 0.2.0-6). Data is considered public domain via   the National Hurricane Center. </td>
   <td style="text-align:left;"> weather </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/118 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rsnps </td>
   <td style="text-align:left;"> Get 'SNP' ('Single-Nucleotide' 'Polymorphism') Data on the Web </td>
   <td style="text-align:left;"> https://opensnp.org https://www.ncbi.nlm.nih.gov/projects/SNP </td>
   <td style="text-align:left;"> Julia Gustavsen </td>
   <td style="text-align:left;"> A programmatic interface to various 'SNP' 'datasets'    on the web: 'OpenSNP' (<https://opensnp.org>), and 'NBCIs' 'dbSNP' database    (<https://www.ncbi.nlm.nih.gov/projects/SNP>). Functions    are included for searching for 'NCBI'. For 'OpenSNP', functions are included     for getting 'SNPs', and data for 'genotypes', 'phenotypes', annotations,     and bulk downloads of data by user. </td>
   <td style="text-align:left;"> API, api-client, dbSNP, gene, genotype, NCBI, OpenSNP, sequence, snp, species, web </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Mackinnon, M. J., Ndila, C., Uyoga, S., Macharia, A., Snow, R. W., Band, G., et al. (2016). Environmental Correlation Analysis for Genes Associated with Protection against Malaria. Molecular Biology and Evolution, 33(5), 1188–1204. <a href="https://doi.org/10.1093/molbev/msw004" target="_blank">https://doi.org/10.1093/molbev/msw004</a><br>📃 Amiri Roudbar, M., Mohammadabadi, M. R., Ayatollahi Mehrgardi, A., Abdollahi-Arpanahi, R., Momen, M., Morota, G., … Rosa, G. J. M. (2020). Integration of single nucleotide variants and whole-genome DNA methylation profiles for classification of rheumatoid arthritis cases from controls. Heredity, 124(5), 658–674. <a href="https://doi.org/10.1038/s41437-020-0301-4" target="_blank">https://doi.org/10.1038/s41437-020-0301-4</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rusda </td>
   <td style="text-align:left;"> Interface to USDA Databases </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Franz-Sebastian Krah </td>
   <td style="text-align:left;"> An interface to the web service methods provided by the United States Department of Agriculture (USDA). The Agricultural Research Service (ARS) provides a large set of databases. The current version of the package holds interfaces to the Systematic Mycology and Microbiology Laboratory (SMML), which consists of four databases: Fungus-Host Distributions, Specimens, Literature and the Nomenclature database. It provides functions for querying these databases. The main function is \code{associations}, which allows searching for fungus-host combinations. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Krah, F.-S., Bässler, C., Heibl, C., Soghigian, J., Schaefer, H., & Hibbett, D. S. (2018). Evolutionary dynamics of host specialization in wood-decay fungi. BMC Evolutionary Biology, 18(1). <a href="https://doi.org/10.1186/s12862-018-1229-7" target="_blank">https://doi.org/10.1186/s12862-018-1229-7</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rvertnet </td>
   <td style="text-align:left;"> Search 'Vertnet', a 'Database' of Vertebrate Specimen Records </td>
   <td style="text-align:left;"> http://vertnet.org </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Retrieve, map and summarize data from the 'VertNet.org'     archives (<http://vertnet.org/>).  Functions allow searching by many     parameters, including 'taxonomic' names, places, and dates. In addition,     there is an interface for conducting spatially delimited searches, and     another for requesting large 'datasets' via email. </td>
   <td style="text-align:left;"> biodiversity, mammalia, mammals, maps, occurrences, species, specimens, vertnet </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Drozd, P., & Šipoš, J. (2013). R for all (I): Introduction to the new age of biological analyses. Casopis Slezskeho Zemskeho Muzea (A), 62(1). <a href="https://doi.org/10.2478/cszma-2013-0004" target="_blank">https://doi.org/10.2478/cszma-2013-0004</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> rWBclimate </td>
   <td style="text-align:left;"> A package for accessing World Bank climate data </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Edmund Hart </td>
   <td style="text-align:left;"> This package will download model predictions from 15 different global circulation models in 20 year intervals from the world bank.  Users can also access historical data, and create maps at 2 different spatial scales. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> skynet </td>
   <td style="text-align:left;"> Generates Networks from BTS Data </td>
   <td style="text-align:left;"> https://www.transtats.bts.gov/databases.asp?Mode_ID=1&Mode_Desc=Aviation&Subject_ID2=0 </td>
   <td style="text-align:left;"> Filipe Teixeira </td>
   <td style="text-align:left;"> A flexible tool that allows generating bespoke    air transport statistics for urban studies based on publicly available    data from the Bureau of Transport Statistics (BTS) in the United States    <https://www.transtats.bts.gov/databases.asp?Mode_ID=1&Mode_Desc=Aviation&Subject_ID2=0>. </td>
   <td style="text-align:left;"> air-transport, bts, bureau-of-transport-statistics, db1b, peer-reviewed, rita, skynet, t100, transtats </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/214 </td>
   <td style="text-align:left;"> 📃 Teixeira, F., & Derudder, B. (2018). SKYNET: An R package for generating air passenger networks for urban studies. Urban Studies, 004209801880325. <a href="https://doi.org/10.1177/0042098018803258" target="_blank">https://doi.org/10.1177/0042098018803258</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> smapr </td>
   <td style="text-align:left;"> Acquisition and Processing of NASA Soil Moisture Active-Passive (SMAP) Data </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Maxwell Joseph </td>
   <td style="text-align:left;"> Facilitates programmatic access to NASA Soil Moisture Active    Passive (SMAP) data with R. It includes functions to search for, acquire,    and extract SMAP data. </td>
   <td style="text-align:left;"> acquisition, extract-data, nasa, peer-reviewed, raster, smap-data, soil-mapping, soil-moisture, soil-moisture-sensor </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/231 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> solrium </td>
   <td style="text-align:left;"> General Purpose R Interface to 'Solr' </td>
   <td style="text-align:left;"> https://lucene.apache.org/solr </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Provides a set of functions for querying and parsing data    from 'Solr' (<https://lucene.apache.org/solr>) 'endpoints' (local and    remote), including search, 'faceting', 'highlighting', 'stats', and    'more like this'. In addition, some functionality is included for    creating, deleting, and updating documents in a 'Solr' 'database'. </td>
   <td style="text-align:left;"> API, database, JSON, search, web, XML </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> spocc </td>
   <td style="text-align:left;"> Interface to Species Occurrence Data Sources </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> A programmatic interface to many species occurrence data sources,    including Global Biodiversity Information Facility ('GBIF'), 'USGSs'    Biodiversity Information Serving Our Nation ('BISON'), 'iNaturalist',    Berkeley 'Ecoinformatics' Engine, 'eBird', Integrated Digitized    'Biocollections' ('iDigBio'), 'VertNet', Ocean 'Biogeographic' Information    System ('OBIS'), and Atlas of Living Australia ('ALA'). Includes    functionality for retrieving species occurrence data, and combining    those data. </td>
   <td style="text-align:left;"> ALA, API, BISON, eBird, Ecoengine, GBIF, iDigBio, INAT, OBIS, occurrences, species, specimens, taxonomy, Vertnet, web-services </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Alfsnes, K., Leinaas, H. P., & Hessen, D. O. (2017). Genome size in arthropods: different roles of phylogeny, habitat and life history in insects and crustaceans. Ecology and Evolution. <a href="https://doi.org/10.1002/ece3.3163" target="_blank">https://doi.org/10.1002/ece3.3163</a><br>📃 Vanderhoeven, S., Adriaens, T., Desmet, P., Strubbe, D., Backeljau, T., Barbier, Y., … Groom, Q. (2017). Tracking Invasive Alien Species (TrIAS): Building a data-driven framework to inform policy. Research Ideas and Outcomes, 3, e13414. <a href="https://doi.org/10.3897/rio.3.e13414" target="_blank">https://doi.org/10.3897/rio.3.e13414</a><br>📃 Dallas, T., Decker, R. R., & Hastings, A. (2017). Species are not most abundant in the centre of their geographic range or climatic niche. Ecology Letters. <a href="https://doi.org/10.1111/ele.12860" target="_blank">https://doi.org/10.1111/ele.12860</a><br>📃 Oldham, K. A., & Weeks, A. (2017). Varieties of Melampyrum Lineare (Orobanchaceae) Revisited. Rhodora. <http://www.rhodorajournal.org/ <a href="https://doi.org/10.3119/16-13" target="_blank">https://doi.org/10.3119/16-13</a><br>📃 Sales, L. P., Ribeiro, B. R., Hayward, M. W., Paglia, A., Passamani, M., & Loyola, R. (2017). Niche conservatism and the invasive potential of the wild boar. Journal of Animal Ecology, 86(5), 1214–1223. <a href="https://doi.org/10.1111/1365-2656.12721" target="_blank">https://doi.org/10.1111/1365-2656.12721</a><br>📃 Longbottom, J., Shearer, F. M., Devine, M., Alcoba, G., Chappuis, F., Weiss, D. J., … Pigott, D. M. (2018). Vulnerability to snakebite envenoming: a global mapping of hotspots. The Lancet. <a href="https://doi.org/10.1016/S0140-6736(18)31224-8" target="_blank">https://doi.org/10.1016/S0140-6736(18)31224-8</a><br>📃 Samy, A. M., Alkishe, A. A., Thomas, S., Wang, L., & Zhang, W. (2018). Mapping the potential distributions of etiological agent, vectors, and reservoirs of Japanese Encephalitis in Asia and Australia. Acta Tropica. <a href="https://doi.org/10.1016/j.actatropica.2018.08.014" target="_blank">https://doi.org/10.1016/j.actatropica.2018.08.014</a><br>📃 Pfeffer, D. A., Lucas, T. C. D., May, D., Harris, J., Rozier, J., Twohig, K. A., … Gething, P. W. (2018). malariaAtlas: an R interface to global malariometric data hosted by the Malaria Atlas Project. Malaria Journal, 17(1). <a href="https://doi.org/10.1186/s12936-018-2500-5" target="_blank">https://doi.org/10.1186/s12936-018-2500-5</a><br>📃 Perez, T. M., Valverde-Barrantes, O., Bravo, C., Taylor, T. C., Fadrique, B., Hogan, J. A., … Feeley, K. J. (2018). Botanic gardens are an untapped resource for studying the functional ecology of tropical plants. Philosophical Transactions of the Royal Society B: Biological Sciences, 374(1763), 20170390. <a href="https://doi.org/10.1098/rstb.2017.0390" target="_blank">https://doi.org/10.1098/rstb.2017.0390</a><br>📃 Zuquim, G., Costa, F. R. C., Tuomisto, H., Moulatlet, G. M., & Figueiredo, F. O. G. (2019). The importance of soils in predicting the future of plant habitat suitability in a tropical forest. Plant and Soil. <a href="https://doi.org/10.1007/s11104-018-03915-9" target="_blank">https://doi.org/10.1007/s11104-018-03915-9</a><br>📃 Myers, E. A., Xue, A. T., Gehara, M., Cox, C., Davis Rabosky, A. R., Lemos‐Espinal, J., … Burbrink, F. T. (2019). Environmental Heterogeneity and Not Vicariant Biogeographic Barriers Generate Community Wide Population Structure in Desert Adapted Snakes. Molecular Ecology. <a href="https://doi.org/10.1111/mec.15182" target="_blank">https://doi.org/10.1111/mec.15182</a><br>📃 Pender, J. E., Hipp, A. L., Hahn, M., Kartesz, J., Nishino, M., & Starr, J. R. (2019). How sensitive are climatic niche inferences to distribution data sampling? A comparison of Biota of North America Program (BONAP) and Global Biodiversity Information Facility (GBIF) datasets. Ecological Informatics, 100991. <a href="https://doi.org/10.1016/j.ecoinf.2019.100991" target="_blank">https://doi.org/10.1016/j.ecoinf.2019.100991</a><br>📃 Báez, J. C., Barbosa, A. M., Pascual, P., Ramos, M. L., & Abascal, F. (2019). Ensemble modeling of the potential distribution of the whale shark in the Atlantic Ocean. Ecology and Evolution, 10(1), 175–184. <a href="https://doi.org/10.1002/ece3.5884" target="_blank">https://doi.org/10.1002/ece3.5884</a><br>📃 Reyes, J. A., & Lira-Noriega, A. (2020). Current and future global potential distribution of the fruit fly Drosophila suzukii (Diptera: Drosophilidae). The Canadian Entomologist, 1–13. <a href="https://doi.org/10.4039/tce.2020.3" target="_blank">https://doi.org/10.4039/tce.2020.3</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> suppdata </td>
   <td style="text-align:left;"> Downloading Supplementary Data from Published Manuscripts </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> William D. Pearse </td>
   <td style="text-align:left;"> Downloads data supplementary materials from manuscripts,    using papers' DOIs as references. Facilitates open, reproducible    research workflows: scientists re-analyzing published datasets can    work with them as easily as if they were stored on their own    computer, and others can track their analysis workflow    painlessly. The main function suppdata() returns a (temporary)    location on the user's computer where the file is stored, making    it simple to use suppdata() with standard functions like    read.csv(). </td>
   <td style="text-align:left;"> peer-reviewed </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/195 </td>
   <td style="text-align:left;"> 📃 D Pearse, W., & A Chamberlain, S. (2018). Suppdata: Downloading Supplementary Data from Published Manuscripts. Journal of Open Source Software, 3(25), 721. <a href="https://doi.org/10.21105/joss.00721" target="_blank">https://doi.org/10.21105/joss.00721</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> tidyhydat </td>
   <td style="text-align:left;"> Extract and Tidy Canadian 'Hydrometric' Data </td>
   <td style="text-align:left;"> http://dd.weather.gc.ca/hydrometric/csv http://collaboration.cmc.ec.gc.ca/cmc/hydrometrics/www </td>
   <td style="text-align:left;"> Sam Albers </td>
   <td style="text-align:left;"> Provides functions to access historical and real-time national 'hydrometric'    data from Water Survey of Canada data sources (<http://dd.weather.gc.ca/hydrometric/csv/> and    <http://collaboration.cmc.ec.gc.ca/cmc/hydrometrics/www/>) and then applies tidy data principles. </td>
   <td style="text-align:left;"> citz, government-data, hydrology, hydrometrics, tidy-data, water-resources </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/152 </td>
   <td style="text-align:left;"> 📃 Albers, S. (2017). tidyhydat: Extract and Tidy Canadian Hydrometric Data. The Journal of Open Source Software, 2(20), 511. <a href="https://doi.org/10.21105/joss.00511" target="_blank">https://doi.org/10.21105/joss.00511</a><br>📃 Beaton, A., Whaley, R., Corston, K., & Kenny, F. (2019). Identifying historic river ice breakup timing using MODIS and Google Earth Engine in support of operational flood monitoring in Northern Ontario. <a href="https://doi.org/10.1016/j.rse.2019.02.011" target="_blank">https://doi.org/10.1016/j.rse.2019.02.011</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> traits </td>
   <td style="text-align:left;"> Species Trait Data from Around the Web </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Scott Chamberlain </td>
   <td style="text-align:left;"> Species trait data from many different sources, including    sequence data from 'NCBI', plant trait data from 'BETYdb', plant data    from the USDA plants database, data from 'EOL' 'Traitbank',     Coral traits data (<https://coraltraits.org>), 'Birdlife' International,     and more. </td>
   <td style="text-align:left;"> api-client, species, traits </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Michonneau, F., Brown, J. W., & Winter, D. J. (2016). rotl: an R package to interact with the Open Tree of Life data. Methods in Ecology and Evolution. <a href="https://doi.org/10.1111/2041-210x.12593" target="_blank">https://doi.org/10.1111/2041-210x.12593</a><br>📃 LeBauer, D., Kooper, R., Mulrooney, P., Rohde, S., Wang, D., Long, S. P., & Dietze, M. C. (2017). BETYdb: a yield, trait, and ecosystem service database applied to second‐generation bioenergy feedstock production. GCB Bioenergy. <a href="https://doi.org/10.1111/gcbb.12420" target="_blank">https://doi.org/10.1111/gcbb.12420</a> </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> treebase </td>
   <td style="text-align:left;"> Discovery, Access and Manipulation of 'TreeBASE' Phylogenies </td>
   <td style="text-align:left;"> http://treebase.org </td>
   <td style="text-align:left;"> Carl Boettiger </td>
   <td style="text-align:left;"> Interface to the API for 'TreeBASE' <http://treebase.org>    from 'R.' 'TreeBASE' is a repository of user-submitted phylogenetic    trees (of species, population, or genes) and the data used to create    them. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> USAboundaries </td>
   <td style="text-align:left;"> Historical and Contemporary Boundaries of the United States of America </td>
   <td style="text-align:left;"> U.S. Census Bureau, Newberry Librarys Atlas of Historical County Boundaries' </td>
   <td style="text-align:left;"> Lincoln Mullen </td>
   <td style="text-align:left;"> The boundaries for geographical units in the United States of    America contained in this package include state, county, congressional    district, and zip code tabulation area. Contemporary boundaries are provided    by the U.S. Census Bureau (public domain). Historical boundaries for the    years from 1629 to 2000 are provided form the Newberry Library's 'Atlas of    Historical County Boundaries' (licensed CC BY-NC-SA). Additional  data is    provided in the 'USAboundariesData' package; this package provides an    interface to access that data. </td>
   <td style="text-align:left;"> digital-history, history, spatial-data </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> USAboundariesData </td>
   <td style="text-align:left;"> Datasets for the 'USAboundaries' package </td>
   <td style="text-align:left;"> U.S. Census Bureau, the Newberry Librarys Historical Atlas of U.S. County Boundaries, and Erik Steiners United States Historical City Populations, 1790-2010. </td>
   <td style="text-align:left;"> Lincoln Mullen </td>
   <td style="text-align:left;"> Contains datasets, including higher resolution boundary data, for    use in the 'USAboundaries' package. These datasets come from the U.S. Census    Bureau, the Newberry Library's 'Historical Atlas of U.S. County    Boundaries', and Erik Steiner's 'United States Historical City Populations,     1790-2010'. </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> weathercan </td>
   <td style="text-align:left;"> Download Weather Data from the Environment and Climate Change Canada Website </td>
   <td style="text-align:left;"> http://climate.weather.gc.ca/historical_data/search_historic_data_e.html </td>
   <td style="text-align:left;"> Steffi LaZerte </td>
   <td style="text-align:left;"> Provides means for downloading historical weather data from     the Environment and Climate Change Canada website     (<http://climate.weather.gc.ca/historical_data/search_historic_data_e.html>).     Data can be downloaded from multiple stations and over large date ranges     and automatically processed into a single dataset. Tools are also provided     to identify stations either by name or proximity to a location. </td>
   <td style="text-align:left;"> environment-canada, peer-reviewed, weather-data, weather-downloader </td>
   <td style="text-align:left;"> https://github.com/ropensci/onboarding/issues/160 </td>
   <td style="text-align:left;">  </td>
  </tr>
  <tr>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> webchem </td>
   <td style="text-align:left;"> Chemical Information from the Web </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> Tamás Stirling </td>
   <td style="text-align:left;"> Chemical information from around the web. This package interacts    with a suite of web APIs for chemical information. </td>
   <td style="text-align:left;"> cas-number, chemical-information, chemspider, identifier, ropensci, webscraping </td>
   <td style="text-align:left;">  </td>
   <td style="text-align:left;"> 📃 Pirhadi, S., Sunseri, J., & Koes, D. R. (2016). Open Source Molecular Modeling. Journal of Molecular Graphics and Modelling. <a href="https://doi.org/10.1016/j.jmgm.2016.07.008" target="_blank">https://doi.org/10.1016/j.jmgm.2016.07.008</a><br>📃 Bergmann, A. J., Scott, R. P., Wilson, G., & Anderson, K. A. (2018). Development of quantitative screen for 1550 chemicals with GC-MS. Analytical and Bioanalytical Chemistry, 1-10. <https://link.springer.com/article/10.1007/s00216-018-0997-7> <a href="https://doi.org/10.1007/s00216-018-0997-7" target="_blank">https://doi.org/10.1007/s00216-018-0997-7</a><br>📃 Stanstrup, J., Broeckling, C., Helmus, R., Hoffmann, N., Mathé, E., Naake, T., … Neumann, S. (2019). The metaRbolomics Toolbox in Bioconductor and beyond. Metabolites, 9(10), 200. <a href="https://doi.org/10.3390/metabo9100200" target="_blank">https://doi.org/10.3390/metabo9100200</a><br>📃 Tada, I., Tsugawa, H., Meister, I., Zhang, P., Shu, R., Katsumi, R., … Chaleckis, R. (2019). Creating a Reliable Mass Spectral–Retention Time Library for All Ion Fragmentation-Based Metabolomics. Metabolites, 9(11), 251. <a href="https://doi.org/10.3390/metabo9110251" target="_blank">https://doi.org/10.3390/metabo9110251</a><br>📃 Malaj, E., Liber, K., & Morrissey, C. A. (2019). Spatial distribution of agricultural pesticide use and predicted wetland exposure in the Canadian Prairie Pothole Region. Science of The Total Environment, 134765. <a href="https://doi.org/10.1016/j.scitotenv.2019.134765" target="_blank">https://doi.org/10.1016/j.scitotenv.2019.134765</a> </td>
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

Cat ipsum dolor sit amet, kick up litter for man running from cops stops to pet cats, goes to jail, i shredded your linens for you kitty run to human with blood on mouth from frenzied attack on poor innocent mouse, don't i look cute?. I hate cucumber pls dont throw it at me intently sniff hand. Leave hair on owner's clothes bite the neighbor's bratty kid. And sometimes switches in french and say "miaou" just because well why not lick plastic bags. Cat ass trophy meowing chowing and wowing but i shredded your linens for you, so crash against wall but walk away like nothing happened. Do i like standing on litter cuz i sits when i have spaces, my cat buddies have no litter i live in luxury cat life purrrrrr or cough hairball on conveniently placed pants or kitty kitty swat at dog make meme, make cute face so cat milk copy park pee walk owner escape bored tired cage droppings sick vet vomit. Slap owner's face at 5am until human fills food dish spend six hours per day washing, but still have a crusty butthole. Ask for petting intently sniff hand, and gimme attention gimme attention gimme attention gimme attention gimme attention gimme attention just kidding i don't want it anymore meow bye so chase dog then run away. Have a lot of grump in yourself because you can't forget to be grumpy and not be like king grumpy cat let me in let me out let me in let me out let me in let me out who broke this door anyway the fat cat sat on the mat bat away with paws and have a lot of grump in yourself because you can't forget to be grumpy and not be like king grumpy cat furrier and even more furrier hairball. Jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed fooled again thinking the dog likes me but fall over dead (not really but gets sypathy). Kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff massacre a bird in the living room and then look like the cutest and most innocent animal on the planet and sweet beast. Climb leg.

[^cat]: http://www.catipsum.com
