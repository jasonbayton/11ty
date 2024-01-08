---
 title: "How are Android devices certified?"
 date: '2023-11-05'
 status: publish 
 author: 'Jason Bayton' 
 excerpt: "If you've taken a passing interest in Android as a product/platform in recent years, you may be familiar with GMS, Google Mobile Services, Certification - more recently rebranded to Play Protect Certification. But how does it all work?" 
 type: post 
 tags: 
     - Enterprise 
---
If you've taken a passing interest in Android as a product/platform in recent years, you may be familiar with GMS, Google Mobile Services, Certification - more recently rebranded to Play Protect Certification.

If the concept is new to you, this certification is the combination of public requirements from the CDD, [Compatibility Definition Document](https://source.android.com/docs/compatibility/cdd) - A doc that provides both requirements and recommendations for vendors building products to run Android that guarantee a baseline of security and compatibility within the Android ecosystem (applications work the same everywhere, there's a minimum encryption requirement, enterprise APIs and features are present, etc, etc), and GMS requirements - a Google & vendor agreement that permits Google applications (like Google Play Services, Play Store, Gmail, etc) to be preloaded provided the vendor agrees to things like application placement, system update commitments, minimum version requirements, default services, OOB experiences, and so on.

There's a bit more about Play Protect Certification, and how to check for it, in the FAQ [here](/android/android-enterprise-faq/view-all-certified-devices/)

Also referenced in the link above, Certification isn't a one-fits-all process, in fact you may have seen references to MADA, eMADA, iMADA and more in the news as Google makes changes to the agreements vendors are required uphold based on the regions they're selling into. Europe, India, Turkey, Russia.. and of course there's no certification for China at all, so it's all AOSP out there.

As an OEM you may have to certify a device under multiple licences in order to sell it into multiple regions, with user experiences changes including the browser choice screen, app placement changes, and more, adjusted in accordance with local requirements, resulting court cases decisions, and so on. If you're planning to sell to different regions you'll likely have multiple SKUs of a device anyway to account for cellular radio requirements, local certification body requirements, and other region-specific considerations, so multiple software SKUs isn't as big of a burden as it might seem, especially since Android 10 with the introduction of Build Variants - a process in which multiple software SKUs with differing requirements can be generated from a primary software build automatically.

## Who can certify devices?

If you're an organisation building Android devices, be that a new venture or as a change to an existing product line to support PPC/GMS, the obvious question is _how can I certify?_

In short, _anyone_ can build a device and prep it for certification based on the CDD, but only organisations with a signed x/MADA or EDLA agreement with Google can actually provide the GMS suite of applications, the requirements list, and submit the device to one of Google's approval partners (3PL) to undergo the testing and validation process (the aforementioned xTS tests in the FAQ above).

The likelihood of gaining this agreement as an organisation is low, as Google maintains a small list (~100) of approved partners, and therefore the best course of action is to reach out to existing partners and discuss requirements, pricing, etc. 

Conveniently, Google provides a list of ODMs and Partners on their [Partners](https://www.android.com/certified/partners/) page, under the ODM tab.

![Android Partner List](https://cdn.bayton.org/uploads/2024/partner_list.png)

It's a surprisingly common approach. A lot of smaller OEMs (and some larger) will lean on a partner in this list. Consider HMD for example, who has been known to use Foxconn. Many smaller OEMs will design and build their devices with a certified ODM entirely, outsourcing the full operation in the knowledge an ODM with an agreement will know how to get a device designed, built, and certified in-keeping with the requirements of Play Protect certification.

Or in theory, at least. In reality knowledge varies dramatically and partners need to be vetted.

Once an organisation is large and dominant enough in the market or a particular manufacturing niche to justify it, they can discuss with Google the prospect of signing their own agreement.

## How long does certification last?

This gets a little complicated, as it varies by hardware, licence, and whether it's a new device or upgrading from an older version of Android. 

Additionally, there are three states for approval windows:

- Open: When approval for an Android release begins
- Closed: When approval for an Android release can no longer be submitted
- Expired: When an approved version of Android can no longer be preloaded in-factory

For **new** devices, if you're only considering when one version of Android can no longer be preloaded onto manufactured hardware, the baseline is about two years for handsets, three years for tablets/Android Go, and 5 years for EDLA.

But that depends on when in the Android OS version lifecycle you certify the device!

Take Android 13 for example, which was released in August 2022. The approval window for 13 opens in August 2022. You can then submit a device for certification for up to around 18 months (a year longer for EDLA) before Google closes the approval window to new devices. 

If you then factor in the dates of expiry:

- Handsets: EOY '24
- Tab/Go: EOY '25
- ELDA: EOY '27

A handset could in theory attain certification at the beginning of 2024, and have its approval expire in under 12 months.

From the month following expiry, it is no longer permitted to preload that version of Android on _newly manufactured devices_. Those in stores, on a pallet sailing the ocean towards retail stores, or otherwise already left the factory aren't impacted by this, it just means no _new_ devices can be manufactured with Android 13.

That isn't a long time to crank out hardware, there's more flexibility with tablets and EDLA, but there's more here to consider.

If you wish to continue shipping your hardware after a respective expiry, you'd need to ensure you upgrade from -in this case - 13 to 14 within the _upgrade window_, at this point your device would be considered **existing** rather than **new**. The approval window for version upgrades usually closes 6-8 months after the current Android version approval expires, so offers additional time to certify after expiry. For handsets you'll be playing with fire if waiting _that long_ to upgrade though, since expiry for the upgrade would be a few months away following certification if consistently leaving it to the last minute. Tablets and EDLA, not so much.. but still less time between upgrade sprints than if you keep on top of version releases.

This is one of the larger challenges with smaller OEMs; keeping on top of release cycles is no mean feat, and it's easy to start falling behind when issues arise.  

## What makes EDLA different?

Reading above, you may have picked up on the fact EDLA has a much wider window from approval to expiry, but that's just the tip of the iceberg.

EDLA stands for Enterprise Device License Agreement and was introduced to address challenges faced by OEMs building devices intended for enterprise:

- Non-standard form factors
- Devices with much longer support lifecycles
- Industrial/restricted environments 

I go into more detail on EDLA [with this article](/blog/2023/05/product-files-alternate-formfactors-and-power-solutions/#migrating-to-edla) discussing a device that meets the intended use case perfectly.

In summary though, the EDLA extends an olive-branch to OEMs, partners and, importantly, customers, that struggle with the inflexible requirements under the consumer-targeting licence agreements that have existed for many years, and helps make Android a competitive platform to existing embedded and IoT platforms that dominate the ecosystem today.

Is it perfect? Absolutely not. There are still many, many limitations in place with enterprise devices today mandated by licence requirements, but its existence signals effort to improve this device segment from Google and I look forward to its continued evolution.

## What happens when certification _does_ expire?

Eventually as an OEM you will make the decision to no longer provide major Android version upgrades, and both current version expiry _and_ the upgrade approval window for the next Android version passes. 

(Technically nothing prevents providing a multi-version jump, ie. from 12 to 14/15, but that's not very common).

It happens all the time, but doesn't necessarily prevent the continued software & security support of a device; Android devices are also subject to security updates after all, and often for years longer than the commitment to major version upgrades. 

These smaller updates that target security and critical issues ensure devices in the market remain fit for purpose, even if they no longer benefit from new features and functionality. 

As an OEM, there's another major milestone in maintaining security updates for an in-market Android device: When **Security backporting** ends. 

Google provides backporting for CVEs and occasionally other patches for a period of three years from the introduction of an OS version. That means every patch they commit to AOSP, they undertake the necessary work to port it to the older Android version codebases, and from there OEMs can pull them down to implement in their builds. There's a little more complexity to the process than this, but this gives you an idea of what happens. 

After three years, Google calls time in order to focus on newer Android releases and no longer does this work, causing the flow of patches to stop.

At this point the OEM must either:

- End regular support for the device, and security updates cease.
- Take the code committed by Google from a newer Android release and undertake the work themselves to implement the code changes, test, and release. 

By the time this decision is due, the device will often have been in the market long enough to justify calling time on support, however and particularly for enterprise devices, larger OEMs often have the staff and knowledge available to undertake the necessary work to continue supporting a device on an older version of Android for a significant amount of time. 

## And the cycle continues

Considering an OEM has multiple devices on the market at any one time, you can imagine this is quite the undertaking maintaining a suite of products across multiple major Android releases, but this is the nature of the ecosystem.

Is there anything you'd like to know about Play Protect Certification not covered here? Give me a ping on [LinkedIn](https://linkedin.com/in/jasonbayton) or [contact me](/contact).