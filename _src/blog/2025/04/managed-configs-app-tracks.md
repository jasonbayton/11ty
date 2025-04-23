---
 title: "The Android Management API doesn't support pulling managed properties (config) from app tracks. Here's how to work around it"
 date: '2025-04-23'
 status: publish
 author: 'Jason Bayton'
 excerpt: "This is a super silly limitation in AMAPI, and prevents customers testing their managed configurations in tracks before rolling out to prod. Your EMM can work around it, though."
 type: post
 tags:
     - Enterprise
---

I've had a use case thrust upon me this week, something I hadn't _really_ paid much attention to as I considered and assumed it to be basic functionality. 

But wouldn't you know? Nope!

If you're one of an increasing number of organisations trying to get to grips with Google Play's app tracks, you'll likely already understand the perceived benefits: 

- Multiple application versions through one app listing in Google Play
- Customisable tracks for easy identification and naming alignment with internal processes
- Direct access to said tracks via EMM policy for managed devices
- All the benefits of Google Play's infrastructure for testing and debugging development builds

It's handy, right? The alternative is creating multiple app listings, which can - depending on app visibility - do anything from trigger Play's [Repetitive Content Policy](https://support.google.com/googleplay/android-developer/answer/9899034#!?zippy_activeEl=made-for-ads#made-for-ads&zippy=%2Cexamples-of-common-violations) to add more workload and management overhead in building, uploading, and maintaining multiple applications on the Play Store (obviously can be countered by CI/CD, but that's not the point).

Unfortunately one of the limitations with app tracks, that wouldn't be there if using multiple Play Store listings, is the visibility of managed configuration.

Circling back to the use case:

A customer has successfully had their ear bent to the benefits of managed config for configuring their application(s) out in the wild, and with quite a robust QA process, has historically had multiple versions of an application being deployed to devices across their estate in tandem as part of it. In onboarding to NinjaOne MDM, with AMAPI (AMAPI **still doesn't support APK deployment** as of April 2025), the obvious route for this workflow was via app tracks - this is also considering additional requirements not fully described here.

All had been well until it came time to test the managed config. The app track was selected, the application version landed on-device, but managed configs remained empty. _Why?_

```json
{
  "name": "enterprises/xxxx/applications/com.applauncher",
  "title": "App Launcher",
  "appTracks": [
    {
      "trackId": "4620480462718573",
      "trackAlias": "Dev"
    }
  ],
  "playStoreUrl": "https://play.google.com/store/apps/details?id=com.applauncher",
  "distributionChannel": "PRIVATE_GOOGLE_HOSTED",
  "appPricing": "FREE",
  "minAndroidSdkVersion": 31,
  "updateTime": "2025-01-17T20:51:47.764Z",
  "availableCountries": [
    "AD",
    ...
    "ZM",
    "ZW"
  ],
  "appVersions": [
    {
      "versionString": "1.33",
      "versionCode": 33,
      "trackIds": [
        "4620480462718573"
      ]
    },
    {
      "versionString": "1.6",
      "versionCode": 6,
      "production": true
    }
  ],
  "fullDescription": "App Launcher"
}
```

Notice anything missing in the above `applications.get` via AMAPI? 

`managedProperties` is absent. Despite being available in the track being pushed to test devices, the `applications.get` API endpoint will only return on `PRODUCTION` where at this time no managed properties were defined.

Here's an example of what could be shown in the above, as taken from my application:

```json
"managedProperties": [
    {
        "key": "startPath",
        "type": "STRING",
        "title": "Application start page",
        "description": "Set the page the application relative to the domain. Default is /, so to start on the Android docs page input /android.",
        "defaultValue": "/"
    }
],
```

I'm sure Google could fix this by adding another request parameter for `trackID` (alongside `name` and `languageCode` as shown [here](https://developers.google.com/android/management/reference/rest/v1/enterprises.applications/get)) but today they don't. 

## OK, so how can this be addressed?

As ever I'll focus on AMAPI here, Play EMM API vendors have a lot more freedom with their custom DPCs to integrate this as desired. 

When building your AMAPI policy, managed configurations form part of the `applications` payload, and look something like this - 

```json
{
    "installType": "PREINSTALLED",
    "packageName": "com.applauncher",
    "autoUpdateMode": "AUTO_UPDATE_MODE_UNSPECIFIED",
    "accessibleTrackIds": "4620480462718573",
    "managedConfiguration": {
        "payment_gateway_url": "https:\/\/bbc.co.uk"
    },
    "defaultPermissionPolicy": "PERMISSION_POLICY_UNSPECIFIED"
},
```

Typically, an EMM will take one of two approaches to managed configurations:

1. Use the managed configuration iFrame, which generates the restrictions form.. within an iFrame. This then returns an ID to the policy.
2. Build a form dynamically from the `managedProperties` of the `applications.get` API call - this is my preferred route as it's far more flexible.

If the EMM is using option 1, it becomes more difficult to achieve the objective as it would require the clearing of the ID and a full resubmission of MC via `managedConfiguration`. If EMMs _don't_ clear the ID first, they will be met with an error 400 on policy save, despite the [documentation clearly stating](https://developers.google.com/android/management/reference/rest/v1/enterprises.policies#:~:text=is%20ignored%20if-,managedConfiguration,-is%20set.) ID will be ignored:

> The managed configurations template for the app, saved from the managed configurations iframe. This field is ignored if managedConfiguration is set.

Since EMMs use the iFrame for simplicity, this is less likely to happen.

For option 2, as above there's a lot more flexibility. The vendor will have a configuration form (or the concepts of one, Intune) which will dynamically generate the appropriate inputs based on the `PRODUCTION` track `applications.get` command the EMM performs. 

But they don't _have_ to do this. An EMM vendor could add either a custom configuration form, or a JSON editor directly, like that of Intune, which would allow the editing and adding of configurations as desired.

Now when an application is known to have managed properties set in an app track version, even if the production version doesn't have anything to generate a form against, the managed config JSON can still be added to the policy, and will be sent down to the application regardless where it will apply successfully. 

Like this: 

```json
"managedConfiguration": {
    "payment_gateway_url": "https:\/\/bbc.co.uk"
}
```
## To summarise 

If a policy can be edited via a JSON/custom config editor, it's simple and straightforward to obtain the restrictions from the application and input them under managed configurations manually rather than leaning on the EMM to build the configuration form. If the EMM doesn't offer this, and equally can't provide access to an API to allow similar, then it may be worth raising it as a feature request. 

Get in touch if you've any questions on this!