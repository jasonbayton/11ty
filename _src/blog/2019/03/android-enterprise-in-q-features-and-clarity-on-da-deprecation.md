---
title: 'Android Enterprise in Q/10: features and clarity on DA deprecation'
date: '2019-03-29T18:00:16+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 7953
tag:
    - aer
    - android
    - androidenterprise
    - androidq
    - EMM
    - 'Enterprise Mobility'
    - uem
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/android-enterprise-in-q-10-features-and-clarity-on-da-deprecation/315'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
Google recently [announced](https://android-developers.googleblog.com/2019/03/introducing-android-q-beta.html) the first beta of Q for Pixel devices (including the original Pixel!) and there’s a fair amount of [material](https://developer.android.com/preview/work) to get stuck into. I’ll focus only on things I find interesting for one reason or another below, everything else can be found in the links above or online!

This will be a bit of a living post for a while as betas continue to appear, so do check back for updates!

Without further ado..

Consumer features
-----------------

### RIP Android beam

<figure class="wp-block-image">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/03/nfc.jpg)<figcaption>Source: Digital Trends</figcaption></figure>There were [murmurs about](https://www.xda-developers.com/google-deprecate-android-beam-api-nfc-share-files/) Android beam, the sharing option for simple transfers with an NFC bump, being removed last year, however it would appear with the first beta of Q, this has now become reality.

I will sorely miss the option to natively transfer data via NFC, it’s a feature I’ve relied on heavily in my device testing, general documentation and more. Could I achieve the same with Bluetooth? Yes. But it’s not as quick and efficient as *Share &gt; Beam &gt; Bump*.

I’ll be looking out for a 3rd party solution in the short term to fill this gap (recommendations welcome!)

### Native screen recording

<figure class="wp-block-image">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/03/screen.jpg)<figcaption>Source: 9to5Google</figcaption></figure>I’ve been leveraging screen recording in Android for years. From the early days of requiring root (!) to more recently developers leveraging Google Cast as the Android platform has matured. Today I rely mostly on [AZ Screen Recorder](https://play.google.com/store/apps/details?id=com.hecorat.screenrecorder.free) and [MNML](https://play.google.com/store/apps/details?id=com.afollestad.mnmlscreenrecord). AZ has the benefit of inbuilt GIF conversion and trimming, though it’s not perfect.

I have three thoughts on native support:

1. *Finally.*
2. Will it be possible to leverage screen recording during the setup wizard with it natively supported? I’d hope so, I’d love to provide video provisioning guides alongside my existing screenshot-based [provisioning guides](/android/android-enterprise-provisioning-guides/), but recording a device with a camera is pretty rubbish.
3. In the enterprise features I saw no reference to APIs for differentiating between screenshot and screen recording. In reality it’ll likely be the one restriction for both as has been the case for iOS. Also it’s pretty raw and looks very much unfinished at the moment, so may yet be removed before final release (though hopefully not!).

### WiFi sharing capabilities

<figure class="wp-block-image">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/03/wifi.jpg)<figcaption>Source: 9to5Google</figcaption></figure>Super useful as a consumer to allow for sharing WiFi details quickly, easily and slightly more securely than is currently possible, it’s now possible to simply tap a share button to generate a QR code with the relevant connection details within.

I do however, from an enterprise perspective, very much hope this can be restricted; there’s likely more information to come, but in an office environment I wouldn’t want employees freely offering up QR codes to scan for networks they shouldn’t normally provide access to.

### Improvements to Android permissions

<figure class="wp-block-image">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/03/perms.jpg)<figcaption>Source: 9to5Google</figcaption></figure>Similar to what we’ve had with iOS for a long time, Android has finally caught up in offering more advanced location permission controls in Android Q, and Google have equally upped their game on permissions generally.

Ultimately I’m not sure this will lead to much in the way of changes on the enterprise side; organisations often either want location enabled or disabled for an application (or device-wide) so the additional control is far more applicable to personal applications and the potential for unvetted apps to abuse the permission.

### Desktop mode

