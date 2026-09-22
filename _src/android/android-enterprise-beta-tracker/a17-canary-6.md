---
title: 'Canary 6 - ZP11.260821.010'
parent: 'Android Enterprise build tracker'
published: '2026-09-21'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes', 'aebt-android-17', 'aebt-canary']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 Canary 6'
---

**Track:** Canary | **Predecessor:** [Canary 5](/android/android-enterprise-beta-tracker/a17-canary-5/) | **Note:** canary builds are forward-looking and may not ship in the next stable release

A policy expansion canary that adds nine new flags, lands task continuity handoff enforcement, and refactors the network logging handler for thread safety.

**DPC capabilities**

- **Nine new policy flags** (provisional) - all gated at `false`, covering device controller reboot (`allowDeviceControllerReboot`), security logging for login attempts and package failures, policy streamlining for support messages, first-use hints, and task continuity handoff, plus multi-user and network log streaming scaffolding. These are new on the canary track - several also appeared independently on QPR2 Beta
- **Task continuity handoff enforcement** (provisional) - the `CrossDevice.TASK_CONTINUITY_HANDOFF` handler landed in PolicyHandlerFactory, mapping the `policyStreamliningTaskContinuityHandoff` flag to the `no_task_continuity_handoff` user restriction. This completes the enforcement plumbing for controlling cross-device task handoff via the typed policy engine
- **Certificate selection suppression rolled back** - `keychainSuppressCertificateSelections` flipped from `true` back to `false`. This had been enabled on canary since canary 4; the rollback suggests the feature needs further work before graduation

**Other enterprise changes**

- **Network logging handler thread-safety refactor** - the entire `NetworkLoggingHandler` was rewritten from `synchronized` blocks to a handler-thread-only pattern with `checkHandlerThread()` assertions. All public methods now post to the handler thread. This improves batch collection reliability but is not a feature change - canary remains batch-only for network logging
- **Management app abstraction broadened** - `notifyDeviceOwnerOrProfileOwner()` renamed to `notifyDeviceManagementApp()`, reflecting the shift from device owner/profile owner to the broader device management app concept
- **Delegation authorisation simplified** - the event-logging authorisation wrapper was removed from the device policy manager service. Delegation scope checks are now cleaner direct authorisation calls without the intermediate audit layer
- **Headless system user login screen detection** (provisional) - new `isHeadlessSystemUserLoginScreen()` method for detecting HSU-as-login-screen configuration. Still behind a test flag
- **MTE validation standardised** - Memory Tagging Extension hardware checks now throw `ServiceSpecificException` instead of `UnsupportedHardwareException`, aligning with standard Android service error patterns
- **RCS message restrictions now feature-flagged** - restricted RCS message access in the permission controller moved from static SDK version gating to a runtime feature flag, allowing the restriction to ship independently of the platform version
- **Recursive overlay app list resolution unchanged** - `isRecursiveRequiredAppMergingEnabled` remains enabled on canary, carrying forward from canary 5

**Cross-track note:** the canary and QPR2 Beta tracks continue to diverge in several areas. The beta track has streaming network log scaffolding, content capture and Wi-Fi Direct typed policies, and an affiliation ID permission gate that are not present on canary. Conversely, canary carries `crossUserSuspensionEnabledRo` and `isRecursiveRequiredAppMergingEnabled` at `true` whilst the beta track still has them gated. The kiosk user type naming also differs - canary uses `USER_TYPE_FULL_KIOSK`, beta uses `USER_TYPE_FULL_DEDICATED_TASK`. These are independent branch choices, not directional changes.
