---
title: PACKAGE SEARCH enable system apps setup
parent: PACKAGE SEARCH support
published: '2024-09-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Package Search'
    - 'bayton-projects'
categories: 
    - Package Search Setup
layout: base.njk
eleventyNavigation: 
    order: 0
    title: Enable system apps
---

PACKAGE SEARCH is able to selectively enable unavailable system applications for devices running Android 8.0+.

For localised troubleshooting, and recommended for test devices only, PACKAGE SEARCH allows an authorised device user to turn on select system applications directly from PACKAGE SEARCH on the device, without trial-and-error EMM policy updates.

**This is a one-way toggle, and cannot be reversed once enabled without EMM intervention**.

Rather than pouring over application lists and application inventory tables, the EMM admin grants the necessary permissions to PACKAGE SEARCH, and the local user can manipulate applications directly. This allows for much faster validation of missing system apps, and far more context, including application icons, application names, and more not generally always available within EMM app inventory lists - especially for system apps.

In order to leverage this feature:

- PACKAGE SEARCH requires the delegation of a Device Policy Manager scope, `ENABLE_SYSTEM_APP`.
- A dedicated managed configuration option is present, **Allow enabling unavailable apps (system apps)**. This must also be enabled.

These two guards ensure this functionality is less likely to be turned on unknowingly.

Once enabled, a new icon will appear on Unavailable apps, <span class="material-symbols-outlined highlight">token</span>, indicating their availability to be enabled. Tapping this will bring up a confirmation modal, after which the app list will reload and the selected system app _should_ be available.

[![enable system app](https://cdn.bayton.org/assets/package_search/package_search_enable_sysapps/ps_enable_sysapp.png)](https://cdn.bayton.org/assets/package_search/package_search_enable_sysapps/ps_enable_sysapp.png)

_Should_ is a key word, as the scope for this functionality is limited:

- The application must be a disabled system app that would be enabled if provisioning options turned system apps on during setup
- The application must not be subject to any other policies
- The application must be a preloaded system app, any other app types are not supported

If the above doesn't provide the desired clarity, please read up on [vital apps](/android/what-are-vital-apps/).

## Demo

[![enable system app](https://cdn.bayton.org/assets/package_search/package_search_enable_sysapps/ps_enable_sysapp.gif)](https://cdn.bayton.org/assets/package_search/package_search_enable_sysapps/ps_enable_sysapp.gif)

For assistance setting the package up, the below guides may help:

## EMM guidance

### Android Management API

An increasing number of platforms are built upon, or migrating to, the Android Management API (AMAPI). If you are familiar with this API and comfortable with JSON, the policy configuration looks as follows: 

```json
{
  "packageName": "org.bayton.packagesearch",
  "delegatedScopes": [
    "ENABLE_SYSTEM_APP",
  ],
  "installType": "PREINSTALLED",
  "managedConfiguration": {
    "allow_enable_unavailable_apps": true
  },
},
```

In the above, PACKAGE SEARCH is being pushed to a device silently with the `PREINSTALLED` install type. The delegated scope AMAPI grants is `ENABLE_SYSTEM_APP`. Additionally, the managed configuration is set.

### Workspace One UEM

[This link](https://kb.omnissa.com/s/article/89115) describes how a delegated scope can be configured with WS1 UEM, further guidance will be provided in the [EMM setup guides](../emm-setup) in due course.

### Scalefusion

[This link](https://help.scalefusion.com/docs/delegation-scope-management) describes how to delegate a scope on a Scalefusion-managed device.

### Knox Manage

[This link](https://docs.samsungknox.com/admin/knox-manage/configure/profile/configure-profile-policies/android-enterprise-policies/#supported-delegation-scopes-current-release) describes the available delegated scopes for Android devices managed by Knox Manage

### NinjaOne MDM

[This link](https://www.ninjaone.com/docs/mdm/setup-guide/mdm-policies/android-policies/) outlines where in an Android policy scopes can be delegated.

### EMM vendor setup

Typically delegated scopes are found within application configurations. Within your EMM when adding an application, you should see delegated scopes alongside install type, managed config, install priority/constraints, and so on. It should provide a drop-down or checkbox list for scopes able to be delegated to an application. Select ENABLE_SYSTEM_APP, or if the EMM provides their own label for scopes, look out for Enable system apps, or a similar sounding option.

Further guidance may be found in [EMM setup guides](../emm-setup). Documentation isn't provided for every EMM on the market currently. If you'd like guidance for your particular EMM, please [raise a request](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&projects=&template=content-request.md&title=%5BContent+request%5D). If you happen to know your EMM vendor leverages AMAPI, you may also raise a support request with them, providing above AMAPI JSON example and requesting guidance on how this is applied to your policies.