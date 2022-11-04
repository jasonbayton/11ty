---
title: 'Create and manage web apps for Android Enterprise'
published: '2018-12-27T14:09:47+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Diving deeper
    - App management
layout: base.njk
eleventyNavigation:
  key: 'Create and manage web apps for Android Enterprise'
  order: 4001
discourse_permalink:
    - 'https://discuss.bayton.org/t/create-and-manage-web-apps-for-android-enterprise/250'
---
In December 2018, Google quietly introduced support for web app generation within the Google Play iFrame, allowing for long-requested web shortcut support for Android Enterprise deployments.

## Context

For years it’s been possible to push shortcuts to websites to Android devices, however despite its popularity this functionality, for one reason or another, never made it into Android Enterprise.

A feature I’ve requested from Google many times as it comes up frequently in customer deployments, its support has never been promised and given its absence in Pie, if it did show up in Android Q next year there’s a good chance it would have been a 10+ feature, which isn’t particularly useful for the swathes of Android Enterprise customers all over the world using anything from 6.0 to 9.0:

![](https://cdn.bayton.org/uploads/2018/12/image-2.png)
*October 2018. 9.0 isn’t even shown yet.*

## The proposed solution

The functionality introduced isn’t technically shortcut support, but rather a very simple, automated means of creating web applications from a few pieces of information:

- Name
- URL
- UX (full screen, standalone, minimal)
- Icon

Once created via the Google Play iFrame (they take a few minutes to become available for use) these web apps can be distributed as any normal app would be via the EMM/UEM platform.

Web apps are published privately to the Android Enterprise organisation ID they’re created within and can’t be made public on the Play Store.

Web app support is not tied to an Android version and should therefore be applicable for all current Android Enterprise deployments immediately (as long as the UEM supports iFrame).

## How it works

The following is demonstrated in VMware Workspace One UEM, but the process is identical in all UEMs supporting the iFrame (those that don’t cannot use this functionality).

Within **Apps &amp; Books &gt; Apps &gt; Public**, add a new app. No name is required, despite it showing the asterisk\*:

![](https://cdn.bayton.org/uploads/2018/12/2018-12-27-14.30.06.gif)

Once the iFrame opens, hover the mouse on the left hand side to display the sidebar menu, and click **Web apps**. You may need to scroll down in the empty web apps page to locate the new icon, but once located click it:

![](https://cdn.bayton.org/uploads/2018/12/2018-12-27-14.32.31.gif)

You’re now creating a new web app. Add a name, the URL (any HTTP/HTTPS URL will do, but those like tel:// do not), and select how you wish the app to behave for end-users (ranging from a full screen app to a Chrome browser page):

![](https://cdn.bayton.org/uploads/2018/12/2018-12-27-14.33.01.gif)

Finally, upload a suitable icon. If you don’t have something in mind, a great resource for generating icons can be found [here](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html). When uploaded, click **Create**:

![](https://cdn.bayton.org/uploads/2018/12/2018-12-27-14.35.49.gif)

The web app will be available normally within a few minutes (note the **Not available yet** message under the app after creating it, this will vanish when it’s ready).

Should you ever need to edit the URL the app points to, simply re-open the app, click **Edit** at the bottom of the iFrame (you may need to scroll down) and save when complete. The app will then regenerate.

Some UEMs will import web apps automatically. Others will not. For the latter, simply add an app as you normally would, switch to the web apps tab in the iFrame, click the web app in question and click **Select**. Alternatively if the UEM supports it, run an import from Play to get it.

![](https://cdn.bayton.org/uploads/2018/12/image-3.png)

## Conclusion

Although not technically shortcut support, I feel like this offers a nice, simple alternative that’s very easy to create and, should an organisation ever swap UEMs, simple to reimport for redistribution without having to manually recreate them. Furthermore, because this is not tied to an Android core feature, web app support is fully backwards-compatible!

As it’s via the iFrame, the obvious prerequisite is your UEM must support this (and if they don’t, be sure to make your request heard), however beyond that the feature is ready to be used!

For more information on this feature with your particular UEM platform, please reach out to your UEM vendor directly.