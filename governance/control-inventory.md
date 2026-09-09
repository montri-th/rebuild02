# Rebuild02 control inventory

Artifact build: `ui-20260909-02`, published and live verified

Routes: `Landometer-Home-TH.dc.html`, `Landometer-Home-EN.dc.html`

Each locale contains 109 native interactive/control/media occurrences in source. Seven
links belong to the mutually exclusive `noscript` navigation, leaving 102 native
occurrences in the enhanced model. The TikTok creator placeholder is not counted as a
native control or media element; its official script creates the provider UI only after
intersection in either theme. Two additional `tabindex="0"` horizontal rails—Location Intelligence and
testimonials—make the all-focusable totals 111 raw and 104 enhanced. Runtime loop clones
are `aria-hidden`, inert, non-focusable and excluded from these counts. Hidden menu/listbox state means the raw count is not a claim
that all controls are visible together.

| Family | Raw count per locale | Enhanced behavior | No-JavaScript behavior |
|---|---:|---|---|
| Links | 82 | Local sections, locale route, six Location Intelligence conversation routes, five product conversation routes, product evidence routes, one tailored-service route, two CityWiki source/license credits, login, careers, bookmark rail, social-card exits, five icon-only footer social destinations, office map and clickable office email | Native links remain; seven-link `noscript` navigation replaces the JavaScript menu |
| Buttons | 17 | Menu and pointer-only backdrop, one localized motion circle, one light/dark theme circle, topic trigger plus ten options, exact-link share, submit | JavaScript-only controls stay hidden or inert; the motion control is absent, motif fallbacks remain visible, and form topic remains on its first hidden value |
| Inputs | 4 | Name, email and production-matched phone validation (9–24 characters) plus hidden topic value | Visible fields remain native; fallback submission encoding is not claimed compatible with the JSON API |
| Textareas | 1 | Required contact message | Native field remains visible |
| Native selects/details | 1 | Accessible custom listbox replaces the Safari native popup; the company history/future uses native `details`/`summary` | The story disclosure remains available without JavaScript; no native select is exposed |
| Video | 1 | The 13.951667-second 720×1280 r3 vary-speed source attaches within 240 px of the viewport, then plays muted, inline and looping with no native controls; reduced motion keeps the poster and the page motion action pauses/resumes playback | Poster only because the HTML carries no initial `src` |
| Third-party iframes | 3 | In either theme, Facebook timeline, Instagram profile and LinkedIn featured-post `data-src` values attach within 480 px; TikTok uses its official lazy script. DS-owned shells follow the selected theme while provider iframe internals retain provider styling | No iframe source or provider script attaches; direct channel links remain available, including X |

Source and rendered assertions:

- The skip link is the first focusable source element.
- The compact menu is a non-modal disclosure dialog. Focus moves to the panel on open;
  Escape, the transparent backdrop, the external menu/close toggle, or a local fragment
  closes it. Fragment navigation sends focus to the destination section.
- Motion, theme, and language are separate 44 px circles. The motion action uses localized
  labels and an explicit inline rounded-stroke pause/play SVG pair, exposes `aria-pressed`,
  becomes disabled under system reduced motion, and is deliberately not persisted. The
  theme action uses the existing Material icon and persisted Light/Dark preference; the
  locale control preserves query and hash.
- The navbar begins at 76 px desktop / 68 px mobile, scales the complete row to a
  29/27 px calm state after a downward scroll, and returns to prominence on upward
  scroll, pointer/focus intent or menu open. Mobile contains only the carrier-free identity and circular menu control;
  the one-line sign-in action moves into the menu. Both CTA placements retain the real
  capsule beneath a pointer-inert, aria-hidden text sweep. The 3.7-second sweep and
  1.09-second flick run once; reduced motion and the page pause suppress them.
- The custom listbox exposes `aria-controls`, focuses the selected option on open,
  supports Arrow/Home/End/Enter/Space/Escape, and closes when focus leaves.
  Dark hover/focus states use a 34% interaction-accent mix on the raised surface and
  selected states use a quieter 16% mix, without a coloured accent rail. The same stronger
  dark hover/focus treatment covers menu links, the theme/locale utilities and menu toggle.
  Local computed-state QA confirmed menu and topic-option hover changed from transparent to
  `color(srgb .244784 .393333 .443686)` with light text.
