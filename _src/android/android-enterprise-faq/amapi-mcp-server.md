---
title: "What is the AMAPI MCP server?"
published: '2026-04-01'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 44000
sources:
  - https://developers.google.com/android/management/use-android-management-mcp
  - https://www.androidenterprise.community/product-updates/product-update-the-future-of-endpoint-management-is-conversational-27
---
In early 2026, Google introduced a Model Context Protocol (MCP) server for the Android Management API. This allows AI assistants - including Claude, Gemini, and ChatGPT - to query enterprise device management data through natural language.

**What it does**

The MCP server exposes a set of tools that AI applications can call to retrieve information from an AMAPI-managed enterprise. These include:

- Listing enrolled devices and retrieving device details
- Viewing policy configurations
- Checking available applications
- Querying compliance status

This means an administrator could ask an AI assistant questions like "which devices in my fleet are running an outdated security patch?" or "show me the policy applied to this device group" and receive structured answers pulled directly from the AMAPI backend.

**Is it read-only?**

The initial release focuses on read-only operations. The tools retrieve and display data but do not modify policies, enrol devices, or push changes. This is a deliberate design choice to allow organisations to experiment with AI-assisted management without risk of unintended configuration changes.

**Prerequisites**

To use the AMAPI MCP server, you need:

- A Google Cloud project with the Android Management API enabled
- Two IAM roles assigned: **MCP Tool User** (`roles/mcp.toolUser`) and **Android Management User** (`roles/androidmanagement.user`)
- OAuth 2.0 authentication (API keys are not accepted)

The server endpoint is `https://androidmanagement.googleapis.com/mcp`.

**Learn more**

You can find a full guide with an example product, [here](/blog/2026/02/introducing-amapi-commander).

**Why this matters**

For larger enterprises, querying device fleet status, auditing policy compliance, and investigating device issues currently requires navigating EMM consoles or writing API calls manually. The MCP integration enables conversational access to this data, which can speed up troubleshooting and compliance reporting.

This is an AMAPI-level feature, not an EMM feature. Organisations using a commercial EMM (Intune, Workspace ONE, etc.) interact with this through their EMM's console, not directly. The MCP server is most relevant to organisations building custom management solutions on AMAPI or those wanting to supplement their EMM's reporting with AI-driven queries.
