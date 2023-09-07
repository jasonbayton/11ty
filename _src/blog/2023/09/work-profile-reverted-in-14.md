---
 title: "Android's work profile behaviour has been reverted in 14 beta 5.3"
 date: '2023-09-07'
 status: publish 
 author: 'Jason Bayton' 
 excerpt: "The work profile experience was changing in 14, but it's abrupt removal casts doubt on that actually happening." 
 type: post 
 tags: 
     - Enterprise 
---

Earlier this morning I noted the [What's new for enterprise in Android 14](https://developer.android.com/about/versions/14/work) doc (now under a non-preview URL 🎉) has removed references to the work profile changes I wrote about in my previous [docs](/android/android-14-work-profile-behaviour/) and articles ([1](/blog/2023/08/work-profile-in-14/), [2](/blog/2023/04/android-enterprise-in-android-14/)). 

Incidentally, I also had a minor beta update (5.3) pending across my Pixels. 

Coincidence? No. Given the timing I assumed there may be a link between the two and thought I'd compare the update with the previous beta release (5.2) _just in case_. It didn't take long to confirm the change.

In `UPB5.230623.006` (Beta 5.2) the following is shown when the work profile is on:

<pre>
jasonbayton@Jasons-MacBook-Pro platform-tools % ./adb shell dumpsys user | grep -A 3 "Work profile"
  UserInfo{10:Work profile:1030} serialNo=10 isPrimary=false parentId=0
    Type: android.os.usertype.profile.MANAGED
    Flags: 4144 (INITIALIZED|MANAGED_PROFILE|PROFILE)
    State: <b class="blood-orange">RUNNING_UNLOCKED</b>
</pre>

.. and paused:

<pre>
jasonbayton@Jasons-MacBook-Pro platform-tools % ./adb shell dumpsys user | grep -A 3 "Work profile"
  UserInfo{10:Work profile:10b0} serialNo=10 isPrimary=false parentId=0
    Type: android.os.usertype.profile.MANAGED
    Flags: 4272 (INITIALIZED|MANAGED_PROFILE|PROFILE|QUIET_MODE)
    State: <b class="blood-orange">RUNNING_UNLOCKED</b>
</pre>

This is the new behaviour, wherein the work profile remains running in a suspended state.

In `UPB5.230623.009` (Beta 5.3), I see this for on: 

<pre>
jasonbayton@Jasons-MacBook-Pro platform-tools % ./adb shell dumpsys user | grep -A 3 "Work profile"
  UserInfo{10:Work profile:1030} serialNo=10 isPrimary=false parentId=0
    Type: android.os.usertype.profile.MANAGED
    Flags: 4144 (INITIALIZED|MANAGED_PROFILE|PROFILE)
    State: <b class="blood-orange">RUNNING_UNLOCKED</b>
</pre>

.. and paused:

<pre>
jasonbayton@Jasons-MacBook-Pro platform-tools % ./adb shell dumpsys user | grep -A 3 "Work profile"
  UserInfo{10:Work profile:10b0} serialNo=10 isPrimary=false parentId=0
    Type: android.os.usertype.profile.MANAGED
    Flags: 4272 (INITIALIZED|MANAGED_PROFILE|PROFILE|QUIET_MODE)
    State: <b class="blood-orange">SHUTDOWN</b>
</pre>

Both `SHUTDOWN` and `-1` is the older behaviour associated with Android 13 and lower.

It _looks_ like beta 5.3 has therefore removed the new work profile behaviour, and reverted it back to how it was with Android 13. The [release notes](https://developer.android.com/about/versions/14/release-notes) for 5.3 don't specify this as a change:

> * Fixed an issue where apps crashed in some cases after a CallStyle notification was posted.
> * Fixed various issues that could cause call or carrier service interruptions.
> * Fixed an issue where the system was using an inefficient path when placing CPU restrictions on apps running in the background.
> * Fixed issues with SurfaceFlinger that were causing a loss in system performance.
> * Fixed an issue on Pixel Fold and Pixel Tablet devices where the taskbar sometimes turned invisible while interacting with it.
> * Fixed an issue on Pixel Fold and Pixel Tablet devices where the animation on animated wallpapers stuttered when launching apps.
> * Fixed an issue on Pixel Fold devices where the interface layout was misaligned while customizing the Home screen.
> * Fixed an issue on Pixel Fold devices where the clock on the lock screen was flickering while animating.
> * Fixed various issues that were impacting system stability and performance.

But it's probably bundled in with the various issues impacting system stability and performance, as these things tend to be.

Why? I can't say. There's no public reasoning published; it's simply just been removed from public docs. Given this is so late in the development cycle of 14 (it was due any week now, before being [potentially pushed back recently](https://www.androidcentral.com/apps-software/android-14-reportedly-delayed-last-minute)), it was clearly considered important enough to remove.

Perhaps we'll see it in Android 15, or sooner in a QPR - quarterly patch release - instead. Notification-geddon will continue for now, but if the call was made to pull it, I suspect it's worth it for the team to get the new behaviour _just right_. 

_As a side note, obviously this is the risk with documenting beta features.. they can vanish on a whim, and so I'll have to update my other linked docs to reference the change. It's not easy to balance offering advanced notice to organisations for potentially breaking changes with waiting until actual release, though in future I may err on the side of public availability given few organisations are pushing GO with major releases on day zero._