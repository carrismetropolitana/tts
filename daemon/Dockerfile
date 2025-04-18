FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN npm install \
    && npm cache clean --force

RUN npx @helperkits/bumper bump

RUN npm run build
RUN npm prune --production

COPY . .

CMD ["node", "dist/index.js"]
