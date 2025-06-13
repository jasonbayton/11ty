---
title: The MANAGED INFO device identifiers card
parent: MANAGED INFO support
published: '2024-07-09'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Info'
    - 'bayton-projects'
categories: 
    - Managed Info Features
layout: base.njk
eleventyNavigation: 
    order: 0
    title: The device identifiers card
---

## What is the Device Identifiers card?

The Device Identifiers card in MANAGED INFO is a licensed feature that displays key hardware and enrolment identifiers for your device, such as IMEI, serial number, Android ID, and enrolment-specific ID. These are essential for device tracking, support, and compliance in Android Enterprise environments.

## What identifiers are shown?

When enabled and all requirements are met, the Device Identifiers card displays:

- **IMEI**: Unique hardware ID for devices with cellular radios
- **Serial number**: Manufacturer-assigned hardware serial
- **Android ID**: Unique device identifier used by apps and services, changes on device reset
- **Enrollment-specific ID**: A stable, privacy-friendly ID assigned during Android Enterprise enrolment

If an identifier isn’t available (e.g. IMEI on Wi-Fi-only devices), “Unavailable” will be displayed for that field.

## How to use the card

The Device Identifiers card is **enabled by default** for unmanaged devices, but cannot display identifiers. It will automatically turn off as soon as a managed configuration is received. You can then choose whether to re-enable it or not.

To display device identifiers, **all of the following are required**:

- **A valid licence** for MANAGED INFO
- The **CERT_INSTALL** delegated scope (assigned via your EMM/MDM)
- The **READ_PHONE_STATE** permission (prompted at runtime, or pre-approved by your admin)

If any of these requirements are missing and the card remains enabled, you will see an error-state card with guidance on how to resolve the issue (see below).

Once all requirements are met:

1. Open /scroll to Device Info.
2. Scroll to the **Device identifiers** section.
3. The card will show each available identifier, or “Unavailable” if the device lacks that identifier (e.g., IMEI on Wi-Fi-only devices).
4. If requirements are not met, an error message will provide clear instructions (see “Understanding the results”).

You can revisit this card at any time; identifiers update automatically as permissions or scopes are granted.

## Understanding the output

- **All identifiers displayed:** Your device is licensed, and all required permissions and delegated scopes are in place.
- **“Unavailable” shown:**  
  - IMEI will not appear on Wi-Fi-only devices.
  - Other fields may show “Unavailable” if the device does not expose that value.
  - The device may be too old to show an identifier through the modern requests MANAGED INFO makes
- **Error-state card displayed:**  
  - If licensing, permission, or delegated scope are missing, the card will switch to an error state with specific instructions on what’s required.
  - The card will remain visible while enabled, always showing the current access state.

## When should this card be used?

- **Device enrolment:** Record device identifiers for inventory and compliance.
- **Support & troubleshooting:** Reference identifiers when working with IT or support teams.
- **Audits:** Verify device assignment and status for regulatory or internal audits.
- **Integrations:** Allow other applications to fetch device identifiers from MANAGED INFO.

## Feedback

The Device Identifiers card is regularly improved based on user and admin feedback.  
Some questions for users and admins:

- Should “Unavailable” identifiers be hidden, or always shown?
- Should additional identifier types be supported?

For any further feedback, please [reach out](/contact).