---
title: 'What is MDM (Mobile Device Management)?'
date: '2017-04-09T09:44:47+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 4112
doccats:
    - General
Version:
    - '1.4'
publish_post_category:
    - '13'
discourse_permalink:
    - 'https://discuss.bayton.org/t/what-is-mdm-mobile-device-management/41'
---
What is it?
-----------

MDM stands for Mobile Device Management and is one of the cornerstones of the Enterprise Mobility Management industry, providing remote, over the air management of mobile devices.

MDM enables:

- Setup and configuration of devices
- Enforced security to fall inline with company policy
- Simple access to corporate resources (such as email)
- Removal/limitation of features
- The ability to find lost or stolen devices at a moment’s notice
- ..and much more

More than this, it helps the organisation to help the end user; tasks such as resetting the **PIN** or **password**, blocking the use of **dangerous applications** and **remotely wiping** a device (should it be necessary) are available at the push of a button; not only for MDM administrators, but via user portals users are able to do some of these functions themselves, meaning resolutions to issues historically complex and time-consuming can be almost immediate and with or without the involvement of IT.

Some configurations available to devices (where the OS supports them) include:

- Network configurations
- Managed configurations
- Restrictions (the disabling of the Camera, iTunes, NFC, USB, YouTube, Roaming, etc)
- Email (including POP, IMAP and Exchange)
- VPN
- Certificates
- Security (PIN/Passcode management, etc)
- ..and more

If MDM isn’t enough alone, organisations can additionally take advantage of the ability to manage content, applications and monitor data usage using Mobile Application Management (MAM), Mobile Content Management (MCM) and Telecoms Expense Management (TEM) services respectively in the broader EMM scope. Not all platforms support all features, so due diligence is required when looking for a suitable platform to implement.

Having the ability to roll out an application to a vast number of devices simultaneously has huge benefits, not least in the time it saves having end-users locate and install applications themselves. Despite it having its own acronym – MAM – this is available almost as standard across MDM platforms and provides a secure location for both public and in-house applications, meaning access can be granted and removed from confidential information quickly and efficiently, leaving little doubt of confidential data being stored on device storage. In combination with MDM, applications can be pushed out as part of the enrolment process, vastly improving deployment time for new devices and greatly improving the time it takes to reconfigure devices already in the wild.

Robust reporting modules built into today’s MDM platforms mean organisations can generate various ad-hoc reports for installed software, storage usage, hardware, operating system information and more, with the ability to export these metrics or forward them on to industry-leading reporting solutions. This means organisations know exactly how a device is being used when issues arise and can use this information when working towards a resolution.

What problems does it solve?
----------------------------

Before investing in an MDM platform, an organisation will naturally need to understand the problems it solves and benefits it introduces. MDM can and does solve very real problems on a daily basis:

**Apple Activation lock (find my iPhone):** When a phone is handed to an employee without management and that employee leaves without fully signing out of the device, the device is entirely inaccessible after a factory reset without the original employee Apple ID password. Organisations globally spend hundreds, potentially thousands of hours a year working with Apple to prove they own the devices in question in order to gain an Activation Lock bypass code. With MDM and Supervision, activation lock can be disabled, completely rendering this issue entirely moot.

**Lost and stolen:** When an unmanaged device goes missing, Organisations don’t know where it is, whether it’s suitably protected against unauthorised access and cannot remotely wipe potentially sensitive information from device storage. Depending on the access granted to the employee or their status within the company (think CEO) a device may well hold critically sensitive data. With MDM, not only can the corporate data be secure on the device, it can be completely removed or the device fully wiped as soon as it comes back online. In best-case scenarios, the device can be located and collected if location reporting is enabled.

**Data protection:** When an unmanaged device is used for business purposes, the employee may collect gigabytes of corporate data stored openly on the device. The device may not be encrypted, may run compromised applications or be vulnerable to any number of known vulnerabilities. This data can be emails, downloads, data copies via USB from corporate machines or more. When that employee leaves, and organisation can prevent further access to corporate resources, but cannot remove the data already on the device. With MDM, managed email, content management and secure device profile or device-wide encryption can not only ensure data on a device is encrypted and optionally containerised, but remove that data on device unenrolment.

