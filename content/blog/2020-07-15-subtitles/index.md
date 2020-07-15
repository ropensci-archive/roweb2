---
slug: "subtitles"
title: Community Captioning of rOpenSci Community Calls
author:
  - Matthias Grenié
  - Hugo Gruson
# Set the date below to the publication date of your post
date: 2020-07-15
# Minimal tags for a post about a community-contributed package
# that has passed software peer review are listed below
# Consult the Technical Guidelines for information on choosing other tags
tags:
  - accessibility
  - community
  - community-call
  - video
# The summary below will be used by e.g. Twitter cards
description: "Our experiences creating captions for an rOpenSci Community Call"
# If you have no preferred image for Twitter cards,
# delete the twitterImg line below
# Note there is no '/' symbol before 'img' here
# if needed replace blog with technotes
# twitterImg: blog/2019/06/04/post-template/name-of-image.png
---


Webinars and community calls are a great way to gather many people to discuss a specific topic, without the logistic hurdles of in-person events. But whether online or in-person, to reach the broadest audience, all events should work towards greater accessibility. In particular, it is difficult for people who are deaf or hard of hearing to follow the conversation because of low quality video hindering lip reading, or for non-native speakers because of low quality sound.

When the calls are recorded, as it is the case for [rOpenSci Community Calls](/commcalls/), it is possible to rewind and replay, which may help but it is not always sufficient. A better solution, as suggested on the [GitHub issue tracker for community calls](https://github.com/ropensci-org/community-calls/issues/14), would be to provide subtitles. In this blog post we want to provide feedback on our experience subtitling one [community call on R package maintenance](/blog/2020/07/14/commcall-maintaining-pkg/). We present the tools we used, the lessons we learned, and lay out a possible workflow for future video captioning. We here refer to [closed captioning](https://en.wikipedia.org/wiki/Closed_captioning) instead of [subtitling](https://en.wikipedia.org/wiki/Subtitles). Both consist on adding text on a video, but they differ in their end goal. Subtitles only transcribe dialogues, while closed captioning also include the transcription of sound effect, musical cues, and other conversational cues such as the speakers' names.

{{< figure src = "screen-video-subtitle.png" alt = "Screenshot of the video with closed captions" caption = "The Community Call video with captions enabled on Vimeo" class = "center" >}}

One of us already had some experience captioning short videos on YouTube so we volunteered to try and add subtitles to the next community call. Because we think it's important to work as much as possible with free and open source tools, our choice landed on [Amara](https://amara.org). Amara is a popular platform for community captioning used by other prolific video producers, such as [TED talks](https://www.ted.com/).

### Some things were easier than expected but some were harder

#### The good thing about modern technology

If you've never tried captioning a video, you may think that the hardest parts are writing the transcript and syncing the video and audio. Fortunately, we have pretty good tools for this nowadays. To ease the subtitling process, we didn't start from a blank slate: thanks to the fact that all rOpenSci community calls are recorded, [Stefanie Butland](author/stefanie-butland) provided us with the raw transcript (in [VTT format](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)) automatically generated from the Zoom call recording.

{{< figure src = "webvtt-file.png" alt = "Content of a VTT file" caption = "Screenshot of a sample VTT file. It contains both text and corresponding timestamps" class = "center" >}}

That VTT file not only contains a transcript of all the audio, but also some timestamps to synchronize the transcript with the video. As expected, technical and field specific terms were often wrong (the most common issue being 'R' transcribed as 'our', and rOpenSci as 'Our open sigh'). This seems like an unavoidable issue that happens no matter the tools you use. For example, YouTube gets even more creative with R slang:

{{< tweet 1259507352774021121 >}}

#### Unexpected tasks

But even after downloading the raw transcript, there is still a huge amount of work left. You have to balance subtitles, making sure each line is short enough to display even on short screens and that each frame doesn't have more than two lines. Additionally, and as we detail later in this blog post, it can be pleasant to remove excessive [discourse markers](https://dictionary.cambridge.org/grammar/british-grammar/discourse-markers-so-right-okay), such as 'uhm', 'like', 'so' or stutters.

The Community Call was a roundtable involving 5 participants in a lively unscripted discussion that lasted 55 minutes. This was very different from our previous experiences, since until now we only dealt with very short, 100% scripted YouTube documentaries, such as the [Kurzgesagt channel](https://www.youtube.com/user/Kurzgesagt).

### A diverse community of speakers and captioners

#### Different speakers

Subtitling is a very interesting exercise because it forces you to focus very hard on what people say. And very quickly, you notice that different people have different speech styles. Of course, you also notice everybody's verbal tics. Even though it might be good to know in order to correct it, we don't necessarily recommend you try it on your own videos where you're speaking because it can be unnerving, especially if you're already self-conscious. One difficulty was to remove some orality markers in the subtitles while consistently respecting the styles of different speakers. We didn't want to go overboard and end up with a transcript that differed too much from the spontaneous discussion that actually took place.

Another interesting difference between speakers is that different people pause at different moments. In this kind of informal discussion, you have to take some time to think, and some people pause to think mid-sentence while other pause in between sentences. This was probably made worse by the online nature of the discussion since silence in video discussion can be very awkward for both the speaker and the listeners, as explained in the amazing [RStudio webinar by Greg Wilson about 'Teaching Online at Short Notice'](https://rstudio.com/resources/webinars/teaching-online-at-short-notice/). Speakers may tend to 'fix' these silences by adding more discourse markers or by rushing to start a new sentence.

#### Different captioners

Unexpectedly, this difference between speakers uncovered differences in the way we chose to break the captions. Matthias chose to break the captions based on the auditory context: add breaks where the speaker makes a pause, which sometimes resulted in caption breaks mid-sentence as explained above. Alternatively, Hugo chose to break the captions based on the grammatical context: add breaks where the pause *should* be, which sometimes resulted in mismatches with the audio when speakers made pauses to think.

It was also a good reminder that even though we speak English quite fluently, we sometimes don't understand everything but we usually don't even notice it. We attended this community call live and managed to follow everything with ease but when looking at it one word at a time, we realised we missed some words here and there, especially when several participants interacted quickly.

#### The difficulty of collaborative captioning

We're used to working together and have already collaborated on multiple projects. We even wrote [a post](/blog/2019/06/04/rromeo/) on this very blog about a package we submitted to rOpenSci software review.
But this didn't help us find an efficient collaborative workflow for captioning. As mentioned earlier, one issue is that we had different captioning styles, and only realised it late in the project.

Even if Amara's subtitle editor is an amazing tool that allows you to easily pause, rewind, and advance the video while captioning, it does not support simultaneous editing of the subtitles. Compared to taking collaborative notes through EtherPad, this slows down the process quite a lot. Amara however allow for several people to edit the captions successively. Other communities, such as TED videos captioning community, disable entirely collaborative captioning. When someone starts working on a video, it disappears from the list of available tasks and they work on it alone.

From our experience, being a team to caption a video cuts the work needed from each individual member. Simultaneous collaborative captioning would be helpful to edit different parts of the captions. It would allow  you to focus on different independent tasks when captioning: roughly place captions in time, correct for vocabulary/transcription issues, add speakers' names when necessary, etc. One important lesson for successful collaborative captioning would be to define before-hand the captioning style used throughout the captions, as well as to define a list of tasks that can be split among the different contributors.

### About Amara

#### Nice features

{{< figure src = "amara-interface.png" alt = "Screenshot showing the interface of Amara.org" caption = "The interface of Amara is divided in different sections each focusing on distinct aspects of captioning. The video is on the top. The middle part shows a timeline with the duration of each caption. The bottom part shows the text and the caption editor as well as a conservation window on the bottom right." class = "center" >}}

Amara.org has a set of useful features that increase your efficiency a bit. The most notable ones in our opinion are:

- keyboard shortcuts such as 'Tab' to play/pause the video, 'Shift+Tab' to go back in the video, 'Ctrl' to create a new subtitle, and 'Shift+Ctrl' to add a line break in a subtitle;

- automatic deletion of leading whitespaces;

- warnings regarding caption length, number of lines used, and caption reading speed (longer captions have to stay on screen for longer time so that viewers can read them!);

{{< figure src = "warning-caption.png" alt = "Warning window from Amara.org on captions" caption = "If a caption does not follow what are considered best practices in captioning, it gets flagged with an exclamation mark. Here the first line of the caption exceeds the recommendation of 42 characters per line." class = "center" >}}

- full versioning of the subtitles, we can still go back through all the subtitle versions we edited.

#### Missing features

There are other features we could not find (they might exist but we missed them?):

- an option to quickly merge subtitles. Very often, the subtitles are not split at the right place and you want to merge them to cut at the right time. A keyboard shortcut would be super useful here. It's even more annoying because when you try to select one subtitle to copy/paste it, Amara removes your selection.

- by default, subtitles start/stop exactly at the same time as the audio. Maybe it's not the recommended practice but we found it more comfortable to add some buffer (even a split second) to give smoother flow, and leave a bit more time for the reader.

#### Proposed optimised workflow

In the long term, it is always worth it to provide captions, as it increases the accessibility of the videos. However, in the short term, the amount of time required to caption even a single video puts too much burden on volunteers. Perhaps with more collaborative tools and an optimized workflow, it would be possible to caption video quicker. One idea to increase captioning of many videos would be to organize "Captioning Sprints" where volunteers gather (online or in person) and split the captioning work in small workable chunks.

Nonetheless, in case someone would like to try it next, we propose an optimised workflow, that may help reduce the time you spend:

1. Use the transcript provided by Zoom/YouTube.
1. Correct the initial raw transcript for typos and mistakes. In particular, pay attention to technical and field-specific terms (R, package names, URLs).
1. Make sure the breaks happen at the right place. If you opt for breaks based on the grammatical context, you don't need to have access for the video for this.

    These two steps can be done in your favorite text editor, thereby unlocking
    a much more efficient workflow. For example, if you use Vim (or RStudio with
    vim keybindings), then the 'merge line' operation that was difficult in
    Amara is just a simple keystroke (J). You can also add a visual hint to make
    sure you respect the character width limit (follow [these steps](https://community.rstudio.com/t/vertical-line-in-the-source-editor/24950/2) for
    RStudio for example).

1. Upload the corrected transcript on Amara.
1. Sync the subtitles with the audio. Because the breaks are already placed at
the right time, this should be quick using Amara and its keyboard shortcuts, and drag and drop feature.
1. Download the final transcript VTT file from Amara, upload it to the video on Vimeo, and enable Closed Captions to make them visible.


### A time-consuming but gratifying experience

Given the complexity of the task –almost our first subtitling experience, our first use of Amara, a community call with many different speakers– producing good enough subtitles took us quite some time. We (Stefanie, Matthias, and Hugo) spent a total of around 20 hours of work to edit the subtitles for this 1-hour community call. It may seem quite a lot but at the same time, it was our first time doing this, first time using these tools, on a complex video with many different speakers, several interruptions, and quite open-ended discussion. Now that we are more used to the process, with the tools, we should be able to work faster. And with a simpler video, such as a regular community call where speakers spend more time presenting their own work, without talking at the same time, it should take less time.

We learned a lot during the process, enjoyed the roundtable even more (in all its details), learning about subtitling best practices, asking questions about the best way to transcribe some oral expressions. It was a challenging but interesting exercise. Even though we may need a better workflow we think it is worth our collective time to provide subtitles to our videos for accessibility and also to broaden and diversify the R community audience. We could also think at a more global scale of accessibility issues and spark discussion through the [R Consortium Diversity & Inclusion Working Group](https://github.com/RConsortium/RCDI-WG/). And why not think about live-captioning for your future event to make it more accessible?


### Resources

When working on the subtitles we stumbled upon many useful resources ranging from quick tips and best practices to full guide describing the process of same-language subtitling for videos. They helped us ease our process and hope they will help you as well if you want to join the subtitling adventure:

* A blog post on Amara's blog with [7 tips for subtitling videos](https://blog.amara.org/2011/08/09/best-practices-for-subtitling-videos/),
* A very short summary of [standard closed captioning guidelines](https://www.capitalcaptions.com/services/closed-captioning-services/closed-captioning-guidelines/) by Capital Captions,
* The longer [Transcription Guidelines for Captioning](https://support.automaticsync.com/hc/en-us/articles/202355665-Transcription-Guidelines-for-Captioning) by CaptionSync, but they mostly referred to movie captioning,
* The exhaustive [BBC Subtitle Guidelines](https://bbc.github.io/subtitle-guidelines/) which describe the process and rules to best subtitle videos, it's freely available on GitHub.
