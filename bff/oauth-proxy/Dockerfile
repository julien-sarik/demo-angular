FROM kong:3.3.1-alpine

# Fetch oauth-proxy plugin from luarocks
USER root
RUN apk add git && git config --global url."https://".insteadOf git:// && \
    git config --global advice.detachedHead false && \
    luarocks install kong-oauth-proxy   1.3.0
USER kong
