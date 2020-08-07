FROM nx-base:latest as builder

WORKDIR /usr/src/app

COPY . .

RUN nx run frontend:build:production

FROM nginx:1.14.1-alpine

COPY ./apps/frontend/nginx/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/src/app/dist/apps/frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
