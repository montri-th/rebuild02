#!/usr/bin/env python3
"""Validate Rebuild02 social-preview metadata and exact local asset bytes."""

from __future__ import annotations

import hashlib
import json
from html.parser import HTMLParser
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
ASSET = ROOT / "assets/social/landometer-rebuild02-social-logo-cb8b44fd-1200x630.jpg"
RECEIPT = ROOT / "governance/social-preview-receipt.json"
PUBLIC_URL = (
    "https://montri-th.github.io/rebuild02/assets/social/"
    "landometer-rebuild02-social-logo-cb8b44fd-1200x630.jpg"
)
EXPECTED_SHA256 = "cb8b44fd2dff568eebb9b3d17633f7b059df5d77a2318cf2607f68f175191a4a"
EXPECTED_BYTES = 247904
EXPECTED_BUILD = "ui-20260909-02"
EXPECTED_RECEIPT = "rebuild02-ui-20260909-02"


class HeadCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.meta: dict[str, str] = {}
        self.json_ld: list[str] = []
        self._json_buffer: list[str] | None = None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag == "meta" and values.get("content") is not None:
            key = values.get("property") or values.get("name")
            if key:
                self.meta[key] = values["content"] or ""
        if tag == "script" and values.get("type") == "application/ld+json":
            self._json_buffer = []

    def handle_data(self, data: str) -> None:
        if self._json_buffer is not None:
            self._json_buffer.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "script" and self._json_buffer is not None:
            self.json_ld.append("".join(self._json_buffer))
            self._json_buffer = None


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def validate_page(path: Path, expected_alt: str, structured: bool) -> None:
    html = path.read_text(encoding="utf-8")
    parser = HeadCollector()
    parser.feed(html)
    expected_meta = {
        "landometer:artifact-build": EXPECTED_BUILD,
        "landometer:release-receipt": EXPECTED_RECEIPT,
        "landometer:social-preview-revision": "share-20260909-01-cb8b44fd",
        "og:updated_time": "2026-09-09",
        "og:image": PUBLIC_URL,
        "og:image:secure_url": PUBLIC_URL,
        "og:image:type": "image/jpeg",
        "og:image:width": "1200",
        "og:image:height": "630",
        "og:image:alt": expected_alt,
        "twitter:card": "summary_large_image",
        "twitter:image": PUBLIC_URL,
        "twitter:image:alt": expected_alt,
    }
    for key, value in expected_meta.items():
        require(parser.meta.get(key) == value, f"{path.name}: {key} mismatch")
    require("landometer-rebuild02-og-1200x630.jpg" not in html, f"{path.name}: old image URL remains")

    if structured:
        require(len(parser.json_ld) == 1, f"{path.name}: expected one JSON-LD block")
        graph = json.loads(parser.json_ld[0])["@graph"]
        webpage = next(node for node in graph if node.get("@type") == "WebPage")
        require(webpage["primaryImageOfPage"]["url"] == PUBLIC_URL, f"{path.name}: JSON-LD image mismatch")
        require(webpage["primaryImageOfPage"]["width"] == 1200, f"{path.name}: JSON-LD width mismatch")
        require(webpage["primaryImageOfPage"]["height"] == 630, f"{path.name}: JSON-LD height mismatch")
        require(webpage["dateModified"] == "2026-09-09", f"{path.name}: JSON-LD date mismatch")


def main() -> None:
    require(ASSET.stat().st_size == EXPECTED_BYTES, "asset byte length mismatch")
    require(sha256(ASSET) == EXPECTED_SHA256, "asset SHA-256 mismatch")
    with Image.open(ASSET) as image:
        require(image.size == (1200, 630), "asset dimensions mismatch")
        require(image.format == "JPEG", "asset format mismatch")
        require(image.mode == "RGB", "asset color mode mismatch")
        require("icc_profile" not in image.info, "unexpected embedded ICC profile")

    validate_page(
        ROOT / "index.html",
        "โลโก้สี Landometer ขนาดใหญ่เหนือภาพเส้นขอบฟ้ากรุงเทพฯ และสวนลุมพินี",
        False,
    )
    validate_page(
        ROOT / "Landometer-Home-TH.dc.html",
        "โลโก้สี Landometer ขนาดใหญ่เหนือภาพเส้นขอบฟ้ากรุงเทพฯ และสวนลุมพินี",
        True,
    )
    validate_page(
        ROOT / "Landometer-Home-EN.dc.html",
        "Large full-colour Landometer logo over the Bangkok skyline and Lumphini Park",
        True,
    )

    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    require(sitemap.count("<lastmod>2026-09-09</lastmod>") == 2, "sitemap lastmod mismatch")

    receipt = json.loads(RECEIPT.read_text(encoding="utf-8"))
    require(receipt["output"]["path"] == ASSET.relative_to(ROOT).as_posix(), "receipt path mismatch")
    require(receipt["output"]["bytes"] == EXPECTED_BYTES, "receipt byte length mismatch")
    require(receipt["output"]["sha256"] == EXPECTED_SHA256, "receipt SHA-256 mismatch")
    require(receipt["output"]["publicUrl"] == PUBLIC_URL, "receipt URL mismatch")
    print("social preview validation: pass (3 pages, JSON-LD, sitemap, receipt, exact image bytes)")


if __name__ == "__main__":
    main()
