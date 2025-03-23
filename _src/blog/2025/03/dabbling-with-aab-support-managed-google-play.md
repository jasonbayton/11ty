---
 title: "AAB support for private apps in the managed Google Play iFrame is coming, take a look here"
 date: '2025-03-22'
 status: publish
 author: 'Jason Bayton'
 excerpt: "Recent updates to Google docs suggest AAB support for application uploads are on the horizon, but it's not quite there for me.. yet."
 type: post
 tags:
     - Enterprise
---

The Android App Bundle (AAB) is a modern application packaging format introduced by Google to streamline and optimise Android app distribution. Unlike the traditional APK, an AAB contains all the necessary compiled code, resources, and assets for an app only for the purpose of permitting dynamic packaging; it cannot be directly installed through Android's package manager on-device (3rd party options exist though!). Instead, it is uploaded to Google Play, which dynamically processes & bundles the respective code into highly-optimised APKs specific to the device(s) downloading the app.

The AAB format has been available to Android developers since 2018, and mandatory for new app uploads from the Google Play console since 2021. The Google Play iFrame, used by enterprises for private app distribution, has however historically mandated APK uploads. Based on a [recently-updated help doc](https://support.google.com/work/android/answer/9146439), support for AAB in enterprise scenarios appears to be now possible, although it doesn't seem fully rolled out yet.

All the same, I spent some time figuring out what's possible so you don't have to!

## How AAB and APKs differ

First thing's first, is this a pitch to organisations to immediately push all private applications over to AAB?

No. There are valid use cases for both, which presumably (in addition to understanding the effort it may take organisations to convert over) is why Google will continue supporting APKs in the iFrame. That said, here's a brief overview of each.

### APKs

An APK is a single package file containing all the resources, assets, and compiled code for all supported device configurations. While this offers the greatest compatibility across a device estate, it means APK files are often larger than necessary as they include resources irrelevant to the downloading device.

APKs offer simplicity and convenience for developers who want a quick, straightforward way to package and share their applications. They ensure broad compatibility across all Android devices without additional processing or conversion. Additionally, APKs support offline installation, making them ideal for environments with limited or no connectivity. Their self-contained nature enables immediate deployment and rapid testing, which accelerates development and iteration cycles. Furthermore, APKs provide flexibility by allowing distribution through various channels beyond Google Play, including alternative app stores or direct downloads. 

Finally, because APKs don't rely on Google Play explicitly, they're suitable for devices lacking Google Play access, or regions where it isn't available. That covers everything from deployment to devices in restricted countries such as China, to closed-network environments without direct access to Google Play. AOSP is a consideration also, but there's a lot more to managing AOSP that I won't dive into here.

### Android App Bundles (AAB)

Like an APK, an AAB is a publishing format containing all the necessary components in a single file, the difference is in the processes that occur after uploading to Google Play, as I opened with above.

As well as significantly reducing app sizes through dynamically generated, optimised APKs tailored to each user's device, AABs also support dynamic delivery of features and resources, enabling efficient feature rollouts and resource management.

Release management is also simplified, as developers maintain only a single upload file, eliminating the need to manually handle multiple APK variants for different architectures or feature sets.

Additionally, AAB leverages App Signing by Google Play, centralising key management, potentially increasing security, and simplifying key recovery — particularly beneficial in enterprise contexts.

### Leveraging AABs with Android Enterprise

In enterprise scenarios, Android App Bundles enable organisations to deliver tailored application experiences by dynamically serving device-specific features, languages, and resources as needed. This customisation simplifies version management, reduces deployment overhead, and leads to streamlined app lifecycle management, significantly improving end-user experiences. For organisations operating under tight data budgets, the optimised app sizes alone can justify migrating to the AAB format due to significantly reduced download sizes and improved efficiency.

## Enough talk, AABs in action

For the context of this article, I opted to take an existing APK and convert it to AAB. There are two reasons for this:

1. It seemed like the more complex approach, so makes for more interesting reading.
2. Google hasn't yet turned on AAB uploads for _new_ private apps from the iFrame for my enterprises. So I couldn't show that if I wanted to.

Here's where we start; I have a private application uploaded as an APK:

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.34.28.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.34.28.png)

Clicking into the application, I can select **Advanced editing options** to head to the Google Play Console:

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.36.00.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.36.00.png)

I can then head into the application, click **Test and release** > **Production** and create a new release. All so far, so normal. Other tracks are available if **Production** isn't desired.

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.36.59.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.36.59.png)

On any other day, if I were to manage an app update from within the Play Console - which is a perfectly valid approach for organisations with advanced knowledge of developing and distributing applications - I would upload an APK via the upload link.

We're not here for APKs though. To go further, I need to enrol into **Play app signing**.

### Enrol into Play app signing

Play app signing is a requirement for AABs, as Google needs to be able to sign generated APKs on behalf of the organisation when distributing them to devices. I'm clicking **Use Play app signing** to continue:

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.37.16.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.37.16.png)

For organisations/developers using a **Java KeyStore** to facilitate application signing, either via Android Studio or otherwise, this next step offers a guide for extracting the private key from it to allow Google to manage it. I'm using Android Studio and want to upload the key I used to originally sign the APKs, so that's what I'm configuring here:

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.40.40.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.40.40.png)

<div class="callout callout-blue">
<div class="callout-heading">
Give Google our keys!?
</div>

This is down to the organisation and/or the personal views of the developer. I can appreciate this isn't a desirable choice for some, and that's OK. Google offers alternatives for setup, including dual-releases, but you can stop here and return to APK management if desired.

