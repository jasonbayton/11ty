---
title: "How to migrate Android devices from one EMM to another"
published: '2026-03-03'
status: publish
author: 'Jason Bayton'
excerpt: "A comprehensive guide to planning and executing a migration of Android Enterprise devices between EMM platforms, and the practical realities of moving an estate without losing your mind."
type: documentation
tags: 
    - General
layout: base.njk
eleventyNavigation:
  order: 2000
---

<div class="callout callout-green">
<div class="callout-heading callout-heading-small">New to Android Enterprise?</div>

For information regarding Android Enterprise, including the deployment scenarios referenced throughout this guide and how it can benefit organisations, have a read of [What is Android Enterprise and why is it used?](/android/what-is-android-enterprise-and-why-is-it-used/).

</div>

Migrating Android devices between EMM platforms is one of the most disruptive activities an organisation can undertake with its estate. Similar to the days of Device Administrator, there is no in-place migration path for most deployment scenarios. Devices will need to be wiped, reprovisioned, and re-enrolled.

That said, with proper planning, the right processes, and a phased approach, the undertaking can be managed with minimal impact on end-users and business operations. This guide covers the considerations, preparation, and execution of an EMM-to-EMM migration for organisations already running Android Enterprise.

If you're migrating from Device Administrator to Android Enterprise at the same time as switching vendor, the considerations are broader; have a read of [Considerations when migrating from device administrator to Android Enterprise](/android/considerations-when-migrating-from-device-administrator-to-android-enterprise/) alongside this guide.

## Before you begin

### Understand the scope

The first step is understanding what you have. Before any migration planning begins, audit the existing estate:

- How many devices are enrolled, and across which deployment scenarios (fully managed, BYOD work profile, COPE, dedicated/COSU)?
- What Android versions are in play? Older devices may not support provisioning methods available on newer versions. 
- What type of hardware are you working with? For dedicated or custom Android hardware fore example, some devices may not support certain provisioning methods, which means more manual work adapting what's offered to devices in question.
- Which provisioning methods were used originally, and which are available for re-enrolment?
- Are devices registered with zero-touch, Knox Mobile Enrolment (KME), or another out-of-box enrolment (OOBE) solution?
- What applications - public, private, and web - are deployed?
- What managed configurations are in place for those applications?
- What compliance and conditional access integrations exist (Entra ID, Google Workspace, etc.)?
- What certificate and VPN infrastructure is tied to the existing EMM?

This audit forms the basis of the migration plan. Skip it and you will hit surprises mid-migration that could have been avoided.

### Understand what a migration actually involves

For the majority of Android Enterprise deployment scenarios, migration means a wipe. There is no seamless, over-the-air transfer of device ownership from one EMM to another for production use today.

Google has publicly documented [DPC migration](/blog/2024/01/amapi-migrations/) functionality within the Android Management API, but this is currently limited to migrating devices from a custom DPC (Play EMM API) backend to AMAPI within the same EMM vendor. It cannot be used to migrate devices between vendors, and it cannot be reversed. Cross-vendor, wipe-free migration remains aspirational.

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">This could be easier</div>

It's worth noting that the underlying platform support for DPC migration has existed since Android 9.0 (that was 2018). The APIs are there. Google discussed it at their partner summit that year as an ambitious capability that would allow seamless, wipe-free migration of devices between EMM platforms. Several years on, it still hasn't been enabled for cross-vendor use. The watered-down version that eventually surfaced in early 2024 serves only single-vendor custom DPC-to-AMAPI transitions, which is useful for vendors modernising their backend but does nothing for organisations wanting to change provider.

Compare this to Apple, who shipped MDM migration with iOS 26, iPadOS 26, and macOS 26 last year. Through Apple Business Manager, organisations can reassign devices to a new MDM server, set an enforcement deadline, and the device migrates without a factory reset - user data intact, managed profiles swapped out, apps optionally preserved. Apple had the courage to force their EMM ecosystem to be better and prioritise the customer experience over vendor lock-in. Google, despite having the technical foundations in place for the better part of a decade, has not. Whether this is a lack of will, a concession to EMM vendors who benefit from the switching cost is anyone's guess - but the result is the same: Android migrations remain disruptive by default, and organisations pay the price.

If you'd like to see this change, voice your feedback to the [Android Enterprise Customer Community](https://androidenterprise.community). Refer to this article is desired (but that's not necessary).

