---
 title: "Deprecation of the old managed Google Play iFrame app approval flow"
 date: '2023-08-24'
 status: publish
 author: 'Jason Bayton'
 excerpt: "The way applications are approved is changing."
 type: post
 layout: base.njk
 tags:
     - Advisories
---
Be aware, a year after Google [deprecated the old app approval APIs](https://developers.google.com/android/work/deprecations#app_approval_september_1_2022), EMMs are now switching over to the new flow. **This does not impact AMAPI-based EMMs**, with the exception of Intune.

Admins will no longer see an approve button for applications in the managed Google Play iFrame, and will instead see a select button instead.

[SOTI](https://discussions.soti.net/articles/google-managed-playstore-emm-deprecations-coming-in-december-1-2023-1) and [Intune](https://techcommunity.microsoft.com/t5/intune-customer-success/support-tip-intune-moving-to-support-new-google-play-android/ba-p/3849875) announcements for reference. Note, customers may have to upgrade their EMM version if using a locally hosted solution, to avoid a disruption to functionality later this year.

[More info](/android/google-play-iframe-approval-change/)

🛟 For help or guidance, feel free to [reach out](/support/).