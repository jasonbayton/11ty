---
title: "Does Android Auto work on fully managed devices?"
published: '2026-03-25'
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
  order: 35000
sources:
  - https://developer.android.com/training/cars
  - https://support.google.com/androidauto/answer/6348019
---
It depends on the management configuration.

On a fully managed device, Android Auto requires the following to function:

1. **Android Auto** (or the built-in car projection service) must not be blocked through app allowlisting/blocklisting policies
2. **USB connections** must be permitted if using a wired connection. Some EMM policies disable USB data access, which will prevent Android Auto from connecting
3. **Bluetooth** must be permitted if using wireless Android Auto

The most common cause of Android Auto not working on fully managed devices is an overly restrictive app policy. If the organisation uses an app allowlist (only approved apps can run), Android Auto and its required companion services must be explicitly included.

For COPE (work profile on company-owned) devices, Android Auto runs in the personal profile by default and is generally unaffected by work profile policies.

If Android Auto fails to connect, check the EMM console for USB, Bluetooth, or app restriction policies that may be interfering.
