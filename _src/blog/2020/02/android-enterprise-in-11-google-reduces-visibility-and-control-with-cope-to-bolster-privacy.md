---
title: 'Android Enterprise in 11: Google reduces visibility and control with COPE to bolster privacy.'
date: '2020-02-27T18:38:38+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 8906
tag:
    - android
    - 'android 11'
    - 'android r'
    - cope
    - 'Enterprise Mobility'
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/android-enterprise-in-11-google-reduces-visibility-and-control-with-cope-to-bolster-privacy/351'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
Google dropped the first developer preview of Android 11 on the world last week out of the blue, and along with it, some very interesting [public announcements](https://blog.google/products/android-enterprise/work-profile-privacy/) about the future of the work profiles on fully managed devices deployment scenario.

There isn’t one.

It’s worth noting there’s some terminology that needs to be understood in order for this change to make sense.

COPE – Corporate Owned, Personally Enabled is not an Android Enterprise deployment scenario, it is a use case that extends out across the wider enterprise mobility ecosystem. The same can be said for COBO, COSU and BYOD. Although these are used interchangeably when discussing Android Enterprise deployment scenarios/solution sets, it is entirely possible, and not uncommon, to see:

- COPE used with fully managed (normally considered COBO) by permitting the mix of work and personal applications within the same profile (not typically recommended).
- COPE used with work profile only (normally considered BYOD), where the organisation has already given up the requirement to fully manage a device and provides the device to be set up normally with a work profile inflated during enrolment.
- COBO used with a kiosk or custom launcher (normally considered COSU), where this is deemed the best means of adequately locking down a device to the extent required, while still permitting access to some device settings and multiple corporate applications.

In the context of this article, COPE is simply a use case, and how it’s implemented with Android Enterprise is changing from inflating a work profile on a fully managed device where the DPC is both a device and profile owner, to inflating a work profile on a non-fully managed device where the DPC is a profile owner only, but gets additional management capabilities within the parent profile when the enhanced work profile experience is triggered during zero-touch or QR provisioning (unfortunately still not supported for DPC identifier or NFC provisioning methods).

I’ve had some hands on with 11, but via TestDPC have yet to see any real change between 10 and 11 on what can be configured with the enhanced work profile experience. I’ll update as required when this changes.

What’s happening
----------------

Google are no longer supporting the use of work profiles on fully managed devices (WPoFMD) in Android 11. Instead, they’re working on something they’re calling an enhanced work profile experience (what I’ll refer to throughout for simplicity and differentiation as *enhanced work profile*).

<div class="wp-block-group has-background" style="background-color:#eef9ff"><div class="wp-block-group__inner-container">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2020/02/baytonI-3.png) **The key difference between the two is how they’re provisioned.**

Today AE COPE provisions the device fully managed, then inflates a work profile for corporate apps, leaving the managed parent profile available for personal use. It’s still a fully managed device and so IT have equivalent control and visibility to any other fully managed deployment scenario.

Enhanced work profile, like a normal work profile, sets the device up with a work profile only, just as if it were enrolled manually by an end user enrolling an already setup device having gone through the Android first run wizard. Utilising ZT or QR in this case simply shortens the time to enrolment, and offers organisations the opportunity to flag the device as corporate owned, which in turn expands the set of policies permitted to enforce on devices.

</div></div>Enhanced work profile is said to offer all the benefits of a work profile deployment in having a separately encrypted, isolated profile for work apps and data, but with the addition of many of the policies available on a fully managed device available to the EMM admin, while removing any policies that may potentially infringe on user privacy (numerous).

Android 8-10 remains completely unaffected, but on upgrading the estate to Android 11, organisations are faced with two options for devices utilising work profiles on fully managed devices:

**Convert the device to fully managed** in order to retain full visibility and control over the device, but in doing so will lose the COPE use case in favour instead of COBO.

**Migrate to an enhanced work profile** in which the organisation will lose device-wide visibility of the hardware they provide to employees, as well as some of the controls available to organisations for the parent profile leveraged today.

