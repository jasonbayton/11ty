---
title: 'Android Enterprise FAQ'
date: '2019-04-26T16:39:55+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Getting started
layout: base.njk
id: 8143
doccats:
    - Android
wpdc_pin_topic:
    - '0'
discourse_permalink:
    - 'https://discuss.bayton.org/t/android-enterprise-faq/291'
publish_post_category:
    - '6'
---
Below you’ll find a number of frequently asked questions I receive related to Android Enterprise.

General
-------

### Is Android Enterprise supported on uncertified (non-GMS) devices?

No, these devices are not officially supported for Android Enterprise and therefore would be expected to be managed using the legacy and [mostly deprecated](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/) Device Admin APIs. These devices may also be referred to as AOSP, and an excellent example of an uncertified, AOSP device is the Kindle Fire.

Unofficially without GMS certification modern Android devices do allow for limited Android Enterprise management with an EMM that supports [closed network or non-GMS management](/2019/08/vmware-ws1-uem-1908-supports-android-enterprise-enrolments-on-closed-networks-and-aosp-devices/), but your mileage may vary.

### Does Samsung support Android Enterprise?

Yes. Since Android 5.x (Lollipop), like all other OEMs, it has been possible to deploy for free a work profile or provision a fully managed device using Samsung devices and a preferred EMM solution. From Android 8.0 and Knox 3.0, Samsung further integrated AE by having the Knox Workspace container use the Android Enterprise Profile Owner APIs to inflate the Workspace, and as of late 2020 also [began supporting zero-touch](/2020/11/google-announce-big-changes-to-zero-touch/) in addition to their existing KME service. Customers can optionally select to activate a Knox Platform for Enterprise license to enable premium features on the device, including all of the APIs from the previously separate Knox Standard, Knox Custom and Knox Premium SDKs.

### To use Android Enterprise do I need to buy Google Workspace (G Suite) and register my domain?

No. Unless you are already a G Suite customer, you can use your EMM console to register a new Android Enterprise organisation with any existing Google account and your EMM will create unique and generic managed Google Play service accounts on each Android device that allow you to sign into the Google Play Store and receive configs &amp; policies. These accounts are silently added to the device. You do not need to configure your domain, create users, or manage the authentication to services like Active Directory.

### What devices should I buy for my organisation?

This question comes up often and isn’t always simple to answer.

Organisations ideally need to understand the use case for the devices to be selected. This could be normal knowledge worker devices for employees needing a corporate phone, something tough (doesn’t need to be rugged) to withstand harsher environments, or something bespoke such as a kiosk on a reception desk used for checking in or something with an integrated printer/scanner.

After this, the minimum OS required for what the organisation wants to do, for example setting a passcode on a work profile (a *challenge*) requires Android 7.0, ensuring that passcode cannot be the same as the device passcode requires 9.0. More of these comparisons are made in [considerations when migrating from device administrator to Android Enterprise](/android/considerations-when-migrating-from-device-administrator-to-android-enterprise/).

