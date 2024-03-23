#!/usr/bin/env bash
# Unsure currently if this can be done via astro integration (build done hook), but it works.

BUILD_TIME=`grep -o '\d\spage.*'`
CURRENT_COMMIT_HASH_FULL=`git rev-parse HEAD`
CURRENT_COMMIT_HASH_SHORT=`git rev-parse --short HEAD`


for i in $(find dist/* | grep .html); do
  sed -i "s/%X_SECONDS%/$BUILD_TIME/g" "$i"
  sed -i "s/%SHORT_COMMIT_HASH%/$CURRENT_COMMIT_HASH_SHORT/g" "$i"
  sed -i "s/%FULL_COMMIT_HASH%/$CURRENT_COMMIT_HASH_FULL/g" "$i"
done

echo "\n[postbuild] Finished post build."