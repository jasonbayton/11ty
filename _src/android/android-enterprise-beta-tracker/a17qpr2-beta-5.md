---
title: 'Android 17 QPR2 Beta 5 - CP41.260828.004.A8'
parent: 'Android Enterprise build tracker'
published: '2026-09-17'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes', 'aebt-android-17', 'aebt-qpr2', 'aebt-beta']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 QPR2 Beta 5'
---

**Track:** QPR2 Beta | **Predecessor:** [QPR2 Beta 4](/android/android-enterprise-beta-tracker/a17qpr2-beta-4/) | **Milestone:** December 2026 stable

The kiosk user type gets a rename with broader semantics, three new typed policies extend the streamlining effort, and device controllers gain scaffolding for programmatic reboots.

**DPC capabilities**

- **Content capture restriction** (provisional) - a new DLP policy controls whether content capture (screen recording, accessibility-based capture) is permitted on managed devices. This sits alongside existing screen capture and assist content restrictions in the data leak prevention namespace
- **Wi-Fi Direct control** (provisional) - administrators will be able to allow or block Wi-Fi Direct connections through the typed policy engine. Wi-Fi Direct was previously unmanaged
- **First-use hints** (provisional) - already flagged in Beta 4, the backing policy identifier and constants are now in place for controlling first-use hints via the policy engine
- **Device controller reboot** (provisional) - a new permission is registered for the device controller role. When enabled, device controllers will be able to programmatically reboot managed devices

**Other enterprise changes**

- **Kiosk renamed to dedicated task** - the kiosk user type is now called "dedicated task", signalling a semantic broadening from single-app kiosk mode to a more general-purpose dedicated task user type. Worth watching for how this surfaces in AMAPI kiosk provisioning
- **Session-scoped policy propagation** - a new session-active propagation rule appeared in the policy engine alongside the existing device-wide, user-scoped, and inheritable profile rules. This likely supports login screen and kiosk session policy enforcement, building on the login screen policy scope introduced in Beta 1
- **Multi-user provisioning hardened** - a standalone precondition checker now validates multi-user managed device provisioning with explicit error codes covering setup completion, incompatible accounts, OS build requirements, and device management role holder status
- **Headless system user login screen** - a new method detects whether the device is configured to use the headless system user as a login screen, advancing shared device UX. Still behind a test flag
- **Security log improvements** - security events gained a method for efficient duplication and an enhanced redaction overload that supports flexible per-user event filtering
- **App interaction access management** - the manage access activity in PermissionController is now exported with an intent filter for managing interactor target access, completing the agent-to-interactor terminology rename and enabling external apps to manage app interaction permissions
