---
title: 'QPR2 Beta 1 - CP41.260701.005'
parent: 'Android Enterprise Beta Tracker'
published: '2026-07-25'
date: '2026-07-25T00:00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: ['Android Enterprise Beta Tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise Beta Tracker']
layout: base.njk
eleventyNavigation:
    title: 'QPR2 Beta 1'
---

**Track:** QPR2 Beta | **Milestone:** December 2026 stable

The first QPR2 build, with a notable architectural change to the policy engine and several new policy areas.

## DPC capabilities

- **eSIM transfer query renamed** - the method for checking whether an eSIM can be transferred off-device was renamed to `isOutgoingEsimTransferAllowed`, clarifying its purpose
- **Policy enforcement attribution** - DPC apps can now query which admins are enforcing a given typed policy on a specific user, useful in multi-admin environments where understanding who set a policy matters
- **Developer options policy** (provisional) - a new typed policy for controlling developer options access, with allowed and disallowed states
- **Login screen policy scope** (provisional) - a new policy scope targets the login and lock screen context specifically, enabling policies that apply only before a user signs in

## Other enterprise changes

- **Policy metadata decentralised** - the monolithic policy definitions file was deleted and replaced by eight per-namespace supplier classes that load lazily. This modular approach scales to the volume of policies needed for platform convergence with ChromeOS
- **Three flags graduated** in this build: `enforcingAdminExtraEnabled`, `enforcingAdminGetComponentNameEnabled`, and `setTimeCoexistence`
- **Memory tagging policy** (provisional) - a new typed policy for controlling ARM Memory Tagging Extension (MTE) with enabled, disabled, and user choice states
- **Ethernet policy** (provisional) - a new permission for managing Ethernet state through the policy engine
- **Extended serial numbers** (provisional) - the enterprise-specific ID calculator now supports serial numbers longer than 16 characters
- **Lock screen message permission** renamed for consistency (from `LOCKSCREEN` to `LOCK_SCREEN`)
- **Pre-created users blocked** - creating users in advance now throws an exception when the feature is disabled, preventing unexpected user states
- **Policy type validation** - policy values are now validated for correct types before size checks, catching malformed policy data earlier
