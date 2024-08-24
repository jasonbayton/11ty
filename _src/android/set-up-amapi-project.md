---
title: 'Set up an AMAPI project in Google Cloud'
published: '2024-01-09'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Development
permalink: false
layout: base.njk
eleventyExcludeFromCollections: true
eleventyNavigation:
  order: 7000
---
Are you looking to build a new EMM? Or just interested in testing the API directly without all of the baggage existing vendors drape atop AMAPI? Whatever the reason, spinning up an AMAPI project is reasonably quick and straight-forward. Here's how it's done:

## Create and configure a Google Console project:

1. Head to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a Google Console project, providing a project name and following the steps to complete project creation

Be cognizant of the project name, and more importantly the ID, you provide here. When binding customers are presented with the project ID and if it's left to be randomly generated, customers may be asked to bind to `massive-broccoli-2449822` instead of `serious-mdm-company` or the like. You have the option to edit and confirm a name and ID, please ensure you do so with consideration of this.

3. Enable the required APIs:

## Enable required APIs.

1. In the left-hand navigation menu, choose APIs & Services > Enabled APIs & services, then click ENABLE APIS AND SERVICES.
2. To enable an API, in the API Library view that appears, type the API name in the Search box. Next, in the list of results click the API name, and in the API view that appears, click Enable. Use this procedure to enable the following APIs:
   1. Android Management API
   2. Cloud Pub/Sub API
   3. Cloud Resource Manager API

## Create a Google Service Account. 

A service account allows Your EMM project to perform the initial setup and also communicate with the Android Management API.
1. Go to the Google API Console using this page: https://console.cloud.google.com/.
2. In the left-hand navigation menu, click IAM & Admin to open the IAM & Admin page. If prompted, select the project that has the Android Management API enabled.
3. In the navigation menu, click Service Accounts to go to the Service Accounts page.
4. At the top of the screen, click CREATE SERVICE ACCOUNT to create a new service account. Then, type a name for your service account.
5. Grant the following roles to the new service account:
   1. Service Account User: Grant the service account access to the newly created Google Console project. It also allows the Android Device Policy app permission to send notifications to Your EMM project.
   2. Android Management User: Allows the service account to access the Android Management API.
   3. Pub/Sub Editor: Allows Your EMM project to set up the topic and subscriptions used to send notifications from the Android Management API to Your EMM project.
   4. Project IAM Admin: Required to configure additional security options on the notifications coming from the Android Management API.
6. Click Done.
7. Verify that the newly created service account is listed under View By Principals.
8. Grant the Android Device Policy permissions to publish to Pub/Sub topics.
   1. Click GRANT ACCESS and in the view that appears, in the Add principals area, type android-cloud-policy@system.gserviceaccount.com.
   2. In the Assign Roles area, grant the android-cloud-policy@system.gserviceaccount.com account the Pub/Sub Publisher role, then click SAVE.

The service account area refreshes, showing a list of roles similar to the following:

1. Create a secret key. A secret key allows secure communication between Your EMM project and the Android Management API.
2. Go to the Google API Console using this page: https://console.cloud.google.com/.
3. Navigate to IAM & Admin > Service Accounts.
4. Select the newly created service account, and select Manage keys.
5. On the KEYS tab that appears, choose ADD KEY > Create new key.
6. Alternatively, you can upload an existing key.
7. Select the JSON key type.
8. Click CREATE to download the generated key file.
9. Ensure the Google quota meets your needs. Google limits the queries available for AMAPI devices to 1000 queries per 100 seconds, or 600 requests per minute. This can be increased but requires a submission to Google.