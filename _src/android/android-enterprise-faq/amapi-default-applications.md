---
title: "Can I control default applications through AMAPI?"
published: '2026-03-22'
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
  parent: 'Android Enterprise FAQ'
  order: 68000
sources:
  - https://developers.google.com/android/management/default-application-settings
  - https://www.androidenterprise.community/blog/news/product-update-new-management-api-features-restrict-default-apps-and-set-role-ba/13299
---
Yes. The Android Management API now supports managing default application settings on managed devices.

Administrators can configure a prioritised list of apps for each default app type (such as browser, phone dialler, SMS, and others). The system evaluates the list in order and sets the first installed and qualified app as the default. If no app from the list is available, the existing default is retained.

Optionally, administrators can also prevent end users from changing the default app selection, ensuring the organisation's preferred apps remain in use.

This is particularly useful for:

- Enforcing a corporate browser as the default across a managed fleet
- Ensuring a specific phone or messaging app is always the default on dedicated devices
- Preventing users from switching to unsanctioned alternatives for key app categories

Prior to this feature, default app management through AMAPI required workarounds such as OEMConfig policies or was not possible at all, leaving it to end-user choice.
