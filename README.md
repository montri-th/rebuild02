# Landometer — home page Rebuild02

Customer-facing bilingual Landometer home page delivered as static initial HTML on
Landometer Design System v0.9.0-r7. It uses no client rendering framework, package
install, bundler, CI workflow, or build step. The current locally validated candidate is
`ui-20260909-02` (`rebuild02-ui-20260909-02`), content version
`landometer-home-rebuild02-v18`; publication evidence is pending. The previous published
and live-verified behavioral baseline is `ui-20260909-01`, artifact commit
`d8eb2bd0ccca6322042b8be4ae4dcdd3b90eee27` and tree
`27277d7a2e447ef3139b72ea51da65d130501bb7`. The preceding
`ui-20260908-02` release (`c4a8fb8d…`, tree `f5b4a817…`) and
`ui-20260908-01` release (`f38f33a9…`, tree `4458e55f…`) remain historical evidence;
`ui-20260901-01` is earlier historical evidence. Machine validation remains pending.

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
| `assets/` | Responsive media, identity, testimonials, icon font, and version-pinned Landometer/CityChat/ijji motif assets |
| `governance/` | Build Card, manifest, control inventory, QA receipts, and `motif-integration.json` Drive/handoff boundary |

## Current experience

- The r7 unified navbar uses the owner-approved full-colour symbol with a typed Arvo
  wordmark directly on the surface. It contracts through a 50% scale of the complete
  navigation row to a 29 px desktop / 27 px mobile calm state while a visitor scrolls
  down, then returns to full prominence on upward scroll, focus, hover, or menu use. The
  desktop and in-menu sign-in CTA retain their real capsule action beneath one finite
  3.7-second sweep and 1.09-second flick. Reduced motion and the page motion control
  suppress that overlay. Motion, theme, and locale utilities remain 44 px circles. Dark-theme menu, utility, menu-toggle and
  topic-option hover/focus states now mix a stronger accent tint into the raised surface;
  selected states remain quieter and no accent rail is introduced. Local computed-state
  QA confirmed the dark hover surface changes from transparent to
  `color(srgb .244784 .393333 .443686)` while retaining light text.
- The hero fills the first viewport beneath the 76 px desktop / 68 px mobile header.
  Its photograph is static. A large, owner-approved Landometer `logo.full` assembles once
  as a transparent overlay in the photographic sky and keeps an exact SVG fallback; the
  official navigation and favicon identity files remain unchanged. The overlay
  never loops, replays after completion, or receives parallax. The section link remains a
  single underlined text action with a downward arrow.
- Eleven product-neutral Landometer motif placements per locale give each major section
  a meaning-specific visual cue without adding a card or background carrier. Every
  placement now uses its `full` variant with blue ink: `logo`, `layers`, `rings`, `dial`,
  `cultivate`, and `slice`. The Land·Location·Living rings move to the shared resolution
  statement so they do not duplicate a pillar icon; the story mark and contact measure
  line are removed for the same reason. Every carrier computes to transparent with zero
  border and padding, and every sequence is finite, decorative, and excluded from parallax.
- The approved page-reveal motion remains unchanged: grouped, once-only entrances with
  32 px vertical or 36 px directional travel, 760/920 ms timing, and a 150 ms stagger
  capped at 450 ms. Reduced motion presents the final state immediately.
