---
title: 'Android Enterprise vs Device Admin: Why DA is no longer suitable'
published: '2019-03-27T16:53:58+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Diving deeper
layout: base.njk
id: 8007
doccats:
    - Android
publish_post_category:
    - '6'
discourse_permalink:
    - 'https://discuss.bayton.org/t/android-enterprise-vs-device-admin-why-da-is-no-longer-suitable/26'
---
If you’ve read [What is Android Enterprise and why is it used?](/android/what-is-android-enterprise-and-why-is-it-used/), you’ll know Android Enterprise (AE) offers several rather useful features and deployment scenarios to suit many business requirements. If you haven’t read the above document, please do so either before or after this to compare.

A recurring query when discussing Android Enterprise is, as might be expected:

*How is it different from legacy (device administrator) enrolment?*

That question used to depend on whether we were referring to vanilla Android or Samsung &amp; Knox; today with Samsung’s Android Enterprise unification and capabilities sitting comfortably atop the base layer of Android Enterprise APIs, it’s no longer necessary to decide between them, they can be leveraged together (though there will be references below).

What is Device Admin?
---------------------

Device Admin, introduced with Android 2.2 Froyo, offered something of a limited offering to fill the void for applications requiring elevated administrative permissions in order to perform certain tasks.

These permissions could be locally implemented within the app, or remotely pushed from an external server.

One such well-known example of an application leveraging Device Admin is the native email client, this is because this and many other email clients must accommodate basic security and control in order to enforce Exchange policies; an example requirement of an Exchange policy is the ability to wipe a lost or stolen device, and Device Admin APIs offered this capability.

Another API, long-since deprecated, included the ability for a DA application to change the passcode of the device. Something that would prove troublesome as Android grew in popularity.

The capabilities of DA grew as adoption increased, though the reason I refer to it as a *limited offering* in the opening paragraph is due to the fact it was never intended to be used in the way it has been, particularly for enterprise, and ramifications today can still be seen.

Challenges with Device Admin
----------------------------

Below are a collection of challenges associated with device administrator, or *legacy* Android management **generally**. Organisations leveraging purely Samsung devices today may not necessarily have experienced some of these, but this is broadly speaking across the ecosystem as a whole. There’s a very good reason Samsung have dominated the enterprise space for so long – they’ve developed the tools and capabilities to mostly overcome the pitfalls of legacy management, though not entirely.

### Difficult, error-prone enrolment

Without provisioning methods, DA device enrolment has always been a long, fragmented, and inconsistent process requiring an end-user works through the whole setup wizard, manually downloads the EMM agent via Google Play or sideloads (the latter requiring enabling unknown sources, though this is often required anyway) and accepts various permissions.

