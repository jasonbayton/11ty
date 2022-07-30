---
title: 'Android Enterprise independent validation process and information'
date: '2017-11-06T12:50:37+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Hardware validation
layout: base.njk
id: 4852
doccats:
    - Android
Version:
    - '1.2'
publish_post_category:
    - '6'
discourse_permalink:
    - 'https://discuss.bayton.org/t/android-enterprise-independent-validation-process-and-information/29'
FeaturedBackground:
    - android
---
<div class="callout callout-warning">### No longer maintained

 While I am still actively testing devices, I no longer publish them here. Consider the below to be historical, including the advanced testing, and not to be taken as current status of a device. If you’d like your devices tested against Android Enterprise functionality, feel free to get in touch. </div><div class="callout callout-success">### Return to device support

Just looking for details of devices tested? Head back to [Android Enterprise device support](/docs/enterprise-mobility/android/android-enterprise-device-support/).

</div><div class="callout callout-info">

### OEM or reseller?

If you’re interested in knowing more about the project as a whole and the background around it, jump to [project information](#project-information). Otherwise, [success criteria](#success-criteria) outlines exactly what is expected during the provisioning of an Android Enterprise-compatible device.

</div>Device testing process
----------------------

### What do I test?

In order to validate the implementation of Android Enterprise on a device, I undertake the following:

- Attempt to perform an NFC-bump using a provisioning application supplied by either [MobileIron](https://play.google.com/store/apps/details?id=com.mobileiron.client.android.nfcprovisioner) or [AirWatch](https://play.google.com/store/apps/details?id=com.airwatch.relay) (normally both).
- Attempt to perform a QR scan based on codes generated [manually](/docs/enterprise-mobility/mobileiron/manual-android-enterprise-work-managed-qr-code-generation-for-mobileiron/) ([WS1 source](https://my.air-watch.com/help/9.1/en/Content/Platform_Guides/Android_Work/C/Enrollment_Overview.htm)) or [automatically](https://play.google.com/store/apps/details?id=com.mobileiron.client.android.nfcprovisioner).
- Attempt to enrol using the DPC identifier in the Google account prompt, normally *afw#mobileiron.core*, *afw#mobileiron.cloud* or *afw#hub*.
- Attempt to enrol using a GSuite address and the Google [Device Policy Management](https://play.google.com/store/apps/details?id=com.google.android.apps.enterprise.dmagent) DPC.
- Utilise any of the above provisioning methods to deploy a COSU (kiosk) environment.
- Utilise any of the above provisioning methods to deploy a Fully managed work profile (COPE) environment.
- Attempt to enrol into an EMM after normal setup to generate a work profile.
- If supported, attempt to enrol using zero-touch provisioning.

The above provisioning tasks (with the exception of the GSuite enrolment currently) are documented here: [Android Enterprise provisioning guides](/docs/enterprise-mobility/android/android-enterprise-provisioning-guides/). Testing may be completed on EMM platforms other than those mentioned above for any task at any time.

### EMM configuration files

Should you wish to see first-hand the policies/configs/profiles utilised to validate devices against (security, restrictions, firmware), feel free to import the following into your own EMM platform:

#### MobileIron Core

[MobileIron Policies](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/01/MI_AEvalidation.zip)[Download](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/01/MI_AEvalidation.zip)

#### VMware Workspace ONE UEM

Coming soon

### Success criteria

Below is a list of checks undertaken for each provisioning process. For fully managed provisioning, most checks are combined under [fully managed (general)](#fully-managed-general).

#### NFC

- The NFC radio should be enabled out of the box by default.
- Does not display the first run wizard at all (after the NFC payload transfer) and instead after successful provisioning, goes directly to the home screen. 
  - This includes “setup complete”, “OEM account” or permissions screens not directly related to the DPC being installed.
- Correctly passes through DPC extras (like EMM server name, user ID, etc)

…continued under [fully-managed (general)](#fully-managed-general)

#### QR

- Supports 6 taps on the Welcome screen to initiate the QR reader
- Does not display the first run wizard at all (after the QR payload transfer) and instead after successful provisioning, goes directly to the home screen. 
  - This includes “setup complete”, “OEM account” or permissions screens not directly related to the DPC being installed.
- Correctly passes through DPC extras (like EMM server name, user ID, etc)
- Configures Wi-Fi automatically when added to QR code (Android P+)

…continued under [fully-managed (general)](#fully-managed-general)

#### DPC identifier / GSuite

- Does not display the first run wizard after inputting the identifier or GSuite account at the Google account prompt and instead after successful provisioning, goes directly to the home screen. 
  - This includes “setup complete”, “OEM account” or permissions screens not directly related to the DPC being installed.

…continued under [fully-managed (general)](#fully-managed-general)

#### Zero-touch

- Does not display the first run wizard after connecting to WiFi and instead after successful provisioning, goes directly to the home screen. 
  - This includes “setup complete”, “OEM account” or permissions screens not directly related to the DPC being installed.
- Correctly passes through DPC extras (like EMM server name, user ID, etc)
- Performs a factory reset if not enrolled into EMM within one hour of provisioning, or if provisioning was bypassed.

…continued under [fully-managed (general)](#fully-managed-general)

#### Fully managed (general)

- Launches the DPC immediately (or within a few moments) after landing on the home screen.
- Adds the assigned Android Enterprise managed account (or GSuite account) without any user intervention. 
  - Failing to add an account due to a too-old version of Google Play Services is considered a fail, requiring a GPS update is a warning if it requires manual intervention, otherwise provided it updates automatically after enrolment it is considered a pass.
  - One exception is an EMM that requires a user grants permission for the managed account to be created (like MaaS360).
- Removes all non-critical system applications (unless permitted in the provisioning payload, in which case I expect the choice to be honoured). 
  - If “bloatware” is still present, such as in some AT&amp;T or Lenovo devices, this is not an expected implementation.
- Automatically installs pushed applications silently within 2-3 minutes of successful enrolment (network conditions permitting).
- Does not initiate factory reset protection (FRP) if disabled via the EMM and wiped “uncleanly” (for example, via recovery).
- Is encrypted out of the box (will get a warning).
- Enforces encryption if not encrypted out of the box
- Permits a work profile within the fully managed device.
- Performs a factory reset when retired/enterprise wiped OR (full) wiped from EMM.

#### Fully managed (Dedicated)

- Does not permit access to settings other than those explicitly permitted. If configuring Wi-Fi, the settings hamburger menu should not be present.
- Kiosk cannot be escaped.
- Where supported, both single app and multi-app kiosks display and act correctly.

#### Work profile

- Disables the parent DPC and enables the work profile DPC (work profile only).
- Supports work challenge (work profile only).
- Supports all configurations pushed from the EMM (global, work profile and fully managed as required).
- Doesn’t push through unnecessary system apps into the work profile unless whitelisted via EMM.
- Automatically installs pushed applications silently within 2-3 minutes of successful enrolment (network conditions permitting).
- Parent profile (ie, device) is untouched after removing the work profile.
- Does not permit access to the shared SD Card.
- Does not permit contact sharing if disabled

### Other checks

These are not “fails”, however the following I consider to either need polishing, or unsuitable for a work environment (not a finite list):

- Popups from system applications requesting signup for services. 
  - Truecaller on WileyFox, SwiftKey on Sony both do this. As a business device it should not be prompting users to sign up to 3rd party services.
- Not organising work applications into a folder on the home screen (work profile).
- Fills home screen with work applications rather than pushing them to a second home screen window, or not adding icons to the home screen at all. 
  - Makes the device look cluttered and untidy, not ideal for users.
- Any messages or popups for features that cannot be supported on a fully managed device, such as app recommendations or references to disabled functionality.

### Reporting

Once all tests are completed, a report will be generated to the nominated contact. This can be notes in an email or a headed PDF on request. Summarised results with a few lines of notes (where appropriate) will also be published against the device on [Android Enterprise device support](/docs/enterprise-mobility/android/android-enterprise-device-support/). Where possible, publishing of results can be postponed for the period of time I have the devices should a patch be pushed, however once the devices are returned the results will be published.

The in-depth results provided to the nominated contact will remain private, however I may request permission to use them as a reference for future website promotions (which can be granted or denied, no problem).

If the implementation is perfectly fine and requires no work, understandably the output from validating this will be minimal. In any case, normally the results (good or bad) will also be mentioned on social media as part of standard promotional posts for the Android Enterprise documentation library being built.

### Retesting

Retesting is always encouraged. When a device is retested, the version of the OS it originally tested against will be replaced as well as any changes updated on the supported devices page. The major version and point-release (ie 7.1, 6.0.1) of the OS tested will always be presented with the test results to ensure readers cannot assume the results apply to the device as a whole and not the particular context under which the validation was completed.

### OEM/reseller information

If you’re interested in having devices tested:

- The devices should be up to date. I’ll check for updates prior to testing however this may take additional time.
- The devices should be on an unlocked, global OS build. The carrier and region will be added to the results if not.
- Devices should be allocated to me for one week. I will update the nominated contact if completed sooner.
- As this service is currently free of charge, I’d appreciate a courier being arranged for delivery and collection.
- I’m happy to meet/discuss the process prior to any devices being allocated to me, just get in touch!
- The results will be published on the device support page, and promoted via social media.
- You are free to reference the results in your own material.

Project information
-------------------

### Who am I?

I’m a senior EMM consultant and subject matter expert (SME) for Android and Android Enterprise. I’ve been working with enterprise mobile solutions for a [number of years](https://linkedin.com/in/jasonbayton) and have an [in-depth knowledge of Android Enterprise](/docs/enterprise-mobility/android/) so I know how an ideal implementation looks and behaves. My work has been referenced by MobileIron, Wandera, BrianMadden.com and others. Check out my [about](/about/) page for examples.

<figure class="wp-block-embed-twitter wp-block-embed is-type-rich is-provider-twitter"><div class="wp-block-embed__wrapper">> Digging the new Android zero-touch guide from [@JasonBayton](https://twitter.com/JasonBayton?ref_src=twsrc%5Etfw), the best independent resource for Android enterprise.   
>  <https://t.co/BFTZfKFsrg>
> 
> — Russell Mohr (@rmohr) [November 5, 2017](https://twitter.com/rmohr/status/927181646473912321?ref_src=twsrc%5Etfw)

<script async="" charset="utf-8" src="https://platform.twitter.com/widgets.js"></script></div></figure>### Why test devices?

Android Enterprise is becoming popular, however not all OEMs fully support and/or implement the Android Enterprise APIs to the same standard. The goal of this project is therefore to document as many devices as possible in order to provide a free resource for organisations looking for devices validated to be fully compatible with Android Enterprise EMM deployments.

As an example:

The Motorola [Moto Z](/docs/enterprise-mobility/android/android-enterprise-device-support/#motorola-moto-z) and [Moto Z Play](/docs/enterprise-mobility/android/android-enterprise-device-support/#motorola-moto-z-play) both run Android 7.0 (at the time of testing), look, feel and behave in the exact same way, however while the Moto Z supports the full range of provisioning options, the Moto Z Play doesn’t provision via NFC correctly.

These types of experiences are beneficial for organisations looking to purchase devices, ensuring only those fully supported are taken into consideration (or at the very least, understanding where devices are known to fall short).

### From where are devices sourced?

Devices listed to date have either been purchased privately or loaned to me by an OEM or reseller. How I obtain the devices has zero impact on the results, however those I purchase myself generally receive [far more in-depth public reporting](https://plus.google.com/+JasonBaytonX/posts/4aY2cvziZDB) than those loaned to me with a nominated contact I can report my findings to.

Clearly I cannot afford to buy every device on the market for testing, so I’m hugely reliant on support from OEMS and resellers interested in having devices independently validated. To date **Sony**, **Nokia**, **Huawei**, **CAT**, **BQ** and others have been supportive of this project. I’m currently seeking to make contact with HTC, LG, Lenovo (Motorola), Asus, BlackBerry, and *any other GMS-certified OEMs* to grow the list. If you’re an **OEM** or **reseller** of Android devices, I’d accept any device, appliance or custom hardware running Android 6.0.1 or later to independently test. Devices can be returned within a week or so. Use my [contact](/contact/) page to get in touch or [email me directly](mailto:jason@bayton.org).

If you’re an **organisation** evaluating devices for deployment and wish to have them externally tested, you are also by all means welcome to contact me to discuss this also.

In all cases there is no charge for this service; I only ask you arrange both shipping and collection to/from Newport, South Wales.

### Don’t Google (and others) already provide this information?

Yes, this information could be sourced elsewhere, however it is:

1. Naturally biased – all OEMs can say they support Android Enterprise, but not to what degree or if it’s 100% correctly implemented.
2. Nowhere near as in-depth as my testing – each provisioning method, each deployment scenario, EMM compatibility, and more.
3. Not publicly published alongside competing devices for ease of comparison.
4. Not objectively tested by an independent 3rd party (which ties back into 1.).

Contact
-------

For more information, or to speak to me directly about Android Enterprise validation, please use my [contact](/contact/) page, [email](mailto:jason@bayton.org) me or give me a call on [+447975537754](tel:+447975537754).