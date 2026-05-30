"""
Cut a panel out of a product scene image into a transparent PNG (panel only).
- Removes the background with rembg
- Drops faint/ghost pixels (soft shadows)
- Detects and removes the cream podium disc the panel stands on
  (the disc is a solid, much wider band at the bottom)
- Crops tight to the panel
Usage: python cutpanels.py <id>=<scene.png> [<id>=<scene.png> ...]
Output: <id>.png in this folder.
"""
import sys
import numpy as np
from rembg import remove, new_session
from PIL import Image

session = new_session("u2net")


def cut(src: str, dst: str) -> None:
    img = remove(Image.open(src), session=session).convert("RGBA")
    arr = np.array(img)
    opaque = arr[..., 3] > 50

    # tight bbox first
    ys, xs = np.where(opaque)
    if len(ys) == 0:
        img.save(dst)
        return
    img = img.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    arr = np.array(img)
    opaque = arr[..., 3] > 50

    # opaque pixel count per row ≈ how wide the object is on that row
    width = opaque.sum(axis=1)
    H = len(width)
    # panel width: typical width across the upper 55% (the slatted panel body)
    upper = width[: int(H * 0.55)]
    panel_w = np.median(upper[upper > 0]) if (upper > 0).any() else 0

    # the podium disc = wide solid rows in the lower part of the image
    if panel_w > 0:
        lower_start = int(H * 0.55)
        disc = [
            y
            for y in range(lower_start, H)
            if width[y] > panel_w * 1.55
        ]
        if disc:
            img = img.crop((0, 0, img.width, min(disc)))

    img.save(dst)
    print("saved", dst, img.size)


for arg in sys.argv[1:]:
    pid, src = arg.split("=", 1)
    cut(src, f"{pid}.png")
