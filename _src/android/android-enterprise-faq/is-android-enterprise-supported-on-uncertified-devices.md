---
title: 'Is Android Enterprise supported on uncertified (non-GMS) devices?'
published: '2019-04-26T16:39:55+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
    - General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: 'Is Android Enterprise supported on uncertified (non-GMS) devices?'
  order: 0000
---
Officially no, these devices are not officially supported for Android Enterprise and therefore would be expected to be managed using the legacy and [mostly deprecated](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/) Device Admin APIs. These devices may also be referred to as AOSP, and an excellent example of an uncertified, AOSP device is the Kindle Fire.

Unofficially without GMS certification modern Android devices do allow for limited Android Enterprise management with an EMM that supports [closed network or non-GMS management](/2019/08/vmware-ws1-uem-1908-supports-android-enterprise-enrolments-on-closed-networks-and-aosp-devices/), but your mileage may vary.

