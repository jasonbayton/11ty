---
title: "Upgrading your Android Enterprise binding to a managed Google domain"
published: '2026-03-22'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - General
layout: base.njk
eleventyNavigation:
  order: 1600
---

If your organisation set up Android Enterprise before mid-2024, there's a strong chance you're running a **managed Google Play Accounts enterprise** - the legacy binding type that ties your entire Android Enterprise setup to a single Google account. Google now offers a supported, one-way upgrade path to convert this to a **managed Google domain enterprise**, and for most organisations, it's worth doing.

This guide covers the why, the how, and the practical considerations for making the switch.

<div class="callout callout-blue">
<div class="callout-heading">Background reading</div>

If you're not clear on the difference between the two enterprise types, read <a href="/android/android-enterprise-faq/what-is-managed-google-domain/">What is a managed Google domain, and should I upgrade?</a> first. This guide assumes you understand the distinction and are focused on the upgrade process itself.

</div>

## Why upgrade?

The legacy managed Google Play Accounts enterprise was designed for simplicity - one Google account, one bind, done. That simplicity comes with well-documented operational risks:

- **Single point of failure.** The enterprise is owned by whichever Google account completed the setup. If that account is lost, compromised, or has its password forgotten, recovering the enterprise can be difficult or impossible. Adding additional admins through `play.google.com/work` mitigates this, but it's still a workaround rather than a proper multi-admin model.
- **No Admin console.** Enterprise management is limited to your EMM and the basic managed Google Play admin settings page. There's no centralised Google Admin console access for Android settings, domain-level controls, or cross-service administration.
- **Single EMM binding.** A legacy enterprise can only be associated with one EMM at a time. If you want to run two EMMs in parallel - for a migration, or for different user populations - you're stuck.
- **No managed Google Accounts.** Devices receive generic managed Google Play accounts with no user identity. This means no Chrome Sync, no cross-device experiences, no SSO integration through Google's identity stack, and no Gemini access on managed devices.

The managed Google domain model addresses all of these. It moves the enterprise from a single-account ownership model to a domain-based model backed by Google Workspace or Cloud Identity, with role-based administration, multi-EMM support, and the option to provision identity-bearing managed Google Accounts on devices.

The upgrade preserves your enterprise ID. Nothing breaks.

## Before you start

### Check your enterprise type

If you're using an AMAPI-based EMM, the enterprise resource includes an `enterpriseType` field. The value will be either `MANAGED_GOOGLE_PLAY_ACCOUNTS_ENTERPRISE` (legacy) or `MANAGED_GOOGLE_DOMAIN` (current). Your EMM may surface this in the admin console, or you can check via the API:

```
GET https://androidmanagement.googleapis.com/v1/enterprises/{enterpriseId}
```

The response includes `enterpriseType` alongside `managedGooglePlayAccountsEnterpriseType` (for legacy binds) or `managedGoogleDomainType` (for domain binds).

For custom DPC EMMs using the Play EMM API, the `enterprises.get()` method also returns `enterpriseType`.

If you don't have API access, a reasonable heuristic: if you set up Android Enterprise with a Gmail address before mid-2024, and you manage your bind through `play.google.com/work` rather than `admin.google.com`, you have a legacy enterprise.

### Requirements

- Your EMM must support the upgrade flow. Not all EMMs have implemented it yet - check with your vendor.
- You'll need a work email address (not Gmail) to associate with the new managed Google domain.
- The upgrade creates a zero-cost Cloud Identity or Google Workspace tenant. Domain verification via DNS is optional but recommended for full functionality (SSO federation, advanced identity controls).
- **The upgrade is one-way and irreversible.** Once upgraded, you cannot revert to a managed Google Play Accounts enterprise.

## The upgrade process

There are two ways to initiate the upgrade, depending on how your EMM has implemented it.

### EMM-initiated upgrade

This is the more common flow. The EMM checks the enterprise type, and if eligible, generates an upgrade URL that the administrator completes in a browser.

The technical flow:

1. The EMM calls `enterprises.get()` to confirm the enterprise type is `MANAGED_GOOGLE_PLAY_ACCOUNTS_ENTERPRISE`.
2. The EMM calls `enterprises.generateEnterpriseUpgradeUrl()` to get a one-time upgrade URL.
3. The administrator opens this URL in a browser and completes the guided setup - providing a work email address, verifying identity, and optionally verifying the domain via DNS.
4. Upon completion, the enterprise type changes to `MANAGED_GOOGLE_DOMAIN`.

The EMM should be monitoring for the `EnterpriseUpgradeEvent` via Pub/Sub notifications to confirm the upgrade succeeded.

<div class="callout callout-orange">
<div class="callout-heading">You don't need the original Gmail credentials</div>

The EMM-initiated flow does not require the original Google account that created the legacy enterprise. This is important - it means the upgrade is possible even if the original account is inaccessible.

</div>

### Iframe-initiated upgrade

Some EMMs expose the managed Google Play iframe in their admin console. Google may display an upgrade banner within this iframe, prompting the administrator to upgrade. In this flow:

1. The administrator sees the upgrade prompt in the managed Google Play iframe.
2. They sign in with the original Google account that owns the legacy enterprise.
3. They provide a work email address to create or link a managed Google domain.
4. The upgrade completes.

This flow **does** require the original account credentials, making the EMM-initiated flow preferable where available.

