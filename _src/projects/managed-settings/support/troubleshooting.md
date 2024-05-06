---
title: Troubleshooting issues with MANAGED SETTINGS
date: '2024-05-02'
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
---
If you're having issues configuring or using MANAGED SETTINGS, the below guidance may help. If not, feel free to contact [support@bayton.org](mailto:support@bayton.org).

## Built-in warning/status messages

**Activity may not be available on this device**
: This shows when a device user taps a Setting (i.e., APN) for which there isn't an activity intent available. This may be because the OEM has implemented a custom activity intent, or the device doesn't have this setting available. Please raise a support request via [support@bayton.org](mailto:support@bayton.org) to investigate. You will be asked for a [bug report](/android/how-to-capture-device-logs/) after replicating the issue.

**A supported client is required to email support**
: The device user has tapped the support card under available actions, but no mail client is available on the device. This warning can be safely ignored if it is intentional, and device users should use another means of emailing the configured support address.

**A supported web browser or engine is required**
: The device user has tapped a link or action that requires a web browser, but no configured browser is available on the device for MANAGED SETTINGS to use. If this is intentional, the warning can be ignored. Otherwise, configure a browser. You may opt to provide limited access to an application such as Chrome through the use of managed configurations, and a FAQ for this can be found [here](/android/android-enterprise-faq/configure-chrome-bookmarks/).
: Alternatively, configure a support message without links, and disable the feedback action to remove links from the application.

**Config has been cleared and will reload shortly**
: The device user has cleared the existing managed config, temporarily reverting the application to an unmanaged configuration. The application will re-apply the latest configuration/restrictions as soon as possible, and functionality will be restored. Hide this action through configuration to avoid device users abusing this function.

**Licencing server unreachable**
: The application is unable to communicate with the remote licencing server. See [MANAGED SETTINGS requirements](/projects/managed-settings/support/managed-settings-requirements/) for network requirements in order to use the application. If this is an issue for your deployment, please reach out.

## Known issues

**Some OEMs/devices do not support AOSP settings intents.**

Where alternative intents exist, support will be added. If you're testing with devices that do not open intents, you can submit information to aid in resolution through the following process:
1. Open your native Android Settings application
2. Tap in to the Setting (e.g., Wi-Fi) that doesn't launch through MANAGED SETTINGS. Do this several times.
3. Note the time to the second (13:31:45) when doing this, [then capture a bug report](/android/how-to-capture-device-logs/).
4. Upload the bug report to the [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSdYQrOPM0dKwCmcSjfxgoK2rQvhQXXyw2pk9nMqYBn0F2IhRw/viewform?usp=sf_link), inputting the operating system version (14), OEM (Samsung) and Model (Galaxy S24) within the text input.

OEM/device support will be tracked via [this document](/projects/managed-settings/support/oem-support/) once internal testing is complete.

**Some OEMs/devices only open the Settings app**

Particularly prevalent on older Android versions, some devices treat all activity intents as a request to open the Settings application, and provide full access to all device settings. 

If this occurs on a device in your fleet, please submit [feedback](https://docs.google.com/forms/d/e/1FAIpQLSdYQrOPM0dKwCmcSjfxgoK2rQvhQXXyw2pk9nMqYBn0F2IhRw/viewform?usp=sf_link), inputting the operating system version (14), OEM (Samsung) and Model (Galaxy S24) within the text input. 

Unfortunately support for this scenario may not be possible, but the OEM/model will be added to the OEM support list and I will work to bring it to the attention of any vendor in which this is occurring on a modern Android version.

OEM/device support will be tracked via [this document](/projects/managed-settings/support/oem-support/) once internal testing is complete.

**App cannot be configured on uncertified devices**

MANAGED SETTINGS requires a GMS/Play Protect certified device with a modern management platform (EMM) to configure it. _If_ your EMM supports offline/AOSP deployment of uncertified devices, _and_ can support the configuration of applications through managed config _without_ access to Google Play, get in touch and I'll see if we can support this use case.

## Common issues

### Customisations don't apply

If you're setting customisations, but seeing they don't apply to device(s), there can be a few reasons:

**The device is offline**

Customisations are sent through managed config, and if a device is not online - or does not have access to the Google Play infrastructure and/or EMM services to receive it, customisations won't apply. You'll notice no other configurations (activity intents) are configured, either.

**No access to the licencing server**

If the device(s) cannot reach `ping.projects.bayton.org`, a valid licence cannot be confirmed, and customisations will not apply.

**Invalid/unlicensed organisation ID**

Customisations are only supported on licenced organisation IDs. On invalid or unlicensed organisation IDs, customisations will be ignored. **Activity Intents configurations will still apply**. 

If you're licenced, please ensure the organisation ID added to the managed config is correct, validate the device(s) can reach the licencing server, and reach out to [support@bayton.org](mailto:support@bayton.org) for further assistance.

### Customisations apply, but the custom heading icon does not

**The icon is too large**

If the image file is simply too large (file size), and the download fails due to unstable network conditions, it will fall back to the generic icon to ensure an acceptable user experience.

**The icon is unavailable**

Ensure the device can reach the URL the file is hosted from. It only needs to do this once per configured icon, and will retain the cached file as long as the URL in the managed config does not change.

**General icon issues**

Check the file format, file size, file dimensions, network quality, file integrity, and generally ensure the environment in which the managed device(s) work doesn't prevent the icon from being fetched.

### MANAGED SETTINGS doesn't install

MANAGED SETTINGS requires Android 6.0 and above, running on ARM chipsets. Outside of these requirements, the app should be supported on pretty much all open-market devices. If you're seeing issues, reach out to debug.

### The configuration unsets itself

MANAGED SETTINGS will retrieve/receive the managed configuration either from the DPC or a companion application. It will then cache the configuration on an ongoing basis until a new configuration is received. 

Two scenarios where configuration becomes unavailable:

1. The organisation ID is no longer licenced
2. The device is offline for an extended period
3. The EMM/DPC is sending blank/malformed configurations without admin input

For 1, reach out if you believe this to be a mistake. 

For 2, if you have a use case that mandates devices are offline for more than one week at a time, please reach out.

For 3, get in touch with your EMM in the first instance to debug their platform. Loop me in as required to assist.

## Further support

🛟 [Get in touch](mailto:support@bayton.org) for additional help and support.
