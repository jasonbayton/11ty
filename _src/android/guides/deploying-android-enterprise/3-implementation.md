---
title: 'Implementation'
date: '2023-09-21'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
tags: 
    - Enterprise
layout: base.njk
permalink: false
---

A common, recurring issue at the time of implementation is not fully considering the security, privacy and productivity requirements of the workforce. Typically a balance will need to be found between security and convenience that meets the needs of the organisation, however how it is implemented can mean the difference between a workforce that can’t undertake their day-to-day tasks, and one where data leakage is rife.

Furthermore, understanding how best to deploy devices into the organisation ahead of time will result in far fewer headaches in future. Programs such as Android zero-touch enrolment deployed from the beginning will take a lot of effort out of provisioning devices and prevent the need to bring the devices back to base when issues arise, for example.

Adding to this, with the enforcement of GDPR, organisations must be stringent in the data collected, particularly with BYOD deployments. An EMM deployed with privacy defaults may be collecting app inventories, personal details, a full stack of device details and more; this information, if not related to a corporately owned device, may lead to problems should it be made public via any means.

Consider some of the following areas when undertaking an implementation.

### Security

The days of all corporate data being stored securely on a corporate network are at an end, with corporate data often sitting on various mobile endpoints, finding the right balance between convenience and security is a struggle many organisations face today. Outlined below are a number of industry best practices to consider during implementation which will aid the process somewhat.

**Passcode -**Passcodes are a given on most devices today and a key requirement for for encryption. Although setting up a passcode forms part of the setup wizard for most devices today, end-users do frequently opt to skip them for convenience, or rely on the least secure option - pattern.

As mobile devices hold anything from corporate email to confidential documentation, a strong passcode must be enforced.

The type of passcode to enforce is largely up to each individual organisation and how closely it must be tied to corporate policies, however industry best practice is currently a six to eight digit PIN as this offers a passcode both difficult to bruteforce (minimum of 1 million combinations) while being easier for end-users to remember. In comparison, a long, alphanumeric passcode may be more difficult to remember, more difficult to type and lead to the type of frustration that results in passcodes being written down.

Biometrics may also be added into the mix, though arguably anything other than fingerprint authentication shouldn’t be considered strong enough to protect corporate data, even fingerprint authentication itself could be considered opting for convenience over security.

Other industry best practices include limiting screen-on time to as short as is reasonable; 1 minute is fairly common though most devices will go down to 30 seconds also. When the screen does automatically turn off, ensure it locks immediately so as not to allow an opportunist the ability to access a device momentarily left on a table.

**Minimum OS version -**There’s little denying older devices running an outdated OS version will be susceptible to any number of vulnerabilities both known and unknown which could put corporate data at risk.

For this reason, recommended best practice would generally an OS version no earlier than _n-2._For Android, that would be 6.0.1 Marshmallow.

There are exceptions, though. Android benefits from a well-established security patch program keeping devices as far back as Lollipop secured against known threats, and more recently the Android Enterprise Recommended program ensures all validated devices will be patched for 3 years from release.

What security updates don’t do, however, is incorporate the latest innovations and features that come with letter upgrades. Things like QR code provisioning in Android 7.0, or zero-touch enrolment in Android 8.0 won’t be available in earlier Android releases and may prove troublesome to an otherwise.

Be it for security or usability, implementing a minimum version for corporate support is a good idea, and EMM platforms will allow the simple enforcement of this either via compliance policies or simply blocking enrolment.

**Data isolation -**There are generally no circumstances where the mixing of corporate and personal data should be desired or considered reasonable. The moment data sources mix, the ability to control where corporate data winds up, or where potentially harmful files or apps appear on the corporate network, are beyond the control of the organisation.

For many years data isolation has existed in the form of containerisation. With Android, the underlying user profile system has been leveraged to provide a native, separately encrypted and entirely isolated work profile for corporate data to reside, whilst providing seamless integration with the personal (parent) profile for ease of access and app switching. Android P also introduces seamless in-app profile switching to make it even easier for end-users to switch between profiles with little effort whilst maintaining security and privacy.

The Android work profile can be used in two scenarios, first as a BYOD deployment where the organisation only manages the corporate profile and has no management scope outside of this on the wider device. Second as a COPE deployment, where the organisation permits personal usage on a managed device whilst ensuring corporate data remains isolated and secure.

**Data Loss Prevention (DLP) -**Data loss prevention consists of a number of controls to assist in the prevention of corporate data leakage. Most heavily used in work profile or other container-based deployments, DLP controls ensure it isn’t possible to copy corporate data to an unmanaged location, grab screenshots of sensitive information within corporate apps or share confidential information with private contacts.

DLP controls aren’t limited to dual-profile scenarios though, and may be enforced device-wide to ensure corporate data can’t be shared over bluetooth or NFC for example.

A strong focus should be put on DLP controls within your EMM.

**Encryption -**Since Android 6.0 Marshmallow encryption has been enabled by default for Android devices, though where older versions are still in circulation or an OEM doesn’t enable encryption out of the box, ensuring it’s enforced via security controls offers additional protection for corporate data.

