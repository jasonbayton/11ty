---
title: 'Android Enterprise zero-touch DPC extras collection'
date: '2019-01-08T22:20:58+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Resources
layout: base.njk
id: 7377
doccats:
    - Android
discourse_permalink:
    - 'https://discuss.bayton.org/t/android-enterprise-zero-touch-dpc-extras-collection/259'
publish_post_category:
    - '14'
---
DPC extras can be used to associate Android Enterprise fully managed devices with a particular EMM/UEM platform during provisioning.

The following examples offer a complete DPC extra snippet that can be copied and pasted into the zero-touch configuration. The items **in bold** will **need to be edited** to suit your environment, though, otherwise the zero-touch enrolment process will fail.

<div class="callout callout-info">

#### Editing ADMIN EXTRAS BUNDLE

To be of value, the ADMIN\_EXTRAS\_BUNDLE should ideally at least include the server URL or identifier (where appropriate), however lines for username, password, and more can optionally be omitted to allow the config to remain generic.

JSON doesn’t leave room for error – the last line within ADMIN\_EXTRAS\_BUNDLE must not have a trailing comma “,”. See “user” in the MobileIron config has a comma, but “quickstart” does not? If you remove “quickstart”, you’d need to remove the comma from “user” as it then becomes the last line, otherwise it could throw up an error.

</div><div class="callout callout-warning">

#### Trust but verify

Most of these DPC extra collections have been submitted either by EMM vendors or customers of the EMM referenced. The vendor may make changes to the extras they provide **without my knowledge** so it is recommended should the below extras fail to properly work, that you validate with your EMM before contacting me (but do feel free to reach out with updates!)

</div><div class="callout callout-danger">

#### Usernames &amp; passwords

Unless the username and password are stipulated for the purpose of **staging**, they should **not** be included at all due to the potential security risks associated. If an IMEI not belonging to an organisation is mistakenly added (typo, miscommunication, human error), the device will be able to enrol automatically and potentially gain access to corporate resources.

</div>

Google announces zero-touch EMM integration 
--------------------------------------------

For those who consider copying and pasting JSON code a bit of a pain, you’re in luck; Google announced the zero-touch iFrame, allowing EMMs to integrate with a customer zero-touch account, allowing – [amongst other features](/2020/11/google-announce-big-changes-to-zero-touch/) – the ability to manage DPC extras automatically.

Reach out to your vendor to ask when this functionality will be available.

MobileIron
----------

<pre>
{
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE":{
"server":"<strong>your.server.com</strong>",
"user":"<strong>user</strong>",
"quickStart":<strong>true/false</strong>
}
}
</pre>

AirWatch / Workspace One UEM
----------------------------


<pre>{
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE":{
"serverurl":"<strong>your.server.com</strong>",
"gid":"<strong>yourGroupID</strong>",
"un":"<strong>staginguser</strong>",
"pw":"<strong>example</strong>"
}
}
</pre>

SOTI
----


<pre>{
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE":{
"enrollmentId":"<strong>EnrollmentID</strong>"
}
}
</pre>

MaaS360
-------


<pre>{
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE":{
"enrollment_corp_id”:”<strong>CorporateID</strong>”,
”enrollment_account_type":"<strong>userAccount</strong>",
"enrollment_domain":"<strong>domain</strong>",
"enrollment_username”:”<strong>staginguser</strong>”,
"enrollment_email":"<strong>emailaddress@email.com</strong>",
"enrollment_password”:”<strong>example</strong>”,
"enrollment_ownership":"<strong>Corporate Owned</strong>"
}
}
</pre>

Codeproof EMM
-------------


<pre>{
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE":{
"displayname":"<strong>devicename</strong>",
"userid":"<strong>staginguser</strong>".
"password":"<strong>example</strong>"
}
}
</pre>

Intune
------


<pre>{
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE":{
"com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN": "<strong>YourEnrollmentToken</strong>" 
}
}
</pre>

Miradore
--------