## What changes after the upgrade

### What stays the same

- **Enterprise ID.** Your enterprise ID is preserved. All device enrolments, app assignments, and policy associations continue to reference the same enterprise.
- **Enrolled devices.** No devices are unenrolled, wiped, or re-provisioned. The upgrade is transparent to the device fleet.
- **Approved apps.** All application approvals and assignments in managed Google Play remain intact.
- **EMM configuration.** Your EMM console, policies, and device groups are unaffected.

### What changes

- **Enterprise type.** The `enterpriseType` field changes to `MANAGED_GOOGLE_DOMAIN`.
- **Admin console.** You now manage the enterprise through the [Google Admin console](https://admin.google.com) rather than `play.google.com/work`. Third-party EMM integrations can be managed at `admin.google.com/ac/devices/settings/thirdparty`.
- **Contact information.** The `ContactInfo` associated with the legacy enterprise (Gmail address, data protection officer, EU representative) is deleted during the upgrade. You must re-configure this in the Google Admin console.
- **Display name.** The `enterpriseDisplayName` updates to reflect the domain name.
- **Multi-EMM.** You can now bind additional EMMs to the same domain if needed, each receiving its own enterprise ID.

## Per-device user account upgrades (optional)

The enterprise binding upgrade changes the backend linkage, but devices continue to use their existing managed Google Play accounts unless you take a further step. If you want devices to use identity-bearing **managed Google Accounts** (work email-based accounts), this is a separate, per-device process.

<div class="callout callout-blue">
<div class="callout-heading">This step is optional</div>

If your deployment doesn't need user-specific identity on devices - for example, dedicated devices or deployments where user identity is handled entirely through the EMM - you can skip this. Devices will continue to function with managed Google Play accounts.

</div>

### Prerequisites for per-device account upgrades

- The enterprise must already be upgraded to a managed Google domain.
- The domain must be fully verified (email verification alone is not sufficient). Verification can be completed via DNS TXT/CNAME records, HTML file upload, meta tag, or other methods supported by Google.
- Managed Google Accounts must exist in the Google Workspace or Cloud Identity directory for each user. These can be synced from an external identity provider using Google Cloud Directory Sync (GCDS) or SCIM provisioning.
- The EMM must support the `workAccountSetupConfig` policy (AMAPI).

### How it works

1. The administrator updates the device policy to include `workAccountSetupConfig`, setting the authentication type to `GOOGLE_AUTHENTICATED`.
2. If a specific account is required, the policy specifies which managed Google Account the device should use.
3. On the device, if the required account already exists, the upgrade happens silently. If not, the user is prompted to add their managed Google Account.
4. The managed Google Account becomes the primary management account, and the old managed Google Play account is removed.

This enables features that require user identity - Chrome Sync, cross-device continuity, SSO through Google's identity stack, and access to Google Workspace services if licensed.

<div class="callout callout-orange">
<div class="callout-heading">Custom DPC considerations</div>

The <code>workAccountSetupConfig</code> policy field is an AMAPI capability. Custom DPC EMMs using the Play EMM API have a separate upgrade flow that uses enrollment tokens and the AMAPI SDK's <code>AccountSetupClient</code> - consult your EMM vendor's documentation for the specific implementation, as the workflow differs from the AMAPI approach described above.

</div>

## Common pitfalls

**Forgetting to re-set contact information.** The upgrade deletes the legacy enterprise's `ContactInfo`. If your organisation has regulatory obligations around data protection officer details (GDPR, for example), re-configure this promptly in the Google Admin console.

**Assuming per-device upgrades are automatic.** The enterprise binding upgrade and the per-device account upgrade are separate steps. Upgrading the binding does not automatically change what accounts are on devices.

**Not verifying the domain.** Email verification is enough to complete the enterprise upgrade, but full domain verification is required for per-device managed Google Account upgrades, SSO federation, and several other advanced features. If you plan to use managed Google Accounts on devices, verify the domain early.

**Cloud Identity user limits.** Signing up for Cloud Identity Free increases your user cap by 50 users. For most new setups this means a 50-user limit on managed Google Accounts. If you're deploying managed Google Accounts to a larger fleet, you'll need to request an increase from Google or purchase additional Cloud Identity or Google Workspace licences.

**Legacy admin console bookmarks.** After upgrading, `play.google.com/work` may still be accessible but should no longer be used as the primary management interface. Update any documentation, bookmarks, or processes that reference the old admin settings URL.

## Recommendations

- **If you have a legacy enterprise, upgrade.** The operational risk reduction alone - moving from single-account ownership to domain-based administration - justifies the effort. The process is straightforward and non-disruptive to enrolled devices.
- **Start with the enterprise upgrade, evaluate per-device upgrades separately.** The two steps serve different purposes. The enterprise upgrade is an admin-level improvement with no device-side impact. Per-device account upgrades are a deployment architecture decision that should be evaluated based on whether user identity on devices adds value to your organisation.
- **Coordinate with your EMM vendor.** The upgrade flow relies on EMM support. Confirm your vendor supports it, and understand whether they expose the upgrade through their admin console or require API-level interaction.
- **If you're setting up Android Enterprise for the first time, this doesn't apply.** Since mid-2024, all new signups default to a managed Google domain enterprise. The legacy model is only relevant for existing deployments.
