FROM node:alpine

WORKDIR /app

COPY . .

RUN npm i  

EXPOSE 3000

ENV DOT_ENV_PATH=./.env

CMD ["npm", "run", "start", ":", "dev"]

    