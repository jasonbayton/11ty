---
title: "Devices factory reset as soon as they’re enrolled, why?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Fully managed
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "Devices factory reset as soon as they’re enrolled, why?"
  order: 24000
--- 
Normally this would suggest either the respective Android Enterprise configurations aren’t assigned to the device, or there’s an issue with the binding between the EMM and Google.

Ensure the user of the device is in the correct Active Directory group (if relevant) or EMM group to receive the correct profiles, otherwise check the binding.

Occasionally and with some EMMs this may also happen if more than one device is enrolled with the same Device Identifier, e.g.: Serial Number or IMEI. Validate all Device Identifiers are unique (at least within an OEM/model) as it's not uncommon to see duplicates in the wild.

**Other considerations:**

- **Invalid or expired enrolment token/code** - Enrolment codes/tokens may have a configurable expiry. If the token used during provisioning has expired, the device may reset rather than enrol. Regenerate the token and try again
- **Compliance policy mismatch** - if the device fails a compliance check immediately upon enrolment (for example, the OS version is below the minimum required by policy), some EMM configurations will trigger an immediate wipe rather than placing the device into a non-compliant state
- **Sign-in URL misconfiguration** - an incorrectly configured sign-in URL can cause the provisioning flow to fail after the initial setup steps, resulting in a reset
- **Missing policy** - As described above, if a device is missing a policy - particularly in AMAPI - it will wipe after a period of time.

