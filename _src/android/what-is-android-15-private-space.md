---
title: 'What is Private Space in Android 15, and how can organisations manage it?'
published: '2024-11-10'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - General
eleventyNavigation:
  order: 4000
layout: base.njk
---
Private Space was introduced in Android 15 to offer a new, isolated profile type for devices permitted for personal use. This profile allows end-users to create a private space for applications that users may wish to secure behind additional authentication, hide from out of sight of the main (parent) profile, or simply associate with a different primary Google account from that used within the parent profile.

## What is the Private Space?

Android's Private Space builds upon the same underlying stack as the work profile, and so a lot of how Private Space works and identifies can be understood by reading up on [the work profile](/android/what-is-android-work-profile).

In short, and to echo the themes in the above link, think of Private Space as a work profile for non-enterprise use under the control of an end-user. It is one additional container on Android 15+ devices.

It's not a new concept; Samsung's Secure Folder, Huawei's feature by the same name (PrivateSpace), OnePlus' Hidden Space, and Xiaomi's Second Space, among others, have offered varying equivalents with greater or fewer features for a long time. This is Google's unifying AOSP implementation of the idea.

Google focuses heavily on the privacy aspect of separating apps and data, encouraging users to create a new Google account as part of the Private Space setup, and creating a unique password to access the space (though this is optional, the device password can be optionally used for Private Space). It then allows for the installation of applications via a separate version of the Play Store from that of the parent or work profiles, and provides additional settings for automatically locking the Private Space after a period of time/on device lock, as well as hiding the Space by default.

To offer a little deeper detail, the Private Space runs as its own user identity on-device:

`android.os.usertype.profile.PRIVATE`

It identifies on devices through ADB akin to:

`UserInfo{11:Private space:1090} serialNo=11 isPrimary=false parentId=0`

Per a standard dumpsys:

```bash
jasonbayton@MacBookPro % adb -d shell dumpsys user | grep -A 3 "Private space"
  UserInfo{11:Private space:1090} serialNo=11 isPrimary=false parentId=0
    Type: android.os.usertype.profile.PRIVATE
    Flags: 4240 (INITIALIZED|PROFILE|QUIET_MODE)
    State: -1
```

This closely aligns with the work profile states, showing `-1` when _disabled_, and `RUNNING_UNLOCKED` when _unlocked_.

## Private Space requirements

From [Google](https://support.google.com/android/answer/15341885?hl=en-GB):

> You can use private space when:
>
> Your device:
> - Is running on Android 15 and up.
> - Has more than 6 GB of RAM.
> - Isn't a [fully] managed device.
> - There's no supervised account that's signed in on the main space.
>
> You can't use private space when:
>
> - It is disabled by the device manufacturer or Enterprise admin.
> - It is within a secondary user.
> - Your device has more than four users or profiles.

## Why would you use it?

The intended purpose of Private Space is to hide applications from the parent profile, why someone may want to hide these apps is a personal consideration, but the examples may include banking apps - useful for an additional layer of authentication, dating or medical apps - ideally hidden should prying eyes land on the device, and so on.

Obviously if you're a consultant or similar and have been dreaming of another work profile to allow more than one organisation's apps and data to be accessible from a single device, this is a great use case too, with a caveat.

## Why wouldn't you use it?

Given the intended use case and the expectation the Private Space will automatically lock by default (options are on each device lock, 5 mins after screen timeout, or on reboot), there's every possibility the Private Space will not be unlocked when it matters.

Naturally when it matters is subjective and personal, but to use the consultant use case as an example, when the Private Space locks:

- Apps aren't shown in recents 
- Notifications aren't shown
- Applications are stopped (no background sync, sensor access, etc)

This means those important work emails may be missed, and you'll be appearing offline in your chat apps. Unless you're proactive about monitoring these apps this use case can quickly become a burden.

That aside, there's another **very important caveat** with Private Space, and that is apps aren't actually entirely hidden.

[![Private Space and Package Search](https://cdn.bayton.org/uploads/2024/private_space_ps.png)](https://cdn.bayton.org/uploads/2024/private_space_ps.png)  
_Giant Private Space icons added in PACKAGE SEARCH for emphasis only_.

Google's official stance on this comes from Private Space settings:

> Anyone that connects your device to a computer or installs malicious apps on your device may be able to access your private space.

Unfortunately, this also includes simple package viewers, such as [PACKAGE SEARCH](/projects/package-search) screenshotted above; though they most certainly are not, generally, malicious apps, they can expose applications within the Space in the same way they can for the work profile, whether the Space is locked or unlocked.

Indeed, the apps you may be trying to hide aren't difficult to discover with the right apps installed, so careful consideration should be taken.

Finally, there's no backup & restore capability with Private Space, so if device transfer is important, and cloud backups are not feasible, Private Space may not be suitable for use.

## Private Space & enterprise

Private Space is only supported on personally-owned work profile, and company-owned work profile devices. Fully managed (and dedicated) deployments disable this feature with no ability to turn it on. 

(A case has been made [here](/blog/2024/10/actually-new-for-enterprise-android-15/#the-case-for-private-space-on-fully-managed-devices) to change this).

Private Space conforms to all of the device-wide policies applicable with work profile deployments, this includes such restrictions as preventing app installation from unknown sources, for example.

In company-owned work profile deployments (COPE) this also includes application policies; allow & block list policies that would apply to the parent profile, preventing unfettered access to Google Play, also apply within the Private Space. This prevents end-users circumventing enterprise policy by simply installing disallowed apps within the Private Space.

Finally, for company-owned work profile devices, the Private Space can be fully disabled to prevent its use entirely.

**Note**: Private space apps bypass any configured virtual private networks (VPN). For organisations that rely on traffic running through VPN - even on the personal/parent profile - take note of this limitation.

If you're uncertain of the ramifications of allowing Private Space for company-owned devices within your organisation, it's recommended to disable it in EMM policy ahead of Android 15's anticipated rollout. 

<div class="callout callout-orange">

This restriction is not yet available in [AMAPI](https://developers.google.com/android/management/reference/rest/v1/enterprises.policies), but customDPC EMMs may add support at any point. Reach out to your particular vendor for clarity.

</div>

## Private Space FAQs

These can be found under the [Android Enterprise FAQ](/android/android-enterprise-faq/#private-space).


