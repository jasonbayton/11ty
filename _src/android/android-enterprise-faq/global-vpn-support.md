---
title: "Is it possible to utilise a single VPN connection across the entire device?"
published: '2024-11-11'
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
  order: 13000
sources:
  - https://developer.android.com/work/dpc/network-telephony
  - https://developer.android.com/develop/connectivity/vpn
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.policies
  - https://support.google.com/work/android/answer/9213914
---

It depends on the deployment scenario. On a fully managed device with no additional profiles, a single VPN policy creates a device-wide connection that routes all traffic. On any device with multiple profiles - work profile, COPE, or Private Space - VPN operates per-profile, and a single connection cannot cover the entire device.

## VPN scope by deployment scenario

**Fully managed (no work profile)**

A VPN configured by the device owner applies to all apps and traffic on the device. There is only one profile, so a single VPN connection covers everything.

**COPE (company-owned, work profile)**

On a COPE device, VPN must be configured separately for the device-level (personal side) and the work profile. These are independent VPN connections managed by different admin scopes - the device owner controls device-level VPN, and the profile owner controls the work profile VPN. A VPN set at the device level does not automatically cover work profile traffic, and vice versa.

If full coverage is required on a COPE device, the administrator must deploy VPN policies to both scopes.

**BYOD (personally-owned work profile)**

A VPN configured by the profile owner applies only to the work profile. The administrator has no control over VPN on the personal side - this is entirely under the user's control. Personal traffic is unaffected by the work VPN, and the user can independently configure their own personal VPN if they choose.

**Private Space (Android 15+)**

Private Space behaves like a separate profile. VPN configured on the personal/parent profile does not apply to Private Space apps, and vice versa. To route Private Space traffic through a VPN, a VPN app must be installed and configured within Private Space itself.

On COPE devices, administrators can [block Private Space creation](/android/android-enterprise-faq/is-private-space-supported-fully-managed/) entirely if VPN coverage gaps are a concern.

## Always-on VPN

Always-on VPN, available since Android 7.0, starts the VPN service automatically on device boot and keeps it running. The connection persists across reboots and app updates without user interaction.

### Lockdown mode

When `lockdownEnabled` is `true`, all network traffic is blocked if the VPN is not connected. No traffic can leak to the open internet. When `false`, traffic flows unprotected between device boot and VPN connection establishment - this is by design but often misunderstood.

### Lockdown exemptions (Android 10+)

Some apps may need network access before the VPN is established (for example, during provisioning). From Android 10, specific apps can be exempted from lockdown so they fall back to normal networking when the VPN is unavailable.

### User control

From Android 11, users can no longer disable always-on VPN when it has been configured by an administrator. On company-owned devices, no user consent dialog is shown when enabling always-on VPN.

To prevent users from changing VPN settings entirely, set `vpnConfigDisabled: true` (AMAPI) or apply the `DISALLOW_CONFIG_VPN` user restriction (custom DPC).

## Per-app VPN

Per-app VPN is a platform feature built into the Android `VpnService` API. It allows routing traffic from specific apps through the VPN while other apps use the normal network connection (or vice versa).

This is configured through the VPN app itself, not directly through EMM policy. The EMM sends managed configurations to the VPN app specifying which apps should be included or excluded, and the VPN app implements the filtering using `VpnService.Builder.addAllowedApplication()` or `VpnService.Builder.addDisallowedApplication()`. These two modes are mutually exclusive - you allowlist specific apps or blocklist them, not both.

If the VPN app does not support per-app VPN, the EMM cannot force it. Check with your VPN vendor for managed configuration support.

## Common pitfalls

- **Assuming device-wide VPN covers the work profile**: On COPE devices, VPN is scoped per profile. A device-level VPN does not protect work profile traffic. Configure VPN in both scopes if needed
- **Forgetting about Private Space**: On Android 15+, Private Space apps bypass any VPN configured on the personal profile. Block Private Space creation if full VPN coverage is required
- **Only one VPN per profile**: Android supports only one active VPN service per user/profile. If two VPN apps are configured in the same profile, they will repeatedly disconnect each other. See [Is it possible to utilise multiple VPN connections within a profile?](/android/android-enterprise-faq/multiple-vpn-connections/)
- **Lockdown without exemptions**: Enabling lockdown mode without exempting essential apps can cause provisioning failures or prevent app updates. Use lockdown exemptions (Android 10+) for apps that need pre-VPN connectivity
- **Missing `vpnConfigDisabled`**: Setting always-on VPN without also disabling user VPN configuration means users may be able to modify or disable the VPN on some devices

## Related

- [Is it possible to utilise multiple VPN connections within a profile?](/android/android-enterprise-faq/multiple-vpn-connections/)
- [Why don't Private Space apps go through VPN?](/android/android-enterprise-faq/why-dont-private-space-apps-use-vpn/)
- [What network requirements does Android Enterprise have?](/android/android-enterprise-faq/network-requirements-android-enterprise/)
- [How has COPE changed in Android 11?](/android/android-enterprise-faq/cope-in-android-11/)
