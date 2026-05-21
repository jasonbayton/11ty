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

## Runtime issues

**Apps tiled in the launcher are missing on the device**
: KAG references apps by package name and does not bundle them; the apps must already be installed on the target device. Use `adb shell pm list packages` on a connected device to confirm what's installed. Confirm the package name in the form exactly matches the installed name (no trailing whitespace, correct case).

**A tile is visible but the app doesn't launch**
: The referenced app doesn't expose a launcher activity. Service-only apps and some system apps don't include `<category android:name="android.intent.category.LAUNCHER" />` in their manifest and cannot be launched from a home screen. KAG tiles a launcher activity; if the app doesn't expose one, there is nothing for the tile to invoke.

**End users can still reach the system home screen**
: The KAG launcher needs to be designated as the home activity. Installation alone doesn't replace the launcher; your EMM's kiosk or lock-task policy must do that. AMAPI: `kioskCustomLauncherEnabled` plus the KAG package in `applications`. Custom DPC: `addPersistentPreferredActivity` for `CATEGORY_HOME` against the KAG package.

**Wallpaper doesn't render**
: For bundled wallpapers, confirm the file is a valid JPEG or PNG and under 8 MiB. For URL wallpapers, the launcher fetches once on first run and caches the result; if the URL was unreachable at that moment, the cache stays empty until the next first-run. Reinstall the app to retry the fetch.

**Settings tile doesn't open the expected setting**
: Android Settings intents are OEM-customised in many cases, and the AOSP intent KAG uses may not be supported on every device. If the relevant intent is broken on a target device, consider pairing with [MANAGED SETTINGS](/projects/managed-settings/) which provides per-OEM intent fallbacks for the same set of common settings.

## Known limitations

**Apps are not deployed by KAG**

KAG produces the launcher surface; the apps it tiles must be deployed independently by your EMM. There is no plan to bundle apps into the launcher artefact.

**Device lock-down is your EMM's job**

KAG does not enforce lock-task mode, block other launchers, or hide the navigation bar. Those behaviours come from your EMM's kiosk policy. KAG is the surface; the lock-down is the policy.

**Update code rejected when rebuilding**

The update code is a one-time-issued, hashed-and-stored secret. Paste rather than retype to avoid whitespace contamination. Confirm you're using a KAG-minted code (WAG codes are intentionally rejected by KAG and vice versa). If the original package name has been removed from the registry, raise a support request with the job ID of the original build.

**Configuration imports are best-effort against schema drift**

If a `kiosk_config.json` exported by an older KAG release imports cleanly into a newer one, great. If schema has drifted (e.g. a new required field has been added), the import will populate what it can and leave the new fields at their defaults. Re-save the configuration after import to migrate.

## Reporting an issue

Include in your support request:

- The **job ID** from the result page (the random ID in the URL).
- The **builder version** shown on the result page (also baked into the APK manifest as a meta-data tag).
- The exported `kiosk_config.json` if possible; it's the cleanest format for capturing exactly what was submitted.

Open issues at [github.com/baytonorg/kag/issues](https://github.com/baytonorg/kag/issues).
