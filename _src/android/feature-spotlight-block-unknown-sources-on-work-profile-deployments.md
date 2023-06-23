---
title: 'Feature spotlight: Block unknown sources on work profile deployments'
published: '2018-11-30T23:22:42+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Work profile
eleventyNavigation:
  order: 9000
layout: base.njk
discourse_permalink:
    - 'https://discuss.bayton.org/t/feature-spotlight-block-unknown-sources-on-work-profile-deployments/243'
---
In November 2018, Google released a new feature enabling the ability to disable unknown sources device-wide on work profile deployments as far back as Android 6.0.

[Google docs state 8.0](https://developer.android.com/work/dpc/security#unknown-sources) as this is the earliest version of Android which supports preventing verify apps from being disabled (the feature this relies on), however it will function as far back 6.0 as long as verify apps is enabled with the caveat it may be overridden by the end-user.

In Android 10 this feature became a natively supported AE API, rather than one managed through Google Play Services.

## Context

App installation via unknown sources remains a primary source of potentially harmful applications (PHA), with users being considerably more likely to install a PHA when downloading APKs from the internet, email or other means compared to those who only install applications from the Play Store.

For all fully managed deployment scenarios (COBO, COPE, COSU) this isn’t a concern; in most cases EMMs disable unknown sources by default or at least offer the opportunity to do so via configs and policies.

Work profile deployments however have been the exception; with intentionally limited management of a work profile device on a device level, and a greater focus on user privacy, many controls – including the blocking of unknown sources *outside of the work profile* – have not been available for organisations.

This is a good thing, and a differentiating feature with Android.

BYOD deployments are just that, *bring your own* as opposed to using a corporate device. Which means users will have their own apps, data, and *control* over their personally owned devices, extending also to what and how they install applications.

## Why this matters

Unfortunately, while many PHAs aren’t massively harmful, many more do have the ability to be quite disruptive. They can target the SIM, network, device, leverage vulnerabilities, abuse permissions and more.

Even with corporate data securely isolated and separately encrypted from the parent profile, there are other means of causing harm to the organisation without gaining direct access to data on disk; while the EMM can often detect device-based attacks (compromised status), [without an MTD](/android/mtd-and-android-enterprise/) on the device, other attacks may go unnoticed.

Without a way of preventing PHAs from being sideloaded, there is a level of risk which entirely relies on the end-user as the last line of defence.

## The solution

With the introduction of this new feature, installation from unknown sources on work profile devices can be prevented. Unusually, this has been introduced in a GMS update and therefore is supported as far back as Android 6.0.

Like enforcing a passcode on a device, organisations now have the capability to ensure any users opting to bring their personal devices into the business will not be installing applications outside of the Google Play Store, offering additional security and peace of mind.

Preventing installation via unknown sources requires EMM integration, so may not be available for use on all platforms (and some may opt not to implement it at all).

### Block unknown sources in MobileIron Core

To enable this within MobileIron Core, simply ensure the the box for **Allow unknown sources in device** in **Lockdown Policy** is unchecked:

![](https://cdn.bayton.org/uploads/2018/11/2018-11-30-23.17.25.gif)

### Block unknown sources in Workspace One UEM

WS1 UEM requires a custom XML payload for support below Android 10. Use the following XML sample:

```
<characteristic type="com.airwatch.android.androidwork.app:com.android.vending" uuid="b4yt0nb43-3df7-4845-aeea-795020609ead"> 
<parm name="verify_apps:device_wide_unknown_source_block" value="true" type="boolean" /> 
</characteristic>
```

Then create a new profile, opting for the **Custom Settings** payload:

![](https://cdn.bayton.org/uploads/2018/11/2018-11-30-22.54.02.gif)

For Android 10 and future versions it’s possible to configure this in the restrictions payload.

Contact your EMM for additional information and support.