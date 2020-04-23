---
slug: webrockets
title: Launching webrockets at runconf17
author:
  - Alicia Schep
  - Miles McBain
date: '2017-07-05'
topicid: 928
tags:
  - community
  - R
  - software
  - unconf
  - unconf17
---

We, [Alicia Schep](https://github.com/AliciaSchep/) and [Miles
McBain](https://github.com/MilesMcBain), drove the `webrockets` project
at [\#runconf17](/blog/2017/06/02/unconf2017).
To make progress we solicited code, advice, and entertaining anecdotes
from a host of other attendees, whom we humbly thank for helping to make
our project possible.

This post is divided into two sections: First up we'll relate [our
experiences](#our-experiences), prompted by some questions we wrote for
one another. Second, we'll put the [`webrockets`
package](#cool-but-what-is-a-websocket) into context and walk you
through a fun example where you can live plot streaming sensor data from
a mobile device.

Our Experiences
===============

Alicia Answers Miles' Questions
-------------------------------

### Q1: What motivated you to apply for \#runconf17 and then to work on `webrockets`?

I first learned about rOpenSci last summer, while doing an internship at
Genentech. [Jenny Bryan](/about/#team) came to
give a seminar and also participated in a "women in computing" group
discussion during her visit. During that discussion, she talked about
how she thought organizations like rOpenSci that are [welcoming and
inclusive](/blog/2017/06/23/community) are
great for helping diversify programming (and other) communities. It
sounded like a really cool organization, and I started exploring some of
the rOpenSci [packages](/packages/) and reading the
[blog](/blog/) but wasn't sure of how to take that
next step and become more actively involved. When I saw the blog post
about the unconf, it seemed like a great opportunity to take that next
step so I went ahead and applied, although I didn't think I had much
chance of being selected — it was a very welcome surprise!

When I got to the unconf, I didn't know what I wanted to work on, as a
lot of the projects sounded interesting. I had proposed a project, but
it seemed like someone else was keen to work on a similar idea after the
unconf, so I ended up circling the room trying to figure out what other
project I might want to work on. I chose the `webrockets` project for
two main reasons: 1) the use cases that you proposed (making
visualizations that updated based on streaming data!) seemed really
neat, and 2) I wanted to push myself to learn something really new, and
I didn't know much about web sockets! This type of project was something
that I would be very hesitant about jumping into on my own, so the
unconf seemed like a great time for it. I figured you could teach me all
I needed to know about web sockets :D (and if those reading this
don't know what web sockets are, don't worry... later in this post we'll
[explain it to you too](#cool-but-what-is-a-websocket)!)

### Q2: What were the most challenging parts of \#runconf17 for you?

I'm pretty shy and introverted, so I was nervous about being around so
many new people and the packed schedule. Luckily, everyone I met was
extremely friendly! I did still ended up being pretty exhausted by the
end of each day, but had a great time working with you on `webrockets`
and talking about a wide range of topics (R, food, dogs, politics,
life...) with various smaller groups. It was also really incredible to
be able to get help on our project from some of the most knowledgeable
people possible!

### Q3: What things from \#runconf17 will stay with you into the future?

I thing the big thing that will stay with me is knowing how kind and
helpful people in the R community are. I'm often nervous about asking
for help or contributing to a new project, but I feel much more
comfortable now about doing so in the future!

Miles Answers Alicia's Questions
--------------------------------

### Q1: What inspired you to work on the `webrockets` package?

It wasn't my first choice, that was actually [your suggestion for
roxygen-like tagging for makefile
generation](https://github.com/ropensci/unconf17/issues/77), which I
still think is an amazing idea. But I went into the unconf with handful
of issues earmarked and websockets was definitely one of them.

The main attraction to websockets for me is about connecting R to new
kinds of data sources. They could be Internet of Things devices or
sources that reside in Virtual Realities. Websockets provide the base
layer for the protocols you need to navigate to stream data from these
sources. Since I'm starting to encounter these types of sources in my
work, I had a feel for a basic unconf-sized use case to attack.

So as the project room was rapidly clearing on Thursday morning, I was
starting to get a bit disheartened that I might have to move to a
project I hadn't really registered an interest in. Then almost at the
last moment Alicia Schep rocks up, keen and backing her C++ skills,
convincing me we might be able to get something done. That as much as
anything inspired me to work on `webrockets`.

### Q2: How did working on this package during the unconference differ from your usual R development experience?

In basically all the ways. I usually work independently and I tend to
bang my head against something for a while before reaching for help. The
unconf encourages just the opposite approach and it works amazingly
well. We had web experts like [Bob Rudis](https://github.com/hrbrmstr)
and [Joe Cheng](https://github.com/jcheng5) sitting literally metres
away from us, and they were only too happy to point us in the right
directions to short cut a lot of time consuming trial and error.

Also, You and I were [pair
programming](https://en.wikipedia.org/wiki/Pair_programming) for a good
portion of the time, that's something I rarely do. I was surprised it
worked so well given we had only just met. I think you can't overstate
the effect of the tone set by the rOpenSci team in facilitating this. I
can't speak for You, but I didn't feel like the self-consciousness that
can sometimes occur when coding in front of strangers was a noticeable
presence. We were too focussed on getting something happening!

### Q3: What was the favorite thing you learned during the unconference? (Doesn't have to be `webrockets` related!)

Wow. That's hard. I mean there's the little known but dedicated scene
inhabited by the R Karaoke People group, the fact that there exists
someone who takes more unadulterated joy in streaming sensor data than
me (hey Bob!), the hypnotic power of sing song southern accents,
[Karthik](/about/#team)'s magic Dolittle-level
powers over dogs...

But my absolute favorite thing learned would be aspects of all these
inspiring people who were just previously names or static 2d avatars and
text on the interwebz. As a far-flung Aussie, it's easy to feel on the
outer of the R community. Post unconf I feel like the online community
is so much more alive, and that has to be a result of having had the
opportunity to commune with some of its brightest inhabitants.

Cool... But what *is* a websocket?
==================================

Websockets are communication end-points that occupy the same place in
the network stack as HTTP. To shoehorn the protocols needed by modern
web apps into the request-response model of HTTP has required a lot of
fancy footwork involving polling schemes. These schemes are expensive in
bandwidth due to HTTP header information that has to be included in the
most basic of messages. Websockets strip back and abstract away that
machinery, allowing for application level protocol development without
concern for HTTP headers or URL strings!

You can read a great explanation
[here](https://www.websocket.org/quantum.html).

Webrockets :rocket:
===================

We've discussed our personal motivations, but the [project
issue](https://github.com/ropensci/unconf17/issues/43) was actually
proposed by Bob Rudis. He has been using websockets to control headless
Chrome browsers in the context of automated testing. Check out his repo:
[`decapitated`](https://github.com/hrbrmstr/decapitated).

Bob had already hunted down a lightweight C++ websocket library that
compiled on Windows, and he was kind enough to share that with us. So
using the wrapper he created for
[easywsclient](https://github.com/dhbaird/easywsclient) as a template,
we set about creating a general API to target our unconf challenge.

That challenge was: Can we create a `shiny` app that makes live animated
plots of streaming data received over a websocket connection? To do this
successfully requires a client interface (inbound) for websockets that
is compatible with the reactive programming paradigm in `shiny`. It also
requires a well understood test source of streaming data to verify the
app is working properly.

A server interface (outbound) for websockets in R has been available for
some time through RStudio's
[`httpuv`](https://github.com/rstudio/httpuv) package. We were able to
use this to implement our [test data
source](https://github.com/ropenscilabs/webrockets/blob/master/tests/random_coordintate_server.R).

Streaming data as websocket client
----------------------------------

### Initializing the connection

We assume that as the client, it is our role to initiate a data
streaming session with the server. So we have a way to initialize a
connection:

    con <- ws_connect(url = "ws://localhost:5006/")

`con` is a handle to our websocket connection. It is passed to `read`
methods to get data.

### Getting messages

With `easywsclient` there is no concept of a buffer messages piling up
for us. A new received message overwrites the one received prior. If we
have not read it, it is lost. This creates some considerations for us as
consumers of websocket data:

-   How often will we check the websocket for new messages?
-   How will we deal with no messages?

Good answers to these questions depend on the characteristics of the
data stream as well as our application. We have to consider how fast and
how predictably data are arriving, and what data we really need (e.g.
latest vs all history). So some degrees of freedom are required, which
is why we created a few methods to read from websockets:

    msg <- ws_receive(ws_ptr = con, timeout = 10) # Check for a message waiting up to 10 milliseconds to receive.
    msg <- ws_receive_one(ws_ptr = con, frequency = 5) #Return 1 message, check every 5 milliseconds until it arrives.
    msg <- ws_receive_multiple(ws_ptr = con, eventlimit = 10) #Do not return until you have 10 messages.

### Getting messages in shiny

To continually receive messages, we could potentially put calls to
receive messages within a while loop. However, that wouldn't work in the
context of `shiny` since the app would spend all of its time inside the
`while` loop, ignoring other inputs/outputs. We got a very entertaining
introduction to the [`future`
package](https://github.com/HenrikBengtsson/future) and how it might
help us get messages asynchronously from [Henrik
Bengtsson](https://github.com/HenrikBengtsson), but ultimately [Carl
Ganz](https://github.com/carlganz) and [Joe
Cheng](https://github.com/jcheng5) set us on the right path using some
of `shiny`'s lesser known classes and functions.

To receive websocket messages in a `shiny` application, we can place our
call to get the message and the handling of the response in an
`observeEvent` expression. The event we are observing here isn't a real
event; we use the `invalidateLater` function to specify that we actually
just want to run the code every X milliseconds.

    con <- ws_connect(url = "ws://localhost:5006/")
    ui <- fluidPage(
        plotOutput('plot')
    )
    server <- function(input, output) {
        values <- reactiveValues(x = NULL, y = NULL)

        observeEvent(invalidateLater(100), {

            new_response <- ws_receive(con, 0)
            if (new_response != ""){
                new_point <- fromJSON(new_response)
                values$x <- c(values$x, new_point$x)
                values$y <- c(values$y, new_point$y)
            }
        }, ignoreNULL = FALSE)

        output$plot <- renderPlot({
            ggplot(data.frame(xval = values$x, yval = values$y),
                   aes(x = xval, y=yval)) + geom_point()
        })
    }
    shinyApp(ui = ui, server = server)

Here's what the app looks like as new points are received from the
server:

![test
example](/assets/blog-images/2017-07-05_launching_webrockets/wr_coord_example.gif)

Streaming sensor data
---------------------

We were pretty happy to get the proof of concept `shiny` app that
updates based on a test server up and running — lots of high fives and
cheering when we saw the first few points getting added to the
plot! We then set our sights higher — could we plot some real sensor
data? Miles set up an app on his phone that would start a websockets
server that would send out messages containing accelerometer data from
the phone. We modified our `shiny` app to read in and plot that real
(live!) data.

We used an app
from the Android app store to stream our sensor data. *Hot tip*: be sure
to be running your `shiny` plotting app on the same wifi network as your
phone. To begin sensor data transmission, hit "start" in the sensor data
app interface and make a note of the websocket port and phone ip
address.

The call to establish the connection is:
`con <- ws_connect(url = "ws://<PHONE_IP_ADDRESS>:<APP_WEBSOCKET_PORT>")`.

The [code for our accelerometer shiny
app](https://github.com/ropenscilabs/webrockets/blob/master/tests/shiny_test_phone.R)
required only small modifications from above.

We made styling change in `ui` to hide the "greying-out" effect of the
plot while it was re-rendered with each new datapoint. It makes the plot
seem more fluid:

        tags$style(type="text/css",
                   ".recalculating {opacity: 1.0;}"),

In `server` introduced a call to `gather` so we could create a time
series plot facetted by accelerometer axis (x,y,z). It would be better
not to do this at each timestep. Individual plots could alleviate this.
The plot changes to:

    output$plot <- renderPlot({
            data.frame(xval = values$x, yval = values$y,
                       zval = values$z, time = values$time) %>%
                gather("variable", "value", -time) %>%
            ggplot(aes(x = time, y=value)) + geom_path() + facet_grid(~variable)
        })

Voila! Now you can create a demo like this:

{{< figure src="/assets/blog-images/2017-07-05_launching_webrockets/phonerocket.gif" width="600" alt="accelerometer gif" >}}

The plot updates with the acceleration of the phones in the x, y, an z
directions in real time as Miles moves the phone around!

In [this
video](https://twitter.com/MilesMcBain/status/868303874041327616) you
can hear [Nick Tierney](https://github.com/njtierney) losing his mind as
he watches the plot update in real time, but your mileage may vary with,
you know... non-R people.

Future Work
-----------

The project is about to get some real world use in an upcoming project
so expect a bunch of issues and design considerations to shake out of
that. Constructive feedback on our effort and/or contributions are very
welcome! Feel free to engage us on Twitter
([@aliciaschep](https://twitter.com/AliciaSchep),
[@milesmcbain](https://twitter.com/MilesMcBain)), rOpenSci slack
(check out the `#webrockets` channel), or the issues on the
[`webrockets` Github repo](https://github.com/ropenscilabs/webrockets).
