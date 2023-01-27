FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run dev:build
EXPOSE 8080
CMD ["node", "src/server/server.js"]