Devices enrolled with Android enterprise will be forced to encrypt as part of the process and in Android 8.0 the personal and work profiles use different encryption keys to further protect corporate data should the parent profile be compromised. In Android P, file-based encryption is enforced.

For organisations working in a legacy or hybrid management environment, ensuring encryption is enforced is highly recommended.

**Compliance -**Compliance policies set within the EMM solution offer a simple, autonomous method of monitoring device posture and enforcing actions should a device fall out of compliance. Some policies include:

* Compromised - Rooted or Jailbreak detection
* Last seen - How long since the device last checked in
* Data protection - If a passcode is not set, or encryption is disabled
* Disallowed applications - based on defined lists of whitelist, blacklist or mandatory applications installed on devices

Should a device fall out of compliance, actions range from a simple notification over email, SMS or push, to blocking access to corporate resources or even enterprise wiping devices.

Compliance policies should be leveraged to reduce the amount of time spent manually reporting on device posture.

**Controls and restrictions -**Organisational control over a device is arguably one of the primary reasons for business to invest in an EMM and for good reason.

A device may be lightly controlled, opting for DLP controls or the prevention of installation from unknown sources, through to disabling access to device radios, core functionality such app installation or blocking access to device settings, right down to full COSU with a kiosk permitting only the most basic of actions available on a device.

Whatever the purpose of the device(s), restrictions should be implemented only to the degree deemed necessary for the device use-case. Too far and end-users won’t want to use the device, not enough and end-users may use the device for more than intended, which could lead to data costs, the potential for PHAs and more.

As with most implementations, availability for user feedback and support should be provided to help best understand how devices are utilised and to therefore strike the correct balance.

<div class="callout">

The Android value-add

Android is the most flexible operating system on the market for EMM controls, offering a plethora of configuration options to suit needs of the business, as independently assessed by Gartner in 2016, 2017 and 2018. 

From 8.0 Oreo this also extends to kernel security and data isolation, also. Android security is therefore on par with its flexibility and a trustworthy solution for enterprise deployments.

</div>

### Deployment

As part of your strategy, you may have formed an opinion on how you wish to manage devices. be that embracing BYOD, allowing some personal use on a corporate device with COPE or fully locking the device down to a kiosk or otherwise. With this decided, consider how the devices will be deployed:

**SSO Integration -**It falls in line with best practice to integrate the EMM with on-prem (or cloud) resources managed by the organisation. At a basic level this could simply be Active Directory for user management which is highly recommended over manual account management directly on the EMM console. If AD isn’t used, EMM solutions may also support other IDPs (Identity Service Providers) and will have documentation covering how this is set up.

Irrespective of the method, it’s also good practice to limit the number of external groups being synced to the EMM for management, and most commonly the creation of two core groups will be enough to get started:

* EMM administrators
* EMM users

Naturally, more groups for business units may be created and synced to the console, and each group imported may then be used for configuration, profiles, application or policy assignment, all dynamically and ultimately managed from the backend service.

**Resource integration -** Common resources include email, for which some EMMs offer on-premise solutions or appliances for managed access to exchange. These may also be used to proxy Office365 or other cloud mail solutions, but at that point you’d be tunnelling a globally available service through a single point of failure, which may not make sense.

Also consider the access requirement for on-premise (or cloud) private repositories or intranets. Once again local appliances may be deployed to manage access to these resources without needing to open them up to the wider internet, whilst ensuring only managed devices can access them.

Knowing what is required to be implemented will have been useful during the planning stage, as well as the EMM selection stage for selecting the right platform to suit your needs, however as it’s a common requirement most EMMs will support all of the above and more.

**Device provisioning -**Depending on the chosen deployment methods, be that BYOD, COBO, COSU or COPE, deciding how devices will be provisioned ahead of time will save a lot of effort and confusion when undertaking the task.

No matter how devices are provisioned, be that QR code, zero-touch, Knox Mobile Enrolment (KME) or otherwise, the most important goal is to remain consistent; from this, you can create enrolment guides, have a support team that understands what they/end-users are doing and can easily troubleshoot.

In some cases multiple provisioning methods may be used, particularly in a fleet of devices that may be a mix of OS versions; those on 8.0 or above supporting Android zero-touch enrolment and purchased recently from a zero-touch reseller should leverage this, it’ll save everyone time. Older devices will benefit from settling on one method that works for all, like EMM token for Android 6.0+, or QR for Android 7.0+.

**Android enterprise accounts -**It is strongly advised to utilise Android enterprise for managing Android endpoints in the organisation due to legacy device administrator APIs being deprecated in Android Q, and part of the process for setting this up is to choose the type of connection to use.

If your organisation relies on G Suite internally, it would make sense to leverage G Suite for Android enterprise; the setup process for connecting Android enterprise to the EMM via G Suite is somewhat more involved than managed Google Play accounts, however it only needs to be setup once.

