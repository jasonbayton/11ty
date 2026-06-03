---
title: Troubleshooting issues with KIOSK APP GENERATOR
parent: KIOSK APP GENERATOR support
published: '2026-05-21'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags:
    - 'Kiosk App Generator'
    - 'bayton-projects'
categories:
    - Kiosk App Generator Troubleshooting
layout: base.njk
eleventyNavigation:
    order: 4
    title: Troubleshooting issues
---

If you're having issues building, deploying or running a KIOSK APP GENERATOR build, the guidance below may help. If not, raise an issue at [github.com/baytonorg/kag/issues](https://github.com/baytonorg/kag/issues) or join the [BAYTON Discord](https://discord.gg/YUY7jAjayr).

## Build-time errors

**Invalid keystore**
: The uploaded keystore is not a recognisable JKS or PKCS12. Confirm the file extension matches the actual format, and that the file isn't corrupt. `keytool -list -keystore <file>` will refuse to read a non-keystore.

**Key alias not found**
: The alias entered on the form doesn't exist inside the supplied keystore. `keytool -list -keystore <file>` shows the available aliases.

**Wrong password**
: Either the store password or the key password is incorrect. These are independent values; many keystores reuse the same value for both, but if yours doesn't, both must be supplied separately.

**Build failed; check server logs for details**
: A Gradle build step failed server-side. The reason isn't surfaced in the form response. Quote the **builder version** from the result page and the **job ID** from the URL when raising a support request so the failure can be traced.

**The build appears stuck in the queue**
: Build jobs run through a shared queue. The result panel reports the number of jobs ahead and an estimated wait based on recent build times. If the position is not changing after several minutes, wait before resubmitting; identical in-flight builds are deduplicated so repeated clicks usually return the same job.

**Imported config fails validation**
: `kiosk_config.json` is validated against KAG's schema. Check for row or column values outside the current grid, duplicate app/folder cells, folder entries with fewer than 2 or more than 9 apps, invalid package names, and unsupported enum values. If a hand-edited field appears to do nothing, check the key spelling; unknown JSON keys are ignored by the parser. Import the last known-good export and make the same change through the form first.

## Runtime issues

**Apps tiled in the launcher are missing on the device**
: KAG references apps by package name and does not bundle them; the apps must already be installed on the target device. Use `adb shell pm list packages` on a connected device to confirm what's installed. Confirm the package name in the form exactly matches the installed name (no trailing whitespace, correct case).

**A tile is visible but the app doesn't launch**
: The referenced app doesn't expose a launcher activity. Service-only apps and some system apps don't include `<category android:name="android.intent.category.LAUNCHER" />` in their manifest and cannot be launched from a home screen. KAG tiles a launcher activity; if the app doesn't expose one, there is nothing for the tile to invoke.

**A folder opens, but an app inside it doesn't launch**
: Folder apps follow the same rules as top-level tiles. The package must be installed, must expose a launcher activity, and must be allowed by the kiosk policy. Adding an app to a KAG folder does not add it to the EMM's lock-task allowlist.

**End users can still reach the system home screen**
: The KAG launcher needs to be designated as the home activity. Installation alone doesn't replace the launcher; your EMM's kiosk or lock-task policy must do that. AMAPI: set the KAG application role to `KIOSK`. Custom DPC: `addPersistentPreferredActivity` for `CATEGORY_HOME` against the KAG package.

**Tiles launch outside kiosk mode, but not once lock task is enabled**
: The target app packages are probably not allowlisted for lock task. Allowlist the KAG package and every app it can launch, including apps inside folders. In AMAPI, the launcher itself should be installed as the kiosk app or custom launcher, and the target packages should be installed with a force-install style install type. In a custom DPC, include all launchable packages in `setLockTaskPackages`.

