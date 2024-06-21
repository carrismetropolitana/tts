FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN npm install \
    && npm cache clean --force

RUN npx @carrismetropolitana/bumper bump

COPY . .

CMD ["node", "index.js"]
