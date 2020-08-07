COMMIT=$(git log HEAD -n 1 --pretty=format:"%H" | cut -c1-8)

TAG=${1:-$COMMIT}
IMAGE=${2:-"linkedout"}

mkdir -p ./tmp/$IMAGE

sh ./tools/scripts/build-api-image.sh $TAG $IMAGE 2> ./tmp/$IMAGE:$TAG-api-build.error.log > ./tmp/$IMAGE:$TAG-api-build.log &
sh ./tools/scripts/build-frontend-image.sh $TAG $IMAGE 2> ./tmp/$IMAGE:$TAG-frontend-build.error.log > ./tmp/$IMAGE:$TAG-frontend-build.log &

wait

TAG=$TAG IMAGE=$IMAGE docker-compose -f ./docker-compose.local.yml up
