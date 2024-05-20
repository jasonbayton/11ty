---
title: MANAGED SETTINGS OEM validation
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
    order: 5
---

## Approved working 

The following devices have been approved for compatibility with MANAGED SETTINGS:

- Motorola Thinkphone 
- Google Pixel (6 and above, though below should work)
- OnePlus Nord CE 3 Lite 5G (OxygenOS 14)


## Approved with notes

**Xiaomi MIUI 14** <sup>Android 13</sup>

- APN may fail to load
- Mobile & Network > Roaming may crash the Device Settings app (tested without SIM)

**Xiaomi HyperOS** <sup>Android 14</sup>

- About device uses the AOSP intent, HyperOS provides a custom *About phone* screen. There are subtle differences, all core information is provided.
- Network & internet loads HyperOS *More connectivity options*

**Doogee S41 Max** <sup>Android 13</sup>

- Mobile network crashes MANAGED SETTINGS <small>_- Bug logged_</small>
- Bluetooth opens *Connected devices*, which includes USB connection settings (when USB is plugged in).

## Significant issues

**Samsung OneUI 5.1** <sup>Android 13</sup>

- Accessibility allows access to Device Settings search, offering access to the remainder of Device Settings.
- Security & privacy, tapping back (top left) returns to Device Settings, not MANAGED SETTINGS, offering full access to all configurable device settings.
- Battery management, tapping back (top left) returns to *General battery settings*, and tapping again goes to device care. This offers access into other Device Settings areas, but doesn't grant access to the full Device Settings.
- Language and locale, tapping back (top left) returns to *General management*, and again returns to Device Settings, offering full access to device settings.
- Sound, tapping back (top left) returns to Device Settings, offering full access to device settings.
- Display, tapping back (top left) returns to Device Settings, offering full access to device settings.
- Bluetooth, tapping back (top left) returns to *Connections*, and again returns to Device Settings, offering full access to device settings.
- Wi-Fi, tapping back (top left) returns to *Connections*, and again returns to Device Settings, offering full access to device settings.
- Network & internet, tapping back (top left) returns to Device Settings, offering full access to device settings.

**Honor Magic UI 6.1** <sup>Android 12</sup>

- Network & internet, opens the full settings app, unrestricted. This can be overcome by disallowing Network & internet, and instead utilising the dedicated Mobile network, Wi-Fi, etc options individually.