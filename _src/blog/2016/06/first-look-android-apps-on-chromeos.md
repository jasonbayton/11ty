---
title: 'First look: Android apps on ChromeOS'
date: '2016-06-18T01:03:23+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 2847
tag:
    - android
    - chrome
    - chromeOS
    - 'google play'
    - m53
    - 'play store'
post_format: []
post_views_count:
    - '1217'
tags:
    - Reviews
---
After almost a month following [the announcement](https://chrome.googleblog.com/2016/05/the-google-play-store-coming-to.html), Google has finally dropped ChromeOS update m53 for Asus Chromebook Flip dev channel users and with it, the Play Store.

Following last month’s announcement I ordered a Flip almost without hesitation. I’ve been waiting for Google to expand on their previous [ARC beta](https://chrome.googleblog.com/2014/09/first-set-of-android-apps-coming-to.html) back in 2014 and having spent a few hours with it this evening, here are my thoughts.

What is it?
-----------

Unlike ARC (App Runtime for Chrome) – a solution that required modifications to be made to Android apps in order for them to run – Google’s new approach takes a leaf out of the increasingly popular Linux container world (Docker, [LXD](/tag/lxd), etc) to provide a minimal Android environment within a secure container running on alongside Chrome on the ChromeOS system, this has the benefit of sharing system resources effortlessly when compared to traditional hypervisors and as such performance is top-notch.

![chromeosandroidstack](https://r2_worker.bayton.workers.dev/uploads/2016/06/chromeosandroidstack.png)

As the Chrome OS UI sits atop of both Chrome and the Android container, both systems can be integrated into the same UI. Notification access, windowed applications and the general feeling of a “native” solution has been achieved.

It “just works”
---------------

Upon booting back into ChromeOS following the update, the Play Store icon sat unassuming on the shelf. On opening the Play Store I was greeted with a little introduction (above) and terms of service.

A couple of clicks later, here it is in all its glory!

![Screenshot 2016-06-17 at 16.30.32](https://r2_worker.bayton.workers.dev/uploads/2016/06/Screenshot-2016-06-17-at-16.30.32.png)

Navigating around the Play Store is super smooth and feels pretty natural. The Flip is a touchscreen-enabled Chromebook, however using the Play Store with either the touchpad or the touchscreen work equally well.

Applications install quickly and notifications are well integrated into the ChromeOS notification centre.

![Screenshot 2016-06-17 at 23.56.42](https://r2_worker.bayton.workers.dev/uploads/2016/06/Screenshot-2016-06-17-at-23.56.42.png)

It’s fast
---------

Being a developer preview I wasn’t expecting the system to fly; I was very much waiting to watch as the Flip, or at the very least the new apps running on ChromeOS regularly grind to a halt.

Not a single stutter.

This likely has a lot to do with the container technology used to run Android on ChromeOS rather than a traditional hypervisor approach as mentioned above wherein the container shares resources with the host directly as opposed to Chrome OS having to virtualise the hardware on which the Android framework runs. This dramatically reduces the resources required to run it. It may also be because the Android system running appears to be relatively light, foregoing features in favour of speed. Of course it could be something entirely different!

As it stands at the time of writing, I have Gmail, Google+, JuiceSSH, Spotify, Skype &amp; Hangouts running. Switching between these apps is effortless and despite the added load, there’s no indication the Flip can’t handle it.

![Screenshot 2016-06-18 at 00.12.26](https://r2_worker.bayton.workers.dev/uploads/2016/06/Screenshot-2016-06-18-at-00.12.26.png)

Additionally, apps appear to be able to work in the background even when the app window is closed. JuiceSSH for example retains a permanent notification in the notification area when an SSH session is active. Clicking this will launch a window to return to the session exactly where it was left off. A nice addition.

It’s not perfect however, as I noted youtube videos would stop once they were no longer the “foreground” app, however this was hit and miss; it would appear providing the Android app is foreground *on the Android container* it was possible to retain a level of interaction even when using Chrome. If I brought up another Android app, this was no longer the case.

It’s easy to manage
-------------------

Once apps have been installed, they’re all available within the Launcher. It’s not always possible to differentiate the Chrome apps from Android apps, so occasionally confusion can occur where two (or more!) versions of the same app have been installed.

![Screenshot 2016-06-17 at 16.42.07](https://r2_worker.bayton.workers.dev/uploads/2016/06/Screenshot-2016-06-17-at-16.42.07.png)

Right clicking on any app provides a quick and simple way of uninstalling it, though this can also be done through Android settings linked from within ChromeOS settings.

![Screenshot 2016-06-18 at 00.26.50](https://r2_worker.bayton.workers.dev/uploads/2016/06/Screenshot-2016-06-18-at-00.26.50.png)

From Android settings it’s also easy to configure other aspects of the Android container, like additional accounts, notification settings, print settings and more. Again, not being a mobile device the options available are quite a bit more limited, but it’s certainly granular enough to get the job done.

![Screenshot 2016-06-17 at 21.55.48](https://r2_worker.bayton.workers.dev/uploads/2016/06/Screenshot-2016-06-17-at-21.55.48.png)

But it’s not perfect
--------------------

Obviously it’s available only to those on the dev channel for a reason; this implementation of Android is certainly not without its niggles:

- While the Android world comes to terms with this new functionality, applications won’t be perfect. Some applications when maximised show large black bars, some force close. Others such as those requiring GPS, telephony or any sensors unavailalbe on a Chromebook as a prerequisite for installation won’t be compatible.
- Trying to store data on the local storage area leads to hanging in some applications, particularly the screen recorders I attempted to use to capture video for this review (sorry!)
- Windows can’t yet be dynamically resized and are therefore fixed to the three window sizes Google have defined, except for the option to maximise.
- Attempting to update the Android OS results in an immediate force close of the settings app.

![Screenshot 2016-06-17 at 21.55.57](https://r2_worker.bayton.workers.dev/uploads/2016/06/Screenshot-2016-06-17-at-21.55.57.png)

I would definitely also like to see adoptable storage for ChromeOS, the 16GB most Chromebooks have today is pretty limited when considering there’s ChromeOS, Android and all related apps from both platforms taking up space. What remains isn’t significant.

Conclusion
----------

For a development build I really can’t knock what Google have shipped here. The speed and simplicity far surpass my expectations and the ability to access the Android system settings directly is a nice touch that retains a level of user control.

With this new feature I truly now believe Chromebooks are finally usable for the many who have held out due to limited functionality; before the announcement of the Play Store I would have never even considered getting another Chromebook (I’ve used a few over the years, never for very long), yet for the price and now the capabilities offered, it’s a steal.

I’ll look at Chromebooks in a whole new light from now on.