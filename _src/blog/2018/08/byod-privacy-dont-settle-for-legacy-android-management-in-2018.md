---
title: 'BYOD & Privacy: Don’t settle for legacy Android management in 2018'
date: '2018-08-03T16:35:00+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 9067
tag: []
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/byod-privacy-don-t-settle-for-legacy-android-management-in-2018/374'
tags:
    - Enterprise
---
A lot of what I write about Android is geared towards corporate IT, CxOs, and other policy makers, to help them better the understand how Android enterprise can save time and money whilst offering a generally better experience for everyone involved. In this article, however, I’d like to focus on those arguably most impacted by corporate mobility strategies: the end users.

In 2018, users that take part in corporate bring your own device (BYOD) programs should no longer accept legacy device administrator management, due to the privacy and ownership issues associated with this outdated management model.

**Legacy for a reason**
-----------------------

Next year, Android management will be changing forever with the deprecation of device administrator capabilities in Android Q/10. Jack has written about this [here on BrianMadden.com](https://www.brianmadden.com/opinion/Android-BYOD-should-be-easier-in-2018-and-in-2019-and-in-2020), I’ve [written](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/) about it, and you can read [Google’s official announcement](https://www.blog.google/products/android-enterprise/why-its-time-enterprises-adopt-androids-modern-device-management-apis/), too.

The following summarises the main problems you face with legacy management as a BYOD user bringing a personally owned device full of private applications and data into a business environment.

But before we go any farther, an important note:

The following points are based on multiple conversations with UEM vendors (Unified Endpoint Management, which may also be called the EMM or MDM server, or similar) and my own experience. It’s not intended to incite fear, uncertainty, or doubt—rather only to provide awareness.

The likelihood of the following actually affecting you or your device remains low, and it’s highly likely exactly what can be seen and done with your device will be explained in a corporate mobile device policy

However, knowing the power you hand over to administrators should reinforce why legacy management should no longer be accepted.

### All or nothing management

As I wrote in [Google is deprecating device admin in favour of Android enterprise](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/):

> *The device admin API is based on an all-or-nothing approach requiring full device administrative permissions in order to manage a device. This applies to both corporately-owned devices and BYOD, which is hardly ideal.*

What this essentially means is when you enroll your personal device into a corporate UEM server, you are granting the administrators of that server full, complete control over your device.

They may lock it down more than you feel is acceptable (where did the camera go? Why is Bluetooth disabled?), wipe the entire device either accidentally or on purpose, prevent you from removing device management, reset your passcode, and more.

Because legacy device administrator management requires granting the UEM administrator rights over the whole device, once you’ve granted this power, it may not be easy (though it can be) to remove it again without resorting to a factory reset if permitted, or a reset via recovery if not.

This same logic can also apply to other apps such as email. By completing email account setup on the device, you’ll see the app request administrator rights.

![](https://lh6.googleusercontent.com/i_4eccQjkchdyV9ryAR1-VcBQP3O8tMrAwCO-S0ILrlxOth1Gh3GFfcqdb-9L3ciYK9UiBPWoqxSJAW0KoM4BRX6zABp1FVifxVnOE50mDc3HEbxfl1ZxNFY-CLykHXj8mXpFl3E)

Once activated, even the email app can wipe your phone, either via the UEM server *or* the Exchange server.

### Administrators see a lot

Although UEM solutions offer privacy settings to prevent it, it’s entirely up to the administrators as to what information from a device is synchronized. Privacy-conscious organizations may have combed through the settings to ensure only device details used for minimal identification and management are synced, and some may even choose to anonymise the devices and only base their management on device posture (the device has not been rooted, and there are no potentially harmful applications (PHAs) installed, etc.).

On the other hand, UEM solutions with full administrator rights can theoretically suck up a considerable amount of personal information from a legacy-enrolled device, such as the following non-exhaustive list:

- **Full application list sync**: Application sync is a basic feature of all UEM solutions. It can be used for good, such as for detecting PHAs, but it can also be bad. For example, if you happen to have private health or lifestyle apps you’d normally never discuss in a work environment, the UEM administrators can see them and potentially learn a little more about you they wouldn’t otherwise know.
- **Remote control**: Depending on the UEM, under management it can be possible to silently view and control your device without your express permission. This can also extend to accessing the filesystem, something I’ve experimented with myself on test devices.
- **SMS/Call logging**: Multiple UEM solutions can pull call logs from a device, and few can also do the same with SMS messages.

Once again, before you accuse me of spreading FUD, it’s important to note that just because the above *can* be done doesn’t mean it *will* be done. Your device could be one of hundreds or thousands under management in your organization, and there’s very little need to assume IT have the time or inclination to monitor your device over any other. Again, this is just to demonstrate the capabilities you are enabling by enrolling your device into legacy management.

### Not everything works

Unless you’re bringing a Samsung into work, there’s no guarantee your device will be fully supported by the UEM. You may struggle to get email working on your native client; some policies may not apply or may cause unusual behaviour; and when there are issues, the organization may not be comfortable troubleshooting your device.

This is because the differences between OEMs are great enough that IT won’t be trained to understand every single model and device. As a result, it’s common to see organizations adopt a supported devices list, and if yours is not on there, you’re on your own when things go wrong.

With so many exceptional alternatives across all budgets from the likes of Sony, Huawei, and HMD Global (Nokia), it shouldn’t be required to knee-jerk towards the first Galaxy you see, but the chances are this may be required with legacy management.

**A better way**
----------------

With an Android enterprise work profile, all of the above concerns are no longer relevant. Why is this?

### User privacy and control comes first

In [What is Android enterprise and why is it used?](/android/what-is-android-enterprise-and-why-is-it-used/#byod-and-work-profile), I wrote:

> *Android enterprise is able to create a managed user profile that although sits entirely separately encrypted on disk (and as of Android 8.0, utilises completely different encryption keys for work/personal), integrates directly with the current user on the device in order to provide both personal and work applications in the same app drawer – the latter indicated by a briefcase.*

![](https://cdn.bayton.org/uploads/2020/06/Screenshot_20170728-175602-1140x641-1.png)In other words, when you enroll your BYO device into a UEM solution that supports Android’s modern set of management features (called Android enterprise), instead of it taking complete control of your device, it creates a separate, work-only space (this is called the work profile). The UEM management policies are confined to this isolated area, and you’re free to use the rest of the device as you like.

There are exceptions, such as the enforcement of a passcode on your device, monitoring for a signs of compromise, and other arguably reasonable capabilities ensuring basic security, but the most important ones (factory reset, app sync, remote access, etc.) are simply not possible on your personal apps and data, and instead are limited to the isolated work profile (i.e. all your work apps) that the UEM manages.

### Prioritising the work/life balance

One additional benefit to the work profile, over and above the obvious privacy and ownership benefits, is the focus on work/life balance. You can simply turn it off during evenings, weekends, and holidays, which means you are able to completely disengage from work with the tap of a button.

On a recent holiday I took, I used the opportunity to turn my out of office into another means for demonstrating this message:

> *Thanks for your mail,*
> 
> *I am not in the office this week and my Android enterprise work profile has been switched off to promote a healthy work/life balance, so emails will not be seen.*
> 
> *You can learn more about Android enterprise and how to promote a similar healthy approach to work here –*[ *bytn.uk/ae*](http://bytn.uk/ae)
> 
> *Please forward your email to support for a faster response.*

A little cringe? Perhaps. But it certainly demonstrates the capability of simply clocking off and enjoying life without the interruption of work when you’re not in the office, and I think more people should do the same.

### A unified, consistent experience

Whether you pick up the latest flagship phone or something a little more budget-friendly, you can guarantee your device will work and behave the same way. There may be some visual differences in the UI (skin) of each OEM, but the actual flow? Reliable and consistent. If you’re on a budget, previously, the only choice may have been a low-end Samsung, but now you are able to widen your search to a far greater selection of devices with no concern.

The Android landscape
-------------------------

Right now, roughly half-way through 2018, over[ 66% of all Android devices](https://developer.android.com/about/dashboards/) in the wild are running Android 6.0 Marshmallow or greater.

![](https://cdn.bayton.org/uploads/2020/06/image-3.png)*Android platform distribution, July 2018, via* [*developer.android.com*](https://developer.android.com/about/dashboards/)

Why is this important?

From Android 6.0, which came out in October 2015, Google made Android enterprise support mandatory, so 2 in 3 devices currently in the wild already support it. (Arguably, this number is even higher if you count the so-so capabilities of 5.x, but I would avoid Lollipop in 2018).

In other words, there’s really no reason any modern device you pick up today with a reasonable spec won’t support the necessary functionality to support a dedicated work profile.

There are some exceptions—if you buy a no-name device from eBay, or something that is very low end (like with less than 1BG of RAM, or something that isn’t [GMS certified](/android/android-glossary/#gms-certified-certification), it might not work with Android enterprise work profiles. However, in 2018, for most BYOD users, encountering this situation should be extremely rare.

But is my device supported?
-------------------------------

If you want to undertake due diligence before making the case to your employer for work profile support, there are easy ways to test this for yourself without needing to enroll your device into a UEM platform. Generally speaking, any GMS certified Android device running 6.0 or later with more than 1GB of RAM will be supported by default. A non-exhaustive list of examples can be found [here](https://www.android.com/intl/en_ie/enterprise/device-catalog/), but just in case you wish to test for yourself:

- **Devices supporting dual app functionality**: If you use a OnePlus, Xiaomi, Huawei or Samsung device (as well as some others) you may have noticed features such as Dual App mode or App Twin that allow the creation of multiple versions of an app such as WhatsApp for multiple account support on one device. If your device supports this, work profile support will be pretty much guaranteed. (Note that if you’re actively making use of this app cloning capability, you may find some UEM solutions will error during enrollment, telling you there’s already a work profile in place. To get around this, you’ll need to forego your cloned applications in favour of the UEM-managed work profile instead (sorry).)
- **Try the Android Test DPC:** The [Test DPC](https://play.google.com/store/apps/details?id=com.afwsamples.testdpc&hl=en_GB) will allow you to emulate a device under management. Once installed from the Play Store, simply follow the on-screen instructions to create a work profile. When you’re done, the profile may be destroyed either in-app or via Settings &gt; Accounts &gt; Remove work profile. This is a little more technical, so don’t worry too much if you’re not able to make it work as it doesn’t necessarily mean your device doesn’t support a work profile.
- **3rd party solutions**: Alternatively, take a look at applications like[ Island](https://island.oasisfeng.com/), as these can be used to achieve the same functionality (see “God Mode” in the above link).
- [**Android Enterprise Recommended**](https://www.android.com/intl/en_uk/enterprise/recommended/) **(AER)**: This is a validation program Google runs to confirm devices on the market are fit for enterprise use. While devices that aren’t Android Enterprise Recommended may also work fine in the enterprise, this is hands-down the easiest way to ensure your device is fit for purpose. If your device happens to be one of over 40 [devices on the list](https://androidenterprisepartners.withgoogle.com/?&_ga=2.62613614.334163049.1533026261-236157908.1525374608#!/results/browse-all/2), you’ll be ready to support the work profile. If you’re looking for a new device, it’s generally not a bad idea to check this list regardless, as it ensures your device will have have a reasonable spec. Don’t worry if your device isn’t in the list though, checks such as those above can be done also.

Speak to your organization
------------------------------

Enabling Android enterprise on any of the leading UEM solutions today takes only a few steps, after which IT need only create some basic configurations to define how the work profile functions, and then push out applications. They may decide you aren’t allowed to take screenshots within work profile apps, or share data from a work app to your personal WhatsApp account, for example.

Compared to legacy management, Android enterprise setup is a breeze, but if there are concerns, feel free to point your organization to my[ Android enterprise technical documentation](/android/) to learn more about what it is any why it’s used.

Conclusion
--------------

It should be clear that legacy Android management is no longer suitable for the modern BYOD workforce when an obviously superior option is available, and as of 2018, now widely supported.

If your organization doesn’t support Android enterprise today, ask them why! With the minimal effort required in enabling it and the vast improvements to user privacy and device management (not to mention the upcoming deprecation of legacy management) all organizations should be seriously looking at Android enterprise.

Until that point, ask yourself if you’re willing to forego the privacy and control you currently have over your device to access email or internal business resources. I certainly wouldn’t enroll my own devices into legacy management today, instead opting for a corporate-owned handset which can be as locked down as the organization desires until Android enterprise becomes available.

*Are you enrolled in legacy management today? Have you heard about Android enterprise already? Is your organization embracing or fighting the change? Let me know in the comments,*[ *Twitter*](https://twitter.com/jasonbayton) *or connect with me on*[ *LinkedIn*](https://linkedin.com/in/jasonbayton). *Feel free to reach out with questions across any medium also!*