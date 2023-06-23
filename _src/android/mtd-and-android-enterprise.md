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
Mobile Threat Defence (MTD) is an increasingly popular point of discussion for endpoint management, particularly with the ever increasing worry of corporate devices falling victim to potentially harmful applications, network attacks and more.

As Android Enterprise adoption continues to grow, an important question arises more and more frequently: *how does MTD work with the various Android Enterprise deployment scenarios?*

Compared to legacy Android management, where organisations leveraged the [now deprecated](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/) device administrator APIs to gain control over a device and push corporate applications out alongside personal (preferably containerised), Android Enterprise with its stronger focus on user privacy and corporate data protection does pose an interesting challenge.

The goal for an MTD is full visibility over the whole device with the ability to interject when threats are detected. Visibility differs by MTD and what’s supported, but may include:

- System applications (apps pre-loaded from the OEM, mostly required for a functioning Android OS)
- User-installed applications (Play or sideloaded)
- Corporate applications
- Information about the network the device connects to in order to detect man-in-the-middle attacks, SSL stripping, cert spoofing and more
- Device details &amp; posture (root detection, unknown sources, debugging, etc)
- Detection of applications attempting to open links which may be dangerous

Here’s a breakdown of visibility per deployment scenario:

Fully managed
----------------------------

[![](https://cdn.bayton.org/uploads/2018/10/wm.png)](https://cdn.bayton.org/uploads/2018/10/wm.png)

The simplest and therefore easiest to begin with. A fully managed (COBO) device for all intents and purposes acts similarly to a legacy-managed Android handset where MTD is concerned.

The organisation distributes the MTD agent to the device directly and, as the MTD resides within the only profile on the device, it detects:

- System and corporate applications (technically user apps also, but permitting this would not be recommended)
- Network information
- Device details and posture
- Malicious links opened from other applications on the device

As a fully managed device, there are no concerns over lack of visibility, and should the MTD make use of VPN, it will run system-wide.

COSU (dedicated device)
-----------------------

[![](https://cdn.bayton.org/uploads/2018/10/cosu2-1.png)](https://cdn.bayton.org/uploads/2018/10/cosu2.png)

A COSU device is normally one utilising a kiosk, either natively (and particularly following improvements with Android Pie) or, more likely, via an EMM vendor kiosk/launcher.

Much like the fully managed device, deploying MTD to a COSU device will provide full access akin to a legacy enrolment, and can see:

- System and corporate applications
- Network information
- Device details and posture
- Malicious links opened from other applications on the device

There’s only one caveat; as most MTD solutions cannot auto-activate on Android devices today, an MTD application would need to be made visible within the kiosk environment in order to allow for the opening and activation of the service. Exceptions apply so do check this with the MTD vendor.

Work profile (BYOD)
-------------------

[![](https://cdn.bayton.org/uploads/2018/10/workprofile.png)](https://cdn.bayton.org/uploads/2018/10/workprofile.png)

**NB: From Android 11 the below work profile considerations also apply to COPE!**

Work profile is designed for Bring Your Own Device (BYOD) deployments, however in reality and unfortunately work profile is utilised on many, many corporately owned devices across the world, which in general is less than ideal, but in the case of MTD is definitely not a particularly good thing.

When a corporate application is deployed into a work profile, it is within an isolated, separately encrypted profile on the device with zero visibility of applications and limited visibility of actions outside. For a BYO device this is great as user privacy is fiercely protected, as it rightly should be.

As a result of the privacy protections in place, an MTD solution can only see the following:

- System and corporate applications
- Device details and posture
- Network information
- Malicious links opened from other applications within the profile

There is therefore no visibility of user-installed applications, which is arguably more important in an environment where users may install their own applications, compared to the approved-only approach offered with dedicated and fully managed devices.

Furthermore, unless links are opened within the work profile, the MTD will not be able to intercept any attempt to trick users into clicking a malicious URL; the MTD agent simply cannot see it.

Finally, should the MTD make use of a VPN, traffic will only be routed within the work profile; the VPN is not device-wide.

The less-than-ideal workaround for this would be to deploy the MTD into the parent (personal) profile of the device, however without corporate management of this profile, users would have to install and activate the application manually by fetching it from the Play Store.

Managed devices with work profiles (COPE)
-----------------------------------------

![](https://cdn.bayton.org/uploads/2018/10/wmwp.png)

**NB: The below considerations should be applied only to Android 8.0-10. Android 11 utilises a BYOD style COPE implementation.**

The COPE approach, on paper, technically has the capability to add the missing management aspect to the above BYOD deployment scenario.

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

Touching on VPN capabilities
-----------------------------

Some MTD vendors offer VPN capabilities, or may possibly even entirely rely upon a persistent VPN connection to be remotely useful.

The problem with this approach, though valid and arguably potentially *necessary* for some traffic management capabilities prior to Android Pie (when APN configuration support was introduced), is as follows:

*Android supports one active VPN session at a time.*

This means if an organisation relies on VPN for traffic routing back into the corporate network, ad-hoc access to resources or anything else, these VPN networks will clash, and MTD protection will suffer.

Add in the option of enforcing an always-on VPN connection through the UEM against the VPN solution of choice for an organisation and MTD solutions which fundamentally rely on a VPN connection are basically useless.

On the flip-side, where no corporate VPN is in use, the same always-on VPN enforcement can be applied to the MTD, ensuring even if the user kills the VPN connection, it’ll start right back up again.

This limitation is very much worth consideration before making a decision on MTD vendors, as it can result in a lot of wasted time and effort when it becomes clear it isn’t suitable. Organisations reliant on an existing VPN solution should make this abundantly clear when engaging with MTD vendors.

Conclusion
----------

Depending on the Android Enterprise deployment scenario in use, MTD protection can range from basic – protecting primarily corporate data within a work profile, to full – protecting the entire device with no visibility issues.

Considering under what deployment scenario an MTD would be used ahead of time will ensure there’s no confusion about the capabilities available, and with enough forward thinking, the need for an MTD could and should influence the deployment scenario chosen by the business to begin with.

That about covers Android Enterprise. For more information about MTD in general, I’d recommend the following BrianMadden.com articles on [planning](https://www.brianmadden.com/opinion/How-to-plan-your-mobile-threat-defense-deployment) for and [deploying](https://www.brianmadden.com/opinion/Real-world-notes-on-deploying-mobile-threat-protection) an MTD solution.