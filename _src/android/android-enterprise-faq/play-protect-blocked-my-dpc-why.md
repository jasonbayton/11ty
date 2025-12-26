---
title: "Play Protect blocked my DPC, why?"
published: '2025-12-27'
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
  order: 64000
---
Google Play Protect now enforces an allowlist of approved Device Policy Controllers (DPCs) during provisioning. If your DPC isn’t on the list, Play Protect can flag it as “Harmful app blocked” even when it’s legitimate.

Before you appeal:
- Align to the [Play Protect unwanted software](https://developers.google.com/android/play-protect/mobile-unwanted-software) and [warning dev guidance](https://developers.google.com/android/play-protect/warning-dev-guidance): be transparent, avoid silent installs, and justify sensitive permissions (SMS, notifications, accessibility, overlays).
- Make sure your use case fits Google’s permissible usage for enterprise management. If you don’t need a sensitive permission, remove it while you apply.

Then submit an appeal using Google’s DPC allowlist form (linked from the Play Protect warning/help article). Explain the business use case, the permissions you request, and how users are informed. While waiting, advise users/admins that the warning is about allowlisting, not malware, and that the “continue” option may appear if permitted in your flow.

Read more on this can be read in the full article: [The DPC allowlist](/blog/2025/12/the-dpc-allowlist/).
