FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
COPY main.js ./dist
RUN npm install
#RUN npm run dev:build
COPY . .
EXPOSE 8080
CMD ["node", "src/server/server.js"]