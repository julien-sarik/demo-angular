# build
## oauth proxy - kong gateway
`podman build -f bff/oauth-proxy/Dockerfile -t oauth-proxy:latest`
## oauth agent - kotlin
`./bff/oauth-agent/gradlew -p ./bff/oauth-agent/ bootJar`
`podman build -f bff/oauth-agent/Dockerfile -t oauth-agent:latest`

# run
`podman network create foo`  
`podman pod create --net foo -p 8080:3000 bff`  
Generate the 32 bytes encryption key with: `openssl rand 32 | xxd -p -c 64`
## oauth proxy
`podman run --rm -d --name kong-oauth-proxy --pod new:bff -p 8080:3000 --net foo -v ./bff/oauth-proxy/kong.yml:/kong.yml -e KONG_DATABASE='off' -e KONG_DECLARATIVE_CONFIG='/kong.yml' -e KONG_PROXY_LISTEN='0.0.0.0:3000' -e KONG_LOG_LEVEL='info' -e KONG_PLUGINS='bundled,oauth-proxy' -e KONG_NGINX_PROXY_PROXY_BUFFER_SIZE='160k' -e KONG_NGINX_PROXY_PROXY_BUFFERS='64 160k' localhost/oauth-proxy`
## oauth agent
`podman run --rm -d --name oauth-agent --pod bff --net foo -e PORT=7081 -e TRUSTED_WEB_ORIGIN="http://localhost:8080" -e ISSUER="http://localhost:9080/realms/master" -e AUTHORIZE_ENDPOINT="http://localhost:9080/realms/master/protocol/openid-connect/auth" -e TOKEN_ENDPOINT='http://keycloak:8080/realms/master/protocol/openid-connect/token' -e USERINFO_ENDPOINT='http://keycloak:8080/realms/master/protocol/openid-connect/userinfo' -e LOGOUT_ENDPOINT='http://localhost:9080/realms/master/protocol/openid-connect/logout' -e CLIENT_ID='angular' -e CLIENT_SECRET='' -e REDIRECT_URI='http://localhost:8080/callback' -e POST_LOGOUT_REDIRECT_URI='http://localhost:8080' -e SCOPE='openid profile' -e COOKIE_DOMAIN='localhost' -e COOKIE_NAME_PREFIX='example' -e COOKIE_ENCRYPTION_KEY="f2f31006f908c35ed49e6166f60f18c4fa1b34b93adb7ba722e28101a28092f0" -e CORS_ENABLED='false' localhost/oauth-agent`