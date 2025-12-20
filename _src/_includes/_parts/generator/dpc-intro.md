DPC options allow for the configuration of a chosen Device Policy Controller. Unlike the AMAPI generator where these options are hidden (as they're preconfigured, and hard-coded), for custom DPC enrolments these fields must match that required by your EMM. More details:

`android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME`
    : The component name of the **Admin Receiver** registered within the DPC you'd like to use. This isn't simply a package name, but a component within. MobileIron's, for example, is `com.mobileiron/com.mobileiron.receiver.MIDeviceAdmin`. If you're unsure of this you can either decompile the DPC APK (which may not be permitted, FYI) or reach out to your EMM vendor for assistance. If you already have devices enrolled, the receiver can be fetched from a [bug report](/android/how-to-capture-device-logs/), also.

`android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM`
    : This is the application signature of the application, or signing key verification. You may retrieve this from the EMM, a package search tool, or via command line ([see this example](https://stackoverflow.com/questions/44836891/how-do-i-get-the-signature-checksum-of-my-apk)). It ensures the application is legitimate by validating app signature. Do not use both PACKAGE and SIGNATURE, it's one or the other.

`android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_CHECKSUM`
    : This is no longer the recommended method of validating authenticity, as it simply validates the package itself matches the specified checksum, and this changes with every APK update. All the same, this is simple enough to generate/validate, more info [here](/android/manual-android-enterprise-work-managed-qr-code-generation-for-mobileiron/#validate-the-checksum). Do not use both PACKAGE and SIGNATURE, it's one or the other.

`android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION`
    : An available (to the device) URL for the APK to be fetched. It doesn't have to be public, but non-HTTPS may fail.

