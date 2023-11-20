FROM node:21.1.0-slim

WORKDIR /app

COPY src/package.json .

RUN npm install

COPY ./src .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]