<figure class="wp-block-image">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/03/desktop.jpg)<figcaption>Source: XDA Developers</figcaption></figure>Also something we’ve been hearing about for a while, desktop mode in beta 1 is currently not readily usable, but it shows Google is thinking about convergence and Android’s expanding use as a core device across multiple form factors.

I’ll be running an experiment on this very idea in the near future with Samsung, DeX and an array of docks; it’s very exciting to see native support thrown into the mix and as with Android Enterprise, I look forward to seeing a future of more consistency and reliability in picking up any Android device and having a desktop mode supported.

Enterprise features
-------------------

### Work profiles on company owned devices

Not to be confused with *work profiles on fully managed devices*, the oft-referred corporate alternative to work profiles offering control over both the parent profile (device) and the work profile in kind (aka [COPE](/android/android-glossary/#cope)).

This is not a new deployment scenario, but rather instead the introduction of corporate provisioning tools for organisations opting to leverage only work profile on their corporate devices; a deployment scenario that accommodates almost no corporate management outside of a bit of basic security.

I couldn’t help but wonder why work profile, treated and seen by most, including Google up to now, as a BYOD solution:

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/03/podo.jpg)…would be propelled into corporate-owned deployments with these new capabilities.

One consideration at least, given a lot of features in Q are reactive to the industry, is the continued lack of availability of COPE; almost two years after the release of Oreo, still only MobileIron and VMware support the deployment scenario at time of publishing – it’s even absent from Google’s own Android Management API. This is a point I’m keen to make as it was in my [2019 wishlist](/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#ubiquitous-fully-managed-devices-with-work-profiles-support), yet entering month 4 of 2019 I’m yet to see any new EMMs gain support!

In my own experience where COPE has not been possible, be that due to EMM or Android support (8.0+), organisations desiring personal use will gravitate towards work profile, despite it’s questionable suitability for many organisations struggling with the idea of losing so much control of the device, in lieu of COPE as an alternative to fully managing devices.

My experience is somewhat reinforced by other professionals in the industry:

<figure class="wp-block-embed-twitter wp-block-embed is-type-rich is-provider-twitter"><div class="wp-block-embed__wrapper">> A question to the [\#EMM](https://twitter.com/hashtag/EMM?src=hash&ref_src=twsrc%5Etfw), [\#MobileSecurity](https://twitter.com/hashtag/MobileSecurity?src=hash&ref_src=twsrc%5Etfw) industry deploying [\#AndroidEnterprise](https://twitter.com/hashtag/AndroidEnterprise?src=hash&ref_src=twsrc%5Etfw) for customers allowing personal use:  
>   
> Where the EMM, historically or currently, has NOT supported AE COPE, which deployment scenario do customers more often select?  
>   
> Reasons in the replies please!
> 
> — Jason Bayton (@JasonBayton) [March 28, 2019](https://twitter.com/JasonBayton/status/1111256034461532161?ref_src=twsrc%5Etfw)

<script async="" charset="utf-8" src="https://platform.twitter.com/widgets.js"></script></div></figure>There’s certainly justification for making the process of deploying work profiles on corporate devices simpler and quicker for the above alone, but that’s just *one* reason.

My friend [Arsen](https://www.linkedin.com/in/profileab/) quipped:

> This is probably useful where COPE will not fly due to compliance/privacy rules/regulations, and makes the whole ecosystem more uniform.
> 
> <cite>Arsen, [Android Q Enterprise Features for EMM Admin](https://arsenb.wordpress.com/2019/03/21/android-q-enterprise-features-for-emm-admin)</cite>

And to that I’d agree, there are undoubtedly situations concerning privacy where work profile may be considered the *only* feasible deployment scenario on a platform level to avoid syncing personal app inventory to an EMM.

Wherever work profile is deemed suitable and ultimately chosen as the deployment scenario for corporate devices, there are clear benefits to integrating with existing provisioning methods. These are:

**Leveraging DPC extras** – as the device is provisioned it pulls down the DPC (agent). Whether it then responds with either the fully managed or work profile enrolment process (which amongst other criteria, appears it can be triggered by an additional field in [DPC extras](/android/android-enterprise-zero-touch-dpc-extras-collection/)), it can equally pass through the [DPC extras](/android/android-enterprise-zero-touch-dpc-extras-collection/) specified in the QR/NFC payloads or zero-touch configuration. This will make enrolment simpler for end-users not needing to know which server, enrolment token or anything else that would otherwise normally need to be input manually.

**Preinstallation of the relevant DPC** – with the corporate device registered with zero-touch, whether the device is factory reset or handed out brand new, the overhead associated with setting up the device and pulling down the correct agent from Play can be removed. This will shorten [enrolment guides](/android/android-enterprise-provisioning-guides/), and provide a more consistent, simpler UX for all corporate devices, as Arsen pointed out above. It also reintroduces some ownership, automatically prompting users to enrol after a factory reset or when new out of the box, something that wasn’t possible in earlier versions of Android.

**Consistent UX** – Android Enterprise is all about consistency, managing various different devices in the same, reliable, way. Providing corporate provisioning capabilities to devices destined only for a work profile, if this is what the organisation so desires, brings consistency – particularly in a mixed environment of deployment scenarios – and offers the same provisioning experience irrespective of how the device will ultimately be managed; one process for everything.

But there are still challenges to be overcome despite these. I had an ardent phone conversation with another good friend in the industry, [Jordan](https://www.linkedin.com/in/jordanoc/), in which we identified two very fundamental issues to overcome for utilising work profile for corporate-owned devices:

<figure class="wp-block-pullquote">> Work profile is inherently – arguably intentionally – more challenging to manage due to its privacy-first design; **the end-user has full control over the profile, both whether it’s switched on/off or removed entirely.**

</figure>There’s really nothing preventing an end-user from disabling or removing the work profile entirely, leaving the device effectively unmanaged. An organisation desiring only to wall-off their corporate data with little concern for what an end-user does with the personal side will no doubt at the very least want to ensure it’s not immediately removed once provisioned. A policy to prevent removal of the work profile for devices known to have been provisioned or otherwise identified as corporate-owned would address this, but it must not enable organisational overreach for genuine BYOD usecases.

<figure class="wp-block-pullquote">> Factory Reset Protection has been the bane of existence for many organisations managing legacy fleets, and **could** **be a pretty annoying, potentially costly issue to deal with for work profile deployments.**

</figure>FRP is not normally a challenge with a work profile deployment as the devices would not typically be corporate-owned and thus wouldn’t be handed back. In order to address work profile being a viable solution for corporate-owned devices, it must be possible for FRP to be disabled.

<div class="bs-callout bs-callout-success">### What is Factory Reset Protection?

Want to know more about Factory Reset Protection (FRP)? Check out [Feature spotlight: Factory Reset Protection](/android/feature-spotlight-factory-reset-protection/)</div>Ultimately the idea appears to be offering a simpler, more consistent experience which puts organisations in control of corporate devices running a work profile. It’s not a recommendation by Google to start deploying work profile in lieu of fully managed or COPE, but where its use is justified (however the organisation justifies it), it ultimately won’t be more difficult to adopt because of that choice.

Given it’s down to EMMs to implement however, one can only guess how long it takes for this capability to emerge in the wild.

With that out of the way, what is definitely, 100% useful is the added information now available when undertaking a work profile deployment, including secure-hardware-attested:

- Serial
- IMEI
- MEID

Any additional information to better validate the devices undergoing provisioning can only be a positive thing. These do require TEE/SE and device-ID attestation (as well as support for zero-touch) so will ultimately be OEM dependent.

Before moving on, one further snippet caught my eye:

> Work profile devices provisioned with a QR code will prompt users to add their personal account before returning them to the home screen. Work profile devices provisioned via zero touch or NFC won’t be prompted to add their personal account.
> 
> <cite>Android Developers, [What’s new for Android in the enterprise](https://developer.android.com/preview/work)</cite>

There’s no justification or reasoning for this mentioned, and it’s rather curious that on a work profile device the only provisioning method to prompt users to add their Google accounts as part of the enrolment flow is QR, though there’s undoubtedly potentially a technical reason as to why this may be the case, temporarily or otherwise.

Having dealt with my fair share of COPE deployments to date, one frequent complaint is the fragmented means in which users are directed to set up their devices after provisioning and enrolment; often a device will display a prompt either in settings or as a notification to *finish setting up your device* which then brings up the relevant aspects of the device wizard to input accounts, restore apps, etc. This doesn’t always happen though. It’s odd to see an issue in the same vein may now impact work profile deployments when provisioned with zero-touch or NFC.

Being the first beta, my hope is this will change before release, and brings similar improvements to the COPE experience.

### Cross-profile calendar access

In Q it’ll be possible to permit the sharing of work calendar details into the personal calendar, not dissimilar to how contact sharing works today –

- You can see the event in the personal calendar
- If you attempt to edit it, you’re redirected to the work calendar

As someone who’s run a work profile consistently for the last couple of years on my personal devices, I can’t stress enough how much this will improve my workflow. All too often I’ll schedule a personal event and have to jump in and out of the personal/work calendars to ensure there’s no overlap. Expanding profile switching capabilities now available in Gmail and other applications can help, but only so much.

There is no information explicitly specified on the level of detail permitted to be shared, whether that’s as much as everything or as little as free/busy only, but the information is seemingly hidden in plain sight.

The following APIs are defined:

- EXTRA\_EVENT\_ID
- EXTRA\_EVENT\_BEGIN\_TIME
- EXTRA\_EVENT\_END\_TIME
- EXTRA\_EVENT\_ALL\_DAY

Which suggests calendar entry details won’t be available and will require redirection to the work calendar, but even event ID, which I take to mean the title in this case [as the documentation isn’t super clear](https://developer.android.com/reference/android/provider/CalendarContract#EXTRA_EVENT_ID), can give away more information than desired!

There are interesting privacy implications to exposing calendar entries outside of what could be a passcode-protected work profile, so anyone untoward gaining physical access to the device could well see something they shouldn’t via the personal app rather than potentially requiring secondary authentication to look at the work calendar.

### Limiting input methods

This is a welcome addition. There have been times where customers have expressed interest in preventing third-party keyboards from interacting with corporate data, and for good reason!

It only takes one PHA masquerading as a fancy new keyboard to consume every keystroke and gain access to untold information – usernames, passwords, conversation histories.. the list goes on.

Unfortunately up to now whitelisting input methods was a global action, which means the whole device was limited only to the specified keyboard, which may not be considered desirable despite the benefits for security.

With this feature in Q, only the profile is targeted, so end-users can opt for the keyboard of their choice on the device, and only be limited to the organisation-defined input method when interacting with work profile applications. Win-win (assuming there is no masquerading PHA of course, then it’s only a win for the organisation!).

### Manual system update installation

Following the introduction of 90 day-deferral for system updates in Pie, this feels like a considered iteration to Android system update management.

From Q it’ll be possible to further control updates as follows:

- Test an update on a small number of devices before installing them widely.
- Avoid duplicate downloads on bandwidth-limited networks.
- Stagger installations, or update devices only when they’re not being used.

My personal favourite is the ability to download an update once, store it on the network and push it out to any/all devices as required, without said devices all attempting to download the updates individually from the internet. Obviously this requires devices be on the network to benefit, but that’s when it’s going to matter most in any case – fleets of warehouse devices, or POS kit. It’d be far more efficient.

I’m also fond of staggering installs. It’s all well and good scheduling updates for between 12am and 6am every night as is currently possible, but you’ve no guarantee the device(s) will be switched on. Pushing an update on idle is a nice way of ensuring the device is online and not actively in use for the 10 or so minutes it could be unavailable (or, simply for a reboot in the case of dual partitioned devices).

There’s no information on how manually pushing updates will affect a deferral policy currently in place, though my hope would be it is respected until the 90 days is up in order to maintain consistency.

### EAP WiFi provisioning &amp; keystore changes

In Q Google have made a change to how the keystore functions, namely no longer requiring a passcode is set in order for certs to be stored.

While arguably this might raise an eyebrow or two, it was deemed a necessary compromise for the enablement of capabilities like EAP WiFi support during provisioning.

Now, devices will be able to scan a QR/bump with NFC and obtain the relevant details and certificates to authenticate with an EAP WiFi network, meaning connectivity is automatic and silent! Perfect for bulk provisioning and far more efficient than having to type in credentials or input them plaintext within the payloads.

Furthermore, there are many situations in the industry where devices simply don’t utilise passcodes. They may be single-app or otherwise kiosked, POS, or utilised in other dedicated scenarios where a passcode either doesn’t fit the workflow or causes issues in other ways.

Clarity on DA deprecation in Q
------------------------------

For over a year I’ve been talking about DA deprecation with the upcoming Q release. I, like others, have said many times broadly once devices update or ship with Android Q, device admin management will no longer work.

With Q now rapidly approaching, it’s time to set expectations on exactly what to expect.

DA deprecation very much happens with Android Q, however in order for the referenced APIs being deprecated to no longer function, the application(s) on the device will need to target the Q API level.

This means, in fact, should a device update to Q right now, DA management will continue to work. When it stops functioning depends on a few things:

1. When the EMM DPC is updated to target Q
2. When Google state the minimum API level of Google Play is increasing to Q
3. Any additional factors, such as [AER for EMM](/2019/01/aer-expands-android-enterprise-recommended-for-emms/) requirements changing

Based on what we’ve seen to date, Google likely won’t be setting the minimum API level of Play to Q before 2020, as it’s increasing only to Pie this year.

Any changes to the AER for EMM requirements may happen in the next few months, however having only recently launched there may yet be a period of quiet whilst in-progress EMMs get validated and through the door.

This leaves option 1, when the EMM opts themselves to target Q.

In order to leverage Q features, such as those I’ve mentioned above and all the ones I haven’t, the DPC will need to target the Q API level. It’s therefore in their best interest to do so as quickly as possible, but every vendor is different.

With that in mind, there’s no hard line in the sand at the moment on when DA deprecation will impact every organisation (in 2019 at least), but rather it’ll be a case of confirming with EMM vendors directly their plans and timelines.

I must admit the thought of a hard deprecation with the upgrade to, or new devices with, Android Q was somewhat appealing. It offered a clear view and timeline for which to meet (or have customers meet) and lit a number of fires in the ecosystem to get moved from DA to AE.

Instead what we have is both a small buffer for those who haven’t yet made the jump, and an air of uncertainty as to how long after the official release of Q vendors will target the new API level.

With that said, this should not impact any existing plans to migrate from legacy management to Android Enterprise, as the [many benefits](/android/what-is-android-enterprise-and-why-is-it-used/) I’ve [outlined](/android/considerations-for-choosing-android-in-the-enterprise/) in various [documents](/android) should justify [the switch](/android/considerations-when-migrating-from-device-administrator-to-android-enterprise/) irrespective of whether or not there may be a few more weeks/months of wiggle room. If organisations get to a point of deploying Q without Android Enterprise environments already in place, there is a very real likelihood of DA deprecation adversely affecting the business when it does come into effect.

For those looking to set up a PoC today, check out the links above, as well as Google’s [DA-AE migration bluebook](http://static.googleusercontent.com/media/android.com/en/enterprise/static/2016/pdfs/enterprise/Android-Enterprise-Migration-Bluebook_2019.pdf).

Conclusion
----------

[Just as last year](/2018/03/android-p-demonstrates-googles-focus-on-the-enterprise/) I’ve only scratched the surface of new features, but those above are what I’ve personally taken an interest in. I’m always open for a chat should any other new features and their potential implications warrant a discussion!

Android Q, compared to Pie, feels like a nice incremental upgrade full of changes that compliment existing tools and features, there aren’t necessarily any major changes, like Pie’s dramatic work profile UX changes and improvements, the user management for dedicated devices. It’s something of a sign of maturity, which is only a good thing.

Unfortunately it doesn’t appear my [wishlist items](/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/) made it into Q, but given Q features were likely locked in last year already, anything that did happen to show up would have been coincidental! I’ll look out for them again in R.

*What do you think of the new enterprise features in Q? Anything you’re excited about? Anything missing? Feel free to leave a comment, or find me on [LinkedIn](https://linkedin.com/in/jasonbayton) and [Twitter](https://twitter.com/jasonbayton) to discuss!*