<pre>{ 
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
"RegistrationKey": "<strong>REGISTRATIONKEY</strong>",
"EnrollmentKey": "<strong>ENROLLMENTKEY</strong>",
"SiteIdentifier": "<strong>SITEIDENTIFIER</strong>"
}
}
</pre>

BlackBerry UEM
--------------


<pre>{ 
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
"URL":"<strong>SERVERURL</strong>",
"CACFPrint":"<strong>CHECKWITHBB</strong>", 
"stc":"<strong>CHECKWITHBB</strong>", 
"Username":"<strong>USERNAME</strong>"
}
}
</pre>

FAMOC
-----


<pre>{
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": { 
"fqdn":"<strong>your.server.com</strong>", 
"bootstrap_key":"<strong>yourIndividualKey</strong>" 
}
}
</pre>

mySync
------


<pre>{ 
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": { 
"serviceUrl": "<strong>https://server.host.name.here/rest/api</strong>",
"installationCode": "<strong>ten-character-code</strong>" 
}
}
</pre>

XenMobile
---------


<pre>{ 
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": { 
"serverURL":"<strong>URL</strong>", 
"xm_username":"<strong>username</strong>", 
"xm_password":"<strong>password</strong>" 
}
}
</pre>

VXL Fusion UEM
--------------


<pre>{
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": { 
"fusionuem_server_url":"<strong>server url</strong>", 
"fusionuem_token_id":"<strong>token id</strong>"
}
}
</pre>

Samsung Knox Manage
-------------------


<pre>{
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
"ServerUrl": "<strong>Your Server Url</strong>",
"TenantId": <strong>"Your Knox Manage Tenant ID</strong>",
"TenantType": "<strong>M</strong>",
"Method": "<strong>ZeroTouch</strong>"
}
}
</pre>

Chimpa MDM
----------


<pre>{ 
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>, 
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE":{ "chimpa_activationCode":"<strong>YOURTENANTCODE</strong>",
"provisionType":<strong>0/1</strong>, 
"additionalProvisioningText":"<strong>your additional text to show</strong>",
"whiteLabelLogo":"<strong>https://yoururl/resource.png</strong>",
} 
}
</pre>

**provisionType** values:   
0 Fully Managed   
**1** Enhanced Work Profile (Android 11+)

42Gears SureMDM
---------------


<pre>{
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED": <strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE”:{
"AccountId":"<strong>1000001</strong>",
"ServerPath":"<strong>suremdm.42gears.com</strong>"
}
}
</pre>

Meraki Systems Manager
----------------------


<pre>{
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE":{ 
"enrollment_url":"https://m.meraki.com/enroll/?android_from_store=true&enrollment_code=<strong>Your_Meraki_Enrollment_Identifier</strong>"
}
}
</pre>

TinyMDM
-------


<pre>{
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,<strong>
</strong>"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
"enrollmentId": “<strong>XXXXXXXX</strong>"
}
}
</pre>

Matrix42
--------


<pre>{
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":<strong>true/false</strong>,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE":{
"server_url":"<strong>your server URL</strong>", 
"user_name":"<strong>your user name</strong>",
"otp":"<strong>4444</strong>"
}
}
</pre>

Other interesting zero-touch config options
-------------------------------------------

The following additional options go **before** the ADMIN\_EXTRAS\_BUNDLE line and may require EMM support to function:


<pre>"android.app.extra.PROVISIONING_SKIP_EDUCATION_SCREENS":<strong>true/false</strong>, 
"android.app.extra.PROVISIONING_LOCALE":"<strong>en_GB</strong>", 
"android.app.extra.PROVISIONING_USE_MOBILE_DATA":<strong>true/false</strong>,
</pre>

[Here’s a few more.](https://developer.android.com/reference/android/app/admin/DevicePolicyManager.html#EXTRA_PROVISIONING_ACCOUNT_TO_MIGRATE)

Submit zero-touch DPC extras
----------------------------

If you’d like to see your DPC extras added to this list, please fill out [this form](https://goo.gl/forms/igE9wXZFO1qX2qjm1) or comment below.