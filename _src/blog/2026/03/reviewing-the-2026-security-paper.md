---
title: "What's new in the 2026 Android Security Paper?"
date: '2026-03-13'
status: publish
author: 'Jason Bayton'
excerpt: "Summarising 74 pages of security gold so you don't have to (but you probably should)."
type: post
tags:
  - Enterprise
---

Google has released the 2026 edition of the Android Security Paper, and I've spent some time comparing it with notes from the 2023 and 2024 versions I've reviewed in the past to determine both net-new content, as well as overall direction.

The short version: core architecture is largely the same over the last few years. The Linux sandbox model, SELinux enforcement, hardware-backed keystore, verified boot - all of that is still there, and still described in much the same way. What changes is a gradual shift in approach to security, I see three themes emerging:

1. Android is moving from malware-focused security alone to behavioural protection
2. The OS is starting to intervene in real-world attacks like scams and social engineering
3. Hypervisor-based isolation is getting more and more attention.

## The papers at a glance

Before diving in, here's a quick comparison of the three editions:

| Area | 2023 Paper | 2024 Paper | 2026 Paper |
|---|---|---|---|
| **Android version focus** | Android 13/14 era | Android 15 | Android 16 |
| **Security focus** | Platform hardening, exploit mitigation | Device theft protection, privacy features | Behavioural protection, scam defence, hardened device mode |
| **Theft protection** | Basic remote lock and find-my-device | ML-based Theft Detection | Expanded protections including auto-reboot after extended lock (p. 11) |
| **Device security posture** | Individual security controls | Incremental improvements | Advanced Protection mode - multiple controls via single toggle (p. 11) |
| **Authentication** | Standard biometrics / device credential | Improved credential handling | Identity Check requiring biometrics for high-risk actions (p. 11) |
| **Network security** | TLS, VPN, MAC randomisation | Similar protections | 2G disablement and hardened connectivity controls (p. 11) |
| **USB / physical access** | Standard USB behaviour | Mostly unchanged | USB data disabled when device is locked (p. 11) |
| **Scam / social engineering** | Minimal | Some Play Protect warnings | AI-based scam detection and in-call intervention (p. 12) |
| **Privacy model** | Runtime permissions, privacy dashboard | Privacy sandbox, Private Space | AI-driven contextual privacy controls (p. 13) |
| **Notification privacy** | Standard notification controls | Some improvements | Smart lock-screen redaction for sensitive content (p. 13) |
| **Play Protect telemetry** | Large-scale scanning | 200 billion apps scanned daily | Updated to 340 billion apps scanned daily (p. 17) |
| **Virtualisation** | Early AVF introduction | More detailed AVF explanation | Stronger enterprise positioning of pVMs and pKVM (p. 31) |
| **Enterprise management** | Work profiles, OEMConfig, provisioning | eSIM management, COPE controls | Zero-trust framing, conditional access (p. 14) |

The high-level trend is clear. In 2023, the paper focused on platform security architecture and malware defence. In 2024, it shifted toward privacy and theft protection. In 2026, it moves to behavioural security, context-aware authentication, and device hardening modes.

## What's new in the 2026 paper

### Advanced Protection: a system-level security switch

The most notable addition in the 2026 paper is Advanced Protection, described on page 11 as "a full-system security mode that can be enabled with a single toggle."

When enabled, the paper says it activates a hardened device mode that blocks the sideloading of apps, ensures scam and web protections cannot be disabled, deactivates 2G networks, and prevents reconnection to known insecure Wi-Fi networks.

It also enables USB data lockdown - turning off USB data transfers unless the phone is unlocked - and enforces an inactivity reboot if the device is locked for an extended period, for example 72 hours.

This is interesting because it's essentially a security posture profile baked into the OS. Right now, EMMs control these kinds of settings individually through user restrictions, network policies, install controls, and Play Protect enforcement. Advanced Protection bundles all of that into a single platform-level switch.

If Google eventually exposes this through Android Enterprise management APIs - which seems very likely given how the paper frames it for enterprise on page 14 - administrators could one day have the option to set something like a "security baseline" without configuring dozens of individual controls. Similar I suppose to what was attempted with password buckets, but actually useful.

### Identity Check: biometrics for sensitive actions

Android 16 also introduces Identity Check, which requires biometric authentication for certain high-risk actions even if the attacker knows the device PIN.

The paper (p. 11) lists protected actions including changing the device PIN, modifying saved passkeys, disabling theft protection, and accessing critical Google account settings.