**Wallpaper doesn't render**
: For bundled wallpapers, confirm the file is a valid JPEG, PNG or WebP and under 8 MiB. For URL wallpapers, use HTTPS and confirm the device can reach the host without captive portal or proxy prompts. The launcher caches runtime wallpapers; change the URL or clear app data if you need to force a refetch during testing.

**Settings tile doesn't open the expected setting**
: Android Settings intents are OEM-customised in many cases, and the AOSP intent KAG uses may not be supported on every device. If the relevant intent is broken on a target device, consider pairing with [MANAGED SETTINGS](/projects/managed-settings/) which provides per-OEM intent fallbacks for the same set of common settings.

**Settings opens more than the specific panel you expected**
: KAG launches specific Settings intents, but once Android Settings is open, OEM builds may allow navigation to adjacent screens. Treat KAG's settings gear as a convenience entry point, not a policy boundary. Block Settings access through EMM policy and test the exact OEM firmware you deploy.

**MANAGED SETTINGS shows an unavailable message**
: When **Use MANAGED SETTINGS** is enabled, KAG shows the MANAGED SETTINGS gear even if MANAGED SETTINGS is not yet installed. If the app is missing, disabled, blocked by lock task, or otherwise not launchable, tapping the gear shows an unavailable toast. KAG does not bundle MANAGED SETTINGS or grant policy access to it; deploy MANAGED SETTINGS separately and allow it in lock task if the device is locked down.

**Admin escape doesn't open**
: Admin escape only becomes active when it is enabled, has a 4-16 character password, and has at least one admin app. Long-press the settings gear, MANAGED SETTINGS gear, or shield icon; a normal tap will not open the drawer. If the password was changed by EMM, use the managed value rather than the build-time value.

**An admin escape app doesn't launch**
: Admin escape is still subject to Android launch and lock-task rules. The package must be installed, expose a launcher activity, and be allowed by the kiosk policy. KAG can hide the app from the main grid, but it cannot bypass lock task or launch a package the DPC has blocked.

## Known limitations

**Apps are not deployed by KAG**

KAG produces the launcher surface; the apps it tiles must be deployed independently by your EMM. There is no plan to bundle apps into the launcher artefact.

**Device lock-down is your EMM's job**

KAG does not enforce lock-task mode, block other launchers, or hide the navigation bar. Those behaviours come from your EMM's kiosk policy. KAG is the surface; the lock-down is the policy.

**Update code rejected when rebuilding**

The update code is a one-time-issued, hashed-and-stored secret. Paste rather than retype to avoid whitespace contamination. Confirm you're using a KAG-minted code (WAG codes are intentionally rejected by KAG and vice versa). If the original package name has been removed from the registry, raise a support request with the job ID of the original build.

**Configuration imports are best-effort against schema drift**

If a `kiosk_config.json` exported by an older KAG release imports cleanly into a newer one, great. If schema has drifted (e.g. a new required field has been added), the import will populate what it can and leave the new fields at their defaults. Re-save the configuration after import to migrate.

**Managed configuration overrides replace whole lists**

When pushed from an EMM, non-empty `applications` and `folders` payloads replace the generated lists wholesale. They are not patches. If you push one application in `applications`, the launcher will show one application, not the generated list plus one more. Use `kiosk_config_json` for a full baseline, then typed fields for small layout or visual overrides.

**Source rebuilds may be unsigned**

The source archive intentionally excludes signing credentials. A local `assembleRelease` without `signing.properties` can produce an unsigned APK. That is expected Android Gradle behaviour; configure `signing.properties` from the included template, or sign the APK later with `apksigner`.

## Reporting an issue

Include in your support request:

- The **job ID** from the result page (the random ID in the URL).
- The **builder version** shown on the result page (also baked into the APK manifest as a meta-data tag).
- The exported `kiosk_config.json` if possible; it's the cleanest format for capturing exactly what was submitted.

Open issues at [github.com/baytonorg/kag/issues](https://github.com/baytonorg/kag/issues).
