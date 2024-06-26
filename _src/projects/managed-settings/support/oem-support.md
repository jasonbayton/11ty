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

## Validated working devices

The following devices have been approved for compatibility with MANAGED SETTINGS:

- Motorola Thinkphone <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 14</span>
- Google Pixel (6 and above, though below should work) <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 12-15</span>
- OnePlus Nord CE 3 Lite 5G (OxygenOS 14) <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 13</span>
- Samsung Galaxy Tab Active4 Pro 5G (One UI 6.0) <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 14</span>

## Validated with notes

**Xiaomi MIUI 14** <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 13</span>

- APN may fail to load
- Mobile & Network > Roaming may crash the Device Settings app if used without a SIM

**Xiaomi HyperOS** <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 14</span>

- About device uses the AOSP intent, HyperOS provides a custom *About phone* screen. There are subtle differences, all core information is provided.
- Network & internet loads HyperOS *More connectivity options*

**Doogee S41 Max** <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 13</span>

- Mobile network crashes settings when no SIM is inserted.
- Bluetooth opens *Connected devices*, which includes USB connection settings (when USB is plugged in).

## Significant issues

**Samsung One UI 5.1** <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 13</span>

- Accessibility allows access to Device Settings search, offering access to the remainder of Device Settings. This is resolved in One UI 6. For One UI 5.x devices, **do not enable Accessibility within MANAGED SETTINGS**.

**Honor Magic UI 6.1** <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 12</span>

- Network & internet, opens the full settings app, unrestricted. This can be overcome by disallowing Network & internet, and instead utilising the dedicated Mobile network, Wi-Fi, etc options individually.