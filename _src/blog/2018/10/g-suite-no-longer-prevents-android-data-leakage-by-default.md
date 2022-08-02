---
title: 'G Suite no longer prevents Android data leakage by default'
date: '2018-10-29T13:17:45+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 6780
tag:
    - android
    - androidenterprise
    - data
    - dataleakage
    - EMM
    - gsuite
    - MDM
    - Mobile
    - uem
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/g-suite-no-longer-prevents-android-data-leakage-by-default/235'
tags:
    - Enterprise
---
On September 19th, Google introduced a change to the default app settings for Android management on newly-created tenants which may lead to data leakage for organisations.

Google explains the change as follows:

> Currently, you have to actively whitelist apps to make them available to your users. Starting on September 19th, users with company-owned Android devices and work profiles will be allowed to install any app from the managed Google Play store by default. If you don’t want your users to do this, you can choose to [restrict app availability to whitelisted apps](https://support.google.com/a/answer/6328701).
> 
> <cite>*[Making is easier to set up Android devices as company-owned](https://gsuiteupdates.googleblog.com/2018/09/company-owned-android-devices-gsuite.html)*</cite>

What this means
---------------

On the face of it this appears innocent enough, however in reality this will now allow end-users to install any application, without restriction, within the corporate work profile or onto a work-managed device unless a G Suite administrator actively reverts this to approved applications only.

As it happens, the option to allow installation of any application from the Play Store has been there for some time, but administrators have been required to opt in to this capability. Google’s change simply reverses this process and in doing so, makes Android deployments less secure by default.

Why this matters
----------------

The reason this is dangerous is simple: by allowing any application to be installed from the Play Store rather than limiting it to approved applications only, end-users could quite easily install chat apps, cloud storage services and more alongside corporate applications and data, with no restrictions on data being moved from app to app.

This change flies very much in the face of best practices and recommendations across the industry, breaking the work/personal barrier UEM solutions have been putting in place with containerisation for years before Android itself brought about the work profile and managed Google Play for tailored app deployment.

Existing tenants are unaffected
-------------------------------

Thankfully this doesn’t affect organisations who have connected an external EMM/UEM platform for device management, nor does it appear to have been implemented on existing tenants, and thus the chances of a change happening on a live environment without adequate notice is slim (though I’d never rule it out with Google).

How to revert the change
------------------------

For those who create a G Suite tenant after the 19th however, the fix is quite simple, requiring only the click of a radio button to return expected, basic security:

<figure class="wp-block-image">![](https://r2_worker.bayton.workers.dev/uploads/2018/09/image-3.png)<figcaption>*This page should be found [here](https://admin.google.com/AdminHome?fral=1#MobileSettings:section=mam&flyout=android_apps)* *once logged in*</figcaption></figure>Conclusion
----------

The question though is why Google would intentionally make this change; who decided enabling data leakage for the the sake of what I can only imagine is convenience for organisations who don’t wish to prevent end-users installing their own apps is more important than ensuring the organisations who want security by default get it out of the box?

I certainly hope this doesn’t catch any organisations out, but I’m almost certain it may.

*Are you a G Suite customer? How do you feel about this change? Reach out to me on [Twitter](https://twitter.com/JasonBayton), [LinkedIn](https://www.linkedin.com/in/jasonbayton/) or in the comments to let me know!*