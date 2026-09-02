---
title: 'A16 QPR3 Canary 1 - ZP11.260220.007'
parent: 'Android Enterprise Beta Tracker'
published: '2026-04-14'
date: '2026-04-14T00:00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: ['Android Enterprise Beta Tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise Beta Tracker']
layout: base.njk
eleventyNavigation:
    title: 'A16 QPR3 Canary 1'
---

**Track:** A16 QPR3 Canary (SDK 36.1) | **Note:** the first build processed by this tracker

The earliest build tracked, running on the Pixel 7 before the tracker switched to the Pixel 10. This canary sits on the Android 16 QPR3 branch and contains forward-looking enterprise plumbing.

## What appeared

- **Cross-user suspension** (provisional) - a new flag for suspending apps across user profiles, relevant for shared device scenarios where an admin needs to disable an app for all users simultaneously
- **Managed device definition extended** (provisional) - a flag for broadening what counts as a "managed device" beyond traditional device owner or profile owner
- **Enforcing admin extras** (provisional) - two flags for exposing additional information about which admin is enforcing a policy, later graduated in QPR2 Beta 1
- **Several flags removed** from the canary track that had previously been present in the Beta 3 baseline
