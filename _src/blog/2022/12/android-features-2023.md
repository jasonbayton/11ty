---
title: "What I'd like to see from Android Enterprise in 2023"
date: '2022-12-21'
status: publish
author: 'Jason Bayton'
excerpt: "Android's enterprise feature set was pretty light in 2022, which obviously means 2023 is going to be a good one. Here are some of the features I'd like to see across the AE ecosystem next year."
type: post
tags:
    - Enterprise
eleventyExcludeFromCollections: true
permalink: false
---
I last did [one of these](https://bayton.org/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/) in 2019, and very little has come to fruition from my previous list.. so it's obviously time to do one again!

It's been a pretty quiet year for enterprise features in Android; not to suggest what [was released](https://developer.android.com/work/versions/android-13) wasn't welcomed (Wi-Fi features in particular were long-overdue!), but compared to years prior there were no big-hitters that really stood out. 

I'm hoping 2023 is going to see a return of pace for the AE team, and although the Android 14 roadmap is pretty solidly laid out already, there's no harm in adding a few ideas into the mix for the wider services that run atop our favourite mobile OS (Play, AMAPI, etc)

## Granular app update management
Inspired by my mate [Matt](https://www.linkedin.com/in/matt-dermody), who on a regular basis points out the struggles with managing apps via Google Play over on the [Mobile Pros community](https://mobilepros.org), this is one I'm seeing lead to issues more frequently than ever as more orgs move to AE and a primarily-Play app management process.

Today's options for Google Play app update management include (for [AMAPI](https://developers.google.com/android/management/reference/rest/v1/enterprises.policies#AutoUpdateMode), per app):
- Default
- Postponed
- High priority
- Min version code 

Arguably if organisations struggle to keep up with application updates and the risk of breaking changes, you might suggest simply setting the particular app update policy to `Postpone` and expect the org to assign someone to test within the up to 90 days they have before policy reverts to `Default` (wherein applications update normally on a low priority). 

But what about breaking changes?

Sometimes apps have to change (at least [once a year](https://bayton.org/blog/2022/11/november-play-policy-changes/) in fact), and do so in a way that isn't compatible with the device or needs of an organisation. No amount of testing will lead to a resolution there; either orgs work with the developer directly to create a bespoke version, or they transition to a new solution for what they're trying to achieve. Both can take more than 90 days from start to solution, leading to potentially significant issues for a managed estate in the interim.

And what about the apps not defined by policy? 

A recent [example](https://www.linkedin.com/posts/jasonbayton_there-are-reports-that-google-play-services-activity-6999107906851749891-aTSm?utm_source=share&utm_medium=member_android) was an update to Google Play Services (22.44.16), which caused devices to reboot into recovery. 

Another was Webview (108) causing considerable go-slows until patched shortly after (as reported [here](https://discussions.soti.net/thread/uninstall-update-with-a-script) and [here](https://forums.ivanti.com/s/article/Velocity-Slow-Key-input-webview-got-automatically-upgraded)).

As more applications - system and public - are pushed from Google Play, organisations need more granular options for not only managing the known apps, but those included as system apps either from Google or the OEM.

Should organisations be expected to undertake regular system app audits, and roll out policies per manufacturer to manage this? Probably not, the overhead would be arguably worse than dealing with issues as they come.

Instead, more granular control over applications updated from Play are needed:
- The ability to freeze applications on a particular version code, since version code detection already exists for compliance, for an extended period of time. This cannot conceivably be forever for the sake of security, but longer than the current 90 days - perhaps 6 months or a year. Zebra's [DisallowApplicationUpgrade](https://techdocs.zebra.com/mx/appmgr/) is a comparable OEM implementation for this.
- App version rollback support. Play should offer organisations the ability roll back to n-1 for a period of time after an update for cases where updates cause issues, like a bad Webview update which has the ability to cripple an estate that relies heavily on webapps. Today this is reliant on developers pushing a new version code release to Play, and being held hostage to [extensive Play Policy delays](https://www.linkedin.com/posts/jasonbayton_the-google-play-approval-process-seems-to-activity-6998051452183011328-cXhE). Giving orgs the option to roll back a version, even if that meant uninstall & reinstall behind the scenes for devices, could prevent extended downtime.
- Global app update postponement, combined with verbose app reports highlighting versions installed vs available to give organisations more data to work with
- Special consideration for the DPC itself for update management, since a bad DPC update (they happen!) can cause considerable disruption to a managed estate.


## Ephemeral & multi-user support in AMAPI
Folks, it's been 4 years since this launched with 9.0, and I still can't define a shared-use use case with AMAPI. 

A feature hyped so well with the 9.0 release, and justifiably so, yet it's barely mentioned today. I believe I last brought it up in [2020](https://bayton.org/blog/2020/01/the-decade-that-redefined-android-in-the-enterprise/#:~:text=ephemeral%20user%20support) in my _Decade that redefined Android in the enterprise_ article, though it's been top of mind several times this year where customers have struggled to deploy a shared use case and AMAPI hasn't offered me the means to support them. 

Work-arounds have included leveraging app data wiping on a regular (or API-automated) basis, full regular resets, policy switching (like data wiping but more agressively) and a lot of generally sub-par accommodations for what is there, but not usable.

I understand many devices on the market may not be up to the task, considering multi-user support is heavy on device resources, but this can be clearly communicated and more can be done within GMS/CTS around the requirements for OEMs declaring multi-user support in an enterprise context than is done now. With feature flags declared, AMAPI can integrate support into compliance messaging for organisations and wonder about why it may not work well/at all can be communicated reasonably effortlessly. 

Please allow 2023 to be the year I can finally configure the shared use case, including app caching and proper log in/out support.

## Work & Personal SIM management (again)

Not a fortnight ago was I answering questions about SIM management for work profile deployments. The ability to assign individual SIMs in dual-SIM devices to work and personal profiles is a persistent feature request that's been in demand almost as long as work profile has existed; the fact it was in my list in 2019 already implies it was a common request among my customers and ecosystem circles. 

More features around SIM management, dedicated dialer and call management features between the profiles, not massively dissimilar to the features released in 13 for [NFC](https://blog.google/products/android-enterprise/android-13/#:~:text=All%20Android%2013%20devices%20can%20also%20now%20use%20Near%2Dfield%20communication%20(NFC)%20from%20work%20apps%20to%20enable%20use%20cases%20like%20digital%20access%20badges%20and%20tap%2Dto%2Dpay%20from%20work%20profile)

## More AMAPI scopes (companion app control)

## Make the Google Play approval process suck less

## WPoFMD
Just bring it back. 

It has a use. Name it something that sounds more privacy obliterating if desired, but give organisations the option to define managed devices with managed profiles, properly.

## Remember DPC migration?


## Chrome Custom Tabs (CCT) configs
Reasonably straight forward - CCT config is pretty non-existant today and offers users a means of engaging with Chrome in ways that would otherwise not be possible on a managed device. 

The only CCT config available today is a TOS skip, which is useful because that's an annoying popup, but organisations should have more control over the look and feel of CCT, and the options CCT presents to prevent unwanted tinkering by end users. 

It's fine and reasonable for the Chrome team to _want_ the CCT to look like a Chrome experience, but at the same time it should be possible to lock it down to prevent URL interaction. Hide the menu, prevent sharing, etc.

## More logging 

## App launch after enrolment 

## Native APIs
- Battery optimisation
- Accessibility
- ....

## AE across other Android flavours
- WearOS
- ...

## MAERGA!
Android Enterprise Recommended lost one of the greatest defining requirements of the recommendation when Google dropped the minimum update requirement. Add it back, and [insert a few other new requirements also]

## AMAPI feature parity with PlayEMM API

## Multi-work profile support 
It's a staple of these wishlists.
