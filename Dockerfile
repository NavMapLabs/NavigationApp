# Dockerfile is optimized for CI/CD with github action to save runtime and image size
# need to run "npm install" and "npx expo export -p web" before building
# pull base image
FROM node:20.17.0-bookworm

LABEL Name="NavMap" \
      Version="1.0"

WORKDIR /app

# COPY package.json .

# RUN npm install
# RUN npx expo export -p web

# COPY . .

RUN npm install @expo/server
RUN npm install express
RUN npm install compression
RUN npm install morgan

COPY ./server.ts ./server.ts
COPY ./dist ./dist


EXPOSE 3000

CMD [ "node", "server.ts" ]