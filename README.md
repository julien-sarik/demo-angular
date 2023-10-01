# Angular directory architecture
### src directory
- `index.html` is the app's top level HTML template.
- `style.css` is the app's top level style sheet.
- `main.ts` is where the app start running.
- `favicon.ico` is the app's icon, just as you would find in any web site.
#### app directory
- `app.component.ts` is the source file that describes the app-root component. This is the top-level Angular component in the app. A component is the basic building block of an Angular application. The component description includes the component's code, HTML template, and styles, which can be described in this file, or in separate files.
- `app.component.css` is the style sheet for this component.
- New components are added to this directory.
#### assets directory
contains images used by the app.
### node_modules
has the node.js packages that the app uses.
### e2e
has files used to test the app.
### other files
- `angular.json` describes the Angular app to the app building tools.
- `package.json` is used by npm (the node package manager) to run the finished app.
- `tsconfig.*` are the files that describe the app's configuration to the TypeScript compiler.


# Commands
## Angular
### new 
Create a local workspace and install necessary npm dependencies into the local `node_modules` directory.
`ng new my-app`
### serve
Spin up a local server serving the local directory. The application will automatically reload if you change any of the source files.
`ng serve`
### generate
generate new component files into the `src/app` directory:  
`ng generate component home --standalone --inline-template --skip-tests`
generate a new interface into the `src/app` directory:
`ng generate interface housinglocation`
generate a housing service
`ng generate service housing --skip-tests`
## NPM
### install
`npm install` install the required dependencies into the local `node_modules` directory.
## Podman
### build
`podman build . -t angular:latest`
### run
First run the following dependencies (stop with `podman play kube pod.yml --down`):
- `podman play kube keycloak/pod.yml --net foo` to run the authorization server
- `podman play kube rest-api/pod.yml --net foo` to run the REST API secured by the authorization server.
- `./bff/oauth-agent/gradlew -p ./bff/oauth-agent/ bootJar` to build the spring-boot service and `podman play kube bff/pod.yml --net foo --context-dir=./bff --build=true` to build and run the BFF image or simply `podman play kube bff/pod.yml --net foo` if images are already built

`podman run --rm -d --name spa --net foo -v ${PWD}/src:/my-app/src angular:latest ng serve --host 0.0.0.0 --disable-host-check --configuration development`  
### develop
Invoke Angular CLI from a container by prefixing commands with `podman run --rm -v ${PWD}:/my-app angular:latest `

# architecture
```mermaid
sequenceDiagram
  participant UA as user agent
  box rgba(0, 150, 0, .2) backend for frontend
  participant BFF as BFF gateway
  participant OA as oauth agent
  participant OP as oauth proxy
  end
  participant SPA as SPA
  participant AS as authorization server
  participant REST as REST API
  rect rgba(0, 0, 255, .3)
  Note over UA: load SPA
  UA->>+BFF: GET /
  BFF->>SPA: GET SPA's static code
  BFF->-UA: load SPA
  end
  rect rgba(255, 0, 0, .3)
  Note over UA: initiate login
  UA->>+BFF: POST /oauth-agent/login/start
  BFF->>OA: POST /oauth-agent/login/start
  OA->BFF: return authorize endpoint
  BFF->-UA: return authorize endpoint
  UA->>AS: GET /authorize
  AS->UA: return login page
  UA->>AS: POST user credentials
  AS->>UA: redirect to oauth client
  UA->>+BFF: POST /oauth-agent/login/end
  BFF->>OA: POST /oauth-agent/login/end
  OA->>AS: POST authorization code
  AS->OA: return access/ID/refresh tokens
  OA->>OA: encrypt tokens
  OA->BFF: return encrypted tokens as cookies
  BFF->-UA: return encrypted tokens as cookies
  UA->>+BFF: GET /oauth-agent/claims
  BFF->>OA: GET /oauth-agent/claims
  OA->>OA: read claims from encrypted ID token cookie
  OA->BFF: return ID token claims
  BFF->-UA: return ID token claims
  UA->>UA: store ID token claims
  end
  rect rgba(0, 255, 0, .3)
  Note over UA: use APIS
  UA->>BFF: GET /api
  BFF->>OP: GET /api
  OP->>OP: read access token from encrypted cookie
  OP->>REST: proxy API request with access token
  end
  rect rgba(0, 255, 255, .3)
  Note over UA: logout
  UA->>UA: clear storage
  UA->>+BFF: POST /oauth-agent/logout
  BFF->>OA: POST /oauth-agent/logout
  OA->BFF: return authorization server's logout URL
  BFF->>-UA: return authorization server's logout URL
  UA->>AS: GET /logout
  AS->>UA: return logout page confirmation
  UA->>AS: confirm logout
  AS->>AS: end user's session
  AS->>UA: clear SSO cookies and return to post-logout URL
  end
```