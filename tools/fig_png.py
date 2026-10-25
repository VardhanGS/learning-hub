"""Render a math picture from core/engine/fig.js to a transparent PNG (for video lessons), using headless Chrome.
fig_png("Fig.clock(3, 45)") -> PIL.Image. Results are cached in tools/.fig-cache/.
"""
import hashlib, json, os, re, subprocess, tempfile, time
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
HUB = os.path.dirname(HERE)
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
CACHE = os.path.join(HERE, '.fig-cache')


def svg_of(expr):
    js = (f"const window={{}};{open(os.path.join(HUB, 'core', 'engine', 'fig.js')).read()};"
          f"process.stdout.write({expr})")
    return subprocess.run(['node', '-e', js], capture_output=True, text=True, check=True).stdout


def fig_png(expr, width=900):
    os.makedirs(CACHE, exist_ok=True)
    css = open(os.path.join(HUB, 'core', 'styles.css')).read()
    key = hashlib.sha1((expr + str(width) + hashlib.sha1(css.encode()).hexdigest()).encode()).hexdigest()[:16]
    out = os.path.join(CACHE, key + '.png')
    if not os.path.exists(out):
        svg = svg_of(expr)
        vb = [float(x) for x in re.search(r'viewBox="([^"]+)"', svg).group(1).split()]
        h = round(width * vb[3] / vb[2])
        svg = re.sub(r'width="[^"]*"', f'width="{width}"', svg, count=1)
        html = f"""<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Andika:wght@400;700&family=Fredoka:wght@500;600;700&display=swap">
<style>{css}</style><style>html,body{{background:transparent!important;margin:0}} svg{{display:block}}</style></head>
<body><div style="--c:#2b5fd0">{svg}</div></body></html>"""
        with tempfile.NamedTemporaryFile('w', suffix='.html', delete=False) as f:
            f.write(html); path = f.name
        for attempt in range(6):  # a fresh profile each time avoids Chrome's profile lock; retries ride out a busy CPU
            with tempfile.TemporaryDirectory() as prof:
                r = subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--default-background-color=00000000',
                                    '--no-first-run', '--no-default-browser-check', f'--user-data-dir={prof}', f'--window-size={max(520, width)},{h + 10}', '--virtual-time-budget=3000',
                                    f'--screenshot={out}', f'file://{path}'], capture_output=True)
            if os.path.exists(out) and os.path.getsize(out) > 0: break
            import time; time.sleep(2 + attempt * 2)
        else:
            raise RuntimeError(f'Chrome could not render {expr}: {r.stderr.decode()[-300:]}')
        os.unlink(path)
        im = Image.open(out).convert('RGBA')
        im = im.crop(im.getbbox() or (0, 0, im.width, im.height))
        im.save(out)
    return Image.open(out).convert('RGBA')


if __name__ == '__main__':
    import sys
    print(fig_png(sys.argv[1]).size)
