---
title: KIOSK APP GENERATOR supported configurations
parent: KIOSK APP GENERATOR support
published: '2026-05-21'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags:
    - 'Kiosk App Generator'
    - 'bayton-projects'
categories:
    - Kiosk App Generator Configuration
layout: base.njk
eleventyNavigation:
    order: 0
    title: Supported configurations
---

A reference for every field in the KAG form.

## Identity

### Application name
The user-visible name of the launcher. Appears nowhere on the launcher surface itself (the launcher fills the home screen), but used in Android's app list, EMM dashboards and the APK metadata.

### Application icon
Optional. PNG upload, automatically rescaled to standard launcher icon densities. If omitted, a generic Bayton mark is used.

### Theme colour
A CSS-style hex colour (`#rrggbb` or `#rgb`). Used for the splash-screen background, the status bar, the navigation bar and the tile accents on the launcher surface. Icon and text contrast on the splash and bars is computed automatically via WCAG relative luminance, so dark themes get white iconography and light themes get dark iconography.

## Grid layout

### Columns / rows
The launcher renders apps in a fixed grid. Choose the column count and row count that fits the target device's screen aspect ratio. Apps that don't fit on one screen become scrollable.

### Tile size
Sets the tile dimensions. Larger tiles suit kiosk and signage scenarios where users may be standing back from the device; smaller tiles fit more apps on screen for power users.

## Apps

For each app exposed by the launcher:

- **Package name.** Required. The Android package identifier (e.g. `com.google.android.calendar`). The app must already be installed on the target device.
- **Display name.** Optional override for the launcher tile label. If omitted, the system app name is used.
- **Icon.** Optional override. If omitted, the system app icon is used.

## Wallpaper

### Source
- **Bundled.** Upload an image; it ships inside the APK and renders on the launcher background.
- **System default.** No wallpaper is set; the device falls back to whatever the EMM policy provides.

### Mode
- **Fit.** Wallpaper is scaled to fit, preserving aspect ratio. May letterbox.
- **Fill.** Wallpaper is scaled to cover the screen, preserving aspect ratio. May crop.
- **Stretch.** Wallpaper is stretched to exact screen dimensions. Distorts the image.

## Settings access

Controls how much of Android's Settings surface end users can reach from inside the launcher. Three levels:

- **None.** No settings access at all. Suitable for the most locked-down kiosk deployments.
- **Quick settings only.** Lets users pull down to access Wi-Fi, brightness and volume tiles, but blocks the full Settings app.
- **Full settings.** Exposes the system Settings app via a launcher tile. Suitable for trusted-user deployments where end users may need to configure the device themselves.

For finer-grained per-intent control (e.g. "allow only Wi-Fi"), pair KAG with [Managed Settings](/projects/managed-settings).

## Signing

Detailed in [Quick start](get-started). Three modes: Bayton-signed, release-signed, debug-signed.

## Output

- **APK.** Direct install via EMM push or sideload. Universal compatibility.
- **AAB.** Required for upload to Managed Google Play. Smaller per-device download once Play handles density / ABI splits.

## Update codes

Each new build generates a unique update code, returned exactly once. The server stores only the SHA-256 hash; the raw code cannot be recovered or regenerated. When you need to update an existing launcher and keep the same Android package name (required for EMM silent updates and for republishing to the same Managed Google Play listing), enter the original update code in the **Update code** field on the next build.

Lost the update code? You can still rebuild, but the new build receives a new package name. Devices will see it as a fresh app.
