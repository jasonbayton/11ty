---
 title: "What is Play Auto Install (PAI) in Android and how does it work?"
 date: '2024-03-07'
 status: publish
 author: 'Jason Bayton'
 excerpt: "Have you ever wondered what goes on behind the scenes when you're presented with a list of recommended applications on device setup? Now you'll know."
 type: post
 tags:
     - Enterprise
---
If you have set up a modern Android device, may have come across the list of apps offered by your device just before you finish setup. This is referred to as Play Auto Install and is available to OEMs building certified Android devices.

The list of recommended and required applications suggests (or mandates) a selection of applications the OEM, carrier, or Google consider useful for your Android experience, and is an alternative to the _other_ standard approach of just preloading APKs into the system image.

![](https://cdn.bayton.org/uploads/2024/frame22100.png)

The way the apps are presented can differ, sometimes they're pre-checked with the option to deselect as desired, while sometimes they may be selected (or "included") with no means of de-selecting. The latter you'll often see with the suite of Google applications, but can equally be set as mandatory by the OEM as shown by Motorola's push of Microsoft apps (I promptly uninstalled) above. 

So what's PAI? And why does it matter?

## History

Since the dawn of time, application developers have sought means to ensure their applications and services are put in front of as many people as possible. Whether through ads in your browser or app store, partnerships with other developers or vendors to promote complimentary solutions, or the many other ways the general public has sponsored content thrust at their collective faces in modern society.

At some point this found its way into the sacred space of your personal device. I wouldn't be able to pinpoint exactly when, but an OEM in the early days of Android decided they'd like to offer the option of preloading the applications of partners into the builds of their Android devices, and forever diverged the platform from other popular mobile operating systems in the ecosystem to turn Android into a mule for bloatware.

From that point on devices shipped with applications preloaded within the OEM build of Android; often in the `/system` partition too (though less common as time went on, and partitioning changed in Android overall), which would not only eat into the available partition size defined by the OEM, but do so in a way that was non-removable by users, and with different builds destined for different regions, carriers, or otherwise including differing applications in response to the target market accordingly it added additional complexity to the build processes overall.

It did however as mentioned guarantee the applications preloaded could not be removed (unless apps would occasionally be found in the `/data` partition where they would be removable), and in some cases OEMs would go as far as preventing applications from being disabled as well, the only available means of "removing" a preloaded application that a user would not want on their device.

This still happens today, but it _feels_ less prevalent now than back then. That's not a data-driven statement, don't quote me.

## Drawbacks

Aside from the obvious user distaste for bloatware, for which the ecosystem has mostly come to terms with as a fact an Android device is likely to ship with apps and services they don't want; particularly in the case of carrier-subsidised devices where bloat is prolific? In the context of PAI there are known drawbacks to preloading apps in the system build:

**It uses space** - As mentioned above, but a little more detail: You can argue a 10MB Android app isn't making all that difference to the device as a whole, but again pre 9.0, where partitions were defined manually, there were real implications to this. Apps grow over time, and even if the preloaded app does _not_, it shares the partition with system applications, the GMS suite of apps, and more. Once a device is out in the wild the partitions can't be changed (pre-10!), and every OTA delivered must meet the size requirement of the partition it'll be installed on. From Android 10 this limitation went away, though you're still taking space from the user.

<div class="callout"> 

A real example of this was with the original 8" tablet I worked to bring to market way back in 2020 on Android 9.0. Although the 32GB of on-board storage was plentiful, the system partitions were sized conservatively to provide more available storage for customers. This was _fine_ for the first year or two, but with the Android 10 upgrade almost all of the available space was exhausted. As updates through the year were pushed, and the GMS core suite of apps were updated with newer, larger APKs, it shrunk to the point an Android 11 upgrade would not have been feasible. 

Now again this is in the context of Android 9.0, where partitions were fixed, Android 10 introduced dynamic partitions further improved in 11, but this could not be leveraged on a device that shipped with fixed partitions. To adjust the partition layout would have required devices are sent in for repair, flashed with a version of Android 10 that implemented dynamic partitioning, and then 11, 12, 13, etc would have worked absolutely fine, at the ongoing cost of shrinking user-available storage (but still nothing compared to the gargantuan sizes of Android builds from the likes of Samsung!). 

I didn't ship bloat with my hardware, opting instead to lean on PAI to offer them up, which will be covered more below. I did however have a couple of system applications developed; an activation service, and an OEMConfig app, that were preinstalled.

</div>

**It's inflexible** - Once preloaded into a build, it's a permanent fixture of _that build_. If there are issues with the application - be that usability or security - it's going to be present every time a device running that build of Android is set up from a factory state. Obviously most applications will have a Google Play listing so the ability to update it after setup is a given, however until the OEM updates their build a new version of that application, and the OTA proliferates across their in-market devices, the risk remains.

**It's inflexible (cont)** - Partnerships end, and the money stops flowing. Whether being paid for a period of time, or based on activations, the application preloaded into the Android build is - as above - a permanent fixture of that build. It can be removed in an update, of course, but for the time it's there, that works against the OEM (but very much in favour of the app developer)

So how does PAI make this better?

## What is PAI?

PAI - Play Auto Install - is a partner service provided by Google that allows an OEM to configure applications recommended (or required) _without_ preloading those applications in the Android build. 

Rather, the OEM builds a simple system app with a default PAI configuration, and then uses the PAI (or Android Device Configuration) portal to provide the ongoing management of it. 

Within the portal, the OEM can target:

- Region
- Carrier
- Build (Fingerprint)
  - And by extension, OS version, custom builds for customers, etc.
- OEM key (a value OEMs can set within their builds for customisation purposes, try an `adb shell getprop | grep oem.key` on your Android device to see yours)

And more. There's a considerable amount of flexibility to allow for granular targeting, and new versions of configurations can be published in a few clicks that in turn deploy immediately to devices. 

## An example app config

Here's an example PAI application config. This below, incomplete example of a configuration follows a format similar to how I configured PAI with my products in the past, with the intention to _offer_ applications to allow rapid enrolment without requiring a Google account (PAI allows for install without an account configured!), but allowing the user to skip the screen and install nothing if so desired. 

<div class="callout"> 

Why offer this? 

I was building devices with a primary use case for enterprise deployment. Although the likelihood was slim, my view was should a customer wish to use one of the tablets for both work and personal reasons, they could opt to set it up as a standard consumer device, and rapidly pull in the relevant DPC to enrol almost immediately without needing to head over to Google Play and locate the relevant agent themselves.

Did it get much use? I don't think so. But it was an opportunity to test PAI and so I gave it a go.

</div>

In the screenshot above you see Google, followed by Motorola. This order and layout is configured within the app (not shown below), along with the desired default applications to be offered as follows, in a file called `default_layout.xml` in most of the PAI apps I've torn down:

```
<?xml version="1.0" encoding="utf-8"?>
<workspace>
    <autoinstall packageName="com.lookout.enterprise" className="com.lookout.enterprise.ui.android.activity.DispatchActivity" screen="2" x="0" y="4" groupid="0" requiredPreload="false" installByDefault="false" />
    <autoinstall packageName="com.fiberlink.maas360.android.control" className="com.fiberlink.maas360.android.control.ui.SplashActivity" screen="2" x="1" y="4" groupid="0" requiredPreload="false" installByDefault="false" />
    <autoinstall packageName="com.miradore.client.v2" className="com.miradore.client.ui.AuthenticationActivity" screen="2" x="2" y="4" groupid="0" requiredPreload="false" installByDefault="false" />
    <autoinstall packageName="net.soti.mobicontrol.androidwork" className="net.soti.mobicontrol.startup.SplashActivity" screen="2" x="3" y="4" groupid="0" requiredPreload="false" installByDefault="false" />
    <autoinstall packageName="com.mobileiron" className="com.mobileiron.MIClientMain" screen="2" x="4" y="4" groupid="0" requiredPreload="false" installByDefault="false" />
    <autoinstall packageName="com.mobileiron.anyware.android" className="com.mobileiron.polaris.manager.ui.StartActivity" screen="2" x="5" y="4" groupid="0" requiredPreload="false" installByDefault="false" />
    <autoinstall packageName="com.rim.mobilefusion.client" className="com.blackberry.ema.ui.HomeActivity" screen="2" x="1" y="3" groupid="0" requiredPreload="false" installByDefault="false" />
    <autoinstall packageName="com.zenprise" className="com.citrix.work.common.activities.LauncherActivity" screen="2" x="2" y="3" groupid="0" requiredPreload="false" installByDefault="false" />
    <autoinstall packageName="com.airwatch.androidagent" className="com.airwatch.agent.ui.activity.SplashActivity" screen="2" x="3" y="3" groupid="1" requiredPreload="false" installByDefault="false" />
    <autoinstall packageName="com.microsoft.windowsintune.companyportal" className="com.microsoft.windowsintune.companyportal.views.SplashActivity" screen="2" x="4" y="3" groupid="1" requiredPreload="false" installByDefault="false" />
</workspace>
```

As you can see in the above, the two configs - beyond defining the apps themselves - are `installByDefault` and `requiredPreload`. 

`installByDefault` is as it sounds, the application will be pulled down to the device automatically, and allows no user customisation.  
`requiredPreload` if `false` allows the user to uncheck it, `true` marks it mandatory.

When this application is imported into the PAI Android Device Configuration portal, you end up with something that looks like this: 

![](https://cdn.bayton.org/uploads%2F2024%2FScreenshot_2024-03-07.png)  
_Above: An example of the type of PAI config I provided with devices_

As an OEM, you don't technically _have_ to define the applications in the app config, because once imported, the portal will allow full application selection and the ability to override the configuration either way. If you look closely above you'll notice there are no references to `config` or `activation` in the app config, they were instead added through the portal.

Additionally, with this config you can also define Google and Carrier apps accordingly.

## How is it better?

There are a few benefits to this approach

**It can be adjusted at any time** - Whether contracts for distribution end, a known issue is discovered, or any other reason an OEM may choose to cease deploying an application with their devices, it takes 5 minutes to edit and publish an updated PAI config, and no devices being set up from that moment will see the delisted application.

**It's pushy, but not prohibitive** - OEMs can mandate the installation of applications, but users retain the control to remove them if desired. Of course there are _other_ means of preventing apps from being removed in the OS that can be leveraged with PAI, so if they wanted to, they could still choose to make users miserable.

**There's no storage sacrifice** - Predominantly a benefit for older OS versions, but all the same since apps are not being preloaded, they're not permanently taking up space within the build.

**There's more flexibility** - Apps can be offered without an install mandate. If developers want exposure, that's a reasonable, no-friction way of offering up your app without making the user feel like they need to take it.

**It's simpler** - You take all of the build-specific app-preload configuration and processes away from the OS developers, and handle it independently. If builds are being generated predominantly on preloaded applications (and if you know the dedicated world, you know that's not an unreasonable assumption), you can - in tandem with carrier and [Runtime Resource Overlays](https://source.android.com/docs/core/runtime/rros) handle a _considerable_ amount of application and system customisation without needing to run multiple unique OS builds for it.

## To conclude

If you weren't aware of Play Auto Install before this, hopefully this offers some insight into what it is, any why you might [see apps on your device](https://android.stackexchange.com/questions/234004/what-is-the-application-playautoinstalls) with a name like `PlayAutoInstalls`. That said, OEMs can name them anything, so I wouldn't advocate checking for exactly that name in your system apps (but the package name is more likely to be consistent, following the convention of `android.autoinstalls.config`, have a look on your device with an ADB command like `adb shell pm list packages | grep autoinstall`)

It'll be a safe app to have there, but equally one safe to remove if you're rooted, as the StackExchange thread asks above.

Moreover, it's a better and more efficient way of handling app installs without preloading APKs into the Android build, and more OEMs should leverage it where preloading is otherwise in use.