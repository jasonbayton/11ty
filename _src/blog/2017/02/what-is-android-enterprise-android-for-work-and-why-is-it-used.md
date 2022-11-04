---
title: 'What is Android Enterprise (Android for Work) and why is it used?'
date: '2017-02-26T20:08:43+00:00'
status: draft
author: 'Jason Bayton'
excerpt: ''
type: post
id: 3768
tag:
    - android
    - device
    - EMM
    - Enterprise
    - MDM
    - Mobile
    - 'owner mode'
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/what-is-android-enterprise-android-for-work-and-why-is-it-used/88'
tags:
    - Enterprise
---
Although I talked about iOS Supervision in a [previous post](/2017/02/what-is-ios-supervision-and-why-is-it-used/), Android is where I’ve firmly hung my Enterprise Mobility hat over the years. This is mostly due to my experience with Android stretching all the way back to the days of [the first Android phone](/2010/11/root-a-g1-running-android-1-6-without-recovery/), but generally because I tend to enjoy using Android far more than other mobile operating systems.

In the enterprise I come across Android frequently; while iOS is often allocated to the C-levels and higher management, usually employees lower down the corporate ladder are provided Android handsets.

It makes sense really, although there are many flagships competing directly with Apple, there are even more directly targeting the mid-to-low end of the market at very attractive prices – perfect for mobility on a budget, right?

Up until *relatively* recently, not really.

A little backstory
------------------

EMM (Enterprise Mobility Management) platforms rely on APIs to communicate with and control managed devices. Things like disabling the camera, bluetooth or preventing access to system settings are all individually exposed via one or multiple APIs. This is important to know and it’s not limited to Android.

The difference is while iOS, Windows Phone, QNX (BlackBerry) and others include these APIs with their respective operating systems and system applications, for many years Android did not, or offered very few – certainly not enough to consider manageable by any stretch.

But that wasn’t the end of the world. Because Android is open source, manufacturers can build upon it and tweak it as much as they see fit. While other manufacturers tested the waters, offering some API functionality here and there, Samsung saw the gap in the market and devoted resources to making a splash.

And it paid off.

Today Samsung are by far the strongest Android device manufacturer for the enterprise due to their early efforts and not only that, they’re the most-supported Android manufacturer for EMM solutions. Other manufacturers have since added APIs to try and compete but compared to Samsung with SAFE (KNOX) and KNOX Premium, there’s really no comparison.

The downside is how Samsung deploy their APIs; the more expensive devices tend to get the newest versions of SAFE, while the mid-market and budget have to endure older versions, occasionally causing confusion (*if they’re all 2017 models, why don’t they all have the same management capabilities?*) and often meaning the newest EMM functionality won’t work with the cheaper devices as well (if at all).

The same goes for system applications, too. EMM requires APIs in order to push PIM data to the email, contacts and calendar apps on devices. For a long time it was either not possible or very unreliable to try to push Exchange data to a mid-range HTC, for example, and near impossible on other devices. Finding devices besides Samsung that could be reliably managed was no trivial task – eventually 3rd party apps such as K9, touchdown and many others began showing up offering EMM integration; for businesses only really needing basic management and PIM who were prepared to purchase licenses for these 3rd party apps, they could relatively safely look beyond Samsung.

And that’s really how it’s been up to recently, when it seems Google had taken notice of both the uneven playing field for enterprise device selection and a recurring perception that Android security is somewhat *lacking.*

Enter Android Enterprise
------------------------

*Or, as it was up until fairly recently, Android for Work.*

Android Enterprise debuted with 5.0 Lollipop in 2014 as an optional\* solution manufacturers could add to their OS builds in order to integrate a common set of device management and EMM APIs. From 6.0 Marshmallow it was no longer optional and has since been a mandatory component for all manufacturers.

Android Enterprise (AE) offers a few things:

