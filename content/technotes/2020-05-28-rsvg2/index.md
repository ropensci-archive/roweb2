---
slug: rsvg2
title: 'Superior svg graphics rendering in R, and why it matters'
date: '2020-05-28'
author:
  - Jeroen Ooms
cover: https://docs.ropensci.org/av/reference/read_audio-1.png
tags:
  - R
  - images
  - packages
  - svg
---

This week we released a major new version of the [rsvg](https://cran.r-project.org/web/packages/rsvg/index.html) package on CRAN. This package provides R bindings to [librsvg2](https://developer.gnome.org/rsvg/stable/) which is a powerful system library for rendering svg images into bitmaps, which we can use for further processing in for example the [magick](https://docs.ropensci.org/magick) package.

The biggest change in this release is the R package on Windows and MacOS now includes the latest librsvg 2.48.4. This is a major upgrade; the librsvg2 rendering engine has been [completely rewritten](https://people.gnome.org/~federico/blog/css-in-librsvg-is-now-in-rust.html) in Rust using components from [Mozilla Servo](https://research.mozilla.org/servo-engines/). This has resulted in major improvements in quality and performance, and we have gained full support for css styling.

In this post we showcase how it works, and we you should use svg for R graphics.

## What is rendering

A figure in svg format is stored in an xml file containing a vector representation of a drawing, i.e. sequence of lines, shapes, text, with their relative position, color, attributes, and so on. The benefit of storing images in svg format is that they can be resized without loss of quality. And because it is just xml, the shapes and text can be manipulated using standard xml/css tools, such as a browser.

For an image to be displayed on screen, printed in a document, or loaded in editing software, it has to be _rendered_ into a bitmap. A bitmap is simply fixed a 2D array of pixels with color values. Bitmap formats such as png, jpeg, or tiff all store the same pixel data, using different compression methods.

The rsvg package renders svg into a bitmap image with the format and size of your choice, directly in R, and without loss of quality:

```r
# Example SVG image
svgdata <- '<svg viewBox="0 0 1200 250" xmlns="http://www.w3.org/2000/svg">
  <style>
    circle {
      fill: gold;
      stroke: maroon;
      stroke-width: 12px;
    }
    text {
      fill: navy;
      font-size: 2em;
      font-family: "Times, Serif"
    }
  </style>	
  <circle cx="200" cy="125" r="120" />
  <text x="140" y="40" transform="rotate(30 10,20)">I love SVG!</text>
</svg>'

# Render with rsvg into png
writeLines(svgdata, 'image.svg')
rsvg::rsvg_png('image.svg', 'image.png', width = 800)
```

Instead of rendering to a file, you can also render the svg into raw bitmap data (called raw vectors in R), which you can read with for example [magick](https://docs.ropensci.org/magick) or any other imaging package:


```r
# Or: convert into raw bitmap data
bitmap <- rsvg_raw('image.svg', width = 600)
str(bitmap)
##> raw [1:4, 1:600, 1:600] 

# Read the bitmap in magick
image <- magick::image_read(bitmap)
```

<svg viewBox="0 0 1200 250" xmlns="http://www.w3.org/2000/svg">
  <style>
    circle {
      fill: gold;
      stroke: maroon;
      stroke-width: 12px;
    }
    text {
      fill: navy;
      font-size: 2em;
      font-family: "Times, Serif"
    }
  </style>	
  <circle cx="200" cy="125" r="120" />
  <text x="140" y="40" transform="rotate(30 10,20)">I love SVG!</text>
</svg>

In magick, you can easily do all sorts of post-processing and conversion of the bitmap image. The `magick` package has a convenient wrapper function [read_image_svg](https://docs.ropensci.org/magick/reference/editing.html) that does exactly this: it uses `rsvg` to render the image and then reads the bitmap data as a magick image.

## Using SVG for R graphics

The best way to create svg files from graphics in R is using the [svglite](https://cran.r-project.org/web/packages/svglite/index.html) package. Try running the code below and then have a look at [mtcars.svg](mtcars.svg) in a text editor.


```r
library(svglite)
library(ggplot2)

# SVG sizes are in inches, not pixels
res <- 144
svglite("mtcars.svg", width = 1080/res, height = 720/res)
ggplot(mtcars, aes(mpg, disp, colour = hp)) + geom_point() + geom_smooth()
dev.off()
```

<object id="my-svg" type="image/svg+xml" data="mtcars.svg"></object>
<script src="//cdn.jsdelivr.net/npm/vivus@latest/dist/vivus.min.js"></script>
<script>
var anim = new Vivus('my-svg', { duration: 200 });
</script>

Again we can use rsvg directly or via magick to convert this to a bitmap image:

```r
# Render the svg into a png image with rsvg via magick
img <- magick::image_read_svg("mtcars.svg", width = 1080)
magick::image_write(img, 'mtcars.png')
```

This generates a png image of with 800px, without loss of quality.

## Using CSS for R graphics?

One feature in librsvg that has improved a lot from servo is support for CSS. As can be seen in the example above, svg allows for specifying global styling via CSS rules. In the browser, CSS and JavaScript can also be used to add interactivity and animation to SVG.

With the latest version of librsvg it is now also possible to specify the CSS stylesheet from an external file, rather than inlining it in the svg itself. For example you can have a `fig.svg` file like this:

```xml
<svg viewBox="0 0 1200 250" xmlns="http://www.w3.org/2000/svg">
  <circle cx="200" cy="125" r="120" />
  <text x="140" y="40" transform="rotate(30 10,20)">Separate CSS!</text>
</svg>
```

And a separate `style.css` file like this:

```css
circle {
  fill: gold;
  stroke: maroon;
  stroke-width: 12px;
}
text {
  fill: navy;
  font-size: 2em;
  font-family: "Times, Serif"
}
```

Which you would render in R like this to get the same figure as above.

```r
rsvg_png('fig.svg', css = 'style.css', file = 'output.png')
```

So is this useful? Maybe, I'm not sure. The R graphics system is pretty old, it currently doesn't have any notion of separating style from layout like we do in modern webpages. It could be useful to think about which styling properties of graphics could be decoupled from the figure structure. [D3](https://d3js.org/) goes even further and defers almost all styling to CSS:

> D3’s vocabulary of graphical marks comes directly from web standards: HTML, SVG, and CSS. For example, you can create SVG elements using D3 and style them with external stylesheets. You can use composite filter effects, dashed strokes and clipping. If browser vendors introduce new features tomorrow, you’ll be able to use them immediately—no toolkit update required. And, if you decide in the future to use a toolkit other than D3, you can take your knowledge of standards with you!

Maybe not everything generalizes directly to R, but many things do. For example one could imagine it would be useful to specify fonts and color palettes in the rendering phase, rather than hardcoding these in the graphic. If we can untangle these things, it may be possible to produce R graphics as objects that can both be rendered into bitmaps for printing, but at the same time allow interactivity and animation in the browser.

