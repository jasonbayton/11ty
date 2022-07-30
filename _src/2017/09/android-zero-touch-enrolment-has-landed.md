---
title: 'Android zero-touch enrolment has landed'
date: '2017-09-23T20:22:06+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 4635
tag:
    - android
    - 'android enterprise'
    - Apple
    - DEP
    - enrolment
    - Mobile
    - 'mobile enrolment'
    - oreo
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/android-zero-touch-enrolment-has-landed/78'
tags:
    - Enterprise
---
On Thursday, Google [officially announced](https://www.blog.google/products/android-enterprise/android-zero-touch-enrollment-seamless-and-secure-enterprise-deployment/) zero-touch enrolment for Android 8.0+, enabling out-of-the-box EMM enrolment without the manual processes traditionally associated with Android provisioning. If you’re familiar with Samsung’s [KNOX Mobile Enrolment](https://www.samsungknox.com/en/solutions/mobile-enrollment) or Apple’s [Device Enrolment Programme](https://deploy.apple.com) (wherein iOS devices come configured out of the box to enrol onto a corporate EMM solution), Android’s zero-touch will not be a new concept.

Zero-touch as a solution has been somewhat available since the original Pixel came onto the scene, with [documentation referencing it](https://developers.google.com/android/work/requirements/features) against Android 7.1 which launched back at the end of 2016. With only the original Pixel supporting it however, it failed to make any significant impact on the industry (and I can personally attest to how difficult getting any official information on it has been before this launch).

To understand how monumental zero-touch is for Android management, let’s take a trip back in time.

How Android enrolment has evolved
---------------------------------

### Legacy enrolment

In the beginning, enrolling an Android device onto an EMM solution straight out of the box was a long-winded process. Here’s an example (give or take the exact order):

1. Turn it on
2. Set a language
3. Connect to WiFi
4. Choose to setup as a new device, or transfer data from another
5. Agree to T&amp;C’s, or opt into/out of specific OEM services
6. Add a Google account
7. Add a Fingerprint and/or Passcode
8. Agree to Google services/additional permissions
9. Exit the wizard, land on the home screen
10. Open the Play Store
11. Download the relevant EMM agent
12. Begin the enrolment process
13. Install additional EMM-related service APKs (and needing to enable unknown sources)
14. Set the device administrator
15. Get diverted to the Play Store to install any additional required applications

This is of course assuming the device contains management APIs the EMM can leverage to begin with; outside of Samsung the pickings were (and still are) rather slim and so some policies and configurations could simply not apply.

This early fragmentation in management capabilities contributed heavily to Samsung’s dominance in the enterprise today. More about that can be found [here](/android/what-is-android-enterprise-and-why-is-it-used/#history).

### The introduction of Android Enterprise

With the launch of Android 5.0 came the introduction of what was then Android for Work. Google implemented a number of management features akin to those available with KNOX directly into Android – a set of universal enterprise management APIs OEMs could *optionally* choose to add to their device OS builds.

Android Enterprise has matured considerably since then, moving from optional to mandatory in 6.0, extending provisioning methods from the original NFC bump to later include Wireless Token (afw#emm.vendor) and from 7.0, QR Code enrolment too. Just as with Samsung’s KNOX and Apple’s Supervision, every major release adds more management capabilities or deployment scenarios. Today, provisioning a Work-Managed device is significantly faster, which the below video demonstrates:

<iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" frameborder="0" height="281" loading="lazy" src="https://www.youtube.com/embed/PBTI0TQAUyM?feature=oembed" title="MobileIron Android Enterprise QR provisioning" width="500"></iframe>

*Above: Work-Managed provisioning using a QR code, a quick and easy alternative to devices that don’t support NFC if running Android 7.0+*

Furthermore, applications can be managed silently, Google accounts are no longer a requirement and for enterprises using GSuite, end-users already get a near zero-touch experience when the device automatically initiates enrolment based on the detection of a GSuite email address associated with an EMM.

How zero-touch adds the finishing touches for Android Enterprise
----------------------------------------------------------------

[![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2017/09/ZT-Demo-Gif_pixel.gif)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2017/09/ZT-Demo-Gif_pixel.gif)With zero-touch, enterprises purchase their Android 8.0+ devices from an authorised reseller. Those devices can then be associated one of any of the EMMs that support a Work-Managed deployment scenario (Device Owner mode) using the [Zero-touch portal](https://partner.android.com/zerotouch). The DPC (EMM Agent) will be pulled down automatically along with any defined configurations when the device first boots.

As of writing, the number of devices that are about to support zero-touch (aside from the Pixel which already does) can be counted on one hand, however Google have partnered with almost all popular OEMs to have the functionality implemented – Samsung, Huawei, Sony, HTC, HMD Global (Nokia), LG and more will support zero-touch in the very near future. For those wondering, Samsung will continue to offer KNOX Mobile Enrolment, zero-touch is just another option for those who prefer not to use KME.

On the EMM side, there’s not a considerable amount of work to be done — for EMMs that do already support Work-Managed deployments it’s basically ready to go. For EMMs that don’t yet support it, more information on allowing support can be found [here](https://developers.google.com/android/work/requirements/work-managed-device).

Resellers are being actively engaged, with already at least one in the UK and several others across the World coming soon. The resellers – aside from selling the devices – will also be responsible for setting customers up with a zero-touch portal account where, as mentioned above, the DPC and configurations are set. Once access is provided however, organisations can manage which resellers are associated with the portal themselves should it ever need to be changed.

When everything is set up and ready to go, the end-users who receive a device will experience something similar to the process demonstrated in the GIF – the device boots, they connect to WiFi and zero-touch takes over.

Incredible.

As someone who was there in the very early days of Android management and has experienced the pain of bulk-enrolling devices on behalf of users and/or customers, zero-touch – just like DEP for iOS devices – is the solution the Android market has needed to a very, very long-standing problem.

Android Enterprise is still a relatively new concept for many organisations and legacy enrolment is therefore still prevalent throughout the industry. With the also recently-announced Work-Managed Work Profile deployment scenario (more on that [here](/android/what-is-android-enterprise-and-why-is-it-used/#enter-android-enterprise)), Android Enterprise covers all common deployment scenarios and is only a short way off feature parity with Samsung KNOX (SAFE). If your organisation is looking for a new approach to Android management, start testing with Android Enterprise now, zero-touch is only around the corner.

[Read more about Android Enterprise](/android/what-is-android-enterprise-and-why-is-it-used/).

*What do you think of zero-touch? Are you an end-user or administrator? Let me know your thoughts in the comments,[@jasonbayton](https://twitter.com/jasonbayton) on twitter or [@bayton.org](https://facebook.com/bayton.org) on Facebook.*