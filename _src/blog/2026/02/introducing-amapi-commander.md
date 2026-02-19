---
title: "Introducing AMAPI Commander: managing your Android fleet with natural language"
date: '2026-02-19'
status: publish
author: 'Jason Bayton'
excerpt: "A platform that lets you query your entire Android device fleet by simply asking questions in plain English."
type: post
tags:
  - Enterprise
---

If you manage or support a fleet of Android devices, you already know the pain. Getting a straightforward answer about your estate typically means logging into a console, clicking through several screens, exporting a report, and wrangling it into something useful. Need to know how many devices are running an outdated security patch? That's a ticket to IT, a scheduled report, or half an afternoon with spreadsheets. The data is there, locked behind tools that only a handful of people know how to operate.

I've spent years building resources around Android Enterprise, from [MANAGED INFO](https://bayton.org/projects/managed-info/) and [MANAGED SETTINGS](https://bayton.org/projects/managed-settings/) to the system apps database, QR code generator, and my [documentation](https://bayton.org/android/) - all have become popular utilities for the community. AMAPI Commander is the next step in that journey of learning more about the succulent underbelly of the Android world: a platform that lets you query your entire Android device fleet by simply asking questions in plain English.

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">This isn't a tool for organisations</div>

As a disclaimer, if you're an organisation managing Android devices with a commercial EMM vendor, this platform is not for you. EMM vendors own and control their Google Cloud Projects, and wouldn't grant the access needed for organisations to leverage AMAPI Commander.

Think of this more as a technical preview of what your EMM vendor could eventually integrate into their own stack.

</div>

## A quick refresher on AMAPI

Google's [Android Management API](https://developers.google.com/android/management) (AMAPI) is the cloud-based API that underpins modern Android Enterprise device management. It is the engine behind most EMM solutions today, handling everything from device enrolment and policy enforcement to application distribution and compliance reporting. If your organisation uses Workspace ONE, Intune, NinjaOne, Applivery, or any other AMAPI-enabled EMM, your device fleet data may already flow through this API.

AMAPI Commander doesn't replace your EMM. It doesn't even sit alongside it.. but where feasible, it can offer you a new way to access and query the data AMAPI already holds about your devices, policies, and enterprise configuration, when integrated into the appropriate Google Cloud Project.

## The Model Context Protocol: why it matters

The bit that makes this technically interesting, and I'd argue forward-looking, is the [Model Context Protocol](https://modelcontextprotocol.io/) (MCP).

MCP is an open standard, [originally developed by Anthropic](https://www.anthropic.com/news/model-context-protocol) and now maintained under the [Linux Foundation](https://github.com/modelcontextprotocol/modelcontextprotocol), that defines how AI models connect to external tools and data sources. Think of it as a universal plug: rather than building bespoke integrations for every AI assistant on the market, you expose your tools via MCP and any compatible model (ChatGPT, Claude, Gemini, or whatever comes next) can use them.

The obvious opportunity here is for **EMM solutions**. Under almost all circumstances, customers don't have direct access to the Google Cloud project that backs their device management; it's the EMM that owns and operates the AMAPI project on their behalf. That makes EMMs the natural home for an MCP integration: they could expose fleet data from their own AMAPI projects through their platforms, letting customers query their device estate through any MCP-aware AI assistant without needing to know or care about the underlying API.

AMAPI Commander is something of an outlier in this regard. It implements an MCP server that bridges AI models directly to Google's Android Management API, and opens that up to *anyone* with an AMAPI Google Cloud project, whether that's an EMM vendor, a managed service provider, or an organisation that manages its own AMAPI project directly (being mindful of the permissible usage limitations). Those nine tools mentioned above are all exposed via MCP, each with built-in rate limiting, OAuth token management, and workspace-scoped access control.

For EMMs and platform vendors thinking about AI strategy, MCP offers a protocol-level integration point that avoids locking into a single vendor's AI ecosystem. Today in AMAPI Commander it powers the built-in assistant. But the same approach could power a custom GPT, a Claude agent, or an internal tool an engineering team builds, all against the same secure, rate-limited interface.

## What AMAPI Commander does

At its core, AMAPI Commander is a multi-tenant web application that sits between your organisation and AMAPI. Rather than navigating dashboards or writing API calls, you ask the platform a question, and it returns an answer in seconds.

Behind the scenes, an AI assistant powered by OpenAI translates your query into structured API calls against your Google Cloud project, retrieves the relevant data, and presents the results in a format that actually makes sense. It supports both text and voice interaction, background processing for large fleet queries, and intelligent caching so repeated questions don't burn through your Google API quota.

### What you can ask

The platform exposes nine tools that map directly to AMAPI's core resources. Here are some practical examples of what that looks like in conversation:

- **Enterprises:** *"List all enterprises in my project"* or *"Show me the details for enterprise LC012345"* - useful for managed service providers overseeing multiple customer estates.
- **Devices:** *"How many devices are enrolled?"*, *"Show me all devices running Android 13 or older"*, or *"What's the compliance status of device XYZ?"* - the bread and butter for fleet oversight.
- **Policies:** *"What policies are currently active?"* or *"Show me the configuration for the BYOD policy"* - helpful when auditing what's actually applied versus what's documented.
- **Applications:** *"What version of Chrome is deployed across the fleet?"* or *"Show me the details for com.google.android.apps.work.clouddpc"* - quick lookups that would normally require a Play Store console detour.
- **Web apps:** *"List all web apps published to managed Google Play"* or *"Show me the configuration for our intranet web app"* - niche, but genuinely useful when you need it.

These aren't canned queries. You phrase the question however you like, and the assistant works out which tools to call, in what order, and how to combine the results. Ask it to compare compliance across two policies, or to summarise which devices haven't synced in the last 30 days, and it will chain the relevant API calls together.

## Built for multi-tenant from day one

Each workspace operates as an isolated tenant with its own Google Cloud project credentials, encrypted API keys, user memberships, and role-based access control. Workspace owners manage secrets, admins handle invitations and members, and members get read access to fleet data. Data is isolated at every layer: storage keys, cache entries, and audit logs are all scoped per workspace.

On the security side, credentials are encrypted at rest with AES-256-GCM (the same standard used across banking and government), and the platform never returns encrypted values to the client. Authentication supports both Google OAuth and passwordless magic links, with a comprehensive audit trail for privileged operations. The architecture has been through multiple rounds of security auditing, and the full technical detail is documented in the [Technical Whitepaper](TECHNICAL_WHITEPAPER.md) for those who want to kick the tyres.

## Who is this for?

- **IT managers and fleet administrators** who need visibility into their device estate without learning API documentation or building custom tooling.
- **Managed service providers and consultancies** overseeing multiple client fleets, where the multi-tenant model means each customer gets an isolated workspace with its own credentials and access controls.
- **Security and compliance teams** who need quick answers about patch levels, policy adherence, and device status without raising tickets or waiting for scheduled reports.
- **Forward-thinking technology leaders** who want their enterprise tooling to integrate with AI via open standards rather than proprietary, vendor-locked connectors.

## What AMAPI Commander isn't

To reiterate for absolute clarity: **this is not an EMM solution**. It doesn't push policies or provision devices. What it does is make the data your EMM already manages through AMAPI accessible, queryable, and useful, without requiring everyone on the team to understand API documentation or navigate a management console.

## What's next

AMAPI Commander is in pre-production, and I'm actively working through a heap of hardening items before a wider release, so the platform is presently invite-only. If you're interested in early access, want to see a demo, or simply want to chat about the approach, I'd love to hear from you.
