---
title: 'A guide to deploying Android Enterprise'
date: '2019-03-07T22:58:36+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
tags: 
    - Enterprise
layout: base.njk
permalink: false
---

## Foreword

Enterprise Mobility should be a key area of focus for organisations; with mobile usage exceeding traditional PC and laptop usage in recent years, it’s imperative that organisations take this topic very seriously.

Android devices have generated an impressive and consistent XX% of business shipments over recent years, with Gartner predicting XX million shipments in 2020. Despite the incredible number of Android devices finding their way into business, only roughly XX% are considered under management, thereby resulting in a staggering number of organisations the world over yet to benefit from Android Enterprise.

The Bayton guide to deploying Android Enterprise has been put together to help organisations understand and develop an Android-based mobility strategy that is well-rounded, thoughtful and beneficial to the business by breaking down a number of key considerations across several areas of focus. The guide touches on device selection, project planning, security, troubleshooting and more.

This guide will help and encourage organisations to better understand the mobile landscape, the need for a mobility strategy, the requirement for a good balance between strong security and user convenience and how best to leverage Android devices whilst ensuring they’re secure, managed, and provide the best experience possible to promote productive use.

This guide is designed to target organisations across several stages of a mobility journey, and thusly it may be sensible to skip sections as required.

## Planning & preparation

Mobility as a business tool has the ability to have far-reaching, positive effects on the productivity and financial standing of the entire business. Transforming how organisations work, from a fixed office location with little flexibility to a culture that enables working from anywhere, at any time, with all of the modern tools available at anyone’s disposal means employees are generally happier, more productive and can work far more autonomously - all benefits for the business.

Defining an enterprise mobility strategy with these goals in mind prior to undertaking a deployment project will go a long way towards ensuring the end results align to business requirements and objectives.

Like other corporate strategies, a mobility strategy is a living document that will change over time as industry and business needs continue to mature, and should receive input not only from IT, but other stakeholders within the business, including finance, HR, operations, etc., because the strategy should include financial and operational elements in addition to technical requirements, bringing together the views and opinions of a range of business functions will help to form both a rich and realistic strategy that will be much easier to align to.

The following non-exhaustive topics may help in defining a strategy.

### Defining objectives

All projects require objectives; what is the organisation looking to achieve with this project? Increased management, improved security, cost savings or otherwise?

By identifying challenges, it’s quick and simple to generate a list of objectives for things to improve upon:

* Are end-users are too frequently logging issues against devices?
* Are end-users accessing corporate data freely?
* Are existing devices several years out of date?
* Are existing devices suitable for the work undertaken?
* Has data leakage become a concern?
* Are data costs increasing?
* Is there a lack of consistency over device selection?
* Are devices too expensive? Or too cheap (easily broken)?
* Are devices losing support more rapidly than expected?
* ..etc

It may be, for example, end-users today have unrestricted access to Exchange ActiveSync on the open internet, or mix applications used for access to corporate data with those that allow the upload of data to remote servers not under organisational control. As far as challenges go, data leakage is one of the most severe.

Once the challenges are documented, considerations for the wider scope of the project can be addressed.

<div class="callout">

Why Android?

A well known misconception in the industry is Android is not a secure platform, or more vaguely is not suitable for enterprise use. This is demonstrably incorrect.

Gartner has consistently ranked Android higher than iOS for security controls between 2016-2019, as one example. For other reasons to consider the OS, read Considerations for choosing Android in the Enterprise and continue below.

</div>

### Deployment options

Android has matured rapidly over the last few years to become the most versatile mobile operating system on the market; this is readily and clearly demonstrated even in the available methods for deployment.

How devices reach end-users is an important concern for all mobility projects. While historically this was quite a difficult undertaking in certain circumstances, particularly due to potential issues around account management, expecting end-users to follow lengthy setup and/or enrolment guides or even provisioning the devices in-house before shipping them out (or arranging for collection) with  Android zero-touch enrolment available and rolling out to new partners and resellers on a frequent basis, and Samsung’s Knox Mobile Enrolment (KME) programme, devices can be ready to enrol from the moment they’re taken out of the box and connected to a network. Add in the Bulk Purchase Program (US only) for managing provisioning and both free & paid applications on devices automatically and completely over the air, and the deployment concern decreases dramatically.

