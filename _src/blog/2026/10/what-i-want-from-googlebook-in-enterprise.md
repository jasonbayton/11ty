---
title: "Googlebook in enterprise? Here's my wishlist"
date: '2026-10-02'
status: publish
author: 'Jason Bayton'
excerpt: "Android Enterprise, work profiles, shared users, proper Linux management, and the ability to switch out the on-device AI. Here's what I'd like Googlebook to bring to enterprise."
type: post
tags:
  - Enterprise
---

Earlier this week I covered [Google's first proper acknowledgement of Googlebooks in enterprise](/blog/2026/09/googlebooks-meet-enterprise/), the wait until the second half of 2027 for the first management capabilities, and the licensing questions Google has left unaddressed. 

I've been writing variations on these wishlists since [2019](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/), followed by [2023](/blog/2022/12/android-features-2023/) and [last Christmas](/blog/2025/12/12-ae-requests-of-christmas/). Several requests are still on the [list](/android/android-enterprise-feature-requests/), and apparently it hasn't put me off asking again.. this time for a laptop!

I've already made my preference for management fairly clear, but to summarise:

_I'd like Googlebook to support Android Enterprise management through either an EMM's own [device policy controller (custom DPC)](/android/android-enterprise-faq/amapi-vs-custom-dpc/) or Android Management API (AMAPI), without a separate licence to unlock device management._ 

For timing, Google's [21 September launch post](https://blog.google/products-and-platforms/devices/googlebook/pre-order-googlebook/) puts devices on shelves from 4 October in the US and 5 October here in the UK and several other markets, following pre-orders. The [enterprise guidance](https://support.google.com/chrome/a/answer/16634428), last updated on 23 September as of publishing, still describes a consumer launch, managed Workspace account sign-in and optional Chrome browser management today, with central device management coming in phases from H2 2027.

With that enterprise offering still some way off, there's plenty I'd like to see included. Some of the underlying Android capabilities exist already, some are showing up in the builds I've been tracking, and some would need entirely new work. ChromeOS has shared sessions, browser controls and support tools worth bringing across; with those and a proper work profile, our existing EMMs would have a fairly good starting point.

Google hasn't committed to this list, and I haven't tested a managed Googlebook yet. This is all speculative and more derived from an Android perspective, given that's my bread and butter.

**Jump to a section**

- [Android Enterprise management through a chosen EMM](#android-management-please), using custom DPC or AMAPI, without a separate Google device-management licence.
- [Existing policies and laptop controls](#bring-the-policies-with-it), including wallpaper management, device trust and clear reporting when a policy can't be enforced.
- [Work profiles](#a-work-profile-is-mandatory) that separates work across Android apps, the desktop browser and Linux.
- [Managed devices and managed users](#manage-the-device-and-the-people-using-it), with shared sessions and policies suited to each person's role.
- [A proper choice over AI](#let-me-turn-gemini-off), including switching Gemini off completely or using an approved alternative.
- [Linux management](#linux-needs-management-too), from switching it on or off to controlling data sharing, package sources and user access.
- [Applications and desktop shortcuts](#applications-web-apps-and-putting-things-on-the-desktop), with managed Android apps, browser extensions, web apps and links in the right work context.
- [Enrolment for named users, shared devices and kiosks](#enrolment-seems-sorted-but), through zero-touch, managed accounts, QR codes or tokens.
- [Updates we can schedule and account for](#updates-across-the-whole-device), with visibility of software freshness across the OS, apps, browser, firmware and Linux.
- [Monthly patches and clear support commitments](#monthly-patches), with model-level support dates and detail on major OS upgrades and firmware coverage.
- [A Googlebook Flex option](#googlebook-flex) for suitable hardware organisations already own.
- [Commands and support tools](#the-commands-and-support-tools-too), including session controls, eSIM management, lost mode and diagnostics.
- [A route from existing deployments](#and-a-route-from-what-we-have-today), covering ChromeOS migration, EMM portability and managed testing before rollout.

## Android management, please

Google is bringing Android and ChromeOS together under Googlebook OS, the product we've been following as Aluminium (which is a far cooler name). I'd like it to bring the management together too.

An organisation already managing Android phones, tablets and [XR](/blog/2026/04/android-enterprise-lands-on-android-xr/) through an EMM supporting Android should be able to add Googlebooks to the same environment. The policies, application catalogue, reporting and command workflows should extend to the laptop form factor. The EMM can decide how to present the laptop-specific bits, as it does for other device types.

Google has said third-party EMM APIs are coming, but hasn't yet explained how those fit with Android Enterprise. Supporting existing custom DPC and AMAPI integrations would let partners extend the inventory, policy and application management they already have working for Android, which - as an EMM partner - is far easier than spinning up a whole new policy contract.

ChromeOS' device and user policies, shared sessions, desktop browser configuration and support operations all need a home in Android Enterprise. I'd like those laptop capabilities accessible through both management routes, so an EMM can support the whole machine using its existing approach. I've written plenty about [gaps between AMAPI and custom DPC management](/blog/2025/12/12-ae-requests-of-christmas/), and it would be good to see that work close some of them. Existing Android customers would benefit too.

The licensing is the the aspect that needs the biggest shakeup though. Its guidance already says a new structure will apply to Googlebooks and eligible Chromebooks that migrate. Device management (read: everything that exists, or is equivalent to what exists in Android today) could be included with the platform, as we expect it to be for Android. Organisations will still pay their EMM provider, and Google can offer paid support or additional services if it wants to.

[Apple](https://support.apple.com/en-gb/guide/deployment/dep1d7afa557/web) and [Windows](https://learn.microsoft.com/en-us/windows/client-management/mdm-overview) let an organisation enrol devices directly with a chosen management provider. An Apple deployment doesn't have to use Apple's own management service, and a Windows deployment doesn't have to use Intune. I'd like the same freedom to choose how Googlebooks are managed, which is a massive departure from the customer-pays-twice tax for anyone wanting a single pane of glass for their devices today.

Within Android, Samsung offers [standard Knox Mobile Enrollment and core Knox Platform for Enterprise controls](https://docs.samsungknox.com/admin/fundamentals/knox-licenses/) for free, while services such as E-FOTA and Asset Intelligence are paid, available through Knox Suite or separately. Organisations can pay for the extra services they find useful while keeping access to the underlying Android Enterprise management capabilities.

ChromeOS requires a [managed Google organisation and Google's management service](https://support.google.com/chrome/a/answer/1289314), with an [upgrade entitlement](https://support.google.com/chrome/a/answer/7613772) bought separately or bundled with the hardware. Using a [supported third-party EMM](https://support.google.com/chrome/a/answer/7532316) still requires that Google setup and entitlement alongside the EMM's own licence, and the EMM to integrate into Workspace APIs. It's rubbish.

For standalone devices, Google's [current UK list prices](https://chromeos.google/intl/en_uk/products/device-management/) are £40 per device per year for ChromeOS Enterprise Upgrade and £20 for Kiosk & Signage Upgrade. The TCO on that alone could pay for up to multiple additional Chromebooks over the supported life of just one. While the signage option is cheaper, it comes with a narrower management scope. [ChromeOS Flex is free to install](https://chromeos.google/intl/en_uk/products/chromeos-flex/), including on repurposed signage hardware, but enrolling it for device management still requires the appropriate upgrade. A bundled Enterprise Upgrade covers the life of the device without a separate annual purchase, but you're paying the licence fee on purchase rather than rolling. 

Google already offers [Chrome Enterprise Core](https://chromeenterprise.google/products/chrome-enterprise-core/) at no cost for cloud browser policy, extension management and reporting, with additional paid security capabilities in Chrome Enterprise Premium. I'd like Googlebook's Android Enterprise device controls available through our chosen EMM on a similar basis, with optional Google services and support priced separately. If Google needs another revenue source here, I'd much prefer it in those additional browser capabilities.

## Bring the policies with it

Support for existing Android Enterprise controls is my starting point, wherever the hardware and management mode make them applicable. I should be able to spin up a DPC and gain access to all of the DPM/user manager APIs I do on a Motorola: authentication, certificates, Wi-Fi, VPN, permissions, application restrictions, USB, camera and microphone, wallpaper management, screen capture, updates, compliance enforcement, logging, the lot. 

If a policy can't be enforced, the administrator needs to know which one and why. AMAPI's existing [non-compliance reporting](https://developers.google.com/android/management/reference/rest/v1/enterprises.devices#NonComplianceDetail) is one useful example. Clear reporting of unsupported or unenforced controls would help whichever management route the EMM uses.

There are laptop-specific settings to account for too: login-screen restrictions, allowed users, lid-close and idle behaviour, external displays, docks, printers, removable storage, browser extensions, and control over developer access. An organisation using a Googlebook as a shared desk terminal is going to care about different settings to one issuing it to a developer, and both need to be manageable.

I'm explicitly going to also call out wallpaper managmenet - I've been [asking for wallpaper management since 2019](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#wallpaper-management), and more recently working around the gaps with my [wallpaper tools](/blog/2026/09/waking-app-generator-apps-with-amapi-role-support/). Managed desktop and lock-screen images, with policy determining whether users can change them, are tablestakes for a laptop. On a shared device, the right image could follow the user or session just like the rest of their settings.

I'd also like hardware-backed device identity, boot integrity, encryption and current security state available to the EMM and access providers, with policy to keep developer mode or bootloader changes from undermining the organisation's requirements. I've covered [Device Trust](/blog/2025/10/device-trust-android-enterprise/) on Android before; Googlebook should support the same sort of conditional-access workflows, including an honest account of what a repurposed Flex device can attest. On personally owned devices, those signals would need to stay within the appropriate management scope.

## A work profile is mandatory

The work profile is one of Android Enterprise's best features. For Googlebook, I'd consider it a minimum requirement.

Personally owned Googlebooks should be able to enrol a work profile without being wiped. Company-owned devices should offer the [company-owned work profile](/android/android-11-cope-changes/) model too, with the appropriate device controls for the organisation and a personal area for the employee. 

That means the actual separation of applications, data, credentials and management scope, selective removal of work data, and a clear way to [pause work](/android/android-enterprise-faq/work-profile-pausing/). On a laptop I'd expect the desktop to make it obvious which profile an app, browser window or file belongs to. Someone with six overlapping windows and a file picker open needs more to go on than a briefcase on the launcher icon.

If that was too subtle, yes, the work profile experience should expand to full browser and Linux separation too, with all of the appropriate in-profile and cross-profile controls.

I've written about [cross-profile sharing](/android/android-enterprise-faq/cross-profile-data-sharing/) often enough to know how quickly an otherwise good implementation can become a DLP nightmare. Clipboard, drag and drop, screenshots, printing, open-with, shared folders and assistant access all need defined behaviour. The same applies to phone integration, task handoff and file access across devices; pairing with a personal phone shouldn't bypass the laptop's work-data policy. Administrators could allow a workflow where it makes sense, and block it where it doesn't, with the direction of the transfer made explicit.

And yes, since I'm making another wishlist, I'd still like [multiple work profiles](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#multiple-work-profile-support). A consultant working for two customers shouldn't need two laptops to keep their corporate environments separate. I know that's a bigger request. I've been asking for it since 2019.

## Manage the device and the people using it

ChromeOS has been useful for shared computers for years. Retaining that through Android Enterprise, with support for both custom DPC and AMAPI, would save organisations having to rebuild familiar shared-device workflows around the new platform.

I wrote about [multi-user management appearing in Android Device Policy](/notes/102/) earlier this year. The more recent [Android 17 QPR2 builds](/android/android-enterprise-beta-tracker/a17qpr2-beta-5/) show further work around user sessions, login screens and multi-user provisioning. I've been looking at code and policy scaffolding here. I still can't enrol a device into the finished multi-user offering and test it. My [current multi-user FAQ](/android/android-enterprise-faq/add-new-user-fully-managed/) still describes the gap between AMAPI and custom DPC capabilities.

What I'd like is a managed device with its own baseline, then managed users whose policies apply when they sign in. The device baseline can require encryption, a minimum patch level and restrictions on external storage. A finance user can get their applications and data-sharing restrictions; a developer can get an approved Linux environment. Both use the same laptop without the second user's requirements weakening the device baseline.

It would need to be clear which policy wins when a user's requirements conflict with the device's, with explicit scope and precedence. Some device restrictions should be floors the user policy can't relax. Other settings, such as application availability or an approved Linux environment, can vary by role within what the device policy permits. The EMM needs to show the resulting policy and explain which assignment set it. Troubleshooting becomes fairly miserable when every setting is inherited from somewhere and nothing tells you where.

The platform would need to enforce those device, user and session scopes, with the relationships exposed through the relevant management APIs. For AMAPI, today's [policy model](https://developers.google.com/android/management/create-policy) associates a device with one policy at a time, so that may need extending. An EMM using its own DPC would need the platform APIs to apply the same scoped controls, but it's much easier for custom DPC to determine scope locally vs AMAPI today.

For shared deployments, it would be useful to support persistent user sessions where appropriate, ephemeral sessions for shift workers, managed guest sessions, user creation and removal, assignment and unassignment, switching, logout, and restrictions on who can sign in. Applications can be cached to make the next login quick, while the previous person's tokens, downloads and other session data are cleared according to policy. Effectively **everything we've had since Android 9.0 AMAPI still doesn't support**. 

A user leaving an organisation, a device being reassigned and an employee finishing a shift are three different events. Separate commands and policies would make it easier to handle each appropriately, without a factory reset being the answer to all three.

## Let me turn Gemini off

Completely.

Googlebook is being sold around Gemini Intelligence, with Magic Pointer, Rambler and generated widgets among the features in the [launch announcement](https://blog.google/products-and-platforms/devices/googlebook/pre-order-googlebook/). Google says the user can switch Magic Pointer off. I'd like the administrator to be able to disable Gemini across the managed device, covering every system integration as well as the app.

No assistant entry points left in the launcher, no context gathering for an assistant we've disabled, no background agent actions, and no new Gemini surface quietly re-enabled by an OS update. Normal browser, keyboard, file and accessibility functionality should keep working - essentially like a normal Android device does today. 

If an organisation has decided it doesn't want Gemini processing its data, disabling the package and hoping that catches everything is a poor way to honour that decision.

On a personally owned device, that authority belongs within the work profile and its data boundary. The owner can use their own assistant in their personal space. On a company-owned device, I'd like the option to switch it off everywhere.

For organisations that do want AI, it would be good to have a choice of provider: Claude, ChatGPT, Gemini, a self-hosted model, whatever fits their requirements. In a [recent Googlebook video](https://youtu.be/QChxpOUxLDY?t=295), Dieter Bohn points to the Linux terminal as a way to run tools such as Claude CLI. That's welcome, and I'd like that openness to extend across the Android side and the system assistant too.

That means a supported way to configure the assistant integration, its enterprise identity and approved service endpoints, with policy controlling which applications and data it can access. An approved provider should also be able to use the desktop integration points offered to Gemini, within those same management boundaries.

Provider access still needs tight control. Permissions should distinguish reading context from performing actions, allow application-specific access, require approval for sensitive operations where appropriate, and report actions in the relevant managed scope. Credentials should stay in the proper secure stores.

Chrome already has [Gemini integration controls](https://support.google.com/chrome/a/answer/16291696), including separate policies for browser actions. Including those in the overall management model would help ensure disabling Gemini covers the browser as well.

AMAPI already exposes [app-function and cross-profile app-function policies](https://developers.google.com/android/management/reference/rest/v1/enterprises.policies#AppFunctions). Those controls govern a particular interaction mechanism. They don't, on their own, describe a universal Gemini off switch. The complete set of paths would need to be covered, including screen context, browser content, Linux tools and cross-device access.

I [build with AI myself](/blog/2026/04/how-mika-was-built/), so this is hardly an objection to having it available. My preference is for the organisation to decide what it uses, with the management policy enforcing that decision. An organisation may already have paid for an enterprise AI service. It shouldn't need to adopt Google's as well to get the full use of its laptop.

## Linux needs management too

Google's [launch post](https://blog.google/products-and-platforms/devices/googlebook/pre-order-googlebook/) describes an isolated Linux environment with terminal access, and names Claude Code among the tools it can run. I'd use that. An administrator issuing the same machine needs to know what they can manage within it.

At minimum, policy should enable or disable the environment at device and user scope. That includes defining what disablement does to an environment that's already running, its stored data, and any processes using shared resources. ChromeOS already has [controls for Linux VMs, backup and restore, and port forwarding](https://support.google.com/chrome/a/answer/2657289). Those would be a good starting point.

I'd like Linux to follow a familiar cross-profile policy approach, with explicit rules for moving data between a work Linux environment, work Android apps, personal apps and the desktop browser. The VM doesn't have to be a literal Android work profile to achieve that separation.

Shared folders, clipboard, drag and drop, file pickers, USB passthrough, camera and microphone access, host services, local sockets and forwarded ports all need consideration. A VM can be isolated while a deliberately shared directory still gives its applications access to corporate files. An AI coding agent running inside it should inherit the permissions of that environment, including restrictions on exporting data.

I'd like to be able to one day also configure repositories and package sources, inventory installed software, report patch state, and decide whether users can install additional packages or gain root within the guest (which is a different permission from root on the host). Backup, restore, export and deletion need policy too, especially on a shared computer.

There are limits to what a package allowlist achieves if the user can execute arbitrary scripts, download binaries or build them from source. Google should document those limits and provide a supported way to manage the guest, potentially with an agent inside Linux where that's necessary. I'd rather understand the enforcement boundary than discover it while investigating an incident.

And the environment should belong to the correct user or work context. I'd expect logout to end that user's processes and remove ephemeral data according to policy. The next person signing in should get their own environment.

## Applications, web apps, and putting things on the desktop

Android application management should carry across in full: public and private managed Play apps, managed configurations, permissions, installation requirements, update tracks and controls, application roles, and supported [custom APK deployment](/blog/2025/08/amapi-apk-deployment/). An organisation could bring its existing app catalogue with it. Reporting the management client (Android Device Policy or the EMM's own DPC), desktop browser and other required system components alongside that catalogue would be useful too. A generic OS version doesn't tell an administrator which versions of those components are installed.

If a private app only contains ARM binaries and a particular Googlebook can't run it, the administrator needs to know this clearly. Google's [desktop app quality guidance](https://developer.android.com/develop/adaptive-apps/quality-guidelines/adaptive-app-quality/experiences/desktop) gives developers a useful target; compatibility information in the managed catalogue would give administrators something to work with too.

On the web side I'd like browser policy, extension management, bookmarks, managed PWAs and ordinary URL shortcuts, including where they appear on the desktop, launcher and taskbar. A web shortcut should open in the intended desktop browser and work context. An organisation should be able to give its staff a clearly labelled link to a line-of-business application without packaging it as an Android app.

The [Android workaround](/android/android-enterprise-faq/manage-app-shortcuts/) is to deploy a managed Play web app, and I have a [guide for that](/android/create-and-manage-web-apps-for-android-enterprise/). Googlebook gives us a desktop browser with extensions, so I'd like proper desktop web application/extension and shortcut management alongside it. The administrator could set the name, icon, URL and launch behaviour, with policy placing and maintaining it.

Sensible defaults for opening files and links would help, along with approved extension lists, reporting when a required app fails to install or launch, and control over which applications may be removed by the user. On shared devices, the correct catalogue needs to follow the person signing in, with device-required apps retained for everyone who needs them.

## Enrolment seems sorted, but..

[Zero-touch](/android/android-enterprise-provisioning-methods/) is a given. Google has named it in the [enterprise plans](https://support.google.com/chrome/a/answer/16634428) already. A corporate device should arrive, connect, enrol and remain subject to its assigned management after a reset, until an authorised administrator releases it.

I'd also like managed Google account provisioning for named users, including the managed-domain authentication controls organisations use with Android. An existing identity provider could handle authentication where appropriate, with that user's identity kept distinct from the underlying managed Play account used for application delivery.

Shared devices and kiosks need accountless enrolment through QR codes or tokens. [Android already supports these provisioning routes](https://developers.google.com/android/management/provision-device), so a sensible laptop setup flow for them seems a reasonable ask. A keyboard-accessible token entry option is useful when a camera isn't available, and QR enrolment should be easy to reach without knowing a phone-specific tapping ritual.

It would be nice to get a reception kiosk through setup without someone making up a receptionist@example.com identity. Nor should a staging employee's account become the owner of fifty machines they've prepared for other people.

Before a desktop is usable, required policy, certificates and applications should be in place. Control over setup prompts, provisioning-time connectivity and the information shown to users would be useful here. Failed enrolment needs a reason and exportable diagnostic information, which is another of the requests in my [2025 list](/blog/2025/12/12-ae-requests-of-christmas/#8-provisioningtime-logs).

## Updates across the whole device

Dieter also says [at 1:20 in the same video](https://youtu.be/QChxpOUxLDY?t=80) that Google builds the software and ships the updates. That brings the OS update model closer to ChromeOS than the OEM-by-OEM delivery we're used to across Android. With OS updates coming from Google, I'd find unified scheduling and reporting particularly compelling: one source to work with, and fewer separate OEM release plans to account for. I'd still like the update ownership and delivery path for firmware and other hardware-specific components documented.

Google's [23 September Android Enterprise post](https://blog.google/products-and-platforms/products/android-enterprise/whats-new-android-enterprise-2026/) describes **Unified Update Controls (UUC)** for OEM OTAs, Google Play system updates and Google Play system services, with scheduling controls and Feedback API telemetry planned before the end of 2026. I'd like those capabilities on Googlebook as part of its enterprise baseline, available to EMMs using either management route.

Desktop Chrome and Linux packages are outside the scope described in that announcement. It would be great to see the Googlebook management model cover those too, with the scope and behaviour of each update channel documented.

I've been asking for better [app and system update management since 2023](/blog/2022/12/android-features-2023/). On a laptop, I'd like deployment rings, testing groups, maintenance windows, deadlines, business freeze periods and control over restarts. Where an emergency security update can override a freeze, administrators need to know the rule and have it reported when it happens.

Downloads and installation are different tasks; an organisation may want an update cached during the day and installed after the shift ends. A device that misses its window needs a defined catch-up policy. Shared users need restart warnings appropriate to the session, and the EMM needs to know when installation is complete, when a reboot is pending, and what failed.

I'd still welcome [local and offline update sources](/blog/2025/12/12-ae-requests-of-christmas/#2-offline-system-updates). A thousand laptops on a constrained connection shouldn't each have to fetch the same large update over the internet. Signed packages, trusted caches and an approved local source would help a great deal. 

From the EMM, I'd like to see installed and available OS versions, Android security patch level (SPL), Play system components and services, Chrome and WebView, firmware, and the Linux environment and its packages. Include the last successful check and where the information came from, so an old report doesn't look current just because the device remains in the inventory.

Android's [Security State libraries](https://developer.android.com/privacy-and-security/understand-device-security-state) offer a useful foundation for component-level patch information and Available Security Patch Level (ASPL). Provider timeouts and stale results need to remain visible too, so a failed check can't make an out-of-date device appear current. Surfacing that information through management would make it usable in compliance decisions. I'd welcome the same visibility for the other software layers a Googlebook adds.

A laptop whose host OS is patched can still have an outdated browser or Linux environment. I'd like to be able to identify that from the EMM, understand whether an update is available for that model, and see whether the delay sits with Google, a hardware vendor, rollout, policy or device.

## Monthly patches

Google's launch post already advertises feature drops and updates for _up to 10 years_. It would be useful to have the model-level detail behind that: the guaranteed support end date, when the clock starts, the security cadence, which major OS upgrades are included, and whether that commitment covers the firmware and Linux environment shipped with it. An upper limit doesn't tell a buyer the minimum their particular model will receive.

I'd like buyers to have that information before placing an order, with the support commitments also exposed to the EMM and kept current after sale. If a model changes from monthly to quarterly patches towards the end of its life, that needs to be visible, though I'd much prefer it didn't. Urgent fixes may still be necessary between the monthly releases, and the patch level should correspond to the applicable fixes the device has actually received.

I've written before about [update commitments becoming weaker in Android Enterprise Recommended](/blog/2022/01/aer-dropped-the-3-year-update-mandate-with-android-11-where-are-we-now/). I'd be wary of another recommendation scheme where the badge is easier to find than the support terms. Google should validate management and update behaviour across OEMs and major releases, and give the ecosystem a route to flag devices that no longer meet their commitments.

## Googlebook Flex

Mentioned previously but to hone in a little.. ChromeOS Flex gives existing PCs another use. I'd like an Aluminium/Googlebook equivalent, with Android applications and the same management options as new Googlebook hardware wherever the device can meet the requirements.

Google has said some newer Chromebooks will be eligible to migrate. That leaves plenty of perfectly capable laptops outside the proposed upgrade route, as well as the various other hardware organisations can currently repurpose with Flex. A supported hardware list, clear requirements and an installation path for those devices would be welcome.

[ChromeOS Flex differs from ChromeOS](https://support.google.com/chrome/a/answer/11542901) in hardware trust, application support and supported models. Google's [Flex FAQ](https://support.google.com/chromeosflex/answer/11543105) also says installing it on expired ChromeOS devices isn't supported. A Googlebook equivalent would need its own supported route, including older Chromebooks where the hardware is suitable.

If a device can't provide the same hardware-backed trust as a new Googlebook, reporting that difference would help an organisation decide whether it meets its requirements. Clear support limits would help too, including firmware support. Installing a maintained OS can't fix an abandoned firmware vulnerability.

I'm not aware of an announced Googlebook Flex product in the material Google has published so far. I'd very much like to see one.

## The commands and support tools, too

Reboot, lock, wipe, selective work-data removal, disable a device, retire or release it from management, assign or remove a user, end a session, clear local user data, set volume, manage eSIMs, lost mode. I'd like the relevant command capabilities from both platforms to carry over, with their management scopes intact.

ChromeOS already exposes [remote operations](https://developers.google.com/workspace/admin/directory/reference/rest/v1/customer.devices.chromeos.commands) including reboot, kiosk screenshots and volume, remote support, and diagnostic collection. Android has its own, including eSIM and lost-mode operations. Some are limited by device ownership, session type, OS version or user consent. Having the equivalent Googlebook rules documented would help support teams know what they can do.

On cellular models I'd expect [eSIM provisioning and removal](/android/android-enterprise-faq/manage-esim/), inventory and policy for user changes, and explicit behaviour when a device is reassigned, wiped or released from management. [Lost mode](/android/android-enterprise-faq/what-is-lost-mode/) should offer the appropriate lock, return message and recovery workflow for company-owned hardware, with location capability and consent rules documented for the device.

Remote help needs the right privacy boundaries for work profiles and shared sessions. A kiosk screenshot and a remote session with an employee need authorisation and user visibility appropriate to each. Removing a work profile should affect that profile alone.

Bug reports, provisioning logs, network diagnostics, app installation failures, crash information and battery health should all be available through supported APIs in the appropriate managed scope. I've already asked for [remote bug-report fetching through AMAPI](/blog/2025/12/12-ae-requests-of-christmas/#7-remote-bug-report-fetching), something custom DPCs [already support](https://developer.android.com/work/dpc/security#remotely-request) for device owners, subject to consent and affiliated-user restrictions. A laptop launch seems a fairly good opportunity to stop carrying that request forward.

## And a route from what we have today

Existing ChromeOS customers need an eligibility matrix, a policy migration map, app compatibility information, licensing terms and a tested recovery plan. It would help to know whether an upgrade requires a wipe, which data and assignments survive, and which policies need replacing, with a way to pilot it against their own workloads before committing an estate. I'd like the security and lockdown options used in education and assessment environments to carry across too, with any gaps identified before a migration.

Since we're talking about migrations, I'd also welcome a supported path between EMMs without routinely [wiping and reissuing every device](/android/android-enterprise-emm-migration-guide/). It's been on [my Android list](/blog/2025/12/12-ae-requests-of-christmas/#11-frictionless-dpc-migration) for years. A new platform is a good opportunity to make portability part of the design, along with policy and inventory export and useful APIs for automation.

Google says the first management wave starts in H2 2027. I'd like Google to use that time to publish the policy, provisioning, command and licensing detail, provide managed test builds for partners, and get organisations exercising the shared-device, work-profile and kiosk scenarios well before they arrive in production. A broad commitment to management starting in 2027 leaves a lot of purchasing questions unanswered.

I'm looking forward to getting a Googlebook in front of me this month, as I mentioned in the previous post. I'd be considerably more enthusiastic about putting it into an enterprise estate if I could enrol it through an existing EMM, apply the policies I need, and choose whether Gemini is involved. How Google prices the management will influence that enthusiasm too.

That's my starting list. If you're managing Chromebooks today, or you've been waiting for Android to become a more useful desktop platform, [tell me what you'd add](/contact/)!
