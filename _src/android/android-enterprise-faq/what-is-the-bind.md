---
title: 'What is the Android Enterprise bind?'
published: '2023-05-13'
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
  order: 6998
sources:
  - https://support.google.com/work/android/answer/7042221
  - https://developers.google.com/android/management/create-enterprise
  - https://developers.google.com/android/work/play/emm-api/create-enterprise
--- 
The bind is the process of linking your organisation to an EMM platform through Google, creating an `enterprise` that enables Android Enterprise management. Without it, the EMM has no way to distribute apps through managed Google Play, create managed accounts on devices, or access enterprise features like zero-touch enrolment.

Android Enterprise consists, simplistically, of three aspects:
1. the on-device management APIs
2. the advanced account, application, and Play Protect functionality
3. additional solutions such as zero-touch, and many more third-party offerings

To leverage 2 and 3, an enterprise is required. The bind creates this enterprise, generates the authentication tokens your EMM needs, and assigns an **enterprise ID** (also called an organisation ID) - an alphanumeric identifier, typically prefixed with `LC`, that uniquely identifies your Android Enterprise tenant. This ID is what links your EMM, your approved apps, and your enrolled devices together.

## Enterprise types

There are two types of enterprise, and they determine how your bind is managed:

**Managed Google domain** (recommended) - the enterprise is tied to a domain (e.g. company.com) managed through the [Google Admin console](https://admin.google.com). This provides role-based access, MFA enforcement, SSO integration, and the ability to bind multiple EMMs simultaneously. From 2024, all new organisations completing the bind process are provided with a managed Google domain at no cost by default.

**Managed Google Play Accounts** (legacy) - the standard approach up to 2025, where a personal Google account (a Gmail address or any email set up as a Google account) was used to create and manage the enterprise. Administration is limited to the admin and owner roles available through `play.google.com/work/adminsettings`, without the broader identity governance, SSO integration, or multi-EMM binding that a managed Google domain provides. The managed Google Play Accounts signup method is deprecated in favour of managed Google domains.

Organisations on the older model can [upgrade to a managed Google domain](/android/android-enterprise-faq/what-is-managed-google-domain/) at no cost and without disrupting enrolled devices or approved apps.

## What the bind enables

Once the enterprise exists, the EMM can:

- Create, maintain, and delete managed Google Play accounts for enrolled devices
- Assign accounts to devices - either [user-based or device-based](/android/android-enterprise-faq/device-based-vs-user-based/) depending on the deployment model
- Approve and deploy applications through managed Google Play
- Push [managed configurations](/android/android-glossary/#managed-configurations) to supported apps
- Register devices for [zero-touch enrolment](/android/what-is-android-zero-touch-enrolment/)
