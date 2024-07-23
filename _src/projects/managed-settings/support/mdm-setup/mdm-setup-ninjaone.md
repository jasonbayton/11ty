---
title: Configure MANAGED SETTINGS for NinjaOne MDM
parent: EMM setup guides for MANAGED SETTINGS
published: '2024-07-22'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Settings'
    - 'bayton-projects'
categories: 
    - Managed Settings Setup
    - EMM setup guides
layout: base.njk
eleventyNavigation: 
    order: 3
    title: Configure NinjaOne MDM
---
MANAGED SETTINGS can be set up quickly and easily through NinjaOne MDM. 

Prerequisites:
- MDM is enabled
- Android Enterprise is bound (a connection is present)
- A policy exists, or will be created for this guide
- The MANAGED SETTINGS application
- A licence key, if desired

<div class="callout callout-red">
<div class="callout-heading">Avoid blocking the Settings application</div>

You'll note in the below configuration steps, nowhere is it mentioned to import or attempt to configure the native Settings application. For the Kiosk use case, blocking Settings (`com.android.settings`) through the install type of **Blocked** will prevent MANAGED SETTINGS from working. 

**It is not necessary**. Native Settings needs not be present in the application list _at all_.

</div>

## Add MANAGED SETTINGS to the policy

Head to **Applications** from the left-hand policy navigation.

Open **Add apps** and select **Play Store**.

![Screenshot_2024-07-23_15.20.05.png](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/ninjaone_mdm/Screenshot_2024-07-23_15.20.05.png)

Search for **BAYTON MANAGED SETTINGS**, or `org.bayton.managedsettings` if the former returns no results. **Click the icon to select the app**.

![Screenshot_2024-07-23_15.20.20.png](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/ninjaone_mdm/Screenshot_2024-07-23_15.20.20.png)

Click **Select**.

![Screenshot_2024-07-23_15.20.24.png](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/ninjaone_mdm/Screenshot_2024-07-23_15.20.24.png)

MANAGED SETTINGS will appear in the apps table. 

## Configure MANAGED SETTINGS

Hover over the app, and click on the **menu icon**, far right. Select **Edit**.

![Screenshot_2024-07-23_15.20.31.png](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/ninjaone_mdm/Screenshot_2024-07-23_15.20.31.png)

Select an appropriate **Assignment type** (install type). I have selected **Required for Setup**, however **Force Installed** will work also. A type that prevents uninstallation is ideal.

![Screenshot_2024-07-23_15.20.47.png](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/ninjaone_mdm/Screenshot_2024-07-23_15.20.47.png)

Switch over to **Managed Configuration**. Provide a configuration name, set the appropriate configs, and click **Save.** Click **Close**.

![Screenshot_2024-07-23_15.21.08.png](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/ninjaone_mdm/Screenshot_2024-07-23_15.21.08.png)

## Set kiosk customisation policies

Back in the Applications policy component, ensure **Native multi-app kiosk launcher** is enabled, then head over to the **Kiosk Settings** tab.

Select **Blocked** for **Device settings**

![Screenshot_2024-07-23_15.22.18.png](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/ninjaone_mdm/Screenshot_2024-07-23_15.22.18.png)

Save your policy, configuration is complete.