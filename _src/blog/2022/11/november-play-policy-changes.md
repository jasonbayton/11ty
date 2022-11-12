---
title: 'Google Play target API requirements & impact on enterprise applications'
date: '2022-11-02'
status: draft
author: 'Jason Bayton'
excerpt: "Google is taking a harder stance on older applications from 2022. For organisations with enterprise applications this is what you need to know"
type: post
tags:
    - Enterprise
---
It's no secret many organisations struggle to keep pace with Google's Play Polices, often relying on applications built years prior benefitting from few updates to maintain minimum viable compatibility, eventually either breaking for newer devices, or having updates rejected for policy violations corresponding to app behaviour that was never an issue when the application was first uploaded.

Equally common are how these applications have historically been distributed; through EMM solutions as APK files pushed to devices, rather than leaning on Google Play. 

In the last few years, use of Google Play with it's many benefits for application distribution has been on the rise in enterprise; be that through the use of the Play Console directly for established developers, the EMM-integrated Google Play iFrame, or the [Custom app publishing API](https://developers.google.com/android/work/play/custom-app-api/get-started) for simplistic uploading of private applications with substantially fewer policies to adhere to. That said, some policies do still apply, and minimum target SDK is one of them.

Play policies around minimum target SDK version have been around for a few years, but this year marks a significant change to the behaviour of applications that fail to keep pace, that will significantly impact app deployment for managed estates.

As described in [this blog post](https://android-developers.googleblog.com/2022/04/expanding-plays-target-level-api-requirements-to-strengthen-user-security.html) and [this help article](https://support.google.com/googleplay/android-developer/answer/11926878), applications that do not target API level of 30 or higher in 2022 (and going forward year on year, maintain at minimum n-2 target SDK) will no longer be available to newer Android devices. 

## What does that mean?

If an application targets API level 29 or lower as of November 2022, it will no longer be discoverable or installable through managed Google Play (the on-device Play app) for new users with devices on Android 11 or above, and therefore distributing an application with a lower target SDK will simply never turn up on new devices. What this means in practice for applications distributed for enterprise is -

- Existing devices remain unaffected
- New devices enrolled running Android 10 or lower will receive the application without issue
- New devices enrolled running Android 11 or later will _not_ receive the application, and will not see it within managed Google Play either

When debugging the app installation, or lack thereof, logs should show failure to install due to a compatibility issue. 

It's by no means uncommon for applications to simply not turn up on devices, oftentimes this is due to a geo-restriction set by the developer, a permission issue (where an app may require a camera on a device without one), or a genuine compatibility problem (32bit apps on 64bit OS, for example). This latest change simply adds one more reason why an app may not be installing on-device.

## What can be done?

This timeline has been well-publicised throughout the year, so hopefully any applications relied upon by the November deadline have been updated to align with the new policy. If this isn't the case, and deployments are being affected, the immediate workaround for scenarios where productivity grinds to a halt on newer Android devices would be to apply for an extension within the Google Play console, per Google:

> If you need more time to update your app to target API level 31 or above, you can submit an extension request for your app to continue being discoverable to all Google Play users **until May 1, 2023**. Check your Play Console Inbox Messages for links to each of your app’s extension forms.

It looks like this: 

![Screenshot of Google Play console extension request](https://cdn.bayton.org/uploads/2022/11/Screenshot2022-11-12at00.38.21.png)

And once granted (almost immediately):

![Screenshot of Google Play console extension granted](https://cdn.bayton.org/uploads/2022/11/Screenshot2022-11-12at00.48.09.png)

If that fails for any reason, or the timeline of the 6 month extension is not quite enough to get applications up to the standards Google requires, distributing the APK via EMM directly where supported - as reluctant as I would be to recommend it - is still a viable option for organisations that cannot wait for an app to be updated. 

The obviously recommended resolution is to update the application to target a modern API level, though understandably additional considerations need to be evaluated -

- What new policies or requirements exist for the new API level vs the current targetSDK (there are likely several)
- How is the app affected by targeting a newer API level (the addition of explicit permission requests for example)
- What features may be lost by targeting a newer API level? Particularly pertinent for older device admin-style applications still clinging on to deprecated functionality
- .. and more

Bringing an application up to a modern targetSDK can be frustratingly non-trivial, in spite of the security benefits and additional functionality (whether relevant or not to the application's use case), but it is a necessecary undertaking to maintain a healthy, compatible enterprise application. As Google marches on with ever-stronger policies for app security and compatibility, organisations leaning on Google Play for app distribution must take Google's policies seriously, plan well ahead, and keep on top of application development to avoid issues in the field.