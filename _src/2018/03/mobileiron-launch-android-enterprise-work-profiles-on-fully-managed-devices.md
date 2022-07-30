---
title: 'MobileIron launch Android Enterprise work profiles on fully managed devices'
date: '2018-03-27T11:09:13+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 5461
tag:
    - android
    - 'android enterprise'
    - 'Enterprise Mobility'
    - mobileiron
    - 'work profile'
    - work-managed
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/mobileiron-launch-android-enterprise-work-profiles-on-fully-managed-devices/112'
tags:
    - Enterprise
---
Today, with the release of Core 9.7.0.1, MobileIron [officially introduce](https://www.mobileiron.com/en/smartwork-blog/one-android-device-two-modes-managed-device-work-profile) support for [work profiles on fully managed devices](https://developers.google.com/android/work/dpc/work-profile-on-managed-device).

Work profiles on fully managed devices (further referred to as *managed work profile*) is the fourth and final deployment scenario (far-right, pictured below) for Android Enterprise and the one I’ve been waiting for since its announcement last year! For those unfamiliar, managed work profile is the equivalent of [COPE](/android/android-glossary/#cope) – Corporate Owned, Personally Enabled – which has also gone by the name of COMP (Corporate Owned Managed Profile), WMWP (Work-Managed Work Profile) and likely other names/acronyms as well.

<div class="wp-caption aligncenter" id="attachment_4598" style="width: 1065px">[![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2017/04/Android-enterprise-deployment-scenarios-1.png)](/android/what-is-android-enterprise-and-why-is-it-used/)*Image from [What is Android Enterprise and why is it used?](/android/what-is-android-enterprise-and-why-is-it-used/)*

</div>Why is it important?
--------------------

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2018/03/2018_03_22_08_25_28.gif)Prior to today, when provisioning an Android Enterprise device an organisation has had two deployment scenarios to choose from: work profile and work-managed. These scenarios, while suitable for a number of applications, offer what is essentially two extremes.

- [Work profile](/android/what-is-android-enterprise-and-why-is-it-used/#byod-and-work-profile) is an approach akin to BYOD management; the organisation has control over a dedicated corporate profile with the capability to enforce basic security on the wider device, but little else. The end-user has full control over the device.
- [Work-managed](/android/what-is-android-enterprise-and-why-is-it-used/#diving-deeper-with-work-managed-devices) is the [COBO](/android/android-glossary/#cobo) approach to management; the organisation has full control over the entire device, offering no personal use by default.
- Work-managed also extends to [COSU](/android/android-glossary/#cosu-kiosk), offering capabilities to further lock the device down to single-use.

Arguably that’s either potentially too *open* or too *restrictive* for many organisations, and given the default approach to Device Administrator (or legacy) enrolment has been more centred around the [COPE](/android/android-glossary/#cope) model with varying degrees of restrictions, it’s easy to understand why.

Up to now the work-around has been to permit the addition of Google accounts within the work-managed environment, however this is a “solution” I’d recommend strongly against as it effectively mixes corporate and personal data, something organisations should absolutely not be considering; given legacy management has had containerisation for a number of years with the likes of MobileIron AppConnect, implementing this would be a giant leap back in terms of security and data isolation.

With today’s release that is no longer going to be a concern.

How it works
------------

Once updated to 9.7.0.1, organisations will see a new option within the Android Enterprise mandatory configuration for managed work profile as follows:

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2018/03/ae-wmwp.png)

There’s a bit of a change with the Lockdown Policy too, however this looks to be mostly wording, layout and the addition of yet *more* nested tables (I feel like this layout could be improved). Below shows 9.7 (left) against 9.6 (right), the basic options remain similar:

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2018/03/ae-wmwp-lock-compare.png)

After **Enable Managed Device with Work Profile on the devices** is selected and the configuration is saved, when provisioning an Android Enterprise device to be work-managed using any of the typical provisioning methods (QR, NFC, DPCi, zero-touch) the device will be prompted to create a work profile after enrolling, leaving the parent profile (or *device*) untouched for later personal account setup.

In terms of UX, it’s honestly just a straight-forward mash-up between a work profile and work-managed deployment.

The key differentiation once the device is enrolled when compared to either existing deployment scenarios is having full control over both the device and the work profile! Organisations can therefore enforce any one of these or more restrictions, while permitting personal use on the device and maintaining a strict separation between work and personal data and applications, with each profile independently encrypted on disk:

- Allow camera
- Allow safe boot of the device
- Allow factory reset
- Allow the user to mount physical external media (e.g, SD card)
- Allow the user to transfer files over USB
- Allow use of USB storage
- Allow SMS
- Allow outgoing calls
- Allow Wi-Fi
- Allow Bluetooth
- Allow mobile network to be configured
- Allow tethering and mobile hotspots to be configured
- Allow VPN to be configured

Prerequisites
-------------

- Android Oreo (8.0) or above
- [GMS-certified](/android/android-glossary/#gms-certified-certification) devices
- MobileIron Core 9.7.0.1
- [Mobile@Work 9.7](https://play.google.com/store/apps/details?id=com.mobileiron&hl=en)

### Demo

The below [Sony Xperia XA2](/android/android-enterprise-device-support/#sony-xperia-xa2) is provisioned with a QR Code (off-screen) with system applications enabled.

<iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" frameborder="0" height="281" loading="lazy" src="https://www.youtube.com/embed/AcX-R1Yqx6c?feature=oembed" title="Work profiles on fully managed devices demo" width="500"></iframe>

What organisations should be aware of
-------------------------------------

With the new deployment scenario comes a few recommendations and things to keep in mind.

### 1. Work-managed migrations are not supported

Just as it’s possible to migrate from a legacy Device administrator enrolment to work profile with a simple configuration change on the EMM server, so too is it supported to migrate from work-managed to managed work profile.

Unfortunately, MobileIron doesn’t support this with the release of 9.7.0.1, meaning in order to migrate from work-managed the device will need to be factory reset and reprovisioned. If the organisation utilises zero-touch this is a relatively simple process and combined with managed app configs the re-enrolment can be quick and painless. If zero-touch isn’t available just yet, [utilising a QR code](/docs/enterprise-mobility/mobileiron/manual-android-enterprise-work-managed-qr-code-generation-for-mobileiron/) offers a balance between enabling remote reprovisioning while ensuring the relevant features are available (more below).

Furthermore, toggling the **Enable Managed Device with Work Profile on the devices** checkbox will have no effect on enrolled devices, only those enrolling after the configuration is saved.

<div class="bs-callout bs-callout-success">### What is zero-touch?

Did zero-touch catch your attention above? Not quite sure what it is? Check out [What is Android zero-touch enrolment?](/android/what-is-android-zero-touch-enrolment/)

</div>### 2. System applications should enabled

Normally for work-managed deployments, system apps are disabled to remove most of the unnecessary or unwanted bundled apps. As the device is being provisioned for a COPE environment, it makes sense to leave system applications enabled unless there’s good reason not to do so.

Disabling system apps will result in a device utilising a minimal number of applications, only enough to ensure the device works, requiring the end-user heads to Google Play in order to get the applications they desire. This could result in additional and unnecessary effort, as well as increased data costs for those primarily utilising data.

DPC identifier enrolment (**afw#mobileiron.core**) does not support enabling system applications and so NFC, QR code or zero-touch provisioning should be used instead.

<div class="bs-callout bs-callout-success">### Provisioning guides

Provisioning guides for the managed work profile deployment scenario can be found here: [Android Enterprise provisioning guides](/android/android-enterprise-provisioning-guides/#fully-managed-work-profile)

</div>### 3. Retiring/wiping a device will initiate a factory reset

Unlike Device Administrator enrolment, when sending either a retire or wipe command, the following happens:

- Work profile: The work profile is removed and the device is left untouched
- Work-managed: The device is factory reset

As the devices utilising managed work profile will fall under the work-managed category above, whether a retire or a wipe is sent, the device will initiate a factory reset. All personal data will be lost unless backed up.

### 4. There’s no end-user wizard

When end-users complete enrolment, they will be returned to the home screen of the work-managed parent profile. Normally when setting up a new device the end-user will be taken through a wizard offering account addition amongst other things. This will not happen and therefore users will need to manually add a Google account through device settings (some exceptions exist, such as Pixel which offers to continue setup when opening settings).

An example of this is provided by my [work profiles on fully managed devices provisioning guides](/android/android-enterprise-provisioning-guides/#fully-managed-work-profile).

### 5. Reassess label assignment

For organisations that have implemented one universal Android Enterprise configuration for all AE-capable devices, it will now make sense to start managing these via more complex labels integrating Active Directory groups, custom attributes or other means of separating the work-managed devices from those that will support managed work profiles. This hasn’t been otherwise required up to now as the two main deployment scenarios are invoked via different provisioning methods.

### NB: G Suite accounts aren’t supported

If end-users within the organisation utilise G Suite accounts privately, adding them to the parent profile will result in Google Play becoming managed and limiting application installation to only those approved by the G Suite admin of the user’s private domain. It’s an unlikely scenario, however given private groups and individuals utilise G Suite as well as businesses, it’s possible this may cause a temporary issue (removing the account and adding a non-G Suite account instead will resolve this, but purchases will not be available).

Additional features
-------------------

In addition to managed work profile, MobileIron have also introduced:

- Self-hosted private apps (on managed Google Play)
- Android Enterprise system update policy

Self-hosted private applications allow administrators to privately host APKs with MobileIron, whilst leveraging Google Play for distribution. This will be a welcome addition for organisations not wishing to push their in-house applications into Google Play itself.

<div class="bs-callout bs-callout-success">### An introduction to managed Google Play

Interested in learning more about managed Google Play? Check out my article for Brian Madden: [An introduction to managed Google Play](/2018/03/an-introduction-to-managed-google-play/)

</div>Admins can simply import the APK file into Core, tick the box to install for Android Enterprise and finish. Once generated, admins will need to download the APK Definition file, extract the license and paste it into the provided area before saving.

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2018/03/addapp.png)

As simple as that! More information can be found on Google’s help pages [here](https://support.google.com/googleplay/work/topic/6145152?hl=en&ref_topic=6137710) or on my [Introduction to managed Google Play over](/2018/03/an-introduction-to-managed-google-play/) on [Brian Madden](http://brianmadden.com).

For organisations managing Samsung devices, the system update policy will sound familiar; with this feature organisations can now control system upgrades on Android Enterprise devices directly from the MobileIron admin console:

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2018/03/aeupdates.png)

It’s now possible to enforce upgrades automatically, set an update window to ensure system updates don’t interfere with BAU activities, or postpone up to 30 days for testing and verification. A welcome addition to make update management just a little easier for the wider Android ecosystem.

<div class="bs-callout bs-callout-success">### Did you know?

From Android P it’ll be possible to postpone updates for up to 90 days! Learn more about Android P: [Android P demonstrates Google’s focus on the enterprise](/2018/03/android-p-demonstrates-googles-focus-on-the-enterprise/)

</div>Conclusion
----------

I believe managed work profiles are possibly the most important deployment scenario Android Enterprise offers for the non-rugged market. Understandably Google chose to first concentrate on the BYOD (work profile) and fully managed (COSU, COBO) deployment scenarios in order to tackle two large market segments, however with 78% of business-use device shipments being Android last year (Source: IDC) and still only ~35% of these devices being under management, there’s a very large market of both new and existing organisations who’ll want to take advantage of work profiles on fully managed devices over the existing option; when I talk to organisations it has often been the type of deployment scenario they’re keen to adopt and, until today, one they haven’t been able to adequately replicate with Android Enterprise.

Knowing organisations can migrate from Device Administrator to Android Enterprise managed work profile without sacrificing either organisational control *or* personal usage is going to have a dramatic impact on Android Enterprise deployments going forward.

*Ready to get started? Check out the new work profile on fully managed devices provisioning guides over on [Android Enterprise provisioning guides](/android/android-enterprise-provisioning-guides/#fully-managed-work-profile) and contact your MobileIron solutions provider to learn how you can upgrade to Core 9.7! To learn more about Android Enterprise in general, head over to Android to read all the documentation created to date.*