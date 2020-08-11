#!/bin/sh

PROJECT=${1}

if [ -z "${PROJECT}" ]
then
  echo '$PROJECT(1) NOT SPECIFIED'
  exit 1
else
  echo '$PROJECT(1) specified'
fi

FROM_TAG=${2}
TO_TAG=${3:-$(git log HEAD -n 1 --pretty=format:"%H" | cut -c1-8)}
FROM_IMAGE=${4:-'linkedout'}
TO_IMAGE=${5:-$FROM_IMAGE}

# ---
echo '### DOWNLOAD CACHE IMAGES IF EXIST'
# docker image inspect $FROM_IMAGE:$FROM_TAG-$PROJECT > /dev/null
# docker pull $FROM_IMAGE:$FROM_TAG-$PROJECT > /dev/null
docker image inspect $FROM_IMAGE:$FROM_TAG-$PROJECT > /dev/null && echo $FROM_IMAGE:$FROM_TAG-$PROJECT 'exists' || docker pull $FROM_IMAGE:$FROM_TAG-$PROJECT > /dev/null && echo $FROM_IMAGE:$FROM_TAG-$PROJECT 'downloaded' || echo $FROM_IMAGE:$FROM_TAG-$PROJECT 'doest not exist'

# ---
CURRENT_COMMIT=$(git log -n 1 HEAD --format="%h")
echo '### CREATE "CURRENT_COMMIT" ON HOST': $CURRENT_COMMIT
echo $CURRENT_COMMIT > CURRENT_COMMIT

# ---
FROM_CONTAINER_NAME=future-$TO_TAG-$PROJECT
echo '### RUN "FROM" CONTAINER:' $FROM_CONTAINER_NAME
docker run -it -d --name $FROM_CONTAINER_NAME $FROM_IMAGE:$FROM_TAG-$PROJECT sh

# ---
echo '### COPY CUREENT "package.json" INTO' $FROM_CONTAINER_NAME
docker cp ./package.json $FROM_CONTAINER_NAME:/usr/src/app/package.json

# ---
echo '### COPY CURRENT "CURRENT_COMMIT" INTO' $FROM_CONTAINER_NAME
docker cp ./CURRENT_COMMIT $FROM_CONTAINER_NAME:/usr/src/app/CURRENT_COMMIT

# ---
echo '### COMMIT ' $FROM_CONTAINER_NAME 'AS' $TO_IMAGE:$TO_TAG-$PROJECT
docker commit -c 'CMD [ "node", "main.js" ]' -p $FROM_CONTAINER_NAME $TO_IMAGE:$TO_TAG-$PROJECT

# ---
echo '### STOP CONTAINER' $FROM_CONTAINER_NAME
docker stop $FROM_CONTAINER_NAME

# ---
echo '### RM CONTAINER' $FROM_CONTAINER_NAME
docker rm $FROM_CONTAINER_NAME

# ---
echo '### RM TEMP FILES ("CURRENT_COMMIT")'
rm ./CURRENT_COMMIT

# ---
echo '### PUSHING' $TO_IMAGE:$TO_TAG-$PROJECT
docker push $TO_IMAGE:$TO_TAG-$PROJECT || exit 1