</div>

Here is what migration looks like for each deployment scenario:

**Fully managed, dedicated (COSU), and COPE devices** require a full factory reset. The existing EMM holds Device Owner, and the only way to release it is to wipe the device. All data on the device is lost. End-users will need to back up anything not already synced to a cloud service before the migration takes place.

<div class="callout">
<div class="callout-heading callout-heading-small">
Managed backup and restore
</div>

Technically [it's now possible](https://support.google.com/work/android/answer/16713206) for organisations already using Authenticate with Google to user-assign devices to employees:

As of writing AMAPI doesn't support the APIs needed to control the device backup service. Some legacy EMM vendors will with custom DPC, which is a considerable competitive advantage Google offers them over the rest of the AMAPI-enabled market.

Check if this option is available between your old and new vendors ahead of migration.

</div>

**COPE devices** have one additional option worth noting. Where supported by the EMM, organisations can _relinquish ownership_ of a COPE device, effectively converting it from a company-owned device to a personally-owned one. This removes the corporate management profile while preserving the user's personal data and apps. The device can then be re-enrolled into the new EMM as a BYOD work profile deployment. That isn't the same as COPE, but it avoids a full wipe and means users don't lose their personal data. This is particularly useful for organisations that are comfortable transitioning COPE users to BYOD during the migration. It should be noted this is not universally supported, and is more commonly available on AMAPI-based platforms.

**BYOD work profile devices** require the work profile to be removed. This deletes all corporate data and applications within the work profile, but personal data on the device remains untouched. The user then enrols into the new EMM, which creates a fresh work profile. Of all the deployment scenarios, this is the least disruptive to migrate.

## Planning the migration

### Timing

The best time to migrate is when you can minimise disruption. A few natural opportunities present themselves:

**Hardware refresh** is the ideal scenario. New devices can be pre-registered with zero-touch or KME pointed at the new EMM, and shipped directly to end-users ready to enrol out of the box. Old devices are retired, and the migration happens organically as new hardware rolls out. No wipes, no re-provisioning of existing devices, no disruption.

**Office days for remote workers** provide a practical window for hands-on support. If the organisation has a hybrid working model, scheduling migrations for days when remote workers are on-site means IT can assist with the process, troubleshoot issues in person, and ensure devices are back up and running before the employee leaves. Asking a remote worker to factory reset their device, connect to Wi-Fi, scan a QR code, and troubleshoot any issues over a Teams call is a recipe for frustration.

**Quiet periods** in the business calendar - avoiding month-end for finance teams, avoiding sprint deadlines for engineering, and so on - reduce the impact of temporary loss of device functionality.

What you want to avoid is a big-bang migration. Wiping and re-enrolling an entire estate in a single weekend is high-risk, high-stress, and leaves no room for course correction if something goes wrong.

### Phased rollout

A phased approach is strongly recommended:

**Phase 1 - Internal validation.** Set up the new EMM environment, replicate policies and app deployments, and test thoroughly with lab devices across all deployment scenarios in use. This is where you catch the gaps - the managed configuration that doesn't carry over, the OEMConfig schema that's not fully migrated, the compliance integration that needs reconfiguring.

**Phase 2 - Pilot group.** Migrate a small group of trusted testers, ideally people who are technically comfortable and can provide meaningful feedback. Include a mix of deployment scenarios (a few fully managed devices, a few BYOD, a COPE device if applicable). Run the pilot for long enough to surface issues that only appear after a few days of real use: app update behaviour, certificate renewal, compliance evaluation timing.

**Phase 3 - Gradual rollout.** Begin migrating the wider estate in manageable batches. Prioritise groups based on the timing considerations above - hardware refresh candidates first, then teams with upcoming office days, then the rest. Maintain support capacity for each batch before starting the next.

This phased approach also ties in with the point above about hardware refresh. If the organisation is planning a device refresh within the next 6-12 months, it may make sense to migrate only the devices that aren't being replaced, and let the new hardware come pre-configured for the new EMM.

### Don't decommission the old platform too early

There is no real rollback once a device has been wiped and re-enrolled into the new EMM. If the new platform isn't behaving as expected, the only option is to wipe the device again and re-enrol back into the old EMM.

For this reason, the old EMM platform and its integrations (Entra ID conditional access, certificate authority connections, VPN infrastructure) should remain operational until the migration is fully complete and the new platform has been validated in production over a reasonable period. Decommissioning too early removes the safety net.

## Replicating the environment

### Policies

The goal is to create a 1:1 replica of the existing management environment in the new EMM before any devices are migrated. In practice, "1:1" is aspirational - every EMM presents its policies and configurations differently, and may support different policies based on their own roadmap. It's critical to validate all core requirements are in place, or will be in place, before committing. Bear in mind also, a setting called one thing in one console may be named something slightly different in another.

This is particularly true when moving between a custom DPC-based EMM (such as older Workspace ONE, Ivanti/MobileIron, SOTI) and an AMAPI-based EMM (such as Intune, NinjaOne, Wizy, Applivery). Custom DPC vendors have historically had their own proprietary policy sets built on top of the Play EMM API, while AMAPI vendors are working with Google's standardised policy framework. The same restriction - say, allowing cross-profile communications - may be surfaced under a different name, in a different section of the console, or with subtly different behaviour.

Even moving between two AMAPI vendors isn't always straightforward, as each vendor wraps the underlying AMAPI policies in their own UI and may expose them at different levels of granularity.

The practical approach is to export or document the full policy set from the existing EMM (screenshots, policy exports, configuration summaries - whatever the platform supports), and then methodically recreate each setting in the new platform. Resist the temptation to "improve" policies during the migration; replicate first, optimise later. Mixing migration with policy changes makes it harder to isolate issues.

### OEMConfig

OEMConfig configurations deserve specific attention. If the existing deployment leverages OEMConfig - Samsung's Knox Service Plugin being a very common example - these configurations are tied to the specific OEMConfig app and its schema as presented by the EMM. Moving to a new EMM means the OEMConfig app and its managed configuration will need to be redeployed and reconfigured from scratch. The key-value pairs from one platform won't directly transfer, obviously, but the new vendor may have options for importing them.

### Managed configurations

The same applies to managed configurations for all applications, not just OEMConfig. Any app-level configuration - Exchange profiles pushed through Gmail, Chrome browser policies, VPN client settings, line-of-business app configurations - will need to be audited and recreated in the new EMM. These configurations vanish when the work profile is removed or the device is wiped, and the new EMM has no knowledge of what was previously deployed.

### Certificates, VPN, and infrastructure dependencies

If the existing EMM is integrated with a SCEP server, certificate authority, or enterprise VPN gateway, these connections will need to be re-established with the new EMM. The certificates issued to devices by the old EMM's SCEP integration won't be present on the new platform - new certificates will need to be issued during re-enrolment. Similarly, VPN configurations and Wi-Fi enterprise authentication profiles (802.1x) tied to the old EMM's certificate infrastructure will need rebuilding.

Map out every infrastructure dependency before migration begins. If the new EMM uses a different connector or integration method for the same certificate authority, the setup work may be non-trivial.

### Conditional access and compliance

This is one that catches people out. If the organisation uses Entra ID (Azure AD) conditional access policies gated on device compliance signals from the existing EMM, switching EMMs without updating these policies will lock users out of corporate resources. The new EMM needs to be registered as a compliance partner in Entra ID, and conditional access policies need to be updated to trust compliance signals from the new platform, _before_ devices are migrated. Running both EMMs as compliance partners in parallel during the migration period is the safest approach.

Support for this also needs to be validated! Not all EMMs hook into Microsoft's conditional access API.

### Applications

**Public apps** from managed Google Play are straightforward. Approve the same applications in the new EMM's managed Google Play iframe, apply the relevant managed configurations, and deploy them to the appropriate groups. The apps themselves don't change - they're the same Play Store listings.

**Private (in-house) apps** require more work. Private apps are published to a specific managed Google Play enterprise, identified by an enterprise ID. When an organisation sets up a new EMM and binds a new (or existing) enterprise, the private apps from the old enterprise aren't automatically available.

There are two paths:

The first is to request an app transfer through Google. This involves contacting Google Play support to move the private app from the old enterprise ID to the new one. The process isn't instant and may require involvement from the existing EMM vendor's support team, particularly if the enterprise was originally created and bound through their platform. It's worth reaching out to the existing vendor's support escalation path early in the planning process to understand what's involved.

The second is to share access to the new enterprise ID with the development team and re-publish the apps. Within the managed Google Play iframe, under advanced settings, it's possible to open the Google Play Console and manage access to the enterprise. This allows organisations to publish directly to the new enterprise without waiting for an app transfer. For organisations with only a handful of private apps, this is often the faster route.

Keep in mind, if the enterprise ID associated with the old EMM is deleted, this adds more complexity to the whole process. It's best to work towards app migration.

**Web apps** aren't worth even trying to migrate. They are created within managed Google Play on a per-enterprise basis and will need to be recreated in the new EMM. Given that web apps are simple (a URL, an icon, and a display mode), this is low-effort but easy to forget.

## Provisioning methods for re-enrolment

Once the new environment is prepared and tested, devices need to be enrolled. The provisioning method used will depend on the deployment scenario, the Android version, and what infrastructure the organisation has in place.

### Zero-touch enrolment

Zero-touch is the preferred method for fully managed, dedicated, and COPE devices wherever it's available (Android 9+ on all GMS-certified devices, Android 8.0 on Pixel). If the organisation's devices are already registered in a zero-touch console, migrating is as simple as updating the zero-touch configuration to point to the new EMM's DPC and DPC extras. Once the configuration is updated, any device that is factory reset will automatically enrol into the new EMM on next boot.

This is the single biggest advantage of zero-touch for migrations. There's no need to create new QR codes, no need to distribute NFC tags, no need to communicate provisioning instructions per-device. Change the configuration once, wipe the devices, and they land in the right place. For organisations with devices spread across multiple sites or remote workers, this is transformative.

For more on zero-touch, see [What is Android zero-touch enrolment?](/android/what-is-android-zero-touch-enrolment/) and the [zero-touch console administration guide](/android/android-enterprise-zero-touch-console-device-guide/).

### Knox Mobile Enrolment (KME)

Samsung devices can leverage KME in much the same way as zero-touch. Update the KME profile to point to the new EMM, and Samsung devices will enrol into the new platform after a factory reset. Organisations with a mixed estate may use both zero-touch and KME - zero-touch for the broader fleet, and KME for Samsung devices where additional Samsung-specific provisioning options are needed.


### Other OOBE

Zebra, Elo, and many other OEMs have their own zero-touch enrolment equivalents, investigate these even if they're not in use today, as it could save a lot of time during the migration and forever more.

### QR code provisioning

For devices not registered with zero-touch or KME (or others), QR code provisioning is the most flexible alternative for fully managed deployments. Generate a QR code from the new EMM containing the enrolment payload (Wi-Fi credentials, DPC extras, server details), and have users or IT staff scan it during the setup wizard after a factory reset. QR codes can be distributed via email, printed and posted in common areas, or hosted on an internal web page.

QR codes can be persistent - once generated, the same code can be reused across multiple devices, making them practical for batch migrations. They also support DPC extras for pre-configuring the enrolment experience, _and_ they can be emailed, printed, whatever you need to place them where they can be most impactful.

On Android 9 and later, the QR reader is built into the setup wizard, making the process faster as no additional package download is required.

### NFC provisioning

NFC provisioning uses a dedicated provisioning device or NFC tag to bump against a freshly reset device and initiate enrolment. It's been available since Android 5.0 and is still supported, though NFC bump provisioning was deprecated in Android 10 in favour of NFC tags.

NFC is practical for on-site batch provisioning where devices are being processed in bulk by IT staff, but it requires physical proximity and a provisioning device, making it less suited to distributed or remote migrations.

### StageNow and other OEM-specific tools

Zebra devices can leverage StageNow to configure devices during or after provisioning. While StageNow itself isn't an enrolment method for Android Enterprise in the traditional sense, it can be used to stage devices with network configurations, settings, and other prerequisites before or alongside the Android Enterprise enrolment process. Organisations with Zebra-heavy estates should factor StageNow profiles into their migration planning.

### DPC identifier

The DPC identifier (EMM token) - typing `afw#` followed by the EMM-specific identifier on the Google account screen - remains available but is the least preferred method for a migration. It's manual, error-prone (typos are common), and doesn't support DPC extras for pre-configuration. Use it as a fallback only.

### BYOD re-enrolment

For BYOD work profile migrations, the process is lighter. The user removes the existing work profile (or the organisation issues an enterprise wipe from the old EMM, which removes only the work profile), and then enrols into the new EMM. The enrolment experience will differ slightly depending on whether the new EMM is custom DPC-based or AMAPI-based; custom DPC vendors use their own proprietary agent app, while AMAPI vendors use Android Device Policy as the DPC, with the vendor's companion app guiding the enrolment experience.

Either way, the user downloads the relevant app from the Play Store, follows the enrolment flow, and a new work profile is created. Personal data is unaffected throughout.

### Why OOBE solutions are superior for migrations

If the organisation's devices are not currently registered with zero-touch or KME, a migration is an excellent opportunity to register them. Many resellers can retrospectively add devices to a zero-touch console using IMEI or serial number, and Samsung devices can be added to KME similarly. Investing the time to set this up now pays dividends not just for this migration, but for every future device lifecycle event.

## User management and identity

### Authenticate with Google

With the shift towards Google account-based provisioning as the standard identity method in AMAPI, a migration is an excellent time to evaluate how user identity is handled across the estate, particularly if the organisation hasn't already adopted this approach.

Traditionally, managed Google Play accounts - anonymous, EMM-managed accounts with no direct user association - have been the default for organisations without Google Workspace. These work well enough, but they don't tie a device to a known user identity in the way a Google account does.

Google's move towards Google account-based authentication means users authenticate with a real Google account during provisioning. This provides a stronger user-device association, simplifies single sign-on experiences, and aligns with how other platforms (iOS with Managed Apple IDs, Windows with Entra ID) handle device identity. It also enables more functionality for the user, the organisation, and the EMM platform today, and far more in future, such as:

- Cross-device productivity
- Data backup/restore
- Targeted customisation
- Forced enrolment when adding work accounts
- ..and more

If the organisation is moving to an AMAPI-based EMM, this is the natural point to implement Google account-based provisioning. It requires some upfront planning - ensuring users have appropriate Google accounts within a Google Workspace environment, verifying the domain domains in Google Workspace, and communicating the change to end-users - but the long-term benefits for user management and identity are significant.

### User groups and assignment

The migration is also a good opportunity to review how devices and users are grouped and targeted. If the existing EMM has accumulated years of ad-hoc groups, inherited assignments, and legacy targeting rules, recreating these in the new platform offers a chance to simplify. Map out which policies and apps should target which user populations, and build a clean group structure in the new EMM from the outset rather than replicating the mess.

## Communication and change management

### End-user communication

Don't underestimate the communication effort required, particularly for BYOD.

For company-owned devices (fully managed, dedicated, COPE), the organisation has the authority to mandate a migration. Devices can be wiped and re-enrolled on a schedule, with appropriate notice to end-users to back up personal data where applicable.

For BYOD, the organisation is asking users to voluntarily remove their work profile and re-enrol. Users can simply... not do it. And some won't, especially if they perceive the process as inconvenient or risky to their personal data (even though removing a work profile doesn't touch personal data). Clear, reassuring communication is essential:

