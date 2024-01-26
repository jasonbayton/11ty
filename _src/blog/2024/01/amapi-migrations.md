---
 title: "AMAPI publicly adds support for DPC migration"
 date: '2024-01-25'
 status: publish 
 author: 'Jason Bayton' 
 excerpt: "The PlayEMM API, on which custom DPC-based EMM solutions are built, has had a looming deprecation over it for some time. This is the first such public example of both the intention to migrate devices into AMAPI, and the DPC migration solution debuted back in 2019." 
 type: post 
 tags: 
     - Enterprise 
---
In the last few days a new suite of APIs have appeared on Google's [AMAPI developer docs](https://developers.google.com/android/management/reference/rest/v1/enterprises.policies) page covering _DPC Migration_ 🎉

I've written about DPC migration sporadically since 2018 when Google brought it up at [their partner summit](/blog/2018/05/android-enterprise-summit-2018-highlights/#dpc-migration) however the ambitious and frankly substantially overdue functionality has rarely been seen referenced since.

How this newly publicly documented capability is ultimately intended to be used from Google's point of view is up for debate, as it has not - publicly or otherwise - been covered in any opinionated articles that I've found. 

My view, however, is this is intended primarily for the looming turndown of the Play EMM API, the suite of APIs supporting custom DPCs (those vendor branded agents, like WS1 [Intelligent Hub](https://play.google.com/store/apps/details?id=com.airwatch.androidagent), [SOTI MobiControl Agent](https://play.google.com/store/apps/details?id=net.soti.mobicontrol.androidwork), and the many, many others) that facilitate granular device control before AMAPI stepped in. 

The timing makes sense, as more vendors publicly adopt AMAPI ([1](https://www.soti.net/mc/help/v15.5/en/console/devices/managing/adding/amapi_enrollment.html), [2](https://blogs.vmware.com/euc/2023/10/vmware-workspace-one-unveils-next-evolution-of-android-device-management-with-amapi-beta.html), [3](https://docs.samsungknox.com/admin/knox-manage/quickstart-guides/android-management-api-device-enrollment-quickstart/), [4](https://www.isec7.com/2023/10/31/blackberry-uem-version-12-19-everything-you-need-to-know/), [5](https://help.ivanti.com/mi/help/en_us/cld/admin/ivanti/91/all/en-us/Android_Management_API.htm)...) a means of migrating existing customer install bases to the AMAPI backend is increasingly more important to reduce overhead of managing two backend platforms within a single product. 

Could this be used to migrate customDPC-enabled customers from one platform to another? 

Technically? Though like the DPC migration capability in existence since 2018 it looks like it will need some bilateral support from existing vendors, and to placate them is likely not pitched as a supported mechanism. 

This is further suggested by [the docs](https://developers.google.com/android/management/reference/amapi/kotlin/com/google/android/managementapi/dpcmigration/DpcMigrationClient) that state:

```
This method can be called only by a Device Owner or Profile Owner. On Android 10 and below, this must not be called on a device with both a Device Owner and a Profile Owner.
```

<div class="side-note">

Sidenote: _Work profiles on fully managed devices_, the older COPE, isn't supported for migration!? That'll rule out migrating your Android 10 and below COPE deployments to AMAPI.

</div>

At the very least it looks like pulling a cross-vendor migration off would be difficult, as:

- The calling application must be an existing Device or Profile owner, in other words the existing EMM vendor managing the device.
- Customers would have to pull `userID` and `deviceID` (amongst others) into the per-device token they generate in AMAPI, unless the outgoing vendor incorporates a migration function into their platform to talk to an external AMAPI enterprise which is.. _unlikely_. 
- And without the benefit of both Play EMM API and AMAPI access, nor direct integration with the agent app that'll be authorised to use the extensibility SDK (maybe?) the vendor themselves would have, undertaking this effort manually will be a pain.

There's also several metadata items that are validated, meaning spoofing the migration would be difficult: 

```
DpcMigrationDeviceIdMismatchException	
The management token is meant for a different device.

DpcMigrationDpcPackageNameMismatchException	
The package name of the DPC does not match the records in Play.

DpcMigrationDpcPackageSignatureMismatchException	
The DPC package signature does not match the records in Play.

DpcMigrationManagementModeMismatchException	
The management mode of the device does not match what is specified in the migration token.
```

The DPC migration function is split between [server](https://developers.google.com/android/management/reference/rest/v1/enterprises.migrationTokens), where tokens are created and managed, and the [Extensibility SDK](https://developers.google.com/android/management/reference/amapi/com/google/android/managementapi/dpcmigration/model/package-summary). 

Google had been promising more functionality from the extensibility SDK allowing partners to fill the gap left by the lack of AMAPI feature parity with customDPC capabilities, it's interesting to see after almost a year of waiting for something to land there, it's this.

Anyway, in lieu of any further public information, this is what we have at the moment. It'll be interesting to see where this leads.