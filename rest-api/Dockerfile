FROM node:20-alpine3.17

# install REST API mock
RUN npm install -g json-server

# copy JSON data
COPY data.json /data.json

CMD ["json-server", "--watch", "data.json", "--host", "0.0.0.0"]