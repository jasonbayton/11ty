---
title: 'Planning & preparation'
date: '2023-09-21'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
tags: 
    - Guide
layout: base.njk
---

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