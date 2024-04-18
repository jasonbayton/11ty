---
title: 'How to host enterprise apps outside of Google Play'
published: '2024-04-13'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - App management
layout: base.njk
eleventyNavigation:
  order: 6000
effort: 4
---
## Introduction

In the ever-evolving landscape of enterprise mobile application deployment, organisations have increasingly sought greater flexibility over how their apps are managed and distributed. Historically, businesses were able to deploy APKs directly from EMM solutions, though as the industry migrates over to AMAPI this is becoming increasingly more difficult to achieve without the partnership of OEMs. 

In place, Google wants all organisations leveraging the Play Store for app distribution, which although for the most-part is reasonable, causes headaches for a subset of organisations.

Understanding the desires of organisations, Google introduced an alternative to uploading APKs to Google Play, allowing organisations to host their APKs externally to Google's infrastructure while still leaning on the store for the delivery. This guide delves into the process for setting up external hosting for private apps, allowing organisations greater control of their APK distribution at a cost of _some_ functionality within Play itself. These limitations are, per [Google](https://support.google.com/googleplay/work/answer/6145182?hl=en):

> - Externally hosted apps can only be published to production. Closed releases for externally hosted apps aren't supported.
> - Publishing externally hosted apps is not available through the Managed Google Play iFrame.
> - IT admins can't remotely install externally hosted apps on devices with work profiles. Work profile users must install them manually from Managed Google Play.
> - Android Auto second-screen projection is disabled. This is because all Auto-targeted apps must go through a specific review to ensure that they’re not distracting to drivers.

In addition, applications deployed in this manner are not scanned/vetted by Google Play, however may still succumb to on-device scanning. Anything potentially harmful will be actioned one way or another, but may take longer to detect than for apps distributed through Play directly.

## Preparing for External Hosting

- **Tools Needed**: OpenSSL, JDK, Python 2.x, Android Asset Packaging Tool (AAPT), `ExternallyHosted.py` script from Google.
- **Infrastructure**: Secure server or cloud environment for hosting the APK file(s). 

### MacOS guide

<div class="callout">

On Mac homebrew is required for this guide, it can be installed as follows from terminal:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

</div>

I found setting up the requirements to be laborious, not least because the script Google provides relies on Python 2.x for the since-deprecated `distutils` called by it. When pulling in python through homebrew, the options to select 2.x are no longer present. 

A workaround for this is to install `pyenv` and then call for a version via that instead:

```bash
brew install pyenv
pyenv install 2.7.18
```

I went with python 2.7.18 with no particular reasoning in mind; it was a newer 2.x release that fit the requirement. Use a 2.x release you're comfortable with.

After which, install openjdk & openssl:

```bash
brew install openjdk openssl
```

For AAPT, this can either be installed through an existing Android Studio install via SDK manager, or using the [command line tools](https://developer.android.com/studio#command-line-tools-only) directly. 

AAPT will need to be exported to `PATH` for easy reference, which I did by editing my `.zshrc` file to include the following line:

1. `vim ~/.zshrc`
2. `i` to INSERT:

```bash
export PATH=$PATH:/Users/jasonbayton/Library/Android/sdk/build-tools/33.0.0
```
3. `wq` + `ENTER` to save.

Your `PATH` will differ, based on what version of the SDK you're running, or where you've downloaded the standalone command line tools. Update it accordingly above.

You can also add python to your `PATH` in the same way if desired, I chose to call it directly via the install directory homebrew dictated.

Before continuing, make sure the `PATH` updates have been loaded in with `source ~/.zshrc` in terminal, otherwise you'll get errors suggesting `PATH` has not been set (AAPT can't be found, etc).

