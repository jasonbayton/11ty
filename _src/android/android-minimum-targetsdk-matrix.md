---
title: 'Android minimum target SDK matrix'
published: '2026-03-13'
status: publish
author: 'Jason Bayton'
excerpt: 'An overview of on-device and Google Play targetSdkVersion requirements across Android versions.'
type: documentation
tags:
    - App management
eleventyNavigation:
  order: 8000
layout: base.njk
---
Google has progressively introduced and tightened requirements around the `targetSdkVersion` apps must declare in order to be installed on devices and distributed through Google Play. These requirements exist as two distinct mechanisms: an on-device installation block enforced by Android itself, and Google Play's submission requirements that control app visibility and distribution. Together, they push the ecosystem towards modern, secure API levels.

## On-device minimum targetSdkVersion

Starting with Android 14, Google introduced an OS-level enforcement that outright prevents the installation of applications targeting very old API levels. When an app fails this check, Android throws an `INSTALL_FAILED_DEPRECATED_SDK_VERSION` security exception, and the installation is blocked regardless of the source - whether sideloaded, pushed via an EMM, or installed from a store.

The only bypass available is through ADB:

```
adb install --bypass-low-target-sdk-block name_of_package.apk
```

This on-device block has incremented as follows:

| Android version | API level | Minimum `targetSdkVersion` to install | Equivalent Android version |
|---|---|---|---|
| Android 14 | 34 | 23 | Android 6.0 (Marshmallow) |
| Android 15 | 35 | 24 | Android 7.0 (Nougat) |
| Android 16 | 36 | 24 (unchanged) | Android 7.0 (Nougat) |
| Android 17 | TBD | TBD | TBD |

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Head's up</div>

Notably, Android 16 did not increment the minimum `targetSdkVersion` for on-device installation, keeping it at API 24, the same as Android 15. Whether Android 17 will increment this is not yet confirmed.

</div>

Apps already installed on a device before an OS upgrade are not affected; the block only applies to new installations.

For further details on the on-device block, see:

- [Android 14 blocks apps targeting old Android versions](/android/android-14-minimum-sdk/)
- [Android 15 blocks app installs targeting Android versions below 7.0](/android/advisories/android-15-app-install/)

## Google Play targetSdkVersion requirements

Separately from the on-device block, Google Play enforces its own `targetSdkVersion` requirements for app submission and visibility. These requirements have been in place since 2018 and follow an annual cadence, typically requiring developers to target an API level within one version of the latest Android release.

There are two aspects to Google Play's enforcement:

1. **Submission requirements** - New apps and updates must target a minimum API level to be submitted to Google Play.
2. **Visibility requirements** - Existing apps that aren't updated will eventually become undiscoverable to users on newer Android versions, though users who previously installed the app can still find and reinstall it.

| Year | New apps & updates must target | Existing apps minimum to remain visible | Key dates |
|---|---|---|---|
| 2018 | API 26 - Android 8.0 (Oreo) | N/A | August 2018 (new), November 2018 (updates) |
| 2019 | API 28 - Android 9 (Pie) | N/A | August 2019 (new), November 2019 (updates) |
| 2020 | API 29 - Android 10 | N/A | August 2020 (new), November 2020 (updates) |
| 2021 | API 30 - Android 11 | N/A | August 2021 (new), November 2021 (updates) |
| 2022 | API 31 - Android 12 | API 30 - Android 11 (from January 2023) | August 2022 (new), November 2022 (updates) |
| 2023 | API 33 - Android 13 | API 31 - Android 12 | August 31, 2023 |
| 2024 | API 34 - Android 14 | API 33 - Android 13 | August 31, 2024 |
| 2025 | API 35 - Android 15 | API 34 - Android 14 | August 31, 2025 |

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Note</div>

Wear OS, Android TV, and Android Automotive OS apps have separate, slightly lower `targetSdkVersion` requirements. Developers can also request deadline extensions, typically to November 1st of the same year.

</div>

## Why this matters for enterprise

For organisations managing devices through an EMM, both mechanisms are relevant:

- **On-device block**: If a managed device is running Android 14 or later, any enterprise app targeting below the minimum API level will fail to install, whether pushed silently via the EMM or installed manually. This is particularly important for legacy line-of-business apps that may not have been updated in some time.
- **Google Play requirements**: Apps distributed through managed Google Play must meet the submission requirements to be updated, and will gradually lose visibility to users on newer Android versions if left unmaintained.

The practical takeaway is that organisations should ensure all enterprise applications target at least API level 24 (Android 7.0) today to guarantee installation across Android 14-16 devices, and should plan for this minimum to increase in future Android releases.

## Test APKs

To validate the on-device minimum `targetSdkVersion` behaviour, the following demo APKs are available for sideloading. Each targets a specific API level and can be used to confirm which apps will and won't install on a given Android version:

