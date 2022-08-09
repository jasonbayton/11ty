---
title: 'Google Pixel 3a Android Enterprise validation report'
published: '2019-05-15T17:48:05+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Hardware validation
layout: base.njk

id: 8356
doccats:
    - Android
publish_post_category:
    - '6'
discourse_permalink:
    - 'https://discuss.bayton.org/t/google-pixel-3a-android-enterprise-validation-report/296'
---
![](https://r2_worker.bayton.workers.dev/uploads/2019/06/pixel3a-white-front-min-1.png)

## 1. Tech specs

- Android 9
- 5.6 inch FHD+ display
- Snapdragon 670 
- 4GB RAM 
- 64GB Storage 
- 12.2/8MP Cameras 
- NFC
- Fingerprint

## 2. Android Enterprise support

- Work profile (BYOD) ✅
- Fully managed (COBO) ✅
- Fully managed with work profile (COPE) ✅
- Dedicated (COSU) ✅

- NFC provisioning ✅
- AFW# provisioning ✅
- QR provisioning ✅
- Zero-touch enrolment ✅

### 3. In-depth testing report

**How to read this report**. This device has been tested against the public [validation process](/android/android-enterprise-device-support/validation-process-and-information/), in which all provisioning methods and deployment scenarios have been tested across at least two EMM platforms.

Where a feature works with one EMM, but does not with another (consider **Enforce max failed attempts** in the report below) this is considered a pass (green) as it’s likely an EMM issue. Where it does not work, partly or fully, across two or more EMMs this will be flagged as a warn (yellow), or a fail (red).

Some features aren’t supported or set up across EMMs, or don’t work with the device (consider **KME** below), where this is the case the feature will be marked as untested (purple).

[![](https://r2_worker.bayton.workers.dev/uploads/2019/05/Bayton_AE_validation_Pixel3a.1.1-e1558114016148.jpg)](https://r2_worker.bayton.workers.dev/uploads/2019/05/Bayton_AE_validation_Pixel3a.1.1.pdf)
_Click the image above for a PDF version_

## 4. Notes from the above report

### 4.1. Device issues

#### 4.1.1. Work profile / Disallow work widgets

Despite being set across two EMMs, Disallow work widgets on the personal home screen is not enforced by either EMM, allowing work widgets to be freely placed.

**This is a device issue** (or an API has changed in Pie).

#### 4.1.2. Fully managed / Keep screen on when plugged in

Despite the single setting and multiple settings applied in MobileIron and VMware respectively, when plugged into multiple power sources the screen ultimately turned off.

As passcode policies were applied including mandated timeout, these could have clashed however this hasn’t been the case with other devices.

This can be replicated. **This may be a device issue.**

#### 4.1.3. Fully managed / FRP enforced in COPE following an unauthorised reset

**Not unique to the Pixel**, at the moment when deployed as a COPE device (fully managed device with work profile) and a personal account is added to the parent profile, should the device be reset in an unauthorised manner, for example:

- Incorrect passcode entered too many times
- Wipe command from some EMMs

The device will lock to the personal Google account residing in the parent profile. This is irrespective of any FRP bypass in place, though it hasn’t been tested as to whether FRP whitelist would override this behaviour.

Replicated across two EMMs. **This is a device issue**, but appears to be more OS-level as it affects other devices also.

### 4.2. Other noted warns/fails

The following weren’t replicated issues, but were flagged as the device didn’t behave as expected when tested. They are described below to offer context for why a warn or fail was registered during testing.

#### 4.2.1 Device Passcode / Enforce max attempts

Under COPE in VMware, max failed attempts incorrectly enforces against the work profile rather than the device in the device passcode policy. As such, once a maximum has been reached, VMware removes the work profile instead of resetting the device, leaving it in a partially broken state.

**This is a VMware issue.**

#### 4.2.2. Work profile / Disallow location

Despite being set, the work profile location can be toggled on &amp; off by the user at will.

#### 4.2.3. Work profile / Cross-profile sharing

The two settings:

- Disallow work apps to access documents from personal apps
- Disallow personal apps to share documents with work apps

In MobileIron there are no explicit options to prevent this and is therefore on by default.

In VMware the options are present, and while disallow personal apps to share documents with work apps is enforced with COPE, it was not with a work profile only deployment (BYOD).

#### 4.2.4. Dedicated / Kiosk

There are numerous issues with the MobileIron kiosk, these are not limited to the Pixel 3a. The affected policies:

- Kiosk cannot be escaped
- No access to settings other than those explicitly permitted
- Kiosk auto-launches

Despite the relevant configurations in place, it is effortless to escape the MobileIron kiosk if any access to settings has been granted. For example should WiFi settings be available:

- Tap kiosk settings
- Tap WiFi
- In the systems settings screen, tap the back arrow or hamburger menu
- Full settings access is granted

**This is a MobileIron issue**, and it affects many devices including recent Nokia and Sony examples.

## 5. Recommendation

Of the points listed above, most aren’t considered a device issue. On that basis aside from making note of where the individual restrictions failed on the tested EMMs for those customers affected (as it’s highly likely other devices will be affected also), there’s little reason not to consider the Pixel 3a in the enterprise.