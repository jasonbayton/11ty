---
title: 'Incorporating WLM into a corporate environment'
date: '2009-05-04T16:51:12+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 92
tag:
    - chat
    - client
    - corporate
    - easy
    - free
    - integration
    - Linkedin
    - MSN
    - VoIP
    - WLM
post_format: []
tmac_last_id:
    - '205557752217600000'
post_views_count:
    - '800'
tags:
    - Projects
---
Technology has brought us many, many different tools to help make our day to day lives just a little bit easier. Be it a quick message to a friend across the water, the latest music at our fingertips, 500watts of Microsoft Office (or Open Office for some!) simply begging to spruce up presentations etc. There isn’t much that technology cannot do for us. So why would this be any different 9am-5pm? Where does it say that just because a company is small, it cannot be utilising these tools to make an employees job just a little better, easier and perhaps even more enjoyable?

No, I don’t see where it states that either.

With a dramatic presentation came the launch of the new company Intranet. With this intranet, many new features based on Microsoft Sharepoint were explained, in detail. Collaboration spaces, announcements, bulletin boards, blogging, document sharing, the list continues. However a feature that sparked a twinkle in my eye was the use of Windows Live Messenger. This feature, this powerful tool was not put into place within HO and I couldn’t see why not. Users have up until now relied on email and telephone communication. For me, that seems a little too much work for a quick message, and I was surprised that others didn’t have the same opinion.

Initially I made up a small plan to offer the service to those who may be interested in it. Unsurprisingly, there were less than I’d thought who replied to my offer. Still, I set about helping each individual that wished for an account get one. I won’t go into detail on the makings of WLM accounts as it’s fairly well known.. well, outside of the company at least. I hoped that as one user received an account, their colleagues would follow. Surely enough that’s exactly what happened, and it wasn’t long before I was receiving requests for departmental heads wishing to be part of the “craze” which had hit. Although there are still many who have refused to become part of the corporate network, that percentage is getting less and less as time goes by due to the influences of colleagues and presentations on the benefits of using WLM prevail.

As time has gone by, once a mere spectator, I have become more involved in the presentations of the intranet to field offices and regional controllers, offering the incorporation of WLM into their offices with the ability to communicate with Head Office a lot faster and more smoothly. In the background I have created several different “Messenger Lists” of users in each department within HO to make the addition of colleagues just a little better.

Using XML in the following format;

```
<?xml version="1.0"?>
<messenger>
  <service name=".NET Messenger Service">
    <contactlist>
      <contact>first_contact@some_domain.com</contact>
      <contact>second_contact@some_domain.com</contact>
      <contact>third_contact@some_domain.com</contact>

      ...

      <contact>last_contact@some_domain.com</contact>
    </contactlist>
  </service>
</messenger>
```

I was able to create as many different lists as I wished, and after saving them as .CCT files and opening messenger, succeeded in importing multiple users into one address list from specific departments. These are still in the works and undergoing some fine tuning, but it shows once again that the tools are there for us to use, and I for one was happy to find this one. Saving me importing one contact at a time for hours.

Just one of many examples of how technology helps us daily, and in this case I’d like to think I’m helping users spend less time with emailing/calling and more time on their work, with the little WLM icon gleaming from the status tray.