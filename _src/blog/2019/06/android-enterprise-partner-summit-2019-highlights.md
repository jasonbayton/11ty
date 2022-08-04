---
title: 'Android Enterprise Partner Summit 2019 highlights'
date: '2019-06-09T13:30:03+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 8484
tag:
    - android
    - 'android enterprise'
    - EMM
    - summit
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/android-enterprise-partner-summit-2019-highlights/303'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
Much like [2018](/2018/05/android-enterprise-summit-2018-highlights/), I’d been waiting for the Summit to come around all year. It’s by far my favourite event not only for the content, but the ability to sit down with Googlers, with partners and everyone else in the Android Ecosystem to have proper, in-depth conversations about Android in (and out of) the enterprise.

One of the overall highlights is meeting folks who’ve followed my content over the years. From Europe to the US, JAPAC and more, there’s no event where I shake more hands and get to talk with more people who’ve leveraged my content to bring their own projects to fruition. It’s truly humbling and incredibly motivational!

To preface the following, it’s taken a good while for me to put something together primarily because I’d been waiting on the slides and content promised for release the week following the summit to arrive. They still haven’t, nor have I been able to get hold of anything outside of official channels. Because I’d missed a few sessions given the split of GTM and Technical, the highlights I post are based primarily on what I saw.

Google also worked hard to make clear what was NDA this year, including, for whatever reason, the Android Enterprise stats I shared last year. As such, some of the stuff that I’d normally refer to in order to show how incredibly well Android Enterprise is doing in the industry I cannot. Go figure.

With that out of the way, lets get into it!

It wasn’t all new
-----------------

