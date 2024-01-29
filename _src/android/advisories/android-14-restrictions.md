---
 title: "Major Android 14 bug permanently applies management restrictions"
 date: '2023-11-30'
 status: publish
 author: 'Jason Bayton'
 excerpt: "The bug leads to irreversible application of restrictions, a full device wipe is the only option for resolution if policies later need to be changed."
 type: post
 layout: base.njk
 tags:
     - Advisories
---
Google has acknowledged an issue with the management of Android 14 devices that renders restrictions applied to devices irremovable once set unless unenrolled and re-enrolled.

It's a significant issue for both upgraded and factory-shipped Android 14 devices with no current fix.

Unfortunately even when a fix does roll out, impacted devices will remain impacted, based on current information, and will still require re-enrolment to resolve their stuck state.

There's no public Customer Community service announcement detailing the issue at the moment, however VMware have gone into great detail on this issue, down to the degree of which configurations are affected specifically, linked below.

For now, it is advised to avoid upgrading and/or deploying 14 unless you're willing to accept a re-enrolment for policy adjustments at a later date. In any case, take the time now to review policies and ensure they're as you intend them to be for your Android 14 estate, they may be stuck this way for a while.

🔗 [https://kb.vmware.com/s/article/95776](https://kb.vmware.com/s/article/95776)

Update: Public customer community announcement:

🔗 [https://www.androidenterprise.community/t5/service-announcements/in-progress-some-management-policies-are-made-permanent-on/ta-p/1494](https://www.androidenterprise.community/t5/service-announcements/in-progress-some-management-policies-are-made-permanent-on/ta-p/1494)

🛟 For help or guidance, feel free to [reach out](/support/).