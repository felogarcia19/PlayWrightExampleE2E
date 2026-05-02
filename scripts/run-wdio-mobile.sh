#!/bin/bash
# Script to start Android emulator and run WebdriverIO tests
# Usage: ./scripts/run-wdio-mobile.sh
# or (Windows): powershell -ExecutionPolicy Bypass -File scripts/run-wdio-mobile.ps1

set -e

ANDROID_HOME="${ANDROID_HOME:-$HOME/Library/Android/sdk}"
EMU_PATH="$ANDROID_HOME/emulator/emulator"
AVD_NAME="${AVD_NAME:-Prelude_Pixel_7}"

echo "Starting Android emulator: $AVD_NAME..."
$EMU_PATH -avd "$AVD_NAME" -no-snapshot-save -no-boot-anim &
EMU_PID=$!

echo "Waiting 10s for emulator to boot..."
sleep 10

echo "Running WDIO tests..."
npm run wdio:test || TEST_RESULT=$?

echo "Killing emulator..."
kill $EMU_PID || true

if [ "$TEST_RESULT" != "" ]; then
  exit $TEST_RESULT
fi
