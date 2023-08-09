---
 title: "Android's work profile gets a major upgrade in 14"
 date: '2023-08-04'
 status: publish 
 author: 'Jason Bayton' 
 excerpt: "The work profile experience is changing in 14, predominantly for the better. Here's a quick overview on what to expect." 
 type: post 
 tags: 
     - Enterprise 
---
In case you missed it, [my article](/blog/2023/04/android-enterprise-in-android-14/) on what's new in Android 14 covered off a subtle but significant change to the way the work profile functions when toggling it on and off (pausing it).

I've already [popped together a technical overview of the change](/android/android-14-work-profile-behaviour/), as I like to do for many things that change on major releases. These intentionally lack any sort of opinion, bias, or objectivity as best I can in order to be simply taken at their intent - a straightforward technical change document highlighting what's changing, why, and the impact it may have.

This, however, is an article and fully subject to all of my opinions, so let's dive in a little!

## Why is the work profile UX changing?

The reasoning for the change, officially, is pending Google's 14 marketing push likely due in the next several weeks when 14 lands. That said, tidbits of public information have popped up, and it's all about improving the experience for work profile users.

When you turn off a work profile on 13 and older, the whole work profile user turns off. This obviously kills the apps as expected, but it also turns off every other aspect of work profile functionality also - the cross-profile APIs used for caller ID and such, application updates, and for OEMs like Samsung, the ability to move data between profiles.

This obviously poses some challenges to providing a good user experience.

When the boss calls while the profile is off, users will see a call from a phone number rather than a named contact, making it much harder to ignore out of hours 🙂. Additionally, because the profile is entirely off, app update policies don't apply and therefore devices can fall out of compliance,ending up in a situation where the work profile is automatically removed, or at least access to corporate data is prevented due to DLP policies in place by the managing organisation.

One of the biggest annoyances reported with the work profile though? Notification-geddon. When the profile is turned off for a period and eventually turned back on, the device may be inundated with notifications all at once for _everything_ that has happened while off. 

## How is this addressed in 14?

In 14 Google has switched up what "pause" means, and have instead taken a leaf out of the Digital Wellbeing book to focus on the suspension of applications themselves, leaving the work profile itself still running.

That means the _management_ of the profile can continue unhindered, so applications continue to update, cross-profile APIs still function, and presumably OEM plugins like those from Samsung allowing cross-profile data migration (if you want to know what this means, open Gallery, select a picture, and in the menu there's a _Move to work profile_ option) can continue to function, providing corporate policy permits it.

And notifications? They simply accrue in the background in the same way they do for Do Not Disturb, Focus, and similar Digital Wellbeing modes. 

## Balancing UX with UX

The drawback for this, understandably, is data and battery use while the profile is now paused. While the latter is going to likely be minimal during the pausing of the work profile - not easy to compare scientifically since there are many other changes between 13 and 14 that will equally contribute to differing battery use - data usage can silently climb in the activities of app updates, notifications, and everything/anything else a suspended app can still do (though Google confirm things like location won't be permitted when the profile is paused).

While that's not going to be a problem for me, and likely many folks reading this, Android is a global platform, and devices are managed all over the world. This is why I felt it pertinent to mention it on the tech doc, because there are users with limited, capped, or expensive usage-based internet plans at home (I'm talking ISP, not cellular) - my Dad in Wales is capped to 10gig in a month out of choice because it's cheap! - and those who actively turn their work profile off to avoid usage in addition to gaining the benefits of the work-life balance the work profile provides may find themselves seeing the effects of this change quite quickly.

Again, most will likely not even notice, but our ecosystem is vast and the Android user base geographically-diverse. Since the option to turn off the work profile completely is gone, I want to make sure organisations - and users in particular - know what's coming _before_ it causes a problem.

## A net-positive change

Overall the changes make sense for the evolution of Android Enterprise, and it's wonderful to see Google's PMs honing in on the finer details of headline functionality. Combined with fix for [work profile screenshots](/blog/2023/04/android-enterprise-in-android-14/#correct-saving-of-screenshots-for-work-profile-applications) and several other cross or work profile features, it's a decent release, generally.