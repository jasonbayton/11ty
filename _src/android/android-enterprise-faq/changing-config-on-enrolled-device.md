---
title: "What happens if a new config for a different EMM or server is applied to an enrolled device?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - Zero-touch
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: 'What happens if a new config for a different EMM or server is applied to an enrolled device?'
  order: 40000
sources:
  - https://developers.google.com/zero-touch/guides/customer/how-it-works
  - https://support.google.com/work/android/answer/7514005
  - https://docs.samsungknox.com/admin/knox-mobile-enrollment/how-to-guides/manage-profiles/modify-profiles/
---

Nothing until the device is factory reset. Zero-touch configurations are only downloaded and applied during the setup wizard, so any change made in the zero-touch portal - whether it is editing DPC extras, switching EMM, or assigning an entirely different configuration - has no effect on a device that is already enrolled and in use.

## How zero-touch config changes work

When an administrator changes a zero-touch configuration in the [zero-touch portal](enterprise.google.com/android/zero-touch/customers) or via the [customer API](https://developers.google.com/zero-touch/reference/customer/rest), the change is saved server-side. The enrolled device is not notified. The updated configuration is only fetched the next time the device goes through the setup wizard, which happens after a factory reset or on first boot of a new/reflashed device.

This applies equally regardless of what was changed:

- Switching the DPC to a different EMM
- Updating the DPC extras (e.g., a new enrolment token or server URL)
- Assigning a completely different configuration to the device
- Changing the configuration name or contact details

The currently enrolled EMM continues to manage the device as normal until the device is reset.

## The same applies to config removal and device unclaim

| Action | Effect on enrolled device | Effect after factory reset |
|--------|--------------------------|---------------------------|
| Config changed (different EMM/DPC extras) | None | New config applies, device enrols into the new EMM |
| Config removed (set to "None") | None | Device sets up without forced enrolment |
| Device unclaimed from portal | None | Device sets up as a consumer device with no management |

Unclaiming a device from the zero-touch portal is irreversible without reseller involvement. The reseller will need the IMEI (or serial number for Wi-Fi-only devices) to re-register it. See [What happens if a device is unregistered from the zero-touch console?](/android/android-enterprise-faq/what-happens-unregistering-zt-device/) for more detail.

## Samsung Knox Mobile Enrolment (KME)

KME behaves similarly. Profile changes (including switching to a different EMM or updating enrolment settings) do not take effect on already-provisioned devices. The updated profile only applies after a factory reset. KME supports one profile per device, and assigning an updated profile completely replaces the previous settings - there is no merging.

## When would you change a config on an enrolled device?

The most common scenario is an **EMM migration**. When moving devices from one EMM to another, the typical workflow is:

1. Update the zero-touch configuration to point to the new EMM's DPC and enrolment token
2. Factory reset devices in a controlled, phased rollout
3. Devices automatically enrol into the new EMM on next setup

This is one of the key advantages of zero-touch and KME for fleet management - there are no QR codes to redistribute, no new provisioning instructions, and no manual intervention beyond triggering the reset.

Other scenarios include:

- **Enrolment token refresh** - AMAPI enrolment tokens can expire, requiring the DPC extras to be updated with a new token
- **Server URL changes** - if the EMM's enrolment endpoint changes
- **Organisational restructuring** - reassigning devices to different management tenants or policies
- **Decommissioning** - removing configs before reselling or repurposing hardware

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Google Workspace exception</div>

If zero-touch is managed through the Google Workspace Admin console (rather than the standard zero-touch portal), applying a configuration to an already-in-use device can trigger a forced factory reset, with the user receiving a warning on the device one hour before the reset occurs. This forced-reset behaviour is specific to the Workspace Admin console flow and does not apply when using the standard zero-touch portal or the customer API.

</div>

## Best practices for EMM migrations

- Update the zero-touch configuration **before** beginning resets - this ensures every device that resets picks up the new EMM automatically
- Do not delete or unlink the Android Enterprise bind from the old EMM before updating zero-touch configurations. Doing so may permanently impact andy zero-touch account association
- Test with a single device first before rolling out to the full fleet
- Monitor enrolment token expiry on the new EMM - an expired token means the device will fail provisioning after reset
- For more detail, see the [EMM migration guide](/android/android-enterprise-emm-migration-guide/)

## Related

- [What happens if a zero-touch config is removed from an enrolled device?](/android/android-enterprise-faq/removing-config-from-enrolled-device/)
- [What happens if a zero-touch assigned device is reset?](/android/android-enterprise-faq/resetting-zt-device/)
- [What happens if a device is unregistered from the zero-touch console?](/android/android-enterprise-faq/what-happens-unregistering-zt-device/)
- [What are DPC extras?](/android/android-enterprise-faq/what-are-dpc-extras/)
- [Zero-touch DPC extras collection](/android/android-enterprise-zero-touch-dpc-extras-collection/)
- [EMM migration guide](/android/android-enterprise-emm-migration-guide/)
