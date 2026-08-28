# Landometer — home page rebuild03

Customer-facing, bilingual Landometer home page built as static initial HTML on
Landometer Design System v0.9.0-r7. The page has no third-party rendering runtime,
bundler, package install, or build step.

| File | Purpose |
|---|---|
| `index.html` | Root entry; preserves query/hash and opens the Thai route |
| `Landometer-Home-TH.dc.html` | Thai home page |
| `Landometer-Home-EN.dc.html` | English home page |
| `_ds/landometer-design-system-…/` | DS tokens, base CSS, and self-hosted webfonts |
| `site.css`, `site.js` | Responsive presentation and progressive enhancement |
| `assets/` | Responsive media, identity, testimonials, and icon font |
| `governance/` | Build Card, manifest, control inventory, and QA receipts |

## Current experience

- The transparent brand lockup sits directly on the 76 px desktop / 68 px mobile
  navbar. On mobile, the short one-line sign-in action remains visible beside the menu.
- The hero is sized to the remaining first viewport, with compact-height portrait
  and landscape rules plus an internal overflow safeguard for enlarged text.
- The visible proof band contains the dated, product-scoped 38 / 45 / 51 / 120
  figures. The four legacy-system figures are omitted because the owner Drive
  `figures.json` checked on 2026-08-29 still has a null date and four null values.
- Below-fold sections reserve their media ratio on token surfaces, use the available
  responsive AVIF/WebP sources, and reveal as they approach the viewport.
- The Living video has no initial `src`. It is attached only near the viewport, then
  plays muted, inline, and looping without controls; reduced-motion keeps its poster.
- The contact form sends JSON directly to Landometer's existing public inquiry API.
  The production contact surface identifies `hello@landometer.com` as the recipient;
  the GitHub Pages origin passed CORS preflight on 2026-08-29. A successful submit
  clears the form; an error preserves every field. No mail application is opened.
- The page stores only the visitor's theme preference. It has no analytics or contact
  form persistence in this static repository.

## Publishing

GitHub Pages source is `main` / `/ (root)`. The tracked root `.nojekyll` file is
required so the `_ds/` design-system directory is published unchanged. The `.dc.html`
suffixes are route contracts and must not be renamed.

The release deliberately retains `machineValidation: pending`,
`conformanceLevel: authoring_aligned`, `indexable: false`, and
`hook.mode: none_no_honest_investment` until their independent gates change.
