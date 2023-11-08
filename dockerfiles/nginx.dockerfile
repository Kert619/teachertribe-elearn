FROM nginx:stable-alpine3.17

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf