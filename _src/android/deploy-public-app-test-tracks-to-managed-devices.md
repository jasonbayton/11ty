---
title: 'Deploy app test tracks to managed devices'
published: '2026-04-16'
status: publish
author: 'Jason Bayton'
excerpt: 'How to expose a closed testing track of a public Google Play app to an Android Enterprise organisation and roll it out through an EMM.'
type: documentation
tags:
    - App management
layout: base.njk
eleventyNavigation:
  order: 4500
---
Application tracks in Google Play are commonly used to validate a build before it reaches the production channel. For Android Enterprise customers, those tracks can also be targeted at a specific managed organisation so that only devices in that organisation receive the test build, without exposing the app to the wider public and without creating a separate private app.

This guide walks through the end-to-end workflow:
- what happens in the Play Console, 
- how the enterprise organisation ID is surfaced from the EMM side, and 
- how the track version ends up on a managed device. 

This article is steered more towards public app management - for fully private, organisation-only apps see [Create and manage private apps for Android Enterprise](/android/create-and-manage-private-apps-for-android-enterprise/).

## When to use a track vs a private app

Tracks and private apps are often confused. They solve different problems:

- **Closed testing track** - a *version* of an app gated to a specific set of testers or organisations. Use this when you want to validate a build with your managed fleet before promoting it to production. Tracks work on both public apps and private apps.
- **Private app** - the app is never published publicly. Only approved organisations can see or install it. Use this when the app is internal and should never appear in the public Play catalogue.

If the goal is "only my managed devices should ever see or run this app", a private app is the cleaner path. If the goal is "my managed devices should receive a pre-release version of an app before it goes to production", a closed testing track is the right mechanism - regardless of whether the app is public or private.

Note that the path to configuring tracks differs between app types:
- **Public apps** - manage tracks directly in the [Google Play Console](https://play.google.com/console) under Test and release > Testing > Closed testing
- **Private apps** - open the app via the managed Google Play iFrame in your EMM, select Edit > Advanced settings, which opens the Google Play Console for that app. From there the track configuration steps are the same

## The requirements

Four primary requirements need to be in place before a track version lands on a managed device:

1. The closed track must exist
2. The Play Console must expose the track to the enterprise organisation ID.
3. The EMM must be configured to assign the track version (as opposed to the production version) to the target devices or groups.
4. The device must be enrolled into the organisation that was added as a tester.

Miss any one of these and the device will either not see the app, will see the production version instead of the track, or will see the app but not update to the track build.

## Part 1 - Find the enterprise organisation ID

The organisation ID is the identifier managed Google Play uses to distinguish one Android Enterprise tenant from another. It is an alphanumeric string, typically prefixed with `LC` (e.g. `LC03bb2451`).

The most reliable way to find it is through the managed Google Play iFrame that most EMMs embed for app management. In the iFrame, click the organisation icon in the top-right corner - it will show the organisation name and ID directly. Check your EMM vendor's documentation for how to access this, as the location varies.

If you cannot locate the organisation ID in the EMM UI, see [How to locate an Android private app assigned to an organisation ID](/android/how-to-locate-an-android-private-app-assigned-to-an-organisation-id/) for one method of confirming it indirectly.

This ID is what the app developer needs to add as a tester on the closed testing track.

## Part 2 - Expose the track in the Play Console

This part happens in the Google Play Console for the app itself. The developer (or a Play Console user with release management permissions) needs to:

1. Open the app in the Play Console.
2. Go to **Test and release > Testing > Closed testing**.
3. Either create a new track or click **Manage track** on an existing track (e.g. "Closed testing - Alpha").
4. Select the **Testers** tab.
5. Under **Manage organizations**, either tick an existing organisation to grant it access, or click **Add organization** and enter the enterprise organisation ID from Part 1 along with a recognisable name.
6. Save the changes.
7. Follow the standard process to create and roll out a release on the track - upload the build, preview and confirm, then send for review - just as you would for a production release.

<div class="callout callout-orange">
<div class="callout-heading">Managed Google Play must be enabled</div>

If the **Manage organizations** section does not appear under the Testers tab, Managed Google Play is not enabled for the app. Go to **Advanced settings > Managed Google Play** tab, select **Turn on**, and save. Then return to the track's Testers tab - the organisations section will now be available.

</div>

Once the organisation is added and the release is rolled out, the track is officially exposed. Propagation through Google's backends is not instant, it can take anywhere from a few minutes to several hours for the track version to become selectable in the EMM. If it does not appear immediately, give it time before assuming something is wrong.

## Part 3 - Assign the track in the EMM

Once the track is exposed to the organisation, the EMM needs to be told to serve the track version to the relevant devices rather than production. The exact steps vary by EMM, but the general flow is:

1. In the EMM, open the managed Google Play integration (commonly the managed Google Play iframe or an equivalent native app picker).
2. Locate the app by package name or title. The app will appear as it always has - there is no visual distinction at this point between an app with a track exposed and one without.
3. Select the app and look for a track selector. This is usually labelled "Play track", "Application track", "Release track", or similar. The dropdown will now include the closed testing track by name (for example, "Beta test" or whatever the developer named it).
4. Choose the desired track.
5. Save and apply the assignment to the intended devices, groups, or users.

Devices in the targeted assignment will receive the track build either on next sync or at their next managed Google Play app update window.

<div class="callout callout-warning">

### Managed configurations caveat

Managed configuration schemas are read from the *production* version of the app, not the track version. If the track build introduces new managed config keys, the EMM console will not surface them until the production listing is updated with the same schema. This is a current limitation of AMAPI rather than a per-EMM issue. See [Why don't managed configurations work with app tracks?](/android/android-enterprise-faq/managed-configs-app-tracks/) for the detail.

</div>

## Verifying the deployment on device

On a managed device, the simplest verification steps are:

1. Open the **Play Store** in the work profile (or the only Play Store on a fully managed device).
2. Find the app and open its listing.
3. Scroll to the bottom of the listing, a version should be present.
4. Check the installed version matches the track's version code.

Alternatively, just validate through Android Settings > Applications > App that it's the version it should be.

If the application hasn't updated, the most common causes are: 
- organisation ID not yet propagated, 
- device in a different organisation than the one targeted, or 
- the EMM still pointing at the production track for that app assignment.

## Common pitfalls

A few issues come up frequently:

- **Using the wrong organisation ID.** If the organisation is bound to multiple enterprises, make sure the ID supplied to the developer matches the enterprise the target devices are enrolled into.
- **Expecting managed config changes to flow from the track.** They will not. The production listing defines the managed config schema - see the caveat above.
- **Closed testing track not yet rolled out.** A track exists as soon as it is created, but builds do not reach testers until the release is fully rolled out through the Play Console release process.