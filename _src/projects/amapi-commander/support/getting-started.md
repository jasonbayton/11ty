---
title: AMAPI Commander get started
parent: AMAPI Commander support
published: '2025-02-19'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags:
    - 'AMAPI Commander'
    - 'bayton-projects'
categories:
    - AMAPI Commander Setup
layout: base.njk
eleventyNavigation:
    order: 4
    title: Get started
---

This guide walks through connecting AMAPI Commander to your Google Cloud project, so you can start querying your Android device fleet.

## Prerequisites

Before you begin, make sure you have:

- A **Google Cloud project** with the [Android Management API](https://developers.google.com/android/management) enabled
- A Google account with sufficient IAM permissions on that project (see below)
- An **OpenAI API key** for the built-in AI assistant

## Step 1: Create an OpenAI API key

The assistant that translates your natural-language queries into AMAPI calls is powered by OpenAI. You'll need a project API key.

1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create a new project API key
3. Copy it somewhere safe — you'll paste it into AMAPI Commander during workspace setup

## Step 2: Configure OAuth consent in Google Cloud

AMAPI Commander authenticates against your Google Cloud project using OAuth. You'll need to configure the OAuth consent screen if you haven't already.

1. Open the [OAuth overview](https://console.cloud.google.com/auth/overview/create) in your Google Cloud console
2. Complete the consent screen configuration for your project

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Head's up</div>

If your project already has an OAuth consent screen configured, you can skip this step.

</div>

## Step 3: Create a Web OAuth client

AMAPI Commander needs a Web application OAuth client to handle the authorisation flow.

1. Open [OAuth clients](https://console.cloud.google.com/auth/clients) in your Google Cloud console
2. Create a new client of type **Web application**
3. Add the following **authorised redirect URI(s)**:

For the hosted multi-tenant platform, the redirect URIs will be displayed on the Connect screen within AMAPI Commander. Add both:

- `https://amapi-commander.bayton.org/auth/google/callback`
- `https://amapi-commander.bayton.org/workspace/google-oauth/callback`

1. Save the **client ID** and **client secret** — you'll need both during workspace configuration

## Step 4: Enable AMAPI MCP and grant IAM roles

The Google account that authorises the workspace needs specific IAM roles on the Cloud project. Run the following commands in [Cloud Shell](https://shell.cloud.google.com/) or your local terminal with the `gcloud` CLI:

**Enable AMAPI MCP beta:**

```bash
gcloud beta services mcp enable androidmanagement.googleapis.com \
  --project=<PROJECT_ID>
```

**Grant required IAM roles:**

```bash
gcloud projects add-iam-policy-binding <PROJECT_ID> \
  --member=user:<YOUR_EMAIL> \
  --role=roles/serviceusage.serviceUsageAdmin

gcloud projects add-iam-policy-binding <PROJECT_ID> \
  --member=user:<YOUR_EMAIL> \
  --role=roles/mcp.toolUser

gcloud projects add-iam-policy-binding <PROJECT_ID> \
  --member=user:<YOUR_EMAIL> \
  --role=roles/androidmanagement.user
```

Replace `<PROJECT_ID>` with your Google Cloud project ID and `<YOUR_EMAIL>` with the Google account email that will authorise the workspace.

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Head's up</div>

If you use custom roles internally, make sure they cover the same access as these three predefined roles: **Service Usage Admin**, **MCP Tool User**, and **Android Management User**.

If your account has admin/owner permissions, the above is not needed.

</div>

For more detail, see the [AMAPI MCP documentation](https://developers.google.com/android/management/use-android-management-mcp).

## Step 5: Log in and create a workspace

When you first open AMAPI Commander, you'll land on the **Connect** screen. The setup has two steps:

### Step 5a: Sign in

On the multi-tenant platform, enter your email address and click **Send Magic Link**. Open the link from your inbox in the same browser session to authenticate.

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Head's up</div>

The platform is invite-only at present, so authentication will fail unless you've been invited in. [Get in touch](/contact) for an invite.

</div>

Once signed in, click **Continue To Workspace Configuration**.

### Step 5b: Configure your workspace

1. **Create a workspace** — give it a name and enter your Google Cloud project ID
2. **Save your OpenAI API key** — paste the key from Step 1 into the OpenAI key field
3. **Save your Google OAuth client credentials** — paste the client ID and client secret from Step 3
4. **Connect Google OAuth** — click **Connect Workspace Google OAuth** and authorise with the Google account that has the IAM roles from Step 4

The workspace setup checklist on screen will track your progress. Once all three items show green (OpenAI Key, Google Client, Google OAuth), you're ready to go.

Click **Proceed To Workspace** to start querying your fleet.

## What you can do next

With your workspace connected, you can ask AMAPI Commander questions in plain English. Here are some examples to get started:

- *"How many devices are enrolled across my project?"*
- *"Show me all devices running Android 13 or older in enterprise `enterpriseId`"*
- *"What policies are currently active?"*
- *"List all enterprises in my project"*
- *"What version of Chrome is deployed across the fleet?"*

The assistant works out which API calls to make, in what order, and how to combine the results. You can also use voice interaction, and larger queries will process in the background automatically.

If you don't wish to engage with the LLM, you can also click around your Google Cloud Project, accessing all enterprises, policies, apps, and devices visually through the dashboard - this is not LLM-driven.

## Enabling cache

Caching will allow temporary storage of your AMAPI project data, encrypted at rest. It is disabled by default to respect privacy, however will **dramatically** increase the responsiveness of the LLM

## Session handling

OAuth is configured to obtain and refresh access to the Google Cloud Project automatically. To disconnect your account from AMAPI Commander, use the **Disconnect** button in Connect under **OAuth States**.

## Troubleshooting

**OAuth fails or returns an error**  
Check that your redirect URIs exactly match what's configured in your Google Cloud OAuth client. Ensure first-party cookies are enabled in your browser.

**"Forbidden" or permission errors when querying**  
Verify that the Google account you authorised with has all three IAM roles assigned on the correct project. The roles must be on the same project ID you entered during workspace creation.

**Assistant returns empty or unhelpful responses**  
Confirm your OpenAI API key is valid and has available credit. You can rotate the key from the workspace configuration screen at any time.

**Assistant is slow or hits API limits**  
Try enabling cache.

For deeper technical detail on the platform architecture, security model, and data flows, see the [Technical Whitepaper](/projects/amapi-commander/support/technical-whitepaper).
