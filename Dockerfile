FROM node:16-alpine

WORKDIR /app

COPY . .

RUN rm -rf node_modules
RUN npm install 

RUN npm uninstall bcrypt
RUN npm install bcrypt

RUN cd src

# RUN npx prisma generate
# RUN npm i prisma@latest
# RUN npm i @prisma/client@latest

EXPOSE 3000

ENV DOT_ENV_PATH=./.env

CMD ["npm", "run", "start:dev", "-b swc"]

