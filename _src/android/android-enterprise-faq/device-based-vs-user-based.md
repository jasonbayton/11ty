---
title: "What’s the difference between device based accounts and user based accounts?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "What’s the difference between device based accounts and user based accounts?"
  order: 15000
sources:
  - https://developers.google.com/android/work/play/emm-api/user-accounts
  - https://developers.google.com/android/work/play/emm-api/v1/users
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.enrollmentTokens
---

The account type chosen for an Android Enterprise deployment determines how managed Google Play accounts are created, how many devices a single account can serve, and - on Play EMM API-backed platforms - whether an incorrect choice could cap enrolment at ten devices.

This distinction applies to **managed Google Play accounts** - the Google-account flavour created automatically as part of Android Enterprise enrolment. Google Workspace deployments can avoid the switch entirely by authenticating users with their Workspace identity, but if "authenticate with Google" is disabled, the same managed Google Play account model (and the same device/user choice) applies.

## The two account types

**User-based accounts** are tied to an EMM user identity. The same managed Google Play account is reused across every device that user enrols, so app entitlements, history, and approvals follow the user from device to device.

**Device-based accounts** are created per device. Each device gets its own unique, throwaway managed Google Play account with no concept of a human owner. Two devices enrolled "by the same user" receive two completely separate Google accounts.

<div class="callout callout-blue">
<div class="callout-heading">The 10-device rule</div>
A single managed Google Play account can be registered on a maximum of 10 devices at once. This is a hard Google-enforced limit. User-based accounts reuse the same account across all of a user's devices, so an EMM user who needs to enrol more than 10 devices under one identity is expected to fail on the eleventh unless the EMM has been configured to create device-based accounts for that scenario.
</div>

## When each is appropriate

### Use device-based accounts for

- **Dedicated / kiosk / COSU** deployments, where no human identity is associated with the device
- **Fully managed corporate-owned** devices in most real-world fleets
- **Bulk / staging enrolment**, where one operator enrols hundreds of devices under their own EMM login before handing them out
- **Rugged, shared-use, and shift-worker** devices that pass between multiple humans
- Any scenario where a single EMM user account will enrol more than 10 devices

### User-based accounts are appropriate for

- **BYOD work profile** deployments where the device belongs to a named individual and per-user Play entitlements or app purchase continuity matter
- **1:1 corporate-owned work profile** where the human-to-device mapping is permanent
- Deployments small enough that the 10-device limit will never be hit per user

In practice, most modern deployments default to device-based accounts unless there is a specific reason to preserve per-user Play state.

## How this works across management APIs

### Android Management API (AMAPI)

AMAPI abstracts this decision away from administrators. Managed Google Play accounts are created and destroyed as part of the device provisioning lifecycle, and the `user` field on the [enrolment token](https://developers.google.com/android/management/reference/rest/v1/enterprises.enrollmentTokens) is **deprecated and ignored** - EMMs no longer control account grouping at the API level.

In practice, AMAPI-based EMMs create a fresh per-device account for fully managed and dedicated deployments, and create a single account tied to the named user for BYOD work profile enrolments. The behaviour is determined by the enrolment flow the EMM exposes (corporate-owned vs personally-owned), not by an administrator-facing toggle. Check your EMM's documentation if you need to confirm what it does for a given enrolment type.

### Play EMM API (custom DPC)

Custom DPC / Play EMM API platforms - think older Ivanti EPMM, AirWatch/Omnissa Workspace ONE, MaaS360, and similar - handle this explicitly. The EMM calls `Users.insert` (or `generateAuthenticationToken` flows) with an `accountIdentifier` it chooses, and whether that identifier represents a human user or an ephemeral device account is the EMM's implementation choice. This is where the setting is usually exposed to administrators as a literal "device-based vs user-based" toggle.

### Google Workspace deployments

When the bind is established with a Google Workspace domain and authenticate with Google is turned on, devices are associated with Workspace user accounts directly. If authenticate with Google is disabled, it follows the path of the approaches listed above. 

The 10-device cap also applies here. So be mindful that users may over time need to [remove old devices from their Google accounts](https://myaccount.google.com/device-activity).