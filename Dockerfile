FROM node:16-alpine

WORKDIR /app

COPY . .

RUN rm -rf node_modules
RUN npm install 

RUN npm uninstall bcrypt
RUN npm install bcrypt


EXPOSE 3000

ENV DOT_ENV_PATH=./.env

CMD ["npm", "run", "start", ":", "dev"]

