---
title: 'What is the Android Enterprise "bind"?'
published: '2023-05-13'
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
  order: 1120
--- 
Throughout this site and across Google's official documentation and resources there are multiple references to the _bind_, or binding of a Google account to an organisation's EMM/MDM platform of choice in order to use Android Enterprise, but what is it?

Android Enterprise consists, very simplistically, of three aspects:
1. the on-device APIs
2. the advanced account, application, and Play Protect functionality 
3. the additional solutions, such as zero-touch and many more 3rd party offerings

In order to leverage 2 and 3, an `enterprise` is required. This enterprise is created when an organisation goes through the process of linking a Google account - either via Google Workspace or with a standard consumer Google account (@gmail.com or under an existing email address) - to their EMM. 

For the organisation it's a reasonably straightforward sign-in and setup flow (at least for those who don't use Workspace) that'll create an enterprise, which generates the appropriate authentication tokens and assign an enterprise ID to allow the EMM to then handle all account and application management going forward.

What sort of account and application management?
- The EMM will create, maintain, and delete managed Google Play accounts (for non-Workspace deployments)
- The EMM will assign the appropriate account to one or more devices, depending on use case (user or device-based)
- The EMM can import and deploy approved applications
- etc

This is a very high-level explanation only, and doesn't cover off the intricacies of things like Play EMM API, AMAPI, differences between Google Workspace and Google accounts, and a multitude of other factors that determine the features and functionality associated with binding for device management.