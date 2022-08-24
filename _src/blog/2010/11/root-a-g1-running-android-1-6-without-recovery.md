---
title: 'Root a G1 running Android 1.6 without recovery!'
date: '2010-11-30T02:03:46+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 792
tag:
    - '1.6'
    - android
    - recovery
    - root
    - 'root android'
    - 'root without recovery'
    - superuser
post_format: []
tmac_last_id:
    - '205557670541918208'
geo_enabled:
    - '1'
geo_public:
    - '1'
geo_address:
    - 'Oxford, England, United Kingdom'
geo_latitude:
    - '51.7522792'
geo_longitude:
    - '-1.255883799999992'
post_views_count:
    - '5809'
tags:
    - Guides
    - Mobile
    - Projects
---
This weekend I finally got myself a native Android powered telephone. I say native as I had previously ported a version of Android (2.2) on my old HTC TyTN II (natively Windows Mobile 6.5). Immediately I had two tasks to undertake.. one was to unlock it (ebay, 20min wait and voila), the second was to get it rooted so I could start running everything I needed.

I’d been hunting around the net for hours knowing I would be needing to root the G1, but all I could find was the typical “install the 1.5 recovery image with the security hole” tutorial. Since mine came pre-shipped with 1.6 I wasn’t too interested in doing this. In the end, this is what I did.. it took a couple of hours and a lot of mixing up different sources of information, but if you follow these instructions, it should take no more than 30 mins tops.

**Note1:** I’m running:  
Android: 1.6,  
Kernal: 2.6.29-00479-g3c7df37,  
Build: DRC92.  
This process worked for me, it may not for you depending on what you’re running.. I took the risk and it paid off. You may not be so lucky, and I’m not responsible for any damages incurred!

**Note2:** There is a space issue with this rooting process. I removed the standard Google Maps application in order to free up space. The reason I chose to remove Google Maps is because I can always reinstall it on /data partition rather than /system (which is the partition with the space problem). I will explain how to go about removing and re-installing maps later in the article. If you don’t want to remove the version on /system/ then you may have to either remove another app, or find another rooting method.

**Note3:** You’ll need a memory card. Please find one before attempting the process.

**Note4:** ADB has recently moved to platform-tools (it was in tools!) if you’re happy working in this directory, fine, but I keep ADB in tools, so this is why it’s tools in this article. If you’d prefer, move all files from platform-tools to tools for consistency with this article! (skip over the 2 files that will overwrite!).

**And now, here’s how I did it:**

#### Setting up the root environment

First, directories. Throughout this tutorial I’ll refer to directories and paths for use in ADB. If you set the same directories, you won’t have to worry about getting confused about what I’m talking about where..

- The Android SDK is located in **C:\\android**
- ADB is located in **C:\\android\\tools**
- The items required for rooting are in **C:\\android\\tools\\root**

Secondly, wherever you see <span style="color: #000080;"><span style="color: #333399;">blue</span>,</span> this is a command that needs to be typed into CMD (Start &gt; Run &gt; CMD).

**Now, down to business:**

