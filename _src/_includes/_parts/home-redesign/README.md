# Homepage redesign notes

This directory tracks the origin and intent for the alternative homepage redesign. The layout in `base_home_redesign.njk` mirrors the structure from the `Homepage_Redesign_Strategy.zip` deliverable, while swapping generated placeholder copy for the live site content so links remain accurate.

## Source material

- Design reference: `Homepage_Redesign_Strategy.zip` (Figma-derived HTML/CSS prototype)
- Core site references: `_src/_includes/base_home.njk` and related `home/*.md` content

## Integration approach

- The shared site header/footer are reused so navigation remains consistent.
- Partner logos, video embeds, and the Rogerstone Rangers sponsorship block are pulled from the existing homepage.
- Tailwind utilities are translated into bespoke CSS in `core.css` under the homepage redesign section.

All copy uses British English spelling to match the rest of the site.
