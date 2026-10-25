#!/usr/bin/env python3
"""Build each app into dist/<appId>/ from core/ + apps/<appId>/, plus the hub page at dist/index.html.

Usage: python3 tools/build.py            (all apps)
       python3 tools/build.py hubdemo    (one app)
Each app gets its own index.html, manifest.json, service worker, cache name (content hash), and icons.
"""
import hashlib, json, os, shutil, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
CORE = os.path.join(ROOT, 'core')
DIST = os.path.join(ROOT, 'dist')
KATEX = '0.18.11'
KATEX_CDN = f'https://cdn.jsdelivr.net/npm/katex@{KATEX}/dist'
KATEX_FONTS = ('AMS-Regular Caligraphic-Bold Caligraphic-Regular Fraktur-Bold Fraktur-Regular Main-Bold Main-BoldItalic '
               'Main-Italic Main-Regular Math-BoldItalic Math-Italic SansSerif-Bold SansSerif-Italic SansSerif-Regular '
               'Script-Regular Size1-Regular Size2-Regular Size3-Regular Size4-Regular Typewriter-Regular').split()

# Core scripts in load order. data/voice-clips.js and the app's data files are slotted in by build().
CORE_JS = ['core/sound.js', 'core/speech.js', 'VOICE_CLIPS', 'core/voice.js', 'core/cloud.js', 'core/U.js', 'core/engine/fig.js']


def read_config(app_id):
    """Evaluate apps/<id>/config.js in node and return window.APP as a dict."""
    path = os.path.join(ROOT, 'apps', app_id, 'config.js')
    js = f"const window={{}};{open(path).read()};process.stdout.write(JSON.stringify(window.APP))"
    out = subprocess.run(['node', '-e', js], capture_output=True, text=True, check=True).stdout
    return json.loads(out)


def copy(src, dst):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2(src, dst)


def copytree(src, dst):
    if os.path.isdir(src):
        shutil.copytree(src, dst, dirs_exist_ok=True)


def build(app_id):
    cfg = read_config(app_id)
    assert cfg['id'] == app_id, f"config id {cfg['id']} != folder {app_id}"
    src = os.path.join(ROOT, 'apps', app_id)
    out = os.path.join(DIST, app_id)
    if os.path.isdir(out):
        shutil.rmtree(out)
    os.makedirs(out)

    feats = cfg.get('features', {})
    modes = [f'core/modes/{m}.js' for m in (['map-core', 'map'] if feats.get('map') else []) + (['fluency'] if feats.get('fluency') else []) + (['sat'] if feats.get('sat') else [])]
    # 'otherApp:file.js' borrows a content file from another app (copied into this app's data/ folder)
    data = [f"data/{f.split(':')[-1]}" for f in cfg.get('data', [])]
    if os.path.exists(os.path.join(src, 'data', 'videos.js')) or cfg.get('videosFrom'):
        data.append('data/videos.js')
    scripts = ['config.js'] + [s if s != 'VOICE_CLIPS' else 'data/voice-clips.js' for s in CORE_JS] + modes + data + ['core/app.js']

    # files
    copy(os.path.join(src, 'config.js'), os.path.join(out, 'config.js'))
    for s in scripts:
        if s.startswith('core/'):
            copy(os.path.join(ROOT, s), os.path.join(out, s))
    copy(os.path.join(CORE, 'styles.css'), os.path.join(out, 'core', 'styles.css'))
    copytree(os.path.join(src, 'data'), os.path.join(out, 'data'))
    for f in cfg.get('data', []):
        if ':' in f:
            other, name = f.split(':')
            # 'elaquest:x.js' reads ELA Quest's own file (Documents/ELAQuest/data), which is never modified
            base = os.path.join(os.path.dirname(ROOT), 'ELAQuest', 'data') if other == 'elaquest' else os.path.join(ROOT, 'apps', other, 'data')
            copy(os.path.join(base, name), os.path.join(out, 'data', name))
    if cfg.get('videosFrom'):  # borrow another app's video lessons
        other = os.path.join(ROOT, 'apps', cfg['videosFrom'])
        copytree(os.path.join(other, 'videos'), os.path.join(out, 'videos'))
        # catalog: this app's own videos first, then the borrowed ones
        def cat(p):
            if not os.path.exists(p): return []
            t = open(p).read(); return json.loads(t[t.index('['):t.rindex(']') + 1])
        merged = cat(os.path.join(src, 'data', 'videos.js')) + cat(os.path.join(other, 'data', 'videos.js'))
        with open(os.path.join(out, 'data', 'videos.js'), 'w') as f:
            f.write('// Built by tools/build.py: this app\'s videos plus the ones it borrows.\nconst VIDEOS = ' + json.dumps(merged, indent=1, ensure_ascii=False) + ';\n')
    if not os.path.exists(os.path.join(out, 'data', 'voice-clips.js')):
        with open(os.path.join(out, 'data', 'voice-clips.js'), 'w') as f:
            f.write('// No recorded voice yet (run tools/make_voice.py); the device voice is used instead.\nconst VOICE_BUNDLES = [];\nconst VOICE_CLIPS = {};\n')
    for d in ('voice', 'videos'):
        copytree(os.path.join(src, d), os.path.join(out, d))
    icons = make_icons(cfg, os.path.join(out, 'icons'))

    theme = cfg.get('theme', {})
    primary, bg = theme.get('primary', '#2b5fd0'), theme.get('bg', '#f5f8fd')
    katex = bool(feats.get('katex'))
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="{primary}">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-title" content="{cfg.get('short', cfg['name'])}">
  <link rel="apple-touch-icon" href="icons/icon-180.png">
  <link rel="icon" href="icons/icon-192.png">
  <link rel="manifest" href="manifest.json">
  <title>{cfg['name']}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Andika:wght@400;700&family=Fredoka:wght@500;600;700&display=swap">
  {f'<link rel="stylesheet" href="{KATEX_CDN}/katex.min.css">' if katex else ''}
  <link rel="stylesheet" href="core/styles.css">