Indeed, provisioning a device today no longer requires devices are pre-provisioned in the office and sent out, nor do organisations need to worry about manual account creation for applications and services.

Utilising the tools available, devices may be shipped directly to end-users, taken out of the box and are required to enrol into management as soon as network connectivity is achieved.

<div class="callout">

The Android value-add

Where data separation is critical in how devices are used, whether opting for BYOD or Corporately Owned, Personally Enabled (COPE), Android leads the way for data isolation and sandboxing. Recognised by Gartner as a leader for security controls, kernel security and data isolation, the Android operating system is built from the ground up not only to protect corporate data, but to respect user privacy in BYOD deployments and ensure the work/life balance is prioritised.

</div>

Where IT-lead deployments are still desired or required, provisioning a fully managed (COBO) or fully managed with work profile (COPE) device can be done from the device welcome screen using NFC, by scanning a QR code or inputting a DPC identifier universally, with options such as barcode scanning and even provisioning based on an audio clip being offered by OEMs such as Zebra.

In combination with an EMM that supports staging, devices can be fully provisioned and enrolled in one go, without the need for multiple steps.

### Device selection

Device selection has long been a difficult task for organisations; with the wide selection of Android devices on the market catering for every use-case and budget, it can be all to easy to end up with a fleet of devices that could potentially not be fit for purpose; this even more likely where the devices have not been validated GMS certified and may not conform to the recommendations and requirements set out by Google.

