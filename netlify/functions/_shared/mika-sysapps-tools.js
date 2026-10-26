// Shared read-only system-app schemas for website, native and voice clients.
const tools = [
  {
    "type": "function",
    "name": "sysapps_get_package",
    "description": "Read declared package intelligence and curated guidance for an exact package returned by sysapps_search. Optional labels/seen_on collection pages preserve full totals. Missing intelligence is not a safety verdict.",
    "parameters": {
      "type": "object",
      "properties": {
        "package_name": {
          "type": "string",
          "description": "Exact package name from a system-app search result."
        },
        "collection": {
          "type": "string",
          "enum": [
            "labels",
            "seen_on"
          ],
          "description": "Optional paged subresource. Omit to read guidance and intelligence."
        },
        "limit": {
          "type": "integer",
          "minimum": 1,
          "maximum": 100,
          "description": "Requires collection. Rows per labels or seen_on page; omit for full package detail."
        },
        "offset": {
          "type": "integer",
          "minimum": 0,
          "description": "Requires collection. Follow pagination.next_offset; omit for full package detail."
        }
      },
      "required": [
        "package_name"
      ]
    }
  },
  {
    "type": "function",
    "name": "sysapps_search",
    "description": "Search the bayton.org Android system app database by package name, app name, or alias. Use this when users ask about system apps, bloatware, pre-installed apps, or specific package names.",
    "parameters": {
      "type": "object",
      "properties": {
        "limit": {
          "type": "integer",
          "minimum": 1,
          "maximum": 100,
          "description": "Rows per page. Use a smaller page when context is truncated."
        },
        "offset": {
          "type": "integer",
          "minimum": 0,
          "description": "Start offset. Follow returned continuation; different requests are not a frozen export."
        },
        "query": {
          "type": "string",
          "description": "Package name, app name, or keyword. For a named OEM or model, include filters in the same query, e.g. \"oem:Oukitel label:camera\" or \"model:WP60 label:camera\". Results describe observed packages, not a safety verdict; device counts are global, not counts for the selected OEM."
        }
      },
      "required": [
        "query"
      ]
    }
  },
  {
    "type": "function",
    "name": "sysapps_list_devices",
    "description": "List devices available in the system app database. Optionally filter by OEM make, model, or OS version.",
    "parameters": {
      "type": "object",
      "properties": {
        "limit": {
          "type": "integer",
          "minimum": 1,
          "maximum": 100,
          "description": "Rows per page. Use a smaller page when context is truncated."
        },
        "offset": {
          "type": "integer",
          "minimum": 0,
          "description": "Start offset. Follow returned continuation; different requests are not a frozen export."
        },
        "make": {
          "type": "string",
          "description": "OEM filter e.g. \"Samsung\", \"Google\", \"Xiaomi\""
        },
        "model": {
          "type": "string",
          "description": "Model filter e.g. \"SM-S926B\", \"Pixel 8\""
        },
        "os": {
          "type": "string",
          "description": "Android API level filter, e.g. \"34\" for Android 14 or \"35\" for Android 15"
        }
      }
    }
  },
  {
    "type": "function",
    "name": "sysapps_get_device_apps",
    "description": "Get a bounded page of the system app list for a specific device (requires exact make, model, and OS). Use sysapps_list_devices first to find exact values.",
    "parameters": {
      "type": "object",
      "properties": {
        "limit": {
          "type": "integer",
          "minimum": 1,
          "maximum": 100,
          "description": "Rows per page. Use a smaller page when context is truncated."
        },
        "offset": {
          "type": "integer",
          "minimum": 0,
          "description": "Start offset. Follow returned continuation; different requests are not a frozen export."
        },
        "make": {
          "type": "string",
          "description": "OEM name (exact match)"
        },
        "model": {
          "type": "string",
          "description": "Device model (exact match)"
        },
        "os": {
          "type": "string",
          "description": "Android API level from sysapps_list_devices (exact match)"
        }
      },
      "required": [
        "make",
        "model",
        "os"
      ]
    }
  },
  {
    "type": "function",
    "name": "sysapps_compare_devices",
    "description": "Compare observed packages on two exact device/API-level records. Use sysapps_list_devices to obtain both exact tuples, preferably in the same round. If a model or API level is ambiguous, ask the user to choose; never silently select a representative device. For apps on A absent from B, set left=A and right=B and use left_only. Results are a contributed sample, not universal device coverage. Lists may be explicitly truncated; never claim those are complete inventories.",
    "parameters": {
      "type": "object",
      "properties": {
        "diff_limit": {
          "type": "integer",
          "minimum": 1,
          "maximum": 100,
          "description": "Rows per selected section (default 50). Use smaller pages if context is truncated."
        },
        "diff_offset": {
          "type": "integer",
          "minimum": 0,
          "description": "Offset from pagination.next_offset or a context continuation. Do not combine with diff_after."
        },
        "diff_section": {
          "type": "string",
          "enum": [
            "all",
            "shared",
            "left_only",
            "right_only"
          ],
          "description": "Select only needed rows. Empty unrequested lists are not evidence of no matches."
        },
        "diff_after": {
          "type": "string",
          "description": "Package-name cursor for a specific section. Start with empty string, then use next_after. Do not combine with diff_offset."
        },
        "left_make": {
          "type": "string",
          "description": "Exact left OEM from sysapps_list_devices"
        },
        "left_model": {
          "type": "string",
          "description": "Exact left model from sysapps_list_devices"
        },
        "left_os": {
          "type": "string",
          "description": "Exact left Android API level from sysapps_list_devices"
        },
        "right_make": {
          "type": "string",
          "description": "Exact right OEM from sysapps_list_devices"
        },
        "right_model": {
          "type": "string",
          "description": "Exact right model from sysapps_list_devices"
        },
        "right_os": {
          "type": "string",
          "description": "Exact right Android API level from sysapps_list_devices"
        }
      },
      "required": [
        "left_make",
        "left_model",
        "left_os",
        "right_make",
        "right_model",
        "right_os"
      ]
    }
  }
];
const systemAppRules = "SYSTEM APP EVIDENCE RULES:\n- When using successful system-app tool evidence, cite https://sysapps.bayton.org/ unless the result supplies a more specific comparison_url or package_url; do not invent a package URL.\n- Tool pages are bounded evidence, not complete inventories. Follow returned pagination or per-section continuations only within the existing lookup budget. If context_omissions or context_truncated is present, disclose missing evidence; never infer omitted content.\n- os_api is an Android API level, not a marketing Android version. Use \"API level\" with the returned value; for example, os_api 37 means \"API level 37\", not \"Android 37\". If a marketing version is not established by retrieved evidence, use the API level verbatim.\n- Before comparing devices, the user must identify the reference model when several models match. \"A Google Pixel\" is ambiguous: ask which Pixel model and version; do not choose a representative model yourself, even if you name it in the answer. If multiple API levels exist for the selected model, ask which record/version to compare.\n- Compare only the exact contributed device records, not all devices or software builds. Explain any explicitly truncated result and never describe a partial list as a complete inventory.\n- For device comparison answers, state the exact records and total counts, show at most ten package examples, and link comparison_url when provided. Do not attempt to reproduce an entire returned inventory in the chat response.\n- Search result order and global device counts do not establish frequency within a selected OEM. Describe observed matches without claiming \"most common\" or \"most commonly\".";
module.exports = { tools, systemAppRules };