</head>
<body>
  <div id="app"></div>
  {f'<script src="{KATEX_CDN}/katex.min.js"></script>' if katex else ''}
""" + '\n'.join(f'  <script src="{s}"></script>' for s in scripts) + '\n</body>\n</html>\n'
    with open(os.path.join(out, 'index.html'), 'w') as f:
        f.write(html)

    manifest = {
        'name': cfg['name'], 'short_name': cfg.get('short', cfg['name']), 'description': cfg.get('tagline', ''),
        'id': f'./?app={app_id}', 'start_url': './index.html', 'scope': './', 'display': 'standalone',
        'background_color': bg, 'theme_color': primary,
        'icons': [{'src': f'icons/{n}', 'sizes': s, 'type': 'image/png', **({'purpose': 'any maskable'} if s == '512x512' else {})} for n, s in icons],
    }
    with open(os.path.join(out, 'manifest.json'), 'w') as f:
        json.dump(manifest, f, indent=2)

    # service worker: precache the app shell (not the voice bundles or videos, which are cached as they are used)
    assets = ['./', './index.html', './manifest.json', './core/styles.css'] + [f'./{s}' for s in scripts] + [f'./icons/{n}' for n, _ in icons]
    if katex:
        assets += [f'{KATEX_CDN}/katex.min.js', f'{KATEX_CDN}/katex.min.css'] + [f'{KATEX_CDN}/fonts/KaTeX_{n}.woff2' for n in KATEX_FONTS]
    h = hashlib.sha256()
    for a in assets:
        p = os.path.join(out, a[2:]) if a.startswith('./') and a not in ('./',) else None
        h.update(a.encode())
        if p and os.path.isfile(p):
            h.update(open(p, 'rb').read())
    for d in ('voice',):
        for name in sorted(os.listdir(os.path.join(out, d))) if os.path.isdir(os.path.join(out, d)) else []:
            h.update(name.encode() + str(os.path.getsize(os.path.join(out, d, name))).encode())
    cache = f'{app_id}-{h.hexdigest()[:10]}'
    sw = open(os.path.join(CORE, 'sw.template.js')).read()
    sw = sw.replace('__APP_ID__', app_id).replace('__CACHE__', cache).replace('__ASSETS__', json.dumps(assets, indent=2))
    with open(os.path.join(out, 'sw.js'), 'w') as f:
        f.write(sw)
    print(f'built dist/{app_id}/  ({len(scripts)} scripts, cache {cache})')
    return cfg


def make_icons(cfg, out_dir):
    """Rounded-square icon: the app's emoji on its theme color, with a short label. Needs Pillow (tools/.venv)."""
    os.makedirs(out_dir, exist_ok=True)
    py = os.path.join(HERE, '.venv', 'bin', 'python')
    args = json.dumps({'emoji': cfg.get('icon', '⭐'), 'label': cfg.get('iconLabel', ''), 'color': cfg.get('theme', {}).get('primary', '#2b5fd0'), 'out': out_dir})
    subprocess.run([py, os.path.join(HERE, 'make_icons.py'), args], check=True)
    return [('icon-180.png', '180x180'), ('icon-192.png', '192x192'), ('icon-512.png', '512x512')]


def build_hub(cfgs):
    out = DIST
    copytree(os.path.join(ROOT, 'hub'), out)
    make_icons({'icon': '🧭', 'iconLabel': '', 'theme': {'primary': '#2b5fd0'}}, os.path.join(out, 'hub-icons'))
    open(os.path.join(out, '.nojekyll'), 'w').close()
    # local test helpers (deploy.sh never publishes _test/)
    os.makedirs(os.path.join(out, '_test'), exist_ok=True)
    for f in ('playthrough.js', 'shot-frame.html', 'maprun.js', 'flurun.js'):
        shutil.copy2(os.path.join(HERE, f), os.path.join(out, '_test', f))
    print('built dist/index.html (hub)')


if __name__ == '__main__':
    ids = sys.argv[1:] or sorted(d for d in os.listdir(os.path.join(ROOT, 'apps')) if os.path.exists(os.path.join(ROOT, 'apps', d, 'config.js')))
    cfgs = [build(i) for i in ids]
    build_hub(cfgs)
