FROM nx-base:latest as code-builder

WORKDIR /usr/src/app

COPY . .

RUN nx run api:build:production

FROM node:12 as deps-builder

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=code-builder /usr/src/app/package*.json ./

RUN npm ci

FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=deps-builder /usr/src/app/node_modules ./node_modules
COPY --from=code-builder /usr/src/app/dist/apps/api/* ./

EXPOSE 3333

CMD [ "node", "main.js" ]
