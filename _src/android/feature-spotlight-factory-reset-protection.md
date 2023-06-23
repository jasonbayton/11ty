---
title: 'Feature spotlight: Factory Reset Protection'
published: '2018-09-07T13:03:57+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Fully managed
layout: base.njk
eleventyNavigation:
  order: 10000
discourse_permalink:
    - 'https://discuss.bayton.org/t/feature-spotlight-factory-reset-protection/183'
FeaturedBackground:
    - android
---
## What is it?

Debuted back with Android Lollipop, Factory Reset Protection (FRP) has proven to be a rather touchy subject; while on the one hand it offers an excellent means of protection against a device being factory reset in an unauthorised manner, such as typing the passcode incorrectly too many times or wiping via recovery for example, on the other hand it has been solely responsible for many Android bricks littering drawers and cabinets the world over.

Particularly for enterprise, the necessity for Google accounts and the limitations in place for maintaining control on legacy Android enrolments has almost guaranteed organisations end up seeing the _dreaded_ FRP sooner or later, and is something that affects organisations on a frequent basis even today according to the OEMs I've spoken with. While in many cases devices locked due to FRP can be repaired, it can be a costly and time-consuming process.

## How does it work?

When setting up an Android device from a factory-reset state, during the wizard the end-user can add their Google account. The process of adding said account, and a device PIN, then activates device security features, including FRP.

Should a device then be factory reset in an unauthorised manner, the act of removing the account undertaken during a normal factory reset will not complete and thus the Google account remains associated with the device.

On setting the device back up after a factory reset, it will check for the association of a Google account and require the account credentials in order to continue setup; inputting incorrect details will lock the device for a period of time (up to 72 hours), and may stay in this cycle for as long as the Google account credentials are not correctly entered.

For devices with multiple Google accounts added, normally the first added will be associated with FRP, however this can be easily validated by logging into [Find my Device](https://www.google.com/android/find) with the Google accounts on the device. Whichever account the device appears in is the account FRP is associated to.

## What has been supported?

Most UEM solutions will offer the capability to disable FRP for fully managed devices, but nothing more. This means a device can be factory reset in an unauthorised manner and allow setup with no concerns over triggering FRP.

With only disabling FRP available, this has been the only real option for FRP management and has had to be enabled, as triggering FRP on a fully managed device with a managed Google Play account for which there is no password will almost guarantee FRP locks it out.

Unfortunately having FRP disabled has left a massive loophole available on any Android Enterprise device allowing end-users to simply factory reset in an unauthorised manner and set the device up again without management.

Yep.

The obvious way around this has been zero-touch, since it will immediately request the device is set back up under UEM management, but since zero-touch is an Oreo feature, resellers are limited and many organisations are yet to implement it, there are a considerable number of devices out in the wild for which this would not be a consideration.

## A better solution for FRP management

With the introduction of Workspace One UEM 9.6 and MobileIron Cloud R56, enhanced FRP management capabilities (available since Android 5.1) have *finally* been implemented. Intune has had this a few months already, also, however only supporting COSU currently means its use is limited (though appreciated nonetheless).

Instead of simply disabling FRP, organisations are now able to whitelist one or multiple Google accounts that need to be authenticated before the device will continue setup, thus in most cases requiring a call or visit to IT in order to unlock the device; a far more sane approach to ensuring devices stay under the management of an organisation.

FRP management is configured entirely within the UEM, and accounts can be added/removed on the fly. Obviously as with most enterprise accounts, these should be generic for the team and not personal Google accounts.

## A caveat

With this improved implementation, it does force end-users of devices going into FRP to reach out to the organisation admin in order to retrieve both the **account** and the **account password**. 

It is therefore very much recommended the password set on the whitelisted Google account is rotated frequently to avoid the credentials leaking organisation-wide.

## Setting it up

FRP management, and the act of whitelisting accounts is a very straightforward process across supported UEM platforms.

### Configuring WS1 UEM

![](https://cdn.bayton.org/uploads/2018/09/2018-09-06-12.46.44.gif)

### Configuring MobileIron Cloud

![](https://cdn.bayton.org/uploads/2018/09/2018-09-06-12.51.53.gif)

### Configuring Intune

![](https://cdn.bayton.org/uploads/2018/09/image-2.png)
*Sorry, no GIF here. Also interesting is the use of email addresses.*

### Getting the ID

In the above (excluding Intune) it may just seem like a bunch of numbers being pasted into the account ID fields, but where do these numbers come from?

Simply head over to [People: Get](https://developers.google.com/people/api/rest/v1/people/get), type “me” into the userID, click EXECUTE, and when prompted for authentication, log in with the generic Google account you wish to fetch the ID for. It will output it as below, highlighted in orange.

![](https://cdn.bayton.org/uploads/2018/09/image-1.png)

## The end user experience

https://www.youtube.com/embed/rYxcC9XYgVI

## Conclusion

The lack of any feasible means of stopping a device being taken out of management should it be factory reset has been something I’ve taken issue with for some time; between asking Google for other means of preventing a reset (such as limiting access to recovery) and frequently bringing the issue up to UEM vendors, I am really pleased to see the eventual implementation of a solution; it plugs a pretty simple means of avoiding corporate management and should go some way to ensuring devices under management stay that way.

I can’t really say why it’s taken so long to see decent adoption of this pretty critical feature, nor why it’s suddenly popping up on multiple UEM platforms around the same time (though I can speculate), but I am very happy to finally see it land.

If your organisation is managing Android Enterprise devices without utilising zero-touch, FRP management should be a priority for those with a supported UEM platform. If your UEM platform doesn’t support it today, it would definitely be worthwhile leaning on the vendor to have it implemented.