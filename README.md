# Landometer — home page Rebuild02

Customer-facing bilingual Landometer home page delivered as static initial HTML on
Landometer Design System v0.9.0-r7. It uses no client rendering framework, package
install, bundler, CI workflow, or build step. Current artifact build:
`ui-20260830-09`.

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

- The r7 unified navbar uses the owner-approved full-colour symbol with a typed Arvo
  wordmark directly on the surface. It contracts through a 50% scale of the complete
  navigation row to a 29 px desktop / 27 px mobile calm state while a visitor scrolls
  down, then returns to full prominence on upward scroll, focus, hover, or menu use. The
  desktop and in-menu sign-in CTA retain their real capsule action beneath a repeating
  text sweep. Reduced motion keeps the navbar prominent and removes the loop. Theme and
  locale utilities remain 44 px circles, and menu states use quiet surface changes
  without an accent rail.
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
- The product-neutral location-intelligence chapter now frames six questions:
  competition within a catchment area, proof of demand, white space and site selection,
  branch potential, operational performance by area, and location-based market
  listening. The six image-led cards form a keyboard-focusable CSS scroll-snap rail
  with the same responsive rhythm as “What users say”; no JavaScript clones or hidden
  duplicate content are introduced. The operational-performance card uses its own exact
  CityMETER municipal-income screenshot rather than repeating Business Dynamics. Every
  card keeps its benefit-led conversation CTA.
  Comparisons explicitly require the same definition, time window, and area boundary;
  demand language remains an estimate that calls for field validation.
- Products and Services presents five product paths with one consistent conversation
  CTA and an explicit “A fit when” decision cue. On desktop, CityMETER and CityChat lead
  as two equal featured cards, followed by ijji, CityWiki, and land/property tools in a
  three-card row. CityMETER, CityWiki, and land/property tools pair the Landometer symbol
  with their own product names; CityMETER and CityWiki use the Arvo display face in both
  locales. Their new owner-selected interface examples are exact immutable PNG copies,
  lazy-loaded below the fold; the CityWiki frame carries linked CC BY 2.0 attribution,
  and Property Tax Simulator is visibly identified as a legacy asset. CityChat and ijji
  retain exact official identity assets, while CityChat uses a complete fixed-light
  contrast contract without a filled Brand Blue action. Projects and partnerships is
  separated as a tailored service route. Product-specific claims remain inside their
  own cards rather than being generalized across Landometer.
- Stories use a responsive editorial grid: TikTok and LinkedIn receive full-width rows,
  while Facebook and Instagram share a readable two-column row and stack on narrower
  viewports. The unreliable blank X timeline embed is removed; the outbound X profile
  link remains in the footer. Official provider surfaces load only near their cards;
  LinkedIn remains one explicitly featured post. The Instagram profile frame is sized
  from its rendered card width instead of a fixed mobile height, removing the blank tail.
  Social-card chrome follows the page theme and passes the active colour scheme into
  provider frames; provider-owned cross-origin surfaces retain their own supported palette.
- The hero keeps its 32-second ambient pan and adds a shallow, overscanned scroll parallax
  capped at 20 px. Both layers freeze under the user's reduced-motion preference.
- The company-story disclosure reveals its two paragraphs in sequence and resolves into
  the four-beat line “Let us cultivate our city with data.” Reduced motion presents the
  complete thought immediately.
- Search discovery is enabled through canonical/hreflang metadata, Open Graph and
  Twitter cards, Organization/WebSite/WebPage JSON-LD plus a visible-content ItemList
  for the five products and tailored service route, `robots.txt`, and `sitemap.xml`.
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
