---
title: 'Hands on with Sony OEMConfig'
date: '2018-08-26T15:48:44+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 6594
tag:
    - airwatch
    - android
    - 'android enterprise'
    - EMM
    - Enterprise
    - 'Enterprise Mobility'
    - MDM
    - mobileiron
    - oemconfig
    - SOTI
    - uem
    - vmware
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/hands-on-with-sonys-oemconfig/181'
tags:
    - Enterprise
---
<div class="callout callout-info">

### Configuration Extension has been discontinued

Sony unfortunately no longer support this once-promising OEMConfig implementation and the app has been removed from the Play Store. [More details](/2019/03/february-was-an-interesting-month-for-oemconfig/). </div>
 
One of the most exciting announcements at Google’s [Android Enterprise Summit](/2018/05/android-enterprise-summit-2018-highlights/) back in May was [OEMConfig](/android/what-is-oemconfig/); a new and exciting tool developed in partnership with Zebra for providing zero-day support for beskpoke OEM management APIs which sit over and above standard Android Enterprise APIs without requiring UEM vendor integration; everything is managed via an app, making use of managed application configurations via the Play API.

I’ve covered off the basics of OEMConfig both above and via a recent [Search Mobile Computing article](https://searchmobilecomputing.techtarget.com/news/252447139/Googles-OEMConfig-could-propel-Android-in-business) with fellow voices in the industry if you’d like to read more.

On Friday, [Emiliano](https://www.linkedin.com/in/emiliano-bolzoni-a3a04147/) over at Sony [shared an update](https://www.linkedin.com/feed/update/urn:li:activity:6438756700521529344/) mentioning the general availability of their OEMConfig implementation, [Sony | Configuration Extension](https://play.google.com/store/apps/details?id=com.sonymobile.enterprise.managedconfigadmin).

Weird naming of OEMConfig aside (a pretty common OEM thing, I guess), this is significant; being the first (I’m aware of) OEM after Zebra themselves to implement OEMConfig and in a way that shouldn’t be too complex for UEM platforms to display means this is ready to be adopted basically immediately (more complex implementations will require UI changes to accommodate in UEMs, for context).

Lets see how it works! Starting with MobileIron and a work-managed Xperia XA2:

Creating a label
----------------

![](https://cdn.bayton.org/uploads/2018/08/2018-08-24-21.45.34.gif)
*Labels offer a simple and powerful means for grouping devices*

This is a Sony application and will only work with work-managed devices; the app validates the device is work-managed, or errors as follows:

![](https://cdn.bayton.org/uploads/2018/08/Screenshot_20180825-002445-e1535153792789.png)
*This is not a work-managed device*

Due to this, it makes sense to create a label that:

- Only targets Sony devices
- Only targets work-managed devices

This is what I’ve created in the GIF above, naming it **OEMConfig Sony WM/WMWP** (where WMWP is *Work-Managed Work Profile*, my short-hand for work profiles on fully managed devices, or COPE).

Defining the configuration
--------------------------

![](https://cdn.bayton.org/uploads/2018/08/2018-08-24-21.32.15.gif)
*While it doesn’t match the breadth of configurations offered by Zebra, Sony does add some useful options*

Sony have out of the box created a number of useful configurations to apply to their devices. With support from Android 6.0+ and all devices across their lineup, OEMConfig can be utilised without having to worry about what can apply where.

At the same time, there’s a fair bit of replication on basic configurations you’d find in most UEM platforms, such as WiFI whitelisting, app black/whitelists, radio control and roaming settings.

In the above image I’ve opted to disable the home button, keep the screen on at all times, prevent shutdown/reboot and prevent access to settings.

What should be clear for anyone who has made use of managed application configuration to date is how familiar this process is. Like you’d configure an ActiveSync URL and credentials for Gmail, OEMConfig is configured in exactly the same way; the UEM queries Play APIs and displays all configuration options made available through the app. When a new version of the app is published with additional capabilities, they will show up automatically without any additional work required by administrators. Very powerful for zero-day support.

I would have liked to test the APN config options as they’re a pretty useful feature to have for pre-Pie devices! Unfortunately I don’t have a test APN to use, so I’ll come back to that in future.

If the GIF above isn’t clear enough, here’s a screenshot of the config in MobileIron:

![](https://cdn.bayton.org/uploads/2018/08/image.png)

Distributing the configuration
------------------------------

![](https://cdn.bayton.org/uploads/2018/08/2018-08-24-22.23.15.gif)
*Applying the application to a label is required for the app to deploy*

With the configuration saved, I now assign the app to my dedicated Sony WM/WMWP label. As it’s a standard Android Enterprise application I’ve already enabled silent installation and automatic updates. The app will now push automatically to the XA2 within a few moments.

(Temporary) manual activation
-----------------------------

![](https://cdn.bayton.org/uploads/2018/08/Untitled-2.2018-08-25-14_24_16.gif)
*This will disappear soon enough, but two taps are currently required*

Currently once the app is installed on the device, the end-user must tap on the app and activate it, much like many mobile threat defence (MTD) and similar applications today. This requirement will be disappearing in an update coming soon, meaning activation will be automatic and silent!

I was initially caught off-guard by the disappearance of the app, assuming maybe it’d stick around and within it I’d get a summary of enforcements (feature request!). The app likely won’t show up like this at all in future, but I do hope there will an area within settings that tells me what’s being enforced.

One thing to keep in mind, once the device administrator permission is granted (unlike DA deprecation, this uses APIs that won’t be affected next year), it cannot be revoked. This means the app can no longer be uninstalled and in fact, when I attempted to do so via MobileIron it resulted in a forever-loop of “this app has been removed” (but not really) notifications that ended with me factory resetting the device.

Results
-------

![](https://cdn.bayton.org/uploads/2018/08/MOV_0147.2018-08-25-14_04_35.gif)
*Power off, restart, even turning off the screen: all blocked.*

As soon as the app has the necessary permissions, configurations are immediately enforced. In the above GIF I was experimenting with some other restrictions such as disabling the back and recents buttons, as well as power/reboot and screen-off restrictions.

All together pretty successful! Something to note with MobileIron in particular: it can be pretty bad at applying config changes once the apps are deployed (I tend to uninstall/reinstall the app to force this, or else have to wait). As the OEMConfig app cannot be removed once activated (and activation will be automatic in future) any configuration changes will take a rather long time to enforce, potentially only sped up with a device reboot. It will eventually work though, and hopefully MobileIron will address this sooner rather than later. AirWatch, SOTI and other UEMs don’t seem to have the same problem.

The Workspace One UEM experience
--------------------------------

![](https://cdn.bayton.org/uploads/2018/08/2018-08-25-14.31.26.gif)

With the app already added to my WS1 UEM console, all that remained was assignment. As can be seen, the WS1 layout is similar, if a little prettier, to MobileIron; one very big difference though being that while MobileIron will allow blank configurations, WS1 prefers they’re either configured or removed (X) which is why I spent time intentionally disabling some of those configs and outright removing others rather than leaving them unmodified.

A very similar result, working as expected:

![](https://cdn.bayton.org/uploads/2018/08/Screenshot_20180825-141705-e1535204655596.png)
*BaytonAP is not a whitelisted WiFi network, so blocked from use.*

Does it work with work profiles on fully managed devices?
---------------------------------------------------------

No.

Despite it being targeted at work-managed devices, of which the work profiles on fully managed devices (COPE) certainly qualifies (and thus why I included it in the original WM/WMWP label), because the app is pushed into the work profile and not onto the device, the app complains and only offers uninstallation.

On a whim I installed the OEMConfig app manually outside of the work profile, however although it does allow me to activate it, as the config is only pushed to the work version of the app this has no effect.

As a corporately owned device it can be argued OEMConfig restrictions should be able to apply device-wide on COPE devices, and I’d certainly like to see some capabilities here.

Thoughts
--------

This is a brilliant beginning to what I believe will fundamentally change how organisations manage Android devices in future, with that said there are definitely some areas of improvement for Sony specifically:

- App management seems superfluous given that’s a basic UEM capability. The same goes for WiFi network settings and some of the restrictions currently offered.
- Based on my own testing here, it’s not unlikely the app will be either accidentally or purposefully removed from devices in future, and that caused quite an interesting, less than ideal result.
- There’s a distinct lack of Sony-specific restrictions in place. I was really betting on seeing management capabilities around Xperia backup, dynamic vibration, Sony themes/wallpaper/etc settings and much more.

Particularly on the last point, the whole idea around OEMConfig is to provide management capabilities on top of the base Android Enterprise solution as an OEM value-add, and proprietary solutions such as dynamic vibration or Xperia transfer which *cannot* be controlled via UEM policies today are perfect candidates for the OEMConfig solution.

In any case this is an exciting result! I hope this shows just how incredibly easy it is to configure devices with OEMConfig, pushing out a configuration as you would any other Android Enterprise application that supports them; with the power OEMs have over what APIs are exposed via OEMConfig and when, it’s really so much more powerful than the historic approach of hoping UEM vendors would implement APIs per OEM, and will really help level the playing field going forward.

*What do you think of OEMConfig? Would you make use of it? Would the capabilities available via OEMConfig influence your purchasing decisions? Let me know in the comments, via [Twitter](https://twitter.com/jasonbayton) or find me over on [LinkedIn](https://linkedin.com/in/jasonbayton)!*