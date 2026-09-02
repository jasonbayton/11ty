---
title: 'Canary 5 - ZP11.260717.006'
parent: 'Android Enterprise build tracker'
published: '2026-08-10'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 Canary 5'
---

**Track:** Canary | **Note:** canary builds are forward-looking and may not ship in the next stable release

Introduces the registered app store role and content restriction enforcement.

**DPC capabilities**

- **Registered app store role** - a new non-exclusive, invisible role allows qualifying app stores to install packages as a registered source. This is paired with the new `DISALLOW_INSTALL_UNKNOWN_SOURCES_INCLUDING_REGISTERED_APP_STORES` restriction (landed in QPR2 Beta 3), giving administrators a stricter sideloading option that also blocks registered stores
- **Content restriction enforcement** - the content safety apps policy gained its enforcement path, actually pushing content safety app lists to the restriction manager. This was canary-only here but landed in the QPR2 track in Beta 3
- **Secure ADB role bypass** enabled in the canary track (later graduated to QPR2 Beta 4)

**Other enterprise changes**

- **Policy handler refactoring** - new `PolicyHandler`, `PolicyValidator`, and `PolicyHandlerFactory` classes replace inline policy logic, moving toward a cleaner typed handler lifecycle
- **Permission checking decoupled** - a new interface for permission checks decouples enforcement from the device policy manager service, improving testability
- **Login screen policy stub** - a stub for setting login screen policies appeared, confirming this scope is under active development (the constant `POLICY_SCOPE_LOGIN_SCREEN = 4` landed in QPR2 Beta 1)
