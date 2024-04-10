---
 title: "Android will not permit install of very old apps from 14"
 published: '2023-06-23'
 status: publish
 author: 'Jason Bayton'
 excerpt: "You'll now see security exceptions for new installations of non-compliant apps."
 type: documentation
 layout: base.njk
 tags:
     - Advisories
---
From Android 14 it is no longer possible to install any application that targets below API level 23 - Android 6.0. Attempting to do so will trigger a security exception. Applications already installed will remain untouched, however new installs on any device that hasn't previously had the application will fail.

Be sure to update your applications to target a recent API level (or at least 6.0) before deploying any Android 14 devices into your estate. This will become a rolling policy, incrementing an API level with every future release.

Check the [techdoc](/android/android-14-minimum-sdk/) for more info.

🛟 For help or guidance, feel free to [reach out](/support/).
