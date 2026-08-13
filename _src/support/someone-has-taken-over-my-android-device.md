---
title: "Has someone taken over my Android device? What to do"
date: '2026-08-13'
status: publish
author: 'Jason Bayton'
excerpt: 'A direct checklist for recovering data, checking Android management, securing accounts and deciding when a factory reset is appropriate.'
type: page
layout: base.njk
sources:
  - https://support.google.com/accounts/answer/6294825
  - https://support.google.com/families/answer/9055704
  - https://support.google.com/android/answer/6160491
  - https://support.google.com/android/answer/9075927
  - https://support.google.com/android/answer/13530434
  - https://support.google.com/android/answer/6088915
  - https://support.google.com/android/answer/15341885
  - https://support.google.com/android/answer/2865483
  - https://support.google.com/android/answer/14324187
  - https://support.google.com/accounts/answer/6208650
  - https://support.google.com/googleplay/answer/2812853
  - https://support.google.com/photos/answer/6306652
  - https://support.google.com/pixelphone/answer/2844832
  - https://support.google.com/pixelphone/answer/2852139
  - https://support.google.com/pixelphone/answer/4596836
  - https://support.google.com/pixelphone/answer/2819583
  - https://support.google.com/work/android/answer/6191949
  - https://support.google.com/work/android/answer/7502354
  - https://sysapps.bayton.org/
  - https://refugetechsafety.org/guide-secure-your-phone-basics/
---

<div class="callout callout-orange">
<div class="callout-heading">This is the complete advice I can offer remotely</div>

I cannot remotely inspect a personal phone, identify who may be accessing it, remove an unknown administrator, recover deleted data, or provide individual forensic support. Follow the steps below. Do not send me screenshots, logs, IMEIs, telephone numbers, passwords, or account recovery codes.

</div>

<div class="callout callout-blue">
<div class="callout-heading">Start here</div>

1. Use a different trusted device to secure your main email account first.
2. On the phone, search Settings for **Device admin apps** and **Accessibility** and remove unfamiliar access.
3. Do **not** factory-reset until important data and evidence are safely copied.

</div>

The presence of **Android Enterprise**, **Android Device Policy**, **Google Workspace**, **Knox**, a work profile, certificates, system applications, developer terminology, “viewer”, “beta”, “heartbeat”, `system/priv-app`, or a large number of installed apps does **not** prove someone has taken over a device.

A telephone number, IP address, IMEI or serial number alone does not give someone remote control of an Android device.

If you remain concerned unauthorised access has happened or is happening, the following are some suggested steps to take. Nothing here replaces any need for contacting the appropriate authorities.

## 1. Protect your safety and irreplaceable data first

