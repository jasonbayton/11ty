---
 title: "Product files: Alternative form factors and power solutions"
 status: publish 
 author: 'Jason Bayton' 
 excerpt: "My first in a series of articles that offer a glimpse of what I do day to day. Starting with bringing the first ever EDLA-certified ePOS to market" 
 type: post 
 tags: 
     - Enterprise 
---

<div class="callout">

Welcome to Product Files, a series of articles that touch on some of the more interesting aspects of running a product organisation for the last several years. 

As this series grows, additional links will show up here:
- [Alternative form factors and power solutions](#)

</div>

In this debut article, I thought I'd start with a hardware project, one of the first I took on when I joined an OEM way back in 2019 in fact, having not built devices before. 

This project was also my first taste of what nontraditional Android form factors could look like, and was equally the first ePOS both for me and for the OEM having only recently pivoted from consumer low-cost handset projects to bespoke enterprise hardware. 

In fact, this project ended up being a first for a few additional reasons -
- First device certified with Google's enterprise device license agreement (EDLA) - _more on this below._
- First (and one of few) partner hardware integrations, and associated SDK development 

It goes without saying I've got a reasonably comprehensive understanding of Android. Though I focus primarily on enterprise, I've been tinkering with the platform for over a decade; the Android build that would ultimately grace the ePOS therefore wasn't much of a concern, but getting up to speed on hardware was to be an interesting challenge.

There were however two contributing factors that made this a little easier. First, I had an experienced team of hardware professionals both internally and through the ODM partners who would build the device. Second, the design and functionality of the ePOS was initially largely driven by a rather well-known customer in the food delivery industry based in the UK. If you happen to pop into a restaurant that partners with them, you'll no doubt see similarities in design with units they already have in the wild. When I took over the in-house device portfolio, that customer had just pulled out due to a change of priorities and so I adopted the project to release as an open market device to sell globally.

And here it is:

![M10p](https://cdn.bayton.org/uploads/2023/05/RHINO-M10p-Tablet-with-Printer-box-550x354.webp)

I've got a soft spot for the M10p. Even though the design is dated and the way it's built could be far more efficient (thanks to the initial project scope), what eventually landed with customers was a robust, performant device with a solid suite of core hardware features, and wicked extensibility. 

Some of the aspects of this device I'm most proud of are:

## Ports galore

Customers purchasing ePOS devices often have peripherals from hardware being replaced. If they don't, they may prefer working with local partners for region or function specific peripheral hardware. 

The goal for the M10p was to work with what customers want to work with. Could we have built scanners, cash registers, and payment terminals to bundle with the unit? Absolutely, but the strategy was that of compatibility and support, not lock-in.

When considering this, availablity of ports was a priority.

Around the device you'll find 3 USB (A), USB C, RJ11, RJ45, and RS232, amongst others. With them, the M10p acts as an all in one solution for payments, communications, and peripherals. It'll support many types of cash register, most external payment terminals, and with plenty of USB can be hooked into many other accessories as needed. 

This wasn't simple to pull off, the MediaTek Genio 500 the unit is powered by - a strategic decision to further a close relationship with MTK's IoT devision for long term support - is hardly a first choice for port support and a lot of these run from the USB2.0 and GPIO channels the SOC offers, but we made it work. 

With all of those ports, though, this introduced another concern - keeping them clean and inconspicuous when not in use. 

The original product design had them open to the elements, then a large all-or-nothing cover was added in. 

(image)

As you might imagine having one port in use requires the cover to be open, which again leaves all ports open to the elements.

I really aimed to achieve independent port access, and had a specific way I wanted them to function; rather than a simply spring-closed flap which can be fiddly and frustrating, I pushed for adding in a support that would hold the covers open when opened fully. 

So we set out on a minor retooling of the housing to add supports for individual port covers, and ended up iterating a few times to get it right, but it was worth it for the resulting user experience.

(image)

Continuing the trend of inconspicuous design, a lot of thought was also put in to avoiding unnecessary tampering. The M10p supports a full size SIM card and microSD (eSIM too but that isn't user accessible either way). You wouldn't immediately know where these are looking at the unit, as they're hidden on the underside of the tablet behind an access port secured with a screw. 

(image)

The same principle was applied for volume and the power button, which are recessed into the side of the unit and can only be interfaced with a SIM PIN (or equivalent). This was an intentional design decision as it's both inconvenient enough that the general populace won't have something to hand (like a biro) to fiddle with it, while at the same time SIM PINs are cheap and reasonably standardised enough to allow for sourcing if customers lose the one in the box. 

Custom APIs were also developed in software to allow for managing of device volume and tap-to-wake, so those buttons could be fully disabled under appropriate enterprise control, anyway. 

The only concession made here was the inclusion of a USB C port that handles `host` for Android debugging. I could have sunk my heels in on this, as ADB over Wi-Fi is obviously a viable option, but in testing and with the active customer base, debugging was challenging enough without introducing more complexity, and on reflection of 3 years supporting it, was the right move. Software handled access to this port, also, of course.

Despite the presence of USB C, unfortunately I couldn't lean on it for power, particularly with a power-hungry Seiko sitting in the bottom. Today this would likely be reasonably easily achievable. In 2019 and due to the routing of power and data between the tablet and print enclosure respectfully, not so much. On the upside, the 24v external power supply has enough juice to power the tablet, print enclosure, peripherals, and many types of passively powered cash registers.

## Safe shutdown on power loss

Speaking of the external power supply, this is the sole means of powering the unit. There's no internal battery as it's a dedicated device designed to be fixed in place and attached to permanent power. 

Considering the environments this device is intended to work within (high humidity, extremes of temperature, always on, running for 5+ years) shipping a battery is something I considered too high risk. Batteries fail, I didn't want this device to become a burden to customers, particularly in use cases such as food delivery, where units are remote, normally sat in partner establishments and going down can cost a day+ worth of missed orders.

There are implications to this product decision. First, with Google Play Protect (GMS) certification all certified devices must have a battery. 

Further, in testing with customer environments, I was seeing unplanned power loss to be something of a reoccurring issue. Employees would often switch units off and on for app issues, devices would be turned off at the end of shift/work days, units would be moved around frequently(!), and other scenarios saw the M10p repeatedly shut down in an unclean fashion. This led to data loss and/or corruption and something I considered to be a significant problem. 

Between the two, GMS was the larger - if ultimately temporary - issue for the business to be perfectly honest. Without certification the hardware couldn't run Google apps and services, and wouldn't support Android Enterprise. That would stifle the product's success tremendously.

My team and I worked through several options, including in-line UPS, hundreds-milliamp sized batteries accessible through maintenance panels for easy replacement, and more. Until it hit me. 

Capacitors. 

They hold charge, hold up in harsh environments, don't degrade in the way batteries do, and don't require user maintenance.

You see capacitors in use quite often today, consider things like the Samsung Galaxy stylus for example, but again back in 2019 it wasn't an immediate thought.

The M10p had the space within the housing needed to support a bank of them, and we sat them in-line between the PMIC - Power Management Integrated Circuit, the board that handles and distributes power to the rest of the device - and the external power supply. 

(image)

We achieved 20 seconds of reserve power with the above configuration, and while you might look at that insignificant number with confusion, this solved both problems:

1. On a technicality we were able to pass GMS applying the MADA (consumer) contract with the unit classified as a portable tablet (for MADA it's that or a handset).
2. The problem I set out to solve wasn't to keep the unit powered on with a loss of power, but to protect against data loss. 

I coupled the capacitors with a system (Android) service that monitored for a power change, and gracefully initiated shutdown. With an average shutdown taking 16 seconds and including Android saving data to disk during the process, the M10p could now lose power without losing data. 

I was elated.

Those familiar with capacitors may already know the minor tradeoff we made with this configuration - cold boot takes 5-10s longer before the device powers on while the capacitors fill up. Cold boot only happens when the unit has been totally unplugged for a period of time though, giving the capacitors the opportunity to fully discharge over time. In temporary power loss scenarios this just wasn't an issue. 

## Migrating to EDLA

That battery technicality for certifying the M10p as a Play Protect Certified/GMS MADA tablet ultimately (and thankfully) wasn't needed for production, as during development of the device Google launched EDLA, the Enterprise Device License Agreement, as a replacement for MADA, the Mobile Application Distribution Agreement. 

What these are could probably justify an article per acronym, but effectively:
- All certified Android devices are governed by a MADA, for which there are multiple due to various competition and market restrictions around the world, EMADA (Europe), IMADA (India), TMADA (Turkey), and Russia which runs on a modified MADA. 
- These agreements define apps bundled, home screen layout, restrictions and requirements in addition to or in place of the public CDD - Compatibility Definition Document - and more.

EDLA was brought in with some key requirements changes based on feedback from ecosystem players like me who outlined problems with the traditional GMS requirements for dedicated devices. In summary, again for simplicity, EDLA devices amongst other things:
- Can have displays larger than 18" (think kiosks, digital signage)
- Can be headless (no display at all)
- Can omit a battery entirely

The one primary requirement added was full transparency for software support, wherein a public page on the OEM website must state when the device is expected to go end-of-support, list releases, and so on. As you can imagine I had no issue with this _at all_. AER requirements demand the same and it's better for the ecosystem.

Evidently being invited to move the M10p over to EDLA from MADA was a big deal and put the device and it's capacitors back into the realm of absolute adherence as opposed to dancing around technicalities, so that was a relief, but to be invited to do so amongst the huge industry players like Zebra and co making dedicated devices was such an incredible accomplishment.

The M10p became the first EDLA-certified ePOS in the world, and I am super proud of that.

## Wrap up

I could go into much more detail on this device alone - the printer integration, the hinged access, BYO eSIM support, the light bar.. and more (and perhaps I will another time) but for this article these were some of the aspects of building the product that stood out, either due to time and thought required, or the impact it had on the resulting device. 

I hope you enjoyed this peek behind the curtains. If so, look out for more in the coming months!
