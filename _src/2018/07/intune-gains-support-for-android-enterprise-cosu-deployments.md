---
title: 'Intune gains support for Android Enterprise COSU deployments'
date: '2018-07-08T15:42:45+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 6334
tag:
    - android
    - 'android enterprise'
    - EMM
    - 'Enterprise Mobility'
    - intune
    - MDM
    - zero-touch
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/intune-gains-support-for-android-enterprise-cosu-deployments/161'
tags:
    - Enterprise
---
This week, Microsoft edged a little further into the world of modern Android management with the [introduction](https://docs.microsoft.com/en-us/intune/whats-new#device-management) of COSU support for Android Enterprise deployments.

Up until this announcement, the only available options for organisations leveraging Intune were legacy management (device administrator) or work profile, an entirely BYOD-focused Android Enterprise deployment scenario only offering organisations management of a dedicated work profile on the device, and not the device itself (with a few security-related exceptions).

<div class="bs-callout bs-callout-success">### What is Android Enterprise?[ ](/android/android-enterprise-device-support/#what-is-android-enterprise)

For information regarding Android Enterprise, including what it is, the deployment scenarios stated below and how it can benefit organisations, have a read of [What is Android Enterprise and why is it used?](/android/what-is-android-enterprise-and-why-is-it-used/)

</div>Improved Android Enterprise support has been a long-requested feature for Intune and although this announcement will only quell those looking for kiosk-type deployments today, it’s an important first step towards wider work-managed ([COBO](/android/android-glossary/#cobo)) and fully managed work profile ([COPE](/android/android-glossary/#cope)) deployments that’ll be developed next.

Few EMMs are opting to leverage the native Android kiosk solution today as it’s somewhat lacking in features and functionality. Much like MobileIron and <del>AirWatch</del> Workspace One UEM, Microsoft are no exception; rolling their own COSU launcher developed by the same team responsible for the consumer [Microsoft launcher](https://play.google.com/store/apps/details?id=com.microsoft.launcher&hl=en_GB), it should offer a pretty good experience for end-users. With P around the corner it’ll be interesting to see if the custom launcher approach fades given the effort gone into improving the native experience, likewise if EMMs currently maintaining custom launchers will eventually switch to native and thus adopt a universal UX for COSU deployments cross-EMM. I’m not holding my breath, but it’s an interesting thought.

Interestingly, Microsoft are also the first I’ve actively seen utilising the Android Management API (AMAPI) to bring COSU support to market. AMAPI offers a simple, feature-rich solution for EMMs who can’t or don’t want to spend time building out a custom DPC for Android Enterprise management, and it makes sense that Microsoft, with only work profile implemented up to this point, would leverage it in order to have zero-day support for new functionality directly from Google, as well as benefits like Android zero-touch support out of the box.

<div class="bs-callout bs-callout-success">### What is Android zero-touch enrolment?[ ](/android/android-enterprise-device-support/#what-is-android-enterprise)

Learn more about the future of out-of-box provisioning for Android Enterprise work-managed devices: [What is Android zero-touch enrolment?](/android/what-is-android-zero-touch-enrolment/)

</div>While Microsoft aren’t listed on the [zero-touch portal](https://partner.android.com/zerotouch) at the time of writing, it won’t be too long before Intune can be selected from the DPC dropdown when creating a zero-touch configuration, they’ve even got their DPC extras ready to go:

```
{
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": { 
"com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN": "<strong>YourEnrollmentToken</strong>" 
}
}
```

*The above DPC extras may look different to Microsoft’s own, which is because at the time of writing they appear to be re-using the QR-based DPC extras, stipulating download location of the agent and such, which is not required. I’ve also added the system application toggle to the above, which is a useful option to configure.*

Once again, a great start and I’m looking forward to seeing Microsoft build out the work-managed deployment scenarios further; with COSU sharing the same basic work-managed device implementation as COBO and COPE, it shouldn’t take too much longer to extend their offering, thus making Intune a viable player in the modern Android management ecosystem.

I get a lot of Intune related queries both in and out of work, and have had to understandably divert a lot of organisations away from Intune due to the lack of work-managed support for devices up to now. While COSU won’t suit all organisations, those who need it will finally no longer have to look for alternative solutions, temporary or otherwise.

This update will be rolling out to tenants as features normally do. For more information and to get started for Intune customers, check out this helpful [Microsoft document](https://docs.microsoft.com/en-us/intune/android-kiosk-enroll), and look out for further updates from Microsoft over the next week. I may also post a few updates here or on [LinkedIn](https://linkedin.com/in/jasonbayton) once I’ve had the opportunity to try it myself.

Android for Work no more
------------------------

The other noteworthy update this week is the change from *Android for Work* to *Android Enterprise*.

Almost 2 years after Google introduced the new name, Intune was one of few, for reasons entirely unknown to me, who were yet to do a *find and replace* on their solution to bring the branding in line. Now, that has finally been resolved.

Why does this matter?

Every document, solution or service that still references Android for Work contributes to confusion between Android for Work and Android Enterprise I regularly come across when talking to organisations; the sooner this is updated, the better for the ecosystem as a whole (as would Google not renaming things all the time, I know..).

Solid updates all around!

*What are your thoughts on COSU support? Have you been waiting on Microsoft to provide support for it? Did you migrate to another EMM in order to manage Android Enterprise devices? Will you be moving back to Intune if so? Let me know in the comments, [@jasonbayton](https://twitter.com/jasonbayton) on Twitter or [/in/jasonbayton](https://linkedin.com/in/jasonbayton) on Linkedin.*