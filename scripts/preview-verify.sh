#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-3000}"
BROWSE_BIN="$ROOT/.agents/skills/gstack/browse/dist/browse"

cd "$ROOT"

echo "[preview-verify] building app"
npm run build >/tmp/sat-prep-build.log 2>&1

if lsof -tiTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "[preview-verify] stopping existing process on :$PORT"
  lsof -tiTCP:"$PORT" -sTCP:LISTEN | xargs kill >/dev/null 2>&1 || true
  sleep 1
fi

echo "[preview-verify] starting production preview on :$PORT"
npx next start -p "$PORT" >/tmp/sat-prep-preview.log 2>&1 &
SERVER_PID=$!
cleanup() {
  kill "$SERVER_PID" >/dev/null 2>&1 || true
}
trap cleanup EXIT

for _ in $(seq 1 20); do
  if curl -fsS "http://localhost:$PORT/login" >/tmp/sat-prep-preview-login.html 2>/dev/null; then
    break
  fi
  sleep 1
done

if ! test -s /tmp/sat-prep-preview-login.html; then
  echo "[preview-verify] preview server did not become ready"
  tail -40 /tmp/sat-prep-preview.log || true
  exit 1
fi

CSS_PATH="$(
  perl -ne 'print "$1\n" if m#href="([^"]*css[^"]*)"#' /tmp/sat-prep-preview-login.html | head -1
)"

if [[ -z "$CSS_PATH" ]]; then
  echo "[preview-verify] no CSS asset found in /login HTML"
  exit 1
fi

echo "[preview-verify] checking CSS asset $CSS_PATH"
curl -fsS -I "http://localhost:$PORT$CSS_PATH" >/tmp/sat-prep-preview-css-head.txt

if [[ ! -x "$BROWSE_BIN" ]]; then
  echo "[preview-verify] browse binary not found at $BROWSE_BIN"
  exit 1
fi

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

echo "[preview-verify] verifying styled page in browse"
"$BROWSE_BIN" goto "http://localhost:$PORT/login" >/tmp/sat-prep-browse-goto.txt
"$BROWSE_BIN" screenshot /tmp/sat-prep-preview-verify.png >/tmp/sat-prep-browse-shot.txt
"$BROWSE_BIN" text >/tmp/sat-prep-browse-text.txt

echo "[preview-verify] done"
echo "Preview URL: http://localhost:$PORT/login"
echo "Screenshot: /tmp/sat-prep-preview-verify.png"
