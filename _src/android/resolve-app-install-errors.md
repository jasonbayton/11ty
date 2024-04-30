---
title: "How to resolve common Android app install failures (with errors)"
published: '2024-04-29'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - App management
layout: base.njk
eleventyNavigation:
  order: 63000
--- 

`INSTALL_FAILED_ALREADY_EXISTS`
: There's an identical version of the application you're trying to install is already present on the device. Have you updated your version code? If not, and you don't want to, remove the existing application first.

`INSTALL_FAILED_INVALID_APK`
: Android considers the package to be invalid. It may be corrupt or not packaged correctly. 


`INSTALL_FAILED_INSUFFICIENT_STORAGE`
: There is no space remaining on the device. Delete all the saved memes and try again.

`INSTALL_FAILED_DUPLICATE_PACKAGE`
: Though the application itself may be unique, it shares a package name with an app already installed. Update the package name, or remove any existing duplicate-named packages from the device first.

`INSTALL_FAILED_UPDATE_INCOMPATIBLE`
: Android tried to update an existing installed application with the new one being presented, but the signatures don't match. Double-check the signing keys used. If this is an intentional change, you'll need to first remove the old application from the device.

`INSTALL_FAILED_DEXOPT`
: Installation may have worked, but the application failed to validate its DEX files. There may not be enough space, or an application issue is present.

`INSTALL_FAILED_OLDER_SDK`
: The `minTargetSDK` of the application is higher than that of the device. For example, trying to install an application targeting Android 14 (API level 34), on a device running Android 12 (API level 31). Note this is explicitly `minTargetSDK`, which defines the _minimum_ version of Android an application will run on. This can be due to a particular library in use relying on newer functionality, or a misconfiguration.

`INSTALL_FAILED_TEST_ONLY`
: The application is flagged as a test app. Build for debug or release instead.

`INSTALL_FAILED_CPU_ABI_INCOMPATIBLE`, `INSTALL_FAILED_NO_MATCHING_ABIS`
: The application likely isn't compatible with the device architecture, but there are a few nuances to [ABIs](https://developer.android.com/ndk/guides/abis) and the appropriate debugging should be undertaken.

`INSTALL_FAILED_MISSING_FEATURE`
: The application defines required features in the app manifest that aren't present on the device. For example telephony, camera, GPS, etc.


`INSTALL_FAILED_VERIFICATION_TIMEOUT`, `INSTALL_FAILED_VERIFICATION_FAILURE`
: The installation verification process timed out or failed. Retry the installation. 
: If it continues to time out, or verification repeatedly fails, Google Play Protect is unhappy with the application. You may disable verification via ADB:
: `adb shell settings put global verifier_verify_adb_installs 0`
: Or through device **Settings > Developer settings > Verify apps over USB**

`INSTALL_FAILED_VERSION_DOWNGRADE`
: The application being installed is of a lower version code than that already present on the device. The existing installed application would need to be removed because Android doesn't support rolling back.

`INSTALL_FAILED_PERMISSION_MODEL_DOWNGRADE`
: Be honest, you're trying to bypass the permission model introduced in Android 6.0 with an update, aren't you? You can't do this. Any new version of an app that targets an SDK version supporting the runtime permissions model can only be updated with a version that _still_ supports runtime permissions. You could remove the old version and install the new version fresh, though you really should just support runtime permissions.

`INSTALL_FAILED_DEPRECATED_SDK_VERSION`
: A restriction on the `minTargetSDK` version introduced in Android 14. Target a newer SDK version for these devices. Read more [here](/android/android-14-minimum-sdk/).


`INSTALL_PARSE_FAILED_NOT_APK`
: Android only supports `.APK` files when not directly installed from a Store. If you're trying to sideload a `.AAB`, convert/build to `.APK` and try again.

`INSTALL_PARSE_FAILED_BAD_MANIFEST`
: Your `AndroidManifest.xml` file is missing or corrupt. The application source will need to be reviewed, and a new build repackaged for installation.

`INSTALL_PARSE_FAILED_BAD_PACKAGE_NAME`
: Your `AndroidManifest.xml` file has a missing or incorrectly formatted package name. The application source will need to be reviewed, and a new build repackaged for installation.

`INSTALL_PARSE_FAILED_UNEXPECTED_EXCEPTION`
: Android fell over. Try again?

`INSTALL_FAILED_INTERNAL_ERROR`
: Android fell over in a different way. Try again?

`INSTALL_PARSE_FAILED_SKIPPED`
: Android continues to fall over, but do check the integrity of the application since this is a parser error, though the reasoning is not provided for the installation failure.

`INSTALL_FAILED_USER_RESTRICTED`
: The user associated with the install request is not permitted to install applications. Review policies or attempt to install under an alternative user.

`INSTALL_FAILED_BAD_SIGNATURE`
: This happens when there is an issue detected with the application signature. Validate the app signing process and try again.

`ENTERPRISE_AUTO_INSTALL_ERROR_NOT_COMPATIBLE_WITH_DEVICE`
: This often happens when the Play Store determines an app is not compatible with the device it has been assigned to. Commonly this is permission or - more specifically - feature related. The specific features requested (either explicitly with `uses-feature` or automatically through assumed feature requirement if _only_ `uses-permission` is declared without `uses-feature), are not available on the hardware.
: Review the permissions/features in use, and if you'd like to use a permission without _mandating_ the associated feature be present, declare `android:required="false"` explicitly per-permission that isn't critical to functionality.