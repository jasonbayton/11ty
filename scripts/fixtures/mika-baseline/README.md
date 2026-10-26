# Frozen MIKA regression oracle

These two source snapshots come verbatim from commit
`5a13d5ecdc72c598b70b54878e3baaf42cc5201b`:

- `content-index.cjs`: `netlify/functions/_shared/content-index.js`
- `orb-chat.cjs`: `netlify/functions/orb-chat.js`

They deliberately retain the previous algorithm and full guard prompt. Do not
update them to make a candidate pass. The parity tests run the old and new
implementations independently with a fixed clock and compare complete results
and handler model requests, including search context and tool results.

The full-index test uses `_public/search-index.json`, or `MIKA_PARITY_INDEX` when
provided. Build first to include that check. The synthetic edge cases always run.
Use `node scripts/mika-search-benchmark.cjs [index-path]` for an alternating local
benchmark; local timings do not establish Netlify performance.
