---
title: Configure MANAGED SETTINGS for Urmobo EMM
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
    - EMM setup guides
layout: base.njk
eleventyNavigation: 
    order: 3
    title: Configure Urmobo EMM
---
MANAGED SETTINGS can be set up quickly and easily through Urmobo EMM. 

Prerequisites:
- Android Enterprise is bound
- A policy exists, or will be created for this guide
- [Requirements](/projects/managed-settings/support/managed-settings-requirements) are met
- A [licence key](/projects/managed-settings/pricing), if desired

<div class="callout callout-blue">
<div class="callout-heading">Avoid blocking the Settings application</div>

You'll note in the below configuration steps, nowhere is it mentioned to import or attempt to configure the native Settings application. For the Kiosk use case, blocking Settings (`com.android.settings`) through the install type of **Blocked** will prevent MANAGED SETTINGS from working. 

**It is not necessary**. Native Settings needs not be present in the application list _at all_.

</div>

## Add MANAGED SETTINGS to the policy

Head to **Management > Policies** from the left-hand navigation, and create or select a policy for editing.

Scroll down to **Play Store** and in the open window, search for **BAYTON MANAGED SETTINGS**, or `org.bayton.managedsettings` if the former returns no results.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/urmobo/Screenshot_2024-07-24_17.11.27.png)

**Click the icon to select the app**.

Select an appropriate **Assignment type** (install type). I have selected **Force Installed** however it is your choice. A type that prevents uninstallation is ideal.

Click **Select**

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/urmobo/Screenshot_2024-07-24_17.11.33.png)

MANAGED SETTINGS will appear in the apps table above.

## Configure MANAGED SETTINGS

Click the 3 dots menu icon to the left of the app icon, and select **Managed Configuration**.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/urmobo/Screenshot_2024-07-24_17.12.03.png)

In the below section, provide a configuration name, set the appropriate configs, and click **Save**.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/urmobo/Screenshot_2024-07-24_17.13.43.png)

## Set kiosk customisation policies

Scroll up to Kiosk, and configure the kiosk environment. I have selected the native Android Kiosk, but you may prefer the Urmobo Kiosk.

Select **Blocked** for **Device settings**, and configure any additional kiosk settings as desired.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/urmobo/Screenshot_2024-07-24_17.14.06.png)

Save your policy, configuration is complete.