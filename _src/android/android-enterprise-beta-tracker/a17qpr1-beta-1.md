---
title: 'QPR1 Beta 1 - CP31.260403.005.A1'
parent: 'Android Enterprise build tracker'
published: '2026-04-23'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 QPR1 Beta 1'
---

**Track:** QPR1 Beta | **Milestone:** September 2026 stable

The first QPR1 build, laying groundwork for clipboard policy, factory reset protection improvements, and the policy serialisation framework.

**DPC capabilities**

- **Universal clipboard policy** (provisional) - new constants and a permission for controlling clipboard sharing across devices. The policy defines allowed and disallowed states, though no DPM API or enforcement path is wired up yet - this is scaffolding
- **Key generation failure constant** - a new constant for key generation failures provides clearer error reporting when certificate key pair generation fails

**Other enterprise changes**

- **Factory reset protection hardening** (provisional) - a new flag for hardening the active FRP check, aiming to strengthen post-wipe management continuity on managed devices
- **User wipe broadened** (provisional) - the flag controlling device wipes when a user cannot be removed was renamed from a narrow "last admin" scope to a broader "user that cannot be removed" scope, covering more edge cases on shared devices
- **Policy serialisation framework** - initial serialisers for package-level policies landed, establishing the plumbing for typed policy persistence. These were later replaced by a more robust handler in Beta 2
- **DPM role qualification tightened** - the device policy management role holder qualification bypass was tightened to only apply during multi-user management, rather than a generic "device managed" check
- **Watch strong auth timeout** (provisional) - a new flag for increasing the strong authentication timeout on watches, relevant for wearable enterprise deployments
