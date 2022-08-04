---
title: 'Android Enterprise Partner Summit 2018 highlights'
date: '2018-05-18T19:25:26+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 5948
tag:
    - android
    - 'android enterprise'
    - deprecation
    - Enterprise
    - 'Enterprise Mobility'
    - Live
    - oemconfig
    - summit
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/android-enterprise-partner-summit-2018-highlights/144'
tags:
    - Enterprise
---
The Android Enterprise Summit has been, for what I’d imagine anyone who’s followed anything I do online for a minute or two would agree for obvious reasons, one of my most eagerly anticipated events of the year. Although a lot of the content wasn’t necessarily new information for me, I did come away learning of a few new features heading to the Android ecosystem in the near future, as well as further details on previous announcements, particularly with the [upcoming release of P](/2018/03/android-p-demonstrates-googles-focus-on-the-enterprise/).

There are some *really* good things to come.

Those of you who were around during the summit might have caught wind of the [live-blog I was updating ](/2018/05/live-android-enterprise-partner-summit-2018/)over the course of the two days, and the following therefore won’t be new information for you, however here are the highlights of the event that I felt were rather significant, either due to the focus and attention provided by Google, or for benefits to the wider Android ecosystem these features bring. Please try to see past the terrible photos!

First however, stats
--------------------

### Android Enterprise activations