- A reliable EMM experience, knowing when a configuration is pushed, all AE devices will support and execute the relevant requests
- A containerised work/life separation primarily aimed at BYOD
- A Device Owner (DO) mode for complete corporate ownership
- A unique Google Play for Work portal offering a corporate Play Store with only IT-approved applications within.
- App configs, a way of deploying corporate settings on work apps
- Mandated device encryption

With the introduction of 5.0 Lollipop Google also made user profiles available to phones in addition to the tablets that had already had it. Using the same underlying functionality Android Enterprise is able to create a managed user profile that although sits entirely separately encrypted on disk, integrates directly with the current user on the device in order to provide both personal and work applications in the same app drawer – the latter indicated by a briefcase:

[![](https://cdn.bayton.org/uploads/2017/02/hero2-980x525.jpg)](/https://cdn.bayton.org/uploads/2017/02/hero2-980x525.jpg)
*Source: arstechnica.com*

There are two ways of enabling Android Enterprise, the first and original is through a GSuite managed domain that requires either an existing GSuite subscription or a free single-user account used for little more than initial setup. If domain verification hasn’t already been done through GSuite, the business will need to undertake a couple of tasks to prove they own the domain they’re setting AE up against.

The second and newer method is Android Enterprise Accounts and works with any Gmail account – No domain verification required, takes practically minutes to set up and Google manages the individual Android Enterprise accounts on the managed devices, meaning there’s no need for additional Gmail or GSuite user management.

Whichever method is used, it’s then possible (but not necessarily required since GSuite has basic EMM functionality) to link one of many existing EMM platforms which support AE (even Intune!) and configure the corporate Play Store.

Some EMM platforms don’t make use of the Enterprise Play Store application and instead manage apps through the integrated EMM app catalogue as has always been traditionally available, an example would be MobileIron:

[![](https://cdn.bayton.org/uploads/2017/02/Screenshot-2017-02-25-at-22.06.15.png)](/https://cdn.bayton.org/uploads/2017/02/Screenshot-2017-02-25-at-22.06.15.png)
*Notice the briefcases on managed apps? Source: bayton.org, photo: MobileIron Core 9.2*

The benefit of utilising an EMM platform for app management is app config, making it extremely easy to tailor applications to the business for immediate use on deployment, no additional end-user config required:

[![](https://cdn.bayton.org/uploads/2017/02/Screenshot-2017-02-25-at-22.14.27.png)](/https://cdn.bayton.org/uploads/2017/02/Screenshot-2017-02-25-at-22.14.27.png)
*Source: bayton.org, photo: MobileIron Core 9.2*

For EMM admins the above config may look familiar, though apps like Chrome offer far more granular functionality around permitted domains, browser functionality and more.

When Android Enterprise is deployed, it looks something like this:

[![](https://cdn.bayton.org/uploads/2017/02/Screenshot_20170225-220945.png)](/https://cdn.bayton.org/uploads/2017/02/Screenshot_20170225-220945.png)
*Source: bayton.org, photo: Android 6.0 BYOD Android Enterprise*

The mix of work and personal apps together on the above BYOD handset demonstrates the level of integration; as an end-user it feels like just another few apps installed, despite the underlying profile configurations working to separate and secure that corporate data. Should an enterprise wipe be issued, it simply removes the AE profile and leaves all userdata untouched.

The BYOD model isn’t quite perfect yet, with the feedback most commonly circling around the lack of additional authentication.

Consider BlackBerry’s Good, MobileIron’s Apps@Work or AirWatch’s Container. With these containers they sit as apps on the device and when opened, can be configured to require a PIN or passcode to unlock the enterprise content within.

AE doesn’t support this yet but it’s on the horizon. Until then, once the user authenticates with the device (via lockscreen) the enterprise data is available without any further authentication. DRM policies can prevent the transfer of enterprise information outside of the container environment, but it’s still possible to see it if the user’s lockscreen passcode is compromised.

Furthermore, the ability to pause (temporarily turn off) the work profile for evenings, weekends or holidays is occasionally promoted, but I’ve found the implementation to be inconsistent across devices and scenarios; sometimes I can indeed turn it off [as described](https://support.google.com/work/android/answer/7029561?hl=en), other times the best I can do is disable sync under Settings &gt; Accounts.

Diving deeper with Device Owner mode
------------------------------------

With device owner mode there is no user space. As the intended use is for wholly company owned devices, DO removes any typically BYOD or COPE (Corporately Owned, Personally Enabled) scenarios and locks the device down strictly to the environment set by the EMM administrator.

Enabling DO mode is currently done on first boot of a new device – or one that’s been freshly factory-reset – using a provisioning app on a dedicated provisioning device (configured with EMM server details) and an NFC bump.

Depending on the EMM provider provisioning app used, the process will vary slightly in what agent is downloaded in order to enrol the device on the relevant platform.

DO mode strips out almost all applications from the device and utilises the authorised apps via EMM or Play for Work. Nothing more. This means should an app require Play Services to function, Play Services would need to also be authorised for use by the business – a scenario I’ve seen cause issues a couple of times.

Given the need for an NFC bump to get this enabled currently there are some limitations:

- Much like Apple Configurator, all devices being provisioned are somewhat tethered to a base location – yes the provisioning device can be replicated elsewhere (it’s only the app with some environmental information) but it cannot be done remotely.
- If the device is wiped, DO mode needs to be enabled again, otherwise it returns to a fully unlocked, factory-reset device
- Devices not supporting NFC naturally won’t support the use of the provisioning app

Furthermore:

- If issues are detected during DO enablement or EMM enrolment the device will factory reset with little to no feedback. This can be frustrating.
- As mentioned above, initial app management may take some time to get right. Missing core apps may cause problems and as such the setup will need to be tweaked and tested before deployment.

Thankfully with the introduction of Pixel we heard the first mention of zero-touch, Android’s presumed answer to DEP, permitting Device Owner mode to be enabled remotely! Early signs of this are present in current Android versions, though it’s not fully enabled/supported just yet.

Conclusion
----------

Hopefully the benefits of Android Enterprise have been adequately conveyed above. To summarise:

- Prior to Android Enterprise the market was awash with inconsistent management capabilities across various Android manufacturers and app developers
- Android Enterprise offers a set of consistent APIs for basic device management and app management
- Android Enterprise securely separates corporate and personal data, or enables a purely corporately-owned profile without a user space
- More features are coming in future to expand capabilities and enable remote provisioning

According to Google this is just the beginning. Their aim in the short term is feature parity between other offerings provided by the likes of Samsung and Apple, and long-term to far surpass the management capabilities of everyone else to make Android Enterprise the de facto choice for enterprise device management. Of course in doing so, they hope the perception of Android security improves in the process.

If your organisation has struggled in the past managing Android devices, are sick of dealing with Google accounts, are looking for more tools for entirely corporately-owned devices or anything else above, it could well be time to consider Android Enterprise.

\*I mentioned the voluntary incorporation of Android Enterprise there because as 5.0 devices began showing up on the market, they were being bought with Android Enterprise usage in mind and seemingly found to be missing the needed APIs for reliable management. Not all manufacturers – particularly less popular ones – felt the need to add this new, optional functionality.

*Does your organisation use Android Enterprise? Are you an admin? Feel free to discuss your deployment in the comments. End user? Let me know how Android Enterprise affects your daily life performing your job role.*

*As always I’m [@jasonbayton](https://twitter.com/jasonbayton) on Twitter, [+JasonBayton](https://twitter.com/jasonbayton) on Google+, [/in/jasonbayton](https://linkedin.com/in/jasonbayton) on Linkedin or [@bayton.org](https://facebook.com/bayton.org) on Facebook. You’re also welcome to leave a comment below or send me an [email](mailto:jason@bayton.org).* *Free free to get in touch to discuss this or any other topics you have in mind!*