Download and install the [Android SDK](https://developer.android.com/sdk/win-usb.html). The link there will take you to the Windows USB page, as for rooting this is all you’ll need to install from the SDK installer (included with the SDK package). Follow the instructions on the page to get the Windows USB driver installed, making sure (for this tutorial) you keep the directory tree I’ve listed above.

Now, you can download the files required to root the G1. I have packaged them and uploaded them to my server, so you can download them from here: [Android G1 root files](https://r2_worker.bayton.workers.dev/download/root.rar). They’re majoritively from chaps named “Birdy” and “ChainsDD” from what I read (credit where credit’s due) but a couple of files were from other sources. Download and extract the folder holding the files to C:androidtools. Make sure the tree then shows as **C:\\android\\tools\\root**.

When you’ve done that, on the G1 go to **Settings &gt; Applications &gt; Development &gt; Enable USB Debugging**. When you connect your G1 to the computer, it’ll let you know that USB Debugging is active.

Now that you have your G1 connected to your computer, the USB drivers installed and the SDK downloaded and placed in **C:\\android** we can begin with the rooting of the phone!

#### Starting the rooting process

First we’ll navigate to the ADB directory from which you can run all the ADB commands necessary to root the G1. Open the command prompt (Start &gt; Run &gt; CMD) and navigate to the ADB executable by typing:

*<span style="color: #003366;">cd C:\\android\\tools</span>*

Now, we’ll make sure the phone is recognised by the computer by typing:

*<span style="color: #003366;">adb devices</span>*

If a device is shown, be it whether you recognise it or not (I was shown a random code/name that I didn’t quite understand) then we can continue. If you don’t see any device show up you may need to check that USB Debugging is enabled, and the USB drivers are properly installed.

Next, we’ll push files from the /root directory over to the G1. With every “push” command you run, you should see evidence the file was transferred. Run these commands one by one (one per line):

*<span style="color: #003366;">adb push C:\\android\\tools\\root\\Superuser.apk /sdcard/Superuser.apk  
adb push C:\\android\\tools\\root\\su /sdcard/su  
adb push C:\\android\\tools\\root\\exploid /sqlite\_stmt\_journals/exploid</span>*

Now all the files required at the moment have been transferred to the SD Card of the G1 and we’re ready to start using them! We can now get shell access to the G1 itself by running this command:

*<span style="color: #003366;">adb shell</span>*

We’ll initiate the rooting process by working with the exploid file. The exploid file will create temporary root access, allowing you to access and change directories deep inside the filesystem. We’ll need to change to the directory exploid is stored in and change the permissions on it. Run these two commands:

*<span style="color: #003366;">cd sqlite\_stmt\_journals  
chmod 755 exploid</span>*

Once those commands have been executed, keep your G1 close as before you run the next command you’ll need to make sure you’re on a screen that allows you to toggle the wifi on and off. Either a **widget**, or **Settings &gt; Wireless controls.** No matter what you use, be ready to switch it on and off (or off and on) again **as soon as you execute this next command!**

*<span style="color: #003366;">./exploid</span>*

**Quick!** Toggle the wifi! Have you done that? Good. Now we can move on. That command just created the temporary root access needed to continue with the root process, and as such, you should now be able to run this command:

*<span style="color: #003366;">rootshell</span>*

The password is “secretlol”. Type it in when you’re requested to do so. Once you have done this, you should now see that root access has been enabled. You can confirm this by checking the next prompt. Do you see **\#** ? Then you’re running as temporary root. Now before we make some space for the rest of the installation, we need to make the system writable. Do this by executing these commands:

*<span style="color: #003366;">mount -o rw,remount -t yaffs2 /dev/block/mtdblock3 /system  
</span>*

With the system writable, the next step is to free up some space. I chose to remove Google Maps as I’m reinstalling it to /data/app (link in **Note2** above) and with both the .APK and .ODEX each being well over 1MB, that’ll leave plenty of room to drag in the files we need. It’s best to have around 2MB free after removing an app, so if you don’t want to remove Google Maps, you’ll have to find another app of 1MB or similar to remove.. just be very careful as you don’t want to remove system files!

First back up Maps.apk, if you’re not bothered, you can always find it on the market at a later date!

<span style="color: #003366;">*cd /system/app  
/system/app/Maps.apk cp /system/app/Maps.apk /sdcard/Maps.apk* </span>

Now here’s how to remove Google Maps:

*<span style="color: #003366;">rm /system/app/Maps.apk  
rm /system/app/Maps.odex</span>*

Once again, you should get a confirmation of deletion (even if only repeating what you typed). If you get a permission denied error, make sure you’ve definitely mounted system as rewritable. After this is done, you can then move onto getting in the largest file – busybox. Open a new CMD window (Start &gt; Run &gt; CMD). **Don’t close your current window**! In your new window navigate to the ADB root as was shown above earlier and copy over busybox. The commands are written below:

*<span style="color: #003366;">cd C:\\android\\tools  
</span>**<span style="color: #003366;">adb push C:\\android\\tools\\root\\busybox /data/local/busybox</span>*

Back to your 1st CMD window (where you’re a root user) we can now get busybox in the correct place and ready for the last part of the installation. Execute the following commands to put busybox in the right place and remove it from the temporary location:

*<span style="color: #003366;">cd /data/local  
/data/local/busybox cp /data/local/busybox /system/bin/busybox  
chmod 4755 /system/bin/busybox  
rm /data/local/busybox</span>*

<span style="color: #ff0000;">**Are you having problems with access denied error messages? Skip to the bottom of this tutorial, and don’t remove busybox from /data/local!**</span>

You should now see that when you type the following command:

*<span style="color: #003366;">busybox</span>*

You should get a wall of text related to busybox.. busybox is installed! Finally then, get the last of the files required over to the /system/.. directory and get the root going. Execute the following commands:

*<span style="color: #003366;">busybox cp /sdcard/Superuser.apk /system/app/Superuser.apk  
busybox cp /sdcard/su /system/bin/su  
chmod 4755 /system/bin/su </span>*

Optionally you can remove the temporary root that was created, which may actually be a good idea since the password for this root file is all over the internet! To do this execute this command:

*<span style="color: #003366;">rm /system/bin/rootshell</span>*

Finally, simply run (yes, twice):

*<span style="color: #003366;">exit  
exit</span>*

Alright then! The test.. we’re going to see if we can get into root natively and without the help of the rootshell file. Keep your phone close by with the home screen on display. If this next command execution works, you’ll get a pop-up on your G1 to request for access. Grant it!

*<span style="color: #003366;">adb shell  
su</span>*

Now grant root access from the Superuser app and watch as the CMD prompt changes to..

<span style="color: #003366;">\#</span>

Congratulations!

To install Google Maps, either reinstall it from SD card or open your Android market and download it from there. Install it like any other app and it’ll install to your /data/ partition instead of the /system/ partition. Brilliant.

If you get stuck, let me know. I would like to be able to expand on this to confirm it works on other G1’s running different Firmware or different builds. If you see errors in this article, please contact me either using [this site](/contact/) or via one of the social networks I’m active on.

Cheers,  
Jason

 **\*\*\* Access denied for busybox!\*\*\***

It looks as though this is happening on occasion, but if no matter what you do (please check the comments below for possible solutions) you’re still getting a permission denied error when trying to move busybox to /system/bin you can try an alternative method as follows:

If you’re still root, great! Continue. If you’re not, please follow the instructions above to obtain root and make the system writable.

Now you should have already removed Maps.apk and Maps.odex to free up the space you require on /system. If you haven’t, please do so using the instructions above.

A big thank you to **Jeroen (Zekko)** in the comments who has successfully helped me troubleshoot and create an alternative method!

First, lets install Superuser without the use of busybox. There’s the proper way:

*<span style="color: #666699;">cd /sdcard</span>*  
*<span style="color: #666699;"> /sdcard/Superuser.apk cp /sdcard/Superuser.apk /system/app/Superuser.apk</span>*

Which will install it to your /system partition and as such make sure it’s never removed. If you’re still getting access denied errors (even though you’ve already made sure /system is writable, yes?) Just find a file explorer such as Astro or Android Mate and install the Superuser.apk as you would any other app you have saved on your SDCard. It will install to /data, but that’s better than nothing – you can always change it at a later date.

**<span style="color: #ff0000;">Stop! Now go back to the tutorial above and see if you can now install busybox as written. Yes? Awesome, ignore the rest of this! No? Continue.. </span>**

Now, get yourself a copy of Rootexplorer. I have two versions here, this is because depending on my Rom, one would work better than the other.

\[dl url=”https://r2_worker.bayton.workers.dev/download/rootexplorer.apk” title=”Root explorer v.1″ desc=””\] \[dl url=”https://r2_worker.bayton.workers.dev/download/re2.apk” title=”Root explorer v.2″ desc=””\]

Save the root explorer APK to C:\\android\\tools, open a new CMD window, then type this command to install it from your computer rather than copying it over.

*<span style="color: #003366;">cd C:\\android\\tools  
adb install rootexplorer.apk </span> ||* For version 1  
*<span style="color: #003366;">adb install re2.apk</span> ||* For version 2

You should get a success message. If you don’t, try copying the file over to the SD card, and use a file manager to install it.

Now launch RootExplorer and navigate to /data/. You may notice a button at the top of RootExplorer to make /data/ rewritable or read only. Pay attention to what it is at the moment (R/O or R/W). It needs to be R/W!

Navigate to /data/local/ and long-tap on busybox to bring up the menu, select copy.

Now navigate to /system/ and again, make sure it’s R/W! If not, tap the button to make it so.

Navigate into system/bin/, press your menu button and tap paste.

It should *now* finally copy over hopefully with no errors. From here you can carry on where you stopped in the tutorial above and finish rooting your device.

Remember, you’ve already installed Superuser.apk, so ignore any references to it when you follow the rest of the tutorial.

Let me know if this works for you.  
Jason