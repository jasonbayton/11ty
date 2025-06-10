---
title: Troubleshooting issues with MANAGED INFO
parent: MANAGED INFO support
published: '2024-12-16'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Info'
    - 'bayton-projects'
categories: 
    - Managed Info Troubleshooting
layout: base.njk
eleventyNavigation: 
    order: 7
    title: Troubleshooting issues
---
If you're having issues configuring or using MANAGED INFO, the below guidance may help. If not, feel free to contact [project-support@bayton.org](mailto:project-support@bayton.org) or join the [BAYTON Discord](https://discord.gg/YUY7jAjayr).

## Built-in warning/status messages

**Not found: `com.package.name`**
: This shows when the application package name defined in the managed configuration is not present on the device. Has the application been distributed by the MDM?

**A supported web browser or engine is required**
: The device user has tapped a link or action that requires a web browser, but no configured browser is available on the device for MANAGED INFO to use. If this is intentional, the warning can be ignored. Otherwise, configure a browser. You may opt to provide limited access to an application such as Chrome through the use of managed configurations, and a FAQ for this can be found [here](/android/android-enterprise-faq/configure-chrome-bookmarks/).
: Alternatively, configure a support message without links, and disable the feedback action to remove links from the application.

**Licensing server unreachable**
: The application is unable to communicate with the remote licensing server. See [MANAGED INFO requirements](/projects/managed-info/support/managed-info-requirements/) for network requirements in order to use the application. If this is an issue for your deployment, please reach out.

## Known issues

**App cannot be configured on uncertified devices**

MANAGED INFO requires a GMS/Play Protect certified device with a modern management platform (EMM) to configure it. _If_ your EMM supports offline/AOSP deployment of uncertified devices, _and_ can support the configuration of applications through managed config _without_ access to Google Play, get in touch, and I'll provide the necessary information to offer support for this use case.

**App does not launch from MANAGED INFO when in kiosk mode**

If you're seeing this behaviour, the chances are the application you're trying to launch is not listed in your EMM policy. Although MANAGED INFO has flexible customisation options for how, where, and when applications show, the EMM policy defines what applications are allowed to launch under what circumstances. 

For example, 

1. You add the Google Play Store to a multi-app card. The application icon and name shows within MANAGED INFO. Tapping it does nothing.
2. You add the Google Play Store as a system application to your EMM policy, `com.android.vending`. Tapping the application now launches fine.

This will equally apply to the call, map, web, and email **Quick actions**.

If you see behaviour that doesn't match the above, but applications are failing to launch, please reach out to debug.

## Common issues

### Customisations don't apply

If you're setting customisations, but seeing they don't apply to device(s), there can be a few reasons:

**The device is offline**

Customisations are sent through managed config, and if a device is not online - or does not have access to the Google Play infrastructure and/or EMM services to receive it, customisations won't apply. You'll notice no other configurations are configured, either.

**No access to the licensing server**

If the device(s) cannot reach `ping.projects.bayton.org`, a valid licence cannot be confirmed, and customisations will not apply. See [network requirements](/projects/managed-settings/support/managed-settings-requirements/).

**Invalid/unlicensed organisation ID**

Customisations are only supported on licensed organisation IDs. On invalid or unlicensed organisation IDs, customisations will be ignored.

If you're licensed, please ensure the organisation ID added to the managed config is correct, validate the device(s) can reach the licensing server, and reach out to [project-support@bayton.org](mailto:project-support@bayton.org) for further assistance.

### Customisations apply, but disappear after a period of time

**Ensure devices are able to connect to the internet.** 

Licence validation is performed on every app launch. If MANAGED INFO is unable to reach the PING service, it will retry for 7 days before clearing the licensed state. All customisations will then disable.

### Customisations don't update

This points to an issue between the application and the EMM in the first instance. Reach out to debug.

Please follow steps under [submitting to support](#submitting-to-support) to have this investigated. You will be asked for a [bug report](/android/how-to-capture-device-logs/) after replicating the issue.

### MANAGED INFO doesn't install

MANAGED INFO requires Android 7.0 and above, running on ARM chipsets. Beyond these requirements, the app should be supported on pretty much all open-market devices. If you're seeing issues, reach out to debug.

### MANAGED INFO closes when setting launcher to enabled

This is a quirk of Android, switching between a main activity and an alias activity will close the application. When MANAGED INFO closes, look out for the updated app name, INFO Launcher, and reopen it. It will then be using the alias activity that supports being set as the device launcher. The same behaviour applies when switching launcher back off.

### Unable to set MANAGED INFO as the default persistent preferred activity application for HOME

Make sure the launcher configuration has been adjusted within the managed configuration. Out of the box MANAGED INFO doesn't support being set as the launcher as it can disrupt home navigation on devices.

### The configuration unsets itself

MANAGED INFO will receive the managed configuration either from the DPC or companion application via EMM, or from disk. It will then cache the configuration on an ongoing basis until a new configuration is received. 

Three scenarios where configuration becomes unavailable:

1. The organisation ID is no longer licensed. View the licensed state in settings or fetch a bug report remotely, `PING service` will indicate status.
2. The device is offline for an extended period. This is currently 30 days, but I'm open to feedback.
3. The EMM/DPC is sending blank/malformed configurations without admin input
4. There's a bug 🙃

For: 

1. Reach out if you believe this to be a mistake. 
2. If you have a use case that mandates devices are offline for more than one week at a time, please reach out.
3. Get in touch with your EMM in the first instance to debug their platform. Loop me in as required to assist.

## Submitting to support

<div class="callout callout-small">

When submitting an issue for support, please do attempt to provide as much information as possible.

</div>

**Licensing/billing issues**

Please email [project-support@bayton.org](mailto:project-support@bayton.org) directly, no need to raise an issue.

**Functionality issues**

**Remember**: Your device may be one of many regional SKUs of one of many OEM models, so the more information you can provide about your device(s) and your issue, the better I can support you.

You can obtain information to aid in resolution through the following process:

1. Replicate the behaviour you're seeing multiple times
2. Note the time to the second (13:31:45) when doing this, [then capture a bug report](/android/how-to-capture-device-logs/).

With this information, please create a [new issue](https://github.com/baytonorg/managed_info_tracker/issues/new?assignees=jasonbayton&labels=bug&projects=&template=bug_report.md&title=Issue%3A+) to be investigated. 

As bug reports (BR) can contain sensitive information, you're welcome to use the private [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSdYQrOPM0dKwCmcSjfxgoK2rQvhQXXyw2pk9nMqYBn0F2IhRw/viewform?usp=sf_link) for BRs that may come from a device with user information present. Please input the issue number of the raised request on GitHub, so feedback can be linked to the issue.

For priority support customers, raise your concern through your dedicated channel.