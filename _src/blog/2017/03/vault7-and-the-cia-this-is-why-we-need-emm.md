---
title: 'Vault7 and the CIA: This is why we need EMM'
date: '2017-03-16T14:20:34+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 3804
tag:
    - android
    - cia
    - EMM
    - Enterprise
    - fbi
    - management
    - MDM
    - mobility
    - update
    - vulnerability
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/vault7-and-the-cia-this-is-why-we-need-emm/87'
tags:
    - Enterprise
    - Opinion
---
In a post-Snowden world, the recent Wikileaks dump exposing myriads of vulnerabilities and the tools the CIA use to exploit them across iOS, Android, Windows and the wider connected ecosystem shouldn’t be all that surprising. This is, after all, what these secretive government agencies do in order to do their jobs effectively. A look at my last [This is why we need MDM](/2016/02/apple-vs-the-fbi-this-is-why-we-need-mdm/) article shows this mentality is widespread throughout various agencies.

Some may be focusing on the ethics of their behaviour here, but there’s a more concerning issue at hand; in making this information available to the public, Wikileaks has armed the general population with some of the tools necessary (Wikileaks redacted a number of them) to do everything the CIA, GCHQ and the others have been doing with alarmingly little effort, and this is bad.

Impacted companies are rushing to patch the previously undisclosed vulnerabilities with Samsung, Microsoft and Apple having all responded in the hours following the leak:

> We are aware of the report in question and are urgently looking into the matter

*– Samsung*

> We are aware of the report and are looking into it

*– Microsoft*

> While our initial analysis indicates that many of the issues leaked today were already patched in the latest iOS, we will continue work to rapidly address any identified vulnerabilities.
> 
> We always urge customers to download the latest iOS to make sure they have the most recent security update

*– Apple*

Google, whose Android OS is one of the most fragmented in existence, followed up later with the following:

> As we’ve reviewed the documents, we’re confident that security updates and protections in both Chrome and Android already shield users from many of these alleged vulnerabilities. Our analysis is ongoing and we will implement any further necessary protections. We’ve always made security a top priority and we continue to invest in our defenses

*– Google*

While investigations and patches are underway, both individuals and enterprises are exposed to a risk much greater than just Government snooping. Once again and for the second time in just over a year, this is why we need EMM – Enterprise Mobility Management.

Managing and securing a mobile estate with EMM
==============================================

There are a number of measures that can be taken to minimise the fallout from this event. Even if it’s almost impossible to make the devices impervious to the vulnerabilities exposed, it isn’t difficult to make valuable corporate data much harder to steal. With EMM the capabilities are there, it’s just a case of implementing them.

Evaluate the estate
-------------------

Every device enrolled onto an EMM platform reports its operating system, OS version, patch level (where applicable), and many other valuable attributes by default. EMM administrators, utilising the information in the leak, can identify the most at-risk devices in the estate and act upon this. For iOS the majority of vulnerabilities were identified at iOS 9 and below, for Android, version 6.0 and below.

### Update or replace

Over 80% of Apple devices on the market are running the latest version of iOS and therefore pose the least amount of risk in the mobile estate, broadly speaking. Naturally the enterprise market isn’t known for pushing updates as soon as they land, but for enrolled devices, EMM administrators can identify and strongly encourage device owners to update to the latest iOS release. Those that can’t be updated to iOS 10 are likely old enough that replacement may be a viable option.

For Android this is a little trickier:

