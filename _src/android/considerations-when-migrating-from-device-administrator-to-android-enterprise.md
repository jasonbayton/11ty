---
title: 'Considerations when migrating from device administrator to Android Enterprise'
published: '2017-12-17T22:50:56+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - General
layout: base.njk
eleventyNavigation:
  order: 1000
discourse_permalink:
    - 'https://discuss.bayton.org/t/considerations-when-migrating-from-device-administrator-to-android-enterprise/30'
FeaturedBackground:
    - android
---
<div class="callout callout-success">

### What is Android Enterprise?

For information regarding Android Enterprise, including what it is, the deployment scenarios stated below and how it can benefit organisations, have a read of [What is Android Enterprise and why is it used?](/android/what-is-android-enterprise-and-why-is-it-used/)

</div>

Organisations still managing Android devices through the legacy *device administrator* enrolment model need to migrate to Android Enterprise. Device administrator was [deprecated partially with Android 9 and fully in Android 10](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/), Google required Android Enterprise-validated EMMs to [have a plan in place](https://developers.google.com/android/work/requirements#6.-device-admin-deprecation_1) to cease support for Device Admin, and major EMM vendors have since ended Device Admin support entirely.

It is important to understand the implications of a migration from a device administrator deployment to one (or more) of the deployment scenarios available with Android Enterprise; depending on the deployment scenario chosen it *could* be very disruptive, but steps can be taken to reduce this.

The key to undertaking any migration is communication, planning and as much testing as is necessary to understand every possible challenge the organisation may face when making a fundamental change to how devices are managed. With those in mind, the following must also be taken into consideration for Android Enterprise.

## Managed Google (cloud identity) or managed Google Play accounts

<div class="callout callout-blue">

### Enterprise account types have changed

Since 2025, all new organisations completing the Android Enterprise bind process are provided with a zero-cost managed Google domain by default. The managed Google Play Accounts signup method is still available, but pushed aside in favour of managed Google domains. Existing organisations using managed Google Play Accounts can [upgrade at no cost](/android/android-enterprise-faq/what-is-managed-google-domain/) without disrupting enrolled devices. See [What is the bind?](/android/android-enterprise-faq/what-is-the-bind/) for more.

</div>

Organisations leveraging Google Workspace will find it easiest to integrate directly with their EMM platform in order to make use of Google Workspace accounts (managed Google accounts) and authentication when enrolling corporate Android devices. When entering a Google Workspace address during device setup, the device can become a fully managed device, controlled either by the native Google Workspace EMM (Google Endpoint Management) or a connected third-party EMM.

For organisations without an existing Google Workspace subscription, the bind process now creates a zero-cost managed Google domain automatically. This provides role-based access, MFA enforcement, and the ability to bind multiple EMMs. Previously, organisations without Google Workspace would use managed Google Play accounts - a simpler setup requiring only a generic Google account - but this path is deprecated in favour of managed Google domains.

The pertinent question for Google Workspace customers remains: *do we need Google Workspace identity in the EMM?* If the answer is no, and the organisation is happy to simply push out apps and services users can authenticate with using their Google Workspace accounts, there is little additional benefit to using managed Google accounts over the standard bind. For AMAPI-based EMMs, consider adopting Google account-based authentication (Authenticate with Google) for stronger user-device association and future feature support.

## Android OS version

Android Enterprise became mandatory with 6.0, Marshmallow. Although 5.0 introduced work profile support, compatibility was inconsistent and these devices are now well beyond end of life. Devices must be [GMS certified](/android/android-glossary/#gms-certifiedcertification) for Android Enterprise support. For AOSP devices without GMS, additional planning is required to leverage an EMM platform that supports Device Policy Management through a custom device agent.

Major EMM vendors have ended Device Admin support - Omnissa (formerly VMware) [blocked new DA enrolments in early 2024](https://kb.omnissa.com/s/article/95399) and subsequently removed DA management entirely, and others have followed. Organisations still running Device Admin enrolments on older devices will find their EMM no longer supports it. Any remaining legacy devices should be replaced and enrolled into Android Enterprise as a priority.

<div class="callout callout-danger">

### Planning required!

Deploying a hybrid environment incorrectly may (depending on the EMM) result in all Android Enterprise-capable devices being targeted by the relevant profiles/configurations and lead to a mass work profile roll-out. Though this can be postponed by the user, it is likely to be highly disruptive.

Always ensure in a hybrid scenario Android Enterprise is configured below the top-level in a hierarchical EMM, or to a dedicated group/label for others where it cannot impact more devices than explicitly required until such time legacy devices are retired from the platform, unless your EMM vendor explicitly states there is no concern. Active Directory groups may also offer an excellent, simple way of managing this.

</div>

## Supported features

Like iOS and legacy Android (Samsung in particular with Knox), with each major Android version, additional functionality is often added. This is equally no different in an enterprise context. Depending on the functionality required for various areas of an organisation, it may make sense to refresh some devices sooner rather than later. The full list of supported functionality per OS version can be found [here](https://developers.google.com/android/work/requirements/features), however as a very brief example:

- Device passcode management: 5.0
- Application configuration: 5.0
- Factory reset protection management: 5.1  
  –
- App runtime permission management: 6.0
- System update control: 6.0
- Cross-profile data management: 6.0  
  –
- Work profile passcode: 7.0
- Always-on VPN: 7.0
- Reboot device: 7.0

It’s therefore pertinent to ensure for example where functionality such as a secondary passcode for a secure container is required, the devices being migrated run at least Android 7.0, and so on.

## Provisioning methods

Android Enterprise launched with NFC for fully managed provisioning. With each major version launched up to 8.0, a new provisioning method has launched also. The following shows which provisioning methods can be used on each major version of Android:

- Android 9.0 & later: all of the below
- Android 8.0 Oreo: managed Google account, NFC, DPC identifier, QR code, zero-touch
- Android 7.0 Nougat: managed Google account, NFC, DPC identifier, QR code
- Android 6.0 Marshmallow: managed Google account, NFC, DPC identifier
- Android 5.0 Lollipop: NFC

QR code and zero-touch provisioning methods have in the past been considered optional and may not be supported by all OEMs unless the devices are [Android Enterprise Recommended](/android/what-is-android-enterprise-recommended/), though from the end of 2020 all Android 9 and above devices [support zero-touch by default](/2020/11/google-announce-big-changes-to-zero-touch/). Huawei, for example, did not support QR code enrolment prior to EMUI 5.2 (and today their devices without GMS don’t support AE at all). Furthermore, NFC naturally requires an NFC radio is present on the devices to be migrated; 5.x devices without an NFC radio cannot therefore be supported.

More information about provisioning methods can be found in the [provisioning methods guide](/android/android-enterprise-provisioning-methods/).

## Deployment scenarios

Similar to provisioning methods, deployment scenarios available today are also (though somewhat less) Android version dependent, with the below list intentionally excluding Android 5.x:

- Work profile: 6.0+
- Fully managed: 6.0+
- Dedicated/COSU (KIOSK): 6.0+
- Work profiles on fully managed devices (COPE): 8.0-10
- Work profiles on company owned devices (COPE): 11+

Work profiles on fully managed devices, which is commonly referred to as a COPE deployment, is available on Android 8.0-10 and offers the closest experience to a traditional device administrator deployment. From 11 this is replaced by work profiles on company owned devices, which is closer to a BYOD deployment with additional control.

## EMM support

Just as functionality is added with Android updates, so too will management capabilities be added with EMM platform updates. A concern more for organisations running EMM platforms on-premise than SaaS/cloud, some functionality may not be available until the platform has been updated to a minimum version.

One example is MobileIron Core, where support for Android Enterprise managed Google Play accounts was introduced with version 9.2.0.0, and has since seen several feature additions with each Core version up to the latest. Workspace ONE UEM as another example only introduced COSU support with 9.2, requiring a hybrid deployment for organisations wanting both Android Enterprise and kiosked devices prior to this.

Even so, not all EMMs will support all functionality due to time/budget constraints/demand, which is of course the same constraint all OS platforms are limited by. The organisation therefore will need to validate the functionality required is also supported by their EMM, something that should be much easier to do with the introduction of [Android Enterprise Recommended for EMMs](/2019/01/aer-expands-android-enterprise-recommended-for-emms/).

## EMM preparation

Simply binding an organisation’s EMM platform with Google won’t necessarily do anything (there are of course exceptions to this, and please ensure this is checked before enabling it, [see above](#planning-required)) until further Android Enterprise configurations/profiles/groups/etc have been created and applied.

As well as binding the EMM with Google, applications will need to be (re)imported and configured for the Android Enterprise deployment with managed configurations created where applicable. Additionally, profiles/configurations targeting the universal Android Enterprise APIs will need to be created (as those targeting Knox, device admin APIs etc will no longer work). Some examples of where managed app configurations replace legacy configurations are:

- Email/Exchange: A managed Gmail (or other email app) config will replace a legacy mail/Exchange configuration.
- Remote access to repositories: EMM vendors publish app config-compatible public versions of traditionally in-house MCM apps
- Internet blocklists: Managed Google Chrome supports traffic rules and many other options to limit non-business/risky browsing

Additionally, segregation between the legacy device configurations/profiles and the Android Enterprise-enabled devices should be undertaken. I feel this is rather important; often I see legacy policies/configs applied to an entire estate, perhaps as an “all devices” or “Android” assignment which will obviously also target Android Enterprise devices. While these configurations and profiles for the most part won’t apply, it will make it more difficult to troubleshoot issues with EMM logs full of partially applied or entirely failed attempts to push legacy configs.

<div class="callout callout-info">

### Tip!

A general piece of advice is not to assign apps/configs/policies/etc to such far-reaching groups/labels or at the top of a hierarchical structure and instead focus them more towards active directory/system groups that can be tweaked, changed or have devices easily excluded from them with little effort. This is not limited to Android Enterprise prep, but can also apply to VPP, DEP, differing authentication methods and more.

</div>

## Undertaking a work profile migration

<div class="callout callout-success">

### What is a work profile?

An overview of work profile can be found [here](/android/what-is-android-enterprise-and-why-is-it-used/#byod-and-work-profile).

</div>

The simplest, most straightforward migration route from device administrator to Android Enterprise is [work profile](/android/what-is-android-enterprise-and-why-is-it-used/#byod-and-work-profile). This is because it can be achieved with an OTA configuration change which will (on supported EMMs):

- Initiate the creation of a work profile on the device
- Remove the device administrator
- Disable the agent in the parent profile
- Resume management in the work profile

In doing so, the existing configurations pushed to the device still applied will be removed or become ineffective (with some exceptions) and all further configurations will be sent to the work profile and not the parent profile (device).

This isn’t, however, a comparable deployment. By switching from device administrator to work profile the organisation is relinquishing almost all control over the parent profile, or the *rest of the device*, and only controlling what happens essentially within a “container”. This therefore is likely not a popular migration, however it is the only path that **doesn’t involve a factory reset** and provisioning from a *new state*.

## Undertaking a fully managed migration

<div class="callout callout-success">

### What is a fully managed device?

An overview of fully managed can be found [here](/android/what-is-android-enterprise-and-why-is-it-used/#diving-deeper-with-work-managed-devices).

</div>

The migration from device administrator to a fully managed deployment scenario is a disruptive one as it requires a device is factory reset.

Whether this can be done by end-users or requires a visit back to base entirely depends on the technical abilities of the workforce. Typically it’s a bit of a mix and therefore some will be happy to follow an [informative provisioning guide](/android/android-enterprise-provisioning-guides/) while others will need to book an appointment with IT. The work-effort can only really therefore be estimated by the organisation, not forgetting to add in time to back up any unsaved data as this will be lost during the transition; again some users may be able to do this, others may not.

If new devices are replacing old (arguably the easiest way of transitioning from device admin to Android Enterprise), these can also be pre-enrolled potentially to a staging user and shipped to end-users, however if provisioning only, after a period of time without enrolling the device will automatically factory reset (a protective feature that ensures a device can’t be used unless it’s managed).

Depending on the deployment scenario the organisation opts for, the experience can feel far more locked down than a device administrator enrolment as fully managed is, by default, designed without personal use in mind (that is to say, managed Google Play limiting app access, no capabilities for sharing data in the same way, and so on).

These limitations can be mitigated by permitting functionality and the addition of personal Google accounts as required but this is not recommended unless it’s a COPE device due to the potential for data leakage.

Speaking of fully managed devices with work profiles (COPE), on Android 10 and below this is the closest functionally to a device administrator deployment and will therefore feel the most familiar both to end-users and administrators since the organisation can manage the device (parent profile) and the work profile independently, but opt for a more lenient approach than that of a standard fully managed deployment. After 11, there's a significant loss of management for IT, so going for a lenient fully managed deployment may make more sense.

For dedicated (COSU) deployments, EMMs are increasingly providing their own kiosk solutions in order to offer a seamless experience when moving from device administrator to Android Enterprise, however the COSU configurations/profiles will need to be recreated to target AE devices. Where no EMM-branded kiosk exists, Android Enterprise ships with its own, one that is drastically improved in Android 9.

### Application management

As well as limiting application installation to those approved for use and available in managed Google Play, devices deployed as fully managed will by default have many of the included system applications removed, but these may be re-enabled either fully (as a DPC extra) or partially via an EMM profile/configuration. During testing it will also be beneficial to understand the implications of removing system applications in terms of losing the ability to view some email attachments, take photos, and more. Should this cause issues, the applications in question should be re-enabled.

As a simple recommendation to avoid any scenario where files cannot be previewed or edited, the following *default* applications should be approved and deployed either to work profiles, or to fully managed devices where system apps have been disabled:

- [Google Docs](https://play.google.com/store/apps/details?id=com.google.android.apps.docs.editors.docs)
- [Google Sheets](https://play.google.com/store/apps/details?id=com.google.android.apps.docs.editors.sheets)
- [Google Slides](https://play.google.com/store/apps/details?id=com.google.android.apps.docs.editors.slides)
- [Google PDF viewer](https://play.google.com/store/apps/details?id=com.google.android.apps.pdfviewer)
- [Google Photos](https://play.google.com/store/apps/details?id=com.google.android.apps.photos)
- [Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome)

Should the organisation be a Microsoft house, then it may make more sense to push out the office suite, however Docs, Sheets, and Slides can all be configured not to require a Google account which turns them into simple viewers, something not possible on all editors available on the Play Store.

Furthermore, consider PIM:

- [Gmail](https://play.google.com/store/apps/details?id=com.google.android.gm)
- [Google Calendar](https://play.google.com/store/apps/details?id=com.google.android.calendar)
- [Google Contacts](https://play.google.com/store/apps/details?id=com.google.android.contacts)

These three, well-supported applications offer a native experience for end-users who may not be used to other Android PIM applications. Of course, just as Gmail supports managed configuration for pre-configuring the exchange/mail accounts (with Kerberos support also) so do others.

## Final words

If it isn’t clear already, a migration from a legacy deployment to that of Android Enterprise for anything other than work profile is not to be taken lightly, even a work profile migration requires thought and attention (and a lot of testing) to ensure it can be undertaken with the least amount of disruption.

DA has been removed from mainstream EMM products. Omnissa, Microsoft, Ivanti, and others no longer support Device Admin enrolment, and Google's own Android Management API (AMAPI) never offered it. For organisations with any remaining DA-enrolled devices, migration is no longer optional - it is overdue.

Devices still running Android versions old enough to have been enrolled via DA should be replaced entirely. Modern devices running Android 12+ provisioned through [zero-touch enrolment](/android/what-is-android-zero-touch-enrolment/) or other [provisioning methods](/android/android-enterprise-provisioning-methods/) offer a vastly better experience for both IT and end-users.

Android Enterprise is the only supported management framework for Android devices. Any remaining Device Admin enrolments represent technical debt and a security risk. Now is the time to migrate.