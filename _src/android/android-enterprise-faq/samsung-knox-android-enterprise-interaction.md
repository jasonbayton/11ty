---
title: "How do Samsung Knox and Android Enterprise policies interact?"
published: '2026-03-23'
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
  order: 4500
---
Samsung Knox extends Android Enterprise with additional device management capabilities through the Knox Service Plugin (KSP), an OEMConfig-based application. Understanding how these layers interact is important for avoiding policy conflicts.

### How does it work?

Android Enterprise provides a standard set of management APIs that work across all certified Android devices. Samsung Knox adds Samsung-specific APIs on top, accessible through KSP.

When managing Samsung devices, an EMM typically applies:

1. **Android Enterprise policies** - standard restrictions, app management, compliance rules
2. **Knox Service Plugin policies** - Samsung-specific features like firmware update control, hardware key remapping, Samsung DeX management, and enhanced security settings

KSP is deployed as a managed application with managed configurations. The EMM pushes a configuration profile to KSP, which then applies the Samsung-specific policies locally on the device.

### Where do conflicts arise?

Some policies exist in both Android Enterprise and KSP. If the same policy is set in both, the device may not apply them predictably. Common overlap areas include:

- Wi-Fi configuration
- Password/passcode requirements
- Camera restrictions
- Screen capture restrictions

**Best practice:** set each policy in only one place. If a capability is available through both standard Android Enterprise and KSP, choose one and be consistent across your policy set.

### Does KSP work with all management modes?

KSP supports all Android Enterprise management modes: fully managed, dedicated, personally-owned work profile, and COPE (work profile on company-owned device). All modes require Android 9.0 with Knox 3.2.1 or later. Note that the COPE implementation changed significantly in [Android 11](/android/android-11-cope-changes/) - for Android 9-10 this was "work profile on fully managed device", while Android 11 and later uses "work profile on company-owned device".

### Troubleshooting

If KSP policies are not applying as expected:

- Enable `verboseMode` in the KSP managed configuration to see which policies are deployed
- Ensure the KSP app is up to date - version mismatches between the console configuration and the on-device KSP version can cause failures
- Check for policy overlap with standard Android Enterprise settings

For more on OEMConfig generally, see [What is OEMConfig?](/android/what-is-oemconfig/).