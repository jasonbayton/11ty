---
 title: "A guide to raising better support tickets"
 date: '2023-11-05'
 status: publish 
 author: 'Jason Bayton' 
 excerpt: "From someone who has supported both customers and internal teams, here's what we need to support you." 
 type: post 
 tags: 
     - Enterprise 
---

> Dear support,
>
> There is a problem with my devices, they won't load my app.

Does this look familiar? How about:

> A customer reports their remote control connection is unstable, and performance is unreliable. It has been like this for some weeks.

Unfortunately these two examples are inspired by some of many support requests I've observed raised in the last few weeks _alone_, with many more examples like this over the years I've been supporting customers and internal teams.

Why are these examples of weak support requests? The information provided is _just enough_ to suggest there's a problem, but not remotely close to what is needed to debug the issue without the assigned support person, or team, reaching out to gather more required information in order to be able to troubleshoot.

In the first example, the support team will know:

- There's an app
- More than one device is affected, potentially. It's not confirmed but can be assumed based on the wording and still needs validating.

They will not however know:

- How long it's been happening
- The app in question (package name, version, recent changes)
- What policies may be in scope to check for misconfigurations (in case of an EMM-enrolled device)
- How the app is distributed
- The devices in question (make/model/OS version)

.. and much more contextual information, all of which the support team will be forced to reach out to attain, adding unnecessary back-and-forth before the issue can even be addressed.

In the second example, support will know:

- The customer is using a remote control product
- It's not a one-time occurrence

But won't know:

- What unreliable means; does the connection fail? Is it slow? Does it drop frequently?
- Device(s) info (make, model, OS version)
- Number of devices affected
- Who the customer(s) is
- If there are errors shown
- Steps to replicate the issue locally
- Environmental information, such as how devices are connecting to the internet

.. and more again.

By choosing to raise tickets in this way, it is guaranteeing the time to resolution for a problem will be considerably longer, more drawn-out, and require more effort on both ends. For internal teams communicating issues in this way it additionally demonstrates a lack of care and/or respect towards your colleagues' time and workload.

So in contrast to the above, let's look at what a strong support ticket should be. The following has a lean on mobility platforms and systems, but can naturally be adapted to other products and solutions.

_Keep in mind, the aim is to reduce back-and-forth with support, not to pre-empt any possible question a support team member could possibly have; it's about putting in more than the minimum effort to raise a request that results in a faster resolution, and a win-win for both sides._

## Provide information upfront

Here's your basic checklist when raising an issue with support that will substantially reduce the delay to debugging in order to reach out for more information:

- A concise description of the issue
- How long it has been happening
- How many devices are affected
- Any specific tenant/platform/policy details to identify you
- How many customers are known to be affected, and customer names (for MSP/internal support)
- Device identifiers (serial number, IMEI) of affected device(s) support can opt to focus on
- Device information, make, model, OS version, OS build number. Provide more than one if details aren't consistent across affected devices
- Affected app information, package name(s), app versions (for app related issues)
- Replication steps
- Any scoped policies or configurations applied
- Logs, pictures, video of issues respectively

An example of a support ticket offering some of the above information, if we take the above first example of a submitted issue, could look like this:

> Dear support, 
>
> I have this week deployed a new app via policy, however it is not showing up on my devices.
>
> The policy name is **App deploy 1** and my tenant is **Customer tenant 3**. The devices targeted are a mixture of **Android 11 & 12**, I have checked and so far the app is not present on more than 10 devices, including the following IMEIs:
>
> 12345678901234  
> 12345678901235
>
> The application in question is **my Package**, a private application uploaded to the iFrame. I haven't had this issue with other applications from the Play Store so I'm unsure of why this one is failing. The policy saved fine and the app is showing pending install status.

When considering the above, the contrast between the first and second version of this support request is stark. From the revised ticket the support team will know:

- This is a new issue
- It's affecting multiple devices, two of which are provided for review
- The customer environment, policy, and application names are provided for immediate troubleshooting
- The application is a private app, and is an exception to the norm of public apps being used
- The EMM is showing the app is assigned, but devices are not installing

With the addition for 4 sentences and additional contextual information, the support team will have all of the information needed to start immediately troubleshooting, negating the need to ask additional questions, or set up a call for more info. 

The only thing that would improve the above would be the addition of a bug report, since replication steps and video/image aren't relevant in this instance, though understandably fetching logs from devices may require assistance over a call, or at a minimum a [detailed walkthrough](/android/how-to-capture-device-logs/).

Naturally depending on the type of issue there may be a need for more, or different, information. The remote control issue referenced in the above second example for instance would typically additionally require environmental information, such as:

- Type of connection used (Wi-Fi, cellular)
- Connection quality
  - Distance from router for Wi-Fi
  - Inside a building or outside for cellular, signal strength (bars shown, or dBm)
- Can it be replicated on another network?
- Can it be replicated with another device?
- Are there firewalls in place, or network QoS policies active?
- Load the device is under normally, as a lower-spec device may struggle casting its screen while performing other activities
- Are prompts being received? In Kiosk deployments, apps may not be able to display over the locktasked kiosk environment, or the notification bar may be disabled

All of this information isn't _expected_ in an opening issue request, but considering any of this for the inclusion in an opening request will significantly help in reducing the back-and-forth required, so as the requestor of a support ticket, the more information you provide upfront, the sooner an issue can be resolved.

## You probably don't need a call

One of the most common occurrences I've seen in recent years is the requirement from the support requestor to have a call to discuss the requests for further information needed by the support team. Further information being that which seeks to collect all the missing information from tickets in the opening examples.

What typically follows is support setting up a call with the requestor wherein the support team simply asks the questions once again through a different medium, and notes down the answers themselves.

Obviously there are situations where calls are legitimately seeking assistance in obtaining the requested information (such as _how do I find the OS version for the device_ or _how do I collect device logs_?) and these are wholly justifiable.

But if your intention is to ignore the questions asked until they're asked again over a call, this is once more going to significantly delay how quickly your issues can be resolved.

Take the time to read the request for information, and offer best-effort answers for everything understood; even if only half of the questions are answered and a call is needed to cover off the remaining with additional context or explanation, you may have already provided enough information for the issue to be identified, and again saved all sides time and effort where it doesn't need to be expended.

## Timely responses help everyone

If you're raising a support request, be prepared to engage with the support team in a timely manner.

From the perspective of the support team, requests raised with little information and extremely slow responses are the _worst_. Not only can the request not be solved, but the support team is then burdened with adhering to SLAs and non-response processes that mandate multiple follow-ups for information, and this may be triggered multiple times through the lifecycle of a request.

By raising a request and then treating it as your lowest priority, everyone suffers. 

## Go forth and raise better requests

Armed with the above advice, and a little insight from _the other side_, I trust you'll be able to create support requests both you and the support team you're raising to will benefit from. Just a few small changes to the approach of asking for help will make a world of difference. 