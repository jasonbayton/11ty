---
title: "What I want from Googlebook in enterprise"
date: '2026-10-02'
status: publish
author: 'Jason Bayton'
excerpt: "Android Enterprise, work profiles, shared users, proper Linux management, and the ability to turn Gemini off. Here's what I'd like Googlebook to bring to enterprise."
type: post
tags:
  - Enterprise
---

Earlier this week I covered [Google's first proper acknowledgement of Googlebooks in enterprise](/blog/2026/09/googlebooks-meet-enterprise/), the wait until the second half of 2027 for the first management capabilities, and the licensing questions Google has left open. I also made my preference for Android Enterprise management fairly clear.

I'd like Googlebook to support Android Enterprise management through either an EMM's own device policy controller (custom DPC) or Android Management API (AMAPI), without a separate licence to unlock device management. With the capabilities ChromeOS does well and a proper work profile alongside it, the EMM ecosystem could get on with supporting it.

I've been writing variations on these wishlists since [2019](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/), followed by [2023](/blog/2022/12/android-features-2023/) and [last Christmas](/blog/2025/12/12-ae-requests-of-christmas/). Several requests are still on the [list](/android/android-enterprise-feature-requests/), and apparently it hasn't put me off asking again.. this time for a laptop.

For timing, Google's [21 September launch post](https://blog.google/products-and-platforms/devices/googlebook/pre-order-googlebook/) puts devices on shelves from 4 October in the US and 5 October here in the UK and several other markets, following pre-orders. The [enterprise guidance](https://support.google.com/chrome/a/answer/16634428), last updated on 23 September, still describes a consumer launch, managed Workspace account sign-in and optional Chrome browser management today, with central device management coming in phases from H2 2027. Signing in with a work account doesn't make a Googlebook a managed corporate device.

With that enterprise offering still some way off, there's plenty I'd like to see included. Some of the underlying Android capabilities exist already, some are showing up in the builds I've been tracking, and some would need entirely new work. Google hasn't committed to this list, and I haven't tested a managed Googlebook yet.

## Android management, please

Google is bringing Android and ChromeOS together under Googlebook OS, the product we've been following as Aluminium. I'd like it to bring the management together too.

An organisation already managing Android phones, tablets and [XR](/blog/2026/04/android-enterprise-lands-on-android-xr/) through an EMM supporting Android should be able to add Googlebooks to the same environment. The policies, application catalogue, reporting and command workflows should extend to the laptop. The EMM can decide how to present the laptop-specific bits, as it does for other device types.

Google has said third-party EMM APIs are coming, but hasn't yet explained how those fit with Android Enterprise. I'd like partners to be able to support Googlebook through their existing custom DPC or AMAPI integration. That would let them extend the inventory, policy and application management they already have working for Android.

ChromeOS's device and user policies, shared sessions, desktop browser configuration and support operations all need a home in Android Enterprise. I'd like those laptop capabilities accessible through both management routes, so an EMM can support the whole machine using its existing approach. I've written plenty about [gaps between AMAPI and custom DPC management](/blog/2025/12/12-ae-requests-of-christmas/), and it would be good to see that work close some of them. Existing Android customers would benefit too.

The licensing is the part I'd most like Google to consider. Its guidance already says a new structure will apply to Googlebooks and eligible Chromebooks that migrate. Device management (read: everything that exists, or is equivalent to what exists in Android today) could be included with the platform, as we expect it to be for Android. Organisations will still pay their EMM provider, and Google can offer paid support or additional services if it wants to.

If Google needs another revenue source here, I'd much prefer it in the Chrome browser management product. [Chrome Enterprise Core and Premium](https://chromeenterprise.google/products/chrome-enterprise-core/) already give it a product family to work with (Core is currently available at no additional cost). There is room to sell additional browser security capabilities without charging an organisation for the privilege of enforcing a password on a laptop it owns.

It would help to keep the identity requirements sensible too. A [managed Google domain](/android/upgrading-android-enterprise-to-managed-google-domain/) has useful capabilities, and Cloud Identity can provide that directory without an organisation buying Workspace for its email. Organisations using Microsoft 365 or another identity provider should have a straightforward supported route. A shared reception terminal shouldn't need a named Workspace user simply to enrol and run its applications.

## Bring the policies with it

Support for existing Android Enterprise controls is my starting point, wherever the hardware and management mode make them applicable. That includes full existing AMAPI policy support for AMAPI deployments, and the relevant platform management APIs for an EMM using its own DPC. A laptop without a modem obviously isn't going to need cellular policy. A personally owned laptop with a work profile shouldn't suddenly give an administrator access to the owner's entire device, either.

Beyond those ordinary scope differences, I'd like to take an existing Android policy and have its applicable controls work: authentication, certificates, Wi-Fi, VPN, permissions, application restrictions, USB, camera and microphone, screen capture, updates, compliance enforcement, logging, the lot. If a policy can't be enforced, the administrator needs to know which one and why. AMAPI's existing [non-compliance reporting](https://developers.google.com/android/management/reference/rest/v1/enterprises.devices#NonComplianceDetail) is one useful example. Clear reporting of unsupported or unenforced controls would help whichever management route the EMM uses.

There are laptop-specific settings to account for too. Login-screen restrictions, allowed users, lid-close and idle behaviour, external displays, docks, printers, removable storage, browser extensions, and control over developer access. An organisation using a Googlebook as a shared desk terminal is going to care about different settings to one issuing it to a developer, and both need to be manageable.

Published coverage by OS version, model, management mode and management route would help, and I'd like the same capabilities available through supported EMM APIs as through Google's own console. I've already written about a customer hitting the [Private DNS gap after moving from a custom DPC solution](/blog/2025/12/12-ae-requests-of-christmas/#6-private-dns-via-policy). That was one policy affecting a real deployment. An organisation adopting Googlebook could otherwise spend the next few years finding similar gaps in policies it used on ChromeOS.

I'd also like hardware-backed device identity, boot integrity, encryption and current security state available to the EMM and access providers, with policy to keep developer mode or bootloader changes from undermining the organisation's requirements. I've covered [Device Trust](/blog/2025/10/device-trust-android-enterprise/) on Android before; Googlebook should support the same sort of conditional-access workflows, including an honest account of what a repurposed Flex device can attest. On personally owned devices, those signals would need to stay within the appropriate management scope.

## A work profile is mandatory

The work profile is one of Android Enterprise's best features. It would be great to have it on Googlebook.

Personally owned Googlebooks should be able to enrol a work profile without being wiped. Company-owned devices should offer the [company-owned work profile](/android/android-11-cope-changes/) model too, with the appropriate device controls for the organisation and a personal area for the employee. Fully managed should remain an option for organisations that need it.

That means the actual separation of applications, data, credentials and management scope, selective removal of work data, and a clear way to [pause work](/android/android-enterprise-faq/work-profile-pausing/). On a laptop I'd expect the desktop to make it obvious which profile an app, browser window or file belongs to. Someone with six overlapping windows and a file picker open needs more to go on than a briefcase on the launcher icon.

If that was too subtle, yes, the work profile experience should expand to full browser and Linux separation too.

The desktop browser needs to participate to make this coherent. Work downloads, cookies, extensions, stored credentials, browsing data and file access should follow the work context. Rules that can identify both the application and the web origin would be useful when controlling data movement, including clipboard, printing and file transfers. A second Chrome profile has its uses. The OS still needs to isolate work applications and data from the personal side.

I've written about [cross-profile sharing](/android/android-enterprise-faq/cross-profile-data-sharing/) often enough to know how quickly an otherwise good implementation can become confusing. Clipboard, drag and drop, screenshots, printing, open-with, shared folders and assistant access all need defined behaviour. The same applies to phone integration, task handoff and file access across devices; pairing with a personal phone shouldn't bypass the laptop's work-data policy. Administrators could allow a workflow where it makes sense, and block it where it doesn't, with the direction of the transfer made explicit.

And yes, since I'm making another wishlist, I'd still like [multiple work profiles](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#multiple-work-profile-support). A consultant working for two customers shouldn't need two laptops to keep their corporate environments separate. I know that's a bigger request. I've been asking for it for half a decade now.

## Manage the device and the people using it

ChromeOS has been useful for shared computers for years. I'd like Googlebook to retain that, with shared-device management available to EMMs using either custom DPC or AMAPI.

I wrote about [multi-user management appearing in Android Device Policy](/notes/102/) earlier this year. The more recent [Android 17 QPR2 builds](/android/android-enterprise-beta-tracker/a17qpr2-beta-5/) show further work around user sessions, login screens and multi-user provisioning. I've been looking at code and policy scaffolding here. I still can't enrol a device into the finished multi-user offering and test it. My [current multi-user FAQ](/android/android-enterprise-faq/add-new-user-fully-managed/) still describes the gap between AMAPI and custom DPC capabilities.

What I'd like is a managed device with its own baseline, then managed users whose policies apply when they sign in. The device baseline can require encryption, a minimum patch level and restrictions on external storage. A finance user can get their applications and data-sharing restrictions; a developer can get an approved Linux environment. Both use the same laptop without the second user's requirements weakening the device baseline.

It would need to be clear which policy wins when a user's requirements conflict with the device's, with explicit scope and precedence. Some device restrictions should be floors the user policy can't relax. Other settings, such as application availability or an approved Linux environment, can vary by role within what the device policy permits. The EMM needs to show the resulting policy and explain which assignment set it. Troubleshooting becomes fairly miserable when every setting is inherited from somewhere and nothing tells you where.

The platform would need to enforce those device, user and session scopes, with the relationships exposed through the relevant management APIs. For AMAPI, today's [policy model](https://developers.google.com/android/management/create-policy) associates a device with one policy at a time, so that would need extending. An EMM using its own DPC would need the platform APIs to apply the same scoped controls. An EMM can compose policy on the server, but the device still needs to enforce the correct scope when a different person signs in or it is offline.

For shared deployments, it would be useful to support persistent user sessions where appropriate, ephemeral sessions for shift workers, managed guest sessions, user creation and removal, assignment and unassignment, switching, logout, and restrictions on who can sign in. Applications can be cached to make the next login quick, while the previous person's tokens, downloads and other session data are cleared according to policy. Clearing the visible desktop alone doesn't achieve that.

There needs to be a usable offline story too - which users may sign in from cached credentials, for how long, and what happens when an account is disabled or a device goes too long without checking in. I'd like federation, MFA and security-key support in the appropriate login flows, with documented behaviour when the identity provider can't be reached.

A user leaving an organisation, a device being reassigned and an employee finishing a shift are three different events. Separate commands and policies would make it easier to handle each appropriately, without a factory reset being the answer to all three.

## Let me turn Gemini off

Completely.

Googlebook is being sold around Gemini Intelligence, with Magic Pointer, Rambler and generated widgets among the features in the [launch announcement](https://blog.google/products-and-platforms/devices/googlebook/pre-order-googlebook/). Google says the user can switch Magic Pointer off. I'd like the administrator to be able to disable Gemini across the managed device, covering every system integration as well as the app.

No assistant entry points left in the launcher, no context gathering for an assistant we've disabled, no background agent actions, and no new Gemini surface quietly re-enabled by an OS update. Normal browser, keyboard, file and accessibility functionality should keep working. If an organisation has decided it doesn't want Gemini processing its data, disabling the package and hoping that catches everything is a poor way to honour that decision.

On a personally owned device, that authority belongs within the work profile and its data boundary. The owner can use their own assistant in their personal space. On a fully managed company device, I'd like the option to switch it off everywhere.

For organisations that do want AI, it would be good to have a choice of provider. Claude, ChatGPT, Gemini, a self-hosted model, whatever fits their requirements. I'd like a supported way to configure the system assistant integration, its enterprise identity and approved service endpoints, with policy controlling which applications and data it can access. Installing a competing chatbot is useful; giving an approved provider access to the same desktop integration points would be better.

Provider access still needs tight control. Permissions should distinguish reading context from performing actions, allow application-specific access, require approval for sensitive operations where appropriate, and report actions in the relevant managed scope. Credentials should stay in the proper secure stores.

Chrome already has [Gemini integration controls](https://support.google.com/chrome/a/answer/16291696), including separate policies for browser actions. Including those in the overall management model would help ensure disabling Gemini covers the browser as well.

AMAPI already exposes [app-function and cross-profile app-function policies](https://developers.google.com/android/management/reference/rest/v1/enterprises.policies#AppFunctions). Those controls govern a particular interaction mechanism. They don't, on their own, describe a universal Gemini off switch. The complete set of paths would need to be covered, including screen context, browser content, Linux tools and cross-device access.

I [build with AI myself](/blog/2026/04/how-mika-was-built/), so this is hardly an objection to having it available. My preference is for the organisation to decide what it uses, with the management policy enforcing that decision. An organisation may already have paid for an enterprise AI service. It shouldn't need to adopt Google's as well to get the full use of its laptop.

## Linux needs management too

Google's [launch post](https://blog.google/products-and-platforms/devices/googlebook/pre-order-googlebook/) describes an isolated Linux environment with terminal access, and names Claude Code among the tools it can run. I'd use that. It would be useful to know what an administrator can do with it too.

At minimum, policy should enable or disable the environment at device and user scope. That includes defining what disablement does to an environment that's already running, its stored data, and any processes using shared resources. ChromeOS already has [controls for Linux VMs, backup and restore, and port forwarding](https://support.google.com/chrome/a/answer/2657289). Those would be a good starting point.

I'd like Linux to follow a familiar cross-profile policy approach. I'm describing the management behaviour, without assuming the VM is literally an Android work profile. A Linux environment associated with work should have explicit rules for moving data to and from work Android apps, personal apps and the desktop browser.

Shared folders, clipboard, drag and drop, file pickers, USB passthrough, camera and microphone access, host services, local sockets and forwarded ports all need consideration. A VM can be isolated while a deliberately shared directory still gives its applications access to corporate files. An AI coding agent running inside it should inherit the permissions of that environment, including restrictions on exporting data.

I'd like to be able to deploy an approved base image, set resource limits, configure repositories and package sources, inventory installed software, report patch state, and decide whether users can install additional packages or gain root within the guest (which is a different permission from root on the host). Backup, restore, export and deletion need policy too, especially on a shared computer.

There are limits to what a package allowlist achieves if the user can execute arbitrary scripts, download binaries or build them from source. Google should document those limits and provide a supported way to manage the guest, potentially with an agent inside Linux where that's necessary. I'd rather understand the enforcement boundary than discover it while investigating an incident.

And the environment should belong to the correct user or work context. I'd expect logout to end that user's processes and remove ephemeral data according to policy. The next person signing in should get their own environment.

## Applications, web apps, and putting things on the desktop

Android application management should carry across in full: public and private managed Play apps, managed configurations, permissions, installation requirements, update tracks and controls, application roles, and supported [custom APK deployment](/blog/2025/08/amapi-apk-deployment/). An organisation could bring its existing app catalogue with it. Reporting the management client (Android Device Policy or the EMM's own DPC), desktop browser and other required system components alongside that catalogue would be useful too. A generic OS version doesn't tell an administrator which versions of those components are installed.

Compatibility needs to be visible. If a private app only contains ARM binaries and a particular Googlebook can't run it, the administrator needs to know before handing it to a user. The same applies to applications that technically install but can't cope with a keyboard, window resizing or a large display. Google's [desktop app quality guidance](https://developer.android.com/develop/adaptive-apps/quality-guidelines/adaptive-app-quality/experiences/desktop) gives developers a useful target. Relevant compatibility information in the managed catalogue would help administrators too.

On the web side I'd like browser policy, extension management, bookmarks, managed PWAs and ordinary URL shortcuts, including where they appear on the desktop, launcher and taskbar. A web shortcut should open in the intended desktop browser and work context. An organisation should be able to give its staff a clearly labelled link to a line-of-business application without packaging it as an Android app.

The [Android workaround](/android/android-enterprise-faq/manage-app-shortcuts/) is to deploy a managed Play web app, and I have a [guide for that](/android/create-and-manage-web-apps-for-android-enterprise/). Googlebook gives us a desktop browser with extensions, so I'd like proper desktop web application and shortcut management alongside it. The administrator could set the name, icon, URL and launch behaviour, with policy placing and maintaining it.

Sensible defaults for opening files and links would help, along with approved extension lists, reporting when a required app fails to install or launch, and control over which applications may be removed by the user. On shared devices, the correct catalogue needs to follow the person signing in, with device-required apps retained for everyone who needs them.

## Enrolment for the way the device will be used

[Zero-touch](/android/android-enterprise-provisioning-methods/) is a given. Google has named it in the [enterprise plans](https://support.google.com/chrome/a/answer/16634428) already. A corporate device should arrive, connect, enrol and remain subject to its assigned management after a reset, until an authorised administrator releases it.

I'd also like managed Google account provisioning for named users, including the managed-domain authentication controls organisations use with Android. An existing identity provider could handle authentication where appropriate, with that user's identity kept distinct from the underlying managed Play account used for application delivery.

Shared devices and kiosks need accountless enrolment through QR codes or tokens. [Android already supports these provisioning routes](https://developers.google.com/android/management/provision-device), so a sensible laptop setup flow for them seems a reasonable ask. A keyboard-accessible token entry option is useful when a camera isn't available, and QR enrolment should be easy to reach without knowing a phone-specific tapping ritual.

It would be nice to get a reception kiosk through setup without someone making up a receptionist@example.com identity. Nor should a staging employee's account become the owner of fifty machines they've prepared for other people.

Before a desktop is usable, required policy, certificates and applications should be in place. Control over setup prompts, provisioning-time connectivity and the information shown to users would be useful here. Failed enrolment needs a reason and exportable diagnostic information, which is another of the requests in my [2025 list](/blog/2025/12/12-ae-requests-of-christmas/#8-provisioningtime-logs).

For kiosk use I'd like Android app, web app and multi-app options, autolaunch, recovery after a crash, offline behaviour, scheduled reboots and a managed route into support. Keyboard shortcuts, external monitors, file pickers and system dialogs all need testing for escape paths. A kiosk on a laptop has rather more input options than a tablet bolted to a wall.

## Updates across the whole device

Google's [23 September Android Enterprise post](https://blog.google/products-and-platforms/products/android-enterprise/whats-new-android-enterprise-2026/) describes **Unified Update Controls (UUC)** for OEM OTAs, Google Play system updates and Google Play system services, with scheduling controls and Feedback API telemetry planned before the end of 2026. I'd like those capabilities on Googlebook as part of its enterprise baseline, available to EMMs using either management route.

Managed Play apps, desktop Chrome and Linux packages are outside the scope described in that announcement. It would be great to see the Googlebook management model cover those too, with the scope and behaviour of each update channel documented.

I've been asking for better [app and system update management since 2023](/blog/2022/12/android-features-2023/). On a laptop, I'd like deployment rings, testing groups, maintenance windows, deadlines, business freeze periods and control over restarts. Where an emergency security update can override a freeze, administrators need to know the rule and have it reported when it happens.

Downloads and installation are different operations. An organisation may want an update cached during the day and installed after the shift ends. A device that misses its window needs a defined catch-up policy. Shared users need restart warnings appropriate to the session, and the EMM needs to know when installation is complete, when a reboot is pending, and what failed.

Existing [managed Play update modes](https://developers.google.com/android/management/control-app-updates) have their own constraints and caveats. A minimum app version isn't a pin to that version, and a high-priority update can close an application that's being used. I'd like more precise control for critical line-of-business apps, with staged deployment and a supported recovery path when a release breaks a workflow. Rollback should be available where the application or update mechanism safely supports it, with its limitations explicit.

I'd still welcome [local and offline update sources](/blog/2025/12/12-ae-requests-of-christmas/#2-offline-system-updates). A thousand laptops on a constrained connection shouldn't each have to fetch the same large update over the internet. Signed packages, trusted caches and an approved local source would help a great deal.

A view of software freshness across the entire thing would be useful: installed and available OS versions, Android security patch level (SPL), Play system components and services, Chrome and WebView, managed Android apps, firmware, and the Linux environment and its packages. The last successful check and the source of that information belong in the report too. An old report shouldn't look current just because the device remains in the inventory.

Android's [Security State libraries](https://developer.android.com/privacy-and-security/understand-device-security-state) offer a useful foundation for component-level patch information and Available Security Patch Level (ASPL). Provider timeouts and stale results need to remain visible too, so a failed check can't make an out-of-date device appear current. Surfacing that information through management would make it usable in compliance decisions. I'd welcome the same visibility for the other software layers a Googlebook adds.

A laptop whose host OS is patched can still have an outdated browser or Linux environment. I'd like to be able to identify that from the EMM, understand whether an update is actually available for that model, and see whether the delay sits with the OEM, rollout, policy or device.

## Monthly patches, seven years at least

My minimum is seven years of security support, monthly SPLs throughout that period, and upgrades to the major Aluminium/Googlebook OS releases introduced during that support window. I'd prefer longer. I'd expect an organisation to be able to use these through more than one refresh cycle.

Google's launch post already advertises feature drops and updates for _up to 10 years_. It would be useful to have the model-level detail behind that: the guaranteed support end date, when the clock starts, the security cadence, which major OS upgrades are included, and whether that commitment covers the firmware and Linux environment shipped with it. An upper limit doesn't tell a buyer the minimum their particular model will receive.

I'd like that information available before an organisation orders devices, exposed to the EMM and maintained after sale. If a model changes from monthly to quarterly patches towards the end of its life, that needs to be visible, though I'd much prefer it didn't. Urgent fixes may still be necessary between the monthly releases, and the patch level should correspond to the applicable fixes the device has actually received.

I've written before about [update commitments becoming weaker in Android Enterprise Recommended](/blog/2022/01/aer-dropped-the-3-year-update-mandate-with-android-11-where-are-we-now/). I'd be wary of another recommendation scheme where the badge is easier to find than the support terms. Google should validate management and update behaviour across OEMs and major releases, and give the ecosystem a route to flag devices that no longer meet their commitments.

## Googlebook Flex

ChromeOS Flex gives existing PCs another use. I'd like an Aluminium/Googlebook equivalent, with Android applications and the same management options as new Googlebook hardware wherever the device can meet the requirements.

Google has said some newer Chromebooks will be eligible to migrate. That leaves plenty of perfectly capable laptops outside the proposed upgrade route, as well as the Windows and Mac hardware organisations can currently repurpose with Flex. A supported hardware list, clear requirements and an installation path for those devices would be welcome.

There are real constraints. [ChromeOS Flex differs from ChromeOS](https://support.google.com/chrome/a/answer/11542901) in hardware trust, application support and supported models. Google's [Flex FAQ](https://support.google.com/chromeosflex/answer/11543105) also says installing it on expired ChromeOS devices isn't supported. I'd like Googlebook Flex to provide its own supported route, including older Chromebooks where the hardware is suitable.

If a device can't provide the same hardware-backed trust as a new Googlebook, reporting that difference would help an organisation decide whether it meets its requirements. Clear support limits would help too, including firmware support. Installing a maintained OS can't fix an abandoned firmware vulnerability.

A repeatable deployment process would be useful, along with management enrolment suitable for repurposed devices, predictable recovery, and a way to test compatibility before wiping an existing installation. Zero-touch may require different onboarding for reused hardware; a supported QR/token route would still let an organisation manage it.

I'm not aware of an announced Googlebook Flex product in the material Google has published so far. I'd very much like to see one.

## The commands and support tools, too

Reboot, lock, wipe, selective work-data removal, disable a device, retire or release it from management, assign or remove a user, end a session, clear local user data, set volume, manage eSIMs, lost mode. I'd like the relevant command capabilities from both platforms to carry over, with their management scopes intact.

ChromeOS already exposes [remote operations](https://developers.google.com/workspace/admin/directory/reference/rest/v1/customer.devices.chromeos.commands) including reboot, kiosk screenshots and volume, remote support, and diagnostic collection. AMAPI has [its own command API](https://developers.google.com/android/management/reference/rest/v1/enterprises.devices/issueCommand), including eSIM and lost-mode operations. Some are limited by device ownership, session type, OS version or user consent. Having the equivalent Googlebook rules documented would help support teams know what they can do.

On cellular models I'd expect [eSIM provisioning and removal](/android/android-enterprise-faq/manage-esim/), inventory and policy for user changes, and explicit behaviour when a device is reassigned, wiped or released from management. Lost mode should offer the appropriate lock, return message and recovery workflow for company-owned hardware, with location capability and consent rules documented for the device.

Remote help needs the right privacy boundaries for work profiles and shared sessions. A kiosk screenshot and a remote session with an employee need authorisation and user visibility appropriate to each. Removing a work profile should affect that profile alone.

It would also help to see what happened to a command: accepted, delivered, executed, failed, expired. I'd like the actual reason where possible, with a supported retry and cancellation model where applicable, and a way to pull fresh device state to see whether it actually rebooted.

Bug reports, provisioning logs, network diagnostics, app installation failures, crash information and battery health should all be available through supported APIs in the appropriate managed scope. I've already asked for [remote bug-report fetching](/blog/2025/12/12-ae-requests-of-christmas/#7-remote-bug-report-fetching) on Android. A laptop launch seems a fairly good opportunity to stop carrying that request forward.

## And a route from what we have today

Existing ChromeOS customers need an eligibility matrix, a policy migration map, app compatibility information, licensing terms and a tested recovery plan. It would help to know whether an upgrade requires a wipe, which data and assignments survive, and which policies need replacing, with a way to pilot it against their own workloads before committing an estate. I'd like the security and lockdown options used in education and assessment environments to carry across too, with any gaps identified before a migration.

I'd also welcome a supported path between EMMs without routinely wiping and reissuing every device. It's been on [my Android list](/blog/2025/12/12-ae-requests-of-christmas/#11-frictionless-dpc-migration) for years. A new platform is a good opportunity to make portability part of the design, along with policy and inventory export and useful APIs for automation.

Google says the first management wave starts in H2 2027. I'd like Google to use that time to publish the policy, provisioning, command and licensing detail, provide managed test builds for partners, and get organisations exercising the shared-device, work-profile and kiosk scenarios well before they arrive in production. A broad commitment to management starting in 2027 leaves a lot of purchasing questions unanswered.

I'm looking forward to getting a Googlebook in front of me this month, as I mentioned in the previous post. I'd be considerably more enthusiastic about putting it into an enterprise estate if I could enrol it through an existing EMM, apply the policies I need, and choose whether Gemini is involved. How Google prices the management will influence that enthusiasm too.

That's my starting list. If you're managing Chromebooks today, or you've been waiting for Android to become a more useful desktop platform, [tell me what you'd add](/contact/).
