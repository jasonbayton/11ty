---
 title: "Samsung announces Knox SDK restrictions for Android 15"
 date: '2024-06-15'
 status: publish
 author: 'Jason Bayton'
 excerpt: "The change poses a significant departure, and threatens many apps on the market making use of the affected APIs today."
 type: post
 tags:
     - Enterprise
---
Android's Device Administrator (DA) APIs were a cornerstone of device management since their inception way back in Android 2.2. However, with their deprecation in 2017 with Android 9.0 (and obviously prior given AE was introduced in 5.0), Google and the wider ecosystem (👋) has encouraged a shift to the more robust and secure Android Enterprise as DA APIs have slowly faded away. Embracing Android Enterprise provides organisations with better security, enhanced functionality, and clearer data separation. For an in-depth read, see:

- [Google is deprecating device admin in favour of Android Enterprise](/blog/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/).
- [What’s the difference between Device Admin and Android Enterprise?](/android/android-enterprise-faq/da-vs-ae-differences/)
- [Android Enterprise vs Device Admin: Why DA is no longer suitable](/android/android-enterprise-vs-device-administrator-legacy-enrolment/)

In contrast, Samsung’s Knox APIs have maintained capabilities for applications outside of Android Enterprise for several years since DA’s deprecation, even while Google has slowly removed said APIs from circulation with newer Android releases. There have been use cases for this, especially around value-add solutions leaning on Knox APIs while devices are managed with other EMM platforms, but With Android 15, this is about to change.

In spite of how it looks, it may not be a sudden change of heart from Samsung, as the timing of this aligns closely with upcoming restrictions in Android 15 that appear to make this basically necessary.

## Samsung's Knox SDK Update

Samsung is restricting access to several of its Knox SDK APIs for use only within the Android Enterprise management framework, gradually phasing out access for non-enterprise apps (or, at least, those enterprise apps not used within scope of Android Enterprise). Starting with Android 15 (Knox 3.11) later in 2024, only apps running as Device or Profile Owners will have access to the relevant Knox SDK features. By late 2025, with Android 16, all Knox SDK APIs will be restricted in the same way. 

Samsung says this move aims to enhance device security and ensure that advanced features, like remote control capabilities, are only utilised within managed environments. For further details, check [Samsung's announcement](https://app.smartbusiness.samsung.com/e/er?s=756917348&lid=12793&elqTrackId=70653d99277343e2b229fbc841f59798&elq=7e6cc3e158084de9ad19d147a7b3a520&elqaid=3289&elqat=1).

The affected APIs for 15 are: 

<div class="responsive-table-wrapper">

| SDK Class               | SDK Method(s)                        |
|-------------------------|--------------------------------------|
| EnterpriseDeviceManager | setAdminRemovable                    |
| ApplicationPolicy       | installApplication                   |
|                         | uninstallApplication                 |
|                         | uninstallApplications                |
|                         | updateApplication                    |
|                         | setApplicationStateList              |
|                         | setApplicationComponentState         |
|                         | setApplicationInstallationDisabled   |
|                         | setApplicationUninstallationDisabled |
|                         | stopApp                              |
|                         | startApp                             |
|                         | addPackagesToPreventStartBlackList   |
|                         | addPackagesToDisableUpdateWhiteList  |
|                         | addPackagesToDisableUpdateBlackList  |
|                         | preventNewAdminInstallation          |
|                         | preventNewAdminActivation            |
|                         | addNewAdminActivationAppWhiteList    |
|                         | addAppPackageNameToBlackList         |
|                         | addPackageToWhiteList                |
| CertificateProvisioning | deleteCertificateFromKeystore        |
|                         | resetCredentialStorage               |
|                         | addPackagesToCertificateWhiteList    |
| SystemManager           | setHardKeyIntentBroadcast            |

</div>
<div class="responsive-table-wrapper">

| SDK Class       | SDK method(s) |
|-----------------|---------------|
| RemoteDesktop   | All methods   |
| RemoteInjection | All methods   |

</div>

And their accessibility: 

<div class="responsive-table-wrapper">

| Knox SDK methods       | AE (DO/PO) apps | DA mode apps   | Other apps     |
|------------------------|-----------------|----------------|----------------|
| DA restricted methods  | Accessible      | Not accessible | Not accessible |
| Remote control methods | Accessible      | Accessible*    | Accessible*    |
| Other methods          | Accessible      | Accessible     | Not accessible |

</div>

*Accessible in DO/PO

## Google's Policies for 15

Google is expected to introduce new, sweeping mandates around custom API development and data access/management for devices launching with or upgrading to Android 15. They define where APIs can target (based on management mode), what they can do (such as special permissions management), and the visibility they provide organisation admins that don't align with that already in AOSP. It feels like the final nail in the coffin of DA and DA functionality outside of Android Enterprise management, and obviously impacts all OEMs (except those building for dedicated use cases alone, [it appears](/blog/2024/04/new-for-enterprise-android-15/#deeper-dedicated-device-experience-management) so the likes of Zebra, Honeywell, Panasonic, and more may be exempt).

## Potential impact

For enterprises, this shift presents both challenges and opportunities; the latter in hopefully being a final shove into migrating legacy deployments into Android Enterprise management and off of DA, though for the vendors reliant on these SDKs today for non-AE deployments, it poses a significant and quickly-approaching deadline to work with organisations in allowing functionality to be restored.. of course in some instances this won't be feasible for the use case of the app in question, or the ability for organisations to adapt. It'll be interesting to see what comes of this as 15 rolls out, and I'm sure we'll see plenty of conversations about it over on the [Customer Community](https://androidenterprise.community).