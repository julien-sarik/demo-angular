# build
`podman build ./rest-api -t rest-api:latest`
# run
`podman run --rm -d --name rest -p 8081:3000 rest-api:latest`