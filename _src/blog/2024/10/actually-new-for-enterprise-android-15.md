---
 title: "Android 15 launched, here's an overview of enterprise features"
 date: '2024-10-17'
 status: publish
 author: 'Jason Bayton'
 excerpt: "Android 15 has launched! Here's what's actually new for enterprise in this release."
 type: post
 tags:
     - Enterprise
---
Android 15 [launched officially](https://blog.google/products/android/android-15/) for Pixel on October 15th. This was about a month and a half after the [release to AOSP](https://android-developers.googleblog.com/2024/09/android-15-is-released-to-aosp.html) on September 3rd. 

It has been a rather odd series of events this year; Pixel typically receives the latest and greatest version of Android in tandem with its release to AOSP, and the marketing and messaging wheels turn in unison for Android as a whole, but because the Pixel folks couldn't meet the AOSP deadline for 15 this year it also meant the AOSP drop was unusually quiet with most release marketing put on hold. 

Hopefully that doesn't become the norm.

I could have covered this post off for the most-part after the AOSP drop, I chose to wait it until Google released their marketing materials. AOSP/developer docs rarely tell the whole story of enterprise support in an Android release, and 15 has been no different; I'd covered pretty much everything I found for AOSP in [What's new (so far) for enterprise in Android 15](/blog/2024/04/new-for-enterprise-android-15/) and so it was the wider Google Play Services and undocumented functionality capabilities that were left to be covered.

The below aims to provide a comprehensive overview of enterprise features, so may skip some of the items mentioned in the blog from April. Feel free to jump back there (link above) for more general Android 15 features. Here we go!

## Enhancements to COPE/company owned work profiles

Google have been busy this year boosting the functionality of COPE, and it's a trend I'm here for. Still struggling with the loss of [work profiles on fully managed devices](/blog/2020/02/android-enterprise-in-11-google-reduces-visibility-and-control-with-cope-to-bolster-privacy/), every small bump in functionality that regains _some_ control over the personal profile of a **company owned device** is an utter treat.

What's new for COPE in Android 15?

### Skip adding personal accounts during company owned work profile provisioning

Google allow organisation admins to set provisioning-time configurations that skip the add-account flow during managed provisioning of a company owned work profile device. This is a small quality-of-life improvement that will shorten down the COPE provisioning time for scenarios where either users don't wish to immediately add a personal account and complete the full setup of their device, _or_ where devices are perhaps staged elsewhere and sent to users registered and ready to go. 

### Control of parent profile screen settings in company owned work profile deployment scenarios

For company owned devices running work profile, the following previously _fully managed-only_ restrictions can be applied to devices:

- Screen off timeout (not to be confused with time to lock, which still supersedes this in terms of hierarchy)
- Screen brightness (the actual brightness or the screen)
- Screen brightness mode (manual or automatic)

Google announced this under the guise of power management controls, I suppose that's really the only way to frame this. I'd like to have been a fly on the wall when they discussed the use cases. 

### Application defaults in the personal profile for company owned work profile devices

Extending further control of the personal side of the device for COPE deployments, Google is allowing organisations in Android 15 to set default applications for the dialer, messaging app, and browser.

To be absolutely clear, these defaults will be whatever the Android device ships with, so it wouldn't be possible to set Edge as a default in the personal profile across a managed estate. Rather, Samsung would default to Samsung Internet, Pixel to Chrome, etc. This avoids a potential privacy risk in allowing organisations to set _their_ preferred apps as the personal default, complete with whatever identifying information and usage data they may be able to extract from the personal profile and into corporate servers.

By implementing these defaults, organisations prevent an opposite scenario where a user may choose to use a non-recommended (or downright potentially harmful app) as their default in the personal profile, and open the device up to additional security risks.

Google state these must be initially configured at provisioning time, but do not indicate how. If being set retrospectively, as any existing device updating to Android 15 would need to, can be done through the use of allowlists: 

> The default messaging app can be set at any time. To enforce OEM defaults for dialer and browser after set up, this control must be combined with an app allowlist.

Again, quite light on details for execution.

_+++ @Google - do the app defaults here extend to the private space also? Is there more explicit direction for configuring these things?_

