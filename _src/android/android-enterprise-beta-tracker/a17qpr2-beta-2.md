---
title: 'QPR2 Beta 2 - CP41.260717.006'
parent: 'Android Enterprise build tracker'
published: '2026-08-06'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 QPR2 Beta 2'
---

**Track:** QPR2 Beta | **Milestone:** December 2026 stable

Security logging decomposition, scoped certificate management, and policy engine expansion.

**DPC capabilities**

- **Scoped certificate management** (provisional) - seven new methods let DPC apps manage certificates with explicit scope (user or device). Admins can grant, revoke, and query certificate access for both apps and Wi-Fi authentication, scoped to either the individual user or the whole device. Previously, certificate operations applied globally
- **Granular security logging** (provisional) - security logging splits from a single device-wide toggle into separate device-level and user-level policies. DPC apps will be able to enable security logging per user rather than all-or-nothing
- **User logout tracking** (provisional) - a new security log event captures when users log out, supporting audit requirements on shared devices

**Other enterprise changes**

- **Network logging is now user-aware** - network logging moves from tracking a single user to maintaining a set of active users, preparing for proper multi-user network audit
- **DLP verdict types expanded** - the data leak prevention verdict system gained a polymorphic structure with distinct allow, block, and redact outcomes, enabling more nuanced content-level DLP decisions
- **Policy engine expansion** (provisional) - eleven new policy identifiers registered across content protection, eSIM transfer, factory reset, Easter eggs, device security logging, user security logging, Bluetooth sharing, Wi-Fi local-only hotspot, and more - all still gated
- **Connectivity policies restructured** - the device connectivity management namespace gained inner classes for USB, mobile networks, VPN, and Wi-Fi, grouping related policies by domain
- **Policy default values** - the policy metadata system now supports explicit default values per policy, simplifying migration and resolution
- **Kiosk user type helper** - a new utility method identifies kiosk user types, replacing a deprecated approach
- **Eight new flags** (provisional) - covering content protection, security logging, Wi-Fi hotspot policy, user logout logging, XDR reporting, and more - all still gated
