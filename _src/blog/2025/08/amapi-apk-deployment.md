---
 title: "AMAPI finally supports direct APK installation, this is how it works"
 date: '2025-09-01'
 status: publish
 author: 'Jason Bayton'
 excerpt: "The ecosystem has waited years for this feature while Custom DPC vendors have held the upper hand, explore how the playing field has levelled"
 type: post
 tags:
     - Enterprise
---

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">This is a work in progress</div>

The content below is very much a stream of consciousness in some places, and will be iterated on through the week. If something doesn't make sense, either reach out or come back later once I've had the time to fully compose my thoughts and results!

</div>

With the release of [AMAPI SDK 1.6.0-rc01](https://developers.google.com/android/management/sdk-release-notes), Google has introduced long-awaited support for direct APK installation via the Android Management API (AMAPI). This new capability allows EMM solutions leveraging Google's Android Device Policy (ADP) to install and update apps on managed devices without relying on Google Play or other third-party mechanisms.

Up to now, direct APK deployment was only possible through custom DPCs*, giving more mature EMM vendors graced with the permission to use them a significant advantage in scenarios where Play distribution was impractical or unavailable. Now, with native package manager support in AMAPI, organisations can streamline app delivery, enforce version control, and maintain security standards - all within the AMAPI framework.

*Historically, sideloading APKs or using third-party installers requiring enabling "allow unknown sources" - a process that demanded direct device interaction from IT admins - was also possible. Some OEMs provided proprietary enterprise sideloading solutions as well, but these varied widely and forced organisations to research and adapt to each vendor's approach. With AMAPI's universal support for direct APK deployment, these fragmented workflows are unified: admins no longer need to manually configure devices or investigate OEM-specific options, and the heavy lifting and risk associated with traditional sideloading are eliminated, streamlining app management across all supported Android Enterprise devices.

This update marks a major shift in how private apps (as in, _truly private_ apps) are managed on Android Enterprise devices, levelling the playing field for AMAPI EMM vendors and simplifying workflows for IT admins. The following article details how this new feature works in practice (or, rather, how I chose to implement it) and how you can leverage it for robust, reliable app deployment.

<div class="callout">
<div class="callout-heading callout-heading-small">APK installation and developer verification requirements</div>

The timing of this feature is uncanny as we have recently equally grappled with the notion of all applications from next year requiring developer verification. 

I've penned a whole article [here](/blog/2025/08/google-play-developer-verification/), but in a nutshell.. DPC-installed applications are exempt!

</div>

## Setting the environment

APK deployment is enabled through the AMAPI SDK, a library Android applications can import in order to communicate with Android Device Policy locally on-device, and benefits from support for commands, some administrative delegation (managed config management!), and so forth. 

Anyone building an AMAPI EMM likely already has the SDK integrated, but that hasn't been a requirement for my applications so far - at least while my approval to integrate Device Trust remains pending with Google currently.

So, first and foremost, we need to ensure [the SDK is integrated](https://developers.google.com/android/management/extensibility-sdk-integration). If you're considering supporting the SDK, be aware the min SDK is API level 23 - or Android Marshmallow - as of 1.6.0-rc01. My applications currently support down to Android 7.0, so that's no stress to me today, but it's a consideration when relying on _any_ external SDK or library.. you lose the ability to single-handedly define the Android versions you target. _Obviously typically I'd speak to the benefits of modern Android and maintaining an up-to-date device estate, but in the context of building a solution for the wider market, backwards-compatibility is a necessity_.

Also be aware the library isn't tiny. It added a bump in size to the app download; this could likely be improved through build optimisations, but not something I've looked into yet.

## Defining the strategy

Given the time it's taken to land in AMAPI, I very much assumed it'd be a highly-engineered, rather rigid implementation basically entirely handled through Android Device Policy; giving EMM vendors a strict schema to follow to push APKs to it. Essentially I expected it to be a command, like eSIM, like wipe, like relinquish ownership, so on.

I assumed extremely incorrectly.

On the contrary, from my understanding and interactions with it so far, the SDK offers a couple of commands the EMM companion app can fire to install & uninstall an APK delivered through the companion itself.

How does the APK get to the device? Your problem.  
How does it handle retries, network issues, compatibility issues, data usage.. etc., etc., etc.? Again.. all you. 

In fact, working through building a proof of concept almost the entirety of the weekend, this has been the biggest challenge:

- Uploading and storing APKs somewhere accessible
- Delivering APKs to the device (my app)
- Defining a caching strategy
- Handling the logic, marred by directly-lived nightmares of yester-decade when old Device Admin deployments were causing £1000's in data charges due to extremely poor handling of constantly pulling APKs down to devices not compatible with the package being installed.
- Ensuring the APK is valid, complete, and matches what has been uploaded when it's downloaded to the companion app.
- Handling local issues, such as compatibility

.. and more. You get the picture here. Google, from my understanding of the documentation and experience this weekend, leaves _everything_ to the EMM vendor to figure out, including how to even know the policy has been updated with new `CUSTOM` applications to trigger the companion into life.

That's bittersweet. I'd expect most vendors - particularly those that have been around for a while - will have their own implementation of package deliveries used for other platforms, other scenarios, etc. In that case this feature can simply _plug and play_. On the other hand, for the newer platforms embracing AMAPI in the last few years, it's a big shift to need to build this on the back of a service that does most-everything else directly. 

Thankfully, the actual main event of installing APKs is documented, includes samples, and isn't complex. There's a useful guide [here](https://developers.google.com/android/management/manage-custom-apps).

## Planning the approach

I used [MANAGED INFO](/projects/splash/mi/) as my base. Given I need to support the SDK here for Device Trust #soon, this was the nudge to just get it sorted. 

Pulling in the SDK was simple, and I used the guide above to get the basics in place.

From there, I opted for a simplistic managed configuration approach for the proof of concept; I don't have a big, robust EMM solution to automate all the desired `if/then` logic, nor do I support FCM in MANAGED INFO (because it hasn't been necessary up to now), so a fully-manual approach that could be quite easily scripted for automation later appealed to me. Right now, that means defining the application policy with the custom install type, and then following up with a MANAGED INFO managed configuration entry with the details of the package to be installed (because MI is never aware of the AMAPI policy).

For the proof of concept, I host packages such that they are accessible to MANAGED INFO. In my case that was in my CDN, though I've ensured JWT support for minimal auth, and it should support things like AWS' timed URLs as well without modification. An API definition could be implemented later.

Since MANAGED INFO already supports managed config, it was quite easy to hook a unique worker into the startup / receiver flow that allows a ViewModel (this handles the "business" logic of an app) to check for the presence of packages in the managed configuration payload, and initiate the worker any time the application starts, or the managed configuration changes. I opted to also run it on a schedule, checking for any changes that may have been missed in an MC update due to any unforeseen OEM battery/memory optimisation quirks (this is an edge-case, but one never knows).

I also opted to build an index in datastore for packages defined in managed configuration. While not entirely necessary for installation, this allowed for the tracking of existing apps when the managed config changed, allowing me in turn to handle uninstall events, as if the package is removed from managed config, it can be assumed it's no longer intended for installation. I plan to add another option later to retain packages removed from managed config, but under normal circumstances they would only remain on the device if the policy retains them, or when removed from policy if Google Play is set to Blocklist rather than the default of Allowlist. Things start to get a bit complex when overthinking the options here; for now if it's in config install, if removed, uninstall.

I want a simple UI that offers a status screen for custom applications. This is a preference, not a mandate. First-runs with the APIs had everything working in the background with no UI and it was fine, but I like a nice UI.

Of course all of this requires MANAGED INFO to be launched at least once in order for the managed config to be read, the workers to be scheduled, etc. It's likely to already be the case if you were leveraging MANAGED INFO as a support application or kiosk before this functionality landed, but I wanted to guarantee MI is launched during enrolment to ensure this covers all use cases. 

I leaned into AMAPI's companion policies, specifically [`SetupActions`](https://developers.google.com/android/management/reference/rest/v1/enterprises.policies#SetupAction), and then combined this with [`ExtensionConfig`](https://developers.google.com/android/management/reference/rest/v1/enterprises.policies#ExtensionConfig) (as the latter is required for the SDK features to function, and prevents user/OS interference of the app running). This alone won't work for devices already in-life, but it's fine for this exercise.

Here's the enrolment splash screen, which automatically closes at the moment as there are no other requirements beyond opening:

<img src="https://cdn.bayton.org/uploads/2025/setupactions_managedinfo.png" width="300px" />

### Managed configuration definition

The managed configuration consists of 5 keys:

- `packagemanager_package_name`
- `packagemanager_package_versioncode`
- `packagemanager_download_url`
- `packagemanager_package_admin_sha`
- `packagemanager_package_hash`

**Package name** is clear. Without that things would be difficult to manage.  
**Version code** is used for update management. Every time the worker runs, it will validate the version code of the application installed, compare it with the APK, and if the APK is newer, it'll push an update. It is also used to validate the APK cached is most-recent, and re-downloads the file if not. This is a backup for when file hashes aren't defined.  
**Download URL** is again clear. Remote location from which to fetch the file.  
**Package Admin SHA** is a base 64 validation of the admin certificate SHA256. It is used to validate the downloaded package matches expectations. AMAPI also validates this before installing the APK with the same input used in the AMAPI policy.  
**Package hash** same as above, if this is configured, MANAGED INFO will validate the hash of the file matches that provided in the managed configuration. It'll do this on download, before passing to AMAPI, and before downloading a new copy of the package from the remote source to avoid data use.

### The AMAPI policy

Here's a snippet of the full AMAPI policy I'm testing with:

```json
{
    "applications": [
        {
            "packageName": "org.bayton.managedinfo.dev",
            "installType": "REQUIRED_FOR_SETUP",
            "managedConfiguration": {
                "packagemanager_install_applications": [
                    {
                        "packagemanager_application_settings": {
                            "packagemanager_download_url": "https://cdn.bayton.org/download/buttonManager.apk",
                            "packagemanager_package_name": "org.bayton.ffswitchlauncher",
                            "packagemanager_package_admin_sha": "Gsk-H2KnwZs9BeKS8a2hCdpFGhQeFXAn1DLDhE7UfKw=",
                            "packagemanager_package_hash": "",
                            "packagemanager_package_versioncode": "1"
                        }
                    },
                    {
                        "packagemanager_application_settings": {
                            "packagemanager_download_url": "https://cdn.bayton.org/download/kissLauncher.apk",
                            "packagemanager_package_name": "fr.neamar.kiss"
                        }
                    }
                ]
            },
            "extensionConfig": {
                "notificationReceiver": "org.bayton.managedinfo.receivers.NRSAMAPI"
            },
            "autoUpdateMode": "AUTO_UPDATE_HIGH_PRIORITY"
        },
        {
            "packageName": "org.bayton.ffswitchlauncher",
            "installType": "CUSTOM",
            "customAppConfig": {
                "userUninstallSettings": "ALLOW_UNINSTALL_BY_USER"
            },
            "signingKeyCerts": [
                {
                    "signingKeyCertFingerprintSha256": "Gsk-H2KnwZs9BeKS8a2hCdpFGhQeFXAn1DLDhE7UfKw"
                }
            ]
        },
        {
            "packageName": "fr.neamar.kiss",
            "installType": "CUSTOM",
            "customAppConfig": {
                "userUninstallSettings": "DISALLOW_UNINSTALL_BY_USER"
            },
            "signingKeyCerts": [
                {
                    "signingKeyCertFingerprintSha256": "7AOOWxLJ+43yO17MH3HdJRvFA7MM7I1YoAz64sMavxs="
                }
            ]
        }
    ],
    "setupActions": [
        {
            "launchApp": {
                "packageName": "org.bayton.managedinfo.dev"
            },
            "title": {
                "defaultMessage": "Let's get started"
            },
            "description": {
                "defaultMessage": "You're just a few steps from completing enrolment"
            }
        }
    ]
}
```

You'll note: 

- Two defined custom applications are present
- The managed config used by MANAGED INFO also referencing the two apps
- `SetupActions` to have MANAGED INFO launch on enrolment, and 
- The relevant settings required to ensure AMAPI doesn't reject the calls from the SDK.

Again, this is a very _open_ approach to this type of feature. I'd imagine vendors will have companions pull packages from internal repositories or API endpoints and completely forego the requirement for a managed configuration.

I could have done this too, through the PING infra I run for my [projects](/projects), but I like the openness of this approach.

## Designing the logic

So with MANAGED INFO primed to launch on enrolment, and having the managed configuration prepped to provide the worker with the package details, it was then time to define how to process this new feature. The following is an overview of the worker logic and implementation.

### Step 1: Read managed configuration

On initiation, the worker first reads the available managed configuration. If empty, it will call on a function to check/import managed configurations from disk ad-hoc, and checks again.

If there are no packages defined, everything stops there, the worker will also disable itself until such time the ViewModel wakes it up again on detection of packages in the managed configuration. If present, however, it confirms the number of packages, and moves on to step two.

### Step 2: Figure out, and filter out, packages to process

![Decision tree](https://cdn.bayton.org/uploads/2025/managed-install-flow.png)

The goal here is not to unnecessarily undertake actions when there's no justification for it, so the worker only hits the network when it's deemed necessary.

- Determine and read from the managed configuration
- If the configuration differs from the index, are packages added or removed?
  - If added, the index is updated and continues
  - If removed, the index is updated and an uninstall job is queued
- If managed configuration specifies a **target version code** for a package, and the device already has **that version or newer**, it moves to the next package with no further processing
- For packages that aren't installed, it'll see if a version of the package file has been downloaded to disk previously. If it hasn't, it'll be downloaded at this point on any available network (network types are a TODO)
- When packages exist on-disk, the worker will check for any optional hashes provided in the managed configuration to validate all packages are the version(s) expected.
  - Package hash will ensure the downloaded version of the APK matches the expectation of the admin
  - Signature hash will ensure the APK hasn't been tampered with, or signed with an alternative signature
- If verification fails, MANAGED INFO will make 1 attempt to download an updated version and re-run the checks. Continued verification failures will have it stop here for the relevant package(s)

All of this aims to avoid unnecessary downloads and processing, while trying to ensure the APK someone might send to MANAGED INFO is genuine, even if the remote storage repository were to be compromised.

### Step 3: Stage the APK

If all is looking correct and valid, the packages are sent to Android Device Policy for processing. 

Should AMAPI reject the package, it'll be logged and retried up to three times. All verifications will be undertaken again to ensure nothing has changed in the caches locally.

After the third time, the worker will end, and will try again after a managed configuration change, or within an hour.

The app catalogue screen within MANAGED INFO will surface any installation errors, and allow a user locally to try again.. otherwise, it will try again with the cached APK on the next scheduled run (time based or on configuration update)

<img src="https://cdn.bayton.org/uploads/2025/appcatalogue_managedinfo.png" width="300px" />

### If a package is removed from managed config

After the uninstall job is queued by the initial package processing step (because the package is no longer detected in managed configuration), the app triggers an uninstall custom app command to remove it from the device. Even if the policy hasn't been updated to remove the same package. I opted for this approach - for now - in the spirit of ensuring the managed configuration is the source of truth, and no package actions are run (which could invoke network usage) without explicit definition. Do remember the aim here is for either scripting or some form of automation that has the EMM keep the policy and managed config in sync, so the likelihood of the policy and managed config diverging _should_ be low. This is a _just in case_.

This also takes into account the Play Store Mode limitations I referenced in planning the approach; this way even if the Play Store is in Blocklist, it will still remove an app when the package is removed from the managed config. 

There's a brief period of time (~1s) where the config is updated, but the package hasn't yet uninstalled: here the app will report "unmanaged" until the command is successfully processed.

## Implementation considerations

Some of the other considerations that emerged during the brainstorming of this implementation.

### Networking and timeouts

- Sensible timeouts (15s) 
- **4xx** (permanent) failures. The worker throws a dedicated exception and **fails** (doesn't waste retries).  
- **5xx/timeouts** (transient) failures. The worker **retries** up to 3 total attempts before failing, until the next invocation.

The application install worker will only progress when a network connection is present, so logs won't fill with failed attempts.

### Integrity validation (optional, recommended)

Two optional checks, controlled by managed configuration:

1) **Signer SHA (`sha256`)**  
   - This is the **signing certificate SHA-256** (hex or base64/URL-safe).
   - The cert is extracted from the APK and compared to managed config. On mismatch: **redownload once**; if it still fails, fail **for that app**.

2) **File SHA (`hash256`)**  
   - This is the **APK file content SHA-256** (hex or base64/URL-safe).
   - The file hash is generated from the APK and compared to managed config. On mismatch: **redownload once**; if it still fails, fail **for that app**.

If these are omitted, it's more likely the APK file(s) will be downloaded more often. 

Unfortunately, in testing I found some older/non-mainstream devices are unable to validate the signature/hash of the APK locally. In cases like this I don't yet have a solution; I spent more than a few hours trying to get around this.. but alas. TODO. For the moment the application simply won't install unless the file hash/sig cert hash is removed; this is a design choice I made to respect the requirement for explicitly opting to verify the package before install. If an app isn't installing and these are configured for testing, whip them out and try again. I'd [appreciate](/contact) makes/models of problem devices if you're happy to provide them.

### Install, update, remove, or skip decision logic

- **Not installed** > **install**.
- **Installed and staged is newer** > **update**.
- **Same version** > **skip** (with log).
- **Installed newer** > **skip** (with log).
- **Installed and config removed** > **remove**

### Retaining APKs on-disk

When a package is pulled down and passes known verifications, it remains cached for up to 60 hours in order to avoid burdening network (or increasing cellular data fees) during periods where the app may be reinstalled for any reason. Longer caching is a consideration, but there's a balance between filling up storage and ensuring network usage is always minimal. I'd probably be inclined to add more managed configuration options to allow for flexible management of this (including caching forever, until verification drives a re-download).

## Points of feedback

1. The SDK calls on firebase quite often, and I would like to disable this (that's not limited to custom apps, but a general SDK thing it appears)
2. Initial approaches sent all pending packages to Android Device Policy in one go, and ADP didn't like that. While implementing the receiver for confirmation of installed apps, this approach saw ADP return only one response against multiple install requests
   1. Further development saw the worker wait on a response from ADP before processing the next, but this is quite a bit slower.
3. ADP doesn't inform MANAGED INFO of policy updates, which would be my preferred trigger for the worker logic

## Testing the app yourself

[MANAGED INFO version 1.0.8.1](https://play.google.com/store/apps/details?id=org.bayton.managedinfo) is available on Google Play at the time of writing. Feel free to replicate everything described above in other AMAPI environments, there's a starter-policy below that covers everything above, in summary:

MANAGED INFO notification receiver: `org.bayton.managedinfo.receivers.NRSAMAPI`

Most platforms on the market won't support the customisation required to launch MI on enrolment, but if yours does:

1. Import the app into the enterprise (with or without an EMM), set it to `REQURED_FOR_SETUP` under install type
2. Configure setup actions, if the EMM supports it
3. Configure extension config
4. Define the applications in the AMAPI policy under `CUSTOM` install type
5. Fill in the relevant details of MANAGED INFO's managed configuration, package installation is rendered at the bottom of the MC list.

**Note**: setup actions can be skipped, but you'll need to open the app directly at least once. Nothing else can be skipped above, otherwise it'll error.

If you're interacting with AMAPI directly, either via the explorer or something like Postman, here you go:

```json
{
    "applications": [
        {
            "packageName": "org.bayton.managedinfo",
            "installType": "REQUIRED_FOR_SETUP",
            "managedConfiguration": {
                "packagemanager_install_applications": [
                    {
                        "packagemanager_application_settings": {
                            "packagemanager_download_url": "https://cdn.bayton.org/download/buttonManager.apk",
                            "packagemanager_package_name": "org.bayton.ffswitchlauncher",
                            "packagemanager_package_admin_sha": "Gsk-H2KnwZs9BeKS8a2hCdpFGhQeFXAn1DLDhE7UfKw=",
                            "packagemanager_package_hash": "",
                            "packagemanager_package_versioncode": "1"
                        }
                    },
                    {
                        "packagemanager_application_settings": {
                            "packagemanager_download_url": "https://cdn.bayton.org/download/kissLauncher.apk",
                            "packagemanager_package_name": "fr.neamar.kiss"
                        }
                    },
                    {
                        "packagemanager_application_settings": {
                            "packagemanager_download_url": "https://cdn.bayton.org/download/org.privacymatters.safespace.apk",
                            "packagemanager_package_name": "org.privacymatters.safespace",
                            "packagemanager_package_admin_sha": "lEFprXu0adq99f+wlQPOdF69ZzCha4WYaAjEUjp97mM="
                        }
                    }
                ],
                "enable_intro_card": "0x0",
                "enable_org_message": false,
                "enable_quick_actions": false,
                "enable_device_details": true,
                "customisation_settings": {
                    "enable_device_identifiers": false
                },
                "enable_contact_details": false,
                "device_details_settings": {
                    "device_details_enable_basic": true,
                    "device_details_enable_radio": true,
                    "device_details_enable_network": true,
                    "device_details_enable_hardware": true,
                    "device_details_enable_software": false,
                    "device_details_enable_connectivity_check": true
                }
            },
            "delegatedScopes": [
                "CERT_INSTALL"
            ],
            "autoUpdateMode": "AUTO_UPDATE_HIGH_PRIORITY",
            "extensionConfig": {
                "notificationReceiver": "org.bayton.managedinfo.receivers.NRSAMAPI"
            }
        },
        {
            "packageName": "org.bayton.packagesearch",
            "installType": "FORCE_INSTALLED",
            "defaultPermissionPolicy": "GRANT",
            "managedConfiguration": {
                "enable_package_version_sync": false,
                "enable_system_apps_database_sync": true
            },
            "delegatedScopes": [
                "CERT_INSTALL",
                "MANAGED_CONFIGURATIONS"
            ]
        },
        {
            "packageName": "org.bayton.ffswitchlauncher",
            "installType": "CUSTOM",
            "customAppConfig": {
                "userUninstallSettings": "ALLOW_UNINSTALL_BY_USER"
            },
            "signingKeyCerts": [
                {
                    "signingKeyCertFingerprintSha256": "Gsk+H2KnwZs9BeKS8a2hCdpFGhQeFXAn1DLDhE7UfKw="
                }
            ]
        },
        {
            "packageName": "org.privacymatters.safespace",
            "installType": "CUSTOM",
            "customAppConfig": {
                "userUninstallSettings": "ALLOW_UNINSTALL_BY_USER"
            },
            "signingKeyCerts": [
                {
                    "signingKeyCertFingerprintSha256": "lEFprXu0adq99f+wlQPOdF69ZzCha4WYaAjEUjp97mM="
                }
            ]
        },
        {
            "packageName": "fr.neamar.kiss",
            "installType": "CUSTOM",
            "customAppConfig": {
                "userUninstallSettings": "DISALLOW_UNINSTALL_BY_USER"
            },
            "signingKeyCerts": [
                {
                    "signingKeyCertFingerprintSha256": "7AOOWxLJ+43yO17MH3HdJRvFA7MM7I1YoAz64sMavxs="
                }
            ]
        }
    ],
    "defaultPermissionPolicy": "GRANT",
    "appAutoUpdatePolicy": "ALWAYS",
    "playStoreMode": "WHITELIST",
    "setupActions": [
        {
            "launchApp": {
                "packageName": "org.bayton.managedinfo"
            },
            "title": {
                "defaultMessage": "Launch MANAGED INFO"
            },
            "description": {
                "defaultMessage": "For new enrolments, this ensures MI is launched as soon as possible in order to fetch and install defined APKs"
            }
        }
    ],
    "advancedSecurityOverrides": {
        "developerSettings": "DEVELOPER_SETTINGS_ALLOWED"
    }
}
```

Alternatively, scan this QR code to immediately enrol into my test environment (factory reset is permitted):

![APK install policy demo QR code](https://cdn.bayton.org/uploads/2025/apk_installer_policy_demo.png)

I'd welcome feedback, both on the experience, and the design choices/implementation. How would you handle it differently for your project/product? 

Finally, if this is something you'd like to see in your own platform, get in touch to discuss 😁