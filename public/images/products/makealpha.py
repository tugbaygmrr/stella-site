import sys
import numpy as np
from PIL import Image

src = sys.argv[1]
dst = sys.argv[2]
im = Image.open(src).convert("RGBA")
arr = np.array(im)
r, g, b = arr[..., 0].astype(int), arr[..., 1].astype(int), arr[..., 2].astype(int)
mn = np.minimum(np.minimum(r, g), b)
alpha = np.where(mn > 247, 0, 255).astype(np.uint8)
band = (mn > 235) & (mn <= 247)
alpha[band] = ((247 - mn[band]) / 12 * 255).astype(np.uint8)
arr[..., 3] = alpha
out = Image.fromarray(arr, "RGBA")
bbox = out.getbbox()
if bbox:
    out = out.crop(bbox)
out.save(dst)
print("saved", dst, out.size)
