---
title: 'Android glossary'
published: '2018-01-26T00:49:17+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Resources
layout: base.njk
id: 5246
doccats:
    - Android
Version:
    - '1.4'
publish_post_category:
    - '6'
discourse_permalink:
    - 'https://discuss.bayton.org/t/android-glossary/35'
FeaturedBackground:
    - android-gen
---
This document offers definitions and descriptions of commonly referenced acronyms, names, features and more that appear in published Android and Android Enterprise documents both here on bayton.org and elsewhere.

If there are definitions missing or incomplete, please feel free to suggest additions via [email](mailto:jason@bayton.org), [twitter](https://twitter.com/jasonbayton), a comment or use the feedback link at the bottom of the article.

API
---

One or more functions of an application or service that may be accessed by a 3rd party, either publicly or with authentication. As a practical example, the EMM agent on a device may request a passcode is set and/or validate it is both set and within policy requirements frequently by leaning on the relevant device API for this information.

COBO
----

Corporate Owned, Business Only. In which a device will have no capacity or capability to permit for personal usage; the Play Store will be locked down to only corporate applications, any options for sideloading APKs will be disabled and basic functions such as camera, account management and more may not be present. COBO devices can only be used in a corporate context. See [work-managed](#work-managed).

COPE
----

Corporate Owned, Personally Enabled. A COPE device will support both work and (limited) personal usage often by separating or containerising corporate data away from the personal space, allowing for the addition of a personal account, applications and more. Often COPE devices will see limited restrictions in the personal space, whilst DLP controls heavily restrict the movement of corporate data beyond the container, or work profile. See [fully managed devices with work profiles](#fully-managed-devices-with-work-profiles).

COSU (Kiosk)
------------

This term has been deprecated in favour of [Dedicated](#dedicated-device).

Dedicated device
----------------

Previously referred to as Corporate Owned, Single Use or COSU. Often associated with a kiosk, Dedicated devices are designed for single-purpose devices such as point-of-sale, asset tracking, fixed store display terminals, etc. A dedicated device may be locked down to one, or multiple applications and is often controlled via a kiosk profile through EMM.

Device administrator
--------------------

This is the name for what can be considered the *legacy* method of managing an Android device. It is so called because when using an application that requires control over the device, such as an EMM agent, the application will prompt the user to grant it administrator privileges. Once granted, the application will have unrestricted access to device functionality and information in order to do whatever it needs without hindrance. This access is equally why device admin can be dangerous.

Device owner
------------

A technical term for what is now mostly associated with [work-managed](#work-managed). Device owner is the process of setting an EMM agent as the [device policy controller](#dpc-device-policy-controller) for the entire device. It is essentially what has replaced [device administrator](#device-administrator) on legacy devices and enrolments.

DPC (Device Policy Controller)
------------------------------

DPC, or Device Policy Controller, is one name for the EMM agent locally installed on a mobile device. Some examples of a DPC include MobileIron Mobile@Work and AirWatch Agent. These applications control and enforce policies on devices sent down from the EMM server.

DPC extras
----------

These are optional snippets of configuration (or metadata) an administrator can pass to the [DPC](#dpc-device-policy-controller) in order to configure additional dynamic functionality into the [DPC](#dpc-device-policy-controller). An example of this would be sending the console URL for a hosted EMM platform, user names and/or passwords for automatic staging, whether system apps should be enabled or disabled and more.

DPC identifier (DPCi)
---------------------

A provisioning method for Android Enterprise [work-managed](#work-managed) enrolments, DPC identifiers are provided and maintained by Google for EMM partners supporting Android Enterprise [work-managed](#work-managed) enrolment. The DPC identifier is entered during setup in place of the Google account when asked to sign in to the device and starts with **AFW#**. Some examples of a DPCi are:

- afw#mobileiron.cloud
- afw#airwatch
- afw#blackberry
- afw#meraki

Some external documentation may also reference this as **EMM token** or **Wireless Enrolment Token (WET)**

GMS certified/certification
---------------------------

Not to be confused with the GMS license, which is simply permission for a company to use/distribute the Google suite of applications, GMS certification provides Google’s stamp of approval that a device meets Google’s recommended specifications and requirements. It is not a requirement for devices to be GMS certified in order to be made and sold – a notable example being the Amazon Fire line of tablets – however Android Enterprise is officially only supported on GMS certified devices and therefore purchasing non-GMS certified devices, such as low-cost options from China, is almost certainly going to result in difficulty managing them.

NFC
---

Near Field Communication(s) – NFC is a radio on the device used for close-proximity data transmission. Android Pay utilises NFC for contactless payments, however it is also widely used in the EMM industry for device enrolment/provisioning, supporting the transmission of EMM server or Android Enterprise data from a host device to the target with a simple bump.

OEM
---

Original Equipment Manufacturer, a manufacturer of devices such as Samsung, Sony or LG.

Parent profile
--------------

The parent profile is essentially *the device* on a BYOD or [COPE](#cope) [work profile](#work-profile) deployment. It is referred to as the parent profile as the work profile is integrated into it. Technically the profiles sit alongside each other on the device rather than the work profile being a “child” of the parent, however this is how it’s perceived and commonly explained.

Profile owner
-------------

An technical term for what is now mostly referenced as [work profile](#work-profile). A profile owner is normally considered to be the [DPC](#dpc-device-policy-controller) installed on a device by an EMM solution or a user if downloaded from the Play Store. It has permission to create a work profile, manipulate it and remove it, but holds very little control over the [parent profile](#parent-profile)

Provisioning
------------

The act of preparing a device for enrolment. During provisioning the device will download and install a [DPC](#dpc-device-policy-controller), then set the device as [work-managed](#work-managed) before landing on the home screen (or just before depending on when EMM enrolment is prompted). In the [provisioning guides](/android/android-enterprise-provisioning-guides/), provisioning and enrolment are clearly referred to as two separate tasks for deploying a device. Once provisioning completes, the user can then enrol through the [DPC.](#dpc-device-policy-controller)

Unknown sources
---------------

This is a setting on most Android devices to permit the installation of applications via means external to the official Play Store. If you’ve ever tried to install an APK file on a device, you will have been prompted to enable unknown sources. Installation of applications via unknown sources however contributes to well over 60% of all malware and other threats, and is therefore strongly discouraged – in fact, it’s disabled in Android Enterprise by default.

Work challenge
--------------

A secondary passcode requirement for BYOD [work profile](#work-profile) devices. Not dissimilar to traditional container solutions which required a PIN in order to access the applications within. Essentially you’ll have one passcode to unlock the device, then another passcode requirement in order to open any work applications.

Work-managed
------------

Please see [What is Android Enterprise and why is it used &gt; Diving deeper with work-managed devices](/android/what-is-android-enterprise-and-why-is-it-used/#diving-deeper-with-work-managed-devices) for information on work-managed.

Work profile
------------

Please see [What is Android Enterprise and why is it used &gt; BYOD and work profile](/android/what-is-android-enterprise-and-why-is-it-used/#byod-and-work-profile) for information on work profile.

Fully managed devices with work profiles
----------------------------------------

Please see [What is Android Enterprise and why is it used &gt; Diving deeper with work-managed devices](/android/what-is-android-enterprise-and-why-is-it-used/#diving-deeper-with-work-managed-devices) for information on fully managed devices with work profiles.

Zero-touch
----------

Please see [What is Android zero-touch enrolment?](/android/what-is-android-zero-touch-enrolment/) for information on zero-touch.