If a partner, ex-partner or someone with physical access may be monitoring you, use a different trusted device to seek help. Removing access or changing settings can alert an abuser. In the UK, [Refuge's Tech Safety service](https://refugetechsafety.org/secure-your-tech/) provides specialist guidance; call **999** if anyone is in immediate danger.

Before resetting or deleting anything:

1. Photograph or record evidence using a safe device.
2. Save copies of important messages, account alerts and transaction records somewhere the other person cannot access.
3. Recover missing photos before doing anything destructive:
   - Sign in to [Google Photos](https://photos.google.com/) from a trusted device and confirm the correct Google Account is selected.
   - Open **Trash** (Bin) and restore anything present. Backed-up items remain there for 60 days; items that were not backed up remain for 30 days.
   - Check **Archive**, **Recently added**, **Locked Folder**, the phone's Gallery bin, other Google Accounts, and any removable SD card.
   - Download a separate copy of recovered photos. Google Takeout cannot recover permanently deleted items.

If the phone is lost, stolen or no longer under your physical control, use Google's [Find Hub](https://support.google.com/android/answer/6160491) from a trusted device to locate it, mark it as lost or erase it. Erasing is permanent and prevents further location through Find Hub, so preserve what you need first where possible.

Do **not** factory-reset the phone until the data and evidence you need are safely copied.

## 2. Secure the Google Account from a trusted device

Most apparent “phone takeovers” are account-access related rather than Android Enterprise management.

1. Open Google's [compromised-account recovery guide](https://support.google.com/accounts/answer/6294825) and complete the **Security Checkup**.
2. Review **Recent security events** and **Your devices**. Sign out devices you do not recognise.
3. Check that the recovery phone number and recovery email address are yours.
4. Change the Google Account password. Change it anywhere else the old password was reused.
5. Review Gmail forwarding rules, filters and delegated access.
6. Remove unfamiliar passkeys, security keys, app passwords and third-party account access.
7. Enable 2-Step Verification. Prefer a passkey, authenticator or security key over SMS where possible.

Repeat this process for email, social media, cloud storage, banking, mobile-carrier and manufacturer accounts such as a Samsung account. In messaging and social apps, review **linked devices**, **logged-in sessions** or similarly named menus and remove anything unfamiliar. Work from the email account outward: control of email is commonly used to reset everything else.

## 3. Check what is actually controlling the phone

Open **Settings** and use its search box for each item below. Android manufacturers use different menu layouts, so searching is more reliable than following one fixed path.

### Work profile

A work profile is identified by a **briefcase badge** on work apps and normally a **Work** tab in the app drawer and under **Settings → Passwords and accounts**.

On a personally owned phone, the organisation manages the work profile, not personal photos, personal messages or personal app data. Remove it with:

**Settings → Passwords and accounts → Work → Remove work profile**

Confirm the deletion, then uninstall the associated policy app if it remains. This deletes work-profile data only. A factory reset is not required. See [Introduction to work profile](/android/what-is-android-work-profile/) for the privacy boundaries.

### Family Link and parental controls

Google Family Link supervision can let a parent see a phone's location, approve or block apps, set time limits and remotely lock the device. Those controls can feel like a takeover, but Family Link cannot remotely read the screen, emails or messages, listen to calls, or choose a new screen-lock password.

Search Settings for **Parental controls** and check **Settings → Digital Wellbeing and parental controls** or **Settings → Google → All services → Kids and family → Parental controls**. Also look for a notice that the Google Account is supervised.

Use Google's [Family Link supervision guide](https://support.google.com/families/answer/9055704) to stop supervision. A person under 18 needs a parent's approval, and both people are notified when supervision stops. Removing a supervised account removes its supervision settings from that phone; adding the same account again restores them. A factory reset does not turn a supervised account into an unsupervised account.

### Accounts, other users and Private Space

- Search Settings for **Passwords and accounts**, **Manage accounts** or **Accounts**. Remove an account you do not recognise after recording it as evidence.
- Search for **Multiple users**. Remove an unfamiliar secondary user or guest from the device-owner account. Each user has a separate space with its own accounts, apps and data.
- On Android 15 and later, open **Settings → Security and privacy → Private Space**. Apps in a locked Private Space can be hidden from the app drawer, recent apps, permission settings and the Privacy dashboard. If someone else created it, record what you can and use **Settings → System → Reset options → Delete Private Space**; this permanently deletes that space and its local data. The option to delete Private Space can appear even when no space has been configured, so the menu entry alone is not evidence.

### Device administrator, Accessibility and special access

Search Settings for and review:

- **Device admin apps:** deactivate any administrator you do not recognise, then uninstall its app.
- **Accessibility:** turn off unfamiliar installed services. Accessibility access can read screen content and operate the interface.
- **VPN:** remove an unknown VPN or always-on VPN configuration.
- **Private DNS:** an unfamiliar custom provider can change how the phone resolves internet addresses. Set it to **Automatic** unless you deliberately use a named provider. Private DNS alone does not give someone control of the phone.
- **User-installed certificates:** search for **Encryption and credentials**, **User credentials** or **CA certificates**. Remove a certificate you did not install and cannot attribute to a trusted work, school, VPN or Wi-Fi provider. Do not remove system certificates; removing a legitimate user certificate can stop its network or service working.
- **Default apps:** review the browser, phone, SMS and Home apps and replace an unfamiliar default with an app you trust.
- **On-screen keyboard** and **Autofill service:** disable an unfamiliar keyboard or autofill provider. These services handle text or credentials that you enter.
- **Install unknown apps:** deny permission to browsers, messaging apps and file managers unless it is deliberately required.
- **Notification access**, **Usage access** and **Display over other apps:** revoke unfamiliar access.
- **Privacy dashboard:** review which apps recently used the camera, microphone and location.
- **Unknown tracker alerts:** open **Settings → Safety and emergency → Unknown tracker alerts → Scan now** to check for a compatible Bluetooth tracker travelling with you.

An app's long list of declared permissions, whether shown in a manifest, system-app database or diagnostic report, does **not** mean every permission is currently granted or being used. The current Settings screens, Privacy dashboard and observable account or device activity are what matter.

Also open **Google Maps → profile picture → Location sharing** and stop any sharing you do not want.

Open **Play Store → profile picture → Play Protect → Scan**. Uninstall apps Play Protect identifies as harmful. Also install all Android, Google Play system and app updates.

Open **Settings → Apps → See all apps** and review the complete list, not only the app drawer or Home screen. Some installed apps have no launcher icon. Uninstall an unfamiliar app only after recording its name and checking that it is not a system, carrier, accessibility, work, school or safety app you intentionally use.

For a strange-looking system app or package name, search the [BAYTON Android system app database](https://sysapps.bayton.org/). Use the exact package name from the app-information screen where available, then check the observed manufacturer, device and Android versions. The database shows which packages have been seen preloaded across real device profiles and what they are for. A match can explain a normal system component; a missing result does not prove an app is malicious because coverage is not universal.

### Harden access to the phone

- Change the screen lock if anyone else may know it. Use a strong, unique PIN or password rather than a simple pattern.
- Review the enrolled fingerprints and faces. Remove anything you do not recognise, then re-enrol your own biometrics if necessary.
- Search Settings for **Extend Unlock** or **Smart Lock**. Turn off on-body detection and remove trusted places and devices; these features can otherwise keep a phone unlocked for hours.
- Turn off **Developer options**, **USB debugging** and **Wireless debugging** unless you deliberately use them. Do not approve a computer's debugging prompt unless it is yours and you initiated the connection.
- Keep the phone physically controlled. A secure configuration cannot compensate for repeatedly giving an untrusted person the unlocked device and its passcode.

### Test downloaded apps in Safe Mode

Use the phone manufacturer's official instructions to restart in **Safe Mode**. On many phones, open the power menu, touch and hold **Power off**, then confirm **Safe Mode**. Downloaded apps are temporarily disabled until the next normal restart.

If unexplained on-screen behaviour stops in Safe Mode, a downloaded app is likely responsible. Restart normally, then uninstall recently added or unfamiliar apps one at a time. Safe Mode does not sign other people out of online accounts or stop account forwarding and location-sharing settings, so it is a diagnostic step rather than proof that the phone is secure.

## 4. Identify full-device enterprise enrolment

A personal work profile and a fully managed device are different.

Reset the device only after completing sections 1 to 3. During setup, watch what happens **before adding any Google Account**:

- If setup says the device belongs to or is managed by an organisation, the device is registered for enterprise enrolment. Contact the seller or the organisation named on screen and require them to remove it. If they cannot, return the device. Buying another used phone from the same source is not a solution.
- If management appears only after adding a particular work or custom-domain account, that account's organisation is requiring it. Remove the account or contact its administrator.
- If neither occurs, Android Enterprise is not persistently enrolling the phone.

Personally owned devices cannot be silently added to Android zero-touch by an ordinary individual who merely knows the IMEI or serial number. Devices are registered through authorised reseller and enterprise systems. See [Are employee-owned devices eligible for zero-touch?](/android/android-enterprise-faq/employee-owned-zt/) for how this works.

## 5. Check the mobile number separately

Loss of service, missing verification texts, unexpected SIM-change messages or calls being redirected are carrier-account problems, not proof that Android itself is managed.

Contact the mobile carrier using a number from its official website. Ask it to:

1. Check for an unauthorised SIM or eSIM change, number port, call forwarding or account user.
2. Replace the SIM/eSIM where required.
3. Add a strong account PIN and a port-out lock.
4. Remove unknown authorised users and change the carrier-account password.

Do not rely on SMS for account recovery until the carrier confirms the number is secure.

## 6. Factory-reset only when it is justified

A reset is appropriate after confirmed account compromise, an unknown high-privilege app that cannot be removed, or persistent unexplained behaviour after the checks above.

1. Confirm important files and evidence are backed up.
2. Confirm you know the Google Account address, password and screen-lock PIN. If the Google password was just changed, wait at least 24 hours before resetting and follow any longer wait shown by the manufacturer or account-recovery process.
3. Use **Settings → System → Reset options → Erase all data (factory reset)**. If Settings is blocked, follow the manufacturer's official power-and-volume-button instructions.
4. Set up the phone **as new**. Do not restore apps or device settings from the old backup.
5. Install updates, enable Play Protect and add only accounts and apps you recognise.

If enterprise setup returns before any account is added, follow section 4. Repeated resets will not remove reseller-based enterprise registration.

If Settings is blocked, or unexplained behaviour continues after a clean setup without enterprise enrolment, contact the manufacturer or an authorised repair provider and ask it to reinstall the device's official signed firmware. This can destroy data and evidence. Do not follow an unknown person's flashing instructions, unlock the bootloader, or run ADB commands copied from a forum unless you understand exactly what they will remove. Replacing the phone is the final option, after the accounts and mobile number have been secured; otherwise the same account problem can simply follow to the replacement.

## What counts as evidence

Treat these as evidence worth acting on:

- An account provider shows an unfamiliar login, device or security-setting change.
- A carrier confirms an unauthorised SIM/eSIM change, number port or forwarding rule.
- An unknown app has device-administrator, Accessibility, VPN or other high-risk access.
- A user-installed CA certificate is present that you did not install and cannot attribute to a trusted work, school, VPN or Wi-Fi provider.
- The first-run setup wizard identifies an organisation before you add an account.
- Messages or files were deleted, money moved, purchases made, or passwords changed without permission.

These are **not evidence on their own**:

- Android Enterprise, Device Policy, Workspace or Knox components.
- Briefcase icons or a work profile that can be removed normally.
- System certificates, system apps, disabled settings, developer terms or debug logs.
- Gboard or other Google apps downloading during setup.
- Battery drain, warmth, adverts, slow performance or a high app count.
- An IMEI, serial number, IP address, unfamiliar technical word, or references to “viewer” or “beta”.

## Get the right help

- **Immediate physical danger:** call 999 in the UK or the local emergency number.
- **Partner or family abuse:** use a safer device and contact [Refuge Tech Safety](https://refugetechsafety.org/secure-your-tech/).
- **Deleted Google photos or account access:** use Google's official [Photos recovery](https://support.google.com/photos/answer/6306652) and [compromised-account](https://support.google.com/accounts/answer/6294825) processes.
- **SIM or telephone-number changes:** contact the mobile carrier's fraud team.
- **Unauthorised payments:** contact the bank immediately, then report cyber crime or fraud through [Report Fraud](https://www.reportfraud.police.uk/reporting-a-fraud/) in England, Wales or Northern Ireland; contact Police Scotland on 101 in Scotland.
- **Evidence for legal action:** stop altering the device and engage law enforcement or a qualified mobile forensic examiner. A phone-repair shop or online commenter cannot reliably attribute an attacker.
- **Bug reports, APKs, IMEIs and diagnostic files:** share them only through an official manufacturer, carrier, law-enforcement or qualified forensic channel that has asked for them. These files and identifiers can expose private information; do not post them publicly or send them to me.

<div class="callout callout-red">

### Do not let a “helper” take control

Do not pay strangers who claim they can identify an attacker from screenshots, an IP address, an IMEI or a list of Android system apps. Do not install remote-support software for them and never share passwords or verification codes.

</div>