- Explain what is happening and why.
- Be explicit that personal data, apps, and settings will not be affected.
- Provide step-by-step instructions, ideally with screenshots.
- Set a deadline, with a clear consequence for non-compliance (loss of access to corporate resources).
- Offer support channels for users who need help.

Starting with a soft deadline and following up with progressively firmer reminders tends to work better than a single hard deadline that catches people off guard.

### IT support readiness

Ensure the helpdesk and IT support teams are trained on the new EMM before the migration begins. They need to know how to troubleshoot enrolment failures, navigate the new console, and handle common end-user questions. A migration that goes smoothly for 95% of devices still generates a disproportionate volume of support tickets from the remaining 5%. For this reason it's also paramount to stress-test a vendor's support and services!

## Summary

Migrating Android devices between EMM platforms is a disruptive but manageable process. The key is preparation: audit the estate, replicate the environment, test thoroughly, and execute in phases. Use OOBE solutions like zero-touch and KME wherever possible to simplify re-enrolment at scale, and time the migration to coincide with natural opportunities like hardware refreshes or office days.

Don't rush the decommissioning of the old platform - keep it operational as a safety net until the migration is validated in production. And invest in clear, empathetic end-user communication, especially for BYOD where co-operation is voluntary.

A migration done well is an opportunity to clean house: simplify policy structures, modernise identity management, register devices with OOBE solutions for the future, and establish a cleaner, more maintainable management environment on the new platform.