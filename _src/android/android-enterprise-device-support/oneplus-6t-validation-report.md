---
title: 'OnePlus 6T Android Enterprise validation report'
date: '2018-11-09T12:40:58+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Hardware validation
layout: base.njk
id: 7000
doccats:
    - Android
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/oneplus-6t-android-enterprise-validation-report/237'
---
**Model**: OnePlus 6T A6013 (8GB RAM, 128GB storage)   
**Acquired**: Early November  
**OS**: Android 9.0 Pie (Oxygen OS 9.0.4)  
**Build**: ONEPLUS A6013\_41\_181024   
**Security**: 1 November 2018

This device has been tested against the public [validation process](/android/android-enterprise-device-support/validation-process-and-information/), and the following mix of (non-exhaustive) issues and recommendations have been noted:

1. Notable problems
-------------------

### 1.1. Factory reset issue  


When performing a factory reset from Settings &gt; System &gt; Reset Options &gt; Erase all data (factory reset), if the toggle for Erase internal storage is not set to enable, upon resetting, the device boots to a state where it does not progress until factory reset once more through Android recovery.

This appears to only happen when a passcode has been set on the device before initiating a factory reset, as doing so with no passcode in use has not resulted in this issue.

<figure class="wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper"><iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" frameborder="0" height="281" loading="lazy" src="https://www.youtube.com/embed/BXe45lPNP6U?feature=oembed" width="500"></iframe></div><figcaption>*The Issue*</figcaption></figure><figure class="wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper"><iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" frameborder="0" height="281" loading="lazy" src="https://www.youtube.com/embed/UYbq9xXLg-I?feature=oembed" width="500"></iframe></div><figcaption>*The fix*</figcaption></figure>**This does not impact factory reset when initiated from the UEM platform**

2. Provisioning methods  

--------------------------

No significant issues noted, however the flow of all provisioning methods is interrupted just before the DPC is launched due to the prompts to select a font style for the device, screen calibration, and screen off gestures.

These are not critical to the function of a fully managed device, and as such should be automatically skipped since the ability to manually tweak these options can be found in settings at a later point.

- ![](https://r2_worker.bayton.workers.dev/../uploads/2018/11/Screenshot_20180101-120010.jpg)
- ![](https://r2_worker.bayton.workers.dev/../uploads/2018/11/Screenshot_20180101-120014.jpg)
- ![](https://r2_worker.bayton.workers.dev/../uploads/2018/11/Screenshot_20180101-120018.jpg)

### 2.1. NFC

NFC functioned as expected, except for in the case of 1.1. Where a factory reset issue was present, the NFC radio was not enabled and as such would not accept a provisioning bump until fixed.

### 2.2. Zero-touch

This provisioning method is not supported

3. Deployment Scenarios
-----------------------

### 3.1. Fully managed

A. The option to toggle OTG (on the go) storage remains available despite USB storage being restricted. Actually mounting a USB drive via the USB C port is prevented, however the toggle should equally grey out. (MI Core, WS1 UEM)

B. System updates are managed via EMM, and therefore accessing the system updates settings should display a message stating they’re managed and return to system settings. On the OnePlus 6T it is possible not only to go into updates but to manually poll also. (MI Core, WS1 UEM)

C. When retiring the device from management it stalls indefinitely, with the DPC agent stuck on “retiring”. (MI Core)

D. Screen capture prevented by policy isn’t enforced (it is still possible to take a screenshot) (WS1 UEM, MI Core)

E. Forcing screen on while charging is not enforced, the screen turns off as per screen idle settings (WS1 UEM)

F. With fingerprint authentication restricted, it is still possible to set up and use fingerprint authentication on the device (MI Core)

G. With Face unlock restricted, it is still possible to set up and use face unlock on the device (MI Core)

### 3.2. Work profile

A. With add accounts disabled, it’s possible to sign up for a OnePlus account under the work profile (but not add other accounts) (MI Core)

B. Screenshot issue (see above) but it does black-out work apps in the task switcher as expected

C. Preventing the *use one lock* setting for work profile (ensuring the work profile passcode and the device passcode are not combined so that one passcode unlocks both) is not enforced (WS1 UEM, MI Core)

### 3.3. Fully managed with work profile

A. Disabling addition of accounts on work profile prevents it on fully managed also (WS1 UEM)

### 3.4. COSU (Dedicated)  


A. Full access to device settings, bypasses restrictions when entering settings like wifi, bluetooth, location, through the kiosk menu (MI Core)

4. Recommendation
-----------------

Based on the findings above, **it is not recommended** to use the OnePlus 6T in the enterprise. While it does respect and implement a number of restrictions and policies not noted in the issues list above, there are too many fundamental problems with this device under both corpate-owned (fully managed) and BYOD management.

As a fully managed device, basic data protection enforcements are not implemented by the device (face unlock, for example, can and is repeatedly fooled on basic implementations).

Furthermore, basic restrictions to prevent data leakage are not enforced, such as limiting the screenshot capability, allowing bypass of kiosk restrictions, etc.

Finally, with issues in retiring and factory resetting the device in the tested UEM platforms, the device doesn’t appear reliable enough not to doubt the outcome when a command is sent from the UEM.