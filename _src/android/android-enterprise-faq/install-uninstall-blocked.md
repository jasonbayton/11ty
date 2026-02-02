---
title: "Why can’t I install or uninstall apps on my device?"
published: '2026-02-02'
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
  order: 21000
--- 
Devices managed using Android Enterprise may restrict the ability to install or uninstall applications.

**What causes this restriction?**

An administrator has enabled one or both of the following AMAPI controls:

- Disallow app installation  
- Disallow app uninstallation  

When enabled, Android blocks these actions at the system level. This applies to all installation methods, including Google Play, APK files, and third-party app stores. This also includes any EMM-derived app installs or removals.

**What will I see as an end user?**

The experience varies slightly by Android version and device manufacturer, but commonly includes:

- Applications sit in Google Play trying to install, but never complete
- Applications do not uninstall, showing a notification stating uninstallation failed

This can appear as a fault, but it is expected behaviour when the policy is active.

**Why would an organisation enable this?**

These restrictions are what could be considered the nuclear option, and override all other known application restriction policies. It means no matter what policies could be applied, the device will not deviate from the state it was in when the policies were set.

**Can I bypass this restriction?**

No.

**How do I install or remove an app I need?**

You’ll need to contact your organisation’s IT administrator or support team. They can:

- Temporarily lift the restriction if appropriate  
- Approve and remotely install the application  
- Add the app to an allowlist  

**Is this a bug?**

No.

If app installation or removal is blocked, the device is functioning exactly as configured. If the restriction is no longer required, the policy must be updated by the administrator.

Unfortunately this policy is set all too often as a default with the expectation EMM-derived application changes will override this policy. This is not the case.

If in doubt about app install/uninstall issues, validate these restrictions have not been set.