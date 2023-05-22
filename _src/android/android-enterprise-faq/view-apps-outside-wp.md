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

There have been isolated instances where during enrolment the DPC could collect a list of personal applications installed before migrating into the work profile, however by the time enrolment completes this will have been rectified to display only the applications in the work profile.

As of Android 11 this answer also applies to COPE, work profiles on company owned devices.

