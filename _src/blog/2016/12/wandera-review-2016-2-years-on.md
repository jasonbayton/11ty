---
title: 'Wandera review 2016: 2 years on'
date: '2016-12-14T23:06:53+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 3423
tag:
    - apn
    - gateway
    - 'mobile gateway'
    - proxy
    - security
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/wandera-review-2016-2-years-on/97'
tags:
    - Enterprise
    - Reviews
---
Back in 2014 I came across a new, powerful and totally unique solution to the growing problem of telecoms expense management (TEM) in the enterprise: Wandera. It offered unparalleled insight into data usage across the corporate mobile estate and helped tremendously in the never-ending quest to monitor and control data usage both at home and abroad.

[At the time I said](/2014/05/a-month-with-wandera-mobile-gateway/):

> I’m really, really impressed by how the solution works and how theoretically easy Wandera makes it to manage devices. Considering at the moment I’ve got very little insight into how users use their allocated data on a monthly basis, Wandera really appeals to me.

It wasn’t perfect however, missing functionality I felt made bulk-deployment something of a challenge; even adding additional administrators required a ticket to be raised with Wandera support. For the benefits Wandera offered though, I was willing to mostly overlook the drawbacks for what was otherwise a fantastic new service with a lot of potential.

As it turns out, being a simple data monitoring solution wasn’t enough for the good people of Wandera; not too long after my first review they announced they were entering the security sector. Today, two years later and after pivoting their focus to mobile threat defense, let’s see what’s changed, what’s remained the same and where there’s still room for improvement.

<div class="callout callout-success">

#### How does Wandera work?

Unlike typical EMM platforms with TEM built in or even popular data monitoring applications that estimate and/or periodically report data usage, Wandera acts as a proxy (or “gateway”), taking control of the APN settings of enrolled devices in order to divert all cellular traffic through Wandera servers where it is analysed, compressed and forwarded on to its final destination in real time.

With policies, data caps and traffic shaping at its core, Wandera has the ability to block traffic on the fly whether due to a restricted site/genre, a soft data cap, a detected security issue or simply switching over to a roaming profile. It can do this while still providing access to core corporate services such as Exchange so as not to prevent employees from performing their job function. How Wandera behaves is entirely down to how the administrator sets up the various policies.

Some traffic cannot be optimised due to SSL encryption and therefore a lack of visibility of the data it captures. In these circumstances, Wandera simply measures the amount of traffic passing through and counts it up against the respective device in the console. The data that can be compressed however can help to considerably lower data usage and, in combination with real-time reports, alerts and data blocking, Wandera can help to almost completely eliminate bill-shock.

</div>

Logging in
----------

On logging into the console at <https://radar.wandera.com>, I’m greeted with a familiar, though busier dashboard offering a redesigned overview featuring a new focus on mobile threat defense at the very top; this shows threats and risk for mobile devices enrolled on the platform. Below this are the familiar data usage metrics, savings provided by Wandera’s compression engine and an overview of on what (and where) data has been used.

