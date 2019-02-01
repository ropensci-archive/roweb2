---
slug: magick-knitr
title: Using Magick with RMarkdown and Shiny
date: '2017-11-07'
authors:
  - Jeroen Ooms
categories: technotes
cover: https://i.imgur.com/tTFk7ig.jpg
topicid: 947
tags:
  - R
  - packages
  - magick
  - images
---

This week [magick](https://cran.r-project.org/web/packages/magick/vignettes/intro.html) 1.5 appeared on CRAN. The latest update adds support for using images in knitr documents and shiny apps. In this post we show how this nicely ties together a reproducible image workflow in R, from source image or plot directly into your report or application.

```{r}
library(magick)
stopifnot(packageVersion('magick') >= 1.5)
```


Also the magick [intro vignette](https://cran.r-project.org/web/packages/magick/vignettes/intro.html) has been updated in this version to cover the latest features available in the package.

## Magick in Knitr / RMarkdown Documents

Magick 1.5 is now fully compatible with knitr. To embed magick images in your rmarkdown report, simply use standard code chunk syntax in your `Rmd` file. No special options or packages are required; the image automatically appears in your documents when printed!

```{r}
# Example from our post last week
image_read('logo:') %>%
  image_convolve('DoG:0,0,2') %>%
  image_negate() %>%
  image_resize("400x400")
```

![fig1](https://i.imgur.com/PhwCJ4k.gif)

You can also combine this with the magick graphics device to post process or animate your plots and figures directly in knitr. Again no special packages or system dependencies are required.

```{r}
# Produce graphic
fig <- image_graph(width = 800, height = 600, res = 96)
ggplot2::qplot(factor(cyl), data = mtcars, fill = factor(gear))
invisible(dev.off())

print(fig)
```

![fig2](https://i.imgur.com/zFLcHws.png)

```{r}

# Some post-processing
frink <- image_read("https://jeroen.github.io/images/frink.png")

fig %>%
  image_rotate(10) %>%
  image_implode(.6) %>%
  image_composite(frink, offset = "+140+70") %>%
  image_annotate("Very usefull stuff", size = 40, location = "+300+100", color = "navy", boxcolor = "pink")
```

![fig3](https://i.imgur.com/0E5cqaz.png)

Same works for animation with `image_animate()`; the figure shows automatically up in the report as a gif image:

```{r}
image_read("https://jeroen.github.io/images/banana.gif") %>%
  image_apply( function(banana){
    image_composite(fig, banana, offset = "+200+200")
  }) %>%
  image_resize("50%") %>%
  image_animate()
```

![fig4](https://i.imgur.com/mi67gjt.gif)


The magick vignette [source code](https://raw.githubusercontent.com/ropensci/magick/master/vignettes/intro.Rmd) is itself written in Rmarkdown, so it's great example to see this in action. Try rendering it in RStudio to see how easy it is!

## Magick in Shiny Apps

While we're at it, several people had asked how to use magick images in shiny apps. The easiest way is to write the image to a `tempfile()` within the `renderImage()` callback function. For example the server part could look like this:

```r
output$img <- renderImage({
    tmpfile <- image %>%
      image_resize(input$size) %>%
      image_implode(input$implode) %>%
      image_blur(input$blur, input$blur) %>%
      image_rotate(input$rotation) %>%
      image_write(tempfile(fileext='jpg'), format = 'jpg')

  # Return a list
  list(src = tmpfile, contentType = "image/jpeg")
})
```

Below is a simple shiny app that demonstrates this. Have a look at the [source code](https://github.com/jeroen/shinymagick/blob/master/app.R) or just run it in R:

```r
library(shiny)
library(magick)
runGitHub("jeroen/shinymagick")
```

[![tigrou](https://i.imgur.com/tTFk7ig.jpg)](https://jeroen.shinyapps.io/shinymagick)

Perhaps there's an even better way to make this work by wrapping magick images into an htmlwidget but I have not figured this out yet.
