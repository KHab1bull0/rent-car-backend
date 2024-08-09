FROM node:alpine

WORKDIR /app

COPY . .

RUN npm i  

EXPOSE 3000


# RUN pnpm run start:dev

CMD ["npm", "run", "start", ":", "dev"]

    