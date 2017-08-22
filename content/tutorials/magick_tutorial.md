---
title: magick vignette
package_version: 0.2.2
---



The new [magick](https://cran.r-project.org/package=magick) package is an ambitious effort to modernize and simplify high-quality image processing in R. It wraps the [ImageMagick STL](https://www.imagemagick.org/Magick++/STL.html) which is perhaps the most comprehensive open-source image processing library available today.

The ImageMagick library has an overwhelming amount of functionality. The current version of Magick exposes a decent chunk of it, but being a first release, documentation is still sparse. This post briefly introduces the most important concepts to get started.

<section id="installation">

## Installation

On Windows or OS-X the package is most easily installed via CRAN.

```r
install.packages("magick")
```

The binary CRAN packages work out of the box and have most important features enabled.
Use `magick_config` to see which features and formats are supported by your version of ImageMagick.



```r
str(magick::magick_config())
```

```
#> List of 21
#>  $ version           : chr "6.9.5-7"
#>  $ modules           : logi FALSE
#>  $ cairo             : logi TRUE
#>  $ fontconfig        : logi TRUE
#>  $ freetype          : logi TRUE
#>  $ fftw              : logi TRUE
#>  $ ghostscript       : logi FALSE
#>  $ jpeg              : logi TRUE
#>  $ lcms              : logi FALSE
#>  $ libopenjp2        : logi FALSE
#>  $ lzma              : logi TRUE
#>  $ pangocairo        : logi TRUE
#>  $ pango             : logi TRUE
#>  $ png               : logi TRUE
#>  $ rsvg              : logi TRUE
#>  $ tiff              : logi TRUE
#>  $ webp              : logi TRUE
#>  $ wmf               : logi FALSE
#>  $ x11               : logi FALSE
#>  $ xml               : logi TRUE
#>  $ zero-configuration: logi FALSE
```


### Build from source

On Linux you need to install the ImageMagick++ library: on Debian/Ubuntu this is called [libmagick++-dev](https://packages.debian.org/testing/libmagick++-dev):

```
sudo apt-get install libmagick++-dev
```

On Fedora or CentOS/RHEL we need [ImageMagick-c++-devel](https://apps.fedoraproject.org/packages/ImageMagick-c++-devel):

```
sudo yum install ImageMagick-c++-devel
```

To install from source on OS-X you need `imagemagick` from homebrew.

```
brew install imagemagick --with-fontconfig --with-librsvg --with-fftw
```

The default imagemagick configuration on homebrew disables a bunch of features. It is recommended to brew with at least `--with-fontconfig` and `--with-librsvg` to support high quality font / svg rendering (the CRAN OSX binary package enables these as well).

<section id="usage">

## Usage


```r
library("magick")
```

### Image IO

What makes magick so magical is that it automatically converts and renders all common image formats. ImageMagick supports dozens of formats and automatically detects the type. Use `magick::magick_config()` to list the formats that your version of ImageMagick supports.

#### Read and write

Images can be read directly from a file path, URL, or raw vector with image data with `image_read`. The `image_info` function shows some meta data about the image, similar to the imagemagick `identify` command line utility.


```r
library(magick)
tiger <- image_read('https://upload.wikimedia.org/wikipedia/commons/f/fd/Ghostscript_Tiger.svg')
image_info(tiger)
```

```
#>   format width height colorspace filesize
#> 1    SVG   900    900       sRGB    68630
```

We use `image_write` to export an image in any format to a file on disk, or in memory if `path = NULL`.

```r
# Render svg to png bitmap
image_write(tiger, path = "tiger.png", format = "png")
```

If `path` is a filename, `image_write` returns `path` on success such that the result can be piped into function taking a file path.

### Converting formats

Magick keeps the image in memory in it's original format. Specify the `format` parmeter `image_write` to convert to another format. You can also internally convert the image to another format earlier, before applying transformations. This can be useful if your original format is lossy.


```r
tiger_png <- image_convert(tiger, "png")
image_info(tiger_png)
```

```
#>   format width height colorspace filesize
#> 1    png   900    900       sRGB        0
```

Note that size is currently 0 because ImageMagick is lazy (in the good sense) and does not render until it has to.

#### Preview

IDE's with a built-in web browser (such as RStudio) automatically display magick images in the viewer. This results in a neat interactive image editing environment.

![RStudio Screenshot](https://ropensci.org/assets/blog-images/magick-rstudio.png)

Alternatively, on Linux you can use `image_display` to preview the image in an X11 window. Finally `image_browse` opens the image in your system's default application for a given type.

```r
# X11 only
image_display(tiger)

# System dependent
image_browse(tiger)
```

Another method is converting the image to a raster object and plot it on R's graphics display. However this is very slow and only useful in combination with other plotting functionality. See [#raster](#raster-graphics) below.

### Transformations

The best way to get a sense of available transformations is walk through the examples in the `?transformations` help page in RStudio. Below a few examples to get a sense of what is possible.

#### Cut and edit

Several of the transformation functions take an `geometry` parameter which requires a special syntax of the form `AxB+C+D` where each element is optional. Some examples:

  - `image_crop(image, "100x150+50")`: *crop out `width:100px` and `height:150px` starting `+50px` from the left*
  - `image_scale(image, "200")`: *resize proportionally to width: `200px`*
  - `image_scale(image, "x200")`: *resize proportionally to height: `200px`*
  - `image_fill(image, "blue", "+100+200")`: *flood fill with blue starting at the point at `x:100, y:200`*
  - `image_border(frink, "red", "20x10")`: *adds a border of 20px left+right and 10px top+bottom*

The full syntax is specified in the [Magick::Geometry](http://www.imagemagick.org/Magick++/Geometry.html) documentation.


```r
# Example image
frink <- image_read("https://jeroenooms.github.io/images/frink.png")
print(frink)
```

![plot of chunk unnamed-chunk-6](../assets/tutorial-images/magick/file3c926fe8922a.png)

```r
# Add 20px left/right and 10px top/bottom
image_border(frink, "red", "20x10")
```

![plot of chunk unnamed-chunk-6](../assets/tutorial-images/magick/file3c92dd43ccc.png)

```r
# Trim margins
image_trim(frink)
```

![plot of chunk unnamed-chunk-6](../assets/tutorial-images/magick/file3c9268e37c2b.png)

```r
# Passport pica
image_crop(frink, "100x150+50")
```

![plot of chunk unnamed-chunk-6](../assets/tutorial-images/magick/file3c922eed20d9.png)

```r
# Resize
image_scale(frink, "300") # width: 300px
```

![plot of chunk unnamed-chunk-6](../assets/tutorial-images/magick/file3c9252079ea0.png)

```r
image_scale(frink, "x300") # height: 300px
```

![plot of chunk unnamed-chunk-6](../assets/tutorial-images/magick/file3c92723f4472.png)

```r
# Rotate or mirror
image_rotate(frink, 45)
```

![plot of chunk unnamed-chunk-6](../assets/tutorial-images/magick/file3c9217a6d2f7.png)

```r
image_flip(frink)
```

![plot of chunk unnamed-chunk-6](../assets/tutorial-images/magick/file3c9249646242.png)

```r
image_flop(frink)
```

![plot of chunk unnamed-chunk-6](../assets/tutorial-images/magick/file3c925d6f00b2.png)

```r
# Set a background color
image_background(frink, "pink", flatten = TRUE)
```

![plot of chunk unnamed-chunk-6](../assets/tutorial-images/magick/file3c922296d60a.png)

```r
image_fill(frink, "orange", point = "+100+200", fuzz = 30000)
```

![plot of chunk unnamed-chunk-6](../assets/tutorial-images/magick/file3c925cbe3c43.png)

With `image_fill` we can flood fill starting at pixel `point`. The `fuzz` parameter allows for the fill to cross for adjecent pixels with similarish colors. Its value must be between 0 and 256^2 specifying the max geometric distance between colors to be considered equal. Here we give professor frink an orange shirt for the World Cup.

#### Filters and effects

ImageMagick also has a bunch of standard effects that are worth checking out.


```r
# Add randomness
image_blur(frink, 10, 5)
```

![plot of chunk unnamed-chunk-7](../assets/tutorial-images/magick/file3c924f2e95d.png)

```r
image_noise(frink)
```

![plot of chunk unnamed-chunk-7](../assets/tutorial-images/magick/file3c9267b6db34.png)

```r
# This is so ugly it should be illegal
image_frame(frink, "25x25+10+10")
```

![plot of chunk unnamed-chunk-7](../assets/tutorial-images/magick/file3c9215f1681e.png)

```r
# Silly filters
image_charcoal(frink)
```

![plot of chunk unnamed-chunk-7](../assets/tutorial-images/magick/file3c921bea94d3.png)

```r
image_oilpaint(frink)
```

![plot of chunk unnamed-chunk-7](../assets/tutorial-images/magick/file3c9245d0b6f6.png)

```r
image_emboss(frink)
```

![plot of chunk unnamed-chunk-7](../assets/tutorial-images/magick/file3c9299bf449.png)

```r
image_edge(frink)
```

![plot of chunk unnamed-chunk-7](../assets/tutorial-images/magick/file3c925dc2e98c.png)

```r
image_negate(frink)
```

![plot of chunk unnamed-chunk-7](../assets/tutorial-images/magick/file3c922773166b.png)

#### Text annotation

Finally it can be useful to print some text on top of images:


```r
# Add some text
image_annotate(frink, "I like R!", size = 70, gravity = "southwest", color = "green")
```

![plot of chunk unnamed-chunk-8](../assets/tutorial-images/magick/file3c9216cd66bd.png)

```r
# Customize text
image_annotate(frink, "CONFIDENTIAL", size = 30, color = "red", boxcolor = "pink",
  degrees = 60, location = "+50+100")
```

![plot of chunk unnamed-chunk-8](../assets/tutorial-images/magick/file3c927140dfd.png)

```r
# Only works if ImageMagick has fontconfig
try(image_annotate(frink, "The quick brown fox", font = 'times-new-roman', size = 30), silent = T)
```

![plot of chunk unnamed-chunk-8](../assets/tutorial-images/magick/file3c9235a260ac.png)

If your system has difficulty finding a font, you can also specify the full path to the font file in the `font` parameter.

#### Combining with pipes

Each of the image transformation functions returns a **modified copy** of the original image. It does not affect the original image.


```r
frink <- image_read("https://jeroenooms.github.io/images/frink.png")
frink2 <- image_scale(frink, "100")
image_info(frink)
```

```
#>   format width height colorspace filesize
#> 1    PNG   220    445       sRGB    73494
```

```r
image_info(frink2)
```

```
#>   format width height colorspace filesize
#> 1    PNG   100    202       sRGB        0
```

Hence to combine transformations you need to chain them:


```r
test <- image_rotate(frink, 90)
test <- image_background(test, "blue", flatten = TRUE)
test <- image_border(test, "red", "10x10")
test <- image_annotate(test, "This is how we combine transformations", color = "white", size = 30)
print(test)
```

![plot of chunk unnamed-chunk-10](../assets/tutorial-images/magick/file3c9253615cbb.png)

Using `magrittr` pipe syntax makes it a bit more readable


```r
library(magrittr)
image_read("https://jeroenooms.github.io/images/frink.png") %>%
  image_rotate(270) %>%
  image_background("blue", flatten = TRUE) %>%
  image_border("red", "10x10") %>%
  image_annotate("The same thing with pipes", color = "white", size = 30)
```

![plot of chunk unnamed-chunk-11](../assets/tutorial-images/magick/file3c924082e9da.png)


### Image Vectors

The examples above concern single images. However all functions in magick have been vectorized to support working with layers, compositions or animation.

The standard base methods `[` `[[`, `c()` and `length()` are used to manipulate vectors of images which can then be treated as layers or frames.


```r
earth <- image_read("https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif")
earth <- image_scale(earth, "200")
length(earth)
```

```
#> [1] 44
```

```r
head(image_info(earth))
```

```
#>   format width height colorspace filesize
#> 1    GIF   200    200       sRGB        0
#> 2    GIF   200    200       sRGB        0
#> 3    GIF   200    200       sRGB        0
#> 4    GIF   200    200       sRGB        0
#> 5    GIF   200    200       sRGB        0
#> 6    GIF   200    200       sRGB        0
```

```r
print(earth)
```

![plot of chunk unnamed-chunk-12](../assets/tutorial-images/magick/file3c923fab7375.gif)

```r
rev(earth) %>%
  image_flip() %>%
  image_annotate("meanwhile in Australia", size = 20, color = "white")
```

![plot of chunk unnamed-chunk-12](../assets/tutorial-images/magick/file3c92112926fb.gif)

#### Layers

We can stack layers on top of each other as we would in Photoshop:


```r
bigdata <- image_read('http://feelgrafix.com/data_images/out/28/1004158-data.jpg')
frink <- image_read("https://jeroenooms.github.io/images/frink.png")
logo <- image_read("https://www.r-project.org/logo/Rlogo.png")
img <- c(bigdata, logo, frink)
img <- image_scale(img, "400x400")
image_info(img)
```

```
#>   format width height colorspace filesize
#> 1   JPEG   400    300       sRGB        0
#> 2    PNG   400    350       sRGB        0
#> 3    PNG   198    400       sRGB        0
```

A mosaic prints images on top of one another, expanding the output canvas such that that everything fits:


```r
image_mosaic(img)
```

![plot of chunk unnamed-chunk-14](../assets/tutorial-images/magick/file3c9254fc1de1.jpeg)

Flattening combines the layers into a single image which has the size of the first image:


```r
image_flatten(img)
```

![plot of chunk unnamed-chunk-15](../assets/tutorial-images/magick/file3c923560db31.jpeg)

Flattening and mosaic allow for specifying alternative [composite operators](https://www.imagemagick.org/Magick++/Enumerations.html#CompositeOperator):


```r
image_flatten(img, 'Add')
```

![plot of chunk unnamed-chunk-16](../assets/tutorial-images/magick/file3c923d2e50a.jpeg)

```r
image_flatten(img, 'Modulate')
```

![plot of chunk unnamed-chunk-16](../assets/tutorial-images/magick/file3c92abaf57c.jpeg)

```r
image_flatten(img, 'Minus')
```

![plot of chunk unnamed-chunk-16](../assets/tutorial-images/magick/file3c92784aa564.jpeg)

#### Combining

Appending means simply putting the frames next to each other:


```r
left_to_right <- image_append(image_scale(img, "x200"))
image_background(left_to_right, "white", flatten = TRUE)
```

![plot of chunk unnamed-chunk-17](../assets/tutorial-images/magick/file3c9239290401.jpeg)

Use `stack = TRUE` to position them on top of each other:


```r
top_to_bottom <- image_append(image_scale(img, "100"), stack = TRUE)
image_background(top_to_bottom, "white", flatten = TRUE)
```

![plot of chunk unnamed-chunk-18](../assets/tutorial-images/magick/file3c92adfca56.jpeg)

Composing allows for combining two images on a specific position:


```r
bigdatafrink <- image_scale(image_rotate(image_background(frink, "none"), 300), "x200")
image_composite(image_scale(bigdata, "x400"), bigdatafrink, offset = "+180+100")
```

![plot of chunk unnamed-chunk-19](../assets/tutorial-images/magick/file3c9275d72368.jpeg)

#### Pages

When reading a PDF document, each page becomes an element of the vector. Note that PDF gets rendered while reading so you need to specify the density immediately.


```r
manual <- image_read('https://cran.r-project.org/web/packages/magick/magick.pdf', density = "72x72")
image_info(manual)

# Convert the first page to PNG
image_convert(manual[1], "png", 8)
```

Magick requires ghostscript to render the PDF. An alternative method to read pdf is render it via the pdftools package:


```r
library(pdftools)
bitmap <- pdf_render_page('https://cran.r-project.org/web/packages/magick/magick.pdf',
  page = 1, dpi = 72, numeric = FALSE)
image_read(bitmap)
```

![plot of chunk unnamed-chunk-21](../assets/tutorial-images/magick/file3c921789566c.png)


#### Animation

Instead of treating vector elements as layers, we can also make them frames in an animation!


```r
image_animate(image_scale(img, "200x200"), fps = 1, dispose = "previous")
```

![plot of chunk unnamed-chunk-22](../assets/tutorial-images/magick/file3c92473f62ec.gif)

Morphing creates a sequence of `n` images that gradually morph one image into another. It makes animations


```r
newlogo <- image_scale(image_read(system.file("Rlogo.png", package = "magick")), "x150")
oldlogo <- image_scale(image_read(system.file("Rlogo-old.png", package = "magick")), "x150")
frames <- image_morph(c(oldlogo, newlogo), frames = 12)
image_animate(frames)
```

![plot of chunk unnamed-chunk-23](../assets/tutorial-images/magick/file3c9269bcc351.gif)


If you read in an existing GIF or Video file, each frame becomes a layer:


```r
# Foreground image
banana <- image_read(system.file("banana.gif", package = "magick"))
banana <- image_scale(banana, "150")
image_info(banana)
```

```
#>   format width height colorspace filesize
#> 1    GIF   150    148       sRGB        0
#> 2    GIF   150    148       sRGB        0
#> 3    GIF   150    148       sRGB        0
#> 4    GIF   150    148       sRGB        0
#> 5    GIF   150    148       sRGB        0
#> 6    GIF   150    148       sRGB        0
#> 7    GIF   150    148       sRGB        0
#> 8    GIF   150    148       sRGB        0
```

Manipulate the individual frames and put them back into an animation:


```r
# Background image
background <- image_background(image_scale(logo, "200"), "white", flatten = TRUE)

# Combine and flatten frames
frames <- lapply(banana, function(frame) {
  image_composite(background, frame, offset = "+70+30")
})

# Turn frames into animation
animation <- image_animate(image_join(frames))
print(animation)
```

![plot of chunk unnamed-chunk-25](../assets/tutorial-images/magick/file3c92430848ce.gif)

```r
# Save as GIF
image_write(animation, "Rlogo-banana.gif")
```

```
#> [1] "Rlogo-banana.gif"
```


### Raster graphics

Magick images can also be converted to raster objects for use with R's graphics device. Thereby we can combine it with other graphics tools. However do note that R's graphics device is very slow and has a very different coordinate system which reduces the quality of the image.

#### Base R rasters

Base R has an `as.raster` format which converts the image to a vector of strings. The paper [Raster Images in R Graphics](https://journal.r-project.org/archive/2011-1/RJournal_2011-1_Murrell.pdf) by Paul Murrell gives a nice overview.


```r
plot(as.raster(frink))
```

![plot of chunk unnamed-chunk-26](../assets/tutorial-images/magick/unnamed-chunk-26-1.png)


```r
# Print over another graphic
plot(cars)
rasterImage(frink, 21, 0, 25, 80)
```

![plot of chunk unnamed-chunk-27](../assets/tutorial-images/magick/unnamed-chunk-27-1.png)

#### The `grid` package

The `grid` package makes it easier to overlay a raster on the graphics device without having to adjust for the x/y coordinates of the plot.


```r
library(ggplot2)
library(grid)
qplot(speed, dist, data = cars, geom = c("point", "smooth"))
grid.raster(frink)
```

![plot of chunk unnamed-chunk-28](../assets/tutorial-images/magick/unnamed-chunk-28-1.png)


<section id="citing">

## Citing

> Jeroen Ooms (2016). magick: Advanced Image-Processing in R. R package version 0.2.2.
  https://cran.rstudio.com/package=magick


<section id="license_bugs">

## License and bugs

* License: [MIT](http://opensource.org/licenses/MIT)
* Report bugs at [our GitHub repo for magick](https://github.com/ropensci/magick/issues?state=open)


[Back to top](#top)
