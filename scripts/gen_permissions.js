// Refreshes _src/_data/android_permissions.json before a build.
//
// Source of truth is the AOSP platform manifest (frameworks/base/core/res/
// AndroidManifest.xml) for the latest production Android release, which defines
// every android.permission.* with its protectionLevel and group. We parse that
// into a name -> protectionLevel map (served at /api/permissions.json) plus a
// compact code map the APK inspector injects to classify permissions offline.
//
// Runs at build time (mirrors refresh:git-history). It is DEFENSIVE by design:
// on any failure (offline, AOSP moved, parse error) it keeps the committed JSON
// and exits 0, so a deploy is never broken by this. Refreshes at most once a
// week; permission levels only change with Android releases.

const fs = require("fs");
const path = require("path");

const OUT = path.resolve(__dirname, "../_src/_data/android_permissions.json");
const VERSIONS = path.resolve(__dirname, "../_src/_data/android_versions.json");
const MAX_AGE_DAYS = 7;
const TIMEOUT_MS = 30000;

function log(msg) {
  console.log("🔐 permissions: " + msg);
}

// Android versions newest-first, so we can follow the latest published AOSP
// release branch automatically and step back if the newest isn't cut yet.
// (We deliberately do NOT use the `main` branch: on the dev tip permissions are
// refactored across modules, so it holds FEWER defs than the release branches.)
function candidateVersions() {
  try {
    var data = JSON.parse(fs.readFileSync(VERSIONS, "utf8"));
    var seen = {};
    var out = (data.items || [])
      .filter(function (v) {
        return typeof v.apiLevel === "number" && /^\d+$/.test(String(v.version));
      })
      .sort(function (a, b) {
        return b.apiLevel - a.apiLevel;
      })
      .map(function (v) {
        return { version: String(v.version), apiLevel: v.apiLevel };
      })
      .filter(function (v) {
        return seen[v.version] ? false : (seen[v.version] = true);
      });
    if (out.length) return out;
  } catch (e) {
    /* fall through */
  }
  return [{ version: "17", apiLevel: 37 }, { version: "16", apiLevel: 36 }];
}

function isFresh() {
  try {
    var cur = JSON.parse(fs.readFileSync(OUT, "utf8"));
    if (!cur.lastReviewed) return false;
    var ageDays = (Date.now() - new Date(cur.lastReviewed + "T00:00:00Z").getTime()) / 86400000;
    return ageDays >= 0 && ageDays < MAX_AGE_DAYS;
  } catch (e) {
    return false;
  }
}

// Collapse a raw protectionLevel ("signature|privileged", "dangerous|instant")
// into a single code the inspector renders.
function code(level) {
  var parts = String(level || "").split("|");
  var base = parts[0];
  if (parts.indexOf("appop") >= 0) return "a"; // special / app-op
  if (base === "dangerous") return "d";
  if (base === "normal") return "n";
  if (base === "internal") return "i";
  if (base === "signature") return parts.indexOf("privileged") >= 0 ? "p" : "s";
  return "x"; // other/unknown base
}

function parsePermissions(xml) {
  var perms = {};
  // Only <permission ...> (the trailing space excludes <permission-group>/<tree>).
  var re = /<permission\s[\s\S]*?>/g;
  var m;
  while ((m = re.exec(xml))) {
    var block = m[0];
    var name = (block.match(/android:name="([^"]+)"/) || [])[1];
    var level = (block.match(/android:protectionLevel="([^"]*)"/) || [])[1];
    var label = (block.match(/android:label="@string\/([^"]+)"/) || [])[1];
    var desc = (block.match(/android:description="@string\/([^"]+)"/) || [])[1];
    if (!name) continue;
    perms[name] = {
      protectionLevel: level || "normal", // AOSP default when omitted is "normal"
      labelRef: label || null,
      descriptionRef: desc || null
    };
  }
  return perms;
}

// Clean a strings.xml value into plain text: drop xliff placeholder wrappers,
// unescape XML entities and \-escapes, strip surrounding quotes and collapse
// whitespace.
function cleanString(s) {
  return String(s)
    .replace(/<xliff:g[^>]*>/g, "")
    .replace(/<\/xliff:g>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, function (m, d) {
      return String.fromCharCode(Number(d));
    })
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, " ")
    .replace(/^"|"$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Extract permlab_/permdesc_ strings from core/res/res/values/strings.xml.
function parseStrings(xml) {
  var out = {};
  var re = /<string name="(perm(?:lab|desc)_[^"]+)"[^>]*>([\s\S]*?)<\/string>/g;
  var m;
  while ((m = re.exec(xml))) out[m[1]] = cleanString(m[2]);
  return out;
}

