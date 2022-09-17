---
title: 'What is Android Enterprise?'
published: '2017-04-07T19:42:57+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Getting started
    - AE General
layout: base.njk
eleventyNavigation:
  key: 'What is Android Enterprise?'
  order: 1000
discourse_permalink:
    - 'https://discuss.bayton.org/t/what-is-android-enterprise/24'
---
Android adoption has increased rapidly over the last few years, becoming the go-to OS for many organisations the world over. Due to the diversity of the platform and flexibility of form factor, application and budget, Android is making a huge impact on how employees undertake their daily responsibilities.

While iOS has typically (though not exclusively) been reserved for C-levels and senior management, employees lower down the corporate ladder are often provided more budget-friendly Android handsets. It makes sense really, although there are many flagships competing directly with Apple, there are even more directly targeting the mid-to-low end of the market at very attractive prices – perfect for mobility on a budget, right?

Up until around the end of 2016, not really.

History
-------

EMM (Enterprise Mobility Management) platforms rely on APIs to communicate with and control managed devices. Things like disabling the camera, Bluetooth or preventing access to system settings are all individually exposed via a multitude of APIs. This is important to know and applies to all modern operating systems, it’s not limited to Android alone.

The difference is while iOS, Windows, QNX (BlackBerry) and others include these APIs with their respective operating systems and system applications, for many years Android did not, or offered comparably very few following the introduction of Device Administrator APIs in Android 2.2 – certainly not enough to consider manageable by any stretch.

That wasn’t the end of the world however; because Android is open source, manufacturers can build upon it and tweak it as much as they see fit. While other manufacturers tested the waters, offering some API functionality here and there, the likes of Samsung and Zebra saw the gap in the market and devoted resources to making a splash.

And it paid off.

Today Samsung and Zebra are some of the strongest Android device manufacturers for enterprise due to their early efforts (with thousands of bespoke APIs) and not only that, they’re the most-supported Android manufacturers for EMM solutions. Other manufacturers have added APIs to try and compete, including LG, Sony, Huawei, but in comparison to offerings like Knox and the MX platform, there’s really no comparison.

One downside specifically of Samsung has been how they historically deployed their APIs; the more expensive devices tended to get the newest versions of Knox, while the mid-market and budget had to endure older versions, occasionally causing confusion (*if they’re all 2017 models, why don’t they all have the same management capabilities?*) and often meaning the newest EMM functionality wouldn’t work with the cheaper devices as well (if at all) and causing a lack of consistency across their own lineup (nevermind the ecosystem generally). In recent years that appeared to improve somewhat with their push to unify system images across devices, but it certainly was a challenge in the Device Admin days.

Back to APIs, the same goes for system applications, too. EMMs require APIs in order to push PIM data to the email, contacts and calendar apps on devices. For a long time it was either not possible or very unreliable to try to push Exchange data to a mid-range HTC, for example, and near impossible on other devices. Finding devices besides Samsung that could be reliably managed was no trivial task – eventually 3rd party apps such as K9, Touchdown and many others began showing up offering EMM integration; for organisations only really needing basic management and PIM who were prepared to purchase licenses for these 3rd party apps, they could relatively safely look beyond Samsung.

And that’s really how it’d been until 2016, when it seems Google had taken notice of both the uneven playing field for enterprise device selection and a recurring perception that Android security is somewhat *lacking.*

Enter Android Enterprise
------------------------

<div class="callout callout-info">

### Android vs Android Enterprise

Android and Android Enterprise are not separate products; unlike Android TV (now Google TV), Android Auto, Android Automotive, Android Wear (WearOS) or other Android editions, Android Enterprise as a solution is simply a part of Android. Furthermore, Android Enterprise isn’t Android management in and of itself, it’s a set of APIs that require a modern EMM in order to properly manage them. </div>

*Or, as it was until 2016, Android for Work.*

