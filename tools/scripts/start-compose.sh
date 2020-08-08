#!/bin/sh

COMMIT=$(git log HEAD -n 1 --pretty=format:"%H" | cut -c1-8)

TAG=${1:-$COMMIT}
IMAGE=${2:-"linkedout"}

TAG=${TAG} IMAGE=${IMAGE} docker-compose -f ./docker-compose.local.yml up
