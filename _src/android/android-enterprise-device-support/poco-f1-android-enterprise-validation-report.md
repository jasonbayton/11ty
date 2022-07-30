---
title: 'POCO F1 Android Enterprise validation report'
date: '2018-11-14T22:10:04+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Getting started
layout: base.njk
id: 7033
doccats:
    - Android
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/poco-f1-android-enterprise-validation-report/239'
---
**Model**: POCOPHONE F1 M1805E10A (6GB RAM, 128GB storage)   
**Acquired**: Early November  
**OS**: Android 8.1.0 Oreo (MIUI 10.0.4.0)  
**Build**: OPM1.171019.026  
**Security**: 1 October 2018

This device has been tested against the public [validation process](/docs/enterprise-mobility/android/android-enterprise-device-support/validation-process-and-information/), and the following mix of (non-exhaustive) issues and recommendations have been noted:

1. Notable problems
-------------------

### 1.1. EMM token provisioning loop

Upon attempting to complete EMM token (DPC identifier) provisioning, the device fails to complete and returns to an earlier point in the setup wizard.

This will continue until the device is factory reset via recovery (power + vol up on this device).

2. Provisioning methods
-----------------------

No fully managed (work-managed) provisioning methods are supported on the POCO F1.

### 2.1. NFC

There is no NFC radio on the device, thus not supported.

### 2.2. QR code

Does not initiate.

### 2.3. EMM Token

Fails to provision, results in a loop which cannot be escaped without a factory reset via recovery (see 1.1)

### 2.4. Zero-touch

This provisioning method is not supported

### 2.5. Managed Google account

Despite EMM token provisioning failing, when provisioning fully managed (work-managed) with a managed Google account, the device brings down the Google DPC without issue, however the setup wizard continues to interject throughout this process, which it should not do.

3. Deployment Scenarios
-----------------------

### 3.1. Fully managed

A. The policy to enforce encryption at boot (requiring a passcode to turn on the device) is not enforced, and has to be set manually.

### 3.2. Work profile

A. Work widgets are not available

B. Deployed VPN connection requests credentials storage password, after which the VPN app crashes if a password is input, or continues to prompt if cancelled

C. No work app folder is created on the home screen

D. Work applications show placeholder icons:

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/../uploads/2018/11/Screenshot_2018-11-14-12-12-26-433_com.mi_.android.globallauncher-e1542232766860.png)### 3.3. Fully managed with work profile

Unable to test due to provisioning issues.

### 3.4. COSU (Dedicated)  


Unable to test due to provisioning issues.

4. Recommendation
-----------------

Based on the findings above, **it is not recommended** to use the Pocophone F1 in the enterprise.

As a fully managed device, it was only possible to provision it in this way via managed Google accounts, rather than the more popular and easier to implement managed Google Play accounts; without NFC, QR and EMM token provisioning methods available (the latter actively causing a loop) the device is basically unsuitable, even if it does enforce almost all of the limited number of restrictions offered by G Suite.

As a BYO device it behaved far better, however basic expectations such correct app icons and a work folder created on the home screen let it down. Furthermore, limited VPN testing highlighted a potential issue with certificate authentication.