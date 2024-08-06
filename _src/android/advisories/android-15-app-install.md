---
title: 'Android 15 blocks app installs targeting Android versions below 7.0'
published: '2024-08-05'
status: publish
author: 'Jason Bayton'
excerpt: "You'll see a security exception when installing outdated apps."
type: documentation
tags:
    - Advisories
eleventyNavigation:
  order: 8000
layout: base.njk
---
In Android 15, Google incremented the security policy blocking the installation of old applications to include Android 6.0

## What’s changing

From Android 15 it is no longer possible to install any application that targets an API level below 24 - Android 7.0. Attempting to do so will trigger a security exception.

## Will this have any impact on EMM-deployed devices?

Yes. If a device is enrolled with, or upgraded to Android 15, it will no longer be possible to install old Android applications. Devices with apps already installed will not be affected.

## Do my enterprise apps have to target API level 35 (Android 15)?

No. It's certainly better to ensure apps are targeting the latest API level where possible, but as long as applications target an API level of 24.(Android 7.0) or higher for Android 15, apps will continue to be able to install without issue.

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Head's up</div>

This new policy, like Google Play's [targetSDK requirements](https://support.google.com/googleplay/android-developer/answer/11926878) will increase year-on-year.

</div>

## Is it possible to test the changes?

Yes, on an Android 15 device you may connect to ADB and sideload an application with:

```
adb install name_of_package.apk
```

This will result in an error similar to:

```
INSTALL_FAILED_DEPRECATED_SDK_VERSION: App package must target at least SDK version 24, but found 22
```

To overcome this error and install the application anyway, use:

```
adb install --bypass-low-target-sdk-block name_of_package.apk
```

**Note this only works via ADB, there are no other means of bypassing the SDK block.**

## Read more

View [What's new in Android 15 for enterprise](/blog/2024/04/new-for-enterprise-android-15/#a-bump-to-minimum-sdk-version-for-installation-of-apps) for details of this and other changes in Android 15, and for the technically-minded, [here's Google's (Android 14) documentation](https://developer.android.com/about/versions/14/behavior-changes-all#security) on the change.

Read a topic discussing this further on the [customer community](https://www.androidenterprise.community/t5/general-discussions/changing-target-sdk-for-app-compatibility/m-p/2999#M929).
