#!/bin/bash
# Record an app's voice with several synthesis processes at once, then pack the bundles.
# Usage: tools/voice_all.sh <appId> [shards=4]
set -e
cd "$(dirname "$0")/.."
APP="$1"; N="${2:-4}"
node tools/enumerate_speech.js "$APP"
for i in $(seq 0 $((N - 1))); do
  VOICE_THREADS=2 tools/.venv/bin/python tools/make_voice.py "$APP" --shard=$i/$N > "/tmp/voice-$APP-$i.log" 2>&1 &
done
wait
tools/.venv/bin/python tools/make_voice.py "$APP" 2>&1 | grep -v Warning | tail -2
