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

With these in mind, I thought I'd take some time in this article to dive a little deeper into the product development of the RHINO T8 and some of the product decisions I made during the development of the tablet that ultimately made it attractive to DoorDash, becoming one of their most-deployed units today.

<div class="callout">

As I delve into some of the finer details of T8 development, I'd like to point out this is a 2019 device. Some of the features that made it notable at the time are simply par for the course in 2023 with many manufacturers. That said, I'm proud of the decisions made early on in development that got it to where it is today.

</div>

## What is the RHINO T8?

I touched on the T8 back in 2020 with my [Building Android devices](/blog/2020/12/on-building-android-devices/) article. I'd recommend you take a gander at that if you haven't as I provided a good deal of relevant information as to where RHINO came from and the longer-term plans for the brand and ecosystem.

The T8 was part of the first generation of RHINO devices we built from the ground up, something that would not happen again with the gen 2 devices as the company opted instead to customise products ODMs already had. 

That said, here it is:

![RHINO T8](https://cdn.bayton.org/uploads/2020/12/20201113_103412.jpg)

It looks, behaves, and mounts like a standard 8" tablet available from many OEMs in the market today, and _especially today_ in fact, as the ecosystem has filled to the brim with tablets in the last couple of years; far more so than in 2019 when the T8 project kicked off. But that was the intention.

## Developing the product

In strategising what "RHINO" should be, it was ultimately decided the RHINO brand would be used as a readily-available, widely-applicable showcase of what the company could produce; to act as a springboard into more complex and bespoke projects that could (or not) leverage these devices as their base. This achieved two objectives:

- Customers could see and feel the build quality of a device _in their hands_ rather than relying on the word of a sales rep. It cannot be understated the difference this has when asking a customer to commit hundreds of thousands of pounds for a product they won't see for 6-9 months.
- For smaller projects the existing tooling and internal designs could be mostly or entirely reused, significantly reducing time to market

One additional benefit for the company was having own-brand stock available for customers simply wanting to buy a device, and as a value-add we were able to pop the company logo of any customer on the tablets for larger orders, giving a bit of organisational customisation most mainstream OEMs don't offer.

The T8 and it's larger sibling, the C10, were the first tablets I worked on under the RHINO brand.

Going in to the product development for these devices, I knew a focus on enterprise as a USP would be very much benefitial, even if MSRP wouldn't eventually be as competitive as it could have been. This mindset drove some key requirements for the device:

- Ease of repair
- Tough and resistant to unfriendly usage
- Repellent to moisture & harsher environments
- Long term component support

Again, nothing groundbreaking here, and OEMs at the time were well-versed in similar requirements for their own offerings (H/T Zebra, Honeywell, Panasonic, etc), but almost across the board they were rugged devices and didn't aim to target the pro-sumer hybrid of consumer device with enterprise features. 

But what does this actually mean in terms of product decisions?

### Ease of repair