# Rebuild02 control inventory

Artifact build: `ui-20260830-10`

Routes: `Landometer-Home-TH.dc.html`, `Landometer-Home-EN.dc.html`

Each locale contains 112 native interactive/control/media occurrences in source. Seven
links belong to the mutually exclusive `noscript` navigation, leaving 105 native
occurrences in the enhanced model. The TikTok creator placeholder is not counted as a
native control or media element; its official script creates the provider UI only after
light-theme intersection. Two additional `tabindex="0"` horizontal rails—Location Intelligence and
testimonials—make the all-focusable totals 114 raw and 107 enhanced. Runtime loop clones
are `aria-hidden`, inert, non-focusable and excluded from these counts. Hidden menu/listbox state means the raw count is not a claim
that all controls are visible together.

| Family | Raw count per locale | Enhanced behavior | No-JavaScript behavior |
|---|---:|---|---|
| Links | 86 | Local sections, locale route, six Location Intelligence conversation routes, five product conversation routes, product evidence routes, one tailored-service route, two CityWiki source/license credits, login, careers, bookmark rail, ordered social destinations, four same-origin dark channel-card exits, social-card exits, office map, clickable office email and outbound X profile | Native links remain; seven-link `noscript` navigation replaces the JavaScript menu |
| Buttons | 16 | Menu and pointer-only backdrop, one light/dark theme circle, topic trigger plus ten options, exact-link share, submit | JavaScript-only controls stay hidden or inert; form topic remains on its first hidden value |
| Inputs | 4 | Name, email and production-matched phone validation (9–24 characters) plus hidden topic value | Visible fields remain native; fallback submission encoding is not claimed compatible with the JSON API |
| Textareas | 1 | Required contact message | Native field remains visible |
| Native selects/details | 1 | Accessible custom listbox replaces the Safari native popup; the company history/future uses native `details`/`summary` | The story disclosure remains available without JavaScript; no native select is exposed |
| Video | 1 | The 14.803-second 720×1280 source attaches within 240 px of the viewport, then plays muted, inline and looping with no controls | Poster only because the HTML carries no initial `src` |
| Third-party iframes | 3 | In light theme, Facebook timeline, Instagram profile and LinkedIn featured-post `data-src` values attach within 480 px; TikTok uses its official lazy script. An initial dark theme attaches none and shows same-origin DS channel cards instead | No iframe source or provider script attaches; direct channel links remain available, including X |

Source and rendered assertions:

- The skip link is the first focusable source element.
- The compact menu is a non-modal disclosure dialog. Focus moves to the panel on open;
  Escape, the transparent backdrop, the external menu/close toggle, or a local fragment
  closes it. Fragment navigation sends focus to the destination section.
- Theme and language are separate 44 px circles. The theme action toggles Light/Dark
  with an action-labelled icon; the locale control preserves query and hash.
- The navbar begins at 76 px desktop / 68 px mobile, scales the complete row to a
  29/27 px calm state after a downward scroll, and returns to prominence on upward
  scroll, pointer/focus intent or menu open. Mobile contains only the carrier-free identity and circular menu control;
  the one-line sign-in action moves into the menu. Both CTA placements retain the real
  capsule beneath a pointer-inert, aria-hidden text sweep. Reduced motion stays prominent
  and removes that loop.
- The custom listbox exposes `aria-controls`, focuses the selected option on open,
  supports Arrow/Home/End/Enter/Space/Escape, and closes when focus leaves.
  Selected and hover states use surface/elevation changes without a coloured accent rail.
- The enhanced form posts visible values as JSON to
  `https://landometer.com/api/v2/public/inquiry/save`; fields reset only after 2xx and
  remain intact after an error. The separate 44 px office-email link opens
  `mailto:hello@landometer.com` after explicit visitor action.
- The contact API accepted the GitHub Pages origin in a 2026-08-29 CORS preflight and
  rejected GET with 405. No production POST or inbox receipt is claimed in this source audit.
- Exact-link share uses Web Share when available and clipboard otherwise, with an
  `aria-live` status. The locale link preserves query and hash.
- Stories use TikTok, Facebook, Instagram and LinkedIn in a responsive editorial grid,
  with TikTok and LinkedIn on full-width rows and Facebook/Instagram paired only while
  their provider surfaces remain readable. Facebook, Instagram and LinkedIn iframe
  sources plus the TikTok official script load only in light theme when each card approaches
  the viewport. An initial dark theme initializes no provider surface and displays a
  same-origin DS channel card for each platform. Switching to dark after a light-theme load
  hides the provider surface without claiming to terminate its existing network activity.
  Instagram height follows the measured card width. LinkedIn
  is explicitly a featured post, localized as `โพสต์เด่น` in Thai, and is not claimed
  as a latest feed. The X timeline embed is omitted because its provider widget rendered
  a hidden zero-size iframe at tested desktop and mobile widths. Footer social links remain
  Facebook, Instagram, TikTok, LinkedIn and X.
- Hero media uses a 48 px overscan layer for a scroll-linked translation capped at ±20 px,
  independent of its ambient pan. Substantial static content imagery in pillar, Location
  Intelligence, product, tailored-service and CityMETER showcase frames uses a separately
  bounded scroll-linked layer. Brand marks, provider surfaces, video and testimonial identity
  assets are excluded. Reduced-motion users receive none of these movements.
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
  product and social logos remain
  identity assets rather than UI glyphs.
- Location Intelligence exposes six image-led, benefit-specific conversation routes in
  one localized, keyboard-focusable scroll-snap rail. Testimonials retain six semantic
  source cards in their own rail. For each rail, JavaScript creates one sanitized,
  `aria-hidden`, inert six-card cycle before and after the originals, then normalizes after
  pointer, touch or arrow-key travel so the sequence loops in either direction. A resize
  preserves the current logical source card. Proof of demand remains
  framed as an estimate from city-data signals and directs the reader toward field
  validation rather than asserting measured demand.
- Products and Services exposes five product paths with consistent capsule conversation
  CTAs and an explicit fit cue. Desktop uses a 2+3 hierarchy: CityMETER and CityChat lead,
  followed by ijji, CityWiki and land/property tools. The restored CityMETER card pairs the
  r6 symbol and typed Landometer Arvo wordmark with a separate CityMETER heading; CityWiki
  uses its Arvo product wordmark, and land tools retains the shared lockup geometry. CityMETER
  restores the responsive 960/1600 AVIF/WebP Business Dynamics family. CityWiki and land
  tools keep exact r8 PNG examples; CityWiki carries two linked source/license credits and
  the tax simulator is visibly labelled as a legacy asset
  retrieved on 26 Aug 2026. CityChat and ijji use exact official marks directly on their
  card surfaces. CityChat owns a fixed-light foreground contract and an outlined action,
  with no filled Brand Blue CTA. Projects/partnerships is separated as an image-led tailored
  service route. Product-specific copy is not generalized across Landometer.
