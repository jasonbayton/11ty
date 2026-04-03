---
title: "How does conditional access work with Android Enterprise?"
published: '2026-03-28'
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
  order: 70000
sources:
  - https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-android-for-work
  - https://developer.android.com/work/dpc/security
---
Conditional access allows organisations to gate access to corporate resources based on whether a device meets defined security and compliance requirements. The concept applies across EMM platforms, though the implementation and terminology varies.

**How it works**

The EMM evaluates the device against a compliance policy - checking signals such as OS version, security patch level, encryption status, root detection, and Play Protect status. The result (compliant or non-compliant) is shared with the identity provider (such as Microsoft Entra ID, Okta, or Google Workspace), which then permits or blocks access to corporate applications and data accordingly.

**Common compliance signals for Android Enterprise**

- Minimum OS version and security patch level
- Device encryption enabled
- Root/bootloader unlock detection (via Play Integrity or equivalent)
- Google Play Protect scanning enabled
- Device not jailbroken or rooted
- Minimum EMM agent version
- Password complexity requirements met
- No blocked applications installed (work profile scope)

**Deployment model considerations**

- **Work profile (BYOD)**: Compliance is evaluated within the work profile scope. Personal-side signals are limited by design - organisations cannot see personal applications or data
- **Fully managed**: Full device compliance is possible, including hardware attestation and broader policy evaluation
- **COPE**: Combines work profile isolation with company-owned device compliance, offering a middle ground
- **Dedicated devices**: Compliance targets device groups rather than user groups, since dedicated devices may not have user-associated accounts

**Device Trust**

For organisations wanting compliance signals without full EMM enrollment, [Device Trust from Android Enterprise](/android/android-enterprise-faq/what-is-device-trust/) provides over 20 device signals accessible via the AMAPI SDK. This enables zero-trust architectures where access decisions are made based on device posture without requiring a work profile or full management.

**Best practices**

- Start with report-only mode before enforcing conditional access policies, to identify devices that would be blocked
- Set realistic compliance windows - give users time to update before blocking access
- Communicate clearly to end users what compliance requirements exist and how to remediate
- Test across device manufacturers, as OEM-specific behaviours can affect compliance signal reporting
