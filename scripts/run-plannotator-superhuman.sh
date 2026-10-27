#!/bin/sh
set -eu
plannotator_superhuman_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
export PLANNOTATOR_INBOX_CONNECT="${PLANNOTATOR_INBOX_CONNECT:-0}"
export PLANNOTATOR_DATA_DIR="${PLANNOTATOR_DATA_DIR:-${HOME}/.plannotator-superhuman}"
plannotator_superhuman_binary="${PLANNOTATOR_SUPERHUMAN_BINARY:-${plannotator_superhuman_root}/.local/runtime/plannotator}"
if [ ! -x "$plannotator_superhuman_binary" ]; then echo 'Build this version first; see docs/plannotator-superhuman/README.md.' >&2; exit 1; fi
if [ "$#" -eq 0 ]; then set -- inbox; fi
exec "$plannotator_superhuman_binary" "$@"
