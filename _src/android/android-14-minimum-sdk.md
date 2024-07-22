---
title: 'Android 14 blocks apps targeting old Android versions'
published: '2023-06-23'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - App management
eleventyNavigation:
  order: 8000
layout: base.njk
---
In Android 14, Google introduced new limitations on the installation of applications targeting old versions of Android.

## What’s changing

From Android 14 it is no longer possible to install any application that targets an API level below 23 - Android 6.0. Attempting to do so will trigger a security exception.

## Will this have any impact on EMM-deployed devices?

Yes. If a device is enrolled with, or upgraded to Android 14, it will no longer be possible to push old Android applications. Devices with apps already installed will not be affected.

## Do my enterprise apps have to target API level 34 (14)?

No. It's certainly better to ensure apps are targeting the latest API level where possible, but as long as applications target an API level of 23 (Android 6.0) or higher for Android 14, and 24 (Android 7.0) or higher in Android 15, apps will continue to be able to install without issue.

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Head's up</div>

This new policy, like Google Play's [targetSDK requirements](https://support.google.com/googleplay/android-developer/answer/11926878) will increase year-on-year. This means apps that target API levels lower than 24 (7.0) will not install with Android 15 in 2024.

**Update**: As of Android 15 developer preview, this has increased to targeting an API level below 24 - Android 7.0.

</div>

## Is it possible to test the changes?

Yes, on an Android 14 device you may connect to ADB and sideload an application with:

```
adb install name_of_package.apk
```

This will result in an error similar to:

```
INSTALL_FAILED_DEPRECATED_SDK_VERSION: App package must target at least SDK version 23, but found 22
```

To overcome this error and install the application anyway, use:

```
adb install --bypass-low-target-sdk-block name_of_package.apk
```

Note this only works via ADB, there are no other means of bypassing the SDK block.

## Read more

View [What's new in Android 14 for enterprise](/blog/2023/04/android-enterprise-in-android-14/#prevention-of-installation-of-older-applications) for details of this and other changes in Android 14, and for the technically-minded, [here's Google's documentation](https://developer.android.com/about/versions/14/behavior-changes-all#security) on the change.

Read a topic discussing this further on the [customer community](https://www.androidenterprise.community/t5/general-discussions/changing-target-sdk-for-app-compatibility/m-p/2999#M929).
