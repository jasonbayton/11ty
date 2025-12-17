// Pre-configured DPC entries
const preConfiguredDPCs = {
  "omnissa_hub": {
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.airwatch.androidagent/com.airwatch.agent.DeviceAdministratorReceiver",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": "6kyqxDOjgS30jvQuzh4uvHPk-0bmAD-1QU7vtW7i_o8",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://play.google.com/managed/downloadManagingApp?identifier=hub"
  },

  "amapi_dpc": {
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.google.android.apps.work.clouddpc/.receivers.CloudDeviceAdminReceiver",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": "I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://play.google.com/managed/downloadManagingApp?identifier=setup"
  },

  "ibm_maas360": {
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.fiberlink.maas360.android.control.receivers.MaaS360DeviceAdminReceiver",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": "pQaLOW_QNQdDtk8XxdbzTO9HV2OcokFOrO9nbczTD60",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://play.google.com/managed/downloadManagingApp?identifier=maas360"
  },

  "miradore": {
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.miradore.client.v2/com.miradore.client.admin.AdminReceiver",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": "WPz_o805S_Kmr4H8DtVE-1ioiVfXGpCN4COBVIkdFqU",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://play.google.com/managed/downloadManagingApp?identifier=miradore"
  },

  "soti_mobicontrol": {
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "net.soti.mobicontrol/net.soti.mobicontrol.admin.DeviceAdminAdapter",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": "hn8mSNJMPcovWbnnWrb-uMpWZjNlNp-jyV_2A-Whumc",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://play.google.com/managed/downloadManagingApp?identifier=mobicontrol"
  },

  "codeproof_mdm": {
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.codeproof.device.security/com.codeproof.device.admin.DeviceAdminPolicy",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": "tJ0yu7kxqIUJElZAXJlGyTDKfY5315N01ldeYPRu4yQ",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://play.google.com/managed/downloadManagingApp?identifier=codeproof"
  },

  "esper": {
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.shoonyaos.shoonyadpc/com.shoonyaos.shoonyadpc.receivers.AdminReceiver",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": "EOs5iFuJ8Xh2_2B8HR0KNiQU6GFpGw79m6ibRdxZLeY",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://play.google.com/managed/downloadManagingApp?identifier=esper"
  },

  "manageengine_mdm": {
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.manageengine.mdm.android/com.manageengine.mdm.framework.deviceadmin.DeviceAdminMonitor",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": "qdbQoq_bFYSbjNMdUf5zuOGxcLqlcML48qP4ZSgpy70",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://play.google.com/managed/downloadManagingApp?identifier=memdm"
  },

  "matrix42_silverback": {
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.silverbackmdm.epic.companion.ss/com.silverbackmdm.epic.DeviceMdmReceiver",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": "mqoNjgDp_qAkeHhEj3EcO2oD69YhX3fLY4dbQJ-gx_0",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://play.google.com/managed/downloadManagingApp?identifier=matrix42"
  }
};

// Vendor profiles (user-facing selector entries)
// These map friendly names to a canonical DPC payload key.
// Multiple vendors can legitimately share the same DPC payload (e.g. AMAPI -> Android Device Policy).
const vendorProfiles = {
  // AMAPI-backed vendors (Android Device Policy)
  "amapi_generic": {
    label: "Android Management API (Android Device Policy)",
    dpcKey: "amapi_dpc",
    group: "AMAPI",
    note: "Uses Android Device Policy"
  },
  "microsoft_intune": {
    label: "Microsoft Intune",
    dpcKey: "amapi_dpc",
    group: "AMAPI",
    note: "Uses Android Device Policy"
  },
  "ninjaone_mdm": {
    label: "NinjaOne MDM",
    dpcKey: "amapi_dpc",
    group: "AMAPI",
    note: "Uses Android Device Policy"
  },
  "samsung_knox_manage": {
    label: "Samsung Knox Manage",
    dpcKey: "amapi_dpc",
    group: "AMAPI",
    note: "Uses Android Device Policy"
  },
  "omnissa_workspace_one_amapi": {
    label: "Omnissa Workspace ONE (AMAPI)",
    dpcKey: "amapi_dpc",
    group: "AMAPI"
  },

  // Custom DPC vendors (vendor-specific DPC app)
  "omnissa_workspace_one": {
    label: "Omnissa Workspace ONE (Hub)",
    dpcKey: "omnissa_hub",
    group: "Custom DPC"
  },
  "ibm_maas360": {
    label: "IBM MaaS360",
    dpcKey: "ibm_maas360",
    group: "Custom DPC"
  },
  "miradore": {
    label: "Miradore",
    dpcKey: "miradore",
    group: "Custom DPC"
  },
  "soti_mobicontrol": {
    label: "SOTI MobiControl",
    dpcKey: "soti_mobicontrol",
    group: "Custom DPC"
  },
  "codeproof_mdm": {
    label: "Codeproof",
    dpcKey: "codeproof_mdm",
    group: "Custom DPC"
  },
  "esper": {
    label: "Esper",
    dpcKey: "esper",
    group: "Custom DPC"
  },
  "manageengine_mdm": {
    label: "ManageEngine MDM",
    dpcKey: "manageengine_mdm",
    group: "Custom DPC"
  },
  "matrix42": {
    label: "Matrix42",
    dpcKey: "matrix42",
    group: "Custom DPC"
  }
};

module.exports = {
  preConfiguredDPCs,
  vendorProfiles
};