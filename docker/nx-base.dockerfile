FROM node:12

WORKDIR /usr/src/app

RUN npm i -g @nrwl/cli @angular/cli

COPY ./angular.json ./
COPY ./nx.json ./
COPY ./package*.json ./

RUN npm ci

CMD [ "echo", "'installed ;)'" ]
