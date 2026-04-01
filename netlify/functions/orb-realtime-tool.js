/**
 * Netlify Function: Execute tools for the Orb Realtime API session.
 * Handles search_bayton (MCP content search) and save_question (Directus logging).
 */

const {
  jsonResponse,
  noContentResponse,
  loadSearchView,
  searchDocs,
  extractKeywords,
} = require('./_shared/content-index');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return noContentResponse();
  }
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method must be POST' });
  }

  try {
    const { tool_name, arguments: args } = JSON.parse(event.body || '{}');

    if (tool_name === 'search_bayton') {
      const query = args?.query || '';
      if (!query) {
        return jsonResponse(200, { result: 'No query provided.', sources: [] });
      }

      const searchableDocs = await loadSearchView();

      // Try the query as-is first
      let { results } = searchDocs(searchableDocs, query, 20);

      // If too few results, retry with keyword pairs and individual keywords
      if (results.length < 3) {
        const keywords = extractKeywords(query);
        if (keywords.length > 0) {
          const seenUrls = new Set(results.map(r => r.url));
          const addResults = (res) => {
            for (const r of res) {
              if (!seenUrls.has(r.url)) {
                seenUrls.add(r.url);
                results.push(r);
              }
            }
          };
          // Adjacent keyword pairs first (catches "zero touch" → "zero-touch")
          for (let i = 0; i < keywords.length - 1; i++) {
            addResults(searchDocs(searchableDocs, keywords[i] + ' ' + keywords[i + 1], 5).results);
          }
          // Individual keywords
          for (const kw of keywords) {
            addResults(searchDocs(searchableDocs, kw, 5).results);
          }
        }
      }

      const formatted = results.slice(0, 12).map((r, i) =>
        `[${i + 1}] "${r.title}" — https://bayton.org${r.url}\n${r.snippet || '(no snippet)'}`
      ).join('\n\n');

      const sources = results.slice(0, 6).map(r => ({
        title: r.title,
        url: 'https://bayton.org' + r.url,
      }));

      return jsonResponse(200, {
        result: formatted || 'No results found on bayton.org for this query.',
        sources,
      });
    }

    if (tool_name === 'save_question') {
      const question = args?.question || '';
      const answer = args?.answer || '';
      if (!question || question.length < 5) {
        return jsonResponse(200, { result: 'Question too short, skipped.' });
      }

      const directusKey = process.env.ORB_DIRECTUS_API_KEY;
      if (!directusKey) {
        console.warn('[save_question] No ORB_DIRECTUS_API_KEY set');
        return jsonResponse(200, { result: 'Saved.' });
      }

      const authHeaders = {
        Authorization: `Bearer ${directusKey}`,
        'Content-Type': 'application/json',
      };

      try {
        // Check if question already exists
        const checkRes = await fetch(
          `https://ping.bayton.org/items/orb_questions?filter[question][_ieq]=${encodeURIComponent(question)}&limit=1`,
          { headers: authHeaders }
        );
        if (!checkRes.ok) {
          console.error('[save_question] Directus check failed:', checkRes.status, await checkRes.text());
          return jsonResponse(200, { result: 'Save failed.' });
        }
        const checkData = await checkRes.json();
        const existing = checkData.data?.[0];

        if (existing) {
          const patch = { count: (existing.count || 1) + 1 };
          if (answer) patch.answer = answer;
          const patchRes = await fetch(`https://ping.bayton.org/items/orb_questions/${existing.id}`, {
            method: 'PATCH',
            headers: authHeaders,
            body: JSON.stringify(patch),
          });
          if (!patchRes.ok) console.error('[save_question] PATCH failed:', patchRes.status);
        } else {
          const postRes = await fetch('https://ping.bayton.org/items/orb_questions', {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify({ question, answer: answer || '', count: 1 }),
          });
          if (!postRes.ok) console.error('[save_question] POST failed:', postRes.status, await postRes.text());
        }
      } catch (e) {
        console.error('Directus save failed:', e);
      }

      return jsonResponse(200, { result: 'Question saved.' });
    }

    if (tool_name === 'fetch_url') {
      const url = args?.url || '';
      const ALLOWED = ['developer.android.com', 'source.android.com', 'androidenterprise.community'];
      let parsed;
      try { parsed = new URL(url); } catch { return jsonResponse(200, { result: 'Invalid URL.', sources: [] }); }

      if (!ALLOWED.includes(parsed.hostname)) {
        return jsonResponse(200, { result: `Domain not allowed. Only: ${ALLOWED.join(', ')}`, sources: [] });
      }

      try {
        const res = await fetch(url, {
          headers: { 'User-Agent': 'BaytonOrb/1.0', Accept: 'text/html' },
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) return jsonResponse(200, { result: `Fetch failed: HTTP ${res.status}`, sources: [] });

        const html = await res.text();
        const text = html
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
          .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
          .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
          .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/&[a-z]+;/gi, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 4000);

        return jsonResponse(200, {
          result: text || 'Page had no extractable text content.',
          sources: [{ title: parsed.hostname + parsed.pathname, url }],
        });
      } catch (e) {
        return jsonResponse(200, { result: `Fetch error: ${e.message || 'timeout'}`, sources: [] });
      }
    }

    return jsonResponse(200, { result: `Unknown tool: ${tool_name}` });
  } catch (err) {
    console.error('orb-realtime-tool error:', err);
    return jsonResponse(500, { error: 'Tool execution failed' });
  }
};