There are many other scenarios MDM can help. Take a moment to consider them.

What can it do?
---------------

The MDM solution is a platform used to provide support to mobile devices anywhere in the world with an internet connection and offers the following benefits:

### Remote Management

As soon as a device is enrolled it becomes a managed endpoint and policies/configurations will be automatically pushed down. The single first indication of device management will normally be prompting the user to set up a PIN or password depending on the policy applied to their device. Devices do not have to be returned to base for new applications or settings to be applied and similarly, if an end user does not for any reason comply with the changes pushed out or the device is lost/stolen, there are a number of ways to utilise the inbuilt security features of an MDM solution to rectify the situation. Here are some examples of the tools MDM administrators have at their disposal:

**PIN reset:** Occasionally a user may forget their PIN or password. Through MDM, it is very easy to reset the PIN and have the user back up and running on their device in a fraction of the time of alternative methods. In a lot of situations, a user might end up completely resetting their device to factory settings either through too many wrong PIN combinations or intentionally to regain access to the device, causing significant impact on daily responsibilities whilst the device is set back up. With MDM, this is no longer a worry.

**Alerts:** If an end user becomes non-compliant with policies and compliance rules in place, alerts can be triggered to inform those requested of the action that triggered the non-compliant state.

**Enterprise wipe:** A partial wipe consists of removing all corporate data on a device put there by the MDM solution. This will include documents and applications accessed through the native mobile MDM application as well as corporate email. This will not wipe internal storage or external SD cards, nor will it remove personal information such as Google accounts or installed applications. The device will become unmanaged following an Enterprise wipe and will need to be re-enrolled in order to once again access corporate resources.

**Full wipe:** A full wipe will return a device to factory settings. All information will be removed. This includes MDM control, leaving the device completely unmanaged.

**Device block:** Partially or fully wiping a device is inefficient. It requires re-provisioning a device resulting in wasted time. Ideally it should be a last resort. For devices that need to be locked down for any reason, an alternative is to block the device. This prevents access to corporate resources (email, documents and applications) requiring a call to have it unblocked. At this point, the non-compliance issue can be discussed and potentially resolved over the telephone.

**Device lock:** Prevent access to a device by resetting the PIN/password to something only known by MDM administrators.

**Compliance:** In addition to setting rules on applications permitted, type of password in use, etc, it is possible to monitor the devices to ascertain whether or not end users are adhering to the rules in place. If for whatever reason they are not, it is possible to set a timer on their non-compliant state which can trigger any of the above actions after as little as 60 seconds or as long as several days. The end user will be fully aware they are non-compliant from the moment the native MDM application alerts them and will be told how long they have to rectify the situation. It is then in their best interest to become compliant in order to prevent the actions above taking place.

**Location information:** If a device is lost or stolen, MDM can assist in retrieving location information for the device providing it is switched on and connected to the internet.

### Configuration deployment

As noted at the beginning of this topic, the range of configurations or policies which can be pushed to devices is broad and granular. Some devices may have GPS enforced for location data requirements, others may have all external radios bar Wi-Fi disabled when used as a display device in a store or tethered to an office location. Email configurations, VPN, managed app configs, passcode requirements (including how long before a device sleeps, how many failed attempts before a wipe, etc) can all be pushed remotely and with relative ease.

Combined with geofencing, time-scheduling and more, a device can be completely locked down during the day, and opened up completely in the evening should an employee be located in a secure facility, for example. For those in less demanding environments, the MDM admin may just opt to block YouTube during work hours.

