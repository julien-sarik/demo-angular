FROM docker.io/library/eclipse-temurin:17.0.8.1_1-jdk-alpine

WORKDIR /usr/api
COPY build/libs/oauth-agent-0.0.1-SNAPSHOT.jar /usr/api/

CMD ["java", "-jar", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:8000", "/usr/api/oauth-agent-0.0.1-SNAPSHOT.jar"]
