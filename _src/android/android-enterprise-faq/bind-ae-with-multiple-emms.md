---
title: 'Is it possible to bind Android Enterprise with multiple EMMs using one account?'
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
  key: 'Is it possible to bind one Android Enterprise/Organisation ID with multiple EMMs?'
  order: 7000
--- 

Historically this has not been possible. An Android Enterprise ID (organisation ID) is associated with only one EMM at a time, and a Google account can only manage one bind at a time; under all normal circumstances attempting to bind with the same Google account on another EMM will return an error stating an Enterprise already exists.

From mid-2024 however, with the roll-out of Google's new customer signup process designed to bring the enterprise arms of Google Cloud, Google Chrome/ChromeOS, and Android under one domain-managed account, this is no longer a limitation. 

With a new, enterprise domain-led bind approach, all organisations binding with their EMMs will be able to create an organisation account associated with a zero-cost managed Google Enterprise domain (think Google Workspace, or perhaps more apt, a Google Cloud Identity tenant). With this approach, once the domain is verified as owned by the organisation, multiple EMMs (or multiple accounts under one EMM) can create as many organisation IDs as desired, and all will be managed under one Google Enterprise console.

For organisations with existing binds to EMMs using a consumer Google/Gmail account, the existing, legacy behaviour still currently applies:

_Attempting to bind with the same Google account on another EMM will return an error stating an Enterprise already exists._

[It is possible to unbind](/android/android-enterprise-faq/delete-the-ae-bind/) from one EMM and then bind with another, however this will delete the existing Enterprise and create a brand new one, losing all approved applications, etc.

The only exception to the above is in high availability and/or disaster recovery scenarios where an instance of an EMM may be replicated, but no two EMMs should be generating managed Google Play accounts from the same Google account simultaneously.

Google are expected to support migrations to Google Workspace domains for existing organisations in the future.
