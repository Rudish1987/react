ARG REGISTRY
FROM $REGISTRY/base/node:20.1.0-alpine as build

WORKDIR /app

RUN apk add g++ make python3

COPY package.json ./
RUN npm install --force

COPY . ./
CMD ["npm", "run", "start"]
