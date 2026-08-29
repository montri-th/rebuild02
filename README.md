# Landometer — home page Rebuild02

Customer-facing bilingual Landometer home page delivered as static initial HTML on
Landometer Design System v0.9.0-r7. It uses no client rendering framework, package
install, bundler, CI workflow, or build step. Current artifact build:
`ui-20260829-05`.

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
  wordmark directly on the surface. It contracts and becomes quieter while a visitor
  scrolls down, then returns to full prominence on upward scroll, focus, hover, or menu
  use. The desktop and in-menu sign-in CTA retain their real capsule action beneath a
  repeating text sweep. Reduced motion keeps the navbar prominent and removes the loop.
  Theme and locale utilities remain 44 px circles, and dropdown/menu states use quiet
  surface changes without an accent rail.
- The hero fills the first viewport beneath the 76 px desktop / 68 px mobile header.
  Its photograph pans slowly within its crop, alternates direction, and becomes static
  when reduced motion is requested. Its section link is a single underlined text action
  with a downward arrow.
- The approved page-reveal motion remains unchanged: grouped, once-only entrances with
  32 px vertical or 36 px directional travel, 760/920 ms timing, and a 150 ms stagger
  capped at 450 ms. Reduced motion presents the final state immediately.
- The Living video is a 14.8-second, silent, metadata-stripped portrait excerpt. It is
  attached only near the viewport, then plays muted, inline, and looping without
  controls. Responsive 4:3 and 4:5 crops keep faces and surrounding street life in view.
- The CityMETER Business Dynamics hero uses a current, same-composition 16:9 capture
  with 960, 1600, and 2560 px AVIF/WebP sources. The Land pillar and the land-appraisal,
  building and flood tiles use fresh responsive r5 captures; the fourth tile is a
  close-up Population age-and-sex chart rather than a Business Dynamics duplicate.
- A new product-neutral location-intelligence chapter introduces four ways to frame the
  next question: competitive landscape by area, white space and site selection, branch
  potential, and operational performance by area. Comparisons explicitly require the
  same definition, time window, and area boundary.
- Stories use a responsive TikTok-first masonry, followed by Facebook, Instagram,
  LinkedIn, and X. TikTok receives the largest frame; the other cards share smaller
  columns. Official provider surfaces load only near their cards and may refresh when
  activated; LinkedIn remains one explicitly featured post.
- The company-story disclosure reveals its two paragraphs in sequence and resolves into
  the four-beat line “Let us cultivate our city with data.” Reduced motion presents the
  complete thought immediately.
- Search discovery is enabled through canonical/hreflang metadata, Open Graph and
  Twitter cards, Organization/WebSite/WebPage JSON-LD, `robots.txt`, and `sitemap.xml`.
  Release dates change only when Rebuild02 content actually changes.
- The contact form sends JSON directly to Landometer's public inquiry API. The office
  email is also a 44 px `mailto:` action for visitors who prefer their mail app. The page
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
