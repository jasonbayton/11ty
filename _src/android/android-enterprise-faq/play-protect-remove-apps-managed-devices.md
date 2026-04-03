---
title: "Can Google Play Protect remove apps from managed devices without admin approval?"
published: '2026-03-26'
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
  order: 64500
sources:
  - https://support.google.com/work/android/answer/15162069
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.policies#AdvancedSecurityOverrides
---
Yes, in certain circumstances.

Google Play Protect runs on all GMS-certified Android devices, including those under enterprise management. If Play Protect identifies an app as potentially harmful, it can:

- Display a warning to the user recommending removal
- Automatically disable or remove the app in severe cases

This applies regardless of how the app was installed - including apps pushed by the EMM or sideloaded as part of an enterprise workflow. On managed devices, this can be particularly disruptive for:

- Kiosk and dedicated devices running a single critical app
- Legacy line-of-business apps that request sensitive permissions
- Sideloaded APKs deployed through the EMM (where the EMM policy permits unknown sources)
- Custom DPCs not on the approved allowlist

**What can administrators do?**

- **Verify app compliance** - ensure internally distributed apps follow Google's [mobile unwanted software policy](https://developers.google.com/android/play-protect/mobile-unwanted-software). Apps that request unnecessary sensitive permissions or exhibit behaviours Google considers deceptive are more likely to be flagged
- **Use managed Google Play** - apps distributed through managed Google Play are less likely to trigger Play Protect warnings than sideloaded APKs
- **Report false positives** - if a legitimate enterprise app is flagged, submit an appeal through the [Play Protect warning developer guidance](https://developers.google.com/android/play-protect/warning-dev-guidance)

**Best practice**: test all deployed applications against Play Protect in a staging environment before fleet-wide deployment. Monitor for Play Protect warnings in device reports and respond promptly to avoid workflow disruption.

Play Protect's cloud scanning of sideloaded apps on managed devices was removed in September 2024, but on-device detection continues. See the related FAQ: [Has Play Protect changed how it handles sideloaded apps on managed devices?](/android/android-enterprise-faq/play-protect-sideload-scanning-change/).
