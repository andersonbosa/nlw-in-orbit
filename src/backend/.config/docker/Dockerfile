FROM alpine:3.20.3 AS nodejs_base

ARG _USER=node
ARG _HOME=/home/$_USER

RUN addgroup -S docker
RUN adduser \
  --disabled-password \
  --gecos "" \
  --home $_HOME \
  --ingroup docker \
  $_USER

RUN apk update && apk add --upgrade --no-cache \
  nodejs npm \
  curl 

FROM nodejs_base AS runner
ARG _USER=node

WORKDIR /home/node/app
COPY . .
RUN npm install
RUN npm i -g pm2

USER $_USER
ENTRYPOINT [ "sh", "./.config/docker/entrypoint.production.sh" ]
