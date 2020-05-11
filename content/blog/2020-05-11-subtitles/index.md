---
slug: "subtitles"
title: Community captioning of rOpenSci community calls
author:
  - Matthias Grenié
  - Hugo Gruson
# Set the date below to the publication date of your post
date: 2020-05-11
# Minimal tags for a post about a community-contributed package 
# that has passed software peer review are listed below
# Consult the Technical Guidelines for information on choosing other tags
tags:
  - accessibility
  - community
  - community-call
# The summary below will be used by e.g. Twitter cards
description: "A very short summary of your post (~ 100 characters)"
# If you have no preferred image for Twitter cards, 
# delete the twitterImg line below
# Note there is no '/' symbol before 'img' here
# if needed replace blog with technotes
# twitterImg: blog/2019/06/04/post-template/name-of-image.png
---


Webinars and community calls are a great way to gather many people to discuss a specific topic, without the logistic hurdles of in-person events. But it has its own set of challenges. In particular, it tends to be more difficult for deaf and hard of hearing people or non-native speakers to follow the conversation, because of low quality video hindering lip reading or low quality sound.

When the calls are recorded, as it is the case for rOpenSci community calls, it is possible to rewind and replay, which may help but it is not always sufficient. A better solution, as suggested on the GitHub issue tracker for community calls, would be to provide subtitles.

One of us already had a little experience captioning short videos on youtube so we volunteered to try and add subtitles to the next community call. Because we think it's important to work as much as possible with free and open source tools, our choice landed on amara.org, which is a platform for community captioning used by other prolific video producers, such as TED talks.

### Some things were easier than expected but some were harder

#### The good thing about modern technology

If you've never try captioning a video, you may think that the hardest parts writing the transcript and syncing the video and audio. Fortunately, we have pretty good tools for this nowadays. Of course, technical and field specific terms were often wrong (the most common issue being 'R' transcripted as 'our'). It seems like YouTube gets even more creative: 

{{< tweet 1259507352774021121 >}}

#### Unexpected tasks

But even after this, there is still a huge amount of work left. You have to balance subtitles, making sure each line is short enough to display even on short screens and that each frame doesn't have more than two lines.

Additionally, and as we detail later in this blog post, it can be pleasant to remove excessive orality markers, such as 'uhm', 'like', 'so' or stutters.

But these tasks proved so much more difficult than anticipated in this particular cases. Indeed, this was probably not the best video to start this enterprise. As opposed to usual rOpenSci community calls, this did not follow a webinar format. It was a roundtable involving X participants in a lively discussion that lasted XX minutes. Even though there was a lot of preparation from the panel, as highlighted by Stefanie Butland at the end of the video, this remained a non-scripted discussion. This clashed strongly with the little experience we may have had beforehand since it was only on very short, 100% scripted youtube documentaries, such as Kurzgesagt.

### A diverse community of speakers and captioners

#### Different speakers

This was a very interesting exercise because it forces you to focus very hard on what people say. And very quickly, you notice that different people have different styles. Of course, you also notice the verbal tic of everybody. Even though it might be good to know in order to correct it, we don't necessarily recommend you do it on your own videos where you're speaking because it can be unnnerving, especially if you're already a generally self-conscious person.

Another interesting difference between speakers that was made obvious due to the informal nature of the community call is that different people don't pause at the different moments. In this kind of discussion, you have to take some time to think, and some people pause to think mid-sentence while other pause inbetween sentences. This was probably made worse but the online nature of the discussion since silence in video discussion can be very awkward for the speakers and the listeners, as explained in the amazing RStudio webinar by XXX. Speakers may tend to 'fix' these silences by adding more orality markers or rushing to start a new sentence.

#### Different captioners

Unexpectedly, this difference between speakers uncovered a difference between the way we chose to break the captions. Matthias chose to break the captions based on the auditory context: add breaks where the speaker makes a pause, which sometimes resulted in caption breaks mid-sentence as explained above. On the opposite, Hugo chose to break the captions based on the grammatical context: add breaks where the pause *should* be, which sometimes resulted in mismatches with the audio when speakers made pauses to think.

It was also a good reminder that even though we speak English fluently, we still sometimes don't understand everything and we don't even notice it. We attended this commcall live and manage to follow everything with ease but when looking at it one word at a time, we realised we missed some words here and there.

#### The difficulty of collaborative captioning

We're used to working together and have already collaborated on multiple projects. We even wrote a post on this very blog about a package we submitted to rOpenSci software review.

But this didn't help to find an efficient collaborative workflow for captioning. As mentioned earlier, one issue is that we had different captioning styles, and only realised it late in the project. 

Other communities, such as TED videos captioning community, disable entirely
collaborative captioning. When someone starts working on a video, it disappears
from the list of available tasks and they work on it alone.

### About amara

#### Nice features

Amara.org has a set of useful features that increase a bit your efficiency. The most notable ones in our opinion are:

- keyboard shortcuts such as 'Tab' to play/pause the video, 'Shift+Tab' to go back in the video, 'Ctrl' to create a new subtitle, and 'Shift+Ctrl' to add a line break in a subtitle.
- automatic deletion of leading whitespaces

#### Missing features

But there are other features we could not find (they might exist but we missed them?):

- an option to quickly merge subtitles. Very often, the subtitles are not split at the right place and you want to merge them to cut at the right time. A keyboard shortcut would be super useful here. It's even more annoying because when you try to select one subtitle to copy/paste it, amara removes your selection.
- by default, subtitles start/stop exactly at the same time as the audio. Maybe it's not the recommended practice but we found it more comfortable to add some buffer (even a split second) to give smoother flow, and leave a bit more time for the reader.

#### Proposed optimised workflow

Given the amount of time required to achieve a perfect result (or even a "good enough" result as in this case), we are not sure it worth continuing this enterprise, at least as long as we don't find better tools / methods.

Nonetheless, in case someone would like to try it next, we propose an optimised workflow, that may help reducing the time you spend:

1. Correct the transcript for typos and mistakes. In particular, pay attention to technical and field-specific terms
1. Make sure the breaks happen at the right place. If you opt for breaks based on the grammatical context, you don't need to have access for the video for this.

    These two steps can be done in your favorite text editor, thereby unlocking
    a much more efficient workflow. For example, if you use Vim (or RStudio with
    vim keybindings), then the 'merge line' operation that was difficult in 
    amara is just a simple keystroke (J). You can also add a visual hint to make 
    sure you respect the character width limit (follow [these steps]() for 
    RStudio  for example).
    
1. Sync the subtitles with the audio. Because the breaks are already placed at
the right time, this should be quick using amara and its keybord shortcuts, and drag and drop feature.

