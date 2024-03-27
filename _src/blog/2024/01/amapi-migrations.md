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

Google's DPC migration solution was intended originally to address the biggest, most burdensome problem organisations have today when moving between EMM platforms.

The wipe.

Whether that's the device wipe of a fully managed device, or the deletion of apps and data from a work profile, moving Android devices from one EMM to another took a substantially unfriendly turn with the introduction of Android Enterprise. It _used_ to be simple to migrate between Device Admin providers, but of course with the bolstering of security came the introduction of Device Owner in place of Device Admin, with that rather large, frustrating, limitation only appreciated by the EMM vendors who know organisations won't easily leave them once they're enrolled due to the substantial cost to productivity.

Unfortunately at this point in time it seems like the resurfaced DPC Migration functionality has been quite rather watered down on what it was originally purported to be.

How this newly publicly documented capability is ultimately intended to be used from Google's point of view is up for debate, as it has not - publicly or otherwise - been covered in any opinionated articles that I've found.

My view, however, is this is intended primarily for the looming turndown of the Play EMM API, the suite of APIs supporting custom DPCs (those vendor branded agents, like WS1 [Intelligent Hub](https://play.google.com/store/apps/details?id=com.airwatch.androidagent), [SOTI MobiControl Agent](https://play.google.com/store/apps/details?id=net.soti.mobicontrol.androidwork), and the many, many others) that facilitate granular device control before AMAPI stepped in.

The timing makes sense, as more vendors publicly adopt AMAPI ([1](https://www.soti.net/mc/help/v15.5/en/console/devices/managing/adding/amapi_enrollment.html), [2](https://blogs.vmware.com/euc/2023/10/vmware-workspace-one-unveils-next-evolution-of-android-device-management-with-amapi-beta.html), [3](https://docs.samsungknox.com/admin/knox-manage/quickstart-guides/android-management-api-device-enrollment-quickstart/), [4](https://www.isec7.com/2023/10/31/blackberry-uem-version-12-19-everything-you-need-to-know/), [5](https://help.ivanti.com/mi/help/en_us/cld/admin/ivanti/91/all/en-us/Android_Management_API.htm), ...) a means of migrating existing customer install bases to the AMAPI backend is increasingly more important to reduce overhead of managing two management platforms for one OS within a single product.

So DPC migration in this case can be leveraged to migrate all existing Android devices within a single EMM vendor from the Play EMM API-based custom DPC they have today, over to Android Device Policy and AMAPI, while maintaining management of the device within the solution.

I do wonder though, could this be used to migrate custom DPC-enabled customers from one platform to another?

Technically I should think so. It'd obviously be a one-time action since the DPC migration docs clearly state it's a one-way migration and can't be reversed, though like the DPC migration capability in existence since 2018 it looks like it will need some bilateral support from existing vendors, and to placate them is likely not pitched as a supported mechanism.

This is further suggested by [the docs](https://developers.google.com/android/management/reference/amapi/kotlin/com/google/android/managementapi/dpcmigration/DpcMigrationClient) that state:

```
This method can be called only by a Device Owner or Profile Owner. On Android 10 and below, this must not be called on a device with both a Device Owner and a Profile Owner.
```

<div class="side-note">

Sidenote: _Work profiles on fully managed devices_, the older COPE, isn't supported for migration!? That'll rule out migrating your Android 10 and below COPE deployments to AMAPI. Talk about rubbing salt in the wound after they binned this deployment scenario, arguably the most versatile to ever be offered by Google, [entirely off](/blog/2020/02/android-enterprise-in-11-google-reduces-visibility-and-control-with-cope-to-bolster-privacy/). You'd think this would be the perfect time to try to migrate the stragglers over to the replacement work profile on company owned devices deployment scenario instead.

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

We're unlikely to actually see this even tried, which is a shame.

The DPC migration function is split between [server](https://developers.google.com/android/management/reference/rest/v1/enterprises.migrationTokens), where tokens are created and managed, and the [Extensibility SDK](https://developers.google.com/android/management/reference/amapi/com/google/android/managementapi/dpcmigration/model/package-summary).

Google had been promising more functionality from the extensibility SDK allowing partners to fill the gap left by the lack of AMAPI feature parity with customDPC capabilities, it's interesting to see after almost a year of waiting for something to land there, it's this.

Anyway, in lieu of any further public information, this is what we have at the moment. It'll be interesting to see where this leads. Hopefully Google eventually gain the courage to release the full DPC migration capabilities to the ecosystem though, and Android Enterprise customers the world over will finally gain the ability to perform truly painless migrations.

## Update

Google today published the [release notes](https://developers.google.com/android/management/release-notes#jan-2024) that directly reference this new feature.

Based on the document [published](https://developers.google.com/android/management/dpc-migration) (or updated) on 26th Jan, a day after this article, we get a complete view of what DPC migration is and does, and it aligns pretty well with the above. Check out the doc linked above for a full walkthrough, but here are some highlights:

Confirming a lack of support for WPoFMD:

> This feature is not supported on fully managed devices which have a work profile running Android 9 or 10. Migrating these devices must not be attempted, and regardless of whether an error is raised, such devices are not supported for DPC migration.

Absolutely nothing has been offered in place, so COPE-heavy deployments are simply out of luck by the looks of things.

Confirming they've watered it down to support only one-way custom DPC to AMAPI migrations:

> Note: This process is transparent to end users. It is a one-way only process (it cannot be undone once completed) and it cannot be used to migrate a device from one EMM to another.

And the requirements:

> - The device is already managed by your EMM with a custom DPC.
> - Your custom DPC is integrated with the AMAPI SDK.
> - The device is enrolled with Google Play EMM API.
> - The device belongs to a Managed Google Play Accounts enterprise.
> - The device runs Android 9 or later.
> - In case of work profiles on company-owned devices, the device must run Android 11 or later.

Again it's too bad we're not even seeing - at the very least - AMAPI to AMAPI migration being possible today. Hopefully that'll come in future.