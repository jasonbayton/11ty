---
title: "Upcoming work profile support for Googlebook first look"
date: '2026-10-23'
status: publish
author: 'Jason Bayton'
excerpt: "In my week with the Googlebook I found device management declared unsupported, and wondered whether that was a deliberate switch or a genuine absence. Follow along as I try to figure it out."
type: post
tags:
  - Enterprise
---

In [my week with the Googlebook](/blog/2026/10/a-week-with-googlebook/) I had a go at enrolling a work profile (technically the 2nd time after trying the demo units at the enterprise summit, but I digress..), and while debugging the persistent failures upon initiating enrolment, the logs kept shouting about device management feature flags being declared unsupported. My hope was that was a flag to disable it intentionally, rather than support being genuinely impossible before [H2 2027](/blog/2026/09/googlebooks-meet-enterprise/).

And today I have something of an answer..

## Getting GooglebookOS into a VM

I made the choice to try this dabbling in a VM. As tempting as ripping open a new Dell XPS Googlebook would be, the RMA process probably wouldn't cover returns because I software-bricked it. Besides, I've got a mac mini just _hankering_ for something to do.

With that established, it was on to the research and prep. Google publishes recovery images for each current model, much as it does for Pixels. Given Google have been clear about owning the Googlebook update process this is expected, and works in my favour because scouring OEM support sites for recovery images can be a huge pain.

The one I went for was `mica`, the Dell XPS Googlebook's recovery, although HP's would have likely been fine as well given all that mattered was it was an ARM build so it'd play nicely with my Mac.

_I left the Dell XPS within viewing distance of the Mac for this, to give it a heads-up on what may be coming its way.._

With the Google-hosted recovery image, the next task was to figure out how to get it to boot with QEMU.

All credit for that goes to [skylartaylor's gbos-vm](https://github.com/skylartaylor/gbos-vm). It runs the recovery image in a GPU-accelerated QEMU VM on Apple Silicon. It rebuilds the vendor partition for the virtual device, borrows a software keystore and boot HAL from a Cuttlefish donor, boots the stock system partition more or less as shipped, and turns off verified boot so boot isn't blocked by Android's verified boot system.

With that in place, within a few minutes I was sat at a working Googlebook desktop. The VM booted sweet as a nut!

<div class="image-gallery">
<figure>
  <a href="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-23_at_16.01.38.png"><img src="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-23_at_16.01.38.png" alt="The Googlebook OS desktop running in the VM, with the app launcher open." loading="lazy"></a>
  <figcaption>A working Googlebook OS desktop, running under QEMU on the Mac mini.</figcaption>
</figure>
</div>

## Why the work profile wouldn't enrol

Google have been immensely clear about enterprise management features being omitted for the next year, so trying to enrol was really not expected to work. What I found more interesting was _why_ enrolment failed and _how_ management had been removed from what is otherwise a standard android build on a new form factor.

During attempts, I was seeing entries in the bug report along the lines of:

```
DevicePolicyManager: Cannot check provisioning for action android.app.action.PROVISION_MANAGED_PROFILE because device does not have the android.software.device_admin feature.
```

With further digging, `pm list features` doesn't list `android.software.device_admin` or `android.software.managed_users`, so anything that wants to set an owner refuses because the device _doesn't have the device admin feature_.

But it was more than just a missing declaration, Google disables management in more than one place:

- The system declares both features _unavailable_ in a permissions file, and the framework is compiled to report them missing regardless of what that file says.
- Even with the features present, Device Policy's own device-admin gate was folded to a hard `false` at build time, which short-circuits essentially every management operation - setting an admin, a profile owner, a device owner, the provisioning, all of it.

It was the 2nd gotcha above that caught me out, leading to more sleuthing through the build after I was _sure_ I had it sorted.

What this sleuthing also discovered was much of the management components I look for in a build supporting Android Enterprise were absolutely present. They may not have been fully functional - and spoiler, they're not - but knowing the components existed gave me all I needed to see to move on to trying to enable them!

## Enabling management

The requirement was three changes, and a recompile back into the system image:

- Patch the framework so it reports the two features as present,
- Patch Device Policy's gate so it stops reading `false` by default,
- and flip the permissions file to declare the features available.

None of it is overly complex given it's undoing three deliberate _off_ switches normally on in standard Android builds (those I'm familiar with having built Android for hardware myself in the past). The tricky bit was getting the modified files back into a read-only system partition inside a logical-partition container without breaking everything around them, which took rather more scripting than the patches themselves. Thankfully my team of AI powered assistants know more about compiling than I do, so what would have taken me days of research was done in minutes with a nice how-to created after so I know for next time.

## Going for gold

With the flags on and verified through ADB, I ran a bog-standard work profile enrolment on an already set-up device through AMAPI. 

<div class="image-gallery image-gallery-2" style="--gallery-min-width: 16rem">
  <figure><a href="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-22_at_19.08.07.png"><img src="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-22_at_19.08.07.png" alt="'Let's separate your work apps', the start of work profile setup." loading="lazy"></a></figure>
  <figure><a href="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-22_at_19.10.26.png"><img src="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-22_at_19.10.26.png" alt="The work checklist, prompting to install the managed work apps." loading="lazy"></a></figure>
  <figure><a href="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-22_at_19.12.03.png"><img src="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-22_at_19.12.03.png" alt="Managed work apps installing from managed Google Play." loading="lazy"></a></figure>
  <figure><a href="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-22_at_19.13.09.png"><img src="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-22_at_19.13.09.png" alt="'Your device is ready to go', work profile setup complete." loading="lazy"></a></figure>
