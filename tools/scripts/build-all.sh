#!/bin/sh

COMMIT=$(git log HEAD -n 1 --pretty=format:"%H" | cut -c1-8)

TAG=${1:-$COMMIT}
IMAGE=${2:-"linkedout"}

mkdir -p ./tmp/$IMAGE

sh ./tools/scripts/build-api-image.sh $TAG $IMAGE > ./tmp/$IMAGE:$TAG-api-build.log 2>&1 &
sh ./tools/scripts/build-frontend-image.sh $TAG $IMAGE > ./tmp/$IMAGE:$TAG-frontend-build.log 2>&1 &

wait
