---
title: 'Android Enterprise zero-touch console administration guide'
date: '2017-10-29T22:08:13+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Diving deeper
layout: base.njk
id: 4812
doccats:
    - Android
Version:
    - '1.6'
publish_post_category:
    - '6'
discourse_permalink:
    - 'https://discuss.bayton.org/t/android-enterprise-zero-touch-console-administration-guide/32'
FeaturedBackground:
    - android
---
<div class="callout callout-success">### What is zero-touch enrolment?

Zero-touch enrolment has been covered in depth in [What is Android zero-touch enrolment?](/docs/enterprise-mobility/android/what-is-android-zero-touch-enrolment/) This document offers a good overview of what it is and why zero-touch is the future of Android management.

</div><div class="callout callout-info">### This guide is intended for Organisations

There are two scenarios for which the zero-touch console is used, as an organisation or as a reseller. This guide targets the former, a good resource for resellers can be found [here](https://developers.google.com/zero-touch/guides/portal/).

</div>Prerequisites
-------------

In order to gain access to the zero-touch console and configure devices, you must:

- Purchase zero-touch compatible devices from authorised resellers.
- Ensure the reseller creates a new zero-touch enrolment account on [partner.android.com/zerotouch](https://partner.android.com/zerotouch)
- Ensure the reseller assigns your purchased devices to your portal.

Any of the above steps not completed will result in an inability to configure devices.

Getting started
---------------

<div class="wp-caption alignnone" id="attachment_4838" style="width: 1150px">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/10/ScreenShot2017-10-18at3.45.10PM.png)*The simple zero-touch process*

</div>The zero-touch portal is designed with absolute simplicity in mind; much like the DEP portal (if you’ve ever used it) it’s basically there for you to infrequently log in, create or assign a config to managed devices and carry on with all other management via your normal EMM solution.

Creating configurations
-----------------------

Once logged in, head over to **Configurations** to set one (or more) up, ready to assign to your devices:

[![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/10/ztc_createconfig_watermark.gif)](/wp-content/uploads/2017/10/ztc_createconfig_watermark.gif)

Click the **+** icon on the right-hand side of **Configurations** to create a new configuration. This will trigger a popup.

To start, simply provide a configuration name, and then from the dropdown, a DPC (or EMM agent).

Following that is DPC extras, within this field you can paste in DPC-specific key-value pairs that add additional functionality. The key-value pairs differ by EMM so it’s best to validate before pasting anything here, leaving it blank is also fine. An example of what could go there for a MobileIron Core is as follows and more examples can be found on the [zero-touch FAQ](/docs/enterprise-mobility/android/android-enterprise-zero-touch-faq/#what-should-i-put-in-dpc-extras):

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

When complete, click **APPLY** to save the configuration and close out the popup.

Setting a default configuration
-------------------------------

Once you’ve created several configurations (or even just the one), you may wish for all devices added by a reseller to be given a configuration by default, thus avoiding having to sign into the console every time a new device order is made. Above the list of configurations is a **Default Configuration** setting:

[![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/10/ztc_defaultconfig_watermark.gif)](/wp-content/uploads/2017/10/ztc_defaultconfig_watermark.gif)

Simply click the arrow to the right of **Select a configuration** and choose one from the dropdown list.

Applying configurations manually
--------------------------------

Click on **Devices** on the left-hand side. Once loaded you’ll be presented with a search area and a list of registered devices. Devices can be searched for based on IMEI, MEID or Serial number, or simply located by scrolling down the list.

Once located, click the arrow to the right of **No config** (or a presently-selected configuration) to open a dropdown, wherein you may select your newly created configuration(s).

[![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/10/ztc_deviceconfig_watermark.gif)](/wp-content/uploads/2017/10/ztc_deviceconfig_watermark.gif)

Confirm this selection when prompted. The device will now automatically enrol into the EMM of your choice when either first taken out of the box or on the next factory reset!

Deleting configurations
-----------------------

Should a configuration no longer be required, head back into **Configurations** and click **EDIT** to the right of the configuration you wish to delete:

[![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/10/ztc_delconfig_watermark.gif)](/wp-content/uploads/2017/10/ztc_delconfig_watermark.gif)

Click **DELETE CONFIG**. There is no confirmation so ensure you’ve selected the correct one before continuing!

Removing devices
----------------

Should a device no longer require management, be that due to it being a parting gift for a leaving employee, device destruction or anything else, use the search area or scroll down the device list to locate the device on the **Devices** page. Once located, click **UNREGISTER**.

[![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/10/ztc_deviceunregister_watermark.gif)](/wp-content/uploads/2017/10/ztc_deviceunregister_watermark.gif)

You’ll need to confirm this action and please be aware **this is not easily reversible**! Once unregistered, you’ll need to contact your reseller to re-add the device back into your console manually; not an action to be taken on a whim.

Adding admins
-------------

The zero-touch console offers the ability to add other users for easier management. There are two roles available when adding a user, **Owner** and **Admin**. The only real difference between the roles is admins cannot add other admins, these roles can be changed at any time. To get started, click on **Manage People**:

[![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/10/ztc_addadmin_watermark.gif)](/wp-content/uploads/2017/10/ztc_addadmin_watermark.gif)

Click the **+** icon on the right-hand side of the organisation name to add a new admin. This will trigger a popup.

Input the **Email Address**, **Role** and click **APPLY.**

Removing admins
---------------

To delete an admin, head back into **Manage People** and click **EDIT** to the right of the admin you wish to delete:

[![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/10/ztc_deladmin_watermark.gif)](/wp-content/uploads/2017/10/ztc_deladmin_watermark.gif)

Click **DELETE**. There is no confirmation so ensure you’ve selected the correct admin before continuing!

Adding resellers
----------------

Occasionally you may wish to change resellers when purchasing zero-touch compatible devices. While it’s perfectly acceptable to request the new reseller sets you up with an account, the more convenient option for managing all devices from within one console is to simply add the new reseller to the existing console. To do so, head over to **Resellers.**

[![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/10/ztc_addreseller_watermark.gif)](/wp-content/uploads/2017/10/ztc_addreseller_watermark.gif)

Scroll through the list of **Other Resellers** to locate the one you wish to add, then click **ENROLL**.

Click **CONFIRM** on the popup.

In the background, this sends a request to the reseller to accept your customer account. The reseller must accept your account in order to add devices into your console! Resellers cannot add themselves to your account without you opting to enroll, and once enrolled the new reseller cannot see the existing devices on your console, only those they add themselves.

Removing resellers
------------------

To remove a reseller, likely after all existing devices are unregistered and the relationship with the reseller terminated, head over to **Resellers**.

[![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2017/10/ztc_delreseller_watermark.gif)](/wp-content/uploads/2017/10/ztc_delreseller_watermark.gif)

Scroll through the list of **Active Resellers** to locate the one you wish to remove, then click **DELETE**.

Click **CONFIRM** on the popup.

This will prevent the now-deleted reseller from adding (or re-adding) devices to your console.