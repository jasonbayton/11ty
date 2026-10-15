---
title: "What is the difference between password quality and password complexity?"
published: '2026-07-13'
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
  order: 74000
sources:
  - https://developers.google.com/android/management/reference/rest/v1/PasswordRequirements
  - https://developers.google.com/android/management/password-policies-quality
  - https://developer.android.com/work/versions/android-12
  - https://bayton.org/blog/2022/12/android-12-password-complexity-changes/
---
Android Enterprise offers two approaches to password enforcement and they are a common source of confusion: **password quality** (the original, granular model) and **password complexity** (the newer, simplified model introduced with Android 12).

### Password quality (granular)

Password quality uses `passwordQuality` in the AMAPI policy (or `DevicePolicyManager.setPasswordQuality()` for custom DPCs). It gives administrators fine-grained control over what constitutes an acceptable password:

| Value | What it accepts |
|---|---|
| `SOMETHING` | Any password, no restrictions on content |
| `NUMERIC` | Must contain numeric characters |
| `NUMERIC_COMPLEX` | Numeric, but no repeating (4444) or ordered (1234, 4321) sequences |
| `ALPHABETIC` | Must contain alphabetic or symbol characters |
| `ALPHANUMERIC` | Must contain both numeric and alphabetic/symbol characters |
| `COMPLEX` | Must meet custom minimum requirements for length, letters, uppercase, lowercase, digits, and symbols |

With `COMPLEX`, administrators can set specific minimums for each character type and an overall minimum length. This is the most flexible option but also the most difficult to configure correctly.

### Password complexity (simplified)

Password complexity uses three predefined buckets. Administrators choose a tier and Android enforces the matching requirements:

| Tier | PIN | Alphabetic | Alphanumeric |
|---|---|---|---|
| `COMPLEXITY_LOW` | Pattern or PIN (repeating/ordered sequences allowed) | - | - |
| `COMPLEXITY_MEDIUM` | PIN with no repeating/ordered sequences, 4+ digits | 4+ characters | 4+ characters |
| `COMPLEXITY_HIGH` | PIN with no repeating/ordered sequences, 8+ digits | 6+ characters | 6+ characters |

Administrators cannot customise the requirements within a tier. For example, there is no way to require a 6-digit numeric PIN without repeating sequences - the closest tier is `COMPLEXITY_MEDIUM` (4+ digits) or `COMPLEXITY_HIGH` (8+ digits).

### Which one applies where?

The answer depends on the deployment model and the Android version:

**Personally owned work profile (BYOD) on Android 12+**

Complexity-based requirements apply to the device password. If you set a quality-based requirement, Android translates it to the nearest complexity tier. The work challenge (separate work profile lock) still uses quality-based requirements.

**Company-owned work profile (COPE) on Android 12+**

If both complexity and quality are configured, complexity applies at device scope and quality applies at profile scope. If only quality is set, it applies to both.

**Fully managed devices**

Quality-based requirements always apply when set. Complexity can also be used but quality takes precedence if both are configured.

### Common pitfalls

**Unexpected defaults on Android 12+** - if you do not explicitly configure a password policy, newly enrolled Android 12+ devices may default to `COMPLEXITY_HIGH`. This can surprise users by requiring an 8-digit PIN or 6-character password. Set your intended complexity or quality value explicitly.

**6-digit PIN gap** - many organisations standardised on a 6-digit numeric PIN. Password complexity has no tier that maps to exactly this requirement. `COMPLEXITY_MEDIUM` permits 4-digit PINs and `COMPLEXITY_HIGH` requires 8 digits. For BYOD devices on Android 12+, the only option is to accept one of these tiers. For fully managed devices, quality-based requirements still support exact minimum length.

**BYOD personal-side enforcement** - on personally owned work profile devices, the EMM cannot enforce quality-based requirements on the personal-side device password (only complexity-based). This is a deliberate platform limitation to respect the user's ownership of the device.

**Both set simultaneously** - if a policy sets both quality and complexity fields, the behaviour varies by management mode. Test your specific EMM's implementation before deploying broadly, as some EMMs may expose only one of the two options in their console.

### What should I use?

For **BYOD** (personally owned work profile): use complexity. Quality-based requirements are translated to complexity on the device password anyway, and the translation may not match your intent. Set the complexity tier explicitly.

For **fully managed and COPE**: use quality if you need precise control (for example, exactly 6-digit numeric with no repeats). Use complexity if the predefined tiers meet your needs and you prefer simplicity.

If your EMM's console presents password settings without distinguishing between quality and complexity, check with the vendor which field they are setting in the underlying AMAPI policy.
