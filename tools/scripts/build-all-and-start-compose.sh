#!/bin/sh

COMMIT=$(git log HEAD -n 1 --pretty=format:"%H" | cut -c1-8)

TAG=${1:-$COMMIT}
IMAGE=${2:-"linkedout"}

sh ./tools/scripts/build-all.sh $TAG $IMAGE

sh ./tools/scripts/start-compose.sh $TAG $IMAGE
