---
title: 'What network requirements does Android Enterprise have?'
published: '2026-03-24'
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
  order: 7500
sources:
  - https://support.google.com/work/android/answer/10513641
  - https://www.androidenterprise.community/discussions/conversations/android-devices-unable-to-check-in-with-ms-intune/4245
  - https://developers.google.com/android/management/provision-device
---

Android Enterprise devices require access to several Google services in order to provision, receive policies, install applications, and maintain compliance. Organisations operating behind firewalls or with URL-filtering proxies need to ensure the following domains are accessible.

## Core requirements

At minimum, devices need access to:

- `*.google.com` - covers Google Play, managed Google Play, account services, and FCM (Firebase Cloud Messaging) for push notifications
- `*.googleapis.com` - API endpoints for device management and app distribution
- `*.gstatic.com` - static content delivery
- `*.android.com` - Android-specific services
- `play.google.com` / `play.google.com/work` - managed Google Play access
- `accounts.google.com` - authentication
- `fcm.googleapis.com` - push notifications for policy delivery

Google maintains the full and current list of required endpoints in the [Android Enterprise network requirements](https://support.google.com/work/android/answer/10513641) support article.

## EMM-specific requirements

In addition to the Google endpoints above, your EMM vendor will have their own set of required domains and ports. These vary by vendor and should be confirmed with your EMM documentation. Common examples include:

- Microsoft Intune: `*.manage.microsoft.com`, `*.microsoftonline.com`, and several others documented by Microsoft
- VMware Workspace ONE: device services endpoints specific to your tenant
- Google Endpoint Management: covered by the Google domains above

## Common pitfalls

- **Blocking `*.google.com` with narrow allowlisting** - some organisations attempt to allowlist only specific Google subdomains. This is fragile, as Google rotates and adds subdomains regularly. The broad `*.google.com` wildcard is strongly recommended
- **SSL inspection** - deep packet inspection or SSL decryption on managed device traffic can interfere with certificate pinning used by Google Play Services and the Android Device Policy app. If devices fail to check in or provision, consider exempting Android Enterprise traffic from SSL inspection
- **FCM (push notifications)** - if FCM is blocked, devices will not receive real-time policy updates and will fall back to periodic polling, resulting in significant delays in policy application
- **IP allowlisting** - Google rotates IP addresses regularly, it is more reliable to use hostname-based allowlisting

## Testing connectivity

If devices are failing to provision or check in, Google provides a [connectivity diagnostics](https://support.google.com/work/android/answer/10513641) guide. Many EMM platforms also include device-level connectivity checks in their diagnostics tools.

[MANAGED INFO HUB](/projects/splash/mi) also has an Android Enterprise connectivity check baked in for app-derived testing of endpoint accessibility.
