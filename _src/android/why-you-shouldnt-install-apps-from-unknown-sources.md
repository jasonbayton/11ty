---
title: "Why you shouldn't install apps from unknown sources"
date: '2018-12-27T15:48:00+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Getting started
layout: base.njk
id: 7120
doccats:
    - Android
publish_post_category:
    - '6'
discourse_permalink:
    - 'https://discuss.bayton.org/t/why-you-shouldnt-install-apps-from-unknown-sources/252'
---
At one point during 2018, it was **80x more likely** someone would install a potentially harmful application (PHA) when sourcing apps via unknown sources (sideloading, ADB, etc) than via the official Google Play Store.

This number [naturally fluctuates](https://transparencyreport.google.com/android-security/overview), but the trend remains the same; while the Play Store isn’t [infallible](https://bgr.com/2018/11/25/google-play-store-apps-removed-malware-found/), it is currently the safest means of app installation for the Android ecosystem available.

PHAs are rife across the internet, and as mentioned in another document on the subject:

> Unfortunately, while many PHAs aren’t massively harmful, many more do have the ability to be quite disruptive. They can target the SIM, network, device, leverage vulnerabilities, abuse permissions and more.
> 
> Even with corporate data securely isolated and separately encrypted from the parent profile \[in a work profile deployment\], there are other means of causing harm to the organisation without gaining direct access to data on disk; while the EMM can often detect device-based attacks (compromised status), [without an MTD](/android/mtd-and-android-enterprise/) on the device, other attacks may go unnoticed
> 
> Without a way of preventing PHAs from being sideloaded, there is a level of risk which entirely relies on the end-user as the last line of defence.
> 
> <cite>[Feature spotlight: Block unknown sources on work profile deployments](/android/feature-spotlight-block-unknown-sources-on-work-profile-deployments/)</cite>

The risk is real
----------------

One example of a particularly harmful PHA is [DoubleLocker](https://www.welivesecurity.com/2017/10/13/doublelocker-innovative-android-malware/), which abuses Android’s permissions system to become a device administrator upon being whitelisted as an accessibility service, going on then to change the device passcode, encrypt all data on disk and take over as the device launcher where it displays a ransom message.

Another, more recent, example [discovered by ESET](https://www.welivesecurity.com/2018/12/11/android-trojan-steals-money-paypal-accounts-2fa/) again makes use of accessibility services, but in this case can steal €1,000 via PayPal (if installed) in 5 seconds after activation, far too quickly to be intercepted by the end-user.

Those into gaming may also be aware of Epic Games’ Fortnite being distributed outside of the official Play Store in an obvious attempt to avoid giving Google a cut of their revenue. Before Fortnite for Android had even launched, there were [malicious copies readily available on the internet](https://blog.malwarebytes.com/cybercrime/2018/06/fake-fortnite-android-links-found-youtube/). (Even the official Fortnite installer itself was at one point [vulnerable to attack](https://twitter.com/JasonBayton/status/1033459534935875586)).

Of course there are many other types, from adware to keyloggers, those that masquerade as legitimate apps in order to steal credentials to those that run up significant mobile bills by making calls and sending messages to premium numbers. While Android has a number of security measures and tools in Play Protect built in to mitigate PHAs, some do and will always find a way to bypass this, even if only for a short time.

A slippery slope
----------------

When installing applications from unknown sources, it is difficult for a normal Android user to guarantee the APK which has been sourced is legitimate when downloaded from the internet, even those coming via community-trusted repositories.

To make matters worse, depending on the OEM, the prompt to enable unknown sources often only happens once (or once per source from Android 8.0), meaning after the first installation all subsequent installs will not necessarily prompt a warning unless the APK is known to Google to be malicious.

When you’ve therefore got outlets like Epic Games promoting the unsafe practice of installing via unknown sources, it normalises the process, leading to less care and attention being paid to future, possibly less trustworthy outlets.

A headache for enterprise
-------------------------

Corporate devices will normally have unknown sources disabled by default, but not always. Particularly with legacy Android deployments where unknown sources was utilised to silently install EMM-related and in-house, corporate applications, devices would ship to users with the capability enabled, though some organisations would restrict it at a later date.

As Android Enterprise replaces Device Admin deployments, there’s almost zero need to make use of unknown sources within an organisation at all, in recent months it’s even now possible to disable it on BYO devices utilising only a work profile. Why this is a good thing is documented in [Feature spotlight: Block unknown sources on work profile deployments](/android/feature-spotlight-block-unknown-sources-on-work-profile-deployments/). This is in addition to the dramatically simplified [private app upload](/android/create-and-manage-private-apps-for-android-enterprise/) process and [web app support](/android/create-and-manage-web-apps-for-android-enterprise/) also recently published.

It’s not worth it
-----------------

Installation via unknown sources remains the primary means for the distribution of PHAs today, and while it might seem quick and straightforward to install an app someone sends via WhatsApp, or in a YouTube video, or really anywhere else, if the equivalent isn’t available on the Play Store then it’s best avoided.

The Play Store offers distribution channels (alpha, beta, production), private distribution, faster downloads, and better security than any other source for Android apps, if you care about the data on your phone, want to avoid PHAs or fear the implications of skyrocketing mobile phone bills, don’t do it.