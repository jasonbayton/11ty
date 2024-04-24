---
title: 'Can I change the account I used to bind Android Enterprise?'
published: '2023-05-11'
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
  order: 6999
--- 
Yes, it is more recently possible to configure the accounts responsible for managing the Android Enterprise organisation (enterprise) ID

1. Log on to [managed Google Play admin](https://play.google.com/work/adminsettings)
2. Scroll down to **Admins**
3. Add or remove Google accounts as desired

**Add an account**

![](/image/2023-05-12_23.01.04.gif)

**Adjust permissions**

![](/image/2023-05-12_22.31.51.gif)

NB: **Owners** can add and remove other accounts, while **Admins** are limited to only managing the enterprise. This follows the same permissions model as other enterprise solutions Google offers, such as zero-touch.

**Remove an account**

![](/image/2023-05-12_22.32.07.gif)

**Notes**

The same recommendations continue to apply when adding new accounts - if you're making a new Google account to add in, please use the "current email address" option and associate the Google account with a work email address. This makes account recovery much simpler, and avoids questions around why `emm.account.3@gmail.com` exists in future.

![](/image/Screenshot_2023-05-13_08.03.57.png)

In other words, don't do what I did when I bound my EMM to `emmsetup@gmail.com` back in 2017 (see above).

Note also that **Google Workspace accounts are not supported** for administering enterprises. If a Google Workspace user is invited, they will receive an invite only to be informed "G Suite users are not supported":

![](/image/Screenshot_2023-05-13_08.11.58.png)

Perhaps this will be addressed in future, or at the very least engineering will update the message to reflect the Google Workspace branding.

One final point to mention, a Google account can only administer _one_ enterprise. If an invited account is already administering another enterprise, they will see an error:

![One enterprise per account](/image/Screenshot_2023-05-15_14.18.02.png)