Android Enterprise debuted with 5.0 (Lollipop) in 2014 as an optional\* solution manufacturers could integrate in order to provide a common set of device management APIs. From 6.0 (Marshmallow) it was no longer optional and has since been a mandatory component for all [GMS-certified](/android/android-glossary/#gms-certified-certification) manufacturers. There are still *some* optional components for Android Enterprise today and the occasional feature released only for newer versions of Android, however these have little impact on core management, and in some instances these features even find their way into Google Play services, allowing them to be deployed without direct OEM support.

Android Enterprise (AE) offers a few things:

- A reliable EMM experience, knowing when a configuration is pushed, all AE devices will support and execute the relevant requests.
- A containerised work/life separation primarily aimed at BYOD, referred to as a work profile, which in Android 11 also became the basis for COPE.
- A fully locked-down, managed mode for complete corporate ownership with no personal space, referred to as fully managed (previously work-managed).
- A single-use mode (Android Kiosk, but on a fully managed device) for Kiosk-like applications, referred to as dedicated (previously COSU – Corporately Owned, Single Use).
- A combined work/personal COPE usecase for company owned devices permitting personal use. Between 8-10 this was a work profile inflated within a fully managed device allowing absolute control and visibility of the entire device, from 11 this transitioned to a variation of a work profile (BYOD) deployment with a little more visibility and control for IT than work profile alone, but offering far more privacy at a cost of management.
- Out of the box, zero-touch enrolment for Android 8.0 and above (or 7.0 for Pixel).
- A [managed Google Play](https://play.google.com/work) portal offering an application store for work devices containing only explicitly approved applications, the ability to rapidly deploy internal applications through a fast-track upload process, granular app track management, and web app support.
- Silent application installation without the need for a user-provided Google account on the device.
- Managed configs, a way of deploying corporate settings to managed applications (think Exchange profiles, but configurable in Gmail directly. See below).
- OEMConfig, a means for OEMs to provide additional APIs over and above Android Enterprise easily managed directly through an EMM

Here’s a breakdown of the management scenarios Android Enterprise supports:

[![](https://r2_worker.bayton.workers.dev/uploads/2020/02/AEtypes11-Page-6-1.png)](https://r2_worker.bayton.workers.dev/uploads/2020/02/AEtypes11-Page-6-1.png)

As can be seen, there’s a lot of flexibility for supporting most business requirements baked right in, with the additional – the most common – management scenario, where the organisation owns the device but permits some personal usage (COPE), available with Android 8.0. All of these scenarios are available at no cost as soon as Android Enterprise has been bound with the EMM platform of choice.

Enabling Android Enterprise
---------------------------

There are two ways of enabling Android Enterprise, the first and original is through a G Suite managed domain referred to as *managed Google accounts* that requires either an existing G Suite subscription or a free single-user account used for little more than initial setup and, optionally, managed app approval. If domain verification hasn’t already been done through G Suite, the business will need to undertake a couple of tasks to prove they own the domain they’re setting AE up against, followed by a bit of integration work with the EMM platform of choice (if not via G Suite directly!)

The second and newer method is *managed Google Play accounts* and works with any Google account (@gmail.com – or better you@company.com [set up as a Google account](https://accounts.google.com/signup)) – No domain verification required, takes practically minutes to set up and the EMM manages the individual Android Enterprise accounts on the managed devices, meaning there’s no need for additional Google accounts or G Suite user management. Furthermore, because the EMM manages account provisioning, Google doesn’t associate the accounts to any particular user and privacy is enhanced as a result.

Whichever method is used, it’s then possible (but not necessarily required for managed Google accounts since G Suite has bundled EMM functionality) to link one of many existing EMM platforms which support AE and configure the corporate Play Store, Managed Google Play.

BYOD and work profile
---------------------

With the introduction of Android 5.0 Google made user profiles available to phones in addition to tablets already leveraging them. Using the same underlying functionality, Android Enterprise is able to create a managed user profile that although sits entirely separately encrypted on disk (and as of Android 7.0, utilises completely different encryption keys for work/personal), integrates directly with the current user on the device in order to provide both personal and work applications in the same app drawer – the latter indicated by a briefcase:

[![](https://r2_worker.bayton.workers.dev/uploads/2017/04/Screenshot_20170728-175602.png)](https://r2_worker.bayton.workers.dev/uploads/2017/04/Screenshot_20170728-175602.png)

Source: bayton.org, photo: Android Enterprise work profile, this will change in Android Pie

The mix of work and personal apps together on the above BYOD handset demonstrates the level of integration; as an end-user it feels like just another few apps installed, despite the underlying profile configurations working to separate and secure the corporate data. DLP policies can prevent the transfer of enterprise information outside of the work profile or vice versa, and should an enterprise wipe be issued, it simply removes the work profile and leaves all user data untouched.

In addition for the work profile, Google have added work profile authentication; it’s essentially a secondary passcode requirement in order to access the corporate applications within the profile much like that of which BlackBerry’s Good, MobileIron’s Apps@Work or AirWatch’s Container have supported for many years.

Furthermore, the ability to pause (temporarily turn off) the work profile for evenings, weekends or holidays is a great asset to employees and can help tremendously in promoting a healthy work/life balance, even more so in countries where working hours are enforced. This improved dramatically in Android 11, where the Android Enterprise team worked closely with Digital Wellbeing to allow for automatic work profile scheduling, and APIs for administrators to ensure the work profile can’t be turned off indefinitely.

The biggest limitation with the whole BYOD approach from an administrator’s point of view is, as might be guessed, the limited control and visibility over the device itself since organisations cannot “see” anything outside of the work profile and may only enforce very basic device-wide policies such as passcode. For organisations needing more of a traditional managed device implementation, consider looking at fully managed.

As of Knox 3.0, Samsung offer Knox Workspace as an alternative to the native work profile. Overall the UX is similar, but there are some quirks and differences to be aware of. The key benefit with this implementation is the capability to uplift to Knox Premium (for a price) to leverage a much broader set of management APIs over and above Android Enterprise.

<div class="callout callout-success">

### Provisioning guides

Provisioning guides for the work profile deployment scenario can be found here: [Android Enterprise provisioning guides](/android/android-enterprise-provisioning-guides/)

</div>

Diving deeper with fully managed devices
----------------------------------------

With fully managed devices there is normally no user usage provisioned. As the intended use is for wholly company-owned devices, the process of provisioning a fully managed device removes any typically BYOD or COPE (Corporately Owned, Personally Enabled) scenarios and locks the device down strictly to the environment set by the EMM administrator. As of Android 8.0 however, the COPE scenario was been introduced with support for work profiles on fully managed devices, however later

<div class="callout callout-danger">

### Work profiles on fully managed devices deprecated

From Android 11, the COPE experience has changed. Work profiles on fully managed devices, the process of spinning up a work profile atop a fully managed device offering complete device control and visibility was completely deprecated in Android 11 in favour of work profiles on company owned devices, a work profile derived experience with additional device control, and enhanced end-user privacy. Find out what that means [here](/android/android-11-cope-changes/).

</div>

Provisioning a fully managed device by default strips out almost all non-critical system applications unless white-listed, and instead provides access only to authorised apps via managed Google Play. Nothing more. This means should an app require the Camera to function, for example, a Camera app would need to also be authorised or white-listed for use by the business. There is support for enabling system applications, however this will include all of the OEM/carrier bloat most would want to see removed and will therefore require particular apps be disabled, rather than enabled as described above.

Fully managed provisioning is currently initiated on first boot of a new device – or one that’s been freshly factory-reset – using:

- A provisioning app on a dedicated provisioning device (configured with EMM server details) and an NFC bump, or an NFC tag on which to bump devices
- A DPC identifier on the Google account setup screen
- A QR code (ideal for devices without NFC)
- Zero-touch enrolment

In Android 10 NFC bump provisioning is deprecated, and NFC tags are instead encouraged for NFC provisioning.

### NFC provisioning

With the NFC bump, depending on the EMM vendor used, the process will vary slightly in terms of pre-applied settings, what agent is downloaded in order to enrol the device on the relevant platform, etc; AirWatch for example allows for the additional configuration of a named account to directly enrol the device against – very useful for quick staging in bulk. MobileIron and others stay closer to the example set out by Google’s own [provisioning app](https://play.google.com/store/apps/details?id=com.afwsamples.testdpc&hl=en) ([github source](https://github.com/android/enterprise-samples/tree/master/NfcProvisioning)).

Given the need for an NFC bump for this method of provisioning there are some limitations:

- Much like Apple Configurator, all devices being provisioned are somewhat tethered to a base location – yes, NFC tags can be placed elsewhere (it’s only a tag with some environmental information) but it cannot be done remotely “over the air” as it requires that physical bump.
- If the device is wiped, the device owner is reset and the device needs to be provisioned again, otherwise it returns to a fully unlocked, factory-reset state
- Devices not supporting NFC naturally won’t support a bump, this includes devices that have NFC disabled out of the box

### DPC identifier provisioning

Otherwise referred to as EMM token, the arguably more flexible but *geekier* option is the DPC identifier introduced in Android 6.0 Marshmallow. Essentially when prompted to add or create an account on a freshly wiped (or directly from the box) device, rather than pop in a Google account such as <joe.bloggs@gmail.com>, the user/administrator/device provisioner would type in **afw#dpc,** where DPC would be the EMM solution being enrolled into, for example:

- **afw#mobileiron.core** for MobileIron Core (on-prem)
- **afw#airwatch** for AirWatch
- **afw#maas360** for MaaS360

[And others, naturally](/android/android-enterprise-emm-token-collection/).

Utilising this method foregoes the need for the device to be local to administrators and requires no additional provisioning device. It is however less straightforward and more prone to user-error, so clear communications need to be in place to minimise support requests when users are typing *awf#dpc* or other simple typos. Furthermore, there is no system app control with this provisioning method; system applications are disabled with no capability of enabling them in most EMMs beyond whitelisting any desired system application manually.

### QR provisioning

In Android 7.0 Nougat, the ability to provision a device with a QR code was introduced for both local and remote provisioning for OEMs who choose to support it (most do). By tapping on **Welcome** 6 times when the device boots into the setup Wizard, it will prompt the device to connect to WiFi and start QR enrolment, downloading a QR reader with which to scan an EMM enrolment code such as this one for MobileIron (and it will scan, if you’d like to try, however you’ll need a MobileIron Core to complete enrolment):

![](https://r2_worker.bayton.workers.dev/uploads/2017/08/static_qr_code_without_logo-5.png)

In Android 9.0 Pie, the QR package is bundled into the system and therefore doesn’t require a download. This offers much faster provisioning as the device no longer needs to connect to the internet to download the QR package. New in 9 also is the ability to add WiFi credentials to the QR, thus removing one further step from the process. It easily provisions 3x faster than in older Android versions.

<div class="callout callout-success">

### Provisioning guides

Guides for all three of the above fully managed provisioning methods can be found here: [Android Enterprise provisioning guides](/android/android-enterprise-provisioning-guides/)

</div>

Furthermore:

- If issues are detected during fully managed enablement or EMM enrolment, the device may factory reset with little to no feedback. This can be frustrating.
- As mentioned above, initial app management may take some time to get right. Missing core apps may cause problems and as such the setup will need to be tweaked and tested before deployment.

Pro-tip: If the device states provisioning has failed and a reset is required, simply give the device a reboot to try again without a full factory reset. Where this doesn’t work, a reset will still be required.

### Zero-touch provisioning

As of Android 8.0, zero-touch has been introduced as a comparable solution to Apple’s DEP and Samsung KME. Devices are purchased through authorised resellers, assigned to a [zero-touch console](/android/android-enterprise-zero-touch-faq/) and later, when the end-user first takes the device freshly out of the box, will be ready to enrol as a fully managed device straight away; using this method administrators can now finally send devices directly to end-users without the worry of devices not being provisioned due to the number of steps required in the above deployment scenarios. More about zero touch can be read [here](/2017/09/android-zero-touch-enrolment-has-landed/).

In Android 10, it’s now also possible to provision a corporate-owned device through zero-touch to deploy a work profile only. Devices provisioned in this way will **not** be fully managed.

The above provisioning methods are also available in a [handy infobyte](/android/infobyte-did-you-know-android-enterprise-work-managed-provisioning-methods/).

App management
--------------

Where historically EMMs have needed to import applications from Google Play, then manage the install process accordingly (with varied success again due to availability of APIs), with Android Enterprise Google introduced the managed Google Play Store, an enterprise alternative for Google Play on devices allowing only applications explicitly whitelisted for installation by administrators.

[![](https://r2_worker.bayton.workers.dev/uploads/2017/04/MobileIron-Admin-Portal-Users-Devices-e1501261745451.png)](https://r2_worker.bayton.workers.dev/uploads/2017/04/MobileIron-Admin-Portal-Users-Devices-e1501261745451.png)
*Source: bayton.org, photo: MobileIron Core 9.4 (cropped) app management*

The benefit of utilising an EMM platform for app management is managed app configs, making it extremely easy to tailor applications to the business for immediate use on deployment, no additional end-user configuration required:

[![](https://r2_worker.bayton.workers.dev/uploads/2017/02/Screenshot-2017-02-25-at-22.14.27.png)](https://r2_worker.bayton.workers.dev/uploads/2017/02/Screenshot-2017-02-25-at-22.14.27.png)
*Source: bayton.org, photo: MobileIron Core 9.2*

For EMM admins the above config may look familiar, though apps like Chrome offer far more granular functionality around permitted domains, browser functionality and more.

Even better, because Android Enterprise (via the EMM) takes care of the accounts via managed Google Play accounts, there’s no need for a per-user or shared Google account to be on the device, and applications can be pushed down silently!

Furthermore, introduced in 2018, managed Google Play also offers support for both in-house applications and web-apps.

In-house application support offers a fast-tracked, simple and free solution for distributing corporate applications, typically uploaded to the EMM as an APK file, to be instead uploaded directly to Google Play. Benefits of this include app track support for multiple concurrent versions under test, a global distribution network offering a download experience not subject to latency and slow downloads as can be the case with an APK uploaded in one server servicing an entire global device estate, and delta updates, reducing download sizes automatically. Read[ more about private app management](/android/create-and-manage-private-apps-for-android-enterprise/).

Web app support has been an oft-requested feature for a number of years, particularly as once organisations migrated to Android Enterprise, any existing web clip policies (the legacy term for shortcuts to webpages placed on the home screen) could not be distributed to devices. Web app management introduced in managed Google Play allows administrators to create an application out of any website on the internet, and install it onto devices just like an app (because, technically, they are apps!). [Read more about web app](/android/create-and-manage-web-apps-for-android-enterprise/) management.

Conclusion
----------

Hopefully the benefits of Android Enterprise have been adequately conveyed above. To summarise:

- Prior to Android Enterprise the market was awash with inconsistent management capabilities across various Android manufacturers and app developers
- Android Enterprise offers a set of consistent APIs for device management and app management
- Android Enterprise securely separates corporate and personal data, or enables a purely corporately-owned profile without a user space
- Once provisioned, an Android Enterprise-enabled device no longer needs a Google account in order to install applications
- More features are coming in future to expand capabilities and enable more management types.

This is just the beginning. Google’s aim in the short term is feature parity between other offerings provided by the likes of Samsung and Apple, and long-term to far surpass the management capabilities of everyone else to make Android Enterprise the *de facto* choice for enterprise device management. Of course in doing so, they hope the perception of [Android security](https://source.android.com/security/reports/Google_Android_Security_2017_Report_Final.pdf) improves in the process.

If your organisation has struggled managing your Android estate, is tired of dealing with Google accounts, is looking for more tools for entirely corporately-owned devices or anything else above, it could well be time to consider Android Enterprise.

If you’re still on the fence, take a look at some of these further reading articles:

[Considerations for choosing Android in the enterprise](/android/considerations-for-choosing-android-in-the-enterprise/)  
[The Decade that redefined Android in the enterprise](/2020/01/the-decade-that-redefined-android-in-the-enterprise/)

NB: As of 2019, Android Enterprise has [become the default means of managing Android 10 and later devices](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/). Both [VMware](/2020/10/vmware-announces-end-of-support-for-device-admin/) and MobileIron have announced changes to default enrolment and limited and/or end of support for Device Administrator over the coming years.

Furthermore, for assistance in choosing the right devices, please take a look at Google’s [Android Enterprise Recommended list](https://androidenterprisepartners.withgoogle.com/devices/).

\*I mentioned the voluntary incorporation of Android Enterprise there because as 5.0 devices began showing up on the market, they were being bought with Android Enterprise usage in mind and seemingly found to be missing the needed APIs for reliable management. Not all manufacturers – particularly less popular ones – felt the need to add this new, optional functionality.