[![](https://cdn.bayton.org/uploads/2017/03/chart-e1488987665830.png)](/https://cdn.bayton.org/uploads/2017/03/chart-e1488987665830.png)

With the majority of Android devices sitting between Lollipop ([23.1% v.5.1](https://developer.android.com/about/dashboards/index.html)) and Marshmallow ([31.3% v.6.0](https://developer.android.com/about/dashboards/index.html)), even bought new today, device replacement may not be viable. It’s not all bad news however; from Android Lollipop Google began pushing security updates on a regular basis in order to tackle the worst vulnerabilities as they’re discovered. These updates are distributed independently of OS updates, allowing Google to push them out in a controlled, reliable fashion using Play Services.

EMM platforms should be logging patch levels of enrolled Android devices, so utilise this information to ensure devices are up to date. Those that are not updated often may not be secure enough to remain in the organisation.

Android devices under version 5.0 should be flagged for replacement as once again they’re likely end of life, exceptions being for rugged devices being actively developed and known to be secure – this may or may not be easy to verify but needs to be established with the respective manufacturers.

While evaluating the devices to replace, use the opportunity to form a new business case for the devices the business should support. Perhaps opting only for devices that support encryption, Android for Work or KNOX, etc. Once a clear process is in place, it will be much easier to support the estate in future.

### Prevent (re-)enrollment

Particularly relevant for BYOD environments, where simply replacing a device may not be within the power of the enterprise, deciding where to draw the line on supported OS versions can mean the difference between keeping data secure on a device and leaving it wide open for attackers to take at will.

Most EMM solutions are capable of blocking enrolment for devices below a certain OS version across various platforms, or particular platforms entirely. It is down to the administrator and the business to assess the risk in order to decide what end-users are no longer allowed to enrol (even if their Gingerbread tablet is perfect for email).

If as part of the update or replace undertaking devices not belonging to the company were unenrolled/retired, the above will ensure they cannot be re-enrolled, saving the EMM admin from having to check for disallowed OS versions on a regular basis, only returning to make changes as versions become unsupported in the future.

Secure the estate
-----------------

With the out of date devices removed from the equation, it’s time to start implementing stricter control over the devices that remain. These devices, as it happens, will support the implementation of a lot more of the below recommendations.

### Enforce encryption

Modern devices support encryption by default, though it may not be enabled out of the box. By enforcing encryption across all devices in the estate, it adds a base level of security, protecting the data at rest on the device from unauthorised access.

Optionally additionally enforce SDcard encryption to prevent the access of external media from any device but the one that encrypts it (if SDcard storage is permitted).

Keep in mind: Encryption may reduce performance and for lower-powered devices this may be more noticeable to end-users. Additionally, the encryption process can be slow and time-consuming. Ensure the policy isn’t applied at 9am on a work day if end-users rely on devices for BAU responsibilities.

### Containerise corporate data

As long as corporate data resides within the user-space of a device it will always be at risk; the data can be accessed using file managers, emails can be copied and forwarded to other accounts and confidential information may be stolen if the device is compromised.

Containerisation adds an additional layer of encryption and, as the name suggests, encapsulates corporate data and applications within a secure container environment on the device which cannot be accessed using typical applications. In combination with DLP (data loss protection) preventing screenshots, copy/paste, opening documents in apps outside of the container and more, it’s possible to ensure corporate data is fully secured.

EMM platforms generally offer the same type of deployment – the platform distributes an application which will usually be passcode-enabled. Within this app end-users will find their corporate applications (like email, in-house apps, a secure browser and more), and data (typically secured both at rest and in transit). Attempting to access corporate apps and data outside of the container is simply not possible.

Other solutions such as Android Enterprise secure corporate data on another device profile while integrating the corporate applications directly into the current user space to offer a seamless experience. Samsung takes Android Enterprise a step further with KNOX, offering hardware-backed secure workspaces and device attestation certified for government use.

Excluding Android Enterprise which doesn’t currently support a passcode requirement, gaining access to a container-enabled device isn’t good enough to obtain corporate data. The device in question would effectively need to be compromised twice for a breach to occur.

### Restrict device functionality

Utilise EMM lockdown/restrictions profiles to prevent end-users from enabling device functionality that may be considered risky, for example:

- USB debugging
- App installation from unknown sources
- iCloud backup
- USB mass storage (accessing the device filesystem via USB cable connected to a PC)
- Developer options
- Airdrop
- iCloud Keychain (storing passwords in a personal iCloud account)

Even with corporate data containerised, preventing things like USB debugging and developer options will further harden the device against threats inadvertently introduced by the user while preventing APK sideloading (unknown sources) prevents installation of potentially harmful applications from outside of the Play Store. Similarly preventing the storage of data and passwords in iCloud reduces the attack vector should that account be compromised.

### Block access to corporate data

Particularly in iOS where the end-user can manually override some EMM-enforced settings, but also if a device fails to encrypt or an end-user roots/jailbreaks a device, it is inevitable occasionally a device may not fall in line with corporate requirements. In this case it will be considered out of compliance.

Compliance rules may be put in place to block or quarantine an already-enrolled device on the EMM platform, preventing further access to corporate data until such time the device is either fixed, updated or replaced (the EMM agent on the device should explain why the action was enforced). This automated access control is a nice way to strongly encourage an end-user to resolve the out of compliance state (as noted in update or replace above) without admin intervention. As soon as the device is compliant, all blocks are lifted.

For more serious matters, such as the device being rooted or jailbroken, the device can be automatically partially or fully wiped. This is necessary as once the device is compromised it’s very difficult to trust the integrity of the device and its data.

Keep in mind by enforcing these automated actions, the end-user may be unable to undertake their BAU responsibilities and a support request will likely follow.

Conclusion
==========

Although nothing is impenetrable given enough time and effort, EMM platforms offer simple, effective management and security enforcement across the whole mobile estate. In combination with modern, supported devices and the right balance between security and user freedom, it’s entirely possible to mobilise the workforce while ensuring corporate data is secure.

As situations such as Vault 7 become more common and mobile device usage across the world continues to increase exponentially, any organisation serious about securing corporate data needs to have an Enterprise Mobility Management solution.

The mentioned features above are only some of many capabilities of an EMM solution and by no means cover a fully managed deployment. In addition, this doesn’t cover additional tools such as Threat Management.

*Does your organisation use an EMM solution? Are you concerned about the latest Wikileaks dump? Are you prepared? Let me know in the comments!*

*As always I’m [@jasonbayton](https://twitter.com/jasonbayton) on Twitter, [+JasonBayton](https://twitter.com/jasonbayton) on Google+, [/in/jasonbayton](https://linkedin.com/in/jasonbayton) on Linkedin or [@bayton.org](https://facebook.com/bayton.org) on Facebook. You’re also welcome to leave a comment below or send me an [email](mailto:jason@bayton.org).* *Free free to get in touch to discuss this or any other topics you have in mind!*