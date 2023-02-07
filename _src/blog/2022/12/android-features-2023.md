---
title: "What I'd like to see from Android Enterprise in 2023"
date: '2022-12-30'
status: publish
author: 'Jason Bayton'
excerpt: "Android's enterprise feature set was pretty light in 2022, which obviously means 2023 is going to be a good one. Here are some of the features I'd like to see across the AE ecosystem next year."
type: post
tags:
    - Enterprise
---
I last did [one of these](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/) in 2019, and very little has come to fruition from my previous list.. so although most of that still applies, it's obviously time to do one again!

It's been a pretty quiet year for enterprise features in Android; not to suggest what [was released](https://developer.android.com/work/versions/android-13) wasn't welcomed (Wi-Fi features in particular were long-overdue!), but compared to years prior there were no big-hitters that really stood out. 

I'm hoping 2023 is going to see a return of pace for the AE team, and although the Android 14 roadmap is pretty solidly laid out already, there's no harm in adding a few ideas into the mix for the wider services that run atop our favourite mobile OS (Play, AMAPI, etc), and perhaps reiterating a couple at the same time.

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

## Granular system update management

For the last several years we've had pretty basic native system update management for Android - 

* Automatic: Updates and reboots a device as soon as an update is available
* Windowed: Updates and reboots a device during a set time window local to the Android device
* Postpone & Freeze: Options to temporarily prevent updates
* Ad-hoc, pushing update files direct to Android 10+ devices where the EMM supports it (AMAPI does not)

