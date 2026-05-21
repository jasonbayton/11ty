---
title: WEB APP GENERATOR troubleshooting
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
    order: 0
    title: Troubleshooting
---

## Build fails immediately

Most fast-failures are caused by an invalid signing keystore. Same checklist as KAG:

- Confirm the file is a real JKS or PKCS12.
- Confirm the **key alias** exists inside the keystore: `keytool -list -keystore <file>`.
- Confirm both passwords are correct. Store password and key password are independent.

## Build fails with a Gradle error

Gradle build failures log server-side; the form returns a generic "Build failed" message. When raising a support request, quote the **builder version** from the result page and the **job ID** from the URL.

## App opens but immediately closes / shows a white page

Common causes:

- The target URL returned a non-2xx HTTP status. WebView renders an empty white page on a server error. Open the URL in a desktop browser to confirm it loads.
- The target URL is HTTP without `cleartext` being enabled. WAG enables cleartext automatically for HTTP target URLs at build time, so this should not happen for the registered URL - but it _will_ happen for any HTTP _resource_ (script, image) loaded from a different host. Switch any cross-host resources to HTTPS.
- The site's `Content-Security-Policy` blocks framing inside a WebView. Update the CSP to permit `frame-ancestors *` or the wrapper's origin.

## Page loads but `getUserMedia` / Geolocation fails

The corresponding permission toggle was off at build time. Permissions cannot be flipped on after the build; rebuild with the toggle on.

If the toggle was on and you're still hitting an error:

- The user denied the runtime permission the first time the page asked. Long-press the wrapped app, **App info > Permissions**, re-grant.
- The site is being served over HTTP, not HTTPS. Modern WebViews refuse `getUserMedia` over insecure origins.

## File downloads don't trigger

Confirm the **Downloads** permission was on at build time.

If on:

- The download is initiated by JavaScript in an unusual way. WAG handles standard `<a download>` and `Content-Disposition: attachment` responses. Custom blob-URL downloads sometimes don't surface a download notification; consider providing a direct link.
- The download is to a `data:` URI. These are blocked by Android's `DownloadManager`; the WebView cannot work around it.

## Login session forgotten between launches

The wrapper has its own cookie jar, isolated from Chrome's. If the site uses session cookies (no `Expires` / `Max-Age` set), they're lost when the app process is killed. Switch the site to persistent cookies or use longer-lived auth tokens (OAuth refresh tokens, JWTs).

## Update code rejected when rebuilding

Same as KAG: paste rather than retype, confirm you're using a WAG-minted code (not KAG), and check the original build's package name is still registered.

## tel: / mailto: / sms: / geo: links don't open

These do work, but only when a real user gesture taps them in the main frame. Sub-frames, scripts and other custom schemes (`intent://`, custom URIs) are blocked silently. This is intentional - it prevents wrapped sites from triggering external apps without user action.

## Push notifications don't arrive

Web push notifications do not work in WAG. There is no FCM bridge from the WebView. If you need push, consider supplementing with a native companion app or moving the relevant flows to email.

## Reporting an issue

Include in your support request:

- The job ID from the result page.
- The builder version (result page or APK manifest meta-data).
- A short reproduction recipe: target URL, display mode, permissions enabled, Android version of the test device.

Open issues at [github.com/baytonorg/wag/issues](https://github.com/baytonorg/wag/issues).