- The enhanced form posts visible values as JSON to
  `https://landometer.com/api/v2/public/inquiry/save`; fields reset only after 2xx and
  remain intact after an error. The separate 44 px office-email link opens
  `mailto:hello@landometer.com` after explicit visitor action.
- The contact API accepted the GitHub Pages origin in a 2026-08-29 CORS preflight and
  rejected GET with 405. No production POST or inbox receipt is claimed in this source audit.
- Root, Thai and English page metadata use explicit city-data and Location Intelligence
  intent. The owner-approved English North Star is the primary H1 on both locale pages;
  the Thai-route H1 carries `lang="en"` and resolves to Arvo, while Thai search intent
  remains in the Thai metadata, eyebrow, subheadline and description. The canonical
  locale pages retain static semantic HTML, canonical/hreflang,
  social metadata and evidence-bound JSON-LD. Organization, WebSite and WebPage nodes use
  one stable official-organization identifier and only identity, address, contact and page
  facts that are visible in the public artifact. No Product, Offer, Dataset, price, rating
  or review claim was added without a dedicated evidence page.
- A branded `404.html` provides noindex recovery, and `llms.txt` is a navigation-only map to
  the canonical locale and anchored product/contact sections. It is not a ranking signal,
  evidence substitute, permission grant or agent-action authority. The repository-level
  `robots.txt` and `sitemap.xml` remain project artifacts only: this project-path GitHub
  Pages deployment cannot control `https://montri-th.github.io/robots.txt` or other
  host-root discovery files. That host and redirect work is deferred to the production plan.
- Exact-link share uses Web Share when available and clipboard otherwise, with an
  `aria-live` status. The locale link preserves query and hash.
- Stories use TikTok, Facebook, Instagram and LinkedIn in a responsive editorial grid,
  with TikTok and LinkedIn on full-width rows and Facebook/Instagram paired only while
  their provider surfaces remain readable. Facebook, Instagram and LinkedIn iframe
  sources plus the TikTok official script load when each card approaches the viewport in
  either light or dark theme. Landometer-owned shells and headers follow the selected DS
  theme; cross-origin provider internals retain provider styling and are neither recoloured
  nor inverted. Local dark-theme QA loaded real content from all four providers; switching
  dark→light→dark preserved all iframe sources and TikTok loaded state. The owned shell
  changed from `rgb(252, 252, 250)` to `rgb(32, 41, 45)`, the dark embed surround was
  `rgb(43, 53, 52)`, and no substitute surface appeared.
  Instagram height follows the measured card width. At 390 px its iframe/card measured
  436/499 px with 57 px before the next card and no fake blank tail. LinkedIn
  is explicitly a featured post, localized as `โพสต์เด่น` in Thai, and is not claimed
  as a latest feed. The X timeline embed is omitted because its provider widget rendered
  a hidden zero-size iframe at tested desktop and mobile widths. Footer social links remain
  Facebook, Instagram, TikTok, LinkedIn and X.
- The hero photograph is static. Its large owner-approved Landometer `logo.full` assembles
  once as a transparent sky overlay, keeps an exact SVG fallback, remains within the hero
  media frame, and receives no parallax. Ten additional product-neutral Landometer motifs
  map to the proof, Land·Location·Living, Location Intelligence, products, showcases,
  CityWiki, Landom, methodology, news, and contact sections according to their declared
  semantic jobs. All eleven carriers compute to transparent with zero border and padding.
  Substantial static content
  imagery in eligible pillar, Location Intelligence, product, tailored-service, and
  CityMETER showcase frames retains bounded scroll-linked movement. Hero media, all eleven
  Landometer motif carriers, both product-logo stages, other brand/identity marks, provider surfaces, video, and testimonial identity assets
  are excluded; reduced motion and the page pause freeze eligible static-image movement.
- The bilingual company history and future direction are available through a native
  disclosure; its compact identity mark changes between full-colour and cream with the theme.
- The CityMETER proof grid links four distinct, responsive captures and no longer repeats
  the Business Dynamics snapshot used by the large showcase. The Land pillar uses a new
  640/1200/1800 source family with the detail panel kept inside the crop.
