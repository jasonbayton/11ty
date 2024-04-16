---
title: 'Managed Google Play, allowlist or blocklist?'
published: '2019-06-30T22:52:15+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - App management
layout: base.njk
eleventyNavigation:
  order: 1000
discourse_permalink:
    - 'https://discuss.bayton.org/t/managed-google-play-whitelist-or-blacklist/307'
---
Under most normal circumstances in enterprise the managed Google Play Store is locked down to only applications approved for use by an organisation, offering incredibly granular control over the end-user experience and ensuring non-business applications remain entirely outside of the corporate environment.

For EMMs leveraging the Android Management API (AMAPI) and ~~G Suite~~ Google Workspace however, an additional option for managed Google Play allows for the opposite of typical behaviour, enabling unrestricted access to applications on the Play Store, with the organisation instead able to deny applications not permitted for installation.

The ability to permit full access to the Play Store is somewhat newer than the traditional approach to allowlisting applications one by one, and targets a very different use case not necessarily fully agreed with by the wider Android community:

![](https://cdn.bayton.org/uploads/2019/04/image.png)
*In this case MS are simply enabling AMAPI functionality. But does the use case fit Intune?*

Android is ultimately an incredibly flexible platform capable of supporting a wide range of use cases extending beyond the traditional enterprise model requiring the separation of personal and corporate data. Android Enterprise is utilised with large organisations and SMBs alike, professional groups and even families serious about safeguarding devices:

![](https://cdn.bayton.org/uploads/2019/04/image-1.png)
*Even families benefit from management capabilities of Android Enterprise*

The goal therefore in enabling such functionality to promote the use of Google Play as if it was unrestricted may not be as bizarre as it seems.

## Which method is best for my organisation?

There’s rarely a one-size-fits-all recommendation, but in this case it can at least be whittled down to two main considerations. These considerations as it happens equally apply to enabling adding accounts on fully managed devices or managed profiles.

### Organisations with data to protect

Organisations distributing corporate data to an Android device would likely opt for the traditional approach of providing access only to specific, allowlisted applications. Any additional applications could be accommodated outside of the corporate profile by utilising deployment scenarios that supports the work profile (either BYOD or COPE).

This ensures devices in the field are only running the applications, be that in the work profile or on fully managed devices, that have been explicitly approved by the organisation and thus prevents the installation of common shadow IT applications like Dropbox.

Often alongside email, organisations may distribute documentation or other information which is not designed to be taken out of the secure provisioned environment, yet should the Play Store be fully accessible, it is entirely possible an end-user may download a personal file storage application and use this to upload corporate documents to a personal account.

Once DLP (data loss prevention) has been compromised in this fashion, whether via the blocklist method in Google Play or by permitting the addition of personal Google accounts in the managed profile, it’s very difficult – if not impossible – to fully control the flow of data between work and personal apps following this.

### Organisations without data to protect

For deployments not permitting access to corporate data, but where management of the device is still desired (plus capabilities like zero-touch or KME to ensure simple, quick provisioning into the correct environment), DLP does not pose a concern and therefore there’s little need to prevent users from downloading applications as desired.

Equally, where it’s important a device looks and feels *normal* but is still managed in the background with the ability to push out corporate applications (like policy apps, recommended apps for business without access to critical data, etc) again having the full Play Store available even without a personal Google account may be considered beneficial. Combine this with a provisioning method that supports the ability to enable system apps (all but DPC identifier) and aside from some indicators dotted around the device stating it’s managed, it’ll otherwise look, feel and act like an unmanaged device.

Since not all applications are considered fit for work, organisations have the ability to blocklist applications one-by-one as required.

For a little more control, users can still be somewhat intentionally limited by not permitting the ability to add accounts to the device, meaning only those applications not reliant on accounts would correctly function.

The risk with this approach comes with a change of scope. Over a period of time the way a device is used may change and users may request access to a corporate resource, be that email, collaboration tools, storage or anything else.

As soon as this is granted to a device with an open Play Store and no further restrictions safeguarding DLP, organisations could once again easily face the potential of shadow IT applications gaining access to corporate data. Changing the policy back from blocklist to allowlist may not be enough to remove unauthorised applications in time to secure data, though with changes in AMAPI in late 2023 a bug was resolved, ensuring unapproved applications would be removed after installation when not explicitly referenced in policy.

## The choice to be made

For organisations undecided but leaning on an open Play Store, consider if it might make more sense to leverage a work profile deployment (COPE/BYOD) in place of this.

Users have the ability to use the parent (personal) profile as they see fit with management of the device still possible for COPE deployments (partially for BYOD) while corporate data remains isolated and separately encrypted.

Where it is determined to be absolutely no short or long term risk though, organisations now indeed have the possibility to have the Play Store act in this new capacity.