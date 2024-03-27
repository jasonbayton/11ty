---
title: 'Why has USB data access been disabled suddenly?'
published: '2024-01-25'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Fully managed
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: 'Why has USB data access been disabled suddenly?'
  order: 1100
--- 
EMMs leveraging the Android Management API (AMAPI) are subject to the default policy requirements Google sets. In February 2024 Google adjusted the default, unset behaviour for `UsbDataAccess` from `ALLOW_USB_DATA_TRANSFER` to `DISALLOW_USB_DATA_TRANSFER`. If your policies did not previously explicitly allow USB data transfer, this function will be blocked on your managed devices. 

To reverse this, please set USB data transfer explicitly to allow, and redeploy your policies.
