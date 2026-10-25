#!/bin/bash
# Phone-size screenshots of an app with headless Chrome, in light and dark mode.
# Usage: tools/shots.sh <appId> "<subject>.<skill>.<level>.<type>[.answer|.wrong|.demo]" ...   (server: tools/serve.py)
#        "run:<script>|<js after>" runs a test script inside the app first (e.g. run:maprun.js|__hub.go('mapReport'))
APP="$1"; shift
OUT="$(dirname "$0")/../samples/shots"; mkdir -p "$OUT"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for spec in "$@"; do
  for scheme in light dark; do
    pref=$([ "$scheme" = dark ] && echo 0 || echo 1)
    name="$OUT/${APP}_${spec//./-}_${scheme}.png"
    # Headless Chrome will not make a window narrower than ~500px, so the app runs in a 390px frame and is cropped.
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=520,1000 --force-device-scale-factor=2 \
      --blink-settings=preferredColorScheme=$pref --virtual-time-budget=4000 \
      --screenshot="$name" "http://localhost:4190/_test/shot-frame.html#$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1],safe=''))" "$( [[ "$spec" == run:* ]] && echo "/$APP/#debug|/_test/${spec#run:}" || echo "/$APP/#shot=$spec")")" >/dev/null 2>&1
    "$(dirname "$0")/.venv/bin/python" -c "from PIL import Image;import sys;im=Image.open(sys.argv[1]);im.crop((0,0,780,2000)).save(sys.argv[1])" "$name"
    echo "$name"
  done
done
