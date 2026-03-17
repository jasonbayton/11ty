---
title: "TCL Note A1 NXTPAPER hands-on"
date: '2026-03-17'
status: publish
author: 'Jason Bayton'
excerpt: "The TCL Note A1 NXTPAPER looks reasonable on paper, but a closer look leaves more of a mixed impression."
type: post
tags:
  - Reviews
---

I've been spending some time with TCL's Note A1 NXTPAPER lately after backing their kickstarter a few months ago. It's a tablet-notepad hybrid positioned to rival the likes of the Kindle Scribe and ReMarkable in the notes-first space. It's not an E-Ink tablet despite the marketing leaning into that category, but the matte, paper-like display does genuinely feel different to a typical glossy tablet. 

On paper the fundamentals are decent enough for a low-cost tablet proposition, so I was keen to see how it held up in practice. 

I have been eyeing up the ReMarkable for quite a while, but I wanted something powered by Android. I think that's good framing for my following thoughts.

## Hardware

The Note A1 is a Wi-Fi only tablet with a 1440x2200 display that leans into the paper-like aesthetic TCL have been pushing with the NXTPAPER branding. I'm no stranger to NXTPAPER, I've got multiple TCL phones and tablets with the E-Ink-like display tech and I enjoy it. I fancied getting hands-on with the A1 to see how they'd apply this to the notes space. 

The matte finish is genuinely pleasant to look at and write on, and the pen's additional pressure sensitivity over their typical Android tablets is a nice boost.

