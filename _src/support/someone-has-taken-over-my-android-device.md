---
title: "Has someone taken over my Android device? What to do"
date: '2026-08-14'
status: publish
author: 'Jason Bayton'
excerpt: 'A direct checklist for checking Android management, securing accounts, finding where data is shared, protecting communications and deciding when a factory reset is appropriate.'
type: page
layout: base.njk
sources:
  - https://support.google.com/accounts/answer/6294825
  - https://support.google.com/accounts/answer/7519408
  - https://support.google.com/accounts/answer/6286986
  - https://support.google.com/families/answer/9055704
  - https://support.google.com/android/answer/16339980
  - https://support.google.com/android/answer/6160491
  - https://support.google.com/android/answer/9075927
  - https://support.google.com/android/answer/9079661
  - https://support.google.com/android/answer/13530434
  - https://support.google.com/android/answer/6088915
  - https://support.google.com/android/answer/15341885
  - https://support.google.com/android/answer/2865483
  - https://support.google.com/android/answer/2819582
  - https://support.google.com/android/answer/14669513
  - https://support.google.com/android/answer/14324187
  - https://support.google.com/android/answer/9417604
  - https://support.google.com/accounts/answer/6208650
  - https://support.google.com/googleplay/answer/2812853
  - https://support.google.com/chrome/answer/165139
  - https://support.google.com/photos/answer/6306652
  - https://support.google.com/photos/answer/7378858
  - https://support.google.com/pixelphone/answer/2844832
  - https://support.google.com/pixelphone/answer/2852139
  - https://support.google.com/pixelphone/answer/4596836
  - https://support.google.com/pixelphone/answer/2819583
  - https://support.google.com/work/android/answer/6191949
  - https://support.google.com/work/android/answer/7502354
  - https://www.samsung.com/uk/apps/samsung-find/
  - https://www.samsung.com/uk/support/apps-services/use-the-samsung-cloud-to-back-up-and-restore-data-to-your-galaxy-device/
  - https://www.samsung.com/uk/support/mobile-devices/what-is-the-secure-folder-and-how-do-i-use-it/
  - https://www.samsung.com/uk/support/mobile-devices/how-do-i-set-up-dual-messenger/
  - https://www.samsung.com/uk/support/mobile-devices/how-to-enable-or-disable-the-call-forwarding-feature-in-your-samsung-galaxy-smartphone/
  - https://telegram.org/faq
  - https://support.signal.org/hc/en-us/articles/360007320551-Linked-Devices
  - https://www.facebook.com/help/211990645501187
  - https://engineering.fb.com/2021/07/14/security/whatsapp-multi-device/
  - https://support.microsoft.com/en-us/accounts-billing/manage/how-to-sign-out-of-your-microsoft-account-everywhere
  - https://developer.android.com/studio/debug/bug-report
  - https://developer.android.com/reference/android/app/admin/DevicePolicyManager
  - https://source.android.com/docs/core/tests/debug/read-bug-reports
  - https://source.android.com/docs/security/features/verifiedboot/boot-flow
  - https://sysapps.bayton.org/
  - https://refugetechsafety.org/guide-secure-your-phone-basics/
---

<div class="callout callout-orange">
<div class="callout-heading">This is the complete advice I offer</div>

I will not remotely inspect a personal phone, identify who may be accessing it, remove an unknown administrator, recover deleted data, or provide individual forensic support. While I appreciate this may be a stressful and urgent situation for you or a person you represent, I do not make exceptions. Please follow the steps below.

Do not send me screenshots, videos, logs, IMEIs, telephone numbers, passwords, or account recovery codes. Direct your evidence to local authorities.

</div>

<div class="callout callout-red">
<div class="callout-heading">Do not let a “helper” take control</div>

Do not pay strangers who claim they can identify an attacker from screenshots, an IP address, an IMEI or a list of Android system apps. Do not install remote-support software for them and never share passwords or verification codes. Malicious actors can and will take advantage, further complicating your predicament.

</div>

<div class="callout callout-blue">
<div class="callout-heading">Start here</div>

1. Use a different trusted device to secure your main email account first.
2. Do not factory-reset until important data and evidence are safely copied.
3. Work through five separate questions: **who manages the device, who can access the accounts, where data is shared or synchronised, who can access the communications or mobile number, and whether there is evidence of malicious software or physical modification.**

</div>

