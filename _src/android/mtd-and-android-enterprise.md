---
title: 'Considerations when deploying MTD with Android Enterprise'
published: '2018-10-26T09:34:10+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - App management
layout: base.njk
eleventyNavigation:
  order: 2000
discourse_permalink:
    - 'https://discuss.bayton.org/t/considerations-when-deploying-mtd-with-android-enterprise/230'
---
Mobile Threat Defence (MTD) is an increasingly popular point of discussion for endpoint management, particularly with the ever-increasing worry of corporate devices falling victim to potentially harmful applications, network attacks and more.

As Android Enterprise adoption continues to grow, an important question arises more and more frequently: *how does MTD work with the various Android Enterprise deployment scenarios?*

Compared to legacy Android management, where organisations leveraged the [now deprecated](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/) device administrator APIs to gain control over a device and push corporate applications out alongside personal (preferably containerised), Android Enterprise with its stronger focus on user privacy and corporate data protection does pose an interesting challenge.

The goal for an MTD is full visibility over the whole device with the ability to interject when threats are detected. Visibility differs by MTD and what’s supported, but may include:

- System applications (apps preloaded from the OEM, mostly required for a functioning Android OS)
- User-installed applications (Play or sideloaded)
- Corporate applications
- Information about the network the device connects to in order to detect man-in-the-middle attacks, SSL stripping, cert spoofing and more
- Device details & posture (root detection, unknown sources, debugging, etc)
- Detection of applications attempting to open links which may be dangerous

As a reminder, here are the four deployment scenarios:

{% include "../_includes/_assets/img/android_enterprise_deployment_scenarios.svg" %}

And here’s a breakdown of visibility per deployment scenario:

## Company owned - Fully managed (COBO)

The simplest and therefore easiest to begin with. A fully managed (COBO) device for all intents and purposes acts similarly to a legacy-managed Android handset where MTD is concerned.

The organisation distributes the MTD agent to the device directly and, as the MTD resides within the only profile on the device, it detects:

- System and corporate applications (technically user apps also, but permitting this would not be recommended)
- Network information
- Device details and posture
- Malicious links opened from other applications on the device

As a fully managed device, there are no concerns over lack of visibility, and should the MTD make use of VPN, it will run system-wide.

## Company owned - Dedicated (COSU)

A COSU device is normally one utilising a kiosk, either natively (and particularly following improvements with Android Pie) or, more likely, via an EMM vendor kiosk/launcher.

Much like the fully managed device, deploying MTD to a COSU device will provide full access akin to a legacy enrolment, and can see:

- System and corporate applications
- Network information
- Device details and posture
- Malicious links opened from other applications on the device

There’s only one caveat; if the MTD solution cannot auto-activate on Android devices today, an MTD application would need to be made visible within the kiosk environment in order to allow for the opening and activation of the service. Exceptions apply so do check this with the MTD vendor.

## Personally and company owned work profile (BYOD, COPE)

**NB: From Android 11 the below work profile considerations also apply to COPE!**

Work profile is designed for deployments prioritising personal use and user freedom, and has differing constraints across personal and company owned devices. On personally-owned (BYOD) devices this is the expected deployment scenario. On company-owned devices, work profile was historically used either as an unintentional misconfiguration, or an intentional shortcut to move to Android Enterprise without wiping the device, and this leads to issues with MTD.

When a corporate application is deployed into a work profile, it is within an isolated, separately encrypted profile on the device with zero visibility of applications and limited visibility of actions outside. For a BYO device this is great as user privacy is fiercely protected, as it rightly should be.

As a result of the privacy protections in place, an MTD solution can only see the following:

- System and corporate applications
- Device details and posture
- Network information
- Malicious links opened from other applications within the profile

There is therefore no visibility of user-installed applications, which is arguably more important in an environment where users may install their own applications, compared to the approved-only approach offered with dedicated and fully managed devices.

Furthermore, unless links are opened within the work profile, the MTD will not be able to intercept any attempt to trick users into clicking a malicious URL; the MTD agent simply cannot see it.

Finally, should the MTD make use of a VPN, traffic will only be routed within the work profile; the VPN is not device-wide.

The less-than-ideal workaround for this would be to deploy the MTD into the parent (personal) profile of the device. For personally-owned BYOD devices, users would have to install and activate the application manually by fetching it from the Play Store. For company-owned COPE devices on Android 11+, personal usage policies give organisations limited ability to make apps available in the parent profile - users still need to install the MTD themselves, but it can be surfaced without requiring them to search the Play Store independently.

### ⚠️ Managed devices with work profiles (COPE) - Android 10 and below

**NB: This is deprecated and even on Android 10 and below may not function as described, particularly in AMAPI based EMM platforms. If in doubt, assume a platform manages COPE in alignment with Android 11 above.**

This deprecated COPE approach, on paper, technically has the capability to add the missing management aspect to the above modern work profile deployment scenario.

In reality though it very much depends on how the EMM/UEM vendor has chosen to implement it; vendors who believe the managed parent (personal) profile should be left mostly unmanaged will offer fewer configuration options, whilst others may believe it is up to the organisation to define the boundaries of personal use and offer a level of management directly comparable to a fully managed (work-managed) device.

In terms of visibility as defined by the Android Enterprise APIs, the MTD should be able to see:

- System, corporate and/or user applications
- Network information
- Device details and posture
- Malicious links opened from other applications on the device

This could be expected if the MTD is deployed into the parent profile, what is more likely at the moment however is the MTD being deployed into the work profile of the COPE device and as such it will by default lose access to user application visibility and visibility of device-wide malicious links.