With the introduction of [Android Enterprise Recommended](https://www.android.com/enterprise/recommended/), Google has created a new benchmark for enterprise-capable devices ensuring a minimum specification is met to guarantee devices are able to handle enterprise workloads, while also offering enhanced functionality, including:

* Mandatory zero-touch enrolment support
* QR code provisioning support
* Patching within 90 days for 3 years
* Current OS version plus one letter upgrade support

Adding to this, all Android Enterprise Recommended devices offer a reliable and consistent user experience (UX) meaning more OEMs and device types may be supported in the business without the overhead of having to understand the nuances of each device.

With Android Enterprise Recommended, the choice of devices is automatically reduced to only those Google recommend, meaning organisations can instead focus on budgetary and functional requirements without the worry of finding devices are not fit for purpose.

Taking this a step further, with Android One both the UX _and_ the UI are consistent across OEMs; Android One provides a vanilla Android experience no matter which device is picked up, meaning OEM-specific OS customisations will not be present. Android One affords organisations the flexibility of purchasing the hardware of choice with the guarantee of a pure, always up to date Android experience otherwise reserved for Pixel.

With that said, understanding how devices will be used will ultimately make device selection far simpler still:

* Do you require COSU, or single-use kiosked devices?
* Are the devices intended for mobility or to be used in a static location?
* Point of Sale (POS), printers and other bespoke devices can be managed, as well as traditional phones, tablets and rugged devices depending on the OS.
* Which environment will devices be used in?
* Should rugged devices - or heavily protected consumer devices be considered?
* Are flagship devices under consideration, or is budget a concern?
* Who pays for the devices and their use?

Based on the requirements defined when considering the above, this will lead organically in many cases to the type of devices best suited; for those undecided, the types of devices may be broken down as follows:

**Rugged -** In an environment such as logistics or warehousing, [rugged devices](https://www.blog.google/products/android-enterprise/android-enterprise-recommended-rugged-devices/) typically excel. Not only will a rugged device be far more resistant to damage from drops and knocks, but many offer enhanced functionality corresponding to the type of market they’re used in, such as barcode scanners for logistics and warehousing, or air quality sensors for construction or health and safety environments. Rugged devices come in many shapes and sizes and can be mounted in a number of unique ways depending on their use.

**Dedicated -** For stores, commercial displays, or other scenarios wherein a device may be permanently tethered to a fixed location. Android runs on everything from tablets to bespoke point of sale units, interactive displays and more, all capable of being managed equally and offering a consistent user experience.

**Knowledge worker -** In field-based activities and/or sales activities both phones and tablets are often used. These devices are often used for pitching, presentations, collecting information in the field and more, they may also be kiosked, but not necessarily. With the prevalence of corporate data residing on mobile worker devices, strong security and data loss prevention controls will need to be implemented.

**Everyday mobility -** For devices in every-day environments, such as a work-issued device for day to day phone activities. These devices are frequently COPE or BYOD, are used in many cases for PIM and resource access when not at a fixed location. For BYOD, striking a balance between security and privacy is critical.

<div class="callout">

The Android value-add

Android offers a wide range of devices in various form factors and budgets to suit the needs of the business. 
From fixed terminals to projected displays, ruggedised tablets or premium flagships, Android empowers organisations with the right device for any use case.

</div>

Before agreeing to the purchase of any devices, it’s in the best interest of the organisation to validate the following:

* Are the devices recently launched or coming towards end of production? If the latter, even Android Enterprise Recommended devices are only guaranteed patches for 3 years from date of release, and availability of the hardware may prove a challenge for replacements.
* How frequently are devices patched? Even if the device is no longer getting letter upgrades, frequent security patches will keep it secure.
* Have the devices been validated to work with the solution(s) the organisation relies on daily? A small PoC with select users and test devices ensuring all usage scenarios would validate this and a number of OEMs or resellers may be prepared to loan devices to assist with this.
* Are the devices GMS certified?

With the above considered in conjunction with standard due diligence of the organisation, the right devices can be obtained.

### Selecting an EMM solution

Finding an EMM platform that fits the requirements of an organisation should typically not be a difficult undertaking. Gartner’s magic quadrant offers a list of market leaders and demo environments are easy to come by.

Some considerations, though:

* Does the EMM platform need to be cloud or on-prem?
* If on-prem, does it install onto an existing machine (virtual or physical) or as a virtual appliance?
* If it’s virtual, does it support common hypervisors? VMware/Hyper-V, Azure, AWS?
* EMM licensing varies wildly, with some offering one license for everything, whilst others split functionality into multiple paid tiers.
* If cloud, does it meet the security requirements and certifications the organisation may be obliged to align to?
* What support agreements need to be considered?
* Different EMMs excel in different areas. Some will be leaders in Android management, others iOS, Windows, MacOS or even IoT.
* Is the venor well known and established, or a relative newcomer?

**Cloud or on-prem:**Cloud deployments are rightly considered to be easier and faster to deploy, after all it is the EMM vendor hosting, updating and supporting the infrastructure with no responsibility on the organisation to maintain uptime. Even if a cloud deployment is selected though, if the organisation wishes to grant access to internal resources (such as Exchange, Sharepoint, etc) then a standalone component will normally need to be installed on the organisation’s network. Similarly, in order to sync with Active Directory, an LDAP sync tool or appliance will need to be installed. Alternatively for organisations leveraging an identity provider, most will integrate without much effort.

On-prem deployments can offer more security and control over the systems in use, whilst reducing the number of other on-prem components required as the EMM platform may be able to communicate directly with back-end services. However, installing a solution on-prem brings with it a decent amount of overhead, including patching, hardware resources, requirement for a support function and so on. Depending on corporate policy over security, convenience and governance requirements, on-premise may be preferred over cloud, or the other way around.

**Licensing:**Some EMM vendors offer perpetual licensing for on-prem installations, whilst in the cloud only subscription options are available. This may be a contributing factor in how an EMM solution is deployed, though keep in mind even perpetual licenses will often come with an annual fee for support, maintenance or otherwise regardless.

Furthermore, as licensing is often (but not always) provided in tiers, knowing the capabilities the organisation wishes to support, be that application deployment, kerberos authentication, per-app VPN capabilities, expense management or otherwise, comparing EMM platform license tiers to understand what functionality is available on what platforms at what cost will help to ensure the organisation isn’t paying for more than required. Consider also, some EMMs will permit the bolt-on of features at lower cost than stepping up a license tier.

**In-life Support:**To expand on support, depending on region and EMM provider, the support model can vary dramatically, as can how the provider engages with customers. Some will offer direct sales and support, whilst others rely on a partner ecosystem. Even those that offer support and professional services directly will also support a large partner network.

Partners often offer additional services over and above license sales and implementation, such as a managed service, consultancy, extended support, and regular engagements to ensure industry standards are met and the solution is running as intended. Partners will also assist in creating a mobility strategy, device selection and more; for organisations who need a little extra help, partners can be extremely valuable.

**Feature/functionality support:**After deciding on the devices and deployment scenarios the organisation wants to use, it is much easier to then compare solutions against the capabilities the device supports and those outlined. For example, the Android fully managed work profile (COPE) deployment scenario released in conjunction with Android Oreo is supported by few EMM providers today, so if that popular functionality is deemed a requirement then this will shorten the list of available vendors accordingly.

More generally, Android enterprise API support does vary between EMMs; while feature parity for the API set is progressing, particularly with the likes of OEMConfig potentially making the lives of EMM vendors easier once it’s adopted, it’s still a great idea to request documentation outlining capabilities before making a decision.

With a plan in place, it’s time to look at how to implement it.

## Implementation

A common, recurring issue at the time of implementation is not fully considering the security, privacy and productivity requirements of the workforce. Typically a balance will need to be found between security and convenience that meets the needs of the organisation, however how it is implemented can mean the difference between a workforce that can’t undertake their day-to-day tasks, and one where data leakage is rife.

Furthermore, understanding how best to deploy devices into the organisation ahead of time will result in far fewer headaches in future. Programs such as Android zero-touch enrolment deployed from the beginning will take a lot of effort out of provisioning devices and prevent the need to bring the devices back to base when issues arise, for example.

Adding to this, with the enforcement of GDPR, organisations must be stringent in the data collected, particularly with BYOD deployments. An EMM deployed with privacy defaults may be collecting app inventories, personal details, a full stack of device details and more; this information, if not related to a corporately owned device, may lead to problems should it be made public via any means.

Consider some of the following areas when undertaking an implementation.

### Security

The days of all corporate data being stored securely on a corporate network are at an end, with corporate data often sitting on various mobile endpoints, finding the right balance between convenience and security is a struggle many organisations face today. Outlined below are a number of industry best practices to consider during implementation which will aid the process somewhat.

**Passcode -**Passcodes are a given on most devices today and a key requirement for for encryption. Although setting up a passcode forms part of the setup wizard for most devices today, end-users do frequently opt to skip them for convenience, or rely on the least secure option - pattern.

As mobile devices hold anything from corporate email to confidential documentation, a strong passcode must be enforced.

The type of passcode to enforce is largely up to each individual organisation and how closely it must be tied to corporate policies, however industry best practice is currently a six to eight digit PIN as this offers a passcode both difficult to bruteforce (minimum of 1 million combinations) while being easier for end-users to remember. In comparison, a long, alphanumeric passcode may be more difficult to remember, more difficult to type and lead to the type of frustration that results in passcodes being written down.

Biometrics may also be added into the mix, though arguably anything other than fingerprint authentication shouldn’t be considered strong enough to protect corporate data, even fingerprint authentication itself could be considered opting for convenience over security.

Other industry best practices include limiting screen-on time to as short as is reasonable; 1 minute is fairly common though most devices will go down to 30 seconds also. When the screen does automatically turn off, ensure it locks immediately so as not to allow an opportunist the ability to access a device momentarily left on a table.

**Minimum OS version -**There’s little denying older devices running an outdated OS version will be susceptible to any number of vulnerabilities both known and unknown which could put corporate data at risk.

For this reason, recommended best practice would generally an OS version no earlier than _n-2._For Android, that would be 6.0.1 Marshmallow.

There are exceptions, though. Android benefits from a well-established security patch program keeping devices as far back as Lollipop secured against known threats, and more recently the Android Enterprise Recommended program ensures all validated devices will be patched for 3 years from release.

What security updates don’t do, however, is incorporate the latest innovations and features that come with letter upgrades. Things like QR code provisioning in Android 7.0, or zero-touch enrolment in Android 8.0 won’t be available in earlier Android releases and may prove troublesome to an otherwise.

Be it for security or usability, implementing a minimum version for corporate support is a good idea, and EMM platforms will allow the simple enforcement of this either via compliance policies or simply blocking enrolment.

**Data isolation -**There are generally no circumstances where the mixing of corporate and personal data should be desired or considered reasonable. The moment data sources mix, the ability to control where corporate data winds up, or where potentially harmful files or apps appear on the corporate network, are beyond the control of the organisation.

For many years data isolation has existed in the form of containerisation. With Android, the underlying user profile system has been leveraged to provide a native, separately encrypted and entirely isolated work profile for corporate data to reside, whilst providing seamless integration with the personal (parent) profile for ease of access and app switching. Android P also introduces seamless in-app profile switching to make it even easier for end-users to switch between profiles with little effort whilst maintaining security and privacy.

The Android work profile can be used in two scenarios, first as a BYOD deployment where the organisation only manages the corporate profile and has no management scope outside of this on the wider device. Second as a COPE deployment, where the organisation permits personal usage on a managed device whilst ensuring corporate data remains isolated and secure.

**Data Loss Prevention (DLP) -**Data loss prevention consists of a number of controls to assist in the prevention of corporate data leakage. Most heavily used in work profile or other container-based deployments, DLP controls ensure it isn’t possible to copy corporate data to an unmanaged location, grab screenshots of sensitive information within corporate apps or share confidential information with private contacts.

DLP controls aren’t limited to dual-profile scenarios though, and may be enforced device-wide to ensure corporate data can’t be shared over bluetooth or NFC for example.

A strong focus should be put on DLP controls within your EMM.

**Encryption -**Since Android 6.0 Marshmallow encryption has been enabled by default for Android devices, though where older versions are still in circulation or an OEM doesn’t enable encryption out of the box, ensuring it’s enforced via security controls offers additional protection for corporate data.

Devices enrolled with Android enterprise will be forced to encrypt as part of the process and in Android 8.0 the personal and work profiles use different encryption keys to further protect corporate data should the parent profile be compromised. In Android P, file-based encryption is enforced.

For organisations working in a legacy or hybrid management environment, ensuring encryption is enforced is highly recommended.

**Compliance -**Compliance policies set within the EMM solution offer a simple, autonomous method of monitoring device posture and enforcing actions should a device fall out of compliance. Some policies include:

* Compromised - Rooted or Jailbreak detection
* Last seen - How long since the device last checked in
* Data protection - If a passcode is not set, or encryption is disabled
* Disallowed applications - based on defined lists of whitelist, blacklist or mandatory applications installed on devices

Should a device fall out of compliance, actions range from a simple notification over email, SMS or push, to blocking access to corporate resources or even enterprise wiping devices.

Compliance policies should be leveraged to reduce the amount of time spent manually reporting on device posture.

**Controls and restrictions -**Organisational control over a device is arguably one of the primary reasons for business to invest in an EMM and for good reason.

A device may be lightly controlled, opting for DLP controls or the prevention of installation from unknown sources, through to disabling access to device radios, core functionality such app installation or blocking access to device settings, right down to full COSU with a kiosk permitting only the most basic of actions available on a device.

Whatever the purpose of the device(s), restrictions should be implemented only to the degree deemed necessary for the device use-case. Too far and end-users won’t want to use the device, not enough and end-users may use the device for more than intended, which could lead to data costs, the potential for PHAs and more.

As with most implementations, availability for user feedback and support should be provided to help best understand how devices are utilised and to therefore strike the correct balance.

<div class="callout">

The Android value-add

Android is the most flexible operating system on the market for EMM controls, offering a plethora of configuration options to suit needs of the business, as independently assessed by Gartner in 2016, 2017 and 2018. 

From 8.0 Oreo this also extends to kernel security and data isolation, also. Android security is therefore on par with its flexibility and a trustworthy solution for enterprise deployments.

</div>

### Deployment

As part of your strategy, you may have formed an opinion on how you wish to manage devices. be that embracing BYOD, allowing some personal use on a corporate device with COPE or fully locking the device down to a kiosk or otherwise. With this decided, consider how the devices will be deployed:

**SSO Integration -**It falls in line with best practice to integrate the EMM with on-prem (or cloud) resources managed by the organisation. At a basic level this could simply be Active Directory for user management which is highly recommended over manual account management directly on the EMM console. If AD isn’t used, EMM solutions may also support other IDPs (Identity Service Providers) and will have documentation covering how this is set up.

Irrespective of the method, it’s also good practice to limit the number of external groups being synced to the EMM for management, and most commonly the creation of two core groups will be enough to get started:

* EMM administrators
* EMM users

Naturally, more groups for business units may be created and synced to the console, and each group imported may then be used for configuration, profiles, application or policy assignment, all dynamically and ultimately managed from the backend service.

**Resource integration -** Common resources include email, for which some EMMs offer on-premise solutions or appliances for managed access to exchange. These may also be used to proxy Office365 or other cloud mail solutions, but at that point you’d be tunnelling a globally available service through a single point of failure, which may not make sense.

Also consider the access requirement for on-premise (or cloud) private repositories or intranets. Once again local appliances may be deployed to manage access to these resources without needing to open them up to the wider internet, whilst ensuring only managed devices can access them.

Knowing what is required to be implemented will have been useful during the planning stage, as well as the EMM selection stage for selecting the right platform to suit your needs, however as it’s a common requirement most EMMs will support all of the above and more.

**Device provisioning -**Depending on the chosen deployment methods, be that BYOD, COBO, COSU or COPE, deciding how devices will be provisioned ahead of time will save a lot of effort and confusion when undertaking the task.

No matter how devices are provisioned, be that QR code, zero-touch, Knox Mobile Enrolment (KME) or otherwise, the most important goal is to remain consistent; from this, you can create enrolment guides, have a support team that understands what they/end-users are doing and can easily troubleshoot.

In some cases multiple provisioning methods may be used, particularly in a fleet of devices that may be a mix of OS versions; those on 8.0 or above supporting Android zero-touch enrolment and purchased recently from a zero-touch reseller should leverage this, it’ll save everyone time. Older devices will benefit from settling on one method that works for all, like EMM token for Android 6.0+, or QR for Android 7.0+.

**Android enterprise accounts -**It is strongly advised to utilise Android enterprise for managing Android endpoints in the organisation due to legacy device administrator APIs being deprecated in Android Q, and part of the process for setting this up is to choose the type of connection to use.

If your organisation relies on G Suite internally, it would make sense to leverage G Suite for Android enterprise; the setup process for connecting Android enterprise to the EMM via G Suite is somewhat more involved than managed Google Play accounts, however it only needs to be setup once.

For any other situation, the organisation should utilise managed Google Play accounts. Most EMMs will support this method today and it requires only a few minutes with a generic, non-personal Google account, in other words [ae.businessname@gmail.com](mailto:ae.businessname@gmail.com) rather than [first.last@gmail.com](mailto:first.last@gmail.com). Once the connection is made it does not need to be renewed.

**App management -**As well as mail, profiles, configurations and policies, applications management is a cornerstone of device management.

How app management is handled with Android today can vary depending on how devices are deployed

* Legacy device admin enrolment will require a Google account and access to the public Google Play Store for public applications. When applications are pushed from the EMM platform, the end-user will be prompted to install the app, before configuring it for use.
* Legacy device admin enrolment utilising in-house applications can in some cases have applications installed silently via the EMM, however the end-user will need to have enabled unknown sources in settings, a potential security risk.
* Android enterprise enrolment supports both silent and on-demand app installation without a Google account _and_ can support pre-configuration of the apps during installation if configured on the EMM. Both public, in-house and privately-hosted applications are fully supported.

Android enterprise clearly outshines legacy enrolment for application management, even if only for the fact personal or corporate Google accounts are no longer going to cause a headache for all involved; without a Google account the fear of a Factory Reset Protection (FRP) device returning to base is almost non-existent.

**Grouping & organisation -**Tying into the earlier integration of IDP for SSO, one further key to a successful deployment is ensuring end-users are efficiently grouped within the EMM in order to get the relevant applications, policies, profiles and configurations. Some EMMs utilise groups in various implementations, whilst others utilise more of a tenant-subtenant approach to grouping devices. How devices are ultimately grouped is for the organisation to decide, however once complete, a recommended approach to deployment of policies and profiles is in a hierarchy where key configurations are created only once, whilst more flexible profiles are deployed further down the hierarchy:

* Global: Passcode Policy
* Global: Restrictions
  * Group specific: restrictions
    * Sub-group specific: VPN profile
    * Sub-group specific: location-specific WiFi configuration
    * …
  * ...
* ...

If the EMM supports it, utilising email domain recognition will help users to more easily enrol by simply inputting their email address rather than a long, complex server name and/or group ID.

Once enrolled, the end-user may be also be automatically pushed to the right group based on AD group membership, email domain, device type or more. The organisation of the platform, once set up, can be entirely autonomous.

### Privacy

Privacy is a talking point for organisations all over the world today, and for very good reason; protecting the privacy of end-users is not only the right thing to do, it’s being written into law across the world.

Historically EMM platforms, asset management tools and other tools such as Telecoms Expense Management (TEM) and Mobile Threat Defence (MTD) have collected data about the devices deployed indiscriminately and in-depth, administrators may collect application data, phone numbers, IMEI numbers and other device information all classified today as personal information.

While this is _more_acceptable where a device is company owned and controlled, for many years the very same collection has been prevalent for BYOD end-users also.

Thankfully today platforms offer tools to anonymise this data or not collect it at all, even for corporately owned devices, administrator roles can ensure only those with the relevant roles or permissions may see collected information, whilst functions such as the support desk would not.

Consider some of the following when thinking about end-user privacy:

**Application inventory & usage**- Normally enabled by default, application inventory, especially for BYO devices, should be disabled or at least anonymised where the inventory is being utilised by linked solution (such as MTD). Many platforms today support anonymising application inventory to ensure the privacy of the end user is respected; it benefits no one to see what sort of dating, health or lifestyle applications are being used, but can feel deeply invasive to know a whole support team may be freely able to see this data. Though Android strongly promotes user privacy in a BYOD environment out of the box with work profile support, preventing such issues as full app inventory ensures this is enforced across other means of enrolment and operating systems that do not promote privacy as strongly.

**Location**- There are few instances where the collection of data is justified, and can lead to the inadvertent tracking of end-user movements both in and out of work. If location reporting is enabled, so too should there be signed consent from the user depicting when and how this data is used.

**Telecom status**- Platforms can report data used on a per-app basis, log SMS messages and calls, collect roaming information as well as carrier information on a device. With a corporately owned device some of this may be acceptable, however for the most part again this can be construed as an invasion of privacy and a lot of collected personal data.

**User information**- By anonymising or hiding user information (usernames, email addresses, etc.), users aren’t associated with managed devices and as such cannot be linked to device usage trivially.

<div class="callout">

The Android value-add

Android enterprise supports work profile, a separate, isolated and uniquely encrypted device profile for a BYOD fleet which integrates with the parent profile to provide a controlled corporate environment on an otherwise user-owned device. 

With a work profile, the organisation sees and controls only the data within the dedicated work area, therefore maintaining user privacy by default, even if privacy is not enforced on the EMM platform.

</div>

All of this goes hand-in-hand with corporate HR policies outlining what users may or may not do with their devices and how the information collected will be used and processed. Adding a mobile device policy to the corporate welcome pack for new employees, and (bi-)annual revisions thereafter will ensure transparency and understanding is promoted.

## BAU/Management/In-life

Once a solution is implemented, devices are rolled out, the next area of focus is in-life management of the solution, the devices and the end-users registered on the platform.

### Roles & permissions 

Out of the box EMMs come with a number of predefined roles with various capabilities for administrators assigned to them. However the organisation is tiered, it’s a good idea to structure EMM admin roles in the same way, such as restricting device wipes to a Tier 2, or the creation of profiles & configurations to a Tier 3. Judge this based on the perceived impact of an action, intentional or otherwise, to the device estate. One wrong click could see a number of devices removed from management.

Furthermore, roles also provide the visibility of various components of the EMM, both system and back-end configuration areas, but equally things like app inventory, device details and more covered in [privacy](#privacy); if location data is collected, perhaps only super-admins should be able to see this in line with company policies.

### Reporting

With devices under management and the vast amount of information that can be collected about users, devices, device usage and more, that makes an EMM platform a treasure-trove of valuable information.

Automated reports can collect telecoms usage, app information, device details, compliance information and much, much more. The organisation can use this information to make informed decisions about employees and the device estate to continuously improve the mobility strategy whilst identifying common issues and working to rectify them proactively.

Most platforms will equally support SIEM (security information and event management) solutions for monitoring and reporting with reporting solutions already in place, as well as APIs for collecting information live, and in turn performing actions with it.

### System maintenance

Like any other corporate solution, if the EMM server or EMM components reside on the corporate network, they will likely need to be backed up. The specifics of how this is undertaken will be documented for each EMM, however from a policy perspective, the EMM service as a whole should be considered a critical/high risk component and treated as such, including adding it to annual disaster recovery tests and so on.

Furthermore, updates are made available on a reasonably regular basis for the EMM and its components which reflects the speed at which the mobility industry moves. Keeping the solution up to date offers the obvious benefits of leveraging new functionality often.

### License management

Throughout the life of the EMM solution devices will enrol, unenrol, get lost or stolen and more. Unless maintained, it’s easy to find yourself in a position where licenses are being paid for, but not used as they’re applied to devices no longer under management.

Run regular audits to ensure this isn’t the case, and use this as an opportunity generally to keep tabs on devices in the wild, high breakage rates can be identified and resolved if monitored.

Furthermore, when devices are removed from management and the license revoked, a record may live on in the EMM console for auditing purposes. After many years the number of old records may start to impact database performance. Automated maintenance of device records can be scheduled for once retention policies have been satisfied, ensuring records stay at a reasonable number.

### * Troubleshooting & training

There will come a time when things don’t go quite right. Having a team of support professionals trained in Android, or Android enterprise troubleshooting will go a long way towards a quick resolution.

As part of

## Conclusion

Building a mobility strategy is no straightforward task, nor is it finite; as the needs of the business change and the industry moves forward, adjusting the strategy as and when necessary, and reviewing it frequently in between, will guarantee a well-rounded and successful approach to enterprise mobility.

With a strategy in place, employees across the organisation can benefit from more security, flexibility and autonomy when undertaking their responsibilities, leading to a more productive workforce that can work from anywhere and at any time.

With Android offering market-leading solutions that empower end-users to do their best work while prioritising a healthy work-life balance with the ability to turn work _off_ at the swipe of a toggle, everyone benefits.

For organisations, finding the right device in the right form factor at the right price is a key benefit of investing in the Android ecosystem, and recognised for providing the highest number of security controls with the most robust isolation and kernel security on the market, Android is a dependable and viable solution for enterprise use.

**END ⬤**
