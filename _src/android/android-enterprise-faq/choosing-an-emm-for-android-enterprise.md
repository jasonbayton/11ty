---
title: 'How do I choose an EMM for Android Enterprise?'
published: '2026-03-24'
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
  order: 7200
sources:
  - https://www.androidenterprise.community/discussions/conversations/community-tips-what-to-consider-when-choosing-an-enterprise-mobility-management-/3780
  - https://androidenterprisepartners.withgoogle.com/emmservices/
---

There is no single best EMM for every organisation. The right choice depends on existing infrastructure, budget, platform mix, and the deployment scenarios required. Here are the key considerations:

## Android Enterprise Recommended

Google validates EMM solutions through the [Android Enterprise Recommended](https://androidenterprisepartners.withgoogle.com/emm) programme. AER-validated EMMs have demonstrated support for a standard set of Android Enterprise features. Starting with an AER-validated EMM is sensible, though it is not a guarantee of quality or completeness - see [What is Android Enterprise Recommended?](/android/android-enterprise-faq/what-is-aer/).

## Key evaluation criteria

- **Deployment scenario support** - does the EMM support the scenarios you need? Fully managed, work profile (BYOD), COPE, dedicated/kiosk? Not all EMMs support all scenarios equally
- **AMAPI vs custom DPC** - is the EMM built on Google's Android Management API (AMAPI) or does it use a custom Device Policy Controller? AMAPI-based EMMs receive new Android features faster as Google ships them directly. Custom DPC EMMs may offer unique features but depend on the vendor to implement new Android capabilities
- **Zero-touch enrolment support** - if you plan to use zero-touch, confirm the EMM supports it and that the integration works with your reseller
- **OEMConfig support** - for OEM-specific features (Samsung Knox, Zebra, Honeywell, etc.), the EMM needs to support OEMConfig or have direct OEM integrations
- **Multi-platform requirements** - if you also manage iOS, Windows, macOS, or ChromeOS, a unified platform may be preferable
- **Managed Google Play integration** - all AE-capable EMMs integrate with managed Google Play, but the quality of the app management experience varies
- **Pricing model** - per-device, per-user, or tiered. Consider total cost including any add-on modules for advanced features

## Practical advice

- Request a trial and test your specific deployment scenarios before committing
- Check community forums and peer reviews for real-world experiences with the EMM and your target devices
- Confirm the EMM's update cadence for new Android version support - some vendors are significantly faster than others
- If you have an existing EMM for other platforms, evaluate the Android Enterprise capability of that platform first before introducing a separate solution
