---
slug: "gifski-release"
title: "Gifski on CRAN: the fastest GIF encoder in the universe"
date: 2018-07-23
authors:
  - name: Jeroen Ooms
categories: technotes
cover: "https://gif.ski/demo.gif"
tags:
- R
- packages
- gif
- animation
---

The [gifski](https://cloud.r-project.org/web/packages/gifski/index.html) package which was demonstrated in May at [eRum 2018](https://2018.erum.io/) in Budapest is now on CRAN. Gifski is a simple but powerful package which can hopefully take away an important performance bottleneck for generating animated graphics in R.

## What is Gifski

Gifski is a multi-threaded high-quality GIF encoder written in Rust. It can create animated GIF images with thousands of colors per frame and do so much faster than other software. The [Gifski Website](https://gif.ski/) has more technical details and beautiful examples.

The R package wraps the Rust crate and can be installed in the usual way from CRAN. One of the major benefits of Rust is that it has no runtime, so the R package has no dependencies. 

```r
install.packages("gifski")
```

On Linux you need to install `cargo` to compile the rust code, but the package does not require any external libraries. Cargo automatically compiles and links all Rust code when building the R package. If you are on MacOS, try installing from source to see how it works:

```r
install.packages("gifski", type = "source")
```

## How to Use

The R interface is very simple: either generate a GIF from a set of images, or directly from the R graphics device. The `?gifski` manual page contains example of both. The `gifski()` function combines a set of PNG images into a single animated GIF file:

```r
# Convert png files to gif
png("frame%03d.png")
par(ask = FALSE)
for(i in 1:10)
  plot(rnorm(i * 10), main = i)
dev.off()
png_files <- sprintf("frame%03d.png", 1:10)
gif_file <- tempfile(fileext = ".gif")
gifski(png_files, gif_file)
utils::browseURL(gif_file)
```

Alternatively the `save_gif()` function captures plots R generated in an R expression and saves them as a animated gif, just like e.g. `animation::saveGIF()` but much faster:

```r
# Example borrowed from gganimate
library(gapminder)
library(ggplot2)
makeplot <- function(){
  datalist <- split(gapminder, gapminder$year)
  lapply(datalist, function(data){
    p <- ggplot(data, aes(gdpPercap, lifeExp, size = pop, color = continent)) +
      scale_size("population", limits = range(gapminder$pop)) + geom_point() + ylim(20, 90) +
      scale_x_log10(limits = range(gapminder$gdpPercap)) + ggtitle(data$year) + theme_classic()
    print(p)
  })
}

# High Definition images:
gif_file <- save_gif(makeplot(), width = 800, height = 450, res = 92)
utils::browseURL(gif_file)
```

![gapminder](https://i.imgur.com/Uwz4Fyi.gif)

Gifski shows a progress meter while generating the GIF. Running this example shows that the GIF encoding is no longer a serious overhead: time spent in encoding is only a small fraction of the total time to generate the plot. Hopefully this will make it easier to generate animations with hundreds or even thousands of frames using for example the [gganimate](https://github.com/thomasp85/gganimate) package.

## More about Rust in R

This is the first CRAN package that interfaces a Rust library. In this case the R package itself does not contain any Rust code because we can call Rust directly from C.

If you are interested in learning more about using Rust in R packages, have a look at my [slides](https://jeroen.github.io/erum2018/) from eRum 2018. Also see the [r-rust](https://github.com/r-rust/) organization on Github for more examples R packages, especially the [hellorust](https://github.com/r-rust/hellorust#readme) package.
