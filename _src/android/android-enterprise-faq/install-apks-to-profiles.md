---
title: 'Can I sideload an APK to the work profile (or other users)?'
parent: 'Android Enterprise FAQ'
published: '2024-10-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - App management
layout: base.njk
eleventyNavigation:
  order: 63000
---
Yes, it is possible to manually install an APK to the work profile or any other user present on the Android device via [ADB](/android/how-to-capture-device-logs).

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Enterprise policy heads-up</div>

Enterprise policies may prevent the installation of applications via ADB, please ensure your device is excluded from any such policy before continuing.

</div>

<div class="callout callout-red">
<div class="callout-heading callout-heading-small">Target API limitations</div>

Be aware that since Android 14, [it is no longer possible](/android/android-14-minimum-sdk) to install very old applications on a device. Via ADB [you can overcome this](/android/android-14-minimum-sdk), if necessary.

</div>

First, locate the user ID of the profile or user you wish to target:

`adb shell pm list users` 

This will output a user list of all users on the device, for example:

```
UserInfo{0:Jason:4c13} running
UserInfo{10:Work Profile:1030} running
UserInfo{11:Private space:1090}
```

Besides the primary user, which is always userID `0`, the above example also shows a **Work Profile** and a **Private space** (Private Space is Android 15+)

With the appropriate userID identified, install an APK as follows:

`adb install --user 10 /path/to/yourfile.apk`

Your application should install, and appear shortly within the appropriate profile.
