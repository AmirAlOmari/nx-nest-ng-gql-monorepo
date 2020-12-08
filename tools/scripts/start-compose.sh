#!/bin/sh

COMMIT=$(git log HEAD -n 1 --pretty=format:"%H" | cut -c1-8)

TAG=${1:-$COMMIT}
IMAGE=${2:-"linkedout"}

DOCKER_COMPOSE_ALIAS="TAG=${TAG} IMAGE=${IMAGE} docker-compose -f ./docker-compose.local.yml"

echo "Docker compose alias: ${DOCKER_COMPOSE_ALIAS}"

echo "${DOCKER_COMPOSE_ALIAS} \$@" >dc_alias.sh

chmod +x dc_alias.sh

./dc_alias.sh up