As expected sitting on the bleeding edge of Android Enterprise, there was a fair bit of content I’d already seen or written about over the year. That isn’t to suggest the content wasn’t new to many others (my [LinkedIn](https://linkedin.com/in/jasonbayton) feed was blowing up!), but topics around [zero-touch](/android/what-is-android-zero-touch-enrolment/), the [Play](/android/create-and-manage-private-apps-for-android-enterprise/) [iFrame](/android/create-and-manage-web-apps-for-android-enterprise/), [DA migration](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/), Samsung’s [OEMConfig](/2019/03/february-was-an-interesting-month-for-oemconfig/) and so on were all very much covered through the year.

In fact, if you’re not familiar with my documentation, please take an opportunity to head on over to [/android](/android) for a gander, you’ll arguably get far more information out of those docs than this recap of the summit!

But plenty was
--------------

Android Enterprise continues to grow at an incredibly rapid pace. Despite not being able to share the newest slide that offers little more than the upwards indicator (I refer back to last year’s “10x growth” of something) to back up my statement, Android as a platform has increasingly dominated the enterprise market over the last year and the uptick in AE adoption is an obvious side effect; one of those reasons I can state is the rugged market which Microsoft still has a stake in, as demonstrated by the slide:

![](https://r2_worker.bayton.workers.dev/uploads/2019/06/Screenshot-2019-06-14-at-12.29.20-copy.jpg)

As 2020 approaches and more organisations finally, with full justification, give up on Windows 10 Mobile, Windows Phone, Windows CE and other versions of Microsoft’s Mobile OS, Android is the clear choice. Why?

- Form factor
- Budget
- Flexibility

Android fills the void left by Microsoft very well, and subsequently improves it in almost every way.

### Stats

**Android patching:** In Q4 2018, 84% more devices were patched compared to the same time a year prior. 2017 already being a pretty good year for patches with a 30% increase on 2016, it’s extremely telling just how much energy has been directed towards this space. Through programmes like AER, Android One and a generally wider acknowledgement of how important patching is both in the enterprise *and* consumer space, the stats now speak for themselves.

**Play Protect:** Now protecting 2.5 billion devices, Play Protect continues to analyse 500K and verify 50 billion applications every day.

![](https://r2_worker.bayton.workers.dev/uploads/2019/06/Screenshot-2019-06-14-at-12.30.33-copy.jpg)

Admittedly the rate of infection has **increased** over 2017, however the figures are still impressively low. This is and always will be a moving target, so depending on when the stats are collected this can be higher or lower, the [Android Ecosystem Security Transparency Report](https://transparencyreport.google.com/android-security/overview?hl=en) goes into a lot more detail on these stats.

**Zero-touch growth:** In the last year the number of zero-touch resellers has grown to 116, with many more still to come in 2019. The big news in the reseller space was the introduction of the common library with Samsung [back at MWC](/2019/03/mwc-2019-mid-range-devices-excel-5g-everything-form-factors-galore-and-android-enterprise/). The number of devices that support zero-touch now dwarfs the 30-odd last year also.

**Growth in awareness of Android Enterprise Recommended**: Google leveraged a report undertaken by HMD Global (Nokia) in 2018 available in full [here](http://www.hmdglobal.com/download/HMD%20Global%20B2B%20Smartphone%20Purchase%20Survey.pdf) to demonstrate how well AER is doing just a year after launch:

![](https://r2_worker.bayton.workers.dev/uploads/2019/06/Screenshot-2019-06-14-at-12.31.10-copy.jpg)

With 18 OEMs and 75+ devices, the AER devices programme has grown too! AER also launched for [EMMs](/2019/01/aer-expands-android-enterprise-recommended-for-emms/) and [MSPs](/2019/03/joining-the-android-enterprise-experts-community/), with the Android Enterprise Experts validation program boasting 133 validated experts in the first run:

![](https://r2_worker.bayton.workers.dev/uploads/2019/06/Screenshot-2019-06-14-at-12.31.31-copy.jpg)

### The Android Management API

AMAPI was an enormous focus of the event, taking up a good bit of my time across the two days. In a nutshell:

**AMAPI is now out of beta:** With its rapid pace of development and the fact there’s little front-end marketing of AMAPI within EMM solutions, it would have been easy to assume AMAPI left beta a while ago, but no! AMAPI came out of beta during the summit.

**COPE support is coming soon:** A huge deal not only for AMAPI itself (finally, only 2 years after Oreo) but all of the EMMs today waiting on said support. Intune is definitely the biggest name to embrace AMAPI today and the MS team there must have been as pleased as me to get confirmation.

**It’s going native:** AMAPI is ditching the dedicated app icon on the launcher for an integrated feeling within device settings. Combined with becoming a part of GMS-optional (a list of optional applications OEMs can bundle on a device alongside Core GMS apps), AMAPI is going to feel almost as native as Windows and iOS.

![](https://r2_worker.bayton.workers.dev/uploads/2019/06/Screenshot-2019-06-14-at-12.37.46.jpg)
![](https://r2_worker.bayton.workers.dev/uploads/2019/06/Screenshot-2019-06-14-at-12.38.09.jpg)

Being Android it’s still app-driven, and will continue to receive updates through Google Play, but irrespective of this, when users look to understand the policies enforced on the device, as well as the privacy impact of said policies, it’ll all be available by navigating to Settings on the device.

**Wider SSO capabilities:** To further assist vendors in developing as little as possible when integrating AMAPI, it has been expanded to support authentication through multiple IDPs.

![](https://r2_worker.bayton.workers.dev/uploads/2019/06/Screenshot-2019-06-14-at-12.38.37.jpg)

**Supporting differentiation:** I’ve had plenty of conversations about AMAPI and in implications of going all-in. “How do we stand out?”. AMAPI will support extensibility to promote EMM differentiation by allowing vendors to build out custom features. Some of the examples offered were custom compliance policies, geofencing, and more.

![](https://r2_worker.bayton.workers.dev/uploads/2019/06/Screenshot-2019-06-14-at-12.38.56.jpg)

Vendors will no longer be limited by Google on when (if ever) some functionality will be supported, with support for extensibility vendors can jump right in and build something themselves. It’s very much like the OEMConfig of AMAPI.

**Smart system app management:** Google see system app management as a chore. Something that’s difficult to manage, rarely consistent across OEMs and generally in need of improvement. They’ve introduced smart system apps to automatically “enable the right system apps for every device”.

![](https://r2_worker.bayton.workers.dev/uploads/2019/06/Screenshot-2019-06-14-at-12.39.18.jpg)

I like the idea in theory, but frankly system app management has rarely been an issue for me (in the wider context of deployments I’ve undertaken over the years), and I’d much rather have manual control than rely on some algorithm to determine what to enable on my behalf. I’d super appreciate if Google would just give me the fine-grained control I’ve had with Play EMM API for years. Please and thank you!

### Improvements to managed config

Managed config is one of the best features of Android Enterprise. That a developer can expose settings to be configured remotely that automatically appear within an EMM for admins to configure is pretty marvellous!

But it’s not perfect.

Managed config offers little in the way of feedback, has been occasionally unreliable on some devices in some situations, failing to update configs pushed out any more.

Google offered a nice few announcements on how this will improve.

**App feedback channel:** A limitation of managed config to date has been the one-sidedness of it all. An admin will add and distribute configuration, and then it probably applies. I say probably because unless you have the device in front of you it’s hard to say.

![](https://r2_worker.bayton.workers.dev/uploads/2019/06/image-3.png)

The app feedback channel offers a means for bidirectional communication. Admins can query the state at any point and get a response to confirm a managed config has executed, whether that’s an app or OEMConfig.

**Update broadcast:** Equally trying over the years has been the perception that managed configs just don’t update in a timely fashion. I’ve personally had situations where it can take hours for a change to reflect in Gmail for example. Update broadcast should help.

![](https://r2_worker.bayton.workers.dev/uploads/2019/06/Screenshot-2019-06-14-at-12.48.54.jpg)

Rather than waiting for a managed config to arrive eventually, update broadcast will directly ping applications to say *there’s a new managed config to apply* irrespective of app state in a much more direct and reliable fashion.

### Timeline update for DA Deprecation

As Device Administrator Deprecation with Android Q nears, Google were nice enough to offer a much clearer picture on the timeline of true DADEP:

![](https://r2_worker.bayton.workers.dev/uploads/2019/06/Screenshot-2019-06-14-at-12.51.01.jpg)

While technically Q deprecates DA features, the reality of it, as I’ve [outlined already](/2019/03/android-enterprise-in-q-features-and-clarity-on-da-deprecation/) is far from the immediate, breaking change the likes of Apple are going for with iOS 13 and deprecation of unsupervised restrictions!

As above, the main milestones for DADep are:

- AER EMMs targeting API level 29 (Q) with their DPCs by 2020
- Google Play enforcing the minimum API level in mid 2020 for new apps, and late 2020 for updates.

Based on the clear timeline above, I went ahead and changed [my own countdown](/android) to align with the AER EMM requirement of by 2020. It’s quite possible AER EMMs will target API 29 before this deadline, so I’d very much encourage orgs to reach out to vendors for a clear date in the diary to align with. Nobody should be sitting around waiting to see what deprecation will break though. Take a look at my [considerations doc](/android/considerations-when-migrating-from-device-administrator-to-android-enterprise/) and get planning!

### Android Enterprise Recommended 

Finally, we got a glimpse at what’s to come for AER across the board, including the long-anticipated AER for Carriers (and one the obvious requirements they’ll need to meet).

**AER for devices:** In Q, one of the most interesting requirements from my point of view is the new setup flow, as it’s flown mostly under the radar so far. I’d touched on it in my post [dabbling with Q enterprise](/2019/05/dabbling-with-android-enterprise-in-q-beta-3/) as both very good from a user education perspective, but equally the side effect of it slowing down provisioning. I’ll be testing it again with beta 4 in due course.

The requirement for the work tab is excellent. Too many devices today still don’t leverage it in Pie (some equally can’t manage to get a folder on the home screen either!) and given it’s improved usability it should absolutely be prioritised.

File-based encryption is great to see also. It’s popped up here and there over the last few releases but Google weren’t able to make it mandatory. Starting its enforcement through AER is a great stepping stone to mandate it in R (or later) globally.

![](https://r2_worker.bayton.workers.dev/uploads/2019/06/image-24.png)

**AER for EMMs:** Both mentioned ecosystem projects are exciting to see! First is support for OEMConfig, which though plenty of EMMs say they support, could definitely be improved.

The second is COPE, or COMP, or fully managed devices with work profiles, or work profiles on fully managed devices, or now personally enabled work devices..

Whatever it’s called, BlackBerry UEM adding support for COPE this week still brings the grand total number of vendors to support it to 3 across 4 EMMs. 2 years after Oreo’s release introducing this capability it’s incredible how few EMMs have integrated the solution set. I cannot wait for a mandate to come into force.

![](https://r2_worker.bayton.workers.dev/uploads/2019/06/image-26.png)

**AER for Carriers:** Long anticipated, AER for Carriers will require, amongst other things:

- Zero-touch enrolment
- Rapid approval for security maintenance releases

Disappointingly on the latter, limiting it only to SMRs means major platform upgrades will still likely be delayed by carriers I feel should have limited involvement with OS releases in the first place; it still makes sense therefore for organisations to opt for world wide SKUs where possible.

I look forward to seeing another uptick in zero-touch resellers coming on board as part of the AER validation process though!

![](https://r2_worker.bayton.workers.dev/uploads/2019/06/image-27.png

**AER for MSPs:** No big announcements here, as the requirements for 2020 won’t be out until July. However it does look like we’re on course to see the Experts program opening up to more people in the not too distant future! I look forward to [seeing more experts validated](/2019/03/joining-the-android-enterprise-experts-community/)!

### Android Enterprise Partner Program

Finally, as someone who’s been asking Google for partner status for years through the work I do on the site, the AEPP is a sight to behold! While I won’t hold my breath on getting partner recognition despite the organisations around the world I happily help on a daily basis, one can live in hope!

In any case, for partners who can’t get Recommended status for for one reason or another, the AEPP offers a means to still get listed in the directory and thus recognition through Google.

It will help build out the ecosystem of partners even further, which is only a good thing.

![](https://r2_worker.bayton.workers.dev/uploads/2019/06/image-28.png)

Final thoughts
--------------

Again most of my highlights here reflect what I personally saw at the summit. There were certainly other interesting announcements, one of which being the [demo generator](http://demos.ae.training) to aid in pitching Android Enterprise with pre-made content and topics to cover. It’s a great idea for partners needing a little inspiration or simply collateral.

In any case it was once more a fantastic event, that would only have been better if I was allowed again this year to liveblog!

I look forward to announcements finding their way into releases and getting hands on with a whole slew of new features. Until next time!

Photos
------

![](https://r2_worker.bayton.workers.dev/uploads/2019/06/IMG_20190521_093815.jpg)
![](https://r2_worker.bayton.workers.dev/uploads/2019/06/IMG_20190521_104245.jpg)
![](https://r2_worker.bayton.workers.dev/uploads/2019/06/IMG_20190521_162038.jpg)
![](https://r2_worker.bayton.workers.dev/uploads/2019/06/IMG_20190521_192700.jpg)
![](https://r2_worker.bayton.workers.dev/uploads/2019/06/IMG_20190522_083133.jpg)
![](https://r2_worker.bayton.workers.dev/uploads/2019/06/IMG_20190522_100355.jpg)
![](https://r2_worker.bayton.workers.dev/uploads/2019/06/IMG_20190522_110423.jpg)
![](https://r2_worker.bayton.workers.dev/uploads/2019/06/IMG_20190522_121349.jpg)
![](https://r2_worker.bayton.workers.dev/uploads/2019/06/WhatsApp-Image-2019-05-21-at-16.40.58.jpeg)