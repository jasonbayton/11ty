---
title: 'Create and manage private apps for Android Enterprise'
date: '2018-12-27T15:40:20+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Diving deeper
layout: base.njk
id: 7247
doccats:
    - Android
publish_post_category:
    - '6'
discourse_permalink:
    - 'https://discuss.bayton.org/t/create-and-manage-private-apps-for-android-enterprise/251'
---
In December 2018, Google quietly introduced support for private app upload within the Google Play iFrame, allowing for simple, straightforward upload of in-house applications without the hassle associated with uploading to the Google Play console directly.

Context
-------

With a switch to Android Enterprise, the recommended means for distributing corporate, in-house applications is through managed Google Play. UEMs *can* support silently pushing uploaded APKs directly to devices from the UEM platform, either UEM-hosted or by leveraging the externally hosted app capability Google has previously offered, but this isn’t consistent across UEMs in the way uploading an app directly to Play has been, and so the general recommendation has remained largely unchanged.

Uploading apps to the Google Play Store, however, is not straightforward:

- You need to pay a $25 fee before being able to upload apps
- The publishing process is long-winded and arduous
- Mistakes can easily be made by inexperienced admins, leading to public availability of the in-house application.

..and more. The process has left a lot to be desired for a long time.

The proposed solution
---------------------

In this case, rather than incrementally improve the process, Google seems to have taken the [previously announced feature](https://support.google.com/a/answer/2494992) for G Suite and applied it to the Google Play iFrame. With only a little information, organisations can quickly and easily upload their private applications with very little effort:

- App name
- APK file

Once submitted, the app will be uploaded to managed Google Play against the Android Enterprise organisation ID in which the UEM is binded. Apps uploaded in this way cannot be made public, and therefore are only useful for internal, non-public applications.

It’ll take a little while for the app to upload and become available for use, but once complete, the app can be imported into the UEM as with any other public or previously Google Play-uploaded private application.

How it works
------------

The following is demonstrated in VMware Workspace One UEM, but the process is identical in all UEMs supporting the iFrame (those that don’t cannot use this functionality).

Within **Apps &amp; Books &gt; Apps &gt; Public**, add a new app. No name is required, despite it showing the asterisk\*:

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2018/12/2018-12-27-17.07.23.gif)Once the iFrame opens, hover the mouse on the left hand side to display the sidebar menu, and click **Private apps**. You may need to scroll down in the empty private apps page to locate the new icon, but once located click it:

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2018/12/2018-12-27-17.08.01.gif)You’re now creating a new private app. Add a name and upload the APK:

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2018/12/2018-12-27-17.08.34.gif)Once complete, click **Create**:

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2018/12/2018-12-27-17.09.08.gif)The private app will be available normally within a few minutes (note the **Not available yet** message under the app after creating it, this will vanish when it’s ready).

If you click the app, you’ll be taken into the details view for it, where you’ll be able to edit the name, upload new versions, and also see a link to Google Play to add more information:

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2018/12/2018-12-27-17.29.55.gif)![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2018/12/image-4.png)Some UEMs will import private apps automatically. Others will not. For the latter, simply add an app as you normally would, switch to the private apps tab in the iFrame, click the app in question and click **Select**. Alternatively if the UEM supports it, run an import from Play to get it.

Conclusion
----------

An improvement to the process of uploading private apps to Google Play has been long-overdue, but definitely worth the wait for them to get it right.

Uploading private apps is now a 2 step process, free to use and ensures no mistakes can be made when compared to the old, convoluted process. That said, for organisations happy to use the Google Play Console for app management, the options to do so are still there and can be leveraged, so it’s a win-win with this implementation.

As it’s via the iFrame, the obvious prerequisite is your UEM must support this (and if they don’t, be sure to make your request heard), however beyond that the feature is ready to be used!

For more information on this feature with your particular UEM platform, please reach out to your UEM vendor directly.