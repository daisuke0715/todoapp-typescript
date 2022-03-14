FROM node:alpine

WORKDIR /src

ARG app_env
ENV APP_ENV=${app_env}

COPY package.json .
RUN yarn install

EXPOSE 3000

CMD yarn start:dev