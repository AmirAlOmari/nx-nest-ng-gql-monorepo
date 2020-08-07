FROM nginx:1.14-alpine

## Copy our default nginx config
COPY ./apps/frontend/nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY ./dist/apps/frontend /usr/share/nginx/html

ARG GIT_COMMIT_ARG=unspecified
ENV GIT_COMMIT=${GIT_COMMIT_ARG}
LABEL git_commit=${GIT_COMMIT}

RUN echo $GIT_COMMIT > CURRENT_COMMIT
RUN echo $GIT_COMMIT > BUILD_COMMIT

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
