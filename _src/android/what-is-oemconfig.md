---
title: 'What is OEMConfig?'
published: '2018-06-10T21:52:18+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - App management
eleventyNavigation:
  order: 4000
layout: base.njk
discourse_permalink:
    - 'https://discuss.bayton.org/t/what-is-oemconfig/155'
---
Announced at the [Android Enterprise Summit 2018](/2018/05/android-enterprise-summit-2018-highlights/), OEMConfig offers one of the most significant changes to Android management, specifically in terms of speed to market for new management capabilities, in recent years. To understand the significance, let’s start with context.

History
-------

The following will sound familiar to anyone who has read [What is Android Enterprise and why is it used?](/android/what-is-android-enterprise-and-why-is-it-used/) Check out the introduction to Android Enterprise for the full story.

In the beginning and prior to the introduction of Android Enterprise with Android 5.0, the Android management landscape was fragmented and inconsistent. As Google remained mostly hands-off beyond introducing the Device Administrator APIs in Android 2.2 (which weren’t technically for enterprise use, either), OEMs were left to form their own enterprise strategies and thus, their own management APIs. How that turned out is pretty well known today – Samsung emerged above the rest of the market, with OEMs such as Sony, LG and Huawei following behind.

Device APIs are only one half of the story however, the amount of control and influence the EMM market has had is often very much understated.

The reason for this is simple; EMMs manage devices by taking the APIs manufacturers offer and building them into their EMM platforms. If an EMM chooses not to implement OEM APIs, support for enterprise capabilities is understandably not available. Why an EMM may opt out of implementing APIs varies from resource availability, budget or time constraints, absence of a OEM/EMM partnership or other reasons, and could vary from not supporting the management capabilities of a single new update (where new functionality is introduced), a line of devices with unique capabilities, or even an entire OEM. While Android Enterprise would later help with this situation, at the time different EMMs therefore supported OEMs to dramatically varying degrees, possibly with the exception of [SOTI](https://soti.net) who made an effort to work with all of the well-known OEMs on the market to implement the most complete Android support possible.

As years passed, resource was increasingly and more commonly (but not exclusively) allocated to Samsung to support the Knox platform, whilst others were less reliable, or less common.

Fast forward
------------

The introduction of Android Enterprise saw the unification of all OEMs to a base set of APIs, making it far easier for EMMs to implement and guaranteed those OEMs who migrated to Android Enterprise (it was optional at first, after all) would no longer have to necessarily worry about developing their own enterprise management strategies if so desired. The perception was that those base APIs would be *the* APIs EMMs would implement and nothing more was necessary.

That, it turns out, isn’t the case.

Google have a number of times clarified that Android Enterprise is *only* a base set of APIs, and OEMs are welcome to build on top of these. Google will of course always be adding new core APIs to the base layer as the OS continues to mature and thus occasionally may lead to OEM APIs being deprecated in favour of native, however for the most part this offers OEMs a *value-add* over the competition. Both Samsung and Zebra have unified their APIs with Android Enterprise, for example.

This is where OEMConfig comes in.

OEMConfig fixes (almost) everything
-----------------------------------

OEMConfig takes the onus away from the EMM entirely, this is how it works:

1. The OEM develops their devices, the software and the relevant APIs over and above Android Enterprise
2. In tandem, the OEM builds out their custom OEMConfig application to reference and interface these APIs
3. The OEM uploads the OEMConfig application to Google Play, supporting managed app configs for all APIs available
4. The organisation approves and imports the OEMConfig application into their EMM
5. Utilising managed app configurations, the organisation immediately gets the latest version of OEMConfig and the APIs the OEM has added to it
6. The organisation configures the relevant managed app configs and distributes this to devices
7. The OEMConfig app will retrieve the managed app configs and will implement them on the device

In none of the above did the EMM need to do anything to support the APIs the OEM has built in out of the box.

That’s pretty incredible.

It also means zero day support for new features and functionality, as the OEM can literally publish the updated OEMConfig version in tandem with a device upgrade (or release it in line with a device announcement) and keep it constantly up to date; there are even instances where functionality could be introduced with a patch ad-hoc to address issues or a change in behaviour without having to wait for a major version update.

Furthermore, the OEMConfig app can run privileged, meaning it may have extremely granular control over hardware and software features on the device. It’s not limited to toggling bluetooth/Wi-Fi alone, for example.

With this support, organisations will finally be able to enrol devices knowing every API made for the device will be supported from day one, irrespective of the EMM. It’s an incredibly powerful solution to an age-old problem.

EMMs will need to support OEMConfig, by which that means adapting their interfaces to support the OEMConfig layout/design, however this should be a trivial task. After this, they may instead focus budget, time and resource on improving the core EMM solution rather than thinking about the next set of APIs that need to be implemented. There will always be some degree of API implementation with things like Android Enterprise, iOS or Windows following version upgrades, but in terms of per-OEM? No more.

What OEMConfig won’t fix is the fragmentation of management capabilities across OEMs as time goes by. While it’s not a major problem today, and probably won’t be a show-stopper in future since all OEMs will support the base Android Enterprise APIs (and that’s all many orgs will need), it’s certainly something to be keeping an eye on.

When will it be available?
--------------------------

OEMConfig is already available for Zebra and Samsung devices, and a number of OEMs have confirmed since they were either working on it or about to. It has also been inducted into the [AppConfig community](https://storage.googleapis.com/appconfig-media/appconfig-content/uploads/2018/11/OEMConfig-Master-guide.pdf). As EMM support for the advanced layout component grows, which equally isn’t too far out (though this has not been confirmed with every EMM, however will be part of AER soon!), the solution will be ready to deploy!

If Google can now come up with a way of publishing those OEM APIs somewhere in future for simple reference and comparison, it’d equally make device selection a fair bit easier based on niche/explicit lockdown (etc) requirements.

OEMConfig will, without a doubt, have a tremendously positive impact on the Android management ecosystem, just as Android Enterprise has before it. Watch this space!