async function fetchAosp(branch, file) {
  var url =
    "https://android.googlesource.com/platform/frameworks/base/+/refs/heads/" +
    branch +
    "/" +
    file +
    "?format=TEXT";
  var ctrl = new AbortController();
  var timer = setTimeout(function () {
    ctrl.abort();
  }, TIMEOUT_MS);
  try {
    var res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error("HTTP " + res.status + " for " + file);
    var b64 = await res.text();
    return { xml: Buffer.from(b64, "base64").toString("utf8"), url: url };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  if (isFresh()) {
    log("cached copy is fresh (< " + MAX_AGE_DAYS + " days); skipping refresh.");
    return;
  }

  var candidates = candidateVersions();
  var lastErr = "no candidate versions";

  for (var i = 0; i < candidates.length; i++) {
    var target = candidates[i];
    var branch = "android" + target.version + "-release";
    try {
      var got = await fetchAosp(branch, "core/res/AndroidManifest.xml");
      var parsed = parsePermissions(got.xml);
      var names = Object.keys(parsed);
      if (names.length < 100) throw new Error("parsed only " + names.length + " permissions; looks wrong");

      // Official label/description text (only user-facing permissions have any).
      // Best-effort: if strings.xml can't be fetched we still ship the levels.
      var strings = {};
      var stringsUrl = null;
      try {
        var gotStrings = await fetchAosp(branch, "core/res/res/values/strings.xml");
        strings = parseStrings(gotStrings.xml);
        stringsUrl = gotStrings.url.replace("?format=TEXT", "");
      } catch (se) {
        log("strings.xml unavailable (" + se.message + "); shipping levels without text.");
      }

      var permissions = {};
      var inspectorMap = {};
      var inspectorText = {};
      var textCount = 0;
      names.forEach(function (n) {
        var p = parsed[n];
        var label = p.labelRef && strings[p.labelRef] ? strings[p.labelRef] : null;
        var desc = p.descriptionRef && strings[p.descriptionRef] ? strings[p.descriptionRef] : null;
        permissions[n] = { protectionLevel: p.protectionLevel, label: label, description: desc };
        var short = n.indexOf("android.permission.") === 0 ? n.slice("android.permission.".length) : n;
        inspectorMap[short] = code(p.protectionLevel);
        var text = desc || label;
        if (text) {
          inspectorText[short] = text;
          textCount++;
        }
      });

      var out = {
        description:
          "Android platform permissions parsed from the AOSP platform manifest for the latest " +
          "published release branch, with each permission's protection level and (where Android " +
          "defines one) its official user-facing label and description from the platform " +
          "strings. Maintained for the bayton.org APK inspector and provided as a stable API. " +
          "inspectorMap collapses each protectionLevel to a single code (d=dangerous, n=normal, " +
          "s=signature, p=signature|privileged, i=internal, a=appop, x=other); inspectorText " +
          "carries the official description (or label) where one exists.",
        lastReviewed: new Date().toISOString().slice(0, 10),
        androidVersion: target.version,
        apiLevel: target.apiLevel,
        source: got.url.replace("?format=TEXT", ""),
        stringsSource: stringsUrl,
        count: names.length,
        permissions: permissions,
        inspectorMap: inspectorMap,
        inspectorText: inspectorText
      };
      fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
      log(
        "wrote " + names.length + " permissions (" + textCount + " with official text) from " +
        branch + " (Android " + target.version + ")."
      );
      return;
    } catch (e) {
      lastErr = e.message;
      log(branch + " unavailable (" + e.message + "); trying an older release branch.");
    }
  }

  // Every candidate failed (offline, or no release branch published).
  if (fs.existsSync(OUT)) {
    log("refresh failed (" + lastErr + "); keeping committed copy.");
  } else {
    log("refresh failed (" + lastErr + ") and no committed copy exists; inspector will skip classification.");
    fs.writeFileSync(
      OUT,
      JSON.stringify(
        { description: "unavailable at build time", lastReviewed: null, permissions: {}, inspectorMap: {}, inspectorText: {} },
        null,
        2
      ) + "\n"
    );
  }
}

main().catch(function (e) {
  log("unexpected error: " + (e && e.message ? e.message : e) + "; build continues.");
  process.exit(0);
});
