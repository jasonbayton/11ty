---
title: 'Android Enterprise zero-touch console administration guide'
published: '2017-10-29T22:08:13+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Provisioning
layout: base.njk
eleventyNavigation:
  order: 5000
---
<div class="callout">

### What is zero-touch enrolment?

Zero-touch enrolment has been covered in depth in [What is Android zero-touch enrolment?](/android/what-is-android-zero-touch-enrolment/) This document offers a good overview of what it is and why zero-touch is the future of Android management.

</div>
<div class="callout">

### This guide is intended for Organisations

There are two scenarios for which the zero-touch console is used, as an organisation or as a reseller. This guide targets the former, a good resource for resellers can be found [here](https://developers.google.com/zero-touch/guides/portal/).

Furthermore, with the redesign in 2024, GIFs will by default show the new interface, with the old interface available behind a dropdown.

</div>

## Prerequisites

In order to gain access to the zero-touch console and configure devices, you must:

- Purchase zero-touch compatible devices from authorised resellers.
- Ensure the reseller creates a new zero-touch enrolment account on [partner.android.com/zerotouch](https://partner.android.com/zerotouch) **if you don't already have one**. If you do, provide them with your customer number and allow them to add devices to your account by adding them under the resellers page.
- Ensure the reseller assigns your purchased devices to your portal.

Any of the above steps not completed will result in an inability to configure devices.

## Getting started

![](https://cdn.bayton.org/uploads/2017/10/ScreenShot2017-10-18at3.45.10PM.png)  
*The simple zero-touch process*

The zero-touch portal is designed with absolute simplicity in mind; much like the DEP portal (if you’ve ever used it) it’s basically there for you to infrequently log in, create or assign a config to managed devices and carry on with all other management via your normal EMM solution.

## Creating configurations

Once logged in, head over to **Configurations** to set one (or more) up, ready to assign to your devices:

<details open>
<summary class="orange">2024+</summary>

[![](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/create_config.gif)](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/create_config.gif)

</details>

<details>
<summary class="orange">Previous console UI</summary>

[![](https://cdn.bayton.org/uploads/2017/10/ztc_createconfig_watermark.gif)](https://cdn.bayton.org/uploads/2017/10/ztc_createconfig_watermark.gif)

</details>

Click the **+** icon on the right-hand side of **Configurations** to create a new configuration. This will trigger a popup.

To start, simply provide a configuration name, and then from the dropdown, a DPC (or EMM agent).

Following that is DPC extras, within this field you can paste in DPC-specific key-value pairs that add additional functionality. The key-value pairs differ by EMM, so it’s best to validate before pasting anything here. Leaving it blank is also fine. An example of what could go there for  ~~MobileIron~~ Ivanti is as follows and more examples can be found on the [zero-touch FAQ](/android/android-enterprise-zero-touch-faq/#what-should-i-put-in-dpc-extras):

```
{
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":false,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE":{
"server":"core.bayton.org",
"user":"zerotouchuser",
"quickStart":false
}
}
```

After which provide your company name, contact email, contact phone and an optional custom message. These will be presented to the end user while enrolling; particularly for support, having the contact name and telephone number of, perhaps, the IT Helpdesk could be quite useful.

When complete, click **APPLY/ADD** to save the configuration and close out the pop-up.

## Setting a default configuration

Once you’ve created several configurations (or even just the one), you may wish for all devices added by a reseller to be given a configuration by default, thus avoiding having to sign in to the console every time a new device order is made. Above the list of configurations is a **Default Configuration** setting:

<details open>
<summary class="orange">2024+</summary>

[![](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/update_default_config.gif)](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/update_default_config.gif)

Simply click the edit pencil icon and choose one from the dropdown list.

</details>

<details>
<summary class="orange">Previous console UI</summary>

[![](https://cdn.bayton.org/uploads/2017/10/ztc_defaultconfig_watermark.gif)](https://cdn.bayton.org/uploads/2017/10/ztc_defaultconfig_watermark.gif)

Simply click the arrow to the right of **Select a configuration** and choose one from the dropdown list.

</details>


## Applying configurations manually

Click on **Devices** on the left-hand side. Once loaded you’ll be presented with a search area and a list of registered devices. Devices can be searched for based on IMEI, MEID or Serial number, or simply located by scrolling down the list.

Once located, click the arrow to the right of **No config** (or a presently-selected configuration) to open a dropdown, wherein you may select your newly created configuration(s).

<details open>
<summary class="orange">2024+</summary>

[![](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/update_device_config.gif)](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/update_device_config.gif)

Simply click the edit pencil icon and choose one from the dropdown list.

</details>

<details>
<summary class="orange">Previous console UI</summary>

[![](https://cdn.bayton.org/uploads/2017/10/ztc_deviceconfig_watermark.gif)](https://cdn.bayton.org/uploads/2017/10/ztc_deviceconfig_watermark.gif)

</details>

Confirm this selection when prompted. The device will now automatically enrol into the EMM of your choice when either first taken out of the box or on the next factory reset.

## Deleting configurations

<details open>
<summary class="orange">2024+</summary>

Should a configuration no longer be required, head back into **Configurations** and click **Delete** to the right of the configuration you wish to delete:

[![](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/delete_config.gif)](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/delete_config.gif)

Confirm the action, and it'll vanish.

</details>

<details>
<summary class="orange">Previous console UI</summary>

Should a configuration no longer be required, head back into **Configurations** and click **EDIT** to the right of the configuration you wish to delete:

[![](https://cdn.bayton.org/uploads/2017/10/ztc_delconfig_watermark.gif)](https://cdn.bayton.org/uploads/2017/10/ztc_delconfig_watermark.gif)

Click **DELETE CONFIG**. There is no confirmation so ensure you’ve selected the correct one before continuing!

</details>

## Removing devices

Should a device no longer require management, be that due to it being a parting gift for a leaving employee, device destruction or anything else, use the search area or scroll down the device list to locate the device on the **Devices** page. Once located, click **UNREGISTER/Remove**.

<details open>
<summary class="orange">2024+</summary>

[![](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/remove_device.gif)](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/remove_device.gif)

</details>

<details>
<summary class="orange">Previous console UI</summary>

[![](https://cdn.bayton.org/uploads/2017/10/ztc_deviceunregister_watermark.gif)](https://cdn.bayton.org/uploads/2017/10/ztc_deviceunregister_watermark.gif)

</details>

You’ll need to confirm this action, and please be aware **this is not easily reversible**! Once unregistered, you’ll need to contact your reseller to re-add the device back into your console manually; not an action to be taken on a whim.

## Adding admins/owners

The zero-touch console offers the ability to add additional "users" for easier management. There are two roles available when adding a new user, **Owner** and **Admin**. The only real difference between the roles is admins cannot add/delete other admins/owners, these roles can be changed at any time. 

<details open>
<summary class="orange">2024+</summary>

To get started, head over to Users and click **Add user**

[![](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/add_admin.gif)](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/add_admin.gif)

Input the **Email Address**, **Role** and click **Add**.

This will send out an invitation to the named account, allowing them to log in and perform their role-specific actions. 

<div class="callout callout-orange">
<div class="callout-heading-small"><span class="material-symbols-outlined">work_alert</span>Google account required</div>

Only Google accounts are supported here, so ensure the email address added either belongs to Google Workspace, Cloud Identity, or is a Google account used for work purposes.

</div>

</details>

<details>
<summary class="orange">Previous console UI</summary>

To get started, click on **Manage People**:

[![](https://cdn.bayton.org/uploads/2017/10/ztc_addadmin_watermark.gif)](https://cdn.bayton.org/uploads/2017/10/ztc_addadmin_watermark.gif)

Click the **+** icon on the right-hand side of the organisation name to add a new admin. This will trigger a popup.

Input the **Email Address**, **Role** and click **APPLY.**

</details>

## Removing admins

<details open>
<summary class="orange">2024+</summary>

To delete an admin, head back into **Users** and click **Remove** to the right of the admin you wish to delete:

[![](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/remove_admin.gif)](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/remove_admin.gif)

</details>

<details>
<summary class="orange">Previous console UI</summary>

To delete an admin, head back into **Manage People** and click **EDIT** to the right of the admin you wish to delete:

[![](https://cdn.bayton.org/uploads/2017/10/ztc_deladmin_watermark.gif)](https://cdn.bayton.org/uploads/2017/10/ztc_deladmin_watermark.gif)

Click **DELETE**. There is no confirmation so ensure you’ve selected the correct admin before continuing!

</details>

## Adding resellers

Occasionally you may wish to change resellers when purchasing zero-touch compatible devices. While it’s perfectly acceptable to request the new reseller sets you up with an account, the more convenient option for managing all devices from within one console is to simply add the new reseller to the existing customer account. To do so, head over to **Resellers.**

<details open>
<summary class="orange">2024+</summary>

Active resellers will be shown in the default (left) tab, with all other resellers available via **Other resellers**. There's even a handy count to let you know how many you have to choose from.

[![](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/add_reseller.gif)](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/add_reseller.gif)

</details>

<details>
<summary class="orange">Previous console UI</summary>

[![](https://cdn.bayton.org/uploads/2017/10/ztc_addreseller_watermark.gif)](https://cdn.bayton.org/uploads/2017/10/ztc_addreseller_watermark.gif)

</details>

Scroll through the list of **Other Resellers** to locate the one you wish to add, then click **Enroll**.

Click **Enroll/CONFIRM** on the pop-up.

In the background, this sends a request to the reseller to accept your customer account. The reseller must accept your account in order to add devices into your console! Resellers cannot add themselves to your account without you opting to enrol, and once enrolled the new reseller cannot see the existing devices on your console, only those they add themselves.

## Removing resellers

To remove a reseller, preferably (but not necessarily) after all existing devices are unregistered and the relationship with the reseller terminated, head over to **Resellers**.

<details open>
<summary class="orange">2024+</summary>

[![](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/remove_reseller.gif)](https://cdn.bayton.org/android/android-enterprise-zero-touch-console-device-guide/remove_reseller.gif)

</details>

<details>
<summary class="orange">Previous console UI</summary>

[![](https://cdn.bayton.org/uploads/2017/10/ztc_delreseller_watermark.gif)](https://cdn.bayton.org/uploads/2017/10/ztc_delreseller_watermark.gif)

</details>

Scroll through the list of **Active Resellers** to locate the one you wish to remove, then click **Remove/DELETE**.

Click **Remove/CONFIRM** on the pop-up.

This will prevent the now-removed reseller from adding (or re-adding) devices to your console.