---
title: Troubleshooting issues with WEB APP GENERATOR
parent: WEB APP GENERATOR support
published: '2026-05-21'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags:
    - 'Web App Generator'
    - 'bayton-projects'
categories:
    - Web App Generator Troubleshooting
layout: base.njk
eleventyNavigation:
    order: 4
    title: Troubleshooting issues
---

If you're having issues building, deploying or running a WEB APP GENERATOR build, the guidance below may help. If not, raise an issue at [github.com/baytonorg/wag/issues](https://github.com/baytonorg/wag/issues) or join the [BAYTON Discord](https://discord.gg/YUY7jAjayr).

## Build-time errors

**Invalid keystore**
: The uploaded keystore is not a recognisable JKS or PKCS12. Confirm the file extension matches the actual format (a `.pem` renamed to `.jks` won't work), and that the file isn't corrupt. `keytool -list -keystore <file>` will refuse to read a non-keystore.

**Key alias not found**
: The alias entered on the form doesn't exist inside the supplied keystore. `keytool -list -keystore <file>` shows the available aliases.

**Wrong password**
: Either the store password or the key password is incorrect. These are independent values; many keystores reuse the same value for both, but if yours doesn't, both must be supplied separately.

**Build failed; check server logs for details**
: A Gradle build step failed server-side. The reason isn't surfaced in the form response. Quote the **builder version** from the result page and the **job ID** from the URL when raising a support request so the failure can be traced.

## Runtime issues

**App opens to a white screen**
: The target URL returned a non-2xx status or failed to load. Open the URL in a desktop browser to confirm it loads. If it does, check whether any same-host resources (scripts, images, fonts) are blocked by CSP or by the wrapper's cleartext rules (cross-host HTTP resources are blocked when the target is HTTPS).

**App crashes on launch**
: Rare. Usually caused by a malformed icon or an unsupported theme colour. Rebuild without the optional fields to confirm.

**Page loads, but `getUserMedia` or Geolocation fails**
: The corresponding permission toggle was off at build time. Permissions are baked into the manifest and cannot be flipped on after the build. Rebuild with the toggle enabled. If the toggle was on and the call still fails, confirm the user granted the runtime permission when prompted (App info > Permissions on the device), and that the site is served over HTTPS (modern WebViews refuse `getUserMedia` over insecure origins).

**Login session is forgotten between launches**
: The wrapper has its own cookie jar, isolated from Chrome's. If the site uses session cookies (no `Expires` or `Max-Age` set), they're lost when the app process is killed. Switch to persistent cookies or longer-lived auth tokens (OAuth refresh tokens, JWTs).

**File downloads don't trigger**
: WAG handles standard `<a download>` and `Content-Disposition: attachment` responses via Android's `DownloadManager`. Custom blob-URL downloads sometimes don't surface a download notification; supply a direct link instead. `data:` URI downloads are blocked by `DownloadManager` and the WebView cannot work around this.

**`tel:`, `mailto:`, `sms:`, `geo:` links don't open**
: These do work, but only when a real user gesture taps them in the main frame. Sub-frame and script-initiated openings are blocked silently. Other custom schemes (`intent://`, custom URIs) are blocked entirely. This is intentional and prevents wrapped sites from launching external apps without user action.

## Known limitations

**Web push notifications**

WAG does not bridge web push to FCM. Push notifications sent by the wrapped site will not arrive. If push is required, run a native companion app alongside the wrapper.

**Custom user-installed CA certificates**

By default, WAG honours the user CA store via the **Trust user CAs** toggle. If your enterprise MITM CA isn't being trusted, confirm that toggle is on and that the CA is installed in the user trust store on the device, not just on a different profile.

**Update code rejected when rebuilding**

The update code is a one-time-issued, hashed-and-stored secret. Paste rather than retype to avoid whitespace contamination. Confirm you're using a WAG-minted code (KAG codes are intentionally rejected by WAG and vice versa). If the original package name has been removed from the registry, raise a support request with the job ID of the original build.

## Reporting an issue

Include in your support request:

- The **job ID** from the result page (the random ID in the URL).
- The **builder version** shown on the result page (also baked into the APK manifest as a meta-data tag).
- A short reproduction: target URL, display mode, permissions enabled, Android version of the test device.

Open issues at [github.com/baytonorg/wag/issues](https://github.com/baytonorg/wag/issues).
