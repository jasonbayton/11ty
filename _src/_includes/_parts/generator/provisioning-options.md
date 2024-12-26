These provisioning options are optional configuration items that affect the behaviour during and after the provisioning process. Here's a brief description of each:

`android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED`
    : If set to true, all system apps will be enabled during the provisioning process. If false, only the necessary, vital system apps required for device functionality will be enabled. **Learn more about [vital apps](/android/what-are-vital-apps)**.

`android.app.extra.PROVISIONING_USE_MOBILE_DATA`
    : If set to true, the device will be forced to use mobile data during the provisioning process. If false, the device will use Wi-Fi.

`android.app.extra.PROVISIONING_KEEP_SCREEN_ON`
    : If set to true, the device's screen will stay on during the provisioning process. If false, the screen may turn off according to the device's usual settings. Note this is **only** applicable for Android 13. Below 13 this has no impact. Above 13 it is enabled by default.

`android.app.extra.PROVISIONING_ALLOW_OFFLINE`
    : If set to true, the device can be provisioned offline, provided the DPC supports it. If false, an internet connection is required for provisioning.

`android.app.extra.PROVISIONING_SKIP_ENCRYPTION`
    : If set to true, the device will skip the encryption step during provisioning. If false, the device will be encrypted as part of the provisioning process.

`android.app.extra.PROVISIONING_SKIP_EDUCATION_SCREENS`
    : If set to true, the device will skip some of the introductory screens during the provisioning process. If false, all provisioning screens will be shown as normal.