- The Living video is a 13.951667-second, silent, metadata-stripped portrait excerpt.
  Nine retimed sections range from 0.68× to 1.45× to create a warmer, more playful
  slow-motion rhythm while preserving the approved poster and portrait composition. It is
  attached only near the viewport, then plays muted, inline, and looping without
  native controls. Reduced motion keeps the poster, and the visible page motion action
  pauses/resumes playback. Responsive 4:3 and 4:5 crops keep faces and surrounding street
  life in view.
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
  card keeps its benefit-led conversation CTA. Primary conversation and submit actions
  retain governed outline geometry while adding a finite solid-yellow underline sweep and
  contextual high-contrast surface/foreground pair. All six localized Location CTAs use
  shortened labels plus a nowrap/max-width contract. Local TH/EN checks at 320, 360, 390,
  600, 601, 630, 640, 700, 768, 900, 1080, 1081, 1280 and 1440 px confirmed nowrap, no
  button overflow, no Location CTA taller than 48 px and no page overflow. The rail and
  the six-card testimonial rail auto-advance at a considerate interval and pause for hover,
  focus, pointer, touch, wheel, offscreen, page-pause, and reduced-motion states. Both still
  loop manually in either direction: JavaScript adds one sanitized, `aria-hidden`,
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
  three-card row. CityMETER and CityWiki now share the same symbol-plus-Arvo product
  wordmark construction while retaining semantic product headings. A three-example
  CityMETER preview rail follows the CityMETER card immediately at 700 px and below so
  mobile visitors encounter the prepared showcases before the remaining long card stack;
  the desktop showcase remains unchanged. Land/property tools keeps the shared lockup
  geometry. The CityWiki frame carries linked CC BY 2.0 attribution, and Property Tax
  Simulator is visibly identified as a legacy asset. CityChat and ijji now restore the
  previous responsive community and food-vendor photographs in their media frames. Their
  owner-approved animated identities move into the brand rows: CityChat layers the exact
  observed-byte bubble animation over its no-bubble lockup, while ijji uses the verified
  r3 mark-only 6.4-second sting and keeps its exact still until all nine layers load and
  decode or whenever a dependency fails. CityChat uses a 270 px maximum lockup in the
  shared 68 px brand row; ijji uses a 64 × 64 px stage to balance the peer marks under an
  explicit artifact-local owner override that does not amend the package's 160 px minimum
  guidance. Both logo carriers are transparent; both
  product-specific sequences are finite once, never replay or parallax, and are not
  generalized into Landometer capability. The photographs remain documentary context:
  the people shown are not represented as product users or endorsers. CityChat retains its
  complete fixed-light contrast contract without a filled Brand Blue action. Projects and partnerships is
  separated as a tailored service route. Product-specific claims remain inside their
  own cards rather than being generalized across Landometer. The CityMETER card restores
  the responsive 960/1600 AVIF/WebP Business Dynamics family; the automotive market-share
  PNG now belongs only to the Location Intelligence branch-potential question. The two
  Business Dynamics Thailand-map snapshots remain centered in runtime, reduced-motion,
  and no-JavaScript states. CityWiki and Property Tax Simulator retain their exact
  immutable PNG examples. All twelve visible media captions are opaque flow siblings
  below their images, so transformed imagery cannot cover them while scrolling.
- Thai testimonial names are tokenized so lines may wrap between name components but
  never through a given name or surname.
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
- The hero photograph, all eleven Landometer motif carriers, and both product-logo stages
  are excluded from scroll-linked movement.
  Substantial static content imagery in the Land/CityWiki/Landom pillars,
  Location Intelligence, Products and Services, tailored service, and CityMETER showcase
  areas retains a bounded scroll-linked depth treatment. Brand and identity marks, provider
  surfaces, video, and testimonial identity assets are also excluded. Eligible parallax
  freezes under reduced motion and the page motion action without changing governed bytes.
- The company-story disclosure reveals its two paragraphs in sequence and resolves into
  the four-beat line “Let us cultivate our city with data.” Reduced motion presents the
  complete thought immediately.
- Search discovery uses intent-bearing bilingual titles, canonical/hreflang metadata,
  Open Graph and Twitter cards, a stable owned-domain Organization identity with the
  visible address and contact route, WebSite/WebPage JSON-LD, and a visible-content
  ItemList for the five products and tailored service route. The root redirect shell now
  mirrors the Thai canonical metadata and offers substantive fallback navigation. The
  project also publishes a branded `404.html` and navigation-only `llms.txt`; neither is
  represented as a ranking guarantee or agent authority. The owner-approved English
  North Star remains the primary H1 in both locales and explicitly carries `lang="en"`;
  Thai intent remains visible in the Thai eyebrow, subheadline and description as well as
  in metadata. Project-path `robots.txt` and
  `sitemap.xml` remain useful files but cannot govern the `montri-th.github.io` hostname
  root. Release dates change only when Rebuild02 content actually changes.
- The contact form sends JSON directly to Landometer's public inquiry API. The office
  email is also a 44 px `mailto:` action for visitors who prefer their mail app. The page
  stores only the visitor's theme preference; the motion pause is transient. There is no
  analytics or form persistence.
- The footer includes the office map plus 44 px circular, icon-only Facebook, Instagram,
  TikTok, LinkedIn and X links. Their accessible platform names remain in the markup while
  the visible marks use rounded outline strokes. Other interface icons continue to use the
  self-hosted rounded-outline Material Symbols contract. Computed local QA confirmed all
  `.icon-symbol` instances use Material Symbols Rounded at FILL 0 / wght 300; all social
  SVGs use fill none, 1.65 px strokes and round caps/joins, and footer targets are 44 px.
  The motion action is the only separate UI-icon construction: an explicit inline 24 px
  pause/play SVG pair with no fill, current-colour stroke, and rounded caps/joins. The
  self-hosted Material subset and active Material ligature count remain 25.
