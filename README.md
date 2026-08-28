# Landometer — home page rebuild (prototype)

Static prototype of the Landometer home page, built on **Landometer Design System v0.9.0-r7**.
Two sibling language versions, one shared asset set.

| File | What it is |
|---|---|
| `index.html` | entry point — redirects to the Thai page |
| `Landometer-Home-TH.dc.html` | Thai home page |
| `Landometer-Home-EN.dc.html` | English home page |
| `_ds/landometer-design-system-…/` | design-system tokens, base CSS, self-hosted webfonts |
| `assets/` | photographs, CityMETER captures, showcase tiles |
| `support.js` | page runtime |
| `image-slot.js`, `video-slot.js` | upload placeholders for media not yet supplied |

## Publishing on GitHub Pages

Settings → Pages → Source: `main` / `/ (root)`.

`.nojekyll` is required and already present — without it Pages/Jekyll drops the
`_ds/` directory and every token, font and style 404s.

## Open items

- **Living section** — the city-life video is an upload slot awaiting the real file.
  Export as **H.264 MP4**; an HEVC `.mov` will not play in Chrome. Playback is silent by design.
- **CityWiki capture** — placeholder slot, awaiting a real screen capture.
- Filenames must keep the `.dc.html` suffix; the runtime boots from it.

## Licence

Article and guide content: CC BY-NC-ND 4.0 · Logos, marks, portraits and product
screens: all rights reserved · Datasets: licensed per release.
