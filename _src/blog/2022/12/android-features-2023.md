---
title: "My 2023 Android Enterprise wishlist"
date: '2022-12-21'
status: publish
author: 'Jason Bayton'
excerpt: "Android's enterprise feature set was pretty light in 2022, which obviously means 2023 is going to be a good one. Here are some of the features I'd like to see across the AE ecosystem next year."
type: post
tags:
    - Enterprise
permalink: false
---

It's been a pretty quiet year for enterprise features in Android; not to suggest what [was released](https://developer.android.com/work/versions/android-13) wasn't welcomed (Wi-Fi features in particular were long-overdue!), but compared to years prior there were no big-hitters that really stood out. 

I'm hoping 2023 is going to see a return to form for the AE team, and although the Android 14 roadmap is pretty solidly laid out already, there's no harm in adding a few ideas into the mix for the wider services that run atop our favourite mobile OS (Play, AMAPI, etc)

## Granular app update management
Inspired by my mate [Matt](https://www.linkedin.com/in/matt-dermody), who on a regular basis points out the struggles with managing apps via Google Play over on the [Mobile Pros community](https://mobilepros.org), this is one I'm seeing lead to issues more frequently than ever as more orgs move to AE and a primarily-Play app management process.

Today's options for Google Play app update management include (for AMAPI, per app):
- Default
- Postponed
- High priority
- Min version code 

Arguably if organisations struggle to keep up with application updates and the risk of breaking changes, you might suggest simply setting the particular app update policy to Postpone and expect the org to assign someone to test within the up to 90 days they have before policy reverts to Default (wherein applications update normally on a low priority). 

But what about breaking changes?

Sometimes apps have to change, and do so in a way that isn't compatible with the device or needs of an organisation. No amount of testing will lead to a resolution there; either orgs work with the developer directly to create a bespoke version, or they transition to a new solution for what they're trying to achieve. Both can take more than 90 days from start to solution, leading to potentially significant issues for a managed estate in the interim.

And what about the apps not defined by policy? 

A recent [example](https://www.linkedin.com/posts/jasonbayton_there-are-reports-that-google-play-services-activity-6999107906851749891-aTSm?utm_source=share&utm_medium=member_android) was an update to Google Play Services (22.44.16), which caused devices to reboot into recovery. 

Another was Webview (108) causing considerable go-slows until patched shortly after (as reported [here](https://discussions.soti.net/thread/uninstall-update-with-a-script) and [here](https://forums.ivanti.com/s/article/Velocity-Slow-Key-input-webview-got-automatically-upgraded)).

As more applications - system and public - are pushed from Google Play, organisations need more granular options for not only managing the known apps, but those included as system apps either from Google or the OEM.

Should organisations be expected to undertake regular system app audits, and roll out policies per manufacturer to manage this? Probably not. 