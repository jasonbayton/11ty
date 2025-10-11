---
title: 'Google publishes differences between Android and Android Go'
date: '2022-10-25'
status: publish
author: 'Jason Bayton'
excerpt: 'Google have recently (finally!) published details of the differences between Android and Android Go. This transparency will further help organisations determine if Go is suitable for their needs.'
type: post
tags:
    - Enterprise
---
I've been on a bit of an Android Go tangent recently, after a string of customer and ecosystem interactions really shone a light on the lack of public information Google has provided and the issues this is causing in enterprise deployments.

Just a short several weeks ago I wrote: 

> Starting with more transparent, public documentation akin to the CDD about exactly what Go devices can and cannot do would be a massive, low-effort change that could clear many uncertainties up immediately and help ecosystem partners better understand what it takes to make sure their solutions are Go-supported. It'd equally help customers to decide up-front if Android Go is suitable for them, rather than the current approach of test-before-deployment that seems to be in relied upon currently.

It's probably little more than coincidence that I've been raising the lack of transparency with Google quite frequently over the last few months, but seemingly in tandem with the [launch of Android 13 Go edition](https://blog.google/products/android/android-13-go-edition/) Google have also published a few documents to highlight the differences between Android and Android Go. 

First, a blog series for developing applications for Android Go, which shines a light on some of the limitations of the flavour, as well as it's minimum requirements: 
[https://android-developers.googleblog.com/2022/09/optimize-for-android-go-lessons-from-google-apps-part-1.html](https://android-developers.googleblog.com/2022/09/optimize-for-android-go-lessons-from-google-apps-part-1.html)

And more recently, the Android Go guide has been updated to show (some of) the differences between the two Android flavours: 
[https://developer.android.com/guide/topics/androidgo#differences-from-android](https://developer.android.com/guide/topics/androidgo#differences-from-android)

This isn't by any means the full picture, as there are other restrictions - including the inability to draw over apps mentioned [previously](/2020/08/android-go-emm/), lack of widget support, and automatic dimming, amongst others  - but it's a jolly good start and should help organisations better evaluate the Android flavour before committing to the otherwise very affordable hardware associated with Android Go, especially as the 2GB RAM requirement and some of the better features of full-fat Android (such as mainline support) continue to trickle over.