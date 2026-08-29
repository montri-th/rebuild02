# Rebuild02 control inventory

Artifact build: `ui-20260829-03`

Routes: `Landometer-Home-TH.dc.html`, `Landometer-Home-EN.dc.html`

Each locale contains 86 native interactive/control/media occurrences in source. Seven
links belong to the mutually exclusive `noscript` navigation, leaving 79 native
occurrences in the enhanced model. The TikTok creator placeholder is not counted as a
native control or media element; its official script creates the provider UI only after
intersection. Hidden menu/listbox state means the raw count is not a claim
that all controls are visible together.

| Family | Raw count per locale | Enhanced behavior | No-JavaScript behavior |
|---|---:|---|---|
| Links | 64 | Local sections, locale route, exact product routes, login, careers, bookmark rail, ordered social destinations, social-card exits, office map and X | Native links remain; seven-link `noscript` navigation replaces the JavaScript menu |
| Buttons | 12 | Menu and pointer-only backdrop, one light/dark theme circle, topic trigger plus six options, exact-link share, submit | JavaScript-only controls stay hidden or inert; form topic remains on its first hidden value |
| Inputs | 4 | Name, email and production-matched phone validation (9–24 characters) plus hidden topic value | Visible fields remain native; fallback submission encoding is not claimed compatible with the JSON API |
| Textareas | 1 | Required contact message | Native field remains visible |
| Native selects/details | 1 | Accessible custom listbox replaces the Safari native popup; the company history/future uses native `details`/`summary` | The story disclosure remains available without JavaScript; no native select is exposed |
| Video | 1 | The 14.803-second 720×1280 source attaches within 240 px of the viewport, then plays muted, inline and looping with no controls | Poster only because the HTML carries no initial `src` |
| Third-party iframes | 3 | Facebook timeline, Instagram profile and LinkedIn featured-post `data-src` values attach within 480 px of their own cards; each social card is width-matched to the provider surface and Facebook is capped at its supported 500 px maximum | No iframe source attaches; the four direct channel links remain available |

Source and rendered assertions:

- The skip link is the first focusable source element.
- The compact menu is a non-modal disclosure dialog. Focus moves to the panel on open;
  Escape, the transparent backdrop, the external menu/close toggle, or a local fragment
  closes it. Fragment navigation sends focus to the destination section.
- Theme and language are separate 44 px circles. The theme action toggles Light/Dark
  with an action-labelled icon; the locale control preserves query and hash.
- The mobile navbar remains 68 px high and contains only the carrier-free identity and
  circular menu control. The one-line sign-in action moves into the menu.
- The custom listbox exposes `aria-controls`, focuses the selected option on open,
  supports Arrow/Home/End/Enter/Space/Escape, and closes when focus leaves.
- The enhanced form posts visible values as JSON to
  `https://landometer.com/api/v2/public/inquiry/save`; fields reset only after 2xx and
  remain intact after an error. No `mailto:` path exists.
- The contact API accepted the GitHub Pages origin in a 2026-08-29 CORS preflight and
  rejected GET with 405. No production POST or inbox receipt is claimed in this source audit.
- Exact-link share uses Web Share when available and clipboard otherwise, with an
  `aria-live` status. The locale link preserves query and hash.
- Stories use the requested TikTok, Facebook, Instagram, LinkedIn order with monochrome
  inline-SVG brand marks. Facebook, Instagram and LinkedIn iframe sources, plus TikTok's
  official creator script, load only when each card approaches the viewport. LinkedIn
  is explicitly a featured post, localized as `โพสต์เด่น` in Thai, and is not claimed
  as a latest feed. Footer social links remain Facebook, Instagram, TikTok, LinkedIn, X.
- The bilingual company history and future direction are available through a native
  disclosure; its compact identity mark changes between full-colour and cream with the theme.
- Every `target="_blank"` link carries `rel="noopener"`.
- All 19 Material Symbols ligatures used by Rebuild02 are present in the self-hosted
  release subset. Five social marks are inline SVG and cannot expose a missing-font ligature.
