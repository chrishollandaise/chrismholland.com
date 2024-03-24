#!/usr/bin/env bash
# Unsure currently if this can be done via astro integration (build done hook), but it works.
tee build-output.txt && cat build-output.txt

# poor man's grep
BUILD_TIME=$(tail -2 build-output.txt | head -1 | cut -c 18-)

CURRENT_COMMIT_HASH_FULL=$(git rev-parse HEAD)
CURRENT_COMMIT_HASH_SHORT=$(git rev-parse --short HEAD)

for FILE in $(find dist/ -name '*.html'); do
    sed -i.bak "s/%X_SECONDS%/$BUILD_TIME/g" "$FILE"
    sed -i.bak "s/%SHORT_COMMIT_HASH%/$CURRENT_COMMIT_HASH_SHORT/g" "$FILE"
    sed -i.bak "s/%FULL_COMMIT_HASH%/$CURRENT_COMMIT_HASH_FULL/g" "$FILE"
    rm "${FILE}.bak"
done

rm build-output.txt

echo "[postbuild] Finished post build."