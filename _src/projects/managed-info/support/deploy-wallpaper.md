---
title: Deploy device wallpapers with MANAGED INFO
parent: MANAGED INFO support
published: '2024-11-14'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Info'
    - 'bayton-projects'
categories: 
    - Managed Info Features
layout: base.njk
eleventyNavigation: 
    order: 9
    title: Deploy device wallpapers
---

MANAGED INFO includes a built-in **wallpaper manager** that applies a home and lock screen wallpaper based on the **Custom device wallpaper** (`kiosk_custom_device_wallpaper`) managed configuration key.

## AMAPI policy requirements

While this feature should work on custom DPC, the below guide focuses on AMAPI. 

Your AMAPI policy should:

1. Install MANAGED INFO itself on the device.
2. Avoid policy‑level restrictions that block wallpaper modification.
3. Include the wallpaper configuration in `managedConfiguration` directly in the policy.

## Deploy through your EMM UI

- First, import MANAGED INFO via Google Play. 
- Depending on the EMM vendor in use, the step to editing and the app and/or creating a managed configuration can differ - refer to EMM documentation for help.
- When the managed configuration is loaded/present, look for **Kiosk settings**.
- Within **Kiosk settings**, locate **Custom device wallpaper**.
- Input a URL to an image accessible to MANAGED INFO. This can be on the local network, or hosted somewhere like Unsplash.
- Save and close, the app will automatically apply the wallpaper once it has downloaded and processed it. This can take a few minutes.

**Note**: MANAGED INFO must have been opened on a device at least once in order for the wallpaper manager to function. This is a limitation of Android. Check your EMM vendor documentation for options.

## JSON & lower-level config

A minimal example policy with a managed configuration placeholder:

```json
{
  "applications": [
    {
      "packageName": "org.bayton.managedinfo",
      "installType": "REQUIRED_FOR_SETUP",
      "defaultPermissionPolicy": "GRANT",
      "signingKeyCerts": [
        { "signingKeyCertFingerprintSha256": "<base64-encoded SHA-256>" }
      ],
      "managedConfiguration": {
        "kiosk_settings": {
          "kiosk_custom_device_wallpaper": "https://example.org/wallpapers/office.jpg"
        }      
      }
    }
  ]
}
```

EMMs that support native managed configuration input via a form (most do) should configure wallpapers through the GUI rather than embedding JSON in policy.

## MANAGED INFO wallpaper configuration

**Wallpaper key**

MANAGED INFO currently supports a single managed configuration key for wallpaper management:

- **kiosk_custom_device_wallpaper** - a direct HTTPS URL to an image file

Supported formats:
- PNG
- JPEG
- WebP

The wallpaper is always applied to **both** home and lock screens.  Base64, HEIC/HEIF, and resource-based wallpapers are not currently supported.

**Caching**

MANAGED INFO stores:

- the downloaded file  
- the last applied URL  

This ensures wallpapers are **only downloaded or applied when something changes**.

## What MANAGED INFO does with your configuration

When a wallpaper URL is present:

1. Validates the URL is non-empty.
2. Downloads the image.
3. Verifies the bitmap can be converted.
4. Compares against the previously applied URL.
   - If unchanged > no action taken.
   - If changed > applies wallpaper to home and lock screens.
5. Updates internal state to avoid repeated applications.

## Removing or disabling a wallpaper

If `kiosk_custom_device_wallpaper` is removed or set to an empty string:

- MANAGED INFO will **stop applying** wallpapers. The OEM wallpaper will return.
- If the restriction key is explicitly present and empty, MANAGED INFO will also **clear** the currently applied wallpaper (where permitted by Android).
- If the key is absent, MANAGED INFO will not clear (to avoid accidental resets during boot or unhydrated configuration states).

## Troubleshooting

**Wallpaper does not apply**

Check:
- the URL is reachable  
- the file is a valid image format  
- the device is not blocked by OEM wallpaper restrictions  
- Ensure the managed configuration has hydrated (there may be a delay after boot).
- If the wallpaper resets, confirm the EMM is sending `kiosk_custom_device_wallpaper` consistently (missing keys are treated as “no-change”, not “clear”).

**Slow or large downloads**

Consider:
- using WebP for smaller file sizes  
- hosting wallpapers on a CDN  
- lowering resolution for budget devices

**Wallpaper is cropped**

All wallpapers provided are cropped and centred. If an image is significantly larger than the native resolution of the device, it may be treated by the OS as a panoramic wallpaper, and spread across multiple home pages (where they exist). If you find the image is "cut off" across home screen pages, please adjust its size.

To guarantee what you want to show on the device is correctly aligned, please ensure the image contains all visual elements within the resolution of the device it's being set against. It's recommended, though understandably impractical, to create a wallpaper per-resolution and deploy across multiple policies. A future enhancement to this functionality may include the option for multiple image sizes, and MANAGED INFO will choose the most-suited for the device when setting the wallpaper.