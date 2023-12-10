FROM node:20.9

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server"]