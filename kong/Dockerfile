FROM docker.io/library/kong:3.3.1-alpine

# configure timezone
USER root
RUN apk add --no-cache tzdata
ENV TZ=Europe/Paris
USER kong