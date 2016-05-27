#!/bin/sh

TARGET_DIR=lib/johnmichel/Library-Detector-for-Chrome
TARGET_FILE="$TARGET_DIR"/libraries.js
TEMP_FILE="$TARGET_DIR"/libraries.original.js

mkdir -p "$TARGET_DIR"

# Download current version of external library
# Full credit to https://github.com/johnmichel/Library-Detector-for-Chrome/
wget -O "$TEMP_FILE" https://raw.githubusercontent.com/johnmichel/Library-Detector-for-Chrome/master/library/libraries.js


# Prepare the libraries file.
## 0. Copy downloaded file.
cp "$TEMP_FILE" "$TARGET_FILE"
## 1. Remove parameter "win" for the test functions and set it inside instead.
sed -i 's/test:.*/test: function() {\n            var win = window;/g' $TARGET_FILE
## 2. Export named variable as module.exports to have it available.
VAR_NAME=$(head -n 1 $TARGET_FILE | sed -e 's/var //' | sed -e 's/ = {//')
echo "\nmodule.exports = $VAR_NAME;" >> $TARGET_FILE
