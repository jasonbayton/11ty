---
title: Deploy APK packages with MANAGED INFO
parent: MANAGED INFO support
published: '2024-11-14'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Info'
    - 'bayton-projects'
categories: 
    - Managed Info Features
layout: base.njk
eleventyNavigation: 
    order: 9
    title: Deploy APK packages
---

This document explains how to configure your EMM to deploy **APK packages** to devices using MANAGED INFO.  
MANAGED INFO includes a built-in **Package manager** which handles downloading, validating, installing, updating, and uninstalling APKs via Android Management API (AMAPI) custom app deployment.

Administrators only need to configure the policy and define managed configuration correctly; the package manager does the rest.

## How MANAGED INFO manages APK deployment

The Package manager treats the managed configuration as the **source of truth** for which apps should be present on the device.

On every run (config change or scheduled reconcile), it:

1. Reads the list of package entries from managed config.
2. Compares that list with any existing index.
3. For each package:
   - **New or updated**: download and install/update via AMAPI.
   - **Up-to-date**: mark as success and skip.
   - **Removed from config**: attempt to uninstall app (limitations apply, noted below).
   - **Manually uninstalled**: clean up status and remove from index.

The package manager runs:
- automatically when managed configuration changes, and  
- periodically in the background based EMM policy.

No manual intervention is required.

## AMAPI application policy requirements

MANAGED INFO uses the Android Management API command client on the device to install and uninstall APKs as **custom apps**. For this to work reliably, your AMAPI policy must:

1. Install MANAGED INFO itself on the device.
2. Avoid blocking the packages you intend to manage via the package manager.
3. Grant MANAGED INFO the runtime permissions it needs (for storage, networking, etc., depending on your configuration).
4. Declare MANAGED INFO as a **companion app** in the policy using the `COMPANION_APP` role, as described in the Android Management API application roles documentation.

A minimal example AMAPI policy snippet might look like:

```json
{
  "applications": [
    {
      "packageName": "org.bayton.managedinfo",
      "installType": "REQUIRED_FOR_SETUP",
      "defaultPermissionPolicy": "GRANT",
      "signingKeyCerts": [
        {
          "signingKeyCertFingerprintSha256": "<base64-encoded SHA-256 of MANAGED INFO signing cert>"
        }
      ],
      "roles": [
        { "roleType": "COMPANION_APP" }
      ],
      "managedConfiguration": {
        "<package_manager_configuration_keys_go_here>": "<values>"
      }
    },
    {
      "packageName": "com.example.customapp",
      "installType": "CUSTOM",
      "defaultPermissionPolicy": "GRANT",
      "signingKeyCerts": [
        {
          "signingKeyCertFingerprintSha256": "<base64-encoded SHA-256 of custom app signing cert>"
        }
      ],
      "customAppConfig": {
        "userUninstallSettings": "DISALLOW_UNINSTALL_BY_USER"
      }
    }
  ]
}
```

_The above clearly omits any managed configuration, which should be handled through the EMM._

- The apps you deploy via the MANAGED INFO package manager **must** be present in the AMAPI policy `applications` array as **custom apps** (using `installType": "CUSTOM"` and `customAppConfig`), as described in the *Manage custom apps with AMAPI* guide. MANAGED INFO then uses `InstallCustomApp` device commands against those declared custom apps.
- Ensure your policy does not include any `BLOCKED` entries for packages you plan to deploy with MANAGED INFO, or global restrictions that would prevent the app from installing non-Play custom APKs.

## MANAGED INFO configuration

Each APK entry in the managed configuration must contain the following fields:

**Package name (required)**

The Android package name, e.g.  
`com.example.myapp`

**APK download URL (required)**

A direct HTTPS link to the APK file. the package manager fetches and stages this in its internal cache.

_Note: The application size of MANAGED INFO will increase in line with all cached packages. This is not an issue, but do ensure the device has enough space to hold effectively two copies of the same app while the file remains in cache.

**Version code (recommended)**

The `versionCode` the package manager should ensure is installed.

Behaviour:
- Installed version **lower** → install/update  
- Installed version **equal** → considered current  
- Installed version **higher** → treated as already up-to-date (no downgrade)

**Signing certificate SHA-256 (optional but strongly recommended)**

The SHA-256 fingerprint of the APK’s signing certificate.  

Supports:
- hex (with or without colons)  
- base64  
- url-safe base64  

The package manager normalises and validates it before install.

**APK file SHA-256 (optional)**

Hash of the APK file itself. Ensures the downloaded file matches what you intended to deploy.

## What MANAGED INFO does with your configuration

When an entry is present:

1. The package manager downloads the APK.
2. If provided, it validates certificate hash and/or file hash.
3. It issues an AMAPI `InstallCustomApp` command.
4. It records the result in:
   - `pmStatusKey(pkg)` (SUCCESS, FAILURE, PENDING)
   - `pmStatusMsgKey(pkg)` (human-readable explanation)
   - `PM_ASSIGNED_INDEX` (list of managed apps)

