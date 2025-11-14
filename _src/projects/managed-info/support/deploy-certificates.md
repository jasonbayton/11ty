---
title: Deploy certificates with MANAGED INFO
parent: MANAGED INFO support
published: '2024-11-14'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Info'
    - 'bayton-projects'
categories: 
    - Managed Info Features
layout: base.njk
eleventyNavigation: 
    order: 9
    title: Deploy certificates
---

MANAGED INFO includes a built-in **certificate manager** enabled through the delegated **CERT_INSTALL** scope.  

Administrators configure certificates in managed configuration; MANAGED INFO performs installation, validation, updates, and removals.

## How MANAGED INFO manages certificate deployment

The certificate manager treats the managed configuration as the **source of truth** for which certificates should exist on a device.

On each run (config change or scheduled reconcile), MANAGED INFO:

1. Reads certificate entries from managed configuration.
2. Validates certificate format (DER/base64), type, and optional SHA‑256 fingerprint.
3. Stages & installs the certificate
4. Maintains an internal index to avoid unnecessary reinstalls.
5. Attempts to remove certificates no longer present in configuration (where supported).

No user interaction is required.

**Note: MANAGED INFO does not _today_ support certificate selection. This should be configured through the EMM (AMAPI supports private key rules for this). Please get in touch if assigning certificates to applications via MANAGED INFO would be advantageous.**

## AMAPI policy requirements

Your AMAPI policy must:

1. Install MANAGED INFO on the device.
2. Grant the delegated **CERT_INSTALL** scope:
   ```json
   "delegatedScopes": ["CERT_INSTALL"]
   ```
3. Provide MANAGED INFO’s signing certificate fingerprint:
   ```json
   "signingKeyCerts": [
     { "signingKeyCertFingerprintSha256": "<base64 SHA‑256>" }
   ]
   ```
4. Optionally include certificate configuration in `managedConfiguration`.

### Example policy structure

```json
{
  "applications": [
    {
      "packageName": "org.bayton.managedinfo",
      "installType": "REQUIRED_FOR_SETUP",
      "defaultPermissionPolicy": "GRANT",

      "delegatedScopes": [
        "CERT_INSTALL"
      ],

      "signingKeyCerts": [
        {
          "signingKeyCertFingerprintSha256": "<base64 SHA-256 of MANAGED INFO signing cert>"
        }
      ],

      "managedConfiguration": {
        "certificate_management_enabled": true,
        "certificate_management_reinstall_if_changed": true,
        "certificate_management_uninstall_if_missing": true,

        "certificate_management_certificates": [
          {
            "certificate_management_certificate": {
              "certificate_type": "ca",
              "certificate_url": "https://example.org/certs/rootCA.der",
              "certificate_sha256": "aabbccddeeff112233...",
              "certificate_payload": "",
              "certificate_alias": "",
              "certificate_password": ""
            }
          },
          {
            "certificate_management_certificate": {
              "certificate_type": "p12",
              "certificate_url": "",
              "certificate_payload": "<base64-PKCS12-here>",
              "certificate_sha256": "ddee1122aabb3344...",
              "certificate_alias": "vpn-client",
              "certificate_password": "SuperSecretPassword"
            }
          }
        ]
      }
    }
  ]
}
```

If your EMM supports certificate input directly in its managed configuration UI, prefer that method.

## MANAGED INFO certificate configuration

Certificates are defined in the `certificate_management_certificates` bundle_array.  

Each element represents a single certificate entry and supports the following keys:

**certificate_type**

Defines certificate format:
- `ca` – CA or intermediate CA certificate (DER/PEM)
- `p12` – PKCS#12 container containing a client certificate (and optionally key + chain)

(Note: MANAGED INFO internally uses `ca` and `p12` as literal values.)

**certificate_url**

HTTPS URL pointing to the certificate file. The URL must be accessible to MANAGED INFO. If that isn't possible, consider certificate_payload instead.

