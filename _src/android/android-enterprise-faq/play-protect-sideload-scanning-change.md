---
title: "Has Play Protect changed how it handles sideloaded apps on managed devices?"
published: '2026-03-23'
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
  order: 65000
---
Yes. As of September 2024, Google Play Protect no longer sends sideloaded applications for cloud scanning on enterprise-managed devices.

### What changed?

Previously, when an app was installed outside of Google Play or managed Google Play (including apps pushed by an EMM's own installer), Play Protect would prompt the user to send the app to Google for scanning. This was an additional layer of protection beyond on-device detection.

Google removed this behaviour on managed devices in response to enterprise feedback. Organisations raised concerns about private, internally developed applications being uploaded to Google's servers for analysis - a data handling concern for security-conscious environments.

### Does this reduce security?

Partially. On-device Play Protect detection continues to function. Known malicious applications will still be flagged and may be removed regardless of how they were installed. What has changed is that unknown apps (those not in Google's database) are no longer sent for cloud-based analysis on managed devices.

For most enterprise deployments where apps are distributed through managed Google Play or a trusted internal pipeline, this change has minimal practical impact. Organisations that rely heavily on sideloaded apps from less controlled sources should consider additional endpoint security measures.

### Does this affect unmanaged devices?

No. On personal (unmanaged) devices, Play Protect continues to offer the cloud scanning prompt for sideloaded apps as before.

**Sources:**
- [Google Play Protect no longer sends sideloaded applications for scanning on enterprise-managed devices](https://bayton.org/blog/2024/09/play-protect-changes-2024/) - bayton.org
- [Google Play Protect - Android Enterprise Help](https://support.google.com/work/android/answer/15162069)
