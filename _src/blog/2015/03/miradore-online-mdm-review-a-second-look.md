---
title: 'Miradore Online MDM review: A second look'
date: '2015-03-31T20:30:26+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 2113
tag:
    - EMM
    - 'free MDM'
    - management
    - MDM
    - Miradore
    - Mobile
    - 'mobile device management'
post_format: []
post_views_count:
    - '3775'
tags:
    - Enterprise
    - Reviews
---
<div class="callout callout-danger">#### This topic has been covered more recently

This article was published in 2015. There is a new article you may find interesting if you’re interested in the Business or Enterprise subscriptions: [Miradore Online MDM: Expanding management with subscriptions](/2016/02/miradore-online-mdm-expanding-management-with-subscriptions/).

</div>**In the world of technology** 8 months is equivalent to *several years* in some industries, yet that’s how long it’s been since my [First look](/2014/07/miradore-online-free-mdm/ "First look: Miradore Online free MDM") at [Miradore](http://www.miradore.com)’s new, [free MDM solution](http://www.miradore.com/) which was taking the enterprise mobility market by storm back in 2014.

Now, almost a year on and officially [out of beta](http://www.miradore.com/blog/miradore-online-moves-successfully-beta-production/), I’ve dusted off my account for another look to see what’s changed, what hasn’t and to get a hands on with their new business tier; a paid upgrade to add just that little bit more to what has already proven to be a great little MDM solution.

Ready? Off we go.. (or [jump straight to the Business review](#business))

Reactivating the account
------------------------

The first thing I was greeted with after logging in was a prompt to *reconnect or recreate* my MDM tenant. My previous tenant had gone some months ago, removed after sitting dormant for too long.

[![Screenshot (16)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-16-1500x884.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-16.png)

At some point after last July I switched devices and neglected to re-enrol, meaning a countdown began on my tenant which would ultimately result in it being removed. Had I not ignored the several emails that gave me months of warning, this wouldn’t be the case! However I did, and this happened.

I’m not even mildly perturbed by this. Sure, a couple of device records and some *historical* data is now gone, but that doesn’t matter. If I didn’t need it over the months the account sat dormant, I don’t need it now. Miradore’s policy for removing dormant tenants absolutely makes sense; with the amount of signups for the free solution they have had ([at least 1500](http://www.miradore.com/blog/miradore-online-moves-successfully-beta-production/) over the course of the beta) keeping all of those accounts and their respective data active indefinitely would be a massive waste of resources.

Setting up my tenant again was as simple as typing a (company) name, agreeing to the T&amp;C’s (tenuous link: [always know what you’re agreeing to](https://www.linkedin.com/pulse/20140807084450-28745130-byod-management-yes-we-can-wipe-your-phone)) and clicking “Create and start”.

Voilà:

[![miradoredash](/https://r2_worker.bayton.workers.dev/uploads/2015/03/miradoredash.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/miradoredash.png)

Logging in brings me back onto the familiar dashboard. Unlike some popular platforms, Miradore has refrained from progressively cluttering the interface with every update and new feature; they have managed to keep it clean, recognisable and simple to use – I’m not left wondering how to undertake tasks I’ve done previously which is a lot more than can be said for some platforms (did you hear that, AirWatch?).

In fact, aside from the new subscription option on the navigation, a few additions to the dashboard, a notification centre in top right corner and a few new features listed within the action panels (that show up only when relevant), Miradore Online looks almost the same as it did last year.

What’s new?
-----------

Navigating through the console, it’s apparent there have definitely been a *few* new features added since my last review…

### Windows Phone management

Windows Phone is working towards becoming the OS of choice for Wintel-only businesses the world over and currently occupies [29% of Miradore’s total managed estate](https://twitter.com/MiradoreLtd/status/580398480121806848). With the addition of some fairly granular Windows Phone restrictions, devices running WP8.0 and over now benefit from management on a similar level to iOS, something that would have been but a pipe-dream not too long ago.

They’ve even gone as far as to implement push notifications using Microsoft’s WNS (Windows \[Push\] Notification Service) which allows for direct, ad-hoc immediate communication with a Windows Phone (8.1+) device rather than relying on scheduled server connections.

Now that Miradore is able to manage both iOS and Windows Phone with a similar level of granularity, Android – the most “open” (comparatively) of all three platforms – is left to play catchup in the background.

[![image003](/https://r2_worker.bayton.workers.dev/uploads/2015/03/image003.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/image003.png)

### Self-service enrolment

Miradore implemented self-service enrolment around the time I published my [first look](/2014/07/miradore-online-free-mdm/ "First look: Miradore Online free MDM") last July. It allows for *registered* *users* with the unique company PIN assigned to each tenant to enrol their own devices.

The feature is an improvement over expecting an admin to send an enrolment request for every device (bearing in mind there is no device limit, an organisation could really go to town on the free tier!) however I still find it to be lacking. Miradore still requires you manually add every user to the platform in order for them to self-enrol. This isn’t an issue for LDAP-enabled environments where you can make use of Miradore’s LDAP connector, nor if you’re able to bulk-upload a fixed, unchanging group of users using Miradore’s import tools all in one go, but for any other situation it’s still potentially a lot of work for the admin.

As an admin of over a thousand ever-changing users (and growing) myself, the thought of doing this on a large scale is rather daunting. Competing platforms provide email domain verification; an admin would set (after verifying ownership) a white-listed domain for enrolment and allow any user with that email domain to enrol.

That would be one task rather than several (or several hundred!) and I’d like to see Miradore adopt a similar approach here. White-listing a domain to me seems like the most logical, hands-off way of managing user enrolments.

[![Screenshot_2015-03-13-20-58-06](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot_2015-03-13-20-58-06.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot_2015-03-13-20-58-06.png)

### Manual sync and profile removal

A somewhat more recent addition is the ability to manually remove profiles on managed devices. While not something to shout from the rooftops, the ability to remove a profile and redistribute it in a support situation is very handy.

[![syncnow](/https://r2_worker.bayton.workers.dev/uploads/2015/03/syncnow.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/syncnow.png)

Along the same lines the ability to manually sync a device ad-hoc is something you wouldn’t know you needed until you ran into trouble. Relying on server sync schedules on an occasion where you need to contact/update the device immediately is immensely useful and a welcome addition.

### Reporting

Reports are possibly one of the most important features I look for in any MDM solution. The frustration I’ve encountered with some of the leading platforms when trying to export the most basic of information is worth a whole post in itself, but it doesn’t have to be this way; for reports to be successfully executed, I like to see the following:

- Granular: per device/per group or org/per OS/version (versioning is a plus)
- Customisation: I may not find 90% of your “default” columns useful. Let me choose.
- Schedules: I don’t want to have to run reports manually. Email them to me regularly.

Miradore’s free version does two of these very well. Where some solutions dumb-down the report generation process and severely limit what can be reported on, Miradore go the complete opposite by providing in the region of 140 different variables to generate reports against.

[![Screenshot (22)_conflict-20150321-071824](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-22_conflict-20150321-071824.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-22_conflict-20150321-071824.png)

Combined with a seemingly unlimited number of AND/OR arguments utilising grouping to accommodate both types, reports can be generated to a degree where you could very probably find your needle in a hay stack.

You’re not limited to a defined set of columns either:

[![Screenshot (23)_conflict-20150321-072016](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-23_conflict-20150321-072016.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-23_conflict-20150321-072016.png)

If I had one suggestion, it would be to provide friendly names for most of the variables to report against. While it’s easy enough to figure them out I can see it being slightly daunting to some.

Exporting is not possible from the free version of Miradore Online. It’s a shame as I could have otherwise decreed their reporting module almost perfect! Thankfully they do provide the ability to export in the business tier which I’ll cover below.

### What else?

**Notification centre (+ Device notifications)**

As seen in all of my screenshots so far, there’s a new notification icon. This provides direct access to notifications around Miradore updates and more recently for device alerts (should a device not be passcode protected or otherwise fall out of compliance).

More information on this can be found [here](http://onlinesupport.miradore.com/hc/en-us/articles/201450202-2014-10-01-Release-notes), [here ](http://onlinesupport.miradore.com/hc/en-us/articles/202160242-2015-01-20-Release-notes)and [here](http://onlinesupport.miradore.com/hc/en-us/articles/201916301-2014-11-21-Release-notes).

**Tighter integration with Miradore ITAM (the asset management side of things)**

Administrators of Miradore ITAM can now benefit from tighter integration between the asset management suite and the MDM platform, making it much easier to have an all-in-one asset and management suite with Miradore.

More information on this can be found [here](http://www.miradore.com/blog/mobile-management-leaps-forward/).

**Guides and documentation**

No solution is complete without a self-service portal. A lot of the time admins would rather a quick search on an issue than taking time to call support. Miradore is now providing a support area with guides, documents and FAQs. It can be found [here](http://onlinesupport.miradore.com/hc/en-us).

**AD Sync**

Wintel houses rejoice! Import your users using the AD connector to drastically simplify user management and enrolment. [See more here](http://onlinesupport.miradore.com/hc/en-us/articles/201652301-Importing-users-from-Microsoft-Active-Directory).

**Tagging**

<a name="business"></a> Potentially one of the most underrated features of a platform is the ability to tag. Tags are independent of anything else on the platform and can allow administrators to group otherwise random devices across various organisations into one unique group. Use it for generating reports, assigning policies or anything else – you’re only limited by your imagination!

Find out more about tagging [here](http://onlinesupport.miradore.com/hc/en-us/articles/201652472-Device-tags).

Miradore Online MDM Business
----------------------------

Almost a year after launching, Miradore introduced new paid-for plans that add extra functionality for a small fee per device, per month. These plans are designed for businesses and groups that need a little bit more than what’s offered in the free plan without breaking the bank.

I’m testing the Business Plan. It comes in at $0.50 per month, per device and offers the following over the free plan:

- Location tracking
- Unlimited administrators
- Notifications + Alerts via email
- 24 hour response for support
- Excel export of data

### Getting started

To begin the upgrade is as simple as clicking the new “Upgrade subscription” button on the bottom-left of the window when logged into the console.

From there, you’re able to select your preferred subscription: Business or Enterprise (Free is already selected currently).

[![Screenshot (29)_conflict-20150321-084358](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-29_conflict-20150321-084358.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-29_conflict-20150321-084358.png)

SImple so far, right? On the following steps not so much. On clicking upgrade I’m presented with a standard sign-up screen requesting address, number, email, etc. It also requests a VAT number and business name.

[![Screenshot (26)_conflict-20150321-083310](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-26_conflict-20150321-083310.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-26_conflict-20150321-083310.png)

As I’m not a business, but rather an administrator for a small group (for this trial) I neither have a business name nor a VAT number. Both of these are mandatory and so I’m forced to make something up for the business name, and select a country outside of the EU to negate the VAT number. (NB: You’re not allowed to do this, as it’s effectively not paying tax on a purchase)

I can appreciate the need for these two fields for businesses (it is after all the “Business” plan) but this requirement will either alienate groups, individuals and businesses without a VAT number or result in incorrect information being submitted to Miradore. Either way Miradore lose with this. Ideally they should opt for an approach similar to solutions like Office365: make the field non-mandatory and if no VAT number is supplied simply warn them you’ll have to charge VAT at X% (depending on the country the user is from, in line with new VAT rules) and add it to the bill.

I muddled through and made my way to the payment page.

[![Screenshot (28)_conflict-20150321-083622](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-28_conflict-20150321-083622.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-28_conflict-20150321-083622.png)

I have 3 devices enrolled, which should bring my total to $1.50 a month (GBP or even Euro would be nice to see here, given Miradore is a Finnish company). What I then notice (in the red box) is a minimum monthly subscription of $10; equivalent to enrolling **20 devices**.

Under any other circumstances I would have cancelled this and forgotten about it. There are few things I dislike more than paying for something I don’t use, and this would be 17 devices I’m not using!

However, for the sake of the review and the fact I really want to see how well location tracking and report exportation is integrated I chose to continue. Voila:

[![Screenshot (32)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-32.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-32.png)

### Location tracking

This is a big one for me. Personally location tracking allows me to use my own tools to find devices and not rely on built-in 3rd parties on the devices themselves. I also enjoy generating my own location history maps and MDM location tools are pretty good at logging that data.

Corporately location tracking is a fantastic tool to keep in the arsenal for when devices are lost or stolen. Given almost all leading MDM platforms offer location tracking (in their £3+ licenses) it’s nice to see Miradore offer it too. It was in fact one of my wishes in my first look last year!

Admittedly right now location tracking is limited to Android, but it’s a start.

So, how does it work?

Unlike other platforms, Miradore requires a policy be pushed out to the Android devices you want to track. This has benefits in that you select which devices have location monitored and leave those that don’t need it untouched. I prefer this method than the global on/off switch that then requires you create exclusions based on device type, usage, so on.

[![Screenshot (33)_conflict-20150321-093506](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-33_conflict-20150321-093506.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-33_conflict-20150321-093506.png)

[![Screenshot (34)_conflict-20150321-093514](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-34_conflict-20150321-093514.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-34_conflict-20150321-093514.png)*End user notification is an option, but as a responsible admin you’d always tick that, right?*

Once the profile is created, deploy it:

[![Screenshot (35)_conflict-20150321-093614](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-35_conflict-20150321-093614.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-35_conflict-20150321-093614.png)

[![Screenshot (36)_conflict-20150321-093622](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-36_conflict-20150321-093622.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-36_conflict-20150321-093622.png)

Once deployed, the location information is available within the device record as shown in the comparison below. Top: iPhone without Location Tracking. Bottom: Nexus 6 with it.

[![Screenshot (39)_conflict-20150321-094448](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-39_conflict-20150321-094448.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-39_conflict-20150321-094448.png)

Location is accurate to street-level and you can zoom in and out as necessary to get a better view. Whenever the device checks in, location information will be updated. Of course, you can always use the manual sync “Sync now” option to force this as required.

**Summary**  
So location tracking works, and works seemingly well. I like how it’s deployed as if it was any other profile which keeps control on the side of the administrator. I’m also quite fond of how it shows up right there within the device record rather than being buried deep in a side menu.

If there was room for improvement here, it would have been the ability to pop the location out into a new window/frame and see it a little more full-screen. Miradore obviously read my mind as they released that [exact functionality](http://onlinesupport.miradore.com/hc/en-us/articles/202727911-2015-03-23-Release-notes) before I finished writing this article!

[![Map view – Miradore Online – bayton](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Map-view-%E2%80%93-Miradore-Online-%E2%80%93-bayton.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Map-view-%E2%80%93-Miradore-Online-%E2%80%93-bayton.png)

### Data export

Arguably some of the features aimed more around convenience, Miradore’s Business plan allows for both email alerts and the exportation of report information for offline use. I mentioned earlier about my passion for a good report, and the export feature ticks off number 3 of my ideal requirements when working with them.

How does it work?

**Exporting reports**

To export a report you simply open it and click the Export button. Miradore have even provided two ways of doing it.

[![Screenshot (40)_conflict-20150321-102130](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-40_conflict-20150321-102130.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-40_conflict-20150321-102130.png)

That’s all there is to it. Sorry if you were expecting something more complicated.

The exported report is equally simple:

[![Screenshot (41)_conflict-20150321-102902](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-41_conflict-20150321-102902.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-41_conflict-20150321-102902.png)

Naturally the larger the estate and the more information you’re trying to report on, the bigger and more complex these reports become. My three devices won’t convey that very well but offers an example of what to expect.

As an aside, I’m happy the default export is to excel rather than CSV.

**Setting up alerts and notifications**

The alerts and notifications are set up on a per-administrator basis. That is to say the alerts you get may not be the same as the alerts your colleague does unless you both set the same options when editing your notification preferences.

To start, open the notification icon in the top-right of the screen and click the cog icon. (Alternatively click the email address next to it and click “My Settings”)

[![Screenshot (42)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-42.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-42.png)

This will then take you to your own personal notification area where you can decide upon what sort of alerts you wish to receive.

[![Screenshot (43)_conflict-20150321-110016](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-43_conflict-20150321-110016.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/03/Screenshot-43_conflict-20150321-110016.png)

Again, as simple as that

**Summary**  
The 24 hour SLA, location tracking and unlimited administrators alone are worth the $0.50 if you ask me, but when you add in the reporting and notification options it really fills out the subscription offering.

### Is it worth it?

Yes. Without a doubt. If you consider MDM to be an invaluable tool for managing devices (which it is) you’ll really benefit from the added functionality of the business tier without the financial drain when comparing to any of the competing platforms.

Wrap up
-------

### What needs work?

**Enrolment**

A year on there’s still a big reliance on manually managing user accounts on the platform. It doesn’t need to be this way! Add verification for domains and let users authenticate based on their email domain rather than after an admin has manually added their account.

Furthermore, drop the need to send a generic email address and password on enrolment. Admins have the ability to generate a time-limited static system-generated email address and password but it can still be improved; let users enrol with their email address and a system-generated password (where LDAP integration wouldn’t be present, of course). If you have user@example.com registered, there’s no need to ask them to enrol using xy123@online.miradore.com.

Finally, AD sync is now available. Take it one step further and allow users to authenticate with Miradore Online using their AD credentials.

**Platform support**

Miradore supports the 3 big players on the market, but the variance in what is and isn’t supported is massive. Android benefits from location tracking, but only Samsung devices get any other management capabilities. IOS and Windows Phone both benefit from granular management but neither report location. Bringing this all in line will help the platform considerably – competing EMM providers do it, so I’m not asking anything that isn’t technically possible.

**Subscriptions**

Moving from the free to the paid tier wasn’t as smooth as I’d have expected. The requirement for business details (particularly VAT) mean it’s not possible for non-businesses from signing up to the new platform without submitting incorrect information. Not all businesses are VAT registered either and this will cause issues for them too.

Furthermore, the minimum subscription charge was unexpected and unpleasant. I’m sure it won’t affect 70% of your potential subscribers but it would definitely put me off. Startups, groups and small businesses can easily fall below a minimum of 20 devices and they won’t take well to being overcharged for what is otherwise a very well-priced subscription model.

### What I’d like to see

- Improved device management inc. Android for Work support.
- Location tracking for all platforms.
- EMM features – Application management has recently been released, how about Telecoms and Content management?
- User-friendly naming on reports.
- A mobile-friendly administration client (native or web).
- Scheduled reports, allowing a hands-off approach to reporting.

To conclude
-----------

Miradore Online MDM has been in existence for not much more than a *year*. When you consider that, the progress they’re making is pretty outstanding. They’re owning their corner of the market by providing high-quality, free management of mobile devices with the option of upgrading to gain additional functionality for a fraction of the price of competing MDM platforms (and to be clear, I’m referring to MDM, not EMM).

As they continue to innovate it’s becoming clear what was originally a great little add-on for their other products could very well graduate into a full-blown EMM solution in the not-too-distant future. They’re understandably not on par with competing platforms feature-by-feature right now, but they’re in their infancy compared to the competition and moving quickly.

They chose the right time to get on-board with the mobile management trend and long may their momentum continue!