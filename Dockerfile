FROM node:17.13.1-alpined

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app

EXPOSE 3003

CMD ["node", "./src/index.js"]