This directly addresses the shoulder-surfing attack model. If someone steals a device after watching the owner enter their PIN, they still can't change security settings or access credentials without a biometric match.

For enterprise, this matters more than it might initially appear. The common incident scenario is: device stolen, attacker knows PIN, attacker disables protections or removes accounts, data exfiltration happens before IT can issue a remote wipe or trigger lost mode. Identity Check helps to reduce that risk.

The paper also notes this can be location-aware - extra authentication kicks in only when the device is outside trusted locations like home or office. That's essentially device-side conditional access, which has traditionally been handled by identity providers and EMM policies rather than the OS itself. It's also not an entirely new concept, having trusted locations for extended unlock had been present in Android for years, though obviously works in the opposite way.

### Anti-scam protections: the OS starts intervening

Perhaps the most interesting new direction is AI-powered scam detection. Page 12 describes on-device behavioural analysis integrated into calls and messaging apps.

The system will now "block high-risk actions - like granting Accessibility permissions to a newly downloaded app, disabling Google Play Protect, or sideloading an app - while you are on a call with a number not in your contacts". 

Detection has also been expanded to cover crypto scams, financial impersonation, and tech support scams.

This is a significant shift. Previous papers relied almost entirely on Play Protect for malware detection and app review for quality control. The 2026 paper acknowledges something the security industry has known for a while: most compromises now happen through social engineering, not technical exploits.

For enterprise deployments, this is particularly relevant. Many corporate breaches happen because a user installs a malicious app during a support scam, grants accessibility access to something they shouldn't, or disables protections under pressure from a convincing caller. The OS now intervenes in real time.

From my own experience, my Pixel set off an unfamiliar notification sound in my ear on a recent call where I was discussing insurance renewals. On pulling the phone from my ear (as one would..) it alerted me to the risk the call I was on may be a scam. It wasn't, but it could definitely be perceived that way, and I appreciated the warning.

### AI-driven contextual privacy

Another new concept in Android 16 is AI-powered contextual privacy controls. The paper (p. 13) describes a framework that analyses usage patterns and context to dynamically adjust an app's data access.

The example given is telling: a navigation app might get unrestricted location access during the daily commute, but if the same app requests location data unexpectedly at midnight, the system prompts for re-confirmation.

Users also get transparency logs explaining why the AI restricted or granted access, and they can override the system's recommendations.

This is a genuinely new, interesting usecase for AI. Previous papers described static permission models - you grant an app access, and it has that access until you revoke it, or it eventually gets revoked after a period of time. The 2026 paper introduces adaptive permission enforcement, where context matters.

Part of that context of course for enterprise is _does policy mandate the approval of this permission?_ In which case, the above doesn't come into it.

### Smart lock-screen redaction

A smaller but useful addition: the system now uses AI to detect sensitive information in notifications - OTPs, banking alerts, personal messages - and automatically hides them on the lock screen unless the phone has been recently unlocked or is in a low-risk scenario (2026 paper, p. 13).

This directly addresses lock-screen shoulder surfing, which is a real problem in enterprise environments where corporate OTPs, internal server alerts, or confidential email snippets can be read by anyone standing nearby.

### Hardware-backed zero-trust architecture

Page 13 frames Android security around zero-trust architecture for the first time, noting that Android 16 "moves towards enforcing a zero-trust model at the hardware level, ensuring that every request - from the device, app, or user - must be validated before granting access."

In previous years this was implied through Play Integrity and device attestation. In 2026, it becomes core messaging.

### Quantum-resistant cryptography

Also new to the 2026 paper (p. 13): support for post-quantum cryptography algorithms. This prepares Android for future threats where quantum computers could break traditional encryption. Not too much to go on yet, but it's interesting to see the thoughts going into it.

### Updated Play Protect numbers

The 2026 paper reports Play Protect now scans over 340 billion apps daily (p. 17). The 2024 paper reported roughly 200 billion. That's some exceptional growth within the ecosystem. Update your slides if you're referencing the old figure when talking Android :) 

## On virtualisation

The Android Virtualisation Framework (AVF) has been covered in previous security papers, starting relatively brief around 2023, covering the hypervisor, virtual machine monitor, and Microdroid as a guest OS, with a technical explanation of how the components fit together. In 2024, the section expanded with more detail on pKVM, VM attestation, and Secretkeeper, and in this paper, (p. 31), AVF sees quite a bit more attention. Notably, Google says the framework "is essential for the next generation of Isolated Execution Environments (IEEs) used in modern Android applications".

