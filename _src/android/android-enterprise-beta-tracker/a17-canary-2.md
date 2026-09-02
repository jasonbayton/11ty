---
title: 'Canary 2 - ZP11.260320.008'
parent: 'Android Enterprise Beta Tracker'
published: '2026-04-20'
date: '2026-04-20T12:00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: ['Android Enterprise Beta Tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise Beta Tracker']
layout: base.njk
eleventyNavigation:
    title: 'Canary 2'
---

**Track:** Canary | **Note:** canary builds are forward-looking and may not ship in the next stable release

Establishes the multi-user provisioning state machine and moves supervision APIs to a dedicated manager.

## DPC capabilities

- **Multi-user device provisioning** - a complete provisioning flow for shared and multi-user devices: start provisioning, provision a managed user, and query the provisioning state (unmanaged, provisioning, or provisioned). This is the foundation for shared device management
- **DPM role qualification** - a new method lets DPC apps check whether a package is qualified for the device policy management role, enabling self-checks during setup

## Other enterprise changes

- **Provisioning state machine** - provisioning state is now persisted as an XML element, surviving reboots. Three defined states: unmanaged, provisioning in progress, and provisioned
- **Supervision moved** - supervision-related methods moved from `DevicePolicyManager` to a dedicated `SupervisionManager`, with feature flags controlling the migration. This cleans up the DPM API surface
- **Permission controller extracted** - the Google permission controller was extracted from its APEX module, enabling more frequent enterprise-related updates
- **Policy metadata framework** - `PolicyDefinitionFactory.buildAll()` landed for metadata-driven policy registration, alongside `EnumStoredAsBooleanPolicyHandler` for handling enum policies backed by boolean storage. These are foundational policy engine components
- **Least recent resolution** - a new policy resolution mechanism picks the least recently set value, adding to the existing most-restrictive and union-based approaches
- **Several policy streamlining flags** (provisional) - flags appeared for app install/uninstall, auto-timezone, keyguard status, lockscreen message, Easter eggs, and screen capture - all still gated