- Link sharing uses one opaque 1200×630 JPEG with the approved full-colour r6 Landometer
  symbol at 350×350 px on a high-contrast central panel over the approved Lumpini hero
  photograph. The complete mark survives reviewed centred 1:1, 4:3 and 16:9 crops.
  Root, Thai and English initial HTML emit the same immutable content-hashed image URL
  through Open Graph and Twitter metadata; Thai and English WebPage JSON-LD use it as
  `primaryImageOfPage`. `scripts/build_social_preview.py` reproduces the output with
  Python 3.12 and Pillow 12.3, and `scripts/check_social_preview.py` verifies the exact
  image, metadata, localized alt text and sitemap dates. Platform crawlers retain control
  of their own cached cards, crop and refresh schedule.

## Motif handoff

`governance/motif-integration.json` is the machine boundary for selected asset IDs,
product scopes, transparent carriers, semantic jobs, runtime/fallback paths, dependency
hashes, owner approval, and the repository-side publication receipt. The completed,
immutable private `ui-20260909-01` Drive handoff is
<https://drive.google.com/drive/folders/1PGPmrZqEi_wE5ci6mEafxwXP60te7I0_>.
Its exact three-file listing and owner-only permissions were verified at
`2026-09-08T19:54:07Z`, and every file passed a complete raw-byte readback:

- selected-assets ZIP `1uXcR4Yvg7-3UBNsv1E8G3fO067JnSBy1`, 5,708,356 bytes,
  SHA-256 `bafb6e6061ec049a915d20a2aa115bbc6538c624f9eb402a6baae48beed94f5b`;
- Claude read-first file `1Kfo95G15O8o2PONvvyCCfL2AoN6xx0-5`, 5,170 bytes,
  SHA-256 `dff902b2525d6e33b32cbeeb4ff48ff01c5a56735a02600c32362fabbdbc34f4`;
- machine selection manifest `1Qkg6OmhvkD8Qf8jYuMjKA9vMr6zmmZIr`, 14,758 bytes,
  SHA-256 `e520746473e703cd2f815c80427d6aced0629ea2461cec53591e725e413ab321`.

The handoff supports reuse through the connected Drive account without making the folder
public and without claiming background synchronization or independent publishing
authority. The immutable private `ui-20260908-02` folder remains historical and was not
overwritten.

## Publishing

GitHub Pages source is `main` / `/ (root)`. The tracked root `.nojekyll` file is
required so the `_ds/` design-system directory is published unchanged. The `.dc.html`
suffixes are route contracts and must not be renamed.

`machineValidation` remains `pending` and `conformanceLevel` remains
`authoring_aligned`; the public pages themselves contain no customer-facing caveat or
validation language. Release source/hash checks pin `site.css` at 65,158 bytes / SHA-256
`52bc9727…` and `site.js` at 64,619 bytes / SHA-256 `d8424041…`. The
The `ui-20260909-02` social-preview candidate is locally validated and authorized for
direct publication; its artifact commit, Pages run and live-byte receipt are pending.
The previous `ui-20260909-01` artifact commit `d8eb2bd0ccca6322042b8be4ae4dcdd3b90eee27` /
tree `27277d7a2e447ef3139b72ea51da65d130501bb7` was published by successful Pages
workflow `34269175056`, deployment `6335434394`, and build `1202614459`, created at
`2026-09-08T19:28:30Z` and updated at `2026-09-08T19:28:55Z` after 25,644 ms. Exact live
HTTP/MIME and byte parity passed 44/44 checks at `2026-09-08T19:34:07.169Z`; an unknown
route returned the exact branded `404.html` with HTTP 404 at `2026-09-08T19:42:09Z`.

Production browser QA passed at `2026-09-08T19:40:52.273Z`: layout 32/32 across both
locales, light widths 320, 360, 390, 600, 601, 630, 640, 700, 768, 900, 1080, 1081,
1280 and 1440 px plus dark 390/1440 px; captions 7/7 with twelve captions per case; both
rails in both locales 4/4; reduced-motion 4/4; no-JavaScript 2/2; targeted 320 px
TikTok/embed containment 2/2; and Living r3 video 1/1. All-full transparent motifs,
logo sizing, name wrapping, mobile showcases, CTA/card contrast, caption flow, centered
Thailand maps, and automatic/manual infinite carousels passed with no horizontal overflow,
duplicate IDs, or first-party runtime errors.

The preceding `ui-20260908-02` release remains historical: artifact commit
`c4a8fb8d2869a4aeb1a27381f3c5600370e78cec`, tree
`f5b4a8173fa160b853f7bf780b4d8d363e524b09`, successful workflow `34242568111`, Pages
build `1202182321`, live byte verification at `2026-09-08T15:14:46.364Z`, and production
browser QA at `2026-09-08T15:50:20.728Z`. `ui-20260908-01` and `ui-20260901-01` remain
earlier historical evidence. True Chrome UI zoom, native hidden-tab behavior, injected
asset/load/decode failure, exhaustive keyboard/focus traversal, print/pagehide, live and
exhaustive provider behavior, production accessibility, a selected loading/performance
budget, and machine validation remain open.
