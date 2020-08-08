FROM node:12-alpine as code-builder

ENV NODE_ENV=production
WORKDIR /usr/src/app

# COPY ./.ycache/ ./.ycache
COPY yarn.lock .
COPY package.json .

COPY ./tools/scripts/. ./tools/scripts/
RUN mkdir -p ./tmp/apps/api/ && node ./tools/scripts/build-fake-api-prod-package-json.js > ./tmp/apps/api/package.json.fake && cp ./package.json ./package.json.bak && cp ./tmp/apps/api/package.json.fake ./package.json

RUN yarn install --production --cache-folder .ycache && rm -rf ./.ycache

COPY ./dist/apps/api/. .

ARG GIT_COMMIT_ARG=unspecified
ENV GIT_COMMIT=${GIT_COMMIT_ARG}
LABEL git_commit=${GIT_COMMIT}

RUN echo $GIT_COMMIT > CURRENT_COMMIT
RUN echo $GIT_COMMIT > BUILD_COMMIT

EXPOSE 3001

CMD [ "node", "main.js" ]
