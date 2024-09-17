# pull base image
FROM node:20.17.0-bookworm

LABEL Name="NavMap" \
      Version="1.0"

WORKDIR /app

COPY package.json .

RUN npm install
RUN npx expo export -p web

COPY . .

EXPOSE 3000

CMD [ "node", "server.ts" ]