# build
## oauth proxy - kong
See `spa-deployments` repo
## oauth agent - express
See `oauth-agent-node-express` repo

# run
`podman network create foo`  
`podman pod create --net foo -p 8080:3000 bff`  
Generate the 32 bytes encryption key with: `openssl rand 32 | xxd -p -c 64`
## oauth agent
`podman run --rm -d --name oauth-agent --pod bff --net foo -e PORT=7081 -e TRUSTED_WEB_ORIGIN="http://localhost:8080" -e ISSUER="http://localhost:9080/realms/master" -e AUTHORIZE_ENDPOINT="http://localhost:9080/realms/master/protocol/openid-connect/auth" -e TOKEN_ENDPOINT='http://keycloak:8080/realms/master/protocol/openid-connect/token' -e USERINFO_ENDPOINT='http://keycloak:8080/realms/master/protocol/openid-connect/userinfo' -e LOGOUT_ENDPOINT='http://localhost:9080/realms/master/protocol/openid-connect/logout' -e CLIENT_ID='angular' -e CLIENT_SECRET='' -e REDIRECT_URI='http://localhost:8080/callback' -e POST_LOGOUT_REDIRECT_URI='http://localhost:8080' -e SCOPE='openid profile' -e COOKIE_DOMAIN='localhost' -e COOKIE_NAME_PREFIX='example' -e COOKIE_ENCRYPTION_KEY="f2f31006f908c35ed49e6166f60f18c4fa1b34b93adb7ba722e28101a28092f0" -e CORS_ENABLED='false' localhost/oauthagent:kotlin`
## kong proxy
See `spa-deployments` repo