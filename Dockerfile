FROM node:18.4.0-alpine3.16

LABEL version="1.0"
LABEL description="Docker image for shop demo."

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --omit=dev

COPY build backend

COPY frontend frontend

EXPOSE 8080

CMD ["npx", "nodemon", "backend/server.js"]
