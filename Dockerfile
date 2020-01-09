FROM node:lts-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY index.js .
CMD ["node", "index.js"]
