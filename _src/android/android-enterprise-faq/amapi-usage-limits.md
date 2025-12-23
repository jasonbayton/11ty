---
title: "My AMAPI project returns a usage limit error, why?"
published: '2025-12-23'
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
  order: 40000
--- 
If you see errors similar to:

- Since your organization has reached its usage limits, this device can’t be set up
- Organization reached its usage limits, your work profile can't be set up

..or any message similar to the above, this will be due to Google's choice to prevent anyone from using the Android Management API without business justification & approval.

Older projects, those created in early 2025 or prior, may only see this in relation to an unverified project exceeding 500 devices. In all cases the approach to unlock AMAPI for your organisation is to read, accept, and submit a quota increase form via the Permissible Usage page under AMAPI Guides:

[https://developers.google.com/android/management/permissible-usage#quotas_and_restrictions](https://developers.google.com/android/management/permissible-usage#quotas_and_restrictions)

This process can take multiple weeks, so patience is required. It is imperative not to progress with development or engagements prior to approval being given.

Also note, approval for a quota does not mean product verification. Quotas still remain after approval is given. Verification is undertaken through the Android Enterprise Partner Portal.