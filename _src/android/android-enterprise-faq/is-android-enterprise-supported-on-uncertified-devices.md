---
title: 'Is Android Enterprise supported on uncertified (non-GMS) devices?'
published: '2019-04-26T16:39:55+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: 'Is Android Enterprise supported on uncertified (non-GMS) devices?'
  order: 0000
---
Officially no, these devices are not supported for Android Enterprise. These devices may also be referred to as AOSP, and an excellent example of an uncertified, AOSP device is the Kindle Fire.

Unofficially without GMS certification modern Android devices do allow for limited Android Enterprise management with an EMM that supports [closed network or non-GMS management](/2019/08/vmware-ws1-uem-1908-supports-android-enterprise-enrolments-on-closed-networks-and-aosp-devices/), or a custom DPC that directly interfaces the Device Policy Manager (DPM) APIs on the Android device. Your mileage may vary on what is possible, but assume that account and application based functionality that leans on Google Play services, Google Play, or any other aspect of the GMS suite of applications will not work.

Furthermore, standard provisioning methods will not work, as these are provided by Google's Set Up Wizard (SUW) flow. The only option, unless the AOSP device OEM implements a different solution, is to set an application as a Device Owner (DO) through ADB.