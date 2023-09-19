# run
`podman run --rm -d --name keycloak -p 9080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=Password1 quay.io/keycloak/keycloak:22.0.3 start-dev`