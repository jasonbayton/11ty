---
title: MANAGED INFO managed configuration JSON payload
parent: MANAGED INFO support
published: '2024-09-04'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Info'
    - 'bayton-projects'
categories: 
    - Managed Info Customisation
layout: base.njk
eleventyNavigation: 
    order: 7
    title: Managed configuration JSON payload
---

The managed configuration payload, for offline/custom DPC use.

Version: `1.1.1.1`

```json
{
  "managedProperties": [
    {
      "key": "enable_intro_card",
      "type": "HIDDEN",
      "title": "Show intro card",
      "description": "The intro card for the application, automatically hidden once managed config is set.",
      "defaultValue": "0x0"
    },
    {
      "key": "contact_info",
      "type": "BUNDLE",
      "title": "Contact information",
      "description": "These details are used both in the quick actions cards and the contact details card. If you choose not to provide contact details, hide the relevant quick action. The entry in the contact details card will hide automatically.",
      "nestedProperties": [
        {
          "key": "contact_phone",
          "type": "STRING",
          "title": "Phone Number",
          "description": "Enter a phone number",
          "defaultValue": "+445566778899"
        },
        {
          "key": "contact_email",
          "type": "STRING",
          "title": "Email Address",
          "description": "Enter an email address",
          "defaultValue": "project-support@bayton.org"
        },
        {
          "key": "contact_website",
          "type": "STRING",
          "title": "Website",
          "description": "Enter a website URL",
          "defaultValue": "https://bayton.org/projects"
        },
        {
          "key": "contact_address",
          "type": "STRING",
          "title": "Address",
          "description": "Enter a physical address",
          "defaultValue": "Newport, Wales"
        }
      ]
    },
    {
      "key": "enable_quick_actions",
      "type": "BOOL",
      "title": "Show quick actions",
      "description": "This enables the quick actions cards. Configure individual action visibility below. Be sure to configure contact details, otherwise these cards will display an error when tapped.",
      "defaultValue": true
    },
    {
      "key": "quick_action_settings",
      "type": "BUNDLE",
      "title": "Manage individual quick actions",
      "nestedProperties": [
        {
          "key": "enable_call",
          "type": "BOOL",
          "title": "Call action",
          "description": "When tapped, this will call the configured number.",
          "defaultValue": true
        },
        {
          "key": "enable_email",
          "type": "BOOL",
          "title": "Email action",
          "description": "When tapped, this will try to send an email, if an email app is available.",
          "defaultValue": true
        },
        {
          "key": "enable_web",
          "type": "BOOL",
          "title": "Web action",
          "description": "When tapped, this will try to open a browser, if one is available.",
          "defaultValue": true
        },
        {
          "key": "enable_map",
          "type": "BOOL",
          "title": "Map action",
          "description": "When tapped, this will try to open Google Maps or equivalent, if available.",
          "defaultValue": true
        }
      ]
    },
    {
      "key": "enable_org_message",
      "type": "BOOL",
      "title": "Show organisation message card",
      "description": "Sets visibility of the message card. Don't forget to provide a message below!",
      "defaultValue": true
    },
    {
      "key": "org_message",
      "type": "STRING",
      "title": "Organisation message",
      "description": "Input a message to display to device users. Basic HTML (bold, italic, line break) is supported.",
      "defaultValue": "This is a default message set via managed config. Edit the configuration to adjust this text. HTML supported."
    },
    {
      "key": "enable_contact_details",
      "type": "BOOL",
      "title": "Show contact details card",
      "description": "This enables the contact details card. Nothing here is interactive, it's just for display and useful when devices aren't expected to directly interact with details (via quick actions, for instance).",
      "defaultValue": true
    },
    {
      "key": "enable_device_details_button",
      "type": "BOOL",
      "title": "Show device details button",
      "description": "Show device details in an overlay accessible via a button in the top bar. Useful for enticing end-users to share a little more about the device they're using, if needed. This will be hidden if both top bar and MANAGED SETTINGS integration are disabled.",
      "defaultValue": false
    },
    {
      "key": "enable_device_details",
      "type": "BOOL",
      "title": "Show device details card",
      "description": "Show the device details cards in the main card UI, useful for enticing end users to share a little more about the device they're using, if needed.",
      "defaultValue": true
    },
    {
      "key": "device_details_settings",
      "type": "BUNDLE",
      "title": "Manage individual device details cards",
      "nestedProperties": [
        {
          "key": "device_details_enable_basic",
          "type": "BOOL",
          "title": "Show basic information",
          "description": "Includes model, manufacturer, and USB debugging status.",
          "defaultValue": true
        },
        {
          "key": "device_details_enable_software",
          "type": "BOOL",
          "title": "Show operating system information",
          "description": "Includes OS version, build number, mainline version, build details.",
          "defaultValue": true
        },
        {
          "key": "device_details_enable_hardware",
          "type": "BOOL",
          "title": "Show hardware information",
          "description": "Includes screen details, hardware spec, battery stats.",
          "defaultValue": true
        },
        {
          "key": "device_details_enable_radio",
          "type": "BOOL",
          "title": "Show radio information",
          "description": "Shows supported radios, if any.",
          "defaultValue": true
        },
        {
          "key": "device_details_enable_network",
          "type": "BOOL",
          "title": "Show network information",
          "description": "Shows information about active Wi-Fi and mobile networks.",
          "defaultValue": true
        },
        {
          "key": "device_details_enable_connectivity_check",
          "type": "BOOL",
          "title": "Show Android Enterprise connectivity information",
          "description": "Runs a network test on all Android Enterprise hosts to validate connectivity, and displays a report.",
          "defaultValue": true
        },
        {
          "key": "device_details_enable_device_trust",
          "type": "BOOL",
          "title": "Show device security posture",
          "description": "Runs a scan on the device to determine its security posture, and displays a report.",
          "defaultValue": true
        }
      ]
    },
    {
      "key": "customisation_settings",
      "type": "BUNDLE",
      "title": "Customisation settings",
      "description": "Additional application options for licensed organisations.",
      "nestedProperties": [
        {
          "key": "organisation_id",
          "type": "STRING",
          "title": "Licensed organisation ID",
          "description": "Provide the organisation (enterprise) ID of your environment.",
          "defaultValue": ""
        },
        {
          "key": "custom_app_title",
          "type": "STRING",
          "title": "Custom app title",
          "description": "Provide a custom in-app title.",
          "defaultValue": "Info"
        },
        {
          "key": "enable_device_identifiers",
          "type": "BOOL",
          "title": "Show device identifiers",
          "description": "This enables device identifiers (IMEI, SN, etc) under device information. Remember to grant the delegated scope and permissions.",
          "defaultValue": false
        },
        {
          "key": "enable_settings",
          "type": "BOOL",
          "title": "Show settings",
          "description": "Disabling this removes the settings icon from the top bar, hiding BAYTON resources and references.",
          "defaultValue": true
        },
        {
          "key": "allow_fun",
          "type": "BOOL",
          "title": "Allow fun",
          "description": "Disable this to remove the delightful Baydroid icons, replacing them with the app icon.",
          "defaultValue": true
        },
        {
          "key": "show_missing_packages",
          "type": "BOOL",
          "title": "Show missing packages (app cards)",
          "description": "If a package name is not found on the device, an error will be shown highlighting the package name. This turns the error on or off.",
          "defaultValue": true
        },
        {
          "key": "set_order",
          "type": "BUNDLE",
          "title": "Configure display order",
          "description": "Define an order in the global UI for MANAGED INFO cards and actions, accepts a number beginning from 1.",
          "nestedProperties": [
            {
              "key": "set_order_quick_actions",
              "type": "INTEGER",
              "title": "Quick actions",
              "defaultValue": 1
            },
            {
              "key": "set_order_org_message",
              "type": "INTEGER",
              "title": "Organisation message",
              "defaultValue": 2
            },
            {
              "key": "set_order_contact_details",
              "type": "INTEGER",
              "title": "Contact details",
              "defaultValue": 3
            },
            {
              "key": "set_order_device_information",
              "type": "INTEGER",
              "title": "Device information",
              "defaultValue": 5
            }
          ]
        }
      ]
    },
    {
      "key": "kiosk_settings",
      "type": "BUNDLE",
      "title": "Kiosk settings",
      "description": "Settings allowing MANAGED INFO to adopt kiosk-like behaviour.",
      "nestedProperties": [
        {
          "key": "kiosk_enable_top_bar",
          "type": "BOOL",
          "title": "Show top bar",
          "description": "Turning this off will hide the top bar, including the app title and settings button. If MANAGED SETTINGS integration is enabled, a minimal top bar is shown instead.",
          "defaultValue": true
        },
        {
          "key": "kiosk_enable_managed_settings",
          "type": "BOOL",
          "title": "MANAGED SETTINGS integration",
          "description": "This will replace the settings icon in the top-right with that of MANAGED SETTINGS if the top bar is present, or a standalone icon if not. Requires separate configuration of the MANAGED SETTINGS app to define permitted settings.",
          "defaultValue": false
        },
        {
          "key": "kiosk_override_theme",
          "type": "CHOICE",
          "title": "System theme override",
          "description": "Overrides the system theme colours to the mode defined. This allows a fixed light or dark mode with the respective default colours to suit an appropriate use case.",
          "entries": [
            {
              "value": "automatic",
              "name": "Automatic"
            },
            {
              "value": "dark",
              "name": "Dark"
            },
            {
              "value": "light",
              "name": "Light"
            }
          ],
          "defaultValue": "automatic"
        },
        {
          "key": "kiosk_custom_background_image",
          "type": "STRING",
          "title": "Custom background image",
          "description": "Supports PNG and JPG/JPEG. MANAGED INFO will crop and fill the available screen space, which can vary by device. It is recommended to match the image resolution with that of the screen resolution. This is presented in the device details of MANAGED INFO for reference.",
          "defaultValue": ""
        },
        {
          "key": "kiosk_custom_background_colour",
          "type": "STRING",
          "title": "Custom background colour",
          "description": "Sets the background colour of the application. Use a HEX key - #FFFFFF for white, #000000 for black, etc.",
          "defaultValue": ""
        },
        {
          "key": "kiosk_custom_card_colour",
          "type": "STRING",
          "title": "Custom card colour",
          "description": "Sets the colour of cards, and overrides the standard system-responsive light/dark theme colours. Use a HEX key - #FFFFFF for white, #000000 for black, etc.",
          "defaultValue": ""
        },
        {
          "key": "kiosk_custom_text_colour",
          "type": "STRING",
          "title": "Custom card text colour",
          "description": "This sets the colour of app labels, and overrides the standard system-responsive light/dark theme colours for text on cards. Use a HEX key - #FFFFFF for white, #000000 for black, etc.",
          "defaultValue": ""
        },
        {
          "key": "kiosk_custom_background_text_colour",
          "type": "STRING",
          "title": "Custom background text colour",
          "description": "This sets the colour of headings, card titles and top bar text. This overrides the standard system-responsive light/dark theme colours. Use a HEX key - #FFFFFF for white, #000000 for black, etc.",
          "defaultValue": ""
        },
        {
          "key": "kiosk_custom_background_grid_card_transparency",
          "type": "BOOL",
          "title": "Enable application grid card transparency",
          "description": "This will set full transparency on the application grid cards. App grid cards will then look and behave similarly to how apps look on launchers.",
          "defaultValue": false
        },
        {
          "key": "kiosk_custom_background_card_with_text_transparency",
          "type": "INTEGER",
          "title": "Set transparency for text-based cards",
          "description": "Cards with text normally require the background for readability, but this option allows configuration of the alpha channel between 0 and 10. 50% transparency would be 5, for example.",
          "defaultValue": 10
        },
        {
          "key": "kiosk_enable_launcher",
          "type": "BOOL",
          "title": "Enable launcher",
          "description": "Enabling this will switch MANAGED INFO into launcher mode, making it possible to use persistent preferred activities to set the app as the device launcher. It is an alternative to kiosk mode and can offer additional flexibility for controlling device behaviour, but is not required.",
          "defaultValue": false
        },
        {
          "key": "kiosk_enable_admin_override",
          "type": "BOOL",
          "title": "Enable admin override",
          "description": "When using MANAGED INFO as the device kiosk/launcher app, the admin override provides access to all applications on the device temporarily. Long-pressing on the settings icon(s) will bring up a code input, which can be defined below. Depending on policies applied to the device, applications not explicitly allowlisted in-policy may not launch. This is a limitation of locktask mode.",
          "defaultValue": false
        },
        {
          "key": "kiosk_admin_password",
          "type": "STRING",
          "title": "Admin override code",
          "description": "Define the admin override code.",
          "defaultValue": ""
        }
      ]
    },
    {
      "key": "card_stacks",
      "type": "BUNDLE_ARRAY",
      "title": "Build a card layout",
      "description": "Mix and match card types to create a bespoke layout. Licensed feature.",
      "nestedProperties": [
        {
          "key": "stack_bundle",
          "type": "BUNDLE",
          "title": "Create a stack",
          "description": "Stacks are a collection of individual cards grouped together. A stack can be horizontal, or vertical, and the card types within it will render in the appropriate direction automatically. A stack can contain one card, or several, and the stack order defines where in the global card list the entire stack of custom cards will sit. For further guidance, read the documentation on bayton.org.",
          "nestedProperties": [
            {
              "key": "stack_id",
              "type": "STRING",
              "title": "Stack name",
              "description": "This is for reference only, it doesn't appear in the app. Provide a name to identify this stack.",
              "defaultValue": ""
            },
            {
              "key": "stack_type",
              "type": "HIDDEN",
              "title": "Stack type",
              "description": "For internal use only. Define the type of stack",
              "defaultValue": "text_card"
            },
            {
              "key": "stack_orientation",
              "type": "CHOICE",
              "title": "Stack orientation",
              "description": "For cards in this stack, which orientation should they appear in? Applies to all stacks.",
              "entries": [
                {
                  "value": "vertical",
                  "name": "Vertical"
                },
                {
                  "value": "horizontal",
                  "name": "Horizontal"
                }
              ],
              "defaultValue": "vertical"
            },
            {
              "key": "stack_order",
              "type": "INTEGER",
              "title": "Display order (global)",
              "description": "Set the order in which this stack will appear in the global UI, e.g. below device information. Accepts a number beginning from 1, defaults to 4. Adjust display order for top-level cards as needed to ensure they render as expected.",
              "defaultValue": 4
            },
            {
              "key": "enable_stack",
              "type": "BOOL",
              "title": "Show stack",
              "description": "Sets visibility of the entire card stack.",
              "defaultValue": true
            },
            {
              "key": "stack_headings",
              "type": "BUNDLE_ARRAY",
              "title": "Create a heading",
              "description": "Allows for visual sections within MANAGED INFO.",
              "nestedProperties": [
                {
                  "key": "stack_heading_bundle",
                  "type": "BUNDLE",
                  "title": "Create a heading",
                  "description": "Allows for visual sections within MANAGED INFO.",
                  "nestedProperties": [
                    {
                      "key": "stack_heading_title",
                      "type": "STRING",
                      "title": "Heading",
                      "description": "Supports text and emojis",
                      "defaultValue": "Heading title"
                    },
                    {
                      "key": "stack_heading_title_size",
                      "type": "CHOICE",
                      "title": "Heading size",
                      "description": "Choose from three sizes: Default, XL, XXL",
                      "entries": [
                        {
                          "value": "default",
                          "name": "Default"
                        },
                        {
                          "value": "xl",
                          "name": "XL"
                        },
                        {
                          "value": "xxl",
                          "name": "XXL"
                        }
                      ],
                      "defaultValue": "default"
                    },
                    {
                      "key": "enable_stack_heading",
                      "type": "BOOL",
                      "title": "Show card",
                      "description": "Sets visibility of the card within the stack.",
                      "defaultValue": false
                    }
                  ]
                }
              ]
            },
            {
              "key": "stack_cards",
              "type": "BUNDLE_ARRAY",
              "title": "Text card stack",
              "description": "Configure one or more text cards tailored to your requirements.",
              "nestedProperties": [
                {
                  "key": "stack_card_bundle",
                  "type": "BUNDLE",
                  "title": "Card settings",
                  "description": "Build a card from scratch.",
                  "nestedProperties": [
                    {
                      "key": "stack_card_title",
                      "type": "STRING",
                      "title": "Card title",
                      "description": "Give your card an optional title. This sits above the card itself, on the app background.",
                      "defaultValue": "Stack card title"
                    },
                    {
                      "key": "stack_card_message",
                      "type": "STRING",
                      "title": "Card message",
                      "description": "This card, like organisation message, supports basic HTML.",
                      "defaultValue": "This is a default message set via managed config. Edit the configuration to adjust this text. HTML supported."
                    },
                    {
                      "key": "stack_card_order",
                      "type": "INTEGER",
                      "title": "Display order",
                      "description": "Define an order for this card in relation to cards of the same type, i.e Text, App, or Grid. This doesn't change global order, which is defined by the Stack. Likewise a Grid card won't render above a Text card within this stack. Use multiple stacks for finer control. Accepts a number beginning from 0.",
                      "defaultValue": 0
                    },
                    {
                      "key": "enable_stack_card",
                      "type": "BOOL",
                      "title": "Show card",
                      "description": "Sets visibility of the card within the stack.",
                      "defaultValue": false
                    }
                  ]
                }
              ]
            },
            {
              "key": "stack_single_app_card",
              "type": "BUNDLE_ARRAY",
              "title": "App and message card stack",
              "description": "Configure one or more cards displaying an application and message together. Useful for associating an application with documentation or guidance.",
              "nestedProperties": [
                {
                  "key": "stack_single_app_card_bundle",
                  "type": "BUNDLE",
                  "title": "Card settings",
                  "description": "Build a card from scratch.",
                  "nestedProperties": [
                    {
                      "key": "stack_single_app_card_title",
                      "type": "STRING",
                      "title": "Card title",
                      "description": "Give your card an optional title. This sits above the card itself, on the app background.",
                      "defaultValue": "App card title"
                    },
                    {
                      "key": "stack_single_app_card_message",
                      "type": "STRING",
                      "title": "Message or description",
                      "description": "Provide a message to display with the single application card. Use this to provide guidance, context, or otherwise annotate this particular application. If blank, an error state is shown.",
                      "defaultValue": "Add a description to accompany this standalone application."
                    },
                    {
                      "key": "stack_single_app_card_package_name",
                      "type": "STRING",
                      "title": "Package name",
                      "description": "Input the package name of the application to display.",
                      "defaultValue": "com.android.chrome"
                    },
                    {
                      "key": "stack_single_app_card_order",
                      "type": "INTEGER",
                      "title": "Display order",
                      "description": "Define an order for this card in relation to cards of the same type, i.e Text, App, or Grid. This doesn't change global order, which is defined by the Stack. Likewise a Grid card won't render above a Text card within this stack. Use multiple stacks for finer control. Accepts a number beginning from 0.",
                      "defaultValue": 0
                    },
                    {
                      "key": "enable_single_app_stack_card",
                      "type": "BOOL",
                      "title": "Show card",
                      "description": "Sets visibility of the card within the stack.",
                      "defaultValue": false
                    }
                  ]
                }
              ]
            },
            {
              "key": "stack_multi_app_card",
              "type": "BUNDLE_ARRAY",
              "title": "Application grid card stack",
              "description": "Configure one or more cards displaying an app grid. Like a launcher, but more granular.",
              "nestedProperties": [
                {
                  "key": "stack_multi_app_card_bundle",
                  "type": "BUNDLE",
                  "title": "Card settings",
                  "description": "Build a card from scratch.",
                  "nestedProperties": [
                    {
                      "key": "stack_multi_app_card_title",
                      "type": "STRING",
                      "title": "Card title",
                      "description": "Give your card an optional title. This sits above the card itself, on the app background.",
                      "defaultValue": "App grid title"
                    },
                    {
                      "key": "stack_multi_app_card_grid_columns",
                      "type": "INTEGER",
                      "title": "Grid columns",
                      "description": "Define a fixed grid width in columns to limit number of apps per row. Defaults to unlimited (so it'll wrap when it reaches the end of the screen).",
                      "defaultValue": 0
                    },
                    {
                      "key": "stack_multi_app_card_package_names",
                      "type": "STRING",
                      "title": "Package names",
                      "description": "Input the package name(s) of the application(s) to display, in the order you want them displayed. Comma-separated list, if you want to create a gap, add extra commas (,,).",
                      "defaultValue": "com.android.chrome, org.bayton.packagesearch"
                    },
                    {
                      "key": "stack_multi_app_card_order",
                      "type": "INTEGER",
                      "title": "Display order",
                      "description": "Define an order for this card in relation to cards of the same type, i.e Text, App, or Grid. This doesn't change global order, which is defined by the Stack. Likewise a Grid card won't render above a Text card within this stack. Use multiple stacks for finer control. Accepts a number beginning from 0.",
                      "defaultValue": 0
                    },
                    {
                      "key": "enable_multi_app_stack_card",
                      "type": "BOOL",
                      "title": "Show card",
                      "description": "Sets visibility of the card within the stack.",
                      "defaultValue": false
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "key": "packagemanager_install_applications",
      "type": "BUNDLE_ARRAY",
      "title": "Package installation settings",
      "description": "When configured as a companion application in AMAPI, allows MANAGED INFO to install APKs from remote locations. Review AMAPI documentation before using this setting, as corresponding application policy settings must be defined.",
      "nestedProperties": [
        {
          "key": "packagemanager_application_settings",
          "type": "BUNDLE",
          "title": "Application settings",
          "description": "Define settings for each application to be installed.",
          "nestedProperties": [
            {
              "key": "packagemanager_package_name",
              "type": "STRING",
              "title": "Package name of the application",
              "description": "This is the universally unique name of the package, e.g. org.bayton.managedinfo.",
              "defaultValue": ""
            },
            {
              "key": "packagemanager_package_versioncode",
              "type": "STRING",
              "title": "Version code of the application",
              "description": "This is the version code of the application, not the version name, e.g. 1010 and not 1.0.1.0. It must always be higher than a previous version. If any existing cached APK is lower than this version, it will be redownloaded. This input is primarily used for managing updates to existing apps.",
              "defaultValue": ""
            },
            {
              "key": "packagemanager_download_url",
              "type": "STRING",
              "title": "Download location",
              "description": "URL must be accessible to MANAGED INFO. Supports JWT, reach out for more options.",
              "defaultValue": ""
            },
            {
              "key": "packagemanager_package_admin_sha",
              "type": "STRING",
              "title": "Application signature SHA256",
              "description": "Optional SHA256 of the application admin signature in base64. This allows the signing certificate to be verified against the input here, and re-downloaded if it fails validation. BAYTON Package Search provides this for all installed APKs, otherwise apksigner can be used to retrieve it.",
              "defaultValue": ""
            },
            {
              "key": "packagemanager_package_hash",
              "type": "STRING",
              "title": "Application file SHA256",
              "description": "Optional SHA256 of the application file in base64. This allows the APK file to be verified against the input here, and re-downloaded if it fails validation.",
              "defaultValue": ""
            }
          ]
        }
      ]
    }
  ]
}
```