If the install succeeds, the app is added to the index.  

If it fails, the error is recorded but the entry stays in the index so future reconcile cycles can retry.

## How updates work

Updates require only **bumping the versionCode** in the EMM.

The package manager will:
- detect the version change,  
- download the new APK,  
- validate hashes, and  
- reinstall via AMAPI.

If the installed version is already higher than what you configured, MANAGED INFO does **not** downgrade it.

## Removing an app (uninstall behaviour)

When an app is removed from managed config:

1. The package manager detects it by comparing the previous index with the current list.
2. It checks whether the app is still installed.
3. If installed:
   - Calls AMAPI `UninstallCustomApp`.

Outcomes:

**Successful uninstall**

- App removed from the device  
- Removed from index  
- Status updated to SUCCESS  

**AMAPI refuses uninstall** (e.g. `STATUS_FAILURE_NOT_CUSTOM`)

- App stays installed  
- Status is set to FAILURE with message  
- Package **remains in the index** so future reconciles retry as intended

**App manually uninstalled**

- Package manager removes it from index and clears status keys
- If the package remains present in managed configuration, MANAGED INFO will reinstall it if the user removes it.
If the package has been removed from managed configuration, and the user later uninstalls it manually, MANAGED INFO will not reinstall it.

## Typical configuration examples

**Single APK entry**
```
packageName: "com.example.app"
apkUrl: "https://downloads.example.com/app-release-42.apk"
versionCode: 42
certSha256: "A1:B2:C3:...:FF"
apkSha256: "1234abcd..."
```

**Multiple APK entries**
Provide each app as its own row/entry in the EMM.  
The package manager handles them independently, so one app failing will not block others.

## How MANAGED INFO avoids unnecessary or costly APK downloads

MANAGED INFO includes several safeguards to prevent repeated or unnecessary downloads of APK files. These optimisations are crucial when devices operate on limited bandwidth networks, metered mobile data, or environments where large file transfer costs accumulate.

To keep network usage efficient, the package manager:

**Only downloads when a change is detected**
Before attempting any download, the package manager checks:
- whether the app is already installed,
- what version is installed,
- whether the target `versionCode` in the managed configuration is higher.

If the installed version is already equal to or newer than what the configuration requests, the package manager skips all network operations.

**Caches staged APKs where possible**
Downloaded APKs are saved into the custom APK staging directory.  
When the package manager runs again, it checks:
- whether the staged file for that package and version still exists,
- whether the SHA-256 file hash (if provided) matches.

If both are true, the package manager bypasses downloading and reuses the existing staged file.

**Avoids re-downloading on certificate mismatch retries**
If a certificate or file hash mismatch occurs:
- MANAGED INFO performs **one corrective retry download** only.
- After that retry:
  - if the file still fails validation, the status is set to **FAILURE**,  
  - the APK is *not* downloaded again until the next config change or version bump.

This prevents “retry storms” caused by servers returning transient or mismatched builds.

**Uses index-based reconciliation instead of re-fetching**
The package manager uses an index to determine what has already been handled.  
This means:
- If a package was previously verified and installed,
- And the configuration hasn’t changed,
- And the installed version matches expectations,

..then the package manager does not download the APK again, even during periodic reconciles.

**Periodic runs never force a download**
Scheduled reconciles (those triggered by the EMM policy rather than a config change) only verify:
- whether apps remain installed,
- whether their versions match,
- whether anything has been manually removed.

They do **not** trigger downloads unless a valid install is required.

These measures ensure APK deployment is efficient, predictable, and safe for environments where bandwidth or data cost must be tightly controlled.

## Troubleshooting

**Hash mismatch**
Check you’re providing:
- correct certificate hash, and  
- correct file SHA-256 for that exact APK version.

**Uninstall consistently fails**
Most common cause:
- App was installed **outside** AMAPI custom app flow (Play Store, sideload, OEM preload)

MANAGED INFO will show:

> Uninstall rejected by AMAPI (likely not installed as a custom app)

In this case, remove the app using your normal EMM app policy or via other remediation.

**APK does not download**
Check:
- URL correctness  
- HTTPS certificate validity  
- network/firewall rules  
- whether the device can reach the host

## Summary for administrators

To deploy APKs through MANAGED INFO:

1. Host APK files on a reachable HTTPS location.
2. In your EMM, configure one entry per app:
   - package name  
   - APK URL  
   - versionCode  
   - SHA-256 values if desired  
3. Save the managed configuration.
4. MANAGED INFO will:
   - download  
   - validate  
   - install/update  
   - uninstall removed apps  
   - maintain state and retries  

This provides fully automated, policy-driven APK deployment without requiring manual custom-app commands.