# Landometer — home page Rebuild02

Customer-facing bilingual Landometer home page delivered as static initial HTML on
Landometer Design System v0.9.0-r7. It uses no client rendering framework, package
install, bundler, CI workflow, or build step. Current artifact candidate:
`ui-20260831-01` (local release gates passed; GitHub Pages publication and live-byte
verification pending; machine validation pending).

| File | Purpose |
|---|---|
| `index.html` | Root entry; preserves query/hash and opens the Thai route |
| `Landometer-Home-TH.dc.html` | Thai home page |
| `Landometer-Home-EN.dc.html` | English home page |
| `404.html` | Branded bilingual recovery page for missing GitHub Pages routes |
| `llms.txt` | Navigation-only public index for AI and agent retrieval |
| `robots.txt`, `sitemap.xml` | Project-path crawler and canonical locale discovery files |
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
  locale utilities remain 44 px circles. Dark-theme menu, utility, menu-toggle and
  topic-option hover/focus states now mix a stronger accent tint into the raised surface;
  selected states remain quieter and no accent rail is introduced. Local computed-state
  QA confirmed the dark hover surface changes from transparent to
  `color(srgb .244784 .393333 .443686)` while retaining light text.
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
- The product-neutral location-intelligence chapter frames six questions:
  competition within a catchment area, proof of demand, white space and site selection,
  branch potential, operational performance by area, and location-based market
  listening. The six image-led source cards form a keyboard-focusable scroll-snap rail
  with the same responsive rhythm as “What users say.” The branch-potential card owns the
  automotive market-share CityMETER PNG, while operational performance uses its distinct
  municipal-income screenshot. Every
  card keeps its benefit-led conversation CTA. All six localized Location CTAs use
  shortened labels plus a nowrap/max-width contract. Local TH/EN checks at 320, 360, 390,
  600, 768, 900, 1080, 1081, 1280 and 1440 px confirmed nowrap, no button overflow,
  no Location CTA taller than 48 px and no page overflow. The rail and the six-card testimonial
  rail both loop in either direction: JavaScript adds one sanitized, `aria-hidden`,
  inert copy of the six source cards before and after the original cycle, then recentres
  without an animated jump after pointer, touch, or keyboard navigation. Source and clone
  copies share a logical reveal index, so whichever copy intersects first reveals the same
  card across all three cycles instead of exposing an unrevealed clone. At 390, 768 and
  1440 px, both rails survived left/right boundary traversal and every logical reveal group
  remained consistently 0/3 or 3/3 revealed, never mixed. Resize handling
  preserves the logical card rather than resetting the reader's place.
  Comparisons explicitly require the same definition, time window, and area boundary;
  demand language remains an estimate that calls for field validation.
- Products and Services presents five product paths with one consistent conversation
  CTA and an explicit “A fit when” decision cue. On desktop, CityMETER and CityChat lead
  as two equal featured cards, followed by ijji, CityWiki, and land/property tools in a
  three-card row. The restored CityMETER card pairs the Landometer symbol with the typed
  Landometer Arvo wordmark and names CityMETER in a separate heading. CityWiki pairs the
  symbol with its Arvo product wordmark, while land/property tools keeps the shared lockup
  geometry. The CityWiki frame carries linked CC BY 2.0 attribution, and Property Tax
  Simulator is visibly identified as a legacy asset. CityChat and ijji
  retain exact official identity assets, while CityChat uses a complete fixed-light
  contrast contract without a filled Brand Blue action. Projects and partnerships is
  separated as a tailored service route. Product-specific claims remain inside their
  own cards rather than being generalized across Landometer. The CityMETER card restores
  the responsive 960/1600 AVIF/WebP Business Dynamics family; the automotive market-share
  PNG now belongs only to the Location Intelligence branch-potential question. CityWiki
  and Property Tax Simulator retain their exact immutable PNG examples.
