---
title: Troubleshooting issues with MANAGED SETTINGS
parent: Managed Settings support
published: '2024-05-02'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Settings'
    - 'bayton-projects'
categories: 
    - Managed Settings Troubleshooting
layout: base.njk
eleventyNavigation: 
    order: 4
---
If you're having issues configuring or using MANAGED SETTINGS, the below guidance may help. If not, feel free to contact [project-support@bayton.org](mailto:project-support@bayton.org) or join the [ BAYTON Discord](https://discord.gg/YUY7jAjayr).

## Built-in warning/status messages

**Activity may not be available on this device**
: This shows when a device user taps a Setting (i.e., APN) for which there isn't an activity intent available. This may be because the OEM has implemented a custom activity intent, or the device doesn't have this setting available. Please follow steps under [submitting to support](#submitting-to-support) to have this investigated. You will be asked for a [bug report](/android/how-to-capture-device-logs/) after replicating the issue.

**A supported client is required to email support**
: The device user has tapped the support card under available actions, but no mail client is available on the device. This warning can be safely ignored if it is intentional, and device users should use another means of emailing the configured support address.

**A supported web browser or engine is required**
: The device user has tapped a link or action that requires a web browser, but no configured browser is available on the device for MANAGED SETTINGS to use. If this is intentional, the warning can be ignored. Otherwise, configure a browser. You may opt to provide limited access to an application such as Chrome through the use of managed configurations, and a FAQ for this can be found [here](/android/android-enterprise-faq/configure-chrome-bookmarks/).
: Alternatively, configure a support message without links, and disable the feedback action to remove links from the application.

**Licensing server unreachable**
: The application is unable to communicate with the remote licensing server. See [MANAGED SETTINGS requirements](/projects/managed-settings/support/managed-settings-requirements/) for network requirements in order to use the application. If this is an issue for your deployment, please reach out.

## Known issues

**Some OEMs/devices do not support AOSP settings intents**

Where alternative intents exist, support will be added. If you're testing with devices that do not open intents, please follow steps under [submitting to support](#submitting-to-support) to have this investigated.

OEM/device support is tracked via [this document](/projects/managed-settings/support/oem-support/). I welcome feedback to grow it.

**Some OEMs/devices only open the Settings app**

Particularly prevalent on older Android versions, some devices treat all activity intents as a request to open the Settings application, and provide full access to all device settings. 

If this occurs on a device in your fleet, please follow steps under [submitting to support](#submitting-to-support) to have this investigated.

Unfortunately support for this scenario may not be possible, but the OEM/model will be added to the [OEM support list](/projects/managed-settings/support/oem-support/) and I will work to bring it to the attention of any vendor in which this is occurring on a modern Android version.

**App cannot be configured on uncertified devices**

MANAGED SETTINGS requires a GMS/Play Protect certified device with a modern management platform (EMM) to configure it. _If_ your EMM supports offline/AOSP deployment of uncertified devices, _and_ can support the configuration of applications through managed config _without_ access to Google Play, get in touch and I'll provide the necessary information to offer support for this use case.

**APN settings don't launch/aren't available**

A device needs a SIM and an active plan to launch APN settings. Even then, APN settings are altered from AOSP often across OEMs, and it may not be compatible with the intents offered in MANAGED SETTINGS. Custom intents may help, and will be available in future.

## Common issues

### Customisations don't apply

If you're setting customisations, but seeing they don't apply to device(s), there can be a few reasons:

**The device is offline**

Customisations are sent through managed config, and if a device is not online - or does not have access to the Google Play infrastructure and/or EMM services to receive it, customisations won't apply. You'll notice no other configurations (activity intents) are configured, either.

**No access to the licensing server**

If the device(s) cannot reach `ping.projects.bayton.org`, a valid licence cannot be confirmed, and customisations will not apply.

**Invalid/unlicensed organisation ID**

Customisations are only supported on licensed organisation IDs. On invalid or unlicensed organisation IDs, customisations will be ignored. **Activity Intents configurations will still apply**. 

If you're licensed, please ensure the organisation ID added to the managed config is correct, validate the device(s) can reach the licensing server, and reach out to [project-support@bayton.org](mailto:project-support@bayton.org) for further assistance.

### Customisations apply, but the custom heading icon does not

**The icon is too large**

If the image file is simply too large (file size), and the download fails due to unstable network conditions, it will fall back to the generic icon to ensure an acceptable user experience.

**The icon is unavailable**

Ensure the device can reach the URL the file is hosted from. It only needs to do this once per configured icon, and will retain the cached file as long as the URL in the managed config does not change.

**General icon issues**

Check the file format, file size, file dimensions, network quality, file integrity, and generally ensure the environment in which the managed device(s) work doesn't prevent the icon from being fetched.

### Customisations don't update

This points to an issue between the application and the EMM in the first instance. Reach out to debug.

### MANAGED SETTINGS doesn't install

MANAGED SETTINGS requires Android 6.0 and above, running on ARM chipsets. Outside of these requirements, the app should be supported on pretty much all open-market devices. If you're seeing issues, reach out to debug.

### The configuration unsets itself

MANAGED SETTINGS will retrieve/receive the managed configuration either from the DPC or companion application via EMM, or from disk. It will then cache the configuration on an ongoing basis until a new configuration is received. 

Three scenarios where configuration becomes unavailable:

1. The organisation ID is no longer licensed
2. The device is offline for an extended period
3. The EMM/DPC is sending blank/malformed configurations without admin input

For 1, reach out if you believe this to be a mistake. 

For 2, if you have a use case that mandates devices are offline for more than one week at a time, please reach out.

For 3, get in touch with your EMM in the first instance to debug their platform. Loop me in as required to assist.

## Submitting to support

<div class="callout callout-small">

When submitting an issue for support, please do attempt to provide as much information as possible.

</div>

**Licensing/billing issues**

Please email [project-support@bayton.org](mailto:project-support@bayton.org) directly, no need to raise an issue.

**Functionality issues**

**Remember**: Your device may be one of many regional SKUs of one of many OEM models, so the more information you can provide about your device(s) and your issue, the better I can support you.

You can obtain information to aid in resolution through the following process:

1. Open your native Android Settings application
2. Tap in to the Setting (e.g., Wi-Fi) that doesn't launch through MANAGED SETTINGS. **Do this several times**.
3. Note the time to the second (13:31:45) when doing this, [then capture a bug report](/android/how-to-capture-device-logs/).
4. Repeat step 2 & 3, but from the MANAGED SETTINGS intent you're unable to use.

With this information, please create a [new issue](https://github.com/baytonorg/managed_settings_tracker/issues/new?assignees=jasonbayton&labels=bug&projects=&template=bug_report.md&title=Issue%3A+) to be investigated. 

As bug reports can contain sensitive information, you're welcome to use the private [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSdYQrOPM0dKwCmcSjfxgoK2rQvhQXXyw2pk9nMqYBn0F2IhRw/viewform?usp=sf_link) for BRs that may come from a device with user information present. Please input the issue number of the raised request on GitHub so feedback can be linked to the issue.

