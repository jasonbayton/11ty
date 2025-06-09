---
title: Kiosk vs launcher mode
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
    - Managed Info Customisation
layout: base.njk
eleventyNavigation: 
    order: 4
    title: Kiosk vs launcher mode
---

This document explains the differences between **kiosk mode** (LockTask) and **launcher mode** (persistent preferred activities) when using MANAGED INFO, and how admin override functions in each scenario.

## Kiosk mode (LockTask)

Kiosk mode is a highly restrictive environment designed for single-purpose devices. It uses Android's LockTask APIs to lock the device to specific apps, restricts access to system UI elements (such as the status bar, navigation bar, and power menu), and enforces strict policy controls. Breaking out of kiosk mode typically requires admin intervention or device reprovisioning, making it ideal for secure, dedicated-use deployments.

- **Security:** High; users cannot access system settings or other apps unless explicitly allowed.
- **Configuration:** Requires more EMM-side policy management (allowlists, LockTask policies).
- **Admin override:** Works as intended, allowing access only to apps permitted by policy. Useful for troubleshooting or temporary access.

## Launcher mode (Persistent Preferred Activities)

Launcher mode configures a custom home screen experience using persistent preferred activities. This approach is more flexible and resembles the traditional Android launcher, with no restrictions on the power button, status bar, navigation bar, or notification shade. It's suitable for deployments where users need more freedom but still require a branded or customised launcher.

- **Security:** Moderate; users can access system UI elements and open the settings app from the notification shade.
- **Configuration:** Simpler to set up, with fewer restrictions and less EMM-side policy required.
- **Admin override:** Functions as designed, but since users can already access the settings app via the notification shade, its usefulness is limited.

## Policy configuration differences

The main differences in policy configuration between kiosk mode and launcher mode are:

- **Kiosk mode (LockTask):**
    - Requires explicit allowlisting of apps.
    - Uses `installType: KIOSK` for the target app.
    - LockTask policies restrict access to system UI and other apps.
    - More granular control via EMM policies.

- **Launcher mode (Persistent Preferred Activities):**
    - No need to restrict system UI or allowlist apps.
    - Uses persistent preferred activities to set a custom launcher.
    - Simpler policy, focusing on launcher assignment rather than device lockdown.

### Example AMAPI policy snippets

**Kiosk mode (LockTask) example:**
```json
{
    "applications": [
        {
            "packageName": "org.bayton.managedinfo",
            "installType": "KIOSK"
        }
    ],
    "kioskCustomization": {
        "deviceSettings": false,
        "statusBar": false,
        "systemNavigation": "NONE",
        "systemErrorDialogs": false
    }
}
```

**Launcher mode (Persistent Preferred Activity) example:**
```json
{
    "persistentPreferredActivities": [
        {
            "receiverActivity": "org.bayton.managedinfo/.MainActivityAlias",
            "actions": ["android.intent.action.MAIN"],
            "categories": ["android.intent.category.HOME", "android.intent.category.DEFAULT"]
        }
    ]
}
```

These examples show how to configure each mode using Android Management API (AMAPI) policy. Adjust other policy fields as needed for your deployment, and of course adapt to custom DPC solutions accordingly.

## Choosing the right mode

MANAGED INFO can work under both approaches perfectly well, and retains all the same functionality (though, noting the admin override limitation) regardless of the mode chosen.

Therefore, the choice comes down to:

- **Kiosk mode** for maximum security and control, especially for single-use or public-facing devices.
- **Launcher mode** for a more flexible, customisable experience where some user freedom is acceptable.
