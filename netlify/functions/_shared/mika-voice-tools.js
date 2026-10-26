const { tools: sysappsTools, systemAppRules } = require('./mika-sysapps-tools');
// Public Realtime contract. Keep original documentation/external tools unchanged.
const tools = [
{
  "type": "function",
  "name": "search_bayton",
  "description": "Search bayton.org documentation for Android Enterprise content, guides, and resources.",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "The search query"
      }
    },
    "required": [
      "query"
    ]
  }
},
...sysappsTools,
{
  "type": "function",
  "name": "fetch_url",
  "description": "LAST RESORT ONLY. Fetch content from an external Android documentation URL. ONLY use this AFTER search_bayton returned no useful results. Allowed domains: developer.android.com, source.android.com, androidenterprise.community. Returns plain text content from the page.",
  "parameters": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "description": "The full URL to fetch (must be on an allowed domain)"
      }
    },
    "required": [
      "url"
    ]
  }
}];
module.exports = { tools, systemAppRules };
