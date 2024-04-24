---
title: 'How do I remove the Android Enterprise bind from my current EMM?'
published: '2019-04-26T16:39:55+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 7001
--- 
<div class="callout">

**What is the bind?**

If you're not entirely sure what the Android Enterprise bind _is_, check out [this](/android/android-enterprise-faq/what-is-the-bind/) FAQ.

</div>

If you need to unbind from your existing EMM, whether to - 

- Move to another EMM
  - Related: [Is it possible to bind with multiple EMMs at once?](/android/android-enterprise-faq/bind-ae-with-multiple-emms/)
- Start afresh with a new enterprise ID
  - If you're considering this because you can no longer access your existing bind, Google can assist. Escalate to your EMM who can in turn raise it as a partner ticket either through their BD or the Partner Portal. If the EMM is unhelpful, raise it in the [Android Enterprise Customer Community](https://androidenterprise.community) & tag me ([@jasonbayton](https://www.androidenterprise.community/t5/user/viewprofilepage/user-id/11)).
  - If you're considering this because you want to use a **new account** to administer the bind, [you don't need to](/android/android-enterprise-faq/manage-bind-account/)!

Or any other perfectly valid reason, the steps to follow are straightforward.

<div class="callout">

Be aware before you delete the bind, that **it is not reversible**. All devices will be unenrolled, all private applications will be inaccessible, and all data associated with the old enterprise will not be recoverable!

This is a **permanent** action.

</div>

**Via your EMM**

In the first instance, the simplest course of action is to unbind through your EMM. Here are some current links to this:

- [Ivanti EPMM/MobileIron](https://help.ivanti.com/mi/help/en_us/CORE/11.x/dmga/DMGfiles/Removing_Android_enterpr.htm)
- [SOTI](https://www.soti.net/mc/help/v15.2/en/console/devices/managing/enrollment/androidplus/enterprise/mgpa_enterprise_delete.html)
- [VMware Workspace One UEM](https://docs.vmware.com/en/VMware-Workspace-ONE-UEM/services/Android_Platform/GUID-AndroidRegistrationRegisterAndroidwithWorkspaceONE.html)
- [Intune](https://docs.vmware.com/en/VMware-Workspace-ONE-UEM/services/Android_Platform/GUID-AndroidRegistrationRegisterAndroidwithWorkspaceONE.html)

_Feel free to [submit a PR](https://github.com/jasonbayton/11ty/blob/main/_src/android/android-enterprise-faq/delete-the-ae-bind.md) with additional EMM articles!_

Some platforms don't support removing the bind through EMM administrative settings. Some platforms, like SOTI, only _unbind_ and don't _delete_ the enterprise ID. This is useful for future rebinding if platforms support it, but otherwise it's another step in the process an organisation is forced to take to _fully delete_ the bind.

**Via Google Play admin settings**

If the EMM platform doesn't support deleting the bind, or if you no longer have access to the EMM to do so, you can head to Google Play Enterprise admin settings to do so:

1. Head to Google Play Enterprise admin settings - [https://play.google.com/work/adminsettings](https://play.google.com/work/adminsettings)
2. Select the menu dots on the right of your organisation
3. Delete organisation
4. Confirm delete

Here's a handy GIF that runs through it:

![](https://cdn.bayton.org/uploads/2024/delete-bind/2024-04-24_12.31.35.gif)

<div class="callout">

As indicated, the enterprise cannot be deleted with multiple admins present, so if you need to delete it, remove existing admins first.

</div>

With the bind removed, you're now ready to re-use the account to create a new bind with your existing or alternative EMM provider.

