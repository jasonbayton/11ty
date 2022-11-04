---
title: 'VMware WS1 UEM 1908 supports Android Enterprise enrolments on closed networks and AOSP devices'
date: '2019-08-24T23:01:17+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 8670
tag:
    - android
    - 'android enterprise'
    - EMM
    - 'Enterprise Mobility'
    - MDM
    - vmware
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/vmware-ws1-uem-1908-supports-android-enterprise-enrolments-on-closed-networks-and-aosp-devices/313'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
Last week VMware released WS1 UEM 1908 with a surprising new feature, Android Enterprise enrolment for devices without the ability to leverage GMS apps and services.

https://www.youtube.com/embed/zmFgocI27zM?start=305

WS1 release video, 5:05 onwards is the brief Android mention.</figcaption></figure>In the short overview above (starting at [5:05](https://youtu.be/zmFgocI27zM?t=305)) a simple explanation of the feature is provided:

> We’ve added support for enrolling work-managed devices without Google Play Services. With this feature you will be able to configure Android Enterprise on devices running on a closed network which has no internet access or without Google Mobile Services (GMS)
> 
> <cite>Roger Deane, VMware</cite>

On first glance I took this to mean, perhaps, Google had introduced an answer to challenges faced by organisations where Google services aren’t available, such as in China (where GMS cannot be used due to the country blocking access to Google services) and VMware were simply first to leverage it; however on checking it out, it’s instead an option provided by VMware to exploit a technical possibility Google aren’t keen to encourage.

Enabling AOSP enrolment
-----------------------

This feature is enabled at the Organisation level within settings. For orgs without an AE bind in place already, a checkbox appears with a warning when ticked:

![](https://cdn.bayton.org/uploads/2019/08/2019-08-24-00.53.06.gif)

For those with a bind in place, simply click on the **Enrollment Settings** tab, **Override** if required and switch the **work-managed enrollment type** to **AOSP/CLOSED NETWORK**

![](https://cdn.bayton.org/uploads/2019/08/2019-08-24-00.54.33.gif)

The (obvious) caveats
---------------------

Effectively all that appears to be happening is a typical Android Enterprise enrolment (provisioned however it makes sense to do so for your organisation) without the creation and assignment of a managed Google Play account.

Without said account, you lose access to Android Enterprise features which rely on this, primarily:

- No silent app install via Google Play, providing access to apps in Google Play or deploying managed configurations for public apps. The only means of pushing apps is [sideloading APKs](/android/why-you-shouldnt-install-apps-from-unknown-sources/).
- No OEMConfig for public apps (relies on Play API)
- Any account-based features

VMware does support deploying managed configurations and OEMconfig through XML profiles, though with that you’re still required to take any public apps you want to support, locate an APK from a trusted source and manage it accordingly for all device types and architectures. It’s not something I’d advocate.

Arguably in closed networks none of this would be a concern, and a number of other features equally wouldn’t be available without access to Google anyway.

One side-effect to consider also, when provisioning a device using [DPC identifier](/android/android-enterprise-dpc-identifier-collection/), the process of removing the placeholder account and swapping it out was not undertaken, so all devices provisioned in this way will be left with an “Android Enterprise” account on the device, which may cause issues.

Why this works
--------------

Google only supports Android Enterprise on GMS devices, those aligned with the CDD (Compatibility Definition Doc, which defines how an Android device should function and what it should support in order to be considered compatible with the wider Android ecosystem).

Prior to gaining GMS certification the device is considered AOSP, but in aligning to the CDD and preparing for GMS without undergoing GMS certification, the APIs for Android Enterprise are already there and pretty much guaranteed to work. (OEMs that don’t align with the CDD are more likely to ship with poor support for AE, mind you, so can those who [supposedly do qualify](/android/android-enterprise-device-support/poco-f1-android-enterprise-validation-report/) for GMS!).

Therefore, technically, AOSP devices can leverage Android Enterprise management, without GMS and thus managed Google Play, Android Management API, etc compatibility. Only the restrictions work.

As mentioned above, it’s not something Google actively encourage.

It didn’t work too well for me
------------------------------

![](https://cdn.bayton.org/uploads/2019/08/Screenshot_20190823-230254.png)

I attempted an enrolment with the AOSP setting selected, and via two separate [provisioning methods](/android/infobyte-did-you-know-android-enterprise-work-managed-provisioning-methods/) (NFC, DPC identifier) Hub crashed out and refused to open on an Xperia 10.

It turned out to be due to a requirement for an agent update that wasn’t well-publicised, and since updating has resolved the crashing issue.

VMware aren’t the first to introduce this
-----------------------------------------

As it happens when I realised this was a VMware-implemented feature, it reminded me of what [Miradore](https://www.miradore.com/product/) have had for a few years.

They offer a completely [free tier](/2015/03/miradore-online-mdm-review-a-second-look/) with very basic management capabilities; Android Enterprise restrictions are included in this tier, but managed Google Play accounts and the associated Google Play features require an upgrade.

Miradore aren’t the only ones either, with SOTI also supporting enrolment without the creation of managed Google Play accounts, they just don’t make a lot of noise about it.

Encouraging non-GMS enrolments
------------------------------

What’s concerning with VMware’s implementation is wording it in a way that actively targets non-GMS devices. While perfectly valid for OEMs like Zebra who offer a GMS-restricted mode on otherwise GMS licensed devices, when targeting AOSP as a valid option for AE management, organisations are far more likely to run into problems with devices that can’t be certified.

By pushing this as a solution for AOSP device management it encourages organisations to stray from GMS Android and into the murky realms of AOSP; cheap devices sourced from ebay or further afield, those by manufacturers with no intention to support not only enterprise capabilities, but aligning to the standards of GMS to begin with.

I know this, because I’ve already had these types of questions land in my inbox, with references to unknown OEMs and how they may suddenly be viable for organisations who’d typically stick to GMS.

To conclude
-----------

VMware are clearly thinking outside the box in bringing solutions to market where Google are dragging their heels (closed networks, China), but it’s less thrilling to see it actively promoted as a solution for uncertified devices.

If I was marketing this myself, I’d have focused purely on closed networks and left those who can put 2+2 together to realise the implications for non-GMS devices. As is stands I foresee the potential for trouble ahead. *Especially* with device admin deprecation pushing organisations to figure out how they’re going to adapt in future.

Time will tell.