**certificate_payload**

Direct certificate content as **base64** or **hex**. Must contain the full DER or PKCS#12 binary payload. Keep in mind this will make the managed configuration significantly larger; please ensure the EMM can support it.

**Note: at least one of `certificate_url` or `certificate_payload` must be supplied, preferably not both. Payload takes precedence over URL.**

**certificate_sha256**

Expected SHA‑256 checksum used for integrity validation. Accepts hex (with or without colons) or base64.

**certificate_alias**

Alias for PKCS#12 key selection. Required only when `certificate_type = "p12"`.

**certificate_password**

Password for PKCS#12 content (if required). Applies only to `p12` entries.

## What MANAGED INFO does with your configuration

For each certificate:

1. Decodes and validates base64.
2. Calculates SHA‑256 if not provided.
3. Compares against its internal certificate index.
4. Installs the certificate only if:
   - it's new  
   - it has changed  
   - its fingerprint differs  
5. Stores status:
   - **SUCCESS**
   - **FAILURE** (with message)
   - **PENDING** (initial state before API response)

If install succeeds, the entry’s fingerprint is updated in the index.

## Removing certificates

When a certificate is removed from managed configuration:

- If previously installed via MANAGED INFO:
  - MANAGED INFO attempts to remove it.
  - If removal succeeds → the entry is removed from the index.
  - If the platform or OEM does **not** actually remove the certificate, MANAGED INFO still clears its own tracking state, but the certificate may remain present on the device.
- If a certificate is manually removed while it is still defined in managed configuration:
  - MANAGED INFO will treat this as drift and will attempt to reinstall the certificate on the next run.
- If a certificate is manually removed *after* being removed from managed configuration:
  - MANAGED INFO will remove its internal tracking during the next run (if uninstall‑when‑missing is enabled).

This protects against accidental certificate loss that could break Wi‑Fi, VPN, or app trust chains.

## Typical configuration examples

**Install a single certificate**

```json
certificate_management_certificates: [
  {
    "certificate_management_certificate": {
      "certificate_type": "ca",
      "certificate_url": "https://example.org/certs/rootCA.der",
      "certificate_payload": "",
      "certificate_sha256": "A1B2C3D4E5F6...",
      "certificate_alias": "",
      "certificate_password": ""
    }
  }
]
```

**Client + CA pair**

```json
certificate_management_certificates: [
  {
    "certificate_management_certificate": {
      "certificate_type": "p12",
      "certificate_url": "",
      "certificate_payload": "<base64 PKCS12>",
      "certificate_sha256": "1122AABBCCDDEE...",
      "certificate_alias": "vpn-client",
      "certificate_password": "SuperSecretPassword"
    }
  },
  {
    "certificate_management_certificate": {
      "certificate_type": "ca",
      "certificate_url": "https://example.org/certs/vpnCA.der",
      "certificate_payload": "",
      "certificate_sha256": "FFEEDDCCBBAA...",
      "certificate_alias": "",
      "certificate_password": ""
    }
  }
]
```

**Remove a certificate**

Remove the entry from managed configuration.  

MANAGED INFO will:
- detect it  
- attempt removal (if uninstall‑when‑missing is enabled)  
- clear its internal tracking even if the OEM does not fully remove the certificate  

## Troubleshooting

**Certificate fails to install**

Check:
- base64 validity  
- PEM header/footer removed  
- correct delegatedScopes in policy  
- OEM does not block certificate installation  
- device supports certificate installation via CERT_INSTALL

**Fingerprint mismatch**

Often caused by:
- copying PEM incorrectly  
- whitespace/newline issues  
- reissued certificate  
- uploading wrong file

**All certificates (previously deployed) are removed**

Did you disable certificate management in managed config? That would be the only reason - unless all certs were manually removed - that MANAGED INFO would remove certificates.

In order to maintain certificates on the device, certificate management must be enabled. If there's a use case/requirement to change this behaviour, please get in touch.