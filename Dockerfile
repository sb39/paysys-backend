FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY ./ .
RUN export NODE_ENV=production

FROM nginx as production-stage
RUN mkdir /app
COPY nginx.conf /etc/nginx/nginx.conf
RUN yarn start