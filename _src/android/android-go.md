---
title: 'What is Android Go, and how is it suited to enterprise?'
published: '2022-09-08'
status: draft
author: 'Jason Bayton'
excerpt: 'A closer look at Android Go, what makes it different from Android, and why the ecosystem finds it difficult to support. The goal is to provide a better understanding of Go, particularly in enterprise, but equally for consumer understanding as well.'
type: documentation
tags: 
    - General
eleventyExcludeFromCollections: true
layout: base.njk
permalink: false
eleventyNavigation:
  order: 22000
---

<div class="callout callout-info">

## Android Go & EMM support

Check out the post that led to diving deeper with Android Go [here](/blog/2022/08/android-go-emm) following VMware's announcement of official support for Android Go with Workspace One UEM following years of non-support.

</div>

Android Go, Google's resource-mindful, feature-limited version of Android for lower-end hardware has a fascinating history since its introduction in 2017, but one mostly hidden in the depths of AOSP commits and OEM-only accessible documentation. 

First intended for "low-RAM" devices, a label which has itself evolved over the years, Android Go is designed for hardware that would otherwise struggle tremendously running full-fat Android either due to very low storage, or very little RAM.

But what makes Android Go.. Go? Other than some limited public knowledge such as "optimisations" for low-RAM devices, and Google's suite of Go-versioned core applications, there's a lot more that happens behind the scenes to ensure low-RAM devices are able to function with passable performance and usability. Some of these changes, particularly useful to know for enterprise use, include: 

## Disabled features 
- Widget support
- Automatic screen dimming (callout for kiosk)
- Live wallpapers
- PiP
- Display over other apps permission



## `isLowRamDevice` flag
~ to research 
https://developer.android.com/reference/android/app/ActivityManager#isLowRamDevice()
https://developer.android.com/topic/performance/memory


## 32bit (pre 2GB)
~ to research

## ZRAM writeback & long-term flash concerns
Long-term deployment implications, higher TCO due to worn out flash? ~ to research

## Multi-user support & work profile support (11-)
In 11 managed_users became optional, WP not supported still
In 12, WP no longer referenced so 

## Limited background jobs, & data saver defaults
Implications for data-heavy applications and background services in enterprise usecases

## Mainline support
<13, fewer modules, lesser benefits

## Considerations for deploying Go in enterprise
Stuff here

## Closeout