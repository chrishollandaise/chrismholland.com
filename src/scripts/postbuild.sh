#!/usr/bin/env bash
# Unsure currently if this can be done via astro integration (build done hook), but it works.

BUILD_TIME=$(grep -o '\d\+\spage.\+')

echo $BUILD_TIME

CURRENT_COMMIT_HASH_FULL=$(git rev-parse HEAD)
CURRENT_COMMIT_HASH_SHORT=$(git rev-parse --short HEAD)

for FILE in $(find dist/ -name '*.html'); do
    sed -i.bak "s/%X_SECONDS%/$BUILD_TIME/g" "$FILE"
    sed -i.bak "s/%SHORT_COMMIT_HASH%/$CURRENT_COMMIT_HASH_SHORT/g" "$FILE"
    sed -i.bak "s/%FULL_COMMIT_HASH%/$CURRENT_COMMIT_HASH_FULL/g" "$FILE"
    rm "${FILE}.bak"
done

echo "[postbuild] Finished post build."