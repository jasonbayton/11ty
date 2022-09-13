---
title: "What’s the difference between allow adding accounts vs allow configure credentials?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - AE FAQ
    - AE General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "What’s the difference between allow adding accounts vs allow configure credentials?"
  order: 12000
--- 
Adding accounts allows end-users to head into `Settings > Accounts` and add an account.

Configure credentials allows an end-user to configure account credentials in-app.

Both options have legitimate uses, for example the adding of accounts and configuring of credentials may be permitted in a COPE deployment as end-users would be allowed to add a Google account and download their own applications complete with personal accounts.

On the other hand, enabling add accounts in a fully managed or work profile deployment scenario would allow end-users to switch to their personal Google account within Google Play, providing full access to the Play Store from which they may install applications which encourage data leakage and raise DLP concerns (Dropbox sat alongside OneDrive, for example).

