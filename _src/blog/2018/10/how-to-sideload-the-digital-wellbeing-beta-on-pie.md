---
title: 'How to sideload the Digital Wellbeing beta on Pie'
date: '2018-10-01T23:23:50+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 6798
tag:
    - android
    - apk
    - beta
    - 'digital wellbeing'
    - pha
    - sideload
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/how-to-sideload-the-digital-wellbeing-beta-on-pie/192'
tags:
    - Mobile
---
<div class="bs-callout bs-callout-danger">### Installing apps from unknown sources is dangerous

The following discusses the installation of an application from outside of the Google Play Store. Installing apps from unknown sources is 80x more likely to result in a Potentially Harmful Application (PHA) and should therefore be avoided. The source of the APK in question is hosted by APKMirror, a source I trust knowing its background, however this is an exception rather than a rule. </div>Not running a Pixel as my daily driver, but having Android Pie for a little while both via the developer preview and more recently the official launch for the Nokia 7 Plus, I’ve been struggling to get my hands on Digital Wellbeing.

Reading online, the 7 Plus is supposedly able to get the app, however I found despite [joining the beta](https://www.android.com/versions/pie-9-0/digital-wellbeing-beta/) and waiting a number of days, the Play Store simply would not offer it up.

![](https://r2_worker.bayton.workers.dev/uploads/2018/10/image.png)So I tried other means.

Normally if I need an APK for an application, I’ll lean on friends or colleagues with said app already installed to export it with something like [MyAppSharer](https://play.google.com/store/apps/details?id=com.yschi.MyAppSharer&hl=en). There is then no doubt about the legitimacy of the application as I know it has come from a trusted source – Google Play.

However, with Digital Wellbeing in limited beta it seemed easier to head over to the only external source of APKs I trust, [APKmirror](https://www.apkmirror.com/).

At first I figured it’d be a bog-standard install via Chrome on Android, however after downloading and attempting to install it, I found Play Protect actively blocked the installation due to it being *from an unknown source*; this is the first I’ve seen of this type of block as I’ve only known it to pop up for PHAs previously. My theory is Google has perhaps added it to a blacklist to reduce to the likelihood of their beta being sideloaded given I was able to install other APKs perfectly fine, but that’s speculation.

Instead, I nipped over to my PC, [downloaded Digital Wellbeing](https://www.apkmirror.com/apk/google-inc/digital-wellbeing/) from APKMirror once more and connected my device via USB. Using [ADB](https://www.xda-developers.com/install-adb-windows-macos-linux/) I was then able to install the application with:

```
<pre class="wp-block-code">```
adb install com.google.android.apps.wellbeing.apk
```
```

As simple as that.

Not on Android Pie yet? No worries! Check out [this simple guide](/2018/10/how-to-manually-update-the-nokia-7-plus-to-pie/) to get upgraded, or come back once the OTA has appeared on your device.