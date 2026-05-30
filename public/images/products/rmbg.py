import sys
from rembg import remove, new_session
from PIL import Image

session = new_session("u2net")
src, dst = sys.argv[1], sys.argv[2]
out = remove(Image.open(src), session=session).convert("RGBA")
bbox = out.getbbox()
if bbox:
    out = out.crop(bbox)
out.save(dst)
print("saved", dst, out.size)