- Stories use a responsive editorial grid: TikTok and LinkedIn receive full-width rows,
  while Facebook and Instagram share a readable two-column row and stack on narrower
  viewports. The unreliable blank X timeline embed is removed; the outbound X profile
  link remains in the footer. Actual TikTok, Facebook, Instagram and LinkedIn provider
  content lazily loads when its card approaches the viewport in both light and dark themes;
  LinkedIn remains one explicitly featured post. The Instagram profile frame is sized
  from its rendered card width instead of a fixed mobile height, removing the blank tail.
  Landometer-owned card shells, headers and surrounding surfaces follow the selected DS
  theme. Cross-origin provider internals retain the provider's own styling and are not
  recoloured, inverted or represented as DS-themed content. Local dark-theme QA loaded real
  TikTok, Facebook, Instagram and LinkedIn content; dark→light→dark preserved all frame
  sources and TikTok state while the DS shell changed from `rgb(252, 252, 250)` to
  `rgb(32, 41, 45)` and the dark embed surround resolved to `rgb(43, 53, 52)`. The 390 px
  Instagram frame/card measured 436/499 px with 57 px before the following card, with no
  substitute surface or fake blank tail.
- The hero keeps its 32-second ambient pan and adds a shallow, overscanned scroll parallax
  capped at 20 px. Substantial static content imagery in the Land/CityWiki/Landom pillars,
  Location Intelligence, Products and Services, tailored service, and CityMETER showcase
  areas uses the same bounded scroll-linked depth treatment. Brand marks, provider surfaces,
  video, and testimonial identity assets are excluded. All parallax layers freeze under the
  user's reduced-motion preference without changing the governed media bytes.
- The company-story disclosure reveals its two paragraphs in sequence and resolves into
  the four-beat line “Let us cultivate our city with data.” Reduced motion presents the
  complete thought immediately.
- Search discovery uses intent-bearing bilingual titles, canonical/hreflang metadata,
  Open Graph and Twitter cards, a stable owned-domain Organization identity with the
  visible address and contact route, WebSite/WebPage JSON-LD, and a visible-content
  ItemList for the five products and tailored service route. The root redirect shell now
  mirrors the Thai canonical metadata and offers substantive fallback navigation. The
  project also publishes a branded `404.html` and navigation-only `llms.txt`; neither is
  represented as a ranking guarantee or agent authority. Project-path `robots.txt` and
  `sitemap.xml` remain useful files but cannot govern the `montri-th.github.io` hostname
  root. Release dates change only when Rebuild02 content actually changes.
- The contact form sends JSON directly to Landometer's public inquiry API. The office
  email is also a 44 px `mailto:` action for visitors who prefer their mail app. The page
  stores only the visitor's theme preference and has no analytics or form persistence.
- The footer includes the office map plus 44 px circular, icon-only Facebook, Instagram,
  TikTok, LinkedIn and X links. Their accessible platform names remain in the markup while
  the visible marks use rounded outline strokes. Other interface icons continue to use the
  self-hosted rounded-outline Material Symbols contract. Computed local QA confirmed all
  `.icon-symbol` instances use Material Symbols Rounded at FILL 0 / wght 300; all social
  SVGs use fill none, 1.65 px strokes and round caps/joins, and footer targets are 44 px.

## Publishing

GitHub Pages source is `main` / `/ (root)`. The tracked root `.nojekyll` file is
required so the `_ds/` design-system directory is published unchanged. The `.dc.html`
suffixes are route contracts and must not be renamed.

`machineValidation` remains `pending` and `conformanceLevel` remains
`authoring_aligned`; the public pages themselves contain no customer-facing caveat or
validation language. Candidate release checks passed script syntax, diff hygiene,
JSON-LD/JSON/YAML parsing, local resource existence, unique IDs and local HTTP/MIME checks
for root, index, TH, EN, the branded 404, `llms.txt`, sitemap and the DS stylesheet. The
new Thai primary H1 was rendered at 320, 390, 768 and 1440 px with zero horizontal
overflow and remained inside the first-view hero. The preceding visual release
`ui-20260830-11` remains the latest live-byte-attested baseline for unchanged interaction
and media behavior until this candidate is deployed and checked against GitHub Pages.
