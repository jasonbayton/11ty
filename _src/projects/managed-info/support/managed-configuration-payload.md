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

Version: `1.0.0.2`

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
      "key": "contact_info_settings",
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
      "key": "enable_quick_action_buttons",
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
      "defaultValue": "This is a default message set via managed config. Change (or delete) this text."
    },
    {
      "key": "enable_contact_details",
      "type": "BOOL",
      "title": "Show contact details card",
      "description": "This enables the contact details card. Nothing here is interactive, it's just for display.",
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
          "description": "Additional application options for licensed organisations.",
          "defaultValue": ""
        },
        {
          "key": "custom_app_title",
          "type": "STRING",
          "title": "Custom app title",
          "description": "Provide a custom in-app title (default: Info).",
          "defaultValue": "Info"
        },
        {
          "key": "enable_settings",
          "type": "BOOL",
          "title": "Show settings",
          "description": "Disabling this removes the settings icon from the top bar, hiding BAYTON resources and references.",
          "defaultValue": true
        },
        {
          "key": "custom_card",
          "type": "BUNDLE",
          "title": "Create a custom card",
          "description": "Create a custom card to be displayed underneath the organisation message.",
          "nestedProperties": [
            {
              "key": "show_custom_card",
              "type": "BOOL",
              "title": "Show a custom card",
              "description": "Sets visibility of the custom card. Don't forget to provide a message below",
              "defaultValue": false
            },
            {
              "key": "custom_card_title",
              "type": "STRING",
              "title": "Card title",
              "description": "Give your card a title. This sits above the card itself, on the app background.",
              "defaultValue": "Custom card title"
            },
            {
              "key": "custom_card_content",
              "type": "STRING",
              "title": "Card content",
              "description": "This card, like organisation message, supports basic HTML.",
              "defaultValue": "This is a default message set via managed config. Change (or delete) this text."
            }
          ]
        }
      ]
    }
  ],
  ```