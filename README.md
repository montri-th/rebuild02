# Landometer — home page Rebuild02

Customer-facing bilingual Landometer home page delivered as static initial HTML on
Landometer Design System v0.9.0-r7. It uses no client rendering framework, package
install, bundler, CI workflow, or build step. The current published, live-verified release
is `ui-20260908-02` (`rebuild02-ui-20260908-02`), artifact commit
`c4a8fb8d2869a4aeb1a27381f3c5600370e78cec` and tree
`f5b4a8173fa160b853f7bf780b4d8d363e524b09`. The immediately preceding release is
`ui-20260908-01` (`f38f33a9…`, tree `4458e55f…`); `ui-20260901-01` remains earlier
historical evidence. Machine validation remains pending.

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
  official navigation, favicon, and social identity files remain unchanged. The overlay
  never loops, replays after completion, or receives parallax. The section link remains a
  single underlined text action with a downward arrow.
- Eleven product-neutral Landometer motif placements per locale give each major section
  a meaning-specific visual cue without adding a card or background carrier: `logo.full`
  opens the hero; `layers.quiet` closes the proof band; `rings.full` orients Land·Location·Living;
  `dial.quiet` frames Location Intelligence; `layers.full` introduces products; `rings.quiet`
  opens showcases; `layers.quiet` introduces CityWiki; `cultivate.full` closes the Landom
  chapter; `dial.full` supports the methodology story; `cultivate.quiet` hands off to news;
  and `slice.quiet` closes on contact. Every carrier computes to transparent with zero
  border and padding, and every sequence is finite, decorative, and excluded from parallax.
- The approved page-reveal motion remains unchanged: grouped, once-only entrances with
  32 px vertical or 36 px directional travel, 760/920 ms timing, and a 150 ms stagger
  capped at 450 ms. Reduced motion presents the final state immediately.
- The Living video is a 14.8-second, silent, metadata-stripped portrait excerpt. It is
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
  Simulator is visibly identified as a legacy asset. CityChat and ijji now restore the
  previous responsive community and food-vendor photographs in their media frames. Their
  owner-approved animated identities move into the brand rows: CityChat layers the exact
  observed-byte bubble animation over its no-bubble lockup, while ijji uses the verified
  r3 mark-only 6.4-second sting and keeps its exact still until all nine layers load and
  decode or whenever a dependency fails. Both logo carriers are transparent; both
  product-specific sequences are finite once, never replay or parallax, and are not
  generalized into Landometer capability. The photographs remain documentary context:
  the people shown are not represented as product users or endorsers. CityChat retains its
  complete fixed-light contrast contract without a filled Brand Blue action. Projects and partnerships is
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

## Motif handoff

`governance/motif-integration.json` is the machine boundary for selected asset IDs,
product scopes, transparent carriers, semantic jobs, runtime/fallback paths, dependency
hashes, owner approval, and the repository-side publication receipt. The immutable private
`ui-20260908-02` Drive folder is
<https://drive.google.com/drive/folders/1IZt3gTqMwfyp-t0MI4YYLMdGXswwlk6Z>.
Its selected-assets ZIP, Claude read-first file, and machine manifest were read back at
`2026-09-08T14:55:33Z` with exact byte/hash parity; all three remain owner-only and not
publicly shared. The two Drive text files were read back byte-identically again and the
folder/file permission records remained owner-only at `2026-09-08T15:47:33.404Z`. Those
Drive text files are immutable pre-attestation asset-selection snapshots; the current
publication receipt lives in repository governance and does not change any selected asset
bytes. The handoff supports reuse through the connected Drive account without claiming
background synchronization or independent publishing authority.

## Publishing

GitHub Pages source is `main` / `/ (root)`. The tracked root `.nojekyll` file is
required so the `_ds/` design-system directory is published unchanged. The `.dc.html`
suffixes are route contracts and must not be renamed.

`machineValidation` remains `pending` and `conformanceLevel` remains
`authoring_aligned`; the public pages themselves contain no customer-facing caveat or
validation language. Published-artifact source/hash checks pin `site.css` at 60,194 bytes / SHA-256
`573a3e09…` and `site.js` at 60,258 bytes / SHA-256 `06539479…`. The current local
browser gate passed 8/8 TH/EN × 390/1440 × light/dark cases with the correct build,
language and theme, no horizontal overflow or first-party page/console errors, eleven
transparent Landometer carriers, a large in-frame hero logo, restored CityChat/ijji
photographs, and contained animated brand rows. Reduced-motion, no-JavaScript, and finite
CityChat/ijji lifecycle checks also passed. GitHub Pages workflow `34242568111` published
artifact commit `c4a8fb8d2869a4aeb1a27381f3c5600370e78cec` / tree
`f5b4a8173fa160b853f7bf780b4d8d363e524b09` through Pages build `1202182321`, created
`2026-09-08T15:06:01Z` and updated successfully at `2026-09-08T15:06:38Z` after
37,391 ms. Exact live HTTP/MIME and byte parity passed 44/44 checks at
`2026-09-08T15:14:46.364Z`; an unknown route returned the exact branded local `404.html`
with HTTP 404 at `2026-09-08T15:15:09.548Z`. Production browser QA passed 18/18
representative viewport/locale/theme cases from 320 through 1920 px, including a
four-case bilingual light/dark check at 360 px, plus finite lifecycle, reduced-motion,
no-JavaScript, and screenshot checks by `2026-09-08T15:50:20.728Z`.

The immediately preceding `ui-20260908-01` release remains historical evidence: artifact
commit `f38f33a9cf00c26110e040da0967261ae98b890c`, tree
`4458e55ffbe2b43b1990f85af6d62be63f854ed8`, successful workflow `34214191898`, Pages
build `1201690364`, live byte verification at `2026-09-08T10:18:05.929Z`, and focused
production browser QA at `2026-09-08T10:25:48.050Z`. None of those receipts attests the
current release. True Chrome UI zoom, native hidden-tab behavior, a selected loading
budget, the exhaustive provider/social matrix, production accessibility, and machine
validation remain open.
