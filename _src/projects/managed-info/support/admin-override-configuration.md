---
title: Using admin override configuration in kiosk mode
parent: MANAGED INFO support
published: '2024-07-09'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Info'
    - 'bayton-projects'
categories: 
    - Managed Info Setup
layout: base.njk
eleventyNavigation: 
    order: 8
    title: Using admin override configuration in kiosk mode
---

This guide covers how to use the **admin override configuration** with MANAGED INFO in kiosk or launcher mode, including key requirements and limitations for both AMAPI and custom DPC deployments.

## Enabling admin override

To enable admin override in kiosk/launcher mode:

1. Configure the admin override in your MANAGED INFO deployment via managed configurations, and set a password.
2. Provision your device in kiosk/launcher mode using either AMAPI or a custom DPC.
3. Long-press the settings icon (default or MANAGED SETTINGS) in the **main UI** (other screens aren't supported) to prompt for the admin password and access the device applications list.

## What happens after override

After entering the admin override password, a bottom sheet appears listing all available apps with launcher icons that can be opened. This includes user-installed and permitted system apps. 

Note: System apps without launcher icons, those blocked by policy, or those blocked by the MANAGED INFO app drawer allowlist will not appear.

## Limitations and policy requirements

### AMAPI kiosk mode

For admin override to work in AMAPI kiosk mode, only apps that are added to (allowlisted) your AMAPI policy can be launched. Even if an app is visible, it cannot be opened unless it is included in the allowlist. To ensure the desired apps are accessible via admin override, update your AMAPI policy to include all relevant applications. They will not be shown in any app cards by default by doing this (unlike the baked-in Android kiosk).

For launcher mode where the default home application is set to MANAGED INFO, either via the default apps policy within AMAPI, or via a persistent preferred activity, all applications are able to be launched.

### Custom DPC

For custom DPC deployments, ensure your LockTask policy includes all apps you want to permit in kiosk mode. Only apps specified in the lockTask allowlist can be launched or switched to via admin override. Review and adjust your DPC configuration as needed to make additional apps overrideable.


## Example policy configuration

**AMAPI example:**

```json
"applications": [
    {
        "packageName": "com.example.app1",
        "installType": "FORCE_INSTALLED"
    },
    {
        "packageName": "com.example.app2",
        "installType": "FORCE_INSTALLED"
    }
]
```

**Custom DPC example:**

```json
"lockTaskAllowedPackages": [
    "com.example.app1",
    "com.example.app2"
]
```

## Summary

- Admin override only works for apps permitted by your device policy.
- Always review and update allowlists when changing which apps should be accessible via override.
- For help, contact [project-support@bayton.org](mailto:project-support@bayton.org).
