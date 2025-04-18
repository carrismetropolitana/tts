FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/index.js"]