Finally, download the [python script](https://github.com/google/play-work/blob/master/externally-hosted-apks/externallyhosted.py) from Google via GitHub, and make sure it's executable with:

```bash
curl -o externallyhosted.py https://raw.githubusercontent.com/google/play-work/master/externally-hosted-apks/externallyhosted.py
sudo chmod +x /path/to/downloaded/externallyhosted.py
```

### Ubuntu guide

<div class="callout">

This process will work for Windows via WSL also, so consider this the Windows guide if you're familiar with WSL. If not, I'm happy to take a PR to add Windows instructions in. Use the **Edit this page** link at the bottom to modify and submit.

</div>

Install the dependencies:

```bash
sudo apt update
sudo apt upgrade
sudo apt install -y python2.7 openssl openjdk-21-jdk aapt zipalign
```

Change directory (`CD`) to where you're going to work from, then: 

Pull down [the script](https://github.com/google/play-work/blob/master/externally-hosted-apks/externallyhosted.py), and make sure it's executable: 

```bash
wget https://raw.githubusercontent.com/google/play-work/master/externally-hosted-apks/externallyhosted.py
sudo chmod +x externallyhosted.py
```

Pull down or place your local APK into your working directory for simplicity, otherwise adjust the `--apk=` config in the script below to reflect the stored location of your local APK (e.g. `/home/jason/release-apks/my-project.apk`). For me working in a LXD Ubuntu container, I just grabbed my hosted version:

```bash
wget https://cdn.bayton.org/download/org.bayton.external.apk
```

### Hosting the APK

Google don't document any hard and fast rules for where an APK should be hosted, but they do make references to unavailability of applications if reliant on an as-yet unconfigured (or not enabled) VPN solutions, suggesting they're OK with access being limited. 

For this, I popped my test APK in my CDN. It's obviously very public. In production, I'd likely either put it on a private cloud instance, or implement Google's suggested [authentication](#authenticating-downloads) referenced at the end of this doc.

## Generating the JSON Metadata File

Once your environment is set up, you're ready to run the command.

The generic sample code Google offers is as follows:

```bash
python externallyhosted.py --apk=<path/to/your.apk> --externallyHostedUrl="<https://yourserver.com/app.apk>" > metadata.json
```

On my machine, factoring in the system-unique environmental decisions I made above, it's this:

**MacOS**

```bash
/Users/jasonbayton/.pyenv/versions/2.7.18/bin/python2.7 ./externallyhosted.py --apk=/Users/jasonbayton/Desktop/org.bayton.external.apk --externallyHostedUrl="https://cdn.bayton.org/download/org.bayton.external.apk" > org.bayton.external.metadata.json
```

**Ubuntu**

```bash
python2.7 externallyhosted.py --apk=org.bayton.external.apk --externallyHostedUrl="https://cdn.bayton.org/download/org.bayton.external.apk" > org.bayton.external.metadata.json
```

Which then output the following JSON, piped to the file `org.bayton.external.metadata.json`:

```json
{
 "icon_filename": "res/uF.xml", 
 "file_sha256_base64": "df2kr163h1/GXJKSP7YplkXvca5m7o6aNdkyLou6mRE=", 
 "file_sha1_base64": "iGuUXjuRR6gNp8CtyQEyRUCsoYY=", 
 "package_name": "org.bayton.external", 
 "application_label": "BAYTON", 
 "icon_base64": "AwAIAMABAAABABwAoAAAAAYAAAAAAAAAAAEAADQAAAAAAAAAAAAAAAsAAAAbAAAAJQAAADIAAAA/AAAACAhkcmF3YWJsZQANDWFkYXB0aXZlLWljb24ABwdhbmRyb2lkAAoKYmFja2dyb3VuZAAKCmZvcmVncm91bmQAKipodHRwOi8vc2NoZW1hcy5hbmRyb2lkLmNvbS9hcGsvcmVzL2FuZHJvaWQAgAEIAAwAAACZAQEBAAEQABgAAAACAAAA/////wIAAAAFAAAAAgEQACQAAAACAAAA//////////8BAAAAFAAUAAAAAAAAAAAAAgEQADgAAAADAAAA//////////8DAAAAFAAUAAEAAAAAAAAABQAAAAAAAAD/////CAAAAQYAA38DARAAGAAAAAMAAAD//////////wMAAAACARAAOAAAAAQAAAD//////////wQAAAAUABQAAQAAAAAAAAAFAAAAAAAAAP////8IAAABAgAJfwMBEAAYAAAABAAAAP//////////BAAAAAMBEAAYAAAAAgAAAP//////////AQAAAAEBEAAYAAAAAgAAAP////8CAAAABQAAAA==", 
 "uses_feature": [
  "android.hardware.faketouch"
 ], 
 "version_code": "1019", 
 "certificate_base64": [
  "MIIDaTCCAlGgAwIBAgIEbN93DjANBgkqhkiG9w0BAQsFADBlMQswCQYDVQQGEwJHQjEOMAwGA1UECBMFR3dlbnQxEDAOBgNVBAcTB05ld3BvcnQxDzANBgNVBAoTBkJBWVRPTjEMMAoGA1UECxMDRU5HMRUwEwYDVQQDEwxKYXNvbiBCYXl0b24wHhcNMjIxMTExMTcyOTMzWhcNNDcxMTA1MTcyOTMzWjBlMQswCQYDVQQGEwJHQjEOMAwGA1UECBMFR3dlbnQxEDAOBgNVBAcTB05ld3BvcnQxDzANBgNVBAoTBkJBWVRPTjEMMAoGA1UECxMDRU5HMRUwEwYDVQQDEwxKYXNvbiBCYXl0b24wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCRoVCVksJqVeD27W/kziuazVcJcVXkb1o1j/yFVjkF6oZBiPLxqmnU9o38QAuU6O58LcRvQckJ9wdqYepCKrWG3XMjAek1yZ9sVvdCzQCgANjukM9kht7zMQMW7IMHWXskJQ0v98zPLeknuqn8aWjAjaq3BGMYgoe/K6a1+BSqOmuU7OlPn6+QUS5yrnamHKkscdKc5UDYcw7/dsnCmvT6Rtom9Ulk5YP3NBqQh4+/c4YLDenChiCefmMpq0eQokCrMKc8PRaygPKn777EKLj/99zamdcXjr8jm+4nNLh5afBaqzJiLTA3a9ezYxJY8lV+hQSatvkoDcFlRql0fYqFAgMBAAGjITAfMB0GA1UdDgQWBBQyqLncr5PiypN9OWobcsQqM2cPRjANBgkqhkiG9w0BAQsFAAOCAQEAT9AMZbcn6buAd1jAT+YBl93ERq9X3+NFp7Tf02pJ2XSPEq8wsJHzAO6m1OXGUrv6/+r4krCIgU+83met+H279cadkBDR+JAEJvh3YAFKpaZ/yCRIXTCWquOhM7z6yS/hWZCquhuxs9iJGv6w7AzVaw5YwyjSjMMV1eI5pF6N+XMK0QSACerooc7STI7Zb1wA5mGMj2fEzvaKdFpvnJMQMJVwWGf/DunC/cryfVN9+XNVShrJXklqJzdy/i0iNlte0sJB4AmLKXGHgV2iwmcaHK0XgMUGWhk7CY8Bml3kS9Wygg7a/vSKlIt6kzXDPKxRmHfrXci8WR3mNrut0Xbilg=="
 ], 
 "file_size": 385820, 
 "externally_hosted_url": "https://cdn.bayton.org/download/org.bayton.external.apk", 
 "version_name": "1.0.1.9' platformBuildVersionName='13' platformBuildVersionCode='33' compileSdkVersion='33' compileSdkVersionCodename='13", 
 "minimum_sdk": "19"
}
```

_There's nothing above that can't be extracted from the APK by anyone who pulls it from a device, so I have no problem _not_ obfuscating any of this data._

## Publishing and Managing the App

With the shiny JSON file in hand, publishing can now take place. 

## Publishing the app

<div class="callout">

Things to keep in mind: 
- You cannot upload an APK through the managed Google Play iFrame, it must be done through the [Play Console](https://play.google.com/console).
- Google state you must use an account holding an **admin role** with the desired organisation/enterprise ID. Either ensure your developer account is added to the bind as an administrator, or log in to Google Play with the same account used to create the bind. 

In my testing, the latter requirement wasn't accurate. I have deployed an externally hosted app to several organisations wherein my developer account **does not** have admin permissions on the bind ([play.google.com/work/adminsettings](https://play.google.com/work/adminsettings)) and the application was easily found within the iFrame of those EMM environments. 

To further clarify the requirements, you'll need a full developer account. It costs $25 as a one-time fee. Do not attempt to use the developer account associated with the organisation itself, identified in the list of developer accounts associated with any logged in account with admin rights to the organisation/enterprise ID, as you will no have permission to upload applications within this account.

![don't use this](https://cdn.bayton.org/uploads/2024/external-apk-hosting/Screenshot2024-04-18at23.11.46.png)

</div>

1. Access the [Google Play Console](https://play.google.com/console).
2. Set up a new application, specifying language and title.

![](https://cdn.bayton.org/uploads/2024/external-apk-hosting/2024-04-13_21.19.49.gif)

3. Turn on Managed Google Play, and add the organisation(s) you're targeting (you can add orgs later also), then create the app

![](https://cdn.bayton.org/uploads/2024/external-apk-hosting/2024-04-13_21.22.11.gif)

4. Click upload external APKs, then create a production release, and opt out of Google Play signing

![](https://cdn.bayton.org/uploads/2024/external-apk-hosting/2024-04-13_21.31.03.gif)

5. Upload the JSON metadata file (the file picker is not shown in the GIF), then provide a release name and click **Next**.

![](https://cdn.bayton.org/uploads/2024/external-apk-hosting/2024-04-13_21.31.36.gif)

6. You may see warnings, these can be temporarily ignored, and **Save** can be clicked, sending changes for review.

![](https://cdn.bayton.org/uploads/2024/external-apk-hosting/2024-04-13_21.32.50.gif)

7. Literally _seconds_ later, the release is live

![](https://cdn.bayton.org/uploads/2024/external-apk-hosting/2024-04-13_21.35.08.gif)

8. **Optional:** Pop into **App content** and review the required declarations. Google doesn't explicitly mandate these are done in their private app publishing guide, but I opted to at least cover off the advertising declaration as it was raised as a warning earlier. 

![](https://cdn.bayton.org/uploads/2024/external-apk-hosting/2024-04-13_21.34.11.gif)

Check the app is indeed live for the organisation/enterprise ID you shared it with. I'm using the AMAPI API explorer as my enterprise is not associated with an EMM directly, but you should find the app available in managed Google Play for assignment.

![](https://cdn.bayton.org/uploads/2024/external-apk-hosting/2024-04-13_21.37.51.gif)

And we're done. Congrats! 🎉

![](https://cdn.bayton.org/uploads/2024/external-apk-hosting/Screenshot_2024-04-14-00-27-28-938_com.android.vending-EDIT.jpg)

### Updating the app

When making changes to the external APK file, I popped into the Google Play console and created a new release with the updated JSON metadata file. This updated things like version number/code and any target API requirements within the Play Console immediately, and updated the SHA values for the modified APK.

## Authenticating downloads

Google recommends validating the token they send with the download request to confirm the request is legitimate. If you intend to limit who can download the APK from your servers, [this](https://github.com/google/play-work/blob/master/externally-hosted-apks/README.md#authenticating-the-download-on-the-enterprise-server) is a good and reasonably straight-forward option for doing so. 

It is not however something I'll be covering off here. See the docs above for information on this final, optional configuration.

## Conclusion

The most time-consuming aspect of this is system setup. Once that's out of the way generating the relevant file and uploading to Play takes just minutes, and the application becomes available to devices shortly after. 

If you're interested in learning more, feel free to [get in touch](/support). Thanks for reading!