![](https://cdn.bayton.org/uploads/2026/tcl-note-a1-nxtpaper-first-impressions/PXL_20260317_155456491.jpg)

Build quality is reasonable for the price; it's not going to compete with premium tablets on materials, but it feels solid enough in the hand. That said, the device overall feels heavier than I'd prefer - it's noticeably heavier than the notepads I'd otherwise use for writing, so the fatigue is real during longer sessions.

There is one design flaw that becomes a constant annoyance because I'm left-handed. The ambient light sensor sits on the top-left edge in the orientation the tablet seems to want to be used, which means it's very easy to cover with a thumb or palm. 

![](https://cdn.bayton.org/uploads/2026/tcl-note-a1-nxtpaper-first-impressions/PXL_20260317_170151382.jpg)

Do that and the display starts dimming because the sensor thinks the room has gone dark. Flip the tablet around and the sensor problem goes away, but so does the little bit of bezel that makes it comfortable to hold - resting a palm anywhere near the edge then leads to accidental touches. They could have put the sensor on the opposite side to where the button is and avoided the issue entirely. I eventually gave up and turned auto brightness off; I'm happy enough to adapt it manually whenever I pick it up, but I shouldn't have to.

Speaking of setting the brightness, battery life is _fine_ - the 8,000mAh cell is sizeable for a tablet this weight. It doesn't charge very quickly at all despite supporting 33W, though. I use my Anker dock (pictured just to the right of the picture below) and it doesn't seem to want to pull more than 17W, frequently dropping to as low as 2-3W.

In terms of the bundled accessories I received with the Kickstarter, the keyboard case requires fundamental knowledge of origami to get set up, but once it's in place it works well and is nice to type on. The book case keeps everything well protected, including a space for the pen within the clasp, which is a nice touch.

![](https://cdn.bayton.org/uploads/2026/tcl-note-a1-nxtpaper-first-impressions/PXL_20260317_162051958.jpg)


### Spec

- Platform: MediaTek MT8781V/NA (Helio G100)
- RAM: 8GB
- Storage: 256GB
- Display: 11.5", 1440x2200, 120Hz, matte NXTPAPER finish
- Battery: 8,000mAh, 33W charging
- Pen: T-Pen Pro, 8,192 levels of pressure sensitivity, dual tips, built-in eraser, <5ms latency
- Dimensions: 260.1 x 196.6 x 5.5mm, 500g
- Connectivity: Wi-Fi
- Android 15

## The notes experience

This is what the device is built around, so it deserves its own section.

The writing tool configuration (the toolbar shown above a note when opened) is genuinely great. Each of the five tool slots can be individually configured - different pen types, colours, thicknesses - which means switching between presets is quick and not fiddly at all. I could set all five to the same pen tool with different colours if I wanted to, which depending on the complexity of the note may even be something I'll do.

![](https://cdn.bayton.org/uploads/2026/tcl-note-a1-nxtpaper-first-impressions/Screenshot_20260317-170401.png)

The ruler is useful too, particularly for layouts that don't come as standard templates. It can be rotated to any angle, which is helpful.

One-stroke shape detection works pretty well for larger shapes, though smaller shapes aren't always detected.

Transcription, on the other hand, takes a long time and I found it not to be very accurate. There's also no option to transcribe a full page or full document of notes, which is frustrating - though I can partially get around it by asking the device to translate the full page to English, which it does, albeit very poorly.

![](https://cdn.bayton.org/uploads/2026/tcl-note-a1-nxtpaper-first-impressions/Screenshot_20260317-172356.png)

I tried the Inspiration Space, which is triggered by holding down the pen button and circling something on screen. It takes a screenshot and puts it into the notes. The problem is it doesn't work outside of the notes app, so I have no use for it - I don't normally need to take inspiration from my own notes, but news articles, images, Google searches... that would actually help.

Note management itself is fine: add, delete, rename, tap and drag, folders. All par for the course and nothing noteworthy to comment on.

One annoyance worth mentioning: when exiting a note - particularly accidentally, which happens easily when using the thin bezel edge and palming the screen - it can take quite a long time for the note I was working on to show back up in the list. The first few times this happened I was searching for it, convinced it had disappeared, before I realised I just had to wait for it to catch up.

## Software

From a platform-security standpoint, the basics are all where you'd want them: it's a production `user` build with a locked bootloader, green verified boot, SELinux enforcing, and file-based encryption enabled. There are no active management agents or obvious abuse of the device policy APIs I could see. That's a solid starting point.

But that's where it drops off a bit. 

For a start, it shipped with a pile of Microsoft preload apps and other bloat - Edge, Outlook, OneNote, SwiftKey, and WPS Office among them - all living under `/preload/priv-app`, which is irremovable. I've since sideloaded replacements and disabled those bundled. As with every device that ships with perma-crap preloaded, doing so in the user space (`/data`) would be so much nicer than having to disable irremovable apps baked into the ROM. 

![](https://cdn.bayton.org/uploads/2026/tcl-note-a1-nxtpaper-first-impressions/Screenshot_20260313-213717.png)

There are also a number of TCL packages with broad privileges, which feel more noteworthy from a posture standpoint than the consumer bloat itself. Obviously par for the course with OEM packages, but the lack of GMS means these system apps have no guards to prevent them doing anything and everything they want.

The security patch level was also older than I'd like for a device delivered in March of 2026: `2025-10-05`. Not catastrophic, but old enough to notice immediately on a brand new tablet.

The settings experience is unusual. TCL have removed a bunch of typically accessible settings from Android for no obvious reason other than someone's assumption they won't be needed. I can't search in settings. I can't view system apps under settings > apps. I can't turn on developer options. I can't set a different home app. 

I'll also point out the changes made to settings may have introduced other issues, like the split-settings view landing in a situation where the left-hand panel, used for navigating the settings pages, would be replaced with a settings screen. Not ideal.

![](https://cdn.bayton.org/uploads/2026/tcl-note-a1-nxtpaper-first-impressions/Screenshot_20260317-171744.png)

I can't remap the "iPad home button" - that's legitimately how it looks and feels. I set Niagara as the `HOME` role holder and confirmed the normal Android HOME intent would resolve to it, but pressing the home button on the device still kept dragging me back into TCL's own Notes launcher. ADB made the split very obvious: Android thought Niagara was Home, TCL's UI behaviour thought otherwise, and since the native Android gestures had been maimed, I couldn't fall back to just ignoring the button in favour of a gesture.

That's the kind of thing that makes a device feel much more customised than it first appears. You can change the default launcher, but not really. TCL's layer still gets the final say - and this notes-first approach isn't just marketing, it's baked into the software decisions and shell behaviour.

## Enterprise

It's AOSP, so standard DPC device-owner management should work in theory, but AMAPI, device trust, and the typical GMS-dependent provisioning flows are out of the question. I haven't tested what I can and can't do as I don't much see the point - this is more of a consumer device that might find its way into a BYO scenario rather than something you'd deploy at scale.

What I will say is the posture around developer access is bizarre. My device shipped with ADB enabled, but the build number field - normally used to tap-to-enable developer options - has been repurposed as a link/button for updating the tablet. It's both less secure out of the box *and* equally difficult to lock down.

I used `adb shell settings put global development_settings_enabled 1` to get access to developer settings, which also revealed desktop mode - though I couldn't get it to display on any external monitor, which is a shame. Setting dev options back to 0 temporarily turned off ADB, but it turned itself back on later. Make of that what you will.

**TCL should really bring back standard Android behaviour** - ship with ADB disabled, allow developer settings, and leave the decision to the end user on how this device should behave. As it stands now I wouldn't want these littering my corporate network.

## Conclusion

I end up in a strange place with the Note A1.

The base Android build is more solid than I expected. The notes experience has some genuinely nice touches - the writing tool presets and the ruler in particular - but is let down by poor transcription and some sluggish behaviour. The out-of-box software load is worse than it needs to be, and TCL's decision to strip out several standard Android settings while simultaneously shipping with ADB enabled is a strange combination.

Maybe that's the fairest summary: the security and platform basics are questionable, the core notes functionality is decent, and the product decisions around software, preload content, and UX details get in the way of the hardware more than they should. 

But it takes notes. They're decent. I can export them. So it does what it says on the tin.. I just wish it did Android a little better.

For anyone interested in the notes-first reviews, do also check out existing coverage from [CNET](https://www.cnet.com/tech/the-tcl-note-a1-nxtpaper-is-a-notes-first-tablet-with-a-120hz-display/), [ZDNET](https://www.zdnet.com/article/tcl-note-a1-nxtpaper-tablet-hands-on-ces/), and [PCMag](https://www.pcmag.com/news/i-checked-out-tcls-kindle-scribe-competitor-at-ces-2026-and-writing-on) for broader hands-on perspectives.
