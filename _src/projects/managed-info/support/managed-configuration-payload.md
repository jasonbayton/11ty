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
    - Managed Info Setup
layout: base.njk
eleventyNavigation: 
    order: 4
    title: Managed configuration JSON payload
---

The managed configuration payload, for offline/custom DPC use.

Version: `1.0.5.0`

```json
[
    {
        "key": "enable_intro_card",
        "title": "Show intro card",
        "description": "The intro card for the application, automatically hidden once managed config is set.",
        "default_value": "0x0",
        "type": "HIDDEN",
        "children": [],
        "entries": []
    },
    {
        "key": "contact_info",
        "title": "Contact information",
        "description": "These details are used both in the quick actions cards and the contact details card. If you choose not to provide contact details, hide the relevant quick action. The entry in the contact details card will hide automatically.",
        "default_value": null,
        "type": "BUNDLE",
        "children": [
            {
                "key": "contact_phone",
                "title": "Phone Number",
                "description": "Enter a phone number",
                "default_value": "+445566778899",
                "type": "STRING",
                "children": [],
                "entries": []
            },
            {
                "key": "contact_email",
                "title": "Email Address",
                "description": "Enter an email address",
                "default_value": "project-support@bayton.org",
                "type": "STRING",
                "children": [],
                "entries": []
            },
            {
                "key": "contact_website",
                "title": "Website",
                "description": "Enter a website URL",
                "default_value": "https://bayton.org/projects",
                "type": "STRING",
                "children": [],
                "entries": []
            },
            {
                "key": "contact_address",
                "title": "Address",
                "description": "Enter a physical address",
                "default_value": "Newport, Wales",
                "type": "STRING",
                "children": [],
                "entries": []
            }
        ],
        "entries": []
    },
    {
        "key": "enable_quick_actions",
        "title": "Show quick actions",
        "description": "This enables the quick actions cards. Configure individual action visibility below. Be sure to configure contact details, otherwise these cards will display an error when tapped.",
        "default_value": true,
        "type": "BOOL",
        "children": [],
        "entries": []
    },
    {
        "key": "quick_action_settings",
        "title": "Manage individual quick actions",
        "description": null,
        "default_value": null,
        "type": "BUNDLE",
        "children": [
            {
                "key": "enable_call",
                "title": "Call action",
                "description": "When tapped, this will call the configured number.",
                "default_value": true,
                "type": "BOOL",
                "children": [],
                "entries": []
            },
            {
                "key": "enable_email",
                "title": "Email action",
                "description": "When tapped, this will try to send an email, if an email app is available.",
                "default_value": true,
                "type": "BOOL",
                "children": [],
                "entries": []
            },
            {
                "key": "enable_web",
                "title": "Web action",
                "description": "When tapped, this will try to open a browser, if one is available.",
                "default_value": true,
                "type": "BOOL",
                "children": [],
                "entries": []
            },
            {
                "key": "enable_map",
                "title": "Map action",
                "description": "When tapped, this will try to open Google Maps or equivalent, if available.",
                "default_value": true,
                "type": "BOOL",
                "children": [],
                "entries": []
            }
        ],
        "entries": []
    },
    {
        "key": "enable_org_message",
        "title": "Show organisation message card",
        "description": "Sets visibility of the message card. Don't forget to provide a message below!",
        "default_value": true,
        "type": "BOOL",
        "children": [],
        "entries": []
    },
    {
        "key": "org_message",
        "title": "Organisation message",
        "description": "Input a message to display to device users. Basic HTML (bold, italic, line break) is supported.",
        "default_value": "This is a default message set via managed config. Edit the configuration to adjust this text. HTML supported.",
        "type": "STRING",
        "children": [],
        "entries": []
    },
    {
        "key": "enable_contact_details",
        "title": "Show contact details card",
        "description": "This enables the contact details card. Nothing here is interactive, it's just for display and useful when devices aren't expected to directly interact with details (via quick settings, for instance).",
        "default_value": true,
        "type": "BOOL",
        "children": [],
        "entries": []
    },
    {
        "key": "enable_device_details_button",
        "title": "Show device details button",
        "description": "Show device details in an overlay accessible via a button in the top bar. Useful for enticing end users to share a little more about the device they're using, if needed. This will be hidden if both top bar and MANAGED SETTINGS integration are disabled.",
        "default_value": false,
        "type": "BOOL",
        "children": [],
        "entries": []
    },
    {
        "key": "enable_device_details",
        "title": "Show device details card",
        "description": "Show the device details cards in the main card UI, useful for enticing end users to share a little more about the device they're using, if needed.",
        "default_value": true,
        "type": "BOOL",
        "children": [],
        "entries": []
    },
    {
        "key": "device_details_settings",
        "title": "Manage individual device details cards",
        "description": null,
        "default_value": null,
        "type": "BUNDLE",
        "children": [
            {
                "key": "device_details_enable_basic",
                "title": "Show basic information",
                "description": "Includes model, manufacturer, and USB debugging status.",
                "default_value": true,
                "type": "BOOL",
                "children": [],
                "entries": []
            },
            {
                "key": "device_details_enable_software",
                "title": "Show operating system information",
                "description": "Includes OS version, build number, mainline version, build details.",
                "default_value": true,
                "type": "BOOL",
                "children": [],
                "entries": []
            },
            {
                "key": "device_details_enable_hardware",
                "title": "Show hardware information",
                "description": "Includes screen details, hardware spec, battery stats.",
                "default_value": true,
                "type": "BOOL",
                "children": [],
                "entries": []
            },
            {
                "key": "device_details_enable_radio",
                "title": "Show radio information",
                "description": "Shows supported radios, if any.",
                "default_value": true,
                "type": "BOOL",
                "children": [],
                "entries": []
            },
            {
                "key": "device_details_enable_network",
                "title": "Show network information",
                "description": "Shows information about active Wi-Fi and mobile networks.",
                "default_value": true,
                "type": "BOOL",
                "children": [],
                "entries": []
            }
        ],
        "entries": []
    },
    {
        "key": "customisation_settings",
        "title": "Customisation settings",
        "description": "Additional application options for licensed organisations.",
        "default_value": null,
        "type": "BUNDLE",
        "children": [
            {
                "key": "organisation_id",
                "title": "Licensed organisation ID",
                "description": "Provide the organisation (enterprise) ID of your environment.",
                "default_value": "",
                "type": "STRING",
                "children": [],
                "entries": []
            },
            {
                "key": "custom_app_title",
                "title": "Custom app title",
                "description": "Provide a custom in-app title.",
                "default_value": "Info",
                "type": "STRING",
                "children": [],
                "entries": []
            },
            {
                "key": "enable_device_identifiers",
                "title": "Show device identifiers",
                "description": "This enables device identifiers (IMEI, SN, etc) under device information. Remember to grant the delegated scope and permissions.",
                "default_value": false,
                "type": "BOOL",
                "children": [],
                "entries": []
            },
            {
                "key": "enable_settings",
                "title": "Show settings",
                "description": "Disabling this removes the settings icon from the top bar, hiding BAYTON resources and references.",
                "default_value": true,
                "type": "BOOL",
                "children": [],
                "entries": []
            },
            {
                "key": "allow_fun",
                "title": "Allow fun",
                "description": "Disable this to remove the delightful Baydroid icons, replacing them with the app icon.",
                "default_value": true,
                "type": "BOOL",
                "children": [],
                "entries": []
            },
            {
                "key": "show_missing_packages",
                "title": "Show missing packages (app cards)",
                "description": "If a package name is not found on the device, an error will be shown highlighting the package name. This turns the error on or off.",
                "default_value": true,
                "type": "BOOL",
                "children": [],
                "entries": []
            },
            {
                "key": "set_order",
                "title": "Configure display order",
                "description": "Define an order in the global UI for MANAGED INFO cards and actions, accepts a number beginning from 1.",
                "default_value": null,
                "type": "BUNDLE",
                "children": [
                    {
                        "key": "set_order_quick_actions",
                        "title": "Quick actions",
                        "description": null,
                        "default_value": 1,
                        "type": "INTEGER",
                        "children": [],
                        "entries": []
                    },
                    {
                        "key": "set_order_org_message",
                        "title": "Organisation message",
                        "description": null,
                        "default_value": 2,
                        "type": "INTEGER",
                        "children": [],
                        "entries": []
                    },
                    {
                        "key": "set_order_contact_details",
                        "title": "Contact details",
                        "description": null,
                        "default_value": 3,
                        "type": "INTEGER",
                        "children": [],
                        "entries": []
                    },
                    {
                        "key": "set_order_device_information",
                        "title": "Device information",
                        "description": null,
                        "default_value": 5,
                        "type": "INTEGER",
                        "children": [],
                        "entries": []
                    }
                ],
                "entries": []
            }
        ],
        "entries": []
    },
    {
        "key": "kiosk_settings",
        "title": "Kiosk settings",
        "description": "Settings allowing MANAGED INFO to adopt kiosk-like behaviour.",
        "default_value": null,
        "type": "BUNDLE",
        "children": [
            {
                "key": "kiosk_enable_top_bar",
                "title": "Show top bar",
                "description": "Turning this off will hide the top bar, including the app title and settings button. If MANAGED SETTINGS integration is enabled, a minimal top bar is shown instead.",
                "default_value": true,
                "type": "BOOL",
                "children": [],
                "entries": []
            },
            {
                "key": "kiosk_enable_managed_settings",
                "title": "MANAGED SETTINGS integration",
                "description": "This will replace the settings icon in the top-right with that of MANAGED SETTINGS if the top bar is present, or a standalone icon if not. Requires separate configuration of the MANAGED SETTINGS app to define permitted settings.",
                "default_value": false,
                "type": "BOOL",
                "children": [],
                "entries": []
            },
            {
                "key": "kiosk_override_theme",
                "title": "System theme override",
                "description": "Overrides the system theme colours to the mode defined. This allows a fixed light or dark mode with the respective default colours to suit an appropriate use case.",
                "default_value": "Automatic",
                "type": "CHOICE",
                "children": [],
                "entries": [
                    {
                        "name": "Automatic",
                        "value": "automatic"
                    },
                    {
                        "name": "Dark",
                        "value": "dark"
                    },
                    {
                        "name": "Light",
                        "value": "light"
                    }
                ]
            },
            {
                "key": "kiosk_custom_background_image",
                "title": "Custom background image",
                "description": "Supports PNG and JPG/JPEG. MANAGED INFO will crop and fill the available screen space, which can vary by device. It is recommended to match the image resolution with that of the screen resolution. This is presented in the device details of MANAGED INFO for reference.",
                "default_value": "",
                "type": "STRING",
                "children": [],
                "entries": []
            },
            {
                "key": "kiosk_custom_background_colour",
                "title": "Custom background colour",
                "description": "Sets the background colour of the application. Use a HEX key - #FFFFFF for white, #000000 for black, etc.",
                "default_value": "",
                "type": "STRING",
                "children": [],
                "entries": []
            },
            {
                "key": "kiosk_custom_card_colour",
                "title": "Custom card colour",
                "description": "Sets the colour of cards, and overrides the standard system-responsive light/dark theme colours. Use a HEX key - #FFFFFF for white, #000000 for black, etc.",
                "default_value": "",
                "type": "STRING",
                "children": [],
                "entries": []
            },
            {
                "key": "kiosk_custom_text_colour",
                "title": "Custom card text colour",
                "description": "This sets the colour of app labels, and overrides the standard system-responsive light/dark theme colours for text on cards. Use a HEX key - #FFFFFF for white, #000000 for black, etc.",
                "default_value": "",
                "type": "STRING",
                "children": [],
                "entries": []
            },
            {
                "key": "kiosk_custom_background_text_colour",
                "title": "Custom background text colour",
                "description": "This sets the colour of headings, card titles and top bar text. This overrides the standard system-responsive light/dark theme colours. Use a HEX key - #FFFFFF for white, #000000 for black, etc.",
                "default_value": "",
                "type": "STRING",
                "children": [],
                "entries": []
            },
            {
                "key": "kiosk_custom_background_grid_card_transparency",
                "title": "Enable application grid card transparency",
                "description": "This will set full transparency on the application grid cards. App grid cards will then look and behave similarly to how apps look on launchers.",
                "default_value": false,
                "type": "BOOL",
                "children": [],
                "entries": []
            },
            {
                "key": "kiosk_custom_background_card_with_text_transparency",
                "title": "Set transparency for text-based cards",
                "description": "Cards with text normally require the background for readability, but this option allows configuration of the alpha channel between 0 and 10. 50% transparency would be 5, for example.",
                "default_value": 10,
                "type": "INTEGER",
                "children": [],
                "entries": []
            },
            {
                "key": "kiosk_enable_launcher",
                "title": "Enable launcher",
                "description": "Enabling this will switch MANAGED INFO into launcher mode, making it possible to use persistent preferred activities to set the app as the device launcher. It is an alternative to kiosk mode and can offer additional flexibility for controlling device behaviour, but is not required.",
                "default_value": false,
                "type": "BOOL",
                "children": [],
                "entries": []
            },
            {
                "key": "kiosk_enable_admin_override",
                "title": "Enable admin override",
                "description": "When using MANAGED INFO as the device kiosk/launcher app, the admin override provides access to all applications on the device temporarily. Long-pressing on the settings icon(s) will bring up a code input, which can be defined below. Depending on policies applied to the device, applications not explicitly allowlisted in-policy may not launch. This is a limitation of locktask mode.",
                "default_value": false,
                "type": "BOOL",
                "children": [],
                "entries": []
            },
            {
                "key": "kiosk_admin_password",
                "title": "Admin override code",
                "description": "Define the admin override code.",
                "default_value": "",
                "type": "STRING",
                "children": [],
                "entries": []
            }
        ],
        "entries": []
    },
    {
        "key": "card_stacks",
        "title": "Build a card layout",
        "description": "Mix and match card types to create a bespoke layout. Licensed feature.",
        "default_value": null,
        "type": "BUNDLE_ARRAY",
        "children": [
            {
                "key": "stack_bundle",
                "title": "Create a stack",
                "description": "Stacks offer layout options and card settings.",
                "default_value": null,
                "type": "BUNDLE",
                "children": [
                    {
                        "key": "stack_id",
                        "title": "Stack name",
                        "description": "This is for reference only, it doesn't appear in the app. Provide a name to identify this stack.",
                        "default_value": "",
                        "type": "STRING",
                        "children": [],
                        "entries": []
                    },
                    {
                        "key": "stack_type",
                        "title": "Stack type",
                        "description": "For internal use only. Define the type of stack",
                        "default_value": "text_card",
                        "type": "HIDDEN",
                        "children": [],
                        "entries": []
                    },
                    {
                        "key": "stack_orientation",
                        "title": "Stack orientation",
                        "description": "For cards in this stack, which orientation should they appear in? Applies to all stacks.",
                        "default_value": "vertical",
                        "type": "CHOICE",
                        "children": [],
                        "entries": [
                            {
                                "name": "Vertical",
                                "value": "vertical"
                            },
                            {
                                "name": "Horizontal",
                                "value": "horizontal"
                            },
                            {
                                "name": null,
                                "value": "single_app"
                            },
                            {
                                "name": null,
                                "value": "multi_app"
                            }
                        ]
                    },
                    {
                        "key": "stack_order",
                        "title": "Display order (global)",
                        "description": "Set the order in which this stack will appear in the global UI, e.g. below device information. Accepts a number beginning from 1, defaults to 4. Adjust display order for top-level cards as needed to ensure they render as expected.",
                        "default_value": 4,
                        "type": "INTEGER",
                        "children": [],
                        "entries": []
                    },
                    {
                        "key": "enable_stack",
                        "title": "Show stack",
                        "description": "Sets visibility of the entire card stack.",
                        "default_value": true,
                        "type": "BOOL",
                        "children": [],
                        "entries": []
                    },
                    {
                        "key": "stack_headings",
                        "title": "Create a heading",
                        "description": "Allows for visual sections within MANAGED INFO.",
                        "default_value": null,
                        "type": "BUNDLE_ARRAY",
                        "children": [
                            {
                                "key": "stack_heading_bundle",
                                "title": "Create a heading",
                                "description": "Allows for visual sections within MANAGED INFO.",
                                "default_value": null,
                                "type": "BUNDLE",
                                "children": [
                                    {
                                        "key": "stack_heading_title",
                                        "title": "Heading",
                                        "description": "Supports text and emojis",
                                        "default_value": "Heading title",
                                        "type": "STRING",
                                        "children": [],
                                        "entries": []
                                    },
                                    {
                                        "key": "stack_heading_title_size",
                                        "title": "Heading size",
                                        "description": "Choose from three sizes: Default, XL, XXL",
                                        "default_value": "Default",
                                        "type": "CHOICE",
                                        "children": [],
                                        "entries": [
                                            {
                                                "name": "Default",
                                                "value": "default"
                                            },
                                            {
                                                "name": "XL",
                                                "value": "xl"
                                            },
                                            {
                                                "name": "XXL",
                                                "value": "xxl"
                                            }
                                        ]
                                    },
                                    {
                                        "key": "enable_stack_heading",
                                        "title": "Show card",
                                        "description": "Sets visibility of the card within the stack.",
                                        "default_value": false,
                                        "type": "BOOL",
                                        "children": [],
                                        "entries": []
                                    }
                                ],
                                "entries": []
                            }
                        ],
                        "entries": []
                    },
                    {
                        "key": "stack_cards",
                        "title": "Text card stack",
                        "description": "Configure one or more text cards tailored to your requirements.",
                        "default_value": null,
                        "type": "BUNDLE_ARRAY",
                        "children": [
                            {
                                "key": "stack_card_bundle",
                                "title": "Card settings",
                                "description": "Build a card from scratch.",
                                "default_value": null,
                                "type": "BUNDLE",
                                "children": [
                                    {
                                        "key": "stack_card_title",
                                        "title": "Card title",
                                        "description": "Give your card an optional title. This sits above the card itself, on the app background.",
                                        "default_value": "Stack card title",
                                        "type": "STRING",
                                        "children": [],
                                        "entries": []
                                    },
                                    {
                                        "key": "stack_card_message",
                                        "title": "Card message",
                                        "description": "This card, like organisation message, supports basic HTML.",
                                        "default_value": "This is a default message set via managed config. Edit the configuration to adjust this text. HTML supported.",
                                        "type": "STRING",
                                        "children": [],
                                        "entries": []
                                    },
                                    {
                                        "key": "stack_card_order",
                                        "title": "Display order",
                                        "description": "Define an order for this card in relation to cards of the same type, i.e Text, App, or Grid. This doesn't change global order, which is defined by the Stack. Likewise a Grid card won't render above a Text card within this stack. Use multiple stacks for finer control. Accepts a number beginning from 0.",
                                        "default_value": 0,
                                        "type": "INTEGER",
                                        "children": [],
                                        "entries": []
                                    },
                                    {
                                        "key": "enable_stack_card",
                                        "title": "Show card",
                                        "description": "Sets visibility of the card within the stack.",
                                        "default_value": false,
                                        "type": "BOOL",
                                        "children": [],
                                        "entries": []
                                    }
                                ],
                                "entries": []
                            }
                        ],
                        "entries": []
                    },
                    {
                        "key": "stack_single_app_card",
                        "title": "App and message card stack",
                        "description": "Configure one or more cards displaying an application and message together. Useful for associating an application with documentation or guidance.",
                        "default_value": null,
                        "type": "BUNDLE_ARRAY",
                        "children": [
                            {
                                "key": "stack_single_app_card_bundle",
                                "title": "Card settings",
                                "description": "Build a card from scratch.",
                                "default_value": null,
                                "type": "BUNDLE",
                                "children": [
                                    {
                                        "key": "stack_single_app_card_title",
                                        "title": "Card title",
                                        "description": "Give your card an optional title. This sits above the card itself, on the app background.",
                                        "default_value": "App card title",
                                        "type": "STRING",
                                        "children": [],
                                        "entries": []
                                    },
                                    {
                                        "key": "stack_single_app_card_message",
                                        "title": "Message or description",
                                        "description": "Provide a message to display with the single application card. Use this to provide guidance, context, or otherwise annotate this particular application. If blank, an error state is shown.",
                                        "default_value": "Add a description to accompany this standalone application.",
                                        "type": "STRING",
                                        "children": [],
                                        "entries": []
                                    },
                                    {
                                        "key": "stack_single_app_card_package_name",
                                        "title": "Package name",
                                        "description": "Input the package name of the application to display.",
                                        "default_value": "com.android.chrome",
                                        "type": "STRING",
                                        "children": [],
                                        "entries": []
                                    },
                                    {
                                        "key": "stack_single_app_card_order",
                                        "title": "Display order",
                                        "description": "Define an order for this card in relation to cards of the same type, i.e Text, App, or Grid. This doesn't change global order, which is defined by the Stack. Likewise a Grid card won't render above a Text card within this stack. Use multiple stacks for finer control. Accepts a number beginning from 0.",
                                        "default_value": 0,
                                        "type": "INTEGER",
                                        "children": [],
                                        "entries": []
                                    },
                                    {
                                        "key": "enable_single_app_stack_card",
                                        "title": "Show card",
                                        "description": "Sets visibility of the card within the stack.",
                                        "default_value": false,
                                        "type": "BOOL",
                                        "children": [],
                                        "entries": []
                                    }
                                ],
                                "entries": []
                            }
                        ],
                        "entries": []
                    },
                    {
                        "key": "stack_multi_app_card",
                        "title": "Application grid card stack",
                        "description": "Configure one or more cards displaying an app grid. Like a launcher, but more granular.",
                        "default_value": null,
                        "type": "BUNDLE_ARRAY",
                        "children": [
                            {
                                "key": "stack_multi_app_card_bundle",
                                "title": "Card settings",
                                "description": "Build a card from scratch.",
                                "default_value": null,
                                "type": "BUNDLE",
                                "children": [
                                    {
                                        "key": "stack_multi_app_card_title",
                                        "title": "Card title",
                                        "description": "Give your card an optional title. This sits above the card itself, on the app background.",
                                        "default_value": "App grid title",
                                        "type": "STRING",
                                        "children": [],
                                        "entries": []
                                    },
                                    {
                                        "key": "stack_multi_app_card_grid_columns",
                                        "title": "Grid columns",
                                        "description": "Define a fixed grid width in columns to limit number of apps per row. Defaults to unlimited (so it'll wrap when it reaches the end of the screen).",
                                        "default_value": 0,
                                        "type": "INTEGER",
                                        "children": [],
                                        "entries": []
                                    },
                                    {
                                        "key": "stack_multi_app_card_package_names",
                                        "title": "Package names",
                                        "description": "Input the package name(s) of the application(s) to display, in the order you want them displayed. Comma-separated list, if you want to create a gap, add extra commas (,,).",
                                        "default_value": "com.android.chrome, org.bayton.packagesearch",
                                        "type": "STRING",
                                        "children": [],
                                        "entries": []
                                    },
                                    {
                                        "key": "stack_multi_app_card_order",
                                        "title": "Display order",
                                        "description": "Define an order for this card in relation to cards of the same type, i.e Text, App, or Grid. This doesn't change global order, which is defined by the Stack. Likewise a Grid card won't render above a Text card within this stack. Use multiple stacks for finer control. Accepts a number beginning from 0.",
                                        "default_value": 0,
                                        "type": "INTEGER",
                                        "children": [],
                                        "entries": []
                                    },
                                    {
                                        "key": "enable_multi_app_stack_card",
                                        "title": "Show card",
                                        "description": "Sets visibility of the card within the stack.",
                                        "default_value": false,
                                        "type": "BOOL",
                                        "children": [],
                                        "entries": []
                                    }
                                ],
                                "entries": []
                            }
                        ],
                        "entries": []
                    }
                ],
                "entries": []
            }
        ],
        "entries": []
    }
]
  ```