---
title: "Why don't all Android devices come with GMS?"
published: '2024-07-20'
status: publish
author: 'Jason Bayton'
excerpt: 'Exploring reasons not all Android devices come with Google Mobile Services pre-installed.'
type: documentation
tags: 
    - General 
layout: base.njk
eleventyNavigation:
  order: 4000
---

A common question, or critique, regarding non-standard Android devices - such as wearables, TV boxes, or, in the recent case, the Rabbit R1, which was discovered to run Android 13 AOSP - is why Google applications aren't pre-loaded, and why these devices don't get GMS (Google Mobile Services) or EDLA certification to run Google's apps and services.

The perception might be understandable given that many devices on the market today come with GMS/Play Protect certification and have the permission to run Google's core app suite, however the process is not as simple as pre-loading the apps and going to market.

## Understanding GMS

Google Mobile Services (GMS) - more recently rebranded to Play Protect - certification is a collection of Google applications and APIs that help support functionality across devices. This includes popular apps like Google Maps, Gmail, Google Play Store, and Google Search. For a device to come pre-loaded with these apps, it must obtain certification from Google. This certification ensures that the device meets Google's performance standards, ecosystem compatibility, and can provide a consistent user experience across different devices.

## The Compatibility Definition Document (CDD)

Before seeking certification, every Android device must adhere to the Compatibility Definition Document (CDD), which outlines the requirements a device must meet to ensure compatibility with the Android ecosystem. This document is essential for maintaining a consistent user experience and ensuring that apps behave as expected across different devices. More details on CDD can be found [here](/android/what-is-android-enterprise-and-why-is-it-used/) and [here](/android/android-enterprise-faq/view-all-certified-devices/). This prerequisite for certification in itself can rule a device out for certification, as both hardware and software requirements a potential certified device must adhere to are restrictive. 

## The GMS Certification Process

In addition to the CDD, Google then has a specific set of requirements for GMS certification. These requirements include various technical, security, and performance standards that a device must meet, as well as contractual obligations to have a product in the market that doesn't reflect poorly on Android.

The process of certifying involves rigorous testing to ensure the device can run Google apps efficiently and securely, the device doesn't ship with harmful apps or glaring vulne rabilities, and vendor implementations correctly surface the best of Google front-and-centre on a device. This is not a simple or quick process, as it involves multiple stages of testing and verification. Detailed steps on the certification process can be found [here](/blog/2024/01/certifying-android-devices/).

## Why Some Devices Don't Have GMS

Taking the above into consideration then, there are several reasons why a device might not come with GMS pre-loaded:

1. **Cost and Licensing**: Obtaining GMS certification can be costly for manufacturers, especially for low-cost devices. The licensing fees and the resources required to meet Google's standards can be prohibitive.

2. **Device Type**: Some devices, like certain wearables or TV boxes - or even oddly-sized handsets - may not be designed to meet the full range of GMS requirements. These devices often run a version of Android tailored for specific functions and might not need the full suite of Google apps.

3. **Regional Restrictions**: In some regions, manufacturers may choose to omit GMS due to local regulations or market conditions. For example, in China, Google services are blocked, and manufacturers often ship devices with AOSP (Android Open Source Project) and alternative app stores and services. Additionally, some countries may have additional licensing requirements even if the device is GMS certified. This means that manufacturers might prefer to ship devices with AOSP in markets where additional work is needed to avoid the complexity and cost of complying with regional requirements.

4. **Restrictive Requirements**: AOSP offers OEMs unfettered customisation of the device, software, and overall experience. A kiosk solution for example may boot directly into the customer app and services direct from the factory, completely omitting the laborious Google-mandated setup and provisioning experience in place today.

## GMS and Android Enterprise

Speaking of provisioning: Unofficially, without GMS certification, modern Android devices do allow for limited Android Enterprise management with an EMM that supports closed network or non-GMS management, or a custom DPC that directly interfaces the Device Policy Manager (DPM) APIs on the Android device. However, assume that account and application-based functionality that leans on Google Play services, Google Play, or any other aspect of the GMS suite of applications will not work.

Furthermore, standard provisioning methods will not work, as these are provided by Google's Set Up Wizard (SUW) flow. The only option, unless the AOSP device OEM implements a different solution, is to set an application as a Device Owner (DO) through ADB. More information can be found [here](/android/android-enterprise-faq/is-android-enterprise-supported-on-uncertified-devices/).

## Conclusion

In summary, while many Android devices on the market come with GMS and can run Google's apps and services, achieving this is not merely about pre-loading the apps. It involves meeting a comprehensive set of standards and conditions set by Google to ensure a consistent and secure user experience. For more detailed information about GMS and the certification process, further resources and documentation are available in [the docs](/android). 

🛟 If you're struggling with Certification of your own Android products, you're welcome to [reach out](/support).