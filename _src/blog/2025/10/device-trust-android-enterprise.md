---
title: "Device Trust from Android Enterprise: What it is and how it works (hands-on)"
date: '2025-10-12'
status: publish
author: 'Jason Bayton'
excerpt: "Some of the benefits of enterprise management without the management. Learn why Device Trust is significant"
type: post
tags:
  - Enterprise
---

Hybrid and remote work has become increasingly more prevalent over the last several years, with bring-your-own (BYOD) providing a driving force in enabling a work-from-anywhere-on-anything approach to the modern enterprise. 

While you'll find no end of articles for and against flexible work practices, the reality is they're here, and they're challenging IT departments the world over on how to ensure any device is safe, stable, and secure when interacting with corporate resources. Traditionally this would be through the enforcement of an MDM, or vendor lock-in through particular MAM vendors to allow for access to corporate resources, but what if there was another way?

With the launch of [Device Trust](https://blog.google/products/android-enterprise/introducing-device-trust/), Google is providing a new avenue for tapping into the vast device data repository previously mostly reserved for MDM providers of the Android Management API (AMAPI), allowing many more vendors across many more use cases to understand device posture - and how identity, threat, security, and management systems can interoperate - in a way that is far lower effort, far higher reward, and reduces local device overhead with multiple different solutions all attempting to poll for basically-equivalent data.

Far from being *just another management API*, Device Trust is positioned as a core component in Android's Zero Trust architecture. Enabling continuous device verification across all modern Android devices, it offers a practical way to understand device security and posture in real time, irrespective of management.

To reiterate - because this can't be understated - with Device Trust, it's no longer about **managing the device**, instead choosing to make use of the device signals offered to ensure even without heavy, restrictive device management policies, access can be granted to corporate resources. 

Google frequently, and rightly, points out that many data breaches in organisations stem from inappropriate access on mobile devices; reasons can include weak device posture, outdated software/security patching, or unsecure networks (amongst others). Device Trust aims to surface these signals for vendors, providing the ability to make runtime decisions about access, based on real signals, not assumptions.

## What Device Trust is — and isn’t

Think of Device Trust as a smart context layer. It gives a clear snapshot of a device’s management status, ownership, security posture, and policy hints. It’s not a full device control or attestation replacement but fills the gap between no visibility and full MDM.

You can find the official overview [here](https://support.google.com/work/android/answer/16166663?hl=en). The developer docs explain how to register and pull these snapshots.


## So.. how does it work?

First and foremost, as above this platform is for approved partners only, and gated by an application process. It doesn't mean anyone with any app will suddenly be pulling signals of devices for their own uses. 

Additionally, support is provided for Android 10 and above. Even on Android 10 the likelihood is strong devices would fall foul of any desired posture states in use across most organisations (in other words, if you're running < Android 10, you don't need Device Trust to tell you you're running an outdated and likely unsecured estate).

In a nutshell, because I'll go into this in more detail later, there are two approaches I see that would look to lean on Device Trust:

- You're a vendor wishing to integrate trust-based policies/data points for Android devices into your solution
- You're an organisation looking to adopt access/monitoring without full device management

Why would an organisation opt out of full management? There may be several reasons, including:

- Pressure or pushback from employees
- No existing management platform
- No desire for full device management, but a requirement to ensure devices are secure
- Roaming or temporary access requirements for contractors, seasonal workers, etc.

Are the more reasons? Absolutely. Could you challenge the reasons above with counterarguments and education to the benefits of full management? Also yes. Ultimately however this is about flexibility; if I'm engaging with a customer whose employee base echoes a persistent (incorrect) perception that an MDM can see what you're doing, track your app usage, view your files, so on.. and no justification is working, I'd sooner see them implement a middle-ground like Device Trust over nothing at all. 

Device Trust currently provides over 20 device signals, closely tied alongside the Play Integrity API (integrated separately), covering things like:

- Device attestation and integrity  
- Management state and ownership  
- Patch levels and OS version  
- Encryption and screen lock complexity  
- Play Protect status and network security  

These are provided as a _snapshot_ to the calling, approved application on-device, and can be called as often as required in order to ensure access is granted/denied based on a current, in-the-moment state. It makes for an extremely dynamic solution, with ongoing verification helping organisations enforce policies that adapt as conditions change.

What does that mean? To pick a simple data point - access to resources may be granted under normal conditions, but should a user join an open Wi-Fi network? Immediate revocation. If that's too obvious an example, how about if a device hasn't updated its security patch level within 30/60/90 days? Access revoked.

### Isn't this already available in EMM platforms?

Certainly, but if we ignore the scenario where an organisation doesn't use an EMM today, Device Trust benefits almost every other vendor type in the ecosystem _in addition_ to EMMs themselves, the latter for the real-time ability to pull this data in AMAPI-based EMMs that isn't typically possible.

If you're a Mobile Threat Defence vendor, an Identity Provider, or a security solution for example, to gain access to some of the signals provided by Device Trust historically you would:

1. Need to integrate or partner with an EMM to deploy to estates
2. Build out the capabilities to fetch much of this information from scratch

If you're one of several vendors on a device - a device could easily have an IDP, an EMM, and an MTD solution in play across an estate today - your solution along with several others could be polling for this data constantly, and potentially fetching dissimilar results based on how and when data is fetched. 

Device Trust by comparison feeds consistent, high-level posture signals all approved applications in a structured and consistent way. It means all of these vendors can play nicely together without the historical tether to management. No longer would an MTD solution require API access into an EMM to understand the current (or last-received, at least) posture of a device. No longer would security tools _have_ to integrate with other solutions to get the same - all approved vendors can call their own snapshot and receive it in milliseconds. 

Coming at it from another angle.. no longer do non-EMM solutions require a customer has an EMM (or build one themselves) to get information from a device historically tied to either a Device Administrator or a Device Policy Controller (MDM agent). 

This in itself is a big deal.

### Key signals and how to interpret them

The trust snapshot bundles various signals your app or backend can use to make smarter decisions, including:

- Ownership type (company or personally-owned)  
- Management mode (profile owner, device owner)  
- Provider info including business name and DPC details  
- Patch level, OS version, pending updates, and published equivalents  
- Lock complexity and encryption status  
- Network state, Play Protect status, overall security  

These help map device posture to meaningful states, either locally or back in your infrastructure for conditional access, compliance, or alerting.

### Use cases across roles

Device Trust is most powerful when different roles in the stack use it in concert. Here are some examples:

**EMMs / UEMs**: Much of the data already exists for EMMs with managed devices, but a companion application could, in theory, be far more reactive to immediate state changes; triggering policy changes the moment a device returns poor posture, blocking devices that no longer meet posture requirements in the moment rather than on the next interaction with the AMAPI services/MDM backend. The bigger opportunity, for me, comes with the value EMMs can offer for unmanaged devices; tracking assets and their posture without full control of a device will make the prospect of posture-gated resource access far more palatable.
**Identity Providers (IdPs)**: Gate login or data access based on posture (for example, disallow sign-in if device exceeds patch tolerance). This one is a clear and obvious use. 
**MTDs / Threat Tools**: Correlate threat signals with verified posture to refine risk scoring, build stronger threat profiles based on device information, and influence EMM policy actions where a management platform is detected.
**Security Tools**: Surface posture locally in the app, explain compliance to users, and offer integration into remote SIEM, access, or security logging systems. Independent tools I feel offer the strongest opportunity for the most flexible integrations, and is the route I'm testing currently.

### Policy, decisioning, and layering

You may wonder with the above use cases, how Device Trust adapts to the differing requirements of vendors, particularly if/when in use concurrently on a device? 

It doesn't. Device Trust itself doesn’t enforce policy - it’s passive. That means the vendors themselves provide policy options in their own environments, and simply use the signals provided by Device Trust to enforce the appropriate actions they take. The real value comes from how vendor policies interpret these signals:

- Identity providers can block or allow login based on device posture  
- Threat detection tools can raise alerts on suspicious changes  
- EMMs can prompt configuration or compliance nudges  
- Apps can restrict features or guide users through fixes  

Policies should handle missing signals gracefully and decide whether to fail open or closed, depending on context, to avoid blocking legitimate users unnecessarily.

Google recommends layering Device Trust over attestation and Play Integrity for stronger guarantees — if attestation fails, the snapshot likely can't be trusted. Unfortunately, though SDK integration exists for Play Integrity, today Device Trust and the AMAPI SDK it relies on has no in-built support. This means vendors have to integrate this separately. To be fair, many services will already have an integration in place given the historic requirements mentioned earlier, but for newer apps & services, it's an extra step. 

## Challenges, tradeoffs, and privacy

There are some things to keep in mind:

- Not every device or OS version returns all signals correctly based on varied testing; expect gaps.  
- Avoid rigid gating that frustrates users with false positives.  
- Signals are abstracted to protect privacy and require approval to access on unmanaged devices.  
- Registration and vetting can take some time, and the business case should be strong as with all parter programmes within Android Enterprise.  

Handling these gracefully and communicating clearly with users helps keep frustration low.

## How I've implemented it

<< All of this needs properly writing up >>

## Final thoughts

Device Trust adds a strategic posture layer to Android’s security foundation, helping organisations align with modern cybersecurity and Zero Trust principles. It’s not a replacement for MDM or attestation but a smart bridge between them, enabling any approved app or service to reason about trust — even on unmanaged devices — making conditional access smarter, more responsive, and user-friendly.

If you’re working with IdPs, EMMs, MTDs, or developing real-time device hygiene and access decisions, Device Trust deserves a serious look.