Both Apple and Google offer ways of further locking down corporate devices; [Apple’s Supervision](/docs/enterprise-mobility/ios/what-is-ios-supervision-and-why-is-it-used/) can be enabled via IT or by enrolling in the Device Enrolment Program (DEP) and allows organisations to disable such things as Activation lock, Facetime/iMessage, the ability to factory reset and more. While Google has introduced [Android Enterprise](/docs/enterprise-mobility/android/what-is-android-enterprise-and-why-is-it-used/) to allow organisations to manage many different Android OEMs consistently, something that has oft been a pain point for organisations. More information about these management options can be found in the links in this paragraph.

### Application management

Application management allows for the distribution of applications to as little as one and as many as all devices within a group quickly and easily. All applications are deployed and managed securely and are easily accessible from within the native MDM application(s) or the Home Screen/App Drawer of the device.

Most MDM solutions support the distribution of both Play Store/App Store/Microsoft Store apps and Enterprise apps not located within the Play Store/App Store catalogues natively. More recently, the introduction of Apple’s Volume Purchase Program (VPP) and Android Enterprise support means applications can be distributed to devices without private App Store accounts to further reduce the support burden associated with managing iTunes and Google accounts.

There are typically a number of applications that should not be used in the workplace. Using application blacklists it is possible to block the use of applications with minimal effort.

This has two benefits:

- Blocking applications that are not permitted means focus fully remains on the permitted applications and tasks at hand.
- Application installation does not have to be prevented, allowing the installation of applications which are not blocked freely and in turn preventing wasted time logging requests for applications to be pushed out to a device.

On the other hand, using application whitelists take the polar opposite approach. Only applications permitted by management are permitted to be installed on a device. No other applications can be used unless they are first whitelisted. This allows a device to be used only for purpose with no wiggle room.

### End user portal

The end user portal allows users quick and simple access to view the devices they have enrolled onto the MDM solution and perform basic tasks as follows;

- Lock device
- Reset PIN
- Wipe device
- Locate device

The availability of these options to all end users can help reduce requests for assistance that may arise from forgotten PINs or lost devices, however it is very much in the control of the organisation what users can and cannot do without MDM administrator intervention. Users may also optionally self-enrol onto the corporate MDM platform to gain access to email and other corporate resources if permitted. In many organisations the MDM administrator never needs to enrol a device for a user, reducing overhead there to almost zero.

Additional EMM components
-------------------------

When MDM and its security-first featureset is not quite enough, consider a broader EMM suite to take advantage of some or all of the following:

### Expense management

Expense management allows for the monitoring of data usage for devices enrolled onto the MDM solution. Using a pre-configured data cap for a device, it is possible to monitor data usage against the limit and receive notifications when data usage surpasses set limits.

For example: If members of a team have a set limit of 1GB of data per month, it will be possible to monitor the data usage on a daily basis and when reaching set limits such as 50%, 75% and/or 90%, an email can be scheduled to warn relevant people of the impending data limit in order to either prepare for or avoid costly over-usage.

With this data organisations gain far more transparency over data usage within their teams that can help to avoid surprise bills.

Taking this a step further, 3rd party TEM solutions are available which integrate directly into the EMM platform and are able to report incredible amounts of data on telecoms usage, such as per-app, time of day, sites visited and more. One of these solutions has been reviewed, [click here](/2016/12/wandera-review-2016-2-years-on/) for more information.

### Content management

Often email alone is not enough; when organisations have large data repositories internally they may wish for enrolled devices to gain secure access to them through the EMM platform. These repositories may be file shares, Sharepoint sites, any combination of common file sharing protocols such as SMB/CIFs, NFS, (s)FTP and more. Once setup and configured, EMM-managed devices can gain secure access to these resources while not being able to copy or share sensitive data outside the secure EMM area of their devices.

Naturally for smaller environments, documents can be uploaded to the EMM platform, optionally password protected and distributed or removed on request. No backend infrastructure required.

Conclusion
----------

MDM is quickly becoming vital for the enterprise and paramount for adequate device management. Utilising all of the services and features outlined above, our ability, as an industry, to manage devices both locally and across the world is made significantly easier. With EMM organisations can extend management to applications, content and telecoms management with very little effort.

It is most certainly a must for any organisation making use of mobile devices today.