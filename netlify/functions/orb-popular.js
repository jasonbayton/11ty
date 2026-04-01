/**
 * Netlify Function: Orb popular questions via Directus.
 *
 * GET → returns a random selection from the most-asked questions
 */

const DIRECTUS_URL = 'https://ping.bayton.org';

function headers() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };
}

function jsonRes(statusCode, body) {
  return {
    statusCode,
    headers: { ...headers(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: headers(), body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return jsonRes(405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.ORB_DIRECTUS_API_KEY;
  if (!apiKey) {
    return jsonRes(200, { questions: [] });
  }

  try {
    // Fetch top 15 questions by count, then randomly pick 5
    const res = await fetch(
      `${DIRECTUS_URL}/items/orb_questions?sort[]=-count&limit=15&fields[]=question`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      console.error('Directus GET failed:', res.status);
      return jsonRes(200, { questions: [] });
    }

    const data = await res.json();
    const all = (data.data || []).map(item => item.question);

    // Shuffle and pick 5
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }

    return jsonRes(200, { questions: all.slice(0, 5) });
  } catch (err) {
    console.error('orb-popular error:', err);
    return jsonRes(200, { questions: [] });
  }
};