The paper then dedicates four pages (32-36) to virtualisation and the core enterprise benefits, including compromise resilience, compliance and reduced privilege, standardised security, and manageability. 

### Why this matters

Traditional Android security assumes the OS itself is trusted - we have several known approaches to essentially guaranteeing the device an application is running on can be trusted, and these are covered in basically every paper. The virtualisation model however assumes the OS may eventually be compromised, and isolates critical workloads below it.. which is also fair. Once a device is out in the wild, even with the best lockdowns in place, it's conceivable a device may eventually succumb to an exploit or workaround that'd allow a compromise, even if it doesn't present that way.

The 2026 paper describes this through several components:

**pKVM (protected Kernel Virtual Machine)** - Google's open-source hypervisor, integrated into the Android Common Kernel at EL2 (2026 paper, p. 33). The paper notes the hypervisor's guaranteed isolation "means that critical apps (e.g., VPN clients, secure containers, cryptographic key stores) running in a pVM are inherently protected from malware or exploits targeting the main Android user space" (p. 33).

**Microdroid** - A minimal Android-based guest OS for running inside protected VMs (p. 34). The paper highlights its enterprise value for creating "highly secure, lightweight, and dedicated execution environments for specific enterprise components - like FIPS-validated cryptographic modules or proprietary app logic".

**VM Attestation** - Remote attestation lets a corporate server verify that a device's pVM is genuine, running valid components, and hasn't been tampered with (p. 35). The paper explicitly ties this to conditional access policies.

**Secretkeeper HAL** - Provides DICE Policy gated storage for VM secrets, ensuring rollback protection so that even if an attacker gains control of the main Android OS, they can't force the secure pVM back to an older, vulnerable version (p. 35).

**SESIP Level 5 certification** - The paper notes pKVM has recently achieved SESIP Level 5 certification (p. 36), described as the highest level of security assurance, meaning the system is resistant to attack by "highly skilled, well-funded, and knowledgeable adversaries."

### What this signals for the future

Reading between the lines, the 2026 paper suggests Android's security architecture is gradually evolving from:

```
hardware -> android -> apps
```

toward something more like:

```
hardware -> hypervisor -> protected VM -> android -> apps
```

That's a fundamentally different model. Enterprise security services could eventually run below Android itself, in hardware-isolated environments that remain trustworthy even if the OS is compromised.

This is closer to how confidential computing works in the cloud, and it's arguably the most strategically important change in Android security since SELinux enforcement was introduced.

## What all of this could mean for Android Enterprise

The paper doesn't consistently connect the dots explicitly, but there are several implications worth calling out for anyone working with managed Android devices:

**Advanced Protection as a managed policy.** Already mentioned above, if Google exposes Advanced Protection through AMAPI or Android Enterprise management APIs, it could dramatically simplify security baselines. Instead of configuring dozens of individual restrictions, admins could set a single high-security posture. The enterprise framing on page 14 suggests this might not be far away.

**OS-level behavioural protection.** The anti-scam protections that block risky actions during suspicious calls are described on page 15 as reducing "the risk of human error by building 'guardrails' directly into the OS." For enterprise, this means the platform itself is now defending against the social engineering attacks that currently bypass most EMM controls.

**Device-side conditional access.** Identity Check's location-aware authentication (p. 11) and the zero-trust framing (p. 13) suggest Android is starting to handle trust decisions that have traditionally lived in identity providers and EMM policies. That could eventually complement - or partially replace - server-side conditional access checks.

**Protected VMs for enterprise workloads.** The expanded virtualisation section (p. 32-36) positions pVMs as a home for enterprise credential vaults, cryptographic modules, and identity services. As this matures, the enterprise trust model no longer collapses when the OS is compromised.

## My take

The incremental improvements - scam protection, smart redaction, better theft detection - are useful, and they'll reduce real-world incidents. But they're evolutionary.

The two things that will shape the next few years of Android Enterprise are Advanced Protection potentially becoming an enterprise-manageable policy baseline, and the virtualisation architecture (pKVM + protected VMs) maturing into a production-grade enterprise isolation layer.

The virtualisation work in particular is worth paying close attention to. It's the kind of architectural change that tends to shape a platform for the next decade.

Those are the ones to watch.

*The Android Security Paper editions referenced: [2023](https://services.google.com/fh/files/misc/android-enterprise-security-paper-2023.pdf), [2024](https://services.google.com/fh/files/misc/android-security-paper-2024.pdf), [2026](https://services.google.com/fh/files/misc/2026_android_security_paper.pdf).*