---
title: "Thoughts on Android 12's password complexity changes"
date: '2022-12-19'
status: publish
author: 'Jason Bayton'
excerpt: "Google's long-anticipated changes to device password complexity requirements for BYOD devices are here, and they're frustrating."
type: post
tags:
    - Enterprise
---

The password complexity changes Google announced [here](https://blog.google/products/android-enterprise/android-12-developer-preview/) and [here](https://developer.android.com/work/versions/android-12#work) with Android 12 for WPoPOD (work profile on personally owned devices) are rolling out to mostly-unsuspecting organisations as EMMs begin targeting API level 31 with their DPCs. 

I'll be honest, I didn't consider this to be much of a big deal. Having caught the announcement back last year I assumed it would be logically, thoughtfully implemented with reasonable defaults, and wouldn't have much of an impact on organisations.

I was wrong. 

Unfortunately, the same team that [introduced and killed off](https://bayton.org/blog/2020/02/android-enterprise-in-11-google-reduces-visibility-and-control-with-cope-to-bolster-privacy/) work profiles on fully managed devices in the space of a year have opted to once again force through changes with little thought or consideration for the many, many organisations already leveraging Android today, and have done so in a way that harbours frustration and fragmentation for managed estates.

## What's changed?

The technically minded may find it interesting to read through the developer docs for Android 12 [here](https://developer.android.com/reference/android/app/admin/DevicePolicyManager#setRequiredPasswordComplexity(int)) and a reference to changes with AMAPI [here](https://developers.google.com/android/management/reference/rest/v1/PasswordRequirements#passwordquality), but to summarise it:

Google's newest password complexity APIs replace the traditional, decade+ old password complexity options with a solution that is intended to simplify password management and free organisations of the tyranny of choice.

Rather than selecting one of the existing complexity options, such as complex numeric combined with a minimum number of required digits, or alphanumeric and optionally defining a minimum number of letters, numbers, and special characters, Google has created three buckets that offer Google-recommended, pre-defined and uneditable complexity options that create a "complete" password complexity policy simply by selecting it. These are as follows:

> **COMPLEXITY_LOW**  
> Define the low password complexity band as:
> - pattern
> - PIN with repeating (4444) or ordered (1234, 4321, 2468) sequences  
> This sets the minimum complexity band which the password must meet.
> 
> Enforcement varies among different Android versions, management modes and password scopes. See PasswordQuality for details.
> 
> **COMPLEXITY_MEDIUM**  
> Define the medium password complexity band as:
> - PIN with no repeating (4444) or ordered (1234, 4321, 2468) sequences, length at least 4
> - alphabetic, length at least 4
> - alphanumeric, length at least 4  
> This sets the minimum complexity band which the password must meet.
> 
> Enforcement varies among different Android versions, management modes and password scopes. See PasswordQuality for details.
> 
> **COMPLEXITY_HIGH**  
> Define the high password complexity band as:
> 
> On Android 12 and above:
> - PIN with no repeating (4444) or ordered (1234, 4321, 2468) sequences, length at least 8
> - alphabetic, length at least 6
> - alphanumeric, length at least 6
> 
> _[via](https://developers.google.com/android/management/reference/rest/v1/PasswordRequirements#passwordquality)_

As can be seen, all flexibility of custom policy definition is removed in favour of the above pre-determined options that Google suggests are acceptable for modern Android management.

## Problems with execution

Putting aside the complexity bucket definitions I find very much contestable (4 digit PIN as "medium"?), let's look at some of the frustrations this is causing organisations based on the conversations I've had over the last few weeks.

### It introduces policy fragmentation

The new complexity options apply only to BYO (work profiles on personally owned) devices, and only the device password. The work profile password (work challenge) still relies on password complexity. 

Fully managed (including dedicated) devices aren't impacted by the change, and COPE (work profile on company owned) devices are out of scope at the moment; Google intends to expand to these at a later date as [referenced in this doc](https://cdn.bayton.org/download/doc/ae-general/simplifying_password_quality_in_android_12.pdf), but with no public ETA that is subject to change, if it goes ahead at all based on ecosystem feedback so far. 

So Google have deprecated existing password complexity options in favour of new, simplified offerings, but they only apply explicitly today to the _device_ password on a personally owned device running a work profile. Every other aspect of password management across AE deployment scenarios still mandates the use of the _old_ complexity options.

This fragmented approach to password policies arguably does more to increase overhead than the intended reduction Google touts as motive behind the changes, and honestly even if they were consistent with the new options _across Android_, these complexity buckets sit at odds with the password policies of other OSes Android once aligned with. Fragmentation on top of fragmentation.

### Organisations don't have a choice

Personally owned work profile devices running Android 12 that are either newly enrolled, re-enrolled, or see policy changes after enrolment will be automatically algined to conform to Google's new buckets. The existing password requirements in place in an organisation will be subsequently ignored if they've not been updated to use the new complexity requirements (how often do password policies get updated?), leading to discrepancies between policies within the EMM and behaviour on-device - potentially only a subset of work profile devices as well, since those already enrolled will still abide by the already-set password policies once the EMM's DPC targets Android 12. Here's a demo of the differences between an older device and one running the latest version of Android with a standard numeric complex policy (no sound, apologies): 

https://youtu.be/_3Vo7Zh3Wa0

Moreover, for the many organisations leaning on a 6 digit complex numeric password today, the closest bucket is considered **medium**, permitting end users to set 4 digit PINs instead of the required 6 by traditional password policies. Google suggests organisations shouldn't worry because they've had decent brute force detection in place, but that doesn't in any way make me feel better about arbitrarily reducing password security.

To echo my views on WPoFMD, this should have been an _option_, not a requirement. I'm sure some organisations, especially those Google have been trying to target over the last few years with little to no experience with Enterprise Mobility, may see these new complexity buckets as something useful, but the many more established organisations have taken the time to develop their security policies, have them rolled out confidently across their estate, and will now be subjected to an unnecessary and unjustified overreach by Google of their BYOD security policy. 

## Closing thoughts

The biggest frustration I have with this is the loss of choice. A theme I fear is popping up too frequently for an OS known and marketed for it's flexibility and ability to adapt to how people want to use it. 

Google could have added these complexity offerings as an additional option, but has chosen to deprecate and replace instead.

Alone, complexity buckets will undoubtedly add value for inexperienced or blissfully ignorant organisation admins with a purely-BYOD estate who want a quick, low-effort password policy to enforce on devices, but that's where the usefulness of these buckets stops.

Going forward when I'm engaging with deployments, not only do I lose the flexibility to define the password policy for devices I want to - given the fixed nature of these buckets - but I'll have to explain why every OS and Android deployment scenario provides a reasonably consistent password policy experience except work profiles on personally owned devices, which has to be defined & configured separately. Wild.