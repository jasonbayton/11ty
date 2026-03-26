---
title: "Can organisations see applications outside of the work profile?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Work profile
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "Can organisations see applications outside of the work profile?"
  order: 17000
--- 
No. 

User applications and app data residing outside of the work profile are not visible to the DPC within a work profile. System applications are, however once again the data associated with the apps is separately stored, meaning personal account details associated with Gmail would not show up alongside a corporate exchange account within the EMM.

On devices running Android 10 and earlier, there were isolated instances where during enrolment the DPC could briefly collect a list of personal applications installed before migrating into the work profile. This behaviour was addressed and is no longer possible from Android 11 onwards.

As of Android 11 this answer also applies to COPE, work profiles on company owned devices.

