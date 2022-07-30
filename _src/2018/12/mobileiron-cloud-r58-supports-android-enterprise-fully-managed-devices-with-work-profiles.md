---
title: 'MobileIron Cloud R58 supports Android Enterprise fully managed devices with work profiles'
date: '2018-12-22T01:03:33+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 7185
tag:
    - android
    - 'android enterprise'
    - cloud
    - cope
    - 'fully managed'
    - 'mi cloud'
    - mobileiron
    - 'mobileiron coud'
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/mobileiron-cloud-r58-supports-android-enterprise-fully-managed-devices-with-work-profiles/247'
tags:
    - Enterprise
    - Mobile
---
Following the introduction of Android Enterprise fully managed devices with work profiles (COPE) [9 months ago with Core](/2018/03/mobileiron-launch-android-enterprise-work-profiles-on-fully-managed-devices/), I was wondering how long it would take for the SaaS counterpart, MobileIron Cloud, to also implement it. With their December release of R58, now we know!

Historically both platforms have had their own schedules and priorities, with one getting new features sooner or later than the other, so a bit of a wait was expected, but considering I was anticipating next year for a good while, this was a nice surprise!

They didn’t quite get it out in time to claim first and second place in the race to gain COPE support, since [VMware released 1810](/2018/10/workspace-one-uem-1810-introduces-support-for-android-enterprise-fully-managed-devices-with-work-profiles/) a little ahead of MobileIron Cloud, but they still managed to get both supporting it before heading into 2019. Not bad.

How does it compare?
--------------------

After a bit of a [rocky rollout](https://community.mobileiron.com/docs/DOC-9234), quite literally the first thing I wanted to check was how it compared to Core.

Core’s implementation is fine, though areas I think it could improve on are:

- The layout of the various restrictions available
- The artificial limitation of restrictions in the parent profile
- Manual steps required for work profile creation during enrolment

The good news is Cloud resolves one of these, offering a much better UI that’s far clearer:

<figure class="wp-block-image">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2018/12/image.png)<figcaption>*The list of restrictions continues down the page*</figcaption></figure>What it doesn’t improve on however is allowing admins to determine how best to manage their fully managed parent profiles reserved for personal use. MobileIron are still limiting the restrictions available to COPE devices which are otherwise available for fully managed (COBO) deployments, something I noted VMware does not do.

Also, though improved, enrolling a COPE device still requires additional taps to initiate the creation of a work profile, something I feel (and which is fully supported by AE APIs) should be automated. I don’t understand the justification for this, as it feels less efficient and more likely to result in a call to IT for clarification. In the COPE enrolment demo below you’ll see what I mean:

<figure class="wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper"><iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" frameborder="0" height="281" loading="lazy" src="https://www.youtube.com/embed/S4i5Ih3-VKM?feature=oembed" width="500"></iframe></div></figure>In any case, COPE support is fantastic to see, and fills a rather large gap for MobileIron Cloud customers who’ve up to this point been stuck between opting for a work profile deployment that doesn’t permit device management, and a fully managed (work-managed) deployment that isn’t designed to support personal use. COPE offers a happy medium and closely resembles the legacy deployment scenarios associated with the soon-deprecated Device Administrator deployments of old.

How to enable it
----------------

As of R58, a new system Android Enterprise configuration should be present, but *should*[(!)](https://community.mobileiron.com/docs/DOC-9234) not be assigned by default:

<figure class="wp-block-image">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2018/12/image-1.png)<figcaption>*Highlighted in red*</figcaption></figure>This system policy is designed to take precedence over the work managed configuration when assigned to the same groups, so enabling COPE on your MobileIron tenant is as simple as assigning this configuration:

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2018/12/2018-12-21-22.49.42.gif)You will of course also require a restrictions configuration in order to lock the COPE devices down:

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2018/12/2018-12-21-22.53.31.gif)Considerations with COPE
------------------------

As with Core, there are some things to consider when deploying COPE, basically all but G Suite ([which recently changed policy](/2018/10/g-suite-no-longer-prevents-android-data-leakage-by-default/)) still applies to Cloud, so do [take a look](/2018/03/mobileiron-launch-android-enterprise-work-profiles-on-fully-managed-devices/#what-organisations-should-be-aware-of).

Also, keep in mind COPE is still Android 8.0+ only, devices running anything less will not be able to take advantage of the deployment scenario.

Other changes
-------------

### Deploy Google accounts

R58 also introduces support for pushing Google accounts to devices, another feature Core has had for some time already. Where an organisations makes use of managed Google (G Suite) accounts, this is a nice, simple means for pushing those accounts to the devices in a managed way.

### iFrame improvements

Not tied to R58 specifically, the Google Play iFrame recently allows for both the free upload and distribution of private in-house applications directly from the EMM, and the ability to push web apps to devices!

The web apps in particular are clever, by creating a web app within the iFrame you’re actually creating a simple webview application which imports and deploys to devices as any normal application would; this solves the problem of Android Enterprise not supporting shortcuts natively, and it’s entirely backwards compatible, not something that would normally be so with a new feature.

For in-house app upload, this means organisations no longer have to pay the $25 fee for a developer account, and need only provide a name and the APK. The long-winded process of uploading apps to Google Play is no longer necessary! A caveat, however, is these applications will remain forever private, and cannot therefore be made public in future.

Conclusion
----------

I wrote in my article on Core supporting COPE that this is potentially the most important of all deployment scenarios for the non-rugged market and stand by that still.

As support has widened this year, so too has interest in COPE from first-hand experience, and I don’t see that slowing down!

With three market leading UEM platforms now supporting the deployment scenario, I’m only really looking at MaaS360 (~early 2019) and SOTI (…?) to cover pretty much all the big names. (“What of Intune” I hear you cry, they are yet to even support fully managed (work-managed, COBO) so still a fair way behind everyone else currently).

Even lesser known, but great EMMs such as Miradore are following closely behind the major players in bringing COPE to market after a solid year of Android Enterprise focus, so it definitely won’t be too long before it’s pretty much universally available. Keep an eye out for more vendors next year!