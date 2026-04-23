---
title: 'Create and manage private apps for Android Enterprise'
published: '2018-12-27T15:40:20+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - App management
layout: base.njk
eleventyNavigation:
  order: 4000
discourse_permalink:
    - 'https://discuss.bayton.org/t/create-and-manage-private-apps-for-android-enterprise/251'
---
In December 2018, Google quietly introduced support for private app upload within the Google Play iFrame, allowing for simple, straightforward upload of in-house applications without the hassle associated with uploading to the Google Play console directly.

## Context

With a switch to Android Enterprise, the recommended means for distributing corporate, in-house applications is through managed Google Play. UEMs *can* support silently pushing uploaded APKs directly to devices from the UEM platform, either UEM-hosted (with appropriate OEM support with AMAPI) or by leveraging the externally hosted app capability Google has previously offered, but this isn’t consistent across UEMs in the way uploading an app directly to Play has been, and so the general recommendation has remained largely unchanged.

Uploading apps to the Google Play Store, however, is not straightforward:

- You need to pay a $25 fee before being able to upload apps
- The publishing process is long-winded and arduous
- Mistakes can easily be made by inexperienced admins, leading to public availability of the in-house application.

..and more. The process has left a lot to be desired for a long time.

## The proposed solution

In this case, rather than incrementally improve the process, Google seems to have taken the [previously announced feature](https://support.google.com/a/answer/2494992) for Google Workspace and applied it to the Google Play iFrame. With only a little information, organisations can quickly and easily upload their private applications with very little effort:

- App name
- APK file

Once submitted, the app will be uploaded to managed Google Play against the Android Enterprise organisation ID in which the UEM is bound (has a bind). Apps uploaded in this way cannot be made public, and therefore are only useful for internal, non-public applications.

<div class="callout callout-warning">

### Note on package names

When uploading an app to Google Play, the package name **must be unique**. If your organisation is considering an initial internal release to then make available publicly at a later date (or even if not, but this is still a consideration) it must be noted that the package name `com.package.name` must be unique for each upload. 

A simple recommendation would be to append `.internal` to the package name when uploaded to the Managed Google Play iFrame, to make `com.myapp.internal`, which can be omitted for future public release - `com.myapp`.

</div>

It’ll take a little while for the app to upload and become available for use (though comparatively extremely quickly compared to a fully public Google Play rollout - minutes vs days), but once complete, the app can be imported into the UEM as with any other public or previously Google Play-uploaded private application.

## How it works

The following is demonstrated in VMware Workspace One UEM, but the process is identical in all UEMs supporting the iFrame (those that don’t cannot use this functionality).

Within **Apps & Books > Apps > Public**, add a new app. No name is required, despite it showing the asterisk\*:

![](https://cdn.bayton.org/uploads/2018/12/2018-12-27-17.07.23.gif) 

Once the iFrame opens, hover the mouse on the left-hand side to display the sidebar menu, and click **Private apps**. You may need to scroll down in the empty private apps page to locate the new icon, but once located click it:

![](https://cdn.bayton.org/uploads/2018/12/2018-12-27-17.08.01.gif)

You’re now creating a new private app. Add a name and upload the APK (or AAB - see below):

![](https://cdn.bayton.org/uploads/2018/12/2018-12-27-17.08.34.gif)

Once complete, click **Create**:

![](https://cdn.bayton.org/uploads/2018/12/2018-12-27-17.09.08.gif)

The private app will be available normally within a few minutes (note the **Not available yet** message under the app after creating it, this will vanish when it’s ready).

If you click the app, you’ll be taken into the details view for it, where you’ll be able to edit the name, upload new versions, and also see a link to Google Play to add more information:

![](https://cdn.bayton.org/uploads/2018/12/2018-12-27-17.29.55.gif)![](https://cdn.bayton.org/uploads/2018/12/image-4.png)

Some UEMs will import private apps automatically. Others will not. For the latter, simply add an app as you normally would, switch to the private apps tab in the iFrame, click the app in question and click **Select**. Alternatively if the UEM supports it, run an import from Play to get it.

## AAB support

Since March 2025, the managed Google Play iFrame supports [Android App Bundle](https://developer.android.com/guide/app-bundle) (AAB) uploads for private apps in addition to APKs. AABs offer optimised delivery and smaller download sizes per device, and are the format Google recommends for all Play distribution.

When uploading an AAB through the iFrame, a Google-generated signing key is used automatically. If you need to use your own signing key, upload via the Google Play Console instead (see below). Existing APK-based private apps can be migrated to AAB by uploading the signing key through the Play Console.

For more detail on AAB support in managed Google Play, see [AAB support for private apps in the managed Google Play iFrame](/blog/2025/03/dabbling-with-aab-support-managed-google-play/).

## The Google Play Console may make more sense

There's a significant drawback with leveraging the iFrame: Applications are bound to your enterprise and may become inaccessible if the bind is deleted. There are options for migration, but this is cumbersome.

If your organisation already uses the Google Play Console for application distribution, applications can be made private under **Setup** > **Advanced Settings** > **Managed Google Play**, or via the Publishing API. This allows organisations to centrally manage all public and private applications under one account, and providing access to one or one hundred enterprises (organisation IDs) from the Play Console is a piece of cake. 

Here's an overview of the alternative approaches and when to leverage them:

### Google Play Console (private)

Publishing through the [Google Play Console](https://play.google.com/console) with the app set to private distribution offers considerably more control. You'll need a Google developer account ($25 one-off fee), but in return the app is managed centrally and independently of any specific EMM bind.

Private apps in the Play Console can be shared with multiple organisation IDs the same way as iFrame-uploaded apps. This is particularly useful for:

- **Cross-EMM deployment**: If you manage devices across more than one EMM solution, the same private app can be made available to all of them without re-uploading.
- **ISVs and developers**: If you're distributing an app to multiple customers privately - say, a bespoke line-of-business application or an agent your customers deploy to their fleets - Play Console private distribution lets you do this without tying the app to any one customer's MDM.
- **Future-proofing**: Because the app lives in your developer account rather than an enterprise bind, it survives MDM migrations entirely. Switch EMMs, re-bind your organisation, and the app is still there waiting to be assigned.

You also get the full Play Console feature set: release management, staged rollouts, pre-launch reports, Android vitals, and flexible track management.

### Google Play Console (public)

Standard public distribution through Google Play. The app goes through the full review process and is discoverable by anyone on the Play Store.

This is the right approach when the app genuinely needs broad reach - whether that's a customer-facing application, a utility you want available to any organisation, or an open-source tool. Public apps can still be assigned and managed through managed Google Play just like private ones; the difference is simply visibility.

### Direct APK installation

One option lesser-covered that still holds relevance today: [pushing APK files directly to devices](/blog/2025/08/amapi-apk-deployment/) without going through managed Google Play at all.

This is particularly useful in scenarios where Play-based distribution isn't practical:

- **Air-gapped environments**: Devices without reliable internet access or those operating in restricted networks where managed Google Play can't be reached.
- **Apps that can't be published to Play**: Whether due to compliance constraints, technical limitations, or policies that prevent uploading to Google's infrastructure.
- **Development and testing**: Rapid iteration where the overhead of publishing to Play - even as a private app - slows things down unnecessarily.

The trade-off is that you lose the benefits of Play's distribution infrastructure. There are no delta updates, no Play Protect scanning at the distribution layer, and no staged rollouts (unless the EMM supports a similar approach). Your EMM handles the heavy lifting instead, which means the experience depends entirely on how well your EMM implements it.

For more detail, see [AMAPI finally supports direct APK installation, this is how it works](/blog/2025/08/amapi-apk-deployment/) and the [FAQ on direct APK installation](/android/android-enterprise-faq/amapi-direct-apk-installation/). Custom DPCs have had this functionality for years, find your vendor documentation for details on that.

## Considerations when changing MDMs

One of the most common gotchas with private app distribution is what happens when you migrate between EMM platforms.

### iFrame apps don't automatically travel

If your private apps were uploaded through the iFrame, they're bound to the enterprise ID that was active at the time. When you set up a new EMM and create a new managed Google Play bind, those apps won't carry over by default. You'll need to either re-upload them through the new EMM's iFrame, and they'll get new package names on the backend - effectively becoming different apps as far as managed Google Play is concerned - or apply to transfer them to a new developer account, a process that is often slow and without guarantees.

### Play Console apps are portable

Apps published through the Google Play Console - whether private or public - aren't affected by EMM migrations at all. They live in your developer account. When you set up a new EMM, you simply add the new organisation ID to the app's distribution settings and it's available immediately. No re-uploading, no disruption to devices already running the app.

### Planning ahead

If there's any chance you'll change EMM platforms in the future - and most organisations do eventually - it's worth publishing through the Play Console from the start, even if the iFrame feels easier today. The $25 developer fee is a one-off cost, and the portability it provides can save significant effort down the line.

For apps already deployed via the iFrame, consider republishing them through the Play Console before initiating any migration, or initiating a proactive transfer of ownership. This gives you a clean transition path and ensures devices continue to receive updates throughout the process.

## Conclusion

An improvement to the process of uploading private apps to Google Play has been long-overdue, but definitely worth the wait for them to get it right.

Uploading private apps is now a 2 step process, free to use and ensures no mistakes can be made when compared to the old, convoluted process. That said, for organisations happy to use the Google Play Console for app management, the options to do so are still there and can be leveraged, so it’s a win-win with this implementation.

As it’s via the iFrame, the obvious prerequisite is your UEM must support this (and if they don’t, be sure to make your request heard), however beyond that the feature is ready to be used!

For more information on this feature with your particular UEM platform, please reach out to your UEM vendor directly.