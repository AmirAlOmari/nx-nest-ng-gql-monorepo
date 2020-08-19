#!/bin/sh

COMMIT=$(git log HEAD -n 1 --pretty=format:"%H" | cut -c1-8)

TAG=${1:-$COMMIT}
IMAGE=${2:-"linkedout"}

echo '### COMMIT' $COMMIT
echo '### IMAGE' $IMAGE

echo '### Install dependencies & store cache'
ls ./node_modules > /dev/null || yarn --cache-folder .ycache

echo '### Build frontend'
yarn run nx build frontend -c production

# # ---
# echo '### DOWNLOAD CACHE IMAGES IF EXIST'
# docker pull $IMAGE:latest-frontend > /dev/null && echo $IMAGE:latest-frontend 'downloaded' || echo $IMAGE:latest-frontend 'doest not exist'
# docker pull $IMAGE:$TAG-frontend > /dev/null && echo $IMAGE:$TAG-frontend 'downloaded' || echo $IMAGE:$TAG-frontend 'doest not exist'

# ---
echo '### Build frontend image'
docker image inspect $IMAGE:$TAG-frontend > /dev/null || docker build --cache-from $IMAGE:latest-frontend -f ./apps/frontend/docker/Dockerfile -t $IMAGE:$TAG-frontend -t $IMAGE:latest-frontend --build-arg GIT_COMMIT_ARG=$(git log -n 1 HEAD --format="%h") . || exit 1

# ---
if [ -z "${DOCKER_PUSH}" ]
then
  echo '### $DOCKER_PUSH is not, skiping'
else
  echo '### PUSHING frontend DOCKER IMAGE' $IMAGE:$TAG
  time docker push $IMAGE:$TAG-frontend || exit 1
fi

# # ---
if [ -z "${GIT_PUSH}" ]
then
  echo '### $GIT_PUSH is not, skiping'
else
  echo '### PUSHING GIT COMMIT(S)'
  git push || exit 1
fi
