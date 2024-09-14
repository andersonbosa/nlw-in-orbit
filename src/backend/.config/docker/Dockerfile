FROM node:20-alpine

RUN apk add bash curl

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

USER node