---
 title: "Product files: The DoorDash T8"
 date: '2023-08-06'
 status: publish 
 author: 'Jason Bayton' 
 excerpt: "My third in a series of articles that offer a glimpse of what I do day to day. This one focuses on the profound impact DoorDash has had on the humble T8." 
 type: post 
 tags: 
     - Enterprise 
---

<div class="callout">

Welcome to Product Files, a series of articles that touch on some of the more interesting aspects of running a product organisation for the last several years.

As this series grows, additional links will show up here:
- [Building Android devices](/blog/2020/12/on-building-android-devices/)
- [Alternative form factors and power solutions](/blog/2023/05/product-files-alternate-formfactors-and-power-solutions/)
- [The DoorDash T8](/blog/2023/08/product-files-the-doordash-tablet/)

</div>

Google [recently published a blog post](https://blog.google/products/android-enterprise/android-tablets-doordash/) by the DoorDash team that covered how the T8, supported by Android Enterprise's suite of management solutions, provided some pretty respectable achievements for them:

![Google AE overview DD](https://cdn.bayton.org/uploads/2023/08/google_tco.png)

As the T8 edges towards the end of it's extended lifecycle and customers begin moving to newer options, I thought I'd take some time in this article to dive a little deeper into the product development of the RHINO T8 and some of the product decisions I made during the development of the tablet that ultimately made it attractive to DoorDash, becoming one of their most-deployed units today.

<div class="callout">

As I delve into some finer details of T8 development, I'd like to point out this is a device that began it's lifecycle in 2019. Some of the features that made it notable at the time are simply par for the course in 2023 with manufacturers. That said, I'm proud of the decisions made early on in development that got it to where it is today.

</div>

## What is the RHINO T8?

I touched on the T8 back in 2020 with my [Building Android devices](/blog/2020/12/on-building-android-devices/) article. I'd recommend you take a gander at that if you haven't as I provided a good deal of relevant information as to where RHINO came from and the longer-term plans for the brand and ecosystem.

The T8 was part of the first generation of RHINO devices we built from the ground up, something that would not happen again with the gen 2 devices as the company opted instead to customise products ODMs already had available.

That said, here it is:

![RHINO T8](https://cdn.bayton.org/uploads/2020/12/20201113_103412.jpg)

It looks, behaves, and mounts like a standard 8" tablet available from many OEMs in the market today, and _especially today_ in fact, as the ecosystem has filled to the brim with tablets in the last couple of years; far more so than in 2019 when the T8 project kicked off. But that was the intention.

## Developing the product

In strategising what "RHINO" should be, it was ultimately decided the RHINO brand would be used as a readily-available, widely-applicable showcase of what the company could produce; to act as a springboard into more complex and bespoke projects that could (or not) leverage these devices as their base. This achieved two objectives:

- Customers could see and feel the build quality of a device _in their hands_ rather than relying on the word of a sales rep. It cannot be understated the difference this has when asking a customer to commit hundreds of thousands of pounds for a product they won't see for 6-9 months.
- For smaller projects the existing tooling and internal designs could be mostly or entirely reused, significantly reducing time to market

One additional benefit for the company was having own-brand stock available for customers simply wanting to buy a device, and as a value-add we were able to pop the company logo of any customer on the tablets for larger orders, giving a bit of organisational customisation most mainstream OEMs don't offer.

The T8 and it's larger sibling, the C10, were the first tablets I worked on under the RHINO brand.

Going in to product development for these devices, the key focus was to develop devices suited to enterprise; this meant considering aspects of use they wouldn't be subject to if consumer owned (and respected), even if MSRP wouldn't eventually be as competitive as an equivalent competing product in the consumer space (think Lenovo, cheaper Samsung tablets, etc). This mindset drove some key requirements for the device:

- Ease of repair
- Tough and resistant to unfriendly usage
- Repellent to moist &/ corrosive environments
- Long term component support
- Resistant to battery ageing

Again, there's nothing groundbreaking here, and OEMs at the time were well-versed in similar requirements for their own offerings (H/T Zebra, Honeywell, Panasonic, etc), but almost across the board they were rugged devices and didn't aim to target the pro-sumer hybrid of consumer device with enterprise features.

But what does this actually mean in terms of product decisions?

### Ease of repair

Some of the earliest samples that came from our manufacturing partner during initial stages of development painted a _stark_ picture of what cheap hardware looked like when the only goal is maximising profit:

- Glue blobs galore
- Soldered components
- Single-use clasps and anchors in the housing that would wear out after one to two disassemblies of the unit, which was very easy to pull apart
- Loose wiring
- Cheap CMF (colour, materials, finish)
- Zero modularity
- .. and so on

I've pulled apart Android devices (amongst others) aplenty over the years and have seen all of these in use in excess. These devices develop faults and unless you're willing to pull out a soldering iron they become paperweights. By comparison, the exposure I've had to what flagship OEMs have done for internal design - especially thanks to channels like [JerryRigEverything](https://www.youtube.com/jerryrigeverything) and his passion for tearing devices apart so the rest of us don't have to, gave me more than enough inspiration to find a good balance between ease of access, modularisation, and appropriate, re-applicable adhesives.

The first few rounds of E/DVT (Engineering/Design Validation Testing) saw:

- Most soldered components swapped for push-fit or lego-style-connectors
- High-wear items like the USB-C port and buttons modularised to their own sub-PCBA for ease of replacement
- Loose wiring swapped to ribbon cabling
- Mild adhesives used for holding the battery in place (with pull tabs) and display to the housing

During this process, I went through more than 10 samples improving rigidity of the unit, and ensuring the back wouldn't pop off too easily, since it wasn't glued on. Budgetary and time limitations prevented more development in this area; but if I was doing it again today I'd have aimed to make the back cover predominantly secured by screws rather than of clips/clasps, since the latter naturally wears out over time and particularly for customised orders, new printed back panels would have to be made to order when they did wear out.

With all changes in place, repairing a T8 became very straightforward & quick to do. Exactly the words repair centres and in-house maintenance teams like to hear when units come in with _something_ broken.

### Tough & resistant to unfriendly usage

In the process of improving repairability, the whole unit benefitted from greater protection from unfriendly usage by, for example, ensuring flex was minimised if the unit was crushed, twisted, or bent.

In addition to this I spent weeks with my team reviewing options for the outer finish of the unit, trying to find a balance between something that looked decent, but also held up against knocks, scrapes, drops, and so on. On the original T8 this was a rubberised finish on the housing, and it held up quite well in the target environments as it:

- Didn't really show marks
- Could be wiped off easily
- Offered better grip when holding it directly

In later production runs we toyed with a textured paint coating instead, offering most of the same benefits but more likely to hold up against harsher cleaning agents and such.

Then there were other design considerations, like the raised lip that surrounds the screen. This is dual-purpose both to absorb shock from drops (along with the rest of the mostly-plastic frame) and keeps the screen ever-so-slightly further from an object that might otherwise impact it. 

### Repellent to moist &/ corrosive environments

Knowing the tablet was destined - even during the product development phase with interested customers that predate DoorDash - to land in kitchen and high-humidity environments, but not wanting to fully seal the device for an IP rating (a trade-off for repairability), we dipped the internal components in a moisture-resistant coating.

Corrosive, in this context, is what is corrosive to a PCBA - impurities, salts, the like. I couldn't save the unit from an acid dip and keep it within a budget!

### Long term component support

Early on in the company's history a partnership was formed with MediaTek, as we pivoted to enterprise MTK's AIoT division became our go-to for chipset selection that guaranteed long-term support & availability. The MT8765 in the T8 is by no means a powerhouse, in fact it's probably one of the worst choices made as chipsets go due to the performance issues I've seen over the years with it. For Android Go it would have been absolutely fine, and in truth the T8 would have made for a great Go device given the predominant use-cases for it, but we certified it for full-fat Android in the beginning and stuck it out. 

That said, it's taken us from 9.0 to 12, with potentially longer support possible if desired. Since The T8 is coming up on 5 years in-market, that need is simply not there. 

Outside the chipset all the standard multi-source component procurement was done by the team accordingly, so we never suffered component shortages, even now 4 years later and running another batch of 10s of thousands of units through production component supply has been pretty reliable.

### Resistant to battery ageing

One of the more active requirements, especially from customers coming from consumer tablets they'd had docked to a power supply for 6+months and suffered battery ballooning, was to handle power management intelligently.

What I wanted to be able to facilitate from the get-go was a complete power management solution that allowed customers to:

- Boot & run without a battery connected (when connected to a power cable)
- Bypass the battery and run directly from power cable with the battery installed
- Configure OEMconfig APIs to control this via software, if it wasn't feasible to interface the hardware

Unfortunately this quickly overshot time & budget requirements, so I had to settle for a fully-software smart monitoring solution that would detect for how long the T8 had been plugged in, the voltages and cycles of the battery, and alter the charging profile accordingly. This required engineering coordination between the Android framework folks, kernel folks, and the engineers responsible for the [PMIC](https://en.wikipedia.org/wiki/Power_management_integrated_circuit) design.

From a UX perspective, it also introduced some scenarios that customers (or rather, their users who didn't read manuals) raised concerns about. When the tablet had been on charge for more than 24 hours straight for example, we allowed the battery to discharge intentionally to align with the new power profile. You can imagine the support tickets raised about devices not charging. There were also tickets raised about this solution not kicking in where customers would turn the power off to the tablet when their stores closed, and back on in the morning; the solution simply wouldn't ever kick in because it wasn't permanently (or >24h) on charge.

So it wasn't infallible, and accordingly we did see some genuine battery failures in the wild, but overall it's been a reasonably insignificant number compared to the number of devices shipped overall. 

## The Android journey

The RHINO promise has been bloat-free, vanilla Android since inception.

Beyond Google apps and a couple of OEM-specific services (activation server, OEMConfig, chipset support), and some OEMConfig APIs, my flavour of Android is as light and clean as it comes.

To achieve this was no insignificant undertaking as working with external engineering houses well-versed in the MediaTek turnkey builds (these are builds of Android the chipset makers offer with integrated support for the chosen chipset. Qualcomm, Rockchip, and others offer the same, often referred to as _BSPs_.) meant the only option for building Android I could get was to lean on these pre-made builds rather than building from AOSP.



The T8 launched with Android 9.0, and as of 2023 it has been updated to Android 12.