</div>

Given the VM doesn't expose a camera I ended up pasting the enrolment token itself rather than scanning a QR. Not long after, I saw it succeeded, with ADP showing **profile owner of a work profile**:

```
Profile Owner (User 11): com.google.android.apps.work.clouddpc/...CloudDeviceAdminReceiver
UserInfo{11:Work profile:1030} running   (parent User 10)
EnforcingAdmin { ...clouddpc..., mAuthorities=[enterprise], mUserId=11 }
```

And there we have it. A work profile, sat under the primary user (User 10, in this case, because Googlebook uses headless users similar to Android Automotive!), with Android Device Policy registered as its profile owner. Applications soon came down from managed Google Play, and the previously hidden/non-functional work profile references dotted around the UI now opened to offer access to settings and configuration.

<div class="image-gallery">
<figure>
  <a href="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-22_at_23.59.39.png"><img src="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-22_at_23.59.39.png" alt="Googlebook OS showing a work profile in the launcher." loading="lazy"></a>
  <figcaption>One familiar split launcher!</figcaption>
</figure>
</div>

That's a managed [work profile](/android/what-is-android-work-profile/) on a Googlebook, enrolled through the same process I'd point to for any other Android device.

:)

### The caveats

- Given the system has been modified and verified boot turned off, I wouldn't expect banking apps and other apps requiring device integrity to work. - Recompiling an already compiled build is also far less ideal than being able to build from source for stability and reliability.
- I didn't extensively test policy enforcement, and I'm not going to.
- As a proof of concept it does the job, and I'm happy with that. It isn't anything more.

## What about fully managed enrolment?

Yeah, no, that's not ready..

I did see some interesting screens though:

<div class="image-gallery">
<figure>
  <a href="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot%202026-10-23_at_10.31.51.png"><img src="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot%202026-10-23_at_10.31.51.png" alt="The Googlebook OS welcome screen with Work and Personal setup options." loading="lazy"></a>
  <figcaption>The welcome screen, offering a Chromebook-style work or personal choice right at the beginning.</figcaption>
</figure>
</div>

The Googlebook flow _presently_ looks like it will offer a similar Chromebook-esque work/personal setup flow directly from the welcome screen. When tapping this it presently goes directly into work profile setup and blocks completing enrolment, which is presumably not right.. either way it fails on adding account.

<div class="image-gallery">
<figure>
  <a href="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-23_at_15.27.53.png"><img src="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-23_at_15.27.53.png" alt="Googlebook OS showing 'wrong account', after fully managed provisioning failed." loading="lazy"></a>
  <figcaption>Going through the "for work" setup flow eventually gives up with a restricted account-related error.</figcaption>
</figure>
</div>

The 6-tap QR code provisioning flow is present, but without a camera in the VM it didn't let me progress.

<div class="image-gallery">
<figure>
  <a href="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-23_at_16.05.37.png"><img src="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-23_at_16.05.37.png" alt="QR scanning doesn't work." loading="lazy"></a>
  <figcaption>QR code scanning can't see what it's scanning.</figcaption>
</figure>
</div>

I also tried the old trusty `afw#setup` which eventually also died:

<div class="image-gallery">
<figure>
  <a href="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-23_at_10.26.45.png"><img src="https://cdn.bayton.org/uploads/2026/googlebook-wp/Screenshot_2026-10-23_at_10.26.45.png" alt="Googlebook OS showing 'Can't set up device' with a Try again button, after fully managed provisioning failed." loading="lazy"></a>
  <figcaption>Fully managed provisioning gives up with "Can't set up device".</figcaption>
</figure>
</div>

In all cases when provisioning for company-owned flows does eventually fail, the reset button crashes the GooglebookOS. So maybe someone should check on that, too..

I could test custom DPC, but given the provisioning flow is broken, it seems unnecessary today.

We can probably leave this bit disabled for a little longer.

## So where do we stand?

Back in [the wishlist](/blog/2026/10/what-i-want-from-googlebook-in-enterprise/) I argued a work profile is the one thing I want most from Googlebook in enterprise. There's no specific date for work profiles yet, yet for a consumer launch it's understandable the work profile would also be the most in-demand of the enterprise use cases for Googlebook, as has been echoed across the [r/Googlebook](https://www.reddit.com/r/Googlebook/) subreddit amongst other places (it's not just me asking for it!)

Having now watched a Googlebook enrol a work profile through Android Device Policy, I'm fairly confident it's much closer than previously let on. The management stack is in the OS, it enrols, and although I'm sure there's still much to do, hopefully it's not enough to keep it delayed until late next year.

I've got a [work-profile tracker](/googlebook-work-profiles/) going with guidance on submitting feedback if you'd like to nudge Google along. If you've been poking at the same images, or want to chat about this in general, [get in touch](/contact/).
