---
title: "What is the key attestation root certificate change in 2026?"
published: '2026-04-03'
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
  order: 72000
sources:
  - https://developer.android.com/privacy-and-security/security-key-attestation
---

## What is the key attestation root certificate change in 2026?

Google is transitioning the root certificate used in Android hardware key attestation chains. This affects any organisation or service that validates attestation certificates from Android devices.

**Timeline:**
- **February 2026**: New root certificate introduced alongside the existing root
- **April 10, 2026**: RKP-enabled devices (Remote Key Provisioning) exclusively use the new root certificate. From this date, all attestation chains from RKP-enabled devices are rooted in the new ECDSA P-384 key

**Who is affected?**

Any system that validates Android key attestation certificates needs to update its trust store to include the new root. This includes:
- EMM platforms performing device integrity checks via attestation
- Zero-trust access solutions using hardware-backed key attestation
- Solutions that verify device attestation as part of compliance
- Identity providers using Device Trust signals alongside attestation

**What should I do?**

1. Check whether your attestation verification system hardcodes the existing root certificate
2. Add the new root certificate to your trust store before April 2026
3. Test attestation validation against both roots during the transition period
4. If you rely on a commercial EMM or identity provider, confirm with your vendor that they have updated their systems

The new root certificate is published in Google's [key attestation documentation](https://developer.android.com/privacy-and-security/security-key-attestation).

Failure to update before April 10, 2026 will result in attestation verification failures for devices using Remote Key Provisioning, which includes most modern Android devices. Both the old and new root certificates are published at `https://android.googleapis.com/attestation/root`. Older devices with factory-provisioned keys that do not support key rotation will continue using the previous root indefinitely.
