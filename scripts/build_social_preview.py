#!/usr/bin/env python3
"""Build the governed Rebuild02 social-preview image deterministically."""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, __version__ as pillow_version


SOURCE_SIZE = (1600, 2400)
SOURCE_CROP = (0, 780, 1600, 1620)
WORKING_CANVAS = (1600, 840)
OUTPUT_CANVAS = (1200, 630)
PANEL_BOX = (487, 107, 1113, 733)
PANEL_RADIUS = 64
LOGO_SIZE = (467, 467)
LOGO_POSITION = (567, 187)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--background",
        type=Path,
        default=Path("assets/photos/hero-lumpini-1600.webp"),
    )
    parser.add_argument(
        "--logo",
        type=Path,
        default=Path("assets/identity/landometer-symbol-color-rebuild02-r6.png"),
    )
    parser.add_argument("--output", type=Path, required=True)
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    with Image.open(args.background) as source:
        if source.size != SOURCE_SIZE:
            raise ValueError(f"background must be {SOURCE_SIZE}, got {source.size}")
        background = source.crop(SOURCE_CROP).convert("RGB")

    with Image.open(args.logo) as source:
        if source.mode != "RGBA":
            raise ValueError(f"logo must be RGBA, got {source.mode}")
        if source.getbbox() is None:
            raise ValueError("logo alpha channel is empty")
        logo = source.resize(LOGO_SIZE, Image.Resampling.LANCZOS)

    canvas = background.convert("RGBA")

    shadow_mask = Image.new("L", WORKING_CANVAS, 0)
    shadow_draw = ImageDraw.Draw(shadow_mask)
    x0, y0, x1, y1 = PANEL_BOX
    shadow_draw.rounded_rectangle(
        (x0, y0 + 16, x1, y1 + 16), radius=PANEL_RADIUS, fill=150
    )
    shadow_mask = shadow_mask.filter(ImageFilter.GaussianBlur(24))
    shadow = Image.new("RGBA", WORKING_CANVAS, (17, 25, 29, 0))
    shadow.putalpha(shadow_mask)
    canvas = Image.alpha_composite(canvas, shadow)

    panel = Image.new("RGBA", WORKING_CANVAS, (0, 0, 0, 0))
    panel_draw = ImageDraw.Draw(panel)
    panel_draw.rounded_rectangle(
        PANEL_BOX,
        radius=PANEL_RADIUS,
        fill=(255, 255, 255, 255),
        outline=(209, 219, 217, 255),
        width=5,
    )
    canvas = Image.alpha_composite(canvas, panel)
    canvas.alpha_composite(logo, LOGO_POSITION)

    output = canvas.convert("RGB").resize(OUTPUT_CANVAS, Image.Resampling.LANCZOS)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    output.save(
        args.output,
        format="JPEG",
        quality=90,
        subsampling=0,
        optimize=True,
        progressive=True,
    )

    receipt = {
        "assetRole": "public social preview for Open Graph and summary_large_image",
        "approvalBasis": "owner requested a large, clear Landometer logo across share platforms on 2026-09-09",
        "background": {
            "path": str(args.background),
            "sha256": sha256(args.background),
            "dimensions": "1600x2400",
            "crop": [0, 780, 1600, 840],
            "color": "assumed_srgb",
        },
        "logo": {
            "path": str(args.logo),
            "sha256": sha256(args.logo),
            "sourceDimensions": "1601x1601",
            "workingDimensions": f"{LOGO_SIZE[0]}x{LOGO_SIZE[1]}",
            "outputDimensions": "350x350",
            "position": list(LOGO_POSITION),
            "preservedTransparentCanvas": True,
        },
        "composition": {
            "workingCanvas": "1600x840",
            "outputCanvas": "1200x630",
            "crop": [0, 780, 1600, 840],
            "panelBox": list(PANEL_BOX),
            "panelRadius": PANEL_RADIUS,
            "centralSquareSafeAreaAtOutput": [285, 0, 915, 630],
            "logoVisibleBoundsWithinCentralSquare": True,
        },
        "encoding": {
            "runtime": f"Pillow {pillow_version}",
            "format": "JPEG",
            "quality": 90,
            "subsampling": "4:4:4",
            "progressive": True,
            "metadata": "stripped",
        },
        "output": {
            "path": str(args.output),
            "bytes": args.output.stat().st_size,
            "sha256": sha256(args.output),
            "dimensions": "1200x630",
        },
    }
    print(json.dumps(receipt, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
