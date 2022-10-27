FROM node:17.13.1-alpinefsafdsa

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["node", "./src/index.js"]