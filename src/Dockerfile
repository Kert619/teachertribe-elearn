FROM node:20.9.0-alpine3.18 AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:20.9.0-alpine3.18 AS prod

WORKDIR /app

COPY --from=build /app .

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]