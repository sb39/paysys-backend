FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN export NODE_ENV=production

FROM nginx as production-stage
RUN mkdir /app
RUN npm start
COPY nginx.conf /etc/nginx/nginx.conf