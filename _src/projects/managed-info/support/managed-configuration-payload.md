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

Version: `1.0.1.2`

```json
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
      "description": "This enables the contact details card. Nothing here is interactive, it's just for display and useful when devices aren't expected to directly interact with details (via quick settings, for instance).",
      "defaultValue": true
    },
    {
      "key": "enable_device_details",
      "type": "BOOL",
      "title": "Show device details card",
      "description": "Show the device details card, useful for enticing end users to share a little more about the device they're using, if needed.",
      "defaultValue": true
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
      "key": "card_stacks",
      "type": "BUNDLE_ARRAY",
      "title": "Build a card layout",
      "description": "Mix and match card types to create a bespoke layout. Licensed feature.",
      "nestedProperties": [
        {
          "key": "stack_bundle",
          "type": "BUNDLE",
          "title": "Create a stack",
          "description": "Stacks offer layout options and card settings.",
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
              "type": "CHOICE",
              "title": "Text stack orientation",
              "description": "For text cards in this stack, which orientation should they appear in?",
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
                      "defaultValue": "Add a description to accompany this standalone icon."
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
                      "defaultValue": -1
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
    }
  ],
  ```