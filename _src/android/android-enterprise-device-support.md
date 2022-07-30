---
title: 'Android Enterprise device testing'
date: '2017-07-16T20:06:39+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Resources
layout: base.njk
id: 4344
doccats:
    - Android
Version:
    - '4.3'
publish_post_category:
    - '6'
discourse_permalink:
    - 'https://discuss.bayton.org/t/android-enterprise-device-testing/28'
---
<div class="callout callout-warning">### No longer maintained

 While I am still actively testing devices, I no longer publish them here. Consider the below to be historical, including the advanced testing, and not to be taken as current status of a device. If you’d like your devices tested against Android Enterprise functionality, feel free to get in touch. </div>The devices listed below have been tested against a current, Android Enterprise-compatible Enterprise Mobility Management (EMM) platform for one or more of the following:

- Android Enterprise work profile
- Android Enterprise fully managed (work-managed)
- Android Enterprise work profile on a fully managed device (COPE/COMP)
- Android Enterprise dedicated (COSU or kiosk)
- Multiple provisioning methods, including [zero-touch enrolment](https://bayton.org/docs/enterprise-mobility/android/what-is-android-zero-touch-enrolment/)

<div class="callout callout-info">### OEM or reseller?

I welcome additional devices for testing! If you’re an **OEM** or **reseller** of Android devices, you can join **Sony**, **Nokia**, **Huawei** and others in lending me anything from Android 6.0.1 or later to independently test. This is a free service, devices can be returned within a week or so. Use my [contact](https://bayton.org/contact/) page to get in touch or [email me directly](mailto:jason@bayton.org).

For more information on what’s involved in testing, please head to: [Android Enterprise independent validation process and information](https://bayton.org/docs/enterprise-mobility/android/android-enterprise-device-support/validation-process-and-information/).

</div>Advanced testing
----------------

The following devices have undergone advanced testing. Introduced in June 2019, advanced testing follows the same [process](https://bayton.org/docs/enterprise-mobility/android/android-enterprise-device-support/validation-process-and-information/) as standard testing, but each individual restriction/function is documented and verified irrespective of outcome across at least two EMMs.

A report containing 700+ touch points is provided to the OEM on completion along with any recommendations.

- [Google Pixel 3a Android Enterprise validation report](https://bayton.org/docs/enterprise-mobility/android/android-enterprise-device-support/google-pixel-3a-validation-report/)
- [Moto G7 Power Android Enterprise validation report](https://bayton.org/docs/enterprise-mobility/android/android-enterprise-device-support/moto-g7-power-android-enterprise-validation-report/)
- [Sony Xperia L3 Android Enterprise validation report](https://bayton.org/docs/enterprise-mobility/android/android-enterprise-device-support/sony-xperia-l3-android-enterprise-validation-report/)

Standard testing
----------------

The following devices have undergone standard testing. Standard testing involves the same [process](https://bayton.org/docs/enterprise-mobility/android/android-enterprise-device-support/validation-process-and-information/) as advanced testing, but without in-depth documentation and additional verification across multiple EMMs.

For each of these use-cases, the device will be provided a pass (), a warning ( / ), a fail () or untested (), along with the party who verified the functionality (as some information may be externally sourced). The OS version (if) listed is valid at the time of testing. It’s normally safe to assume newer OS versions will support *at a minimum* the below tested functionality.

BQ
--

### Aquaris X2 Pro

Tested August 2018, build 1.3.0

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/bqax2pro.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.1.0  
5.6 inch FHD display  
Snapdragon 660  
4GB RAM  
64GB Storage  
12.2+5/8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>CAT
---

### CAT S61

Tested Feb 2019, build LTE\_D0201121.0\_S61\_0.053.02

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2019/01/s61.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.1  
5.2 inch FHD display  
Snapdragon 630  
4GB RAM  
64GB Storage  
16/8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: On NFC and QR provisioning, the device passcode is not enforceable via multiple EMM solutions. In COPE, system applications aren’t disabled in the parent profile despite this being set.

Google
------

### Google Nexus 5x

Tested 2017

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/nexus-intro-phone-1-e1506902903947.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 7.1.2  
5.2 inch FHD display  
Snapdragon 808  
2GB RAM  
16/32GB Storage  
12.3/5MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning

</div></div></div></div>Notes: With older EMM agent versions, NFC provisioning is broken against MobileIron and AirWatch as the WiFi payload is not correctly interpreted by the Nexus. Ensure you are using the latest available agents to avoid this issue.

### Google Pixel 2

Tested 2018

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/pixel2.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.1.0  
5.0 inch FHD display  
Snapdragon 835  
4GB RAM  
64/128GB Storage  
12.2/8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Huawei
------

### Huawei MediaPad M5 (8.0)

Tested June 2018, build 8.0.0.151

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/m5.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.0  
8.4 inch QHD display  
HiSilicon Kirin 960s  
4GB RAM  
32/64/128GB Storage  
13/8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: Due to the amount of T&amp;C pages, zero-touch provisioning is anything but. Huawei include non-mandatory system applications (the Microsoft Suite) in the fully managed environment, which should not be done. **Builds prior to 8.0.0.151 had provisioning issues.**

### Huawei P10

Tested 2017

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/p10-listimage-black.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 7.0  
5.1 inch FHD display  
HiSilicon Kirin 960  
4GB RAM  
32/64GB Storage  
20/12MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning

</div></div></div></div>Notes: NFC provisioning is interrupted by the First Run Wizard, prompting for a Google account, WiFi information and more, before eventually landing on the home screen. The DPC agent does not automatically launch, and DPC extras are not passed to the agent. It does then work as expected. DPCi enrolment fails with MobileIron, as the device is not recognised as a fully managed device by the DPC. QR provisioning is not supported.

Motorola
--------

### Motorola Moto Z

Tested 2017

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/Motorola-Moto-Z-Force-Gold-Front-e1506902735436.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 7.0  
5.5 inch QHD display  
Snapdragon 820  
4GB RAM  
32/64GB Storage  
13/5MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning

</div></div></div></div>Notes: In a work profile deployment it is possible to access and manipulate data on an SD card. This is again an OEM issue to be rectified.

### Motorola Moto Z Play

Tested 2017

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/moto-zplay.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 7.0  
5.5 inch HD display  
Snapdragon 625  
3GB RAM  
32GB Storage  
13/5MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning

</div></div></div></div>Notes: NFC provisioning is interrupted by the First Run Wizard, prompting for a Google account, WiFi information and more, before eventually landing on the home screen and launching the DPC directly after. NFC provisioning appears to be partially broken.

### Motorola Moto C Plus

Tested 2017

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/motorola-moto-c-plus.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 7.0  
5.0 inch HD display  
Mediatek MT6737  
1GB RAM  
16GB Storage  
8/2MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning

</div></div></div></div>Notes: As part of enrolment, the device is prompted to encrypt. From Nougat (7.0) encryption should be default and this is therefore unexpected. Encryption may take some time. Interruptions from the Wizard during both QR and DPCi enrolment. DCP doesn’t automatically launch following QR provisioning, but DPC extras are successfully passed through. There is no NFC radio, and so no NFC provisioning.

### Motorola Moto E4 Plus

Tested 2017

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/09/moto-e4-plus-e1504776790376.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 7.1.1  
5.5 inch HD display  
Mediatek MT6737  
3GB RAM  
16/32GB Storage  
13/5MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning

</div></div></div></div>Notes: As part of enrolment, the device is prompted to encrypt. From Nougat (7.0) encryption should be default and this is therefore unexpected. Encryption may take some time.

### Motorola Moto G5

Tested 2017

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/moto-g5-to-arrive-in-sapphire-blue-color-option-514160-3-e1506902563348.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 7.0  
5.0 inch FHD display  
Snapdragon 430  
2/3GB RAM  
16/32GB Storage  
13/5MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning

</div></div></div></div>Notes: While undertaking wireless (AFW#) provisioning the DPC temporarily stalled while requesting a newer version of Google Play Services. GPS is pushed from EMM as a managed work app and updated automatically after a few minutes. Eventual enrolment was not prevented.

### Motorola Moto G4 Play (XT1604)

Tested 2017

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/motorola-moto-g4-play-boltmobile-sasktel-saskatoon-smartphone-front-e1506902178433.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 6.0.1  
5.0 inch HD display  
Snapdragon 410  
1/2GB RAM  
8/16GB Storage  
8/5MP Cameras  
 NFC support (varies)  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning

</div></div></div></div>Notes: While undertaking wireless (AFW#) provisioning the DPC failed to apply the managed Android Enterprise account due to an outdated version of Google Play Services. No further tests were performed. Not all variants of this device carry NFC, therefore success with NFC provisioning cannot be guaranteed.

Nokia
-----

### Nokia 1

Oreo Go edition, tested on release 2018

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/nokia1-1.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.1  
4.5 inch display  
Mediatek MT6737M  
1GB RAM  
8GB Storage  
5/2MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: This device is not Android enterprise supported and is not designed to be as it primarily targets emerging markets, there are more appropriate enterprise-supported devices available from Nokia below.

### Nokia 2

Tested on release 2018

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/nokia-2-pewter-black-front-30747.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 7.1.1  
5.0 inch HD display  
Snapdragon 212  
1GB RAM  
8GB Storage  
8/5MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning

</div></div></div></div>Notes: There is no NFC radio on the Nokia 2. The device is not encrypted out of the box for performance reasons, requiring this is completed each time the device is provisioned. With only 8GB onboard storage and 1GB RAM, this device has limited suitability in an enterprise environment and outside of a BYOD context, there are more appropriate enterprise-supported devices available from Nokia below.

### Nokia 3

Tested March 2018, build 00WW\_3\_250

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/Nokia-3-Silver-Front-e1506901438141.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.0  
5.0 inch HD display  
MediaTek MT6737  
2GB RAM  
16GB Storage  
8/8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: Ensure the device is on the latest available Android version prior to provisioning! Earliest 7.x builds hard-failed during fully managed provisioning and therefore offered no fully managed capabilities. All functionality is confirmed supported as of Android 7.1.1.

### Nokia 3.1

Tested Nov 2018, build 00WW\_0\_46E\_SP02

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/nokia3.1.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.0  
5.2 inch HD display  
Mediatek MT6750  
2/3GB RAM  
16/32GB Storage  
13/8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>### Nokia 3.2

Tested May 2019, build 00EEA\_1\_03D

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2019/05/nokia3.2.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 9.0  
6.26 inch HD display  
Snapdragon 429  
2/3GB RAM  
16/32GB Storage  
13/5MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: Fingerprint sensor is available on the 32GB variant.

### Nokia 4.2

Tested May 2019, build 00EEA\_1\_17I

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2019/05/nokia4.2.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 9.0  
5.71 inch HD display  
Snapdragon 439  
2/3GB RAM  
16/32GB Storage  
13+2/8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: A prompt to enable face unlock is occasionally seen after provisioning.

### Nokia 5

Tested March 2018, build 00WW\_5\_22A\_SP01

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/nokia5-silver-front.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.0  
5.2 inch HD display  
Snapdragon 430  
2GB RAM  
16GB Storage  
13/8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: In some cases after provisioning via NFC, the DPC doesn’t reliably auto-launch meaning it’ll need to be opened from the app drawer manually. Ensure all software updates are applied before provisioning as this is rectified

### Nokia 5.1

Tested Nov 2018, build 00WW\_0\_38E\_SP03

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/nokia5.1.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.0  
5.5 inch FHD display  
MediaTek Helio P18  
2/3GB RAM  
16/32GB Storage  
16/8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>### Nokia 6

Tested June 2018, build 00WW\_5\_600\_SP01

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/nokia-6-front-chile.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.0  
5.5 inch FHD display  
Snapdragon 430  
3/4GB RAM  
32/64GB Storage  
16/8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: Ensure the device is fully updated! Earlier Nougat versions had some issues. Once updated all provisioning methods work as expected.

### Nokia 6.1

Android One – Tested March 2018

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/n62018.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.0  
5.5 inch FHD display  
Snapdragon 630  
3/4GB RAM  
32/64GB Storage  
16/8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: This is an Android One device, offering stock Android and extremely fast online (A/B partitioning) updates.

### Nokia 7.1

Android One – Tested December 2018

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2019/01/7.1.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.1  
5.84 inch FHD display  
Snapdragon 636  
3/4GB RAM  
32/64GB Storage  
Dual 12/5MP + 8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>### Nokia 7 Plus

Android One – Tested March 2018

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/n7plus.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.0  
6.0 inch 2K display  
Snapdragon 660  
4GB RAM  
64GB Storage  
Dual 12/16MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>### Nokia 8

Tested March 2018

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/zoom_front_nokia8_silver.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.1  
5.3 inch 2K display  
Snapdragon 835  
4/6GB RAM  
64/128GB Storage  
Dual 13/13MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: A prompt to join the Nokia improvement program will pop up after provisioning. This can be declined. The 8 series is the first to support Android [zero-touch enrolment](https://bayton.org/docs/enterprise-mobility/android/what-is-android-zero-touch-enrolment/).

### Nokia 8.1

Successor to the 7 Plus, not the 8. Tested Jan 2019, build 00WW\_2\_47A

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2019/01/nokia_8_1_ROW1-front_blue.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 9.0  
6.18 inch FHD display  
Snapdragon 710  
4GB RAM  
64GB Storage  
Dual 12/13MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>### Nokia 8 Sirocco

Android One – Tested March 2018

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/sirocco.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.0  
5.5 inch 2K display  
Snapdragon 835  
6GB RAM  
128GB Storage  
Dual 12/5MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: This is an Android One device, offering stock Android and extremely fast online (A/B partitioning) updates.

### Nokia 9 Pureview

Tested May 2019, build 00WW\_4\_22C

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2019/05/nokia9.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 9.0  
5.99 inch FHD display  
Snapdragon 845  
6GB RAM  
128GB Storage  
Penta 12/20MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: Fingerprint sensor can be unreliable.

OnePlus
-------

### OnePlus 6T

Tested November 2018, build ONEPLUS A6013\_41\_181024

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2019/01/oneplus-6t-mirror-black-1OP828RBN-sku-header-new.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 9.0  
6.41 inch FHD display  
Snapdragon 845  
6/8/10GB RAM  
128/256GB Storage  
Dual 16/20MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: This device has an in-depth, public report documented [here](https://bayton.org/docs/enterprise-mobility/android/android-enterprise-device-support/oneplus-6t-validation-report/).

Pocophone
---------

### Pocophone F1

Tested November 2018, build OPM1.171019.026

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2019/01/poco.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.1  
6.18 inch FHD display  
Snapdragon 845  
6/8GB RAM  
64/128/256GB Storage  
Dual 12/5MP + 20MP Front cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: An in-depth report on this device can be found [here](https://bayton.org/docs/enterprise-mobility/android/android-enterprise-device-support/poco-f1-android-enterprise-validation-report/).

Samsung
-------

### Samsung Galaxy Note 8

Dual N950FD, tested 2018

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/note8.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.0  
6.3 inch 2K display  
Exynos 8895  
6GB RAM  
64/128/256GB Storage  
Dual 12/8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: Following completion of provisioning, the user is presented with a number of agreements to accept, only the top two are mandatory and others can be skipped. For those searching for zero-touch compatibility, Samsung will not support it for the foreseeable future. As of Android 8.0, Samsung switches from the unified work profile to Workspace. The UX is similar but different. Additionally, when provisioning managed work profile in MobileIron (COPE), the settings app crashes whilst setting a passcode and can not be recovered.

Sony
----

### Sony Xperia 10

I3113, tested March 2019, build 53.0.A.4.74

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2019/03/x10.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 9.0  
6.0 inch FHD display  
Snapdragon 630  
3/4GB RAM  
64GB Storage  
Dual 13/5MP + 8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: Will prompt a signup request from Swiftkey, the default keyboard on this device. Request should be declined. During DPCi and ZT enrolment, a Google services prompt is shown.

### Sony Xperia L1

Dual G3312, tested 2017

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/10/xperial1.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 7.0  
5.5 inch HD display  
MediaTek MT6737T  
2GB RAM  
16GB Storage  
13/5MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning

</div></div></div></div>Notes: After initiating provisioning via NFC, the L1 reverts back to the setup wizard, requiring the user to go through device setup entirely before the DPC launches. With AFW# provisioning, the wizard interjects to prompt for passcode and Xperia account setup before completing. **In both cases fully managed mode is functional following this.** Other things to note include a prompt for app recommendations when opening the app drawer and a signup request from Swiftkey, the default keyboard on this device. Both requests should be declined.

### Sony Xperia L3

I3312, build 54.0.A.3.94, tested March 2019

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2019/03/xperial3.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.1  
5.7 inch HD display  
MediaTek MT6762  
3GB RAM  
32GB Storage  
Dual 13/2MP + 8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (Corp)  
 Managed work profile (COPE)  
 Dedicated (Kiosk)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: Will prompt a signup request from Swiftkey, the default keyboard on this device. Request should be declined.

### Sony Xperia XA1

Dual G3121, tested 2017

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/xa1.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 7.0  
5.0 inch HD display  
Mediatek MT6757 Helio P20  
3GB RAM  
32GB Storage  
23/8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning

</div></div></div></div>Notes: After initiating provisioning via NFC, the XA1 reverts back to the setup wizard, requiring the user to go through device setup entirely before the DPC launches. With AFW# provisioning, the wizard interjects to prompt for passcode and Xperia account setup before completing. **In both cases fully managed mode is functional following this.** Other things to note include a prompt for app recommendations when opening the app drawer and a signup request from Swiftkey, the default keyboard on this device. Both requests should be declined.

### Sony Xperia XA2

Tested 2018

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/xa2-1.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.0  
5.2 inch FHD display  
Snapdragon 630  
3GB RAM  
32GB Storage  
23/8MP Camerastriangle  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: Will prompt a signup request from Swiftkey, the default keyboard on this device. Request should be declined.

### Sony Xperia XZ Premium

Dual G8142, tested 2017

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/10/xperiaxzpremium.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.0  
5.5 inch QHD display  
Snapdragon 835  
4GB RAM  
64GB Storage  
19/13MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning

</div></div></div></div>Notes: Ensure the device is fully up to date! Android 8.0 fully supports all provisioning methods while 7.1.1 failed to correctly provision via NFC. Will prompt a signup request from Swiftkey, the default keyboard on this device. Request should be declined.

### Sony Xperia XZ1

G8341, tested 2017

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/10/xperiaxz1.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.0  
5.2 inch FHD display  
Snapdragon 835  
4GB RAM  
64GB Storage  
19/13MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: The XZ series is the first to support Android [zero-touch enrolment](https://bayton.org/docs/enterprise-mobility/android/what-is-android-zero-touch-enrolment/). Will prompt a signup request from Swiftkey, the default keyboard on this device. Request should be declined.

### Sony Xperia XZ1 Compact

Tested 2018

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/xz1compact.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.0  
4.6 inch HD display  
Snapdragon 835  
4GB RAM  
32GB Storage  
19/8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: The XZ series is the first to support Android [zero-touch enrolment](https://bayton.org/docs/enterprise-mobility/android/what-is-android-zero-touch-enrolment/). Will prompt a signup request from Swiftkey, the default keyboard on this device. Request should be declined.

### Sony Xperia XZ2

Tested June 2018, build 51.1.A.4.173

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/xz2.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.0  
5.7 inch FHD+ display  
Snapdragon 835  
4GB RAM  
64GB Storage  
19/5MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: Will prompt a signup request from Swiftkey, the default keyboard on this device. Request should be declined.

### Sony Xperia XZ3

Tested January 2019, build 52.0.A.3.163

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2019/01/sony.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 9.0  
6.0 inch 2K display  
Snapdragon 845  
4/6GB RAM  
64GB Storage  
19/13MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning  
 Zero-touch enrolment

</div></div></div></div>Notes: Will prompt a signup request from Swiftkey, the default keyboard on this device. Request should be declined. During DPCi and ZT enrolment, a Google services prompt is shown.

Wileyfox
--------

### Wileyfox Swift 2 X

Tested 2017

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/SWIFT_2X_CHAMPAGNE_FRONT_BACK-e1506901949774.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 7.1.2  
5.2 inch FHD display  
Snapdragon 430  
3GB RAM  
32GB Storage  
16/8MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning

</div></div></div></div>Notes: Wileyfox use a non-standard Phone application – “truecaller” – which prompts a registration request during setup (this can and should be skipped). Recommend to disable this and distribute an alternative dialler via Managed Google Play.

Xiaomi
------

### Xiaomi Mi A1

Android One, tested 2017

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/mia1.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 8.0  
5.5 inch FHD display  
Snapdragon 625  
4GB RAM  
64GB Storage  
Dual 12/5MP Cameras  
 NFC support  
 Fingerprint support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Managed work profile (COPE)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning

</div></div></div></div>Notes: There is no NFC radio on the device, therefore NFC provisioning is not possible. This is an Android One device, offering stock Android and extremely fast online (A/B partitioning) updates.

Zebra
-----

### Zebra TC25

Tested 2018

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/zebratc25.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 7.1.2  
4.3 inch display  
APQ8037 8-Core  
2GB RAM  
16GB Storage  
8MP Camera  
 NFC support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning

</div></div></div></div>Notes: There is no NFC radio on the device, therefore NFC provisioning is not possible.

### Zebra TC56

Tested 2018

<div class="row"><div class="col-sm-3">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/07/zebratc56.png)</div><div class="col-sm-9"><div class="row"><div class="col-sm-5">##### Tech specs

Android 7.1.2  
5.0 inch HD display  
Snapdragon 650  
2/4GB RAM  
16/32GB Storage  
13MP Camera  
 NFC support

</div><div class="col-sm-7">##### Android Enterprise support

 Work profile (BYOD)  
 Fully managed (COBO)  
 Dedicated (COSU)  
 NFC provisioning  
 AFW# provisioning  
 QR provisioning

</div></div></div></div>Notes: Previously tested on Android 6.x, where DPCi provisioning failed and QR provisioning wasn’t supported. Updating to 7.1.2 resolved both of these issues.