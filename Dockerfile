FROM node:19-alpine
WORKDIR /app

COPY package*.json .

RUN npm install -g nodemon
RUN npm install -g concurrently
RUN npm cache clean --force
RUN npm install

COPY ./client ./client
COPY config ./config
COPY imageStore ./images
COPY ./render ./render
COPY ./server ./server
COPY ./bootstrap.js .
COPY ./bootstrappedFiles.js .
COPY ./index.js .
EXPOSE 3009

CMD ["npm", "run", "dev"]