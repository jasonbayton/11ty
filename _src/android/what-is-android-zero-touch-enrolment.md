---
title: 'What is Android zero-touch enrolment?'
published: '2017-10-27T00:15:27+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Provisioning
eleventyNavigation:
  order: 3000
layout: base.njk
discourse_permalink:
    - 'https://discuss.bayton.org/t/what-is-android-zero-touch-enrolment/31'
---
<div class="callout callout-green">

### New to Android Enterprise?

For an introduction to Android Enterprise, including the deployment scenarios referenced below and how they benefit organisations, see [What is Android Enterprise and why is it used?](/android/what-is-android-enterprise-and-why-is-it-used/).

For a comparison of zero-touch with QR codes, Knox Mobile Enrolment, DPC identifiers and other setup options, see [Android Enterprise provisioning methods](/android/android-enterprise-provisioning-methods/).

</div>

## What is zero-touch enrolment?

Zero-touch enrolment is Android's automated provisioning service for company-owned devices.

It allows an organisation to purchase eligible Android devices, have them registered by an authorised reseller before delivery, and send them directly to end-users. When a registered device is first switched on and connected to the internet, it retrieves the organisation's assigned configuration and begins enrolment into the selected EMM platform.

There is no need for IT to open each box, scan a QR code, manually download an EMM agent, or type an enrolment token onto every device.

