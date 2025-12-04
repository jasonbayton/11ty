---
title: "RCS archival and you: clearing up the misconceptions"
date: '2025-12-04'
status: publish
author: 'Jason Bayton'
excerpt: "Crazy to think, but Google are *not* suddenly and fundamentally reversing their stance on privacy?!"
type: post
tags:
  - Enterprise
---
Recent headlines have sparked concern and confusion about a new Android feature that supposedly lets your boss read all your text messages. Sensational claims like “Google starts sharing all your text messages with your employer” have understandably raised privacy concerns. In reality, Android RCS Archival is a tightly scoped enterprise feature designed for regulatory compliance - not a free-for-all licence for employers to snoop on any phone. This post will clarify what RCS Archival actually is, how it works, and debunk the common misconceptions.

## What Android RCS archival actually is

RCS Archival is a feature introduced by Google to help organisations meet regulatory requirements (for example: financial, legal, and government sectors).

Modern messaging creates a compliance challenge. SMS could historically be archived via carriers, but RCS (the upgraded texting standard used by Google Messages amongst others) is end-to-end encrypted, which means organisations cannot simply rely on carrier logs or network-level capture.

From Google’s official announcement:

> “This new capability, available on Google Pixel and other compatible Android Enterprise devices gives your employees all the benefits of RCS — like typing indicators, read receipts, and end-to-end encryption between Android devices — while ensuring your organization meets its regulatory requirements”  
> — [Google Android Enterprise Blog](https://blog.google/products/android-enterprise/rcs-archival/)

How it works:

* A partner archiving app (Smarsh, CellTrust, [BAYTON](/projects/managed-archiver)) integrates with Google Messages.
* When enabled, messages **sent, received, edited, or deleted** are captured **on the device itself**, not intercepted in transit.
* Encryption remains intact; the capture happens **after decryption on the device**, similar to how work email archiving has always functioned.

This is not a backdoor. It is an endpoint-level compliance mechanism, and it only works under tightly controlled enterprise management environments.

## Fully managed, company-owned devices only

This cannot be stressed enough:

**RCS Archival does not work on personal devices.  
It does not work on BYOD devices.  
It does not work on Work Profile setups.**

It only applies to devices that are:

* **Company-owned**
* **Provisioned as fully-managed**
* **Under complete MDM/EMM control**

Google’s documentation makes this explicit:

> “This feature works for Google Messages on fully-managed Android devices.”  
> — [Google Support](https://support.google.com/work/android/answer/13761869)

Even if an organisation wants to archive messages, **they cannot do it on your personal device**. It is simply not possible for this feature to function anywhere except on fully managed devices.

## Not enabled by default

Android RCS Archival is **opt-in**, not automatic.

To activate it, an IT administrator must:

1. Deploy a supported archiving application.
2. Configure `messages_archival` via managed configuration in their EMM.
3. Explicitly assign the policy to targeted devices.

If they do not do all three, **archival does not occur**.

From Google:

> “IT administrators can enable RCS Archival through a simple configuration. You have full control to decide which devices have the feature turned on and which archival application you deploy for your organization.”  
> — Google Android Enterprise Blog

There is no “silent switch” Google can flip globally.
There is no mass rollout to all users.
There is no automatic activation for all Pixels (or other Android Enterprise devices as support rolls out)

## Transparent to employees

A crucial part of this design is user visibility.

> “Employees will see a clear notification on their device whenever the archival feature is active.”
> — Google Android Enterprise Blog

Meaning:

* You **cannot** be silently monitored.
* If the feature is active, you will **see a notification** in Google Messages.
* Once you see that warning, you know every message in Google Messages is being archived.

This ensures the feature cannot be used clandestinely. It's intentionally transparent.

[![https://cdn.bayton.org/uploads/2025/rcs-archival-clarifications/Screenshot_20251204-103129_LG.png](https://cdn.bayton.org/uploads/2025/rcs-archival-clarifications/Screenshot_20251204-103129_LG.png)](https://cdn.bayton.org/uploads/2025/rcs-archival-clarifications/Screenshot_20251204-103129_LG.png)

## Encryption remains intact

One of the more misleading claims circulating was that RCS Archival “breaks” end-to-end encryption.

It doesn’t.

RCS encryption protects messages **in transit**.  
Archiving happens on the device **after** the message is decrypted for display.

This is exactly the same model used by:

* Email archiving on corporate laptops
* Instant message archiving in regulated industries
* Call recording on corporate phone systems

Encryption remains intact. The device itself is configured to retain business communications.

## Only Google Messages is affected

RCS Archival applies exclusively to **Google Messages**.

It does *not* affect:

* WhatsApp
* Telegram
* Signal
* Slack
* Teams
* Facebook Messenger
* Any other third-party messaging app

Those apps retain their own security models, separate from Android’s enterprise capabilities. Will similar archival solutions become possible with these applications (or any others) in future? Possibly.. but today's RCS archival offered by Google is app-level and limited only to Google Messages.

## Myths vs facts

| **Myth**                                             | **Fact**                                                                                              |
| -----------------------------------------------------| ----------------------------------------------------------------------------------------------------- |
| “Google lets employers read messages on your personal phone.” | False. Only company-owned fully-managed devices can be archived.                                      |
| “It’s enabled on all Android phones by default.”     | False. IT admins must explicitly enable it via EMM configuration.                                     |
| “Your boss can secretly monitor your RCS chats.”     | False. A clear notification appears on the device when archival is active.                            |
| “This breaks end-to-end encryption.”                 | False. Encryption in transit remains. Archiving happens only on the managed device, after decryption. |
| “Employers can now read your WhatsApp messages.”     | Completely false. Only Google Messages (SMS/RCS) is supported.                                        |

## What this means for employees

If you’re using a company-issued phone:

* Treat it as a work device.
* Expect work communications to be recorded.
* Watch for the archival notification in Google Messages.

If you’re using your personal phone:

* **Nothing changes.**
* Your employer cannot access your messages.
* The feature doesn’t even function on personal devices.

This entire capability is irrelevant to personal Android users.

## What this means for IT leaders & CIOs

For regulated industries:

* This finally closes the compliance gap around RCS.
* It restores parity with SMS and email archiving.
* It maintains security and device-side encryption.

You choose:

* Whether to enable it
* When to deploy it
* Which archival solution to use

And your users are transparently informed when it’s active.

## Conclusion

Despite dramatic headlines, Android’s RCS Archival feature is **not a privacy invasion**, **not automatically enabled**, and **not applicable to personal phones**. It aligns with what should be typically expected of a company device - actions may be monitored, data may be recorded.

If your organisation issues fully managed Android devices, you can now archive RCS/SMS securely and compliantly.  
If you’re an employee using your own phone – relax. This does not affect you, and your boss cannot read your messages.

Google summarises its purpose best:

> “[RCS Archival] helps your organization meet strict compliance needs while using the advanced security of Google Messages.”  
> — Google Android Enterprise Blog

# Still unconvinced?

[Get in touch](/contact), and I'll provide a demo with my own archival app, [MANAGED ARCHIVER](/projects/managed-archiver). You'll be able to see not only what happens on-device, but on the server-side, also.