Once determined, the best place to start looking is the [Android Enterprise Recommended list](https://androidenterprisepartners.withgoogle.com/devices/#!?AER). If nothing suits requirements, get in touch and I’ll try to help out!

### If Android Enterprise is supported from Lollipop, why is Marshmallow often mentioned instead?

While it’s indeed true Android Enterprise was introduced as *Android for Work* with Lollipop (and supported even earlier with ***the app*** (but we don’t talk about that), Android Enterprise was an opt-in feature with little uptake and a lot of teething issues. From Android Marshmallow (6.0) it became a mandatory requirement.

In other words, Marshmallow is chosen as a reasonably reliable reference point for when Android Enterprise was guaranteed to be widely supported. There will be OEMs that can confidently state they supported it from Day Zero, however few did.

### What’s the difference between Device Admin and Android Enterprise?

For an in-depth take on this, check out:

- [Android Enterprise vs Device Admin: Why DA is no longer suitable](/android/android-enterprise-vs-device-administrator-legacy-enrolment/)
- [What is Android Enterprise?](/android/what-is-android-enterprise-and-why-is-it-used/)

In a nutshell, device admin was introduced with Android 2.2 as a means of granting admin permissions to applications. Any number of admins can sit on a device and have excessive, often unnecessary control. It has been widely abused by PHAs (malware, etc) and is very limited in scope of capability, leaving each OEM to build upon it in a fragmented and difficult to support manner.

Android Enterprise takes a more sane approach to device administration by permitting only one owner on a device at a time with scope for task delegation to other apps as defined by the management server, this approach is fundamentally more secure and easier to support as the APIs are universal cross-OEM.

Add in features such as no Google account management, silent app distribution, managed system updates, simple provisioning and streamlined enrolment, and it’s easy to understand why Android Enterprise is basically better in every way.

### Is it possible to bind Android Enterprise with multiple EMMs?

No. An Android Enterprise bind is undertaken with only one EMM at a time. Under all normal circumstances attempting to bind with the same Google account on another EMM will return an error stating an Enterprise already exists.

It is possible to unbind from one EMM and then bind with another, however this will delete the existing Enterprise and create a brand new one, losing all approved applications, etc.

The only exception to the above is in high availability and/or disaster recovery scenarios where an instance of an EMM may be replicated, but no two EMMs should be generating managed Google Play accounts from the same Google account simultaneously.

### What is Android Enterprise Recommended?

AER is Google’s validation programme for devices, EMMs, Carriers and MSPs.

Each of the above will have a [list of requirements](https://www.android.com/enterprise/recommended/requirements/) to meet in order to validate, and will re-validate on an annual basis.

More details: [What is Android Enterprise Recommended?](/android/what-is-android-enterprise-recommended/)

### My AER device doesn’t work properly with Android Enterprise, what should I do?

I’ve encountered several examples of things not working quite right with AER devices, particularly when diving into the granularity of a specific function with a specific EMM.

The first point of contact for any device based issue would be the EMM vendor. While it may not be an issue which can be replicated on a different model or OEM, the EMM vendor will still investigate it, particularly if it can be replicated on one or more devices of the same model.

Before contacting the EMM, the organisation should ensure the issue can be replicated on more than one device. If so, attempt to collect logs from the EMM, the device (a bug report, though be aware this will collect personal account information also) and steps to replicate it along with all of the normal details – make, model, Android version, build number, etc. A video is always appreciated though do add the steps on paper also.

If the EMM can replicate it but cannot resolve it, they will have OEM contacts to reach out to to progress it. If necessary, Google will be involved once all other avenues are exhausted, or it’s determined to be a platform issue.

I do a fair amount of device testing, so if you do come across something and your EMM is not providing the support needed, feel free to [reach out](/contact) and I’ll be happy to help.

### Is Android One better than AER? (Or the other way around?)

Android One and Android Enterprise Recommended are two different programmes offering a bit of overlap in security and consistency.

Android Enterprise Recommended ensures devices validated meet the minimum requirements and recommendations of a consistent UX for management, 90 day security updates for 3 years and at least one letter upgrade (O to P, P to Q.. ). OEMs maintain their value-adds, bundled apps, custom UIs and more.

Android One takes this a step further; any device in the Android One programme will use a system image developed with Google. Like the Nexus days of old, the UI is vanilla Android and the Android One team have to approve any additional applications bundled with the device.

Updates must be released every 30 days and the devices must support two letter upgrades (O to Q, P to R, etc).

When combined with AER, Android One offers additional benefits validated to work in the enterprise. It’s a great combination.

### What’s the “best” provisioning method?

Wherever possible, zero-touch offers the best experience both for organisations and users. For organisations, it provides not only the decreased overhead of not having to explain how to manually start provisioning a device (and the support required when users still don’t get it), but also the confidence of knowing should a device be factory reset accidentally or with intent, the device will jump back into zero-touch provisioning as soon as it’s connected to a network. This extends to Samsung’s KME equally for the same reasons. That doesn’t mean zero-touch is the fastest and most efficient provisioning method, in fact it’s probably comparable in speed to DPC identifier, however speed is but one consideration.

If zero-touch isn’t available, my personal preference is QR code provisioning as QR codes are persistent (normally), can be hosted anywhere or freely shared between employees, don’t need a dedicated provisioning device, and support DPC extras.

### What’s the difference between allow adding accounts vs allow configure credentials?

Adding accounts allows end-users to head into Settings &gt; Accounts and add an account.

Configure credentials allows an end-user to configure account credentials in-app.

Both options have legitimate uses, for example the adding of accounts and configuring of credentials may be permitted in a COPE deployment as end-users would be allowed to add a Google account and download their own applications complete with personal accounts.

On the other hand, enabling add accounts in a fully managed or work profile deployment scenario would allow end-users to switch to their personal Google account within Google Play, providing full access to the Play Store from which they may install applications which encourage data leakage and raise DLP concerns (Dropbox sat alongside OneDrive, for example).

### Is it possible to utilise multiple VPN connections within a profile?

Yes this is possible, however not concurrently. Android supports only profile-wide VPN (or always-on VPN) natively, and the per-app VPN functionality often alluded to when multiple VPNs are brought up would have to be supported in-app.

When one VPN is running profile-wide and another is initiated, it will disconnect the first. Should these VPNs have failure protection and automatic reconnect (or leverage always-on VPN for this) the two VPN solutions will repeatedly disconnect one another.

### Does Android support Kerberos natively?

No. I’d recommend taking a look at [Hypergate](https://hypergate.com).

There is however a project which was initiated (but not wholly supported) by Google to bring Kerberos support to Android through an application. Take a look at the respective [Github repo](https://github.com/google/android-kerberos-authenticator) to learn more.

Related: [Setup Kerberos Authentication on MobileIron Core for Android Enterprise](/docs/enterprise-mobility/mobileiron/setup-kerberos-authentication-on-mobileiron-core-for-android-enterprise/)

### What’s the difference between device based accounts and user based accounts?

The account type chosen can have a significant impact on enrolment if not done so correctly.

**User based accounts** are tied to an EMM user and will be used across all devices enrolled by said user.

**Device based accounts** are created per-device irrespective of the user the device enrols under.

In either scenario, that standard limitation of 10 devices per Google account applies, therefore if using one EMM user account to enrol many devices – a common staging exercise – it is imperative device based accounts are selected.

How these account types are changed is EMM specific, so do reach out to your EMM vendor for instructions.

Work Profile
------------

### Can organisations see applications outside of the work profile?

No. User applications and app data residing outside of the work profile are not visible to the DPC within a work profile. System applications are, however once again the data associated with the apps is separately stored, meaning personal account details associated with Gmail would not show up alongside a corporate exchange account within the EMM.

There have been isolated instances where during enrolment the DPC could collect a list of personal applications installed before migrating into the work profile, however by the time enrolment completes this will have been rectified to display only the applications in the work profile.

As of Android 11 this answer also applies to COPE, work profiles on company owned devices.

### Can organisations deploy applications to the parent profile in a work profile deployment?

No. It is not possible to deploy applications into the parent profile (or, the device outside of the work profile) in a work profile deployment. This is covered, as well as other aspects of this use case, with [considerations when deploying MTD with Android Enterprise](/android/mtd-and-android-enterprise/)

As of Android 11 this answer also applies to COPE, work profiles on company owned devices.

### Is it possible to migrate from DA to AE work profile without a re-enrol?

Yes, however this process needs to be supported by the EMM. Few EMMs support this today, so it’s important to ask your vendor (or prospective vendor) if this is something you’d like to do.

The process itself will vary, but it may range from a checkbox in a profile to assigning a specific configuration, or simply a change at the folder/org/group level settings the devices sit within.

Once the process begins, affected devices will be prompted by the DPC to begin work profile setup. In this process the DPC will migrate from the parent profile (device) to a work profile. Understandably many legacy profiles/configs/policies will cease to function and so equivalent Android Enterprise policies should be in place.

### What is a work challenge?

The work challenge is essentially a secondary passcode to access the work profile. In legacy management this would effectively be a container passcode, and is in essence the same thing.

### Enrolment failed but the work profile was created. How do I remove it?

There are a few options available:

**Reboot the device and re-enrol** as sometimes all it takes is a reboot, and the EMM will prompt it’s deletion as it provisions the profile once again.

**Manually delete the work profile** by heading to *Settings &gt; Accounts*. The work profile will be listed and should be removable here.

**Connect the device to ADB** if the profile still won’t delete. This requires enabling ADB debugging on the device via Developer options and a working ADB setup on a computer. A Google search will assist in getting this setup if necessary. Once the computer can detect the device over ADB, run the following:

```
adb shell pm list users
```

This should return a list of active users where user 0 is the parent (device/default) user, and any other number (10, 13, 200 etc) is the work profile. To remove the work profile run:

```
adb shell pm remove-user 13
```

Making sure of course the number reflects the returned value in the previous command.

This should remove the work profile.

Fully managed
-------------

### How can I provision a fully managed device?

There are several options for provisioning into any fully managed deployment scenario (COBO, COPE, COSU):

- **NFC** (5.0+): With the use of a provisioning app provided by your EMM of choice on a spare device, simply input basic environment details and bump NFC radios with a freshly factory reset (or brand new out of box) device to begin provisioning.
- **Managed Google account** (6.0+): Begin setting up a device as normal (including connecting to a network) and at the Google account prompt, enter the managed Google account (G Suite, Google Cloud Identity) address and authenticate as normal.
- **DPC identifier** (6.0+): Begin setting up a device as normal (including connecting to a network), but at the prompt to enter a Google account opt instead to input the DPC identifier of your EMM, plenty of examples are available [here](/android/android-enterprise-dpc-identifier-collection/).
- **QR code** (8.0+): With a QR code provided by either the EMM solution or a counterpart provisioning app (the same potentially used to provision via NFC), simply tap 6 times on the welcome screen to be download the QR reader (8.0) or switch to it automatically (9.0). WiFi details are required unless provided within the QR for 9.0 devices.
- **Zero-touch** (8.0+): Devices purchased through an authorised reseller may be assigned to a zero-touch customer account, and with a configuration created and assigned the device with automatically begin zero-touch provisioning as soon as network connectivity is established.
- **KME** (Knox 2.8+): Samsung devices running Knox 2.8 or above are compatible with Android Enterprise provisioning via KME. Devices added to the KME portal with a profile assigned will begin KME provisioning from a factory reset state.
- **Other**: Your device OEM may support other methods of provisioning. Reach out to them to request details.

More details:

- [Did you know? Android Enterprise fully managed provisioning methods](/android/infobyte-did-you-know-android-enterprise-work-managed-provisioning-methods/)
- [Android Enterprise provisioning guides](/android/android-enterprise-provisioning-guides/)

### Is it possible to “retire” (or enterprise wipe) a fully managed device?

No, both an enterprise wipe/retire/delete from the EMM and a full wipe on a fully managed device do the same thing, they reset the device back to factory settings.

Android Enterprise requires a DPC actively enrolled to provide management policies, without this, the device will reset.

### Devices factory reset as soon as they’re enrolled, why?

Normally this would suggest either the respective Android Enterprise configurations aren’t assigned to the device, or there’s an issue with the binding between the EMM and Google.

Ensure the user of the device is in the correct Active Directory group (if relevant) or EMM group to receive the correct profiles, otherwise check the binding.

### Is Factory Reset Protection enabled on fully managed devices?

Not normally by default, though do validate with your EMM vendor. If confirmed disabled however FRP kicks in after a reset, log a ticket with EMM support.

If so desired, whitelisted Factory Reset Protection is available and offers a simple, albeit caveated means of ensuring devices can’t simply be wiped and re-setup without Android Enterprise provisioning taking place. For zero-touch devices there’s no need to leverage it.

More: [Feature spotlight: Factory Reset Protection](/android/feature-spotlight-factory-reset-protection/).

### Is it possible to migrate fully managed devices between EMM solutions?

Yes, however EMM support on both EMM solutions is required, and I’m not aware of any today who support this except for the Android Management API.

Work profiles on fully managed devices, work profiles on company owned devices (COPE) 
--------------------------------------------------------------------------------------

### How has COPE changed in Android 11?

For details on th changes to COPE in Android 11, please read [Android 11 COPE changes](/android/android-11-cope-changes/).

### Does Intune support COPE?

[Yes](http://doesintunesupportaecope.info).

As of 2020, Intune supports work profiles on fully managed devices from Android 8.0. This is because Google’s [Android Management API introduced support](/2020/07/googles-android-management-api-will-soon-support-cope/) for the deployment scenario (albeit silently, intentionally avoiding stating as such in it’s wider Android 11 COPE announcement).

### Can organisations see applications outside of the work profile on a COPE device?

**Android 8-10** – Yes. This is because the DPC sits both in and outside of the work profile normally, and the DPC will collect an app inventory surrounding it. Organisations can opt to disable this within the EMM under a privacy policy, and EMMs may even disable it by default, however do consider there is a privacy consideration when installing personal applications.

**Android 11+** – No, this is because in Android 11, work profiles on fully managed devices was deprecated in favour or work profiles on company owned devices. This new deployment scenario aligns the privacy aspect with that of a work profile deployment, [because it sort-of is one](/2020/02/android-enterprise-in-11-google-reduces-visibility-and-control-with-cope-to-bolster-privacy/).

### Can organisations deploy applications to the parent profile in a COPE deployment?

**Android 8-10** – Yes, for work profiles on fully managed devices, however this would need to be supported by the EMM. VMware Workspace One UEM can do this for example by uploading an APK to the console, though there are no current examples of EMMs being able to push Google Play applications to both profiles.

**Android 11+** – No, this is not supported for work profiles on company owned devices.

### Is it possible to migrate from fully managed to work profiles on fully managed devices?

Yes, however this requires EMM support. I am not aware of any EMM that supports this today, despite it’s incredible value particularly to early Android Enterprise adopters.

Where the EMM does not support this, or the device runs Android 11, the organisation would need to retire and reprovision the device.

### How should system applications be handled on a COPE device?

**Android 8-10** – My normal advice, where supported through DPC extras (so NFC, QR, zero-touch, but not DPC identifier), is to enable system applications on COPE devices.

Organisations are providing a device provisioned for personal use, and as such the closer to stock it feels, the more familiar users will be with using it.

Most EMMs support the ad-hoc management of system applications, so there’s no reason bloatware can’t still be disabled, but things like system gallery, calculator, health apps and other OEM app suites being enabled should be harmless outside of the secure work profile.

**Android 11+** – While there is still [application management to a degree](/android/android-11-cope-changes/), the act of enabling or disabling system applications during provisioning is no longer supported.

Zero-touch
----------

### What OEMs currently support zero-touch?

As of late 2020, all GMS certified Android 9.0+ devices from all OEMs support zero-touch.

OEMs supporting zero-touch on 8.0/8.1 include:

- **Sony**
- **Huawei**
- **HMD Global**
- **Google**
- **LG**
- **Motorola**
- **Sharp**

Along with the change to globally support all Android 9.0+ GMS certified devices with the integration of zero-touch into GMS Core (Google Play Services), the previous Google-maintained list of zero-touch supported devices, including those running older Android versions, is no longer live.

### Where are resellers located?

Zero-touch resellers can be found include globally. The complete list of resellers can be found [here](https://www.android.com/enterprise/management/zero-touch/#partners).

### Does Zero Touch cost anything?

**No**, it is a **free** service, from Google at least. Reseller partners can choose to charge for this service, or bundle it as part of other offerings if they choose to do so.

Should you be unhappy with a reseller charging for the service, have a look for another reseller who does not.

### Is an EMM still required with zero-touch?

Yes. Zero-touch is just a provisioning method which deploys an EMM agent to your device over the air (OTA), to enrol into a Fully Managed Device profile using Android Enterprise (not legacy Device Admin) APIs. Google do not provide a free EMM solution, though device management is available through Google Workspace (G Suite) with the appropriate licenses.

### What happens if a fully set up device is added to the console?

Nothing until after the device is reset.

### What happens if a user starts setting up a device before the config is applied?

The config won’t apply until after the device is reset. Anything after the “checking for updates” prompt is too late.

### What happens if a config is removed from an enrolled device?

Nothing until the device is reset, at which point it will not be prompted to enrol into management.

### What happens if a new config for a different EMM or server is applied to an enrolled device?

Nothing until the device is reset, at which point the new config will apply.

### What happens if the device isn’t connected to a network (WiFi, cellular) during setup?

The device will allow normal setup, however once connected to a network will prompt the user to reset, or will reset automatically after an hour.

### What happens if the device is reset?

It will be forced to enrol back into management automatically following the data erase, unless a config has not been applied, or has since been removed.

### What happens if a device is unregistered from the zero-touch console?

This action results in the device being irreversibly removed from zero-touch management. Please contact the device reseller to add it back in. The IMEI or serial (WiFi only devices) will be required.

### Can a device be OTA managed from the zero-touch console?

No, please use an EMM solution for day-to-day device management.

### Does enrolling via zero-touch slow down or cause any delay to the setup process while it’s retrieving the zero-touch config?

No, it does this extremely quickly.

### What deployment scenario will a zero-touch device enrol under?

Fully managed (including COSU), work profiles on fully managed devices (8.0-10), and work profiles on company owned devices (Android 11)

### Why does zero-touch require so much touching?

The term “zero-touch” is aimed at admins and IT teams that no longer need to manually touch each device in order to undertake managed provisioning. This is in context of IT teams often pre-staging devices before shipping them to end users to avoid non-enrolment, which is no longer needed when devices are zero-touch registered.

It does *not* apply to the act of end-users running through the provisioning process, which has admittedly required more and more taps over the last few major Android versions due in part to the often unnecessary interruptions of unskippable privacy prompts.

### Can anyone add a device to the zero-touch console?

No, only authorised resellers. Customers are not able to add devices to the zero-touch portal at this time.

### Is it possible for an organisation to add previously-purchased devices to zero-touch?

A reseller has the ability to upload any devices, however it is their obligation to ensure that the device identifiers (IMEI or serial) are correct and that the organisation in question owns the devices, not another organisation or an employee. If the organisation does own these devices, can prove this, and can supply accurate device identifiers, please discuss this with a preferred reseller for assistance. It is up to the reseller if they wish to upload devices already purchased since there are consequences for resellers who upload incorrect data to the zero-touch portal.

### Can anyone remove a device from the zero-touch console?

Only console admins or owners from the customer portal, or the reseller. End-users cannot remove their device from zero-touch enrolment.

### Does Samsung support zero-touch?

As of late 2020 [yes](/2020/11/google-announce-big-changes-to-zero-touch/)!

As zero-touch is a little light on features, Knox Mobile Enrolment has full support for Android Enterprise and a little more control over the how and when for device provisioning, so organisations may still opt not to use zero-touch on a Samsung device.

Through supported EMMs and the minimum Knox version (2.9), organisations can use either KME or zero-touch (9.0+) to deploy an Android Enterprise fully managed, dedicated, or COPE device, or work profile via KME only.

### Is it possible to set a default configuration?

Yes, however this only affects new devices added and not those already on the console. For existing devices, leverage either CSV or API to make bulk changes.

### Is it possible to bulk update devices?

Yes, via the CSV template provided, or the [customer API](https://developers.google.com/zero-touch/reference/customer/rest)

### Is it possible to change resellers?

Yes, either by requesting a new account from a new reseller, or [adding a new reseller through the existing console](/android/android-enterprise-zero-touch-console-device-guide/#adding-resellers).

### Are all zero-touch devices Android Enterprise Recommended?

No. While zero-touch is mandatory for Android Enterprise Recommended, devices that don’t meet Google’s requirements for storage or spec can and still do support provisioning via zero-touch.

### What are DPC extras?

These are a selection of DPC-specific key-pairs which manipulate the enrolment experience. An example may be pre-populating the EMM server, or enabling system applications. They vary between EMMs so do validate before attempting to use one.

### What should I put in DPC extras?

A collection of DPC extras for various EMM/UEM vendors can be found here: [Android Enterprise zero-touch DPC extras collection](/android/android-enterprise-zero-touch-dpc-extras-collection/).

As EMM vendors begin supporting the zero-touch iFrame introduced in late 2020, manual editing of DPC extras should diminish as EMMs will handle it automatically.

### What happens if a device is uploaded with the wrong manufacturer?

The upload may complete successfully, but the device will not initiate the zero-touch enrolment flow once connected to a network. The device will need to be deregistered and re-registered with the correct manufacturer.

### The device registered with zero-touch, but doesn’t launch during setup, why?

This could be a few things:

- Check the manufacturer name is correct, the example CSV file downloaded from the portal lists Google as the manufacturer, and resellers may not have changed it.
- Confirm the IMEIs are correct.
- Confirm a configuration is present and assigned to the device.
- Is the device being setup on WiFi? Try cellular to rule out restricted networks.
- Is the device connected to a network at all? Check and connect if required.
- Is the device running 8.0+? With the exception of Pixel, no device running less than Oreo will support ZT.
- Does the OEM support ZT on the device? Unless Android Enterprise Recommended, zero-touch is optional and may therefore not be supported even on 8.0+ devices.

### Does Android Go support zero-touch?

As of late 2020, all Android Go devices support zero-touch [through expanded zero-touch availability](/2020/11/google-announce-big-changes-to-zero-touch/). Prior to this, Android Go supported zero-touch on an opt-in basis. Validate support ahead of bulk purchase.

### Are employee-owned devices eligible for zero-touch?

No, zero-touch is for corporate-owned devices only.

App management
--------------

### What’s the recommended way of managing in-house (private) applications?

For all EMMs that support it, the Google Play iFrame now supports the simple, few-step process of uploading an APK for distribution to your Enterprise.

Unlike adding an APK directly into the UEM console, uploading to Google Play is safer, easier to manage and less likely to lead to issues compared with pushing APKs directly.

More information: [Create and manage private apps for Android Enterprise](/android/create-and-manage-private-apps-for-android-enterprise/)

Where the Play iFrame isn’t supported, it’s possible to upload and distribute through the [Google Play Console](https://play.google.com/apps/publish/) but keep in mind there’s a $25 fee to set up a developer account.

### Is it possible to deploy app shortcuts to the homescreen of an Android Enterprise device?

No. App shortcuts supported with device admin are not available for Android Enterprise. Instead, it’s possible to deploy shortcuts for Android Enterprise devices as web applications through the Google Play iFrame.

Instead of a bookmark/shortcut that opens in the default browser, web apps are legitimate applications that open with Google Chrome.

More information: [Create and manage web apps for Android Enterprise](/android/create-and-manage-web-apps-for-android-enterprise/)

### The Google Play iFrame is missing a feature in my UEM. How do I enable it?

When deploying the iFrame, a UEM vendor decides what they wish to support. On that basis, the iFrame may lack private app upload, web app creation or bundle support.

It’s possible for a UEM to implement multiple iFrames with these features separated out, so is worth checking this functionality isn’t placed elsewhere on the console.

Should additional features not be available anywhere, please get in touch with your UEM provider to discuss this.

Submit a question
-----------------

Need something else answered? Comment below, tweet [@jasonbayton](https://twitter.com/jasonbayton) or tag me in a [LinkedIn](https://linkedin.com/in/jasonbayton) post. Questions may be republished on this document, or form the basis of a new document under [/android](/android).