If you are familiar with [Apple Business Manager and Automated Device Enrolment](https://support.apple.com/guide/deployment/automated-device-enrollment-and-mdm-dep73069dd57/web), or [Samsung Knox Mobile Enrolment](https://www.samsungknox.com/en/solutions/it-solutions/knox-mobile-enrollment), the overall concept will be familiar.

Zero-touch is available on all GMS-certified devices running Android 9.0 or above, compatible devices running Android 8.0 where the OEM implemented support, and Google Pixel devices from Android 7.1.

## What does zero-touch do?

Zero-touch connects the Android setup wizard to an organisation's chosen EMM.

It provides the device with enough information to:

- Identify the management application to install
- Locate the intended EMM environment
- Supply an enrolment or sign-in token where required
- Display the organisation's name and support information
- Begin the appropriate company-owned provisioning flow

After enrolment, ongoing device management is handled by the EMM. Policies, applications, certificates, compliance rules, operating-system controls and device commands do not come from the zero-touch portal.

Zero-touch is therefore not an EMM and does not replace one, rather it simply directs a new or factory-reset device into one.

For more information, see [Is an EMM still required with zero-touch?](/android/android-enterprise-faq/does-zt-need-an-emm/).

## What is required?

Before an organisation can use zero-touch enrolment, it needs:

- An eligible GMS-certified Android device
- An [authorised zero-touch reseller](https://androidenterprisepartners.withgoogle.com/resellers/)
- A zero-touch customer account
- A supported EMM configured for Android Enterprise
- A company-owned enrolment profile, token or sign-in configuration from the EMM
- Internet connectivity during device setup

The reseller is responsible for creating the customer account when required and registering purchased devices against it.

Organisations cannot normally take arbitrary devices bought through consumer retail and enter their IMEI or serial number into the customer portal themselves. If zero-touch is a requirement, confirm device and reseller eligibility before placing the order, particularly before purchasing devices in bulk.

For existing stock, see [Is it possible to add previously purchased devices to zero-touch?](/android/android-enterprise-faq/add-previously-bought-devices-to-zt/).

## How zero-touch enrolment works

[![](https://cdn.bayton.org/uploads/2017/09/ZT-Demo-Gif_pixel.gif)](https://cdn.bayton.org/uploads/2017/09/ZT-Demo-Gif_pixel.gif)

### 1. Prepare Android Enterprise in the EMM

The organisation first enables Android Enterprise in its chosen EMM and prepares the intended company-owned enrolment configuration.

This is where the organisation decides whether devices will be fully managed, dedicated, or company-owned with a work profile. The EMM may also allow an initial policy, device group, organisational location, user identity, Wi-Fi configuration and provisioning options to be associated with the enrolment.

For most organisations, this work should be completed and tested before devices are ordered.

### 2. Purchase devices through an authorised reseller

The organisation purchases eligible devices from a reseller participating in Google's zero-touch programme.

If the organisation does not already have a zero-touch customer account, the reseller creates one and invites the nominated administrator. If an account already exists, the organisation should provide the reseller with the appropriate zero-touch customer ID so the new devices are added to the correct account.

The reseller then registers the purchased devices using their hardware identifiers.

The organisation should use a company-controlled Google account for zero-touch administration. Google Workspace, Cloud Identity, or another Google account created for business use is preferable to an employee's personal Gmail account.

For MSP deployments, the customer should normally retain ownership of its zero-touch account, with the MSP granted an appropriate administrative role. This avoids an awkward ownership problem if the commercial relationship later ends.

### 3. Connect zero-touch to the EMM

There are two common approaches.

#### Link through the EMM

Many modern EMMs provide a zero-touch integration directly within their administration console. The organisation signs in to Google, selects its zero-touch customer account and links it to an EMM enrolment configuration.

Where this integration is available, the EMM supplies the management application and provisioning information and may automatically provide an Enterprise default profile for newly registered devices.

#### Configure through the zero-touch portal

Alternatively, the organisation can create a configuration manually in the [zero-touch customer portal](https://enterprise.google.com/android/zero-touch/customers).

A configuration normally contains:

- A descriptive configuration name
- The EMM device policy controller, or DPC
- DPC extras containing the EMM-generated provisioning information
- The organisation's name
- A support email address and telephone number
- An optional message displayed during setup

For EMMs based on the Android Management API, the DPC is **Android Device Policy**. The provisioning extras normally contain an enrolment token or sign-in token generated by the EMM.

Established EMMs using their own custom DPC may instead require a vendor-specific management application, server details and other DPC extras. The EMM vendor should provide the supported configuration rather than expecting the organisation to construct it from guesswork.

For examples and additional explanation, see [Android Enterprise zero-touch DPC extras collection](/android/android-enterprise-zero-touch-dpc-extras-collection/).

### 4. Assign the configuration

A zero-touch configuration can be:

- Assigned to an individual device
- Assigned to multiple existing devices
- Selected as the default for devices added by resellers in future
- Supplied automatically through an EMM-linked Enterprise default profile

Setting a default configuration avoids the need to sign in and manually assign every new device order.

Be mindful that a manually selected default normally applies to devices added after the default is set. Devices already present in the portal may need to be assigned individually, in bulk, or through the zero-touch API.

If the zero-touch account is linked directly with an EMM, Google's Enterprise default profile can take precedence over a manually selected portal default.

For the complete administrative process, see [Android Enterprise zero-touch console administration guide](/android/android-enterprise-zero-touch-console-device-guide/).

### 5. The end-user switches on the device

When the device is switched on for the first time, or following a factory reset, it connects to Google and checks whether a zero-touch configuration has been assigned.

If a configuration is present, the device:

1. Displays that it belongs to an organisation
2. Shows the organisation's support information
3. Downloads Android Device Policy or the EMM's supported DPC
4. Passes the provisioning information to the management application
5. Starts the selected Android Enterprise enrolment flow
6. Applies the initial EMM policy and applications

The device cannot simply skip the assigned management flow while the zero-touch configuration remains active.

### 6. The EMM takes over management

Once enrolment is complete, the device appears in the EMM and receives its assigned policies, applications and configurations.

Zero-touch has completed its main job at this point. Administrators return to the zero-touch portal mainly when:

- Purchasing and assigning more devices
- Changing the default configuration
- Moving devices to another EMM configuration
- Managing zero-touch users or resellers
- Reviewing audit logs
- Removing devices that are being sold or transferred

## Is zero-touch really zero-touch?

Not quite, at least not for the person receiving the device.

The name refers primarily to the fact that IT does not need to physically stage every handset. The end-user will normally still need to:

- Switch on the device
- Select a language or region
- Connect to a network
- Accept setup information
- Authenticate with a work identity where required
- Complete any EMM-defined setup actions

The exact experience depends on the Android version, OEM setup wizard, EMM and selected deployment scenario.

It is still considerably less error-prone than asking an end-user to locate the correct EMM application, type a server address, scan an enrolment code and select the correct management mode themselves.

## What happens after a factory reset?

If the device remains registered and configured in zero-touch, a factory reset returns it to the setup wizard and triggers the assigned enrolment again.

This persistence is one of the major differences between zero-touch and a one-off QR code or DPC identifier enrolment. Resetting the device does not remove it from the zero-touch customer account.

See [What happens if a zero-touch assigned device is reset?](/android/android-enterprise-faq/resetting-zt-device/) for more detail.

## Removing and transferring devices

Before a device is sold, returned, donated or transferred to another organisation, it should be:

1. Backed up if data retention matters
2. Retired or removed from the existing EMM
3. Deregistered from the zero-touch customer account

Deregistering is not the same as temporarily removing a configuration. Once a device is deregistered, the organisation will normally need to contact an authorised reseller if it needs to be registered again.

This is worth including in the organisation's normal asset-disposal process. Nobody wants a former employee, purchaser or recycling company greeted by the previous organisation's enrolment screen.

## What if zero-touch is unavailable?

Zero-touch is the preferred option for scalable company-owned Android deployments, but it is not the only provisioning method.

Alternatives include:

- QR code provisioning for new or factory-reset devices
- Samsung Knox Mobile Enrolment for supported Samsung devices
- DPC identifier provisioning, such as `afw#setup`
- NFC provisioning for supported scenarios and devices
- Sign-in URL provisioning where supported by the EMM

QR code provisioning is generally the most practical fallback. DPC identifier provisioning works when required, but offers fewer initial provisioning options and involves more manual input.

See [Android Enterprise provisioning methods](/android/android-enterprise-provisioning-methods/) for a complete comparison.

## Common zero-touch problems

If zero-touch does not start, check:

- The device is registered in the correct zero-touch customer account
- The reseller supplied the correct device identifiers
- A configuration or Enterprise default profile is assigned
- The EMM enrolment token or sign-in configuration remains valid
- The device has working internet access
- Required Google endpoints are not blocked
- The device has been returned to a factory-reset state
- Samsung Knox Mobile Enrolment is not taking precedence on a device registered in both services

For troubleshooting and less common lifecycle questions, see the [Android Enterprise zero-touch FAQ](/android/android-enterprise-faq/#zero-touch).

## Historical demonstration

The video below shows a new Sony Xperia XZ1 using zero-touch to enrol into MobileIron Core.

It is a historical custom-DPC example, so the EMM branding and parts of the setup experience differ from modern Android Device Policy deployments. The underlying flow remains recognisable: the device checks its zero-touch assignment, downloads the management application and enrols without IT manually staging it.

https://www.youtube.com/embed/OP-Szl2nPEc

The process shown in the video is also documented in the original [zero-touch provisioning guide](https://cdn.bayton.org/download/doc/ae-guides/Android-enterprise_WM-ZT-MICore.pdf).

## Further reading

- [Android Enterprise provisioning methods](/android/android-enterprise-provisioning-methods/)
- [Android Enterprise zero-touch console administration guide](/android/android-enterprise-zero-touch-console-device-guide/)
- [Android Enterprise zero-touch FAQ](/android/android-enterprise-faq/#zero-touch)
- [Android Enterprise zero-touch DPC extras collection](/android/android-enterprise-zero-touch-dpc-extras-collection/)
- [Android Enterprise provisioning guides](/android/android-enterprise-provisioning-guides/)
- [Google zero-touch enrolment documentation](https://support.google.com/work/android/answer/7514005)