If you're on the fence, pros and cons:

**Pros:**

- Simplified Key Management:
  : Google securely stores and manages your app signing keys, reducing the complexity and risk of losing keys.

- They're stored securely:
  : Google uses strong cryptographic security standards to store keys securely, minimising potential breaches or key leaks.

- Easy key recovery:
  : In case of compromised or lost upload keys, Google provides a straightforward and secure method for recovery without losing your app’s listing and user base.

- Optimised distribution:
  : Google Play can leverage advanced features like dynamic feature modules and optimised delivery because they control the final signing process.

**Cons:**

- Loss of direct control:
  : You relinquish direct control over your signing keys to Google, leaving your app's distribution and security dependent on Google's practices and infrastructure (via Play).

- Dependence on Google:
  : You'll require careful planning if you choose to distribute your app via alternative channels (non-Play) to ensure friction points are minimised.

- Security concerns:
  : Organisations with strict security or compliance policies might find Google's key management approach incompatible with their internal security practices.

Ultimately, whether Google Play App Signing is suitable depends on your organisation’s requirements for security, flexibility, compliance, and control.

That isn't a finite list. Still here? Let's continue!

</div>

The script in the above image is:

```bash
java -jar pepk.jar --keystore=foo.keystore --alias=foo --output=encrypted_private_key_path --rsa-aes-encryption --encryption-key-path=/path/to/encryption_public_key.pem
```

**Note**: The KeyStore and alias - if you're unfamiliar - should match what's shown in Android Studio when prompted during the building of a signed application. If you know what you're doing, do your thing.

Once the private key .PEM file is output, it can be uploaded to Google via **Upload private key**:

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.49.48.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.49.48.png)

After which I'm then prompted to agree to Play app signing terms. I glanced at it for a good 15 seconds.

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.49.59.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.49.59.png)

And we're enrolled:

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.50.48.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.50.48.png)

### Upload the AAB

There are two ways to now get the AAB up, via console and via iFrame. To ensure it works as I'd expect it to, I opted first to test it in the console where I am confident AAB uploads would be supported. Not least because there's a draft release still pending.

I headed back to **Test and release** > **Production**, and clicked the **Releases** tab, allowing me to **Edit release**:

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.52.46.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.52.46.png)

As now pictured, **Releases signed by Google Play** is showing, so I'm good to select and upload an AAB in the upload area below:

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.54.46.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.54.46.png)

If you scroll up, you'll note the version in the managed Play iFrame was on version 1.0, and the console here is now showing version 2 (1.1). I carried on through the process, paying attention to any damning errors, warnings, and messages (the Play Console is missing an Oxford comma, there). I chose to ignore two warnings about obfuscation and a government declaration, because I haven't needed to worry about them in the iFrame. I'll update here if that becomes a problem later:

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.54.59.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.54.59.png)

Send the change(s) for review..

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.55.16.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.55.16.png)

.. and voilà!

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.57.01.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.57.01.png)

8 nail-biting minutes later, the iFrame also updated to the latest build.

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.59.22.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_04.59.22.png)

And finally, it pushed to my test device nice and quickly, no fuss at all. Note the size difference between versions below. All I did was bump the version in `build.gradle` and build an AAB rather than an APK for the newer version!

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/pixels_abbdemo.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/pixels_abbdemo.png)

<small class="orange"><i>Note: I'm aware this is not the same device, their version sizes matched on 1.0, though.</i></small>

### What needs work?

While in the iFrame, I figured testing it here also would be reasonable. Here's one of a few snags with the process currently, which I'll state after the image:

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_05.00.52.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_05.00.52.png)

Did you see it? _It still references **APK file**_, but it does in fact allow the upload of an AAB. Luckily the file extension is conveniently left in place (thanks, Google!) so you can see it is, indeed, an AAB. Based on Google's help doc, what we can expect to see, at some point, is a more generic label replacing **APK file**:

![](https://storage.googleapis.com/support-kms-prod/c2fFO20XkB4oolOHgI03JNS6jf1RDfeDFM7g)

One of the other snags that currently exists is the inability to upload an AAB as a new application from the iFrame, even having followed Google's guidance in enabling Play app signing. 

The upload _allows_ the selection of an AAB, but the submit button remains greyed out. [I went into browser tools and manually enabled the button](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_05.14.09.png), only to be met with another error:

[![](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_05.14.37.png)](https://cdn.bayton.org/uploads/2025/dabbling-with-aab/Screenshot_2025-03-22_05.14.37.png)

It's worth pointing out when Google _does_ allow direct AAB uploads from the iFrame, they'll generate the key:

> Note: Private apps that are created for the first time by uploading an AAB to the iframe will use a Google-generated app signing key. Use one of the options below to use your own signing key:
>
> - Use the Play Console to create the private app with an AAB
> - Use the iframe to create the private app with an APK then switch to AAB.

Tying back to the callout above, if you have desires to use your own key with all uploaded apps, follow their advice and use the console to upload a new application.

## In summary 

Google's move toward supporting Android App Bundles for private app distribution in the managed Google Play iFrame is well overdue, but great to see. While clearly still in the rollout phase, early exploration shows what's already possible and highlights some of the areas needing further refinement.

For organisations ready to embrace smaller app sizes, streamlined deployments, and more flexible/redundant key management, the transition from APK to AAB is worth considering, at least when it becomes fully available; full support within the iFrame will undoubtedly make this process smoother and more broadly accessible in the near future.

As always, plan your strategy carefully—particularly around key management and app distribution—to align with your organisation's security, compliance, and operational requirements.