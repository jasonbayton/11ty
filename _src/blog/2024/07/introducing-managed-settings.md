---
 title: "Introducing MANAGED SETTINGS"
 date: '2024-07-04'
 status: publish
 author: 'Jason Bayton'
 excerpt: "A consistent, vendor-agnostic approach to managing Android device settings"
 type: post
 tags:
     - Enterprise
---
I've been supporting customers on their modern Android management journeys for several years now, and as you can imagine, the more customers you engage with, the more you notice patterns and friction points that resurface time and time again. 

For me, having access to system settings from within kiosk environments is one such example of those friction points, and one of the first projects for 2024 I opted to undertake after launching my [QR code generator](/qr-generator) last year.

Don't get me wrong, plenty of vendors in the ecosystem have Kiosk/launcher applications that will offer a solution from within their own applications, AirWatch/WS1 UEM's launcher & Knox Manage kiosk are some of the several examples of these. Recently though, and particularly with the surge of AMAPI based EMM platforms, it's become increasingly clear many do not. 

So, I went about designing a relatively straightforward answer - MANAGED SETTINGS. 

<img src="https://cdn.bayton.org/assets/managed_settings/managed_settings_hero_gif.gif" width="300px" alt="managed settings preview" />

## What is it?

MANAGED SETTINGS is a simple app that provides end users the ability to launch settings intents. This isn't a new concept; searching Google Play brings up many such apps. The key differentiator with MANAGED SETTINGS is the ability to toggle these various intents on and off based on the specific requirements of an organisation through managed config (and thus, the name was born). Out of the box I've aimed to support as many intents as is reasonable, omitting only those which are troublesome to support (i.e those commonly adjusted from the behaviour of AOSP across OEMs) or likely not to see any use, but over time more will be added, so too will custom intent support, allowing organisations to leverage OEM-specific intents with their managed estate without relying on me to implement and support them.

As an added bonus, organisations that struggle to document and/or support the unique and sometimes confusing layouts of OEM-customised settings applications across both their company owned and personally owned estates, are able now to deploy one consistent settings app to everything. Building your documentation around an agnostic, standardised application makes the whole process quicker and more straightforward for all involved. 

MANAGED SETTINGS works across fully managed, dedicated, and work profile devices. 

## When can I get it?

I'm releasing MANAGED SETTINGS as a free application on Google Play, available today. In spite of its simplicity, a lot of time and effort has been put into this, so if you'd like to support the continued development of projects like this for the betterment of the Android Ecosystem, I'm offering a licensed upgrade for MANAGED SETTINGS which offers (currently) basic customisation of the in-app experience. In an upcoming release this will extend to theming to allow organisations the option of setting a colour scheme for the MANAGED SETTINGS app that'll enable closer alignment to your organisation's brand - but I want to ensure there's demand for that before I commit to it 🙂

Get it here:

<a href='https://play.google.com/store/apps/details?id=org.bayton.managedsettings'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width="200px"/></a>

If you're interested in learning more, visit the [project page](/projects/managed-settings) for an in-depth overview, support docs, and other resources.

## Setting expectations for support

Though I've done my best to support the breadth of Settings intents across most major Android OEMs and recent Android versions, it's well known that sometimes intents just don't work, or the OEM Settings application in general causes issues. APN is a good example of an intent that'll work on some devices, but inexplicably fails (or gives permission issues) due to the way OEMs have implemented their telephony stack. I have multiple fallbacks implemented where possible to overcome _some_ instances where an adjusted call is required, but I don't have the resources to test every device on the market. 

Interestingly, tablet devices with split-screen Settings app implementations are also far more likely to inadvertently expose additional device settings due to how they're designed, and unfortunately I can't do anything to combat that. I'm more than happy to work with organisations finding issues with certain intents, and if I can resolve them I absolutely will.

To touch on EMM support as well, the managed config implementation is quite basic and should be supported by all major vendors without issue, certainly confirmed so far through my testing. That said, if your vendor isn't working correctly, I'm happy to get to the bottom of it.

Feel free to [reach out](/contact) to debug, and I hope you find MANAGED SETTINGS useful for your managed Android estate!