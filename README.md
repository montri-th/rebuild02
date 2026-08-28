# Landometer — home page rebuild03

Static, initial-HTML-first Landometer home page built on **Landometer Design System v0.9.0-r7**.
It has two sibling language versions, one shared asset set, and no third-party runtime dependency.

| File | What it is |
|---|---|
| `index.html` | entry point — redirects to the Thai page |
| `Landometer-Home-TH.dc.html` | Thai home page |
| `Landometer-Home-EN.dc.html` | English home page |
| `_ds/landometer-design-system-…/` | design-system tokens, base CSS, self-hosted webfonts |
| `site.css`, `site.js` | build-local presentation and progressive enhancement |
| `assets/` | responsive media, recorded identity derivatives with pending role approvals, testimonials, and self-hosted icon subset |
| `governance/` | Build Card, manifest, control inventory, and QA receipts |

## Publishing on GitHub Pages

Settings → Pages → Source: `main` / `/ (root)`.

`.nojekyll` is required and already present — without it Pages/Jekyll drops the
`_ds/` directory and every token, font and style 404s.

## Evidence state

- The four system figures remain in an explicit waiting state because no populated
  `figures.json` was supplied. Values and a data date must come from the same database.
- The site is public but carries truthful `noindex,nofollow` metadata while rendered-browser,
  destination-preview, and production accessibility gates remain open.
- Favicon, install-icon, social-preview, structured-data, and sitemap roles are deliberately
  omitted while their identity approval or destination test remains open.
- Cross-product closure cards are deliberately omitted because no candidate had both a
  version-pinned product-owned intent source and an approved availability status.
- The Living video is a silent, metadata-stripped H.264 excerpt with an explicit play control.
- The Pak Khlong Talat photograph is presented as Landometer material, not a CityWiki screenshot.
- Filenames must keep the `.dc.html` suffix because those are the published locale routes.

## Licence

Proposed content notice, pending confirmation: articles and guides CC BY-NC-ND 4.0;
logos, marks, portraits, and product screens all rights reserved; datasets licensed
per release.
