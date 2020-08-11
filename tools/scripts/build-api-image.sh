#!/bin/sh

COMMIT=$(git log HEAD -n 1 --pretty=format:"%H" | cut -c1-8)

TAG=${1:-$COMMIT}
IMAGE=${2:-"linkedout"}

echo '### COMMIT' $COMMIT
echo '### IMAGE' $IMAGE

echo '### Install dependencies & store cache'
ls ./node_modules > /dev/null || yarn --cache-folder .ycache

echo '### Build api'
yarn run nx build api -c production

# # ---
# echo '### DOWNLOAD CACHE IMAGES IF EXIST'
# docker pull $IMAGE:latest-api > /dev/null && echo $IMAGE:latest-api 'downloaded' || echo $IMAGE:latest-api 'doest not exist'
# docker pull $IMAGE:$TAG-api > /dev/null && echo $IMAGE:$TAG-api 'downloaded' || echo $IMAGE:$TAG-api 'doest not exist'

# ---
echo '### Build api image'
docker image inspect $IMAGE:$TAG-api > /dev/null || docker build --cache-from $IMAGE:latest-api -f ./apps/api/docker/Dockerfile -t $IMAGE:$TAG-api -t $IMAGE:latest-api --build-arg GIT_COMMIT_ARG=$(git log -n 1 HEAD --format="%h") . || exit 1

# ---
if [ -z "$DOCKER_PUSH" ]
then
  echo '### $DOCKER_PUSH is not, skiping'
else
  echo '### PUSHING api DOCKER IMAGE' $IMAGE:$TAG
  time docker push $IMAGE:$TAG-api || exit 1
fi

# # ---
if [ -z "$GIT_PUSH" ]
then
  echo '### $GIT_PUSH is not, skiping'
else
  echo '### PUSHING GIT COMMIT(S)'
  git push || exit 1
fi
