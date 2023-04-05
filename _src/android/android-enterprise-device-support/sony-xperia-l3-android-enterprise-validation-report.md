---
title: 'Sony Xperia L3 Android Enterprise validation report'
published: '2019-06-15T22:57:23+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Hardware validation
layout: base.njk
eleventyNavigation:
  key: 'Sony Xperia L3'
  order: 5000
discourse_permalink:
    - 'https://discuss.bayton.org/t/sony-xperia-l3-android-enterprise-validation-report/304'
---
![](https://cdn.bayton.org/uploads/2019/06/xpl3.png)

## 1. Tech specs


Android 8.1  
5.7 inch HD display  
MediaTek MT6762  
3GB RAM  
32GB Storage  
Dual 13/2MP + 8MP Cameras  

## 2. In-depth testing report

**How to read this report**. This device has been tested against the public [validation process](/android/android-enterprise-device-support/validation-process-and-information/), in which all provisioning methods and deployment scenarios have been tested across at least two EMM platforms.

Where a feature works with one EMM, but does not with another (consider **Enforce max failed attempts** in the report below) this is considered a pass (green) as it’s likely an EMM issue. Where it does not work, partly or fully, across two or more EMMs this will be flagged as a warn (yellow), or a fail (red).

Some features aren’t supported or set up across EMMs, or don’t work with the device (consider **KME** below), where this is the case the feature will be marked as untested (purple).

<figure class="wp-block-image">[![](https://cdn.bayton.org/uploads/2019/06/Bayton_AE_validation_XperiaL3-3.jpg)](https://cdn.bayton.org/uploads/2019/06/Bayton_AE_validation_XperiaL3.pdf)</figure>

## 3. Notes from the above report

### 3.1. Device issues

#### 3.1.1. Device Passcode / Passcode enforced 

While passcode policies were enforced, in testing some EMMs would read an unset passcode as set on the device and therefore not mandate a passcode is setup.

**This is a device issue.**

#### 3.1.2. Fully managed / Keep screen on when plugged in

Despite the single setting and multiple settings applied in MobileIron and VMware respectively, when plugged into multiple power sources the screen ultimately turned off.

As passcode policies were applied including mandated timeout, these could have clashed however this hasn’t been the case with other devices.

Via AMAPI the policy appears to enforce, but not properly given the screen dims.

This can be replicated. **This may be a device issue.**

#### 3.1.3. Fully managed / FRP enforced in COPE following an unauthorised reset

**Not unique to the L3**, at the moment when deployed as a COPE device (fully managed device with work profile) and a personal account is added to the parent profile, should the device be reset in an unauthorised manner, for example:

- Incorrect passcode entered too many times
- Wipe command from some EMMs

The device will lock to the personal Google account residing in the parent profile. This is irrespective of any FRP bypass in place, though it hasn’t been tested as to whether FRP whitelist would override this behaviour.

Replicated across two EMMs. **This is a device issue**, but appears to be more OS-level as it affects other devices also.

#### 3.1.4. Work profile / Create a work folder in lieu of tabbed launcher

This is not done. Running Oreo the device doesn’t support a tabbed launcher introduced in Pie, so should create the work folder.

#### 3.1.5. Fully managed / System update control

Although system updates are managed, it’s possible to freely access the system update settings on the device. Normally this is blocked when under management.

#### 3.1.6. Fully managed / Wallpaper change

Sony use a proprietary wallpaper picker through their custom launcher. It was not possible to prevent the change of wallpaper in MobileIron, while the other EMMs did prevent it at the point of applying the wallpaper, but didn’t prevent access to the picker itself as would normally happen.

#### 3.1.7. Dedicated / Cannot escape kiosk

Via AMAPI the L3 maintained use of the system navigation keys in locktask (kiosk) mode, and escaping the kiosk is as easy as tapping the home button.

As this is AMAPI, **this is considered a device issue.**

### 3.2. Other noted warns/fails

The following weren’t replicated issues, but were flagged as the device didn’t behave as expected when tested. They are described below to offer context for why a warn or fail was registered during testing.

#### 3.2.1 Device Passcode / Enforce max attempts

Under COPE in VMware, max failed attempts incorrectly enforces against the work profile rather than the device in the device passcode policy. As such, once a maximum has been reached, VMware removes the work profile instead of resetting the device, leaving it in a partially broken state.

**This is a VMware issue.**

#### 3.2.2. NFC provisioning for COPE with VMware

It was not possible to provision the device as fully managed with a work profile (COPE) when initiating via NFC using VMware’s AirWatch Relay application.

Fully managed provisioning completes successfully, however in all tested cases the device times out or fails to create the work profile, requesting an existing profile is deleted in order to try again. This process repeats indefinitely.

**This was not replicated with MobileIron.**

#### 3.2.3. Work profile / Cross-profile sharing

The two settings:

- Disallow work apps to access documents from personal apps
- Disallow personal apps to share documents with work apps

In MobileIron there are no explicit options to prevent this and is therefore on by default.

In VMware the options are present, but not reliably enforced.

#### 3.2.4. Automatic date &amp; timezone

These two APIs in MobileIron don’t appear to fully enforce, allowing the end-user to toggle these on as desired. These settings will be turned off if pushed via policy, but not restricted from being turned back on.

**MobileIron Core issue.**

## 4. Recommendation

With the notes above, this is a device that should be tested with an EMM prior to rolling out. Primary concerns are passcode and kiosk related, though any of the above may impact UX in a mixed environment.