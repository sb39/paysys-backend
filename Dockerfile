FROM node:latest as build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3002
# RUN export NODE_ENV=production
CMD [ "yarn", "start"]
