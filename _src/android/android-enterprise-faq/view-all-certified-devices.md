---
title: "How to check if an Android device is GMS/Play Protect certified?"
published: '2023-04-19'
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
  order: 1111
--- 
Not all Android devices come with GMS, or Google Mobile Services, certification. 

**What is GMS?**

GMS certified devices, or more recently rebranded by Google as Play Protect certified devices, are Android devices that have undergone the 60+ hour testing and approval process with Google or a 3PL lab on Google's behalf. This testing, which consists of various security & compatibility validations, ensure the Android device under test behaves, looks, and feels consistent with the rest of the Android ecosystem. It ensures an OEM doesn't preload harmful (as in malware, but also as in privacy) applications, it ensures the OEM builds are up-to-date on vulnerability management and have patched all known CVEs over 60 days old, and it ensures apps install properly, work consistently, and all ecosystem-wide behaviours and implementations meet Google's strict requirements. 

Most of the requirements for an Android device heading to GMS certification can be found through the CDD, or Compatibility Definition Document. This is a [public document](https://source.android.com/docs/compatibility/cdd) that outlines every requirement for Android under MUST, SHOULD, and MAY. 

If you come across references to CTS, VTS, BTS, STS, GTS, or less generally grouped as "XTS", these are the individual tests that make up the validation & certification process for GMS.

Before putting an Android device through these tests, the OEM must sign an agreement with Google; the GMS - Google Mobile Services - agreement is an additional contract that defines requirements for bundling Google applications on the Android device. Requirements include mandatory and optional Google apps (Google core and Google optional, respectively), home screen layouts, app icon positioning and much more. These requirements are further broken up into regional and usecase agreements, such as MADA for most of the world, eMADA for Europe, EDLA for enterprise or non-standard form factors, and others. Each agreement also comes with requirements for longevity, transparency (ie period of support for software on a device lifecycle published publicly, etc).

Understandably a lot of this is NDA, so it's not easy to be overly transparent about Google's requirements and processes for certification.

**How do I validate a device is GMS certified?**

This is surprisingly not that easy to discern for the general public, as Google doesn't explicitly maintain a list of certified devices under the heading of _certified devices_.

Instead, there are three indirect means of validating devices are certified:

1. Check the OEM/ODM has an agreement with Google - [https://www.android.com/certified/partners/](https://www.android.com/certified/partners/)
2. View Google Play's Compatibility document, as any certified device will show up here - [https://support.google.com/googleplay/answer/1727131](ttps://support.google.com/googleplay/answer/1727131)
3. On the device itself, head to Google Play > Settings > About > Play Protect certification. Your device should show "Device is certified"

If the OEM/ODM is listed in link 1, there's a reasonable assumption the hardware they provide has certification, since Google leans on OEMs to certify the hardware they make once they're granted an agreement.

But if the device is listed in link 2, you know for sure it's certified. These lists aren't updated daily, so the absence of a device doesn't immediately indicate a device isn't certified. 

The caveat for 3 is a device may be whitelisted with Google before getting formal approval, so may not have passed GMS testing just yet. This can be cross-checked with the above links to form a reliable opinion.