By comparison, OEM solutions such as [KNOX e-FOTA](https://docs.samsungknox.com/admin/efota-common/welcome.htm) have provided substantially more control not only of when the updates happen, but the ability to lock devices to a version, granular control over the conditions under which updates apply, and more.

Many of these controls do exist pretty universally with OEMs, as many of the settings e-FOTA offers customers (not all) can be typically applied through configurations on the OTA servers the OEMs manage themselves. Take GOTA (Google OTA) for example, a product provided to certified partner OEMs for OTA management; some of the configurations which can be applied include:

* Time limits on when to automatically download and install an update
* Options for Wi-Fi only, temporarily or indefinitely
* Mandatory updates during setup (some finesse to apply this to the enrolment flow would be needed)
* Environmental restrictions (region, carrier..)
* Device restrictions (IMEI ranges, storage required, build properties)
* ..and more

You could come to the conclusion that Samsung (and others) have simply productised their OEM OTA service, granting customers the ability to set these policies themselves, and then further built it out based on customer feedback. 

In the same vein, Google could take many of these configurations and implement them as on-device APIs for organisations to leverage through EMM, offering far more granular control over when and how updates go out, and the conditions under which updates apply.

I'm not going to be one to advocate for long-term prevention of updates; in contrast with some in the ecosystem I prefer to see more updates, more frequently, and for far longer in a device lifecycle in order to best protect devices and the organisations that use them, but I do believe more control, more flexibility, and more options for update management would greatly improve the perception of managing system updates with Android Enterprise.

More control is a good thing, and I say that knowing Google's [moves](/blog/2022/12/android-12-password-complexity-changes/) to [reduce it](/blog/2020/02/android-enterprise-in-11-google-reduces-visibility-and-control-with-cope-to-bolster-privacy/) under a veil of simplicity or privacy. 

It won't fix the frequency, or number, of updates that some devices receive, and particularly won't help with devices that have been on a shelf for a considerable amount of time in reducing the number of updates required to get them up to date, but making that process smoother, until we have a solution that permits generating builds tailored to devices to get updated in as-few-as-possible, is a nice middle ground.

## Ephemeral & multi-user support in AMAPI
Folks, it's been 4 years since this launched with 9.0, and I still can't define a shared-use use case with AMAPI. 

A feature hyped so well with the 9.0 release, and justifiably so, yet it's barely mentioned today. I believe I last brought it up in [2020](https://bayton.org/blog/2020/01/the-decade-that-redefined-android-in-the-enterprise/#:~:text=ephemeral%20user%20support) in my _Decade that redefined Android in the enterprise_ article, though it's been top of mind several times this year where customers have struggled to deploy a shared use case and AMAPI hasn't offered me the means to support them. 

Work-arounds have included leveraging app data wiping on a regular (manually or API-automated) basis, full regular resets, policy switching (like data wiping but more aggressively) and a lot of generally sub-par accommodations for what is there, but not usable.

I understand many devices on the market may not be up to the task, considering multi-user support is heavy on device resources, but this can be clearly communicated and more can be done within GMS/CTS around the requirements for OEMs declaring multi-user support in an enterprise context than is done now. With feature flags declared, AMAPI can integrate support into compliance messaging for organisations and wonder about why it may not work well/at all can be communicated reasonably effortlessly. 

Please allow 2023 to be the year I can finally configure the shared use case, including app caching and proper log in/out support.

## Work & Personal SIM management [(again)](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#Work-profile-SIM-management)

Not a fortnight ago was I answering questions about SIM management for work profile deployments. The ability to assign individual SIMs in dual-SIM devices to work and personal profiles is a persistent feature request that's been in demand almost as long as work profile has existed; the fact it was in my list in 2019 already implies it was a common request among my customers and ecosystem circles. 

More features around SIM management, dedicated dialer and call management features between the profiles, not massively dissimilar to the features released in 13 for [NFC](https://blog.google/products/android-enterprise/android-13/#:~:text=All%20Android%2013%20devices%20can%20also%20now%20use%20Near%2Dfield%20communication%20(NFC)%20from%20work%20apps%20to%20enable%20use%20cases%20like%20digital%20access%20badges%20and%20tap%2Dto%2Dpay%20from%20work%20profile) continue to be requested around the ecosystem, and this would be a lovely feature to have.

## More AMAPI scopes (companion app control)

The companion app is intended to be the bridge between the still-limited AMAPI feature set and what EMM vendors want to be able to do. It _could_ be a means for vendors to achieve feature parity with PlayEMM API vendors (AirWatch, MobileIron, etc) but unfortunately scopes remain few.

Above all else I'd like a scope to permit companion apps to invoke APIs on behalf of the Android Device Policy (DPC) so vendors could do things like add support for ephemeral/shared use next week if desired, but others I think would be useful in lieu of this include:

- Package management (handling APK installations)
- Full logging for debugging use cases (rather than limited logging currently offered with network & security)
- Update management (primarily for manual system updates)

Compared to PlayEMM vendors, AMAPI vendors remain still fully at the whim of what Google opts to support, and when. It makes competing with the legacy behemoths difficult.

## Make the Google Play approval process suck less

[Re-linking an above example](https://www.linkedin.com/posts/jasonbayton_the-google-play-approval-process-seems-to-activity-6998051452183011328-cXhE), but this is hardly unusual or isolated. The Google Play approval process is a nightmare; a black box of unknown duration, vague rejection messages, and overly aggressive policies unsympathetic to enterprise applications.

Yes, permanently private apps are spared most of the headache, but permanently private apps aren't always feasible. 

Many corporate apps, or apps used by organisations are public, and don't fit the use case or can't meet the requirements of being made permanently private. These might be popular productivity apps, the EMM DPC, internal apps used by both customers and employees, OEM system apps, and several other use cases I won't dive into.

When an urgent issue arises, be it a bad update or a time-critical patch needing to be applied, public apps can sit in verification limbo for days on end. Some examples of issues I wrote already above, but another recent one I dealt with was a typo in an EMM application that went out to customers and caused enrolments to fail. This was patched same-day, but was then subjected to an accessibility permission policy violation that previously wasn't an issue, and persisted across 10s of app iterations over a couple of weeks attempting to adhere to the vague wording of said policy. 

As Google embarks on #bettertogether and drives organisations back to identity-based Google account management across Android, Chrome, and their other products, it would be great to see the teams come together to offer a solution that eases some of the stricter policies and lengthy approval processes for validated organisations deploying public applications explicitly for enterprise. 

## Chrome Custom Tabs (CCT) configs
Reasonably straight forward - CCT config is pretty non-existent today and offers users a means of engaging with Chrome in ways that would otherwise not be possible on a managed device. 

The only CCT config available today is a TOS skip, which is useful because that's an annoying popup, but organisations should have more control over the look and feel of CCT, and the options CCT presents to prevent unwanted tinkering by end users. 

It's fine and reasonable for the Chrome team to _want_ the CCT to look like a Chrome experience, but at the same time it should be possible to lock it down to prevent URL interaction. Hide the menu, prevent sharing, etc.

## App launch after enrolment 
Pretty simple one, and could probably be handled via DPC scopes, but it's another one of those dedicated device use cases with managed apps that require launching at least once to do what they need to do.

## MAERGA!
Android Enterprise Recommended lost one of the greatest defining requirements of the recommendation when Google [dropped the minimum update commitment](/blog/2022/01/aer-dropped-the-3-year-update-mandate-with-android-11-where-are-we-now/). Today the [requirements list](https://www.android.com/enterprise/recommended/requirements/) for knowledge worker devices feels more like a checkbox exercise validating a proper GMS implementation of AE than anything else, though rugged requirements do at least still keep the bar a little off the floor.

AER has the potential to mean something again, and would benefit from a fresh injection of commitment from Google to properly hold OEMs accountable.
- Bring back minimum update requirements. In 2023 is less than 5 years of security updates and two letter upgrades even worth considering?
- Commit to better policing OEMs 
- Better communicate models/SKUs validated
- Lean on best practices/optional preferred implementations in GMS as requirements
- Cycle out older or irrelevant devices on a regular basis
- Permit ecosystem feedback directly into the programme for catching OEMs not maintaining AER adherence.

Going into 2023 I'd look to phase out/archive everything on the directory to date, and work towards building up a new list of devices against a much higher standard of AE support and product commitment. No device should remain on the list after end-of-life (or support) and arguably anything not launching the latest version of Android on an annual basis shouldn't remain on the list either. If Google is recommending hardware, it should be _worth it_.

## Multi-work profile support 
It's a staple of my wishlists, [more details here](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#Multiple-work-profile-support).

## What do you want to see?
With more time and reflection I'm sure I could come up with a few additional requests for Google to fulfil, what would you want to see Google bring to market for Android Enterprise in 2023? Share this post and @me with your comments.