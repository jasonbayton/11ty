---
title: 'Set up an AMAPI project in Google Cloud'
published: '2024-01-09'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - Development
layout: base.njk
eleventyNavigation:
  order: 7000
---
Are you looking to build a new EMM? Or just interested in testing the API directly without all of the baggage existing vendors drape atop AMAPI? Whatever the reason, spinning up an AMAPI project is reasonably quick and straight-forward. Here's how it's done.

<div class="callout callout-orange">
<div class="callout-heading">Prerequisites</div>

Before starting, be aware that effective **1 November 2025**, Google requires **Android Enterprise registration and approval** before devices can enrol through AMAPI. You'll need to complete a [request form](https://goo.gle/android-enterprise-response) and receive approval from Google before devices will successfully provision. You can set the project up in the meantime, but don't expect device enrolments to work until approval is granted.

The default device quota for new AMAPI projects is **0 devices**. You will need to submit a business justification to Google to request an initial allocation (up to 500 devices); exceeding 500 devices requires a separate Android Enterprise application. Quota is granted for a maximum of 2 projects per developer, to support separation of development and production environments.

</div>

## Create the Cloud project

Head to the [Cloud Console](https://console.cloud.google.com/) and create a new project. The one thing worth dwelling on here is the project **ID**: this is the identifier customers are shown during enterprise signup, so `serious-mdm-company` reads considerably better than the randomly-generated `massive-broccoli-2449822` you'll otherwise be assigned. You can edit both name and ID before confirming - do.

## Enable the APIs

Inside your new project, enable:

- **Android Management API** - the core API for managing Android Enterprise devices
- **Cloud Pub/Sub API** - required if you'll receive notifications (you should, see below)

Google's own setup documentation only mandates the first; Pub/Sub is conditional on whether you want push notifications from AMAPI rather than polling.

## Create a service account

AMAPI is a server-to-server API, so your EMM will authenticate as a service account rather than an interactive user. Create one under **IAM & Admin > Service Accounts** and grant it the **Android Management User** role. Per Google's [official documentation](https://developers.google.com/android/management/service-account), that is the only role required to access AMAPI - every call your EMM makes will authenticate as this account.

If the same service account will be handling related infrastructure tasks on your behalf you might additionally grant it **Pub/Sub Editor** (to create topics and subscriptions programmatically) or **Project IAM Admin** (to programmatically grant the Android Device Policy publisher permission described below). Both are convenience, not necessity - those tasks can equally be handled manually through the console.

With the service account created, generate a **JSON key** from its **KEYS** tab (**ADD KEY > Create new key > JSON**). The file downloads once and cannot be retrieved again - treat it like a password.

<div class="callout callout-red">
<div class="callout-heading">Keep this key secure</div>

The JSON key file grants full access to your AMAPI project. Store it securely and never commit it to version control. If the key is compromised, immediately delete it from the Cloud Console and create a new one.

</div>

## Create an enterprise binding

An enterprise binding is what links a specific organisation to your AMAPI project and enables device management. It's created through a two-step handshake between your EMM and Google.

**Step one: request a signup URL.** Call `signupUrls.create` with your `projectId` and a `callbackUrl` - an HTTPS URL you control that the signup wizard will redirect to once the admin finishes. `adminEmail` and `allowedDomains[]` are optional extras. The API returns a `SignupUrl` resource containing a `url` (point your IT admin at this) and a `name` (hold on to this for step two).

**Step two: complete registration.** The IT admin visits the signup URL, signs into a Google account, and works through the enterprise registration flow. On completion they're redirected to your `callbackUrl` with an `enterpriseToken` appended as a query parameter. Your server picks up that token and calls `enterprises.create`, passing both the `enterpriseToken` and the `signupUrlName` (the `name` from step one). At this point you can also set `enterpriseDisplayName`, `logo` (an image shown during device provisioning), and `primaryColor` (an RGB colour used in the device management app UI) for branding.

The response is the newly-created `Enterprise` resource; its `name` field - formatted `enterprises/{enterpriseId}` - is the handle you'll use for every subsequent API call against this organisation.

<div class="callout callout-blue">
<div class="callout-heading">Enterprise types</div>

From mid-2024, the new customer signup flow creates a zero-cost managed Google domain by default for all new binds. Previously, organisations could choose between a managed Google domain (requiring domain verification) and managed Google Play Accounts (no domain required). For more on the differences, see the [glossary entries for managed Google domain and managed Google Play Accounts enterprise](/android/android-glossary/#managed-google-domain).

</div>

## Set up Pub/Sub notifications

Notifications let AMAPI push events to you - `ENROLLMENT`, `STATUS_REPORT`, `COMMAND`, `USAGE_LOGS`, and `ENTERPRISE_UPGRADE` - rather than you having to poll for changes. Strongly recommended for any production implementation.

There are three pieces to wire up: a Pub/Sub topic in your project, a subscription against that topic (push or pull, whichever suits your architecture), and a patch on the enterprise resource to tell AMAPI where to deliver.

Before AMAPI can publish, **Android Device Policy** needs permission to write to your topic. ADP's principal is `android-cloud-policy@system.gserviceaccount.com`; grant it the **Pub/Sub Publisher** role, ideally on the topic itself for least privilege, or at project level via the IAM page if you'd rather grant once and forget. If you miss this step, the patch below will appear to succeed but notifications will silently fail to arrive - it's a common trip-up.

With the publisher grant in place, patch the enterprise to enable notifications:

```http
PATCH /v1/enterprises/{enterpriseId}?updateMask=pubsubTopic,enabledNotificationTypes

{
  "pubsubTopic": "projects/YOUR_PROJECT_ID/topics/amapi-notifications",
  "enabledNotificationTypes": ["ENROLLMENT", "STATUS_REPORT", "COMMAND", "USAGE_LOGS", "ENTERPRISE_UPGRADE"]
}
```

## Understand your quotas

There are two distinct quotas to keep in mind: **device quotas** (how many devices your project can enrol) and **query quotas** (how many API calls you can make).

**Device quotas** are covered in the prerequisites callout at the top of this guide: new projects start at 0, initial allocations go up to 500 with business justification, and anything beyond that requires an Android Enterprise application. See Google's [permissible usage](https://developers.google.com/android/management/permissible-usage) page for the full policy.

**Query quotas** default to **1,000 queries per 100 seconds** per project, plus a per-resource limit of **60 queries per minute** - where a resource is the same combination of API action, EMM ID, Enterprise ID, Policy ID or Device ID. For most testing and small deployments these defaults are sufficient. Query quota increases can be requested through the Cloud Console under **APIs & Services > Android Management API > Quotas**.

## What's next

With the project configured, you're ready to start creating policies and enrolling devices. Google provides a helpful [quickstart Colab notebook](https://developers.google.com/android/management/quickstart) that walks through enrolling an enterprise, creating a policy, and provisioning a device end to end.

Key next steps include:

- **Create a policy** - define device restrictions, app installations, and compliance rules
- **Generate an enrolment token** - used to provision devices against your enterprise
- **Provision a device** - test the enrolment flow using QR code or zero-touch
- **Monitor events** - verify Pub/Sub notifications are flowing correctly

For the full API reference, see the [Android Management API documentation](https://developers.google.com/android/management/reference/rest).
