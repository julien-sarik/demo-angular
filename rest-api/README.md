# introduction
This image exposes REST API from the mock json-server. The API is exposed by a Kong gateway and secured by JWT tokens signed by Keycloak (public key must be configured into the deployment).  
The mock server and the Kong gateway are running in the same pod.

# build
`podman build ./rest-api -t rest-api:latest`

# run
Run the Kong gateway into a pod:  
`podman run --rm -d --pod new:rest-api  --name kong --net foo -e "KONG_DATABASE=off" -e KONG_DECLARATIVE_CONFIG=kong.yml -e "KONG_PROXY_ACCESS_LOG=/dev/stdout" -e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" -e "KONG_PROXY_ERROR_LOG=/dev/stderr" -e "KONG_ADMIN_ERROR_LOG=/dev/stderr" -e "KONG_PROXY_LISTEN=0.0.0.0:8000" -v ${PWD}/rest-api/kong.yml:/kong.yml docker.io/kong:3.3.1-alpine`
Run the mock server in the previously created pod:  
`podman run --rm -d --pod rest-api --name rest rest-api:latest`

# uninstall
`podman pod stop rest-api`
`podman pod rm rest-api`