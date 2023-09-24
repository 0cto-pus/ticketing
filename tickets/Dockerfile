FROM node:alpine

ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]