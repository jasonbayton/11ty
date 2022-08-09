---
title: 'VMware WS1 UEM officially supports Android Go'
date: '2022-08-09T22:42:00+00:00'
status: publish
author: 'Jason Bayton'
excerpt: 'VMware recently announced "official" support for Android Go, the resource-mindful implementation of Android for lower-end devices. What does this mean for Android Go support over all, and does Android Go require dedicated support within the Android Ecosystem? (Hint: No).'
type: post
tags:
    - Enterprise
---
[Android Go edition](https://www.android.com/versions/go-edition/) has been around for a while. Launched way back in 2017 as a successor to [Android One](/android/what-is-android-one/) as the One programme underwent it's own evolution into what we have today, Android Go took over as the flavour of Android for low-end devices. While originally memory requirements to qualify for Go were very low - anything under 1GB - today and device launching with 2GB RAM or under can only be certified for Go. 

In spite of common misconceptions, certainly not aided by folks like the [NCSC publishing incorrect information](https://www.ncsc.gov.uk/blog-post/ready-set-android-go), Android Go _does in fact_ support Android Enterprise. But not fully. 

🟢 Fully Managed  
🟢 Dedicated (COSU)  
🟠 Work profile  
🔴 Work profile on company owned devices (COPE, WPoCOD) 

Due to the memory constraints associated with Android Go devices, the work profile deployment scenario is optional, and therefore dependent on the OEM for implementation, WPoCOD is not supported. Since upping memory limits to 2GB this may change in future, but is unlikely.  

In addition, since late 2020 [Android Go has also supported zero-touch by default](/android/android-enterprise-faq/#:~:text=on%208.0%2B%20devices.-,Does%20Android%20Go%20support%20zero%2Dtouch,-%3F%20%23), which was also previously opt-in for OEMs prior to ZT's [integration with Google Play Services](https://bayton.org/blog/2020/11/google-announce-big-changes-to-zero-touch/).

Not only then has Android Go supported Android Enterprise for many years, but it has improved over time.

With that clarified, recently VMware [announced support for Android Go with version 22.06 of their Intelligent Hub DPC](https://blogs.vmware.com/euc/2022/07/bringing-android-enterprise-to-everyone-with-android-go-edition.html) (the on-device VMware agent). 

Some may read into this as a special effort being made to support Android Go devices, but as above, this has not been necessary. What VMware have done internally is better focus on their testing and development efforts in order to change their stance from _not_ supporting Android Go at all, to now offering limited support in line with what Android Go customers should expect. 

Which is brilliant. 

VMware's support comes with aforementioned caveats, notably at time of writing [limitations apply](https://docs.vmware.com/en/VMware-Workspace-ONE-UEM/services/Android_Platform/GUID-AWT-AFWINTRODUCTION.html?hWord=N4IgpgHiBcIIYDsAmAnA9gSyQAgOZpAF8g#:~:text=Android%20Device%20Modes.-,Android%20GO%20Support,-Workspace%20ONE%20UEM) to Workspace ONE Launcher and some product provisioning features - which is perfectly reasonable considering the restraints on resources available - but for the customers looking to deploy exceptionally low-cost, limited-use devices in their WS1 UEM managed organisations, there's nothing technically now preventing that. 

With Go out of the way, the path is clear for supporting other variants of Android in the not-too-distant future. 

Watch this space!