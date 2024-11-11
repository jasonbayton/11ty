---
title: 'Honor Play Android Enterprise validation report'
published: '2019-03-27T11:14:48+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Hardware validation
layout: base.njk
eleventyNavigation:
  key: 'Honor Play'
  order: 6000
discourse_permalink:
    - 'https://discuss.bayton.org/t/honor-play-android-enterprise-validation-report/281'
publish_post_category:
    - '14'
---
**Model**: Honor Play COR-L29 (4GB RAM, 64GB storage)  
**Acquired**: Early November 2018 (tested March 2019)  
**OS**: Android 9.0 Pie (EMUI 9.0.0)  
**Build**: 9.0.0.161   
**Security**: 1 Jan 2019

This device has been tested against the public [validation process](/android/android-enterprise-device-support/validation-process-and-information/), and the following mix of (non-exhaustive) issues and recommendations have been noted:

## 1. Notable problems

### 1.1. Permission prompt to disable bluetooth radio

When retrospectively applying a policy to disable the bluetooth radio as a fully managed device, the device requests permission from the end-user to do so. This can be denied and bluetooth remains active, though the prompt does frequently reappear.

![](https://cdn.bayton.org/uploads/2019/03/Screenshot_20190326_225851_com.android.settings-e1553678642392.jpg)

When proactively applied (policy set from point of enrolment) this doesn’t happen.

### 1.2. Face unlock restriction not enforced

Despite being restricted in two ways – an API for [Smartlock](/android/what-is-android-smartlock-and-why-should-it-be-disabled/) and APIs for Samsung/Android 9.0, Huawei’s face unlock implementation ignores both.

![](https://cdn.bayton.org/uploads/2019/03/image-3.png)

As such, the basic and arguably insecure implementation on the Honor Play is able to be used against policy.

## 2. Provisioning methods

### 2.1. QR code provisioning

During QR code provisioning the wizard interjects briefly with two screens which need to be tapped away.

![](https://cdn.bayton.org/uploads/2019/03/Screenshot_20190326_233941_com.huawei.hwstartupguide.jpg)

The process otherwise runs without issue, and behaves as expected.

### 2.2. Zero-touch provisioning

Zero-touch provisioning **is possible**, however the manufacturer ID must be Honor’s parent company, Huawei, when importing devices into the zero-touch portal.

The only recommendation would be to reorder the setup wizard somewhat, it should not be necessary to navigate through a number of steps before even being prompted for Wi-Fi (which does not auto-continue once connected, requiring one more manual tap).

![](https://cdn.bayton.org/uploads/2019/03/Screenshot_20190326_233941_com.huawei.hwstartupguide.jpg)

![](https://cdn.bayton.org/uploads/2019/03/Screenshot_20190327_095232_com.huawei.hidisk.jpg)

![](https://cdn.bayton.org/uploads/2019/03/Screenshot_20190327_095248_com.android.settings.jpg)

Zero-touch provisioning is otherwise successful with no issues noted.

## 3. Deployment scenarios

### 3.1. Fully managed

This applies to fully managed, fully managed with work profile (COPE) and dedicated (COSU) unless otherwise stated.

A. Bluetooth radio may be used after restrospectively being disabled (1.1, MI Core)

B. Face unlock restriction is not enforced (1.2, MI Core, WS1 UEM).

C. Gallery app is defined as a mandatory system app, and so is present in fully managed deployment scenarios.

### 3.2. Work profile

A. The policy to prohibit app installation on the device is not enforced, as such any downloaded APK from the internet may be installed on a work profile device (MI Core, WS1 UEM).

![](https://cdn.bayton.org/uploads/2019/03/Screenshot_20190327-103031.png)
As tested on a Nokia 8.1

![](https://cdn.bayton.org/uploads/2019/03/honorcrop.jpg)

As tested on the Honor Play

## 4. Recommendation

Based on the findings above, the Honor Play may be used **with caution**.

Although it does respect and implement all other restrictions and policies not noted in the issues list above, there are notable restrictions which do not enforce, or enforce unreliably.

Should those issues mentioned above offer no cause for concern with regards to corporate policies in place, there should be no major concern in considering corporate support for this device, though my recommendation would be more a work profile (BYOD) deployment over fully managed, as this device is not Android Enterprise Recommended, and the Honor sub-brand is not enterprise-focused.