[![dashhi](https://cdn.bayton.org/uploads/2016/12/dashhi.png)](https://cdn.bayton.org/uploads/2016/12/dashhi.png)

On the left I notice there are a number of new areas in the navigation, including **Secure**, **Administration**, and **Policy** which I’ll touch on below.

The dashboard is now much cleaner and offers more information at a glance. It’s a nice update on what was already a very useful landing page.

<div class="callout callout-warning">

#### Estimated cost savings

The cost savings demonstrated in the dashboard above are only accurate after configuring the default (and any other) **Plan Details** located in **Settings**.

[![](https://cdn.bayton.org/uploads/2016/12/carrierplan-e1481415390507.png)](https://cdn.bayton.org/uploads/2016/12/carrierplan-e1481415390507.png)

</div>

Enrolling a device
------------------

Device enrolment is definitely an area that has seen some significant improvement over the last two years. While the traditional single and bulk enrolment options still exist from within the Wandera console, they have since expanded the number of EMM solutions App Push works with and have introduced a feature that I find particularly exciting – EMM Connect.

### What’s the difference?

**[![](https://cdn.bayton.org/uploads/2016/12/emmc-e1481381464687.png)](https://cdn.bayton.org/uploads/2016/12/emmc.png)**

**App Push** was the first attempt at EMM integration and today still supports the highest number of EMM platforms.

Using the EMM-provided Application Management tools, the Wandera app can be imported into the EMM platform, staged using provisioning keys unique to each Wandera customer and distributed automatically to enrolled devices. When the end-user then opens the Wandera application, it will provision automatically with only a few taps required to confirm profile installation.

This is the process on iOS at least and is definitely smoother than on Android, wherein an additional activation app is required for the provisioning steps which can later be removed. I picture this improving in the near future with the uptick in Android for Work deployments and although Wandera don’t support AfW currently, the Wandera App appears to be compatible (though not enabled) in some preliminary testing I undertook.

[![](https://cdn.bayton.org/uploads/2016/12/app-push.png)](https://cdn.bayton.org/uploads/2016/12/app-push.png)

**EMM Connect,** by contrast, utilises the APIs of popular EMM platforms AirWatch and MobileIron to automatically sync and provision EMM-enrolled devices/users with Wandera, without all of the extra hands-on required with provisioning keys as used with App Push, the app itself will still need to be distributed though .

EMMC once connected will generate a unique EMM label to be created within the EMM platform. All devices assigned to this label will then be synced to Wandera automatically and provisioned on launch of the Wandera app. Furthermore, Wandera can see any other groups/labels through the EMM API and allows administrators to assign different labels to various Wandera Groups, an excellent and simple way of dynamically assigning devices to group-based data policies.

[![](https://cdn.bayton.org/uploads/2016/12/Screenshot-from-2016-12-10-15-00-23.png)](https://cdn.bayton.org/uploads/2016/12/Screenshot-from-2016-12-10-15-00-23.png)

<div class="callout callout-info">

#### Wandera Groups

Wandera Groups, much like groups or labels in EMM products, allow for multiple unique policies to be applied to devices based on group membership and dramatically increase the flexibility of the platform. Data policies can then be set according to department, operating system and more.

</div>

As of publishing, EMMC only works with iOS devices and while silent provisioning is an option, it requires the devices be Supervised and/or enrolled onto Apple’s Device Enrolment Program (DEP); non-supervised iOS users will be prompted to manually allow the installation of the relevant profiles, a familiar process for those who have previously enrolled onto an EMM platform.

A further benefit of Supervision is the ability to manage not only mobile data but WIFI also. It has long been the case that no matter what rules are put in place to block access to various services, switching on WIFI circumvents it all. Once Supervised this is no longer the case.

[![](https://cdn.bayton.org/uploads/2016/12/emm-connect.png)](https://cdn.bayton.org/uploads/2016/12/emm-connect.png)

In testing I found the EMMC method was very reliable, though it took a few days to get set up due to using [Let’s Encrypt](https://letsencrypt.org/) SSL certificates for my MobileIron Core. I worked with Wandera to get these certificates supported as I know for a fact they will only grow in popularity as time goes on. From here on out that will no longer be an issue.

Here’s how an EMM-connected device is displayed within the console:

[![](https://cdn.bayton.org/uploads/2016/12/Screenshot-from-2016-12-10-23-06-22.png)](https://cdn.bayton.org/uploads/2016/12/Screenshot-from-2016-12-10-23-06-22.png)

I look forward to seeing Android devices supported in EMMC, once again perhaps in tandem with Android for Work we will soon see far more opportunities for integration on par with what iOS users get today.

### What’s supported?

One of my biggest criticisms of Wandera was only offering support for iOS and Samsung – not Android, just *Samsung* devices. Two years on and unfortunately nothing has changed in this regard; Wandera will not run on Android devices except those by Samsung due to the required APIs in the AOSP simply being non-existent.

It’s no secret Samsung is *the* Android Enterprise manufacturer; with SAFE, KNOX and the respective APIs available with these solutions that simply don’t exist in other Android OEMs, it’s no surprise Wandera are only focused on working with the platforms they know they can support reliably.

That doesn’t mean I like it however. With no less than 7 Android devices of varying ages in my house, I still had to go out and buy a Samsung Galaxy (J3, for those interested) in order to be able to review the Wandera platform from an Android perspective. It’s my hope that as Android for Work evolves, these APIs currently exclusive to Samsung will be replicated on all OEM devices out of the box in the near future. I’ve mentioned AfW several times in this review already with good reason, it should completely change the game for Android management as it matures.

Setting up plans and data policies
----------------------------------

[![](https://cdn.bayton.org/uploads/2016/12/plan-overview.png)](https://cdn.bayton.org/uploads/2016/12/plan-overview.png)

Wandera have introduced the **Policies** heading which brings both **Data Policy** and **Business/Personal** across from the previous location in **Settings**, along with a new **Security Policies** configuration discussed further below.

Data policies provide limitations around how data can be used for managed devices. Different policies can be created for different groups, for example in the image above I have limited data to 20GB per month, allowing tethering but setting compression to its most aggressive level in order to preserve some bandwidth where possible. This is only for devices in the **Devices** group and won’t affect anyone else.

Above the group level is a **Global** policy in which settings such as *Reset Interval Period* and *Reset Day* are set globally. As the screenshot above shows this cannot then be changed on the group-level, a possible problem in an environment where different providers with different billing dates operate together.

Different caps and limitations can be enforced for different situations: domestic, roaming and (where supported) WIFI. This means it’s possible to disable tethering and prevent data being used excessively abroad, even if the policy is rather liberal at home.

Furthermore, anything from one particular website to a full range of sites under any one of several categories can be blocked, as shown here:

[![](https://cdn.bayton.org/uploads/2016/12/RADAR-Wandera.png)](https://cdn.bayton.org/uploads/2016/12/RADAR-Wandera.png)

In the above example, among other things I have blocked both **News &amp; Sport** as a genre, but also [techcrunch.com](//techcrunch.com) as an individual website. As soon as this policy is saved devices are updated immediately and all blocks are enforced without any further action required from the administrator.

One of the best features here I think is the whitelist; a common conundrum I hear is how to effectively stop users from running up huge bills once they’ve breached their data allowance, but at the same time avoid cutting them off completely to the point where they can no longer do their job. Whitelisting applications such as email or iMessage (or anything else) allows the user to remain online in a capacity that is controlled by the business until such time a new billing period starts or an additional bundle can be added, offering data at a much cheaper rate than those incurred through overages.

For those who’ve adopted BYOD, **Business/Personal** is simply a collection of checkboxes that allow traffic to be appropriately categorised. Facebook, for example, would usually be marked as a personal site and can therefore be reported as such within Wandera to aid with reimbursements based on usage.

Secure devices
--------------

[![](https://cdn.bayton.org/uploads/2016/12/secure.png)](https://cdn.bayton.org/uploads/2016/12/secure.png)

**Secure** is a new function that encompasses mobile threat defense and content filtering to prevent targeted mobile attacks, identify data leaks, and filter access to risky or unapproved usage. It does this by not only reviewing the sites visited, but also the state of the device itself (as demonstrated above). In testing I found it could be a little over-sensitive (MobileIron, my EMM platform, is naturally going to be a device admin) but the insight **Secure** offers generally is both vast and incredibly useful. Some of the security threats it’ll pick up on include:

- Data leakage (unencrypted transport) of email, credit card info, authentication credentials
- Developer mode
- Android root / iOS jailbreak
- OS version, security patch levels
- Bad apps
- Risky WIFI APs

In fact, just looking at the Event Logs gives an indication of what has been detected on my device over the last week:

[![](https://cdn.bayton.org/uploads/2016/12/Screenshot-from-2016-12-08-20-40-50.png)](https://cdn.bayton.org/uploads/2016/12/Screenshot-from-2016-12-08-20-40-50.png)

Some of these are less severe (according to Wandera) than others, though ultimately the administrator has the ability to either receive alerts on detection or ignore these events all together. By default these are reported silently, requiring the administrator to actively investigate. I’m OK with this as typically being bombarded by email alerts doesn’t particularly excite me. Notifications can be set up in **Settings &gt; Notifications**.

Each event listed can be drilled down further in order to provide more context around the device it was flagged against:

[![](https://cdn.bayton.org/uploads/2016/12/Screenshot-from-2016-12-08.png)](https://cdn.bayton.org/uploads/2016/12/Screenshot-from-2016-12-08.png)

If an event, such as **Device Admin app found** is not a concern, it can be turned off by clicking **Manage Policy** in the above screenshot:

[![](https://cdn.bayton.org/uploads/2016/12/Screenshot-from-2016-12-08-21-15-12.png)](https://cdn.bayton.org/uploads/2016/12/Screenshot-from-2016-12-08-21-15-12.png)

The issue I see here is I can seemingly only turn **all** Device Admin alerts off for one device or all devices. While I’m confident MobileIron in this case is safe, there’s no guarantee anything a user installs requiring Device Admin later would be. I’d rather turn it off on a case-by-case basis, opting to whitelist MobileIron or any other perceived low-risk Device Admin at the moment it is brought to the administrator’s attention.

### Security Policies

[![](https://cdn.bayton.org/uploads/2016/12/security-policy.png)](https://cdn.bayton.org/uploads/2016/12/security-policy.png)

Naturally reporting any security concerns is nice, but it’s only half a solution; Wandera have as such also introduced **Security Policies** that sit within the new **Policies** area of the console to enable automated actions based on the incident detected.

By default Wandera has a number of *Recommended Settings* enabled to offer out-of-the-box protection, including blocking traffic for phishing apps or credit card information being transferred over unencrypted channels, though again no alerts are set up to avoid swamping administrators (or users!). As an administrator it’s additionally possible to manage exceptions, rule ignores and supply trusted root certificates to aid in the prevention of false positives and unimportant alerts.

In testing I wasn’t able to replicate a scenario whereby traffic would be blocked due to a security concern – partly because I had no intention of downloading a phishing app, but also with everything generally quite secure browsing around my typical sites there wasn’t much in the way of opportunities to do so.

Managing the console
--------------------

[![](https://cdn.bayton.org/uploads/2016/12/add-admin.png)](https://cdn.bayton.org/uploads/2016/12/add-admin.png)

I’m pleased to see since my last look at Wandera it’s no longer necessary to submit a support ticket in order to add another administrator. This was an immensely basic necessity which I couldn’t believe was overlooked initially, but adding additional admins today is a piece of cake.

Other than this, notifications can easily be set up through **Settings &gt; Notifications**, allowing for very simple yes/no decisions on what alerts should be sent to the admin, the user or nowhere at all.

[![](https://cdn.bayton.org/uploads/2016/12/alerts.png)](https://cdn.bayton.org/uploads/2016/12/alerts.png)

Other changes
-------------

As with the dashboard, a number of changes since my last review appear to be mostly cosmetic – offering a better layout with more information at a glance. Wandera have again dropped the dated design:

![](https://cdn.bayton.org/uploads/2014/05/Devices-e1399322805740.png)

In favour of a much cleaner, nicer interface with richer filtering and search options:

[![](https://cdn.bayton.org/uploads/2016/12/devices-list-e1481385603616.png)](https://cdn.bayton.org/uploads/2016/12/devices-list-e1481385603616.png)

### Devices

In addition for **Devices,** Wandera have added a Summary view which is not drastically different from that of the dashboard:

[![](https://cdn.bayton.org/uploads/2016/12/dashboard.png)](https://cdn.bayton.org/uploads/2016/12/dashboard.png)

Though it does offer a somewhat different visualisation of the data available, instead focusing on device availability and connectivity to the Wandera platform. Admittedly I didn’t find myself looking at this too often with such a small deployment of devices, but it’s not dissimilar to the dashboard views I’m used to seeing (and heavily utilising) on various EMM platforms.

### View

One of the more interesting features under **View** was *Real-Time* which gave an indication of the data passing through the server as it happened. It was a little gimmicky perhaps, but for troubleshooting purposes was probably as close to a tool as Wandera offers for administrators. Unfortunately that’s now gone, but the excellent tables and graphs showing data usage clearly, along with the apps and sites frequented by users, is still all very much present:

[![](https://cdn.bayton.org/uploads/2016/12/view-overview.png)](https://cdn.bayton.org/uploads/2016/12/view-overview.png)

[![](https://cdn.bayton.org/uploads/2016/12/view-table.png)](https://cdn.bayton.org/uploads/2016/12/view-table.png)

An interesting addition I don’t recall seeing in the past is under **Settings &gt; Service Controls**. Particularly in the run-up to the new [General Data Protection Regulation (GDPR)](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation), having the ability to anonymise reported data feels like a crucial necessity to prevent huge fines for breaches of data protection:

[![](https://cdn.bayton.org/uploads/2016/12/Screenshot-from-2016-12-10-16-18-16.png)](https://cdn.bayton.org/uploads/2016/12/Screenshot-from-2016-12-10-16-18-16.png)

*For those interested, Wandera themselves have [published a whitepaper ](https://blog.wandera.com/2016/11/gdpr-mobile-implications/)outlining the implications of GDPR.*

The user experience
-------------------

As an end-user it can obviously be frustrating if out of nowhere websites are blocked and data caps are enforced. Wandera however do a really good job of keeping the user informed and the application is completely transparent in showing what limits are applied to the device as well as why a site may have failed to load.

Furthermore, there’s a really nice data monitor built in so a user will never not be able to know how much data they’ve used and how much is left.

Browsing with blocks in place:

https://www.youtube.com/embed/-suSyLFVOFo

Browsing the Wandera app:

https://www.youtube.com/embed/ybOq1uH3YsQ

Conclusion
----------

I’m impressed by the changes and new features I’ve seen once again with Wandera and maintain it’s one of the best solutions for TEM on the market today. Combined with the new mobile threat defense features ensuring devices are safe and compliant, it feels almost untouchable against the competition as an all-in-one solution.

Wandera works reliably, integrates well into existing EMM platforms for simple (bulk) provisioning, offers a completely transparent user experience and provides all the tools necessary to ensure bills remain well and truly within budget.

I’ve by no means covered everything here again, but I’d hope this review gives a good overview of what Wandera is, does and how it can help. If you have questions or comments, or would like to see more reviews, guides or general chat about Wandera here, let me know and I’ll be sure to write more about it in the future.

As always I’m [@jasonbayton](https://twitter.com/jasonbayton) on Twitter, [@bayton.org](https://facebook.com/bayton.org) on Facebook and will also respond to comments below.

*If you spot any errors in the above or have suggestions on how to improve this review, feel free to reach out.*