---
title: MANAGED SETTINGS managed configuration JSON payload
parent: MANAGED SETTINGS support
published: '2024-07-16'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Settings'
    - 'bayton-projects'
categories: 
    - Managed Settings Setup
layout: base.njk
eleventyNavigation: 
    order: 4
---

The managed configuration payload, for offline/custom DPC use.

Version: `1.0.0.5`

```
"managedProperties": [
    {
      "key": "connectivity_configuration_bundle",
      "type": "BUNDLE",
      "title": "Network & connectivity settings",
      "nestedProperties": [
        {
          "key": "wireless_enabled",
          "type": "BOOL",
          "title": "Network & Internet",
          "description": "Mobile, Wi-Fi, & hotspot settings combined",
          "defaultValue": false
        },
        {
          "key": "wifi_enabled",
          "type": "BOOL",
          "title": "Wi-Fi",
          "description": "Add & connect to known networks",
          "defaultValue": false
        },
        {
          "key": "roaming_enabled",
          "type": "BOOL",
          "title": "Mobile network",
          "description": "Configure roaming & data settings",
          "defaultValue": false
        },
        {
          "key": "apn_enabled",
          "type": "BOOL",
          "title": "APN",
          "description": "Configure SIM APN settings. OEM testing is recommended",
          "defaultValue": false
        },
        {
          "key": "vpn_enabled",
          "type": "BOOL",
          "title": "VPN",
          "description": "Create & connect to VPN connections",
          "defaultValue": false
        },
        {
          "key": "bluetooth_enabled",
          "type": "BOOL",
          "title": "Bluetooth",
          "description": "Connect to & manage peripherals",
          "defaultValue": false
        }
      ]
    },
    {
      "key": "device_configuration_bundle",
      "type": "BUNDLE",
      "title": "Device configuration settings",
      "nestedProperties": [
        {
          "key": "display_enabled",
          "type": "BOOL",
          "title": "Display",
          "description": "Configure timeout, brightness, & display settings",
          "defaultValue": false
        },
        {
          "key": "sound_enabled",
          "type": "BOOL",
          "title": "Sound",
          "description": "Configure sound settings",
          "defaultValue": false
        },
        {
          "key": "locale_enabled",
          "type": "BOOL",
          "title": "Language & locale",
          "description": "Configure language & location",
          "defaultValue": false
        },
        {
          "key": "date_enabled",
          "type": "BOOL",
          "title": "Date & time",
          "description": "Configure date & time",
          "defaultValue": false
        },
        {
          "key": "print_enabled",
          "type": "BOOL",
          "title": "Print",
          "description": "Configure print services & settings",
          "defaultValue": false
        },
        {
          "key": "battery_saver_enabled",
          "type": "BOOL",
          "title": "Battery saver",
          "description": "Enable battery saving in emergency situations",
          "defaultValue": false
        },
        {
          "key": "battery_optim_enabled",
          "type": "BOOL",
          "title": "Battery optimisation",
          "description": "Configure apps excluded from optimisation",
          "defaultValue": false
        }
      ]
    },
    {
      "key": "security_configuration_bundle",
      "type": "BUNDLE",
      "title": "Security configuration settings",
      "nestedProperties": [
        {
          "key": "security_enabled",
          "type": "BOOL",
          "title": "Security & privacy",
          "description": "Review & configure security & privacy settings",
          "defaultValue": false
        },
        {
          "key": "unknown_apps_enabled",
          "type": "BOOL",
          "title": "Unknown sources",
          "description": "Configure sources permitted to side-load apps",
          "defaultValue": false
        },
        {
          "key": "developer_enabled",
          "type": "BOOL",
          "title": "Developer settings",
          "description": "Configure developer settings, including debugging",
          "defaultValue": false
        },
        {
          "key": "accessibility_enabled",
          "type": "BOOL",
          "title": "Accessibility",
          "description": "Configure apps with accessibility permissions",
          "defaultValue": false
        }
      ]
    },
    {
      "key": "info_configuration_bundle",
      "type": "BUNDLE",
      "title": "Device information settings",
      "nestedProperties": [
        {
          "key": "device_info_enabled",
          "type": "BOOL",
          "title": "About device",
          "description": "View details about this device",
          "defaultValue": false
        },
        {
          "key": "work_profile_enabled",
          "type": "BOOL",
          "title": "Work policy information",
          "description": "View policies enforced on this device",
          "defaultValue": false
        }
      ]
    },
    {
      "key": "support_configuration_bundle",
      "type": "BUNDLE",
      "title": "Support settings",
      "nestedProperties": [
        {
          "key": "support_message",
          "type": "STRING",
          "title": "Support message",
          "description": "Provide a support message in Settings Support",
          "defaultValue": "This message can be customised through the Support message managed configuration within EMM application policy settings. For help configuring this application, please read the documentation."
        },
        {
          "key": "support_mail",
          "type": "STRING",
          "title": "Support email address",
          "description": "Support email address to be shown under available actions",
          "defaultValue": "project-support@bayton.org"
        },
        {
          "key": "feedback_enabled",
          "type": "BOOL",
          "title": "Show feedback & Discord",
          "description": "Show the feedback and Discord buttons under available actions. Hiding this will prevent sending feedback to bayton.org for improvements or new features",
          "defaultValue": false
        }
      ]
    },
    {
      "key": "customization_configuration_bundle",
      "type": "BUNDLE",
      "title": "Customisation settings",
      "nestedProperties": [
        {
          "key": "organisation_id",
          "type": "STRING",
          "title": "Licensed organisation ID",
          "description": "Input an Android Enterprise organisation ID with an active licence to enable customisation",
          "defaultValue": ""
        },
        {
          "key": "custom_app_title",
          "type": "STRING",
          "title": "Custom app title",
          "description": "Provide a custom in-app title (default: Settings)",
          "defaultValue": "Settings"
        },
        {
          "key": "application_icon",
          "type": "BOOL",
          "title": "Use BAYTON icon",
          "description": "Disable this to show a generic app (home & app drawer) icon for your managed estate",
          "defaultValue": true
        },
        {
          "key": "remove_brand",
          "type": "BOOL",
          "title": "Show BAYTON branding",
          "description": "Disable this to remove text advertising bayton.org, a BAYTON logo will still sit in the footer of the app, below available actions\n",
          "defaultValue": true
        }
      ]
    }
  ],
  ```