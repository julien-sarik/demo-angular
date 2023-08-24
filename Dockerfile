FROM node:20-alpine3.17

# install Angular
RUN npm install -g @angular/cli

# copy app files
RUN mkdir -p my-app/src
WORKDIR /my-app 
COPY src/ /my-app/src
COPY src/ angular.json package.json tsconfig.app.json tsconfig.json tsconfig.spec.json /my-app

# download dependencies
RUN npm install