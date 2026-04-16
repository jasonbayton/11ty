---
title: "How do I manage credential providers and passkeys on managed devices?"
published: '2026-04-09'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - App management
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 69000
sources:
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.policies
  - https://developers.google.com/android/work/requirements
---
From Android 14, administrators can control which apps are permitted to act as credential providers on managed devices. Credential providers are apps that store and autofill passwords, passkeys, and other credentials - such as Google Password Manager, 1Password, Bitwarden, or Dashlane.

### How it works

AMAPI provides two policy fields for credential provider management:

**`credentialProviderPolicyDefault`** - a policy-level setting that controls the default behaviour for all apps on the device. Options include blocking all credential providers or allowing only pre-loaded (system) credential providers.

**`credentialProviderPolicy`** - a per-app setting within `ApplicationPolicy` that overrides the default for specific apps. This allows administrators to approve individual third-party credential managers while keeping the default restrictive.

### What can administrators control?

Per the [Android Enterprise feature requirements (4.30)](https://developers.google.com/android/work/requirements#4.30.-credential-manager-policy_1), IT admins can:

- Block all credential managers on the device or within the work profile
- Allow only pre-loaded credential managers (system apps)
- Specify a list of approved credential manager package names

These controls apply across all four management modes: work profile on personally-owned devices, work profile on company-owned devices, fully managed devices, and dedicated devices.

### Passkeys in work profiles

Passkeys are profile-scoped. A passkey created in the work profile is only usable from within the work profile, and a passkey created in the personal profile stays in the personal profile. Users who need passkey access in both profiles must register separately in each.

This is by design - work profile isolation ensures that corporate credentials cannot leak to the personal side, and vice versa.

### Common issues

On Android 15, some EMMs initially did not configure the `credentialProviderPolicyDefault` field, which caused it to default to a blocked state. This resulted in users seeing their password manager or authenticator app reported as "blocked by work policy" on fully managed devices after upgrading. If you encounter this, check with your EMM vendor that they are explicitly setting the credential provider policy, and ensure the apps you want to use as credential providers are approved in the per-app policy.

### When should I configure this?

If your organisation uses a third-party password manager or passkey provider on managed devices, you should explicitly configure the credential provider policy to approve those apps. Relying on the default behaviour may result in the provider being blocked, particularly after OS upgrades that introduce new policy defaults.
