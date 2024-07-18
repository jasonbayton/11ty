---
 title: "Ask Jason: How should we manage security and/or OS updates for our devices?"
 date: '2023-10-24'
 status: publish 
 author: 'Jason Bayton' 
 excerpt: "Ask and you shall receive. You may also find your question posted on the website." 
 type: post 
 tags: 
     - Enterprise 
---

Damien asked, through the [Mobile Pros](https://mobilepros.org) Discord community:

> We have approx 5000 COPE devices with just over 4000 of them Samsung all managed using WS1 UEM. Should we use e-FOTA? If not what? What about BYOD devices? Our security team is advising us to cut access to those who don’t have a patch of 2 months old. Our minimum version is OS 12 but this would mean cutting the access to quite a few devices whose manufacturer is no longer rolling out patches! I can do this via compliance policies on WS1 but I find this a bit extreme. [..] Jason, not sure if you can weigh in here? 😉

This is such a common question, and rightly so because it's one of those subjects that tends to involve more than one part of the business, with various understandings, opinions, and perceptions on what's secure across the whole mobility estate, not Android alone.

## Jason says

For your question it's a little varied by use case but most popularly day to day for updates I tend to use the windowed update policy to push app and system updates overnight (or off the clock), and occasionally check in to see if anything is struggling.

Not being a Samsung house for the last few years I've not leaned on e-FOTA [recently] but I absolutely would for major update management (or rather, postponement) for testing, since the 90 days AE offers comes with caveats. It has many more features than typical OTA management as well I'm sure you could get used to :)

For cutting off, 2 months doesn't even permit the normal 90 day update cycle many OEMs offer. Perhaps over 6 months isn't unreasonable, but a non-supported device should be considered in the context of its supported counterparts. What was patched in 6 months after EOL? Probably nothing critical, possibly nothing overtly vulnerable. OEMs can technically get away with 12 months of SMR from new, and then only patch critical, which may be 10 a year, or none in 3. An arbitrary period of time doesn't make the best sense in that regard particularly for BYOD where your biggest concern is breaching the work personal divide, and any vuln capable of that would be talked about. You'd be ruling out almost brand new devices after just a year - in an extreme example.

Instead, I would (and do) monitor CVEs for impacting vulnerabilities and make a call to cut off devices that don't have the associated SMR once available. It's a monthly check but honestly compared to the support burden of arbitrary blocking of devices based on a number plucked from the sky it's my preference.

Fully managed estates without the additional protection of profile isolation I err to the side of replacement at EOL. Exceptions exist for this too though, kiosk devices fully locked down with no user access will be inherently less vulnerable than knowledge worker devices; there's a sliding scale of risk to consider based on use case as I mentioned, and that comes down to the risk appetite of the organisation.