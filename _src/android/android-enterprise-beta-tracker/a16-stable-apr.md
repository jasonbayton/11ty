---
title: 'Android 16 April stable - CP1A.260405.005'
parent: 'Android Enterprise build tracker'
published: '2026-04-20'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 16 April (baseline)'
---

**Track:** Android 16 stable | **Note:** this is the baseline build used for comparison when tracking Android 17 changes

The Android 16 April stable release serves as the comparison baseline for this tracker. Enterprise-relevant items here represent the stable production state against which Android 17 beta changes are measured.

**Key enterprise state at this baseline**

- **42 flags graduated** - a large batch of feature flags moved from runtime delegation to hardcoded enabled, including app restriction coexistence, password reset with token coexistence, onboarding bug report storage fixes, and managed profile removal
- **Dedicated device control API** shipped enabled
- **Policy size tracking** shipped enabled, letting administrators monitor policy quota usage
- **Device admin feature checks removed** - the flag for removing legacy device admin feature checks shipped enabled, simplifying the admin API surface
- **String-keyed policy API** - an A16-only generic policy API using string keys (`clearPolicy`, `getIntegerPolicy`) was present. This approach was superseded by the typed `PolicyIdentifier` approach in Android 17
- **Handoff restriction** - the `DISALLOW_HANDOFF` user restriction (A16 naming) was present, later renamed to `DISALLOW_TASK_CONTINUITY_HANDOFF` in Android 17
- **Policy transparency v2** (provisional) - a flag for the next generation of the policy transparency engine
- **Package as admin ID** (provisional) - a flag for using package names as admin identifiers
- **Multi-user provisioning** (provisional) - a flag for user-level multi-user provisioning
