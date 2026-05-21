---
title: WEB APP GENERATOR supported configurations
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
    - Web App Generator Configuration
layout: base.njk
eleventyNavigation:
    order: 0
    title: Supported configurations
---

A reference for every field in the WAG form.

## Identity

### Target URL
Required. The URL the wrapper opens to. HTTP and HTTPS both supported; HTTP target URLs automatically enable cleartext traffic in the network security config for that host only.

### Application name
The user-visible name in the Android app list and the splash screen. Does not affect the wrapped site itself.

### Application icon
Optional PNG upload, automatically rescaled to standard launcher icon densities. If omitted, a generic Bayton mark is used.

### Theme colour
A CSS-style hex colour (`#rrggbb` or `#rgb`). Used for the splash background, the status bar, the navigation bar and (in Minimal UI mode) the in-app toolbar. Icon and text contrast on the splash and bars is computed automatically via WCAG relative luminance.

## Display mode

### Standalone
System bars visible, no in-app URL chrome. Closest to a typical native app feel.

### Minimal UI
Shows a small in-app toolbar with the URL and a refresh button. Useful when you want users to be able to verify what site they're on, or when the wrapped site needs a manual refresh affordance.

### Full screen
Hides system bars entirely. Best for kiosks, signage, and immersive content. Includes a **Respect insets** sub-toggle:

- **On** (default): preserves padding around device camera notches and rounded corners so content stays visible.
- **Off**: uses the entire screen edge-to-edge. Suitable for notch-less devices where the inset padding would otherwise show as awkward letterboxing.

## Permissions

The opt-in permissions (camera, microphone, geolocation, external links) are **off by default**. When off, the underlying Android permission is not declared at all, and page calls to the corresponding API fail silently. When on, the runtime permission is requested the first time the page asks. Users can revoke later via Android Settings without breaking the app.

- **Camera.** Required for `getUserMedia({ video: true })`.
- **Microphone.** Required for `getUserMedia({ audio: true })`.
- **Geolocation.** Required for the HTML5 Geolocation API.
- **External links.** When off, the wrapper stays locked to the registered URL and its subdomains; any other web link is silently blocked. When on, the WebView navigates freely within itself, and a user can browse off-site without leaving the app. Use deliberately: in Standalone or Full screen mode there is no URL bar, so the user cannot see what site they're on.

File downloads are not a toggle. The WebView surfaces the standard Android download notification via `DownloadManager` whenever the wrapped site triggers a download, with the file saved to the user's Downloads folder.

## Behaviour

### JavaScript / Cookies
On by default; required by virtually all modern web apps. Toggle off only for static / content-only sites or kiosk-style locked-down apps where session state is unwanted. Disabling JavaScript breaks anything dynamic; disabling cookies breaks login sessions and most authenticated flows.

### Keep screen on
Prevents the device dimming or sleeping while the app is foregrounded. Pairs with Full screen for kiosks and digital signage. Applies the `FLAG_KEEP_SCREEN_ON` window flag.

### Block screenshots
Applies `FLAG_SECURE` so the system refuses screenshots, screen recording, and shows a blank preview in the app switcher. Use for wrappers over sensitive content - banking, medical, internal tools.

### Pull to refresh
Adds the standard swipe-down-to-reload gesture. Only fires when the page is scrolled to the top, so it doesn't fight normal scrolling. Particularly useful in Standalone and Full screen modes which don't expose a toolbar refresh button.

### Orientation
- **Auto** (default): lets the system pick (typically full sensor on phones).
- **Portrait** / **Landscape**: locks the activity. Useful when the wrapped site renders only in one orientation, or for tablet kiosk setups.

### User-Agent override
Optional custom string substituted into outgoing requests. Useful when the wrapped site serves different content based on UA. Most cases should leave this blank; the WebView's default UA identifies as Chromium on Android, which is what most sites expect.

## Signing

Detailed in [Quick start](get-started). Three modes: Bayton-signed, release-signed, debug-signed.

## Output

- **APK.** Direct install via EMM push or sideload. Universal compatibility.
- **AAB.** Required for upload to Managed Google Play.

## Update codes

Same model as KAG. Each new build generates a unique update code returned exactly once; the server stores only the SHA-256 hash. Use the original code on a future build to keep the same package name (required for EMM silent updates and Managed Google Play re-publishes).
