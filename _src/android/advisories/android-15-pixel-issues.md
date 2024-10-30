---
 title: "Known issues with Pixel 9 and Android 15 for enterprise"
 published: '2024-10-24'
 status: publish
 permalink: false
 author: 'Jason Bayton'
 excerpt: "A few issues you should be aware of if deploying Pixel 9 to your estate."
 type: documentation
 layout: base.njk
 tags:
     - Advisories
---
Android 15 [launched officially](https://blog.google/products/android/android-15/) for Pixel on October 15th. 

I've been running through standard enterprise validation, ensuring to include the new Private Space feature given its cohabitation with enterprise functionality, and unlike Pixels of yonder, the enterprise functionality this year has led to more than one eyebrow raise.

If you're deploying Pixel 9 with Android 15 to your estate, here are some (non-exhaustive) issues to be aware of:

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">This is Pixel 9 only</div>

Unless otherwise stated, the issues described below have only been replicated on my Pixel 9 XL Pro. Other devices running Android 15 may be fine.

Undertake your own testing accordingly, and feel free to [get in touch](mailto:jason@bayton.org) with feedback!

</div>

## Company owned managed profile and vital apps

During the provisioning and setup flow, users are deferred to the setup wizard to add a personal account and set up their device normally. After the [PAI](https://bayton.org/blog/2024/03/play-auto-install/) screen offering Googles suite of applications, setup completes and apps begin installing & updating.

On update, both **Pixel Studio** and **Pixel Screenshots** find their way into the managed work profile. This is despite neither app being in the PAI list, they appear to update shortly after setup completes, and the act of updating is what triggers their arrival within the work profile.

Via policy the following also has no effect on the appearance of these apps within the profile:

```json
{
    "packageName": "com.google.android.apps.pixel.agent",
    "installType": "BLOCKED"
},
{
    "packageName": "com.google.android.apps.pixel.creativeassistant",
    "installType": "BLOCKED"
}
```

It's unusual to see apps pop into the profile after provisioning, which suggests to me the [vital apps config](/android/what-are-vital-apps/) isn't to blame directly, but nonetheless, a configuration _somewhere_ is leading to this:

https://www.youtube.com/watch?v=vmrL7WI2OmQ

For further clarity, updating these apps manually from Google Play after setup, if automatic setup is skipped/stopped for example, will result in the same behaviour. This confirms to me, it is the act of pushing a new version of the app to devices, as until that happens these apps remain where they belong, in the parent profile.

### Workaround

1. These apps can be disabled from the work profile with a long-press (from app drawer) > App info > Disable 
2. Update policies targeting these apps may help, though that is untested.

## Delegated scopes undetectable in the work profile

One affecting me directly as I spend more time adding delegated admin features to [PACKAGE SEARCH](/projects/package-search) and [MANAGED INFO](/projects/managed-info), it's seemingly not possible to fetch managed scopes from within the work profile in 15. I've tested this again in the company owned work profile and deployment scenario. When calling:

```kotlin
val dpm = context.getSystemService(Context.DEVICE_POLICY_SERVICE) as DevicePolicyManager
val delegatedScopes = dpm.getDelegatedScopes(null, context.packageName)
```

The expected response if a scope has been delegated is `[CERT_INSTALL]` (for example). What returns instead is `[]`. 

In testing on a Pixel 6 Pro running Android 14, I faced no issue from within the work profile. Likewise on 15 this works perfectly fine from the parent profile, in a fully managed deployment scenario. It also works fine on the Pixel 6 Pro when updated to 15, so it's seemingly isolated _only_ to the Pixel 9 XL Pro I'm testing with. Below are two pixels, one on 14 and one on 15 leveraging the exact same policy:

![image showing device identifier](https://cdn.bayton.org/uploads/2024/missing_scope.png)

### Workaround

Nothing I'm aware of just yet. 

This has been escalated to Android engineering,

## Application of personal Play Store policies to the Private Space 

**As of Monday October 28, this has been fixed with a Google Play update**

~~Another COPE issue, the documentation suggests `personalUsagePolicies` for `personalPlayStoreMode` that define application availability within the parent profile of a company owned work profile device are also applicable to the Play Store within the Private Space.~~

~~In my test case, I have applied personal use policies to my Pixel 9:~~

```json
"personalUsagePolicies": {
    "personalPlayStoreMode": "ALLOWLIST",
    "personalApplications": [
        {
            "packageName": "org.bayton.packagesearch",
            "installType": "AVAILABLE"
        }
    ]
},
```

~~Unfortunately the policy doesn't apply. [This GIF](https://cdn.bayton.org/uploads/2024/2024-10-24_13.50.52.gif) shows the correct application in the personal Play Store, but the Private Space Play Store does not respect the policy applied.~~

~~### Workaround~~

~~Don't permit Private Space until this is fixed, if this is a concern. This is with Android Engineering, and a Google Play update is expected to resolve this in due course.~~

## Disappearance of distributed applications when personal Play Store mode set

After enrolment - once more in the company owned, work profile deployment scenario - setting a personal Play Store policy leads to the removal of `PREINSTALLED` applications within the work profile, preventing their reinstallation. Here's an overview on a newly-enrolled device:

https://www.youtube.com/watch?v=TDFH6JC6WOQ

In my testing, the application _may_ return at a later point, but it risks disappearance once more when the policy updates.

The replication steps, if the video isn't your cup of tea, are:

1. Enrol a device into a company owned, work profile deployment scenario
2. Set a personal usage policy for Play Store mode, I chose allowlist.
3. Installed applications in the work profile vanish.

### Workaround

None I'm aware of at the moment.

This has been escalated to Android Engineering.

## Reinforcing the need to test & validate

It's not unusual to find issues with new releases, and these examples prove yet again the importance of testing and validating all of your organisation's managed device use cases before rolling out a major release or brand-new device.

🛟 For help or guidance, feel free to [reach out](/support/).
