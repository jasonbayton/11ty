---
title: 'Set up an AMAPI Google Cloud Platform project'
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
To begin, a Google account is required.

NOTE: Any account can be used but it cannot be linked to any existing setup. To clear an account, remove any enterprise settings linked to the account on this page: https://play.google.com/work/adminsettings. For more details, see First step: Create a Google account.

To create and configure a Google Console project:

Create a Google Console project and enable the Android Management API and other Google APIs required for the integration.
Sign in to the Google API Console using this page: https://console.cloud.google.com/.
Create a project.


NOTE: Your Google project has a name and an ID. While you can choose any name for your project, even if there are one or more Google projects with that same name, Google always associates it with a unique project ID. If you use a generic name, such as MyTestProject, your project ID will be comprised of the project name and a distinctive suffix (such as mytestproject-35325), to ensure the project is unique.

Enable required APIs.
In the left-hand navigation menu, choose APIs & Services > Enabled APIs & services, then click ENABLE APIS AND SERVICES.
To enable an API, in the API Library view that appears, type the API name in the Search box. Next, in the list of results click the API name, and in the API view that appears, click Enable. Use this procedure to enable the following APIs:
Android Management API
Cloud Pub/Sub API
Cloud Resource Manager API
Create a Google Service Account.
A service account allows Your EMM project to perform the initial setup and also communicate with the Android Management API.

Go to the Google API Console using this page: https://console.cloud.google.com/.
In the left-hand navigation menu, click IAM & Admin to open the IAM & Admin page. If prompted, select the project that has the Android Management API enabled.
In the navigation menu, click Service Accounts to go to the Service Accounts page.
At the top of the screen, click CREATE SERVICE ACCOUNT to create a new service account. Then, type a name for your service account.
Grant the following roles to the new service account:
Service Account User: Grant the service account access to the newly created Google Console project. It also allows the Android Device Policy app permission to send notifications to Your EMM project.
Android Management User: Allows the service account to access the Android Management API.
Pub/Sub Editor: Allows Your EMM project to set up the topic and subscriptions used to send notifications from the Android Management API to Your EMM project.
Project IAM Admin: Required to configure additional security options on the notifications coming from the Android Management API.
Click Done.
Verify that the newly created service account is listed under View By Principals.
Grant the Android Device Policy permissions to publish to Pub/Sub topics.
Click GRANT ACCESS and in the view that appears, in the Add principals area, type android-cloud-policy@system.gserviceaccount.com.
In the Assign Roles area, grant the android-cloud-policy@system.gserviceaccount.com account the Pub/Sub Publisher role, then click SAVE.
The service account area refreshes, showing a list of roles similar to the following:



Create a secret key. A secret key allows secure communication between Your EMM project and the Android Management API.
Go to the Google API Console using this page: https://console.cloud.google.com/.
Navigate to IAM & Admin > Service Accounts.
Select the newly created service account, and select Manage keys.
On the KEYS tab that appears, choose ADD KEY > Create new key.
Alternatively, you can upload an existing key.

Select the JSON key type.
Click CREATE to download the generated key file.
Ensure the Google quota meets your needs. Google limits the queries available for AMAPI devices to 1000 queries per 100 seconds, or 600 requests per minute. This can be increased but requires a submission to Google.
