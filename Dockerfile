# avoid using alpine, or lts
FROM node:alpine3.17

USER node
WORKDIR /usr/src/app
COPY --chown=node:node . .



RUN npm ci --only=production

CMD ["dumb-init", "node", "server.js"]