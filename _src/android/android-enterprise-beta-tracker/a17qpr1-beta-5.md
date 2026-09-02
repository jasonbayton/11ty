---
title: 'QPR1 Beta 5 - CP31.260608.007'
parent: 'Android Enterprise Beta Tracker'
published: '2026-06-25'
date: '2026-06-25T00:00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: ['Android Enterprise Beta Tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise Beta Tracker']
layout: base.njk
eleventyNavigation:
    title: 'QPR1 Beta 5'
---

**Track:** QPR1 Beta | **Milestone:** September 2026 stable

One of the largest enterprise builds tracked so far. Introduces the data leak prevention framework, policy namespace classes, scoped certificate management, and the foundation for policy engine V2.

## DPC capabilities

- **Data leak prevention framework** (provisional) - nine new classes landed for defining DLP rules at the app level. This mirrors the DLP approach used on ChromeOS, where administrators define rules that allow, block, or redact content based on the source and destination. The Android version works with package names rather than URLs. The enforcement path landed later in QPR2 Beta 3
- **Scoped certificate removal and query** (provisional) - DPC apps can now remove and query certificates scoped to either the user or the device, rather than operating globally. This is the start of the scoped key pair management feature
- **Cross-profile widget providers** - the policy for controlling which apps can provide widgets across the work/personal boundary graduated to the public API. The older per-package methods are now deprecated in favour of a set-based approach

## Other enterprise changes

- **Policy namespace classes** - new namespace classes for `AdvancedSecurityOverrides`, `DeviceConnectivityManagement`, and `DateTime` group related policies together, rather than keeping them all in a flat list. This is a structural improvement that scales to the volume of policies expected as Android and ChromeOS management converge
- **Policy engine V2 foundation** (provisional) - a master `policyEngineV2` flag and 27 per-policy migration flags appeared, all still off. These gate the next generation of the policy engine that will handle routing policies through either the V1 or V2 path
- **Untrusted apps policy** (provisional) - a new typed policy for controlling untrusted app installation
- **Play Protect verification policy** (provisional) - a new typed policy for controlling Play Protect's verify apps setting
- **Physical SIM management** (provisional) - a new permission for managing physical SIM policies, granted to the supervision role
- **Common criteria mode** (provisional) - a new typed policy definition for Common Criteria mode with proper multi-admin resolution
- **OS build compatibility check** - the `STATUS_HEADLESS_SYSTEM_USER_MODE_REQUIRED` constant was renamed to `STATUS_INCOMPATIBLE_OS_BUILD`, broadening its meaning beyond headless mode
- **Three new permissions** (provisional) - registered for assist content, cellular data usage, and physical SIM management - each gated behind a still-false flag
- **Content safety role behaviour** - the content safety role gained a dedicated behaviour class
- **Permitted input methods graduated** - the permitted input methods intersection policy graduated and was removed (flag and method both deleted), meaning it is now the default behaviour
