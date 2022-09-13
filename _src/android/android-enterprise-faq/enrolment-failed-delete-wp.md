---
title: "Enrolment failed but the work profile was created. How do I remove it?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - AE FAQ
    - AE Work Profile
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

```
adb shell pm list users
```

This should return a list of active users where user 0 is the parent (device/default) user, and any other number (10, 13, 200 etc) is the work profile. To remove the work profile run:

```
adb shell pm remove-user 13
```

Making sure of course the number reflects the returned value in the previous command.

This should remove the work profile.

## Submit a question

Need something else answered? Submit an [issue](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D), tweet [@jasonbayton](https://twitter.com/jasonbayton) or tag me in a [LinkedIn](https://linkedin.com/in/jasonbayton) post. Questions may be republished on this document, or form the basis of a new document under [/android](/android).