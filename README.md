# rOpenSci-website

This is the repository where the new rOpenSci website lives.

## Requirements
* Node
* NPM

Since this project is using postCSS to handle stylesheets for modularity, some transpiling needs to be done

## Installation

To install the project you basically just need to run
`$npm install`

## Usage

If you need to update or make any changes in the stylesheets, please do so in the correspondant `.pcss` file
To transpile your changes, you just need to run 
`$npm run css`
and the script will basically do everything that needs to be done

### Component Documentation
#### Package Table

The package table in `packages.html` is pretty much the standard markup for an HTML table, however, besides including the table funcionality scripts before the closing `<body>`tag, there are a couple of things that making the addition of a new package should appear in the wrapping `<tr>` tag.

*Example*
```
<!-- The <tr> class should match any of the available class names of the filter radio buttons, you can check a list below this example -->
<tr class="packageCategory"> 
    <!-- The first <td> tag belongs to the package name, simply use an <a> tag with the URL for the package homepage and add the package name inside it-->
    <td>
        <a href="https://awesomepackage.sample">Awesome Sample Package</a>
    </td>
    <td>
        <!-- Inside the second <td> tag goes the description, here you can freely use as many <p> and <a> tags as you'd like -->
    </td>
    <td>
        <!-- The third and last <td> tag belongs to the CRAN, BIOC and GitHub availability, first wrap them in their respective URLs with an <a> tag and then use a <p> tag with the class `label`  -->
        <a href="https://cran.rstudio.com/web/packages/awesomepackage/">
            <p class="label cran">cran</p> <!-- For the CRAN label, append the `cran` class to the <p> tag  and the corresponding text inside it --> 
        </a>
        <a href="https://bioconductor.org/packages/release/bioc/html/awesomepackage.html">
            <p class="label bioc">bioc</p><!-- For the BIOC label, append the `bioc` class to the <p> tag and the corresponding text inside it -->
        </a>
        <a href="https://github.com/awesomeness/awesomerpackage/">
            <p class="label icon-github"></p><!-- For the GitHub label, append the `icon-github` class to the <p> tag and automagically css will add the icon content -->
        </a>
    </td>
</tr>
```

*Available `<input type='radio'>` classes*
_IMPORTANT: Please, make sure you're using the exact same name, JS can get very case sensitive_

* `.dataPub` for Data Publishing
* `.access` for Data Access
* `.literature` for Literature
* `.datatools` for Data Tooling
* `.geospatial` …this is pretty self explanatory, but yes, it belongs to Geospatial packages
* `.db` for databases
* `.dataviz` for Data Visualization
* `.altmetrics` For Altmetrics packages, go figure!
* `.scaleprod` for Scalable and Reproducible computing


#### Community Calls Slider
_NOTE: This encourages the use of Node and NPM to compile the postCSS files since you have to change the CSS_
The image slider in the community calls inside `community.html` looks pretty neat, huh?
Well, here's everything you need in order to customize the beautiful kitten pictures: 

Inside the `<section class="commcalls slideshow">` in the `community.html` file, you'll find a `<ul>`tag, every `<li>` inside there translates to a slide in the slideshow, here's a bit more info on the expected contents of each `<li>` tag

```
<li>
    <span>01</span><!-- The number of the slide, CSS needs this to not break in other browsers…well, in IE actually -->
    <div><!-- Yep, more wrappers required to avoid breaking and make pagination work-->
        <h3>Speaker Name</h3> <!-- This text content will be what the slide will display at the bottom center -->
    </div>
</li>
```

To change the picture, first, just place it inside the `img` folder.
Afterwards, go to the `slider.pcss` file, around line 75 you'll come accross `.slideshow li:nth-child(n) span` create one class increasing the `n` to match the background with the span you'd like, like this:

```
.slideshow li:nth-child(1) span { 
    background-image: url(../img/hadley-wickham.jpg) 
}
.slideshow li:nth-child(2) span { 
    background-image: url(../img/karthik-ram.jpg);
    animation-delay: 6s; 
}
```

If you want any slide to take more time displaying, you can increase it using the `animation-delay` property, like in the second slideshow `<li>` tag. It odesn't matter if your image is color or black or white, CSS will automagically process it to make it match with the rest. 



#### _Double_ Accordion
To enable the _Double_ accordion from the `careers.html` page, after importing both JQuery and the `careers.js` script before the final closing `<body>` tag you need the markup illustrated below so the script will know which element should behave like an accordion:

```
<!-- Accordion begins -->
<div class="position top-4">
    <div class="title"><!-- This tab will trigger first accordion toggle fold on click -->
        <h5>Tab Title</h5>
        <!-- If you add a link with the class name apply, it will auomatically create an anchor with a button appeareance -->
        <a class="apply"></a>
    </div>
    <div class="description">
        <small class="meta">Location, Availability</small> <!-- This was designed for details such as location -->
        <p>Just place your short description here</p>
    </div>
    <!-- /First accordion fold ends here -->
    <div class="detailed top-4"><!-- After the previous container add another with the class name `detailed` for a second accordion fold -->
      <h6>Much more info below: </h6>
      <ul>
          <li>You might like to list stuff</li>
          <li>Because list give short info and can be pretty useful</li>
      </ul>
  </div>
  <!-- Ends second accordion fold -->
  <a class="expand more">Read More</a> <!-- This link will trigger the second fold on click --> 
</div><!-- /position -->
<!-- Accordion ends -->
```

And that's pretty much it!


## Contributing
All contributions are welcome!

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Credits
Maru Lango
& Special thanks to Jeduan for unstucking me on a particular script

## License
TODO: Write license