There are a number of opportunities for error, such as skipping the adding of a Google account, denying permissions, downloading the wrong EMM agent and more; an example of this process on a Nexus 5 is documented [here](/android/android-enterprise-provisioning-guides/#legacy-enrolment). It’s worth noting the Nexus 5 shipped without the typical array of additional OEM setup wizard screens and services which often add many more steps to the process.

With the exception of Samsung who have developed and leveraged Knox Mobile Enrolment (KME) for a number of years to ease DA EMM enrolment, for organisations who didn’t or couldn’t use it, Android enrolment has been consistently complex and error-prone.

### Limited, inconsistent control

Out of the box, Android as provided by many OEMs offers very few management APIs for EMMs to leverage, simply because they’ve never – before Android Enterprise – been included in the Android source code OEMs use to build their device images.

Some OEMs have over the years implemented their own APIs for various capabilities that make for a partially (or in Samsung’s case, very) manageable device, however this equally requires that EMMs choose to implement the respective bespoke APIs for the functionality offered, which hasn’t always been the case.

When EMMs do implement these bespoke APIs, in addition to having to request *device administrator* permissions for the EMM agent, it’s highly likely the EMM would also require an additional, per-OEM, application installed on the device to better utilise them; SOTI is most notable for having over 170 of OEM plugins, but the act of installing one involves enabling unknown sources and sideloading APKs. [Not very secure](/android/why-you-shouldnt-install-apps-from-unknown-sources/).

![](https://r2_worker.bayton.workers.dev/uploads/2017/10/apisupport-e1507840615305.png)
*AirWatch restriction support by different OEMs*

Beyond basic security policies and perhaps a simple email/WiFi/etc configuration then, outside of the bigger OEMs (Samsung, Huawei, Sony, others to a lesser degree), there’s not a lot administrators can manipulate and control with a legacy-managed Android device, which already makes them rather unappealing for use in an enterprise setting.

The exception, as mentioned above, is Samsung. When a Samsung device is enrolled normally (as in, not via Knox Premium), EMM administrators have management over the device to a degree similar to that of an Android Enterprise [fully managed](/android/what-is-android-enterprise-and-why-is-it-used/#diving-deeper-with-work-managed-devices) device; there are an abundance of restrictions available and excellent visibility of device posture. Samsung’s DA offering isn’t perfect however, and encounters many of the other shortfalls of DA.

### A poor app management experience

When you then consider application management relies on the use of a Google account and requires users manually download applications from Google Play distributed to them via the EMM platform, it becomes even clearer to see the overhead for supporting these devices is rather high.

In some cases, again leveraging bespoke APIs of OEMs, it has been possible to push and install applications distributed in APK format from the EMM silently, but at a cost once more of security and management overhead.

For example, a single application hosted in Google Play may distribute upwards of 5 separate versions of an app depending on:

- OS version
- Architecture (32/64bit, ARM or Intel)
- Screen size or display density

If an IT admin were to simply extract from a device – or worse, download from the internet – a copy of the APK to be uploaded and distributed from the EMM, there’s little guarantee it is the correct version for the estate, particularly if that estate is varied, which they often are.

Worst case, the IT admin might inadvertently push a PHA (potentially harmful application) which could be anything from adware to a keylogger, screen recorder, or in another dire scenario, a derivative of double locker, which after gaining device admin privileges will change the passcode of the device and encrypt its contents.

Assuming the APK is safe, but not appropriate for the device, the organisation may end up incurring large mobile data fees as the EMM tries and fails to install an unsuitable APK repeatedly; the device will reject the installation, the EMM will see the failure and re-push the APK once more. Potentially at every checkin until admin intervention. I have seen this situation play out several times and it is not pleasant.

If taking the more sensible approach to application management by utilising Google Play, a Google account is required on the device and users of legacy-managed devices will simply be prompted, often repeatedly, to go and install it manually from Google Play as mentioned above. When retiring the device (as in, enterprise wipe – not a full reset) there’s no consistent guarantee those download applications and their accounts will be removed with it, potentially leaving corporate data on an unmanaged device.

Further complicating things, the introduction of [Factory Reset Protection](/android/feature-spotlight-factory-reset-protection/) (FRP) means wiping a device without first removing the users’ Google account may render the device unusable. Really not an ideal situation to end up in as without end-user cooperation, it can be costly to send devices off for repair, a necessity if the device is to be re-deployed.

This is not to say these devices have *no place* in an enterprise setting. Organisations that support a Bring Your Own Device (BYOD) initiative will find most EMMs have containerisation solutions permitting the use of corporate applications within an encrypted, sandboxed environment. In the case of Samsung these solutions are again built in! Assuming the organisation doesn’t want to control the devices, rather only the corporate data on those devices, it’s possible to support legacy Android, at least until Android Q when [DA is deprecated](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/).

### Permissions – management and abuse

**Permissions management**: Depending on the permissions required for applications, be that the DPC (EMM agent) or those brought down from the Play Store, applications can either function well, on a limited basis or simply not at all when those required permissions are not granted.

App permissions have gotten increasingly more granular, easier to understand and offer far greater control since Android 6.0, but with that comes the potential, from the perspective of an organisation, for increased overhead and potential issues.

With device admin, app permissions cannot be managed by anyone but the end-user, meaning where problems arise in the function of managed applications, it is highly likely due to the accidental or intentional denial of a critical permission.

A user may not wish to grant a managed application access to contacts or calendar, or perhaps a request for location gives the impression an application may be tracking the end-user location.

Whatever the reasoning behind it, the only means for overcoming mismanagement of permissions requires users manually approving them via application settings, something which will often require IT assistance. When it’s a few devices this can be problematic, when it affects a reasonable proportion of a large fleet, the time and associated costs may rise considerably.

**Permissions abuse**: with the Device Admin model, there’s no single “owner” of a device. As many device admin-enabled apps as desired may control a device, all with as many or as few implemented DA permissions as app developers desire.

With this model, it’s all too easy for permissions abuse to flourish.

Take Double Locker mentioned above, this app disguised itself as Flash Player. This is not an uncommon method of distributing PHAs and for many users, the DA permissions request is no different to any other app asking for any other permission.

Users are conditioned to agree to such requests with little consideration, and thus, PHA developers can easily take advantage.

There is justification for such a model however, with no alternatives at the time, and multiple legitimate applications making use of various capabilities for password management, locking the device or otherwise by EMM solutions, MTD/AV applications, even Google’s own Find My Device utilises it to this day.

### Device Admin is going away

Even if DA was considered passable today, there is no future for legacy device management. With the introduction of Android Q, EMMs targeting API level 29 will no longer be able to adequately manage DA-enrolled devices.

For more information on DA deprecation, check out the following resources:

- [Infobyte – Did you know? Device Admin deprecation](/android/infobyte-did-you-know-device-admin-deprecation/)
- [Google is deprecating device admin in favour of Android Enterprise](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/)

How Android Enterprise compares
-------------------------------

- Consistent, reliable management
- Flexible, simple & safe application management
- Zero-day support for new features and functionality
- Secure by default
- A solid foundation on which to build

All of these aspects of Android Enterprise are explained in detail in the following documents:

- [What is Android Enterprise?](/android/what-is-android-enterprise-and-why-is-it-used/)
- [Considerations when migrating from device administrator to Android Enterprise](/android/considerations-when-migrating-from-device-administrator-to-android-enterprise/)
- [Considerations for choosing Android in the enterprise ](/android/considerations-for-choosing-android-in-the-enterprise/)

Conclusion
----------

Most organisations, and particularly those who want to more easily support a diverse range of devices will benefit massively from the consistent experience, the automated management of Google accounts and the remote application configuration of Android Enterprise; more from the security, privacy and modern approach to management.

In any case, what should be abundantly clear is how ill-equipped Device Admin is for corporate management, and with it’s impending demise, organisations can’t risk putting off a migration.