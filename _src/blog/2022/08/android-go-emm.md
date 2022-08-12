---
title: 'Android Go & EMM support'
date: '2022-08-12T22:42:00+00:00'
status: publish
author: 'Jason Bayton'
excerpt: 'VMware recently announced "official" support for Android Go, the resource-mindful implementation of Android for lower-end devices. What does this mean for Android Go support over all, and does Android Go require dedicated support within the Android Ecosystem? (Hint: No).'
type: post
tags:
    - Enterprise
---
[Android Go edition](https://www.android.com/versions/go-edition/) has been around for a while. Launched way back in 2017 as a successor to [Android One](/android/what-is-android-one/) as the One programme underwent it's own evolution into what we have today, Android Go took over as the flavour of Android for low-end devices. While originally memory requirements to qualify for Go were very low - anything under 1GB - today any device launching with 2GB RAM or under can only be certified for Go. 

In spite of common misconceptions, certainly not aided by folks like the [NCSC publishing incorrect information](https://www.ncsc.gov.uk/blog-post/ready-set-android-go), Android Go _does in fact_ support Android Enterprise. But not fully by default. 

🟢 Fully Managed  
🟢 Dedicated (COSU)  
🟠 Work profile  
🟠 Work profile on company owned devices (COPE, WPoCOD) 

Due to the memory constraints associated with Android Go devices, the work profile deployment scenario in the past has been recommended against, and since Android 12 is optional (factoring in the increased memory requirements), and therefore dependent on the OEM for implementation. 

In addition, since late 2020 [Android Go has also supported zero-touch by default](/android/android-enterprise-faq/#:~:text=on%208.0%2B%20devices.-,Does%20Android%20Go%20support%20zero%2Dtouch,-%3F%20%23), which was also previously opt-in for OEMs prior to ZT's [integration with Google Play Services](https://bayton.org/blog/2020/11/google-announce-big-changes-to-zero-touch/).

Not only then has Android Go supported Android Enterprise for many years, but it has improved over time.

With that said, recently VMware [announced support for Android Go with version 22.06 of their Intelligent Hub DPC](https://blogs.vmware.com/euc/2022/07/bringing-android-enterprise-to-everyone-with-android-go-edition.html) (the on-device VMware agent), and I opted to probe a bit into exactly why EMMs are making claims to support, or not, Android Go in the market today. 

Because Android Go does limit functionality, and the behemoths of the EMM world _like_ functionality, it appears to be less to do with Android Go supporting Android Enterprise, and more to do with EMMs not being able to hook into the permissions and services they need to enable their functionality. 

VMware in this case now officially claim support for Android Go where they did not previously. They've taken the time to review the platform, understand the outstanding issues their product(s) have in supporting Android Go, and have applied greater focus on their testing and development efforts in order to now offer - albeit limited - support in line with what Android Go customers should expect. 

Caveats do exist, notably at time of writing [limitations apply](https://docs.vmware.com/en/VMware-Workspace-ONE-UEM/services/Android_Platform/GUID-AWT-AFWINTRODUCTION.html?hWord=N4IgpgHiBcIIYDsAmAnA9gSyQAgOZpAF8g#:~:text=Android%20Device%20Modes.-,Android%20GO%20Support,-Workspace%20ONE%20UEM) to Workspace ONE Launcher - which seems primarily due to the _Draw over other apps_ permission requirement not being enabled on Go - and some product provisioning features, which are perfectly reasonable considering the restraints on resources available. Those aside, for the customers looking to deploy exceptionally low-cost, limited-use devices in their WS1 UEM managed organisations, there's nothing technically now preventing that. 

But when you look at some of the other vendors, the effort still isn't being applied. 

[MobileIron](https://forums.ivanti.com/s/article/Is-Android-Go-Edition-Supported-with-MobileIron?language=en_US) reference AER for device selection, which isn't particularly useful if your budget only affords Go-level hardware (though the AER plug is a good one nonetheless), before continuing on to incorrectly state WP is not supported, rather than optional, and then finishing with MobileIron's actual stance: "possibly works doesn't mean officially supported".

[Meraki](https://community.meraki.com/t5/New-to-Meraki/Meraki-and-Android-Go/m-p/154825) incorrectly claim as recently as July that Android Go doesn't support Android Enterprise at all, following customer complaints of enrolment failures.

SOTI, IBM, I couldn't see any solid view one way or another in public docs.

Established EMMs aside, some of the more modern solutions running on the Android Management API (AMAPI) all appear to support Android Go fine, including Microsoft Endpoint Manager (Intune), Wizy, and several more. Arguably of all the testing I'd done, enrolling into my company's Intune environment with all of the app policies, conditional access, suite of non-Go applications and more was the most taxing, and the Android Go device I have handled it perfectly fine. 

Overall I think Android Go support is a bit of a sore point for the ecosystem today. There's clear misunderstandings in what can and can't be supported with the lighter Android variant, and not a lot of visible effort to put that right. 

Perhaps this is something for Google to turn their attention to in the not-too-distant future, as I'm sure Go expanding to the 2GB memory threshold is only going to grow the Go footprint around the ecosystem. 

Starting with more transparent, public documentation akin to the CDD about exactly what Go devices can and cannot do would be a massive, low-effort change that could clear many uncertainties up immediately and help ecosystem partners better understand what it takes to make sure their solutions are Go-supported. It'd equally help customers to decide up-front if Android Go is suitable for them, rather than the current approach of test-before-deployment that seems to be in relied upon currently.