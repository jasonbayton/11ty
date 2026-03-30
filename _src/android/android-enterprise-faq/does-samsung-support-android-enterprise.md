---
title: 'Does Samsung support Android Enterprise?'
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
  key: 'Does Samsung support Android Enterprise?'
  order: 1000
---
Yes, fully.

Samsung has supported Android Enterprise since Android 5.0 (Lollipop), offering work profile, fully managed, dedicated, and COPE deployment scenarios through any compatible EMM.

From Android 8.0 and Knox 3.0, Samsung further integrated its Knox management platform with Android Enterprise. The Knox Workspace container, for example, uses the Android Enterprise Profile Owner APIs rather than a proprietary implementation. This means managing a Samsung device through Android Enterprise also gives access to the Knox layer underneath.

Samsung devices support all standard Android Enterprise provisioning methods, including [zero-touch enrolment](/android/what-is-android-zero-touch-enrolment/) (added in [late 2020](/2020/11/google-announce-big-changes-to-zero-touch/)) and Samsung's own [Knox Mobile Enrolment (KME)](/android/android-enterprise-faq/samsung-zero-touch/) service. Organisations can use either, though configuring both on the same device is not supported.

### Knox Platform for Enterprise (KPE)

KPE extends Android Enterprise with Samsung-specific capabilities - granular hardware controls, advanced networking, kiosk customisation, firmware management, and more. KPE Premium licences are provided at no cost, but they must be activated for KSP policies to take effect.

KPE features are accessed through the Knox Service Plugin (KSP), Samsung's [OEMConfig](/android/what-is-oemconfig/) implementation. KSP works with any EMM that supports managed app configurations.

### Knox SDK changes on newer Android versions

From Android 15, several Knox SDK APIs are restricted to apps running as Device Owner or Profile Owner only. From Android 16, **all** Knox SDK APIs require the Android Enterprise management framework. Legacy Device Administrator deployments on Samsung devices will lose Knox functionality entirely on Android 16 and later.

