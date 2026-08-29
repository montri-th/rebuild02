# Landometer — home page Rebuild02

Customer-facing bilingual Landometer home page delivered as static initial HTML on
Landometer Design System v0.9.0-r7. It uses no client rendering framework, package
install, bundler, CI workflow, or build step. Current release candidate:
`ui-20260829-03`.

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

- The r6 unified navbar uses the supplied full-colour symbol with a typed Arvo
  wordmark directly on the surface. Desktop keeps product links, sign-in, the compact
  menu and a four-item bookmark rail; mobile moves page links and sign-in into a
  full-width menu. Theme and locale utilities are 44 px circles, and the ecosystem
  menu uses a quiet current-location label without an accent rail.
- The hero fills the first viewport beneath the 76 px desktop / 68 px mobile header.
  Its section link is a single underlined text action with a downward arrow.
- The approved page-reveal motion remains unchanged: grouped, once-only entrances with
  32 px vertical or 36 px directional travel, 760/920 ms timing, and a 150 ms stagger
  capped at 450 ms. Reduced motion presents the final state immediately.
- The Living video is a 14.8-second, silent, metadata-stripped portrait excerpt. It is
  attached only near the viewport, then plays muted, inline, and looping without
  controls. Responsive 4:3 and 4:5 crops keep faces and surrounding street life in view.
- The CityMETER Business Dynamics hero uses a current, same-composition 16:9 capture
  with 960, 1600, and 2560 px AVIF/WebP sources.
- Stories are presented in TikTok, Facebook, Instagram, then LinkedIn order. The cards
  occupy a wide single-column frame. Official provider surfaces load only near their
  cards and refresh provider-owned content when activated; LinkedIn remains one
  explicitly featured post.
- Search discovery is enabled through canonical/hreflang metadata, Open Graph and
  Twitter cards, Organization/WebSite/WebPage JSON-LD, `robots.txt`, and `sitemap.xml`.
  Release dates change only when Rebuild02 content actually changes.
- The contact form sends JSON directly to Landometer's public inquiry API. The page
  stores only the visitor's theme preference and has no analytics or form persistence.
- The footer includes the office map, Facebook, Instagram, TikTok, LinkedIn, and X,
  with the same symbol-plus-wordmark construction used by the navbar.

## Publishing

GitHub Pages source is `main` / `/ (root)`. The tracked root `.nojekyll` file is
required so the `_ds/` design-system directory is published unchanged. The `.dc.html`
suffixes are route contracts and must not be renamed.

`machineValidation` remains `pending` and `conformanceLevel` remains
`authoring_aligned`; the public pages themselves contain no customer-facing caveat or
validation language.
