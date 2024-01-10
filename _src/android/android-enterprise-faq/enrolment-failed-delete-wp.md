---
title: "Enrolment failed but the work profile was created. How do I remove it?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Work profile
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "Enrolment failed but the work profile was created. How do I remove it?"
  order: 21000
--- 
There are a few options available:

**Reboot the device and re-enrol** as sometimes all it takes is a reboot, and the EMM will prompt it’s deletion as it provisions the profile once again.

**Manually delete the work profile** by heading to *Settings &gt; Accounts*. The work profile will be listed and should be removable here.

**Connect the device to ADB** if the profile still won’t delete. This requires enabling ADB debugging on the device via Developer options and a working ADB setup on a computer. A Google search will assist in getting this setup if necessary. Once the computer can detect the device over ADB, run the following:

`adb shell pm list users`

This should return a list of active users where user 0 is the parent (device/default) user, and any other number (10, 12, 200 etc) should be the work profile. 

<div class="callout">

**Heads up**

OEMs such as Samsung use additional users for solutions like _Secure Folder_. Here's an example:

```
Users:
  UserInfo{0:Owner:4c13} running
  UserInfo{12:Work profile:1030} running
  UserInfo{150:Secure Folder:10061030} running
```

Since the account list is normally annotated with the user type, it shouldn't be difficult to differentiate which user does what, but keep this in mind on older Android versions or those from OEMs that modify how this behaves.

</div>

To remove the work profile run:

`adb shell pm remove-user 12`

Making sure of course the number reflects the returned value in the previous command.

This should remove the work profile.