- The Location Intelligence area-performance card uses its own exact, owner-supplied
  CityMETER municipal-income screenshot; visible labels and values are interface examples,
  not audited or current-result claims.
- The Location Intelligence branch-potential card owns the exact automotive market-share
  CityMETER PNG. Vehicle brands and visible values are interface examples, not endorsements
  or current-result claims; that PNG is no longer used by the CityMETER product card.
- All visible external-link terminals use the same typographic `↗` cue without an icon
  underline. Underlines are scoped to visible-text spans and never cross UI icons or
  arrow cues. Every `target="_blank"` link carries `rel="noopener noreferrer"`.
- All 25 Material Symbols ligatures currently rendered by Rebuild02 are present in the
  25-glyph self-hosted r10 canonical Material Symbols Rounded file at FILL 0 / wght 300 /
  GRAD 0. Bookmark roles use widgets, monitoring, newspaper and mail as four unique
  outline glyphs. Keeping the current bookmark at FILL 0 is an explicit owner override of
  the r7 handoff's FILL 1 active example so every interface icon remains rounded-outline;
  computed local QA confirmed all `.icon-symbol` elements use Material Symbols Rounded at
  FILL 0 / wght 300. The five social destinations compute to fill none, stroke width 1.65
  and round caps/joins; their 44 px footer targets are icon-only while labels remain visually
  hidden and available to assistive technology. The motion control is the sole non-Material
  UI-icon construction: one inline pause/play SVG pair with `fill:none`, `currentColor`
  stroke, and rounded caps/joins. Product logos remain identity assets rather than UI glyphs.
- Location Intelligence exposes six image-led, benefit-specific conversation routes in
  one localized, keyboard-focusable scroll-snap rail. Testimonials retain six semantic
  source cards in their own rail. For each rail, JavaScript assigns a stable logical index
  to every source card and creates one sanitized, `aria-hidden`, inert six-card cycle before
  and after the originals. The reveal observer resolves that index across all three cycles,
  so an intersecting source or clone reveals every copy of the same logical card. At
  390/768/1440 px, both rails survived left/right boundary traversal and every group stayed
  0/3 or 3/3 revealed, never mixed, with no page overflow. The rail then normalizes after
  pointer, touch or arrow-key travel so the sequence loops in either direction. A resize
  preserves the current logical source card. Proof of demand remains
  framed as an estimate from city-data signals and directs the reader toward field
  validation rather than asserting measured demand. All six Thai and six English Location
  CTA captions are shortened and governed by max-width plus nowrap with responsive padding
  and type. At widths 320, 360, 390, 600, 601, 630, 640, 700, 768, 900, 1080, 1081,
  1280 and 1440, QA found all computed nowrap, zero `.btn` overflow, no Location CTA
  above 48 px and no page overflow.
- Release `ui-20260909-02` changes only the initial discovery metadata, sitemap dates,
  build receipts and social-preview asset. The deterministic 1200×630 JPEG uses the
  approved r6 symbol at 350×350 px on a high-contrast central panel; full 1.91:1 and
  centred 1:1, 4:3 and 16:9 crops passed local review. Root, Thai and English Open Graph,
  Twitter and WebPage JSON-LD references use its immutable content-hashed URL. Workflow
  `34366676243`, Pages build `1204362341`, and deployment `6352637363` succeeded; 6/6
  release-owned live-byte probes and 6/6 crawler user-agent origin probes passed. Stored
  card refresh and final crop remain controlled by each platform.
