---
title: magick vignette
package_version: 1.4
---



The new [magick](https://cran.r-project.org/package=magick) package is an ambitious effort to modernize and simplify high-quality image processing in R. It wraps the [ImageMagick STL](https://www.imagemagick.org/Magick++/STL.html) which is perhaps the most comprehensive open-source image processing library available today.

The ImageMagick library has an overwhelming amount of functionality. The current version of Magick exposes a decent chunk of it, but being a first release, documentation is still sparse. This post briefly introduces the most important concepts to get started.

### Installation

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
#>  $ version           :Class 'numeric_version'  hidden list of 1
#>   ..$ : int [1:4] 6 9 9 18
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
#>  $ zero-configuration: logi TRUE
```


### Image IO

What makes magick so magical is that it automatically converts and renders all common image formats. ImageMagick supports dozens of formats and automatically detects the type. Use `magick::magick_config()` to list the formats that your version of ImageMagick supports.

**Read and write**

Images can be read directly from a file path, URL, or raw vector with image data with `image_read`. The `image_info` function shows some meta data about the image, similar to the imagemagick `identify` command line utility.


```r
library(magick)
tiger <- image_read('http://jeroen.github.io/images/tiger.svg')
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

**Converting formats**

Magick keeps the image in memory in it's original format. Specify the `format` parameter `image_write` to convert to another format. You can also internally convert the image to another format earlier, before applying transformations. This can be useful if your original format is lossy.


```r
tiger_png <- image_convert(tiger, "png")
image_info(tiger_png)
```

```
#>   format width height colorspace filesize
#> 1    PNG   900    900       sRGB        0
```

Note that size is currently 0 because ImageMagick is lazy (in the good sense) and does not render until it has to.

**Preview**

IDE's with a built-in web browser (such as RStudio) automatically display magick images in the viewer. This results in a neat interactive image editing environment.

<img id="rstudioimg" alt="rstudio">
<script>
//this is a hack to prevent pandoc 'self_contained' from embedding this image
//in future version of pandoc we can use the image and set 'data-external=1' instead
window.onload = function(){
  document.getElementById("rstudioimg").src = "https://jeroen.github.io/images/magick-rstudio.png";
}
</script>

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

**Cut and edit**

Several of the transformation functions take an `geometry` parameter which requires a special syntax of the form `AxB+C+D` where each element is optional. Some examples:

  - `image_crop(image, "100x150+50")`: *crop out `width:100px` and `height:150px` starting `+50px` from the left*
  - `image_scale(image, "200")`: *resize proportionally to width: `200px`*
  - `image_scale(image, "x200")`: *resize proportionally to height: `200px`*
  - `image_fill(image, "blue", "+100+200")`: *flood fill with blue starting at the point at `x:100, y:200`*
  - `image_border(frink, "red", "20x10")`: *adds a border of 20px left+right and 10px top+bottom*

The full syntax is specified in the [Magick::Geometry](http://www.imagemagick.org/Magick++/Geometry.html) documentation.



































































