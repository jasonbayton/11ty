---
title: 'Google Play Protect no longer sends sideloaded applications for scanning on enterprise-managed devices'
date: '2024-09-23'
status: publish
author: 'Jason Bayton'
excerpt: "Farewell, bothersome prompts!"
type: post
tags:
    - Enterprise
---

In a surprise announcement last week, Google have confirmed sideloaded applications - such as those deployed via EMM solutions - will no longer be sent to Google servers for Google Play Protect scanning on enterprise-managed devices.

## Why apps are sent to Google

When an application is installed from a source other than Google Play, it is not considered safe by default. Google Play Protect, as part of the round-the-clock security it provides, tries to verify it. 

If the application doesn't match any known applications in the GPP database, it will ask the end user of the device to allow GPP to send the application up to Google's dedicated infrastructure to run the necessary security verifications. This off-device service then undertakes the necessary tasks to ensure it's safe, devoid of anything harmful, and any future devices that install the application benefit from GPP knowing of its existence ahead of time.

This doesn't happen with applications that come down from Google Play because they've already undergone this security validation during the Play Store approval process. GPP knows the application, knows where it's from, and in most cases now sees an association with Google Play in the application metadata itself. 

## Why organisations dislike it

While the service itself really can't be knocked (free security), the approach of requesting from end-users whether an application can be sent to Google is troublesome.

If an organisation relies on in-house, or line of business, applications typically installed via the EMM agent directly (rather than using the Google Play iFrame or console uploaded as a private application), they may be familiar with this on-device prompt:

![gpp upload](https://cdn.bayton.org/uploads/2024/gpp-upload-prompt.png)
_Source: [Google](https://support.google.com/work/android/answer/15162069?hl=en&ref_topic=9419963&sjid=7637041227870262975-EU#zippy=%2Csend-app-for-security-check)_

A disruptive, and oft-confusing interruption for end-users, this has caused questions around the quality, security, and trustworthiness of non-Google Play installed applications for years now. 

It is an entirely-consumer approach forced upon enterprise devices with no administrative control; had an API been present to define the answer to the above prompt (akin to how organisations can set permissions, for example) this likely wouldn't have been an issue.

## What's changing

As of the 6th of September (2024), applications sideloaded onto enterprise-managed devices, via any means, will no longer be sent for scanning, and thus the prompt will no longer present itself.

It is, in effect, a permanent "Don't send" preset for applications installed either into the parent profile for device owner deployments (fully managed, dedicated), or the work profile of a profile owner deployment, so yes, it applies to personally owned work profile devices also.

## What it means for organisations

While sending applications for scanning will no longer be done, Google Play Protect remains active on devices. This is **not** a full disablement of on-device security, as on-device detection and prevention continues to function; known malicious apps, however they're installed, will still be flagged and may be removed.

Beyond this, nothing really changes in terms of recommendations for the overall management of applications from unknown sources. Where possible it should be blocked by default. 

## How this came to be

This announcement stems from a [lengthy & passionate post](https://www.androidenterprise.community/t5/general-discussions/is-there-any-way-to-disable-google-play-protect-gpp-from-an-emm/td-p/2507) on the Android Enterprise Customer Community, further highlighting the importance of the CC for direct feedback into Google and respective product teams. 

It's a considerable win for the community and those who use it 😁

If you're on the fence about joining up to share your own feedback, I would hope this example of Google and the customer ecosystem working together to improve the experience for everyone offers the nudge you need. Find a link to join in the share box below 👇