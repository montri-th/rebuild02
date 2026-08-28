# Rebuild03 control inventory

Artifact build: `ui-20260829-01`

Routes: `Landometer-Home-TH.dc.html`, `Landometer-Home-EN.dc.html`

Each locale contains 77 raw interactive/control/media occurrences in source. Seven
links belong to the mutually exclusive `noscript` navigation, leaving 70 occurrences
in the enhanced model. Hidden menu/listbox state means the raw count is not a claim
that all controls are visible together.

| Family | Raw count per locale | Enhanced behavior | No-JavaScript behavior |
|---|---:|---|---|
| Links | 56 | Local sections, locale route, exact product routes, login, careers, social and Maps destinations | Native links remain; seven-link `noscript` navigation replaces the JavaScript menu |
| Buttons | 15 | Menu/backdrop/in-dialog close, three theme choices, topic trigger plus six options, exact-link share, submit | JavaScript-only controls stay hidden or inert; form topic remains on its first hidden value |
| Inputs | 4 | Name, email and production-matched phone validation plus hidden topic value | Visible fields remain native; fallback submission encoding is not claimed compatible with the JSON API |
| Textareas | 1 | Required contact message | Native field remains visible |
| Native selects/details | 0 | Accessible custom listbox replaces the Safari native popup | No disclosure or native select is exposed |
| Video | 1 | Source attaches within 240 px of the viewport, then muted inline autoplay/loop with no controls | Poster only because the HTML carries no initial `src` |

Source and rendered assertions:

- The skip link is the first focusable source element.
- The menu moves focus inside, traps Tab, closes on Escape/backdrop, and sends fragment
  focus to the destination section. Current-page links are present in the menu.
- The mobile navbar remains 68 px high; the short login CTA and menu button stay on one
  line at 320–390 px in the local Chrome checks.
- The custom listbox exposes `aria-controls`, focuses the selected option on open,
  supports Arrow/Home/End/Enter/Space/Escape, and closes when focus leaves.
- The enhanced form posts visible values as JSON to
  `https://landometer.com/api/v2/public/inquiry/save`; fields reset only after 2xx and
  remain intact after an error. No `mailto:` path exists.
- The contact API accepted the GitHub Pages origin in a 2026-08-29 CORS preflight and
  rejected GET with 405. No production POST or inbox receipt is claimed in this source audit.
- Exact-link share uses Web Share when available and clipboard otherwise, with an
  `aria-live` status. The locale link preserves query and hash.
- Every `target="_blank"` link carries `rel="noopener"`.
- All 13 icon ligatures currently used are present in the self-hosted subset and measured
  24×24 in local Chrome after the 2026-08-29 source correction.