| APK | `targetSdkVersion` | Android version |
|---|---|---|
| [bayton-sdk-demo-target36-android16.apk](https://cdn.bayton.org/download/min-sdk-validation/bayton-sdk-demo-target36-android16.apk) | 36 | Android 16 |
| [bayton-sdk-demo-target35-android15.apk](https://cdn.bayton.org/download/min-sdk-validation/bayton-sdk-demo-target35-android15.apk) | 35 | Android 15 |
| [bayton-sdk-demo-target34-android14.apk](https://cdn.bayton.org/download/min-sdk-validation/bayton-sdk-demo-target34-android14.apk) | 34 | Android 14 |
| [bayton-sdk-demo-target33-android13.apk](https://cdn.bayton.org/download/min-sdk-validation/bayton-sdk-demo-target33-android13.apk) | 33 | Android 13 |
| [bayton-sdk-demo-target32-android12L.apk](https://cdn.bayton.org/download/min-sdk-validation/bayton-sdk-demo-target32-android12L.apk) | 32 | Android 12L |
| [bayton-sdk-demo-target31-android12.apk](https://cdn.bayton.org/download/min-sdk-validation/bayton-sdk-demo-target31-android12.apk) | 31 | Android 12 |
| [bayton-sdk-demo-target30-android11.apk](https://cdn.bayton.org/download/min-sdk-validation/bayton-sdk-demo-target30-android11.apk) | 30 | Android 11 |
| [bayton-sdk-demo-target29-android10.apk](https://cdn.bayton.org/download/min-sdk-validation/bayton-sdk-demo-target29-android10.apk) | 29 | Android 10 |
| [bayton-sdk-demo-target28-android9.apk](https://cdn.bayton.org/download/min-sdk-validation/bayton-sdk-demo-target28-android9.apk) | 28 | Android 9 (Pie) |
| [bayton-sdk-demo-target27-android8.1.apk](https://cdn.bayton.org/download/min-sdk-validation/bayton-sdk-demo-target27-android8.1.apk) | 27 | Android 8.1 (Oreo) |
| [bayton-sdk-demo-target26-android8.0.apk](https://cdn.bayton.org/download/min-sdk-validation/bayton-sdk-demo-target26-android8.0.apk) | 26 | Android 8.0 (Oreo) |
| [bayton-sdk-demo-target25-android7.1.apk](https://cdn.bayton.org/download/min-sdk-validation/bayton-sdk-demo-target25-android7.1.apk) | 25 | Android 7.1 (Nougat) |
| [bayton-sdk-demo-target24-android7.0.apk](https://cdn.bayton.org/download/min-sdk-validation/bayton-sdk-demo-target24-android7.0.apk) | 24 | Android 7.0 (Nougat) |
| [bayton-sdk-demo-target23-android6.0.apk](https://cdn.bayton.org/download/min-sdk-validation/bayton-sdk-demo-target23-android6.0.apk) | 23 | Android 6.0 (Marshmallow) |
| [bayton-sdk-demo-target22-android5.1.apk](https://cdn.bayton.org/download/min-sdk-validation/bayton-sdk-demo-target22-android5.1.apk) | 22 | Android 5.1 (Lollipop) |
| [bayton-sdk-demo-target21-android5.0.apk](https://cdn.bayton.org/download/min-sdk-validation/bayton-sdk-demo-target21-android5.0.apk) | 21 | Android 5.0 (Lollipop) |

To test, push an APK via ADB:

```
adb install bayton-sdk-demo-target22-android5.1.apk
```

On Android 14+ this will fail for APKs below the minimum `targetSdkVersion` with `INSTALL_FAILED_DEPRECATED_SDK_VERSION`. To bypass the block for testing purposes:

```
adb install --bypass-low-target-sdk-block bayton-sdk-demo-target22-android5.1.apk
```

The above applications have never been on Google Play and will likely trigger a Play Protect warning, you can bypass this when it pops up, otherwise you will receive a `INSTALL_FAILED_VERIFICATION_FAILURE` error. This is separate to the target SDK warnings.

The source code for these applications can be found [on GitHub](https://github.com/baytonorg/org.bayton.sdkdemo/).

## Read more

- [Android versions matrix](/android/android-versions/) - API levels, release dates, and end-of-life dates
- Google Play's [target API level requirements](https://support.google.com/googleplay/android-developer/answer/11926878)
- Android developer documentation on [meeting Google Play's target API level requirement](https://developer.android.com/google/play/requirements/target-sdk)
- [Android 14 blocks apps targeting old Android versions](/android/android-14-minimum-sdk/)
- [Android 15 blocks app installs targeting Android versions below 7.0](/android/advisories/android-15-app-install/)