Do **not** assume that because another person appears to know something from the phone, they have access to the phone itself. They may instead have access to an online account, a synchronised browser, photo sharing, a linked messaging session, the mobile account or SIM, call forwarding, location sharing, a backup account, or another device on which the account remains signed in.

The presence of **Android Enterprise**, **Android Device Policy**, **Google Workspace**, **Knox**, a work profile, certificates, system applications, developer terminology, “viewer”, “beta”, “heartbeat”, `system/priv-app`, or a large number of installed apps does **not** prove someone has taken over a device.

A telephone number, IP address, IMEI or serial number alone does not give someone remote control of an Android device.

If you remain concerned unauthorised access has happened or is happening, follow the relevant checks below. Nothing here replaces any need to contact the appropriate authorities.

## 1. Protect your safety, evidence and irreplaceable data first

If a partner, ex-partner or someone with physical access may be monitoring you, use a different trusted device to seek help. Removing access or changing settings can alert an abuser. In the UK, [Refuge's Tech Safety service](https://refugetechsafety.org/secure-your-tech/) provides specialist guidance; call **999** if anyone is in immediate danger.

Before resetting or deleting anything:

1. Photograph or record evidence using a safe device.
2. Keep a simple dated log of observable events: the exact time, what happened, which account or service reported it, and what evidence was preserved. “At 14:32 Google reported a password change I did not make” is useful; “a system package proves someone has root access” is an interpretation, not evidence.
3. Save copies of important messages, account alerts and transaction records somewhere the other person cannot access.
4. Recover missing photos before doing anything destructive:
   - Sign in to [Google Photos](https://photos.google.com/) from a trusted device and confirm the correct Google Account is selected.
   - Open **Trash** (Bin) and restore anything present. Backed-up items remain there for 60 days; items that were not backed up remain for 30 days.
   - Check **Archive**, **Recently added**, **Locked Folder**, the phone's Gallery bin, other Google Accounts, and any removable SD card.
   - Download a separate copy of recovered photos. Google Takeout cannot recover permanently deleted items.

If the phone is lost, stolen or no longer under your physical control, use Google's [Find Hub](https://support.google.com/android/answer/6160491) from a trusted device to locate it, mark it as lost or erase it. Erasing is permanent and prevents further location through Find Hub, so preserve what you need first where possible.

Do **not** factory-reset the phone until the data and evidence you need are safely copied.

## 2. Who manages or controls the device?

Open **Settings** and use its search box for the checks below. Android manufacturers use different menu layouts, so searching is more reliable than following one fixed path.

### Work profile

A work profile is identified by a **briefcase badge** on work apps and normally a **Work** tab in the app drawer and under **Settings → Passwords and accounts**.

On a personally owned phone, the organisation manages the work profile, not personal photos, personal messages or personal app data. Remove it with:

**Settings → Passwords and accounts → Work → Remove work profile**

Confirm the deletion, then uninstall the associated policy app if it remains. This deletes work-profile data only. A factory reset is not required. See [Introduction to work profile](/android/what-is-android-work-profile/) for the privacy boundaries.

### Family Link and parental controls

Google Family Link supervision can let a parent see a phone's location, approve or block apps, set time limits and remotely lock the device. Those controls can feel like a takeover, but Family Link cannot remotely read the screen, emails or messages, listen to calls, or choose a new screen-lock password.

Search Settings for **Parental controls** and check **Settings → Digital Wellbeing and parental controls** or **Settings → Google → All services → Kids and family → Parental controls**. Also look for a notice that the Google Account is supervised.

Use Google's [Family Link supervision guide](https://support.google.com/families/answer/9055704) to stop supervision. A person under 18 needs a parent's approval, and both people are notified when supervision stops. Removing a supervised account removes its supervision settings from that phone; adding the same account again restores them. A factory reset does not turn a supervised account into an unsupervised account.

### Full-device enterprise enrolment

A personal work profile and a fully managed device are different.

Reset the device only after completing the other relevant sections. During setup, watch what happens **before adding any Google Account**:

- If setup says the device belongs to or is managed by an organisation, the device is registered for enterprise enrolment. Contact the seller or the organisation named on screen and require them to remove it. If they cannot, return the device. Buying another used phone from the same source is not a solution.
- If management appears only after adding a particular work or custom-domain account, that account's organisation is requiring it. Remove the account or contact its administrator.
- If neither occurs, Android Enterprise is not persistently enrolling the phone.

Personally owned devices cannot be silently added to Android zero-touch by an ordinary individual who merely knows the IMEI or serial number. Devices are registered through authorised reseller and enterprise systems. See [Are employee-owned devices eligible for zero-touch?](/android/android-enterprise-faq/employee-owned-zt/) for how this works.

### Device administrator, Accessibility and local spaces

Search Settings for and review:

- **Device admin apps:** deactivate any administrator you do not recognise, then uninstall its app.
- **Accessibility:** turn off unfamiliar installed services. Accessibility access can read screen content and operate the interface.
- **Accounts:** under **Passwords and accounts**, **Manage accounts** or **Accounts**, record and then remove an account you do not recognise.
- **Multiple users:** remove an unfamiliar secondary user or guest from the device-owner account. Each user has a separate space with its own accounts, apps and data.
- **Private Space:** on Android 15 and later, open **Settings → Security and privacy → Private Space**. Apps in a locked Private Space can be hidden from the app drawer, recent apps, permission settings and the Privacy dashboard. If someone else created it, record what you can and use **Settings → System → Reset options → Delete Private Space**; this permanently deletes that space and its local data. The option to delete Private Space can appear even when no space has been configured, so the menu entry alone is not evidence.
- **Samsung Secure Folder and Dual Messenger:** on supported Galaxy devices, Secure Folder can hide separate copies of apps and data, while Dual Messenger can install a second copy of a supported messaging app for another account. Review **Settings → Security and privacy → More security settings → Secure Folder** and **Settings → Advanced features → Dual Messenger**. Their presence is not proof of compromise, but they are separate places to check if somebody else configured the phone.

## 3. Who has access to the accounts?

Most apparent “phone takeovers” are account-access related rather than Android Enterprise management. Work from the main email account outward because control of email is commonly used to reset everything else.

### Secure the Google Account from a trusted device

1. Open Google's [compromised-account recovery guide](https://support.google.com/accounts/answer/6294825) and complete the **Security Checkup**.
2. Review **Recent security events** and **Your devices**. Sign out devices you do not recognise.
3. Check that the recovery phone number and recovery email address are yours.
4. Change the Google Account password. Change it anywhere else the old password was reused.
5. Review Gmail forwarding rules, filters and delegated access.
6. Remove unfamiliar passkeys, security keys, app passwords and third-party account access.
7. Enable 2-Step Verification. Prefer a passkey, authenticator or security key over SMS where possible.

Google's account-side [Advanced Protection Program](https://support.google.com/accounts/answer/7519408) is an optional additional layer for people at elevated risk of targeted attacks. It uses passkeys or security keys for sign-in, applies extra checks and limits some third-party access. This is separate from Android's device-side Advanced Protection described later: enabling one does not mean the other is enabled.

### Review other accounts, linked devices and sessions

Repeat the account-security process for email, social media, cloud storage, banking, mobile-carrier and manufacturer accounts. Do not assume that securing the Google Account signs other services out.

- In **WhatsApp**, review **Linked devices** and remove anything unfamiliar. Also verify two-step verification and the email address attached to it.
- In **Telegram**, review **Settings → Devices** or **Privacy and Security → Active Sessions** and terminate unfamiliar sessions.
- In **Signal**, review **Settings → Linked devices** and unlink anything unfamiliar.
- In **Facebook/Meta Accounts Centre**, review **Password and security → Where you're logged in**. Check Instagram and any other profiles in the same Accounts Centre.
- For a **Microsoft account**, review sign-in activity and devices; use Microsoft's [sign out everywhere](https://support.microsoft.com/en-us/accounts-billing/manage/how-to-sign-out-of-your-microsoft-account-everywhere) control if needed.
- In every other important service, look for **devices**, **sessions**, **linked devices**, **where you're logged in**, **connected apps** or similarly named controls.

If messages, links or requests for money may have been sent from a compromised account, warn contacts through a different trusted channel. Tell them not to trust recent messages until you confirm the account is secure.

### Manufacturer accounts and remote-device services

A manufacturer account can have meaningful access without appearing under Device admin apps or Accessibility.

- Anyone who can use the Google Account on the phone may be able to use [Find Hub](https://support.google.com/android/answer/6160491) to locate, mark as lost or erase an eligible device. Secure the Google Account and review its devices.
- On supported Galaxy devices where it was enabled, [Samsung Find](https://www.samsung.com/uk/apps/samsung-find/) can locate or lock a registered device and remotely erase its data. Secure the Samsung account, review its registered devices and check **Settings → Samsung account** and **Find My Mobile/Samsung Find** settings.
- Other manufacturers provide their own account, backup and lost-device services. Review the account shown in Settings and use that manufacturer's official security and device-management pages.

Available actions vary by manufacturer, model, region and what was enabled beforehand. Do not rely on an old list of remote features; check the provider's current official page.

## 4. Where is data being shared, backed up or synchronised?

A clean Device admin or Accessibility screen does not show where cloud data is going. Inspect the destination account for each service, not merely whether the service is enabled.

### Accounts, browser sync and backups

- Under **Settings → Passwords and accounts**, **Manage accounts** or **Accounts**, list every Google, Samsung, Microsoft, work, school and app account on the device. Record and then remove any account you do not recognise.
- In **Chrome → Settings**, check the signed-in account and what is saved to it. Chrome can make passwords, browsing history, open tabs, bookmarks, addresses and settings available on other devices signed in to that account.
- Search Settings for **Backup**, then check **Settings → Google → All services → Backup** and the Google One app where present. Confirm which Google Account receives the Android device backup.
- In **Google Photos**, check the profile picture → **Photos settings → Backup** and confirm the backup account. Do the same in the phone manufacturer's Gallery app if it supports cloud sync.
- On a Galaxy device, check **Settings → Accounts and backup** for the Samsung account, [Samsung Cloud](https://www.samsung.com/uk/support/apps-services/use-the-samsung-cloud-to-back-up-and-restore-data-to-your-galaxy-device/), OneDrive or other configured destinations. Availability and the data covered vary by model, country and carrier.
- In **WhatsApp → Settings → Chats → Chat backup**, confirm the Google Account receiving the backup. Review any other messaging, notes, password-manager, health, file, photo or authenticator app that has its own cloud backup or synchronisation setting.

Removing an unwanted destination stops future access only where the service says it does. It does not delete copies somebody has already downloaded, saved to another account or restored elsewhere.

### Photo, location and family sharing

- In **Google Photos → profile picture → Photos settings → Sharing → Partner sharing**, remove any partner you do not want. Partner Sharing can automatically share newly backed-up photos. Stopping it does not remove photos the partner already saved to their own library.
- Review shared albums, conversations and link sharing in Google Photos. Turning sharing off cannot delete copies another person already downloaded or saved.
- Open **Google Maps → profile picture → Location sharing** and stop any sharing you do not want.
- Visit [Your family on Google](https://g.co/YourFamily) and review the family group, family manager, parents and shared services. Family-group membership does not by itself share every item or prove monitoring, but Family Link, location sharing, shared storage and family payment settings need separate review.
- Check location sharing in manufacturer, social, fitness, family-safety and “find my friends” apps too.

### Nearby and display connections

- Search Settings for **Connected devices**, **Bluetooth** or **Saved devices**. Android keeps accessories paired until they are removed; forget unfamiliar headphones, cars, watches and other accessories. Review whether a known device has permission for calls, contacts or messages.
- Check Quick Settings and media controls for an active **Cast**, **Screen cast**, **Smart View** or similar session and disconnect it. Also review linked TVs, speakers and home devices in the relevant app. A saved or nearby receiver is not evidence that the screen is currently being shared.

## 5. Who has access to calls, messages and the mobile number?

Loss of service, missing verification texts, unexpected SIM-change messages or calls being redirected are carrier-account problems, not proof that Android itself is managed.

### Check call forwarding and voicemail

Open the Phone app's settings and look for **Call forwarding**, often under **Calling accounts**, **Calls**, **Supplementary services** or a particular SIM. Check every forwarding condition for every SIM and remove any destination you did not set.

There is no universal Android path, and some carriers do not expose every network setting in the dialler. Contact the carrier using a number from its official website and ask it to verify call forwarding on the network even if the handset screen looks clean. Reset the voicemail PIN as well; do not reuse the phone unlock PIN or carrier-account password.

Ask the carrier to:

1. Check for an unauthorised SIM or eSIM change, number port, call-forwarding rule or account user.
2. Replace the SIM/eSIM where required.
3. Add a strong account PIN and a port-out lock where available.
4. Remove unknown authorised users and change the carrier-account password.
5. Confirm the voicemail PIN was reset and that no unfamiliar forwarding remains.

Do not rely on SMS for account recovery until the carrier confirms the number is secure.

Also review linked-device and session controls for messaging services in section 3. Someone can retain access through WhatsApp, Telegram, Signal or another service even after losing access to the Google Account.

## 6. Is there evidence of malicious software or physical modification?

### Review high-risk access and installed apps

Search Settings for and review:

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

Open **Play Store → profile picture → Play Protect → Scan**. Uninstall apps Play Protect identifies as harmful. Also install all Android, Google Play system and app updates.

Open **Settings → Apps → See all apps** and review the complete list, not only the app drawer or Home screen. Some installed apps have no launcher icon. Uninstall an unfamiliar app only after recording its name and checking that it is not a system, carrier, accessibility, work, school or safety app you intentionally use.

For a strange-looking system app or package name, search the [BAYTON Android system app database](https://sysapps.bayton.org/). Use the exact package name from the app-information screen where available, then check the observed manufacturer, device and Android versions. The database shows which packages have been seen preloaded across real device profiles and what they are for. A match can explain a normal system component; a missing result does not prove an app is malicious because coverage is not universal.

<div class="callout callout-red">
<div class="callout-heading">Do not install a random “anti-spy” or “hacker detector”</div>

Do not search an app store or website for an “anti-spy”, “hacker detector”, “stalkerware scanner” or similar app and grant it broad permissions merely because of its label or advertising. It is still untrusted third-party software and may produce alarming claims without establishing compromise. Use Android's built-in Settings checks and Play Protect. If a qualified forensic examiner needs a specialist tool, let that examiner choose and operate it while preserving evidence.

</div>

### For advanced users: inspect a bug report

If you are comfortable working with Android diagnostic output, a bug report can corroborate some of the checks above before a reset. Follow [How to capture a bug report and device logs](/android/how-to-capture-device-logs/), note the exact capture time and how the report was generated, keep the complete original ZIP unchanged and inspect a separate copy locally. If police or a qualified forensic examiner asks for the report as evidence, provide the whole original archive through the secure evidence channel they specify rather than only screenshots, copied lines or selected files. The main `bugreport-...txt` file contains Android system-service state (`dumpsys`), diagnostic output (`dumpstate`) and system messages (`logcat`).

Useful places to search include:

- **`DUMP OF SERVICE device_policy`:** can identify a device owner, profile owners, active device administrators, their package/component names and policies. Labels vary between Android releases. An active administrator is not necessarily a device owner, and a recognised work, school, parental-control or lost-device app may be legitimate.
- **`DUMP OF SERVICE account`:** can show configured account types and, depending on the Android version, manufacturer and redaction applied, account identifiers. An unfamiliar account type may simply belong to an installed app; compare it with the accounts in Settings and the owning package before drawing a conclusion.
- **User and profile state:** search for `DUMP OF SERVICE user`, `UserInfo`, `managed profile` and `Private Space` to corroborate which Android users or profiles exist. The exact wording and detail vary by build.
- **`DUMP OF SERVICE package`:** can show installed package names, versions, installation paths, components and permission state. Search for the exact package name found elsewhere in the report. A `/system`, `/product` or `/system/priv-app` path is not evidence of compromise by itself.
- **Other high-risk state:** service dumps and logs may help corroborate enabled Accessibility services, VPNs, default roles, running processes and recent activity. Search for a specific package or component rather than broad words such as “admin”, “monitor”, “owner” or “remote”, which occur routinely in normal Android output.

A bug report is a snapshot plus a limited amount of historical logging. It may omit or redact information, and manufacturers add their own sections, so absence from a report does not prove absence from the device. It also cannot replace the account, sharing and carrier checks in sections 3 to 5: a Google Photos partner, linked messaging session, remote account login or network-side forwarding rule may not appear in it at all.

<div class="callout callout-red">
<div class="callout-heading">Treat a bug report as sensitive personal data</div>

A bug report can contain account or device identifiers, installed packages, network details, recent activity and app-written log messages. Do not post it publicly, paste it into a forum or chatbot, or upload it to an unknown “bug report analyser”. Share it only through a secure channel with the manufacturer, account or service provider, law enforcement or a qualified forensic examiner who has asked for it. Do not send it to me.

</div>

Finding a device owner, profile owner, active administrator or unfamiliar account is actionable evidence to investigate through the relevant organisation, app or account provider. It is not attribution: the report does not establish who configured it or whether their intent was malicious.

### Test downloaded apps in Safe Mode

Use the phone manufacturer's official instructions to restart in **Safe Mode**. On many phones, open the power menu, touch and hold **Power off**, then confirm **Safe Mode**. Downloaded apps are temporarily disabled until the next normal restart.

If unexplained on-screen behaviour stops in Safe Mode, a downloaded app is likely responsible. Restart normally, then uninstall recently added or unfamiliar apps one at a time. Safe Mode does not sign other people out of online accounts or stop account forwarding, backups, linked sessions or location-sharing settings, so it is a diagnostic step rather than proof that the phone is secure.

### Treat an unexpected bootloader warning seriously

Android's Verified Boot design shows a warning on every boot when the bootloader is unlocked because software integrity cannot be guaranteed. If a used phone shows an unlocked-bootloader or custom-operating-system warning that the seller did not disclose, treat the device as untrusted: do not put sensitive data on it, return it to the seller where possible, or ask the manufacturer or an authorised repair provider to restore and verify official software.

A normal factory reset does not prove the bootloader or operating system has been returned to its official state. Do not blindly relock the bootloader, flash firmware or run copied ADB commands; doing so can destroy evidence or data and may make the device unusable.

### Harden access to the phone

- Change the screen lock if anyone else may know it. Use a strong, unique PIN or password rather than a simple pattern.
- Review the enrolled fingerprints and faces. Remove anything you do not recognise, then re-enrol your own biometrics if necessary.
- Search Settings for **Extend Unlock** or **Smart Lock**. Turn off on-body detection and remove trusted places and devices; these features can otherwise keep a phone unlocked for hours.
- Hide sensitive notification content on the lock screen. Search Settings for **Notifications on lock screen** or **Sensitive notifications**; names vary by manufacturer.
- Turn off **Developer options**, **USB debugging** and **Wireless debugging** unless you deliberately use them. Do not approve a computer's debugging prompt unless it is yours and you initiated the connection.
- Keep the phone physically controlled. A secure configuration cannot compensate for repeatedly giving an untrusted person the unlocked device and its passcode.

On supported Android devices, **device-side Advanced Protection** provides a single hardened mode under **Settings → Security and privacy → Advanced Protection → Device protection**. It keeps Play Protect enabled, blocks installs and updates from unknown sources, restricts unverified Accessibility tools, protects USB data access while locked, prevents 2G connections on supported hardware and enables other protections. See [What is Advanced Protection, and can it be managed?](/android/android-enterprise-faq/what-is-advanced-protection-mode/) for the full explanation.

This Android device setting is distinct from Google's account-side **Advanced Protection Program** in section 3. Review and enable each separately where it suits the risk and the device supports it.

## 7. Factory-reset only when it is justified

A reset is appropriate after confirmed account compromise, an unknown high-privilege app that cannot be removed, or persistent unexplained behaviour after the checks above.

1. Confirm important files and evidence are backed up.
2. Confirm you know the Google Account address, password and screen-lock PIN. If the Google password was just changed, wait at least 24 hours before resetting and follow any longer wait shown by the manufacturer or account-recovery process.
3. Use **Settings → System → Reset options → Erase all data (factory reset)**. If Settings is blocked, follow the manufacturer's official power-and-volume-button instructions.
4. Set up the phone **as new**. Do not restore apps or device settings from the old backup.
5. Install updates, enable Play Protect and add only accounts and apps you recognise.

If enterprise setup returns before any account is added, follow section 2. Repeated resets will not remove reseller-based enterprise registration.

If Settings is blocked, or unexplained behaviour continues after a clean setup without enterprise enrolment, contact the manufacturer or an authorised repair provider and ask it to reinstall the device's official signed firmware. This can destroy data and evidence. Do not follow an unknown person's flashing instructions, unlock the bootloader, or run ADB commands copied from a forum unless you understand exactly what they will remove. Replacing the phone is the final option, after the accounts and mobile number have been secured; otherwise the same account problem can simply follow to the replacement.

## What counts as evidence

Treat these as evidence worth acting on:

- An account provider shows an unfamiliar login, linked device, session or security-setting change.
- A backup, browser sync, photo-sharing or location-sharing setting points to an account or person you did not authorise.
- A carrier confirms an unauthorised SIM/eSIM change, number port or forwarding rule.
- An unknown app has device-administrator, Accessibility, VPN or other high-risk access.
- A user-installed CA certificate is present that you did not install and cannot attribute to a trusted work, school, VPN or Wi-Fi provider.
- The first-run setup wizard identifies an organisation before you add an account.
- A boot warning says the bootloader is unlocked or software integrity cannot be guaranteed when you did not knowingly modify the phone.
- Messages or files were deleted, money moved, purchases made, messages sent, or passwords changed without permission.

These are **not evidence on their own**:

- Android Enterprise, Device Policy, Workspace or Knox components.
- Briefcase icons or a work profile that can be removed normally.
- System certificates, system apps, disabled settings, developer terms or debug logs.
- Gboard or other Google apps downloading during setup.
- Battery drain, warmth, adverts, slow performance or a high app count.
- An IMEI, serial number, IP address, unfamiliar technical word, or references to “viewer” or “beta”.
- A Private Space, Secure Folder, Dual Messenger, paired-device or Cast menu entry without an unfamiliar configured account, device or active session.

## Get the right help

- **Immediate physical danger:** call 999 in the UK or the local emergency number.
- **Partner or family abuse:** use a safer device and contact [Refuge Tech Safety](https://refugetechsafety.org/secure-your-tech/).
- **Google Account, Photos, backup or sharing access:** use the provider's official [compromised-account](https://support.google.com/accounts/answer/6294825) and [Photos recovery](https://support.google.com/photos/answer/6306652) processes.
- **Another online account or linked session:** use that service's security, session-revocation and recovery process. Google cannot remove a Meta, Microsoft, Telegram, Signal or WhatsApp session.
- **SIM, call-forwarding, voicemail or telephone-number changes:** contact the mobile carrier's fraud team.
- **Work or school management:** contact the organisation's administrator. If management appears before an account is added, contact the organisation named during setup, the seller or manufacturer.
- **Unauthorised payments:** contact the bank immediately, then report cyber crime or fraud through [Report Fraud](https://www.reportfraud.police.uk/reporting-a-fraud/) in England, Wales or Northern Ireland; contact Police Scotland on 101 in Scotland.
- **Evidence for legal action:** stop altering the device and engage law enforcement or a qualified mobile forensic examiner. A phone-repair shop or online commenter cannot reliably attribute an attacker.
- **Bug reports, APKs, IMEIs and diagnostic files:** preserve the complete original bug-report ZIP unchanged. If law enforcement or a qualified forensic examiner asks for it as evidence, provide the whole archive through the secure channel they specify rather than selected extracts. Share other diagnostic material only through an official manufacturer, carrier, law-enforcement or qualified forensic channel that has asked for it. These files and identifiers can expose private information; do not post them publicly or send them to me.

If the relevant checks do not produce evidence matching one of these categories, I cannot determine from screenshots of Android system components that the phone has been taken over. That does not prove compromise is impossible; it means there is no actionable evidence for me to diagnose remotely. Use the exit route for the system that shows the evidence: the account provider, mobile carrier, organisation, seller, manufacturer, bank, police or qualified forensic examiner.

## Further reading and references

Menu names and paths differ between manufacturers. Where a device-specific page is listed below, prefer your own manufacturer's official documentation for the equivalent screen.

**Safety and support**

- [Refuge Tech Safety: Secure my phone guide](https://refugetechsafety.org/guide-secure-your-phone-basics/)

**Accounts and data recovery**

- [Secure a hacked or compromised Google Account](https://support.google.com/accounts/answer/6294825)
- [Get Google's strongest account security with the Advanced Protection Program](https://support.google.com/accounts/answer/7519408)
- [Get started with Google Password Manager on Android](https://support.google.com/accounts/answer/6208650)
- [Get bookmarks, passwords, history and tabs on all devices with Chrome](https://support.google.com/chrome/answer/165139)
- [Back up or restore data on an Android device](https://support.google.com/android/answer/2819582)
- [Transfer WhatsApp data to a new Android device](https://support.google.com/android/answer/14669513)
- [Find lost photos and videos](https://support.google.com/photos/answer/6306652)
- [Set up and stop Google Photos Partner Sharing](https://support.google.com/photos/answer/7378858)
- [Manage your family on Google](https://support.google.com/accounts/answer/6286986)
- [Back up and restore a Galaxy device with Samsung Cloud](https://www.samsung.com/uk/support/apps-services/use-the-samsung-cloud-to-back-up-and-restore-data-to-your-galaxy-device/)
- [Find, secure, or erase a lost Android device](https://support.google.com/android/answer/6160491)

**Linked sessions and remote-device services**

- [How WhatsApp multi-device works](https://engineering.fb.com/2021/07/14/security/whatsapp-multi-device/)
- [Telegram FAQ: devices and active sessions](https://telegram.org/faq)
- [Signal linked devices](https://support.signal.org/hc/en-us/articles/360007320551-Linked-Devices)
- [Log out of Facebook on another device](https://www.facebook.com/help/211990645501187)
- [Sign out of a Microsoft account everywhere](https://support.microsoft.com/en-us/accounts-billing/manage/how-to-sign-out-of-your-microsoft-account-everywhere)
- [Locate, lock or erase a Galaxy device with Samsung Find](https://www.samsung.com/uk/apps/samsung-find/)

**Management, supervision and other users**

- [What is an Android work profile?](https://support.google.com/work/android/answer/6191949)
- [What policies is my organisation enforcing on my device?](https://support.google.com/work/android/answer/7502354)
- [Add and manage supervision on a current Google Account](https://support.google.com/families/answer/9055704)
- [Delete, switch, or add users](https://support.google.com/android/answer/2865483)
- [Hide sensitive apps with Private Space](https://support.google.com/android/answer/15341885)

**Advanced diagnostics**

- [How to capture a bug report and device logs](/android/how-to-capture-device-logs/)
- [Capture and read Android bug reports](https://developer.android.com/studio/debug/bug-report)
- [AOSP guide to reading Android bug reports](https://source.android.com/docs/core/tests/debug/read-bug-reports)
- [DevicePolicyManager reference: owners and active administrators](https://developer.android.com/reference/android/app/admin/DevicePolicyManager)

**Apps, permissions and network settings**

- [Improve device security with Advanced Protection for Android](https://support.google.com/android/answer/16339980)
- [Use Google Play Protect to help keep your apps safe and your data private](https://support.google.com/googleplay/answer/2812853)
- [Manage permissions from the Privacy dashboard](https://support.google.com/android/answer/13530434)
- [Control sensitive notifications on the lock screen](https://support.google.com/android/answer/9079661)
- [Find and remove paired Bluetooth devices](https://support.google.com/android/answer/9417604)
- [Use Secure Folder on a Galaxy device](https://www.samsung.com/uk/support/mobile-devices/what-is-the-secure-folder-and-how-do-i-use-it/)
- [Use Dual Messenger on a Galaxy device](https://www.samsung.com/uk/support/mobile-devices/how-do-i-set-up-dual-messenger/)
- [Check call forwarding on a Galaxy device](https://www.samsung.com/uk/support/mobile-devices/how-to-enable-or-disable-the-call-forwarding-feature-in-your-samsung-galaxy-smartphone/)
- [Android Verified Boot warning screens](https://source.android.com/docs/security/features/verifiedboot/boot-flow)
- [Find problem apps by rebooting to safe mode](https://support.google.com/pixelphone/answer/2852139) (Pixel)
- [Add and remove certificates](https://support.google.com/pixelphone/answer/2844832) (Pixel)
- [Control airplane mode, Private DNS and other network settings](https://support.google.com/pixelphone/answer/2819583) (Pixel)
- [Learn how to change your default browser](https://support.google.com/android/answer/14324187)
- [Choose when your Android phone can stay unlocked](https://support.google.com/android/answer/9075927)

**Resetting the device**

- [Reset your Android device to factory settings](https://support.google.com/android/answer/6088915)
- [How to factory reset your Google Pixel phone](https://support.google.com/pixelphone/answer/4596836) (Pixel)

**On this site**

- [BAYTON Android system app database](https://sysapps.bayton.org/)
- [Introduction to the Android work profile](/android/what-is-android-work-profile/)
- [Are employee-owned devices eligible for zero-touch?](/android/android-enterprise-faq/employee-owned-zt/)
- [What is Advanced Protection, and can it be managed?](/android/android-enterprise-faq/what-is-advanced-protection-mode/)
