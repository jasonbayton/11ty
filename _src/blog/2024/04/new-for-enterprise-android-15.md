---
 title: "What's new (so far) for enterprise in Android 15"
 date: '2024-04-11'
 status: publish
 author: 'Jason Bayton'
 excerpt: "I've been sleuthing, check out some of the changes coming to Android 15 for enterprise."
 type: post
 tags:
     - Enterprise
---

<div class="callout callout-blue">
<div class="callout-heading"> Android 15 is live! </div>

Android 15 is now live, check out the [latest article](/blog/2024/10/actually-new-for-enterprise-android-15/) for what ultimately landed!

</div>

It's that time of year again. Android 15 is available in pre-release, and combined with some of the changes I've seen committed to the developer documentation, there are a few tasty treats for organisations to come in the next dessert (Vanilla Ice-cream to don't you know).

This is, as last year, a non-definitive and unconfirmed list of changes. Like the work profile changes in Android 14 things can change at any point and without warning. 

Here we go!

## A bump to minimum SDK version for installation of apps

As expected, the restriction on installing applications targeting very old versions of Android is getting a bump. In Android 15 it will no longer be possible to install apps targeting API level 23 - Android Marshmallow / 6.0 - or older. Only apps that target Android 7.0 - API level 24 - or later will be permitted. 

```bash
jason@MBP Downloads % adb install app-release.apk
Performing Streamed Install
adb: failed to install app-release.apk: Failure [INSTALL_FAILED_DEPRECATED_SDK_VERSION: App package must target at least SDK version 24, but found 23]
```

Just as last year, we're talking about applications targeting a version of Android 10+ years old. While some organisations with line-of-business apps that haven't seen an update in half a decade may balk at the idea of getting their applications updated or rewritten, the justification behind this limitation is solid - security. Where apps targeting <6.0 were able to abuse the old permissioning system (pre-runtime!), apps targeting 7.0 are still able to abuse device administrator and similar APIs. This isn't something you want potentially leveraged directly or indirectly on your managed estate.

## Content protection policy

~~This appears to offer control for the scanning of harmful applications on a device, perhaps allowing admins to explicitly prevent line of business APKs from being flagged up on end user devices as potentially harmful, unrecognised, or any other state that'd trigger a complaint to the admin helpdesk. It has been a point of contention for the dedicated ecosystem for some years, particularly as Play Protect has become more active and aggressive over the last few Android versions.~~

Unfortunately CPP appears related to a newer Phishing Protection service introduced with Google Play Protect, and will not give admins the ability to disable on-device scanning overall. This is covered [in a recent security blog](https://security.googleblog.com/2024/02/piloting-new-ways-to-protect-Android-users-from%20financial-fraud.html) from February.

I'm not sure it's something I'm personally going to be advocating for with customers for the most part unless it's actively causing issues, but it's _amazing_ to see Google catering to the dedicated space for a change after so much increased focus on features that promote privacy at the cost of control for dedicated estates.

Android 15 also introduces the permission `android.permission.MANAGE_DEVICE_POLICY_CONTENT_PROTECTION` for apps which are _not_ the device or profile owner to be able to interface with this API.

## Disallow NFC radio

As it says on the tin. If you're thinking _"Don't we already have an API for NFC?"_ Yes we do, but that's to control the beaming of data between devices. This is a full on radio disable and will probably live under `DeviceRadioState` in AMAPI at some point later.

## Disallow Thread Network

~~I'm assuming this is related to comms with [thread devices](https://en.wikipedia.org/wiki/Thread_(network_protocol)), no additional context has been provided, but you can assume what's coming.~~

Unfortunately it appears this was removed a few months after finding the API.

## Disallow SIM Globally

This sounds like it's ticking off a long-desired feature request to fully disable all cellular on a device, but again missing any additional context I don't want to jump to conclusions.

## Vital apps mandate for document previewer

~~I touched on this in a [recent doc](https://bayton.org/android/what-are-vital-apps/). The absence of a document preview application for managed devices has been quite a noisy complaint from organisations for many years, overshadowed only by missing camera &/ gallery applications. None of these apps have been mandated by Google for the fully managed/work profile user experience, and so the common trend is to see them simply not added.~~

~~In fact, when I was [building devices for enterprise](https://bayton.org/blog/2023/08/product-files-the-doordash-tablet/#the-android-journey), I spent a decent amount of time learning the intricacies of vital apps and considering the use cases of customers to determine what was vital to productivity. I'd always opt to deploy Files By Google as the "Downloads" application, as this killed two birds with one stone - file preview support & a file (download) manager. Any photos taken could then be viewed in this app.~~

~~But not all OEMs consider this, or really think about enterprise at all, and so it's nice to see Google identifying the gap and plugging it accordingly.. even if it took several years to do so.~~

It appears at some point ahead of release Google reversed their decision.

## A switch to feature flagging

This isn't super new information, as Google have been feature flagging already with Android 14, but Google are touting Android 15 as their line in the sand for introducing their new approach to development, _Trunk Stable_. Mishaal Rahman, the prolific Android code-sleuthing extraordinaire, goes into more detail on Trunk Stable and `aconfig` (the feature flag system), as well as many more (lesser enterprise) Android features in this video from the latest AOSP & AAOS meetup: 

https://www.youtube.com/watch?v=dLz6aIRC0hg&t=179s

The change is an interesting one, it comes across as there being more code out in the open to review, and the ability to potentially build Android flavours with feature flags enabled for early access to features not yet committed to a release, but equally seems that it'll be far harder to put a finger on timelines of _when_ features will actually land in builds; could it be the next dessert release? A QPR update? Who knows.

Furthermore, this adds _far_ more flexibility for the Android team, and I presume far less pressure on managing the development cycle for when things need to be pushed/pulled accordingly. Hiding work-in-progress code behind feature flags is probably considered a breath of fresh air for them 😁

## Platform signed permission management

When a vendor works with an OEM to get their application _platform singed_, the application is granted all system-level permissions available on the device. As you can imagine, that is an _unprecedented_ level of device access to data and services reserved normally for only the OEM system apps, and Google's preloaded suite of applications. 

In Android 15, Google are introducing system permission management, allowing OEMs to grant or deny permissions to signed applications that allows for the considerable down-scoping of access of a signed app to only the explicit permissions they require to function. This won't apply to system apps bundled with a set of permissions in the OEM system image, but should permissions change in a later system app update, these permissions would also be denied automatically unless allowlisted in the respective system configuration.

There's an additional config to allow platform-signed shared UIDs for non-system applications that have additionally previously required access to this.

There are new alerts in logging to determine the permissions applications are no longer retaining access to, which vendors should already start looking at today to avoid loss of functionality.

Knowing how many enterprise vendors lean on platform signature permissions today (basically most EMMs, several SaaS products, etc), this has the potential to cause headaches once 15 launches.

## Skip adding personal accounts during company owned work profile provisioning

From 15, Google allow organisation admins to set policies that skip the add-account flow during managed provisioning of a company owned work profile device. 

## Partial screen recording

If you're like me and record your screen _far too often_ to demonstrate anything from a device feature to a bug, user guides and more, you'll be pleased to hear the previously Pixel-only feature introduced in Android 14 is coming to the wider ecosystem with the 15 update. Now users can limit screen sharing to _just the app_ they want to show, and no longer fret on the possibility to showing something that may not be appropriate for the context. Huzzah!

## Screen recording detection

Continuing the theme of recording, this is not so much an enterprise feature in and of itself explicitly, but Android 15 will alert apps when the screen is being recorded, allowing them to hide contents. 

I can imagine this might be useful for enterprise applications across the board to bolster DLP (data loss prevention)

## App archiving

Another expansion of existing functionality, Android 15 introduces system-settings control over app archiving, previously only opt-in and managed by Google Play directly. 

https://www.youtube.com/watch?v=TENFSugd82g

Presumably this will succumb to the same restrictions as disabling or uninstalling apps we have in place today (that is, users won't be allowed to depending on policy set). In my testing so far, archiving is just disabled on managed devices, with the option greyed out even on `INSTALL_TYPE`s of `AVAILABLE` (`AVAILABLE` means the app is provided to users within managed Google Play, but not downloaded or installed, so the user has full control over whether they wish to install it or not).

## Backup job execution exception permission

Less enterprise-explicitly, and more of a general observation which may benefit enterprise app developers, Android 15 introduces the permission `android.permission.RUN_BACKUP_JOBS`, which:

> Gives applications with a **major use case** of backing-up or syncing content increased job execution allowance in order to complete the related work. The jobs must have a valid content URI trigger and network constraint set.
>
> This is a special access permission that can be revoked by the system or the user.
>
> Protection level: signature|privileged|appop

It's a special permission, and likely only one being leveraged by vendors with OEM partner relationships given the protection level, but all the same it's pretty cool to see Google direct some attention to the backup use case.

## Restrictions on device identifiers for personally owned devices

From Android 15, applications with the permission `android.permission.MANAGE_DEVICE_POLICY_CERTIFICATES` will be able to fetch `getEnrollmentSpecificId`, which is an enrolment-specific, unique device identifier that persists across re-enrolments when done so into the same deployment scenario (i.e fully managed or personally owned work profile), by the same vendor agent, into the same enterprise (organisation/bind).

It is an alternative to identifiers such as IMEI and serial number, which Google no longer grants access to for applications without the appropriate device or profile owner role, or `DELEGATION_CERT_INSTALL` via policy, and becomes the default and only option for fetching a unique device identifier for personally owned work profile devices in future.

To be clear - applications in a personally owned work profile deployment up to now with the delegated permission of `DELEGATION_CERT_INSTALL` have been able to fetch a device serial number with relative ease, something that defeats the entire purpose of restricting access to the identifiers, considered to be personally identifiable information, in the first place. That loophole is closing.

## Broader system update visibility

From 15, applications granted the permission `android.permission.MANAGE_DEVICE_POLICY_QUERY_SYSTEM_UPDATES` will be able to obtain information about a pending system update. This softens the current requirements that an application be a device or profile owner in order to fetch this information.

What this doesn't do, unfortunately, is offer more insight into what the available update is. Today we can see an update is available and whether or not it's a security update. This API _needs_ to be updated to show -

- build info, 
- size, 
- how long it's been available (not just when first detected), - SPL/Android version

All of this is offered either through GOTA, Google's OTA management server many OEMs are encouraged to leverage (some don't of course, consider e-FOTA from Samsung, or HMD's new FOTA platform), or the build fingerprint of the package itself.

## Check MTE status

Expanding on the options for getting and setting MTE policies in Android 14, in 15 it will now be possible to merely query the current state (evidently something that should have, but didn't, quite make it to the 14 release!)

## Control of parent profile screen settings in company owned work profile deployment scenarios

From Android 15, company owned work profile deployment scenarios (COPE) will see scope of policies expand a little to include screen settings:

- Screen off timeout (not to be confused with time to lock, which still supersedes this in terms of hierarchy)
- Screen brightness (the actual brightness or the screen)
- Screen brightness mode (manual or automatic)

This comes across as a quality-of-life (QoL) improvement, though I'd have liked to be a fly on the wall when the scenarios were defined to justify prioritising this.

## Control over Private Space

Android 15 introduces Private Space, the ability for users to allocate a selection of apps in a private, authenticated profile on the device. 

These applications are isolated - similar to a work profile - from the rest of the applications on the primary parent profile.

The way this is managed is nuanced, per Google: 

> The default value for an unmanaged user is false. For users with a device owner set, the default value is true and the device owner currently cannot change it to false. On organization-owned managed profile devices, the default value is false but the profile owner can change it to true via the parent profile to block creating of private profiles on the personal user.

So in other words private space is disabled for fully managed devices by default, and cannot be enabled. For work profile-enabled company owned devices, this _can_ be managed. 

In testing, my fully managed device _does_ indeed fail to create a private space, but doesn't indicate why - it simply fails.

## Disallow assist content

This restriction allows administrators to prevent privileged apps, such as Assistant, from receiving contextual device information. These include screenshots, package names, and more. Useful for admins wishing to reduce the sprawl of information access privileged apps can have. This is scope-specific, so on fully managed devices will apply device-wide, but on profile-enabled devices restricts only to the managed profile.

## Circle to search

Relatively straightforward, an enterprise API is being introduced to lock down circle to search - the most unnecessarily hyped up feature I've seen in a long time. This is a nice continuation of assist content above, limiting the amount of data being sent to Google services.

## Widget management is back?!

With Android 15, `setKeyguardDisabledFeatures` has been expanded with widget management to coincide with the re-introduction of lockscreen widgets for tablet devices. At this time it appears to only apply to widgets in managed profiles, with Google explicitly stating:

> the profile owner of an organization-owned managed profile can set `KEYGUARD_DISABLE_WIDGETS_ALL` which affects the parent user when called on the parent profile.

More testing is needed to determine why this isn't available for fully managed devices. 

To note for wider context, lock screen widgets were removed way back in 5.0 citing, if I remember correctly, low use. With the recent focus on tablets, and Apple adding their own, Google clearly figured they matter again!

## Deeper dedicated device experience management

With Better Together Enterprise, Google is introducing a new provisioning option for dedicated devices, in addition to `PERSONAL_USAGE_ALLOWED` and `PERSONAL_USAGE_DISALLOWED`, Google are introducing a third `allowPersonalUsage` AMAPI enrolment token configuration option of `DEDICATED_DEVICE`. 

Such distinguishing features between knowledge worker devices and the new dedicated devices flag include:

- Setup Wizard customisation
- Skipping/prevention of Google account setup
- Default restrictions within the Android experience

Managing dedicated devices, which have always been treated identically to any other consumer Android device on the market, has been a frustrating experience; devices an end user would never use shouldn't need to configure accounts, access Google Play, deal with all of the setup wizard interruptions around privacy callouts and more.. and now it looks like Google are finally doing something about it.

Unfortunately a few years too late for the almost 5 years I supported dedicated devices on a daily basis, but I look forward to future projects benefitting from these changes.

## Additional management roles

Something of a placeholder at the moment, because I don't _fully_ understand the implications (other than goading Googlers about the reintroduction of Device Admin where all apps have the ability to get Device Policy Manager API control rather than just the explicit device/profile owner as it has been up to Android 14 -- it's not that, for the record, but documentation is just _so_ light it's easy to draw those kinds of conclusions 😅).

Once the scope of wider DPM role holders is clear, I'll update this here.

## That's all folks!

15 is now live, check out the [latest article](/blog/2024/10/actually-new-for-enterprise-android-15/) for what ultimately landed!
