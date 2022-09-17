---
title: 'How to locate a private Android app assigned to an organisation ID'
published: '2021-02-17T13:04:32+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Diving deeper
    - App management
layout: base.njk
eleventyNavigation:
  key: 'How to locate a private Android app assigned to an organisation ID'
  order: 5000
discourse_permalink:
    - 'https://discuss.bayton.org/t/how-to-locate-an-android-private-app-assigned-to-an-organisation-id/402'
---
An issue that often pops up is being unable to locate within the Google Play iFrame a private application which has been assigned to your organisation (enterprise) ID by an external developer or developer account.

Often for applications intended not to be made available on the public Google Play Store, a developer will instead opt to publish the app privately for up to 100 unique organisation IDs.

![](https://r2_worker.bayton.workers.dev/uploads/2021/02/image.png)

When searching for an app which has been assigned to your organisation ID, you may note it is not immediately visible within the Google Play iFrame, nor on play.google.com/work. Often this is mistaken for propagation, however in reality it’s a limitation of Play today.

A simple method to locating the app is simply searching for the package name, with `pname:` prepended to it, as follows:

`pname:app.package.name`

![](https://r2_worker.bayton.workers.dev/uploads/2021/02/image-1.png)

This should, under most circumstances, bring up the application in question, from which you’ll be able to approve and distribute it normally.