#!/bin/sh

LIKE_STR=${1}

docker rmi $(docker images --format "{{.Repository}}:{{.Tag}}" | grep $LIKE_STR)
