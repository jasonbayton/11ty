---
 title: "What's new (so far) for enterprise in Android 15"
 date: '2024-04-11'
 status: publish
 author: 'Jason Bayton'
 excerpt: "I've been sleuthing, check out some of the changes coming to Android 15 for enterprise."
 type: post
 tags:
     - Enterprise
---
It's that time of year again. Android 15 Developer Preview 2 has been out for a little bit, and combined with some of the changes I've seen committed to the developer documentation, there are a few tasty treats for organisations to come in the next dessert.

This is, as last year, a non-definitive and unconfirmed list of changes. Like the work profile changes in Android 14 things can change at any point and without warning. 

Here we go!

## A bump to minimum SDK version for installation of apps

As expected, the restriction on installing applications targeting very old versions of Android is getting a bump. In Android 15 it will no longer be possible to install apps targeting API level 23 - Android Marshmallow / 6.0 - or older. Only apps that target Android 7.0 or later will be permitted. Just as last year, we're talking about applications targeting a version of Android 10+ years old. While some organisations with line-of-business apps that haven't seen an update in half a decade may balk at the idea of getting their applications updated or rewritten, the justification behind this limitation is solid - security. Where apps targeting <6.0 were able to abuse the old permissioning system (pre-runtime!), apps targeting 7.0 are still able to abuse device administrator and similar APIs. This isn't something you want potentially leveraged directly or indirectly on your managed estate.

## Disallow NFC radio

As it says on the tin. If you're thinking _"Don't we already have an API for NFC?"_ Yes we do, but that's to control the beaming of data between devices. This is a full on radio disable and will probably live under `DeviceRadioState` in AMAPI at some point later.

## Content protection policy

This appears to offer control for the scanning of harmful applications on a device, perhaps allowing admins to explicitly prevent line of business APKs from being flagged up on end user devices as potentially harmful, unrecognised, or any other state that'd trigger a complaint to the admin helpdesk. This has been a point of contention for the dedicated ecosystem for some years, particularly as Play Protect has become more active and aggressive over the last few Android versions. 

This is not something I'm personally going to be advocating for with customers for the most part unless it's actively causing issues, but it's _amazing_ to see Google catering to the dedicated space for a change after so much increased focus on features that promote privacy at the cost of control for dedicated estates.

## Disallow Thread Network

I'm assuming this is related to comms with [thread devices](https://en.wikipedia.org/wiki/Thread_(network_protocol)), no additional context has been provided, but you can assume what's coming.

## Disallow SIM Globally

This sounds like it's ticking off a long-desired feature request to fully disable all cellular on a device, but again missing any additional context I don't want to jump to conclusions.

## Vital apps mandate for document previewer

I touched on this in a [recent doc](https://bayton.org/android/what-are-vital-apps/). The absence of a document preview application for managed devices has been quite a noisy complaint from organisations for many years, overshadowed only by missing camera &/ gallery applications. None of these apps have been mandated by Google for the fully managed/work profile user experience, and so the common trend is to see them simply not added.

In fact, when I was [building devices for enterprise](https://bayton.org/blog/2023/08/product-files-the-doordash-tablet/#the-android-journey), I spent a decent amount of time learning the intricacies of vital apps and considering the use cases of customers to determine what was vital to productivity. I'd always opt to deploy Files By Google as the "Downloads" application, as this killed two birds with one stone - file preview support & a file (download) manager.

But not all OEMs consider this, or really think about enterprise at all, and so it's nice to see Google identifying the gap and plugging it accordingly.. even if it took several years to do so.

## A switch to feature flagging

This isn't super new information, as it Google have been feature flagging already with Android 14, but Google are touting Android 15 as their line in the sand for introducing their new approach to development, _Trunk Stable_. Mishaal Rahman, the prolific Android code-sleuthing extraordinaire, goes into more detail on Trunk Stable and `aconfig` (the feature flag system), as well as many more (lesser enterprise) Android features in this video from the latest AOSP & AAOS meetup: 

https://www.youtube.com/watch?v=dLz6aIRC0hg&t=179s

The change is an interesting one, it comes across as there being more code out in the open to review, and the ability to potentially build Android flavours with feature flags enabled for early access to features not yet committed to a release, but equally seems that it'll be far harder to put a finger on timelines of _when_ features will actually land in builds; could it be the next dessert release? A QPR update? Who knows.

Furthermore, this adds _way_ more flexibility for the Android team, and I presume far less pressure on managing the development cycle for when things need to be pushed/pulled accordingly. Hiding work-in-progress code behind feature flags is probably considered a breath of fresh air for them 😁

## Platform signed permission management

When a vendor works with an OEM to get their application _platform singed_, the application is granted all system-level permissions available on the device. As you can imagine, that is an _unprecedented_ level of device access to data and services reserved normally for only the OEM system apps, and Google's preloaded suite of applications. 

In Android 15, Google are introducing system permission management, allowing OEMs to grant or deny permissions to signed applications that allows for the considerable down-scoping of access of a signed app to only the explicit permissions they require to function. This won't apply to system apps bundled with a set of permissions in the OEM system image, but should permissions change in a later system app update, these permissions would also be denied automatically unless allowlisted in the respective system configuration.

There's an additional config to allow platform-signed shared UIDs for non-system applications that have additionally previously required access to this.

There are new alerts in logging to determine the permissions applications are no longer retaining access to, which vendors should already start looking at today to avoid loss of functionality.

Knowing how many enterprise vendors lean on platform signature permissions today (basically most EMMs, several SaaS products, etc), this has the potential to cause headaches once 15 launches.

## Partial screen recording

If you're like me and record your screen _far too often_ to demonstrate anything from a device feature to a bug, user guides and more, you'll be pleased to hear the previously Pixel-only feature introduced in Android 14 is coming to the wider ecosystem with the 15 update. Now users can limit screen sharing to _just the app_ they want to show, and no longer fret on the possibility to showing something that may not be appropriate for the context. Huzzah!

## Screen recording detection

Continuing the theme of recording, this is not so much an enterprise feature in and of itself explicitly, but Android 15 will alert apps when the screen is being recorded, allowing them to hide contents. I can imagine this might be useful for enterprise applications across the board to bolster DLP (data loss prevention)

## App archiving

Another expansion of existing functionality, Android 15 introduces system-settings control over app archiving, previously only opt-in managed by Google Play directly. 

https://www.youtube.com/watch?v=TENFSugd82g

Presumably this will succumb to the same restrictions as disabling or uninstalling apps we have in place today (that is, users won't be allowed to depending on policy set), but this is yet to be tested.

## More to come!

As 15 continues to develop, I'll update this list accordingly. Feel free to reach out with anything you find also!