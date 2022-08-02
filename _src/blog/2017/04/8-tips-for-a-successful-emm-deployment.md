---
title: '8 tips for a successful EMM deployment'
date: '2017-04-08T00:12:51+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 4108
doccats:
    - General
Version:
    - '1.0'
publish_post_category:
    - '13'
discourse_permalink:
    - 'https://discuss.bayton.org/t/8-tips-for-a-successful-emm-deployment/40'
---
Recently, while browsing through EMM resources on Gartner, I stumbled across an [interesting study](http://www.gartner.com/newsroom/id/3528217) undertaken in 2016, in it Gartner reports:

> more than half of employees who used smartphones at work rely solely on their personally owned smartphones

That is by no means an insignificant number, one that’s likely already increased 4 months into 2017 and will only increase further as we approach the next decade.

And that’s a problem.

While employees are ready to leverage Enterprise Mobility to improve productivity, enhance their work experience and make their lives easier, businesses in many cases simply aren’t keeping up; a recent [study by Synchronoss](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2017/04/The_State_of_Enterprise_Mobility_Whitepaper.pdf) (via[ CWSI](http://cwsi.ie/the-state-of-enterprise-mobility/)) delved into the state of Enterprise Mobility in 2017 across organisations in the UK and US and highlights how alarmingly unprepared many organisations are – 38% of those asked are yet to implement basic measures to safeguard corporate data such as enforced device security, restricted access to corporate resources or even basic visibility\* of who is connecting in and to what.

<span style="font-size: small;">\* ActiveSync logs notwithstanding</span>

These problems also extend to COPE (Corporately Owned, Personally Enabled) and CYOD (Choose Your Own Device) where organisations recognise there’s a need to implement control over the devices allowed to be used in the business, but don’t necessarily expand this initiative to address the corporate (HR) policies, security concerns and many other necessary considerations for ensuring a successful EMM deployment.

Indeed, a successful deployment is not simply granting permission for employees to access email via their own smartphones or handing out devices with no corporate management enabled, it’s a time-consuming, complex project that has far-reaching implications if not properly thought out; planning for a successful deployment now is much easier than cleaning up a poor deployment later.

Here are some things to think about:

1. Decide what employees can access remotely
--------------------------------------------

A good starting point here is to evaluate current remote access tools such as VPN (Virtual Private Network). While some organisations grant employees access to everything on successful VPN authentication, many will only provide a subset of services remotely. The latter offers a reasonable template on which to base mobile access as well. In any case, the three main contenders for remote access generally are:

- Intranet
- Document repositories/File Shares
- Email

Occasionally other services such as Skype for Business or backend services for corporate applications may make the list as well. It’s not overly important to list every last item at this point, but to get enough to work with to make a start – more services can always be added later on.

2. Decide what services will no longer be publicly available
------------------------------------------------------------

Now is also a good time to consider the public services made available to employees:

### ActiveSync

By deploying an EMM email gateway, whether on-premise or in the cloud, two of the most common issues with ActiveSync can be fixed:

1. It’s open to the entire world as it’s infeasible to attempt to lock it down to every possible IP range an employee may be logging on from
2. Anyone can authenticate and gain access to their email on any ActiveSync-enabled device

With an email gateway, email access is only going to be originating from one or two IPs (depending on the number of gateways required for the number of devices using ActiveSync), and as devices have to be enrolled onto the corporate EMM platform, organisations can feel confident no one is going to be accessing email from devices they don’t know about, or don’t approve.

There’s no reason why, once EMM is successfully deployed, ActiveSync has to be open to the entire world when it can be [easily locked down](/2016/02/restricting-access-to-activesync/), reducing the attack vector on the corporate network (be that local or cloud, with services like Office365).

### (S)FTP, Sharepoint, other Document/Intranet repositories and sites

Providing access to corporate content from mobile devices has always been something of a challenge, one often “overcome” by employees through the use of 3rd party services such as Dropbox or OneDrive with or without the knowledge of the business.

While the threat of data leakage through external file sync services is bad, at least those services are secured with a password; once employees download content to their devices through these services or others, such as email, they may be doing so potentially to unencrypted, unsecured and unmanaged devices.

EMM may not be able to entirely solve a data leakage issue in the organisation, but it can certainly be improved.

With MCM (Mobile Content Management) and content gateway solutions, combined with stronger DLM (data lifecycle management) policies can help to achieve a few things:

1. <span style="font-weight: 400;">Services such as Dropbox, Box, etc can be inaccessible from the networks on which corporate data is stored</span>
2. <span style="font-weight: 400;">Corporate data can be freely accessed from managed, secured devices through MCM applications but cannot be stored outside of the secure application</span>
3. <span style="font-weight: 400;">With MCM specifically, documents can be distributed ad-hoc to devices based on specified criteria, only opened in approved applications and be set to expire after a certain period of time.</span>
4. Email attachments can be intercepted and prevented from opening outside of the secure corporate device environment

Typically content gateways are set up on the corporate network as either a virtual appliance or dedicated virtual server and configured from the EMM solution to provide the necessary access based on groups and criteria the business sets. Users that aren’t enrolled onto the corporate EMM platform will find it much more difficult to gain access to corporate data through unofficial means once effective steps have been taken.

3. Decide how employees will access the network
-----------------------------------------------

Revisiting the acronyms above once more – BYOD, CYOD, COPE (and others) – how employees access corporate resources can vary depending on the type of EMM deployment they’re a part of. If a device is fully corporately owned and managed, it’s reasonable to feel it should get direct access to the corporate network. Devices brought into the organisation and owned by employees however, not so much.

Furthermore, if employees do indeed bring their own devices, should any and every device ever made be automatically supported? Of course not. Policies (discussed below) should be put in place and the organisation can decide the operating systems (and versions) and/or device types to be supported following some internal testing to confirm those chosen work well with both the EMM solution and the services they’ll access.

Beyond that, the organisation needs to consider how employees authenticate to services – username and password? Certificates? Two-factor authentication? There are security and usability factors to keep in mind whichever methods are chosen, as well as the infrastructure to support them.

<div class="bs-callout bs-callout-success">####  Data Containerisation

Containerisation is the act of separating work data from personal data on a mobile device. It was a big topic of discussion in 2016 and it’ll no doubt continue to be this year; although containerisation is often associated with BYOD, there is no reason why it can’t be implemented for CYOD, COPE or other corporate mobile initiatives in which the business owns and manages the devices for additional security.

For example, it may be fine to use the native email client to access mails, but a highly-secure content repository might reside inside a password-protected EMM container on the device where DLM (data lifecycle management) tools may block the ability to copy, email, print, etc. documents within it.

</div>4. Decide what devices can and can’t do
---------------------------------------

No one enjoys using a device that’s been utterly crippled by corporate restrictions, but sometimes they’re necessary, like disabling the camera in secure environments or enforcing actions on the detection of a root or jailbreak.

EMM platforms may provide time-based and geographic profiles, meaning between 9am-5pm Youtube can be blocked, but when the work day is over the device is freed of its limitations. Similarly for employees entering and leaving a secure facility, everything from camera to bluetooth, microphone and more can be disabled to prevent any unnecessary collection of secure data.

Naturally with devices being used for work, it shouldn’t come as a surprise to employees to see a prompt asking they enable a passcode or encrypt their device. The type of passcode can range from a pattern to a 6 digit PIN or 24 character alphanumeric password, though for the latter do consider the impact it’ll have on employees if it’s not necessary.

5. Evaluate the architectural requirements
------------------------------------------

In order to provide access to file shares and other internal services, often one or more additional components (beyond the main EMM server, if installed onsite) will need to be installed. As with most appliances, the more users and devices requiring enrolment, the larger the implementation.

Evaluate the hardware and software requirements, the number of devices supported per appliance (as performance can suffer when overloaded) and the network requirements in order to discern how many components and of what type need to be installed, and where they’re best located – in the DMZ, LAN or both where the component can split into relay and endpoint.

For an EMM platform integrating with LDAP, email, file shares and intranet services, no less than 3 additional components over the EMM platform itself will normally need to be installed. For the platform itself, this may be one self-contained virtual appliance or it may require a database server, reporting server and more. Where HA, clustering (if required) and DR is involved, that’ll obviously increase.

When designing the solution, aim to forecast device numbers 5 years ahead where possible, reducing the likelihood of future premature expansion projects.

6. Define corporate policies
----------------------------

With a plan in place and a reasonable agreement on how devices will interact with the corporate network, the business will have a better understanding and scope with which to align corporate HR policies.

It doesn’t matter what is announced to the business in a town-hall, or how many emails are circulated with rules and warnings for interacting with corporate information, without policies and procedures in place for all employees to understand, agree to and sign, the organisation will not be legally protected.

It’s much easier to amend policies already in place than create them when required, so aim to publish, at a minimum, the following policies/procedures before enrolling devices:

- Acceptable use for corporate/personal devices
- Data ownership and storage
- Enrolling and retiring corporate/personal assets
- Supported devices

Feel free to combine the above headings into larger BYOD/Corporate policies, add or amend as required. Once policies are in place, the organisation will know where it stands in relation to the use of mobile devices. These policies can also be pushed to employees while their devices are being enrolled, making it a mandatory step during enrolment and ensuring the policies are agreed to before gaining access to corporate data.

7. Test, tweak and iterate
--------------------------

Few organisations get it right on the first try, and that’s perfectly fine.

Once the goals and objectives from a business/security perspective have been agreed on paper, encourage and utilise the feedback from employees directly impacted by the changes to reach a balance between locking everything down and enabling employees to undertake their corporate responsibilities.

Make use of pilot groups and don’t be afraid to tweak configurations and profiles as necessary; it *is* a new and challenging aspect of corporate IT, one which, as referenced at the beginning, is still in the very early stages of adoption across a large portion of businesses. In the last 5 years the mobile landscape has shifted considerably in capability and security, and likely will continue to do so – unlike traditional IT the mobile space moves at a consumer pace and will absolutely require amendments to all aspects of the Enterprise Mobility deployment in order to ensure the business keeps up the pace.

8. Seek assistance
------------------

Years ago an EMM undertaking was very much a self-support affair. Today however, there are businesses all over the world dedicated entirely to Enterprise Mobility.

Any organisation looking to take the plunge, whether that’s undertaking a brand new EMM deployment or making changes to an existing deployment, who feel they may benefit from advice, professional installation/rollout or even an entirely managed service should absolutely seek assistance from market leaders.

Conclusion
----------

Mobile usage in the business isn’t going away any time soon and organisations, in order to both enable employees to better do their job and keep corporate data secure, need to seriously consider implementing a robust EMM environment.

Hopefully the tips above offer a few points to think about for both new and existing implementations; as an evangelist of all things mobile in the enterprise I only want to see the industry succeed in taming unmanaged device usage and the serious security and data implications that come with it. As the industry matures I look forward to seeing it flourish and, more importantly, that 38% drop to nothing in the near future.