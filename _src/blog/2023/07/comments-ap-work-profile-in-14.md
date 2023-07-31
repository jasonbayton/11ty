---
 title: "Comments on AP's article on work profile changes in Android 14"
 status: publish 
 author: 'Jason Bayton' 
 excerpt: "The work profile experience is changing in 14, predominantly for the better. The lack of public information has led to some assumptions which would benefit from a little clarity." 
 type: post 
 tags: 
     - Enterprise 
---
If you haven't read it, Android Police [published](https://www.androidpolice.com/android-14-pause-work-profile/) an article on the work profile changes coming in Android 14, in which I feature as a prominent source of information based on [my article](/blog/2023/04/android-enterprise-in-android-14/) and a brief chat I had with Mishaal ahead of publication.

The updated AP article as you read it is now as-corrected by Google based on some assumptions that were made due to the lack of public documentation of the changes. I too made assumptions around app activity and status in my article, but posed it as a question rather than a statement, which AP did not when referencing some points I openly pondered, like _you'll never show offline if apps are running_ (you may, apps are suspended), or _will apps be polling location in the background?_ (no, they're suspended).

With clarifications provided by Google to AP, and shared with me, I'm able to update [my own documentation](/android/android-14-work-profile-behaviour/) accordingly to provide an accurate expectation to organisations anticipating a rapid update to 14 when Google releases it, but this is hardly an ideal way of working; if anything it feels pretty rubbish to see something live that may not be accurate, and then have to clarify afterwards. I know publications do this _all the time_, but I don't like it.

## Where's the documentation?

It's a double-edged sword. Obviously the functionality is public in the beta releases and what you see from Mishaal's findings is done with a production device running public beta software. A reasonable amount of what he'd written and assumed himself is based on that, so Google is on the hook for putting out functionality and choosing not to talk about it publicly before the release goes official.

On the other hand it's reasonable not to want to push out version release marketing and documentation before release, not only to avoid losing the impact of release marketing one gets when doing it at the time of launch, but also due to the likelihood of changes during a beta

## Future compromise

Betas muddy the water for marketing, though I would (and do, for my products) lean towards making information available without fanfare during beta (asterisked or caveated as necessary as they do for partners), and kicking off the social media campaigns on release. Best of both that ensures Google gets to shape the external narrative with supportive and justified information and reasoning for when, not if, the wider public discover something unreleased, while still giving themselves room for an impactful marketing exercise on release day.

Betas are there for testing, and although they're mostly for the benefit of developers, organisations leverage them to validate major releases ahead of general availability also. It'd be great in future to find a balance between public beta features and private documentation. Hopefully that's something Google will iron out, and it'd certainly help me write more accurate articles for enterprise well in advance of when something could become a problem for organisations on release without feeling like I'm putting NDAs at risk by doing so.
