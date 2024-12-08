FROM node:alpine

RUN mkdir -p /usr/src/backend && chown -R node:node /usr/src/backend

WORKDIR /usr/src/backend

# Copy packahe json and yarn lock only to optimise the image building
COPY package.json package-lock.json ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "npm", "start" ]