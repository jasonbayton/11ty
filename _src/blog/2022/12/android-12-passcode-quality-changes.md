---
title: "Thoughts on Android 12's passcode complexity changes"
date: '2022-12-19'
status: publish
author: 'Jason Bayton'
excerpt: "Google's long-anticipated changes to passcode complexity requirements for BYOD devices are here, and they're frustrating."
type: post
tags:
    - Enterprise
permalink: false
---

It's here. The passcode complexity changes Google announced [here](https://blog.google/products/android-enterprise/android-12-developer-preview/) and [here](https://developer.android.com/work/versions/android-12#work) with Android 12 for WPoPOD (work profile on personally owned devices) are rolling out to mostly-unsuspecting organisations as EMMs begin targeting API level 31 with their DPCs. 

I'll be honest, I didn't consider this to be much of a big deal. Having caught the announcement back last year I assumed it would be logically, thoughtfully implemented with reasonable defaults, and wouldn't have much of an impact on organisations.

I was wrong. 

The same folks who brought us the chaos of deprecating work profiles on fully managed devices in Android 11 have opted to once again force through changes with little thought or consideration for the many, many organisations already leveraging Android today, and have done so in a way that harbours frustration and fragmentation for managed estates.

## What's changed?

The technically minded may find it interesting to read through the developer docs for Android 12 [here](https://developer.android.com/reference/android/app/admin/DevicePolicyManager#setRequiredPasswordComplexity(int)) and a reference to changes with AMAPI [here](https://developers.google.com/android/management/reference/rest/v1/PasswordRequirements#passwordquality), but to summarise it:

Google's PasswordQuality APIs replace the traditional, decade+ old password complexity policies with a solution that is supposed to simplify passcode management and free organisations of the tyranny of choice.

Rather than selecting an already clearly-defined policy such as complex numeric and inputting 6 for number of required digits, or alphanumeric and optionally defining a minimum number of letters, numbers, and special characters, Google has created three buckets to do some of this for you:

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

## Problems with execution

Putting aside the complexity definitions which I find very much contestable (4 digit PIN as "medium"?), let's look at some of the frustrations this is causing organisations based on the conversations I've had over the last few weeks.

### It applies to BYO (work profiles on personally owned) devices only

And only the device passcode. The work profile passcode (work challenge) still relies on password complexity. 

Fully managed devices are unaffected by the change, and COPE (work profile on company owned) devices are out of scope at the moment; Google intends to expand to these at a later date, but with no public ETA that is subject to change. As such, the _deprecated_ password complexity policies are required here as well for both device and work profile.

This fragmented approach to password policies arguably does more to increase overhead than the intended reduction Google touts as motive behind the changes.

### Organisations don't have a choice

BYO (work profile) devices running Android 12 that are either newly enrolled, or see policy changes after enrolment, will be required to conform to Google's new PasswordQuality buckets. The existing passcode requirements in place in an organisation will be subsequently ignored if they've not been updated to use the new quality buckets (how often do password policies get updated?), leading to discrepancies between policies within the EMM and behaviour on-device - potentially only a subset of work profile devices as well, since those already enrolled will still abide by the already-set password policies once the EMM's DPC targets Android 12. Here's a demo of the differences between an older device and one running the latest version of Android with a standard numeric complex policy: 

https://youtu.be/_3Vo7Zh3Wa0

Moreover, for the many organisations leaning on a 6 digit complex numeric passcode today, the closest bucket is considered **medium**, permitting end users to set 4 digit PINs instead of the required 6 by traditional password policies. Google suggest organisations shouldn't worry because they've had decent brute force detection in place, but that doesn't in any way make me feel better about arbitrarily reducing password security.

To echo my views on WPoFMD, this should have been an _option_, not a requirement. I'm sure some organisations, especially those Google have been trying to target over the last few years with little to no experience of Enterprise Mobility, may see these new buckets as something useful, but the many more well-established organisations have taken the time to develop their security policies, have them rolled out confidently across their estate, and will now be subjected to an unnecessary and unjustified overreach by Google of their BYOD security policy. 

### They're unnecessary with existing options

Google already provides a multitude of complexity types: something, numeric, numeric complex, alphabetic, alphanumeric, complex.. 