As a direct comparison:

**MTD in parent profile**

- System and user applications
- Network information
- Device details and posture
- Malicious links opened from other applications on the device

**MTD in work profile**

- System and corporate applications
- Network information
- Device details and posture
- Malicious links opened from applications within the work profile

Once again this will need to be validated with MTD and UEM vendors as it really can be a pick-and-mix of functionality which is yet to be widely adopted still.

Should the MTD be deployed in the parent profile, any VPN connectivity will be system-wide, otherwise if deployed in the work profile the VPN will again, like BYOD, only route traffic within the work profile itself.

## Personally-owned devices without management (Device Trust)
From 2025, [Device Trust from Android Enterprise](/blog/2025/10/device-trust-android-enterprise/) introduces an option for organisations looking to understand the posture of devices that are not enrolled in an EMM. Device Trust provides over 20 verified signals - including security patch level, OS version, encryption status, screen lock complexity, Play Protect status, and network security - without requiring device management.

For MTD this is notable for two reasons. First, MTD vendors historically needed to either integrate with an EMM to access device posture signals, or build out the capability to fetch this information independently. Device Trust removes that dependency; approved vendors can integrate with Device Trust, giving them the ability to pull a verified snapshot directly, in milliseconds, without a management profile on the device.

Second, it changes the conversation for organisations that have resisted full device management on BYOD but still want some assurance of device health. Rather than deploying an MTD agent into an unmanaged environment with limited context about the device it is running on, the MTD can now correlate its own threat signals with verified posture data from Device Trust - strengthening risk scoring and enabling more informed decisions about access to corporate resources.

Device Trust does not enforce policy or replace an MTD solution. It is a passive signal layer. The value for MTD is in what it provides alongside the agent: verified context that was previously only available through management.

## Private Space (Android 15+)

Android 15 introduced [Private Space](/android/what-is-android-15-private-space/), an additional isolated area within the personal profile where users can install apps that are hidden from the rest of the device. It's basically another work profile, for all intents and purposes here. 

For MTD, this follows the same isolation logic already described for the work profile - an MTD agent deployed in either the work profile or the parent profile has no visibility of apps installed in Private Space.

This is worth being aware of when evaluating MTD coverage on personally-owned or COPE devices, particularly as Private Space adoption grows on Android 15+ handsets. The threat surface is the same; the administrative awareness of it may not be.

The Private Space _can_ be turned off for company owned devices (it is by default for fully managed) so that's an option for COPE devices also to avoid risk.

## Touching on VPN capabilities

Some MTD vendors offer VPN capabilities, or may even entirely rely upon a persistent VPN connection to be remotely useful. The problem with this approach, though valid and arguably potentially necessary for some traffic management capabilities prior to Android Pie (when APN configuration support was introduced), is as follows:

**Android supports one active VPN session at a time.**

This means if an organisation relies on VPN for traffic routing back into the corporate network, ad-hoc access to resources or anything else, these VPN networks will clash, and MTD protection will suffer. Add in the option of enforcing an always-on VPN connection through the UEM against the VPN solution of choice for an organisation and MTD solutions which fundamentally rely on a VPN connection are basically useless. On the flip-side, where no corporate VPN is in use, the same always-on VPN enforcement can be applied to the MTD, ensuring even if the user kills the VPN connection, it'll start right back up again.

It is worth noting that not all MTD solutions use VPN in the same way, or at all. Microsoft Defender for Endpoint, for example, uses what Microsoft describes as a [local, self-looping VPN](https://learn.microsoft.com/en-us/defender-endpoint/android-configure) - traffic doesn't leave the device. It is used purely as a mechanism to inspect traffic on-device for [web protection and anti-phishing](https://support.microsoft.com/en-us/topic/microsoft-defender-for-endpoint-and-your-privacy-on-android-and-ios-mobile-devices-4109bc54-8ec5-4433-9c33-d359b75ac22a) rather than routing it elsewhere. This is architecturally different from a traditional corporate VPN tunnel, but it still occupies the single VPN slot Android permits. So while the purpose differs, the contention problem remains.

Other vendors have moved away from VPN-based detection entirely and may be worth another look. Zimperium performs [on-device, machine learning-based analysis](https://www.zimperium.com/machine-learning-z9-technology/) without requiring a VPN connection at all, sidestepping the slot contention issue completely.

Organisations should clarify with their MTD vendor whether the solution requires a VPN slot, and if so, whether that conflicts with existing VPN infrastructure. "Requires VPN" is not a universal assumption for MTD; it is vendor-specific, and the question is worth asking early.

## Conclusion

Depending on the Android Enterprise deployment scenario in use, MTD protection can range from basic – protecting primarily corporate data within a work profile, to full – protecting the entire device with no visibility issues.

Considering under what deployment scenario an MTD would be used ahead of time will ensure there’s no confusion about the capabilities available, and with enough forward-thinking, the need for an MTD could and should influence the deployment scenario chosen by the business to begin with.

That about covers Android Enterprise. For more information about MTD in general, I’d recommend the following articles on [planning](https://www.techtarget.com/searchmobilecomputing/opinion/How-to-plan-your-mobile-threat-defense-deployment) for and [deploying](https://www.techtarget.com/searchmobilecomputing/opinion/Real-world-notes-on-deploying-mobile-threat-defense) an MTD solution. Thanks [Colm](https://www.linkedin.com/in/colmwarner/) & Peter!