For any other situation, the organisation should utilise managed Google Play accounts. Most EMMs will support this method today and it requires only a few minutes with a generic, non-personal Google account, in other words [ae.businessname@gmail.com](mailto:ae.businessname@gmail.com) rather than [first.last@gmail.com](mailto:first.last@gmail.com). Once the connection is made it does not need to be renewed.

**App management -**As well as mail, profiles, configurations and policies, applications management is a cornerstone of device management.

How app management is handled with Android today can vary depending on how devices are deployed

* Legacy device admin enrolment will require a Google account and access to the public Google Play Store for public applications. When applications are pushed from the EMM platform, the end-user will be prompted to install the app, before configuring it for use.
* Legacy device admin enrolment utilising in-house applications can in some cases have applications installed silently via the EMM, however the end-user will need to have enabled unknown sources in settings, a potential security risk.
* Android enterprise enrolment supports both silent and on-demand app installation without a Google account _and_ can support pre-configuration of the apps during installation if configured on the EMM. Both public, in-house and privately-hosted applications are fully supported.

Android enterprise clearly outshines legacy enrolment for application management, even if only for the fact personal or corporate Google accounts are no longer going to cause a headache for all involved; without a Google account the fear of a Factory Reset Protection (FRP) device returning to base is almost non-existent.

**Grouping & organisation -**Tying into the earlier integration of IDP for SSO, one further key to a successful deployment is ensuring end-users are efficiently grouped within the EMM in order to get the relevant applications, policies, profiles and configurations. Some EMMs utilise groups in various implementations, whilst others utilise more of a tenant-subtenant approach to grouping devices. How devices are ultimately grouped is for the organisation to decide, however once complete, a recommended approach to deployment of policies and profiles is in a hierarchy where key configurations are created only once, whilst more flexible profiles are deployed further down the hierarchy:

* Global: Passcode Policy
* Global: Restrictions
  * Group specific: restrictions
    * Sub-group specific: VPN profile
    * Sub-group specific: location-specific WiFi configuration
    * …
  * ...
* ...

If the EMM supports it, utilising email domain recognition will help users to more easily enrol by simply inputting their email address rather than a long, complex server name and/or group ID.

Once enrolled, the end-user may be also be automatically pushed to the right group based on AD group membership, email domain, device type or more. The organisation of the platform, once set up, can be entirely autonomous.

### Privacy

Privacy is a talking point for organisations all over the world today, and for very good reason; protecting the privacy of end-users is not only the right thing to do, it’s being written into law across the world.

Historically EMM platforms, asset management tools and other tools such as Telecoms Expense Management (TEM) and Mobile Threat Defence (MTD) have collected data about the devices deployed indiscriminately and in-depth, administrators may collect application data, phone numbers, IMEI numbers and other device information all classified today as personal information.

While this is _more_acceptable where a device is company owned and controlled, for many years the very same collection has been prevalent for BYOD end-users also.

Thankfully today platforms offer tools to anonymise this data or not collect it at all, even for corporately owned devices, administrator roles can ensure only those with the relevant roles or permissions may see collected information, whilst functions such as the support desk would not.

Consider some of the following when thinking about end-user privacy:

**Application inventory & usage**- Normally enabled by default, application inventory, especially for BYO devices, should be disabled or at least anonymised where the inventory is being utilised by linked solution (such as MTD). Many platforms today support anonymising application inventory to ensure the privacy of the end user is respected; it benefits no one to see what sort of dating, health or lifestyle applications are being used, but can feel deeply invasive to know a whole support team may be freely able to see this data. Though Android strongly promotes user privacy in a BYOD environment out of the box with work profile support, preventing such issues as full app inventory ensures this is enforced across other means of enrolment and operating systems that do not promote privacy as strongly.

**Location**- There are few instances where the collection of data is justified, and can lead to the inadvertent tracking of end-user movements both in and out of work. If location reporting is enabled, so too should there be signed consent from the user depicting when and how this data is used.

**Telecom status**- Platforms can report data used on a per-app basis, log SMS messages and calls, collect roaming information as well as carrier information on a device. With a corporately owned device some of this may be acceptable, however for the most part again this can be construed as an invasion of privacy and a lot of collected personal data.

**User information**- By anonymising or hiding user information (usernames, email addresses, etc.), users aren’t associated with managed devices and as such cannot be linked to device usage trivially.

<div class="callout">

The Android value-add

Android enterprise supports work profile, a separate, isolated and uniquely encrypted device profile for a BYOD fleet which integrates with the parent profile to provide a controlled corporate environment on an otherwise user-owned device. 

With a work profile, the organisation sees and controls only the data within the dedicated work area, therefore maintaining user privacy by default, even if privacy is not enforced on the EMM platform.

</div>

All of this goes hand-in-hand with corporate HR policies outlining what users may or may not do with their devices and how the information collected will be used and processed. Adding a mobile device policy to the corporate welcome pack for new employees, and (bi-)annual revisions thereafter will ensure transparency and understanding is promoted.
