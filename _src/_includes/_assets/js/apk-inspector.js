/*
 * APK inspector - bayton.org
 *
 * Reads an .apk entirely in the browser and surfaces the package name, signing
 * certificate details and the device-admin signature checksum used in custom
 * DPC provisioning QR codes. No data leaves the page.
 *
 * An APK is a ZIP. We:
 *   1. parse the ZIP central directory ourselves,
 *   2. inflate AndroidManifest.xml (a compiled binary-XML blob) and read it,
 *   3. walk the APK Signing Block (v2/v3) - or fall back to the v1 PKCS#7 in
 *      META-INF - to recover the signing certificate,
 *   4. hash that certificate with WebCrypto for the fingerprints/checksum.
 */
(function () {
  "use strict";

  var hasDom = typeof document !== "undefined";
  var fileInput = hasDom ? document.getElementById("apk_file") : null;
  var dropzone = hasDom ? document.getElementById("apk_dropzone") : null;
  var errorEl = hasDom ? document.getElementById("error_message") : null;
  var resultsEl = hasDom ? document.getElementById("apk_results") : null;
  var loadedEl = hasDom ? document.getElementById("apk_loaded") : null;
  var loadedNameEl = hasDom ? document.getElementById("apk_loaded_name") : null;
  var loadedMetaEl = hasDom ? document.getElementById("apk_loaded_meta") : null;
  var againBtn = hasDom ? document.getElementById("apk_inspect_another") : null;

  if (fileInput) {
    fileInput.addEventListener("change", function () {
      if (fileInput.files && fileInput.files[0]) startFile(fileInput.files[0]);
    });
  }

  // Drag & drop onto the dropzone, toggling the .apk-drag highlight.
  if (dropzone) {
    ["dragover", "dragenter"].forEach(function (ev) {
      dropzone.addEventListener(ev, function (e) {
        e.preventDefault();
        dropzone.classList.add("apk-drag");
      });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      dropzone.addEventListener(ev, function (e) {
        e.preventDefault();
        dropzone.classList.remove("apk-drag");
      });
    });
    dropzone.addEventListener("drop", function (e) {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        startFile(e.dataTransfer.files[0]);
      }
    });
  }

  // Swap the dropzone for the compact loaded-file bar, then inspect it.
  function startFile(file) {
    if (loadedNameEl) loadedNameEl.textContent = file.name;
    if (loadedMetaEl) loadedMetaEl.textContent = bytesH(file.size) + " · file loaded successfully";
    if (dropzone) dropzone.hidden = true;
    if (loadedEl) loadedEl.hidden = false;
    handleFile(file);
  }

  // "Inspect another": clear everything and return to the empty dropzone.
  if (againBtn) {
    againBtn.addEventListener("click", function () {
      if (loadedEl) loadedEl.hidden = true;
      if (dropzone) dropzone.hidden = false;
      if (resultsEl) resultsEl.innerHTML = "";
      if (errorEl) errorEl.textContent = "";
      if (fileInput) {
        fileInput.value = "";
        fileInput.click();
      }
    });
  }

  // Copy-to-clipboard via delegation; swaps the icon to a tick briefly.
  if (resultsEl) {
    resultsEl.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-copy]");
      if (!btn) return;
      navigator.clipboard.writeText(btn.getAttribute("data-copy")).then(function () {
        var icon = btn.querySelector(".material-symbols-outlined") || btn;
        var prev = icon.textContent;
        icon.textContent = "check";
        btn.classList.add("apk-copied");
        setTimeout(function () {
          icon.textContent = prev;
          btn.classList.remove("apk-copied");
        }, 1200);
      });
    });
  }

  function handleFile(file) {
    errorEl.textContent = "";
    resultsEl.innerHTML = '<p><span class="material-symbols-outlined">hourglass_top</span> Reading ' + esc(file.name) + "…</p>";

    file
      .arrayBuffer()
      .then(function (buf) {
        return inspect(file, new Uint8Array(buf));
      })
      .then(function (data) {
        render(data);
      })
      .catch(function (err) {
        resultsEl.innerHTML = "";
        errorEl.textContent = "Couldn't parse this file: " + (err && err.message ? err.message : err);
        if (window.console) console.error(err);
      });
  }

  /* ------------------------------------------------------------------ *
   * Top-level inspection
   * ------------------------------------------------------------------ */

  function inspect(file, bytes) {
    var central = readCentralDirectory(bytes);
    var entries = central.entries;

    var manifestEntry = entries["AndroidManifest.xml"];
    if (!manifestEntry) throw new Error("No AndroidManifest.xml. Is this really an APK?");

    var jobs = [];

    // File-level hashes.
    jobs.push(
      Promise.all([digest("SHA-256", bytes), digest("SHA-1", bytes)]).then(function (h) {
        return { fileSha256: hex(h[0]), fileSha1: hex(h[1]) };
      })
    );

    // Manifest.
    jobs.push(
      readEntry(bytes, manifestEntry).then(function (raw) {
        return { manifest: parseAxml(raw) };
      })
    );

    // Signing - needs the cert DER, then we hash it.
    jobs.push(resolveSigning(bytes, central, entries));

    return Promise.all(jobs).then(function (parts) {
      var out = {
        fileName: file.name,
        fileSize: bytes.length,
        abis: detectAbis(entries),
        dexCount: countMatching(entries, /^classes\d*\.dex$/),
        entryCount: Object.keys(entries).length
      };
      parts.forEach(function (p) {
        Object.assign(out, p);
      });
      return out;
    });
  }

  /* ------------------------------------------------------------------ *
   * ZIP central directory
   * ------------------------------------------------------------------ */

  function readCentralDirectory(bytes) {
    var dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

    // Find End Of Central Directory record (0x06054b50), scanning back over the
    // optional comment.
    var eocd = -1;
    var min = Math.max(0, bytes.length - 65557);
    for (var i = bytes.length - 22; i >= min; i--) {
      if (dv.getUint32(i, true) === 0x06054b50) {
        eocd = i;
        break;
      }
    }
    if (eocd < 0) throw new Error("Not a valid ZIP/APK (no end-of-directory record).");

    var cdOffset = dv.getUint32(eocd + 16, true);
    var cdSize = dv.getUint32(eocd + 12, true);

    var entries = {};
    var p = cdOffset;
    while (p < cdOffset + cdSize && dv.getUint32(p, true) === 0x02014b50) {
      var method = dv.getUint16(p + 10, true);
      var compSize = dv.getUint32(p + 20, true);
      var uncompSize = dv.getUint32(p + 24, true);
      var nameLen = dv.getUint16(p + 28, true);
      var extraLen = dv.getUint16(p + 30, true);
      var commentLen = dv.getUint16(p + 32, true);
      var localOffset = dv.getUint32(p + 42, true);
      var name = utf8(bytes.subarray(p + 46, p + 46 + nameLen));
      entries[name] = {
        name: name,
        method: method,
        compSize: compSize,
        uncompSize: uncompSize,
        localOffset: localOffset
      };
      p += 46 + nameLen + extraLen + commentLen;
    }

    return { entries: entries, cdOffset: cdOffset, cdSize: cdSize, dv: dv, bytes: bytes };
  }

  // Resolve a central-directory entry to its actual compressed bytes via the
  // local file header (whose extra field length can differ from the central one).
  function entryData(bytes, entry) {
    var dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    var off = entry.localOffset;
    if (dv.getUint32(off, true) !== 0x04034b50) throw new Error("Bad local header for " + entry.name);
    var nameLen = dv.getUint16(off + 26, true);
    var extraLen = dv.getUint16(off + 28, true);
    var start = off + 30 + nameLen + extraLen;
    return bytes.subarray(start, start + entry.compSize);
  }

  function readEntry(bytes, entry) {
    var data = entryData(bytes, entry);
    if (entry.method === 0) return Promise.resolve(data); // stored
    if (entry.method === 8) return inflateRaw(data); // deflate
    return Promise.reject(new Error("Unsupported compression method " + entry.method + " for " + entry.name));
  }

  function inflateRaw(bytes) {
    if (typeof DecompressionStream === "undefined") {
      return Promise.reject(new Error("This browser lacks DecompressionStream; try a recent Chrome/Firefox/Safari."));
    }
    var ds = new DecompressionStream("deflate-raw");
    var stream = new Blob([bytes]).stream().pipeThrough(ds);
    return new Response(stream).arrayBuffer().then(function (ab) {
      return new Uint8Array(ab);
    });
  }

  /* ------------------------------------------------------------------ *
   * Binary AndroidManifest.xml (AXML)
   * ------------------------------------------------------------------ */

  // Resource IDs for android: attributes whose name string may be empty.
  var ATTR_IDS = {
    0x0101021b: "versionCode",
    0x0101021c: "versionName",
    0x0101020c: "minSdkVersion",
    0x01010270: "targetSdkVersion",
    0x01010572: "compileSdkVersion",
    0x01010003: "name",
    0x0101000f: "debuggable",
    0x01010272: "testOnly"
  };

  function parseAxml(buf) {
    var dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    if (dv.getUint16(0, true) !== 0x0003) throw new Error("AndroidManifest.xml isn't compiled binary XML.");

    var pool = null;
    var resMap = [];
    var result = {
      package: null,
      versionCode: null,
      versionName: null,
      minSdk: null,
      targetSdk: null,
      compileSdk: null,
      platformBuildVersionName: null,
      split: null,
      debuggable: false,
      testOnly: false,
      permissions: [],
      features: []
    };

    var p = 8; // skip XML chunk header (type+headerSize+fileSize)
    while (p + 8 <= buf.length) {
      var type = dv.getUint16(p, true);
      var size = dv.getUint32(p + 4, true);
      if (size <= 0) break;

      if (type === 0x0001) {
        pool = parseStringPool(buf, dv, p);
      } else if (type === 0x0180) {
        var count = (size - 8) / 4;
        for (var r = 0; r < count; r++) resMap.push(dv.getUint32(p + 8 + r * 4, true));
      } else if (type === 0x0102) {
        readStartElement(buf, dv, p, pool, resMap, result);
      }
      p += size;
    }

    return result;
  }

  function readStartElement(buf, dv, p, pool, resMap, result) {
    // Start element: ...headerSize, lineNo(4), comment(4), ns(4), name(4),
    // attrStart(2), attrSize(2), attrCount(2), ...
    var nameIdx = dv.getInt32(p + 20, true);
    var elName = pool ? pool[nameIdx] : null;
    // attributeStart is relative to the attrExt struct, which begins at p+16
    // (right after the 16-byte node header).
    var attrStart = dv.getUint16(p + 24, true);
    var attrCount = dv.getUint16(p + 28, true);
    var base = p + 16 + attrStart;

    var attrs = {};
    for (var a = 0; a < attrCount; a++) {
      var o = base + a * 20;
      var aNameIdx = dv.getInt32(o + 4, true);
      var rawIdx = dv.getInt32(o + 8, true);
      var dataType = dv.getUint8(o + 15);
      var data = dv.getUint32(o + 16, true);

      var key = aNameIdx >= 0 && pool && pool[aNameIdx] ? pool[aNameIdx] : null;
      if (!key && aNameIdx >= 0 && resMap[aNameIdx] != null) key = ATTR_IDS[resMap[aNameIdx]] || null;
      if (!key) continue;

      attrs[key] = decodeValue(pool, rawIdx, dataType, data);
    }

    switch (elName) {
      case "manifest":
        result.package = attrs.package != null ? attrs.package : result.package;
        result.versionCode = attrs.versionCode != null ? attrs.versionCode : result.versionCode;
        result.versionName = attrs.versionName != null ? attrs.versionName : result.versionName;
        result.compileSdk = attrs.compileSdkVersion != null ? attrs.compileSdkVersion : result.compileSdk;
        result.platformBuildVersionName =
          attrs.platformBuildVersionName != null ? attrs.platformBuildVersionName : result.platformBuildVersionName;
        if (attrs.split != null) result.split = attrs.split;
        break;
      case "uses-sdk":
        if (attrs.minSdkVersion != null) result.minSdk = attrs.minSdkVersion;
        if (attrs.targetSdkVersion != null) result.targetSdk = attrs.targetSdkVersion;
        break;
      case "uses-permission":
      case "uses-permission-sdk-23":
        if (attrs.name != null && result.permissions.indexOf(attrs.name) < 0) result.permissions.push(attrs.name);
        break;
      case "uses-feature":
        if (attrs.name != null && result.features.indexOf(attrs.name) < 0) result.features.push(attrs.name);
        break;
      case "application":
        if (attrs.debuggable != null) result.debuggable = !!attrs.debuggable;
        if (attrs.testOnly != null) result.testOnly = !!attrs.testOnly;
        break;
    }
  }

  function decodeValue(pool, rawIdx, dataType, data) {
    if (rawIdx >= 0 && pool && pool[rawIdx] != null) return pool[rawIdx];
    switch (dataType) {
      case 0x03: // string
        return pool ? pool[data] : null;
      case 0x10: // int dec
        return data;
      case 0x11: // int hex
        return "0x" + (data >>> 0).toString(16);
      case 0x12: // boolean
        return data !== 0;
      default:
        return data;
    }
  }

  function parseStringPool(buf, dv, p) {
    var stringCount = dv.getUint32(p + 8, true);
    var flags = dv.getUint32(p + 16, true);
    var stringsStart = dv.getUint32(p + 20, true);
    var isUtf8 = (flags & 0x100) !== 0;
    var offsetsBase = p + 28;
    var dataBase = p + stringsStart;

    var strings = new Array(stringCount);
    for (var i = 0; i < stringCount; i++) {
      var so = dataBase + dv.getUint32(offsetsBase + i * 4, true);
      strings[i] = isUtf8 ? readUtf8String(buf, so) : readUtf16String(buf, dv, so);
    }
    return strings;
  }

  function readUtf16String(buf, dv, off) {
    var len = dv.getUint16(off, true);
    off += 2;
    if (len & 0x8000) {
      len = ((len & 0x7fff) << 16) | dv.getUint16(off, true);
      off += 2;
    }
    var out = "";
    for (var i = 0; i < len; i++) out += String.fromCharCode(dv.getUint16(off + i * 2, true));
    return out;
  }

  function readUtf8String(buf, off) {
    // Two length fields (char count, then byte count); each may be 1-2 bytes.
    var v = buf[off++];
    if (v & 0x80) {
      v = ((v & 0x7f) << 8) | buf[off++];
    }
    var byteLen = buf[off++];
    if (byteLen & 0x80) {
      byteLen = ((byteLen & 0x7f) << 8) | buf[off++];
    }
    return utf8(buf.subarray(off, off + byteLen));
  }

  /* ------------------------------------------------------------------ *
   * Signing: scheme detection, cert recovery, fingerprints
   * ------------------------------------------------------------------ */

  async function resolveSigning(bytes, central, entries) {
    var schemes = [];
    var block = readSigningBlock(bytes, central.cdOffset);
    var signers = [];

    if (block) {
      if (block.pairs[0x7109871a]) schemes.push("v2");
      if (block.pairs[0xf05368c0]) schemes.push("v3");
      if (block.pairs[0x1b93ad61]) schemes.push("v3.1");
      if (block.pairs[0x6dff800d] || block.pairs[0x2b09189e]) schemes.push("source stamp");

      // v3/v3.1 carry one signer per SDK range (this is how key rotation is
      // expressed). v2 has a single signer with no SDK range.
      signers = parseV3Signers(block.pairs[0x1b93ad61]).concat(parseV3Signers(block.pairs[0xf05368c0]));
      if (!signers.length) {
        var c2 = extractCertFromV2V3(block.pairs[0x7109871a]);
        if (c2) signers.push({ der: c2, minSdk: null, maxSdk: null });
      }
    }

    // v1 (JAR signing) - presence, and the cert from the META-INF PKCS#7 if we
    // still need one (v1-only / legacy apps).
    var v1 = await findV1Cert(bytes, entries);
    if (v1.present) schemes.unshift("v1");
    if (!signers.length && v1.der) signers.push({ der: v1.der, minSdk: null, maxSdk: null });

    if (!signers.length) return { schemes: schemes, cert: null };

    var distinct = dedupeSigners(signers);
    // Headline = the original signing key (lowest minSdk). Even when the key has
    // been rotated, the original is the stable identity used for the provisioning
    // checksum; the rotated key(s) are surfaced separately below.
    var primary = distinct.slice().sort(function (a, b) {
      return (a.minSdk == null ? -1 : a.minSdk) - (b.minSdk == null ? -1 : b.minSdk);
    })[0];

    var cert = await certInfo(primary.der);

    if (distinct.length > 1) {
      cert.rotation = [];
      for (var i = 0; i < distinct.length; i++) {
        var d = await digest("SHA-256", distinct[i].der);
        cert.rotation.push({
          sha256: colonHex(d),
          checksum: base64url(d),
          checksumStd: base64std(d),
          minSdk: distinct[i].minSdk,
          maxSdk: distinct[i].maxSdk
        });
      }
    }

    return { schemes: schemes, cert: cert };
  }

  async function certInfo(der) {
    var h = await Promise.all([digest("SHA-256", der), digest("SHA-1", der)]);
    var info = {};
    try {
      info = parseCertificate(der);
    } catch (e) {
      info = { parseError: e.message };
    }
    return Object.assign(info, {
      sha256: colonHex(h[0]),
      sha1: colonHex(h[1]),
      md5: colonHex(md5(der)),
      checksum: base64url(h[0]), // PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM (QR)
      checksumStd: base64std(h[0]) // standard base64, for AMAPI signingKeyCerts
    });
  }

  function dedupeSigners(list) {
    var out = [];
    list.forEach(function (s) {
      var dup = out.some(function (o) {
        if (o.der.length !== s.der.length) return false;
        for (var i = 0; i < o.der.length; i++) if (o.der[i] !== s.der[i]) return false;
        return true;
      });
      if (!dup) out.push(s);
    });
    return out;
  }

  function readSigningBlock(bytes, cdOffset) {
    if (cdOffset < 32) return null;
    var magic = utf8(bytes.subarray(cdOffset - 16, cdOffset));
    if (magic !== "APK Sig Block 42") return null;

    var dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    var sizeOfBlock = Number(dv.getBigUint64(cdOffset - 24, true));
    var blockStart = cdOffset - 8 - sizeOfBlock;
    if (blockStart < 0) return null;

    var pairs = {};
    var p = blockStart + 8;
    var end = cdOffset - 24; // start of the trailing size field
    while (p + 12 <= end) {
      var pairLen = Number(dv.getBigUint64(p, true));
      if (pairLen < 4 || p + 8 + pairLen > cdOffset) break;
      var id = dv.getUint32(p + 8, true) >>> 0;
      pairs[id] = bytes.subarray(p + 12, p + 8 + pairLen);
      p += 8 + pairLen;
    }
    return { pairs: pairs };
  }

  // v3/v3.1 block value (all lengths uint32 LE): a signers sequence where each
  //   signer -> signed data -> [digests][certificates][minSdk][maxSdk][attrs]
  // Returns every signer's leaf cert with its SDK range (key rotation = >1).
  function parseV3Signers(value) {
    if (!value) return [];
    var out = [];
    try {
      var dv = new DataView(value.buffer, value.byteOffset, value.byteLength);
      var u32 = function (o) {
        return dv.getUint32(o, true);
      };
      var p = 0;
      var signersEnd = 4 + u32(p);
      p += 4;
      while (p + 4 <= signersEnd) {
        var signerEnd = p + 4 + u32(p);
        p += 4;
        var q = p + 4; // into signed data (skip its length word)
        var digestsLen = u32(q);
        q += 4 + digestsLen;
        var certsEnd = q + 4 + u32(q);
        q += 4;
        var certLen = u32(q);
        q += 4;
        var der = value.subarray(q, q + certLen);
        q = certsEnd; // jump past all certs to minSdk/maxSdk
        out.push({ der: der, minSdk: u32(q), maxSdk: u32(q + 4) });
        p = signerEnd; // next signer
      }
    } catch (e) {
      /* malformed - return whatever parsed cleanly */
    }
    return out;
  }

  // v2 block value layout (all lengths uint32 LE):
  //   signers seq -> signer -> signed data -> [digests][certificates][...]
  // The first certificate in the first signer is the signing cert.
  function extractCertFromV2V3(value) {
    if (!value) return null;
    try {
      var dv = new DataView(value.buffer, value.byteOffset, value.byteLength);
      var p = 0;
      p += 4; // signers sequence length
      p += 4; // first signer length
      p += 4; // signed-data length
      var digestsLen = dv.getUint32(p, true);
      p += 4 + digestsLen; // skip digests
      p += 4; // certificates sequence length
      var certLen = dv.getUint32(p, true);
      p += 4;
      return value.subarray(p, p + certLen);
    } catch (e) {
      return null;
    }
  }

  async function findV1Cert(bytes, entries) {
    var sigName = null;
    Object.keys(entries).forEach(function (name) {
      if (/^META-INF\/.*\.(RSA|DSA|EC)$/i.test(name)) sigName = sigName || name;
    });
    if (!sigName) return { present: false, der: null };

    var der = null;
    try {
      der = extractCertFromPkcs7(await readEntry(bytes, entries[sigName]));
    } catch (e) {
      /* leave der null - presence is still reported */
    }
    return { present: true, der: der };
  }

  // PKCS#7 SignedData: ContentInfo SEQ { OID, [0] { SignedData SEQ { ...,
  // certificates [0] IMPLICIT (set of Certificate) } } }. Return the first cert.
  function extractCertFromPkcs7(der) {
    try {
      var explicit = children(der, tlv(der, 0)).find(function (k) {
        return k.tag === 0xa0;
      });
      if (!explicit) return null;
      var signedData = children(der, explicit)[0];
      var certs = children(der, signedData).find(function (k) {
        return k.tag === 0xa0; // certificates [0] IMPLICIT
      });
      if (!certs) return null;
      var first = children(der, certs)[0];
      return der.subarray(first.start, first.end);
    } catch (e) {
      return null;
    }
  }

  /* ------------------------------------------------------------------ *
   * Minimal ASN.1 / X.509
   * ------------------------------------------------------------------ */

  function tlv(bytes, off) {
    var tag = bytes[off];
    var len = bytes[off + 1];
    var hl = 2;
    if (len & 0x80) {
      var n = len & 0x7f;
      len = 0;
      for (var i = 0; i < n; i++) len = (len << 8) | bytes[off + 2 + i];
      hl = 2 + n;
    }
    return { tag: tag, start: off, hl: hl, len: len, content: off + hl, end: off + hl + len };
  }

  function children(bytes, node) {
    var out = [];
    var p = node.content;
    while (p < node.end) {
      var c = tlv(bytes, p);
      out.push(c);
      p = c.end;
    }
    return out;
  }

  var OIDS = {
    "2.5.4.3": "CN",
    "2.5.4.6": "C",
    "2.5.4.7": "L",
    "2.5.4.8": "ST",
    "2.5.4.10": "O",
    "2.5.4.11": "OU",
    "1.2.840.113549.1.1.4": "MD5withRSA",
    "1.2.840.113549.1.1.5": "SHA1withRSA",
    "1.2.840.113549.1.1.10": "RSASSA-PSS",
    "1.2.840.113549.1.1.11": "SHA256withRSA",
    "1.2.840.113549.1.1.12": "SHA384withRSA",
    "1.2.840.113549.1.1.13": "SHA512withRSA",
    "1.2.840.113549.1.1.1": "RSA",
    "1.2.840.10040.4.3": "SHA1withDSA",
    "1.2.840.10045.2.1": "EC",
    "1.2.840.10045.4.3.2": "SHA256withECDSA",
    "1.2.840.10045.4.3.3": "SHA384withECDSA",
    "1.2.840.10045.4.3.4": "SHA512withECDSA"
  };

  function parseCertificate(der) {
    var cert = tlv(der, 0); // Certificate SEQUENCE
    var top = children(der, cert);
    var tbs = top[0];
    var sigAlg = top[1];

    var tbsKids = children(der, tbs);
    var idx = 0;
    if (tbsKids[0].tag === 0xa0) idx = 1; // [0] version present
    var serial = tbsKids[idx];
    var issuer = tbsKids[idx + 2];
    var validity = tbsKids[idx + 3];
    var subject = tbsKids[idx + 4];
    var spki = tbsKids[idx + 5];

    var vKids = children(der, validity);

    var subjectStr = parseName(der, subject);
    return {
      subject: subjectStr,
      issuer: parseName(der, issuer),
      serial: hex(der.subarray(serial.content, serial.end)).replace(/^00/, ""),
      notBefore: parseTime(der, vKids[0]),
      notAfter: parseTime(der, vKids[1]),
      sigAlg: oidName(der, children(der, sigAlg)[0]),
      keyAlg: keyInfo(der, spki),
      isDebug: /(^|,)\s*CN=Android Debug(,|$)/.test(subjectStr),
      selfSigned: subjectStr === parseName(der, issuer)
    };
  }

  function parseName(der, node) {
    var parts = [];
    children(der, node).forEach(function (rdn) {
      children(der, rdn).forEach(function (atv) {
        var kids = children(der, atv);
        var key = OIDS[oid(der, kids[0])] || oid(der, kids[0]);
        var val = utf8(der.subarray(kids[1].content, kids[1].end));
        parts.push(key + "=" + val);
      });
    });
    return parts.join(", ");
  }

  function parseTime(der, node) {
    var s = utf8(der.subarray(node.content, node.end));
    // UTCTime YYMMDDHHMMSSZ or GeneralizedTime YYYYMMDDHHMMSSZ
    var m =
      node.tag === 0x17
        ? s.match(/^(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)?/)
        : s.match(/^(\d\d\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)?/);
    if (!m) return s;
    var yyyy = node.tag === 0x17 ? (Number(m[1]) >= 50 ? "19" : "20") + m[1] : m[1];
    return yyyy + "-" + m[2] + "-" + m[3] + " " + m[4] + ":" + m[5] + ":" + (m[6] || "00") + " UTC";
  }

  function keyInfo(der, spki) {
    var kids = children(der, spki);
    var algName = oidName(der, children(der, kids[0])[0]);
    var bits = "";
    try {
      var bitstr = kids[1];
      // BIT STRING content: first byte = unused bits, then the key.
      if (algName === "RSA") {
        var keyDer = der.subarray(bitstr.content + 1, bitstr.end);
        var seq = tlv(keyDer, 0);
        var modulus = children(keyDer, seq)[0];
        var mlen = modulus.len;
        // strip a possible leading 0x00 sign byte
        if (keyDer[modulus.content] === 0x00) mlen -= 1;
        bits = " " + mlen * 8 + "-bit";
      }
    } catch (e) {}
    return algName + bits;
  }

  function oid(der, node) {
    var b = der.subarray(node.content, node.end);
    var out = [Math.floor(b[0] / 40), b[0] % 40];
    var v = 0;
    for (var i = 1; i < b.length; i++) {
      v = (v << 7) | (b[i] & 0x7f);
      if (!(b[i] & 0x80)) {
        out.push(v);
        v = 0;
      }
    }
    return out.join(".");
  }

  function oidName(der, node) {
    var o = oid(der, node);
    return OIDS[o] || o;
  }

  /* ------------------------------------------------------------------ *
   * Render
   * ------------------------------------------------------------------ */

  function render(d) {
    var m = d.manifest || {};
    var c = d.cert;

    // Summary chips: signing state, schemes, SDK levels and any warning flags,
    // all lifted from the detail rows below so the headline reads at a glance.
    var chips = [];
    if ((d.schemes || []).length) {
      chips.push(chip("good", '<span class="material-symbols-outlined">check_circle</span>Signed'));
    } else {
      chips.push(chip("warn", '<span class="material-symbols-outlined">gpp_bad</span>Unsigned'));
    }
    (d.schemes || []).forEach(function (s) {
      chips.push(chip("good", esc(s)));
    });
    if (m.minSdk != null) chips.push(chip("info", '<span class="k">min</span> SDK ' + esc(String(m.minSdk))));
    if (m.targetSdk != null) chips.push(chip("info", '<span class="k">target</span> SDK ' + esc(String(m.targetSdk))));
    if (c && c.keyAlg != null) chips.push(chip("", esc(c.keyAlg)));
    if (c && c.isDebug) chips.push(chip("warn", '<span class="material-symbols-outlined">bug_report</span>debug cert'));
    else if (c) chips.push(chip("", "release cert"));
    if (m.debuggable) chips.push(chip("warn", "debuggable"));
    if (m.testOnly) chips.push(chip("warn", "testOnly"));

    var html = '<div class="apk-chips">' + chips.join("") + "</div>";
    html += '<div class="apk-grid">';

    // Package.
    var pkgRows = [
      ["Package name", m.package ? '<span class="apk-strong">' + codeCopy(m.package) + "</span>" : "n/a"],
      ["Version name", '<span class="apk-strong">' + val(m.versionName) + "</span>"],
      ["Version code", val(m.versionCode)],
      ["Min SDK", sdk(m.minSdk) + androidLabel(m.minSdk)],
      ["Target SDK", sdk(m.targetSdk) + androidLabel(m.targetSdk)],
      ["Compile SDK", val(m.compileSdk)]
    ];
    if (m.platformBuildVersionName) pkgRows.push(["Platform build", val(m.platformBuildVersionName)]);
    if (m.split) pkgRows.push(["Split", val(m.split)]);

    var flags = [];
    if (m.debuggable) flags.push('<span class="label label-orange">debuggable</span>');
    if (m.testOnly) flags.push('<span class="label label-orange">testOnly</span>');
    if (flags.length) pkgRows.push(["Flags", flags.join(" ")]);

    html += card("Package", "deployed_code", kv(pkgRows));

    // File / contents. (Kept beside Package so the two narrow cards pair up.)
    var fileRows = [
      ["File", esc(d.fileName) + " (" + bytesH(d.fileSize) + ")"],
      ["File SHA-256", codeCopy(d.fileSha256)],
      ["File SHA-1", codeCopy(d.fileSha1)],
      ["ABIs", d.abis.length ? esc(d.abis.join(", ")) : "None"],
      ["DEX files", String(d.dexCount)],
      ["Contents", String(d.entryCount) + " files"]
    ];
    html += card("File", "folder_zip", kv(fileRows));

    // Signing.
    var schemeBadges = (d.schemes || []).length
      ? d.schemes
          .map(function (s) {
            return '<span class="apk-chip apk-chip-good">' + esc(s) + "</span>";
          })
          .join(" ")
      : '<span class="apk-chip apk-chip-warn">none detected</span>';

    var signRows = [["Schemes", schemeBadges]];
    if (c) {
      signRows.push(["Cert SHA-256", codeCopy(c.sha256)]);
      if (c.checksumStd)
        signRows.push(["SHA-256 (base64, for AMAPI signingKeyCerts)", codeCopy(c.checksumStd)]);
      // The device-admin signature checksum: sits with the other cert encodings
      // rather than as a headline, since most APKs aren't for DPC provisioning.
      if (c.checksum)
        signRows.push([
          'SHA-256 (base64url) <a class="label label-orange" href="/qr-generator-dpc">custom DPC QR checksum</a>',
          codeCopy(c.checksum)
        ]);
      signRows.push(["Cert SHA-1", codeCopy(c.sha1)]);
      if (c.md5) signRows.push(["Cert MD5", codeCopy(c.md5)]);
      if (c.subject != null) signRows.push(["Subject", val(c.subject)]);
      if (c.issuer != null) signRows.push(["Issuer", val(c.issuer)]);
      if (c.serial != null) signRows.push(["Serial", "<code>" + esc(c.serial) + "</code>"]);
      if (c.notBefore != null) signRows.push(["Valid from", val(c.notBefore)]);
      if (c.notAfter != null) signRows.push(["Valid to", val(c.notAfter)]);
      if (c.keyAlg != null) signRows.push(["Key", val(c.keyAlg)]);
      if (c.sigAlg != null) signRows.push(["Signature", val(c.sigAlg)]);
      if (c.selfSigned) signRows.push(["Self-signed", "Yes"]);
      if (c.isDebug)
        signRows.push(["Heads up", '<span class="label label-orange">Android debug certificate</span>']);
      if (c.parseError)
        signRows.push(["Certificate", "Recovered, but couldn't fully decode (" + esc(c.parseError) + ")"]);
      if (c.rotation) {
        signRows.push([
          "Key rotation",
          "This APK uses signing key rotation. The custom DPC QR checksum above is the <b>original</b> key. For AMAPI <code>signingKeyCerts</code>, here is each signer's SHA-256 (base64) by SDK range:"
        ]);
        c.rotation.forEach(function (r) {
          signRows.push([sdkRange(r.minSdk, r.maxSdk), codeCopy(r.checksumStd)]);
        });
      }
    } else {
      signRows.push(["Certificate", "Could not recover a signing certificate."]);
    }

    html += card("Signing", "verified_user", kv(signRows), { wide: true });

    // Permissions.
    if (m.permissions && m.permissions.length) {
      var perms =
        '<ul class="apk-perms">' +
        m.permissions
          .map(function (p) {
            return "<li><code>" + esc(p) + "</code></li>";
          })
          .join("") +
        "</ul>";
      html += card("Permissions", "lock", perms, { wide: true, count: m.permissions.length });
    }

    html += "</div>"; // .apk-grid

    resultsEl.innerHTML = html;
  }

  // A titled card with a leading Material Symbols icon. opts: {wide, count}.
  function card(title, icon, body, opts) {
    opts = opts || {};
    var count = opts.count != null ? '<span class="apk-card-count">' + esc(String(opts.count)) + "</span>" : "";
    return (
      '<section class="apk-card' + (opts.wide ? " apk-card-wide" : "") + '">' +
      '<div class="apk-card-head">' +
      '<span class="apk-card-badge material-symbols-outlined" aria-hidden="true">' + icon + "</span>" +
      "<h2>" + title + "</h2>" + count +
      "</div>" +
      body +
      "</section>"
    );
  }

  // Key/value rows as a definition grid. Labels are trusted static markup;
  // values are already escaped/marked up by the caller.
  function kv(rows) {
    return (
      '<dl class="apk-kv">' +
      rows
        .map(function (r) {
          return '<div class="apk-row"><dt>' + r[0] + "</dt><dd>" + r[1] + "</dd></div>";
        })
        .join("") +
      "</dl>"
    );
  }

  function chip(kind, inner) {
    return '<span class="apk-chip' + (kind ? " apk-chip-" + kind : "") + '">' + inner + "</span>";
  }

  function codeCopy(text) {
    return (
      "<code>" +
      esc(text) +
      "</code>" +
      '<button type="button" class="apk-copy" data-copy="' +
      esc(text) +
      '" aria-label="Copy" title="Copy"><span class="material-symbols-outlined">content_copy</span></button>'
    );
  }

  function val(v) {
    return v == null || v === "" ? "n/a" : esc(String(v));
  }

  function sdk(v) {
    return v == null ? "n/a" : esc(String(v));
  }

  // Map an API level to the site's Android version pill (the same
  // .label label-green + android glyph markup used on the feature-requests
  // page), using the build-time map injected from _data/android_versions.json.
  // Additive: falls back to nothing (the raw level still shows) for unknown
  // levels or when run outside the page.
  function androidLabel(apiLevel) {
    if (apiLevel == null) return "";
    var map = typeof window !== "undefined" && window.APK_ANDROID_VERSIONS;
    var v = map ? map[String(apiLevel)] : null;
    if (!v || v.name == null) return "";
    var title = v.codename ? ' title="Android ' + esc(v.name) + " " + esc(v.codename) + '"' : "";
    return (
      ' <span class="label label-green"' + title +
      '><span class="material-symbols-outlined">android</span> ' + esc(v.name) + "</span>"
    );
  }

  function sdkRange(min, max) {
    if (min == null) return "Signer";
    if (max == null || max >= 2147483647) return "SDK " + min + "+";
    return "SDK " + min + " to " + max;
  }

  /* ------------------------------------------------------------------ *
   * Helpers
   * ------------------------------------------------------------------ */

  function detectAbis(entries) {
    var abis = {};
    Object.keys(entries).forEach(function (name) {
      var m = name.match(/^lib\/([^/]+)\//);
      if (m) abis[m[1]] = true;
    });
    return Object.keys(abis);
  }

  function countMatching(entries, re) {
    return Object.keys(entries).filter(function (n) {
      return re.test(n);
    }).length;
  }

  function digest(algo, bytes) {
    return crypto.subtle.digest(algo, bytes).then(function (ab) {
      return new Uint8Array(ab);
    });
  }

  // MD5 (RFC 1321) - not in WebCrypto, but still a commonly-requested cert
  // fingerprint (e.g. registering a signing key with third-party services).
  function md5(input) {
    var s = [
      7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14,
      20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6,
      10, 15, 21
    ];
    var K = new Int32Array(64);
    for (var t = 0; t < 64; t++) K[t] = (Math.floor(Math.abs(Math.sin(t + 1)) * 4294967296)) | 0;

    var a0 = 0x67452301, b0 = 0xefcdab89 | 0, c0 = 0x98badcfe | 0, d0 = 0x10325476;

    var lenBits = input.length * 8;
    var padded = ((input.length + 8) >> 6) + 1; // 64-byte blocks
    var msg = new Uint8Array(padded * 64);
    msg.set(input);
    msg[input.length] = 0x80;
    var ldv = new DataView(msg.buffer);
    ldv.setUint32(msg.length - 8, lenBits >>> 0, true);
    ldv.setUint32(msg.length - 4, Math.floor(lenBits / 4294967296) >>> 0, true);

    var dv = new DataView(msg.buffer);
    for (var off = 0; off < msg.length; off += 64) {
      var M = new Int32Array(16);
      for (var j = 0; j < 16; j++) M[j] = dv.getInt32(off + j * 4, true);
      var A = a0, B = b0, C = c0, D = d0;
      for (var k = 0; k < 64; k++) {
        var F, g;
        if (k < 16) { F = (B & C) | (~B & D); g = k; }
        else if (k < 32) { F = (D & B) | (~D & C); g = (5 * k + 1) % 16; }
        else if (k < 48) { F = B ^ C ^ D; g = (3 * k + 5) % 16; }
        else { F = C ^ (B | ~D); g = (7 * k) % 16; }
        F = (F + A + K[k] + M[g]) | 0;
        A = D; D = C; C = B;
        B = (B + (((F << s[k]) | (F >>> (32 - s[k]))) | 0)) | 0;
      }
      a0 = (a0 + A) | 0; b0 = (b0 + B) | 0; c0 = (c0 + C) | 0; d0 = (d0 + D) | 0;
    }
    var out = new Uint8Array(16);
    var odv = new DataView(out.buffer);
    odv.setInt32(0, a0, true);
    odv.setInt32(4, b0, true);
    odv.setInt32(8, c0, true);
    odv.setInt32(12, d0, true);
    return out;
  }

  function hex(bytes) {
    var s = "";
    for (var i = 0; i < bytes.length; i++) s += bytes[i].toString(16).padStart(2, "0");
    return s;
  }

  function colonHex(bytes) {
    var parts = [];
    for (var i = 0; i < bytes.length; i++) parts.push(bytes[i].toString(16).padStart(2, "0").toUpperCase());
    return parts.join(":");
  }

  function base64url(bytes) {
    return base64std(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function base64std(bytes) {
    var bin = "";
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }

  function utf8(bytes) {
    return new TextDecoder("utf-8").decode(bytes);
  }

  function bytesH(n) {
    if (n < 1024) return n + " B";
    var u = ["KB", "MB", "GB"];
    var i = -1;
    do {
      n /= 1024;
      i++;
    } while (n >= 1024 && i < u.length - 1);
    return n.toFixed(1) + " " + u[i];
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Exposed for Node-based tests; harmless in the browser (module is undefined).
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { inspect: inspect, parseAxml: parseAxml, parseCertificate: parseCertificate };
  }
})();
