---
title: 'Understanding system app availability on managed devices'
published: '2020-04-09'
status: publish
author: 'Jason Bayton'
excerpt: 'Something that defines the experience of a managed device, and is oft-unexplained. Vital apps are key to ensuring a device offers a suitable enterprise environment.'
type: documentation
tags: 
    - Fully managed
layout: base.njk
eleventyNavigation:
  order: 7000
---
By design, Android Enterprise fully managed devices remove most of the preloaded applications on a device during the provisioning process, and inflated work profiles provide a limited selection of applications by default. It has been this way since the very beginning.

The idea behind this is simple; managed devices for enterprise use do not require - for the most part - the bloatware that's shipped with consumer Android devices to be present within the _enterprise_ profile. That's the parent profile on a fully managed device, and a work profile on a company or personally owned device permitting personal use. Netflix, Facebook, any number of preloaded AV solutions, you name it. It's all surplus to requirements, uses device storage, consumes data, potentially poses security implications (preloaded cloud file managers like OneDrive, Google Drive, Dropbox, etc are freely available), and generally detracts from what is expected to be a device designed for business use only. 

In theory there's a strong argument for designing this default behaviour, and I'm an advocate for it; it saves me time personally not needing to worry about blocklisting every possibly-preloaded application across my managed estate. The reality however has shown there are friction points and mixed expectations on how this experience is offered. 

## How it works

During device provisioning (for company owned devices), if an organisation creating zero-touch, QR, NFC, or other OOBE (out of box experience) solution configurations don't explicitly allow system applications, the device is provisioned in a way that disables _anything_ the device considers to be non-vital. 

You can test this yourself with my [QR code generator](/qr-generator/) by toggling the `Enable system apps` provisioning option, which will output JSON as follows when checked: 

```JSON
{
  "android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED": true/false,
}
```

This option - again by default for managed devices set to `false`, tells the device to disable anything non-vital to the operation of the device.

For the work profile experience, applications populated in the work profile when inflated do not have the same all-or-nothing configuration option; it is configured based on the configuration of the device only.

<div class="callout">

Note: System apps are never fully removed from a device, as the form part of the system image. Instead, they're disabled and hidden from the provisioned user of the device. You will always find these applications if you go looking, but they'll be inaccessible and will have no ability to function unless enabled through policy.

</div>

## What's vital?

You may notice I've emphasised that the ultimate inclusion (or lack of) apps comes down to the device, and this forms the basis of inconsistencies and friction points with organisations, because there's a reasonable amount of flexibility offered by Google on just _how_ this should be set up.

When I think of a vital environment for organisations as a catch-all I think - 

- Dialler 
- Messages
- Camera
- Gallery/viewer
- File manager
- Contacts 
- Settings

Some of these are use case dependent, I don't need a dialler, messages, contacts or possibly camera on a dedicated, POS device for example.. but they're pretty critical on a standard knowledge worker device in which the typical functions of a smartphone are expected. All but settings I'd expect within a work profile also, particularly with SIM management introduced in Android 14.

Google come pretty close with their requirements, in fact going a little overboard on their own services with the inclusion of wellbeing and the Google app: 

**Fully managed**

- Google Play services (GmsCore)
- Google Play Store
- Google Setup Wizard
- Default contacts app
- Default downloads app
- Default dialer
- Default launcher
- Default settings
- Google app 
- Android Auto

**Work profile**

- Google Play services (GmsCore)
- Google Play Store
- Google Setup Wizard
- Default contacts app
- Default downloads app
- Default wellbeing app
- Google app 
- Android Auto

These applications are configured through XML files owned and maintained within the Android build of the device by the OEM, with the respective Google apps already pre-added. 

The OEM is then free to add, or remove, system applications through these files:  

`vendor_required_apps_managed_[device|profile|user].xml`  
`vendor_disallowed_apps_managed_[device|profile|user].xml`

And thus, inconsistency is born. 

You'll notice there's no reference to camera, gallery, or file manager in the above lists. If they show up on a managed device it is because the OEM has decided to include it. Often the OEM will include their camera, but not their gallery. This gives organisations the ability to take photos, but not view them.

<div class="callout">

It's worth noting in Android 15, Google is mandating a document viewing app be present by default, which includes image file types amongst others that may make things better for organisations missing a preloaded gallery/image viewer in Android 14 and below. It won't fix the shortcut from camera preview not opening a gallery, but it'll make it easier to switch to the file manager, and open the app in the document viewing app. Progress.

</div>

This is _also_ why devices will occasionally show up with Facebook, or OEM services, in the managed profile - the OEM, either knowingly or not, has configured these applications as vital in the respective `XML` files and this hasn't been picked up through the GMS/Play Protect certification process.

## Navigating inconsistency

If you find yourself with devices either showing surplus/unsuitable apps, or missing applications vital to productivity, there are options:

### Leverage system app management

Most EMM platforms worth their salt will have system app management in place. It will in most cases require you to input the package name of an application (easily fetched through `ADB`, or for a more user-friendly experience, an app like [Package Name Viewer](https://play.google.com/store/apps/details?id=com.csdroid.pkg)). Through this process you are able to both enable applications missing, and disable applications not suitable for the environment or use case. This can be done on an app-by-app basis, so is also worth considering the number of apps to be enabled/disabled, and opting for the provisioning option that poses the least amount of effort (if you're enabling 20 apps, perhaps enabling system apps and disabling 5 unwanted may be a smarter option).

### Deploy a 3rd party alternative

It's not the best solution or experience, but in lieu of system app management in an EMM this is the next best thing. By deploying a 3rd party public app from Google Play you are able to restore functionality. In many cases the system app that you want to enable will be in Play also, so an alternative may not be required!

### Switch from disabled to enabled, or vice versa

If you really end up in a jam with no alternatives, reprovisioning a fully managed device to change the `PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED` option according to your use case may be the only course of action. Unfortunately this won't work for work profiles.

## Get in touch

If you're struggling with system apps and would like help or advice, feel free to [get in touch](/support).