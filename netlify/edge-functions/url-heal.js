/**
 * Netlify Edge Function: URL Healing
 *
 * Strips stray punctuation from URL path segments and issues a 301 redirect
 * to the cleaned URL. Handles common copy-paste errors such as trailing
 * quotes, brackets, or other non-slug characters appended to a URL.
 *
 * Runs before redirects and static file serving, so it transparently fixes
 * the path before Netlify resolves it. The client-side 404 page contains a
 * matching fallback for any edge cases that slip through.
 */

// Characters that are never part of a valid URL slug on this site.
// Stripped from the start and end of each path segment.
// Kept in sync with sanitizePathSegment() in 404.md.
const JUNK_RE =
  /^[`'"\u201C\u201D\u2018\u2019.,;:!?()[\]{}<>]+|[`'"\u201C\u201D\u2018\u2019.,;:!?()[\]{}<>]+$/g;

export default async (request, context) => {
  const url = new URL(request.url);
  const originalPath = url.pathname;

  // Skip paths that should never be healed.
  if (
    originalPath.startsWith('/.netlify/') ||
    originalPath.startsWith('/api/') ||
    originalPath.startsWith('/mcp') ||
    /\.\w{2,5}$/.test(originalPath)
  ) {
    return context.next();
  }

  // Decode percent-encoded characters so punctuation is visible for stripping.
  let decoded;
  try {
    decoded = decodeURIComponent(originalPath);
  } catch {
    decoded = originalPath;
  }

  // Walk each segment and strip junk punctuation from both ends.
  const parts = decoded.split('/');
  let changed = false;

  for (let i = 0; i < parts.length; i++) {
    if (!parts[i]) continue;
    const clean = parts[i].replace(JUNK_RE, '');
    if (clean !== parts[i]) {
      parts[i] = clean;
      changed = true;
    }
  }

  if (!changed) {
    // Even without junk, ensure trailing slash for pretty-URL resolution.
    if (originalPath !== '/' && !originalPath.endsWith('/')) {
      url.pathname = originalPath + '/';
      return new Response(null, {
        status: 301,
        headers: { Location: url.toString() },
      });
    }
    return context.next();
  }

  // Rebuild the path, dropping segments that were entirely junk.
  let healedPath = '/' + parts.filter(Boolean).join('/');

  // Add trailing slash to match the site's pretty-URL convention so Netlify
  // can resolve the path in a single hop rather than issuing a second
  // trailing-slash redirect.
  if (healedPath !== '/' && !healedPath.endsWith('/')) {
    healedPath += '/';
  }

  url.pathname = healedPath;

  return new Response(null, {
    status: 301,
    headers: { Location: url.toString() },
  });
};

export const config = { path: '/*' };
