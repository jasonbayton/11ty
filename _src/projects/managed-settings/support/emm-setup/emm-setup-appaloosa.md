---
title: Configure MANAGED SETTINGS for Appaloosa
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
    title: Configure Appaloosa
---
MANAGED SETTINGS can be set up quickly and easily through Appaloosa. The following guide is written for **Device deployment** through a managed policy.

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

Head to **Catalog** on the left-hand navigation.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/appaloosa/Screenshot_2024-07-23_23.05.08.png)

Click **+ Add an application** and select **Public** under **Android**.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/appaloosa/Screenshot_2024-07-23_23.05.14.png)

Search for **BAYTON MANAGED SETTINGS**, or `org.bayton.managedsettings` if the former returns no results. **Click the icon to select the app**.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/appaloosa/Screenshot_2024-07-23_23.05.32.png)

Click **Select**.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/appaloosa/Screenshot_2024-07-23_23.05.38.png)

A confirmation the app was added will appear, after which the managed Google Play iFrame can be closed with the **X**, top right.

MANAGED SETTINGS will appear in the apps table. 

## Configure MANAGED SETTINGS

Click the MANAGED SETTINGS application in the selected apps list, this will open the app overview.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/appaloosa/Screenshot_2024-07-23_23.06.04.png)

Switch over to **Managed Configuration**. Click **Create a managed configuration**.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/appaloosa/Screenshot_2024-07-23_23.06.16.png)

Click **Edit**, set the appropriate configs, and click **Save**.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/appaloosa/Screenshot_2024-07-23_23.06.30.png)

All other tabs can be ignored, as when the application is added to a policy in due course, it will be automatically pushed to assigned devices. The application doesn't require any runtime permissions, so this tab can be disregarded also.

## Configure the policy

On the left-hand navigation, select **Configurations**.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/appaloosa/Screenshot_2024-07-23_23.07.02.png)

Select or create a new configuration, and optionally click **Edit** if required.

Select the **Applications** tab.

Scroll to **Add applications** and begin typing the app name, **BAYTON MANAGED SETTINGS**. The application will automatically pop up after a couple of characters.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/appaloosa/Screenshot_2024-07-23_23.07.37.png)

Optionally set **High priority update** and click **Save**.

Move to the **Configuration** tab and click **Edit**, then scroll down to **Kiosk Mode**.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/appaloosa/Screenshot_2024-07-23_23.43.27.png)

Enable **Kiosk Mode** and ensure:
- Enable fullscreen locked app: **Off**
- Enable access to device settings: **Off**

Configure additional Kiosk Mode settings as desired and click **Save**.

![](https://cdn.bayton.org/assets/managed_settings/managed_settings_emm_setup/appaloosa/Screenshot_2024-07-23_23.46.58.png)

Configuration is complete.