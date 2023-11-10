FROM node:21.1.0-slim AS build

WORKDIR /app

COPY .npmrc package-lock.json package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:21.1.0-slim AS prod

WORKDIR /app

COPY --from=build /app .

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]