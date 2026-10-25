#!/usr/bin/env python3
"""Draw an app icon: emoji on a rounded square of the app's color, with an optional short label.
Usage (from build.py): make_icons.py '{"emoji": "🧪", "label": "M2", "color": "#2b5fd0", "out": "dist/x/icons"}'
"""
import json, os, sys
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
EMOJI_FONT = '/System/Library/Fonts/Apple Color Emoji.ttc'
LABEL_FONT = os.path.join(HERE, 'fonts', 'Fredoka-VF.ttf')


def emoji_img(ch, size):
    f = ImageFont.truetype(EMOJI_FONT, 160)  # Apple Color Emoji only renders at its bitmap size
    im = Image.new('RGBA', (180, 180), (0, 0, 0, 0))
    ImageDraw.Draw(im).text((90, 90), ch, font=f, anchor='mm', embedded_color=True)
    im = im.crop(im.getbbox() or (0, 0, 180, 180))
    im.thumbnail((size, size), Image.LANCZOS)
    return im


def main():
    a = json.loads(sys.argv[1])
    os.makedirs(a['out'], exist_ok=True)
    S = 1024
    base = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(base)
    d.rounded_rectangle((0, 0, S - 1, S - 1), radius=0, fill=a['color'])  # square: iOS/Android apply their own mask
    d.ellipse((S * 0.16, S * 0.12, S * 0.84, S * 0.80), fill=(255, 255, 255, 235))
    label = a.get('label') or ''
    e = emoji_img(a['emoji'], int(S * (0.42 if label else 0.48)))
    cy = 0.44 if label else 0.46
    base.alpha_composite(e, (int(S / 2 - e.width / 2), int(S * cy - e.height / 2)))
    if label:
        font = ImageFont.truetype(LABEL_FONT, 150) if os.path.exists(LABEL_FONT) else ImageFont.load_default()
        d.text((S / 2, S * 0.89), label, font=font, anchor='mm', fill='white')
    for size in (180, 192, 512):
        base.resize((size, size), Image.LANCZOS).convert('RGB').save(os.path.join(a['out'], f'icon-{size}.png'))


if __name__ == '__main__':
    main()
