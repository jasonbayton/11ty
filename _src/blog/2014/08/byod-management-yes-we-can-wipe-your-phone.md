---
title: 'BYOD Management: Yes, we can wipe your phone'
date: '2014-08-07T09:11:45+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 2086
tag:
    - business
    - BYOD
    - 'data wipe'
    - Enterprise
    - privacy
    - security
post_format: []
post_views_count:
    - '0'
tags:
    - Enterprise
---
Over the weekend I had a discussion with a friend regarding BYOD and the amount of control a business can have over a personal device. As someone with no experience in this area he was shocked to learn a company can completely wipe a managed device and return it to factory settings. All those photos, files, songs, contacts, messages… gone. Just like that.

*“Why on Earth would anyone consent to BYOD?”* he exclaimed.

Following that, I was intrigued to know just how many people in my immediate circle of family and friends were completely unaware of the powers a business may have over a smartphone used to access corporate data.

I talked to a further 12 people all together and was amazed to find **9 of them** had absolutely no idea anyone could ever administer their device, **5 of those** had either a corporate, managed device or were accessing corporate data (read: Exchange in all cases) from their personal phones.

![](https://cdn.bayton.org/uploads/2014/08/0decf78.jpg)

For those with managed devices I asked, already fearing I knew the answer, whether they had read and understood the policies their respective companies should have provided regarding access to corporate data via mobile devices (because all companies do that, *right*?!) and was expectantly met with a resounding “no”. Those using their personal Android devices had equally ignored prompts that stated they were permitting corporate control (example right) when adding their Exchange accounts (though admittedly iOS doesn’t get the same luxury; at best you might observe a requirement to suddenly add a PIN which may tip the owner off that something has changed without actively checking profiles in Settings).

Oh dear.

Being in an era where blindly accepting T’s &amp; C’s is incredibly normal, an act of which I’m more than guilty of myself, I suppose it shouldn’t come as a huge surprise to learn employees aren’t realising they’re not only handing administration of their devices over to the business, but potentially giving the business access to private data too.

Now I realise this all sounds a little… invasive, but before you run off to flush your smartphone down the toilet, lets try to explore this from both sides.

### A full wipe is typically a last resort

To clear any misconceptions right off the mark, businesses tend to see fully wiping a personal device as an absolute last resort. For devices that are enrolled onto a mobile device management solution, the MDM admin would typically opt for an enterprise wipe in place of a full wipe on any normal occasion. An enterprise wipe will remove corporate email, policies and any managed applications or distributed documents from a device and leave all personal information intact. If the company prefers to utilise workspaces (or “Containerisation” if you like) for corporate information, it’s even easier to revoke access and have all trace of it vanish at the click of a button.

The only occasion a device might be fully wiped is on loss or theft. Even then a full wipe should be discussed with the owner of the device before carrying it out, particularly as while the device is enrolled and online it can be found.

For devices managed solely through Exchange [there is no enterprise wipe](https://technet.microsoft.com/en-gb/library/bb124591%28v=exchg.150%29.aspx) (yet). Procedures tend to differ but I’ve talked to a number of companies that enforce the same policy I do; prove the device has had all traces of the Exchange account removed and there’s no need to perform a full wipe. That typically entails a visit to IT, but photos/screenshots may also be accepted. The end-goal is to make sure there’s no corporate data on the device when the presumably soon-to-be-ex employee walks out and while user-accounts can be revoked, any email on the device before said account was revoked will stay there indefinitely unless manually removed.

Naturally ex-employees may not be feeling overly compliant. In that case providing the business has made their intentions clear, they have a right (and likely a signed agreement) to protect their own data. A full wipe may well be the only way of doing so.

Before it even gets to that point though:

### The company should make their policies known

As I outlined in *Policies, procedures and documentation* in my last article,[Thoughts on BYOD](https://www.linkedin.com/today/post/article/20140612225844-28745130-thoughts-on-byod), having suitable documentation to support a BYOD environment is crucial to making it work.

These policies should include the amount, type and frequency of data collected from devices to give employees a transparent view of what they’re signing up for as well as making a point of stating a full wipe may always be a possibility. If location data is being collected also, it’s even more important to make sure employees are aware and agree.

Of course, it’s no good having policies signed off by the business if they’re left to gather digital dust on a fileshare somewhere. The business needs to put these documents front-and-centre before every employee wishing (or having) to enrol onto the management solution.

Getting these documents read, understood and signed is the only way to safeguard the business against any legal challenges down the road and it provides the employee ample opportunity to read over and question the terms set out over how their device, the corporate data and their personal data is to be managed.

### The employee should read, understand and question the policies

The requirement to manage a device is perfectly common in any forward-thinking, mobile-friendly business.

A company wanting to gain administrative control over a device will be at the very least expecting to be able to wipe and password-protect it; They’re two key assets in protecting corporate data and set the bar for what is essentially a “managed” device.

However that is typically only the tip of the administrative iceberg. More and more companies adopting EMM solutions may be able to track device location, monitor data usage (even as far as the [domains enrolled devices visit](/2014/05/a-month-with-wandera-mobile-gateway/#Dashboard)), view installed applications, know when the device was last “active” and more. This is all extremely useful information for corporate devices, but it might seem like an overreach of data and an infringement on privacy for a personal BYO device.

It is for this reason that before enrolling a device the employee should read, understand and question the policies around the solution on which they’re enrolling. There’s rarely an exception list to exclude monitoring of one feature or another in these solutions so while it wouldn’t be possible to request exclusion from logging call history for example, it aids in the decision making-process over what device an employee might enrol (explained below).

Any employee not presented with these documents needs to seek them out, if for no other reason than peace-of-mind. When I enrol a device I want to know at the very least what the capabilities of the management solution are and how much of it is actively utilised or may be utilised in the future.

### “Why on Earth would anyone consent to BYOD?”

Circling back to the original question, the two scenarios in which BYOD commonly exists are:

- Voluntary: you opt in to BYOD because you want to.
- Mandatory: as a condition of employment.

BYOD provides an opportunity for both employer and employee to benefit; Employers reduce cost on buying and maintaining their own hardware (which may or may not offset the perceived increased support burden) and employees get to use a device they know they’ll get along with. Between an old chunky Blackberry from out of the IT drawer and a nippy new G3, Xperia, iPhone or Lumia, I know which I would choose.

It’s worth stating BYOD doesn’t stand for “Bring Your *Only* Device”. Depending on the company policy (have I mentioned employees should read this?) it could be the case that in lieu of a corporate device, the business may provide a SIM to be used for work purposes or offer to cover the cost of using a personal SIM instead. In either of these cases all that’s required is a SIM-free device.

I can’t speak for everyone naturally, but I know I’m not the only one who can say I have amassed a number of devices over the years, several of which aren’t very old (rather, simply replaced due to upgrades or, in my specific case, because I [review a lot of devices](/)). In this situation I wouldn’t use my current device, but would instead use another I have lying around either with a company SIM or with a new PAYG SIM dedicated to work use.

Of course, if for any reason there aren’t any spare devices going then the only other option to avoid using a single device for both personal and corporate use is to buy one. A very basic Samsung/Sony Smartphone goes for around £70, if the budget will stretch then a Moto G is £120-150 (and it’s a rock-solid device). Looking around you might even find something cheaper providing it’s fit for purpose.

It would be an investment, sure. But perhaps that’s a fair price to pay to retain privacy whilst getting to use a device that may be substantially better than any company would offer.

Whatever you decide to use, be sure to keep it backed up if you’re worried about losing your personal data.