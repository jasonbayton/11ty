---
 title: "What's new (so far) for enterprise in Android 16"
 date: '2025-01-30'
 status: publish
 author: 'Jason Bayton'
 excerpt: "Well ahead of the typical annual schedule, here's what's new (so far) in Android 16 for enterprise."
 type: post
 tags:
     - Enterprise
---

A little earlier in the year, Android 16 beta 1 has just landed! With the first beta available, it's time to take a look at what's new, so far, in Android 16 "Baklava".

This is, as last year, a non-definitive and unconfirmed list of changes. Like the work profile changes in Android 14 things can change at any point and without warning. 

Here we go!

## No bump to minimum SDK version for installation of apps

The first beta does _not_ include a change to minimum SDK for app installation. Will it come later? We shall see. 

For context, every year now since 14 the minimum version an application must target has increased. In Android 15 it was 24, in 14 it was 23.. 

If you're interested in what "targeting" is, it looks like this within an application's configuration:

```kotlin
defaultConfig {
    applicationId = "org.bayton.example"
    minSdk = 24
    targetSdk = 23
    versionCode = 1
    versionName = "1.0"
}
```

Minimum SDK is the lowest version of Android an application will support, this typically changes when new features introduced could cause compatibility issues. It could also change when a developer no longer wishes to support an older version of Android. In either case the application will no longer be available for installation from Google Play on an affected device, and will error when sideloaded.

With the shift in timing for this release it's not clear if this'll be mandated so soon after the bump to 24 in 15, or if that'll come in a quarterly release at a later point. Currently 16 follows 15: only apps that target Android 7.0 - API level 24 - or later will be permitted. 

```bash
jason@MBP adb install app-release.apk
Performing Streamed Install
adb: failed to install app-release.apk: Failure [INSTALL_FAILED_DEPRECATED_SDK_VERSION: App package must target at least SDK version 24, but found 23]
```

To reiterate my sentiment from last year on this topic: 

> As ever, we're talking about applications targeting a version of Android 10+ years old. While some organisations with line-of-business apps that haven't seen an update in half a decade may balk at the idea of getting their applications updated or rewritten, the justification behind this limitation is solid - security. Where apps targeting <6.0 were able to abuse the old permissioning system (pre-runtime!), apps targeting 7.0 are still able to abuse device administrator and similar APIs. This isn't something you want potentially leveraged directly or indirectly on your managed estate.

# App functions control

Not _too_ much research has been done about this feature arriving in 16, but from what I've [found](https://developer.android.com/reference/android/app/appfunctions/AppFunctionManager), this looks like a new way of allowing applications to interact with one another through the publishing of "functions" an app can perform. 

Google's example here suggests an assistant app can search on-device for applications with a known function for creating a note, which replaces a slightly more convoluted approach app developers have to take today:

> An assistant app is trying to fulfill the user request "Save XYZ into my note". The assistant app should first list all available app functions as AppFunctionStaticMetadata documents from AppSearch. Then, it should identify an app function that implements the CreateNote schema. Finally, the assistant app can invoke executeAppFunction(ExecuteAppFunctionRequest, Executor, CancellationSignal, OutcomeReceiver) with the functionIdentifier of the chosen function.

This _feels_, and not just because of the example used, like it'll make the lives of Gemini, ChatGPT, and many other assistant application developers far easier. What I _don't_ get from the example offered is how to target apps. I could have Keep, Obsidian, and several other apps offering a function to create a note. I'm sure this will be explained in due course though (if it isn't already and I just missed it).

For enterprise, Google has added a few restrictions on app functions; they can currently be disabled outright, and disabled cross-profile. I'm hopeful we'll see this ecpand to follow Credential Manager and Widget APIs that allow a block with package exclusions for greater control. We'll see.

## Disallow NFC radio

Originally found in the Android 15 documentation, this one was referenced in the UserManager APIs, but never ultimately landed in 15. 

> As it says on the tin. If you're thinking _"Don't we already have an API for NFC?"_ Yes we do, but that's to control the beaming of data between devices. This is a full on radio disable and will probably live under `DeviceRadioState` in AMAPI at some point later.

As of this release it's now officially showing up as a Baklava feature.

## Disallow Thread Network

Here's another previously-referenced feature to show up confirmed for Baklava.

This is related to comms with [thread devices](https://en.wikipedia.org/wiki/Thread_(network_protocol)). Again, it's a cut-and-dry, simple restriction. More details on its use will come in time.

## Automatic time & automatic time zone policies

New in 16 as of (around) beta 3 are two new policies, automatic time and automatic time zone.

Both of these APIs have existed since Android 11 with [`setAutoTimeEnabled`](https://developer.android.com/reference/android/app/admin/DevicePolicyManager#setAutoTimeEnabled(android.content.ComponentName,%20boolean)) and [`setAutoTimeZoneEnabled`](https://developer.android.com/reference/android/app/admin/DevicePolicyManager#setAutoTimeZoneEnabled(android.content.ComponentName,%20boolean)) respectively, and even prior to 11 there were APIs that influenced time and time zone settings.

There's currently no justification documented for revamping these _again_, and I don't want to speculate, but as and when more information is shared I will update here.

## Improvements to provisioning

For years now Android has bloated out the provisioning flow with screen after screen of additional prompts, messages, and delays. Admins want to initiate provisioning and just have it provision, and the longer that takes the more frustrating it becomes to potentially have to do this; whether that's end-users getting their devices, or employees in staging environments doing 5, 50, 500 devices at a time - every minute counts.

In 16 Google have taken steps to improve this, and, well, the proof is in the pudding - 

https://www.youtube.com/watch?v=i_73MhGGsDc

In my limited testing on two generations of Pixel devices, I noted:

- Fewer interactions needed, so if you lose focus and do something else while the device is provisioning, it's less likely to be stuck on a screen waiting for a button press.
- Faster provisioning times, for work profiles on company-owned devices at least. Fully managed was more or less the same amount of time, but either way at about 2 minutes it's not terrible.

This is amazing to see, though as I mentioned on [LinkedIn](https://www.linkedin.com/posts/jasonbayton_androidenterprise-activity-7326566273050451969-eABI?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAG2naoB4JYfpSbZlhfEBgsmJT5fgSUKD6g), I'd hope OEM setup screens are targeted next. They took up a majority of the final stages of setup in the video above.

## That's not all folks!

This is extremely short and sweet given how early in the process we are for 16. Expect several more betas with several more changes. Check back here again soon!