![](https://r2_worker.bayton.workers.dev/uploads/2018/05/IMG_20180508_094513.jpg)

Over the last 12 months, Android Enterprise activations have grown 10x when comparing devices under “modern” (that’s Android Enterprise, in case you wondered) management to this time last year.

10x as many devices sounds significant, and while I’m sure it is, we don’t know how much that really is as Google won’t release figures publicly (or under NDA, I did try my luck..).

What it does mean in any case is growth, and the continued growth of Android Enterprise-managed devices is both reassuring and exciting. Last I checked with Google, about 35% of Android devices shipped were under management, meaning there’s both scope to convert the existing 35% *and* reaching out to the other 65% of business-use devices, promoting the use of work profile, application management without Google accounts and more. There’s a big market out there.

### Zero-touch growth

![](https://r2_worker.bayton.workers.dev/uploads/2018/05/IMG_20180508_094003.jpg)

Although I missed the graphs David was showing around zero-touch growth the message came through. Despite resellers still being an active bottleneck for the program, zero-touch is getting bigger and more viable every day. At the time of the event we have 31 devices available through 9 OEMs, and resellers *are* coming aboard rapidly too.. they’re just not public yet. Due to the legal and contractual requirements from both sides, getting a reseller on board can take a little while.

The growth of zero-touch can also be directly attributed to the Android Enterprise Recommended program, referenced in the ZT slide below. Since AER makes it a requirement for OEMs to support zero-touch in order to take part in the program, it makes sense to see the rapid uptick from the 20-something devices available only a short while ago.

### Potentially harmful apps continue to decline

On the other end of the spectrum, the work done by the Google Play Protect and Android security teams appears to continue to pay off, as we see the number of PHAs in 2017 drop to their lowest number, ever. If you’ve read through the [Android Security Report 2017](https://source.android.com/security/reports/Google_Android_Security_2017_Report_Final.pdf) the following slide will look familiar:

![](https://r2_worker.bayton.workers.dev/uploads/2018/05/IMG_20180508_103557.jpg)

0.01% infection rate for Google Play application installations is pretty incredible. Not to mention the dramatic decline of PHAs installed outside of the Play Store also. When Android asks if it can verify applications installed from unknown sources, this is why users should be tapping **yes***.*

As a reminder, Play Protect scans **50 Billion** applications every day through the Play Store, crawling the web, 3rd party app stores and on each individual device. Using the intelligence it gathers scanning all day, every day, it has become quite a difficult opponent to work around.

### More security patches, more often

![](https://r2_worker.bayton.workers.dev/uploads/2018/05/IMG_20180508_104202.jpg)

Over the last year the number of devices receiving patches has increased by 30% to top 1 Billion in 2017. Once again bolstered by programs such as Android Enterprise Recommended and soon to be bettered once more with the introduction what looks to be [mandatory patching](https://www.xda-developers.com/google-require-oem-regular-security-patches/) written directly into OEM agreements:

> ##### “We’ve also worked on building security patching into our OEM agreements. Now this will really … lead to a massive increase in the number of devices and users receiving regular security patches.”
> 
> – David Kleidermacher, Google’s head of Android platform security

Even devices years-old and no longer receiving OS upgrades will remain secure.

### There’s more..

There are more stats available over on the [live blog](/2018/05/live-android-enterprise-partner-summit-2018/)! On to the highlights (in no particular order)..

Device Administrator deprecation
--------------------------------

![](https://r2_worker.bayton.workers.dev/uploads/2018/05/IMG_20180508_140053.jpg)

At this point I’m starting to [feel](https://blogs.vmware.com/euc/2018/05/android-device-administrator-deprecation.html) like [everyone](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/) has [talked](https://developers.google.com/android/work/device-admin-deprecation), at [length](https://www.blog.google/products/android-enterprise/why-its-time-enterprises-adopt-androids-modern-device-management-apis/), about Device Administrator deprecation since its original announcement back in December, however judging by the chatter around the event it was, is and will continue to be news to both customers and partners alike for some time.

> Device administrator mode to be deprecated. Slow phase out, but preparation for migration can start now.[\#AndroidEnterprise](https://twitter.com/hashtag/AndroidEnterprise?src=hash&ref_src=twsrc%5Etfw) [\#planning](https://twitter.com/hashtag/planning?src=hash&ref_src=twsrc%5Etfw)
> 
> — Colm Warner (@colmwarner) [May 8, 2018](https://twitter.com/colmwarner/status/993840597961199617?ref_src=twsrc%5Etfw)

I’ve previously prepared to documents that cover both the [deprecation of DA](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/) and [preparation for a migration](/android/considerations-in-migrating-from-device-administrator-to-android-enterprise/) to Android Enterprise, so I won’t go into this too much\*, but it is without doubt the most fundamentally important change for Android in the enterprise to be announced in many years; Android management is permanently changing for the better by leaving behind a rigid and broken security model that does little to deter malware and misuse for a more secure, more flexible, quicker and easier to implement, and more robust in its management capabilities – Android Enterprise is, as I’ve said many times even prior to the announcement, the future of Android management and is where organisations need to be if managing Android devices.

But it is going to be disruptive.

The simplest transition would be from Device Administrator to work profile, however in doing this organisations will lose control over the wider device and only manage a dedicated work profile. It doesn’t require a factory reset however, nor does it even require a trip back to the office for employees as it can be adequately managed with a verbose communications plan.

It’s the DA to work-managed deployment scenarios, those including work-managed itself (COBO), managed work profile (COPE) or dedicated single use (COSU), equivalent to three very common deployment scenarios in organisations today, that will cause problems as these devices will need to be brought back to base in a lot of cases in order to be wiped and re-setup. If an organisation’s reseller supports zero-touch, it may be possible to retrospectively add previously purchased Android 8.0+ devices into the corporate ZT console so as to automate the factory reset and reprovisioning of devices on the organisations behalf, however it’s likely better to take a gentler approach in swapping the devices out or allowing users the opportunity to take backups of personal data first.

While true many devices today will not see a Q/2019 Android update and therefore won’t be impacted by the changes (for as long as EMMs [support legacy Android management](/2018/05/android-enterprise-first-airwatch-9-4-lands-with-a-new-name-and-focus/)), the likes of HMD Global have [already committed](https://www.androidcentral.com/hmd-promises-android-p-update-all-current-nokia-android-phones) to updating the 2017 lineup to P, meaning the 2018 lineup, with AndroidOne, may well see Q; as soon as those devices update in 2019 the EMM will no longer be able to managed them if DA is still in use. Organisations buying their devices therefore right now, today, should be in a good position to start transitioning immediately, with the next scheduled hardware refresh guaranteed not to support the legacy Device Administrator APIs.

\*300+ words later.

Zero-touch EMM integration
--------------------------

![](https://r2_worker.bayton.workers.dev/uploads/2018/05/IMG_20180508_134140.jpg)

I was pleased to hear of the work Google are doing to better integrate zero-touch with existing solutions. Those familiar with iOS management will know EMMs have been managing DEP devices and pushing DEP profiles from within the EMM for quite some time.

In future and once integrated into the EMM, there will be little need for admins to log onto the zero-touch console, which aligns with Google’s goal of minimising the number of consoles required for administrators.

Zero-touch integration is a highlight for me as it makes the whole process simpler again. No one enjoys having to manage multiple independent consoles so this should hopefully help to further increase zero-touch use across the industry by making it easier to centrally manage.

OEMConfig
---------

![](https://r2_worker.bayton.workers.dev/uploads/2018/05/IMG_20180508_154205.jpg)

OEMConfig is very likely the most exciting announcement of the event for me as the implications are incredible. To understand why, here’s a little history:

For many years, as long as device APIs in Android have been in existence, in order to leverage them from the MDM/EMM platform of choice they would have to be supported by the EMM itself. Admins may remember looking at a toggle, dropdown or other such attribute within a profile and seeing an indication of which OEM supported it by the small tags alongside: SAFE V3, Sony, HTC, etc..

Originally Android Enterprise made this much easier, as all EMMs could align to one set of APIs and everything could be supported in one go. The problem is, Android Enterprise wasn’t designed to limit the capabilities of OEMs, allowing them to add their own APIs at will as has been seen recently with Zebra and Samsung. As Android Enterprise is becoming more popular and OEMs are migrating away from device administrator to the Android Enterprise API set, additional APIs will become ever more popular in order for OEMs to offer their own value-add and differentiate themselves from their competition. This means we start facing the same resource vs demand justification struggle EMMs have succumbed to for years and thus the potentially slow (or non-existent) adoption of APIs, or prioritisation of one OEM over another.

This is where things dramatically change for the better.. Google and Zebra have been developing a means for API support to be moved away from the responsibility of the EMM and over to the OEM by utilising OEMConfig.

OEMConfig is a small application installed on the device by the OEM and used for exposing APIs to the EMM administrator via managed app config, the configurations set through the Google Play API no different to how Gmail, Chrome, and other applications are configured today. The admin needs only to import the specific OEM (or device) OEMConfig application through normal means (as would be done with any public app) and will then be presented, after enabling installation for Android Enterprise, with a list of device-specific restrictions or features.

The beauty of this, and why I think it will fundamentally change the way we manage devices in the future, is because once it sits with OEMs, the app can be updated on the fly to incorporate changes as the OEM implements them rather than waiting for EMMs to take notice.

Devices can launch complete with an OEMConfig app and a wide range of new API functionality supported on day zero!

More info on OEMConfig will be coming soon.

DPC migration
-------------

![](https://r2_worker.bayton.workers.dev/uploads/2018/05/IMG_20180509_114132.jpg)

DPC migration isn’t new, having been announced some time ago, however the team expanded on the this quite significantly at the event; we now know in-depth how migration will work and what it could mean for both migration within an existing EMM (on-prem to cloud, native to AMAPI) and also between competing EMMs.

The scope for this functionality is pretty huge and offers what I’d likely consider to be the first true EMM migration tool offering zero end-user disruption for Android Enterprise devices. In terms of work-managed migrations, which will always get wiped when the old EMM releases management control of the device, this is huge. Zero-touch will go a long way towards making re-enrolment much easier, but it’s still a major hassle to wipe and start fresh. With DPC migration this will no longer be an issue as the device will remain under management at all times.

The main blocker to this functionality is the requirement for migration support within the existing DPC as this is where the process is initiated. Without that support the process cannot even begin.

However, where an EMM wants to facilitate migration between their own solutions or to the AMAPI, support will need to be implemented and can then be leveraged at will equally by other EMMs (at least, unless EMMs figure out a way of whitelisting the DPC that attempts to initiate the process).

It’s in the interest of EMMs to build support into their DPCs from my point of view, even where an internal migration isn’t a likely requirement; admittedly it facilitates the simple migration away from the EMM but on the flip side it’ll make it easier for organisations to equally migrate in. Focusing on the best experience for Android Enterprise should see more migrations in than out regardless.

Expanding Android Enterprise Recommended
----------------------------------------

When Google previously announced the AER program (covered [here](/2018/02/enterprise-ready-google-launch-android-enterprise-recommended/)), the intention was always to expand further afield than only phones. At the event Google offered further insight into what’s to come, including carriers, ISVs and expanding the program out to more devices, namely tablets and rugged:

![](https://r2_worker.bayton.workers.dev/uploads/2018/05/IMG_20180508_094904.jpg)

This expansion out to additional partner types is still very much under development so was more of a reiteration (in terms of what I can share at least), however on the device front we’re seeing some tangible progress.

I won’t go into detail on the rugged as there’s an announcement from Google incoming, but it’s certainly interesting to see tablets also being validated.

Based on previous talks with OEMs, my experience at [MWC](/2018/03/mwc-2018-android-one-oreo-go-android-enterprise-recommended-android-enterprise/), and a little process of elimination, it seems Huawei are likely going to be the first OEM to get AER certification for their MediaPad M5 series of tablets.

I’ve mentioned this over on [LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:6401763230607249408) also, since Huawei are

- Already AER certified
- One of a miniscule number of OEMs with a tablet offering today\* (such as the MediaPad M5 I’m writing this article on)
- Likely the only one to support zero-touch

…it would make sense they’d equally submit their tablets.

What the tablet requirements look like I’m not 100% sure, but unlike rugged devices which will have to really show some commitment to device support, I’d imagine the more generic business-use tablet case isn’t a million miles from phones.

\*Untill I convince HMD to develop a tablet!

Improvements to COSU
--------------------

This falls under the domain of Android P, but I’ve not updated my [original Android P article](/2018/03/android-p-demonstrates-googles-focus-on-the-enterprise/) to reflect the new announcements at the event just yet, so I’ll do so here:

![](https://r2_worker.bayton.workers.dev/uploads/2018/05/IMG_20180509_095935.jpg)

Google have been focusing really hard on the single use scenario for P, and while I’ve covered off things like ephemeral users in other posts, the new and improved native kiosk which includes both single app and multi-app support is a rather exciting feature.

I’ve been deploying both the AirWatch Launcher and the MobileIron Kiosk frequently for customers, however unlike other aspects of Android Enterprise, this means the UX is different depending on the EMM you use. Combined with the additional restrictions coming in P, the native experience looks like a viable alternative.. if EMMs choose to support it.

EMMs and other partners will now not need to worry about developing a kiosk solution for Android Enterprise (they didn’t anyway technically, but the native AE kiosk was nothing to write home about), but given the amount of R&amp;D gone into custom kiosk development, particularly for Workspace One UEM (AirWatch) that has only recently really come to market with a COSU offering (and [improvements to it in 9.4](/2018/05/android-enterprise-first-airwatch-9-4-lands-with-a-new-name-and-focus/)), we’ll have to see what happens.

Project treble
--------------

![](https://r2_worker.bayton.workers.dev/uploads/2018/05/IMG_20180508_104751.jpg)

Finally, I just wanted to take a moment to touch on Project Treble.

Again this is not new having launched with Android Oreo, but was thrust squarely into the spotlight at IO this year (which spilled over into the AE summit also) when the launch of the Android P beta came to multiple devices at once for the first time in the history of Android.

It’s a significant achievement showing just how groundbreaking the feature is, bringing updates to devices faster and easier than ever before, whilst improving the overall security of devices in the process by isolating low-level components (see image above).

I’m running P on my Nokia 7 Plus and never would have considered the thought of seeing it on anything but the Pixel before the announcement.

It’s pretty incredible.

To understand the effort involved with Treble vs without I’ve reached out to an OEM I work frequently with. I’ll add some comments here if I get the green light!

Conclusion
----------

As titled I’ve only covered what I considered highlights of the event. For a greater overview of the whole two days please check out the [live blog](/2018/05/live-android-enterprise-partner-summit-2018/) which will remain available indefinitely.

As I hope is pretty obvious, the Android Enterprise Partner Summit this year was significant; as much in terms of the early look at Android P as the progress the platform has made across the world in adoption rates, security, and general visibility within the industry.

And this is only the beginning.

*Did you attend the event? What were your highlights? If you were on the fence about Android before, how do you feel now? Let me know in the comments, [@jasonbayton](https://twitter.com/jasonbayton) on Twitter or on [LinkedIn](https://linkedin.com/in/jasonbayton)!*