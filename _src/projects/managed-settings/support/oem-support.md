---
title: MANAGED SETTINGS OEM validation
parent: MANAGED SETTINGS support
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
    title: OEM validation list
---

<div class="callout">
<div class="callout-heading callout-icon-edit">Contribute to this list</div>

If you've tested MANAGED SETTINGS on your own device and would like to contribute to the supported devices list below, you can:

1. [Raise an issue](https://github.com/baytonorg/managed_settings_tracker/issues/new?assignees=jasonbayton&labels=support&projects=&template=device_support.md&title=Device%3A+) on the MANAGED SETTINGS tracker
2. Edit this page and submit a PR (link to edit at the bottom right).

Any and all input is appreciated!

</div>

<div class="callout callout-orange">
<div class="callout-heading">When the application crashes</div>

The settings intents offered by Android (AOSP) are occasionally either modified or removed. This may be depicted by either a crash out to the home screen, or an immediate return to MANAGED SETTINGS. 

Logic is added to intents called by MANAGED SETTINGS to attempt to catch these, but given the fragmented nature of OEM Settings implementations, even the expected behaviours aren't always consistent.

<div class="callout-heading callout-heading-small">If you see a crash</div>

If you're a [**priority support**](/projects/managed-settings/pricing/#support-priority-support) customer, please reach out through your dedicated communication channel. For community or licensed organisations, please [**submit an issue**](https://github.com/baytonorg/managed_settings_tracker/issues/new?assignees=jasonbayton&labels=bug&projects=&template=bug_report.md&title=Issue%3A+) or post to the [Discord community](https://discord.gg/YUY7jAjayr), and it'll be investigated as soon as possible. 

</div>

## Validated working devices

The following devices have been approved for compatibility with MANAGED SETTINGS:

- Google Pixel (6 and above, though below should work) <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 12-15</span>
- OnePlus Nord CE 3 Lite 5G (OxygenOS 14) <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 13</span>
- Samsung Galaxy Tab Active4 Pro 5G (One UI 6.0) <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 14</span>
- Samsung One UI 6.0 <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 14</span>
- CMF Phone 1 <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 14</span>

## Validated with notes

**Motorola Thinkphone** <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 14</span>

- APN may fail to load

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