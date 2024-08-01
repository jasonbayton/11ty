---
title: Configure MANAGED SETTINGS for Pulsus
parent: EMM setup guides for MANAGED SETTINGS
published: '2024-08-01'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Settings'
    - 'bayton-projects'
categories: 
    - EMM setup guides
layout: base.njk
eleventyNavigation: 
    order: 3
    title: Configure Pulsus
---
MANAGED SETTINGS can be set up quickly and easily through Pulsus. 

Prerequisites:
- Android Enterprise is bound
- A device group exists, or will be created for this guide
- [Requirements](/projects/managed-settings/support/managed-settings-requirements) are met
- A [licence key](/projects/managed-settings/pricing), if desired

<div class="callout callout-blue">
<div class="callout-heading">Avoid blocking the Settings application</div>

You'll note in the below configuration steps, nowhere is it mentioned to import or attempt to configure the native Settings application. For the Kiosk use case, blocking Settings (`com.android.settings`) through the install type of **Blocked** will prevent MANAGED SETTINGS from working. 

**It is not necessary**. Native Settings needs not be present in the application list _at all_.

</div>

## Add MANAGED SETTINGS to Pulsus

Head to **Applications** on the left-hand navigation.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/pulsus/Screenshot_2024-08-01_23.30.42.png)

Click the **+** icon and select **Play Store** under **Android**.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/pulsus/Screenshot_2024-08-01_23.30.48.png)

Search for **BAYTON MANAGED SETTINGS**, or `org.bayton.managedsettings` if the former returns no results. **Click the title to select the app**.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/pulsus/Screenshot_2024-08-01_23.30.59.png)

Click **Select**.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/pulsus/Screenshot_2024-08-01_23.31.04.png)

A configuration page will now appear, allowing for app install, permissions, and configuration settings. Set these as desired, or leave them default to enforce installation. 

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/pulsus/Screenshot_2024-08-01_23.32.28.png)

Scroll down, and assign MANAGED SETTINGS to the appropriate group

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/pulsus/Screenshot_2024-08-01_23.39.42.png)

Click **Save**. MANAGED SETTINGS will appear in the apps table. 

## Configure MANAGED SETTINGS

Hover over the MANAGED SETTINGS entry in the app table, and click **MCM**

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/pulsus/Screenshot_2024-08-01_23.35.15.png)

Create a config name, set the appropriate configs, and click **Save**.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/pulsus/Screenshot_2024-08-01_23.35.33.png)

## Configure the launcher

On the left-hand navigation, select **Launcher**.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/pulsus/Screenshot_2024-08-02_00.03.23.png)

Select or create a new Launcher configuration, assigned to the appropriate group.

Drag MANAGED SETTINGS amongst the configured applications shown in the Launcher config, and optionally adjust launcher settings to lock down the kiosk environment appropriately.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/pulsus/Screenshot_2024-08-02_00.04.06.png)

Configuration is complete.