For newly enrolled devices, depending on how they’re provisioned the device will either again be able to deploy as fully managed or, if the EMM vendor supports work profile provisioning via QR/ZT [introduced with Android 10](https://developer.android.com/work/versions/android-10#improved_provisioning_tools_for_work_profiles), provide the option to provision the enhanced work profile in lieu of the WPoFMD deployment scenario.

The enhanced work profile should offer several new parent profile restrictions and policies previously impossible to enforce with a work profile deployment, including what appears to be app black/whitelisting for the parent profile amongst other things (no public announcement on available policies as yet), bringing it some way towards a replacement for the deployment scenario being binned off, although the two won’t be directly comparable.

In any case, for end users the UX should remain basically unchanged and as such the need for end user training ahead of migrating enrolment processes from WPoFMD to enhanced work profile will be unnecessary – unless DPC identifier or NFC provisioning is utilised, in which case organisations will need to switch to QR or zero-touch provisioning instead.

In the name of privacy
----------------------

Work profiles on fully managed devices have, since their introduction with Android 8.0, offered the most comparable experience to legacy Device Admin management available with Android Enterprise; the organisation separates and protects all corporate data within what would have been a container, now a work profile with AE, while maintaining full visibility and control over the device the organisation has provided to employees.

Generally with COPE employees are happier as they are given a corporate device, in some cases something they wouldn’t buy themselves due to cost where the organisation offers high-end devices, and one they can optionally utilise for their own purposes. Organisations are happier having devices they approve, provide and manage being actively used rather than shoved in a drawer as is often the case with COBO-style knowledge worker deployments.

Where things get murky however is how personal use is handled. This can vary by region and organisation, and opinions sit at opposite ends of the spectrum.

Many offer personal use as an optional extra provided by the organisation, but offering personal use doesn’t imply privacy; the device doesn’t belong to the employee, the employee is unlikely to pay for the usage (cellular) of the device, it is deployed as a fully managed device and thus is treated by the organisation as such, something that is often outlined in a mobile device policy employees sign when joining the business or when devices are rolled out (I’ve signed one for every British and US firm I’ve worked for to date).

This is the side of the fence on which I sit. If I’m deploying devices to the business I have no issue with employees using them personally within reason, however if it’s lost or stolen I want to be able to track it’s location, if I get an enormous data bill I want to understand what may be contributing to this as it’s unlikely to be corporate apps causing it. I’ll push out [MTD](/android/mtd-and-android-enterprise/) on the parent profile to maintain device-wide protection, so on. It’s a business asset so is looked after as such.

That doesn’t mean I’m looking at app install logs to peruse what employee #309’s interests are; EMM privacy is enabled, and solutions that monitor app usage and risk can do so in a way that doesn’t identify the app itself, only the genre, meaning I know that “streaming apps” have consumed 30GB of data, or “gambling apps” are posing a security risk. It also doesn’t mean I’m not able to see SMS messages, call logs, personal app data, etc, which is a common misconception with device management still today.

Similarly, as a user, I’ve turned down the opportunity for personal usage on a device in the past because the organisation does sync full app lists, or in the DA days has had the ability to directly interface the device filesystem.

Google clearly don’t agree with this approach. Instead, they fall in line with the organisations and regions of the world that consider any personal use offered by an organisation being subject to unquestionable privacy, allowing employees to do whatever they wish with the device without any visibility offered to the organisation.

<figure class="wp-block-pullquote">> For regulated orgs that want to allow some personal use COMP was ideal and Google should maintain both
> 
> <cite>From an MSP</cite>

</figure>Google advertise the replacement of COPE in its current form as a big win for IT, giving them (or us, since I fall under this umbrella with my managed estate) the ability to “confidently extend the same privacy protections to a company-owned device that people have come to expect from the work profile on a personally-owned device”, which is super, where that is desired, but equally in many circumstances having restrictions imposed by a 3rd party on how a corporate device is managed is absolutely *not* desired. I’ve made similar comments on how MobileIron limit WPoFMD management according to their own view of how a device should be managed, as opposed to simply supporting the deployment scenario in totality and leaving organisations to manage their own estates.

Neither view is right or wrong, justifications can be provided for either side of the fence on which you sit, however Google have chosen to make it harder for those who don’t desire abject privacy with no wiggle-room.

An un-Android approach
----------------------

Android revolves heavily around being a flexible OS designed for everyone. It is baffling therefore to see Google seemingly saying *we don’t like how it’s being used* and removing a management scenario many organisations want to leverage.

Importantly, this is not just a case of privacy or no privacy. The work profiles on fully managed devices deployment scenario is leveraged for more than simply COPE.

<figure class="wp-block-pullquote">> We use AE COPE as a dual managed-container solution, we don’t know what we’ll do from Android 11
> 
> <cite>From an organisation</cite>

</figure>While it’s not necessarily a popular use case, utilising WPoFMD as a means of providing two managed profiles (parent and work) which hold different applications and data has provided a key benefit of utilising Android over another OS for some customers.

Some choose to define what personal use means for their devices by heavily limiting the applications, accounts and features that can be leveraged in the parent profile.

Others choose to deploy services like [MTD](/android/mtd-and-android-enterprise/) into the parent profile and otherwise remain completely hands-off, with no app information collection within the EMM, which is very much a possibility with many EMMs for organisations enforcing their own privacy policies.

In any case, however organisations are choosing to use COPE, however they define personal use, and whatever corporate policies are in place, this is all possible due to the flexibility of WPoFMD.

Restricting all Android customers for the sake of some which Google feel get privacy wrong is taking a sledgehammer to a staple and flies in the face of [Android being for everyone](https://www.android.com/everyone/).

It’s worth pointing out equally how easy this is to bypass for organisations wanting parent profile visibility. Just as with a work profile (BYOD) deployment, organisations can mandate the installation of an app (MTD is again a frequent example) manually by end-users in order to comply with corporate policy. In a flash end-users lose some of the privacy Google sacrificed WPoFMD to achieve.

There are multiple parties involved here. If users don’t like the terms under which personal use is permitted, they don’t have to use their corporate device for personal use. If an organisation isn’t transparent in how a device is managed then that becomes a matter to be taken up through the appropriate channels as regulations exist to handle breaches of privacy where consent isn’t provided.

The cost of enthusiastic adoption
---------------------------------

Speaking to EMM vendors the feeling is consistent, those who went out and implemented support for WPoFMD are less than pleased with Google’s abrupt decision to remove an entire solution set. The time, effort, and the amount of backtracking that’ll be required after development of documentation, marketing and more of the support for something few vendors adopted can’t be understated. Once a source of pride and differentiation, for those who’ve launched support this is now a significant burden.

<figure class="wp-block-pullquote">> We’ll need to be more considerate in how and when we support features going forward
> 
> <cite>From an EMM vendor</cite>

</figure>These vendors now have plenty of work ahead to support this change and avoid a situation where an explicit WPoFMD enrolment doesn’t succeed if attempted in 11.

Other vendors yet to implement the deployment scenario are naturally less impacted by it, but it still invalidates the months of work undertaken getting closer to being able to support the deployment scenario.

Intune, the beneficiaries of my [doesintunesupportaecope.info](http://doesintunesupportaecope.info) website are one of the few Android Management API-based vendors of which WPoFMD support was not even a possibility given Google’s AMAPI itself has yet to get around to implementing it. With the Android 11 announcement this clearly makes sense; despite statements made at the partner summit back in May 2019 (already a year after the launch of COPE) AMAPI has continued to drag on implementation, and probably won’t now that there’s justification not to.

It’s not just EMM vendors of course; independent folks like myself, MSPs, VARs and other outlets who’ve advocated WPoFMD as the best deployment scenario offered by Android Enterprise since 8.0 for more than two years, talked to countless organisations about it, written about it extensively, now have to equally backtrack on education and recommendations, while also pointing out the alternative isn’t direct replacement depending on the use case.

Knowing some organisations spent an extortionate amount of time on fully managed, waiting to go switch to a COPE use case, only potentially to have to go back to fully managed (if the available policies don’t meet requirements) with the next major Android version sucks.

There have equally been many organisations sticking with [device administrator](/android/android-enterprise-vs-device-administrator-legacy-enrolment/) until their EMM supports WPoFMD. Learning from 11 the deployment scenario aligns less closely with legacy DA may further delay migrations to Android Enterprise, the last thing the ecosystem needs.

A better way
------------

None of this is to say many organisations *won’t* be happy with the news of enhanced privacy of course, There are examples of organisations today who go out of their way to collect as little non-work relevant data on devices as possible through already-present EMM privacy settings, and having that responsibility pulled into how the OS functions by default will be a reassurance. There are undoubtedly equally those on DA today who will be *more* enthused to switch to enhanced work profile than they would have been for WPoFMD.

While I’ve no doubt enhanced work profile will work perfectly fine for many, it would have been so much better and would have been accepted far more enthusiastically by the ecosystem if enhanced work profiles were a new, additional deployment scenario in 11, and not a replacement for WPoFMD.

If Google provided more flexibility, and not less.

There’s a growing community of &gt;150 Android Enterprise Experts around the world who’d know when to apply WPoFMD, and when to apply enhanced work profiles. There are even more MSPs who equally know Android Enterprise appropriately even without an expert badge.

Enhanced work profile as a standalone solution set is an excellent deployment scenario that fills a nice gap for the many organisations who appreciate the hands-off approach of the work profile with the option to extend management capabilities a little more than can be otherwise achieved without having to consider privacy implications.

Many organisations only care about work data, meaning WPoFMD is overkill, but will benefit greatly from being able to handle [FRP](/android/feature-spotlight-factory-reset-protection/) properly or ensure some very basic security is enforced which isn’t always easy with an unenhanced(?) work profile only deployment.

Yet, Google forcing the ecosystem into a vision of what COPE should look like at the cost of flexibility and capability rather than embracing all of the potential usecases Android solves over the competition seems like one step forward and two back.

It’s going to be interesting watching the ecosystem now take on the unnecessary challenge of swapping out WPoFMD with enhanced work profile, and the customer stories that arise from having to make the switch themselves in the next few years.

Ahead of 11, here’s an updated graphic with the newly recycled COPE deployment scenario:

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2020/02/AEtypes11-Page-6-1.png)I won’t miss the absurdly long name though.

*What’s your view of the change? Are you a user happy with the increased focus on privacy? An IT admin frustrated by the loss of capabilities? Sound off in the comments, on [LinkedIn](https://linkedin.com/in/jasonbayton) or [Twitter](https://twitter.com/jasonbayton)*