### Application allow and blocklist policies in the private space

When Google announced Private Space with 15, I wrongfully anticipated this to be a mostly non-enterprise feature that wouldn't coexist in the management space. After all, it comes across as the work profile for unmanaged devices, in a way (certainly the tech it's built on says this). 

But here we are! The multiple work profiles on one device Google said they'd never support 😁.

While it's blocked on fully managed devices (which would be a great use case for a reversed COPE, I'll touch on below), it's very much possible to create a private space in COPE and co-exist with the work profile. 

*Hang on*, you may be thinking, *doesn't that just mean users can add apps to a private space if they're not permitted to add them to their personal profile?*

As it turns out, no.

> Android 15 for business introduces the ability to apply a limited set of security restrictions to specific apps outside the Work Profile. Existing personal app allowlist or blocklist policies can be extended to the new private space feature. In the future, additional privacy preserving security configurations for core apps will be introduced and made backward compatible with Android 15.
>
> _[via](https://support.google.com/work/android/answer/15528640#zippy=%2Cprivate-space-for-personal-profile%2Cesim-management-for-managed-devices%2Csecurity-restrictions-for-apps-outside-the-work-profile-on-company-owned-devices%2Candroid-theft-protection%2Cenforce-the-default-app-selection-for-calls-messaging-and-web-browsing-when-setting-up-company-owned-devices%2Cscreen-brightness-timeout-controls-for-company-owned-personally-enabled-cope-devices%2Cniap-audit-logging-requirements:~:text=Android%2015%20for%20business%20introduces%20the,made%20backward%20compatible%20with%20Android%2015.)_

The policies applied for permitted or blocked apps in a COPE deployment scenario also apply to the private space. 

At least in _theory_. In practice I was not constrained by such limitations when I tested this at time of writing:

![gif of android screenshare](https://cdn.bayton.org/uploads/2024/2024-10-22_14.56.50.gif)

We can assume this may be resolved in the near future.

_+++ @Google case ID 00060181_

#### The case for private spaces on fully managed devices

It popped up in the [AE Customer Community](https://www.androidenterprise.community/t5/news-info/enhanced-employee-and-device-protection-with-android-15-for/bc-p/8824/highlight/true#M136) and I think it's worth further discussion:

> I quite like the prospect of reversing the existing COPE model to fully manage the device, but have an inaccessible profile (private space) for workers. Maximum control of the device with a lower-perceived, but potentially acceptable level of privacy for workers. As indicated for pool/shared devices where you auth, but can pop a few personal apps for break/other reasons the admins can ultimately remove at will.. I like it.

Private Space has obviously not been enabled on fully managed devices due to the privacy concerns, I would assume, previously associated with work profiles on fully managed devices. Furthermore, I would expect there are nuances within a fully managed and dedicated use cases (which are mostly shared under the Device Owner (DO) ownership model) that would render this feature incompatible and possibly cause problems. It's also likely a lot of work resurrecting deprecated approaches to cross-profile policies and such that would bring this much closer to pre-11 Android fully managed devices with work profiles,

.. but it could be disabled by default, as it is for fully managed devices, and in organisations that want to allow a reverse-COPE wherein personal apps and data live in a separately encrypted, isolated container with limited cross-profile oversight (personal usage policies would have to apply on fully managed only, _just_ for private space), it could work.

And it should, as it would further add the flexibility organisations want as the personally owned vs company owned debate rages on amongst admins.

## Security & privacy changes

With COPE aside, here are some security related changes introduced with Android 15:

### Migration of events from logcat to SecurityLog

From 15 we'll start seeing more information provided to [SecurityLog](https://developer.android.com/reference/android/app/admin/SecurityLog). For those who've debugged an Android device under management, unless you're working with the device directly, pulling & reviewing logcat can be a pain.

As SecurityLog, along with NetworkLog, are able to be fetched through the EMM, this offers a much simpler option and ongoing review of the respective logs.

The intention is to more closely align with NIAP requirements, and allow for quick review of administrative device changes.

In addition, Android adds an event for the [backup service being toggled](https://developer.android.com/reference/android/app/admin/SecurityLog#TAG_BACKUP_SERVICE_TOGGLED) by an admin which will also now be available for admins from 15 when pulling security logs.

### Improvements to Factory Reset Protection 

Though there are no enteprise-specific changes to factory reset protection, I believe it important to highlight some changes made to how it works within the context of an enterprise device, namely:

- Enabling OEM unlock in developer settings will no longer deactivate FRP
- Bypassing the setup wizard, which isn't uncommon for dedicated devices/OEMs, will no longer deactivate FRP.
- Adding accounts, passwords, and applications will no longer be possible while FRP is active

Going forward it will be evermore important to ensure both FRP, and enterprise FRP (wherein organisations set the allowlisted Google accounts), are properly maintained and processes correctly followed for resetting devices, if the EMM does not turn FRP off by default (hi, Omnissa..)

_+++ @Google I haven't been able to locate docs for this since ~ April, can I get this confirmed?_

### A bump to minimum SDK version for installation of apps

As expected, the restriction on installing applications targeting very old versions of Android is getting a bump. In Android 15 it will no longer be possible to install apps targeting API level 23 - Android Marshmallow / 6.0 - or older. Only apps that target Android 7.0 - API level 24 - or later will be permitted. 

```bash
jason@MBP Downloads % adb install app-release.apk
Performing Streamed Install
adb: failed to install app-release.apk: Failure [INSTALL_FAILED_DEPRECATED_SDK_VERSION: App package must target at least SDK version 24, but found 23]
```

Just as last year, we're talking about applications targeting a version of Android 10+ years old. While some organisations with line-of-business apps that haven't seen an update in half a decade may balk at the idea of getting their applications updated or rewritten, the justification behind this limitation is solid - security. Where apps targeting <6.0 were able to abuse the old permissioning system (pre-runtime!), apps targeting 7.0 are still able to abuse device administrator and similar APIs. This isn't something you want potentially leveraged directly or indirectly on your managed estate.

### Restrictions on device identifiers for personally owned devices

From Android 15, applications with the permission `android.permission.MANAGE_DEVICE_POLICY_CERTIFICATES` will be able to fetch `getEnrollmentSpecificId`, which is an enrolment-specific, unique device identifier that persists across re-enrolments when done so into the same deployment scenario (i.e fully managed or personally owned work profile), by the same vendor agent, into the same enterprise (organisation/bind).

It is an alternative to identifiers such as IMEI and serial number, which Google no longer grants access to for applications without the appropriate device or profile owner role, or `DELEGATION_CERT_INSTALL` via policy, and becomes the default and only option for fetching a unique device identifier for personally owned work profile devices in future.

To be clear - applications in a personally owned work profile deployment up to now with the delegated permission of `DELEGATION_CERT_INSTALL` have been able to fetch a device serial number with relative ease, something that defeats the entire purpose of restricting access to the identifiers, considered to be personally identifiable information, in the first place. That loophole is closing.

_+++ @Google I have a case open here - 00060119 - as I'm unable to retrieve delegated scopes on Android 15 in COPE with the below snippet. This works fine in 14, and fine in 15 as fully managed. There's an issue preventing this working within the work profile in 15._

```kotlin
val dpm = context.getSystemService(Context.DEVICE_POLICY_SERVICE) as DevicePolicyManager
val delegatedScopes = dpm.getDelegatedScopes(null, context.packageName)
```
_+++_

### Security exceptions for sensors-related permissions

From 15, device admins targeting API level 35, including DPCs and device admin role holders, will begin throwing security exceptions when attempting to set permissions for some sensors-specific permissions, including:

- Manifest.permission.ACCESS_FINE_LOCATION
- Manifest.permission.ACCESS_BACKGROUND_LOCATION
- Manifest.permission.ACCESS_COARSE_LOCATION
- Manifest.permission.CAMERA
- Manifest.permission.RECORD_AUDIO
- Manifest.permission.RECORD_BACKGROUND_AUDIO
- Manifest.permission.ACTIVITY_RECOGNITION
- Manifest.permission.BODY_SENSORS

The two scenarios where this is expected to happen is:

1. The calling agent is a profile owner, rather than a device owner (so work profile deployments, not fully managed)
2. The agent is a device owned on a fully managed device, but has EXTRA_PROVISIONING_GRANT_OPT_OUT set during the provisioning process. 

While this has been in place since Android 12, previously this would have silently failed. In future security exceptions will be triggered which should make it easier to debug. 

## New restrictions 

### Content protection policy

The content protection policy offers admin control of a new feature for real-time threat detection within the Google Play Protect arsenal of protections covered [in a prior security blog](https://security.googleblog.com/2024/02/piloting-new-ways-to-protect-Android-users-from%20financial-fraud.html) from February.

For Pixel devices, the toggle for this is in Settings > Security & privacy > More security & privacy > Scanning for deceptive apps. 

It is _buried deep_ in Settings.

When the configuration is unspecified, currently the respective toggle is off for fully managed devices. It looks like by default managed devices have it off out of the box. Switching to `enforced` then enables the setting.

For EMM vendors, this is already present in AMAPI as `contentProtectionPolicy` under `AdvancedSecurityOverrides`.

Android 15 also introduces the permission `android.permission.MANAGE_DEVICE_POLICY_CONTENT_PROTECTION` for apps which are _not_ the device or profile owner to be able to interface with this API.

#### Google Play Protect app scanning changes

In a related note, in September 2024 Google made a considerable change that will placate any organisation dealing with sideloaded enterprise applications, including those installed via the EMM DPC (agent), internal services, or sideloaded in more traditional ways. These applications will no longer be sent to Google for scanning, and no longer prompt end users to take any action against them _unless they are known to Google to be potentially harmful_. More information [here](/blog/2024/09/play-protect-changes-2024/).

### Disallow NFC radio

As it says on the tin. If you're thinking _"Don't we already have an API for NFC?"_ Yes we do, but that's to control the beaming of data between devices. This is a full on radio disable and will probably live under `DeviceRadioState` in AMAPI at some point later.

This appears to be a natural progression from the earlier `DISALLOW_CHANGE_NEAR_FIELD_COMMUNICATION_RADIO` which prevents the turning on/off NFC in settings.

### Disallow Thread Network

At the time of writing, Google developer docs still don't have an entry for the Thread API, but reference it in the [UserManager docs](https://developer.android.com/reference/android/os/UserManager#DISALLOW_THREAD_NETWORK) as an unlinked entity. At some point the link to UserManager should go to the right place.

In the meantime, thankfully it appears the [source for CTS](https://android.googlesource.com/platform/cts/+/1257265206c59ed8e3802a8b7ece53fb890c80f9%5E1..1257265206c59ed8e3802a8b7ece53fb890c80f9/) contains a test for this API. From that it's somewhat clear what this API is intended for, and we no longer need to assume:

```java
// If the device doesn't support Thread then as long as the user restriction doesn't throw an
// exception when setting - we can assume it's fine
@RequireFeature("android.hardware.thread_network")
@RequiresFlagsEnabled(Flags.FLAG_THREAD_USER_RESTRICTION_ENABLED)
```

If that's too ambiguous, the CTS docs reference the hardware feature `android.hardware.thread_network`, which [additional](https://android.googlesource.com/platform/frameworks/native/+/510a1070e61a507151e29f3496db75cd7187015a%5E1..510a1070e61a507151e29f3496db75cd7187015a/) source [commits](https://android.googlesource.com/platform/frameworks/base.git/+/8801a720cde7e2770894fb77d0a48a0e85e35f53%5E1..8801a720cde7e2770894fb77d0a48a0e85e35f53/) tie directly to [Thread network](https://en.wikipedia.org/wiki/Thread_(network_protocol)) support.

It looks like it'll be a relatively straightforward boolean (on/off) restriction allowing managed devices to interface with thread network devices.

### eSIM management

#### Disallow SIM Globally

The API I found earlier in the year appears to be a subset of a larger eSIM management framework being introduced with Android 15. For completeness, as the earlier post was quite light, here's what **Disallow SIM Globally** actually means:

Available for both fully managed and company owned work profile devices, disallow SIM globally (`DISALLOW_SIM_GLOBALLY`) is an **eSIM** restriction to globally prevent the _download_ of eSIMs to a device. 

While I earlier assumed it may have been globally disabling cellular, hopefully killing the radio and hiding the respective settings, status bar messaging, and so forth (useful particularly for lower-cost tablets that often come with cellular) this is **not** the case.

In my testing, with the restriction enabled I was able to go into settings, begin eSIM setup with the scan of a QR code, and only _then_ did it prevent setup with a generic error message that suggests there's a problem with the eSIM rather than a policy restriction in place:

[![disable sim globally](https://cdn.bayton.org/uploads/2024/disable_sim_globally.png)](https://cdn.bayton.org/uploads/2024/disable_sim_globally.png)

The experience could be improved dramatically here just with the addition of management UI, and preferably earlier in the process of adding an eSIM, also.

#### Expanding 9.0 APIs for eSIM managemnet

More broadly Android 15 introduces eSIM configuration capabilities via EMM. Based on what I've been able to find, eSIM management is directly associated with eSIM subscription management introduced in Android 9.0, and has been expanded in 15 to allow remote configuration via EMM, or the appropriate permission:

> Starting from `Android Build.VERSION_CODES.VANILLA_ICE_CREAM`, if the caller has the `android.Manifest.permission#MANAGE_DEVICE_POLICY_MANAGED_SUBSCRIPTIONS` permission or is a profile owner or device owner, then the downloaded subscription will be managed by that caller. In case the caller is device owner or profile owner of an organization-owned device, `switchAfterDownload` can be set to true to automatically enable the subscription after download. If the caller is a profile owner on non organization owned device `switchAfterDownload` should be false otherwise the operation will fail with `EMBEDDED_SUBSCRIPTION_RESULT_ERROR`.

It would appear EMM vendors with either custom DPCs or via AMAPI will be able to lean into this API from 15 to add and remove EUICC subscriptions. Neat.

Personally owned device users **will be able to remove the configured eSIM**, though for company owned devices, the additional policy `DISALLOW_CONFIG_MOBILE_NETWORKS` can be set to ensure eSIMs aren't deleted.

### Control over Private Space

Android 15 introduces Private Space, the ability for users to allocate a selection of apps in a private, authenticated profile on the device. 

These applications are isolated - similar to a work profile - from the rest of the applications on the primary parent profile.

The way this is managed is nuanced, per Google: 

> The default value for an unmanaged user is false. For users with a device owner set, the default value is true and the device owner currently cannot change it to false. On organization-owned managed profile devices, the default value is false but the profile owner can change it to true via the parent profile to block creating of private profiles on the personal user.

So in other words private space is disabled for fully managed devices by default, and cannot be enabled. For work profile-enabled company owned devices, this _can_ be managed. 

In testing, my fully managed device _does_ indeed fail to create a private space, but doesn't indicate why - it simply fails:

[![set up private space](https://cdn.bayton.org/uploads/2024/set_up_private_space.png)](https://cdn.bayton.org/uploads/2024/set_up_private_space.png)

Again, an interjection of the DPC to say this isn't possible would tremendously improve the UX.

#### Expansion of general management policies into the Private Space

If you're still worried the Private Space may become a wild-west of hidden app and user activity, fret not! Policies that have previously applied device-wide, like the installation of apps from unknown sources, are _still device-wide_. The Private Space adopts these restrictions with no additional management overhead.

### Disallow assist content

This restriction allows administrators to prevent privileged apps, such as Assistant, from receiving contextual device information. These include screenshots, package names, and more. Useful for admins wishing to reduce the sprawl of information access privileged apps can have. This is scope-specific, so on fully managed devices will apply device-wide, but on profile-enabled devices restricts only to the managed profile.

### Circle to search

Relatively straightforward, an enterprise API is being introduced to lock down circle to search - the most unnecessarily hyped up feature I've seen in a long time. This is a nice continuation of assist content above, limiting the amount of data being sent to Google services.

### Widget management is back?!

With Android 15, `setKeyguardDisabledFeatures` has been expanded with widget management to coincide with the re-introduction of lockscreen widgets for tablet devices. At this time it appears to only apply to widgets in managed profiles, with Google explicitly stating:

> ..the profile owner of an organization-owned managed profile can set `KEYGUARD_DISABLE_WIDGETS_ALL` which affects the parent user when called on the parent profile.

More testing is needed to determine why this isn't available for fully managed devices. 

To note for wider context, lock screen widgets were removed way back in 5.0 citing, if I remember correctly, low use. With the recent focus on tablets, and Apple adding their own, Google clearly figured they matter again!

## Other changes and requirements for 15

### Platform signed permission management

When a vendor works with an OEM to get their application _platform singed_, the application is granted all system-level permissions available on the device. As you can imagine, that is an _unprecedented_ level of device access to data and services reserved normally for only the OEM system apps, and Google's preloaded suite of applications. 

In Android 15, Google are introducing system permission management, allowing OEMs to grant or deny permissions to signed applications that allows for the considerable down-scoping of access of a signed app to only the explicit permissions they require to function. This won't apply to system apps bundled with a set of permissions in the OEM system image, but should permissions change in a later system app update, these permissions would also be denied automatically unless allowlisted in the respective system configuration.

There's an additional config to allow platform-signed shared UIDs for non-system applications that have additionally previously required access to this.

There are new alerts in logging to determine the permissions applications are no longer retaining access to, which vendors should already start looking at today to avoid loss of functionality.

Knowing how many enterprise vendors lean on platform signature permissions today (basically most EMMs, several SaaS products, etc), this has the potential to cause headaches once 15 launches.

### Screen recording improvements

If you're like me and record your screen _far too often_ to demonstrate anything from a device feature to a bug, user guides and more, you'll be pleased to hear the previously Pixel-only feature introduced in Android 14 is coming to the wider ecosystem with the 15 update. Now users can limit screen sharing to _just the app_ they want to show, and no longer fret on the possibility to showing something that may not be appropriate for the context. 

Continuing the theme of recording, this is not so much an enterprise feature in and of itself explicitly, but Android 15 will alert apps when the screen is being recorded, allowing them to hide contents. 

I can imagine this might be useful for enterprise applications across the board to bolster DLP (data loss prevention), and based on murmurings in Tech News, Google is testing restrictions in Chrome to prevent sensitive information from being recorded (addresses, card details, passwords, etc). 

## Broader system update visibility

From 15, applications granted the permission `android.permission.MANAGE_DEVICE_POLICY_QUERY_SYSTEM_UPDATES` will be able to obtain information about a pending system update. This softens the current requirements that an application be a device or profile owner in order to fetch this information.

What this doesn't do, unfortunately, is offer more insight into what the available update is. Today we can see an update is available and whether or not it's a security update. This API _needs_ to be updated to show -

- build info, 
- size, 
- how long it's been available (not just when first detected), - SPL/Android version

All of this is offered either through GOTA, Google's OTA management server many OEMs are encouraged to leverage (some don't of course, consider e-FOTA from Samsung, or HMD's new FOTA platform), or the build fingerprint of the package itself.

## Check MTE status

Expanding on the options for getting and setting MTE policies in Android 14, in 15 it will now be possible to merely query the current state (evidently something that should have, but didn't, quite make it to the 14 release!)

## Deeper dedicated device experience management

With Better Together Enterprise, Google is introducing a new provisioning option for dedicated devices, in addition to `PERSONAL_USAGE_ALLOWED` and `PERSONAL_USAGE_DISALLOWED`, Google are introducing a third `allowPersonalUsage` AMAPI enrolment token configuration option of `DEDICATED_DEVICE`. 

Such distinguishing features between knowledge worker devices and the new dedicated devices flag include:

- Setup Wizard customisation
- Skipping/prevention of Google account setup
- Default restrictions within the Android experience

Managing dedicated devices, which have always been treated identically to any other consumer Android device on the market, has been a frustrating experience; devices an end user would never use shouldn't need to configure accounts, access Google Play, deal with all of the setup wizard interruptions around privacy callouts and more.. and now it looks like Google are finally doing something about it.

Unfortunately a few years too late for the almost 5 years I supported dedicated devices on a daily basis, but I look forward to future projects benefitting from these changes.

## Did I miss anything?

If I did, [you know where to find me](https://linkedin.com/in/jasonbayton).
