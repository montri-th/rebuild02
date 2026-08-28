# Rebuild03 control inventory

Artifact build: `ui-20260828-01`

Routes: `Landometer-Home-TH.dc.html`, `Landometer-Home-EN.dc.html`

Source-inspected inventory: 76 interactive or selectable control occurrences per locale
across the mutually exclusive enhanced and `noscript` navigation branches. The source
count is not presented as a claim that all 76 are visible at once. The enhanced source
model contains 70 occurrences (51 links). The reachable no-JavaScript model contains
64 occurrences (50 links); the raw no-JavaScript source union is 66/52 because it also
contains the permanently hidden contact fallback and its link. Rendered visibility and
outcomes remain an open gate.

| Family | Count per locale | Reachable state or outcome | No-JavaScript behavior |
|---|---:|---|---|
| Links | 57 | In-page target, locale route, mail client, or explicit external destination | Native link behavior remains available; the visible `noscript` navigation replaces the hidden enhanced menu |
| Buttons | 6 | Open/close menu, cycle theme, copy exact link, copy tool package, prepare email | Menu/theme/copy enhancement is unavailable; contact form falls through to its `mailto:` action |
| Text inputs | 5 | Read-only exact link, progressively editable Maps query, name, email, and phone | Maps query stays readonly and matches its fixed link; other values remain visible/selectable and native form submission remains available |
| Textareas | 2 | Read-only evidence package and contact message | Values remain visible/selectable; message is included in native form submission |
| Select | 1 | Contact topic reaches one selected value | Native select and form behavior |
| Disclosure summaries | 4 | Closed/open evidence, route, and limitation details | Native `details` behavior |
| Video | 1 | Poster, play, pause, seek, volume-disabled track, fullscreen where supported | Native controls and poster; no autoplay or loop |

Additional source assertions:

- The first focusable element is the skip link to `#main`.
- The menu dialog moves focus inside, traps Tab, restores its opener after Escape/backdrop/Close, and transfers focus to a fragment target after navigation.
- The locale link preserves the current hash.
- Copy controls have selectable exact-text fallbacks and `aria-live` status regions.
- The Maps handoff requires an explicit user click, enables query editing only after JavaScript is ready, and has a labelled copy fallback; without JavaScript its displayed readonly query agrees with the fixed URL.
- The contact action is user-activated and prepares a visible email; it does not claim server delivery.
- All six neighbourhood chips are non-interactive labels; they do not enter the action-geometry count.
- Button press depth uses the governed 120 ms / 2 px feedback tokens; reduced motion disables it.
- External links that open a new tab carry `rel="noopener"`.

Rendered-only checks remain open because the in-app browser was blocked by administrative policy: focus-ring visibility, actual target boxes, focus order, clipping, and control outcomes in a real live browser.