- Previous release `ui-20260909-01` is published and live verified. Artifact commit
  `d8eb2bd0ccca6322042b8be4ae4dcdd3b90eee27` / tree
  `27277d7a2e447ef3139b72ea51da65d130501bb7` was published by successful Pages workflow
  `34269175056`, deployment `6335434394`, and build `1202614459`, created
  `2026-09-08T19:28:30Z` and updated `2026-09-08T19:28:55Z` after 25,644 ms. Exact live
  HTTP/MIME and byte parity passed 44/44 at `2026-09-08T19:34:07.169Z`; production browser
  QA passed layout 32/32, captions 7/7 with twelve captions per case, rails 4/4,
  reduced-motion 4/4, no-JavaScript 2/2, targeted 320 px overflow 2/2, and Living r3
  video 1/1 at `2026-09-08T19:40:52.273Z`. An unknown route returned the exact branded
  local `404.html` with HTTP 404 at `2026-09-08T19:42:09Z`. The preceding
  `ui-20260908-02` release remains historical: artifact `c4a8fb8d…`, tree `f5b4a817…`,
  workflow `34242568111`, Pages build `1202182321`, live byte verification at
  `2026-09-08T15:14:46.364Z`, and production browser QA at
  `2026-09-08T15:50:20.728Z`. `ui-20260908-01` and `ui-20260901-01` remain earlier
  historical evidence.
- The immutable private `ui-20260909-01` Drive handoff at
  <https://drive.google.com/drive/folders/1PGPmrZqEi_wE5ci6mEafxwXP60te7I0_> passed an
  exact three-file listing, complete raw-byte readback, and owner-only permission check at
  `2026-09-08T19:54:07Z`: ZIP `1uXcR4Yvg7-3UBNsv1E8G3fO067JnSBy1` is 5,708,356 bytes /
  SHA-256 `bafb6e6061ec049a915d20a2aa115bbc6538c624f9eb402a6baae48beed94f5b`;
  Claude read-first `1Kfo95G15O8o2PONvvyCCfL2AoN6xx0-5` is 5,170 bytes / SHA-256
  `dff902b2525d6e33b32cbeeb4ff48ff01c5a56735a02600c32362fabbdbc34f4`; machine manifest
  `1Qkg6OmhvkD8Qf8jYuMjKA9vMr6zmmZIr` is 14,758 bytes / SHA-256
  `e520746473e703cd2f815c80427d6aced0629ea2461cec53591e725e413ab321`.
  The ui02 Drive snapshot remains historical and was not overwritten. True Chrome UI
  zoom, native hidden-tab behavior, injected asset/load/decode failure, exhaustive
  keyboard/focus traversal, print/pagehide, live and exhaustive provider behavior,
  production accessibility, a selected loading/performance budget, and machine validation
  remain open.
- Products and Services exposes five product paths with consistent capsule conversation
  CTAs and an explicit fit cue. Desktop uses a 2+3 hierarchy: CityMETER and CityChat lead,
  followed by ijji, CityWiki and land/property tools. The restored CityMETER card pairs the
  r6 symbol and typed Landometer Arvo wordmark with a separate CityMETER heading; CityWiki
  uses its Arvo product wordmark, and land tools retains the shared lockup geometry. CityMETER
  restores the responsive 960/1600 AVIF/WebP Business Dynamics family. CityWiki and land
  tools keep exact r8 PNG examples; CityWiki carries two linked source/license credits and
  the tax simulator is visibly labelled as a legacy asset
  retrieved on 26 Aug 2026. CityChat and ijji restore their previous responsive community
  and food-vendor photographs. CityChat now uses the owner-approved, observed-byte bubble
  animation over its no-bubble lockup in the brand row; ijji moves its verified r3
  mark-only sting into its own brand row and preserves the exact mark still until all nine
  runtime layers load and decode. Both logo carriers are transparent and both sequences are
  finite once, non-parallax, and product-specific. The people in the photographs are not
  represented as product users or endorsers. Projects/partnerships remains a separate
  image-led tailored service route. Product-specific copy is not generalized across Landometer.

- The selected families add thirteen non-focusable visual stages per locale—eleven
  Landometer section motifs plus CityChat and ijji animated brand rows—and do not change
  the control totals. All carriers add no background surface, border, padding, radius, or
  shadow. Each Landometer sequence is finite and begins only near its mapped section.
  CityChat settles once and does not replay. ijji begins only after visibility plus
  nine-layer load/decode readiness, runs for 6.4 seconds, and remains at 6.4 seconds after
  re-entry. Current reduced-motion and no-JavaScript checks retained exact stills and all
  eleven Landometer fallbacks. Print and injected ijji decode-failure evidence from
  `ui-20260908-01` remains historical and must be repeated before it is claimed for this
  release.
