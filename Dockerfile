FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN yarn install
COPY . /usr/src/app
EXPOSE 3002
# RUN export NODE_ENV=production
CMD [ "yarn", "start"]
